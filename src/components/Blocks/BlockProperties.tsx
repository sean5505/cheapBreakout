
import { useEffect } from 'react';
import { useGameStore } from '../../stateManagement/Store'
import CreateBlock from './CreateBlock'

type Props = {
    blocks: number[][],
}

export default function AppendBlockProperties(props : Props) {
    const { gameBlocks, blockWidth, blockHeight } = useGameStore((state) => ({
        gameBlocks: state.gameBlocks,
        blockWidth: state.blockWidth,
        blockHeight: state.blockHeight,
      }));
    
        const blocksObject = props.blocks.map((block, index) => ({
          ...block,
          id: index,
          bottomLeft: [block[0], block[1]],
          bottomRight: [block[0] + blockWidth, block[1]],
          topLeft: [block[0], block[1] + blockHeight],
          topRight: [block[0] + blockWidth, block[1] + blockHeight],
        }));
        useEffect(() => {
        useGameStore.setState({
          gameBlocks: blocksObject,
          totalBlocks: blocksObject.length,
        });
      }, [props.blocks]);
  return (
    <>
    {gameBlocks.map((block) => (
        <div key={block.id}>
          <CreateBlock block={block} />
        </div>
      ))}</>
  )
}
