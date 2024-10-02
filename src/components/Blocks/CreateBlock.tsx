import { useRef, RefObject, useEffect } from "react";
import { Block } from "../../lib/Types";

const colors = [
  "#FD0318",
  "#03FD23",
  "#BA00FF",
  "#05CEFB",
  "#0528FB",
  "yellow",
  "teal",
  "pink",
  "#002585",
];

type Props = {
  block: Block;
};

export default function CreateBlock({block}: Props) {
  const blockRef: RefObject<HTMLDivElement> = useRef(null);

  const drawBlock = () => {
    if (blockRef.current) {
      blockRef.current.style.left = block.bottomLeft[0] + "rem";
      blockRef.current.style.bottom = block.bottomLeft[1] + "rem";
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      blockRef.current.style.backgroundColor = randomColor;
    }
  };

  useEffect(() => {
    drawBlock();
  }, []);

  return (
    <div
      ref={blockRef}
      className="absolute w-8 h-4 border-solid border-2 border-black"
    ></div>
  );
}
