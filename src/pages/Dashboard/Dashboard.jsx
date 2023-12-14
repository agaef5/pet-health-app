/* eslint-disable react/no-unescaped-entities */
import { Divider, ScrollShadow } from "@nextui-org/react";

import TaskTile from "../../components/Dashboard/TaskTile";
import getPets from "../../functions/fetchData/getPets";
import { useEffect, useState } from "react";
import getTodayTasks from "../../functions/fetchData/getOnlyTodayTasks";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  const fetchPets = async () => {
    const petsData = await getPets();
    setPets(petsData);
  };

  const fetchTodayTasks = async () => {
    const todayTasksData = await getTodayTasks();
    setTodayTasks(todayTasksData);
  };

  const fetchData = async () => {
    setIsLoaded(false);
    await fetchPets();
    await fetchTodayTasks();
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

  return (
    <section
      className={`transition-opacity duration-1000 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      } relative h-[85vh] p-4 py-10 flex flex-col gap-4`}
    >
      <h1>Welcome!</h1>
      <ScrollShadow>
        <div className="flex flex-col gap-10">
          <div>
            <h2>Your pets:</h2>
            <ScrollShadow orientation="horizontal">
              <div className="flex flex-row overflow-x-auto min-w-fit gap-3 py-3">
                {pets.map((pet) => (
                  <PetsTileDetailed key={pet.id} petData={pet} minimal={true} />
                ))}
              </div>
            </ScrollShadow>
          </div>
          <Divider />
          <div>
            <h2>Your tasks due today:</h2>
            <div className="flex flex-col gap-4 items-center">
              {todayTasks.length > 0 ? (
                todayTasks.map((task) => (
                  <TaskTile
                    key={task.id}
                    taskID={task.id}
                    taskData={task}
                    onTaskUpdate={() => setRefreshPage(true)}
                  />
                ))
              ) : (
                <h3>You're all good!</h3>
              )}
            </div>
          </div>
        </div>
      </ScrollShadow>
    </section>
  );
}

export default Dashboard;
