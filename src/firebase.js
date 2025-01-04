import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHlfLpenTNkQ7qhsXGHbJJWt4dnbQen80",
  authDomain: "family-da13e.firebaseapp.com",
  projectId: "family-da13e",
  storageBucket: "family-da13e.firebasestorage.app",
  messagingSenderId: "644424378803",
  appId: "1:644424378803:web:5f5fe13b5c091efeb203c6",
  measurementId: "G-DGQK5HRYXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };