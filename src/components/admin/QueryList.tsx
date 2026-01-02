'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Query {
  _id: string
  name: string
  email: string
  phone?: string
  service: string
  travelDate?: string
  message: string
  status: 'pending' | 'resolved'
  createdAt: string
  resolvedAt?: string
}

interface QueryListProps {
  queries: Query[]
}

export default function QueryList({ queries }: QueryListProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved'>('all')

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'resolved') => {
    try {
      const response = await fetch(`/api/queries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to update query status')
      }
    } catch (error) {
      console.error('Error updating query status:', error)
      alert('An error occurred')
    }
  }

  const filteredQueries = queries.filter((query) => {
    const matchesSearch = 
      query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || query.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search queries..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'resolved')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Queries List */}
      {filteredQueries.length > 0 ? (
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <div
              key={query._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-brownCoffee">{query.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        query.status === 'pending'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {query.status === 'pending' ? 'Pending' : 'Resolved'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                    <p>
                      <i className="fa-solid fa-envelope mr-2"></i>
                      {query.email}
                    </p>
                    {query.phone && (
                      <p>
                        <i className="fa-solid fa-phone mr-2"></i>
                        {query.phone}
                      </p>
                    )}
                    <p>
                      <i className="fa-solid fa-briefcase mr-2"></i>
                      {query.service}
                    </p>
                    {query.travelDate && (
                      <p>
                        <i className="fa-solid fa-calendar mr-2"></i>
                        {new Date(query.travelDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3 line-clamp-2">{query.message}</p>
                  <p className="text-xs text-gray-500">
                    Received: {new Date(query.createdAt).toLocaleString()}
                    {query.resolvedAt && (
                      <span className="ml-4">
                        Resolved: {new Date(query.resolvedAt).toLocaleString()}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Link
                    href={`/admin/queries/${query._id}`}
                    className="bg-uocGold hover:bg-uocGold/90 text-white py-2 px-4 rounded-lg transition-colors text-center"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleStatusChange(query._id, query.status === 'pending' ? 'resolved' : 'pending')}
                    className={`py-2 px-4 rounded-lg transition-colors text-center ${
                      query.status === 'pending'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    {query.status === 'pending' ? 'Mark Resolved' : 'Mark Pending'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <i className="fa-solid fa-envelope text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-600 text-lg">No queries found</p>
        </div>
      )}
    </div>
  )
}

