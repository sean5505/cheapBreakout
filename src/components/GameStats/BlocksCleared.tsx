
import GameStatsHighlight from '../../lib/GameStatsHighlight'
import { useGameStore } from '../../stateManagement/Store'

export default function BlocksCleared() {
    const blocksCleared = useGameStore((state) => state.blocksCleared)
  return (
    <GameStatsHighlight label = "Total Blocks Cleared"> {blocksCleared}</GameStatsHighlight>
  )
}
