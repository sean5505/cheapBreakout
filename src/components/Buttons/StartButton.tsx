
import { useGameStore } from "../../stateManagement/Store";
import Button from "../../lib/Button";

export default function StartButton() {
  const { ballMovement, isGamePaused, isGameOver, startGame } = useGameStore((state) => ({
    ballMovement: state.ballMovement,
    isGamePaused: state.isGamePaused,
    isGameOver: state.isGameOver,
    startGame: state.startGame,
  }));
  return (
    <>
      {!isGameOver && (
        <Button onClick={startGame}>{ballMovement ? "Pause" : "Start" }</Button>
      )}
    </>
  );
}
