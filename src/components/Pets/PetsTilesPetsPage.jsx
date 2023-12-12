/* eslint-disable react/prop-types */
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import { getPhoto } from "../../functions/fetchData/getPetPhoto";

export const PetDataContext = createContext();

function PetsTileDetailed({ petData, minimal }) {
  const navigate = useNavigate();
  const [petPhotoUrl, setPetPhotoUrl] = useState("");
  const petID = petData.id;
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      const photoUrl = await getPhoto(`users/${user.uid}/${petID}.jpg`);
      setPetPhotoUrl(photoUrl);
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
    <Card isPressable onClick={handlePetDetailsClick}>
      {minimal ? (
        <>
          {" "}
          <CardBody>
            {petPhotoUrl && <img src={petPhotoUrl} alt="pet image" />}
          </CardBody>
          <CardHeader>
            <h2>{petData.name}</h2>
          </CardHeader>
        </>
      ) : (
        <>
          {petPhotoUrl && <img src={petPhotoUrl} alt="pet image" />}
          <CardHeader>
            <h2>{petData.name}</h2>
          </CardHeader>
          <CardBody>
            <p>pet description</p>
            <p>pet age</p>
            <p>pet species</p>
          </CardBody>
        </>
      )}
    </Card>
  );
}

export default PetsTileDetailed;
