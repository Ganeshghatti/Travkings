'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from './Button'

interface QueryDetailsProps {
  query: {
    _id: string
    name: string
    email: string
    phone?: string
    service: string
    travelDate?: string
    message: string
    status: 'pending' | 'resolved'
    source: string
    createdAt: string
    resolvedAt?: string
    packageId?: string
  }
  packageData?: {
    _id: string
    title: string
    slug: string
  } | null
}

export default function QueryDetails({ query, packageData }: QueryDetailsProps) {
  const router = useRouter()

  const handleStatusChange = async (newStatus: 'pending' | 'resolved') => {
    try {
      const response = await fetch(`/api/queries/${query._id}`, {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Status Badge */}
      <div className="mb-6">
        <span
          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            query.status === 'pending'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {query.status === 'pending' ? 'Pending' : 'Resolved'}
        </span>
      </div>

      {/* Customer Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{query.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">
              <a href={`mailto:${query.email}`} className="text-uocGold hover:underline">
                {query.email}
              </a>
            </p>
          </div>
          {query.phone && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <p className="text-gray-900">
                <a href={`tel:${query.phone}`} className="text-uocGold hover:underline">
                  {query.phone}
                </a>
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <p className="text-gray-900">{query.source}</p>
          </div>
        </div>
      </div>

      {/* Service Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Service Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
            <p className="text-gray-900">{query.service}</p>
          </div>
          {query.travelDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
              <p className="text-gray-900">{new Date(query.travelDate).toLocaleDateString()}</p>
            </div>
          )}
          {packageData && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Related Package</label>
              <Link
                href={`/admin/packages/${packageData._id}`}
                className="text-uocGold hover:underline"
              >
                {packageData.title}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Message</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-900 whitespace-pre-wrap">{query.message}</p>
        </div>
      </div>

      {/* Timestamps */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Timestamps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
            <p className="text-gray-900">{new Date(query.createdAt).toLocaleString()}</p>
          </div>
          {query.resolvedAt && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resolved At</label>
              <p className="text-gray-900">{new Date(query.resolvedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <Button
          onClick={() => handleStatusChange(query.status === 'pending' ? 'resolved' : 'pending')}
          variant={query.status === 'pending' ? 'primary' : 'secondary'}
        >
          {query.status === 'pending' ? 'Mark as Resolved' : 'Mark as Pending'}
        </Button>
      </div>
    </div>
  )
}

