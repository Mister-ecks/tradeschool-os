import Link from 'next/link'
import { ArrowRight, Clock, Users, Star, Wrench, Zap, Droplets, Hammer, Truck, Filter } from 'lucide-react'

const tradeModules = [
  {
    id: 'hvac',
    title: 'HVAC Systems',
    description: 'Heating, Ventilation & Air Conditioning',
    icon: Wrench,
    color: 'hvac',
    duration: '32 hours',
    students: 2847,
    rating: 4.9,
    price: '$299',
    originalPrice: '$499',
    features: ['EPA 608 Certification', 'NATE Ready', 'Hands-on Labs', 'Equipment Kit'],
    status: 'available'
  },
  {
    id: 'cdl',
    title: 'CDL Training',
    description: 'Commercial Driver License & Trucking',
    icon: Truck,
    color: 'trade',
    duration: '26 hours',
    students: 1250,
    rating: 4.8,
    price: '$899',
    originalPrice: null,
    features: ['Complete CDL Training', 'Practice Exams', 'Road Test Prep', 'Safety Focus'],
    status: 'available'
  },
  {
    id: 'air-brake',
    title: 'Air Brake Systems',
    description: 'Air Brake Certification & Safety',
    icon: Truck,
    color: 'trade',
    duration: '8 hours',
    students: 890,
    rating: 4.9,
    price: '$199',
    originalPrice: null,
    features: ['Air Brake Components', 'Inspection Procedures', 'Safety Protocols', 'Certification Exam'],
    status: 'available'
  },
  {
    id: 'fiber',
    title: 'Fiber & OTDR Training',
    description: 'Fiber Optic Splicing & Testing',
    icon: Filter,
    color: 'purple',
    duration: '32 hours',
    students: 2150,
    rating: 4.9,
    price: '$1,299',
    originalPrice: null,
    features: ['Virtual Fusion Splicing Lab', 'Interactive OTDR Testing', 'Tool Scanning System', 'Industry Certification'],
    status: 'available'
  },
  {
    id: 'electrical',
    title: 'Electrical Systems',
    description: 'Residential & Commercial Wiring',
    icon: Zap,
    color: 'trade',
    duration: '28 hours',
    students: 0,
    rating: 0,
    price: 'Coming Soon',
    originalPrice: null,
    features: ['NEC Code Training', 'Safety Protocols', 'Troubleshooting', 'Smart Home Integration'],
    status: 'coming-soon'
  },
  {
    id: 'plumbing',
    title: 'Plumbing Systems',
    description: 'Water & Waste Management',
    icon: Droplets,
    color: 'primary',
    duration: '24 hours',
    students: 0,
    rating: 0,
    price: 'Coming Soon',
    originalPrice: null,
    features: ['Code Compliance', 'Pipe Installation', 'Fixture Repair', 'Water Treatment'],
    status: 'coming-soon'
  },
  {
    id: 'construction',
    title: 'Construction Basics',
    description: 'Framing & Building Techniques',
    icon: Hammer,
    color: 'trade',
    duration: '20 hours',
    students: 0,
    rating: 0,
    price: 'Coming Soon',
    originalPrice: null,
    features: ['Blueprint Reading', 'Safety Standards', 'Tool Mastery', 'Project Management'],
    status: 'coming-soon'
  }
]

const getColorClasses = (color, status) => {
  if (status === 'coming-soon') {
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      border: 'border-gray-200',
      icon: 'bg-gray-200 text-gray-500'
    }
  }

  const colors = {
    hvac: {
      bg: 'bg-gradient-to-br from-hvac-50 to-hvac-100',
      text: 'text-hvac-700',
      border: 'border-hvac-200',
      icon: 'bg-hvac-600 text-white'
    },
    trade: {
      bg: 'bg-gradient-to-br from-trade-50 to-trade-100',
      text: 'text-trade-700',
      border: 'border-trade-200',
      icon: 'bg-trade-600 text-white'
    },
    primary: {
      bg: 'bg-gradient-to-br from-primary-50 to-primary-100',
      text: 'text-primary-700',
      border: 'border-primary-200',
      icon: 'bg-primary-600 text-white'
    }
  }
  return colors[color] || colors.primary
}

export default function TradeModules() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Trade Training
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master essential skilled trades with our structured curriculum, 
            hands-on equipment, and industry-recognized certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tradeModules.map((module) => {
            const Icon = module.icon
            const colorClasses = getColorClasses(module.color, module.status)
            const isAvailable = module.status === 'available'
            
            return (
              <div
                key={module.id}
                className={`relative rounded-2xl border-2 ${colorClasses.border} ${colorClasses.bg} p-6 transition-all duration-300 hover:shadow-lg ${
                  isAvailable ? 'hover:scale-105' : 'opacity-75'
                }`}
              >
                {/* Status badge */}
                {module.status === 'coming-soon' && (
                  <div className="absolute -top-3 -right-3 bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 ${colorClasses.icon} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title and description */}
                <h3 className={`text-xl font-bold ${colorClasses.text} mb-2`}>
                  {module.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {module.description}
                </p>

                {/* Stats */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {module.duration}
                  </div>
                  {isAvailable && (
                    <>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {module.students.toLocaleString()} students
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                        {module.rating} rating
                      </div>
                    </>
                  )}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {module.features.map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-2xl font-bold ${colorClasses.text}`}>
                        {module.price}
                      </span>
                      {module.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {module.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {isAvailable ? (
                    <Link
                      href={
                        module.id === 'air-brake' ? '/courses/air-brake-certification' :
                        module.id === 'fiber' ? '/courses/fiber-otdr-training' :
                        `/courses/${module.id}-fundamentals`
                      }
                      className={`w-full inline-flex items-center justify-center px-4 py-3 ${colorClasses.icon} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      Start Course
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full px-4 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Trade Career?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of students who are already building successful careers 
              in skilled trades with our comprehensive training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses/hvac-fundamentals"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Start HVAC Course
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                View All Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



