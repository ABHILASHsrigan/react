// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
const chats = getAnalytics(app);
