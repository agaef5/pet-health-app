import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function getHealthData(petID, logType) {
  const user = auth.currentUser;

  if (!user) {
    console.error("User not authenticated");
    return null;
  }

  console.log(user.uid, petID, logType);

  const petsRef = collection(db, "users", user.uid, "pets", petID, logType);
  const dataSnapshot = await getDocs(petsRef);

  const healthDataArray = [];

  dataSnapshot.forEach((data) => {
    healthDataArray.push({ id: data.id, ...data.data() });
  });

  console.log(healthDataArray);

  return healthDataArray;
}
