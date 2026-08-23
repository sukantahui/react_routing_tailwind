const questions = [
  {
    id: 1,
    question: "How do network security protocols map across the different layers of the OSI 7-Layer Reference Model?",
    shortAnswer: "Layer 7 (Application): HTTPS, SSH, S/MIME, DNSSEC; Layer 4 (Transport): TLS 1.3, DTLS; Layer 3 (Network): IPsec (AH/ESP), WireGuard; Layer 2 (Data Link): MACsec (802.1AE), 802.1X; Layer 1 (Physical): Optical OTN Bitstream Encryption.",
    explanation: "Security can be implemented at any layer of the network stack. Higher layers (Application/Transport) provide application-specific authentication and granular data protection, while lower layers (Network/Data Link) provide universal, transparent encryption for all traffic without requiring application modifications.",
    hint: "Think about where protocols sit: HTTPS is at the top (Layer 7), IPsec is in the middle (Layer 3), and MACsec is at the switch link (Layer 2).",
    level: "Basic",
    codeExample: `// OSI Security Protocol Hierarchy:
// [Layer 7: Application] ➔ HTTPS, SSH, S/MIME, DNSSEC, PGP
// [Layer 4: Transport  ] ➔ TLS 1.3 (TCP), DTLS (UDP)
// [Layer 3: Network    ] ➔ IPsec ESP / AH, IKEv2, WireGuard
// [Layer 2: Data Link  ] ➔ MACsec (IEEE 802.1AE), 802.1X, WPA3`
  },
  {
    id: 2,
    question: "What is the fundamental architectural trade-off between Application-Layer Security (HTTPS/SSH) and Network-Layer Security (IPsec)?",
    shortAnswer: "Application-layer security understands user identity, URLs, and specific data payloads but requires per-application implementation; Network-layer security transparently encrypts all IP packets across all applications but lacks user identity and payload awareness.",
    explanation: "With HTTPS (Layer 7), a web application can inspect cookies, enforce role-based access, and decrypt only authorized transactions. With IPsec (Layer 3), the encryption operates inside the OS kernel, automatically protecting all TCP, UDP, and ICMP traffic between two hosts without changing a single line of application code.",
    hint: "Application layer knows who you are and what webpage you requested; Network layer just encrypts all packets between two computers.",
    level: "Basic",
    codeExample: `// Application Layer vs Network Layer:
// Layer 7 (HTTPS): Encrypts HTTP requests (Aware of GET /api/v1/payroll, cookies, user sessions)
// Layer 3 (IPsec): Encrypts IP packets (Blind to payload contents; sees only 10.14.0.5 -> 10.14.0.88)`
  },
  {
    id: 3,
    question: "What are the Five Fundamental Cryptographic Security Services provided by network protocols?",
    shortAnswer: "1. Confidentiality (Privacy); 2. Integrity (Tamper Proofing); 3. Authentication (Identity Verification); 4. Non-Repudiation (Undeniable Proof of Origin); 5. Anti-Replay Protection (Duplicate Prevention).",
    explanation: "Confidentiality uses symmetric ciphers (AES-GCM); Integrity uses cryptographic hashes/MACs (HMAC-SHA256, Poly1305); Authentication uses digital certificates (X.509) or pre-shared keys; Non-Repudiation uses asymmetric digital signatures (RSA/ECDSA); and Anti-Replay uses monotonically increasing sequence numbers.",
    hint: "Confidentiality, Integrity, Authentication, Non-Repudiation, and Anti-Replay.",
    level: "Basic",
    codeExample: `// Five Security Services in TLS 1.3:
// 1. Confidentiality : AES-256-GCM / ChaCha20-Poly1305
// 2. Integrity       : AEAD Auth Tag / Poly1305
// 3. Authentication  : X.509 PKI Certificates (RSA / ECDSA)
// 4. Non-Repudiation : Digital Signatures during Handshake
// 5. Anti-Replay     : Unique TLS Record Sequence Counters`
  },
  {
    id: 4,
    question: "Why cannot standard TLS (Transport Layer Security) directly protect real-time UDP applications, and how does 'DTLS' solve this?",
    shortAnswer: "Standard TLS assumes a reliable, in-order transport layer (TCP); because UDP packets can arrive out-of-order or drop, TLS cryptographic state machines break; Datagram TLS (DTLS) adds explicit sequence numbers and retransmission timers to handle UDP loss.",
    explanation: "TLS record layer cryptography depends on sequential record counters to compute MACs and prevent replay. If an underlying UDP packet drops, TLS loses synchronization. DTLS (RFC 6347 / RFC 9147) adapts TLS for datagrams by adding epoch counters and sliding replay windows, enabling low-latency encryption for VoIP, WebRTC, and IoT.",
    hint: "TLS requires TCP's reliability; DTLS modifies TLS so it works over fast, unreliable UDP packets.",
    level: "Moderate",
    codeExample: `// TLS vs DTLS Transport:
// HTTPS Web Browsing ➔ TLS 1.3 over TCP Port 443 (Reliable Byte Stream)
// WebRTC Video / IoT ➔ DTLS 1.3 over UDP Port 5004 (Real-Time Datagram Stream)`
  },
  {
    id: 5,
    question: "What is 'IEEE 802.1AE MACsec' and why is it deployed inside enterprise datacenters at Layer 2?",
    shortAnswer: "MACsec provides line-rate hardware encryption and integrity for all Ethernet frames across physical switch-to-switch and host-to-switch links, protecting against physical fiber taps and rogue network sniffers.",
    explanation: "While IPsec and TLS protect routed internet traffic, MACsec secures the local Data Link layer (Layer 2). Implemented directly inside switch ASIC hardware, MACsec encrypts raw Ethernet frames with zero CPU overhead, ensuring that even if an attacker physically taps an optical fiber cable between two datacenter racks, they capture only encrypted gibberish.",
    hint: "Hardware-level Ethernet cable encryption running directly inside network switches.",
    level: "Moderate",
    codeExample: `// MACsec Frame Structure:
// [ Destination MAC ] + [ Source MAC ] + [ SecTAG Header (16B) ] + [ Encrypted Payload ] + [ ICV Tag (16B) ]`
  },
  {
    id: 6,
    question: "Why does 'IPsec Authentication Header' (AH) fail when crossing Network Address Translation (NAT) routers?",
    shortAnswer: "IPsec AH calculates its cryptographic integrity hash (ICV) over the entire IP packet, including immutable fields in the outer IP header (Source and Destination IP); when a NAT router modifies the IP address, the receiver's AH hash verification fails and the packet is dropped.",
    explanation: "AH was designed before NAT became ubiquitous. Because NAT alters the source or destination IP in transit, the cryptographic checksum computed by the sender no longer matches at the receiver. Consequently, modern networks use IPsec ESP (Encapsulating Security Payload) with NAT-Traversal (UDP 4500) instead.",
    hint: "AH calculates a checksum on the envelope address; when the post office stamps a new return address (NAT), the checksum breaks.",
    level: "Expert",
    codeExample: `// IPsec AH vs NAT Failure:
// Sender creates AH ICV covering IP Header (192.168.1.5 -> 10.0.0.1)
// NAT Router translates Source IP to 203.0.113.10
// Receiver re-calculates AH ICV ➔ CHECKSUM MISMATCH ➔ PACKET DROPPED!`
  },
  {
    id: 7,
    question: "How does 'DNSSEC' (Domain Name System Security Extensions) provide security at Layer 7 without encrypting DNS queries?",
    shortAnswer: "DNSSEC provides cryptographic Integrity and Authenticity (via asymmetric digital signatures and a hierarchical chain of trust from the Root DNS zone), ensuring DNS responses cannot be spoofed or poisoned, even though queries remain plaintext.",
    explanation: "DNSSEC does not provide confidentiality (anyone can still see what domain you requested). Instead, it prevents Cache Poisoning and DNS Spoofing attacks: the DNS server signs its resource records with private keys (RRSIG records), and client resolvers verify the signature against public DNSKEY records anchored at the root zone.",
    hint: "DNSSEC stamps a verified wax seal on the address book entry so no one can forge fake website IP addresses.",
    level: "Moderate",
    codeExample: `// DNSSEC Resource Records:
// RRSIG  : Digital signature for the DNS record set (e.g., A record)
// DNSKEY : Public key used to verify the RRSIG signature
// DS     : Delegation Signer hash in parent zone linking trust chain`
  },
  {
    id: 8,
    question: "What is the difference between 'End-to-End Encryption' (E2EE) and 'Hop-by-Hop Link Encryption' across the OSI stack?",
    shortAnswer: "End-to-End Encryption (Layers 4–7, like TLS or Signal) encrypts data from the original client process all the way to the destination server; Hop-by-Hop Encryption (Layers 1–2, like MACsec or Optical OTN) decrypts and re-encrypts data at every intermediate router or switch.",
    explanation: "With Hop-by-Hop link encryption, data is plaintext in router memory at every intermediate network hop, leaving it vulnerable to compromised routers or rogue administrators. End-to-End encryption ensures that intermediate ISPs, routers, and switches see only encrypted ciphertext from start to finish.",
    hint: "End-to-end is a locked safe delivered directly to the recipient; Hop-by-hop opens and relocks the package at every post office.",
    level: "Basic",
    codeExample: `// E2EE vs Hop-by-Hop:
// End-to-End (TLS) : [Client] ──(Encrypted All The Way)──> [Intermediate Routers (Blind)] ──> [Server (Decrypts)]
// Hop-by-Hop (MACsec): [Switch 1] ──(Encrypted)──> [Switch 2 (Plaintext in RAM!)] ──(Encrypted)──> [Switch 3]`
  },
  {
    id: 9,
    question: "How does 'Mutual TLS' (mTLS) provide two-way identity authentication at Layer 4/7 for Zero Trust microservices?",
    shortAnswer: "Standard TLS only authenticates the server to the client (via server certificate); Mutual TLS requires both the server AND the client to present and verify X.509 digital certificates before establishing the encrypted connection.",
    explanation: "In enterprise API architectures (such as Kubernetes service meshes), mTLS ensures that microservice A verifies the identity of microservice B, and microservice B verifies microservice A. This prevents rogue containers from making unauthorized API calls even if they are inside the same cluster.",
    hint: "Both the customer and the bank show their ID badges to each other before starting the transaction.",
    level: "Moderate",
    codeExample: `// Mutual TLS Handshake Flow:
// 1. Client connects ➔ Server sends Server Certificate (Client verifies Server ID)
// 2. Server requests Client Certificate ➔ Client sends Client Certificate (Server verifies Client ID)
// 3. Both sides derive session keys ➔ Encrypted mTLS tunnel active!`
  },
  {
    id: 10,
    question: "What is 'S/MIME' (Secure/Multipurpose Internet Mail Extensions) and how does it secure email communication at Layer 7?",
    shortAnswer: "S/MIME provides end-to-end cryptographic encryption and digital signing for email messages using asymmetric X.509 certificates issued by trusted Certificate Authorities.",
    explanation: "Standard SMTP transmits emails in cleartext across intermediate mail transfer agents (MTAs). S/MIME encrypts the email body and attachments on the sender's computer (Confidentiality) and digitally signs the message with the sender's private key (Authentication and Non-Repudiation).",
    hint: "Sealing an email inside a cryptographic envelope and signing it with a digital wax seal before sending.",
    level: "Moderate",
    codeExample: `// S/MIME Email Features:
// 1. Digital Signature : Verifies sender (e.g., 'mamata@barrackpore.gov.in') cannot be spoofed.
// 2. Message Encryption: Encrypted with recipient's public key (Only recipient's private key can read it).`
  },
  {
    id: 11,
    question: "How does 'SSH v2' (Secure Shell) divide its architecture into three distinct layers?",
    shortAnswer: "1. SSH Transport Layer Protocol (Confidentiality, server authentication, and forward secrecy); 2. SSH User Authentication Protocol (Client authentication via public key or password); 3. SSH Connection Protocol (Multiplexing channels, interactive shells, SFTP, and port forwarding).",
    explanation: "RFC 4251 specifies a modular 3-tier architecture. The Transport layer establishes a secure encrypted channel; the Authentication layer verifies who the user is; and the Connection layer manages multiple logical sessions (such as simultaneous interactive terminal and dynamic SOCKS port forwarding) over a single TCP socket.",
    hint: "Transport layer creates the secure pipe, Auth layer checks your password/key, and Connection layer opens your terminal and file transfers.",
    level: "Expert",
    codeExample: `// SSH v2 Modular Stack:
// [SSH Connection Protocol (RFC 4254)   ] ➔ Shells, SFTP, X11, Port Forwarding
// [SSH User Authentication (RFC 4252)   ] ➔ Public Key, Password, Host-Based Auth
// [SSH Transport Layer Protocol (RFC 4253)] ➔ Key Exchange (ECDH), Ciphers (AES/ChaCha20), MACs`
  },
  {
    id: 12,
    question: "What is 'Physical Layer (Layer 1) Encryption' and where is it used in high-assurance government networks?",
    shortAnswer: "Bulk bitstream encryption performed directly inside optical transceivers on Dense Wavelength Division Multiplexing (DWDM) fiber optic lines, encrypting 100% of physical bits with zero latency.",
    explanation: "Layer 1 optical encryption operates beneath Ethernet and IP framing. Every single binary bit transmitted over the fiber cable is encrypted at 100 Gbps to 800 Gbps line rates with sub-microsecond latency, protecting submarine fiber cables and inter-datacenter links against physical laser splitting and wiretap espionage.",
    hint: "Encrypting the actual flashes of light traveling through fiber optic cables.",
    level: "Expert",
    codeExample: `// Layer 1 Optical OTN Encryption:
// [Optical Transceiver (DWDM)] ──(AES-256 Bitstream Encryption on 100G Lambda)──> [Submarine Fiber Cable]`
  },
  {
    id: 13,
    question: "How does 'Non-Repudiation' protect financial transactions in banking systems across West Bengal?",
    shortAnswer: "By generating a digital signature using the signer's private key over a cryptographic hash of the transaction data; because only the signer possesses that unique private key, they cannot later deny authoring the transaction.",
    explanation: "If an accountant (Susmita) authorizes a ₹50 Lakh treasury disbursement, the software signs the transaction hash with Susmita's private key on a FIPS-certified smart card. In any legal dispute, the public key mathematically proves that only Susmita's private key could have produced that signature.",
    hint: "A digital signature that legally proves who signed the document, making it impossible to say 'it wasn't me'.",
    level: "Basic",
    codeExample: `// Non-Repudiation Signing Formula:
// Transaction Data: "Disburse ₹50,00,000 to Barrackpore Urban Project"
// Signature = Encrypt_Private_Key(SHA256(Transaction_Data))
// Anyone can verify using Susmita's Public Key, but ONLY Susmita could create the signature!`
  },
  {
    id: 14,
    question: "What is an 'Anti-Replay Window' in IPsec and TLS and how does it prevent duplicate transaction injection?",
    shortAnswer: "A sliding sequence counter tracked by the receiver; any packet carrying a sequence number lower than the window threshold or matching an already-received sequence number is immediately dropped as a duplicate replay attack.",
    explanation: "Adversaries can record valid encrypted bank transfers and retransmit them thousands of times. Because the packets are validly encrypted, standard decryption would succeed. Anti-replay sequence counters ensure that every encrypted frame is accepted exactly once and old packets are discarded.",
    hint: "A ticket punch machine that ensures each numbered ticket can only be used once at the turnstile.",
    level: "Moderate",
    codeExample: `// Anti-Replay Sliding Window (64-Packet Window):
// Packet Seq 105 Arrives ➔ Mark bit 105 as received (Valid)
// Adversary replays Packet Seq 105 ➔ Already marked in bitmask ➔ DROPPED AS REPLAY ATTACK!`
  },
  {
    id: 15,
    question: "What are the header overhead differences across OSI security protocols (Layer 2 vs Layer 3 vs Layer 4 vs Layer 7)?",
    shortAnswer: "Layer 2 MACsec: 32 Bytes; Layer 3 IPsec ESP: 56–70 Bytes; Layer 4 TLS 1.3 Record: 21 Bytes; Layer 7 HTTPS / S/MIME: 29–100+ Bytes.",
    explanation: "Lower-layer protocols (like MACsec) add minimal fixed headers (32B) for high-speed hardware processing. Transport-layer TLS adds ~21B record framing. IPsec ESP in tunnel mode adds full outer IP headers and trailers (~60B). Cumulative multi-tier encapsulation must be tracked to prevent MTU fragmentation.",
    hint: "Every layer adds its own small security fee in bytes; stacking multiple layers expands the packet size.",
    level: "Moderate",
    codeExample: `// Overhead Comparison:
// Layer 2 MACsec (802.1AE) : 32 Bytes
// Layer 3 IPsec ESP Tunnel : 60 Bytes
// Layer 4 TLS 1.3 Record   : 21 Bytes
// Layer 7 S/MIME Envelope  : Variable (100+ Bytes)`
  },
  {
    id: 16,
    question: "What is 'Encrypted Client Hello' (ECH) in modern TLS 1.3 and what privacy gap does it solve?",
    shortAnswer: "ECH encrypts the Server Name Indication (SNI) extension during the initial TLS handshake, preventing local ISPs and network sniffers from seeing which specific website domain the user is visiting.",
    explanation: "In legacy TLS 1.2 and standard TLS 1.3, the initial `ClientHello` message contains the domain name (SNI) in unencrypted plaintext so intermediate load balancers can route the connection. ECH uses a public key published in DNS (HTTPS/SVCB records) to encrypt the SNI, closing the last cleartext metadata leak in web browsing.",
    hint: "Hiding the destination address written on the outside of the envelope so your internet provider cannot see what website you are visiting.",
    level: "Expert",
    codeExample: `// TLS 1.3 ECH Mechanism:
// Standard TLS : Client sends SNI "bank-treasury.internal" in CLEARTEXT! (ISP sees visited domain)
// TLS with ECH  : Client encrypts ClientHello using DoH public key ➔ ISP sees only "cloudflare.net" (100% Private)`
  },
  {
    id: 17,
    question: "How does 'WPA3-Enterprise' secure wireless local area networks (WLAN) at Layer 2?",
    shortAnswer: "By utilizing 192-bit cryptographic algorithms (CNSA Suite: AES-256-GCM, SHA-384, ECDH P-384) with IEEE 802.1X EAP-TLS certificate authentication and Protected Management Frames (PMF).",
    explanation: "Unlike home Wi-Fi with shared passwords (WPA3-Personal), WPA3-Enterprise authenticates each client individually using X.509 digital certificates against a RADIUS server. Protected Management Frames (PMF) prevent deauthentication attacks and rogue access point spoofing.",
    hint: "Enterprise Wi-Fi where every laptop connects using its own digital security certificate instead of a shared Wi-Fi password.",
    level: "Moderate",
    codeExample: `// WPA3-Enterprise 192-bit Security Suite:
// Authentication : EAP-TLS with Elliptic Curve P-384 Certificates
// Encryption     : AES-256-GCM (Authenticated Encryption)
// Integrity      : HMAC-SHA-384
// Protection     : IEEE 802.11w Protected Management Frames (Mandatory)`
  },
  {
    id: 18,
    question: "What is a 'Protocol Downgrade Attack' and how do modern protocols like TLS 1.3 prevent it?",
    shortAnswer: "An active Man-in-the-Middle attack where an adversary alters handshake packets to force communicating peers to negotiate an obsolete, insecure protocol version (like SSL 3.0 or TLS 1.0); prevented via cryptographic handshake signature digests and HSTS.",
    explanation: "In attacks like POODLE, adversaries modified `ClientHello` packets to trick servers into falling back to broken SSL 3.0 ciphers. TLS 1.3 embeds a cryptographic hash of all previous handshake messages into the `Finished` verification message, causing the connection to fail immediately if any version or cipher was tampered with.",
    hint: "An attacker trying to force two people to speak in an old broken code that the attacker already knows how to crack.",
    level: "Moderate",
    codeExample: `// Downgrade Prevention in TLS:
// If Server falls back to TLS 1.2 due to client probe, it embeds a magic sentinel value in ServerHello.random:
// "DOWNGRD\x01" ➔ Client detects tampering and TERMINATES CONNECTION INSTANTLY!`
  },
  {
    id: 19,
    question: "How does 'Defense-in-Depth' combine Layer 2, Layer 3, and Layer 7 security protocols in government infrastructure?",
    shortAnswer: "By stacking MACsec (Layer 2) on internal switch links, IPsec (Layer 3) across WAN gateways, and HTTPS/mTLS (Layer 7) on application APIs, ensuring that the failure or compromise of any single layer does not breach the data.",
    explanation: "If an adversary compromises an edge router (bypassing Layer 3 IPsec), the application payload remains protected by Layer 7 HTTPS. If an attacker exploits an application vulnerability, Layer 3 IPsec segmentation prevents lateral movement to other subnets.",
    hint: "Wearing a helmet, a seatbelt, and having an airbag: three independent layers protecting you at once.",
    level: "Basic",
    codeExample: `// Multi-Tier Defense Stack:
// [User Browser] ──(Layer 7: HTTPS mTLS)──> [Application Logic]
//        │
//        ▼
// [OS Kernel  ] ──(Layer 3: IPsec ESP )──> [Gateway Encapsulation]
//        │
//        ▼
// [Switch Port] ──(Layer 2: MACsec    )──> [Physical Wire Encryption]`
  },
  {
    id: 20,
    question: "Why is 'HTTP Strict Transport Security' (HSTS) critical for enforcing Layer 7 HTTPS encryption?",
    shortAnswer: "HSTS is a web server response header that instructs browsers to NEVER load the site over unencrypted HTTP and to automatically upgrade all requests to HTTPS for a specified duration (e.g., 1 year).",
    explanation: "Without HSTS, attackers on public Wi-Fi can execute SSL Stripping attacks (like `sslstrip`), intercepting the initial unencrypted `http://` request and serving cleartext pages to the user. With HSTS and HSTS Preloading, browsers refuse to connect over cleartext HTTP under any circumstances.",
    hint: "A permanent browser rule telling your computer: 'Never open this bank website without HTTPS encryption.'",
    level: "Basic",
    codeExample: `// HSTS Server Response Header:
// Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  },
  {
    id: 21,
    question: "How do 'SmartNICs' and 'Hardware Crypto Engines' accelerate Multi-Layer OSI security protocols?",
    shortAnswer: "Dedicated PCIe Smart Network Interface Cards contain specialized cryptographic ASIC/FPGA processors that offload AES-GCM encryption, TCP checksums, and IPsec/TLS encapsulation entirely from the host CPU.",
    explanation: "Encrypting 100 Gbps of network traffic in software consumes dozens of CPU cores. SmartNICs (like NVIDIA BlueField or Intel IPU) process IPsec, TLS, and MACsec at wire speed in hardware, freeing host CPUs for database and business logic.",
    hint: "A dedicated math processor built into the network card that encrypts packets at lightning speed.",
    level: "Moderate",
    codeExample: `// SmartNIC Crypto Offload:
// Host CPU transfers raw packet ➔ SmartNIC hardware ASIC encrypts AES-256-GCM at 100 Gbps with 0% CPU usage!`
  },
  {
    id: 22,
    question: "What is 'PGP/GPG' (Pretty Good Privacy) and how does its 'Web of Trust' differ from S/MIME PKI?",
    shortAnswer: "PGP uses a decentralized 'Web of Trust' where individual users sign each other's public keys without relying on a centralized Certificate Authority (CA); S/MIME relies on hierarchical X.509 CAs.",
    explanation: "S/MIME is preferred in corporate enterprises because IT can centrally issue and revoke certificates. PGP/GPG is popular in open-source and privacy communities because users independently validate public key fingerprints through key signing parties and decentralized keyservers.",
    hint: "S/MIME uses official government-issued passports (CAs); PGP uses personal peer recommendations (Web of Trust).",
    level: "Moderate",
    codeExample: `// PGP Key Fingerprint Verification:
$ gpg --fingerprint debangshu@barrackpore-hub.gov.in
// Key fingerprint = 4A1F 89BC 3D5E 77FA 9012  5566 AABB CCDD EEFF 1234`
  },
  {
    id: 23,
    question: "How does an 'ARP Poisoning / Spoofing' attack operate at Layer 2 and how does 'Dynamic ARP Inspection' (DAI) mitigate it?",
    shortAnswer: "An attacker sends forged ARP replies associating their MAC address with the default gateway's IP, intercepting all local traffic; DAI validates ARP packets against the DHCP Snooping database and drops forged replies.",
    explanation: "At Layer 2, Ethernet hosts rely on ARP to map IP addresses to MAC addresses. Because standard ARP is unauthenticated, attackers can claim any IP. Managed enterprise switches use Dynamic ARP Inspection (DAI) to verify that the MAC-to-IP binding matches the authorized DHCP lease table before forwarding ARP frames.",
    hint: "An attacker lying about who owns an IP address; the switch checks its official registry to catch and block the liar.",
    level: "Moderate",
    codeExample: `// Cisco Switch Dynamic ARP Inspection (DAI) Config:
// ip dhcp snooping
// ip dhcp snooping vlan 100
// ip arp inspection vlan 100`
  },
  {
    id: 24,
    question: "What is 'Kerberos' and at which OSI layers does it provide single sign-on authentication?",
    shortAnswer: "Kerberos operates at the Application/Session layer (Layer 5–7), utilizing symmetric-key ticket-granting cryptography (Key Distribution Center [KDC]) to provide secure, single sign-on authentication across Microsoft Active Directory networks.",
    explanation: "Kerberos eliminates the need to transmit passwords over the network. Users authenticate once to the Authentication Server (AS), receive a Ticket Granting Ticket (TGT), and present service tickets to enterprise file shares, databases, and web servers without re-entering credentials.",
    hint: "Buying a festival admission wristband at the front gate that lets you enter any ride inside without paying again.",
    level: "Moderate",
    codeExample: `// Kerberos Ticket Exchange:
// 1. Client ➔ AS_REQ ➔ KDC returns Ticket Granting Ticket (TGT)
// 2. Client ➔ TGS_REQ with TGT ➔ KDC returns Service Ticket for 'cifs/fileserver.internal'
// 3. Client presents Service Ticket to File Server ➔ ACCESS GRANTED!`
  },
  {
    id: 25,
    question: "How does 'Quantum Key Distribution' (QKD - BB84 Protocol) provide physical-layer security based on quantum physics?",
    shortAnswer: "QKD transmits cryptographic key bits encoded in the polarization states of single photons over fiber cables; Heisenberg's Uncertainty Principle guarantees that any eavesdropping alters photon states, instantly alerting communicating parties.",
    explanation: "Unlike mathematical encryption (which relies on computational complexity), QKD relies on the fundamental laws of physics. If an adversary attempts to measure or intercept the quantum photon stream, the quantum state collapses, introducing detectable transmission errors and aborting key generation.",
    hint: "Using particles of light to share keys; if an eavesdropper looks at the light, the physics alters and catches them immediately.",
    level: "Expert",
    codeExample: `// QKD BB84 Protocol:
// Alice sends single photons with random polarization (Horizontal/Vertical, Diagonal)
// Bob measures with random basis filters ➔ Alice & Bob compare basis choices over public channel
// If Error Rate > 11% ➔ EAVESDROPPER DETECTED! Key discarded.`
  },
  {
    id: 26,
    question: "What is 'BGP Hijacking' at Layer 3 and how does 'RPKI' (Resource Public Key Infrastructure) protect routing tables?",
    shortAnswer: "A malicious network announces unauthorized IP prefix routes via BGP, diverting global internet traffic through rogue routers; RPKI uses cryptographically signed Route Origin Authorizations (ROAs) to validate route announcements.",
    explanation: "BGP historically relied on implicit trust between autonomous systems (ASNs). In BGP hijacking, an attacker broadcasts false routes for corporate IP blocks, intercepting unencrypted traffic. RPKI validates that the advertising ASN is cryptographically authorized by Regional Internet Registries (like APNIC) to announce that prefix.",
    hint: "Rogue road signs diverting traffic down a dangerous detour; RPKI cryptographically verifies every official road sign.",
    level: "Expert",
    codeExample: `// RPKI Route Origin Authorization (ROA):
// Prefix: 203.0.113.0/24 | Max Length: 24 | Authorized ASN: AS65001 (Barrackpore Hub)
// Routers discard any announcement for 203.0.113.0/24 originating from any other ASN!`
  },
  {
    id: 27,
    question: "How do you inspect the active TLS cipher suite and certificate chain of a website using the OpenSSL CLI?",
    shortAnswer: "Run `openssl s_client -connect <hostname>:443 -servername <hostname> -tls1_3` to display the negotiated protocol version, cipher suite, certificate chain, and session parameters.",
    explanation: "This command establishes a manual TLS connection and outputs raw cryptographic telemetry: the negotiated protocol (TLSv1.3), cipher suite (TLS_AES_256_GCM_SHA384), server certificate issuer, validity period, and OCSP stapling status.",
    hint: "Using OpenSSL command-line tool to inspect the detailed security handshake of any website.",
    level: "Basic",
    codeExample: `// OpenSSL s_client Command:
$ openssl s_client -connect treasury.barrackpore.gov.in:443 -servername treasury.barrackpore.gov.in
// Output: Protocol : TLSv1.3 | Cipher : TLS_AES_256_GCM_SHA384 | Verify return code: 0 (ok)`
  },
  {
    id: 28,
    question: "What is the difference between 'In-Band' and 'Out-of-Band' Key Exchange in network security protocols?",
    shortAnswer: "In-Band key exchange negotiates encryption keys dynamically over the same network channel used for data transmission (e.g., TLS Diffie-Hellman handshake, IKEv2); Out-of-Band key exchange pre-distributes keys via a separate, independent channel (e.g., physical USB, secure courier, QKD fiber).",
    explanation: "In-Band negotiation (like Diffie-Hellman) is convenient and scalable across millions of internet users. Out-of-Band key distribution (used in military Pre-Placed Keys and Quantum Key Distribution) eliminates mathematical key exchange vulnerabilities on public networks at the expense of administrative complexity.",
    hint: "In-band shares keys through the same phone call; Out-of-band delivers keys in a sealed briefcase by courier.",
    level: "Moderate",
    codeExample: `// In-Band vs Out-of-Band:
// In-Band  : TLS 1.3 ECDH Key Exchange over TCP 443 (Instant & Automated)
// Out-of-Band: Admin loads physical Root CA private key into HSM via smartcard.`
  },
  {
    id: 29,
    question: "How does 'Post-Quantum Cryptography' (PQC) impact network security protocols across the OSI stack?",
    shortAnswer: "PQC replaces vulnerable classical public-key algorithms (RSA, Diffie-Hellman, ECDSA) with quantum-resistant lattice and hash-based algorithms (ML-KEM/Kyber for key exchange, ML-DSA/Dilithium for signatures) across TLS, IPsec, and SSH.",
    explanation: "Shor's quantum algorithm will break traditional public-key cryptography. NIST has standardized quantum-resistant algorithms: Kyber (FIPS 203) for key encapsulation and Dilithium (FIPS 204) for digital signatures. Protocols across Layers 3, 4, and 7 are integrating hybrid classical/quantum cipher suites today.",
    hint: "Upgrading the mathematical locks on TLS, SSH, and IPsec so future quantum computers cannot unlock them.",
    level: "Expert",
    codeExample: `// Post-Quantum Hybrid TLS 1.3 Proposal:
// Key Exchange: X25519Kyber768Draft00 (Combines Elliptic Curve X25519 + Quantum Kyber-768)`
  },
  {
    id: 30,
    question: "What is the Master Protocol Selection Decision Matrix for securing an enterprise network across the OSI stack?",
    shortAnswer: "Layer 7: HTTPS (Web/APIs), SSH (Admin), S/MIME (Email), DNSSEC (DNS); Layer 4: TLS 1.3 (TCP), DTLS 1.3 (UDP); Layer 3: WireGuard / IPsec ESP (Site-to-Site & Remote Access); Layer 2: MACsec 802.1AE (Datacenter Switches), WPA3-Enterprise (Wi-Fi).",
    explanation: "This complete decision matrix ensures defense-in-depth across all seven layers, combining hardware-rate link encryption, transparent network-layer VPNs, and granular application-level identity verification.",
    hint: "Layer 7 for apps, Layer 4 for sockets, Layer 3 for networks, and Layer 2 for physical switch links.",
    level: "Basic",
    codeExample: `// Master Enterprise Protocol Decision Matrix:
// Web Applications ➔ HTTPS (TLS 1.3 with HSTS & mTLS)
// Remote Administration ➔ SSH v2 with Ed25519 Keys
// Site-to-Site WAN ➔ IPsec IKEv2 ESP (AES-256-GCM) / WireGuard
// Datacenter Switching ➔ MACsec (IEEE 802.1AE 256-bit)
// Wireless Campus ➔ WPA3-Enterprise 192-bit CNSA Suite`
  }
];

export default questions;
