export default [
  {
    "id": 1,
    "question": "Which of the following devices is essential for interconnecting two LANs running completely different protocol suites?",
    "options": [
      "Switch",
      "Bridge",
      "Gateway",
      "Repeater"
    ],
    "correctAnswer": 2,
    "explanation": "A Gateway operates at all layers of the OSI model and performs protocol conversion and packet restructuring between disparate network architectures.",
    "hint": "Think of an enterprise connecting an AppleTalk or proprietary mainframe network to TCP/IP."
  },
  {
    "id": 2,
    "question": "Why does an Ethernet Hub degrade network throughput exponentially as nodes increase compared to an Ethernet Switch?",
    "options": [
      "A Hub creates an independent collision domain for each connected port.",
      "A Hub operates in full-duplex mode by default.",
      "A Hub broadcasts all received electrical signals to every port, sharing a single collision domain.",
      "A Hub maintains a dynamic MAC table that introduces lookup latency."
    ],
    "correctAnswer": 2,
    "explanation": "A Hub is a Layer-1 repeater that broadcasts every bit to all other ports, meaning all hosts share a single collision domain and bandwidth.",
    "hint": "Recall CSMA/CD and shared media limitations."
  },
  {
    "id": 3,
    "question": "What is the primary function of a Repeater in a structured cabling infrastructure?",
    "options": [
      "To inspect IP destination addresses and route packets across subnets.",
      "To regenerate attenuated digital signals before retransmitting them to overcome cable distance limits.",
      "To convert analog frequency signals into digital bitstreams.",
      "To assign dynamic host configuration IP addresses to client nodes."
    ],
    "correctAnswer": 1,
    "explanation": "A Repeater operates at Layer 1 to regenerate and reshape attenuated electrical or optical signals, allowing the physical medium to extend beyond its rated maximum length.",
    "hint": "Amplifiers boost noise; repeaters clean and regenerate fresh digital square waves."
  },
  {
    "id": 4,
    "question": "Which topology requires a terminating resistor at both open ends of the transmission medium to prevent signal reflection?",
    "options": [
      "Star Topology",
      "Bus Topology",
      "Ring Topology",
      "Tree Topology"
    ],
    "correctAnswer": 1,
    "explanation": "Bus topology uses a single backbone cable where both ends must be terminated with matched resistors (typically 50 ohms in coaxial) to absorb traveling signals.",
    "hint": "Without terminators, signals bounce back, causing packet corruption."
  },
  {
    "id": 5,
    "question": "In a Star topology with 16 workstations connected to a central switch, what occurs if one workstation's cable is severed?",
    "options": [
      "The entire network halts due to an open circuit.",
      "Only the severed workstation loses connectivity; the remaining 15 workstations communicate normally.",
      "The central switch shuts down into safe mode.",
      "All workstations transmit duplicate broadcast packets indefinitely."
    ],
    "correctAnswer": 1,
    "explanation": "Star topology provides high fault isolation. Since every node has a dedicated point-to-point drop cable to the central switch, a failure in one cable isolates only that single host.",
    "hint": "Point-to-point host-to-switch link architecture."
  },
  {
    "id": 6,
    "question": "How many physical transmission links are required to connect N nodes in a fully connected (dedicated) Mesh topology?",
    "options": [
      "N",
      "N - 1",
      "N * (N - 1) / 2",
      "N * N"
    ],
    "correctAnswer": 2,
    "explanation": "Every node must connect to every other (N-1) node. Since each duplex link connects two nodes, the total links required is N * (N - 1) / 2.",
    "hint": "Combinations of N objects taken 2 at a time: C(N, 2)."
  },
  {
    "id": 7,
    "question": "Which field in an Ethernet frame does a Layer-2 Switch examine to forward frames to the correct destination port?",
    "options": [
      "Destination IP address",
      "Destination MAC address",
      "Source IP port number",
      "TTL (Time to Live)"
    ],
    "correctAnswer": 1,
    "explanation": "Switches are Layer-2 devices that inspect the 48-bit Destination MAC address and query their CAM (Content Addressable Memory) table to switch frames selectively.",
    "hint": "MAC addresses reside at the Data Link Layer."
  },
  {
    "id": 8,
    "question": "What is the standard pin capacity and architectural designation of an RJ45 modular connector?",
    "options": [
      "4-position, 4-contact (4P4C)",
      "6-position, 4-contact (6P4C)",
      "8-position, 8-contact (8P8C)",
      "10-position, 10-contact (10P10C)"
    ],
    "correctAnswer": 2,
    "explanation": "RJ45 (Registered Jack 45) is an 8P8C (8 Position, 8 Contact) connector standard used in Category 5e, 6, and 6a Ethernet cabling.",
    "hint": "Twisted pair cable has 4 pairs = 8 conductors."
  },
  {
    "id": 9,
    "question": "An organization needs to interconnect five university campus branches located across a single metropolitan city (within 25 km). What network classification is this?",
    "options": [
      "PAN (Personal Area Network)",
      "LAN (Local Area Network)",
      "MAN (Metropolitan Area Network)",
      "WAN (Wide Area Network)"
    ],
    "correctAnswer": 2,
    "explanation": "A MAN (Metropolitan Area Network) spans a town or city, typically between 5 km and 50 km, interconnecting multiple LANs under high-speed fiber or wireless links.",
    "hint": "Metropolitan scale spans an entire city."
  },
  {
    "id": 10,
    "question": "A Wi-Fi Access Point (AP) serves as a bridge between which two types of network segments?",
    "options": [
      "Between a Bluetooth PAN and a USB peripheral",
      "Between an IEEE 802.11 wireless radio segment and an IEEE 802.3 wired Ethernet backbone",
      "Between an analog telephone line and a digital PBX switch",
      "Between two completely isolated WAN autonomous systems"
    ],
    "correctAnswer": 1,
    "explanation": "An Access Point bridges 802.11 radio frequency frames to 802.3 Ethernet frames, allowing wireless client devices to join the wired corporate network.",
    "hint": "Wireless stations communicate with wired switches via APs."
  },
  {
    "id": 11,
    "question": "What is the length of a standard Ethernet MAC (Media Access Control) address, and how is it usually expressed?",
    "options": [
      "32 bits, expressed as 4 decimal octets separated by dots",
      "48 bits, expressed as 12 hexadecimal digits grouped in pairs separated by colons or hyphens",
      "64 bits, expressed as 8 byte octets in octal notation",
      "128 bits, expressed as 8 colon-separated hexadecimal blocks"
    ],
    "correctAnswer": 1,
    "explanation": "A MAC address is a 48-bit (6-byte) physical hardware address, typically written as six hexadecimal octets like `00:1A:2B:3C:4D:5E`.",
    "hint": "The first 24 bits are OUI (Organizationally Unique Identifier); the last 24 bits are NIC serial."
  },
  {
    "id": 12,
    "question": "Which device is mandatory at an autonomous network boundary to make intelligent routing decisions across dissimilar IP subnets using dynamic routing tables?",
    "options": [
      "Hub",
      "Unmanaged Switch",
      "Router",
      "Passive Repeater"
    ],
    "correctAnswer": 2,
    "explanation": "A Router operates at Layer 3 (Network Layer) and inspects IP addresses to direct packets across different subnets, calculating optimal paths using routing algorithms.",
    "hint": "Layer 3 device that routes packets."
  },
  {
    "id": 13,
    "question": "In Tree topology, what is the hierarchical relationship between the central root hub/switch and secondary branch hubs?",
    "options": [
      "All secondary hubs operate completely independent with no uplink to the root.",
      "The secondary hubs branch out from a central backbone root hub, forming a parent-child hierarchical tree.",
      "Each node must be connected in a closed continuous token circle.",
      "Every workstation has direct redundant cabling to all other nodes."
    ],
    "correctAnswer": 1,
    "explanation": "Tree topology is a hierarchical combination of star topologies connected along a central backbone bus or root switch, enabling easy branch expansion.",
    "hint": "Hierarchical parent-child star clusters."
  },
  {
    "id": 14,
    "question": "What is the primary vulnerability of a pure Bus topology?",
    "options": [
      "If any single workstation is powered off, the network crashes.",
      "A break in the central backbone cable halts all communication across the entire bus.",
      "It requires excessive cabling compared to Star or Mesh topologies.",
      "It cannot transmit digital signals without a gateway."
    ],
    "correctAnswer": 1,
    "explanation": "In a Bus topology, the backbone cable is a single point of failure; if it snaps, the open circuit creates signal reflection and disrupts all transmissions.",
    "hint": "A break breaks the terminator circuit."
  },
  {
    "id": 15,
    "question": "Which of the following devices is capable of splitting a single physical collision domain into multiple isolated collision domains?",
    "options": [
      "Passive Hub",
      "Active Hub",
      "Network Switch",
      "Signal Repeater"
    ],
    "correctAnswer": 2,
    "explanation": "Each port on a switch represents an independent collision domain, preventing packet collisions between hosts transmitting simultaneously.",
    "hint": "Switches provide micro-segmentation."
  },
  {
    "id": 16,
    "question": "What role does a Modem play when connecting a home computer to an ISP over an analog telephone or cable line?",
    "options": [
      "It regenerates optical laser signals across undersea cables.",
      "It modulates outgoing digital data into analog carrier waves, and demodulates incoming analog waves back into digital data.",
      "It converts 32-bit IPv4 addresses into 128-bit IPv6 addresses.",
      "It encrypts passwords using RSA public key cryptography."
    ],
    "correctAnswer": 1,
    "explanation": "Modem stands for MOdulator-DEModulator: it translates digital computer signals to analog signals suitable for telephone/cable lines, and vice-versa.",
    "hint": "Modulation + Demodulation."
  },
  {
    "id": 17,
    "question": "Which network category spans a few meters around a single individual, typically utilizing Bluetooth, ZigBee, or USB connections?",
    "options": [
      "LAN",
      "MAN",
      "PAN",
      "WAN"
    ],
    "correctAnswer": 2,
    "explanation": "A Personal Area Network (PAN) spans up to 10 meters around an individual user, connecting smartphones, laptops, smartwatches, and headphones.",
    "hint": "Personal scale network."
  },
  {
    "id": 18,
    "question": "What happens when a switch receives a broadcast frame with destination MAC address `FF:FF:FF:FF:FF:FF`?",
    "options": [
      "The switch drops the frame immediately.",
      "The switch forwards the frame to every connected active port except the port on which it arrived.",
      "The switch queries its DNS server to resolve the hostname.",
      "The switch switches itself into safe mode."
    ],
    "correctAnswer": 1,
    "explanation": "A switch forwards broadcast frames out of all active ports except the ingress port because all switch ports belong to a single broadcast domain by default.",
    "hint": "Switches flood broadcasts across the broadcast domain."
  },
  {
    "id": 19,
    "question": "Why does Ring topology utilize token passing rather than CSMA/CD for media access control?",
    "options": [
      "To prevent data collisions by granting the right to transmit only to the node holding the circulating token.",
      "Because ring topology cannot support twisted pair cabling.",
      "To increase the collision rate for testing purposes.",
      "Because switches cannot be installed in ring topology."
    ],
    "correctAnswer": 0,
    "explanation": "Token passing is a deterministic protocol: only the node holding the token frame can place data on the ring, eliminating packet collisions completely.",
    "hint": "Deterministic vs contention-based media access."
  },
  {
    "id": 20,
    "question": "In a CBSE 4-mark case study question, when should you recommend installing a Switch instead of a Hub?",
    "options": [
      "Only when the distance between blocks exceeds 10 km.",
      "Always in modern LAN blocks, because a switch provides dedicated bandwidth, eliminates collisions, and learns MAC addresses.",
      "Only if the computers are running Linux.",
      "Never, because hubs are more intelligent than switches."
    ],
    "correctAnswer": 1,
    "explanation": "In all modern school/campus network setups, Switches are always recommended over Hubs due to collision domain isolation, full-duplex operation, and high bandwidth.",
    "hint": "Hubs are obsolete legacy broadcast devices."
  },
  {
    "id": 21,
    "question": "What is the function of the 5-4-3 rule historically associated with classic 10Base5/10Base2 Ethernet repeaters?",
    "options": [
      "To restrict the network to 5 segments, 4 repeaters, and at most 3 populated segments to prevent collision detection timeout.",
      "To ensure that at least 5 routers and 4 switches are installed in every subnet.",
      "To limit file downloads to 5 MB per minute across 4 nodes.",
      "To allocate 5 IP addresses per 4 users across 3 hours."
    ],
    "correctAnswer": 0,
    "explanation": "The 5-4-3 rule bounded propagation delay so that stations could detect collisions before finishing frame transmission in early CSMA/CD half-duplex Ethernet.",
    "hint": "Round-trip collision detection timing constraint."
  },
  {
    "id": 22,
    "question": "What distinguishes an Active Hub from a Passive Hub?",
    "options": [
      "An active hub routes packets using IP addresses; a passive hub uses MAC addresses.",
      "An active hub amplifies and regenerates electrical signals with external power; a passive hub merely splits signals without amplification.",
      "An active hub connects to the Internet; a passive hub connects to printers.",
      "An active hub is wireless; a passive hub is wired."
    ],
    "correctAnswer": 1,
    "explanation": "An active hub includes power-driven circuitry to regenerate signals like a multiport repeater; a passive hub is purely wiring that splits signals, causing signal attenuation.",
    "hint": "Active requires electric power to regenerate bits."
  },
  {
    "id": 23,
    "question": "Which of the following is an example of a WAN (Wide Area Network)?",
    "options": [
      "The laboratory computers in a school's computer lab.",
      "A banking ATM network spanning across India connected via satellite links and leased lines.",
      "A home Bluetooth connection between a laptop and speakers.",
      "A university campus network spanning three adjacent buildings."
    ],
    "correctAnswer": 1,
    "explanation": "A WAN spans vast geographical distances such as multiple states, countries, or continents, utilizing public carriers, satellite uplinks, and undersea fiber.",
    "hint": "Countrywide or worldwide network."
  },
  {
    "id": 24,
    "question": "Which topology is most commonly deployed in modern structured corporate and educational campus networks?",
    "options": [
      "Pure Bus Topology",
      "Star Topology",
      "Token Ring Topology",
      "Full Mesh Topology"
    ],
    "correctAnswer": 1,
    "explanation": "Star topology (often arranged hierarchically as Tree/Extended Star) is standard because of central manageability, high fault tolerance, and simple troubleshooting.",
    "hint": "Nodes connect via UTP to a central switch."
  },
  {
    "id": 25,
    "question": "In what scenario is a Gateway explicitly recommended in a CBSE board case study?",
    "options": [
      "When connecting two computers in the same room using UTP cable.",
      "When connecting a local LAN to a proprietary host or translating protocols between incompatible enterprise architectures.",
      "When extending a cable run past 80 meters within the same room.",
      "When assigning static IP addresses to 10 desktop computers."
    ],
    "correctAnswer": 1,
    "explanation": "A Gateway is required whenever two communicating networks use completely different network architectures, protocol stacks, or data formats requiring translation.",
    "hint": "Protocol translation across heterogeneous architectures."
  }
];
