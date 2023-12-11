/* eslint-disable react/prop-types */
import { createElement, lazy, Suspense, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import addPetData from "../../functions/addData/addPetData";
import addMedicationData from "../../functions/addData/addMedicationData";
import addAppointmentData from "../../functions/addData/addAppointmentData";
import addVaccinationData from "../../functions/addData/addVaccinationData";
import addWeightData from "../../functions/addData/addWeightData";

// Use lazy to import the components lazily (only when needed)
const LazyMedicationForm = lazy(() => import("./Forms/MedicationForm"));
const LazyAppointmentForm = lazy(() => import("./Forms/AppointmentForm"));
const LazyVaccineForm = lazy(() => import("./Forms/VaccineForm"));
const LazyWeightForm = lazy(() => import("./Forms/WeightForm"));
const LazyPetForm = lazy(() => import("./Forms/PetForm"));

const logComponents = {
  medications: LazyMedicationForm,
  appointments: LazyAppointmentForm,
  vaccinations: LazyVaccineForm,
  weights: LazyWeightForm,
  Pet: LazyPetForm,
  Confirm: Spinner,
};

const FormPopup = ({ logType, noPet, editMode, existingData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState(null);
  const [selectedLogType, setSelectedLogType] = useState(logType || "");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);

  console.log("FormPopup: ", logType);

  useEffect(() => {
    if (editMode && existingData) {
      setFormData(existingData);
    } else {
      setFormData(null);
    }
  }, [editMode, existingData]);

  const handleLogTypeChange = (event) => {
    setFormData(null);
    setIsFormSubmitted(false);
    setDisableSaveButton(false);
    setSelectedLogType(event.target.value);
  };

  const isValidDate = (dateString) => {
    if (dateString === "") {
      return true;
    }
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateString);
  };

  const isRequiredFieldValid = (...fields) => {
    return fields.some((value) => value && value.trim() !== "");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (formData) {
      let confirm = false;
      console.log(isValidDate(formData.birthday));

      if (
        (isValidDate(formData.prescribed) ||
          isValidDate(formData.date) ||
          isValidDate(formData.dosageDate) ||
          isValidDate(formData.birthday)) &&
        isRequiredFieldValid(
          formData.name,
          formData.title,
          formData.weight,
          logType !== "Pet" ? formData.petID : null
        )
      ) {
        switch (selectedLogType) {
          case "medications":
            confirm = await addMedicationData(formData);
            break;
          case "appointments":
            confirm = await addAppointmentData(formData);
            break;
          case "vaccinations":
            confirm = await addVaccinationData(formData);
            break;
          case "weights":
            confirm = await addWeightData(formData);
            break;
          case "Pet":
            confirm = await addPetData(formData);
            break;
          default:
            break;
        }

        if (confirm) {
          setSelectedLogType("Confirm");
          setDisableSaveButton(true);
        } else {
          console.log("Form validation failed");
        }
      } else {
        console.log("Form validation failed");
      }
    }
  };

  const options = [
    { value: "appointments", label: "Appointment" },
    { value: "medications", label: "Medication" },
    { value: "vaccinations", label: "Vaccine" },
    { value: "weights", label: "Weight" },
    ...(noPet == true ? [] : [{ value: "Pet" }]), // Conditionally include "Pet" option
  ];

  console.log("EditMode: ", editMode);
  return (
    <>
      <Button onClick={onOpen}>+</Button>

      <Suspense fallback={<Spinner color="default" />}>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onOpenChange();
            setIsFormSubmitted(false);
            setDisableSaveButton(false);
            setSelectedLogType("");
          }}
          classNames={{ closeButton: "hidden" }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <>
                  <ModalHeader>
                    {editMode !== true ? (
                      !disableSaveButton || editMode !== true ? (
                        <Select
                          label="Add new..."
                          value={selectedLogType}
                          defaultSelectedKeys={
                            selectedLogType !== "" ? [selectedLogType] : []
                          }
                          onChange={handleLogTypeChange}
                        >
                          {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>
                      ) : null
                    ) : (
                      <h2>Edit {logType}</h2>
                    )}
                  </ModalHeader>

                  <ModalBody>
                    <Suspense fallback={<Spinner color="default" />}>
                      {selectedLogType &&
                        logComponents[selectedLogType] &&
                        createElement(logComponents[selectedLogType], {
                          onFormChange: setFormData,
                          isFormSubmitted: isFormSubmitted,
                          existingData: existingData,
                        })}
                    </Suspense>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      onClick={() => {
                        onClose();
                        setIsFormSubmitted(false);
                        setDisableSaveButton(false);
                        setSelectedLogType("");
                      }}
                    >
                      Close
                    </Button>

                    {!disableSaveButton ? (
                      <Button onClick={handleSave} auto>
                        Save
                      </Button>
                    ) : null}
                  </ModalFooter>
                </>
              </>
            )}
          </ModalContent>
        </Modal>
      </Suspense>
    </>
  );
};

export default FormPopup;
