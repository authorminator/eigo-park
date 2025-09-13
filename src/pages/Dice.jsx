import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
// Use the official import form (no need for ESLint disables)
import { motion } from "motion/react";

// Keep constants outside the component
const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function Dice() {
  // If you want a fixed starting face, keep "⚀". If you want random-but-not-animated at start,
  // use: useState(() => DICE_FACES[Math.floor(Math.random() * 6)])
  const [diceFace, setDiceFace] = useState("🎲");
  const [isRolling, setIsRolling] = useState(false);
  // Placeholder if you want to add rolling state later

  const rollDice = () => {
    // Avoid repeating the same face consecutively (feels nicer)
    setIsRolling(true);
    let next = diceFace;
    while (next === diceFace) {
      next = DICE_FACES[Math.floor(Math.random() * 6)];
    }
    setDiceFace(next);
  };

  // Conditional animation: animate only when rolling

  const motionDiv = isRolling ? (
    <motion.div
      key={diceFace} // re-trigger animation on change
      className="text-9xl mb-4 leading-none"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1.5, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      role="img"
      aria-label={`Dice showing ${diceFace}`}
    >
      <span className="mx-4">{diceFace}</span>
    </motion.div>
  ) : (
    <motion.div
      key={diceFace}
      className="text-9xl mb-4 leading-none"
      role="img"
      aria-label={`Dice showing ${diceFace}`}
    >
      <span className="mx-4">{diceFace}</span>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-green-50 p-4">
      <BackButton />
      <h1 className="text-4xl font-bold my-6">Dice Game</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
        {motionDiv}

        <button
          type="button"
          onClick={rollDice}
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
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
