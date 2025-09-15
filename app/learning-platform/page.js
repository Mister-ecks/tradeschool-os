import CDLTrainingModule from '@/components/cdl/CDLTrainingModule';
import VRARTrainingModule from '@/components/vr-ar/VRARTrainingModule';
import RoadSignQuiz from '@/components/modules/road-signs/RoadSignQuiz';
import ComprehensiveDashboard from '@/components/dashboard/ComprehensiveDashboard';

export const metadata = {
  title: 'Learning Platform - TradeSchool OS',
  description: 'Comprehensive learning platform for skilled trades education and certification',
  keywords: 'learning platform, CDL training, VR AR training, road signs, skilled trades',
  openGraph: {
    title: 'Learning Platform - TradeSchool OS',
    description: 'Comprehensive learning platform for skilled trades education and certification',
    type: 'website',
  },
}

export default function LearningPlatformPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Platform</h1>
          <p className="text-xl text-gray-600">
            Master essential skills through interactive training modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* CDL Training Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">CDL Training</h2>
                <p className="text-gray-600">Commercial Driver's License</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              5-day comprehensive program covering all CDL requirements, air brakes, and road safety.
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">37.5 hours</span>
              <span className="text-sm text-green-600 font-medium">In Progress</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Continue Training
            </button>
          </div>

          {/* VR/AR Training Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">VR/AR Training</h2>
                <p className="text-gray-600">Immersive Learning</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Hands-on training in laptop repair, phone repair, fiber splicing, and OTDR testing.
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">4 modules</span>
              <span className="text-sm text-yellow-600 font-medium">Available</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Start VR Training
            </button>
          </div>

          {/* Road Signs Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Road Signs</h2>
                <p className="text-gray-600">Interactive Quiz</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Master 50 Ontario road signs with interactive flashcards and comprehensive quizzes.
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">50 signs</span>
              <span className="text-sm text-green-600 font-medium">Completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Review Signs
            </button>
          </div>
        </div>

        {/* Additional Training Modules */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Additional Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium mb-2">Yard Training</h3>
              <p className="text-sm text-gray-600">Inspection checklist</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium mb-2">Tool Scanner</h3>
              <p className="text-sm text-gray-600">Barcode recognition</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium mb-2">Youth Repair</h3>
              <p className="text-sm text-gray-600">Basic repair skills</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium mb-2">Dashboard</h3>
              <p className="text-sm text-gray-600">Progress tracking</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}