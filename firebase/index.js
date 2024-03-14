// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyDow-nNfA9lD_7nqOz6AyoSZEBGLy4Kcfk',
//   authDomain: 'temp-home-c0eed.firebaseapp.com',
//   projectId: 'temp-home-c0eed',
//   storageBucket: 'temp-home-c0eed.appspot.com',
//   messagingSenderId: '57991668845',
//   appId: '1:57991668845:web:a9aa63d74f6c4b3009cb64',
//   measurementId: 'G-L8CCE04L87',
// };
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

if (!global._fireBaseAuthClientPromise) {
  global._fireBaseAuthClientPromise = getAuth(app);
}

const auth = await global._fireBaseAuthClientPromise;

export default auth;

export const googleProvider = new GoogleAuthProvider();
