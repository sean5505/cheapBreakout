import { useEffect, useState } from "react";
import { useGameStore } from "../../stateManagement/Store";
import CreateBlock from "./CreateBlock";

export default function LevelOneBlocks() {
  const [blocks, setBlocks] = useState<number[][]>([]);
  const { gameBlocks, blockWidth, blockHeight } = useGameStore((state) => ({
    gameBlocks: state.gameBlocks,
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
