import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import { endOfDay, startOfDay } from "date-fns";

export default async function getTodayTasks() {
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

    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    const date = "date";
    const tasksRef = collection(db, "users", user.uid, "tasks");
    const q = query(
      tasksRef,
      where(date, ">=", startOfToday), // Filter tasks where the date is greater than or equal to the start of today
      where(date, "<=", endOfToday), // Filter tasks where the date is less than or equal to the end of today
      orderBy(date, "desc")
    );

    const tasksSnapshot = await getDocs(q);

    const tasksArray = [];

    tasksSnapshot.forEach((task) => {
      tasksArray.push({ id: task.id, ...task.data() });
    });

    return tasksArray;
  } catch (error) {
    console.error("Error fetching today's tasks:", error);
    return null;
  }
}
