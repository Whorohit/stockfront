
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCGYg1sag6janad67ho-pAm_-Lf_xNWgMc",
  authDomain: "stock-388118.firebaseapp.com",
  projectId: "stock-388118",
  storageBucket: "stock-388118.appspot.com",
  messagingSenderId: "401657294832",
  appId: "1:401657294832:web:032bdbfe47c1e52f333735",
  measurementId: "G-ZZBVGJF8MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth= getAuth(app)
const provider= new GoogleAuthProvider();
export {firebaseAuth,provider}