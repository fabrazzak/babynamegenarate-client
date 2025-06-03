// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv7bAmYwngn6wYuoRsWUKFGUB7B-MffYo",
  authDomain: "babynamegenarate.firebaseapp.com",
  projectId: "babynamegenarate",
  storageBucket: "babynamegenarate.firebasestorage.app",
  messagingSenderId: "1000349285751",
  appId: "1:1000349285751:web:379fbdfb53745d9a85f572"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();