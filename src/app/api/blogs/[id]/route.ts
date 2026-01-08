import { NextRequest, NextResponse } from "next/server";
import {
  getBlogById,
  updateBlog,
  deleteBlog,
  incrementBlogViews,
  UpdateBlogData,
} from "@/lib/actions/blog.actions";
import { connectToDatabase } from "@/lib/database/mongo";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const result = await getBlogById(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/blogs/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const data: UpdateBlogData = {
      id,
    };

    if (formData.has("title")) data.title = formData.get("title") as string;
    if (formData.has("slug")) data.slug = formData.get("slug") as string;
    if (formData.has("excerpt"))
      data.excerpt = formData.get("excerpt") as string;
    if (formData.has("content"))
      data.content = formData.get("content") as string;
    if (formData.has("thumbnail"))
      data.thumbnail = formData.get("thumbnail") as File;
    if (formData.has("author")) data.author = formData.get("author") as string;
    if (formData.has("category"))
      data.category = formData.get("category") as UpdateBlogData["category"];
    if (formData.has("tags"))
      data.tags = JSON.parse(formData.get("tags") as string);
    if (formData.has("isPublished"))
      data.isPublished = formData.get("isPublished") === "true";
    if (formData.has("isFeatured"))
      data.isFeatured = formData.get("isFeatured") === "true";
    if (formData.has("meta"))
      data.meta = JSON.parse(formData.get("meta") as string);

    const result = await updateBlog(data);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api/blogs/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const result = await deleteBlog(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully", data: result.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/blogs/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const result = await incrementBlogViews(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH /api/blogs/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
