import { Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import NavigationBar from "../../components/Navigation Bar/NavigationBar";

function Dashboard() {
  function hangleLogOut() {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
    });
    localStorage.removeItem("currentUserUID");
    window.location.href = "/";
  }
  return (
    <div>
      Here is the dashobard:D
      <Button onClick={hangleLogOut}>Sign out</Button>
      <NavigationBar />
    </div>
  );
}

export default Dashboard;
