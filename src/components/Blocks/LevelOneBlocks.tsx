import { useEffect, useState } from "react";
import { useGameStore } from "../../stateManagement/Store";

import AppendBlockProperties from "./BlockProperties";

export default function LevelOneBlocks() {
  const [blocks, setBlocks] = useState<number[][]>([]);
  const { blockWidth, blockHeight } = useGameStore((state) => ({
    blockWidth: state.blockWidth,
    blockHeight: state.blockHeight,
  }));

  useEffect(() => {
    const populateBlocksArray = () => {
      const LevelOneBlocks = [];

      for (let x = 13; x <= 19; x += blockWidth) {
        for (let y = 30; y <= 32; y += blockHeight) {
          LevelOneBlocks.push([x, y]);
        }
      }
      for (let x = 8; x <= 24; x += blockWidth) {
        for (let y = 24; y <= 28; y += blockHeight) {
          LevelOneBlocks.push([x, y]);
        }
      }
      setBlocks(LevelOneBlocks);
    };

    populateBlocksArray();
  }, []);

  return (
    <>
      <AppendBlockProperties blocks={blocks} />
    </>
  );
}