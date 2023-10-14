// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSaGvGe7jm_UaHz0jLLnl2V6E6nHVNu-c",
  authDomain: "adv-intern.firebaseapp.com",
  projectId: "adv-intern",
  storageBucket: "adv-intern.appspot.com",
  messagingSenderId: "644212489395",
  appId: "1:644212489395:web:3b93ed18f4cbc38ad744c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
