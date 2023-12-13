import { useEffect, useState } from "react";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";
import AddNewPetTile from "../../components/CreateNewData/AddNewPet/AddNewPetTile";
import getPets from "../../functions/fetchData/getPets";
import { Skeleton } from "@nextui-org/react";

function YourPetsPage() {
  const [pets, setPets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      const petsData = await getPets();
      setPets(petsData);
      setTimeout(() => {
        setIsLoaded(true);
      }, 250);
    };
    fetchData();
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1>Your Pets</h1>
      <Skeleton isLoaded={isLoaded} className="rounded-lg">
        {pets.map((pet) => (
          <PetsTileDetailed key={pet.id} petData={pet} />
        ))}
      </Skeleton>
      <AddNewPetTile />
    </div>
  );
}

export default YourPetsPage;
