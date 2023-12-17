/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import FormPopup from "../../../CreateNewData/FormPopUp";
import DeleteData from "../../../DeleteData/DeleteButtonAndModal";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function WeightsLog({ kgDetails, petID }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const formPopupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is not within the menuRef and not within the FormPopup
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !formPopupRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef, formPopupRef]);

  // Check if apptDetails is null or undefined
  if (!kgDetails || kgDetails.length === 0) {
    return (
      <Card>
        <CardBody>
          <p>No data</p>
        </CardBody>
      </Card>
    );
  }

  const { id, date, weight } = kgDetails;

  const weightDate = date
    ? new Date(date.seconds * 1000).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Card className="p-2">
      <CardHeader className="flex flex-row justify-between items-baseline px-4 pb-0">
        <h2>{weight} kg</h2>

        {weightDate ? <p>{weightDate}</p> : null}

        <div className="relative" ref={menuRef}>
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            // onBlur={() => setIsMenuOpen(false)}
            variant="light"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>

          {isMenuOpen && (
            <Card className=" flex flex-row items-baseline bg-background absolute right-0 px-5 py-5">
              <DeleteData petID={petID} logType={"weights"} docID={id} />

              <FormPopup
                ref={formPopupRef}
                logType={"weights"}
                editMode={true}
                existingData={kgDetails}
                petID={petID}
              />
            </Card>
          )}
        </div>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
}
