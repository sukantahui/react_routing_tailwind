// 25 Authentic CBSE Board Examination Questions for Topic 9
const questions = [
  {
    "id": 1,
    "question": "What is the defining geometric layout of a Bus topology?",
    "options": [
      "All computers and devices are connected directly to a single, continuous central transmission cable (backbone)",
      "Computers form a closed circular loop",
      "All computers connect directly to a central hub or switch",
      "Every computer is wired to every other computer in the building"
    ],
    "answer": "All computers and devices are connected directly to a single, continuous central transmission cable (backbone)",
    "explanation": "In a bus topology, nodes connect directly to a single shared linear cable known as the backbone.",
    "hint": "Single central backbone cable."
  },
  {
    "id": 2,
    "question": "What critical component must be attached at both physical ends of a linear bus topology cable?",
    "options": [
      "Terminator (typically 50 Ohms)",
      "Optical Laser",
      "Battery charger",
      "Firewall"
    ],
    "answer": "Terminator (typically 50 Ohms)",
    "explanation": "A terminator absorbs electrical signal energy at the cable ends to eliminate signal reflections (ghosts).",
    "hint": "Absorbs electrical signals at cable ends."
  },
  {
    "id": 3,
    "question": "What happens on a bus network if a terminator is removed or damaged?",
    "options": [
      "The network operates twice as fast",
      "Signal reflections bounce back from the open cable end, colliding with and destroying active data packets",
      "Only the computer closest to the terminator fails",
      "The network converts into a ring topology"
    ],
    "answer": "Signal reflections bounce back from the open cable end, colliding with and destroying active data packets",
    "explanation": "Open cable ends reflect electrical energy back down the wire, causing continuous collisions that crash the bus.",
    "hint": "Signal reflections cause collisions across the entire bus."
  },
  {
    "id": 4,
    "question": "What happens to a bus network if the central backbone cable is physically cut or severed?",
    "options": [
      "Only the server shuts down",
      "The entire network fails completely because the broken cable creates open, unterminated ends that bounce signals",
      "Computers seamlessly switch to Bluetooth",
      "Data travels through the air across the gap"
    ],
    "answer": "The entire network fails completely because the broken cable creates open, unterminated ends that bounce signals",
    "explanation": "A severed backbone cable is a single point of failure that collapses communication across the entire segment.",
    "hint": "Single point of failure brings down the entire network."
  },
  {
    "id": 5,
    "question": "Which of the following is a key advantage of Bus topology over Star topology?",
    "options": [
      "Bus topology requires significantly less cable length and does not require an expensive central switch",
      "Bus topology is faster than Star topology",
      "Bus topology is immune to cable cuts",
      "Bus topology supports unlimited computers without collisions"
    ],
    "answer": "Bus topology requires significantly less cable length and does not require an expensive central switch",
    "explanation": "Because computers tap directly into a single central cable, bus topology saves massive amounts of cabling.",
    "hint": "Requires minimum cable length."
  },
  {
    "id": 6,
    "question": "Why is fault isolation and troubleshooting notoriously difficult in a Bus topology?",
    "options": [
      "Because cables are hidden in the ceiling",
      "Because a single fault, bad connector, or cable break anywhere along the line disables the entire bus, making the fault hard to locate",
      "Because computers refuse to display errors",
      "Because bus networks have no IP addresses"
    ],
    "answer": "Because a single fault, bad connector, or cable break anywhere along the line disables the entire bus, making the fault hard to locate",
    "explanation": "Since the entire network stops working from a single break, technicians must physically inspect and test every tap.",
    "hint": "A break anywhere shuts down the entire bus."
  },
  {
    "id": 7,
    "question": "How does a computer in a bus topology determine whether a passing frame is meant for it?",
    "options": [
      "The computer smells the packet",
      "All nodes receive the broadcast signal and examine the destination MAC address; only the matching node processes it",
      "The hub calls the computer's name",
      "By counting the number of bits"
    ],
    "answer": "All nodes receive the broadcast signal and examine the destination MAC address; only the matching node processes it",
    "explanation": "Because signals propagate down the shared wire, every node receives the frame and checks the destination MAC address.",
    "hint": "All nodes receive, but only destination processes."
  },
  {
    "id": 8,
    "question": "What connector was traditionally used to attach a computer's network interface card to a 10BASE2 coaxial bus backbone?",
    "options": [
      "BNC T-Connector",
      "RJ-45 modular plug",
      "SC fiber connector",
      "HDMI cable"
    ],
    "answer": "BNC T-Connector",
    "explanation": "A BNC T-connector plugged into the NIC, with the two horizontal ends joining the passing coaxial bus cable.",
    "hint": "BNC T-Connector."
  },
  {
    "id": 9,
    "question": "What hardware component was used in 10BASE5 Thicknet bus networks to pierce the heavy yellow coaxial cable?",
    "options": [
      "Vampire Tap (piercing tap)",
      "Soldering iron",
      "RJ-11 jack",
      "USB plug"
    ],
    "answer": "Vampire Tap (piercing tap)",
    "explanation": "A Vampire Tap clamped onto the thick cable and pierced its teeth through the jacket to contact the center conductor.",
    "hint": "Vampire Tap."
  },
  {
    "id": 10,
    "question": "Why does adding more workstations to a Bus topology cause network speed to degrade rapidly?",
    "options": [
      "Because the computers run out of RAM",
      "Because all nodes share the same single transmission medium, and more nodes lead to more frequent CSMA/CD collisions",
      "Because the cable gets heavier",
      "Because the terminators get cold"
    ],
    "answer": "Because all nodes share the same single transmission medium, and more nodes lead to more frequent CSMA/CD collisions",
    "explanation": "As more devices share the same channel, the probability of simultaneous transmissions (collisions) increases.",
    "hint": "More nodes on shared channel cause more collisions."
  },
  {
    "id": 11,
    "question": "In a CBSE 5-mark Case Study: An office wants to interconnect 6 computers in a straight line with the MINIMUM possible cable length and lowest cost. What topology should be suggested?",
    "options": [
      "Bus Topology",
      "Star Topology",
      "Mesh Topology",
      "Ring Topology"
    ],
    "answer": "Bus Topology",
    "explanation": "When minimum cable length and lowest initial cost are the explicit criteria, Bus topology is the standard CBSE choice.",
    "hint": "Minimum cable length requirement = Bus topology."
  },
  {
    "id": 12,
    "question": "What is the maximum number of workstations permitted on a single 10BASE2 Thinnet bus segment under IEEE 802.3?",
    "options": [
      "30 nodes",
      "100 nodes",
      "10 nodes",
      "1024 nodes"
    ],
    "answer": "30 nodes",
    "explanation": "Under IEEE 802.3, a 10BASE2 Thinnet segment is limited to a maximum of 30 nodes with 0.5m minimum spacing.",
    "hint": "Thirty nodes."
  },
  {
    "id": 13,
    "question": "What is the minimum spacing required between taps on a 10BASE5 Thicknet bus cable to prevent signal interference?",
    "options": [
      "2.5 meters",
      "0.5 meters",
      "10 meters",
      "50 meters"
    ],
    "answer": "2.5 meters",
    "explanation": "Thicknet cables had black bands marked every 2.5 meters to ensure taps avoided constructive standing wave interference.",
    "hint": "2.5 meters."
  },
  {
    "id": 14,
    "question": "What type of transmission medium was historically used for bus topology LANs?",
    "options": [
      "Coaxial Cable (RG-58 Thinnet and RG-8 Thicknet)",
      "Optical Fiber Cable",
      "Unshielded Twisted Pair (Cat-6)",
      "Microwave links"
    ],
    "answer": "Coaxial Cable (RG-58 Thinnet and RG-8 Thicknet)",
    "explanation": "Coaxial cable was the universal physical medium for classic bus Ethernet networks (10BASE2 and 10BASE5).",
    "hint": "Coaxial cable."
  },
  {
    "id": 15,
    "question": "What is a 'Drop Cable' in a bus topology?",
    "options": [
      "A cable dropped on the floor",
      "A cable that branches off from the main backbone to connect an individual workstation or transceiver",
      "A cable that has been discarded",
      "A power cord"
    ],
    "answer": "A cable that branches off from the main backbone to connect an individual workstation or transceiver",
    "explanation": "In 10BASE5 Thicknet, an AUI drop cable connected the transceiver clamped on the backbone to the computer's network card.",
    "hint": "Short cable connecting a node to the main backbone."
  },
  {
    "id": 16,
    "question": "What happens if two computers in a bus topology transmit at the exact same moment?",
    "options": [
      "Both transmissions collide, producing an electrical voltage spike that corrupts both frames",
      "The computers swap files automatically",
      "The cable doubles its bandwidth",
      "The server picks the winner"
    ],
    "answer": "Both transmissions collide, producing an electrical voltage spike that corrupts both frames",
    "explanation": "Overlapping electrical signals on the shared copper wire cause an electrical collision, corrupting data.",
    "hint": "Electrical collision corrupts both frames."
  },
  {
    "id": 17,
    "question": "How does CSMA/CD resolve a collision on a bus network?",
    "options": [
      "Transmitting nodes detect the collision, broadcast a jam signal, and wait a random backoff time before retrying",
      "Nodes reboot immediately",
      "The network administrator must press a button",
      "The packets are deleted permanently"
    ],
    "answer": "Transmitting nodes detect the collision, broadcast a jam signal, and wait a random backoff time before retrying",
    "explanation": "CSMA/CD sends a jam signal to ensure all nodes recognize the collision, then uses truncated binary exponential backoff.",
    "hint": "Jam signal and random backoff timer."
  },
  {
    "id": 18,
    "question": "Which of the following is true regarding security on a bus topology?",
    "options": [
      "Bus topology is inherently insecure because all data frames travel along the entire cable past every connected node",
      "Bus topology is the most secure topology in the world",
      "Data on a bus cannot be seen by any computer",
      "Bus cables encrypt data with passwords"
    ],
    "answer": "Bus topology is inherently insecure because all data frames travel along the entire cable past every connected node",
    "explanation": "Since signals travel past every node on the backbone, any network card set to promiscuous mode can snoop on all traffic.",
    "hint": "All frames travel past every node on the shared wire."
  },
  {
    "id": 19,
    "question": "What is the maximum segment length of 10BASE2 Thinnet coaxial bus cabling?",
    "options": [
      "185 meters (approx. 200m)",
      "100 meters",
      "500 meters",
      "1000 meters"
    ],
    "answer": "185 meters (approx. 200m)",
    "explanation": "10BASE2 Thinnet supports a maximum segment length of 185 meters before signal attenuation requires a repeater.",
    "hint": "185 meters."
  },
  {
    "id": 20,
    "question": "What is the maximum segment length of 10BASE5 Thicknet coaxial bus cabling?",
    "options": [
      "500 meters",
      "185 meters",
      "100 meters",
      "2000 meters"
    ],
    "answer": "500 meters",
    "explanation": "10BASE5 Thicknet supports up to 500 meters per segment.",
    "hint": "500 meters."
  },
  {
    "id": 21,
    "question": "Why has Bus topology been largely abandoned in modern commercial networks in favor of Star topology?",
    "options": [
      "Because bus topology has a single point of failure, difficult troubleshooting, and high collision rates",
      "Because coaxial cable was banned by law",
      "Because computers today are too fast for bus topology",
      "Because bus networks consume too much water"
    ],
    "answer": "Because bus topology has a single point of failure, difficult troubleshooting, and high collision rates",
    "explanation": "Star topology with switches isolates cable breaks to single nodes and eliminates collisions, making bus obsolete.",
    "hint": "Single point of failure and high collision rates."
  },
  {
    "id": 22,
    "question": "True or False: If a workstation connected to a bus topology crashes or shuts down gracefully, the rest of the network continues to operate normally.",
    "options": [
      "True",
      "False",
      "Only if the workstation was a laptop",
      "Only on holidays"
    ],
    "answer": "True",
    "explanation": "If a workstation shuts down without physically breaking the backbone cable or removing a terminator, the bus remains intact.",
    "hint": "Node shutdown does not break the physical cable."
  },
  {
    "id": 23,
    "question": "What tool can a network technician use to find the exact location of a break in a coaxial bus cable?",
    "options": [
      "TDR (Time Domain Reflectometer)",
      "Digital thermometer",
      "Compass",
      "Barometer"
    ],
    "answer": "TDR (Time Domain Reflectometer)",
    "explanation": "A Time Domain Reflectometer (TDR) sends electrical pulses down the cable and calculates the distance to the break based on reflection timing.",
    "hint": "Time Domain Reflectometer (TDR)."
  },
  {
    "id": 24,
    "question": "What happens to the characteristic impedance of a bus network if an incorrect 75-Ohm terminator is used instead of a 50-Ohm terminator on RG-58 cable?",
    "options": [
      "Impedance mismatch causes partial signal reflection and standing waves",
      "The network speed increases to 1 Gbps",
      "The cable turns into optical fiber",
      "Nothing happens"
    ],
    "answer": "Impedance mismatch causes partial signal reflection and standing waves",
    "explanation": "An impedance mismatch prevents complete absorption of signal energy, causing reflections that degrade signal quality.",
    "hint": "Impedance mismatch causes signal reflections."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Identify the topology in which all nodes are connected to a single central transmission line with terminators at both ends.' What is the answer?",
    "options": [
      "Bus Topology",
      "Star Topology",
      "Ring Topology",
      "Mesh Topology"
    ],
    "answer": "Bus Topology",
    "explanation": "A Bus Topology connects all nodes along a single central cable with terminators at both ends.",
    "hint": "Single central line with terminators = Bus topology."
  }
];

export default questions;
