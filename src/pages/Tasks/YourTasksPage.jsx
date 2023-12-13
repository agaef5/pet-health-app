import { useEffect, useState } from "react";
import FormPopup from "../../components/CreateNewData/FormPopUp";
import getTasks from "../../functions/fetchData/getTasks";
import TaskTile from "../../components/Dashboard/TaskTile";
import { ScrollShadow } from "@nextui-org/react";

function YourTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  const fetchData = async () => {
    setIsLoaded(false);
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
    setTimeout(() => {
      setIsLoaded(true);
    }, 250);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    setRefreshPage(false);
  }, [refreshPage === true]);

  // Separate tasks into incoming and done
  const incomingTasks = tasks.filter((task) => !task.isDone);
  const doneTasks = tasks.filter((task) => task.isDone);

  return (
    <div
      className={`transition-opacity duration-500 ease-in-out ${
        !isLoaded ? "opacity-0" : "opacity-100"
      }  relative h-[88vh] p-4 flex flex-col gap-6 `}
    >
      <ScrollShadow orientation="vertical" className="h-[88vh]">
        <h1>Your tasks</h1>
        <h2>Incoming</h2>
        <div className="flex flex-col mx-auto gap-4">
          {incomingTasks.map((task) => (
            <TaskTile
              key={task.id}
              taskID={task.id}
              taskData={task}
              onTaskUpdate={() => setRefreshPage(true)}
            />
          ))}
        </div>

        <h2>Done</h2>
        <div className="flex flex-col mx-auto gap-4 opacity-50">
          {doneTasks.map((task) => (
            <TaskTile
              key={task.id}
              taskID={task.id}
              taskData={task}
              onTaskUpdate={() => setRefreshPage(true)}
            />
          ))}
        </div>
      </ScrollShadow>

      <FormPopup logType="tasks" classButtonName="absolute bottom-0 right-4" />
    </div>
  );
}

export default YourTasksPage;
