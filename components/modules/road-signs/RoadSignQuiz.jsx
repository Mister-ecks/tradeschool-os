"use client";
import { useState, useEffect } from "react";

export default function RoadSignQuiz() {
  const [signs, setSigns] = useState([]);
  const [answers, setAnswers] = useState({});
  const [mode, setMode] = useState("quiz");
  const [loading, setLoading] = useState(true);

  // Helper function to get the correct image path
  const getImagePath = (imagePath) => {
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    const basePath = isGitHubPages ? '/tradeschool-os' : '';
    return `${basePath}${imagePath}`;
  };

  useEffect(() => {
    // Handle both GitHub Pages and local development
    // Check if we're on GitHub Pages by looking at the hostname
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    const basePath = isGitHubPages ? '/tradeschool-os' : '';

    console.log('Loading signs from:', `${basePath}/signs.json`);
    fetch(`${basePath}/signs.json`)
      .then((res) => {
        console.log('Fetch response status:', res.status, 'URL:', res.url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Signs loaded successfully:', data.length, 'signs');
        console.log('First 3 signs:', data.slice(0, 3));
        setSigns(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading signs:", error);
        console.error("Will try loading without basePath...");
        // Fallback: try without basePath
        fetch('/signs.json')
          .then((res) => res.json())
          .then((data) => {
            console.log('Fallback: Signs loaded:', data.length, 'signs');
            setSigns(data);
            setLoading(false);
          })
          .catch((fallbackError) => {
            console.error("Fallback also failed:", fallbackError);
            setLoading(false);
          });
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading signs...</div>;
  }

  if (signs.length === 0) {
    return <div className="p-8 text-center">No signs found</div>;
  }

  const score = signs.reduce((acc, sign, i) => {
    const userAnswer = answers[i];
    const correctAnswer = sign.quiz?.[0]?.answer;
    return userAnswer === correctAnswer ? acc + 1 : acc;
  }, 0);

  const handleRestart = () => {
    setAnswers({});
    setMode("quiz");
  };

  if (mode === "results") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Final Results</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">{score}</div>
            <div className="text-xl text-gray-600">out of {signs.length} correct</div>
            <div className="text-sm text-gray-500 mt-2">
              {Math.round((score / signs.length) * 100)}% accuracy
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.keys(answers).filter(i => answers[Number(i)] === signs[Number(i)].quiz?.[0]?.answer).length}
              </div>
              <div className="text-sm text-green-600">Correct</div>
            </div>
            <div className="text-center p-4 bg-red-100 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.keys(answers).filter(i => answers[Number(i)] !== signs[Number(i)].quiz?.[0]?.answer).length}
              </div>
              <div className="text-sm text-red-600">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{signs.length}</div>
              <div className="text-sm text-blue-600">Total</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {signs.map((sign, i) => {
              const userAnswer = answers[i];
              const correctAnswer = sign.quiz?.[0]?.answer;
              const isCorrect = userAnswer === correctAnswer;

              return (
                <div key={sign.id} className={`border rounded-lg p-4 ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{sign.name}</h3>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {sign.category}
                    </span>
                  </div>
                  <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src={getImagePath(sign.image)}
                      alt={sign.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.log('Image failed to load:', sign.image, 'Full path:', getImagePath(sign.image));
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', sign.image, 'Full path:', getImagePath(sign.image));
                      }}
                    />
                    <div className="hidden text-center text-gray-500 text-xs">
                      <div className="text-2xl mb-1">🚦</div>
                      <div>{sign.name}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{sign.meaning}</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Your Answer:</span> {userAnswer || "Unanswered"}</p>
                    <p><span className="font-medium">Correct Answer:</span> {correctAnswer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Road Signs Quiz</h2>
        <p className="text-gray-600 text-center mb-6">Answer all {signs.length} questions about road signs</p>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${(Object.keys(answers).length / signs.length) * 100}%` }}
          />
        </div>
        <div className="text-center text-sm text-gray-500 mb-6">
          {Object.keys(answers).length} of {signs.length} questions answered
        </div>
      </div>

      <div className="space-y-8">
        {signs.map((sign, signIndex) => {
          const isAnswered = answers[signIndex];
          const userAnswer = answers[signIndex];
          const correctAnswer = sign.quiz?.[0]?.answer;

          return (
            <div key={sign.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{sign.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {sign.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    Question {signIndex + 1}
                  </span>
                  {isAnswered && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      userAnswer === correctAnswer
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userAnswer === correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/4 flex justify-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src={getImagePath(sign.image)}
                      alt={sign.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.log('Image failed to load:', sign.image, 'Full path:', getImagePath(sign.image));
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', sign.image, 'Full path:', getImagePath(sign.image));
                      }}
                    />
                    <div className="hidden text-center text-gray-500">
                      <div className="text-2xl mb-1">🚦</div>
                      <div className="text-xs">{sign.name}</div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-3/4">
                  <p className="text-gray-600 mb-4">{sign.meaning}</p>

                  {sign.quiz?.[0] && (
                    <div>
                      <p className="font-medium mb-3">{sign.quiz[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {sign.quiz[0].options.map((option) => {
                          const isSelected = userAnswer === option;
                          const isCorrect = option === correctAnswer;

                          let buttonClass = "px-3 py-2 rounded-lg border text-left transition-colors text-sm ";

                          if (isAnswered) {
                            if (isSelected) {
                              buttonClass += isCorrect
                                ? "bg-green-200 border-green-500 text-green-800"
                                : "bg-red-200 border-red-500 text-red-800";
                            } else {
                              buttonClass += isCorrect
                                ? "bg-green-100 border-green-300 text-green-700"
                                : "bg-gray-100 border-gray-300 text-gray-600";
                            }
                          } else {
                            buttonClass += "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 cursor-pointer";
                          }

                          return (
                            <button
                              key={option}
                              onClick={() => setAnswers({ ...answers, [signIndex]: option })}
                              className={buttonClass}
                              disabled={isAnswered}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {Object.keys(answers).filter(i => answers[Number(i)] === signs[Number(i)].quiz?.[0]?.answer).length} / {signs.length}
            </div>
            <div className="text-sm text-gray-500">Correct Answers</div>
          </div>
          <button
            onClick={() => setMode("results")}
            disabled={Object.keys(answers).length < signs.length}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            View Detailed Results
          </button>
        </div>
      </div>
    </div>
  );
}