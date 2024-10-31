export const storageLogger = {
  init: () => {
    console.log('\n🔧 Initializing Google Cloud Storage');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Project ID:', process.env.GOOGLE_CLOUD_PROJECT);
    console.log('Bucket Name:', process.env.GOOGLE_CLOUD_BUCKET_NAME);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  },

  saveAttempt: (filename: string, dataSize: number) => {
    console.log('\n📤 Attempting to save file to Google Cloud Storage');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Filename:', filename);
    console.log('Data Size:', Math.round(dataSize / 1024), 'KB');
    console.log('Timestamp:', new Date().toISOString());
  },

  saveSuccess: (filename: string, path: string) => {
    console.log('\n✅ Successfully saved file to Google Cloud Storage');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Filename:', filename);
    console.log('Path:', path);
    console.log('Timestamp:', new Date().toISOString());
  },

  saveError: (error: unknown) => {
    console.error('\n❌ Failed to save file to Google Cloud Storage');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Timestamp:', new Date().toISOString());
  },

  credentialsCheck: (hasCredentials: boolean) => {
    console.log('\n🔑 Checking Google Cloud credentials');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Credentials present:', hasCredentials);
    if (!hasCredentials) {
      console.log('Missing required environment variables:');
      if (!process.env.GOOGLE_CLOUD_PROJECT) console.log('- GOOGLE_CLOUD_PROJECT');
      if (!process.env.GOOGLE_CLOUD_BUCKET_NAME) console.log('- GOOGLE_CLOUD_BUCKET_NAME');
      if (!process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64) console.log('- GOOGLE_CLOUD_CREDENTIALS_BASE64');
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }
};