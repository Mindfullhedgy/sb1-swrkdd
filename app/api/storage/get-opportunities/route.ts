import { NextResponse } from 'next/server';
import { adminStorage } from '@/lib/config/firebase-admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    const bucket = adminStorage.bucket();
    const file = bucket.file(`opportunities/${filename}`);
    
    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const [content] = await file.download();
    const data = JSON.parse(content.toString());

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to retrieve opportunities:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to retrieve opportunities' },
      { status: 500 }
    );
  }
}