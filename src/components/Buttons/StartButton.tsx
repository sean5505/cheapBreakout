
import { useGameStore } from "../../stateManagement/Store";
import Button from "../../lib/Button";

export default function StartButton() {
  const { ballMovement, isGameOver, startGame } = useGameStore((state) => ({
    ballMovement: state.ballMovement,
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
