import { getBlogBySlug, incrementBlogViews } from "@/lib/actions/blog.actions";
import { connectToDatabase } from "@/lib/database/mongo";
import Link from "next/link";
import Image from "next/image";
import { Types } from "mongoose";
import { notFound } from "next/navigation";

type BlogLean = {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: string;
  category: string;
  tags: string[];
  views: number;
  publishedAt?: Date;
  createdAt: Date;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connectToDatabase();

  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const blog = result.data as BlogLean;

  // Increment view count
  await incrementBlogViews(blog._id.toString());

  const heroImage = `/blogs/${blog.thumbnail}`;
  const publishDate = blog.publishedAt
    ? new Date(blog.publishedAt)
    : new Date(blog.createdAt);

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-[70vh] w-full bg-slate-200 overflow-hidden">
        <Image
          src={heroImage}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20 bg-gradient-to-t from-black/90 to-transparent">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-uocGold text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                {blog.category.replace("-", " ")}
              </span>
              <span className="text-white/80 text-[10px] uppercase tracking-widest">
                <i className="fa-regular fa-calendar mr-2"></i>
                {publishDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl text-white font-medium tracking-headline uppercase leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-6 mt-6 text-white/80 text-sm">
              <span className="flex items-center">
                <i className="fa-solid fa-user mr-2 text-uocGold"></i>
                By {blog.author}
              </span>
              <span className="flex items-center">
                <i className="fa-regular fa-eye mr-2 text-uocGold"></i>
                {blog.views + 1} views
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {/* Excerpt */}
        <div className="mb-16">
          <p className="text-xl text-brownCoffee/80 leading-relaxed italic border-l-4 border-brandy pl-6">
            {blog.excerpt}
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none mb-16">
          <div
            className="text-brownCoffee/90 leading-relaxed space-y-6"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {blog.content}
          </div>
        </article>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-16 pb-8 border-b border-slate-200">
            <div className="flex flex-wrap gap-3">
              <span className="text-brownCoffee/60 text-sm font-medium">
                Tags:
              </span>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-brownCoffee px-4 py-2 text-xs uppercase tracking-widest hover:bg-brandy hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="bg-slate-50 border border-slate-100 p-8 mb-16">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-brownCoffee mb-2">
                Share this article
              </h3>
              <p className="text-brownCoffee/60 text-sm">
                Spread the word about this travel insight
              </p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brownCoffee hover:bg-brandy hover:text-white hover:border-brandy transition-all">
                <i className="fa-brands fa-facebook-f"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brownCoffee hover:bg-brandy hover:text-white hover:border-brandy transition-all">
                <i className="fa-brands fa-twitter"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brownCoffee hover:bg-brandy hover:text-white hover:border-brandy transition-all">
                <i className="fa-brands fa-linkedin-in"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Author Card */}
        <div className="bg-white border border-slate-200 p-8 mb-16">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-brandy flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-medium text-brownCoffee mb-2">
                {blog.author}
              </h3>
              <p className="text-brownCoffee/60 text-sm mb-4">
                Travel Writer & Content Creator
              </p>
              <p className="text-brownCoffee/80 leading-relaxed">
                Passionate about exploring new destinations and sharing travel
                experiences with readers around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Blogs */}
        <div className="text-center">
          <Link
            href="/blogs"
            className="inline-block bg-brownCoffee text-white px-10 py-5 rounded-none font-medium text-xs uppercase tracking-widest hover:bg-brandy transition-all duration-500 shadow-xl"
          >
            <i className="fa-solid fa-arrow-left mr-3"></i>
            Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
