/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import FormPopup from "../../../CreateNewData/FormPopUp";
import deleteHealthLog from "../../../../functions/Delete Data/DeleteHealthLog";

export default function VaccinationLog({ vaccDetails, petID }) {
  console.log(vaccDetails);
  // Check if apptDetails is null or undefined
  if (!vaccDetails || vaccDetails.length === 0) {
    return (
      <Card>
        <CardBody>
          <p>No data</p>
        </CardBody>
      </Card>
    );
  }

  const { id, name, dosageDate, veterinarian, notes } = vaccDetails;
  const date = dosageDate
    ? new Date(dosageDate.seconds * 1000).toLocaleDateString()
    : "";

  return (
    <Card>
      <CardHeader>
        <h2>{name}</h2>

        <FormPopup
          logType={"vaccinations"}
          editMode={true}
          existingData={vaccDetails}
          petID={petID}
        />
        <Button
          onClick={() =>
            deleteHealthLog({ petID, id, logType: "vaccinations" })
          }
        >
          Delete
        </Button>
      </CardHeader>
      <CardBody>
        <p>{date}</p>
        <p>{veterinarian ? veterinarian : null}</p>
        <Divider />
        {notes ? <p>Notes:{notes}</p> : null}
      </CardBody>
    </Card>
  );
}
