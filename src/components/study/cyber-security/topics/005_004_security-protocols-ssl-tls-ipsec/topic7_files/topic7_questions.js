const questions = [
  {
    id: 1,
    question: "What is the architectural purpose of the Internet Key Exchange (IKE) protocol in the IPsec framework?",
    shortAnswer: "IKE operates on the Control Plane (UDP Port 500/4500) to authenticate communicating peers, dynamically negotiate cryptographic algorithms (cipher suites), execute Diffie-Hellman key exchanges, and install Security Associations (SAs) into the data-plane kernel.",
    explanation: "While the data plane (ESP/AH) operates in kernel space at wire speed, IKE operates in user-space to perform the complex asymmetric cryptographic operations required to safely establish and rotate keys without human intervention.",
    hint: "IKE is the control plane protocol that negotiates keys and sets up the tunnel.",
    level: "Basic",
    codeExample: `// IPsec Architectural Planes:
// Control Plane : IKEv2 (UDP 500 / 4500) ➔ Authentication, DH Exchange, SA Lifecycle
// Data Plane    : ESP (IP Proto 50)       ➔ Symmetric Line-Rate Packet Encryption`
  },
  {
    id: 2,
    question: "How many total round-trip messages are required to establish an IPsec tunnel in IKEv1 versus IKEv2?",
    shortAnswer: "IKEv1 requires 6 to 9 messages (Phase 1 Main Mode [6 msgs] + Phase 2 Quick Mode [3 msgs]); IKEv2 requires only 4 messages (IKE_SA_INIT [2 msgs] + IKE_AUTH [2 msgs]).",
    explanation: "IKEv2 (RFC 7296) consolidated and streamlined the protocol, reducing latency by over 50% while establishing both the control channel (IKE SA) and data tunnel (Child SA) in just two round trips.",
    hint: "IKEv1 takes 6 to 9 messages; IKEv2 takes only 4 messages.",
    level: "Basic",
    codeExample: `// Message Round-Trip Comparison:
// IKEv1 : [Main Mode (6 msgs)] + [Quick Mode (3 msgs)] = 9 Messages (4.5 RTTs)
// IKEv2 : [IKE_SA_INIT (2 msgs)] + [IKE_AUTH (2 msgs)]  = 4 Messages (2 RTTs!)`
  },
  {
    id: 3,
    question: "What payloads are exchanged in the first two messages of an IKEv2 connection (the `IKE_SA_INIT` exchange)?",
    shortAnswer: "Initiator sends `HDR, SAi1 (Proposed Ciphers), KEi (Diffie-Hellman Public Value), Ni (Nonce)`; Responder replies with `HDR, SAr1 (Chosen Cipher), KEr (DH Public Value), Nr (Nonce), [CERTREQ]`.",
    explanation: "During IKE_SA_INIT, both endpoints agree on cryptographic transforms, complete a Diffie-Hellman exchange, and compute the master shared key (`SKEYSEED`). All subsequent messages in the IKEv2 session are completely encrypted.",
    hint: "SA proposals, Diffie-Hellman public keys, and random nonces.",
    level: "Moderate",
    codeExample: `// IKE_SA_INIT Exchange (Unencrypted):
// Msg 1 (Initiator ➔ Responder) : HDR, SAi1, KEi, Ni
// Msg 2 (Responder ➔ Initiator) : HDR, SAr1, KEr, Nr, [CERTREQ]
// Outcome: SKEYSEED computed ➔ All following messages encrypted with SK_e!`
  },
  {
    id: 4,
    question: "What payloads are exchanged in the second pair of IKEv2 messages (the `IKE_AUTH` exchange)?",
    shortAnswer: "Encrypted payloads containing `IDi / IDr` (Peer Identities), `CERT` (X.509 Digital Certificates), `AUTH` (Digital Signatures or PSK proofs), and `SAi2 / SAr2 + TSi / TSr` (Child SA cryptographic proposals and Traffic Selectors).",
    explanation: "Because IKE_AUTH is transmitted inside the encrypted IKE SA established during IKE_SA_INIT, peer identities (such as usernames, FQDNs, or certificate subjects) are never exposed to eavesdroppers on the wire.",
    hint: "Identities, certificates, authentication signatures, and Child SA traffic selectors.",
    level: "Moderate",
    codeExample: `// IKE_AUTH Exchange (Encrypted with SK_e):
// Msg 3 (Initiator ➔ Responder) : HDR, SK { IDi, [CERT], AUTH, SAi2, TSi, TSr }
// Msg 4 (Responder ➔ Initiator) : HDR, SK { IDr, [CERT], AUTH, SAr2, TSi, TSr }
// Outcome: Mutual authentication verified + Initial ESP Child SA active in kernel!`
  },
  {
    id: 5,
    question: "What is the fundamental architectural difference between an 'IKE SA' and a 'Child SA' (IPsec SA)?",
    shortAnswer: "An IKE SA is a bidirectional control channel (identified by 64-bit Initiator and Responder SPIs) used exclusively to secure IKE protocol messages; a Child SA is a pair of unidirectional simplex data-plane associations (identified by 32-bit SPIs) used to encrypt and carry user IP traffic.",
    explanation: "A single parent IKE SA can negotiate and maintain multiple Child SAs (e.g., separate tunnels for Voice, Finance, and General Internet traffic) without needing to repeat initial Diffie-Hellman handshakes.",
    hint: "IKE SA is the bidirectional control parent; Child SAs are the unidirectional data tunnels.",
    level: "Moderate",
    codeExample: `// SA Hierarchy:
// [ IKE SA (Control Plane) ] ➔ Bi-directional, SPIs: (0x88AF1901B3C4, 0x4A1F89BC99E1)
//    ├── [ Child SA 1 (Data: 10.14.0.0/16 <-> 10.20.0.0/16) ] ➔ ESP (SPI: 0x88AF1901)
//    └── [ Child SA 2 (Voice: 10.14.50.0/24 <-> 10.20.50.0/24) ] ➔ ESP (SPI: 0x4A1F89BC)`
  },
  {
    id: 6,
    question: "What critical security vulnerability exists in IKEv1 Aggressive Mode that led to its widespread deprecation?",
    shortAnswer: "IKEv1 Aggressive Mode transmits the peer's Identity (`IDi`) and Pre-Shared Key (PSK) authentication hash in plaintext in the very first unencrypted message, allowing eavesdroppers to capture the hash and crack the PSK offline using dictionary and brute-force attacks.",
    explanation: "To speed up setup to 3 messages, IKEv1 Aggressive Mode sacrificed encryption of identity payloads. In IKEv2, peer identities are strictly transmitted inside the encrypted `IKE_AUTH` phase.",
    hint: "It transmits identity and password hashes in cleartext, enabling offline cracking.",
    level: "Moderate",
    codeExample: `// IKEv1 Aggressive Mode Flaw (RFC 2409):
// Msg 1: Initiator ➔ Responder: SA, KE, Nonce, IDi (EXPOSED IN CLEARTEXT!)
// Msg 2: Responder ➔ Initiator: SA, KE, Nonce, IDr, HASH_R (Eavesdropper captures hash!)
// Attacker runs 'ike-scan' + 'hashcat' to recover Pre-Shared Key in minutes.`
  },
  {
    id: 7,
    question: "How does IKEv2 protect responders from Half-Open Connection Denial-of-Service (DoS) and SYN/INIT floods using Stateless Cookies?",
    shortAnswer: "When under high connection load, the responder replies to `IKE_SA_INIT` requests with an unauthenticated `COOKIE` notification payload containing a cryptographic hash of the client's IP and SPIs (`HMAC(SecretKey, ClientIP:SPI)`), refusing to create any memory or DH state until the client resends its request carrying that valid cookie.",
    explanation: "This forces the initiator to prove that its source IP address is not spoofed (acting like TCP SYN Cookies). The responder stores zero state in memory and expends zero CPU on Diffie-Hellman exponentiations during a flood.",
    hint: "Stateless anti-spoofing cookies force the sender to prove its source IP before the server spends CPU.",
    level: "Expert",
    codeExample: `// IKEv2 Anti-Spoofing Cookie Flow (RFC 7296 Section 2.6):
// 1. Attacker sends forged IKE_SA_INIT with spoofed IP
// 2. Responder (Under Load) replies: HDR, NOTIFY(COOKIE = HMAC(Secret, SpoofedIP:SPI))
//    (Responder stores ZERO memory state!)
// 3. Spoofed IP never receives the cookie; attacker cannot complete handshake!
// 4. Legitimate Client receives cookie ➔ Retransmits IKE_SA_INIT with COOKIE payload ➔ Processed ✔`
  },
  {
    id: 8,
    question: "What are the seven key streams derived from the master secret (`SKEYSEED`) in IKEv2?",
    shortAnswer: "1. `SK_d` (Child SA key derivation), 2. `SK_ai` (Initiator IKE integrity), 3. `SK_ar` (Responder IKE integrity), 4. `SK_ei` (Initiator IKE encryption), 5. `SK_er` (Responder IKE encryption), 6. `SK_pi` (Initiator auth signing), 7. `SK_pr` (Responder auth signing).",
    explanation: "By separating encryption, authentication, and derivation keys in each direction, IKEv2 ensures that a compromise of one key stream does not impact others.",
    hint: "SK_d for child derivation, SK_a for integrity, SK_e for encryption, SK_p for authentication.",
    level: "Expert",
    codeExample: `// IKEv2 7-Key Stream Derivation (RFC 7296):
// SKEYSEED = prf(Ni | Nr, g^ir)
// {SK_d | SK_ai | SK_ar | SK_ei | SK_er | SK_pi | SK_pr} = prf+(SKEYSEED, Ni | Nr | SPIi | SPIr)`
  },
  {
    id: 9,
    question: "What is the `CREATE_CHILD_SA` exchange in IKEv2, and what two distinct purposes does it serve?",
    shortAnswer: "1. Negotiating additional data-plane Child SAs under an existing IKE SA, and 2. Rekeying existing IKE SAs or Child SAs before their cryptographic lifetime expires.",
    explanation: "`CREATE_CHILD_SA` is a lightweight 2-message exchange executed inside the encrypted IKE SA. It eliminates the overhead of tearing down and re-authenticating tunnels when rotating session keys.",
    hint: "It creates new Child SAs and rekeys existing SAs in just 2 messages.",
    level: "Moderate",
    codeExample: `// CREATE_CHILD_SA Exchange (2 Messages):
// Msg 1: Initiator ➔ Responder: HDR, SK { SA, [KEi], Nonce, TSi, TSr }
// Msg 2: Responder ➔ Initiator: HDR, SK { SA, [KEr], Nonce, TSi, TSr }
// If KE payloads are included ➔ Perfect Forward Secrecy (PFS) is enforced!`
  },
  {
    id: 10,
    question: "What is Perfect Forward Secrecy (PFS) in IKEv2 Child SA rekeying, and how is it achieved during `CREATE_CHILD_SA`?",
    shortAnswer: "PFS guarantees that compromising long-term keys or previous session keys does not compromise past or future sessions. In IKEv2, it is achieved by including fresh Diffie-Hellman public values (`KEi` and `KEr`) in the `CREATE_CHILD_SA` exchange rather than deriving new keys solely from the existing `SK_d`.",
    explanation: "Without PFS, new Child SAs derive their keys directly from the original parent `SK_d`. With PFS, an ephemeral Diffie-Hellman exchange is calculated, generating a completely independent root of trust for each rekey.",
    hint: "Including fresh Diffie-Hellman KE payloads during rekeying guarantees independent keys.",
    level: "Expert",
    codeExample: `// strongSwan PFS Configuration:
// esp = aes256gcm128-modp2048!  (modp2048 / ecp256 enforces DH exchange on every rekey)`
  },
  {
    id: 11,
    question: "What is MOBIKE (IKEv2 Mobility and Multihoming - RFC 4555), and what real-world problem does it solve for mobile clients?",
    shortAnswer: "MOBIKE allows a mobile client (such as a laptop or smartphone) to change its physical IP address (e.g., switching from office Wi-Fi to a 5G cellular network) without tearing down its active IPsec VPN tunnel or renegotiating IKE SAs.",
    explanation: "When the client acquires a new IP address, it sends an `INFORMATIONAL` message containing an `UPDATE_SA_ADDRESSES` notification. The gateway updates its SAD state and routing tables immediately, preserving active TCP connections and VPN sessions.",
    hint: "MOBIKE lets mobile devices switch between Wi-Fi and 5G without dropping the VPN connection.",
    level: "Expert",
    codeExample: `// MOBIKE Address Update (RFC 4555):
// Client IP changes from 192.168.1.50 (Wi-Fi) ➔ 100.64.20.15 (5G Cellular)
// Client ➔ Gateway: HDR, SK { NOTIFY(UPDATE_SA_ADDRESSES) }
// Gateway updates outer IP in SAD ➔ Active database and SSH sessions continue uninterrupted!`
  },
  {
    id: 12,
    question: "How does Dead Peer Detection (DPD / RFC 3706 / RFC 7296) maintain session liveness in IPsec gateways?",
    shortAnswer: "Gateways periodically exchange lightweight `INFORMATIONAL` request/response messages (empty keepalives). If a remote peer fails to respond within a configured timeout window after multiple retransmissions, the local gateway marks the peer as dead, tears down the SAs, and clears kernel routes.",
    explanation: "DPD prevents 'black hole' routing, where a gateway continues encrypting and sending packets to a remote site whose internet connection crashed, preventing automated failover to backup circuits.",
    hint: "Periodic keepalives detect when a peer goes offline so routes can failover.",
    level: "Moderate",
    codeExample: `// strongSwan DPD Configuration (swanctl.conf):
// dpd_delay = 30s    # Send DPD check every 30 seconds of silence
// dpd_timeout = 90s  # Mark peer dead and tear down SAs if no reply in 90 seconds`
  },
  {
    id: 13,
    question: "What are Traffic Selectors (`TSi` and `TSr`) in IKEv2, and how do they correspond to Security Policy Database (SPD) entries?",
    shortAnswer: "`TSi` (Traffic Selector - Initiator) and `TSr` (Traffic Selector - Responder) specify the source and destination IP subnets, protocol numbers, and port ranges that are permitted to travel inside the negotiated Child SA, directly programming the kernel's SPD policies.",
    explanation: "During `IKE_AUTH`, the initiator proposes subnets (e.g., `10.14.0.0/16 ➔ 10.20.0.0/16`). The responder narrows or accepts the range. Once agreed, both gateways program their in-kernel XFRM SPD tables with those exact boundaries.",
    hint: "They define the subnets allowed inside the tunnel and program the SPD.",
    level: "Moderate",
    codeExample: `// Traffic Selectors Payload Example:
// TSi : Subnet = 10.14.0.0/16, Proto = ANY, Port Range = 0-65535 (Barrackpore Subnet)
// TSr : Subnet = 10.20.0.0/16, Proto = ANY, Port Range = 0-65535 (Kolkata Core)`
  },
  {
    id: 14,
    question: "What is the difference between Pre-Shared Key (PSK) authentication and X.509 Digital Certificate (RSA-PSS / ECDSA) authentication in IKEv2?",
    shortAnswer: "PSK uses a shared static passphrase known to both gateways (vulnerable to compromise and difficult to rotate at scale); X.509 digital certificates use Public Key Infrastructure (PKI) with asymmetric key pairs and CA hierarchies, enabling scalable, automated certificate revocation and strong mutual identity proof.",
    explanation: "In enterprise and banking environments (such as municipal treasury interconnects), X.509 certificates with ECDSA or RSA-PSS are mandatory to satisfy compliance audits and prevent unauthorized device enrollment.",
    hint: "PSK uses a shared password; X.509 uses asymmetric digital certificates and PKI.",
    level: "Basic",
    codeExample: `// Authentication Method Configuration (swanctl.conf):
// Method 1 (PSK - Simple / Dev):
// auth = psk
// secret = "BarrackporeMunicipalSecret2026!"

// Method 2 (X.509 - Enterprise / Production):
// auth = pubkey
// certs = gateway-cert.pem
// cacerts = state-ca-chain.pem`
  },
  {
    id: 15,
    question: "How does IKEv2 natively detect Network Address Translation (NAT) during the `IKE_SA_INIT` exchange?",
    shortAnswer: "Both peers include `NAT_DETECTION_SOURCE_IP` and `NAT_DETECTION_DESTINATION_IP` notification payloads containing hashes of their perceived IP addresses and ports. If the hash calculated by the receiver does not match the received hash, NAT is detected, and both peers automatically migrate the connection to UDP Port 4500 (NAT-T).",
    explanation: "This automated mechanism eliminates manual NAT-T configuration. If neither endpoint is behind a NAT, communication remains on UDP 500 without encapsulation overhead.",
    hint: "NAT-D hashes comparing source and destination IPs detect if any address changed in flight.",
    level: "Expert",
    codeExample: `// NAT-Detection Payloads (RFC 7296 Section 2.23):
// Initiator sends: NAT_D_SRC = SHA1(SPIi | SPIr | Initiator_IP | Initiator_Port)
// Responder recomputes hash using actual packet source IP
// If Hashes Mismatch ➔ NAT router exists in path! ➔ Shift to UDP 4500`
  },
  {
    id: 16,
    question: "What is Extensible Authentication Protocol (EAP) in IKEv2, and why is it essential for Remote Access VPNs?",
    shortAnswer: "EAP in IKEv2 allows integrating enterprise identity backends (RADIUS, Active Directory, LDAP, OAuth) and multi-factor authentication (MFA tokens, OTPs, smartcards) directly into the IKE_AUTH handshake without needing proprietary client software.",
    explanation: "In IKEv1, authenticating users required non-standard hacks (XAUTH / Hybrid Mode). IKEv2 standardized EAP (EAP-TLS, EAP-MSCHAPv2) natively within RFC 7296, supporting passwordless passkeys and multi-factor authentication universally.",
    hint: "EAP integrates enterprise MFA and user directories directly into the IKEv2 tunnel setup.",
    level: "Moderate",
    codeExample: `// IKEv2 EAP-MSCHAPv2 Authentication Flow:
// 1. Gateway authenticates to Client with X.509 Certificate (Server Auth)
// 2. Gateway requests EAP identity from Client
// 3. Client provides Username + Password + MFA OTP (User Auth via RADIUS)`
  },
  {
    id: 17,
    question: "What are the 64-bit SPIs in the IKE header used for, and how do they differ from the 32-bit SPIs in the ESP header?",
    shortAnswer: "The 64-bit IKE SPIs (`SPIi` and `SPIr`) uniquely identify the bidirectional control-plane IKE SA in user-space daemons; the 32-bit ESP SPI identifies the unidirectional data-plane Child SA in the kernel's SAD table.",
    explanation: "Because an enterprise gateway might handle millions of concurrent user-space IKE handshakes, 64-bit SPIs guarantee zero probability of collision across multiple distributed server instances.",
    hint: "IKE uses 64-bit SPIs for the control plane; ESP uses 32-bit SPIs for data packets.",
    level: "Moderate",
    codeExample: `// Header SPI Comparison:
// IKEv2 Header (Control) : [ Initiator SPI (8 Bytes) ] [ Responder SPI (8 Bytes) ]
// ESP Header   (Data)    : [ SPI (4 Bytes) ] [ Sequence Number (4 Bytes) ]`
  },
  {
    id: 18,
    question: "What is an 'IKE Message ID' and why does IKEv2 enforce strict request-response matching with monotonically increasing IDs?",
    shortAnswer: "Every IKEv2 message carries a 32-bit Message ID in its header starting at 0. Every request message must be explicitly acknowledged by a response with the exact same Message ID, guaranteeing reliable delivery, retransmission, and protection against message reordering over UDP.",
    explanation: "Unlike IKEv1 (which lacked symmetric request-response tracking), IKEv2 ensures that any dropped UDP packet is retransmitted with its original Message ID until acknowledged or timed out.",
    hint: "Message IDs ensure reliable request-acknowledgment delivery over unreliable UDP.",
    level: "Expert",
    codeExample: `// IKEv2 Message ID Sequence:
// Request  : HDR(MsgID=0, Type=IKE_SA_INIT) ➔
// Response : ⬅ HDR(MsgID=0, Type=IKE_SA_INIT)
// Request  : HDR(MsgID=1, Type=IKE_AUTH) ➔
// Response : ⬅ HDR(MsgID=1, Type=IKE_AUTH)`
  },
  {
    id: 19,
    question: "What are Soft Lifetimes versus Hard Lifetimes in strongSwan SA management?",
    shortAnswer: "Soft Lifetime defines the duration (e.g., 28,800 seconds / 8 hours) after which strongSwan triggers background rekeying via `CREATE_CHILD_SA` while traffic continues uninterrupted; Hard Lifetime (e.g., 32,400 seconds / 9 hours) is the deadline after which the old SA is forcefully torn down if rekeying fails.",
    explanation: "Having a comfortable buffer between Soft and Hard lifetimes prevents dropped packets during key renewal.",
    hint: "Soft lifetime initiates rekeying in the background; Hard lifetime kills the SA if rekeying fails.",
    level: "Basic",
    codeExample: `// Lifetime Configuration (swanctl.conf):
// rekey_time = 8h    # Soft Lifetime (Initiates rekeying at 8 hours)
// over_time = 1h     # Hard Lifetime buffer (Tears down old SA at 9 hours)`
  },
  {
    id: 20,
    question: "How does the `INITIAL_CONTACT` notification payload prevent duplicate orphaned SAs when a branch router reboots?",
    shortAnswer: "When a rebooted router re-establishes an IKE SA, it includes the `INITIAL_CONTACT` payload. This informs the central gateway that this is the client's sole active session, allowing the gateway to immediately delete any old, orphaned SAs associated with that client's identity.",
    explanation: "Without `INITIAL_CONTACT`, the central gateway might retain dead SAs until their lifetimes expire, creating routing conflicts and wasting memory.",
    hint: "It tells the server: 'I just rebooted, delete all my old leftover SAs.'",
    level: "Moderate",
    codeExample: `// INITIAL_CONTACT Notification:
// Branch Router (rebooted) ➔ Central Gateway:
// IKE_AUTH: HDR, SK { IDi, AUTH, NOTIFY(INITIAL_CONTACT), SA, TS }
// Central Gateway: Deletes stale SAs for "branch-ichapur.gov.in" immediately ✔`
  },
  {
    id: 21,
    question: "What is an Elliptic Curve Diffie-Hellman (ECDH) group (e.g., Curve25519 or ECP-384) in IKEv2, and why is it superior to legacy MODP groups (Group 2 / Group 14)?",
    shortAnswer: "ECDH uses algebraic curves over finite fields to deliver equivalent or higher cryptographic security with much smaller key sizes (e.g., 256-bit Curve25519 equals 3072-bit RSA), executing key generation in sub-milliseconds with minimal CPU load and smaller UDP packet sizes.",
    explanation: "Legacy MODP groups (like Group 2 1024-bit) are cryptographically broken, while Group 14 (2048-bit) requires heavy modular exponentiation. ECDH curves (Curve25519, Curve448, ECP-384) provide maximum security at lightning speed.",
    hint: "Elliptic curves provide higher security with much smaller keys and faster computation.",
    level: "Moderate",
    codeExample: `// Diffie-Hellman Group Evolution:
// Group 2  (1024-bit MODP) ➔ BROKEN (Logjam attack) ❌
// Group 14 (2048-bit MODP) ➔ Minimum legacy standard (High CPU)
// Group 19 (256-bit ECP)   ➔ Modern NIST Elliptic Curve ✔
// Group 31 (Curve25519)    ➔ Modern Bernstein Curve (Fastest & Safest) 🌟`
  },
  {
    id: 22,
    question: "What is the function of the `REDIRECT` mechanism (RFC 5685) in enterprise IKEv2 gateway clusters?",
    shortAnswer: "It allows a busy or overloaded central IPsec gateway during `IKE_SA_INIT` or `IKE_AUTH` to redirect connecting VPN clients to a different, less loaded gateway in the cluster (e.g., redirecting from Barrackpore Hub to Kolkata Backup Hub).",
    explanation: "This enables elastic load balancing and automated maintenance failover without requiring clients to change their configured connection endpoints.",
    hint: "Allows a loaded gateway to redirect incoming tunnels to an alternate server.",
    level: "Expert",
    codeExample: `// IKEv2 Redirect Mechanism (RFC 5685):
// Client ➔ Gateway A: IKE_SA_INIT
// Gateway A (Overloaded) ➔ Client: HDR, NOTIFY(REDIRECT, "vpn2.kolkata.gov.in")
// Client reconnects immediately to Gateway B ✔`
  },
  {
    id: 23,
    question: "What is the command to inspect active IKE SAs and Child SAs using strongSwan's modern `swanctl` utility?",
    shortAnswer: "`sudo swanctl --list-sas` (or `sudo swanctl -l`).",
    explanation: "The `swanctl` command communicates directly with the strongSwan `charon` daemon via the VICI (Versatile IKE Control Interface) Unix socket, displaying active IKE SAs, established Child SAs, cipher suites, SPIs, lifetime expirations, and traffic byte counters.",
    hint: "Use sudo swanctl --list-sas.",
    level: "Basic",
    codeExample: `// Live strongSwan Audit Command:
# sudo swanctl --list-sas
// Output:
// net-to-net: #1, ESTABLISHED, IKEv2, 88af1901b3c4_i* 4a1f89bc99e1_r
//   local:  'barrackpore-hub.gov.in'
//   remote: 'kolkata-core.gov.in'
//   AES_GCM_16_256/PRF_HMAC_SHA2_384/ECP_384
//   net-to-net: #1, reqid 1, INSTALLED, TUNNEL, ESP:AES_GCM_16_256
//     installed 45m ago, rekeying in 7h, expires in 8h
//     in  c88af101, 1450280 bytes, 1024 packets
//     out c4a1f89b, 2840120 bytes, 2048 packets`
  },
  {
    id: 24,
    question: "What is 'Route-Based IPsec' using VTI (Virtual Tunnel Interfaces / XFRM Interfaces) versus legacy 'Policy-Based IPsec'?",
    shortAnswer: "Policy-Based IPsec matches traffic against SPD rules and encapsulates packets during kernel routing; Route-Based IPsec binds the IPsec tunnel to a virtual network interface (e.g., `vti0` or `xfrm0`), allowing standard routing protocols (OSPF, BGP) and firewall rules to route traffic into the tunnel interface normally.",
    explanation: "Route-Based IPsec is the modern standard in cloud and enterprise networks (AWS, Azure, GCP, strongSwan), enabling dynamic routing, ECMP load balancing, and clear interface traffic monitoring.",
    hint: "Route-Based IPsec creates a virtual network interface (vti0) that dynamic routing protocols can use.",
    level: "Expert",
    codeExample: `// Route-Based IPsec with Linux XFRM Interface:
# sudo ip link add xfrm0 type xfrm dev eth0 if_id 42
# sudo ip addr add 10.255.255.1/30 dev xfrm0
# sudo ip link set xfrm0 up
# sudo ip route add 10.20.0.0/16 dev xfrm0 # Standard routing into IPsec tunnel!`
  },
  {
    id: 25,
    question: "Why does IKEv2 retransmit requests over UDP and how does exponential backoff prevent network congestion?",
    shortAnswer: "Because UDP is an unreliable datagram transport, IKEv2 must handle its own reliability. If a response to a request is not received within a timeout window (e.g., 4 seconds), IKEv2 retransmits the exact same message with an exponentially doubled timer (4s ➔ 8s ➔ 16s ➔ 32s) to avoid exacerbating WAN congestion.",
    explanation: "If no response is received after 5 retransmissions (total ~90 seconds), the daemon concludes the remote peer is unreachable and halts connection attempts.",
    hint: "Exponential backoff doubles the retransmission wait time to avoid flooding a congested link.",
    level: "Moderate",
    codeExample: `// Retransmission Timer Calculation:
// Attempt 1: Wait 4.0s
// Attempt 2: Wait 8.0s
// Attempt 3: Wait 16.0s
// Attempt 4: Wait 32.0s
// Attempt 5: Timeout and declare peer unreachable.`
  },
  {
    id: 26,
    question: "What is the purpose of the `HTTP_CERT_LOOKUP` hash-and-URL extension in IKEv2 certificate exchange?",
    shortAnswer: "Instead of transmitting huge X.509 certificate chains directly over UDP (which causes UDP packet fragmentation and dropped handshakes), the gateway transmits a short HTTP URL and SHA-1 hash of the certificate, allowing the receiver to fetch the certificate via standard HTTP.",
    explanation: "This avoids UDP fragmentation issues across restrictive WANs where fragmented UDP packets are silently dropped by firewalls.",
    hint: "Transmits a URL to fetch the certificate over HTTP instead of sending huge certificates over UDP.",
    level: "Expert",
    codeExample: `// Hash and URL Certificate Exchange (RFC 7296 Section 3.6):
// Instead of sending 4KB DER Certificate in UDP packet:
// CERT Payload: [ Hash: 0x88af19... | URL: "http://pki.barrackpore.gov.in/certs/gateway.crt" ]`
  },
  {
    id: 27,
    question: "What is an IKEv2 'Configuration Payload' (`CP`) and how does it dynamically assign virtual IP addresses to Remote Access VPN clients?",
    shortAnswer: "The Configuration Payload (`CP`) operates like DHCP inside IKEv2. During `IKE_AUTH`, the client sends `CP(CFG_REQUEST)` asking for internal network parameters, and the gateway replies with `CP(CFG_REPLY)` assigning an internal virtual IP address, DNS servers, and subnet masks.",
    explanation: "This allows mobile road warriors connecting from home to receive an internal enterprise IP address (e.g., `10.14.99.5`) and internal enterprise DNS servers transparently.",
    hint: "It acts like DHCP inside IKEv2 to assign internal virtual IP addresses and DNS to remote clients.",
    level: "Moderate",
    codeExample: `// IKEv2 Configuration Payload Exchange:
// Client ➔ Gateway: IKE_AUTH + CP(CFG_REQUEST: INTERNAL_IP4_ADDRESS, INTERNAL_IP4_DNS)
// Gateway ➔ Client: IKE_AUTH + CP(CFG_REPLY: IP=10.14.99.5, DNS=10.14.0.2, DOMAIN=gov.in)`
  },
  {
    id: 28,
    question: "How does IKEv2 handle Certificate Revocation List (CRL) and Online Certificate Status Protocol (OCSP) checking in production gateways?",
    shortAnswer: "During the `IKE_AUTH` certificate verification step, the strongSwan daemon extracts the CRL Distribution Point (CDP) or OCSP Authority Information Access (AIA) URL from the peer's certificate and verifies in real time whether the certificate has been revoked before establishing the tunnel.",
    explanation: "If an employee's field laptop is stolen in Ichapur, the security team revokes its certificate at the central CA. The gateway's OCSP check detects the revocation in < 1 second and immediately rejects incoming IKE connections.",
    hint: "It queries OCSP responders in real time to ensure stolen or expired certificates are blocked.",
    level: "Expert",
    codeExample: `// strongSwan OCSP Configuration (strongswan.conf):
// charon {
//   plugins {
//     revocation {
//       ocsp_cache_size = 1000
//       ocsp_cache_validity = 3600
//       enable = yes
//     }
//   }
// }`
  },
  {
    id: 29,
    question: "What is the difference between 'Main Mode' (Identity Protection) and 'Aggressive Mode' in legacy IKEv1?",
    shortAnswer: "Main Mode uses 6 messages, setting up a Diffie-Hellman encrypted channel in messages 1-4 before exchanging peer identities in messages 5-6 (protecting identity); Aggressive Mode compresses the exchange into 3 messages, transmitting peer identities in the very first unencrypted message (exposing identity).",
    explanation: "Main Mode protected against identity eavesdropping but required 6 messages. IKEv2 solved both problems by achieving encrypted identity protection in only 4 messages.",
    hint: "Main Mode is 6 messages (identity protected); Aggressive Mode is 3 messages (identity exposed).",
    level: "Basic",
    codeExample: `// IKEv1 Modes:
// Main Mode (6 msgs): Msg 1-4 (DH Key Exchange) ➔ Msg 5-6 (Encrypted Identity Auth ✔)
// Aggressive Mode (3 msgs): Msg 1 (Plaintext Identity + DH) ➔ Identity EXPOSED ❌`
  },
  {
    id: 30,
    question: "What are the key forensic inspection steps when diagnosing an IKEv2 handshake failure on a Linux strongSwan server?",
    shortAnswer: "1. Monitor live daemon logs with `sudo journalctl -u strongswan -f` or `sudo swanctl --log`; 2. Verify certificate validity with `openssl x509 -in cert.pem -text -noout`; 3. Inspect active in-kernel SAs with `sudo swanctl --list-sas` and `sudo ip xfrm state`; 4. Check for UDP 500/4500 firewall blocking with `sudo tcpdump -nn -i eth0 port 500 or port 4500`.",
    explanation: "These four diagnostic tools allow engineers to immediately pinpoint whether an IKEv2 failure is caused by mismatched proposal ciphers, expired certificates, firewall port blockage, or traffic selector mismatches.",
    hint: "Use swanctl --log, openssl x509, swanctl --list-sas, and tcpdump on port 500/4500.",
    level: "Expert",
    codeExample: `// Complete Troubleshooting Suite for IKEv2:
# sudo swanctl --log                                      # Real-time daemon trace
# sudo swanctl --list-sas                                  # Active SA database inspection
# sudo tcpdump -nn -i eth0 'udp port 500 or udp port 4500' # Live packet handshake trace
# sudo ip xfrm policy show                                 # Kernel SPD verification`
  }
];

export default questions;
