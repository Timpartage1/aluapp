// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHHHI87LjHem9T5Bs2TL-_fBa1VcO8DhA",
  authDomain: "ksqprod.firebaseapp.com",
  projectId: "ksqprod",
  storageBucket: "ksqprod.firebasestorage.app",
  messagingSenderId: "800365880154",
  appId: "1:800365880154:web:825e2926e3938593b0c963",
  measurementId: "G-X40RDW9MGK"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
