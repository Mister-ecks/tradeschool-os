'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Snowflake, 
  Zap, 
  Droplets, 
  Flame, 
  Building, 
  Sun, 
  Bot,
  Truck,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const trades = [
  { id: 'all', name: 'All Trades', icon: BookOpen },
  { id: 'hvac', name: 'HVAC', icon: Snowflake },
  { id: 'cdl', name: 'CDL', icon: Truck },
  { id: 'electrical', name: 'Electrical', icon: Zap },
  { id: 'plumbing', name: 'Plumbing', icon: Droplets },
  { id: 'welding', name: 'Welding', icon: Flame },
  { id: 'construction', name: 'Construction', icon: Building },
  { id: 'solar', name: 'Solar', icon: Sun },
  { id: 'robotics', name: 'Robotics', icon: Bot },
  { id: 'fiber', name: 'Fiber Optics', icon: Filter },
]

const courses = [
  {
    id: 'cdl-fundamentals',
    title: 'CDL Fundamentals: Commercial Driver Training',
    description: 'Complete commercial driver training program covering CDL requirements, vehicle operation, safety practices, and road test preparation.',
    trade: 'cdl',
    level: 'Beginner',
    duration: '26 hours',
    lessons: 40,
    students: 1250,
    rating: 4.8,
    price: 899,
    status: 'available',
    thumbnail: '/courses/cdl-fundamentals.jpg',
    instructor: 'Michael Rodriguez',
    features: ['Complete CDL Training', 'Practice Exams', 'Road Test Prep', 'Safety Focus']
  },
  {
    id: 'air-brake-certification',
    title: 'Air Brake Systems Certification',
    description: 'Comprehensive air brake training for commercial drivers. Learn air brake components, inspection procedures, and safety protocols.',
    trade: 'cdl',
    level: 'Intermediate',
    duration: '8 hours',
    lessons: 12,
    students: 890,
    rating: 4.9,
    price: 199,
    status: 'available',
    thumbnail: '/courses/air-brake-certification.jpg',
    instructor: 'Michael Rodriguez',
    features: ['Air Brake Components', 'Inspection Procedures', 'Safety Protocols', 'Certification Exam']
  },
  {
    id: 'hvac-fundamentals',
    title: 'Complete HVAC Technician Certification Course',
    description: 'Master HVAC systems from fundamentals to advanced troubleshooting. Get certified as an HVAC technician with hands-on training.',
    trade: 'hvac',
    level: 'Beginner to Advanced',
    duration: '32 hours',
    lessons: 32,
    students: 2847,
    rating: 4.9,
    price: 299,
    originalPrice: 499,
    status: 'available',
    thumbnail: '/courses/hvac-fundamentals.jpg',
    instructor: 'James Wilson',
    features: ['EPA 608 Certification', 'NATE Ready', 'Hands-on Labs', 'Equipment Kit']
  },
  {
    id: 'hvac-installation',
    title: 'HVAC Installation & Maintenance',
    description: 'Learn professional installation techniques and maintenance procedures for residential and commercial HVAC systems.',
    trade: 'hvac',
    level: 'Intermediate',
    duration: '60 hours',
    lessons: 18,
    students: 1520,
    rating: 4.9,
    price: 449,
    originalPrice: 599,
    status: 'available',
    thumbnail: '/courses/hvac-installation.jpg',
    instructor: 'Sarah Johnson',
    features: ['Installation Techniques', 'Maintenance Procedures', 'Commercial Systems', 'Energy Efficiency']
  },
  {
    id: 'hvac-advanced',
    title: 'Advanced HVAC Systems',
    description: 'Master complex HVAC systems including VRF, chiller systems, and building automation controls.',
    trade: 'hvac',
    level: 'Advanced',
    duration: '80 hours',
    lessons: 24,
    students: 890,
    rating: 4.7,
    price: 649,
    originalPrice: 899,
    status: 'available',
    thumbnail: '/courses/hvac-advanced.jpg',
    instructor: 'Mike Rodriguez',
    features: ['VRF Systems', 'Building Automation', 'Chiller Operations', 'Advanced Diagnostics']
  },
  {
    id: 'electrical-basics',
    title: 'Electrical Systems Fundamentals',
    description: 'Learn residential and commercial electrical systems, wiring, and safety procedures.',
    trade: 'electrical',
    level: 'Beginner',
    duration: '28 hours',
    lessons: 20,
    students: 0,
    rating: 0,
    price: 0,
    status: 'coming-soon',
    thumbnail: '/courses/electrical-basics.jpg',
    instructor: 'TBA',
    features: ['NEC Code Training', 'Safety Protocols', 'Troubleshooting', 'Smart Home Integration']
  },
  {
    id: 'plumbing-fundamentals',
    title: 'Plumbing Systems & Water Management',
    description: 'Master plumbing installation, repair, and maintenance for residential and commercial applications.',
    trade: 'plumbing',
    level: 'Beginner',
    duration: '24 hours',
    lessons: 16,
    students: 0,
    rating: 0,
    price: 0,
    status: 'coming-soon',
    thumbnail: '/courses/plumbing-fundamentals.jpg',
    instructor: 'TBA',
    features: ['Code Compliance', 'Pipe Installation', 'Fixture Repair', 'Water Treatment']
  },
  {
    id: 'fiber-otdr-training',
    title: 'Fiber & OTDR Training Program',
    description: 'Master fiber optic splicing, OTDR testing, and network installation with virtual labs and industry certification prep.',
    trade: 'fiber',
    level: 'Intermediate',
    duration: '32 hours',
    lessons: 48,
    students: 2150,
    rating: 4.9,
    price: 1299,
    status: 'available',
    thumbnail: '/courses/fiber-otdr-training.jpg',
    instructor: 'Sarah Chen',
    features: ['Virtual Fusion Splicing Lab', 'Interactive OTDR Testing', 'Tool Scanning System', 'Industry Certification Prep']
  }
]

