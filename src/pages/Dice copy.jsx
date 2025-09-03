import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";

export default function Dice() {
  const [dice, setDice] = useState(1);
  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  const rollDice = () => {
    const newDice = diceFaces[Math.floor(Math.random() * 6)];
    setDice(newDice);
  };

  useEffect(() => {
    rollDice();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <BackButton />
      <h1 className="text-4xl font-bold mb-6">Dice Game</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
        <div className="text-9xl mb-4">
          <span className="mx-4">{dice}</span>
        </div>
        <button
          onClick={rollDice}
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Roll Dice
        </button>
      </div>
    </div>
  );
}

// Unicode includes symbols for all six faces of a standard die (⚀ ⚁ ⚂ ⚃ ⚄ ⚅). These are part of the Miscellaneous Symbols block:

// ⚀ → U+2680 DIE FACE-1

// ⚁ → U+2681 DIE FACE-2

// ⚂ → U+2682 DIE FACE-3

// ⚃ → U+2683 DIE FACE-4

// ⚄ → U+2684 DIE FACE-5

// ⚅ → U+2685 DIE FACE-6
