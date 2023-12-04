import { Button, ButtonGroup } from "@nextui-org/react";

const NavigationBar = () => {
  return (
    <nav>
      <ButtonGroup>
        <Button>Home</Button>
        <Button>Pets</Button>
        <Button>Tasks</Button>
      </ButtonGroup>
    </nav>
  );
};

export default NavigationBar;
