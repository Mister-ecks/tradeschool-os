// CDL Road Signs Database - Comprehensive training data
export const roadSigns = {
  regulatory: [
    {
      id: 'stop-sign',
      name: 'Stop Sign',
      description: 'Come to a complete stop at the line, crosswalk, or before entering the intersection.',
      image: '/signs/stop-sign.png',
      category: 'regulatory',
      importance: 'critical',
      cdlSpecific: true,
      questions: [
        {
          question: "What must you do when you see a stop sign?",
          options: [
            "Slow down and proceed if clear",
            "Come to a complete stop",
            "Yield to traffic",
            "Continue at reduced speed"
          ],
          correct: 1,
          explanation: "A stop sign requires a complete stop at the line, crosswalk, or before entering the intersection."
        },
        {
          question: "For how long must you stop at a stop sign?",
          options: [
            "1 second",
            "2 seconds", 
            "Until safe to proceed",
            "5 seconds"
          ],
          correct: 2,
          explanation: "You must stop until it's safe to proceed, ensuring no traffic or pedestrians are in your path."
        }
      ]
    },
    {
      id: 'no-parking',
      name: 'No Parking',
      description: 'Parking is prohibited in this area.',
      image: '/signs/no-parking.png',
      category: 'regulatory',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "What does a no parking sign mean?",
          options: [
            "You can park for 5 minutes",
            "Parking is prohibited",
            "You can park after hours",
            "Emergency parking only"
          ],
          correct: 1,
          explanation: "No parking signs indicate that parking is completely prohibited in the designated area."
        }
      ]
    },
    {
      id: 'no-standing',
      name: 'No Standing',
      description: 'No stopping or standing in this area, except for immediate pickup/dropoff.',
      image: '/signs/no-standing.png',
      category: 'regulatory',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "What is the difference between 'No Parking' and 'No Standing'?",
          options: [
            "No difference",
            "No Standing allows brief stops for pickup/dropoff",
            "No Standing is more restrictive",
            "No Standing only applies to trucks"
          ],
          correct: 1,
          explanation: "No Standing typically allows brief stops for immediate pickup or dropoff, while No Parking is more restrictive."
        }
      ]
    },
    {
      id: 'no-left-turn',
      name: 'No Left Turn',
      description: 'Left turns are prohibited from this lane or intersection.',
      image: '/signs/no-left-turn.png',
      category: 'regulatory',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "If you see a 'No Left Turn' sign, what should you do?",
          options: [
            "Make a U-turn instead",
            "Proceed straight or turn right only",
            "Wait for the sign to change",
            "Make the left turn anyway"
          ],
          correct: 1,
          explanation: "No Left Turn signs mean you must proceed straight or turn right only. U-turns are also typically prohibited."
        }
      ]
    },
    {
      id: 'no-right-turn',
      name: 'No Right Turn',
      description: 'Right turns are prohibited from this lane or intersection.',
      image: '/signs/no-right-turn.png',
      category: 'regulatory',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "When you see a 'No Right Turn' sign, your options are:",
          options: [
            "Turn left or go straight",
            "Make a U-turn",
            "Wait for green arrow",
            "Turn right anyway"
          ],
          correct: 0,
          explanation: "No Right Turn signs mean you can turn left or proceed straight, but cannot turn right."
        }
      ]
    },
    {
      id: 'no-u-turn',
      name: 'No U-Turn',
      description: 'U-turns are prohibited at this location.',
      image: '/signs/no-u-turn.png',
      category: 'regulatory',
      importance: 'medium',
      cdlSpecific: true,
      questions: [
        {
          question: "What does a 'No U-Turn' sign mean?",
          options: [
            "U-turns allowed only at night",
            "U-turns are prohibited",
            "U-turns allowed with caution",
            "U-turns allowed for trucks"
          ],
          correct: 1,
          explanation: "No U-Turn signs completely prohibit U-turns at that location."
        }
      ]
    },
    {
      id: 'no-passing',
      name: 'No Passing',
      description: 'Passing other vehicles is prohibited in this area.',
      image: '/signs/no-passing.png',
      category: 'regulatory',
      importance: 'critical',
      cdlSpecific: true,
      questions: [
        {
          question: "Why is the 'No Passing' sign especially important for commercial drivers?",
          options: [
            "Trucks are slower anyway",
            "Commercial vehicles have longer stopping distances",
            "It doesn't apply to trucks",
            "Trucks can pass anyway"
          ],
          correct: 1,
          explanation: "Commercial vehicles have longer stopping distances and need more space, making passing restrictions critical for safety."
        }
      ]
    },
    {
      id: 'no-pedestrians',
      name: 'No Pedestrians',
      description: 'Pedestrians are prohibited in this area.',
      image: '/signs/no-pedestrians.png',
      category: 'regulatory',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "What should you do when you see a 'No Pedestrians' sign?",
          options: [
            "Slow down for pedestrians anyway",
            "Expect no pedestrians in the area",
            "Stop for pedestrians",
            "Honk at pedestrians"
          ],
          correct: 1,
          explanation: "No Pedestrians signs indicate pedestrians should not be in the area, but drivers should still remain alert."
        }
      ]
    }
  ],
  warning: [
    {
      id: 'merge-right',
      name: 'Merge Right',
      description: 'Traffic from the right is merging into your lane.',
      image: '/signs/merge-right.png',
      category: 'warning',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "When you see a 'Merge Right' sign, what should you do?",
          options: [
            "Speed up to prevent merging",
            "Slow down and allow merging traffic",
            "Change lanes immediately",
            "Ignore the merging traffic"
          ],
          correct: 1,
          explanation: "Drivers should slow down and allow merging traffic to enter safely, especially important for large commercial vehicles."
        }
      ]
    },
    {
      id: 'curve-right',
      name: 'Curve Right',
      description: 'Sharp curve to the right ahead.',
      image: '/signs/curve-right.png',
      category: 'warning',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "How should commercial drivers approach a sharp curve?",
          options: [
            "Maintain highway speed",
            "Reduce speed before entering curve",
            "Accelerate through curve",
            "Use emergency brake"
          ],
          correct: 1,
          explanation: "Commercial vehicles should reduce speed before entering curves due to their higher center of gravity and longer stopping distances."
        }
      ]
    },
    {
      id: 'curve-left',
      name: 'Curve Left',
      description: 'Sharp curve to the left ahead.',
      image: '/signs/curve-left.png',
      category: 'warning',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "What is the most important factor when navigating curves in a commercial vehicle?",
          options: [
            "Speed",
            "Centrifugal force",
            "Vehicle weight distribution",
            "All of the above"
          ],
          correct: 3,
          explanation: "All factors are important - speed affects centrifugal force, and vehicle weight distribution affects stability in curves."
        }
      ]
    },
    {
      id: 'winding-road',
      name: 'Winding Road',
      description: 'Series of curves ahead.',
      image: '/signs/winding-road.png',
      category: 'warning',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "On a winding road, commercial drivers should:",
          options: [
            "Use the shoulder when possible",
            "Maintain consistent speed",
            "Reduce speed and stay in lane",
            "Pass slower vehicles"
          ],
          correct: 2,
          explanation: "Commercial drivers should reduce speed and maintain their lane position on winding roads for safety."
        }
      ]
    },
    {
      id: 'reverse-curve',
      name: 'Reverse Curve',
      description: 'Road curves right then left (or vice versa).',
      image: '/signs/reverse-curve.png',
      category: 'warning',
      importance: 'critical',
      cdlSpecific: true,
      questions: [
        {
          question: "Reverse curves are particularly dangerous for commercial vehicles because:",
          options: [
            "They're hard to see",
            "They require rapid steering changes",
            "They cause cargo shift",
            "All of the above"
          ],
          correct: 3,
          explanation: "Reverse curves are dangerous due to visibility issues, rapid steering changes needed, and potential cargo shifting."
        }
      ]
    },
    {
      id: 'narrow-road',
      name: 'Road Narrows',
      description: 'Road width is reduced ahead.',
      image: '/signs/narrow-road.png',
      category: 'warning',
      importance: 'critical',
      cdlSpecific: true,
      questions: [
        {
          question: "When approaching a narrow road, commercial drivers should:",
          options: [
            "Speed up to get through quickly",
            "Slow down and check clearances",
            "Use the shoulder",
            "Honk continuously"
          ],
          correct: 1,
          explanation: "Commercial drivers must slow down and carefully check clearances when approaching narrow roads."
        }
      ]
    },
    {
      id: 'divided-highway',
      name: 'Divided Highway',
      description: 'Road ahead is divided by a median or barrier.',
      image: '/signs/divided-highway.png',
      category: 'warning',
      importance: 'medium',
      cdlSpecific: false,
      questions: [
        {
          question: "On a divided highway, commercial drivers should:",
          options: [
            "Cross the median when needed",
            "Stay on their side of the division",
            "Use the median for passing",
            "Ignore the division"
          ],
          correct: 1,
          explanation: "Drivers must stay on their designated side of a divided highway and not cross the median."
        }
      ]
    },
    {
      id: 'railroad-crossing',
      name: 'Railroad Crossing',
      description: 'Railroad crossing ahead.',
      image: '/signs/railroad-crossing.png',
      category: 'warning',
      importance: 'critical',
      cdlSpecific: true,
      questions: [
        {
          question: "At railroad crossings, commercial vehicles must:",
          options: [
            "Stop only if train is visible",
            "Always stop and look both ways",
            "Proceed if gates are up",
            "Speed up to clear tracks quickly"
          ],
          correct: 1,
          explanation: "Commercial vehicles must always stop at railroad crossings and look both ways, regardless of gate position."
        }
      ]
    },
    {
      id: 'deer-crossing',
      name: 'Deer Crossing',
      description: 'Watch for deer crossing the road.',
      image: '/signs/deer-crossing.png',
      category: 'warning',
      importance: 'medium',
      cdlSpecific: false,
      questions: [
        {
          question: "When you see a deer crossing sign:",
          options: [
            "Speed up to avoid deer",
            "Slow down and be alert",
            "Use high beams continuously",
            "Ignore the sign"
          ],
          correct: 1,
          explanation: "Drivers should slow down and be extra alert for deer, especially during dawn and dusk."
        }
      ]
    },
    {
      id: 'falling-rocks',
      name: 'Falling Rocks',
      description: 'Watch for falling rocks from hillsides.',
      image: '/signs/falling-rocks.png',
      category: 'warning',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "In areas with falling rock warnings, commercial drivers should:",
          options: [
            "Speed up to get through quickly",
            "Slow down and watch for debris",
            "Stay in the center of the road",
            "Use hazard lights continuously"
          ],
          correct: 1,
          explanation: "Commercial drivers should slow down and watch for rocks or debris on the roadway."
        }
      ]
    }
  ],
  mandatory: [
    {
      id: 'keep-right',
      name: 'Keep Right',
      description: 'Traffic must keep to the right of this sign or obstruction.',
      image: '/signs/keep-right.png',
      category: 'mandatory',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "A 'Keep Right' sign means:",
          options: [
            "Right turns only",
            "Stay to the right of the obstruction",
            "Right lane only",
            "Yield to right"
          ],
          correct: 1,
          explanation: "Keep Right signs indicate traffic must stay to the right of the sign or obstruction ahead."
        }
      ]
    },
    {
      id: 'keep-left',
      name: 'Keep Left',
      description: 'Traffic must keep to the left of this sign or obstruction.',
      image: '/signs/keep-left.png',
      category: 'mandatory',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "When you see a 'Keep Left' sign:",
          options: [
            "Turn left immediately",
            "Stay to the left of the obstruction",
            "Use left turn signal",
            "Stop and wait"
          ],
          correct: 1,
          explanation: "Keep Left signs require traffic to stay to the left of the obstruction or sign ahead."
        }
      ]
    },
    {
      id: 'straight-only',
      name: 'Straight Only',
      description: 'Traffic must proceed straight ahead only.',
      image: '/signs/straight-only.png',
      category: 'mandatory',
      importance: 'high',
      cdlSpecific: true,
      questions: [
        {
          question: "A 'Straight Only' sign means:",
          options: [
            "You can turn if safe",
            "Proceed straight ahead only",
            "U-turn allowed",
            "Yield then proceed"
          ],
          correct: 1,
          explanation: "Straight Only signs require traffic to proceed straight ahead with no turns permitted."
        }
      ]
    }
  ]
};

