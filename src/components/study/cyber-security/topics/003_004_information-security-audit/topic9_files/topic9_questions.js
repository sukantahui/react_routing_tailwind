const questions = [
  {
    question: "What is the critical distinction between a 'Correction', a 'Corrective Action', and a 'Preventive Action' in ISMS Governance (ISO 27001 Clause 10.1)?",
    shortAnswer: "Correction fixes the immediate symptom (containment); Corrective Action eliminates the underlying root cause to prevent recurrence; Preventive Action anticipates and eliminates potential causes before an incident occurs.",
    explanation: "Under ISO 27001, applying a security patch to a hacked server is merely a 'Correction'. Performing a 5-Whys Root Cause Analysis to discover why the server was missing from the inventory and mandating automated CI/CD patch pipelines is the 'Corrective Action'. Hardening unbreached future systems is 'Preventive Action'.",
    hint: "Correction = Fix symptom now; Corrective Action = Stop it from ever happening again; Preventive Action = Stop it before it ever happens.",
    level: "basic",
    codeExample: `// Correction vs Corrective Action vs Preventive Action:
Correction:        Revoke an orphaned employee account found active 60 days after resignation.
Corrective Action: Deploy automated SCIM webhook integration between HR portal and Okta/IdP.
Preventive Action: Conduct quarterly automated access certification campaigns across all SaaS tools.`
  },
  {
    question: "What is the '5-Whys' Root Cause Analysis (RCA) technique, and why is stopping at the first 'Why' considered an audit failure?",
    shortAnswer: "The 5-Whys is an iterative interrogative technique that explores the cause-and-effect relationships underlying a problem; stopping at the first Why only addresses the superficial symptom without eliminating the systemic organizational failure.",
    explanation: "If an auditor stops at 'Why 1: The engineer didn't run the patch', the corrective action will simply be 'tell the engineer to work harder'. By drilling down 5 levels, the team identifies governance and tooling defects (e.g. lack of Infrastructure-as-Code and automated CI/CD scanners), ensuring permanent resolution.",
    hint: "Drill down 5 levels of 'Why' until you reach the fundamental process or governance failure.",
    level: "basic",
    codeExample: `// 5-Whys RCA for Unpatched Database Server:
Why 1: Why was the DB unpatched? ➔ DevOps engineer forgot to apply the security update.
Why 2: Why was it forgotten? ➔ The server was not listed on the patch schedule.
Why 3: Why was it missing? ➔ It was created manually during an emergency hotfix.
Why 4: Why was it created manually? ➔ No policy enforcing Infrastructure-as-Code (Terraform).
Why 5 (ROOT CAUSE): ➔ Lack of automated IaC CI/CD drift detection and cloud inventory synchronization!`
  },
  {
    question: "What are the Eight Disciplines (8D) of the formal CAPA problem-solving methodology?",
    shortAnswer: "D1: Establish Team; D2: Describe Problem; D3: Containment Actions; D4: Root Cause Analysis; D5: Choose Permanent Fix; D6: Implement & Validate; D7: Prevent Recurrence; D8: Recognize Team & Close CAPA.",
    explanation: "Originally developed in manufacturing and adopted by enterprise cybersecurity, the 8D framework provides a structured, disciplined engineering methodology to contain security breaches, identify true root causes, and institutionalize systemic safeguards.",
    hint: "D1 Team, D2 Problem, D3 Contain, D4 Root Cause, D5 Fix, D6 Validate, D7 Prevent Recurrence, D8 Close.",
    level: "moderate",
    codeExample: `// 8D CAPA Lifecycle Summary:
D1: Assemble Cross-Functional CIRT Team (Security, DevOps, Legal)
D2: Precise PLOR Problem Description
D3: Immediate Containment (Isolate compromised subnet)
D4: 5-Whys / Fishbone Root Cause Analysis
D5: Architect Permanent Remediation (Mutual TLS + MFA)
D6: Deploy and Verify in Staging & Production
D7: Update ISMS Policies and CI/CD Guardrails
D8: Lead Auditor Verification of Effectiveness (VoE) & Sign-Off`
  },
  {
    question: "What is 'Verification of Effectiveness' (VoE) in CAPA closure, and why does ISO 19011 forbid closing an NC immediately upon fix deployment?",
    shortAnswer: "VoE is the independent evaluation conducted after a defined monitoring period (e.g. 30–90 days) to mathematically verify through re-sampling and audit testing that the fix eliminated the root cause without side effects.",
    explanation: "Deploying a fix only proves implementation, not effectiveness. Under ISO 19011 Clause 6.7 and ISO 27001 Clause 10.1, a Lead Auditor cannot close a Non-Conformity ticket until a follow-up audit demonstrates that the non-conformity has not reoccurred during actual operations.",
    hint: "VoE requires waiting 30-90 days to test and prove the problem has truly stopped occurring.",
    level: "moderate",
    codeExample: `// CAPA Implementation vs Verification of Effectiveness:
Day 0:  Fix Deployed: Automated SCIM offboarding script deployed. (Status: PENDING VOE)
Day 60: Follow-up Audit: Auditor samples 40 recent employee departures.
Result: 40/40 accounts terminated within < 5 minutes. 0 orphaned accounts found.
Status: VERIFIED EFFECTIVE ➔ Non-Conformity Officially Closed by Lead Auditor!`
  },
  {
    question: "How does the Ishikawa (Fishbone / Cause-and-Effect) Diagram categorize root causes during a cybersecurity incident investigation?",
    shortAnswer: "By organizing potential causes into 6 core categories (6 Ms or 4 Ps): Policies (Governance), Procedures (Processes), People (Training/Human factors), Plant/Technology (Hardware/Software/Cloud), Measurement (Monitoring/SIEM), and Environment (Milieu).",
    explanation: "When investigating a complex breach (such as a ransomware outbreak), single-path RCA can miss contributing factors. The Fishbone diagram ensures that investigators evaluate technical vulnerabilities, policy ambiguities, lack of employee training, and deficient SIEM alerts simultaneously.",
    hint: "Fishbone groups causes into Policies, Procedures, People, Technology, Measurement, and Environment.",
    level: "moderate",
    codeExample: `// Fishbone Cybersecurity Dimensions:
[PEOPLE]      ➔ Lack of phishing awareness training; credential reuse
[TECHNOLOGY]  ➔ Legacy Windows Server 2012 without EDR agent installed
[POLICY]      ➔ No mandatory MFA requirement for legacy VPN gateway
[PROCEDURE]   ➔ Third-party vendor offboarding checklist not enforced
[MEASUREMENT] ➔ SIEM correlation rule disabled due to alert fatigue`
  },
  {
    question: "Under the Indian DPDP Act 2023 Section 8(5), how does a documented CAPA register provide statutory 'Safe Harbor' against ₹250 Crore penalties?",
    shortAnswer: "A documented CAPA register with verified root cause remediation proves to the Data Protection Board of India (DPBI) that the Data Fiduciary acted proactively without gross negligence, transforming a potential violation into an established reasonable security safeguard.",
    explanation: "In the event of a personal data breach inquiry, the DPBI evaluates whether the organization ignored known vulnerabilities or actively corrected them. Demonstrating a structured CAPA process with verified effectiveness proves compliance with Section 8 obligations.",
    hint: "Documented CAPA registers prove reasonable safeguards, averting ₹250 Cr statutory fines.",
    level: "basic",
    codeExample: `// DPDP Act Section 8 Safe Harbor Docket:
1. Vulnerability Discovered: S3 bucket permissions misconfiguration.
2. Immediate Containment (D3): Applied bucket private ACL within 15 minutes.
3. Root Cause Analysis (D4): Manual console creation bypassed Terraform linter.
4. Corrective Action (D6): Enforced AWS SCP blocking non-Terraform S3 creations.
5. DPBI Determination: Proactive CAPA verified; 0 penalty imposed!`
  },
  {
    question: "What is the standard time window granted to close a Major Non-Conformity CAPA before ISO 27001 certification is revoked or refused?",
    shortAnswer: "Standard accredited certification bodies (e.g. BSI, DNV, TÜV) grant a maximum of 90 CALENDAR DAYS (3 Months) to complete root cause analysis, implement corrective actions, and submit evidence for verification.",
    explanation: "If an auditee fails to submit an acceptable CAPA and provide objective proof of closure within 90 days, the Lead Auditor must recommend certification refusal or suspension, requiring a full re-audit from Stage 1.",
    hint: "90 calendar days to complete CAPA and provide proof of closure.",
    level: "basic",
    codeExample: `// Major NC CAPA 90-Day Timeline:
Day 0:  Major NC issued during Stage 2 Audit (No Risk Assessment performed)
Day 14: Submit D1-D4 Root Cause Analysis & Proposed Action Plan
Day 60: Execute full Risk Assessment across all 18 enterprise assets
Day 75: Auditor conducts Follow-up Fieldwork & closes Major NC ➔ ISO 27001 Certificate Issued!`
  },
  {
    question: "Under Reserve Bank of India (RBI) Cyber Security Guidelines, how are bank CAPAs governed and tracked?",
    shortAnswer: "Indian banks must maintain a centralized, Board-approved Cyber Security CAPA Register, report unresolved audit gaps to the Board IT Sub-Committee quarterly, and submit compliance closure reports to RBI Risk-Based Supervision inspectors.",
    explanation: "RBI mandates that audit findings cannot languish in IT queues. High-severity audit gaps (e.g., in SWIFT switches or UPI payment processing) require time-bound CAPA remediation with direct accountability assigned to the Chief Information Security Officer (CISO).",
    hint: "RBI mandates Board-level oversight and quarterly reporting of all cyber security CAPAs.",
    level: "moderate",
    codeExample: `// RBI Cyber Security CAPA Governance:
CISO Mandate: Submit Quarterly CAPA Status to Board IT Committee
SLA:          High-Risk Findings must be resolved within 30 days
Enforcement:  RBI imposes financial penalties & halts customer onboarding if CAPAs are overdue!`
  },
  {
    question: "What is 'Root Cause Recurrence Rate' as an ISMS Continual Improvement Key Performance Indicator (KPI)?",
    shortAnswer: "A metric calculating the percentage of audit findings or security incidents caused by a root cause that was previously identified and supposedly closed in an earlier CAPA ($$\\text{Recurrence Rate} = \\frac{\\text{Repeated Root Causes}}{\\text{Total Findings}} \\times 100\\%$$).",
    explanation: "A high recurrence rate indicates ineffective CAPA processes—meaning teams are merely fixing symptoms (corrections) rather than addressing systemic organizational failures. Top-tier ISMS implementations maintain a recurrence rate of 0%.",
    hint: "Measures whether the same root cause keeps causing new security problems.",
    level: "moderate",
    codeExample: `// Root Cause Recurrence Metric:
Total Audit Findings in 2026:  18 Findings
Findings with Repeated Causes: 0 Findings
Recurrence Rate:              0.0% (World-Class CMMI Level 5 Performance)`
  },
  {
    question: "Why must a CAPA action plan assign a 'Single Named Custodian' and a 'Measurable Acceptance Criteria'?",
    shortAnswer: "Assigning actions to generic teams (e.g. 'DevOps Team') results in diffused responsibility and missed deadlines; measurable acceptance criteria provide objective metrics for Lead Auditors to verify closure.",
    explanation: "Under ISO 19011, every CAPA line item must specify: 1. A single accountable individual (e.g., 'Mamata - Lead Architect'); 2. A hard deadline (e.g., '2026-09-15'); and 3. An objective verification test (e.g., 'Automated SonarQube blocking all SQL injection CVEs in CI pipeline').",
    hint: "Every CAPA item needs a named person, a hard deadline, and a measurable pass/fail test.",
    level: "basic",
    codeExample: `// Invalid vs Valid CAPA Action:
INVALID: "DevOps will improve cloud security soon." (Vague, no owner, no deadline)
VALID:   "Custodian: Mamata (Lead Architect) | Deadline: 2026-09-15 | Criteria: AWS Config Rule 's3-bucket-ssl-requests-only' active on 100% of buckets."`
  },
  {
    question: "How does 'Failure Mode and Effects Analysis' (FMEA) support Preventive Actions in cybersecurity?",
    shortAnswer: "FMEA calculates a Risk Priority Number (RPN) for potential failure modes ($$\\text{RPN} = \\text{Severity} \\times \\text{Occurrence} \\times \\text{Detection}$$), allowing engineers to prioritize preventive controls before a failure occurs.",
    explanation: "By analyzing potential architectural failures before deploying code or hardware, FMEA helps security architects design automated fail-safes and redundancy, embodying the core requirement of ISO 27001 Clause 10.2 (Continual Improvement).",
    hint: "FMEA uses RPN (Severity x Occurrence x Detection) to prioritize preventive safeguards.",
    level: "moderate",
    codeExample: `// FMEA Cybersecurity Calculation:
Failure Mode: Database replica synchronization lag
Severity (1-10):   8 (Stale read during financial transaction)
Occurrence (1-10): 4 (Occurs during peak network load)
Detection (1-10):  3 (Easily detected via Prometheus alert)
RPN = 8 * 4 * 3 = 96 ➔ Preventive Action: Deploy dedicated low-latency direct-connect link.`
  },
  {
    question: "What role does 'Management Review' (ISO 27001 Clause 9.3) play in the CAPA lifecycle?",
    shortAnswer: "Executive management must review the status of all non-conformities, CAPA remediation progress, and recurrence trends at planned intervals to allocate budget, personnel, and tooling for systemic resolution.",
    explanation: "Security teams cannot resolve complex root causes (e.g., replacing legacy architecture or hiring 24/7 SOC staff) without executive backing. ISO 27001 mandates that top management formally reviews CAPA registers during annual ISMS Management Reviews.",
    hint: "Top management reviews CAPAs to allocate budget and approve architectural changes.",
    level: "basic",
    codeExample: `// Management Review CAPA Agenda Item:
1. Status of 12 CAPAs initiated following 2026 Internal Audit.
2. Review of 5-Whys RCA on Payment Gateway latency incident.
3. Executive Approval of ₹25 Lakhs CAPEX for automated SIEM log archiving.
4. Formal C-Suite sign-off on ISMS Continual Improvement Plan.`
  },
  {
    question: "Synthesizing Corrective and Preventive Actions (CAPA): what is the master equation of CAPA Remediation Velocity?",
    shortAnswer: "$$\\text{CAPA Remediation Velocity} = \\frac{\\text{Rigorous 8D Execution} \\times \\text{5-Whys Root Cause Resolution} \\times \\text{Verification of Effectiveness}}{\\text{Root Cause Recurrence Rate} + \\text{Un-contained Active Incidents}} \\ge 1.0$$ with continuous ISO 27001 Clause 10.1 and DPDP Act validation.",
    explanation: "This master governance relationship proves that an organization achieves rapid non-conformity closure and long-term security resilience when CAPAs are executed using the 8D framework, root causes are eliminated via 5-Whys, and fixes are validated through independent verification of effectiveness. Eliminating root cause recurrence and active incidents guarantees 100% audit compliance and total statutory safe harbor.",
    hint: "Conclude by reviewing how 8D methodology, 5-Whys RCA, and Verification of Effectiveness prevent incident recurrence.",
    level: "expert",
    codeExample: `// Master Equation of CAPA Governance:
Velocity = (EightD_Rigor * RCA_Resolution * VoE_Effectiveness) / (Recurrence_Rate + Active_Incidents);
Condition: Recurrence_Rate == 0 && Overdue_CAPAs == 0;
Outcome:   100% ISO/IEC 27001:2022 Clause 10.1 Compliance and Total Regulatory Safe Harbor!`
  }
];

export default questions;
