import { NextRequest, NextResponse } from 'next/server';
import { getTravelPackage, updateTravelPackage, deleteTravelPackage, UpdateTravelPackageData } from '@/lib/actions/travelPackage.actions';
import { connectToDatabase } from '@/lib/database/mongo';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      );
    }

    const result = await getTravelPackage(id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 404 }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/packages/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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

    // TODO: Add authentication check here for admin access
    // const session = await getServerSession();
    // if (!session || !session.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const data: UpdateTravelPackageData = {
      id,
    };

    // Only include fields that are provided
    if (formData.has('title')) data.title = formData.get('title') as string;
    if (formData.has('slug')) data.slug = formData.get('slug') as string;
    if (formData.has('description')) data.description = formData.get('description') as string;
    if (formData.has('shortDescription')) data.shortDescription = formData.get('shortDescription') as string;
    if (formData.has('thumbnail')) data.thumbnail = formData.get('thumbnail') as File;
    if (formData.has('price')) data.price = parseFloat(formData.get('price') as string);
    if (formData.has('currency')) data.currency = formData.get('currency') as string;
    if (formData.has('duration')) data.duration = parseInt(formData.get('duration') as string, 10);
    if (formData.has('destination')) data.destination = formData.get('destination') as string;
    if (formData.has('destinations')) data.destinations = JSON.parse(formData.get('destinations') as string);
    if (formData.has('images')) data.images = JSON.parse(formData.get('images') as string);
    if (formData.has('category')) data.category = formData.get('category') as UpdateTravelPackageData['category'];
    if (formData.has('inclusions')) data.inclusions = JSON.parse(formData.get('inclusions') as string);
    if (formData.has('exclusions')) data.exclusions = JSON.parse(formData.get('exclusions') as string);
    if (formData.has('itinerary')) data.itinerary = JSON.parse(formData.get('itinerary') as string);
    if (formData.has('highlights')) data.highlights = JSON.parse(formData.get('highlights') as string);
    if (formData.has('isActive')) data.isActive = formData.get('isActive') === 'true';
    if (formData.has('isFeatured')) data.isFeatured = formData.get('isFeatured') === 'true';
    if (formData.has('maxTravelers')) data.maxTravelers = parseInt(formData.get('maxTravelers') as string, 10);
    if (formData.has('minTravelers')) data.minTravelers = parseInt(formData.get('minTravelers') as string, 10);
    if (formData.has('departureDates')) data.departureDates = JSON.parse(formData.get('departureDates') as string).map((d: string) => new Date(d));
    if (formData.has('bookingDeadline')) data.bookingDeadline = new Date(formData.get('bookingDeadline') as string);
    if (formData.has('tags')) data.tags = JSON.parse(formData.get('tags') as string);
    if (formData.has('meta')) data.meta = JSON.parse(formData.get('meta') as string);

    const result = await updateTravelPackage(data);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/packages/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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

    // TODO: Add authentication check here for admin access
    // const session = await getServerSession();
    // if (!session || !session.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      );
    }

    const result = await deleteTravelPackage(id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/packages/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

