/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPetByID from "../../functions/fetchData/getPetByID";

export default function PetHealthDetailsdPage() {
  const { logType } = useParams();
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
      <h1>
        {petData.name}'s {logType}
      </h1>
    </section>
  );
}
