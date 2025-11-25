import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: REPLACE THE VALUES BELOW WITH YOUR FIREBASE PROJECT CONFIGURATION
// You can find this in your Firebase Console -> Project Settings -> General -> Your Apps -> SDK Setup and Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnAovFF5UWxzHM3P7wlpd_hpaYz5KU508",
  authDomain: "yoganjali-institute.firebaseapp.com",
  projectId: "yoganjali-institute",
  storageBucket: "yoganjali-institute.firebasestorage.app",
  messagingSenderId: "335988919348",
  appId: "1:335988919348:web:23e570366e6a0ec74a8e61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
