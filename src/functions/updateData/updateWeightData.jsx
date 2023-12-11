import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function updateWeightData(formData) {
  console.log(formData);
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const { docID, petID, weight, date } = formData;

    const petData = {
      weight: weight,
    };

    // Add birthday if it exists
    if (date) {
      const [day, month, year] = date.split("/");
      petData.date = Timestamp.fromDate(new Date(`${year}-${month}-${day}`));
    }

    const weightRef = doc(
      db,
      "users",
      user.uid,
      "pets",
      petID,
      "weights",
      docID
    );

    await updateDoc(weightRef, petData);

    console.log("Appointment data updated successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
