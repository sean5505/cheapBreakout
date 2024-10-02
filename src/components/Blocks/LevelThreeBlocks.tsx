import { useState, useEffect } from "react";
import { useGameStore } from "../../stateManagement/Store";

import AppendBlockProperties from "./BlockProperties";

export default function LevelTwoBlocks() {
  const [blocks, setBlocks] = useState<number[][]>([]);

  //zustand store variable
  const { blockWidth, blockHeight} = useGameStore((state) => ({
    blockWidth: state.blockWidth,
    blockHeight: state.blockHeight,
  }));

  useEffect(() => {
    const populateBlocksArray = () => {
      const LevelThreeBlocks = [];

      for (let x = 2; x <= 32; x += blockWidth) {
        const y = 33;
        LevelThreeBlocks.push([x, y]);
      }

      for (let x = 2; x <= 32; x += blockWidth) { 
        for (let y = 29; y <= 31; y += blockHeight) {
          LevelThreeBlocks.push([x, y]);
        }
      }

      for (let x = 2; x <= 32; x += blockWidth) { 
        for (let y = 23; y <= 27; y += blockHeight) {
          LevelThreeBlocks.push([x, y]);
        }
      }
      setBlocks(LevelThreeBlocks);
    };

    populateBlocksArray();
  }, []);

  
  return (
    <>
         <AppendBlockProperties blocks = {blocks}/>
    </>
  );
}