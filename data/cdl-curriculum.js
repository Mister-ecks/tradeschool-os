export const cdlCurriculum = {
  title: "Commercial Driver's License (CDL) Training Program",
  duration: "5 days, 37.5 hours",
  description: "Comprehensive CDL training covering all essential topics for commercial vehicle operation",
  modules: [
    {
      id: "day1",
      title: "Day 1: Introduction to Commercial Driving",
      duration: "7.5 hours",
      topics: [
        "CDL Requirements and Regulations",
        "Commercial Vehicle Types and Classifications",
        "Driver Qualifications and Medical Requirements",
        "Hours of Service Regulations",
        "Pre-Trip Inspection Basics"
      ],
      videos: [
        {
          id: "intro-cdl",
          title: "Introduction to CDL",
          duration: "45 minutes",
          url: "/videos/cdl/day1/intro-cdl.mp4",
          quizPoints: [15, 30, 40] // Quiz at 15, 30, 40 minutes
        },
        {
          id: "vehicle-classifications",
          title: "Vehicle Classifications",
          duration: "60 minutes",
          url: "/videos/cdl/day1/vehicle-classifications.mp4",
          quizPoints: [20, 45]
        },
        {
          id: "hours-service",
          title: "Hours of Service",
          duration: "90 minutes",
          url: "/videos/cdl/day1/hours-service.mp4",
          quizPoints: [30, 60, 75]
        }
      ],
      quizzes: [
        {
          id: "day1-final",
          title: "Day 1 Assessment",
          questions: 25,
          passingScore: 80
        }
      ]
    },
    {
      id: "day2",
      title: "Day 2: Vehicle Systems and Air Brakes",
      duration: "7.5 hours",
      topics: [
        "Air Brake System Components",
        "Air Brake Inspection Procedures",
        "Brake System Maintenance",
        "Emergency Brake Systems",
        "Anti-Lock Brake Systems (ABS)"
      ],
      videos: [
        {
          id: "air-brake-basics",
          title: "Air Brake System Basics",
          duration: "120 minutes",
          url: "/videos/cdl/day2/air-brake-basics.mp4",
          quizPoints: [30, 60, 90, 105]
        },
        {
          id: "brake-inspection",
          title: "Pre-Trip Brake Inspection",
          duration: "90 minutes",
          url: "/videos/cdl/day2/brake-inspection.mp4",
          quizPoints: [25, 50, 70]
        },
        {
          id: "emergency-systems",
          title: "Emergency Brake Systems",
          duration: "60 minutes",
          url: "/videos/cdl/day2/emergency-systems.mp4",
          quizPoints: [20, 40]
        }
      ],
      quizzes: [
        {
          id: "day2-final",
          title: "Day 2 Assessment",
          questions: 30,
          passingScore: 80
        }
      ]
    },
    {
      id: "day3",
      title: "Day 3: Road Signs and Traffic Laws",
      duration: "7.5 hours",
      topics: [
        "Ontario Road Signs Recognition",
        "Traffic Laws and Regulations",
        "Right-of-Way Rules",
        "Speed Limits and Safety",
        "Intersection Navigation"
      ],
      videos: [
        {
          id: "road-signs",
          title: "Road Signs Recognition",
          duration: "150 minutes",
          url: "/videos/cdl/day3/road-signs.mp4",
          quizPoints: [30, 60, 90, 120]
        },
        {
          id: "traffic-laws",
          title: "Traffic Laws and Regulations",
          duration: "90 minutes",
          url: "/videos/cdl/day3/traffic-laws.mp4",
          quizPoints: [30, 60]
        },
        {
          id: "intersection-safety",
          title: "Intersection Safety",
          duration: "60 minutes",
          url: "/videos/cdl/day3/intersection-safety.mp4",
          quizPoints: [20, 40]
        }
      ],
      quizzes: [
        {
          id: "day3-final",
          title: "Day 3 Assessment",
          questions: 35,
          passingScore: 80
        }
      ]
    },
    {
      id: "day4",
      title: "Day 4: Vehicle Operation and Safety",
      duration: "7.5 hours",
      topics: [
        "Vehicle Control and Handling",
        "Backing and Parking Techniques",
        "Hazardous Materials Transportation",
        "Cargo Securement",
        "Defensive Driving Techniques"
      ],
      videos: [
        {
          id: "vehicle-control",
          title: "Vehicle Control and Handling",
          duration: "120 minutes",
          url: "/videos/cdl/day4/vehicle-control.mp4",
          quizPoints: [30, 60, 90]
        },
        {
          id: "backing-parking",
          title: "Backing and Parking",
          duration: "90 minutes",
          url: "/videos/cdl/day4/backing-parking.mp4",
          quizPoints: [30, 60]
        },
        {
          id: "hazmat",
          title: "Hazardous Materials",
          duration: "90 minutes",
          url: "/videos/cdl/day4/hazmat.mp4",
          quizPoints: [30, 60]
        }
      ],
      quizzes: [
        {
          id: "day4-final",
          title: "Day 4 Assessment",
          questions: 30,
          passingScore: 80
        }
      ]
    },
    {
      id: "day5",
      title: "Day 5: Final Assessment and Certification",
      duration: "7.5 hours",
      topics: [
        "Comprehensive Review",
        "Practice Examinations",
        "Road Test Preparation",
        "Final Certification Test",
        "Career Guidance and Next Steps"
      ],
      videos: [
        {
          id: "comprehensive-review",
          title: "Comprehensive Review",
          duration: "180 minutes",
          url: "/videos/cdl/day5/comprehensive-review.mp4",
          quizPoints: [45, 90, 135, 150]
        },
        {
          id: "road-test-prep",
          title: "Road Test Preparation",
          duration: "90 minutes",
          url: "/videos/cdl/day5/road-test-prep.mp4",
          quizPoints: [30, 60]
        }
      ],
      quizzes: [
        {
          id: "final-exam",
          title: "Final Certification Exam",
          questions: 100,
          passingScore: 85
        }
      ]
    }
  ]
};

