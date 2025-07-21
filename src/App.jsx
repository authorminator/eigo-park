import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Grade3 from "./pages/Grade3";
import Grade4 from "./pages/Grade4";
import Parachuteman from "./pages/Parachuteman";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grade3" element={<Grade3 />} />
      <Route path="/grade4" element={<Grade4 />} />
      <Route path="/parachuteman" element={<Parachuteman />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}
