import { useState } from "react";
import GameModal from "./GameModal";
import { DifficultyOptions } from "../../lib/Types";
import { useGameAudio, useGameStore } from "../../stateManagement/Store";

export default function SelectDifficulty() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const gameAudio = useGameAudio((state) => state.sfx);

  const options: DifficultyOptions[] = [
    { difficulty: "Amateur", value: 15, scoreMultiply: 0.5 },
    { difficulty: "Balanced", value: 10, scoreMultiply: 1 },
    { difficulty: "Challenge", value: 7, scoreMultiply: 1.5 },
    { difficulty: "No Mercy!", value: 5, scoreMultiply: 2 },
    { difficulty: "Impossible", value: 1, scoreMultiply: 3 },
  ];

  const handleSelect = (
    difficulty: string,
    value: number,
    scoreMultiply: number
  ) => {
    useGameStore.setState({
      isDifficultySelected: true,
      setDifficulty: difficulty,
      ballSpeed: value,
      scoreMultiply: scoreMultiply,
      level: 1,
    });
    useGameAudio.setState({ isSFXMuted: false });
    closeModal();
    gameAudio.play();
  };
  return (
    <GameModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Select Your Difficulty"
    >
      {options.map((option) => (
        <div
          key={option.difficulty}
          className="border-4 border-black w-full text-center rounded relative cursor-pointer hover:bg-slate-600 transition"
          onClick={() =>
            handleSelect(option.difficulty, option.value, option.scoreMultiply)
          }
          title={option.difficulty}
        >
          <div className="">
            {option.difficulty}
            <span className="text-xs absolute right-1 bottom-0">
              x{option.scoreMultiply} score
            </span>
          </div>
        </div>
      ))}
    </GameModal>
  );
}
