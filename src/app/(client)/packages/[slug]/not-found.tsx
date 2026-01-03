import Link from 'next/link'

export default function PackageNotFound() {
  return (
    <div className="pt-40 pb-20 text-center container mx-auto px-6">
      <h2 className="text-3xl text-brownCoffee mb-4">Package Not Found</h2>
      <p className="text-brownCoffee/60 mb-8">The package you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <Link 
        href="/packages" 
        className="inline-block bg-brownCoffee text-white px-8 py-3 rounded-none font-medium text-xs uppercase tracking-widest hover:bg-brandy transition-all duration-300"
      >
        Return to Packages
      </Link>
    </div>
  )
}

