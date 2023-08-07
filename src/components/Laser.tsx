import { RefObject, useEffect, useState } from "react";
import { useGameStore } from "../stateManagement/Store";

type Props = {
  laserRef: RefObject<HTMLDivElement>;
};

export default function Laser(props: Props) {
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
    if (props.laserRef.current && showLaser) {
      props.laserRef.current.style.left = `${
        laserPosition[0] + userBlockWidth / 3
      }px`;
      props.laserRef.current.style.bottom = `${laserPosition[1]}px`;
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
    return () => {
      clearInterval(intervalId);
    };
  }, [laserPosition]);

  useEffect(() => {
    drawLaser();
  }, [laserPosition]);

  useEffect(() => {
    gameAudio.shoot.play()
  },[])


  return (
    <>
      <div
        ref={props.laserRef}
        className="h-3 w-3 bg-white rounded-md absolute"
      ></div>
    </>
  );
}
