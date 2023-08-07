import { RiMessage2Fill } from "react-icons/ri";
import { useGameStore } from "../stateManagement/Store";

export default function Footer() {
  const ballMovement = useGameStore((state) => state.ballMovement);
  const showFeedbackForm = useGameStore((state) => state.showFeedbackForm);
  const openFeedback = () => {
    useGameStore.setState({ showFeedbackForm: true });
  };
  const closeFeedback = () => {
    useGameStore.setState({showFeedbackForm: false})
  }
  return (
    <>
      <footer className="  bg-gradient-to-r from-blue-600 to to-purple-700 mt-4 text-white border-2 border-black rounded-sm">
        <header className="flex justify-around items-center border-black">
          <h2 className="flex items-center">
            <img src="/block.png" alt="Website Logo" className="h-8" />
            Cheap Breakout
          </h2>
          <RiMessage2Fill
            className={`text-3xl cursor-pointer ${
              showFeedbackForm ? "text-red-600" : null
            }`}
            onClick={!showFeedbackForm && !ballMovement ? openFeedback : closeFeedback}
          />
        </header>

        <p className="w-3/5 mt-2">
          A cheap remake of Atari Breakout, a game with the goal of clearing all
          blocks without letting the ball hit the horizon. As the ball collides
          with the blocks, the block vanishes and the user earns points. The
          speed at which the ball moves can be adjusted by the difficulty
          setting. As a result, playing at a higher difficulty level allows the
          user to accumulate additional points. Additionally, players are given
          the option to use a laser, which can greatly assist their progress in
          the game, but it comes with the trade-off of earning fewer points.
          They can choose to enable or disable this option as they wish. Feel
          free to check out the source code @
        </p>
      </footer>
    </>
  );
}
