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

export default function AppointmentForm({
  onFormChange,
  isFormSubmitted,
  existingData,
  propPetID,
}) {
  const petDataContext = useContext(PetDataContext);
  const petID = petDataContext ? petDataContext.petID : "";
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(propPetID || petID || "");
  console.log("propPetID", selectedPet);

  const purposeTypes = ["routine", "non-routine"];

  const [formData, setFormData] = useState({
    petID: selectedPet,
    purpose: "",
    title: "",
    date: "",
    veterinarian: "",
    notes: "",
  });

  useEffect(() => {
    if (existingData) {
      // If there is existing data, populate the form fields
      const { id, purpose, title, date, veterinarian, notes } = existingData;

      // Convert Firebase Timestamp to Date object
      const formattedDate = date
        ? new Date(date.seconds * 1000).toISOString().split("T")[0]
        : null;

      setSelectedPet(propPetID);
      setFormData({
        docID: id,
        petID: propPetID,
        purpose: purpose || "",
        title: title || "",
        date: formattedDate ? formattedDate : "",
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

  const handlePetSelectionChange = (selectedPetValue) => {
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
      purpose: selectedValue,
    }));
  };

  const handleInputChange = (name, value) => {
    if (name === "date" && value.length > 0) {
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
    return value.trim() !== ""; // Check if the trimmed value is not empty
  };

  return (
    <div className="flex flex-col gap-6">
      <Autocomplete
        isDisabled={existingData && Object.keys(existingData).length > 0}
        isRequired
        label="Pet"
        aria-label="Select your pet"
        isInvalid={isFormSubmitted && !isRequiredFieldValid(selectedPet)}
        errorMessage={
          isFormSubmitted && !isRequiredFieldValid(selectedPet)
            ? "This field is required"
            : null
        }
        defaultSelectedKey={selectedPet}
        value={selectedPet}
        onSelectionChange={handlePetSelectionChange}
      >
        {pets.map((pet) => (
          <AutocompleteItem key={pet.id} value={pet.id}>
            {pet.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <h3>Appointment basic information</h3>
      <Input
        isRequired
        label="Appointment purpose"
        placeholder="e.g. Routine checkup"
        isInvalid={isFormSubmitted && !isRequiredFieldValid(formData.title)}
        errorMessage={
          isFormSubmitted && !isRequiredFieldValid(formData.title)
            ? "This field is required"
            : null
        }
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <Select
        label="Appointment type"
        defaultSelectedKeys={["routine"]}
        value={formData.purpose}
        onChange={handleSelectionChange}
      >
        {purposeTypes.map((purpose) => (
          <SelectItem key={purpose} value={purpose}>
            {purpose}
          </SelectItem>
        ))}
      </Select>
      <Input
        label="Appointment date"
        placeholder="DD/MM/YYYY"
        type="date"
        value={formData.date}
        onChange={(e) => handleInputChange("date", e.target.value)}
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
