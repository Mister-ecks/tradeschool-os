'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  QrCode, 
  Barcode, 
  CheckCircle, 
  AlertCircle,
  Download,
  Upload,
  Wrench,
  Smartphone,
  Laptop,
  Settings
} from 'lucide-react';

const BarcodeScanner = ({ studentId, lessonId }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [detectedTool, setDetectedTool] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Sample tool database - in production, this would come from the database
  const toolDatabase = [
    {
      id: 'tool-001',
      barcode: '123456789012',
      qrCode: 'QR-PHILLIPS-SCREWDRIVER',
      name: 'Phillips Screwdriver Set',
      description: 'Professional precision screwdriver set with multiple sizes',
      category: 'phone-repair',
      usage: 'Used for removing Phillips head screws in smartphones and tablets. Choose the appropriate size for the screw head.',
      safetyNotes: 'Always ensure the screwdriver fits snugly in the screw head to avoid stripping.',
      image: '/tools/phillips-screwdriver.jpg',
      relatedLessons: ['phone-screen-replacement', 'phone-disassembly'],
      specifications: {
        sizes: ['PH000', 'PH00', 'PH0', 'PH1', 'PH2'],
        material: 'Hardened Steel',
        handle: 'Anti-slip grip'
      }
    },
    {
      id: 'tool-002',
      barcode: '234567890123',
      qrCode: 'QR-PLASTIC-SPUDGER',
      name: 'Plastic Spudger Set',
      description: 'Non-conductive plastic tools for safe component separation',
      category: 'phone-repair',
      usage: 'Used to pry apart components without causing damage. Essential for separating screens from phone bodies.',
      safetyNotes: 'Never use metal tools on electronics. Plastic spudgers prevent short circuits.',
      image: '/tools/plastic-spudger.jpg',
      relatedLessons: ['phone-screen-replacement', 'laptop-disassembly'],
      specifications: {
        material: 'Non-conductive plastic',
        colors: ['Black', 'White'],
        tips: ['Flat', 'Pointed', 'Curved']
      }
    },
    {
      id: 'tool-003',
      barcode: '345678901234',
      qrCode: 'QR-SUCTION-CUPS',
      name: 'Suction Cup Set',
      description: 'Professional suction cups for screen removal',
      category: 'phone-repair',
      usage: 'Used to create grip when removing screens. Apply suction and gently pull to separate adhesive.',
      safetyNotes: 'Apply suction evenly to avoid cracking the screen. Use heat to soften adhesive first.',
      image: '/tools/suction-cups.jpg',
      relatedLessons: ['phone-screen-replacement', 'tablet-repair'],
      specifications: {
        sizes: ['Small', 'Medium', 'Large'],
        material: 'Silicone',
        grip: 'High-tack adhesive'
      }
    },
    {
      id: 'tool-004',
      barcode: '456789012345',
      qrCode: 'QR-PRECISION-TWEEZERS',
      name: 'Precision Tweezers',
      description: 'Anti-magnetic tweezers for handling small components',
      category: 'laptop-repair',
      usage: 'Used to handle small screws, connectors, and delicate components. Anti-magnetic to prevent damage.',
      safetyNotes: 'Always use anti-magnetic tweezers near electronic components to prevent damage.',
      image: '/tools/precision-tweezers.jpg',
      relatedLessons: ['laptop-ram-upgrade', 'phone-battery-replacement'],
      specifications: {
        tip: 'Fine point',
        material: 'Stainless steel',
        coating: 'Anti-magnetic'
      }
    },
    {
      id: 'tool-005',
      barcode: '567890123456',
      qrCode: 'QR-HEAT-GUN',
      name: 'Heat Gun',
      description: 'Variable temperature heat gun for adhesive removal',
      category: 'general',
      usage: 'Used to soften adhesives and thermal compounds. Essential for safe component removal.',
      safetyNotes: 'Use low heat settings and keep moving to avoid overheating components.',
      image: '/tools/heat-gun.jpg',
      relatedLessons: ['phone-screen-replacement', 'laptop-thermal-paste'],
      specifications: {
        temperature: '100°C - 600°C',
        airflow: 'Variable speed',
        nozzle: 'Focusing tip included'
      }
    }
  ];

  // Initialize camera
  const initializeCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      setIsScanning(true);
    } catch (error) {
      console.error('Camera error:', error);
      setCameraError('Unable to access camera. Please check permissions.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
    setScanResult(null);
  };

  // Simulate barcode/QR scanning (in production, use a real scanning library)
  const simulateScan = () => {
    const randomTool = toolDatabase[Math.floor(Math.random() * toolDatabase.length)];
    const scanType = Math.random() > 0.5 ? 'barcode' : 'qr';
    const code = scanType === 'barcode' ? randomTool.barcode : randomTool.qrCode;
    
    setScanResult({
      type: scanType,
      code: code,
      tool: randomTool,
      timestamp: new Date().toISOString()
    });
    
    setDetectedTool(randomTool);
    
    // Add to scan history
    setScanHistory(prev => [{
      id: Date.now(),
      type: scanType,
      code: code,
      tool: randomTool,
      timestamp: new Date().toISOString()
    }, ...prev.slice(0, 9)]); // Keep last 10 scans
  };

  // Manual code entry
  const handleManualEntry = (event) => {
    const code = event.target.value.trim();
    if (code.length > 0) {
      const tool = toolDatabase.find(t => 
        t.barcode === code || t.qrCode === code
      );
      
      if (tool) {
        const scanType = tool.barcode === code ? 'barcode' : 'qr';
        setScanResult({
          type: scanType,
          code: code,
          tool: tool,
          timestamp: new Date().toISOString()
        });
        setDetectedTool(tool);
      } else {
        setScanResult({
          type: 'unknown',
          code: code,
          tool: null,
          timestamp: new Date().toISOString()
        });
        setDetectedTool(null);
      }
    }
  };

  // Save scan result
  const saveScanResult = async () => {
    if (!detectedTool) return;
    
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          lessonId,
          module: 'tool-recognition',
          scanResult: {
            toolId: detectedTool.id,
            toolName: detectedTool.name,
            scanType: scanResult.type,
            code: scanResult.code,
            timestamp: scanResult.timestamp
          }
        }),
      });
      
      if (response.ok) {
        console.log('Scan result saved successfully');
      }
    } catch (error) {
      console.error('Error saving scan result:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Tool Recognition Scanner</h1>
              <p className="text-gray-600">Scan barcodes and QR codes to identify tools and learn proper usage</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download size={20} />
                History
              </button>
              <button
                onClick={saveScanResult}
                disabled={!detectedTool}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Upload size={20} />
                Save Result
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scanner Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera View */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Scanner</h2>
                <div className="flex gap-2">
                  {!isScanning ? (
                    <button
                      onClick={initializeCamera}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Camera size={20} />
                      Start Camera
                    </button>
                  ) : (
                    <button
                      onClick={stopCamera}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Camera size={20} />
                      Stop Camera
                    </button>
                  )}
                  <button
                    onClick={simulateScan}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <QrCode size={20} />
                    Test Scan
                  </button>
                </div>
              </div>

              {/* Camera Feed */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
                
                {/* Scanning Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-green-500 rounded-lg relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-green-500 text-sm font-medium bg-black bg-opacity-75 px-3 py-1 rounded">
                          Position code here
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Camera Error */}
                {cameraError && (
                  <div className="absolute inset-0 bg-red-900 bg-opacity-75 flex items-center justify-center">
                    <div className="text-center text-white">
                      <AlertCircle size={48} className="mx-auto mb-4" />
                      <p className="text-lg font-semibold">Camera Error</p>
                      <p className="text-sm opacity-75">{cameraError}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Manual Entry */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manual Code Entry
                </label>
                <input
                  type="text"
                  placeholder="Enter barcode or QR code manually..."
                  onChange={handleManualEntry}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Scan Result */}
            <AnimatePresence>
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {scanResult.type === 'unknown' ? (
                      <AlertCircle className="text-red-600" size={24} />
                    ) : (
                      <CheckCircle className="text-green-600" size={24} />
                    )}
                    <h2 className="text-xl font-semibold">
                      {scanResult.type === 'unknown' ? 'Code Not Recognized' : 'Tool Identified'}
                    </h2>
                  </div>

                  {scanResult.type === 'unknown' ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">
                        The code "{scanResult.code}" was not found in our tool database.
                      </p>
                      <p className="text-sm text-gray-500">
                        Please check the code or contact support to add this tool.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Wrench size={32} className="text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{detectedTool.name}</h3>
                          <p className="text-gray-600">{detectedTool.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              detectedTool.category === 'phone-repair' ? 'bg-blue-100 text-blue-800' :
                              detectedTool.category === 'laptop-repair' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {detectedTool.category.replace('-', ' ')}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              {scanResult.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Usage Instructions:</h4>
                          <p className="text-gray-700 text-sm">{detectedTool.usage}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Safety Notes:</h4>
                          <p className="text-gray-700 text-sm">{detectedTool.safetyNotes}</p>
                        </div>
                      </div>

                      {detectedTool.specifications && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(detectedTool.specifications).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600 capitalize">{key}:</span>
                                <span className="text-gray-900">{Array.isArray(value) ? value.join(', ') : value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Scan Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Scans:</span>
                  <span className="font-semibold">{scanHistory.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Successful:</span>
                  <span className="font-semibold text-green-600">
                    {scanHistory.filter(s => s.type !== 'unknown').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Unknown:</span>
                  <span className="font-semibold text-red-600">
                    {scanHistory.filter(s => s.type === 'unknown').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Tool Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Tool Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <Smartphone className="text-blue-600" size={20} />
                  <div>
                    <div className="font-medium">Phone Repair</div>
                    <div className="text-sm text-gray-500">
                      {toolDatabase.filter(t => t.category === 'phone-repair').length} tools
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <Laptop className="text-green-600" size={20} />
                  <div>
                    <div className="font-medium">Laptop Repair</div>
                    <div className="text-sm text-gray-500">
                      {toolDatabase.filter(t => t.category === 'laptop-repair').length} tools
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <Settings className="text-gray-600" size={20} />
                  <div>
                    <div className="font-medium">General Tools</div>
                    <div className="text-sm text-gray-500">
                      {toolDatabase.filter(t => t.category === 'general').length} tools
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scan History */}
            {showHistory && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Scans</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {scanHistory.length === 0 ? (
                    <p className="text-gray-500 text-sm">No scans yet</p>
                  ) : (
                    scanHistory.map((scan) => (
                      <div key={scan.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        {scan.type === 'unknown' ? (
                          <AlertCircle className="text-red-500" size={16} />
                        ) : (
                          <CheckCircle className="text-green-500" size={16} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {scan.tool?.name || 'Unknown Tool'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {scan.type.toUpperCase()} • {new Date(scan.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
