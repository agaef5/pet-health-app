/* eslint-disable react/prop-types */
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
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
  });

  const popularSpeciesList = [
    "Cat",
    "Dog",
    "Horse",
    "Rabbit",
    "Bird",
    "Fish",
    "Hamster",
    "Guinea Pig",
    "Snake",
    "Turtle",
    "Ferret",
  ];

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (name, value) => {
    if (name === "birthday" && value.length > 0) {
      // Convert the input date format to "YYYY-MM-DD"
      const [day, month, year] = value.split("/");
      const formattedDate = `${year}-${month}-${day}`;

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
      <h3>Pet basic information</h3>
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
        placeholder="Upload a photo of your pet"
        type="file"
        accept="image/*"
        onChange={(e) => handleInputChange("photo", e.target.files)}
      />

      <Input
        label="Birth date"
        placeholder="DD/MM/YYYY"
        type="date"
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

      <Autocomplete
        allowsCustomValue
        label="Species"
        placeholder="e.g. Cat"
        value={formData.species}
        onSelectionChange={(selectedValue) =>
          handleSelectionChange("species", selectedValue)
        }
        onInputChange={(inputValue) => handleInputChange("species", inputValue)}
      >
        {popularSpeciesList.map((species) => (
          <AutocompleteItem key={species} value={species}>
            {species}
          </AutocompleteItem>
        ))}
      </Autocomplete>

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
