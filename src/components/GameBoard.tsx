import React, { useRef, RefObject, useEffect, useState } from "react";
import Ball from "./Ball";
import LevelOneBlocks from "./Blocks/LevelOneBlocks";
import LevelTwoBlocks from "./Blocks/LevelTwoBlocks";
import LevelThreeBlocks from "./Blocks/LevelThreeBlocks";
import User from "./User";
import Laser from "./Laser";
import { useGameStore } from "../stateManagement/Store";
import GameOverContent from "./ModalContent/GameOverContent";
import GamePausedContent from "./ModalContent/GamePausedContent";
import PlayerLives from "./PlayerLives";
import Indicators from "./Indicators";
import GameModal from "./ModalContent/GameModal";
import SelectDifficulty from "./ModalContent/SelectDifficulty";

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
    isGamePaused,
    isLevelOneCleared,
    isLevelTwoCleared,
    isLevelThreeCleared,
    isLaserDisabled,
    isDifficultySelected,
  } = useGameStore((state) => ({
    showLaser: state.showLaser,
    ballMovement: state.ballMovement,
    isGameOver: state.isGameOver,
    isGamePaused: state.isGamePaused,
    isLevelOneCleared: state.isLevelOneCleared,
    isLevelTwoCleared: state.isLevelTwoCleared,
    isLevelThreeCleared: state.isLevelThreeCleared,
    isLaserDisabled: state.isLaserDisabled,
    isDifficultySelected: state.isDifficultySelected,
  }));

  const [showLevelTwoBlocks, setShowLevelTwoBlocks] = useState(false);
  const [showLevelThreeBlocks, setShowLevelThreeBlocks] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const setNextLevel = (
      nextLevel: number,
      setShowBlocks: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      useGameStore.setState({ isLoading: true });
      setTimeout(() => {
        setShowBlocks(true);
        useGameStore.setState({ level: nextLevel, isLoading: false });
      }, 2000);
    };
    if (isLevelOneCleared && !isLevelTwoCleared) {
      setNextLevel(2, setShowLevelTwoBlocks);
    } else if (isLevelTwoCleared) {
      setNextLevel(3, setShowLevelThreeBlocks);
    }
  }, [isLevelOneCleared, isLevelTwoCleared]);

  const handleClick = () => { //if game is over and the board is clicked when modal is closed
    openModal();
    useGameStore.setState({ballMovement: null})
  };

  return (
    <div
      data-testid="game-board"
      ref={boardRef}
      className="h-144 w-146 border-black border-4 border-dotted relative "
      onClick={isGameOver || isLevelThreeCleared ? handleClick : undefined}
    >
      <>
      {!isDifficultySelected? 
        <SelectDifficulty/> : (
      <>
        <Indicators />
        <PlayerLives />
        <Ball ballRef={ballRef} />
        {showLaser && ballMovement && !isLaserDisabled && (
          <Laser laserRef={laserRef} />
        )}

        <User boardRef={boardRef} userRef={userRef} />
        {!isLevelOneCleared ? <LevelOneBlocks /> : null}
        {isLevelOneCleared && !showLevelTwoBlocks && (
          <p className=" text-3xl text-center">Level One Cleared </p>
        )}
        {showLevelTwoBlocks && !isLevelTwoCleared ? <LevelTwoBlocks /> : null}
        {isLevelTwoCleared && !showLevelThreeBlocks && (
          <p className=" text-3xl text-center">Level Two Cleared</p>
        )}
        {showLevelThreeBlocks && !isLevelThreeCleared ? (
          <LevelThreeBlocks />
        ) : null}

        {isGamePaused &&
          (isLevelThreeCleared ? ( // utilizing so if the spacebar is pressed when level three is cleared the gameOverContent mdoal will appear instead of the gamepaused modal but is there a better way?
            <GameModal
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              title="Game Over"
            >
              <GameOverContent />{" "}
            </GameModal>
          ) : (
            <GamePausedContent />
          ))}
        {/*will render the below when the gameboard is clicked after the gameover modal is closed... linked to handleClick func*/}
        {isGameOver || isLevelThreeCleared ? (
          <GameModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            title="Game Over"
          >
            <GameOverContent />
          </GameModal>
        ) : null}
        </>
        )}
        
      </>
    </div>
  );
}

{/* with the gameovercontent it would be better to render the modal 
  in the child component, however, i want to be able to open the modal
  on click of the game board, aka the parent component */}