import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ContactQuery from '@/models/ContactQuery';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newQuery = await ContactQuery.create({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ success: true, data: newQuery }, { status: 201 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
