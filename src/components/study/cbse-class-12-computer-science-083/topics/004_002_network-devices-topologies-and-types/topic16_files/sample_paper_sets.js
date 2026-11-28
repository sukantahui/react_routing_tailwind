export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Network Devices (Hub vs Switch vs Router) & MAC vs IP",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which network device is known as an intelligent multiport device that forwards packets based on destination MAC addresses?\n(a) Hub\n(b) Switch\n(c) Repeater\n(d) Modem",
            "solution": "(b) Switch. A switch maintains a MAC address table to forward frames directly to the intended recipient port.",
            "markingScheme": "1 Mark for (b) Switch."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the physical bit length of a standard MAC (Media Access Control) address?\n(a) 32 bits\n(b) 48 bits (6 bytes)\n(c) 64 bits\n(d) 128 bits",
            "solution": "(b) 48 bits (6 bytes), expressed as 12 hexadecimal digits (e.g., 00:1A:2B:3C:4D:5E).",
            "markingScheme": "1 Mark for (b) 48 bits."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which device connects two completely dissimilar network architectures using different protocol suites?\n(a) Router\n(b) Gateway\n(c) Bridge\n(d) Repeater",
            "solution": "(b) Gateway. A gateway translates data between differing protocol architectures.",
            "markingScheme": "1 Mark for (b) Gateway."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a Hub operates at the Physical layer (Layer 1) or Data Link layer (Layer 2).",
            "solution": "Physical layer (Layer 1). A hub blindly broadcasts electrical signals on all ports.",
            "markingScheme": "1 Mark for Physical layer / Layer 1."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between a MAC Address and an IP Address.",
            "solution": "MAC Address: Permanent physical hardware identifier burned into the NIC by manufacturer (48 bits, e.g. 00:1A:2B:3C:4D:5E). IP Address: Logical software identifier assigned dynamically or statically by network administrator to route packets globally (32 bits in IPv4, e.g. 192.168.1.1).",
            "markingScheme": "1 Mark for MAC (physical, 48 bits), 1 Mark for IP (logical, 32/128 bits)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is a Switch preferred over a Hub in modern Ethernet local area networks?",
            "solution": "A Hub broadcasts every incoming frame to all connected ports, causing frequent network collisions and wasting bandwidth. A Switch learns MAC addresses and unicasts frames directly to the specific destination port, providing dedicated bandwidth and isolating collision domains.",
            "markingScheme": "1 Mark for hub broadcasts vs switch unicasts, 1 Mark for collision domain isolation and dedicated bandwidth."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the roles of Router, Gateway, and Bridge in computer networks.",
            "solution": "1. Router: Operates at Network layer (Layer 3), routes data packets between different IP subnets using routing tables, and selects the optimal path.\n2. Gateway: Translates protocols between completely disparate network architectures (e.g. converting between proprietary mainframe protocols and TCP/IP).\n3. Bridge: Connects two homogeneous LAN segments at Data Link layer (Layer 2), filtering traffic based on MAC addresses to reduce segment congestion.",
            "markingScheme": "1 Mark for Router, 1 Mark for Gateway, 1 Mark for Bridge."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain how a switch dynamically learns MAC addresses to populate its switching table.",
            "solution": "1. When a frame enters a switch port, the switch inspects the source MAC address and records the mapping (Source MAC -> Incoming Port) in its MAC table.\n2. If the destination MAC is in the table, the switch forwards the frame only to that specific port.\n3. If destination MAC is unknown, it floods the frame to all ports except the source port (flooding) until the destination responds.",
            "markingScheme": "1 Mark for learning source MAC -> port, 1 Mark for unicast forwarding on known MAC, 1 Mark for flooding on unknown destination."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A multi-storey school building has 4 computer laboratories located on different floors:\n- Lab A (Floor 1): 40 PCs\n- Lab B (Floor 2): 40 PCs\n- Lab C (Floor 3): 35 PCs\n- Server Room (Ground Floor): Central School Server & Internet Gateway\n(a) Which device should be installed inside each computer lab to interconnect the PCs locally?\n(b) Which device should connect all the lab switches to the central school server and the external ISP broadband fiber?\n(c) If the school introduces a proxy server that translates student browsing requests to filter blocked websites, what role is the proxy server playing?",
            "solution": "(a) Inside each lab: A 48-port Managed Switch (Fast Ethernet / Gigabit Switch) to provide dedicated full-duplex bandwidth to each PC.\n(b) Connecting lab switches to server and ISP: A Router (or Core Layer 3 Switch) to route traffic between different VLANs/subnets and handle NAT/routing to the external ISP.\n(c) Proxy Server Role: Acts as an Application-level Gateway / Content-Filtering Firewall that intercepts web requests, checks permissions against access policies, caches frequently visited pages, and filters restricted URLs.",
            "markingScheme": "2 Marks for (a) Switch with lab justification, 2 Marks for (b) Router/Layer-3 Switch for inter-subnet & ISP routing, 2 Marks for (c) Application Gateway / Firewall role."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Network Topologies (Star, Bus, Ring, Mesh, Tree)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which topology connects every device to a central hub or switch?\n(a) Bus\n(b) Star\n(c) Ring\n(d) Mesh",
            "solution": "(b) Star.",
            "markingScheme": "1 Mark for (b) Star."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "How many physical links are required to connect n nodes in a fully connected Mesh topology?\n(a) n - 1\n(b) n\n(c) n*(n-1)/2\n(d) 2*n",
            "solution": "(c) n*(n-1)/2.",
            "markingScheme": "1 Mark for (c) n*(n-1)/2."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What device is required at both ends of a linear Bus topology backbone to absorb reflected signals?\n(a) Terminator\n(b) Repeater\n(c) Router\n(d) Bridge",
            "solution": "(a) Terminator.",
            "markingScheme": "1 Mark for (a) Terminator."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What happens in a Star topology if the central switch fails?",
            "solution": "The entire network collapses and all communication between connected devices stops.",
            "markingScheme": "1 Mark for entire network collapses / single point of failure."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "State two advantages and one disadvantage of Star Topology.",
            "solution": "Advantages:\n1. Easy fault identification and isolation (if one node cable fails, only that node goes down; rest of network remains intact).\n2. Easy to add or remove nodes without disrupting the rest of the network.\nDisadvantage: Central switch is a single point of failure; requires more cabling than bus topology.",
            "markingScheme": "1 Mark for advantages, 1 Mark for single point of failure disadvantage."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is a Tree topology described as a hierarchical combination of Star and Bus topologies?",
            "solution": "In a tree topology, multiple star networks (groups of computers connected to individual switches) are interconnected along a main linear bus backbone cable, forming a branching hierarchical tree structure.",
            "markingScheme": "1 Mark for star groups connected along a backbone, 1 Mark for branching hierarchical structure."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A company wants to connect 6 critical banking database servers with 100% redundancy using a fully connected Mesh topology.\n(a) Calculate the number of dedicated communication links required.\n(b) If one communication link gets severed, what happens to the network?\n(c) Why is mesh topology rarely used for general office LANs with hundreds of computers?",
            "solution": "(a) Number of links = n*(n-1)/2 = 6*(5)/2 = 15 dedicated links.\n(b) If one link is severed, data simply routes through alternate redundant paths with zero network downtime.\n(c) For hundreds of computers, link count explodes quadratically (e.g., 100 nodes = 4,950 links), making cabling cost, port availability, and installation complexity prohibitively expensive.",
            "markingScheme": "1 Mark for 15 links calculation, 1 Mark for zero downtime / alternate routing, 1 Mark for quadratic cost explosion in large LANs."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Compare Bus, Star, and Ring topologies on:\n1. Ease of Troubleshooting\n2. Cable Length Requirement\n3. Impact of a Single Cable Break",
            "solution": "1. Bus: Hard to troubleshoot; lowest cable requirement; a break in backbone brings down entire network.\n2. Star: Very easy to troubleshoot; moderate-high cable requirement; cable break affects only that single node.\n3. Ring: Moderate troubleshooting (token passing); low-moderate cable; single break in unidirectional ring halts network.",
            "markingScheme": "1 Mark per comparison parameter across all three topologies."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A university is designing the network layout for its engineering campus consisting of 5 departments: Computer Science, Mechanical, Civil, Electrical, and Admin.\n(a) Suggest the most suitable network topology to connect all computers within each individual department lab. Justify.\n(b) Suggest the most suitable topology to interconnect the 5 departmental buildings to the Central Admin Server Room.\n(c) Draw or describe the overall hierarchical layout.",
            "solution": "(a) Intra-Department Lab Topology: Star Topology.\n    Justification: High reliability; easy fault isolation; if a student's cable is damaged, only that machine disconnects without halting the practical lab exam.\n(b) Inter-Department Building Topology: Star Topology (or Tree Topology) with Admin building as the central root hub.\n    Justification: Admin building houses the core server and ISP gateway; star/tree layout provides high throughput and allows direct high-speed optical fiber links from each department to the core.\n(c) Description of Layout: Tree / Extended Star layout. Each department forms an independent Star topology with its local departmental switch. All 5 departmental switches run backbone fiber optic cables converging onto the central core switch/router in the Admin Server Room.",
            "markingScheme": "2 Marks for (a) intra-building Star with justification, 2 Marks for (b) inter-building Star/Tree with justification, 2 Marks for (c) hierarchical layout description."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Network Types (PAN, LAN, MAN, WAN) & Geographics",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What type of network is formed when connecting a smartphone to a smartwatch via Bluetooth?\n(a) LAN\n(b) PAN\n(c) MAN\n(d) WAN",
            "solution": "(b) PAN (Personal Area Network).",
            "markingScheme": "1 Mark for (b) PAN."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the typical geographic span of a Metropolitan Area Network (MAN)?\n(a) Within 10 meters\n(b) Within a single room\n(c) Across an entire town or city (5 to 50 km)\n(d) Intercontinental",
            "solution": "(c) Across an entire town or city (5 to 50 km).",
            "markingScheme": "1 Mark for (c)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which of the following is the largest and most famous example of a Wide Area Network (WAN)?\n(a) Ethernet LAN\n(b) The Internet\n(c) Bluetooth piconet\n(d) College intranet",
            "solution": "(b) The Internet.",
            "markingScheme": "1 Mark for (b) The Internet."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a Local Area Network (LAN) is typically owned by a single organization.",
            "solution": "Yes. LANs are privately owned and administered by a single entity (school, company, home).",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between LAN and WAN on:\n1. Geographical Area\n2. Data Transfer Speed",
            "solution": "1. Geographical Area: LAN is restricted to a small local area (room, building, campus < 1 km); WAN spans large geographic distances (cities, countries, continents).\n2. Speed: LAN provides ultra-high speeds (100 Mbps to 10 Gbps) with low error rates; WAN typically has lower and more variable speeds with higher latency.",
            "markingScheme": "1 Mark for area difference, 1 Mark for speed/latency difference."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Give two real-life examples of a MAN (Metropolitan Area Network).",
            "solution": "1. Cable Television (CATV) distribution network across an entire city.\n2. A municipal corporation's interconnected traffic camera and monitoring network covering city streets.",
            "markingScheme": "1 Mark per valid MAN example."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Categorize the following networks into PAN, LAN, MAN, or WAN:\n1. Connecting wireless earphones to a laptop on your study table\n2. The network connecting all branches of State Bank of India across the country\n3. The network connecting computers within Delhi Public School campus\n4. City-wide cable television network in Barrackpore\n5. Connecting two mobile phones using ShareIt/Nearby Share across 2 meters\n6. The international ATM cash withdrawal network",
            "solution": "1. Earphones to laptop: PAN\n2. SBI nationwide network: WAN\n3. DPS school campus: LAN\n4. City cable network in Barrackpore: MAN\n5. Nearby Share between mobile phones: PAN\n6. International ATM network: WAN",
            "markingScheme": "0.5 Marks per correct categorization."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why error rates in a WAN are generally higher than in a LAN.",
            "solution": "1. Longer Distance: Signals traverse thousands of kilometers of heterogeneous physical media and repeaters, accumulating attenuation and noise.\n2. Shared Public Infrastructure: WANs utilize third-party telecom circuits and public switching equipment subject to external interference and route congestion.\n3. In contrast, LANs use short, shielded, privately managed copper/fiber cables in controlled indoor environments.",
            "markingScheme": "1 Mark for distance and attenuation accumulation, 1 Mark for shared public infrastructure noise, 1 Mark for LAN controlled environment contrast."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A national e-commerce corporation has:\n1. A Corporate Headquarters in Mumbai (1,200 employees across 5 floors)\n2. 5 Regional Warehouses located in Kolkata, Delhi, Chennai, Bengaluru, and Hyderabad\n3. Delivery executives using mobile barcode scanners to scan parcels at doorsteps\n(a) Identify the network types (PAN, LAN, MAN, WAN) operating at:\n    - The Corporate HQ building\n    - Interconnecting the 5 Regional Warehouses with the Corporate HQ\n    - Between the delivery executive's smartphone and handheld barcode scanner\n(b) Which device in the Corporate HQ connects the internal office network to the external WAN?\n(c) Suggest one security measure to protect corporate data traversing the public WAN.",
            "solution": "(a) Network types:\n    - Corporate HQ: LAN (Local Area Network)\n    - Interconnecting warehouses to HQ: WAN (Wide Area Network)\n    - Barcode scanner to smartphone: PAN (Personal Area Network via Bluetooth)\n(b) Device connecting LAN to WAN: An Enterprise Edge Router (or Firewall Router / Gateway).\n(c) Security measure: Virtual Private Network (VPN) using IPsec/SSL encryption to create a secure encrypted tunnel across the public Internet.",
            "markingScheme": "3 Marks for (a) (1 Mark per network type), 1.5 Marks for (b) Router/Gateway, 1.5 Marks for (c) VPN / Encryption."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Network Hardware Interconnection & Physical Layer Devices",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is an RJ-45 connector used for?\n(a) Terminating optical fiber cables\n(b) Terminating twisted pair cables in Ethernet networks\n(c) Connecting analog landline phones\n(d) Power supply",
            "solution": "(b) Terminating twisted pair cables in Ethernet networks.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is a collision domain?",
            "solution": "A network segment where data packets can collide with one another when sent simultaneously over a shared medium.",
            "markingScheme": "1 Mark for network segment where simultaneous packets can collide."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "How many collision domains does an 8-port Ethernet switch have?\n(a) 1\n(b) 8\n(c) 0\n(d) 16",
            "solution": "(b) 8. Each port on a switch is an independent, isolated collision domain.",
            "markingScheme": "1 Mark for (b) 8."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the function of a Wireless Access Point (WAP)?",
            "solution": "Connects Wi-Fi enabled wireless devices to a wired Ethernet local area network.",
            "markingScheme": "1 Mark for connecting wireless devices to a wired network."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between an Active Hub and a Passive Hub.",
            "solution": "Passive Hub: Simply connects cables physically and passes electrical signals without any amplification or regeneration; requires no electrical power. Active Hub: Cleans, amplifies, and regenerates weakened signals before broadcasting; requires an external electrical power supply.",
            "markingScheme": "1 Mark for Passive (no power, physical connector), 1 Mark for Active (powered, regenerates signals)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why does an Ethernet switch not broadcast unicast packets to all ports once it has learned MAC addresses?",
            "solution": "The switch inspects the destination MAC in incoming frames, matches it against its internal MAC address table, and forwards the frame exclusively out of the specific port mapped to that MAC address.",
            "markingScheme": "1 Mark for destination MAC table lookup, 1 Mark for dedicated port forwarding."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A network technician replaces an old 16-port hub with a new 16-port switch in a design office.\n(a) How does this change affect network performance?\n(b) How many broadcast domains were there with the hub, and how many are there with the switch?\n(c) How many collision domains are created after installing the switch?",
            "solution": "(a) Network performance improves drastically because collisions are eliminated and each connected PC receives dedicated bandwidth instead of sharing bandwidth.\n(b) Broadcast domains: Exactly 1 broadcast domain with the hub, and still 1 broadcast domain with the switch (standard unmanaged switches do not break broadcast domains).\n(c) Collision domains: 16 separate collision domains (one for each switch port).",
            "markingScheme": "1 Mark for (a) performance improvement, 1 Mark for (b) 1 broadcast domain for both, 1 Mark for (c) 16 collision domains."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the structure of a MAC address (OUI and NIC specific parts).",
            "solution": "A MAC address is a 48-bit (6-byte) identifier formatted as 12 hex digits (e.g., 00:1A:2B:3C:4D:5E).\n1. First 24 bits (3 bytes): Organizationally Unique Identifier (OUI) assigned to the manufacturer by IEEE.\n2. Last 24 bits (3 bytes): Network Interface Controller (NIC) specific serial number assigned uniquely by the manufacturer.",
            "markingScheme": "1 Mark for 48 bits / 6 bytes hex format, 1 Mark for OUI (first 24 bits), 1 Mark for manufacturer device identifier (last 24 bits)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A bank branch has two departments: Cash Counters and Loan Verification.\n- Cash Counters have 10 desktop terminals.\n- Loan Verification has 15 desktop terminals.\n- Server Room has 1 Branch Database Server and 1 Leased Line Router.\n(a) Which device should connect the terminals within each department?\n(b) If the network administrator wishes to isolate the Cash Counters traffic from Loan Verification so that broadcast packets do not cross between them, what feature of an advanced switch should be used?\n(c) Which device is responsible for forwarding packets from the Branch Database Server to the Head Office over the leased line?",
            "solution": "(a) Terminals within each department should be connected using a 16-port or 24-port Fast Ethernet / Gigabit Switch.\n(b) To isolate departments into separate broadcast domains, the administrator should configure Virtual Local Area Networks (VLANs) on a Managed Switch.\n(c) The Leased Line Router is responsible for routing packets from the Branch Database Server over the telecommunication leased line to the Head Office.",
            "markingScheme": "2 Marks for (a) Switch, 2 Marks for (b) VLAN on managed switch, 2 Marks for (c) Router."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Topology Fault Tolerance, Cable Math & Device Matching",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "In which topology does data circulate unidirectionally using an electronic token?\n(a) Star\n(b) Bus\n(c) Ring\n(d) Tree",
            "solution": "(c) Ring (e.g. Token Ring).",
            "markingScheme": "1 Mark for (c) Ring."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the primary drawback of a linear Bus topology?\n(a) Difficult to install\n(b) Single point of failure in the backbone cable halts the entire network\n(c) High cable requirement\n(d) Requires expensive switches",
            "solution": "(b) Single point of failure in the backbone cable halts the entire network.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which device operates at Layer 3 (Network Layer) of the OSI model?\n(a) Hub\n(b) Switch\n(c) Router\n(d) Repeater",
            "solution": "(c) Router.",
            "markingScheme": "1 Mark for (c) Router."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the minimum number of nodes required to form a network.",
            "solution": "2 nodes (computers/devices) connected by a communication medium.",
            "markingScheme": "1 Mark for 2 nodes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Why does a Mesh topology offer the highest fault tolerance among all topologies?",
            "solution": "Because every node has a dedicated point-to-point physical link to every other node. If one link fails, numerous alternate redundant paths exist, ensuring zero traffic disruption.",
            "markingScheme": "1 Mark for dedicated point-to-point links, 1 Mark for alternate redundant paths preventing disruption."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Calculate the total number of cables needed to connect 8 computers in:\n1. Star Topology\n2. Mesh Topology",
            "solution": "1. Star Topology: Exactly n cables = 8 cables (connecting each computer to central switch).\n2. Mesh Topology: n*(n-1)/2 = 8*(7)/2 = 28 cables.",
            "markingScheme": "1 Mark for Star (8 cables), 1 Mark for Mesh (28 cables)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Match the network device with its primary operational characteristic:\nDevices: 1. Repeater, 2. Switch, 3. Router\nCharacteristics: (A) Regenerates weakened electrical signals, (B) Routes packets across different IP subnets, (C) Forwards frames based on MAC address table",
            "solution": "1. Repeater matches (A) Regenerates weakened electrical signals.\n2. Switch matches (C) Forwards frames based on MAC address table.\n3. Router matches (B) Routes packets across different IP subnets.",
            "markingScheme": "1 Mark per correct match."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the difference between Full-Duplex and Half-Duplex transmission modes in network switches.",
            "solution": "Half-Duplex: Data can travel in both directions, but only in one direction at a time (like walkie-talkies). Devices must wait to avoid collisions.\nFull-Duplex: Data can travel in both directions simultaneously (like a telephone conversation). Modern switches use separate transmit and receive wire pairs, doubling throughput and eliminating collisions.",
            "markingScheme": "1.5 Marks for Half-Duplex definition and turn-taking, 1.5 Marks for Full-Duplex simultaneous transmission and collision elimination."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "An IT institute has 3 classroom wings arranged around a central courtyard:\n- Wing A: 30 computers\n- Wing B: 30 computers\n- Wing C: 25 computers\n- Server Room is in Wing A\nDistances: Wing A to Wing B = 45m; Wing B to Wing C = 55m; Wing A to Wing C = 60m.\n(a) Propose the most cost-effective and reliable cable layout to interconnect the three wings to the Server Room.\n(b) Suggest the topology for connecting computers within Wing B.\n(c) Specify the networking hardware devices needed inside Wing B and in the Server Room.",
            "solution": "(a) Recommended Cable Layout: Star Topology connecting Wing B (45m) and Wing C (60m) directly to Server Room in Wing A.\n    Total cable length = 45m + 60m = 105m. This provides direct high-speed links to the server room and avoids dependency between wings.\n(b) Intra-wing Topology for Wing B: Star Topology using Cat6 UTP cabling to a central departmental switch.\n(c) Hardware Devices Needed:\n    - Inside Wing B: One 32-port or 48-port Fast Ethernet / Gigabit Switch.\n    - In Server Room (Wing A): Core Switch / Distribution Switch, Main File Server, and Gateway Router with Firewall.",
            "markingScheme": "2 Marks for (a) layout with distance calculation (105m), 2 Marks for (b) Star topology in Wing B, 2 Marks for (c) hardware list."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Network Device Protocols, Bridges & Wireless APs",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following devices does NOT forward broadcast frames to other networks by default?\n(a) Hub\n(b) Switch\n(c) Router\n(d) Repeater",
            "solution": "(c) Router. Routers do not forward broadcast frames; they break broadcast domains.",
            "markingScheme": "1 Mark for (c) Router."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is an SSID in wireless networking?\n(a) System Security ID\n(b) Service Set Identifier (the public name of a Wi-Fi network)\n(c) Standard Serial Interface Device\n(d) Signal Strength Indicator",
            "solution": "(b) Service Set Identifier (the public name of a Wi-Fi network).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What hardware component must be installed inside a PC to enable network cable connection?\n(a) GPU\n(b) NIC (Network Interface Card)\n(c) Sound card\n(d) RAM",
            "solution": "(b) NIC (Network Interface Card).",
            "markingScheme": "1 Mark for (b) NIC."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a bridge connects two networks using the same protocol or completely different protocols.",
            "solution": "Same protocol (homogeneous networks, e.g. Ethernet to Ethernet).",
            "markingScheme": "1 Mark for same protocol."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the role of a Bridge in reducing network congestion on a busy Ethernet segment.",
            "solution": "A bridge inspects the destination MAC address of each frame. If sender and receiver are on the same local segment, the bridge blocks the frame from crossing over, keeping local traffic confined and freeing bandwidth on other segments.",
            "markingScheme": "1 Mark for destination MAC inspection, 1 Mark for filtering local frames from crossing."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is a Router called a 'Default Gateway' for computers in a local area network?",
            "solution": "When a computer wants to send data to an IP address outside its local subnet, it cannot deliver the packet directly. It forwards the packet to the router's local IP address (the default gateway), which routes it towards the destination network.",
            "markingScheme": "1 Mark for sending packets destined outside local subnet, 1 Mark for router forwards towards external networks."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Differentiate between Unicast, Multicast, and Broadcast network transmissions with examples.",
            "solution": "1. Unicast: One-to-one transmission from single sender to single recipient (e.g., viewing a web page via HTTP).\n2. Multicast: One-to-many transmission delivered only to an interested group of subscribers (e.g., live video streaming to subscribed viewers).\n3. Broadcast: One-to-all transmission sent to every device on the local network segment (e.g., ARP request).",
            "markingScheme": "1 Mark per transmission type with definition and example."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the operation of ARP (Address Resolution Protocol) and why it is essential.",
            "solution": "ARP resolves a known logical IP address into its corresponding physical MAC address on the local network.\n1. Sender broadcasts an ARP Request: 'Who has IP 192.168.1.5? Send your MAC'.\n2. The target machine replies with a unicast ARP Reply containing its MAC address.\n3. The sender caches this in its ARP table to encapsulate future Ethernet frames.",
            "markingScheme": "1 Mark for IP to MAC resolution, 1 Mark for ARP request broadcast, 1 Mark for ARP reply unicast."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A company operates an office across two floors:\n- Floor 1: Accounts Department (20 PCs, 1 Network Printer)\n- Floor 2: Marketing Department (25 Laptops using Wi-Fi)\n(a) Which device connects the wired desktop computers on Floor 1?\n(b) Which device should be installed on Floor 2 to allow marketing laptops to connect wirelessly?\n(c) Which device should connect Floor 1 switch, Floor 2 access point, and the corporate fiber internet connection?\n(d) What security measure should be configured on the Floor 2 wireless network to prevent unauthorized access?",
            "solution": "(a) Floor 1 wired network: A 24-port Managed Ethernet Switch.\n(b) Floor 2 wireless network: A Wireless Access Point (WAP) supporting IEEE 802.11ax (Wi-Fi 6).\n(c) Interconnecting Floor 1, Floor 2, and ISP: A Multi-port Gateway Router with integrated firewall.\n(d) Wireless security measure: WPA3-Enterprise (or WPA3-Personal) encryption with strong alphanumeric passphrase and 802.1X user authentication.",
            "markingScheme": "1.5 Marks for (a) Switch, 1.5 Marks for (b) WAP, 1.5 Marks for (c) Router, 1.5 Marks for (d) WPA3 encryption."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Hybrid Topologies, Redundancy & High Availability",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is a Hybrid Topology?\n(a) A network topology that combines two or more different standard topologies\n(b) A network that operates without cables\n(c) A topology with only 2 computers\n(d) A topology using analog signals",
            "solution": "(a) A network topology that combines two or more different standard topologies (e.g. Star-Bus, Star-Ring).",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which topology provides multiple redundant paths between nodes?\n(a) Bus\n(b) Star\n(c) Mesh\n(d) Ring",
            "solution": "(c) Mesh.",
            "markingScheme": "1 Mark for (c) Mesh."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What protocol prevents switching loops in networks with redundant Ethernet links?\n(a) STP (Spanning Tree Protocol)\n(b) HTTP\n(c) FTP\n(d) SMTP",
            "solution": "(a) STP (Spanning Tree Protocol).",
            "markingScheme": "1 Mark for (a) STP."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a partial mesh topology has fewer links than a full mesh topology.",
            "solution": "Yes. Partial mesh connects only critical nodes redundantly, reducing overall cabling cost.",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain what happens when a switching loop occurs in an Ethernet network.",
            "solution": "Without loop prevention (STP), broadcast frames circulate indefinitely around redundant links, multiplying exponentially. This creates a broadcast storm that overwhelms switch CPUs and crashes the network.",
            "markingScheme": "1 Mark for broadcast frames circulating indefinitely, 1 Mark for broadcast storm crashing network."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Differentiate between Full Mesh and Partial Mesh topologies.",
            "solution": "Full Mesh: Every node has a direct point-to-point link to every other node (n*(n-1)/2 links); maximum redundancy at highest cost. Partial Mesh: Only high-traffic and mission-critical nodes have redundant connections; other nodes connect to only one or two nodes, balancing reliability and cost.",
            "markingScheme": "1 Mark for Full Mesh (every node connected), 1 Mark for Partial Mesh (selective redundancy)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A data center connects 10 core storage clusters. Calculate:\n1. Number of links in Full Mesh topology\n2. Number of links in Star topology\n3. Number of links saved by choosing Star over Full Mesh",
            "solution": "1. Full Mesh: n*(n-1)/2 = 10*(9)/2 = 45 links.\n2. Star Topology: Exactly n = 10 links.\n3. Links saved = 45 - 10 = 35 links saved.",
            "markingScheme": "1 Mark for 45 links, 1 Mark for 10 links, 1 Mark for 35 links saved."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the structure of a Star-Bus Hybrid Topology with a diagrammatic description.",
            "solution": "In a Star-Bus topology:\n1. Individual departments or rooms have computers connected in a Star topology to a departmental switch.\n2. Each departmental switch is connected to a high-speed linear backbone cable (Bus topology).\n3. If a computer in a star fails, only that computer goes down. If a departmental switch fails, only that department is disconnected while the backbone remains functional.",
            "markingScheme": "1.5 Marks for star clusters connected to bus backbone description, 1.5 Marks for failure resilience analysis."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A stock exchange operates a financial trading network where downtime costs millions per second.\n(a) Which topology must be chosen for connecting the trading server nodes? Justify.\n(b) Why would a simple Bus or Star topology be rejected for core stock trading servers?\n(c) Suggest two hardware redundancy strategies (e.g. dual NICs, redundant power supplies) implemented in high-availability financial networks.",
            "solution": "(a) Recommended Topology: Full Mesh (or Dual-Ring / Redundant Core-Mesh) topology.\n    Justification: Provides 100% path redundancy and instantaneous sub-millisecond failover. If any link or switch fails, transactions seamlessly route through backup links without dropped orders.\n(b) Why Bus or Star is rejected:\n    - Bus has a single cable backbone; any physical damage crashes the entire exchange.\n    - Star has a single central switch; if the switch fails, all connected trading terminals go offline.\n(c) Hardware Redundancy Strategies:\n    1. Dual Network Interface Cards (NIC teaming / bonding) with active-standby or active-active links connected to two physically distinct switches.\n    2. Dual hot-swappable power supplies connected to separate uninterruptible power supply (UPS) circuits.",
            "markingScheme": "2 Marks for (a) Mesh topology with financial justification, 2 Marks for (b) rejecting Bus/Star single point of failure, 2 Marks for (c) two hardware redundancy strategies."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Network Interface Cards (NIC), Modems & Repeaters",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is another common name for a Network Interface Card (NIC)?\n(a) Ethernet Adapter / LAN Card\n(b) Display adapter\n(c) Sound card\n(d) RAID controller",
            "solution": "(a) Ethernet Adapter / LAN Card.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does the word MODEM stand for?\n(a) Modern Electronic Machine\n(b) Modulator-Demodulator\n(c) Modular Data Emitter\n(d) Multi-Output Device",
            "solution": "(b) Modulator-Demodulator.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Why can't an analog telephone line carry raw digital binary pulses directly without a modem?\n(a) Telephone lines are designed to carry voice frequencies (300 Hz - 3400 Hz) as continuous analog waves\n(b) Digital signals are too slow\n(c) Telephone wires have no copper\n(d) Telephone exchanges only support fiber",
            "solution": "(a) Telephone lines are designed to carry voice frequencies (300 Hz - 3400 Hz) as continuous analog waves.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Does a Repeater examine the destination IP or MAC address of a packet?",
            "solution": "No. A repeater is a Layer 1 Physical device; it operates purely on electrical/optical waveforms and does not understand packets, frames, or addresses.",
            "markingScheme": "1 Mark for No (Layer 1 device; ignores addresses)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain how modulation differs from demodulation.",
            "solution": "Modulation: Converting outgoing digital binary signals (0s and 1s) from a computer into an analog wave suitable for transmission over telephone/coaxial cables.\nDemodulation: Converting incoming analog waves received from the cable back into digital bits (0s and 1s) for the computer.",
            "markingScheme": "1 Mark for Modulation (digital to analog), 1 Mark for Demodulation (analog to digital)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "When is a Repeater strictly required in a UTP network?",
            "solution": "When the cable length between two network devices (e.g. PC and switch) exceeds the maximum transmission distance limit of 100 meters, a repeater is required to regenerate weakened signals.",
            "markingScheme": "1 Mark for distance exceeding 100m, 1 Mark for signal regeneration."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Identify the device described in each case:\n1. A device that connects multiple computers in a star topology, broadcasting incoming packets to every port.\n2. A device that receives weak signals, regenerates the digital bit pattern at full strength, and retransmits it.\n3. A device that connects two LANs using the same protocol and filters traffic based on MAC addresses.",
            "solution": "1. Hub\n2. Repeater\n3. Bridge",
            "markingScheme": "1 Mark per correctly identified device."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Can two devices on the same local network share the identical MAC address? Explain the consequence.",
            "solution": "No. MAC addresses must be globally unique. If two devices share the same MAC address, a MAC address conflict occurs: the switch's MAC table becomes corrupted (MAC flapping), causing packets to be misrouted, intermittent connection drops, and communication failure for both devices.",
            "markingScheme": "1.5 Marks for explanation that MAC must be unique, 1.5 Marks for MAC flapping / switch table corruption."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A residential complex wants to set up high-speed broadband internet across 12 residential towers.\n- Each tower has 20 flats.\n- The central ISP fiber optic terminal is located at the security gatehouse.\n- Distance from gatehouse to Tower 1 is 150 meters.\n(a) Why cannot standard UTP copper cable run directly from the gatehouse to Tower 1?\n(b) Suggest two alternative solutions to connect the gatehouse to Tower 1.\n(c) What device should be installed in the basement of each residential tower to distribute wired internet to the 20 flats?",
            "solution": "(a) Standard UTP cable has a strict physical distance limit of 100 meters. Over 150 meters, signal attenuation causes complete packet loss and connection failure.\n(b) Two alternative solutions:\n    1. Lay an Optical Fiber Cable from the gatehouse to Tower 1 (supports multi-kilometer runs easily with zero signal degradation).\n    2. Install an active Ethernet Repeater / Extender switch at the 75-80 meter midpoint along the copper run.\n(c) In the basement of each tower: A 24-port Gigabit Ethernet Switch to distribute dedicated wired connections to the 20 flats.",
            "markingScheme": "2 Marks for (a) 100m UTP limit explanation, 2 Marks for (b) Fiber or midpoint repeater solutions, 2 Marks for (c) 24-port Gigabit Switch."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Layer 2 vs Layer 3 Switching & Collision vs Broadcast Domains",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "At which layer of the OSI model does a standard Layer 2 switch operate?\n(a) Physical Layer\n(b) Data Link Layer\n(c) Network Layer\n(d) Transport Layer",
            "solution": "(b) Data Link Layer.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is a broadcast domain?",
            "solution": "The logical division of a computer network in which all nodes can reach each other by broadcast at the data link layer.",
            "markingScheme": "1 Mark for logical boundary where all nodes receive broadcast frames."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which device breaks both collision domains and broadcast domains?\n(a) Hub\n(b) Repeater\n(c) Bridge\n(d) Router",
            "solution": "(d) Router.",
            "markingScheme": "1 Mark for (d) Router."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a Layer 3 switch can perform IP packet routing between different VLANs.",
            "solution": "Yes. Layer 3 switches combine switch speed with hardware-based IP routing between VLANs.",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "A network consists of 1 Router connected to two 8-port switches. Each switch has 5 PCs connected. Calculate:\n1. Total number of broadcast domains\n2. Total number of collision domains",
            "solution": "1. Broadcast Domains: 2 (Each router interface forms 1 broadcast domain).\n2. Collision Domains: 10 (Each PC connected to a switch port has its own collision domain) + 2 (links between switches and router) = 12 total collision domains (or 10 for PCs).",
            "markingScheme": "1 Mark for 2 broadcast domains, 1 Mark for collision domains calculation."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why does excessive broadcast traffic degrade performance across an entire local area network?",
            "solution": "Every computer connected within the broadcast domain must process the broadcast frame in CPU memory, interrupting active processes and consuming network bandwidth.",
            "markingScheme": "1 Mark for every PC must process frame in CPU, 1 Mark for consuming bandwidth and CPU cycles."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Compare Hub, Switch, and Router in a summary table on:\n1. OSI Layer\n2. Addressing Used (None / MAC / IP)\n3. Collision Domains Created",
            "solution": "1. Hub: Layer 1 (Physical); No addressing; 1 single shared collision domain across all ports.\n2. Switch: Layer 2 (Data Link); MAC addresses; Separate collision domain for each port.\n3. Router: Layer 3 (Network); IP addresses; Separate collision and broadcast domain for each interface.",
            "markingScheme": "1 Mark per device row covering all three columns."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain what happens when an unknown unicast frame reaches a switch port.",
            "solution": "When a switch receives a frame whose destination MAC address is not present in its MAC table:\n1. It treats the frame as an unknown unicast.\n2. It floods the frame out of every port except the port on which it was received.\n3. When the intended recipient replies, the switch records that device's port, stopping future flooding.",
            "markingScheme": "1 Mark for unknown MAC destination, 1.5 Marks for flooding out all other ports, 0.5 Mark for learning and recording port upon reply."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A growing college campus with 500 computers is experiencing severe network lag due to broadcast storms caused by student file sharing.\n(a) Explain why replacing older 100 Mbps switches with faster 1 Gbps switches will NOT solve the broadcast storm problem.\n(b) Suggest the proper architectural network solution to partition the network into smaller broadcast domains.\n(c) Name the device and technology required to route traffic securely between these partitioned segments.",
            "solution": "(a) Faster switches (1 Gbps) merely transmit frames at higher bit rates. Since standard switches do not block broadcast frames, all 500 computers remain in a single broadcast domain. A broadcast storm will still reach and interrupt every machine simultaneously.\n(b) Architectural Solution: Segment the single flat network into multiple Virtual Local Area Networks (VLANs), such as Admin VLAN, Faculty VLAN, Student Labs VLAN, and Library VLAN. Each VLAN forms an independent, isolated broadcast domain.\n(c) Inter-VLAN Routing: A Layer 3 Switch (or a Router configured for 'Router-on-a-Stick') running Access Control Lists (ACLs) to filter and route authorized traffic between VLANs.",
            "markingScheme": "2 Marks for (a) speed doesn't fix single broadcast domain, 2 Marks for (b) VLAN segmentation, 2 Marks for (c) Layer 3 Switch / Router with ACLs."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Complete Devices & Topologies Examination Mastery",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which topology requires the least amount of cabling among all basic topologies?\n(a) Star\n(b) Bus\n(c) Mesh\n(d) Ring",
            "solution": "(b) Bus (uses a single central backbone cable).",
            "markingScheme": "1 Mark for (b) Bus."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the MAC address format?\n(a) 4 octets separated by dots\n(b) 6 pairs of hexadecimal digits separated by colons or hyphens\n(c) 8 decimal numbers\n(d) 16 alphanumeric characters",
            "solution": "(b) 6 pairs of hexadecimal digits separated by colons or hyphens (e.g., 00:50:56:C0:00:08).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is an Access Point (AP) in a wireless network?\n(a) An external antenna\n(b) A central hardware device connecting wireless client devices to a wired network\n(c) A password generator\n(d) A web browser",
            "solution": "(b) A central hardware device connecting wireless client devices to a wired network.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a repeater increases the bandwidth of a transmission channel.",
            "solution": "No. A repeater only restores signal amplitude and cleans noise; it cannot increase the channel bandwidth.",
            "markingScheme": "1 Mark for No (only restores signal amplitude)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "State two differences between a Router and a Gateway.",
            "solution": "1. A Router connects two networks using similar protocol suites (e.g., IP to IP). A Gateway connects networks that use completely different protocol suites (protocol converter).\n2. Routers operate at Layer 3 (Network Layer); Gateways can operate at any layer up to Layer 7 (Application Layer).",
            "markingScheme": "1 Mark for protocol similarity vs protocol translation, 1 Mark for OSI layer difference."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is Star topology overwhelmingly the most popular choice for modern office LANs?",
            "solution": "Because it offers superior reliability and fault isolation: the failure of any individual node or cable does not affect other nodes, and adding new devices is simple without bringing down the network.",
            "markingScheme": "1 Mark for fault isolation / reliability, 1 Mark for easy scalability."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A school has 4 computer labs with 30 computers each. Recommend:\n1. Topology for each lab\n2. Device to connect computers in each lab\n3. Device to connect the 4 labs together to the principal's room and internet",
            "solution": "1. Topology for each lab: Star Topology.\n2. Device in each lab: 32-port / 48-port Managed Switch.\n3. Connecting all labs to principal & internet: A Core Layer 3 Switch / Router with integrated firewall.",
            "markingScheme": "1 Mark for Star topology, 1 Mark for Switch in each lab, 1 Mark for Core Switch / Router."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why IP addresses are hierarchical while MAC addresses are flat.",
            "solution": "1. IP addresses are hierarchical (Network ID + Host ID). Routers can aggregate thousands of IP addresses into a single routing table entry based on Network ID prefix (like postal PIN codes).\n2. MAC addresses are flat physical identifiers tied to the hardware chip. They carry no geographic or network location information and cannot be aggregated for global internet routing.",
            "markingScheme": "1.5 Marks for IP hierarchical aggregation (Network ID + Host ID), 1.5 Marks for MAC flat hardware identifier without location info."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A law firm has rented three floors of an office building:\n- Floor 1: Reception & Conference Rooms (10 workstations, 2 Wi-Fi APs)\n- Floor 2: Legal Associates (40 workstations, 4 network printers)\n- Floor 3: Senior Partners & Server Room (15 workstations, Confidential Server)\n(a) Propose the network topology for the entire building.\n(b) Suggest hardware devices needed for each floor.\n(c) Where should the confidential file server be placed, and which security device should guard access to Floor 3 from other floors?",
            "solution": "(a) Recommended Topology: Extended Star / Tree Topology. Each floor operates an independent Star topology. All floor switches connect via vertical gigabit backbone cabling to the main server rack.\n(b) Hardware Needed:\n    - Floor 1: One 16-port Switch + 2 Wireless Access Points.\n    - Floor 2: Two 24-port Switches (or one 48-port Switch).\n    - Floor 3: One 24-port Switch + Core Layer 3 Switch + Enterprise Router.\n(c) Server Placement & Security:\n    - Placement: In the dedicated, temperature-controlled, access-controlled Server Room on Floor 3.\n    - Security Device: A Next-Generation Hardware Firewall configured with Access Control Lists (ACLs) to strictly restrict access to confidential partner records.",
            "markingScheme": "2 Marks for (a) Extended Star/Tree topology, 2 Marks for (b) hardware breakdown per floor, 2 Marks for (c) Floor 3 server room placement and hardware firewall."
          }
        ]
      }
    ]
  }
];
