/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionItem,
  Card,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import { useState } from "react";
import FormPopup from "../CreateNewData/FormPopUp";
import DeleteData from "../DeleteData/DeleteButtonAndModal";

export default function TaskTile({ taskID, taskData, onTaskUpdate }) {
  const { task, date, notes } = taskData;
  const [isDone, setIsDone] = useState(taskData.isDone);

  // Convert timestamp to DD/MM/YYYY format
  const timestampInSeconds = date.seconds;
  const formattedDate = new Date(timestampInSeconds * 1000).toLocaleDateString(
    "en-GB"
  );

  console.log("Task data:", taskID);

  async function handleDoneCheckboxChange() {
    const user = auth.currentUser;

    const tasksRef = doc(db, "users", user.uid, "tasks", taskID);
    await updateDoc(tasksRef, { isDone: !isDone }); // Use !done to toggle the value
    setIsDone(!isDone); // Update the state after the database update
    if (onTaskUpdate) {
      onTaskUpdate();
    }
  }

  return (
    <Card className="grid grid-cols-6 justify-stretch">
      <Accordion className="col-span-5">
        <AccordionItem
          title={task}
          subtitle={formattedDate ? formattedDate : null}
        >
          {notes ? <p className="">{notes}</p> : null}
          <Divider />
          <FormPopup logType="tasks" editMode={true} existingData={taskData} />
          <DeleteData docID={taskID} />
        </AccordionItem>
      </Accordion>
      <Checkbox
        className="self-start"
        radius="full"
        size="lg"
        color="success"
        isSelected={isDone}
        onChange={handleDoneCheckboxChange}
      ></Checkbox>
    </Card>
  );
}
