import { Card, Divider } from "@nextui-org/react";
import LogOverviewTile from "../../components/Pets/logs/LogOverviewTile";
import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";

export const PetDataContext = createContext();

export default function PetDetailsPage() {
  const { petID } = useParams();

  const petData = {
    // Replace with the actual way you get the pet ID
    petName: "Buddy", // Replace with the actual way you get the pet name
  };

  return (
    <section>
      <img src="" alt="pet image" />
      <h2>{petID}</h2>
      <Card>
        <p>birth date</p>
        <p>fgd</p>
        <Divider />
        <p>gender</p>
        <p>fd</p>
        <Divider />
        <p>species</p>
        <p>dfgs</p>
        <Divider />
        <p>breed</p>
        <p>gdfs</p>
        <Divider />
        <p>color/markings</p>
        <p>gdxvbnghdbxfgnbdnxgdzbzdf</p>
        <Divider />
        <p>chip reference</p>
        <p>3408789542b</p>
      </Card>

      <PetDataContext.Provider value={petData}>
        <LogOverviewTile logType="Appointments" />
        <LogOverviewTile logType="Medication" />
        <LogOverviewTile logType="Vaccinations" />
        <LogOverviewTile logType="Weight" />
        <LogOverviewTile logType="Documents" />
      </PetDataContext.Provider>
    </section>
  );
}
