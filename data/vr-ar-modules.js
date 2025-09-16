export const vrArModules = {
  title: "VR/AR Training Modules",
  description: "Immersive virtual and augmented reality training for technical skills",
  modules: [
    {
      id: "laptop-repair",
      title: "Laptop Repair Training",
      category: "Electronics",
      duration: "4 hours",
      difficulty: "Intermediate",
      description: "Learn laptop disassembly, component identification, and repair techniques",
      tools: [
        {
          id: "screwdriver-set",
          name: "Precision Screwdriver Set",
          barcode: "123456789012",
          qrCode: "laptop-screwdriver-set",
          image: "/images/tools/screwdriver-set.jpg",
          description: "Magnetic precision screwdrivers for laptop repair"
        },
        {
          id: "spudger",
          name: "Plastic Spudger",
          barcode: "123456789013",
          qrCode: "laptop-spudger",
          image: "/images/tools/spudger.jpg",
          description: "Non-conductive tool for prying and separating components"
        },
        {
          id: "thermal-paste",
          name: "Thermal Paste",
          barcode: "123456789014",
          qrCode: "laptop-thermal-paste",
          image: "/images/tools/thermal-paste.jpg",
          description: "High-performance thermal compound for CPU/GPU"
        },
        {
          id: "anti-static-mat",
          name: "Anti-Static Mat",
          barcode: "123456789015",
          qrCode: "laptop-anti-static",
          image: "/images/tools/anti-static-mat.jpg",
          description: "ESD protection mat for safe component handling"
        }
      ],
      vrScenes: [
        {
          id: "laptop-disassembly",
          title: "Laptop Disassembly",
          duration: "45 minutes",
          description: "Step-by-step laptop disassembly process",
          objectives: [
            "Remove bottom panel screws",
            "Disconnect battery connector",
            "Remove keyboard assembly",
            "Access motherboard components"
          ]
        },
        {
          id: "component-replacement",
          title: "Component Replacement",
          duration: "60 minutes",
          description: "Replace common laptop components",
          objectives: [
            "Replace RAM modules",
            "Install new hard drive",
            "Replace keyboard",
            "Install new screen"
          ]
        }
      ],
      quizzes: [
        {
          id: "laptop-safety",
          title: "Laptop Repair Safety",
          questions: 10,
          passingScore: 80
        },
        {
          id: "laptop-components",
          title: "Component Identification",
          questions: 15,
          passingScore: 80
        }
      ]
    },
    {
      id: "phone-repair",
      title: "Smartphone Repair Training",
      category: "Electronics",
      duration: "3 hours",
      difficulty: "Intermediate",
      description: "Master smartphone disassembly and repair techniques",
      tools: [
        {
          id: "pentalobe-screwdriver",
          name: "Pentalobe Screwdriver",
          barcode: "123456789016",
          qrCode: "phone-pentalobe",
          image: "/images/tools/pentalobe-screwdriver.jpg",
          description: "Specialized screwdriver for iPhone screws"
        },
        {
          id: "suction-cup",
          name: "Suction Cup",
          barcode: "123456789017",
          qrCode: "phone-suction-cup",
          image: "/images/tools/suction-cup.jpg",
          description: "Tool for lifting phone screens"
        },
        {
          id: "opening-tool",
          name: "Phone Opening Tool",
          barcode: "123456789018",
          qrCode: "phone-opening-tool",
          image: "/images/tools/opening-tool.jpg",
          description: "Thin tool for separating phone components"
        },
        {
          id: "heat-gun",
          name: "Heat Gun",
          barcode: "123456789019",
          qrCode: "phone-heat-gun",
          image: "/images/tools/heat-gun.jpg",
          description: "Low-temperature heat gun for adhesive removal"
        }
      ],
      vrScenes: [
        {
          id: "phone-disassembly",
          title: "Phone Disassembly",
          duration: "30 minutes",
          description: "Safe smartphone disassembly process",
          objectives: [
            "Remove screen assembly",
            "Disconnect battery",
            "Access internal components",
            "Remove motherboard"
          ]
        },
        {
          id: "screen-replacement",
          title: "Screen Replacement",
          duration: "45 minutes",
          description: "Replace cracked or damaged screens",
          objectives: [
            "Remove old screen",
            "Clean adhesive residue",
            "Install new screen",
            "Test functionality"
          ]
        }
      ],
      quizzes: [
        {
          id: "phone-safety",
          title: "Phone Repair Safety",
          questions: 8,
          passingScore: 80
        },
        {
          id: "phone-components",
          title: "Phone Component ID",
          questions: 12,
          passingScore: 80
        }
      ]
    },
    {
      id: "fiber-splicing",
      title: "Fiber Optic Splicing",
      category: "Telecommunications",
      duration: "6 hours",
      difficulty: "Advanced",
      description: "Master fiber optic cable preparation and fusion splicing",
      tools: [
        {
          id: "fiber-stripper",
          name: "Fiber Stripper",
          barcode: "123456789020",
          qrCode: "fiber-stripper",
          image: "/images/tools/fiber-stripper.jpg",
          description: "Precision tool for removing fiber coating"
        },
        {
          id: "cleaver",
          name: "Fiber Cleaver",
          barcode: "123456789021",
          qrCode: "fiber-cleaver",
          image: "/images/tools/cleaver.jpg",
          description: "Tool for creating clean fiber end faces"
        },
        {
          id: "fusion-splicer",
          name: "Fusion Splicer",
          barcode: "123456789022",
          qrCode: "fiber-fusion-splicer",
          image: "/images/tools/fusion-splicer.jpg",
          description: "Machine for joining fiber optic cables"
        },
        {
          id: "otdr",
          name: "OTDR",
          barcode: "123456789023",
          qrCode: "fiber-otdr",
          image: "/images/tools/otdr.jpg",
          description: "Optical Time Domain Reflectometer for testing"
        }
      ],
      vrScenes: [
        {
          id: "fiber-preparation",
          title: "Fiber Preparation",
          duration: "90 minutes",
          description: "Prepare fiber cables for splicing",
          objectives: [
            "Strip fiber coating",
            "Clean fiber ends",
            "Cleave fiber properly",
            "Inspect end faces"
          ]
        },
        {
          id: "fusion-splicing",
          title: "Fusion Splicing Process",
          duration: "120 minutes",
          description: "Perform fusion splicing operation",
          objectives: [
            "Load fibers in splicer",
            "Align fiber ends",
            "Execute fusion splice",
            "Test splice quality"
          ]
        }
      ],
      quizzes: [
        {
          id: "fiber-safety",
          title: "Fiber Safety Procedures",
          questions: 12,
          passingScore: 80
        },
        {
          id: "splicing-techniques",
          title: "Splicing Techniques",
          questions: 18,
          passingScore: 80
        }
      ]
    },
    {
      id: "otdr-training",
      title: "OTDR Testing and Analysis",
      category: "Telecommunications",
      duration: "4 hours",
      difficulty: "Advanced",
      description: "Learn OTDR operation and trace analysis",
      tools: [
        {
          id: "otdr-unit",
          name: "OTDR Unit",
          barcode: "123456789024",
          qrCode: "otdr-unit",
          image: "/images/tools/otdr-unit.jpg",
          description: "Optical Time Domain Reflectometer"
        },
        {
          id: "test-cords",
          name: "Test Cords",
          barcode: "123456789025",
          qrCode: "otdr-test-cords",
          image: "/images/tools/test-cords.jpg",
          description: "Reference cords for OTDR testing"
        },
        {
          id: "launch-cable",
          name: "Launch Cable",
          barcode: "123456789026",
          qrCode: "otdr-launch-cable",
          image: "/images/tools/launch-cable.jpg",
          description: "Launch cable for accurate measurements"
        }
      ],
      vrScenes: [
        {
          id: "otdr-setup",
          title: "OTDR Setup",
          duration: "60 minutes",
          description: "Configure OTDR for testing",
          objectives: [
            "Connect test cords",
            "Set measurement parameters",
            "Calibrate instrument",
            "Prepare launch cable"
          ]
        },
        {
          id: "trace-analysis",
          title: "Trace Analysis",
          duration: "90 minutes",
          description: "Analyze OTDR traces and identify issues",
          objectives: [
            "Read trace data",
            "Identify events",
            "Measure distances",
            "Diagnose problems"
          ]
        }
      ],
      quizzes: [
        {
          id: "otdr-operation",
          title: "OTDR Operation",
          questions: 15,
          passingScore: 80
        },
        {
          id: "trace-interpretation",
          title: "Trace Interpretation",
          questions: 20,
          passingScore: 80
        }
      ]
    }
  ]
};


