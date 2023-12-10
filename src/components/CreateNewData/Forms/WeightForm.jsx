/* eslint-disable react/prop-types */
import { Input, Select, SelectItem } from "@nextui-org/react";
import getPets from "../../../functions/fetchData/getPets";
import { useContext, useEffect, useState } from "react";
import { PetDataContext } from "../../../pages/Pet/PetDetailsPage";

export default function Weight({ onFormChange, isFormSubmitted }) {
  const petDataContext = useContext(PetDataContext);
  const petID = petDataContext ? petDataContext.petID : "";
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(petID || "");

  const [formData, setFormData] = useState({
    petID: selectedPet,
    date: "",
    weight: "",
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
      <p>Vaccination basic information</p>
      <Input
        isRequired
        label="Weight"
        placeholder="e.g. 5.5 kg"
        isInvalid={isFormSubmitted && !isRequiredFieldValid(formData.weight)}
        errorMessage={
          isFormSubmitted && !isRequiredFieldValid(formData.weight)
            ? "This field is required"
            : null
        }
        value={formData.weight}
        onChange={(e) => handleInputChange("weight", e.target.value)}
      />

      <Input
        label="Weight log date"
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
