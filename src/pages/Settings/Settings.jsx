import { deleteUser, signOut } from "firebase/auth";
import { auth, db } from "../../../firebase-config";
import { Button, Card, CardHeader, Divider, Switch } from "@nextui-org/react";
import { useState } from "react";
import { useTheme } from "../../functions/Theme Provider/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ref } from "firebase/storage";
import DeleteData from "../../components/DeleteData/DeleteButtonAndModal";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(true);

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
      } flex flex-col  relative max-h-[88vh] py-10 p-4`}
    >
      <h1>Settings</h1>

      <h2>Theme preferences</h2>
      <Switch
        defaultSelected={theme === "light"} // Set the defaultSelected based on the theme
        size="lg"
        color="primary"
        startContent={<FontAwesomeIcon icon={faSun} />}
        endContent={<FontAwesomeIcon icon={faMoon} />}
        onChange={toggleTheme} // Call handleSwitchChange when the Switch changes
      >
        {theme === "light" ? "Light" : "Dark"} Mode
      </Switch>

      <h2>Account</h2>
      <div className="flex flex-col gap-4">
        <Button size="lg" onClick={handleLogOut}>
          Log Out
        </Button>
        <Divider />
        <Card className="p-3 pt-0 gap-5">
          <CardHeader className="flex flex-col">
            <h2 className="pl-0 text-center border-danger-500 text-danger-500">
              Danger zone
            </h2>
            <p className="text-center">
              Deleting erases your pet's digital footprint – no Ctrl+Z for
              virtual paw prints!
            </p>
            <p> 🐾</p>
          </CardHeader>

          <DeleteData userID={auth.currentUser.uid} deleteAccount={true} />
        </Card>
      </div>
    </section>
  );
}
