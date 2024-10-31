interface ApiCallLog {
  url: string;
  method: string;
  headers: Record<string, string>;
  params: Record<string, string>;
}

interface ApiResponseLog {
  status: number;
  data: any;
  error?: string;
}

export function logApiCall({ url, method, headers, params }: ApiCallLog): void {
  console.log('\n📡 API Request:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('URL:', url);
  console.log('Method:', method);
  console.log('Headers:', headers);
  console.log('Parameters:', params);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

export function logApiResponse({ status, data, error }: ApiResponseLog): void {
  if (error) {
    console.error('\n❌ API Error:');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('Status:', status);
    console.error('Error:', error);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    return;
  }

  console.log('\n✅ API Response:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Status:', status);
  
  if (data?.opportunitiesData?.length > 0) {
    console.log('\n📋 First Two Opportunities:');
    data.opportunitiesData.slice(0, 2).forEach((opp: any, index: number) => {
      console.log(`\n[${index + 1}] ${opp.title || 'Untitled'}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Solicitation:', opp.solicitationNumber);
      console.log('Posted:', opp.postedDate);
      console.log('Deadline:', opp.responseDeadLine);
      console.log('Type:', opp.type);
      if (opp.description) {
        console.log('Description:', opp.description.slice(0, 150) + '...');
      }
    });
  } else {
    console.log('\n❌ No opportunities found');
  }
  
  console.log('\nTotal Records:', data?.totalRecords || 0);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}