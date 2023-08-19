import { useEffect } from "react";
import { useGameAudio, useGameStore } from "../stateManagement/Store";

export default function KeyboardEvents() {
  const {
    isGameOver,
    ballMovement,
    startGame,
    pauseGame,
    restartGame,
    isModalOpen,
    isLaserDisabled,
    showFeedbackForm,
    gameAudio,
  } = useGameStore((state) => ({
    isGameOver: state.isGameOver,
    ballMovement: state.ballMovement,
    startGame: state.startGame,
    pauseGame: state.pauseGame,
    restartGame: state.restartGame,
    isModalOpen: state.isModalOpen,
    isLaserDisabled: state.isLaserDisabled,
    showFeedbackForm: state.showFeedbackForm,
    gameAudio: state.gameAudio,
    isLevelThreeCleared: state.isLevelThreeCleared,
  }));
  const toggleSFX = useGameAudio((state) => state.toggleSFX);
  const handleKeypress = (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.key === " " && !isGameOver) {
      if (!ballMovement) {
        startGame();
        gameAudio.gameMusic.play();
      } else {
        pauseGame();
      }
    } else if (e.key == "r") {
      restartGame();
    } else if (e.key === "p" && !isModalOpen) {
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
  };

  useEffect(() => {
    if (!showFeedbackForm)
      document.addEventListener("keypress", handleKeypress);

    return () => {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [handleKeypress]);

  return null;
}
