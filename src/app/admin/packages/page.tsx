import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectToDatabase } from '@/lib/database/mongo'
import TravelPackage from '@/lib/database/models/travelPackage.model'
import PackageList from '@/components/admin/PackageList'
import Link from 'next/link'
import Button from '@/components/admin/Button'

type PackageFilter = {
  isActive?: boolean
  isFeatured?: boolean
}

type TravelPackageLean = {
  _id: { toString(): string }
  title: string
  slug: string
  thumbnail?: string
  price: number
  currency: string
  destination: string
  category: string
  isActive: boolean
  isFeatured: boolean
  createdAt?: Date
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ isActive?: string; isFeatured?: string }>
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  await connectToDatabase()

  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams

  const query: PackageFilter = {}
  if (params.isActive !== undefined) {
    query.isActive = params.isActive === 'true'
  }
  if (params.isFeatured !== undefined) {
    query.isFeatured = params.isFeatured === 'true'
  }

  const packages = (await TravelPackage.find(query).sort({ createdAt: -1 }).lean()) as TravelPackageLean[]

  // Serialize MongoDB documents to plain objects
  const serializedPackages = packages.map((pkg) => ({
    _id: pkg._id?.toString?.() ?? String(pkg._id),
    title: pkg.title,
    slug: pkg.slug,
    thumbnail: pkg.thumbnail ?? '',
    price: pkg.price,
    currency: pkg.currency,
    destination: pkg.destination,
    category: pkg.category,
    isActive: pkg.isActive,
    isFeatured: pkg.isFeatured,
    createdAt: pkg.createdAt ? new Date(pkg.createdAt).toISOString() : new Date().toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brownCoffee mb-2">Travel Packages</h1>
          <p className="text-gray-600">Manage your travel packages</p>
        </div>
        <Link href="/admin/packages/new">
          <Button>
            <i className="fa-solid fa-plus mr-2"></i>
            New Package
          </Button>
        </Link>
      </div>

      <PackageList packages={serializedPackages} />
    </div>
  )
}

