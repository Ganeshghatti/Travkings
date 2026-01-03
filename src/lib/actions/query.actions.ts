'use server';

import { connectToDatabase } from '@/lib/database/mongo';
import Query, { IQuery } from '@/lib/database/models/query.model';
import { revalidatePath } from 'next/cache';

export interface CreateQueryData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  travelDate?: Date | string;
  message: string;
  source?: string;
  packageId?: string;
}

export interface QueryResponse {
  success: boolean;
  data?: IQuery;
  error?: string;
}

export interface QueryListResponse {
  success: boolean;
  data?: IQuery[];
  error?: string;
}

type QueryFilter = {
  status?: 'pending' | 'resolved';
  email?: { $regex: string; $options: string };
  service?: { $regex: string; $options: string };
};

/**
 * Create a new customer query
 */
export async function createQuery(data: CreateQueryData): Promise<QueryResponse> {
  try {
    await connectToDatabase();

    // Validate required fields
    if (!data.name || !data.email || !data.service || !data.message) {
      return {
        success: false,
        error: 'Missing required fields: name, email, service, and message are required',
      };
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: 'Invalid email address',
      };
    }

    // Create query
    const newQuery = new Query({
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone?.trim(),
      service: data.service.trim(),
      travelDate: data.travelDate ? new Date(data.travelDate) : undefined,
      message: data.message.trim(),
      source: data.source || 'contact_form',
      packageId: data.packageId || undefined,
      status: 'pending',
    });

    await newQuery.save();

    revalidatePath('/admin');

    return {
      success: true,
      data: newQuery.toObject(),
    };
  } catch (error) {
    console.error('Error creating query:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create query',
    };
  }
}

/**
 * Mark a query as resolved
 */
export async function markQueryResolved(id: string): Promise<QueryResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: 'Query ID is required',
      };
    }

    const query = await Query.findByIdAndUpdate(
      id,
      {
        status: 'resolved',
        resolvedAt: new Date(),
      },
      { new: true }
    );

    if (!query) {
      return {
        success: false,
        error: 'Query not found',
      };
    }

    revalidatePath('/admin');

    return {
      success: true,
      data: query.toObject(),
    };
  } catch (error) {
    console.error('Error marking query as resolved:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mark query as resolved',
    };
  }
}

/**
 * Mark a query back to pending
 */
export async function markQueryPending(id: string): Promise<QueryResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: 'Query ID is required',
      };
    }

    const query = await Query.findByIdAndUpdate(
      id,
      {
        status: 'pending',
        $unset: { resolvedAt: 1 },
      },
      { new: true }
    );

    if (!query) {
      return {
        success: false,
        error: 'Query not found',
      };
    }

    revalidatePath('/admin');

    return {
      success: true,
      data: query.toObject(),
    };
  } catch (error) {
    console.error('Error marking query as pending:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mark query as pending',
    };
  }
}

/**
 * Get a single query by ID
 */
export async function getQuery(id: string): Promise<QueryResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: 'Query ID is required',
      };
    }

    const query = await Query.findById(id).lean();

    if (!query) {
      return {
        success: false,
        error: 'Query not found',
      };
    }

    return {
      success: true,
      data: query as IQuery,
    };
  } catch (error) {
    console.error('Error getting query:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get query',
    };
  }
}

/**
 * Get all queries with optional filters
 */
export async function getAllQueries(filters?: {
  status?: 'pending' | 'resolved';
  email?: string;
  service?: string;
  limit?: number;
  skip?: number;
}): Promise<QueryListResponse> {
  try {
    await connectToDatabase();

    const query: QueryFilter = {};

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.email) {
      query.email = { $regex: filters.email, $options: 'i' };
    }

    if (filters?.service) {
      query.service = { $regex: filters.service, $options: 'i' };
    }

    let queryBuilder = Query.find(query).sort({ createdAt: -1 });

    if (filters?.skip) {
      queryBuilder = queryBuilder.skip(filters.skip);
    }

    if (filters?.limit) {
      queryBuilder = queryBuilder.limit(filters.limit);
    }

    const queries = await queryBuilder.lean();

    return {
      success: true,
      data: queries as IQuery[],
    };
  } catch (error) {
    console.error('Error getting all queries:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get queries',
    };
  }
}

/**
 * Get queries by status
 */
export async function getQueriesByStatus(
  status: 'pending' | 'resolved'
): Promise<QueryListResponse> {
  try {
    await connectToDatabase();

    const queries = await Query.find({ status })
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      data: queries as IQuery[],
    };
  } catch (error) {
    console.error('Error getting queries by status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get queries by status',
    };
  }
}

/**
 * Delete a query (hard delete for cleanup)
 */
export async function deleteQuery(id: string): Promise<QueryResponse> {
  try {
    await connectToDatabase();

    if (!id) {
      return {
        success: false,
        error: 'Query ID is required',
      };
    }

    const query = await Query.findByIdAndDelete(id);

    if (!query) {
      return {
        success: false,
        error: 'Query not found',
      };
    }

    revalidatePath('/admin');

    return {
      success: true,
      data: query.toObject(),
    };
  } catch (error) {
    console.error('Error deleting query:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete query',
    };
  }
}

