import { Card, Divider } from "@nextui-org/react";
import LogOverviewTile from "../../components/Pets/logs/LogOverviewTile";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPetByID from "../../functions/fetchData/getPetByID";
import FormPopup from "../../components/CreateNewData/FormPopUp";
import { auth, storage } from "../../../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";

export const PetDataContext = createContext();

export default function PetDetailsPage() {
  const { petID } = useParams();
  const [petData, setPetData] = useState(null);
  const [petPhotoUrl, setPetPhotoUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPetByID(petID);
      setPetData(data);
      let user = auth.currentUser;
      // Set the pet photo URL
      const photoPath = `users/${user.uid}/${petID}.jpg`;
      console.log("PHOTOURL:", photoPath);

      const photoUrl = await getDownloadURL(ref(storage, photoPath));
      setPetPhotoUrl(photoUrl);
    };

    fetchData();
  }, [petID]);

  // Check if petData is still loading
  if (!petData) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      {petPhotoUrl && <img src={petPhotoUrl} alt="pet image" />}

      <h2>{petData.name}</h2>

      <FormPopup
        logType={"Pet"}
        editMode={true}
        existingData={petData}
        petID={petID}
      />
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
    </section>
  );
}
