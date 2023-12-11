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

export default function VaccinationLog({ vaccDetails }) {
  const [logData, setLogData] = useState([]);
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

  const { name, dosageDate, veterinarian, notes } = vaccDetails[0];

  console.log(dosageDate);
  const date = dosageDate
    ? new Date(dosageDate.seconds * 1000).toLocaleDateString()
    : null;
  console.log(date);

  return (
    <Card>
      <CardHeader>
        <h2>{name}</h2>
      </CardHeader>
      <CardBody>
        <p>{date}</p>
        <p>{veterinarian ? veterinarian : null}</p>
      </CardBody>
    </Card>
  );
}
