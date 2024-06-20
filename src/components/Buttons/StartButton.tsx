import { useGameStore } from "../../stateManagement/Store";
import Button from "../../lib/Button";

export default function StartButton() {
  const {  startGame, isLevelThreeCleared, isGamePaused } =
    useGameStore((state) => ({
      startGame: state.startGame,
      isLevelThreeCleared: state.isLevelThreeCleared,
      isGamePaused: state.isGamePaused,
    }));
  return (
    <Button disabled={isLevelThreeCleared ? true : false} onClick={() => startGame()}>
      {isGamePaused? 'Continue' : 'Start'}
    </Button>
  );
}
