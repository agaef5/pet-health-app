/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Modal,
} from "@nextui-org/react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../firebase-config";
import FormPopup from "../../../CreateNewData/FormPopUp";

async function handleDelete(petID, id) {
  console.log("handleDelete: ", id);
  console.log("handleDelete: ", petID);

  const userID = localStorage.getItem("currentUserUID");
  await deleteDoc(doc(db, "users", userID, "pets", petID, "appointments", id));
  return console.log("appointment deleted");
}

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
          />
          <Button onClick={() => handleDelete(petID, id)}>Delete</Button>
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
