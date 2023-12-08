import { lazy, Suspense, useState } from "react";
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

const FormPopup = (logType) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState(null);
  const [selectedLogType, setSelectedLogType] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);

  if (logType.length > 0 && selectedLogType !== logType) {
    setSelectedLogType(logType);
  }

  const handleLogTypeChange = (event) => {
    setSelectedLogType(event.target.value);
  };

  const isValidDate = (dateString) => {
    if (dateString === "") {
      // Date is optional, so an empty string is considered valid
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
          isValidDate(formData.dosageDate)) &&
        isRequiredFieldValid(formData.name, formData.title, formData.weight) &&
        isRequiredFieldValid(formData.petID)
      ) {
        console.log("Form validation passed");
        console.log("Saved data:", formData);
        setSelectedLogType("Confirm");
        setDisableSaveButton(true);
      } else {
        console.log("Form validation failed");
      }
    }
  };

  const renderSelectedLogTypeComponent = () => {
    switch (selectedLogType) {
      case "Medication":
        return (
          <LazyMedicationForm
            onFormChange={setFormData}
            isFormSubmitted={isFormSubmitted}
          />
        );
      case "Appointment":
        return (
          <LazyAppointmentForm
            onFormChange={setFormData}
            isFormSubmitted={isFormSubmitted}
          />
        );
      case "Vaccine":
        return (
          <LazyVaccineForm
            onFormChange={setFormData}
            isFormSubmitted={isFormSubmitted}
          />
        );
      case "Weight":
        return (
          <LazyWeightForm
            onFormChange={setFormData}
            isFormSubmitted={isFormSubmitted}
          />
        );
      case "Confirm":
        return <Spinner color="default" />;
      default:
        null;
        return null;
    }
  };

  const options = [
    { value: "Medication" },
    { value: "Appointment" },
    { value: "Vaccine" },
    { value: "Weight" },
  ];

  return (
    <>
      <Button onClick={onOpen}>+</Button>

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
                    {selectedLogType !== null
                      ? renderSelectedLogTypeComponent()
                      : null}
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
    </>
  );
};

export default FormPopup;
