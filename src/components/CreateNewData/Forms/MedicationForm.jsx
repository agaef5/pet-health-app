/* eslint-disable react/prop-types */
import {
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import getPets from "../../../functions/fetchData/getPets";
import { useContext, useEffect, useState } from "react";
import { PetDataContext } from "../../../pages/Pet/PetDetailsPage";

export default function MedicationForm({ onFormChange, isFormSubmitted }) {
  const { petID } = useContext(PetDataContext);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(petID || "");

  console.log(selectedPet);

  const [formData, setFormData] = useState({
    petID: selectedPet,
    name: "",
    dosage: "",
    frequencyCount: "",
    frequencyPeriod: "",
    prescribed: "",
    veterinarian: "",
    notes: "",
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

  const frequencyTimes = ["daily", "weekly", "monthly"];

  const handlePetSelectionChange = (e) => {
    const selectedPetValue = e.target.value;
    setSelectedPet(selectedPetValue);
    setFormData((prevData) => ({
      ...prevData,
      petID: selectedPetValue,
    }));
  };

  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      frequencyPeriod: selectedValue,
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
      // Date is optional, so an empty string is considered valid
      return true;
    }
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateString);
  };

  const isRequiredFieldValid = (value) => {
    return value.trim() !== ""; // Check if the trimmed value is not empty
  };

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
      <p>Basic medication info</p>
      <Input
        isRequired
        label="Medication Name"
        placeholder="e.g. Medikinet"
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
        label="Dosage (mg)"
        placeholder="e.g. 5mg"
        value={formData.dosage}
        onChange={(e) => handleInputChange("dosage", e.target.value)}
      />
      <p>How often do you have to dose the medicine?</p>
      <div>
        <Input
          label="Frequency (amount)"
          placeholder="e.g. 3"
          value={formData.frequencyCount}
          onChange={(e) => handleInputChange("frequencyCount", e.target.value)}
        />
        <Select
          label="Frequency (time)"
          aria-label="Select frequency time"
          value={formData.frequencyPeriod}
          onChange={handleSelectionChange}
        >
          {frequencyTimes.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </Select>
      </div>
      <p>When and who prescribed medicine?</p>
      <Input
        label="Prescribed (date)"
        placeholder="DD/MM/YYYY"
        isInvalid={isFormSubmitted && !isValidDate(formData.prescribed)}
        errorMessage={
          isFormSubmitted && !isValidDate(formData.prescribed)
            ? "Please enter a valid date"
            : null
        }
        value={formData.prescribed}
        onChange={(e) => handleInputChange("prescribed", e.target.value)}
      />
      <Input
        label="Veterinarian"
        placeholder="vet. Forename"
        value={formData.veterinarian}
        onChange={(e) => handleInputChange("veterinarian", e.target.value)}
      />
      <Divider />
      <Textarea
        label="Notes"
        value={formData.notes}
        onChange={(e) => handleInputChange("notes", e.target.value)}
      />
    </div>
  );
}
