// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzW0Kv9OzwXdBOlekgMhUzKyxwckcU15Y",
  authDomain: "nerd-invaders.firebaseapp.com",
  projectId: "nerd-invaders",
  storageBucket: "nerd-invaders.appspot.com",
  messagingSenderId: "427561987199",
  appId: "1:427561987199:web:fac688f1b45142c52ce34a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
