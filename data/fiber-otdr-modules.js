export const fiberOtdrModules = [
  {
    id: 'fiber-fundamentals',
    title: 'Fiber Optic Fundamentals',
    description: 'Master the basics of fiber optic technology, safety protocols, and equipment overview.',
    duration: '4 hours',
    objectives: [
      'Understand fiber optic principles and applications',
      'Learn safety protocols and handling procedures',
      'Identify different fiber types and characteristics',
      'Master basic tool usage and maintenance'
    ],
    lessons: [
      {
        id: 'fiber-1-1',
        title: 'Introduction to Fiber Optics',
        description: 'History, applications, and advantages of fiber optic technology.',
        duration: '45 minutes',
        objectives: ['Understand fiber optic history', 'Learn current applications', 'Compare with copper systems'],
        resources: ['Fiber History Timeline', 'Application Examples', 'Market Analysis'],
        type: 'video'
      },
      {
        id: 'fiber-1-2',
        title: 'Fiber Types and Characteristics',
        description: 'Single-mode vs multimode fibers, core/cladding structure, and performance characteristics.',
        duration: '45 minutes',
        objectives: ['Distinguish fiber types', 'Understand performance specs', 'Choose appropriate fiber'],
        resources: ['Fiber Comparison Chart', 'Specification Guide', 'Selection Tool'],
        type: 'interactive'
      },
      {
        id: 'fiber-1-3',
        title: 'Safety and Handling Protocols',
        description: 'Critical safety procedures for working with fiber optic equipment and materials.',
        duration: '30 minutes',
        objectives: ['Learn laser safety', 'Understand chemical safety', 'Master handling procedures'],
        resources: ['Safety Checklist', 'PPE Guide', 'Emergency Procedures'],
        type: 'video'
      },
      {
        id: 'fiber-1-4',
        title: 'Tools and Equipment Overview',
        description: 'Comprehensive overview of fiber optic tools, equipment, and their proper usage.',
        duration: '60 minutes',
        objectives: ['Identify essential tools', 'Learn proper usage', 'Understand maintenance'],
        resources: ['Tool Database', 'Usage Videos', 'Maintenance Schedules'],
        type: 'interactive'
      },
      {
        id: 'fiber-1-5',
        title: 'Fiber Preparation Techniques',
        description: 'Proper methods for stripping, cleaning, and preparing fiber optic cables.',
        duration: '45 minutes',
        objectives: ['Master stripping techniques', 'Learn cleaning procedures', 'Practice cleaving methods'],
        resources: ['Preparation Guide', 'Video Tutorials', 'Practice Exercises'],
        type: 'simulation'
      },
      {
        id: 'fiber-1-6',
        title: 'Fundamentals Assessment',
        description: 'Comprehensive quiz covering all fundamental concepts and safety procedures.',
        duration: '15 minutes',
        objectives: ['Test knowledge retention', 'Verify safety understanding', 'Identify knowledge gaps'],
        resources: ['Practice Questions', 'Answer Explanations', 'Study Guide'],
        type: 'assessment'
      }
    ],
    quiz: { questions: 20, passingScore: 80, timeLimit: 25 },
    completed: false, locked: false, orderIndex: 1, category: 'theory'
  },
  {
    id: 'fusion-splicing-lab',
    title: 'Fusion Splicing Virtual Lab',
    description: 'Hands-on virtual training for fusion splicing techniques and equipment operation.',
    duration: '6 hours',
    objectives: [
      'Master fusion splicing theory and process',
      'Practice virtual splicing with real equipment simulation',
      'Learn troubleshooting and quality assessment',
      'Develop muscle memory for proper techniques'
    ],
    lessons: [
      {
        id: 'fiber-2-1',
        title: 'Fusion Splicing Theory',
        description: 'Understanding the arc fusion process, parameters, and quality factors.',
        duration: '45 minutes',
        objectives: ['Learn fusion process', 'Understand parameters', 'Know quality factors'],
        resources: ['Fusion Process Guide', 'Parameter Chart', 'Quality Standards'],
        type: 'video'
      },
      {
        id: 'fiber-2-2',
        title: 'Splicing Machine Setup',
        description: 'Virtual training on equipment preparation, configuration, and calibration.',
        duration: '60 minutes',
        objectives: ['Setup equipment properly', 'Configure parameters', 'Perform calibration'],
        resources: ['Setup Checklist', 'Configuration Guide', 'Calibration Procedures'],
        type: 'simulation'
      },
      {
        id: 'fiber-2-3',
        title: 'Fiber Preparation Lab',
        description: 'Interactive virtual lab for fiber stripping, cleaning, and cleaving practice.',
        duration: '90 minutes',
        objectives: ['Practice stripping techniques', 'Master cleaning process', 'Perfect cleaving skills'],
        resources: ['Virtual Stripping Station', 'Cleaning Simulator', 'Cleaving Practice'],
        type: 'simulation'
      },
      {
        id: 'fiber-2-4',
        title: 'Fusion Splicing Process',
        description: 'Step-by-step virtual fusion splicing with real-time parameter monitoring.',
        duration: '90 minutes',
        objectives: ['Execute splicing process', 'Monitor parameters', 'Assess quality'],
        resources: ['Virtual Splicer', 'Parameter Monitor', 'Quality Assessment'],
        type: 'simulation'
      },
      {
        id: 'fiber-2-5',
        title: 'Splice Protection and Management',
        description: 'Learn proper splice protection techniques and splice tray management.',
        duration: '45 minutes',
        objectives: ['Apply heat shrink protection', 'Manage splice trays', 'Document splices'],
        resources: ['Protection Guide', 'Tray Management', 'Documentation Forms'],
        type: 'interactive'
      },
      {
        id: 'fiber-2-6',
        title: 'Troubleshooting Common Issues',
        description: 'Identify and resolve common fusion splicing problems and equipment issues.',
        duration: '60 minutes',
        objectives: ['Diagnose high loss', 'Fix arc failures', 'Troubleshoot equipment'],
        resources: ['Troubleshooting Guide', 'Problem Scenarios', 'Solution Database'],
        type: 'simulation'
      },
      {
        id: 'fiber-2-7',
        title: 'Advanced Splicing Techniques',
        description: 'Specialized techniques for ribbon fiber, specialty fibers, and field conditions.',
        duration: '45 minutes',
        objectives: ['Master ribbon splicing', 'Handle specialty fibers', 'Work in field conditions'],
        resources: ['Ribbon Guide', 'Specialty Fiber Info', 'Field Techniques'],
        type: 'simulation'
      },
      {
        id: 'fiber-2-8',
        title: 'Splicing Certification',
        description: 'Comprehensive assessment of fusion splicing skills and knowledge.',
        duration: '15 minutes',
        objectives: ['Demonstrate competency', 'Pass practical test', 'Earn certification'],
        resources: ['Certification Exam', 'Skill Assessment', 'Performance Tracking'],
        type: 'assessment'
      }
    ],
    quiz: { questions: 30, passingScore: 85, timeLimit: 40 },
    completed: false, locked: false, orderIndex: 2, category: 'practical'
  },
  {
    id: 'mechanical-splicing-lab',
    title: 'Mechanical Splicing Virtual Lab',
    description: 'Alternative splicing methods and field applications for mechanical connections.',
    duration: '4 hours',
    objectives: [
      'Understand mechanical splicing applications',
      'Master different mechanical splice types',
      'Practice installation procedures',
      'Compare with fusion splicing'
    ],
    lessons: [
      {
        id: 'fiber-3-1',
        title: 'Mechanical Splicing Overview',
        description: 'Types, applications, and limitations of mechanical splicing methods.',
        duration: '30 minutes',
        objectives: ['Learn splice types', 'Understand applications', 'Know limitations'],
        resources: ['Splice Type Guide', 'Application Chart', 'Limitation List'],
        type: 'video'
      },
      {
        id: 'fiber-3-2',
        title: 'Mechanical Splice Types',
        description: 'Detailed examination of V-groove, capillary, and crimp splice mechanisms.',
        duration: '45 minutes',
        objectives: ['Identify splice types', 'Understand mechanisms', 'Choose appropriate type'],
        resources: ['Splice Mechanism Guide', 'Type Comparison', 'Selection Tool'],
        type: 'interactive'
      },
      {
        id: 'fiber-3-3',
        title: 'Installation Process',
        description: 'Step-by-step virtual installation of mechanical splices with quality verification.',
        duration: '90 minutes',
        objectives: ['Install splices properly', 'Verify quality', 'Test connections'],
        resources: ['Installation Simulator', 'Quality Checker', 'Testing Tools'],
        type: 'simulation'
      },
      {
        id: 'fiber-3-4',
        title: 'Field Applications',
        description: 'Real-world applications including emergency repairs and harsh environments.',
        duration: '45 minutes',
        objectives: ['Apply in emergencies', 'Work in harsh conditions', 'Make temporary connections'],
        resources: ['Field Scenarios', 'Emergency Procedures', 'Harsh Environment Guide'],
        type: 'simulation'
      },
      {
        id: 'fiber-3-5',
        title: 'Comparison with Fusion',
        description: 'Performance, cost, and application comparison between mechanical and fusion splicing.',
        duration: '30 minutes',
        objectives: ['Compare performance', 'Analyze costs', 'Choose appropriate method'],
        resources: ['Comparison Chart', 'Cost Analysis', 'Decision Matrix'],
        type: 'interactive'
      },
      {
        id: 'fiber-3-6',
        title: 'Mechanical Splicing Assessment',
        description: 'Practical assessment of mechanical splicing skills and knowledge.',
        duration: '20 minutes',
        objectives: ['Test installation skills', 'Verify knowledge', 'Demonstrate competency'],
        resources: ['Practical Exam', 'Skill Test', 'Knowledge Quiz'],
        type: 'assessment'
      }
    ],
    quiz: { questions: 25, passingScore: 80, timeLimit: 30 },
    completed: false, locked: false, orderIndex: 3, category: 'practical'
  },
  {
    id: 'otdr-testing-lab',
    title: 'OTDR Testing Virtual Lab',
    description: 'Comprehensive virtual training for OTDR operation, testing, and trace analysis.',
    duration: '8 hours',
    objectives: [
      'Master OTDR operation and configuration',
      'Learn trace analysis and interpretation',
      'Practice troubleshooting and fault location',
      'Develop advanced testing techniques'
    ],
    lessons: [
      {
        id: 'fiber-4-1',
        title: 'OTDR Fundamentals',
        description: 'Understanding how OTDR works, pulse characteristics, and measurement principles.',
        duration: '45 minutes',
        objectives: ['Understand OTDR operation', 'Learn pulse characteristics', 'Know measurement principles'],
        resources: ['OTDR Theory Guide', 'Pulse Characteristics', 'Measurement Principles'],
        type: 'video'
      },
      {
        id: 'fiber-4-2',
        title: 'OTDR Setup and Configuration',
        description: 'Virtual training on parameter selection, fiber type settings, and wavelength configuration.',
        duration: '60 minutes',
        objectives: ['Select proper parameters', 'Configure fiber settings', 'Choose wavelengths'],
        resources: ['Parameter Guide', 'Configuration Tool', 'Wavelength Chart'],
        type: 'simulation'
      },
      {
        id: 'fiber-4-3',
        title: 'Basic OTDR Testing',
        description: 'Hands-on virtual OTDR operation with trace acquisition and basic measurements.',
        duration: '90 minutes',
        objectives: ['Operate OTDR virtually', 'Acquire traces', 'Make basic measurements'],
        resources: ['Virtual OTDR', 'Trace Simulator', 'Measurement Tools'],
        type: 'simulation'
      },
      {
        id: 'fiber-4-4',
        title: 'Trace Analysis',
        description: 'Learn to read and interpret OTDR traces, identify events, and measure losses.',
        duration: '90 minutes',
        objectives: ['Read traces accurately', 'Identify events', 'Measure losses'],
        resources: ['Trace Analysis Guide', 'Event Identification', 'Loss Measurement'],
        type: 'simulation'
      },
      {
        id: 'fiber-4-5',
        title: 'Advanced Testing Techniques',
        description: 'Bidirectional testing, multiple wavelength analysis, and long-haul testing methods.',
        duration: '90 minutes',
        objectives: ['Perform bidirectional tests', 'Use multiple wavelengths', 'Test long distances'],
        resources: ['Bidirectional Guide', 'Multi-wavelength Tool', 'Long-haul Procedures'],
        type: 'simulation'
      },
      {
        id: 'fiber-4-6',
        title: 'Troubleshooting with OTDR',
        description: 'Use OTDR for fault location, high loss identification, and connector problem diagnosis.',
        duration: '90 minutes',
        objectives: ['Locate faults', 'Identify high loss', 'Diagnose connector problems'],
        resources: ['Fault Location Guide', 'Loss Analysis', 'Connector Diagnostics'],
        type: 'simulation'
      },
      {
        id: 'fiber-4-7',
        title: 'OTDR Calibration',
        description: 'Reference fiber setup, calibration procedures, and verification methods.',
        duration: '45 minutes',
        objectives: ['Setup reference fibers', 'Perform calibration', 'Verify accuracy'],
        resources: ['Calibration Guide', 'Reference Setup', 'Verification Procedures'],
        type: 'interactive'
      },
      {
        id: 'fiber-4-8',
        title: 'Documentation and Reporting',
        description: 'Proper trace documentation, report generation, and data management practices.',
        duration: '45 minutes',
        objectives: ['Document traces properly', 'Generate reports', 'Manage data'],
        resources: ['Documentation Guide', 'Report Templates', 'Data Management'],
        type: 'interactive'
      },
      {
        id: 'fiber-4-9',
        title: 'Field Testing Scenarios',
        description: 'Real-world testing scenarios including emergency testing and network validation.',
        duration: '60 minutes',
        objectives: ['Handle emergencies', 'Validate networks', 'Test in field conditions'],
        resources: ['Emergency Procedures', 'Network Validation', 'Field Testing Guide'],
        type: 'simulation'
      },
      {
        id: 'fiber-4-10',
        title: 'OTDR Certification',
        description: 'Comprehensive assessment of OTDR operation, analysis, and troubleshooting skills.',
        duration: '30 minutes',
        objectives: ['Demonstrate OTDR skills', 'Pass practical test', 'Earn certification'],
        resources: ['Certification Exam', 'Skill Assessment', 'Performance Tracking'],
        type: 'assessment'
      }
    ],
    quiz: { questions: 40, passingScore: 85, timeLimit: 50 },
    completed: false, locked: false, orderIndex: 4, category: 'testing'
  },
  {
    id: 'network-design-installation',
    title: 'Network Design and Installation',
    description: 'Practical applications for fiber optic network design, installation, and commissioning.',
    duration: '6 hours',
    objectives: [
      'Design fiber optic networks',
      'Plan and execute installations',
      'Install connectors and closures',
      'Test and commission networks'
    ],
    lessons: [
      {
        id: 'fiber-5-1',
        title: 'Network Topologies',
        description: 'Understanding point-to-point, ring, and mesh network architectures.',
        duration: '45 minutes',
        objectives: ['Understand topologies', 'Choose appropriate design', 'Plan network layout'],
        resources: ['Topology Guide', 'Design Tools', 'Layout Planning'],
        type: 'interactive'
      },
      {
        id: 'fiber-5-2',
        title: 'Cable Selection',
        description: 'Choosing appropriate cables for indoor, outdoor, and specialized applications.',
        duration: '60 minutes',
        objectives: ['Select indoor cables', 'Choose outdoor cables', 'Consider special applications'],
        resources: ['Cable Selection Guide', 'Application Chart', 'Specification Database'],
        type: 'interactive'
      },
      {
        id: 'fiber-5-3',
        title: 'Installation Planning',
        description: 'Route planning, pulling tensions, and bend radius considerations.',
        duration: '60 minutes',
        objectives: ['Plan cable routes', 'Calculate tensions', 'Ensure proper bend radius'],
        resources: ['Route Planning Tool', 'Tension Calculator', 'Bend Radius Guide'],
        type: 'simulation'
      },
      {
        id: 'fiber-5-4',
        title: 'Cable Installation',
        description: 'Virtual training on pulling techniques, conduit installation, and aerial methods.',
        duration: '90 minutes',
        objectives: ['Master pulling techniques', 'Install conduits', 'Handle aerial installation'],
        resources: ['Pulling Simulator', 'Conduit Installation', 'Aerial Procedures'],
        type: 'simulation'
      },
      {
        id: 'fiber-5-5',
        title: 'Connector Installation',
        description: 'Step-by-step connector installation, polishing, and testing procedures.',
        duration: '90 minutes',
        objectives: ['Install connectors', 'Polish properly', 'Test connections'],
        resources: ['Connector Installation', 'Polishing Guide', 'Testing Procedures'],
        type: 'simulation'
      },
      {
        id: 'fiber-5-6',
        title: 'Splice Closures',
        description: 'Installation and management of splice closures for various applications.',
        duration: '60 minutes',
        objectives: ['Install closures', 'Manage splices', 'Ensure environmental sealing'],
        resources: ['Closure Installation', 'Splice Management', 'Sealing Procedures'],
        type: 'simulation'
      },
      {
        id: 'fiber-5-7',
        title: 'Testing and Commissioning',
        description: 'End-to-end testing, documentation requirements, and acceptance criteria.',
        duration: '60 minutes',
        objectives: ['Perform end-to-end tests', 'Complete documentation', 'Meet acceptance criteria'],
        resources: ['Testing Procedures', 'Documentation Forms', 'Acceptance Criteria'],
        type: 'simulation'
      },
      {
        id: 'fiber-5-8',
        title: 'Installation Certification',
        description: 'Comprehensive assessment of installation skills and network commissioning.',
        duration: '30 minutes',
        objectives: ['Demonstrate installation skills', 'Pass practical test', 'Earn certification'],
        resources: ['Certification Exam', 'Skill Assessment', 'Performance Tracking'],
        type: 'assessment'
      }
    ],
    quiz: { questions: 35, passingScore: 80, timeLimit: 45 },
    completed: false, locked: false, orderIndex: 5, category: 'installation'
  },
  {
    id: 'advanced-topics-certification',
    title: 'Advanced Topics and Certification',
    description: 'Specialized fiber optic technologies and comprehensive certification preparation.',
    duration: '4 hours',
    objectives: [
      'Master specialty fiber applications',
      'Understand WDM and FTTH systems',
      'Learn data center applications',
      'Prepare for industry certifications'
    ],
    lessons: [
      {
        id: 'fiber-6-1',
        title: 'Specialty Fibers',
        description: 'Polarization maintaining, bend insensitive, and high power fiber applications.',
        duration: '45 minutes',
        objectives: ['Understand specialty fibers', 'Learn applications', 'Know handling requirements'],
        resources: ['Specialty Fiber Guide', 'Application Examples', 'Handling Procedures'],
        type: 'video'
      },
      {
        id: 'fiber-6-2',
        title: 'WDM Systems',
        description: 'Wavelength division multiplexing, channel planning, and system testing.',
        duration: '60 minutes',
        objectives: ['Understand WDM principles', 'Plan channels', 'Test WDM systems'],
        resources: ['WDM Guide', 'Channel Planner', 'System Testing'],
        type: 'interactive'
      },
      {
        id: 'fiber-6-3',
        title: 'Fiber to the Home (FTTH)',
        description: 'PON technologies, installation techniques, and testing procedures.',
        duration: '60 minutes',
        objectives: ['Learn PON technologies', 'Master installation', 'Test FTTH systems'],
        resources: ['PON Guide', 'Installation Procedures', 'FTTH Testing'],
        type: 'simulation'
      },
      {
        id: 'fiber-6-4',
        title: 'Data Center Applications',
        description: 'High-density installations, MPO connectors, and testing requirements.',
        duration: '45 minutes',
        objectives: ['Handle high-density', 'Use MPO connectors', 'Meet testing requirements'],
        resources: ['High-Density Guide', 'MPO Procedures', 'Testing Requirements'],
        type: 'simulation'
      },
      {
        id: 'fiber-6-5',
        title: 'Maintenance and Repair',
        description: 'Preventive maintenance, emergency repairs, and documentation updates.',
        duration: '45 minutes',
        objectives: ['Perform maintenance', 'Handle repairs', 'Update documentation'],
        resources: ['Maintenance Schedule', 'Repair Procedures', 'Documentation Updates'],
        type: 'interactive'
      },
      {
        id: 'fiber-6-6',
        title: 'Final Comprehensive Exam',
        description: 'Complete assessment covering all fiber optic knowledge and practical skills.',
        duration: '45 minutes',
        objectives: ['Demonstrate mastery', 'Pass final exam', 'Earn certification'],
        resources: ['Final Exam', 'Comprehensive Assessment', 'Certification Process'],
        type: 'assessment'
      }
    ],
    quiz: { questions: 50, passingScore: 85, timeLimit: 60 },
    completed: false, locked: false, orderIndex: 6, category: 'advanced'
  }
]

