'use server';

import { connectToDatabase } from '@/lib/database/mongo';
import TravelPackage, { ITravelPackage } from '@/lib/database/models/travelPackage.model';
import { uploadThumbnail, deleteImage } from '@/lib/utils/imageHandler';
import { revalidatePath } from 'next/cache';

export interface CreateTravelPackageData {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail?: File;
  price: number;
  currency?: string;
  duration: number;
  destination: string;
  destinations?: string[];
  images?: string[];
  category: ITravelPackage['category'];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    activities?: string[];
  }>;
  highlights?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  maxTravelers?: number;
  minTravelers?: number;
  departureDates?: Date[];
  bookingDeadline?: Date;
  tags?: string[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface UpdateTravelPackageData extends Omit<Partial<CreateTravelPackageData>, 'thumbnail'> {
  id: string;
  thumbnail?: File | string;
}

export interface TravelPackageResponse {
  success: boolean;
  data?: ITravelPackage;
  error?: string;
}

export interface TravelPackageListResponse {
  success: boolean;
  data?: ITravelPackage[];
  error?: string;
}

/**
 * Create a new travel package
 */
export async function createTravelPackage(
  data: CreateTravelPackageData
): Promise<TravelPackageResponse> {
  try {
    await connectToDatabase();

    // Validate required fields
    if (!data.title || !data.slug || !data.description || !data.price || !data.duration || !data.destination || !data.category) {
      return {
        success: false,
        error: 'Missing required fields',
      };
    }

    // Check if slug already exists
    const existingPackage = await TravelPackage.findOne({ slug: data.slug });
    if (existingPackage) {
      return {
        success: false,
        error: 'A package with this slug already exists',
      };
    }

    // Handle thumbnail upload if provided
    let thumbnailFilename = '';
    if (data.thumbnail) {
      const uploadResult = await uploadThumbnail(data.thumbnail);
      if (!uploadResult.success || !uploadResult.filename) {
        return {
          success: false,
          error: uploadResult.error || 'Failed to upload thumbnail',
        };
      }
      thumbnailFilename = uploadResult.filename;
    } else {
      return {
        success: false,
        error: 'Thumbnail is required',
      };
    }

    // Create package
    const newPackage = new TravelPackage({
      ...data,
      thumbnail: thumbnailFilename,
      currency: data.currency || 'USD',
      destinations: data.destinations || [],
      images: data.images || [],
      inclusions: data.inclusions || [],
      exclusions: data.exclusions || [],
      itinerary: data.itinerary || [],
      highlights: data.highlights || [],
      isActive: data.isActive !== undefined ? data.isActive : true,
      isFeatured: data.isFeatured || false,
      minTravelers: data.minTravelers || 1,
      departureDates: data.departureDates || [],
      tags: data.tags || [],
    });

    await newPackage.save();

    revalidatePath('/admin');
    revalidatePath('/packages');

    return {
      success: true,
      data: newPackage.toObject(),
    };
  } catch (error) {
    console.error('Error creating travel package:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create travel package',
    };
  }
}

/**
 * Update an existing travel package
 */
export async function updateTravelPackage(
  data: UpdateTravelPackageData
): Promise<TravelPackageResponse> {
  try {
    await connectToDatabase();

    const { id, thumbnail, ...updateData } = data;

    if (!id) {
      return {
        success: false,
        error: 'Package ID is required',
      };
    }

    // Get existing package
    const existingPackage = await TravelPackage.findById(id);
    if (!existingPackage) {
      return {
        success: false,
        error: 'Package not found',
      };
    }

    // Handle thumbnail update if provided
    let thumbnailFilename: string | undefined;
    if (thumbnail instanceof File && thumbnail.size > 0) {
      const uploadResult = await uploadThumbnail(thumbnail, existingPackage.thumbnail);
      if (!uploadResult.success || !uploadResult.filename) {
        return {
          success: false,
          error: uploadResult.error || 'Failed to upload thumbnail',
        };
      }
      thumbnailFilename = uploadResult.filename;
    } else if (typeof thumbnail === 'string') {
      // If thumbnail is already a string (filename), use it directly
      thumbnailFilename = thumbnail;
    }

    // Check slug uniqueness if slug is being updated
    if (updateData.slug && updateData.slug !== existingPackage.slug) {
      const slugExists = await TravelPackage.findOne({ slug: updateData.slug, _id: { $ne: id } });
      if (slugExists) {
        return {
          success: false,
          error: 'A package with this slug already exists',
        };
      }
    }

    // Update package
    const updatePayload: Partial<ITravelPackage> = { ...updateData };
    if (thumbnailFilename !== undefined) {
      updatePayload.thumbnail = thumbnailFilename;
    }

    const updatedPackage = await TravelPackage.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return {
        success: false,
        error: 'Failed to update package',
      };
    }

    revalidatePath('/admin');
    revalidatePath(`/packages/${updatedPackage.slug}`);
    revalidatePath('/packages');

    return {
      success: true,
      data: updatedPackage.toObject(),
    };
  } catch (error) {
    console.error('Error updating travel package:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update travel package',
    };
  }
}

