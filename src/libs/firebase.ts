import path from "node:path";
import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";

// See: https://firebase.google.com/docs/web/learn-more#config-object
const serviceAccountCredentials = path.resolve(process.env.SERVICE_ACCOUNT_CREDENTIALS_PATH as string)
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccountCredentials),
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const adminFirebaseApp = admin.initializeApp(firebaseConfig);

export const bucket = getStorage(adminFirebaseApp).bucket(firebaseConfig.storageBucket);

