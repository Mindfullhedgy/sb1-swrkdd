import { NextResponse } from 'next/server';
import { getAdminDB } from '@/lib/config/firebase-admin';

export async function POST(request: Request) {
  try {
    const { timestamp, pageNames, totalRecords } = await request.json();

    const db = getAdminDB();
    
    await db.collection('sam_api_logs').add({
      Date: timestamp,
      'Page Names': pageNames.join(', '),
      Records: totalRecords.toString()
    });

    return NextResponse.json({
      success: true,
      message: 'SAM API call logged successfully'
    });
  } catch (error) {
    console.error('Failed to log SAM API call:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to log SAM API call'
      },
      { status: 500 }
    );
  }
}