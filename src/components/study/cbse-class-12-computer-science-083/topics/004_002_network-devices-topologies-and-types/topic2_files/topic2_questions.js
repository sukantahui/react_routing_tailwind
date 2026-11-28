// 25 Authentic CBSE Board Examination Questions for Topic 2
const questions = [
  {
    "id": 1,
    "question": "What does the acronym 'RJ' stand for in RJ-45 connector terminology?",
    "options": [
      "Registered Jack",
      "Routing Junction",
      "Real Joint",
      "Relay Jack"
    ],
    "answer": "Registered Jack",
    "explanation": "RJ stands for Registered Jack, a standardized telecommunication network interface format.",
    "hint": "Registered Jack."
  },
  {
    "id": 2,
    "question": "How many positions and gold-plated electrical contacts are present inside a standard RJ-45 connector?",
    "options": [
      "4 Positions, 4 Contacts (4P4C)",
      "6 Positions, 4 Contacts (6P4C)",
      "8 Positions, 8 Contacts (8P8C)",
      "12 Positions, 12 Contacts (12P12C)"
    ],
    "answer": "8 Positions, 8 Contacts (8P8C)",
    "explanation": "RJ-45 is an 8P8C modular connector, meaning it provides 8 positions with 8 gold-plated conductive contacts.",
    "hint": "8 Positions, 8 Contacts."
  },
  {
    "id": 3,
    "question": "Which transmission medium is terminated using an RJ-45 connector?",
    "options": [
      "Twisted Pair Cable (UTP / STP)",
      "Thick Coaxial Cable",
      "Single-Mode Optical Fiber",
      "Satellite Antenna Feed"
    ],
    "answer": "Twisted Pair Cable (UTP / STP)",
    "explanation": "RJ-45 plugs are crimped onto the ends of 4-pair unshielded (UTP) or shielded (STP) twisted pair cables.",
    "hint": "Twisted pair Ethernet cables."
  },
  {
    "id": 4,
    "question": "What is the primary difference between an RJ-45 connector and an RJ-11 connector?",
    "options": [
      "RJ-45 has 8 pins used for Ethernet LANs; RJ-11 has 4 or 6 pins used for telephone voice lines",
      "RJ-45 is wireless while RJ-11 is wired",
      "RJ-11 is used for optical fiber",
      "RJ-45 only works with direct current"
    ],
    "answer": "RJ-45 has 8 pins used for Ethernet LANs; RJ-11 has 4 or 6 pins used for telephone voice lines",
    "explanation": "RJ-45 is physically wider with 8 pins for 4-pair Ethernet, while RJ-11 is narrower with 4/6 pins for 1- or 2-pair telephone lines.",
    "hint": "RJ-45 has 8 pins (Ethernet); RJ-11 has 4/6 pins (telephone)."
  },
  {
    "id": 5,
    "question": "Which two wiring pinout schemes are standardized by ANSI/TIA-568 for terminating RJ-45 cables?",
    "options": [
      "T568A and T568B",
      "IEEE 802.3 and 802.11",
      "TCP and UDP",
      "OSI-7 and DoD-4"
    ],
    "answer": "T568A and T568B",
    "explanation": "ANSI/TIA-568 establishes T568A and T568B as the two standard pin-out configurations for 8-conductor twisted pair.",
    "hint": "T568A and T568B."
  },
  {
    "id": 6,
    "question": "What type of cable has T568B configuration at BOTH ends?",
    "options": [
      "Straight-Through Cable",
      "Crossover Cable",
      "Rollover Console Cable",
      "Fiber Patch Cable"
    ],
    "answer": "Straight-Through Cable",
    "explanation": "When both ends of a cable share the identical standard (e.g. T568B at both ends), it is a Straight-Through cable.",
    "hint": "Identical wiring at both ends."
  },
  {
    "id": 7,
    "question": "Which network devices are typically connected using a Straight-Through RJ-45 Ethernet cable?",
    "options": [
      "Dissimilar devices, such as a Workstation (PC) to a Switch or Hub",
      "Two identical PCs directly to each other without a switch",
      "Two identical switches directly to each other without Auto-MDIX",
      "A keyboard directly to a mouse"
    ],
    "answer": "Dissimilar devices, such as a Workstation (PC) to a Switch or Hub",
    "explanation": "Straight-through cables connect dissimilar devices (PC to Switch, PC to Hub, Router to Switch).",
    "hint": "Connecting different kinds of devices."
  },
  {
    "id": 8,
    "question": "What type of cable has T568A configuration at one end and T568B at the other end?",
    "options": [
      "Straight-Through Cable",
      "Crossover Cable",
      "Null Modem Cable",
      "Coaxial Drop Cable"
    ],
    "answer": "Crossover Cable",
    "explanation": "A crossover cable swaps the transmit (Pins 1 & 2) and receive (Pins 3 & 6) pairs by wiring T568A on one end and T568B on the other.",
    "hint": "Crossover cable."
  },
  {
    "id": 9,
    "question": "Which scenario traditionally required a Crossover RJ-45 Ethernet cable?",
    "options": [
      "Connecting two workstations directly PC-to-PC without a switch",
      "Connecting a workstation to a wall jack",
      "Connecting a router to an optical fiber",
      "Connecting a laptop to a Wi-Fi access point"
    ],
    "answer": "Connecting two workstations directly PC-to-PC without a switch",
    "explanation": "Connecting two similar devices (PC to PC) requires swapping Tx and Rx pairs so one PC's transmitter connects to the other PC's receiver.",
    "hint": "Direct PC-to-PC link."
  },
  {
    "id": 10,
    "question": "What modern networking feature allows Ethernet switches and NICs to automatically detect cable wiring and eliminate the need for crossover cables?",
    "options": [
      "Auto-MDIX (Automatic Medium-Dependent Interface Crossover)",
      "Auto-Focus",
      "DHCP",
      "DNS resolution"
    ],
    "answer": "Auto-MDIX (Automatic Medium-Dependent Interface Crossover)",
    "explanation": "Auto-MDIX automatically senses the cable type and electronically swaps the transmit and receive circuits inside the port as needed.",
    "hint": "Auto-MDIX."
  },
  {
    "id": 11,
    "question": "In 100BASE-TX Fast Ethernet, which four pins out of the eight RJ-45 pins are actively used for data transmission?",
    "options": [
      "Pins 1, 2, 3, and 6",
      "Pins 4, 5, 7, and 8",
      "Pins 1, 2, 7, and 8",
      "All 8 pins equally"
    ],
    "answer": "Pins 1, 2, 3, and 6",
    "explanation": "Fast Ethernet (100BASE-TX) uses only Pins 1 & 2 (Transmit) and Pins 3 & 6 (Receive). Gigabit Ethernet uses all 8 pins.",
    "hint": "Pins 1, 2, 3, and 6."
  },
  {
    "id": 12,
    "question": "What mechanical feature on an RJ-45 plug prevents the cable from accidentally slipping out of a network port?",
    "options": [
      "A flexible plastic locking tab (retaining latch)",
      "Permanent superglue",
      "Magnetic screws",
      "Heavy lead weight"
    ],
    "answer": "A flexible plastic locking tab (retaining latch)",
    "explanation": "The springy plastic retaining tab on top of the RJ-45 plug clicks into a notch in the jack, securing it firmly until depressed.",
    "hint": "Flexible plastic latch tab."
  },
  {
    "id": 13,
    "question": "What tool is used by network engineers to physically attach an RJ-45 plug onto an unshielded twisted pair cable?",
    "options": [
      "RJ-45 Crimping Tool",
      "Blowtorch",
      "Wire saw",
      "Soldering iron"
    ],
    "answer": "RJ-45 Crimping Tool",
    "explanation": "A crimping tool drives the 8 gold-plated copper contacts through the wire insulation and clamps the plastic strain relief around the cable jacket.",
    "hint": "Crimping tool."
  },
  {
    "id": 14,
    "question": "In T568B wiring, which colored pair is connected to Pin 1 and Pin 2?",
    "options": [
      "Orange pair (White/Orange on Pin 1, Orange on Pin 2)",
      "Green pair",
      "Blue pair",
      "Brown pair"
    ],
    "answer": "Orange pair (White/Orange on Pin 1, Orange on Pin 2)",
    "explanation": "In T568B, the Orange pair occupies Pins 1 & 2 (White/Orange = Pin 1, solid Orange = Pin 2).",
    "hint": "White/Orange and Orange."
  },
  {
    "id": 15,
    "question": "In T568A wiring, which colored pair is connected to Pin 1 and Pin 2?",
    "options": [
      "Green pair (White/Green on Pin 1, Green on Pin 2)",
      "Orange pair",
      "Brown pair",
      "Blue pair"
    ],
    "answer": "Green pair (White/Green on Pin 1, Green on Pin 2)",
    "explanation": "In T568A, the Green pair occupies Pins 1 & 2 (White/Green = Pin 1, solid Green = Pin 2).",
    "hint": "White/Green and Green."
  },
  {
    "id": 16,
    "question": "What color wires are connected to Pin 4 and Pin 5 in BOTH T568A and T568B standards?",
    "options": [
      "Blue on Pin 4, White/Blue on Pin 5",
      "Green on Pin 4, White/Green on Pin 5",
      "Brown on Pin 4, Orange on Pin 5",
      "Black on Pin 4, Red on Pin 5"
    ],
    "answer": "Blue on Pin 4, White/Blue on Pin 5",
    "explanation": "In both T568A and T568B, the Blue pair is identical: Pin 4 is solid Blue and Pin 5 is White/Blue.",
    "hint": "The Blue pair occupies Pins 4 & 5 in both standards."
  },
  {
    "id": 17,
    "question": "What color wires are connected to Pin 7 and Pin 8 in BOTH T568A and T568B standards?",
    "options": [
      "White/Brown on Pin 7, Brown on Pin 8",
      "White/Green on Pin 7, Green on Pin 8",
      "Orange on Pin 7, Blue on Pin 8",
      "Purple on Pin 7, Yellow on Pin 8"
    ],
    "answer": "White/Brown on Pin 7, Brown on Pin 8",
    "explanation": "In both T568A and T568B, the Brown pair is identical: Pin 7 is White/Brown and Pin 8 is solid Brown.",
    "hint": "The Brown pair occupies Pins 7 & 8 in both standards."
  },
  {
    "id": 18,
    "question": "What testing tool is used by technicians to verify that all 8 pins of an RJ-45 cable are wired in the correct sequence without opens or shorts?",
    "options": [
      "Network Cable Continuity Tester",
      "Digital thermometer",
      "Barometer",
      "Stethoscope"
    ],
    "answer": "Network Cable Continuity Tester",
    "explanation": "A network cable tester sends electrical pulses sequentially through Pins 1 through 8, lighting LEDs to confirm correct continuity and pin sequence.",
    "hint": "Cable continuity tester."
  },
  {
    "id": 19,
    "question": "What happens if a technician untwists 3 inches of copper wire before crimping the RJ-45 plug?",
    "options": [
      "The cable becomes waterproof",
      "Near-End Crosstalk (NEXT) and signal attenuation increase dramatically near the connector",
      "The bandwidth doubles automatically",
      "The cable changes into optical fiber"
    ],
    "answer": "Near-End Crosstalk (NEXT) and signal attenuation increase dramatically near the connector",
    "explanation": "Twisting cancels mutual electromagnetic interference. Excessive untwisting destroys this cancellation, introducing severe crosstalk and packet errors.",
    "hint": "Untwisting causes severe crosstalk."
  },
  {
    "id": 20,
    "question": "What is an 'RJ-45 Keystone Jack'?",
    "options": [
      "A female modular RJ-45 port mounted inside wall plates or patch panels in structured cabling systems",
      "A key used to start the computer",
      "A tool used to cut cables",
      "A brand of Wi-Fi router"
    ],
    "answer": "A female modular RJ-45 port mounted inside wall plates or patch panels in structured cabling systems",
    "explanation": "A keystone jack is a standardized snap-in female receptacle module fitted into wall faceplates or server rack patch panels.",
    "hint": "Female wall jack module."
  },
  {
    "id": 21,
    "question": "What does 'PoE' (Power over Ethernet) achieve using standard RJ-45 cabling?",
    "options": [
      "It transmits electrical DC operating power alongside data to devices like IP cameras and Wi-Fi access points",
      "It charges the user's smartphone wirelessly through the air",
      "It converts AC wall power into audio waves",
      "It makes the cable immune to fire"
    ],
    "answer": "It transmits electrical DC operating power alongside data to devices like IP cameras and Wi-Fi access points",
    "explanation": "Power over Ethernet (PoE, IEEE 802.3af/at/bt) delivers DC electric power and data over the same RJ-45 twisted pair cable, eliminating separate AC adapters.",
    "hint": "Carrying electrical power over Ethernet cables."
  },
  {
    "id": 22,
    "question": "Can an RJ-11 telephone plug physically fit into an RJ-45 modular jack?",
    "options": [
      "Yes, it can physically enter the wider jack, but doing so can bend and permanently damage the outer contacts (Pins 1 and 8) of the RJ-45 jack",
      "No, it is too wide to fit",
      "Yes, and it converts the telephone call into a 1 Gbps internet connection",
      "No, because the pins are made of wood"
    ],
    "answer": "Yes, it can physically enter the wider jack, but doing so can bend and permanently damage the outer contacts (Pins 1 and 8) of the RJ-45 jack",
    "explanation": "An RJ-11 plug is narrower than an RJ-45 jack and will physically seat inside, but its plastic edges can permanently bend and damage the outer pins of the RJ-45 receptacle.",
    "hint": "Narrower plug fits, but can damage outer pins."
  },
  {
    "id": 23,
    "question": "Which of the following twisted pair cables uses a shielded version of the RJ-45 connector with a metal exterior grounding shell?",
    "options": [
      "STP (Shielded Twisted Pair) Cat-6A",
      "UTP Cat-5",
      "Flat telephone line",
      "Vampire tap"
    ],
    "answer": "STP (Shielded Twisted Pair) Cat-6A",
    "explanation": "Shielded cables require shielded RJ-45 connectors with external metal casings that contact the equipment chassis to ground drain wires.",
    "hint": "Shielded cables need shielded connectors."
  },
  {
    "id": 24,
    "question": "What is the maximum frequency supported by Category 6 RJ-45 connectors and cabling?",
    "options": [
      "16 MHz",
      "100 MHz",
      "250 MHz",
      "1000 GHz"
    ],
    "answer": "250 MHz",
    "explanation": "Category 6 cabling and connectors are certified for frequencies up to 250 MHz (supporting 1 Gbps up to 100m, and 10 Gbps up to 55m).",
    "hint": "250 Megahertz."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Identify the connector used to connect computers with UTP cables in a local area network.' What is the answer?",
    "options": [
      "RJ-45",
      "BNC",
      "RJ-11",
      "SC Connector"
    ],
    "answer": "RJ-45",
    "explanation": "RJ-45 is the universal connector used to terminate UTP cables in local area networks.",
    "hint": "Registered Jack 45."
  }
];

export default questions;
