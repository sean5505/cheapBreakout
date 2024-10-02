import { useEffect, useState } from "react";
import { useGameStore } from "../../stateManagement/Store";

import AppendBlockProperties from "./BlockProperties";

export default function LevelTwoBlocks() {
  const [blocks, setBlocks] = useState<number[][]>([]);
  const { blockWidth, blockHeight } = useGameStore((state) => ({
    blockWidth: state.blockWidth,
    blockHeight: state.blockHeight,
  }));

  useEffect(() => {
    const populateBlocksArray = () => {
      const LevelTwoBlocks = [];
      
      for (let x = 1; x <= 7; x += blockWidth) {
        for (let y = 24; y <= 32; y += blockHeight) {
          LevelTwoBlocks.push([x, y]);
        }
      }

      for (let x = 14; x <= 21; x += blockWidth) {
        for (let y = 24; y <= 32; y += blockHeight) {
          LevelTwoBlocks.push([x, y]);
        }
      }

      for (let x = 26; x <= 33; x += blockWidth) {
        for (let y = 24; y <= 32; y += blockHeight) {
          LevelTwoBlocks.push([x, y]);
        }
      }
      setBlocks(LevelTwoBlocks);
    };

    populateBlocksArray();
  }, []);

  return (
    <>
      <AppendBlockProperties blocks={blocks} />
    </>
  );
}