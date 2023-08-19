import GameStatsHighlight from "../../lib/GameStatsHighlight";
import { useGameStore } from "../../stateManagement/Store";

export default function CurrentLevel() {
  const level = useGameStore((state) => state.level);
  return (
    <>
      <GameStatsHighlight label="Level:">{level}</GameStatsHighlight>
    </>
  );
}
