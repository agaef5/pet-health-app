import { ref } from "firebase/storage";
import { auth, db } from "../../../firebase-config";
import DeleteData from "../../components/DeleteData/DeleteButtonAndModal";
import { deleteUser } from "firebase/auth";

export default function deleteAccount() {
  const user = auth.currentUser;

  // Check if a user is signed in
  if (user) {
    // Delete user data from the database (replace with your database logic)
    const userRef = ref(db, `users/${user.uid}`);

    // Perform any necessary cleanup or data deletion
    // Note: This is a sample, replace it with your actual data deletion logic
    DeleteData(userRef)
      .then(() => {
        console.log("User data deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting user data:", error);
      });

    // Delete the user account
    deleteUser(user)
      .then(() => {
        console.log("User account deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting user account:", error);
      });

    // Redirect or perform other actions
    return true;
  } else {
    // If no user is signed in, handle it accordingly
    console.log("No user is signed in.");
  }
}
