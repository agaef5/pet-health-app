/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import NavigationBar from "../../components/Navigation Bar/NavigationBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import WideScreenOverride from "../../components/Wide Screen/WideScreenOverride";

export default function Container() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("currentUserUID");
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 500);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 500);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="w-screen">
      {isWideScreen ? (
        <WideScreenOverride />
      ) : (
        // Render the Outlet and NavigationBar for narrow screens
        <div className="relative">
          <Outlet />
          <NavigationBar />
          <Button
            aria-label="Go to Settings"
            className={"absolute right-0 top-5 min-h-fit"}
            variant="light"
            onClick={() => {
              navigate(`/${userID}/settings`);
            }}
          >
            <FontAwesomeIcon className="fa-xl opacity-50" icon={faGears} />
          </Button>
        </div>
      )}
    </section>
  );
}
