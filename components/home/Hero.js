'use client'

import Link from 'next/link'
import { ArrowRight, Play, Wrench, Award, Users } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-hvac-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-hvac-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-trade-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Wrench className="w-4 h-4 mr-2" />
              HVAC Training Platform • Starting with Real-World Skills
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Master Skilled Trades with{' '}
              <span className="bg-gradient-to-r from-primary-600 to-hvac-600 bg-clip-text text-transparent">
                Hands-On Training
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Learn HVAC, electrical, plumbing, and more through our mobile-first platform. 
              Get access to equipment kits, video lessons, and real deployment training sites.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => {
                  console.log('Start HVAC Course button clicked!')
                  window.location.href = '/courses/hvac-fundamentals'
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start HVAC Course
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <button 
                onClick={() => {
                  console.log('Watch Demo button clicked!')
                  // In a real app, this would open a video modal
                  alert('Demo video would play here!')
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors shadow-lg hover:shadow-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-gray-900">2,847</div>
                <div className="text-sm text-gray-600">Students Enrolled</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">32</div>
                <div className="text-sm text-gray-600">Hours of Content</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                {/* Course Card */}
                <div className="bg-gradient-to-r from-primary-50 to-hvac-50 rounded-xl p-6 border border-primary-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">HVAC Fundamentals</h3>
                        <p className="text-sm text-gray-600">Module 1: Introduction</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary-600">85%</div>
                      <div className="w-16 h-2 bg-primary-200 rounded-full">
                        <div className="w-14 h-2 bg-primary-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>2.5 hours remaining</span>
                    <span>12 lessons</span>
                  </div>
                </div>

                {/* Quiz Card */}
                <div className="bg-gradient-to-r from-trade-50 to-primary-50 rounded-xl p-6 border border-trade-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-trade-600 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Safety Quiz</h3>
                        <p className="text-sm text-gray-600">PPE & LOTO Procedures</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-trade-600">15/20</div>
                      <div className="text-xs text-gray-500">questions</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>8 minutes left</span>
                    <span>75% passing</span>
                  </div>
                </div>

                {/* Equipment Card */}
                <div className="bg-gradient-to-r from-hvac-50 to-trade-50 rounded-xl p-6 border border-hvac-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-hvac-600 rounded-lg flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Equipment Kit</h3>
                        <p className="text-sm text-gray-600">HVAC Starter Tools</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-hvac-600">$299</div>
                      <div className="text-xs text-gray-500">value</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>QR-enabled tools</span>
                    <span>Free shipping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-trade-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-hvac-500 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}



