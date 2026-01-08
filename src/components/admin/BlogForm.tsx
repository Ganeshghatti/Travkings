"use client";

import { useState, useEffect } from "react";
import FormField from "./FormField";
import Button from "./Button";
import Image from "next/image";

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  thumbnail?: File | string;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting?: boolean;
}

const categories = [
  "travel-tips",
  "destinations",
  "guides",
  "news",
  "stories",
  "other",
];

export default function BlogForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    author: initialData?.author || "",
    category: initialData?.category || "other",
    tags: initialData?.tags || [],
    isPublished: initialData?.isPublished ?? false,
    isFeatured: initialData?.isFeatured ?? false,
    thumbnail: initialData?.thumbnail,
    meta: initialData?.meta || {},
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  // Generate slug from title
  useEffect(() => {
    if (!initialData?.slug && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, initialData?.slug]);

  // Handle thumbnail preview
  useEffect(() => {
    if (typeof formData.thumbnail === "string" && formData.thumbnail) {
      setThumbnailPreview(`/blogs/${formData.thumbnail}`);
    } else if (formData.thumbnail instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(formData.thumbnail);
    }
  }, [formData.thumbnail]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "thumbnail" && value instanceof File) {
        formDataToSend.append(key, value);
      } else if (key === "meta") {
        formDataToSend.append(key, JSON.stringify(value));
      } else if (Array.isArray(value)) {
        formDataToSend.append(key, JSON.stringify(value));
      } else if (typeof value === "boolean") {
        formDataToSend.append(key, value.toString());
      } else if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString());
      }
    });

    await onSubmit(formDataToSend);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      const keywords = formData.meta?.keywords || [];
      if (!keywords.includes(newKeyword.trim())) {
        setFormData((prev) => ({
          ...prev,
          meta: {
            ...prev.meta,
            keywords: [...keywords, newKeyword.trim()],
          },
        }));
        setNewKeyword("");
      }
    }
  };

  const removeKeyword = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        keywords: (prev.meta?.keywords || []).filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
          <FormField
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
            required
          />
        </div>
        <FormField
          label="Excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
          }
          textarea
          rows={3}
          required
          placeholder="A brief summary of the blog post (max 500 characters)"
        />
        <FormField
          label="Content"
          name="content"
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          textarea
          rows={12}
          required
          placeholder="Write your blog content here..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Author"
            name="author"
            value={formData.author}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, author: e.target.value }))
            }
            required
          />
          <FormField
            label="Category"
            name="category"
            type="select"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            options={categories.map((cat) => ({
              value: cat,
              label: cat
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
            }))}
            required
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">
          Thumbnail Image
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Thumbnail <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            />
          </div>
          {thumbnailPreview && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={thumbnailPreview}
                alt="Thumbnail preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Tags</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              placeholder="Add a tag..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
            />
            <Button type="button" onClick={addTag} variant="outline">
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SEO Meta */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">
          SEO Meta (Optional)
        </h2>
        <div className="space-y-4">
          <FormField
            label="Meta Title"
            name="metaTitle"
            value={formData.meta?.title || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                meta: { ...prev.meta, title: e.target.value },
              }))
            }
            placeholder="SEO title for search engines"
          />
          <FormField
            label="Meta Description"
            name="metaDescription"
            value={formData.meta?.description || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                meta: { ...prev.meta, description: e.target.value },
              }))
            }
            textarea
            rows={3}
            placeholder="SEO description for search engines"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Keywords
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addKeyword())
                }
                placeholder="Add a keyword..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uocGold focus:border-transparent outline-none text-gray-900 bg-white"
              />
              <Button type="button" onClick={addKeyword} variant="outline">
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
            {formData.meta?.keywords && formData.meta.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.meta.keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span className="text-sm">{keyword}</span>
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-brownCoffee mb-4">Status</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isPublished: e.target.checked,
                }))
              }
              className="w-5 h-5 text-uocGold rounded focus:ring-2 focus:ring-uocGold"
            />
            <span className="text-gray-700 font-medium">Publish this blog</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isFeatured: e.target.checked,
                }))
              }
              className="w-5 h-5 text-uocGold rounded focus:ring-2 focus:ring-uocGold"
            />
            <span className="text-gray-700 font-medium">Mark as Featured</span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              Saving...
            </>
          ) : (
            <>
              <i className="fa-solid fa-save mr-2"></i>
              Save Blog
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
