import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: string;
  category:
    | "travel-tips"
    | "destinations"
    | "guides"
    | "news"
    | "stories"
    | "other";
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "travel-tips",
          "destinations",
          "guides",
          "news",
          "stories",
          "other",
        ],
        message: "Invalid category",
      },
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.length <= 10;
        },
        message: "Cannot have more than 10 tags",
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    meta: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      keywords: { type: [String], default: [] },
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

BlogSchema.index({ slug: 1, isPublished: 1 });
BlogSchema.index({ category: 1, isPublished: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ createdAt: -1 });

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
