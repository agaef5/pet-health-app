import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function getPetByID(petID) {
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

    const petsRef = doc(db, "users", user.uid, "pets", petID);
    const petSnapshot = await getDoc(petsRef);

    if (petSnapshot.exists()) {
      const petData = petSnapshot.data();
      return petData;
    } else {
      // Handle the case when the document doesn't exist
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching pet:", error);
    return null;
  }
}
