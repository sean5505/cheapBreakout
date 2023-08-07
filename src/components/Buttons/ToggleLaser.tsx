
import { useGameStore } from "../../stateManagement/Store";
import Button from "../../lib/Button";

export default function ToggleLaser() {
  const isLaserDisabled = useGameStore((state) => state.isLaserDisabled);

  const enableLaser = () => {
    useGameStore.setState({ isLaserDisabled: false });
  };
  const disableLaser = () => {
    useGameStore.setState({ isLaserDisabled: true });
  };
  return (
    <>
      {isLaserDisabled ? (
        <Button onClick={enableLaser}>Enable Laser</Button>
      ) : (
        <Button onClick={disableLaser}> Disable Laser</Button>
      )}
    </>
  );
}
