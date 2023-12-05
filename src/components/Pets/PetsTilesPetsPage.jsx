import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const PetDataContext = createContext();

function PetsTileDetailed() {
  const navigate = useNavigate();

  const petData = {
    petID: "1234", // Replace with the actual way you get the pet ID
    petName: "Buddy", // Replace with the actual way you get the pet name
  };

  function handlePetDetailsClick() {
    navigate(`/pets/${petData.petID}`);
  }

  return (
    <Card isPressable onClick={handlePetDetailsClick}>
      <img src="" alt="pet image" />
      <CardHeader>
        <h2>{petData.petName}</h2>
      </CardHeader>
      <CardBody>
        <p>pet description</p>
        <p>pet age</p>
        <p>pet species</p>
      </CardBody>
    </Card>
  );
}

export default PetsTileDetailed;
