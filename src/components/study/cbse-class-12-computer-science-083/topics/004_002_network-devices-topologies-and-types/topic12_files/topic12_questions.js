// 25 Authentic CBSE Board Examination Questions for Topic 12
const questions = [
  {
    "id": 1,
    "question": "What is the mathematical formula to calculate the total number of physical links required in a fully connected Mesh topology of N nodes?",
    "options": [
      "N * (N - 1) / 2",
      "N * (N - 1)",
      "N - 1",
      "2 * N"
    ],
    "answer": "N * (N - 1) / 2",
    "explanation": "In a full mesh, each node connects to every other node. Handshake combination formula is N*(N-1)/2.",
    "hint": "N*(N-1)/2."
  },
  {
    "id": 2,
    "question": "How many physical cable links are required to connect 8 computers in a fully connected Mesh topology?",
    "options": [
      "28 links",
      "56 links",
      "8 links",
      "14 links"
    ],
    "answer": "28 links",
    "explanation": "Applying the formula: 8 * (8 - 1) / 2 = 8 * 7 / 2 = 56 / 2 = 28 links.",
    "hint": "8 * 7 / 2."
  },
  {
    "id": 3,
    "question": "How many input/output (I/O) ports must each individual computer possess in a fully connected Mesh network of 10 computers?",
    "options": [
      "9 ports",
      "10 ports",
      "45 ports",
      "1 port"
    ],
    "answer": "9 ports",
    "explanation": "Each device must connect to all other N-1 devices. For 10 computers, each node requires 10 - 1 = 9 dedicated ports.",
    "hint": "N - 1 ports."
  },
  {
    "id": 4,
    "question": "What is the primary operational advantage of a Mesh topology?",
    "options": [
      "Maximum Fault Tolerance: If one link fails, traffic reroutes through alternative links with zero network disruption",
      "It requires the least amount of cable",
      "It uses no electricity",
      "It can be built without any network cards"
    ],
    "answer": "Maximum Fault Tolerance: If one link fails, traffic reroutes through alternative links with zero network disruption",
    "explanation": "Because multiple dedicated redundant paths exist between every pair of nodes, link failure never disrupts communication.",
    "hint": "Maximum redundancy and fault tolerance."
  },
  {
    "id": 5,
    "question": "Why is a Full Mesh topology rarely installed for general office local area networks?",
    "options": [
      "Because the number of cables and ports grows quadratically, making installation prohibitively expensive and physically unmanageable",
      "Because mesh topology was declared illegal",
      "Because mesh topology only works with analog sound",
      "Because mesh topology runs out of battery"
    ],
    "answer": "Because the number of cables and ports grows quadratically, making installation prohibitively expensive and physically unmanageable",
    "explanation": "The quadratic growth in cables (e.g. 1,225 cables for 50 PCs) makes full mesh cost-prohibitive for standard office LANs.",
    "hint": "Prohibitively high cabling and port costs."
  },
  {
    "id": 6,
    "question": "What is a 'Partial Mesh Topology'?",
    "options": [
      "A network where only mission-critical servers and routers have redundant multiple links, while general workstations have single links",
      "A network with broken cables",
      "A network made of string",
      "A network that only works on half of the days"
    ],
    "answer": "A network where only mission-critical servers and routers have redundant multiple links, while general workstations have single links",
    "explanation": "Partial mesh provides high redundancy to critical core routers without the extreme cost of connecting every desktop workstation.",
    "hint": "Redundant links only for critical core devices."
  },
  {
    "id": 7,
    "question": "What is the defining geometric layout of a Ring topology?",
    "options": [
      "Nodes are connected in a continuous closed circular loop where each node is connected to exactly two adjacent neighbors",
      "All nodes connect to a single straight backbone",
      "Nodes connect to a central switch",
      "Nodes are arranged in a pyramid"
    ],
    "answer": "Nodes are connected in a continuous closed circular loop where each node is connected to exactly two adjacent neighbors",
    "explanation": "In a Ring topology, devices form an unbroken circular loop with each node connected to its left and right neighbors.",
    "hint": "Continuous closed circular loop."
  },
  {
    "id": 8,
    "question": "What media access control method is used in a classic Ring topology to prevent packet collisions?",
    "options": [
      "Token Passing",
      "CSMA/CD",
      "Random Backoff",
      "Slotted ALOHA"
    ],
    "answer": "Token Passing",
    "explanation": "Token Passing circulates a special token frame. Only the node holding the token is permitted to transmit, eliminating collisions.",
    "hint": "Token Passing."
  },
  {
    "id": 9,
    "question": "In what direction does data typically travel in a standard single-ring topology?",
    "options": [
      "Unidirectionally (in one fixed direction around the loop, e.g. clockwise)",
      "In all directions at once",
      "Randomly",
      "Backwards only"
    ],
    "answer": "Unidirectionally (in one fixed direction around the loop, e.g. clockwise)",
    "explanation": "In a basic ring network, data circulates in one predetermined direction from node to node around the circle.",
    "hint": "Unidirectional circular travel."
  },
  {
    "id": 10,
    "question": "What is the primary vulnerability of a simple single-ring topology?",
    "options": [
      "A break in the circular cable or the failure of a single workstation halts the entire ring network",
      "Computers catch fire",
      "It requires too many switches",
      "It only works with 2 computers"
    ],
    "answer": "A break in the circular cable or the failure of a single workstation halts the entire ring network",
    "explanation": "Because data must pass sequentially through every node, any single break breaks the loop and halts the entire network.",
    "hint": "Single break takes down the entire circular network."
  },
  {
    "id": 11,
    "question": "What technology was developed to make Ring networks self-healing against cable breaks using two counter-rotating rings?",
    "options": [
      "FDDI (Fiber Distributed Data Interface) Dual Ring",
      "10BASE2 Thinnet",
      "Passive Hub",
      "BNC Terminator"
    ],
    "answer": "FDDI (Fiber Distributed Data Interface) Dual Ring",
    "explanation": "FDDI uses primary and secondary counter-rotating rings that automatically wrap around a broken link to form a single continuous loop.",
    "hint": "FDDI Dual Counter-Rotating Ring."
  },
  {
    "id": 12,
    "question": "How many physical links are required in a Ring topology connecting N computers?",
    "options": [
      "N links",
      "N * (N - 1) / 2 links",
      "N - 1 links",
      "2 * N links"
    ],
    "answer": "N links",
    "explanation": "Connecting N nodes in a closed circle requires exactly N cables (each node connects to its neighbor).",
    "hint": "Connecting N nodes in a circle requires N cables."
  },
  {
    "id": 13,
    "question": "What happens to the Token frame in a Token Ring network after the destination node copies the data?",
    "options": [
      "The frame continues circulating until it returns to the sending node, which removes its data and releases a new free token",
      "The token is destroyed permanently",
      "The token is emailed to the server",
      "The computer deletes the token"
    ],
    "answer": "The frame continues circulating until it returns to the sending node, which removes its data and releases a new free token",
    "explanation": "The originating sender strips its data frame upon return and issues a new free token for other nodes to use.",
    "hint": "Sender strips data and releases a new token."
  },
  {
    "id": 14,
    "question": "Which of the following real-world environments is most likely to deploy a Full or Partial Mesh topology?",
    "options": [
      "Nuclear power plant control telemetry and air traffic control radar backbones",
      "A small 4-computer cyber café",
      "A residential home living room",
      "A kindergarten classroom"
    ],
    "answer": "Nuclear power plant control telemetry and air traffic control radar backbones",
    "explanation": "Mission-critical systems where downtime is life-threatening justify the extreme expense of redundant mesh topologies.",
    "hint": "Mission-critical environments where downtime is unacceptable."
  },
  {
    "id": 15,
    "question": "What is an 'Early Token Release' mechanism in high-speed Token Ring networks?",
    "options": [
      "Releasing the token before the computer boots",
      "Allowing a transmitting node to release a new free token immediately after transmitting its data frame without waiting for it to return",
      "Turning off the network early on Fridays",
      "Sending tokens wirelessly"
    ],
    "answer": "Allowing a transmitting node to release a new free token immediately after transmitting its data frame without waiting for it to return",
    "explanation": "Early Token Release increases throughput by releasing the token immediately after transmission rather than waiting for round-trip return.",
    "hint": "Releasing the token immediately after transmission."
  },
  {
    "id": 16,
    "question": "How many physical links are required to connect 5 computers in a fully connected Mesh topology?",
    "options": [
      "10 links",
      "20 links",
      "5 links",
      "15 links"
    ],
    "answer": "10 links",
    "explanation": "Applying the formula: 5 * (5 - 1) / 2 = 5 * 4 / 2 = 10 links.",
    "hint": "5 * 4 / 2 = 10."
  },
  {
    "id": 17,
    "question": "What is a 'MAU' (Multistation Access Unit) in IBM Token Ring networks?",
    "options": [
      "A central wiring hub that physically forms a star layout while maintaining an internal logical ring circuit",
      "A mouse adapter",
      "A brand of monitor",
      "A power strip"
    ],
    "answer": "A central wiring hub that physically forms a star layout while maintaining an internal logical ring circuit",
    "explanation": "A Multistation Access Unit (MAU) connects nodes in a physical star while routing the token in an internal logical ring.",
    "hint": "Physical star, logical ring hub."
  },
  {
    "id": 18,
    "question": "True or False: In a Mesh topology, data security is very high because every communication travels over a private dedicated link between the two communicating nodes.",
    "options": [
      "True",
      "False",
      "Only on Linux",
      "Only during the day"
    ],
    "answer": "True",
    "explanation": "Because each pair of nodes has a dedicated line, third-party nodes cannot snoop on traffic crossing other links.",
    "hint": "Dedicated point-to-point links provide high privacy."
  },
  {
    "id": 19,
    "question": "What is 'Beaconing' in a Token Ring network?",
    "options": [
      "Lighting a flare on the roof",
      "An automated diagnostic process where a node detects loss of signal and broadcasts beacon frames to isolate the fault location",
      "Changing the network password",
      "Increasing the Wi-Fi range"
    ],
    "answer": "An automated diagnostic process where a node detects loss of signal and broadcasts beacon frames to isolate the fault location",
    "explanation": "Beaconing alerts the network to an unrecoverable failure, identifying the failing node and its nearest upstream neighbor.",
    "hint": "Automated fault isolation frames."
  },
  {
    "id": 20,
    "question": "Which topology provides the highest possible level of redundancy and path availability?",
    "options": [
      "Full Mesh Topology",
      "Star Topology",
      "Bus Topology",
      "Ring Topology"
    ],
    "answer": "Full Mesh Topology",
    "explanation": "Full Mesh provides dedicated direct paths between every node pair, yielding the highest availability.",
    "hint": "Full Mesh has maximum redundancy."
  },
  {
    "id": 21,
    "question": "How many ports must a computer have if it is connected to a fully connected mesh network of 12 computers?",
    "options": [
      "11 ports",
      "12 ports",
      "66 ports",
      "1 port"
    ],
    "answer": "11 ports",
    "explanation": "Each node connects to all other N-1 nodes. For 12 computers, each node requires 12 - 1 = 11 ports.",
    "hint": "12 - 1 = 11."
  },
  {
    "id": 22,
    "question": "Why does Token Ring provide deterministic latency compared to CSMA/CD Ethernet?",
    "options": [
      "Because Token Ring uses satellites",
      "Because every workstation is guaranteed a turn to transmit within a calculated maximum token rotation time, with zero collision backoff delays",
      "Because Token Ring is wireless",
      "Because Token Ring was made by IBM"
    ],
    "answer": "Because every workstation is guaranteed a turn to transmit within a calculated maximum token rotation time, with zero collision backoff delays",
    "explanation": "Deterministic access guarantees that every node gets the token within a maximum time bound, avoiding random collision backoffs.",
    "hint": "Guaranteed transmission turn within fixed time bound."
  },
  {
    "id": 23,
    "question": "What happens if a node holding the token in a Token Ring network crashes before releasing it?",
    "options": [
      "The network is frozen forever",
      "An Active Monitor node detects token loss and generates a brand-new token frame to restore ring operation",
      "The computers catch fire",
      "The network converts into a bus"
    ],
    "answer": "An Active Monitor node detects token loss and generates a brand-new token frame to restore ring operation",
    "explanation": "The designated Active Monitor node runs a token expiration timer; if the token is lost, it issues a fresh token.",
    "hint": "Active Monitor regenerates lost tokens."
  },
  {
    "id": 24,
    "question": "What is the primary factor preventing the widespread adoption of Full Mesh topologies in schools and commercial offices?",
    "options": [
      "Prohibitive cabling and hardware port expense",
      "Mesh is banned by IEEE",
      "Computers reject mesh cables",
      "Mesh only works with laptops"
    ],
    "answer": "Prohibitive cabling and hardware port expense",
    "explanation": "The extreme cost of running hundreds of cables and installing multiple NICs per computer makes mesh impractical for offices.",
    "hint": "Prohibitive cabling and hardware cost."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Name the topology where every node has a dedicated point-to-point link to every other node.' What is the answer?",
    "options": [
      "Mesh Topology",
      "Star Topology",
      "Bus Topology",
      "Ring Topology"
    ],
    "answer": "Mesh Topology",
    "explanation": "A Mesh Topology provides dedicated point-to-point links between every pair of nodes.",
    "hint": "Dedicated link to every other node = Mesh topology."
  }
];

export default questions;
