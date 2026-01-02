import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectToDatabase } from '@/lib/database/mongo'
import Query from '@/lib/database/models/query.model'
import QueryList from '@/components/admin/QueryList'
import { Types } from 'mongoose'

type QueryFilter = {
  status?: string
  email?: { $regex: string; $options: string }
  service?: { $regex: string; $options: string }
}

type QueryLean = {
  _id: Types.ObjectId
  name: string
  email: string
  phone?: string
  service: string
  travelDate?: Date
  message: string
  status: 'pending' | 'resolved'
  resolvedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export default async function QueriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; email?: string; service?: string }>
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  await connectToDatabase()

  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams

  const query: QueryFilter = {}
  if (params.status) {
    query.status = params.status
  }
  if (params.email) {
    query.email = { $regex: params.email, $options: 'i' }
  }
  if (params.service) {
    query.service = { $regex: params.service, $options: 'i' }
  }

  const queries = await Query.find(query).sort({ createdAt: -1 }).lean() as QueryLean[]

  // Serialize MongoDB documents to plain objects
  const serializedQueries = queries.map((query: QueryLean) => ({
    _id: query._id.toString(),
    name: query.name,
    email: query.email,
    phone: query.phone || undefined,
    service: query.service,
    travelDate: query.travelDate ? new Date(query.travelDate).toISOString() : undefined,
    message: query.message,
    status: query.status,
    createdAt: query.createdAt ? new Date(query.createdAt).toISOString() : new Date().toISOString(),
    resolvedAt: query.resolvedAt ? new Date(query.resolvedAt).toISOString() : undefined,
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brownCoffee mb-2">Customer Queries</h1>
        <p className="text-gray-600">Manage customer inquiries and requests</p>
      </div>

      <QueryList queries={serializedQueries} />
    </div>
  )
}

