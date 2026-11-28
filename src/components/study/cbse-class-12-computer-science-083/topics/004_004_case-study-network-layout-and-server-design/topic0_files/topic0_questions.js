export default [
  {
    "id": 1,
    "question": "What is the typical mark weightage and structure of the Network Case Study question in the CBSE Class 12 Computer Science (083) board paper?",
    "options": [
      "4 Marks, typically consisting of four 1-mark sub-questions (i, ii, iii, iv) based on an organizational campus scenario.",
      "10 Marks as a single long essay.",
      "1 Mark multiple choice only.",
      "15 Marks programming assignment."
    ],
    "correctAnswer": 0,
    "explanation": "The case study question appears in Section D (or Section C) as a 4-mark mandatory problem with four distinct practical sub-questions.",
    "hint": "4 marks divided into four 1-mark applied questions."
  },
  {
    "id": 2,
    "question": "Which two tables are universally provided in a standard CBSE Class 12 network case study question?",
    "options": [
      "(1) Table of Distances between Blocks/Wings, and (2) Table of Number of Computers in each Block/Wing.",
      "(1) Table of Employee Salaries, and (2) Table of Bus Timings.",
      "(1) Table of Student Marks, and (2) Table of Periodic Elements.",
      "(1) Table of Router Serial Numbers, and (2) Table of MAC Addresses."
    ],
    "correctAnswer": 0,
    "explanation": "The board question presents a distance matrix between campus blocks and a computer distribution table indicating workstation count in each wing.",
    "hint": "Distance table and Computer count table."
  },
  {
    "id": 3,
    "question": "What is almost always Sub-Question (i) or (ii) in the 4-mark case study?",
    "options": [
      "Suggest the most suitable block to place the SERVER, with a valid technical justification.",
      "Calculate the speed of light in vacuum.",
      "Write a Python script to sort an array using quicksort.",
      "Draw an analog modulation waveform."
    ],
    "correctAnswer": 0,
    "explanation": "The examiner routinely asks where the server should be installed, testing knowledge of the 80-20 networking rule.",
    "hint": "Server placement and justification."
  },
  {
    "id": 4,
    "question": "What is another universal sub-question asked in the 4-mark case study?",
    "options": [
      "Suggest an ideal CABLE LAYOUT (topology) to connect all blocks, minimizing cable length or optimizing communication.",
      "Calculate the weight of copper cables in kilograms.",
      "Explain the history of telegraphy.",
      "Identify the brand of keyboards used."
    ],
    "correctAnswer": 0,
    "explanation": "Students must sketch or describe the optimal cable layout connecting blocks (Star topology radiating from the server or Bus/Tree connecting shortest adjacent distances).",
    "hint": "Suggest the most suitable cable layout."
  },
  {
    "id": 5,
    "question": "What is Sub-Question (iii) frequently testing regarding networking hardware placement?",
    "options": [
      "Where should a REPEATER and a HUB/SWITCH be placed, with reasons?",
      "Which brand of air conditioner should cool the server room?",
      "How many chairs should be purchased for the lab?",
      "What color should the Ethernet cables be painted?"
    ],
    "correctAnswer": 0,
    "explanation": "Sub-questions test Repeater placement rules (distance exceeding 70-100m) and Hub/Switch placement rules (inside every block with multiple computers).",
    "hint": "Repeater and Hub/Switch placement."
  },
  {
    "id": 6,
    "question": "What is Sub-Question (iv) frequently testing in the 4-mark case study?",
    "options": [
      "Suggesting the most suitable transmission medium or protocol for connecting remote branches, internet access, or video conferencing.",
      "Writing a MySQL query to drop tables.",
      "Estimating the electrical bill of the campus.",
      "Calculating the teacher's retirement age."
    ],
    "correctAnswer": 0,
    "explanation": "The final sub-question asks for transmission medium recommendations (Fiber Optic vs Radio Wave vs Satellite) or software/hardware for video conferencing/security.",
    "hint": "Medium selection, remote branch connectivity, or video conferencing."
  },
  {
    "id": 7,
    "question": "Can full 4 out of 4 marks be achieved in the case study without writing any code?",
    "options": [
      "Yes, the case study requires concise, accurate technical justifications based on networking rules rather than programming code.",
      "No, students must write at least 50 lines of Python code.",
      "No, students must write SQL queries.",
      "Only if the student writes answers in blue ink."
    ],
    "correctAnswer": 0,
    "explanation": "The case study is an applied networking problem testing practical architectural design and hardware placement principles.",
    "hint": "Requires concise technical justification, not code."
  },
  {
    "id": 8,
    "question": "Why does CBSE include this 4-mark case study question in the Computer Science examination?",
    "options": [
      "To test real-world systems engineering skills and network planning ability for practical school, hospital, or corporate campus setups.",
      "To test mechanical drawing skills.",
      "To test mathematical calculus integration.",
      "To fill empty space on the exam paper."
    ],
    "correctAnswer": 0,
    "explanation": "It evaluates students' ability to synthesize theory (media, devices, topologies, server placement) to solve authentic real-world infrastructure challenges.",
    "hint": "Evaluates practical real-world network design capabilities."
  },
  {
    "id": 9,
    "question": "When justifying Server Placement in a CBSE exam, what is the single golden phrase that awards full marks?",
    "options": [
      "\"The server should be installed in Block X because it has the MAXIMUM NUMBER OF COMPUTERS (80-20 Rule), minimizing inter-block network traffic.\"",
      "\"Because Block X has the biggest windows.\"",
      "\"Because the principal sits in Block X.\"",
      "\"Because Block X was built first.\""
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking schemes look for the 80-20 traffic principle: placing the server in the block with the highest computer density reduces overall network traffic.",
    "hint": "Maximum number of computers (80-20 rule) to reduce inter-block traffic."
  },
  {
    "id": 10,
    "question": "When justifying Repeater Placement in a case study, what is the threshold distance rule?",
    "options": [
      "A Repeater is required along any link where the cable distance exceeds 70 to 100 meters, to regenerate attenuated signals.",
      "Repeaters are required every 5 meters.",
      "Repeaters are only needed if the distance exceeds 10 kilometers.",
      "Repeaters are never used in schools."
    ],
    "correctAnswer": 0,
    "explanation": "Because standard twisted pair cabling suffers significant signal attenuation past 100 meters (or 70-80m in conservative design), a repeater is required.",
    "hint": "Distance exceeding 70-100 meters."
  },
  {
    "id": 11,
    "question": "When asked: 'Where should a Hub/Switch be installed?', what is the standard correct board answer?",
    "options": [
      "In EVERY block/wing, to connect all local workstations in that block together.",
      "Only in the building where the guard sits.",
      "Only on the roof of the tallest building.",
      "In none of the blocks."
    ],
    "correctAnswer": 0,
    "explanation": "Every block contains multiple computers; a switch or hub is required in each block to create the local star topology and connect them together.",
    "hint": "In each and every block."
  },
  {
    "id": 12,
    "question": "If an organization wants to connect a remote branch located 1,500 km away in another state, which communication medium is most suitable?",
    "options": [
      "Satellite Link / Leased Telecom Lines",
      "Coaxial Cable run across the ground",
      "Cat6 UTP Cable",
      "Infrared line-of-sight"
    ],
    "correctAnswer": 0,
    "explanation": "Distances of hundreds or thousands of kilometers require public telecommunications carriers, leased lines, or Satellite communication.",
    "hint": "Satellite or leased telecommunications lines."
  },
  {
    "id": 13,
    "question": "If an organization wants to connect two blocks separated by 120 meters with high speed and zero electromagnetic interference, what medium should be recommended?",
    "options": [
      "Fiber Optic Cable",
      "Coaxial Cable",
      "Infrared",
      "Bluetooth"
    ],
    "correctAnswer": 0,
    "explanation": "Optical fiber provides gigabit speeds, supports distances far beyond 100m without repeaters, and is completely immune to electrical noise.",
    "hint": "Fiber Optic Cable."
  },
  {
    "id": 14,
    "question": "If two buildings are separated by 40 meters and cost is the primary constraint, which medium is recommended?",
    "options": [
      "Cat6 Twisted Pair (UTP) Cable",
      "Undersea Submarine Fiber",
      "Geostationary Satellite",
      "Laser beam"
    ],
    "correctAnswer": 0,
    "explanation": "For short intra-campus runs under 100 meters, Twisted Pair (Cat6 UTP) is the most economical and standard solution.",
    "hint": "Twisted Pair (UTP) Cable."
  },
  {
    "id": 15,
    "question": "What topology is formed when cables radiate out from the central Server block directly to all other campus blocks?",
    "options": [
      "Star Topology",
      "Ring Topology",
      "Bus Topology",
      "Full Mesh Topology"
    ],
    "correctAnswer": 0,
    "explanation": "Connecting all blocks directly to the central server building forms an inter-building Star topology.",
    "hint": "Star topology radiating from the server."
  },
  {
    "id": 16,
    "question": "What topology connects blocks in a daisy-chain sequence (e.g. Block A -> Block B -> Block C) to minimize total cable meters?",
    "options": [
      "Bus Topology",
      "Ring Topology",
      "Star Topology",
      "Full Mesh"
    ],
    "correctAnswer": 0,
    "explanation": "Connecting blocks along a single linear chain represents a Bus topology layout.",
    "hint": "Linear bus layout connecting adjacent blocks."
  },
  {
    "id": 17,
    "question": "If the question asks: 'Suggest a device to connect the campus LAN to the external Internet via an ISP', what device should you name?",
    "options": [
      "Router / Modem",
      "Passive Hub",
      "BNC Connector",
      "Terminator"
    ],
    "correctAnswer": 0,
    "explanation": "A Router (or broadband Modem/Gateway) is essential to route packets between the internal private LAN and the external Internet.",
    "hint": "Router or Modem."
  },
  {
    "id": 18,
    "question": "What service or protocol should you suggest when a branch office in a hilly area needs to communicate with the main campus with zero physical cabling?",
    "options": [
      "Radio Wave / Microwave transmission (or Satellite communication)",
      "Underground UTP cable",
      "Dial-up copper wire",
      "Bluetooth"
    ],
    "correctAnswer": 0,
    "explanation": "Hilly and mountainous terrains make cable laying prohibitively expensive and prone to physical disruption; unguided wireless media (Radio/Microwave/Satellite) is recommended.",
    "hint": "Radio Wave, Microwave, or Satellite."
  },
  {
    "id": 19,
    "question": "Which software and hardware are typically recommended for conducting online video conferencing in a case study?",
    "options": [
      "Hardware: Webcams, Microphones, Display Screens; Protocol/Software: VoIP / SIP / H.323 (e.g., Zoom, Teams)",
      "Hardware: Floppy Disks; Software: Notepad",
      "Hardware: Barcode Scanners; Software: MS Paint",
      "Hardware: CD Drives; Software: Calculator"
    ],
    "correctAnswer": 0,
    "explanation": "High-definition webcams, noise-canceling microphones, speakers, and VoIP/SIP video conferencing software are standard recommendations.",
    "hint": "Webcams, microphones, VoIP/video conferencing software."
  },
  {
    "id": 20,
    "question": "What is the typical distribution of marks across the four sub-questions in a CBSE case study?",
    "options": [
      "1 Mark for sub-question (a), 1 Mark for (b), 1 Mark for (c), and 1 Mark for (d) = Total 4 Marks.",
      "4 Marks for sub-question (a) only.",
      "2 Marks for (a) and 2 Marks for (b).",
      "0.5 Marks each for 8 questions."
    ],
    "correctAnswer": 0,
    "explanation": "CBSE uniformly allocates 1 mark to each of the 4 sub-parts, making it very straightforward to score full marks.",
    "hint": "1 mark per sub-question (4 marks total)."
  },
  {
    "id": 21,
    "question": "In a case study, if Block Admin has 30 computers, Block Accounts has 25 computers, and Block Tech has 120 computers, where MUST the server be placed?",
    "options": [
      "Block Tech",
      "Block Admin",
      "Block Accounts",
      "In any block chosen at random"
    ],
    "correctAnswer": 0,
    "explanation": "Block Tech has 120 computers (the maximum). By the 80-20 rule, placing the server in Block Tech minimizes heavy network traffic across inter-building cables.",
    "hint": "Block Tech (maximum computers)."
  },
  {
    "id": 22,
    "question": "If the distance between Block Tech and Block Admin is 140 meters, should a Repeater be placed between them if connected via UTP cable?",
    "options": [
      "Yes, because the distance (140 m) exceeds the standard 70-100m threshold for UTP cabling.",
      "No, repeaters are only for distances over 1,000 meters.",
      "No, repeaters slow down the network.",
      "Only if the computers are laptops."
    ],
    "correctAnswer": 0,
    "explanation": "Since 140 m > 100 m, signal attenuation requires a repeater to regenerate the digital pulses along the UTP link.",
    "hint": "140 m exceeds the 100 m UTP limit."
  },
  {
    "id": 23,
    "question": "If the organization decides to use Fiber Optic cable instead of UTP between the blocks separated by 140 meters, is a repeater still needed?",
    "options": [
      "No, because fiber optic cables can transmit signals over several kilometers (up to 2-10 km) without requiring a repeater.",
      "Yes, fiber optic requires repeaters every 10 meters.",
      "Yes, fiber optic cables cannot transmit light past 50 meters.",
      "Fiber optic cannot be used between buildings."
    ],
    "correctAnswer": 0,
    "explanation": "Fiber optic cables have extremely low attenuation, effortlessly spanning several kilometers without signal regeneration.",
    "hint": "Fiber optic does not require repeaters for 140 meters."
  },
  {
    "id": 24,
    "question": "What security component should be recommended in the case study if the school wants to block external malicious internet access to the student database server?",
    "options": [
      "A Firewall",
      "An unmanaged Hub",
      "An RJ45 Connector",
      "A Coaxial Terminator"
    ],
    "correctAnswer": 0,
    "explanation": "A Firewall (Hardware or Software) is the standard recommendation for securing internal servers against unauthorized Internet access.",
    "hint": "Firewall."
  },
  {
    "id": 25,
    "question": "How should a student present the cable layout in their answer sheet to secure the full 1 mark?",
    "options": [
      "Draw a clean labeled block diagram showing the blocks as labeled boxes and connecting lines with the server clearly marked and total cable length calculated.",
      "Write a 500-word paragraph describing the history of cables.",
      "Leave the answer blank.",
      "Draw a picture of a tree."
    ],
    "correctAnswer": 0,
    "explanation": "A neat block diagram with labeled building names, clear connecting lines, and the server marked awards full credit instantly.",
    "hint": "Neat labeled block diagram with server location."
  }
];
