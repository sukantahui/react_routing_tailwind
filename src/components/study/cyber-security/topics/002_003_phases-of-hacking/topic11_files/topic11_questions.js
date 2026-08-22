const questions = [
  {
    question: "What is the core philosophy of 'Defense-in-Depth', and why is relying on a single security control (such as a perimeter firewall) insufficient against modern adversaries?",
    shortAnswer: "Defense-in-Depth deploys multiple overlapping layers of security controls across perimeter, network, endpoint, application, and data layers so that if one layer fails, subsequent layers prevent total breach.",
    explanation: "Adversaries eventually bypass perimeter firewalls using phishing, stolen credentials, or zero-day exploits. In a Defense-in-Depth architecture, breaching the outer firewall lands the attacker in a hostile zero-trust environment: the host is protected by ASLR/DEP and Stack Canaries, credentials are protected by LAPS, lateral movement is blocked by micro-segmentation, and actions are logged to immutable WORM SIEMs.",
    hint: "Think about medieval castles with moats, outer stone walls, portcullises, inner courtyards, and fortified keeps.",
    level: "basic",
    codeExample: `// Defense-in-Depth Concentric Layers:
[ Data Encryption ] ──> [ Endpoint EDR ] ──> [ Network Microsegmentation ] ──> [ WAF / Firewall ] ──> [ User MFA ]`
  },
  {
    question: "What are the primary defensive countermeasures deployed against 'Phase 1: Reconnaissance' to minimize an organization's digital attack surface?",
    shortAnswer: "External Attack Surface Management (EASM), WHOIS privacy protection, sanitizing corporate job listings, Certificate Transparency log monitoring, and deploying deception honeypots.",
    explanation: "Adversaries use OSINT to identify soft targets. Defenses include: 1. EASM: Continuously discovering and retiring orphaned subdomains and cloud buckets; 2. Social Media & Job Sanitization: Preventing HR from posting exact firewall versions or internal server IP ranges; 3. Deception Technology: Seeding fake Canarytokens and decoy servers that alert defenders the moment an adversary scans them.",
    hint: "Think about keeping the house curtains closed, locking the mailbox, and setting tripwire sensors in the garden.",
    level: "basic",
    codeExample: `// Reconnaissance Defense Mechanisms:
1. Continuous EASM Scan: Identify & close unmanaged AWS S3 buckets.
2. Canarytokens Deployment: Place fake API keys in GitHub to detect threat actor scraping.
3. WHOIS Privacy: Mask administrative contact details.`
  },
  {
    question: "What specific countermeasures defeat adversary 'Phase 2: Scanning and Network Enumeration'?",
    shortAnswer: "Next-Generation Firewalls (NGFW) with SYN flood protection, Intrusion Prevention Systems (IPS), Port Knocking, Service Banner Masking (e.g. ServerTokens Prod), and disabling legacy protocols.",
    explanation: "When attackers run Nmap or vulnerability scanners: 1. NGFW & IPS (Suricata/Snort) detect port scan sweeps and rate-limit/block offending IPs; 2. Banner Masking hides software version strings (preventing attackers from identifying vulnerable versions); 3. Disabling SMBv1, Telnet, and SNMPv1/v2 eliminates unencrypted enumeration vectors; 4. Port Knocking leaves administrative ports closed until a specific sequence of packets is received.",
    hint: "Think about hiding room numbers, removing company directory signs, and requiring a secret door knock.",
    level: "moderate",
    codeExample: `// Apache / Nginx Banner Masking Configuration:
# Apache (httpd.conf):
ServerTokens Prod
ServerSignature Off

# Nginx (nginx.conf):
server_tokens off;`
  },
  {
    question: "How do compiler-level memory protections (ASLR, DEP/NX, Stack Canaries) neutralize 'Phase 3: Exploitation' buffer overflow attacks?",
    shortAnswer: "Stack Canaries detect stack corruption before function return; ASLR randomizes memory addresses making hardcoded jumps fail; DEP/NX prevents CPU execution of shellcode on the stack.",
    explanation: "Phase 3 memory corruption attacks rely on precise memory mechanics: 1. GCC Stack Canaries (`-fstack-protector-all`) place random integers before the return address, aborting the process if overwritten; 2. ASLR randomizes base memory offsets on boot, breaking hardcoded `JMP ESP` pointers; 3. DEP/NX marks stack memory pages as non-executable, causing the CPU to throw a fault if it attempts to run injected shellcode.",
    hint: "Remember the three core OS memory protections: Canaries for tamper detection, ASLR for location shuffling, DEP for execution blocking.",
    level: "expert",
    codeExample: `// GCC Binary Hardening Compilation Flags:
gcc -fstack-protector-all -Wl,-z,relro,-z,now -D_FORTIFY_SOURCE=2 -pie -fPIE vulnerable.c -o hardened_app`
  },
  {
    question: "What enterprise controls permanently defeat 'Phase 4: Maintaining Access and Lateral Movement'?",
    shortAnswer: "Microsoft LAPS (randomizing local admin passwords), Tiered Administration (Tier 0 isolation), Endpoint Detection and Response (EDR), Host Micro-segmentation, and UEFI Secure Boot.",
    explanation: "Adversaries maintain access and pivot through shared credentials and unrestricted lateral network paths: 1. Microsoft LAPS assigns unique, rotating passwords to every endpoint, stopping Pass-the-Hash; 2. Tiered Administration prevents Domain Admins from logging into user workstations; 3. Host Micro-segmentation blocks peer-to-peer SMB (Port 445) communication; 4. UEFI Secure Boot prevents kernel-mode rootkits and bootkits from loading.",
    hint: "Think of giving every room a completely different key and bricking up the doorways between guest rooms.",
    level: "moderate",
    codeExample: `// Anti-Lateral Movement Policy:
1. Active Directory: Microsoft LAPS Enabled (Unique password per computer).
2. Host Firewall: Block Inbound Port 445 from workstation subnets.
3. Architecture: Tier 0 Domain Admins strictly forbidden from logging into Tier 2 laptops.`
  },
  {
    question: "What is the primary technical defense against 'Phase 5: Covering Tracks and Log Tampering'?",
    shortAnswer: "Centralized Immutable WORM Logging (Write-Once Read-Many) streaming over encrypted TLS to an off-site SIEM, with automated alerts on Windows Event ID 1102.",
    explanation: "Even if an attacker gains root or SYSTEM access on an endpoint and runs `wevtutil cl Security` or `rm -rf /var/log/*`, centralized WORM logging ensures that every event was already transmitted off-site over TLS to an immutable Splunk/Elastic cluster within milliseconds. Furthermore, the act of clearing the log generates Event ID 1102, which triggers an immediate Critical Priority incident response alert.",
    hint: "Think of security cameras streaming live to a remote armored vault that cannot be deleted by local intruders.",
    level: "basic",
    codeExample: `// Immutable Centralized Logging Pipeline:
Endpoint (Sysmon / Auditd) ──[ Encrypted TLS Stream ]──> Central Splunk WORM Cluster (Write-Once Read-Many)
// Local 'wevtutil cl Security' -> Triggers Instant Event ID 1102 Critical SOC Alert!`
  },
  {
    question: "What are the three core principles of the NIST SP 800-207 'Zero Trust Architecture' (ZTA)?",
    shortAnswer: "1. Never Trust, Always Verify; 2. Assume Breach; 3. Enforce Least Privilege Access based on continuous contextual evaluation.",
    explanation: "Traditional perimeter security assumed that anything inside the internal corporate network was trusted. NIST SP 800-207 Zero Trust rejects this assumption: 1. Never Trust, Always Verify: Every user, device, and network flow must be authenticated and authorized dynamically; 2. Assume Breach: Operate as though adversaries are already present inside the network; 3. Least Privilege: Grant the minimum necessary access for the shortest required duration.",
    hint: "Recall the modern security mantra: Never trust, always verify, assume breach.",
    level: "basic",
    codeExample: `// Zero Trust Architecture Evaluation:
Request: User Mamata accesses Core Payment Switch from Laptop
Evaluation: Valid FIDO2 Key? YES + Healthy Device Posture? YES + Approved Location? YES + Work Hours? YES -> Access Granted for 1 Session!`
  },
  {
    question: "Under the Indian CERT-In Directions 2022, what is the mandatory reporting timeframe for significant cybersecurity incidents under Section 70B of the IT Act 2000?",
    shortAnswer: "All mandatory cybersecurity incidents must be formally reported to CERT-In within 6 hours of noticing or being brought to notice of the incident.",
    explanation: "Issued by the Indian Computer Emergency Response Team (CERT-In) under Section 70B of the Information Technology Act 2000, all service providers, intermediaries, data centers, body corporates, and government entities must mandatorily report specified cyber security incidents (such as ransomware, data breaches, unauthorized access to systems) to CERT-In within 6 hours of discovery.",
    hint: "Remember the strict 6-hour incident reporting window mandated by India's national agency CERT-In.",
    level: "basic",
    codeExample: `// CERT-In 2022 Statutory Mandate:
Reporting SLA: Within 6 HOURS of incident confirmation to incident@cert-in.org.in.
Penalty: Failure to report constitutes criminal non-compliance under IT Act Section 70B(7).`
  },
  {
    question: "What are the maximum financial penalties established under the Indian Digital Personal Data Protection (DPDP) Act 2023 for failure to observe reasonable security safeguards to prevent personal data breaches?",
    shortAnswer: "Penalties up to ₹250 Crores (2500 Million INR) per instance imposed by the Data Protection Board of India.",
    explanation: "The DPDP Act 2023 establishes stringent data protection obligations for 'Data Fiduciaries'. Under Section 33 and the Schedule of Penalties, failure to take reasonable security safeguards to prevent personal data breaches in its possession or under its control attracts administrative financial penalties extending up to ₹250 Crores, enforcing rigorous multi-layered defense-in-depth across Indian enterprises.",
    hint: "Remember the massive ₹250 Crore penalty under the Indian DPDP Act 2023 for catastrophic data breaches.",
    level: "moderate",
    codeExample: `// DPDP Act 2023 Statutory Liability:
Violation: Failure to implement reasonable security safeguards leading to personal data breach.
Penalty: Up to ₹250,00,00,000 (₹250 Crores) imposed by Data Protection Board of India.`
  },
  {
    question: "What is 'Mean-Time-to-Detect' (MTTD) and 'Mean-Time-to-Remediate' (MTTR), and how does a 5-phase Defense-in-Depth posture improve these operational metrics?",
    shortAnswer: "MTTD measures the average time to identify an active intrusion; MTTR measures the average time to contain and eradicate it; Defense-in-Depth with automated EDR/SIEM drops MTTD from weeks to minutes.",
    explanation: "Historically, enterprise MTTD averaged over 200 days because flat networks lacked internal detection telemetry. By deploying Defense-in-Depth—centralized SIEM correlation rules, automated EDR process blocking, and micro-segmentation tripwires—an intrusion attempt triggers alerts in Phase 1 or 2, reducing MTTD to under 5 minutes and enabling automated containment before attackers reach Phase 7 (Actions on Objectives).",
    hint: "Think about how quickly you notice the smoke alarm (MTTD) and how quickly the fire extinguisher puts out the flame (MTTR).",
    level: "moderate",
    codeExample: `// SOC Efficiency Metrics Transformation:
Legacy Flat Network: MTTD = 18 Days (432 Hours) | MTTR = 7 Days | Breach Impact: Catastrophic
Zero Trust Defense:  MTTD = 2.4 Minutes          | MTTR = 8 Minutes | Breach Impact: 100% Contained`
  },
  {
    question: "What is 'Web Application Firewall' (WAF) vs 'Next-Generation Firewall' (NGFW), and at which OSI layers do they enforce security controls?",
    shortAnswer: "NGFW inspects Layer 3/4/7 network traffic (IPs, ports, application signatures, VPNs); WAF inspects Layer 7 HTTP/HTTPS traffic specifically to block web attacks (SQLi, XSS, RCE, Log4j).",
    explanation: "A Next-Generation Firewall (Palo Alto, Fortinet) manages traffic flows across network interfaces, inspecting TCP/UDP ports, detecting protocol anomalies, and enforcing egress filtering. A WAF (Cloudflare, AWS WAF, ModSecurity) acts as a specialized reverse proxy that inspects the contents of HTTP requests, decoding URI parameters, JSON payloads, and cookies to neutralize OWASP Top 10 vulnerabilities like SQL Injection before they reach web servers.",
    hint: "Think of an NGFW as the security guard at the building entrance, and a WAF as the specialized inspector inside the mailroom checking packages for toxic powder.",
    level: "moderate",
    codeExample: `// Firewall Layer Separation:
NGFW (L3/L4/L7): Drops SYN flood packets & blocks outbound C2 connections to known malicious IPs.
WAF (Layer 7):  Inspects HTTP body, blocking "UNION SELECT" SQLi and "\${jndi:ldap}" Log4Shell payloads.`
  },
  {
    question: "How do 'FIDO2 Hardware Passkeys' (WebAuthn) eliminate the entire attack class of Credential Stuffing, Password Spraying, and Phishing?",
    shortAnswer: "FIDO2 uses public-key cryptography bound to the authentic domain origin; the private key never leaves the physical hardware token, making intercepted passwords and phishing proxies impossible to exploit.",
    explanation: "Traditional passwords and SMS OTPs are vulnerable to adversary-in-the-middle phishing (Evilginx2) where the attacker steals the session token. FIDO2 Passkeys (Yubikey / Windows Hello) use asymmetric cryptography. The browser cryptographically signs the challenge with the hardware device's private key, bound to the authentic origin (`https://bank.co.in`). If a user visits a fake phishing URL (`https://bank-login.net`), the cryptographic handshake fails automatically.",
    hint: "Think of a physical cryptographic key that only unlocks the door if the building's physical address matches the address carved into the key.",
    level: "expert",
    codeExample: `// FIDO2 WebAuthn Origin Binding:
Legitimate Site: https://kolkata-fintech.co.in -> Hardware signs challenge -> Authentication SUCCESS!
Phishing Proxy:  https://kolkata-fintech.net    -> Origin Mismatch -> Cryptographic Sign FAILS automatically!`
  },
  {
    question: "What is 'Hardware Unidirectional Optical Data Diode', and why is it the gold standard for protecting SCADA / Industrial Control Systems?",
    shortAnswer: "A physical hardware device that uses an LED and photodiode to transmit data in ONE direction only, making inbound network connections physically and mathematically impossible.",
    explanation: "Software firewalls can have vulnerabilities or misconfigurations. A Unidirectional Optical Data Diode enforces physics: inside the device, an LED transmitter shines light across a fiber strand to a photodiode receiver. SCADA telemetry can flow OUT to corporate monitoring dashboards, but zero electrons or photons can physically travel in reverse. Remote exploitation, reverse shells, and external command execution into the power grid are physically impossible.",
    hint: "Think of a one-way mirror made of light: you can see out, but nobody can throw a physical rock back in.",
    level: "expert",
    codeExample: `// Unidirectional Data Diode Architecture:
SCADA Grid (Protected) ──[ LED Transmitter ]──( Light Fiber )──> [ Photodiode Receiver ] ──> Corporate IT
// Inbound TCP / Exploit Traffic from Corporate IT to SCADA: PHYSICALLY IMPOSSIBLE (Zero Return Fiber)!`
  },
  {
    question: "What is 'Control Flow Guard' (CFG) and 'Shadow Stack' (Intel CET), and how do they defend against Return-Oriented Programming (ROP) exploits?",
    shortAnswer: "CFG verifies indirect call targets at runtime; Intel CET Shadow Stack maintains an immutable secondary stack in hardware to verify return addresses, terminating execution if ROP tampering is detected.",
    explanation: "When DEP/NX stopped shellcode execution on the stack, attackers invented Return-Oriented Programming (ROP) to chain existing instruction gadgets. Hardware defenses neutralize ROP: Intel CET (Control-flow Enforcement Technology) implements a hardware-managed 'Shadow Stack' that stores a duplicate of all return addresses. When a function executes `RET`, the CPU compares the stack return address with the shadow stack. If a ROP gadget altered EIP, the CPU halts immediately.",
    hint: "Think of keeping a duplicate secret copy of the receipt inside an indestructible safe to verify that nobody changed the numbers on the customer copy.",
    level: "expert",
    codeExample: `// Intel CET Shadow Stack Validation:
Function Return: RET instruction executed
CPU Check:       [ Normal Stack Return Addr ] == [ Hardware Shadow Stack Addr ]
Match:           EXECUTE NORMAL FLOW
Mismatch (ROP):  HARDWARE SECURITY FAULT -> Instant Process Termination!`
  },
  {
    question: "What are 'Canarytokens' and 'Honeytokens', and how do they turn adversary reconnaissance and enumeration into instant detection alerts?",
    shortAnswer: "Fake credentials, decoy files, or seeded API keys placed strategically across systems; any unauthorized access or use immediately triggers a high-fidelity SOC alert with zero false positives.",
    explanation: "Defenders plant decoy artifacts: a fake AWS API key in a GitHub repo, a fake spreadsheet named `Salaries_2026.xlsx` containing an embedded webhook, or a fake Active Directory user `krbtgt_admin`. Because no legitimate employee or business process ever touches these decoy assets, ANY interaction with a Canarytoken is guaranteed to be an adversary or malicious insider, generating a 100% true-positive alert.",
    hint: "Think of leaving a fake gold coin on the table with an invisible dye packet that explodes the moment someone picks it up.",
    level: "basic",
    codeExample: `// Canarytoken Deployment:
Decoy File: C:\\Users\\Public\\Executive_Salaries_2026.docx
Attacker Opens File -> Word automatically queries Canarytoken Webhook URL
SOC Alert: [HIGH SEVERITY] Canarytoken Triggered from IP 192.168.1.50 by User: Debangshu!`
  },
  {
    question: "What is 'Patch Management and CVSS Prioritization', and why must organizations remediate vulnerabilities based on EPSS and active threat exploitation rather than CVSS score alone?",
    shortAnswer: "EPSS (Exploit Prediction Scoring System) calculates the real-world probability of active in-the-wild exploitation; prioritizing patches with high EPSS scores neutralizes threats before attackers weaponize them.",
    explanation: "Organizations face thousands of vulnerabilities with high CVSS scores (e.g. 9.8 Critical), but only ~3% are ever weaponized in the wild. The Exploit Prediction Scoring System (EPSS) models real-world threat actor activity. By prioritizing vulnerabilities with high EPSS scores (e.g. EPSS > 0.85) and those listed on CISA's Known Exploited Vulnerabilities (KEV) catalog, security teams patch what attackers are actively exploiting first.",
    hint: "Think about fixing the broken window on the ground floor facing the street before repainting the roof attic.",
    level: "moderate",
    codeExample: `// Modern Vulnerability Prioritization:
Vulnerability A: CVSS 9.8 | EPSS 0.02% (Theoretical lab flaw, zero public exploits) -> Normal SLA
Vulnerability B: CVSS 7.5 | EPSS 94.8% (Actively exploited by ransomware groups)   -> IMMEDIATE 24-HOUR EMERGENCY PATCH!`
  },
  {
    question: "How does the 'RBI Master Direction on Cyber Security' mandate multi-layered defensive controls for Indian Scheduled Commercial Banks?",
    shortAnswer: "Mandates 24x7 SOC monitoring, multi-factor authentication for financial transactions, network micro-segmentation, continuous red teaming, and board-level Cyber Crisis Management Plans (CCMP).",
    explanation: "The Reserve Bank of India (RBI) Cyber Security Framework requires banks to establish rigorous defense-in-depth: continuous security operations centers (SOCs), strict isolation of payment processing switches from corporate IT, mandatory hardware MFA for fund transfers, regular cyber drill simulations, and an executive Cyber Crisis Management Plan to ensure financial stability against nation-state attacks.",
    hint: "Remember the comprehensive banking cybersecurity guidelines enforced by India's central bank RBI.",
    level: "moderate",
    codeExample: `// RBI Cyber Security Compliance Architecture:
Layer 1: 24x7 Security Operations Center (SOC) with real-time SIEM correlation.
Layer 2: Mandatory Hardware MFA / FIDO2 for all SWIFT and RTGS transactions.
Layer 3: Air-gapped isolation of core banking settlement mainframes.`
  },
  {
    question: "What is 'Continuous Security Validation' (Breach and Attack Simulation - BAS), and how does it replace annual point-in-time penetration tests?",
    shortAnswer: "Automated software platforms that continuously execute simulated multi-phase attack techniques 24/7/365 across production environments to verify that defensive controls never degrade.",
    explanation: "An annual penetration test only proves that security was acceptable on a single day in August. Configuration drift, new software updates, and firewall changes degrade security over time. Breach and Attack Simulation (BAS) tools continuously run thousands of non-destructive attack simulations (phishing payloads, privilege escalation, lateral pivoting) every hour, alerting defenders the moment a configuration change breaks an existing detection rule.",
    hint: "Think of running automated daily smoke and fire alarm tests rather than inspecting the building once a year.",
    level: "expert",
    codeExample: `// Breach & Attack Simulation (BAS) Daily Execution:
02:00 AM: Simulate Phishing Attachment (T1566) -> Result: Email Sandboxed (PASS)
02:15 AM: Simulate LSASS Memory Read (T1003)    -> Result: EDR Blocked (PASS)
02:30 AM: Simulate Lateral SMB Pivot (T1021)    -> Result: FAILED! Firewall Rule Drift Detected -> Alert Dispatched!`
  },
  {
    question: "Synthesizing Defensive Countermeasures across the 5 Hacking Phases: what is the ultimate guiding principle for building resilient enterprise security architectures?",
    shortAnswer: "Assume breach; design every component with zero trust, defense-in-depth, immutable telemetry, and continuous validation so that no single failure leads to catastrophic compromise.",
    explanation: "True cybersecurity is not about building an impenetrable outer wall; it is about engineering a resilient system where every phase of the adversary lifecycle meets insurmountable friction. By combining external surface minimization, active scanning IPS blocks, memory hardening, micro-segmentation, immutable WORM logging, and strict compliance with Indian cybersecurity laws, defenders create architectures that withstand real-world attacks and ensure enduring operational resilience.",
    hint: "Conclude by recognizing that defense-in-depth, zero trust, and relentless validation are what transform vulnerable networks into impregnable digital fortresses.",
    level: "expert",
    codeExample: `// The Master Resilient Defense Equation:
(Recon_Minimization + Scanning_IPS + Memory_Hardening + Zero_Trust_LAPS + Immutable_WORM_SIEM) = TOTAL_CYBER_SOVEREIGNTY;`
  }
];

export default questions;
