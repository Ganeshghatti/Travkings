import { NextRequest, NextResponse } from 'next/server';
import { getAllTravelPackages, createTravelPackage } from '@/lib/actions/travelPackage.actions';
import { connectToDatabase } from '@/lib/database/mongo';
import { ITravelPackage } from '@/lib/database/models/travelPackage.model';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const isActive = searchParams.get('isActive');
    const isFeatured = searchParams.get('isFeatured');
    const category = searchParams.get('category');
    const destination = searchParams.get('destination');
    const limit = searchParams.get('limit');
    const skip = searchParams.get('skip');

    const filters: {
      isActive?: boolean;
      isFeatured?: boolean;
      category?: string;
      destination?: string;
      limit?: number;
      skip?: number;
    } = {};

    // Only show active packages for public API
    filters.isActive = isActive !== null ? isActive === 'true' : true;

    if (isFeatured !== null) {
      filters.isFeatured = isFeatured === 'true';
    }

    if (category) {
      filters.category = category;
    }

    if (destination) {
      filters.destination = destination;
    }

    if (limit) {
      filters.limit = parseInt(limit, 10);
    }

    if (skip) {
      filters.skip = parseInt(skip, 10);
    }

    const result = await getAllTravelPackages(filters);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/packages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    // TODO: Add authentication check here for admin access
    // const session = await getServerSession();
    // if (!session || !session.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const formData = await request.formData();

    const data = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      shortDescription: formData.get('shortDescription') as string | undefined,
      thumbnail: formData.get('thumbnail') as File | undefined,
      price: parseFloat(formData.get('price') as string),
      currency: (formData.get('currency') as string) || 'USD',
      duration: parseInt(formData.get('duration') as string, 10),
      destination: formData.get('destination') as string,
      destinations: formData.get('destinations') ? JSON.parse(formData.get('destinations') as string) : [],
      images: formData.get('images') ? JSON.parse(formData.get('images') as string) : [],
      category: formData.get('category') as ITravelPackage['category'],
      inclusions: formData.get('inclusions') ? JSON.parse(formData.get('inclusions') as string) : [],
      exclusions: formData.get('exclusions') ? JSON.parse(formData.get('exclusions') as string) : [],
      itinerary: formData.get('itinerary') ? JSON.parse(formData.get('itinerary') as string) : [],
      highlights: formData.get('highlights') ? JSON.parse(formData.get('highlights') as string) : [],
      isActive: formData.get('isActive') === 'true',
      isFeatured: formData.get('isFeatured') === 'true',
      maxTravelers: formData.get('maxTravelers') ? parseInt(formData.get('maxTravelers') as string, 10) : undefined,
      minTravelers: formData.get('minTravelers') ? parseInt(formData.get('minTravelers') as string, 10) : 1,
      departureDates: formData.get('departureDates') ? JSON.parse(formData.get('departureDates') as string).map((d: string) => new Date(d)) : [],
      bookingDeadline: formData.get('bookingDeadline') ? new Date(formData.get('bookingDeadline') as string) : undefined,
      tags: formData.get('tags') ? JSON.parse(formData.get('tags') as string) : [],
      meta: formData.get('meta') ? JSON.parse(formData.get('meta') as string) : undefined,
    };

    const result = await createTravelPackage(data);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/packages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

