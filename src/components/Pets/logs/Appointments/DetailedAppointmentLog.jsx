/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import FormPopup from "../../../CreateNewData/FormPopUp";
import DeleteData from "../../../DeleteData/DeleteButtonAndModal";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function DetailedAppointmentLog({ apptDetails, petID }) {
  console.log("PetID: ", petID);
  console.log("DetailedAppointmentLog: ", apptDetails);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  // Check if apptDetails is null or undefined
  if (!apptDetails || apptDetails.length === 0) {
    return (
      <Card>
        <CardBody>
          <p>It's empty here.</p>
          <p>Add something!</p>
          <FormPopup logType={"appointments"} petID={petID} />
        </CardBody>
      </Card>
    );
  }

  const { id, title, date, veterinarian, notes } = apptDetails;
  const formattedDate = date
    ? new Date(date.seconds * 1000).toLocaleDateString()
    : "";

  return (
    <>
      <Card className="p-0 pb-4">
        <CardHeader className="flex flex-row justify-between items-center px-4 pb-0">
          <h2>{title}</h2>

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
                <DeleteData petID={petID} logType={"appointments"} docID={id} />
                <FormPopup
                  logType={"appointments"}
                  editMode={true}
                  existingData={apptDetails}
                  petID={petID}
                />
              </Card>
            )}
          </div>
        </CardHeader>
        <CardBody>
          {!formattedDate && !veterinarian ? null : (
            <div className="w-full p-0 m-0">
              <Divider />
              <div className="w-full flex flex-row justify-between py-4">
                {" "}
                {formattedDate ? <p>{formattedDate}</p> : null}
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
    </>
  );
}
