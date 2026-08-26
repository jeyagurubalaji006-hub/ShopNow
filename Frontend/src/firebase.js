// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSNgi9tlSKISbdB6AgSo2OCrdqVePaStA",
  authDomain: "shopnow-9c651.firebaseapp.com",
  projectId: "shopnow-9c651",
  storageBucket: "shopnow-9c651.firebasestorage.app",
  messagingSenderId: "788219758793",
  appId: "1:788219758793:web:45b1967e87b286e8306518",
  measurementId: "G-02W7VQ2GNH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);