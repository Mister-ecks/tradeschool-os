import Link from 'next/link'
import { ArrowRight, BookOpen, Smartphone, Laptop, Camera, QrCode, GraduationCap, Users, Clock, Star } from 'lucide-react'

const learningModules = [
  {
    id: 'road-signs',
    title: 'Road Signs Training',
    description: 'Master traffic signs and signals for CDL certification',
    icon: BookOpen,
    color: 'trade',
    features: ['Study Mode', 'Quiz Mode', 'Progress Tracking', 'Live Sharing'],
    status: 'available'
  },
  {
    id: 'youth-repair',
    title: 'Youth Repair Skills',
    description: 'Phone & laptop repair for young learners',
    icon: Smartphone,
    color: 'primary',
    features: ['Step-by-Step Guides', 'Video Tutorials', 'Photo Upload', 'AI Feedback'],
    status: 'available'
  },
  {
    id: 'vr-ar',
    title: 'VR & AR Training',
    description: 'Immersive learning with virtual and augmented reality',
    icon: Camera,
    color: 'hvac',
    features: ['3D Simulations', 'AR Overlays', 'Interactive Labs', 'Real-time Guidance'],
    status: 'available'
  },
  {
    id: 'tool-scanner',
    title: 'Tool Recognition',
    description: 'Barcode scanning for tool identification and usage',
    icon: QrCode,
    color: 'trade',
    features: ['Barcode Scanning', 'Tool Database', 'Usage Instructions', 'Lesson Integration'],
    status: 'available'
  }
]

const getColorClasses = (color) => {
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

export default function LearningPlatform() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <GraduationCap className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Interactive Learning Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience hands-on learning with our cutting-edge training modules. 
            From road signs to VR simulations, master skills through interactive technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {learningModules.map((module) => {
            const Icon = module.icon
            const colorClasses = getColorClasses(module.color)
            
            return (
              <div
                key={module.id}
                className={`relative rounded-2xl border-2 ${colorClasses.border} ${colorClasses.bg} p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
              >
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

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {module.features.map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href={`/learning-platform/${module.id}`}
                  className={`w-full inline-flex items-center justify-center px-4 py-3 ${colorClasses.icon} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                >
                  Explore Module
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4</div>
              <div className="text-gray-600">Interactive Modules</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-hvac-100 rounded-full mx-auto mb-4">
                <Clock className="w-6 h-6 text-hvac-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Access Available</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-trade-100 rounded-full mx-auto mb-4">
                <Star className="w-6 h-6 text-trade-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Hands-on Learning</div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-600 to-hvac-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience Interactive Learning?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Join our innovative learning platform and master skills through 
              cutting-edge technology and hands-on training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learning-platform"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Explore Learning Platform
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-primary-600 transition-colors"
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
