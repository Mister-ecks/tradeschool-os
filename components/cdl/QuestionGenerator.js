"use client";
import { useState } from "react";

export default function QuestionGenerator() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: ""
  });

  const handleAddQuestion = () => {
    if (currentQuestion.question && currentQuestion.correctAnswer) {
      setQuestions([...questions, { ...currentQuestion }]);
      setCurrentQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: ""
      });
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Question Generator</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Question</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Enter your question here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options
            </label>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={index}
                    checked={currentQuestion.correctAnswer === index.toString()}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Explanation (Optional)
            </label>
            <textarea
              value={currentQuestion.explanation}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="Explain why this is the correct answer..."
            />
          </div>

          <button
            onClick={handleAddQuestion}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Question
          </button>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Questions ({questions.length})</h2>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{question.question}</h3>
                <div className="space-y-1">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <span className={`w-4 h-4 rounded-full ${
                        optionIndex.toString() === question.correctAnswer 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                      }`}></span>
                      <span className={optionIndex.toString() === question.correctAnswer ? 'font-medium text-green-700' : ''}>
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
                {question.explanation && (
                  <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}