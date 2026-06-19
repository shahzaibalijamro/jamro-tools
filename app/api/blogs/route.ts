import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await dbConnect();
    const blogs = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    console.error('Blogs GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Basic auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    
    if (!token || !verifyToken(token.value)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    const newBlog = await BlogPost.create(body);
    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Blogs POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
