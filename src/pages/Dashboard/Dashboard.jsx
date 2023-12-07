import { Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import PetTile from "../../components/Dashboard/PetTile";
import AddNewPetTile from "../../components/Dashboard/AddNewPetTile";
import TaskTile from "../../components/Dashboard/TaskTile";
import getPets from "../../functions/fetchData/getPets";
import { useEffect, useState } from "react";

function Dashboard() {
  function hangleLogOut() {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
    });
    localStorage.removeItem("currentUserUID");
    window.location.href = "/";
  }

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const petsData = await getPets();
      setPets(petsData);
    };
    fetchData();
  }, []);

  return (
    <section>
      <div>
        <h2>Your pets:</h2>
        {pets.map((pet) => (
          <PetTile key={pet.id} petData={pet} />
        ))}
        <AddNewPetTile />
      </div>
      <div>
        <h2>Your tasks:</h2>
        <TaskTile />
      </div>

      <Button onClick={hangleLogOut}>Sign out</Button>
    </section>
  );
}

export default Dashboard;
