import { useGameStore } from "../../stateManagement/Store";
import PauseButton from "./PauseButton";
import RestartButton from "./RestartButton";
import StartButton from "./StartButton";
import ToggleLaser from "./ToggleLaser";

export default function ToggleGame() {
  const { isGameOver, ballMovement } = useGameStore((state) => ({
    isGameOver: state.isGameOver,
    ballMovement: state.ballMovement,
  }));
  return (
    <>
      <div data-testid="toggleGame" className="flex justify-center gap-2">
        {!isGameOver && (
          <>
            {!ballMovement ? <StartButton /> : <PauseButton />}
            <RestartButton />
            <ToggleLaser />
          </>
        )}
      </div>
    </>
  );
}
