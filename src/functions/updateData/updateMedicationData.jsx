import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function updateMedicationData(formData) {
  console.log(formData);
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const {
      docID,
      petID,
      name,
      prescribed,
      dosage,
      dosagesAmount,
      frequencyCount,
      frequencyPeriod,
      veterinarian,
      notes,
    } = formData;

    const petData = {
      name: name,
    };

    // Add birthday if it exists
    if (prescribed) {
      const [day, month, year] = prescribed.split("/");
      petData.prescribed = Timestamp.fromDate(
        new Date(`${year}-${month}-${day}`)
      );
    }

    // Add optional fields if they exist
    if (dosage) {
      petData.dosage = dosage;
    }

    if (frequencyCount) {
      petData.frequencyCount = frequencyCount;
    }

    if (frequencyPeriod) {
      petData.frequencyPeriod = frequencyPeriod;
    }

    if (veterinarian) {
      petData.veterinarian = veterinarian;
    }

    if (notes) {
      petData.notes = notes;
    }

    const medicationRef = doc(
      db,
      "users",
      user.uid,
      "pets",
      petID,
      "medications",
      docID
    );

    await updateDoc(medicationRef, petData);

    console.log("Medicine data added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
