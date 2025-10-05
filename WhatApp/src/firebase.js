import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyABu076TbRIezFDGF3G662XRG5ruaF__Hg",
  authDomain: "react-firebase-a5c2f.firebaseapp.com",
  projectId: "react-firebase-a5c2f",
  storageBucket: "react-firebase-a5c2f.firebasestorage.app",
  messagingSenderId: "87743648844",
  appId: "1:87743648844:web:104278c7f4a5aeea0650e9",
  measurementId: "G-DJTGHJ3CXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)