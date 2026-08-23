const questions = [
  {
    id: 1,
    question: "What are the 3 primary network traffic interception and sensor deployment architectures utilized in modern intrusion detection?",
    shortAnswer: "1. Hardware Network TAP (Physical Layer 1 optical/electrical splitting); 2. Switch Port Analyzer (SPAN / Mirror Port Layer 2 software duplication); 3. In-Line Active Insertion (Layer 2/3 transparent bridge/routed mode).",
    explanation: "TAPs split physical light on fiber for 100% line-rate capture; SPAN ports use the switch operating system to copy packets to a monitoring port; In-line insertion places the sensor directly in the live data path to enable active packet dropping.",
    hint: "Physical Hardware TAPs, Switch SPAN mirror ports, and In-Line bridge placement.",
    level: "Basic",
    codeExample: `// 3 Deployment Architectures:
// 1. Hardware TAP : Fiber Link ──[Passive Prism Splitter]──> IDS Sensor (0% Packet Drop)
// 2. Switch SPAN  : Switch ASIC ──[Software Copy]──> SPAN Port (Subject to Oversubscription)
// 3. In-Line IPS  : Ingress Port ──[Inspection CPU / Bypass Relay]──> Egress Port`
  },
  {
    id: 2,
    question: "Why do Switch SPAN / Mirror Ports suffer from 'Oversubscription Packet Drops' during high traffic loads?",
    shortAnswer: "Because a full-duplex 10 Gbps link can transmit 10 Gbps TX and 10 Gbps RX simultaneously (20 Gbps total); attempting to mirror 20 Gbps of aggregate bidirectional traffic onto a single 10 Gbps SPAN destination port causes internal buffer overflows and drops 50%+ of packets.",
    explanation: "When total mirrored ingress and egress volume exceeds the bandwidth capacity of the destination monitor port, the switch ASIC has no choice but to discard excess frames silently, creating huge blind spots for the IDS.",
    hint: "Trying to squeeze 20 Gbps of two-way traffic through a single 10 Gbps monitoring port drops packets.",
    level: "Basic",
    codeExample: `// SPAN Oversubscription Calculation:
// Link Load: TX = 7 Gbps, RX = 6 Gbps ➔ Aggregate = 13 Gbps
// Destination SPAN Port Capacity = 10 Gbps
// Packet Drop Rate = (13 Gbps - 10 Gbps) / 13 Gbps = 23.07% Packet Loss!`
  },
  {
    id: 3,
    question: "How does a Physical Optical Network TAP guarantee 100% line-rate packet capture with zero packet loss?",
    shortAnswer: "By using fused optical prisms that physically split the light beam into two separate paths (e.g. 70% to destination, 30% to IDS) with separate dedicated fiber strands for TX and RX, eliminating all electronic buffers and CPU bottlenecks.",
    explanation: "Because an optical TAP operates purely on the physics of light refraction at Layer 1, it has no memory buffers to overflow, no operating system, and no packet processing engine. It mirrors 100% of packets, including jumbo frames and runt frames, at the speed of light.",
    hint: "It uses physical glass prisms to split light directly, without computers or buffers.",
    level: "Basic",
    codeExample: `// Optical Splitter Architecture:
// Incoming Laser Beam (100%) ➔ [Fused Optical Prism] ➔ 70% Transmitted to Production Server
//                                                  └──> 30% Redirected to IDS Sensor`
  },
  {
    id: 4,
    question: "Why does a Switch SPAN port discard Layer-1 and Layer-2 malformed frames (CRC errors, runt packets) before the IDS can inspect them?",
    shortAnswer: "Because the switch MAC controller hardware ASIC automatically validates and discards corrupt Ethernet frames (bad Frame Check Sequence - FCS) before the switch operating system can mirror them to the SPAN port.",
    explanation: "Attackers deliberately craft malformed packets or Layer-2 frames with bad CRC checksums to exploit specific network drivers. Because a switch drops these frames before mirroring, a SPAN-connected IDS never sees the attack, whereas an optical TAP captures the raw corrupted signals perfectly.",
    hint: "Switches automatically throw away broken or corrupted packets before copying them to SPAN ports.",
    level: "Moderate",
    codeExample: `// Frame Filtering Difference:
// Bad CRC Frame ➔ [Switch Port] ➔ Dropped by Switch ASIC! (SPAN sees nothing)
// Bad CRC Frame ➔ [Optical TAP] ➔ Captured at Layer 1 ➔ IDS detects malformed attack!`
  },
  {
    id: 5,
    question: "What is 'Optical Insertion Loss' (dB) and what is the difference between a 70/30 and a 50/50 split ratio?",
    shortAnswer: "Insertion loss is the reduction in optical laser power caused by inserting the TAP prism; a 70/30 split sends 70% light to production (~1.8 dB loss) and 30% to IDS (~5.8 dB loss); a 50/50 split sends equal 50% light to both (~3.4 dB loss each).",
    explanation: "Network engineers calculate the optical power budget: if the production fiber run is long (e.g. 10 km), a 70/30 split ensures the live link retains maximum light power (~1.8 dB loss) while the co-located IDS sensor uses sensitive receiver optics to capture the 30% split.",
    hint: "70/30 gives most light to the live network; 50/50 splits light evenly between network and sensor.",
    level: "Moderate",
    codeExample: `// Optical Power Budget Calculation:
// Laser TX Power = -2.0 dBm | TAP Insertion Loss (70%) = -1.8 dB | Fiber Loss = -4.0 dB
// Received RX Power = -7.8 dBm (Must be > Receiver Sensitivity of -14.0 dBm)`
  },
  {
    id: 6,
    question: "What is a 'Network Packet Broker' (NPB) and what role does it serve in high-speed enterprise IDS sensor farms?",
    shortAnswer: "A specialized hardware switch that aggregates traffic from dozens of optical TAPs, deduplicates redundant packets, filters unneeded streaming media, and load-balances flows across a cluster of IDS appliances using 5-tuple hashing.",
    explanation: "Instead of connecting 20 separate IDS sensors to 20 individual switches, all TAPs feed into an NPB matrix. The NPB strips backup and video traffic, ensuring that only security-relevant traffic is delivered across the IDS sensor cluster.",
    hint: "A traffic management hub that collects TAP data, removes video junk, and load-balances to sensors.",
    level: "Moderate",
    codeExample: `// Network Packet Broker Architecture:
// 20x 10G Optical TAPs ➔ [Network Packet Broker (Filter & Deduplicate)] ➔ 4x 10G Suricata IDS Cluster`
  },
  {
    id: 7,
    question: "Why is 'Symmetrical 5-Tuple Session Hashing' mandatory when load-balancing traffic across multiple IDS sensors via an NPB?",
    shortAnswer: "To guarantee that both forward (Client -> Server) and reverse (Server -> Client) packets of a TCP session are delivered to the exact same physical IDS appliance for accurate stateful TCP reassembly.",
    explanation: "If an NPB routed the client's SYN packet to Sensor 1 and the server's SYN-ACK packet to Sensor 2, neither sensor would observe the complete 3-way handshake, breaking stateful inspection and causing false alarms.",
    hint: "Ensuring both sides of a phone call go to the same security guard so they can hear the full conversation.",
    level: "Expert",
    codeExample: `// Symmetrical Flow Hash Formula:
// HashKey = Hash( (SrcIP XOR DstIP) || (SrcPort XOR DstPort) || Protocol ) ➔ Same Sensor for both directions!`
  },
  {
    id: 8,
    question: "What is 'Regenerating TAP (1-to-Many Replication)' and when is it deployed?",
    shortAnswer: "A hardware device that captures one network link and creates multiple exact electrical or optical copies, allowing an IDS, a Network Performance Monitor (NPM), and a compliance recorder to monitor the same link simultaneously.",
    explanation: "If an organization needs to feed a live 10 Gbps link to Snort, Zeek, and an extra forensic pcap recorder, a 1-to-3 Regenerating TAP duplicates the signal without creating multiple physical splices.",
    hint: "A hardware splitter that makes 3 or 4 exact copies of a single network cable for different security tools.",
    level: "Basic",
    codeExample: `// Regenerating TAP Flow:
// Production Wire ──[Regenerating TAP]──┬──> Copy 1: Snort NIDS
//                                       ├──> Copy 2: Zeek Flow Logger
//                                       └──> Copy 3: 180-Day PCAP Recorder`
  },
  {
    id: 9,
    question: "Why is Switch SPAN monitoring problematic on switches running under high CPU load (> 80%)?",
    shortAnswer: "Because network switches prioritize Layer 2/3 production packet forwarding over SPAN mirroring; when the switch CPU is stressed, it automatically throttles and drops mirrored SPAN packets to protect production routing.",
    explanation: "During a volumetric DDoS attack or broadcast storm, switch CPU utilization spikes to 95%. The switch drops SPAN traffic first, effectively blinding the SOC's IDS sensors at the exact moment a critical security incident is occurring.",
    hint: "When a switch gets overloaded, it stops copying packets to the security monitor to save its own CPU.",
    level: "Basic",
    codeExample: `// Switch Priority Queue:
// Priority 1: Production Forwarding (Protected)
// Priority 2: Control Plane BGP/OSPF (Protected)
// Priority 3: SPAN Mirroring ➔ THROTTLED & DROPPED DURING CPU SPIKES!`
  },
  {
    id: 10,
    question: "What is 'RSPAN' (Remote SPAN) and 'ERSPAN' (Encapsulated Remote SPAN) in multi-switch enterprise datacenters?",
    shortAnswer: "RSPAN mirrors switch traffic across a dedicated Layer 2 VLAN to a remote switch; ERSPAN encapsulates mirrored packets inside GRE (Generic Routing Encapsulation) tunnels over Layer 3 IP networks to a centralized sensor.",
    explanation: "In large datacenters with 50 top-of-rack switches, installing a sensor on every rack is cost-prohibitive. ERSPAN encapsulates packets into GRE (IP protocol 47) and routes them across the IP backbone to a central monitoring cluster.",
    hint: "Tunneling mirrored packets across the network to a central security server in another building.",
    level: "Moderate",
    codeExample: `// Cisco ERSPAN Configuration:
// monitor session 1 type erspan-source
//   source interface TenGigabitEthernet1/1
//   destination ip 10.10.99.100 (Centralized NIDS Sensor IP)`
  },
  {
    id: 11,
    question: "What is the 'Fail-Open Optical Bypass Switch' deployed with in-line IPS appliances?",
    shortAnswer: "A physical mechanical relay switch placed in-line on the fiber cable that maintains optical path connectivity through internal prisms during normal operation, but snaps closed to connect the two cables directly within 8ms if the IPS loses power.",
    explanation: "Without an external bypass switch, pulling the power plug on an in-line IPS breaks the physical fiber circuit and severs all internet connectivity for the datacenter. The bypass switch guarantees 100% network uptime.",
    hint: "A mechanical switch that bridges the fiber optic cables together if the security device loses power.",
    level: "Basic",
    codeExample: `// Optical Bypass States:
// Online Mode : Port A ──> [IPS Inspection Cores] ──> Port B
// Bypass Mode : Port A ───────── [Mechanical Relay] ─────────> Port B (Zero delay on power loss)`
  },
  {
    id: 12,
    question: "What is 'VLAN Tag Stripping / Header Truncation' in Network Packet Brokers?",
    shortAnswer: "Removing outer 802.1Q/QinQ VLAN tags or truncating long packet payloads to only the first 128 bytes (headers only), reducing downstream IDS bandwidth consumption by 80%+.",
    explanation: "If an IDS only needs Layer 3/4 headers for flow analysis or port scan detection, truncating packet payloads at the NPB layer eliminates petabytes of unnecessary storage and CPU load on the sensor.",
    hint: "Chopping off the body of packets and keeping only the headers to save sensor memory.",
    level: "Moderate",
    codeExample: `// NPB Header Truncation Policy:
// Rule: On Port 1, truncate packets to 128 bytes (Keep IP/TCP headers, drop video/data payload)`
  },
  {
    id: 13,
    question: "Why should Network TAPs NEVER possess an IP address or MAC address on their monitoring ports?",
    shortAnswer: "To ensure the tap is 100% physically invisible, un-routable, un-hackable, and electrically non-intrusive on the production network segment, preventing attackers from discovering or attacking the sensor tap.",
    explanation: "A passive optical TAP has no IP stack, no MAC address, and no software operating system. An attacker on the wire cannot ping it, port scan it, or compromise it because it does not exist as an addressable entity on the network.",
    hint: "Because a device with no IP address cannot be hacked, scanned, or detected by attackers.",
    level: "Basic",
    codeExample: `// TAP Stealth Characteristic:
// Ping TAP: Request Timed Out (No IP) | ARP Probe: 0 Response (No MAC) | Physical Reality: Splitting 100% of light`
  },
  {
    id: 14,
    question: "What is 'Unidirectional Data Diode / Tx-Only Disconnect' on IDS sensor capture interfaces?",
    shortAnswer: "Physically cutting or disconnecting the Transmit (TX) fiber strand on the IDS sensor's network card, ensuring the sensor can only receive (RX) packets and is physically incapable of transmitting data back onto the wire.",
    explanation: "In high-security banking and defense environments, a hardware data diode guarantees that even if a hacker completely compromises the IDS sensor, they cannot inject packets back into the production network through the capture card.",
    hint: "Disconnecting the transmit wire so the sensor can only listen and can never send data back onto the wire.",
    level: "Expert",
    codeExample: `// Hardware Data Diode Connection:
// Production TAP ─────── [Fiber RX Strand Connected] ───────> IDS Sensor NIC
//                         [Fiber TX Strand Physically Cut!] ──x (Zero Injection Capability)`
  },
  {
    id: 15,
    question: "What is 'Packet Deduplication' in Network Packet Brokers when aggregating multiple TAPs?",
    shortAnswer: "Detecting and discarding identical packet copies when the same packet is captured by multiple TAPs along its routing path (e.g. at the edge firewall and again at the core switch).",
    explanation: "If a packet crosses 3 switches with TAPs, the IDS would receive 3 identical copies, tripling CPU load and causing false anomaly counts. The NPB maintains a rolling hash table to discard duplicate frames within a 10ms window.",
    hint: "Deleting duplicate copies of the same packet captured at multiple points along the network wire.",
    level: "Moderate",
    codeExample: `// NPB Deduplication Hash:
// Packet 1 (Edge TAP) : Hash = 0x8A12FC ➔ Sent to Sensor
// Packet 2 (Core TAP) : Hash = 0x8A12FC (Duplicate within 5ms) ➔ Discarded!`
  },
  {
    id: 16,
    question: "How does 'Tap Density & Rack Unit Sizing' impact datacenter physical infrastructure design?",
    shortAnswer: "High-density modular TAP panels support up to 24 or 48 LC fiber taps in a single 1U rack unit, minimizing datacenter footprint and cabling complexity.",
    explanation: "In large enterprise datacenters with hundreds of 10G/40G fiber links, deploying individual bulky taps creates cabling chaos. High-density 1U optical patch panels consolidate 48 taps into a clean, passive rack chassis.",
    hint: "Fitting 48 fiber splitters into a single 1U rack space to keep datacenter wiring neat.",
    level: "Basic",
    codeExample: `// 1U Modular TAP Chassis:
// 1U Rack Panel ➔ 24x Multi-Mode LC Fiber TAPs (48 Ingress/Egress Ports + 48 Monitor Ports)`
  },
  {
    id: 17,
    question: "What is 'SPAN Port Contention / Packet Dropping' when multiple engineers configure overlapping SPAN sessions?",
    shortAnswer: "When multiple network engineers configure simultaneous SPAN sessions on the same switch, exceeding the internal backplane replication bandwidth of the switch ASIC and causing packet drops on all sessions.",
    explanation: "Enterprise switches have strict limits (e.g. maximum 2 or 4 concurrent SPAN sessions). Exceeding these limits exhausts switch hardware replication buffers, leading to unpredictable packet drops across monitoring tools.",
    hint: "Setting up too many mirror sessions on one switch overloads the switch's internal copying chip.",
    level: "Moderate",
    codeExample: `// Cisco Catalyst SPAN Session Limit:
// % SPAN: Maximum number of active SPAN sessions (2) reached. Cannot enable session 3.`
  },
  {
    id: 18,
    question: "What is 'Virtual TAP' (vTAP) in cloud and virtualized environments (AWS / VMware ESXi / Kubernetes)?",
    shortAnswer: "A software kernel agent or cloud-native service (e.g. AWS VPC Traffic Mirroring / VMware vSphere Distributed Switch Port Mirroring) that mirrors virtual machine and container traffic to a virtual IDS appliance.",
    explanation: "Because physical hardware TAPs cannot be spliced inside cloud hypervisors (AWS EC2 / Azure VMs), cloud providers implement vTAPs (VXLAN encapsulation) to replicate virtual NIC traffic to centralized security analyzers.",
    hint: "Software mirrors that copy virtual machine network traffic inside cloud datacenters like AWS.",
    level: "Moderate",
    codeExample: `// AWS VPC Traffic Mirroring:
// Source: ENI(web-server) ──[VXLAN Tunnel on UDP 4789]──> Target: ENI(suricata-ids-sensor)`
  },
  {
    id: 19,
    question: "Why does deploying an In-Line IPS require careful 'Maximum Transmission Unit' (MTU) considerations?",
    shortAnswer: "Because in-line normalization or packet encapsulation (VLAN tagging, QinQ, GRE) can increase frame size beyond the standard 1500-byte MTU, causing fragmentation or silent packet drop unless Jumbo Frames (9000 bytes) are enabled.",
    explanation: "If an IPS encapsulates packets or reassembles fragmented streams without proper MTU sizing, oversized packets exceed switch interface MTU limits and are dropped. In-line interfaces should be configured with 9216-byte MTU.",
    hint: "Making sure the security device can handle large packets without cutting them in half.",
    level: "Expert",
    codeExample: `// Linux Interface MTU Configuration for Inline IPS:
// sudo ip link set dev eth0 mtu 9000`
  },
  {
    id: 20,
    question: "What is 'Active TAP (Copper / 1000BASE-T)' and how does it differ from a Passive Optical TAP?",
    shortAnswer: "Copper TAPs require electrical power to regenerate and duplicate electrical signals across RJ-45 cables, utilizing internal battery backups or mechanical relays to prevent link failure during power outages.",
    explanation: "Unlike fiber optic light (which can be passively split with prisms), copper electrical signals cannot be physically spliced without impedance mismatch and signal destruction. Active copper TAPs use transceivers to regenerate clean signals.",
    hint: "Copper wire splitters require electrical power to copy signals; fiber splitters work passively without power.",
    level: "Basic",
    codeExample: `// Copper vs Fiber TAP:
// Fiber Optical TAP : 100% Passive (No power cable, uses prisms)
// Copper 1000BASE-T  : Active Electronic Regeneration (Requires redundant power supplies)`
  },
  {
    id: 21,
    question: "What is 'Time-Stamping at Ingestion' via Network Packet Brokers (PTP / IEEE 1588)?",
    shortAnswer: "Injecting nanosecond-accurate hardware timestamps directly into the packet header at the exact microsecond the optical TAP captures the frame, eliminating software OS queue jitter for forensic analysis.",
    explanation: "When packets sit in operating system kernel queues, software timestamps fluctuate. Hardware NPBs stamp the packet in silicon with sub-microsecond GPS/PTP time, providing undisputed legal forensic timelines under Indian IT law.",
    hint: "Stamping the exact nanosecond time onto the packet hardware before software can delay it.",
    level: "Expert",
    codeExample: `// Hardware PTP Timestamp Injection:
// Packet Ingress ➔ [NPB Silicon: Appends 8-Byte IEEE 1588 Nanosecond Timestamp] ➔ Sent to SIEM Recorder`
  },
  {
    id: 22,
    question: "What is 'Port Mirroring on Wireless LAN Controllers' (WLC) in enterprise campus networks?",
    shortAnswer: "Configuring the central Wi-Fi controller to encapsulate wireless 802.11 frames traversing remote access points into an Ethernet mirror stream destined for an IDS sensor.",
    explanation: "In campus environments (e.g. university or municipal Wi-Fi in Barrackpore), monitoring wireless rogue access points and de-authentication attacks requires mirroring CAPWAP wireless frames from the WLC to the NIDS.",
    hint: "Copying Wi-Fi traffic from access points to a central security scanner.",
    level: "Moderate",
    codeExample: `// Cisco WLC Wi-Fi Sniffing:
// config ap mode sniffer <AP_Name> 10.10.99.50 (Forward raw RF 802.11 frames to NIDS)`
  },
  {
    id: 23,
    question: "How does an In-Line IPS handle 'Bypass Heartbeat Signals' to detect its own internal software failure?",
    shortAnswer: "The IPS continuously transmits high-frequency bidirectional heartbeat packets (e.g. every 50ms) between its monitoring ports; if the software engine freezes and misses 3 consecutive heartbeats, the hardware relay snaps into bypass mode.",
    explanation: "A software freeze (kernel panic) might leave physical power on while the inspection engine stops forwarding packets. Heartbeat probes ensure that software-level deadlocks instantly trigger physical fail-open bypass.",
    hint: "Sending test pings every 50ms; if the software freezes and stops pinging, the bypass relay opens immediately.",
    level: "Expert",
    codeExample: `// Bypass Heartbeat Monitor:
// IF Heartbeat_Loss_Count >= 3 (150ms timeout) ➔ Hardware Optical Relay Snaps to Bypass Mode!`
  },
  {
    id: 24,
    question: "Why should enterprise core switches deploy 'Dual-Redundant TAPs' on HA firewall uplinks?",
    shortAnswer: "To ensure that if the Active firewall fails over to the Passive firewall, optical TAPs on both primary and secondary links continue capturing 100% of telemetry without a single second of monitoring blind spots.",
    explanation: "If an engineer only installs a TAP on Firewall 1, an automated HA failover to Firewall 2 leaves the entire enterprise unmonitored. Dual TAPs feed into an NPB to provide seamless, uninterrupted coverage.",
    hint: "Putting splitters on both main and backup firewall cables so you never lose visibility during failovers.",
    level: "Basic",
    codeExample: `// Redundant TAP Matrix:
// Firewall 1 Uplink ──[TAP 1]──┬──> [Network Packet Broker] ➔ IDS Cluster (100% Uptime Guaranteed)
// Firewall 2 Uplink ──[TAP 2]──┘`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding Network TAP Telemetry and Hardware Ingestion Logs?",
    shortAnswer: "All packet capture telemetry, TAP drop statistics, SPAN port health logs, and NPL India NTP timestamps must be preserved in immutable SIEM archives for a minimum of 180 days.",
    explanation: "Under statutory cybersecurity directives, organizations must demonstrate that security sensors operated without packet drop blind spots and maintain complete 180-day forensic capture logs.",
    hint: "180-day retention of all TAP and sensor health logs synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Structured CERT-In TAP Ingestion Health Log:
const certInTapLog = {
  timestamp: "2026-08-23T12:40:00.320Z",
  device: "optical-tap-barrackpore-core01",
  splitRatio: "70/30",
  linkThroughputGbps: 18.4,
  packetDropCount: 0,
  fidelity: "100_PERCENT_LINE_RATE"
};`
  },
  {
    id: 26,
    question: "What is 'VLAN Hopping Attack Detection' on TAP-connected IDS sensors?",
    shortAnswer: "Detecting double-tagged 802.1Q Ethernet frames (`QinQ` / inner VLAN 10, outer VLAN 20) crafted by attackers to bypass Layer 2 switch isolation and inject packets into restricted subnets.",
    explanation: "Switches process only the outer VLAN tag and forward the packet; the receiving switch strips the outer tag, exposing the inner tag. An optical TAP captures the raw double-tagged frame, allowing the IDS to flag the VLAN hopping attempt.",
    hint: "Catching hackers using double-tagged packets to jump across restricted private subnets.",
    level: "Expert",
    codeExample: `// Snort VLAN Hopping Rule:
// alert ip any any -> any any (msg:"ATTACK: Double-Tagged 802.1Q VLAN Hopping Attempt"; vlan_id:*;)`
  },
  {
    id: 27,
    question: "How does 'Blind Spot Analysis' verify that all core datacenter segments have adequate TAP coverage?",
    shortAnswer: "Conducting an automated network topology audit comparing all active physical switch ports against existing TAP capture feeds to identify unmonitored lateral East-West VLANs.",
    explanation: "Security teams map every router interface and switch trunk. If an internal database cluster exists on a switch with no optical TAP or SPAN feed, it is flagged as a high-risk blind spot and remediated.",
    hint: "Auditing the network to make sure there are no hidden, unmonitored switch ports or cables.",
    level: "Moderate",
    codeExample: `// Blind Spot Coverage Metric:
// Coverage = (Total Monitored Switch Trunks / Total Physical Switch Trunks) * 100% (Target: 100%)`
  },
  {
    id: 28,
    question: "What is 'Software SPAN CPU Throttling' in Linux bridge interfaces (e.g. `tc mirred`)?",
    shortAnswer: "Using Linux Traffic Control (`tc`) to mirror packets from `eth0` to a virtual interface (`veth0`), requiring kernel CPU cycles for every packet copy.",
    explanation: "On software-based Linux routers and firewalls, `tc filter add dev eth0 action mirred egress mirror dev veth0` replicates packets in software, consuming kernel CPU and causing packet drops on multi-gigabit workloads.",
    hint: "Using Linux commands to mirror packets in software, which uses CPU power for every copy.",
    level: "Moderate",
    codeExample: `// Linux Software Mirroring:
// sudo tc qdisc add dev eth0 handle 1: root prio
// sudo tc filter add dev eth0 parent 1: protocol all u32 match u32 0 0 action mirred egress mirror dev eth1`
  },
  {
    id: 29,
    question: "What is 'Asymmetric Routing Session Stitching' in Network Packet Brokers?",
    shortAnswer: "Collecting packets from two physically separate TAPs (one on Link A for outbound, one on Link B for inbound) and recombining both halves into a single reassembled stream before feeding the IDS.",
    explanation: "In enterprise networks with redundant paths, outbound traffic travels on Link A, and return traffic travels on Link B. The NPB aggregates both TAPs, correlates the 5-tuples, and sends a single unified bidirectional stream to the IDS.",
    hint: "Recombining the two halves of a split network conversation from two different cables into one clean stream.",
    level: "Expert",
    codeExample: `// Asymmetric Session Stitching:
// TAP A (Outbound SYN) ──┬──> [Network Packet Broker (Correlates 5-Tuple)] ➔ Unified Stream ➔ IDS Sensor
// TAP B (Inbound SYN-ACK) ┘`
  },
  {
    id: 30,
    question: "Synthesize the ultimate engineering verdict: When should an architect choose Hardware TAP vs Switch SPAN vs In-Line IPS?",
    shortAnswer: "Choose Hardware Optical TAPs for 100% line-rate, zero-loss passive monitoring across critical backbones; choose Switch SPAN for temporary troubleshooting or non-critical subnets; choose In-Line IPS with Fail-Open Bypass at perimeter choke points where active blocking is mandatory.",
    explanation: "Deploying the correct capture architecture ensures that security sensors operate at 100% fidelity without introducing network outages, packet drop blind spots, or excessive hardware costs in full compliance with CERT-In and the DPDP Act 2023.",
    hint: "TAPs for critical zero-loss monitoring, SPAN for temporary testing, and In-Line IPS for active blocking.",
    level: "Moderate",
    codeExample: `// The Master Sensor Deployment Architecture:
// Perimeter Choke Point : [In-Line IPS with Optical Bypass Relays (Active Dropping)]
// Core Datacenter Links : [Hardware Optical TAPs (70/30 Split) ➔ Network Packet Broker ➔ IDS Cluster]`
  }
];

export default questions;
