import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtZ1T40A62Q4a-rTPOD7oj_ECrC-4MTow",
  authDomain: "video-c75a5.firebaseapp.com",
  projectId: "video-c75a5",
  storageBucket: "video-c75a5.appspot.com",
  messagingSenderId: "966980389999",
  appId: "1:966980389999:web:0335ecf4fc52278380519a",
  measurementId: "G-6KGKPFKSWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;