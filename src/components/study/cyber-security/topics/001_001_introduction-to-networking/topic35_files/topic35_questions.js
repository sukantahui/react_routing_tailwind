// topic35_questions.js
// 30 Moderate to Expert Questions on Network Protocols and Standards in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is a Network Protocol in computer networking?",
    shortAnswer: "A Protocol is a formal set of standardized rules, syntax, semantics, and synchronization procedures that govern how network nodes format, exchange, transmit, and verify data across digital communication channels.",
    explanation: "Just as human diplomats agree upon a common diplomatic language and etiquette to communicate, network computers follow protocols to interoperate regardless of hardware vendor or operating system.",
    hint: "Standardized set of rules governing digital communication between computers.",
    level: "basic",
    codeExample: "Protocol = { Syntax: 'Bit layout', Semantics: 'Meaning of fields', Timing: 'Sequencing & Speed' };"
  },
  {
    question: "What are the three fundamental pillars that define every network protocol?",
    shortAnswer: "1. Syntax (structure, data format, bit lengths, and header delimiters), 2. Semantics (the specific meaning and control actions associated with each bit pattern), and 3. Timing (sequencing, speed matching, state transitions, and timeouts).",
    explanation: "Syntax dictates HOW data is structured; Semantics dictates WHAT the data means; Timing dictates WHEN data is transmitted and acknowledged.",
    hint: "Syntax (format), Semantics (meaning), Timing (synchronization and speed).",
    level: "expert",
    codeExample: "ProtocolPillars = { Syntax: 'Field positions', Semantics: 'Opcode actions', Timing: 'State timeouts' };"
  },
  {
    question: "How does the TCP 3-Way Handshake establish a reliable, connection-oriented session?",
    shortAnswer: "1. Client sends SYN (Synchronize Sequence Number: seq=x); 2. Server replies with SYN-ACK (seq=y, ack=x+1); 3. Client sends ACK (ack=y+1). Both sides synchronize sequence numbers and agree upon TCP window scaling options.",
    explanation: "The 3-way handshake prevents duplicate old connection requests from establishing false sessions and initializes bidirectional sequence tracking.",
    hint: "Step 1: SYN → Step 2: SYN-ACK → Step 3: ACK.",
    level: "basic",
    codeExample: "Handshake: Client --SYN(seq=100)--> Server --SYN-ACK(seq=300, ack=101)--> Client --ACK(ack=301)--> ESTABLISHED"
  },
  {
    question: "How does Connectionless UDP differ from Connection-Oriented TCP?",
    shortAnswer: "TCP is connection-oriented, provides guaranteed in-order delivery, error recovery, flow control, and congestion avoidance at the cost of higher latency; UDP is connectionless, sends datagrams without handshakes, lacks retransmissions, and provides ultra-low latency.",
    explanation: "TCP is used for web, email, and file transfers where zero data loss is critical; UDP is used for live video streaming, DNS lookups, and multiplayer gaming.",
    hint: "TCP is reliable with handshakes; UDP is lightweight and fast without handshakes.",
    level: "moderate",
    codeExample: "Comparison = { TCP: 'Reliable, 3-Way Handshake, Flow Control', UDP: 'Connectionless, Low Latency, Fast' };"
  },
  {
    question: "What is an RFC (Request for Comments) and which organization standardizes Internet protocols?",
    shortAnswer: "An RFC is a formal document published by the Internet Engineering Task Force (IETF) that defines technical specifications, protocol standards (e.g. RFC 791 IPv4, RFC 793 TCP, RFC 8446 TLS 1.3), and best practices for the global Internet.",
    explanation: "RFCs progress from Proposed Standard to Internet Standard through rigorous peer review and multi-vendor interoperability testing.",
    hint: "IETF publishes RFC documents that define official Internet protocol standards.",
    level: "moderate",
    codeExample: "IETF_Standards = ['RFC 791 (IPv4)', 'RFC 793 (TCP)', 'RFC 2616 (HTTP/1.1)', 'RFC 8446 (TLS 1.3)'];"
  },
  {
    question: "What is a TCP SYN Flood Attack and how do SYN Cookies mitigate it?",
    shortAnswer: "An attacker floods a server with millions of spoofed TCP SYN packets without sending the final ACK, exhausting the server's SYN Backlog queue memory; SYN Cookies encode connection state cryptographically inside the Initial Sequence Number (ISN), allocating zero server memory until the valid client ACK arrives.",
    explanation: "SYN Cookies allow servers in Kolkata to survive massive multi-gigabit botnet SYN floods without crashing kernel memory buffers.",
    hint: "Floods fake SYN packets to exhaust server memory; SYN Cookies store state in sequence numbers.",
    level: "expert",
    codeExample: "sysctl -w net.ipv4.tcp_syncookies=1 // Enables SYN Cookie flood defense in Linux kernel"
  },
  {
    question: "What is a Protocol Downgrade Attack (e.g. SSL Stripping or POODLE)?",
    shortAnswer: "A Man-in-the-Middle (MitM) attack where an adversary intercepts protocol negotiation handshakes and forces the client and server to fall back to an older, cryptographically broken protocol version (e.g. forcing TLS 1.3 down to SSL 3.0 or HTTP).",
    explanation: "Mitigated by HTTP Strict Transport Security (HSTS) headers and disabling legacy SSL 2.0/3.0 and TLS 1.0/1.1 ciphers across all web servers.",
    hint: "Forces secure connections to downgrade to insecure legacy protocols.",
    level: "expert",
    codeExample: "Header always set Strict-Transport-Security 'max-age=31536000; includeSubDomains; preload'"
  },
  {
    question: "What is DNSSEC (Domain Name System Security Extensions) and what vulnerability does it solve?",
    shortAnswer: "DNSSEC adds cryptographic digital signatures (RRSIG, DNSKEY) to DNS records to ensure origin authenticity and data integrity, completely preventing DNS Cache Poisoning (Kaminsky Attacks) and spoofed IP redirection.",
    explanation: "When Susmita accesses `bank.wb.gov.in`, DNSSEC cryptographically proves the returned IP address was authorized by the true domain owner.",
    hint: "Adds cryptographic signatures to DNS records to prevent cache poisoning.",
    level: "expert",
    codeExample: "dnssec.validateRecord(DomainRecord, RRSIG_Signature, DNSKEY) => 'Cryptographically Authentic';"
  },
  {
    question: "What is BGP Route Hijacking and how does RPKI (Resource Public Key Infrastructure) defeat it?",
    shortAnswer: "An attack where a rogue Autonomous System (ASN) broadcasts illegitimate BGP routing announcements to steal international IP traffic; RPKI uses cryptographically signed Route Origin Authorizations (ROAs) to verify whether an ASN is authorized to announce that IP prefix.",
    explanation: "Routers drop invalid BGP route announcements that fail RPKI cryptographic validation, protecting global traffic paths.",
    hint: "RPKI cryptographically validates that an ISP is authorized to announce specific IP blocks.",
    level: "expert",
    codeExample: "if (rpki.validate(AnnouncedPrefix, OriginASN) === 'INVALID') router.dropBGPRoute();"
  },
  {
    question: "What is Protocol Fuzzing in Cyber Security vulnerability research?",
    shortAnswer: "An automated black-box testing technique that injects malformed, unexpected, or boundary-violating packet syntax into a protocol parser (using tools like Boofuzz, Peach, or AFL) to discover buffer overflows, memory leaks, and zero-day crash vulnerabilities.",
    explanation: "Security researchers in Jadavpur fuzz custom IoT protocols to identify zero-day vulnerabilities before deployment in smart grids.",
    hint: "Sending malformed and corrupt protocol packets to software to discover crashes and security bugs.",
    level: "expert",
    codeExample: "fuzzer.mutate(validPacket) => injectsMalformedPayloads() => monitorsServerForCrashes();"
  },
  {
    question: "What are the standard port numbers and transport protocols for HTTP, HTTPS, DNS, SSH, and SNMP?",
    shortAnswer: "HTTP: Port 80 (TCP); HTTPS: Port 443 (TCP/QUIC); DNS: Port 53 (UDP/TCP); SSH: Port 22 (TCP); SNMP: Port 161 (UDP).",
    explanation: "These well-known ports (0–1023) are assigned by the Internet Assigned Numbers Authority (IANA) to standard server daemons.",
    hint: "HTTP=80, HTTPS=443, DNS=53, SSH=22, SNMP=161.",
    level: "basic",
    codeExample: "StandardPorts = { HTTP: 80, HTTPS: 443, DNS: 53, SSH: 22, SNMP: 161 };"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Intrusion Detection System (IDS/IPS) Sensor Appliance?",
    shortAnswer: "Approximately ₹65,000 to ₹2,50,000 (e.g. Cisco Firepower, Fortinet FortiGate IPS, or Snort/Suricata hardware appliance) plus annual threat intelligence signatures (₹25,000 – ₹65,000/year).",
    explanation: "Hardware IPS sensors analyze protocol state machines in real-time ASIC silicon to detect and drop exploit payloads at line rate in ₹ budgets.",
    hint: "Enterprise IDS/IPS sensor costs ₹65,000 – ₹2,50,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "IDS_Appliance_Cost = ₹1,20,000; // Multi-Gigabit Real-Time Protocol Inspection Sensor"
  },
  {
    question: "How does QUIC (HTTP/3) over UDP revolutionize web transport protocol performance?",
    shortAnswer: "QUIC integrates transport connection setup and TLS 1.3 encryption into a single 1-RTT handshake, operates over UDP to eliminate Head-of-Line (HoL) blocking across independent multiplexed streams, and supports seamless connection migration across mobile IP changes.",
    explanation: "When a student moves from campus Wi-Fi to 5G cellular in Kolkata, QUIC keeps video downloads streaming without breaking the connection.",
    hint: "QUIC combines TCP and TLS into a single 1-RTT handshake over UDP with zero HoL blocking.",
    level: "expert",
    codeExample: "QUIC_Features = ['1-RTT Handshake', 'No Head-of-Line Blocking', 'Connection Migration', 'Built-in TLS 1.3'];"
  },
  {
    question: "What is the 4-Way TCP Connection Teardown process?",
    shortAnswer: "1. Sender sends FIN; 2. Receiver replies with ACK; 3. Receiver sends its own FIN when finished sending data; 4. Sender replies with ACK and enters TIME_WAIT state (typically 2 * MSL = 60–120s) to guarantee final ACK delivery.",
    explanation: "Because TCP is full-duplex, each direction of the connection must be terminated independently using its own FIN/ACK pair.",
    hint: "FIN → ACK → FIN → ACK completes full bidirectional connection closing.",
    level: "moderate",
    codeExample: "Teardown: HostA --FIN--> HostB --ACK--> HostB --FIN--> HostA --ACK--> TIME_WAIT → CLOSED"
  },
  {
    question: "What is the function of the TCP TIME_WAIT state and why does it prevent packet confusion?",
    shortAnswer: "TIME_WAIT holds the socket open for 2 * Maximum Segment Lifetime (2MSL) after sending the final ACK to ensure the remote host received the ACK, and to allow lingering delayed duplicate packets from the old session to expire in the network.",
    explanation: "Without TIME_WAIT, delayed packets from an old connection could arrive during a newly established session on the same port, corrupting data.",
    hint: "Waits 60-120 seconds after closing to ensure final ACK was received and drain old packets.",
    level: "expert",
    codeExample: "TIME_WAIT_Duration = 2 * MSL; // Typically 60 seconds in modern Linux kernels"
  },
  {
    question: "What is the difference between In-Band Protocol Signaling and Out-of-Band Protocol Signaling?",
    shortAnswer: "In-Band signaling transmits control messages and data over the exact same channel (e.g. HTTP headers and HTML payload over Port 80); Out-of-Band signaling uses a separate dedicated control channel (e.g. FTP Port 21 for commands and Port 20 for data).",
    explanation: "Out-of-band protocols like FTP complicate stateful firewall rule configurations because dynamic data ports must be opened on the fly.",
    hint: "In-Band uses the same channel for control and data; Out-of-Band uses separate channels.",
    level: "expert",
    codeExample: "FTP_Signaling = { ControlChannel: 'Port 21 (Commands)', DataChannel: 'Port 20 (File Transfer)' };"
  },
  {
    question: "What is SNMP (Simple Network Management Protocol) and why is SNMPv3 mandated for security?",
    shortAnswer: "SNMP monitors network device health (CPU, bandwidth, port status) via Management Information Bases (MIBs); SNMPv1/v2c transmit community strings in cleartext plaintext, while SNMPv3 adds cryptographic authentication (SHA-256) and AES encryption.",
    explanation: "Attackers sniffing cleartext SNMPv2c strings in Barrackpore could reconfigure core routers; SNMPv3 encrypts all telemetry in transit.",
    hint: "SNMPv3 adds encryption (AES) and authentication (SHA), replacing insecure plaintext SNMPv1/v2c.",
    level: "moderate",
    codeExample: "snmp-server user AdminGroup v3 auth sha StrongPassword priv aes 128 StrongKey"
  },
  {
    question: "What is the OSI Model vs the TCP/IP Model layer mapping?",
    shortAnswer: "OSI 7 Layers: Application, Presentation, Session, Transport, Network, Data Link, Physical; TCP/IP 4 Layers: Application (OSI 5-7), Transport (OSI 4), Internet (OSI 3), Network Access / Link (OSI 1-2).",
    explanation: "The OSI model is a theoretical conceptual reference framework; the TCP/IP suite is the practical, implemented architecture of the global Internet.",
    hint: "OSI has 7 layers; TCP/IP compresses them into 4 practical layers.",
    level: "basic",
    codeExample: "Mapping = { 'OSI 7,6,5': 'TCP/IP Application', 'OSI 4': 'Transport', 'OSI 3': 'Internet', 'OSI 2,1': 'Network Access' };"
  },
  {
    question: "What is an Application-Layer Gateway (ALG) and why is it needed for complex multi-port protocols?",
    shortAnswer: "A security module in a NAT router/firewall that inspects application-layer payloads of complex protocols (SIP, FTP, H.323) and dynamically rewrites embedded private IP addresses and opens required ephemeral data ports.",
    explanation: "Without an SIP ALG, VoIP phone calls behind NAT cannot negotiate audio RTP streams because the private IP is embedded inside the SIP payload.",
    hint: "Firewall module that inspects application payloads to open dynamic ports for protocols like FTP and SIP.",
    level: "expert",
    codeExample: "algEngine.rewriteEmbeddedIP(SIP_Payload, PublicNAT_IP);"
  },
  {
    question: "What is SSH (Secure Shell) and how does it secure remote administration compared to Telnet?",
    shortAnswer: "Telnet transmits all usernames, passwords, and commands in unencrypted plaintext on Port 23; SSH (Port 22) uses public-key cryptography and AES symmetric encryption to guarantee confidentiality, integrity, and server authentication.",
    explanation: "Anyone running Wireshark on an unmanaged switch can capture Telnet passwords in seconds; SSH provides encrypted ciphertext.",
    hint: "SSH encrypts all terminal traffic with AES; Telnet sends passwords in clear plaintext.",
    level: "basic",
    codeExample: "ssh admin@192.168.1.1 -p 22 // Encrypted administrative channel"
  },
  {
    question: "What is TLS (Transport Layer Security) 1.3 and what major cryptographic improvements did it introduce?",
    shortAnswer: "TLS 1.3 (RFC 8446) removed insecure legacy ciphers (RSA key exchange, RC4, 3DES, MD5, SHA-1), mandated Perfect Forward Secrecy (PFS via ECDHE), cut handshake latency to 1-RTT, and encrypted all certificates in transit.",
    explanation: "PFS ensures that even if a server's long-term private key is stolen in the future, past recorded encrypted sessions can never be decrypted.",
    hint: "Mandates Perfect Forward Secrecy, removes weak ciphers, and speeds up handshakes to 1-RTT.",
    level: "expert",
    codeExample: "TLS_1_3_Ciphers = ['TLS_AES_256_GCM_SHA384', 'TLS_CHACHA20_POLY1305_SHA256'];"
  },
  {
    question: "What is a State Machine in network protocol design?",
    shortAnswer: "A mathematical model of computation consisting of a set of defined states, transition events, and output actions that govern how a protocol responds to incoming packets and timer expirations (e.g. TCP states: CLOSED, LISTEN, SYN_SENT, ESTABLISHED).",
    explanation: "Protocol state machines ensure deterministic behavior, rejecting invalid packet sequences that violate protocol rules.",
    hint: "Mathematical model defining the exact states and valid transitions of a protocol.",
    level: "expert",
    codeExample: "TCP_StateMachine: CLOSED → (rcv SYN) → SYN_RCVD → (rcv ACK) → ESTABLISHED"
  },
  {
    question: "What is ICMP (Internet Control Message Protocol) and why is it vital for IP error reporting?",
    shortAnswer: "ICMP (Protocol 1) is a Network Layer helper protocol used by routers and hosts to report communication errors (Destination Unreachable, Time Exceeded, Redirect) and diagnostic signals (Echo Request/Reply for Ping).",
    explanation: "Routers generate ICMP messages to inform senders when links fail, packets exceed MTU, or TTL counts hit zero.",
    hint: "Reports network errors and diagnostic messages (e.g. Ping Echo Request and Time Exceeded).",
    level: "moderate",
    codeExample: "ICMP_Types = { EchoReply: 0, DestUnreachable: 3, EchoRequest: 8, TimeExceeded: 11 };"
  },
  {
    question: "What is HTTP Keep-Alive (Persistent Connections) and how does it optimize web application throughput?",
    shortAnswer: "A protocol feature that reuses a single open TCP connection for multiple sequential HTTP requests and responses, eliminating the CPU and latency overhead of repeatedly executing 3-way handshakes and TLS negotiations.",
    explanation: "Loading a modern webpage with 50 images over one persistent connection saves 49 multi-RTT TCP handshakes.",
    hint: "Reuses the same TCP connection for multiple file downloads, avoiding repeated handshakes.",
    level: "moderate",
    codeExample: "Connection: keep-alive // HTTP header maintaining persistent TCP session"
  },
  {
    question: "What is BGP (Border Gateway Protocol) and why is it termed the 'glue of the Internet'?",
    shortAnswer: "BGP (Port 179) is the standardized Exterior Gateway Protocol (EGP) used to exchange routing and reachability information among Autonomous Systems (ASNs) across the global Internet.",
    explanation: "BGP makes policy-based routing decisions based on path attributes (AS-Path, Next-Hop, Local Preference), connecting thousands of independent ISPs worldwide.",
    hint: "The global routing protocol that connects all ISPs and Autonomous Systems across the Internet.",
    level: "expert",
    codeExample: "router bgp 65001\n  neighbor 103.25.10.1 remote-as 65002 // Establishes BGP peering"
  },
  {
    question: "What is the difference between Standard Protocol Headers and Proprietary Protocol Headers?",
    shortAnswer: "Standard protocol headers are openly documented by standards bodies (IETF, IEEE, ISO) allowing multi-vendor interoperability; Proprietary protocol headers are closed, vendor-specific formats (e.g. Cisco EIGRP historically, AppleTalk) that lock customers to a single manufacturer.",
    explanation: "Modern enterprise architectures in Kolkata mandate open, standard protocols (OSPF, BGP, 802.1Q) to prevent costly single-vendor lock-in.",
    hint: "Standard headers are open and work on all equipment; proprietary headers work only on one vendor.",
    level: "moderate",
    codeExample: "OpenStandards = ['IEEE 802.3', 'IETF RFC 8446']; Proprietary = ['VendorX_Proprietary_Mesh'];"
  },
  {
    question: "What is Protocol Encapsulation and Decapsulation?",
    shortAnswer: "Encapsulation is the process where each lower OSI layer wraps data from the layer above with its own protocol header/trailer before transmission; Decapsulation is the reverse process where the receiving node strips off headers as data moves up the stack.",
    explanation: "Application Data → wrapped in TCP Segment → wrapped in IP Packet → wrapped in Ethernet Frame → transmitted as bits.",
    hint: "Encapsulation adds headers as data moves down; Decapsulation removes headers as data moves up.",
    level: "basic",
    codeExample: "Encapsulation: L7 Data → L4 Segment → L3 Packet → L2 Frame → L1 Physical Bits"
  },
  {
    question: "What is Wireshark Protocol Dissection and how do protocol dissectors work?",
    shortAnswer: "A software plugin/module in Wireshark that recognizes specific protocol bit patterns and field offsets in captured frames, decoding raw binary bytes into human-readable protocol trees and diagnostic warnings.",
    explanation: "Dissectors decode complex protocols (HTTP/2, TLS, Kerberos, BGP) into structured fields, highlighting retransmissions, resets, and malformed syntax.",
    hint: "Software modules in Wireshark that decode raw binary bytes into human-readable protocol fields.",
    level: "moderate",
    codeExample: "wireshark.dissector.register('custom_proto', port = 9090);"
  },
  {
    question: "What is a Reset (RST) Flag in a TCP segment and when is it generated?",
    shortAnswer: "The RST flag indicates an abrupt connection teardown; it is generated when a host receives a segment for a closed port, an invalid sequence number, or when an enterprise firewall/IPS forcibly terminates a malicious session.",
    explanation: "If you attempt to connect to Port 80 on a server where no web server is running, the operating system kernel replies with a TCP RST-ACK packet.",
    hint: "Abruptly terminates a TCP connection immediately (e.g. when connecting to a closed port).",
    level: "moderate",
    codeExample: "TCP_Flags: [RST=1, ACK=1] // Connection refused or forcibly terminated by firewall"
  },
  {
    question: "What is the ultimate golden rule for designing, auditing, and securing Network Protocols?",
    shortAnswer: "'Enforce strict Syntax, Semantics, and Timing across the 4-layer stack; mandate TLS 1.3 with Perfect Forward Secrecy; enable SYN Cookies to defeat TCP exhaustion; secure DNS with DNSSEC and BGP with RPKI; and budget hardware IDS/IPS sensors in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes protocol architecture, transport reliability, cryptographic security, threat mitigation, and financial hardware budgeting.",
    hint: "Syntax/Semantics/Timing + TLS 1.3 PFS + SYN Cookies + DNSSEC/RPKI + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: MasterProtocolPillars() → EnforceTLS13PFS() → DeploySYNCookies() → ValidateDNSSECandRPKI() → BudgetInRupees(₹);"
  }
];

export default questions;
