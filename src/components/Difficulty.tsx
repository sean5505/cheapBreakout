import React, { useState } from "react";
import { useGameStore } from "../stateManagement/Store";
import { DifficultyOptions } from "../lib/Types";

const options: DifficultyOptions[] = [
  { difficulty: "Amateur", value: 15, scoreMultiply: 0.7 },
  { difficulty: "Balanced", value: 10, scoreMultiply: 1 },
  { difficulty: "Challenge", value: 7, scoreMultiply: 1.2 },
  { difficulty: "No Mercy!", value: 5, scoreMultiply: 1.5 },
  { difficulty: "Impossible", value: 1, scoreMultiply: 2 },
];

const LOCAL_STORAGE_KEY = "difficultySettings";

export default function Difficulty() {
  const { ballMovement, isGameOver } = useGameStore((state) => ({
    ballMovement: state.ballMovement,
    isGameOver: state.isGameOver,
  }));
  const initialSettings = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    initialSettings.selectedDifficulty || options[1].value
  );
  const [scoreMultiply, setScoreMultiply] = useState(
    initialSettings.scoreMultiply || options[1].scoreMultiply
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const newSelectedDifficulty = e.target.value;
    setSelectedDifficulty(newSelectedDifficulty);
    setScoreMultiply(options[selectedIndex].scoreMultiply);

    // update Local
    const settings = {
      selectedDifficulty: newSelectedDifficulty,
      scoreMultiply,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    //update store
    useGameStore.setState({
      ballSpeed: Number(newSelectedDifficulty),
      scoreMultiply: options[selectedIndex].scoreMultiply,
    });
  };



  return (
    <>
      <form data-testid="DifficultyForm" className="flex flex-col">
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          className="text-center border-2 border-black"
          value={selectedDifficulty}
          onChange={handleSelectChange}
          disabled={ballMovement || isGameOver ? true : false}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {" "}
              {option.difficulty}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
