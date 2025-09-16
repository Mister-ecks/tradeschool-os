"use client";
import { useState, useEffect } from "react";
import { cdlCurriculum } from "@/data/cdl-curriculum";
import { vrArModules } from "@/data/vr-ar-modules";

export default function ComprehensiveDashboard() {
  const [user, setUser] = useState({
    name: "John Doe",
    role: "Student",
    progress: {
      cdl: 45,
      vrAr: 30,
      roadSigns: 80,
      yardTraining: 60
    },
    certificates: [
      { id: 1, name: "Road Signs Certification", date: "2024-01-15", status: "Completed" },
      { id: 2, name: "Air Brake Safety", date: "2024-01-20", status: "In Progress" }
    ],
    recentActivity: [
      { id: 1, action: "Completed Road Signs Quiz", module: "Road Signs", score: 85, date: "2024-01-15" },
      { id: 2, action: "Started CDL Day 2", module: "CDL Training", score: null, date: "2024-01-14" },
      { id: 3, action: "Completed Laptop Repair VR", module: "VR/AR Training", score: 92, date: "2024-01-13" }
    ]
  });

  const [selectedTab, setSelectedTab] = useState("overview");
  const [stats, setStats] = useState({
    totalModules: 12,
    completedModules: 4,
    averageScore: 78,
    timeSpent: "24 hours"
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBgColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Continue your learning journey</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Role: {user.role}</p>
              <p className="text-sm text-gray-500">Member since: Jan 2024</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", name: "Overview" },
                { id: "progress", name: "Progress" },
                { id: "modules", name: "Modules" },
                { id: "certificates", name: "Certificates" },
                { id: "activity", name: "Activity" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.completedModules}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.averageScore}%</div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.timeSpent}</div>
                    <div className="text-sm text-gray-600">Time Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{user.certificates.length}</div>
                    <div className="text-sm text-gray-600">Certificates</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
              <div className="space-y-4">
                {Object.entries(user.progress).map(([module, progress]) => (
                  <div key={module}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium capitalize">{module.replace(/([A-Z])/g, ' $1')}</span>
                      <span className={`text-sm font-medium ${getProgressColor(progress)}`}>
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressBgColor(progress)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "progress" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CDL Progress */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">CDL Training Progress</h2>
              <div className="space-y-4">
                {cdlCurriculum.modules.map((module, index) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{module.title}</h3>
                      <span className="text-sm text-gray-500">{module.duration}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{module.videos.length} videos</span>
                      <span>{module.quizzes.length} quizzes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VR/AR Progress */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">VR/AR Training Progress</h2>
              <div className="space-y-4">
                {vrArModules.modules.map((module) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{module.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {module.difficulty}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{module.tools.length} tools</span>
                      <span>{module.vrScenes.length} VR scenes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "modules" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CDL Modules */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">CDL Training</h2>
              <div className="space-y-3">
                {cdlCurriculum.modules.map((module) => (
                  <div key={module.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium text-sm">{module.title}</h3>
                    <p className="text-xs text-gray-600">{module.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* VR/AR Modules */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">VR/AR Training</h2>
              <div className="space-y-3">
                {vrArModules.modules.map((module) => (
                  <div key={module.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium text-sm">{module.title}</h3>
                    <p className="text-xs text-gray-600">{module.category}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Modules */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Other Training</h2>
              <div className="space-y-3">
                <div className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium text-sm">Road Signs Training</h3>
                  <p className="text-xs text-gray-600">50 Ontario road signs</p>
                </div>
                <div className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium text-sm">Yard Training</h3>
                  <p className="text-xs text-gray-600">Inspection checklist</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "certificates" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.certificates.map((cert) => (
                <div key={cert.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{cert.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cert.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Issued: {cert.date}</p>
                  <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                    View Certificate
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "activity" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {user.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {activity.score ? `${activity.score}%` : '▶'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{activity.action}</h3>
                    <p className="text-sm text-gray-600">{activity.module} • {activity.date}</p>
                  </div>
                  {activity.score && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.score >= 80 ? 'bg-green-100 text-green-800' :
                      activity.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.score >= 80 ? 'Passed' : activity.score >= 60 ? 'Good' : 'Needs Improvement'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


