// src/lib/firebase/admin.ts
import 'server-only';
import admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let adminDb: admin.firestore.Firestore | undefined = undefined;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    if (!admin.apps.length) {
      const serviceAccount: admin.ServiceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
      );
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
        storageBucket: firebaseConfig.storageBucket,
      });
    }
    adminDb = admin.firestore();
  } catch (error) {
    console.error("Firebase Admin SDK initialization failed:", error);
  }
} else {
  console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Server-side Firebase features will be disabled.");
}

export { adminDb };
