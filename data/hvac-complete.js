// Complete HVAC Course with all modules (simple export for testing)

export const hvacCompleteCourse = {
  modules: [
    {
      id: 'hvac-module-1',
      title: 'Introduction to HVAC & Safety',
      description: 'Learn HVAC basics, safety protocols, and tools',
      duration: 180,
      order: 1,
      completed: true,
      locked: false
    },
    {
      id: 'hvac-module-2', 
      title: 'Safety Training & Workplace Practices',
      description: 'Workplace hazards, PPE, and safety standards',
      duration: 120,
      order: 2,
      completed: false,
      locked: false
    },
    {
      id: 'hvac-module-3',
      title: 'Basic Thermodynamics & Heat Transfer',
      description: 'Heat transfer principles and thermodynamic laws',
      duration: 90,
      order: 3,
      completed: false,
      locked: true
    },
    {
      id: 'hvac-module-4',
      title: 'Gas Piping & Combustion Fundamentals',
      description: 'Gas piping systems, safety practices, and combustion theory',
      duration: 150,
      order: 4,
      completed: false,
      locked: true
    },
    {
      id: 'hvac-module-5',
      title: 'Installation & Maintenance',
      description: 'Step-by-step installation and preventive maintenance',
      duration: 90,
      order: 5,
      completed: false,
      locked: true
    },
    {
      id: 'hvac-module-6',
      title: 'Troubleshooting & Diagnostics', 
      description: 'Common faults and diagnostic procedures',
      duration: 70,
      order: 6,
      completed: false,
      locked: true
    },
    {
      id: 'hvac-module-7',
      title: 'Refrigeration Cycle & Components',
      description: 'Understanding refrigeration cycle and heat transfer principles',
      duration: 120,
      order: 7,
      completed: false,
      locked: true
    },
    {
      id: 'hvac-module-8',
      title: 'Electrical Systems for HVAC',
      description: 'Understanding HVAC electrical systems, controls, and safety procedures',
      duration: 135,
      order: 8,
      completed: false,
      locked: true
    }
  ],
  totalDuration: 955, // ~16 hours
  totalModules: 8
}

export default hvacCompleteCourse







