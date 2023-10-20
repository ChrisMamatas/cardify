// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZs4i9JsfD5cdmkcxIrizHSwpeg3kV300",
    authDomain: "cardify-d0519.firebaseapp.com",
    projectId: "cardify-d0519",
    storageBucket: "cardify-d0519.appspot.com",
    messagingSenderId: "663262602266",
    appId: "1:663262602266:web:3a79c9fc8b81ae21641da3",
    measurementId: "G-W3KWBTE89P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const analytics = getAnalytics(app);