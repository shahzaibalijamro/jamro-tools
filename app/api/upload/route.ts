import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    
    if (!token || !verifyToken(token.value)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<Response>((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'jamro-tools-blogs' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            resolve(NextResponse.json({ error: 'Image upload failed' }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ success: true, url: result?.secure_url }, { status: 200 }));
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
