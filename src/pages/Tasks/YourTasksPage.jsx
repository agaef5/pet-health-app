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

  return (
    <div>
      <h2>Your tasks</h2>
      {tasks.map((task) => (
        <TaskTile key={task.id} taskID={task.id} taskData={task} />
      ))}
      <FormPopup logType="tasks" />
    </div>
  );
}

export default YourTasksPage;
