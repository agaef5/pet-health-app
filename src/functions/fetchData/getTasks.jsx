import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function getTasks() {
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

    const tasksRef = collection(db, "users", user.uid, "tasks");
    const tasksSnapshot = await getDocs(tasksRef);

    const tasksArray = [];

    tasksSnapshot.forEach((task) => {
      tasksArray.push({ id: task.id, ...task.data() });
    });

    return tasksArray;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
}
