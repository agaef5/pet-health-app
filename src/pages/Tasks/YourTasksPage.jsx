import { useEffect, useState } from "react";
import FormPopup from "../../components/CreateNewData/FormPopUp";
import getTasks from "../../functions/fetchData/getTasks";
import TaskTile from "../../components/Dashboard/TaskTile";

function YourTasksPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
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
    <div>
      <h1>Your tasks</h1>

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
    </div>
  );
}

export default YourTasksPage;
