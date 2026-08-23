const questions = [
  {
    id: 1,
    question: "What is the core architectural difference between IPsec 'Tunnel Mode' and 'Transport Mode'?",
    shortAnswer: "Tunnel Mode encrypts the entire original IP packet (header + payload) and prepends a brand-new public IP header (used for Site-to-Site and Remote Access); Transport Mode encrypts only the Layer 4 payload while keeping the original IP header in cleartext (used for Host-to-Host).",
    explanation: "Tunnel mode completely hides internal enterprise IP addresses (e.g. `10.10.1.5`) from intermediate public internet routers. Transport mode is designed for direct server-to-server communication where both endpoints are already routable.",
    hint: "Tunnel mode encrypts the whole original packet and puts on a new address label; Transport mode encrypts only the payload.",
    level: "Basic",
    codeExample: `// Encapsulation Comparison:
// Tunnel Mode   : [ New Public IP ] + [ ESP ] + [ ENCRYPTED: Original IP (10.10.1.5) + TCP + Data ]
// Transport Mode: [ Original IP (10.10.1.5) ] + [ ESP ] + [ ENCRYPTED: TCP + Data ]`
  },
  {
    id: 2,
    question: "What are the two primary protocols in the IPsec suite and what security services do they provide?",
    shortAnswer: "1. Authentication Header (AH - IP Protocol 51): Provides integrity, authentication, and anti-replay, but ZERO encryption/confidentiality; 2. Encapsulating Security Payload (ESP - IP Protocol 50): Provides confidentiality, data integrity, authentication, and anti-replay.",
    explanation: "AH leaves all payload data in cleartext. Because ESP provides both strong encryption (AES-256-GCM) and authentication in a single protocol, ESP is deployed in over 99% of enterprise VPN networks.",
    hint: "AH provides integrity without encryption; ESP provides both encryption and integrity.",
    level: "Basic",
    codeExample: `// IPsec Protocol Suite:
// AH  (IP Proto 51) : Integrity + Authentication (Cleartext Payload)
// ESP (IP Proto 50) : Confidentiality + Integrity + Authentication (AEAD Encrypted)`
  },
  {
    id: 3,
    question: "Why is IPsec Authentication Header (AH) fundamentally incompatible with Network Address Translation (NAT)?",
    shortAnswer: "Because AH computes its cryptographic integrity hash across the outer IP header (including source and destination IP addresses); when a NAT router rewrites the IP address, the receiver's AH hash check fails and the packet is dropped as tampered with.",
    explanation: "NAT by definition modifies the Layer-3 IP header. Because AH considers any modification of the IP header an attack, AH verification fails across any standard home Wi-Fi router or firewall NAT gateway.",
    hint: "AH hashes the IP addresses; when NAT changes the IP address, the security check thinks the packet was hacked.",
    level: "Moderate",
    codeExample: `// AH NAT Failure:
// Sender calculates AH Hash over IP(192.168.1.5) ➔ NAT changes IP to 203.0.113.88 ➔ Receiver AH check FAILS!`
  },
  {
    id: 4,
    question: "How does 'NAT-Traversal' (NAT-T / RFC 3948) solve the NAT limitation for IPsec ESP?",
    shortAnswer: "By wrapping raw IPsec ESP packets (IP Protocol 50) inside standard UDP packets on port 4500, allowing consumer NAT firewalls to track connection port numbers and translate IP addresses without breaking cryptographic verification.",
    explanation: "Because ESP does not hash the outer IP header, modifying the outer IP address during NAT does not invalidate the ESP cryptographic authentication tag.",
    hint: "Wrapping IPsec inside UDP port 4500 so home routers can translate IP addresses without errors.",
    level: "Moderate",
    codeExample: `// NAT-T Packet Layout:
// [ Outer Public IP (NAT-Modified) ] ➔ [ UDP Port 4500 Header ] ➔ [ IPsec ESP Header ] ➔ [ Encrypted Payload ]`
  },
  {
    id: 5,
    question: "What is a 'Security Association' (SA) in IPsec architecture?",
    shortAnswer: "A unidirectional logical contract agreed upon by two VPN endpoints that specifies the shared encryption keys, cryptographic algorithms (e.g. AES-256-GCM), Security Parameter Index (SPI), and lifetime parameters for a communication channel.",
    explanation: "Because SAs are strictly unidirectional, a standard bidirectional IPsec tunnel requires a minimum of two SAs: one inbound SA and one outbound SA.",
    hint: "An agreement defining the encryption keys and cipher rules for one direction of traffic.",
    level: "Moderate",
    codeExample: `// IPsec SA Pair:
// Inbound SA  : SPI=0x100A, Key=AES_Key_1, Direction=HQ ➔ Branch
// Outbound SA : SPI=0x200B, Key=AES_Key_2, Direction=Branch ➔ HQ`
  },
  {
    id: 6,
    question: "What is the 'Security Parameter Index' (SPI) field in the IPsec ESP header?",
    shortAnswer: "A 32-bit arbitrary identification number placed in the cleartext ESP header that allows the receiving VPN gateway to instantly look up the correct Security Association (SA) and decryption key in its Security Association Database (SADB).",
    explanation: "A high-volume VPN concentrator handles thousands of tunnels simultaneously. The SPI tells the gateway exactly which encryption key to use to decrypt that specific packet in constant time.",
    hint: "A 32-bit tag on the outside of the packet that tells the server which key to use to unlock it.",
    level: "Basic",
    codeExample: `// ESP Header Layout:
// [ SPI: 0x77192A40 (32 bits) ] [ Sequence Number: 0x0000002A (32 bits) ] [ Encrypted Payload... ]`
  },
  {
    id: 7,
    question: "What are the major structural improvements of 'IKEv2' (RFC 7296) over legacy 'IKEv1'?",
    shortAnswer: "IKEv2 establishes tunnels in a fast 4-message exchange (versus 6 to 9 messages in IKEv1), includes native built-in NAT-Traversal detection, natively supports MOBIKE session roaming, features built-in EAP authentication, and consumes 70% less bandwidth.",
    explanation: "IKEv1 was complex, requiring Phase 1 (Main/Aggressive mode) and Phase 2 (Quick mode). IKEv2 combines negotiation into `IKE_SA_INIT` and `IKE_AUTH`, establishing tunnels in under 100 milliseconds.",
    hint: "IKEv2 connects in 4 fast messages instead of 9, with built-in NAT support and mobile roaming.",
    level: "Moderate",
    codeExample: `// IKEv2 4-Message Handshake:
// 1. IKE_SA_INIT (Request)  ➔ Exchange DH public keys & nonces
// 2. IKE_SA_INIT (Response) ➔ Confirm crypto proposal
// 3. IKE_AUTH    (Request)  ➔ Send encrypted credentials / certificate
// 4. IKE_AUTH    (Response) ➔ Establish Child IPsec SA`
  },
  {
    id: 8,
    question: "When is IPsec 'Transport Mode' preferred over 'Tunnel Mode'?",
    shortAnswer: "1. Encrypting traffic directly between two internal servers on the same local subnet (Host-to-Host); 2. Providing underlying encryption for overlay tunneling protocols like GRE (GRE over IPsec) or L2TP (L2TP/IPsec) to avoid adding redundant IP headers.",
    explanation: "When GRE already adds a new IP header, using IPsec Tunnel Mode would add yet another third IP header, wasting 20 bytes. Using Transport Mode encrypts the GRE packet without adding an unnecessary outer IP header.",
    hint: "Used for direct server-to-server connections on the same network or inside GRE tunnels to save 20 bytes.",
    level: "Moderate",
    codeExample: `// GRE over IPsec Transport Mode:
// [ Outer Public IP Header ] ➔ [ IPsec ESP (Transport) ] ➔ [ GRE Header ] ➔ [ Inner Private IP Packet ]`
  },
  {
    id: 9,
    question: "What is 'IPsec ESP Trailer' and what fields does it contain?",
    shortAnswer: "Appended at the end of the encrypted payload, the ESP trailer contains: 1. Padding bytes (to align ciphertext to cipher block boundaries if using block ciphers); 2. Pad Length (1 byte); 3. Next Header (1 byte, identifying the passenger protocol, e.g. TCP=6 or IPv4=4).",
    explanation: "The Next Header field is encrypted inside the ESP envelope, hiding whether the passenger packet is web browsing, SSH, or database queries from intermediate network sniffers.",
    hint: "A small footer tag at the end of the encrypted packet that tells the receiver what type of data is inside.",
    level: "Moderate",
    codeExample: `// ESP Trailer Structure:
// [ Encrypted Data Payload ] ➔ [ Padding (0-255 Bytes) ] ➔ [ Pad Length (1B) ] ➔ [ Next Header: 0x06 (TCP) ]`
  },
  {
    id: 10,
    question: "What is the 'Integrity Check Value' (ICV) in IPsec ESP packets?",
    shortAnswer: "A 128-bit or 256-bit cryptographic authentication tag calculated by HMAC-SHA-256 or AES-GCM GHASH over the ESP header and ciphertext, appended to the very end of the packet to verify data integrity.",
    explanation: "Upon packet arrival, the receiving router recalculates the ICV. If a single bit in the ESP header or ciphertext was altered in transit, the ICV check fails and the packet is immediately dropped.",
    hint: "A mathematical digital seal at the end of the packet that proves the packet was not tampered with.",
    level: "Basic",
    codeExample: `// ESP Packet with ICV:
// [ ESP Header ] [ Ciphertext Payload ] [ ESP Trailer ] [ ICV Auth Tag (16 Bytes) ]`
  },
  {
    id: 11,
    question: "What is 'Security Policy Database' (SPD) vs 'Security Association Database' (SADB)?",
    shortAnswer: "The SPD defines WHAT traffic must be encrypted, bypassed, or dropped based on IP selectors/ACLs; the SADB stores the actual active cryptographic keys, algorithms, and sequence counters (HOW to encrypt).",
    explanation: "When a packet arrives at the router, the router queries the SPD: if the action is IPSEC, it queries the SADB to find the corresponding SA and encrypts the packet.",
    hint: "SPD is the rulebook deciding what to encrypt; SADB is the key vault holding active encryption keys.",
    level: "Moderate",
    codeExample: `// Packet Lookup Flow:
// Packet arrives ➔ Query SPD (Match: Encrypt!) ➔ Query SADB (SPI: 0x100A, Key: AES-256) ➔ Encapsulate!`
  },
  {
    id: 12,
    question: "What is 'MOBIKE' (IKEv2 Mobility and Multihoming Protocol - RFC 4555)?",
    shortAnswer: "An extension to IKEv2 that allows a mobile client to change its physical IP address (e.g. roaming from Wi-Fi to 5G cellular) without re-negotiating the IKE session or tearing down active IPsec Security Associations.",
    explanation: "The client sends an `INFORMATIONAL` message with its new public IP. The gateway updates the SA endpoint address on the fly, allowing file transfers and video streams to continue uninterrupted.",
    hint: "Keeping the VPN tunnel alive smoothly when your phone switches between home Wi-Fi and 5G.",
    level: "Moderate",
    codeExample: `// MOBIKE IP Update:
// Client Roams ➔ Sends IKEv2 INFORMATIONAL (New IP: 100.64.22.4) ➔ Gateway updates SA; Zero Session Drop!`
  },
  {
    id: 13,
    question: "What is 'IKEv2 Cookie Challenge' (Anti-DoS Defense)?",
    shortAnswer: "A stateless defense mechanism where a busy VPN gateway responds to initial `IKE_SA_INIT` requests with an unauthenticated cryptographic cookie, requiring the client to retransmit the request with the cookie before the gateway allocates CPU memory for Diffie-Hellman calculations.",
    explanation: "Computing Diffie-Hellman keys is CPU intensive. If an attacker floods the gateway with forged SYN packets, the cookie challenge ensures the gateway only spends CPU power on legitimate clients with real IP addresses.",
    hint: "Giving callers a secret puzzle token first to make sure they are not automated spam bots.",
    level: "Expert",
    codeExample: `// IKEv2 Anti-DoS Cookie:
// Attacker floods IKE_SA_INIT ➔ Gateway replies with Cookie (Zero Memory Allocated) ➔ Attacker drops; Server protected!`
  },
  {
    id: 14,
    question: "What is 'IPsec Rekeying Collision' and how does IKEv2 resolve it?",
    shortAnswer: "When both VPN peers initiate an SA rekeying request at the exact same millisecond; IKEv2 detects the simultaneous rekey via lowest-nonce comparison rules, cleanly retiring the duplicate SA without dropping packets.",
    explanation: "In IKEv1, simultaneous rekeying often caused phase-2 SA state mismatches, blackholing traffic. IKEv2 specifies exact deterministic arbitration rules in RFC 7296.",
    hint: "When both routers try to change keys at the exact same second; IKEv2 has rules to pick one cleanly.",
    level: "Expert",
    codeExample: `// Simultaneous Rekey Arbitration:
// Peer A Nonce < Peer B Nonce ➔ Peer A's SA is accepted; Peer B silently deletes its duplicate SA.`
  },
  {
    id: 15,
    question: "What is 'Extended Sequence Numbers' (ESN - 64-bit Sequence Numbers) in High-Speed IPsec?",
    shortAnswer: "Using a 64-bit sequence number space ($2^{64}$ packets) instead of the traditional 32-bit counter ($2^{32} \\approx 4.29$ billion packets) to prevent sequence number exhaustion on 100 Gbps fiber links.",
    explanation: "On a 100 Gbps link, a 32-bit sequence number overflows in less than 5 minutes, forcing constant disruptive SA rekeying. 64-bit ESN allows continuous transmission for hundreds of years without rekeying.",
    hint: "A super-long 64-bit counter that never runs out of numbers even on ultra-fast 100 Gbps lines.",
    level: "Expert",
    codeExample: `// ESN in IKEv2 Proposal:
// esp-gcm-256-esn (Transmits only lower 32 bits on wire while receiver maintains full 64-bit state)`
  },
  {
    id: 16,
    question: "What is 'IPsec Crypto-Map' (Policy-Based) vs 'IPsec VTI' (Route-Based)?",
    shortAnswer: "Crypto-Map uses access control lists (ACLs) to inspect egress packets and trigger encryption if an ACL matches; VTI binds the IPsec SA to a virtual network interface (`Tunnel1`), allowing standard `ip route` and dynamic routing protocols (BGP) to steer traffic.",
    explanation: "Crypto-maps are legacy, error-prone, and cannot support dynamic routing. VTIs are modern, support standard routing protocols, and allow firewall rules to inspect traffic entering the tunnel interface.",
    hint: "Crypto-map uses manual access lists; VTI uses a clean virtual network interface card.",
    level: "Moderate",
    codeExample: `// Route-Based VTI Configuration:
// interface Tunnel1
//  ip address 172.16.1.1 255.255.255.252
//  tunnel source GigabitEthernet0/0
//  tunnel destination 198.51.100.1
//  tunnel mode ipsec ipv4`
  },
  {
    id: 17,
    question: "What is 'IPsec Traffic Selectors' (Narrow vs Wide Selectors) in IKEv2?",
    shortAnswer: "The IP address ranges, subnets, and port numbers negotiated in IKEv2 `TSi` (Traffic Selector Initiator) and `TSr` (Traffic Selector Responder) that define which packets are permitted to cross the Child SA.",
    explanation: "If Router-A requests `0.0.0.0/0` (Wide) and Router-B only allows `10.10.0.0/16` to `10.20.0.0/16` (Narrow), IKEv2 automatically narrows the SA to the intersection, preventing SA establishment failures.",
    hint: "The rule defining which subnet addresses are allowed to send traffic through the tunnel.",
    level: "Moderate",
    codeExample: `// IKEv2 TS Negotiation:
// TSi = 10.10.0.0/16 (Branch) ➔ TSr = 10.20.0.0/16 (HQ) ➔ Child SA created for this exact subnet pair.`
  },
  {
    id: 18,
    question: "What is 'Hardware Crypto-Engine Offloading' (QAT / SafeXcel) on IPsec Routers?",
    shortAnswer: "Offloading AES-GCM encryption, decryption, and HMAC hash computations to dedicated PCIe coprocessor hardware (like Intel QuickAssist Technology - QAT), freeing CPU cores for packet routing.",
    explanation: "Hardware QAT offloading increases IPsec gateway throughput from 2 Gbps to over 40 Gbps while keeping host CPU utilization below 10%.",
    hint: "Dedicated accelerator cards that do heavy encryption in hardware to save CPU power.",
    level: "Moderate",
    codeExample: `// Intel QAT Driver Hook:
// openssl engine -t -c qatengine ➔ "QAT engine available for hardware IPsec offload"`
  },
  {
    id: 19,
    question: "What is 'IKEv2 EAP-MSCHAPv2 / EAP-TLS' in Remote Access Client Authentication?",
    shortAnswer: "Using the Extensible Authentication Protocol (EAP) inside IKEv2 message 3 and 4 to authenticate users against Microsoft Active Directory / Azure AD (EAP-MSCHAPv2) or PKI smartcards (EAP-TLS).",
    explanation: "IKEv2 allows separating machine authentication (gateway certificate) from user authentication (user password + MFA via EAP), enabling enterprise Single Sign-On.",
    hint: "Logging into the IPsec VPN using your corporate Active Directory username and password.",
    level: "Moderate",
    codeExample: `// IKEv2 EAP Configuration:
// crypto ikev2 profile AD_USERS
//  authentication remote eap query-identity`
  },
  {
    id: 20,
    question: "What is 'Dynamic Routing (OSPF / BGP) over IPsec VTI' vs GRE-over-IPsec?",
    shortAnswer: "Native IPsec VTIs support unicast dynamic BGP peering directly without GRE encapsulation, saving 24 bytes of GRE overhead per packet; GRE is only required if running legacy multicast-dependent protocols like RIP or broadcast discovery.",
    explanation: "Modern enterprise architectures use BGP directly over IPsec VTIs. This eliminates GRE overhead while providing sub-second failover and dynamic route distribution.",
    hint: "Running BGP directly over IPsec VTI to save 24 bytes of GRE overhead on every packet.",
    level: "Expert",
    codeExample: `// BGP directly over IPsec VTI:
// router bgp 65001
//  neighbor 172.16.1.2 remote-as 65002 (Peering established across Tunnel1 with zero GRE overhead!)`
  },
  {
    id: 21,
    question: "What is 'IPsec Fragmentation Before vs After Encryption'?",
    shortAnswer: "Fragmentation before encryption splits the passenger packet before ESP headers are added (safer for NAT and firewalls); fragmentation after encryption splits the already-encrypted ESP packet into two fragments (can be dropped by stateful firewalls).",
    explanation: "When an ESP packet is fragmented after encryption, only the first fragment contains the ESP SPI and port numbers. The second fragment lacks port numbers and is often dropped by intermediate firewalls. Pre-encryption fragmentation solves this.",
    hint: "Splitting packets before encrypting them so firewalls don't get confused by fragments missing headers.",
    level: "Expert",
    codeExample: `// Cisco Pre-Fragmentation:
// crypto ipsec fragmentation before-encryption`
  },
  {
    id: 22,
    question: "What is 'IPsec Ingress Filtering / Anti-Spoofing Check' (uRPF)?",
    shortAnswer: "Verifying that the inner source IP address of a decapsulated packet matches the authorized subnet configured in the Security Association's Traffic Selector; packets with spoofed source IPs are dropped immediately.",
    explanation: "If a compromised branch office router tries to send packets claiming to originate from the CEO's personal IP, the gateway's ingress filter drops the spoofed packet.",
    hint: "Checking that incoming VPN packets actually belong to the branch office that sent them.",
    level: "Moderate",
    codeExample: `// Unicast Reverse Path Forwarding (uRPF) on Tunnel:
// interface Tunnel1
//  ip verify unicast source reachable-via rx`
  },
  {
    id: 23,
    question: "What is 'Dual-Stack IPv4 / IPv6 Tunneling' over Single-Stack Carrier IPsec?",
    shortAnswer: "Transporting both internal private IPv4 (`10.0.0.0/8`) and internal private IPv6 (`fd00::/8`) passenger packets simultaneously inside a single public IPv4 or IPv6 IPsec ESP tunnel.",
    explanation: "IKEv2 supports dual-stack traffic selectors in a single Child SA, allowing organizations to transition to IPv6 without deploying separate VPN tunnels.",
    hint: "Sending both IPv4 and IPv6 traffic through the exact same encrypted IPsec tunnel.",
    level: "Moderate",
    codeExample: `// Dual-Stack Traffic Selectors:
// TSi = { 10.10.0.0/16, 2001:db8:10::/64 } ➔ TSr = { 10.20.0.0/16, 2001:db8:20::/64 }`
  },
  {
    id: 24,
    question: "What is 'IPsec SA Blackholing' during Silent Peer Crash and how does DPD eliminate it?",
    shortAnswer: "When a remote router suddenly loses power without sending an IKE teardown message, the local router continues encrypting and sending packets into a black hole; Dead Peer Detection (DPD) sends periodic probes and tears down the dead SA in seconds.",
    explanation: "DPD exchanges `R-U-THERE` keepalive probes. When 3 consecutive probes fail, the router deletes the dead SA and redirects traffic to backup links.",
    hint: "When a crashed router causes lost packets; fixed by DPD heartbeat checks that spot dead routers.",
    level: "Basic",
    codeExample: `// DPD Configuration:
// crypto ikev2 dpd 10 3 periodic (Probe every 10 seconds; declare dead after 3 failed retries)`
  },
  {
    id: 25,
    question: "What is the statutory CERT-In requirement regarding 'IPsec Configuration and SA Audit Records' in India?",
    shortAnswer: "Organizations must retain complete records of all IPsec Security Association creation events, SPI identifiers, negotiated cipher suites, authenticating certificate fingerprints, and connection durations for 180 days.",
    explanation: "Under Indian cybersecurity guidelines, maintaining forensically sound IPsec negotiation telemetry ensures full traceability during incident response audits.",
    hint: "180-day retention of all IPsec SA creation records, cipher proposals, and peer connection logs under Indian law.",
    level: "Basic",
    codeExample: `// Structured CERT-In IPsec Audit Log:
const certInIpsecRecord = {
  timestamp: "2026-08-23T14:30:00.310Z",
  peerGatewayIp: "198.51.100.1",
  assignedSpiHex: "0x100A",
  ipsecMode: "TUNNEL_MODE",
  cipherSuite: "AES-256-GCM-AEAD",
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'IPsec Transform Set' configuration in Cisco IOS?",
    shortAnswer: "A command defining the combination of encryption algorithms, cryptographic hashes, and encapsulation modes used to protect traffic (e.g. `crypto ipsec transform-set TS_GCM esp-gcm 256`).",
    explanation: "The transform set is referenced in the IPsec profile or crypto map to define the exact Phase 2 Security Association parameters.",
    hint: "The configuration line specifying the exact cipher and integrity hash to use for IPsec encryption.",
    level: "Basic",
    codeExample: `// Cisco IOS Transform Set:
// crypto ipsec transform-set GCM_SET esp-gcm 256
//  mode tunnel`
  },
  {
    id: 27,
    question: "What is 'TCP Maximum Segment Size (MSS) Calculation' for IPsec Tunnel Mode?",
    shortAnswer: "$$\\text{MSS} = \\text{MTU (1500)} - \\text{Outer IP (20)} - \\text{UDP NAT-T (8)} - \\text{ESP Header (8)} - \\text{IV (16)} - \\text{Inner IP (20)} - \\text{TCP (20)} - \\text{ICV (16)} = 1392\\text{ Bytes}$$ (typically clamped to 1380 or 1360 bytes for safety).",
    explanation: "Subtracting all encapsulation headers ensures that the largest possible TCP packet never exceeds 1500 bytes after encryption.",
    hint: "Calculating exact payload size: 1500 minus 120 bytes of headers leaves 1380 bytes for data.",
    level: "Moderate",
    codeExample: `// Exact MSS Formula:
// Recommended Clamp: ip tcp adjust-mss 1380 (Zero Packet Fragmentation Guaranteed!)`
  },
  {
    id: 28,
    question: "What is 'IPsec Anti-Replay Bitmask Size' tuning on Cisco and Fortinet firewalls?",
    shortAnswer: "Increasing the sliding window bitmask from 64 to 1024 or 4096 packets to prevent false packet drops when traffic is load-balanced over multi-path WAN connections where packets arrive slightly out of order.",
    explanation: "On multi-gigabit links with packet reordering, a small 64-packet window drops legitimate out-of-order packets. Expanding the window to 1024 packets eliminates false replay drops.",
    hint: "Expanding the out-of-order memory buffer so fast multi-path internet lines don't drop packets.",
    level: "Moderate",
    codeExample: `// FortiGate Replay Window Tuning:
// config vpn ipsec phase2-interface
//  set replay-window-size 1024`
  },
  {
    id: 29,
    question: "What is 'Sweet32 Attack' on legacy 3DES IPsec VPNs?",
    shortAnswer: "A collision attack (CVE-2016-2183) against 64-bit block ciphers (3DES and Blowfish); after capturing $2^{32}$ blocks ($\approx 32$ GB) of traffic encrypted with the same key, a birthday attack recovers plaintext session cookies.",
    explanation: "Sweet32 proved that 64-bit block ciphers are unsafe for high-speed networks. Modern IPsec strictly mandates 128-bit block ciphers (AES-128 and AES-256).",
    hint: "A collision vulnerability in old 3DES encryption that cracks cookies after 32 GB of data; solved by AES.",
    level: "Moderate",
    codeExample: `// Cipher Hardening against Sweet32:
// DISALLOW: esp-3des esp-md5
// MANDATE : esp-gcm 256 (128-bit block size ➔ 100% Immune to Sweet32)`
  },
  {
    id: 30,
    question: "Synthesize the engineering criteria for selecting between IPsec Tunnel Mode and Transport Mode.",
    shortAnswer: "Deploy IPsec Tunnel Mode with ESP (AES-256-GCM + IKEv2 + NAT-T) for all Site-to-Site branch interconnects and Remote Access gateways to achieve full IP address obfuscation and universal NAT traversal; deploy IPsec Transport Mode strictly for internal Host-to-Host server replication and GRE/L2TP overlay encryption to save 20 bytes of header overhead—operating continuously in full compliance with CERT-In directives and the DPDP Act 2023.",
    explanation: "Tunnel Mode is the universal standard for enterprise internet connectivity, protecting both addresses and data. Transport Mode provides lightweight end-to-end encryption within private datacenters.",
    hint: "Use Tunnel Mode across the internet for branch offices and remote workers; use Transport Mode inside datacenters between servers.",
    level: "Moderate",
    codeExample: `// The Master IPsec Architecture Rule:
// Public WAN / Branch Office : [IPsec ESP Tunnel Mode + IKEv2 + NAT-T @ UDP 4500]
// Private Datacenter LAN     : [IPsec ESP Transport Mode + AES-256-GCM Host-to-Host]`
  }
];

export default questions;
