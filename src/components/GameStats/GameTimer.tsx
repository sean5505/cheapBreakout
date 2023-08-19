import { useState, useEffect } from "react";
import { useGameStore } from "../../stateManagement/Store";
import GameStatsHighlight from "../../lib/GameStatsHighlight";

export default function GameTimer() {
  const [timer, setTimer] = useState(0);
  const ballMovement = useGameStore((state) => state.ballMovement);
  const { seconds, updateSeconds } = useGameStore((state) => ({
    seconds: state.seconds,
    updateSeconds: state.updateSeconds,
  }));

  useEffect(() => {
    if (ballMovement) {
      
      setTimer(
        setInterval(() => {
          updateSeconds();
        }, 1000)
      );
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [ballMovement]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <GameStatsHighlight label="Time:">{formatTime(seconds)}</GameStatsHighlight>;
}
