import { Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import NavigationBar from "../../components/Navigation Bar/NavigationBar";
import PetTile from "../../components/Dashboard/PetTile";
import AddNewPetTile from "../../components/Dashboard/AddNewPetTile";
import TaskTile from "../../components/Dashboard/TaskTile";

function Dashboard() {
  function hangleLogOut() {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
    });
    localStorage.removeItem("currentUserUID");
    window.location.href = "/";
  }
  return (
    <>
      <section>
        <h2>Your pets:</h2>
        <PetTile />
        <AddNewPetTile />
      </section>
      <section>
        <h2>Your tasks:</h2>
        <TaskTile />
      </section>

      <Button onClick={hangleLogOut}>Sign out</Button>
      <NavigationBar />
    </>
  );
}

export default Dashboard;
