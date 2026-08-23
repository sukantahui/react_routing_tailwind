const questions = [
  {
    id: 1,
    question: "What is 'Encapsulation Overhead' in VPN tunneling and what components make up the total byte expansion?",
    shortAnswer: "The extra header bytes added to every packet by the VPN protocol (Outer IP header, ESP/tunnel header, Initialization Vector, ESP trailer padding, and Integrity Check Value/MAC), expanding packet size by 50 to 90+ bytes.",
    explanation: "When an application packet (such as a 1500-byte HTTP request) enters a VPN tunnel, the operating system wraps it with an outer IP header (20B), tunnel headers (8–36B), crypto IV (8–16B), padding, and an authentication tag (16B). This increases the overall packet size beyond the physical Ethernet boundary.",
    hint: "Think about wrapping a box inside a cardboard shipping box with bubble wrap and stamps.",
    level: "Basic",
    codeExample: `// IPsec ESP Tunnel Mode Packet Layout:
// [ Outer IPv4 (20B) ] + [ ESP Header (8B) ] + [ IV (8B) ] + [ Original IP (20B) ] + [ TCP (20B) ] + [ Data ] + [ Padding (0-15B) ] + [ ICV (16B) ]
// Total Added Overhead = ~56 to 72 Bytes per packet!`
  },
  {
    id: 2,
    question: "What is a 'Path MTU (PMTU) Black Hole' and why does it cause large file uploads to hang while SSH logins succeed?",
    shortAnswer: "It occurs when a packet exceeding the network MTU with the Don't Fragment (DF) bit set is dropped by an intermediate router, but the corresponding ICMP Type 3 Code 4 error message is blocked by firewalls, preventing the sender from ever learning to shrink its packet size.",
    explanation: "Small packets (like SSH keystrokes or TCP SYN handshakes) are well below 1400 bytes and traverse the tunnel without issue. Large packets (like 1500-byte PDF uploads) exceed the tunnel MTU. When dropped, the sender waits for an acknowledgement that never arrives, retransmitting the oversized packet indefinitely until the connection times out.",
    hint: "Small letters fit through the mail slot, but large parcels get rejected silently without returning a delivery notice.",
    level: "Moderate",
    codeExample: `// PMTU Black Hole Flow:
// [Sender] ──(1560B Packet with DF=1)──> [Intermediate ISP Router] ──(PACKET DROPPED!)
//                                                        │
//                                                        ▼ (ICMP Type 3 Code 4 Sent)
//                                              [Firewall BLOCKS ICMP!] ➔ Sender NEVER notified ➔ Connection HANGS!`
  },
  {
    id: 3,
    question: "What is 'TCP MSS Clamping' and how does it permanently resolve PMTU Black Holes on VPN gateways?",
    shortAnswer: "A firewall mechanism that intercepts TCP SYN packets during connection establishment and rewrites the Maximum Segment Size (MSS) advertisement to a lower value (e.g., 1360–1400 bytes) matching the tunnel MTU.",
    explanation: "MSS defines the largest payload chunk a host can receive. By clamping MSS at the gateway, both communicating endpoints are instructed to create smaller TCP packets from the very start, guaranteeing that encapsulated packets never exceed the 1500-byte physical Ethernet limit.",
    hint: "Instructing both sides at the start of the call to speak in smaller sentences so words never get cut off.",
    level: "Moderate",
    codeExample: `// Linux iptables TCP MSS Clamping Command:
$ sudo iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu

// Or manually clamp MSS to 1360 bytes:
$ sudo iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1360`
  },
  {
    id: 4,
    question: "What is 'TCP-over-TCP Meltdown' and why is running SSL/TLS VPNs over TCP considered an architectural anti-pattern?",
    shortAnswer: "A catastrophic throughput collapse occurring when both the inner passenger TCP connection and the outer carrier TCP tunnel execute independent sliding-window retransmissions and exponential backoff under packet loss.",
    explanation: "When a packet drops on an unreliable connection, the outer TCP tunnel pauses to retransmit. Meanwhile, the inner application TCP stack experiences a timeout and starts its own retransmissions. Both stacks enter exponential backoff simultaneously, filling the link with duplicate packets and slashing throughput by over 90%.",
    hint: "Two people trying to repeat lost words at the same time, causing total communication breakdown.",
    level: "Expert",
    codeExample: `// Meltdown Formula Impact (at 4% packet loss on 100 Mbps link):
// UDP Tunnel Throughput (WireGuard / DTLS) : ~95 Mbps (Smooth & Resilient)
// TCP-in-TCP Tunnel Throughput (OpenVPN TCP): ~0.8 Mbps (Collapsed by 99%!)`
  },
  {
    id: 5,
    question: "Why does the Pre-Shared Key (PSK) authentication model fail in enterprise deployments?",
    shortAnswer: "A single static password is shared across all remote endpoints; if one laptop is lost or an employee is terminated, the entire organization's key is compromised, requiring manual re-configuration across all client devices.",
    explanation: "PSKs cannot provide non-repudiation or individual user identification. Hardcoded PSKs in configuration files are easily dumped by malware or extracted from stolen hardware, violating regulatory standards including PCI-DSS 4.0 and RBI Cybersecurity Frameworks.",
    hint: "Sharing the exact same physical front-door key with 500 people means you must change all locks whenever one person leaves.",
    level: "Basic",
    codeExample: `// Insecure PSK in ipsec.secrets:
// %any %any : PSK "SuperSecretCompanyPassword2026!"
// If Laptop 42 is stolen, this PSK is compromised for ALL 500 employees!`
  },
  {
    id: 6,
    question: "How does Public Key Infrastructure (PKI) with X.509 Digital Certificates provide scalable key management?",
    shortAnswer: "Each user or device receives a unique cryptographic key pair and certificate signed by an Enterprise Certificate Authority (CA), enabling individual authentication, role-based access, and instantaneous individual revocation.",
    explanation: "PKI uses asymmetric cryptography: the server verifies the client's public certificate against its trusted Root/Intermediate CA. If an employee departs, only their specific certificate serial number is revoked via CRL or OCSP, with zero impact on the rest of the workforce.",
    hint: "Issuing unique passport identity cards with digital stamps instead of sharing a single group password.",
    level: "Moderate",
    codeExample: `// X.509 Client Certificate Attributes:
// Subject: CN=Mamata, O=Barrackpore Hub, OU=Engineering
// Issuer : CN=Enterprise-Intermediate-CA, O=Coder & AccoTax
// Validity: 2026-01-01 to 2026-12-31 | Serial: 0x4A1F89BC`
  },
  {
    id: 7,
    question: "What is the difference between a 'Certificate Revocation List' (CRL) and the 'Online Certificate Status Protocol' (OCSP)?",
    shortAnswer: "A CRL is a digitally signed file listing all revoked certificate serial numbers that clients periodically download; OCSP is a real-time query protocol that checks the revocation status of a specific certificate on demand.",
    explanation: "CRLs can grow to multi-megabyte files, consuming bandwidth and introducing latency during tunnel negotiation. Furthermore, CRLs have a time-lag between updates. OCSP queries the CA responder in real time. 'OCSP Stapling' optimizes this by having the server pre-fetch and attach a signed OCSP proof during the TLS handshake.",
    hint: "CRL is a printed booklet of lost credit cards; OCSP is a real-time card swipe machine check.",
    level: "Moderate",
    codeExample: `// Checking OCSP Status via OpenSSL CLI:
$ openssl ocsp -issuer ca_cert.pem -cert client_cert.pem -url http://ocsp.barrackpore-hub.internal -CAfile root_ca.pem
// Output: client_cert.pem: good (This Update: Aug 23 10:00:00 2026 GMT)`
  },
  {
    id: 8,
    question: "What is 'Simple Certificate Enrollment Protocol' (SCEP) and how does it automate key rotation on mobile VPN clients?",
    shortAnswer: "An automated protocol that allows Mobile Device Management (MDM) servers to request, provision, and renew X.509 digital certificates without manual user intervention before certificates expire.",
    explanation: "Managing certificates manually across thousands of laptops and phones is prone to outages when certificates expire. SCEP (or EST - Enrollment over Secure Transport) enables MDM systems (like Microsoft Intune) to automatically generate private keys in the device TPM and enroll signed certificates from the enterprise CA.",
    hint: "An automated software robot that renews employee security certificates in the background before they expire.",
    level: "Moderate",
    codeExample: `// SCEP Enrollment Workflow:
// [Device TPM] ──(Generates Key Pair & CSR)──> [MDM / SCEP Gateway] ──(Validates Identity)──> [Enterprise CA]
// ➔ Signed Certificate installed silently in Windows Certificate Store / Apple Keychain!`
  },
  {
    id: 9,
    question: "What is 'NAT Traversal' (NAT-T) and why is it necessary for IPsec ESP across home routers?",
    shortAnswer: "NAT-T encapsulates IPsec ESP (IP Protocol 50) packets inside UDP Port 4500 so standard home and cellular NAT routers can track port numbers and translate addresses without dropping packets.",
    explanation: "Native IPsec ESP operates directly at Layer 3 without Layer 4 TCP/UDP port numbers. Because home NAT routers rely on port address translation (PAT) to multiplex connections over a single public IP, raw ESP packets cannot be mapped. NAT-T adds an 8-byte UDP header to enable seamless NAT routing.",
    hint: "Putting a postal envelope inside a standard courier box with tracking numbers so home Wi-Fi routers understand it.",
    level: "Moderate",
    codeExample: `// IPsec NAT-T Packet Format:
// [ Outer IPv4 ] + [ UDP Port 4500 (8B) ] + [ Non-ESP Marker (4B) ] + [ ESP Header (8B) ] + [ Encrypted Payload ]`
  },
  {
    id: 10,
    question: "Why do mobile VPN clients experience severe battery drain when aggressive 'NAT Keepalive' timers are configured?",
    shortAnswer: "Cellular modems enter low-power sleep states when idle; sending frequent NAT keepalive packets (e.g., every 15–20 seconds) forces the cellular radio into high-power transmit mode continuously.",
    explanation: "Carrier-Grade NAT (CGNAT) routers in 4G/5G mobile networks aggressively close idle UDP NAT state mappings after 30 to 60 seconds. To keep the tunnel alive, the VPN must transmit periodic keepalives. On mobile smartphones, this continuous radio wake-up drains battery life rapidly.",
    hint: "Waking up the phone's cellular antenna every 15 seconds prevents the phone from going to sleep.",
    level: "Basic",
    codeExample: `// WireGuard PersistentKeepalive Directive:
// PersistentKeepalive = 25  # Sends empty packet every 25s to keep home NAT table open`
  },
  {
    id: 11,
    question: "What is 'Perfect Forward Secrecy' (PFS) in VPN session key negotiation and how is it achieved?",
    shortAnswer: "A cryptographic property ensuring that even if the server's long-term private master key is compromised in the future, past session traffic remains completely undecryptable because each session uses ephemeral Diffie-Hellman / ECDH keys.",
    explanation: "Without PFS, an adversary recording encrypted traffic today could decrypt all past sessions if they steal the server's RSA private key five years later. With PFS (using ECDH Curve25519 or DH Group 14+), unique session keys are generated dynamically and discarded immediately after use.",
    hint: "Burning the temporary session encryption key as soon as the call ends so old recordings can never be unlocked.",
    level: "Expert",
    codeExample: `// IPsec IKEv2 PFS Proposal:
// ike = aes256gcm16-prfsha384-ecp384!   # Uses Elliptic Curve DH (P-384) for Ephemeral Key Exchange`
  },
  {
    id: 12,
    question: "How do you test and determine the exact Path MTU to a remote VPN gateway using the ping command?",
    shortAnswer: "By sending ICMP packets with the 'Don't Fragment' (DF) bit enabled and incrementing the payload size until the packet drops without response.",
    explanation: "On Windows, use `ping -f -l <size> <target_ip>`. On Linux, use `ping -M do -s <size> <target_ip>`. If `ping -f -l 1472` succeeds (1472 + 28B IP/ICMP = 1500B MTU), the path supports standard MTU. If it fails, decrease the size until it succeeds to find the exact PMTU limit.",
    hint: "Testing what size package gets stuck in the mailbox by gradually increasing package dimensions.",
    level: "Basic",
    codeExample: `// Windows PMTU Discovery:
> ping -f -l 1472 10.14.0.1  # Packet needs to be fragmented but DF set.
> ping -f -l 1420 10.14.0.1  # Reply from 10.14.0.1: bytes=1420 time=18ms (PMTU Found = 1420 + 28 = 1448B)`
  },
  {
    id: 13,
    question: "Why do residential PPPoE broadband connections (common in India) have a physical MTU of 1492 instead of 1500 bytes?",
    shortAnswer: "Point-to-Point Protocol over Ethernet (PPPoE) encapsulates PPP frames inside Ethernet, adding an 8-byte PPPoE header (6B PPPoE + 2B PPP protocol ID), reducing the usable payload from 1500 to 1492 bytes.",
    explanation: "When remote workers in Barrackpore or Kolkata use BSNL or Airtel FTTH broadband with PPPoE, the baseline MTU is 1492. If a VPN tunnel adding 60 bytes of overhead is launched on top, the effective tunnel MTU drops to 1432 bytes. Without MSS clamping, standard 1500-byte packets suffer immediate fragmentation.",
    hint: "Residential fiber broadband uses 8 bytes for login authentication headers, shrinking the starting MTU to 1492.",
    level: "Moderate",
    codeExample: `// PPPoE MTU Calculation:
// Standard Ethernet (1500B) - PPPoE Header (8B) = 1492B Physical WAN MTU
// Effective Tunnel MTU = 1492B - 60B (IPsec ESP) = 1432B Effective Tunnel MTU`
  },
  {
    id: 14,
    question: "What is 'Dead Peer Detection' (DPD) in IPsec IKEv2 and how does it prevent orphan zombie tunnels?",
    shortAnswer: "A heartbeat mechanism where VPN gateways exchange periodic informational request/response messages to verify that the remote peer is still reachable, tearing down stale cryptographic Security Associations (SAs) if heartbeats fail.",
    explanation: "If a remote employee closes their laptop lid or loses cellular coverage without sending an explicit `IKE_DELETE` notification, the VPN server would keep the tunnel open in memory indefinitely, wasting IP addresses and routing resources. DPD detects the dead peer within seconds and cleans up state tables.",
    hint: "Checking if the person on the other end of the phone has hung up when they suddenly go silent.",
    level: "Moderate",
    codeExample: `// strongSwan ipsec.conf DPD Configuration:
// dpdaction = clear       # Clean up tunnel on peer failure
// dpddelay  = 30s         # Send keepalive probe every 30 seconds
// dpdtimeout = 120s       # Declare peer dead after 120s of silence`
  },
  {
    id: 15,
    question: "How does hardware cryptographic acceleration (AES-NI) affect VPN gateway throughput and latency?",
    shortAnswer: "AES-NI executes AES encryption and decryption operations directly in dedicated CPU silicon instructions, increasing cryptographic throughput by 400% to 800% while drastically reducing CPU utilization and latency.",
    explanation: "Software-only AES computation consumes heavy CPU clock cycles, limiting gateway throughput to a few hundred megabits. With Intel/AMD AES-NI instructions enabled, modern server CPUs can encrypt and decrypt AES-GCM payloads at multi-gigabit line rates with sub-millisecond crypto latency.",
    hint: "Using a dedicated hardware math chip on the CPU to encrypt data at lightning speed.",
    level: "Moderate",
    codeExample: `// Checking for AES-NI hardware support on Linux:
$ grep -m1 -o 'aes' /proc/cpuinfo
// Output: aes (Hardware AES acceleration is active!)`
  },
  {
    id: 16,
    question: "What is 'Anti-Replay Window' in IPsec and how does packet reordering on multi-path WAN links cause false packet drops?",
    shortAnswer: "A 64- or 128-packet sliding window tracked by 32-bit sequence numbers to prevent replay attacks; if packets arrive out-of-order beyond the window size due to multi-path routing, the receiver drops them as suspected replays.",
    explanation: "Attackers can intercept valid encrypted packets and re-inject them later to duplicate transactions. IPsec checks sequence numbers against its sliding window. On bonding or multi-path WAN connections where packets travel over paths with differing latencies, legitimate delayed packets fall behind the window and are dropped.",
    hint: "A sliding checklist that checks off sequence numbers to ensure old duplicate tickets cannot be re-used.",
    level: "Expert",
    codeExample: `// Increasing Anti-Replay Window in Linux strongSwan:
// charon.replay_window = 128  # Increases sliding window size to accommodate high-jitter multi-path links`
  },
  {
    id: 17,
    question: "What are 'Jumbo Frames' (9000-byte MTU) and where are they safely deployed in enterprise VPN architectures?",
    shortAnswer: "Ethernet frames with MTUs up to 9000 bytes, deployed strictly in dedicated datacenter-to-datacenter site-to-site VPNs and private AWS DirectConnect / MPLS circuits where all intermediate switches support jumbo frames.",
    explanation: "Jumbo frames dramatically reduce CPU interrupt overhead during high-volume server backups and database replication. However, they can NEVER be used on public internet remote access VPNs because public internet transit routers strictly enforce the 1500-byte Ethernet standard.",
    hint: "Extra-large shipping containers used only between private factory warehouses, never on residential city streets.",
    level: "Moderate",
    codeExample: `// Datacenter Interface Jumbo Frame Configuration:
$ sudo ip link set dev eth1 mtu 9000`
  },
  {
    id: 18,
    question: "What is 'Bufferbloat' in VPN gateways and how does it destroy interactive VoIP and SSH performance?",
    shortAnswer: "Excessive packet buffering in oversized router queues that introduces hundreds of milliseconds of latency and jitter under heavy load, making real-time voice calls stutter and interactive terminal typing lag.",
    explanation: "When a remote employee initiates a large file download over a congested link, poorly configured VPN gateways buffer excessive packets rather than dropping them early. This queue delay increases round-trip latency from 20ms to 600ms. The solution is implementing Active Queue Management (AQM) like FQ-CoDel or CAKE.",
    hint: "A massive line at the post office that makes urgent express letters wait behind hundreds of heavy bulk packages.",
    level: "Expert",
    codeExample: `// Enabling FQ-CoDel Active Queue Management on Linux Gateway:
$ sudo tc qdisc add dev tun0 root fq_codel`
  },
  {
    id: 19,
    question: "What are the security risks of 'Key Escrow' and how should Master CA Private Keys be stored?",
    shortAnswer: "Storing master private keys in centralized software files exposes all enterprise certificates to theft; master CA keys must be generated and stored inside certified Hardware Security Modules (HSM - FIPS 140-2 Level 3) with offline air-gapping.",
    explanation: "If an adversary compromises the root CA private key, they can forge valid client and server certificates indefinitely, bypassing all authentication and SSL inspection controls. Enterprise Root CAs must remain offline, while Intermediate CAs operate inside hardware HSM appliances.",
    hint: "Keeping the master stamping seal locked inside an offline bank safe rather than on an office desk.",
    level: "Expert",
    codeExample: `// PKI Hierarchy:
// [Offline Root CA (Stored in Safe)] ──(Signs Once)──> [Online Intermediate CA (HSM Hardware)] ──> [Client Certs]`
  },
  {
    id: 20,
    question: "How does WireGuard's 'Cryptographic Routing' fundamentally simplify key management compared to IPsec IKEv2?",
    shortAnswer: "WireGuard binds a static 32-byte Curve25519 public key directly to an internal IP address inside a simple configuration table, eliminating complex multi-phase IKE negotiations, certificate chains, and dynamic state machines.",
    explanation: "In IPsec, establishing a connection requires Phase 1 (ISAKMP SA) and Phase 2 (IPsec SA) negotiations with extensive cipher proposals. WireGuard behaves like SSH: the server configuration file simply lists `PublicKey = <key>` and `AllowedIPs = 10.14.0.45/32`. Encrypted packets are routed strictly based on matching public keys in the kernel table.",
    hint: "Matching public keys directly to IP addresses in a small address book, exactly like SSH authorized_keys.",
    level: "Basic",
    codeExample: `// WireGuard Server Configuration (/etc/wireguard/wg0.conf):
// [Peer]
// PublicKey = xT5nJ6uK...= (Susmita's Laptop)
// AllowedIPs = 10.14.0.45/32`
  },
  {
    id: 21,
    question: "What is 'IKE Rekeying' and why must it be triggered by both time intervals and transmitted byte counts?",
    shortAnswer: "Generating fresh session keys periodically (e.g., every 8 hours or every 4 GB of data) to prevent keystream analysis, sequence number overflow, and birthday attacks against block ciphers.",
    explanation: "In high-throughput 10 Gbps links, a 32-bit sequence number space ($2^{32} \\approx 4.29 \\times 10^9$ packets) can wrap around in minutes. If sequence numbers repeat with the same key, replay protection fails and ciphers become vulnerable. Rekeying refreshes keys before sequence numbers exhaust.",
    hint: "Changing encryption locks every few hours or after shipping a certain amount of data so keys never wear out.",
    level: "Expert",
    codeExample: `// IPsec Rekeying Directives in ipsec.conf:
// lifetime = 8h       # Time-based rekeying interval
// lifebytes = 2000000000 # Byte-based rekeying (2 GB)`
  },
  {
    id: 22,
    question: "How do 'Asymmetric Routing' paths cause stateful VPN firewalls to drop legitimate return packets?",
    shortAnswer: "When outbound packets exit through Gateway A while return packets enter through Gateway B; because Gateway B never saw the initial TCP SYN handshake, its state table drops the return packets as invalid.",
    explanation: "In redundant dual-homed datacenter environments, BGP or ISP routing discrepancies can send traffic out one link and receive replies on another. Stateful firewalls require symmetrical inspection of TCP flags (SYN, SYN-ACK, ACK) to maintain connection state tables.",
    hint: "Leaving the building through the front door and trying to return through the back door without a re-entry pass.",
    level: "Moderate",
    codeExample: `// Asymmetric Routing Drop:
// [Client] ──(Outbound SYN)──> [Datacenter Gateway A (State Created)] ──> [Server]
// [Client] <──(Return SYN-ACK)── [Datacenter Gateway B (NO STATE: DROPPED!)] 🠔 [Server]`
  },
  {
    id: 23,
    question: "What is the 'Quantum Computing Threat' to modern VPN key exchange algorithms (RSA and Diffie-Hellman)?",
    shortAnswer: "Shor's Algorithm running on a sufficiently powerful quantum computer will solve the discrete logarithm and integer factorization problems in polynomial time, breaking RSA, ECDSA, and standard Diffie-Hellman key exchanges.",
    explanation: "Adversaries are currently executing 'Harvest Now, Decrypt Later' (HNDL) attacks, capturing encrypted VPN handshakes today to decrypt them once quantum computers mature. Organizations must migrate to Post-Quantum Hybrid IKEv2 and WireGuard algorithms (such as Kyber-768 / ML-KEM).",
    hint: "Future super-powerful quantum computers will break today's math puzzles unless we upgrade to quantum-resistant encryption.",
    level: "Expert",
    codeExample: `// Post-Quantum Hybrid Key Exchange:
// IKEv2 Proposal: ECDH Curve25519 (Classical) + CRYSTALS-Kyber-768 (Quantum-Resistant Lattice)`
  },
  {
    id: 24,
    question: "How do you diagnose an MTU fragmentation issue using Wireshark on a VPN interface?",
    shortAnswer: "Look for 'Fragmentation Needed (DF set)' ICMP packets in the capture trace, repeated TCP Retransmissions on large segments, and TCP Dup ACKs indicating missing data chunks.",
    explanation: "Filtering Wireshark for `icmp.type == 3 and icmp.code == 4` reveals router drop notifications. If ICMP is blocked, filtering for `tcp.analysis.retransmission` on packets with length > 1400 bytes confirms PMTU Black Hole behavior.",
    hint: "Using network packet capture to look for red warning flags on large file transfer packets.",
    level: "Moderate",
    codeExample: `// Wireshark Filter for MTU Troubleshooting:
// icmp.type == 3 and icmp.code == 4 || (tcp.len > 1300 and tcp.analysis.retransmission)`
  },
  {
    id: 25,
    question: "What is 'Split-DNS' configuration and how does it prevent internal domain lookups from resolving on public DNS?",
    shortAnswer: "Configuring the VPN client OS to direct DNS queries for internal company domains (e.g., `*.internal.corp`) strictly to corporate DNS servers while sending public queries to local ISP resolvers.",
    explanation: "Without Split-DNS, the client either sends all lookups to public DNS (breaking internal website names) or sends all queries to corporate DNS (wasting VPN gateway bandwidth). Split-DNS uses client-side routing rules to route DNS requests conditionally based on domain suffixes.",
    hint: "A smart phonebook that looks up company names in the private company directory and general names on Google.",
    level: "Basic",
    codeExample: `// Windows NRPT (Name Resolution Policy Table) Rule:
// Add-DnsClientNrptRule -Namespace ".internal.corp" -DnsServers "10.14.0.53"`
  },
  {
    id: 26,
    question: "Why does L2TP/IPsec suffer from higher latency and CPU utilization compared to native IPsec ESP?",
    shortAnswer: "Because L2TP/IPsec implements double encapsulation: Layer 2 PPP frames are wrapped inside L2TP headers, which are wrapped inside UDP 1701, and then wrapped inside IPsec ESP, requiring multi-stage packet processing.",
    explanation: "This double encapsulation adds 76+ bytes of header overhead per packet and requires the operating system kernel to pass packets through multiple virtual network stacks (PPP driver, L2TP daemon, and IPsec crypto engine), causing higher CPU context switching and latency.",
    hint: "Putting a package inside a box, inside another box, inside a wooden crate before shipping it.",
    level: "Moderate",
    codeExample: `// L2TP/IPsec Overhead Breakdown:
// [ IPsec ESP (56B) ] + [ UDP 1701 (8B) ] + [ L2TP Header (8B) ] + [ PPP Header (4B) ] = 76+ Bytes Overhead!`
  },
  {
    id: 27,
    question: "What is an 'Emergency Certificate Revocation Workflow' when an enterprise laptop is reported stolen?",
    shortAnswer: "The SOC immediately publishes the stolen device's certificate serial number to the CRL/OCSP responder, terminates active VPN sessions on the gateway, and revokes Active Directory / IdP tokens.",
    explanation: "Speed is paramount during physical theft. The security administrator runs a single script to revoke the certificate, which triggers real-time OCSP status updates to all VPN concentrators, severing the stolen device's access within seconds.",
    hint: "Instantly cancelling a lost credit card so no one can swipe it.",
    level: "Basic",
    codeExample: `// OpenSSL Emergency Certificate Revocation Command:
$ openssl ca -revoke /etc/pki/certs/stolen_laptop.crt -keyfile ca_key.pem -cert ca.crt
$ openssl ca -gencrl -out /var/www/html/crl/corporate.crl`
  },
  {
    id: 28,
    question: "How does 'MSS Clamping' differ between IPv4 and IPv6 traffic?",
    shortAnswer: "IPv6 headers are 40 bytes (compared to 20 bytes for IPv4); therefore, IPv6 MSS clamping must reduce the segment size by an additional 20 bytes (e.g., MSS = 1340 bytes for IPv6 vs 1360 bytes for IPv4).",
    explanation: "Because IPv6 has fixed 40-byte base headers with optional extension headers, the available payload inside the same 1500-byte MTU frame is 20 bytes smaller. If administrators apply IPv4 MSS values to IPv6 tunnels, fragmentation still occurs.",
    hint: "IPv6 uses a bigger address header, so you must shrink the data payload by another 20 bytes.",
    level: "Moderate",
    codeExample: `// Linux ip6tables MSS Clamping:
$ sudo ip6tables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu`
  },
  {
    id: 29,
    question: "What is 'Route Flapping' in dynamic VPN routing protocols (BGP over IPsec) and how is it suppressed?",
    shortAnswer: "Rapid, continuous state oscillations where an IPsec tunnel drops and reconnects repeatedly, causing BGP to broadcast route withdrawals and updates across the entire corporate WAN; suppressed using BGP Route Dampening.",
    explanation: "When an unstable internet link causes a VPN tunnel to bounce every 10 seconds, dynamic routing protocols flood the network with recalculations, overloading router CPUs. Route Dampening penalizes flapping routes, temporarily suppressing them until stability is restored.",
    hint: "Putting a noisy, flickering light switch on a temporary timeout so it stops distracting the entire room.",
    level: "Expert",
    codeExample: `// Cisco BGP Route Dampening Configuration:
// router bgp 65001
//  bgp dampening 15 750 2000 60`
  },
  {
    id: 30,
    question: "What is the comprehensive Checklist for optimizing production enterprise VPN performance and reliability?",
    shortAnswer: "1. Enforce UDP-based tunneling; 2. Configure TCP MSS Clamping on all gateways; 3. Enable AES-NI hardware acceleration; 4. Automate PKI certificate rotation via SCEP/EST; 5. Deploy DPD and keepalives with power-aware timers; 6. Maintain 100% Dark Cloud ZTNA posture.",
    explanation: "Production VPN stability requires addressing protocol overhead, path MTU dynamics, cryptographic scalability, and transport resilience in a unified engineering workflow.",
    hint: "UDP + MSS Clamping + Hardware Crypto + Automated PKI + Power-friendly Keepalives.",
    level: "Basic",
    codeExample: `// Production Tuning Summary:
// Transport : UDP 51820 (WireGuard) / UDP 4500 (IPsec NAT-T)
// MSS       : Clamped to 1360 Bytes (iptables TCPMSS)
// Crypto    : AES-256-GCM (AES-NI accelerated) or ChaCha20-Poly1305
// Auth      : Automated X.509 SCEP with OCSP Stapling`
  }
];

export default questions;
