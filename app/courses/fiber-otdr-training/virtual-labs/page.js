'use client'

import { useState } from 'react'
import { Beaker, Wrench, Search, Settings } from 'lucide-react'
import FusionSplicingLab from '@/components/fiber/FusionSplicingLab'
import OTDRTestingLab from '@/components/fiber/OTDRTestingLab'
import FiberToolScanner from '@/components/fiber/FiberToolScanner'

export default function VirtualLabsPage() {
  const [activeLab, setActiveLab] = useState('splicing')

  const labs = [
    {
      id: 'splicing',
      name: 'Fusion Splicing Lab',
      description: 'Practice fusion splicing techniques with realistic equipment simulation',
      icon: Wrench,
      color: 'blue'
    },
    {
      id: 'otdr',
      name: 'OTDR Testing Lab',
      description: 'Learn OTDR operation, trace analysis, and fault location',
      icon: Beaker,
      color: 'green'
    },
    {
      id: 'scanner',
      name: 'Tool Scanner',
      description: 'Scan and learn about fiber optic tools and equipment',
      icon: Search,
      color: 'purple'
    }
  ]

  const renderActiveLab = () => {
    switch (activeLab) {
      case 'splicing':
        return <FusionSplicingLab />
      case 'otdr':
        return <OTDRTestingLab />
      case 'scanner':
        return <FiberToolScanner />
      default:
        return <FusionSplicingLab />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fiber Optic Virtual Labs</h1>
              <p className="text-gray-600 mt-2">Hands-on practice with realistic equipment simulation</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Settings className="w-4 h-4" />
              <span>Interactive Training Environment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Lab Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Select Virtual Lab</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {labs.map((lab) => {
                const Icon = lab.icon
                return (
                  <button
                    key={lab.id}
                    onClick={() => setActiveLab(lab.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      activeLab === lab.id
                        ? `border-${lab.color}-500 bg-${lab.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activeLab === lab.id ? `bg-${lab.color}-100` : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          activeLab === lab.id ? `text-${lab.color}-600` : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="text-left">
                        <h3 className={`font-medium ${
                          activeLab === lab.id ? `text-${lab.color}-900` : 'text-gray-900'
                        }`}>
                          {lab.name}
                        </h3>
                        <p className="text-sm text-gray-600">{lab.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Active Lab Content */}
        {renderActiveLab()}
      </div>
    </div>
  )
}
