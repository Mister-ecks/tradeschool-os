import CourseDetail from '@/components/courses/CourseDetail'

export const metadata = {
  title: 'Air Brake Systems Certification - Commercial Driver Training | TradeSchool OS',
  description: 'Comprehensive air brake training for commercial drivers. Learn air brake components, inspection procedures, and safety protocols. 8 hours of specialized training.',
  keywords: 'air brake training, CDL air brake, commercial vehicle brakes, brake inspection, DOT certification, truck driving safety',
  openGraph: {
    title: 'Air Brake Systems Certification',
    description: 'Comprehensive air brake training for commercial drivers with 8 hours of specialized instruction',
    type: 'website',
  },
}

const airBrakeModules = [
  {
    id: 'air-brake-introduction',
    title: 'Introduction to Air Brake Systems',
    description: 'Understanding the fundamentals of air brake systems and their importance in commercial vehicles.',
    duration: '1 hour',
    objectives: [
      'Understand air brake system principles',
      'Learn about air brake advantages',
      'Identify system components overview',
      'Recognize safety importance'
    ],
    lessons: [
      {
        id: 'ab-1-1',
        title: 'Air Brake System Fundamentals',
        description: 'Basic principles and operation of air brake systems.',
        duration: '30 minutes',
        objectives: ['Understand air pressure principles', 'Learn brake force multiplication', 'Know system advantages'],
        resources: ['Air Brake Manual', 'System Diagrams', 'Pressure Charts'],
        type: 'video'
      },
      {
        id: 'ab-1-2',
        title: 'System Components Overview',
        description: 'Introduction to major air brake system components.',
        duration: '30 minutes',
        objectives: ['Identify major components', 'Understand component functions', 'Learn component locations'],
        resources: ['Component Guide', 'System Layout', 'Identification Charts'],
        type: 'interactive'
      }
    ],
    quiz: { questions: 10, passingScore: 80, timeLimit: 15 },
    completed: false,
    locked: false,
    orderIndex: 1,
    category: 'theory'
  },
  {
    id: 'air-brake-components',
    title: 'Air Brake Components & Operation',
    description: 'Detailed study of air brake system components and their specific functions.',
    duration: '2 hours',
    objectives: [
      'Master air compressor operation',
      'Understand air reservoir functions',
      'Learn brake valve mechanisms',
      'Identify brake chamber types'
    ],
    lessons: [
      {
        id: 'ab-2-1',
        title: 'Air Compressor & Governor',
        description: 'Understanding air generation and pressure regulation.',
        duration: '45 minutes',
        objectives: ['Learn compressor operation', 'Understand governor function', 'Know pressure settings'],
        resources: ['Compressor Manual', 'Governor Guide', 'Pressure Settings'],
        type: 'video'
      },
      {
        id: 'ab-2-2',
        title: 'Air Reservoirs & Dryers',
        description: 'Air storage and moisture removal systems.',
        duration: '30 minutes',
        objectives: ['Identify reservoir types', 'Understand dryer function', 'Learn maintenance requirements'],
        resources: ['Reservoir Guide', 'Dryer Manual', 'Maintenance Schedule'],
        type: 'interactive'
      },
      {
        id: 'ab-2-3',
        title: 'Brake Valves & Chambers',
        description: 'Brake application and release mechanisms.',
        duration: '45 minutes',
        objectives: ['Learn valve operation', 'Understand chamber function', 'Identify different types'],
        resources: ['Valve Guide', 'Chamber Manual', 'Type Identification'],
        type: 'simulation'
      }
    ],
    quiz: { questions: 15, passingScore: 85, timeLimit: 20 },
    completed: false,
    locked: false,
    orderIndex: 2,
    category: 'components'
  },
  {
    id: 'air-brake-inspection',
    title: 'Air Brake Inspection Procedures',
    description: 'Comprehensive pre-trip and post-trip air brake inspection procedures.',
    duration: '2.5 hours',
    objectives: [
      'Master pre-trip brake inspection',
      'Learn leak detection methods',
      'Understand pressure testing',
      'Practice inspection documentation'
    ],
    lessons: [
      {
        id: 'ab-3-1',
        title: 'Pre-Trip Brake Inspection',
        description: 'Complete pre-trip air brake inspection checklist.',
        duration: '60 minutes',
        objectives: ['Learn inspection sequence', 'Identify common problems', 'Practice inspection routine'],
        resources: ['Inspection Checklist', 'Problem Guide', 'Routine Steps'],
        type: 'simulation'
      },
      {
        id: 'ab-3-2',
        title: 'Leak Detection & Testing',
        description: 'Methods for detecting and testing air brake leaks.',
        duration: '45 minutes',
        objectives: ['Learn leak detection', 'Practice pressure testing', 'Understand test procedures'],
        resources: ['Leak Detection Guide', 'Test Procedures', 'Pressure Charts'],
        type: 'interactive'
      },
      {
        id: 'ab-3-3',
        title: 'Inspection Documentation',
        description: 'Proper documentation of air brake inspections.',
        duration: '45 minutes',
        objectives: ['Learn documentation requirements', 'Practice report writing', 'Understand compliance needs'],
        resources: ['Documentation Forms', 'Report Templates', 'Compliance Guide'],
        type: 'assessment'
      }
    ],
    quiz: { questions: 20, passingScore: 85, timeLimit: 25 },
    completed: false,
    locked: false,
    orderIndex: 3,
    category: 'inspection'
  },
  {
    id: 'air-brake-safety',
    title: 'Air Brake Safety & Emergency Procedures',
    description: 'Safety protocols and emergency procedures for air brake systems.',
    duration: '1.5 hours',
    objectives: [
      'Learn emergency brake procedures',
      'Understand brake failure response',
      'Master safety protocols',
      'Practice emergency scenarios'
    ],
    lessons: [
      {
        id: 'ab-4-1',
        title: 'Emergency Brake Procedures',
        description: 'Proper procedures for emergency brake application.',
        duration: '45 minutes',
        objectives: ['Learn emergency procedures', 'Practice brake application', 'Understand safety measures'],
        resources: ['Emergency Guide', 'Procedure Steps', 'Safety Protocols'],
        type: 'simulation'
      },
      {
        id: 'ab-4-2',
        title: 'Brake Failure Response',
        description: 'How to respond to brake system failures.',
        duration: '45 minutes',
        objectives: ['Recognize brake failures', 'Learn response procedures', 'Practice failure scenarios'],
        resources: ['Failure Guide', 'Response Procedures', 'Scenario Training'],
        type: 'interactive'
      }
    ],
    quiz: { questions: 15, passingScore: 80, timeLimit: 20 },
    completed: false,
    locked: false,
    orderIndex: 4,
    category: 'safety'
  },
  {
    id: 'air-brake-maintenance',
    title: 'Air Brake Maintenance & Troubleshooting',
    description: 'Maintenance procedures and troubleshooting common air brake problems.',
    duration: '1 hour',
    objectives: [
      'Learn maintenance procedures',
      'Understand troubleshooting methods',
      'Master problem identification',
      'Practice repair techniques'
    ],
    lessons: [
      {
        id: 'ab-5-1',
        title: 'Routine Maintenance',
        description: 'Regular maintenance procedures for air brake systems.',
        duration: '30 minutes',
        objectives: ['Learn maintenance schedule', 'Practice maintenance tasks', 'Understand requirements'],
        resources: ['Maintenance Schedule', 'Task Guide', 'Requirements List'],
        type: 'video'
      },
      {
        id: 'ab-5-2',
        title: 'Troubleshooting Common Problems',
        description: 'Identifying and fixing common air brake problems.',
        duration: '30 minutes',
        objectives: ['Identify common problems', 'Learn troubleshooting steps', 'Practice problem solving'],
        resources: ['Problem Guide', 'Troubleshooting Steps', 'Solution Manual'],
        type: 'interactive'
      }
    ],
    quiz: { questions: 12, passingScore: 80, timeLimit: 15 },
    completed: false,
    locked: false,
    orderIndex: 5,
    category: 'maintenance'
  }
]

