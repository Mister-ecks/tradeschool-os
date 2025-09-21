"use client";
import { useState, useEffect } from "react";

export default function RoadSignQuiz() {
  const [signs, setSigns] = useState([]);
  const [index, setIndex] = useState(0);
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

  const current = signs[index];

  const handleAnswer = (option) => {
    if (!answers[index]) {
      setAnswers({ ...answers, [index]: option });
    }
  };

  const handleNext = () => {
    if (index + 1 < signs.length) {
      setIndex(index + 1);
    } else {
      setMode("results");
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setAnswers({});
    setMode("quiz");
  };

  const score = signs.reduce((acc, sign, i) => {
    const userAnswer = answers[i];
    const correctAnswer = sign.quiz?.[0]?.answer;
    return userAnswer === correctAnswer ? acc + 1 : acc;
  }, 0);

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
              <div className="text-sm text-green-700">Correct</div>
            </div>
            <div className="text-center p-4 bg-red-100 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.keys(answers).filter(i => answers[Number(i)] !== signs[Number(i)].quiz?.[0]?.answer).length}
              </div>
              <div className="text-sm text-red-700">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {signs.length - Object.keys(answers).length}
              </div>
              <div className="text-sm text-yellow-700">Unanswered</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setMode("review")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Review Answers
          </button>
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

  if (mode === "review") {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Review Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {signs.map((sign, i) => {
            const userAnswer = answers[i];
            const correctAnswer = sign.quiz?.[0]?.answer;
            let borderColor = "border-gray-300";
            let bgColor = "bg-white";

            if (!userAnswer) {
              borderColor = "border-yellow-500";
              bgColor = "bg-yellow-50";
            } else if (userAnswer === correctAnswer) {
              borderColor = "border-green-500";
              bgColor = "bg-green-50";
            } else {
              borderColor = "border-red-500";
              bgColor = "bg-red-50";
            }

            return (
              <div key={i} className={`border-2 ${borderColor} ${bgColor} rounded-lg p-4`}>
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{current.name}</h2>
          <div className="text-sm text-gray-500">
            Question {index + 1} of {signs.length}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            {current.category}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2 mx-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((index + 1) / signs.length) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-500">
            {Math.round(((index + 1) / signs.length) * 100)}%
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={getImagePath(current.image)}
                alt={current.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.log('Image failed to load:', current.image, 'Full path:', getImagePath(current.image));
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', current.image, 'Full path:', getImagePath(current.image));
                }}
              />
              <div className="hidden text-center text-gray-500">
                <div className="text-4xl mb-2">🚦</div>
                <div className="text-sm">{current.name}</div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <p className="text-gray-600 mb-6 text-lg">{current.meaning}</p>
            
            {current.quiz?.[0] && (
              <div>
                <p className="font-medium mb-4 text-lg">{current.quiz[0].question}</p>
                <div className="grid grid-cols-1 gap-3">
                  {current.quiz[0].options.map((option) => {
                    const isSelected = answers[index] === option;
                    const isCorrect = option === current.quiz[0].answer;
                    const isAnswered = answers[index];
                    
                    let buttonClass = "px-4 py-3 rounded-lg border text-left transition-colors ";
                    
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
                      buttonClass += "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300";
                    }
                    
                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
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

        <div className="flex justify-between">
          <button
            onClick={handleNext}
            disabled={!answers[index]}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {index + 1 === signs.length ? "Finish Quiz" : "Next Question"}
          </button>
          <button
            onClick={() => setMode("review")}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Review Mode
          </button>
        </div>
      </div>
    </div>
  );
}