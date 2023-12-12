/* eslint-disable react/prop-types */
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Weight({
  onFormChange,
  isFormSubmitted,
  existingData,
}) {
  const [formData, setFormData] = useState({
    date: "",
    task: "",
    isDone: false,
  });

  useEffect(() => {
    if (existingData) {
      // If there is existing data, populate the form fields
      const { id, task, date, isDone } = existingData;

      // Convert Firebase Timestamp to Date object
      const formattedDate = date ? new Date(date.seconds * 1000) : null;

      setFormData({
        docID: id,
        task: task,
        date: formattedDate ? formattedDate.toLocaleDateString() : "",
        isDone: isDone,
      });
    }
  }, [existingData]);

  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidDate = (dateString) => {
    if (dateString.trim() === "") {
      return true;
    }
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateString);
  };

  const isRequiredFieldValid = (value) => {
    console.log("Checking validity:", value.trim() !== "");
    return value.trim() !== "";
  };
  console.log("isFormSubmitted:", isFormSubmitted);
  console.log(formData);

  return (
    <div>
      <h2>Create new task</h2>
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
        isInvalid={isFormSubmitted && !isValidDate(formData.date)}
        errorMessage={
          isFormSubmitted && !isValidDate(formData.date)
            ? "Please enter a valid date"
            : null
        }
        value={formData.date}
        onChange={(e) => handleInputChange("date", e.target.value)}
      />
    </div>
  );
}
