import "./App.css";
import Controls from "./components/Controls";
import Difficulty from "./components/Difficulty";
import GameBoard from "./components/GameBoard";
import ToggleGame from "./components/Buttons/ToggleGame";
import GameStats from "./components/GameStats/GameStats";
import Footer from "./components/Footer";
import KeyboardEvents from "./components/KeyPressEvents";


export default function App() {
  
  return (
    <>
      <div className="flex flex-col justify-center   bg-gradient-to-r from-purple-700 to to-blue-600">
        <div className="flex justify-center items-center pb-8 ">
          <Difficulty />
          
        </div>
        <div className=" flex items-center justify-center gap-10">
          <GameStats />
          <GameBoard />
          <Controls />
        </div>
        <ToggleGame />
        <Footer />
      </div>
      <KeyboardEvents />
    </>
  );
}
