/* eslint-disable react/prop-types */
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import getPets from "../../../functions/fetchData/getPets";
import { useContext, useEffect, useState } from "react";
import { PetDataContext } from "../../../pages/Pet/PetDetailsPage";
import { isValid, parse } from "date-fns";

export default function Weight({
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
    date: "",
    weight: "",
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
      const { id, weight, date } = existingData;

      // Convert Firebase Timestamp to Date object
      const formattedDate = date
        ? new Date(date.seconds * 1000).toISOString().split("T")[0]
        : null;

      setSelectedPet(propPetID);
      setFormData({
        docID: id,
        petID: propPetID,
        weight: weight,
        date: formattedDate ? formattedDate : "",
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
      <h3>Weight log information</h3>
      <Input
        isRequired
        label="Weight"
        placeholder="e.g. 5.5 kg"
        type="number"
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
        isInvalid={!isDateValid() && formData.date.length === 10}
        errorMessage={
          !isDateValid() && formData.date.length === 10
            ? "Invalid date format"
            : null
        }
        value={formData.date}
        onChange={(e) => handleInputChange("date", e.target.value)}
      />
    </div>
  );
}
