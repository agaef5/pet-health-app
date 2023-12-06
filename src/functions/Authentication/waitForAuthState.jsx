import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";

export default function waitForAuthState() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve();
      }
    });

    setTimeout(() => {
      unsubscribe();
      resolve();
    }, 5000);
  });
}
