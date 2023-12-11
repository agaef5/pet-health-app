/* eslint-disable react-hooks/rules-of-hooks */
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
import { useEffect, useState } from "react";
import getLogsbyMedicineID from "../../../../functions/fetchData/getLogsByMedicineID";
import FormPopup from "../../../CreateNewData/FormPopUp";
import deleteHealthLog from "../../../../functions/Delete Data/DeleteHealthLog";

export default function DetailedMedicationLog({ mediDetails, petID }) {
  const [logData, setLogData] = useState([]);
  console.log(mediDetails);
  if (!mediDetails || mediDetails.length === 0) {
    return (
      <Card>
        <CardBody>
          <p>No data</p>
        </CardBody>
      </Card>
    );
  }

  const {
    id,
    name,
    dosage,
    prescribed,
    frequencyCount,
    frequencyPeriod,
    veterinarian,
    notes,
  } = mediDetails;
  const prescribedDate = prescribed
    ? new Date(prescribed.seconds * 1000).toLocaleDateString()
    : "";

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getLogsbyMedicineID(petID, id);
      setLogData(fetchedData);
    }
    fetchData();
  }, [petID]);

  return (
    <Card>
      <CardHeader>
        <h2>{name}</h2>

        <FormPopup
          logType={"medications"}
          editMode={true}
          existingData={mediDetails}
          petID={petID}
        />
        <Button
          onClick={() => deleteHealthLog({ petID, id, logType: "medications" })}
        >
          Delete
        </Button>
      </CardHeader>
      <CardBody>
        <p>
          Dosage: {dosage ? dosage : null}{" "}
          {frequencyCount && frequencyPeriod
            ? `x${frequencyCount} 
          ${frequencyPeriod}`
            : null}
        </p>
        <p>
          Prescribed: {prescribed ? prescribedDate : null}{" "}
          {veterinarian ? `by ${veterinarian}` : null}
        </p>
        {notes ? <p>Notes: {notes}</p> : null}
        <Divider />
        <p>Dosage log:</p>
        {logData.length > 0 ? (
          logData.map((log) => {
            return (
              <Card key={log.id}>
                <p>
                  {new Date(log.dosageDate.seconds * 1000).toLocaleDateString()}
                </p>
                <Checkbox
                  color="success"
                  isSelected={log.isDosed === true ? true : false}
                />
              </Card>
            );
          })
        ) : (
          <p>No dosage log availa so this is it ble</p>
        )}
      </CardBody>
    </Card>
  );
}
