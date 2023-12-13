import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase-config";

export default async function getHealthData(petID, logType) {
  let userID = localStorage.getItem("currentUserUID");

  // If there is no current user, check local storage
  if (!userID) {
    console.log("No user found. Redirecting to /");
    window.location.href = "/";
    return null;
  }

  let date; // Declare date variable outside the if-else blocks
  if (logType === "medications") {
    date = "prescribed";
  } else if (logType === "vaccinations") {
    date = "dosageDate";
  } else {
    date = "date";
  }

  console.log(userID, petID, logType);

  const petsRef = collection(db, "users", userID, "pets", petID, logType);
  const q = query(petsRef, orderBy(date, "desc"));
  const dataSnapshot = await getDocs(q);

  const healthDataArray = [];

  dataSnapshot.forEach((data) => {
    healthDataArray.push({ id: data.id, ...data.data() });
  });

  console.log(healthDataArray);

  return healthDataArray;
}
