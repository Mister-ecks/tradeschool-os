export const cdlCompleteModules = [
  {
    id: 'cdl-introduction',
    title: 'Introduction to Commercial Driving',
    description: 'Overview of the CDL program, requirements, and career opportunities in commercial trucking.',
    duration: '2 hours',
    objectives: [
      'Understand CDL requirements and eligibility',
      'Learn about different CDL classes and endorsements',
      'Explore career opportunities in trucking',
      'Understand the importance of safety in commercial driving'
    ],
    lessons: [
      {
        id: 'cdl-1-1',
        title: 'CDL Requirements and Eligibility',
        description: 'Learn about age requirements, medical qualifications, and background checks needed for CDL.',
        duration: '30 minutes',
        objectives: ['Understand age and residency requirements', 'Learn about medical certification needs', 'Know background check requirements'],
        resources: ['CDL Manual', 'Medical Certification Form', 'Background Check Guide'],
        type: 'video'
      },
      {
        id: 'cdl-1-2',
        title: 'CDL Classes and Endorsements',
        description: 'Overview of Class A, B, and C licenses and various endorsements available.',
        duration: '45 minutes',
        objectives: ['Distinguish between CDL classes', 'Understand endorsement requirements', 'Choose appropriate license type'],
        resources: ['CDL Class Comparison Chart', 'Endorsement Guide', 'License Type Selector'],
        type: 'interactive'
      },
      {
        id: 'cdl-1-3',
        title: 'Career Opportunities in Trucking',
        description: 'Explore different career paths and earning potential in the trucking industry.',
        duration: '30 minutes',
        objectives: ['Identify career opportunities', 'Understand earning potential', 'Learn about industry growth'],
        resources: ['Career Path Guide', 'Salary Survey', 'Industry Outlook Report'],
        type: 'video'
      },
      {
        id: 'cdl-1-4',
        title: 'Safety First - The Foundation',
        description: 'Introduction to safety principles and their critical importance in commercial driving.',
        duration: '15 minutes',
        objectives: ['Understand safety priorities', 'Learn about accident statistics', 'Recognize safety responsibilities'],
        resources: ['Safety Statistics', 'Driver Responsibilities Guide', 'Safety Checklist'],
        type: 'assessment'
      }
    ],
    quiz: {
      questions: 15,
      passingScore: 80,
      timeLimit: 20
    },
    completed: false,
    locked: false,
    orderIndex: 1,
    category: 'theory'
  },
  {
    id: 'cdl-vehicle-inspection',
    title: 'Pre-Trip Vehicle Inspection',
    description: 'Comprehensive training on conducting thorough pre-trip inspections of commercial vehicles.',
    duration: '3 hours',
    objectives: [
      'Perform complete pre-trip inspection',
      'Identify safety defects and violations',
      'Document inspection findings properly',
      'Understand inspection requirements and timing'
    ],
    lessons: [
      {
        id: 'cdl-2-1',
        title: 'Inspection Overview and Requirements',
        description: 'Understanding when and how to perform pre-trip inspections.',
        duration: '30 minutes',
        objectives: ['Know inspection timing requirements', 'Understand inspection documentation', 'Learn inspection procedures'],
        resources: ['Inspection Checklist', 'Documentation Forms', 'Timing Requirements'],
        type: 'video'
      },
      {
        id: 'cdl-2-2',
        title: 'Engine Compartment Inspection',
        description: 'Detailed inspection of engine, belts, hoses, and fluid levels.',
        duration: '45 minutes',
        objectives: ['Inspect engine components', 'Check fluid levels', 'Identify belt and hose problems'],
        resources: ['Engine Diagram', 'Fluid Level Guide', 'Belt Inspection Chart'],
        type: 'simulation'
      },
      {
        id: 'cdl-2-3',
        title: 'Cab and Controls Inspection',
        description: 'Checking cab equipment, controls, and safety systems.',
        duration: '30 minutes',
        objectives: ['Test all controls', 'Check safety equipment', 'Verify cab condition'],
        resources: ['Control Testing Guide', 'Safety Equipment List', 'Cab Inspection Checklist'],
        type: 'interactive'
      },
      {
        id: 'cdl-2-4',
        title: 'Exterior and Cargo Area Inspection',
        description: 'Inspecting lights, tires, brakes, and cargo securement.',
        duration: '45 minutes',
        objectives: ['Check all lights and signals', 'Inspect tires and wheels', 'Verify cargo securement'],
        resources: ['Light Testing Guide', 'Tire Inspection Chart', 'Cargo Securement Guide'],
        type: 'simulation'
      }
    ],
    quiz: {
      questions: 25,
      passingScore: 85,
      timeLimit: 30
    },
    completed: false,
    locked: false,
    orderIndex: 2,
    category: 'practical'
  },
  {
    id: 'cdl-basic-controls',
    title: 'Basic Vehicle Control',
    description: 'Mastering basic vehicle control skills including steering, braking, and acceleration.',
    duration: '4 hours',
    objectives: [
      'Master steering techniques',
      'Learn proper braking procedures',
      'Understand acceleration and shifting',
      'Practice backing and maneuvering'
    ],
    lessons: [
      {
        id: 'cdl-3-1',
        title: 'Steering and Hand Positioning',
        description: 'Proper steering techniques and hand positioning for commercial vehicles.',
        duration: '45 minutes',
        objectives: ['Learn proper hand positioning', 'Master steering techniques', 'Understand turning procedures'],
        resources: ['Steering Guide', 'Hand Position Chart', 'Turning Procedures'],
        type: 'simulation'
      },
      {
        id: 'cdl-3-2',
        title: 'Braking Techniques',
        description: 'Safe braking procedures including emergency stops and brake fade prevention.',
        duration: '60 minutes',
        objectives: ['Learn proper braking techniques', 'Understand brake fade', 'Practice emergency stops'],
        resources: ['Braking Guide', 'Emergency Stop Procedures', 'Brake Fade Prevention'],
        type: 'simulation'
      },
      {
        id: 'cdl-3-3',
        title: 'Acceleration and Shifting',
        description: 'Proper acceleration techniques and manual transmission shifting.',
        duration: '45 minutes',
        objectives: ['Master acceleration techniques', 'Learn proper shifting', 'Understand gear selection'],
        resources: ['Shifting Guide', 'Gear Selection Chart', 'Acceleration Techniques'],
        type: 'simulation'
      },
      {
        id: 'cdl-3-4',
        title: 'Backing and Maneuvering',
        description: 'Safe backing procedures and tight space maneuvering techniques.',
        duration: '60 minutes',
        objectives: ['Master backing techniques', 'Learn maneuvering skills', 'Practice tight space navigation'],
        resources: ['Backing Guide', 'Maneuvering Techniques', 'Space Navigation Tips'],
        type: 'simulation'
      }
    ],
    quiz: {
      questions: 20,
      passingScore: 80,
      timeLimit: 25
    },
    completed: false,
    locked: false,
    orderIndex: 3,
    category: 'practical'
  },
  {
    id: 'cdl-safety-practices',
    title: 'Safety Practices and Procedures',
    description: 'Comprehensive safety training covering defensive driving, hazard recognition, and emergency procedures.',
    duration: '3.5 hours',
    objectives: [
      'Apply defensive driving techniques',
      'Recognize and respond to hazards',
      'Follow emergency procedures',
      'Maintain safe following distances'
    ],
    lessons: [
      {
        id: 'cdl-4-1',
        title: 'Defensive Driving Principles',
        description: 'Core defensive driving techniques for commercial vehicle operators.',
        duration: '45 minutes',
        objectives: ['Learn defensive driving principles', 'Understand hazard recognition', 'Master space management'],
        resources: ['Defensive Driving Guide', 'Hazard Recognition Chart', 'Space Management Tips'],
        type: 'video'
      },
      {
        id: 'cdl-4-2',
        title: 'Hazard Recognition and Response',
        description: 'Identifying potential hazards and appropriate response strategies.',
        duration: '60 minutes',
        objectives: ['Identify various hazards', 'Learn response strategies', 'Practice hazard avoidance'],
        resources: ['Hazard Identification Guide', 'Response Strategies', 'Avoidance Techniques'],
        type: 'interactive'
      },
      {
        id: 'cdl-4-3',
        title: 'Emergency Procedures',
        description: 'Proper procedures for handling emergencies and breakdowns.',
        duration: '45 minutes',
        objectives: ['Learn emergency procedures', 'Understand breakdown protocols', 'Practice emergency communication'],
        resources: ['Emergency Procedures Guide', 'Breakdown Protocols', 'Communication Procedures'],
        type: 'simulation'
      },
      {
        id: 'cdl-4-4',
        title: 'Following Distance and Speed Management',
        description: 'Maintaining safe following distances and appropriate speed for conditions.',
        duration: '30 minutes',
        objectives: ['Calculate safe following distances', 'Understand speed management', 'Learn weather considerations'],
        resources: ['Following Distance Calculator', 'Speed Management Guide', 'Weather Considerations'],
        type: 'assessment'
      }
    ],
    quiz: {
      questions: 30,
      passingScore: 85,
      timeLimit: 35
    },
    completed: false,
    locked: false,
    orderIndex: 4,
    category: 'safety'
  },
  {
    id: 'cdl-traffic-laws',
    title: 'Traffic Laws and Regulations',
    description: 'Understanding traffic laws, regulations, and compliance requirements for commercial drivers.',
    duration: '2.5 hours',
    objectives: [
      'Understand traffic laws for commercial vehicles',
      'Learn about weight and size restrictions',
      'Know hours of service regulations',
      'Understand documentation requirements'
    ],
    lessons: [
      {
        id: 'cdl-5-1',
        title: 'Commercial Vehicle Traffic Laws',
        description: 'Specific traffic laws that apply to commercial vehicles.',
        duration: '45 minutes',
        objectives: ['Learn commercial vehicle laws', 'Understand right-of-way rules', 'Know lane restrictions'],
        resources: ['Traffic Laws Guide', 'Right-of-Way Rules', 'Lane Restriction Chart'],
        type: 'video'
      },
      {
        id: 'cdl-5-2',
        title: 'Weight and Size Restrictions',
        description: 'Understanding weight limits, size restrictions, and permit requirements.',
        duration: '30 minutes',
        objectives: ['Understand weight limits', 'Know size restrictions', 'Learn permit requirements'],
        resources: ['Weight Limit Chart', 'Size Restriction Guide', 'Permit Requirements'],
        type: 'interactive'
      },
      {
        id: 'cdl-5-3',
        title: 'Hours of Service Regulations',
        description: 'Federal hours of service rules and compliance requirements.',
        duration: '45 minutes',
        objectives: ['Learn hours of service rules', 'Understand compliance requirements', 'Know violation consequences'],
        resources: ['Hours of Service Guide', 'Compliance Checklist', 'Violation Consequences'],
        type: 'simulation'
      },
      {
        id: 'cdl-5-4',
        title: 'Documentation and Record Keeping',
        description: 'Required documentation and record keeping for commercial drivers.',
        duration: '30 minutes',
        objectives: ['Learn required documentation', 'Understand record keeping', 'Know inspection requirements'],
        resources: ['Documentation Checklist', 'Record Keeping Guide', 'Inspection Requirements'],
        type: 'assessment'
      }
    ],
    quiz: {
      questions: 25,
      passingScore: 80,
      timeLimit: 30
    },
    completed: false,
    locked: false,
    orderIndex: 5,
    category: 'regulations'
  },
  {
    id: 'cdl-maintenance',
    title: 'Vehicle Maintenance and Inspection',
    description: 'Basic vehicle maintenance procedures and ongoing inspection requirements.',
    duration: '2 hours',
    objectives: [
      'Perform basic maintenance tasks',
      'Understand maintenance schedules',
      'Recognize maintenance needs',
      'Document maintenance activities'
    ],
    lessons: [
      {
        id: 'cdl-6-1',
        title: 'Daily Maintenance Checks',
        description: 'Essential daily maintenance checks for commercial vehicles.',
        duration: '30 minutes',
        objectives: ['Learn daily check procedures', 'Understand fluid levels', 'Know tire inspection'],
        resources: ['Daily Checklist', 'Fluid Level Guide', 'Tire Inspection Chart'],
        type: 'video'
      },
      {
        id: 'cdl-6-2',
        title: 'Preventive Maintenance',
        description: 'Scheduled maintenance procedures and importance of preventive care.',
        duration: '45 minutes',
        objectives: ['Understand preventive maintenance', 'Learn maintenance schedules', 'Know service intervals'],
        resources: ['Maintenance Schedule', 'Service Intervals', 'Preventive Care Guide'],
        type: 'interactive'
      },
      {
        id: 'cdl-6-3',
        title: 'Troubleshooting Common Issues',
        description: 'Identifying and addressing common vehicle problems.',
        duration: '30 minutes',
        objectives: ['Learn troubleshooting techniques', 'Identify common problems', 'Know when to seek help'],
        resources: ['Troubleshooting Guide', 'Common Problems Chart', 'When to Call for Help'],
        type: 'simulation'
      },
      {
        id: 'cdl-6-4',
        title: 'Maintenance Documentation',
        description: 'Proper documentation of maintenance activities and repairs.',
        duration: '15 minutes',
        objectives: ['Learn documentation requirements', 'Understand record keeping', 'Know compliance needs'],
        resources: ['Documentation Forms', 'Record Keeping Guide', 'Compliance Requirements'],
        type: 'assessment'
      }
    ],
    quiz: {
      questions: 20,
      passingScore: 80,
      timeLimit: 25
    },
    completed: false,
    locked: false,
    orderIndex: 6,
    category: 'maintenance'
  },
  {
    id: 'cdl-road-signs',
    title: 'Road Sign Recognition and Training',
    description: 'Comprehensive training on traffic signs, signals, and markings essential for CDL holders.',
    duration: '3 hours',
    objectives: [
      'Recognize all regulatory signs',
      'Understand warning sign meanings',
      'Master mandatory traffic signs',
      'Apply sign knowledge in real scenarios'
    ],
    lessons: [
      {
        id: 'cdl-7-1',
        title: 'Regulatory Signs Mastery',
        description: 'Learn all regulatory signs including stop, yield, and restriction signs.',
        duration: '45 minutes',
        objectives: ['Identify regulatory signs', 'Understand sign meanings', 'Apply sign rules'],
        resources: ['Regulatory Signs Guide', 'Sign Recognition Chart', 'Practice Quizzes'],
        type: 'interactive'
      },
      {
        id: 'cdl-7-2',
        title: 'Warning Signs and Hazards',
        description: 'Recognize warning signs for curves, intersections, and road conditions.',
        duration: '45 minutes',
        objectives: ['Identify warning signs', 'Understand hazard meanings', 'Respond appropriately'],
        resources: ['Warning Signs Guide', 'Hazard Recognition', 'Response Procedures'],
        type: 'interactive'
      },
      {
        id: 'cdl-7-3',
        title: 'Mandatory Direction Signs',
        description: 'Understand mandatory direction signs and lane restrictions.',
        duration: '30 minutes',
        objectives: ['Recognize mandatory signs', 'Follow directional requirements', 'Navigate restrictions'],
        resources: ['Mandatory Signs Guide', 'Direction Requirements', 'Navigation Tips'],
        type: 'interactive'
      },
      {
        id: 'cdl-7-4',
        title: 'Interactive Sign Training',
        description: 'Practice with our comprehensive road sign training system.',
        duration: '60 minutes',
        objectives: ['Practice sign recognition', 'Take interactive quizzes', 'Master CDL-specific signs'],
        resources: ['Interactive Training System', 'Practice Mode', 'Quiz Generator'],
        type: 'interactive',
        customPath: '/courses/cdl-fundamentals/road-signs'
      }
    ],
    quiz: {
      questions: 30,
      passingScore: 85,
      timeLimit: 35
    },
    completed: false,
    locked: false,
    orderIndex: 7,
    category: 'signs'
  },
  {
    id: 'cdl-final-exam',
    title: 'Final Comprehensive Examination',
    description: 'Complete assessment covering all CDL requirements and practical knowledge.',
    duration: '2 hours',
    objectives: [
      'Demonstrate comprehensive CDL knowledge',
      'Apply all learned skills and procedures',
      'Pass the final certification exam',
      'Prepare for real-world CDL testing'
    ],
    lessons: [
      {
        id: 'cdl-8-1',
        title: 'Comprehensive Review',
        description: 'Complete review of all CDL course materials and procedures.',
        duration: '60 minutes',
        objectives: ['Review all course content', 'Identify knowledge gaps', 'Prepare for final exam'],
        resources: ['Complete Course Review', 'Knowledge Assessment', 'Study Guide'],
        type: 'assessment'
      },
      {
        id: 'cdl-8-2',
        title: 'Practice Exam Session',
        description: 'Take practice exams to prepare for the final assessment.',
        duration: '45 minutes',
        objectives: ['Practice exam format', 'Test knowledge retention', 'Build exam confidence'],
        resources: ['Practice Exams', 'Answer Explanations', 'Performance Tracking'],
        type: 'assessment'
      },
      {
        id: 'cdl-8-3',
        title: 'Final Certification Exam',
        description: 'Comprehensive final exam covering all CDL requirements.',
        duration: '30 minutes',
        objectives: ['Pass final exam', 'Demonstrate competency', 'Earn certification'],
        resources: ['Final Exam', 'Certification Process', 'Results Tracking'],
        type: 'assessment'
      }
    ],
    quiz: {
      questions: 50,
      passingScore: 85,
      timeLimit: 60
    },
    completed: false,
    locked: false,
    orderIndex: 8,
    category: 'assessment'
  }
];

export default cdlCompleteModules



