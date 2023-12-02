import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCdDd4yg_lJSzRsjJPJUBLWo6NXnE-KuS0",
  authDomain: "gogreen-9326c.firebaseapp.com",
  projectId: "gogreen-9326c",
  storageBucket: "gogreen-9326c.appspot.com",
  messagingSenderId: "514721905752",
  appId: "1:514721905752:web:21fa76da416638346b5e2d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