const getTradeIcon = (tradeId) => {
  const trade = trades.find(t => t.id === tradeId)
  return trade ? trade.icon : BookOpen
}

const getTradeColor = (tradeId) => {
  const colors = {
    hvac: 'hvac',
    cdl: 'trade',
    electrical: 'primary',
    plumbing: 'primary',
    welding: 'trade',
    construction: 'trade',
    solar: 'hvac',
    robotics: 'primary',
    fiber: 'purple'
  }
  return colors[tradeId] || 'primary'
}

const getStatusBadge = (status) => {
  if (status === 'coming-soon') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Coming Soon
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      Available
    </span>
  )
}

export default function Courses() {
  const [selectedTrade, setSelectedTrade] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCourses = courses.filter(course => {
    const matchesTrade = selectedTrade === 'all' || course.trade === selectedTrade
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTrade && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master skilled trades with our comprehensive training programs. 
            Learn from industry experts with hands-on equipment and real-world projects.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Trade Filters */}
          <div className="flex flex-wrap gap-2">
            {trades.map((trade) => {
              const Icon = trade.icon
              return (
                <button
                  key={trade.id}
                  onClick={() => setSelectedTrade(trade.id)}
                  className={cn(
                    'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    selectedTrade === trade.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {trade.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const Icon = getTradeIcon(course.trade)
            const colorClass = getTradeColor(course.trade)
            
            return (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(course.status)}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-${colorClass}-100 text-${colorClass}-700`}>
                      <Icon className="w-3 h-3 mr-1" />
                      {course.trade.toUpperCase()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {course.rating > 0 ? course.rating : 'N/A'}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {course.students.toLocaleString()} students
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      {course.level}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {course.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                        >
                          {feature}
                        </span>
                      ))}
                      {course.features.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          +{course.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      {course.price > 0 ? (
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-gray-900">
                            ${course.price}
                          </span>
                          {course.originalPrice && course.originalPrice > course.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${course.originalPrice}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-lg font-semibold text-gray-500">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    {course.status === 'available' ? (
                      <Link
                        href={`/courses/${course.id}`}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        View Course
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedTrade('all')
              }}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



