import { useEffect, useState } from "react";
import FormPopup from "../../components/CreateNewData/FormPopUp";
import getTasks from "../../functions/fetchData/getTasks";
import TaskTile from "../../components/Dashboard/TaskTile";
import { Card, Divider, ScrollShadow } from "@nextui-org/react";
import EmptyState from "../../components/Empty States/EmptyState";

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
      }  relative h-[88vh] p-4 pt-10  flex flex-col gap-6 `}
    >
      <h1>Your tasks</h1>

      <ScrollShadow orientation="vertical">
        <div className="h-[90vh] flex flex-col gap-4 mb-24">
          <h2>Incoming</h2>
          {incomingTasks.length > 0 ? (
            <div className="flex flex-col mx-auto gap-4 w-full">
              {incomingTasks.map((task) => (
                <TaskTile
                  key={task.id}
                  taskID={task.id}
                  taskData={task}
                  onTaskUpdate={() => setRefreshPage(true)}
                />
              ))}
            </div>
          ) : (
            <EmptyState logType={"tasks"} setRefreshPage={setRefreshPage} />
          )}

          <Divider className="mt-4" />
          <h2>Done</h2>
          {doneTasks.length > 0 ? (
            <div className="flex flex-col mx-auto gap-4 opacity-50 pb-10 w-full">
              {doneTasks.map((task) => (
                <TaskTile
                  key={task.id}
                  taskID={task.id}
                  taskData={task}
                  onTaskUpdate={() => setRefreshPage(true)}
                />
              ))}
            </div>
          ) : (
            <Card className="w-[80vw] flex flex-col gap-4 items-center p-4 mx-auto">
              <h3 className="text-center">
                Uncheck one task and get the job done!
              </h3>
            </Card>
          )}
        </div>
      </ScrollShadow>
      <FormPopup
        logType="tasks"
        classButtonName="fixed bottom-24 right-4"
        setRefreshPage={setRefreshPage}
      />
    </div>
  );
}

export default YourTasksPage;
