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
      for (let x = 30; x <= 500; x += blockWidth) {
        for (let y = 380; y <= 430; y += blockHeight) {
          LevelThreeBlocks.push([x, y]);
        }
      }
      for (let x = 30; x <= 500; x += blockWidth) {
        for (let y = 470; y <= 500; y += blockHeight) {
          LevelThreeBlocks.push([x, y]);
        }
      }
      for (let x = 30; x <= 500; x += blockWidth) { //x<= 500
        const y = 530;
        LevelThreeBlocks.push([x, y]);
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