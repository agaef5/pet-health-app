/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPetByID from "../../functions/fetchData/getPetByID";
import getHealthData from "../../functions/fetchData/getHealthData";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

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
      {petHealthData.map((document) => (
        <PetHealthBigCard
          key={document.id}
          logType={logType}
          documentData={document}
        />
      ))}
    </section>
  );
}

function PetHealthBigCard({ logType, documentData }) {
  console.log(logType, documentData);

  const { title, date, veterinarian, notes } = documentData;

  // Convert Firebase timestamp to JavaScript Date object
  const jsDate = date.toDate();

  // Format the date in "Day month year" format
  const formattedDate = jsDate.toLocaleDateString("en-GB", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
  return (
    <Card>
      {logType === "appointments" && (
        <>
          <CardHeader>
            <h2>{title}</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{formattedDate}</p>
            <p>{veterinarian}</p>
            <Divider />
            <p>
              <span>Notes:</span> {notes}
            </p>
          </CardBody>
        </>
      )}
      <Divider />
    </Card>
  );
}
