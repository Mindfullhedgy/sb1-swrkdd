import { Storage } from '@google-cloud/storage';

if (!process.env.GOOGLE_CLOUD_PROJECT) {
  throw new Error('GOOGLE_CLOUD_PROJECT environment variable is not set');
}

if (!process.env.GOOGLE_CLOUD_BUCKET_NAME) {
  throw new Error('GOOGLE_CLOUD_BUCKET_NAME environment variable is not set');
}

if (!process.env.GOOGLE_CLOUD_CREDENTIALS_JSON) {
  throw new Error('GOOGLE_CLOUD_CREDENTIALS_JSON environment variable is not set');
}

const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS_JSON);

export const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  credentials
});

export const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);