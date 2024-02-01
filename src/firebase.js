// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACqDePISh0RMWetTf2JFhUp4FIAvs1Lm0",
  authDomain: "realtor-clone-react-841cd.firebaseapp.com",
  projectId: "realtor-clone-react-841cd",
  storageBucket: "realtor-clone-react-841cd.appspot.com",
  messagingSenderId: "996429747710",
  appId: "1:996429747710:web:3655fbf0bd3d9b7a3a1caf"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();