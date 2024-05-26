import FooterLinks from "./FooterLinks";
import GameDescription from "./GameDescription";
import Controls from "./Controls";

export default function Footer() {
  return (
    <>
      <footer
        data-testid="footer"
        className="  bg-gradient-to-r from-blue-600 to to-purple-700 mt-4 text-white border-2 border-black rounded-sm"
      >
        <header className="flex justify-around items-center border-black">
          <h2 className="flex items-center">
            <img src="/block.png" alt="Website Logo" className="h-8" />
            <p> Cheap Breakout</p>
          </h2>
          <FooterLinks /> {/*For readability, breaking code apart */}
        </header>
        <div className="flex items-center justify-around">
          <GameDescription />
          <div className="lg:hidden text-black max-ex-sm:hidden">
          <Controls />
          </div>
        </div>
      </footer>
    </>
  );
}
