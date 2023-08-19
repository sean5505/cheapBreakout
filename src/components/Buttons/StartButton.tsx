import { useGameStore } from "../../stateManagement/Store";
import Button from "../../lib/Button";

export default function StartButton() {
  const {
    ballMovement,
    startGame,
    pauseGame,
  } = useGameStore((state) => ({
    ballMovement: state.ballMovement,
    startGame: state.startGame,
    pauseGame: state.pauseGame,
  }));
  return (
    <>
      {!ballMovement ? (
        <div data-testid="startButton">
          <Button onClick={startGame}> Start </Button>
        </div>
      ) : (
        <div data-testid="pauseButton">
          <Button onClick={pauseGame}> Pause</Button>
        </div>
      )}
    </>
  );
}
