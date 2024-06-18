import "./App.css";
import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";
import ToggleGame from "./components/Buttons/ToggleGame";
import GameStats from "./components/GameStats/AllGameStats";
import Footer from "./components/Footer";
import KeyboardEvents from "./components/KeyPressEvents";
import { useEffect, useState } from "react";
import { useGameStore } from "./stateManagement/Store";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 480);
  };
  const isDifficultySelected = useGameStore((state) => state.isDifficultySelected)

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center bg-gradient-to-r from-purple-700 to to-blue-600 max-ex-sm:h-screen">
        {isMobile ? ( // this is temporary, using this as a fix simply shows my inadequecy as a developer
          <p className="text-center">
            {" "}
            Sorry, this game is a web application that is currently compatible
            only with PC platforms.{" "}
          </p>
        ) : (
          <>
            <header className="text-center mt-4 text-xl ">
              <h1>Cheap Breakout</h1>
            </header>
            <div className="flex items-center justify-center gap-10 mt-14">
              <GameStats /> 
              <GameBoard />
              <div className="hidden lg:block">
                <Controls />
              </div>
            </div>
           {isDifficultySelected && <ToggleGame /> }
          </>
        )}

        <Footer />
      </div>
      {!isMobile && <KeyboardEvents /> } 
    </>
  );
}
