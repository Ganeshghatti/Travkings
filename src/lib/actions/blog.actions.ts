"use server";

import { connectToDatabase } from "@/lib/database/mongo";
import Blog, { IBlog } from "@/lib/database/models/blog.model";
import { uploadBlogThumbnail, deleteBlogImage } from "@/lib/utils/imageHandler";
import { revalidatePath } from "next/cache";

export interface CreateBlogData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail?: File;
  author: string;
  category: IBlog["category"];
  tags?: string[];
  isPublished?: boolean;
  isFeatured?: boolean;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface UpdateBlogData
  extends Omit<Partial<CreateBlogData>, "thumbnail"> {
  id: string;
  thumbnail?: File | string;
}

export interface BlogResponse {
  success: boolean;
  data?: IBlog;
  error?: string;
}

export interface BlogListResponse {
  success: boolean;
  data?: IBlog[];
  error?: string;
}

/**
 * Create a new blog post
 */
export async function createBlog(data: CreateBlogData): Promise<BlogResponse> {
  try {
    await connectToDatabase();

    if (
      !data.title ||
      !data.slug ||
      !data.excerpt ||
      !data.content ||
      !data.author ||
      !data.category
    ) {
      return {
        success: false,
        error: "Missing required fields",
      };
    }

    const existingBlog = await Blog.findOne({ slug: data.slug });
    if (existingBlog) {
      return {
        success: false,
        error: "A blog with this slug already exists",
      };
    }

    let thumbnailFilename = "";
    if (data.thumbnail) {
      const uploadResult = await uploadBlogThumbnail(data.thumbnail);
      if (!uploadResult.success || !uploadResult.filename) {
        return {
          success: false,
          error: uploadResult.error || "Failed to upload thumbnail",
        };
      }
      thumbnailFilename = uploadResult.filename;
    } else {
      return {
        success: false,
        error: "Thumbnail is required",
      };
    }

    const newBlog = new Blog({
      ...data,
      thumbnail: thumbnailFilename,
      tags: data.tags || [],
      isPublished: data.isPublished !== undefined ? data.isPublished : false,
      isFeatured: data.isFeatured || false,
      views: 0,
      publishedAt: data.isPublished ? new Date() : undefined,
    });

    await newBlog.save();

    revalidatePath("/admin");
    revalidatePath("/blogs");

    return {
      success: true,
      data: newBlog.toObject(),
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create blog",
    };
  }
}

/**
 * Update an existing blog post
 */
export async function updateBlog(data: UpdateBlogData): Promise<BlogResponse> {
  try {
    await connectToDatabase();

    const { id, thumbnail, ...updateData } = data;

    if (!id) {
      return {
        success: false,
        error: "Blog ID is required",
      };
    }

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    let thumbnailFilename: string | undefined;
    if (thumbnail instanceof File && thumbnail.size > 0) {
      const uploadResult = await uploadBlogThumbnail(
        thumbnail,
        existingBlog.thumbnail
      );
      if (!uploadResult.success || !uploadResult.filename) {
        return {
          success: false,
          error: uploadResult.error || "Failed to upload thumbnail",
        };
      }
      thumbnailFilename = uploadResult.filename;
    } else if (typeof thumbnail === "string") {
      thumbnailFilename = thumbnail;
    }

    if (updateData.slug && updateData.slug !== existingBlog.slug) {
      const slugExists = await Blog.findOne({
        slug: updateData.slug,
        _id: { $ne: id },
      });
      if (slugExists) {
        return {
          success: false,
          error: "A blog with this slug already exists",
        };
      }
    }

    const updatePayload: Partial<IBlog> = { ...updateData };
    if (thumbnailFilename !== undefined) {
      updatePayload.thumbnail = thumbnailFilename;
    }

    if (updateData.isPublished && !existingBlog.isPublished) {
      updatePayload.publishedAt = new Date();
    } else if (updateData.isPublished === false && existingBlog.isPublished) {
      updatePayload.publishedAt = undefined;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return {
        success: false,
        error: "Failed to update blog",
      };
    }

    revalidatePath("/admin");
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${updatedBlog.slug}`);

    return {
      success: true,
      data: updatedBlog.toObject(),
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update blog",
    };
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlog(id: string): Promise<BlogResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: "Blog ID is required",
      };
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    if (blog.thumbnail) {
      await deleteBlogImage(blog.thumbnail);
    }

    await Blog.findByIdAndDelete(id);

    revalidatePath("/admin");
    revalidatePath("/blogs");

    return {
      success: true,
      data: blog.toObject(),
    };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete blog",
    };
  }
}

/**
 * Get all blogs with optional filters
 */
export async function getAllBlogs(filters?: {
  isPublished?: boolean;
  isFeatured?: boolean;
  category?: string;
  tags?: string[];
  limit?: number;
  skip?: number;
}): Promise<BlogListResponse> {
  try {
    await connectToDatabase();

    const query: {
      isPublished?: boolean;
      isFeatured?: boolean;
      category?: string;
      tags?: { $in: string[] };
    } = {};

    if (filters?.isPublished !== undefined) {
      query.isPublished = filters.isPublished;
    }

    if (filters?.isFeatured !== undefined) {
      query.isFeatured = filters.isFeatured;
    }

    if (filters?.category) {
      query.category = filters.category;
    }

    if (filters?.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    let blogQuery = Blog.find(query).sort({ createdAt: -1 });

    if (filters?.limit) {
      blogQuery = blogQuery.limit(filters.limit);
    }

    if (filters?.skip) {
      blogQuery = blogQuery.skip(filters.skip);
    }

    const blogs = await blogQuery.lean();

    return {
      success: true,
      data: blogs as IBlog[],
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blogs",
    };
  }
}

/**
 * Get a single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<BlogResponse> {
  try {
    await connectToDatabase();

    if (!slug) {
      return {
        success: false,
        error: "Slug is required",
      };
    }

    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    return {
      success: true,
      data: blog as IBlog,
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blog",
    };
  }
}

/**
 * Get a single blog by ID
 */
export async function getBlogById(id: string): Promise<BlogResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: "Blog ID is required",
      };
    }

    const blog = await Blog.findById(id).lean();

    if (!blog) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    return {
      success: true,
      data: blog as IBlog,
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blog",
    };
  }
}

/**
 * Increment blog view count
 */
export async function incrementBlogViews(id: string): Promise<BlogResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: "Blog ID is required",
      };
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!blog) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    return {
      success: true,
      data: blog as IBlog,
    };
  } catch (error) {
    console.error("Error incrementing blog views:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to increment views",
    };
  }
}

/**
 * Toggle blog published status
 */
export async function toggleBlogPublished(id: string): Promise<BlogResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: "Blog ID is required",
      };
    }

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return {
        success: false,
        error: "Blog not found",
      };
    }

    const newPublishedStatus = !existingBlog.isPublished;
    const updatePayload: Partial<IBlog> = {
      isPublished: newPublishedStatus,
      publishedAt: newPublishedStatus ? new Date() : undefined,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatePayload, {
      new: true,
    }).lean();

    if (!updatedBlog) {
      return {
        success: false,
        error: "Failed to toggle blog status",
      };
    }

    revalidatePath("/admin");
    revalidatePath("/blogs");

    return {
      success: true,
      data: updatedBlog as IBlog,
    };
  } catch (error) {
    console.error("Error toggling blog status:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to toggle blog status",
    };
  }
}
