
import RestartButton from "./RestartButton";
import StartButton from "./StartButton";
import ToggleLaser from "./ToggleLaser";


export default function ToggleGame() {
  return (
    <>
      <div className="flex justify-center gap-2">
        <StartButton />
        <RestartButton />
        <ToggleLaser/>
        
      </div>
    </>
  );
}
