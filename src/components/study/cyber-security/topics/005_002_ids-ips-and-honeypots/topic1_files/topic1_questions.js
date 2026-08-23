const questions = [
  {
    id: 1,
    question: "What is the fundamental architectural difference between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?",
    shortAnswer: "An IDS is passive and sits out-of-band (alerting on attacks without altering traffic); an IPS is active and sits directly in-line across the data path (dropping malicious packets and terminating connections in real-time).",
    explanation: "An IDS receives a mirrored copy of network traffic via a TAP or SPAN port, generating notifications for the SOC. An IPS sits in-line like a bridge; every packet must physically traverse its inspection engine before being forwarded to the target, allowing the IPS to stop single-packet exploits before they execute.",
    hint: "IDS monitors passively out-of-band; IPS sits in-line and drops packets in real-time.",
    level: "Basic",
    codeExample: `// IDS (Passive) vs IPS (In-Line):
// IDS: [Out-of-Band TAP] -> Sniffs mirrored stream -> Generates Alert (Packet reaches server!)
// IPS: [In-Line Bridge]  -> Inspects packet on wire -> DROPS packet in-flight (Exploit halted!)`
  },
  {
    id: 2,
    question: "Why does an Intrusion Prevention System (IPS) introduce latency to network traffic while a passive IDS introduces zero latency?",
    shortAnswer: "Because every packet must be buffered, decapsulated, normalized, evaluated against signature sets, and re-queued by the IPS CPU before transmission, adding 15–50 microseconds of processing delay.",
    explanation: "In an out-of-band IDS, the production packet travels directly to its destination at the speed of light over fiber, while a separate copy is sent to the sensor. In an IPS, the physical forwarding of the packet is paused until the IPS inspection engine renders a permit/drop verdict.",
    hint: "Every packet must wait for the IPS engine to inspect it before being forwarded.",
    level: "Basic",
    codeExample: `// Latency Breakdown:
// Passive IDS : Production Packet = 0 µs delay | Mirror Packet = Inspected asynchronously
// Inline IPS  : Packet Ingress -> [Buffer + Defrag + DFA Regex Match (20 µs)] -> Egress`
  },
  {
    id: 3,
    question: "What is the 'False Positive Outage Risk' in active inline IPS deployments?",
    shortAnswer: "If an IPS rule incorrectly identifies legitimate, business-critical traffic as an exploit, the IPS drops the valid transaction in real-time, causing an immediate self-inflicted business outage.",
    explanation: "In an IDS, a false positive is merely a noisy alert in the SIEM. In an IPS, a false positive drops customer payments, breaks ERP database synchronization, or disconnects medical telemetry, directly causing financial and operational damage.",
    hint: "A false alarm on an active IPS drops real customer transactions and causes system outages.",
    level: "Moderate",
    codeExample: `// False Positive Impact:
// IDS False Positive : Legitimate payment processed + False Alert in SIEM (Low business harm)
// IPS False Positive : Legitimate payment DROPPED by IPS! (Customer transaction fails!)`
  },
  {
    id: 4,
    question: "What is a 'Hardware Bypass Switch' (Optical / Electrical Relay) and why is it mandatory for inline IPS appliances?",
    shortAnswer: "A physical relay mechanism that automatically connects the ingress and egress network cables directly together (Fail-Open) within milliseconds if the IPS appliance suffers a power failure or software kernel crash.",
    explanation: "Because an IPS sits in-line, an unpowered appliance would break the physical circuit and cut off all enterprise network connectivity. Physical optical relays ensure that if the IPS dies, light passes straight through the switch, maintaining network uptime.",
    hint: "A physical mechanical relay that keeps the network running if the IPS loses power.",
    level: "Moderate",
    codeExample: `// Hardware Bypass States:
// Normal Mode : Ingress Port -> [IPS Inspection CPU] -> Egress Port
// Bypass Mode : Ingress Port ────── [Mechanical Optical Relay] ──────> Egress Port (Zero CPU)`
  },
  {
    id: 5,
    question: "What is the difference between 'Fail-Open' and 'Fail-Close' in IPS hardware failure modes?",
    shortAnswer: "Fail-Open connects the two network ports together when the appliance fails (prioritizing network availability over security); Fail-Close severs the connection (prioritizing security over availability).",
    explanation: "Commercial e-commerce and hospital networks use Fail-Open so that an IPS hardware glitch does not take down live patient monitors or checkout portals. Military and ultra-high security networks enforce Fail-Close to prevent uninspected packets from entering.",
    hint: "Fail-Open keeps the network flowing on failure; Fail-Close cuts the wire to stop uninspected traffic.",
    level: "Basic",
    codeExample: `// Failure Policies:
// Commercial Banking: Fail-Open (Bypass relays snap closed, maintaining traffic flow)
// Military Core     : Fail-Close (Traffic severed completely upon security appliance failure)`
  },
  {
    id: 6,
    question: "What is 'TCP Reset Injection' (`reject` action) and how do both IDS and IPS utilize it?",
    shortAnswer: "Transmitting spoofed TCP packets with the RST flag set to both client and server to forcefully tear down an established TCP connection socket.",
    explanation: "In an IPS, dropping the packet is usually sufficient, but sending a TCP RST cleanly notifies both endpoints that the connection was closed. In a passive IDS, sending a spoofed TCP RST is the only mechanism available to attempt terminating a connection out-of-band.",
    hint: "Sending spoofed reset packets to close the TCP connection on both ends.",
    level: "Moderate",
    codeExample: `// Snort Rule Action:
// drop   : Discards the packet silently (IPS inline only)
// reject : Discards the packet AND sends TCP RST to sender and ICMP unreachable to receiver`
  },
  {
    id: 7,
    question: "What is the recommended 3-Phase operational methodology for deploying an IPS in enterprise networks?",
    shortAnswer: "Phase 1: Deploy in Detection-Only Mode (IDS mode for 30 days); Phase 2: Tune and whitelist false positives for business traffic; Phase 3: Enable Active Inline Dropping ONLY on verified, high-confidence critical signatures.",
    explanation: "Immediately placing an IPS into active blocking mode on day one guarantees business disruption due to un-tuned signatures. A 30-day baseline learning period allows engineers to eliminate false positives before turning on enforcement.",
    hint: "Run in monitor-only mode for 30 days, tune false alarms, then turn on active blocking.",
    level: "Basic",
    codeExample: `// 3-Phase IPS Deployment:
// Month 1: Mode = 'Detection-Only' (Log alerts, zero drops)
// Month 2: Filter noise, tune internal APIs
// Month 3: Mode = 'Inline-Enforcement' for Critical CVE signatures only`
  },
  {
    id: 8,
    question: "How does an IPS protect against 'Single-Packet Exploits' (e.g. MS08-067 or Log4Shell) where a passive IDS fails?",
    shortAnswer: "An IPS inspects and drops the exploit packet before it can be transmitted out the egress interface; a passive IDS generates an alert at the exact moment the exploit packet has already reached and compromised the server.",
    explanation: "Single-packet exploits execute immediately upon arrival in the victim server's memory buffer. Because an IDS inspects an asynchronous copy, the exploit finishes executing before a human analyst or SIEM can react. An IPS halts the packet in silicon.",
    hint: "An IPS stops the packet before it touches the server; an IDS only alerts after the packet arrived.",
    level: "Basic",
    codeExample: `// Single-Packet Exploit Prevention:
// Inbound Exploit Packet ---> [IPS Inspection: Log4Shell Matched] ➔ ACTION: DROPPED! (Server never sees byte 1)`
  },
  {
    id: 9,
    question: "What is 'Dynamic Firewall ACL Updating' (Automated Threat Response) via IPS engines?",
    shortAnswer: "When an IPS detects brute-force scanning from an external IP, it issues an automated API request to the edge perimeter firewall to temporarily block the offending source IP address for 1–24 hours.",
    explanation: "Rather than handling repeated attacks in deep software inspection, the IPS offloads blocking to the edge firewall's fast hardware ASIC layer, freeing the IPS CPU to inspect other application flows.",
    hint: "The IPS tells the edge firewall to block the attacking IP address automatically.",
    level: "Moderate",
    codeExample: `// IPS Automated API Block Request:
// POST https://firewall.bank.gov.in/api/v1/dynamic_block
// Payload: { "src_ip": "198.51.100.25", "duration_seconds": 3600, "reason": "IPS_EXPLOIT_TRIGGER" }`
  },
  {
    id: 10,
    question: "What is 'Protocol Normalization / Stream Scrubbing' in an inline IPS?",
    shortAnswer: "The IPS actively cleanses traffic streams before forwarding them: re-ordering overlapping TCP segments, standardizing ambiguous HTTP encoding, and stripping illegal characters to defeat evasion attacks.",
    explanation: "Attackers deliberately craft non-standard HTTP requests or overlapping TCP segments to confuse signature engines. An inline IPS normalizes the stream into a clean canonical format before passing it to backend servers.",
    hint: "Cleaning and standardizing weird or fragmented packets so hackers cannot hide attacks.",
    level: "Expert",
    codeExample: `// Snort HTTP Inspect Normalization:
// preprocessor http_inspect_server: server default, profile all, ports { 80 8080 }, normalize_utf yes`
  },
  {
    id: 11,
    question: "What is 'Rate-Limiting / Traffic Shaper Action' in an IPS?",
    shortAnswer: "Throttling the bandwidth or packet rate of a suspicious IP address or protocol rather than dropping connections completely, degrading attacker scans while avoiding total denial of service.",
    explanation: "If an IP exhibits suspicious behavior but is not definitively malicious, an IPS can throttle its connection rate to 10 packets/second. This slows down brute-force and port scanning tools without breaking legitimate users.",
    hint: "Slowing down suspicious traffic to a crawl instead of blocking it completely.",
    level: "Basic",
    codeExample: `// IPS Rate-Limiting Policy:
// SecRule IP:REQUEST_RATE "@gt 20" "action:drop_excess,rate:5/sec"`
  },
  {
    id: 12,
    question: "What are the two standard deployment modes for an in-line IPS: 'Transparent Bridge Mode' vs 'Routed Mode'?",
    shortAnswer: "Transparent Bridge Mode (Layer 2) operates like a stealth wire with no IP address visible to routers; Routed Mode (Layer 3) functions as a network hop with an assigned IP address and routing table.",
    explanation: "Transparent Bridge mode is preferred in enterprise networks because it can be dropped into an existing network cable without re-architecting subnets, modifying IP routing tables, or altering firewall rules.",
    hint: "Transparent Bridge acts like an invisible bump in the wire; Routed mode acts like a router hop.",
    level: "Moderate",
    codeExample: `// Transparent Bridge Mode:
// Switch Port ────── [IPS (Invisible Layer 2 Bridge: eth0 <-> eth1)] ──────> Router Interface`
  },
  {
    id: 13,
    question: "Why does an inline IPS require significantly more CPU and RAM processing capacity than a passive IDS on the same bandwidth link?",
    shortAnswer: "Because an IPS must inspect, normalize, and forward every single packet in real-time under hard latency deadlines; buffering delays cause packet drop, TCP retransmissions, and network stutter.",
    explanation: "An out-of-band IDS can afford minor queue delays during traffic spikes because production traffic has already been delivered. An IPS must process packets instantly in hardware memory to prevent blocking live user sessions.",
    hint: "The IPS has strict microsecond deadlines to process packets before releasing them onto the live wire.",
    level: "Moderate",
    codeExample: `// Ingest Processing Budget:
// 10 Gbps Line Rate = 14.88 Million Packets/Sec = 67.2 Nanoseconds per Packet Processing Budget!`
  },
  {
    id: 14,
    question: "What is 'Signature Confidence Level' and why should IPS drop rules be restricted to High-Confidence signatures?",
    shortAnswer: "A metric rating how specific a signature is; High-Confidence signatures match unique, unambiguous exploit patterns (0% false positives), making them safe for automatic inline packet dropping.",
    explanation: "A signature matching `admin` has low confidence and will drop benign administrative traffic. A signature matching the exact byte sequence of CVE-2021-44228 (${jndi:ldap:) has high confidence and can be set to drop inline with zero business risk.",
    hint: "Only allow automatic dropping on rules that are 100% guaranteed to be malicious exploits.",
    level: "Basic",
    codeExample: `// High Confidence Signature:
// alert tcp $EXTERNAL_NET any -> $HTTP_SERVERS 443 (msg:"EXPLOIT Log4Shell"; content:"\${jndi:"; classtype:attempted-admin; action:drop;)`
  },
  {
    id: 15,
    question: "What is 'WAF vs IPS': Why is a Network IPS insufficient for deep Layer 7 Web Application protection?",
    shortAnswer: "A Network IPS uses fixed regex and byte signatures across generic protocols; a WAF deeply terminates HTTP/HTTPS, tokenizes SQL and JavaScript grammar (Libinjection), and enforces positive parameter schemas.",
    explanation: "An IPS can detect known web exploit signatures (like known CVEs), but lacks deep semantic understanding of custom web forms, JSON API schemas, and subtle SQL injection logic, making both WAF and IPS essential together.",
    hint: "IPS handles network-wide protocol exploits; WAF specializes deeply in web forms and APIs.",
    level: "Moderate",
    codeExample: `// Defense-in-Depth Pipeline:
// [Internet] ---> [Network Firewall] ---> [Inline IPS (Protocol Exploits)] ---> [WAF (SQLi/XSS/APIs)] ---> [Web Server]`
  },
  {
    id: 16,
    question: "What is 'Virtual Patching' via an inline IPS?",
    shortAnswer: "Activating an IPS drop rule for a newly disclosed vulnerability (e.g. CVE-2023-34362 MOVEit) to block exploit packets at the network boundary while application source code is being patched.",
    explanation: "When a zero-day vulnerability is announced, testing and deploying software updates to hundreds of production servers can take weeks. Enabling an IPS virtual patch blocks the exploit string instantly, protecting vulnerable servers.",
    hint: "Using an IPS rule to block a newly discovered bug while developers work on fixing the code.",
    level: "Basic",
    codeExample: `// Virtual Patching Workflow:
// Day 0: Zero-day disclosed -> Day 1: Enable IPS Drop Rule (Exploits Blocked!) -> Day 20: Software patch deployed`
  },
  {
    id: 17,
    question: "What is 'Inline Asymmetric Routing' and why does it break stateful IPS inspection?",
    shortAnswer: "When outbound packets traverse IPS #1, but return inbound packets traverse IPS #2; because neither IPS sees both halves of the conversation, state tracking fails and connections are dropped.",
    explanation: "Stateful TCP reassembly and protocol inspection require seeing both SYN and SYN-ACK packets. If asymmetric routing splits traffic across different physical appliances, the IPS cannot track TCP sequence numbers, causing false-positive drops.",
    hint: "When outgoing packets use one path and incoming packets use another, confusing the stateful inspector.",
    level: "Expert",
    codeExample: `// Asymmetric Routing Problem:
// Outbound: Client ---> [IPS 1: Sees SYN] ---> Server
// Inbound : Server ---> [IPS 2: Sees SYN-ACK (No SYN in memory!)] ---> DROPPED!`
  },
  {
    id: 18,
    question: "How does 'SSL/TLS Decryption Offloading' enable an inline IPS to inspect encrypted HTTPS traffic?",
    shortAnswer: "A dedicated Hardware Decryption Broker decrypts HTTPS traffic before passing clean plaintext streams to the IPS inline engine, then re-encrypts the traffic before sending it to origin servers.",
    explanation: "Because TLS 1.3 ciphertext hides payload exploits from inspection, an IPS without decryption is blind. Decryption brokers handle cryptographic handshakes in hardware ASICs, enabling the IPS to inspect plaintext payloads.",
    hint: "Decrypting HTTPS traffic in hardware before the IPS scans it, then re-encrypting it.",
    level: "Expert",
    codeExample: `// Decryption Broker Pipeline:
// Ingress (TLS 1.3) ---> [Decryption ASIC] ---> [Plaintext IPS Inspection] ---> [Re-Encryption ASIC] ---> Egress`
  },
  {
    id: 19,
    question: "What is 'Behavioral DoS / DDoS Mitigation' in modern Next-Generation IPS (NGIPS)?",
    shortAnswer: "Tracking baseline packet rates per source and automatically applying volumetric SYN cookies, rate-limiting, and dropping malformed floods at the line-rate interface layer.",
    explanation: "Before deep signature inspection runs, the NGIPS preprocessor mitigates volumetric floods (UDP floods, ICMP ping floods, SYN floods), preventing volumetric attacks from exhausting the deep analysis CPU cores.",
    hint: "Stopping high-volume traffic floods at the front door before deep scanning begins.",
    level: "Moderate",
    codeExample: `// NGIPS DoS Preprocessor:
// Alert Threshold: 10,000 CPS | Drop Threshold: 25,000 CPS | Enable SYN Cookies`
  },
  {
    id: 20,
    question: "Why should an enterprise NEVER deploy an IPS with default out-of-the-box rule sets in active blocking mode?",
    shortAnswer: "Default rule sets contain thousands of legacy, generic, and un-tuned rules that inevitably trigger false positives on legitimate internal software, causing unexpected network downtime.",
    explanation: "Every enterprise uses unique internal APIs, legacy protocols, and custom software. Default rules must be baselined, tuned, and tested in detection-only mode to prevent blocking core business operations.",
    hint: "Default rules cause false alarms that will break your company's legitimate business applications.",
    level: "Basic",
    codeExample: `// Rule Customization:
// Disable generic ICMP ping rules; enable strict dropping only on verified CVE signatures.`
  },
  {
    id: 21,
    question: "What is 'Host Quarantine via NAC / EDR Integration' in automated IPS response?",
    shortAnswer: "When the IPS detects an internal host generating malware C2 traffic, it triggers an automated API call to the Network Access Control (NAC) switch to move the infected host's switch port into an isolated quarantine VLAN.",
    explanation: "Instead of simply dropping packets, the IPS coordinates with the local switch (802.1X / Cisco ISE) to physically quarantine the infected workstation, cutting off its lateral reachability to other workstations.",
    hint: "Automatically moving an infected computer onto an isolated quarantine VLAN.",
    level: "Expert",
    codeExample: `// NAC Quarantine API Call:
// POST https://ise.bank.gov.in/api/v1/quarantine
// Payload: { "mac_address": "00:1A:2B:3C:4D:5E", "vlan": 666, "reason": "IPS_RANSOMWARE_BEACON" }`
  },
  {
    id: 22,
    question: "What is 'Payload Masking / Sanitization' in IPS alert logging for data privacy compliance (DPDP Act 2023)?",
    shortAnswer: "Automatically redacting sensitive customer data (passwords, credit card numbers, Aadhaar numbers) from the captured packet payload snippet before saving the alert in SIEM logs.",
    explanation: "If an IPS alert captures an unencrypted HTTP POST request containing citizen Aadhaar or banking data, storing the raw alert in plain text violates data protection laws. Payload masking redacts sensitive bytes (`Aadhaar: XXXX-XXXX-1234`).",
    hint: "Masking private customer numbers in alert logs to comply with data privacy laws.",
    level: "Moderate",
    codeExample: `// Payload Sanitization Directive:
// log_sanitization: mask_regex "\b\d{4}\s\d{4}\s\d{4}\b" replacement "[REDACTED_AADHAAR]"`
  },
  {
    id: 23,
    question: "What is 'Inline Tap / Aggregator' in resilient IPS clustering architectures?",
    shortAnswer: "A hardware device that splits in-line traffic across a load-balanced cluster of multiple physical IPS appliances, providing horizontal scalability and N+1 fault tolerance.",
    explanation: "If a 40 Gbps link exceeds the capacity of a single 10 Gbps IPS appliance, an Inline Network Packet Broker distributes flows across 4 IPS units using flow-hashing, ensuring both sides of a session stay on the same sensor.",
    hint: "A hardware load balancer that splits high-speed traffic across multiple IPS appliances.",
    level: "Expert",
    codeExample: `// Packet Broker Flow Hashing:
// 40 Gbps Ingress ---> [Packet Broker (5-Tuple Hash)] ---> [IPS 1] [IPS 2] [IPS 3] [IPS 4]`
  },
  {
    id: 24,
    question: "How does an inline IPS prevent 'ARP Spoofing / Man-in-the-Middle' attacks on local subnets?",
    shortAnswer: "By inspecting ARP request/reply packets, validating that MAC-to-IP mappings match authorized DHCP snooping tables (Dynamic ARP Inspection - DAI), and dropping forged ARP replies.",
    explanation: "Attackers broadcast fake ARP replies to poison gateway cache tables. An inline IPS with DAI drops gratuitous ARP packets that do not match the authorized network binding database.",
    hint: "Checking ARP packets against a known database and dropping fake ARP replies.",
    level: "Moderate",
    codeExample: `// Dynamic ARP Inspection Check:
// IF ARP.SenderIP == 10.10.1.1 AND ARP.SenderMAC != "00:00:5E:00:01:01":
//     Action: DROP (ARP Poisoning Attempt Blocked!)`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance mandate regarding IPS Drop Telemetry and Block Logs?",
    shortAnswer: "All IPS packet drop events, blocked IP addresses, triggered signature IDs, and NPL India NTP timestamps must be retained in immutable SIEM storage for a minimum of 180 days.",
    explanation: "Under statutory cybersecurity directives in India, organizations must preserve all active threat mitigation logs to enable forensic incident reconstruction and threat intelligence sharing.",
    hint: "180-day retention of all IPS drop logs synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Structured IPS Drop Log:
const certInIpsLog = {
  timestamp: "2026-08-23T11:55:00.220Z",
  device: "ips-barrackpore-inline01",
  action: "DROP_INLINE",
  sigId: "2008921",
  sigName: "EXPLOIT-KIT Drive-by Download Dropper",
  srcIp: "198.51.100.25",
  dstIp: "172.16.1.10"
};`
  },
  {
    id: 26,
    question: "What is 'Evasion Resistance: Case Sensitivity & URL Decoding' in inline IPS preprocessors?",
    shortAnswer: "Normalizing mixed-case characters (`sElEcT` -> `select`) and resolving multi-layer URL encoding (`%2520` -> `%20` -> ` `) before signature matching to prevent evasion.",
    explanation: "Attackers evade naive pattern matchers by mixing letter casing or using double URL encoding. The IPS preprocessor applies canonical transformations so that signatures match regardless of encoding tricks.",
    hint: "Converting weird casing and double-encoded URLs into clean standard text before scanning.",
    level: "Moderate",
    codeExample: `// Preprocessor Canonical Normalization:
// Raw Input: "/api?q=%2527%20uNiOn%20sElEcT" -> Canonical: "/api?q=' union select"`
  },
  {
    id: 27,
    question: "Why do high-security banking networks deploy BOTH passive IDS (for East-West lateral monitoring) AND inline IPS (for North-South perimeter defense)?",
    shortAnswer: "Defense-in-Depth: Inline IPS blocks incoming external attacks at the perimeter (North-South); passive IDS monitors internal lateral server traffic (East-West) with zero latency impact.",
    explanation: "Placing an inline IPS inside internal database switches could introduce latency or accidental outages in high-speed interbank transaction streams. Passive IDS monitors internal core traffic safely, while inline IPS blocks attacks at the border.",
    hint: "IPS blocks incoming attacks at the front door; IDS quietly watches internal traffic between servers.",
    level: "Moderate",
    codeExample: `// Hybrid Defense Architecture:
// North-South Perimeter: [Internet] ---> [Inline IPS (Active Dropping)] ---> [DMZ]
// East-West Core       : [Core Switch] ---> [Passive Optical TAP] ---> [Passive NIDS Sensor]`
  },
  {
    id: 28,
    question: "What is 'Snort Inline DAQ (Data Acquisition Module)' and how does it interface with Linux `iptables` NFQUEUE?",
    shortAnswer: "The software bridge that receives packets queued by the kernel (`iptables -j NFQUEUE`), inspects the packet in user-space, and returns a verdict (`DAQ_VERDICT_PASS` or `DAQ_VERDICT_BLOCK`) to the kernel.",
    explanation: "Snort uses the DAQ library to operate in-line. The Linux kernel pauses the packet in the NFQUEUE buffer until Snort evaluates its rules; Snort signals the kernel to either forward or discard the packet.",
    hint: "The software connector between Snort rules and the Linux kernel packet forwarding engine.",
    level: "Expert",
    codeExample: `// Snort DAQ NFQUEUE Command:
// snort -Q --daq nfq --daq-var queue=0 -c /etc/snort/snort.conf`
  },
  {
    id: 29,
    question: "What is 'Session Table Rate Capping' in inline IPS DDoS protection?",
    shortAnswer: "Restricting the maximum number of concurrent open embryonic TCP states allocated to a single source IP to prevent attackers from exhausting IPS connection memory.",
    explanation: "If an attacker launches 500,000 half-open connections, the IPS session table memory can fill up. Session rate capping drops excess requests from abusive IPs before memory exhaustion occurs.",
    hint: "Limiting how many connection slots a single IP address can consume at once.",
    level: "Moderate",
    codeExample: `// Session Table Capping:
// max_sessions_per_ip = 100 | action_on_exceed = DROP_SILENT`
  },
  {
    id: 30,
    question: "Synthesize the overarching strategic decision: When should an enterprise deploy an IDS vs an IPS?",
    shortAnswer: "Deploy an inline IPS at perimeter choke points for verified high-confidence threat blocking; deploy an out-of-band IDS across internal core networks and sensitive database backbones where zero latency and zero false-positive outage risk are paramount.",
    explanation: "Choosing between IDS and IPS is a strategic balance between prevention and availability. Combining inline IPS at external boundaries with passive IDS and honeypots across internal zones creates an impenetrable, resilient Defense-in-Depth posture.",
    hint: "IPS at the front door to block attacks; IDS on the inside to monitor without breaking systems.",
    level: "Moderate",
    codeExample: `// The Master IDS/IPS Architecture Formula:
// Complete Perimeter Resilience = [Perimeter Inline IPS (Fail-Open Bypass)] + [Internal Core Passive NIDS (Zero Latency)] + [180-Day WORM Logs]`
  }
];

export default questions;
