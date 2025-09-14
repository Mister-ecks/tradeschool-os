'use client'

import { useState, useEffect } from 'react'
import { QrCode, Search, Info, Wrench, AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react'
import { fiberToolsDatabase, toolCategories, getToolByBarcode } from '@/data/fiber-tools-database'

export default function FiberToolScanner() {
  const [scannedTool, setScannedTool] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showScanner, setShowScanner] = useState(false)
  const [filteredTools, setFilteredTools] = useState(fiberToolsDatabase)

  useEffect(() => {
    let filtered = fiberToolsDatabase

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.barcode.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredTools(filtered)
  }, [searchQuery, selectedCategory])

  const handleScan = (barcode) => {
    const tool = getToolByBarcode(barcode)
    if (tool) {
      setScannedTool(tool)
      setShowScanner(false)
    } else {
      alert('Tool not found in database')
    }
  }

  const simulateScan = (tool) => {
    setScannedTool(tool)
  }

  const getCategoryIcon = (categoryId) => {
    const category = toolCategories.find(cat => cat.id === categoryId)
    return category ? category.icon : '🔧'
  }

  const getCategoryColor = (categoryId) => {
    const category = toolCategories.find(cat => cat.id === categoryId)
    return category ? category.color : 'gray'
  }

  const getMaintenanceStatus = (tool) => {
    if (!tool.maintenance.nextService) return 'unknown'
    
    const today = new Date()
    const nextService = new Date(tool.maintenance.nextService)
    const daysUntilService = Math.ceil((nextService - today) / (1000 * 60 * 60 * 24))
    
    if (daysUntilService < 0) return 'overdue'
    if (daysUntilService < 30) return 'due-soon'
    return 'good'
  }

  const getMaintenanceColor = (status) => {
    switch (status) {
      case 'overdue': return 'text-red-600'
      case 'due-soon': return 'text-yellow-600'
      case 'good': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getMaintenanceIcon = (status) => {
    switch (status) {
      case 'overdue': return <AlertTriangle className="w-4 h-4" />
      case 'due-soon': return <Clock className="w-4 h-4" />
      case 'good': return <CheckCircle className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Fiber Optic Tool Scanner</h2>
          <p className="text-gray-600">Scan tools to access specifications, usage instructions, and maintenance information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Scanner Interface */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Tool Scanner</h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowScanner(!showScanner)}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  {showScanner ? 'Hide Scanner' : 'Open Scanner'}
                </button>

                {showScanner && (
                  <div className="bg-black rounded-lg p-4 text-center">
                    <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="text-gray-400 text-sm">Position QR code within frame</p>
                    <p className="text-gray-500 text-xs mt-1">Scanner simulation - click tools below to scan</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Search Tools</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name or barcode..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="all">All Categories</option>
                    {toolCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tool List */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Available Tools</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredTools.map((tool) => {
                  const maintenanceStatus = getMaintenanceStatus(tool)
                  return (
                    <div
                      key={tool.id}
                      onClick={() => simulateScan(tool)}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getCategoryIcon(tool.category)}</span>
                          <div>
                            <p className="font-medium text-sm">{tool.name}</p>
                            <p className="text-xs text-gray-600">{tool.barcode}</p>
                          </div>
                        </div>
                        <div className={`flex items-center ${getMaintenanceColor(maintenanceStatus)}`}>
                          {getMaintenanceIcon(maintenanceStatus)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Tool Details */}
          <div className="lg:col-span-2">
            {scannedTool ? (
              <div className="space-y-6">
                {/* Tool Header */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{getCategoryIcon(scannedTool.category)}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{scannedTool.name}</h3>
                        <p className="text-gray-600">Barcode: {scannedTool.barcode}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{scannedTool.location}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            scannedTool.status === 'available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {scannedTool.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {getMaintenanceIcon(getMaintenanceStatus(scannedTool))}
                        <span className={`text-sm font-medium ${getMaintenanceColor(getMaintenanceStatus(scannedTool))}`}>
                          {getMaintenanceStatus(scannedTool).replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Last used: {scannedTool.lastUsed}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(scannedTool.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Usage Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Usage Information</h4>
                  <p className="text-gray-700 mb-4">{scannedTool.usage}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Tutorials Available</h5>
                      <div className="space-y-1">
                        {scannedTool.tutorials.map((tutorial, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <Wrench className="w-4 h-4" />
                            <span>{tutorial}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maintenance Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Schedule</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Cleaning</p>
                      <p className="font-medium">{scannedTool.maintenance.cleaning}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Calibration</p>
                      <p className="font-medium">{scannedTool.maintenance.calibration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Service</p>
                      <p className="font-medium">{scannedTool.maintenance.service}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Last Service</p>
                      <p className="font-medium">{scannedTool.maintenance.lastService}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h5 className="font-medium text-gray-900 mb-2">Safety Guidelines</h5>
                    <ul className="space-y-1">
                      {scannedTool.safety.map((guideline, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Scan a tool to view details</p>
                  <p className="text-gray-400 text-sm mt-1">Use the scanner or click a tool from the list</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
