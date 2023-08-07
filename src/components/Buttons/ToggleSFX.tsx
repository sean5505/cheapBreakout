
import Button from '../../lib/Button'
import { useGameAudio } from '../../stateManagement/Store'

export default function ToggleSFX() {
    const toggleSFX = useGameAudio((state) => state.toggleSFX)
  return (
    <Button onClick={toggleSFX}>Toggle SFX</Button>
  )
}
