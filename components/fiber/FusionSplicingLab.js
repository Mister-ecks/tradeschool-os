'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Settings, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export default function FusionSplicingLab() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [spliceQuality, setSpliceQuality] = useState(null)
  const [parameters, setParameters] = useState({
    arcPower: 50,
    arcTime: 1.0,
    preArcTime: 0.1,
    overlap: 15,
    cleaveAngle: 0.5,
    fiberType: 'single-mode'
  })
  const [fiberStatus, setFiberStatus] = useState({
    leftFiber: { prepared: false, cleaved: false, quality: 0 },
    rightFiber: { prepared: false, cleaved: false, quality: 0 }
  })
  const [spliceResult, setSpliceResult] = useState(null)

  const steps = [
    { id: 1, name: 'Fiber Preparation', description: 'Strip and clean fiber ends', duration: 2 },
    { id: 2, name: 'Fiber Cleaving', description: 'Create precise end faces', duration: 1 },
    { id: 3, name: 'Fiber Loading', description: 'Load fibers into splicer', duration: 1 },
    { id: 4, name: 'Alignment', description: 'Align fiber cores', duration: 1 },
    { id: 5, name: 'Fusion Process', description: 'Perform arc fusion', duration: 1 },
    { id: 6, name: 'Quality Check', description: 'Assess splice quality', duration: 1 }
  ]

  const startSplicing = () => {
    setIsRunning(true)
    setCurrentStep(0)
    setSpliceResult(null)
    setFiberStatus({
      leftFiber: { prepared: false, cleaved: false, quality: 0 },
      rightFiber: { prepared: false, cleaved: false, quality: 0 }
    })
  }

  const stopSplicing = () => {
    setIsRunning(false)
    setCurrentStep(0)
  }

  const resetSplicing = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setSpliceResult(null)
    setFiberStatus({
      leftFiber: { prepared: false, cleaved: false, quality: 0 },
      rightFiber: { prepared: false, cleaved: false, quality: 0 }
    })
  }

  const updateParameters = (param, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }))
  }

  useEffect(() => {
    if (isRunning && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1
          
          // Simulate fiber preparation
          if (nextStep === 1) {
            setFiberStatus(prev => ({
              leftFiber: { ...prev.leftFiber, prepared: true },
              rightFiber: { ...prev.rightFiber, prepared: true }
            }))
          }
          
          // Simulate fiber cleaving
          if (nextStep === 2) {
            setFiberStatus(prev => ({
              leftFiber: { ...prev.leftFiber, cleaved: true, quality: 85 + Math.random() * 10 },
              rightFiber: { ...prev.rightFiber, cleaved: true, quality: 85 + Math.random() * 10 }
            }))
          }
          
          // Simulate fusion process and quality check
          if (nextStep === 6) {
            const leftQuality = fiberStatus.leftFiber.quality || 90
            const rightQuality = fiberStatus.rightFiber.quality || 90
            const averageQuality = (leftQuality + rightQuality) / 2
            const spliceLoss = 0.01 + Math.random() * 0.05
            
            setSpliceResult({
              loss: spliceLoss.toFixed(3),
              quality: averageQuality,
              status: spliceLoss < 0.03 ? 'excellent' : spliceLoss < 0.05 ? 'good' : 'poor'
            })
            setIsRunning(false)
          }
          
          return nextStep
        })
      }, steps[currentStep]?.duration * 1000 || 2000)
      
      return () => clearTimeout(timer)
    }
  }, [isRunning, currentStep, steps, fiberStatus])

  const getQualityColor = (quality) => {
    if (quality >= 90) return 'text-green-600'
    if (quality >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'good':
        return <CheckCircle className="w-6 h-6 text-yellow-600" />
      case 'poor':
        return <XCircle className="w-6 h-6 text-red-600" />
      default:
        return <AlertTriangle className="w-6 h-6 text-gray-400" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Fusion Splicing Virtual Lab</h2>
          <p className="text-gray-600">Practice fusion splicing techniques with realistic equipment simulation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Splicing Controls</h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={startSplicing}
                    disabled={isRunning}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </button>
                  <button
                    onClick={stopSplicing}
                    disabled={!isRunning}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Stop
                  </button>
                </div>
                <button
                  onClick={resetSplicing}
                  className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>

            {/* Parameters */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Splicing Parameters</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arc Power: {parameters.arcPower}%
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="80"
                    value={parameters.arcPower}
                    onChange={(e) => updateParameters('arcPower', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arc Time: {parameters.arcTime}s
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={parameters.arcTime}
                    onChange={(e) => updateParameters('arcTime', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fiber Type
                  </label>
                  <select
                    value={parameters.fiberType}
                    onChange={(e) => updateParameters('fiberType', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="single-mode">Single Mode</option>
                    <option value="multimode">Multimode</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fiber Status */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Fiber Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Left Fiber:</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${fiberStatus.leftFiber.prepared ? 'text-green-600' : 'text-gray-400'}`}>
                      Prepared
                    </span>
                    <span className={`text-sm ${fiberStatus.leftFiber.cleaved ? 'text-green-600' : 'text-gray-400'}`}>
                      Cleaved
                    </span>
                    {fiberStatus.leftFiber.quality > 0 && (
                      <span className={`text-sm font-medium ${getQualityColor(fiberStatus.leftFiber.quality)}`}>
                        {fiberStatus.leftFiber.quality.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Right Fiber:</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${fiberStatus.rightFiber.prepared ? 'text-green-600' : 'text-gray-400'}`}>
                      Prepared
                    </span>
                    <span className={`text-sm ${fiberStatus.rightFiber.cleaved ? 'text-green-600' : 'text-gray-400'}`}>
                      Cleaved
                    </span>
                    {fiberStatus.rightFiber.quality > 0 && (
                      <span className={`text-sm font-medium ${getQualityColor(fiberStatus.rightFiber.quality)}`}>
                        {fiberStatus.rightFiber.quality.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Lab Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg p-6 min-h-[400px]">
              <h3 className="text-lg font-semibold text-white mb-4">Splicing Machine Interface</h3>
              
              {/* Current Step */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">
                    Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.name}
                  </span>
                  {isRunning && (
                    <div className="flex items-center text-yellow-400">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-2"></div>
                      Processing...
                    </div>
                  )}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-300 text-sm mt-2">{steps[currentStep]?.description}</p>
              </div>

              {/* Splicing Machine Visualization */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-center items-center space-x-8">
                  {/* Left Fiber */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full border-4 ${
                      fiberStatus.leftFiber.prepared ? 'border-green-500 bg-green-100' : 'border-gray-500 bg-gray-700'
                    } flex items-center justify-center`}>
                      <div className="w-8 h-1 bg-gray-600 rounded"></div>
                    </div>
                    <span className="text-white text-sm mt-2">Left Fiber</span>
                  </div>

                  {/* Splicing Area */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
                      {isRunning && currentStep >= 4 ? (
                        <div className="w-12 h-12 bg-blue-500 rounded-full animate-pulse"></div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-white text-sm mt-2">Splice Point</span>
                  </div>

                  {/* Right Fiber */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full border-4 ${
                      fiberStatus.rightFiber.prepared ? 'border-green-500 bg-green-100' : 'border-gray-500 bg-gray-700'
                    } flex items-center justify-center`}>
                      <div className="w-8 h-1 bg-gray-600 rounded"></div>
                    </div>
                    <span className="text-white text-sm mt-2">Right Fiber</span>
                  </div>
                </div>
              </div>

              {/* Splice Result */}
              {spliceResult && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Splice Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(spliceResult.status)}
                      <div>
                        <p className="text-white font-medium">Splice Loss</p>
                        <p className="text-gray-300">{spliceResult.loss} dB</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Q</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Quality</p>
                        <p className={`font-medium ${getQualityColor(spliceResult.quality)}`}>
                          {spliceResult.quality.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className={`text-sm font-medium ${
                      spliceResult.status === 'excellent' ? 'text-green-400' :
                      spliceResult.status === 'good' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      Status: {spliceResult.status.charAt(0).toUpperCase() + spliceResult.status.slice(1)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
