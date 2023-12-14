import { useEffect, useState } from "react";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";
import getPets from "../../functions/fetchData/getPets";
import { ScrollShadow } from "@nextui-org/react";
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
      } relative max-h-[88vh] pt-10 p-4`}
    >
      <h1>Your Pets</h1>

      <ScrollShadow size={150} className="h-[82vh] pb-24">
        <div className="flex flex-col min-h-fit items-center justify-center gap-4 pt-4 pb-32">
          {pets.map((pet) => (
            <PetsTileDetailed key={pet.id} petData={pet} />
          ))}
        </div>
      </ScrollShadow>
      <FormPopup
        classButtonName={"fixed bottom-24 right-4"}
        logType={"Pet"}
        setRefreshPage={setRefreshPage}
      />
    </div>
  );
}

export default YourPetsPage;
