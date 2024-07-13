// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getAuth,signInWithPopup,GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA2QJilr2Cax3diG4koPeJ6LH-H4-2dx4",
  authDomain: "munchinkenya.firebaseapp.com",
  projectId: "munchinkenya",
  storageBucket: "munchinkenya.appspot.com",
  messagingSenderId: "994990034542",
  appId: "1:994990034542:web:012902d9332b5e4153a07f",
  measurementId: "G-D23129FVGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();

const analytics = getAnalytics(app);


export default app