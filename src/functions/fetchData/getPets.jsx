import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function getPets() {
  try {
    // Wait for the authentication status to be available
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          resolve();
        }
      });

      // Cleanup the listener after 5 seconds to avoid potential memory leaks
      setTimeout(() => {
        unsubscribe();
        resolve();
      }, 5000);
    });

    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      return null;
    }

    const petsRef = collection(db, "users", user.uid, "pets");
    const petsSnapshot = await getDocs(petsRef);

    const petsArray = [];

    petsSnapshot.forEach((pet) => {
      petsArray.push({ id: pet.id, ...pet.data() });
    });

    return petsArray;
  } catch (error) {
    console.error("Error fetching pets:", error);
    return null;
  }
}
