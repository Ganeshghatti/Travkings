"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  author: string;
  category: string;
  tags: string[];
  views: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  publishedAt?: string;
}

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const categories = [
    "travel-tips",
    "destinations",
    "guides",
    "news",
    "stories",
    "other",
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || blog.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && blog.isPublished) ||
      (filterStatus === "draft" && !blog.isPublished) ||
      (filterStatus === "featured" && blog.isFeatured);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="featured">Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-200">
                {blog.thumbnail ? (
                  <Image
                    src={`/blogs/${blog.thumbnail}`}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <i className="fa-solid fa-image text-4xl text-gray-300"></i>
                  </div>
                )}
                {blog.isFeatured && (
                  <div className="absolute top-2 right-2 bg-uocGold text-white px-2 py-1 text-xs font-bold rounded">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      blog.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {blog.category
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-brownCoffee mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <i className="fa-solid fa-user mr-1"></i>
                    {blog.author}
                  </span>
                  <span className="flex items-center">
                    <i className="fa-regular fa-eye mr-1"></i>
                    {blog.views}
                  </span>
                </div>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{blog.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
                <div className="text-xs text-gray-500 mb-4">
                  {blog.publishedAt
                    ? `Published: ${new Date(
                        blog.publishedAt
                      ).toLocaleDateString()}`
                    : `Created: ${new Date(
                        blog.createdAt
                      ).toLocaleDateString()}`}
                </div>
                <Link
                  href={`/admin/blogs/${blog._id}`}
                  className="block w-full text-center bg-brownCoffee text-white py-2 rounded-lg hover:bg-brandy transition-colors"
                >
                  Edit Blog
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <i className="fa-solid fa-book-open text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-600 text-lg">No blogs found</p>
          <p className="text-gray-500 text-sm mt-2">
            Try adjusting your filters or create a new blog
          </p>
        </div>
      )}
    </div>
  );
}
