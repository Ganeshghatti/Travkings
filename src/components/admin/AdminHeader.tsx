'use client'

import { useSession } from 'next-auth/react'

export default function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between lg:pl-6 pl-20">
        <div>
          <h2 className="text-xl font-semibold text-brownCoffee">Admin Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{session?.user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-500">{session?.user?.username || 'admin'}</p>
          </div>
          <div className="w-10 h-10 bg-uocGold rounded-full flex items-center justify-center text-white font-semibold">
            {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
        </div>
      </div>
    </header>
  )
}

