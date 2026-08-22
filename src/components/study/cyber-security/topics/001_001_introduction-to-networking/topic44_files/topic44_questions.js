// topic44_questions.js
// 30 Moderate to Expert Questions on Future of Computer Networking, QKD, Post-Quantum Crypto, 6G, P4, and AI Intent Networks

const questions = [
  {
    question: "What is Quantum Key Distribution (QKD) and how does the BB84 protocol guarantee unconditional eavesdropping detection?",
    shortAnswer: "QKD transmits cryptographic keys using single photon polarization states; according to Heisenberg's Uncertainty Principle and the No-Cloning Theorem, any eavesdropper (Eve) intercepting the photons irrevocably alters their quantum states, creating a measurable Quantum Bit Error Rate (QBER > 11%) that alerts the legitimate parties to discard the key.",
    explanation: "Provides information-theoretically secure key exchange immune to computational cracking, even by future supercomputers or quantum computers.",
    hint: "Uses single photon physics where any eavesdropping attempt disturbs quantum states and alerts users.",
    level: "expert",
    codeExample: "QKD_BB84: Alice sends polarized photons -> Bob measures in random bases -> If QBER > 11% abort; else distill secret AES-256 key."
  },
  {
    question: "What is 'Q-Day' and what is Post-Quantum Cryptography (PQC)?",
    shortAnswer: "'Q-Day' is the future milestone when a cryptanalytically relevant quantum computer running Shor's algorithm becomes capable of breaking RSA and Elliptic Curve Cryptography (ECC); Post-Quantum Cryptography (PQC) comprises mathematical algorithms based on lattice problems, hash trees, and code-based cryptography that run on classical hardware and resist quantum attacks.",
    explanation: "NIST has standardized ML-KEM (Kyber) for key encapsulation and ML-DSA (Dilithium) for digital signatures.",
    hint: "The day quantum computers break current RSA encryption, requiring new math algorithms (PQC).",
    level: "basic",
    codeExample: "PQC_Hybrid: SessionKey = KDF(Classical_ECDH_Secret + PostQuantum_MLKEM_Kyber_Secret);"
  },
  {
    question: "What is 6G Wireless and how does Terahertz (THz) spectrum revolutionize mobile networking?",
    shortAnswer: "6G utilizes sub-terahertz frequencies (100 GHz to 3 THz) and ultra-massive MIMO to deliver 1 Terabit per second (Tbps) peak data rates with sub-100 microsecond latency, enabling real-time holographic teleportation, brain-computer interfaces, and micro-scale robotics.",
    explanation: "Integrates sensing and communication (ISAC), allowing cell towers in Kolkata to function simultaneously as high-resolution environmental radar.",
    hint: "Terahertz wireless frequencies delivering 1 Tbps speeds and sub-100 microsecond latency.",
    level: "moderate",
    codeExample: "6G_Spec = { Frequency: '300 GHz (THz Band)', PeakThroughput: '1 Tbps', Latency: '< 0.1 ms', Feature: 'Integrated Sensing' };"
  },
  {
    question: "What are LEO Satellite Constellations with Optical Laser Inter-Satellite Links (ISLs)?",
    shortAnswer: "Low Earth Orbit mega-constellations (e.g. Starlink, OneWeb, Kuiper) orbiting at 500–1200 km altitude, communicating with adjacent satellites via free-space optical lasers (100G ISLs) to form a high-speed space mesh router network with lower latency than undersea transoceanic fiber cables.",
    explanation: "Light travels ~47% faster in the vacuum of space than through glass optical fiber cores.",
    hint: "Low-orbit satellites using optical lasers in space to route internet faster than undersea cables.",
    level: "expert",
    codeExample: "SpaceMeshRouting: GroundTerminal_Kolkata -> Sat_A --Laser_ISL (Space Vacuum)--> Sat_B -> GroundTerminal_London"
  },
  {
    question: "What is AI-Native Intent-Based Networking (IBN)?",
    shortAnswer: "A software-defined networking paradigm where network administrators declare high-level business goals (e.g. 'Ensure zero jitter for telemedicine video between Barrackpore and Kolkata'), and AI/LLM network agents automatically configure, optimize, and self-heal routing tables, ACLs, and QoS across switches in real time.",
    explanation: "Eliminates manual CLI configuration errors and autonomously adapts to unexpected link failures or congestion.",
    hint: "Admins state business goals in plain language and AI automatically configures and self-heals the network.",
    level: "basic",
    codeExample: "IBN_Intent = 'Prioritize ICU Telemetry with < 2ms latency'; AI_Agent.translateAndDeployConfig(Switches);"
  },
  {
    question: "What is P4 (Programming Protocol-Independent Packet Processors) in programmable data plane silicon?",
    shortAnswer: "A domain-specific programming language that allows network engineers to define custom packet parsing, header manipulation, and forwarding logic directly on high-speed hardware ASIC silicon (e.g. Intel Tofino) at 25.6 Terabits/sec line rates.",
    explanation: "Allows researchers in Jadavpur to invent brand-new networking protocols without waiting years for hardware chip manufacturers to hardcode them.",
    hint: "Programming language to customize packet processing directly inside high-speed hardware switch chips.",
    level: "expert",
    codeExample: "p4_program: parser MyParser(packet_in pkt) { extract(pkt.custom_telemetry_hdr); }\ncontrol MyIngress() { apply { forward_custom(); } }"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a Laboratory Quantum Key Distribution (QKD) Optical System Pair?",
    shortAnswer: "Approximately ₹35,00,000 to ₹95,00,000 (including single-photon transmitters, avalanche photodiode detectors, polarization rotators, and classical key distillation servers).",
    explanation: "Advanced university physics and cybersecurity research labs budget QKD optical testbeds in ₹.",
    hint: "Laboratory QKD quantum system pair costs ₹35,00,000 – ₹95,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "QKD_Research_Budget = ₹48,00,000; // Dual Single-Photon QKD Terminals + Dark Fiber Interfaces"
  },
  {
    question: "What is In-Band Network Telemetry (INT) enabled by P4 switches?",
    shortAnswer: "A real-time observability framework where every switch along a packet's path inserts micro-metadata (switch ID, queue depth, egress port latency, timestamp) directly into the data packet header at wire speed, providing nanosecond-level visibility into network congestion without active probing.",
    explanation: "Pinpoints the exact switch buffer that dropped a packet in an AI supercomputing cluster within microseconds.",
    hint: "Switches add live latency and queue depth stamps directly inside passing data packets at wire speed.",
    level: "expert",
    codeExample: "PacketHeader: [Ethernet | IP | TCP | INT_Metadata: { Switch1_Latency: 120ns, Switch2_QueueDepth: 14% } | Payload]"
  },
  {
    question: "What is a Digital Network Twin in autonomous network operations?",
    shortAnswer: "A real-time software simulation and mathematical graph model of an entire physical network topology; AI engines simulate proposed routing updates, firmware patches, or attack scenarios on the digital twin to verify safety before pushing changes to live hardware.",
    explanation: "Prevents catastrophic network outages by testing complex BGP route changes in software first.",
    hint: "A live software clone of your entire network used to test changes and predict outages safely.",
    level: "moderate",
    codeExample: "digitalTwin.simulateConfigChange(NewBGPPolicy) => if (predictedPacketLoss == 0%) applyToProduction();"
  },
  {
    question: "What is Reconfigurable Intelligent Surface (RIS) in 6G wireless communication?",
    shortAnswer: "An electromagnetic smart metamaterial surface consisting of thousands of tiny sub-wavelength antennas that dynamically shift the phase and reflection angle of incoming terahertz radio waves, effectively bending radio signals around concrete buildings and obstacles.",
    explanation: "Eliminates wireless dead zones in dense urban street canyons across Kolkata.",
    hint: "Smart metamaterial wallpaper that reflects and directs 6G radio beams around walls and corners.",
    level: "expert",
    codeExample: "RIS_Array: incomingBeam(300GHz) -> DynamicPhaseShiftMatrix -> reflectedBeamDirectedToMobileUser"
  },
  {
    question: "What is Quantum Entanglement Swapping and how will Quantum Repeaters build a global Quantum Internet?",
    shortAnswer: "Because optical amplifiers destroy quantum superposition, Quantum Repeaters use Bell-state measurements and entanglement swapping to teleport quantum states across multiple fiber segments, creating long-distance quantum entanglement without measuring or copying the qubits.",
    explanation: "Enables multi-thousand-kilometer quantum secure communication between data centers in Kolkata, Mumbai, and Delhi.",
    hint: "Connects quantum computers across long distances using quantum teleportation without destroying qubits.",
    level: "expert",
    codeExample: "QuantumRepeater: Node_A <-> Repeater_1 <-> Repeater_2 <-> Node_B (Entanglement Swapping established)"
  },
  {
    question: "What is Zero Trust Architecture (ZTA - NIST SP 800-207) in modern and future networking?",
    shortAnswer: "A security framework based on the core tenet 'Never Trust, Always Verify', eliminating implicit trust based on network location; every single request is continuously authenticated, authorized, and encrypted based on user identity, device posture, and contextual risk.",
    explanation: "Replaces traditional castle-and-moat perimeter firewalls with continuous, identity-driven micro-perimeters in Ichapur.",
    hint: "'Never Trust, Always Verify' — continuously checks identity and device security for every single request.",
    level: "basic",
    codeExample: "ZTA_Engine: evaluateAccess(User, DevicePosture, Geolocation, RiskScore) => if (valid) grantDynamicSession();"
  },
  {
    question: "What is Segment Routing over IPv6 (SRv6) in next-generation optical backbones?",
    shortAnswer: "A modern source-routing architecture where the ingress router encodes a sequence of 128-bit IPv6 Segment Identifiers (SIDs) directly inside the IPv6 Routing Extension Header (Segment Routing Header - SRH), eliminating MPLS label distribution protocols (LDP/RSVP-TE).",
    explanation: "Unifies data center, enterprise WAN, and 5G/6G transport backbones into a single, clean IPv6 control plane in India.",
    hint: "Modern IPv6 source routing that embeds the entire network path inside the IPv6 packet header, replacing MPLS.",
    level: "expert",
    codeExample: "IPv6_SRH: SegmentList = [2001:db8:core1::1, 2001:db8:firewall::1, 2001:db8:core2::1] // Steers packet path"
  },
  {
    question: "What is Non-Terrestrial Network (NTN) Direct-to-Cell satellite communication?",
    shortAnswer: "A satellite technology (3GPP Rel-17/18) where LEO satellites equipped with high-gain phased array antennas communicate directly with standard, unmodified 5G/6G commercial smartphones without requiring bulky satellite dish terminals.",
    explanation: "Provides 100% voice and SOS text coverage across remote forests, deserts, and maritime waters in West Bengal.",
    hint: "Satellites connecting directly to standard mobile phones anywhere on Earth without special hardware.",
    level: "moderate",
    codeExample: "DirectToCell: Unmodified_Phone -> (Standard 3GPP 5G NR Band) -> LEO_Satellite -> Telecom_Core"
  },
  {
    question: "What is Quantum Random Number Generation (QRNG) in hardware cryptography?",
    shortAnswer: "A hardware security component that generates true, mathematically non-deterministic random numbers by measuring inherently unpredictable quantum physical phenomena (e.g. photon arrival time or quantum tunneling shot noise), replacing pseudo-random number generators.",
    explanation: "Generates uncrackable cryptographic seeds for banking and military encryption keys in Barrackpore.",
    hint: "Creates truly unpredictable random numbers by measuring quantum physics particles.",
    level: "moderate",
    codeExample: "QRNG_Output = measureQuantumPhotonArrivalNoise(); // Truly non-deterministic cryptographic entropy"
  },
  {
    question: "What is Time-Sensitive Networking (TSN - IEEE 802.1Qbv / 802.1Qbu) in Industrial Automation?",
    shortAnswer: "A suite of IEEE Layer-2 standards that provides deterministic, sub-microsecond guaranteed packet delivery and microsecond-precise clock synchronization (IEEE 802.1AS) over standard Ethernet for factory robotics and autonomous automotive drivetrains.",
    explanation: "Guarantees that emergency robotic collision-avoidance commands in factory plants are delivered with zero jitter.",
    hint: "Ethernet standard delivering guaranteed sub-microsecond timing for industrial robots and self-driving cars.",
    level: "expert",
    codeExample: "TSN_Scheduler: TimeAwareShaper { ProtectedQueue_Window: 100μs, BestEffortQueue_Window: 900μs }"
  },
  {
    question: "What is Edge Computing (MEC - Multi-Access Edge Computing) in 5G/6G Networks?",
    shortAnswer: "Deploying micro-data centers and AI GPU clusters at the telecom cell tower edge (within 5 km of users), processing video analytics and autonomous vehicle sensor data locally with sub-5ms latency rather than sending all data to distant cloud regions.",
    explanation: "Enables smart city traffic cameras in Kolkata to detect road accidents in real time without saturating long-haul fiber pipes.",
    hint: "Placing small data centers near cell towers to process data locally with ultra-low latency.",
    level: "basic",
    codeExample: "MEC_Architecture: UserDevice -> 5G_Cell_Tower -> Local_MEC_AI_Node (3ms Latency) -> Response"
  },
  {
    question: "What is Post-Quantum TLS 1.3 Key Encapsulation (X25519 + Kyber768)?",
    shortAnswer: "A hybrid cryptographic key exchange in TLS 1.3 where the client and server negotiate both classical Elliptic Curve Diffie-Hellman (X25519) and lattice-based ML-KEM (Kyber768), combining classical battle-tested security with quantum resistance.",
    explanation: "Now supported by modern web browsers and major cloud CDNs to protect current encrypted traffic from 'Harvest Now, Decrypt Later' quantum attacks.",
    hint: "Combines classical elliptic curves with lattice-based Kyber math to resist quantum computer attacks.",
    level: "moderate",
    codeExample: "TLS1.3_CipherSuite: TLS_AES_256_GCM_SHA384 with KeyShare: [X25519, ML-KEM-768 (Kyber)]"
  },
  {
    question: "What is TeraHertz Wireless Channel Path Loss and why are Beamforming Arrays required?",
    shortAnswer: "Atmospheric gases (oxygen and water vapor) cause massive molecular absorption attenuation at 100 GHz–1 THz frequencies; ultra-massive phased-array antennas use narrow, high-gain pencil beamforming to focus radio energy directly at the target receiver to overcome path loss.",
    explanation: "Allows 6G transceivers to transmit multi-gigabit data across hundreds of meters despite severe atmospheric absorption.",
    hint: "Terahertz signals fade fast in air, so massive antenna arrays focus radio waves into tight laser-like beams.",
    level: "expert",
    codeExample: "BeamformingGain: ArrayElements = 1024; Focuses_300GHz_Beam into 1.5-degree pencil beam."
  },
  {
    question: "What is Self-Driving / Self-Organizing Network (SON) AI in 5G/6G Radio Access Networks?",
    shortAnswer: "An AI system that autonomously adjusts cell tower radio transmit power, antenna tilt angles, and handover thresholds in real time based on user crowd density and interference patterns, maximizing spectral efficiency with zero human intervention.",
    explanation: "Automatically boosts radio capacity around Eden Gardens stadium in Kolkata during major cricket matches.",
    hint: "AI that automatically tunes cell tower power and antennas to handle crowd surges without human engineers.",
    level: "basic",
    codeExample: "SON_AI: if (stadiumCrowdDetected) increaseMIMOAntennaGain() && triggerLoadBalancing();"
  },
  {
    question: "What is In-Network Computing in Modern Data Centers?",
    shortAnswer: "Offloading compute tasks (such as distributed AI gradient aggregation, MapReduce filtering, or cryptographic hashing) directly onto programmable switch silicon (P4 ASICs), executing computation inside the network while packets transit between GPU nodes.",
    explanation: "Reduces AI deep learning training time by over 30% by eliminating redundant GPU-to-CPU data roundtrips.",
    hint: "Performing AI math calculations directly inside network switches while data packets fly through.",
    level: "expert",
    codeExample: "P4_Switch: onPacketIn(GradientUpdate) => aggregateVectorSumInASICRegisters() && forwardMergedGradient();"
  },
  {
    question: "What is 'Harvest Now, Decrypt Later' (HNDL) Threat in Cyber Warfare?",
    shortAnswer: "A nation-state espionage strategy where adversaries intercept and store encrypted diplomatic, banking, and military data today, intending to decrypt it once cryptanalytically relevant quantum computers become operational in the future.",
    explanation: "Compels immediate migration to Post-Quantum Cryptography (PQC) for all long-lived confidential government records in West Bengal.",
    hint: "Hackers steal and save encrypted files today to decrypt them with future quantum computers.",
    level: "basic",
    codeExample: "HNDL_Defense: MigrateToPQC_Immediately() -> EncryptWith_MLKEM_Kyber() -> NeutralizeFutureDecryption;"
  },
  {
    question: "What is Space-Air-Ground Integrated Network (SAGIN)?",
    shortAnswer: "A multi-layered 6G communications fabric integrating Low/Medium/Geostationary Earth Orbit satellites, High-Altitude Platform Stations (HAPS / solar stratospheric drones), and terrestrial cellular towers into a unified, self-organizing global mesh.",
    explanation: "Provides continuous high-speed broadband to commercial aircraft, oceanic ships, and rural villages across India.",
    hint: "Combines satellites, high-altitude drones, and ground towers into one seamless global network.",
    level: "moderate",
    codeExample: "SAGIN_Layers = ['Space (LEO Satellites)', 'Air (Stratospheric HAPS Drones)', 'Ground (5G/6G Towers)'];"
  },
  {
    question: "What is Holographic Telepresence Bandwidth and Latency Requirement?",
    shortAnswer: "Real-time 3D interactive holographic streaming capturing volumetric point clouds requires 100 Gbps to 1 Tbps aggregate bandwidth and sub-5ms deterministic end-to-end latency with sub-millisecond jitter to prevent human motion sickness.",
    explanation: "Requires 6G terahertz wireless and edge AI rendering fabrics to deliver lifelike remote medical consultations.",
    hint: "Requires 100 Gbps to 1 Tbps bandwidth and sub-5ms latency for lifelike 3D holographic video.",
    level: "moderate",
    codeExample: "Holographic_Stream = { Bitrate: '450 Gbps Volumetric Point Cloud', MaxLatency: '3.5 ms', Jitter: '0.2 ms' };"
  },
  {
    question: "What is Optical Circuit Switching (OCS) in AI Hyperscale Data Centers?",
    shortAnswer: "Using micro-electro-mechanical systems (MEMS) motorized micro-mirrors to dynamically redirect optical light beams directly between fiber ports without converting photons to electrons (O-E-O), slashing data center power consumption by over 90%.",
    explanation: "Google and other hyperscalers use OCS to interconnect tens of thousands of TPU/GPU supercomputing chips for AI training.",
    hint: "Uses tiny motorized mirrors to direct light beams inside data centers without power-hungry electrical conversions.",
    level: "expert",
    codeExample: "OCS_Fabric: Laser_Tx --MEMS_MicroMirror (Pure Light)--> Laser_Rx (Zero Electrical Packet Processing)"
  },
  {
    question: "What is Bio-Molecular Nanocommunication in future nanotechnology?",
    shortAnswer: "Using chemical molecular signaling (engineered biological molecules, DNA sequences, and calcium ion pulses) to transmit data between nano-scale robots operating inside the human bloodstream for targeted drug delivery and medical sensing.",
    explanation: "Represents the frontier of medical networking where data is encoded in chemical concentrations rather than electromagnetic waves.",
    hint: "Transmitting data inside the human body using chemical molecules and DNA for medical nanorobots.",
    level: "expert",
    codeExample: "Molecular_Packet: { Carrier: 'Lipid Nanoparticle', Payload: 'Targeted Chemotherapy DNA Token' };"
  },
  {
    question: "What is Wi-Fi 7 (IEEE 802.11be) Multi-Link Operation (MLO)?",
    shortAnswer: "A breakthrough wireless feature that allows a client device to simultaneously send and receive data across multiple frequency bands (2.4 GHz, 5 GHz, and 6 GHz) over bonded channels up to 320 MHz wide, delivering 46 Gbps speeds and deterministic sub-5ms latency.",
    explanation: "Eliminates wireless latency spikes for VR headsets and robotics in smart factories in Barrackpore.",
    hint: "Allows devices to transmit data across 2.4 GHz, 5 GHz, and 6 GHz bands at the exact same time.",
    level: "moderate",
    codeExample: "MLO_State: Device transmits Packet_A on 6GHz channel (320MHz) and Packet_B on 5GHz channel (160MHz) simultaneously."
  },
  {
    question: "What is IPv6-Only Underlay with MAP-T / 464XLAT Transition in National Networks?",
    shortAnswer: "Architecting the entire national ISP and enterprise core network exclusively on native IPv6, using stateless translation (MAP-T) or dual-translation (464XLAT) at the edge to carry legacy IPv4 traffic, eliminating IPv4 address exhaustion and complex NAT444 middleboxes.",
    explanation: "India leads the world in native IPv6 deployment, with telecom providers routing over 85% of traffic natively on IPv6.",
    hint: "Running core networks on pure IPv6 while translating legacy IPv4 traffic smoothly at the edges.",
    level: "basic",
    codeExample: "464XLAT: IPv4_App -> CLAT (Translates to IPv6) -> IPv6_Only_ISP_Core -> PLAT (Translates to IPv4 Web)"
  },
  {
    question: "What is Sovereign AI Cyber Defense in Autonomous Network Security?",
    shortAnswer: "An AI system trained on national threat telemetry that autonomously analyzes network flow anomalies, synthesizes real-time mitigation playbooks, generates firewall ACLs, and isolates compromised endpoints in milliseconds during hybrid warfare attacks.",
    explanation: "Protects critical national infrastructure and communication backbones from automated foreign cyber weapon strikes in Kolkata.",
    hint: "AI security system that detects and blocks cyber attacks automatically in milliseconds.",
    level: "basic",
    codeExample: "AutonomousDefense: DetectZeroDayAttack() -> GenerateDynamicP4Filter() -> DeployToEdgeSwitches(15ms);"
  },
  {
    question: "What is the ultimate golden rule for understanding, engineering, and pioneering the Future of Computer Networking?",
    shortAnswer: "'Embrace Quantum Key Distribution (QKD) and Post-Quantum Cryptography (PQC) for uncrackable security; harness 6G terahertz and LEO space laser meshes for ubiquitous global connectivity; programmize silicon with P4 and INT; empower autonomous self-healing networks with AI intent; and budget pioneering research in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes quantum physical security, post-quantum resilience, terahertz and space networking, programmable silicon, AI autonomy, and financial research budgeting.",
    hint: "QKD + Post-Quantum Cryptography + 6G Space Lasers + P4 programmable silicon + AI intent + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DeployQKD_PQC() -> Build6G_LaserSpaceMesh() -> ProgramSiliconWithP4() -> AutomateWithAIIntent() -> BudgetInRupees(₹);"
  }
];

export default questions;
