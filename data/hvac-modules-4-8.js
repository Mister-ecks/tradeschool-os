// HVAC Modules 4-8: Advanced Trade School Content
// Ready for direct platform implementation

export const hvacAdvancedModules = [
  {
    id: 'hvac-module-4',
    title: 'Gas Piping & Combustion Fundamentals',
    description: 'Gas piping systems, safety practices, and combustion theory for HVAC applications',
    duration: 150, // 2.5 hours
    order: 4,
    learningObjectives: [
      'Identify different types of gas piping (steel, copper, CSST, polyethylene)',
      'Understand and apply gas piping codes and standards (CSA B149, NFPA 54)',
      'Size gas piping systems correctly using tables and charts',
      'Perform leak testing safely',
      'Explain combustion theory and efficiency',
      'Diagnose incomplete combustion issues'
    ],
    content: {
      videos: [
        {
          id: 'gas-piping-materials',
          title: 'Gas Piping Materials & Installation',
          description: 'Overview of steel, copper, CSST, and PE piping with installation techniques',
          duration: 15,
          // thumbnail: '/videos/gas-piping-materials-thumbnail.jpg', // TODO: Add video thumbnails
          chapters: [
            { title: 'Black Iron Steel Pipe', timestamp: 0 },
            { title: 'Copper Tubing Applications', timestamp: 300 },
            { title: 'CSST Installation & Bonding', timestamp: 600 },
            { title: 'PE Underground Distribution', timestamp: 900 }
          ]
        },
        {
          id: 'combustion-fundamentals',
          title: 'Combustion Theory & Efficiency',
          description: 'Complete vs incomplete combustion, efficiency calculations, and safety',
          duration: 20,
          // thumbnail: '/videos/combustion-theory-thumbnail.jpg', // TODO: Add video thumbnails
          chapters: [
            { title: 'Combustion Triangle', timestamp: 0 },
            { title: 'Complete Combustion Process', timestamp: 400 },
            { title: 'Incomplete Combustion Dangers', timestamp: 800 },
            { title: 'Efficiency & Troubleshooting', timestamp: 1200 }
          ]
        }
      ],
      texts: [
        {
          id: 'gas-piping-types',
          title: 'Types of Gas Piping Materials',
          type: 'explanation',
          content: `
# Gas Piping Materials for HVAC

## Black Iron Steel Pipe
- **Most common** for gas distribution
- **Threaded connections** with pipe dope
- **Corrosion resistant** with proper coating
- **Code compliant** for most applications

## Copper Tubing
- **Type K** for underground applications
- **Type L** for above ground
- **Flare or compression fittings**
- **Excellent corrosion resistance**

## CSST (Corrugated Stainless Steel Tubing)
- **Flexible** and easy to install
- **Requires bonding** for electrical safety
- **Faster installation** than rigid pipe
- **Must follow manufacturer specs**

## Polyethylene (PE) Pipe
- **Underground distribution only**
- **Fusion welded connections**
- **UV resistant** coating required
- **Long service life**
          `
        }
      ],
      diagrams: [
        {
          id: 'gas-piping-schematic',
          title: 'Gas Piping System Layout',
          // imageUrl: '/diagrams/gas-piping-system.svg', // TODO: Add diagram images
          labels: [
            { x: 10, y: 20, label: 'Gas Meter', description: 'Point of delivery from utility' },
            { x: 30, y: 20, label: 'Main Shutoff', description: 'Emergency shutoff valve' },
            { x: 50, y: 20, label: 'Regulator', description: 'Pressure reduction device' },
            { x: 70, y: 20, label: 'Appliance Shutoff', description: 'Individual appliance control' },
            { x: 90, y: 20, label: 'Furnace', description: 'Gas-fired heating appliance' }
          ],
          interactive: true
        }
      ],
      activities: [
        {
          id: 'gas-piping-sizing',
          title: 'Gas Piping Sizing Exercise',
          type: 'simulation',
          instructions: 'Size gas piping for a residential furnace installation',
          data: {
            scenario: 'Residential furnace with 100,000 BTU input',
            requirements: 'Calculate pipe size for 20 feet run',
            tools: 'Gas piping sizing tables'
          }
        }
      ]
    },
    questions: [
      {
        id: 'gas-piping-material',
        type: 'multiple-choice',
        question: 'Which gas piping material requires electrical bonding?',
        options: [
          'Black iron steel pipe',
          'Copper tubing',
          'CSST',
          'Polyethylene pipe'
        ],
        correctAnswer: 'CSST',
        explanation: 'CSST requires electrical bonding to prevent electrical hazards from lightning strikes.',
        difficulty: 'medium',
        points: 10
      }
    ]
  }
];

export default hvacAdvancedModules







