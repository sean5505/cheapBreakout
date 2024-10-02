import { GameControls } from "../lib/Types";
import { FaArrowLeft, FaArrowRight, FaComputerMouse } from "react-icons/fa6";
import { useGameStore } from "../stateManagement/Store";

export default function Controls() {
  const isGameOver = useGameStore((state) => state.isGameOver);
  const isLaserDisabled = useGameStore((state) => state.isLaserDisabled);
  const controls: GameControls[] = [
    { key: "Spacebar -", action: "Start/Pause" },
    { key: "r -", action: "Restart" },
    { key: "p -", action: "shoot" },
    { key: "d -", action: "Toggle Laser" },
    { key: "m -", action: "Toggle sfx music" },
    { key: <FaComputerMouse />, action: "Control User Movement" },
    { key: <FaArrowLeft />, action: "Move Left" },
    { key: <FaArrowRight />, action: "Move Right" },
  ];

  return (
    <>
      {!isGameOver && (
        <div data-testid="Controls">
          <ul className="border-black border-2 text-center max-ex-sm:hidden ">
            <span className="text-2xl underline">Key Controls</span>
            {controls.map((control, index) => (
              <li
                className={`hover:text-white flex justify-center items-center gap-2 capitalize ${
                  index === 2 && isLaserDisabled ? "hidden" : "" //is there a better way?
                }`}
                key={index}
              >
                <div>{control.key} </div>
                <div> {control.action}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
