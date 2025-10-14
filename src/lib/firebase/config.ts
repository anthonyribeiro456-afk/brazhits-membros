import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "studio-1962441652-b79bb",
  appId: "1:295694764655:web:7273987eb6c1a754eedb9a",
  apiKey: "AIzaSyA4qtPj8KUxw6vn2EqQijxo8Bk8BsvC_ck",
  authDomain: "studio-1962441652-b79bb.firebaseapp.com",
  messagingSenderId: "295694764655",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
