import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function updateTask(formData) {
  console.log(formData);

  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const { taskID, task, date, notes } = formData;

    const taskData = {
      task: task,
      isDone: false,
    };

    // Add birthday if it exists
    if (date) {
      const [day, month, year] = date.split("/");
      taskData.date = Timestamp.fromDate(new Date(`${year}-${month}-${day}`));
    }
    if (notes) {
      taskData.notes = notes;
    }

    const weightRef = doc(db, "users", user.uid, "tasks", taskID);

    await updateDoc(weightRef, taskData);

    console.log("Task data added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
