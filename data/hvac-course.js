// HVAC Course Module Data
export const hvacCourse = [
  {
    id: 'hvac-module-1',
    title: 'Introduction to HVAC & Safety',
    description: 'Complete introduction to HVAC systems with essential safety protocols',
    duration: 180, // 2-3 hours as specified
    order: 1,
    learningObjectives: [
      'Explain what HVAC means and its importance in residential, commercial, and industrial settings',
      'Identify the main components of HVAC systems',
      'Apply basic workplace safety protocols (PPE, hazard awareness, and lockout/tagout)',
      'Recognize common HVAC tools and their applications'
    ],
    content: {
      videos: [
        {
          id: 'hvac-what-is-hvac',
          title: 'What is HVAC? - 5 Minute Explainer',
          description: 'Animated overview of HVAC systems and their importance in modern buildings',
          duration: 5,
          thumbnail: '/videos/hvac-explainer-thumbnail.jpg',
          chapters: [
            { title: 'HVAC Definition', timestamp: 0 },
            { title: 'Main Components', timestamp: 120 },
            { title: 'System Types', timestamp: 240 },
            { title: 'Real-World Applications', timestamp: 300 }
          ]
        },
        {
          id: 'hvac-safety-workshop',
          title: 'PPE, Tools & Safety Workshop',
          description: 'Hands-on demonstration of PPE usage, tool introduction, and lockout/tagout procedures',
          duration: 10,
          thumbnail: '/videos/hvac-safety-workshop-thumbnail.jpg',
          chapters: [
            { title: 'Personal Protective Equipment', timestamp: 0 },
            { title: 'Common HVAC Tools', timestamp: 300 },
            { title: 'Lockout/Tagout Demo', timestamp: 480 },
            { title: 'Safety Checklist', timestamp: 540 }
          ]
        }
      ],
      texts: [
        {
          id: 'hvac-definition',
          title: '1. What is HVAC?',
          type: 'definition',
          content: `
# What is HVAC?

HVAC stands for **Heating, Ventilation, and Air Conditioning**.

## Core Functions:
- **Heating** → Warming indoor spaces
- **Ventilation** → Air circulation and fresh air exchange  
- **Air Conditioning** → Cooling and dehumidifying indoor air

## Why HVAC Matters:
- Regulates **temperature, humidity, and air quality**
- Essential for **residential homes, schools, hospitals, data centers, manufacturing plants**
- Critical for **productivity** and **health** in modern buildings
- Supports **food preservation** and **cold storage** systems

## Key Industries Using HVAC:
- **Residential**: Homes, apartments, condos
- **Commercial**: Offices, retail stores, restaurants
- **Industrial**: Factories, warehouses, processing plants
- **Institutional**: Schools, hospitals, government buildings
          `
        },
        {
          id: 'hvac-main-components',
          title: '2. Main HVAC Components',
          type: 'explanation',
          content: `
# Main HVAC System Components

## Primary Components:
- **Furnace/Boiler** → Provides heating
- **Air Conditioner/Heat Pump** → Provides cooling
- **Ductwork** → Distributes air throughout building
- **Thermostat** → Controls and regulates system operation
- **Refrigerant Lines** → Carries heat transfer medium

## How They Work Together:
1. **Thermostat** senses temperature and signals system
2. **Furnace or AC** conditions the air (heats or cools)
3. **Ductwork** distributes conditioned air via supply vents
4. **Return vents** bring air back to be reconditioned
5. **Filters** clean air before it recirculates

## System Flow:
Air In → Furnace/AC → Ducts → Supply Vents → Living Space → Return Vents → Filter → Repeat
          `
        },
        {
          id: 'hvac-safety-basics',
          title: '3. Safety Basics in HVAC',
          type: 'procedure',
          content: `
# Essential Safety Protocols for HVAC Work

## Personal Protective Equipment (PPE):
- **Safety glasses** → Eye protection from debris
- **Work gloves** → Hand protection from cuts and chemicals
- **Steel-toe boots** → Foot protection from heavy equipment
- **Hearing protection** → In loud mechanical rooms

## Critical Safety Procedures:
### Lockout/Tagout (LOTO):
- Always **de-energize equipment** before servicing
- Use **lock + tag** with your name, date, and purpose
- **Verify with tester** before starting work
- **Never remove** someone else's lock

### Refrigerant Safety:
- Handle **refrigerants carefully** → avoid direct skin contact
- Prevent **leaks** → environmental and safety hazard
- Use proper **recovery equipment** when removing refrigerant
- Ensure adequate **ventilation** in enclosed spaces

## Workplace Hazards to Watch For:
- **Electrical hazards** → Live wires, control panels
- **Sharp metal edges** → Ductwork, sheet metal
- **Heavy lifting** → Compressors, condensers
- **Confined spaces** → Mechanical rooms, crawl spaces
- **Fall hazards** → Rooftop units, ladders
          `
        },
        {
          id: 'hvac-common-tools',
          title: '4. Common Tools for HVAC Technicians',
          type: 'explanation',
          content: `
# Essential HVAC Tools

## Measurement & Testing Tools:
- **Manifold Gauges** → Measure refrigerant pressures
- **Multimeter** → Test electrical values (voltage, current, resistance)
- **Thermometer** → Measure air and surface temperatures
- **Manometer** → Measure gas pressures

## Hand Tools:
- **Pipe Bender** → Shape copper refrigerant lines
- **Tubing Cutter** → Cut copper pipes cleanly
- **Wrenches** → Various sizes for fittings and nuts
- **Screwdrivers** → Phillips and flathead varieties

## Power Tools:
- **Drill** → Make holes for mounting and routing
- **Reciprocating Saw** → Cut through various materials
- **Angle Grinder** → Cut metal and remove material

## Specialized HVAC Tools:
- **Vacuum Pump** → Remove air and moisture from systems
- **Leak Detector** → Find refrigerant leaks
- **Recovery Machine** → Safely remove refrigerant
- **Torch Set** → Brazing and soldering connections

## Tool Safety:
- **Inspect tools** before each use
- **Use proper tool** for each job
- **Keep tools clean** and well-maintained
- **Store safely** when not in use
          `
        }
      ],
      diagrams: [
        {
          id: 'hvac-system-schematic',
          title: 'Central HVAC System Schematic',
          imageUrl: '/diagrams/hvac-system-schematic.svg',
          labels: [
            { x: 20, y: 30, label: 'Furnace/Heat Exchanger', description: 'Heats or cools incoming air' },
            { x: 50, y: 15, label: 'Supply Ducts', description: 'Distribute conditioned air' },
            { x: 80, y: 25, label: 'Supply Vents', description: 'Deliver air to rooms' },
            { x: 80, y: 75, label: 'Return Vents', description: 'Collect air for reconditioning' },
            { x: 50, y: 85, label: 'Return Ducts', description: 'Return air to system' },
            { x: 20, y: 70, label: 'Air Filter', description: 'Clean air before reconditioning' },
            { x: 35, y: 50, label: 'Blower Fan', description: 'Moves air through system' },
            { x: 65, y: 50, label: 'Thermostat', description: 'Controls system operation' }
          ],
          interactive: true
        }
      ],
      activities: [
        {
          id: 'hvac-components-matching',
          title: 'Match HVAC Components to Functions',
          type: 'drag-drop',
          instructions: 'Drag each HVAC component to its primary function',
          data: {
            items: [
              { id: 'furnace', text: 'Furnace/Boiler', category: 'component' },
              { id: 'ductwork', text: 'Ductwork', category: 'component' },
              { id: 'thermostat', text: 'Thermostat', category: 'component' },
              { id: 'air-conditioner', text: 'Air Conditioner', category: 'component' },
              { id: 'refrigerant-lines', text: 'Refrigerant Lines', category: 'component' }
            ],
            targets: [
              { id: 'heating', text: 'Provides Heating', accepts: ['furnace'] },
              { id: 'cooling', text: 'Provides Cooling', accepts: ['air-conditioner'] },
              { id: 'distribution', text: 'Air Distribution', accepts: ['ductwork'] },
              { id: 'control', text: 'System Control', accepts: ['thermostat'] },
              { id: 'heat-transfer', text: 'Heat Transfer Medium', accepts: ['refrigerant-lines'] }
            ]
          }
        }
      ]
    },
    questions: [
      {
        id: 'hvac-stands-for',
        type: 'multiple-choice',
        question: 'What does HVAC stand for?',
        options: [
          'Heating, Ventilation, and Air Conditioning',
          'Heating, Vacuum, Air Chamber',
          'Humidity, Ventilation, Air Cooling',
          'Heat, Vapor, Air Control'
        ],
        correctAnswer: 'Heating, Ventilation, and Air Conditioning',
        explanation: 'HVAC stands for Heating, Ventilation, and Air Conditioning - the three core functions of environmental control systems.',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'ductwork-function',
        type: 'multiple-choice',
        question: 'Which part of the HVAC system distributes air throughout a building?',
        options: [
          'Thermostat',
          'Ductwork',
          'Condenser',
          'Compressor'
        ],
        correctAnswer: 'Ductwork',
        explanation: 'Ductwork is the network of tubes that distributes conditioned air from the central unit to different areas of the building.',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'ppe-stands-for',
        type: 'multiple-choice',
        question: 'What does PPE stand for?',
        options: [
          'Personal Protection Equipment',
          'Personal Protective Equipment',
          'Pressure Pump Equipment',
          'Professional Protection Elements'
        ],
        correctAnswer: 'Personal Protective Equipment',
        explanation: 'PPE stands for Personal Protective Equipment - gear worn to protect workers from workplace hazards.',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'multimeter-function',
        type: 'multiple-choice',
        question: 'Which tool measures electrical values in HVAC systems?',
        options: [
          'Pipe bender',
          'Multimeter',
          'Leak detector',
          'Vacuum pump'
        ],
        correctAnswer: 'Multimeter',
        explanation: 'A multimeter measures electrical values including voltage, current, and resistance - essential for electrical troubleshooting.',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'refrigerant-handling-safety',
        type: 'true-false',
        question: 'Refrigerants can be handled safely without gloves.',
        correctAnswer: 'False',
        explanation: 'Refrigerants should always be handled with appropriate gloves to prevent frostbite and skin contact with chemicals.',
        difficulty: 'easy',
        points: 5
      }
    ]
  }
];

export default hvacCourse






