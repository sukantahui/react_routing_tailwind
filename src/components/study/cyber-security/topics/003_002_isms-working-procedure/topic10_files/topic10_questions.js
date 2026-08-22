const questions = [
  {
    question: "What is the 4-tier documentation hierarchy in an Information Security Management System (ISMS), and how do the tiers differ in authority and purpose?",
    shortAnswer: "The 4 tiers are: Tier 1 (Policies - Executive Strategy, Mandatory); Tier 2 (Standards - Measurable Technical Baselines, Mandatory); Tier 3 (Procedures/SOPs - Step-by-Step Workflows, Mandatory); Tier 4 (Guidelines - Advisory Best Practices, Discretionary).",
    explanation: "Effective governance requires structured documentation: 1. Tier 1 (Policies): High-level statements of executive intent answering *Why* and *What* (signed by the Board/CEO); 2. Tier 2 (Standards): Quantifiable technical rules answering *What specific criteria* must be met (e.g. AES-256 encryption, 16-character passwords); 3. Tier 3 (Procedures/SOPs): Chronological step-by-step runbooks answering *How*, *When*, and *Who* executes tasks; 4. Tier 4 (Guidelines): Advisory recommendations answering *How to optimize*.",
    hint: "Remember the pyramid from top to bottom: Policies ➔ Standards ➔ Procedures ➔ Guidelines.",
    level: "basic",
    codeExample: `// 4-Tier ISMS Documentation Pyramid:
[ Tier 1: POLICIES ]   ➔ "All sensitive personal data must be strongly encrypted." (Board Approved)
[ Tier 2: STANDARDS ]  ➔ "Encryption algorithm MUST be AES-256-GCM with AWS KMS HSM keys."
[ Tier 3: PROCEDURES ] ➔ "Step 1: Open AWS Console; Step 2: Select KMS Key; Step 3: Enable Auto-Rotation."
[ Tier 4: GUIDELINES ] ➔ "Recommended best practices for developers writing Terraform crypto modules."`
  },
  {
    question: "What is an Information Security Policy (Tier 1), and what are its mandatory elements under ISO/IEC 27001:2022 Clause 5.2?",
    shortAnswer: "An Information Security Policy is a top-tier executive governance document signed by the Board of Directors/CEO that establishes management commitment, aligns security with business objectives, commits to satisfying statutory legal requirements, and commits to continual improvement.",
    explanation: "Under Clause 5.2, top management must establish an information security policy that: 1. Is appropriate to the purpose of the organization; 2. Includes information security objectives or provides the framework for setting them; 3. Includes a commitment to satisfy applicable legal/regulatory requirements (such as the Indian DPDP Act 2023); 4. Includes a commitment to continual improvement of the ISMS; 5. Is available as documented information, communicated within the organization, and available to interested parties.",
    hint: "Think of the corporate constitution for cybersecurity signed by the CEO.",
    level: "basic",
    codeExample: `// Information Security Policy Header (Clause 5.2):
Document Title:  Enterprise Information Security Policy (POL-SEC-01 v3.0)
Approval:        Board of Directors & Chief Executive Officer (CEO)
Scope:           All 500 Payment Microservices, Cloud VPCs, and Corporate Employees
Commitment:      Zero Tolerance for DPDP Violations + Annual Continual Improvement Mandate`
  },
  {
    question: "What is an Information Security Standard (Tier 2), and how does it differ from a Policy?",
    shortAnswer: "A Policy states high-level mandatory intent (e.g. 'Use strong cryptography'); a Standard defines exact, measurable, non-negotiable technical parameters and configurations (e.g. 'AES-256-GCM, TLS 1.3, and SHA-256').",
    explanation: "Policies are intentionally written at a high level so they do not require board re-approval every time a software patch is released. Standards provide the granular, quantifiable technical baselines: 1. Cryptographic Standard: Dictating exact cipher suites (AES-256-GCM, ECDSA P-384); 2. Password & IAM Standard: Specifying exact character length (>= 16 chars) and mandatory FIDO2 hardware tokens; 3. Hardening Standard: Enforcing CIS Benchmarks across all Linux/Windows server baselines.",
    hint: "Policy is the law; Standard is the exact technical specification with numbers and algorithms.",
    level: "moderate",
    codeExample: `// Tier 2 Technical Standard (STD-CRYPTO-01):
1. Symmetric Encryption:   AES-256-GCM exclusively (DES, 3DES, and RC4 strictly forbidden)
2. Asymmetric Key Length:  RSA >= 4096 bits OR ECC curve secp256r1 / Ed25519
3. Hash Functions:         SHA-256 or SHA-3 (MD5 and SHA-1 strictly banned across all systems)`
  },
  {
    question: "What is a Standard Operating Procedure (SOP / Tier 3), and why must it be written with chronological step-by-step clarity?",
    shortAnswer: "An SOP is a mandatory, sequential runbook detailing the exact chronological actions an engineer or analyst must execute to perform an operational security task safely, consistently, and without ambiguity.",
    explanation: "During high-stress crises (such as an active ransomware attack or an employee termination), staff cannot rely on memory. A Tier 3 SOP provides numbered, repeatable steps: 1. Inputs required; 2. Chronological actions (e.g. Step 1: Execute `aws iam deactivate-mfa-device`; Step 2: Revoke VPN certificate); 3. Expected outputs; 4. Escalation triggers if a step fails; 5. Mandatory logging and evidence preservation under Section 65B.",
    hint: "Think of an airline pilot's pre-flight checklist: step 1, step 2, step 3.",
    level: "basic",
    codeExample: `// Tier 3 SOP: Emergency Joiner-Mover-Leaver Offboarding (SOP-HR-04):
Step 1: Receive HRMS Termination Webhook ticket (Timestamp: T+0m)
Step 2: Execute automated PowerShell script: ./Revoke-AllAccess.ps1 -User "amit.k" (T+2m)
Step 3: Revoke AWS IAM console access and rotate API access keys (T+5m)
Step 4: Suspend OpenVPN profile and revoke 802.1X Wi-Fi certificate (T+8m)
Step 5: Sign digital offboarding audit manifest for ISO 27001 auditor review (T+12m)`
  },
  {
    question: "What are Information Security Guidelines (Tier 4), and how do they differ from Policies, Standards, and Procedures?",
    shortAnswer: "Guidelines are advisory, non-mandatory recommendations and best practices that provide guidance on how to achieve security objectives without imposing rigid penalties for deviation.",
    explanation: "While Tiers 1, 2, and 3 are strictly mandatory, Tier 4 Guidelines offer discretionary advice. For example: 1. Remote Work Guidelines: Recommending that employees position home workstations away from windows and use privacy filters in coffee shops; 2. Clean Desk Guidelines: Suggesting ergonomic drawer organizers for confidential file storage; 3. Secure Coding Guidelines: Providing architectural tips for writing efficient, sanitized Python queries.",
    hint: "Remember: Policies, Standards, and SOPs are 'MUST'; Guidelines are 'SHOULD / RECOMMENDED'.",
    level: "moderate",
    codeExample: `// Tier 4 Advisory Guideline (GDL-REMOTE-01):
Recommendation: "When working from public cafes in Kolkata, employees SHOULD attach polarized privacy filters to laptop displays and avoid discussing confidential financial figures over unencrypted cellular calls."`
  },
  {
    question: "What are the mandatory requirements for 'Control of Documented Information' under ISO/IEC 27001:2022 Clause 7.5?",
    shortAnswer: "Clause 7.5 mandates formal controls for document creation, identification, format review/approval, controlled distribution, secure access, retrieval, storage/preservation, version control, and lawful retention schedules.",
    explanation: "Organizations cannot maintain un-versioned, untracked Word documents on random employee desktops. Under Clause 7.5: 1. Identification: Every document must have a unique ID, title, date, author, and version history; 2. Format: Legible, controlled PDF with classification banners; 3. Approval: Formally approved by authorized management before release; 4. Access: Controlled distribution via secure Intranet with read-only permissions; 5. Retention: Maintained for statutory durations (e.g. 180-day logs under IT Act Section 70B).",
    hint: "Remember: Unique ID, version history, management approval, controlled access, and retention schedules.",
    level: "moderate",
    codeExample: `// Compliant ISO 27001 Document Control Block (Clause 7.5):
Document ID:     POL-SEC-08 (Cryptographic & Data Masking Standard)
Version:         v2.4 (Approved by CISO Sukanta Hui on 2026-08-23)
Classification:  RESTRICTED - INTERNAL USE ONLY
Distribution:    Published on Central Confluence ISMS Portal (Read-Only to Staff)
Next Review Date:2027-08-23 (Annual Mandatory Maintenance Cycle)`
  },
  {
    question: "How does documented ISMS information establish conclusive judicial proof of 'Reasonable Security Practices' under Section 43A of the Indian IT Act 2000?",
    shortAnswer: "Producing an audited, version-controlled 4-tier documentation suite proves that the corporate entity instituted formal governance, technical standards, and operational procedures, completely immunizing the enterprise in data breach compensation lawsuits.",
    explanation: "In civil litigation under Section 43A and the SPDI Rules 2011, judges demand proof of corporate due diligence. Producing an audited documentation suite (Board-Approved Policy POL-01, Technical Encryption Standard STD-04, and Incident SOP-02) with timestamped approval records proves that the enterprise exercised reasonable care and was not criminally or civilly negligent.",
    hint: "Remember that documented policies and SOPs serve as primary defense exhibits in Indian courts.",
    level: "basic",
    codeExample: `// Judicial Defense via Documented ISMS Suite:
Defense Exhibit A: Board-Signed Information Security Policy (POL-SEC-01)
Defense Exhibit B: PostgreSQL Dynamic Data Masking Technical Standard (STD-DATA-04)
Defense Exhibit C: 6-Hour Incident Response Escalation SOP (SOP-INC-01)
Judicial Ruling:   Corporate entity maintained verified reasonable security practices -> Lawsuit dismissed!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, what specific documented records must be maintained under Section 8?",
    shortAnswer: "1. Itemized Consent Registers & Notices; 2. Data Principal Grievance Redressal Logs; 3. Data Protection Impact Assessments (DPIA); 4. Data Protection Officer (DPO) Audit Records; 5. Information Deletion & Crypto-Shredding Certificates.",
    explanation: "The DPDP Act 2023 mandates accountability. Under Section 8, a Data Fiduciary must be able to prove compliance to the Data Protection Board of India (DPBI) by producing documented records: 1. Itemized Consent Notices: Proving consent was free, specific, and informed; 2. Erasure Records: Documenting permanent deletion of citizen data after purpose completion; 3. DPO Governance Logs: Proving regular independent privacy audits.",
    hint: "Remember the 5 privacy records: Consent logs, grievance logs, DPIAs, DPO records, and deletion manifests.",
    level: "moderate",
    codeExample: `// DPDP Section 8 Documented Information Stack:
- REC-DPDP-01: Citizen Itemized Consent & Withdrawal Log (80,000 active records)
- REC-DPDP-02: Data Principal Erasure & Crypto-Shredding Manifest (Control A.8.10)
- REC-DPDP-03: Quarterly DPO Independent Privacy Assessment Report`
  },
  {
    question: "What is 'Version Control & Change History' in document governance, and why do auditors reject documents lacking approval logs?",
    shortAnswer: "Version control tracks every revision with exact change descriptions, dates, authors, and executive approval signatures; auditors reject documents without change logs because there is no proof of authorized governance or currency.",
    explanation: "If an auditor asks for the Access Control Policy and is handed a document that says 'Draft v1.0' with no approval signature or date, the auditor will issue a Major Non-Conformity under Clause 7.5. A compliant document control block includes: 1. Semantic Versioning (v1.0 initial, v1.1 minor tweak, v2.0 major overhaul); 2. Summary of Changes; 3. Formal Management Approval Name & Signature.",
    hint: "Think of software git commits: who changed what, when, and who approved the pull request.",
    level: "basic",
    codeExample: `// Document Revision Table (Clause 7.5.2):
| Version | Release Date | Author       | Approver      | Summary of Changes Recorded                  |
|---------|--------------|--------------|---------------|----------------------------------------------|
| v1.0    | 2024-01-10   | Mamata       | CISO          | Initial ISO 27001:2013 baseline release      |
| v2.0    | 2025-06-15   | Mamata       | CISO / Board  | Upgraded for ISO 27001:2022 (Added 11 controls)|
| v2.1    | 2026-08-23   | Mahima       | CISO Office   | Added DPDP Act 2023 Section 8 Masking Rules  |`
  },
  {
    question: "What is an 'Acceptable Use Policy' (AUP - ISO 27001 Control A.5.10), and why must every employee sign it during onboarding?",
    shortAnswer: "An AUP defines permitted and prohibited uses of corporate computing assets, networks, and communication channels; employee signature establishes legal acknowledgment and enables disciplinary enforcement under Control A.6.4.",
    explanation: "If an employee uses a corporate laptop to mine cryptocurrency or download pirated torrents, the enterprise cannot discipline or terminate them unless they formally agreed to documented rules. The AUP explicitly prohibits: unauthorized software installation, sharing passwords, accessing pirated content, and storing company data on personal cloud drives.",
    hint: "Think of the corporate code of conduct for laptops, internet, and emails.",
    level: "basic",
    codeExample: `// Acceptable Use Policy (AUP - Control A.5.10):
Prohibited Actions:
1. Connecting unauthorized USB mass storage devices without CISO approval
2. Disabling antivirus / EDR endpoint security agents
3. Transmitting company source code to public generative AI tools (ChatGPT)
Acknowledgment: Employee digitally signs AUP on Day 1 of employment!`
  },
  {
    question: "What is the 'Document Retirement and Secure Deletion' procedure for obsolete security policies under Clause 7.5.3?",
    shortAnswer: "Obsolete policies must be marked 'SUPERSEDED / OBSOLETE', removed from active portals to prevent accidental application, archived in an encrypted historical repository for statutory durations, and permanently destroyed after retention expiry.",
    explanation: "If employees continue following an obsolete 2018 password policy that allows 6-character passwords, the organization is severely compromised. Under Clause 7.5.3: 1. Obsolete documents must be watermarked as 'SUPERSEDED'; 2. They must be removed from the active Intranet; 3. One historical copy is retained in the legal archive for compliance history (e.g. 5-7 years); 4. Expired drafts are securely shredded.",
    hint: "Think of retiring an old law: removing it from active books while keeping a historical copy in the legal archives.",
    level: "moderate",
    codeExample: `// Document Retirement Workflow:
Active Action:   Publish POL-SEC-01 v3.0 on Central Intranet Portal
Archive Action:  Move POL-SEC-01 v2.0 to Legal Historical Archive with watermark: "SUPERSEDED ON 2026-08-23"
Retention:       Retained for 5 years for ISO auditor and judicial dispute inspection`
  },
  {
    question: "Why must documented procedures (SOPs) be tested in practice before external Stage 2 certification audits?",
    shortAnswer: "Auditors perform 'walkthrough tests' by interviewing frontline staff; if an SOP exists on paper but engineers execute a completely different manual process, the auditor will issue a Major Non-Conformity for process deviation.",
    explanation: "Documentation must reflect operational reality ('Say what you do, and do what you say'). If the documented Backup SOP states that tapes are shipped to an offsite vault weekly, but the auditor discovers tapes sitting on a desk in the server room, the finding is a direct violation of Clause 8.1. All SOPs must be tested and practiced by operations staff before audits.",
    hint: "Make sure your written recipe matches the actual steps your chefs take in the kitchen.",
    level: "moderate",
    codeExample: `// Operational Walkthrough Audit Test:
Documented SOP:  "SOP-IAM-02 states that developer SSH keys are rotated every 90 days."
Auditor Test:    Auditor samples 10 developer SSH keys on production servers.
Result:          All 10 keys rotated within the last 45 days ➔ 100% OPERATIONAL CONFORMANCE!`
  },
  {
    question: "Synthesizing ISMS Documentation: Policies, Standards, Guidelines, and Procedures: what is the master equation of Documentation Integrity?",
    shortAnswer: "$$\\text{Documentation Integrity} = \\frac{\\text{Policy Alignment (Tier 1)} \\times \\text{Technical Standard Rigor (Tier 2)} \\times \\text{SOP Conformance (Tier 3)}}{\\text{Document Obsolescence} + \\text{Un-approved Deviations}}$$ with annual Clause 7.5 review verification.",
    explanation: "This master governance relationship proves that an ISMS documentation hierarchy is a unified, verifiable operational blueprint. Aligning executive policies with rigorous technical standards and executing flawless step-by-step SOPs eliminates procedural drift, guarantees 100% audit certification, and establishes total statutory safe harbor under global and Indian cyber laws.",
    hint: "Conclude by reviewing how the synergy of Policies, Standards, and SOPs eliminates compliance gaps.",
    level: "expert",
    codeExample: `// Master Equation of Documentation Integrity:
Integrity = (Policy_Alignment * Standard_Rigor * SOP_Execution) / (Obsolescence + Process_Deviations);
Outcome: 100% Audit Conformance, Flawless Operational Consistency & Total Statutory Safe Harbor!`
  }
];

export default questions;
