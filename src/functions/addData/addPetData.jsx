import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function addPetData(formData) {
  console.log(formData);
  try {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user found.");
      throw new Error("No user found.");
    }

    const { name, birthday, sex, neutered, species, breed, color } = formData;
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

    const petRef = collection(db, "users", user.uid, "pets");

    await addDoc(petRef, petData);

    console.log("Pet data added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding pet data:", error);
    return false;
  }
}
