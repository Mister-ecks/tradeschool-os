'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  Star,
  Play,
  CheckCircle,
  Target,
  Calendar,
  BarChart3,
  Trophy,
  Flame,
  Bookmark,
  Download,
  Share2,
  Settings,
  User,
  Bell,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedCourse, setExpandedCourse] = useState(null)

  // Mock data - in a real app, this would come from an API
  const userProgress = {
    totalCourses: 3,
    completedCourses: 1,
    inProgressCourses: 2,
    totalHours: 24,
    completedHours: 8,
    certificates: 1,
    currentStreak: 7,
    longestStreak: 15
  }

  const recentCourses = [
    {
      id: 1,
      title: 'HVAC Fundamentals',
      progress: 75,
      totalLessons: 32,
      completedLessons: 24,
      nextLesson: 'Heat Transfer Principles',
      estimatedTime: '2 hours remaining',
      lastAccessed: '2 hours ago',
      status: 'in-progress',
      thumbnail: '/courses/hvac-fundamentals.jpg'
    },
    {
      id: 2,
      title: 'CDL Safety Training',
      progress: 100,
      totalLessons: 20,
      completedLessons: 20,
      nextLesson: 'Complete',
      estimatedTime: 'Completed',
      lastAccessed: '1 day ago',
      status: 'completed',
      thumbnail: '/courses/cdl-safety.jpg'
    },
    {
      id: 3,
      title: 'Electrical Systems Basics',
      progress: 0,
      totalLessons: 28,
      completedLessons: 0,
      nextLesson: 'Introduction to Electrical Safety',
      estimatedTime: '28 hours',
      lastAccessed: 'Never',
      status: 'not-started',
      thumbnail: '/courses/electrical-basics.jpg'
    }
  ]

  const achievements = [
    {
      id: 1,
      title: 'First Course Complete',
      description: 'Completed your first course',
      icon: Trophy,
      earned: true,
      earnedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Study for 7 consecutive days',
      icon: Flame,
      earned: true,
      earnedDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Quiz Master',
      description: 'Score 90% or higher on 10 quizzes',
      icon: Target,
      earned: false,
      earnedDate: null
    },
    {
      id: 4,
      title: 'Speed Learner',
      description: 'Complete a course in under 2 weeks',
      icon: Clock,
      earned: false,
      earnedDate: null
    }
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'HVAC Module 3 Quiz',
      course: 'HVAC Fundamentals',
      dueDate: '2024-01-25',
      type: 'quiz',
      priority: 'high'
    },
    {
      id: 2,
      title: 'CDL Practice Exam',
      course: 'CDL Safety Training',
      dueDate: '2024-01-28',
      type: 'exam',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Electrical Safety Assignment',
      course: 'Electrical Systems Basics',
      dueDate: '2024-02-01',
      type: 'assignment',
      priority: 'low'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in-progress':
        return 'text-blue-600 bg-blue-100'
      case 'not-started':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's your learning progress.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-6 h-6" />
              </button>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Courses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProgress.completedCourses}/{userProgress.totalCourses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProgress.completedHours}/{userProgress.totalHours}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProgress.certificates}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Flame className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProgress.currentStreak} days
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Courses */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Courses</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentCourses.map((course) => (
                  <div key={course.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {course.completedLessons}/{course.totalLessons} lessons completed
                          </p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          getStatusColor(course.status)
                        )}>
                          {course.status.replace('-', ' ')}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={achievement.id}
                        className={cn(
                          "flex items-center space-x-3 p-4 rounded-lg border",
                          achievement.earned
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          achievement.earned
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className={cn(
                            "font-semibold",
                            achievement.earned ? "text-green-900" : "text-gray-500"
                          )}>
                            {achievement.title}
                          </h3>
                          <p className={cn(
                            "text-sm",
                            achievement.earned ? "text-green-700" : "text-gray-400"
                          )}>
                            {achievement.description}
                          </p>
                          {achievement.earned && (
                            <p className="text-xs text-green-600 mt-1">
                              Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-start space-x-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        deadline.priority === 'high' ? "bg-red-500" :
                        deadline.priority === 'medium' ? "bg-yellow-500" :
                        "bg-green-500"
                      )}></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {deadline.title}
                        </h4>
                        <p className="text-xs text-gray-600">{deadline.course}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Due {new Date(deadline.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Learning
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Courses
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Award className="w-4 h-4 mr-2" />
                    View Certificates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



