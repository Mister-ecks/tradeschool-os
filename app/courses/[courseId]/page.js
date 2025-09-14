import { CourseDetail } from '@/components/courses/CourseDetail'
import { notFound } from 'next/navigation'
import { hvacCompleteModules, courseStatistics, hvacFinalExam } from '@/data/hvac-complete-modules'
import { cdlCompleteModules } from '@/data/cdl-complete-modules'

const courses = {
  'hvac-fundamentals': {
    id: 'hvac-fundamentals',
    title: 'Complete HVAC Technician Certification Course',
    description: 'Master HVAC systems from fundamentals to advanced troubleshooting. Get certified as an HVAC technician with hands-on training, real-world projects, and industry-standard practices.',
    category: 'HVAC Certification',
    difficulty: 'Beginner to Advanced',
    duration: courseStatistics.totalDuration,
    price: '$299',
    originalPrice: '$499',
    rating: 4.9,
    studentsCount: 2847,
    instructor: {
      name: 'Master Technician James Wilson',
      title: 'EPA-Certified HVAC Master Technician',
      avatar: '/instructors/james-wilson.jpg',
      experience: '20+ years',
      students: 8500,
      rating: 4.9,
      bio: 'EPA-certified HVAC Master Technician with 20+ years of field experience. Former Technical Director at Johnson Controls, specializing in commercial and residential HVAC systems. Certified trainer for EPA 608 and NATE programs.',
      credentials: ['EPA 608 Universal Certification', 'NATE Certified', 'Energy Efficiency Expert', 'Safety Training Specialist', 'HVAC Excellence Certified']
    },
    features: [
      'Hands-on Video Demonstrations',
      'Real-World Case Studies', 
      'EPA 608 Exam Preparation',
      'NATE Certification Ready',
      'Lifetime Access to Updates',
      'Mobile Learning Support',
      'Downloadable Resources',
      '24/7 Instructor Support'
    ],
    requirements: [
      'Basic understanding of physics (heat, electricity)',
      'High school mathematics or equivalent',
      'Safety awareness mindset',
      'Access to computer/mobile for video lessons',
      'Willingness to practice hands-on skills'
    ],
    outcomes: [
      'Install and service HVAC systems professionally',
      'Troubleshoot complex HVAC problems systematically', 
      'Pass EPA 608 and NATE certification exams',
      'Read and interpret electrical schematics',
      'Perform proper refrigerant handling and recovery',
      'Design basic HVAC systems for residential applications',
      'Implement energy efficiency best practices',
      'Execute proper safety procedures in all situations'
    ],
    modules: hvacCompleteModules,
    curriculum: hvacCompleteModules.map(module => ({
      id: module.id,
      title: module.title,
      duration: module.duration,
      type: 'module',
      description: module.description,
      objectives: module.objectives,
      completed: module.completed,
      locked: module.locked,
      videos: module.lessons.length,
      activities: module.lessons.length,
      questions: module.quiz.questions,
      lessons: module.lessons
    })).concat([{
      id: 9,
      title: 'Final Certification Exam',
      duration: '2 hours',
      type: 'exam',
      description: hvacFinalExam.description,
      objectives: ['Demonstrate mastery of all course concepts', 'Pass comprehensive certification exam'],
      completed: false,
      locked: true,
      videos: 0,
      activities: 0,
      questions: hvacFinalExam.questions,
      lessons: []
    }]),
    statistics: courseStatistics,
    finalExam: hvacFinalExam
  },
  'cdl-fundamentals': {
    id: 'cdl-fundamentals',
    title: 'CDL Fundamentals: Commercial Driver Training',
    description: 'Complete commercial driver training program covering CDL requirements, vehicle operation, safety practices, and road test preparation.',
    category: 'CDL Certification',
    difficulty: 'Beginner',
    duration: '26 hours',
    price: '$899',
    originalPrice: '$1,299',
    rating: 4.8,
    studentsCount: 1250,
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
      'Comprehensive CDL Training',
      'Practice Exams & Simulations',
      'Vehicle Inspection Training',
      'Road Test Preparation',
      'Safety Practices & Procedures',
      'Mobile Learning Support',
      'Downloadable Study Materials',
      '24/7 Instructor Support'
    ],
    requirements: [
      'Valid driver\'s license',
      'Clean driving record',
      'Basic reading and writing skills',
      'Access to computer/mobile for lessons',
      'Willingness to learn safety procedures'
    ],
    outcomes: [
      'Pass CDL written and road tests',
      'Perform thorough vehicle inspections',
      'Understand traffic laws and regulations',
      'Execute proper safety procedures',
      'Handle cargo securement properly',
      'Navigate commercial vehicle operations',
      'Maintain compliance with DOT regulations',
      'Demonstrate professional driving skills'
    ],
    modules: cdlCompleteModules,
    curriculum: cdlCompleteModules.map(module => ({
      id: module.id,
      title: module.title,
      duration: module.duration,
      type: 'module',
      description: module.description,
      objectives: module.objectives,
      completed: module.completed,
      locked: module.locked,
      videos: module.lessons.length,
      activities: module.lessons.length,
      questions: module.quiz.questions,
      lessons: module.lessons
    })),
    statistics: {
      totalDuration: '26 hours',
      totalLessons: 40,
      totalModules: 8,
      completionRate: 92,
      averageRating: 4.8
    }
  }
}

export default function CoursePage({ params }) {
  const course = courses[params.courseId]
  
  if (!course) {
    notFound()
  }

  return <CourseDetail course={course} />
}

export async function generateStaticParams() {
  return Object.keys(courses).map((courseId) => ({
    courseId,
  }))
}



