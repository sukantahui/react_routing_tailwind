// 25 Authentic CBSE Board Examination Questions for Topic 11
const questions = [
  {
    "id": 1,
    "question": "What is a Tree topology in computer networking?",
    "options": [
      "A network wired to actual garden trees",
      "A hierarchical hybrid topology that combines the characteristics of Bus and Star topologies",
      "A network that only operates during spring",
      "A single closed circle of computers"
    ],
    "answer": "A hierarchical hybrid topology that combines the characteristics of Bus and Star topologies",
    "explanation": "Tree topology organizes multiple star-configured network clusters along a hierarchical backbone (combining star and bus).",
    "hint": "Hierarchical combination of Star and Bus topologies."
  },
  {
    "id": 2,
    "question": "What is the topmost central node in a Tree topology called?",
    "options": [
      "Root Node (or Core Switch)",
      "Leaf Node",
      "Branch Node",
      "Drop Node"
    ],
    "answer": "Root Node (or Core Switch)",
    "explanation": "The central core switch at the apex of the hierarchy is called the Root Node.",
    "hint": "Root Node."
  },
  {
    "id": 3,
    "question": "What happens in a Tree topology if one of the intermediate departmental branch switches fails?",
    "options": [
      "The entire campus network collapses immediately",
      "Only the computers connected to that specific branch lose network access; all other branches continue operating normally",
      "The root server catches fire",
      "The remaining branches double their bandwidth"
    ],
    "answer": "Only the computers connected to that specific branch lose network access; all other branches continue operating normally",
    "explanation": "Because branches are logically isolated, failure of one departmental switch isolates only that specific department.",
    "hint": "Failure is isolated to that specific branch."
  },
  {
    "id": 4,
    "question": "What happens if the central Root Core Switch or main backbone fails in a Tree topology?",
    "options": [
      "Computers inside the same departmental branch may still communicate locally, but cross-branch communication across departments is completely halted",
      "The computers format their hard drives",
      "Nothing happens because tree networks do not use the root",
      "The network converts into a ring topology"
    ],
    "answer": "Computers inside the same departmental branch may still communicate locally, but cross-branch communication across departments is completely halted",
    "explanation": "The root backbone carries all inter-departmental traffic; its failure isolates branches from one another.",
    "hint": "Inter-branch communication is severed."
  },
  {
    "id": 5,
    "question": "Why is Tree topology especially well-suited for university campuses and large corporate enterprises?",
    "options": [
      "It mirrors real-world administrative and departmental hierarchies, allowing independent departmental management and easy branch expansion",
      "It consumes zero electricity",
      "It operates without any cables",
      "It is completely immune to all failures"
    ],
    "answer": "It mirrors real-world administrative and departmental hierarchies, allowing independent departmental management and easy branch expansion",
    "explanation": "Hierarchical structures naturally map onto multi-building organizations where departments need local autonomy and campus-wide connectivity.",
    "hint": "Mirrors organizational hierarchies and allows scalable expansion."
  },
  {
    "id": 6,
    "question": "What is an advantage of Tree topology when adding a brand new computer lab to an existing school campus?",
    "options": [
      "The new lab can be connected simply by adding a new departmental switch and linking it to the core backbone without disrupting existing labs",
      "You must rewire every existing computer in the school",
      "All other computers must be turned off for a week",
      "The internet speed doubles automatically"
    ],
    "answer": "The new lab can be connected simply by adding a new departmental switch and linking it to the core backbone without disrupting existing labs",
    "explanation": "Tree topology allows modular expansion by adding child branches without re-cabling or disrupting parent/peer branches.",
    "hint": "Modular expansion by adding a child branch."
  },
  {
    "id": 7,
    "question": "In a CBSE 5-mark Case Study: An enterprise has 4 separate buildings (Admin, Finance, R&D, Logistics) connected to a main Server building. What is the overall campus topology?",
    "options": [
      "Tree (Hierarchical) Topology",
      "Single Bus Topology",
      "Ring Topology",
      "Token Ring"
    ],
    "answer": "Tree (Hierarchical) Topology",
    "explanation": "Connecting separate building star networks to a central server building constitutes a hierarchical Tree topology.",
    "hint": "Hierarchical campus network = Tree topology."
  },
  {
    "id": 8,
    "question": "What transmission medium is commonly used for the high-speed backbone connecting intermediate switches to the root core switch in a campus tree network?",
    "options": [
      "Optical Fiber Cable",
      "Unshielded Twisted Pair Cat-3",
      "Infrared Line of Sight",
      "Coaxial RG-58"
    ],
    "answer": "Optical Fiber Cable",
    "explanation": "Campus backbones require multi-gigabit speeds and distance reach over hundreds of meters, making optical fiber the standard choice.",
    "hint": "Optical fiber for high-speed campus backbones."
  },
  {
    "id": 9,
    "question": "What are the bottom-most end-user workstations in a Tree topology called?",
    "options": [
      "Leaf Nodes (or Endpoints)",
      "Root Nodes",
      "Trunk Nodes",
      "Core Nodes"
    ],
    "answer": "Leaf Nodes (or Endpoints)",
    "explanation": "In tree data structures and networks, endpoints that have no child devices connected beneath them are called Leaf Nodes.",
    "hint": "Leaf Nodes."
  },
  {
    "id": 10,
    "question": "How does local intra-departmental traffic behave in a well-designed Tree topology?",
    "options": [
      "It travels all the way to the root core switch and back every time",
      "It is switched locally by the departmental intermediate switch without burdening the central core backbone",
      "It is broadcast to every computer on campus",
      "It is converted into radio waves"
    ],
    "answer": "It is switched locally by the departmental intermediate switch without burdening the central core backbone",
    "explanation": "Layer-2 departmental switches filter and keep local traffic contained within the branch, keeping the core backbone clear.",
    "hint": "Local traffic stays within the branch switch."
  },
  {
    "id": 11,
    "question": "Which of the following is a disadvantage of Tree topology?",
    "options": [
      "High cabling requirements and total reliance on the root backbone for inter-branch communication",
      "Cannot connect more than 10 computers",
      "Incompatible with Ethernet switches",
      "Only works in single-story buildings"
    ],
    "answer": "High cabling requirements and total reliance on the root backbone for inter-branch communication",
    "explanation": "Tree networks require extensive cabling and multi-tiered switches, and the root backbone is a critical single point of inter-branch failure.",
    "hint": "Extensive cabling and root backbone dependency."
  },
  {
    "id": 12,
    "question": "What happens if a single client computer's cable in a tree topology is severed?",
    "options": [
      "The entire campus network fails",
      "Only that specific individual computer loses network access; all other computers in that department and other branches are unaffected",
      "The root switch reboots",
      "The department switch catches fire"
    ],
    "answer": "Only that specific individual computer loses network access; all other computers in that department and other branches are unaffected",
    "explanation": "Because endpoints connect via star links to the departmental switch, a single workstation cable break affects only that single node.",
    "hint": "Only that single endpoint is affected."
  },
  {
    "id": 13,
    "question": "What is the typical hierarchy depth (number of tiers) in standard enterprise campus Tree networks?",
    "options": [
      "3 tiers (Core, Distribution, and Access layers)",
      "100 tiers",
      "1 tier only",
      "50 tiers"
    ],
    "answer": "3 tiers (Core, Distribution, and Access layers)",
    "explanation": "Cisco and standard network engineering define a 3-tier hierarchical model: Core Layer, Distribution Layer, and Access Layer.",
    "hint": "Three tiers: Core, Distribution, Access."
  },
  {
    "id": 14,
    "question": "Why is a Tree topology easier to manage administratively than a large flat bus network?",
    "options": [
      "Because network policies, security permissions, and VLANs can be allocated cleanly per departmental branch",
      "Because tree networks have no passwords",
      "Because tree networks do not use IP addresses",
      "Because tree networks require no configuration"
    ],
    "answer": "Because network policies, security permissions, and VLANs can be allocated cleanly per departmental branch",
    "explanation": "Hierarchical segmentation allows administrators to apply granular security, QoS, and VLAN policies on departmental distribution switches.",
    "hint": "Clean departmental segmentation for policies and security."
  },
  {
    "id": 15,
    "question": "In a Tree topology, what is the role of the 'Distribution Layer' switch?",
    "options": [
      "To connect individual workstations on user desks",
      "To aggregate traffic from multiple local access switches and route/forward it towards the core root backbone",
      "To provide electricity to the building",
      "To print documents"
    ],
    "answer": "To aggregate traffic from multiple local access switches and route/forward it towards the core root backbone",
    "explanation": "Distribution switches aggregate multiple access switches, enforce routing/VLAN policies, and link to the core.",
    "hint": "Aggregates access switches and links to the core."
  },
  {
    "id": 16,
    "question": "What protocol is essential on a redundant Tree topology to prevent loops while maintaining backup links between distribution and core switches?",
    "options": [
      "Spanning Tree Protocol (STP)",
      "FTP",
      "Telnet",
      "SMTP"
    ],
    "answer": "Spanning Tree Protocol (STP)",
    "explanation": "Spanning Tree Protocol (STP, IEEE 802.1D) blocks redundant loop paths to prevent broadcast storms while keeping backup links ready.",
    "hint": "Spanning Tree Protocol (STP)."
  },
  {
    "id": 17,
    "question": "True or False: In a Tree topology, different branches can utilize completely different physical transmission media (e.g. fiber optics for inter-building links and UTP for desktop links).",
    "options": [
      "True",
      "False",
      "Only on Linux networks",
      "Only if the distance is under 10 meters"
    ],
    "answer": "True",
    "explanation": "Tree networks commonly use optical fiber for the core/distribution links and twisted pair copper for workstation access links.",
    "hint": "Different tiers can use different media."
  },
  {
    "id": 18,
    "question": "If a school campus has 4 blocks, and Block A has the Server Room with the root switch, what is the best cable layout to connect Blocks B, C, and D?",
    "options": [
      "Connect each of Blocks B, C, and D directly to the central switch in Block A via dedicated high-speed optical fiber lines (Tree/Extended Star layout)",
      "Connect Block A to B, B to C, and C to D in a circle",
      "Use walkie-talkies between buildings",
      "Run one thin copper wire through the grass"
    ],
    "answer": "Connect each of Blocks B, C, and D directly to the central switch in Block A via dedicated high-speed optical fiber lines (Tree/Extended Star layout)",
    "explanation": "Direct fiber links from the central server block to each departmental block create a robust, high-performance hierarchical tree.",
    "hint": "Direct links from the central block to each branch block."
  },
  {
    "id": 19,
    "question": "What term describes the maximum number of child branches connected directly to a parent switch in a tree hierarchy?",
    "options": [
      "Fan-Out",
      "Bandwidth",
      "Hop count",
      "Latency"
    ],
    "answer": "Fan-Out",
    "explanation": "Fan-out refers to the number of output ports or downstream child devices connected to a single node in a hierarchy.",
    "hint": "Fan-Out."
  },
  {
    "id": 20,
    "question": "Why is a Tree topology preferred over a Full Mesh topology for a university campus connecting 1000 computers?",
    "options": [
      "A full mesh connecting 1000 computers would require almost 500,000 cables, which is physically impossible and cost-prohibitive",
      "Tree topology is wireless while mesh is wired",
      "Mesh topology does not support computers",
      "Mesh topology was banned by international law"
    ],
    "answer": "A full mesh connecting 1000 computers would require almost 500,000 cables, which is physically impossible and cost-prohibitive",
    "explanation": "A full mesh requires (N(N-1)/2 = 499,500) cables. Tree topology achieves full connectivity with hierarchical efficiency.",
    "hint": "Full mesh requires nearly half a million cables for 1000 nodes."
  },
  {
    "id": 21,
    "question": "What happens if a rogue computer in Branch A generates an excessive broadcast storm in a Tree network configured with VLANs and storm control?",
    "options": [
      "The storm is contained within Branch A, preventing it from consuming bandwidth in Branch B, C, or the core backbone",
      "All computers on campus freeze immediately",
      "The school electricity shuts off",
      "The core switch deletes all user files"
    ],
    "answer": "The storm is contained within Branch A, preventing it from consuming bandwidth in Branch B, C, or the core backbone",
    "explanation": "Hierarchical segmentation and broadcast storm control confine localized broadcast traffic to the originating branch.",
    "hint": "Contained within the local branch."
  },
  {
    "id": 22,
    "question": "What is an 'Access Layer' switch in a 3-tier Tree topology?",
    "options": [
      "The switch that connects directly to end-user workstations, printers, and wireless access points",
      "The main switch in the server room",
      "The router connecting to the ISP",
      "A switch mounted on a satellite"
    ],
    "answer": "The switch that connects directly to end-user workstations, printers, and wireless access points",
    "explanation": "Access layer switches provide direct port connectivity to desktop PCs, laptops, and peripheral endpoints.",
    "hint": "Directly connects end-user workstations."
  },
  {
    "id": 23,
    "question": "How does Tree topology differ from a simple linear Bus topology?",
    "options": [
      "A Bus topology has a single unbranched line; a Tree topology branches out hierarchically with multiple star clusters connected to the backbone",
      "Bus is wireless while Tree is wired",
      "Bus has infinite scalability while Tree has none",
      "There is no difference"
    ],
    "answer": "A Bus topology has a single unbranched line; a Tree topology branches out hierarchically with multiple star clusters connected to the backbone",
    "explanation": "A bus is a single unbranched wire; a tree is a multi-level hierarchical structure with branching subnets.",
    "hint": "Hierarchical branching vs single unbranched line."
  },
  {
    "id": 24,
    "question": "What is 'Link Aggregation' (Port Trunking) often used on the backbone links of a Tree topology?",
    "options": [
      "Binding multiple physical Ethernet cables together into a single logical high-bandwidth trunk between switches",
      "Tying cables together with rubber bands",
      "Cutting cables in half to save space",
      "Using two different brands of switches"
    ],
    "answer": "Binding multiple physical Ethernet cables together into a single logical high-bandwidth trunk between switches",
    "explanation": "Link aggregation (e.g. LACP, 802.3ad) bundles parallel physical links into a single logical trunk to multiply backbone throughput.",
    "hint": "Bundling multiple cables into a single high-bandwidth logical trunk."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Identify the topology that combines the features of Star and Bus topologies in a hierarchical structure.' What is the answer?",
    "options": [
      "Tree Topology",
      "Mesh Topology",
      "Ring Topology",
      "Linear Topology"
    ],
    "answer": "Tree Topology",
    "explanation": "A Tree Topology is the hierarchical hybrid topology combining Star and Bus characteristics.",
    "hint": "Hierarchical combination of Star and Bus = Tree topology."
  }
];

export default questions;
