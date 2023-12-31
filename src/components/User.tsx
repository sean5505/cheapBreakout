import { useState, useEffect, RefObject } from "react";
import { useGameStore } from "../stateManagement/Store";
import MouseControl from "./MouseControl";

type Props = {
  boardRef: RefObject<HTMLDivElement>;
  userRef: RefObject<HTMLDivElement>;
  ballRef: RefObject<HTMLDivElement>;
};

export default function User(props: Props) {
  const {
    isGameOver,
    isGamePaused,
    userBlockWidth,
    boardWidth,
    attachBall,
    userCurrentPosition,
    playerLives,
  } = useGameStore((state) => ({
    isGameOver: state.isGameOver,
    isGamePaused: state.isGamePaused,
    userBlockWidth: state.userBlockWidth,
    boardWidth: state.boardWidth,
    attachBall: state.attachBall,
    userCurrentPosition: state.userCurrentPosition,
    ballCurrentPosition: state.ballCurrentPosition,
    playerLives: state.playerLives,
  }));

  const [position, setPosition] = useState<number[]>(userCurrentPosition);

  const drawUser = () => {
    if (props.userRef.current) {
      props.userRef.current.style.left = `${position[0]}px`;
      props.userRef.current.style.bottom = `${position[1]}px`;
    }
  };

  const moveUser = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        if (position[0] > 0) {
          setPosition([position[0] - 10, position[1]]);
        }
        break;
      case "ArrowRight":
        if (position[0] < boardWidth - userBlockWidth) {
          //270 <560 - 50
          setPosition([position[0] + 10, position[1]]);
        }
        break;
    }
    drawUser();
    attachBall();
  };

  useEffect(() => {
    if (isGameOver || isGamePaused) {
      return;
    } else {
      document.addEventListener("keydown", moveUser);
      return () => {
        document.removeEventListener("keydown", moveUser);
      };
    }
  }, [moveUser]);

  useEffect(() => {
    useGameStore.setState({ userCurrentPosition: position });
    drawUser();
    attachBall();
  }, [position]);

  useEffect(() => {
    setPosition(userCurrentPosition);
  }, [playerLives]); // whenever the player loses/gains a life , alter the stateful components 'position' value

  return (
    <>
      <div
        className="absolute w-12 h-2 bg-black cursor-pointer rounded-full"
        ref={props.userRef}
      ></div>
      <MouseControl
        boardRef={props.boardRef}
        drawUser={drawUser}
        position={position}
        setPosition={setPosition}
      />
    </>
  );
}
