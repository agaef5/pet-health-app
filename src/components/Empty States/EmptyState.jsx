/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import FormPopup from "../CreateNewData/FormPopUp";

export default function EmptyState({ logType, petID, setRefreshPage }) {
  console.log(logType);
  console.log(petID);
  return (
    <div className="flex flex-col gap-4 items-center">
      <Card className=" w-[80vw] flex flex-col gap-4 items-center p-4">
        <CardHeader className="flex flex-col items-center p-0">
          <h2>
            You don't have any
            {logType === "Pet"
              ? " pets "
              : logType === "tasks"
                ? " tasks "
                : " logs "}
            yet!
          </h2>
        </CardHeader>
        <CardBody className="flex flex-col items-center gap-4 pt-0">
          <p className="text-center">
            Add one by clicking <br />
            the button below:
          </p>
          <FormPopup
            logType={logType}
            petID={petID}
            setRefreshPage={setRefreshPage}
          />
        </CardBody>
      </Card>
    </div>
  );
}
