import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
setPersistence(auth, browserLocalPersistence);

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
