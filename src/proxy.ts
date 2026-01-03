import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

// Get allowed origins from environment variable or use defaults
const getAllowedOrigins = (): string[] => {
  const envOrigins = process.env.ALLOWED_ORIGINS
  if (envOrigins) {
    return envOrigins.split(',').map(origin => origin.trim())
  }
  
  // Default origins for development
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment) {
    return [
      'http://localhost:3000',
      'http://localhost:3001',
    ]
  }
  
  // Production defaults (should be overridden with env var)
  return []
}

const allowedOrigins = getAllowedOrigins()

// Security headers
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400', // 24 hours
}

/**
 * Check if origin is allowed (supports wildcard subdomains)
 */
function isOriginAllowed(origin: string): boolean {
  if (!origin) return false
  
  // Exact match
  if (allowedOrigins.includes(origin)) {
    return true
  }
  
  // Check for wildcard subdomain patterns (e.g., *.example.com)
  return allowedOrigins.some(allowed => {
    if (allowed.startsWith('*.')) {
      const domain = allowed.slice(2) // Remove '*.'
      return origin.endsWith(domain) || origin === domain
    }
    return false
  })
}

/**
 * Main proxy/middleware function that handles both CORS and authentication
 */
export default withAuth(
  async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname
    const origin = request.headers.get('origin') ?? ''
    const isAllowedOrigin = isOriginAllowed(origin)
    
    // Handle CORS for API routes
    if (pathname.startsWith('/api/')) {
      // Handle preflighted requests
      const isPreflight = request.method === 'OPTIONS'
      
      if (isPreflight) {
        const preflightHeaders: Record<string, string> = {
          ...corsOptions,
          ...securityHeaders,
        }
        
        if (isAllowedOrigin) {
          preflightHeaders['Access-Control-Allow-Origin'] = origin
        }
        
        return NextResponse.json({}, { headers: preflightHeaders })
      }
      
      // Handle simple API requests
      const response = NextResponse.next()
      
      // Add security headers
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
      })
      
      // Add CORS headers if origin is allowed
      if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        Object.entries(corsOptions).forEach(([key, value]) => {
          response.headers.set(key, value)
        })
      }
      
      return response
    }
    
    // For non-API routes, just add security headers
    const response = NextResponse.next()
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        // Only protect /admin/* routes, exclude NextAuth pages
        if (req.nextUrl.pathname.startsWith('/admin')) {
          // Allow access to NextAuth API routes and sign-in page
          if (req.nextUrl.pathname.startsWith('/api/auth/')) {
            return true
          }
          // Require authentication for all other admin routes
          return !!token
        }
        // Allow all other routes (public pages)
        return true
      },
    },
    // Use NextAuth's default sign-in page
    pages: {
      signIn: '/api/auth/signin',
    },
  }
)

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
  ],
}

