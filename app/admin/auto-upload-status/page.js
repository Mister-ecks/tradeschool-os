'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Upload, FolderOpen } from 'lucide-react'

export default function AutoUploadStatusPage() {
  const [status, setStatus] = useState('checking')
  const [processedImages, setProcessedImages] = useState([])

  useEffect(() => {
    checkStatus()
    // Check status every 5 seconds
    const interval = setInterval(checkStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/auto-upload-status')
      const data = await response.json()
      setStatus(data.status)
      setProcessedImages(data.images || [])
    } catch (error) {
      setStatus('error')
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'active':
        return 'Auto-upload system is running and ready!'
      case 'error':
        return 'Auto-upload system encountered an error'
      default:
        return 'Checking system status...'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Auto-Upload System Status
            </h1>
            <p className="text-gray-600">
              System automatically processes and organizes your road sign images
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              {getStatusIcon()}
              <h2 className="text-xl font-semibold text-gray-900">
                System Status
              </h2>
            </div>
            <p className="text-gray-700 mb-4">{getStatusMessage()}</p>
            
            {status === 'active' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Upload className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Ready for Images</span>
                </div>
                <p className="text-sm text-green-700">
                  Just drop your road sign images in the input folder and they'll be automatically processed!
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                How to Upload Images
              </h3>
              <ol className="text-sm text-blue-800 space-y-2">
                <li>1. Save your images to: <code className="bg-blue-100 px-2 py-1 rounded">public/signs/input/</code></li>
                <li>2. Name them descriptively (e.g., "stop sign.jpg")</li>
                <li>3. System automatically detects and processes them</li>
                <li>4. Images are renamed and organized by category</li>
                <li>5. They appear instantly in the road signs module</li>
              </ol>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                Supported Formats
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• PNG (recommended)</li>
                <li>• JPG/JPEG</li>
                <li>• GIF</li>
                <li>• WEBP</li>
                <li>• Max size: 10MB per image</li>
              </ul>
            </div>
          </div>

          {/* Processed Images */}
          {processedImages.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Recently Processed Images
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {processedImages.map((image, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-sm">{image.name}</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      → {image.category}/{image.newName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="/learning-platform/road-signs"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Road Signs Module
            </a>
            <a
              href="/admin/upload-signs"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Manual Upload Interface
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


