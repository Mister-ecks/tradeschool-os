'use client'

import { useState } from 'react'
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  Settings,
  UserPlus,
  FileText,
  Activity,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  // Mock data - in a real app, this would come from an API
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalCourses: 15,
    totalRevenue: 45680,
    completionRate: 87,
    newUsersThisMonth: 156,
    coursesInProgress: 8,
    pendingApprovals: 12
  }

  const recentUsers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      coursesCompleted: 3,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2024-01-10',
      coursesCreated: 2,
      lastActive: '1 hour ago'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      role: 'student',
      status: 'pending',
      joinDate: '2024-01-20',
      coursesCompleted: 0,
      lastActive: 'Never'
    },
    {
      id: 4,
      name: 'John Smith',
      email: 'john.smith@email.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      coursesCreated: 5,
      lastActive: '30 minutes ago'
    }
  ]

  const courses = [
    {
      id: 1,
      title: 'HVAC Fundamentals',
      instructor: 'Mike Chen',
      students: 234,
      completionRate: 89,
      status: 'active',
      revenue: 12500,
      createdDate: '2024-01-01'
    },
    {
      id: 2,
      title: 'CDL Safety Training',
      instructor: 'John Smith',
      students: 189,
      completionRate: 92,
      status: 'active',
      revenue: 9800,
      createdDate: '2024-01-05'
    },
    {
      id: 3,
      title: 'Electrical Systems Basics',
      instructor: 'Sarah Wilson',
      students: 156,
      completionRate: 78,
      status: 'draft',
      revenue: 0,
      createdDate: '2024-01-15'
    }
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: 'course',
      title: 'Advanced HVAC Techniques',
      instructor: 'Mike Chen',
      submittedDate: '2024-01-20',
      status: 'pending'
    },
    {
      id: 2,
      type: 'user',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      role: 'instructor',
      submittedDate: '2024-01-19',
      status: 'pending'
    }
  ]

  const filteredUsers = recentUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'inactive':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'text-purple-600 bg-purple-100'
      case 'instructor':
        return 'text-blue-600 bg-blue-100'
      case 'student':
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage users, courses, and system settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-6 h-6" />
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <UserPlus className="w-4 h-4 mr-2 inline" />
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+{stats.newUsersThisMonth} this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                <p className="text-xs text-blue-600">{stats.coursesInProgress} in progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                <p className="text-xs text-green-600">+3% from last month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Approvals */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                    {pendingApprovals.length} pending
                  </span>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {item.type === 'course' ? item.title : `${item.name} (${item.role})`}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.type === 'course' ? `Instructor: ${item.instructor}` : item.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            Submitted {new Date(item.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-lg hover:bg-green-200">
                          <CheckCircle className="w-4 h-4 mr-1 inline" />
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200">
                          <Trash2 className="w-4 h-4 mr-1 inline" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Roles</option>
                      <option value="student">Students</option>
                      <option value="instructor">Instructors</option>
                      <option value="admin">Admins</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                              getRoleColor(user.role)
                            )}>
                              {user.role}
                            </span>
                            <span className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                              getStatusColor(user.status)
                            )}>
                              {user.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <a 
                      key={course.id} 
                      href={`/admin/edit-course/${course.id}`}
                      className="border border-gray-200 rounded-lg p-4 block hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{course.title}</h4>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        )}>
                          {course.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Instructor: {course.instructor}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{course.students} students</span>
                        <span>{course.completionRate}% completion</span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-primary-600 h-1 rounded-full"
                            style={{ width: `${course.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </a>
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
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New User
                  </button>
                  <a 
                    href="/admin/create-course"
                    className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Create Course
                  </a>
                  <a 
                    href="/admin/edit-course/1"
                    className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Course
                  </a>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
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

export default AdminDashboard
