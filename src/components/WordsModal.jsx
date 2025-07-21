import { useState, useEffect, useRef } from "react";

export default function WordsModal({
  closeModal,
  allWords,
  setAllWords,
  selectedWords,
  setSelectedWords,
}) {
  const [newWord, setNewWord] = useState("");
  const [checkedWords, setCheckedWords] = useState(new Set(selectedWords));

  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const addWord = () => {
    const word = newWord.trim().toUpperCase();
    if (word && !allWords.includes(word)) {
      setAllWords((prev) => [...prev, word]);
      setCheckedWords((prev) => new Set([...prev, word]));
      setNewWord("");
    }
  };

  const toggleWord = (word) => {
    const updated = new Set(checkedWords);
    updated.has(word) ? updated.delete(word) : updated.add(word);
    setCheckedWords(updated);
  };

  const handleApply = () => {
    setSelectedWords(Array.from(checkedWords));
    closeModal();
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);

  // Handle Esc and Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Enter") {
        addWord();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [newWord, allWords]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setCheckedWords(new Set(selectedWords));
  }, [selectedWords]);

  useEffect(() => {
    if (allWords.length === 0 && selectedWords.length > 0) {
      setAllWords(selectedWords);
    }
  }, [allWords, selectedWords]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4">Words Collection</h2>

        <div className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            className="border px-3 py-2 w-full"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Add a new word"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={addWord}
          >
            Add
          </button>
        </div>

        <ul className="max-h-48 overflow-y-auto mb-4">
          {allWords.map((word) => (
            <li key={word} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checkedWords.has(word)}
                onChange={() => toggleWord(word)}
              />
              <span>{word}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between">
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Use Selected
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded
