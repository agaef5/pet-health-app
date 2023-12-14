/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import deleteHealthLog from "../../functions/Delete Data/deleteHealthLog";
import deletePet from "../../functions/Delete Data/deletePet";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import deleteTask from "../../functions/Delete Data/DeleteTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteData({
  userID,
  logType,
  petID,
  docID,
  deleteAccount,
}) {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDeleteType, setSelectedDeleteType] = useState("delete");
  const [disableDeleteButton, setDisableDeleteButton] = useState(false);

  const handleDelete = async () => {
    try {
      let confirm = false;

      if (logType && petID && docID) {
        confirm = await deleteHealthLog({ logType, petID, id: docID });
      } else if (petID && !docID && !logType) {
        confirm = await deletePet({ petID });
      } else if (docID && !petID && !logType) {
        confirm = await deleteTask({ id: docID });
      } else if (userID && !docID && !petID && !logType) {
        confirm = await deleteAccount({ id: docID });
      } else {
        console.log("Delete failed");
      }

      if (confirm) {
        setSelectedDeleteType("confirm");
        setDisableDeleteButton(true);
      } else {
        console.log("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Move logComponents definition inside the component
  const logComponents = {
    delete: DeleteAsk,
    confirm: DeleteConfirmation,
  };

  return (
    <>
      {deleteAccount ? (
        <Button size="lg" color="danger" onClick={onOpen}>
          Delete Account
        </Button>
      ) : (
        <Button
          className={"p-0 min-w-min pt-1 w-10"}
          variant="light"
          color="danger"
          onClick={onOpen}
        >
          <FontAwesomeIcon className="fa-xl" icon={faTrash} />
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onOpenChange();
          setDisableDeleteButton(false);
          setSelectedDeleteType("");
        }}
        classNames={{ closeButton: "hidden" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>Delete {logType ? logType : petID ? "pet" : "task"}</h1>
              </ModalHeader>

              <ModalBody>
                {selectedDeleteType &&
                  logComponents[selectedDeleteType]({
                    logtype: logType ? logType : null,
                    petID: petID ? petID : null,
                    id: docID ? docID : null,
                  })}
              </ModalBody>

              <ModalFooter>
                {!disableDeleteButton ? (
                  <Button color="danger" onClick={() => handleDelete()}>
                    Delete{" "}
                    {userID
                      ? "Your account once and forever"
                      : logType
                        ? logType
                        : petID
                          ? "pet"
                          : "task"}
                  </Button>
                ) : null}

                <Button
                  onClick={() => {
                    onClose();
                    if (selectedDeleteType === "confirm") {
                      if (userID && !docID && !petID && !logType) {
                        localStorage.removeItem("currentUserUID");
                        window.location.href = "/";
                      } else {
                        navigate(`/${user.uid}`);
                      }
                    }
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function DeleteAsk({ userID, petID, logType }) {
  return (
    <p>
      Are you sure you want to delete{" "}
      {userID
        ? "Your account"
        : logType
          ? "these health data"
          : petID
            ? "these pet data"
            : "this task"}
      ?
    </p>
  );
}

function DeleteConfirmation() {
  return <p>Data successfully deleted.</p>;
}
