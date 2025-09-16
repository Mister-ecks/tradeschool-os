'use client'

import { useState } from 'react'
import { Upload, Check, AlertCircle, FolderOpen } from 'lucide-react'

export default function UploadSignsPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResults, setUploadResults] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadResults([])

    const formData = new FormData()
    Array.from(files).forEach(file => {
      formData.append('images', file)
    })

    try {
      const response = await fetch('/api/process-sign-images', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const results = await response.json()
      setUploadResults(results)

    } catch (error) {
      console.error('Upload error:', error)
      setUploadResults([{
        type: 'error',
        message: 'Failed to process images. Please try again.'
      }])
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Upload Road Sign Images
            </h1>
            <p className="text-gray-600">
              Upload your road sign images and I'll automatically rename and organize them
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInput}
              className="hidden"
              disabled={isUploading}
            />
            
            {isUploading ? (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-lg text-gray-600">Processing images...</p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <p className="text-xl text-gray-700 mb-2">
                    Drop your images here or click to browse
                  </p>
                  <p className="text-gray-500">
                    Supports PNG, JPG, GIF, WEBP formats
                  </p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Smart Processing:</strong>
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1 text-left">
                    <li>• Automatically detects sign type</li>
                    <li>• Renames to correct format</li>
                    <li>• Organizes by category</li>
                    <li>• Updates the system instantly</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {uploadResults.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Processing Results
              </h3>
              <div className="space-y-3">
                {uploadResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      result.type === 'success' 
                        ? 'bg-green-50 text-green-800' 
                        : result.type === 'error'
                        ? 'bg-red-50 text-red-800'
                        : 'bg-yellow-50 text-yellow-800'
                    }`}
                  >
                    {result.type === 'success' ? (
                      <Check className="w-5 h-5" />
                    ) : result.type === 'error' ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <div>
                      <p className="font-medium">{result.message}</p>
                      {result.details && (
                        <p className="text-sm opacity-75">{result.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              How It Works
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">1. Upload Images</h4>
                <p>Upload any road sign images with any filename</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">2. Smart Detection</h4>
                <p>AI analyzes the image to identify the sign type</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">3. Auto-Rename</h4>
                <p>Files are renamed to match the system format</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">4. Auto-Organize</h4>
                <p>Images are placed in the correct category folder</p>
              </div>
            </div>
          </div>

          {/* File Management */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Manual Upload Alternative
              </h3>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">
                You can also manually place images in the organized folders:
              </p>
              <code className="text-xs bg-white px-2 py-1 rounded">
                public/signs/regulatory/ | public/signs/warning/ | public/signs/guide/
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


