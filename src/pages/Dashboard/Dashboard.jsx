/* eslint-disable react/no-unescaped-entities */
import { Card, Divider, ScrollShadow } from "@nextui-org/react";

import TaskTile from "../../components/Dashboard/TaskTile";
import getPets from "../../functions/fetchData/getPets";
import { useEffect, useState } from "react";
import getTodayTasks from "../../functions/fetchData/getOnlyTodayTasks";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";
import EmptyState from "../../components/Empty States/EmptyState";
import FormPopup from "../../components/CreateNewData/FormPopUp";

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
    fetchTodayTasks();
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
      <ScrollShadow className="pb-5">
        <div className="flex flex-col gap-10 pb-24">
          <div>
            <h2>Your pets:</h2>

            {pets.length > 0 ? (
              <ScrollShadow orientation="horizontal">
                <div className="flex flex-row overflow-x-auto min-w-fit gap-3 py-5 px-2">
                  {pets.map((pet) => (
                    <PetsTileDetailed
                      key={pet.id}
                      petData={pet}
                      minimal={true}
                    />
                  ))}
                </div>
              </ScrollShadow>
            ) : (
              <EmptyState logType={"Pet"} setRefreshPage={setRefreshPage} />
            )}
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
                <Card className="w-[80vw] flex flex-col gap-4 items-center p-4">
                  <h3>You don't have anything today!</h3>
                </Card>
              )}
            </div>
          </div>
        </div>
      </ScrollShadow>

      <FormPopup
        classButtonName={"fixed bottom-24 right-4"}
        setRefreshPage={setRefreshPage}
      />
    </section>
  );
}

export default Dashboard;
