/* eslint-disable react/prop-types */
import { createElement, lazy, Suspense, useState } from "react";
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

// Use lazy to import the components lazily (only when needed)
const LazyMedicationForm = lazy(() => import("./Forms/MedicationForm"));
const LazyAppointmentForm = lazy(() => import("./Forms/AppointmentForm"));
const LazyVaccineForm = lazy(() => import("./Forms/VaccineForm"));
const LazyWeightForm = lazy(() => import("./Forms/WeightForm"));
const LazyPetForm = lazy(() => import("./Forms/PetForm"));

const logComponents = {
  Medication: LazyMedicationForm,
  Appointment: LazyAppointmentForm,
  Vaccine: LazyVaccineForm,
  Weight: LazyWeightForm,
  Pet: LazyPetForm,
  Confirm: Spinner,
};

const FormPopup = ({ logType, noPet }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState(null);
  const [selectedLogType, setSelectedLogType] = useState(logType || null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (formData) {
      if (
        (isValidDate(formData.prescribed) ||
          isValidDate(formData.date) ||
          isValidDate(formData.dosageDate) ||
          isValidDate(formData.birthday)) &&
        isRequiredFieldValid(formData.name, formData.title, formData.weight) &&
        isRequiredFieldValid(formData.petID)
      ) {
        switch (selectedLogType) {
          // case "Medication":
          //   uploadMedication(formData);
          //   break;
          // case "Appointment":
          //   uploadAppointment(formData);
          //   break;
          // case "Vaccine":
          //   uploadVaccine(formData);
          //   break;
          // case "Weight":
          //   uploadWeight(formData);
          //   break;
          case "Pet":
            uploadPetData(formData);
            break;
          default:
            null;
        }

        setSelectedLogType("Confirm");
        setDisableSaveButton(true);
      } else {
        console.log("Form validation failed");
      }
    }
  };

  const options = [
    { value: "Medication" },
    { value: "Appointment" },
    { value: "Vaccine" },
    { value: "Weight" },
    ...(noPet == true ? [] : [{ value: "Pet" }]), // Conditionally include "Pet" option
  ];

  return (
    <>
      <Button onClick={onOpen}>+</Button>

      <Suspense fallback={<Spinner color="default" />}>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            closeButton: "hidden",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <>
                  <ModalHeader>
                    {" "}
                    {!disableSaveButton ? (
                      <Select
                        label="Add new..."
                        value={selectedLogType}
                        defaultSelectedKeys={[selectedLogType]}
                        onChange={handleLogTypeChange}
                      >
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </Select>
                    ) : null}
                  </ModalHeader>

                  <ModalBody>
                    <Suspense fallback={<Spinner color="default" />}>
                      {selectedLogType &&
                        logComponents[selectedLogType] &&
                        createElement(logComponents[selectedLogType], {
                          onFormChange: setFormData,
                          isFormSubmitted: isFormSubmitted,
                        })}
                    </Suspense>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      onClick={() => {
                        onClose();
                        setIsFormSubmitted(false);
                        setDisableSaveButton(false);
                        setSelectedLogType(null);
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
