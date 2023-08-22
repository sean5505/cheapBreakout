import React, { useRef, RefObject, useEffect, useState } from "react";
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
import PlayerLives from "./PlayerLives";

export default function GameBoard() {
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
  } = useGameStore((state) => ({
    playerLives: state.playerLives,
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
  }));

  const [showLevelTwoBlocks, setShowLevelTwoBlocks] = useState(false);
  const [showLevelThreeBlocks, setShowLevelThreeBlocks] = useState(false);

  useEffect(() => {
    const setNextLevel = (
      nextLevel: number,
      setShowBlocks: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      setTimeout(() => {
        setShowBlocks(true);
        useGameStore.setState({ level: nextLevel });
      }, 2000);
    };
    if (isLevelOneCleared && !isLevelTwoCleared) {
      setNextLevel(2, setShowLevelTwoBlocks);
    } else if (isLevelTwoCleared) {
      setNextLevel(3, setShowLevelThreeBlocks);
    }
  }, [isLevelOneCleared, isLevelTwoCleared]);

  return (
    <div
      data-testid="game-board"
      ref={boardRef}
      className="h-550 w-560 border-black border-4 border-dotted relative "
      onClick={isGameOver ? openModal : undefined}
    >
      <>
        <PlayerLives />
        <Ball ballRef={ballRef} />
        {showLaser && ballMovement && !isLaserDisabled && (
          <Laser laserRef={laserRef} />
        )}

        <User boardRef={boardRef} userRef={userRef} ballRef={ballRef} />
        <LevelOneBlocks />
        {isLevelOneCleared && !showLevelTwoBlocks && (
          <p className=" text-3xl text-center">Level One Cleared </p>
        )}
        {showLevelTwoBlocks && <LevelTwoBlocks />}
        {isLevelTwoCleared && !showLevelThreeBlocks && (
          <p className=" text-3xl text-center">Level Two Cleared</p>
        )}
        {showLevelThreeBlocks && <LevelThreeBlocks />}

        {isGameOver || isLevelThreeCleared ? (
          <Modal>
            {" "}
            <GameOverContent />
          </Modal>
        ) : null}
        {isGamePaused &&
          (isLevelThreeCleared ? ( // utilizing so if the spacebar is pressed when level three is cleared the gameOverContent mdoal will appear instead o f the gamepaused modal but is there a better way?
            <Modal>
              {" "}
              <GameOverContent />
            </Modal>
          ) : (
            <Modal>
              <GamePausedContent />
            </Modal>
          ))}
        {showFeedbackForm && (
          <Modal>
            <FeedbackForm />
          </Modal>
        )}
      </>
    </div>
  );
}
