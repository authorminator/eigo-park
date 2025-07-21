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
      } else if (e.key === "Enter" && e.ctrlKey) {
        handleApply();
      } else if (e.key === "Enter") {
        addWord();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [newWord, allWords, checkedWords]);

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

  const deleteWord = (word) => {
    setAllWords((prev) => prev.filter((w) => w !== word));
    setCheckedWords((prev) => {
      const updated = new Set(prev);
      updated.delete(word);
      return updated;
    });
  };

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
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
            onClick={addWord}
          >
            Add
          </button>
        </div>

        <div className="flex justify-between items-center">
          <ul className="max-h-48 overflow-y-auto mb-4 pr-4">
            {allWords.map((word) => (
              <li
                key={word}
                className="flex items-center justify-between gap-2 pr-2"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteWord(word)}
                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                    title="Delete word"
                  >
                    ×
                  </button>
                  <input
                    type="checkbox"
                    checked={checkedWords.has(word)}
                    onChange={() => toggleWord(word)}
                  />
                  <span>{word}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-start gap-2">
            <p className="text-sm text-gray-500">
              Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to apply
            </p>
            <button
              onClick={handleApply}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Use Selected
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded
