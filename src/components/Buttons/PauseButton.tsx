import Button from '../../lib/Button'
import { useGameStore } from '../../stateManagement/Store'

export default function PauseButton() {
    const pauseGame = useGameStore((state) => state.pauseGame)
  return (
    <Button onClick={() => pauseGame()}>Pause</Button>
  )
}
