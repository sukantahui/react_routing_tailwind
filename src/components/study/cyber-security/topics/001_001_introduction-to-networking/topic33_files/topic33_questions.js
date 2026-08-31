// topic33_questions.js
// 30 Moderate to Expert Questions on Network Packets in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is a Network Packet in computer networking?",
    shortAnswer: "A Packet is the fundamental Protocol Data Unit (PDU) at OSI Layer 3 (Network Layer) and the TCP/IP Internet Layer, consisting of control routing metadata (the IP header) and user payload data.",
    explanation: "Packets encapsulate Layer 4 transport segments (TCP/UDP) and are subsequently encapsulated inside Layer 2 data link frames (Ethernet) for physical transmission.",
    hint: "Layer 3 Protocol Data Unit (PDU) containing source/destination IP addresses and payload.",
    level: "basic",
    codeExample: "Packet = { Header: 'IPv4 20 Bytes', Payload: 'Layer 4 TCP Segment' };"
  },
  {
    question: "What are the core fields and standard minimum length of an IPv4 packet header?",
    shortAnswer: "A standard IPv4 header is 20 bytes (without options) and contains: Version, IHL, DSCP/ECN, Total Length, Identification, Flags (DF/MF), Fragment Offset, TTL, Protocol, Header Checksum, Source IP, and Destination IP.",
    explanation: "The Internet Header Length (IHL) field specifies the header size in 32-bit words (default value is 5, meaning 5 * 4 = 20 bytes).",
    hint: "Standard IPv4 header is 20 bytes long and contains 12 core fields.",
    level: "moderate",
    codeExample: "IPv4_Header_Fields = ['Version', 'IHL', 'DSCP', 'TotalLength', 'ID', 'Flags', 'Offset', 'TTL', 'Protocol', 'Checksum', 'SrcIP', 'DstIP'];"
  },
  {
    question: "What do the DF (Don't Fragment) and MF (More Fragments) flags control in the IPv4 header?",
    shortAnswer: "DF=1 instructs routers NOT to fragment the packet; if it exceeds link MTU, the router drops it and sends ICMP Type 3 Code 4. MF=1 indicates that more fragments follow; MF=0 indicates the final fragment.",
    explanation: "Path MTU Discovery (PMTUD) sets DF=1 on all packets to discover the lowest MTU on the end-to-end path without causing fragmentation overhead.",
    hint: "DF=1 blocks fragmentation; MF=1 signals additional fragments are coming.",
    level: "expert",
    codeExample: "Flags = { Reserved: 0, DF: 1 /* Don't Fragment */, MF: 0 /* Last Fragment */ };"
  },
  {
    question: "How does the Fragment Offset field work during IPv4 packet reassembly?",
    shortAnswer: "The Fragment Offset (13 bits) specifies the starting byte position of the fragment's payload relative to the original unfragmented packet in units of 8-byte blocks (offset = BytePosition / 8).",
    explanation: "For example, if the second fragment starts at byte 1480 of the original payload, its Fragment Offset field is set to 1480 / 8 = 185.",
    hint: "Measures fragment position in units of 8-byte blocks (BytePosition / 8).",
    level: "expert",
    codeExample: "FragmentOffset = StartingByte / 8; // e.g. 1480 / 8 = 185"
  },
  {
    question: "What is the function of the Time-To-Live (TTL) field in an IPv4 packet?",
    shortAnswer: "An 8-bit hop counter initialized by the sending OS (e.g. 64, 128) and decremented by 1 at every intermediate router; when TTL reaches 0, the router drops the packet and emits an ICMP Time Exceeded message, preventing infinite routing loops.",
    explanation: "Traceroute intentionally sends packets with incrementing TTLs (1, 2, 3...) to discover each intermediate router IP address along the path.",
    hint: "Decrements by 1 at each router hop; drops at 0 to stop packets looping forever.",
    level: "basic",
    codeExample: "router.hop(packet) => { packet.TTL -= 1; if (packet.TTL === 0) router.dropAndSendICMP(); };"
  },
  {
    question: "What are the common values in the Protocol field (Byte 9) of an IPv4 header?",
    shortAnswer: "Protocol 1 = ICMP (Ping/Traceroute), Protocol 6 = TCP (HTTP/SSH), Protocol 17 = UDP (DNS/DHCP), Protocol 47 = GRE, Protocol 50 = ESP (IPsec Encrypted Payload).",
    explanation: "The receiving operating system reads the Protocol field to demultiplex the payload and pass it to the correct kernel transport layer driver.",
    hint: "1 = ICMP, 6 = TCP, 17 = UDP, 50 = IPsec ESP.",
    level: "moderate",
    codeExample: "ProtocolNumbers = { ICMP: 1, TCP: 6, UDP: 17, GRE: 47, ESP: 50 };"
  },
  {
    question: "How does the IPv6 fixed header differ from the IPv4 header?",
    shortAnswer: "IPv6 uses a fixed 40-byte header with simplified fields (Version, Traffic Class, Flow Label, Payload Length, Next Header, Hop Limit, Source IPv6 128-bit, Destination IPv6 128-bit), eliminating the IPv4 checksum and options to accelerate router ASIC processing.",
    explanation: "Intermediate IPv6 routers do NOT fragment packets on the fly; optional features (fragmentation, security) are chained using Next Header Extension Headers.",
    hint: "Fixed 40-byte header with no checksum, simplifying router processing.",
    level: "expert",
    codeExample: "IPv6_FixedHeader_Bytes = 40; // Version(4b) + TrafficClass(8b) + FlowLabel(20b) + Length(16b) + NextHdr(8b) + HopLimit(8b) + Src(128b) + Dst(128b)"
  },
  {
    question: "What is Maximum Transmission Unit (MTU) and what is the standard Ethernet MTU size?",
    shortAnswer: "MTU is the maximum size in bytes of a Layer 3 packet (including IP header and payload) that can be transmitted across a physical Layer 2 data link without fragmentation (standard Ethernet MTU is 1500 bytes).",
    explanation: "A 1500-byte MTU packet consists of a 20-byte IP header, a 20-byte TCP header, and up to 1460 bytes of application payload (Maximum Segment Size - MSS).",
    hint: "Max packet size on a physical link; standard Ethernet is 1500 bytes.",
    level: "basic",
    codeExample: "Standard_Ethernet_MTU = 1500; // 20B IP + 20B TCP + 1460B Payload (MSS)"
  },
  {
    question: "What is a Teardrop Attack in network packet security?",
    shortAnswer: "A denial-of-service attack where an attacker sends fragmented IP packets with overlapping, conflicting offset fields; when vulnerable operating systems attempt to reassemble the fragments, a kernel buffer crash occurs.",
    explanation: "Modern operating systems and firewalls inspect fragment offset boundaries, dropping overlapping or corrupt fragments before reassembly.",
    hint: "Sends fragmented packets with overlapping offsets to crash the receiving kernel.",
    level: "expert",
    codeExample: "teardrop.craftFragments({ Frag1: 'Bytes 0-1000', Frag2_Overlapping: 'Bytes 500-1500' });"
  },
  {
    question: "What is Packet Sniffing and how do network security analysts capture packets?",
    shortAnswer: "The interception and logging of raw packet traffic passing over a digital network interface using packet analyzer software (Wireshark, tcpdump) operating in promiscuous mode.",
    explanation: "Security specialists in Kolkata analyze packet traces to identify unencrypted credentials, investigate malware C2 beacons, and troubleshoot latency bottlenecks.",
    hint: "Capturing and analyzing raw network packets using Wireshark or tcpdump.",
    level: "moderate",
    codeExample: "# Capture 100 packets on eth0\ntcpdump -i eth0 -c 100 -w capture.pcap"
  },
  {
    question: "What is a Network TAP (Test Access Point) vs a Switch SPAN Port for packet analysis?",
    shortAnswer: "A physical hardware TAP splits optical or copper signals directly on the wire with zero packet drop and zero switch CPU load; a SPAN (Port Mirror) copies traffic inside the switch ASIC and can drop packets during heavy traffic congestion.",
    explanation: "Enterprise security monitoring systems in Jadavpur mandate dedicated hardware TAPs for high-speed 10G/40G packet capture appliances in ₹ budgets.",
    hint: "Physical TAP splits wire signal directly without drops; SPAN is a switch port mirror.",
    level: "expert",
    codeExample: "NetworkTAP: PassthroughInsertion = true; DropRateUnder100PercentLoad = 0;"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Network Packet Broker (NPB) or 10G Hardware TAP?",
    shortAnswer: "Approximately ₹85,000 to ₹3,20,000 (e.g. Gigamon, Keysight / Ixia, or Profitap) depending on port density (1G/10G/40G fiber) and aggregation capabilities.",
    explanation: "Network Packet Brokers aggregate, deduplicate, filter, and load-balance raw packet streams to Intrusion Detection Systems (IDS) and NDR appliances.",
    hint: "Enterprise Network TAP / Packet Broker costs ₹85,000 – ₹3,20,000.",
    level: "moderate",
    codeExample: "HardwareTAP_10G_Cost = ₹1,25,000; // Dual 10G LC Optical Fiber TAP"
  },
  {
    question: "What is Deep Packet Inspection (DPI) and how does it differ from shallow packet inspection?",
    shortAnswer: "Shallow inspection examines only Layer 3 and Layer 4 packet headers (IP addresses, port numbers); Deep Packet Inspection (DPI) analyzes the actual application data payload (Layer 7) to detect malware signatures, protocols, and data leaks.",
    explanation: "DPI enables Next-Gen Firewalls in Barrackpore to block P2P file transfers even when disguised over standard HTTP Port 80.",
    hint: "DPI looks inside the actual application data payload, not just headers.",
    level: "moderate",
    codeExample: "if (dpiEngine.inspectPayload(packet.Payload).matches('MalwareSignature')) dropPacket();"
  },
  {
    question: "What is TCP MSS Clamping and why is it essential across IPsec and PPPoE VPN tunnels?",
    shortAnswer: "VPN encapsulation adds 40–60 bytes of tunnel header overhead, reducing effective MTU (e.g. to 1440 bytes); routers rewrite the TCP Maximum Segment Size (MSS) in SYN packets to 1400 bytes so endpoints do not send oversized packets that get dropped.",
    explanation: "Without MSS clamping, users can load small text websites, but large image downloads hang indefinitely due to unfragmented oversized packets.",
    hint: "Lowers the TCP MSS setting on VPN routers to prevent oversized packets from getting dropped.",
    level: "expert",
    codeExample: "iptables -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1400"
  },
  {
    question: "What is Packet Injection in Cyber Security penetration testing?",
    shortAnswer: "The process of crafting custom, raw packets (using Scapy, hping3, or raw sockets) and injecting them directly onto the network to simulate attacks, forge responses, or test firewall rule enforcement.",
    explanation: "Penetration testers craft raw TCP SYN packets with randomized source IPs to verify whether perimeter firewalls block spoofed ingress streams.",
    hint: "Creating and sending custom forged packets onto the network using tools like Scapy.",
    level: "expert",
    codeExample: "send(IP(dst='192.168.1.1')/TCP(dport=80, flags='S')) // Python Scapy Packet Injection"
  },
  {
    question: "What is the Header Checksum field in an IPv4 packet and why is it recalculated at every router hop?",
    shortAnswer: "A 16-bit one's complement checksum that validates header integrity; because every router decrements the TTL field (and modifies options), the checksum MUST be recalculated at every intermediate hop.",
    explanation: "If memory corruption or line noise alters any header bit, the router detects a checksum mismatch and silently discards the packet.",
    hint: "Validates header integrity; recalculated at every hop because the TTL value changes.",
    level: "moderate",
    codeExample: "router.decrementTTL() => packet.Checksum = calculateOnesComplement(packet.Header);"
  },
  {
    question: "What is the Type of Service (ToS) / Differentiated Services Code Point (DSCP) field in an IPv4 header?",
    shortAnswer: "An 8-bit field (6 bits DSCP, 2 bits ECN) that classifies packet traffic priority for Quality of Service (QoS) scheduling (e.g. DSCP 46 / EF for VoIP, DSCP 0 for Best Effort).",
    explanation: "Routers in Kolkata prioritize packets marked with DSCP Expedited Forwarding (EF) to guarantee zero-jitter audio during network congestion.",
    hint: "Marks packet priority for Quality of Service (QoS), such as prioritizing voice calls.",
    level: "expert",
    codeExample: "packet.DSCP = 46; // Expedited Forwarding (EF) for real-time VoIP audio"
  },
  {
    question: "What is Explicit Congestion Notification (ECN) in IP packet headers?",
    shortAnswer: "A 2-bit field in the IP header that allows routers experiencing buffer congestion to mark packets (ECN=11) instead of dropping them, alerting the sender to slow down without incurring retransmission delay.",
    explanation: "When the receiver receives an ECN-marked packet, it sets the ECE flag in its TCP ACK, prompting the sender to reduce its congestion window smoothly.",
    hint: "Allows routers to warn senders about network congestion without dropping packets.",
    level: "expert",
    codeExample: "if (routerBufferUsage > 85%) packet.ECN = 0b11; // Congestion Experienced (CE)"
  },
  {
    question: "What is a Tiny Fragment Attack in firewall evasion?",
    shortAnswer: "An attack where the adversary creates the first fragment so small (e.g. 8 bytes) that the TCP destination port number is forced into the second fragment, bypassing basic packet filtering firewalls that inspect only the first fragment.",
    explanation: "Modern stateful inspection firewalls enforce a minimum initial fragment size (e.g. 120 bytes) to ensure Layer 4 headers are fully inspectable.",
    hint: "Forces Layer 4 port numbers into the second fragment to slip past naive firewalls.",
    level: "expert",
    codeExample: "firewallRule: if (fragment.offset === 0 && fragment.length < 120) dropPacket();"
  },
  {
    question: "What is the Total Length field in an IPv4 header and what is its theoretical maximum limit?",
    shortAnswer: "A 16-bit integer defining the entire length of the packet (header + data) in bytes, with a theoretical maximum capacity of 2^16 - 1 = 65,535 bytes.",
    explanation: "In practice, packets are bounded by the underlying Layer 2 MTU (1500 bytes for standard Ethernet).",
    hint: "16-bit field defining packet size; maximum theoretical value is 65,535 bytes.",
    level: "basic",
    codeExample: "TotalLength = 1500; // 20 bytes IP Header + 1480 bytes Data Payload"
  },
  {
    question: "What is the difference between a Packet, a Frame, and a Segment?",
    shortAnswer: "A Segment is the Layer 4 PDU (TCP/UDP with port numbers); a Packet is the Layer 3 PDU (IP with logical IP addresses); a Frame is the Layer 2 PDU (Ethernet with physical MAC addresses).",
    explanation: "Encapsulation: Segment is wrapped inside a Packet, which is wrapped inside a Frame for transmission over the wire.",
    hint: "Segment = Layer 4 (Ports); Packet = Layer 3 (IPs); Frame = Layer 2 (MACs).",
    level: "basic",
    codeExample: "Hierarchy: [FrameHeader [PacketHeader [SegmentHeader [ApplicationData]]]]"
  },
  {
    question: "What is Promiscuous Mode on a Network Interface Card (NIC)?",
    shortAnswer: "A mode of operation where a NIC passes all received network frames and packets directly to the operating system for inspection, rather than filtering out packets not addressed to its own MAC/IP address.",
    explanation: "Packet sniffing tools like Wireshark switch the adapter into promiscuous mode to capture all broadcast, multicast, and unicast traffic on the local segment.",
    hint: "Configures the network card to capture all packets on the wire, not just its own.",
    level: "moderate",
    codeExample: "ip link set eth0 promisc on // Enables promiscuous mode in Linux"
  },
  {
    question: "What is Path MTU Discovery (PMTUD) and what failure causes PMTUD Black Holes?",
    shortAnswer: "PMTUD sends packets with DF=1 to determine the maximum MTU across a path; if an intermediate router drops an oversized packet and its ICMP 'Fragmentation Needed' reply is blocked by a firewall, the connection hangs indefinitely.",
    explanation: "The sender never learns why packets are dropping, causing TCP connections to freeze during large data transfers.",
    hint: "Blocking ICMP Fragmentation Needed messages creates a Black Hole connection freeze.",
    level: "expert",
    codeExample: "PMTUD_BlackHole: Packet_1500B dropped at Router (MTU 1400); ICMP_Blocked → Connection Freezes;"
  },
  {
    question: "What is an IPv6 Flow Label and how does it optimize routing performance?",
    shortAnswer: "A 20-bit field in the IPv6 header that identifies packets belonging to the same communication flow, allowing intermediate routers to route subsequent packets along the same path without re-evaluating routing tables.",
    explanation: "Flow labels enable high-speed ASIC hardware switching and equal-cost multi-path (ECMP) packet load balancing with zero packet reordering.",
    hint: "20-bit IPv6 field that groups packets into flows for faster router hardware forwarding.",
    level: "expert",
    codeExample: "IPv6_Header: FlowLabel = 0x8A12F; // Packets with identical flow label follow same route"
  },
  {
    question: "What is Packet Reordering and why does it degrade TCP throughput?",
    shortAnswer: "A condition where packets arrive at the destination in a different sequence than transmitted; TCP misinterprets out-of-order packets as lost packets, generating duplicate ACKs and triggering unnecessary congestion window throttling.",
    explanation: "Multi-path routing across unequal-delay links in Kolkata can cause packet reordering, cutting application throughput by 50%.",
    hint: "Packets arriving out of order trick TCP into thinking data was lost, reducing speed.",
    level: "expert",
    codeExample: "Receiver: Received Packet 3 before Packet 2 → Emits Duplicate ACK for Packet 1;"
  },
  {
    question: "What is the Identification field (16 bits) in an IPv4 header used for?",
    shortAnswer: "A unique sequential number assigned by the sender to identify all fragments originating from the same parent IP packet so the receiving host can correctly group and reassemble them.",
    explanation: "All fragments split from a single original 4000-byte packet share the exact same Identification number (e.g. ID = 54210).",
    hint: "Unique ID shared by all fragments of the same packet so they can be reassembled.",
    level: "moderate",
    codeExample: "Fragment1.ID = 54210; Fragment2.ID = 54210; // Identifies same original packet"
  },
  {
    question: "What command in Linux and Windows allows an administrator to view live packet statistics on an interface?",
    shortAnswer: "Linux: `ip -s link show eth0` or `netstat -i` or `ethtool -S eth0`; Windows: `netstat -e` or `Get-NetAdapterStatistics`.",
    explanation: "These commands display total packets sent, received, dropped, and CRC error counters on active interfaces.",
    hint: "Linux: ip -s link; Windows: Get-NetAdapterStatistics.",
    level: "basic",
    codeExample: "# Linux interface packet telemetry\nip -s link show eth0\n# Windows PowerShell\nGet-NetAdapterStatistics"
  },
  {
    question: "How does IP Packet Header Encryption work in IPsec Tunnel Mode vs Transport Mode?",
    shortAnswer: "In Transport Mode, only the packet payload is encrypted (original IP header remains visible); in Tunnel Mode, the ENTIRE original IP packet (including header) is encrypted and encapsulated inside a brand-new outer IP header.",
    explanation: "Tunnel mode hides original source and destination IP addresses from intermediate ISP eavesdroppers between Barrackpore and Kolkata.",
    hint: "Tunnel Mode encrypts the entire original IP packet; Transport Mode only encrypts the payload.",
    level: "expert",
    codeExample: "IPsec_TunnelMode: [New_IP_Header [ESP_Header [Encrypted_Original_IP_Packet]]]"
  },
  {
    question: "What is BPF (Berkeley Packet Filter) syntax used in packet capture filters?",
    shortAnswer: "An efficient kernel-level filtering language that discards unwanted packets before copying them to user space (e.g., `tcp and port 80 and not host 192.168.1.1`).",
    explanation: "BPF filters run directly inside the operating system kernel or eBPF virtual machine, allowing capture tools to process millions of packets per second without CPU overload.",
    hint: "Fast kernel filtering language used by tcpdump and Wireshark (e.g. 'tcp port 443').",
    level: "moderate",
    codeExample: "tcpdump -i eth0 'tcp port 443 and (src 10.0.0.1 or src 10.0.0.2)'"
  },
  {
    question: "What is the ultimate golden rule for inspecting, troubleshooting, and securing Network Packets?",
    shortAnswer: "'Trace packet headers through the 4-layer encapsulation hierarchy; enforce PMTUD with TCP MSS Clamping to prevent fragmentation drops; deploy hardware TAPs and DPI firewalls for threat inspection; inspect flags (DF/MF) and TTL; and budget enterprise Packet Brokers in Indian Rupees (₹)!'",
    explanation: "This complete rule captures packet structure, fragmentation dynamics, hardware capture engineering, cyber security inspection, and financial budgeting.",
    hint: "Encapsulation hierarchy + MSS clamping + Hardware TAPs + DPI security + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: MasterEncapsulation() → EnforceMSSClamping() → DeployHardwareTAPs() → EnableDPI() → BudgetInRupees(₹);"
  }
];

export default questions;
