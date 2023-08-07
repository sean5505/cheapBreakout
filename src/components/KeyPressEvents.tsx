import { useEffect } from "react";
import { useGameAudio, useGameStore } from "../stateManagement/Store";

export default function KeyboardEvents() {
  const { isGameOver, startGame, restartGame, isModalOpen, isLaserDisabled, showFeedbackForm,gameAudio} = useGameStore(
    (state) => ({
      isGameOver: state.isGameOver,
      startGame: state.startGame,
      restartGame: state.restartGame,
      isModalOpen: state.isModalOpen,
      isLaserDisabled: state.isLaserDisabled,
      showFeedbackForm: state.showFeedbackForm,
      gameAudio: state.gameAudio,
    })
  );
  const toggleSFX = useGameAudio((state) => state.toggleSFX)
  const handleKeypress = (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.key === " " && !isGameOver) {
      startGame();
      gameAudio.gameMusic.play()
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
      toggleSFX()
    }
  };

  useEffect(() => {
    if(!showFeedbackForm)
    document.addEventListener("keypress", handleKeypress);

    return () => {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [handleKeypress]);

  return null;
}
