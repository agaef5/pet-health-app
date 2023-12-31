import { collection, getDocs, orderBy, query } from "firebase/firestore";
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

    const date = "date";
    const tasksRef = collection(db, "users", user.uid, "tasks");
    const q = query(tasksRef, orderBy(date, "desc"));
    const tasksSnapshot = await getDocs(q);

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
