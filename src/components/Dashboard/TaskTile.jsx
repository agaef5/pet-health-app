import { Accordion, AccordionItem, Card, Checkbox } from "@nextui-org/react";

function TaskTile() {
  return (
    <Card className=" grid grid-cols-6 justify-stretch">
      <Accordion className="col-span-5">
        <AccordionItem title="Task Name" subtitle="duedate">
          <p className="">task descriptipn</p>
        </AccordionItem>
      </Accordion>
      <Checkbox
        className="self-start"
        radius="full"
        size="lg"
        color="success"
      ></Checkbox>
    </Card>
  );
}

export default TaskTile;
