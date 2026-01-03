'use client'

import { useMemo, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/admin/Button'
import FormField from '@/components/admin/FormField'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const errorMessage = useMemo(() => {
    const error = searchParams.get('error')
    if (!error) return null
    if (error === 'CredentialsSignin') return 'Invalid username or password.'
    return 'Unable to sign in. Please try again.'
  }, [searchParams])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await signIn('credentials', {
        username,
        password,
        callbackUrl: '/admin',
        redirect: false,
      })

      if (result?.error) {
        // NextAuth will normally put the error in the URL when redirecting;
        // since we're not redirecting, show a local message by updating URL.
        router.replace('/admin/login?error=CredentialsSignin')
        return
      }

      // Force a hard navigation so the server layout re-renders with the new auth cookie.
      // This avoids the "unstyled admin until refresh" issue caused by reusing the same
      // /admin layout segment across login -> dashboard in a single client session.
      window.location.assign(result?.url ?? '/admin')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-brownCoffee">Admin Sign In</h1>
          <p className="text-sm text-gray-600 mt-1">Use your admin credentials to continue.</p>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <FormField
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}

