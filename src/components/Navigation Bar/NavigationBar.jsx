import { Tabs, Tab } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  let pathname = location.pathname;
  const userID = localStorage.getItem("currentUserUID");

  if (pathname.startsWith(`/${userID}/pets/`)) {
    pathname = `/${userID}/pets`;
  }

  function handleNavigation(path) {
    navigate(path);
  }

  console.log("pathname: ", pathname);
  console.log("userID: ", `/${userID}/`);

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10">
      <Tabs
        aria-label="Navigation Tabs"
        selectedKey={pathname}
        size="lg"
        onSelectionChange={(path) => handleNavigation(path)}
        classNames={{
          tabList: "w-[90vw]",
        }}
      >
        <Tab key={`/${userID}/`} path={""} title="Home" />
        <Tab key={`/${userID}/pets`} path={"pets"} title="Pets" />
        <Tab key={`/${userID}/tasks`} path={"tasks"} title="Tasks" />
      </Tabs>
    </nav>
  );
};

export default NavigationBar;
