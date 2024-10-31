import { NextResponse } from 'next/server';
import { adminStorage, initAdmin } from '@/lib/config/firebase-admin';

initAdmin();

export async function POST(request: Request) {
  try {
    const { data, filename } = await request.json();
    
    const bucket = adminStorage().bucket();
    const file = bucket.file(`opportunities/${filename}`);
    
    const jsonString = JSON.stringify(data, null, 2);
    
    await file.save(jsonString, {
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
      url,
      path: `opportunities/${filename}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Storage API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
}