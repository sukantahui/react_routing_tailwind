const questions = [
  {
    id: 1,
    question: "At which layer of the OSI model does the IPsec architecture operate, and what architectural advantage does this provide?",
    shortAnswer: "IPsec operates at the Network Layer (Layer 3). It provides transparent, end-to-end cryptographic protection for all upper-layer protocols (TCP, UDP, ICMP, BGP, OSPF) without requiring any application-level modifications.",
    explanation: "Because IPsec operates at Layer 3 (RFC 4301), applications do not need to be written with security libraries (unlike TLS at Layer 4/7). Every socket, background daemon, and network protocol automatically inherits encryption, authentication, and anti-replay protection as long as the packets pass through the IPsec kernel subsystem.",
    hint: "Think about which layer handles IP routing between hosts and gateways.",
    level: "Basic",
    codeExample: `// OSI Model Security Comparison:
// Application Layer (L7) : HTTPS, SSH, PGP  (App-specific)
// Transport Layer (L4)   : TLS 1.3, DTLS     (Transport-specific)
// Network Layer (L3)     : IPsec (AH / ESP)  (Transparent to ALL applications!)`
  },
  {
    id: 2,
    question: "What are the five core cryptographic security services provided by the IPsec architecture?",
    shortAnswer: "1. Data Confidentiality (Encryption via ESP), 2. Connectionless Data Integrity (HMAC/ICV), 3. Data Origin Authentication, 4. Anti-Replay Protection (Sliding Sequence Windows), and 5. Limited Traffic Flow Confidentiality (Tunnel Mode header hiding).",
    explanation: "RFC 4301 defines these five pillars to protect IP datagrams against wiretapping, tampering, spoofed source injection, recorded replay attacks, and WAN traffic analysis.",
    hint: "Consider confidentiality, integrity, origin authentication, anti-replay, and traffic flow confidentiality.",
    level: "Basic",
    codeExample: `// IPsec Security Services Matrix:
// 1. Confidentiality      : AES-256-GCM, ChaCha20-Poly1305
// 2. Data Integrity       : HMAC-SHA256, ICV verification
// 3. Peer Authentication  : RSA-PSS, ECDSA, PSK via IKEv2
// 4. Anti-Replay          : 64-bit sliding window bitmap
// 5. Traffic Flow Privacy : Tunnel Mode new outer IP header`
  },
  {
    id: 3,
    question: "What is the structural and encapsulation difference between IPsec Transport Mode and Tunnel Mode?",
    shortAnswer: "Transport Mode inserts the IPsec header (AH/ESP) between the original IP header and the transport payload (used for Host-to-Host); Tunnel Mode encapsulates the entire original IP packet inside a brand-new outer IP header (used for Gateway-to-Gateway / Site-to-Site VPNs).",
    explanation: "In Transport Mode, intermediate routers see the original source and destination IP addresses. In Tunnel Mode, the original IP addresses are encrypted and completely concealed from transit ISPs, with only the gateway IP addresses visible in the outer IP header.",
    hint: "Transport mode protects payload only; Tunnel mode wraps the whole packet inside a new outer IP envelope.",
    level: "Basic",
    codeExample: `// Packet Encapsulation Formats:
// Original IPv4 Packet:
// [ Original IP Header ] [ TCP / UDP Payload ]
//
// Transport Mode (ESP):
// [ Original IP Header ] [ ESP Header ] [ Encrypted TCP/UDP Payload ] [ ESP Trailer ] [ ESP Auth ICV ]
//
// Tunnel Mode (ESP):
// [ New Outer IP Header ] [ ESP Header ] [ Encrypted (Original IP + TCP/UDP) ] [ ESP Trailer ] [ ESP Auth ICV ]`
  },
  {
    id: 4,
    question: "What are the three core architectural databases defined in RFC 4301 that govern IPsec packet processing?",
    shortAnswer: "1. Security Policy Database (SPD), 2. Security Association Database (SAD), and 3. Peer Authorization Database (PAD).",
    explanation: "The SPD defines WHAT policies apply to traffic (PROTECT, BYPASS, DISCARD). The SAD stores active cryptographic keys and SA parameters for established tunnels. The PAD links IKE peer authentication identities with the SPD to authorize policy negotiation.",
    hint: "SPD (Policies) ➔ SAD (Keys & States) ➔ PAD (Peer Identity Authorizations).",
    level: "Moderate",
    codeExample: `// IPsec Core Databases (RFC 4301):
// 1. SPD : Rules matching (Src IP, Dst IP, Proto, Port) ➔ Action: PROTECT / BYPASS / DISCARD
// 2. SAD : Active SA entries keyed by (SPI, Dst IP, Protocol) ➔ Keys, Sequence, Replay Window
// 3. PAD : Authorizes IKE authenticated IDs (FQDN, DN, IP) to claim specific SPD subnets`
  },
  {
    id: 5,
    question: "What are the three mandatory actions that an entry in the Security Policy Database (SPD) can specify for matched traffic?",
    shortAnswer: "1. PROTECT (Encapsulate and apply IPsec security services using an SA), 2. BYPASS (Transmit packet directly in cleartext without IPsec), 3. DISCARD (Silently drop the packet).",
    explanation: "Every packet entering or leaving a network interface is evaluated against the ordered selectors in the SPD. The first matching rule determines whether the kernel must encrypt it (PROTECT), send it untouched (BYPASS, e.g., local ARP/DHCP), or drop it (DISCARD).",
    hint: "Encrypt it, let it pass in plaintext, or drop it immediately.",
    level: "Basic",
    codeExample: `// SPD Action Examples:
// Rule 1: Src=10.14.0.0/16 Dst=10.20.0.0/16 Proto=ANY ➔ PROTECT (Tunnel to Kolkata Core)
// Rule 2: Src=10.14.0.0/16 Dst=8.8.8.8/32      Proto=UDP ➔ BYPASS  (Public DNS Lookup)
// Rule 3: Src=ANY         Dst=198.51.100.0/24  Proto=ANY ➔ DISCARD (Blocked Malicious Subnet)`
  },
  {
    id: 6,
    question: "What is a Security Association (SA) in IPsec, and why are SAs unidirectional (simplex)?",
    shortAnswer: "An SA is a simplex (one-way) logical connection that specifies a set of cryptographic parameters (keys, algorithms, sequence numbers) negotiated between two peers. Because an SA is unidirectional, full-duplex communication requires at least two distinct SAs (one Inbound and one Outbound).",
    explanation: "Unidirectional SAs decouple cryptographic states (such as independent sequence numbers, initialization vectors, and key lifetimes) in each direction, preventing state collision and simplifying multi-point and multicast security architectures.",
    hint: "One SA handles outbound encryption; a separate SA handles inbound decryption.",
    level: "Moderate",
    codeExample: `// Bidirectional IPsec Communication (2 SAs):
// Gateway Barrackpore (203.0.113.10) <=======> Gateway Kolkata (198.51.100.20)
// Outbound SA (SPI: 0x88AF1901) ──[ Encrypts Barrackpore ➔ Kolkata ]──>
// Inbound SA  (SPI: 0x4A1F89BC) <──[ Decrypts Kolkata ➔ Barrackpore ]──`
  },
  {
    id: 7,
    question: "What 3-tuple uniquely identifies a Security Association (SA) in the kernel's Security Association Database (SAD)?",
    shortAnswer: "1. Security Parameter Index (SPI - 32-bit arbitrary number), 2. Destination IP Address, and 3. Security Protocol Identifier (AH or ESP).",
    explanation: "When an inbound IPsec packet arrives at a gateway, the kernel extracts the SPI from the AH/ESP header, reads the outer Destination IP from the IP header, and identifies whether it is AH (protocol 51) or ESP (protocol 50). This 3-tuple points to the exact cryptographic keys in the SAD.",
    hint: "SPI + Destination IP + Protocol (AH/ESP).",
    level: "Moderate",
    codeExample: `// Inbound Packet SAD Lookup:
// Packet Header: [ Dst IP: 203.0.113.10 | Proto: 50 (ESP) | SPI: 0x88AF1901 ]
// Kernel SAD Query: (0x88AF1901, 203.0.113.10, ESP) ➔ Yields AES-256 Key & Sequence State`
  },
  {
    id: 8,
    question: "What is the function of the Security Parameter Index (SPI) in the ESP/AH header?",
    shortAnswer: "The SPI is a 32-bit field carried in plaintext at the start of every ESP/AH header that allows the receiving host to index and locate the appropriate Security Association (SA) in its SAD without needing to decrypt the payload first.",
    explanation: "Because the receiver might maintain thousands of active IPsec tunnels with various remote sites, the SPI acts as a direct hash table lookup key, selecting the correct decryption key, IV length, and cipher algorithm instantly.",
    hint: "A 32-bit pointer carried on the outside of the packet to find the right key in the SAD.",
    level: "Moderate",
    codeExample: `// ESP Packet Header (First 8 Bytes):
// 0                   1                   2                   3
// 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |               Security Parameters Index (SPI)                 | ➔ 32 bits
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                      Sequence Number                          | ➔ 32 bits
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`
  },
  {
    id: 9,
    question: "How does the IPsec Anti-Replay sliding window mechanism (RFC 4303 Section 3.4.3) detect and drop duplicated packets?",
    shortAnswer: "The receiver maintains a 64-packet (or 128-packet) sliding window bitmap anchored at the highest verified sequence number (`SeqMax`). Arriving packets with sequence numbers behind the window tail are dropped immediately; packets inside the window are checked against the bitmap (if bit is 1, it is a duplicate and dropped; if 0, it is accepted and marked 1); packets ahead of the window advance the window.",
    explanation: "Attackers on public transit links cannot alter encrypted packets without failing integrity checks, but they can capture valid packets and re-send them (replay attack). The anti-replay window ensures every sequence number is processed at most once.",
    hint: "Higher than top advances window; inside window checks bitmask; below bottom gets dropped.",
    level: "Expert",
    codeExample: `// RFC 4303 Sliding Window Logic:
// Let Window Size W = 64, Highest Sequence Seen = SeqMax (e.g., 100)
// Window spans: [SeqMax - W + 1, SeqMax] ➔ [37, 100]
// 1. Packet Seq = 105 (Seq > SeqMax) : Accept ✔, Slide Window (SeqMax ➔ 105)
// 2. Packet Seq = 80  (In Window)   : Check bit 80. If bit==0: Accept ✔, set bit=1; If bit==1: DROP (Replay) ❌
// 3. Packet Seq = 30  (Seq < 37)     : DROP immediately (Too old, fell off window tail) ❌`
  },
  {
    id: 10,
    question: "Why does the sequence number counter in an IPsec SA never wrap around (overflow), and what happens when it reaches 2^32 - 1?",
    shortAnswer: "If sequence numbers wrapped around, an attacker could replay packets from earlier cycles that match newly wrapped sequence numbers. To prevent this, when the sequence counter reaches its maximum (2^32 - 1 in standard or 2^64 - 1 in ESN), the SA MUST terminate and IKE must renegotiate a brand-new SA with fresh keys.",
    explanation: "RFC 4301 strictly forbids sequence number wraparound. Modern high-speed 100Gbps links utilize Extended Sequence Numbers (ESN - 64-bit), extending the rollover time to decades under full line-rate saturation.",
    hint: "Wraparound would allow old sequence numbers to be replayed; when reached, renegotiation is mandatory.",
    level: "Expert",
    codeExample: `// Sequence Number Exhaustion Lifecycle:
// SA Created ➔ Seq = 1 ➔ Seq = 2 ... ➔ Seq = 4,294,967,294
// Warning Threshold Triggered (e.g., 90% lifetime) ➔ IKEv2 triggers REKEY
// New SA established with Seq = 1; Old SA retired before Seq reaches 2^32 - 1.`
  },
  {
    id: 11,
    question: "What is the function of the Peer Authorization Database (PAD) and what critical vulnerability does it prevent in multi-tenant IPsec gateways?",
    shortAnswer: "The PAD maps authenticated IKE peer identities (such as X.509 certificates or FQDNs) to the specific subnets and SPD policies they are legally allowed to negotiate. It prevents a compromised remote peer from claiming SPD policies for subnets it does not own.",
    explanation: "Without a PAD, an authenticated branch office in Ichapur could successfully complete IKE Phase 1 authentication and then request an IPsec tunnel claiming the entire 10.0.0.0/8 datacenter subnet, hijacking traffic meant for other legitimate sites.",
    hint: "PAD ensures authenticated Peer A can only request tunnels for Subnet A, not Subnet B.",
    level: "Expert",
    codeExample: `// PAD Configuration Binding:
// IKE Identity: "CN=branch-ichapur.gov.in"
// Allowed Subnets (PAD): 10.14.50.0/24 ONLY!
// If Branch Ichapur attempts to negotiate SA for 10.20.0.0/16 ➔ KERNEL DROPS REQUEST (PAD Violation)`
  },
  {
    id: 12,
    question: "What IP protocol numbers are assigned by IANA to the two main IPsec protocols: Authentication Header (AH) and Encapsulating Security Payload (ESP)?",
    shortAnswer: "Authentication Header (AH) is IP Protocol Number 51; Encapsulating Security Payload (ESP) is IP Protocol Number 50.",
    explanation: "When inspecting packet captures or configuring upstream firewall access control lists (ACLs), engineers must permit IP protocols 50 and 51 (as well as UDP 500 and UDP 4500 for IKE and NAT-Traversal).",
    hint: "ESP is 50; AH is 51.",
    level: "Basic",
    codeExample: `// IANA IP Protocol Identifiers:
// IPv4 Header 'Protocol' Field / IPv6 'Next Header' Field:
// Protocol 50 ➔ ESP (Encapsulating Security Payload)
// Protocol 51 ➔ AH  (Authentication Header)
// Protocol 6  ➔ TCP
// Protocol 17 ➔ UDP`
  },
  {
    id: 13,
    question: "Why does IPsec Authentication Header (AH) inherently break when traversing Network Address Translation (NAT) routers?",
    shortAnswer: "AH computes its cryptographic Integrity Check Value (ICV) over the entire IP packet, including immutable fields of the IP header. When a NAT router translates the source or destination IP address, the IP header is modified, causing the receiving host's AH ICV check to fail and drop the packet.",
    explanation: "Because AH authenticates the IP addresses themselves, any NAT device in the transit path that modifies the IP header renders the packet invalid. ESP, by contrast, does not authenticate the outer IP header and can traverse NAT via UDP encapsulation (NAT-T).",
    hint: "NAT alters IP addresses; AH includes IP addresses in its checksum calculation.",
    level: "Moderate",
    codeExample: `// Why AH Fails Across NAT:
// Sender: IP(Src=10.14.0.5, Dst=198.51.100.20) + AH(ICV calculated with 10.14.0.5)
// NAT Gateway: Rewrites Src to 203.0.113.10
// Receiver: Computes ICV with 203.0.113.10 ➔ ICV MISMATCH! ➔ Packet DROPPED! ❌`
  },
  {
    id: 14,
    question: "What is NAT-Traversal (NAT-T) in IPsec, what UDP port does it use, and how does it encapsulate ESP packets?",
    shortAnswer: "NAT-T (RFC 3948) encapsulates ESP packets inside standard UDP datagrams on UDP Port 4500. This allows ESP traffic to pass seamlessly through stateful NAT routers and PAT firewalls without packet corruption or dropped connections.",
    explanation: "Because many consumer routers and enterprise firewalls do not recognize raw IP Protocol 50 (ESP) without port numbers, NAT-T wraps the ESP header inside UDP port 4500. NAT routers can then track the port mapping in their NAT state tables normally.",
    hint: "UDP Port 4500 wraps ESP packets so NAT tables have port numbers to track.",
    level: "Moderate",
    codeExample: `// NAT-T Encapsulation (RFC 3948):
// Standard ESP: [ Public IP Header (Proto=50) ] [ ESP Header ] [ Payload ]
// NAT-T ESP   : [ Public IP Header (Proto=17) ] [ UDP Header (DstPort=4500) ] [ ESP Header ] [ Payload ]`
  },
  {
    id: 15,
    question: "What is an 'MTU Black Hole' and why is it a frequent operational issue when deploying IPsec Tunnel Mode?",
    shortAnswer: "An MTU Black Hole occurs when an IPsec gateway adds encapsulation headers (outer IP + ESP + trailer + ICV = ~60-76 bytes) causing the total packet to exceed the WAN Path MTU (e.g., 1500 bytes), while the DF (Don't Fragment) bit is set and intermediate ICMP 'Fragmentation Needed' messages are blocked by firewalls.",
    explanation: "Because the sender receives no ICMP 'Destination Unreachable (Fragmentation Needed)' packets, it continues sending oversized packets that are silently discarded by routers along the path, resulting in hanging connections (e.g., small SSH pings succeed, but large file transfers freeze).",
    hint: "IPsec headers add byte overhead; if packet exceeds 1500 bytes and ICMP is blocked, packets vanish.",
    level: "Expert",
    codeExample: `// Path MTU Overhead Breakdown:
// Standard Ethernet MTU : 1500 Bytes
// Outer IP Header       : 20 Bytes
// ESP Header + IV       : 16 Bytes
// ESP Trailer + Pad     : 18 Bytes
// ICV Authentication Tag: 16 Bytes
// Maximum Payload (MSS) : 1500 - 70 = 1430 Bytes! (Must clamp TCP MSS to 1360-1400 in firewall)`
  },
  {
    id: 16,
    question: "How do network engineers solve IPsec MTU Black Holes and packet fragmentation issues in production enterprise networks?",
    shortAnswer: "1. Configuring TCP MSS Clamping on the IPsec gateways (`iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu` or setting MSS to ~1360-1400 bytes), and 2. Ensuring ICMP Type 3 Code 4 messages are permitted through firewalls.",
    explanation: "TCP MSS Clamping intercepts TCP SYN packets during the 3-way handshake and rewrites the Maximum Segment Size option, forcing clients and servers to negotiate payload sizes small enough to accommodate the IPsec encapsulation overhead.",
    hint: "Clamp the TCP MSS value in the firewall to 1360-1400 bytes so TCP segments never exceed WAN MTU.",
    level: "Expert",
    codeExample: `// Linux MSS Clamping Rule for IPsec:
# sudo iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN \\
    -j TCPMSS --set-mss 1360`
  },
  {
    id: 17,
    question: "What is the role of the Linux Kernel XFRM (Transform) framework in IPsec packet processing?",
    shortAnswer: "XFRM is the native in-kernel packet transformation subsystem in Linux that implements the IPsec SPD and SAD, executing line-rate hardware-accelerated encryption, policy routing, and anti-replay verification directly inside kernel network drivers.",
    explanation: "Modern Linux IPsec daemons (such as strongSwan and Libreswan) handle user-space IKE key negotiation, and then use Netlink sockets to program the negotiated SAs and SPDs directly into the kernel's XFRM subsystem via the `ip xfrm` command interface.",
    hint: "The Linux kernel engine that holds the SPD policies and executes crypto on packets.",
    level: "Expert",
    codeExample: `// Inspecting Linux Kernel XFRM State and Policies:
# sudo ip xfrm state show   # Lists active SAs in kernel SAD
# sudo ip xfrm policy show  # Lists active SPD rules in kernel SPD`
  },
  {
    id: 18,
    question: "What is the difference between IKE (Internet Key Exchange) and the IPsec data plane?",
    shortAnswer: "IKE (UDP Port 500/4500) is the control plane protocol that authenticates peers, negotiates cryptographic algorithms, and exchanges keys; IPsec (Protocols 50/51) is the data plane framework that uses those negotiated keys to encrypt and transmit actual user traffic.",
    explanation: "IKE operates in user-space to perform the heavy asymmetric Diffie-Hellman handshakes. Once keys are agreed upon, IKE pushes the resulting SAs to the OS kernel data plane, where high-speed symmetric ciphers encrypt millions of packets per second.",
    hint: "IKE is the control plane (negotiates keys); IPsec is the data plane (transmits encrypted packets).",
    level: "Basic",
    codeExample: `// IPsec Architecture Planes:
// Control Plane (IKEv2 / UDP 500)  ➔ Asymmetric Auth, DH Key Exchange, SA Negotiation
// ⬇ (Pushes SAs to Kernel)
// Data Plane    (ESP / Proto 50)   ➔ Symmetric AES-GCM Encapsulation, High-Speed Forwarding`
  },
  {
    id: 19,
    question: "What is an Authenticated Encryption with Associated Data (AEAD) cipher suite (e.g., AES-GCM), and why is it preferred in modern IPsec?",
    shortAnswer: "An AEAD cipher suite combines encryption (confidentiality) and message authentication (integrity) into a single optimized mathematical pass, eliminating the need for separate encryption (e.g., AES-CBC) and hashing (e.g., HMAC-SHA256) operations.",
    explanation: "AEAD algorithms like AES-256-GCM and ChaCha20-Poly1305 provide superior cryptographic security (immune to padding oracle attacks) and double the throughput efficiency on modern CPU hardware with AES-NI instructions.",
    hint: "AEAD encrypts and authenticates in a single cryptographic step with higher speed and security.",
    level: "Moderate",
    codeExample: `// Legacy vs Modern IPsec Cipher Suites:
// Legacy (2-pass) : AES-CBC-256 (Encryption) + HMAC-SHA256 (Integrity Check) ➔ Slower, vulnerable to padding oracles
// Modern AEAD     : AES-256-GCM (Combined AEAD) ➔ 2x-4x throughput, hardware accelerated`
  },
  {
    id: 20,
    question: "What is Extended Sequence Numbering (ESN) in RFC 4304, and why is it essential for 40Gbps and 100Gbps network links?",
    shortAnswer: "ESN extends the IPsec sequence number from 32 bits to 64 bits internally, preventing sequence number exhaustion under high-throughput saturation while transmitting only the lower 32 bits on the wire to conserve bandwidth.",
    explanation: "On a 100Gbps network link, a standard 32-bit sequence counter (4.29 billion packets) exhausts in under 5 minutes, requiring constant renegotiations. With 64-bit ESN, the sequence number will not exhaust for over 500 years.",
    hint: "ESN expands sequence counters to 64 bits so high-speed links don't run out of sequence numbers.",
    level: "Expert",
    codeExample: `// Time to Exhaust 32-bit Sequence Numbers at 100 Gbps:
// 100 Gbps = ~14.8 million packets/sec (64-byte packets)
// 2^32 packets / 14,800,000 packets/sec ≈ 290 seconds (~4.8 minutes!)
// With 64-bit ESN: 2^64 / 14,800,000 ≈ 39,000 years.`
  },
  {
    id: 21,
    question: "What are the security and operational trade-offs between Host-to-Host, Gateway-to-Gateway, and Host-to-Gateway IPsec deployment topologies?",
    shortAnswer: "Host-to-Host secures internal traffic between specific endpoints with high granular control but requires IPsec configuration on every host; Gateway-to-Gateway secures entire networks across public WANs transparently with central administration but leaves LAN traffic in cleartext; Host-to-Gateway (Remote Access) secures mobile workers connecting to the corporate core.",
    explanation: "In Defense-in-Depth architectures, organizations frequently combine Gateway-to-Gateway IPsec for site interconnects with internal Host-to-Host Transport Mode IPsec for sensitive database-to-app tier communications.",
    hint: "Host-to-Host (end-to-end); Gateway-to-Gateway (site-to-site); Host-to-Gateway (remote worker VPN).",
    level: "Moderate",
    codeExample: `// IPsec Topologies:
// 1. Gateway-to-Gateway : [ LAN A ] ➔ ( Gateway 1 ) ==[ IPsec Tunnel ]== ( Gateway 2 ) ➔ [ LAN B ]
// 2. Host-to-Host       : [ App Server ] ==[ IPsec Transport Mode ]== [ Database Server ]
// 3. Host-to-Gateway    : [ Remote Laptop ] ==[ IPsec Client VPN ]== ( Corporate Gateway )`
  },
  {
    id: 22,
    question: "What is an 'Initialization Vector' (IV) in the ESP header and why must it never repeat for the same key?",
    shortAnswer: "The IV is a random or pseudorandom nonce used as an input to block ciphers (such as AES-CBC or AES-GCM) to ensure that two identical plaintext packets encrypt to completely different ciphertexts, preventing pattern analysis and cryptographic key leakage.",
    explanation: "If an IV repeats under the same key in AES-GCM, the Galois authentication tag can be forged and the XOR keystream is exposed, allowing attackers to decrypt and manipulate traffic.",
    hint: "A unique nonce ensuring that identical data encrypts to different ciphertexts every time.",
    level: "Expert",
    codeExample: `// Nonce / IV Impact in AES-GCM:
// Plaintext: "Transfer ₹500,000" + Key K + IV 0x00000001 ➔ Ciphertext A: 8f9b...
// Plaintext: "Transfer ₹500,000" + Key K + IV 0x00000002 ➔ Ciphertext B: 3a7c... (Completely different!)`
  },
  {
    id: 23,
    question: "How does the IPsec architecture maintain Limited Traffic Flow Confidentiality?",
    shortAnswer: "In Tunnel Mode, because the entire inner IP packet (including internal source and destination IP addresses, port numbers, and protocol types) is encrypted and hidden behind a single gateway-to-gateway outer IP header, external observers on the Internet cannot analyze internal network topology, communication frequencies, or server roles.",
    explanation: "Additionally, IPsec supports random trailer padding length, ensuring that variable payload sizes do not leak application behavior (such as keystroke timings or audio streaming patterns) to eavesdroppers.",
    hint: "Tunnel mode conceals internal IP addresses and adds padding to hide packet length patterns.",
    level: "Moderate",
    codeExample: `// Traffic Analysis Resistance:
// ISP Sees: 203.0.113.10 ➔ 198.51.100.20 (Size: 1400 bytes, ESP)
// Hidden Inside: 10.14.2.8 (Barrackpore Treasury) ➔ 10.20.5.99 (Kolkata SQL Server) Port 1433`
  },
  {
    id: 24,
    question: "What is the purpose of the 'Next Header' field located in the ESP Trailer and AH Header?",
    shortAnswer: "The Next Header field specifies the protocol type of the encapsulated payload immediately following the IPsec header (e.g., protocol 6 for TCP, protocol 17 for UDP in Transport Mode, or protocol 4 for IPv4 / protocol 41 for IPv6 in Tunnel Mode).",
    explanation: "Because the ESP header itself is encrypted and processed in hardware, the receiver relies on the Next Header field inside the decrypted ESP trailer to know what protocol parser to pass the unpacked packet to in the network stack.",
    hint: "It tells the receiver what protocol comes next after decryption (TCP, UDP, or inner IP).",
    level: "Moderate",
    codeExample: `// ESP Encapsulation & Next Header:
// [ Outer IP (Proto=50 ESP) ]
//   [ ESP Header (SPI, Seq) ]
//   [ ENCRYPTED: TCP Header + HTTP Data ]
//   [ ESP Trailer: Padding (0-255 bytes) | Pad Length (1 byte) | Next Header = 6 (TCP) ]
//   [ ESP ICV Auth Tag (16 bytes) ]`
  },
  {
    id: 25,
    question: "What is the 'Default-Deny' principle in Security Policy Database (SPD) engineering, and why is an explicit fallback drop rule critical?",
    shortAnswer: "Default-Deny mandates that any packet not explicitly matching an authorized PROTECT or BYPASS policy must be matched by a catch-all trailing DISCARD rule and dropped immediately. This prevents accidental cleartext data leakage if a tunnel fails.",
    explanation: "If an IPsec tunnel goes down or a route changes, without a Default-Deny rule, packets might bypass encryption and be routed out the physical interface in plaintext onto the public Internet, leaking sensitive corporate data.",
    hint: "If traffic is not explicitly allowed or encrypted, drop it immediately so nothing leaks in cleartext.",
    level: "Moderate",
    codeExample: `// Hardened SPD Table with Default-Deny:
// Rule 1: Src=10.14.0.0/16 Dst=10.20.0.0/16 ➔ PROTECT (Tunnel)
// Rule 2: Src=10.14.0.0/16 Dst=8.8.8.8/32     ➔ BYPASS  (DNS)
// Rule 999 (FINAL CATCH-ALL): Src=ANY Dst=ANY ➔ DISCARD (Default Deny prevents cleartext leakage!)`
  },
  {
    id: 26,
    question: "What is the difference between Soft Lifetime and Hard Lifetime expiration settings for an IPsec Security Association?",
    shortAnswer: "Soft Lifetime triggers background IKE renegotiation of a new SA before the existing SA expires without interrupting active traffic; Hard Lifetime terminates and deletes the SA immediately, dropping any subsequent packets if a replacement SA has not been established.",
    explanation: "Configuring a comfortable margin between Soft Lifetime (e.g., 28,800 seconds / 8 hours) and Hard Lifetime (e.g., 32,400 seconds / 9 hours) guarantees zero packet loss during cryptographic rekeying.",
    hint: "Soft lifetime warns and rekeys in the background; Hard lifetime kills the SA immediately.",
    level: "Expert",
    codeExample: `// strongSwan Lifetime Configuration (swanctl.conf):
// lifetime_soft = 28800s  ➔ Triggers rekeying at 8 hours while traffic continues
// lifetime_hard = 32400s  ➔ Tears down old SA at 9 hours if rekey fails`
  },
  {
    id: 27,
    question: "How does an IPsec gateway handle Inbound and Outbound Security Policy Database (SPD) lookups differently?",
    shortAnswer: "For Outbound packets, the kernel queries the SPD to determine whether the packet must be encrypted (PROTECT) and what SA to apply. For Inbound packets, after decryption via the SAD, the kernel verifies against the Inbound SPD to ensure the packet arrived via an authorized SA permitted for that source/destination subnet.",
    explanation: "Inbound SPD verification prevents 'tunnel injection' attacks, where an attacker sends packets through an unauthorized valid tunnel to reach subnets that should not be accessible over that specific association.",
    hint: "Outbound lookups choose the encryption policy; Inbound lookups verify the decrypted packet was authorized.",
    level: "Expert",
    codeExample: `// Inbound SPD Verification:
// Packet arrived via SA (SPI=0x88AF1901) for Subnet 10.14.0.0/16
// Kernel verifies Inbound SPD: Is SA 0x88AF1901 authorized for 10.14.0.0/16?
// If YES ➔ Deliver to OS. If NO ➔ DROP & LOG SECURITY VIOLATION.`
  },
  {
    id: 28,
    question: "What is Perfect Forward Secrecy (PFS) in the context of IPsec SA rekeying?",
    shortAnswer: "PFS guarantees that the compromise of long-term authentication keys (or a previous session key) does not compromise the confidentiality of past or future IPsec session keys, by performing an independent Diffie-Hellman ephemeral key exchange during every rekey.",
    explanation: "Without PFS (Diffie-Hellman Group negotiation during Phase 2 / Quick Mode), new SAs derive their keys from the initial master key. With PFS enabled (e.g., DH Group 14 or ECP256), a fresh random secret is generated for every single SA renewal.",
    hint: "Every new SA generates fresh ephemeral keys so past sessions remain secure if keys are stolen.",
    level: "Expert",
    codeExample: `// Enabling PFS in IPsec configuration:
// esp = aes256gcm128-modp2048!  (modp2048 enforces DH Group 14 PFS for Phase 2 SAs)`
  },
  {
    id: 29,
    question: "Why should organizations disable IPsec Authentication Header (AH) and standardize exclusively on Encapsulating Security Payload (ESP)?",
    shortAnswer: "AH does not provide data confidentiality (encryption), fails completely across NAT/PAT routers, and offers no benefits that ESP with AEAD (AES-GCM) cannot deliver with superior performance and universal NAT-T compatibility.",
    explanation: "RFC 8221 deprecates AH for modern deployments. ESP in modern AEAD mode provides both authenticated integrity (matching AH) and military-grade encryption while seamlessly traversing NAT via UDP 4500.",
    hint: "AH lacks encryption and breaks across NAT; ESP does both encryption and integrity while working with NAT.",
    level: "Moderate",
    codeExample: `// Modern IPsec Standard (RFC 8221):
// Deprecated : AH (No encryption, NAT incompatible)
// Standard   : ESP with AEAD (AES-256-GCM / ChaCha20-Poly1305) + NAT-T (UDP 4500)`
  },
  {
    id: 30,
    question: "What are the key steps to perform a live forensic audit of the IPsec kernel subsystem on a Linux production gateway?",
    shortAnswer: "1. Inspect active Security Associations with `sudo ip xfrm state show`; 2. Inspect active Security Policies with `sudo ip xfrm policy show`; 3. Monitor IPsec packet transformation drop counters with `sudo ip -s xfrm state`; 4. Check for MTU/MSS clamping rules with `sudo iptables -t mangle -L -v -n`; 5. Verify daemon status with `swanctl --list-sas`.",
    explanation: "These forensic commands allow security auditors to verify cipher strength (e.g., AES-256-GCM vs insecure 3DES), confirm anti-replay window sizes, observe dropped replay packets, and detect MTU misconfigurations in real time.",
    hint: "Use ip xfrm state, ip xfrm policy, and iptables mangle counters.",
    level: "Expert",
    codeExample: `// Comprehensive Linux IPsec Audit Commands:
# sudo ip xfrm state show              # Displays all active SAs, algorithms, SPIs, and replay counters
# sudo ip -s xfrm state                # Displays packet counters, byte counts, and replay drops
# sudo ip xfrm policy show             # Displays SPD policies and selector rules
# sudo iptables -t mangle -L -v -n     # Confirms MSS clamping rules to prevent MTU black holes
# sudo tcpdump -nn -i any proto 50 or port 500 or port 4500 # Live packet wire inspection`
  }
];

export default questions;
