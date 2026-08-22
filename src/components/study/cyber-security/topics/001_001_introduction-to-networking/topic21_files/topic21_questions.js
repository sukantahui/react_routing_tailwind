// topic21_questions.js
// 30 Moderate to Expert Questions on Hybrid Topology in Computer Networks

const questions = [
  {
    question: "What is a Hybrid Topology in computer networks?",
    shortAnswer: "A Hybrid Topology is a network architecture that integrates two or more different standard physical topologies (such as Star-Bus, Star-Ring, or Star-Mesh) into a single unified network infrastructure.",
    explanation: "Hybrid topology combines the distinct advantages and structural characteristics of multiple topologies to satisfy diverse operational, geographical, and departmental requirements across an enterprise.",
    hint: "Think about combining two or more distinct basic topologies like Star and Bus.",
    level: "moderate",
    codeExample: "HybridTopology = Combine(StarTopology, BusTopology, RingTopology);"
  },
  {
    question: "How does a Star-Bus hybrid topology function?",
    shortAnswer: "Multiple independent Star-configured departmental clusters or switches connect to a centralized linear high-capacity Bus backbone cable or trunk line.",
    explanation: "In a Star-Bus topology, individual workstations connect to departmental central hubs/switches in a Star configuration, while these departmental hubs are interconnected along a main linear bus backbone.",
    hint: "Departmental stars linked via a central linear bus trunk.",
    level: "moderate",
    codeExample: "// Star clusters connected along a linear bus\n[Cluster A (Star)] --- (Bus Backbone) --- [Cluster B (Star)]"
  },
  {
    question: "How does a Star-Ring hybrid topology operate?",
    shortAnswer: "Departmental Star clusters connect to Multi-Station Access Units (MSAUs) or switches that are interconnected in a redundant circular ring backbone.",
    explanation: "In a Star-Ring topology (such as IBM Token Ring architecture), physical star connections from workstations enter a central unit where data circulate logically or physically in a token-passing ring structure.",
    hint: "Workstations radiate to a central unit that loops in a ring.",
    level: "moderate",
    codeExample: "// Star clusters linked in a circular loop\n(Star A) -> (Star B) -> (Star C) -> (Star A)"
  },
  {
    question: "What is the primary advantage of adopting a Hybrid Topology in large enterprises?",
    shortAnswer: "High scalability and architectural flexibility, allowing organisations to expand different departments using the topology best suited to their specific scale, cost, and cabling constraints.",
    explanation: "Enterprises can add new branches or buildings without restructuring existing network topologies, tailoring each department's local setup while preserving central backbone connectivity.",
    hint: "Think of departmental customization and modular expansion.",
    level: "moderate",
    codeExample: "enterprise.addDepartment('R&D', 'Mesh'); enterprise.addDepartment('Admin', 'Star');"
  },
  {
    question: "What is the main operational disadvantage of a Hybrid Topology?",
    shortAnswer: "High architectural complexity, elevated deployment costs in Indian Rupees (₹), and demanding maintenance and troubleshooting requirements.",
    explanation: "Integrating diverse hardware architectures, multiple access methods, and mixed cabling standards requires specialized network administrators and expensive multi-protocol networking gear.",
    hint: "Consider the difficulty of managing multiple mixed protocols and hardware.",
    level: "moderate",
    codeExample: "Cost = HardwareCost(₹) + MultiProtocolAdminCost(₹) + SpecializedCabling(₹);"
  },
  {
    question: "Why is fault isolation and detection considered effective in Hybrid Topologies?",
    shortAnswer: "Because failures within an individual departmental star or ring segment can be isolated at the local switch or MSAU without disrupting the rest of the enterprise network.",
    explanation: "Hierarchical segmentation ensures that a localized cable fault or workstation crash only affects its specific branch, allowing network engineers to diagnose and repair it independently.",
    hint: "Local departmental issues stay contained within their local switch/hub.",
    level: "expert",
    codeExample: "if (SegmentA.hasFault()) { SegmentA.isolate(); Backbone.continueOperating(); }"
  },
  {
    question: "What happens if the main backbone cable in a Star-Bus hybrid network breaks?",
    shortAnswer: "Inter-cluster communication halts (the network partitions into isolated departmental stars), although intra-departmental communication within each star switch remains functional.",
    explanation: "The linear bus backbone is a single point of failure for inter-departmental traffic across clusters, dividing the network into standalone isolated subnetworks.",
    hint: "Each star cluster works locally, but cannot talk across the broken bus.",
    level: "expert",
    codeExample: "Backbone.break() => ClusterA.canTalk(ClusterB) === false; ClusterA.localTalk() === true;"
  },
  {
    question: "Which hybrid topology combination is most commonly deployed in university campuses across Kolkata and Jadavpur?",
    shortAnswer: "Hierarchical Star-Tree and Star-Mesh hybrid topologies using multi-tier core, distribution, and access switches connected via 10Gbps optical fiber.",
    explanation: "Campus networks connect academic departments (Jadavpur, Kolkata) via a high-speed fiber-optic core mesh or tree backbone, with each building running local high-density Star LANs.",
    hint: "Star LANs inside buildings linked via campus-wide fiber core.",
    level: "moderate",
    codeExample: "CampusNetwork = { Core: 'Fiber-Mesh', Distribution: 'Tree', Access: 'Gigabit-Star' };"
  },
  {
    question: "What role does a Multi-Station Access Unit (MSAU) play in a Star-Ring hybrid topology?",
    shortAnswer: "The MSAU acts as the physical central hub where workstation cables terminate in a Star configuration, while internally relaying signals in a circular logical Ring.",
    explanation: "MSAUs create physical star wiring for convenience and ease of maintenance, while preserving deterministic token-passing ring protocols internally.",
    hint: "Physical star outside, logical circular ring inside.",
    level: "expert",
    codeExample: "msau.routePacket(sourceNode, nextNodeInRing);"
  },
  {
    question: "How does a Hybrid Topology differ fundamentally from a Tree Topology?",
    shortAnswer: "A Tree topology is specifically a hierarchical combination of Bus and Star. A Hybrid topology encompasses ANY combination of two or more distinct topologies (e.g., Star-Mesh, Mesh-Ring, Star-Ring, Ring-Bus).",
    explanation: "Tree topology is a specific subset of hybrid topologies; all tree topologies are hybrid, but not all hybrid topologies are trees.",
    hint: "Tree is strictly hierarchical (Bus+Star); Hybrid is any arbitrary combination.",
    level: "expert",
    codeExample: "isTree = (combination === 'Hierarchical-Bus-Star'); isHybrid = (topologies.length >= 2);"
  },
  {
    question: "Why do banking institutions in Barrackpore and Kolkata use Star-Mesh hybrid networks?",
    shortAnswer: "To provide full redundant fault tolerance across core data centers (Mesh) while keeping retail branch teller desks simple, scalable, and cost-effective (Star).",
    explanation: "Core banking servers require zero-downtime mesh redundancy across branches, while counter terminals connect to local branch switches in standard stars.",
    hint: "Critical core servers need mesh; regular teller desks use star.",
    level: "moderate",
    codeExample: "BankingArchitecture = { DataCenter: 'Full-Mesh', BranchOffices: 'Star-LAN' };"
  },
  {
    question: "How is network cabling managed effectively in large hybrid topology installations?",
    shortAnswer: "Through structured cabling standards (TIA/EIA-568), dedicated patch panels, color-coded fiber/copper runs, and hierarchical distribution frames (MDF/IDF).",
    explanation: "Structured cabling prevents cable sprawl, standardizes termination points, and ensures rapid identification of link failures across complex hybrid segments.",
    hint: "Structured cabling with Main (MDF) and Intermediate (IDF) distribution frames.",
    level: "moderate",
    codeExample: "MDF -> FiberBackbone -> IDF -> Category6_Copper -> StarWorkstations;"
  },
  {
    question: "What is the role of a Core Switch in a modern enterprise Hybrid Star-Mesh network?",
    shortAnswer: "It serves as the ultra-high-speed routing backbone that handles high-volume traffic aggregation between different departmental distribution switches.",
    explanation: "Core switches operate at Layer 3/4 with redundant power supplies and multi-gigabit throughput, linking distinct departmental star clusters across the organisation.",
    hint: "High-speed central hub that routes traffic across all departments.",
    level: "expert",
    codeExample: "coreSwitch.forward(packet, routeTable.getOptimalPath(destIP));"
  },
  {
    question: "Can wireless Wi-Fi mesh networks be integrated into a wired hybrid topology?",
    shortAnswer: "YES! Modern enterprise hybrid networks frequently combine wired Star/Tree LANs with Wi-Fi 6 wireless mesh access points for mobile endpoints.",
    explanation: "Access points connected via Power over Ethernet (PoE) to star access switches broadcast a wireless mesh to provide seamless roaming for laptops and smartphones.",
    hint: "Wired ethernet backbone connects to wireless mesh access points.",
    level: "moderate",
    codeExample: "HybridWiredWireless = WiredBackbone(Star) + WirelessAccessPoints(Mesh);"
  },
  {
    question: "What is the typical cost impact in Indian Rupees (₹) when upgrading from a simple Star to a robust Star-Mesh Hybrid network?",
    shortAnswer: "Upgrading typically increases hardware expenditure by ₹2,00,000 to ₹10,00,000+ due to redundant Layer-3 switches, redundant fiber runs, and intelligent management software.",
    explanation: "Mesh redundancy requires dual Network Interface Cards, redundant switch ports, optical transceivers, and multi-link licensing.",
    hint: "Redundant switches, dual links, and fiber transceivers increase deployment costs in ₹.",
    level: "moderate",
    codeExample: "TotalUpgradeCost = ₹4,50,000; // Includes redundant switches and fiber transceivers"
  },
  {
    question: "How do VLANs (Virtual Local Area Networks) enhance security and traffic management in hybrid topologies?",
    shortAnswer: "VLANs logically segment broadcast domains across the physical hybrid infrastructure, isolating departmental traffic (e.g., Accounts vs R&D) regardless of physical location.",
    explanation: "Even if Debangshu and Susmita connect to the same hybrid switch fabric, VLAN tags keep their packets isolated at Layer 2 for security and compliance.",
    hint: "Logical segmentation of physical networks for security and traffic control.",
    level: "expert",
    codeExample: "switch.createVLAN(10, 'Finance'); switch.createVLAN(20, 'Engineering');"
  },
  {
    question: "What type of transmission media is best suited for the backbone of a hybrid campus network?",
    shortAnswer: "Single-mode or Multi-mode Optical Fiber cables (e.g., 10G/40G OM4/OS2).",
    explanation: "Fiber optic cables offer immunity to electromagnetic interference (EMI), support high bandwidth over several kilometers, and connect disparate departmental buildings securely.",
    hint: "High-speed, long-distance, immune to electrical interference: Fiber Optics.",
    level: "moderate",
    codeExample: "BackboneMedia = 'Multi-Mode Optical Fiber (10Gbps OM4)';"
  },
  {
    question: "In a hybrid network, what is the significance of the Spanning Tree Protocol (STP)?",
    shortAnswer: "STP prevents destructive Layer 2 switching loops and broadcast storms in hybrid topologies that have redundant physical links.",
    explanation: "STP dynamically disables redundant backup links until an active link fails, providing seamless failover without infinite packet circulation.",
    hint: "Prevents network loops caused by redundant paths.",
    level: "expert",
    codeExample: "STP.blockRedundantPort(Port2); if (Port1.fails()) STP.unblockPort(Port2);"
  },
  {
    question: "Suppose Mahima manages an emergency healthcare network in Ichapur combining Star clinics and a central Mesh hospital core. Why is this hybrid model optimal?",
    shortAnswer: "It gives critical hospital databases 99.999% uptime via mesh redundancy while remote clinics use low-cost, simple star configurations for outpatient terminals.",
    explanation: "Hybrid topology matches resilience to criticality: expensive mesh where downtime is fatal, affordable star where simplicity suffices.",
    hint: "Critical systems get high-reliability mesh; standard clinics use cost-effective star.",
    level: "moderate",
    codeExample: "HealthcareTopology = { CentralHospital: 'Mesh-HighAvailability', RemoteClinics: 'Star-LAN' };"
  },
  {
    question: "How does Link Aggregation (LACP / EtherChannel) optimize hybrid network performance?",
    shortAnswer: "It bundles multiple physical ethernet or fiber cables between hybrid switches into a single logical high-bandwidth trunk, increasing throughput and providing link redundancy.",
    explanation: "Instead of having idle backup links, LACP combines their bandwidth (e.g., 4 x 1Gbps = 4Gbps trunk) while maintaining instantaneous failover if a cable snaps.",
    hint: "Bundles multiple cables into one logical high-speed pipeline.",
    level: "expert",
    codeExample: "LACP.bundle([Eth1, Eth2, Eth3, Eth4]) => LogicalTrunkBandwidth = '4Gbps';"
  },
  {
    question: "What diagnostic tools do network engineers in Barrackpore use to troubleshoot hybrid topologies?",
    shortAnswer: "SNMP monitoring systems (e.g., Zabbix, PRTG), Wireshark packet analyzers, OTDR fiber testers, cable certifiers, and traceroute/ping utilities.",
    explanation: "Because hybrid networks blend multiple architectures, engineers rely on visual topology mappers, automated alert daemons, and packet sniffers to isolate segment faults.",
    hint: "SNMP network monitoring, packet sniffers (Wireshark), and cable testers.",
    level: "moderate",
    codeExample: "snmp.pollStatus(deviceIP); wireshark.capturePackets(interface);"
  },
  {
    question: "Why is comprehensive network documentation critical when deploying a hybrid topology?",
    shortAnswer: "Because the heterogeneous nature and mixed wiring of hybrid networks make unmapped systems nearly impossible to maintain, troubleshoot, or expand during outages.",
    explanation: "Network engineers must maintain updated topology diagrams, IP address schemes, patch panel numbering, and port allocation matrices to avoid operational blindness.",
    hint: "Mixed topologies become unmanageable during crises without clear diagrams.",
    level: "moderate",
    codeExample: "Documentation = { TopologyDiagram: 'Visio', IPPlan: 'SubnetMatrix.xlsx', PortMap: 'RackLayout' };"
  },
  {
    question: "How does Software-Defined Networking (SDN) simplify hybrid topology management?",
    shortAnswer: "SDN decouples the control plane from the data plane, enabling centralized, programmatic configuration and traffic engineering across diverse hybrid hardware through a single controller.",
    explanation: "Rather than configuring dozens of heterogeneous switches individually via CLI, administrators define network-wide policies on a centralized SDN controller (e.g., OpenFlow).",
    hint: "Centralized software controller manages all heterogeneous hardware.",
    level: "expert",
    codeExample: "sdnController.applyPolicy({ vlan: 100, bandwidth: '1Gbps', priority: 'High' });"
  },
  {
    question: "What is an Access Layer switch in a three-tier hybrid campus architecture?",
    shortAnswer: "The switch located at the lowest tier that directly connects end-user devices (workstations, printers, IP phones, access points) into the local star topology.",
    explanation: "Access layer switches enforce port security, provide PoE for IP phones and cameras, and forward local traffic up to distribution layer switches.",
    hint: "Directly connects laptops, PCs, and printers to the network.",
    level: "moderate",
    codeExample: "accessSwitch.connectDevice(workstationMAC, portNumber);"
  },
  {
    question: "What is the Distribution Layer switch responsible for in a hybrid enterprise network?",
    shortAnswer: "It aggregates traffic from multiple Access switches, enforces departmental routing policies, applies Access Control Lists (ACLs), and routes traffic to the Core switch.",
    explanation: "The distribution layer acts as the policy enforcement boundary and traffic concentrator between building access stars and the enterprise core mesh.",
    hint: "Aggregates access switches and enforces routing and firewall policies.",
    level: "expert",
    codeExample: "distributionSwitch.applyACL(firewallRules); distributionSwitch.route(vlan10, vlan20);"
  },
  {
    question: "What is a major cyber security challenge specific to complex hybrid topologies?",
    shortAnswer: "An expanded attack surface and multiple entry vectors across diverse technologies (e.g., unmanaged legacy bus segments, rogue wireless mesh nodes, or misconfigured inter-VLAN routing).",
    explanation: "Heterogeneous networks with multiple interconnects increase the risk of configuration drift, forgotten switch ports, and lateral movement by attackers.",
    hint: "More diverse technologies and interconnects create more potential entry points for attackers.",
    level: "expert",
    codeExample: "SecurityAudit.scanVulnerabilities(['LegacyBusBridge', 'WirelessMeshAP', 'InterVLANRouter']);"
  },
  {
    question: "How does a Power over Ethernet (PoE) switch benefit an office hybrid topology?",
    shortAnswer: "It delivers both electrical power and data packets over a single Category 6 twisted-pair cable to IP cameras, VoIP phones, and Wi-Fi access points, eliminating dedicated electrical wiring.",
    explanation: "PoE simplifies device deployment in ceilings and remote locations across hybrid enterprise buildings, significantly lowering facility installation costs in ₹.",
    hint: "Sends electricity and data down the same ethernet cable.",
    level: "moderate",
    codeExample: "poePort.providePower(15.4W); poePort.transmitData(1000Mbps);"
  },
  {
    question: "What is the primary difference between physical topology and logical topology in a hybrid Star-Ring network?",
    shortAnswer: "Physical topology is the visible layout of cables radiating like a Star from a central hub; Logical topology is the actual circular ring path the data token travels between stations.",
    explanation: "Cabling follows convenient star pathways into the wiring closet, but the underlying media access protocol circulates frames in a deterministic ring sequence.",
    hint: "Physical is how cables are laid out; Logical is how data actually moves.",
    level: "expert",
    codeExample: "Physical = 'Star (Cables into Hub)'; Logical = 'Ring (Token circulation)';"
  },
  {
    question: "Why do industrial plants in Barrackpore and Ichapur deploy hybrid Ring-Star topologies for Supervisory Control and Data Acquisition (SCADA)?",
    shortAnswer: "Because industrial rings provide sub-50ms self-healing recovery if factory cables are severed, while local equipment cells connect via standard stars for ease of machine maintenance.",
    explanation: "Industrial ethernet protocols (such as MRP or PRP) maintain redundant ring paths across manufacturing floors while connecting robotic workstations in local stars.",
    hint: "Industrial rings heal in milliseconds if a cable gets cut on the factory floor.",
    level: "expert",
    codeExample: "IndustrialMRP.ringFailoverTime = '20ms'; localCellTopology = 'Industrial-Star';"
  },
  {
    question: "What is the ultimate golden rule for designing and maintaining a Hybrid Network Topology?",
    shortAnswer: "'Match topology to departmental requirement; build modularity with structured cabling; eliminate single points of failure at the core; document every link and port; and budget hardware and licensing costs in Indian Rupees (₹)!'",
    explanation: "This complete rule captures the essence of enterprise hybrid networking: flexibility, reliability, structured management, and rigorous financial planning.",
    hint: "Modular design + Redundant core + Structured documentation in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ModularDesign() -> RedundantCore() -> StructuredCabling() -> StrictDocumentation(₹);"
  }
];

export default questions;
