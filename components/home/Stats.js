import { Users, Award, Clock, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '2,847',
    label: 'Active Students',
    description: 'Learning across all trade programs'
  },
  {
    icon: Award,
    value: '94%',
    label: 'Certification Rate',
    description: 'Students who complete certification'
  },
  {
    icon: Clock,
    value: '32',
    label: 'Hours of Content',
    description: 'Comprehensive video training'
  },
  {
    icon: TrendingUp,
    value: '4.9',
    label: 'Average Rating',
    description: 'Based on student feedback'
  }
]

export default function Stats() {
  return (
    <div className="py-20 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Our students consistently achieve high success rates and industry recognition 
            through our comprehensive training approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-primary-100 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-primary-200">
                  {stat.description}
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 text-white rounded-full text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-2" />
            Industry-Leading Success Rate • Mobile-Optimized Learning
          </div>
        </div>
      </div>
    </div>
  )
}



