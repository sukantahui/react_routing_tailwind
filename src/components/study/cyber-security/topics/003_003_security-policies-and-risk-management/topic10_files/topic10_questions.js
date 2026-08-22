const questions = [
  {
    question: "What is an Information Security Risk Register, and why is it mandatory under ISO/IEC 27001 Clause 6.1.2 and 6.1.3?",
    shortAnswer: "A centralized, structured repository that logs all identified information security risks, their inherent scores, selected treatments, assigned owners, implementation SLAs, and residual risk scores.",
    explanation: "The Risk Register is the operational backbone of an Information Security Management System (ISMS). It provides top management, CISOs, and external auditors with a real-time ledger of what threats exist, who owns their remediation, what controls are deployed, and what residual risk remains within the organization.",
    hint: "The master database of every cyber threat, its score, owner, and treatment plan.",
    level: "basic",
    codeExample: `// Enterprise Risk Register Schema:
[Risk ID] | [Asset] | [Threat/Vuln] | [Inherent Score] | [Treatment] | [Owner] | [Residual Score] | [Status]`
  },
  {
    question: "What is the mathematical and operational difference between Inherent Risk and Residual Risk?",
    shortAnswer: "Inherent Risk is the gross risk level before any security controls are deployed; Residual Risk is the remaining net risk level after technical, administrative, and physical controls have been implemented ($$Residual = Inherent - Controls$$).",
    explanation: "For example, exposing an unpatched payment switch to the internet without a firewall has an Inherent Risk of 20 (Critical). Deploying AWS WAF, EDR, and FIDO2 MFA reduces the risk by 85%, leaving a Residual Risk of 3.0 (Low). Residual risk must never exceed the board's approved Risk Appetite.",
    hint: "Inherent = Gross risk without locks; Residual = Net risk left over with locks installed.",
    level: "basic",
    codeExample: `// Inherent vs Residual Risk Relationship:
Inherent Risk: 20 / 25 (CRITICAL)  ➔ No firewall, unpatched API, no MFA
Controls:      85% Mitigation      ➔ AWS WAF + CrowdStrike EDR + FIDO2 MFA
Residual Risk: 3.0 / 25 (LOW)      ➔ Fully within Board Risk Appetite (<= 4.0)`
  },
  {
    question: "What is 'Risk Appetite', and what governance action is triggered when Residual Risk exceeds the Appetite threshold?",
    shortAnswer: "Risk Appetite is the maximum level of residual risk the Board of Directors is willing to accept; when residual risk exceeds this threshold, secondary remediation controls or formal executive escalation are mandatory.",
    explanation: "Every organization establishes a quantitative risk appetite (e.g. 'No critical or high residual risks permitted in production, threshold <= 4.0'). If an asset has a residual risk score of 7.5, it is in statutory violation: the engineering team cannot deploy to production without implementing secondary compensatory controls or obtaining a CISO waiver.",
    hint: "The board's tolerance limit for danger. If residual risk is higher, you must fix it!",
    level: "moderate",
    codeExample: `// Risk Appetite Governance Check:
Board Risk Appetite Threshold: <= 4.0 (Low Risk)
Asset Residual Risk Score:     7.5 (Medium-High Risk)
Governance Decision:           VIOLATION! Production deployment blocked until WAF virtual patch deployed.`
  },
  {
    question: "What are the 10 mandatory attributes of an ISO 27001-compliant Risk Register entry?",
    shortAnswer: "1. Risk ID; 2. Asset & Category; 3. Asset Owner; 4. Threat & Vulnerability Description; 5. Inherent Risk Score; 6. Existing Controls; 7. Treatment Strategy; 8. Target Control (Annex A); 9. Remediation Owner & SLA; 10. Residual Risk Score & Status.",
    explanation: "Under ISO 27001 Clause 6.1.2 and 6.1.3, an auditor will reject informal spreadsheets lacking clear ownership. Each entry must specify exactly who is responsible for fixing the risk (Remediation Owner), by what calendar date (SLA), which Annex A control is being implemented, and what the verified residual risk score will be.",
    hint: "Look for ID, Asset, Threat, Inherent Score, Treatment, Controls, Owner, SLA, Residual Score, Status.",
    level: "moderate",
    codeExample: `// ISO 27001 Risk Register Entry (JSON Format):
{
  "riskId": "RSK-PAY-01",
  "asset": "UPI Payment Switch",
  "owner": "Lead Architect Mamata",
  "threat": "SQL Injection & Zero-Day API Exploit",
  "inherentScore": 20,
  "treatment": "MITIGATE",
  "control": "A.8.20 (Network Security) & A.8.24 (Cryptography)",
  "sla": "2026-09-30",
  "residualScore": 2.5,
  "status": "IN_PROGRESS"
}`
  },
  {
    question: "What are the 3 operational triggers for reviewing and updating an Enterprise Risk Register?",
    shortAnswer: "1. Scheduled Periodic Reviews (Quarterly by CISO Office, Annually during Clause 9.3 Management Review); 2. Major Security Incidents (Post-incident review of SEV-1 breaches); 3. Significant Architectural Changes (Cloud migrations, new ERP rollouts).",
    explanation: "A Risk Register is never a static snapshot. It must be continuously calibrated: 1. Quarterly reviews ensure owners meet patching deadlines; 2. When a ransomware incident occurs, the register is updated to reflect new threat capabilities; 3. When an enterprise migrates 500 servers from on-prem to AWS, all associated cloud risks are logged.",
    hint: "1. Routine schedule (quarterly/annually); 2. Cyber breaches; 3. Major IT changes.",
    level: "basic",
    codeExample: `// Risk Register Review Triggers:
Trigger 1 (Scheduled):  Quarterly CISO ISMS Review (Q3 2026)
Trigger 2 (Incident):   Post-Incident Root Cause Analysis of DDOS Attack (SEV-1)
Trigger 3 (Change):     Migration of 500 Payment Microservices to AWS Cloud`
  },
  {
    question: "How does Reserve Bank of India (RBI) Cyber Security Guidelines mandate Risk Register Reporting to Board Committees?",
    shortAnswer: "RBI mandates that scheduled commercial banks and payment operators must present an automated, quantified Risk Register directly to the Board Risk Management Committee (BRMC) on a quarterly basis.",
    explanation: "Under the RBI Cyber Security Framework for Banks, cybersecurity risk cannot remain hidden in IT silos. The Chief Information Security Officer (CISO) must present the updated Risk Register to the BRMC, highlighting all High and Critical inherent risks, remediation progress, and residual exposures on core banking transaction ledgers.",
    hint: "Banks must present their risk registers directly to the Board of Directors every quarter.",
    level: "moderate",
    codeExample: `// RBI BRMC Risk Register Reporting Agenda:
Item 1: Review of 45 Inherent High/Critical Risks on UPI Core Switch
Item 2: Verification of Remediation SLAs (100% of Critical CVEs closed in < 48h)
Item 3: Formal Board Sign-off on All Residual Risks <= Appetite Threshold (3.0)`
  },
  {
    question: "Under the Indian DPDP Act 2023, why is maintaining a dynamic Risk Register critical during Data Protection Board of India (DPBI) investigations?",
    shortAnswer: "A documented Risk Register provides statutory proof that the Data Fiduciary implemented reasonable technical and organizational safeguards under Section 8, providing legal safe harbor against ₹250 Crore Section 33 fines.",
    explanation: "If an enterprise suffers a personal data breach, DPBI investigators will demand the historical Risk Register. If the company proves that the risk was identified, evaluated, and mitigated with state-of-the-art controls in the register, the breach is deemed an advanced adversary attack rather than corporate negligence, immunizing directors from maximum statutory fines.",
    hint: "The risk register is your legal proof of due diligence and reasonable security safeguards.",
    level: "basic",
    codeExample: `// DPDP Statutory Defense via Risk Register:
Investigation: 50,000 patient records leaked via zero-day API exploit
Evidence:      Risk Register RSK-MED-04 shows active WAF mitigation, daily SAST scans & signed CISO review
DPBI Finding:  Due diligence proven under Section 8; Maximum penalty waived!`
  },
  {
    question: "What is 'Control Decay', and why must Control Effectiveness in the Risk Register be audited continuously?",
    shortAnswer: "Control Decay occurs when security safeguards gradually lose effectiveness over time due to configuration drift, software updates, key rotation lapses, or new attacker exploit techniques.",
    explanation: "A firewall rule that provided 90% protection last year may provide only 30% protection today if newly opened debug ports bypass it or new evasion techniques emerge. Continuous vulnerability scanning and automated posture management ensure that Control Effectiveness scores in the Risk Register reflect current operational reality.",
    hint: "Security controls rust and decay over time if not constantly tested and updated.",
    level: "moderate",
    codeExample: `// Control Decay Example:
Year 2025: WAF Rule blocks SQL Injection ➔ Control Effectiveness: 90%
Year 2026: New Unicode Bypass Technique emerges ➔ Control Effectiveness drops to 40%!
Action:    Update WAF regex rules immediately to restore 90% effectiveness.`
  },
  {
    question: "What is the difference between a 'Risk Owner' and a 'Risk Custodian / Remediation Owner' in the Risk Register?",
    shortAnswer: "The Risk Owner is the executive or business leader accountable for accepting or managing the business impact; the Remediation Owner (Custodian) is the technical engineer responsible for implementing the corrective safeguard.",
    explanation: "Under ISO 27001, accountability and execution are distinct: 1. Risk Owner: Head of Digital Banking (approves treatment and owns business impact); 2. Remediation Owner: Senior DevOps Engineer Mamata (configures AWS WAF rules and patches code within the 30-day SLA).",
    hint: "Risk Owner is the business boss; Remediation Owner is the engineer doing the technical fix.",
    level: "basic",
    codeExample: `// Ownership Roles in Risk Register:
Risk Owner (Accountability):        VP of Digital Banking (Business Executive)
Remediation Owner (Implementation): Lead Cryptographic Engineer Mamata (Technical Architect)`
  },
  {
    question: "What happens when a Risk Register entry is marked with status 'ACCEPTED'?",
    shortAnswer: "The entry must contain a formal signed Risk Acceptance Memo from the CISO/Board, documented business justification, active compensatory controls, and a mandatory 12-month expiration date for re-evaluation.",
    explanation: "Marking a risk as 'ACCEPTED' does not remove it from the register. It remains permanently visible with an amber status, accompanied by an executive signature, compensatory isolation controls (e.g. VLAN segmentation), and an automated reminder trigger for review during the next annual management audit.",
    hint: "Accepted risks stay in the register with signed approval and an annual review alarm.",
    level: "moderate",
    codeExample: `// Accepted Risk Register Status:
Status:             ACCEPTED
Approved By:        CISO Sukanta Hui
Compensatory:       Isolated behind VLAN 100 with strict IPsec tunneling
Expiration Timer:   2027-08-23 (Automated 12-Month Re-evaluation Trigger)`
  },
  {
    question: "How do Governance, Risk, and Compliance (GRC) platforms automate Risk Register lifecycle management?",
    shortAnswer: "GRC platforms (e.g. ServiceNow, OneTrust, Archer) automatically ingest vulnerability scan data (Nessus/Qualys), map CVEs to risk register entries, trigger Jira remediation tickets, and re-calculate residual scores upon verified patch deployment.",
    explanation: "Modern enterprises avoid manual Excel spreadsheets. Automated GRC platforms continuously ingest real-time vulnerability feeds: when a critical CVE is detected on a server, a risk register entry is automatically generated, assigned to the sysadmin, and tracked against the 48-hour patch SLA. Once verified by a re-scan, the ticket closes automatically.",
    hint: "GRC tools connect automated scanners directly to the risk register and Jira tickets.",
    level: "moderate",
    codeExample: `// Automated GRC Pipeline:
Nessus Scan (Finds CVE-2026-99) ➔ Auto-creates Jira Ticket (Owner: Mamata, SLA: 48h) ➔
Patched & Re-scanned           ➔ Risk Register updates status to 'MITIGATED' & Residual to 1.2!`
  },
  {
    question: "Why is an Excel spreadsheet insufficient for enterprise Risk Register management in large organizations?",
    shortAnswer: "Spreadsheets lack audit trails, role-based access control, real-time vulnerability feed integration, automated SLA alerts, and multi-user concurrent editing, leading to version conflicts and stale data.",
    explanation: "Managing 500 microservices using static `.xlsx` files creates dangerous blind spots: multiple engineers overwrite each other's changes, there is no cryptographic proof of who modified a risk score, and no automated alerts notify CISOs when patch SLAs expire. Modern ISMS mandates centralized GRC databases with immutable audit logging.",
    hint: "Excel files have no version history, no automated alerts, and get outdated instantly.",
    level: "basic",
    codeExample: `// Limitations of Spreadsheet Risk Registers:
- No real-time integration with SIEM / Vulnerability Scanners
- Zero cryptographic audit trail (Anyone can delete or tamper with a risk score)
- No automated escalation emails when remediation SLAs expire`
  },
  {
    question: "Synthesizing Risk Registers and Residual Risk Management: what is the master equation of ISMS Risk Ledger Integrity?",
    shortAnswer: "$$\\text{Ledger Integrity} = \\frac{\\text{Register Coverage (100\\% Assets)} \\times \\text{Automated GRC Ingestion Frequency}}{\\sum (\\text{Residual Risk} - \\text{Appetite})^{+} + \\text{Overdue Remediation SLAs}} \\ge 1.0$$ with continuous ISO 27001 Clause 6.1.3 validation.",
    explanation: "This master governance relationship proves that an organization's risk management posture achieves maximum maturity when every information asset is cataloged in the dynamic risk register, automated scanners update threat vectors in real time, and all residual risks remain strictly below the board's risk appetite with zero overdue SLAs. This guarantees unshakeable audit defense and total statutory safe harbor.",
    hint: "Conclude by reviewing how 100% asset coverage and automated GRC tracking keep residual risk below appetite.",
    level: "expert",
    codeExample: `// Master Equation of Risk Register Governance:
Integrity = (Asset_Coverage * GRC_Sync_Frequency) / (Sum_Over_Appetite_Residuals + Overdue_SLAs);
Condition: Residual_Score <= Board_Risk_Appetite (<= 4.0);
Outcome:   100% Audit Conformance, Zero Overdue Remediation SLAs & Total Regulatory Safe Harbor!`
  }
];

export default questions;
