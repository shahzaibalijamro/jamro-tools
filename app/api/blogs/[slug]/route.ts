import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest, ctx: RouteContext<'/api/blogs/[slug]'>) {
  try {
    const { slug } = await ctx.params;
    await dbConnect();
    const blog = await BlogPost.findOne({ slug });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: RouteContext<'/api/blogs/[slug]'>) {
  try {
    const { slug } = await ctx.params;
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token || !verifyToken(token.value)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    const updatedBlog = await BlogPost.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedBlog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/blogs/[slug]'>) {
  try {
    const { slug } = await ctx.params;
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token || !verifyToken(token.value)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const deletedBlog = await BlogPost.findOneAndDelete({ slug });

    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
