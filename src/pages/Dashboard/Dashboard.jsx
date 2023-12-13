/* eslint-disable react/no-unescaped-entities */
import { Button, Skeleton } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import TaskTile from "../../components/Dashboard/TaskTile";
import getPets from "../../functions/fetchData/getPets";
import { useEffect, useState } from "react";
import getTodayTasks from "../../functions/fetchData/getOnlyTodayTasks";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";

function Dashboard() {
  function hangleLogOut() {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
    });
    localStorage.removeItem("currentUserUID");
    window.location.href = "/";
  }

  const [pets, setPets] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchPets = async () => {
    const petsData = await getPets();
    setPets(petsData);
  };

  const fetchTodayTasks = async () => {
    const todayTasksData = await getTodayTasks();
    setTodayTasks(todayTasksData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      await fetchPets();
      await fetchTodayTasks();
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  return (
    <section
      className={`transition-opacity duration-1000 ease-in-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div>
        <h2>Your pets:</h2>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          {pets.map((pet) => (
            <PetsTileDetailed key={pet.id} petData={pet} minimal={true} />
          ))}
        </Skeleton>
      </div>
      <div>
        <h2>Your tasks due today:</h2>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          {todayTasks.length > 0 ? (
            todayTasks.map((task) => (
              <TaskTile
                key={task.id}
                taskID={task.id}
                taskData={task}
                onTaskUpdate={() => fetchTodayTasks()}
              />
            ))
          ) : (
            <h2>You're all good!</h2>
          )}
        </Skeleton>
      </div>

      <Button onClick={hangleLogOut}>Sign out</Button>
    </section>
  );
}

export default Dashboard;
