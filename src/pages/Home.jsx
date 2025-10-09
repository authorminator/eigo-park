import { Link } from "react-router-dom";
import GradeCard from "../components/GradeCard";
import GameCard from "../components/GameCard";
import Parachuteman from "./Parachuteman";
import games from "../data/games";
import eigoParkBg from "../assets/eigo-park-bg2-min.png";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-blue-100 overflow-hidden">
      {/* Background image occupying upper half */}
      <img
        src={eigoParkBg}
        alt="Eigo Park Background"
        className="absolute top-0 w-1/2 h-1/2
      object-cover pointer-events-none select-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
      <div className="relative z-10 p-6 w-full mt-30">
        <div className="flex justify-center gap-6 mb-10">
          <Link to="/grade3">
            <GradeCard title="Grade 3" />
          </Link>
          <Link to="/grade4">
            <GradeCard title="Grade 4" />
          </Link>
        </div>

        <div className="bg-blue-300 rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {games.map((game, index) =>
              game.path ? (
                <Link key={index} to={game.path}>
                  <GameCard title={game.name} isBold={true} />
                </Link>
              ) : (
                <Link key={index} to={"/coming-soon"}>
                  <GameCard title={game.name} />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
