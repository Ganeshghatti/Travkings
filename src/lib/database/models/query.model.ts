import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IQuery extends Document {
  name: string;
  email: string;
  phone?: string;
  service: string;
  travelDate?: Date;
  message: string;
  status: 'pending' | 'resolved';
  source: string;
  packageId?: Types.ObjectId;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const QuerySchema = new Schema<IQuery>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true,
    },
    travelDate: {
      type: Date,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
    source: {
      type: String,
      default: 'contact_form',
      trim: true,
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: 'TravelPackage',
    },
    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
QuerySchema.index({ email: 1 });
QuerySchema.index({ status: 1 });
QuerySchema.index({ createdAt: -1 });
QuerySchema.index({ packageId: 1 });

// Ensure database connection before creating model
let Query: Model<IQuery>;

try {
  Query = mongoose.models.Query || mongoose.model<IQuery>('Query', QuerySchema);
} catch {
  Query = mongoose.model<IQuery>('Query', QuerySchema);
}

export default Query;

