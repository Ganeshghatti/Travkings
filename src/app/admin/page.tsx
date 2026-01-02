import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectToDatabase } from '@/lib/database/mongo'
import TravelPackage from '@/lib/database/models/travelPackage.model'
import Query from '@/lib/database/models/query.model'
import Link from 'next/link'
import { Types } from 'mongoose'

// Types for lean documents returned by .lean() - only properties we actually use
type TravelPackageLean = {
  _id: Types.ObjectId
  title: string
  isActive: boolean
  createdAt: Date
}

type QueryLean = {
  _id: Types.ObjectId
  name: string
  status: 'pending' | 'resolved'
  service: string
  createdAt: Date
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  await connectToDatabase()

  // Get statistics
  const [
    totalPackages,
    activePackages,
    featuredPackages,
    totalQueries,
    pendingQueries,
    resolvedQueries,
    recentPackages,
    recentQueries,
  ] = await Promise.all([
    TravelPackage.countDocuments(),
    TravelPackage.countDocuments({ isActive: true }),
    TravelPackage.countDocuments({ isFeatured: true }),
    Query.countDocuments(),
    Query.countDocuments({ status: 'pending' }),
    Query.countDocuments({ status: 'resolved' }),
    TravelPackage.find().sort({ createdAt: -1 }).limit(5).lean(),
    Query.find().sort({ createdAt: -1 }).limit(5).lean(),
  ])

  const stats = [
    {
      label: 'Total Packages',
      value: totalPackages,
      icon: 'fa-suitcase',
      color: 'bg-uocGold',
      href: '/admin/packages',
    },
    {
      label: 'Active Packages',
      value: activePackages,
      icon: 'fa-check-circle',
      color: 'bg-green-500',
      href: '/admin/packages?isActive=true',
    },
    {
      label: 'Featured Packages',
      value: featuredPackages,
      icon: 'fa-star',
      color: 'bg-yellow-500',
      href: '/admin/packages?isFeatured=true',
    },
    {
      label: 'Total Queries',
      value: totalQueries,
      icon: 'fa-envelope',
      color: 'bg-blue-500',
      href: '/admin/queries',
    },
    {
      label: 'Pending Queries',
      value: pendingQueries,
      icon: 'fa-clock',
      color: 'bg-orange-500',
      href: '/admin/queries?status=pending',
    },
    {
      label: 'Resolved Queries',
      value: resolvedQueries,
      icon: 'fa-check',
      color: 'bg-green-500',
      href: '/admin/queries?status=resolved',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brownCoffee mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {session.user?.name || 'Admin'}!</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-brownCoffee">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                <i className={`fa-solid ${stat.icon} text-xl`}></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Packages */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-brownCoffee">Recent Packages</h2>
            <Link
              href="/admin/packages"
              className="text-uocGold hover:text-uocGold/80 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentPackages.length > 0 ? (
              recentPackages.map((pkg: TravelPackageLean) => (
                <Link
                  key={pkg._id.toString()}
                  href={`/admin/packages/${pkg._id}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{pkg.title}</p>
                      <p className="text-sm text-gray-500">
                        {pkg.isActive ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-gray-400">Inactive</span>
                        )}
                        {' • '}
                        {new Date(pkg.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-gray-400 ml-4"></i>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No packages yet</p>
            )}
          </div>
        </div>

        {/* Recent Queries */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-brownCoffee">Recent Queries</h2>
            <Link
              href="/admin/queries"
              className="text-uocGold hover:text-uocGold/80 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentQueries.length > 0 ? (
              recentQueries.map((query: QueryLean) => (
                <Link
                  key={query._id.toString()}
                  href={`/admin/queries/${query._id}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{query.name}</p>
                      <p className="text-sm text-gray-500">
                        {query.status === 'pending' ? (
                          <span className="text-orange-600">Pending</span>
                        ) : (
                          <span className="text-green-600">Resolved</span>
                        )}
                        {' • '}
                        {query.service}
                        {' • '}
                        {new Date(query.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-gray-400 ml-4"></i>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No queries yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

