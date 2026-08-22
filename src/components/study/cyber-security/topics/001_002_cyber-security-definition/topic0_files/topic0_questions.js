// topic0_questions.js
// 30 Moderate to Expert Questions on Introduction to Cyber Security, CIA Triad, Defense-in-Depth, and Core Security Paradigms

const questions = [
  {
    question: "What is Cyber Security and what is its primary objective in digital environments?",
    shortAnswer: "Cyber security is the practice of protecting computer systems, networks, software applications, and digital data from digital attacks, unauthorized access, destruction, disruption, or espionage, ensuring the Confidentiality, Integrity, and Availability (CIA Triad) of information assets.",
    explanation: "It encompasses physical security, network defenses, endpoint protection, application hardening, cryptographic controls, and user security awareness.",
    hint: "The practice of protecting systems, networks, and data from unauthorized access or cyber attacks.",
    level: "basic",
    codeExample: "CyberSecurity_Goal = { Confidentiality: 'Data privacy', Integrity: 'Data trustworthiness', Availability: 'System uptime' };"
  },
  {
    question: "What is the CIA Triad in Cyber Security and why is it considered the foundational model?",
    shortAnswer: "The CIA Triad consists of Confidentiality (preventing unauthorized data disclosure), Integrity (preventing unauthorized data alteration or corruption), and Availability (ensuring authorized users have timely, uninterrupted access to resources).",
    explanation: "Every security policy, firewall rule, encryption algorithm, and access control system is designed to uphold one or more pillars of the CIA Triad.",
    hint: "Confidentiality (privacy), Integrity (accuracy), and Availability (uptime).",
    level: "basic",
    codeExample: "CIA_Triad = {\n  Confidentiality: 'AES-256 Encryption',\n  Integrity: 'SHA-256 Hashing / HMAC',\n  Availability: 'Redundant Servers & Anti-DDoS'\n};"
  },
  {
    question: "What is Defense-in-Depth (Layered Security) architecture?",
    shortAnswer: "A cybersecurity strategy that implements multiple redundant layers of security controls throughout an IT environment (Perimeter Firewalls ➔ Network Segmentation ➔ Endpoint EDR ➔ Application WAF ➔ Database Encryption ➔ User MFA), ensuring that if one layer is breached, subsequent layers prevent total system compromise.",
    explanation: "Eliminates Single Points of Security Failure by forcing adversaries to overcome multiple independent defensive barriers.",
    hint: "Using multiple defensive layers so that if one fails, others stop the attacker.",
    level: "moderate",
    codeExample: "DefenseInDepth_Layers = ['Perimeter NGFW', 'VLAN Microsegmentation', 'Endpoint EDR', 'MFA Auth', 'Data Encryption'];"
  },
  {
    question: "What is the difference between a Vulnerability, a Threat, and an Exploit?",
    shortAnswer: "A Vulnerability is a flaw or weakness in system design or code (e.g. unpatched software); a Threat is a potential actor or event capable of causing harm (e.g. ransomware gang); an Exploit is the specific malicious code or technique that takes advantage of the vulnerability to cause damage.",
    explanation: "Risk = Threat × Vulnerability × Impact. Without an exploit or threat actor, a vulnerability remains passive risk.",
    hint: "Vulnerability = weakness; Threat = danger actor; Exploit = method used to attack the weakness.",
    level: "moderate",
    codeExample: "SecurityEquation: Risk = Vulnerability('Unpatched Port 445') * Threat('Ransomware Group') * Impact('System Encryption');"
  },
  {
    question: "What is the Principle of Least Privilege (PoLP) and how does it reduce security risk?",
    shortAnswer: "A security principle dictating that users, processes, and service accounts must be granted only the minimum access rights and permissions necessary to perform their assigned job functions, and for no longer than required.",
    explanation: "Prevents a compromised junior user account in Barrackpore from executing root administration commands across the corporate network.",
    hint: "Giving users only the minimum permissions needed to do their specific job.",
    level: "basic",
    codeExample: "IAM_Policy: Allow 'BillingUser' ReadOnlyAccess to 'Invoices_Table'; Deny Access to 'System_Root_Configuration';"
  },
  {
    question: "What is the AAA Model in Information Security (Authentication, Authorization, Accounting)?",
    shortAnswer: "Authentication verifies WHO you are (e.g. password + biometric MFA); Authorization determines WHAT you are allowed to do (e.g. RBAC permissions); Accounting tracks WHAT you actually did with timestamps and audit logs (SIEM event correlation).",
    explanation: "AAA protocols (e.g. RADIUS, TACACS+, OAuth 2.0) provide comprehensive identity governance across enterprise networks.",
    hint: "Authentication (who you are), Authorization (what you can do), Accounting (tracking your actions).",
    level: "basic",
    codeExample: "AAA_Flow: Authenticate(UserCredentials) -> Authorize(CheckRoles) -> Account(LogSessionEvents);"
  },
  {
    question: "What is Non-Repudiation in Cyber Security and how is it cryptographically achieved?",
    shortAnswer: "The assurance that the sender or author of a digital transaction cannot deny having sent it; achieved using Asymmetric Digital Signatures (X.509 PKI) and timestamped cryptographic hash chains that legally bind the action to the private key owner.",
    explanation: "Prevents a user in Kolkata from denying that they authorized a ₹50,000 online money transfer.",
    hint: "Proof that a user cannot deny performing a digital transaction, using digital signatures.",
    level: "moderate",
    codeExample: "NonRepudiation = DigitalSignature(DataPayload, SenderPrivateKey) + TimestampToken;"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for deploying an Enterprise Endpoint Detection and Response (EDR) Platform for 100 Workstations?",
    shortAnswer: "Approximately ₹1,80,000 to ₹4,50,000 per year (e.g. CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint) including cloud telemetry management, behavioral AI analysis, and 24/7 automated containment.",
    explanation: "Enterprise cybersecurity budgets formulate endpoint threat protection licenses per seat in annual OpEx in ₹.",
    hint: "Enterprise EDR for 100 PCs costs ₹1,80,000 – ₹4,50,000 per year in Indian Rupees.",
    level: "moderate",
    codeExample: "Annual_EDR_Budget = ₹2,40,000; // 100 Endpoints @ ₹2,400/seat/year with 24/7 Cloud AI Monitoring"
  },
  {
    question: "What is an Attack Surface in cybersecurity and how does Attack Surface Reduction (ASR) work?",
    shortAnswer: "The attack surface is the total sum of all possible points (entry vectors) where an unauthorized user can attempt to enter or extract data from a system; ASR minimizes this surface by disabling unused ports, removing legacy services, enforcing strict firewalls, and patching known vulnerabilities.",
    explanation: "Closing unused telnet and SMB ports on servers in Ichapur shrinks the attack surface available to automated botnets.",
    hint: "Total sum of all entry points a hacker can attack; reduction means closing unused ports and services.",
    level: "moderate",
    codeExample: "AttackSurfaceReduction: DisableService('Telnet'); BlockPort(23); ClosePort(445); RemoveUnusedApps();"
  },
  {
    question: "What is the difference between Symmetric and Asymmetric Encryption?",
    shortAnswer: "Symmetric Encryption uses the same shared secret key for both encryption and decryption (fast, e.g. AES-256, ChaCha20); Asymmetric Encryption uses a mathematically linked key pair: a Public Key for encryption and a Private Key for decryption (e.g. RSA, ECC, ML-KEM).",
    explanation: "Asymmetric encryption securely exchanges symmetric session keys, which are then used to encrypt bulk data streams at line rate.",
    hint: "Symmetric uses one shared key; Asymmetric uses a public key and private key pair.",
    level: "basic",
    codeExample: "Symmetric: CipherText = AES_Encrypt(Data, SecretKey);\nAsymmetric: CipherText = RSA_Encrypt(Data, RecipientPublicKey);"
  },
  {
    question: "What is Zero Trust Architecture (ZTA) and what are its three fundamental tenets?",
    shortAnswer: "1. Verify Explicitly (always authenticate and authorize based on all available data points); 2. Use Least Privilege Access (limit user access with Just-In-Time and Just-Enough-Access); 3. Assume Breach (minimize blast radius by segmenting networks, encrypting all sessions, and using threat analytics).",
    explanation: "ZTA treats internal network traffic with the same suspicion as external Internet traffic, removing the concept of a 'trusted internal LAN'.",
    hint: "1. Verify Explicitly, 2. Least Privilege, 3. Assume Breach.",
    level: "expert",
    codeExample: "ZTA_Policy: if (verifyIdentity(User) && verifyDeviceHealth(PC) && riskScore < 20) grantTemporaryAccess();"
  },
  {
    question: "What is a Zero-Day Vulnerability and a Zero-Day Exploit?",
    shortAnswer: "A Zero-Day Vulnerability is a security flaw in software unknown to the vendor or for which no official patch exists; a Zero-Day Exploit is malicious code created by attackers to exploit this flaw before software developers have had 'zero days' to fix it.",
    explanation: "Zero-days trade for millions of rupees on black-hat markets and require behavioral anomaly detection rather than static signature matching to detect.",
    hint: "A software flaw unknown to the vendor with zero patches available yet.",
    level: "basic",
    codeExample: "ZeroDayState: PatchAvailable = false; ExploitInWild = true; DetectionMethod = 'Behavioral EDR / Heuristics';"
  },
  {
    question: "What is Social Engineering in cyber security and why is it considered the hardest vector to defend?",
    shortAnswer: "The psychological manipulation of human beings into performing actions or divulging confidential information (e.g. Phishing, Spear-Phishing, Pretexting, Vishing, Baiting); it targets human cognitive biases (trust, urgency, fear) rather than software bugs.",
    explanation: "A ₹20,00,000 enterprise firewall cannot prevent an employee in Barrackpore from typing their password into a spoofed email login link.",
    hint: "Tricking humans into giving away passwords or access through psychological manipulation.",
    level: "basic",
    codeExample: "SocialEngineering_Mitigation = ['Mandatory Phishing Drills', 'FIDO2 Hardware Security Keys', 'MFA Verification'];"
  },
  {
    question: "What is Multi-Factor Authentication (MFA) and what are the three authentication factor categories?",
    shortAnswer: "1. Something You Know (Password, PIN); 2. Something You Have (Smartphone Authenticator App, FIDO2 Hardware USB Token); 3. Something You Are (Biometrics: Fingerprint, Face ID, Iris Scan). Requiring two or more distinct factors stops 99.9% of credential-stuffing attacks.",
    explanation: "Even if an adversary steals a password via phishing, they cannot log in without the physical second factor token in Kolkata.",
    hint: "Something you know (password), something you have (phone/token), something you are (biometric).",
    level: "basic",
    codeExample: "MFA_Verification: Factor1(Password_OK) + Factor2(FIDO2_USB_Key_OK) => GrantSessionToken();"
  },
  {
    question: "What is Cryptographic Hashing and how does it guarantee Data Integrity?",
    shortAnswer: "A one-way mathematical function (e.g. SHA-256) that converts arbitrary input data into a unique, fixed-size 256-bit hash string; any change to even a single bit of the input produces a completely different hash (Avalanche Effect), revealing data tampering instantly.",
    explanation: "Used to verify downloaded software integrity, store hashed passwords securely, and validate digital blockchain blocks in Jadavpur.",
    hint: "One-way math function where any tiny change in data changes the entire hash output.",
    level: "basic",
    codeExample: "SHA256('Data_V1') = 0x8F3A...; SHA256('Data_V2') = 0x1B9C...; // Proves tampering if hashes differ"
  },
  {
    question: "What is a Security Operations Center (SOC) and what is the role of a Tier-1 vs Tier-2 Analyst?",
    shortAnswer: "A centralized 24/7 security monitoring facility; Tier-1 SOC Analysts triage real-time SIEM alerts, eliminate false positives, and escalate incidents; Tier-2 SOC Analysts perform deep threat investigation, root cause analysis, and containment response.",
    explanation: "SOC teams in Kolkata correlate logs from firewalls, servers, and endpoints to intercept stealth intrusions in real time.",
    hint: "24/7 security center; Tier-1 monitors and filters alerts; Tier-2 investigates and neutralizes attacks.",
    level: "moderate",
    codeExample: "SOC_Workflow: SIEM_Alert -> Tier1_Triage(ValidateThreat) -> Tier2_Containment(IsolateHost) -> Tier3_ThreatHunt"
  },
  {
    question: "What is a Man-in-the-Middle (MitM) Attack and how does TLS encryption defeat it?",
    shortAnswer: "An attack where an adversary silently intercepts and relays communications between two parties without their knowledge; defeated by TLS encryption where X.509 digital certificates authenticate server identity and derived symmetric keys encrypt the entire payload.",
    explanation: "Prevents rogue Wi-Fi hotspots in coffee shops from intercepting plain text login sessions.",
    hint: "An attacker secretly eavesdropping on network traffic; stopped by TLS encryption and certificates.",
    level: "basic",
    codeExample: "TLS_Protection: Client <--(Encrypted TLS Session + Server Cert Verification)--> AuthenticServer"
  },
  {
    question: "What is the difference between Threat Hunting and Automated Threat Detection?",
    shortAnswer: "Automated Threat Detection relies on pre-programmed signatures and rules to trigger alerts (reactive); Threat Hunting is a proactive, human-led hypothesis-driven process where security analysts search for stealth adversaries already lurking undetected in the network.",
    explanation: "Threat hunters in Barrackpore analyze anomalous process execution chains to discover zero-day APT infections.",
    hint: "Detection waits for alerts automatically; Threat hunting proactively searches for stealth hackers.",
    level: "expert",
    codeExample: "ThreatHunting: Hypothesis('Adversary using PowerShell WMI persistence') -> QueryEDRTelemetry() -> NeutralizeLurkingAttacker"
  },
  {
    question: "What is Role-Based Access Control (RBAC) vs Attribute-Based Access Control (ABAC)?",
    shortAnswer: "RBAC assigns permissions based on static user job titles (e.g. Doctor, Nurse, Billing Clerk); ABAC evaluates dynamic attributes (user role, department, device security posture, IP location, time of day) using boolean policies for fine-grained authorization.",
    explanation: "ABAC allows a doctor to view patient records only while connected from a hospital-managed tablet inside the hospital geographic boundary.",
    hint: "RBAC assigns rights by job title; ABAC evaluates dynamic context (location, device health, time).",
    level: "moderate",
    codeExample: "ABAC_Rule: if (user.role == 'Doctor' && device.isCompliant && location == 'Hospital_LAN') allowAccess();"
  },
  {
    question: "What is Ransomware and what is Double Extortion vs Triple Extortion?",
    shortAnswer: "Ransomware is malware that encrypts files and demands payment for decryption; Double Extortion exfiltrates confidential data before encryption and threatens public leak; Triple Extortion adds DDoS attacks against the victim and direct extortion of the victim's customers/partners.",
    explanation: "Ransomware gangs use multi-layered extortion to force corporate victims to pay extortion fees in cryptocurrency.",
    hint: "Ransomware encrypts files; double extortion threatens leaks; triple extortion adds DDoS and client harassment.",
    level: "moderate",
    codeExample: "RansomwareEvolution = ['1. Encrypt Local Files', '2. Exfiltrate & Threaten Public Leak', '3. DDoS & Harass Customers'];"
  },
  {
    question: "What is Data Loss Prevention (DLP) in corporate information security?",
    shortAnswer: "A suite of endpoint and network software tools that inspects data in use, data in motion, and data at rest against pattern dictionaries (e.g. credit card numbers, Aadhaar IDs, source code), blocking unauthorized transmission via USB, email, or cloud uploads.",
    explanation: "Prevents disgruntled employees in Kolkata from copying proprietary engineering blueprints to external USB thumb drives.",
    hint: "Monitors and blocks sensitive corporate files from being copied to USBs or personal emails.",
    level: "basic",
    codeExample: "dlp.inspectOutbound(emailAttachment) => if (contains16DigitPAN) blockEmail() && alertCISO();"
  },
  {
    question: "What is Security Information and Event Management (SIEM) log aggregation?",
    shortAnswer: "A centralized platform (e.g. Splunk, Elastic SIEM, Microsoft Sentinel) that collects, normalizes, and analyzes log telemetry across all network firewalls, servers, databases, and endpoints, applying correlation rules and machine learning to detect cyber attacks.",
    explanation: "Allows security analysts to correlate a failed login in Ichapur with an unauthorized database query in Kolkata.",
    hint: "Centralizes and analyzes logs from all company servers and firewalls to detect attacks.",
    level: "moderate",
    codeExample: "SIEM_Correlation: if (count(Failed_SSH_Logins) > 10 in 1_Min && followedBy(AdminPrivilegeEscalation)) triggerAlert();"
  },
  {
    question: "What is Penetration Testing (Ethical Hacking) and how does it differ from a Vulnerability Assessment?",
    shortAnswer: "A Vulnerability Assessment is an automated scan that identifies and lists potential security weaknesses (broad overview); Penetration Testing is an authorized, manual simulation of a real cyber attack that actively exploits vulnerabilities to demonstrate real-world impact and breach depth.",
    explanation: "Ethical hackers in Kolkata demonstrate how an unpatched server can lead to full domain controller compromise.",
    hint: "Vulnerability scan lists weaknesses; Penetration test actively breaks in to prove real impact.",
    level: "basic",
    codeExample: "Pentest_Lifecycle = ['1. Reconnaissance', '2. Vulnerability Scanning', '3. Exploitation', '4. Post-Exploitation / Reporting'];"
  },
  {
    question: "What is the Cyber Kill Chain framework developed by Lockheed Martin?",
    shortAnswer: "A 7-phase model detailing the stages of an advanced cyber attack: 1. Reconnaissance ➔ 2. Weaponization ➔ 3. Delivery ➔ 4. Exploitation ➔ 5. Installation ➔ 6. Command & Control (C2) ➔ 7. Actions on Objectives.",
    explanation: "Defenders use the Cyber Kill Chain to detect and sever attacks at the earliest possible stage, preventing data exfiltration.",
    hint: "7 stages of a cyber attack: Recon, Weaponize, Deliver, Exploit, Install, Command & Control, Actions.",
    level: "expert",
    codeExample: "KillChain_Phases = ['Reconnaissance', 'Weaponization', 'Delivery', 'Exploitation', 'Installation', 'C2', 'ActionsOnObjectives'];"
  },
  {
    question: "What is MITRE ATT&CK Framework and how is it used in threat intelligence?",
    shortAnswer: "A globally accessible knowledge base of adversary Tactics, Techniques, and Common Knowledge (TTPs) based on real-world cyber attack observations, providing a standardized matrix to evaluate defensive coverage and simulate adversary behaviors.",
    explanation: "Security teams in Jadavpur map their EDR detections against MITRE ATT&CK IDs (e.g. T1059 Command and Scripting Interpreter).",
    hint: "Standardized encyclopedia of real-world hacker tactics and techniques used to test defenses.",
    level: "expert",
    codeExample: "ATT&CK_Mapping: Tactic 'Credential Access' -> Technique 'T1003.001 LSASS Memory Dumping' -> DetectionRule 'Alert on Mimikatz'"
  },
  {
    question: "What is a Denial-of-Service (DoS) vs Distributed Denial-of-Service (DDoS) Attack?",
    shortAnswer: "A DoS attack originates from a single source host to exhaust target resources; a DDoS attack orchestrates thousands of compromised botnet nodes across the globe to flood target bandwidth or server queues simultaneously with multi-hundred-gigabit traffic floods.",
    explanation: "DDoS attacks cannot be mitigated by simple IP blocking because traffic originates from thousands of distributed bot IPs.",
    hint: "DoS is from one computer; DDoS is from a botnet of thousands of computers globally.",
    level: "basic",
    codeExample: "DDoS_Mitigation = ['BGP Anycast Scrubbing', 'Cloudflare Magic Transit', 'SYN Cookies', 'Rate Limiting'];"
  },
  {
    question: "What is Identity and Access Management (IAM) and Privileged Access Management (PAM)?",
    shortAnswer: "IAM manages user identities, lifecycle provisioning, and access policies across all enterprise resources; PAM focuses specifically on securing, vaulting, and auditing high-privilege administrative accounts (root/Domain Admin) with temporary session credentials.",
    explanation: "PAM eliminates static administrative root passwords and records all terminal keystrokes during admin sessions in Barrackpore.",
    hint: "IAM manages standard user logins; PAM vaults and records high-privilege root/admin sessions.",
    level: "moderate",
    codeExample: "PAM_Workflow: Admin requests temporary root access -> PAM grants 1-hour vaulted token -> Keystrokes recorded."
  },
  {
    question: "What is Air-Gap Security and how do adversaries attempt to bridge it (e.g. Stuxnet)?",
    shortAnswer: "Air-gapping is the complete physical isolation of a computer or network with zero connection to the Internet; adversaries bridge air-gaps by infecting authorized personnel USB drives (as seen in Stuxnet) or exploiting acoustic/electromagnetic side-channel emissions.",
    explanation: "Critical nuclear reactors and defense control stations maintain strict physical air-gaps to prevent remote internet attacks.",
    hint: "Complete physical isolation with no network cables; bridged via infected employee USB drives.",
    level: "expert",
    codeExample: "AirGap_Protocol: PhysicalCablesConnected = 0; WirelessDisabled = true; USBMediaScannedInIsolatedKiosk();"
  },
  {
    question: "What is Security Culture & Continuous Cybersecurity Awareness Training?",
    shortAnswer: "An organizational mindset where every employee actively participates in cyber defense, reinforced through regular simulated phishing tests, security hygiene workshops, and frictionless reporting procedures for suspicious emails.",
    explanation: "Transforms human employees from the weakest security link into the first line of proactive cyber defense in Kolkata.",
    hint: "Training employees continuously so they recognize and report phishing emails immediately.",
    level: "basic",
    codeExample: "SecurityCulture: ConductSimulatedPhishing() -> TrainClickers() -> RewardEmployeesWhoReport();"
  },
  {
    question: "What is the ultimate golden rule for mastering, implementing, and governing Cyber Security?",
    shortAnswer: "'Uphold the CIA Triad through Layered Defense-in-Depth; enforce Zero Trust with Least Privilege and Multi-Factor Authentication; continuously monitor endpoints with EDR and SIEM; eliminate single points of failure; and budget cybersecurity infrastructure in Indian Rupees (₹)!'",
    explanation: "This complete rule captures foundational security models, identity verification, continuous behavioral telemetry, architecture resiliency, and financial procurement budgeting.",
    hint: "CIA Triad + Defense-in-Depth + Zero Trust MFA + EDR/SIEM monitoring + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: EnforceCIATriad() -> BuildDefenseInDepth() -> ImplementZeroTrustMFA() -> MonitorWithEDR_SIEM() -> BudgetInRupees(₹);"
  }
];

export default questions;
