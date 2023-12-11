import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export default async function deleteHealthLog({ petID, id, logType }) {
  console.log("handleDelete: ", id);
  console.log("handleDelete: ", petID);

  const userID = localStorage.getItem("currentUserUID");
  await deleteDoc(doc(db, "users", userID, "pets", petID, logType, id));
  return console.log("appointment deleted");
}
