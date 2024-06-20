import Score from "./Score";
import TotalBlocks from "./TotalBlocks";
import GameTimer from "./GameTimer";
import CurrentLevel from "./CurrentLevel";
import { useGameStore } from "../../stateManagement/Store";
import Difficulty from "./Difficulty";

export default function GameStats() {
  const { isGameOver, isDifficultySelected } = useGameStore((state) => ({
    isGameOver: state.isGameOver,
    isDifficultySelected: state.isDifficultySelected,
  }));

  return (
    <>
      <div className={`${isGameOver ? "hidden" : "md:block"} hidden `}>
        <div className="flex flex-col gap-2">
          {isDifficultySelected ? <Difficulty /> : null}
          <Score />
          <TotalBlocks />
          <CurrentLevel />
          <GameTimer />
        </div>
      </div>
    </>
  );
}
