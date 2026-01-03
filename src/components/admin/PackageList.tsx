'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DeletePackageButton from './DeletePackageButton'

interface Package {
  _id: string
  title: string
  slug: string
  thumbnail: string
  price: number
  currency: string
  destination: string
  category: string
  isActive: boolean
  isFeatured: boolean
  createdAt: string
}

interface PackageListProps {
  packages: Package[]
}

export default function PackageList({ packages }: PackageListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const categories = ['luxury', 'adventure', 'family', 'corporate', 'honeymoon', 'group', 'solo', 'other']

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || pkg.category === filterCategory
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'active' && pkg.isActive) ||
                         (filterStatus === 'inactive' && !pkg.isActive) ||
                         (filterStatus === 'featured' && pkg.isFeatured)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or destination..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="featured">Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200">
                {pkg.thumbnail ? (
                  <Image
                    src={`/packages/${pkg.thumbnail}`}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <i className="fa-solid fa-image text-4xl"></i>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex space-x-2">
                  {pkg.isFeatured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </span>
                  )}
                  {pkg.isActive ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-brownCoffee mb-2 line-clamp-2">{pkg.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <i className="fa-solid fa-map-marker-alt mr-1"></i>
                  {pkg.destination}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <i className="fa-solid fa-tag mr-1"></i>
                  {pkg.category}
                </p>
                <p className="text-xl font-bold text-uocGold mb-4">
                  {pkg.currency} {pkg.price.toLocaleString()}
                </p>
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/packages/${pkg._id}`}
                    className="flex-1 bg-uocGold hover:bg-uocGold/90 text-white text-center py-2 px-4 rounded-lg transition-colors"
                  >
                    Edit
                  </Link>
                  <DeletePackageButton packageId={pkg._id} packageTitle={pkg.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <i className="fa-solid fa-suitcase text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-600 text-lg">No packages found</p>
        </div>
      )}
    </div>
  )
}

