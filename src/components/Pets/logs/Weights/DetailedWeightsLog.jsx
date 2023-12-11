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

export default function WeightsLog({ kgDetails, petID }) {
  console.log(kgDetails);
  console.log(petID);

  // Check if apptDetails is null or undefined
  if (!kgDetails || kgDetails.length === 0) {
    return (
      <Card>
        <CardBody>
          <p>No data</p>
        </CardBody>
      </Card>
    );
  }

  const { id, date, weight } = kgDetails;

  const weightDate = date
    ? new Date(date.seconds * 1000).toLocaleDateString()
    : null;

  return (
    <Card>
      <CardHeader>
        <h2>{weight} kg</h2>

        <FormPopup
          logType={"weights"}
          editMode={true}
          existingData={kgDetails}
          petID={petID}
        />
        <Button
          onClick={() => deleteHealthLog({ petID, id, logType: "weights" })}
        ></Button>
      </CardHeader>
      <CardBody>{weightDate ? <p>weightDate</p> : null}</CardBody>
    </Card>
  );
}
