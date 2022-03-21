import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from '../config';

const app = firebase.initializeApp({
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIRESASE_AUTH_DOMAIN,
  databaseURL: config.FIREBASE_DATABASE_URL,
  projectId: config.FIREBASE_PROJET_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
});

export default app;
