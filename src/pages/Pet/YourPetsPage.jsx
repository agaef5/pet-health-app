import { useEffect, useState } from "react";
import NavigationBar from "../../components/Navigation Bar/NavigationBar";
import AddNewPetTile from "../../components/Pets/AddNewPetTile";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";
import getPets from "../../functions/fetchData/getPets";

function YourPetsPage() {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const petsData = await getPets();
      setPets(petsData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Your Pets</h1>
      {pets.map((pet) => (
        <PetsTileDetailed key={pet.id} petData={pet} />
      ))}
      <AddNewPetTile />

      <NavigationBar />
    </div>
  );
}

export default YourPetsPage;
