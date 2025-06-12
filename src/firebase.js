// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBirjFkLVmuDCehNlqW2oEP_keHwvaKSA4",
  authDomain: "boiler-b9e57.firebaseapp.com",
  projectId: "boiler-b9e57",
  storageBucket: "boiler-b9e57.firebasestorage.app",
  messagingSenderId: "188898971576",
  appId: "1:188898971576:web:ef58cd0e3907a6856e894d",
  measurementId: "G-3X02LXMDRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);