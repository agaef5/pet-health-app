import AddNewPetTile from "../../components/Pets/AddNewPetTile";
import PetsTileDetailed from "../../components/Pets/PetsTilesPetsPage";

function YourPetsPage() {
  return (
    <div>
      <h1>Your Pets</h1>
      <PetsTileDetailed />
      <AddNewPetTile />
    </div>
  );
}

export default YourPetsPage;
