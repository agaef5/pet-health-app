import { Timestamp, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function addPetData(formData) {
  const user = auth.currentUser;

  // If there is no current user, check local storage
  if (!user) {
    console.log("No user found. Redirecting to /");
    window.location.href = "/";
    return null;
  }

  const { name, birthday, gender, neutered, species, breed, color } = formData;

  const petRef = doc(db, "users", user.uid, "pets");

  await setDoc(petRef, {
    name: name,
    birthday: Timestamp.fromDate(birthday),
    gender: gender,
    neutered: neutered,
    species: species,
    breed: breed,
    color: color,
  });
}
