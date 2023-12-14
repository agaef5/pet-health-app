/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import NavigationBar from "../../components/Navigation Bar/NavigationBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";

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
    <section>
      {isWideScreen ? (
        // mockup for wide screens from https://github.com/themesberg/flowbite/blob/main/content/components/device-mockups.md?plain=1
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800"></div>
          </div>

          <div className="absolute p-20">
            <h1 className="text-4xl font-semibold l pb-5">
              Reduce screen's width to less than 500px to see the project
            </h1>
            <p>
              highly recommend to check it with devTools in Chrome (Inspect &gt;
              CTRL + SHIFT + M &gt; iPhone 12 Pro)
            </p>
          </div>
        </div>
      ) : (
        // Render the Outlet and NavigationBar for narrow screens
        <div className="relative">
          <Outlet />
          <NavigationBar />
          <Button
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
