import { Link } from "react-router-dom";
import GradeCard from "../components/GradeCard";
import GameCard from "../components/GameCard";
import Parachuteman from "./Parachuteman";
import games from "../data/games";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Eigo App</h1>

      <div className="flex justify-center gap-6 mb-10">
        <Link to="/grade3">
          <GradeCard title="Grade 3" />
        </Link>
        <Link to="/grade4">
          <GradeCard title="Grade 4" />
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Games</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {games.map((game, index) =>
            game.path ? (
              <Link key={index} to={game.path}>
                <GameCard title={game.name} />
              </Link>
            ) : (
              <GameCard key={index} title={game.name} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
