import { NextRequest, NextResponse } from "next/server";
import { getAllBlogs, createBlog } from "@/lib/actions/blog.actions";
import { connectToDatabase } from "@/lib/database/mongo";
import { IBlog } from "@/lib/database/models/blog.model";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const isPublished = searchParams.get("isPublished");
    const isFeatured = searchParams.get("isFeatured");
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const limit = searchParams.get("limit");
    const skip = searchParams.get("skip");

    const filters: {
      isPublished?: boolean;
      isFeatured?: boolean;
      category?: string;
      tags?: string[];
      limit?: number;
      skip?: number;
    } = {};

    filters.isPublished = isPublished !== null ? isPublished === "true" : true;

    if (isFeatured !== null) {
      filters.isFeatured = isFeatured === "true";
    }

    if (category) {
      filters.category = category;
    }

    if (tags) {
      filters.tags = tags.split(",").map((tag) => tag.trim());
    }

    if (limit) {
      filters.limit = parseInt(limit, 10);
    }

    if (skip) {
      filters.skip = parseInt(skip, 10);
    }

    const result = await getAllBlogs(filters);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/blogs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await request.formData();

    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      thumbnail: formData.get("thumbnail") as File | undefined,
      author: formData.get("author") as string,
      category: formData.get("category") as IBlog["category"],
      tags: formData.get("tags")
        ? JSON.parse(formData.get("tags") as string)
        : [],
      isPublished: formData.get("isPublished") === "true",
      isFeatured: formData.get("isFeatured") === "true",
      meta: formData.get("meta")
        ? JSON.parse(formData.get("meta") as string)
        : undefined,
    };

    const result = await createBlog(data);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/blogs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
