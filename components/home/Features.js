import { 
  Video, 
  Trophy, 
  Shield, 
  RefreshCw, 
  QrCode, 
  Smartphone,
  Clock,
  Users
} from 'lucide-react'

const features = [
  {
    icon: Video,
    title: 'Short Video Lessons',
    description: 'Bite-sized 5-8 minute videos optimized for mobile and offline viewing. Learn at your own pace.',
    color: 'primary'
  },
  {
    icon: Trophy,
    title: 'Kahoot-Style Quizzes',
    description: 'Gamified learning with interactive quizzes, leaderboards, and badges to track your progress.',
    color: 'trade'
  },
  {
    icon: Shield,
    title: 'Exam Integrity',
    description: 'Secure proctored exams with camera monitoring and randomized questions for certification.',
    color: 'hvac'
  },
  {
    icon: RefreshCw,
    title: 'Recurrent Training',
    description: 'Scheduled refresher courses every 6-12 months with automated reminders to stay current.',
    color: 'primary'
  },
  {
    icon: QrCode,
    title: 'QR-Enabled Equipment',
    description: 'Every system includes QR codes linking to training videos and technical documentation.',
    color: 'trade'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'PWA optimized for low-bandwidth environments. Works offline with sync when connected.',
    color: 'hvac'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Learn on your schedule with 24/7 access to all content and instructor support.',
    color: 'primary'
  },
  {
    icon: Users,
    title: 'Community Learning',
    description: 'Connect with peers, share experiences, and learn from industry professionals.',
    color: 'trade'
  }
]

const getColorClasses = (color) => {
  const colors = {
    primary: 'bg-primary-100 text-primary-600',
    trade: 'bg-trade-100 text-trade-600',
    hvac: 'bg-hvac-100 text-hvac-600'
  }
  return colors[color] || colors.primary
}

export default function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose TradeSchool OS?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with proven educational methods 
            to deliver the most effective skilled trades training available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 ${getColorClasses(feature.color)} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4 mr-2" />
            Industry-Approved Training • Mobile-Optimized • Offline Capable
          </div>
        </div>
      </div>
    </div>
  )
}



