import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
// 1. Import motion from framer-motion
import { motion } from "framer-motion";

export default function Dice() {
  const [currentFace, setCurrentFace] = useState("⚀");
  // 2. Add a new state to track if the dice is rolling
  const [isRolling, setIsRolling] = useState(false);

  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    // This interval handles the "rapidly changing faces" effect
    let rollCount = 0;
    const maxRolls = 15; // How many times the face changes before stopping
    const interval = setInterval(() => {
      rollCount++;
      // Show a random face on each tick
      const randomFace = diceFaces[Math.floor(Math.random() * 6)];
      setCurrentFace(randomFace);

      if (rollCount >= maxRolls) {
        clearInterval(interval);

        // Set the final, true result
        const newDiceResult = diceFaces[Math.floor(Math.random() * 6)];
        setCurrentFace(newDiceResult);
        setIsRolling(false); // Animation is done
      }
    }, 100); // Change face every 100ms
  };

  // Set an initial dice face when the component first loads
  useEffect(() => {
    rollDice();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <BackButton />
      <h1 className="text-4xl font-bold mb-6">Dice Game</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
        {/* 3. Use the motion.div component to wrap the dice */}
        <motion.div
          className="text-9xl mb-4"
          // 4. Define the animations based on the 'isRolling' state
          animate={{
            rotate: isRolling ? [0, 360] : 0, // Spin 360 degrees while rolling
            scale: isRolling ? 1 : [1, 1.2, 1], // "Pop" effect when it stops
          }}
          // 5. Define the "how" of the animation
          transition={{
            rotate: {
              duration: 0.5,
              ease: "linear",
              repeat: isRolling ? Infinity : 0,
            },
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 10,
              duration: 0.4,
            },
          }}
        >
          <span className="mx-4">{currentFace}</span>
        </motion.div>
        <button
          onClick={rollDice}
          // 6. Disable the button during the animation
          disabled={isRolling}
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
        >
          {isRolling ? "Rolling..." : "Roll Dice"}
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