// Question generation system
export const generateSignQuestions = (signId, difficulty = 'medium') => {
  const sign = findSignById(signId);
  if (!sign) return [];
  
  const baseQuestions = sign.questions || [];
  const generatedQuestions = [];
  
  // Add CDL-specific questions based on difficulty
  if (difficulty === 'easy') {
    generatedQuestions.push({
      question: `What type of sign is the ${sign.name}?`,
      options: ['Regulatory', 'Warning', 'Guide', 'Construction'],
      correct: getCategoryIndex(sign.category),
      explanation: `The ${sign.name} is a ${sign.category} sign.`
    });
  } else if (difficulty === 'hard') {
    generatedQuestions.push({
      question: `Why is the ${sign.name} particularly important for commercial drivers?`,
      options: [
        'Commercial vehicles are exempt',
        'It applies to all vehicles equally',
        'Commercial vehicles have special considerations',
        'It only applies to trucks'
      ],
      correct: 2,
      explanation: `Commercial drivers must pay special attention to ${sign.name} due to vehicle size, weight, and safety considerations.`
    });
  }
  
  return [...baseQuestions, ...generatedQuestions];
};

// Utility functions
export const findSignById = (id) => {
  for (const category in roadSigns) {
    const sign = roadSigns[category].find(s => s.id === id);
    if (sign) return sign;
  }
  return null;
};

