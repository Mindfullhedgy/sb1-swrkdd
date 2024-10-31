import { NextResponse } from 'next/server';
import { adminStorage } from '@/lib/config/firebase-admin';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const data = await request.json();
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `opportunities_${timestamp}.json`;
    const bucket = adminStorage.bucket();
    const file = bucket.file(`opportunities/${filename}`);

    await file.save(JSON.stringify(data, null, 2), {
      contentType: 'application/json',
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    return NextResponse.json({
      success: true,
      filename,
      url,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to save opportunities:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save opportunities' },
      { status: 500 }
    );
  }
}