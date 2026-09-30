// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, collection, addDoc, onSnapshot,doc,deleteDoc,updateDoc,setDoc,arrayUnion, arrayRemove, getDocs} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3AObl53NLUm5cLfFF2hmbqd-1cS40gCA",
  authDomain: "multi-markets.firebaseapp.com",
  projectId: "multi-markets",
  storageBucket: "multi-markets.firebasestorage.app",
  messagingSenderId: "212908643354",
  appId: "1:212908643354:web:60aab7858f076736626da3"
  
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);
export { auth, collection, addDoc, onSnapshot, ref, uploadBytes, getDownloadURL,doc,deleteDoc,updateDoc, setDoc,arrayUnion, arrayRemove, getDocs };
