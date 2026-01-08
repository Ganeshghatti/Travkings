/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllBlogs } from "@/lib/actions/blog.actions";
import { connectToDatabase } from "@/lib/database/mongo";
import Link from "next/link";
import Image from "next/image";
import { Types } from "mongoose";

type BlogLean = {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  category: string;
  tags: string[];
  views: number;
  publishedAt?: Date;
  createdAt: Date;
};

export default async function BlogsPage() {
  await connectToDatabase();

  const result = await getAllBlogs({ isPublished: true });

  if (!result.success || !result.data) {
    return (
      <div className="pt-24 pb-20 text-center container mx-auto px-6">
        <h2 className="text-3xl text-brownCoffee">No blogs available</h2>
      </div>
    );
  }

  const blogs = result.data as BlogLean[];
  const featuredBlogs = blogs
    .filter((blog: BlogLean) => {
      const blogData = blog as any;
      return blogData.isFeatured === true;
    })
    .slice(0, 2);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brownCoffee pt-70 pb-50 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1920&auto=format&fit=crop)`,
          }}
        ></div>
        <div className="container mx-auto px-6 relative text-center space-y-6">
          <span className="text-uocGold font-medium text-xs uppercase tracking-[0.4em] block">
            Stories & Insights
          </span>
          <h1 className="text-5xl md:text-8xl font-medium tracking-headline text-white uppercase leading-brand">
            Travel Chronicles
          </h1>
          <div className="w-20 h-[2px] bg-brandy mx-auto"></div>
        </div>
      </div>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <section className="py-20 bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 space-y-4">
              <span className="text-uocGold font-medium text-xs uppercase tracking-[0.3em] block">
                Featured Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-headline text-brownCoffee uppercase">
                Editor&apos;s Picks
              </h2>
              <div className="w-16 h-[2px] bg-brandy mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {featuredBlogs.map((blog) => {
                const imageUrl = `/blogs/${blog.thumbnail}`;
                const publishDate = blog.publishedAt
                  ? new Date(blog.publishedAt)
                  : new Date(blog.createdAt);

                return (
                  <Link
                    key={blog._id.toString()}
                    href={`/blogs/${blog.slug}`}
                    className="group flex flex-col bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-brandy text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                        Featured
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 mb-4 text-[10px] uppercase tracking-widest text-brownCoffee/60">
                        <span className="flex items-center">
                          <i className="fa-regular fa-calendar mr-2 text-uocGold"></i>
                          {publishDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center">
                          <i className="fa-regular fa-eye mr-2 text-uocGold"></i>
                          {blog.views} views
                        </span>
                      </div>
                      <h3 className="text-2xl font-medium tracking-headline text-brownCoffee mb-4 uppercase group-hover:text-brandy transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-brownCoffee/70 leading-relaxed mb-6 flex-grow">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-[10px] uppercase tracking-widest text-brownCoffee/60">
                          By {blog.author}
                        </span>
                        <span className="text-brandy text-xs uppercase tracking-widest font-medium group-hover:translate-x-2 transition-transform">
                          Read More{" "}
                          <i className="fa-solid fa-arrow-right ml-2"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Blogs */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          {!blogs || blogs.length === 0 ? (
            <div className="text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <i className="fa-solid fa-book-open text-6xl text-gray-300"></i>
                <h2 className="text-3xl font-medium text-brownCoffee">
                  No Blogs Available
                </h2>
                <p className="text-brownCoffee/60">
                  We&apos;re currently working on exciting new content. Check
                  back soon for travel stories and insights.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {blogs.map((blog) => {
                const imageUrl = `/blogs/${blog.thumbnail}`;
                const publishDate = blog.publishedAt
                  ? new Date(blog.publishedAt)
                  : new Date(blog.createdAt);

                return (
                  <div
                    key={blog._id.toString()}
                    className="group flex flex-col border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brownCoffee">
                        {blog.category.replace("-", " ")}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow bg-white">
                      <div className="flex items-center gap-4 mb-3 text-[10px] uppercase tracking-widest text-brownCoffee/60">
                        <span className="flex items-center">
                          <i className="fa-regular fa-calendar mr-2 text-uocGold"></i>
                          {publishDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center">
                          <i className="fa-regular fa-eye mr-2 text-uocGold"></i>
                          {blog.views}
                        </span>
                      </div>
                      <h3 className="text-xl font-medium tracking-headline text-brownCoffee mb-3 uppercase group-hover:text-brandy transition-colors leading-tight">
                        {blog.title}
                      </h3>
                      <p className="text-brownCoffee/70 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-[10px] uppercase tracking-widest text-brownCoffee/60">
                          {blog.author}
                        </span>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="text-brandy text-xs uppercase tracking-widest font-medium hover:translate-x-1 transition-transform inline-flex items-center"
                        >
                          Read <i className="fa-solid fa-arrow-right ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
