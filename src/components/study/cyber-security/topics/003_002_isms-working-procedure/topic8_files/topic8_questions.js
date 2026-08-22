const questions = [
  {
    question: "What is Continual Improvement in an ISMS under ISO/IEC 27001:2022 Clause 10, and why is an unmaintained ISMS fatal to enterprise security?",
    shortAnswer: "Continual improvement is the mandatory process of regularly evaluating and upgrading the suitability, adequacy, and effectiveness of the ISMS; an unmaintained ISMS rapidly decays due to emerging threat exploits, architectural drift, personnel turnover, and regulatory shifts.",
    explanation: "Achieving initial ISO 27001 certification is only day one. Cybersecurity is subject to organizational entropy: cloud architectures drift from baseline, developers introduce new microservices, threat actors develop zero-day bypasses, and new laws (such as India's DPDP Act 2023) emerge. Clause 10 requires formal mechanisms—KPI tracking, internal audits, and CAPA remediation—to guarantee that defenses continuously self-correct and evolve.",
    hint: "Think of maintaining an engine with regular oil changes and tune-ups rather than driving it until it explodes.",
    level: "basic",
    codeExample: `// ISMS Continual Improvement Loop:
[ Security KPIs (Clause 9.1) ] ➔ [ Internal Audits (Clause 9.2) ] ➔
[ Management Review (9.3) ]    ➔ [ 5-Whys CAPA Remediation (10.1) ] ➔ [ Upgraded Defenses ]`
  },
  {
    question: "What is the structure of the standard 3-Year ISO/IEC 27001 Certification and Surveillance Audit Cycle?",
    shortAnswer: "Year 0 (Initial Certification Audit: Stage 1 Documentation + Stage 2 Technical Audit); Year 1 (Surveillance Audit 1); Year 2 (Surveillance Audit 2); Year 3 (Full Comprehensive Recertification Audit).",
    explanation: "ISO 27001 certificates are valid for exactly 3 years, subject to annual surveillance: 1. Year 0 (Initial Certification): Stage 1 reviews documentation and scope; Stage 2 audits operational control effectiveness across all 93 controls; 2. Year 1 (Surveillance 1): External auditors review mandatory clauses (4-10), closed CAPAs, and a subset of Annex A controls; 3. Year 2 (Surveillance 2): Audits remaining Annex A controls, incident telemetry, and continual improvement; 4. Year 3 (Recertification): Full re-audit of the entire management system.",
    hint: "Remember: Initial Certification -> Year 1 Surveillance -> Year 2 Surveillance -> Year 3 Recertification.",
    level: "basic",
    codeExample: `// 3-Year ISO 27001 Audit Roadmap:
Year 0: Stage 1 (Doc Review) + Stage 2 (Deep Technical Audit) ➔ CERTIFIED (3-Year Validity)
Year 1: Surveillance Audit 1 (Mandatory Clauses + Closed CAPAs + Sample Controls)
Year 2: Surveillance Audit 2 (Remaining Annex A Controls + Metrics + Management Review)
Year 3: Recertification Audit (Full Re-Assessment across 100% of ISMS Scope)`
  },
  {
    question: "What are the five essential Security KPIs that an enterprise must monitor under ISO 27001 Clause 9.1?",
    shortAnswer: "1. Mean Time to Detect (MTTD) & Remediate (MTTR); 2. Critical Vulnerability Patch Velocity (CVSS >= 9.0 SLA); 3. Phish-Prone Failure Rate; 4. Privileged Access Review Compliance; 5. CAPA Non-Conformity Closure Rate.",
    explanation: "Under Clause 9.1, the organization must determine what shall be monitored, measured, and evaluated: 1. MTTD/MTTR: Speed of incident detection and containment; 2. Patch Velocity: Ensuring critical CVEs are patched within 48 hours; 3. Phish-Prone Percentage: Measuring human firewall susceptibility; 4. Access Reviews: 100% quarterly certification of privileged cloud and database credentials; 5. CAPA SLA: Closing internal and external audit findings within 90 days.",
    hint: "Think of tracking speed, vulnerability patching, phishing failure, access checks, and audit closures.",
    level: "moderate",
    codeExample: `// Enterprise ISMS KPI Telemetry:
- MTTD / MTTR:                MTTD = 12s | MTTR = 42s (Automated SOAR)
- Critical Patch Velocity:    100% of CVSS >= 9.0 patched within 48 Hours
- Phish-Prone Rate:           Dropped from 34.2% to 1.2% following SETA drills
- Privileged Access Review:   100% Certified Quarterly (Zero orphaned accounts)
- CAPA Closure Rate:          100% closed within 30 days (SLA: 90 days)`
  },
  {
    question: "What are the mandatory inputs and outputs of the Executive Management Review meeting under ISO 27001 Clause 9.3?",
    shortAnswer: "Mandatory Inputs: Status of past actions, changes in context/risks, audit results, security KPI telemetry, non-conformities/CAPAs; Mandatory Outputs: Executive decisions on improvement opportunities, policy updates, and capital resource/budget allocations.",
    explanation: "Clause 9.3 is where technical security data is converted into executive leadership decisions: 1. Mandatory Inputs: CISO presents internal audit findings, CERT-In incident metrics, DPDP Act compliance status, and emerging threats; 2. Mandatory Outputs: The Board of Directors evaluates the data, approves necessary policy revisions, and signs off on capital expenditure (e.g. allocating ₹25 Lakhs for automated DLP tooling).",
    hint: "Think of presenting the annual balance sheet to the board to receive next year's budget.",
    level: "moderate",
    codeExample: `// Management Review Minutes (Clause 9.3):
Inputs Presented:  12 Internal Audit Minor NCs, 0 P1 Breaches, DPDP Section 8 readiness report
Board Discussion:  Review of third-party cloud risks and developer phishing simulation metrics
Decisions (Output):Approved updated POL-SEC-08, allocated ₹18.5 Lakhs budget for CSPM and DLP tooling`
  },
  {
    question: "How does the '5-Whys' Root Cause Analysis methodology ensure that Corrective and Preventive Actions (CAPA) address systemic flaws under Clause 10.1?",
    shortAnswer: "The 5-Whys methodology peels away superficial symptoms by asking 'Why?' repeatedly until it uncovers the fundamental procedural, policy, or architectural failure, ensuring the corrective action prevents future recurrence.",
    explanation: "If an auditor discovers an unencrypted database snapshot, simply encrypting the snapshot is an immediate fix, not a preventive action. A 5-Whys analysis reveals why the snapshot was created unencrypted (e.g. lack of pre-commit CI/CD linting). The resulting CAPA implements an automated Terraform linter in the build pipeline, permanently eliminating the root cause across all future projects.",
    hint: "Fix the broken manufacturing process rather than throwing away a single defective bolt.",
    level: "moderate",
    codeExample: `// 5-Whys CAPA Architecture:
Symptom:           Unencrypted S3 backup discovered in audit
Why 1?             DevOps engineer created bucket via AWS CLI without encryption flag
Why 2?             No automated Infrastructure as Code (IaC) baseline was enforced
Why 3?             The project lacked automated pre-commit security linters
Why 4?             DevSecOps pipeline guidelines were not integrated into project onboarding
Why 5 (Root Cause):ISO 27001 Control A.8.28 (Secure Coding) lacked mandatory CI/CD enforcement gates!
CAPA Action:       Deployed AWS Service Control Policy (SCP) blocking unencrypted buckets permanently!`
  },
  {
    question: "What is 'Auditor Independence' during internal audits under ISO 27001 Clause 9.2, and why is self-auditing a Major Non-Conformity?",
    shortAnswer: "Auditor independence mandates that internal auditors must be objective and impartial; engineers and managers are strictly prohibited from auditing their own code, configurations, or operational departments.",
    explanation: "If the Lead Cloud Architect audits their own AWS environment, unconscious bias and conflict of interest will cause them to overlook known flaws. Under Clause 9.2, internal audits must be conducted by cross-functional independent staff (e.g. an IT auditor auditing HR, or an independent security specialist auditing DevOps) or an accredited third-party consulting firm to guarantee uncompromising objectivity.",
    hint: "Think of a student not being allowed to grade their own final exam paper.",
    level: "basic",
    codeExample: `// Auditor Independence Governance:
Violation (Major NC): DevOps Lead audits the Kubernetes cluster they personally configured!
Compliant Audit:      Independent Forensic Lead (Mahima) audits the Kubernetes cluster configured by Mamata;
                      Mamata audits Mahima's clinical PACS identity lifecycle (A.6.5)!`
  },
  {
    question: "What is 'Architectural Drift', and what automated maintenance tools prevent it between annual ISO 27001 surveillance audits?",
    shortAnswer: "Architectural drift is the gradual accumulation of unapproved manual changes, open ports, and shadow IT cloud resources that cause running production infrastructure to deviate from documented security baselines; prevented by Infrastructure as Code (IaC) and Cloud Security Posture Management (CSPM).",
    explanation: "In fast-paced agile environments, engineers make quick hotfixes or test temporary cloud instances. Over 12 months, the environment drifts far away from the baseline approved in the Statement of Applicability. Automated maintenance tools (e.g. Terraform drift detection, AWS Config, Prisma Cloud) scan infrastructure continuously, alerting or auto-remediating any configuration that violates CIS Benchmarks.",
    hint: "Think of an automated robotic surveyor that flags any unauthorized renovation to a building blueprint.",
    level: "moderate",
    codeExample: `// Automated Drift Remediation Pipeline:
Baseline Rule:   Control A.8.9 (Configuration Management) - All PostgreSQL databases must use AES-256 KMS
Drift Event:     Developer spins up unencrypted test database in production VPC
CSPM Detection:  AWS Config detects non-compliant resource in 1.4 seconds
Auto-Remediate:  AWS Lambda script enforces KMS encryption and notifies CISO on Signal!`
  },
  {
    question: "How does the Digital Personal Data Protection (DPDP) Act 2023 enforce continuous ISMS maintenance under Section 8?",
    shortAnswer: "Section 8(5) mandates that Data Fiduciaries must continuously maintain reasonable organizational and technical safeguards; treating security as a one-time setup leads to decayed protections and direct penalties up to ₹250 Crores under Section 33.",
    explanation: "Under the DPDP Act 2023, compliance is not a static certificate on a wall. If an organization suffered a personal data breach because it failed to perform quarterly access reviews or left a known vulnerability unpatched for 6 months, the Data Protection Board of India (DPBI) will classify the failure as willful maintenance negligence, triggering maximum statutory penalties.",
    hint: "Remember that Indian privacy law mandates continuous, active maintenance of data safeguards.",
    level: "basic",
    codeExample: `// DPDP Continuous Maintenance Defense:
Requirement:   DPDP Section 8(5) Continuous Reasonable Safeguards
Evidence:      1. Quarterly User Access Reviews (A.8.2)
               2. Weekly Automated Vulnerability Scans (A.8.8)
               3. Semi-annual Management Review Board Minutes (Clause 9.3)
Statutory Shield:Proves active due diligence -> Complete immunity from Section 33 fines!`
  },
  {
    question: "What is a 'Quarterly User Access Review' (Control A.8.2), and why is it a vital component of ISMS maintenance?",
    shortAnswer: "A quarterly access review requires department heads to formally review, certify, or revoke all user permissions, identifying orphaned accounts, privilege creep, and lingering contractor credentials before they can be exploited.",
    explanation: "As employees change roles or projects end, they accumulate excess permissions ('Privilege Creep'). Furthermore, departed contractors often remain active in secondary SaaS tools. A mandatory quarterly access certification workflow presents managers with a list of all active accounts; unverified accounts are automatically disabled after 14 days, maintaining strict least-privilege access across the enterprise.",
    hint: "Think of an annual inventory audit where every key to the building must be accounted for and verified.",
    level: "basic",
    codeExample: `// Automated Access Certification Workflow:
1. Trigger:    Quarterly Okta / Active Directory access review campaign dispatched to all managers
2. Review:     Engineering Lead reviews 45 developer accounts -> Identifies 3 departed contractors
3. Action:     Manager clicks 'Revoke' -> Accounts suspended within 60 seconds across all cloud consoles!`
  },
  {
    question: "What role does Threat Intelligence ingestion (ISO 27001:2022 Control A.5.7) play in continuous ISMS maintenance?",
    shortAnswer: "Control A.5.7 continuously ingests tactical, operational, and strategic threat feeds (STIX/TAXII, CERT-In advisories), allowing the ISMS to proactively update firewall rules and patch zero-day vulnerabilities before adversaries launch attacks.",
    explanation: "Defending only against yesterday's threats guarantees compromise tomorrow. Control A.5.7 establishes automated threat intelligence pipelines: 1. Tactical: Ingesting malicious IP and domain IOC feeds into SIEM/SOAR; 2. Operational: Tracking adversary TTPs mapped to MITRE ATT&CK; 3. Strategic: Reviewing CERT-In and sectoral advisory bulletins during monthly CISO reviews to update the Enterprise Risk Register.",
    hint: "Think of receiving daily weather radar updates to prepare for impending storms.",
    level: "moderate",
    codeExample: `// Threat Intel Ingestion Pipeline (Control A.5.7):
Feed:        CERT-In Vulnerability Advisory Bulletin CIVN-2026-0442
Threat:      Remote Code Execution flaw in OpenSSL 3.x
Maintenance: SOAR automatically triggers vulnerability scan across 500 payment nodes ->
             Identifies 4 vulnerable nodes -> Pushes automated patch in 45 minutes!`
  },
  {
    question: "What is the difference between a 'Corrective Action' and a 'Correction' during audit non-conformity triage?",
    shortAnswer: "A 'Correction' merely fixes the immediate symptom (e.g. deleting an unauthorized file); a 'Corrective Action' eliminates the underlying root cause (e.g. modifying IAM policies and deploying automated linters) to permanently prevent recurrence.",
    explanation: "Auditors frequently penalize organizations that confuse corrections with corrective actions. If an auditor finds an unmasked customer phone number on an employee screen: 1. Correction: Closing the screen or masking that single account; 2. Corrective Action: Modifying the PostgreSQL backend view with Dynamic Data Masking (A.8.11) so that all customer phone numbers are permanently masked for all non-admin roles.",
    hint: "Mopping up spilled water is a correction; fixing the leaky pipe is a corrective action.",
    level: "moderate",
    codeExample: `// Correction vs Corrective Action:
Correction:        "Revoked VPN access for departed employee Amit." (Fixes one user)
Corrective Action: "Integrated HRMS termination webhooks with Active Directory to automate account revocation within 15 minutes of resignation for all future employees." (Fixes the system!)`
  },
  {
    question: "How does an enterprise maintain continuous compliance under Section 85 of the Indian Information Technology Act 2000?",
    shortAnswer: "By maintaining documented proof of ongoing ISMS audits, quarterly access reviews, and Board Management Reviews, establishing that corporate Directors exercised continuous due diligence, protecting them from personal criminal liability.",
    explanation: "Under Section 85 of the IT Act, when a corporate entity commits a cyber offense, every person who was in charge of the business (Directors, CEO, CISO) is deemed guilty unless they prove the offense was committed without their knowledge or that they exercised all due diligence to prevent it. Documented continuous ISMS maintenance provides unassailable legal proof of ongoing executive due diligence.",
    hint: "Remember how continuous maintenance protects corporate directors from personal criminal liability.",
    level: "basic",
    codeExample: `// Section 85 Legal Due Diligence Artifacts:
1. Board-Approved Management Review Minutes (Clause 9.3)
2. Closed Internal Audit CAPA Reports (Clause 10.1)
3. Cryptographically Signed Section 65B SIEM Log Integrity Certificates
Outcome: Director criminal liability fully immunized under Indian IT Act Section 85!`
  },
  {
    question: "Synthesizing Continuous Improvement and ISMS Maintenance: what is the master equation of ISMS Longevity and Resilience?",
    shortAnswer: "$$\\text{ISMS Resilience Velocity} = \\frac{\\text{Audit Rigor} \\times \\text{KPI Tracking Precision} \\times \\text{CAPA Closure Velocity}}{\\text{Architectural Drift} + \\text{Un-remediated Non-Conformities}}$$ with annual surveillance audit verification.",
    explanation: "This master governance relationship proves that an ISMS remains healthy and resilient only when internal audits, objective KPI telemetry, and rapid CAPA root-cause closures outpace natural architectural drift and threat evolution. Maintaining this continuous maintenance velocity guarantees 100% surveillance audit success, zero regulatory penalties, and unbroken enterprise security.",
    hint: "Conclude by reviewing how the product of audit rigor, KPI tracking, and CAPA closures eliminates architectural drift.",
    level: "expert",
    codeExample: `// Master Equation of ISMS Longevity:
Longevity = (Audit_Rigor * KPI_Precision * CAPA_Closure_Speed) / (Architectural_Drift + Open_NCs);
Outcome: 100% Surveillance Audit Success, Zero Entropy Decay & Total Statutory Safe Harbor!`
  }
];

export default questions;
