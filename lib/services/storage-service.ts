export interface StorageResult {
  url: string;
  path: string;
  timestamp: string;
}

export async function uploadJSON(data: unknown, path: string, pageNumber?: number): Promise<StorageResult> {
  try {
    const timestamp = new Date().toISOString();
    const fileName = pageNumber !== undefined 
      ? `${path}_page${pageNumber}_${timestamp}.json`
      : `${path}_${timestamp}.json`;

    // Upload data through API route
    const response = await fetch('/api/storage/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
        fileName,
        timestamp
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload data');
    }

    const result = await response.json();

    // Log the API call
    await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp,
        pageNames: [fileName],
        totalRecords: typeof data === 'object' && data !== null && 'totalRecords' in data 
          ? Number(data.totalRecords) 
          : 0
      })
    });

    return {
      url: result.url,
      path: result.path,
      timestamp
    };
  } catch (error) {
    console.error('Storage upload error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to upload data to storage');
  }
}