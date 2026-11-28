export default [
  {
    "id": 1,
    "question": "Which criteria determines server placement in standard CBSE Class 12 Computer Science 4-mark case studies?",
    "options": [
      "The block containing the maximum number of computers (80-20 rule)",
      "The block with the largest room area",
      "The block closest to the road",
      "The block built most recently"
    ],
    "correctAnswer": 0,
    "explanation": "Under the 80-20 rule, placing the server in the wing with the highest number of computers minimizes inter-building data traffic and avoids bottlenecks.",
    "hint": "Identify the block with the largest number of workstations."
  },
  {
    "id": 2,
    "question": "When connecting 4 campus blocks, if the distances from the central server block to the other three blocks are 45m, 75m, and 85m, what is the total cable length in Star topology?",
    "options": [
      "205 meters",
      "120 meters",
      "290 meters",
      "315 meters"
    ],
    "correctAnswer": 0,
    "explanation": "In Star topology, every peripheral block connects directly to the server: 45 + 75 + 85 = 205 meters.",
    "hint": "Add up the three direct radiating link distances."
  },
  {
    "id": 3,
    "question": "Under what condition is a REPEATER strictly required between two campus blocks according to CBSE evaluation rubrics?",
    "options": [
      "When the cable distance between the two connected blocks exceeds 100 meters (or 70-80 meters)",
      "When the number of computers is greater than 10",
      "When fiber optic cable is used for a 20-meter run",
      "When Wi-Fi is enabled in both blocks"
    ],
    "correctAnswer": 0,
    "explanation": "Repeaters are signal regenerators required when distance exceeds the attenuation threshold of twisted pair cables (typically 70-100 meters).",
    "hint": "Think about signal degradation over distance."
  },
  {
    "id": 4,
    "question": "How many HUBs or SWITCHes are required in a 4-block campus where each block has between 20 and 80 computers?",
    "options": [
      "At least 4 (one Hub or Switch in each block)",
      "Only 1 in the whole campus",
      "100 (one per computer)",
      "Zero, because Wi-Fi connects computers directly"
    ],
    "correctAnswer": 0,
    "explanation": "Every block contains multiple computers forming an internal subnet, so each block requires its own concentrating Hub or Switch.",
    "hint": "Every wing with multiple PCs requires a local network concentrator."
  },
  {
    "id": 5,
    "question": "Which transmission medium should be suggested for interconnecting campus blocks with maximum speed and complete immunity to electrical noise?",
    "options": [
      "Optical Fiber Cable",
      "Unshielded Twisted Pair (UTP)",
      "Coaxial Cable",
      "Telephone 2-wire cable"
    ],
    "correctAnswer": 0,
    "explanation": "Optical fiber uses light pulses inside glass cores, providing gigabit bandwidth and total immunity to electromagnetic interference.",
    "hint": "Light-transmitting cable immune to EMI."
  },
  {
    "id": 6,
    "question": "An organization wants to connect its Head Office in Delhi to a branch in London. What communication medium / technology should be recommended?",
    "options": [
      "Satellite Communication (or Undersea Fiber Optic VPN)",
      "Direct twisted pair cable",
      "Infrared beam",
      "Local Wi-Fi router"
    ],
    "correctAnswer": 0,
    "explanation": "Global intercontinental connections require geostationary satellites or transoceanic optical fiber links over a secure VPN.",
    "hint": "Intercontinental distance requires space or undersea links."
  },
  {
    "id": 7,
    "question": "A company wants to connect its factory in a valley to a warehouse on a hill 12 km away where laying physical cables is impossible. Which medium is best?",
    "options": [
      "Radio Waves (or Microwave link / Satellite)",
      "UTP Cat6 Cable",
      "Coaxial Thicknet",
      "Infrared"
    ],
    "correctAnswer": 0,
    "explanation": "Radio wave or line-of-sight microwave links bridge multi-kilometer distances over uneven, mountainous terrain where cabling is impossible.",
    "hint": "Terrestrial wireless transmission over long hilly spans."
  },
  {
    "id": 8,
    "question": "The school management plans to conduct interactive live online training for teachers across 4 zonal schools. Suggest the service and protocol.",
    "options": [
      "Video Conferencing using VoIP protocol",
      "FTP file download",
      "SMTP email exchange",
      "Telnet terminal session"
    ],
    "correctAnswer": 0,
    "explanation": "Live real-time audiovisual training is Video Conferencing powered by VoIP (Voice over IP) and SIP/RTP protocols.",
    "hint": "Real-time multimedia communication."
  },
  {
    "id": 9,
    "question": "Name two hardware devices (other than computers) required in each branch for conducting live video conferencing.",
    "options": [
      "Webcam / Video Camera and Microphone (with Speakers)",
      "Laser printer and Plotter",
      "Magnetic tape drive and Barcode reader",
      "Pen drive and External hard drive"
    ],
    "correctAnswer": 0,
    "explanation": "Video conferencing requires audiovisual capture and playback devices: HD webcams, microphones, and speakers.",
    "hint": "Devices to capture video and audio."
  },
  {
    "id": 10,
    "question": "What security device or software should be installed at the campus gateway to prevent unauthorized external internet intrusions?",
    "options": [
      "Firewall (Hardware or Software)",
      "Repeater",
      "Modem",
      "Hub"
    ],
    "correctAnswer": 0,
    "explanation": "A Firewall acts as the security boundary barrier, inspecting and filtering incoming and outgoing traffic.",
    "hint": "Perimeter security filter."
  },
  {
    "id": 11,
    "question": "In a case study: Block A (60 PCs), Block B (110 PCs), Block C (40 PCs). Distance A-B: 70m, B-C: 130m, A-C: 90m. Where should the server be placed?",
    "options": [
      "Block B (Hosts maximum computers: 110)",
      "Block A",
      "Block C",
      "Any block randomly"
    ],
    "correctAnswer": 0,
    "explanation": "Under the 80-20 rule, the server must be installed in Block B because it hosts the maximum computers (110).",
    "hint": "Block with the highest computer density."
  },
  {
    "id": 12,
    "question": "In the same scenario (Server in Block B): Distances are B-A = 70m and B-C = 130m. In a Star layout, is a repeater needed on any link?",
    "options": [
      "Yes, on the link between Block B and Block C (130m > 100m)",
      "Yes, on the link between Block B and Block A (70m)",
      "No repeaters needed anywhere",
      "Repeaters needed on all links"
    ],
    "correctAnswer": 0,
    "explanation": "Link B-C is 130m, which exceeds the 100-meter UTP threshold, necessitating an active repeater. Link B-A (70m) does not need one.",
    "hint": "Only distances exceeding 100m require repeaters."
  },
  {
    "id": 13,
    "question": "In Bus topology for the above scenario, connecting A-B (70m) and A-C (90m) gives a total cable length of:",
    "options": [
      "160 meters",
      "200 meters",
      "290 meters",
      "130 meters"
    ],
    "correctAnswer": 0,
    "explanation": "70m + 90m = 160 meters. This is shorter than connecting through B-C (130m).",
    "hint": "Sum of the two shortest connecting links."
  },
  {
    "id": 14,
    "question": "Why is a Switch preferred over a Hub when connecting workstations inside a campus block?",
    "options": [
      "A switch sends data unicast only to the destination MAC address, preventing collisions and conserving bandwidth",
      "A switch is cheaper than a hub",
      "A hub requires specialized fiber connectors",
      "A switch operates without electricity"
    ],
    "correctAnswer": 0,
    "explanation": "Switches maintain MAC address tables and forward packets only to the recipient port, whereas hubs broadcast to all ports.",
    "hint": "Unicast frame forwarding based on MAC address tables."
  },
  {
    "id": 15,
    "question": "What technology allows remote branch managers to securely connect to the company's central ERP database over public internet?",
    "options": [
      "VPN (Virtual Private Network)",
      "Public FTP",
      "Telnet without credentials",
      "Dial-up BBS"
    ],
    "correctAnswer": 0,
    "explanation": "A VPN creates an encrypted tunnel across the public internet, ensuring secure remote data transmission.",
    "hint": "Encrypted virtual private tunnel."
  },
  {
    "id": 16,
    "question": "Which CBSE board marking scheme rule applies if a student draws a valid Bus topology instead of Star topology?",
    "options": [
      "Full 1 mark is awarded if the Bus layout connects all blocks correctly and calculates the total distance accurately",
      "Zero marks are given because only Star is acceptable",
      "The examiner cancels the entire paper",
      "Marks are deducted by half automatically"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking schemes consistently award full credit for either a well-justified Star or Bus layout with correct distances.",
    "hint": "Both topologies receive full credit if correctly drawn and calculated."
  },
  {
    "id": 17,
    "question": "In a CBSE case study: 'The organization wants to host its own internal web portal accessible only to employees.' What server is needed?",
    "options": [
      "Web Server (Intranet Server)",
      "FTP server only",
      "Mail server only",
      "Database engine without web interface"
    ],
    "correctAnswer": 0,
    "explanation": "An internal Web Server (Intranet) hosts HTML/CSS/JS corporate web applications accessible exclusively to authorized internal users.",
    "hint": "Server that delivers web pages across an intranet."
  },
  {
    "id": 18,
    "question": "What cable type is universally recommended for connecting computers inside a single computer lab economically?",
    "options": [
      "Cat6 Unshielded Twisted Pair (UTP) with RJ-45 connectors",
      "Single-mode optical fiber",
      "Coaxial Thicknet",
      "Twin-lead ribbon wire"
    ],
    "correctAnswer": 0,
    "explanation": "UTP Cat6 cables with RJ-45 connectors offer the most economical, flexible, and high-performance solution for indoor local LANs.",
    "hint": "Standard blue Ethernet cable with RJ-45 clips."
  },
  {
    "id": 19,
    "question": "If a case study distance table lists: Admin to Library = 90 meters, does this link strictly require a repeater?",
    "options": [
      "No, because 90m is within the 100-meter maximum threshold for Ethernet UTP",
      "Yes, any distance over 50m requires a repeater",
      "Yes, repeaters must be placed every 25 meters",
      "Repeaters are illegal in campus networks"
    ],
    "correctAnswer": 0,
    "explanation": "Distances <= 100m operate reliably without signal regeneration. 90m does not require a repeater.",
    "hint": "100-meter physical Ethernet threshold."
  },
  {
    "id": 20,
    "question": "Which device interfaces the campus local area network to the Wide Area Network (WAN) provided by the ISP?",
    "options": [
      "Router",
      "Repeater",
      "RJ-11 jack",
      "Crimping tool"
    ],
    "correctAnswer": 0,
    "explanation": "A Router routes packets between different IP subnets and bridges the internal campus LAN to the external ISP network.",
    "hint": "Directs packets between different network subnets."
  },
  {
    "id": 21,
    "question": "When asked: 'Suggest a wireless technology to connect devices within an executive meeting room without wires up to 10 meters', what is the best answer?",
    "options": [
      "Bluetooth (or Wi-Fi)",
      "Satellite link",
      "Radio waves over 50 km",
      "Coaxial cable"
    ],
    "correctAnswer": 0,
    "explanation": "Bluetooth is designed for short-range wireless Personal Area Networks (PANs) up to 10 meters.",
    "hint": "Short-range wireless technology."
  },
  {
    "id": 22,
    "question": "In a 4-mark case study question, how many sub-parts are typically present and what is their mark weightage?",
    "options": [
      "4 sub-parts (a, b, c, d), each carrying 1 mark (Total 4 marks)",
      "1 single essay question carrying 4 marks",
      "8 sub-parts of 0.5 marks each",
      "2 sub-parts of 2 marks each"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE case study questions consist of four distinct 1-mark sub-parts: (a) Server, (b) Layout, (c) Repeater & Switch, (d) Medium/Protocol.",
    "hint": "Four sub-questions of 1 mark each."
  },
  {
    "id": 23,
    "question": "What is the primary risk of connecting all blocks using a single linear Bus cable without redundancy?",
    "options": [
      "A single cable break or severed link partitions the network and disconnects downstream blocks",
      "It causes computers to explode",
      "It uses too much electrical power",
      "It prevents installing antivirus software"
    ],
    "correctAnswer": 0,
    "explanation": "In a linear Bus topology, a single fault along the main backbone cable brings down communication for all severed segments.",
    "hint": "Single point of failure along the backbone."
  },
  {
    "id": 24,
    "question": "Why does Star topology provide higher fault tolerance compared to Bus topology in campus networks?",
    "options": [
      "Each block has a dedicated point-to-point link to the central server block; failure of one cable affects only that specific block",
      "Star topology requires no electricity",
      "Star topology cannot be damaged by physical cuts",
      "Star topology works without switches"
    ],
    "correctAnswer": 0,
    "explanation": "Because links in a Star topology are independent, if one branch cable fails, all remaining blocks continue communicating normally.",
    "hint": "Independent point-to-point links."
  },
  {
    "id": 25,
    "question": "What is the single most effective way to ensure full marks on the cable layout drawing in the answer booklet?",
    "options": [
      "Draw clearly labeled rectangular boxes for each block, draw the connecting lines with arrows, write the name of the topology, and state the distance in meters on every link",
      "Draw 3D architectural elevations of the buildings",
      "Write a 500-word paragraph without any diagram",
      "Leave the diagram blank"
    ],
    "correctAnswer": 0,
    "explanation": "Examiners award 1 mark immediately when they see labeled block boxes, correct topology connection lines, topology name, and accurate link distances.",
    "hint": "Neat schematic diagram with block names, topology type, and distances."
  }
];
