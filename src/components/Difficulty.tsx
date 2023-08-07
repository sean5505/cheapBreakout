import { useEffect, useState } from "react";
import { useGameStore } from "../stateManagement/Store";
import { DifficultyOptions } from "../lib/Types";


const options: DifficultyOptions[] = [
  { difficulty: "Amateur", value: 15, scoreMultiply: .7 },
  { difficulty: "Balanced", value: 10, scoreMultiply: 1 },
  { difficulty: "Challenge", value: 7, scoreMultiply: 1.2 },
  { difficulty: "No Mercy!", value: 5, scoreMultiply: 1.5  },
  { difficulty: "Impossible", value: 1, scoreMultiply: 2 },
];

export default function Difficulty() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(options[1].value); // Set the default value here
  const [scoreMultiply, setScoreMultiply] = useState(options[1].scoreMultiply)
  
  const handleSelectChange = (e: any) => {
    const selectedIndex = e.target.selectedIndex;
  setSelectedDifficulty(e.target.value);
  setScoreMultiply(options[selectedIndex].scoreMultiply);

  };

  useEffect(() => {
    useGameStore.setState({ ballSpeed: selectedDifficulty, scoreMultiply: scoreMultiply  });
  }, [selectedDifficulty]);

  return (
    <>
      <form className="flex flex-col ">
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          className=" text-center border-2 border-black"
          value={selectedDifficulty}
          onChange={handleSelectChange}
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
