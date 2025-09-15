"use client";
import { useState, useEffect } from "react";

export default function SignFlashcards() {
  const [signs, setSigns] = useState([]);
  const [progress, setProgress] = useState({}); // answers per sign
  const [current, setCurrent] = useState(0); // navigation index
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/signs.json")
      .then((res) => res.json())
      .then((data) => setSigns(data));
  }, []);

  if (signs.length === 0) {
    return <p className="text-center mt-10">Loading signs...</p>;
  }

  // Filter signs by category
  const filteredSigns = selectedCategory === "All" 
    ? signs 
    : signs.filter(sign => sign.category === selectedCategory);
  
  const activeList = reviewMode ? reviewList : filteredSigns;
  const currentSign = activeList[current];

  // Get unique categories for filter
  const categories = ["All", ...new Set(signs.map(sign => sign.category))];

  const handleAnswer = (signId, qIndex, option, correct) => {
    setProgress((prev) => ({
      ...prev,
      [signId]: {
        ...prev[signId],
        [qIndex]: option === correct ? "correct" : "wrong",
      },
    }));
  };

  // Progress stats (based on filtered signs)
  const totalQuestions = filteredSigns.reduce((sum, s) => sum + (s.quiz?.length || 0), 0);
  const answered = Object.values(progress).reduce(
    (sum, qset) => sum + Object.keys(qset).length,
    0
  );
  const correct = Object.values(progress).reduce(
    (sum, qset) =>
      sum +
      Object.values(qset).filter((status) => status === "correct").length,
    0
  );

  const enterReviewMode = () => {
    const wrongSigns = signs.filter((sign) =>
      sign.quiz?.some(
        (_, idx) => progress[sign.id]?.[idx] && progress[sign.id][idx] === "wrong"
      )
    );
    setReviewList(wrongSigns);
    setCurrent(0);
    setReviewMode(true);
  };

  const exitReviewMode = () => {
    setReviewMode(false);
    setCurrent(0);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-1">
          Progress: {correct}/{totalQuestions} correct ({answered}/{totalQuestions} answered)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${(correct / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrent(0);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          Showing {filteredSigns.length} signs in {selectedCategory} category
        </p>
      </div>

      {/* Flashcard */}
      <div className="rounded-xl shadow-md bg-white p-6 flex flex-col items-center">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {currentSign.category}
          </span>
        </div>
        <div className="w-40 h-40 mb-4 flex items-center justify-center bg-gray-100 rounded-lg">
          <img
            src={currentSign.image}
            alt={currentSign.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              console.log('Image failed to load:', currentSign.image);
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', currentSign.image);
            }}
          />
          <div className="hidden text-center text-gray-500 text-sm">
            <div className="text-4xl mb-2">🚦</div>
            <div>Sign Image</div>
            <div className="text-xs">{currentSign.name}</div>
          </div>
        </div>
        <h2 className="text-xl font-semibold">{currentSign.name}</h2>
        <p className="text-gray-600 text-sm mb-6">{currentSign.meaning}</p>

        {/* Quiz Section */}
        {currentSign.quiz?.map((q, idx) => (
          <div key={idx} className="w-full mb-4">
            <p className="font-medium text-sm mb-2">{q.question}</p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt) => {
                const userChoice = progress[currentSign.id]?.[idx];
                const isCorrect = opt === q.answer;

                return (
                  <button
                    key={opt}
                    onClick={() =>
                      handleAnswer(currentSign.id, idx, opt, q.answer)
                    }
                    className={`px-3 py-2 rounded-lg border text-sm text-left transition
                      ${
                        userChoice
                          ? isCorrect
                            ? "bg-green-200 border-green-500"
                            : opt === userChoice
                            ? "bg-red-200 border-red-500"
                            : "bg-gray-100"
                          : "bg-gray-50 hover:bg-blue-100"
                      }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6 items-center">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          ⬅ Previous
        </button>

        <span className="text-sm text-gray-600">
          {current + 1}/{activeList.length}
        </span>

        <button
          onClick={() =>
            setCurrent((c) => Math.min(activeList.length - 1, c + 1))
          }
          disabled={current === activeList.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center mt-6 gap-4">
        {!reviewMode ? (
          <button
            onClick={enterReviewMode}
            disabled={answered < totalQuestions}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50"
          >
            Enter Review Mode
          </button>
        ) : (
          <button
            onClick={exitReviewMode}
            className="px-5 py-2 bg-gray-700 text-white rounded-lg"
          >
            Exit Review Mode
          </button>
        )}
      </div>
    </div>
  );
}