export const yardTrainingChecklist = {
  title: "Yard Training Checklist",
  description: "Comprehensive checklist for commercial vehicle inspection and operation",
  categories: [
    {
      id: "air-brake-system",
      title: "Air Brake System Inspection",
      items: [
        "Check air compressor operation",
        "Inspect air lines for leaks",
        "Test low air pressure warning",
        "Check brake chamber operation",
        "Inspect brake drums and shoes",
        "Test parking brake operation",
        "Check brake adjustment"
      ],
      video: "/videos/yard/air-brake-inspection.mp4",
      quiz: {
        questions: 15,
        passingScore: 80
      }
    },
    {
      id: "cab-inspection",
      title: "Cab Inspection",
      items: [
        "Check mirrors and visibility",
        "Inspect steering wheel and column",
        "Test horn operation",
        "Check windshield and wipers",
        "Inspect seat belts",
        "Test turn signals and lights",
        "Check gauges and instruments"
      ],
      video: "/videos/yard/cab-inspection.mp4",
      quiz: {
        questions: 12,
        passingScore: 80
      }
    },
    {
      id: "cargo-securement",
      title: "Cargo Securement",
      items: [
        "Inspect cargo area",
        "Check tie-down points",
        "Verify load distribution",
        "Test cargo restraints",
        "Check load covers",
        "Inspect blocking and bracing",
        "Verify weight distribution"
      ],
      video: "/videos/yard/cargo-securement.mp4",
      quiz: {
        questions: 10,
        passingScore: 80
      }
    },
    {
      id: "coupling-devices",
      title: "Coupling Devices",
      items: [
        "Inspect fifth wheel",
        "Check kingpin connection",
        "Test coupling operation",
        "Inspect safety chains",
        "Check electrical connections",
        "Test air brake connections",
        "Verify locking mechanism"
      ],
      video: "/videos/yard/coupling-devices.mp4",
      quiz: {
        questions: 12,
        passingScore: 80
      }
    },
    {
      id: "emergency-equipment",
      title: "Emergency Equipment",
      items: [
        "Check fire extinguisher",
        "Inspect emergency triangles",
        "Test emergency brake",
        "Check first aid kit",
        "Inspect emergency exits",
        "Test communication devices",
        "Check emergency lighting"
      ],
      video: "/videos/yard/emergency-equipment.mp4",
      quiz: {
        questions: 8,
        passingScore: 80
      }
    },
    {
      id: "tires-suspension",
      title: "Tires and Suspension",
      items: [
        "Check tire condition",
        "Inspect tire pressure",
        "Check wheel alignment",
        "Inspect suspension system",
        "Test shock absorbers",
        "Check wheel bearings",
        "Inspect brake components"
      ],
      video: "/videos/yard/tires-suspension.mp4",
      quiz: {
        questions: 10,
        passingScore: 80
      }
    }
  ]
};


