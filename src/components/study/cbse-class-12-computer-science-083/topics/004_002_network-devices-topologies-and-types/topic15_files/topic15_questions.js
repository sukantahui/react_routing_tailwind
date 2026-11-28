export default [
  {
    "id": 1,
    "question": "A network administrator observes excessive collisions and sluggish performance in an office LAN with 40 hosts connected to cascaded hubs. What is the most effective hardware upgrade?",
    "options": [
      "Replace the hubs with an unmanaged or managed Layer-2 Switch.",
      "Install an analog modem between each computer.",
      "Replace all UTP cables with coaxial 10Base2 cables.",
      "Add two additional passive repeaters in series."
    ],
    "correctAnswer": 0,
    "explanation": "Replacing hubs with a switch micro-segments the network so that each port becomes an isolated collision domain, completely eliminating collision contention.",
    "hint": "Switches eliminate shared collision domains."
  },
  {
    "id": 2,
    "question": "Which hardware component inside a PC provides physical connection to a network cable and possesses a globally unique 48-bit MAC address?",
    "options": [
      "RAM Module",
      "NIC (Network Interface Card)",
      "CMOS Battery",
      "GPU"
    ],
    "correctAnswer": 1,
    "explanation": "The NIC (Ethernet Card) physically interfaces the workstation with the transmission medium and contains a factory-assigned MAC address.",
    "hint": "Also known as an Ethernet Network Adapter."
  },
  {
    "id": 3,
    "question": "What is the primary role of a Repeater when interconnecting two sections of an Ethernet LAN?",
    "options": [
      "To translate AppleTalk frames into TCP/IP frames.",
      "To reshape, clean, and amplify digital electrical pulses to prevent attenuation over extended distances.",
      "To act as a firewall blocking malicious UDP packets.",
      "To convert analog telephony frequencies into digital bits."
    ],
    "correctAnswer": 1,
    "explanation": "A Repeater regenerates weak, attenuated signals at the Physical Layer (Layer 1), ensuring the signals can travel another segment without corruption.",
    "hint": "Overcomes signal attenuation."
  },
  {
    "id": 4,
    "question": "In a CBSE 4-mark networking case study, two campus buildings are separated by 140 meters. Which device should be placed along the UTP cable between them?",
    "options": [
      "Repeater",
      "Modem",
      "Access Point",
      "Transducer"
    ],
    "correctAnswer": 0,
    "explanation": "Standard Cat5e/Cat6 UTP cabling has a maximum certified run of 100 meters. For runs exceeding 100 meters, a Repeater (or switch acting as a repeater) must be placed to boost the signal.",
    "hint": "UTP threshold rule is 100 meters."
  },
  {
    "id": 5,
    "question": "A company wishes to connect its Head Office in Kolkata with a Regional Office in London. What class of network is this?",
    "options": [
      "LAN (Local Area Network)",
      "PAN (Personal Area Network)",
      "WAN (Wide Area Network)",
      "MAN (Metropolitan Area Network)"
    ],
    "correctAnswer": 2,
    "explanation": "Connecting offices across continents and international borders requires a Wide Area Network (WAN) utilizing undersea fiber, telecom carriers, and satellite links.",
    "hint": "Intercontinental connectivity."
  },
  {
    "id": 6,
    "question": "Which of the following devices inspects the destination IP address of incoming packets to determine the next hop across disparate subnets?",
    "options": [
      "Passive Hub",
      "Router",
      "Unmanaged Switch",
      "RJ-45 Connector"
    ],
    "correctAnswer": 1,
    "explanation": "A Router operates at Layer 3 (Network Layer) and uses routing tables to forward packets across different subnets based on destination IP addresses.",
    "hint": "Layer 3 packet forwarding device."
  },
  {
    "id": 7,
    "question": "What is the key disadvantage of a pure Mesh topology with 10 workstations?",
    "options": [
      "Failure of one node brings down the entire network.",
      "It requires 45 separate cable runs and 9 NIC ports per computer, causing immense cost and complexity.",
      "It produces frequent packet collisions due to shared bus architecture.",
      "It cannot transmit graphic files."
    ],
    "correctAnswer": 1,
    "explanation": "In a full mesh of 10 nodes, total links = 10 * 9 / 2 = 45 links, and each host needs 9 dedicated interfaces, leading to prohibitive cabling cost and hardware complexity.",
    "hint": "Use formula N * (N - 1) / 2."
  },
  {
    "id": 8,
    "question": "Which topology connects every node to a central device such as a switch via dedicated point-to-point drop cables?",
    "options": [
      "Bus Topology",
      "Star Topology",
      "Ring Topology",
      "Line Topology"
    ],
    "correctAnswer": 1,
    "explanation": "Star topology connects all network nodes to a single central hub or switch in a star arrangement.",
    "hint": "Central hub or switch design."
  },
  {
    "id": 9,
    "question": "An organization is setting up a Wi-Fi network for laptops in its auditorium. Which device is required to broadcast radio signals and connect wireless laptops to the wired switch?",
    "options": [
      "Wi-Fi Access Point (AP)",
      "Optical Splitter",
      "Passive Hub",
      "Coaxial Terminator"
    ],
    "correctAnswer": 0,
    "explanation": "A Wi-Fi Access Point connects to the wired LAN switch and provides wireless radio transceiver access for IEEE 802.11 wireless devices.",
    "hint": "Bridges wireless clients to the wired infrastructure."
  },
  {
    "id": 10,
    "question": "What type of connector is universally used to terminate 4-pair unshielded twisted pair (UTP) network cables?",
    "options": [
      "BNC Connector",
      "RJ-11 Connector",
      "RJ-45 Connector",
      "VGA Connector"
    ],
    "correctAnswer": 2,
    "explanation": "RJ-45 (Registered Jack 45) is the 8P8C standard connector for Ethernet over twisted pair cables.",
    "hint": "8-pin modular connector for Ethernet."
  },
  {
    "id": 11,
    "question": "In Tree topology, what happens if the root switch or central backbone link fails?",
    "options": [
      "Communication between different branches fails, though nodes within a single branch switch may still communicate locally.",
      "Every individual computer instantly crashes and reboots.",
      "All files stored on client hard drives are permanently deleted.",
      "The network automatically reconfigures into a Ring topology."
    ],
    "correctAnswer": 0,
    "explanation": "If the root or backbone of a tree topology breaks, cross-branch intercommunication is severed, while local intra-branch communication continues isolated.",
    "hint": "Hierarchical backbone failure isolates branch sub-trees."
  },
  {
    "id": 12,
    "question": "Which network device is designed to translate communication protocols between two completely incompatible network architectures (e.g., SNA and TCP/IP)?",
    "options": [
      "Repeater",
      "Gateway",
      "Hub",
      "RJ-45 Jack"
    ],
    "correctAnswer": 1,
    "explanation": "A Gateway performs full protocol translation across all layers of the OSI model between heterogeneous networks.",
    "hint": "Protocol converter for disparate network stacks."
  },
  {
    "id": 13,
    "question": "A doctor shares medical scan reports from a smartphone to a tablet over a 3-meter Bluetooth link in a clinic. What network classification does this represent?",
    "options": [
      "PAN",
      "LAN",
      "MAN",
      "WAN"
    ],
    "correctAnswer": 0,
    "explanation": "A Personal Area Network (PAN) covers a short range up to 10 meters, typically utilizing Bluetooth, ZigBee, or infrared.",
    "hint": "Short range around a single user."
  },
  {
    "id": 14,
    "question": "What hardware address is embedded on the ROM of a network card during manufacturing?",
    "options": [
      "IPv4 Address",
      "IPv6 Address",
      "MAC Address",
      "Port Number"
    ],
    "correctAnswer": 2,
    "explanation": "The MAC (Media Access Control) address is permanently burned into the NIC hardware by the manufacturer.",
    "hint": "Physical layer-2 address."
  },
  {
    "id": 15,
    "question": "Why does a Switch maintain a CAM (Content Addressable Memory) or MAC address table?",
    "options": [
      "To translate domain names like 'cbse.nic.in' into IP addresses.",
      "To map destination MAC addresses to specific physical ports for selective frame forwarding.",
      "To store temporary web browser cache files.",
      "To assign dynamic IP addresses to connected clients."
    ],
    "correctAnswer": 1,
    "explanation": "The CAM table maps MAC addresses learned from incoming frames to their respective switch ports, allowing the switch to forward frames directly to destination ports.",
    "hint": "Learns which MAC is on which port."
  },
  {
    "id": 16,
    "question": "In Bus topology, what critical component must be installed at both physical cable ends to eliminate bouncing electrical signals?",
    "options": [
      "Amplifier",
      "Terminator",
      "Repeater",
      "Inverter"
    ],
    "correctAnswer": 1,
    "explanation": "A Terminator absorbs electrical energy when signals reach the end of the bus cable, preventing reflections that cause collisions.",
    "hint": "Absorbs signal reflections at cable ends."
  },
  {
    "id": 17,
    "question": "A cable television network distributing video and broadband signals across an entire metropolitan city is classified as:",
    "options": [
      "PAN",
      "LAN",
      "MAN",
      "WAN"
    ],
    "correctAnswer": 2,
    "explanation": "A Metropolitan Area Network (MAN) spans an entire city or large municipal zone, typically up to 50 km.",
    "hint": "Metropolitan scale network."
  },
  {
    "id": 18,
    "question": "Which of the following statements accurately contrasts an Active Hub and a Switch?",
    "options": [
      "An active hub reads MAC addresses; a switch broadcasts all bits.",
      "An active hub broadcasts signals to all ports sharing one collision domain; a switch filters frames and provides dedicated bandwidth per port.",
      "An active hub routes packets across the Internet; a switch only works with dial-up lines.",
      "There is no difference between an active hub and a switch."
    ],
    "correctAnswer": 1,
    "explanation": "An active hub merely regenerates and broadcasts signals across all ports (single collision domain), whereas a switch inspects MAC addresses and switches frames point-to-point.",
    "hint": "Broadcast vs intelligent micro-segmentation."
  },
  {
    "id": 19,
    "question": "How many bits constitute a standard MAC address?",
    "options": [
      "16 bits",
      "32 bits",
      "48 bits",
      "64 bits"
    ],
    "correctAnswer": 2,
    "explanation": "A standard MAC-48 address is 48 bits (6 bytes) long, represented as 12 hexadecimal characters.",
    "hint": "6 octets = 48 bits."
  },
  {
    "id": 20,
    "question": "In Token Ring topology, how does a workstation acquire the right to transmit data frames?",
    "options": [
      "By broadcasting an alert signal and waiting 10 milliseconds.",
      "By capturing the special circulating token frame when it passes by.",
      "By requesting permission from the central ISP router.",
      "By overwhelming the carrier wave with high electrical voltage."
    ],
    "correctAnswer": 1,
    "explanation": "In Token Ring, a host must wait for and seize the circulating token frame before it is permitted to place data onto the ring.",
    "hint": "Deterministic token-based transmission."
  },
  {
    "id": 21,
    "question": "What is the primary role of a Modem when accessing the Internet via an analog telephone connection?",
    "options": [
      "It acts as a primary firewall blocking malware.",
      "It modulates digital computer signals into analog audio frequencies for transmission, and demodulates received analog signals back into digital data.",
      "It resolves domain names into IP addresses.",
      "It compresses video files for high-definition streaming."
    ],
    "correctAnswer": 1,
    "explanation": "Modems modulate digital data to analog audio tones for telephone transmission, and demodulate analog audio back to digital data for computers.",
    "hint": "Modulator-Demodulator."
  },
  {
    "id": 22,
    "question": "What topology is formed when multiple star networks are interconnected across a central linear backbone?",
    "options": [
      "Tree Topology",
      "Mesh Topology",
      "Ring Topology",
      "Peer Topology"
    ],
    "correctAnswer": 0,
    "explanation": "Tree topology is an extended hierarchical topology formed by linking multiple star clusters along a central linear backbone bus.",
    "hint": "Combination of Star and Bus."
  },
  {
    "id": 23,
    "question": "Which of the following devices operates strictly at the Physical Layer (Layer 1) of the OSI model?",
    "options": [
      "Repeater",
      "Switch",
      "Router",
      "Gateway"
    ],
    "correctAnswer": 0,
    "explanation": "Repeaters and hubs operate strictly at the Physical Layer (Layer 1), regenerating bits without inspecting MAC or IP addresses.",
    "hint": "Bit-level physical signal regeneration."
  },
  {
    "id": 24,
    "question": "A high-school campus has 4 buildings: Admin (20 computers), Accounts (15 computers), Science (60 computers), and Library (10 computers). In which block should the main server be placed?",
    "options": [
      "Admin Block",
      "Accounts Block",
      "Science Block",
      "Library Block"
    ],
    "correctAnswer": 2,
    "explanation": "By the CBSE 80-20 rule, the server should always be installed in the building with the maximum number of computers (Science Block with 60 computers) to minimize inter-building network traffic.",
    "hint": "80-20 rule: place server where computer density is greatest."
  },
  {
    "id": 25,
    "question": "Which of the following correctly pairs the network device with its primary operational layer?",
    "options": [
      "Hub -> Layer 3; Router -> Layer 1; Switch -> Layer 2",
      "Repeater -> Layer 1; Switch -> Layer 2; Router -> Layer 3",
      "Router -> Layer 1; Gateway -> Layer 2; Repeater -> Layer 3",
      "NIC -> Layer 4; Modem -> Layer 3; Hub -> Layer 2"
    ],
    "correctAnswer": 1,
    "explanation": "Repeater operates at Layer 1 (Physical), Switch operates at Layer 2 (Data Link), and Router operates at Layer 3 (Network).",
    "hint": "Physical (L1), Data Link (L2), Network (L3)."
  }
];
