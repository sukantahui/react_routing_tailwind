// topic31_questions.js
// 30 Moderate to Expert Questions on Latency (Network Delay) in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is Latency in computer networking and how is it measured?",
    shortAnswer: "Latency is the total time delay taken for a data packet to travel from its source node to its destination node across a communication channel, typically measured in milliseconds (ms) or microseconds (μs).",
    explanation: "While bandwidth represents how much data can fit in the pipe at once, latency represents how quickly an individual packet moves through that pipe.",
    hint: "Total time delay for a packet to travel from sender to receiver, measured in milliseconds.",
    level: "basic",
    codeExample: "Latency = '15 ms (One-Way Delay)';"
  },
  {
    question: "What are the four distinct physical components that make up Total End-to-End Latency?",
    shortAnswer: "1. Processing Delay (D_proc), 2. Queuing Delay (D_queue), 3. Transmission Delay (D_trans), and 4. Propagation Delay (D_prop). Total Delay = D_proc + D_queue + D_trans + D_prop.",
    explanation: "Processing occurs in switch/router ASICs; Queuing occurs in buffer memory; Transmission is the time to serialize bits on wire; Propagation is the time taken to travel physical distance at light speed.",
    hint: "Total Delay = Processing + Queuing + Transmission + Propagation.",
    level: "expert",
    codeExample: "TotalDelay = D_proc + D_queue + (PacketSize / BitRate) + (Distance / SpeedOfLightInFiber);"
  },
  {
    question: "How does Transmission Delay differ fundamentally from Propagation Delay?",
    shortAnswer: "Transmission Delay (L/R) is the time required to push all packet bits onto the wire, governed by packet size and link bitrate; Propagation Delay (d/s) is the physical transit time for a bit to travel distance 'd' at speed 's' (~200,000 km/s in optical fiber).",
    explanation: "Think of a highway toll gate: Transmission delay is the time taken to push cars through the toll booth; Propagation delay is the time taken for cars to drive 500 km down the road.",
    hint: "Transmission = time to push bits onto cable (L/R); Propagation = physical travel time (d/s).",
    level: "expert",
    codeExample: "D_trans = PacketLength_bits / LinkRate_bps;\nD_prop = PhysicalDistance_meters / 200000000; // Speed of light in silica fiber"
  },
  {
    question: "What is Round-Trip Time (RTT) and how is it measured using ICMP Ping?",
    shortAnswer: "RTT is the total elapsed time from when a sender transmits a packet until it receives the acknowledgment/reply from the destination; Ping calculates RTT by timestamping an ICMP Echo Request and its matching Echo Reply.",
    explanation: "RTT governs TCP connection establishment (3-way handshake takes 1.5 RTT) and interactive application responsiveness.",
    hint: "Total round-trip time for a packet to reach destination and return.",
    level: "basic",
    codeExample: "# Ping RTT measurement\nping 8.8.8.8 -n 4\n# Output: Minimum = 12ms, Maximum = 15ms, Average = 13ms"
  },
  {
    question: "What is Jitter and why is it detrimental to real-time VoIP and video streaming?",
    shortAnswer: "Jitter is the statistical variation or instability in packet arrival time delay over time; high jitter causes VoIP audio chopping, robotic voices, and video buffering as player jitter buffers overflow or starve.",
    explanation: "Telecommunication standards require jitter to remain below 20ms for toll-quality voice calls across enterprise networks in Kolkata.",
    hint: "Variation in latency between consecutive packets, causing choppy audio/video.",
    level: "moderate",
    codeExample: "Jitter = Math.abs(Packet2_Latency - Packet1_Latency); // Target < 10ms"
  },
  {
    question: "What is Bufferbloat in home and office routers and how does Active Queue Management (AQM) solve it?",
    shortAnswer: "Bufferbloat is severe latency degradation (spiking from 20ms to 800ms+) caused by oversized, unmanaged router buffers holding packets during large file uploads; AQM algorithms like FQ-CoDel and CAKE intelligently drop/mark packets before queues bloat.",
    explanation: "When Susmita uploads a 1GB video, unmanaged router buffers fill up, causing simultaneous gaming and Zoom calls on the same Wi-Fi to lag uncontrollably.",
    hint: "Excessive router buffer memory causing massive lag during uploads; solved by FQ-CoDel.",
    level: "expert",
    codeExample: "router.enableAQM('fq_codel'); // Maintains low latency under 100% upload load"
  },
  {
    question: "Why does Geostationary Earth Orbit (GEO) Satellite Internet suffer from ~600ms latency?",
    shortAnswer: "GEO satellites orbit at an altitude of 35,786 km above the equator; a round-trip radio signal must travel over 144,000 km (uplink + downlink twice), creating an unalterable ~500–600ms physical propagation delay governed by the speed of light.",
    explanation: "Because physical distance causes this delay, no amount of bandwidth expansion can reduce GEO satellite latency.",
    hint: "Satellites 35,786 km in space require radio signals to travel huge distances at light speed.",
    level: "moderate",
    codeExample: "GEO_Distance = 35786 * 4; // Round trip path ~143,144 km\nGEO_PropagationDelay = 143144000 / 300000000; // ~480ms speed of light in vacuum + processing"
  },
  {
    question: "How do Low Earth Orbit (LEO) constellations like Starlink achieve much lower latency (25–40ms) than GEO satellites?",
    shortAnswer: "LEO satellites orbit at only 300 to 550 km altitude (65 times closer to Earth than GEO satellites), slashing radio propagation distance and using inter-satellite laser links that travel faster in space vacuum than in terrestrial glass fiber.",
    explanation: "Laser signals travel at 300,000 km/s in space vacuum vs 200,000 km/s in glass optical fiber (33% faster), making long-distance inter-continental routing exceptionally fast.",
    hint: "LEO satellites orbit much closer to Earth (500 km) vs GEO (35,786 km).",
    level: "expert",
    codeExample: "LEO_Altitude = '550 km (vs GEO 35,786 km)' => RTT = '28 ms';"
  },
  {
    question: "What is Colocation in High-Frequency Trading (HFT) and why do financial firms pay millions to shave off nanoseconds?",
    shortAnswer: "Placing algorithmic trading servers in the exact same physical data center cage as the stock exchange matching engine (e.g. NSE Mumbai) using identical-length fiber cables to eliminate microsecond propagation delay and execute arbitrage trades first.",
    explanation: "In algorithmic finance, receiving market data 10 microseconds earlier than competitors translates to millions of Rupees in profit.",
    hint: "Placing trading servers inside the stock exchange data center to eliminate travel delay.",
    level: "expert",
    codeExample: "HFT_Colo_CrossConnect: FiberLength = '10 meters (Latency = 50 nanoseconds)';"
  },
  {
    question: "What is a Latency Side-Channel Timing Attack in Cyber Security?",
    shortAnswer: "An attack where a malicious actor precisely measures microsecond variations in server response times to infer secret data, such as private cryptographic keys, password lengths, or valid database usernames.",
    explanation: "If checking a valid username takes 45ms (hashing password) while an invalid username returns in 2ms, the attacker can enumerate all valid user accounts.",
    hint: "Measuring server response time variations to extract passwords or encryption keys.",
    level: "expert",
    codeExample: "if (crypto.timingSafeEqual(inputHash, storedHash)) { // Prevents microsecond timing leakage }"
  },
  {
    question: "How does a Content Delivery Network (CDN) reduce web page latency for users in West Bengal?",
    shortAnswer: "CDNs terminate TLS connections and serve cached web assets from edge Points of Presence (PoPs) directly inside Kolkata ISP peering exchanges, slashing RTT from 200ms (US Origin) down to under 5ms.",
    explanation: "Terminating the 3-way TCP and TLS 1.3 handshake locally in Kolkata avoids multiple round trips across international subsea fiber cables.",
    hint: "Serves files from local Kolkata edge servers instead of distant overseas origins.",
    level: "moderate",
    codeExample: "UserInKolkata → EdgePoP_Kolkata (4ms RTT) → Instant cached response;"
  },
  {
    question: "What is the typical fiber optic RTT latency between Kolkata and major global data hubs?",
    shortAnswer: "Intra-Kolkata LAN: <1ms; Kolkata to Mumbai: 28–35ms; Kolkata to Singapore: 45–55ms; Kolkata to Frankfurt/London: 125–140ms; Kolkata to US East (Virginia): 180–210ms.",
    explanation: "These latency figures are bounded by physical geodesic fiber route distances through subsea landing stations in Chennai and Mumbai.",
    hint: "Kolkata to Mumbai is ~30ms; Kolkata to US East is ~190ms.",
    level: "moderate",
    codeExample: "LatencyBenchmarks = { IntraKolkata: '<2ms', Mumbai: '30ms', Singapore: '50ms', USEast: '195ms' };"
  },
  {
    question: "What diagnostic command-line utility traces intermediate router hops and measures per-hop latency?",
    shortAnswer: "Traceroute (Linux/macOS) or Tracert (Windows) — sends packets with incrementing TTL values (1, 2, 3...) to elicit ICMP Time Exceeded replies from each intermediate router along the path.",
    explanation: "Network engineers in Barrackpore use `tracert` to pinpoint exactly which ISP transit hop is introducing unexpected 150ms queuing delay.",
    hint: "Windows: tracert; Linux: traceroute. Discovers each router hop and latency.",
    level: "basic",
    codeExample: "# Windows\ntracert 1.1.1.1\n# Linux / macOS\ntraceroute -I 1.1.1.1"
  },
  {
    question: "How does HTTP/3 (QUIC over UDP) reduce connection establishment latency compared to HTTP/2 over TCP?",
    shortAnswer: "HTTP/3 combines transport connection setup and TLS 1.3 cryptographic negotiation into a single 1-RTT handshake (or 0-RTT for returning clients), eliminating the multi-RTT TCP SYN + TLS round trips.",
    explanation: "For mobile users with 100ms wireless latency, 0-RTT connection resumption loads web applications hundreds of milliseconds faster.",
    hint: "QUIC combines TCP and TLS handshakes into a single round-trip (1-RTT or 0-RTT).",
    level: "expert",
    codeExample: "HTTP3_Handshake = '1-RTT (Single packet exchange for Connection + TLS 1.3 Key Exchange)';"
  },
  {
    question: "What is Head-of-Line (HoL) Blocking and how does it introduce artificial latency in TCP streams?",
    shortAnswer: "In TCP, if a single packet is lost in transit, all subsequent arriving packets must wait in receiver memory buffers until the lost packet is retransmitted and acknowledged, stalling all multiplexed streams.",
    explanation: "QUIC (HTTP/3) solves this by managing independent streams over UDP; loss in one stream does not stall data in other concurrent streams.",
    hint: "A lost packet in TCP blocks all other packets behind it until it is retransmitted.",
    level: "expert",
    codeExample: "TCP_HoL_Blocking: Packet_3_Lost => Packets 4, 5, 6 held in buffer until Packet 3 arrives;"
  },
  {
    question: "What is Fast Retransmit in TCP and how does it prevent latency spikes from waiting for timeout timers?",
    shortAnswer: "When a sender receives 3 duplicate ACKs for the same packet sequence number, it immediately retransmits the missing packet without waiting for the slow Retransmission Timeout (RTO) timer (which can take 200–1000ms) to expire.",
    explanation: "Fast Retransmit maintains steady throughput and avoids severe multi-second latency pauses on busy fiber lines.",
    hint: "Retransmits lost packets immediately upon receiving 3 duplicate ACKs without waiting for timers.",
    level: "expert",
    codeExample: "if (duplicateAcksReceived >= 3) tcp.fastRetransmit(missingSegment);"
  },
  {
    question: "What is the cost in Indian Rupees (₹) to lease a dedicated low-latency Dark Fiber Cross-Connect inside an enterprise carrier-neutral data center in Kolkata?",
    shortAnswer: "Approximately ₹8,000 to ₹18,000 per month (₹96,000 – ₹2,16,000 annually) plus a one-time provisioning fee of ₹15,000 – ₹30,000.",
    explanation: "Direct dark fiber cross-connects between racks in Kolkata facilities (e.g. Sify, CtrlS, Webel) provide sub-millisecond (<0.2ms) zero-jitter interconnectivity.",
    hint: "Data center dark fiber cross-connect costs ₹8,000 – ₹18,000 / month.",
    level: "moderate",
    codeExample: "DC_CrossConnect_Cost = ₹12,000 / Month; // Provides 0.1ms zero-jitter inter-rack connection"
  },
  {
    question: "What is Cut-Through Switching vs Store-and-Forward Switching in terms of switch latency?",
    shortAnswer: "Cut-Through switches begin forwarding a frame immediately after reading the 6-byte destination MAC address (latency ~0.3 μs); Store-and-Forward switches buffer the entire frame to verify the CRC checksum before forwarding (latency 5–50 μs).",
    explanation: "Financial trading and high-performance computing clusters in Jadavpur deploy Cut-Through ASIC switches to eliminate nanoseconds of queuing delay.",
    hint: "Cut-Through forwards immediately after reading MAC (~0.3 μs); Store-and-Forward waits for whole frame.",
    level: "expert",
    codeExample: "CutThroughSwitch: latency_microsec = 0.35; // Forwards after reading first 6 bytes"
  },
  {
    question: "What is Anycast DNS and how does it minimize DNS lookup latency worldwide?",
    shortAnswer: "Anycast announces the same DNS IP address (e.g. 1.1.1.1, 8.8.8.8) from hundreds of data centers globally via BGP; client DNS queries automatically route to the topologically nearest server in under 5ms.",
    explanation: "Without Anycast, a student in Kolkata would have to query a root server in California, adding 200ms to every web page navigation.",
    hint: "Routes DNS queries to the geographically closest server to resolve domain names in <5ms.",
    level: "moderate",
    codeExample: "BGP_Anycast.route('8.8.8.8') => connectsToKolkataNode(latency = '3.5 ms');"
  },
  {
    question: "How does Slowloris DDoS attack exploit connection state and latency on web servers?",
    shortAnswer: "Slowloris opens hundreds of HTTP connections and sends tiny, incomplete header fragments at extremely slow intervals (e.g., 1 byte every 10 seconds), tying up server thread pools and exhausting connection limits with minimal bandwidth.",
    explanation: "Instead of saturating bandwidth with high volume, Slowloris attacks application latency and thread starvation.",
    hint: "Sends incomplete HTTP headers extremely slowly to exhaust server connection slots.",
    level: "expert",
    codeExample: "slowloris.sendHeader('X-Custom-Header: partial_data', interval = '10s');"
  },
  {
    question: "What is TCP BBR (Bottleneck Bandwidth and RTT) congestion control and how does it prevent bufferbloat?",
    shortAnswer: "Developed by Google, BBR continuously measures actual bottleneck bandwidth and minimum RTT without relying on packet drops, keeping packet inflight queues empty and maintaining lowest possible latency.",
    explanation: "Unlike legacy Cubic which fills buffers until packets drop, BBR operates at the exact optimal pipe capacity without bloating queues.",
    hint: "Google's congestion algorithm that maximizes speed while keeping buffer queues empty.",
    level: "expert",
    codeExample: "sysctl -w net.ipv4.tcp_congestion_control=bbr // Enables BBR algorithm in Linux kernel"
  },
  {
    question: "What role does the Speed of Light in Fiber play as an immutable physical limit on latency?",
    shortAnswer: "Light travels through silica glass optical fiber at approximately 200,000 km/s (refractive index n ≈ 1.468), which means every 1,000 km of fiber incurs an unavoidable 5 milliseconds of one-way physical propagation delay (10ms RTT).",
    explanation: "Even with infinite bandwidth, zero queuing, and perfect electronics, the 10,000 km subsea fiber path from India to the US East Coast can never have an RTT lower than ~100ms.",
    hint: "Light in glass travels at 200,000 km/s, adding 5ms of delay per 1,000 km of cable.",
    level: "expert",
    codeExample: "SpeedOfLightInGlass = 200000; // km/s\nDelay_per_1000km = (1000 / 200000) * 1000 = 5.0 ms One-Way;"
  },
  {
    question: "What is Edge Computing and how does it resolve latency bottlenecks for Industrial IoT?",
    shortAnswer: "Deploying computation, analytics, and AI inference servers directly on the local factory floor or cell tower rather than sending raw sensor data to distant cloud data centers, achieving <5ms real-time control loops.",
    explanation: "Autonomous robots and CNC machines in Barrackpore require 2ms response times to stop safely; waiting for 60ms cloud round trips would cause industrial collisions.",
    hint: "Processes data on local micro-servers at the factory instead of distant clouds.",
    level: "moderate",
    codeExample: "EdgeController.processTelemetry(sensorFrame) => localDecisionTime = '1.8 ms';"
  },
  {
    question: "How does MTU (Maximum Transmission Unit) packet sizing impact serialization transmission delay on slow links?",
    shortAnswer: "Large packets (e.g. 1500-byte MTU) take longer to serialize onto slow lines (e.g., transmitting 1500 bytes on a 64 kbps link takes ~187ms), stalling high-priority VoIP packets stuck behind it (addressed by Link Fragmentation and Interleaving / LFI).",
    explanation: "LFI splits large data packets into smaller fragments so urgent VoIP packets can be interleaved without waiting for large frames.",
    hint: "Big packets take longer to push onto slow wires, blocking urgent voice packets.",
    level: "expert",
    codeExample: "D_trans = (1500 * 8) / 64000 = 0.1875 seconds (187.5 ms serialization delay);"
  },
  {
    question: "What is Ping of Death and how did historical attackers use packet fragmentation to crash target OS stacks?",
    shortAnswer: "An attack where an adversary sent malformed or oversized ICMP echo packets exceeding the maximum IPv4 size of 65,535 bytes via IP fragmentation; upon reassembly, the target OS suffered buffer overflow crashes.",
    explanation: "Modern operating systems validate reassembled IP fragment lengths, neutralizing classic Ping of Death attacks.",
    hint: "Sending fragmented packets that exceed 65,535 bytes to crash the receiving operating system.",
    level: "moderate",
    codeExample: "ping -l 65500 -t TargetIP // Historic oversized packet exploit (now patched)"
  },
  {
    question: "What is the difference between One-Way Latency and Round-Trip Time (RTT)?",
    shortAnswer: "One-Way Latency is the time taken for a packet to travel from Source A to Destination B; RTT is the total time from transmission of a packet until receipt of its acknowledgment back at Source A (often ~2x One-Way if routing is symmetric).",
    explanation: "Because Internet routing can be asymmetric (outbound path differs from return path), one-way latency cannot always be calculated simply by dividing RTT by 2.",
    hint: "One-Way is sender to receiver; RTT is sender to receiver and back.",
    level: "basic",
    codeExample: "OneWayDelay = Time_B - Time_A; // Requires microsecond NTP/PTP synchronization"
  },
  {
    question: "What is PTP (Precision Time Protocol - IEEE 1588) and how is it used in sub-microsecond latency measurement?",
    shortAnswer: "PTP is a high-precision network time synchronization protocol that uses hardware timestamping at the physical PHY layer to synchronize clocks across distributed switches and servers to within sub-nanosecond accuracy.",
    explanation: "Financial trading exchanges in Mumbai and 5G telecommunications base stations use PTP grandmaster clocks to measure packet transit latencies with extreme precision.",
    hint: "High-precision protocol synchronizing computer clocks to sub-microsecond accuracy.",
    level: "expert",
    codeExample: "ptp4l -i eth0 -m // Runs Linux Precision Time Protocol daemon with hardware timestamping"
  },
  {
    question: "What is the impact of High Latency on TCP Throughput via Mathis’ Formula?",
    shortAnswer: "Mathis' formula states that TCP throughput is inversely proportional to RTT: Throughput ≤ (MSS / RTT) * (1 / √p), meaning doubling latency cuts maximum achievable single-stream TCP throughput in half even on an empty 10Gbps link.",
    explanation: "This mathematical relationship proves why reducing latency is equally as critical as adding raw fiber bandwidth for cloud applications.",
    hint: "Throughput is inversely proportional to RTT; higher latency cuts TCP speed.",
    level: "expert",
    codeExample: "MaxTCPThroughput = (MSS / (RTT_seconds * Math.sqrt(PacketLossRate)));"
  },
  {
    question: "What is the relationship between Latency and User Conversion Rates in E-Commerce web applications?",
    shortAnswer: "Studies by Google and Akamai show that every 100ms increase in web page load latency reduces user conversion rates by 7% and increases bounce rates, translating to millions in lost revenue.",
    explanation: "E-commerce portals in Kolkata optimize JavaScript bundles, deploy edge CDNs, and use HTTP/3 to keep Time to First Byte (TTFB) below 100ms.",
    hint: "Every 100ms of website delay drops customer sales by 7%.",
    level: "moderate",
    codeExample: "if (pageLoadTime > 2000) bounceRate += 0.32; // 32% increase in abandonment over 2s"
  },
  {
    question: "What is the ultimate golden rule for diagnosing, optimizing, and securing Network Latency?",
    shortAnswer: "'Decompose total delay into its 4 physical components (D_proc, D_queue, D_trans, D_prop); deploy edge CDNs to eliminate propagation distance; enable AQM/FQ-CoDel to defeat bufferbloat; adopt HTTP/3 0-RTT handshakes; and budget low-latency fiber cross-connects in Indian Rupees (₹)!'",
    explanation: "This complete rule captures the physics of network propagation, modern transport protocol engineering, queuing management, and financial budgeting.",
    hint: "4-Component delay + Edge CDNs + FQ-CoDel AQM + HTTP/3 0-RTT + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DecomposeDelayComponents() → DeployEdgeCDN() → EnableCoDelAQM() → UpgradeHTTP3() → BudgetInRupees(₹);"
  }
];

export default questions;
