import { useRef, RefObject, useEffect } from "react";
import Ball from "./Ball";
import LevelOneBlocks from "./Blocks/LevelOneBlocks";
import LevelTwoBlocks from "./Blocks/LevelTwoBlocks";
import LevelThreeBlocks from "./Blocks/LevelThreeBlocks";

import User from "./User";
import Laser from "./Laser";
import { useGameStore } from "../stateManagement/Store";
import Modal from "./ModalContent/Modal";

import GameOverContent from "./ModalContent/GameOverContent";

import GamePausedContent from "./ModalContent/GamePausedContent";
import FeedbackForm from "./ModalContent/FeedbackForm";

export default function GameBoard() {
  // moved all the shared variables to store to prevent extensive prop drilling
  //const blockRef: RefObject<HTMLDivElement> = useRef(null);
  const userRef: RefObject<HTMLDivElement> = useRef(null);
  const ballRef: RefObject<HTMLDivElement> = useRef(null);
  const boardRef: RefObject<HTMLDivElement> = useRef(null);
  const laserRef: RefObject<HTMLDivElement> = useRef(null);

  const {
    showLaser,
    ballMovement,
    isGameOver,
    openModal,
    isGamePaused,
    isLevelOneCleared,
    isLevelTwoCleared,
    isLevelThreeCleared,
    isLaserDisabled,
    showFeedbackForm,
    gameAudio,
  } = useGameStore((state) => ({
    showLaser: state.showLaser,
    ballMovement: state.ballMovement,
    isGameOver: state.isGameOver,
    openModal: state.openModal,
    isGamePaused: state.isGamePaused,
    isLevelOneCleared: state.isLevelOneCleared,
    isLevelTwoCleared: state.isLevelTwoCleared,
    isLevelThreeCleared: state.isLevelThreeCleared,
    isLaserDisabled: state.isLaserDisabled,
    showFeedbackForm: state.showFeedbackForm,
    gameAudio: state.gameAudio,
  }));

  useEffect(() => {
    console.log(`isLaserDisabled: ${isLaserDisabled}, showLaser: ${showLaser}`);
  }, [ballMovement]);

  useEffect(() => {
    const gameSFX = gameAudio.gameMusic;

    gameSFX.play();

    return () => {
      gameSFX.pause();
    };
  }, []);
  return (
    <div
      ref={boardRef}
      className="h-550 w-560 border-black border-4 border-dotted relative"
      onClick={isGameOver ? openModal : undefined}
    >
      <>
        <Ball ballRef={ballRef} />
        {showLaser && ballMovement && !isLaserDisabled && (
          <Laser laserRef={laserRef} />
        )}

        <User boardRef={boardRef} userRef={userRef} ballRef={ballRef} />
        <LevelOneBlocks />
        {isLevelOneCleared && <LevelTwoBlocks />}
        {isLevelTwoCleared && isLevelOneCleared && <LevelThreeBlocks />}
        {isGameOver || isLevelThreeCleared ? (
          <Modal>
            {" "}
            <GameOverContent />
          </Modal>
        ) : null}
        {isGamePaused && (
          <Modal>
            <GamePausedContent />
          </Modal>
        )}
        {showFeedbackForm && (
          <Modal>
            <FeedbackForm />
          </Modal>
        )}
      </>
    </div>
  );
}
