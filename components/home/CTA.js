import Link from 'next/link'
import { ArrowRight, CheckCircle, Wrench, Award, Users } from 'lucide-react'

const benefits = [
  'Industry-recognized certifications',
  'Hands-on equipment training',
  'Mobile-optimized learning',
  '24/7 instructor support',
  'Career placement assistance',
  'Lifetime access to updates'
]

export default function CTA() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Launch Your{' '}
              <span className="bg-gradient-to-r from-primary-400 to-hvac-400 bg-clip-text text-transparent">
                Trade Career?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Join thousands of successful graduates who are now working in high-demand 
              skilled trades. Start your journey today with our comprehensive HVAC training program.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses/hvac-fundamentals"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Learning Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-4 bg-white bg-opacity-10 text-white font-semibold rounded-xl border border-white border-opacity-20 hover:bg-opacity-20 transition-colors"
              >
                View All Courses
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-6">
                {/* Success Story Card */}
                <div className="bg-gradient-to-r from-primary-50 to-hvac-50 rounded-xl p-6 border border-primary-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                      <p className="text-sm text-gray-600">HVAC Technician</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic">
                    "TradeSchool OS gave me the skills and confidence to start my own HVAC business. 
                    The hands-on training and equipment kits were game-changers!"
                  </p>
                  <div className="flex items-center mt-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Award key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">5.0 rating</span>
                  </div>
                </div>

                {/* Course Progress Card */}
                <div className="bg-gradient-to-r from-trade-50 to-primary-50 rounded-xl p-6 border border-trade-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-trade-600 rounded-lg flex items-center justify-center mr-3">
                        <Wrench className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">HVAC Fundamentals</h3>
                        <p className="text-sm text-gray-600">Module 3 of 8</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-trade-600">75%</div>
                      <div className="w-16 h-2 bg-trade-200 rounded-full">
                        <div className="w-12 h-2 bg-trade-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>6 hours remaining</span>
                    <span>Next: Heat Transfer</span>
                  </div>
                </div>

                {/* Certification Card */}
                <div className="bg-gradient-to-r from-hvac-50 to-trade-50 rounded-xl p-6 border border-hvac-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-hvac-600 rounded-lg flex items-center justify-center mr-3">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">EPA 608 Certification</h3>
                        <p className="text-sm text-gray-600">Universal Level</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-hvac-600">Ready</div>
                      <div className="text-xs text-gray-500">to take exam</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>95% practice score</span>
                    <span>Industry recognized</span>
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



