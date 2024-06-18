import Score from "./Score";
import TotalBlocks from "./TotalBlocks";
import GameTimer from "./GameTimer";
import CurrentLevel from "./CurrentLevel";
import { useGameStore } from "../../stateManagement/Store";
import Difficulty from "./Difficulty";

export default function GameStats() {
  const isGameOver = useGameStore((state)=> state.isGameOver)
  const isDifficultySelected = useGameStore((state) => state.isDifficultySelected)
  return (
    <>
      <div data-testid="gamestats" className="hidden md:block flex-col gap-4 text-center">
      {!isGameOver && (
        <>
        {isDifficultySelected && <Difficulty/> }
        <Score />
        <TotalBlocks />
        <CurrentLevel />
        <GameTimer />
        </>
      )}
      </div>
    </>
  );
}
