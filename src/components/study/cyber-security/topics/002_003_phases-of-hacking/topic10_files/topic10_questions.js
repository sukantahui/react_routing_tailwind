const questions = [
  {
    question: "What is the foundational architectural difference between the 'Lockheed Martin Cyber Kill Chain' and the 'MITRE ATT&CK Framework'?",
    shortAnswer: "The Cyber Kill Chain is a linear, sequential 7-phase waterfall model focused on perimeter disruption; MITRE ATT&CK is a non-linear, granular matrix of 14 tactics and hundreds of techniques focused on post-compromise adversary behavior.",
    explanation: "Lockheed Martin developed the Cyber Kill Chain as a military-derived 7-stage sequential model (Recon -> Weaponization -> Delivery -> Exploitation -> Installation -> C2 -> Actions on Objectives) where breaking any single link stops the attack. MITRE ATT&CK is a comprehensive, non-linear knowledge base of tactics (goals), techniques (actions), and procedures (tools) that models realistic adversary behavior where attackers jump dynamically between phases.",
    hint: "Think about a strict single-track railway line (Kill Chain) versus an expansive subway network map with hundreds of interconnected stations (MITRE ATT&CK).",
    level: "basic",
    codeExample: `// Model Comparison:
Kill Chain: Recon -> Weaponize -> Deliver -> Exploit -> Install -> C2 -> Objectives (Linear Waterfall)
MITRE ATT&CK: 14 Tactics | 196+ Techniques | 411+ Sub-techniques (Non-linear Matrix)`
  },
  {
    question: "What are the seven sequential stages of the Lockheed Martin Cyber Kill Chain in exact chronological order?",
    shortAnswer: "1. Reconnaissance, 2. Weaponization, 3. Delivery, 4. Exploitation, 5. Installation, 6. Command and Control (C2), 7. Actions on Objectives.",
    explanation: "The Cyber Kill Chain defines the adversary journey: 1. Reconnaissance: Researching targets; 2. Weaponization: Coupling exploit with backdoor payload into a deliverable package; 3. Delivery: Transmitting weaponized payload (phishing email, USB); 4. Exploitation: Triggering the vulnerability; 5. Installation: Installing backdoor/persistence on victim; 6. Command & Control: Establishing two-way remote communication; 7. Actions on Objectives: Achieving final goals (data theft, ransomware, destruction).",
    hint: "Recall the mnemonic: Recon, Weaponize, Deliver, Exploit, Install, Command, Objectives.",
    level: "basic",
    codeExample: `// 7-Stage Cyber Kill Chain Lifecycle:
[ Recon ] ──> [ Weaponize ] ──> [ Deliver ] ──> [ Exploit ] ──> [ Install ] ──> [ C2 ] ──> [ Actions on Objectives ]`
  },
  {
    question: "What does the concept of 'Breaking the Kill Chain' mean in defensive cybersecurity operations?",
    shortAnswer: "Stopping an adversary at any single phase of the 7-stage sequential chain completely thwarts the entire cyber attack from succeeding.",
    explanation: "Because the Cyber Kill Chain is an interdependent sequential chain, an adversary cannot progress to Stage 7 (Actions on Objectives) without successfully completing Stages 1 through 6. If email security blocks the delivery (Stage 3), or if host memory protections block the exploit (Stage 4), the entire attack collapses. Defenders prioritize early-stage detection to break the chain at minimal cost.",
    hint: "Think of a chain: removing one single link separates the anchor from the ship.",
    level: "basic",
    codeExample: `// Breaking the Kill Chain:
Recon (Passed) -> Weaponize (Passed) -> Delivery ──[ BLOCKED BY EMAIL FILTER! ]──X Exploitation Never Happens!`
  },
  {
    question: "In the MITRE ATT&CK Framework, what is the clear distinction between 'Tactics', 'Techniques', and 'Procedures' (TTPs)?",
    shortAnswer: "Tactics represent the adversary's tactical goal (the 'WHY'); Techniques represent the specific mechanism to achieve that goal (the 'HOW'); Procedures represent the exact software tool or script implementation used.",
    explanation: "MITRE ATT&CK structures adversary behavior hierarchically: 1. Tactic (The Goal / WHY): e.g., 'Credential Access' (TA0006); 2. Technique / Sub-technique (The Mechanism / HOW): e.g., 'OS Credential Dumping: LSASS Memory' (T1003.001); 3. Procedure (The Implementation): e.g., Lazarus Group executing `procdump.exe -ma lsass.exe lsass.dmp` during an intrusion.",
    hint: "Remember: Tactics = Why / Goal, Techniques = How / Action, Procedures = Implementation / Tool.",
    level: "moderate",
    codeExample: `// TTP Hierarchy Example:
Tactic:    TA0006 (Credential Access - The "Why")
Technique: T1003.001 (OS Credential Dumping: LSASS Memory - The "How")
Procedure: LSASS Memory Dump command executed by APT29 (The Exact Implementation)`
  },
  {
    question: "How many Enterprise Tactics currently comprise the MITRE ATT&CK Enterprise Matrix, and what are the initial and final tactics?",
    shortAnswer: "14 Enterprise Tactics; beginning with 'Reconnaissance' (TA0043) / 'Resource Development' (TA0042) / 'Initial Access' (TA0001) and ending with 'Impact' (TA0040).",
    explanation: "The 14 MITRE ATT&CK Enterprise Tactics cover the full spectrum of modern intrusions: 1. Reconnaissance, 2. Resource Development, 3. Initial Access, 4. Execution, 5. Persistence, 6. Privilege Escalation, 7. Defense Evasion, 8. Credential Access, 9. Discovery, 10. Lateral Movement, 11. Collection, 12. Command and Control, 13. Exfiltration, 14. Impact.",
    hint: "Remember that MITRE ATT&CK expands traditional models into 14 distinct operational categories.",
    level: "moderate",
    codeExample: `// MITRE ATT&CK 14 Tactics Overview:
[Recon] -> [Resource Dev] -> [Initial Access] -> [Execution] -> [Persistence] -> [PrivEsc] ->
[Defense Evasion] -> [Cred Access] -> [Discovery] -> [Lateral Movement] -> [Collection] -> [C2] -> [Exfiltration] -> [Impact]`
  },
  {
    question: "What is 'MITRE ATT&CK for ICS' (Industrial Control Systems), and how does it address operational technology (OT / SCADA) threat modeling?",
    shortAnswer: "A specialized ATT&CK matrix tailored to Industrial Control Systems (SCADA, PLCs, RTUs), focusing on physical process disruption, safety system manipulation, and fieldbus protocol attacks.",
    explanation: "Traditional enterprise IT frameworks focus on data confidentiality and server OSs. MITRE ATT&CK for ICS models threats targeting critical infrastructure (power grids, water treatment, nuclear plants). It includes ICS-specific tactics like 'Impair Process Control' (T0828), 'Inhibit Response Function' (T0829), and techniques targeting Modbus/DNP3 protocol manipulation to trigger physical switchgear damage.",
    hint: "Think of an adversary framework designed specifically for power plants, factories, and physical machinery.",
    level: "expert",
    codeExample: `// MITRE ATT&CK for ICS Unique Tactics:
Tactic: Impair Process Control | Technique: T0836 (Modify Parameter / SCADA Setpoints)
Tactic: Inhibit Response Function | Technique: T0809 (Data Destruction in Safety PLC)`
  },
  {
    question: "What is the 'Diamond Model of Intrusion Analysis', and what are its four core vertices?",
    shortAnswer: "A threat modeling framework that analyzes cyber intrusions by establishing relationships across four core vertices: Adversary, Capability, Infrastructure, and Victim.",
    explanation: "Developed by Sergio Caltagirone et al., the Diamond Model visualizes every malicious event as a diamond: 1. Adversary: The threat actor behind the attack; 2. Capability: The exploit, malware, or weapon used; 3. Infrastructure: The C2 IP addresses, domains, and proxy networks utilized; 4. Victim: The target organization, assets, or persons impacted. Socio-political motivations and technology underpin the diamond.",
    hint: "Remember the four vertices of the diamond: Adversary, Capability, Infrastructure, and Victim.",
    level: "moderate",
    codeExample: `// The Diamond Model Structure:
           [ ADVERSARY ]
              /     \\
             /       \\
  [ CAPABILITY ]   [ INFRASTRUCTURE ]
             \\       /
              \\     /
            [ VICTIM ]`
  },
  {
    question: "What is 'Atomic Red Team' (by Red Canary), and how do security teams use it to test MITRE ATT&CK technique coverage?",
    shortAnswer: "An open-source library of simple, scripted, highly realistic test cases mapped directly to MITRE ATT&CK Technique IDs to validate SIEM, EDR, and SOC detection rules.",
    explanation: "Atomic Red Team provides small, modular, executable tests (called 'Atomics') mapped to specific ATT&CK techniques. To test if the SOC detects Technique T1003.001 (LSASS memory dumping), an engineer runs `Invoke-AtomicTest T1003.001`. The test executes a harmless LSASS memory read, allowing blue teams to confirm within seconds whether their EDR or SIEM triggered an alert.",
    hint: "Think of firing small, controlled test blanks to verify that your home security motion alarms work perfectly.",
    level: "basic",
    codeExample: `// Running Atomic Red Team Test for T1059.001 (PowerShell Execution):
Invoke-AtomicTest T1059.001 -TestNumbers 1
// Validates whether the SIEM triggers on obfuscated PowerShell execution!`
  },
  {
    question: "What is the 'MITRE ATT&CK Navigator', and how do Chief Information Security Officers (CISOs) use it for Threat Heatmapping and Gap Analysis?",
    shortAnswer: "A web-based interactive tool for visualizing ATT&CK matrices, allowing organizations to color-code technique coverage (Green = Protected, Yellow = Monitored, Red = Blind Spot) and map threat actor TTPs.",
    explanation: "ATT&CK Navigator provides an interactive spreadsheet-style grid of all tactics and techniques. Defenders use it to: 1. Gap Analysis: Highlight unmonitored techniques in RED to prioritize security engineering budget; 2. Threat Profiling: Overlay the known techniques of active threat actors (e.g. APT29 vs FIN7) to see if enterprise defenses cover their specific tradecraft; 3. Red Team Debriefs: Visualize penetration testing results.",
    hint: "Think of a color-coded enterprise heat map showing exactly which security cameras are working and where the dark blind spots are.",
    level: "moderate",
    codeExample: `// MITRE ATT&CK Navigator Heatmap Layer (JSON):
"techniques": [
  {"techniqueID": "T1003.001", "score": 100, "color": "#00ff00", "comment": "EDR Blocks LSASS Access"},
  {"techniqueID": "T1546.003", "score": 0,   "color": "#ff0000", "comment": "WMI Subscription Blind Spot!"}
]`
  },
  {
    question: "How does the 'Pyramid of Pain' (by David Bianco) illustrate the difficulty adversaries face when defenders detect different indicators of compromise?",
    shortAnswer: "It categorizes IOCs by the pain inflicted on attackers when blocked: Hash Values (Trivial) -> IP Addresses (Easy) -> Domain Names (Simple) -> Network/Host Artifacts (Annoying) -> Tools (Challenging) -> TTPs (Tough!).",
    explanation: "Changing a file hash takes an attacker 1 second (modifying 1 byte). Changing an IP or domain takes minutes. However, detecting and blocking an adversary's TTPs (Tactics, Techniques, and Procedures—the top of the pyramid) forces the adversary to completely reinvent their tradecraft, training, and operational methodology, inflicting maximum pain and cost on the threat actor.",
    hint: "Remember the Pyramid of Pain: Hashes at the bottom (trivial to change), TTPs at the peak (inflicts maximum pain on the attacker).",
    level: "moderate",
    codeExample: `// The Pyramid of Pain (David Bianco):
           /\\
          /  \\     TTPs (Tactics, Techniques, Procedures) -> TOUGH! (Apex)
         /    \\    Tools (Mimikatz, Cobalt Strike)         -> Challenging
        /      \\   Network/Host Artifacts (User-Agent)     -> Annoying
       /        \\  Domain Names (c2.net)                  -> Simple
      /          \\ IP Addresses (203.0.113.10)             -> Easy
     /____________\\ Hash Values (SHA-256)                 -> Trivial (Base)`
  },
  {
    question: "Why is the Cyber Kill Chain considered insufficient for modern cloud, API, and insider threat modeling compared to MITRE ATT&CK?",
    shortAnswer: "The Kill Chain assumes a rigid perimeter and external malware delivery; it fails to model attacks that start inside the cloud via stolen API tokens, insider threats, or non-malware credential abuse.",
    explanation: "The Kill Chain's early stages (Weaponization, Delivery, Installation) presume an external adversary emailing an `.exe` file. In modern cloud environments (AWS, Azure) and SaaS applications, attacks often begin with a stolen API token, compromised OAuth consent, or legitimate PowerShell commands without any binary delivery or installation. MITRE ATT&CK models these modern identity and cloud tactics directly.",
    hint: "Think about why a wall-and-moat perimeter model fails when the employee already has a legitimate cloud login key.",
    level: "expert",
    codeExample: `// Modern Cloud Intrusion bypassing traditional Kill Chain:
Stolen Cloud API Key -> Directly calls 'Initial Access' + 'Collection' + 'Exfiltration' (Zero Weaponization or Installation needed!)`
  },
  {
    question: "What is 'Sigma' (Generic Signature Format), and how does it map SIEM detection rules directly to MITRE ATT&CK technique IDs?",
    shortAnswer: "An open, vendor-neutral YAML rule format for describing log events that can be automatically compiled into Splunk, Elastic, QRadar, or Sentinel query languages, tagged with MITRE ATT&CK IDs.",
    explanation: "Sigma allows detection engineers to write a detection rule once in YAML. A Sigma rule specifies the log source (e.g. Windows Process Creation) and detection conditions (e.g. `CommandLine contains 'lsass_dump'`), and tags it with `tags: attack.credential_access, attack.t1003.001`. Using `sigmac`, the rule converts into Splunk SPL, Elastic KQL, or Microsoft KQL with zero manual rewriting.",
    hint: "Think of an international translator that takes one universal security rule and translates it into all SIEM languages automatically.",
    level: "basic",
    codeExample: `// Sigma Detection Rule for T1003.001 (YAML):
title: LSASS Memory Dump via Procdump
status: production
tags:
    - attack.credential_access
    - attack.t1003.001
logsource:
    category: process_creation
    product: windows
detection:
    selection:
        Image|endswith: '\\procdump.exe'
        CommandLine|contains: 'lsass'
    condition: selection`
  },
  {
    question: "Under the Indian National Cyber Security Framework, how does NCIIPC utilize MITRE ATT&CK for Critical Information Infrastructure (CII) protection?",
    shortAnswer: "NCIIPC maps sector-specific Threat Intelligence Advisories to MITRE ATT&CK Technique IDs, allowing power, banking, and telecom operators to test specific defensive controls against active APTs.",
    explanation: "The National Critical Information Infrastructure Protection Centre (NCIIPC) under NTRO issues technical advisories to designated Critical Information Infrastructure (CII) entities across India. By tagging threat alerts with MITRE ATT&CK technique IDs (e.g. T1059 for PowerShell, T0836 for SCADA parameter modification), security leads in Indian banks and power grids can immediately cross-reference their EDR and firewall policies against the specific technique.",
    hint: "Remember how India's national infrastructure protection agency NCIIPC standardizes threat intelligence using ATT&CK IDs.",
    level: "moderate",
    codeExample: `// NCIIPC Threat Intelligence Advisory Mapping:
Advisory: NCIIPC-ADV-2026-08 | Target: Indian Banking & Financial Services
Threat Actor: Lazarus Group / APT38
Mapped MITRE ATT&CK: T1566 (Phishing) -> T1059.001 (PowerShell) -> T1003.001 (LSASS) -> T1048 (Exfiltration)`
  },
  {
    question: "What is 'Threat Hunting', and how does a hypothesis-driven threat hunt utilize the MITRE ATT&CK Matrix?",
    shortAnswer: "Proactively searching through network and endpoint telemetry for advanced threat actors who have evaded automated alarms, using a specific ATT&CK technique as the hunting hypothesis.",
    explanation: "Automated SIEM alerts only fire on known signatures. Threat hunters assume adversaries are already inside the network. A hunter forms a hypothesis based on MITRE ATT&CK: 'Adversaries may be using WMI Event Subscriptions (T1546.003) for persistence.' The hunter queries the telemetry data across all 5,000 corporate endpoints for WMI consumer bindings, uncovering stealthy implants that bypassed basic antivirus.",
    hint: "Think of a detective actively searching dark corners with a flashlight based on a theory, rather than waiting for the fire alarm to ring.",
    level: "moderate",
    codeExample: `// Hypothesis-Driven Threat Hunt Workflow:
1. Hypothesis: "Attackers are using Scheduled Tasks (T1053.005) running PowerShell scripts from C:\\Users\\Public"
2. Query SIEM: EventCode=1 AND ParentImage="schtasks.exe" AND CommandLine="*powershell*C:\\Users\\Public*"
3. Analyze Anomaly -> Identify and eradicate stealthy persistence!`
  },
  {
    question: "What is the 'MITRE D3FEND' Matrix, and how does it provide the defensive counterpart to the offensive MITRE ATT&CK Matrix?",
    shortAnswer: "A complementary knowledge graph of defensive cybersecurity techniques (Model, Harden, Detect, Isolate, Deceive) mapped directly to ATT&CK offensive techniques to guide remediation engineering.",
    explanation: "While MITRE ATT&CK catalogs offensive adversary techniques, MITRE D3FEND catalogs defensive cybersecurity countermeasures. D3FEND maps each offensive technique to its precise defensive architectural solution (e.g. ATT&CK T1003.001 LSASS dumping maps to D3FEND 'Credential Access Protection' and 'Process Memory Access Restriction' such as Windows Credential Guard).",
    hint: "Think of MITRE ATT&CK as the encyclopedia of viruses, and MITRE D3FEND as the encyclopedia of vaccines and cures.",
    level: "expert",
    codeExample: `// ATT&CK vs D3FEND Relationship:
ATT&CK Offensive Technique: T1003.001 (LSASS Memory Dump)
└── Mapped D3FEND Countermeasure: D3-PMAR (Process Memory Access Restriction / Credential Guard)`
  },
  {
    question: "What is 'Adversary Emulation' (e.g. simulating APT29 or FIN7), and how do red teams use MITRE ATT&CK to run realistic threat simulations?",
    shortAnswer: "Executing the exact sequence of known TTPs, tools, and behaviors attributed to a specific real-world threat actor group to test an organization's defensive readiness against that specific adversary.",
    explanation: "Rather than conducting random penetration tests, an enterprise banks red team executes an Adversary Emulation Plan for APT29. The red team strictly restricts their toolset and techniques to those documented in MITRE ATT&CK for APT29 (e.g. using specific PowerShell payloads, scheduled task names, and C2 jitter intervals). This proves definitively whether the bank can withstand a targeted state-sponsored cyber offensive.",
    hint: "Think of an army unit dressing and fighting exactly like a specific adversary army to train defenders for realistic battle.",
    level: "moderate",
    codeExample: `// APT29 Adversary Emulation Plan (MITRE ATT&CK):
Phase 1: Spearphishing Link (T1566.002) delivering ISO file
Phase 2: Execution via Rundll32 (T1218.011)
Phase 3: Persistence via Scheduled Task (T1053.005)
Phase 4: C2 Communication over HTTPS with 30% Jitter (T1071.001)`
  },
  {
    question: "How does combining the Cyber Kill Chain and MITRE ATT&CK create a superior 'Defense-in-Depth' security operations strategy?",
    shortAnswer: "The Cyber Kill Chain provides high-level executive phase tracking and perimeter metrics, while MITRE ATT&CK provides the granular tactical telemetry needed by SOC analysts to detect and respond to specific adversary techniques.",
    explanation: "Modern SOCs use both frameworks collaboratively: Executives and CISOs use the Cyber Kill Chain to communicate attack progression and overall program resilience to board directors (e.g. 'We broke 98% of attacks at Stage 3 Delivery'). Meanwhile, SOC engineers, incident responders, and threat hunters use MITRE ATT&CK's granular matrix to write exact detection rules, configure EDR memory protections, and close technical blind spots.",
    hint: "Think of using a telescope to see the entire battlefield from above (Kill Chain) and a microscope to inspect the specific chemical weapons (MITRE ATT&CK).",
    level: "expert",
    codeExample: `// The Integrated Strategic Security Paradigm:
Boardroom / Executive Level: Cyber Kill Chain (High-Level Phase Metrics & ROI)
SOC / Threat Hunting Level:  MITRE ATT&CK Matrix (Granular TTP Telemetry & Sigma Rules)`
  },
  {
    question: "Under the Indian Information Technology Act 2000, how does forensic mapping to MITRE ATT&CK techniques assist law enforcement and CERT-In during criminal prosecution?",
    shortAnswer: "Provides standardized, objective technical proof of malicious intent, unauthorized access methods (Section 66), and tool deployment (Section 43) that satisfies judicial scrutiny in Indian courts.",
    explanation: "When state cyber crime police and CERT-In submit charge sheets under Section 66, 66C, and 70 of the IT Act 2000, mapping the seized evidence to internationally recognized MITRE ATT&CK Technique IDs (e.g. proving that the defendant deployed T1003.001 to steal credentials) establishes clear technical attribution, intent, and modus operandi that stands up to cross-examination under Section 65B of the Evidence Act.",
    hint: "Remember how standardizing forensic evidence with MITRE ATT&CK helps judges understand exactly how a cyber crime was committed.",
    level: "basic",
    codeExample: `// Indian Judicial Cyber Crime Prosecution Matrix:
Charge: Section 66 (Hacking) + Section 66C (Identity Theft)
Technical Evidence: Mapped to MITRE ATT&CK T1003 (Credential Theft) & T1021 (Lateral Movement)
Legal Certificate: Section 65B Indian Evidence Act Compliance -> Conviction Secured!`
  },
  {
    question: "What is 'Threat Intelligence Mapping', and how do SOCs use STIX/TAXII protocols to ingest MITRE ATT&CK threat feeds automatically?",
    shortAnswer: "Using standard STIX (Structured Threat Information Expression) data format and TAXII (Trusted Automated eXchange of Intelligence Information) transport to feed ATT&CK-mapped adversary IOCs into SIEMs in real time.",
    explanation: "STIX and TAXII are global standards for cyber threat intelligence. When CERT-In or an industry ISAC discovers a new threat campaign, they publish a STIX package containing the adversary's MITRE ATT&CK TTPs, C2 IPs, and file hashes. Enterprise SIEMs automatically ingest the feed over TAXII, instantly updating firewall blocklists and EDR behavioral rules across the enterprise without manual human intervention.",
    hint: "Think of an automatic global news wire that updates all security guards' facial recognition cameras within seconds.",
    level: "expert",
    codeExample: `// TAXII 2.1 Threat Feed Ingestion:
GET /taxii2/collections/certin-threat-intel/objects/
// Ingests STIX 2.1 JSON Objects mapped to MITRE ATT&CK TTPs into Splunk / Sentinel SIEM!`
  },
  {
    question: "Synthesizing the Cyber Kill Chain and MITRE ATT&CK Framework: what is the single most vital principle for 21st-century cyber defenders?",
    shortAnswer: "Assume breach; map your defensive telemetry, threat hunting, and validation tests continuously across the entire MITRE ATT&CK matrix to ensure no blind spots remain for adversaries to exploit.",
    explanation: "Perimeter walls will inevitably be breached. True enterprise resilience requires shifting from passive hope to active, measurable coverage. By validating every MITRE ATT&CK technique with Atomic Red Team tests, mapping detection rules with Sigma, deploying immutable logging, and understanding that breaking a single link in the kill chain saves the organization, cybersecurity teams transform from reactive firefighters into proactive digital guardians.",
    hint: "Conclude by recognizing how combining sequential kill chain breaking with granular MITRE ATT&CK matrix coverage creates an impenetrable defense-in-depth posture.",
    level: "expert",
    codeExample: `// The Modern Cyber Defense Equation:
(Kill_Chain_Perimeter_Breaker + MITRE_ATTACK_Granular_Coverage + Continuous_Atomic_Testing) = TOTAL_ENTERPRISE_RESILIENCE;`
  }
];

export default questions;
