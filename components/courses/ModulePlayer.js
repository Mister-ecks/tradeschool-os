'use client'

import { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Maximize,
  Settings,
  BookOpen,
  FileText,
  PenTool,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function ModulePlayer({ module, onComplete, onNext, onPrevious }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completedVideos, setCompletedVideos] = useState(new Set())
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const currentVideo = module.content.videos[currentVideoIndex]

  useEffect(() => {
    // Load saved progress
    const savedProgress = localStorage.getItem(`module-${module.id}-progress`)
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress)
      setCompletedVideos(new Set(progressData.completedVideos || []))
      setNotes(progressData.notes || '')
    }
  }, [module.id])

  useEffect(() => {
    // Save progress
    const progressData = {
      completedVideos: Array.from(completedVideos),
      notes,
      lastVideoIndex: currentVideoIndex
    }
    localStorage.setItem(`module-${module.id}-progress`, JSON.stringify(progressData))
  }, [completedVideos, notes, currentVideoIndex, module.id])

  const handleVideoComplete = () => {
    const newCompletedVideos = new Set(completedVideos)
    newCompletedVideos.add(currentVideoIndex)
    setCompletedVideos(newCompletedVideos)

    // Check if all videos are completed
    if (newCompletedVideos.size === module.content.videos.length) {
      if (onComplete) {
        onComplete()
      }
    }
  }

  const handleNextVideo = () => {
    if (currentVideoIndex < module.content.videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1)
      setProgress(0)
    } else if (onNext) {
      onNext()
    }
  }

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1)
      setProgress(0)
    } else if (onPrevious) {
      onPrevious()
    }
  }

  const handleProgress = (played) => {
    setProgress(played)
    setCurrentTime(played * duration)
    
    // Mark as completed when 95% watched
    if (played > 0.95 && !completedVideos.has(currentVideoIndex)) {
      handleVideoComplete()
    }
  }

  const handleDuration = (dur) => {
    setDuration(dur)
  }

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
    }
    return `${mm}:${ss}`
  }

  const getCompletionPercentage = () => {
    return Math.round((completedVideos.size / module.content.videos.length) * 100)
  }

  const isVideoCompleted = (index) => {
    return completedVideos.has(index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
              <p className="text-gray-600 mt-1">{module.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {completedVideos.size} / {module.content.videos.length} completed
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Video Player */}
              <div className="aspect-video bg-black relative">
                {currentVideo ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{currentVideo.title}</h3>
                      <p className="text-gray-300">Video Player Placeholder</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Duration: {currentVideo.duration}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p>No video selected</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Controls */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={handlePreviousVideo}
                      disabled={currentVideoIndex === 0}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleNextVideo}
                      disabled={currentVideoIndex === module.content.videos.length - 1}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>

                    <div className="text-sm text-gray-600">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowNotes(!showNotes)}
                      className="p-2 text-gray-600 hover:text-gray-900"
                    >
                      <PenTool className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                      <Settings className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Description */}
            {currentVideo && (
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentVideo.title}
                </h3>
                <p className="text-gray-600">{currentVideo.description}</p>
              </div>
            )}

            {/* Notes Section */}
            {showNotes && (
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <PenTool className="w-5 h-5 mr-2" />
                  My Notes
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes while watching..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Objectives */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Learning Objectives
              </h3>
              <ul className="space-y-2">
                {module.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            {/* Video Playlist */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Video Playlist
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {module.content.videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={cn(
                      "w-full p-4 text-left hover:bg-gray-50 transition-colors",
                      currentVideoIndex === index ? "bg-primary-50 border-r-4 border-primary-500" : ""
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            {isVideoCompleted(index) ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Play className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">
                              {video.title}
                            </h4>
                            <p className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {video.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                      {currentVideoIndex === index && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources */}
            {module.content.resources && module.content.resources.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Resources
                </h3>
                <div className="space-y-2">
                  {module.content.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-3 text-gray-400" />
                      {resource.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}







