/* eslint-disable react/prop-types */
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const PetDataContext = createContext();

function PetsTileDetailed({ petData }) {
  const navigate = useNavigate();

  function handlePetDetailsClick() {
    setTimeout(() => {
      //for asthetics (to make the button look like it's being pressed)
      navigate(`${petData.id}`);
    }, 400);
  }

  console.log(petData);
  return (
    <Card isPressable onClick={handlePetDetailsClick}>
      <img src="" alt="pet image" />
      <CardHeader>
        <h2>{petData.name}</h2>
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
