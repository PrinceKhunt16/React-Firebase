import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCtCNAEScuiWGtzmKzwawKRXHoSKzhedIs",
  authDomain: "react-firebase-63bb1.firebaseapp.com",
  projectId: "react-firebase-63bb1",
  storageBucket: "react-firebase-63bb1.appspot.com",
  messagingSenderId: "1005172079005",
  appId: "1:1005172079005:web:7b46000328cdd1a99c5774",
  measurementId: "G-K7L4X22QKB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app);