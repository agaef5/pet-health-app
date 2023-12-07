import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

export default async function getLogsbyMedicineID(petID, medicineID) {
  const user = auth.currentUser;

  if (!user) {
    console.error("User not authenticated");
    return null;
  }

  const medicineLogsRef = collection(
    db,
    "users",
    user.uid,
    "pets",
    petID,
    "medications",
    medicineID,
    "Logs"
  );
  const q = query(medicineLogsRef, orderBy("dosageDate", "desc"));

  const dataSnapshot = await getDocs(q);

  const logsArray = [];

  dataSnapshot.forEach((data) => {
    logsArray.push({ id: data.id, ...data.data() });
  });

  console.log(logsArray);

  return logsArray;
}
