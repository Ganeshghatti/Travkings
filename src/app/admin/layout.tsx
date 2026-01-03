import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Sidebar from '@/components/admin/Sidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import SessionProvider from '@/components/admin/SessionProvider'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Important: do NOT redirect from the admin layout when unauthenticated.
  // The login page lives under /admin/login and shares this layout segment,
  // so redirecting here would create an infinite loop.
  if (!session) {
    return <SessionProvider>{children}</SessionProvider>
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:pl-64">
          <AdminHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  )
}

