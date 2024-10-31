import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

let adminApp: App;

export const initAdmin = () => {
  try {
    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
    } else {
      adminApp = getApps()[0];
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    throw error;
  }
};

export const getAdminStorage = () => {
  if (!adminApp) {
    initAdmin();
  }
  return getStorage();
};