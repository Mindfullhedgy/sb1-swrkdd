import { NextResponse } from 'next/server';
import { searchOpportunities } from '@/lib/api/sam-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = {
      postedFrom: searchParams.get('postedFrom') ? new Date(searchParams.get('postedFrom')!) : undefined,
      postedTo: searchParams.get('postedTo') ? new Date(searchParams.get('postedTo')!) : undefined,
      deadlineFrom: searchParams.get('deadlineFrom') ? new Date(searchParams.get('deadlineFrom')!) : undefined,
      deadlineTo: searchParams.get('deadlineTo') ? new Date(searchParams.get('deadlineTo')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 10,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : 0
    };

    const result = await searchOpportunities(params);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Route Error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}