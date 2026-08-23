const questions = [
  {
    id: 1,
    question: "What is an Intrusion Detection System (IDS) and what is its primary role in enterprise cybersecurity architecture?",
    shortAnswer: "A hardware appliance or software daemon that passively monitors network traffic or host operating system logs to detect malicious activity, policy violations, or unauthorized access, generating alerts for SOC analysts.",
    explanation: "An IDS acts as the burglar alarm and CCTV system of the enterprise network. While firewalls control what is permitted to enter, an IDS deeply inspects traffic (both North-South and East-West) to identify reconnaissance, exploit attempts, malware command-and-control beacons, and insider data theft.",
    hint: "The passive burglar alarm that inspects network traffic and sounds alerts when attacks occur.",
    level: "Basic",
    codeExample: `// The Master IDS Architecture:
// Network Traffic ---> [Sensor (Promiscuous TAP)] ---> [Detection Engine (Signatures & Heuristics)] ---> [SIEM Alert: High Severity!]`
  },
  {
    id: 2,
    question: "Who are the foundational pioneers of Intrusion Detection and what were their seminal contributions in 1980 and 1987?",
    shortAnswer: "James P. Anderson (1980) published 'Computer Security Threat Monitoring and Surveillance' establishing threat taxonomy; Dr. Dorothy Denning (1987) published 'An Intrusion-Detection Model' establishing statistical anomaly detection engines.",
    explanation: "Anderson introduced the concept that user behavior deviates from baseline norms during an intrusion. Dorothy Denning formulated the mathematical state-transition framework that underpins all modern signature, statistical, and heuristic intrusion detection engines.",
    hint: "James Anderson (1980) and Dorothy Denning (1987).",
    level: "Basic",
    codeExample: `// Historical Timeline:
// 1980: James Anderson -> Threat monitoring & classification (External vs Internal vs Clandestine)
// 1987: Dorothy Denning -> Formal state-transition model for statistical anomaly detection`
  },
  {
    id: 3,
    question: "What are the 3 foundational core subsystems that compose any Intrusion Detection System?",
    shortAnswer: "1. Sensors / Probes (Data collection subsystem); 2. Analysis / Detection Engine (Processing subsystem); 3. Alerting & Management Console (Reporting subsystem).",
    explanation: "Sensors capture raw packets or OS events via promiscuous taps; the Analysis Engine inspects the data using signature patterns or behavioral baselines; the Management Console translates matches into structured alerts (CEF/IDMEF) and forwards them to SIEM platforms.",
    hint: "Sensors, Analysis Engine, and Alerting Console.",
    level: "Basic",
    codeExample: `// 3 Core IDS Subsystems:
const idsSubsystems = {
  sensors: "Captures raw packets via TAP/SPAN ports or host agents",
  analysisEngine: "Matches payload bytes against signatures or statistical models",
  managementConsole: "Dispatches alerts to SIEM, triggers SOC workflows, and archives logs"
};`
  },
  {
    id: 4,
    question: "Explain the classic analogy: How does an Intrusion Detection System (IDS) differ fundamentally from a Firewall?",
    shortAnswer: "A Firewall is a locked door / security guard (active access control that allows or blocks packets); an IDS is a CCTV camera / burglar alarm (passive observer that monitors and alerts without dropping packets).",
    explanation: "Firewalls operate in-line and make binary forwarding decisions based on port and policy rules. An IDS operates out-of-band, performing deep payload byte matching to detect sophisticated exploits traveling inside permitted flows (e.g. SQLi on port 443), producing alerts without adding inline latency.",
    hint: "Firewall is the locked door; IDS is the burglar alarm and CCTV camera.",
    level: "Basic",
    codeExample: `// Firewall vs IDS:
// Firewall : [In-Line]     -> Drops unauthorized packets (Zero payload understanding)
// IDS      : [Out-of-Band] -> Alerts on malicious behavior inside allowed streams (Zero network latency)`
  },
  {
    id: 5,
    question: "What is 'Promiscuous Mode' in network interface cards (NICs) and why is it mandatory for Network IDS (NIDS)?",
    shortAnswer: "A mode that disables the NIC hardware MAC filter, forcing the card to capture and pass 100% of all Ethernet frames traversing the physical wire to the operating system kernel, regardless of destination MAC address.",
    explanation: "In normal mode, a NIC processes only broadcast frames and frames addressed directly to its own MAC address, dropping everything else. In promiscuous mode, an IDS sensor connected to a SPAN port or network TAP can capture and inspect all conversations occurring across the entire network segment.",
    hint: "Tells the network card to capture all packets on the wire, not just ones addressed to itself.",
    level: "Moderate",
    codeExample: `// Enabling Promiscuous Mode in Linux:
// sudo ip link set eth0 promisc on
// ip link show eth0 | grep PROMISC`
  },
  {
    id: 6,
    question: "What is the primary advantage of deploying an IDS 'Out-of-Band' (via SPAN / TAP) compared to in-line devices?",
    shortAnswer: "Zero impact on production network latency, zero bandwidth throttling, and zero risk of network outage if the IDS hardware or software crashes (Fail-Safe operation).",
    explanation: "Because an out-of-band IDS receives a passive optical or electrical copy of packets, complex regex evaluations and deep packet parsing do not delay the transmission of production traffic. If the sensor runs out of memory, production traffic continues to flow uninterrupted.",
    hint: "It does not slow down network speed, and if it crashes, the network stays up.",
    level: "Basic",
    codeExample: `// Out-of-Band Passive Tap Flow:
// Core Switch ────── [Optical Splitter / SPAN Port] ──────> Production Destination (0ms Latency)
//                             │
//                             └──── [Copied Packet Stream] ────> IDS Sensor Engine`
  },
  {
    id: 7,
    question: "What is a 'Network TAP' (Test Access Point) and why is it superior to a Switch SPAN / Mirror Port for IDS sensors?",
    shortAnswer: "A physical hardware device spliced directly into the cable that copies 100% of optical/electrical signals at line rate without dropping packets during high switch CPU load or dropping malformed CRC frames.",
    explanation: "Switch SPAN ports are software-driven and drop mirrored packets when switch CPU exceeds capacity during DDoS floods. Physical TAPs passively duplicate 100% of all frames (including malformed packets, layer-1 errors, and jumbo frames) with zero packet drop.",
    hint: "A dedicated hardware splitter that never drops packets even when switches are overloaded.",
    level: "Moderate",
    codeExample: `// Hardware TAP vs Switch SPAN:
// Switch SPAN: Software-mirrored; drops packets when switch CPU > 80%
// Physical TAP: Hardware optical beam splitter; 100% line-rate packet capture guarantee`
  },
  {
    id: 8,
    question: "What is the primary limitation of a purely passive Intrusion Detection System (IDS)?",
    shortAnswer: "An IDS can only detect and alert on attacks; it cannot actively block, drop, or terminate malicious packets in-flight, allowing single-packet exploits to succeed before the SOC can intervene.",
    explanation: "Because the IDS receives a passive copy of the packet after it has already traversed the network switch, the exploit reaches the target server at the exact same moment the IDS generates an alert. Stopping in-flight attacks requires an Intrusion Prevention System (IPS).",
    hint: "It can only sound the alarm; it cannot physically stop the attacker's packet from reaching the victim.",
    level: "Basic",
    codeExample: `// Passive Alert Delay:
// Packet arrives at Server ---> Code executes!
// Simultaneously: IDS detects exploit ---> Generates Alert ---> SOC reviews alert 3 minutes later!`
  },
  {
    id: 9,
    question: "What is 'TCP Reset Injection' (Active Response) in passive Network IDS engines?",
    shortAnswer: "When an out-of-band IDS detects an exploit, it crafts and transmits spoofed TCP packets with the RST (Reset) flag set to both the client and server to terminate the established TCP connection.",
    explanation: "To mitigate attacks without sitting in-line, an IDS can inject spoofed TCP RST packets. However, this is a race condition: if the malicious HTTP payload executes on the target server before the spoofed RST packet arrives, the breach still occurs.",
    hint: "Sending fake TCP RST packets to both sides to force the connection to close.",
    level: "Moderate",
    codeExample: `// Snort Active Response Directive:
// reject: Sends TCP RST to sender and ICMP port-unreachable to receiver`
  },
  {
    id: 10,
    question: "What are the two primary detection methodologies utilized by modern Intrusion Detection Systems?",
    shortAnswer: "1. Signature-Based Detection (Misuse Detection); 2. Anomaly-Based Detection (Heuristic / Statistical / Machine Learning Detection).",
    explanation: "Signature-based IDS compares packet bytes against a database of known exploit patterns (like antivirus). Anomaly-based IDS builds a baseline model of normal network traffic and flags statistical deviations (such as unexpected midnight database dumps or spikes in DNS queries).",
    hint: "Signature-based (matching known attacks) and Anomaly-based (detecting weird deviations from normal).",
    level: "Basic",
    codeExample: `// Detection Methodologies:
// Signature-Based: IF payload CONTAINS "\${jndi:ldap:" -> ALERT (Log4Shell)
// Anomaly-Based  : IF DNS_Query_Volume > (Baseline_Mean + 3 * Standard_Deviation) -> ALERT (DNS Tunneling)`
  },
  {
    id: 11,
    question: "What is a 'False Positive' and a 'False Negative' in IDS alert evaluation?",
    shortAnswer: "False Positive (Type I Error): Legitimate benign traffic is incorrectly flagged as an attack; False Negative (Type II Error): A real malicious attack traverses the sensor undetected without generating an alert.",
    explanation: "False positives cause alert fatigue, overwhelming SOC analysts with thousands of benign notifications. False negatives are catastrophic security failures, allowing attackers to compromise systems without security teams ever knowing.",
    hint: "False Positive = False alarm on good traffic; False Negative = Missed real attack.",
    level: "Basic",
    codeExample: `// Classification Confusion Matrix:
// True Positive  : Real attack -> Alerted (Success)
// False Positive : Good traffic -> Alerted (Noise / Alert Fatigue)
// False Negative : Real attack -> NO Alert (Catastrophic Breach!)
// True Negative  : Good traffic -> NO Alert (Normal Operation)`
  },
  {
    id: 12,
    question: "What is 'Alert Fatigue' in Security Operations Centers (SOC) and how do IDS misconfigurations cause it?",
    shortAnswer: "A condition where analysts receive tens of thousands of low-fidelity or false-positive alerts daily, leading to burnout, desensitization, and accidentally ignoring critical real attack notifications.",
    explanation: "If an IDS is configured with overly broad signatures (e.g. alerting on every failed SSH login without thresholding), analysts are flooded with 50,000 alerts a day. The Target breach in 2013 succeeded partly because real malware alerts were buried under thousands of noisy notifications.",
    hint: "When security guards receive so many false alarms that they stop checking the warnings.",
    level: "Moderate",
    codeExample: `// Mitigating Alert Fatigue via Rule Tuning:
// event_filter gen_id 1, sig_id 1002, type threshold, track by_src, count 10, seconds 60`
  },
  {
    id: 13,
    question: "What is 'Libpcap' (Packet Capture Library) and what role does it play in open-source IDS tools like Snort and Zeek?",
    shortAnswer: "A standard C/C++ system library providing a platform-independent API for low-level raw network packet capture, promiscuous sniffing, and Berkeley Packet Filter (BPF) compilation.",
    explanation: "Libpcap interacts directly with operating system kernel packet sockets (`AF_PACKET` on Linux, BPF on BSD). It bypasses standard socket layers, copying raw Layer 2 Ethernet frames directly into user-space memory buffers for IDS inspection.",
    hint: "The fundamental software library that allows IDS programs to capture raw network packets from the wire.",
    level: "Moderate",
    codeExample: `// Libpcap Capture Initialization:
// pcap_t *handle = pcap_open_live("eth0", 65535, 1, 1000, errbuf);
// pcap_loop(handle, 0, packet_handler_callback, NULL);`
  },
  {
    id: 14,
    question: "What is 'Berkeley Packet Filter' (BPF) syntax in IDS packet pre-filtering?",
    shortAnswer: "An in-kernel bytecode filter engine that allows an IDS to capture only specific traffic (e.g. `tcp and port 443 and not host 10.10.1.1`), discarding unneeded packets inside the kernel before copying to user-space.",
    explanation: "BPF filters run directly inside kernel memory via JIT compilation. Discarding streaming video or internal backup traffic at the kernel layer reduces IDS CPU utilization by 60%+, preventing packet loss on multi-gigabit links.",
    hint: "A fast kernel filter that drops unwanted traffic before the IDS spends time processing it.",
    level: "Expert",
    codeExample: `// BPF Pre-Filter Syntax:
// "tcp and (dst port 80 or dst port 443) and not net 10.10.99.0/24"`
  },
  {
    id: 15,
    question: "What is 'IDMEF' (Intrusion Detection Message Exchange Format - RFC 4765)?",
    shortAnswer: "An XML/JSON-based standard data format designed to allow diverse intrusion detection sensors, honeypots, and firewalls to share structured incident telemetry with centralized SIEM consoles.",
    explanation: "Before standardized formats, every security vendor produced proprietary log text. IDMEF defines standard data structures: Analyzer, Source, Target, Classification, and Assessment, enabling vendor-neutral alert correlation.",
    hint: "A standard XML/JSON format for sharing security incident alerts between different security tools.",
    level: "Moderate",
    codeExample: `// IDMEF XML Alert Structure:
// <IDMEF-Message><Alert><CreateTime>2026-08-23T10:30:00Z</CreateTime><Classification text="SQL-Injection"/></Alert></IDMEF-Message>`
  },
  {
    id: 16,
    question: "Where should an enterprise deploy Internal vs External Network IDS sensors?",
    shortAnswer: "External Sensors are placed outside the firewall to monitor raw Internet attack volume and scanning; Internal Sensors are placed inside the DMZ and core switch backbone to detect lateral movement and breached hosts.",
    explanation: "External sensors show the raw threat landscape hitting the border. Internal sensors are far more critical: an alert on an internal sensor means an attacker has already bypassed perimeter firewalls and is actively probing internal servers.",
    hint: "External sensors watch incoming attacks; internal sensors catch hackers who got past the front door.",
    level: "Basic",
    codeExample: `// Strategic Sensor Placement:
// Sensor 1 (External): [Internet] ---> [TAP 1] ---> [Firewall]
// Sensor 2 (Internal): [Firewall] ---> [TAP 2 (DMZ)] ---> [Core Switch (TAP 3 - East-West)]`
  },
  {
    id: 17,
    question: "What is 'Packet Dropping / Ring Buffer Overrun' in high-speed 10+ Gbps IDS sensor deployments?",
    shortAnswer: "When incoming network packet volume exceeds the sensor's CPU processing or PCI bus bandwidth, causing the kernel ring buffer to fill up and silently discard uninspected packets.",
    explanation: "If an IDS cannot keep up with multi-gigabit traffic, it drops packets. Attackers take advantage of this by generating flood noise to blind the sensor while simultaneously executing their real attack during the packet drop window. High-speed IDS uses DPDK or PF_RING to bypass kernel bottlenecks.",
    hint: "When traffic is too fast for the IDS computer, causing it to drop packets and miss attacks.",
    level: "Expert",
    codeExample: `// Checking Dropped Packets on Linux:
// ethtool -S eth0 | grep rx_dropped
// ifconfig eth0 | grep "RX dropped"`
  },
  {
    id: 18,
    question: "How does DPDK (Data Plane Development Kit) or PF_RING ZC achieve zero-copy 100 Gbps IDS packet capture?",
    shortAnswer: "By bypassing the standard Linux kernel network stack entirely, mapping NIC DMA ring buffers directly into user-space memory, and using dedicated polling CPU cores with zero context switches.",
    explanation: "Standard OS kernel interrupts introduce severe latency when processing 10 million packets per second. DPDK polls the network card hardware directly in user-space, achieving line-rate 100 Gbps packet inspection without dropping frames.",
    hint: "Bypassing the operating system kernel to read packets directly from the network card hardware.",
    level: "Expert",
    codeExample: `// DPDK Zero-Copy Performance:
// Standard Kernel: ~1-2 Million Packets/Sec per Core
// DPDK / PF_RING ZC: 14.88 Million Packets/Sec (Line Rate 10 Gbps) per Core!`
  },
  {
    id: 19,
    question: "What is 'Virtual De-Fragmentation / Session Reassembly' in Network IDS engines?",
    shortAnswer: "Buffering and reassembling fragmented IP packets and out-of-order TCP byte streams in memory before running signature pattern matching, defeating packet fragmentation evasion attacks.",
    explanation: "Attackers split attack strings across multiple packets (e.g. `GET /a` in packet 1 and `dmin` in packet 2). If an IDS inspects packets individually without stream reassembly, it misses the signature. Session reassembly reconstructs the full application stream.",
    hint: "Gluing out-of-order packets back together in memory before checking for virus signatures.",
    level: "Moderate",
    codeExample: `// Snort Stream5 / Stream6 Preprocessor:
// preprocessor stream5_global: max_tcp 262144, track_tcp yes
// preprocessor stream5_tcp: policy linux, detect_anomalies`
  },
  {
    id: 20,
    question: "How does TLS 1.3 Encryption create an architectural blind spot for passive Network IDS sensors?",
    shortAnswer: "Because 95%+ of modern web traffic is encrypted with TLS 1.3, passive out-of-band IDS sensors can only see encrypted ciphertext, making deep payload regex matching impossible without inline TLS decryption.",
    explanation: "With TLS 1.3 forward secrecy, passive sensors cannot decrypt traffic even if they possess the server certificate. Organizations overcome this using Hardware Decryption Brokers, SSL Forward Proxies, or Host-Based IDS (HIDS) agents.",
    hint: "Encryption turns packet contents into scrambled text that passive sniffers cannot read.",
    level: "Moderate",
    codeExample: `// The TLS Blind Spot:
// Encrypted TLS Stream ---> [Passive IDS Sensor: Sees Unreadable Ciphertext!] -> Cannot match SQLi/XSS`
  },
  {
    id: 21,
    question: "What is a 'Host-Based IDS' (HIDS) and why does it complement a Network IDS (NIDS)?",
    shortAnswer: "An agent installed directly on an operating system (e.g. Wazuh / OSSEC) that inspects local system calls, authentication logs, file integrity changes, and memory processes, regardless of network encryption.",
    explanation: "While a NIDS is blind to encrypted TLS payloads, a HIDS inspects data inside application memory and local logs after decryption. HIDS also detects local privilege escalation, unauthorized USB inserts, and rootkits.",
    hint: "A security monitoring program installed directly on the computer that checks local logs and files.",
    level: "Basic",
    codeExample: `// HIDS (Wazuh / OSSEC) Event Monitoring:
// Rule 5710: Failed SSH Login from 198.51.100.25 (Event ID 4625)
// Rule 550 : File /etc/shadow modified by root!`
  },
  {
    id: 22,
    question: "What is 'Behavioral Port Sweep Detection' in an IDS engine?",
    shortAnswer: "Heuristic tracking where the IDS monitors single source IPs initiating half-open SYN handshakes across multiple destination ports within a short time window, flagging automated Nmap reconnaissance.",
    explanation: "When an attacker scans an enterprise subnet, they generate hundreds of SYN packets to closed ports. The IDS detection engine tracks connection frequency; exceeding 5 distinct ports in 5 seconds triggers an automated reconnaissance alert.",
    hint: "Detecting when one IP address tries to connect to many different ports in a few seconds.",
    level: "Basic",
    codeExample: `// Port Sweep Detection Logic:
// IF DistinctPorts(SrcIP, Window=5s) >= 5:
//     Trigger Alert: "RECONNAISSANCE: Port Sweep in progress from SrcIP"`
  },
  {
    id: 23,
    question: "What is 'Protocol Anomaly Detection' in advanced IDS engines?",
    shortAnswer: "Validating that traffic traversing a port strictly conforms to official RFC specifications (e.g. verifying HTTP header syntax, DNS query formats, or RPC message structures), flagging protocol violations.",
    explanation: "If an attacker uses port 80 to tunnel an SSH shell or custom command-and-control protocol, the protocol anomaly engine flags that the stream does not begin with valid HTTP verbs (`GET/POST`), detecting the evasion immediately.",
    hint: "Checking that web traffic strictly follows official web rules, catching hidden non-web tunnels.",
    level: "Moderate",
    codeExample: `// HTTP Protocol Anomaly Check:
// IF Port == 80 AND Payload NOT MATCHES "^(GET|POST|HEAD|PUT|DELETE)\s":
//     Trigger Alert: "PROTOCOL_VIOLATION: Non-HTTP traffic detected on Port 80"`
  },
  {
    id: 24,
    question: "What is 'East-West Traffic Monitoring' and why are IDS sensors deployed on internal distribution switches?",
    shortAnswer: "Monitoring lateral traffic flowing between servers inside the datacenter (East-West) rather than traffic entering/leaving the Internet (North-South), detecting lateral attacker movement after initial breach.",
    explanation: "Over 80% of datacenter traffic is East-West (server-to-server). If a threat actor breaches one web server, they move laterally to databases and domain controllers. Deploying IDS on internal switches detects lateral worm propagation and pass-the-hash attacks.",
    hint: "Watching traffic moving sideways between internal servers to catch hackers spreading inside the network.",
    level: "Moderate",
    codeExample: `// North-South vs East-West:
// North-South: Internet <---> Perimeter DMZ
// East-West  : DMZ Web Server <---> Core Database <---> Active Directory DC (Internal Lateral Flow)`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding IDS Alert Retention and Telemetry Archiving?",
    shortAnswer: "All IDS alerts, triggered rule IDs, raw packet headers, source/destination IPs, and NPL India NTP timestamps must be retained in immutable SIEM archives for a minimum of 180 days.",
    explanation: "Under the statutory directions issued by CERT-In in 2022, organizations must preserve complete intrusion detection logs to facilitate national threat tracking and digital forensic investigations.",
    hint: "180-day retention of all IDS alerts synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Structured CERT-In Compliant IDS Alert Log:
const certInIdsLog = {
  timestamp: "2026-08-23T11:45:00.120Z",
  sensorId: "nids-barrackpore-core01",
  sigId: "2001219",
  severity: "CRITICAL",
  srcIp: "198.51.100.25",
  dstIp: "172.16.1.10",
  alertName: "ET EXPLOIT Apache Log4j JNDI RCE Attempt"
};`
  },
  {
    id: 26,
    question: "What is 'Insertion Attack' in IDS evasion taxonomy?",
    shortAnswer: "An attack where the adversary sends malformed packets (e.g. invalid checksums) that the IDS accepts and processes, but the end-target operating system discards, causing the IDS to see a different payload than the victim.",
    explanation: "If the IDS does not verify TCP checksums, an attacker sends packet `A` (bad checksum - discarded by target) and packet `B` (valid checksum - accepted by target). The IDS sees `AB` (benign), but the target executes `B` (malicious).",
    hint: "Tricking the IDS into reading junk packets that the target computer ignores.",
    level: "Expert",
    codeExample: `// Insertion Attack Mechanics:
// Packet 1: "MAL" (Bad Checksum -> Dropped by Target OS, Processed by naive IDS)
// Packet 2: "WARE" (Valid Checksum -> Target executes "WARE", naive IDS reconstructed "MALWARE" differently)`
  },
  {
    id: 27,
    question: "What is 'Evasion Attack' (TTL Evasion) in Network IDS bypassing?",
    shortAnswer: "Crafting packets with low IP Time-to-Live (TTL) values so they reach and are recorded by the IDS sensor, but expire and drop before reaching the target host located behind additional router hops.",
    explanation: "If the IDS is 2 hops away and the target is 5 hops away, the attacker sends a packet with TTL=3. The IDS processes the packet, but it drops before reaching the target. The attacker then sends the real payload with TTL=6, confusing the IDS session reconstructor.",
    hint: "Using low packet hop counters so the IDS sees a packet that dies before reaching the victim.",
    level: "Expert",
    codeExample: `// TTL Evasion Concept:
// Attacker ---> [Router 1] ---> [IDS Sensor (TTL=2: Read!)] ---> [Router 2] (TTL Expires! Target never sees it)`
  },
  {
    id: 28,
    question: "How does 'Flow / IPFIX / NetFlow Telemetry' complement Full Packet Inspection IDS?",
    shortAnswer: "Flow monitoring provides high-level metadata (who talked to whom, when, on what port, and how many bytes) across 100% of network routers with minimal storage overhead, allowing long-term behavioral trend analysis.",
    explanation: "Full packet capture (PCAP) requires petabytes of disk storage and cannot be retained for years. Flow telemetry consumes 99% less storage, allowing security teams to query network connection histories spanning 180+ days.",
    hint: "Recording summary phone-bill-style connection records instead of saving every single byte.",
    level: "Moderate",
    codeExample: `// NetFlow v9 Record Summary:
// Src: 10.10.1.50 -> Dst: 198.51.100.25 | DstPort: 443 | Packets: 450 | Bytes: 14.2 MB | Duration: 120s`
  },
  {
    id: 29,
    question: "What is 'Signature Tuning and Whitelisting' in day-to-day SOC IDS operations?",
    shortAnswer: "The ongoing operational process of refining signature parameters, adding source IP whitelists for authorized vulnerability scanners, and disabling obsolete rules to eliminate false positives.",
    explanation: "When an authorized internal Nessus scanner runs scheduled scans, it triggers 100,000 IDS alerts. Tuning involves configuring signature exceptions (`suppress` rules in Snort) so vulnerability scans do not blind SOC analysts to real adversary attacks.",
    hint: "Silencing false alarms for authorized internal tools so the alarm only rings for real hackers.",
    level: "Basic",
    codeExample: `// Snort Suppression Rule:
// suppress gen_id 1, sig_id 1002, track by_src, ip 10.10.99.50 (Vulnerability Scanner IP)`
  },
  {
    id: 30,
    question: "Synthesize the overarching role of Intrusion Detection Systems (IDS) in modern Defense-in-Depth architectures.",
    shortAnswer: "An IDS is the indispensable passive visibility and forensic detection engine of the enterprise perimeter, monitoring network traffic at wire speed, uncovering stealthy reconnaissance and lateral attacks, and feeding high-fidelity telemetry to SOC teams in compliance with CERT-In and the DPDP Act 2023.",
    explanation: "While firewalls provide essential perimeter gating, an IDS ensures continuous vigilance inside and outside the perimeter. By combining signature matching, heuristic anomaly detection, promiscuous sniffing, and real-time SIEM alerting, an IDS guarantees that security breaches are detected and contained before catastrophic data exfiltration occurs.",
    hint: "The central passive detection engine providing visibility, threat alerts, and forensic evidence for modern defense.",
    level: "Moderate",
    codeExample: `// The Master Intrusion Detection Security Formula:
// Resilient Intrusion Detection = [Promiscuous Line-Rate Sniffing] + [Deep Signature Matching] + [Heuristic Anomaly Engines] + [180-Day WORM Logs] + [NPL NTP Sync]`
  }
];

export default questions;
