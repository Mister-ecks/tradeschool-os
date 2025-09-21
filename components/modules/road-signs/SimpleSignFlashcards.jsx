"use client";
import { useState, useEffect } from "react";

export default function SimpleSignFlashcards() {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching signs...");
    fetch(`${process.env.NODE_ENV === 'production' ? '/tradeschool-os' : ''}/signs.json`)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Signs loaded:", data.length);
        setSigns(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading signs:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading road signs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Signs</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Ontario Road Signs Training
      </h1>
      
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">
          Loaded {signs.length} road signs successfully!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signs.slice(0, 6).map((sign) => (
          <div
            key={sign.id}
            className="rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-400 text-sm">{sign.name}</span>
            </div>
            
            <h2 className="text-xl font-semibold text-center mb-2">{sign.name}</h2>
            <p className="text-gray-600 text-sm text-center mb-4 line-clamp-3">{sign.meaning}</p>
            
            <div className="text-xs text-gray-500">
              {sign.category} • {sign.quiz?.length || 0} questions
            </div>
          </div>
        ))}
      </div>

      {signs.length > 6 && (
        <div className="text-center mt-8">
          <p className="text-gray-500">
            Showing first 6 of {signs.length} signs
          </p>
        </div>
      )}
    </div>
  );
}


