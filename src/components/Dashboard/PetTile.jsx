import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function PetTile() {
  const navigate = useNavigate();

  function handlePetDetailsClick() {
    navigate("/petdetails");
  }
  return (
    <Card is isPressable onClick={handlePetDetailsClick}>
      <CardBody></CardBody>
      <CardHeader>
        <h2>PetNem</h2>
      </CardHeader>
    </Card>
  );
}

export default PetTile;
