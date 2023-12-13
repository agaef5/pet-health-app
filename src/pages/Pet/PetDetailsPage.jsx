import { Card, Divider, Skeleton } from "@nextui-org/react";
import LogOverviewTile from "../../components/Pets/logs/LogOverviewTile";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPetByID from "../../functions/fetchData/getPetByID";
import FormPopup from "../../components/CreateNewData/FormPopUp";
import { auth } from "../../../firebase-config";
import { getPhoto } from "../../functions/fetchData/getPetPhoto";
import DeleteData from "../../components/DeleteData/DeleteButtonAndModal";

export const PetDataContext = createContext();

export default function PetDetailsPage() {
  const { petID } = useParams();
  const [petData, setPetData] = useState(null);
  const [petPhotoUrl, setPetPhotoUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      const data = await getPetByID(petID);
      setPetData(data);
      let user = auth.currentUser;
      // Set the pet photo URL
      const photoUrl = await getPhoto(`users/${user.uid}/${petID}.jpg`);
      setPetPhotoUrl(photoUrl);
      setIsLoaded(true);
    };

    fetchData();
  }, [petID]);

  // Check if petData is still loading
  if (!petData) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <FormPopup
        logType={"Pet"}
        editMode={true}
        existingData={petData}
        petID={petID}
      />
      <DeleteData petID={petID} />
      <Skeleton isLoaded={isLoaded} className="rounded-lg">
        {petPhotoUrl && <img src={petPhotoUrl} alt="pet image" />}

        <h2>{petData.name}</h2>

        <Card>
          <p>birth date</p>
          <p>fgd</p>
          <Divider />
          <p>sex</p>
          <p>{petData.sex}</p>
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
          <FormPopup logType={null} noPet={true} />
        </PetDataContext.Provider>
      </Skeleton>
    </section>
  );
}
