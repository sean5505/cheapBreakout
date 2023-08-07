
import GameStats from '../../lib/GameStatsHighlight'
import { useGameStore } from '../../stateManagement/Store'

export default function TotalBlocks() {
  const totalBlocks = useGameStore((state) => state.totalBlocks)
    
  return (
   
      <GameStats label="Remaining Blocks:">{totalBlocks}</GameStats> 
  )
}
