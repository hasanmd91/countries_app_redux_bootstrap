import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6VuJ0zVgU5WXClDXsqiepktl-L_dg2KU",
  authDomain: "countries-d8b16.firebaseapp.com",
  projectId: "countries-d8b16",
  storageBucket: "countries-d8b16.appspot.com",
  messagingSenderId: "135894635104",
  appId: "1:135894635104:web:0ede5fae661a3cc3d06905",
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
  console.log(name, email, password);
  const res = await createUserWithEmailAndPassword(auth, email, password);
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
