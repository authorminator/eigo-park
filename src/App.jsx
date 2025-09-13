import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Grade3 from "./pages/Grade3";
import Grade4 from "./pages/Grade4";
import Parachuteman from "./pages/Parachuteman";
import Dice from "./pages/Dice";
import TicTacToe from "./pages/TicTacToe";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grade3" element={<Grade3 />} />
      <Route path="/grade4" element={<Grade4 />} />
      <Route path="/parachuteman" element={<Parachuteman />} />
      <Route path="/dice" element={<Dice />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}
