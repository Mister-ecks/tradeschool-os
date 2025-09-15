// Complete Ontario Road Signs Data
// Based on official MTO handbook and shared images

export const roadSigns = [
  // REGULATORY SIGNS
  {
    id: 'stop-sign',
    name: 'STOP',
    description: 'Red octagonal sign with white border and text',
    meaning: 'Full stop at line/crosswalk/intersection, yield before proceeding.',
    category: 'regulatory',
    importance: 'critical',
    // // image: '/signs/regulatory/stop-sign.png', // Will be added when real image is uploaded
    questions: [
      {
        question: "What shape is a STOP sign?",
        options: ["Circle", "Triangle", "Octagon", "Rectangle"],
        correct: 2,
        explanation: "A STOP sign is octagonal (8-sided) and is the only sign with this shape."
      }
    ]
  },
  {
    id: 'yield-sign',
    name: 'YIELD',
    description: 'Red and white triangular sign',
    meaning: 'Slow down, prepare to stop, give way to other traffic/pedestrians.',
    category: 'regulatory',
    importance: 'critical',
    // image: '/signs/regulatory/yield-sign.png',
    questions: [
      {
        question: "If you see a YIELD sign, you must:",
        options: ["Stop completely, no matter what", "Speed up", "Slow down, give way if needed", "Ignore if no police are present"],
        correct: 2,
        explanation: "A yield sign means slow down and be prepared to stop, yielding right-of-way to other traffic."
      }
    ]
  },
  {
    id: 'speed-limit',
    name: 'Speed Limit (80 km/h)',
    description: 'White rectangular sign with black numbers',
    meaning: 'Maximum legal speed on that stretch of road.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/speed-limit.png',
    questions: [
      {
        question: "A speed limit sign indicates:",
        options: ["Minimum speed allowed", "Maximum legal speed", "Recommended speed", "Speed for trucks only"],
        correct: 1,
        explanation: "Speed limit signs show the maximum legal speed for that section of road."
      }
    ]
  },
  {
    id: 'no-entry',
    name: 'No Entry',
    description: 'White circular sign with red border and horizontal white bar',
    meaning: 'Do not enter roadway beyond this sign.',
    category: 'regulatory',
    importance: 'critical',
    // image: '/signs/regulatory/no-entry.png',
    questions: [
      {
        question: "What does a 'No Entry' sign mean?",
        options: ["No parking allowed", "Do not enter roadway beyond this sign", "One way street", "Speed limit zone"],
        correct: 1,
        explanation: "No Entry signs prohibit vehicles from entering the roadway beyond the sign."
      }
    ]
  },
  {
    id: 'one-way',
    name: 'One Way',
    description: 'White rectangular sign with black arrow',
    meaning: 'Traffic allowed only in the direction shown.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/one-way.png',
    questions: [
      {
        question: "A one-way sign means:",
        options: ["Traffic flows in both directions", "Traffic allowed only in the direction shown", "No traffic allowed", "Emergency vehicles only"],
        correct: 1,
        explanation: "One-way signs indicate that traffic is only allowed to flow in the direction of the arrow."
      }
    ]
  },
  {
    id: 'no-parking',
    name: 'No Parking',
    description: 'White square sign with red circle and diagonal line over letter P',
    meaning: 'You may stop temporarily but not park.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/no-parking.png',
    questions: [
      {
        question: "A 'No Parking' sign means:",
        options: ["You can never stop", "You may stop temporarily but not park", "You can park if less than 5 min", "You must park only at night"],
        correct: 1,
        explanation: "No Parking signs allow temporary stops but prohibit parking."
      }
    ]
  },
  {
    id: 'no-stopping',
    name: 'No Stopping',
    description: 'White square sign with red circle and diagonal line over stop sign symbol',
    meaning: 'Do not stop at all, even temporarily.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/no-stopping.png',
    questions: [
      {
        question: "A 'No Stopping' sign means:",
        options: ["No parking allowed", "Do not stop at all, even temporarily", "Emergency stops only", "Stopping allowed for 5 minutes"],
        correct: 1,
        explanation: "No Stopping signs prohibit any stopping, even for brief periods."
      }
    ]
  },
  {
    id: 'no-left-turn',
    name: 'No Left Turn',
    description: 'White square sign with red circle and diagonal line over left arrow',
    meaning: 'Left turns prohibited.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/no-left-turn.png',
    questions: [
      {
        question: "A 'No Left Turn' sign means:",
        options: ["Left turns are prohibited", "Left turns allowed only at night", "Left turns allowed with caution", "Left turns allowed for emergency vehicles only"],
        correct: 0,
        explanation: "No Left Turn signs prohibit making left turns at that location."
      }
    ]
  },
  {
    id: 'no-right-turn',
    name: 'No Right Turn',
    description: 'White square sign with red circle and diagonal line over right arrow',
    meaning: 'Right turns prohibited.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/no-right-turn.png',
    questions: [
      {
        question: "A 'No Right Turn' sign means:",
        options: ["Right turns are prohibited", "Right turns allowed only at night", "Right turns allowed with caution", "Right turns allowed for emergency vehicles only"],
        correct: 0,
        explanation: "No Right Turn signs prohibit making right turns at that location."
      }
    ]
  },
  {
    id: 'do-not-pass',
    name: 'Do Not Pass',
    description: 'White square sign with red circle and diagonal line over two cars',
    meaning: 'Passing is prohibited beyond this point.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/do-not-pass.png',
    questions: [
      {
        question: "A 'Do Not Pass' sign means:",
        options: ["Passing is prohibited", "Passing allowed only at night", "Passing allowed with caution", "Passing allowed for emergency vehicles only"],
        correct: 0,
        explanation: "Do Not Pass signs prohibit overtaking other vehicles in that area."
      }
    ]
  },
  {
    id: 'no-straight-through',
    name: 'No Straight Through',
    description: 'White square sign with red circle and diagonal line over up arrow',
    meaning: 'Straight through traffic is prohibited.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/no-straight-through.png',
    questions: [
      {
        question: "A 'No Straight Through' sign means:",
        options: ["Straight through traffic is prohibited", "Straight through allowed only at night", "Straight through allowed with caution", "Straight through allowed for emergency vehicles only"],
        correct: 0,
        explanation: "No Straight Through signs prohibit continuing straight ahead at that location."
      }
    ]
  },
  {
    id: 'no-pedestrian',
    name: 'No Pedestrian',
    description: 'White square sign with red circle and diagonal line over walking person',
    meaning: 'Pedestrians are prohibited from entering this area.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/no-pedestrian.png',
    questions: [
      {
        question: "A 'No Pedestrian' sign means:",
        options: ["Pedestrians are prohibited", "Pedestrians allowed only at night", "Pedestrians allowed with caution", "Pedestrians allowed for emergency only"],
        correct: 0,
        explanation: "No Pedestrian signs prohibit pedestrians from entering that area."
      }
    ]
  },
  {
    id: 'no-bicycle',
    name: 'No Bicycle',
    description: 'White square sign with red circle and diagonal line over bicycle',
    meaning: 'Bicycles are prohibited from entering this area.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/no-bicycle.png',
    questions: [
      {
        question: "A 'No Bicycle' sign means:",
        options: ["Bicycles are prohibited", "Bicycles allowed only at night", "Bicycles allowed with caution", "Bicycles allowed for emergency only"],
        correct: 0,
        explanation: "No Bicycle signs prohibit bicycles from entering that area."
      }
    ]
  },
  {
    id: 'no-u-turn',
    name: 'No U-Turn',
    description: 'White square sign with red circle and diagonal line over U-turn arrow',
    meaning: 'U-turns are prohibited at this location.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/no-u-turn.png',
    questions: [
      {
        question: "A 'No U-Turn' sign means:",
        options: ["U-turns are prohibited", "U-turns allowed only at night", "U-turns allowed with caution", "U-turns allowed for emergency vehicles only"],
        correct: 0,
        explanation: "No U-Turn signs prohibit making U-turns at that location."
      }
    ]
  },
  {
    id: 'mandatory-left-turn',
    name: 'Mandatory Left Turn',
    description: 'White square sign with green circle and black left arrow',
    meaning: 'Traffic must turn left in the direction indicated.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/mandatory-left-turn.png',
    questions: [
      {
        question: "A 'Mandatory Left Turn' sign means:",
        options: ["Traffic must turn left", "Left turns are prohibited", "Left turns allowed with caution", "Left turns allowed only at night"],
        correct: 0,
        explanation: "Mandatory Left Turn signs require traffic to turn left in the direction indicated."
      }
    ]
  },
  {
    id: 'mandatory-right-turn',
    name: 'Mandatory Right Turn',
    description: 'White square sign with green circle and black right arrow',
    meaning: 'Traffic must turn right in the direction indicated.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/mandatory-right-turn.png',
    questions: [
      {
        question: "A 'Mandatory Right Turn' sign means:",
        options: ["Traffic must turn right", "Right turns are prohibited", "Right turns allowed with caution", "Right turns allowed only at night"],
        correct: 0,
        explanation: "Mandatory Right Turn signs require traffic to turn right in the direction indicated."
      }
    ]
  },
  {
    id: 'go-straight',
    name: 'Go Straight',
    description: 'White square sign with green circle and black up arrow',
    meaning: 'Traffic must proceed straight ahead.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/go-straight.png',
    questions: [
      {
        question: "A 'Go Straight' sign means:",
        options: ["Traffic must proceed straight", "Straight through is prohibited", "Straight through allowed with caution", "Straight through allowed only at night"],
        correct: 0,
        explanation: "Go Straight signs require traffic to proceed straight ahead in the direction indicated."
      }
    ]
  },
  {
    id: 'hov-lane',
    name: 'HOV Lane',
    description: 'White square sign with green circle and black diamond',
    meaning: 'High Occupancy Vehicle lane - vehicles with multiple passengers only.',
    category: 'regulatory',
    importance: 'medium',
    // image: '/signs/regulatory/hov-lane.png',
    questions: [
      {
        question: "An 'HOV Lane' sign means:",
        options: ["High Occupancy Vehicle lane", "Heavy vehicle only lane", "High speed lane", "Hospital vehicle lane"],
        correct: 0,
        explanation: "HOV lanes are reserved for vehicles with multiple passengers to encourage carpooling."
      }
    ]
  },
  {
    id: 'parking-30min',
    name: '30 Min Parking',
    description: 'White square sign with green circle and P, time restrictions',
    meaning: 'Parking allowed for maximum 30 minutes during specified hours.',
    category: 'regulatory',
    importance: 'medium',
    // image: '/signs/regulatory/parking-30min.png',
    questions: [
      {
        question: "A '30 Min Parking' sign means:",
        options: ["Parking allowed for 30 minutes maximum", "Parking prohibited for 30 minutes", "Parking allowed only at 30 minutes past the hour", "Parking allowed for 30 hours"],
        correct: 0,
        explanation: "30 Min Parking signs allow parking for a maximum of 30 minutes during specified hours."
      }
    ]
  },
  {
    id: 'no-standing-permit',
    name: 'No Standing By Permit Only',
    description: 'White square sign with no standing symbol and accessibility permit',
    meaning: 'No standing allowed except for vehicles with accessibility permits.',
    category: 'regulatory',
    importance: 'high',
    // image: '/signs/regulatory/no-standing-permit.png',
    questions: [
      {
        question: "A 'No Standing By Permit Only' sign means:",
        options: ["No standing except with accessibility permit", "No standing at any time", "Standing allowed for 30 minutes", "Standing allowed only at night"],
        correct: 0,
        explanation: "No Standing By Permit Only signs prohibit standing except for vehicles displaying accessibility permits."
      }
    ]
  },

  // WARNING SIGNS
  {
    id: 't-intersection',
    name: 'T-Intersection',
    description: 'Yellow diamond sign with black T symbol',
    meaning: 'Road ends at T-intersection ahead, prepare to turn left or right.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/t-intersection.png',
    questions: [
      {
        question: "A 'T-Intersection' sign means:",
        options: ["Road ends at T-intersection ahead", "Truck intersection ahead", "Traffic light ahead", "Tunnel ahead"],
        correct: 0,
        explanation: "T-Intersection signs warn that the road will end at a T-intersection where you must turn left or right."
      }
    ]
  },
  {
    id: 'curve-left',
    name: 'Curve Left',
    description: 'Yellow diamond sign with left curve arrow',
    meaning: 'Road curves to the left ahead, reduce speed.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/curve-left.png',
    questions: [
      {
        question: "A 'Curve Left' sign means:",
        options: ["Road curves to the left ahead", "Left turn required", "Left lane ends", "Left side road ahead"],
        correct: 0,
        explanation: "Curve Left signs warn of a left curve ahead and advise reducing speed."
      }
    ]
  },
  {
    id: 'curve-right',
    name: 'Curve Right',
    description: 'Yellow diamond sign with right curve arrow',
    meaning: 'Road curves to the right ahead, reduce speed.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/curve-right.png',
    questions: [
      {
        question: "A 'Curve Right' sign means:",
        options: ["Road curves to the right ahead", "Right turn required", "Right lane ends", "Right side road ahead"],
        correct: 0,
        explanation: "Curve Right signs warn of a right curve ahead and advise reducing speed."
      }
    ]
  },
  {
    id: 'steep-hill',
    name: 'Steep Hill',
    description: 'Yellow diamond sign with truck on incline',
    meaning: 'Steep hill ahead, trucks should use low gear.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/steep-hill.png',
    questions: [
      {
        question: "A 'Steep Hill' sign means:",
        options: ["Steep hill ahead, use low gear", "Hill climbing competition", "Truck parking area", "Hill descent only"],
        correct: 0,
        explanation: "Steep Hill signs warn of a steep grade ahead and advise using low gear for trucks."
      }
    ]
  },
  {
    id: 'road-narrows',
    name: 'Road Narrows',
    description: 'Yellow diamond sign with narrowing lines',
    meaning: 'Road width decreases ahead, prepare to merge.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/road-narrows.png',
    questions: [
      {
        question: "A 'Road Narrows' sign means:",
        options: ["Road width decreases ahead", "Road widens ahead", "Road ends ahead", "Road construction ahead"],
        correct: 0,
        explanation: "Road Narrows signs warn that the road width will decrease ahead."
      }
    ]
  },
  {
    id: 'winding-road',
    name: 'Winding Road',
    description: 'Yellow diamond sign with S-curve arrow',
    meaning: 'Series of curves ahead, reduce speed and drive carefully.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/winding-road.png',
    questions: [
      {
        question: "A 'Winding Road' sign means:",
        options: ["Series of curves ahead", "Road ends ahead", "Road construction ahead", "Road widens ahead"],
        correct: 0,
        explanation: "Winding Road signs warn of a series of curves ahead and advise reducing speed."
      }
    ]
  },
  {
    id: 'stop-ahead',
    name: 'Stop Ahead',
    description: 'Yellow diamond sign with stop sign symbol',
    meaning: 'Stop sign ahead, prepare to stop.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/stop-ahead.png',
    questions: [
      {
        question: "A 'Stop Ahead' sign means:",
        options: ["Stop sign ahead", "Stop here", "Stop for construction", "Stop for school"],
        correct: 0,
        explanation: "Stop Ahead signs warn that a stop sign is coming up ahead."
      }
    ]
  },
  {
    id: 'y-intersection',
    name: 'Y-Intersection',
    description: 'Yellow diamond sign with Y symbol',
    meaning: 'Road splits into two directions ahead.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/y-intersection.png',
    questions: [
      {
        question: "A 'Y-Intersection' sign means:",
        options: ["Road splits into two directions", "Yield sign ahead", "Yellow light ahead", "Youth crossing ahead"],
        correct: 0,
        explanation: "Y-Intersection signs warn that the road will split into two directions ahead."
      }
    ]
  },
  {
    id: 'divided-highway-ends',
    name: 'Divided Highway Ends',
    description: 'Yellow diamond sign with merging arrows',
    meaning: 'Divided highway ends, traffic will merge into single roadway.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/divided-highway-ends.png',
    questions: [
      {
        question: "A 'Divided Highway Ends' sign means:",
        options: ["Divided highway ends, traffic will merge", "Divided highway begins", "Highway ends", "Highway construction ahead"],
        correct: 0,
        explanation: "Divided Highway Ends signs warn that the divided highway will end and traffic will merge."
      }
    ]
  },
  {
    id: 'reverse-curve',
    name: 'Reverse Curve',
    description: 'Yellow diamond sign with S-curve arrow',
    meaning: 'Road curves right then left ahead, reduce speed.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/reverse-curve.png',
    questions: [
      {
        question: "A 'Reverse Curve' sign means:",
        options: ["Road curves right then left ahead", "Road curves left then right ahead", "Road ends ahead", "Road construction ahead"],
        correct: 0,
        explanation: "Reverse Curve signs warn of a curve to the right followed by a curve to the left."
      }
    ]
  },
  {
    id: 'railway-crossing',
    name: 'Railway Crossing',
    description: 'Yellow diamond sign with railway tracks',
    meaning: 'Railway crossing ahead, look for trains and be prepared to stop.',
    category: 'warning',
    importance: 'critical',
    // image: '/signs/warning/railway-crossing.png',
    questions: [
      {
        question: "A 'Railway Crossing' sign means:",
        options: ["Railway crossing ahead", "Railway station ahead", "Railway construction ahead", "Railway parking ahead"],
        correct: 0,
        explanation: "Railway Crossing signs warn of a railway crossing ahead and advise looking for trains."
      }
    ]
  },
  {
    id: 'two-way-traffic',
    name: 'Two Way Traffic',
    description: 'Yellow diamond sign with opposing arrows',
    meaning: 'Two-way traffic ahead, watch for oncoming vehicles.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/two-way-traffic.png',
    questions: [
      {
        question: "A 'Two Way Traffic' sign means:",
        options: ["Two-way traffic ahead", "Two lanes ahead", "Two vehicles ahead", "Two hours ahead"],
        correct: 0,
        explanation: "Two Way Traffic signs warn that you will encounter oncoming traffic ahead."
      }
    ]
  },
  {
    id: 'traffic-signal-ahead',
    name: 'Traffic Signal Ahead',
    description: 'Yellow diamond sign with traffic light',
    meaning: 'Traffic signal ahead, prepare to stop if light is red.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/traffic-signal-ahead.png',
    questions: [
      {
        question: "A 'Traffic Signal Ahead' sign means:",
        options: ["Traffic signal ahead", "Traffic stop ahead", "Traffic construction ahead", "Traffic school ahead"],
        correct: 0,
        explanation: "Traffic Signal Ahead signs warn that a traffic light is coming up ahead."
      }
    ]
  },
  {
    id: 'divided-highway-begins',
    name: 'Divided Highway Begins',
    description: 'Yellow diamond sign with diverging arrows',
    meaning: 'Divided highway begins, traffic will separate with median.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/divided-highway-begins.png',
    questions: [
      {
        question: "A 'Divided Highway Begins' sign means:",
        options: ["Divided highway begins", "Divided highway ends", "Highway begins", "Highway construction begins"],
        correct: 0,
        explanation: "Divided Highway Begins signs warn that a divided highway will start ahead."
      }
    ]
  },
  {
    id: 'merge-right',
    name: 'Merge Right',
    description: 'Yellow diamond sign with merge arrow',
    meaning: 'Traffic from right will merge into your lane.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/merge-right.png',
    questions: [
      {
        question: "A 'Merge Right' sign means:",
        options: ["Traffic from right will merge", "Traffic from left will merge", "Right lane ends", "Right turn required"],
        correct: 0,
        explanation: "Merge Right signs warn that traffic from the right will merge into your lane."
      }
    ]
  },
  {
    id: 'curve-chevron',
    name: 'Curve Chevron',
    description: 'Yellow diamond sign with chevron arrow',
    meaning: 'Sharp curve ahead, reduce speed significantly.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/curve-chevron.png',
    questions: [
      {
        question: "A 'Curve Chevron' sign means:",
        options: ["Sharp curve ahead", "Road ends ahead", "Road construction ahead", "Road widens ahead"],
        correct: 0,
        explanation: "Curve Chevron signs warn of a sharp curve ahead and advise reducing speed significantly."
      }
    ]
  },
  {
    id: 'pass-either-side',
    name: 'Pass Either Side',
    description: 'Black square sign with diverging arrows',
    meaning: 'Traffic may pass on either side of an obstruction.',
    category: 'warning',
    importance: 'medium',
    // image: '/signs/warning/pass-either-side.png',
    questions: [
      {
        question: "A 'Pass Either Side' sign means:",
        options: ["Traffic may pass on either side", "Traffic must pass on left", "Traffic must pass on right", "Traffic must stop"],
        correct: 0,
        explanation: "Pass Either Side signs indicate that traffic may pass on either side of an obstruction."
      }
    ]
  },
  {
    id: 'crossroad',
    name: 'Crossroad',
    description: 'Yellow diamond sign with crossroad symbol',
    meaning: 'Four-way intersection ahead, watch for cross traffic.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/crossroad.png',
    questions: [
      {
        question: "A 'Crossroad' sign means:",
        options: ["Four-way intersection ahead", "Three-way intersection ahead", "Road ends ahead", "Road construction ahead"],
        correct: 0,
        explanation: "Crossroad signs warn of a four-way intersection ahead with cross traffic."
      }
    ]
  },
  {
    id: 'uneven-road',
    name: 'Uneven Road',
    description: 'Yellow diamond sign with bumpy road',
    meaning: 'Road surface is uneven ahead, reduce speed.',
    category: 'warning',
    importance: 'medium',
    // image: '/signs/warning/uneven-road.png',
    questions: [
      {
        question: "An 'Uneven Road' sign means:",
        options: ["Road surface is uneven ahead", "Road ends ahead", "Road construction ahead", "Road widens ahead"],
        correct: 0,
        explanation: "Uneven Road signs warn of an uneven road surface ahead and advise reducing speed."
      }
    ]
  },
  {
    id: 'slippery-when-wet',
    name: 'Slippery When Wet',
    description: 'Yellow diamond sign with car and skid marks',
    meaning: 'Road may be slippery when wet, reduce speed.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/slippery-when-wet.png',
    questions: [
      {
        question: "A 'Slippery When Wet' sign means:",
        options: ["Road may be slippery when wet", "Road is always slippery", "Road construction ahead", "Road ends ahead"],
        correct: 0,
        explanation: "Slippery When Wet signs warn that the road may be slippery in wet conditions."
      }
    ]
  },
  {
    id: 'pedestrian-crossing',
    name: 'Pedestrian Crossing',
    description: 'Yellow diamond sign with walking person',
    meaning: 'Pedestrian crossing ahead, watch for people crossing.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/pedestrian-crossing.png',
    questions: [
      {
        question: "A 'Pedestrian Crossing' sign means:",
        options: ["Pedestrian crossing ahead", "Pedestrian prohibited", "Pedestrian construction ahead", "Pedestrian parking ahead"],
        correct: 0,
        explanation: "Pedestrian Crossing signs warn of a pedestrian crossing ahead and advise watching for people."
      }
    ]
  },
  {
    id: 'pavement-ends',
    name: 'Pavement Ends',
    description: 'Yellow diamond sign with road surface change',
    meaning: 'Paved road ends, gravel or dirt surface begins.',
    category: 'warning',
    importance: 'medium',
    // image: '/signs/warning/pavement-ends.png',
    questions: [
      {
        question: "A 'Pavement Ends' sign means:",
        options: ["Paved road ends, gravel begins", "Road ends ahead", "Road construction ahead", "Road widens ahead"],
        correct: 0,
        explanation: "Pavement Ends signs warn that the paved road will end and a gravel or dirt surface will begin."
      }
    ]
  },
  {
    id: 'falling-rocks',
    name: 'Falling Rocks',
    description: 'Yellow diamond sign with rocks falling',
    meaning: 'Falling rocks hazard ahead, drive with caution.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/falling-rocks.png',
    questions: [
      {
        question: "A 'Falling Rocks' sign means:",
        options: ["Falling rocks hazard ahead", "Rock climbing area", "Rock construction ahead", "Rock parking area"],
        correct: 0,
        explanation: "Falling Rocks signs warn of a falling rocks hazard ahead and advise driving with caution."
      }
    ]
  },
  {
    id: 'deer-crossing',
    name: 'Deer Crossing',
    description: 'Yellow diamond sign with deer silhouette',
    meaning: 'Deer crossing area ahead, watch for animals.',
    category: 'warning',
    importance: 'high',
    // image: '/signs/warning/deer-crossing.png',
    questions: [
      {
        question: "A 'Deer Crossing' sign means:",
        options: ["Deer crossing area ahead", "Deer hunting area", "Deer construction ahead", "Deer parking area"],
        correct: 0,
        explanation: "Deer Crossing signs warn of a deer crossing area ahead and advise watching for animals."
      }
    ]
  },

  // GUIDE SIGNS
  {
    id: 'hospital',
    name: 'Hospital',
    description: 'Blue square sign with white H',
    meaning: 'Hospital or medical services nearby.',
    category: 'guide',
    importance: 'medium',
    // image: '/signs/guide/hospital.png',
    questions: [
      {
        question: "A 'Hospital' sign means:",
        options: ["Hospital or medical services nearby", "Hotel nearby", "Highway nearby", "Harbor nearby"],
        correct: 0,
        explanation: "Hospital signs indicate the location of medical services."
      }
    ]
  },
  {
    id: 'gas-station',
    name: 'Gas Station',
    description: 'Blue square sign with gas pump symbol',
    meaning: 'Gas station or fuel services nearby.',
    category: 'guide',
    importance: 'medium',
    // image: '/signs/guide/gas-station.png',
    questions: [
      {
        question: "A 'Gas Station' sign means:",
        options: ["Gas station or fuel services nearby", "Garage nearby", "Garden nearby", "Government building nearby"],
        correct: 0,
        explanation: "Gas Station signs indicate the location of fuel services."
      }
    ]
  },
  {
    id: 'rest-area',
    name: 'Rest Area',
    description: 'Blue square sign with rest symbol',
    meaning: 'Rest area with parking, toilets, and facilities ahead.',
    category: 'guide',
    importance: 'medium',
    // image: '/signs/guide/rest-area.png',
    questions: [
      {
        question: "A 'Rest Area' sign means:",
        options: ["Rest area with facilities ahead", "Restaurant ahead", "Residential area ahead", "Restricted area ahead"],
        correct: 0,
        explanation: "Rest Area signs indicate the location of rest facilities with parking and amenities."
      }
    ]
  },
  {
    id: 'exit-sign',
    name: 'Exit Sign',
    description: 'Green square sign with EXIT text',
    meaning: 'Highway exit ahead.',
    category: 'guide',
    importance: 'high',
    // image: '/signs/guide/exit-sign.png',
    questions: [
      {
        question: "An 'Exit Sign' means:",
        options: ["Highway exit ahead", "Emergency exit", "Express exit", "Exclusive exit"],
        correct: 0,
        explanation: "Exit signs indicate the location of highway exits."
      }
    ]
  },
  {
    id: 'service-centre',
    name: 'Service Centre',
    description: 'Blue square sign with service symbol',
    meaning: 'Service centre with food, fuel, and lodging ahead.',
    category: 'guide',
    importance: 'medium',
    // image: '/signs/guide/service-centre.png',
    questions: [
      {
        question: "A 'Service Centre' sign means:",
        options: ["Service centre with amenities ahead", "Service station ahead", "Service road ahead", "Service area ahead"],
        correct: 0,
        explanation: "Service Centre signs indicate the location of comprehensive service facilities."
      }
    ]
  }
];

export default roadSigns;
