"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogForm from "./BlogForm";
import Button from "./Button";

interface EditBlogFormProps {
  blogId: string;
  initialData: any;
}

export default function EditBlogForm({
  blogId,
  initialData,
}: EditBlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An error occurred while updating the blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while deleting the blog");
    } finally {
      setIsDeleting(false);
    }
  };

  const transformedData = {
    ...initialData,
    tags: initialData.tags || [],
    thumbnail: initialData.thumbnail || "",
    meta: initialData.meta || {},
  };

  return (
    <div>
      <BlogForm
        initialData={transformedData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Button */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Danger Zone
          </h3>
          <p className="text-red-700 mb-4">
            Once you delete this blog post, there is no going back. Please be
            certain.
          </p>
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700"
          >
            {isDeleting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Deleting...
              </>
            ) : (
              <>
                <i className="fa-solid fa-trash mr-2"></i>
                Delete Blog
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
