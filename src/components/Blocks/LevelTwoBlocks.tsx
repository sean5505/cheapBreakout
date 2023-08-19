import { useEffect, useState } from "react";
import { useGameStore } from "../../stateManagement/Store";

import AppendBlockProperties from "./BlockProperties";

export default function LevelTwoBlocks() {
  const [blocks, setBlocks] = useState<number[][]>([]);
  const {  blockWidth, blockHeight } = useGameStore((state) => ({
    blockWidth: state.blockWidth,
    blockHeight: state.blockHeight,
  }));

  useEffect(() => {
    const populateBlocksArray = () => {
      const LevelTwoBlocks = [];
      for (let x = 10; x <= 100; x += blockWidth) {
        for (let y = 380; y <= 500; y += blockHeight) {
          LevelTwoBlocks.push([x, y]);
        }
      }
      for (let x = 205; x <= 295; x += blockWidth) {
        for (let y = 380; y <= 500; y += blockHeight) { //y<= 500
          LevelTwoBlocks.push([x, y]);
        }
      }
     for (let x = 420; x <= 520; x += blockWidth) {
        for (let y = 380; y <= 500; y += blockHeight) {
          LevelTwoBlocks.push([x, y]);
        }
      }
      setBlocks(LevelTwoBlocks);
    };

    populateBlocksArray();
  }, []);


  return (
    <>
         <AppendBlockProperties blocks = {blocks}/>
    </>
  );
}
