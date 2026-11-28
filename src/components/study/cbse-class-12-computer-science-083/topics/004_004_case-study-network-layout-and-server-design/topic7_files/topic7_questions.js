export default [
  {
    "id": 1,
    "question": "In a CBSE case study, an organization with headquarters in Delhi establishes a new branch office in a hilly/mountainous region (e.g. Shimla or Darjeeling). Which transmission technology should be recommended to link them?",
    "options": [
      "Radio Wave / Microwave transmission (or Satellite communication)",
      "Underground Coaxial Cable",
      "Cat6 Twisted Pair Cable run across the hills",
      "Infrared connection"
    ],
    "correctAnswer": 0,
    "explanation": "Hilly and mountainous terrains make cable trenching cost-prohibitive and vulnerable to landslides; unguided wireless media (Microwave, Radio, or Satellite) is ideal.",
    "hint": "Radio Wave, Microwave, or Satellite."
  },
  {
    "id": 2,
    "question": "If an organization wants to connect its Head Office in Kolkata with a Branch Office in London (UK), which communication medium is most suitable?",
    "options": [
      "Satellite Communication / Transoceanic Submarine Fiber Optic leased lines (WAN)",
      "Wi-Fi",
      "Bluetooth",
      "Direct copper cable run through the air"
    ],
    "correctAnswer": 0,
    "explanation": "Intercontinental connectivity across oceans requires submarine fiber optic cables or Geostationary communication satellites.",
    "hint": "Satellite or submarine fiber optic leased lines."
  },
  {
    "id": 3,
    "question": "What network classification describes the connection between two company branches located in two different cities 400 km apart?",
    "options": [
      "WAN (Wide Area Network)",
      "LAN (Local Area Network)",
      "PAN (Personal Area Network)",
      "SAN (Storage Area Network)"
    ],
    "correctAnswer": 0,
    "explanation": "Inter-city networks spanning hundreds of kilometers across a state or country are classified as Wide Area Networks (WAN).",
    "hint": "WAN (Wide Area Network)."
  },
  {
    "id": 4,
    "question": "If two branches are located in the same city separated by 15 km, what network classification links them?",
    "options": [
      "MAN (Metropolitan Area Network)",
      "PAN",
      "LAN",
      "CAN"
    ],
    "correctAnswer": 0,
    "explanation": "A network interconnecting facilities across an entire city (typically 5 to 50 km) is a Metropolitan Area Network (MAN).",
    "hint": "MAN (Metropolitan Area Network)."
  },
  {
    "id": 5,
    "question": "What technology should be recommended to securely connect an employee working from home over public internet to the internal office database server?",
    "options": [
      "VPN (Virtual Private Network) with end-to-end encryption tunnel",
      "Unencrypted Telnet",
      "FTP in plain ASCII mode",
      "Bluetooth pairing"
    ],
    "correctAnswer": 0,
    "explanation": "A VPN encrypts all traffic between the remote worker and the corporate LAN, shielding internal data from public internet interception.",
    "hint": "Virtual Private Network (VPN)."
  },
  {
    "id": 6,
    "question": "Why is Satellite Communication particularly advantageous for connecting rural, island, or remote desert locations?",
    "options": [
      "Because satellite footprints provide universal global coverage regardless of local terrain, requiring only a ground dish antenna without physical cabling.",
      "Because satellites are cheaper than a 10-meter Ethernet cable.",
      "Because satellite links have zero latency.",
      "Because satellites run without electricity."
    ],
    "correctAnswer": 0,
    "explanation": "Satellites cover vast geographic footprints, providing immediate connectivity to remote regions where laying terrestrial fiber is impossible.",
    "hint": "Universal coverage without terrestrial physical cabling."
  },
  {
    "id": 7,
    "question": "What is the primary drawback of Geostationary (GEO) Satellite communication during interactive live video conferencing?",
    "options": [
      "High round-trip propagation latency (~500 ms) due to the 36,000 km orbital altitude, causing perceptible voice delays.",
      "Satellites cannot transmit video.",
      "Satellites only operate during full moons.",
      "Satellites scramble English words."
    ],
    "correctAnswer": 0,
    "explanation": "The 72,000 km round trip to GEO orbit introduces ~500 ms latency, creating a noticeable pause in voice conversations.",
    "hint": "High propagation latency (~500 ms delay)."
  },
  {
    "id": 8,
    "question": "What is 'Microwave Line-of-Sight' transmission commonly deployed for inter-branch communication across a city?",
    "options": [
      "High-frequency radio transmission between parabolic dish antennas mounted on tall towers or building rooftops that must have an unobstructed line of sight.",
      "Using a kitchen microwave oven to heat food.",
      "Sending data through microwave oven glass.",
      "A laser pointer pointed at the moon."
    ],
    "correctAnswer": 0,
    "explanation": "Terrestrial microwave links operate between line-of-sight parabolic towers (up to 40-50 km apart), bridging metropolitan branches without cable trenching.",
    "hint": "Line-of-sight parabolic dish transmission."
  },
  {
    "id": 9,
    "question": "What is a 'Leased Line' provided by telecommunications providers (e.g. BSNL, Airtel, Jio)?",
    "options": [
      "A dedicated, symmetric, private bidirectional telecommunications circuit rented by an enterprise for secure, guaranteed bandwidth between branches.",
      "A temporary telephone line for making phone calls.",
      "A line drawn on paper.",
      "A shared broadband connection with variable speed."
    ],
    "correctAnswer": 0,
    "explanation": "Leased lines offer uncontended, dedicated, symmetric bandwidth with strict Service Level Agreements (SLAs).",
    "hint": "Dedicated, private symmetric telecommunications circuit."
  },
  {
    "id": 10,
    "question": "If an organization has a branch in an adjacent building 50 meters away across an internal private campus driveway, which medium should be chosen?",
    "options": [
      "Cat6 UTP Cable in buried conduit",
      "Satellite link",
      "Shortwave telegraph",
      "Microwave dish"
    ],
    "correctAnswer": 0,
    "explanation": "For short 50m campus spans on private land, direct buried UTP inside conduit is the most economical solution.",
    "hint": "Cat6 UTP in buried conduit."
  },
  {
    "id": 11,
    "question": "What hardware component is mandatory at each branch office gateway to route IP packets between the branch LAN and the remote WAN link?",
    "options": [
      "A Router",
      "An unmanaged Hub",
      "A Passive Splitter",
      "A Coaxial Terminator"
    ],
    "correctAnswer": 0,
    "explanation": "Routers forward packets across different subnets and WAN links using routing tables and IP addressing.",
    "hint": "Router."
  },
  {
    "id": 12,
    "question": "What service enables branch employees to make voice phone calls to colleagues at headquarters without incurring external telephone toll charges?",
    "options": [
      "VoIP (Voice over IP) / IP-PBX",
      "PSTN collect calling",
      "SMS messaging",
      "Analog telegraphy"
    ],
    "correctAnswer": 0,
    "explanation": "VoIP routes voice calls over the enterprise's private data network, completely bypassing telecom toll tariffs.",
    "hint": "VoIP (Voice over IP)."
  },
  {
    "id": 13,
    "question": "If a case study states: 'The company is planning to link its Delhi head office with a new branch in a remote rural village with no terrestrial telephone lines.' Which medium must be suggested?",
    "options": [
      "Satellite Link (VSAT)",
      "Underground UTP cable",
      "Coaxial cable",
      "Dial-up modem"
    ],
    "correctAnswer": 0,
    "explanation": "Very Small Aperture Terminal (VSAT) satellite communication provides immediate connectivity to remote rural areas lacking terrestrial lines.",
    "hint": "Satellite Link / VSAT."
  },
  {
    "id": 14,
    "question": "What is 'MPLS' (Multiprotocol Label Switching) used by enterprises connecting remote branches?",
    "options": [
      "A high-performance telecommunications network technology that directs data from one node to the next using short path labels rather than long network addresses.",
      "A music playing software.",
      "A video editing tool.",
      "An operating system for mobile phones."
    ],
    "correctAnswer": 0,
    "explanation": "MPLS is standard in corporate WANs for private, high-reliability, label-switched multi-branch connectivity with QoS guarantees.",
    "hint": "Multiprotocol Label Switching for corporate WANs."
  },
  {
    "id": 15,
    "question": "Why are physical copper cables completely impractical for connecting branches in two different cities 200 km apart?",
    "options": [
      "Laying 200 km of private physical copper cable would require immense right-of-way permissions, hundreds of repeaters, and millions in maintenance against theft and breaks.",
      "Copper is not conductive over 10 km.",
      "Computers in different cities cannot communicate.",
      "Electricians refuse to work in other cities."
    ],
    "correctAnswer": 0,
    "explanation": "Long-haul physical cabling across public lands requires licensed telecom infrastructure (leased lines/fiber) or wireless/satellite systems.",
    "hint": "Right-of-way, repeater maintenance, and cost make private cables impractical."
  },
  {
    "id": 16,
    "question": "What is an 'Intranet' in multi-branch corporate networking?",
    "options": [
      "A private, secure computer network accessible only to an organization's staff, utilizing internet technologies (HTTP, TCP/IP) for internal collaboration.",
      "The public Internet.",
      "A social network like Instagram.",
      "A physical cable."
    ],
    "correctAnswer": 0,
    "explanation": "An Intranet is a private organizational network built on TCP/IP and web standards, restricted to authorized employees.",
    "hint": "Private internal organizational network."
  },
  {
    "id": 17,
    "question": "What is an 'Extranet'?",
    "options": [
      "A controlled, private network that allows external trusted partners, vendors, and customers authorized access to specific intranet resources.",
      "An extra internet connection.",
      "A website that has no passwords.",
      "A wireless mouse."
    ],
    "correctAnswer": 0,
    "explanation": "An Extranet extends part of a company's intranet to authorized external parties (suppliers, partners) using secure tunnels.",
    "hint": "Extends private network access to trusted external partners."
  },
  {
    "id": 18,
    "question": "If an organization wants to connect three branch offices across an archipelago of islands separated by 30 km of sea, what medium should be recommended?",
    "options": [
      "Microwave / Radio Wave Line-of-Sight towers (or Undersea Fiber / Satellite)",
      "Laying UTP cable along the seabed with no protection",
      "Using Wi-Fi routers on boats",
      "Infrared"
    ],
    "correctAnswer": 0,
    "explanation": "Microwave dish towers mounted on coastal high points easily span 30 km over water without undersea cabling.",
    "hint": "Microwave line-of-sight across water."
  },
  {
    "id": 19,
    "question": "What is 'SD-WAN' (Software-Defined Wide Area Network)?",
    "options": [
      "A software architecture that dynamically routes corporate traffic across multiple WAN connection types (broadband, 5G, MPLS) based on real-time network conditions.",
      "A floppy disk containing network drivers.",
      "A web browser extension.",
      "A software that makes computers run cooler."
    ],
    "correctAnswer": 0,
    "explanation": "SD-WAN uses centralized software policies to optimize multi-branch WAN connectivity and reduce telecom costs.",
    "hint": "Software-defined management of multi-branch WAN links."
  },
  {
    "id": 20,
    "question": "In a CBSE 1-mark question: 'Suggest a communication medium to connect a head office in Delhi to a branch office in a hilly area in Himachal Pradesh.' What is the model answer?",
    "options": [
      "\"Radio Wave / Microwave transmission (or Satellite Link), because unguided wireless signals overcome the steep rough terrain without requiring expensive cable trenching.\"",
      "\"Direct twisted pair cable.\"",
      "\"USB cable.\"",
      "\"Bluetooth.\""
    ],
    "correctAnswer": 0,
    "explanation": "A complete answer names the medium (Radio wave/Microwave/Satellite) and gives the justification: overcoming rugged terrain without trenching.",
    "hint": "Radio Wave / Microwave / Satellite due to rugged terrain."
  },
  {
    "id": 21,
    "question": "What is a 'VSAT' (Very Small Aperture Terminal)?",
    "options": [
      "A two-way satellite ground station with a dish antenna (typically under 3.8 meters) used for transmitting and receiving data to/from satellites.",
      "A tiny computer screen.",
      "A miniature keyboard.",
      "A computer mouse."
    ],
    "correctAnswer": 0,
    "explanation": "VSATs provide reliable satellite broadband connectivity for banking ATMs, petrol pumps, and remote offices across India.",
    "hint": "Small satellite ground station dish antenna."
  },
  {
    "id": 22,
    "question": "Why is 'Rain Fade' a challenge for satellite and high-frequency microwave communications?",
    "options": [
      "Heavy rainfall and atmospheric moisture absorb and scatter high-frequency microwave radio signals, causing temporary signal attenuation.",
      "Rain makes satellites rust.",
      "Rain washes away radio waves.",
      "Satellites turn off when it rains."
    ],
    "correctAnswer": 0,
    "explanation": "Water droplets absorb microwave frequencies (above 10 GHz), causing signal degradation during torrential storms.",
    "hint": "Atmospheric rain absorption of microwave radio signals."
  },
  {
    "id": 23,
    "question": "If a case study states: 'The company needs to establish a video conference link between the Delhi office and the New York office.' What two components (one hardware, one protocol/service) should be recommended?",
    "options": [
      "Hardware: Webcams & Microphones (Video Conference Room kit); Protocol/Service: VoIP / SIP / High-speed Internet (e.g. Zoom/Teams).",
      "Hardware: Barcode Reader; Service: Notepad.",
      "Hardware: CD-ROM Drive; Service: Calculator.",
      "Hardware: Floppy Disk; Service: MS Paint."
    ],
    "correctAnswer": 0,
    "explanation": "Standard video conferencing recommendation includes audio/video capture hardware and VoIP/SIP video streaming software.",
    "hint": "Webcam/Mic hardware + VoIP/SIP software."
  },
  {
    "id": 24,
    "question": "In a CBSE case study, which network security appliance should be installed at both the Head Office and Branch Office to establish a secure encrypted tunnel between them?",
    "options": [
      "VPN-enabled Firewalls / Routers",
      "Unmanaged Hubs",
      "Analog Modems",
      "Passive Repeaters"
    ],
    "correctAnswer": 0,
    "explanation": "VPN gateway routers/firewalls encrypt site-to-site IPsec tunnels connecting distributed branches securely over the public Internet.",
    "hint": "VPN-enabled Firewalls or Routers."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, how should you summarize why Satellite or Microwave is selected for distant or rugged branches?",
    "options": [
      "\"Terrestrial cable installation across rugged terrain (hills/rivers) or vast geographic distances (inter-city/inter-country) is economically prohibitive and physically vulnerable to breaks; unguided wireless media provides immediate, resilient line-of-sight or global coverage.\"",
      "\"Because cables are illegal outside of buildings.\"",
      "\"Because wireless media uses no electricity.\"",
      "\"Because satellites are free to use.\""
    ],
    "correctAnswer": 0,
    "explanation": "A complete answer emphasizes the physical and economic barriers of trenching cables versus the immediate resilience of wireless/satellite coverage.",
    "hint": "Overcomes physical/economic barriers of laying cables across long distances or hills."
  }
];
