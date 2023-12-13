/* eslint-disable react/prop-types */
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { PetDataContext } from "../../../pages/Pet/PetDetailsPage";

export default function PetForm({
  onFormChange,
  isFormSubmitted,
  existingData,
  propPetID,
}) {
  const petDataContext = useContext(PetDataContext);
  const petID = petDataContext ? petDataContext.petID : "";
  const [selectedPet, setSelectedPet] = useState(petID || propPetID || "");
  const sexTypeOptions = ["female", "male"];
  const isNeuteredOptions = ["yes", "no"];

  const [formData, setFormData] = useState({
    petID: selectedPet,
    name: "",
    birthday: "",
    sex: "",
    neutered: "",
    species: "",
    breed: "",
    color: "",
    photo: null,
  });

  useEffect(() => {
    if (existingData) {
      // If there is existing data, populate the form fields
      const { name, birthday, sex, neutered, species, breed, color, photo } =
        existingData;

      // Convert Firebase Timestamp to Date object
      const formattedDate = birthday ? new Date(birthday.seconds * 1000) : null;

      setSelectedPet(propPetID);
      setFormData({
        petID: propPetID,
        name: name,
        birthday: formattedDate ? formattedDate.toLocaleDateString() : "",
        sex: sex || "",
        neutered: neutered === true ? "yes" : "no",
        species: species || "",
        breed: breed || "",
        color: color || "",
        photo: photo || null,
      });
    }
  }, [existingData, propPetID]);

  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  const handleSelectionChange = (name, value) => {
    let selectedValue;
    // Map selected value to boolean if applicable
    if (name === "neutered") {
      selectedValue = value === "yes";
    } else {
      selectedValue = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedValue,
    }));
  };

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
      <p>Pet basic information</p>
      <Input
        isRequired
        label="Name"
        placeholder="e.g. Azor"
        isInvalid={isFormSubmitted && !isRequiredFieldValid(formData.name)}
        errorMessage={
          isFormSubmitted && !isRequiredFieldValid(formData.name)
            ? "This field is required"
            : null
        }
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />

      <Input
        label="Profile picture"
        type="file"
        accept="image/*"
        onChange={(e) => handleInputChange("photo", e.target.files[0])}
      />

      <Input
        label="Birth date"
        placeholder="DD/MM/YYYY"
        isInvalid={isFormSubmitted && !isValidDate(formData.birthday)}
        errorMessage={
          isFormSubmitted && !isValidDate(formData.birthday)
            ? "Please enter a valid date"
            : null
        }
        value={formData.birthday}
        onChange={(e) => handleInputChange("birthday", e.target.value)}
      />

      <Select
        label="Sex"
        value={formData.sex}
        onChange={(e) => handleSelectionChange("sex", e.target.value)}
      >
        {sexTypeOptions.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="Is your pet neutered?"
        value={formData.neutered ? "Yes" : "No"}
        onChange={(e) => handleSelectionChange("neutered", e.target.value)}
      >
        {isNeuteredOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </Select>

      <Input
        label="Species"
        placeholder="e.g. Cat"
        value={formData.species}
        onChange={(e) => handleInputChange("species", e.target.value)}
      />

      <Input
        label="Breed"
        placeholder="e.g. Common Shorthair"
        value={formData.breed}
        onChange={(e) => handleInputChange("breed", e.target.value)}
      />

      <Input
        label="Color/markings"
        placeholder="e.g. Black and white"
        value={formData.color}
        onChange={(e) => handleInputChange("color", e.target.value)}
      />
    </div>
  );
}
