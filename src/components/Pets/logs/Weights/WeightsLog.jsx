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
    return <p className="text-center w-full p-4">No data</p>;
  }

  const { date, weight } = kgDetails[0];

  const weightDate = date
    ? new Date(date.seconds * 1000).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Card className="flex flex-row justify-between max-h-fit items-center bg-background my-4 p-2 w-full">
      <CardHeader className="max-w-fit">
        <h2>{weight} kg</h2>
      </CardHeader>
      <CardBody className="max-w-fit">
        {weightDate ? <p>{weightDate}</p> : null}
      </CardBody>
    </Card>
  );
}
