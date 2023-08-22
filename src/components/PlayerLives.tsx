import { useGameStore } from "../stateManagement/Store";
import { FaHeart } from "react-icons/fa6";

export default function PlayerLives() {
  const playerLives = useGameStore((state) => state.playerLives);
  const livesDisplay = Array.from({ length: playerLives }, (_, index) => (
    <FaHeart className="text-red-600" key={index} />
  ));
  return (
    <div className="absolute text-2xl right-0 -top-10 flex gap-1">
      {livesDisplay}
    </div>
  );
}
