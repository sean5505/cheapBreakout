import { useState, useEffect } from "react";
import { useGameStore } from "../../stateManagement/Store";
import GameStatsHighlight from "../../lib/GameStatsHighlight";

export default function GameTimer() {
  const [timer, setTimer] = useState<NodeJS.Timer | number>(0);
  const { ballMovement, seconds, updateSeconds, isLevelThreeCleared } =
    useGameStore((state) => ({
      ballMovement: state.ballMovement,
      seconds: state.seconds,
      updateSeconds: state.updateSeconds,
      isLevelThreeCleared: state.isLevelThreeCleared,
    }));

  useEffect(() => {
    if (ballMovement && !isLevelThreeCleared) {
      setTimer(
        setInterval(() => {
          console.log(isLevelThreeCleared);
          updateSeconds();
        }, 1000)
      );
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [ballMovement, isLevelThreeCleared]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <GameStatsHighlight label="Time:">
        {formatTime(seconds)}
      </GameStatsHighlight>
    </>
  );
}
