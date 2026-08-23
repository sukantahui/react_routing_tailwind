const questions = [
  {
    question: "What is a Volumetric DDoS Attack, and what primary metric is used to measure its magnitude?",
    shortAnswer: "A DDoS attack designed to overwhelm and saturate the physical network bandwidth capacity of a target or its upstream ISP, measured primarily in Bits Per Second (Gigabits per second - Gbps or Terabits per second - Tbps).",
    explanation: "Unlike application layer attacks that target server CPU/RAM with small requests, Volumetric DDoS attacks send massive volumes of raw data traffic (e.g. 500 Gbps to 2 Tbps). The volume exceeds the physical capacity of the enterprise's internet uplink or border router interfaces, causing upstream routers to drop all legitimate customer packets before they reach the enterprise firewall.",
    hint: "Dumping thousands of truckloads of dirt onto a two-lane highway so no cars can drive through.",
    level: "basic",
    codeExample: `// Volumetric DDoS Metrics:
// Bandwidth Magnitude : Measured in Gigabits per second (Gbps) or Terabits per second (Tbps)
// Packet Volume       : Measured in Packets per second (PPS) or Millions of PPS (Mpps)
// Primary Objective   : Physical Network Uplink Pipe Saturation!`
  },
  {
    question: "How does a UDP Flood Attack work, and why does UDP's Connectionless Design make it Ideal for Volumetric Flooding?",
    shortAnswer: "The attacker sends high volumes of UDP packets to random ports on the victim server; because UDP requires no handshake, the attacker can spoof Source IPs with zero overhead, forcing the victim to process the packet and return ICMP 'Port Unreachable' errors.",
    explanation: "TCP requires a handshake that verifies the sender's IP. UDP is stateless and connectionless. An attacker generates millions of 1400-byte UDP packets with forged source IP addresses targeting random ports (e.g. ports 10,000-60,000). The victim's operating system checks for listening applications, finds none, and generates an ICMP Destination Unreachable (Type 3, Code 3) packet, exhausting both bandwidth and CPU.",
    hint: "Throwing thousands of unaddressed heavy boxes over someone's fence, forcing them to open each box and write a return label.",
    level: "basic",
    codeExample: `// UDP Flood Attack Sequence:
// 1. Attacker Botnet ➔ Sends 500,000 UDP datagrams/sec with spoofed IPs to random high ports
// 2. Victim OS       ➔ Checks port ➔ Finds no listening service
// 3. Victim OS       ➔ Generates ICMP Type 3 Code 3 (Port Unreachable) reply
// 4. Result          ➔ Uplink saturated and CPU overwhelmed handling ICMP error generation!`
  },
  {
    question: "What is an 'ICMP Ping Flood Attack', and how does it exhaust Symmetrical vs Asymmetrical Network Links?",
    shortAnswer: "Sending overwhelming volumes of ICMP Echo Request (Type 8) packets to a victim; the victim is forced to reply with ICMP Echo Reply (Type 0) packets of equal size, consuming both inbound downlink and outbound uplink bandwidth.",
    explanation: "In an ICMP Ping Flood, an attacker floods a server with 64KB ICMP echo request packets as fast as possible without waiting for replies. The victim server must allocate resources to generate corresponding ICMP echo replies. On asymmetrical connections (where upload speed is slower than download speed), the outbound echo replies rapidly choke the victim's upstream link.",
    hint: "Throwing 10,000 tennis balls per second at a tennis player, expecting them to hit every ball back.",
    level: "basic",
    codeExample: `# Python Scapy ICMP Flood Generator:
from scapy.all import *
target = "103.25.10.50"
packet = IP(dst=target)/ICMP(type=8, code=0)/Raw(load=b"A"*1400)
send(packet, loop=1, inter=0.001, verbose=False)`
  },
  {
    question: "What is 'UDP Fragmentation Flooding', and how does it Consume Router Reassembly Memory Buffers?",
    shortAnswer: "Sending large UDP packets broken into fragmented pieces that cannot be reassembled or contain missing initial fragments, forcing intermediate routers and servers to hold incomplete packets in memory until buffers overflow.",
    explanation: "When packets exceed the network MTU (typically 1500 bytes), they are fragmented. Attackers send fake secondary fragments (with non-zero fragment offsets) without ever sending the initial fragment (offset 0). The victim operating system allocates memory in its IP reassembly queue waiting for the missing initial fragment until the reassembly buffer overflows and crashes network processing.",
    hint: "Mailing part 2 and part 3 of an instruction manual without ever sending part 1, forcing the builder to wait forever with pieces spread across the floor.",
    level: "expert",
    codeExample: `// UDP Fragmentation Flood Header Structure:
// Fragment 1: IP.flags = MF (More Fragments), IP.frag = 185 (Offset 1480), No UDP Header!
// Target OS allocates reassembly buffer in kernel memory
// Initial fragment (Offset 0) NEVER arrives ➔ Memory buffer holds allocation until timeout!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the penalty for a Volumetric DDoS Attack targeting Essential Utility Services?",
    shortAnswer: "Flooding and paralyzing essential utility systems (power, water, transportation, defense) to threaten national security or terrorize the public is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act governs Cyber Terrorism: 'Whoever, with intent to threaten the unity, integrity, security or sovereignty of India... denies or causes the denial of access to any person authorized to access computer resource... shall be punishable with imprisonment which may extend to imprisonment for life.'",
    hint: "Section 66F prescribes Life Imprisonment for volumetric DoS cyber terrorism.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Saturating state electrical grid telemetry bandwidth with 600 Gbps UDP floods
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "How does Network Interface Card (NIC) Ring Buffer Overflow & CPU SoftIRQ Saturation (`ksoftirqd`) occur during High-PPS Volumetric Floods?",
    shortAnswer: "When incoming packet rates (e.g. 30 Mpps) exceed the hardware NIC descriptor ring buffer capacity, hardware interrupts overwhelm the kernel's software interrupt daemon (`ksoftirqd`), driving 100% CPU on Core 0.",
    explanation: "Every incoming network packet generates an interrupt. Under a 30 Million Packet-Per-Second flood, the hardware NIC ring buffer overflows, dropping packets before they reach the OS. The CPU spends 100% of its cycles handling hardware interrupts in `ksoftirqd` and never executes user-space application code, freezing all services.",
    hint: "A receptionist overwhelmed by 500 people talking at the exact same second, spending all their energy just hearing the noise rather than answering questions.",
    level: "expert",
    codeExample: `# Linux SoftIRQ & Ring Buffer Diagnostics:
# View CPU cycles spent in softirq:
top (inspect %si column)
# View dropped packets in NIC ring buffer:
ethtool -S eth0 | grep rx_dropped
# Scale ring buffer size:
ethtool -G eth0 rx 4096 tx 4096`
  },
  {
    question: "What is 'ICMP Rate Limiting' (icmp_ratelimit / icmp_msgs_per_sec) in Linux Kernel Hardening?",
    shortAnswer: "Restricting the maximum number of ICMP response packets (Destination Unreachable, Echo Reply) the operating system kernel is allowed to generate per second, preventing CPU and uplink starvation during floods.",
    explanation: "When attacked by UDP or ICMP floods, the Linux kernel generates error responses. By configuring `net.ipv4.icmp_ratelimit = 100` and `net.ipv4.icmp_msgs_per_sec = 100`, the kernel caps ICMP error packet generation to 100 per second. Any additional UDP packets on closed ports are dropped silently without wasting CPU cycles or outbound bandwidth.",
    hint: "Setting a rule that customer service will only say 'We cannot help you' 100 times per minute, ignoring the rest to save their voice.",
    level: "moderate",
    codeExample: `# Linux sysctl ICMP Rate Limiting Configuration:
sysctl -w net.ipv4.icmp_ratelimit=100
sysctl -w net.ipv4.icmp_ratemask=6168
# Completely blocks UDP floods from forcing outbound ICMP error floods!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if Volumetric DDoS causes extended healthcare or banking outages?",
    shortAnswer: "Failing to deploy adequate volumetric traffic mitigation resulting in prolonged availability collapse for personal data services triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards against data disruptions. If a major hospital network or banking switch in West Bengal fails to maintain upstream bandwidth scrubbing, resulting in persistent service paralysis for citizens, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Volumetric DDoS availability collapse triggers maximum national data privacy penalties.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent bandwidth resilience controls`
  },
  {
    question: "What is 'BGP Anycast Ingress Load Distribution' for Volumetric Floods vs Unicast Routing?",
    shortAnswer: "Anycast announces the same IP address from hundreds of data centers globally; internet routing automatically splits a 1 Tbps flood into hundreds of 3 Gbps chunks absorbed locally by regional scrubbing nodes.",
    explanation: "In Unicast, all 1 Tbps travels to a single physical data center in Kolkata, completely overwhelming its 10 Gbps uplink. With Anycast, Cloudflare or Akamai advertises the target IP across 300 global Points of Presence (PoPs). Attack traffic from Europe hits London/Frankfurt, Asian traffic hits Singapore, and US traffic hits Ashburn, diluting the flood into small, manageable chunks that are scrubbed in hardware.",
    hint: "Diverting a giant flood into 300 small irrigation canals instead of letting the entire river crash into one house.",
    level: "expert",
    codeExample: `// BGP Anycast Volumetric Dilution Formula:
// Ingress Flood  : 900 Gbps generated by 300,000 global bots
// Anycast PoPs   : 300 Global Scrubbing Nodes
// Average Load   : 900 Gbps / 300 PoPs = 3.0 Gbps per local node (Easily absorbed by 100 Gbps NICs!)`
  },
  {
    question: "What is 'BGP Flowspec' (RFC 5575) Filtering for Volumetric UDP Floods?",
    shortAnswer: "Injecting granular firewall filtering rules (e.g. drop UDP packets to destination port 53 with packet length > 1200 bytes) directly into Tier-1 ISP core routers, dropping volumetric floods before they reach customer fiber links.",
    explanation: "Traditional BGP blackholing drops all traffic to the victim IP. BGP Flowspec allows selective matching: an enterprise in Kolkata signals Airtel or Tata Communications to drop ONLY UDP packets matching specific port and length signatures. The 500 Gbps attack traffic is discarded in ISP core hardware, while legitimate TCP web traffic continues unaffected.",
    hint: "Having the water company filter out debris at the reservoir so clean water still flows to your house.",
    level: "expert",
    codeExample: `// BGP Flowspec (RFC 5575) UDP Flood Rule:
flow-route {
    match {
        destination 103.25.10.50/32;
        protocol udp;
        destination-port 10000-65535; # Random high UDP ports
        packet-length 1400-1500;      # Volumetric junk payloads
    }
    then {
        rate-limit 0;                 # Drops 100% of attack traffic at ISP Core!
    }
}`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Volumetric DDoS attacks affecting Indian organizations?",
    shortAnswer: "All organizations in India must report volumetric DDoS attacks causing network degradation or service outages to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including volumetric DDoS attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of volumetric network outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Null0 Blackhole Routing', and when is it used as a Last-Resort Volumetric Defense?",
    shortAnswer: "Advertising a BGP route with a community string that instructs upstream ISPs to drop all traffic destined for the targeted victim IP address into a virtual discard interface (`Null0`), sacrificing that single IP to protect the rest of the subnet.",
    explanation: "When a single server in Kolkata receives a 500 Gbps flood that threatens to saturate the entire data center's 40 Gbps uplink, network engineers announce a BGP Blackhole route for the victim IP. Upstream ISP routers route all packets for that specific IP to `Null0` (discard). While the targeted IP goes offline, all other thousands of corporate servers on the subnet are saved from collapse.",
    hint: "Sacrificing one room to save the rest of the building from a raging fire.",
    level: "moderate",
    codeExample: `// BGP Blackholing Announcement:
router bgp 65000
 neighbor 182.70.1.1 remote-as 9498 # ISP AS
 address-family ipv4
  network 103.25.10.50/32 route-map SET-BLACKHOLE
!
route-map SET-BLACKHOLE permit 10
 set community 9498:666 # ISP Blackhole Community (Drops all traffic to victim IP!)`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching a volumetric UDP or ICMP flood?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes volumetric denial of service: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching a 200 Gbps UDP flood that takes down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "How do 'XDP (eXpress Data Path) and eBPF' Filter Volumetric Packet Floods at 40+ Mpps in the Linux Kernel?",
    shortAnswer: "XDP executes eBPF bytecode directly inside the network interface driver before kernel socket memory (`sk_buff`) is allocated, dropping malicious UDP/ICMP packets at wire speed in hardware (40+ Million PPS per core).",
    explanation: "Traditional Linux packet filtering (`iptables`) allocates an `sk_buff` data structure for every packet, capping performance at ~2 Mpps per core. XDP (eXpress Data Path) runs a small C program directly inside the network card's device driver ring buffer. If a packet matches a UDP flood signature, XDP returns `XDP_DROP` instantly, dropping 40 Million packets per second per CPU core without touching the Linux network stack.",
    hint: "A bouncer checking tickets at the turnstile gate outside the stadium before visitors enter the building.",
    level: "expert",
    codeExample: `// C eBPF / XDP Packet Filter Snippet:
SEC("xdp")
int xdp_drop_udp_flood(struct xdp_md *ctx) {
    void *data = (void *)(long)ctx->data;
    void *data_end = (void *)(long)ctx->data_end;
    struct iphdr *iph = data + sizeof(struct ethhdr);
    
    if ((void *)(iph + 1) > data_end) return XDP_PASS;
    if (iph->protocol == IPPROTO_UDP) {
        // Drop high-port UDP flood packets at wire speed!
        return XDP_DROP;
    }
    return XDP_PASS;
}`
  },
  {
    question: "What is 'Asymmetrical Bandwidth Exhaustion' in Volumetric DDoS Attacks?",
    shortAnswer: "Exploiting commercial internet connections where downstream bandwidth is significantly larger than upstream bandwidth (e.g. 500 Mbps download vs 50 Mbps upload), making the upstream pipe easy to saturate with small response payloads.",
    explanation: "Commercial broadband and enterprise connections often have asymmetrical bandwidth ratios (e.g. 1 Gbps download, 100 Mbps upload). In an ICMP or DNS flood, incoming requests fill the downlink, but the server's automated outbound reply packets immediately saturate the much smaller 100 Mbps uplink, freezing all outbound business communications.",
    hint: "A pipe that can receive 100 gallons of water per minute but can only drain 10 gallons per minute, causing immediate overflow.",
    level: "moderate",
    codeExample: `// Asymmetrical Link Saturation:
// Enterprise Ingress Link : 1000 Mbps (1 Gbps)
// Enterprise Egress Link  : 100 Mbps
// Inbound Ping Flood      : 150 Mbps of ICMP Echo Requests
// Outbound Ping Replies   : 150 Mbps ➔ EXCEEDS 100 Mbps UPLINK ➔ 100% Outbound Packet Drop!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for using botnets to launch volumetric bandwidth floods?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Flooding an online examination portal with 300 Gbps of UDP traffic to disrupt exams
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Junk Payload Padding' in Volumetric UDP Floods?",
    shortAnswer: "Filling the data payload of UDP packets with 1400 bytes of pseudo-random garbage characters to maximize packet size up to the 1500-byte MTU, achieving maximum bandwidth consumption per packet.",
    explanation: "A UDP packet with 0 bytes payload consumes only 28 bytes of bandwidth. To maximize pipe saturation, botnet attack scripts pad the packet with 1400 bytes of random alphanumeric characters: `IP Header (20B) + UDP Header (8B) + Junk Payload (1400B) = 1428 Bytes`. A bot sending 50,000 PPS generates 570 Mbps of bandwidth, allowing a small 1,000-bot swarm to generate over 500 Gbps.",
    hint: "Mailing a giant brick in every package instead of an empty envelope so the delivery truck fills up after just 10 packages.",
    level: "basic",
    codeExample: `// Junk Payload Construction (C Socket):
char packet[1428];
memset(packet + 28, 'A', 1400); // 1400 Bytes of Junk Padding
sendto(raw_sock, packet, sizeof(packet), 0, (struct sockaddr *)&target, sizeof(target));`
  },
  {
    question: "Synthesize an enterprise-scale Volumetric DDoS Defense Architecture.",
    shortAnswer: "A multi-layered system combining Cloud Anycast Scrubbing Centers (10+ Tbps capacity), BGP Flowspec (RFC 5575) ISP core filtering, eBPF/XDP kernel packet drops at 40 Mpps, ICMP kernel rate limiting, and Origin Firewall lockdowns.",
    explanation: "To achieve complete immunity against multi-hundred gigabit volumetric floods: 1. Cloud Tier: Global Anycast Scrubbing network absorbing 10+ Tbps volumetric UDP and ICMP floods. 2. Routing Tier: BGP Flowspec rules pushed to Tier-1 upstream ISPs dropping volumetric signatures at the ISP core. 3. Edge Tier: Ingress firewalls dropping unallocated UDP ports and subnet broadcasts. 4. Host OS Tier: eBPF/XDP drivers dropping residual volumetric packets in driver ring buffers at 40+ Mpps. 5. Kernel Tier: `icmp_ratelimit = 100` preventing outbound reply saturation.",
    hint: "Combine cloud Anycast scrubbing, BGP Flowspec upstream rules, eBPF/XDP driver drops, and kernel ICMP rate limits.",
    level: "expert",
    codeExample: `// Master Volumetric DDoS Defense Blueprint:
// 1. Cloud Layer   : BGP Anycast Global Scrubbing Centers (10+ Tbps Capacity)
// 2. Upstream Layer: BGP Flowspec (RFC 5575) dropping UDP high-port junk at ISP Core
// 3. Driver Layer  : eBPF / XDP Driver returning XDP_DROP at 40 Mpps wire speed
// 4. Kernel Layer  : net.ipv4.icmp_ratelimit=100 (Prevents outbound reply pipe saturation)
// 5. Origin Layer  : Ingress Firewall dropping all direct non-scrubbed traffic`
  },
  {
    question: "What is 'UDP Port 0 Flood', and why is it considered an Anomaly by Network Firewalls?",
    shortAnswer: "Sending UDP packets targeting destination port 0; because port 0 is reserved and invalid under RFC 768, any traffic targeting port 0 is an illegitimate attack signature that firewalls drop immediately.",
    explanation: "Under TCP/IP standards, Port 0 is reserved and invalid. Malformed botnet scripts frequently generate UDP packets with destination port 0 due to uninitialized variable bugs. Network engineers write simple firewall ACLs: `deny udp any any eq 0`, dropping millions of packets per second in hardware with zero CPU overhead.",
    hint: "Mailing a letter addressed to 'Apartment 0' in a building that starts at Apartment 1, which the mail carrier immediately returns.",
    level: "moderate",
    codeExample: `// Cisco ACL Dropping UDP Port 0 Floods:
access-list 101 deny udp any any eq 0
access-list 101 permit ip any any`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Volumetric Bandwidth Floods?",
    shortAnswer: "Intentionally causing damage or service disruption to computer resources that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker floods a corporate network in West Bengal with volumetric traffic that saturates fiber uplinks and takes e-commerce portals offline, the act diminishes the utility of electronic property, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally saturating hospital internet links with volumetric UDP floods
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'IP Header Checksum Validation Overhead' during Volumetric Packet Floods?",
    shortAnswer: "The CPU processing cost incurred by routers and operating systems verifying the 16-bit one's complement checksum for millions of incoming packets per second, exhausting CPU cycles even before payload inspection.",
    explanation: "IPv4 requires every router and host to verify the header checksum: $\\sum_{i=1}^{10} \\text{Word}_i = 0xFFFF$. When an attacker floods 20 Million PPS, the server CPU must compute 20,000,000 checksum calculations every second. Modern NICs offload checksum validation to hardware (Checksum Offloading / Rx-Checksum), freeing the CPU to process legitimate application data.",
    hint: "A cashier manually calculating sales tax on 20,000,000 items per second with pen and paper instead of using an automated barcode scanner.",
    level: "expert",
    codeExample: `# Enable Hardware Checksum Offloading in Linux:
ethtool -K eth0 rx-checksum on tx-checksum on
# Verification:
ethtool -k eth0 | grep rx-checksumming
# Result: rx-checksumming: on (Offloads calculation to hardware ASIC!)`
  },
  {
    question: "What is 'Symmetrical Bandwidth Exhaustion' in Volumetric ICMP Floods?",
    shortAnswer: "Simultaneously saturating both the download (ingress) and upload (egress) pipes of a symmetrical enterprise fiber connection (e.g. 1 Gbps up / 1 Gbps down).",
    explanation: "On a symmetrical 1 Gbps fiber link, an attacker floods 1 Gbps of ICMP echo requests (saturating the ingress downlink). The server responds with 1 Gbps of ICMP echo replies (saturating the egress uplink). Both directions of the internet connection are 100% full, rendering all web browsing, API calls, and email traffic impossible.",
    hint: "A two-way bridge where both lanes are completely blocked with broken-down trucks.",
    level: "basic",
    codeExample: `// Symmetrical Link Saturation Profile:
// Link Capacity : 1 Gbps Downlink / 1 Gbps Uplink
// Inbound Flood : 1.1 Gbps ICMP Requests ➔ Downlink 100% Saturated!
// Outbound Flood: 1.0 Gbps ICMP Replies  ➔ Uplink 100% Saturated!
// Result        : Total Bi-Directional Network Collapse!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for Volumetric Floods targeting 'Protected Systems' (Critical National Infrastructure)?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching a volumetric flood that denies access to a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Flooding SCADA substation network routers with 400 Gbps volumetric traffic
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Fragment Reassembly Timeout (ipfrag_time)' in Linux Kernel Hardening?",
    shortAnswer: "The maximum number of seconds the Linux kernel will hold incomplete IP fragments in memory before discarding them; reducing this timer (e.g. from 30s to 10s) frees memory buffers during fragmentation floods.",
    explanation: "When a fragmented UDP packet arrives, Linux allocates kernel memory and starts a 30-second timer (`net.ipv4.ipfrag_time = 30`). During a UDP fragmentation flood, holding thousands of fake fragments for 30 seconds exhausts kernel RAM. Hardening this setting to 10 seconds causes the kernel to discard incomplete fragment trees 3x faster, preventing buffer starvation.",
    hint: "Setting a 10-minute table limit at a busy restaurant so campers cannot sit at empty tables indefinitely.",
    level: "moderate",
    codeExample: `# Linux IP Fragment Reassembly Hardening:
sysctl -w net.ipv4.ipfrag_time=10 # Reduces fragment hold timer from 30s to 10s
sysctl -w net.ipv4.ipfrag_high_thresh=4194304 # 4MB High Threshold
sysctl -w net.ipv4.ipfrag_low_thresh=3145728  # 3MB Low Threshold`
  },
  {
    question: "How do 'Deep Packet Inspection (DPI) Hardware Appliances' differentiate Malicious UDP Floods from Legitimate Video Streaming (VoIP / RTP) Traffic?",
    shortAnswer: "By inspecting Real-time Transport Protocol (RTP) sequence numbers, payload codecs (H.264/Opus), and jitter metrics; volumetric floods contain static junk payloads, whereas real media streams have valid RTP headers and dynamic codec entropy.",
    explanation: "VoIP and video conferencing use UDP. A naive firewall dropping all UDP would kill company Zoom and Teams calls. DPI hardware inspects the UDP payload: legitimate media streams follow RFC 3550 RTP header formats with sequential timestamps and valid audio/video codecs. Attack floods contain static repeating strings (`AAAA...`) or random bytes without RTP framing, allowing DPI appliances to drop the attack traffic while passing video calls.",
    hint: "An airport luggage scanner that can tell the difference between real clothes and a brick of solid lead.",
    level: "expert",
    codeExample: `// DPI Inspection Logic:
if (Packet.Protocol == UDP && Packet.Port == 5004) {
    if (HasValidRTPHeader(Packet) && IsValidAudioCodec(Packet.Payload)) {
        ForwardPacket(); // Legitimate VoIP Call!
    } else {
        DropPacket("VOLUMETRIC UDP FLOOD: Missing valid RTP framing!");
    }
}`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Volumetric DoS Extortion?",
    shortAnswer: "Threatening to launch or maintain a volumetric bandwidth flood unless company leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a company's network with 300 Gbps of UDP traffic and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹35 Lakhs in cryptocurrency under threat of continuing a 400 Gbps UDP flood
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'ICMP Black Hole Detection' in Network Path MTU Discovery (PMTUD)?",
    shortAnswer: "When firewalls drop all ICMP packets (including ICMP Type 3 Code 4 'Fragmentation Needed'), PMTUD fails, causing large TCP packets to be dropped silently without error notifications.",
    explanation: "Path MTU Discovery (RFC 1191) relies on routers sending ICMP Type 3 Code 4 messages when a packet exceeds the MTU. If a naive network administrator blocks ALL ICMP traffic to stop ping floods, PMTUD breaks. Large web pages (exceeding 1500 bytes) hang indefinitely because the sender never learns the smaller path MTU. Best practice permits ICMP Type 3 Code 4 while dropping ICMP Echo (Type 8) floods.",
    hint: "Refusing to accept any warning letters from the highway department saying a low bridge is ahead, causing your tall truck to crash into the bridge.",
    level: "expert",
    codeExample: `// Selective ICMP Firewall Rules (Permits PMTUD while blocking Floods):
# Allow ICMP Destination Unreachable & Fragmentation Needed (Required for PMTUD!):
iptables -A INPUT -p icmp --icmp-type 3/4 -j ACCEPT
iptables -A INPUT -p icmp --icmp-type 3 -j ACCEPT
# Rate-limit ICMP Echo Requests (Ping Floods):
iptables -A INPUT -p icmp --icmp-type 8 -m limit --limit 5/s --limit-burst 10 -j ACCEPT
iptables -A INPUT -p icmp --icmp-type 8 -j DROP`
  },
  {
    question: "What is 'UDP Reflection Amplification Factor' in Volumetric Attacks?",
    shortAnswer: "The ratio between the size of the response packet generated by an unconfigured server and the size of the small request packet sent by the attacker (e.g. 50-byte request generating a 4,000-byte reply = 80x amplification factor).",
    explanation: "In volumetric reflection attacks, attackers spoof the victim's IP and send tiny requests to misconfigured third-party servers (DNS, NTP, Memcached). A Memcached request of 15 bytes generates a 750,000-byte reply ($50,000\\times$ amplification). A single 10 Mbps home internet connection can generate 500 Gbps of volumetric attack traffic directed at the victim in Kolkata.",
    hint: "Whispering one short word into a megaphone that shouts back 50,000 words at someone across the street.",
    level: "basic",
    codeExample: `// Amplification Factors:
// DNS Resolvers  : 28x to 54x Amplification
// NTP (monlist)  : 556x Amplification
// Memcached UDP  : 10,000x to 51,000x Amplification (Historic 1.3 Tbps GitHub Flood!)`
  },
  {
    question: "Synthesize the mathematical relationship between Ingress Attack Bandwidth (V_ingress), Network Uplink Capacity (C_pipe), Buffer Jitter Variance (\\sigma_jitter), and Packet Loss Probability (P_loss).",
    shortAnswer: "Packet loss probability is modeled as P_loss = 1 - e^(- max(0, V_ingress - C_pipe) / \\sigma_jitter); when ingress flood volume V_ingress exceeds physical link capacity C_pipe, packet drop rate approaches 100%.",
    explanation: "Let $V_{\\text{ingress}} = \\sum_{j=1}^{M} N_j \\times P_{\\text{size}} \\times R_{\\text{pps}}$ represent the total incoming traffic volume generated by $M$ attack sources (e.g. 450 Gbps), $C_{\\text{pipe}}$ represent the physical uplink bandwidth capacity (e.g. 10 Gbps), and $\\sigma_{\\text{jitter}}$ represent traffic burstiness. When $V_{\\text{ingress}} > C_{\\text{pipe}}$, link utilization exceeds 100%, queue buffers overflow, and packet drop probability is: $P_{\\text{loss}} = 1 - e^{-\\frac{V_{\\text{ingress}} - C_{\\text{pipe}}}{\\sigma_{\\text{jitter}}}}$. Upstream cloud scrubbing ensures that $V_{\\text{ingress}} \\le C_{\\text{pipe}}$, maintaining $P_{\\text{loss}} = 0.0\\%$.",
    hint: "Mathematical formula proving that when ingress traffic volume exceeds physical link capacity (V_ingress > C_pipe), packet loss reaches 100%.",
    level: "expert",
    codeExample: `// Volumetric Pipe Saturation Mathematical Proof:
// Ingress Flood (V_ingress) = 450 Gbps | Fiber Uplink (C_pipe) = 10 Gbps
// Surplus Bandwidth = 450 - 10 = 440 Gbps
// Packet Loss: P_loss = 1 - e^(-440 / 10) = 1 - e^(-44.0) = 100.0% (COMPLETE LINK COLLAPSE!)`
  }
];

export default questions;
