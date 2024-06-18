import { useGameStore } from "../../stateManagement/Store";
import GameStatsHighlight from "../../lib/GameStatsHighlight";

export default function Difficulty() {
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  return (
    <GameStatsHighlight label="Difficulty">
      {" "}
      {setDifficulty}{" "}
    </GameStatsHighlight>
  );
}
