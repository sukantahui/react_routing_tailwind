export default [
  {
    "id": 1,
    "question": "In a CBSE 4-mark case study question: 'Suggest the placement of Hub/Switch in the campus with reason.' What is the universally correct answer?",
    "options": [
      "A Switch (or Hub) should be installed in EVERY block/wing, to connect all the individual workstations in that block together.",
      "Only in the block with the most computers.",
      "Only in the server room.",
      "Switches are not needed if repeaters are installed."
    ],
    "correctAnswer": 0,
    "explanation": "Every block contains multiple computers; a switch or hub is required in each block to establish local LAN connectivity.",
    "hint": "In each and every block containing multiple computers."
  },
  {
    "id": 2,
    "question": "Why is a Switch strongly preferred over a Hub in modern campus network installations?",
    "options": [
      "Because a switch provides dedicated bandwidth per port, eliminates packet collisions, and forwards frames selectively using a MAC table, whereas a hub broadcasts all traffic sharing a single collision domain.",
      "Because switches are wireless.",
      "Because hubs cannot connect to computers.",
      "Because switches are legally required by the government."
    ],
    "correctAnswer": 0,
    "explanation": "Switches provide micro-segmentation, full-duplex transmission, and intelligent frame switching, whereas hubs suffer from broadcast collision congestion.",
    "hint": "Dedicated bandwidth per port and collision elimination."
  },
  {
    "id": 3,
    "question": "If a campus consists of 4 blocks: Admin Block (25 PCs), Tech Block (80 PCs), Accounts Block (15 PCs), and Hostel Block (60 PCs). How many switches should be installed?",
    "options": [
      "4 Switches (One switch inside each of the 4 blocks)",
      "1 Switch",
      "2 Switches",
      "180 Switches"
    ],
    "correctAnswer": 0,
    "explanation": "Each of the 4 blocks houses multiple computers, requiring 1 switch per building (4 switches total).",
    "hint": "One switch per block = 4 switches."
  },
  {
    "id": 4,
    "question": "What topology is formed INSIDE each individual building when all workstations connect to the local building switch?",
    "options": [
      "Star Topology",
      "Bus Topology",
      "Ring Topology",
      "Full Mesh"
    ],
    "correctAnswer": 0,
    "explanation": "Inside each wing, computers connect via dedicated twisted pair patch cables to the central switch, creating an internal Star topology.",
    "hint": "Internal Star topology."
  },
  {
    "id": 5,
    "question": "What is an 'Uplink Port' on a building's network switch?",
    "options": [
      "A high-speed port (often Gigabit Ethernet or SFP Fiber Optic) used to connect the local building switch to the core switch in the main Server Room.",
      "A port to charge mobile phones.",
      "A port connected to an antenna.",
      "A broken port."
    ],
    "correctAnswer": 0,
    "explanation": "Uplink ports interconnect edge switches in individual buildings back to the core aggregation switch in the central datacenter.",
    "hint": "Connects local switch back to the central core switch."
  },
  {
    "id": 6,
    "question": "What standard port densities are commonly manufactured for enterprise network switches?",
    "options": [
      "8, 16, 24, and 48 ports",
      "3, 7, 11, and 19 ports",
      "100, 200, and 300 ports",
      "Only 2 ports"
    ],
    "correctAnswer": 0,
    "explanation": "Switches are manufactured in standardized port counts: 8-port, 16-port, 24-port, and 48-port rack-mountable configurations.",
    "hint": "8, 16, 24, and 48 ports."
  },
  {
    "id": 7,
    "question": "If Block Tech has 110 computers, how many 24-port switches (or 48-port switches) would be needed inside Block Tech?",
    "options": [
      "Either five 24-port switches (5 * 24 = 120 ports) or three 48-port switches (3 * 48 = 144 ports).",
      "Only one 8-port switch.",
      "110 separate switches.",
      "Zero switches."
    ],
    "correctAnswer": 0,
    "explanation": "Stacking multiple 24-port or 48-port switches provides adequate physical ports to accommodate 110 workstations.",
    "hint": "Stacking switches to accommodate 110 ports."
  },
  {
    "id": 8,
    "question": "Why should an unmanaged Hub NEVER be installed in a high-density computer lab with 80 computers?",
    "options": [
      "Because all 80 workstations would share a single collision domain; simultaneous transmissions would cause relentless CSMA/CD packet collisions and network gridlock.",
      "Because hubs catch fire when more than 10 computers connect.",
      "Because hubs cannot transmit images.",
      "Because hubs require satellite dishes."
    ],
    "correctAnswer": 0,
    "explanation": "Hubs broadcast every bit to all ports, making concurrent multi-user network access virtually impossible in dense labs.",
    "hint": "Shared collision domain causes severe network collisions."
  },
  {
    "id": 9,
    "question": "At which layer of the OSI model does a standard network switch operate?",
    "options": [
      "Layer 2 (Data Link Layer)",
      "Layer 1 (Physical Layer)",
      "Layer 3 (Network Layer)",
      "Layer 7 (Application Layer)"
    ],
    "correctAnswer": 0,
    "explanation": "Standard switches operate at Layer 2 (Data Link Layer), using 48-bit MAC addresses to forward frames.",
    "hint": "Layer 2 (Data Link Layer)."
  },
  {
    "id": 10,
    "question": "What is a 'Layer-3 Switch' (Multilayer Switch)?",
    "options": [
      "A high-performance switch that combines Layer 2 high-speed frame switching with Layer 3 IP routing hardware to route traffic between VLANs at wire speed.",
      "A switch with three physical cables attached.",
      "A switch made of three layers of plastic.",
      "A switch used only on third floors."
    ],
    "correctAnswer": 0,
    "explanation": "Layer-3 switches perform inter-VLAN IP routing in hardware (ASICs) at wire speed, commonly deployed as campus core switches.",
    "hint": "Combines L2 switching with L3 hardware routing."
  },
  {
    "id": 11,
    "question": "When a student answers Sub-Question (c): 'Where should a Hub/Switch be placed?', what is the expected technical justification?",
    "options": [
      "\"A Switch/Hub must be placed in each block to connect all local computers together and facilitate data transmission within that block's local network.\"",
      "\"Because switches look nice in rooms.\"",
      "\"Because the teacher requested it.\"",
      "\"To reduce electricity consumption.\""
    ],
    "correctAnswer": 0,
    "explanation": "The required reason is providing local connectivity for all workstations inside that specific block.",
    "hint": "To connect all local computers inside that block."
  },
  {
    "id": 12,
    "question": "What is 'PoE' (Power over Ethernet) supported by modern network switches?",
    "options": [
      "A standard that delivers electrical operating power alongside data across twisted pair Ethernet cables, powering IP phones, Wi-Fi access points, and security cameras.",
      "A protocol for sending power bills via email.",
      "A software that speeds up typing.",
      "A backup battery."
    ],
    "correctAnswer": 0,
    "explanation": "PoE (IEEE 802.3af/at/bt) eliminates separate electrical power outlets for ceiling-mounted access points and desktop IP phones.",
    "hint": "Delivers electrical power and data over Ethernet cables."
  },
  {
    "id": 13,
    "question": "In structured campus cabling, where are building switches physically mounted?",
    "options": [
      "Inside a lockable wall-mounted or floor-standing 19-inch Network Equipment Rack (MDF/IDF cabinet).",
      "Placed loose on the floor under a student desk.",
      "Tied with string to a window.",
      "Buried in the garden."
    ],
    "correctAnswer": 0,
    "explanation": "Switches are mounted securely inside lockable 19-inch equipment racks to protect ports and ensure organized patch cabling.",
    "hint": "Inside a 19-inch equipment rack cabinet."
  },
  {
    "id": 14,
    "question": "Can an active switch regenerate weak signals arriving from a 90-meter cable run before forwarding them out another port?",
    "options": [
      "Yes, every active switch port decodes and regenerates clean digital frames, effectively refreshing signal strength.",
      "No, switches degrade signal strength.",
      "Only if connected to a laptop.",
      "Switches cannot regenerate signals."
    ],
    "correctAnswer": 0,
    "explanation": "Because switches re-encode frames at Layer 2, they provide complete signal regeneration on each egress port.",
    "hint": "Switches regenerate signals on all active ports."
  },
  {
    "id": 15,
    "question": "What is a 'Managed Switch' compared to an 'Unmanaged Switch'?",
    "options": [
      "A Managed switch allows network administrators to configure VLANs, port speeds, QoS priority, and monitor traffic remotely; an Unmanaged switch has fixed plug-and-play settings.",
      "A Managed switch requires a human to press buttons continuously.",
      "A Managed switch is wireless; an Unmanaged switch is wired.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Managed switches offer remote CLI/web administration, VLAN segmentation, and SNMP monitoring for enterprise management.",
    "hint": "Configurable VLANs, QoS, and remote management."
  },
  {
    "id": 16,
    "question": "In a case study, if a question asks: 'State the difference between a Hub and a Switch in one sentence', what is the ideal response?",
    "options": [
      "A Hub broadcasts all incoming data to all connected ports sharing one collision domain, whereas a Switch forwards data selectively to the destination port using MAC addresses.",
      "A Hub is for internet; a Switch is for email.",
      "A Hub is faster than a Switch.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Broadcast dumb forwarding vs intelligent selective MAC-based forwarding is the core distinction.",
    "hint": "Broadcast to all ports vs selective forwarding to destination port."
  },
  {
    "id": 17,
    "question": "Why does installing a Switch in each block improve network security compared to a Hub?",
    "options": [
      "Because a switch delivers unicast frames directly to the intended recipient's port, preventing rogue workstations from casually eavesdropping on peer traffic via packet sniffers.",
      "Because switches have passwords printed on them.",
      "Because switches delete all emails.",
      "Because hubs do not use electricity."
    ],
    "correctAnswer": 0,
    "explanation": "On a hub, all nodes receive all frames, allowing trivial packet sniffing. Switches micro-segment traffic point-to-point.",
    "hint": "Prevents casual eavesdropping via point-to-point unicast."
  },
  {
    "id": 18,
    "question": "What is 'VLAN' (Virtual Local Area Network) configured on enterprise switches?",
    "options": [
      "A logical partitioning of a physical switch into multiple isolated virtual broadcast domains (e.g. Staff VLAN, Student VLAN, Guest VLAN).",
      "A virtual reality game.",
      "A virus scanner plugin.",
      "A driver for video projectors."
    ],
    "correctAnswer": 0,
    "explanation": "VLANs isolate traffic logically across departments on shared physical switches, enhancing security and broadcast containment.",
    "hint": "Logical segmentation of a switch into isolated broadcast domains."
  },
  {
    "id": 19,
    "question": "If a campus case study asks: 'Which device should be installed in each wing to provide wireless internet connectivity to student laptops?', what device should you suggest?",
    "options": [
      "Wi-Fi Access Point (AP) connected to the local building switch",
      "Coaxial Cable Terminator",
      "Dial-up Modem",
      "Passive Splitter"
    ],
    "correctAnswer": 0,
    "explanation": "Wi-Fi Access Points (APs) uplink to building switches and broadcast 802.11 wireless radio coverage for laptops and mobile devices.",
    "hint": "Wi-Fi Access Point (AP)."
  },
  {
    "id": 20,
    "question": "How does a Switch learn which MAC address is attached to which physical port?",
    "options": [
      "By inspecting the Source MAC address of every incoming frame and recording it in its internal CAM (MAC address) table.",
      "By querying Google search.",
      "By asking the user for their password.",
      "By measuring cable resistance."
    ],
    "correctAnswer": 0,
    "explanation": "Switches dynamically populate their CAM tables by reading source MAC addresses from received Ethernet frame headers.",
    "hint": "Inspects source MAC addresses on incoming frames."
  },
  {
    "id": 21,
    "question": "In a case study, if Wing A has 30 computers, Wing B has 40 computers, and Wing C has 50 computers, how many total switch ports are required at minimum?",
    "options": [
      "120 workstation ports + 3 uplink ports = at least 123 ports across the campus switches.",
      "Only 3 ports.",
      "10 ports.",
      "500 ports."
    ],
    "correctAnswer": 0,
    "explanation": "Each workstation requires a dedicated drop port, plus uplink ports to connect the building switches back to the core.",
    "hint": "One port per PC plus uplink ports."
  },
  {
    "id": 22,
    "question": "What is 'Broadcast Storm' on an unmanaged network, and how do switches help mitigate it?",
    "options": [
      "A condition where excessive broadcast frames circulate endlessly, saturating network bandwidth; managed switches run Spanning Tree Protocol (STP) to eliminate loops.",
      "A thunderstorm with heavy lightning.",
      "A radio station playing music too loudly.",
      "A computer fan blowing too fast."
    ],
    "correctAnswer": 0,
    "explanation": "STP prevents loops and broadcast storms on switched networks.",
    "hint": "Spanning Tree Protocol (STP) prevents broadcast loops."
  },
  {
    "id": 23,
    "question": "What cable type connects desktop computers in a computer lab to the local building switch?",
    "options": [
      "Cat6 Unshielded Twisted Pair (UTP) patch cable with RJ45 connectors",
      "HDMI Cable",
      "VGA Cable",
      "Coaxial BNC cable"
    ],
    "correctAnswer": 0,
    "explanation": "Cat6 UTP cables terminated with RJ45 modular plugs are standard for connecting workstations to switch ports.",
    "hint": "Cat6 UTP cable with RJ45 connectors."
  },
  {
    "id": 24,
    "question": "In a CBSE 1-mark question: 'Suggest the placement of Hub/Switch in the campus.' If a student writes: 'In the Server Block only', how many marks are awarded?",
    "options": [
      "Zero marks (or partial 0.5 at best), because a switch is required in EVERY block that has multiple computers.",
      "Full marks.",
      "2 marks.",
      "10 marks."
    ],
    "correctAnswer": 0,
    "explanation": "Marking schemes explicitly state: 'In each / every block (or wing) to connect local computers'.",
    "hint": "Must state in each/every block."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, how should you write the complete answer to: 'Where should a Hub/Switch be placed? Give reason.'?",
    "options": [
      "\"A Switch (or Hub) should be installed in EACH AND EVERY BLOCK/WING of the campus. Reason: To connect all the local workstations in that block together and facilitate data transfer within the local network.\"",
      "\"Switch in Admin.\"",
      "\"Switch in Server.\"",
      "\"No switch needed.\""
    ],
    "correctAnswer": 0,
    "explanation": "A complete answer clearly states 'in each and every block' and explains the reason: connecting local workstations together.",
    "hint": "In each and every block + to connect local workstations together."
  }
];
