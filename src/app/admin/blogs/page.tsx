import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/database/mongo";
import Blog from "@/lib/database/models/blog.model";
import BlogList from "@/components/admin/BlogList";
import Link from "next/link";
import Button from "@/components/admin/Button";

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ isPublished?: string; isFeatured?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  await connectToDatabase();

  const params = await searchParams;

  const query: any = {};
  if (params.isPublished !== undefined) {
    query.isPublished = params.isPublished === "true";
  }
  if (params.isFeatured !== undefined) {
    query.isFeatured = params.isFeatured === "true";
  }

  const blogs = await Blog.find(query).sort({ createdAt: -1 }).lean();

  const serializedBlogs = blogs.map((blog: any) => ({
    _id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    thumbnail: blog.thumbnail,
    author: blog.author,
    category: blog.category,
    tags: blog.tags,
    views: blog.views,
    isPublished: blog.isPublished,
    isFeatured: blog.isFeatured,
    createdAt: blog.createdAt
      ? new Date(blog.createdAt).toISOString()
      : new Date().toISOString(),
    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : undefined,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brownCoffee mb-2">
            Blog Posts
          </h1>
          <p className="text-gray-600">Manage your blog content</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button>
            <i className="fa-solid fa-plus mr-2"></i>
            New Blog Post
          </Button>
        </Link>
      </div>

      <BlogList blogs={serializedBlogs} />
    </div>
  );
}
