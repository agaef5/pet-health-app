import { useEffect, useState } from "react";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";
import AddNewPetTile from "../../components/CreateNewData/AddNewPet/AddNewPetTile";
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
    </div>
  );
}

export default YourPetsPage;
