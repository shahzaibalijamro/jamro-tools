import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ContactQuery from '@/models/ContactQuery';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    
    if (!token || !verifyToken(token.value)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const queries = await ContactQuery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: queries }, { status: 200 });
  } catch (error) {
    console.error('Admin Queries GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
