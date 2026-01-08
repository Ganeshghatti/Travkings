import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/database/mongo";
import Blog from "@/lib/database/models/blog.model";
import EditBlogForm from "@/components/admin/EditBlogForm";
import Link from "next/link";
import Button from "@/components/admin/Button";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  await connectToDatabase();

  const blogData = await Blog.findById(id).lean();

  if (!blogData) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-brownCoffee mb-4">
          Blog Not Found
        </h1>
        <Link href="/admin/blogs">
          <Button>Back to Blogs</Button>
        </Link>
      </div>
    );
  }

  const serializedBlog = {
    ...blogData,
    _id: blogData._id.toString(),
    createdAt: blogData.createdAt
      ? new Date(blogData.createdAt).toISOString()
      : new Date().toISOString(),
    updatedAt: blogData.updatedAt
      ? new Date(blogData.updatedAt).toISOString()
      : new Date().toISOString(),
    publishedAt: blogData.publishedAt
      ? new Date(blogData.publishedAt).toISOString()
      : undefined,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brownCoffee mb-2">
            Edit Blog Post
          </h1>
          <p className="text-gray-600">{blogData.title}</p>
        </div>
        <Link href="/admin/blogs">
          <Button variant="outline">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Blogs
          </Button>
        </Link>
      </div>

      <EditBlogForm blogId={id} initialData={serializedBlog} />
    </div>
  );
}
