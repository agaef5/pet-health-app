/* eslint-disable react/prop-types */
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function AppointmentLog({ apptDetails }) {
  // Check if apptDetails is null or undefined
  if (!apptDetails || apptDetails.length === 0) {
    return <p className="text-center w-full p-4">No data</p>;
  }

  const { title, date, veterinarian } = apptDetails[0];
  const formattedDate = date
    ? new Date(date.seconds * 1000).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Card className="bg-background my-4 p-2 w-full">
      <CardHeader>
        <h2>{title}</h2>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row justify-between">
        {formattedDate ? <p>{formattedDate}</p> : null}
        {veterinarian ? <p>{veterinarian}</p> : null}
      </CardBody>
    </Card>
  );
}
