// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyC4F14n0jBxi56XcugLJWnefHi3-gNI-_c",
authDomain: "babynameblessing-7f047.firebaseapp.com",
projectId: "babynameblessing-7f047",
storageBucket: "babynameblessing-7f047.firebasestorage.app",
messagingSenderId: "139445184927",
appId: "1:139445184927:web:865a53e2edf0f34a9bf5aa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();




