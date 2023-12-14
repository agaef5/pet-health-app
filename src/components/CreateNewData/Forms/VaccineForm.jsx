/* eslint-disable react/prop-types */
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import getPets from "../../../functions/fetchData/getPets";
import { useContext, useEffect, useState } from "react";
import { PetDataContext } from "../../../pages/Pet/PetDetailsPage";

export default function VaccineForm({
  onFormChange,
  isFormSubmitted,
  existingData,
  propPetID,
}) {
  const petDataContext = useContext(PetDataContext);
  const petID = petDataContext ? petDataContext.petID : "";
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(propPetID || petID || "");

  const [formData, setFormData] = useState({
    petID: selectedPet,
    name: "",
    dosageDate: "",
    veterinarian: "",
    notes: "",
  });

  useEffect(() => {
    if (existingData) {
      // If there is existing data, populate the form fields
      const { id, name, dosageDate, veterinarian, notes } = existingData;

      // Convert Firebase Timestamp to Date object
      const formattedDate = dosageDate
        ? new Date(dosageDate.seconds * 1000).toISOString().split("T")[0]
        : null;

      setSelectedPet(propPetID);
      setFormData({
        docID: id,
        petID: propPetID,
        name: name,
        dosageDate: formattedDate ? formattedDate.toLocaleDateString() : "",
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

  const handleInputChange = (name, value) => {
    if (name === "dosageDate" && value.length > 0) {
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
        defaultSelectedKey={selectedPet}
        value={selectedPet}
        onSelectionChange={(selectedValue) =>
          handlePetSelectionChange(selectedValue)
        }
      >
        {pets.map((pet) => (
          <AutocompleteItem key={pet.id} value={pet.id}>
            {pet.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <h3>Vaccination basic information</h3>
      <Input
        isRequired
        label="Vaccine name"
        placeholder="e.g. Routine checkup"
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
        label="Vaccine dosage date"
        placeholder="DD/MM/YYYY"
        type="date"
        value={formData.dosageDate}
        onChange={(e) => handleInputChange("dosageDate", e.target.value)}
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