export const fiberOtdrCourse = {
  id: 'fiber-otdr-training',
  title: 'Fiber & OTDR Training Program',
  description: 'Comprehensive fiber optic training covering splicing, OTDR testing, network design, and installation. Master the skills needed for fiber optic certification and real-world applications.',
  category: 'Telecommunications',
  difficulty: 'Intermediate to Advanced',
  duration: '32 hours',
  price: 1299,
  rating: 4.9,
  studentsCount: 2150,
  instructor: {
    name: 'Sarah Chen',
    title: 'Fiber Optic Master Instructor',
    avatar: '/instructors/sarah-chen.jpg',
    experience: '12+ years',
    students: 4500,
    rating: 4.9,
    bio: 'Fiber Optic Master Instructor with 12+ years of experience in telecommunications and network infrastructure. Former lead technician for major telecom companies and certified trainer for multiple fiber optic organizations.',
    credentials: ['CFOT Certified', 'FOT Master Instructor', 'BICSI Certified', 'RCDD Certified', 'Fiber Optic Association Member']
  },
  features: [
    'Virtual Fusion Splicing Lab',
    'Interactive OTDR Testing',
    '3D Network Design Tools',
    'Tool Scanning Integration',
    'Real-time Performance Tracking',
    'Industry Certification Prep',
    'Mobile Learning Support',
    '24/7 Instructor Support'
  ],
  requirements: [
    'Basic understanding of telecommunications',
    'High school diploma or equivalent',
    'Computer with internet access',
    'Willingness to learn technical skills',
    'Commitment to safety protocols'
  ],
  outcomes: [
    'Master fusion and mechanical splicing',
    'Proficient in OTDR operation and analysis',
    'Design and install fiber optic networks',
    'Troubleshoot fiber optic systems',
    'Prepare for industry certifications',
    'Apply skills in real-world scenarios'
  ],
  modules: fiberOtdrModules,
  curriculum: fiberOtdrModules.map(module => ({
    id: module.id,
    title: module.title,
    duration: module.duration,
    description: module.description,
    objectives: module.objectives,
    videos: module.lessons.filter(l => l.type === 'video').length,
    activities: module.lessons.filter(l => l.type === 'interactive' || l.type === 'simulation').length,
    questions: module.quiz.questions
  })),
  statistics: {
    totalDuration: '32 hours',
    totalLessons: 48,
    totalModules: 6,
    completionRate: 94,
    averageRating: 4.9
  }
}
