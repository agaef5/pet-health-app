import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function addAppointmentData(formData) {
  console.log(formData);
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const { petID, title, purpose, date, veterinarian, notes } = formData;

    const petData = {
      title: title,
    };

    // Add birthday if it exists
    if (date) {
      const [day, month, year] = date.split("/");
      petData.date = Timestamp.fromDate(new Date(`${year}-${month}-${day}`));
    } else {
      // If date does not exist, add today's date
      petData.date = Timestamp.fromDate(new Date());
    }

    // Add optional fields if they exist
    if (purpose) {
      petData.purpose = purpose;
    }

    if (veterinarian) {
      petData.veterinarian = veterinarian;
    }

    if (notes) {
      petData.notes = notes;
    }

    const appointmentRef = collection(
      db,
      "users",
      user.uid,
      "pets",
      petID,
      "appointments"
    );

    await addDoc(appointmentRef, petData);

    console.log("Medicine data added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
