const questions = [
  {
    question: "What is a 'Gap Analysis' in Information Security, and how does it differ from a formal Certification Audit?",
    shortAnswer: "A Gap Analysis is an informal diagnostic readiness assessment comparing an organization's current security state ('As-Is') against a desired standard ('To-Be') without issuing formal pass/fail certification or public audit reports.",
    explanation: "A Gap Analysis is performed prior to a formal audit to identify missing policies, unimplemented technical controls, and operational weaknesses. Unlike a formal third-party audit (which determines certification status), a gap analysis produces an internal remediation roadmap to prepare for the audit.",
    hint: "Gap Analysis = Diagnostic readiness check; Formal Audit = Official pass/fail certification.",
    level: "basic",
    codeExample: `// Gap Analysis vs Formal Audit:
Gap Analysis:      Current State ("As-Is") ➔ Compare to ISO 27001 ➔ Remediation Roadmap (No pass/fail)
Formal ISMS Audit: Objective Evidence Tested ➔ Conformity / Non-Conformity ➔ Certification Decision`
  },
  {
    question: "What is the 'PLOR' formula for drafting professional, legally defensible Audit Non-Conformity Reports?",
    shortAnswer: "1. Point of Standard (The specific clause/control violated); 2. Location / Condition (What was observed during sampling); 3. Objective Evidence (The factual proof/data collected); 4. Reason / Risk (The operational risk or consequence).",
    explanation: "Under ISO 19011, an auditor cannot write vague complaints. Every finding must use the PLOR structure: 1. Point of Standard (e.g. ISO 27001 Control A.8.24); 2. Location (e.g. Production RDS instance in AWS ap-south-1); 3. Objective Evidence (e.g. AWS CLI output showing `StorageEncrypted: false`); 4. Reason (e.g. Direct risk of plaintext data exposure during physical drive theft).",
    hint: "Point of Standard, Location/Condition, Objective Evidence, Reason/Risk.",
    level: "basic",
    codeExample: `// PLOR Non-Conformity Structure:
[P]oint of Standard: ISO/IEC 27001:2022 Control A.8.24 (Use of Cryptography)
[L]ocation:          Production Payment Database Cluster (RDS Postgres)
[O]bjective Evidence:AWS CLI export 'db_describe.json' shows StorageEncrypted=false
[R]eason / Risk:     Exposes citizen credit card data to plaintext exfiltration risk`
  },
  {
    question: "What are the core differences between a Major Non-Conformity (Major NC), a Minor Non-Conformity (Minor NC), and an Opportunity for Improvement (OFI)?",
    shortAnswer: "Major NC: Total absence or systemic failure of a mandatory control (blocks certification); Minor NC: Isolated, single-instance lapse that does not compromise overall ISMS; OFI: Fully compliant control that can be optimized for better efficiency.",
    explanation: "A Major NC represents a complete absence of an entire clause (e.g. no risk assessments performed or unencrypted production databases), requiring a re-audit before certification can be granted. A Minor NC is an isolated lapse (e.g. 1 out of 50 laptops missing an antivirus update). An OFI is a helpful suggestion with no non-conformity.",
    hint: "Major NC = Systemic breakdown (Blocks cert); Minor NC = Isolated slip-up; OFI = Optional optimization.",
    level: "basic",
    codeExample: `// Audit Finding Classification Matrix:
Major NC: 0 risk assessments conducted in 12 months ➔ ISO 27001 Certification DENIED!
Minor NC: 1 out of 40 server room visitor logs lacked sign-out time ➔ Certification granted with CAPA.
OFI:      Firewall change approvals are tracked via email; recommend Jira ticketing system.`
  },
  {
    question: "How does the CMMI Maturity Model (Levels 1 to 5) evaluate security process maturity during a Gap Analysis?",
    shortAnswer: "Level 1: Initial (Ad-hoc, chaotic); Level 2: Managed (Project-level planning); Level 3: Defined (Standardized enterprise-wide policies); Level 4: Quantitatively Managed (Data-driven metric controls); Level 5: Optimizing (Continuous AI-driven improvement).",
    explanation: "During gap analysis, auditors classify security processes into CMMI levels. A Level 1 organization reacts chaotically to incidents with no written policies. Most ISO 27001 certified companies operate at Level 3 (Defined) or Level 4 (Quantitatively Managed with automated SIEM metrics).",
    hint: "1: Ad-hoc, 2: Managed, 3: Defined (ISO baseline), 4: Quantitatively Managed, 5: Optimizing.",
    level: "moderate",
    codeExample: `// CMMI Security Process Maturity Spectrum:
Level 1 (Initial):      "We patch servers whenever we remember." (High Gap Risk)
Level 3 (Defined):      "Documented patch policy: All CVEs > 7.0 patched within 14 days." (ISO Baseline)
Level 5 (Optimizing):   "Automated CI/CD canary patching with autonomous rollback & ML anomaly detection."`
  },
  {
    question: "Why can an auditor NEVER recommend specific commercial vendors (e.g. 'Buy Splunk' or 'Buy Palo Alto') in a Non-Conformity Report or OFI?",
    shortAnswer: "Recommending specific commercial software violates Auditor Independence and Objectivity under ISO 19011, creating a conflict of interest and turning the auditor into a biased consultant.",
    explanation: "Auditors must remain independent evaluators of conformity against criteria. They state the requirement and the gap (e.g., 'Centralized log aggregation is absent'), but the organization must retain complete freedom to choose whether to deploy Splunk, Elasticsearch, Grafana Loki, or an in-house tool.",
    hint: "Auditors state WHAT must be achieved, never WHICH commercial tool to purchase.",
    level: "moderate",
    codeExample: `// Auditor Independence Rule:
INCORRECT: "Major NC: You must purchase Splunk Enterprise for ₹45 Lakhs." (UNETHICAL / INVALID)
CORRECT:   "Major NC: Ineffective implementation of ISO 27001 Control A.8.15. Centralized log aggregation is absent."`
  },
  {
    question: "Under the Indian DPDP Act 2023 Section 8(5), how does a Gap Analysis protect an enterprise from the ₹250 Crore penalty?",
    shortAnswer: "A proactive Gap Analysis identifies and remediates unencrypted citizen data, missing consent records, and weak access controls before an external breach or DPBI inspection occurs, creating verifiable proof of 'Reasonable Security Safeguards'.",
    explanation: "If a breach occurs, the Data Protection Board of India (DPBI) investigates whether the company acted with negligence. Presenting a documented Gap Analysis and completed Corrective Action Plan proves that the Data Fiduciary took proactive, reasonable measures to secure citizen data, qualifying for statutory safe harbor.",
    hint: "Gap analysis identifies and fixes data leaks early, proving proactive reasonable safeguards.",
    level: "basic",
    codeExample: `// DPDP Act Safe Harbor Docket:
1. Conducted DPDP Gap Analysis on 2026-03-01.
2. Identified Gap: 80,000 biopsy scans unencrypted at rest in staging S3 bucket.
3. Remediated via AWS KMS AES-256 within 48 hours (Documented in CAPA Register).
4. Statutory Result: Zero negligence found by DPBI; ₹250 Crore penalty averted!`
  },
  {
    question: "What is an 'Executive Summary' in an Audit Report, and why must it be written differently from the Technical Findings section?",
    shortAnswer: "The Executive Summary is tailored for the Board of Directors and C-Suite, providing high-level risk ratings, strategic business impacts, compliance scores, and resource priorities without dense technical jargon.",
    explanation: "Board members need to know whether the organization is at risk of regulatory fines, customer churn, or certification loss. While the Technical Annex details specific server IP addresses and CLI configurations, the Executive Summary summarizes overall maturity, major non-conformities, and required capital expenditure.",
    hint: "Executive summary is for C-Suite/Board (Business risk); Technical findings are for engineers.",
    level: "basic",
    codeExample: `// Executive Summary vs Technical Detail:
Executive Summary: "The ISMS achieves 92% readiness. 1 Major NC in Database Encryption requires ₹15 Lakhs CAPEX."
Technical Detail:  "Host 10.0.4.12 running PostgreSQL 14.2 has parameter 'ssl=off' in postgresql.conf."`
  },
  {
    question: "What is the standard time window given to an organization to close a Major Non-Conformity before ISO 27001 certification is refused?",
    shortAnswer: "Standard certification bodies typically grant 90 CALENDAR DAYS (3 Months) to submit a Corrective Action Plan (CAPA) and provide verified proof of closure before certification is denied.",
    explanation: "If a Major NC is issued during Stage 2 certification, the Lead Auditor cannot recommend certification. The auditee is given up to 90 days to eliminate the root cause, implement the fix, and undergo a verification follow-up audit. If the gap remains unclosed after 90 days, the entire audit must be repeated.",
    hint: "90 days (3 months) to fix a Major NC before failing the certification audit.",
    level: "moderate",
    codeExample: `// Major NC Closure Timeline:
Day 0:  Major NC issued during Stage 2 Audit (No Risk Assessment performed)
Day 14: Auditee submits Root Cause Analysis & Corrective Action Plan (CAPA)
Day 60: Auditee executes full Risk Assessment across all 18 enterprise assets
Day 75: Auditor conducts Follow-up Fieldwork & closes Major NC ➔ ISO 27001 Certificate Issued!`
  },
  {
    question: "Under Reserve Bank of India (RBI) Cyber Security Guidelines, what happens if an Indian bank fails to close an audit non-conformity?",
    shortAnswer: "RBI can impose severe regulatory penalties, issue supervisory warning letters, restrict the bank from onboarding new digital/credit card customers, or appoint an external special auditor at the bank's expense.",
    explanation: "Under the Banking Regulation Act and RBI Cyber Security Framework, audit findings are legally enforceable. Failure to remediate high-risk vulnerabilities (such as unsegmented core banking networks or unmonitored SWIFT switches) results in public financial fines and business expansion bans.",
    hint: "RBI can fine banks, halt digital customer onboarding, and mandate external investigations.",
    level: "moderate",
    codeExample: `// RBI Regulatory Enforcement Action:
Bank:        Failed to remediate Major NC in Core Banking Access Controls for 6 months.
RBI Action:  Imposed ₹1.5 Crore statutory penalty + Banned issuing new credit cards until full CAPA verification.`
  },
  {
    question: "What is an 'Observation' or 'Opportunity for Improvement' (OFI) in an ISO 19011 audit report?",
    shortAnswer: "A documented auditor insight highlighting an area where the current control meets minimum standard requirements but carries future risk of degrading or could be streamlined for higher efficiency.",
    explanation: "An OFI is not a non-conformity and does not require a formal CAPA closure report. It serves as professional constructive feedback to help the organization mature its ISMS processes before a minor gap deteriorates into a full non-conformity during future surveillance audits.",
    hint: "Constructive feedback where controls are compliant today but could be improved for tomorrow.",
    level: "basic",
    codeExample: `// Opportunity for Improvement (OFI) Example:
Finding: "Change management approvals are currently recorded via email threads."
Status:  CONFORMITY (Meets ISO 27001 Control A.8.32 minimum proof).
OFI:     "Implementing an automated Jira Service Management workflow would improve auditability."`
  },
  {
    question: "What role does 'Root Cause Analysis' (RCA) play in Non-Conformity Reporting?",
    shortAnswer: "RCA identifies the fundamental underlying organizational or procedural failure that caused the non-conformity, ensuring that corrective actions prevent recurrence rather than merely fixing the symptom.",
    explanation: "If an auditor discovers an unpatched Linux server, simply applying the patch fixes the symptom. The Root Cause Analysis (using techniques like 5-Whys or Fishbone diagrams) discovers why the patch was missed (e.g., the server was omitted from the CMDB inventory), leading to a systemic fix.",
    hint: "RCA finds WHY the failure happened so it never happens again.",
    level: "moderate",
    codeExample: `// 5-Whys Root Cause Analysis (RCA):
Symptom:   Unpatched Apache web server found during audit.
Why 1?     The security team did not deploy the patch.
Why 2?     The server was not in the patch management schedule.
Why 3?     The server was created manually by DevOps without a ticket.
Why 4?     Infrastructure is not managed via Infrastructure-as-Code (IaC).
ROOT CAUSE:Lack of automated IaC deployment pipelines. (Fix: Mandate Terraform for all servers!)`
  },
  {
    question: "How do auditors prevent 'Report Ambiguity' when presenting non-conformity findings to senior executives?",
    shortAnswer: "By linking every technical finding directly to quantified business risk (financial loss, regulatory fines, operational downtime) and providing clear, measurable criteria for successful closure.",
    explanation: "Auditors must translate technical metrics into executive business impacts. Instead of stating 'SSL cipher suite supports CBC mode', the auditor explains 'Outdated cryptographic cipher exposes payment transactions to eavesdropping, risking ₹10 Lakhs in PCI-DSS fines and breach of customer trust.'",
    hint: "Translate technical jargon into financial, legal, and operational business risk.",
    level: "basic",
    codeExample: `// Clear Business Impact Framing:
Ambiguous: "Port 21 open on 192.168.1.50."
Executive: "Legacy unencrypted FTP server on core billing server exposes customer invoice passwords, risking GDPR Article 32 non-compliance."`
  },
  {
    question: "Synthesizing Gap Analysis and Non-Conformity Reporting: what is the master equation of ISMS Remediation Velocity?",
    shortAnswer: "$$\\text{ISMS Remediation Velocity} = \\frac{\\text{Rigorous PLOR Formulations} \\times \\text{CMMI Maturity Uplift} \\times \\text{Root Cause Resolution}}{\\text{Unaddressed Major NCs} + \\text{Un-corroborated Subjective Claims}} \\ge 1.0$$ with continuous ISO 27001 and DPDP Act validation.",
    explanation: "This master governance relationship proves that an organization achieves rapid audit success and full regulatory compliance when gaps are diagnosed with CMMI rigor, non-conformities are structured using the PLOR formula, and corrective actions address systemic root causes. Eliminating unaddressed Major NCs and subjective audit claims guarantees 100% certification and total statutory safe harbor.",
    hint: "Conclude by reviewing how PLOR non-conformity reporting and Root Cause Analysis drive rapid gap closure.",
    level: "expert",
    codeExample: `// Master Equation of Gap Remediation:
Velocity = (PLOR_Rigor * CMMI_Maturity_Uplift * RCA_Resolution) / (Major_NCs + Subjective_Claims);
Condition: Major_NCs == 0 && PLOR_Defects == 0;
Outcome:   100% ISO/IEC 27001:2022 Certification and Total Regulatory Safe Harbor!`
  }
];

export default questions;
