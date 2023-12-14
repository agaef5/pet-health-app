import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Settings() {
  const [isLoaded, setIsLoaded] = useState(false);

  function handleLogOut() {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
    });
    localStorage.removeItem("currentUserUID");
    window.location.href = "/";
  }
  return (
    <section
      className={`transition-opacity duration-1000 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      } relative max-h-[88vh] py-10 p-4`}
    >
      <h1>Settings</h1>
      <Button onClick={handleLogOut}>Log Out</Button>
    </section>
  );
}
