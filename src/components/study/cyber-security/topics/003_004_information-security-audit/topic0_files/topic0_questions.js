const questions = [
  {
    question: "What is an Information Security Audit, and how is it defined under ISO 19011 and ISO/IEC 27001:2022 Clause 9.2?",
    shortAnswer: "A systematic, independent, and documented process for obtaining objective audit evidence and evaluating it against defined audit criteria to determine the extent to which information security requirements are fulfilled.",
    explanation: "Under ISO 19011 (Guidelines for Auditing Management Systems) and ISO 27001 Clause 9.2, an audit is not an informal inspection or subjective opinion. It is an evidence-based formal evaluation where an independent auditor compares factual records (system logs, configurations, policies) against explicit criteria (ISO standards, laws, internal policies) to identify conformities and non-conformities.",
    hint: "Systematic, independent, and evidence-based comparison against defined criteria.",
    level: "basic",
    codeExample: `// The Fundamental Audit Equation (ISO 19011):
Audit Finding = Audit Evidence (Observed Fact) vs Audit Criteria (Standard/Law/Policy)
Outcome: Conformity | Minor Non-Conformity | Major Non-Conformity | Opportunity for Improvement (OFI)`
  },
  {
    question: "What are the 3 Core Elements of any Information Security Audit (Criteria, Evidence, Findings)?",
    shortAnswer: "1. Audit Criteria (The rules/standards being measured against); 2. Audit Evidence (Verifiable records, logs, configurations); 3. Audit Findings (Results of comparing evidence against criteria).",
    explanation: "Every audit revolves around these three pillars: 1. Criteria: 'All remote access must require MFA' (Policy STD-SEC-01); 2. Evidence: Syslog extraction proving 12 out of 100 administrators log in via single-factor passwords; 3. Finding: Major Non-Conformity against ISO 27001 Control A.8.5 and RBI Cyber Security Guidelines.",
    hint: "Criteria = The Rule; Evidence = The Fact; Finding = The Evaluation.",
    level: "basic",
    codeExample: `// 3 Pillars in Action:
Criteria: ISO 27001 Control A.8.24 (Data at rest must be encrypted with AES-256)
Evidence: AWS S3 Bucket ` + "`payshield-trans-db`" + ` has server-side encryption disabled
Finding:  Major Non-Conformity (High Breach Risk & DPDP Act Violation)`
  },
  {
    question: "What is the difference between a Major Non-Conformity, a Minor Non-Conformity, and an Opportunity for Improvement (OFI)?",
    shortAnswer: "Major Non-Conformity: Total breakdown of a core control or direct statutory violation that blocks certification; Minor Non-Conformity: Isolated lapse that does not jeopardize the entire ISMS; OFI: Suggestion to enhance an already compliant process.",
    explanation: "Auditors classify findings by severity: 1. Major NC: Production database completely unencrypted without access logs (Certification withheld); 2. Minor NC: 1 out of 500 employees missed annual security awareness refresher training (Certification granted conditional on 30-day CAPA); 3. OFI: Recommending automated Slack alerts for failed root logins.",
    hint: "Major = Systemic failure/Certification blocked; Minor = Isolated slip-up; OFI = Best-practice suggestion.",
    level: "basic",
    codeExample: `// Audit Finding Classifications:
[MAJOR NC] ➔ "No backup restoration test conducted in 24 months (Control A.8.13 broken)."
[MINOR NC] ➔ "Employee ID #4092 signed AUP acknowledgement 5 days past onboarding SLA."
[OFI]      ➔ "Consider migrating from SMS OTP to FIDO2 hardware tokens for developers."`
  },
  {
    question: "Why is 'Auditor Independence and Objectivity' a non-negotiable principle under ISO 19011?",
    shortAnswer: "Auditors must not audit their own work or report directly to the managers whose systems they evaluate, ensuring unbiased findings free from operational conflict of interest.",
    explanation: "If a Lead DevOps engineer writes the firewall rules and is assigned to audit those same firewall rules, they cannot be objective. Independence guarantees that findings reflect reality rather than self-protection. Internal auditors must report directly to the Audit Committee or Board of Directors rather than IT operational heads.",
    hint: "You cannot grade your own exam paper.",
    level: "moderate",
    codeExample: `// Auditor Independence Governance Rule:
Violation:  Network Architect Mamata audits the firewall rules she configured yesterday. (REJECTED!)
Compliant:  Independent CISO Audit Team from Jadavpur Lab audits Kolkata FinTech firewalls. (APPROVED!)`
  },
  {
    question: "Under the Indian DPDP Act 2023 Section 8(5) and Section 10, how are Independent Data Audits mandated for Significant Data Fiduciaries (SDFs)?",
    shortAnswer: "Significant Data Fiduciaries must appoint an independent Data Auditor to conduct periodic Data Protection Impact Assessments (DPIAs) and independent Data Audits to verify reasonable personal data safeguards.",
    explanation: "To prevent massive citizen data leaks, the DPDP Act 2023 mandates that enterprise fiduciaries handling large volumes of sensitive biometric, health, or financial data must undergo annual third-party Data Audits. Failing to maintain verifiable audit trails and audit reports triggers statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Significant Data Fiduciaries must hire independent auditors to evaluate personal data processing.",
    level: "moderate",
    codeExample: `// DPDP Statutory Audit Mandate:
Entity:          Significant Data Fiduciary (Kolkata Health Cloud - 80,000 patient records)
Mandate:         Independent Data Audit conducted annually under DPDP Act Section 10(2)(b)
Auditor Deliverable: Formal Audit Report submitted directly to Data Protection Board of India (DPBI)`
  },
  {
    question: "How does the Reserve Bank of India (RBI) Cyber Security Framework mandate CERT-In Empaneled Audits for Commercial Banks?",
    shortAnswer: "RBI mandates that all scheduled commercial banks, NBFCs, and payment gateway operators must undergo comprehensive annual Information Security audits conducted exclusively by CERT-In empaneled auditor firms.",
    explanation: "Self-assessments are legally insufficient for banking infrastructure. Under RBI Cyber Security Master Directions, financial institutions must hire independent auditors certified by the Indian Computer Emergency Response Team (CERT-In) to audit UPI switches, core banking ledgers, and API gateways against ISO 27001, PCI-DSS, and RBI cyber baselines.",
    hint: "Banks in India must hire CERT-In certified independent auditors every single year.",
    level: "moderate",
    codeExample: `// RBI Banking IS Audit Trigger:
Audit Entity: PayShield India UPI Switch (Kolkata)
Requirement:  Annual comprehensive technical audit by CERT-In Empaneled Auditor
Scope:        Core payment microservices, HSM key management, database access logs, and DR drill records`
  },
  {
    question: "What is an 'Audit Trail', and what properties make an audit trail legally defensible in Indian courts under the IT Act 2000 Section 65B?",
    shortAnswer: "A chronological, tamper-proof record of system activities; legally defensible when it possesses immutable integrity (WORM storage), cryptographic hashing (SHA-256), synchronized timestamps (NTP), and an unbroken chain of custody.",
    explanation: "Under Section 65B of the Indian Evidence Act (and IT Act 2000), electronic logs are admissible in court only if the organization proves they could not be altered or fabricated. Audit trails written to Write-Once-Read-Many (WORM) storage (like AWS S3 Object Lock) with synchronized NTP clocks satisfy these strict legal evidentiary standards.",
    hint: "Immutable, timestamped, cryptographically hashed, and protected from deletion.",
    level: "expert",
    codeExample: `// Section 65B-Compliant Audit Log Record:
{
  "logId": "LOG-KOLKATA-2026-8812",
  "timestampUTC": "2026-08-23T02:40:15.112Z",
  "actor": "usr_dbadmin_mamata",
  "action": "SELECT_CONFIDENTIAL_PAN_TABLE",
  "sourceIp": "10.0.4.15",
  "sha256Hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "storageMode": "AWS_S3_OBJECT_LOCK_COMPLIANCE"
}`
  },
  {
    question: "What is the difference between an Internal Security Audit (First-Party) and a Certification Audit (Third-Party)?",
    shortAnswer: "Internal Audit (First-Party): Conducted by the organization's own trained staff to prepare for certification and drive continuous improvement; Certification Audit (Third-Party): Conducted by accredited Registrars (BSI, TÜV) to issue formal ISO 27001 certificates.",
    explanation: "Under ISO 27001 Clause 9.2, organizations must conduct internal audits at planned intervals before inviting third-party registrars. Internal audits find weaknesses early and test remediation plans; third-party audits determine whether the organization officially earns or retains its globally accredited ISO 27001 certification badge.",
    hint: "First-party is internal self-evaluation; Third-party is external official certification.",
    level: "basic",
    codeExample: `// Audit Types:
First-Party (Internal):  Mamata & Abhronila audit Kolkata FinTech microservices before external review
Third-Party (External):  BSI Registrar conducts official Stage 2 ISO 27001 Certification Audit`
  },
  {
    question: "What are 'Audit Working Papers', and why are they vital for external audit defense?",
    shortAnswer: "Working papers are the auditor's documented collection of audit plans, testing checklists, log extractions, interview transcripts, and screenshots that substantiate every finding and conclusion in the final audit report.",
    explanation: "An auditor cannot issue a Non-Conformity based on memory. Working papers provide the complete evidentiary trail: 'On 2026-08-23, tested 25 user accounts; screenshot #4 proves Account #12 lacked MFA; syslog attached.' If an audit report is challenged during litigation or regulatory review, working papers prove due professional care.",
    hint: "The auditor's notes, screenshots, and logs proving that every finding is backed by evidence.",
    level: "moderate",
    codeExample: `// Audit Working Paper Schema (WP-2026-04):
Test Objective: Verify automated account lockout after 5 failed login attempts (Control A.8.5)
Sample Tested:  10 User accounts across AWS Cognito staging pool
Evidence:       Screenshot WP-04-A shows lockout after 5th attempt; CloudWatch log attached
Conclusion:     CONFORMANT with Policy STD-SEC-02`
  },
  {
    question: "What happens during the 'Audit Closing Meeting' (Exit Conference)?",
    shortAnswer: "The lead auditor presents all identified findings, non-conformities, and positive observations to executive management, clarifies factual misunderstandings, and agrees on deadlines for Corrective Action Plans (CAPA).",
    explanation: "An audit should never produce surprises in the final written report. During the Closing Meeting, the auditor reviews every Major/Minor Non-Conformity with the CISO and leadership, ensuring both sides agree on the factual evidence and establishing formal 30-day or 90-day timelines for corrective actions.",
    hint: "The final meeting where the auditor presents findings and agrees on fix deadlines with management.",
    level: "basic",
    codeExample: `// Audit Closing Meeting Agenda:
1. Executive Summary & Acknowledgement of Auditee Cooperation
2. Presentation of Positive Observations (Conformities)
3. Formal Disclosure of 1 Minor Non-Conformity (Control A.8.5) and 2 OFIs
4. Agreement on Corrective Action Plan (CAPA) Submission Deadline (30 Days)`
  },
  {
    question: "How does the 'Sampling Methodology' work during Information Security Audits?",
    shortAnswer: "Because auditing 100% of millions of transactions is impossible, auditors select a statistically representative sample (e.g. 25 out of 1,000 servers, or 50 out of 5,000 user accounts) using random or risk-based sampling.",
    explanation: "Under ISO 19011, sampling introduces audit risk (the risk that a sample does not reflect the total population). To minimize this, auditors use Risk-Based Sampling: testing 100% of Tier-1 Critical payment switches, while using statistical random sampling on standard developer workstations.",
    hint: "Testing a representative sample of servers and accounts to draw conclusions about the whole system.",
    level: "moderate",
    codeExample: `// Risk-Based Audit Sampling Plan:
Tier 1 Payment Switches: 100% Census Sample (All 12 switches audited)
Developer Workstations:  5% Statistical Sample (25 of 500 laptops audited)`
  },
  {
    question: "Why is a Security Audit NOT equivalent to a Vulnerability Assessment (VA) or Penetration Test (PT)?",
    shortAnswer: "A VA is an automated tool scan finding technical flaws; a PT is an ethical hack actively exploiting flaws; an Audit is a holistic governance evaluation comparing policies, processes, human operations, and technical controls against formal criteria.",
    explanation: "A company can score 100% on a Nessus vulnerability scan and still fail an ISO 27001 audit if employee onboarding lacks background checks (A.6.1), disaster recovery plans are untested (A.8.14), or access reviews are undocumented. VA/PT are technical tools; an Audit evaluates total operational governance.",
    hint: "VA scans software; PT hacks software; Audit evaluates the entire governance system (people, policies, controls).",
    level: "basic",
    codeExample: `// VA vs PT vs Audit:
Vulnerability Assessment (VA): Nessus scans IP 10.0.0.1 for open ports (Tool Scan)
Penetration Testing (PT):      Ethical hacker exploits port 445 to gain shell (Exploit Test)
Security Audit:                Evaluates policies, access reviews, training records & VA/PT reports (Governance)`
  },
  {
    question: "Synthesizing Introduction to Information Security Audits: what is the master equation of Audit Governance Integrity?",
    shortAnswer: "$$\\text{Audit Integrity} = \\frac{\\text{Auditor Independence} \\times \\text{Objective Evidence Rigor} \\times \\text{Criteria Coverage (ISO/DPDP/RBI)}}{\\text{Auditor Bias} + \\text{Un-investigated Control Gaps}} \\ge 1.0$$ with continuous ISO 19011 and Clause 9.2 validation.",
    explanation: "This master governance relationship proves that an Information Security Audit delivers true assurance when independent, objective auditors systematically evaluate factual evidence against comprehensive legal and technical criteria. This eliminates operational bias, guarantees audit defensibility, and ensures total statutory safe harbor under global and Indian cyber regulations.",
    hint: "Conclude by reviewing how auditor independence, objective evidence, and criteria coverage guarantee audit integrity.",
    level: "expert",
    codeExample: `// Master Equation of Information Security Audit Governance:
Integrity = (Auditor_Independence * Evidence_Rigor * Criteria_Coverage) / (Bias + Uninvestigated_Gaps);
Condition: Integrity >= 1.0 (100% Objective & Independent);
Outcome:   100% ISO 27001 Certification Conformance & Total Statutory Safe Harbor!`
  }
];

export default questions;
