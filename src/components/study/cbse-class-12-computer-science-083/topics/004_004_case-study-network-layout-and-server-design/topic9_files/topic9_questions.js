export default [
  {
    "id": 1,
    "question": "In CBSE 2023 Case Study: TechUp Corp has 4 blocks (Admin, Sales, Accounts, HR). Block with maximum computers: Admin (120). Distances: Admin-Sales: 40m, Admin-Accounts: 60m, Admin-HR: 90m, Sales-Accounts: 110m. Where should the server be placed?",
    "options": [
      "Admin Block (80-20 rule - maximum computers minimizing local traffic)",
      "Sales Block",
      "Accounts Block",
      "HR Block"
    ],
    "correctAnswer": 0,
    "explanation": "Following the 80-20 rule of network traffic, the server must be installed in the block with the maximum number of workstations (Admin Block with 120 computers).",
    "hint": "Identify the block hosting the largest number of workstations."
  },
  {
    "id": 2,
    "question": "In the same TechUp Corp scenario, suggest the best cable layout to connect all 4 blocks. What is the topology and total cable length?",
    "options": [
      "Star topology with Admin as center; Total distance = 40m + 60m + 90m = 190m",
      "Bus topology: Admin-Sales-Accounts-HR; Total = 240m",
      "Ring topology connecting all blocks in a full circle; Total = 300m",
      "Mesh topology requiring 6 cables"
    ],
    "correctAnswer": 0,
    "explanation": "Connecting all wings directly to the central server block (Admin) forms a Star topology with minimum inter-block distances: 40m + 60m + 90m = 190 meters.",
    "hint": "Connect each block directly to the central server block."
  },
  {
    "id": 3,
    "question": "In TechUp Corp: Admin-Sales (40m), Admin-Accounts (60m), Admin-HR (90m). Is a repeater required between any of these blocks in the Star layout?",
    "options": [
      "No, a repeater is not required because all cable runs from Admin are <= 90m (under the 100m Ethernet threshold)",
      "Yes, between Admin and HR",
      "Yes, in every single link",
      "Yes, between Sales and Accounts"
    ],
    "correctAnswer": 0,
    "explanation": "Standard UTP Ethernet cables sustain reliable signal strength without degradation up to 100 meters. Since 40m, 60m, and 90m are all within 100m, no repeater is required.",
    "hint": "Repeaters are only needed when distance exceeds 70-100 meters."
  },
  {
    "id": 4,
    "question": "In TechUp Corp: Suggest the placement of Hub/Switch in the campus.",
    "options": [
      "A Hub/Switch is required in every block (Admin, Sales, Accounts, HR) to connect multiple local computers",
      "Only one switch in the Admin block",
      "Only in the block with the fewest computers",
      "Switches are not needed if Wi-Fi exists"
    ],
    "correctAnswer": 0,
    "explanation": "Every block contains multiple computers forming an internal LAN segment, so a Hub or Switch must be installed in every block to interconnect local workstations.",
    "hint": "Every wing with more than one PC needs a local concentrating device."
  },
  {
    "id": 5,
    "question": "In CBSE 2022 Case Study: 'Vidya Mandir School' has Senior Block, Junior Block, Admin, and Lab. Distance between Senior Block and Lab is 180 meters. Is a repeater required if these two blocks are directly cabled?",
    "options": [
      "Yes, a repeater is required between Senior Block and Lab because 180m exceeds the 100-meter signal attenuation limit",
      "No, modern cables transmit up to 500 meters without repeaters",
      "No, repeaters are only for wireless networks",
      "Only if there are more than 50 computers"
    ],
    "correctAnswer": 0,
    "explanation": "Since the distance is 180m, which substantially exceeds 100m, an active repeater must be installed midway to regenerate weakened signals.",
    "hint": "180m is almost double the maximum 100m UTP threshold."
  },
  {
    "id": 6,
    "question": "In Vidya Mandir School: The school wants to connect its remote hilly sports campus located 15 km away across a valley. Which wireless medium is best suited?",
    "options": [
      "Radio Waves (or Microwave link / Satellite link)",
      "Infrared",
      "Bluetooth",
      "Coaxial cable suspended over poles"
    ],
    "correctAnswer": 0,
    "explanation": "For long-distance wireless connectivity across rough or hilly terrain (15 km), radio wave links, directional microwave links, or satellite communication provide the only feasible solutions.",
    "hint": "High-frequency electromagnetic waves for multi-kilometer terrestrial transmission."
  },
  {
    "id": 7,
    "question": "In CBSE 2020 Case Study: Global Financials has 3 blocks in Delhi and 1 branch in London. Which transmission technology should connect Delhi HQ with London Branch?",
    "options": [
      "Satellite Communication (or Transoceanic Optical Fiber / Internet VPN)",
      "Twisted pair cable buried in the ocean",
      "Infrared line of sight",
      "Local Wi-Fi router"
    ],
    "correctAnswer": 0,
    "explanation": "Intercontinental communication between cities thousands of miles apart (Delhi and London) requires Satellite communication or undersea transoceanic optical fiber links over a secure VPN.",
    "hint": "Global intercontinental connections require space or undersea links."
  },
  {
    "id": 8,
    "question": "In CBSE Case Studies, when a question asks: 'Suggest the most economical cable to connect all computers within a single classroom / lab', what is the standard answer?",
    "options": [
      "Unshielded Twisted Pair (UTP) / Cat6 Ethernet Cable",
      "Single-mode Fiber Optic Cable",
      "Coaxial Thicknet",
      "Shielded Multi-strand Gold Wire"
    ],
    "correctAnswer": 0,
    "explanation": "UTP (Cat5e / Cat6) is by far the most economical, easy to terminate, and ubiquitous transmission medium for indoor local area networks.",
    "hint": "Standard blue Ethernet cable used in schools and computer labs."
  },
  {
    "id": 9,
    "question": "In CBSE Case Studies, when a question asks: 'Suggest the most reliable, fast, and noise-immune cable to connect all blocks of a university campus', what is the correct answer?",
    "options": [
      "Optical Fiber Cable (Fiber Optic)",
      "UTP Cat5",
      "Coaxial Cable",
      "Telephone 2-wire cable"
    ],
    "correctAnswer": 0,
    "explanation": "Fiber Optic Cable provides gigabit-plus bandwidth, zero electromagnetic interference, and reliable campus backbone interconnection across blocks.",
    "hint": "Light-transmitting cable immune to electrical noise."
  },
  {
    "id": 10,
    "question": "In CBSE 2019 Case Study: 'Apex Auto' has 4 blocks. Block A: 25 PCs, Block B: 30 PCs, Block C: 110 PCs, Block D: 15 PCs. Where will you place the server and why?",
    "options": [
      "Block C, because it contains the maximum number of computers (110), minimizing cross-block network traffic (80-20 rule)",
      "Block A, because it is alphabetically first",
      "Block B, because it is in the center",
      "Block D, because fewer PCs leave more processing power for the server"
    ],
    "correctAnswer": 0,
    "explanation": "Server placement is governed by the 80-20 rule: place the server in the block with the maximum computers (Block C with 110) to reduce inter-building traffic bottlenecks.",
    "hint": "Block with the highest computer density."
  },
  {
    "id": 11,
    "question": "In Apex Auto: Distance between Block C and Block D is 160 meters. If a direct cable link is laid between them, where should a repeater be placed?",
    "options": [
      "Approximately midway between Block C and Block D (around 80-100 meters from either block)",
      "Inside the server case",
      "On the roof of Block A",
      "Repeaters can only be placed at the ISP exchange"
    ],
    "correctAnswer": 0,
    "explanation": "Repeaters regenerate attenuated signals before the signal degrades beyond recovery, so placing it at roughly the midpoint (80-100m) ensures clean transmission across 160m.",
    "hint": "Midway along the 160-meter cable span."
  },
  {
    "id": 12,
    "question": "In CBSE Case Studies, if a question states: 'The company wants to host its own internal web portal accessible only to employees across all blocks.' What server software / type is needed?",
    "options": [
      "Web Server (Intranet Server)",
      "FTP server only",
      "Mail Transfer Agent only",
      "Database engine without web server"
    ],
    "correctAnswer": 0,
    "explanation": "A Web Server (such as Apache, Nginx, or IIS) configured as an internal Intranet server hosts corporate web pages and applications accessible to employees.",
    "hint": "Server that delivers web pages over HTTP/HTTPS across an Intranet."
  },
  {
    "id": 13,
    "question": "In CBSE 2021 Sample Paper: 'Zenith Tech' wishes to prevent unauthorized external internet users from accessing its confidential design server. What device/software should be suggested?",
    "options": [
      "Firewall (Hardware or Software)",
      "Modem",
      "Switch",
      "Hub"
    ],
    "correctAnswer": 0,
    "explanation": "A Firewall filters packets at the network perimeter, preventing unauthorized external access while allowing legitimate internal outbound traffic.",
    "hint": "Security perimeter barrier inspecting incoming/outgoing packets."
  },
  {
    "id": 14,
    "question": "What is the primary difference between Bus topology and Star topology when designing inter-block campus layouts in CBSE case studies?",
    "options": [
      "Bus links blocks in a linear daisy chain minimizing total cable length; Star connects each block directly to the central server block providing higher fault tolerance",
      "Bus is wireless while Star uses fiber optics",
      "Star requires no switches while Bus requires 10 switches per block",
      "Bus supports up to 1000 computers while Star supports only 4"
    ],
    "correctAnswer": 0,
    "explanation": "Bus topology connects blocks sequentially along a single backbone (cheapest cable length), whereas Star connects every block directly to the central block (robust and independent).",
    "hint": "Linear daisy chain versus central server hub-and-spoke layout."
  },
  {
    "id": 15,
    "question": "In a CBSE case study with 4 blocks: If the student suggests a Bus topology, how do they calculate the total cable length from the distance table?",
    "options": [
      "Find the Minimum Spanning Tree (MST) connecting all 4 blocks through the shortest consecutive inter-block distances without forming loops",
      "Add up all numbers in the entire distance matrix",
      "Multiply the longest distance by 4",
      "Square the shortest distance"
    ],
    "correctAnswer": 0,
    "explanation": "A Bus cable layout is mathematically a Minimum Spanning Tree connecting all nodes with the minimum sum of edge weights without forming any closed cycles.",
    "hint": "Connect all blocks sequentially using the shortest valid links."
  },
  {
    "id": 16,
    "question": "In CBSE 2018 Case Study: 'Medanta Hospital' has OPD (60 PCs), ICU (20 PCs), Admin (140 PCs), and Pharmacy (30 PCs). Total number of switches required in the campus is:",
    "options": [
      "At least 4 switches (1 in each block)",
      "Exactly 1 switch total",
      "250 switches (1 for every PC)",
      "Zero switches if Cat6 is used"
    ],
    "correctAnswer": 0,
    "explanation": "Every building housing multiple networked computers requires its own concentrating switch to form the local building LAN.",
    "hint": "One switch per block."
  },
  {
    "id": 17,
    "question": "In Medanta Hospital, Admin Block (140 PCs) is selected as the Server block. Distances: Admin-OPD: 70m, Admin-ICU: 120m, Admin-Pharmacy: 50m. In a Star topology, which link requires a repeater?",
    "options": [
      "The link between Admin and ICU (120 meters)",
      "The link between Admin and OPD (70 meters)",
      "The link between Admin and Pharmacy (50 meters)",
      "None of the links"
    ],
    "correctAnswer": 0,
    "explanation": "Only the Admin-ICU link (120m) exceeds the 100-meter threshold, so it alone requires a repeater.",
    "hint": "Only the distance greater than 100m needs a repeater."
  },
  {
    "id": 18,
    "question": "In a CBSE question: 'The management wants to allow branch managers to securely access the central ERP database from home over public internet.' Suggest the technology.",
    "options": [
      "VPN (Virtual Private Network)",
      "Public FTP",
      "Telnet without password",
      "Dial-up bulletin board"
    ],
    "correctAnswer": 0,
    "explanation": "A VPN (Virtual Private Network) creates an encrypted tunnel across the public internet, allowing remote users to securely interact with private enterprise networks.",
    "hint": "Encrypted virtual tunnel over the public internet."
  },
  {
    "id": 19,
    "question": "In CBSE case studies, why is a Switch consistently preferred over a Hub in modern campus recommendations?",
    "options": [
      "A switch sends data unicast only to the intended destination MAC address, eliminating collisions and maximizing bandwidth",
      "A switch is cheaper than a hub",
      "A hub requires specialized fiber optic connectors",
      "A switch operates without electricity"
    ],
    "correctAnswer": 0,
    "explanation": "Switches maintain MAC address tables and forward frames directly to target ports (unicast), whereas hubs broadcast all packets to all ports, degrading performance.",
    "hint": "Intelligent packet forwarding based on MAC address tables."
  },
  {
    "id": 20,
    "question": "In a CBSE Case Study: 'Alpha Bank' wants to connect its Head Office in Mumbai to an automated teller machine (ATM) installed in a remote rural village with no landline or cellular towers. Suggest the best medium.",
    "options": [
      "VSAT (Very Small Aperture Terminal) / Satellite link",
      "Underground Fiber cable",
      "Infrared beam",
      "Wi-Fi dongle"
    ],
    "correctAnswer": 0,
    "explanation": "VSAT satellite communication operates via geostationary satellites and dish antennas, providing reliable banking connectivity to remote rural locations devoid of terrestrial cables.",
    "hint": "Satellite dish terminal commonly seen on top of bank ATMs."
  },
  {
    "id": 21,
    "question": "When drawing the cable layout diagram in CBSE board answer sheets, what must a student clearly indicate to score full 1 mark?",
    "options": [
      "Draw blocks as labeled boxes with connecting lines indicating the topology (Star or Bus) and write the distance on each link",
      "Draw realistic pictures of trees and roads",
      "Write the MAC address of every computer",
      "Draw electrical wiring diagrams with resistors"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE examiners look for clear labeled block diagrams with lines connecting the blocks, identified topology name, and link distances noted.",
    "hint": "Clear schematic box diagram with block names, connecting links, and distances."
  },
  {
    "id": 22,
    "question": "In CBSE Case Studies, if distance between Block X and Block Y is given as 95 meters, does it strictly require a repeater according to standard CBSE marking schemes?",
    "options": [
      "No, because 95m is within the 100-meter Ethernet UTP transmission threshold (marking schemes accept 'No repeater needed as distance is < 100m')",
      "Yes, repeaters are mandatory whenever distance exceeds 50m",
      "Yes, repeaters are needed every 10 meters",
      "Repeaters cannot operate under 200m"
    ],
    "correctAnswer": 0,
    "explanation": "In standard CBSE evaluation, distances <= 100m do not require a repeater. (Some older schemes used 70-80m, but 100m is the universally accepted physical standard).",
    "hint": "Ethernet UTP limit is 100 meters."
  },
  {
    "id": 23,
    "question": "In CBSE Case Studies, which device connects the campus local area network to the Internet Service Provider (ISP) network?",
    "options": [
      "Router (or Modem/Gateway)",
      "Repeater",
      "RJ-45 connector",
      "Patch panel"
    ],
    "correctAnswer": 0,
    "explanation": "A Router or Gateway routes packets between different network subnets and interfaces the campus LAN with the wide area ISP network.",
    "hint": "Directs packets between different networks and interfaces with the ISP."
  },
  {
    "id": 24,
    "question": "In CBSE Case Study Questions: 'The company is worried about malware and viruses downloading from employee web browsing. Suggest a software solution.'",
    "options": [
      "Antivirus / Unified Threat Management (UTM) software with automatic updates",
      "Database management software",
      "Python IDE",
      "Spreadsheet application"
    ],
    "correctAnswer": 0,
    "explanation": "Antivirus and endpoint security software actively scan web traffic, email attachments, and local drives to neutralize malicious threats and viruses.",
    "hint": "Security software that detects and eradicates computer viruses."
  },
  {
    "id": 25,
    "question": "What is the ideal strategy to ensure 100% full marks in the CBSE 4-mark Case Study question?",
    "options": [
      "State the 80-20 rule for server placement, draw a clear labeled Star/Bus diagram, check distances against 100m for repeaters, place switches in every block, and give exact technical terms (VoIP/Fiber/Firewall)",
      "Write lengthy essays without naming specific devices",
      "Skip drawing the layout diagram",
      "Only answer sub-parts (a) and (b)"
    ],
    "correctAnswer": 0,
    "explanation": "The formula for 4/4 marks: (1) Server in max-PC block with 80-20 justification, (2) Labeled layout with topology name, (3) Repeaters (>100m) & Hub/Switch in every block, (4) Precise service/protocol recommendation.",
    "hint": "Rigorous step-by-step adherence to CBSE rubric criteria."
  }
];
