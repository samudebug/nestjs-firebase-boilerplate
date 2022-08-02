import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as fireorm from 'fireorm';
import * as firebaseKey from '../google_key.json';
export function initializeFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseKey as ServiceAccount),
  });

  const firestore = admin.firestore();
  fireorm.initialize(firestore);
}
