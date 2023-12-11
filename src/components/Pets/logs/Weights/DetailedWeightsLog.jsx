/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
} from "@nextui-org/react";

export default function WeightsLog({ kgDetails }) {
  console.log(kgDetails);
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

  const { date, weight } = kgDetails;

  const weightDate = date
    ? new Date(date.seconds * 1000).toLocaleDateString()
    : null;

  return (
    <Card>
      <CardHeader>
        <h2>{weight} kg</h2>
      </CardHeader>
      <CardBody>{weightDate ? <p>weightDate</p> : null}</CardBody>
    </Card>
  );
}
