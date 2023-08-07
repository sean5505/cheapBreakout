import { useRef, RefObject, useEffect } from "react";
import { Block } from "../../lib/Types";

const colors = [
  "#FD0318",
  "#03FD23",
  "#BA00FF",
  "#05CEFB",
  "#0528FB",
  "#000000",
  "yellow",
  "teal",
  "pink",
  "#002585",
];

type Props = {
  block: Block;
};

export default function CreateBlock(props: Props) {
  const blockRef: RefObject<HTMLDivElement> = useRef(null);

  const drawBlock = () => {
    if (blockRef.current) {
      blockRef.current.style.left = props.block.bottomLeft[0] + "px";
      blockRef.current.style.bottom = props.block.bottomLeft[1] + "px";
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
      className="absolute w-8 h-3 border-solid border-2 border-black"
    ></div>
  );
}
