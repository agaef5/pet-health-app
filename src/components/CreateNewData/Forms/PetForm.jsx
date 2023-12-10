/* eslint-disable react/prop-types */
import { Input, Select, SelectItem } from "@nextui-org/react";
import getPets from "../../../functions/fetchData/getPets";
import { useContext, useEffect, useState } from "react";
import { PetDataContext } from "../../../pages/Pet/PetDetailsPage";

export default function PetForm({ onFormChange, isFormSubmitted }) {
  const petDataContext = useContext(PetDataContext);
  const petID = petDataContext ? petDataContext.petID : "";
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(petID || "");
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

  useEffect(() => {
    const fetchData = async () => {
      const petsData = await getPets();
      setPets(petsData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  const handlePetSelectionChange = (e) => {
    const selectedPetValue = e.target.value;
    setSelectedPet(selectedPetValue);
    setFormData((prevData) => ({
      ...prevData,
      petID: selectedPetValue,
    }));
  };

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
      {selectedPet !== "" ? (
        <Select
          isRequired
          label="Pet"
          aria-label="Select your pet"
          isInvalid={isFormSubmitted && !isRequiredFieldValid(formData.petID)}
          errorMessage={
            isFormSubmitted && !isRequiredFieldValid(formData.petID)
              ? "This field is required"
              : null
          }
          defaultSelectedKeys={[selectedPet]}
          value={selectedPet}
          onChange={handlePetSelectionChange}
        >
          {pets.map((pet) => (
            <SelectItem key={pet.id} value={pet.id}>
              {pet.name}
            </SelectItem>
          ))}
        </Select>
      ) : null}
      <p>Pet basic information</p>
      <Input
        isRequired
        label="Name"
        placeholder="e.g. 5.5 kg"
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
    </div>
  );
}
