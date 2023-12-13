import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export default async function deletePet({ petID }) {
  console.log("handleDelete: ", petID);

  const userID = localStorage.getItem("currentUserUID");
  await deleteDoc(doc(db, "users", userID, "pets", petID));
  return true;
}
