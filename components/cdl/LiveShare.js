'use client';

import { useState, useEffect } from 'react';

export default function LiveShare({ trainingType = 'road-signs' }) {
  const [shareUrl, setShareUrl] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Generate a unique session ID
    const newSessionId = `cdl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    
    // Set the share URL
    const baseUrl = window.location.origin;
    setShareUrl(`${baseUrl}/courses/cdl-fundamentals/${trainingType}?session=${newSessionId}`);
  }, [trainingType]);

  const startLiveSession = () => {
    setIsLive(true);
    // In a real implementation, you would connect to a WebSocket or similar service
    // For now, we'll simulate with local storage
    localStorage.setItem(`live-session-${sessionId}`, JSON.stringify({
      id: sessionId,
      type: trainingType,
      startedAt: new Date().toISOString(),
      participants: [],
      isActive: true
    }));
  };

  const stopLiveSession = () => {
    setIsLive(false);
    localStorage.removeItem(`live-session-${sessionId}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generateQRCode = () => {
    // Simple QR code generation using a service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
    return qrUrl;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Live Training Session</h2>
        <p className="text-gray-600">
          Share your CDL training session with students or colleagues
        </p>
      </div>

      <div className="space-y-6">
        {/* Session Status */}
        <div className="flex items-center justify-center gap-4">
          <div className={`w-4 h-4 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="font-semibold">
            {isLive ? 'Live Session Active' : 'Session Not Started'}
          </span>
        </div>

        {/* Session Controls */}
        <div className="flex justify-center gap-4">
          {!isLive ? (
            <button
              onClick={startLiveSession}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Live Session
            </button>
          ) : (
            <button
              onClick={stopLiveSession}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Stop Session
            </button>
          )}
        </div>

        {/* Share URL */}
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        {/* QR Code */}
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            QR Code for Easy Access
          </label>
          <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
            <img
              src={generateQRCode()}
              alt="QR Code for sharing"
              className="w-48 h-48"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Scan this QR code to join the training session
          </p>
        </div>

        {/* Session Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Session Information</h3>
          <div className="space-y-1 text-sm text-blue-800">
            <div><strong>Session ID:</strong> {sessionId}</div>
            <div><strong>Training Type:</strong> {trainingType.replace('-', ' ').toUpperCase()}</div>
            <div><strong>Status:</strong> {isLive ? 'Active' : 'Inactive'}</div>
            {isLive && (
              <div><strong>Started:</strong> {new Date().toLocaleString()}</div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Live Session Features</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Real-time progress tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Synchronized quiz sessions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Instant feedback and scoring
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Mobile-friendly access
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Session recording and analytics
            </li>
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">How to Use</h3>
          <ol className="space-y-1 text-sm text-yellow-800">
            <li>1. Click "Start Live Session" to begin</li>
            <li>2. Share the link or QR code with participants</li>
            <li>3. Participants join using the shared link</li>
            <li>4. Conduct synchronized training activities</li>
            <li>5. Monitor progress and provide feedback</li>
            <li>6. Stop session when complete</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
