'use client'

import { useState } from 'react'
import { StudentDashboard } from '@/components/dashboard/StudentDashboard'
import { AdminDashboard } from '@/components/dashboard/AdminDashboard'
// No need for Button import

export default function DemoDashboardsPage() {
  const [activeDashboard, setActiveDashboard] = useState('student')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Demo</h1>
          <p className="text-gray-600 mb-4">See the difference between student and admin dashboards</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveDashboard('student')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeDashboard === 'student'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Student Dashboard
            </button>
            <button
              onClick={() => setActiveDashboard('admin')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeDashboard === 'admin'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="relative">
        {activeDashboard === 'student' ? <StudentDashboard /> : <AdminDashboard />}
      </div>
    </div>
  )
}
