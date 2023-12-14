/* eslint-disable react/prop-types */
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import getPets from "../../../functions/fetchData/getPets";
import { useContext, useEffect, useState } from "react";
import { PetDataContext } from "../../../pages/Pet/PetDetailsPage";

export default function MedicationForm({
  onFormChange,
  isFormSubmitted,
  existingData,
  propPetID,
}) {
  const petDataContext = useContext(PetDataContext);
  const petID = petDataContext ? petDataContext.petID : "";
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(petID || propPetID || "");

  const [formData, setFormData] = useState({
    petID: selectedPet,
    name: "",
    dosage: "",
    dosagesAmount: "",
    frequencyCount: "",
    frequencyPeriod: "",
    prescribed: "",
    veterinarian: "",
    notes: "",
  });

  useEffect(() => {
    if (existingData) {
      // If there is existing data, populate the form fields
      const {
        id,
        name,
        dosage,
        dosagesAmount,
        frequencyCount,
        frequencyPeriod,
        prescribed,
        veterinarian,
        notes,
      } = existingData;

      // Convert Firebase Timestamp to Date object
      const formattedDate = prescribed
        ? new Date(prescribed.seconds * 1000)
        : null;

      setSelectedPet(propPetID);
      setFormData({
        docID: id,
        petID: propPetID,
        name: name,
        dosage: dosage || "",
        dosagesAmount: dosagesAmount || "",
        frequencyCount: frequencyCount || "",
        frequencyPeriod: frequencyPeriod || "",
        prescribed: formattedDate ? formattedDate.toLocaleDateString() : "",
        veterinarian: veterinarian || "",
        notes: notes || "",
      });
    }
  }, [existingData, propPetID]);

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

  const frequencyTimes = ["day", "week", "month", "year"];

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

  return (
    <div className="flex flex-col gap-6">
      <Autocomplete
        isDisabled={existingData && Object.keys(existingData).length > 0}
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
          <AutocompleteItem key={pet.id} value={pet.id}>
            {pet.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <h3>Medication basic information</h3>
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

      <Input
        label="Dosages (how many pills)"
        placeholder="e.g. 8"
        value={formData.dosagesAmount}
        type="number"
        onChange={(e) => handleInputChange("dosagesAmount", e.target.value)}
      />

      <h3>How often do you have to dose the medicine? E.g. 3 times per week</h3>
      <div className="flex flex-row gap-6 items-baseline">
        <Input
          label="Frequency"
          placeholder="e.g. 3"
          type="number"
          value={formData.frequencyCount}
          onChange={(e) => handleInputChange("frequencyCount", e.target.value)}
        />
        <p className=" min-w-fit">times per</p>
        <Select
          label="Period"
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
      <h3>When and who prescribed medicine?</h3>
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