export const getCategoryIndex = (category) => {
  const categories = ['regulatory', 'warning', 'guide', 'construction'];
  return categories.indexOf(category);
};

export const getAllSigns = () => {
  return Object.values(roadSigns).flat();
};

export const getSignsByCategory = (category) => {
  return roadSigns[category] || [];
};

export const getCDLSpecificSigns = () => {
  return getAllSigns().filter(sign => sign.cdlSpecific);
};

export const getCriticalSigns = () => {
  return getAllSigns().filter(sign => sign.importance === 'critical');
};

// Training scenarios
export const trainingScenarios = [
  {
    id: 'highway-merge',
    title: 'Highway Merging Scenario',
    description: 'Practice merging onto a busy highway with proper sign recognition.',
    signs: ['merge-right', 'keep-right', 'no-passing'],
    difficulty: 'medium'
  },
  {
    id: 'mountain-driving',
    title: 'Mountain Driving Conditions',
    description: 'Navigate mountain roads with curves, narrow sections, and falling rock warnings.',
    signs: ['curve-left', 'curve-right', 'winding-road', 'narrow-road', 'falling-rocks'],
    difficulty: 'hard'
  },
  {
    id: 'city-navigation',
    title: 'Urban Navigation',
    description: 'Navigate city streets with parking restrictions and turning limitations.',
    signs: ['no-parking', 'no-standing', 'no-left-turn', 'no-right-turn', 'no-u-turn'],
    difficulty: 'easy'
  },
  {
    id: 'safety-critical',
    title: 'Safety Critical Signs',
    description: 'Master the most important signs for commercial vehicle safety.',
    signs: ['stop-sign', 'railroad-crossing', 'no-passing', 'reverse-curve'],
    difficulty: 'hard'
  }
];

export default roadSigns;
