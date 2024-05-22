// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-53726.firebaseapp.com",
  projectId: "chat-app-53726",
  storageBucket: "chat-app-53726.appspot.com",
  messagingSenderId: "989164214350",
  appId: "1:989164214350:web:d8dbd811b8d6037f20cb1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth() 
export const db = getFirestore() 
export const storage = getStorage() 



