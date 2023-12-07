import { Button, ButtonGroup } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const userID = localStorage.getItem("currentUserUID");

  function handleNavigation(path) {
    setTimeout(() => {
      //for asthetics (to make the button look like it's being pressed)
      navigate(`${path}`);
    }, 400);
  }

  return (
    <nav>
      <ButtonGroup>
        <Button
          onClick={() => handleNavigation("")}
          aria-label="Navigate to Home"
        >
          Home
        </Button>
        <Button
          onClick={() => handleNavigation("pets")}
          aria-label="Navigate to Pets"
        >
          Pets
        </Button>
        <Button
          onClick={() => handleNavigation("tasks")}
          aria-label="Navigate to Tasks"
        >
          Tasks
        </Button>
      </ButtonGroup>
    </nav>
  );
};

export default NavigationBar;
