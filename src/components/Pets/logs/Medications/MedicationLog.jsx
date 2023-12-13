/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import getLogsbyMedicineID from "../../../../functions/fetchData/getLogsByMedicineID";

export default function MedicationLog({ mediDetails, petID }) {
  const [logData, setLogData] = useState([]);
  console.log(mediDetails);
  // Check if apptDetails is null or undefined
  if (!mediDetails || mediDetails.length === 0) {
    return <p className="text-center w-full p-4">No data</p>;
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
  } = mediDetails[0];
  const prescribedDate = new Date(
    prescribed.seconds * 1000
  ).toLocaleDateString();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getLogsbyMedicineID(petID, id);
      setLogData(fetchedData);
    }
    fetchData();
  }, [petID]);

  return (
    <Card className="bg-background my-4 p-2 w-full">
      <CardHeader>
        <h2>
          {name} {dosage && `, ${dosage}`}
        </h2>
      </CardHeader>
      <Divider />
      {logData.length > 0 ? (
        <CardBody>
          <div className="flex flex-row justify-between">
            <p>
              Next dosage date:{" "}
              {new Date(
                logData[0].dosageDate.seconds * 1000
              ).toLocaleDateString()}
            </p>
            <Checkbox
              color="success"
              isSelected={logData[0].isDosed === true ? true : false}
            />
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <p>No dosage log available</p>
        </CardBody>
      )}
    </Card>
  );
}
