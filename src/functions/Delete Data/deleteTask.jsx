import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export default async function deleteTask({ id }) {
  console.log("handleDelete: ", id);

  const userID = localStorage.getItem("currentUserUID");
  await deleteDoc(doc(db, "users", userID, "tasks", id));
  return true;
}
