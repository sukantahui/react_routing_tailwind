const questions = [
  {
    id: 1,
    question: "Why is PPTP (Point-to-Point Tunneling Protocol) considered completely obsolete and forbidden in modern enterprise cybersecurity?",
    shortAnswer: "PPTP relies on MS-CHAPv2 authentication (which can be 100% cracked in under 23 hours via 56-bit DES reduction) and MPPE (RC4) encryption (which provides zero data integrity HMAC and is vulnerable to bit-flipping and keystream reuse attacks).",
    explanation: "Because both its authentication and encryption algorithms are mathematically broken, NIST SP 800-77, PCI-DSS, and CERT-In strictly prohibit the use of PPTP in any production environment.",
    hint: "PPTP uses broken passwords (cracked in hours) and broken RC4 encryption without tamper protection.",
    level: "Basic",
    codeExample: `// PPTP Vulnerability Summary:
// Control Channel: TCP 1723 ➔ Vulnerable to DoS & Session Hijacking
// Data Channel   : GRE (Proto 47) ➔ Blocked by Cloud Firewalls
// Authentication : MS-CHAPv2 ➔ Cracked in < 23 hours via CloudCracker FPGA
// Encryption     : MPPE (RC4) ➔ Zero HMAC integrity; bit-flipping exploits`
  },
  {
    id: 2,
    question: "What is the mathematical vulnerability in 'MS-CHAPv2' that allows attackers to crack any user password in less than 23 hours?",
    shortAnswer: "MS-CHAPv2 splits the 16-byte NT password hash into two 7-byte chunks and a 2-byte remnant, encrypting a known challenge with single DES ($2^{56} \\approx 7.2 \\times 10^{16}$ keys); cracking one 56-bit DES key reveals the password hash directly.",
    explanation: "Moxie Marlinspike and David Hulton demonstrated at DEF CON 20 that a specialized FPGA cluster (CloudCracker) can exhaust the entire 56-bit DES key space in 23 hours with a 100% guaranteed success rate.",
    hint: "Breaking the password into small 56-bit DES puzzle pieces that modern computers can brute-force in hours.",
    level: "Moderate",
    codeExample: `// MS-CHAPv2 DES Reduction Flaw:
// 16-Byte NT-Hash ➔ [DES-Key-1 (7 Bytes)] + [DES-Key-2 (7 Bytes)] + [DES-Key-3 (2 Bytes)]
// Cracking single DES (2^56 keys) ➔ Recovers the entire Windows NT password hash!`
  },
  {
    id: 3,
    question: "What is the primary security limitation of standalone 'L2TP' (Layer 2 Tunneling Protocol)?",
    shortAnswer: "Standalone L2TP provides ZERO native encryption or confidentiality; it only encapsulates and tunnels Layer 2 PPP frames across IP networks, transmitting all user passwords, session tokens, and data payloads in 100% cleartext.",
    explanation: "L2TP was designed solely as a transport tunneling mechanism. To make it secure, network administrators must always wrap L2TP inside an IPsec ESP envelope (L2TP/IPsec).",
    hint: "L2TP has no encryption on its own; everything is sent in plain text unless you add IPsec.",
    level: "Basic",
    codeExample: `// Standalone L2TP (Insecure):
// [ Public IP ] ➔ [ UDP Port 1701 ] ➔ [ L2TP Header ] ➔ [ CLEARTEXT PPP DATA (No Encryption!) ]`
  },
  {
    id: 4,
    question: "What is 'L2TP/IPsec' and what are the major operational trade-offs of this architecture?",
    shortAnswer: "Wrapping L2TP inside IPsec ESP Transport Mode to provide AES encryption and HMAC integrity; the trade-off is heavy double encapsulation overhead (76+ bytes), complex multi-phase configuration, and high susceptibility to NAT traversal failures.",
    explanation: "Because L2TP adds its own UDP/PPP headers inside the IPsec envelope, packet size expands significantly, causing severe MTU fragmentation issues across broadband ISPs.",
    hint: "Adding IPsec to L2TP makes it secure, but the double wrapping adds heavy overhead and causes lag.",
    level: "Moderate",
    codeExample: `// L2TP/IPsec Double Encapsulation:
// [ Outer IP (20B) ] + [ ESP (8B) ] + [ UDP 1701 (8B) ] + [ L2TP (8B) ] + [ PPP (4B) ] + [ Inner Data ] + [ ICV (16B) ] = 76+ Bytes Overhead!`
  },
  {
    id: 5,
    question: "Why does PPTP's use of 'GRE (IP Protocol 47)' create deployment failures in cloud and home NAT environments?",
    shortAnswer: "GRE operates directly over Layer 3 (IP Protocol 47) without Layer 4 TCP/UDP port numbers; standard home NAT routers and cloud security groups (AWS/Azure) cannot map multiple outbound GRE sessions to a single public IP address.",
    explanation: "When multiple employees behind the same home Wi-Fi or office NAT try to connect to a PPTP server, the NAT router cannot distinguish between their GRE streams, dropping all connections except the first one.",
    hint: "GRE doesn't have port numbers, so home Wi-Fi routers cannot share the connection between multiple laptops.",
    level: "Moderate",
    codeExample: `// GRE NAT Failure:
// Laptop 1 & Laptop 2 send GRE (Proto 47) ➔ Home Router has no Port Numbers ➔ Laptop 2 Connection DROPPED!`
  },
  {
    id: 6,
    question: "What is the 'RC4 Keystream Reuse / Bit-Flipping Vulnerability' in PPTP's MPPE encryption?",
    shortAnswer: "Because MPPE uses the RC4 stream cipher without a cryptographic MAC (HMAC), flipping bits in the encrypted ciphertext produces predictable bit flips in the decrypted plaintext, allowing attackers to modify financial transfer amounts undetected.",
    explanation: "In authenticated ciphers (AES-GCM), flipping a bit causes immediate decryption failure. In MPPE, changing `0x01` to `0x09` changes a ₹10,000 transfer into ₹90,000 without the server ever noticing.",
    hint: "Changing encrypted bytes alters the underlying message directly because there is no anti-tampering seal.",
    level: "Expert",
    codeExample: `// MPPE Bit-Flipping Attack:
// Ciphertext_Byte XOR Delta ➔ Decrypted_Plaintext XOR Delta (Zero Authentication Tag to detect tampering!)`
  },
  {
    id: 7,
    question: "What are the standard network ports used by PPTP and L2TP?",
    shortAnswer: "PPTP uses TCP Port 1723 (Control) + IP Protocol 47 (GRE Data); L2TP uses UDP Port 1701 (Control & Data), encapsulated inside UDP Port 500 / 4500 when paired with IPsec.",
    explanation: "Knowing these port signatures allows SOC analysts and perimeter firewalls to detect and block unauthorized legacy VPN protocols across enterprise networks.",
    hint: "PPTP: TCP 1723 + GRE 47; L2TP: UDP 1701.",
    level: "Basic",
    codeExample: `// Port Breakdown:
// PPTP : TCP/1723 (Signaling) + GRE/47 (Traffic)
// L2TP : UDP/1701 (Signaling & Traffic)`
  },
  {
    id: 8,
    question: "What is 'Cisco LAC (L2TP Access Concentrator)' vs 'LNS (L2TP Network Server)' in ISP dial-up architectures?",
    shortAnswer: "The LAC is the remote access server that terminates physical phone/DSL dial-in connections; the LNS is the central corporate gateway that terminates the L2TP tunnel, authenticates the PPP session, and assigns internal corporate IP addresses.",
    explanation: "This separation allowed telecom ISPs (LAC) to tunnel remote worker dial-up calls directly into corporate enterprise networks (LNS) over public IP backbones.",
    hint: "LAC is the telecom dial-in box; LNS is the company's central tunnel server.",
    level: "Moderate",
    codeExample: `// ISP L2TP Architecture:
// Dial-Up Client ──(PSTN/ISDN)──> ISP LAC ──(L2TP Tunnel across IP)──> Corporate LNS Gateway`
  },
  {
    id: 9,
    question: "Why did Apple and Google remove native PPTP support from iOS, macOS, and Android?",
    shortAnswer: "Because PPTP is mathematically unfixable due to intrinsic flaws in MS-CHAPv2 and RC4; removing the client prevented non-technical users from mistakenly relying on broken, eavesdroppable encryption.",
    explanation: "Apple removed PPTP starting in iOS 10 and macOS Sierra (2016); Google deprecated PPTP in Android 12. Both operating systems enforce modern IKEv2 and WireGuard protocols.",
    hint: "Tech giants deleted PPTP from phones and Macs because it is hopelessly broken and unsafe.",
    level: "Basic",
    codeExample: `// OS Support Status:
// iOS / macOS : PPTP completely removed since 2016
// Android 12+ : PPTP removed from native settings menu`
  },
  {
    id: 10,
    question: "What is 'PAP' (Password Authentication Protocol) and 'CHAP' in L2TP authentication?",
    shortAnswer: "PAP transmits usernames and passwords across the tunnel in 100% unencrypted cleartext; CHAP uses a simple challenge-response with MD5 (vulnerable to offline dictionary and hash collision attacks).",
    explanation: "Using PAP inside standalone L2TP means an attacker sniffing the Wi-Fi or fiber link can view the administrator's password in plain ASCII text.",
    hint: "PAP sends passwords in plain English; CHAP uses weak MD5 hashes that are easily cracked.",
    level: "Basic",
    codeExample: `// PAP Authentication Packet:
// Packet Content: "USER=admin PASS=Summer2026!" (Zero Hashing / Zero Encryption!)`
  },
  {
    id: 11,
    question: "What is 'Rainbow Table Attack' on MS-CHAPv2 password hashes?",
    shortAnswer: "Using massive precomputed lookup tables containing billions of plaintext passwords and their corresponding MS-CHAPv2 challenge-response hashes to recover the password in seconds instead of computing hashes in real time.",
    explanation: "Because MS-CHAPv2 does not use unique per-user cryptographic salts for the DES reduction steps, precomputed rainbow tables make cracking instant.",
    hint: "A giant pre-calculated dictionary of passwords that lets hackers find your password in seconds.",
    level: "Moderate",
    codeExample: `// Rainbow Table Query:
// Input Captured Hash: 0x88F1A290... ➔ Lookup in Rainbow Table ➔ Output: "Password123!" in 0.4 seconds!`
  },
  {
    id: 12,
    question: "What is 'L2TP Control Message Sequence Numbering' (Nr and Ns fields)?",
    shortAnswer: "Reliability counters in the L2TP control message header ($N_s = \\text{sequence sent}$, $N_r = \\text{sequence expected}$) used to provide reliable delivery and retransmission over unreliable UDP transport.",
    explanation: "Unlike TCP, UDP does not guarantee packet delivery. L2TP implements its own sliding window retransmission layer for control signaling.",
    hint: "Sequence numbers built into L2TP so control setup messages don't get lost on UDP.",
    level: "Moderate",
    codeExample: `// L2TP Control Header:
// [ Flags: 0xC802 ] [ Length: 48 ] [ Tunnel ID: 12 ] [ Session ID: 5 ] [ Ns: 1 ] [ Nr: 2 ]`
  },
  {
    id: 13,
    question: "What is 'PPTP DoS Attack via TCP 1723 Reset Injection'?",
    shortAnswer: "Because PPTP's control channel on TCP port 1723 is unauthenticated and unencrypted, an on-path attacker can inject a spoofed TCP RST (Reset) packet with the correct sequence number, instantly tearing down active VPN tunnels.",
    explanation: "This allows attackers to disconnect remote executives or SCADA telemetry remotely with a single forged packet.",
    hint: "Forging a fake disconnect packet to kick users off their PPTP VPN connection.",
    level: "Moderate",
    codeExample: `// TCP RST Injection:
// Attacker sends TCP [RST, ACK] to Port 1723 ➔ PPTP daemon tears down GRE tunnel immediately!`
  },
  {
    id: 14,
    question: "What is 'SSTP' (Secure Socket Tunneling Protocol) and why was it introduced by Microsoft as a PPTP replacement?",
    shortAnswer: "A proprietary Microsoft protocol that tunnels PPP frames inside standard HTTPS / TLS 1.2 on TCP port 443, eliminating PPTP's GRE routing issues and providing strong AES encryption that traverses all firewalls.",
    explanation: "SSTP solved PPTP's security flaws and firewall blocks, but because it relies on TCP port 443, it suffers from the TCP-over-TCP meltdown phenomenon on lossy networks.",
    hint: "Microsoft's fix for PPTP that uses HTTPS port 443, though still vulnerable to TCP lag storms.",
    level: "Moderate",
    codeExample: `// SSTP Architecture:
// Client ──(HTTPS TLS 1.2 on TCP Port 443)──> Windows Server Routing & Remote Access (RRAS)`
  },
  {
    id: 15,
    question: "What is the 'PCI-DSS 4.0 Requirement' regarding PPTP and standalone L2TP?",
    shortAnswer: "PCI-DSS Requirement 4.2.1 strictly mandates the elimination of weak ciphers and protocols; using PPTP or standalone L2TP anywhere in a cardholder data environment results in immediate failure of compliance certification and heavy fines.",
    explanation: "Financial networks processing credit card data must deploy only modern AES-256-GCM encryption with MFA-authenticated IKEv2, WireGuard, or TLS 1.3.",
    hint: "Credit card security rules strictly ban PPTP and require modern AES-256 encryption.",
    level: "Basic",
    codeExample: `// PCI-DSS Compliance Audit Rule:
// IF vpn_protocol IN ['PPTP', 'L2TP_CLEARTEXT']: RESULT = FAIL_AUDIT(Severity: Critical)`
  },
  {
    id: 16,
    question: "What is 'MS-CHAPv2 Asirra / Challenge-Collision Flaw'?",
    shortAnswer: "An implementation bug where weak pseudo-random number generators on legacy Windows clients generated predictable 16-byte Peer Challenges, allowing attackers to perform replay and offline key derivation attacks with reduced computational complexity.",
    explanation: "Cryptographic protocols rely on high entropy. Predictable challenges undermine challenge-response authentication entirely.",
    hint: "Predictable random numbers in old Windows that made cracking passwords even faster.",
    level: "Expert",
    codeExample: `// Predictable Challenge Generation:
// Timestamp-derived PeerChallenge ➔ Predictable ➔ Halves rainbow table search space!`
  },
  {
    id: 17,
    question: "What is 'L2TP Hide AVP' (Attribute-Value Pair) in L2TP control messages?",
    shortAnswer: "A mechanism that encrypts sensitive control parameters (such as user passwords in proxy authentication) using MD5 and a shared secret key before placing them in the L2TP header.",
    explanation: "However, because Hide AVP relies on MD5 hashing, it is vulnerable to offline dictionary cracking if the shared secret is weak.",
    hint: "A feature that tried to scramble passwords inside L2TP using old MD5 math.",
    level: "Expert",
    codeExample: `// L2TP Hidden AVP Flag:
// AVP Header: Flag H=1 (Hidden) ➔ MD5(Secret + Sub-Attributes) XOR Plaintext`
  },
  {
    id: 18,
    question: "What is 'EAP-TLS over PPTP' and why did it fail to save PPTP from obsolescence?",
    shortAnswer: "Using X.509 certificate authentication (EAP-TLS) inside PPTP to replace broken MS-CHAPv2; it failed to save PPTP because the data channel still relied on flawed MPPE (RC4) encryption and un-routable GRE Protocol 47.",
    explanation: "Even with strong certificate authentication, the underlying RC4 cipher still lacked data integrity HMACs, and GRE remained blocked by modern firewalls.",
    hint: "Adding digital certificates to PPTP helped login security, but the data encryption remained broken.",
    level: "Moderate",
    codeExample: `// PPTP with EAP-TLS:
// Authentication: Secure (X.509) | Data Channel: INSECURE (RC4 MPPE with Zero HMAC)`
  },
  {
    id: 19,
    question: "What is 'PPTP Pass-Through' in consumer Wi-Fi routers?",
    shortAnswer: "A router firmware feature that inspects outgoing TCP port 1723 packets and dynamically creates state tracking tables to forward incoming GRE (Protocol 47) packets to the correct internal LAN IP address.",
    explanation: "Because GRE has no port numbers, routers without PPTP Pass-Through drop all return VPN traffic. Disabling PPTP Pass-Through is a recommended best practice today.",
    hint: "A router setting that helped old PPTP work through home Wi-Fi; recommended to turn OFF today.",
    level: "Basic",
    codeExample: `// Router Security Best Practice:
// PPTP Pass-Through: [DISABLED] (Prevents employees from using broken legacy VPNs)`
  },
  {
    id: 20,
    question: "How do perimeter firewalls detect and block unauthorized PPTP and standalone L2TP traffic?",
    shortAnswer: "By configuring firewall egress rules to block outbound TCP Port 1723, block IP Protocol 47 (GRE), and inspect UDP Port 1701 for unencrypted L2TP signatures using Deep Packet Inspection (DPI).",
    explanation: "Blocking these ports ensures that shadow IT departments or legacy devices cannot create vulnerable cleartext tunnels out of corporate networks.",
    hint: "Blocking TCP 1723, GRE Protocol 47, and UDP 1701 at the corporate firewall.",
    level: "Moderate",
    codeExample: `// Enterprise Firewall Rules:
// drop tcp any any → any 1723 (Block PPTP Control)
// drop ip  any any → any 47   (Block GRE Data)
// drop udp any any → any 1701 (Block Standalone L2TP)`
  },
  {
    id: 21,
    question: "What is 'Chap-Secrets File' in legacy Linux pppd / pptpd daemons?",
    shortAnswer: "A plaintext configuration file (`/etc/ppp/chap-secrets`) storing user accounts, client passwords, and assigned IP addresses in unencrypted ASCII text; if compromised, all VPN credentials are exposed immediately.",
    explanation: "Modern VPNs use hashed authentication databases or external SAML 2.0 / RADIUS servers rather than storing raw passwords in local text files.",
    hint: "A dangerous old Linux text file that held everyone's VPN passwords in plain cleartext.",
    level: "Basic",
    codeExample: `// Insecure chap-secrets File:
// # Client      Server    Secret          IP Addresses
// debangshu     pptpd     Password2026!   10.0.0.10 (Plaintext password on disk!)`
  },
  {
    id: 22,
    question: "What is 'MPPE Stateless vs Stateful Mode' and why did stateless mode degrade RC4 security further?",
    shortAnswer: "Stateless mode re-seeds the RC4 cipher key with a fresh hash for every single packet, generating frequent short-lived keystreams that make RC4 initial-keystream bias attacks (Fluhrer-Mantin-Shamir) significantly easier to exploit.",
    explanation: "RC4 is notorious for weak initial keystream bytes. Changing keys on every packet exposed these weak bytes continuously across millions of packets.",
    hint: "Resetting the encryption key every packet accidentally exposed mathematical flaws in RC4.",
    level: "Expert",
    codeExample: `// RC4 Key Re-seeding Bias:
// Packet N ➔ Hash(MasterKey + Seq) ➔ First 256 bytes of RC4 keystream leak statistical biases!`
  },
  {
    id: 23,
    question: "What is 'L2TP Pseudo-Wire Emulation Edge-to-Edge (PWE3)'?",
    shortAnswer: "An IETF standard (RFC 3985) using L2TPv3 to tunnel telecommunications Layer 2 services (such as ATM, Frame Relay, and Ethernet VLANs) across an IP packet-switched network without requiring costly physical leased lines.",
    explanation: "While legacy L2TPv2 was used for dial-up user access, L2TPv3 is used by telecommunications carriers to interconnect service provider backbones.",
    hint: "An advanced carrier version of L2TP used by telecom companies to connect telecom switches.",
    level: "Expert",
    codeExample: `// L2TPv3 PWE3 Configuration:
// pseudowire-class ETH_OVER_IP
//  encapsulation l2tpv3`
  },
  {
    id: 24,
    question: "What is 'PPTP Password Hash Extraction from Pcap Files' using Wireshark & Chapcrack?",
    shortAnswer: "Extracting the 16-byte Peer Challenge, 16-byte Authenticator Challenge, and 24-byte Response from an intercepted MS-CHAPv2 packet capture, and converting them into a format ready for GPU/FPGA cracking clusters.",
    explanation: "Security tools (like `chapcrack`) automate the extraction of these values from PCAP files in less than 2 seconds, allowing penetration testers to demonstrate password compromise.",
    hint: "Using a tool to pull the challenge-response hash out of a packet capture in 2 seconds.",
    level: "Moderate",
    codeExample: `// Extracting Hash with Chapcrack:
// chapcrack parse -p capture.pcap ➔ Outputs: MS-CHAPv2 Hash String ➔ Submit to Hashcat!`
  },
  {
    id: 25,
    question: "What is the statutory CERT-In requirement regarding 'Legacy VPN Protocol Decommissioning' in India?",
    shortAnswer: "Indian cybersecurity directives and the DPDP Act 2023 mandate the immediate deprecation and removal of broken cryptographic protocols (PPTP, DES, 3DES, standalone L2TP, MD5, SHA-1) from all critical information infrastructure, enforcing modern AEAD suites with 180-day logging.",
    explanation: "Organizations operating legacy protocols face statutory non-compliance penalties and liability if compromised during data breach investigations.",
    hint: "Indian law requires immediate removal of old broken VPN protocols like PPTP and plain L2TP.",
    level: "Basic",
    codeExample: `// CERT-In Protocol Compliance Audit:
const certInProtocolAudit = {
  timestamp: "2026-08-23T14:40:00.380Z",
  auditTarget: "Barrackpore Municipal Core Gateway",
  pptpStatus: "DECOMMISSIONED_AND_BLOCKED",
  l2tpStatus: "ENFORCED_WITH_IPSEC_AES256",
  wireguardStatus: "ACTIVE_PRIMARY",
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is the recommended migration path for an organization currently relying on legacy PPTP?",
    shortAnswer: "1. Audit and discover all active PPTP endpoints; 2. Deploy in-kernel WireGuard or IKEv2 IPsec gateways; 3. Distribute modern configuration profiles with MFA; 4. Block TCP 1723 and GRE 47 at perimeter firewalls; 5. Decommission legacy PPTP servers.",
    explanation: "A structured phased migration ensures zero business disruption while permanently eliminating critical cryptographic vulnerabilities.",
    hint: "Discover old users, install WireGuard, update devices, block port 1723 at the firewall, and shut down PPTP.",
    level: "Moderate",
    codeExample: `// 5-Step Migration Blueprint:
// Phase 1: Discover ➔ Phase 2: Deploy WireGuard/IKEv2 ➔ Phase 3: Rollout MFA ➔ Phase 4: Block Port 1723 ➔ Phase 5: Decommission`
  },
  {
    id: 27,
    question: "What is 'CVE-2002-1626' (PPTP Buffer Overflow Vulnerability) in legacy PoPToP servers?",
    shortAnswer: "A critical remote code execution vulnerability in early Linux `pptpd` daemons where malformed GRE packet lengths overwrote stack memory buffers, allowing unauthenticated remote attackers to gain root shell access.",
    explanation: "This historical vulnerability highlighted the severe security risks of running complex userspace C daemons exposed directly to the public internet.",
    hint: "An old security bug in Linux PPTP servers that let hackers take complete control of the server.",
    level: "Expert",
    codeExample: `// Buffer Overflow Exploit:
// Malformed GRE Header [Length: 0xFFFF] ➔ Overwrites return address ➔ Root Shell Executed!`
  },
  {
    id: 28,
    question: "What is 'IPsec Pre-Shared Key (PSK) Vulnerability' in legacy L2TP/IPsec deployments?",
    shortAnswer: "Many organizations share a single static, generic PSK (e.g. `cisco123`) across thousands of employees for L2TP/IPsec; any employee who knows the PSK can perform Man-in-the-Middle decryption of other employees' sessions.",
    explanation: "To eliminate this risk, modern deployments replace shared PSKs with unique machine X.509 PKI certificates or migrate to WireGuard with individual public keys.",
    hint: "Using one shared company password for all workers lets employees spy on each other.",
    level: "Moderate",
    codeExample: `// Shared PSK Hazard:
// PSK="CorporateSecret2026" shared with 500 users ➔ Any user can decrypt all colleagues' traffic!`
  },
  {
    id: 29,
    question: "How does WireGuard's 32-byte header overhead compare to L2TP/IPsec's 76-byte overhead?",
    shortAnswer: "WireGuard adds only 32 bytes of single-layer overhead, whereas L2TP/IPsec adds 76+ bytes due to triple-layer encapsulation (IP + ESP + UDP + L2TP + PPP), saving 44 bytes per packet and boosting usable throughput by ~6%.",
    explanation: "This dramatic reduction in overhead eliminates MTU fragmentation issues and maximizes payload capacity on cellular and broadband connections.",
    hint: "WireGuard is less than half the size of L2TP/IPsec, saving bandwidth and stopping lag.",
    level: "Basic",
    codeExample: `// Overhead Comparison:
// WireGuard Overhead : 32 Bytes (Lightweight single-layer)
// L2TP/IPsec Overhead: 76 - 92 Bytes (Complex triple-layer encapsulation)`
  },
  {
    id: 30,
    question: "Synthesize the engineering verdict on PPTP and L2TP in modern enterprise network security.",
    shortAnswer: "PPTP is mathematically broken and must be immediately decommissioned and blocked at perimeter firewalls; standalone L2TP is completely insecure due to zero native encryption; L2TP/IPsec is obsolete and heavy. All modern enterprise deployments must standardize on in-kernel WireGuard, IKEv2 IPsec ESP with AES-256-GCM, or Clientless WebVPN—operating in full compliance with CERT-In directives and the DPDP Act 2023.",
    explanation: "Legacy protocols from the dial-up era have no place in a modern threat landscape. Migrating to modern cryptographic suites ensures line-rate speed, mathematical security, and flawless regulatory compliance.",
    hint: "Permanently kill PPTP and plain L2TP; replace them with fast WireGuard and modern IPsec IKEv2.",
    level: "Moderate",
    codeExample: `// The Final Legacy Protocol Verdict:
// PPTP            ➔ [DEAD & FORBIDDEN] (Blocked at Firewall)
// L2TP Standalone ➔ [DEAD & INSECURE] (Zero Encryption)
// L2TP/IPsec      ➔ [OBSOLETE] (Migrate to WireGuard / IKEv2)
// Modern Standard ➔ [WireGuard / IKEv2 IPsec / TLS 1.3 WebVPN]`
  }
];

export default questions;
