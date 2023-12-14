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
import { ScrollShadow } from "@nextui-org/react";
import EmptyState from "../../components/Empty States/EmptyState";

export default function PetHealthDetailsdPage() {
  const { logType } = useParams();
  const { petID } = useParams();

  const [petData, setPetData] = useState(null);
  const [petHealthData, setPetHealthData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  console.log(petID);

  useEffect(() => {
    fetchPetData();
  }, [petID]);

  useEffect(() => {
    fetchHealthData();
  }, [logType, petID]);

  useEffect(() => {
    fetchPetData();
    fetchHealthData();
  }, [refreshPage === true]);

  async function fetchPetData() {
    const data = await getPetByID(petID);
    setPetData(data);
    setTimeout(() => {
      setIsLoaded(true);
    }, 250);
  }

  async function fetchHealthData() {
    const fetchedData = await getHealthData(petID, logType);
    setPetHealthData(fetchedData);
    setTimeout(() => {
      setIsLoaded(true);
    }, 250);
  }

  console.log(petID);
  // Check if petData is still loading
  if (!petData) {
    return <p>Loading...</p>;
  }

  return (
    <section
      className={`transition-opacity duration-1000 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      } flex flex-col gap-6 relative max-h-[88vh] py-10 p-4`}
    >
      <h1>
        {petData.name}'s {logType}
      </h1>

      {petHealthData.length > 0 ? (
        <ScrollShadow className="h-[82vh] pb-24">
          <div className="flex flex-col gap-6">
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
          </div>
        </ScrollShadow>
      ) : (
        <EmptyState
          logType={logType}
          petID={petID}
          setRefreshPage={setRefreshPage}
        />
      )}

      <FormPopup
        logType={logType}
        noPet={true}
        petID={petID}
        setRefreshPage={setRefreshPage}
        classButtonName={"fixed bottom-24 right-4"}
      />
    </section>
  );
}
