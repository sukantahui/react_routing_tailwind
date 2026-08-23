const questions = [
  {
    question: "What is the fundamental distinction between an Active Attack and a Passive Attack under RFC 4949 and ISO 7498-2?",
    shortAnswer: "A passive attack attempts to learn or make use of information from the system without affecting system resources, whereas an active attack attempts to alter system resources or affect their operation.",
    explanation: "Under RFC 4949 (Internet Security Glossary) and ISO 7498-2 (Security Architecture), the core criterion is system state modification. Passive attacks (eavesdropping, traffic analysis) do not modify data, inject packets, or degrade availability. Active attacks (message tampering, masquerade, replay, DoS) actively alter data in transit, impersonate entities, or disrupt operational availability.",
    hint: "Think about whether data is merely observed or actively altered/disrupted.",
    level: "moderate",
    codeExample: `// Threat Classification Matrix:
// Passive: Attacker reads payload -> System state unchanged -> Log traces: 0
// Active:  Attacker modifies payload -> System state corrupted -> Log traces: Generated`
  },
  {
    question: "How does the CIA Triad map directly to Active and Passive cyber attacks?",
    shortAnswer: "Passive attacks primarily violate Confidentiality, whereas Active attacks violate Integrity and Availability (and often Authenticity/Non-Repudiation).",
    explanation: "Passive attacks focus on unauthorized information disclosure (Confidentiality breach) while leaving data integrity intact. Active attacks deliberately alter payloads, inject unauthorized commands, or flood services, directly violating Integrity (unauthorized modification) and Availability (denial of access).",
    hint: "Passive = C (Confidentiality); Active = I (Integrity) & A (Availability).",
    level: "moderate",
    codeExample: `// CIA Threat Mapping:
// Confidentiality Attack ➔ Passive (Sniffing cleartext passwords in transit)
// Integrity Attack       ➔ Active  (Tampering with UPI transaction amount from ₹500 to ₹50,000)
// Availability Attack    ➔ Active  (SYN Flood knocking out Kolkata banking gateway)`
  },
  {
    question: "Why is the detection of Passive Attacks considered virtually impossible in traditional network topologies?",
    shortAnswer: "Because passive attacks do not alter data, inject packets, or cause latency, leaving zero evidence or logs on intermediate routing appliances.",
    explanation: "When an adversary passively taps an optical fiber or puts a network interface into promiscuous mode on a hub/shared broadcast domain, the target system behaves exactly as normal. No crash dumps, failed authentication logs, or checksum errors are generated. Therefore, security strategy focuses on prevention (strong encryption) rather than detection.",
    hint: "No logs, no latency, no data modification means no alarms.",
    level: "moderate",
    codeExample: `// Promiscuous Sniffing Impact:
// Interface eth0 entered promiscuous mode -> Packets captured in RAM
// Outbound traffic generated: 0 bytes
// Target Server Status: 200 OK (Completely unaware of eavesdropper)`
  },
  {
    question: "What is Traffic Analysis, and why is it classified as a Passive Attack even when data is encrypted?",
    shortAnswer: "Traffic analysis observes packet patterns, transmission frequency, packet sizes, and communicating IP addresses to infer sensitive behavioral intelligence without decrypting the payload.",
    explanation: "Even if end-to-end encryption (e.g. TLS 1.3 or IPsec) prevents payload inspection, an adversary can analyze metadata: burst frequency, burst duration, and volume. For example, sudden high-frequency communication between military command and a regional base in Barrackpore reveals imminent activity without reading message contents.",
    hint: "You don't need to read the letter if you can see who is mailing whom and how often.",
    level: "moderate",
    codeExample: `// Traffic Analysis Inference:
// Encrypted Packet: [Header: Src=192.168.1.10, Dst=10.0.0.5, Size=1420B, Time=02:00:01]
// Observation: 50,000 packets/sec at 02:00 AM between DB and Backup Node
// Inferred: Scheduled off-site database replication taking place`
  },
  {
    question: "What is Traffic Padding, and how does it neutralize Traffic Analysis attacks?",
    shortAnswer: "Traffic padding generates continuous streams of dummy encrypted packets to maintain a constant data rate, masking true transmission bursts and communication patterns.",
    explanation: "By injecting pseudo-random ciphered dummy data whenever the genuine communication channel is idle, the overall bandwidth utilization remains 100% flat. An adversary monitoring the link cannot distinguish real encrypted messages from dummy padding, neutralizing traffic rate and volume analysis.",
    hint: "Keep the pipe completely full so no one can tell when real water flows.",
    level: "expert",
    codeExample: `// Traffic Padding Rate Control:
// Real Data:  [--Data--] [--------Idle--------] [--Data--]
// Padded Bus: [--Data--] [--DummyPaddingEnc--] [--Data--] (Constant 100 Mbps throughput)`
  },
  {
    question: "What are the four primary classifications of Active Attacks defined in computer security literature?",
    shortAnswer: "1. Masquerade (Impersonation); 2. Replay (Re-transmission of valid data); 3. Modification of Messages (Tampering); 4. Denial of Service (Service disruption).",
    explanation: "These four categories represent distinct attack mechanics: Masquerade impersonates an authorized identity using stolen credentials or forged headers; Replay re-sends previously captured valid packets; Modification alters message content or order; DoS prevents legitimate users from accessing services or resources.",
    hint: "M-R-M-D: Masquerade, Replay, Modification, Denial of Service.",
    level: "moderate",
    codeExample: `// 4 Active Attack Types:
// 1. Masquerade   : Attacker poses as Bank Admin Mamata
// 2. Replay       : Attacker re-submits authenticated ₹10,000 transfer token
// 3. Modification : Attacker modifies beneficiary account number in transit
// 4. DoS          : Attacker exhausts database connection pool`
  },
  {
    question: "How does a Replay Attack work, and why does encrypting the payload fail to prevent it on its own?",
    shortAnswer: "A replay attack captures a valid encrypted transmission and resends it later; because the payload was validly encrypted, the receiving server may decrypt and execute it again if replay protections are missing.",
    explanation: "Encryption guarantees confidentiality, not freshness. If Susmita sends an encrypted payload `E_k('Pay ₹5,000 to Debangshu')`, an attacker can intercept and store this exact ciphertext without decrypting it. If the attacker re-transmits the ciphertext 10 times, an unprotected receiver will process ₹50,000 in unauthorized transfers.",
    hint: "Old valid keys will open the door again unless time-checks or nonces are enforced.",
    level: "expert",
    codeExample: `// Vulnerable vs Protected Replay Handler:
// Vulnerable: executeTransaction(decrypt(payload)); // Executes every time
// Protected:  if (seenNonces.has(payload.nonce) || isExpired(payload.timestamp)) reject();`
  },
  {
    question: "What cryptographic mechanisms prevent Replay Attacks across network protocols?",
    shortAnswer: "1. Cryptographic Nonces (Numbers Used Once); 2. Monotonic Sequence Numbers; 3. Synchronized Timestamps with strict time-to-live (TTL) sliding windows.",
    explanation: "To guarantee message freshness: Nonces ensure each handshake exchange is uniquely randomized; Monotonic Sequence numbers (used in IPsec ESP and TLS Record Layer) detect duplicate packet arrival; Timestamps (used in Kerberos tickets and AWS SigV4) reject any payload older than a tight window (e.g. 5 minutes).",
    hint: "Nonces, sequence counters, and tight expiration windows.",
    level: "expert",
    codeExample: `// HMAC Request Signing with Timestamp & Nonce:
const message = {
  account: "Susmita_Kolkata_01",
  amount: 5000,
  nonce: "d8e8fca2-8a21-4f91",
  timestamp: 1718002400 // Current Epoch Time
};
const signature = hmac_sha256(secretKey, JSON.stringify(message));`
  },
  {
    question: "What is a Masquerade Attack, and how does it differ from a Man-in-the-Middle (MitM) attack?",
    shortAnswer: "In a masquerade, the attacker directly pretends to be an authorized entity to a single target; in MitM, the attacker places themselves between two communicating parties, impersonating each to the other.",
    explanation: "A masquerade is a one-sided identity forgery (e.g., sending an IP-spoofed packet or logging in with stolen credentials). A MitM attack is bilateral and interactive: the attacker intercepts traffic between Client Mamata and Server Kolkata, establishing independent secure sessions with both sides to eavesdrop or modify live communications transparently.",
    hint: "Masquerade is impersonation to one; MitM is standing silently between two communicating parties.",
    level: "moderate",
    codeExample: `// Masquerade vs MitM:
// Masquerade: Attacker ➔ Target Server (claims "I am Mamata")
// MitM:       Client Mamata ➔ Attacker (acting as Server) ➔ Target Server (acting as Mamata)`
  },
  {
    question: "How does Message Authentication Code (MAC / HMAC) protect against Active Message Modification attacks?",
    shortAnswer: "A MAC uses a shared secret key and cryptographic hash to generate a verifiable tag; any modification to the payload in transit causes verification failure at the receiver.",
    explanation: "When sender Mamata transmits message `M`, she computes `Tag = HMAC_K(M)` and sends `(M, Tag)`. If an active attacker alters even a single bit of `M` to `M'`, the receiver computes `HMAC_K(M') != Tag` because the attacker lacks the secret key `K` to forge a valid tag for `M'`. The corrupted message is immediately dropped.",
    hint: "A keyed tamper-evident digital seal.",
    level: "moderate",
    codeExample: `// Message Integrity Verification:
const computedTag = crypto.createHmac('sha256', sharedSecret).update(receivedPayload).digest('hex');
if (computedTag !== receivedTag) {
  throw new SecurityException("Tampering Detected! Message dropped.");
}`
  },
  {
    question: "Why are Passive Attacks addressed primarily via Prevention, whereas Active Attacks require both Detection and Prevention?",
    shortAnswer: "Passive attacks produce no system anomalies to detect, so strong preventative encryption is mandatory; Active attacks cause measurable disruptions that must be detected immediately by IDS/SIEM while layered defenses prevent damage.",
    explanation: "Because you cannot detect an adversary silently reading radio waves or tapped fiber, prevention (AES-256-GCM, TLS 1.3) is the only realistic defense against passive threats. For active attacks, preventative controls (firewalls, mTLS, input validation) stop known vectors, but dynamic detection (IDS/IPS, anomaly baselines) is required to intercept zero-day intrusions and alert SOC teams.",
    hint: "You cannot hear a whisperer (prevent only), but you can spot a vandal (detect and prevent).",
    level: "moderate",
    codeExample: `// Defense Philosophy:
// Passive Defense Strategy: Prevention 100% (End-to-End Cryptography & Zero-Knowledge)
// Active Defense Strategy:  Prevention (WAF/MFA/Firewall) + Detection (SIEM/IDS/XDR) + Response`
  },
  {
    question: "What is an Eavesdropping Attack at Layer 2 (Data Link), and how does ARP Spoofing facilitate it?",
    shortAnswer: "ARP spoofing poisons switch ARP caches with fake MAC-to-IP mappings, redirecting subnet traffic through the attacker's machine to enable passive eavesdropping.",
    explanation: "In an Ethernet LAN (e.g. in a Jadavpur computer lab), switches isolate unicast traffic. An attacker sends gratuitous ARP responses claiming their MAC owns the Gateway IP. Victim machines update their ARP tables and forward all outbound traffic to the attacker, who silently logs cleartext packets before forwarding them onward.",
    hint: "Poisoning the local phonebook so all neighborhood calls ring at the attacker's desk.",
    level: "expert",
    codeExample: `// ARP Poisoning Command:
// arpspoof -i eth0 -t 192.168.1.50 (Victim Mamata) 192.168.1.1 (Gateway)
// Result: Mamata's default gateway MAC changed to Attacker's NIC MAC`
  },
  {
    question: "What mitigation techniques eliminate Layer 2 ARP-based Eavesdropping and Active Spoofing?",
    shortAnswer: "Dynamic ARP Inspection (DAI), DHCP Snooping, Port Security (802.1X), and static ARP bindings on critical servers.",
    explanation: "Dynamic ARP Inspection (DAI) on managed enterprise switches intercepts all ARP requests and responses. The switch validates each ARP packet against a trusted DHCP Snooping binding database. If an unauthorized node attempts to advertise an IP that does not match its assigned MAC, the switch drops the packet and disables the port.",
    hint: "Switch-level verification using DHCP Snooping binding tables.",
    level: "expert",
    codeExample: `// Cisco Switch Enterprise Mitigation:
// switch(config)# ip dhcp snooping
// switch(config)# ip arp inspection vlan 10
// switch(config-if)# ip arp inspection limit rate 15`
  },
  {
    question: "What is a Denial of Service (DoS) attack, and why is it classified as an Active Attack on Availability?",
    shortAnswer: "A DoS attack actively exhausts system resources (bandwidth, CPU, memory, connection tables) to prevent legitimate users from accessing services.",
    explanation: "DoS is active because it floods the target with malicious or malformed traffic (e.g., SYN Floods, UDP Amplification, HTTP Slowloris). This actively alters the operational state of the target system, forcing buffer overflows, thread exhaustion, or network link saturation, directly violating the Availability pillar of the CIA triad.",
    hint: "Overwhelming the server with fake work so real customers cannot get served.",
    level: "moderate",
    codeExample: `// TCP SYN Flood Resource Depletion:
// Attacker sends 1,000,000 SYN packets with spoofed source IPs
// Server allocates TCB (Transmission Control Block) in memory for each half-open connection
// Result: Memory exhausted, legitimate connections dropped`
  },
  {
    question: "How do SYN Cookies prevent active TCP SYN Flood Denial of Service attacks?",
    shortAnswer: "The server encodes the connection state into the initial SYN-ACK sequence number instead of allocating kernel memory, only allocating resources upon receiving a valid client ACK.",
    explanation: "Under a SYN flood, traditional servers exhaust backlog queues storing half-open states. With SYN Cookies enabled (RFC 4987), the server computes `Initial Seq = CryptographicHash(SrcIP, DstIP, SrcPort, DstPort, SecretKey, Timestamp)`. No memory is allocated. When the client returns `ACK = Seq + 1`, the server recomputes the hash to verify authenticity before creating the socket.",
    hint: "Stateless verification: don't store a ticket in memory; encode the ticket into the sequence number.",
    level: "expert",
    codeExample: `// Linux Kernel SYN Cookie Activation:
// sysctl -w net.ipv4.tcp_syncookies=1
// Verification: Is (AckNum - 1) == Hash(IPs, Ports, Secret, Timestamp)? If yes -> establish connection`
  },
  {
    question: "What is Man-in-the-Middle (MitM) SSL/TLS Stripping, and is it an Active or Passive attack?",
    shortAnswer: "It is an Active Attack where an attacker intercepts initial HTTP redirection and transparently downgrades the client's connection to unencrypted HTTP while maintaining HTTPS with the server.",
    explanation: "Tools like SSLstrip intercept the `301/302 Redirect` from `http://` to `https://`. The attacker communicates with the banking server over HTTPS (port 443) but serves plain HTTP (port 80) to the victim. Because the attacker actively modifies headers, rewrites URLs, and strips cryptographic handshakes, it is a high-severity active attack.",
    hint: "Active manipulation of protocol handshakes to downgrade encryption.",
    level: "expert",
    codeExample: `// SSL Stripping Flow:
// Mamata Browser ➔ [Plain HTTP] ➔ Attacker (Proxy) ➔ [Encrypted HTTPS] ➔ Kolkata Bank
// Defense: HTTP Strict Transport Security (HSTS) with preloading in browsers`
  },
  {
    question: "How does HTTP Strict Transport Security (HSTS) eliminate active SSL Stripping attacks?",
    shortAnswer: "HSTS instructs browsers to automatically enforce HTTPS connections without ever attempting an initial plaintext HTTP request, even if the user types http://.",
    explanation: "The server returns header `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. The browser caches this directive. On all subsequent visits, the browser internally upgrades `http://` to `https://` before sending any packet over the wire. This completely prevents MitM proxies from intercepting an unencrypted initial request.",
    hint: "Browser enforces HTTPS locally before touching the network card.",
    level: "moderate",
    codeExample: `// HSTS Header Configuration (Nginx):
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;`
  },
  {
    question: "How does an active Data Modification attack differ when targeting Data-in-Transit versus Data-at-Rest?",
    shortAnswer: "Data-in-transit modification tampers with packets flying across the wire (mitigated by TLS/IPsec HMACs); data-at-rest modification tampers with files on disk/databases (mitigated by file integrity monitoring and digital signatures).",
    explanation: "In-transit tampering modifies TCP/IP payloads on the fly (e.g. changing an IBAN/UPI VPA during packet transmission). In-rest tampering modifies database rows or executable binaries on a server disk (e.g. modifying SQL records or system binaries like `/bin/ls`). In-rest protection requires WORM storage, File Integrity Monitoring (Tripwire/AIDE), and signed database hashes.",
    hint: "Moving stream versus stationary storage.",
    level: "moderate",
    codeExample: `// Integrity Defense across States:
// In-Transit: TLS 1.3 AEAD (AES-GCM / ChaCha20-Poly1305)
// At-Rest:    Tripwire SHA-512 FIM + Signed Audit Ledgers + TPM Hardware Attestation`
  },
  {
    question: "Under the Indian Information Technology (IT) Act 2000, what legal penalties apply to unauthorized Passive Eavesdropping vs Active Hacking?",
    shortAnswer: "Section 43 & 66 penalize unauthorized access and data downloading with fines up to ₹1 Crore and imprisonment up to 3 years; Section 66F penalizes active cyber terrorism with life imprisonment.",
    explanation: "Under the IT Act 2000 (amended 2008): Section 43 penalizes unauthorized access, interception, and extraction of data (passive/active) with civil damages. Section 66 prescribes criminal penalties (up to 3 years imprisonment or ₹5 Lakhs fine) for fraudulent active hacking. If an active attack damages critical national infrastructure (e.g. power grid SCADA), Section 66F applies with punishment up to life imprisonment.",
    hint: "Civil liability under Sec 43; Criminal hacking under Sec 66; Cyber terrorism under Sec 66F.",
    level: "moderate",
    codeExample: `// Legal Summary (India IT Act 2000):
// Sec 43(a): Unauthorized access / data extraction -> Compensation up to ₹1 Crore
// Sec 66:    Hacking with malicious intent -> 3 Years Prison + ₹5 Lakh Fine
// Sec 66F:   Active Attack on Critical Grid -> Life Imprisonment`
  },
  {
    question: "What is the role of CERT-In regarding mandatory incident reporting for Active Cyber Attacks in India?",
    shortAnswer: "Under CERT-In directives (April 2022), all Indian organizations must report active cyber security incidents to CERT-In within 6 hours of noticing them.",
    explanation: "The Indian Computer Emergency Response Team (CERT-In) mandates that active intrusions—including ransomware outbreaks, data breaches, unauthorized server access, defacements, and DDoS attacks—must be formally reported within 6 hours. Organizations must also maintain synchronized NTP system logs within India for 180 days.",
    hint: "Mandatory 6-hour incident disclosure window to the national cyber agency.",
    level: "moderate",
    codeExample: `// CERT-In Compliance Directive:
// Incident Category: Ransomware / Unauthorized Access / DDoS > 10Gbps
// Statutory SLA: Report to incident@cert-in.org.in within 6 HOURS of detection
// Log Retention: 180 days of secure audit logs on Indian territory`
  },
  {
    question: "What is a Timing Side-Channel Attack, and how does it blur the line between Passive and Active attacks?",
    shortAnswer: "It passively measures subtle execution time variations in cryptographic operations or cache hits to mathematically recover secret private keys without active tampering.",
    explanation: "A timing attack passively observes how many nanoseconds a CPU takes to verify a password hash or calculate RSA modular exponentiation. If character comparison `string[i] == user[i]` breaks on the first mismatch, early exit leaks the secret byte-by-byte. While observation is passive, the attacker actively submits crafted input probes to measure responses.",
    hint: "Measuring the clock cycles of a processor to steal a secret key.",
    level: "expert",
    codeExample: `// Vulnerable vs Constant-Time String Comparison:
// Vulnerable: for(let i=0; i<a.length; i++) if (a[i] !== b[i]) return false; // Timing leak!
// Secure:     crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b)); // Constant time`
  },
  {
    question: "How does Session Hijacking transition from a Passive Sniffing attack into an Active Impersonation attack?",
    shortAnswer: "The attacker first passively sniffs an unencrypted session token (cookie/JWT) and then actively uses that stolen token to issue unauthorized requests impersonating the victim.",
    explanation: "This is a two-phase hybrid attack: Phase 1 (Passive) eavesdrops on cleartext Wi-Fi traffic in a Kolkata cafe to capture `Cookie: session_id=abc123xyz`. Phase 2 (Active) injects `session_id=abc123xyz` into the attacker's HTTP headers, bypassing authentication to withdraw funds or alter profile data.",
    hint: "Listen silently first to steal the badge, then put on the badge to walk through the door.",
    level: "moderate",
    codeExample: `// 2-Phase Hybrid Attack Progression:
// Step 1 (Passive): Wireshark captures HTTP GET /dashboard -> Cookie: SESSION=auth_99812
// Step 2 (Active):  curl -H "Cookie: SESSION=auth_99812" https://api.bank.in/transfer`
  },
  {
    question: "What are the flags used on HTTP Cookies to prevent Passive Sniffing and Active Cross-Site Scripting (XSS) extraction?",
    shortAnswer: "1. `Secure` (prevents transmission over unencrypted HTTP); 2. `HttpOnly` (blocks JavaScript access); 3. `SameSite=Strict` (prevents CSRF token transmission).",
    explanation: "`Secure` ensures cookies are transmitted exclusively over encrypted TLS connections, neutralizing passive sniffing. `HttpOnly` prevents client-side scripts (`document.cookie`) from reading the session token, stopping active XSS token theft. `SameSite=Strict` blocks third-party cross-site requests, mitigating CSRF.",
    hint: "Secure + HttpOnly + SameSite=Strict.",
    level: "moderate",
    codeExample: `// Production Cookie Header:
Set-Cookie: sessionId=38afes7a8; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age=3600;`
  },
  {
    question: "In what way does an active IP Spoofing attack enable blind UDP Denial of Service amplification?",
    shortAnswer: "The attacker sends tiny request packets with the victim's spoofed IP address as the source to open DNS/NTP servers, causing massive response streams to flood the victim.",
    explanation: "Because UDP is connectionless and lacks a three-way handshake, an attacker can craft a 60-byte DNS `ANY` query with source IP set to victim Debangshu (`203.0.113.5`). The open DNS resolver sends a 4,000-byte response back to `203.0.113.5`. A 10 Mbps botnet query stream generates a devastating 600 Mbps reflection flood crashing the victim's router.",
    hint: "Forging the return address on a letter asking for an encyclopedia.",
    level: "expert",
    codeExample: `// DNS Amplification Math:
// Attacker Query: 64 bytes (Source IP forged as Target Susmita)
// DNS Server Answer: 3,200 bytes
// Amplification Factor = 3200 / 64 = 50x Bandwidth Multiplication!`
  },
  {
    question: "How does BCP 38 (Ingress/Egress Filtering) neutralize active IP Spoofing across internet service providers?",
    shortAnswer: "Routers inspect outbound packets and immediately drop any traffic whose source IP does not belong to the customer's allocated subnet range.",
    explanation: "Under Best Current Practice 38 (BCP 38 / RFC 2827), network edge switches and border routers enforce strict anti-spoofing access control lists (uRPF - Unicast Reverse Path Forwarding). If a customer in Barrackpore is assigned `198.51.100.0/24` but emits packets with source IP `8.8.8.8`, the border router drops the packet at the ingress port.",
    hint: "Check return address at the edge router before letting the packet leave the building.",
    level: "expert",
    codeExample: `// Cisco IOS uRPF Configuration:
// interface GigabitEthernet0/1
//  ip verify unicast source reachable-via rx (Strict Mode uRPF)`
  },
  {
    question: "What is an Active SQL Injection (SQLi) attack, and how does it manipulate database state?",
    shortAnswer: "An active attack where untrusted user input alters backend SQL query logic, enabling unauthorized reading, modification, or deletion of database tables.",
    explanation: "When an application concatenates user strings into SQL queries without parameterized queries, an attacker inputs `' OR '1'='1' --` or `'; DROP TABLE accounts; --`. This actively modifies the SQL syntax tree in the database engine, bypassing authentication or destroying production records.",
    hint: "Injecting executable SQL code into data fields.",
    level: "moderate",
    codeExample: `// Vulnerable vs Secure SQL:
// Vulnerable: "SELECT * FROM users WHERE name = '" + userInput + "'" // Breaks on ' OR 1=1 --
// Secure:     db.query("SELECT * FROM users WHERE name = ?", [userInput]); // Parameterized`
  },
  {
    question: "What is the difference between an Active Masquerade and a Phishing credential harvesting attack?",
    shortAnswer: "Phishing is a social engineering attack that tricks a human into revealing credentials; a Masquerade uses those credentials to impersonate the user to an authentication system.",
    explanation: "Phishing is the reconnaissance/acquisition phase: sending fake emails pretending to be a bank to trick Abhronila into entering her password on a clone site. Once the password is captured, the attacker executes an active Masquerade attack by logging into the actual bank with Abhronila's credentials.",
    hint: "Phishing fools the person; Masquerade fools the machine.",
    level: "moderate",
    codeExample: `// Attack Pipeline:
// Phase 1 (Social Engineering): Phishing email tricks employee -> Password harvested
// Phase 2 (Active Attack)     : Masquerade attack logs into corporate VPN using harvested password`
  },
  {
    question: "How does Mutual TLS (mTLS) provide comprehensive defense against both Passive Eavesdropping and Active Masquerade?",
    shortAnswer: "mTLS encrypts all communications with ephemeral asymmetric keys while cryptographically verifying digital X.509 certificates for both client and server.",
    explanation: "Standard TLS only authenticates the server. In mTLS, during the handshake, the server also requests `CertificateRequest` from the client. Both parties present and verify X.509 certificates against a trusted Certificate Authority (CA). This provides end-to-end encryption (stopping passive sniffing) and mutual cryptographic authentication (stopping active masquerade).",
    hint: "Two-way digital passport check: server proves who it is, and client proves who it is.",
    level: "expert",
    codeExample: `// mTLS Handshake Verification:
// Client -> ClientHello
// Server -> ServerHello + ServerCertificate + CertificateRequest
// Client -> ClientCertificate + CertificateVerify (signs handshake with private key)
// Result: 100% immune to unauthorized rogue client masquerade`
  },
  {
    question: "What is an Optical Fiber Tap, and why is it the gold standard example of a Physical Layer Passive Attack?",
    shortAnswer: "A clip-on optical coupler that slightly bends a fiber cable to leak a fraction of light signals without severing the link or causing noticeable attenuation.",
    explanation: "In optical macrobending taps, bending a fiber cable allows roughly 1% to 3% of the light photons to escape through the cladding. A photodiode receiver reads this leaked light and reconstructs the data stream. Because the remaining 97% of light reaches the receiver, link power monitors register minimal optical loss, leaving network operators completely unaware of the passive wiretap.",
    hint: "Bending glass fibers so light leaks out into a secret receiver without cutting the wire.",
    level: "expert",
    codeExample: `// Optical Tapping Physics:
// Original Signal Power: -3.0 dBm
// Post-Tap Signal Power: -3.2 dBm (0.2 dB loss is within standard dirty connector tolerance)
// Result: 10 Gbps unencrypted core backbone data cloned in real-time`
  },
  {
    question: "Synthesize an enterprise defense architecture that mitigates both Active and Passive cyber attacks in a high-security banking environment.",
    shortAnswer: "A Defense-in-Depth architecture combining TLS 1.3/mTLS encryption, FIDO2 MFA, BCP 38 ingress filtering, WAF with rate limiting, and SIEM/SOAR automated response.",
    explanation: "To address passive threats: All internal and external links mandate TLS 1.3 with AES-256-GCM, IPsec tunnel mode with ESP, and constant traffic padding for sensitive links. To address active threats: Zero Trust Network Access (ZTNA) with FIDO2 hardware tokens eliminates masquerade; HMACs and digital signatures eliminate tampering; cloud scrubbing and SYN cookies neutralize DoS; and 24/7 SIEM/SOC monitors telemetry for CERT-In compliance.",
    hint: "Layered security: encrypt everything for passive defense; authenticate, validate, and monitor everything for active defense.",
    level: "expert",
    codeExample: `// Enterprise Defense Architecture Blueprint:
// 1. Passive Defense Layer: TLS 1.3 + IPsec ESP + Constant Packet Padding + WORM Audit Storage
// 2. Active Auth Layer   : mTLS + FIDO2 Hardware WebAuthn + Least-Privilege RBAC
// 3. Active Packet Filter: WAF (ModSecurity) + Anti-Spoofing (uRPF/BCP 38) + Anycast DDoS Scrubbing
// 4. Detection & Response: Wazuh HIDS + Zeek NIDS + Elastic SIEM + Automated CERT-In 6-Hr Dispatch`
  }
];

export default questions;
