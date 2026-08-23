const questions = [
  {
    id: 1,
    question: "What are the three fundamental protocol roles defined in the standard VPN tunneling model?",
    shortAnswer: "1. Passenger Protocol (the original private data packet being transported, e.g. IPv4/IPv6); 2. Encapsulating Protocol (the cryptographic wrapper, e.g. IPsec ESP, WireGuard, GRE); 3. Carrier Protocol (the public network transport delivering the packet across the Internet, e.g. UDP, TCP, IPv4).",
    explanation: "Tunneling is like placing an un-routable private letter (Passenger) inside a sealed security envelope (Encapsulating) and delivering it via public postal mail (Carrier).",
    hint: "Passenger (your data), Encapsulating (the security wrapper), and Carrier (the public internet transport).",
    level: "Basic",
    codeExample: `// 3-Tier Model:
// [ Outer Carrier (Public IPv4 + UDP 4500) ]
//   [ Encapsulating Protocol (IPsec ESP) ]
//     [ Passenger Protocol (Private IPv4 10.10.1.5 + Data Payload) ]`
  },
  {
    id: 2,
    question: "What is the 'TCP-over-TCP Meltdown' phenomenon and why is TCP generally avoided as an outer VPN carrier protocol?",
    shortAnswer: "A severe performance collapse occurring when a TCP-based application runs inside a TCP-based VPN tunnel across a lossy network; packet drops trigger simultaneous, competing retransmission timers in both inner and outer TCP stacks, causing exponential back-offs, bufferbloat, and tunnel collapse.",
    explanation: "When a packet is dropped on public Wi-Fi, both the client application and the VPN gateway start retransmitting the exact same data simultaneously. To avoid this, modern VPNs (WireGuard, IPsec, OpenVPN UDP) always use connectionless UDP as the carrier.",
    hint: "A severe lag storm caused by running TCP inside TCP; solved by using UDP for the outer carrier.",
    level: "Moderate",
    codeExample: `// TCP Meltdown Cycle:
// 1% Packet Loss ➔ Inner TCP retransmits + Outer TCP retransmits ➔ Queue bufferbloat ➔ Latency spikes from 20ms to 12,000ms!`
  },
  {
    id: 3,
    question: "Why does VPN encapsulation cause packet fragmentation on standard 1500-byte Ethernet networks?",
    shortAnswer: "Because standard Ethernet Maximum Transmission Unit (MTU) is 1500 bytes. When a VPN adds 50 to 80 bytes of outer IP, UDP, and ESP headers to a full 1500-byte passenger packet, the total packet size expands to 1550–1580 bytes, exceeding the link MTU.",
    explanation: "Routers cannot transmit packets larger than the physical MTU. If the packet exceeds 1500 bytes, routers are forced to fragment the packet into two pieces, causing substantial CPU overhead and reassembly latency.",
    hint: "Adding 60 bytes of VPN header tags to a 1500-byte packet makes it 1560 bytes, which is too big for Ethernet.",
    level: "Basic",
    codeExample: `// MTU Overhead Math:
// Original Packet (1500B) + IPsec ESP Overhead (68B) = 1568 Bytes (Exceeds 1500B MTU ➔ FRAGMENTATION HAZARD!)`
  },
  {
    id: 4,
    question: "What is a 'Path MTU Blackhole' in enterprise VPN deployments?",
    shortAnswer: "When an oversized encapsulated VPN packet has the 'Don't Fragment' (DF) bit set, an intermediate router drops the packet and sends an ICMP 'Fragmentation Needed' (Type 3, Code 4) message, but a misconfigured upstream firewall blocks all ICMP packets, causing the connection to hang indefinitely.",
    explanation: "The client never receives the ICMP error message, so it keeps retransmitting the oversized packet forever. Small packets (like ping or SSH keystrokes) work fine, but large file transfers (like downloading a PDF or web page) stall permanently.",
    hint: "When firewalls block ICMP error messages, causing large file downloads to freeze and hang forever.",
    level: "Moderate",
    codeExample: `// Path MTU Blackhole Scenario:
// Client sends 1500B (DF=1) ➔ Router drops packet ➔ Router sends ICMP(Type 3, Code 4) ➔ Firewall BLOCKS ICMP ➔ Connection HANGS!`
  },
  {
    id: 5,
    question: "What is 'TCP MSS Clamping' (Maximum Segment Size Clamping) and how does it solve PMTU Blackholes?",
    shortAnswer: "A router configuration that intercepts TCP SYN packets passing through the VPN interface and rewrites the Maximum Segment Size (MSS) option to a smaller value (e.g. 1360 bytes), forcing endpoints to construct packets that fit within 1500 bytes after encapsulation.",
    explanation: "By reducing the MSS at connection setup, endpoints never create packets larger than 1400 bytes, eliminating the need for packet fragmentation and bypassing PMTU blackhole drops completely.",
    hint: "Automatically telling computers to send slightly smaller packets so the extra VPN headers don't cause drops.",
    level: "Moderate",
    codeExample: `// Cisco Router MSS Clamping Command:
// interface Tunnel1
//  ip tcp adjust-mss 1360 (Forces all TCP connections to use maximum 1360-byte payload)`
  },
  {
    id: 6,
    question: "What is 'GRE' (Generic Routing Encapsulation - IP Protocol 47) and why is it frequently paired with IPsec?",
    shortAnswer: "GRE provides multi-protocol encapsulation (supporting multicast, broadcast, and non-IP protocols) but has ZERO encryption; IPsec provides strong encryption but cannot natively transport multicast routing protocols. Pairing them (GRE-over-IPsec) gives both capabilities.",
    explanation: "Dynamic routing protocols (OSPF, EIGRP) require multicast hello packets to form router adjacencies. GRE wraps the multicast packet in a unicast header, and IPsec ESP encrypts the entire GRE packet.",
    hint: "GRE wraps routing broadcast packets without encryption; IPsec adds the encryption layer.",
    level: "Moderate",
    codeExample: `// GRE over IPsec Packet:
// [ Outer Public IP Header ] ➔ [ IPsec ESP Header ] ➔ [ GRE Header (Proto 47) ] ➔ [ OSPF Multicast Packet ]`
  },
  {
    id: 7,
    question: "What is 'NAT-Traversal' (NAT-T / RFC 3948) in IPsec encapsulation?",
    shortAnswer: "Encapsulating raw IPsec ESP packets (IP Protocol 50) inside standard UDP packets on port 4500 so they can traverse home NAT routers and commercial firewalls that lack support for non-TCP/UDP Layer-3 protocols.",
    explanation: "Standard consumer NAT routers rely on TCP/UDP port numbers to track connections. Because raw ESP has no port numbers, NAT routers drop it. NAT-T adds a UDP port 4500 header to make ESP packets routable across NAT.",
    hint: "Wrapping IPsec inside UDP port 4500 so home Wi-Fi routers don't block the connection.",
    level: "Basic",
    codeExample: `// NAT-T UDP Encapsulation:
// [ Outer IP Header ] ➔ [ UDP Header (Port 4500) ] ➔ [ IPsec ESP Header ] ➔ [ Encrypted Data ]`
  },
  {
    id: 8,
    question: "How does 'WireGuard Encapsulation Overhead' compare to traditional IPsec ESP and OpenVPN?",
    shortAnswer: "WireGuard introduces only 32 bytes of overhead (16-byte minimal transport header + 16-byte Poly1305 authentication tag), compared to 68 bytes for IPsec ESP and 88 bytes for OpenVPN over TCP.",
    explanation: "WireGuard's streamlined header structure maximizes payload throughput, allows a higher MSS clamp (1420 bytes), and drastically reduces CPU processing cycles on edge network gateways.",
    hint: "WireGuard adds only 32 bytes of extra tags, making it twice as lightweight as older VPN protocols.",
    level: "Moderate",
    codeExample: `// Protocol Header Comparison:
// WireGuard Overhead : 32 Bytes (Lightest)
// IPsec ESP Overhead : 56 - 72 Bytes
// OpenVPN TCP Overhead: 88 Bytes (Heaviest)`
  },
  {
    id: 9,
    question: "What is 'Layer 2 Tunneling Protocol' (L2TP - UDP Port 1701) and what type of passenger protocol does it carry?",
    shortAnswer: "L2TP encapsulates Layer-2 Point-to-Point Protocol (PPP) frames inside UDP packets, allowing non-IP protocols (IPX, AppleTalk) and Layer-2 authentication to be tunneled across Layer-3 IP networks.",
    explanation: "L2TP operates by creating control connections and data tunnels. However, because L2TP provides zero encryption on its own, it must always be paired with IPsec (L2TP/IPsec) for enterprise security.",
    hint: "A protocol that tunnels raw Layer-2 PPP frames across the internet, always encrypted with IPsec.",
    level: "Moderate",
    codeExample: `// L2TP/IPsec Packet Hierarchy:
// [ Public IP ] ➔ [ IPsec ESP Header ] ➔ [ UDP 1701 ] ➔ [ L2TP Header ] ➔ [ PPP Frame (Passenger) ]`
  },
  {
    id: 10,
    question: "What is 'VXLAN' (Virtual Extensible LAN) in datacenter network virtualization?",
    shortAnswer: "A Layer-2 overlay encapsulation scheme (RFC 7348) that wraps raw Ethernet MAC frames inside UDP port 4789 packets, enabling virtual machines to communicate on the same Layer-2 broadcast domain across Layer-3 routed datacenter networks.",
    explanation: "VXLAN expands the 12-bit VLAN limit (4,096 VLANs) to a 24-bit Virtual Network Identifier (VNI), supporting over 16 million isolated virtual networks in multi-tenant cloud datacenters (AWS/Azure).",
    hint: "Wrapping virtual computer Ethernet frames inside UDP packets to connect 16 million cloud subnets.",
    level: "Expert",
    codeExample: `// VXLAN Encapsulation:
// [ Outer IP ] ➔ [ UDP Port 4789 ] ➔ [ VXLAN Header (24-bit VNI) ] ➔ [ Inner Original Ethernet Frame ]`
  },
  {
    id: 11,
    question: "What is 'GENEVE' (Generic Network Virtualization Encapsulation) and how does it advance beyond VXLAN?",
    shortAnswer: "An extensible network virtualization protocol (RFC 8926) that provides flexible, variable-length Type-Length-Value (TLV) option headers inside UDP port 6081, adopted as the default overlay protocol in Kubernetes and OpenShift.",
    explanation: "While VXLAN has a rigid static 8-byte header, GENEVE allows software-defined networking controllers to insert custom metadata (such as security group tags and tracing IDs) directly into the overlay packet.",
    hint: "A modern cloud overlay protocol used in Kubernetes that allows custom security tags inside packets.",
    level: "Expert",
    codeExample: `// GENEVE Header with TLV Options:
// [ Outer IP ] ➔ [ UDP 6081 ] ➔ [ GENEVE Header + Custom TLV Security Tags ] ➔ [ Inner Payload ]`
  },
  {
    id: 12,
    question: "What is 'IPsec ESP Tunnel Mode' vs 'IPsec ESP Transport Mode' in packet encapsulation?",
    shortAnswer: "Tunnel Mode encrypts the entire original IP packet (header + payload) and prepends a brand-new public IP header (standard for Site-to-Site and Remote Access); Transport Mode encrypts only the payload, leaving the original IP header unencrypted (used for host-to-host or L2TP/GRE protection).",
    explanation: "Tunnel mode hides internal IP addresses (e.g. `10.10.1.5`) from intermediate internet routers. Transport mode is more lightweight (saving 20 bytes) because it reuses the original IP header.",
    hint: "Tunnel mode wraps and hides the entire old IP header; Transport mode encrypts only the payload.",
    level: "Moderate",
    codeExample: `// Encapsulation Comparison:
// Tunnel Mode   : [ New Public IP ] + [ ESP ] + [ ENCRYPTED: Old IP + TCP + Data ]
// Transport Mode: [ Original IP ] + [ ESP ] + [ ENCRYPTED: TCP + Data ]`
  },
  {
    id: 13,
    question: "What is 'GSO / GRO / TSO' (Generic Segmentation / Receive Offload) in high-throughput VPN gateways?",
    shortAnswer: "Hardware and Linux kernel mechanisms that allow the operating system to construct massive 64KB TCP super-packets in software, offloading the physical packet segmentation and VPN encapsulation to dedicated network interface card (NIC) silicon.",
    explanation: "Processing 1,000,000 small 1500-byte packets per second overwhelms CPU cores. GSO allows the CPU to process a few large 64KB buffers, letting the NIC slice and encrypt individual 1500-byte packets at line rate.",
    hint: "Letting network cards split up large data blocks into smaller packets in hardware to save CPU power.",
    level: "Expert",
    codeExample: `// Enabling TSO / GSO on Linux:
// ethtool -K eth0 tso on gso on gro on`
  },
  {
    id: 14,
    question: "What is 'MPLS over IPsec' (Multiprotocol Label Switching over IPsec)?",
    shortAnswer: "Encapsulating MPLS labeled packets inside IPsec ESP tunnels, allowing telecommunications providers and multi-tenant enterprises to transport private VRF (Virtual Routing and Forwarding) tables securely across public internet links.",
    explanation: "MPLS labels (20-bit tags) allow carrier networks to isolate customer subnets. IPsec encrypts the entire MPLS label stack, preventing public ISPs from inspecting internal routing tags.",
    hint: "Encrypting telecom provider MPLS routing tags inside an IPsec tunnel across the internet.",
    level: "Expert",
    codeExample: `// MPLS over IPsec:
// [ Outer Public IP ] ➔ [ IPsec ESP ] ➔ [ MPLS Label Stack (VRF 101) ] ➔ [ Customer IP Packet ]`
  },
  {
    id: 15,
    question: "What is 'Fragmentation and Reassembly Attack' on legacy VPN routers?",
    shortAnswer: "An attack where an adversary floods a VPN router with forged overlapping packet fragments, exhausting router memory buffers or tricking legacy stateful firewalls into misassembling malicious payloads.",
    explanation: "Modern VPN gateways drop fragmented ESP packets before reassembly or enforce strict fragment inspection timers to prevent memory exhaustion DoS attacks.",
    hint: "Sending broken puzzle pieces of packets to crash router memory; stopped by dropping bad fragments.",
    level: "Moderate",
    codeExample: `// Router Fragment Protection:
// ip virtual-reassembly max-fragments 64 timeout 5 (Drops malformed overlapping fragments)`
  },
  {
    id: 16,
    question: "Why does 'WebSocket Tunneling / TLS Reverse Proxying' bypass strict corporate outbound firewalls?",
    shortAnswer: "Because WebSocket and HTTPS tunnels operate over standard TCP port 443 with valid TLS handshakes, appearing to perimeter firewalls and Deep Packet Inspection (DPI) filters as legitimate web browsing traffic.",
    explanation: "Strict hotel or airport firewalls frequently block UDP ports (like 500, 4500, 1194, 51820). Encapsulating traffic inside HTTPS/WebSocket port 443 allows remote workers to connect from any restricted network.",
    hint: "Disguising VPN traffic as normal HTTPS website browsing on port 443 to bypass restrictive firewalls.",
    level: "Basic",
    codeExample: `// Shadowsocks / V2Ray WebSocket Tunnel:
// Client ──(HTTP/1.1 Upgrade: websocket on Port 443)──> VPN Gateway (Bypasses Airport Firewalls)`
  },
  {
    id: 17,
    question: "What is 'Encapsulation Header Inflation Ratio' across variable packet size distributions?",
    shortAnswer: "The mathematical ratio of header overhead relative to payload size; on large 1400-byte packets, 68 bytes of IPsec overhead is only ~4.8% bandwidth penalty; on tiny 64-byte VoIP packets, 68 bytes represents a massive 106% overhead penalty.",
    explanation: "VoIP and gaming packets suffer significant bandwidth inflation under VPN encapsulation. High-volume VoIP networks use IP Header Compression (cRTP) to reduce header sizes.",
    hint: "VPN headers cost only 4% bandwidth on big downloads, but more than double the size of tiny voice packets.",
    level: "Moderate",
    codeExample: `// Header Inflation Math:
// Large File Transfer: 68B / 1400B = 4.8% Overhead
// VoIP Audio Packet  : 68B / 64B   = 106.2% Overhead (Overhead exceeds the actual voice data!)`
  },
  {
    id: 18,
    question: "What is 'cRTP' (Compressed Real-Time Protocol) over IPsec VPNs?",
    shortAnswer: "A compression algorithm (RFC 2508) that compresses 40-byte IP/UDP/RTP headers down to 2 to 4 bytes on VoIP streams by storing static session context on both endpoints and transmitting only delta sequence numbers.",
    explanation: "cRTP drastically reduces VoIP bandwidth consumption over VPN tunnels, allowing remote call centers to run twice as many simultaneous phone lines over the same broadband link.",
    hint: "Compressing 40-byte voice packet headers down to 2 bytes to save bandwidth on telephone calls.",
    level: "Expert",
    codeExample: `// Cisco cRTP Configuration:
// interface Tunnel1
//  ip rtp header-compression ipsec (Compresses RTP headers prior to ESP encryption)`
  },
  {
    id: 19,
    question: "What is 'QUIC-based VPN Tunneling' (HTTP/3 / MASQUE) in next-generation remote access?",
    shortAnswer: "An emerging IETF standard (RFC 9298) that uses QUIC (UDP port 443 with built-in TLS 1.3) to multiplex multiple independent application streams inside a single tunnel without Head-of-Line blocking.",
    explanation: "Unlike TCP, if a single QUIC stream drops a packet, other parallel streams continue transmitting without stalling, achieving wireline speed across lossy 5G and satellite networks.",
    hint: "Using modern HTTP/3 and QUIC technology so that one dropped packet does not slow down other open apps.",
    level: "Expert",
    codeExample: `// MASQUE QUIC Tunneling (RFC 9298):
// CONNECT-IP / HTTP/3 over UDP 443 ➔ Multi-stream Zero Head-of-Line Blocking!`
  },
  {
    id: 20,
    question: "What is 'Carrier-Grade NAT (CGNAT / 100.64.0.0/10)' impact on Site-to-Site VPN encapsulation?",
    shortAnswer: "CGNAT prevents branch routers from having a public routable IP address, blocking inbound IKE negotiation; solved by using aggressive-mode NAT-T keepalives or reverse outbound-initiated WireGuard tunnels.",
    explanation: "Because the branch router has a private IP behind the ISP's CGNAT, HQ cannot initiate connections. The branch router must initiate the outbound tunnel and send periodic keepalive packets to keep the NAT mapping open.",
    hint: "When the internet provider doesn't give you a public IP; solved by having the branch call out first.",
    level: "Moderate",
    codeExample: `// WireGuard Persistent Keepalive for CGNAT:
// [Peer]
// PersistentKeepalive = 25 (Sends a 32-byte keepalive packet every 25s to hold open CGNAT UDP pinholes)`
  },
  {
    id: 21,
    question: "What is 'IPsec UDP Encapsulation of IKEv2 Signaling' (Port 4500 Nonce Marker)?",
    shortAnswer: "When IKEv2 signaling switches from UDP port 500 to UDP port 4500 upon detecting NAT, it inserts a 32-bit 'Non-ESP Marker' (4 zero bytes `0x00000000`) before the IKE header to distinguish signaling from ESP data packets.",
    explanation: "Both IKE signaling and ESP data share UDP port 4500. The gateway inspects the first 4 bytes: if all zeros, it routes to the IKE key negotiation daemon; if non-zero (SPI value), it routes to the ESP decryption engine.",
    hint: "Placing 4 zeros in front of setup packets so the router knows whether a packet is a setup message or encrypted data.",
    level: "Expert",
    codeExample: `// Non-ESP Marker Inspection:
// UDP 4500 Payload: 0x00000000 (IKEv2 Signaling) vs 0x0000100A (ESP Data with SPI 0x100A)`
  },
  {
    id: 22,
    question: "What is 'Path MTU Discovery' (PMTUD) and why does ICMP filtering break it?",
    shortAnswer: "An automated mechanism where an endpoint sends packets with the DF bit set; if a router cannot forward it due to MTU limits, it responds with an ICMP 'Fragmentation Needed' packet containing its MTU; blocking ICMP prevents the endpoint from ever discovering the path MTU.",
    explanation: "Overly aggressive security administrators often block all ICMP at firewalls thinking it stops hackers. In reality, blocking ICMP Type 3 Code 4 breaks PMTUD and causes catastrophic VPN freezing.",
    hint: "The internet's automatic size-checking system; broken when firewalls block ICMP error messages.",
    level: "Moderate",
    codeExample: `// Firewall Rule permitting PMTUD:
// pass in proto icmp icmp-type unreach code needfrag (Allows Path MTU Discovery to function properly)`
  },
  {
    id: 23,
    question: "What is 'IPv6-in-IPv4 Encapsulation' (6in4 / 6to4 Tunneling) and what security risks does it present?",
    shortAnswer: "Encapsulating IPv6 packets inside IPv4 Protocol 41 headers to cross IPv4-only networks; the security risk is that internal firewalls unaware of Protocol 41 allow IPv6 malware traffic to bypass standard IPv4 firewall rules.",
    explanation: "Adversaries use 6in4 tunnels as covert data exfiltration channels. Enterprise firewalls must inspect or block unauthorized Protocol 41 packets at perimeter gateways.",
    hint: "Hiding IPv6 packets inside IPv4; dangerous if corporate firewalls forget to inspect the hidden IPv6 traffic.",
    level: "Moderate",
    codeExample: `// Perimeter Block Rule for Unauthorized 6in4 Tunnels:
// iptables -A FORWARD -p 41 -j DROP (Blocks unmonitored IPv6-in-IPv4 tunnels)`
  },
  {
    id: 24,
    question: "What is 'SCTP over IPsec' (Stream Control Transmission Protocol) in Telecom 5G Core Networks?",
    shortAnswer: "Encapsulating SCTP packets inside IPsec ESP tunnels (RFC 3554) to secure the N2/N3 control plane interfaces between 5G gNodeB base stations and the 5G Access and Mobility Management Function (AMF).",
    explanation: "5G telecom infrastructure mandates multi-homed SCTP over IPsec to prevent state-sponsored eavesdropping and signaling injection attacks against nationwide cellular networks.",
    hint: "Encrypting 5G mobile cell tower control signals inside IPsec tunnels across public fiber lines.",
    level: "Expert",
    codeExample: `// 5G Core SCTP/IPsec Interface:
// gNodeB Base Station ──(SCTP over IPsec ESP)──> 5G Core AMF Gateway (3GPP Rel-17 Compliant)`
  },
  {
    id: 25,
    question: "What is the statutory CERT-In requirement regarding 'Transmission Telemetry and MTU Performance Logs' in India?",
    shortAnswer: "Organizations must retain complete network flow metadata—including packet byte counts, source/destination ports, negotiated carrier protocols, and fragmentation anomalies—for 180 days within Indian jurisdiction.",
    explanation: "Under Indian cybersecurity guidelines, maintaining comprehensive flow telemetry ensures that forensic investigators can detect covert tunneling and data exfiltration campaigns.",
    hint: "180-day retention of all packet transmission flow records and tunneling metadata under Indian law.",
    level: "Basic",
    codeExample: `// Structured CERT-In Tunnel Telemetry Log:
const certInTunnelTelemetry = {
  timestamp: "2026-08-23T14:25:00.250Z",
  tunnelId: "VTI-Tunnel-01",
  carrierProtocol: "UDP_Port_4500",
  passengerProtocol: "IPv4_Private",
  bytesTransferred: 48821900,
  fragmentationEvents: 0,
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'L2TPv3' (Layer 2 Tunneling Protocol Version 3) in Service Provider Ethernet Extension?",
    shortAnswer: "An updated version of L2TP that extends raw Ethernet, Frame Relay, or ATM Layer-2 circuits across a routed IP core without requiring complex MPLS infrastructure, often secured with IPsec.",
    explanation: "L2TPv3 allows an enterprise to connect two datacenters on the exact same Layer-2 VLAN broadcast domain across commercial ISP broadband links.",
    hint: "Connecting two office buildings on the exact same local Ethernet switch across the internet.",
    level: "Moderate",
    codeExample: `// Cisco L2TPv3 Pseudowire:
// pseudowire-class L2TP_ETH
//  encapsulation l2tpv3
//  protocol ipsec`
  },
  {
    id: 27,
    question: "What is 'eBPF-Accelerated Packet Encapsulation' (XDP - eXpress Data Path) on Linux VPN Gateways?",
    shortAnswer: "Executing VPN packet encapsulation and decapsulation directly inside the network card driver layer via eBPF/XDP programs before the Linux kernel allocates an `sk_buff` data structure, multiplying throughput by 5x.",
    explanation: "Traditional tunneling allocates memory in the kernel for every packet. XDP performs WireGuard/IPsec processing directly on the raw DMA memory ring buffer, achieving 40+ Gbps on commodity server hardware.",
    hint: "Processing VPN packets directly on the network card before the operating system even touches them.",
    level: "Expert",
    codeExample: `// eBPF XDP Hook:
// SEC("xdp") int vpn_encap_fastpath(struct xdp_md *ctx) { ... return XDP_TX; } (40 Gbps Line-Rate!)`
  },
  {
    id: 28,
    question: "What is 'DNS Leakage' in VPN Encapsulation and how is it mitigated?",
    shortAnswer: "When an operating system sends DNS domain queries directly to the local home ISP's DNS server over cleartext instead of through the encrypted VPN tunnel, revealing browsing activity to eavesdroppers.",
    explanation: "Mitigated by pushing corporate DNS servers (`dhcp-option DNS 10.20.1.2`) during tunnel setup and configuring the client OS to block all non-VPN DNS traffic via Windows Filtering Platform (WFP).",
    hint: "When your computer accidentally asks your home internet provider for website lookups instead of using the VPN.",
    level: "Basic",
    codeExample: `// OpenVPN DNS Leak Fix:
// block-outside-dns
// dhcp-option DNS 10.20.1.2 (Forces all DNS lookups strictly through the encrypted tunnel)`
  },
  {
    id: 29,
    question: "What is 'ESP Null Encryption' (RFC 2410) and when is it legitimately used?",
    shortAnswer: "An IPsec ESP configuration where symmetric encryption is disabled (NULL cipher) but cryptographic integrity and authentication (HMAC-SHA-256) remain active; used in high-throughput data replication where encryption is unnecessary but anti-tampering is required.",
    explanation: "ESP Null provides zero confidentiality (data is in cleartext), but guarantees that packets cannot be spoofed or altered, while eliminating CPU encryption overhead.",
    hint: "An IPsec mode that provides anti-tampering authentication without encrypting data.",
    level: "Moderate",
    codeExample: `// ESP Null Configuration:
// crypto ipsec transform-set AUTH_ONLY esp-null esp-sha256-hmac`
  },
  {
    id: 30,
    question: "Synthesize the engineering principles of Tunneling, Encapsulation, and Carrier Protocol selection.",
    shortAnswer: "Successful VPN engineering requires strictly honoring the 3-layer tunneling hierarchy: selecting connectionless UDP as the outer carrier to prevent TCP-over-TCP meltdown, configuring automated TCP MSS clamping (1360–1420 bytes) to prevent PMTU blackhole drops, optimizing protocol header overhead, and archiving 180-day telemetry in full compliance with CERT-In directives and the DPDP Act 2023.",
    explanation: "A mathematically unbreakable cipher is useless if misconfigured MTU causes packets to drop silently or TCP-over-TCP meltdown renders the network unusable. Mastering encapsulation mechanics guarantees line-rate performance and seamless reliability.",
    hint: "Always use UDP for the outer tunnel, clamp TCP MSS to 1360 bytes to stop packet drops, and keep logs for 180 days.",
    level: "Moderate",
    codeExample: `// The Master Tunneling Engineering Formula:
// Flawless VPN Performance = [Passenger Private IP] + [AEAD WireGuard / ESP Encapsulation] + [UDP Port 4500/51820 Carrier] + [TCP MSS Clamping @ 1380B] + [180-Day CERT-In Logging]`
  }
];

export default questions;
