import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function getNewestHealthLog(petID, logType) {
  const user = auth.currentUser;

  if (!user) {
    console.error("User not authenticated");
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

  console.log(user.uid, petID, logType);

  const petsRef = collection(db, "users", user.uid, "pets", petID, logType);
  // Create a query to order the documents by a timestamp field (replace 'timestamp' with the actual field name)
  const q = query(petsRef, orderBy(date, "desc"), limit(1));
  const querySnapshot = await getDocs(q);

  const healthLog = [];

  querySnapshot.forEach((data) => {
    healthLog.push({ id: data.id, ...data.data() });
  });

  console.log(healthLog);
  return healthLog;
}
