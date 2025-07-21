import BackButton from "../components/BackButton";
import WordsModal from "../components/WordsModal";
import { useState, useEffect } from "react";

const MAX_WRONG = 6;

export default function Parachuteman() {
  const defaultWords = ["APPLE", "BANANA", "CARROT", "POTATO", "AVOCADO"];

  const [word, setWord] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const [showModal, setShowModal] = useState(false);
  const [allWords, setAllWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState(defaultWords);

  // const wordsList = selectedWords.length > 0 ? selectedWords : defaultWords;

  const resetGame = () => {
    if (selectedWords.length === 0) {
      alert("No words selected. Please open Words Collection to add words.");
      return;
    }

    const randomWord =
      selectedWords[Math.floor(Math.random() * selectedWords.length)];

    setWord(randomWord);
    setGuessed([]);
    setWrongGuesses([]);
    setGameStatus("playing");
  };

  useEffect(() => {
    resetGame();
  }, []);

  const handleGuess = (letter) => {
    if (gameStatus !== "playing") return;

    if (word.includes(letter)) {
      setGuessed((prev) => [...prev, letter]);
    } else {
      setWrongGuesses((prev) => [...prev, letter]);
    }
  };

  useEffect(() => {
    if (!word) return;

    const wordLetters = [...new Set(word.split(""))];
    if (wordLetters.every((l) => guessed.includes(l))) {
      setGameStatus("won");
    } else if (wrongGuesses.length >= MAX_WRONG) {
      setGameStatus("lost");
    }
  }, [guessed, wrongGuesses, word]);

  const displayWord = word
    .split("")
    .map((l) => (guessed.includes(l) || gameStatus !== "playing" ? l : "_"))
    .join(" ");

  return (
    <div className="min-h-screen bg-blue-50 text-center py-10 px-4 relative">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        🪂 Parachuteman Game
      </h1>
      <p className="text-gray-600 mb-6">
        Guess the word before the parachuteman hits the ground!
      </p>

      <button
        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        Words Collection
      </button>

      <div className="text-4xl tracking-widest font-mono bg-white p-4 mx-4 rounded shadow inline-block mb-6">
        {displayWord}
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto mb-6">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            className={`w-10 h-10 rounded font-bold text-white ${
              guessed.includes(letter) || wrongGuesses.includes(letter)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={() => handleGuess(letter)}
            disabled={guessed.includes(letter) || wrongGuesses.includes(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-6 mb-4">
        <div className="bg-red-100 text-red-700 p-4 rounded w-1/3">
          <p className="font-semibold">Incorrect Guesses:</p>
          <p>{wrongGuesses.join(", ") || "None"}</p>
          <p className="mt-1 text-sm">
            ({wrongGuesses.length} / {MAX_WRONG})
          </p>
        </div>
        <div className="bg-green-100 text-green-700 p-4 rounded w-1/3">
          <p className="font-semibold">Progress:</p>
          <p>
            {guessed.length} / {word.length} letters revealed
          </p>
        </div>
      </div>

      {gameStatus !== "playing" && (
        <div
          className={`p-4 rounded shadow-md max-w-md mx-auto mt-6 ${
            gameStatus === "won"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <h2 className="text-xl font-bold">
            {gameStatus === "won" ? "🎉 You Win!" : "💀 You Lost!"}
          </h2>
          <p className="mt-2">
            The word was: <span className="font-mono font-bold">{word}</span>
          </p>
        </div>
      )}
      <button
        className="m-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={resetGame}
      >
        Reset
      </button>

      <BackButton />

      {showModal && (
        <WordsModal
          closeModal={() => setShowModal(false)}
          allWords={allWords}
          selectedWords={selectedWords}
          setAllWords={setAllWords}
          setSelectedWords={(selected) => {
            setSelectedWords(selected);
            setTimeout(resetGame, 0); // trigger new game after words update
          }}
        />
      )}
    </div>
  );
}

// import BackButton from "../components/BackButton";
// import WordsModal from "../components/WordsModal";

// import { useState, useEffect } from "react";

// const WORDS = ["NETWORK", "JAVASCRIPT", "REACT", "PYTHON", "DATABASE"];
// const MAX_WRONG = 6;

// export default function App() {
//   const [word, setWord] = useState("");
//   const [guessed, setGuessed] = useState([]);
//   const [wrongGuesses, setWrongGuesses] = useState([]);
//   const [gameStatus, setGameStatus] = useState("playing");

//   const resetGame = () => {
//     const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
//     setWord(randomWord);
//     setGuessed([]);
//     setWrongGuesses([]);
//     setGameStatus("playing");
//   };

//   useEffect(() => {
//     resetGame();
//   }, []);

//   const handleGuess = (letter) => {
//     if (gameStatus !== "playing") return;

//     if (word.includes(letter)) {
//       setGuessed((prev) => [...prev, letter]);
//     } else {
//       setWrongGuesses((prev) => [...prev, letter]);
//     }
//   };

//   useEffect(() => {
//     if (!word) return; // prevent early evaluation

//     const wordLetters = [...new Set(word.split(""))];
//     if (wordLetters.every((l) => guessed.includes(l))) {
//       setGameStatus("won");
//     } else if (wrongGuesses.length >= MAX_WRONG) {
//       setGameStatus("lost");
//     }
//   }, [guessed, wrongGuesses, word]);

//   const displayWord = word
//     .split("")
//     .map((l) => (guessed.includes(l) || gameStatus !== "playing" ? l : "_"))
//     .join(" ");

//   return (
//     <div className="min-h-screen bg-blue-50 text-center py-10 px-4">
//       <h1 className="text-3xl font-bold text-blue-700 mb-2">
//         🪂 Parachuteman Game
//       </h1>
//       <p className="text-gray-600 mb-6">
//         Guess the word before the parachuteman hits the ground!
//       </p>

//       <div className="text-4xl tracking-widest font-mono bg-white p-4 rounded shadow inline-block mb-6">
//         {displayWord}
//       </div>

//       <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto mb-6">
//         {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
//           <button
//             key={letter}
//             className={`w-10 h-10 rounded font-bold text-white ${
//               guessed.includes(letter) || wrongGuesses.includes(letter)
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//             onClick={() => handleGuess(letter)}
//             disabled={guessed.includes(letter) || wrongGuesses.includes(letter)}
//           >
//             {letter}
//           </button>
//         ))}
//       </div>

//       <div className="flex justify-center gap-6 mb-4">
//         <div className="bg-red-100 text-red-700 p-4 rounded w-1/3">
//           <p className="font-semibold">Incorrect Guesses:</p>
//           <p>{wrongGuesses.join(", ") || "None"}</p>
//           <p className="mt-1 text-sm">
//             ({wrongGuesses.length} / {MAX_WRONG})
//           </p>
//         </div>
//         <div className="bg-green-100 text-green-700 p-4 rounded w-1/3">
//           <p className="font-semibold">Progress:</p>
//           <p>
//             {guessed.length} / {word.length} letters revealed
//           </p>
//         </div>
//       </div>

//       {gameStatus !== "playing" && (
//         <div
//           className={`p-4 rounded shadow-md max-w-md mx-auto mt-6 ${
//             gameStatus === "won"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           <h2 className="text-xl font-bold">
//             {gameStatus === "won" ? "🎉 You Win!" : "💀 You Lost!"}
//           </h2>
//           <p className="mt-2">
//             The word was: <span className="font-mono font-bold">{word}</span>
//           </p>
//           <button
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             onClick={resetGame}
//           >
//             Play Again
//           </button>
//         </div>
//       )}
//       <BackButton />
//     </div>
//   );
// }

// export default function Parachuteman() {
//   return (
//     <div className="p-6 text-center">
//       <h1 className="text-3xl font-bold mb-4">Parachuteman Game</h1>
//       <p className="mb-6">
//         This is the Parachuteman game screen. Game coming soon!
//       </p>
//       <BackButton />
//     </div>
//   );
// }
