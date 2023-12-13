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
  const [isVisible, setIsVisible] = useState(true);

  // Convert timestamp to DD/MM/YYYY format
  const timestampInSeconds = date.seconds;
  const formattedDate = new Date(timestampInSeconds * 1000).toLocaleDateString(
    "en-GB"
  );

  async function handleDoneCheckboxChange() {
    setIsVisible(false);
    const user = auth.currentUser;
    const tasksRef = doc(db, "users", user.uid, "tasks", taskID);

    await updateDoc(tasksRef, { isDone: !isDone });
    setTimeout(() => {
      setIsDone(!isDone);
      if (onTaskUpdate) {
        onTaskUpdate();
        setIsVisible(true);
      }
    }, 100);
  }

  return (
    <div
      className={` transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Card className="p-1">
        <Accordion disableIndicatorAnimation>
          <AccordionItem
            title={task}
            subtitle={formattedDate ? formattedDate : null}
            indicator={
              <Checkbox
                radius="full"
                size="lg"
                color="success"
                isSelected={isDone}
                onChange={() => handleDoneCheckboxChange()}
              ></Checkbox>
            }
          >
            {notes ? (
              <div className="pb-4">
                <Divider />
                <h3 className="px-0">Notes:</h3>
                <p>{notes}</p>
              </div>
            ) : null}
            <Divider />
            <div className="flex flex-row items-baseline justify-end">
              <FormPopup
                logType="tasks"
                editMode={true}
                existingData={taskData}
                setRefreshPage={onTaskUpdate}
              />
              <DeleteData docID={taskID} />
            </div>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
