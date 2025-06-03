// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfYJmp1uIesoTNzLIdTKeBS42mSu7RqvU",
  authDomain: "ecommerce-react-fb-redux.firebaseapp.com",
  projectId: "ecommerce-react-fb-redux",
  storageBucket: "ecommerce-react-fb-redux.firebasestorage.app",
  messagingSenderId: "715908182726",
  appId: "1:715908182726:web:91633e61e5adfd8a651dc7",
  measurementId: "G-MZ6GKR76Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
const auth = getAuth(app)
export {fireDB ,auth}
