// // Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  getDocs,
  collection,
  getFirestore,
  query,
  orderBy,
  limit,
} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDzW0Kv9OzwXdBOlekgMhUzKyxwckcU15Y',
  authDomain: 'nerd-invaders.firebaseapp.com',
  projectId: 'nerd-invaders',
  storageBucket: 'nerd-invaders.appspot.com',
  messagingSenderId: '427561987199',
  appId: '1:427561987199:web:fac688f1b45142c52ce34a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const storeInFirebase = async (username, score) => {
  await addDoc(collection(db, 'highscore'), {
    username: username,
    score: score,
  });
};

export const getFromFirebase = async () => {
  const q = query(
    collection(db, 'highscore'),
    orderBy('score', 'desc'),
    limit(9)
  ); //limit how many scores to take
  let highscore = [];
  const highscoreRaw = await getDocs(q);
  highscoreRaw.forEach((doc) => {
    highscore.push({
      username: doc.data().username,
      score: doc.data().score,
    });
  });
  return highscore;
};
