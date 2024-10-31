export const logger = {
  apiRequest: (url: string, params: Record<string, any>) => {
    console.log('\n🔍 API Request:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('URL:', url);
    console.log('Parameters:', params);
  },

  apiResponse: (data: any) => {
    console.log('\n📋 API Response:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (data.opportunitiesData?.length > 0) {
      console.log(`Found ${data.totalRecords} opportunities`);
      console.log('\nFirst two opportunities:');
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
      console.log('No opportunities found');
    }
  },

  error: (message: string, error: unknown) => {
    console.error('\n❌ Error:', message);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    } else {
      console.error('Unknown error:', error);
    }
  }
};