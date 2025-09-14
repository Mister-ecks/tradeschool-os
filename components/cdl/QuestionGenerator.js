'use client';

import { useState } from 'react';
import { getAllSigns, getSignsByCategory, generateSignQuestions, trainingScenarios } from '@/data/cdl-road-signs';

export default function QuestionGenerator() {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [questionType, setQuestionType] = useState('mixed');
  const [scenario, setScenario] = useState('');

  const generateQuestions = () => {
    let signs = [];
    
    if (scenario) {
      const selectedScenario = trainingScenarios.find(s => s.id === scenario);
      if (selectedScenario) {
        signs = selectedScenario.signs.map(signId => 
          getAllSigns().find(s => s.id === signId)
        ).filter(Boolean);
      }
    } else {
      signs = category === 'all' ? getAllSigns() : getSignsByCategory(category);
    }

    const questions = [];
    const shuffledSigns = signs.sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < Math.min(questionCount, shuffledSigns.length * 3); i++) {
      const sign = shuffledSigns[i % shuffledSigns.length];
      const signQuestions = generateSignQuestions(sign.id, difficulty);
      
      if (signQuestions.length > 0) {
        const randomQuestion = signQuestions[Math.floor(Math.random() * signQuestions.length)];
        questions.push({
          ...randomQuestion,
          sign: sign,
          questionNumber: i + 1
        });
      }
    }

    setGeneratedQuestions(questions);
  };

  const exportQuestions = () => {
    const exportData = {
      metadata: {
        category,
        difficulty,
        questionCount: generatedQuestions.length,
        generatedAt: new Date().toISOString()
      },
      questions: generatedQuestions
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cdl-questions-${category}-${difficulty}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const text = generatedQuestions.map((q, i) => 
      `${i + 1}. ${q.question}\n` +
      q.options.map((opt, idx) => `   ${String.fromCharCode(65 + idx)}. ${opt}`).join('\n') +
      `\n   Correct Answer: ${String.fromCharCode(65 + q.correct)}\n` +
      `   Explanation: ${q.explanation}\n\n`
    ).join('');
    
    navigator.clipboard.writeText(text);
    alert('Questions copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CDL Question Generator
          </h1>
          <p className="text-xl text-gray-600">
            Generate custom quizzes for CDL road sign training
          </p>
        </div>

        {/* Generator Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Question Generator Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Signs</option>
                <option value="regulatory">Regulatory</option>
                <option value="warning">Warning</option>
                <option value="mandatory">Mandatory</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Count
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scenario (Optional)
              </label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">No Scenario</option>
                {trainingScenarios.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={generateQuestions}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Questions
            </button>
            
            {generatedQuestions.length > 0 && (
              <>
                <button
                  onClick={exportQuestions}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Export JSON
                </button>
                
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Copy to Clipboard
                </button>
              </>
            )}
          </div>
        </div>

        {/* Generated Questions */}
        {generatedQuestions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Generated Questions ({generatedQuestions.length})
              </h2>
              <div className="text-sm text-gray-500">
                Category: {category} | Difficulty: {difficulty}
              </div>
            </div>

            <div className="space-y-8">
              {generatedQuestions.map((question, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Question {question.questionNumber}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {question.sign.name}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        question.sign.category === 'regulatory' ? 'bg-red-100 text-red-800' :
                        question.sign.category === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {question.sign.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
                  
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border-2 ${
                          optIndex === question.correct
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <span className="font-semibold mr-3">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        {option}
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Correct Answer:</span> {String.fromCharCode(65 + question.correct)}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      <span className="font-semibold">Explanation:</span> {question.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Scenarios Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Available Training Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingScenarios.map((scenario) => (
              <div key={scenario.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{scenario.title}</h3>
                <p className="text-gray-600 mb-3">{scenario.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    scenario.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    scenario.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {scenario.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">
                    {scenario.signs.length} signs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
