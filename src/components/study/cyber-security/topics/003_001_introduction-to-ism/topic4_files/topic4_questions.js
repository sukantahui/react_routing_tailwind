const questions = [
  {
    question: "What is the primary role of the Chief Information Security Officer (CISO) in modern enterprise governance?",
    shortAnswer: "The CISO is the senior executive responsible for establishing enterprise-wide cybersecurity strategy, authoring security policies, managing cyber risks, enforcing regulatory compliance, and directing incident response operations.",
    explanation: "The CISO bridges technical cybersecurity with executive business leadership. The CISO defines organizational risk appetite with the Board, manages the cybersecurity budget, oversees the 24/7 Security Operations Center (SOC), leads the Incident Response Team during active breaches, ensures compliance with statutory mandates (e.g. Indian DPDP Act 2023, RBI directions), and translates complex technical threats into business risk metrics.",
    hint: "Think of the corporate commander responsible for defending all enterprise digital assets.",
    level: "basic",
    codeExample: `// Core Responsibilities of the CISO:
1. Executive Strategy: Align security programs with 3-year business growth
2. Policy Formulation: Author ISO/IEC 27001 policies & Statement of Applicability
3. Risk Management:   Maintain enterprise Risk Register & quantify ALE/ROSI
4. Regulatory Defense: Ensure DPDP Act Section 33 & CERT-In 6-hour compliance
5. Incident Command:   Direct executive response during critical ransomware attacks`
  },
  {
    question: "Why is having the CISO report directly to the Chief Information Officer (CIO) considered a dangerous governance conflict of interest?",
    shortAnswer: "The CIO is measured on IT speed, system uptime, and cost minimization; the CISO is measured on risk reduction, rigorous controls, and compliance; reporting to the CIO allows security controls to be bypassed in favor of deployment speed.",
    explanation: "A structural conflict of interest occurs when the CISO reports to the CIO. If a software release has security vulnerabilities, the CISO may want to delay the launch to patch flaws, while the CIO faces executive pressure to meet release deadlines and maximize uptime. Modern corporate governance frameworks (and the Reserve Bank of India) mandate that the CISO operate independently, reporting directly to the Chief Executive Officer (CEO), Chief Risk Officer (CRO), or the Board's Risk Committee.",
    hint: "Think of a safety inspector reporting to the factory production manager who wants to cut corners.",
    level: "moderate",
    codeExample: `// Conflict of Interest vs Independent Governance:
Broken Hierarchy:       [ CIO ] ➔ [ CISO ]  (CIO suppresses security warnings to meet IT deadlines!)
Independent Hierarchy:  [ CEO / Board Risk Committee ]
                             /                 \\
                     [ CIO (IT Speed) ]    [ CISO (Risk & Security) ]`
  },
  {
    question: "Under Section 10 of the Digital Personal Data Protection (DPDP) Act 2023, what is the role and legal mandate of the Data Protection Officer (DPO)?",
    shortAnswer: "A DPO must be appointed by every Significant Data Fiduciary, be based in India, report directly to the Board of Directors, and serve as the official point of contact for citizen grievances and the Data Protection Board of India.",
    explanation: "Section 10 of the DPDP Act 2023 establishes the statutory office of the Data Protection Officer (DPO). The DPO: 1. Must be an individual based in India; 2. Represents the Data Fiduciary under the Act; 3. Is accountable directly to the Board of Directors; 4. Oversees compliance with data privacy principles (Purpose Limitation, Data Minimization, Consent Governance); 5. Serves as the official liaison for the Data Protection Board and handles user data erasure/grievance requests.",
    hint: "Remember the legally mandated privacy officer required for Significant Data Fiduciaries in India.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Section 10 DPO Requirements:
Mandate:       Required for all "Significant Data Fiduciaries" (Banks, Health, FinTech)
Residency:     Must be physically resident in INDIA
Reporting:     Directly accountable to the Board of Directors
Functions:     Oversee Consent & Privacy Audits + Point of contact for Data Protection Board`
  },
  {
    question: "What is a RACI Matrix, and how does it prevent accountability gaps in enterprise Information Security Management?",
    shortAnswer: "A RACI Matrix defines roles for security workflows by categorizing stakeholders as: R - Responsible (does the work), A - Accountable (final decision maker/owner), C - Consulted (provides two-way input), I - Informed (receives one-way status updates).",
    explanation: "During critical security workflows (e.g. patching zero-days, investigating data leaks, notifying regulators), ambiguity causes disastrous delays. A RACI Matrix assigns exactly ONE Accountable person (the 'A') for every process to eliminate finger-pointing: 1. Responsible (R): The engineer or analyst executing the task; 2. Accountable (A): The executive who owns the ultimate outcome and has veto power; 3. Consulted (C): Subject matter experts providing input; 4. Informed (I): Stakeholders updated on progress.",
    hint: "Remember the 4 letters: Responsible, Accountable, Consulted, and Informed.",
    level: "moderate",
    codeExample: `// RACI Matrix Example for Ransomware Incident Response:
Workflow: Containment & CERT-In 6-Hour Escalation
- CISO:          ACCOUNTABLE (A) - Authorizes system isolation & signs CERT-In report
- SOC Analyst:   RESPONSIBLE (R) - Executes network disconnect & memory acquisition
- Legal Counsel: CONSULTED (C)   - Reviews regulatory breach disclosure language
- CEO & Board:   INFORMED (I)    - Receives executive status briefing every 2 hours`
  },
  {
    question: "What are the core tiers and operational roles within a modern 24/7 Security Operations Center (SOC)?",
    shortAnswer: "Tier 1: Triage Analysts (monitor SIEM alerts & filter false positives); Tier 2: Incident Handlers (deep-dive forensic investigation & containment); Tier 3: Threat Hunters & Malware Engineers (proactive hunting & reverse engineering); SOC Lead: Operational command and SLA management.",
    explanation: "A 24/7 SOC organizes defense in specialized operational tiers: 1. Tier 1 (Triage Analyst): Continuously reviews incoming alerts from SIEM/EDR, verifies alert validity, filters noise, and escalates true anomalies within 15 minutes; 2. Tier 2 (Incident Responder): Conducts endpoint forensics, network packet analysis, memory dumps, and coordinates immediate threat containment; 3. Tier 3 (Threat Hunter / Malware Analyst): Proactively searches for advanced persistent threats (APTs) lurking without alerts, reverse-engineers suspicious binaries, and authors custom Yara/Sigma detection rules.",
    hint: "Think of an emergency hospital: triage nurse (Tier 1), ER physician (Tier 2), and specialist surgeon (Tier 3).",
    level: "moderate",
    codeExample: `// 24/7 SOC Tiered Escalation Structure:
[ Tier 1 (Triage) ]       ➔ Analyzes SIEM alert → Filters false positive → Escalates in < 15 mins
        |
[ Tier 2 (Responder) ]    ➔ Performs memory dump & network isolation → Neutralizes active payload
        |
[ Tier 3 (Threat Hunter)] ➔ Reverse-engineers ransomware binary → Builds custom detection rules`
  },
  {
    question: "What are the distinct responsibilities of the Information Security Officer (ISO) versus the Security Architect?",
    shortAnswer: "The ISO focuses on operational policy enforcement, risk assessments, compliance audits, and security awareness; the Security Architect designs technical security blueprints, zero-trust network topology, cryptographic key hierarchies, and cloud infrastructure.",
    explanation: "1. Information Security Officer (ISO): A governance and operational role responsible for ensuring business units follow established policies, conducting departmental risk assessments, facilitating internal audits, and tracking remediation SLAs; 2. Security Architect: A deep technical design role responsible for architecting secure systems: designing Zero Trust network microsegmentation, designing HSM key management topologies, selecting encryption cipher suites (AES-256-GCM, RSA-4096), and establishing cloud IAM guardrails.",
    hint: "Contrast the building code compliance inspector (ISO) with the structural engineer designing the building (Architect).",
    level: "moderate",
    codeExample: `// ISO vs Security Architect:
Security Architect: "Designs a multi-region AWS transit gateway with mTLS and FIPS 140-3 HSM key storage."
Security Officer:   "Audits business unit access permissions and ensures developers complete annual DPDP training."`
  },
  {
    question: "Under the Reserve Bank of India (RBI) Cyber Security Framework, what specific governance requirements are mandated for the bank's CISO?",
    shortAnswer: "The CISO must be a dedicated, senior-level executive with no direct operational IT reporting line, reporting directly to the Executive Director or Board Risk Committee, and possessing mandatory cyber certifications.",
    explanation: "The RBI Cyber Security Framework for Banks strictly mandates that: 1. The CISO must be a dedicated full-time official (not combined with other IT or business roles); 2. The CISO must not report to the Chief Information Officer (CIO) or Chief Technology Officer (CTO); 3. The CISO must report directly to the Chief Risk Officer (CRO), Executive Director, or the Board's IT Sub-Committee / Risk Committee; 4. The CISO is responsible for 24/7 cyber defense, vendor risk, and mandatory RBI incident reporting.",
    hint: "Remember the stringent RBI guidelines ensuring full CISO independence in Indian banks.",
    level: "basic",
    codeExample: `// RBI CISO Governance Mandates:
1. Dedicated Full-Time Role (Zero dual-hatting with IT Operations)
2. Direct Reporting Line to Board Risk Committee / Executive Director
3. Mandatory Annual Presentation of Cyber Risk Posture directly to the Board of Directors
4. Authority to halt any banking service deployment that fails security criteria!`
  },
  {
    question: "What is the role of the 'Incident Response Commander' during an active enterprise ransomware attack?",
    shortAnswer: "The Incident Response Commander leads the crisis team, possesses singular authority to make critical operational decisions (e.g. disconnecting production networks), coordinates technical teams, and interfaces with legal, PR, and executive leadership.",
    explanation: "During a major breach, committees and consensus cause fatal delays. The Incident Response Commander (typically the CISO or a designated senior lead): 1. Declares official incident severity; 2. Holds singular authority to sever network connections, isolate core databases, or shut down servers; 3. Coordinates the technical triage team, forensic investigators, and system administrators; 4. Briefs executive leadership and legal counsel; 5. Ensures compliance with CERT-In 6-hour reporting mandates under IT Act Section 70B.",
    hint: "Think of the fire chief at a burning building who has complete command over the scene.",
    level: "moderate",
    codeExample: `// Incident Commander Authority during Breach:
Incident Trigger: Active LockBit ransomware propagating across payment subnet!
Commander Action: "Authorize immediate network isolation of Subnet 10.4.0.0/16 at core switch."
Legal Mandate:    "Direct Legal Counsel to submit incident report to CERT-In within 6 hours."`
  },
  {
    question: "Why are general enterprise employees referred to as the 'First Line of Human Defense', and what are their security responsibilities?",
    shortAnswer: "Employees operate the endpoints and handle daily emails where over 90% of cyber attacks begin (phishing/social engineering); their responsibilities include practicing strong cyber hygiene, reporting suspicious emails, and adhering to the Acceptable Use Policy.",
    explanation: "No technical firewall can stop a breach if an employee enters their corporate credentials on a spoofed login page or plugs an unverified USB drive into a workstation. Every employee is an active participant in enterprise defense: 1. Adhering to the Acceptable Use Policy (AUP); 2. Using Multi-Factor Authentication (MFA) responsibly; 3. Reporting suspicious phishing emails to the SOC immediately; 4. Safeguarding customer personal data in accordance with DPDP Act Section 8.",
    hint: "Think of every citizen locking their own front door to protect the neighborhood.",
    level: "basic",
    codeExample: `// End-User Security Responsibilities:
1. Cyber Hygiene:          Never share passwords; never click unverified email links
2. Phishing Reporting:     Click "Report Phishing" button in Outlook within 60 seconds
3. Acceptable Use:         Never copy customer databases to personal cloud drives or public AI
4. Physical Security:      Lock workstation screen whenever leaving desk (Win+L)`
  },
  {
    question: "What is the 'Three Lines of Defense' (3LoD) governance model, and how does it distribute security accountability across an enterprise?",
    shortAnswer: "1st Line: Operational business units and DevOps (owns and manages risk); 2nd Line: CISO, Risk & Compliance functions (sets policies and monitors controls); 3rd Line: Internal Audit (provides independent objective assurance to the Board).",
    explanation: "The 3LoD model establishes structural separation: 1. 1st Line (Risk Owners): Software engineers, database administrators, and business managers who build and run systems and directly execute controls; 2. 2nd Line (Risk Oversight): The CISO, security officers, and risk managers who formulate policies, maintain the Risk Register, and monitor SIEM telemetry; 3. 3rd Line (Independent Assurance): Internal Audit, reporting independently to the Board Audit Committee, reviewing both 1st and 2nd lines.",
    hint: "Think of the players executing the plays, the coaches designing the playbook, and the independent referee.",
    level: "expert",
    codeExample: `// The Three Lines of Defense (3LoD) in Action:
1st Line (DevOps / DBAs):    Patches Linux servers & implements AES-256 database encryption
2nd Line (CISO Office):       Performs weekly vulnerability scans & monitors 24/7 SOC alerts
3rd Line (Internal Audit):   Conducts independent audit of CISO & DevOps; reports findings to Board`
  },
  {
    question: "What legal personal liabilities can corporate Directors and Officers face in India for cybersecurity failures?",
    shortAnswer: "Under the DPDP Act 2023 Section 33, corporate entities face fines up to ₹250 Crores; under the IT Act 2000 Section 85, directors and officers who were negligent in preventing cyber offenses face direct personal prosecution and imprisonment.",
    explanation: "Section 85 of the Information Technology Act 2000 (Offenses by Companies) states that where a contravention has been committed by a company, every person who at the time the contravention was committed was in charge of, and was responsible to, the company for the conduct of business, shall be deemed guilty of the contravention and liable to be proceeded against and punished accordingly, unless they prove it took place without their knowledge or that they exercised all due diligence.",
    hint: "Remember the corporate negligence provisions under Indian cyber law holding directors accountable.",
    level: "expert",
    codeExample: `// IT Act Section 85 Director Liability:
Statutory Principle: Corporate Directors are personally liable for cyber offenses unless they prove:
1. The security breach took place without their knowledge, AND
2. They exercised all DUE DILIGENCE (e.g. established an ISO 27001 ISMS with an independent CISO!)`
  },
  {
    question: "How does the CISO effectively communicate cybersecurity metrics and risk to the Board of Directors?",
    shortAnswer: "By translating technical telemetry into business impact metrics: using financial loss expectancies (ALE/ROSI), Risk Appetite status, regulatory compliance (DPDP/CERT-In), and Balanced Scorecard quadrants rather than technical CVE lists.",
    explanation: "Boards of Directors do not understand firewall packet logs or buffer overflow exploits. Effective CISOs present executive dashboards focusing on 4 key areas: 1. Strategic Alignment: How security initiatives enable digital revenue products; 2. Risk Posture: Current Residual Risk compared against approved Risk Appetite limits; 3. Regulatory Status: DPDP compliance, zero statutory fines, and CERT-In 6-hour audit readiness; 4. Economic ROI: Return on Security Investment (ROSI) and insurance premium optimizations.",
    hint: "Translate technical firewall jargon into the language of revenue, risk, and corporate reputation.",
    level: "moderate",
    codeExample: `// Board-Level Cyber Risk Presentation Format:
Technical Jargon (Bad):    "We blocked 4.2 million SYN floods and patched 14 Apache CVEs."
Executive Briefing (Good): "Residual cyber risk is maintained at ₹3.2 Cr (within the ₹5 Cr Board Appetite);
                            Zero DPDP violations recorded; Security maturity unlocked ₹35 Cr in enterprise deals."`
  },
  {
    question: "Synthesizing Roles and Responsibilities: what is the master equation of enterprise cybersecurity accountability?",
    shortAnswer: "$$\\text{Organizational Resilience} = \\frac{\\text{Board Oversight} \\times \\text{CISO Independence} \\times \\text{RACI Clarity} \\times \\text{3LoD Balance}}{\\text{Accountability Gaps} + \\text{Unclear Ownership}}$$ with continuous audit verification.",
    explanation: "This master governance relationship proves that cybersecurity resilience is fundamentally a human and organizational achievement. Establishing an independent CISO office, appointing a dedicated Data Protection Officer under Section 10 of the DPDP Act 2023, defining unambiguous RACI matrices for every security workflow, and maintaining the Three Lines of Defense ensures total accountability and protects enterprise assets from compromise.",
    hint: "Conclude by reviewing how structural independence and RACI clarity eliminate accountability gaps.",
    level: "expert",
    codeExample: `// The Master Security Governance Formula:
Resilience = (Board_Oversight * CISO_Independence * RACI_Clarity * 3LoD_Rigour) / Ambiguity;
Outcome: Zero Governance Gaps, 100% Legal Compliance & Defensible Corporate Leadership!`
  }
];

export default questions;
