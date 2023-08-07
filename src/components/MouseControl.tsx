import React, { RefObject, useEffect, useMemo, useState } from "react";
import { useGameStore } from "../stateManagement/Store";

type Props = {
  boardRef: RefObject<HTMLDivElement>;
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
  drawUser: () => void;
};

export default function MouseControl(props: Props) {
  const [isMouseActive, setIsMouseActive] = useState<boolean>(false);

  const { boardWidth, userBlockWidth, ballCurrentPosition, isGameOver, isGamePaused } =
    useGameStore((state) => ({
      boardWidth: state.boardWidth,
      userBlockWidth: state.userBlockWidth,
      ballCurrentPosition: state.ballCurrentPosition,
      isGameOver: state.isGameOver,
      isGamePaused: state.isGamePaused
    }));

  const userBlock = useMemo(() => {
    return userBlockWidth / 2; // using this to center pointer on the block
  }, [userBlockWidth]);

  const startMouseMovement = () => {
    props.boardRef.current?.addEventListener("mousedown", mouseDown);
    props.boardRef.current?.addEventListener("mousemove", mouseMovement);
    document.addEventListener("mouseup", mouseUp);
  };

  const clearMouseMovement = () => {
    props.boardRef.current?.removeEventListener("mousedown", mouseDown);
    props.boardRef.current?.removeEventListener("mousemove", mouseMovement);
    document.removeEventListener("mouseup", mouseUp);
  };

  const mouseDown = (e: MouseEvent) => {
    if (e.offsetX - userBlock > 0 && e.offsetX < boardWidth - userBlock) {
      props.setPosition([e.offsetX - userBlock, props.position[1]]);
      setIsMouseActive(true);
    }
  };

  const mouseMovement = (e: MouseEvent) => {
    if (isMouseActive) {
      if (e.offsetX <= boardWidth - userBlock && e.offsetX >= 0 + userBlock) {
        props.setPosition([e.offsetX - userBlock, props.position[1]]);
        props.drawUser();
      }
    }
  };

  const mouseUp = () => {
    setIsMouseActive(false);
  };

  useEffect(() => {
    if (isGameOver || isGamePaused) {
      return;
    } else {
      startMouseMovement();
      return () => {
        clearMouseMovement();
      };
    }
  }, [ballCurrentPosition, startMouseMovement, clearMouseMovement]);

  return null;
}
