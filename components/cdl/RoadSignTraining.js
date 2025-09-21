"use client";
import { useState, useEffect } from "react";

export default function RoadSignTraining() {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentSign, setCurrentSign] = useState(0);

  useEffect(() => {
    const basePath = process.env.NODE_ENV === 'production' ? '/tradeschool-os' : '';
    fetch(`${basePath}/signs.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSigns(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading signs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading road signs...</div>;
  }

  const categories = ["All", ...new Set(signs.map(sign => sign.category))];
  const filteredSigns = selectedCategory === "All" 
    ? signs 
    : signs.filter(sign => sign.category === selectedCategory);

  const current = filteredSigns[currentSign];

  const handleNext = () => {
    setCurrentSign((prev) => (prev + 1) % filteredSigns.length);
  };

  const handlePrevious = () => {
    setCurrentSign((prev) => (prev - 1 + filteredSigns.length) % filteredSigns.length);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Road Sign Training</h1>
      
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentSign(0);
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

      {/* Sign Display */}
      {current && (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {current.category}
            </span>
          </div>
          
          <div className="w-64 h-64 mx-auto mb-6 bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src={`${process.env.NODE_ENV === 'production' ? '/tradeschool-os' : ''}${current.image}`}
              alt={current.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden text-center text-gray-500">
              <div className="text-4xl mb-2">🚦</div>
              <div className="text-sm">{current.name}</div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">{current.name}</h2>
          <p className="text-gray-600 text-lg mb-6">{current.meaning}</p>
          
          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handlePrevious}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              {currentSign + 1} of {filteredSigns.length}
            </span>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}