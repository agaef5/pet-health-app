import { Avatar, Card, Divider, ScrollShadow } from "@nextui-org/react";
import LogOverviewTile from "../../components/Pets/logs/LogOverviewTile";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPetByID from "../../functions/fetchData/getPetByID";
import FormPopup from "../../components/CreateNewData/FormPopUp";
import { auth } from "../../../firebase-config";
import { getPhoto } from "../../functions/fetchData/getPetPhoto";
import DeleteData from "../../components/DeleteData/DeleteButtonAndModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

export const PetDataContext = createContext();

export default function PetDetailsPage() {
  const { petID } = useParams();
  const [petData, setPetData] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [petPhotoUrl, setPetPhotoUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    fetchData();
  }, [petID]);

  useEffect(() => {
    fetchData();
    setRefreshPage(false);
  }, [refreshPage === true]);

  const fetchData = async () => {
    setIsLoaded(false);
    const data = await getPetByID(petID);
    console.log(data);
    if (data.birthday) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      setBirthdate(
        new Date(data.birthday.seconds * 1000).toLocaleDateString(
          "en-GB",
          options
        )
      ); // Update birthdate state
    }
    setPetData(data);
    let user = auth.currentUser;

    // Set the pet photo URL
    const photoUrl = await getPhoto(`users/${user.uid}/${petID}.jpg`);
    setPetPhotoUrl(photoUrl);

    setTimeout(() => {
      setIsLoaded(true);
    }, 250);
  };

  // Check if petData is still loading
  if (!petData) {
    return <p>Loading...</p>;
  }

  console.log("petData", petPhotoUrl);

  return (
    <ScrollShadow orientation="vertical" className="h-[88vh] pb-24">
      <section
        className={`transition-opacity duration-1000 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        } flex flex-col items-center p-4 gap-6`}
      >
        <div className="relative pt-10">
          <Avatar
            className="w-40 h-40 text-large"
            isBordered
            src={petPhotoUrl}
            fallback={<FontAwesomeIcon className="p-5 h-16" icon={faPaw} />}
          />
          <FormPopup
            logType={"Pet"}
            editMode={true}
            existingData={petData}
            petID={petID}
            setRefreshPage={setRefreshPage}
            classButtonName={"absolute opacity-50 -bottom-4 -right-4"}
          />
        </div>

        <h1>{petData.name}</h1>

        {birthdate ||
        petData.sex ||
        petData.species ||
        petData.breed ||
        petData.color ? (
          <>
            <Card className="w-full px-4 py-8 flex flex-col gap-4">
              {birthdate ? (
                <div className="flex flex-row items-stretch justify-between">
                  <p>birth date</p>
                  <p>{birthdate}</p>
                </div>
              ) : null}
              {birthdate &&
                (petData.sex ||
                  petData.species ||
                  petData.breed ||
                  petData.color) && <Divider />}

              {petData.sex ? (
                <div className="flex flex-row items-stretch justify-between">
                  <p>sex</p>
                  <p>
                    {petData.sex}
                    {petData.neutered &&
                      petData.neutered === true &&
                      ", neutered"}
                  </p>
                </div>
              ) : null}
              {petData.sex &&
                (petData.species || petData.breed || petData.color) && (
                  <Divider />
                )}

              {petData.species ? (
                <div className="flex flex-row items-stretch justify-between">
                  <p>species</p>
                  <p>{petData.species}</p>
                </div>
              ) : null}
              {petData.species && (petData.breed || petData.color) && (
                <Divider />
              )}

              {petData.breed ? (
                <div className="flex flex-row items-stretch justify-between">
                  <p>breed</p>
                  <p>{petData.breed}</p>
                </div>
              ) : null}
              {petData.breed && petData.color && <Divider />}

              {petData.color ? (
                <div className="flex flex-row items-stretch justify-between">
                  <p>color/markings</p>
                  <p>{petData.color}</p>
                </div>
              ) : null}
            </Card>
            <Divider />
          </>
        ) : null}

        <PetDataContext.Provider value={{ petID }}>
          <LogOverviewTile logType="appointments" />
          <LogOverviewTile logType="medications" />
          <LogOverviewTile logType="vaccinations" />
          <LogOverviewTile logType="weights" />
        </PetDataContext.Provider>

        <Divider />
        <DeleteData petID={petID} />
      </section>
    </ScrollShadow>
  );
}
