import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

// function calculateDosageDates({
//   dosagesAmount,
//   frequencyCount,
//   frequencyPeriod,
//   prescribed,
// }) {
//   const formatDate = (date) => {
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear().toString();

//     return `${day}/${month}/${year}`;
//   };

//   console.log(dosagesAmount, frequencyCount, frequencyPeriod, prescribed);

//   const periodsInDays = {
//     day: 1,
//     week: 7,
//     month: 30,
//     year: 365,
//   };

//   const prescribedDate = prescribed ? new Date(prescribed) : new Date();
//   console.log(prescribedDate.getTime());
//   const periodInDays = periodsInDays[frequencyPeriod];
//   console.log(prescribedDate.getTime(), periodInDays);

//   if (
//     !prescribedDate ||
//     isNaN(prescribedDate.getTime()) ||
//     dosagesAmount <= 0 ||
//     frequencyCount <= 0 ||
//     !periodInDays
//   ) {
//     console.error("Invalid input data");
//     return [];
//   }

//   const dosageDates = [];
//   let currentDate = new Date(prescribedDate);

//   for (let i = 0; i < dosagesAmount; i++) {
//     dosageDates.push(formatDate(currentDate));

//     // Move to the next dosage date based on frequency
//     currentDate.setDate(currentDate.getDate() + periodInDays / frequencyCount);
//   }

//   return dosageDates;
// }

export default async function addMedicationData(formData) {
  console.log(formData);
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const {
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

    // const result = calculateDosageDates({
    //   dosagesAmount,
    //   frequencyCount,
    //   frequencyPeriod,
    //   prescribed,
    // });
    // console.log(result);

    const petData = {
      name: name,
    };

    // Add birthday if it exists
    if (prescribed) {
      const [day, month, year] = prescribed.split("/");
      petData.prescribed = Timestamp.fromDate(
        new Date(`${year}-${month}-${day}`)
      );
    } else {
      // If date does not exist, add today's date
      petData.prescribed = Timestamp.fromDate(new Date());
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

    const medicationRef = collection(
      db,
      "users",
      user.uid,
      "pets",
      petID,
      "medications"
    );

    await addDoc(medicationRef, petData);

    console.log("Medicine data added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
