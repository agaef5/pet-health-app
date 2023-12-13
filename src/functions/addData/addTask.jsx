import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function addTask(formData) {
  console.log(formData);
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const { task, date, notes } = formData;

    const taskData = {
      task: task,
      isDone: false,
    };

    // Add birthday if it exists
    if (date) {
      const [day, month, year] = date.split("/");
      taskData.date = Timestamp.fromDate(new Date(`${year}-${month}-${day}`));
    } else {
      // If date does not exist, add today's date
      taskData.date = Timestamp.fromDate(new Date());
    }

    if (notes) {
      taskData.notes = notes;
    }

    const weightRef = collection(db, "users", user.uid, "tasks");

    await addDoc(weightRef, taskData);

    console.log("Task data added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
