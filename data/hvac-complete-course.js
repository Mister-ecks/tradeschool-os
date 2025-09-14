// Complete HVAC Course with Modules 1, 2, and 3
// Ready for direct platform implementation

export const hvacModule1KahootQuiz = [
  {
    id: 'kahoot-hvac-stands',
    question: 'What does HVAC stand for?',
    type: 'multiple-choice',
    options: [
      'Heating, Ventilation, Air Conditioning',
      'Heating, Vacuum, Air Chamber', 
      'Humidity, Ventilation, Air Cooling',
      'Heat, Vapor, Air Control'
    ],
    correctAnswer: 'Heating, Ventilation, Air Conditioning',
    timeLimit: 20,
    points: 1000
  },
  {
    id: 'kahoot-electrical-tool',
    question: 'Which tool measures electrical values?',
    type: 'multiple-choice',
    options: [
      'Pipe bender',
      'Multimeter',
      'Leak detector', 
      'Vacuum pump'
    ],
    correctAnswer: 'Multimeter',
    timeLimit: 20,
    points: 1000
  },
  {
    id: 'kahoot-ductwork-heating',
    question: 'True or False: Ductwork is part of the heating system only.',
    type: 'true-false',
    correctAnswer: 'False',
    timeLimit: 15,
    points: 800
  },
  {
    id: 'kahoot-lockout-tagout',
    question: 'Which safety practice ensures a machine cannot be powered on during maintenance?',
    type: 'multiple-choice',
    options: [
      'Fire drill',
      'Lockout/Tagout',
      'Grounding',
      'Double insulation'
    ],
    correctAnswer: 'Lockout/Tagout',
    timeLimit: 25,
    points: 1200
  },
  {
    id: 'kahoot-thermostat-function',
    question: 'What is the function of a thermostat?',
    type: 'multiple-choice',
    options: [
      'Distributes air',
      'Measures refrigerant pressure', 
      'Controls system operation',
      'Stores energy'
    ],
    correctAnswer: 'Controls system operation',
    timeLimit: 20,
    points: 1000
  }
]

export const hvacModule2KahootQuiz = [
  {
    id: 'kahoot-ppe-purpose',
    question: 'What is the primary purpose of PPE in HVAC work?',
    type: 'multiple-choice',
    options: [
      'Look professional',
      'Company requirements',
      'Protect from workplace hazards',
      'Tool organization'
    ],
    correctAnswer: 'Protect from workplace hazards',
    timeLimit: 20,
    points: 1000
  },
  {
    id: 'kahoot-loto-sequence',
    question: 'Correct sequence for LOTO procedure:',
    type: 'multiple-choice',
    options: [
      'Lock, Tag, Test, Work',
      'Test, Lock, Tag, Work', 
      'Tag, Lock, Test, Work',
      'Work, Test, Lock, Tag'
    ],
    correctAnswer: 'Test, Lock, Tag, Work',
    timeLimit: 30,
    points: 1500
  },
  {
    id: 'kahoot-refrigerant-storage',
    question: 'Refrigerant cylinders must always be stored:',
    type: 'fill-blank',
    correctAnswer: 'Upright',
    timeLimit: 15,
    points: 800
  },
  {
    id: 'kahoot-remove-lock',
    question: 'True/False: Removing another worker\'s lock is acceptable if they\'re absent.',
    type: 'true-false',
    correctAnswer: 'False',
    timeLimit: 15,
    points: 800
  },
  {
    id: 'kahoot-safety-glasses',
    question: 'Safety glasses protect against:',
    type: 'multiple-choice',
    options: [
      'Loud noises',
      'Flying debris',
      'Chemical smells',
      'Electric shock'
    ],
    correctAnswer: 'Flying debris',
    timeLimit: 20,
    points: 1000
  }
]

export const hvacModule3KahootQuiz = [
  {
    id: 'kahoot-latent-heat',
    question: 'Which type of heat is absorbed when refrigerant boils?',
    type: 'multiple-choice',
    options: [
      'Sensible heat',
      'Latent heat',
      'Radiant heat',
      'Conductive heat'
    ],
    correctAnswer: 'Latent heat',
    timeLimit: 25,
    points: 1200
  },
  {
    id: 'kahoot-heat-flow',
    question: 'Heat always flows from ___ to ___:',
    type: 'fill-blank',
    correctAnswer: 'Hot to Cold',
    timeLimit: 20,
    points: 1000
  },
  {
    id: 'kahoot-three-modes',
    question: 'What are the 3 modes of heat transfer?',
    type: 'multiple-choice',
    options: [
      'Conduction, Convection, Radiation',
      'Heating, Cooling, Ventilation',
      'Solid, Liquid, Gas',
      'Hot, Warm, Cold'
    ],
    correctAnswer: 'Conduction, Convection, Radiation',
    timeLimit: 25,
    points: 1200
  },
  {
    id: 'kahoot-sensible-heat',
    question: 'Sensible heat is measured by a:',
    type: 'multiple-choice',
    options: [
      'Pressure gauge',
      'Thermometer',
      'Flow meter',
      'Scale'
    ],
    correctAnswer: 'Thermometer',
    timeLimit: 20,
    points: 1000
  },
  {
    id: 'kahoot-condenser-function',
    question: 'Which HVAC component rejects heat outdoors?',
    type: 'multiple-choice',
    options: [
      'Evaporator',
      'Compressor',
      'Condenser',
      'Expansion valve'
    ],
    correctAnswer: 'Condenser',
    timeLimit: 20,
    points: 1000
  }
]

