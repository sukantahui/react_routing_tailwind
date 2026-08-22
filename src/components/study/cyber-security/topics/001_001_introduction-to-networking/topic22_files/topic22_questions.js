// topic22_questions.js
// 30 Moderate to Expert Questions on Basic Networking Components

const questions = [
  {
    question: "What are the core categories of networking components that make up a computer network?",
    shortAnswer: "1. End Devices (Clients, Servers, Printers), 2. Intermediary Devices (Switches, Routers, Hubs, APs, Firewalls), 3. Network Interfaces (NICs), and 4. Transmission Media (Twisted Pair, Fiber Optics, Wireless RF).",
    explanation: "A functional network requires source/destination endpoints, connecting intermediary hardware to route and switch signals, physical interface cards, and physical or wireless channels.",
    hint: "Think about endpoints, connecting devices, interface cards, and cables.",
    level: "moderate",
    codeExample: "Network = [EndDevices, IntermediaryDevices, NICs, TransmissionMedia];"
  },
  {
    question: "What is the primary difference between a Network Hub and a Network Switch?",
    shortAnswer: "A Hub operates at Layer 1 (Physical) and broadcasts incoming data to ALL ports; a Switch operates at Layer 2 (Data Link) and forwards frames selectively to the specific destination port using a MAC Address Table (CAM Table).",
    explanation: "Hubs create a single shared collision domain leading to collisions and security risks. Switches isolate collision domains to each port, enabling simultaneous full-duplex transmission.",
    hint: "Hub broadcasts to everyone (dumb); Switch sends only to destination port (intelligent).",
    level: "moderate",
    codeExample: "hub.broadcast(data, allPorts); switch.forward(frame, macTable.get(destMAC));"
  },
  {
    question: "How does a Router differ functionally from a Layer 2 Switch?",
    shortAnswer: "A Layer 2 Switch forwards Ethernet frames within the SAME local network using MAC addresses; a Router routes IP packets BETWEEN DIFFERENT subnets or networks using IP addresses.",
    explanation: "Routers operate at Layer 3 (Network Layer), maintain routing tables (OSPF, BGP), isolate broadcast domains, and perform Network Address Translation (NAT) to interface with the WAN/Internet.",
    hint: "Switches connect devices within a LAN; Routers connect multiple different LANs together.",
    level: "moderate",
    codeExample: "switch.forwardWithinLAN(frame); router.routeBetweenSubnets(packet, routingTable);"
  },
  {
    question: "What is a Network Interface Card (NIC) and what is its primary hardware identifier?",
    shortAnswer: "A NIC is a hardware expansion card or onboard chip that connects a device to network media; its permanent hardware identifier is the 48-bit (6-byte) physical MAC address.",
    explanation: "The NIC converts internal parallel computer data into serial electrical, optical, or radio signals formatted for the transmission medium and encodes the unique manufacturer-assigned MAC address.",
    hint: "Hardware card that provides the ethernet or Wi-Fi port and holds the MAC address.",
    level: "moderate",
    codeExample: "nic.macAddress = '00:1A:2B:3C:4D:5E'; // 48-bit hex identifier"
  },
  {
    question: "What is the purpose of a Modem (Modulator-Demodulator)?",
    shortAnswer: "A Modem modulates digital data from computers into analog signals for transmission over telephone or cable lines, and demodulates received analog signals back into digital data.",
    explanation: "Traditional telecommunications lines use analog waveforms; modern optical fiber equivalents use Optical Network Terminals (ONT) to convert laser pulses into digital Ethernet.",
    hint: "Modulates digital to analog, and demodulates analog to digital.",
    level: "moderate",
    codeExample: "modem.transmit(analogSignal = modulate(digitalBits));"
  },
  {
    question: "What is a Collision Domain and how do switches eliminate collisions?",
    shortAnswer: "A Collision Domain is a network segment where data packets can collide when sent simultaneously. Switches assign each port to its own dedicated collision domain, allowing collision-free full-duplex communication.",
    explanation: "In hub environments, all ports share one collision domain (CSMA/CD required). In switched networks, microsegmentation gives each connected device a dedicated point-to-point collision domain.",
    hint: "A zone where simultaneous transmissions collide; switches create separate domains per port.",
    level: "expert",
    codeExample: "hub.collisionDomains = 1; switch.collisionDomains = switch.totalPorts;"
  },
  {
    question: "What is a Broadcast Domain and which networking device isolates broadcast domains?",
    shortAnswer: "A Broadcast Domain is the boundary within which a broadcast frame (FF:FF:FF:FF:FF:FF) is forwarded to all nodes. Routers (and Layer-3 Switches with VLANs) isolate broadcast domains.",
    explanation: "Standard Layer-2 switches forward broadcast frames across all ports. Routers do not forward Layer-2 broadcasts, effectively blocking broadcast storms from propagating between subnets.",
    hint: "Zone where broadcast packets reach everyone; only Routers stop broadcasts.",
    level: "expert",
    codeExample: "router.forwardBroadcast() === false; switch.forwardBroadcast() === true;"
  },
  {
    question: "What is a Wireless Access Point (WAP) and how does it interface with a wired LAN?",
    shortAnswer: "A WAP is a transceiver that connects wireless Wi-Fi devices (802.11) to a wired Ethernet backbone (802.3) using Category 6 copper cables powered via PoE.",
    explanation: "WAPs bridge wireless radio frequency (RF) frames to 802.3 Ethernet frames, allowing laptops, smartphones, and tablets to access local file servers, printers, and the Internet gateway.",
    hint: "Bridges wireless Wi-Fi clients to the wired Ethernet switch.",
    level: "moderate",
    codeExample: "wap.bridgeFrames(wireless80211Frame, wired8023Frame);"
  },
  {
    question: "What is a Hardware Repeater and why is it used in long-distance cabling?",
    shortAnswer: "A Repeater operates at Layer 1 to regenerate, reshape, and re-amplify weakened electrical or optical signals, overcoming cable attenuation over extended distances.",
    explanation: "Standard Category 6 Ethernet cables have a strict 100-meter maximum length limit. Repeaters or intermediate switches regenerate digital signals to span longer distances.",
    hint: "Amplifies and regenerates signals before attenuation degrades the data.",
    level: "moderate",
    codeExample: "if (cableDistance > 100m) repeater.regenerateSignal(attenuatedWaveform);"
  },
  {
    question: "What is the function of a Network Gateway?",
    shortAnswer: "A Gateway serves as an entrance/exit point between two architecturally or technologically dissimilar networks, translating protocols, data formats, or security policies.",
    explanation: "Gateways operate across all layers (up to Layer 7 Application) to translate between different network architectures, such as an enterprise IP network and a legacy SNA or cellular telecommunications network.",
    hint: "Protocol translator connecting completely different network systems.",
    level: "expert",
    codeExample: "gateway.translateProtocol(SourceProtocol.IP, DestinationProtocol.LegacySNA);"
  },
  {
    question: "What are the common Category ratings for Twisted-Pair copper cables used in West Bengal offices?",
    shortAnswer: "Cat5e (up to 1 Gbps @ 100MHz), Cat6 (up to 10 Gbps up to 55m @ 250MHz), Cat6a (10 Gbps @ 500MHz up to 100m), and Cat7/Cat8 (25G/40G in data centers).",
    explanation: "Twisted-pair cables use tighter twisting and internal splines (crosstalk dividers) to reduce electromagnetic interference (EMI) and Near-End Crosstalk (NEXT) at higher frequencies.",
    hint: "Cat5e for 1G, Cat6/6a for 10G standard enterprise wiring.",
    level: "moderate",
    codeExample: "CableSpecs = { Cat5e: '1Gbps @ 100m', Cat6: '10Gbps @ 55m', Cat6a: '10Gbps @ 100m' };"
  },
  {
    question: "What is the standard connector type used for terminating Category 6 Ethernet cables?",
    shortAnswer: "The 8-pin, 8-conductor RJ-45 (Registered Jack 45) modular connector wired to TIA/EIA-568A or TIA/EIA-568B pinout standards.",
    explanation: "RJ-45 plugs crimp onto the 8 copper conductors (4 pairs: Orange, Green, Blue, Brown) to click securely into NICs and switch ports.",
    hint: "Standard 8-pin plastic modular plug: RJ-45.",
    level: "moderate",
    codeExample: "connectorType = 'RJ-45'; wiringStandard = 'TIA/EIA-568B';"
  },
  {
    question: "How does Single-Mode Optical Fiber differ from Multi-Mode Optical Fiber?",
    shortAnswer: "Single-Mode Fiber (SMF) has a narrow core (~9 µm) using laser light for long distances (up to 40-80+ km); Multi-Mode Fiber (MMF) has a wider core (50/62.5 µm) using LED/VCSEL light for short campus links (up to 300-500m).",
    explanation: "SMF eliminates modal dispersion by allowing only one light path, making it ideal for metropolitan WAN connections across Kolkata and Barrackpore.",
    hint: "Single-mode: tiny core, laser, long distance; Multi-mode: wide core, LED, short campus runs.",
    level: "expert",
    codeExample: "SMF = { Core: '9um', Distance: '40km', Source: 'Laser' }; MMF = { Core: '50um', Distance: '500m' };"
  },
  {
    question: "What is an SFP (Small Form-factor Pluggable) Transceiver?",
    shortAnswer: "A hot-swappable modular transceiver that plugs into switch ports to convert optical fiber signals (LC/SC connectors) or copper into electrical switch backplane signals.",
    explanation: "SFP/SFP+ (10G) and QSFP+ (40G/100G) modules allow network administrators in Jadavpur to change cable types (e.g. from 1G copper to 10G fiber) simply by swapping the module.",
    hint: "Modular plug-in transceiver for fiber-optic switch ports.",
    level: "expert",
    codeExample: "switchPort.insertTransceiver(SFP_10G_LR_FiberModule);"
  },
  {
    question: "What is a Patch Panel and why is it installed in network server racks?",
    shortAnswer: "A Patch Panel is a rack-mounted hardware assembly with multiple RJ-45 or fiber ports that organizes, terminates, and labels permanent structured cabling runs from office wall jacks.",
    explanation: "Patch panels prevent wear and tear on primary switch ports by providing a structured termination point where short, flexible patch cords can easily be rearranged.",
    hint: "Rack-mounted panel where all building cables terminate neatly.",
    level: "moderate",
    codeExample: "WallJack -> PermanentSolidCoreCable -> PatchPanel -> FlexiblePatchCord -> SwitchPort;"
  },
  {
    question: "Suppose Debangshu in Barrackpore is budgeting for an office network of 48 workstations. What is the estimated hardware cost in Indian Rupees (₹)?",
    shortAnswer: "Estimated cost is ₹1,20,000 – ₹2,50,000 (including two 24-port Gigabit Managed Switches at ₹35,000 each, dual-band Wi-Fi APs at ₹15,000, Cat6 cable rolls at ₹12,000, patch panels, and rack accessories).",
    explanation: "Enterprise hardware budgeting accounts for managed switching capacity, structured cabling accessories, server racks, uninterruptible power supplies (UPS), and professional installation in ₹.",
    hint: "Managed switches, cabling rolls, rack, patch panels, and APs budgeted in ₹.",
    level: "moderate",
    codeExample: "TotalBudget = 2*ManagedSwitch(₹35000) + Cabling(₹25000) + APs(₹30000) + Rack(₹15000);"
  },
  {
    question: "What is a Layer-3 Switch (Multilayer Switch) and when is it preferred over a dedicated Router?",
    shortAnswer: "A Layer-3 Switch performs hardware-based (ASIC) high-speed inter-VLAN routing at wire speed within an enterprise LAN, preferred when gigabit throughput between local subnets is needed without router CPU bottlenecks.",
    explanation: "Dedicated routers excel at complex WAN protocols (BGP, NAT, MPLS), whereas Layer-3 switches route packets between enterprise VLANs at massive line rates with negligible latency.",
    hint: "High-speed switch with hardware routing ASICs for fast inter-VLAN traffic.",
    level: "expert",
    codeExample: "layer3Switch.routeVLAN(packet, hardwareASICRate = 'LineRate10Gbps');"
  },
  {
    question: "How does Power over Ethernet (PoE / 802.3af/at/bt) simplify component deployment?",
    shortAnswer: "It injects 15.4W to 90W of DC electrical power directly over unused copper twisted-pair conductors, powering IP cameras, VoIP phones, and wireless APs without dedicated AC power outlets.",
    explanation: "PoE drastically reduces electrician labor and wiring infrastructure costs across large facilities in Kolkata and Ichapur.",
    hint: "Powers cameras and phones directly through the ethernet cable.",
    level: "moderate",
    codeExample: "poeSwitchPort.deliverPower('30W (PoE+ 802.3at)'); poeSwitchPort.deliverData('1Gbps');"
  },
  {
    question: "What is a Hardware Firewall and where is it placed in an enterprise network topology?",
    shortAnswer: "A Hardware Firewall is a dedicated security appliance that inspects and filters incoming/outgoing packets based on security rules; it is positioned at the perimeter boundary between the internal LAN and the external WAN/Internet.",
    explanation: "Next-Generation Firewalls (NGFW) perform stateful packet inspection, deep packet inspection (DPI), intrusion prevention (IPS), and SSL decryption at line speed to defend corporate assets.",
    hint: "Dedicated security device at the network perimeter boundary.",
    level: "expert",
    codeExample: "perimeterFirewall.inspect(packet); if (packet.isMalicious()) firewall.drop(packet);"
  },
  {
    question: "What is a Media Converter and when is it necessary?",
    shortAnswer: "A Media Converter is a physical-layer device that converts signals between two different transmission media types, such as converting 1000Base-T copper Ethernet to 1000Base-SX fiber optic.",
    explanation: "When extending a local copper network across a large campus where distances exceed 100 meters, media converters seamlessly adapt copper switches to long-range fiber cables.",
    hint: "Converts copper signals to fiber optic signals (or vice-versa).",
    level: "moderate",
    codeExample: "mediaConverter.convert(CopperRJ45_Signal, FiberOpticLC_Signal);"
  },
  {
    question: "What is the CAM (Content Addressable Memory) Table in a switch and what happens when it overflows?",
    shortAnswer: "The CAM table maps MAC addresses to physical switch ports. If it overflows (e.g. in a MAC Flooding attack), the switch fails open and behaves like a broadcast Hub, forwarding all frames to every port.",
    explanation: "Attackers flood fake MAC addresses to exhaust switch memory, forcing the switch to broadcast sensitive packets so the attacker can sniff traffic across the LAN.",
    hint: "Switch port-to-MAC map; overflow causes switch to broadcast like a dumb hub.",
    level: "expert",
    codeExample: "if (camTable.isFull()) switch.fallbackToBroadcastMode();"
  },
  {
    question: "What is the purpose of an Uninterruptible Power Supply (UPS) in a network server rack?",
    shortAnswer: "A rack-mounted UPS provides instantaneous battery backup power during mains electricity outages and regulates line voltage to prevent switch/router reboots and hardware damage.",
    explanation: "Power fluctuations and power cuts across industrial zones in Barrackpore can corrupt switch firmware and drop critical routing sessions without online double-conversion UPS protection.",
    hint: "Provides battery backup power to keep routers and switches running during outages.",
    level: "moderate",
    codeExample: "ups.onPowerOutage() => battery.providePower(duration = '45 minutes');"
  },
  {
    question: "What is a Server in the context of network components?",
    shortAnswer: "A high-performance computer equipped with redundant hardware (power supplies, ECC memory, RAID storage, multi-port NICs) dedicated to serving files, applications, databases, or network services (DNS, DHCP) to client devices.",
    explanation: "Servers run dedicated server operating systems (Linux, Windows Server) engineered for 24/7 continuous operation and multi-threaded client request processing.",
    hint: "Central computer that provides resources, files, and services to clients.",
    level: "moderate",
    codeExample: "server.listen(port = 443, onClientRequest = handleDatabaseQuery);"
  },
  {
    question: "What is a Client device in a computer network?",
    shortAnswer: "An end-user computing endpoint (e.g., desktop PC, laptop, tablet, smartphone) that initiates network requests to access resources, services, and applications hosted on servers.",
    explanation: "Clients use client software (web browsers, email clients, custom ERP frontends) to interact with users and format requests sent across the network.",
    hint: "User device that requests services from servers.",
    level: "basic",
    codeExample: "client.fetch('https://api.college.edu/marks') => displaysStudentReport();"
  },
  {
    question: "How do managed switches differ from unmanaged plug-and-play switches?",
    shortAnswer: "Managed switches offer administrative configuration (VLANs, QoS, STP, Port Mirroring, SNMP monitoring, CLI access); unmanaged switches have fixed factory settings with zero configuration or management capability.",
    explanation: "Enterprise networks require managed switches to segment traffic, enforce security, prioritize VoIP packets, and isolate faults.",
    hint: "Managed switches allow custom configuration (VLANs, QoS); unmanaged are basic plug-and-play.",
    level: "moderate",
    codeExample: "managedSwitch.configure({ vlan: 20, qosPriority: 'High', portSecurity: true });"
  },
  {
    question: "What is the role of a Core Switch vs an Edge/Access Switch in campus networking?",
    shortAnswer: "A Core Switch handles high-volume backbone routing between major buildings at ultra-high speed; an Edge/Access Switch directly connects end-user desktops and Wi-Fi access points in classrooms and offices.",
    explanation: "Edge switches focus on port density, PoE, and user security; Core switches focus on raw switching throughput, redundant power, and zero-packet-drop backplane bandwidth.",
    hint: "Core is high-speed backbone aggregation; Edge connects end-users directly.",
    level: "expert",
    codeExample: "CoreSwitch = HighThroughputBackbone; EdgeSwitch = UserPortDensityAndPoE;"
  },
  {
    question: "What is a Network Tap (Test Access Point) and how is it used in Cyber Security?",
    shortAnswer: "A dedicated hardware device inserted directly into a physical network cable run to create an exact, uninterrupted copy of all passing traffic for security monitoring and IDS/IPS inspection.",
    explanation: "Network Taps do not introduce latency or drop packets during congestion, providing 100% full-duplex traffic visibility for cybersecurity intrusion detection tools.",
    hint: "Hardware splitter that mirrors all passing packets to security monitoring tools.",
    level: "expert",
    codeExample: "networkTap.copyStream(LiveTraffic, SecurityAnalzyerPort);"
  },
  {
    question: "Why are structured cabling patch cords made with stranded copper while wall cables use solid copper?",
    shortAnswer: "Solid copper has lower attenuation over long in-wall distances (up to 90m) but is brittle; stranded copper is flexible and resistant to repeated bending, making it ideal for short patch cords (1-5m).",
    explanation: "Using solid copper patch cords at desks causes internal wire fatigue and intermittent disconnections from repeated chair movements and desktop shifts.",
    hint: "Solid wire for permanent long wall runs; stranded wire for flexible short patch cords.",
    level: "expert",
    codeExample: "InWallCable = 'Solid Copper (Low Attenuation)'; PatchCord = 'Stranded Copper (Flexible)';"
  },
  {
    question: "What is an Optical Network Terminal (ONT) in modern fiber-to-the-home/office (FTTH) networks?",
    shortAnswer: "An ONT is a specialized fiber modem that terminates Gigabit Passive Optical Network (GPON) fiber cables from Internet Service Providers and converts optical wavelengths into standard RJ-45 Ethernet ports.",
    explanation: "ONTs used across Kolkata and Barrackpore connect to ISP fiber optic splitters and provide high-speed 1Gbps/10Gbps symmetric internet access to office routers.",
    hint: "Fiber-to-the-home/office terminal that turns optical fiber into ethernet ports.",
    level: "moderate",
    codeExample: "ont.convertFiberWavelengthToEthernet(1490nm_RX, 1310nm_TX, RJ45_Port1);"
  },
  {
    question: "What is the ultimate golden rule for selecting and deploying Basic Networking Components?",
    shortAnswer: "'Deploy managed switches for local segmentation; use enterprise routers and firewalls at subnets and perimeters; install certified Cat6/Fiber structured cabling with patch panels; eliminate single points of failure; and state all equipment budgets in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all foundational principles of network hardware engineering, security boundary defense, and structured enterprise budgeting.",
    hint: "Managed switches + Perimeter routers + Certified cabling + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DeployManagedSwitches() -> SecurePerimeter() -> StructuredCabling() -> BudgetInRupees(₹);"
  }
];

export default questions;
