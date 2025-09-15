"use client";
import { useState, useEffect } from "react";

export default function QuizSystem({ 
  questions = [], 
  onComplete, 
  showReview = true,
  allowRetake = true,
  passingScore = 80 
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Calculate score
  const score = questions.reduce((acc, question, index) => {
    const userAnswer = answers[index];
    const correctAnswer = question.correctAnswer || question.answer;
    return userAnswer === correctAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const passed = percentage >= passingScore;

  // Handle answer selection
  const handleAnswer = (questionIndex, selectedAnswer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedAnswer
    }));
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      setShowResults(true);
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Jump to specific question
  const handleJumpToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  // Restart quiz
  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    setShowResults(false);
    setQuizStarted(true);
  };

  // Complete quiz
  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        score,
        percentage,
        passed,
        answers,
        totalQuestions: questions.length
      });
    }
  };

  // Get question status
  const getQuestionStatus = (index) => {
    if (answers[index] !== undefined) {
      const correctAnswer = questions[index].correctAnswer || questions[index].answer;
      return answers[index] === correctAnswer ? 'correct' : 'incorrect';
    }
    return 'unanswered';
  };

  // Filter questions for review mode
  const getFilteredQuestions = (filter) => {
    switch (filter) {
      case 'incorrect':
        return questions.filter((_, index) => {
          const correctAnswer = questions[index].correctAnswer || questions[index].answer;
          return answers[index] !== undefined && answers[index] !== correctAnswer;
        });
      case 'unanswered':
        return questions.filter((_, index) => answers[index] === undefined);
      default:
        return questions;
    }
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Ready</h2>
          <p className="text-gray-600 mb-6">
            {questions.length} questions • {passingScore}% passing score
          </p>
          <button
            onClick={() => setQuizStarted(true)}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}%
            </div>
            <p className="text-xl text-gray-600 mb-4">
              {score} out of {questions.length} correct
            </p>
            <div className={`px-4 py-2 rounded-lg inline-block ${
              passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {passed ? 'PASSED' : 'FAILED'}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-green-700">Correct</div>
            </div>
            <div className="text-center p-4 bg-red-100 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {questions.length - score}
              </div>
              <div className="text-sm text-red-700">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {questions.filter((_, index) => answers[index] === undefined).length}
              </div>
              <div className="text-sm text-yellow-700">Unanswered</div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {showReview && (
              <button
                onClick={() => setShowResults(false)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Review Answers
              </button>
            )}
            {allowRetake && (
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Retake Quiz
              </button>
            )}
            <button
              onClick={handleComplete}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const userAnswer = answers[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleJumpToQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-500 text-white'
                    : getQuestionStatus(index) === 'correct'
                    ? 'bg-green-100 text-green-800'
                    : getQuestionStatus(index) === 'incorrect'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
          
          {question.image && (
            <div className="mb-4">
              <img
                src={question.image}
                alt="Question illustration"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = userAnswer === option;
              const isCorrect = option === (question.correctAnswer || question.answer);
              const showCorrectness = isComplete || userAnswer !== undefined;

              let buttonClass = "w-full p-4 text-left rounded-lg border transition-colors ";
              
              if (showCorrectness) {
                if (isSelected) {
                  buttonClass += isCorrect
                    ? "bg-green-100 border-green-500 text-green-800"
                    : "bg-red-100 border-red-500 text-red-800";
                } else if (isCorrect) {
                  buttonClass += "bg-green-50 border-green-300 text-green-700";
                } else {
                  buttonClass += "bg-gray-50 border-gray-300 text-gray-600";
                }
              } else {
                buttonClass += isSelected
                  ? "bg-blue-100 border-blue-500 text-blue-800"
                  : "bg-white border-gray-300 hover:bg-gray-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQuestion, option)}
                  className={buttonClass}
                  disabled={showCorrectness}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      isSelected ? 'border-current' : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-full h-full rounded-full bg-current" />
                      )}
                    </div>
                    {option}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={userAnswer === undefined}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

