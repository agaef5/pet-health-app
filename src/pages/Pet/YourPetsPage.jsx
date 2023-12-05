import NavigationBar from "../../components/Navigation Bar/NavigationBar";
import AddNewPetTile from "../../components/Pets/AddNewPetTile";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";

function YourPetsPage() {
  return (
    <div>
      <h1>Your Pets</h1>
      {/* mapping function here */}
      <PetsTileDetailed />
      <AddNewPetTile />

      <NavigationBar />
    </div>
  );
}

export default YourPetsPage;
