import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function addWeightData(formData) {
  console.log(formData);
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const { petID, weight, date } = formData;

    const petData = {
      weight: weight,
    };

    // Add birthday if it exists
    if (date) {
      const [day, month, year] = date.split("/");
      petData.date = Timestamp.fromDate(new Date(`${year}-${month}-${day}`));
    }

    const weightRef = collection(
      db,
      "users",
      user.uid,
      "pets",
      petID,
      "weights"
    );

    await addDoc(weightRef, petData);

    console.log("Medicine data added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
