import { Card, CardBody, CardHeader } from "@nextui-org/react";
import FormPopup from "../FormPopUp";

function AddNewPetTile() {
  return (
    <section>
      <Card isPressable>
        <CardBody>
          <FormPopup logType={"Pet"} />
        </CardBody>
        <CardHeader>
          <h2>Add new pet</h2>
        </CardHeader>
      </Card>
    </section>
  );
}

export default AddNewPetTile;
