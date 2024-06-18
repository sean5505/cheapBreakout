import StartButton from "../Buttons/StartButton";
import RestartButton from "../Buttons/RestartButton";

import ToggleLaser from "../Buttons/ToggleLaser";
import CurrentLevel from "../GameStats/CurrentLevel";
import ToggleSFX from "../Buttons/ToggleSFX";
import Score from "../GameStats/Score";
import { useState } from "react";
import { useGameStore } from "../../stateManagement/Store";
import GameModal from "./GameModal";
import Difficulty from "../GameStats/Difficulty";

export default function GamePausedContent() {
  const { isLevelThreeCleared } = useGameStore((state) => ({
    isLevelThreeCleared: state.isLevelThreeCleared,
  }));
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    {!isLevelThreeCleared ? (
      <GameModal isModalOpen= {isModalOpen} closeModal={closeModal} title="Game Paused">
        <div className="flex flex-col gap-2  ">
          <CurrentLevel />
          <Score />
          <Difficulty/>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <StartButton />
          <RestartButton />
          <ToggleSFX />
          <ToggleLaser />
        </div>
      </GameModal>
    ) : null}
    </>
  );
}
