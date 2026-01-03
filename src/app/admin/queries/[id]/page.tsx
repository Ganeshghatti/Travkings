import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectToDatabase } from '@/lib/database/mongo'
import Query from '@/lib/database/models/query.model'
import TravelPackage from '@/lib/database/models/travelPackage.model'
import Link from 'next/link'
import Button from '@/components/admin/Button'
import QueryDetails from '@/components/admin/QueryDetails'

export default async function QueryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  const { id } = await params
  await connectToDatabase()

  const query = await Query.findById(id).lean()
  
  if (!query) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-brownCoffee mb-4">Query Not Found</h1>
        <Link href="/admin/queries">
          <Button>Back to Queries</Button>
        </Link>
      </div>
    )
  }

  // Serialize MongoDB document to plain object
  const serializedQuery = {
    ...query,
    _id: query._id.toString(),
    createdAt: query.createdAt ? new Date(query.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: query.updatedAt ? new Date(query.updatedAt).toISOString() : new Date().toISOString(),
    travelDate: query.travelDate ? new Date(query.travelDate).toISOString() : undefined,
    resolvedAt: query.resolvedAt ? new Date(query.resolvedAt).toISOString() : undefined,
    packageId: query.packageId?.toString(),
  }

  let packageData = null
  let serializedPackage = null
  if (query.packageId) {
    packageData = await TravelPackage.findById(query.packageId).lean()
    if (packageData) {
      serializedPackage = {
        ...packageData,
        _id: packageData._id.toString(),
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brownCoffee mb-2">Query Details</h1>
          <p className="text-gray-600">View and manage customer query</p>
        </div>
        <Link href="/admin/queries">
          <Button variant="outline">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Queries
          </Button>
        </Link>
      </div>

      <QueryDetails query={serializedQuery} packageData={serializedPackage} />
    </div>
  )
}

