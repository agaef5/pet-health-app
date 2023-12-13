import { useEffect, useState } from "react";
import FormPopup from "../../components/CreateNewData/FormPopUp";
import getTasks from "../../functions/fetchData/getTasks";
import TaskTile from "../../components/Dashboard/TaskTile";
import { Skeleton } from "@nextui-org/react";

function YourTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setTimeout(() => {
        setIsLoaded(true);
      }, 250);
    };
    fetchData();
  }, []);

  const handleTaskUpdate = async () => {
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  // Separate tasks into incoming and done
  const incomingTasks = tasks.filter((task) => !task.isDone);
  const doneTasks = tasks.filter((task) => task.isDone);

  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1>Your tasks</h1>
      <Skeleton isLoaded={isLoaded} className="rounded-lg">
        <h2>Incoming</h2>
        {incomingTasks.map((task) => (
          <TaskTile
            key={task.id}
            taskID={task.id}
            taskData={task}
            onTaskUpdate={handleTaskUpdate}
          />
        ))}
        <FormPopup logType="tasks" />

        <h2>Done</h2>
        {doneTasks.map((task) => (
          <TaskTile
            key={task.id}
            taskID={task.id}
            taskData={task}
            onTaskUpdate={handleTaskUpdate}
          />
        ))}
      </Skeleton>
    </div>
  );
}

export default YourTasksPage;
