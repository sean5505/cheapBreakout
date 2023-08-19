
import { useGameStore } from "../../stateManagement/Store";
import RestartButton from "./RestartButton";
import StartButton from "./StartButton";
import ToggleLaser from "./ToggleLaser";


export default function ToggleGame() {
  const isGameOver = useGameStore((state) => state.isGameOver)
 
  return (
    <>
      <div data-testid= "toggleGame" className="flex justify-center gap-2">
        {!isGameOver  && <StartButton />}
        <RestartButton />
        <ToggleLaser/>
        
      </div>
    </>
  );
}
