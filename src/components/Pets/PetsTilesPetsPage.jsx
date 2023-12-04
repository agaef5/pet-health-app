import { Card, CardBody, CardHeader } from "@nextui-org/react";

function PetsTileDetailed() {
  return (
    <Card>
      <img src="" alt="pet image" />
      <CardHeader>
        <h2>Pet Name</h2>
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
