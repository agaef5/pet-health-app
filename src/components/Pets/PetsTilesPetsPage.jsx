/* eslint-disable react/prop-types */
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import { getPhoto } from "../../functions/fetchData/getPetPhoto";
import { differenceInYears } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars, faPaw } from "@fortawesome/free-solid-svg-icons";

export const PetDataContext = createContext();

function PetsTileDetailed({ petData, minimal }) {
  const navigate = useNavigate();
  const [petPhotoUrl, setPetPhotoUrl] = useState("");
  const [petAge, setPetAge] = useState(null);
  const petID = petData.id;
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      const photoUrl = await getPhoto(`users/${user.uid}/${petID}.jpg`);
      setPetPhotoUrl(photoUrl);

      if (petData.birthday) {
        const birthDate = petData.birthday
          ? new Date(petData.birthday.seconds * 1000)
          : null;

        console.log(birthDate);
        // const birthDate = fromUnixTime(petData.birthdate.seconds);
        const currentDate = new Date();
        const age = differenceInYears(currentDate, birthDate);
        console.log(age);
        setPetAge(age);
      }
    };

    fetchData();
  }, [petID]);

  function handlePetDetailsClick() {
    //for asthetics (to make the button look like it's being pressed)s
    setTimeout(() => {
      if (minimal) {
        navigate(`pets/${petData.id}`);
      } else {
        navigate(`${petData.id}`);
      }
    }, 400);
  }

  console.log(petData);
  return (
    <>
      {minimal ? (
        <Card
          className="w-40 flex justify-center items-center p-2"
          isPressable
          onClick={handlePetDetailsClick}
        >
          <CardBody className="flex justify-center items-center">
            <Avatar
              className="w-20 h-20 text-large"
              isBordered
              src={petPhotoUrl}
              fallback={<FontAwesomeIcon className="p-5 h-8" icon={faPaw} />}
            />
          </CardBody>
          <CardHeader className="flex justify-center items-center gap-3 p-0">
            <h3>{petData.name}</h3>
            {petData.sex == "female" ? (
              <FontAwesomeIcon icon={faVenus} />
            ) : petData.sex == "male" ? (
              <FontAwesomeIcon icon={faMars} />
            ) : null}
          </CardHeader>
        </Card>
      ) : (
        <Card
          className="w-full grid grid-cols-4 justify-center items-center p-5"
          isPressable
          onClick={handlePetDetailsClick}
        >
          <Avatar
            className="w-36 h-36"
            isBordered
            src={petPhotoUrl}
            fallback={<FontAwesomeIcon className="p-5 h-12" icon={faPaw} />}
          />
          <div className="col-start-3 col-end-5 mx-5 flex flex-col">
            <CardHeader className="flex flex-col justify-center items-center gap-1">
              <h3>{petData.name}</h3>
              {petData.sex == "female" ? (
                <FontAwesomeIcon icon={faVenus} />
              ) : petData.sex == "male" ? (
                <FontAwesomeIcon icon={faMars} />
              ) : null}
            </CardHeader>
            {!petAge && !petData.species ? null : (
              <>
                <Divider />
                <CardBody className="flex justify-center items-center pb-0">
                  {petAge && <p>{petAge} years old</p>}
                  {petData.species && <p>{petData.species}</p>}
                </CardBody>
              </>
            )}
          </div>
        </Card>
      )}
    </>
  );
}

export default PetsTileDetailed;