/**
 * Delete a travel package (soft delete)
 */
export async function deleteTravelPackage(id: string): Promise<TravelPackageResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: 'Package ID is required',
      };
    }

    const packageToDelete = await TravelPackage.findById(id);
    if (!packageToDelete) {
      return {
        success: false,
        error: 'Package not found',
      };
    }

    // Delete thumbnail image
    if (packageToDelete.thumbnail) {
      await deleteImage(packageToDelete.thumbnail);
    }

    // Actually delete the package from database
    const deletedPackage = await TravelPackage.findByIdAndDelete(id);

    if (!deletedPackage) {
      return {
        success: false,
        error: 'Package not found',
      };
    }

    revalidatePath('/admin');
    revalidatePath('/packages');

    return {
      success: true,
      data: deletedPackage.toObject(),
    };
  } catch (error) {
    console.error('Error deleting travel package:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete travel package',
    };
  }
}

/**
 * Get a single travel package by ID
 */
export async function getTravelPackage(id: string): Promise<TravelPackageResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: 'Package ID is required',
      };
    }

    const packageData = await TravelPackage.findById(id).lean();

    if (!packageData) {
      return {
        success: false,
        error: 'Package not found',
      };
    }

    return {
      success: true,
      data: packageData as ITravelPackage,
    };
  } catch (error) {
    console.error('Error getting travel package:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get travel package',
    };
  }
}

/**
 * Get a travel package by slug (for public pages)
 */
export async function getTravelPackageBySlug(slug: string): Promise<TravelPackageResponse> {
  try {
    await connectToDatabase();

    if (!slug) {
      return {
        success: false,
        error: 'Package slug is required',
      };
    }

    const packageData = await TravelPackage.findOne({ slug, isActive: true }).lean();

    if (!packageData) {
      return {
        success: false,
        error: 'Package not found',
      };
    }

    return {
      success: true,
      data: packageData as ITravelPackage,
    };
  } catch (error) {
    console.error('Error getting travel package by slug:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get travel package',
    };
  }
}

/**
 * Get all travel packages with optional filters
 */
export async function getAllTravelPackages(filters?: {
  isActive?: boolean;
  isFeatured?: boolean;
  category?: string;
  destination?: string;
  limit?: number;
  skip?: number;
}): Promise<TravelPackageListResponse> {
  try {
    await connectToDatabase();

    const query: Record<string, unknown> = {};

    if (filters?.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    if (filters?.isFeatured !== undefined) {
      query.isFeatured = filters.isFeatured;
    }

    if (filters?.category) {
      query.category = filters.category;
    }

    if (filters?.destination) {
      query.destination = { $regex: filters.destination, $options: 'i' };
    }

    let queryBuilder = TravelPackage.find(query).sort({ createdAt: -1 });

    if (filters?.skip) {
      queryBuilder = queryBuilder.skip(filters.skip);
    }

    if (filters?.limit) {
      queryBuilder = queryBuilder.limit(filters.limit);
    }

    const packages = await queryBuilder.lean();

    return {
      success: true,
      data: packages as ITravelPackage[],
    };
  } catch (error) {
    console.error('Error getting all travel packages:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get travel packages',
    };
  }
}

/**
 * Get featured travel packages
 */
export async function getFeaturedPackages(limit: number = 6): Promise<TravelPackageListResponse> {
  try {
    await connectToDatabase();

    const packages = await TravelPackage.find({
      isActive: true,
      isFeatured: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return {
      success: true,
      data: packages as ITravelPackage[],
    };
  } catch (error) {
    console.error('Error getting featured packages:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get featured packages',
    };
  }
}

/**
 * Search travel packages
 */
export async function searchTravelPackages(
  searchQuery: string,
  filters?: {
    category?: string;
    destination?: string;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
  }
): Promise<TravelPackageListResponse> {
  try {
    await connectToDatabase();

    const query: Record<string, unknown> = {
      isActive: true,
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { destination: { $regex: searchQuery, $options: 'i' } },
        { tags: { $in: [new RegExp(searchQuery, 'i')] } },
      ],
    };

    if (filters?.category) {
      query.category = filters.category;
    }

    if (filters?.destination) {
      query.destination = { $regex: filters.destination, $options: 'i' };
    }

    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      const priceQuery: { $gte?: number; $lte?: number } = {};
      if (filters.minPrice !== undefined) {
        priceQuery.$gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        priceQuery.$lte = filters.maxPrice;
      }
      query.price = priceQuery;
    }

    let queryBuilder = TravelPackage.find(query).sort({ createdAt: -1 });

    if (filters?.limit) {
      queryBuilder = queryBuilder.limit(filters.limit);
    }

    const packages = await queryBuilder.lean();

    return {
      success: true,
      data: packages as ITravelPackage[],
    };
  } catch (error) {
    console.error('Error searching travel packages:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search travel packages',
    };
  }
}

