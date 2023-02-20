import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "countries-d8b16.firebaseapp.com",
  projectId: "countries-d8b16",
  storageBucket: "countries-d8b16.appspot.com",
  messagingSenderId: "135894635104",
  appId: process.env.REACT_APP_FIREBASE_ID,
  measurementId: "G-RJJ17E3BFR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
