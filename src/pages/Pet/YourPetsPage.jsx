import { useEffect, useState } from "react";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";
import getPets from "../../functions/fetchData/getPets";
import { Skeleton } from "@nextui-org/react";
import FormPopup from "../../components/CreateNewData/FormPopUp";

function YourPetsPage() {
  const [pets, setPets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  const fetchData = async () => {
    setIsLoaded(false);
    const petsData = await getPets();
    setPets(petsData);
    setTimeout(() => {
      setIsLoaded(true);
    }, 250);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    setRefreshPage(false);
  }, [refreshPage === true]);

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
      <FormPopup logType={"Pet"} setRefreshPage={setRefreshPage} />
    </div>
  );
}

export default YourPetsPage;
