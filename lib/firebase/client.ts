import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Set persistence to local (keeps user logged in across page reloads and redirects)
setPersistence(auth, browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export { app };
