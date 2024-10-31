import { NextResponse } from 'next/server';
import { getAdminStorage } from '@/lib/config/firebase-admin';

export async function POST(request: Request) {
  try {
    const { data, fileName, timestamp } = await request.json();
    
    const storage = getAdminStorage();
    const bucket = storage.bucket();
    const file = bucket.file(`opportunities/${fileName}`);
    
    const jsonString = JSON.stringify(data, null, 2);
    
    await file.save(jsonString, {
      contentType: 'application/json',
      metadata: {
        timestamp
      }
    });

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    return NextResponse.json({
      success: true,
      url,
      path: `opportunities/${fileName}`,
      timestamp
    });
  } catch (error) {
    console.error('Storage API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
}