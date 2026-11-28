// 25 Authentic CBSE Board Examination Questions for Topic 10
const questions = [
  {
    "id": 1,
    "question": "What is the defining structural arrangement of a Star topology?",
    "options": [
      "All nodes are connected directly to a central connecting device (such as a switch or hub) via dedicated cables",
      "Nodes form a continuous closed circle",
      "Nodes connect along a single linear cable",
      "Every node is connected wirelessly only"
    ],
    "answer": "All nodes are connected directly to a central connecting device (such as a switch or hub) via dedicated cables",
    "explanation": "In a Star topology, each device has a dedicated point-to-point connection to a central controller.",
    "hint": "Dedicated point-to-point cables to a central device."
  },
  {
    "id": 2,
    "question": "What is the single greatest advantage of Star topology regarding network reliability?",
    "options": [
      "It consumes zero electricity",
      "Fault Isolation: If a cable connecting one computer breaks, only that single computer goes offline, while the rest of the network continues operating normally",
      "It requires no cables",
      "It works through mental telepathy"
    ],
    "answer": "Fault Isolation: If a cable connecting one computer breaks, only that single computer goes offline, while the rest of the network continues operating normally",
    "explanation": "Point-to-point links isolate physical failures. A severed workstation cable affects only that single node.",
    "hint": "Fault isolation."
  },
  {
    "id": 3,
    "question": "What is the primary vulnerability (disadvantage) of a Star topology?",
    "options": [
      "It cannot transmit digital files",
      "Central Point of Failure: If the central hub or switch fails, the entire network goes down immediately",
      "It only works with 3 computers",
      "It overheats in the summer"
    ],
    "answer": "Central Point of Failure: If the central hub or switch fails, the entire network goes down immediately",
    "explanation": "Because all traffic traverses the central controller, a hardware or power failure at the hub/switch halts the entire network.",
    "hint": "The central device is a single point of failure."
  },
  {
    "id": 4,
    "question": "Which transmission medium and connector are most commonly used in modern Star topology local area networks?",
    "options": [
      "Cat-6 UTP cable with RJ-45 modular connectors",
      "RG-58 Coaxial cable with BNC connectors",
      "Vampire taps with drop cables",
      "Infrared laser beams"
    ],
    "answer": "Cat-6 UTP cable with RJ-45 modular connectors",
    "explanation": "Modern star Ethernet LANs universally utilize Category 5e/6 unshielded twisted pair cables terminated with RJ-45 plugs.",
    "hint": "Cat-6 UTP with RJ-45."
  },
  {
    "id": 5,
    "question": "How does cable consumption in a Star topology compare to a Bus topology for the same number of computers?",
    "options": [
      "Star topology consumes significantly MORE cable because each node requires an individual dedicated run to the center",
      "Star topology consumes much less cable",
      "Both topologies consume the exact same cable length",
      "Star topology uses no cables at all"
    ],
    "answer": "Star topology consumes significantly MORE cable because each node requires an individual dedicated run to the center",
    "explanation": "Because each computer must run a separate line to the switch, star topology requires far more total cable than a linear bus.",
    "hint": "Star uses more cable due to individual dedicated runs."
  },
  {
    "id": 6,
    "question": "Why is expanding a Star topology by adding new computers easy and non-disruptive?",
    "options": [
      "You simply plug a new RJ-45 cable into an empty port on the switch without powering off or disrupting existing network traffic",
      "You must cut the backbone cable",
      "You must reboot all computers in the building",
      "You must reinstall Windows on all machines"
    ],
    "answer": "You simply plug a new RJ-45 cable into an empty port on the switch without powering off or disrupting existing network traffic",
    "explanation": "Hot-pluggable RJ-45 switch ports allow new nodes to be added dynamically with zero network interruption.",
    "hint": "Plug-and-play into available switch ports."
  },
  {
    "id": 7,
    "question": "In a CBSE 5-mark Case Study: 'Suggest the most suitable topology to connect 50 computers in the newly established administrative block.' What should be recommended?",
    "options": [
      "Star Topology",
      "Bus Topology",
      "Ring Topology",
      "Mesh Topology"
    ],
    "answer": "Star Topology",
    "explanation": "Star topology is the universal board-recommended standard for local building networks due to reliability and ease of maintenance.",
    "hint": "Star topology is the standard choice."
  },
  {
    "id": 8,
    "question": "How does an intelligent switch in a Star topology eliminate packet collisions between workstations?",
    "options": [
      "By isolating each port into its own dedicated collision domain and providing dedicated full-duplex pathways",
      "By deleting half of the packets",
      "By converting all packets into analog sound",
      "By forcing computers to wait 5 minutes before sending"
    ],
    "answer": "By isolating each port into its own dedicated collision domain and providing dedicated full-duplex pathways",
    "explanation": "Switches microsegment the network so each port has a private, collision-free full-duplex channel to the backplane.",
    "hint": "Each port is an isolated collision domain."
  },
  {
    "id": 9,
    "question": "What physical indication on a central switch helps network administrators quickly troubleshoot an offline workstation in a Star topology?",
    "options": [
      "The switch makes a loud siren sound",
      "The link LED light corresponding to that workstation's switch port turns off or changes color (amber)",
      "The switch changes physical shape",
      "The room temperature rises"
    ],
    "answer": "The link LED light corresponding to that workstation's switch port turns off or changes color (amber)",
    "explanation": "Switch port LEDs provide immediate visual diagnostic feedback indicating physical link integrity and activity.",
    "hint": "Port link LED light turns off."
  },
  {
    "id": 10,
    "question": "What happens if a computer connected to a Star topology crashes due to a software error?",
    "options": [
      "The central switch burns out",
      "Only that crashed computer stops communicating; the rest of the network continues operating with zero disruption",
      "The entire network crashes",
      "The internet disconnects for the whole city"
    ],
    "answer": "Only that crashed computer stops communicating; the rest of the network continues operating with zero disruption",
    "explanation": "Point-to-point links isolate end-node failures, leaving the rest of the star network completely operational.",
    "hint": "Failure of one node does not affect others."
  },
  {
    "id": 11,
    "question": "What is an 'Extended Star Topology'?",
    "options": [
      "A star that reaches outer space",
      "A network where multiple central switches (stars) are interconnected to a main core switch, creating a scalable hierarchical star",
      "A star topology with cables longer than 1000 km",
      "A network with only 1 computer"
    ],
    "answer": "A network where multiple central switches (stars) are interconnected to a main core switch, creating a scalable hierarchical star",
    "explanation": "An extended star cascades distribution switches into a core switch, forming the foundation of modern campus networks.",
    "hint": "Interconnected switches forming hierarchical stars."
  },
  {
    "id": 12,
    "question": "Why does Star topology have lower maintenance and troubleshooting costs than Bus topology over its operational lifespan?",
    "options": [
      "Because cables are free of cost",
      "Because faults are isolated to individual point-to-point links and can be diagnosed instantly without halting the entire network",
      "Because switches never consume electricity",
      "Because bus networks require daily oil changes"
    ],
    "answer": "Because faults are isolated to individual point-to-point links and can be diagnosed instantly without halting the entire network",
    "explanation": "Isolating faults to single patch cords drastically reduces technician diagnostic labor and avoids costly network outages.",
    "hint": "Isolated faults save diagnostic time and downtime."
  },
  {
    "id": 13,
    "question": "What is the maximum cable length for an individual link between a workstation and the central switch in a standard UTP Star network?",
    "options": [
      "100 meters",
      "500 meters",
      "185 meters",
      "10 meters"
    ],
    "answer": "100 meters",
    "explanation": "Under IEEE 802.3 standards, each individual UTP run from the switch port to the workstation NIC is limited to 100 meters.",
    "hint": "100 meters standard copper limit."
  },
  {
    "id": 14,
    "question": "True or False: If a Star topology uses a Hub as the central device instead of a Switch, it still provides dedicated bandwidth to each computer.",
    "options": [
      "False, a hub creates a single shared collision domain where all nodes share the total bandwidth",
      "True, all star topologies guarantee dedicated bandwidth regardless of device",
      "True, hubs are faster than switches",
      "Only if the hub has 4 ports"
    ],
    "answer": "False, a hub creates a single shared collision domain where all nodes share the total bandwidth",
    "explanation": "A hub is a dumb multiport repeater that forces all connected star nodes into one shared electrical collision domain.",
    "hint": "Hubs share bandwidth; switches provide dedicated bandwidth."
  },
  {
    "id": 15,
    "question": "What device is typically placed in a server rack at the center of a star topology to organize and terminate building wall cabling neatly?",
    "options": [
      "RJ-45 Patch Panel",
      "Vampire Tap",
      "BNC T-connector",
      "Coaxial Terminator"
    ],
    "answer": "RJ-45 Patch Panel",
    "explanation": "Structured cabling terminates horizontal runs into rackmount patch panels, where short patch cords connect into the switch.",
    "hint": "Rackmount patch panel."
  },
  {
    "id": 16,
    "question": "Which of the following is an advantage of Star topology over Mesh topology?",
    "options": [
      "Star topology requires far fewer cables and ports ((N) cables vs (N(N-1)/2) cables for full mesh)",
      "Star topology is completely immune to central switch failures",
      "Star topology is older than mesh",
      "Star topology can only connect 5 computers"
    ],
    "answer": "Star topology requires far fewer cables and ports ((N) cables vs (N(N-1)/2) cables for full mesh)",
    "explanation": "Connecting (N) nodes in a Star requires only (N) cables, whereas a full mesh requires (N(N-1)/2) cables, making mesh cost-prohibitive.",
    "hint": "N cables vs N(N-1)/2 cables."
  },
  {
    "id": 17,
    "question": "What happens in a Star topology if the cable between the switch and Computer #4 is bitten by a rodent?",
    "options": [
      "The entire school network goes down",
      "Only Computer #4 loses network connection; all other 49 computers continue working normally",
      "The switch explodes",
      "Computer #4 receives double speed"
    ],
    "answer": "Only Computer #4 loses network connection; all other 49 computers continue working normally",
    "explanation": "Point-to-point links ensure that physical damage to one cable isolates only that specific end device.",
    "hint": "Only the damaged line's computer loses connection."
  },
  {
    "id": 18,
    "question": "What backup measure can enterprise data centers install to eliminate the central point of failure risk in star topologies?",
    "options": [
      "Redundant central core switches with dual power supplies and link aggregation (such as LACP / stacking)",
      "Painting the switch yellow",
      "Using wooden tables",
      "Unplugging the switch every night"
    ],
    "answer": "Redundant central core switches with dual power supplies and link aggregation (such as LACP / stacking)",
    "explanation": "Deploying dual redundant switches and multi-chassis link aggregation ensures automatic failover if one switch fails.",
    "hint": "Redundant backup switches and dual power supplies."
  },
  {
    "id": 19,
    "question": "Which topology is formed by the cables connecting smartphones and laptops wirelessly to a central Wireless Access Point?",
    "options": [
      "Wireless Star Topology",
      "Wireless Bus Topology",
      "Wireless Ring Topology",
      "Linear Topology"
    ],
    "answer": "Wireless Star Topology",
    "explanation": "Wireless devices communicate point-to-point through the central Access Point, forming an over-the-air star topology.",
    "hint": "Devices communicate through the central Access Point."
  },
  {
    "id": 20,
    "question": "Why is a Star topology considered more secure against eavesdropping than a Bus topology?",
    "options": [
      "Because in a switched Star topology, unicast frames travel only along the dedicated cable between the switch and the destination node",
      "Because star cables are wrapped in gold",
      "Because star topology only transmits during the day",
      "Because star topology does not use electricity"
    ],
    "answer": "Because in a switched Star topology, unicast frames travel only along the dedicated cable between the switch and the destination node",
    "explanation": "Dedicated point-to-point cables prevent unauthorized third-party nodes from physically intercepting frames destined for others.",
    "hint": "Dedicated cable runs prevent third-party eavesdropping."
  },
  {
    "id": 21,
    "question": "How many physical cables are required to connect 20 computers to a central switch in a Star topology?",
    "options": [
      "20 cables",
      "190 cables",
      "1 cable",
      "40 cables"
    ],
    "answer": "20 cables",
    "explanation": "In a Star topology, each node requires exactly one dedicated cable to the central switch. For 20 computers, 20 cables are needed.",
    "hint": "One cable per computer = 20 cables."
  },
  {
    "id": 22,
    "question": "In a CBSE Case Study: Building 'Science Block' has 30 computers. If the question asks to draw the layout, how should it be drawn?",
    "options": [
      "A central box labeled 'Switch' with 30 separate lines connecting to 30 computer icons radiating outward",
      "A single straight line with computers hanging like clothes on a line",
      "A circle of computers holding hands",
      "A triangle with 10 computers on each side"
    ],
    "answer": "A central box labeled 'Switch' with 30 separate lines connecting to 30 computer icons radiating outward",
    "explanation": "A star layout diagram depicts a central hub/switch box with individual radial lines extending to each computer node.",
    "hint": "Central switch with radial lines to computers."
  },
  {
    "id": 23,
    "question": "What type of connector is plugged into each port of the central switch in a standard twisted pair star network?",
    "options": [
      "RJ-45 connector",
      "BNC connector",
      "Vampire tap",
      "F-type connector"
    ],
    "answer": "RJ-45 connector",
    "explanation": "RJ-45 8P8C modular connectors terminate twisted pair patch cables plugged into switch ports.",
    "hint": "RJ-45 connector."
  },
  {
    "id": 24,
    "question": "What is the primary trade-off when selecting Star topology over Bus topology?",
    "options": [
      "Star topology provides superior reliability, fault isolation, and speed, but requires more cabling and central switch investment",
      "Star topology is slower than bus",
      "Star topology cannot connect to the internet",
      "Star topology requires manual cranking"
    ],
    "answer": "Star topology provides superior reliability, fault isolation, and speed, but requires more cabling and central switch investment",
    "explanation": "The trade-off is higher initial cabling and switch cost in exchange for robust fault isolation and collision-free performance.",
    "hint": "Higher cabling cost vs superior reliability."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Identify the network topology where all computers are connected to a central switch.' What is the answer?",
    "options": [
      "Star Topology",
      "Bus Topology",
      "Ring Topology",
      "Mesh Topology"
    ],
    "answer": "Star Topology",
    "explanation": "A Star Topology connects all computers directly to a central hub or switch.",
    "hint": "Connected to a central switch = Star topology."
  }
];

export default questions;
