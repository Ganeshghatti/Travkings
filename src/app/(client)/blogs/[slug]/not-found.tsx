export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6 py-20">
        <div className="mb-8">
          <i className="fa-solid fa-book-open text-8xl text-gray-300"></i>
        </div>
        <h1 className="text-6xl font-medium tracking-headline text-brownCoffee mb-6 uppercase">Blog Not Found</h1>
        <div className="w-20 h-[2px] bg-brandy mx-auto mb-8"></div>
        <p className="text-xl text-brownCoffee/70 mb-12 leading-relaxed">
          The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a 
          href="/blogs"
          className="inline-block bg-brandy text-white px-10 py-5 rounded-none font-medium text-xs uppercase tracking-widest hover:bg-brownCoffee transition-all duration-500 shadow-xl"
        >
          <i className="fa-solid fa-arrow-left mr-3"></i>
          Back to Blogs
        </a>
      </div>
    </div>
  )
}
