import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function addVaccinationData(formData) {
  console.log(formData);
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const { petID, name, dosageDate, veterinarian, notes } = formData;

    const petData = {
      name: name,
    };

    // Add birthday if it exists
    if (dosageDate) {
      const [day, month, year] = dosageDate.split("/");
      petData.dosageDate = Timestamp.fromDate(
        new Date(`${year}-${month}-${day}`)
      );
    } else {
      // If date does not exist, add today's date
      petData.dosageDate = Timestamp.fromDate(new Date());
    }

    if (veterinarian) {
      petData.veterinarian = veterinarian;
    }

    if (notes) {
      petData.notes = notes;
    }

    const vaccinationRef = collection(
      db,
      "users",
      user.uid,
      "pets",
      petID,
      "vaccinations"
    );

    await addDoc(vaccinationRef, petData);

    console.log("Medicine data added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
