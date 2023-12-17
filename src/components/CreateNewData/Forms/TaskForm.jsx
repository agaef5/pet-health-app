/* eslint-disable react/prop-types */
import { Input, Textarea } from "@nextui-org/react";
import { isValid, parse } from "date-fns";
import { useEffect, useState } from "react";

export default function Weight({
  onFormChange,
  isFormSubmitted,
  existingData,
}) {
  const [formData, setFormData] = useState({
    date: "",
    task: "",
    notes: "",
    isDone: false,
  });

  const isDateValid = () => {
    const { date } = formData;

    // Check if the date is empty or valid
    return (
      date.length === 0 ||
      (date.length === 10 && isValid(parse(date, "dd/MM/yyyy", new Date())))
    );
  };

  useEffect(() => {
    if (existingData) {
      // If there is existing data, populate the form fields
      const { id, task, date, notes, isDone } = existingData;

      // Convert Firebase Timestamp to Date object
      const formattedDate = date
        ? new Date(date.seconds * 1000).toISOString().split("T")[0]
        : null;

      setFormData({
        taskID: id,
        task: task,
        notes: notes,
        date: formattedDate ? formattedDate : "",
        isDone: isDone,
      });
    }
  }, [existingData]);

  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  const handleInputChange = (name, value) => {
    if (name === "date") {
      // Remove non-digit characters
      const cleanedValue = value.replace(/\D/g, "");

      // Format the date input as DD/MM/YYYY
      let formattedDate = "";

      for (let i = 0; i < cleanedValue.length && i < 8; i++) {
        if (i === 2 || i === 4) {
          formattedDate += "/";
        }
        formattedDate += cleanedValue[i];
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const isRequiredFieldValid = (value) => {
    return value.trim() !== "";
  };

  return (
    <div className="flex flex-col gap-6">
      {existingData ? null : <h3>Create new task</h3>}
      <Input
        isRequired
        label="Task"
        placeholder="e.g. book an appointment"
        isInvalid={isFormSubmitted && !isRequiredFieldValid(formData.task)}
        errorMessage={
          isFormSubmitted && !isRequiredFieldValid(formData.task)
            ? "This field is required"
            : null
        }
        value={formData.task}
        onChange={(e) => handleInputChange("task", e.target.value)}
      />

      <Input
        label="Task due date"
        placeholder="DD/MM/YYYY"
        isInvalid={!isDateValid() && formData.date.length === 10}
        errorMessage={
          !isDateValid() && formData.date.length === 10
            ? "Invalid date format"
            : null
        }
        value={formData.date}
        onChange={(e) => handleInputChange("date", e.target.value)}
      />

      <Textarea
        label="Notes"
        placeholder="e.g. call the vet"
        value={formData.notes}
        onChange={(e) => handleInputChange("notes", e.target.value)}
      />
    </div>
  );
}
