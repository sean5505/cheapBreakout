import StartButton from "../Buttons/StartButton";
import RestartButton from "../Buttons/RestartButton";

import ToggleLaser from "../Buttons/ToggleLaser";
import CurrentLevel from "../GameStats/CurrentLevel";
import ToggleSFX from "../Buttons/ToggleSFX";
import Score from "../GameStats/Score";

export default function GamePausedContent() {
  return (
    <>
    <div className="flex flex-col gap-2  ">
      <CurrentLevel />
      <Score/>
      </div>
      <StartButton />
      <RestartButton />
      <ToggleSFX />
      <ToggleLaser />
    </>
  );
}
