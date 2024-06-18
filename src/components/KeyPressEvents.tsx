import { useEffect } from "react";
import { useGameAudio, useGameStore } from "../stateManagement/Store";

export default function KeyboardEvents() {
  const {
    isGameOver,
    ballMovement,
    startGame,
    pauseGame,
    restartGame,
    isLaserDisabled,
    isLoading,
    isFormOpen,
    isDifficultySelected,
    isLevelThreeCleared,
  } = useGameStore((state) => ({
    isGameOver: state.isGameOver,
    ballMovement: state.ballMovement,
    startGame: state.startGame,
    pauseGame: state.pauseGame,
    restartGame: state.restartGame,
    isLaserDisabled: state.isLaserDisabled,
    gameAudio: state.gameAudio,
    isLoading: state.isLoading,
    isFormOpen: state.isFormOpen,
    isDifficultySelected: state.isDifficultySelected,
    isLevelThreeCleared: state.isLevelThreeCleared,
  }));
  const toggleSFX = useGameAudio((state) => state.toggleSFX);
  const handleKeypress = (e: KeyboardEvent) => {
    e.preventDefault();

    if (!isGameOver && !isLoading) {
      if (e.key === " " && !isLevelThreeCleared) {
        !ballMovement ? startGame() : pauseGame();
      } else if (e.key == "r") {
        restartGame();
      } else if (e.key === "p") {
        useGameStore.setState({ showLaser: true });
      } else if (e.key === "d") {
        {
          !isLaserDisabled
            ? useGameStore.setState({ isLaserDisabled: true })
            : useGameStore.setState({ isLaserDisabled: false });
        }
      } else if (e.key === "m") {
        toggleSFX();
      }
    }
  };

  useEffect(() => {
    if (!isFormOpen && isDifficultySelected)
      //for keypress events to be disabled when conditions are met
      document.addEventListener("keypress", handleKeypress);
    return () => {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [handleKeypress]);

  return null;
}
