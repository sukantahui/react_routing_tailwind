// 25 Authentic CBSE Board Examination Questions for Topic 13
const questions = [
  {
    "id": 1,
    "question": "What does the acronym 'PAN' stand for in computer networking?",
    "options": [
      "Personal Area Network",
      "Public Access Node",
      "Private Application Network",
      "Permanent Address Node"
    ],
    "answer": "Personal Area Network",
    "explanation": "PAN stands for Personal Area Network, configured within an individual's personal operating space.",
    "hint": "Personal Area Network."
  },
  {
    "id": 2,
    "question": "What is the typical maximum operational distance of a Personal Area Network (PAN)?",
    "options": [
      "Up to 10 meters",
      "Up to 100 meters",
      "Up to 50 kilometers",
      "Across the globe"
    ],
    "answer": "Up to 10 meters",
    "explanation": "A PAN is centered around a person and has a typical operational range under 10 meters (33 feet).",
    "hint": "Under 10 meters."
  },
  {
    "id": 3,
    "question": "Which wireless technology is most commonly used to establish a Personal Area Network (PAN)?",
    "options": [
      "Bluetooth (IEEE 802.15.1)",
      "Geostationary Satellite",
      "Undersea Optical Fiber",
      "10BASE5 Thicknet"
    ],
    "answer": "Bluetooth (IEEE 802.15.1)",
    "explanation": "Bluetooth operates in the 2.4 GHz band across distances up to 10 meters, making it the primary PAN technology.",
    "hint": "Bluetooth."
  },
  {
    "id": 4,
    "question": "What type of network is formed when a student connects a smartphone to a wireless earphone and a smartwatch?",
    "options": [
      "PAN (Personal Area Network)",
      "LAN (Local Area Network)",
      "MAN (Metropolitan Area Network)",
      "WAN (Wide Area Network)"
    ],
    "answer": "PAN (Personal Area Network)",
    "explanation": "Interconnecting personal devices around an individual within a few meters forms a PAN.",
    "hint": "Personal Area Network."
  },
  {
    "id": 5,
    "question": "What does the acronym 'LAN' stand for?",
    "options": [
      "Local Area Network",
      "Long Access Node",
      "Logical Application Network",
      "Line Address Name"
    ],
    "answer": "Local Area Network",
    "explanation": "LAN stands for Local Area Network, covering small geographical areas like rooms, offices, or campuses.",
    "hint": "Local Area Network."
  },
  {
    "id": 6,
    "question": "What is the typical geographic span of a Local Area Network (LAN)?",
    "options": [
      "Up to 1 to 2 kilometers (a room, building, or school campus)",
      "Across entire countries",
      "Under 10 centimeters",
      "Around the world"
    ],
    "answer": "Up to 1 to 2 kilometers (a room, building, or school campus)",
    "explanation": "A LAN is confined to a localized area such as a single room, floor, building, or campus up to 1-2 km.",
    "hint": "Up to 1-2 kilometers."
  },
  {
    "id": 7,
    "question": "Which of the following is a characteristic feature of a Local Area Network (LAN)?",
    "options": [
      "High data transfer speed (100 Mbps to 10 Gbps) and very low error rate, under private organizational ownership",
      "Owned by international telecommunication carriers",
      "Highest latency in the world",
      "Relies exclusively on geostationary satellites"
    ],
    "answer": "High data transfer speed (100 Mbps to 10 Gbps) and very low error rate, under private organizational ownership",
    "explanation": "LANs operate over short controlled distances, yielding high data rates, minimal noise, and private ownership.",
    "hint": "High speed, low error rate, private ownership."
  },
  {
    "id": 8,
    "question": "What does the acronym 'MAN' stand for?",
    "options": [
      "Metropolitan Area Network",
      "Multiple Access Node",
      "Main Application Network",
      "Modern Analog Network"
    ],
    "answer": "Metropolitan Area Network",
    "explanation": "MAN stands for Metropolitan Area Network, spanning an entire city or municipal town.",
    "hint": "Metropolitan Area Network."
  },
  {
    "id": 9,
    "question": "What is the typical geographic reach of a Metropolitan Area Network (MAN)?",
    "options": [
      "Up to 50 kilometers (citywide)",
      "Under 5 meters",
      "Across continents",
      "100,000 kilometers"
    ],
    "answer": "Up to 50 kilometers (citywide)",
    "explanation": "A MAN is engineered to cover a metropolitan city or town, spanning up to 50 kilometers.",
    "hint": "Up to 50 kilometers."
  },
  {
    "id": 10,
    "question": "Which of the following is a classic real-world example of a Metropolitan Area Network (MAN)?",
    "options": [
      "A cable television (CATV) broadband network distributed across a city",
      "A Bluetooth mouse connected to a laptop",
      "The global Internet",
      "Two computers connected with a 1-meter patch cord"
    ],
    "answer": "A cable television (CATV) broadband network distributed across a city",
    "explanation": "Cable TV distribution systems span entire cities, representing classic MAN deployments.",
    "hint": "Citywide cable television network."
  },
  {
    "id": 11,
    "question": "What does the acronym 'WAN' stand for?",
    "options": [
      "Wide Area Network",
      "Wireless Access Node",
      "Web Application Network",
      "World Audio Name"
    ],
    "answer": "Wide Area Network",
    "explanation": "WAN stands for Wide Area Network, covering large geographic regions like countries and continents.",
    "hint": "Wide Area Network."
  },
  {
    "id": 12,
    "question": "Which of the following is the most prominent and largest real-world example of a Wide Area Network (WAN)?",
    "options": [
      "The global INTERNET",
      "A school computer lab",
      "A home Wi-Fi network",
      "A Bluetooth connection"
    ],
    "answer": "The global INTERNET",
    "explanation": "The Internet is the ultimate worldwide Wide Area Network, interconnecting millions of smaller networks globally.",
    "hint": "The global Internet."
  },
  {
    "id": 13,
    "question": "Why does a WAN have a higher error rate and higher latency than a LAN?",
    "options": [
      "Because WANs span vast distances across different countries using diverse transmission media subjected to environmental noise and long speed-of-light travel times",
      "Because WANs are not allowed to use computers",
      "Because WAN cables are painted red",
      "Because WANs only work during the night"
    ],
    "answer": "Because WANs span vast distances across different countries using diverse transmission media subjected to environmental noise and long speed-of-light travel times",
    "explanation": "Vast distances across public carriers, repeaters, subsea cables, and satellites increase propagation delay and noise.",
    "hint": "Vast distances increase latency and exposure to noise."
  },
  {
    "id": 14,
    "question": "In a CBSE 5-mark Case Study: The head office in Mumbai is connected to a branch office in New Delhi (distance ~1,400 km). What type of network is formed?",
    "options": [
      "WAN (Wide Area Network)",
      "LAN (Local Area Network)",
      "MAN (Metropolitan Area Network)",
      "PAN (Personal Area Network)"
    ],
    "answer": "WAN (Wide Area Network)",
    "explanation": "Connecting offices across states separated by 1,400 km constitutes a Wide Area Network (WAN).",
    "hint": "1,400 km across states = WAN."
  },
  {
    "id": 15,
    "question": "In a CBSE 5-mark Case Study: All computers in a school's computer science lab located within a 50-meter radius are interconnected. What type of network is formed?",
    "options": [
      "LAN (Local Area Network)",
      "WAN",
      "MAN",
      "Internetwork"
    ],
    "answer": "LAN (Local Area Network)",
    "explanation": "Computers connected within a single room or building form a Local Area Network (LAN).",
    "hint": "Single room or building = LAN."
  },
  {
    "id": 16,
    "question": "In a CBSE Case Study: Multiple branches of a retail chain located throughout the city of Bengaluru are interconnected. What type of network is formed?",
    "options": [
      "MAN (Metropolitan Area Network)",
      "LAN",
      "PAN",
      "WAN"
    ],
    "answer": "MAN (Metropolitan Area Network)",
    "explanation": "A network connecting multiple sites across an entire city (metropolis) is classified as a MAN.",
    "hint": "Across an entire city = MAN."
  },
  {
    "id": 17,
    "question": "Which network classification generally has the LOWEST data transmission speed due to low-power transceiver constraints?",
    "options": [
      "PAN (Personal Area Network)",
      "LAN",
      "MAN",
      "Campus Fiber LAN"
    ],
    "answer": "PAN (Personal Area Network)",
    "explanation": "PAN technologies like Bluetooth operate with low battery power and narrow bandwidth, delivering lower data rates (1-3 Mbps).",
    "hint": "Low-power personal networks like Bluetooth."
  },
  {
    "id": 18,
    "question": "Who typically owns the physical cabling infrastructure of a Local Area Network (LAN)?",
    "options": [
      "The private organization or institution itself (e.g. school, university, company)",
      "The United Nations",
      "International telecom satellite companies",
      "The local municipal city council"
    ],
    "answer": "The private organization or institution itself (e.g. school, university, company)",
    "explanation": "LAN infrastructure (switches, cables, patch panels) is owned and administered directly by the private organization.",
    "hint": "Privately owned by the organization."
  },
  {
    "id": 19,
    "question": "Who owns the communication links spanning a Wide Area Network (WAN)?",
    "options": [
      "Multiple public telecom operators, internet service providers (ISPs), and subsea consortiums",
      "A single school principal",
      "The user of the computer",
      "Nobody owns them"
    ],
    "answer": "Multiple public telecom operators, internet service providers (ISPs), and subsea consortiums",
    "explanation": "WAN connections traverse public and leased infrastructure owned by telecommunication carriers and ISPs.",
    "hint": "Multiple telecom carriers and ISPs."
  },
  {
    "id": 20,
    "question": "What is a 'WLAN' (Wireless Local Area Network)?",
    "options": [
      "A Local Area Network where devices connect wirelessly using Wi-Fi (IEEE 802.11) instead of cables",
      "A network that only works underwater",
      "A network with no access points",
      "A wide area cable"
    ],
    "answer": "A Local Area Network where devices connect wirelessly using Wi-Fi (IEEE 802.11) instead of cables",
    "explanation": "A WLAN is simply a local area network implemented using wireless Wi-Fi technology rather than Ethernet cables.",
    "hint": "Wireless Local Area Network."
  },
  {
    "id": 21,
    "question": "What is a 'WPAN' (Wireless Personal Area Network)?",
    "options": [
      "A personal area network using short-range wireless technologies like Bluetooth, Zigbee, or Ultra-Wideband (UWB)",
      "A wired power network",
      "A satellite link",
      "A telephone wire"
    ],
    "answer": "A personal area network using short-range wireless technologies like Bluetooth, Zigbee, or Ultra-Wideband (UWB)",
    "explanation": "WPAN refers to wireless personal area networks based on standards like IEEE 802.15 (Bluetooth/Zigbee).",
    "hint": "Wireless Personal Area Network."
  },
  {
    "id": 22,
    "question": "Which of the following correctly orders networks by increasing geographical size?",
    "options": [
      "PAN < LAN < MAN < WAN",
      "LAN < PAN < MAN < WAN",
      "WAN < MAN < LAN < PAN",
      "MAN < LAN < PAN < WAN"
    ],
    "answer": "PAN < LAN < MAN < WAN",
    "explanation": "From smallest to largest: PAN (< 10m) < LAN (1-2 km) < MAN (50 km) < WAN (global).",
    "hint": "PAN is smallest; WAN is largest."
  },
  {
    "id": 23,
    "question": "What is a 'CAN' (Campus Area Network)?",
    "options": [
      "A network connecting multiple LANs across a localized educational or corporate campus (e.g. across several adjacent buildings)",
      "A network made of tin cans",
      "A citywide cable network",
      "A satellite link"
    ],
    "answer": "A network connecting multiple LANs across a localized educational or corporate campus (e.g. across several adjacent buildings)",
    "explanation": "A CAN connects multiple building LANs within a contiguous university or industrial campus, larger than a single LAN but smaller than a MAN.",
    "hint": "Campus Area Network."
  },
  {
    "id": 24,
    "question": "What transmission medium is commonly used to interconnect cities across a Wide Area Network (WAN)?",
    "options": [
      "Submarine fiber optic cables and geostationary satellite links",
      "Cat-5e UTP patch cables",
      "Infrared remote controls",
      "BNC coaxial cables"
    ],
    "answer": "Submarine fiber optic cables and geostationary satellite links",
    "explanation": "Intercontinental and inter-city WAN backbones utilize subsea fiber cables and satellite communications.",
    "hint": "Submarine fiber and satellite links."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Identify the type of network that connects computers across a metropolitan city.' What is the answer?",
    "options": [
      "MAN",
      "LAN",
      "PAN",
      "WAN"
    ],
    "answer": "MAN",
    "explanation": "A Metropolitan Area Network (MAN) spans an entire city.",
    "hint": "Metropolitan Area Network = MAN."
  }
];

export default questions;
