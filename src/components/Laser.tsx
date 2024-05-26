import { RefObject, useEffect, useState } from "react";
import { useGameStore } from "../stateManagement/Store";

type Props = {
  laserRef: RefObject<HTMLDivElement>;
};

export default function Laser({laserRef}: Props) {
  const {
    userCurrentPosition,
    userBlockWidth,
    gameAudio,
    showLaser,
    checkForLaserCollisions,
  } = useGameStore((state) => ({
    userCurrentPosition: state.userCurrentPosition,
    userBlockWidth: state.userBlockWidth,
    gameAudio: state.gameAudio,
    showLaser: state.showLaser,
    checkForLaserCollisions: state.checkForLaserCollisions,
  }));

  const [laserPosition, setLaserPosition] = useState(userCurrentPosition);

  const drawLaser = () => {
    if (laserRef.current && showLaser) {
      laserRef.current.style.left = `${
        laserPosition[0] + userBlockWidth / 3
      }px`;
      laserRef.current.style.bottom = `${laserPosition[1]}px`;
    }
  };

  const moveLaser = () => {
    setLaserPosition((prevLaserPosition) => [
      prevLaserPosition[0],
      prevLaserPosition[1] + 4,
    ]);
    useGameStore.setState({ laserCurrentPosition: laserPosition });
    checkForLaserCollisions();
  };

  useEffect(() => {
    const intervalId = setInterval(moveLaser, 1);
    drawLaser();
    return () => {
      clearInterval(intervalId);
    };
  }, [laserPosition]);


  useEffect(() => {
    gameAudio.shoot.play()
  },[])


  return (
    <>
      <div
        ref={laserRef}
        className="h-3 w-3 bg-white rounded-md absolute"
      ></div>
    </>
  );
}
