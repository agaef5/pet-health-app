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

    // ... (other code remains unchanged)

    if (photo) {
      const fileExtension =
        photo[0].type === "image/png"
          ? "png"
          : photo[0].type === "image/jpeg" || photo[0].type === "image/jpg"
            ? "jpg"
            : null;

      if (fileExtension) {
        const storageRef = ref(storage, `users/${user.uid}/${petID}.jpg`);

        // Ensure that the uploaded file is an image
        if (photo[0].type.startsWith("image/")) {
          await uploadBytes(storageRef, photo[0]);
          console.log("Image uploaded successfully!");
        } else {
          console.error("Invalid file type. Please upload a valid image file.");
          // Handle the error as needed
        }
      } else {
        console.error(
          "Unsupported file type. Please upload a valid image file."
        );
        // Handle the error as needed
      }
    }

    // ... (other code remains unchanged)

    console.log("Appointment data updated successfully!");
    return true;
  } catch (error) {
    console.error("Error adding medicine data:", error);
    return false;
  }
}
