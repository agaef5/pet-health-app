/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPetByID from "../../functions/fetchData/getPetByID";
import getHealthData from "../../functions/fetchData/getHealthData";
import DetailedAppointmentLog from "../../components/Pets/logs/Appointments/DetailedAppointmentLog";
import DetailedMedicationLog from "../../components/Pets/logs/Medications/DetailedMedicationLog";
import DetailedVaccinationLog from "../../components/Pets/logs/Vaccinations/DetailedVaccinationLog";
import DetailedWeightsLog from "../../components/Pets/logs/Weights/DetailedWeightsLog";
import FormPopup from "../../components/CreateNewData/FormPopUp";

export default function PetHealthDetailsdPage() {
  const { logType } = useParams();
  const { petID } = useParams();

  const [petData, setPetData] = useState(null);
  const [petHealthData, setPetHealthData] = useState([]);
  console.log(petHealthData);

  useEffect(() => {
    async function fetchPetData() {
      const data = await getPetByID(petID);
      setPetData(data);
    }
    fetchPetData();
  }, [petID]);

  useEffect(() => {
    async function fetchHealthData() {
      const fetchedData = await getHealthData(petID, logType);
      setPetHealthData(fetchedData);
    }
    fetchHealthData();
  }, [logType, petID]);

  console.log(petHealthData);
  // Check if petData is still loading
  if (!petData) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1>
        {petData.name}'s {logType}
      </h1>
      {petHealthData.map((document) => {
        switch (logType) {
          case "appointments":
            return (
              <DetailedAppointmentLog
                key={document.id}
                apptDetails={document}
                petID={petID}
              />
            );
          case "medications":
            return (
              <DetailedMedicationLog
                key={document.id}
                mediDetails={document}
                petID={petID}
              />
            );
          case "vaccinations":
            return (
              <DetailedVaccinationLog
                key={document.id}
                vaccDetails={document}
                petID={petID}
              />
            );
          case "weights":
            return (
              <DetailedWeightsLog
                key={document.id}
                kgDetails={document}
                petID={petID}
              />
            );
          default:
            return null;
        }
      })}

      <FormPopup logType={logType} noPet={true} />
    </section>
  );
}
