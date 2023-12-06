import { Card, Divider } from "@nextui-org/react";
import LogOverviewTile from "../../components/Pets/logs/LogOverviewTile";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPetByID from "../../functions/fetchData/getPetByID";

export const PetDataContext = createContext();

export default function PetDetailsPage() {
  const { petID } = useParams();
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPetByID(petID);
      setPetData(data);
    };

    fetchData();
  }, [petID]);

  // Check if petData is still loading
  if (!petData) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <img src="" alt="pet image" />
      <h2>{petData.name}</h2>
      <Card>
        <p>birth date</p>
        <p>fgd</p>
        <Divider />
        <p>gender</p>
        <p>{petData.gender}</p>
        <Divider />
        <p>species</p>
        <p>{petData.species}</p>
        <Divider />
        <p>breed</p>
        <p>gdfs</p>
        <Divider />
        <p>color/markings</p>
        <p>gdxvbnghdbxfgnbdnxgdzbzdf</p>
        <Divider />
        <p>chip reference</p>
        <p>{petID}</p>
      </Card>

      <PetDataContext.Provider value={{ petID }}>
        <LogOverviewTile logType="appointments" />
        <LogOverviewTile logType="medications" />
        <LogOverviewTile logType="vaccinations" />
        <LogOverviewTile logType="weights" />
      </PetDataContext.Provider>
    </section>
  );
}
