export const topic5Questions = [
  {
    id: 1,
    question: "What is the primary function of an 'Actuator' in a robotic system?",
    options: [
      "To convert electrical, hydraulic, or pneumatic energy into physical mechanical movement or torque",
      "To measure ambient temperature and humidity",
      "To store the robot's operating system files",
      "To execute SQL database transactions"
    ],
    correctAnswer: 0,
    explanationEn: "Actuators serve as the 'muscles' of a robot, converting stored energy into mechanical physical displacement or rotation.",
    explanationBn: "একচুয়েটর (Actuator) হলো রোবটের 'পেশী' যা বৈদ্যুতিক, হাইড্রোলিক বা নিউমেটিক শক্তিকে যান্ত্রিক গতিতে রূপান্তর করে।"
  },
  {
    id: 2,
    question: "Which component of a robot acts as its 'Brain', processing sensor data and computing motor commands?",
    options: [
      "The Controller (Microprocessor / Microcontroller)",
      "The Mechanical Gripper",
      "The Ultrasonic Transducer",
      "The Rubber Wheel"
    ],
    correctAnswer: 0,
    explanationEn: "The Controller (e.g., microcontroller, CPU) executes the control loop, reading sensor inputs and commanding actuators.",
    explanationBn: "কন্ট্রোলার (Controller/Microprocessor) রোবটের 'মস্তিষ্ক' হিসেবে কাজ করে যা সেন্সরের ডেটা বিশ্লেষণ করে বিভিন্ন অঙ্গকে নির্দেশ পাঠায়।"
  },
  {
    id: 3,
    question: "What are the three sequential stages of the autonomous robotic feedback loop?",
    options: [
      "Sense &rarr; Plan &rarr; Act",
      "Compile &rarr; Link &rarr; Run",
      "Fetch &rarr; Decode &rarr; Execute",
      "Upload &rarr; Download &rarr; Delete"
    ],
    correctAnswer: 0,
    explanationEn: "Autonomous robots continuously operate in a Sense (gather data) &rarr; Plan (compute decisions) &rarr; Act (execute physical movements) feedback loop.",
    explanationBn: "স্বয়ংক্রিয় রোবট মূলত Sense (অনুভব করা) &rarr; Plan (পরিকল্পনা করা) &rarr; Act (কাজ সম্পন্ন করা) চক্রে পরিচালিত হয়।"
  },
  {
    id: 4,
    question: "Which sensor is commonly used in obstacle-avoiding mobile robots to measure distance using high-frequency sound waves?",
    options: [
      "Ultrasonic Sensor (e.g., HC-SR04)",
      "Capacitive Touch Screen",
      "Thermistor",
      "Linear Potentiometer"
    ],
    correctAnswer: 0,
    explanationEn: "Ultrasonic sensors emit high-frequency sound pulses and calculate distance based on the time of flight of the returning echo.",
    explanationBn: "আল্ট্রাসনিক সেন্সর উচ্চ কম্পাঙ্কের শব্দ তরঙ্গ পাঠিয়ে প্রতিধ্বনির সময় হিসেব করে বাধার দূরত্ব পরিমাপ করে।"
  },
  {
    id: 5,
    question: "What is an 'End Effector' in robotics?",
    options: [
      "The device or tool attached to the end of a robotic arm that interacts directly with the physical environment",
      "The power cord connecting the robot to the wall outlet",
      "The cooling fan installed on the motherboard",
      "The last line of code in the Python program"
    ],
    correctAnswer: 0,
    explanationEn: "An end effector is the robotic hand, gripper, welding torch, or suction tool attached to the extremity of a robot arm to manipulate objects.",
    explanationBn: "এন্ড ইফেক্টর (End Effector) হলো রোবোটিক হাতের শেষ প্রান্তে সংযুক্ত বিশেষ টুল বা গ্রিপার যা বস্তুকে ধরা বা কাজ করার জন্য ব্যবহৃত হয়।"
  },
  {
    id: 6,
    question: "Which type of electric motor is preferred for robot joints where precise angular position control is required?",
    options: [
      "Servo Motor / Stepper Motor",
      "Simple un-geared toy DC Motor",
      "AC Induction Motor for heavy fans",
      "Internal Combustion Engine"
    ],
    correctAnswer: 0,
    explanationEn: "Servo and stepper motors provide closed-loop angular feedback, allowing precise joint angle positioning (e.g., 45°, 90°).",
    explanationBn: "সার্ভো মোটর বা স্টেপার মোটর নির্দিষ্ট কোণে (যেমন ৪৫°, ৯০°) নিখুঁতভাবে ঘূর্ণন নিয়ন্ত্রণের জন্য রোবোটিক জয়েন্টে ব্যবহৃত হয়।"
  },
  {
    id: 7,
    question: "Which robotic surgery system is widely used globally to assist surgeons in performing minimally invasive, high-precision operations?",
    options: [
      "The da Vinci Surgical System",
      "Deep Blue Chess Machine",
      "Roomba Vacuum System",
      "Google PageRank Engine"
    ],
    correctAnswer: 0,
    explanationEn: "The da Vinci Surgical System allows surgeons to control robotic micro-instruments with extreme dexterity and 3D HD visualization.",
    explanationBn: "ডা ভিঞ্চি সার্জিক্যাল সিস্টেম বিশ্বব্যাপী চিকিৎসকদের অত্যন্ত নিখুঁত ও ক্ষুদ্রতম কাটার মাধ্যমে অস্ত্রোপচার সম্পন্ন করতে সহায়তা করে।"
  },
  {
    id: 8,
    question: "In automated e-commerce fulfillment centers (e.g., Amazon warehouses), mobile robots are used to:",
    options: [
      "Transport heavy inventory shelves and packages autonomously to human packing stations",
      "Manually answer telephone customer calls",
      "Print paper receipts on dot-matrix printers",
      "Design web advertising banners"
    ],
    correctAnswer: 0,
    explanationEn: "Autonomous Mobile Robots (AMRs) navigate warehouse floors to carry heavy shelving pods directly to pick-pack stations.",
    explanationBn: "অ্যামাজনের মতো গুদামঘরে স্বয়ংক্রিয় মোবাইল রোবট ভারী পণ্যবাহী তাকগুলোকে সরাসরি প্যাকিং স্টেশনে পৌঁছে দেয়।"
  },
  {
    id: 9,
    question: "What type of actuator relies on pressurized fluid (liquid) to lift exceptionally heavy industrial loads?",
    options: [
      "Hydraulic Actuator",
      "Pneumatic Actuator",
      "Piezoelectric Crystal",
      "Direct Drive Solenoid"
    ],
    correctAnswer: 0,
    explanationEn: "Hydraulic actuators utilize incompressible fluids (oil) under high pressure to generate immense mechanical lifting force.",
    explanationBn: "হাইড্রোলিক একচুয়েটর উচ্চচাপযুক্ত তরল (তেল) ব্যবহারের মাধ্যমে অতি ভারী শিল্পসামগ্রী উত্তোলনের শক্তি তৈরি করে।"
  },
  {
    id: 10,
    question: "What type of actuator utilizes compressed air for fast, clean, and lightweight mechanical operations?",
    options: [
      "Pneumatic Actuator",
      "Hydraulic Actuator",
      "Nuclear Actuator",
      "Combustion Turbine"
    ],
    correctAnswer: 0,
    explanationEn: "Pneumatic systems use compressed air to achieve rapid, clean, and explosive linear motions common in packaging lines.",
    explanationBn: "নিউমেটিক একচুয়েটর সংকুচিত বাতাস (Compressed Air) ব্যবহার করে অত্যন্ত দ্রুত ও পরিষ্কার যান্ত্রিক গতি তৈরি করে।"
  },
  {
    id: 11,
    question: "The Indian lunar exploration rover 'Pragyan' on Chandrayaan-3 is an example of:",
    options: [
      "An extraterrestrial planetary exploration rover robot",
      "A household floor scrubbing robot",
      "An automated automobile welding arm",
      "A commercial passenger drone"
    ],
    correctAnswer: 0,
    explanationEn: "ISRO's Pragyan rover is an autonomous solar-powered mobile planetary exploration robot deployed on the Moon.",
    explanationBn: "ইসরোর 'প্রজ্ঞান' রোভার হলো চাঁদের পৃষ্ঠে বৈজ্ঞানিক গবেষণার জন্য প্রেরিত একটি স্বয়ংক্রিয় মহাকাশ রোবট।"
  },
  {
    id: 12,
    question: "Which sensor provides a robot with angular orientation, rotational speed, and tilt balance data?",
    options: [
      "Inertial Measurement Unit (IMU - Gyroscope & Accelerometer)",
      "Smoke Detector",
      "Barometer only",
      "LDR Photoresistor"
    ],
    correctAnswer: 0,
    explanationEn: "IMUs combine accelerometers and gyroscopes to maintain posture, tilt orientation, and balance for humanoid and drone robots.",
    explanationBn: "IMU (জাইরোস্কোপ ও অ্যাক্সিলেরোমিটার) রোবটের ভারসাম্য, হেলান কোণ ও ঘূর্ণন গতি পরিমাপ করে স্থির রাখতে সাহায্য করে।"
  },
  {
    id: 13,
    question: "A line-following robot uses which sensor pair to distinguish between dark tracks and light floor surfaces?",
    options: [
      "Infrared (IR) Transmitter and Receiver LED pair",
      "Microphone audio sensor",
      "GPS satellite antenna",
      "Thermal heat camera"
    ],
    correctAnswer: 0,
    explanationEn: "IR sensors measure reflected infrared light: black lines absorb IR light (low reflection) while white floors reflect it strongly.",
    explanationBn: "ইনফ্রারেড (IR) সেন্সর কালো দাগ ও সাদা মেঝের মধ্যে আলোর প্রতিফলনের তারতম্য বিচার করে লাইন অনুসরণ করে।"
  },
  {
    id: 14,
    question: "What is a 'Cobot' (Collaborative Robot) in modern manufacturing?",
    options: [
      "A robot designed to safely work alongside human workers in shared workspaces without protective cages",
      "A robot that only operates under ocean water",
      "A decommissioned old robot sold for scrap metal",
      "A software algorithm that writes compiler code"
    ],
    correctAnswer: 0,
    explanationEn: "Cobots are equipped with sensitive force-torque collision sensors allowing safe, close physical collaboration with human operators.",
    explanationBn: "কোবট (Cobot) হলো বিশেষ সুরক্ষা সেন্সরযুক্ত রোবট যা কোনো ধাতব খাঁচা ছাড়াই মানুষের সাথে পাশাপাশি নিরাপদে কাজ করতে পারে।"
  },
  {
    id: 15,
    question: "What is LiDAR (Light Detection and Ranging) in autonomous robotics and self-driving cars?",
    options: [
      "A remote sensing technology that measures distances by illuminating targets with pulsed laser beams to build high-precision 3D point clouds",
      "A method of charging car batteries wirelessly",
      "A fuel efficiency rating system",
      "A digital FM radio receiver"
    ],
    correctAnswer: 0,
    explanationEn: "LiDAR fires millions of laser pulses per second to generate real-time, highly detailed 3D spatial maps of surrounding terrain.",
    explanationBn: "LiDAR লেজার রশ্মি নিক্ষেপের মাধ্যমে প্রতি সেকেন্ডে লক্ষাধিক বিন্দুর দূরত্ব মেপে চারপাশের নিখুঁত ত্রিমাত্রিক মানচিত্র তৈরি করে।"
  },
  {
    id: 16,
    question: "Why are robots extensively deployed in automotive painting and welding shops?",
    options: [
      "They provide consistent sub-millimeter precision and protect humans from toxic chemical fumes and high-voltage sparks",
      "Because robots do not require electricity to operate",
      "Because robots can design sports cars without human engineers",
      "Because car paint adheres only to metal machines"
    ],
    correctAnswer: 0,
    explanationEn: "Robots guarantee uniform weld strength and paint thickness while eliminating human worker exposure to hazardous chemical fumes.",
    explanationBn: "রোবট অতি উচ্চ নির্ভুলতায় কাজ করে এবং বিষাক্ত রঙের গ্যাস ও বিপজ্জনক ওয়েল্ডিংয়ের স্ফুলিঙ্গ থেকে মানবকর্মীদের রক্ষা করে।"
  },
  {
    id: 17,
    question: "What is a 'Tactile Sensor' on a robotic hand used for?",
    options: [
      "Measuring contact touch, grip force, and surface friction to avoid crushing delicate objects",
      "Streaming 4K video over the internet",
      "Determining the robot's GPS coordinates",
      "Cooling the battery module"
    ],
    correctAnswer: 0,
    explanationEn: "Tactile sensors measure contact pressure and slip, enabling a robotic gripper to hold delicate items like eggs without breaking them.",
    explanationBn: "ট্যাকটাইল বা স্পর্শ সেন্সর গ্রিপারের চাপ নিয়ন্ত্রণ করে যাতে ডিম বা কাঁচের মতো ভঙ্গুর বস্তু না ভেঙে সঠিকভাবে ধরা যায়।"
  },
  {
    id: 18,
    question: "What is an AGV (Automated Guided Vehicle)?",
    options: [
      "A portable mobile robot that follows marked lines, wires, or magnetic strips on the floor to transport manufacturing materials",
      "A traditional gasoline passenger bus",
      "A supersonic fighter airplane",
      "A hand-pushed wheelbarrow"
    ],
    correctAnswer: 0,
    explanationEn: "AGVs are industrial wheeled automated vehicles guided by floor markers or magnetic tape to transfer materials between assembly stations.",
    explanationBn: "AGV হলো কারখানার মেঝেতে দাগ বা চৌম্বকীয় লাইন অনুসরণ করে মালামাল বহনকারী চালকবিহীন বিশেষ যান।"
  },
  {
    id: 19,
    question: "What role do Computer Vision cameras play in modern pick-and-place robots?",
    options: [
      "Identifying the orientation, shape, and 3D spatial coordinates of randomly placed parts on conveyor belts",
      "Taking portraits of factory managers",
      "Lighting up the warehouse at night",
      "Recording audio conversations of factory staff"
    ],
    correctAnswer: 0,
    explanationEn: "Vision systems detect 3D position and orientation so robotic grippers can accurately pick randomly oriented parts from conveyor belts.",
    explanationBn: "কম্পিউটার ভিশন ক্যামেরা কনভেয়ার বেল্টের ওপর ছড়িয়ে থাকা জিনিসপত্রের আকার ও অবস্থান নিখুঁতভাবে চিহ্নিত করে গ্রিপারকে নির্দেশ দেয়।"
  },
  {
    id: 20,
    question: "Which of the following is an ethical or economic concern associated with rapid industrial robot adoption?",
    options: [
      "Potential displacement of low-skilled manual laborers in repetitive assembly jobs",
      "Robots demanding paid vacation time",
      "Robots refusing to work on weekends",
      "Increase in paper stationary consumption"
    ],
    correctAnswer: 0,
    explanationEn: "Widespread robotic automation can lead to job displacement for workers performing routine repetitive tasks, requiring workforce reskilling.",
    explanationBn: "কারখানায় রোবটের দ্রুত প্রসারের ফলে সাধারণ কায়িক শ্রমের চাকরির বিলুপ্তি ঘটতে পারে, যার জন্য কর্মীদের প্রযুক্তিগত পুনঃপ্রশিক্ষণ প্রয়োজন।"
  },
  {
    id: 21,
    question: "What is 'Degrees of Freedom' (DoF) of a robotic arm manipulator?",
    options: [
      "The number of independent movable rotational or prismatic joints that determine the arm's motion flexibility",
      "The cost of the robot in dollars",
      "The battery charge level in percentage",
      "The weight of the robot chassis in kilograms"
    ],
    correctAnswer: 0,
    explanationEn: "Degrees of Freedom (DoF) refers to the number of independent axes or joints the robotic arm can articulate (e.g., 6-DoF industrial arm).",
    explanationBn: "ডিগ্রিজ অব ফ্রিডম (DoF) হলো রোবটের বাহুতে থাকা স্বাধীন জয়েন্ট বা অক্ষের সংখ্যা যা তার নড়াচড়ার বহুমুখী স্বাধীনতা নির্ধারণ করে।"
  },
  {
    id: 22,
    question: "In bomb disposal and explosive ordnance disposal (EOD), robots are primarily used to:",
    options: [
      "Remotely inspect, transport, and neutralize suspected explosive devices without risking human bomb technicians' lives",
      "Take photographs for social media",
      "Speed up vehicular traffic flow",
      "Assemble electronic television sets"
    ],
    correctAnswer: 0,
    explanationEn: "EOD robots provide remote video feeds and robotic arms to defuse or safely detonate explosive threats from safe standoff distances.",
    explanationBn: "বোমা নিষ্ক্রিয়কারী রোবট মানব জীবন ঝুঁকিতে না ফেলে দূর থেকে ভিডিও দেখে এবং যান্ত্রিক বাহুর সাহায্যে বিপজ্জনক বিস্ফোরক নিষ্ক্রিয় করে।"
  },
  {
    id: 23,
    question: "What is an 'Exoskeleton' robot in medical rehabilitation?",
    options: [
      "A wearable motorized mechanical suit that assists paralyzed or injured patients in walking and regaining mobility",
      "A metal case that protects a desktop hard drive",
      "A surgical scalp blade",
      "An automated hospital elevator"
    ],
    correctAnswer: 0,
    explanationEn: "Medical exoskeletons are wearable robotic braces powered by electric motors that restore locomotion to patients with spinal cord injuries.",
    explanationBn: "মেডিকেল এক্সোস্কেলিটন হলো পরিধানযোগ্য রোবোটিক স্যুট যা পক্ষাঘাতগ্রস্ত বা আহত রোগীদের পুনরায় হাঁটাচলা করতে সাহায্য করে।"
  },
  {
    id: 24,
    question: "Autonomous robotic vacuum cleaners (like iRobot Roomba) map home floors using:",
    options: [
      "Infrared bump sensors, optical floor tracking, and SLAM algorithms",
      "Underwater sonar transmitters",
      "Combustion diesel engines",
      "Barometric air pressure gauges"
    ],
    correctAnswer: 0,
    explanationEn: "Robotic vacuums use bumper sensors, IR cliff detectors, and SLAM vision algorithms to navigate and clean rooms systematically.",
    explanationBn: "রোবোটিক ভ্যাকিউম ক্লিনার ইনফ্রারেড সেন্সর ও SLAM অ্যালগরিদম ব্যবহার করে ঘরের মেঝের মানচিত্র তৈরি করে মেঝে পরিষ্কার করে।"
  },
  {
    id: 25,
    question: "Which field of study combines biology, mechanics, and electronics to design robots inspired by animals (e.g., robotic dogs, bird drones)?",
    options: [
      "Biomimetic Robotics (Biomimicry)",
      "Astrophysics",
      "Organic Chemistry",
      "Quantum Cryptography"
    ],
    correctAnswer: 0,
    explanationEn: "Biomimetics studies biological mechanisms in nature (like cheetah running or insect flight) and replicates them in robotic structures.",
    explanationBn: "বায়োমিমেটিক রোবোটিক্স হলো জীববিজ্ঞানের বিভিন্ন প্রাণীর দৈহিক গঠন ও গতিবিধি অনুকরণ করে রোবট নকশা করার বিজ্ঞান (যেমন রোবট কুকুর)।"
  }
];
