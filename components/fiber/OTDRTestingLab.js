'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Settings, Download, Eye, Zap } from 'lucide-react'

export default function OTDRTestingLab() {
  const [isTesting, setIsTesting] = useState(false)
  const [currentTest, setCurrentTest] = useState(null)
  const [otdrSettings, setOtdrSettings] = useState({
    wavelength: '1550nm',
    pulseWidth: '10ns',
    range: '50km',
    resolution: '1m',
    averaging: '128'
  })
  const [traceData, setTraceData] = useState(null)
  const [testResults, setTestResults] = useState(null)

  const testScenarios = [
    {
      id: 'basic-test',
      name: 'Basic Fiber Test',
      description: 'Test a simple point-to-point fiber link',
      fiberLength: 2.5,
      events: [
        { distance: 0, type: 'connector', loss: 0.3 },
        { distance: 2.5, type: 'end', loss: 0.2 }
      ]
    },
    {
      id: 'multi-event',
      name: 'Multi-Event Network',
      description: 'Test a network with multiple splices and connectors',
      fiberLength: 15.2,
      events: [
        { distance: 0, type: 'connector', loss: 0.4 },
        { distance: 5.1, type: 'splice', loss: 0.1 },
        { distance: 10.3, type: 'connector', loss: 0.3 },
        { distance: 15.2, type: 'end', loss: 0.2 }
      ]
    },
    {
      id: 'fault-location',
      name: 'Fault Location',
      description: 'Locate a high-loss event in the fiber',
      fiberLength: 8.7,
      events: [
        { distance: 0, type: 'connector', loss: 0.3 },
        { distance: 3.2, type: 'fault', loss: 2.1 },
        { distance: 8.7, type: 'end', loss: 0.2 }
      ]
    }
  ]

  const startTest = (scenario) => {
    setCurrentTest(scenario)
    setIsTesting(true)
    setTraceData(null)
    setTestResults(null)
  }

  const stopTest = () => {
    setIsTesting(false)
  }

  const resetTest = () => {
    setIsTesting(false)
    setCurrentTest(null)
    setTraceData(null)
    setTestResults(null)
  }

  const updateSettings = (setting, value) => {
    setOtdrSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  useEffect(() => {
    if (isTesting && currentTest) {
      const timer = setTimeout(() => {
        // Generate simulated trace data
        const trace = generateTraceData(currentTest)
        setTraceData(trace)
        
        // Analyze trace and generate results
        const results = analyzeTrace(trace, currentTest)
        setTestResults(results)
        
        setIsTesting(false)
      }, 3000) // Simulate 3-second test time
      
      return () => clearTimeout(timer)
    }
  }, [isTesting, currentTest])

  const generateTraceData = (scenario) => {
    const points = []
    const totalDistance = scenario.fiberLength
    const numPoints = 1000
    
    for (let i = 0; i < numPoints; i++) {
      const distance = (i / numPoints) * totalDistance
      let power = -20 // Starting power
      
      // Add fiber attenuation (0.2 dB/km at 1550nm)
      power -= distance * 0.2
      
      // Add events
      scenario.events.forEach(event => {
        if (Math.abs(distance - event.distance) < 0.1) {
          power -= event.loss
        }
      })
      
      // Add noise
      power += (Math.random() - 0.5) * 0.5
      
      points.push({ distance, power })
    }
    
    return points
  }

  const analyzeTrace = (trace, scenario) => {
    const events = []
    let totalLoss = 0
    let fiberLoss = 0
    
    // Find events by looking for significant power drops
    for (let i = 1; i < trace.length; i++) {
      const powerDrop = trace[i-1].power - trace[i].power
      if (powerDrop > 0.5) { // Significant drop
        events.push({
          distance: trace[i].distance,
          loss: powerDrop,
          type: powerDrop > 1.0 ? 'fault' : 'event'
        })
        totalLoss += powerDrop
      }
    }
    
    // Calculate fiber loss
    fiberLoss = scenario.fiberLength * 0.2
    
    return {
      totalLoss: totalLoss.toFixed(2),
      fiberLoss: fiberLoss.toFixed(2),
      events: events,
      fiberLength: scenario.fiberLength,
      status: totalLoss < 1.0 ? 'good' : totalLoss < 2.0 ? 'fair' : 'poor'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'fair': return 'text-yellow-600'
      case 'poor': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getEventColor = (type) => {
    switch (type) {
      case 'fault': return 'text-red-600'
      case 'event': return 'text-yellow-600'
      default: return 'text-blue-600'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">OTDR Testing Virtual Lab</h2>
          <p className="text-gray-600">Practice OTDR operation, trace analysis, and fault location</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">OTDR Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Wavelength</label>
                  <select
                    value={otdrSettings.wavelength}
                    onChange={(e) => updateSettings('wavelength', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="1310nm">1310nm</option>
                    <option value="1550nm">1550nm</option>
                    <option value="1625nm">1625nm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pulse Width</label>
                  <select
                    value={otdrSettings.pulseWidth}
                    onChange={(e) => updateSettings('pulseWidth', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="5ns">5ns</option>
                    <option value="10ns">10ns</option>
                    <option value="20ns">20ns</option>
                    <option value="50ns">50ns</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Range</label>
                  <select
                    value={otdrSettings.range}
                    onChange={(e) => updateSettings('range', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="10km">10km</option>
                    <option value="25km">25km</option>
                    <option value="50km">50km</option>
                    <option value="100km">100km</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                  <select
                    value={otdrSettings.resolution}
                    onChange={(e) => updateSettings('resolution', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="0.5m">0.5m</option>
                    <option value="1m">1m</option>
                    <option value="2m">2m</option>
                    <option value="5m">5m</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Averaging</label>
                  <select
                    value={otdrSettings.averaging}
                    onChange={(e) => updateSettings('averaging', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="64">64</option>
                    <option value="128">128</option>
                    <option value="256">256</option>
                    <option value="512">512</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Test Scenarios</h3>
              <div className="space-y-2">
                {testScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => startTest(scenario)}
                    disabled={isTesting}
                    className="w-full text-left p-3 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-medium text-sm">{scenario.name}</div>
                    <div className="text-xs text-gray-600">{scenario.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Test Controls</h3>
              <div className="space-y-2">
                <button
                  onClick={stopTest}
                  disabled={!isTesting}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Test
                </button>
                <button
                  onClick={resetTest}
                  className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
                {traceData && (
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export Trace
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Display Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 rounded-lg p-6 min-h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">OTDR Display</h3>
                {isTesting && (
                  <div className="flex items-center text-yellow-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-2"></div>
                    Testing...
                  </div>
                )}
              </div>

              {/* OTDR Screen */}
              <div className="bg-black rounded-lg p-4 mb-4 min-h-[300px]">
                {!traceData ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">
                        {isTesting ? 'Acquiring trace...' : 'Select a test scenario to begin'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    {/* Trace Graph */}
                    <div className="h-48 border border-gray-700 rounded mb-4 relative">
                      <svg width="100%" height="100%" className="absolute inset-0">
                        {traceData.map((point, index) => {
                          if (index === 0) return null
                          const x1 = ((index - 1) / traceData.length) * 100
                          const y1 = 100 - ((point.power + 30) / 20) * 100
                          const x2 = (index / traceData.length) * 100
                          const y2 = 100 - ((traceData[index].power + 30) / 20) * 100
                          
                          return (
                            <line
                              key={index}
                              x1={`${x1}%`}
                              y1={`${Math.max(0, Math.min(100, y1))}%`}
                              x2={`${x2}%`}
                              y2={`${Math.max(0, Math.min(100, y2))}%`}
                              stroke="#3b82f6"
                              strokeWidth="1"
                            />
                          )
                        })}
                      </svg>
                      
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 text-xs text-gray-400">
                        <div>-10 dB</div>
                        <div className="mt-12">-20 dB</div>
                        <div className="mt-12">-30 dB</div>
                      </div>
                      
                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-0 right-0 text-xs text-gray-400 flex justify-between">
                        <div>0 km</div>
                        <div>{currentTest?.fiberLength ? (currentTest.fiberLength / 2).toFixed(1) : '0'} km</div>
                        <div>{currentTest?.fiberLength || '0'} km</div>
                      </div>
                    </div>
                    
                    {/* Trace Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>Wavelength: {otdrSettings.wavelength}</div>
                      <div>Pulse Width: {otdrSettings.pulseWidth}</div>
                      <div>Range: {otdrSettings.range}</div>
                      <div>Resolution: {otdrSettings.resolution}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Test Results */}
              {testResults && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Test Results</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Total Loss</p>
                      <p className="text-white font-medium">{testResults.totalLoss} dB</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Fiber Loss</p>
                      <p className="text-white font-medium">{testResults.fiberLoss} dB</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Fiber Length</p>
                      <p className="text-white font-medium">{testResults.fiberLength} km</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Status</p>
                      <p className={`font-medium ${getStatusColor(testResults.status)}`}>
                        {testResults.status.charAt(0).toUpperCase() + testResults.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  
                  {testResults.events.length > 0 && (
                    <div>
                      <h5 className="text-white font-medium mb-2">Detected Events</h5>
                      <div className="space-y-1">
                        {testResults.events.map((event, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">
                              {event.distance.toFixed(2)} km
                            </span>
                            <span className={`font-medium ${getEventColor(event.type)}`}>
                              {event.loss.toFixed(2)} dB ({event.type})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
