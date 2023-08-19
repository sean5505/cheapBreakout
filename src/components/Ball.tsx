import { useEffect, RefObject } from "react";
import { useGameStore } from "../stateManagement/Store";

type Props = {
  ballRef: RefObject<HTMLDivElement>;
};

export default function Ball(props: Props) {
  const { ballCurrentPosition } = useGameStore((state) => ({
    ballCurrentPosition: state.ballCurrentPosition,
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

  useEffect(() => {
    useGameStore.setState({ drawBall: drawBallF });
  }, []);

  return (
    <>
      <div
        ref={props.ballRef}
        data-testid="ball"
        className="h-4 w-4 bg-red-600 absolute rounded-full"
      ></div>
    </>
  );
}
