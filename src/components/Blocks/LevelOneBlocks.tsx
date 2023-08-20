import { useEffect, useState } from "react";
import { useGameStore } from "../../stateManagement/Store";

import AppendBlockProperties from "./BlockProperties";

export default function LevelOneBlocks() {
  const [blocks, setBlocks] = useState<number[][]>([]);
  const {  blockWidth, blockHeight } = useGameStore((state) => ({
    blockWidth: state.blockWidth,
    blockHeight: state.blockHeight,
  }));

  useEffect(() => {
    const populateBlocksArray = () => {
      const LevelOneBlocks = [];

      for (let x = 205; x <= 295; x += blockWidth) {
        for (let y = 470; y <= 500; y += blockHeight) {
          LevelOneBlocks.push([x, y]);
        }
      }

      for (let x = 115; x <= 385; x += blockWidth) {
        for (let y = 380; y <= 440; y += blockHeight) { 
          LevelOneBlocks.push([x, y]);
        }
      }

      setBlocks(LevelOneBlocks);
    };

    populateBlocksArray();
  }, []);

  
  return (
    <>
      <AppendBlockProperties blocks = {blocks}/>
    </>
  );
}
