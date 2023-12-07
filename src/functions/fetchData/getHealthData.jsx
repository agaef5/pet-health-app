import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function getHealthData(petID, logType) {
  let user = auth.currentUser;

  // If there is no current user, check local storage
  if (!user) {
    console.log("No user found. Redirecting to /");
    window.location.href = "/";
    return null;

    // const currentUserUID = localStorage.getItem("currentUserUID");

    // if (currentUserUID) {
    //   user = { uid: currentUserUID };
    // } else {
    //   // Redirect to "/" if there is no user
    //   console.log("No user found. Redirecting to /");
    //   window.location.href = "/";
    //   return null;
    // }
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
