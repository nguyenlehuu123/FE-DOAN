// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBxe2CB1d5_7SM8FApvKxWoPFq7d_pp2_U",
    authDomain: "do-an-4c6a3.firebaseapp.com",
    projectId: "do-an-4c6a3",
    storageBucket: "do-an-4c6a3.appspot.com",
    messagingSenderId: "805415578002",
    appId: "1:805415578002:web:3fbce9337bbc82123ab94b",
    measurementId: "G-EDPJ2Z6N06"
  };

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
})