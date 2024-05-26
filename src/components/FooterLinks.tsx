import { RiMessage2Fill } from "react-icons/ri";
import { FaGithub, FaUser } from "react-icons/fa6";
import { useGameStore } from "../stateManagement/Store";

function FooterLinks() {
  const ballMovement = useGameStore((state) => state.ballMovement);
  const showFeedbackForm = useGameStore((state) => state.showFeedbackForm);
  const pauseGame = useGameStore((state) => state.pauseGame);
  const openFeedback = () => {
    useGameStore.setState({ showFeedbackForm: true });
  };
  const closeFeedback = () => {
    useGameStore.setState({ showFeedbackForm: false });
  };
  return (
    <div className=" flex max-ex-sm:gap-4 gap-10 text-3xl cursor-pointer">
      <a
        title="My Portfolio"
        target="_blank"
        href="https://steveng.vercel.app/"
      >
        <FaUser
          className="text-black  hover:text-blue-500"
          onClick={pauseGame}
        />
      </a>
      <a
        title="Github"
        target="_blank"
        href="https://github.com/sean5505/cheapBreakout"
      >
        <FaGithub
          className="text-black  hover:text-blue-500"
          onClick={pauseGame}
        />
      </a>
      <RiMessage2Fill
        className={` text-black hover:text-blue-500 ${
          showFeedbackForm ? "text-red-600" : null
        }`}
        title="Feedback"
        onClick={
          !showFeedbackForm && !ballMovement ? openFeedback : closeFeedback
        }
      />
    </div>
  );
}

export default FooterLinks;
