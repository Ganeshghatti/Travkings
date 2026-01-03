import { getAllTravelPackages } from '@/lib/actions/travelPackage.actions'
import { connectToDatabase } from '@/lib/database/mongo'
import Link from 'next/link'
import Image from 'next/image'
import { Types } from 'mongoose'

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
  isActive: boolean
  isFeatured: boolean
}

export default async function PackagesPage() {
  await connectToDatabase()
  
  const result = await getAllTravelPackages({ isActive: true })
  
  if (!result.success || !result.data) {
    return (
      <div className="pt-24 pb-20 text-center container mx-auto px-6">
        <h2 className="text-3xl text-brownCoffee">No packages available</h2>
      </div>
    )
  }

  const packages = result.data as PackageLean[]

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brownCoffee pt-70 pb-50 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" 
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop)` }}
        ></div>
        <div className="container mx-auto px-6 relative text-center space-y-6">
          <span className="text-uocGold font-medium text-xs uppercase tracking-[0.4em] block">Curated Journeys</span>
          <h1 className="text-5xl md:text-8xl font-medium tracking-headline text-white uppercase leading-brand">Exclusive Packages</h1>
          <div className="w-20 h-[2px] bg-brandy mx-auto"></div>
        </div>
      </div>

      {/* Package List or No Packages Message */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          {!packages || packages.length === 0 ? (
            <div className="text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <i className="fa-solid fa-suitcase text-6xl text-gray-300"></i>
                <h2 className="text-3xl font-medium text-brownCoffee">No Packages Available</h2>
                <p className="text-brownCoffee/60">
                  We&apos;re currently updating our package offerings. Please check back soon for exciting new travel experiences.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block bg-brownCoffee text-white px-10 py-4 rounded-none font-medium text-xs uppercase tracking-widest hover:bg-brandy transition-all duration-300 mt-6"
                >
                  Contact Us for Custom Packages
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {packages.map((pkg) => {
              const imageUrl = pkg.images && pkg.images.length > 0 
                ? `/packages/${pkg.images[0]}` 
                : pkg.thumbnail 
                  ? `/packages/${pkg.thumbnail}` 
                  : 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop'
              
              return (
                <div key={pkg._id.toString()} className="group flex flex-col border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={imageUrl} 
                      alt={pkg.title} 
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brownCoffee">
                      {pkg.destination}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-brandy text-white px-6 py-3 text-sm font-medium">
                      {pkg.currency} {pkg.price.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="p-10 flex flex-col flex-grow bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-medium tracking-headline text-brownCoffee uppercase leading-brand">{pkg.title}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-brownCoffee/50 mb-6 uppercase tracking-wider">
                      <span><i className="fa-regular fa-clock mr-2"></i>{pkg.duration} Days</span>
                      {pkg.isFeatured && (
                        <span><i className="fa-solid fa-star text-uocGold mr-2"></i>Premium</span>
                      )}
                    </div>
                    <p className="text-brownCoffee/70 text-sm leading-brand font-normal mb-8 line-clamp-3">
                      {pkg.shortDescription || pkg.description}
                    </p>
                    
                    <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center">
                      <div className="flex -space-x-2 overflow-hidden">
                        {pkg.highlights.slice(0, 3).map((_, i) => (
                          <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] text-brownCoffee font-bold">
                            {i + 1}
                          </div>
                        ))}
                        {pkg.highlights.length > 3 && (
                          <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-uocGold text-white flex items-center justify-center text-xs">+</div>
                        )}
                      </div>
                      <Link 
                        href={`/packages/${pkg.slug}`} 
                        className="text-[10px] font-bold uppercase tracking-widest text-brandy hover:text-brownCoffee transition-colors border-b border-brandy hover:border-brownCoffee pb-1"
                      >
                        View Itinerary
                      </Link>
                    </div>
                  </div>
                </div>
              )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Tailor Made Callout */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6 text-center space-y-8">
          <i className="fa-solid fa-pen-nib text-4xl text-uocGold"></i>
          <h2 className="text-3xl font-medium tracking-headline text-brownCoffee uppercase">Looking for something else?</h2>
          <p className="text-brownCoffee/60 max-w-2xl mx-auto">
            Our specialists can craft a fully bespoke itinerary tailored to your specific dates, interests, and budget.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-brownCoffee text-white px-10 py-4 rounded-none font-medium text-xs uppercase tracking-widest hover:bg-brandy transition-all duration-300"
          >
            Request Custom Quote
          </Link>
        </div>
      </section>
    </div>
  )
}

