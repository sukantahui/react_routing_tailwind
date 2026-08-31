const questions = [
  {
    id: 1,
    question: "What is a 'Virtual Private Network' (VPN) and why is it described as both 'Virtual' and 'Private'?",
    shortAnswer: "A VPN creates a secure, encrypted logical tunnel over an untrusted physical public network (the Internet). It is 'Virtual' because no dedicated physical cable is laid, and 'Private' because strong cryptography keeps the data confidential and authenticated.",
    explanation: "Instead of leasing expensive private transatlantic fiber cables, organizations use the public Internet as the underlying transport medium, relying on mathematical encryption algorithms (like AES-256) to ensure privacy.",
    hint: "A secure encrypted tunnel over public internet: 'Virtual' means no private physical cable; 'Private' means encrypted.",
    level: "Basic",
    codeExample: `// VPN Concept:
// Private Client (10.10.1.5) ──[Encrypted Public Tunnel: 203.0.113.5 ➔ 198.51.100.1]──> Corporate LAN (10.20.1.50)`
  },
  {
    id: 2,
    question: "What are the three core cryptographic pillars provided by any robust VPN architecture?",
    shortAnswer: "1. Confidentiality (symmetric encryption renders data unreadable to eavesdroppers); 2. Integrity (cryptographic hashes guarantee in-transit data cannot be tampered with); 3. Authentication (both endpoints verify identities before tunnel negotiation).",
    explanation: "Confidentiality prevents wiretapping. Integrity prevents packet modification by Man-in-the-Middle attackers. Authentication ensures you are communicating with your legitimate corporate gateway and not an adversary's rogue server.",
    hint: "Confidentiality (encryption), Integrity (no tampering), and Authentication (identity verification).",
    level: "Basic",
    codeExample: `// The 3 Pillars of VPN:
// 1. Confidentiality : AES-256-GCM / ChaCha20
// 2. Integrity       : HMAC-SHA256 / Poly1305
// 3. Authentication  : RSA / ECDSA X.509 Certificates + MFA`
  },
  {
    id: 3,
    question: "What is 'Packet Encapsulation' in VPN tunneling?",
    shortAnswer: "The process of wrapping an entire original, private IP packet (including its private source and destination IP headers) inside a new, routable public IP header and cryptographic security header (e.g. ESP or TLS).",
    explanation: "Because private IP addresses (like `10.10.1.5`) are not routable across the public Internet, encapsulation wraps the private packet inside a public IP packet (e.g. `203.0.113.10` to `198.51.100.1`), allowing it to traverse internet routers safely.",
    hint: "Putting a private letter inside a new public envelope with routable internet addresses.",
    level: "Basic",
    codeExample: `// Encapsulation Diagram:
// [ Outer Public IP Header (203.0.113.10 → 198.51.100.1) ]
//   [ IPsec ESP Security Header ]
//     [ ENCRYPTED: Inner Private IP Header (10.10.1.5 → 10.20.1.50) + Data Payload ]`
  },
  {
    id: 4,
    question: "What is the fundamental difference between 'Remote Access VPN' and 'Site-to-Site VPN'?",
    shortAnswer: "Remote Access VPN connects individual roaming client devices (laptops, phones) to a corporate central gateway; Site-to-Site VPN connects two fixed, permanent local area networks (e.g. branch office router to headquarters router) over a transparent link.",
    explanation: "Remote workers use client software (e.g. Cisco AnyConnect, WireGuard app) on demand. Site-to-Site VPNs run continuously on edge routers (Cisco, Fortinet), allowing all office computers to communicate across cities without individual user logins.",
    hint: "Remote Access is for single remote employees; Site-to-Site connects two entire office buildings together.",
    level: "Basic",
    codeExample: `// Remote Access: [Employee Laptop] ──(VPN App)──> [Corporate HQ Gateway]
// Site-to-Site : [Branch Office LAN] ──[Branch Router] ══(IPsec)══ [HQ Router] ──[HQ LAN]`
  },
  {
    id: 5,
    question: "What is 'Maximum Transmission Unit' (MTU) and 'Maximum Segment Size' (MSS) clamping in VPN deployments?",
    shortAnswer: "VPN encapsulation adds 20 to 80 bytes of extra headers. Because standard Ethernet MTU is 1500 bytes, adding headers causes packet fragmentation; MSS clamping lowers the maximum TCP segment size (e.g. to 1360 bytes) to prevent performance degradation.",
    explanation: "If a client sends a 1500-byte packet and the VPN adds 60 bytes of ESP headers, the resulting 1560-byte packet exceeds the 1500-byte MTU, forcing routers to fragment it. MSS clamping forces TCP to keep segments small enough to fit within 1500 bytes after encapsulation.",
    hint: "Lowering the maximum packet payload size so the extra VPN header tags don't make packets too big.",
    level: "Moderate",
    codeExample: `// Cisco Router MSS Clamping:
// interface Tunnel0
//  ip mtu 1420
//  ip tcp adjust-mss 1380`
  },
  {
    id: 6,
    question: "What is 'Split Tunneling' vs 'Full Tunneling' in Remote Access VPN configuration?",
    shortAnswer: "Full Tunneling routes 100% of the client's network traffic (corporate and general internet) through the encrypted VPN tunnel; Split Tunneling routes only corporate-bound traffic through the tunnel while letting general web browsing go directly to the local ISP.",
    explanation: "Full tunneling ensures maximum security inspection and content filtering by corporate firewalls, but consumes high gateway bandwidth. Split tunneling conserves bandwidth but leaves remote endpoints vulnerable to local network attacks.",
    hint: "Full sends everything through the corporate tunnel; Split only sends company work files through the tunnel.",
    level: "Basic",
    codeExample: `// Routing Table Differences:
// Full Tunnel  : 0.0.0.0/0 ➔ dev vpn0 (All traffic encrypted)
// Split Tunnel : 10.0.0.0/8 ➔ dev vpn0 | 0.0.0.0/0 ➔ dev eth0 (Local ISP)`
  },
  {
    id: 7,
    question: "What is 'AES-GCM' (Galois/Counter Mode) and why is it preferred over AES-CBC in modern VPN tunnels?",
    shortAnswer: "AES-GCM is an Authenticated Encryption with Associated Data (AEAD) cipher that provides both confidentiality and data integrity in a single, hardware-accelerated pass, eliminating CBC padding-oracle vulnerabilities.",
    explanation: "Older AES-CBC required a separate HMAC hashing step and was vulnerable to padding oracle attacks. AES-GCM calculates the ciphertext and authentication tag simultaneously using Intel AES-NI CPU instructions at line rate.",
    hint: "A fast modern cipher that encrypts and authenticates packets in one fast step without padding bugs.",
    level: "Moderate",
    codeExample: `// AEAD Cipher Specification:
// Cipher: AES-256-GCM (Key: 256 bits, Nonce: 96 bits, Auth Tag: 128 bits) ➔ Single-Pass Encryption + Integrity!`
  },
  {
    id: 8,
    question: "What is 'Replay Attack Protection' in IPsec and WireGuard VPN tunnels?",
    shortAnswer: "Using monotonically increasing sequence numbers in packet headers and maintaining a sliding window on the receiver to detect and discard duplicate or intercepted packets re-transmitted by an adversary.",
    explanation: "If an eavesdropper captures an encrypted banking transaction packet and resends it 100 times, replay protection checks the sequence number. Because that sequence number was already processed, the duplicate is dropped immediately.",
    hint: "Numbering every packet so an attacker cannot record and resend an old packet to trick the receiver.",
    level: "Moderate",
    codeExample: `// Anti-Replay Sliding Window:
// Packet arrives with Seq=42 ➔ Accepted!
// Attacker replays Packet with Seq=42 ➔ DROPPED: Duplicate Sequence Number Detected!`
  },
  {
    id: 9,
    question: "What is 'IKEv2' (Internet Key Exchange version 2) in IPsec architectures?",
    shortAnswer: "The standard signaling protocol (UDP Port 500/4500) used to authenticate endpoints, negotiate cryptographic algorithms (cipher suites), and establish shared Security Associations (SAs) before user data transmission.",
    explanation: "IKEv2 handles the complex initial cryptographic negotiation. Once IKEv2 agrees on encryption keys, it creates an IPsec ESP tunnel that encrypts actual user data packets.",
    hint: "The negotiation protocol that sets up encryption keys before the VPN tunnel starts sending data.",
    level: "Moderate",
    codeExample: `// IKEv2 Handshake Flow:
// 1. IKE_SA_INIT (Exchange DH public keys & nonces)
// 2. IKE_AUTH    (Authenticate via X.509 certificates or EAP-MFA) ➔ Establishes Child IPsec SA`
  },
  {
    id: 10,
    question: "What is 'WireGuard' and what architectural advantages does it offer over OpenVPN and legacy IPsec?",
    shortAnswer: "An ultra-modern, lightweight VPN protocol built directly into the Linux kernel using state-of-the-art cryptography (Noise Protocol, ChaCha20-Poly1305, Curve25519) with an extremely small codebase (~4,000 lines vs 100,000+ lines in OpenVPN).",
    explanation: "WireGuard's compact codebase makes it easy to audit for security vulnerabilities, enables instant roaming across Wi-Fi and 5G connections without dropped tunnels, and delivers near line-rate throughput with minimal CPU overhead.",
    hint: "A fast, modern VPN with only 4,000 lines of code that runs directly inside the operating system kernel.",
    level: "Moderate",
    codeExample: `// WireGuard Configuration (/etc/wireguard/wg0.conf):
// [Interface]
// PrivateKey = aGVsbG9fd29ybGRfa2V5...
// Address = 10.0.0.2/24
// [Peer]
// PublicKey = UHVibGljS2V5...
// Endpoint = 198.51.100.1:51820
// AllowedIPs = 10.0.0.0/8`
  },
  {
    id: 11,
    question: "What is 'NAT Traversal' (NAT-T / UDP Encapsulation) in IPsec VPNs?",
    shortAnswer: "Wrapping raw IPsec ESP packets (IP protocol 50) inside standard UDP packets on port 4500 so they can pass through home Wi-Fi routers and NAT firewalls that lack support for raw IP protocols.",
    explanation: "Standard consumer NAT routers only track TCP and UDP port numbers. Because IPsec ESP is Layer-3 Protocol 50 (with no port numbers), NAT routers drop it. NAT-T adds a UDP port 4500 header so the packet traverses NAT seamlessly.",
    hint: "Wrapping IPsec inside UDP port 4500 so home Wi-Fi routers can pass it without breaking.",
    level: "Moderate",
    codeExample: `// NAT-Traversal Packet:
// [ IP Header (Src: Home IP, Dst: Gateway IP) ]
//   [ UDP Header (SrcPort: 4500, DstPort: 4500) ]
//     [ IPsec ESP Header ] ➔ Passes through NAT without corruption!`
  },
  {
    id: 12,
    question: "What is 'Perfect Forward Secrecy' (PFS) in VPN key exchange?",
    shortAnswer: "A cryptographic property ensuring that if the long-term master private key of a server is compromised in the future, past encrypted VPN sessions cannot be retroactively decrypted.",
    explanation: "PFS achieves this by generating unique, ephemeral Diffie-Hellman or ECDH session keys for every single connection. Even if an attacker steals the corporate server's private certificate next year, past recorded traffic remains safe.",
    hint: "Creating temporary session keys that are thrown away after each call, so stolen keys cannot unlock old recordings.",
    level: "Moderate",
    codeExample: `// PFS with Ephemeral Diffie-Hellman:
// Cipher Suite: ECDHE-RSA-AES256-GCM-SHA384
// (ECDHE = Elliptic Curve Diffie-Hellman Ephemeral ➔ Enforces Perfect Forward Secrecy)`
  },
  {
    id: 13,
    question: "What is 'SSL / TLS VPN' and what are its two primary implementation models?",
    shortAnswer: "1. Clientless (Browser-based) SSL VPN: Users access internal web portals via standard HTTPS in any web browser; 2. Client-based (Tunnel-based) SSL VPN: A lightweight agent creates a virtual network interface (TUN/TAP) for full TCP/UDP application access.",
    explanation: "Clientless SSL VPN is ideal for third-party contractors who cannot install corporate software. Client-based SSL VPN provides complete network connectivity identical to IPsec.",
    hint: "Web browser-based VPN vs software client-based VPN using TLS encryption.",
    level: "Basic",
    codeExample: `// Clientless vs Client-based SSL VPN:
// Clientless : User opens https://vpn.corp.com in Chrome ➔ Renders internal intranet.
// Client-based: OpenVPN client creates 'tun0' virtual interface ➔ Full network routing enabled.`
  },
  {
    id: 14,
    question: "What is 'TUN vs TAP' virtual network device drivers in OpenVPN and software VPNs?",
    shortAnswer: "TUN (Network Tunnel) operates at Layer 3 (Network Layer), working exclusively with IP packets; TAP (Network Tap) operates at Layer 2 (Data Link Layer), working with raw Ethernet frames including MAC addresses and broadcasts.",
    explanation: "TUN has lower overhead and is standard for routing IP traffic across subnets. TAP is required when bridging non-IP protocols, running PXE network boots, or extending Layer-2 broadcast domains across remote offices.",
    hint: "TUN works with IP packets (Layer 3); TAP works with raw Ethernet frames (Layer 2).",
    level: "Moderate",
    codeExample: `// TUN vs TAP Device:
// dev tun ➔ Layer 3 IP Routing (Faster, standard for internet and enterprise VPNs)
// dev tap ➔ Layer 2 Ethernet Bridging (Carries ARP, NetBIOS broadcasts, and raw MAC frames)`
  },
  {
    id: 15,
    question: "What is 'PPTP' (Point-to-Point Tunneling Protocol) and why is it strictly deprecated in modern cybersecurity?",
    shortAnswer: "An obsolete 1990s VPN protocol relying on MS-CHAPv2 and RC4 encryption; MS-CHAPv2 can be cracked in under 24 hours using offline DES cloud rainbow tables, making PPTP completely insecure.",
    explanation: "PPTP has zero modern cryptographic integrity or confidentiality. Automated tools (like Asleap and CloudCracker) recover the underlying NT password hash within minutes. It must never be used.",
    hint: "An old, broken VPN protocol from the 1990s that can be hacked in minutes and must never be used.",
    level: "Basic",
    codeExample: `// Legacy Deprecated Protocol:
// Protocol: PPTP | Port: TCP 1723 + IP Protocol 47 (GRE) | Security Status: COMPLETELY BROKEN (Do NOT Deploy!)`
  },
  {
    id: 16,
    question: "What is 'L2TP / IPsec' and why does L2TP always require IPsec pairing?",
    shortAnswer: "Layer 2 Tunneling Protocol (L2TP) provides encapsulation and tunneling only, with ZERO native encryption or confidentiality; therefore, it is always combined with IPsec ESP to encrypt the payload.",
    explanation: "L2TP creates the tunnel structure (UDP Port 1701), and IPsec wraps the L2TP packet inside encrypted ESP headers (UDP Port 500/4500). Without IPsec, L2TP sends all data in cleartext.",
    hint: "L2TP only builds the tunnel without encrypting; IPsec must be added to provide encryption.",
    level: "Basic",
    codeExample: `// L2TP/IPsec Packet Structure:
// [ IPsec ESP Header (Encryption) ] ➔ [ L2TP Header (Tunneling) ] ➔ [ PPP Payload (Data) ]`
  },
  {
    id: 17,
    question: "What is 'Zero Trust Network Access' (ZTNA) and how does it improve upon traditional perimeter VPNs?",
    shortAnswer: "ZTNA replaces broad, perimeter-wide network access with identity-aware, application-specific micro-tunnels, enforcing continuous least-privilege verification rather than granting full internal subnet access upon login.",
    explanation: "With a traditional VPN, compromising an employee's credentials grants access to the entire 10.0.0.0/8 network. With ZTNA, the user is connected only to the single specific application they are authorized to access (e.g. Jira only).",
    hint: "Connecting users only to the specific app they need, rather than opening up the entire internal network.",
    level: "Moderate",
    codeExample: `// Traditional VPN vs ZTNA:
// Traditional VPN : User Authenticates ➔ Granted access to ALL 500 servers on VLAN 10!
// ZTNA Model      : User Authenticates ➔ Micro-tunnel connects ONLY to https://crm.internal:443!`
  },
  {
    id: 18,
    question: "What is 'Always-On VPN' with Device-Tethered PKI Certificates?",
    shortAnswer: "A configuration where the corporate laptop automatically establishes an encrypted tunnel as soon as it boots up—before the user even logs into Windows—using hardware TPM-backed computer certificates.",
    explanation: "Always-on VPN ensures that IT administrators can push security patches, monitor telemetry, and enforce Group Policies even when the remote employee is not actively working.",
    hint: "A VPN that turns on automatically the second the computer starts up, using secure hardware chip certificates.",
    level: "Moderate",
    codeExample: `// TPM Machine Certificate Authentication:
// Windows Boot ➔ TPM releases private key ➔ Always-On Tunnel established to HQ Gateway`
  },
  {
    id: 19,
    question: "What is 'Dynamic Multipoint VPN' (DMVPN) in enterprise branch office routing?",
    shortAnswer: "A Cisco routing architecture combining Multipoint GRE (mGRE), Next Hop Resolution Protocol (NHRP), and Dynamic IPsec to allow branch offices to create direct, dynamic on-demand mesh tunnels between each other without hair-pinning traffic through HQ.",
    explanation: "In traditional hub-and-spoke VPNs, branch A talking to branch B must route through HQ. DMVPN enables branch A to query NHRP, discover branch B's public IP, and establish a direct encrypted tunnel dynamically.",
    hint: "Letting branch office routers talk directly to each other without routing through main headquarters.",
    level: "Expert",
    codeExample: `// DMVPN Dynamic Spoke-to-Spoke Tunnel:
// Branch Barrackpore ──(Dynamic IPsec Tunnel)──> Branch Ichapur (Direct Link, Zero HQ Latency!)`
  },
  {
    id: 20,
    question: "What is 'Multi-Factor Authentication (MFA) Integration' (SAML / RADIUS) in enterprise VPNs?",
    shortAnswer: "Requiring users to supply a password plus a secondary time-based one-time password (TOTP) or biometric push notification (via Microsoft Authenticator or Duo) before the VPN gateway issues encryption keys.",
    explanation: "Passwords are frequently compromised via phishing or dark-web credential dumps. MFA prevents unauthorized access even if the adversary obtains the user's valid Active Directory password.",
    hint: "Requiring a phone app approval code in addition to your password to log into the corporate VPN.",
    level: "Basic",
    codeExample: `// RADIUS / SAML MFA Handshake:
// User submits Username+Password ➔ Gateway requests RADIUS Challenge ➔ Push sent to Authenticator App`
  },
  {
    id: 21,
    question: "What is 'Endpoint Posture Assessment / Host Checking' prior to VPN admission?",
    shortAnswer: "Scanning the connecting client device before granting access to verify that the operating system is patched, the corporate antivirus is active, and disk encryption (BitLocker) is enabled.",
    explanation: "If an employee's personal home PC is infected with malware, allowing it to connect to the corporate VPN can spread worms internally. Posture checking quarantines non-compliant machines automatically.",
    hint: "Checking that the remote computer has an updated antivirus and security patches before letting it connect.",
    level: "Moderate",
    codeExample: `// Posture Assessment Check:
// IF Antivirus == Active AND BitLocker == Enabled AND OS_Patch >= KB502:
//     Grant_Full_VPN_Access()
// ELSE:
//     Redirect to Remediation_VLAN()`
  },
  {
    id: 22,
    question: "What is 'VPN Hairpinning' (U-Turning) and why is it an engineering challenge in full-tunneling?",
    shortAnswer: "When an external remote worker accesses a public internet website, the packet travels from client to VPN gateway, enters the corporate LAN, and is immediately forwarded back out through the same gateway interface to the internet.",
    explanation: "Hairpinning doubles bandwidth consumption on the corporate internet link and introduces unnecessary latency for web video streaming, prompting organizations to adopt split tunneling or Cloud Secure Web Gateways (SASE).",
    hint: "When all personal web browsing travels into the company server room and back out to the internet.",
    level: "Moderate",
    codeExample: `// Hairpinning Traffic Path:
// Client (Home) ──> Corporate VPN Gateway ──> Internet ──> Gateway ──> Client (Double Bandwidth Cost)`
  },
  {
    id: 23,
    question: "What is 'Quantum-Resistant / Post-Quantum Cryptography' (PQC) in next-generation VPN protocols?",
    shortAnswer: "Incorporating lattice-based key exchange algorithms (such as ML-KEM / Kyber) into IKEv2 and WireGuard handshakes to protect encrypted traffic against future quantum computer decryption ('Harvest Now, Decrypt Later').",
    explanation: "Adversaries are currently capturing and storing encrypted enterprise VPN traffic. When quantum computers arrive, they could break standard RSA/ECC keys. PQC hybrid key exchange ensures traffic remains un-crackable.",
    hint: "Using advanced new math algorithms that cannot be broken even by super-powerful quantum computers.",
    level: "Expert",
    codeExample: `// Hybrid Post-Quantum Key Exchange:
// Key Agreement = Curve25519 (Classical ECDH) + ML-KEM-768 (Lattice Post-Quantum)`
  },
  {
    id: 24,
    question: "What is 'SASE' (Secure Access Service Edge) and how does it converge VPN with cloud security?",
    shortAnswer: "A cloud-native framework combining Software-Defined WAN (SD-WAN) and comprehensive security functions (ZTNA, Cloud Access Security Broker - CASB, Secure Web Gateway - SWG, Firewall-as-a-Service) into a unified cloud service.",
    explanation: "Instead of backhauling all remote traffic to an on-premises hardware VPN concentrator, SASE inspects traffic at distributed cloud edge points of presence (PoPs) closest to the user.",
    hint: "Moving the corporate VPN gateway and firewall into the cloud so remote workers connect faster.",
    level: "Moderate",
    codeExample: `// SASE Architecture:
// Remote Worker ──> [Cloud Edge Security PoP: ZTNA + CASB + SWG] ──> Cloud Apps (Office 365 / AWS)`
  },
  {
    id: 25,
    question: "What is the statutory CERT-In requirement regarding 'VPN Provider Log Retention' in India?",
    shortAnswer: "VPN service providers operating within India must record and maintain verified customer names, assigned IP addresses, connection timestamps, contact numbers, and ownership records for a minimum duration of 5 years.",
    explanation: "Issued under Section 70B of the IT Act, this directive is designed to assist law enforcement agencies in investigating cyber crimes, financial fraud, and cyber terrorism originating from masked VPN IPs.",
    hint: "Indian law mandates maintaining verified user records and assigned IP connection logs for 5 years.",
    level: "Basic",
    codeExample: `// Structured CERT-In VPN Audit Record:
const certInVpnLog = {
  timestamp: "2026-08-23T14:00:00.120Z",
  userFullName: "Debangshu Mukherjee",
  assignedVirtualIp: "10.10.4.88",
  realOriginIp: "203.0.113.45",
  retentionRequirementYears: 5
};`
  },
  {
    id: 26,
    question: "What is 'VPN Concentrator Clustering and High Availability (HA)' in enterprise datacenters?",
    shortAnswer: "Deploying active-active or active-passive pairs of hardware VPN appliances that synchronize Security Associations (SAs) in real time; if the primary concentrator fails, the secondary takes over without dropping client sessions.",
    explanation: "In high-availability clustering, thousands of remote workers experience seamless failover in under 1 second without needing to re-enter passwords or re-authenticate.",
    hint: "Running pairs of backup VPN servers so if one breaks, remote workers stay connected without noticing.",
    level: "Moderate",
    codeExample: `// Cisco ASA / FortiGate HA State Sync:
// Primary Gateway (198.51.100.1) ──[State Sync Link]──> Secondary Gateway (198.51.100.2)`
  },
  {
    id: 27,
    question: "What is 'Route-Based VPN' (VTI - Virtual Tunnel Interface) vs 'Policy-Based VPN' (Crypto-Map)?",
    shortAnswer: "Policy-Based VPN uses Access Control Lists (ACLs) to define which traffic triggers encryption; Route-Based VPN binds the tunnel to a virtual network interface (e.g. `vti0`), allowing standard dynamic routing protocols (BGP/OSPF) to steer traffic.",
    explanation: "Route-based VPNs are much easier to manage, support equal-cost multi-path (ECMP) routing, and allow standard firewall rules to inspect traffic entering the tunnel interface.",
    hint: "Route-based uses a clean virtual network card with BGP; Policy-based uses complex manual access lists.",
    level: "Expert",
    codeExample: `// Route-Based VTI Configuration:
// interface Tunnel1
//  ip address 172.16.1.1 255.255.255.252
//  tunnel source GigabitEthernet0/0
//  tunnel destination 198.51.100.1
//  tunnel mode ipsec ipv4`
  },
  {
    id: 28,
    question: "What is 'SSL-VPN Session Hijacking' and how is it mitigated?",
    shortAnswer: "An attack where an adversary steals a user's active session cookie (via XSS or infostealer malware) and replays it to access internal corporate applications without knowing the password.",
    explanation: "Mitigated by binding the session cookie to the client's initial public IP address and device certificate, setting `HttpOnly` and `SameSite=Strict` cookie flags, and enforcing short session timeouts.",
    hint: "Stealing an active login cookie; stopped by tying the cookie to the user's specific IP and certificate.",
    level: "Moderate",
    codeExample: `// Session Hardening Header:
// Set-Cookie: vpn_session_id=A991823B; Secure; HttpOnly; SameSite=Strict; Max-Age=3600`
  },
  {
    id: 29,
    question: "What is 'TCP-over-TCP Meltdown' in SSL/TLS VPNs?",
    shortAnswer: "A severe performance collapse occurring when a TCP-based application runs inside a TCP-based VPN tunnel across a lossy network; both outer and inner TCP stacks initiate simultaneous retransmissions and exponential back-offs, choking the link.",
    explanation: "To prevent TCP meltdown, modern VPNs (OpenVPN, WireGuard, IPsec) always use UDP as the outer carrier transport protocol, allowing the inner application's TCP stack to manage flow control independently.",
    hint: "A severe lag storm that happens when you run TCP inside TCP; solved by using UDP for the outer tunnel.",
    level: "Expert",
    codeExample: `// Carrier Protocol Rule:
// AVOID: TCP Application ──> TCP VPN Tunnel ──> Insecure Link (Meltdown Hazard!)
// BEST : TCP Application ──> UDP VPN Tunnel (WireGuard / OpenVPN UDP) ──> Clean Line-Rate Performance!`
  },
  {
    id: 30,
    question: "Synthesize the overarching strategic role of VPNs in modern enterprise cyber defense.",
    shortAnswer: "VPNs provide the foundational cryptographic backbone for secure remote communication, bridging geographically dispersed workforces and branch offices with verified Confidentiality, Integrity, and Authentication—evolving today into zero-trust architectures in full compliance with CERT-In and the DPDP Act 2023.",
    explanation: "By encrypting data at line rate, enforcing multi-factor identity verification, and encapsulating private network traffic across untrusted public carriers, VPNs ensure that sensitive organizational assets remain shielded from global surveillance and cyber espionage.",
    hint: "VPNs are the cryptographic shield that protects remote workers and branch offices across the public internet.",
    level: "Moderate",
    codeExample: `// The Master Enterprise VPN Formula:
// Modern Secure Connectivity = [AES-256-GCM / WireGuard Cryptography] + [MFA & Device Posture Checks] + [MSS Clamping & UDP Transport] + [ZTNA Application Micro-Tunnels] + [CERT-In 180d/5y Compliance]`
  }
];

export default questions;
