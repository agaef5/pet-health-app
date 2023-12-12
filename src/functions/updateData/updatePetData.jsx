import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase-config";
import { ref, uploadBytes } from "firebase/storage";

export default async function updatePetData(formData) {
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
      birthday,
      sex,
      neutered,
      species,
      breed,
      color,
      photo,
    } = formData;

    const petData = {
      name: name,
    };

    // Add birthday if it exists
    if (birthday) {
      const [day, month, year] = birthday.split("/");
      petData.birthday = Timestamp.fromDate(
        new Date(`${year}-${month}-${day}`)
      );
    }

    // Add optional fields if they exist
    if (sex) {
      petData.sex = sex;
    }

    if (neutered) {
      petData.neutered = neutered;
    }

    if (species) {
      petData.species = species;
    }

    if (breed) {
      petData.breed = breed;
    }

    if (color) {
      petData.color = color;
    }

    const petRef = doc(db, "users", user.uid, "pets", petID);

    await updateDoc(petRef, petData);

    if (photo) {
      const storageRef = ref(storage, `users/${user.uid}/${petID}.jpg`);
      await uploadBytes(storageRef, photo);
    }

    console.log("Appointment data updated successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
