// topic32_questions.js
// 30 Moderate to Expert Questions on Throughput in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is Throughput in computer networking and how is it measured?",
    shortAnswer: "Throughput is the actual rate of successful data delivery over a communication channel per unit of time, measured in bits per second (bps, Mbps, Gbps) or bytes per second (MB/s).",
    explanation: "While bandwidth is the theoretical maximum capacity of the channel, throughput represents the real-world measured performance achieved in practice.",
    hint: "The actual measured rate of successful data delivery across a network.",
    level: "basic",
    codeExample: "Throughput = '850 Mbps (Actual measured speed on a 1 Gbps port)';"
  },
  {
    question: "What is the Bottleneck Link Principle in multi-hop network paths?",
    shortAnswer: "In a multi-hop network path with intermediate link capacities R1, R2, ..., RN, the maximum end-to-end throughput can never exceed the capacity of the slowest (bottleneck) link: Throughput <= min(R1, R2, ..., RN).",
    explanation: "Even if your PC has a 10 Gbps LAN card and the cloud server has 40 Gbps fiber, if an intermediate ISP trunk is 50 Mbps, your throughput is capped at 50 Mbps.",
    hint: "End-to-end throughput is always limited by the slowest link in the entire path.",
    level: "moderate",
    codeExample: "Path = [10000, 1000, 50, 10000]; // Throughput = Math.min(...Path) = 50 Mbps"
  },
  {
    question: "What is Mathis’ Formula for TCP Throughput and what variables define it?",
    shortAnswer: "Throughput_TCP <= (MSS / RTT) * (1 / sqrt(p)), where MSS is Maximum Segment Size, RTT is Round-Trip Time in seconds, and p is the packet loss probability.",
    explanation: "Mathis' formula proves that even tiny amounts of packet loss (e.g. 1%) combined with moderate latency (e.g. 50ms) cause dramatic drops in single-stream TCP throughput.",
    hint: "Throughput <= (MSS / RTT) * (1 / sqrt(p)) governs TCP transfer speed under packet loss.",
    level: "expert",
    codeExample: "function mathisThroughput(mssBytes, rttSec, lossProb) {\n  return (mssBytes * 8) / (rttSec * Math.sqrt(lossProb));\n}"
  },
  {
    question: "How does Goodput differ from Raw Throughput?",
    shortAnswer: "Throughput measures all bits transmitted over the wire (including Ethernet, IP, TCP headers, TLS encryption tags, and retransmitted packets); Goodput measures only the useful application-layer payload data successfully received.",
    explanation: "On a 100 Mbps link transmitting tiny 64-byte packets, header overhead can consume 40% of the wire capacity, resulting in only 60 Mbps goodput.",
    hint: "Goodput is the actual useful application payload received, excluding headers and retries.",
    level: "moderate",
    codeExample: "Goodput = (UsefulPayloadBytes * 8) / TimeSeconds;\nEfficiencyRatio = Goodput / Throughput;"
  },
  {
    question: "What are Jumbo Frames (MTU 9000 bytes) and how do they increase throughput on 10Gbps storage networks?",
    shortAnswer: "Standard Ethernet frames carry up to 1500 bytes of payload (MTU 1500); Jumbo Frames expand payload capacity to 9000 bytes, reducing packet header overhead and cutting CPU interrupt handling by over 80%.",
    explanation: "In storage area networks (SAN) in Kolkata data centers, enabling Jumbo Frames increases iSCSI storage backup throughput from 6.2 Gbps to 9.8 Gbps on 10G fiber.",
    hint: "Expands Ethernet MTU from 1500 to 9000 bytes, slashing CPU load and boosting speed.",
    level: "expert",
    codeExample: "ifconfig eth0 mtu 9000 // Enables Jumbo Frames on 10G NIC interface"
  },
  {
    question: "What is the impact of Next-Generation Firewall (NGFW) Deep Packet Inspection (DPI) on network throughput?",
    shortAnswer: "Enabling SSL/TLS Decryption, Antivirus scanning, Application Control, and Intrusion Prevention (IPS) can reduce a firewall's raw Layer 4 throughput (e.g., 20 Gbps) down to 2–4 Gbps due to intensive CPU cryptographic processing.",
    explanation: "Network architects in Jadavpur size firewalls based on 'Threat Protection Throughput' rather than raw 'Firewall Throughput' in Rupee (₹) budgets.",
    hint: "Enabling SSL decryption and IPS scanning slows down firewall throughput significantly.",
    level: "expert",
    codeExample: "FirewallSpecs = { RawFirewallThroughput: '20 Gbps', ThreatProtectionThroughput: '2.5 Gbps' };"
  },
  {
    question: "What is NIC Hardware Offloading (TSO, LRO, RSS, Checksum Offload) and how does it prevent throughput bottlenecks?",
    shortAnswer: "Techniques where the physical NIC hardware processor (ASIC) handles TCP segmentation (TSO), packet reassembly (LRO), multi-core queue distribution (RSS), and CRC checksum calculations instead of the host CPU.",
    explanation: "Without hardware offloading, saturating a 10Gbps fiber link can consume 100% of a multi-core server CPU just processing TCP interrupts.",
    hint: "Offloads TCP packet chopping and checksum tasks from the CPU to the network card chip.",
    level: "expert",
    codeExample: "ethtool -K eth0 tso on lro on rxhash on // Enables hardware offloading features"
  },
  {
    question: "How does Packet Loss trigger the TCP Additive Increase Multiplicative Decrease (AIMD) congestion algorithm?",
    shortAnswer: "When a packet is lost, TCP assumes network congestion has occurred and immediately halves its Congestion Window (CWND) (Multiplicative Decrease); it then slowly increments CWND by 1 MSS per RTT (Additive Increase), causing throughput to plummet.",
    explanation: "Even on an uncompressed 1 Gbps fiber line, a 2% packet loss rate can reduce single-stream TCP throughput down to less than 30 Mbps.",
    hint: "TCP cuts its speed in half upon detecting any lost packet, then recovers very slowly.",
    level: "expert",
    codeExample: "onPacketLoss: CWND = Math.floor(CWND / 2); // Multiplicative Decrease\nonACK: CWND += (MSS * MSS) / CWND; // Additive Increase"
  },
  {
    question: "What is TCP BBR (Bottleneck Bandwidth and RTT) and how does it outperform TCP Cubic in high-loss wireless environments?",
    shortAnswer: "BBR models the physical network pipe by measuring maximum delivery rate and minimum round-trip time, ignoring non-congestion random packet drops (e.g. Wi-Fi RF interference) and maintaining high throughput where Cubic would collapse.",
    explanation: "On a lossy 4G/5G mobile link in Kolkata with 3% packet loss, BBR maintains 85 Mbps throughput while Cubic stalls at 8 Mbps.",
    hint: "BBR measures actual pipe speed instead of dropping speed on random wireless packet loss.",
    level: "expert",
    codeExample: "sysctl -w net.ipv4.tcp_congestion_control=bbr"
  },
  {
    question: "What diagnostic tool is the industry standard for benchmarking raw TCP and UDP network throughput?",
    shortAnswer: "iPerf3 — a command-line tool that generates multi-stream TCP and UDP traffic between a client and server to accurately benchmark achievable throughput, bandwidth limits, jitter, and packet loss.",
    explanation: "Engineers in Barrackpore run `iperf3 -c 10.0.1.5 -P 8 -t 30` to test whether a new optical link delivers its rated 10 Gbps throughput across 8 parallel streams.",
    hint: "iPerf3 utility used by network engineers to measure maximum network throughput.",
    level: "basic",
    codeExample: "# Benchmark with 8 parallel streams\niperf3 -c 192.168.1.50 -P 8 -t 60"
  },
  {
    question: "What is Link Aggregation Control Protocol (LACP - IEEE 802.3ad) and how does it scale switch throughput?",
    shortAnswer: "LACP bundles multiple physical Ethernet ports (e.g., 4 x 1 Gbps) into a single logical LAG/EtherChannel interface, delivering an aggregate throughput of 4 Gbps while balancing traffic flows across cables based on IP/MAC hash algorithms.",
    explanation: "If one cable in the bundle is cut, traffic instantly redistributes across the remaining 3 cables with zero downtime.",
    hint: "Combines multiple network cables into one logical pipe to multiply throughput.",
    level: "moderate",
    codeExample: "lacp.bundle([Eth1, Eth2, Eth3, Eth4]) => TotalThroughput = '4 Gbps';"
  },
  {
    question: "What is Multipath TCP (MPTCP - RFC 8684) and how does it aggregate throughput on mobile devices?",
    shortAnswer: "MPTCP allows a single transport connection to transmit and receive data simultaneously across multiple network interfaces (e.g., bonding Wi-Fi and 5G cellular connections), combining their throughput into a single super-stream.",
    explanation: "If Wi-Fi provides 50 Mbps and 5G provides 70 Mbps, MPTCP delivers a combined throughput of 120 Mbps to the smartphone application.",
    hint: "Bonds Wi-Fi and 5G connections together to combine their speeds into one.",
    level: "expert",
    codeExample: "MPTCP.aggregate([WiFi_Stream(50Mbps), Cellular_Stream(70Mbps)]) => CombinedThroughput = '120 Mbps';"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Next-Gen Firewall (NGFW) with 2+ Gbps Threat Prevention Throughput?",
    shortAnswer: "Approximately ₹1,20,000 to ₹3,50,000 (e.g., Fortinet FortiGate 100F, Palo Alto PA-440, or Sophos XGS 2100) plus annual security definition subscriptions (₹45,000 – ₹95,000/year).",
    explanation: "Enterprise appliances feature dedicated ASIC network processors (NP6/NP7) to maintain multi-gigabit throughput while performing real-time deep packet inspection.",
    hint: "Enterprise NGFW with 2Gbps Threat Prevention costs ₹1,20,000 – ₹3,50,000.",
    level: "moderate",
    codeExample: "NGFW_Cost = ₹1,85,000; // FortiGate 100F with 1 Gbps Full Threat Inspection"
  },
  {
    question: "How does Duplex Mismatch (Half-Duplex vs Full-Duplex) cause catastrophic throughput collapse on an Ethernet link?",
    shortAnswer: "If one end is Full-Duplex and the other is Half-Duplex, the half-duplex end detects collisions whenever both send simultaneously, causing constant packet retries, late collisions, and dropping throughput from 100 Mbps to under 1 Mbps.",
    explanation: "Network technicians in Ichapur resolve duplex mismatches by ensuring auto-negotiation is enabled on both the switch port and the server NIC.",
    hint: "Mismatch causes constant collision errors, dropping link speed from 100Mbps to <1Mbps.",
    level: "moderate",
    codeExample: "DuplexMismatch: LateCollisions += 5420; CRC_Errors += 1200; RealThroughput = '0.8 Mbps';"
  },
  {
    question: "What is TCP Window Scaling (RFC 7323) and how does it prevent throughput caps on high-BDP fiber links?",
    shortAnswer: "Window Scaling expands the maximum TCP receive window size from 64 KB up to 1 Gigabyte; without window scaling, a single TCP stream across a 10Gbps transatlantic link (200ms RTT) is mathematically capped at only ~2.6 Mbps throughput.",
    explanation: "Using the formula MaxThroughput = WindowSize / RTT: (65,535 bytes * 8) / 0.200s = 2.62 Mbps. Enabling window scaling allows 100 MB buffers, unlocking full 10 Gbps throughput.",
    hint: "Allows TCP buffers to scale beyond 64KB, unlocking multi-gigabit speeds on long-distance fiber.",
    level: "expert",
    codeExample: "MaxThroughput_Legacy = (65535 * 8) / 0.200 = 2.62 Mbps;\nMaxThroughput_Scaled = (100000000 * 8) / 0.200 = 4.0 Gbps;"
  },
  {
    question: "What is Head-of-Line (HoL) Blocking and how does HTTP/2 vs HTTP/3 impact web application throughput?",
    shortAnswer: "In HTTP/2 over TCP, a single lost packet stalls all multiplexed streams; HTTP/3 uses QUIC over UDP where each stream is tracked independently, preventing packet loss on one image from throttling the throughput of scripts and stylesheets.",
    explanation: "For mobile users in Kolkata experiencing 2% packet loss, HTTP/3 improves page throughput and completion times by over 40%.",
    hint: "HTTP/3 over UDP prevents a single lost packet from stopping all other data streams.",
    level: "expert",
    codeExample: "HTTP3_QUIC: PacketLost_Stream1 => Stream2 and Stream3 continue downloading at full throughput;"
  },
  {
    question: "What is Receive Side Scaling (RSS) in modern server Network Interface Cards?",
    shortAnswer: "RSS distributes incoming network packet processing across multiple CPU cores by hashing packet headers (IP/Port tuples), preventing a single CPU core from becoming saturated and bottlenecking total server throughput.",
    explanation: "On a 40Gbps database server in Kolkata, RSS distributes 5 million packets per second evenly across 16 CPU cores.",
    hint: "Spreads incoming network traffic across multiple CPU cores so no single core is overloaded.",
    level: "expert",
    codeExample: "RSS_Queues = 8; // Distributes packet processing across 8 CPU cores evenly"
  },
  {
    question: "What is the difference between Symmetrical Throughput and Asymmetrical Throughput in broadband connections?",
    shortAnswer: "Symmetrical throughput provides identical upload and download speeds (e.g. 500 Mbps up / 500 Mbps down); Asymmetrical throughput provides high download speed but heavily restricted upload speed (e.g. 500 Mbps down / 50 Mbps up).",
    explanation: "Video creators, web servers, and cloud backup systems in Barrackpore require symmetrical throughput to avoid multi-hour upload bottlenecks.",
    hint: "Symmetrical: Equal upload and download; Asymmetrical: Fast download, slow upload.",
    level: "basic",
    codeExample: "Symmetrical = '500M Down / 500M Up'; Asymmetrical = '500M Down / 50M Up';"
  },
  {
    question: "How does Transport Layer Security (TLS 1.3) improve initial transaction throughput compared to TLS 1.2?",
    shortAnswer: "TLS 1.3 reduces the cryptographic handshake from 2 round trips (2-RTT) down to 1 round trip (1-RTT), and introduces 0-RTT session resumption, accelerating data payload transfer throughput on mobile networks.",
    explanation: "Eliminating an entire network round trip allows API responses to begin streaming data to client devices twice as fast.",
    hint: "TLS 1.3 cuts the encryption handshake in half (1-RTT), starting data transfers faster.",
    level: "moderate",
    codeExample: "TLS_1_3_Handshake: 1_RTT_Setup -> Client immediately streams encrypted HTTP payload;"
  },
  {
    question: "What is Content Compression (Brotli / Gzip) and how does it boost effective Application Goodput?",
    shortAnswer: "Compression shrinks text payloads (HTML, CSS, JSON) by 70–85% prior to transmission; because fewer bytes cross the wire, effective application goodput (delivered data per second) increases by up to 5x on bandwidth-constrained lines.",
    explanation: "Compressing a 10 MB JSON database export to 1.5 MB allows a 10 Mbps connection to deliver the data in 1.2 seconds instead of 8 seconds.",
    hint: "Shrinks file sizes by up to 85% so data transfers complete much faster over the wire.",
    level: "basic",
    codeExample: "Content-Encoding: br // Brotli shrinks 10MB payload to 1.4MB -> 7x Goodput Speedup"
  },
  {
    question: "What is Asymmetric Routing and how can it severely degrade Stateful Firewall throughput?",
    shortAnswer: "A condition where outbound packets travel via ISP-A and return packets arrive via ISP-B; stateful firewalls drop the return packets because they lack matching outbound TCP session state, forcing retransmissions and collapsing throughput.",
    explanation: "Enterprise multihomed networks in Kolkata resolve this by implementing BGP path prepending or state-synchronization clusters between firewalls.",
    hint: "Outbound and return packets take different paths, confusing firewalls and causing dropped packets.",
    level: "expert",
    codeExample: "AsymmetricRouting: Outbound via WAN1, Inbound via WAN2 -> Firewall drops untracked SYN-ACK;"
  },
  {
    question: "What is Storage Area Network (SAN) Throughput and why do Fibre Channel and iSCSI mandate lossless Ethernet?",
    shortAnswer: "Storage networks transfer raw disk blocks at 10G/25G/100G speeds; packet drops force massive TCP timeouts and storage freezes, so Data Center Bridging (DCB) and Priority-based Flow Control (PFC - 802.1Qbb) eliminate all packet drops.",
    explanation: "Lossless Ethernet with PFC guarantees that virtual machine disk IOPS and database throughput remain rock-solid without dropouts.",
    hint: "SAN storage networks require zero packet loss; PFC flow control prevents dropped disk data.",
    level: "expert",
    codeExample: "switchport priority-flow-control mode on // Enables lossless Ethernet for SAN iSCSI"
  },
  {
    question: "How does CPU Core Thermal Throttling reduce Network Throughput on high-density edge servers?",
    shortAnswer: "When a server CPU overheats, it drops its clock frequency (e.g. from 3.6 GHz to 1.2 GHz); the CPU can no longer process network interrupts and cryptographic hashing fast enough, bottlenecking network throughput despite an empty 10Gbps fiber link.",
    explanation: "Foundry edge servers in Barrackpore install industrial liquid cooling to prevent thermal throttling from degrading telemetry throughput.",
    hint: "Overheated CPUs slow down, failing to process network packets fast enough.",
    level: "moderate",
    codeExample: "if (cpuTemp > 90C) cpu.throttle(1.2GHz) => NetworkThroughputDrops('65%');"
  },
  {
    question: "What is Bandwidth-Delay Product (BDP) Mismatch in single-stream vs multi-stream TCP benchmarks?",
    shortAnswer: "A single TCP stream with an unscaled window is capped by BDP; running multiple parallel TCP streams (e.g. `iperf3 -P 16`) bypasses single-stream buffer limits, saturating the full multi-gigabit link capacity.",
    explanation: "When testing a new 10G line in Jadavpur, running 1 stream achieves 1.2 Gbps, while 8 parallel streams achieve 9.6 Gbps.",
    hint: "Running multiple streams in parallel overcomes single-buffer limits to saturate the wire.",
    level: "expert",
    codeExample: "iPerf_SingleStream = '1.2 Gbps'; iPerf_16Streams = '9.6 Gbps (Full Wire Speed)';"
  },
  {
    question: "What is Slow Post DDoS Attack and how does it exhaust web server throughput capacity?",
    shortAnswer: "An attack (e.g. R-U-Dead-Yet / RUDY) where the attacker submits an HTTP POST with a huge `Content-Length` (e.g. 1,000,000 bytes) but transmits the body 1 byte every 10 seconds, tying up server worker threads and choking legitimate throughput.",
    explanation: "Mitigated by configuring web server timeout limits (`client_body_timeout 10s`) and minimum data transfer rate thresholds.",
    hint: "Submits a huge form upload but sends 1 byte every 10 seconds to tie up server threads.",
    level: "expert",
    codeExample: "nginx.conf: client_body_timeout 10s; client_header_timeout 10s;"
  },
  {
    question: "What is Maximum Transmission Unit (MTU) Path Discovery (PMTUD) and what happens when ICMP Type 3 Code 4 is blocked?",
    shortAnswer: "PMTUD discovers the lowest MTU along a path by sending packets with the Don't Fragment (DF) bit set; if firewalls block ICMP 'Fragmentation Needed' replies, packets exceeding the MTU are silently dropped, creating a 'Black Hole' connection stall.",
    explanation: "Network engineers in Kolkata configure TCP MSS Clamping (`iptables -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu`) to prevent MTU black holes.",
    hint: "Discovers the max packet size along a route; blocking ICMP causes mysterious connection stalls.",
    level: "expert",
    codeExample: "iptables -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu"
  },
  {
    question: "What is the difference between Committed Information Rate (CIR) and Peak Information Rate (PIR) in ISP throughput SLAs?",
    shortAnswer: "CIR is the guaranteed minimum throughput that the ISP contractually guarantees 100% of the time; PIR is the maximum burst throughput allowed when excess network capacity is available.",
    explanation: "An enterprise leased line in Barrackpore might have a CIR of 100 Mbps and a PIR of 150 Mbps, guaranteeing 100 Mbps under all conditions.",
    hint: "CIR is guaranteed minimum speed; PIR is maximum allowable burst speed.",
    level: "moderate",
    codeExample: "SLA_Config = { CIR: '100 Mbps (Guaranteed 24/7)', PIR: '150 Mbps (Burst Peak)' };"
  },
  {
    question: "How does Wi-Fi Channel Width (20MHz vs 80MHz vs 160MHz) impact wireless throughput?",
    shortAnswer: "Channel bonding combines adjacent 20MHz wireless channels: 80MHz quadruples raw data throughput (up to 1.2 Gbps in Wi-Fi 6), while 160MHz achieves 2.4 Gbps, at the expense of higher vulnerability to RF interference.",
    explanation: "High-density campus lecture halls in Jadavpur use 20MHz or 40MHz channels to avoid co-channel interference, while high-throughput labs use 80MHz.",
    hint: "Wider wireless channels (80MHz/160MHz) multiply throughput but increase interference.",
    level: "moderate",
    codeExample: "WiFi_Widths = { '20MHz': '287 Mbps', '80MHz': '1.2 Gbps', '160MHz': '2.4 Gbps' };"
  },
  {
    question: "What is the relationship between Disk I/O Throughput and Network Throughput in database replication?",
    shortAnswer: "If a receiving server's SSD write throughput is capped at 200 MB/s, incoming database replication network throughput will stall at 1.6 Gbps (200 MB/s * 8) regardless of whether the network card is 10 Gbps.",
    explanation: "Network engineers and database administrators must balance storage IOPS, NVMe write speeds, and network bandwidth to avoid end-to-end bottlenecks.",
    hint: "Slow disk write speed bottlenecks incoming network transfer speeds.",
    level: "moderate",
    codeExample: "MaxReplicationThroughput = Math.min(NetworkLink_10Gbps, (DiskWrite_200MBs * 8)); // 1.6 Gbps"
  },
  {
    question: "What is the ultimate golden rule for maximizing, benchmarking, and securing Network Throughput?",
    shortAnswer: "'Eliminate bottleneck links using min(R1..RN); size firewalls based on Threat Protection Throughput; tune TCP receive windows to match BDP and deploy TCP BBR; enable NIC hardware offloading (TSO/RSS) and Jumbo Frames; and budget enterprise NGFWs in Indian Rupees (₹)!'",
    explanation: "This complete rule captures bottleneck theory, transport layer optimization, hardware acceleration, security appliance sizing, and financial infrastructure planning.",
    hint: "Bottleneck elimination + Threat inspection sizing + TCP BBR + NIC offload + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: EliminateBottlenecks() -> SizeNGFWForThreatInspection() -> DeployTCPBBR() -> EnableNICOffload() -> BudgetInRupees(₹);"
  }
];

export default questions;
