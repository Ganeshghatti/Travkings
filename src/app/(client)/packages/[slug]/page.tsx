import { getTravelPackageBySlug } from '@/lib/actions/travelPackage.actions'
import { connectToDatabase } from '@/lib/database/mongo'
import Link from 'next/link'
import Image from 'next/image'
import { Types } from 'mongoose'
import { notFound } from 'next/navigation'

type PackageLean = {
  _id: Types.ObjectId
  title: string
  slug: string
  description: string
  shortDescription?: string
  thumbnail: string
  images: string[]
  price: number
  currency: string
  duration: number
  destination: string
  destinations: string[]
  highlights: string[]
  itinerary: Array<{
    day: number
    title: string
    description: string
    activities?: string[]
  }>
  inclusions: string[]
  exclusions: string[]
  minTravelers: number
  maxTravelers?: number
  category: string
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  await connectToDatabase()
  
  const { slug } = await params
  const result = await getTravelPackageBySlug(slug)
  
  if (!result.success || !result.data) {
    notFound()
  }

  const pkg = result.data as PackageLean

  const heroImage = pkg.images && pkg.images.length > 0 
    ? `/packages/${pkg.images[0]}` 
    : pkg.thumbnail 
      ? `/packages/${pkg.thumbnail}` 
      : 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop'

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-[70vh] w-full bg-slate-200 overflow-hidden">
        <Image
          src={heroImage}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto">
            <span className="bg-uocGold text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
              {pkg.destination}
            </span>
            <h1 className="text-4xl md:text-7xl text-white font-medium tracking-headline uppercase">
              {pkg.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-16">
            
            {/* Overview */}
            <div className="space-y-6">
              <h2 className="text-2xl font-medium tracking-headline text-brownCoffee uppercase border-l-4 border-brandy pl-6">
                Trip Overview
              </h2>
              <p className="text-brownCoffee/80 text-lg leading-relaxed">
                {pkg.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
                <div className="p-4 bg-slate-50 border border-slate-100 text-center">
                  <i className="fa-regular fa-clock text-uocGold text-xl mb-2"></i>
                  <p className="text-xs uppercase tracking-widest text-brownCoffee">Duration</p>
                  <p className="font-bold text-brownCoffee">{pkg.duration} Days</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 text-center">
                  <i className="fa-solid fa-user-group text-uocGold text-xl mb-2"></i>
                  <p className="text-xs uppercase tracking-widest text-brownCoffee">Group Size</p>
                  <p className="font-bold text-brownCoffee">
                    {pkg.minTravelers}
                    {pkg.maxTravelers ? ` - ${pkg.maxTravelers}` : '+'}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 text-center">
                  <i className="fa-solid fa-tag text-uocGold text-xl mb-2"></i>
                  <p className="text-xs uppercase tracking-widest text-brownCoffee">Category</p>
                  <p className="font-bold text-brownCoffee capitalize">{pkg.category}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 text-center">
                  <i className="fa-solid fa-map-marker-alt text-uocGold text-xl mb-2"></i>
                  <p className="text-xs uppercase tracking-widest text-brownCoffee">Destination</p>
                  <p className="font-bold text-brownCoffee">{pkg.destination}</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium tracking-headline text-brownCoffee uppercase">
                  Highlights
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex items-center space-x-3 text-brownCoffee/80">
                      <i className="fa-solid fa-check text-brandy text-xs"></i>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Inclusions */}
            {pkg.inclusions && pkg.inclusions.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium tracking-headline text-brownCoffee uppercase">
                  What&apos;s Included
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-brownCoffee/80">
                      <i className="fa-solid fa-check text-brandy text-xs"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {pkg.exclusions && pkg.exclusions.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium tracking-headline text-brownCoffee uppercase">
                  What&apos;s Not Included
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-brownCoffee/80">
                      <i className="fa-solid fa-times text-red-500 text-xs"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-medium tracking-headline text-brownCoffee uppercase border-l-4 border-brandy pl-6">
                    Day by Day Itinerary
                  </h2>
                </div>
                
                <div className="space-y-0 border-l border-slate-200 ml-4">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-10 pb-12 last:pb-0">
                      <div className="absolute -left-[17px] top-0 w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-brandy shadow-sm">
                        {day.day}
                      </div>
                      <h4 className="text-lg font-medium text-brownCoffee mb-2">{day.title}</h4>
                      <p className="text-brownCoffee/60 text-sm leading-relaxed">{day.description}</p>
                      {day.activities && day.activities.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {day.activities.map((activity, i) => (
                            <li key={i} className="text-brownCoffee/60 text-sm flex items-center space-x-2">
                              <i className="fa-solid fa-circle text-uocGold text-[6px]"></i>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Booking */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <div className="bg-brownCoffee text-white p-10 shadow-2xl">
                <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Starting From</p>
                <div className="text-4xl font-medium mb-8">
                  {pkg.currency} {pkg.price.toLocaleString()} 
                  <span className="text-lg opacity-60 font-normal"> / person</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  {pkg.inclusions && pkg.inclusions.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start space-x-3 text-sm opacity-80">
                      <i className="fa-solid fa-check text-uocGold mt-1"></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/contact" 
                  className="block w-full bg-brandy hover:bg-white hover:text-brownCoffee text-center py-4 uppercase text-xs font-bold tracking-[0.2em] transition-all duration-300"
                >
                  Contact Us
                </Link>
                <p className="text-[10px] text-center mt-4 opacity-50">
                  *Prices subject to availability and seasonality
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-8 text-center space-y-4">
                <h4 className="text-brownCoffee font-medium uppercase text-sm tracking-widest">Need Advice?</h4>
                <p className="text-xs text-brownCoffee/60">Speak to a destination specialist.</p>
                <p className="text-xl text-uocGold font-medium">+91 88280 08399</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

