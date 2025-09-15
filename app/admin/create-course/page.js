'use client'

import { useState } from 'react'
import { 
  Upload, 
  Video, 
  FileText, 
  Image, 
  X, 
  Plus,
  Save,
  ArrowLeft,
  Eye,
  Trash2
} from 'lucide-react'
import Link from 'next/link'

export default function CreateCoursePage() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    instructor: '',
    category: '',
    duration: '',
    difficulty: 'beginner',
    price: '',
    thumbnail: null,
    videos: []
  })

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCourseData(prev => ({
        ...prev,
        thumbnail: file
      }))
    }
  }

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files)
    setUploading(true)
    
    files.forEach((file, index) => {
      const videoData = {
        id: Date.now() + index,
        file: file,
        name: file.name,
        size: file.size,
        duration: '0:00', // Would be calculated in real app
        status: 'uploading',
        progress: 0
      }
      
      setCourseData(prev => ({
        ...prev,
        videos: [...prev.videos, videoData]
      }))

      // Simulate upload progress
      const interval = setInterval(() => {
        setCourseData(prev => ({
          ...prev,
          videos: prev.videos.map(video => 
            video.id === videoData.id 
              ? { ...video, progress: Math.min(video.progress + 10, 100) }
              : video
          )
        }))
      }, 200)

      setTimeout(() => {
        clearInterval(interval)
        setCourseData(prev => ({
          ...prev,
          videos: prev.videos.map(video => 
            video.id === videoData.id 
              ? { ...video, status: 'completed', progress: 100 }
              : video
          )
        }))
        setUploading(false)
      }, 2000)
    })
  }

  const removeVideo = (videoId) => {
    setCourseData(prev => ({
      ...prev,
      videos: prev.videos.filter(video => video.id !== videoId)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Course data:', courseData)
    // In a real app, this would save to the database
    alert('Course created successfully!')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin-demo" 
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
                <p className="text-gray-600 mt-1">Add course details and upload videos</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Eye className="w-4 h-4 mr-2 inline" />
                Preview
              </button>
              <button 
                onClick={handleSubmit}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Course
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter course title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructor *
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={courseData.instructor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter instructor name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={courseData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="hvac">HVAC</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="cdl">CDL Training</option>
                  <option value="safety">Safety</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={courseData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (hours)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={courseData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., 40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={courseData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description *
              </label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe what students will learn in this course"
                required
              />
            </div>
          </div>

          {/* Course Thumbnail */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Thumbnail</h2>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                {courseData.thumbnail ? (
                  <img 
                    src={URL.createObjectURL(courseData.thumbnail)} 
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Image className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                  <div className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Thumbnail
                  </div>
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Recommended: 1280x720px, JPG or PNG
                </p>
              </div>
            </div>
          </div>

          {/* Video Upload Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Videos</h2>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Upload Course Videos</h3>
                    <p className="text-gray-600">
                      Drag and drop video files here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supports MP4, MOV, AVI up to 2GB each
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center mx-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Select Videos
                  </button>
                </div>
              </label>
            </div>

            {/* Video List */}
            {courseData.videos.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Uploaded Videos</h3>
                {courseData.videos.map((video) => (
                  <div key={video.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{video.name}</h4>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(video.size)} • {video.duration}
                          </p>
                          {video.status === 'uploading' && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${video.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Uploading... {video.progress}%
                              </p>
                            </div>
                          )}
                          {video.status === 'completed' && (
                            <p className="text-xs text-green-600 mt-1">
                              ✓ Upload completed
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeVideo(video.id)}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Course Structure */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Structure</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Introduction to Course</h4>
                      <p className="text-sm text-gray-500">Overview and learning objectives</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm text-primary-600 hover:bg-primary-50 rounded">
                    Add Video
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Plus className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-500">Add New Lesson</h4>
                      <p className="text-sm text-gray-400">Click to add a new lesson to this course</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm text-primary-600 hover:bg-primary-50 rounded">
                    Add Lesson
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

