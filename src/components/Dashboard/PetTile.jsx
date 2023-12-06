import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function PetTile({ petData }) {
  const navigate = useNavigate();
  const petName = petData.name;
  function handlePetDetailsClick() {
    navigate("/petdetails");
  }
  return (
    <Card is isPressable onClick={handlePetDetailsClick}>
      <CardBody></CardBody>
      <CardHeader>
        <h2>{petName}</h2>
      </CardHeader>
    </Card>
  );
}

export default PetTile;