// import { Button, ButtonGroup, Tab, Tabs } from "@nextui-org/react";
// import { useLocation, useNavigate } from "react-router-dom";

// const NavigationBar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const pathname = location.pathname;
//   const userID = localStorage.getItem("currentUserUID");

//   console.log("pathname: ", pathname);
//   console.log("userID: ", userID);

//   function handleNavigation(path) {
//     setTimeout(() => {
//       // Use an absolute path
//       navigate(`/${userID}/${path}`);
//     }, 400);
//   }

//   return (
//     <nav>
//       <ButtonGroup>
//         <Button
//           onClick={() => handleNavigation("")}
//           aria-label="Navigate to Home"
//         >
//           Home
//         </Button>
//         <Button
//           onClick={() => handleNavigation("pets")}
//           aria-label="Navigate to Pets"
//         >
//           Pets
//         </Button>
//         <Button
//           onClick={() => handleNavigation("tasks")}
//           aria-label="Navigate to Tasks"
//         >
//           Tasks
//         </Button>
//       </ButtonGroup>
//     </nav>
//   );
// };
// export default NavigationBar;

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
    <nav>
      <Tabs
        aria-label="Navigation Tabs"
        selectedKey={pathname}
        onSelectionChange={(path) => handleNavigation(path)}
      >
        <Tab key={`/${userID}/`} path={""} title="Home" />
        <Tab key={`/${userID}/pets`} path={"pets"} title="Pets" />
        <Tab key={`/${userID}/tasks`} path={"tasks"} title="Tasks" />
      </Tabs>
    </nav>
  );
};

export default NavigationBar;
