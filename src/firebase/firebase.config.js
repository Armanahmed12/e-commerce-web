// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpLy-EgcWHyKWlbgFRKFxLrZ0tIfBQuWI",
  authDomain: "simple-e-commerce-web.firebaseapp.com",
  projectId: "simple-e-commerce-web",
  storageBucket: "simple-e-commerce-web.appspot.com",
  messagingSenderId: "991109574635",
  appId: "1:991109574635:web:76e5704f464e7700ebf3ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;