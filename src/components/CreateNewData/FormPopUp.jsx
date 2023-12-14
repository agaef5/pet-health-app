/* eslint-disable react/prop-types */
import { createElement, Suspense, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
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
import updateAppointmentData from "../../functions/updateData/updateAppointments";
import updateMedicationData from "../../functions/updateData/updateMedicationData";
import updateVaccinationData from "../../functions/updateData/updateVaccinationData";
import updateWeightData from "../../functions/updateData/updateWeightData";
import updatePetData from "../../functions/updateData/updatePetData";
import addTask from "../../functions/addData/addTask";
import updateTask from "../../functions/updateData/updateTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import Confirmation from "../Confirmation/Confirmation";
import MedicationForm from "./Forms/MedicationForm";
import AppointmentForm from "./Forms/AppointmentForm";
import VaccineForm from "./Forms/VaccineForm";
import WeightForm from "./Forms/WeightForm";
import TaskForm from "./Forms/TaskForm";
import PetForm from "./Forms/PetForm";

const logComponents = {
  medications: MedicationForm,
  appointments: AppointmentForm,
  vaccinations: VaccineForm,
  weights: WeightForm,
  tasks: TaskForm,
  Pet: PetForm,
  Confirm: Confirmation,
};

const FormPopup = ({
  logType,
  noPet,
  editMode,
  existingData,
  petID,
  setRefreshPage,
  classButtonName,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState(null);
  const [selectedLogType, setSelectedLogType] = useState(logType || "");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);

  // console.log("FormPopup: ", petID);

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

  const handleImageChange = (file) => {
    if (selectedLogType === "Pet") {
      setFormData({ ...formData, profilePicture: file });
    }
  };

  const isRequiredFieldValid = (...fields) => {
    return fields.some((value) => value && value.trim() !== "");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (formData) {
      let confirm = false;

      if (
        isRequiredFieldValid(
          formData.name,
          formData.title,
          formData.weight,
          formData.task,
          logType !== "Pet" ? formData.petID : null
        )
      ) {
        switch (selectedLogType) {
          case "medications":
            if (editMode) {
              confirm = await updateMedicationData(formData);
            } else {
              confirm = await addMedicationData(formData);
            }
            break;
          case "appointments":
            if (editMode) {
              confirm = await updateAppointmentData(formData);
            } else {
              confirm = await addAppointmentData(formData);
            }
            break;
          case "vaccinations":
            if (editMode) {
              confirm = await updateVaccinationData(formData);
            } else {
              confirm = await addVaccinationData(formData);
            }
            break;
          case "weights":
            if (editMode) {
              confirm = await updateWeightData(formData);
            } else {
              confirm = await addWeightData(formData);
            }

            break;
          case "Pet":
            if (editMode) {
              confirm = await updatePetData(formData);
            } else {
              confirm = await addPetData(formData);
            }
            break;
          case "tasks":
            if (editMode) {
              confirm = await updateTask(formData);
            } else {
              confirm = await addTask(formData);
            }
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
    { value: "tasks", label: "Task" },
    ...(noPet == true ? [] : [{ value: "Pet", label: "Pet" }]), // Conditionally include "Pet" option
  ];

  return (
    <>
      {editMode ? (
        <Button
          // radius="full"
          variant="light"
          className={`${classButtonName} p-0 min-w-min w-10 pb-1`}
          onClick={onOpen}
        >
          <FontAwesomeIcon className="fa-xl" icon={faPenToSquare} />
        </Button>
      ) : (
        <Button
          radius="full"
          className={`${classButtonName} w-10 h-20 shadow-md dark:shadow-large`}
          onClick={onOpen}
        >
          <FontAwesomeIcon className="fa-2xl" icon={faPlus} />
        </Button>
      )}

      <Suspense fallback={<Spinner color="default" />}>
        <Modal
          scrollBehavior="inside"
          className="max-h-[80vh] z-50"
          isOpen={isOpen}
          onClose={() => {
            onOpenChange();
            setIsFormSubmitted(false);
            setDisableSaveButton(false);
            setSelectedLogType(logType);
          }}
          classNames={{ closeButton: "hidden" }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <>
                  <ModalHeader>
                    {editMode !== true ? (
                      !disableSaveButton ? (
                        <Select
                          variant="faded"
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
                    <ScrollShadow>
                      {" "}
                      <Suspense fallback={<Spinner color="default" />}>
                        {selectedLogType &&
                          logComponents[selectedLogType] &&
                          createElement(logComponents[selectedLogType], {
                            onFormChange: setFormData,
                            isFormSubmitted: isFormSubmitted,
                            existingData: existingData,
                            propPetID: petID ? petID : null,
                            handleImageChange: handleImageChange,
                          })}
                      </Suspense>
                    </ScrollShadow>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      onClick={() => {
                        onClose();
                        setIsFormSubmitted(false);
                        setDisableSaveButton(false);
                        if (selectedLogType === "Confirm") {
                          setSelectedLogType(logType);
                          setRefreshPage(true);
                        }
                      }}
                    >
                      Close
                    </Button>

                    {!disableSaveButton ? (
                      <Button color={"success"} onClick={handleSave} auto>
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
