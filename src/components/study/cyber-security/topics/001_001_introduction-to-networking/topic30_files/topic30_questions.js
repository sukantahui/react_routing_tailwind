// topic30_questions.js
// 30 Moderate to Expert Questions on Bandwidth in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is Bandwidth in digital computer networking?",
    shortAnswer: "Bandwidth is the maximum theoretical data transfer capacity of a network communication channel, representing the maximum volume of bits that can be transmitted per second (measured in bps, Mbps, Gbps, or Tbps).",
    explanation: "Bandwidth represents the width of the digital pipeline; higher bandwidth allows more concurrent data streams and larger file transfers per unit of time.",
    hint: "Theoretical maximum data capacity of a network pipe measured in bits per second.",
    level: "moderate",
    codeExample: "Bandwidth = '1000 Mbps (1 Gbps Theoretical Pipeline Capacity)';"
  },
  {
    question: "How does Bandwidth differ fundamentally from Throughput and Goodput?",
    shortAnswer: "Bandwidth is the theoretical maximum channel capacity; Throughput is the actual measured data rate transmitted across the wire; Goodput is the useful application payload data received excluding all protocol header overheads and retransmissions.",
    explanation: "On a 100 Mbps bandwidth link with congestion and TCP/IP headers, throughput might be 85 Mbps, while actual goodput (file payload) is 78 Mbps.",
    hint: "Bandwidth = Maximum Capacity; Throughput = Actual Wire Speed; Goodput = Useful Payload.",
    level: "expert",
    codeExample: "Relationship: Bandwidth (100Mbps) >= Throughput (85Mbps) >= Goodput (78Mbps);"
  },
  {
    question: "What is Shannon’s Channel Capacity Theorem and what formula defines it?",
    shortAnswer: "Shannon's Theorem defines the maximum theoretical error-free data rate (Capacity C in bps) of a noisy channel: C = B * log2(1 + SNR), where B is bandwidth in Hertz and SNR is the Signal-to-Noise Ratio (S/N).",
    explanation: "Shannon capacity proves that increasing channel frequency bandwidth or increasing signal power directly boosts maximum achievable data transmission rate.",
    hint: "C = B * log2(1 + SNR) calculates the maximum data capacity over a noisy channel.",
    level: "expert",
    codeExample: "function shannonLimit(bandwidthHz, snrRatio) { return bandwidthHz * Math.log2(1 + snrRatio); }"
  },
  {
    question: "What is Nyquist’s Bit Rate Theorem for noiseless communication channels?",
    shortAnswer: "Nyquist's formula (C = 2 * B * log2(M)) calculates the maximum data rate of a noiseless channel based on bandwidth (B in Hz) and the number of discrete signal voltage levels (M).",
    explanation: "For example, a 3 kHz telephone channel using binary signaling ($M=2$) has a maximum Nyquist capacity of $2 \\times 3000 \\times \\log_2(2) = 6000$ bps (6 kbps).",
    hint: "C = 2 * B * log2(M) for noiseless channels with M signal levels.",
    level: "expert",
    codeExample: "function nyquistCapacity(bandwidthHz, signalLevels) { return 2 * bandwidthHz * Math.log2(signalLevels); }"
  },
  {
    question: "What is the Bandwidth-Delay Product (BDP) and why is it critical for TCP performance?",
    shortAnswer: "BDP = Bandwidth (bps) * Round-Trip Time (RTT in seconds), which calculates the maximum amount of unacknowledged 'in-flight' data that can fill the network pipe; TCP receive window size (RWIN) must be configured to match BDP for maximum throughput.",
    explanation: "If BDP is 10 MB but the TCP window is capped at 64 KB, a 10Gbps link will achieve less than 1% of its potential bandwidth due to sender stalling.",
    hint: "BDP = Bandwidth * RTT; determines optimal TCP buffer size to fill the pipe.",
    level: "expert",
    codeExample: "BDP_Bytes = (Bandwidth_bps * RTT_seconds) / 8; // Optimal TCP Window Size"
  },
  {
    question: "What is a 1:1 Symmetric Internet Leased Line (ILL) vs Shared Broadband?",
    shortAnswer: "An Internet Leased Line provides dedicated 1:1 unshared bandwidth with equal upload and download speeds and guaranteed 99.9% SLAs; Shared broadband has asymmetric speeds (high download, low upload) with 1:8 or 1:10 contention ratios.",
    explanation: "Offices and data centers in Kolkata deploy 1:1 leased lines to host servers, VPNs, and video streams without peak-hour congestion.",
    hint: "Leased line has equal upload/download with 1:1 unshared SLA; broadband is shared.",
    level: "moderate",
    codeExample: "LeasedLine = { Contention: '1:1 Dedicated', Upload: '100Mbps', Download: '100Mbps', SLA: '99.9%' };"
  },
  {
    question: "What is the typical monthly cost in Indian Rupees (₹) for a 100 Mbps 1:1 Dedicated Internet Leased Line in West Bengal?",
    shortAnswer: "Approximately ₹15,000 to ₹25,000 per month (₹1,80,000 – ₹3,00,000 annually) from Tier-1 enterprise telecom providers (Tata Tele Business Services, Airtel Enterprise, Reliance Jio Business).",
    explanation: "ILL pricing accounts for symmetric upload/download, dedicated optical fiber last-mile delivery, static public IP blocks, and 4-hour MTTR hardware replacement SLAs in ₹.",
    hint: "100 Mbps 1:1 ILL costs ₹15,000 – ₹25,000 / month in Indian Rupees.",
    level: "moderate",
    codeExample: "ILL_100Mbps_MonthlyCost = ₹18,500; // Includes 1:1 unshared bandwidth and /29 static IP block"
  },
  {
    question: "What is Quality of Service (QoS) Bandwidth Prioritization?",
    shortAnswer: "A set of traffic management techniques (DSCP tagging, priority queuing, CBWFQ) that reserves guaranteed bandwidth for mission-critical, delay-sensitive traffic (e.g., VoIP calls, video conferences) over bulk file downloads during link congestion.",
    explanation: "When an office pipe in Barrackpore is 95% full, QoS ensures doctor telemedicine video calls receive priority while student YouTube downloads are throttled.",
    hint: "Prioritizes important traffic like VoIP calls over heavy downloads during congestion.",
    level: "moderate",
    codeExample: "qosPolicy.reserveBandwidth({ TrafficType: 'VoIP_SIP', GuaranteedPercent: 30, Priority: 'High' });"
  },
  {
    question: "What is a Volumetric Bandwidth Saturation DDoS Attack?",
    shortAnswer: "A cyber attack where botnets flood a target network with tens to hundreds of Gigabits (or Terabits) per second of garbage traffic (UDP floods, DNS amplification, NTP reflection) to saturate upstream ISP transit pipes and deny access to legitimate users.",
    explanation: "Even if a server is completely hardened, if incoming attack traffic exceeds the physical 1 Gbps ISP fiber line, legitimate packets are dropped at the ISP gateway.",
    hint: "Floods the network pipe with so much garbage traffic that normal packets cannot get through.",
    level: "expert",
    codeExample: "AttackVolume = '250 Gbps'; LinkCapacity = '10 Gbps' => PipeSaturated = 100%;"
  },
  {
    question: "What is BGP Blackholing (Null0 Routing) in volumetric DDoS mitigation?",
    shortAnswer: "An emergency defense technique where the victim network signals its upstream ISP via BGP community tags to silently drop (route to Null0) all incoming traffic destined for an attacked IP address at the ISP edge before it congests the enterprise link.",
    explanation: "While blackholing takes the attacked server offline, it prevents the entire enterprise campus pipe from saturating, preserving connectivity for all other departments.",
    hint: "Drops all traffic to an attacked IP address at the ISP before it chokes the office link.",
    level: "expert",
    codeExample: "bgp.advertiseCommunity('65535:666'); // Instructs upstream ISP to Blackhole target IP"
  },
  {
    question: "What are the Token Bucket and Leaky Bucket algorithms in bandwidth traffic shaping?",
    shortAnswer: "Leaky Bucket outputs data packets at a fixed constant rate regardless of burstiness; Token Bucket allows bursts of traffic up to a specified token capacity while enforcing an average long-term bandwidth limit.",
    explanation: "Routers in Jadavpur use Token Bucket algorithms to allow web applications to burst quickly when loading pages while preventing long-term line saturation.",
    hint: "Traffic shaping algorithms: Leaky bucket enforces constant rate; Token bucket allows bursts.",
    level: "expert",
    codeExample: "tokenBucket.consume(packetSize) => if (tokensAvailable >= packetSize) forwardPacket();"
  },
  {
    question: "What is Bandwidth Throttling (Rate Limiting) and why do web servers enforce it?",
    shortAnswer: "Intentionally limiting the download/upload speed or request rate of specific client IP addresses (e.g., max 5 Mbps or 20 requests/sec) to prevent single users or scraping bots from consuming all available server bandwidth.",
    explanation: "Nginx reverse proxies enforce `limit_req` and `limit_rate` directives to guarantee fair bandwidth distribution across all connected users.",
    hint: "Limiting download speed per user so nobody hogs the entire network pipeline.",
    level: "moderate",
    codeExample: "nginx.conf: 'limit_rate 500k;' // Limits individual client download speed to 500 KB/s"
  },
  {
    question: "How do TCP Window Scaling (RFC 1323) options overcome the legacy 64 KB window limit on high-bandwidth links?",
    shortAnswer: "TCP Window Scaling introduces a scale factor in the TCP handshake that multiplies the 16-bit window size field up to 1 Gigabyte, allowing high-bandwidth high-latency links to achieve wire speed.",
    explanation: "Without window scaling, standard TCP cannot exceed ~5 Mbps across transatlantic fiber links regardless of whether the physical cable is 10 Gbps.",
    hint: "Expands the TCP receive window from 64KB up to 1GB to unlock high-speed fiber pipes.",
    level: "expert",
    codeExample: "TCP_Header: WindowSize = 65535 * (2 ^ ScaleFactor_7) = 8.38 MB Window;"
  },
  {
    question: "Suppose Mamata in Kolkata manages a college with a 500 Mbps Internet link and 50ms RTT latency to cloud servers. What is the calculated Bandwidth-Delay Product (BDP) in Megabytes?",
    shortAnswer: "BDP = (500,000,000 bps * 0.050 seconds) / 8 = 25,000,000 bits / 8 = 3.125 Megabytes (MB).",
    explanation: "To fully utilize the 500 Mbps pipe for single-stream cloud backups, the host TCP receive buffer must be configured to at least 3.125 MB.",
    hint: "BDP = (500 Mbps * 0.050s) / 8 = 3.125 Megabytes.",
    level: "expert",
    codeExample: "BDP = (500 * 10^6 * 0.050) / 8 / 1024 / 1024; // 3.125 MB Buffer"
  },
  {
    question: "What is Link Aggregation / EtherChannel (IEEE 802.3ad) and how does it multiply switch bandwidth?",
    shortAnswer: "It bundles up to 8 physical Ethernet or fiber cables into a single logical trunk interface, multiplying available bandwidth (e.g., 4 x 1 Gbps = 4 Gbps logical pipe) while providing automatic link failover.",
    explanation: "Switch interlinks between core and distribution switches in Jadavpur use LACP bonding to eliminate bandwidth bottlenecks between buildings.",
    hint: "Combines multiple cables into one logical high-bandwidth trunk.",
    level: "moderate",
    codeExample: "lacp.bundle([Port1, Port2, Port3, Port4]) => AggregateBandwidth = '4 Gbps';"
  },
  {
    question: "What is the difference between Bits per second (bps) and Bytes per second (B/s) in bandwidth calculations?",
    shortAnswer: "1 Byte = 8 Bits. Telecom bandwidth is universally advertised in bits per second (e.g., 100 Mbps), whereas file downloads and storage capacities are displayed in bytes per second (e.g., 100 Mbps / 8 = 12.5 MB/s).",
    explanation: "Beginners often mistakenly expect a 100 Mbps broadband connection to download files at 100 MB/s; the true maximum download speed is 12.5 MB/s.",
    hint: "Divide bits per second (Mbps) by 8 to get actual download bytes per second (MB/s).",
    level: "basic",
    codeExample: "MaxDownloadSpeed_MBps = AdvertisedBandwidth_Mbps / 8; // 100 / 8 = 12.5 MB/s"
  },
  {
    question: "What is a Content Delivery Network (CDN) and how does it conserve origin server bandwidth?",
    shortAnswer: "A CDN caches static website assets (images, videos, scripts) on edge servers globally distributed close to users (e.g. Kolkata ISP peering nodes), absorbing up to 90% of traffic and reducing origin server bandwidth costs in ₹.",
    explanation: "When thousands of students view college results, the edge CDN serves cached pages directly, preventing the college's 100 Mbps leased line from crashing.",
    hint: "Caches files near users so origin server bandwidth is not overloaded.",
    level: "moderate",
    codeExample: "cdnEdge.serveCachedAsset() => OriginBandwidthSaved = '92%';"
  },
  {
    question: "What is Over-Subscription (Contention Ratio) in commercial broadband networks?",
    shortAnswer: "The ratio of total subscribed customer bandwidth to the actual upstream network pipe capacity (e.g. selling 1000 Mbps of total customer plans over a 100 Mbps physical uplink, a 1:10 contention ratio).",
    explanation: "ISPs rely on statistical multiplexing because not all users download at maximum speed simultaneously; during peak evening hours, contention causes speed drops.",
    hint: "Selling more total customer bandwidth than the physical uplink can support (e.g. 1:10).",
    level: "moderate",
    codeExample: "ContentionRatio = TotalCustomerBandwidth / PhysicalUplinkBandwidth; // e.g. 10:1"
  },
  {
    question: "What is Multi-Protocol Label Switching (MPLS) and how does it deliver guaranteed enterprise bandwidth?",
    shortAnswer: "MPLS is a high-performance routing mechanism that directs data using short path labels rather than complex routing table lookups, establishing dedicated virtual circuits with committed bandwidth SLAs across telecommunications backbones.",
    explanation: "Banking networks in West Bengal use MPLS VPNs to guarantee private, zero-jitter 10 Mbps pipes between retail branches and data centers.",
    hint: "Telecommunications protocol providing dedicated virtual circuits with guaranteed bandwidth.",
    level: "expert",
    codeExample: "mplsCircuit.provision({ CommittedInformationRate: '10 Mbps', Jitter: '<2ms' });"
  },
  {
    question: "How does HTTP/2 and HTTP/3 Multiplexing optimize bandwidth utilization on web servers?",
    shortAnswer: "Multiplexing allows multiple simultaneous HTTP requests and responses to be interleaved over a single TCP/QUIC connection, eliminating Head-of-Line (HoL) blocking and slashing connection setup bandwidth overhead.",
    explanation: "Instead of opening 6 separate TCP connections per page load, HTTP/3 sends all images, stylesheets, and scripts over a single UDP/QUIC stream.",
    hint: "Sends multiple files over a single connection simultaneously to save bandwidth.",
    level: "expert",
    codeExample: "HTTP3_Connection.multiplex([Request1_HTML, Request2_CSS, Request3_Image]);"
  },
  {
    question: "What is Deep Packet Inspection (DPI) in bandwidth traffic shaping and monitoring?",
    shortAnswer: "An advanced network packet filtering technique that examines the actual data payload (Layer 7) in addition to packet headers to identify specific applications (e.g., BitTorrent, Netflix, Zoom) and apply bandwidth quotas.",
    explanation: "Enterprise firewalls in Barrackpore use DPI to throttle P2P torrent downloads to 64 kbps while dedicating 50 Mbps to business video conferences.",
    hint: "Inspects application payloads inside packets to throttle bandwidth-heavy apps like BitTorrent.",
    level: "expert",
    codeExample: "if (dpiEngine.detectsApplication(packet) === 'BitTorrent') qos.throttleBandwidth('64kbps');"
  },
  {
    question: "What is Asymmetric vs Symmetric Bandwidth in telecommunications?",
    shortAnswer: "Symmetric bandwidth provides equal upload and download speeds (e.g. 100 Mbps up / 100 Mbps down); Asymmetric bandwidth provides high download speed but limited upload speed (e.g. 300 Mbps down / 30 Mbps up).",
    explanation: "Consumers primarily download media, so asymmetric FTTH broadband is sufficient; enterprise servers host files and need symmetric leased lines.",
    hint: "Symmetric: Upload equals Download; Asymmetric: Fast Download, Slow Upload.",
    level: "basic",
    codeExample: "Symmetric = '100 Mbps / 100 Mbps'; Asymmetric = '300 Mbps Down / 30 Mbps Up';"
  },
  {
    question: "What is an Anycast Cloud Scrubbing Center for mitigating 1+ Terabit/sec DDoS bandwidth attacks?",
    shortAnswer: "A globally distributed network of high-capacity data centers (e.g., Cloudflare, Akamai) with massive aggregate bandwidth (100+ Tbps) that intercepts volumetric attack traffic, scrubs out malicious packets, and forwards only clean traffic to origin servers.",
    explanation: "Because an enterprise in Kolkata cannot absorb a 500 Gbps attack on a 1 Gbps pipe, cloud scrubbing centers absorb and filter the flood at global peering edges.",
    hint: "Cloud security network that absorbs massive 1+ Tbps attacks and cleans the traffic.",
    level: "expert",
    codeExample: "cloudScrubber.absorbAttack(500Gbps_Flood) => forwardsCleanTrafficToOrigin(50Mbps);"
  },
  {
    question: "What is Compression (e.g., Gzip / Brotli) and how does it save bandwidth on web applications?",
    shortAnswer: "Lossless data compression algorithms applied by web servers to text files (HTML, CSS, JavaScript, JSON) before transmission, reducing transferred file sizes by up to 70–80% and accelerating page load times.",
    explanation: "Compressing a 1 MB JavaScript bundle to 200 KB saves 800 KB of bandwidth on every user request across mobile networks.",
    hint: "Compresses website text files by up to 80% to save network bandwidth.",
    level: "moderate",
    codeExample: "Content-Encoding: br // Brotli compression shrinks 1MB bundle to 180KB"
  },
  {
    question: "What is Bandwidth Metering / Usage Quotas (Fair Usage Policy - FUP) on ISP connections?",
    shortAnswer: "A policy where an ISP provides high-speed bandwidth up to a monthly data volume limit (e.g., 3.3 TB/month); exceeding the quota throttles bandwidth down to a lower speed (e.g., 2 Mbps) for the remainder of the billing cycle.",
    explanation: "FUP prevents individual heavy users from monopolizing shared neighborhood fiber conduits in Kolkata residential zones.",
    hint: "Limits total monthly gigabytes downloaded before throttling speed.",
    level: "basic",
    codeExample: "if (monthlyDataUsed > 3300_GB) isp.throttleSpeed('2 Mbps');"
  },
  {
    question: "What is the relationship between Carrier Frequency and Bandwidth in wireless transmission media?",
    shortAnswer: "Higher carrier frequencies (e.g. 5GHz, 6GHz, 60GHz mmWave) have wider available electromagnetic spectrum and can support vastly higher bandwidth data rates, but suffer higher attenuation and shorter physical transmission range.",
    explanation: "Wi-Fi 6GHz supports 160 MHz wide channels delivering 2.4 Gbps speed, whereas 2.4 GHz supports only 20 MHz channels capped at ~300 Mbps.",
    hint: "Higher wireless frequency provides more bandwidth but shorter distance.",
    level: "expert",
    codeExample: "FreqVsBandwidth = { '2.4GHz': '20MHz Channel (300Mbps)', '6GHz': '160MHz Channel (2.4Gbps)' };"
  },
  {
    question: "What diagnostic tool is used by network engineers to benchmark raw bandwidth throughput between two servers?",
    shortAnswer: "iPerf3 (or iPerf) — a command-line tool that generates multi-threaded TCP and UDP streams between a client and server to measure maximum achievable throughput, packet loss, and jitter.",
    explanation: "Network engineers in Barrackpore run `iperf3 -c 10.0.1.5 -P 8` to verify whether a new 10G optical fiber link achieves full wire speed.",
    hint: "iPerf3 command-line utility used to benchmark network speed and throughput.",
    level: "moderate",
    codeExample: "# Server:\niperf3 -s\n# Client:\niperf3 -c 192.168.10.1 -P 4 -t 30"
  },
  {
    question: "What is Jitter and how does it degrade bandwidth efficiency in real-time communications?",
    shortAnswer: "Jitter is the statistical variation in packet arrival time delay (latency variance); high jitter forces VoIP and video players to expand buffer sizes, causing audio stuttering and packet discards despite high available bandwidth.",
    explanation: "A link with 100 Mbps bandwidth but 80ms jitter delivers terrible video calling quality compared to a clean 10 Mbps link with under 2ms jitter.",
    hint: "Variation in packet arrival delays causing choppy audio and video calls.",
    level: "moderate",
    codeExample: "Jitter = Math.abs(Latency_Packet2 - Latency_Packet1); // Ideal Jitter < 5ms"
  },
  {
    question: "What is Optical Wavelength Division Multiplexing (WDM / DWDM) and how does it expand fiber optic bandwidth?",
    shortAnswer: "WDM transmits multiple simultaneous data streams over a single optical fiber strand by assigning each stream to a different wavelength (color) of laser light (e.g., 80 wavelengths x 100 Gbps = 8 Terabits/sec per fiber pair).",
    explanation: "DWDM allows telecommunications backbones between Kolkata and Mumbai to expand bandwidth by 8000% without laying new physical undersea or underground fiber cables.",
    hint: "Sends multiple colors of laser light down the same fiber to achieve Terabits of bandwidth.",
    level: "expert",
    codeExample: "DWDM_Capacity = 80_Wavelengths * 100Gbps = 8_Tbps per fiber strand;"
  },
  {
    question: "What is the ultimate golden rule for provisioning, managing, and securing Network Bandwidth?",
    shortAnswer: "'Deploy 1:1 symmetric leased lines with guaranteed SLAs for core operations; optimize TCP window buffers to match Bandwidth-Delay Product (BDP); prioritize real-time traffic with QoS; deploy cloud scrubbing to absorb volumetric DDoS; and budget enterprise ILL in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes network bandwidth capacity planning, transport layer optimization, traffic prioritization, and cyber defense against volumetric attacks.",
    hint: "1:1 Leased lines + BDP buffer tuning + QoS prioritization + Cloud DDoS scrubbing + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DeploySymmetricILL() → TuneBDPBuffers() → PrioritizeWithQoS() → MitigateDDoS() → BudgetInRupees(₹);"
  }
];

export default questions;
