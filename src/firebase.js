// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {  getAuth } from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDZrXrgumR4WVQb2TxZXOGL4nmoOf9n8M",
  authDomain: "bundy-clock-d7171.firebaseapp.com",
  projectId: "bundy-clock-d7171",
  storageBucket: "bundy-clock-d7171.appspot.com",
  messagingSenderId: "1045650669266",
  appId: "1:1045650669266:web:fa0fe156d951cbbf07370b",
  measurementId: "G-QQXCX574GY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)

export const db = getFirestore(app)
