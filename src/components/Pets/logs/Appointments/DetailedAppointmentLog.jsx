/* eslint-disable react/prop-types */
import { Card, CardBody, CardHeader, Divider, Modal } from "@nextui-org/react";

import FormPopup from "../../../CreateNewData/FormPopUp";
import DeleteData from "../../../DeleteData/DeleteButtonAndModal";

export default function DetailedAppointmentLog({ apptDetails, petID }) {
  console.log("PetID: ", petID);
  console.log("DetailedAppointmentLog: ", apptDetails);
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

  const { id, title, date, veterinarian, notes } = apptDetails;
  const formattedDate = date
    ? new Date(date.seconds * 1000).toLocaleDateString()
    : "";

  return (
    <>
      <Card>
        <CardHeader>
          <h2>{title}</h2>

          <FormPopup
            logType={"appointments"}
            editMode={true}
            existingData={apptDetails}
            petID={petID}
          />
          <DeleteData petID={petID} logType={"appointments"} docID={id} />
        </CardHeader>
        <CardBody>
          <Divider />
          <p>{formattedDate}</p>
          {veterinarian ? <p>{veterinarian}</p> : null}
          {notes ? (
            <>
              <Divider /> <p>Notes:{notes}</p>
            </>
          ) : null}
        </CardBody>
      </Card>

      <Modal />
    </>
  );
}
