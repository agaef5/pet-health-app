import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function updateVaccinationData(formData) {
  console.log(formData);
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const { docID, petID, name, dosageDate, veterinarian, notes } = formData;

    const petData = {
      name: name,
    };

    // Add birthday if it exists
    if (dosageDate) {
      const [day, month, year] = dosageDate.split("/");
      petData.dosageDate = Timestamp.fromDate(
        new Date(`${year}-${month}-${day}`)
      );
    }

    if (veterinarian) {
      petData.veterinarian = veterinarian;
    }

    if (notes) {
      petData.notes = notes;
    }

    const vaccinationRef = doc(
      db,
      "users",
      user.uid,
      "pets",
      petID,
      "vaccinations",
      docID
    );

    await updateDoc(vaccinationRef, petData);

    console.log("Appointment data updated successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
