import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITravelPackage extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail: string;
  price: number;
  currency: string;
  duration: number;
  destination: string;
  destinations: string[];
  images: string[];
  category: 'luxury' | 'adventure' | 'family' | 'corporate' | 'honeymoon' | 'group' | 'solo' | 'other';
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities?: string[];
  }>;
  highlights: string[];
  isActive: boolean;
  isFeatured: boolean;
  maxTravelers?: number;
  minTravelers: number;
  departureDates: Date[];
  bookingDeadline?: Date;
  tags: string[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const TravelPackageSchema = new Schema<ITravelPackage>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      maxlength: [3, 'Currency code must be 3 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 day'],
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    destinations: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ['luxury', 'adventure', 'family', 'corporate', 'honeymoon', 'group', 'solo', 'other'],
      required: [true, 'Category is required'],
    },
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    itinerary: {
      type: [
        {
          day: { type: Number, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          activities: { type: [String], default: [] },
        },
      ],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    maxTravelers: {
      type: Number,
      min: [1, 'Max travelers must be at least 1'],
    },
    minTravelers: {
      type: Number,
      default: 1,
      min: [1, 'Min travelers must be at least 1'],
    },
    departureDates: {
      type: [Date],
      default: [],
    },
    bookingDeadline: {
      type: Date,
    },
    tags: {
      type: [String],
      default: [],
    },
    meta: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
TravelPackageSchema.index({ isActive: 1, isFeatured: 1 });
TravelPackageSchema.index({ category: 1 });
TravelPackageSchema.index({ destination: 1 });
TravelPackageSchema.index({ tags: 1 });
TravelPackageSchema.index({ createdAt: -1 });

// Ensure database connection before creating model
let TravelPackage: Model<ITravelPackage>;

try {
  TravelPackage = mongoose.models.TravelPackage || mongoose.model<ITravelPackage>('TravelPackage', TravelPackageSchema);
} catch {
  TravelPackage = mongoose.model<ITravelPackage>('TravelPackage', TravelPackageSchema);
}

export default TravelPackage;

