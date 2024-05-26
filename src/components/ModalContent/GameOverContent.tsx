import Score from "../GameStats/Score";
import GameTimer from "../GameStats/GameTimer";
import RestartButton from "../Buttons/RestartButton";
import BlocksCleared from "../GameStats/BlocksCleared";
import { useGameStore } from "../../stateManagement/Store";

export default function GameOverContent() {
  const isLevelThreeCleared = useGameStore(
    (state) => state.isLevelThreeCleared
  );
  return (
    <>
      <h2 className="text-center">
        {isLevelThreeCleared ? (
          <>
            <p>
              Congratulations!
              <br />
              You Win!
            </p>
          </>
        ) : null}
      </h2>
      <Score />
      <BlocksCleared />
      <GameTimer />
      <RestartButton />
    </>
  );
}
