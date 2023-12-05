import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCdDd4yg_lJSzRsjJPJUBLWo6NXnE-KuS0",
  authDomain: "gogreen-9326c.firebaseapp.com",
  projectId: "gogreen-9326c",
  storageBucket: "gogreen-9326c.appspot.com",
  messagingSenderId: "514721905752",
  appId: "1:514721905752:web:21fa76da416638346b5e2d",
  databaseURL:
    "https://gogreen-9326c-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