export default function AirBrakeCoursePage() {
  const airBrakeCourse = {
    id: 'air-brake-certification',
    title: 'Air Brake Systems Certification',
    description: 'Comprehensive air brake training for commercial drivers. Learn air brake components, inspection procedures, safety protocols, and maintenance requirements. This specialized course prepares drivers for air brake endorsement and ensures safe operation of commercial vehicles.',
    category: 'Transportation & Logistics',
    rating: 4.9,
    studentsCount: 890,
    duration: '8 hours',
    price: 199,
    instructor: {
      name: 'Michael Rodriguez',
      title: 'CDL Master Instructor',
      avatar: '/instructors/michael-rodriguez.jpg',
      experience: '15+ years',
      students: 3200,
      rating: 4.8,
      bio: 'CDL Master Instructor with 15+ years of commercial driving experience. Former safety director for major trucking companies. Certified by the Department of Transportation and Federal Motor Carrier Safety Administration.',
      credentials: ['CDL Class A License', 'DOT Safety Certification', 'FMCSA Certified Instructor', 'Defensive Driving Specialist', 'Hazmat Endorsement', 'Air Brake Specialist']
    },
    features: [
      'Comprehensive air brake training',
      '8 hours of specialized instruction',
      '12 detailed lessons across 5 modules',
      'Interactive simulations and assessments',
      'DOT-compliant curriculum',
      'Hands-on inspection training',
      'Emergency procedure practice',
      'Maintenance and troubleshooting',
      'Certification exam preparation',
      'Mobile learning support'
    ],
    requirements: [
      'Valid driver\'s license',
      'Basic understanding of vehicle systems',
      'CDL permit or license (recommended)',
      'Access to computer/mobile for lessons',
      'Commitment to safety protocols',
      'Willingness to learn technical systems'
    ],
    outcomes: [
      'Complete understanding of air brake systems',
      'Mastery of pre-trip brake inspection',
      'Proficient leak detection and testing',
      'Advanced safety and emergency procedures',
      'Proper maintenance and troubleshooting',
      'DOT compliance knowledge',
      'Air brake endorsement readiness',
      'Professional brake system operation',
      'Emergency response confidence',
      'Career advancement preparation'
    ],
    modules: airBrakeModules,
    curriculum: airBrakeModules.map(module => ({
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
      totalDuration: '8 hours',
      totalLessons: 12,
      totalModules: 5,
      completionRate: 95,
      averageRating: 4.9
    }
  }

  return <CourseDetail course={airBrakeCourse} />
}
