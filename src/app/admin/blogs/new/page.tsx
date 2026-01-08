"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import Button from "@/components/admin/Button";
import Link from "next/link";

export default function NewBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("An error occurred while creating the blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brownCoffee mb-2">
            New Blog Post
          </h1>
          <p className="text-gray-600">Create a new blog article</p>
        </div>
        <Link href="/admin/blogs">
          <Button variant="outline">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Blogs
          </Button>
        </Link>
      </div>

      <BlogForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
