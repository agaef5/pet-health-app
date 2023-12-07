/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
} from "@nextui-org/react";

export default function VaccinationLog({ vaccDetails }) {
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

  const { name, dosageDate, veterinarian, notes } = vaccDetails;
  const date = new Date(dosageDate.seconds * 1000).toLocaleDateString();

  return (
    <Card>
      <CardHeader>
        <h2>{name}</h2>
      </CardHeader>
      <CardBody>
        <p>{date}</p>
        <p>{veterinarian ? veterinarian : null}</p>
        <Divider />
        <p>Notes: {notes ? notes : null}</p>
      </CardBody>
    </Card>
  );
}
