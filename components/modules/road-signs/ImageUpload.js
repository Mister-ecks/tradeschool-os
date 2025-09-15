'use client'

import { useState } from 'react'
import { Upload, X, Check } from 'lucide-react'

export default function ImageUpload({ onImageUpload, signId, currentImage }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = async (file) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setIsUploading(true)

    try {
      // Create FormData
      const formData = new FormData()
      formData.append('image', file)
      formData.append('signId', signId)

      // Upload to server
      const response = await fetch('/api/upload-sign-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      setUploadedImage(result.imageUrl)
      
      // Notify parent component
      if (onImageUpload) {
        onImageUpload(result.imageUrl, signId)
      }

    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileUpload(files[0])
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
    const file = e.target.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    if (onImageUpload) {
      onImageUpload(null, signId)
    }
  }

  const displayImage = uploadedImage || currentImage

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign Image</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload an official road sign image to replace the generated visual
        </p>
      </div>

      {displayImage ? (
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
            <img 
              src={displayImage} 
              alt={`Road sign ${signId}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-center">
            <p className="text-sm text-green-600 font-medium">
              <Check className="w-4 h-4 inline mr-1" />
              Image uploaded successfully
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`w-32 h-32 mx-auto border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById(`file-input-${signId}`).click()}
        >
          <input
            id={`file-input-${signId}`}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drop image here</p>
              <p className="text-xs text-gray-500">or click to browse</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Supported formats: JPG, PNG, GIF (max 5MB)
        </p>
      </div>
    </div>
  )
}

