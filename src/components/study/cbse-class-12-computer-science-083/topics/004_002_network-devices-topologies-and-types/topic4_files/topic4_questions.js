// 25 Authentic CBSE Board Examination Questions for Topic 4
const questions = [
  {
    "id": 1,
    "question": "At which layer of the OSI architecture does a standard network switch primarily operate?",
    "options": [
      "Physical Layer (Layer 1)",
      "Data Link Layer (Layer 2)",
      "Network Layer (Layer 3)",
      "Transport Layer (Layer 4)"
    ],
    "answer": "Data Link Layer (Layer 2)",
    "explanation": "A standard Ethernet switch operates at Layer 2 (Data Link Layer), using hardware MAC addresses to forward data frames.",
    "hint": "Layer 2: Data Link Layer."
  },
  {
    "id": 2,
    "question": "What hardware address table does a switch build dynamically to make forwarding decisions?",
    "options": [
      "Routing Table",
      "CAM Table / MAC Address Table",
      "DNS Cache",
      "ARP Table only"
    ],
    "answer": "CAM Table / MAC Address Table",
    "explanation": "A switch dynamically populates a Content Addressable Memory (CAM) table that maps MAC addresses to their corresponding physical switch ports.",
    "hint": "MAC address table / CAM table."
  },
  {
    "id": 3,
    "question": "How does a switch learn the association between a MAC address and a physical port?",
    "options": [
      "The network administrator enters every MAC address manually",
      "By inspecting the SOURCE MAC address of every incoming data frame entering a port",
      "By querying a Google server on the internet",
      "By measuring cable resistance"
    ],
    "answer": "By inspecting the SOURCE MAC address of every incoming data frame entering a port",
    "explanation": "When a frame enters Port X, the switch reads its Source MAC address and records that this specific device is reachable on Port X.",
    "hint": "Learns from the Source MAC of incoming frames."
  },
  {
    "id": 4,
    "question": "What does a switch do when it receives a frame destined for a MAC address that is NOT yet in its MAC address table?",
    "options": [
      "It permanently drops the frame",
      "It floods the frame out of all ports except the port on which it was received (Unknown Unicast Flooding)",
      "It shuts down the network",
      "It forwards it to the internet"
    ],
    "answer": "It floods the frame out of all ports except the port on which it was received (Unknown Unicast Flooding)",
    "explanation": "When the destination MAC is unknown, the switch floods the frame out of all other ports so that the intended recipient can receive it and reply.",
    "hint": "Floods out of all other ports."
  },
  {
    "id": 5,
    "question": "How many collision domains exist in an 8-port network switch?",
    "options": [
      "1 collision domain",
      "8 collision domains (one per port)",
      "Zero collision domains",
      "16 collision domains"
    ],
    "answer": "8 collision domains (one per port)",
    "explanation": "Unlike a hub, each port of a switch is an independent, isolated collision domain, completely eliminating cross-port collisions.",
    "hint": "Each port is its own separate collision domain."
  },
  {
    "id": 6,
    "question": "How many broadcast domains exist across all ports of a standard unconfigured 24-port switch?",
    "options": [
      "24 broadcast domains",
      "1 single broadcast domain",
      "Zero broadcast domains",
      "12 broadcast domains"
    ],
    "answer": "1 single broadcast domain",
    "explanation": "By default, all ports on a standard switch belong to a single broadcast domain. A broadcast frame (FF:FF:FF:FF:FF:FF) is flooded to all ports.",
    "hint": "Switches break collision domains, but share a single broadcast domain."
  },
  {
    "id": 7,
    "question": "Why is a switch superior to a hub in terms of bandwidth delivery to connected workstations?",
    "options": [
      "Switches make electricity flow faster",
      "Each switch port receives dedicated line-rate bandwidth (e.g. 100 Mbps or 1 Gbps), whereas hub ports share the total bandwidth",
      "Switches do not require cables",
      "Hubs can only connect 2 computers"
    ],
    "answer": "Each switch port receives dedicated line-rate bandwidth (e.g. 100 Mbps or 1 Gbps), whereas hub ports share the total bandwidth",
    "explanation": "Switches provide dedicated throughput per port via non-blocking switching fabrics, whereas hubs divide total bandwidth among all nodes.",
    "hint": "Dedicated bandwidth per port vs shared bandwidth."
  },
  {
    "id": 8,
    "question": "What transmission mode is enabled when a computer connects to a modern switch, allowing simultaneous transmitting and receiving without collisions?",
    "options": [
      "Full-Duplex Mode",
      "Half-Duplex Mode",
      "Simplex Mode",
      "Multiplex Mode"
    ],
    "answer": "Full-Duplex Mode",
    "explanation": "Full-duplex allows concurrent bidirectional transmission over separate pairs, completely eliminating collisions.",
    "hint": "Full-Duplex."
  },
  {
    "id": 9,
    "question": "What is 'Microsegmentation' in network switching?",
    "options": [
      "Cutting cables into tiny pieces",
      "Isolating each individual network node into its own dedicated collision domain on a switch port",
      "Using microscopic copper wires",
      "Encrypting packets with microchips"
    ],
    "answer": "Isolating each individual network node into its own dedicated collision domain on a switch port",
    "explanation": "Microsegmentation connects each device to its own dedicated switch port, creating isolated collision-free point-to-point links.",
    "hint": "Isolating each node to its own collision-free port."
  },
  {
    "id": 10,
    "question": "What is the difference between Store-and-Forward switching and Cut-Through switching?",
    "options": [
      "Store-and-Forward buffers the entire frame and checks for CRC errors before forwarding; Cut-Through forwards as soon as the destination MAC is read",
      "Store-and-Forward is wireless while Cut-Through is wired",
      "Cut-Through deletes all packets",
      "Store-and-Forward works only with optical fiber"
    ],
    "answer": "Store-and-Forward buffers the entire frame and checks for CRC errors before forwarding; Cut-Through forwards as soon as the destination MAC is read",
    "explanation": "Store-and-Forward validates frame integrity via CRC before forwarding, while Cut-Through minimizes latency by forwarding immediately after reading the 6-byte destination MAC.",
    "hint": "Buffers whole frame vs forwards immediately."
  },
  {
    "id": 11,
    "question": "What happens to entries in a switch's MAC address table if a connected device has been powered off or silent for several minutes?",
    "options": [
      "The switch explodes",
      "The aging timer expires and the switch flushes the inactive MAC entry from its CAM table to free memory",
      "The switch permanently blocks the port",
      "The MAC address is sent to the manufacturer"
    ],
    "answer": "The aging timer expires and the switch flushes the inactive MAC entry from its CAM table to free memory",
    "explanation": "Switches use an aging timer (typically 300 seconds). If no frames arrive from that MAC address within the aging window, the entry is flushed.",
    "hint": "Aging timer flushes stale entries."
  },
  {
    "id": 12,
    "question": "In a CBSE 5-mark networking case study: An educational institution has 120 computers in Block A. Which central device should be installed to interconnect them?",
    "options": [
      "Network Switch (or Switches)",
      "Network Hub",
      "Modem",
      "Coaxial Terminator"
    ],
    "answer": "Network Switch (or Switches)",
    "explanation": "An Ethernet Switch provides dedicated high-speed bandwidth, eliminates collisions, and is the standard industry device for connecting LAN nodes.",
    "hint": "Always recommend a Switch for connecting computers in a building."
  },
  {
    "id": 13,
    "question": "Why does a network switch offer superior data privacy compared to a network hub?",
    "options": [
      "A switch encrypts all files with military passwords",
      "A switch directs unicast packets solely to the intended destination port, preventing other workstations from snooping on the traffic",
      "Switches can only be accessed with a fingerprint",
      "Hubs are illegal in banks"
    ],
    "answer": "A switch directs unicast packets solely to the intended destination port, preventing other workstations from snooping on the traffic",
    "explanation": "By forwarding unicast frames only to the recipient's port, third-party workstations cannot capture frames with packet sniffers.",
    "hint": "Traffic is isolated to the destination port."
  },
  {
    "id": 14,
    "question": "What is a 'Layer-3 Switch' (Multilayer Switch)?",
    "options": [
      "A switch with three power cables",
      "A high-speed switch that combines Layer-2 switching with hardware-based Layer-3 IP routing",
      "A switch that only operates on 3 ports",
      "A switch designed for 3-story buildings"
    ],
    "answer": "A high-speed switch that combines Layer-2 switching with hardware-based Layer-3 IP routing",
    "explanation": "Layer-3 switches perform both standard Layer-2 MAC switching and wire-speed Layer-3 IP routing using specialized ASICs.",
    "hint": "Combines Layer-2 switching and Layer-3 IP routing."
  },
  {
    "id": 15,
    "question": "What protocol runs on switches to prevent disastrous bridging loops in redundant network topologies?",
    "options": [
      "STP (Spanning Tree Protocol, IEEE 802.1D)",
      "FTP",
      "HTTP",
      "SMTP"
    ],
    "answer": "STP (Spanning Tree Protocol, IEEE 802.1D)",
    "explanation": "Spanning Tree Protocol (STP) disables redundant loop paths in switched networks, preventing broadcast storms from melting down the network.",
    "hint": "Spanning Tree Protocol (STP)."
  },
  {
    "id": 16,
    "question": "What is a 'Broadcast Storm' on a switched network?",
    "options": [
      "A thunderstorm that strikes the antenna",
      "A catastrophic loop where broadcast frames endlessly circulate and multiply, consuming 100% of bandwidth and freezing all switches",
      "When a radio station plays too loud",
      "When the switch turns into a router"
    ],
    "answer": "A catastrophic loop where broadcast frames endlessly circulate and multiply, consuming 100% of bandwidth and freezing all switches",
    "explanation": "Without Spanning Tree Protocol, loops in a switched network cause flooded broadcast frames to circulate endlessly, crippling the network.",
    "hint": "Endless circulation and multiplication of broadcast frames."
  },
  {
    "id": 17,
    "question": "What is a 'Managed Switch' compared to an 'Unmanaged Switch'?",
    "options": [
      "A managed switch provides configurable features like VLANs, QoS, port mirroring, and SNMP monitoring through a web/CLI console",
      "A managed switch is carried by hand",
      "An unmanaged switch cannot transmit data",
      "A managed switch runs on diesel"
    ],
    "answer": "A managed switch provides configurable features like VLANs, QoS, port mirroring, and SNMP monitoring through a web/CLI console",
    "explanation": "Managed switches allow network engineers to configure VLANs, prioritize traffic (QoS), and monitor port diagnostics, while unmanaged switches are plug-and-play.",
    "hint": "Configurable features like VLANs and SNMP."
  },
  {
    "id": 18,
    "question": "What virtual networking feature on managed switches allows network administrators to logically segment a single physical switch into multiple isolated broadcast domains?",
    "options": [
      "VLAN (Virtual Local Area Network)",
      "VPN",
      "DNS",
      "URL"
    ],
    "answer": "VLAN (Virtual Local Area Network)",
    "explanation": "VLANs (Virtual LANs) partition switch ports into separate logical broadcast domains, enhancing security and isolating traffic without extra physical cabling.",
    "hint": "Virtual Local Area Network (VLAN)."
  },
  {
    "id": 19,
    "question": "What happens if a switch receives a frame where the Source MAC and Destination MAC are both located on the same physical port?",
    "options": [
      "The switch drops (filters) the frame because the destination already received it on that shared segment",
      "The switch broadcasts it to all other ports",
      "The switch reboots",
      "The switch sends an error email"
    ],
    "answer": "The switch drops (filters) the frame because the destination already received it on that shared segment",
    "explanation": "If the source and destination are on the same port, the switch recognizes that the frame does not need to cross into other ports and filters (drops) it.",
    "hint": "Frame filtering."
  },
  {
    "id": 20,
    "question": "What is 'Port Mirroring' (SPAN) on a managed switch?",
    "options": [
      "Making the switch face a physical mirror",
      "Copying all traffic from specified ports to a dedicated monitoring port for packet analysis and intrusion detection",
      "Turning off half of the ports",
      "Connecting two ports with a mirror cable"
    ],
    "answer": "Copying all traffic from specified ports to a dedicated monitoring port for packet analysis and intrusion detection",
    "explanation": "Port mirroring copies network packets seen on selected ports to a designated monitoring port where a network analyzer (Wireshark) is listening.",
    "hint": "Mirroring packets to a diagnostic analyzer."
  },
  {
    "id": 21,
    "question": "Which of the following describes the difference in collision handling between a Hub and a Switch?",
    "options": [
      "A hub creates a single shared collision domain across all ports; a switch provides a dedicated collision domain for each port",
      "A hub has zero collisions; a switch has frequent collisions",
      "Both devices handle collisions identically",
      "Switches cause collisions on purpose"
    ],
    "answer": "A hub creates a single shared collision domain across all ports; a switch provides a dedicated collision domain for each port",
    "explanation": "Hubs share one collision domain where nodes collide; switches isolate each port so collisions cannot propagate.",
    "hint": "Shared collision domain vs dedicated collision domains."
  },
  {
    "id": 22,
    "question": "What type of memory chip in an intelligent switch enables ultra-fast parallel lookup of MAC addresses in hardware?",
    "options": [
      "CAM (Content Addressable Memory)",
      "Magnetic tape",
      "Floppy disk",
      "DDR1 RAM"
    ],
    "answer": "CAM (Content Addressable Memory)",
    "explanation": "CAM (Content Addressable Memory) compares input search data against all stored MAC entries simultaneously in a single clock cycle.",
    "hint": "Content Addressable Memory (CAM)."
  },
  {
    "id": 23,
    "question": "True or False: In a switch operating in Full-Duplex mode, CSMA/CD collision detection is completely disabled because collisions are physically impossible.",
    "options": [
      "True",
      "False",
      "Only on Sundays",
      "Only for Apple computers"
    ],
    "answer": "True",
    "explanation": "In full-duplex Ethernet over dedicated switch ports, separate wire pairs are used for transmit and receive, making collisions physically impossible and rendering CSMA/CD unnecessary.",
    "hint": "Full-duplex eliminates collisions entirely."
  },
  {
    "id": 24,
    "question": "What is the typical port density of modern enterprise access switches?",
    "options": [
      "24 to 48 ports",
      "Only 2 ports",
      "1000 ports on a single box",
      "1 port"
    ],
    "answer": "24 to 48 ports",
    "explanation": "Standard enterprise rackmount Ethernet switches commonly feature 24 or 48 Gigabit/10G RJ-45 ports with 2-4 optical SFP+ uplink ports.",
    "hint": "Standard rackmount switch has 24 or 48 ports."
  },
  {
    "id": 25,
    "question": "In a CBSE 2-mark question: 'Why is a Switch called an intelligent hub?' What is the best answer?",
    "options": [
      "Because a switch can learn MAC addresses and forward frames only to the intended destination port instead of broadcasting blindly to all ports",
      "Because a switch is powered by artificial intelligence",
      "Because a switch can connect to the internet without a router",
      "Because a switch works without electricity"
    ],
    "answer": "Because a switch can learn MAC addresses and forward frames only to the intended destination port instead of broadcasting blindly to all ports",
    "explanation": "A switch is called an intelligent hub because it learns MAC addresses dynamically and directs packets only to their target port, avoiding blind broadcasts.",
    "hint": "Learns MAC addresses and unicasts to destination."
  }
];

export default questions;
