import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCePsad6CJ95B2JZHxCkvAApW3adPkSjX0",
  authDomain: "urbanpulse-f8def.firebaseapp.com",
  projectId: "urbanpulse-f8def",
  storageBucket: "urbanpulse-f8def.appspot.com",
  messagingSenderId: "981556499502",
  appId: "1:981556499502:web:4eeb4041fb8774b9a5fbbf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);