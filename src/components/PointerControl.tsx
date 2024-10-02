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

  function getRemValue(pxValue: number) {
    const rootHtmlFontSize = 16
    return pxValue / rootHtmlFontSize
  }

  const startPointerMovement = () => {
    props.boardRef.current?.addEventListener("pointerdown", pointerDown);
    props.boardRef.current?.addEventListener("pointermove", pointerMovement);
    document.addEventListener("pointerup", pointerUp);
  };

  const clearPointerMovement = () => {
    props.boardRef.current?.removeEventListener("pointerdown", pointerDown);
    props.boardRef.current?.removeEventListener("pointermove", pointerMovement);
    document.removeEventListener("pointerup", pointerUp);
  };

  const pointerDown = (e: PointerEvent) => {
    const offsetInRem = getRemValue(e.offsetX)
    if (offsetInRem - userBlock > 0 && offsetInRem < boardWidth - userBlock) {
      props.setPosition([offsetInRem - userBlock, props.position[1]]);
      setIsMouseActive(true);
    }
  };

  const pointerMovement = (e: PointerEvent) => {
    const offsetInRem = getRemValue(e.offsetX)
    if (isMouseActive) {
      if (offsetInRem <= boardWidth - userBlock && offsetInRem >= 0 + userBlock) {
        props.setPosition([offsetInRem - userBlock, props.position[1]]);
        props.drawUser();
      }
    }
  };

  const pointerUp = () => {
    setIsMouseActive(false);
  };


  useEffect(() => {
    if (isGameOver || isGamePaused) {
      return;
    } else {
      startPointerMovement();
      return () => {
        clearPointerMovement();
      };
    }
  }, [ballCurrentPosition, startPointerMovement, clearPointerMovement]);

  return null;
}
