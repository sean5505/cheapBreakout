import { useEffect, RefObject } from "react";
import { useGameStore } from "../stateManagement/Store";

type Props = {
  ballRef: RefObject<HTMLDivElement>;
};

export default function Ball(props: Props) {
  const { ballCurrentPosition, checkForCollisions } = useGameStore((state) => ({
    ballCurrentPosition: state.ballCurrentPosition,
    checkForCollisions: state.checkForCollisions,
  }));

  const drawBallF = () => {
    if (props.ballRef.current) {
      props.ballRef.current.style.left = `${ballCurrentPosition[0]}px`;
      props.ballRef.current.style.bottom = `${ballCurrentPosition[1]}px`;
    }
  };

  useEffect(() => {
    drawBallF();
  }, [ballCurrentPosition]);

  const moveBallF = () => {
    const { xDirection, yDirection, ballCurrentPosition } =
      useGameStore.getState();

    const updatedBallPosition = [
      ballCurrentPosition[0] + xDirection,
      ballCurrentPosition[1] + yDirection,
    ];

    useGameStore.setState({
      ballCurrentPosition: updatedBallPosition,
    });

    drawBallF();
    checkForCollisions();
  };

  useEffect(() => {
    useGameStore.setState({ drawBall: drawBallF });
    useGameStore.setState({ moveBall: moveBallF });
  }, []);

  return (
    <>
      <div
        ref={props.ballRef}
        className="h-4 w-4 bg-red-600 absolute rounded-full"
      ></div>
    </>
  );
}
