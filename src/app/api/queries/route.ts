import { NextRequest, NextResponse } from 'next/server';
import { getAllQueries, createQuery } from '@/lib/actions/query.actions';
import { connectToDatabase } from '@/lib/database/mongo';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // TODO: Add authentication check here for admin access
    // const session = await getServerSession();
    // if (!session || !session.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'pending' | 'resolved' | null;
    const email = searchParams.get('email');
    const service = searchParams.get('service');
    const limit = searchParams.get('limit');
    const skip = searchParams.get('skip');

    const filters: {
      status?: 'pending' | 'resolved';
      email?: string;
      service?: string;
      limit?: number;
      skip?: number;
    } = {};

    if (status) {
      filters.status = status;
    }

    if (email) {
      filters.email = email;
    }

    if (service) {
      filters.service = service;
    }

    if (limit) {
      filters.limit = parseInt(limit, 10);
    }

    if (skip) {
      filters.skip = parseInt(skip, 10);
    }

    const result = await getAllQueries(filters);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/queries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const data = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      travelDate: body.travelDate ? new Date(body.travelDate) : undefined,
      message: body.message,
      source: body.source || 'contact_form',
      packageId: body.packageId,
    };

    const result = await createQuery(data);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/queries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

