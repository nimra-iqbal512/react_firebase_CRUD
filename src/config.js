import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqAZSC1eTpe8UmdvdGH7DRGAgnlTWp0a8",
  authDomain: "fir-firestorereact.firebaseapp.com",
  projectId: "fir-firestorereact",
  storageBucket: "fir-firestorereact.firebasestorage.app",
  messagingSenderId: "53563829795",
  appId: "1:535638297P95:web:a326bfff8cfecad5720b96",
}; 

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);