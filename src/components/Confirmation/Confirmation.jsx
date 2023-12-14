import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Divider } from "@nextui-org/react";

export default function Confirmation() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center px-5 pb-4">
        <h1 className="text-success-500">Success!</h1>
        <h3>Information has been updated.</h3>
      </div>

      <Avatar
        isBordered
        className="w-20 h-20 text-large m-3"
        showFallback
        fallback={<FontAwesomeIcon className="p-5 h-12" icon={faPaw} />}
      />
    </div>
  );
}
