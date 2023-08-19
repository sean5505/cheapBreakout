
import GameStatsHighlight from '../../lib/GameStatsHighlight'
import { useGameStore } from '../../stateManagement/Store'

export default function TotalBlocks() {
  const totalBlocks = useGameStore((state) => state.totalBlocks)
    
  return (
   
      <GameStatsHighlight label="Remaining Blocks:">{totalBlocks}</GameStatsHighlight> 
  )
}