// Diagram Specifications for Graphics Team
export const hvacDiagramSpecs = {
  module1: {
    centralHvacSystem: {
      title: 'Central HVAC System Schematic',
      description: 'Show complete system with airflow path',
      elements: [
        'Furnace/heat exchanger (left side)',
        'Supply ducts (top, branching out)',
        'Supply vents (in rooms, top right)',
        'Return vents (in rooms, bottom right)', 
        'Return ducts (bottom, leading back)',
        'Air filter (before furnace)',
        'Blower fan (in central unit)',
        'Thermostat (on wall)'
      ],
      airflowArrows: 'Show direction: Furnace → Supply ducts → Vents → Rooms → Return vents → Return ducts → Filter → Furnace',
      colorCoding: 'Blue for cool air, red for warm air, green for return air'
    },
    ppeDiagram: {
      title: 'HVAC Technician Complete PPE Setup',
      description: 'Full-body view of worker with labeled PPE',
      elements: [
        'Safety glasses (on face)',
        'Hard hat (on head, if required)',
        'Work gloves (on hands)', 
        'High-vis vest (on torso)',
        'Tool belt (around waist)',
        'Steel-toe boots (on feet)'
      ],
      style: 'Professional technical illustration, front view'
    },
    toolboxDiagram: {
      title: 'Essential HVAC Tools Layout',
      description: 'Open toolbox showing organized HVAC tools',
      tools: [
        'Manifold gauges (prominent, top left)',
        'Multimeter (top center)',
        'Pipe bender (top right)',
        'Vacuum pump (bottom left)',
        'Leak detector (bottom center)',
        'Tubing cutter (bottom right)',
        'Torch set (side compartment)',
        'Recovery machine (larger, separate)'
      ],
      labels: 'Clear labels pointing to each tool with brief description'
    }
  },

  module2: {
    hazardZones: {
      title: 'Workplace Hazard Zones in Mechanical Room',
      description: 'Color-coded hazard map of typical mechanical room',
      zones: [
        'RED zones: Electrical panels, high-voltage equipment',
        'YELLOW zones: Ladders, ductwork, confined spaces, moving parts',
        'GREEN zones: Safe walkways, tool storage areas'
      ],
      elements: [
        'Electrical panels (red)',
        'Compressors (red)',
        'Ductwork with sharp edges (yellow)',
        'Ladder access (yellow)',
        'Safe walking paths (green)',
        'Emergency exits (green)'
      ]
    },
    lotoProcess: {
      title: 'Lockout/Tagout Process Flow',
      description: 'Step-by-step LOTO procedure diagram',
      steps: [
        'Step 1: Identify energy sources',
        'Step 2: Notify affected workers',
        'Step 3: Shut down equipment normally',
        'Step 4: Isolate energy sources',
        'Step 5: Apply locks and tags',
        'Step 6: Test to verify isolation',
        'Step 7: Perform maintenance work',
        'Step 8: Remove locks/tags and restore'
      ],
      visuals: 'Show actual lock, tag, and testing equipment'
    }
  },

  module3: {
    heatTransferModes: {
      title: 'Three Modes of Heat Transfer in HVAC',
      description: 'Split diagram showing all three modes',
      sections: [
        'CONDUCTION: Heat through copper pipe wall',
        'CONVECTION: Warm air moving through duct',
        'RADIATION: Sun heating building roof'
      ],
      arrows: 'Heat flow arrows in each section',
      examples: 'Real HVAC examples for each mode'
    },
    refrigerationCycle: {
      title: 'HVAC Refrigeration Cycle Heat Flow',
      description: 'Simplified cycle showing heat absorption and rejection',
      components: [
        'Indoor unit with evaporator (heat absorption)',
        'Outdoor unit with condenser (heat rejection)',
        'Refrigerant lines connecting units',
        'Heat flow arrows (in and out)'
      ],
      labels: [
        'Heat absorbed indoors (blue arrows in)',
        'Heat rejected outdoors (red arrows out)',
        'Refrigerant flow (green arrows)'
      ]
    }
  }
}

// Video Content Specifications
export const hvacVideoSpecs = {
  module1: {
    whatIsHvac: {
      title: '5-Minute HVAC Explainer',
      duration: '5:00',
      style: 'Animated with clear graphics',
      chapters: [
        '0:00-1:20 - HVAC Definition & Importance',
        '1:20-2:40 - Main System Components',
        '2:40-4:00 - System Types (Residential/Commercial)',
        '4:00-5:00 - Real-World Applications'
      ],
      keyVisuals: [
        'HVAC acronym breakdown animation',
        'System component animations',
        'Split-system vs central system comparison',
        'Building cutaway showing HVAC operation'
      ]
    },
    safetyWorkshop: {
      title: 'PPE, Tools & Safety Workshop',
      duration: '10:00',
      style: 'Live demonstration with real equipment',
      chapters: [
        '0:00-3:00 - PPE Demonstration & Proper Usage',
        '3:00-6:00 - Common HVAC Tools Introduction',
        '6:00-8:00 - Lockout/Tagout Procedure Demo',
        '8:00-10:00 - Safety Checklist & Best Practices'
      ],
      equipment: [
        'Full PPE kit for demonstration',
        'Common HVAC tools laid out',
        'Training electrical panel for LOTO demo',
        'Safety checklist displays'
      ]
    }
  }
}

export default {
  modules: 3,
  totalDuration: 420, // 7 hours
  kahootQuizzes: [hvacModule1KahootQuiz, hvacModule2KahootQuiz, hvacModule3KahootQuiz],
  diagramSpecs: hvacDiagramSpecs,
  videoSpecs: hvacVideoSpecs,
  implementationReady: true
}

