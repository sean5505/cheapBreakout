import { useState, useEffect } from "react";
import { useGameStore } from "../../stateManagement/Store";
import CreateBlock from "./CreateBlock";

export default function LevelTwoBlocks() {
  const [blocks, setBlocks] = useState<number[][]>([]);

  //zustand store variable
  const { blockWidth, blockHeight, gameBlocks } = useGameStore((state) => ({
    blockWidth: state.blockWidth,
    blockHeight: state.blockHeight,
    totalBlocks: state.totalBlocks,
    gameBlocks: state.gameBlocks,
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
      for (let x = 30; x <= 500; x += blockWidth) {
        const y = 530;
        LevelThreeBlocks.push([x, y]);
      }
      setBlocks(LevelThreeBlocks);
    };

    populateBlocksArray();
  }, []);

  useEffect(() => {
    const blocksObject = blocks.map((block, index) => ({
      ...block,
      id: index,
      bottomLeft: [block[0], block[1]],
      bottomRight: [block[0] + blockWidth, block[1]],
      topLeft: [block[0], block[1] + blockHeight],
      topRight: [block[0] + blockWidth, block[1] + blockHeight],
    }));

    useGameStore.setState({
      gameBlocks: blocksObject,
      totalBlocks: blocksObject.length,
    });
  }, [blocks]);
  return (
    <>
      {gameBlocks.map((block) => (
        <div key={block.id}>
          <CreateBlock block={block} />
        </div>
      ))}
    </>
  );
}
