/* eslint-disable react/prop-types */
import { Card, CardHeader, Divider } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PetDataContext } from "../../../pages/Pet/PetDetailsPage";
import AppointmentLog from "./Appointments/AppointmentLog";
import getNewestHealthLog from "../../../functions/fetchData/getNewestHealthLog";
import MedicationLog from "./Medications/MedicationLog";
import VaccinationLog from "./Vaccinations/VaccinationLog";
import WeightsLog from "./Weights/WeightsLog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function LogOverviewTile({ logType }) {
  const navigate = useNavigate();
  const { petID } = useContext(PetDataContext);
  const [newestLog, setNewestLog] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getNewestHealthLog(petID, logType);
        setNewestLog(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsDataFetched(true); // Mark that data fetching is complete
      }
    }
    fetchData();
  }, [logType, petID]);

  function handleOverviewClick() {
    navigate(`${logType}`);
  }

  if (!isDataFetched) {
    return <>LOADING</>; // or render a loading indicator
  }

  if (!newestLog) {
    return <>No data available</>; // or render a component/message for no data
  }

  console.log(newestLog);
  return (
    <Card className="w-full px-4" isPressable onClick={handleOverviewClick}>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <h2 className="capitalize">{logType}</h2>
        <div className="flex flex-row items-center gap-2">
          <p>see all</p>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </CardHeader>
      <Divider />
      {logType === "appointments" ? (
        <AppointmentLog apptDetails={newestLog} petID={petID} />
      ) : null}
      {logType === "medications" ? (
        <MedicationLog mediDetails={newestLog} petID={petID} />
      ) : null}
      {logType === "vaccinations" ? (
        <VaccinationLog vaccDetails={newestLog} />
      ) : null}
      {logType === "weights" ? (
        <WeightsLog kgDetails={newestLog} petID={petID} />
      ) : null}
    </Card>
  );
}
