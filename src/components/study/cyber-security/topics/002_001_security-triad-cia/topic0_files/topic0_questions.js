// topic0_questions.js
// 30 Moderate to Expert Questions on Introduction to the CIA Triad in Cyber Security

const questions = [
  {
    question: "What is the foundational purpose of the CIA Triad in modern Cyber Security architecture?",
    shortAnswer: "The CIA Triad is the benchmark model that guides information security policies, categorizing defense objectives into Confidentiality (preventing unauthorized access), Integrity (preventing unauthorized alteration), and Availability (ensuring timely, reliable access).",
    explanation: "Every security control, audit standard, and encryption protocol is designed to protect one or more pillars of the CIA Triad.",
    hint: "Think of the three essential pillars needed to safeguard any digital information asset.",
    level: "basic",
    codeExample: "SecurityObjective = Confidentiality && Integrity && Availability;"
  },
  {
    question: "How does the Confidentiality pillar protect sensitive data across its lifecycle?",
    shortAnswer: "Confidentiality ensures that only authorized entities, users, or processes can read or inspect sensitive information, enforced using encryption (AES/RSA), Access Control Lists (ACLs), role-based permissions (RBAC), and data masking.",
    explanation: "Confidentiality protects data at rest (storage), in transit (network), and in use (memory).",
    hint: "Ensures unauthorized eyes cannot view the data.",
    level: "basic",
    codeExample: "if (user.hasPermission('TOP_SECRET_READ')) {\n    decryptData(data, user.privateKey);\n} else {\n    throw new SecurityException('Access Denied');\n}"
  },
  {
    question: "What technical mechanisms enforce the Integrity pillar of the CIA Triad?",
    shortAnswer: "Cryptographic hash functions (SHA-256, SHA-3), Message Authentication Codes (HMAC), digital signatures, database checksums, and version control systems that detect any unauthorized modification, deletion, or injection.",
    explanation: "If a single bit in a file changes, the resulting SHA-256 hash completely changes due to the avalanche effect.",
    hint: "Hashes and digital signatures verify that data has not been modified or tampered with.",
    level: "basic",
    codeExample: "String originalHash = sha256(data);\n// If receivedHash.equals(originalHash) → Integrity Guaranteed"
  },
  {
    question: "How is the Availability pillar defined and technically maintained in enterprise infrastructure?",
    shortAnswer: "Availability guarantees that systems, networks, and data remain accessible to authorized users when needed, maintained through redundant hardware (RAID, dual power supplies), High Availability (HA) failover clusters, load balancers, DDoS scrubbing, and automated backups.",
    explanation: "High availability is often measured in 'nines' (e.g. 99.999% uptime equals less than 5.26 minutes of downtime per year).",
    hint: "Redundant servers, power backups, and DDoS mitigation keep services online.",
    level: "basic",
    codeExample: "UptimePercent = ((TotalTime - Downtime) / TotalTime) * 100;"
  },
  {
    question: "What is the typical cost in Indian Rupees (₹) for a High-Availability Redundant Dual-Site Firewall Cluster in Kolkata?",
    shortAnswer: "Approximately ₹6,50,000 to ₹18,000,000 for enterprise next-gen active-passive or active-active firewall appliances with dual power supplies, 10Gbps interfaces, and 3-year unified threat management (UTM) support licenses.",
    explanation: "High availability hardware ensures continuous uptime for critical banking and health portals in West Bengal.",
    hint: "Enterprise HA dual-firewall hardware clusters cost ₹6,50,000 – ₹18,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "HAFirewallCluster_Cost = ₹12,50,000; // Dual FortiGate / Palo Alto Cluster in Kolkata Data Center"
  },
  {
    question: "Why is Non-Repudiation considered an indispensable extension of the CIA Triad?",
    shortAnswer: "Non-repudiation ensures that an individual cannot deny the authenticity of their signature on a document or the sending of a message, achieved by combining public key cryptography (asymmetric digital signatures) with trusted timestamping authorities.",
    explanation: "Critical in financial transactions under the Indian IT Act 2000 to legally bind signatories to UPI transfers and contracts.",
    hint: "Digital signatures prevent a sender from claiming 'I never sent this transaction'.",
    level: "expert",
    codeExample: "boolean isLegallyBinding = verifyDigitalSignature(transactionPayload, userCert, rsaPublicKey);"
  },
  {
    question: "What is the Parkerian Hexad and how does it expand the traditional CIA Triad?",
    shortAnswer: "Proposed by Donn B. Parker, it expands the 3 CIA pillars into 6 security attributes: Confidentiality, Integrity, Availability, Authenticity (validity of source), Possession/Control (physical/logical custody even if encrypted), and Utility (usefulness/decryptability of data).",
    explanation: "For example, encrypted ransomware damages Utility even if Confidentiality and Possession remain intact.",
    hint: "Adds Authenticity, Possession/Control, and Utility to Confidentiality, Integrity, and Availability.",
    level: "expert",
    codeExample: "ParkerianHexad = ['Confidentiality', 'Integrity', 'Availability', 'Authenticity', 'Possession', 'Utility'];"
  },
  {
    question: "How do security engineers balance the inherent tension between Security Controls and System Usability?",
    shortAnswer: "By implementing Risk-Based Authentication (RBA), Single Sign-On (SSO), biometric passwordless logins (FIDO2 passkeys), and context-aware policies that apply friction (like step-up MFA) only when anomalous behavior or high-risk access is detected.",
    explanation: "Excessive friction causes user frustration and leads employees to bypass security controls using unauthorized shadow IT.",
    hint: "Use adaptive risk-based authentication to add friction only when risk is high.",
    level: "moderate",
    codeExample: "if (loginContext.isAnomalousLocation() || loginContext.isNewDevice()) {\n    triggerStepUpMFA();\n} else {\n    grantSeamlessAccess();\n}"
  },
  {
    question: "Which pillar of the CIA Triad is violated during a Ransomware Attack where files are encrypted without data exfiltration?",
    shortAnswer: "Availability (and Utility in the Parkerian Hexad), because the authorized organization is prevented from accessing its own legitimate files and computational services.",
    explanation: "If the attacker also steals the data before encrypting it (Double Extortion), both Confidentiality and Availability are breached.",
    hint: "Users are locked out of accessing their own operational files.",
    level: "basic",
    codeExample: "RansomwareImpact = { Availability: 'COMPROMISED', Confidentiality: 'PRESERVED_UNLESS_EXFILTRATED' };"
  },
  {
    question: "Which pillar of the CIA Triad is violated during an unauthorized Database Table Update that alters bank balances?",
    shortAnswer: "Integrity, because the financial data was modified without authorization, corrupting the truth and consistency of the ledger.",
    explanation: "Integrity violations invalidate ledger trust and require forensic audit reconstruction.",
    hint: "Modifying or tampering with financial numbers violates data accuracy.",
    level: "basic",
    codeExample: "// Unauthorized SQL update: UPDATE accounts SET balance = 10000000 WHERE id = 42; → Integrity Breach!"
  },
  {
    question: "Which pillar of the CIA Triad is violated by an unauthorized Wi-Fi Packet Sniffing attack capturing unencrypted cleartext credentials?",
    shortAnswer: "Confidentiality, because unauthorized parties intercept and read sensitive credentials that should remain restricted to authorized users.",
    explanation: "Packet sniffing on open Wi-Fi captures cleartext HTTP or Telnet traffic without modifying the packets.",
    hint: "Unauthorized third parties are reading secret transmission data.",
    level: "basic",
    codeExample: "// Wireshark capturing plaintext HTTP Authorization header → Confidentiality Breach!"
  },
  {
    question: "What is the principle of Defense-in-Depth and how does it safeguard the CIA Triad?",
    shortAnswer: "A layered defense strategy where multiple overlapping security controls (firewalls, WAF, endpoint EDR, encryption, MFA, network segmentation) protect information assets, ensuring that if one defensive layer fails, subsequent layers prevent a complete CIA compromise.",
    explanation: "Like the concentric walls and moat of an ancient castle protecting the inner treasury.",
    hint: "Layered security ensuring that no single point of failure compromises the system.",
    level: "moderate",
    codeExample: "DefenseLayers = [PerimeterFirewall, DMZ_WAF, SegmentedVLAN, HostEDR, AppRBAC, DB_AES256Encryption];"
  },
  {
    question: "How does the principle of Least Privilege (PoLP) directly protect Confidentiality and Integrity?",
    shortAnswer: "PoLP dictates that users, applications, and system processes are granted only the minimum necessary privileges required to perform their specific job functions, preventing accidental or malicious data modification (Integrity) and unauthorized data exposure (Confidentiality).",
    explanation: "Limits blast radius: if an attacker compromises a standard user account, they cannot alter system files or access payroll data.",
    hint: "Granting only the bare minimum permissions needed to do the job.",
    level: "basic",
    codeExample: "grantPermissions(user, 'INVENTORY_VIEW_ONLY'); // Does not grant ADMIN or DB_WRITE"
  },
  {
    question: "What is the difference between Synchronous and Asynchronous Replication in maintaining Data Availability?",
    shortAnswer: "Synchronous replication writes data to both primary and replica storage before confirming the write (Zero RPO, higher latency); Asynchronous replication writes to the primary first and replicates to secondary nodes in background batches (Low latency, potential slight data loss during immediate crash).",
    explanation: "Banks in Kolkata use synchronous replication for ledger databases and asynchronous replication for disaster recovery sites 500km away.",
    hint: "Synchronous writes to both before acknowledging; Asynchronous replicates in the background.",
    level: "expert",
    codeExample: "ReplicationMode = { Sync: { RPO: 0, Latency: 'Higher' }, Async: { RPO: '> 0', Latency: 'Sub-millisecond' } };"
  },
  {
    question: "How does Digital Watermarking protect the Intellectual Property (IP) of digital assets?",
    shortAnswer: "By embedding an imperceptible, tamper-resistant digital signature or identification pattern into media files (images, audio, software), enabling forensic tracking of leaks and proving legitimate ownership in copyright disputes.",
    explanation: "Used by research institutions in Jadavpur to watermark patented machine learning datasets and source code.",
    hint: "Hiding ownership signatures inside images or code to detect unauthorized distribution.",
    level: "moderate",
    codeExample: "embedWatermark(sourceImage, 'COPYRIGHT_2026_CODER_ACCOTAX_BARRACKPORE');"
  },
  {
    question: "What is the AAA Framework in relation to the CIA Triad?",
    shortAnswer: "Authentication (verifying user identity), Authorization (granting specific permissions based on identity), and Accounting (auditing and logging user actions); it provides the operational mechanism to enforce Confidentiality, Integrity, and Non-Repudiation.",
    explanation: "RADIUS and TACACS+ servers implement AAA for enterprise network switches and VPN gateways.",
    hint: "Authentication, Authorization, and Accounting form the foundation of access control.",
    level: "moderate",
    codeExample: "AAA = { AuthN: 'Who are you?', AuthZ: 'What can you do?', Accounting: 'What did you do?' };"
  },
  {
    question: "How does the Zero Trust Architecture (NIST SP 800-207) redefine the enforcement of the CIA Triad?",
    shortAnswer: "By discarding the traditional perimeter-based 'trust inside the network' model and enforcing 'Never Trust, Always Verify', continuously evaluating identity, device health, location, and encryption for every single access request to every microsegment.",
    explanation: "Prevents lateral movement when an internal workstation in Barrackpore is compromised.",
    hint: "Never trust, always verify every single access request regardless of network location.",
    level: "expert",
    codeExample: "if (verifyIdentity() && verifyDevicePosture() && verifyContextRisk() <= THRESHOLD) grantSession();"
  },
  {
    question: "What are the Recovery Time Objective (RTO) and Recovery Point Objective (RPO) in Availability planning?",
    shortAnswer: "RTO is the maximum tolerable duration of system downtime before service restoration; RPO is the maximum tolerable duration of data loss measured in time (e.g. losing 15 minutes of transactional data).",
    explanation: "Crucial metrics negotiated in Service Level Agreements (SLAs) for enterprise hospital and banking systems in Ichapur.",
    hint: "RTO is how long you can be down; RPO is how much data you can afford to lose.",
    level: "moderate",
    codeExample: "SLA_Targets = { RTO: '15 Minutes to Restore Service', RPO: '0 Seconds Data Loss (Sync DR)' };"
  },
  {
    question: "How does Data Classification enforce Confidentiality across an organization?",
    shortAnswer: "By categorizing data into tiers (Public, Internal, Confidential, Restricted/Secret) based on sensitivity and business impact, applying automated mandatory controls (encryption, DLP, watermarking) matching each tier.",
    explanation: "Restricted tier requires HSM key encryption and dual-custody access in financial institutions.",
    hint: "Tagging data as Public, Internal, Confidential, or Secret to apply matching security rules.",
    level: "basic",
    codeExample: "enum DataClass { PUBLIC, INTERNAL, CONFIDENTIAL, TOP_SECRET };"
  },
  {
    question: "What is the role of a Hardware Security Module (HSM) in protecting Confidentiality and Integrity?",
    shortAnswer: "A physical, tamper-evident crypto-processor that securely generates, stores, and manages cryptographic keys; private keys never leave the secure boundary of the HSM chip, preventing memory dump extraction.",
    explanation: "Banks in Kolkata use FIPS 140-2 Level 3 HSMs to sign UPI transaction payloads and protect master encryption keys.",
    hint: "Tamper-proof dedicated hardware chip that protects encryption keys from ever being exposed in memory.",
    level: "expert",
    codeExample: "byte[] signature = hsm.sign(dataPayload, 'KEY_SLOT_01_RSA4096'); // Private key never exported"
  },
  {
    question: "How does a Denial of Service (DoS) attack directly target the Availability pillar?",
    shortAnswer: "By overwhelming server resources (CPU, RAM, bandwidth, connection queues) with fraudulent traffic (like SYN floods or HTTP requests), exhausting processing capacity so legitimate users cannot access the service.",
    explanation: "Even with 100% Confidentiality and Integrity, a system is useless if users cannot connect.",
    hint: "Flooding a server with fake requests until it crashes and legitimate users cannot connect.",
    level: "basic",
    codeExample: "if (incomingRequestsPerSec > 1000000) server.exhaustBuffers(); // System Down"
  },
  {
    question: "What is the role of Data Loss Prevention (DLP) in maintaining Confidentiality?",
    shortAnswer: "DLP software inspects outgoing emails, USB transfers, clipboard pastes, and cloud uploads using regex, keyword matching, and document fingerprinting to block unauthorized transmission of sensitive data (like Aadhaar or credit card numbers).",
    explanation: "Prevents disgruntled employees or malware from exfiltrating customer financial records.",
    hint: "Scans outgoing traffic to block sensitive files or card numbers from leaving the company.",
    level: "moderate",
    codeExample: "if (outgoingEmail.containsPattern(AADHAAR_REGEX)) {\n    dlpEngine.blockAndAlertSOC();\n}"
  },
  {
    question: "How does Cryptographic Salt protect the Integrity and Confidentiality of Stored Passwords?",
    shortAnswer: "A salt is a unique, randomly generated cryptographic string appended to each password before hashing, ensuring that identical passwords produce completely distinct hashes, defeating precomputed Rainbow Table attacks and duplicate hash identification.",
    explanation: "Modern password hashing algorithms like Argon2id or bcrypt generate unique salts automatically.",
    hint: "Adding a unique random string to each password before hashing stops rainbow table attacks.",
    level: "moderate",
    codeExample: "String passwordHash = argon2.hash(password, generateRandomSalt(16));"
  },
  {
    question: "What is the difference between Symmetric and Asymmetric Encryption in protecting Confidentiality?",
    shortAnswer: "Symmetric encryption uses a single shared secret key for both encryption and decryption (extremely fast, e.g. AES-256); Asymmetric encryption uses a mathematically linked key pair: a public key for encryption and a private key for decryption (e.g. RSA-4096).",
    explanation: "Hybrid systems use RSA to securely exchange an AES key, which then encrypts the bulk payload.",
    hint: "Symmetric uses one shared key; Asymmetric uses public and private key pairs.",
    level: "basic",
    codeExample: "// Symmetric: AES-GCM (fast bulk payload)\n// Asymmetric: RSA-4096 (key exchange & signatures)"
  },
  {
    question: "How does an Intrusion Detection System (IDS) support both Integrity and Availability?",
    shortAnswer: "By continuously monitoring network traffic and system audit logs for malicious signatures, unauthorized configuration file changes (Integrity), and volumetric flood anomalies that threaten to degrade server uptime (Availability).",
    explanation: "Snort and Suricata detect attack patterns in real time and alert Security Operations Center (SOC) analysts.",
    hint: "Monitors network traffic and server logs to catch tampering and flood attacks.",
    level: "moderate",
    codeExample: "alert tcp any any → 192.168.1.0/24 80 (msg:'SQL Injection Attempt'; content:'UNION SELECT'; sid:10001;)"
  },
  {
    question: "What is the principle of Fail-Safe Defaults (Fail-Secure vs Fail-Open)?",
    shortAnswer: "In the event of a system crash or power outage, Fail-Secure locks down resources to protect Confidentiality and Integrity (e.g. vault doors remain locked, firewall drops all packets); Fail-Open unlocks resources to prioritize Availability and Human Safety (e.g. emergency exit doors unlock).",
    explanation: "Fire doors must fail open to save lives, while bank safe doors must fail secure to protect assets.",
    hint: "Fail-Secure prioritizes confidentiality by locking down; Fail-Open prioritizes availability and life safety.",
    level: "expert",
    codeExample: "if (securityModule.crashes()) {\n    if (mode == FAIL_SECURE) dropAllTraffic();\n    else passTraffic();\n}"
  },
  {
    question: "How do Version Control Systems (like Git) protect the Integrity of Source Code Repositories?",
    shortAnswer: "Git structures commit histories as a Directed Acyclic Graph (DAG) of cryptographic SHA-1/SHA-256 hashes; any unauthorized alteration of a historical commit changes its hash and invalidates all descendant commits in the trust chain.",
    explanation: "Signed git commits with GPG keys also provide non-repudiation and author authenticity.",
    hint: "Merkle-tree hashing ensures any change in past code breaks the entire cryptographic chain.",
    level: "moderate",
    codeExample: "commitHash = sha256(treeHash + parentHash + author + timestamp + message);"
  },
  {
    question: "What is an Air-Gapped Network and why is it used to maximize Confidentiality and Integrity?",
    shortAnswer: "A physical network isolation measure where a secure computing environment has zero physical, wireless, or logical connections to the public internet or any unclassified network, protecting mission-critical assets (like nuclear plants or military SCADA systems).",
    explanation: "Data transfers can only occur via strictly audited, write-blocked physical optical media or diodes.",
    hint: "A system completely disconnected from the internet and outside networks.",
    level: "moderate",
    codeExample: "AirGapStatus = { InternetConnection: false, WirelessCards: 'Physically Removed', DataDiode: true };"
  },
  {
    question: "How do Audit Logs and SIEM solutions ensure Accountability for CIA Triad incidents?",
    shortAnswer: "By recording immutable, timestamped event logs across all network endpoints, firewalls, and databases into a centralized Security Information and Event Management (SIEM) platform, enabling security analysts to reconstruct the exact timeline of breaches.",
    explanation: "Log integrity must be protected using WORM (Write Once, Read Many) storage or remote forwarding.",
    hint: "Centralizing immutable logs allows analysts to reconstruct who did what, when, and how.",
    level: "basic",
    codeExample: "siem.ingestLog({ timestamp: '2026-08-22T23:45:00Z', user: 'mamatak', action: 'EXPORT_TABLE', ip: '10.0.4.12' });"
  },
  {
    question: "What is the ultimate golden rule for designing, auditing, and balancing the CIA Triad in enterprise systems?",
    shortAnswer: "'Always align security controls with business risk: enforce strong encryption for Confidentiality, cryptographic hashing for Integrity, and fault-tolerant redundancy for Availability; never sacrifice one pillar blindly without a documented risk treatment plan; and budget all enterprise security hardware and SOC infrastructure in Indian Rupees (₹)!'",
    explanation: "This complete rule captures risk-based alignment, cryptographic safeguards, operational uptime, and enterprise procurement budgeting.",
    hint: "Align controls with risk, balance all three pillars, document trade-offs, and budget in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: Balance(Confidentiality, Integrity, Availability) → EnforceControls() → BudgetInRupees(₹);"
  }
];

export default questions;
