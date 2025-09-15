'use client'

import { useState } from 'react'
import { 
  Play, 
  Lock, 
  CheckCircle, 
  Clock, 
  Users, 
  Star,
  BookOpen,
  Video,
  FileText,
  Award,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Target
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import VideoPlayer from '@/components/video/VideoPlayer'
import QuizComponent from '@/components/quiz/QuizComponent'

export default function CourseDetail({ course }) {
  const [selectedModule, setSelectedModule] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  const formatPrice = (price) => {
    if (typeof price === 'string') return price
    return `$${price}`
  }

  const getModuleIcon = (type) => {
    switch (type) {
      case 'video':
        return Video
      case 'quiz':
        return Award
      case 'exam':
        return FileText
      default:
        return BookOpen
    }
  }

  const getModuleStatus = (module) => {
    if (module.completed) return 'completed'
    if (module.locked) return 'locked'
    return 'available'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'locked':
        return Lock
      default:
        return Play
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'locked':
        return 'text-gray-400'
      default:
        return 'text-primary-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Course Info */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                  {course.category}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  {course.rating} ({course.studentsCount?.toLocaleString()} students)
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{course.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{course.curriculum?.length || 0}</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{course.studentsCount?.toLocaleString() || 0}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{course.rating || 0}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(course.price)}
                </div>
                {course.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">
                    {formatPrice(course.originalPrice)}
                  </div>
                )}
                <button className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>

            {/* Course Preview */}
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Course Preview
                </h3>
                <p className="text-gray-600">
                  Watch a sample lesson to see what you'll learn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Curriculum */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Course Curriculum
                </h2>
                <p className="text-gray-600">
                  {course.curriculum?.length || 0} modules • {course.duration} total
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {course.curriculum?.map((module, index) => {
                  const status = getModuleStatus(module)
                  const StatusIcon = getStatusIcon(status)
                  const ModuleIcon = getModuleIcon(module.type || 'video')
                  
                  return (
                    <div
                      key={module.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            status === 'completed' ? 'bg-green-100 text-green-600' :
                            status === 'locked' ? 'bg-gray-100 text-gray-400' :
                            'bg-primary-100 text-primary-600'
                          )}>
                            <ModuleIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {module.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {module.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {module.duration}
                              </span>
                              <span className="flex items-center">
                                <Video className="w-4 h-4 mr-1" />
                                {module.videos || 0} videos
                              </span>
                              <span className="flex items-center">
                                <Award className="w-4 h-4 mr-1" />
                                {module.questions || 0} questions
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className={cn("w-5 h-5", getStatusColor(status))} />
                          {status === 'available' && (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor */}
            {course.instructor && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Instructor
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary-600">
                      {course.instructor.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {course.instructor.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {course.instructor.bio || 'Industry Expert'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Course Features */}
            {course.features && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {course.requirements && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcomes */}
            {course.outcomes && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  What You'll Learn
                </h3>
                <ul className="space-y-2">
                  {course.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <Target className="w-4 h-4 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {isPlaying && selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedModule.title}
              </h3>
              <button
                onClick={() => setIsPlaying(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <VideoPlayer
                src={selectedModule.videoUrl || 'https://example.com/video.mp4'}
                title={selectedModule.title}
              />
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedModule.title} - Quiz
              </h3>
              <button
                onClick={() => setShowQuiz(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <QuizComponent
                questions={selectedModule.questions || []}
                onComplete={(score) => {
                  console.log('Quiz completed with score:', score)
                  setShowQuiz(false)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}




