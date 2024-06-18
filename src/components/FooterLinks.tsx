import { FaGithub, FaUser } from "react-icons/fa6";
import { useGameStore } from "../stateManagement/Store";
import FeedbackForm from "./ModalContent/FeedbackForm";

function FooterLinks() {

  const pauseGame = useGameStore((state) => state.pauseGame);
  
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
      <FeedbackForm/>
    </div>
  );
}

export default FooterLinks;
