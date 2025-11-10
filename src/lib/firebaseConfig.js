import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWhJlr-ZzmPUdABKqosrNwYRJFyW_8ABI",
  authDomain: "aaruse-52a8c.firebaseapp.com",
  projectId: "aaruse-52a8c",
  storageBucket: "aaruse-52a8c.firebasestorage.app",
  messagingSenderId: "604053706163",
  appId: "1:604053706163:web:a59da37ce6a40ef51967c6",
  measurementId: "G-MS2Z2RVMKY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
