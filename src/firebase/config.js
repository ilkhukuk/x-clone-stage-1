// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7y5g_JUF8h13uacvoIW6sj8D9kAl2wb0",
  authDomain: "my-project-2-5433e.firebaseapp.com",
  projectId: "my-project-2-5433e",
  storageBucket: "my-project-2-5433e.appspot.com",
  messagingSenderId: "657210662802",
  appId: "1:657210662802:web:90fb65bd9b394fc0452b4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirmenin refarınsını alma
export const auth = getAuth(app);

// google sağlayıcı kurulum
export const provider = new GoogleAuthProvider();

// veirtabının referansını alma
export const db = getFirestore(app);

// depolam alanın referansını alma
export const storage = getStorage(app);