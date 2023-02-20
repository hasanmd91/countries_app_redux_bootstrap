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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// signing in existing user
const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

// creating new user

const registerWithEmailAndPassword = async (name, email, password) => {
  const res = await createUserWithEmailAndPassword(name, email, password);
  const user = res.user;

  await addDoc(collection(db, "users "), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
  });

  try {
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

// signing out

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logout,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
};
