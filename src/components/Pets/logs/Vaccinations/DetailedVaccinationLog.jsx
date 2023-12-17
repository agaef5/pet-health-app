/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import FormPopup from "../../../CreateNewData/FormPopUp";
import DeleteData from "../../../DeleteData/DeleteButtonAndModal";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function VaccinationLog({ vaccDetails, petID }) {
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

  console.log(vaccDetails);
  // Check if apptDetails is null or undefined
  if (!vaccDetails || vaccDetails.length === 0) {
    return (
      <Card>
        <CardBody>
          <p>It's empty here.</p>
          <p>Add something!</p>
          <FormPopup logType={"vaccinations"} petID={petID} />
        </CardBody>
      </Card>
    );
  }

  const { id, name, dosageDate, veterinarian, notes } = vaccDetails;
  const date = dosageDate
    ? new Date(dosageDate.seconds * 1000).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Card className="p-0 pb-4">
      <CardHeader className="flex flex-row justify-between items-center px-4 pb-0">
        <h2>{name}</h2>

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
              <DeleteData petID={petID} logType={"vaccinations"} docID={id} />

              <FormPopup
                ref={formPopupRef}
                logType={"vaccinations"}
                editMode={true}
                existingData={vaccDetails}
                petID={petID}
              />
            </Card>
          )}
        </div>
      </CardHeader>
      <CardBody>
        {!date && !veterinarian ? null : (
          <div className="w-full p-0 m-0">
            <Divider />
            <div className="w-full flex flex-row justify-between py-4">
              {" "}
              {date ? <p>{date}</p> : null}
              {veterinarian ? <p>{veterinarian}</p> : null}
            </div>
          </div>
        )}
        {notes ? (
          <>
            <Divider />{" "}
            <div>
              <h3 className="px-0">Notes:</h3>
              {notes}
            </div>
          </>
        ) : null}
      </CardBody>
    </Card>
  );
}
