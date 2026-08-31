// topic11_questions.js
// 30 Comprehensive Questions on Topic 11: Synthesizing Strategic Defensive Takeaways for Modern Enterprises

const questions = [
  {
    id: 1,
    question: "What is the overarching strategic thesis derived from all eight landmark historical cyber attack case studies?",
    shortAnswer: "Absolute invulnerability is an illusion; enterprise survival depends on strategic cyber resilience—combining automated hygiene, Zero Trust architecture, and rapid containment to minimize blast radius.",
    explanation: "From Stuxnet to Colonial Pipeline, history proves that motivated adversaries will eventually find a vector (supply chains, contractors, zero-days, or phishing). Modern enterprises succeed not by assuming their perimeter is unbreakable, but by engineering systems that survive partial compromise without operational catastrophe.",
    hint: "Cyber resilience and blast radius containment over the illusion of absolute invulnerability.",
    level: "Moderate",
    codeExample: `// The Grand Enterprise Security Axiom:
// Enterprise Survival = (Mean Time to Detect + Mean Time to Contain) * Blast Radius Containment * Immutable Recovery`
  },
  {
    id: 2,
    question: "What are the six core functions of the updated NIST Cybersecurity Framework (NIST CSF 2.0)?",
    shortAnswer: "1. Govern (GV); 2. Identify (ID); 3. Protect (PR); 4. Detect (DE); 5. Respond (RS); 6. Recover (RC).",
    explanation: "NIST CSF 2.0 added 'Govern' as a foundational overarching pillar. Governance ensures that cybersecurity risk management is directly aligned with organizational strategy, executive oversight, legal compliance, and enterprise supply chain risk management.",
    hint: "Govern, Identify, Protect, Detect, Respond, and Recover.",
    level: "Moderate",
    codeExample: `// NIST CSF 2.0 Core Structure:
const nistCsf2 = {
  govern: "Organizational context, risk management strategy, supply chain governance",
  identify: "Asset management, risk assessment, vulnerability identification",
  protect: "Identity management, authentication, data security, platform security",
  detect: "Continuous monitoring, anomaly detection, threat hunting",
  respond: "Incident management, containment, eradication, communication",
  recover: "Restoration planning, recovery validation, public communication"
};`
  },
  {
    id: 3,
    question: "How does the 'Board-Level Cybersecurity Governance' model shift legal and financial accountability to corporate directors?",
    shortAnswer: "Corporate boards are held legally fiduciary accountable for cybersecurity oversight, cyber risk disclosures, and material breach reporting under SEC and international governance laws.",
    explanation: "Cybersecurity is no longer merely a technical IT issue; it is a major enterprise business risk. Corporate directors and CISOs in India, the US, and the EU face regulatory sanctions and shareholder derivative lawsuits if they fail to actively review cyber posture and ensure adequate security budgets.",
    hint: "Boards are held to legal fiduciary standards for cybersecurity risk oversight.",
    level: "Moderate",
    codeExample: `// Board Cybersecurity Governance Charter:
const boardGovernanceCharter = [
  "1. Quarterly CISO executive risk briefings and threat matrix reviews",
  "2. Mandatory review of Software Bill of Materials (SBOM) and supply chain risks",
  "3. Oversight of cyber insurance adequacy and incident response preparedness",
  "4. Formal sign-off on regulatory breach disclosure protocols (CERT-In / SEC)"
];`
  },
  {
    id: 4,
    question: "What is 'Cyber Threat Intelligence' (CTI) and how does the 'Diamond Model of Intrusion Analysis' structure adversary tracking?",
    shortAnswer: "A framework that maps every cyber event into four core vertices: Adversary, Capability (tool/malware), Infrastructure (IP/C2), and Victim.",
    explanation: "The Diamond Model establishes mathematical and contextual relationships between the four nodes. If an analyst discovers a new capability (SUNBURST backdoor) and infrastructure (`avsvmcloud.com`), correlating with victim profiles reveals the adversary (Russian SVR / APT29).",
    hint: "Four core vertices: Adversary, Capability, Infrastructure, and Victim.",
    level: "Expert",
    codeExample: `// Diamond Model Intrusion Mapping:
const diamondModelInstance = {
  adversary: "APT29 / Cozy Bear (Russian Foreign Intelligence Service - SVR)",
  capability: "SUNBURST Trojanized DLL + Golden SAML Token Forgery",
  infrastructure: "DNS DGA Subdomain Tunneling ('avsvmcloud.com') + Dedicated US Residential Proxies",
  victim: "SolarWinds CI/CD Build Pipeline → US Government Cabinet Agencies & Tech Vendors"
};`
  },
  {
    id: 5,
    question: "How does 'AI-Augmented Defensive Operations' (SOC Automation / SOAR) counter machine-speed adversary attacks?",
    shortAnswer: "Using automated machine-learning models to analyze millions of telemetry events in seconds and executing automated playbook responses (e.g. host isolation) without human latency.",
    explanation: "Adversaries use automated tooling to spread worms and scan networks in milliseconds (WannaCry, NotPetya). Security Orchestration, Automation, and Response (SOAR) platforms detect anomalous behavior and execute instant containment actions (disabling accounts, isolating endpoints) in seconds.",
    hint: "Executing automated containment playbooks in seconds without human latency.",
    level: "Moderate",
    codeExample: `// SOAR Automated Playbook Execution:
/*
TRIGGER: High-Entropy DNS DGA Resolution + Mimikatz Memory Alert
ACTION 1: API Call → Firewall: Block C2 Domain & Ingress IP
ACTION 2: API Call → EDR: Isolate Host WKSTN-0982 from Corporate LAN
ACTION 3: API Call → Entra ID: Revoke User Refresh Tokens & Invalidate Session
ACTION 4: Generate P1 Ticket in ServiceNow and Notify SOC On-Call via PagerDuty
*/`
  },
  {
    id: 6,
    question: "What is 'Defense-in-Depth' and why does relying on any single defensive layer guarantee eventual failure?",
    shortAnswer: "Layering redundant defensive mechanisms across physical, perimeter, network, host, application, and data tiers so that when one layer fails, subsequent layers prevent compromise.",
    explanation: "Every security control has flaws: firewalls cannot inspect encrypted payloads without SSL inspection; antivirus misses novel polymorphic malware; MFA can be bypassed with session hijacking. Defense-in-depth ensures that an attacker bypassing the firewall still confronts micro-segmentation, EDR, and data tokenization.",
    hint: "Layering multiple independent defensive controls across all tiers of the computing stack.",
    level: "Moderate",
    codeExample: `// Layered Defense-in-Depth Matrix:
// Layer 1: Perimeter (WAF, DDoS Shield, ZTNA Dark Cloud)
// Layer 2: Network (Purdue IDMZ, Host-based East-West packet filtering)
// Layer 3: Identity (Universal FIDO2 Hardware MFA, Just-In-Time PAM)
// Layer 4: Host (EDR Behavioral Process Blocking, Memory Integrity)
// Layer 5: Data (AES-256 GCM Tokenization, Immutable WORM Backups)`
  },
  {
    id: 7,
    question: "What is 'Cyber Risk Quantification' (CRQ) using the FAIR (Factor Analysis of Information Risk) framework?",
    shortAnswer: "A mathematical framework that quantifies cyber risk in financial currency (e.g. ₹ Crores or USD) by calculating Loss Event Frequency and Loss Magnitude.",
    explanation: "Technical metrics (e.g. 'we have 400 vulnerabilities') do not help corporate executives make investment decisions. The FAIR framework calculates probabilities and financial impacts (e.g. 'A ransomware attack on our Kolkata refinery has an 8% annual probability with an estimated loss of ₹45 Crores'), allowing CISOs to justify security investments based on financial ROI.",
    hint: "Translating technical cyber risk into financial currency using probabilistic loss modeling.",
    level: "Expert",
    codeExample: `// FAIR Risk Calculation Formula:
// Annual Loss Expectancy (ALE) = Loss Event Frequency (LEF) * Loss Magnitude (LM)
// Example: ALE = (0.05 probability / yr) * (₹80 Crores estimated breach impact) = ₹4 Crores / yr risk exposure`
  },
  {
    id: 8,
    question: "How does the Indian DPDP Act 2023 redefine 'Data Principal' rights and 'Data Fiduciary' accountability?",
    shortAnswer: "Grants citizens (Data Principals) rights to access, correction, and erasure, while holding organizations (Data Fiduciaries) strictly liable for data security with penalties up to ₹250 Crores.",
    explanation: "The Digital Personal Data Protection Act 2023 transforms enterprise governance in India. Data fiduciaries operating across West Bengal and nationwide must enforce strict consent management, implement technical security safeguards, and notify the Data Protection Board of any personal data breach.",
    hint: "Empowers citizens with privacy rights while holding enterprises liable for up to ₹250 Crores in fines.",
    level: "Moderate",
    codeExample: `// DPDP 2023 Governance Requirements:
const dpdpGovernanceRules = [
  "Mandatory consent collection with clear, transparent purpose specification",
  "Right of Data Principals to access, update, and withdraw consent (Right to be Forgotten)",
  "Obligation to implement reasonable technical safeguards (Zero Trust & Encryption)",
  "Statutory liability up to ₹250 Crores for failure to prevent data breaches"
];`
  },
  {
    id: 9,
    question: "What is 'Third-Party Software Supply Chain Risk Management' (C-SCRM)?",
    shortAnswer: "Systematically evaluating and enforcing cybersecurity standards, SBOM verification, and code provenance across all external software vendors, contractors, and cloud suppliers.",
    explanation: "SolarWinds, Target, and NotPetya demonstrated that attackers routinely exploit suppliers to breach well-defended enterprises. C-SCRM mandates vendor risk assessments, contractual security SLAs, SLSA build provenance attestations, and continuous attack surface monitoring of all suppliers.",
    hint: "Evaluating and enforcing cybersecurity standards and SBOM verification across all suppliers.",
    level: "Moderate",
    codeExample: `// C-SCRM Vendor Audit Checklist:
const vendorScrmAudit = {
  vendorName: "Industrial IoT Analytics Pvt Ltd (Kolkata)",
  sbomStandard: "CycloneDX JSON provided with every release",
  buildProvenance: "SLSA Level 3 Attestation Verified",
  mfaCompliance: "100% FIDO2 Hardware MFA on contractor access portals",
  slaPenalty: "Immediate contract termination for unpatched critical CVEs older than 48 hours"
};`
  },
  {
    id: 10,
    question: "What is 'Zero Trust Identity Architecture' and why is 'Identity the New Perimeter' in modern computing?",
    shortAnswer: "Because mobile workforces and cloud services dissolved physical network boundaries, cryptographic identity verification (FIDO2 MFA + Device Posture) is the primary security boundary.",
    explanation: "In modern hybrid environments, applications run in AWS/Azure and employees work from Kolkata, Barrackpore, or globally. Traditional corporate LAN perimeters no longer exist. Identity, backed by hardware credentials and conditional access policies, is the universal control plane governing access to every corporate asset.",
    hint: "With cloud and remote work dissolving physical LANs, verified identity is the true security boundary.",
    level: "Moderate",
    codeExample: `// Identity-Centric Access Assertion:
const identityAssertion = {
  user: "mamata@enterprise.corp",
  authMethod: "FIDO2_Hardware_YubiKey",
  deviceState: "Intune_Compliant_TPM_Verified",
  riskScore: "LOW (Trusted IP Range & Known Device)",
  authorizedScope: "Read-Only Access to Financial Invoices API (Port 8443)"
};`
  },
  {
    id: 11,
    question: "What is 'Immutable Architecture & Data Survivability' and how does it guarantee disaster recovery?",
    shortAnswer: "Storing backups in Write-Once-Read-Many (WORM) air-gapped repositories where data cannot be overwritten, encrypted, or deleted even by root administrators for a specified retention period.",
    explanation: "Ransomware groups (DarkSide, NotPetya, Sony) deliberately target and encrypt enterprise backup repositories. Immutable WORM storage (e.g. AWS S3 Object Lock in Compliance Mode) uses cryptographic retention locks that mathematically prevent ransomware or malicious insiders from altering backups.",
    hint: "Write-Once-Read-Many (WORM) air-gapped storage that cannot be deleted or encrypted by ransomware.",
    level: "Expert",
    codeExample: `// AWS S3 Object Lock Compliance Mode Policy (JSON):
/*
{
  "ObjectLockConfiguration": {
    "ObjectLockEnabled": "Enabled",
    "Rule": {
      "DefaultRetention": {
        "Mode": "COMPLIANCE",  # CANNOT be deleted or modified even by AWS Root Account!
        "Days": 90
      }
    }
  }
}
*/`
  },
  {
    id: 12,
    question: "What is 'Cybersecurity Mesh Architecture' (CSMA) as defined by Gartner?",
    shortAnswer: "A composable, modular approach to security architecture that unifies disparate security tools (EDR, SIEM, IAM, WAF) into an integrated, interoperable collaborative ecosystem.",
    explanation: "Organizations often run 40+ disconnected security tools from different vendors that do not share intelligence. CSMA integrates these tools via standard APIs and data fabrics, allowing an alert on an endpoint EDR in Barrackpore to dynamically update cloud firewalls and revoke identity tokens in real time.",
    hint: "A modular architecture connecting disparate security tools into an integrated collaborative ecosystem.",
    level: "Expert",
    codeExample: `// CSMA Collaborative Ecosystem Flow:
// EDR Sensor Flags Malware ---> CSMA Security Intelligence Fabric --->
// 1. Firewall blocks malicious IP
// 2. Identity Provider forces step-up MFA
// 3. SIEM correlates global alerts`
  },
  {
    id: 13,
    question: "What is 'Purple Teaming' and how does it optimize enterprise defensive capabilities?",
    shortAnswer: "A collaborative continuous exercise where Red Team (attackers) and Blue Team (defenders) work together in real time to test and immediately tune detection signatures and defensive controls.",
    explanation: "In traditional siloed models, Red Teams produce a PDF report once a year that sits unaddressed. In Purple Teaming, the Red Team executes a specific MITRE ATT&CK technique (e.g. Kerberoasting), the Blue Team observes if their SIEM/EDR caught it, tunes the detection rule immediately, and re-tests until coverage is 100%.",
    hint: "Red and Blue teams working collaboratively in real time to test and tune detection rules.",
    level: "Moderate",
    codeExample: `// Purple Team Continuous Tuning Loop:
// Step 1: Red Team executes atomic test: 'Invoke-Mimikatz -DumpCreds'
// Step 2: Blue Team verifies if Sysmon Event ID 10 flagged LSASS process access
// Step 3: If missed, Blue Team writes new Sigma rule and deploys to EDR
// Step 4: Red Team re-runs attack → Confirms 100% detection and automated host isolation!`
  },
  {
    id: 14,
    question: "What is 'Continuous Security Validation' (Breach and Attack Simulation - BAS)?",
    shortAnswer: "Running automated, non-destructive attack simulations 24/7/365 across production environments to detect security drift and broken controls before real adversaries find them.",
    explanation: "Security configurations drift over time (a firewall rule is accidentally opened, an EDR sensor crashes). BAS platforms continuously launch thousands of simulated cyber attacks across the network, automatically notifying engineers if a change leaves a gap in defensive coverage.",
    hint: "Automated, non-destructive attack simulations running 24/7 to catch security configuration drift.",
    level: "Moderate",
    codeExample: `// BAS Continuous Validation Telemetry:
const basValidationReport = {
  testTimestamp: "2026-08-23 04:30:00 IST",
  simulatedTTP: "T1003.001 - OS Credential Dumping: LSASS Memory",
  testTarget: "Branch Server BARRACKPORE-SRV-02",
  detectionStatus: "PASSED: Microsoft Defender for Endpoint terminated simulation in 1.2 seconds",
  mitreCoverageIndex: "96.4%"
};`
  },
  {
    id: 15,
    question: "How does the 'Purdue Model Level 3.5 Industrial DMZ' safeguard critical infrastructure against nation-state cyber warfare?",
    shortAnswer: "By terminating all direct network routing between enterprise IT and industrial SCADA control networks, enforcing proxy jump-hosts, and mandating unidirectional data diodes.",
    explanation: "As demonstrated in Ukraine (2015) and Colonial Pipeline (2021), direct IT/OT connectivity is disastrous. The Level 3.5 IDMZ ensures that an attacker possessing corporate IT administrative credentials cannot route packets directly to substation switches, turbine speed controllers, or oil flow meters.",
    hint: "Terminating direct IP routing between IT and SCADA using IDMZ proxies and data diodes.",
    level: "Expert",
    codeExample: `// Industrial DMZ Firewall Routing Rule:
/*
ZONE: Enterprise_Corporate_IT (Zone 4)
ZONE: Industrial_IDMZ (Zone 3.5)
ZONE: SCADA_Process_Control (Zone 3)

RULE 1: IT (Zone 4) → IDMZ Jump-Host (Zone 3.5) [ALLOWED: Port 443 with Hardware MFA]
RULE 2: IDMZ Jump-Host (Zone 3.5) → SCADA Master (Zone 3) [ALLOWED: Port 3389 Protocol Break]
RULE 3: IT (Zone 4) DIRECT TO SCADA (Zone 3) [EXPLICIT DROP & ALERT!]
*/`
  },
  {
    id: 16,
    question: "What is 'Executive Cyber Crisis Playbook' and why must it be rehearsed at the C-suite level?",
    shortAnswer: "A documented strategic decision-making protocol that establishes pre-authorized authority thresholds, regulatory notification procedures, and operational continuity actions during catastrophic breaches.",
    explanation: "During a major breach, technical engineers cannot make multi-crore business decisions (e.g. shutting down an entire regional pipeline or disclosing breaches to the media). Rehearsing crisis playbooks ensures CEOs, General Counsels, and CISOs make calm, legally compliant decisions under extreme operational duress.",
    hint: "A documented strategic protocol guiding C-suite executive decisions during catastrophic crises.",
    level: "Moderate",
    codeExample: `// Executive Crisis Threshold Matrix:
const crisisThresholds = {
  severity1_Catastrophe: {
    criteria: "Critical infrastructure physical disruption OR exfiltration of >1,000,000 PII records",
    authorities: "Immediate CEO notification; General Counsel convenes Board; CISO engages CERT-In within 6 hours",
    decisionProtocols: "Pre-authorized physical failover to manual islanding mode"
  }
};`
  },
  {
    id: 17,
    question: "What is 'Data Tokenization' and why is it architecturally superior to simple encryption for database protection?",
    shortAnswer: "Replacing sensitive data (e.g. credit card numbers or Aadhaar IDs) with mathematically unrelated random surrogate values (tokens) that have zero mathematical relationship to the original plaintext.",
    explanation: "If an adversary compromises a database server and steals the decryption key from memory (as in Equifax and Target), all encrypted data is exposed. With tokenization, the real sensitive data resides in a separate, isolated, heavily secured Token Vault; the database contains only worthless random tokens.",
    hint: "Replacing sensitive data with random surrogate tokens stored in an isolated token vault.",
    level: "Expert",
    codeExample: `// Tokenization Transformation:
// Original Sensitive Aadhaar Number: 4891 8492 1092
// Database Stored Token:              TOK_9a82-f4b1-99c0
// (Even if hacker dumps entire SQL database, tokens are mathematically impossible to reverse without Vault access!)`
  },
  {
    id: 18,
    question: "What is 'DevSecOps Shift-Left' and how does it prevent vulnerable code from entering production pipelines?",
    shortAnswer: "Integrating automated security testing (SAST, DAST, SCA, and container image signing) directly into developer IDEs and Git pre-commit hooks, catching vulnerabilities before code is compiled.",
    explanation: "Fixing security bugs after deployment is 100x more expensive and leaves systems exposed. Shifting left means security is automated at every step: static analysis (SAST) checks source code, SCA checks third-party dependencies, and SLSA provenance verifies build integrity before binaries are signed.",
    hint: "Automating security testing early in developer workflows and CI/CD pipelines before deployment.",
    level: "Moderate",
    codeExample: `// Shift-Left CI/CD Pipeline Stages:
// Code Commit ---> [SAST Scan] ---> [SCA Dependency Check] ---> [Hermetic Build] ---> [SLSA Attestation] ---> Production Deploy`
  },
  {
    id: 19,
    question: "What is 'Security Culture & Behavioral Architecture' in modern enterprise defense?",
    shortAnswer: "Fostering an open, blameless organizational culture where security is celebrated, reporting mistakes is rewarded, and employees act as an active, vigilant human sensor network.",
    explanation: "Technology alone cannot stop cyber attacks if organizational culture is toxic or fearful. When employees feel supported and trained through continuous positive reinforcement, they report suspicious phishing emails in minutes, directly empowering the SOC to neutralize threats before lateral movement occurs.",
    hint: "Creating a positive, blameless culture where employees actively report threats without fear.",
    level: "Moderate",
    codeExample: `// Positive Reinforcement Culture Metric:
// Phish-Reporting Rate = (Simulated Phishing Emails Reported within 15 mins) / (Total Delivered)
// Target Goal: >85% employee reporting rate with zero punitive punishment for mistakes`
  },
  {
    id: 20,
    question: "How does the 'MITRE ATT&CK Matrix' serve as the universal taxonomy for enterprise threat modeling and SOC operations?",
    shortAnswer: "By cataloging real-world adversary Tactics, Techniques, and Common Knowledge (TTPs) across the entire cyber attack lifecycle, providing a standardized language for defense.",
    explanation: "Rather than discussing abstract threats, the MITRE ATT&CK matrix maps specific adversary behaviors (e.g. T1059.001 PowerShell, T1558.003 Kerberoasting). Defenders map their telemetry, detection rules, and security controls directly to ATT&CK techniques to identify and close defensive blind spots.",
    hint: "A standardized global knowledge base of real-world adversary tactics and techniques.",
    level: "Moderate",
    codeExample: `// MITRE ATT&CK TTP Mapping:
const attackTtpMapping = {
  initialAccess: "T1190 - Exploit Public-Facing Application (Equifax Struts)",
  execution: "T1059.001 - Command & Scripting Interpreter: PowerShell",
  persistence: "T1053.005 - Scheduled Task / Job",
  defenseEvasion: "T1070.001 - Indicator Removal: Clear Windows Event Logs",
  lateralMovement: "T1210 - Exploitation of Remote Services: SMBv1 EternalBlue"
};`
  },
  {
    id: 21,
    question: "What is 'Cloud Security Posture Management' (CSPM) and Cloud Workload Protection (CWPP)?",
    shortAnswer: "CSPM automatically audits cloud environments for misconfigurations and compliance violations; CWPP protects running containers, serverless functions, and virtual machines in real time.",
    explanation: "In modern cloud platforms (AWS/Azure/GCP), accidental misconfigurations (e.g. public S3 buckets, open security groups) cause catastrophic breaches. CSPM continuously checks configurations against CIS benchmarks, while CWPP monitors container runtime processes for anomalous behavior.",
    hint: "CSPM catches cloud misconfigurations; CWPP protects running workloads and containers in real time.",
    level: "Moderate",
    codeExample: `// CSPM Automated Compliance Rule:
/*
Rule: NO_PUBLIC_S3_BUCKETS
Condition: S3.BucketPolicy.Principal == "*"
Action: REMEDIATE_AUTOMATICALLY (Enable AWS S3 Block Public Access & Alert SOC)
*/`
  },
  {
    id: 22,
    question: "What is 'Zero Trust Device Attestation' using Hardware Trusted Platform Modules (TPM 2.0)?",
    shortAnswer: "Using a tamper-proof hardware cryptographic chip embedded on the motherboard to verify the cryptographic integrity of the boot sequence, operating system, and client certificates.",
    explanation: "Software-only checks can be subverted by kernel-level rootkits. TPM 2.0 measures the bootloader, kernel, and system drivers (Measured Boot). During authentication, the client device presents a hardware-attested cryptographic quote; if the OS or firmware has been tampered with, access is mathematically denied.",
    hint: "Using a tamper-proof TPM 2.0 hardware chip to verify the cryptographic integrity of the OS and boot state.",
    level: "Expert",
    codeExample: `// TPM 2.0 Measured Boot Attestation:
const tpmAttestation = {
  pcrBank: "SHA-256 Measured Boot Hash Bank",
  firmwareIntegrity: "VERIFIED_AUTHENTIC",
  secureBootState: "ENABLED (UEFI Level)",
  verdict: "DEVICE_HEALTHY_AND_COMPLIANT → Proceed to Conditional Access Evaluation"
};`
  },
  {
    id: 23,
    question: "What is 'Supply-chain Levels for Software Artifacts' (SLSA) Level 4 Build Security?",
    shortAnswer: "Hermetic, isolated, two-party reviewed, ephemeral builds with verifiable cryptographic provenance that independently guarantees source code was compiled without binary tampering.",
    explanation: "Born out of the SolarWinds compromise, SLSA Level 4 represents the highest standard of build security. No human can alter the build environment; all dependencies are cryptographically pinned; and independent build pipelines generate bit-for-bit reproducible hashes.",
    hint: "The highest standard of build security ensuring hermetic, two-party reviewed, tamper-proof builds.",
    level: "Expert",
    codeExample: `// SLSA Level 4 Provenance Guarantee:
// Git Commit (GPG Signed by 2 Reviewers) ---> Ephemeral Air-Gapped Container Runner ---> Reproducible Binary + in-toto Attestation`
  },
  {
    id: 24,
    question: "What is 'Egress Data Loss Prevention' (DLP) with TLS Interception and Deep Packet Inspection?",
    shortAnswer: "Decrypting and inspecting outbound enterprise web and cloud traffic to block unauthorized exfiltration of sensitive PII, intellectual property, and database backups.",
    explanation: "Adversaries exfiltrate stolen data over HTTPS (Equifax, Sony, Colonial). Enterprise DLP appliances intercept outbound TLS connections using corporate CA certificates, inspect payload bodies for credit cards, PAN cards, or confidential markers, and terminate connections attempting unapproved uploads.",
    hint: "Decrypting outbound TLS traffic to inspect and block exfiltration of sensitive corporate data.",
    level: "Moderate",
    codeExample: `// DLP Inspection Rule:
/*
Filter: Outbound HTTPS Payloads
Pattern: Match regex for Indian PAN Card ([A-Z]{5}[0-9]{4}[A-Z]{1}) OR Credit Cards
Threshold: >5 records in single session
Action: DROP_CONNECTION & RAISE_EXFILTRATION_ALARM
*/`
  },
  {
    id: 25,
    question: "What is 'Cyber Insurance Underwriting Warranty Compliance' and why does it drive corporate security investments?",
    shortAnswer: "Insurance policies legally require verified implementation of specific controls (universal MFA, immutable backups, 24/7 EDR) as mandatory warranties for claim payouts.",
    explanation: "If an enterprise suffers a ₹50 Crore ransomware loss and files an insurance claim, underwriters deploy forensic auditors. If the investigation discovers that an orphaned VPN portal lacked MFA (as in Colonial Pipeline), the insurer denies the claim due to warranty breach, forcing executives to enforce rigorous security standards.",
    hint: "Mandatory technical controls required by insurers to guarantee policy payouts after breaches.",
    level: "Moderate",
    codeExample: `// Cyber Insurance Warranty Audit Checklist:
const insuranceWarrantyAudit = [
  "100% MFA deployment across all remote access and cloud administration portals",
  "Immutable, air-gapped backups tested via bare-metal restoration within 90 days",
  "Centralized Endpoint Detection and Response (EDR) deployed on >=98% of all endpoints",
  "Annual independent third-party network penetration test and architecture audit"
];`
  },
  {
    id: 26,
    question: "What is 'Single Packet Authorization' (SPA) and how does it render critical enterprise gateways invisible on the public Internet?",
    shortAnswer: "Keeping all firewall ports completely closed (stealth) until a single, cryptographically encrypted packet is received that dynamically opens a port for that authenticated IP address.",
    explanation: "Traditional VPN gateways expose open ports (Port 443, 500) that can be discovered by Shodan and attacked with zero-days. Under SPA (e.g. fwknop), the gateway drops all incoming packets. Only when a legitimate client sends a cryptographically signed HMAC authorization packet does the firewall open a temporary pinhole.",
    hint: "Keeping all firewall ports closed until a cryptographically signed authorization packet arrives.",
    level: "Expert",
    codeExample: `// SPA Authorization Flow (fwknop):
// Client IP (115.187.x.x) ---> Sends encrypted SPA packet to UDP Port 62201
// Server Firewall verifies HMAC-SHA256 signature ---> Opens TCP Port 443 ONLY for 115.187.x.x for 30 seconds`
  },
  {
    id: 27,
    question: "What is 'Continuous Risk Assessment' vs 'Point-in-Time Compliance Audits'?",
    shortAnswer: "Continuous risk assessment monitors security telemetry, assets, and vulnerabilities 24/7, whereas point-in-time compliance only checks boxes once a year.",
    explanation: "A company can pass an annual ISO 27001 audit on Monday and be breached on Tuesday because a developer exposed an unpatched server on Wednesday. Modern defense mandates continuous assessment through automated ASM, BAS simulations, and real-time posture checking.",
    hint: "24/7 continuous monitoring of security telemetry versus once-a-year compliance checklists.",
    level: "Moderate",
    codeExample: `// Continuous vs Point-in-Time Comparison:
const auditComparison = {
  pointInTimeCompliance: "Annual 3-day checklist audit → Passes audit but remains vulnerable to new zero-days 364 days a year",
  continuousValidation: "24/7 automated telemetry monitoring, real-time vulnerability scoring, and continuous BAS attack simulation"
};`
  },
  {
    id: 28,
    question: "What is 'Air-Gapped Decoupling for Industrial Continuity' and how does it prevent IT ransomware from halting physical factories?",
    shortAnswer: "Engineering industrial SCADA processes with autonomous local memory buffers, analog safety interlocks, and independent power generators to operate for weeks without corporate IT.",
    explanation: "As learned from Colonial Pipeline and the Ukraine power grid, industrial infrastructure must never have a single point of failure in corporate IT. Flow computers, substation breakers, and manufacturing lines must run in autonomous 'Islanding Mode', ensuring vital physical services continue uninterrupted during enterprise IT outages.",
    hint: "Engineering industrial SCADA systems to operate autonomously for weeks without corporate IT.",
    level: "Moderate",
    codeExample: `// Autonomous Industrial Islanding Specification:
const industrialIslandingSpec = {
  localTelemetryBuffering: "30-day encrypted flash storage on all RTUs and flow computers",
  safetyInterlocks: "Hardwired analog pneumatic / mechanical pressure release valves",
  operationalIndependence: "Physical plant operates at 100% capacity with corporate IT completely severed"
};`
  },
  {
    id: 29,
    question: "How does the Indian Data Protection Board penalize repeat offenders and organizations demonstrating systemic neglect under DPDP 2023?",
    shortAnswer: "By issuing maximum statutory financial penalties (up to ₹250 Crores per violation), revoking operating licenses, and mandating binding independent compliance monitors.",
    explanation: "The Data Protection Board of India evaluates the gravity, duration, and systemic negligence of a breach. Organizations in Kolkata, Barrackpore, and across India that fail to implement foundational safeguards (MFA, encryption, RBVM) after prior warnings face cumulative maximum penalties.",
    hint: "Maximum penalties up to ₹250 Crores per violation and independent regulatory monitoring.",
    level: "Moderate",
    codeExample: `// DPDP 2023 Aggravating Factors for Maximum Penalty:
const dpdpPenaltyAssessment = [
  "Duration and persistence of the security vulnerability",
  "Failure to act upon prior vulnerability notifications (e.g. CISA / CERT-In advisories)",
  "Lack of technical safeguards such as Multi-Factor Authentication and Encryption",
  "Failure to notify the Board and affected consumers in a timely manner"
];`
  },
  {
    id: 30,
    question: "What is the ultimate manifesto and takeaway for computer science and cybersecurity scholars in Barrackpore, Kolkata, and nationwide?",
    shortAnswer: "Cyber security is an active, continuous discipline of engineering resilience: Automate Patching; Enforce Zero Trust; Micro-segment Workloads; Isolate Identity; and Preserve Autonomous Continuity.",
    explanation: "The grand synthesis of modern cyber warfare is simple: Invulnerability cannot be bought, but resilience can be engineered. By mastering risk-based patch management, eliminating implicit trust, segmenting networks, protecting cloud identities with hardware tokens, and preparing for blameless recovery, modern defenders can protect critical infrastructure and secure the digital future of nations.",
    hint: "Automate hygiene, enforce Zero Trust, micro-segment networks, and engineer autonomous resilience.",
    level: "Moderate",
    codeExample: `// The Grand Cyber Defense Manifesto:
// 1. Automate Hygiene: 24-Hour KEV Patch SLAs & Continuous SBOM Visibility
// 2. Enforce Zero Trust: Universal FIDO2 Hardware MFA & Just-In-Time PAM
// 3. Contain Blast Radius: Granular Workload Micro-segmentation & Purdue IDMZs
// 4. Secure Identity: Protect Token-Signing Keys in FIPS 140-2 Level 3 HSMs
// 5. Guarantee Survivability: Immutable WORM Backups & Autonomous Physical Islanding`
  }
];

export default questions;
