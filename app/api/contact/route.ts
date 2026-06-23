import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newQuery = await writeClient.create({
      _type: 'contactQuery',
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newQuery }, { status: 201 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
