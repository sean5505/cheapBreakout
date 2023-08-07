
import Button from '../../lib/Button';
import { useGameStore } from '../../stateManagement/Store';

export default function RestartButton() {
    const restart = useGameStore((state) => state.restartGame)
  return (
    <>
    <Button onClick={restart}>Restart</Button>
    </>
  )
}
