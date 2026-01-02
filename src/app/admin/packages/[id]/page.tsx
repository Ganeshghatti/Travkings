import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectToDatabase } from '@/lib/database/mongo'
import TravelPackage from '@/lib/database/models/travelPackage.model'
import EditPackageForm from '@/components/admin/EditPackageForm'
import Link from 'next/link'
import Button from '@/components/admin/Button'

export default async function EditPackagePage({
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

  const packageData = await TravelPackage.findById(id).lean()

  if (!packageData) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-brownCoffee mb-4">Package Not Found</h1>
        <Link href="/admin/packages">
          <Button>Back to Packages</Button>
        </Link>
      </div>
    )
  }

  // Serialize MongoDB document to plain object
  const serializedPackage = {
    ...packageData,
    _id: packageData._id.toString(),
    createdAt: packageData.createdAt ? new Date(packageData.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: packageData.updatedAt ? new Date(packageData.updatedAt).toISOString() : new Date().toISOString(),
    departureDates: packageData.departureDates?.map((d: Date) => new Date(d).toISOString()) || [],
    bookingDeadline: packageData.bookingDeadline ? new Date(packageData.bookingDeadline).toISOString() : undefined,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brownCoffee mb-2">Edit Package</h1>
          <p className="text-gray-600">{packageData.title}</p>
        </div>
        <Link href="/admin/packages">
          <Button variant="outline">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Packages
          </Button>
        </Link>
      </div>

      <EditPackageForm packageId={id} initialData={serializedPackage} />
    </div>
  )
}

