// Firebase integration — replace config values with your project credentials
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// export async function fetchProjects() {
//   const snapshot = await getDocs(collection(db, 'projects'));
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// }

// export async function fetchProductionData(projectId, startDate, endDate) {
//   const q = query(
//     collection(db, 'production'),
//     where('project_id', '==', projectId),
//     where('timestamp', '>=', startDate),
//     where('timestamp', '<=', endDate),
//     orderBy('timestamp')
//   );
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map(doc => doc.data());
// }

export const FIREBASE_CONNECTED = false;
