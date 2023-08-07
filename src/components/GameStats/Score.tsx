import GameStats from "../../lib/GameStatsHighlight";
import { useGameStore } from "../../stateManagement/Store";

export default function Score() {
  
  const {score, isGameOver, isLevelThreeCleared} = useGameStore((state) => ({
    score: state.score,
    isGameOver: state.isGameOver,
    isLevelThreeCleared: state.isLevelThreeCleared,
  }))

  return (
    <>
      <GameStats label= {isLevelThreeCleared || isGameOver? "Final Score:": "Current Score"}>{score}</GameStats>{" "}
    </>
  );
}
