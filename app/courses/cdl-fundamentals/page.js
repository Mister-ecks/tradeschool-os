import { cdlCompleteModules } from '@/data/cdl-complete-modules'
import CourseDetail from '@/components/courses/CourseDetail'

export const metadata = {
  title: 'CDL Fundamentals - Commercial Driver Training | TradeSchool OS',
  description: 'Complete CDL training program covering commercial driver licensing, vehicle inspection, safety practices, and road test preparation. 26 hours of comprehensive training.',
  keywords: 'CDL training, commercial driver license, truck driving school, vehicle inspection, safety training, road test preparation',
  openGraph: {
    title: 'CDL Fundamentals - Commercial Driver Training',
    description: 'Complete CDL training program with 26 hours of comprehensive instruction',
    type: 'website',
  },
}

export default function CDLCoursePage() {
  const cdlCourse = {
    id: 'cdl-fundamentals',
    title: 'CDL Fundamentals: Commercial Driver Training',
    description: 'Comprehensive commercial driver training program covering all aspects of CDL requirements, vehicle operation, safety practices, and road test preparation. This course prepares students for successful CDL certification and a career in commercial trucking.',
    category: 'Transportation & Logistics',
    rating: 4.8,
    studentsCount: 1250,
    duration: '26 hours',
    price: 899,
    instructor: {
      name: 'Michael Rodriguez',
      title: 'CDL Master Instructor',
      avatar: '/instructors/michael-rodriguez.jpg',
      experience: '15+ years',
      students: 3200,
      rating: 4.8,
      bio: 'CDL Master Instructor with 15+ years of commercial driving experience. Former safety director for major trucking companies. Certified by the Department of Transportation and Federal Motor Carrier Safety Administration.',
      credentials: ['CDL Class A License', 'DOT Safety Certification', 'FMCSA Certified Instructor', 'Defensive Driving Specialist', 'Hazmat Endorsement']
    },
    features: [
      'Complete CDL training program',
      '26 hours of comprehensive instruction',
      '40 detailed lessons across 8 modules',
      'Interactive quizzes and assessments',
      'Road test preparation and simulation',
      'FMCSA compliance training',
      'Safety and defensive driving focus',
      'Vehicle inspection and maintenance',
      'Cargo securement training',
      'Final comprehensive exam'
    ],
    requirements: [
      'Minimum age 18 (21 for interstate driving)',
      'Valid driver\'s license',
      'Clean driving record',
      'Medical certification',
      'Background check clearance',
      'Basic computer skills',
      'Commitment to safety',
      'Willingness to learn'
    ],
    outcomes: [
      'Complete understanding of CDL requirements',
      'Mastery of pre-trip vehicle inspection',
      'Proficient vehicle control skills',
      'Comprehensive knowledge of traffic laws',
      'Advanced safety and defensive driving',
      'Proper cargo securement techniques',
      'Basic vehicle maintenance skills',
      'Road test readiness and confidence',
      'FMCSA regulatory compliance',
      'Career preparation for commercial driving'
    ],
    modules: cdlCompleteModules,
    curriculum: cdlCompleteModules.map(module => ({
      id: module.id,
      title: module.title,
      duration: module.duration,
      description: module.description,
      objectives: module.objectives,
      videos: module.lessons.length,
      activities: module.lessons.filter(l => l.type === 'interactive').length,
      questions: module.quiz.questions
    })),
    statistics: {
      totalDuration: '26 hours',
      totalLessons: 40,
      totalModules: 8,
      completionRate: 92,
      averageRating: 4.8
    }
  }

  return <CourseDetail course={cdlCourse} />
}



