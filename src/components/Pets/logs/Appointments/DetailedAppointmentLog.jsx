/* eslint-disable react/prop-types */
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function DetailedAppointmentLog({ apptDetails }) {
  // Check if apptDetails is null or undefined
  if (!apptDetails || apptDetails.length === 0) {
    return (
      <Card>
        <CardBody>
          <p>No data</p>
        </CardBody>
      </Card>
    );
  }

  const { title, date, veterinarian, notes } = apptDetails;
  const formattedDate = new Date(date.seconds * 1000).toLocaleDateString();

  return (
    <Card>
      <CardHeader>
        <h2>{title}</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{formattedDate}</p>
        <p>{veterinarian ? veterinarian : null}</p>
        <Divider />
        <p>Notes: {notes ? notes : null}</p>
      </CardBody>
    </Card>
  );
}
