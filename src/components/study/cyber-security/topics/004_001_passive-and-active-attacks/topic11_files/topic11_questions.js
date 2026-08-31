const questions = [
  {
    question: "How do Active and Passive Cyber Attacks differ fundamentally in terms of System State Alteration (ΔS) and CIA Triad impact?",
    shortAnswer: "Passive attacks leave system state invariant (ΔS = ∅) and violate Confidentiality; Active attacks alter system state (ΔS ≠ ∅) and violate Integrity or Availability.",
    explanation: "A passive attack (eavesdropping, traffic analysis) intercepts and reads data without altering packet bytes, transmitting new packets, or modifying server memory (state remains unchanged). An active attack (tampering, masquerade, replay, DoS) injects, alters, delays, or drops data, directly altering database records, user permissions, or system availability.",
    hint: "Passive is looking through a window without touching anything; Active is breaking the lock or rearranging the furniture inside.",
    level: "basic",
    codeExample: `// Mathematical State Formalism:
// Passive: S_final = S_initial  (Delta S = Empty Set → Violates Confidentiality)
// Active : S_final != S_initial (Delta S != Empty Set → Violates Integrity / Availability)`
  },
  {
    question: "Why are Passive Attacks often the mandatory precursor (Reconnaissance Phase) to devastating Active Cyber Attacks in the Cyber Kill Chain?",
    shortAnswer: "Passive reconnaissance allows adversaries to silently map network topology, identify unencrypted API keys, and study administrator habits without triggering SIEM alarms before launching targeted active attacks.",
    explanation: "In sophisticated Advanced Persistent Threat (APT) campaigns, adversaries spend months in passive mode (sniffing span ports, observing packet intervals, analyzing cleartext DNS queries). This intelligence reveals server IP maps, unpatched software versions, and authentication tokens, enabling the subsequent active phase (e.g. masquerading as an admin to transfer ₹10 Crores) to succeed on the very first attempt.",
    hint: "Studying the bank's security guard rotation and alarm blueprints for months before attempting a robbery.",
    level: "moderate",
    codeExample: `// APT Lifecycle Progression:
// Phase 1 (Passive) : 90 days of silent packet sniffing ➔ Maps Kolkata FinTech payment topology
// Phase 2 (Active)  : Masquerade attack using captured admin credentials ➔ Dispatches ₹10 Crore wire transfer`
  },
  {
    question: "Compare the Detection Asymmetry between Passive and Active Attacks from a Security Operations Center (SOC) perspective.",
    shortAnswer: "Passive attacks produce 0 log events and 0 IDS alerts (requiring specialized physical C-OTDR or honeytokens); Active attacks generate measurable log anomalies, state errors, and SIEM alerts.",
    explanation: "Because passive sniffers only read passing electromagnetic/optical signals, standard operating systems and firewalls generate zero log entries. In contrast, active attacks trigger firewall connection drops, failed authentication counters, CRC/GHASH integrity mismatches, and socket buffer overflows, providing rich telemetry for SIEM and SOAR detection engines.",
    hint: "Catching a silent listener vs catching a vandal who leaves footprints and broken glass.",
    level: "moderate",
    codeExample: `// SOC Log Generation Comparison:
// Passive Wiretap   : Syslog events = 0, Firewall drops = 0, SIEM alert = NONE
// Active SYN Flood  : Backlog overflows = 1,000,000, CPU = 100%, SIEM alert = P1_CRITICAL`
  },
  {
    question: "How does the Defensive Strategy differ between Passive Threats (Proactive Prevention) and Active Threats (Dynamic Feedback Loop)?",
    shortAnswer: "Passive defense relies on 100% proactive encryption and traffic masking; Active defense operates on a dynamic feedback loop: Detect → Verify → Contain (SOAR) → Recover.",
    explanation: "Because passive attacks cannot be detected in real time on standard IT networks, security teams must enforce 100% proactive prevention (assume every cable is tapped: enforce TLS 1.3, MACsec, and CBR padding). For active attacks, organizations deploy active verification (AEAD tags, mTLS) paired with real-time detection and automated SOAR playbooks to isolate rogue nodes within milliseconds.",
    hint: "Armoring the car before leaving (passive prevention) vs having active anti-lock brakes and airbags (active mitigation).",
    level: "expert",
    codeExample: `// Defensive Framework Duality:
// Passive Strategy: 100% Proactive Prevention (Assume wire tapped ➔ Encrypt with TLS 1.3 / MACsec)
// Active Strategy : Zero Trust Feedback Loop (Detect Anomaly ➔ SOAR Port Shutdown in 150ms)`
  },
  {
    question: "Under the Indian IT Act 2000, how do the statutory criminal penalties compare between Passive Interception and Active Cyber Terrorism?",
    shortAnswer: "Passive interception is penalized under Section 43(a)/66 (up to 3 years prison + ₹5 Lakh fine); Active Cyber Terrorism on critical infrastructure triggers LIFE IMPRISONMENT under Section 66F.",
    explanation: "While unauthorized packet capture and data siphoning violate Section 43 (civil damages up to ₹1 Crore) and Section 66 (criminal hacking up to 3 years), actively attacking or disrupting critical infrastructure (e.g. power grids, banking switches, nuclear systems) is prosecuted under Section 66F as Cyber Terrorism, carrying a mandatory sentence of rigorous life imprisonment.",
    hint: "Passive hacking gets up to 3 years; attacking critical infrastructure gets life in prison.",
    level: "basic",
    codeExample: `// Statutory Comparison (IT Act 2000):
// Passive Interception : Section 43(a) / Section 66 (Up to 3 Years Prison + ₹5 Lakh Fine)
// Active Cyber Terrorism: Section 66F (RIGOROUS IMPRISONMENT FOR LIFE)`
  },
  {
    question: "Analyze Scenario 1: A financial institution in Kolkata suffers a ₹12 Crore fraudulent wire transfer. How did the attack combine passive and active phases?",
    shortAnswer: "Passive Phase: Sniffed unencrypted database traffic to capture admin credentials; Active Phase: Masqueraded as admin, tampered with transaction amounts, and submitted the fraudulent wire transfer.",
    explanation: "The attack commenced with passive packet sniffing on an internal unsegmented switch port, capturing cleartext API session tokens. Once credentials were harvested, the attacker shifted to active exploitation: masquerading as the lead finance officer, modifying the destination account number, and replaying the authenticated API payload to transfer ₹12 Crores to foreign accounts.",
    hint: "Listening silently to get the safe combination, then walking in and opening the safe.",
    level: "expert",
    codeExample: `// Financial Heist Attack Progression:
// 1. Passive Sniffing : Intercepts cleartext session token on VLAN 10 (Zero logs)
// 2. Active Masquerade: Submits POST /api/wire-transfer with stolen token
// 3. Active Tampering : Changes recipient to offshore account → ₹12 Crore Loss`
  },
  {
    question: "Analyze Scenario 2: A power transmission substation in Barrackpore experiences an unexpected blackout. How were passive and active techniques combined?",
    shortAnswer: "Passive Phase: Analyzed transformer acoustic hum and SCADA packet intervals; Active Phase: Flooded gateway with TCP SYNs and injected replayed Modbus breaker trip commands.",
    explanation: "The adversary first performed passive traffic analysis and acoustic side-channel monitoring to map high-load industrial shifts. During peak grid load, the attacker launched an active multi-vector attack: flooding the RTU gateway with a TCP SYN flood to prevent legitimate remote control, while concurrently injecting replayed Modbus trip commands (`0x05 Write Single Coil`) to force physical circuit breakers open.",
    hint: "Timing the attack when the electrical load is highest, blinding the operators with a flood, and tripping the main switch.",
    level: "expert",
    codeExample: `// Power Grid Attack Blueprint:
// 1. Passive Analysis : Measures 100 Hz acoustic hum + SCADA polling intervals
// 2. Active DoS (L4)  : Floods gateway with 500k SYN packets/sec (Blocks operator control)
// 3. Active Replay(L7): Replays recorded Modbus 0x05 breaker trip command → Blackout!`
  },
  {
    question: "Analyze Scenario 3: An oncology hospital in Ichapur suffers a medical data breach and ransomware outage. Trace the passive and active attack progression.",
    shortAnswer: "Passive Phase: Eavesdropped on unencrypted guest Wi-Fi DICOM feeds; Active Phase: Stripped SSL via Evil Twin portal, hijacked admin sessions, and deployed ransomware.",
    explanation: "An attacker positioned outside the hospital set up an Evil Twin rogue Wi-Fi AP, passively sniffing unencrypted patient MRI/CT DICOM scans. The attacker then executed an active SSLstrip attack on medical staff login portals, capturing physician credentials. Using these privileges, the attacker actively tampered with chemotherapy database records and deployed ransomware across all diagnostic imaging servers.",
    hint: "Stealing patient medical records over fake Wi-Fi, then using stolen doctor logins to lock the hospital computers.",
    level: "expert",
    codeExample: `// Hospital Breach Progression:
// 1. Passive Eavesdrop: Sniffs cleartext DICOM radiology scans on open Wi-Fi
// 2. Active MitM      : SSLstrip downgrades staff portal to HTTP, harvesting credentials
// 3. Active Ransomware: Deploys locker malware demanding ₹50 Lakhs ransom`
  },
  {
    question: "Analyze Scenario 4: A research lab in Jadavpur designs a quantum-resistant defense. How does it neutralize both passive and active threats?",
    shortAnswer: "Passive Defense: Post-Quantum ML-KEM-768 key encapsulation; Active Defense: Ed25519 digital signatures, mTLS, and BGP FlowSpec rate limiting.",
    explanation: "To survive future adversaries, Jadavpur researchers deployed hybrid post-quantum TLS 1.3. For passive defense: FIPS 203 ML-KEM-768 ensures archived ciphertexts cannot be decrypted by quantum computers running Shor's Algorithm. For active defense: Ed25519 asymmetric signatures and BGP FlowSpec rules prevent real-time message tampering, MitM parameter substitution, and volumetric reflection floods.",
    hint: "Using quantum-proof lattice locks for secrecy and digital signature seals for tamper-proofing.",
    level: "expert",
    codeExample: `// Hybrid Post-Quantum Defense Stack:
// Secrecy (Anti-Passive) : FIPS 203 ML-KEM-768 (Lattice-based Key Encapsulation)
// Integrity (Anti-Active): FIPS 204 ML-DSA (Lattice-based Digital Signatures) + mTLS`
  },
  {
    question: "How does the Digital Personal Data Protection (DPDP) Act 2023 hold organizations liable for both passive data leaks and active tampering?",
    shortAnswer: "Section 8(5) mandates reasonable security safeguards (mTLS/AEAD) for all citizen data; breaches resulting from either passive sniffing or active tampering trigger penalties up to ₹250 Crores.",
    explanation: "The DPDP Act 2023 does not distinguish between passive negligence (transmitting patient health records in cleartext) and active failure (allowing an attacker to tamper with citizen payment records). Under Section 33, any systemic failure to implement technical safeguards that leads to a personal data breach results in fines up to ₹250 Crores adjudicated by the DPBI.",
    hint: "National privacy law imposes up to ₹250 Crore fines whether data is quietly stolen or actively tampered with.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Mandate:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for systemic security failures`
  },
  {
    question: "What is the role of Honeypots and Canary Tokens in bridging passive detection and active containment?",
    shortAnswer: "Canary tokens convert silent passive sniffing into detectable active authentication events, which immediately trigger automated SOAR containment playbooks.",
    explanation: "When an attacker passively captures a decoy Canary credential from a network feed, the sniffer remains invisible. However, the moment the attacker actively attempts to use that credential to log into an administrative portal, the honeypot backend registers an active authentication event, alerting the SIEM and triggering SOAR to isolate the attacker's switch port within 150 milliseconds.",
    hint: "Setting a trap with marked money: the thief stays hidden until they try to spend the marked cash, which triggers the alarm.",
    level: "expert",
    codeExample: `// Passive-to-Active Bridge Workflow:
// 1. Attacker silently sniffs: CANARY_TOKEN_99812 (Passive Phase - Invisible)
// 2. Attacker submits token: POST /admin/login (Active Phase - Triggered!)
// 3. SOAR Engine Action   : Disables switch port Gig0/12 in 140ms`
  },
  {
    question: "Why does Constant-Bitrate (CBR) Traffic Padding defend against Passive Traffic Analysis but offer zero defense against Active DoS Floods?",
    shortAnswer: "CBR padding flattens transmission variations to prevent eavesdroppers from observing burst patterns, but active DoS floods overwhelm bandwidth capacity and exhaust server resources.",
    explanation: "CBR padding is designed solely to eliminate metadata leakage (ensuring the wire carries a constant 50 Mbps dummy flow so adversaries cannot deduce activity surges). However, an active volumetric DDoS attack unleashes 500 Gbps of traffic, saturating the physical pipe and exhausting router buffers regardless of whether internal flows are padded.",
    hint: "Filling the pipe with water stops someone from seeing ripples, but a tidal wave will still burst the pipe.",
    level: "expert",
    codeExample: `// Defense Boundary Duality:
// CBR Padding vs Traffic Analysis: 100% Effective (Waveform flattened to 50 Mbps)
// CBR Padding vs 500 Gbps DDoS  : 0% Effective (Pipe physically saturated by external flood)`
  },
  {
    question: "Compare the Forensic Artifacts left behind by Passive Wiretapping vs Active In-Flight Modification.",
    shortAnswer: "Passive wiretapping leaves zero software logs (only physical Rayleigh backscatter or cable impedance anomalies); Active modification leaves failed hash logs, mismatched sequence numbers, and application audit trails.",
    explanation: "In passive wiretapping, forensic investigators cannot find operating system event logs, packet traces, or database timestamps. Forensic proof requires physical TDR/OTDR cable testing. In active modification, investigators examine SIEM logs for AEAD GHASH verification failures, TCP out-of-order sequence drops, and application-level transaction rollback records.",
    hint: "Passive forensics requires inspecting the physical glass fiber; Active forensics examines digital audit logs.",
    level: "moderate",
    codeExample: `// Forensic Artifact Profiles:
// Passive Tap : Physical OTDR trace (-0.18 dB drop at km 14.2) | Syslog events = 0
// Active Mod  : SIEM Event ID 4012 "AEAD_GHASH_TAG_MISMATCH on /api/transfer"`
  },
  {
    question: "How does the Zero Trust 'Never Trust, Always Verify' architecture provide simultaneous mitigation against both Passive and Active attacks?",
    shortAnswer: "By combining ubiquitous encryption (defeating passive eavesdropping) with strict per-transaction cryptographic authentication and micro-segmentation (defeating active tampering and masquerade).",
    explanation: "Zero Trust (NIST SP 800-207) simultaneously addresses both domains: 1. Anti-Passive: All data in transit is encrypted with TLS 1.3 and MACsec, making eavesdropped packets unreadable. 2. Anti-Active: Every request requires Mutual TLS (mTLS), FIDO2 authentication, and AEAD integrity tags, preventing attackers from modifying packets, spoofing identities, or pivoting laterally.",
    hint: "Armoring the doors with steel (anti-passive) and checking fingerprint ID at every single door (anti-active).",
    level: "expert",
    codeExample: `// Zero Trust Dual-Domain Shield:
// 1. Data-in-Transit Secrecy (Anti-Passive) : TLS 1.3 AES-256-GCM + MACsec Line Encryption
// 2. Data-in-Transit Integrity (Anti-Active): mTLS X.509 + FIDO2 WebAuthn + SOAR Isolation`
  },
  {
    question: "Under Section 69 of the IT Act 2000, what are the strict procedural requirements for Lawful Interception in India?",
    shortAnswer: "Requires a written order signed by the Union or State Home Secretary, limited to sovereignty, defense, or security of India, subject to mandatory 60-day review.",
    explanation: "Section 69 empowers authorized government agencies to intercept, monitor, or decrypt information. However, interception without a written authorization signed by the Home Secretary is illegal under Section 43/66. All lawful interception authorizations must be reviewed every 60 days by the Cabinet Oversight Committee.",
    hint: "Only the Home Secretary can authorize lawful wiretaps in India, with mandatory bi-monthly oversight.",
    level: "basic",
    codeExample: `// Statutory Rule (IT Act Section 69):
// Authority: Union Home Secretary (Central Govt) or Home Secretary (State Govt)
// Grounds  : Sovereignty, integrity of India, security of State, public order`
  },
  {
    question: "What is an Asymmetric Resource Exhaustion Attack, and why is it classified as an Active DoS threat?",
    shortAnswer: "An attack where the client expends minimal computational effort (e.g. 1 ms) to force the server to expend massive CPU, memory, or database I/O resources (e.g. 1,000 ms).",
    explanation: "Unlike passive sniffing that consumes zero server resources, an asymmetric active attack submits complex queries (e.g. unindexed SQL joins, TLS client renegotiation, or complex ReDoS regex strings). A tiny 100-byte client request consumes 100% of server CPU cores, locking the application and causing a Denial of Service for legitimate users.",
    hint: "Throwing a tiny match that forces the fire department to deploy 10 fire trucks.",
    level: "moderate",
    codeExample: `// Asymmetric Resource Ratio:
// Attacker Cost : 0.001 ms CPU to emit 'GET /search?q=a*b*c*d*'
// Server Cost   : 850 ms CPU + 120 MB RAM to compile PDF & query unindexed database`
  },
  {
    question: "How does Dynamic IPsec Cryptographic Nonce Generation defeat Replay Attacks in financial API transactions?",
    shortAnswer: "The client generates a 128-bit cryptographically secure random number (nonce) and includes it in the signed payload; the server records nonces and rejects any duplicate.",
    explanation: "If an adversary captures an encrypted wire transfer request ($₹50,000$), replaying the exact same message to the server would transfer another $₹50,000$. By binding a 128-bit cryptographic nonce ($N$) and timestamp ($t$) to the HMAC/AEAD payload: $\\text{HMAC}(K, \\text{Payload} \\parallel N \\parallel t)$, the server logs $N$ in a Redis TTL cache. If $N$ is seen again, the request is rejected as a replay attack.",
    hint: "Writing a unique serial number on every check so the bank never cashes the same check twice.",
    level: "moderate",
    codeExample: `// Nonce Verification in Node.js:
const isNonceValid = await redisClient.set(nonce, "USED", { NX: true, EX: 300 });
if (!isNonceValid) {
  return res.status(401).json({ error: "REPLAY ATTACK DETECTED" });
}`
  },
  {
    question: "Synthesize the 10-point Master Evaluation Matrix comparing Active and Passive Attacks across all dimensions.",
    shortAnswer: "A comprehensive framework analyzing Objective, CIA Triad, State Alteration, Detection Ease, In-Line Requirement, Attacker Traceability, Exploit Vectors, Defenses, Forensics, and Statutory Penalties.",
    explanation: "The complete matrix: 1. Objective: Secrecy vs Disruption/Fraud. 2. CIA Impact: Confidentiality vs Integrity/Availability. 3. State Alteration: $\\Delta S = \\emptyset$ vs $\\Delta S \\ne \\emptyset$. 4. Detection: Near-impossible vs Real-time SIEM alerts. 5. In-Line: Out-of-band vs In-line required. 6. Traceability: Untraceable vs Forensically logged. 7. Vectors: Sniffing/C-OTDR vs Tampering/DoS/Replay. 8. Defenses: Proactive Encryption vs Zero Trust SOAR. 9. Forensics: Physical layer vs Digital audit logs. 10. IT Act: Sec 43(a)/66 vs Sec 66F (Life Imprisonment).",
    hint: "The master reference table comparing passive and active attacks from physical physics to criminal law.",
    level: "expert",
    codeExample: `// Master Comparison Summary:
// Passive: Secrecy | Confidentiality | Delta S = 0 | 0 Logs | Proactive Encryption | IT Act Sec 66 (3 Yrs)
// Active : Fraud/DoS | Integrity/Avail | Delta S != 0 | SIEM Logs | Zero Trust SOAR | IT Act Sec 66F (Life)`
  },
  {
    question: "How does the 'Harvest Now, Decrypt Later' quantum strategy represent the ultimate long-term passive surveillance threat?",
    shortAnswer: "Adversaries passively record and store encrypted diplomatic and financial communications today, waiting for future quantum computers to break classical RSA/ECC encryption.",
    explanation: "Even though modern TLS 1.3 ciphertexts cannot be decrypted by classical supercomputers today, hostile intelligence agencies store petabytes of intercepted traffic in massive data centers. Once cryptanalytically relevant quantum computers (CRQCs) running Shor's Algorithm become operational, these archived ciphertexts will be decrypted retrospectively, exposing historical state secrets and financial records.",
    hint: "Recording encrypted radio broadcasts today and storing the tapes in a warehouse until a master key is invented.",
    level: "expert",
    codeExample: `// Quantum Harvesting Strategy:
// Year 2026 (Passive) : Intercept & Archive RSA-2048 / ECDH encrypted banking traffic
// Year 2035 (Active)  : Quantum Computer runs Shor's Algorithm ➔ Factors private keys ➔ Decrypts all historical archives`
  },
  {
    question: "Synthesize an Enterprise Cyber Security Incident Response Plan (CSIRP) compliant with CERT-In directions for handling a blended Passive-Active breach.",
    shortAnswer: "A 6-phase response model: 1. Identification (within 1 hour); 2. CERT-In Notification (within 6 hours); 3. Automated SOAR Isolation; 4. Cryptographic Key Rotation; 5. Forensic Eradication; 6. Post-Incident Review.",
    explanation: "When a blended attack occurs (e.g. passive sniffing leading to active tampering): 1. Phase 1 (T+1h): SIEM and C-OTDR identify the compromised fiber tap and tampered database records. 2. Phase 2 (T+6h): Mandatory incident report submitted to CERT-In under Section 70B. 3. Phase 3: SOAR playbooks isolate affected switch VLANs and revoke compromised JWTs. 4. Phase 4: Immediate rotation of all mTLS certificates and database credentials. 5. Phase 5: Forensics analysis of physical cable taps and system audit logs. 6. Phase 6: Legal compliance filing under DPDP Act 2023.",
    hint: "Identify quickly, report to CERT-In within 6 hours, isolate automatically with SOAR, rotate all keys, and document forensics.",
    level: "expert",
    codeExample: `// CERT-In Incident Response Timeline:
// T+00:00 - Breach Detected by SIEM / C-OTDR
// T+00:02 - SOAR isolates compromised switch ports (<150 ms)
// T+05:30 - Formal Incident Report dispatched to incident@cert-in.org.in (Mandatory 6-Hour SLA)
// T+24:00 - Full Cryptographic Root CA & API Key Rotation completed`
  },
  {
    question: "What is BGP Prefix Hijacking, and how does it convert a passive routing path into an active Man-in-the-Middle position?",
    shortAnswer: "A rogue ISP advertises a more specific BGP route (/24) for a victim's IP prefix, causing global internet traffic to detour through the attacker's data center for inspection and modification.",
    explanation: "In BGP prefix hijacking, the attacker actively manipulates the global internet routing table. Once traffic is diverted through the attacker's autonomous system, they can passively monitor unencrypted packets or actively execute SSL stripping and packet tampering before relaying the traffic to the legitimate destination.",
    hint: "Changing global highway signs so all traffic from Kolkata to Delhi takes a detour through a checkpoint in another city.",
    level: "expert",
    codeExample: `// BGP Hijack Detour:
// Legitimate Path: Client ➔ Genuine ISP ➔ Kolkata Bank (Latency: 12ms)
// Hijacked Path  : Client ➔ Rogue Autonomous System ➔ MitM Proxy ➔ Kolkata Bank (Latency: 185ms)`
  },
  {
    question: "How does IEEE 802.1X Port-Based Network Access Control (PNAC) prevent unauthorized rogue devices from joining switch ports?",
    shortAnswer: "Switch ports remain in an unauthorized state, dropping all traffic until the connecting device successfully completes EAP-TLS certificate authentication with a RADIUS server.",
    explanation: "When an attacker plugs an unauthorized hardware sniffer or rogue laptop into an enterprise switch port in Barrackpore, the switch intercepts the connection. The device must present a valid X.509 client certificate. If authentication fails, the port remains disabled or is shunted to an isolated quarantine VLAN, blocking both passive sniffing and active packet injection.",
    hint: "A turnstile that requires an authenticated badge before the gate unlocks.",
    level: "moderate",
    codeExample: `// Cisco 802.1X Switch Configuration:
interface GigabitEthernet0/1
 switchport mode access
 authentication port-control auto
 dot1x pae authenticator`
  },
  {
    question: "What is the difference between a False Positive and a False Negative in Active Intrusion Detection Systems (IDS)?",
    shortAnswer: "A False Positive alerts on benign traffic as malicious; a False Negative fails to alert when an actual active attack occurs.",
    explanation: "In Active IDS operations: A False Positive (Type I error) flags legitimate high-volume transactions during Durga Puja as a DDoS attack, causing unnecessary alerts or service disruption. A False Negative (Type II error) is far more dangerous: it misses an active SQL injection or tampering payload, allowing an attacker to compromise the database without detection.",
    hint: "A smoke alarm ringing when you cook toast (False Positive) vs an alarm remaining silent during a real fire (False Negative).",
    level: "basic",
    codeExample: `// IDS Error Metrics:
// False Positive: Legitimate User Request ➔ Flagged as ATTACK (High Admin Overhead)
// False Negative: Active Bit-Flipping Exploit ➔ Treated as BENIGN (Catastrophic Breach!)`
  },
  {
    question: "How does Public Key Infrastructure (PKI) Certificate Pinning protect mobile apps against compromised Certificate Authorities?",
    shortAnswer: "The application hardcodes the cryptographic public key hash of the authorized server certificate, rejecting connections even if signed by a trusted OS root CA.",
    explanation: "If an adversary compromises a rogue Certificate Authority (or installs a corporate proxy root CA on an employee phone), they can generate valid SSL certificates for `bank.in`. In mobile banking apps, Certificate Pinning verifies that the leaf certificate's SHA-256 public key hash matches the hardcoded key inside the mobile app binary, completely blocking proxy MitM tools.",
    hint: "Carrying a photograph of your friend in your wallet: you only talk to them if their face matches your photo.",
    level: "expert",
    codeExample: `// Android Network Security Config (Certificate Pinning):
<pin-set expiration="2027-01-01">
    <pin digest="SHA-256">7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=</pin>
</pin-set>`
  },
  {
    question: "Under the Indian Penal Code (IPC) Section 420 and IT Act Section 66D, how are cyber financial heists prosecuted in West Bengal courts?",
    shortAnswer: "Prosecuted jointly under IPC Section 420 (Cheating & Dishonestly Inducing Delivery of Property) and IT Act Section 66D (Cheating by Personation via Computer Resource).",
    explanation: "When active cyber attacks result in fraudulent financial transfers (e.g. altering bank beneficiary accounts), state cyber crime police file charges under both Section 66D of the IT Act (up to 3 years imprisonment) and Section 420 of the IPC (up to 7 years rigorous imprisonment + non-bailable warrants), ensuring stringent criminal prosecution.",
    hint: "Active cyber financial fraud is prosecuted under both the IT Act and criminal fraud statutes.",
    level: "moderate",
    codeExample: `// Criminal Charges Filed (State Cyber Crime Police Station, Kolkata):
// Charge 1: IT Act 2000 Section 66D (Cheating by Personation via Computer)
// Charge 2: IPC Section 420 (Cheating and Dishonestly Inducing Delivery of Property - Up to 7 Years)`
  },
  {
    question: "What is Memory Bus Snooping, and how does AMD SEV / Intel SGX defeat memory-level passive and active attacks?",
    shortAnswer: "Hardware memory encryption (AES-128/256) encrypts all data leaving the CPU cache before traversing motherboard RAM traces, preventing memory probing.",
    explanation: "If an adversary attaches hardware probing interposers to DDR5 RAM buses on a server motherboard, cleartext encryption keys and database records can be passively sniffed or actively modified. Technologies like AMD Secure Encrypted Virtualization (SEV) encrypt all memory lines with hardware keys inside the CPU, rendering RAM bus snooping completely ineffective.",
    hint: "Encrypting the data before it leaves the processor chip to travel across motherboard circuit traces.",
    level: "expert",
    codeExample: `// Linux Full Memory Encryption Check:
# dmesg | grep -i "memory encryption"
# Output: [ 0.000000] AMD-SEV: Memory encryption active (AES-128-XTS hardware engine enabled)`
  },
  {
    question: "How does the Token Bucket Rate Limiting algorithm enforce traffic shaping on Web Application Firewalls (WAF)?",
    shortAnswer: "Tokens accumulate in a bucket at a fixed rate $r$; each request consumes 1 token. When the bucket is empty, burst requests exceeding capacity $B$ are rejected with HTTP 429.",
    explanation: "To protect login portals or search APIs from HTTP floods, WAFs implement Token Bucket rate limiters. A client is granted a bucket with capacity $B = 50$ tokens, refilling at $r = 5$ tokens/sec. A burst of 50 requests is allowed, but sustained traffic exceeding 5 req/sec receives `HTTP 429 Too Many Requests`, smoothing traffic surges.",
    hint: "A water bucket with a small hole: you can dump a cup of water, but if you pour a bucket-full too fast, it overflows.",
    level: "moderate",
    codeExample: `// Nginx Token Bucket Rate Limiting:
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
location /api/ {
    limit_req zone=api_limit burst=20 nodelay;
}`
  },
  {
    question: "Why is an active Denial of Service (DoS) attack considered fundamentally different from an active Modification of Messages attack?",
    shortAnswer: "DoS targets the Availability pillar by exhausting system capacity; Message Modification targets the Integrity pillar by altering payload contents without necessarily crashing the system.",
    explanation: "In a DoS attack, the attacker's objective is to make the system completely unreachable (504 Gateway Timeout or packet drops). In a message modification attack, the attacker wants the system to remain 100% online and functional so that the tampered request (e.g. changing wire transfer amount from ₹500 to ₹50,000) is successfully processed by the backend database.",
    hint: "One wants to shut down the store; the other wants the store open so they can use counterfeit currency.",
    level: "moderate",
    codeExample: `// Objective Comparison:
// DoS Attack        : Target = Offline (0% transactions processed → Availability Destroyed)
// Modification Attack: Target = Online (100% tampered transactions processed → Integrity Destroyed)`
  },
  {
    question: "Under the Indian IT Act Section 43, what are the civil compensation boundaries for unauthorized computer access and damage?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the person affected for unauthorized access, data copying, contamination, or disruption.",
    explanation: "Section 43 of the IT Act provides comprehensive civil remedies: any unauthorized access (Clause a), downloading of data (Clause b), introduction of contaminants (Clause c), damage to computer systems (Clause e), or disruption of access (Clause f) triggers civil liability up to ₹1 Crore adjudicated by the State IT Secretary (Adjudicating Officer).",
    hint: "Section 43 provides up to ₹1 Crore in civil damages for unauthorized hacking and system disruption.",
    level: "basic",
    codeExample: `// Civil Remedy (IT Act Section 43):
// Violation: Unauthorized data access, packet sniffing, or system disruption
// Maximum Compensation: Up to ₹1,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "Synthesize the unified Grand Architecture for Cyber Resilience: Unifying Anti-Passive and Anti-Active controls across the modern digital enterprise.",
    shortAnswer: "A holistic framework integrating Physical C-OTDR & MACsec (L1-L2), Zero Trust mTLS & AEAD (L4-L7), FIDO2 WebAuthn (IAM), Post-Quantum ML-KEM (Crypto), and automated SOAR orchestration under Indian statutory compliance.",
    explanation: "The ultimate cyber resilience architecture unites both domains into an impenetrable fabric: 1. Physical & Data Link: Armored conduits, C-OTDR (1625 nm) supervisory monitoring, IEEE 802.1AE MACsec line encryption, and Dynamic ARP Inspection. 2. Network & Transport: BCP 38 uRPF, RPKI BGP validation, Linux TCP SYN Cookies, and IPsec 64-bit Anti-Replay. 3. Application & Data: TLS 1.3 AEAD (AES-256-GCM), HSTS Preloading, Certificate Pinning, and WAF rate limiting. 4. Identity & Access: FIDO2 WebAuthn hardware keys. 5. Quantum Defense: Hybrid ML-KEM-768 key encapsulation. 6. Incident Response: Automated SOAR (<200 ms) with strict CERT-In 6-hour reporting compliance.",
    hint: "The master architectural blueprint uniting physical fiber radar, line-rate encryption, Zero Trust mTLS, hardware keys, post-quantum math, and sub-second automated SOAR containment.",
    level: "expert",
    codeExample: `// Master Enterprise Cyber Resilience Blueprint:
// [PHYSICAL]  : C-OTDR 1625nm + Tamper-Evident Seals + TEMPEST Zone 0
// [DATA LINK] : IEEE 802.1AE MACsec AES-256-GCM + Dynamic ARP Inspection (DAI) + 802.1X
// [NETWORK]   : BCP 38 Strict uRPF + RPKI BGP Validation + IPsec CBR Traffic Padding
// [TRANSPORT] : Linux net.ipv4.tcp_syncookies = 1 + IPsec 64-bit Sliding Window
// [APP / API] : TLS 1.3 AEAD (AES-GCM) + HSTS Preload + Mutual TLS (mTLS) + WAF Rate Limiting
// [IDENTITY]  : FIDO2 / WebAuthn Hardware Security Keys (Zero Phishing / Zero Masquerade)
// [QUANTUM]   : FIPS 203 ML-KEM-768 Hybrid Post-Quantum Key Encapsulation
// [RESPONSE]  : SIEM Correlation + SOAR Automated Switch Port Isolation (<150ms) + CERT-In 6h SLA`
  }
];

export default questions;
