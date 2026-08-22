const questions = [
  {
    question: "What is the fundamental difference between a Threat and a Vulnerability under ISO/IEC 27005:2022?",
    shortAnswer: "A Threat is an external or internal danger (actor, entity, or event) capable of causing harm; a Vulnerability is an internal flaw, gap, or weakness in a system or control that can be exploited by the threat.",
    explanation: "Confusing threats with vulnerabilities is a common mistake in risk management: 1. Threat: Ransomware cybercrime syndicate (Threat Actor) or phishing email (Threat Vector); 2. Vulnerability: Missing software patch (CVE-2026-1234), default password on a router, or lack of employee awareness. A vulnerability without a threat is harmless, and a threat without a vulnerability cannot breach the system.",
    hint: "Threat is the storm outside; Vulnerability is the broken window.",
    level: "basic",
    codeExample: `// Threat vs Vulnerability Breakdown:
Vulnerability: CVE-2021-44228 (Log4j Remote Code Execution Flaw)
Threat Agent:  LockBit Ransomware Cybercriminal Syndicate
Threat Vector: Automated scanning and HTTP JNDI injection attack
Risk Event:    Ransomware detonation across 500 payment microservices`
  },
  {
    question: "How does the Common Vulnerability Scoring System (CVSS v3.1 / v4.0) calculate the Base Score and categorize severity?",
    shortAnswer: "CVSS calculates a score from 0.0 to 10.0 based on Exploitability metrics (Attack Vector, Complexity, Privileges Required, User Interaction) and Impact metrics (Confidentiality, Integrity, Availability); categorized as Critical (9.0–10.0), High (7.0–8.9), Medium (4.0–6.9), Low (0.1–3.9), None (0.0).",
    explanation: "CVSS provides a standardized global rating system: 1. Attack Vector (AV: Network = higher risk than Physical); 2. Attack Complexity (AC: Low = easily exploitable); 3. Privileges Required (PR: None = no credentials needed); 4. User Interaction (UI: None = zero-click exploit); 5. Impact (C/I/A: High impact on confidentiality/integrity/availability). A network-exploitable flaw requiring zero privileges and zero user interaction yields a CVSS 9.8+ Critical score.",
    hint: "Remember the 5 severity tiers: Critical (9.0-10.0), High (7.0-8.9), Medium (4.0-6.9), Low (0.1-3.9), None.",
    level: "basic",
    codeExample: `// CVSS v3.1 Vector String Example:
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
Base Score: 9.8 (CRITICAL)
Meaning:    Network exploitable, Low complexity, No privileges required, Zero user interaction, Complete CIA compromise!`
  },
  {
    question: "What is the difference between a Vulnerability Assessment (VA) and a Penetration Test (PT)?",
    shortAnswer: "A Vulnerability Assessment is an automated, broad scan identifying potential flaws without exploiting them; a Penetration Test is a goal-oriented, manual security exercise that actively exploits vulnerabilities to prove real-world compromise.",
    explanation: "Under ISO 27001 Control A.8.8: 1. Vulnerability Assessment (VA): Scans all 1,000 servers using tools like Nessus or Qualys to produce a broad list of unpatched CVEs; 2. Penetration Testing (PT): Ethical hackers use tools like Metasploit and manual scripting to chain vulnerabilities, bypass firewalls, and extract proof-of-concept database dumps to evaluate real defense depth.",
    hint: "VA is taking an X-ray to find weaknesses; PT is attempting to physically break through the door.",
    level: "basic",
    codeExample: `// VA vs PT Comparison:
Vulnerability Assessment (VA) ➔ "Nessus found port 445 open with potential SMB vulnerability."
Penetration Testing (PT)      ➔ "Ethical hacker exploited port 445, obtained SYSTEM shell, and extracted test password hashes."`
  },
  {
    question: "What are the 4 primary types of Application Security Vulnerability Scanners (SAST, DAST, SCA, IAST)?",
    shortAnswer: "1. SAST (Static Analysis: Scans raw source code); 2. DAST (Dynamic Analysis: Tests running apps from outside); 3. SCA (Software Composition Analysis: Scans third-party open-source libraries); 4. IAST (Interactive Analysis: Monitors app execution from inside runtime).",
    explanation: "Modern DevSecOps pipelines combine multiple scanner types: 1. SAST (SonarQube): Detects SQL injection flaws in source code before compiling; 2. DAST (OWASP ZAP): Sends malicious payloads against live staging URLs; 3. SCA (Snyk): Detects vulnerable dependencies in `package.json` or `pom.xml`; 4. IAST (Contrast): Analyzes runtime memory behavior during integration tests.",
    hint: "SAST = Inside-Out (Code); DAST = Outside-In (Live App); SCA = Open-Source Dependencies.",
    level: "moderate",
    codeExample: `// DevSecOps Multi-Scanner Pipeline:
Stage 1: SAST (SonarQube)    ➔ Scans internal Python microservice code for hardcoded secrets
Stage 2: SCA (Snyk)          ➔ Checks npm/pip libraries against National Vulnerability Database (NVD)
Stage 3: DAST (OWASP ZAP)    ➔ Attacks live staging REST API endpoints with fuzzing payloads`
  },
  {
    question: "What is the MITRE ATT&CK Matrix, and how does it assist Threat Identification and Blue Team defense?",
    shortAnswer: "MITRE ATT&CK is a globally accessible knowledge base of adversary Tactics, Techniques, and Procedures (TTPs) based on real-world observations; it maps attacker behavior from Initial Access to Impact, guiding defensive telemetry and detection rules.",
    explanation: "Rather than looking only at indicators of compromise (IOCs like IP addresses that change instantly), ATT&CK classifies behavioral techniques: 1. Initial Access (T1566 Phishing); 2. Execution (T1059 Command-Line); 3. Lateral Movement (T1021 Remote Services); 4. Exfiltration (T1048 Exfiltration Over Web). Blue teams use it to test whether their SIEM/EDR detects specific attacker behaviors.",
    hint: "A standardized encyclopedia of every tactic and technique hackers use in real attacks.",
    level: "moderate",
    codeExample: `// MITRE ATT&CK Technique Mapping:
    Tactic:      Initial Access (TA0001)
    Technique:   Spearphishing Attachment (T1566.001)
    SOC Rule:    Flag any inbound email containing password-protected zip archives containing '.exe' or '.iso' files`
  },
  {
    question: "What standard enterprise Patching SLAs are enforced based on CVSS Severity scores?",
    shortAnswer: "Critical (CVSS 9.0–10.0): Patch within 24–48 Hours; High (CVSS 7.0–8.9): Patch within 7–14 Days; Medium (CVSS 4.0–6.9): Patch within 30–60 Days; Low (CVSS 0.1–3.9): Patch during routine maintenance (90 Days).",
    explanation: "Vulnerability management requires clear operational timelines under ISO 27001 Control A.8.8. For zero-day flaws with active exploitation in the wild (e.g. CVSS 9.8 Remote Code Execution), emergency change management procedures mandate deployment of patches or virtual WAF shielding within 48 hours to prevent automated mass-exploitation.",
    hint: "Critical flaws must be fixed within 48 hours; High within 14 days; Medium within 30 days.",
    level: "basic",
    codeExample: `// Enterprise Vulnerability Remediation SLA (STD-SEC-08):
Severity: CRITICAL (CVSS >= 9.0) ➔ Remediation SLA: < 48 Hours (Emergency Patch / WAF Virtual Patch)
Severity: HIGH     (CVSS >= 7.0) ➔ Remediation SLA: < 14 Calendar Days
Severity: MEDIUM   (CVSS >= 4.0) ➔ Remediation SLA: < 30 Calendar Days`
  },
  {
    question: "What is a 'Zero-Day Vulnerability', and what compensatory controls protect systems before a vendor patch is released?",
    shortAnswer: "A zero-day is a security vulnerability known to attackers or researchers for which no official vendor patch is yet available; protected via Web Application Firewall (WAF) virtual patching, network micro-segmentation, and endpoint behavioral EDR blocking.",
    explanation: "When a zero-day is disclosed, organizations cannot immediately install a software update. Compensatory controls mitigate the threat: 1. Virtual Patching: Configuring WAF regex rules to drop malicious exploit strings; 2. EDR Behavioral Blocking: Blocking spawned command shells from web server processes; 3. Network Isolation: Disconnecting vulnerable services from public internet ingress.",
    hint: "When no patch exists yet, use firewalls and behavioral detection to block the attack payload.",
    level: "moderate",
    codeExample: `// AWS WAF Virtual Patching for Zero-Day:
Rule: Block Zero-Day RCE Exploit
Pattern: Match regex ` + "`\\$\\{jndi:(ldap|rmi|dns)://.*\\}`" + ` in HTTP Headers and Request Body
Action:  BLOCK (Drop connection before it reaches unpatched backend server)`
  },
  {
    question: "How does the Indian CERT-In Directions 2022 govern Vulnerability and Zero-Day reporting under Section 70B of the IT Act?",
    shortAnswer: "Organizations, intermediaries, and security researchers must report newly discovered critical vulnerabilities and severe security incidents to CERT-In (incident@cert-in.org.in) within 6 hours of discovery.",
    explanation: "To safeguard national cyber infrastructure, CERT-In mandates rapid statutory disclosure. If an enterprise in West Bengal discovers a critical zero-day in widespread banking software or suffers an active intrusion exploiting a vulnerability, failing to report the incident within 6 hours constitutes a statutory violation punishable under Section 70B(7) with up to 1 year imprisonment.",
    hint: "Remember the 6-hour mandatory reporting window to CERT-In.",
    level: "basic",
    codeExample: `// CERT-In 6-Hour Reporting Trigger:
Incident: Active zero-day exploitation detected on core UPI banking switch in Kolkata
Action:   Dispatch formal incident report to ` + "`incident@cert-in.org.in`" + ` within 6 hours
Payload:  Incident synopsis, affected IP ranges, SHA-256 IOCs, and mitigation actions taken`
  },
  {
    question: "What is 'Threat Intelligence' (Cyber Threat Intelligence - CTI), and what are the 3 operational tiers (Strategic, Operational, Tactical)?",
    shortAnswer: "CTI is evidence-based knowledge about cyber threats; Strategic CTI informs executive board decisions (trends, financial risks); Operational CTI details adversary campaigns and TTPs; Tactical CTI provides machine-readable IOCs (IPs, hashes, domains) for automated firewall blocking.",
    explanation: "Threat intelligence operates at three distinct organizational levels: 1. Strategic: High-level reports for the Board of Directors detailing nation-state threat trends; 2. Operational: In-depth analysis of adversary infrastructure and MITRE TTPs for SOC threat hunters; 3. Tactical: Automated STIX/TAXII feeds pushing 50,000 malicious IP addresses directly into Palo Alto firewalls.",
    hint: "Strategic (Board), Operational (SOC Analysts), Tactical (Automated Firewall Feeds).",
    level: "moderate",
    codeExample: `// 3 Tiers of Threat Intelligence:
[ STRATEGIC ]  ➔ "Ransomware groups increasingly targeting Indian FinTechs under DPDP Act" (Board level)
[ OPERATIONAL ] ➔ "APT29 utilizing modified Cobalt Strike beacons via DNS tunneling" (SOC Analyst level)
[ TACTICAL ]   ➔ "Block malicious IP 198.51.100.42 and SHA256 e3b0c442..." (Firewall feed)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why does failing to patch known High/Critical CVEs trigger Section 33 penalties?",
    shortAnswer: "Because Section 8 mandates that Data Fiduciaries must implement reasonable technical safeguards; leaving known, publicly documented CVEs unpatched constitutes statutory negligence, exposing the firm to ₹250 Crore fines upon a breach.",
    explanation: "If a company suffers a massive leak of citizen personal data due to an unpatched vulnerability that was disclosed 6 months prior, the Data Protection Board of India (DPBI) will reject claims of a 'sophisticated attack'. Publicly available CVEs with released patches represent preventable negligence, triggering maximum statutory penalties under Section 33.",
    hint: "Failing to patch known vulnerabilities proves negligence under the DPDP Act.",
    level: "basic",
    codeExample: `// DPDP Statutory Negligence Investigation:
Breach Cause: Exfiltration of 500,000 records via CVE-2025-9999 (Patched 180 days ago by vendor)
Finding:      Corporate entity failed to maintain reasonable security safeguards under Section 8(5)
DPBI Penalty: ₹250,00,00,000 maximum statutory fine imposed under Section 33!`
  },
  {
    question: "What is 'Vulnerability Chaining', and why do low-severity vulnerabilities pose critical risks when combined?",
    shortAnswer: "Vulnerability chaining is the technique where an attacker combines multiple minor/medium flaws (e.g. Information Disclosure + CSRF + Local File Inclusion) into an unbroken exploit chain that achieves full Remote Code Execution (RCE).",
    explanation: "Individual CVEs rated as 'Medium' (CVSS 5.0) are often ignored by junior sysadmins. However, an adversary can chain: 1. Information Disclosure (discovers server path); 2. Insecure Direct Object Reference (downloads config file); 3. Insecure Deserialization (achieves SYSTEM root shell). Penetration testers evaluate vulnerability chains to reveal true cumulative risk.",
    hint: "Multiple small cracks can be combined by an attacker to break down the entire fortress door.",
    level: "expert",
    codeExample: `// Vulnerability Exploit Chain:
Step 1: Low Flaw (Information Leakage) ➔ Exposes internal API documentation
Step 2: Med Flaw (Broken Object Access)➔ Modifies user account ID in REST header
Step 3: High Flaw (Command Injection)  ➔ Spawns root shell on production server ➔ TOTAL TAKEOVER!`
  },
  {
    question: "Why must organizations establish a continuous 'Vulnerability Management Lifecycle' rather than relying on annual audits?",
    shortAnswer: "Over 25,000 new CVEs are published globally each year (approx. 70 per day); an annual scan leaves systems exposed to thousands of newly discovered zero-days and exploit scripts for up to 364 days.",
    explanation: "The threat landscape is constantly in motion. A server that was 100% secure yesterday can become critically vulnerable today when a new remote code execution flaw is disclosed. Control A.8.8 mandates continuous vulnerability management: automated weekly internal scans, real-time threat intelligence ingestion, and rapid SLA-driven patching.",
    hint: "70 new vulnerabilities appear every single day; yearly scanning leaves you blind for 364 days.",
    level: "basic",
    codeExample: `// Continuous Vulnerability Management Lifecycle:
Discovery      ➔ Daily automated AWS Inspector / Nessus vulnerability scanning
Prioritization ➔ CVSS score + Known Exploited Vulnerabilities (CISA KEV) filter
Remediation    ➔ Automated Ansible playbook patch deployment (< 48h for Critical)
Verification   ➔ Automated re-scan confirming CVE closure`
  },
  {
    question: "Synthesizing Threat Identification and Vulnerability Assessment: what is the master equation of Threat-Vulnerability Neutralization?",
    shortAnswer: "$$\\text{Exploitation Immunity} = \\frac{\\text{CTI Threat Visibility} \\times \\text{Automated Scanning Frequency} \\times \\text{Patch Velocity (SLA)}}{\\text{Unpatched High/Critical CVEs} + \\text{Zero-Day Exposure Window}}$$ with continuous ISO 27001 Control A.8.8 verification.",
    explanation: "This master governance relationship proves that vulnerability resilience is optimized when real-time threat intelligence, continuous automated multi-layer scanning (SAST/DAST/SCA), and rapid patch SLAs drive unpatched CVEs to zero. This neutralizes attacker vectors and guarantees unshakeable statutory safe harbor under global and Indian cyber regulations.",
    hint: "Conclude by reviewing how threat visibility, scanning speed, and patch SLAs eliminate vulnerability windows.",
    level: "expert",
    codeExample: `// Master Equation of Threat-Vulnerability Defense:
Immunity = (CTI_Visibility * Scan_Frequency * Patch_Velocity) / (Unpatched_Critical_CVEs + ZeroDay_Window);
Outcome: 100% Vulnerability Defense, Zero Exploit Chains & Total Regulatory Safe Harbor!`
  }
];

export default questions;
