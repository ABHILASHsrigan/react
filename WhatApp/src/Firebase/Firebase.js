// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBejipK4AlPRVf3uJwVGd_BfvlM7_xVRhY",
  authDomain: "chat-app-422e3.firebaseapp.com",
  projectId: "chat-app-422e3",
  storageBucket: "chat-app-422e3.firebasestorage.app",
  messagingSenderId: "742207036754",
  appId: "1:742207036754:web:59d8f59ddd8829e4e06e8b",
  measurementId: "G-NVKPMNQPZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
