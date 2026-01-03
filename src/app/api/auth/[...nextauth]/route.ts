import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { type NextAuthOptions } from "next-auth"

if (!process.env.NEXTAUTH_SECRET) {
    process.env.NEXTAUTH_SECRET = "travkings-admin-secret-key-change-in-production-2024-minimum-32-characters-required-for-nextauth"
  }
  
const secretValue = process.env.NEXTAUTH_SECRET

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials) {
        // Check credentials against hardcoded admin credentials
        if (
          credentials?.username === "admin" &&
          credentials?.password === "Admin#1"
        ) {
          // Return user object for successful authentication
          return {
            id: "1",
            name: "Admin",
            username: "admin",
          }
        }
        // Return null if credentials are invalid
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // NextAuth requires a secret - use env var or fallback (must be at least 32 chars)
  secret: secretValue,
  pages:{
    // Must be a real page route (NOT an /api route), otherwise it can loop.
    signIn: '/admin/login',
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.username = user.username
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
      }
      return session
    },
    // Add redirect callback to handle post-login redirects
    async redirect({ url, baseUrl }) {
      // If the callback URL is /admin/login, redirect to /admin instead
      if (url === `${baseUrl}/admin/login`) {
        return `${baseUrl}/admin`
      }
      
      // If it's any admin route, redirect to /admin
      if (url.includes('/admin')) {
        return `${baseUrl}/admin`
      }
      
      // Default behavior for other URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/admin`
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }