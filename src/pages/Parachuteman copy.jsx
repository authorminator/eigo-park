import BackButton from "../components/BackButton";
import WordsModal from "../components/WordsModal";
import Switch from "../components/Switch";
import { useState, useEffect } from "react";

const MAX_WRONG = 6;

export default function Parachuteman() {
  const defaultWords = ["APPLE", "BANANA", "CARROT", "POTATO", "AVOCADO"];

  const [word, setWord] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const [showModal, setShowModal] = useState(false);

  const [allWords, setAllWords] = useState(() => {
    const saved = localStorage.getItem("allWords");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedWords, setSelectedWords] = useState(() => {
    const saved = localStorage.getItem("selectedWords");
    return saved ? JSON.parse(saved) : defaultWords;
  });

  const [isRevealing, setIsRevealing] = useState(false);
  const [showFirstLetter, setShowFirstLetter] = useState(() => {
    return localStorage.getItem("showFirstLetter") === "true";
  });

  const getRevealedLetters = (word, showFirst) => {
    let revealed = [];
    if (showFirst) revealed.push(word[0]);
    return [...new Set(revealed)];
  };

  // Save to localStorage whenever words change
  useEffect(() => {
    localStorage.setItem("allWords", JSON.stringify(allWords));
  }, [allWords]);

  useEffect(() => {
    localStorage.setItem("selectedWords", JSON.stringify(selectedWords));
  }, [selectedWords]);

  useEffect(() => {
    localStorage.setItem("showFirstLetter", showFirstLetter);
  }, [showFirstLetter]);

  const resetGame = () => {
    if (selectedWords.length === 0) {
      alert("No words selected. Please open Words Collection to add words.");
      return;
    }

    const randomWord =
      selectedWords[Math.floor(Math.random() * selectedWords.length)];

    // 👇 Add this logic to determine which letters to pre-reveal
    let revealed = [];
    if (showFirstLetter) revealed.push(randomWord[0]);
    revealed = [...new Set(revealed)]; // remove duplicates if first === last

    setWord(randomWord);
    setGuessed(revealed); // use revealed letters as initial guesses
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
    .map((l) =>
      guessed.includes(l) || gameStatus !== "playing" || isRevealing ? l : "_"
    )
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
        className="bg-blue-400 hover:bg-green-500 text-white px-4 py-2 rounded mb-4 cursor-pointer active:translate-y-1 transition-transform duration-150"
        onClick={() => {
          if (allWords.length === 0) {
            setAllWords(selectedWords); // initialize on first open
          }
          setShowModal(true);
        }}
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
            className={`w-10 h-10 rounded font-bold text-white cursor-pointer ${
              guessed.includes(letter) || wrongGuesses.includes(letter)
                ? "bg-gray-400 cursor-not-allowed"
                : isRevealing
                ? "bg-cyan-800"
                : "bg-blue-600 hover:bg-blue-700 active:translate-y-1 transition-transform duration-150"
            }`}
            onClick={() => (!isRevealing ? handleGuess(letter) : null)}
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

      <div className="flex justify-center items-center h-14">
        <div className="font-bold flex justify-center items-center bg-gray-300 p-2 rounded">
          <Switch
            initial={isRevealing}
            disabled={gameStatus !== "playing"}
            colorLeft="bg-yellow-500"
            colorRight="bg-yellow-700"
            onToggle={(val) =>
              gameStatus === "playing" ? setIsRevealing(val) : null
            }
          />
          <span className="ml-2 text-sm align-middle w-16">
            {isRevealing ? "Hide" : "Reveal"}
          </span>
        </div>
        <button
          className="w-28 m-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded cursor-pointer active:translate-y-1 transition-transform duration-150"
          onClick={resetGame}
        >
          Reset
        </button>

        <BackButton />
      </div>

      <div className="mt-4 font-bold flex justify-center items-center bg-gray-300 p-2 rounded w-68 mx-auto">
        <Switch
          initial={showFirstLetter}
          colorLeft="bg-blue-400"
          colorRight="bg-blue-600"
          onToggle={(val) => {
            const revealed = getRevealedLetters(word, val);
            setShowFirstLetter(val);
            setGuessed(revealed);
          }}
        />
        <span className="ml-2 text-sm align-middle">
          {showFirstLetter ? "Hide" : "Show"} the first letter
        </span>
      </div>

      {showModal && (
        <WordsModal
          closeModal={() => setShowModal(false)}
          allWords={allWords}
          selectedWords={selectedWords}
          setAllWords={setAllWords}
          setSelectedWords={(selected) => {
            setSelectedWords(selected);
            setTimeout(resetGame, 0);
          }}
        />
      )}
    </div>
  );
}
