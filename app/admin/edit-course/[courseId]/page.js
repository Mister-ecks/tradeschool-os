'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
  Trash2,
  Edit,
  Play,
  Clock,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

// Mock course data - in a real app, this would come from an API
const allCourses = {
  '1': {
    id: '1',
    title: 'HVAC Fundamentals',
    description: 'Learn the basics of heating, ventilation, and air conditioning systems.',
    instructor: 'Mike Chen',
    category: 'hvac',
    duration: '40',
    difficulty: 'beginner',
    price: '299',
    thumbnail: null,
    modules: [
      {
        id: 1,
        name: 'Introduction to HVAC',
        description: 'Overview of HVAC systems and their components',
        videos: [
          {
            id: 1,
            name: 'What is HVAC?',
            duration: '15:30',
            size: '125MB',
            status: 'completed',
            url: '/videos/hvac-intro.mp4'
          },
          {
            id: 2,
            name: 'HVAC Components Overview',
            duration: '22:15',
            size: '180MB',
            status: 'completed',
            url: '/videos/hvac-components.mp4'
          }
        ]
      },
      {
        id: 2,
        name: 'Heating Systems',
        description: 'Understanding different types of heating systems',
        videos: [
          {
            id: 3,
            name: 'Furnace Types and Operation',
            duration: '18:45',
            size: '150MB',
            status: 'completed',
            url: '/videos/furnace-types.mp4'
          }
        ]
      },
      {
        id: 3,
        name: 'Cooling Systems',
        description: 'Air conditioning and refrigeration basics',
        videos: []
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Electrical Systems',
    description: 'Master electrical installation, maintenance, and safety protocols.',
    instructor: 'Sarah Johnson',
    category: 'electrical',
    duration: '60',
    difficulty: 'intermediate',
    price: '399',
    thumbnail: null,
    modules: [
      {
        id: 1,
        name: 'Electrical Safety',
        description: 'Safety protocols and protective equipment',
        videos: [
          {
            id: 1,
            name: 'Electrical Safety Basics',
            duration: '20:15',
            size: '160MB',
            status: 'completed',
            url: '/videos/electrical-safety.mp4'
          }
        ]
      },
      {
        id: 2,
        name: 'Wiring Techniques',
        description: 'Proper wiring methods and techniques',
        videos: []
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Plumbing Essentials',
    description: 'Learn plumbing installation, repair, and maintenance techniques.',
    instructor: 'David Wilson',
    category: 'plumbing',
    duration: '45',
    difficulty: 'beginner',
    price: '349',
    thumbnail: null,
    modules: [
      {
        id: 1,
        name: 'Pipe Systems',
        description: 'Understanding different pipe materials and systems',
        videos: []
      },
      {
        id: 2,
        name: 'Fixture Installation',
        description: 'Installing and maintaining plumbing fixtures',
        videos: []
      }
    ]
  },
  '4': {
    id: '4',
    title: 'CDL Training',
    description: 'Commercial Driver\'s License training and certification.',
    instructor: 'Robert Martinez',
    category: 'transportation',
    duration: '80',
    difficulty: 'intermediate',
    price: '599',
    thumbnail: null,
    modules: [
      {
        id: 1,
        name: 'Road Signs',
        description: 'Understanding traffic signs and signals',
        videos: []
      },
      {
        id: 2,
        name: 'Vehicle Inspection',
        description: 'Pre-trip and post-trip vehicle inspection',
        videos: []
      }
    ]
  },
  '5': {
    id: '5',
    title: 'Fiber Optics & OTDR',
    description: 'Advanced fiber optic installation and testing techniques.',
    instructor: 'Lisa Chen',
    category: 'telecommunications',
    duration: '50',
    difficulty: 'advanced',
    price: '799',
    thumbnail: null,
    modules: [
      {
        id: 1,
        name: 'Fiber Splicing',
        description: 'Fusion and mechanical splicing techniques',
        videos: []
      },
      {
        id: 2,
        name: 'OTDR Testing',
        description: 'Optical Time Domain Reflectometer testing',
        videos: []
      }
    ]
  }
}

export default function EditCoursePage() {
  const params = useParams()
  const courseId = params.courseId
  
  // Get course data directly from the allCourses object
  const currentCourse = allCourses[courseId] || {
    id: courseId,
    title: 'Course Not Found',
    description: 'This course does not exist.',
    instructor: 'Unknown',
    category: 'unknown',
    duration: '0',
    difficulty: 'beginner',
    price: '0',
    thumbnail: null,
    modules: []
  }
  
  const [courseData, setCourseData] = useState(currentCourse)
  const [activeModule, setActiveModule] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [showAddModule, setShowAddModule] = useState(false)
  const [newModuleName, setNewModuleName] = useState('')
  const [showCourseSelector, setShowCourseSelector] = useState(false)

  // Close course selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCourseSelector && !event.target.closest('.course-selector')) {
        setShowCourseSelector(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCourseSelector])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleModuleVideoUpload = (moduleId, e) => {
    const files = Array.from(e.target.files)
    setUploading(true)
    
    files.forEach((file, index) => {
      const videoData = {
        id: Date.now() + index,
        name: file.name,
        duration: '0:00', // Would be calculated in real app
        size: formatFileSize(file.size),
        status: 'uploading',
        url: null
      }
      
      setCourseData(prev => ({
        ...prev,
        modules: prev.modules.map(module => 
          module.id === moduleId 
            ? { ...module, videos: [...module.videos, videoData] }
            : module
        )
      }))

      // Simulate upload progress
      const interval = setInterval(() => {
        setCourseData(prev => ({
          ...prev,
          modules: prev.modules.map(module => 
            module.id === moduleId 
              ? {
                  ...module,
                  videos: module.videos.map(video => 
                    video.id === videoData.id 
                      ? { ...video, status: 'uploading' }
                      : video
                  )
                }
              : module
          )
        }))
      }, 200)

      setTimeout(() => {
        clearInterval(interval)
        setCourseData(prev => ({
          ...prev,
          modules: prev.modules.map(module => 
            module.id === moduleId 
              ? {
                  ...module,
                  videos: module.videos.map(video => 
                    video.id === videoData.id 
                      ? { ...video, status: 'completed', duration: '12:30' }
                      : video
                  )
                }
              : module
          )
        }))
        setUploading(false)
      }, 2000)
    })
  }

  const removeVideo = (moduleId, videoId) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { ...module, videos: module.videos.filter(video => video.id !== videoId) }
          : module
      )
    }))
  }

  const addNewModule = () => {
    if (newModuleName.trim()) {
      const newModule = {
        id: Date.now(),
        name: newModuleName,
        description: '',
        videos: []
      }
      
      setCourseData(prev => ({
        ...prev,
        modules: [...prev.modules, newModule]
      }))
      
      setNewModuleName('')
      setShowAddModule(false)
    }
  }

  const updateModule = (moduleId, field, value) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { ...module, [field]: value }
          : module
      )
    }))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getTotalVideos = () => {
    return courseData.modules.reduce((total, module) => total + module.videos.length, 0)
  }

  const getTotalDuration = () => {
    return courseData.modules.reduce((total, module) => {
      return total + module.videos.reduce((moduleTotal, video) => {
        const [minutes, seconds] = video.duration.split(':').map(Number)
        return moduleTotal + (minutes * 60 + seconds)
      }, 0)
    }, 0)
  }

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
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
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-gray-600">{courseData.title}</p>
                  <div className="relative course-selector">
                    <button
                      onClick={() => setShowCourseSelector(!showCourseSelector)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
                    >
                      Switch Course
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showCourseSelector && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-2">
                          <div className="text-xs font-medium text-gray-500 mb-2 px-2">Available Courses</div>
                          {Object.values(allCourses).map((course) => (
                            <a
                              key={course.id}
                              href={`/admin/edit-course/${course.id}`}
                              className={`block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 ${
                                course.id === courseId ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                              }`}
                            >
                              <div className="font-medium">{course.title}</div>
                              <div className="text-xs text-gray-500">{course.instructor} • {course.category}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {getTotalVideos()} videos • {formatDuration(getTotalDuration())}
                </div>
                <div className="text-xs text-gray-400">
                  {courseData.modules.length} modules
                </div>
              </div>
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Eye className="w-4 h-4 mr-2 inline" />
                Preview
              </button>
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Modules Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Course Modules</h2>
                  <button
                    onClick={() => setShowAddModule(true)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {courseData.modules.map((module) => (
                    <div
                      key={module.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        activeModule?.id === module.id
                          ? 'border-primary-200 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveModule(module)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{module.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {module.videos.length} videos
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">
                            {module.videos.length > 0 ? '✓' : '○'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {showAddModule && (
                    <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                      <input
                        type="text"
                        value={newModuleName}
                        onChange={(e) => setNewModuleName(e.target.value)}
                        placeholder="Module name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        autoFocus
                      />
                      <div className="flex items-center space-x-2 mt-3">
                        <button
                          onClick={addNewModule}
                          className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowAddModule(false)
                            setNewModuleName('')
                          }}
                          className="px-3 py-1 text-gray-600 text-sm rounded hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-2">
            {activeModule ? (
              <div className="space-y-6">
                {/* Module Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {activeModule.name}
                    </h2>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={activeModule.description}
                    onChange={(e) => updateModule(activeModule.id, 'description', e.target.value)}
                    placeholder="Module description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Video Upload Area */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Videos</h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) => handleModuleVideoUpload(activeModule.id, e)}
                        className="hidden"
                      />
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                          <Video className="w-8 h-8 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">Upload Videos to Module</h4>
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
                </div>

                {/* Videos List */}
                {activeModule.videos.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Videos</h3>
                    <div className="space-y-4">
                      {activeModule.videos.map((video) => (
                        <div key={video.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Video className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{video.name}</h4>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {video.duration}
                                  </span>
                                  <span>{video.size}</span>
                                  {video.status === 'completed' && (
                                    <span className="flex items-center text-green-600">
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Ready
                                    </span>
                                  )}
                                  {video.status === 'uploading' && (
                                    <span className="flex items-center text-blue-600">
                                      <Upload className="w-4 h-4 mr-1" />
                                      Uploading...
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Play className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeVideo(activeModule.id, video.id)}
                                className="p-2 text-red-400 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Module</h3>
                <p className="text-gray-500">
                  Choose a module from the sidebar to add or manage videos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}