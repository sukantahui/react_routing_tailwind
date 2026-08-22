const questions = [
  {
    question: "What are the 4 sequential phases of the Information Security Audit Lifecycle under ISO 19011?",
    shortAnswer: "1. Audit Planning & Preparation; 2. Fieldwork & Evidence Gathering; 3. Audit Reporting & Exit Conference; 4. Follow-up & Corrective Action Closure (CAPA).",
    explanation: "Under ISO 19011 (Guidelines for Auditing Management Systems), an audit follows a structured four-phase lifecycle: 1. Planning defines scope and checklists; 2. Fieldwork collects objective evidence via sampling and testing; 3. Reporting analyzes findings and convenes the Closing Meeting; 4. Follow-up validates that the auditee implemented verified corrective actions (CAPA).",
    hint: "1. Plan ➔ 2. Fieldwork ➔ 3. Report ➔ 4. Follow-up CAPA.",
    level: "basic",
    codeExample: `// 4-Phase ISO 19011 Audit Lifecycle:
Phase 1 (Planning):    Draft Audit Plan, Scope, and Checklists ➔ Opening Meeting
Phase 2 (Fieldwork):   Interviews, Config Sampling, and Log Inspections ➔ Working Papers
Phase 3 (Reporting):   Evaluate Findings vs Criteria ➔ Closing Meeting & Final Audit Report
Phase 4 (Follow-up):   Auditee Root Cause Analysis (RCA) ➔ CAPA Verification & Closure`
  },
  {
    question: "What occurs during the 'Opening Meeting' (Entry Conference) in Phase 1 of an IS audit?",
    shortAnswer: "The lead auditor meets with executive leadership and department heads to confirm the audit scope, introduce the audit team, review testing schedules, establish communication channels, and confirm logistics and confidentiality.",
    explanation: "The Opening Meeting establishes formal alignment between the audit team and auditees. It ensures management understands which systems will be sampled, confirms administrative access permissions for technical testing, guarantees non-disclosure confidentiality, and resolves scheduling conflicts before fieldwork begins.",
    hint: "The kickoff meeting setting ground rules, schedule, scope, and communication channels.",
    level: "basic",
    codeExample: `// Opening Meeting Agenda (Phase 1):
1. Introduction of Audit Team & Confirmation of Auditor Independence
2. Review of Audit Scope (500 Payment Microservices on AWS)
3. Agreement on Testing Timetable & Access to CloudWatch/SIEM Logs
4. Reaffirmation of Non-Disclosure Agreement (NDA) & Confidentiality`
  },
  {
    question: "What are the 4 primary techniques used by auditors during Phase 2 (Audit Fieldwork)?",
    shortAnswer: "1. Inquiry (Interviewing personnel); 2. Observation (Watching physical/operational processes); 3. Inspection (Examining policies, logs, configurations); 4. Re-performance (Executing tests independently).",
    explanation: "Auditors corroborate facts across four modalities: 1. Inquiry: Asking a DBA how database passwords are rotated; 2. Observation: Watching an employee enter a biometric server room; 3. Inspection: Examining AWS KMS key policies and CloudTrail JSON logs; 4. Re-performance: Attempting 6 failed logins to verify account lockout triggers.",
    hint: "Inquiry (Ask), Observation (Watch), Inspection (Examine), Re-performance (Test).",
    level: "basic",
    codeExample: `// Fieldwork Techniques in Action:
Inquiry:        "How do you offboard terminated employees?" (Interview)
Observation:    Watching physical mantrap entry at Kolkata Data Center (Watch)
Inspection:     Reading IAM JSON Policy ` + "`Role-DB-Admin`" + ` (Examine)
Re-performance: Entering 5 wrong passwords to test auto-lockout (Test)`
  },
  {
    question: "What is 'Evidence Triangulation', and why is it essential during audit fieldwork?",
    shortAnswer: "Corroborating an audit finding across at least two or three independent sources (e.g. an interview statement + a configuration file + a SIEM log) to ensure factual accuracy and eliminate single-source bias.",
    explanation: "An auditor should never issue a Major Non-Conformity based solely on an employee's verbal statement. If an engineer claims 'backups are tested weekly', the auditor triangulates this statement by inspecting the written backup policy (Source 1), querying the AWS S3 backup snapshot timestamps (Source 2), and reviewing the signed restoration drill log (Source 3).",
    hint: "Verifying a fact through multiple independent sources (Interview + Config + Log).",
    level: "moderate",
    codeExample: `// Evidence Triangulation Workflow:
Source 1 (Interview): Sysadmin states all production servers require MFA
Source 2 (Config):    SSH daemon config shows ` + "`PasswordAuthentication no`" + `
Source 3 (Log):       Okta Auth Log confirms YubiKey FIDO2 assertion for all sessions
Conclusion:           Finding verified with 100% TRIANGULATED EVIDENCE!`
  },
  {
    question: "What are the 5 mandatory components of a formal Non-Conformity Notice (NCN) in Phase 3 (Reporting)?",
    shortAnswer: "1. Audit Criteria (The standard/law violated); 2. Condition / Evidence (The factual defect observed); 3. Cause (The root operational failure); 4. Effect / Risk (The business/security impact); 5. Recommendation (Required corrective action).",
    explanation: "Under ISO 19011, an auditor must document findings using a structured 5-part formula: 1. Criteria: Control A.8.24; 2. Condition: S3 bucket unencrypted; 3. Cause: Terraform script lacked encryption parameter; 4. Effect: Threat of citizen PII leak and ₹250 Cr DPDP penalty; 5. Recommendation: Enable default AES-256 S3 KMS encryption.",
    hint: "Criteria, Condition, Cause, Effect, Recommendation (5-part finding schema).",
    level: "moderate",
    codeExample: `// Non-Conformity Notice Schema (NCN-2026-01):
Criteria:       ISO 27001 Control A.8.24 & DPDP Act Section 8(5)
Condition:      AWS S3 Bucket 'payshield-trans-db' lacks server-side encryption
Cause:          DevOps CI/CD pipeline bypassed Terraform security linters
Effect:         High risk of data exfiltration & ₹250 Crore statutory penalty
Recommendation: Deploy AWS KMS AES-256 encryption & integrate tfsec in CI/CD`
  },
  {
    question: "What is Root Cause Analysis (RCA), and what tools (e.g. 5 Whys, Fishbone) are used in Phase 4 (Follow-up)?",
    shortAnswer: "A structured problem-solving methodology to identify the underlying systemic defect that allowed a vulnerability to occur, rather than merely treating the surface symptom.",
    explanation: "If an auditor finds an unpatched server, simply patching that single server is a superficial fix (treating the symptom). An RCA asks: Why was it unpatched? (Ans: Scanner missed the subnet). Why did scanner miss it? (Ans: Inventory database was manual). Why manual? (Ans: AWS Auto-Discovery was disabled). The root cause is the lack of automated asset discovery.",
    hint: "Finding the deep reason WHY a bug happened using the '5 Whys' technique.",
    level: "basic",
    codeExample: `// 5 Whys Root Cause Analysis:
Finding: Unpatched Log4j library deployed to production
Why 1?   Developer imported vulnerable package.
Why 2?   CI/CD build pipeline did not block the build.
Why 3?   Snyk SCA scanner was disabled for that microservice repository.
Why 4?   No centralized policy enforced SCA across all GitHub repos.
ROOT CAUSE: Lack of mandatory centralized DevSecOps GitHub branch protection rules!`
  },
  {
    question: "What are the standard industry SLAs for closing Major Non-Conformities vs Minor Non-Conformities in Phase 4?",
    shortAnswer: "Major Non-Conformities: 30 Calendar Days (Emergency Root Cause & Technical Fix required); Minor Non-Conformities: 90 Calendar Days (Standard Remediation & Process Improvement).",
    explanation: "Because a Major NC represents a systemic breakdown of security or direct statutory violation, the auditee must submit an emergency Corrective Action Plan (CAPA) within 30 days. External registrars re-audit the specific control before granting ISO certification. Minor NCs allow a 90-day window to demonstrate corrected operational workflows.",
    hint: "Major NC = 30 Days (Emergency); Minor NC = 90 Days (Standard).",
    level: "basic",
    codeExample: `// CAPA Resolution SLAs:
[MAJOR NC SLA] ➔ 30 Calendar Days (Requires immediate interim patch + permanent RCA fix)
[MINOR NC SLA] ➔ 90 Calendar Days (Requires updated process documentation & verified training)`
  },
  {
    question: "What occurs during the 'Audit Closing Meeting' (Exit Conference), and what is the auditee's role?",
    shortAnswer: "The lead auditor presents all identified findings to executive management; the auditee reviews the findings for factual accuracy, signs the acknowledgement, and agrees on deadlines for CAPA submission.",
    explanation: "The Closing Meeting prevents misunderstandings. If an auditor claims 'no backups exist' because they checked the wrong AWS account, the auditee presents the correct production bucket during the meeting to resolve the factual dispute before the formal written audit report is published.",
    hint: "Auditor presents findings; auditee clarifies facts and agrees on fix deadlines.",
    level: "basic",
    codeExample: `// Closing Meeting Agreement:
Auditor:  "We have recorded 1 Major NC on S3 encryption and 2 Minor NCs on password rotation."
Auditee:  "We acknowledge the findings, accept the factual basis, and agree to submit our CAPA by 2026-09-23."`
  },
  {
    question: "Under the Indian DPDP Act 2023 Section 10, how does the 4-phase audit lifecycle apply to Significant Data Fiduciaries?",
    shortAnswer: "Significant Data Fiduciaries undergo annual 4-phase independent Data Audits: Phase 1 plans DPIA review; Phase 2 inspects consent ledgers and crypto-shredding; Phase 3 publishes reports to the Data Protection Board; Phase 4 verifies CAPA closure.",
    explanation: "Data Fiduciaries must maintain an active audit lifecycle for all personal citizen data processing: independent Data Auditors plan the scope under Section 10, sample biometric and health databases, issue findings regarding consent lapses under Section 6, and verify that the enterprise resolved all gaps within statutory deadlines.",
    hint: "DPDP Section 10 follows the exact 4-phase audit lifecycle to ensure personal data protection.",
    level: "moderate",
    codeExample: `// DPDP Statutory Audit Lifecycle:
Phase 1: Scope 80,000 Oncology Patient Biopsy Records & PACS Database
Phase 2: Extract AWS S3 Object Lock Crypto-Shredding logs & Patient Consent Ledgers
Phase 3: Formal Data Audit Report submitted to Board of Directors & DPBI
Phase 4: CISO verifies 100% remediation of any identified privacy non-conformities`
  },
  {
    question: "How does Reserve Bank of India (RBI) Cyber Security Guidelines mandate Board Review of Audit Phase 4 (Follow-up)?",
    shortAnswer: "RBI mandates that the final Audit Report and all Phase 4 Corrective Action Plan (CAPA) closure certificates must be presented directly to the Board Risk Management Committee (BRMC) on a quarterly basis until 100% closed.",
    explanation: "Under the RBI Cyber Security Framework for Banks, audit findings cannot be buried in IT departments. The CISO must maintain an open audit tracker presented to the BRMC: every open finding, its assigned owner, calendar SLA, and verified remediation evidence must be reviewed by board directors until formal closure.",
    hint: "Banks in India must present audit CAPA closure reports directly to the Board of Directors.",
    level: "moderate",
    codeExample: `// RBI BRMC Audit Tracking Agenda:
1. Review of 14 Findings from CERT-In Annual IS Audit
2. Verification of Phase 4 CAPA Closures (12 closed in < 30 days, 2 in progress)
3. Formal Board Resolution accepting residual risk posture on payment switch`
  },
  {
    question: "What is an 'Auditor Working Paper File', and why must it be archived securely under ISO 19011?",
    shortAnswer: "The comprehensive collection of all audit plans, checklists, interview transcripts, log extractions, and Non-Conformity Notices; archived securely for at least 3 to 7 years to substantiate findings during regulatory reviews or legal litigation.",
    explanation: "If an enterprise is later breached or sued in court, regulatory investigators (or CERT-In) will demand the historical audit working papers to determine whether the auditor exercised due professional care. Working papers serve as the legal proof that the audit was rigorous, systematic, and evidence-based.",
    hint: "The complete binder of evidence, notes, and checklists saved for legal defense.",
    level: "moderate",
    codeExample: `// Audit Working Paper Archive (WP-2026-CORE):
- WP-01: Signed Audit Plan & Opening Meeting Attendance Roster
- WP-02: 50 CloudWatch & CloudTrail JSON Log Extracts with SHA-256 Hashes
- WP-03: 15 Developer & DBA Interview Transcripts
- WP-04: Non-Conformity Notices (NCN-01 through NCN-03) with CAPA Sign-offs`
  },
  {
    question: "What happens if an organization fails to close a Major Non-Conformity within the 30-day Phase 4 SLA?",
    shortAnswer: "The certification registrar suspends or refuses to issue the ISO/IEC 27001 certificate; in regulatory audits (RBI / DPDP), statutory fines or regulatory operating license suspensions are initiated.",
    explanation: "A Major NC indicates that a critical security control is broken. If an enterprise fails to remediate the defect within 30 days and cannot demonstrate an effective compensatory control, the external registrar cannot legally certify the ISMS. The certificate is suspended, causing severe commercial and regulatory consequences.",
    hint: "Failure to fix a Major NC leads to suspended ISO certification or regulatory fines.",
    level: "basic",
    codeExample: `// Consequences of Expired Major NC SLA:
Day 0:   Major Non-Conformity issued on unencrypted customer database (30-Day SLA)
Day 31:  Auditee fails to deploy encryption or provide verified CAPA
Action:  BSI Registrar formally SUSPENDS ISO 27001 Certificate; RBI notified of compliance failure!`
  },
  {
    question: "Synthesizing the Security Audit Lifecycle: what is the master equation of Audit Governance Velocity?",
    shortAnswer: "$$\\text{Audit Governance Velocity} = \\frac{\\text{Fieldwork Triangulation Rigor} \\times \\text{CAPA 30-Day Closure Rate}}{\\text{Unresolved Major Non-Conformities} + \\text{Superficial RCA Fixes}} \\ge 1.0$$ with continuous ISO 19011 and Clause 9.2 validation.",
    explanation: "This master governance relationship proves that an Information Security Management System achieves maximum maturity when evidence is thoroughly triangulated during fieldwork, root causes are eliminated through robust RCA, and all corrective actions are verified and closed within strict 30/90-day SLAs. This guarantees continuous ISO 27001 certification and total statutory safe harbor.",
    hint: "Conclude by reviewing how evidence triangulation and rapid CAPA closure eliminate major non-conformities.",
    level: "expert",
    codeExample: `// Master Equation of Audit Lifecycle Execution:
Velocity = (Triangulated_Evidence_Rigor * CAPA_Closure_Rate) / (Open_Major_NCs + Superficial_Fixes);
Condition: Open_Major_NCs == 0 (100% Timely CAPA Resolution);
Outcome:   100% ISO 27001 Certificate Retention & Total Regulatory Safe Harbor!`
  }
];

export default questions;
