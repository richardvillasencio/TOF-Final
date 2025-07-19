import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getStorage } from "firebase/storage";
import admin from 'firebase-admin';

// Client-side Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase for the client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

// Server-side Firebase Admin SDK configuration
let adminApp: admin.app.App;
let adminDb: admin.firestore.Firestore | undefined = undefined;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
        if (!admin.apps.length) {
            const serviceAccount: admin.ServiceAccount = JSON.parse(
                process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
            );
            adminApp = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
                storageBucket: firebaseConfig.storageBucket,
            });
        } else {
            adminApp = admin.app();
        }
        adminDb = adminApp.firestore();
    } catch (error) {
        console.error("Firebase Admin SDK initialization failed:", error);
    }
} else {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Server-side Firebase features will be disabled.");
}


export { app, storage, adminDb };
