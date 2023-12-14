/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import getLogsbyMedicineID from "../../../../functions/fetchData/getLogsByMedicineID";
import FormPopup from "../../../CreateNewData/FormPopUp";
import DeleteData from "../../../DeleteData/DeleteButtonAndModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { is } from "date-fns/locale";

export default function DetailedMedicationLog({
  mediDetails,
  petID,
  onLogUpdate,
}) {
  const [logData, setLogData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDosed, setIsDosed] = useState(logData.isDosed);

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

  console.log(mediDetails);
  if (!mediDetails || mediDetails.length === 0) {
    return (
      <Card>
        <CardBody>
          <p>It's empty here.</p>
          <p>Add something!</p>
          <FormPopup logType={"medications"} petID={petID} />
        </CardBody>
      </Card>
    );
  }

  const {
    id,
    name,
    dosage,
    prescribed,
    frequencyCount,
    frequencyPeriod,
    veterinarian,
    notes,
  } = mediDetails;
  const prescribedDate = prescribed
    ? new Date(prescribed.seconds * 1000).toLocaleDateString()
    : "";

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getLogsbyMedicineID(petID, id);
      setLogData(fetchedData);
    }
    fetchData();
  }, [petID]);

  async function handleDosedCheckboxChange({ logID }) {
    const userID = localStorage.getItem("currentUserUID");
    const logRef = doc(
      db,
      "users",
      userID,
      "pets",
      petID,
      "medications",
      mediDetails.id,
      "Logs",
      logID
    );

    const updatedLogData = logData.map((log) =>
      log.id === logID ? { ...log, isDosed: !log.isDosed } : log
    );

    await updateDoc(logRef, { isDosed: !isDosed });

    setIsDosed(!isDosed); // This line updates the state for all logs, which may not be what you want
    setLogData(updatedLogData);
    if (onLogUpdate) {
      onLogUpdate();
    }
  }

  return (
    <Card>
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
              <DeleteData petID={petID} logType={"medications"} docID={id} />

              <FormPopup
                ref={formPopupRef}
                logType={"medications"}
                editMode={true}
                existingData={mediDetails}
                petID={petID}
              />
            </Card>
          )}
        </div>
      </CardHeader>
      <CardBody>
        {!frequencyCount && !frequencyPeriod && !dosage ? null : (
          <div className="w-full p-0 m-0">
            <Divider />
            <div className="w-full flex flex-row justify-between py-4">
              {" "}
              {dosage ? (
                <p>
                  Dosage: {dosage}{" "}
                  {frequencyCount && frequencyPeriod
                    ? `x${frequencyCount} ${frequencyPeriod}`
                    : null}
                </p>
              ) : null}
            </div>
          </div>
        )}

        {!prescribed && !veterinarian ? null : (
          <div className="w-full flex flex-row justify-between py-4">
            {" "}
            {prescribed ? (
              <p>
                Prescribed: {prescribed ? prescribedDate : null}{" "}
                {veterinarian ? `by ${veterinarian}` : null}
              </p>
            ) : null}
          </div>
        )}

        {notes ? <p className="py-4">Notes: {notes}</p> : null}
        <Divider />
        <Accordion isCompact>
          <AccordionItem title="Dosage log">
            <div className="flex flex-col gap-4">
              {logData.length > 0 ? (
                logData.map((log) => {
                  return (
                    <Card
                      className="bg-black flex flex-row justify-between p-4 ${isDosed ? 'opacity-50' : 'opacity-100'}"
                      key={log.id}
                    >
                      <p>
                        {new Date(
                          log.dosageDate.seconds * 1000
                        ).toLocaleDateString()}
                      </p>
                      <Checkbox
                        className=""
                        color="success"
                        isSelected={log.isDosed}
                        onChange={() =>
                          handleDosedCheckboxChange({ log, logID: log.id })
                        }
                      />
                    </Card>
                  );
                })
              ) : (
                <p>No dosage log availa so this is it ble</p>
              )}
            </div>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}
