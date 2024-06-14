import "./App.css";
import Controls from "./components/Controls";
import Difficulty from "./components/Difficulty";
import GameBoard from "./components/GameBoard";
import ToggleGame from "./components/Buttons/ToggleGame";
import GameStats from "./components/GameStats/AllGameStats";
import Footer from "./components/Footer";
import KeyboardEvents from "./components/KeyPressEvents";
import { useEffect, useState } from "react";


export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 480);
  };

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
            <div className="flex justify-center items-center mb-8 ">
              <Difficulty />
            </div>
            <div className="flex items-center justify-center gap-10">
              <GameStats />
              <GameBoard />
              <div className="hidden lg:block">
                <Controls />
              </div>
            </div>
            <ToggleGame />
          </>
        )}
        <Footer />
      </div>
      <KeyboardEvents />
    </>
  );
}
