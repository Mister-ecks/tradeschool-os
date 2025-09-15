// Complete HVAC Course Module Structure
// This file contains the detailed course curriculum with videos, lessons, and assessments

export const hvacCompleteModules = [
  {
    id: 1,
    title: "Module 1: HVAC Introduction & Overview",
    description: "Comprehensive introduction to HVAC systems, terminology, and career opportunities",
    duration: "2.5 hours",
    objectives: [
      "Define HVAC and understand its importance",
      "Identify different types of HVAC systems",
      "Recognize career opportunities in HVAC",
      "Understand safety protocols and procedures"
    ],
    lessons: [
      {
        id: "m1-l1",
        title: "What is HVAC? - Complete Overview",
        description: "Learn the fundamentals of Heating, Ventilation, and Air Conditioning systems",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo1",
        duration: "18:30",
        objectives: [
          "Define HVAC acronym",
          "Understand the purpose of each component",
          "Identify real-world applications"
        ],
        resources: ["HVAC Basics PDF", "Industry Standards Guide"]
      },
      {
        id: "m1-l2",
        title: "Types of HVAC Systems",
        description: "Explore different HVAC system configurations and applications",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo2",
        duration: "22:15",
        objectives: [
          "Compare central vs. split systems",
          "Understand residential vs. commercial systems",
          "Identify system components"
        ],
        resources: ["System Comparison Chart", "Installation Examples"]
      },
      {
        id: "m1-l3",
        title: "HVAC Tools & Equipment Introduction",
        description: "Essential tools every HVAC technician needs to know",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo3",
        duration: "25:45",
        objectives: [
          "Identify basic HVAC tools",
          "Understand tool safety",
          "Learn proper tool maintenance"
        ],
        resources: ["Tool Checklist", "Safety Guidelines", "Maintenance Schedule"]
      },
      {
        id: "m1-l4",
        title: "Career Paths in HVAC",
        description: "Explore various career opportunities and advancement paths",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo4",
        duration: "15:20",
        objectives: [
          "Understand different HVAC career paths",
          "Learn about certification requirements",
          "Explore salary expectations"
        ],
        resources: ["Career Guide", "Certification Roadmap", "Salary Survey"]
      }
    ],
    quiz: {
      id: "m1-quiz",
      title: "Module 1: HVAC Fundamentals Quiz",
      questions: 15,
      passingScore: 80,
      timeLimit: 20
    },
    completed: false,
    locked: false,
    orderIndex: 1
  },
  {
    id: 2,
    title: "Module 2: Safety First - PPE, LOTO & Workplace Hazards",
    description: "Critical safety procedures, personal protective equipment, and hazard identification",
    duration: "3 hours",
    objectives: [
      "Identify and use proper PPE",
      "Execute lockout/tagout procedures",
      "Recognize workplace hazards",
      "Understand emergency procedures"
    ],
    lessons: [
      {
        id: "m2-l1",
        title: "Personal Protective Equipment (PPE)",
        description: "Complete guide to HVAC safety equipment and proper usage",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo5",
        duration: "20:30",
        objectives: [
          "Identify required PPE for different tasks",
          "Demonstrate proper PPE usage",
          "Understand PPE maintenance and replacement"
        ],
        resources: ["PPE Checklist", "Safety Standards", "PPE Inspection Guide"]
      },
      {
        id: "m2-l2",
        title: "Lockout/Tagout (LOTO) Procedures",
        description: "Step-by-step LOTO procedures for electrical and mechanical systems",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo6",
        duration: "28:15",
        objectives: [
          "Execute proper LOTO procedures",
          "Identify energy sources",
          "Use LOTO devices correctly"
        ],
        resources: ["LOTO Procedure Guide", "Energy Source Identification", "LOTO Devices"]
      },
      {
        id: "m2-l3",
        title: "Electrical Safety in HVAC",
        description: "Electrical hazards, safety procedures, and protection methods",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo7",
        duration: "25:40",
        objectives: [
          "Identify electrical hazards",
          "Use electrical safety equipment",
          "Understand electrical safety codes"
        ],
        resources: ["Electrical Safety Guide", "Arc Flash Protection", "Safety Codes"]
      },
      {
        id: "m2-l4",
        title: "Chemical & Refrigerant Safety",
        description: "Safe handling of refrigerants, chemicals, and hazardous materials",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo8",
        duration: "22:50",
        objectives: [
          "Handle refrigerants safely",
          "Understand chemical hazards",
          "Use proper containment procedures"
        ],
        resources: ["Refrigerant Safety Data", "Chemical Handling Guide", "Emergency Procedures"]
      }
    ],
    quiz: {
      id: "m2-quiz",
      title: "Module 2: Safety Procedures Quiz",
      questions: 20,
      passingScore: 85,
      timeLimit: 25
    },
    completed: false,
    locked: true,
    orderIndex: 2
  },
  {
    id: 3,
    title: "Module 3: Heat Transfer & Thermodynamics",
    description: "Fundamental principles of heat transfer, thermodynamics, and energy concepts",
    duration: "3.5 hours",
    objectives: [
      "Understand heat transfer principles",
      "Apply thermodynamic concepts",
      "Calculate heat loads and energy requirements",
      "Analyze system efficiency"
    ],
    lessons: [
      {
        id: "m3-l1",
        title: "Three Modes of Heat Transfer",
        description: "Conduction, convection, and radiation in HVAC systems",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo9",
        duration: "30:15",
        objectives: [
          "Define conduction, convection, and radiation",
          "Identify heat transfer in HVAC systems",
          "Calculate heat transfer rates"
        ],
        resources: ["Heat Transfer Equations", "Calculation Examples", "Practice Problems"]
      },
      {
        id: "m3-l2",
        title: "Sensible vs. Latent Heat",
        description: "Understanding temperature changes vs. phase changes",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo10",
        duration: "26:45",
        objectives: [
          "Distinguish sensible and latent heat",
          "Calculate heat load components",
          "Apply concepts to system design"
        ],
        resources: ["Heat Load Calculations", "Psychrometric Chart", "Load Calculation Software"]
      },
      {
        id: "m3-l3",
        title: "Thermodynamic Cycles",
        description: "Basic thermodynamic cycles and their applications in HVAC",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo11",
        duration: "32:20",
        objectives: [
          "Understand thermodynamic cycles",
          "Analyze cycle efficiency",
          "Apply cycles to HVAC systems"
        ],
        resources: ["Cycle Diagrams", "Efficiency Calculations", "Real System Examples"]
      },
      {
        id: "m3-l4",
        title: "Psychrometrics Fundamentals",
        description: "Air properties, psychrometric charts, and calculations",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo12",
        duration: "28:30",
        objectives: [
          "Read psychrometric charts",
          "Calculate air properties",
          "Design air conditioning processes"
        ],
        resources: ["Psychrometric Chart", "Calculation Tools", "Process Examples"]
      }
    ],
    quiz: {
      id: "m3-quiz",
      title: "Module 3: Heat Transfer & Thermodynamics Quiz",
      questions: 25,
      passingScore: 80,
      timeLimit: 30
    },
    completed: false,
    locked: true,
    orderIndex: 3
  },
  {
    id: 4,
    title: "Module 4: Refrigeration Cycle & Components",
    description: "Deep dive into refrigeration principles, components, and system operation",
    duration: "4 hours",
    objectives: [
      "Explain the refrigeration cycle",
      "Identify system components and functions",
      "Diagnose common refrigeration problems",
      "Perform basic refrigeration calculations"
    ],
    lessons: [
      {
        id: "m4-l1",
        title: "Basic Refrigeration Cycle",
        description: "Step-by-step explanation of the refrigeration cycle",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo13",
        duration: "35:20",
        objectives: [
          "Trace refrigerant through the cycle",
          "Understand pressure and temperature changes",
          "Identify cycle components"
        ],
        resources: ["Cycle Diagram", "P-H Chart", "Component Guide"]
      },
      {
        id: "m4-l2",
        title: "Compressors - Types and Operation",
        description: "Reciprocating, scroll, rotary, and centrifugal compressors",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo14",
        duration: "28:45",
        objectives: [
          "Compare compressor types",
          "Understand compressor operation",
          "Identify compressor components"
        ],
        resources: ["Compressor Comparison", "Cutaway Diagrams", "Performance Curves"]
      },
      {
        id: "m4-l3",
        title: "Condensers and Evaporators",
        description: "Heat exchanger design, types, and performance",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo15",
        duration: "32:15",
        objectives: [
          "Understand heat exchanger principles",
          "Compare different designs",
          "Calculate heat transfer rates"
        ],
        resources: ["Heat Exchanger Types", "Performance Data", "Selection Guide"]
      },
      {
        id: "m4-l4",
        title: "Expansion Devices",
        description: "TXV, capillary tubes, and electronic expansion valves",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo16",
        duration: "26:30",
        objectives: [
          "Compare expansion device types",
          "Understand superheat control",
          "Troubleshoot expansion issues"
        ],
        resources: ["Expansion Device Guide", "Superheat Calculations", "Troubleshooting Chart"]
      }
    ],
    quiz: {
      id: "m4-quiz",
      title: "Module 4: Refrigeration Systems Quiz",
      questions: 30,
      passingScore: 85,
      timeLimit: 35
    },
    completed: false,
    locked: true,
    orderIndex: 4
  },
  {
    id: 5,
    title: "Module 5: Electrical Systems & Controls",
    description: "HVAC electrical systems, control circuits, and troubleshooting",
    duration: "3.5 hours",
    objectives: [
      "Read electrical schematics",
      "Understand control circuits",
      "Use electrical testing equipment",
      "Troubleshoot electrical problems"
    ],
    lessons: [
      {
        id: "m5-l1",
        title: "Electrical Fundamentals for HVAC",
        description: "Basic electrical concepts, Ohm's law, and power calculations",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo17",
        duration: "30:40",
        objectives: [
          "Apply Ohm's law to HVAC circuits",
          "Calculate power consumption",
          "Understand AC vs DC principles"
        ],
        resources: ["Electrical Formulas", "Circuit Examples", "Calculation Worksheets"]
      },
      {
        id: "m5-l2",
        title: "Reading HVAC Wiring Diagrams",
        description: "Schematic symbols, ladder diagrams, and wiring layouts",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo18",
        duration: "28:20",
        objectives: [
          "Read schematic diagrams",
          "Trace electrical circuits",
          "Identify common symbols"
        ],
        resources: ["Symbol Reference", "Sample Schematics", "Diagram Reading Guide"]
      },
      {
        id: "m5-l3",
        title: "Control Systems and Thermostats",
        description: "Manual and automatic controls, thermostats, and sensors",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo19",
        duration: "25:45",
        objectives: [
          "Understand control system operation",
          "Install and wire thermostats",
          "Calibrate control devices"
        ],
        resources: ["Control Wiring Diagrams", "Thermostat Manual", "Calibration Procedures"]
      },
      {
        id: "m5-l4",
        title: "Motors and Motor Controls",
        description: "Single-phase and three-phase motors, starters, and protection",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo20",
        duration: "32:10",
        objectives: [
          "Identify motor types",
          "Wire motor controls",
          "Troubleshoot motor problems"
        ],
        resources: ["Motor Identification Guide", "Wiring Diagrams", "Troubleshooting Chart"]
      }
    ],
    quiz: {
      id: "m5-quiz",
      title: "Module 5: Electrical Systems Quiz",
      questions: 25,
      passingScore: 85,
      timeLimit: 30
    },
    completed: false,
    locked: true,
    orderIndex: 5
  },
  {
    id: 6,
    title: "Module 6: Air Distribution Systems",
    description: "Ductwork design, airflow principles, and ventilation requirements",
    duration: "3 hours",
    objectives: [
      "Design basic ductwork systems",
      "Calculate airflow requirements",
      "Understand ventilation standards",
      "Size and select fans and blowers"
    ],
    lessons: [
      {
        id: "m6-l1",
        title: "Ductwork Design Principles",
        description: "Duct sizing, layout, and design considerations",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo21",
        duration: "28:30",
        objectives: [
          "Size ducts for proper airflow",
          "Design efficient duct layouts",
          "Minimize pressure losses"
        ],
        resources: ["Duct Sizing Charts", "Design Software", "Layout Examples"]
      },
      {
        id: "m6-l2",
        title: "Fans and Air Movement",
        description: "Fan types, performance curves, and selection criteria",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo22",
        duration: "26:15",
        objectives: [
          "Select appropriate fans",
          "Read fan performance curves",
          "Calculate system requirements"
        ],
        resources: ["Fan Selection Guide", "Performance Curves", "Application Examples"]
      },
      {
        id: "m6-l3",
        title: "Ventilation Requirements",
        description: "Building codes, air quality standards, and ventilation calculations",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo23",
        duration: "24:45",
        objectives: [
          "Calculate ventilation requirements",
          "Understand building codes",
          "Design for air quality"
        ],
        resources: ["Ventilation Standards", "Code Requirements", "Calculation Methods"]
      },
      {
        id: "m6-l4",
        title: "Air Filters and Quality",
        description: "Filter types, efficiency ratings, and maintenance",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo24",
        duration: "22:20",
        objectives: [
          "Select appropriate filters",
          "Understand efficiency ratings",
          "Plan maintenance schedules"
        ],
        resources: ["Filter Guide", "Efficiency Charts", "Maintenance Schedule"]
      }
    ],
    quiz: {
      id: "m6-quiz",
      title: "Module 6: Air Distribution Quiz",
      questions: 20,
      passingScore: 80,
      timeLimit: 25
    },
    completed: false,
    locked: true,
    orderIndex: 6
  },
  {
    id: 7,
    title: "Module 7: System Installation & Commissioning",
    description: "Proper installation procedures, testing, and system commissioning",
    duration: "4 hours",
    objectives: [
      "Execute proper installation procedures",
      "Perform system testing and commissioning",
      "Document installation and performance",
      "Train customers on system operation"
    ],
    lessons: [
      {
        id: "m7-l1",
        title: "Equipment Installation Best Practices",
        description: "Step-by-step installation procedures for HVAC equipment",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo25",
        duration: "35:20",
        objectives: [
          "Install equipment safely and correctly",
          "Follow manufacturer specifications",
          "Use proper installation tools"
        ],
        resources: ["Installation Checklists", "Tool Lists", "Safety Procedures"]
      },
      {
        id: "m7-l2",
        title: "Refrigerant Piping and Connections",
        description: "Proper piping techniques, brazing, and leak testing",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo26",
        duration: "32:45",
        objectives: [
          "Install refrigerant piping correctly",
          "Perform proper brazing techniques",
          "Test for leaks effectively"
        ],
        resources: ["Piping Guide", "Brazing Procedures", "Leak Testing Methods"]
      },
      {
        id: "m7-l3",
        title: "System Testing and Commissioning",
        description: "Complete system testing, performance verification, and documentation",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo27",
        duration: "28:30",
        objectives: [
          "Perform comprehensive system tests",
          "Verify performance specifications",
          "Document test results"
        ],
        resources: ["Test Procedures", "Performance Checklists", "Documentation Forms"]
      },
      {
        id: "m7-l4",
        title: "Customer Training and Handover",
        description: "Customer education, warranty information, and maintenance planning",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo28",
        duration: "18:40",
        objectives: [
          "Train customers on system operation",
          "Explain warranty terms",
          "Plan maintenance schedules"
        ],
        resources: ["Customer Training Materials", "Warranty Information", "Maintenance Guides"]
      }
    ],
    quiz: {
      id: "m7-quiz",
      title: "Module 7: Installation & Commissioning Quiz",
      questions: 25,
      passingScore: 85,
      timeLimit: 30
    },
    completed: false,
    locked: true,
    orderIndex: 7
  },
  {
    id: 8,
    title: "Module 8: Troubleshooting & Maintenance",
    description: "Systematic troubleshooting, preventive maintenance, and repair procedures",
    duration: "4.5 hours",
    objectives: [
      "Develop systematic troubleshooting skills",
      "Perform preventive maintenance",
      "Diagnose common system problems",
      "Plan and execute repair procedures"
    ],
    lessons: [
      {
        id: "m8-l1",
        title: "Systematic Troubleshooting Approach",
        description: "Logical problem-solving methodology for HVAC systems",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo29",
        duration: "30:15",
        objectives: [
          "Apply systematic troubleshooting methods",
          "Use diagnostic tools effectively",
          "Document findings and solutions"
        ],
        resources: ["Troubleshooting Flowcharts", "Diagnostic Tools Guide", "Problem-Solution Database"]
      },
      {
        id: "m8-l2",
        title: "Common System Problems",
        description: "Typical failures, symptoms, and repair procedures",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo30",
        duration: "35:30",
        objectives: [
          "Identify common system failures",
          "Diagnose problem symptoms",
          "Execute proper repair procedures"
        ],
        resources: ["Problem Symptom Charts", "Repair Procedures", "Parts Identification"]
      },
      {
        id: "m8-l3",
        title: "Preventive Maintenance Programs",
        description: "Maintenance scheduling, procedures, and documentation",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo31",
        duration: "28:45",
        objectives: [
          "Develop maintenance schedules",
          "Perform routine maintenance tasks",
          "Maintain service records"
        ],
        resources: ["Maintenance Checklists", "Schedule Templates", "Record Keeping Forms"]
      },
      {
        id: "m8-l4",
        title: "Advanced Diagnostic Techniques",
        description: "Using advanced tools and techniques for complex problems",
        videoUrl: "https://www.youtube.com/watch?v=YourHVACVideo32",
        duration: "26:20",
        objectives: [
          "Use advanced diagnostic equipment",
          "Analyze complex system interactions",
          "Solve difficult problems"
        ],
        resources: ["Advanced Tool Guide", "Complex Problem Examples", "Analysis Techniques"]
      }
    ],
    quiz: {
      id: "m8-quiz",
      title: "Module 8: Troubleshooting & Maintenance Quiz",
      questions: 30,
      passingScore: 85,
      timeLimit: 35
    },
    completed: false,
    locked: true,
    orderIndex: 8
  }
];

export const hvacFinalExam = {
  id: "final-exam",
  title: "HVAC Technician Certification Exam",
  description: "Comprehensive final examination covering all course modules",
  questions: 100,
  passingScore: 85,
  timeLimit: 120, // 2 hours
  sections: [
    { name: "Safety and Regulations", questions: 15 },
    { name: "Heat Transfer and Thermodynamics", questions: 20 },
    { name: "Refrigeration Systems", questions: 25 },
    { name: "Electrical Systems", questions: 20 },
    { name: "Air Distribution", questions: 10 },
    { name: "Installation and Commissioning", questions: 10 }
  ]
};

export const courseStatistics = {
  totalDuration: "32 hours",
  totalLessons: 32,
  totalQuizzes: 9, // 8 module quizzes + final exam
  totalVideos: 32,
  skillLevel: "Beginner to Intermediate",
  prerequisites: "Basic mechanical aptitude",
  certification: "HVAC Technician Certificate",
  ceuCredits: 32
};






