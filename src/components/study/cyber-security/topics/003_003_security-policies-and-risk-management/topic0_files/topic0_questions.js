const questions = [
  {
    question: "What is the 4-tier hierarchy of security governance, and how do Policies, Standards, Procedures, and Guidelines differ in authority and scope?",
    shortAnswer: "Tier 1: Policies (Strategic executive intent, mandatory, Board-approved); Tier 2: Standards (Measurable technical baselines, mandatory, CISO-approved); Tier 3: Procedures/SOPs (Step-by-step chronological instructions, mandatory, Department-approved); Tier 4: Guidelines (Advisory best practices, discretionary).",
    explanation: "Effective cybersecurity governance requires a structured documentation hierarchy: 1. Policies (Tier 1): High-level statements answering *Why* and *What* (signed by the CEO/Board); 2. Standards (Tier 2): Quantifiable technical rules answering *What specific criteria* must be met (e.g. AES-256 encryption, 16-character passwords); 3. Procedures/SOPs (Tier 3): Chronological operational runbooks answering *How*, *When*, and *Who* executes tasks; 4. Guidelines (Tier 4): Advisory recommendations answering *How to optimize*.",
    hint: "Remember the pyramid from top to bottom: Policies ➔ Standards ➔ Procedures ➔ Guidelines.",
    level: "basic",
    codeExample: `// 4-Tier Security Governance Hierarchy:
[ Tier 1: POLICY ]    ➔ "All customer personal data must be strongly encrypted at rest and in transit." (Board Approved)
[ Tier 2: STANDARD ]  ➔ "Encryption algorithm MUST be AES-256-GCM; key rotation interval is 90 days." (CISO Approved)
[ Tier 3: PROCEDURE ] ➔ "Step 1: Open AWS KMS; Step 2: Create Customer Managed Key; Step 3: Attach IAM Policy."
[ Tier 4: GUIDELINE ] ➔ "Recommended best practices for developers writing Terraform crypto modules."`
  },
  {
    question: "What is an Information Security Policy (Tier 1), and why must it be signed by the Board of Directors or CEO under ISO/IEC 27001 Clause 5.2?",
    shortAnswer: "An Information Security Policy is the foundational executive constitution of enterprise security; board signature demonstrates executive leadership commitment (Clause 5.1), establishes legal accountability, and authorizes disciplinary action for non-compliance.",
    explanation: "A security policy cannot succeed as a grassroots IT suggestion. Under ISO 27001 Clause 5.2, top management must formally establish and endorse the policy. The board's signature ensures that security objectives align with business strategy, mandates budget allocation, requires adherence from 100% of employees, and empowers security teams to enforce compliance across all business units.",
    hint: "Think of the corporate constitution for cybersecurity signed by the nation's head of state.",
    level: "basic",
    codeExample: `// Information Security Policy Header (Clause 5.2):
Document Title:  Enterprise Information Security Policy (POL-SEC-01 v3.0)
Executive Sign-off: Board of Directors & Chief Executive Officer (CEO)
Scope:           All 500 Microservices, Cloud VPCs, and Corporate Staff
Mandate:         Zero Tolerance for Data Breaches + Annual Continual Improvement`
  },
  {
    question: "What is a Technical Security Standard (Tier 2), and how does it translate high-level policy into measurable technical configurations?",
    shortAnswer: "A Standard specifies non-negotiable, quantifiable parameters, protocols, key lengths, and baselines (e.g. TLS 1.3, AES-256, FIDO2 MFA, CIS Benchmarks) that technical systems and software must satisfy.",
    explanation: "Policies deliberately avoid mentioning software versions or specific command-line arguments to prevent policy obsolescence. Standards provide the exact technical specifications: 1. Cryptographic Standard: Enforces AES-256-GCM and SHA-256; 2. IAM Standard: Requires 16+ character passwords and hardware MFA; 3. Endpoint Standard: Dictates CIS Benchmark Level 2 hardening on all Linux/Windows production instances.",
    hint: "Policy is the law; Standard is the technical specification with numbers and algorithms.",
    level: "moderate",
    codeExample: `// Technical Security Standard (STD-CRYPTO-01):
1. Symmetric Cipher:      AES-256-GCM exclusively (DES, 3DES, RC4 strictly banned)
2. Asymmetric Key Length: RSA >= 4096 bits OR ECC secp256r1 / Ed25519
3. TLS Protocol Version:  TLS 1.3 mandatory across all public REST endpoints`
  },
  {
    question: "What is a Standard Operating Procedure (SOP / Tier 3), and why is chronological step-by-step clarity critical during a security incident?",
    shortAnswer: "An SOP is a mandatory, numbered runbook detailing exact sequential actions; during high-stress crises, it eliminates ambiguity, prevents panicked human error, and ensures rapid, consistent execution.",
    explanation: "During a major cybersecurity incident (like ransomware detonation or data exfiltration), SOC analysts and engineers cannot guess the next step. A Tier 3 SOP provides clear, chronological instructions: Step 1: Isolate affected host network interface; Step 2: Capture volatile memory (RAM); Step 3: Notify CISO; Step 4: Dispatch statutory notification to CERT-In within 6 hours under Section 70B.",
    hint: "Think of an airline pilot's emergency checklist during engine failure.",
    level: "basic",
    codeExample: `// Incident Response Runbook (SOP-SOC-02):
Step 1: Receive SIEM alert of unauthorized lateral movement (T+0m)
Step 2: Execute automated containment command: ` + "`aws ec2 stop-instances --instance-ids i-0abc123`" + ` (T+2m)
Step 3: Capture forensic disk snapshot with KMS encryption (T+5m)
Step 4: File statutory incident report with incident@cert-in.org.in within 6 hours (T+30m)`
  },
  {
    question: "What are Information Security Guidelines (Tier 4), and what makes them fundamentally different from Policies, Standards, and SOPs?",
    shortAnswer: "Guidelines are advisory, non-mandatory recommendations and best-practice suggestions; deviation from a guideline does not constitute an audit non-conformity or result in disciplinary action.",
    explanation: "While Tiers 1, 2, and 3 are strictly mandatory ('MUST'), Tier 4 Guidelines are discretionary ('SHOULD'). Examples include: 1. Remote Work Guidelines: Suggesting that employees use privacy screen filters in cafes; 2. Clean Desk Guidelines: Suggesting ergonomic desktop cable organizers; 3. Secure Coding Guidelines: Offering design patterns for writing efficient, sanitized Python functions.",
    hint: "Remember: Policies/Standards/SOPs are mandatory rules; Guidelines are helpful suggestions.",
    level: "moderate",
    codeExample: `// Advisory Security Guideline (GDL-REMOTE-01):
Recommendation: "Employees working remotely in public cafes in Kolkata SHOULD position screens away from windows and SHOULD avoid discussing confidential financial figures on voice calls."`
  },
  {
    question: "How does the 'Control of Documented Information' lifecycle under ISO/IEC 27001:2022 Clause 7.5 govern the creation and retirement of security policies?",
    shortAnswer: "Clause 7.5 requires formal document identification (unique ID, version), stakeholder review, authorized approval signatures, controlled distribution via secure portals, annual review cycles, and secure archiving of superseded policies.",
    explanation: "Organizations cannot allow un-versioned Word files to circulate via email. Under Clause 7.5: 1. Identification: Unique Document ID (e.g. POL-SEC-01), author, release date; 2. Approval: Signed by executive authority; 3. Access: Published on read-only intranet portals; 4. Revision Control: Change tables documenting exact modifications; 5. Retirement: Obsolete versions marked 'SUPERSEDED' and archived in encrypted vaults for statutory retention.",
    hint: "Think of tracking legal bills through drafting, legislative vote, enactment, and historical archiving.",
    level: "moderate",
    codeExample: `// ISO 27001 Document Control Header (Clause 7.5):
Document ID:     POL-SEC-01 (Enterprise Information Security Policy)
Version:         v3.2 (Approved by CISO Sukanta Hui on 2026-08-23)
Classification:  RESTRICTED - INTERNAL ENTERPRISE USE ONLY
Distribution:    Central Confluence Portal (Read-Only to all staff)
Next Review Date:2027-08-23 (Annual Mandatory Governance Cycle)`
  },
  {
    question: "How does a documented 4-tier security governance suite provide statutory Safe Harbor under Section 43A of the Indian IT Act 2000?",
    shortAnswer: "Producing an audited, board-approved documentation suite proves that the corporate entity instituted 'Reasonable Security Practices' (SPDI Rules 2011), completely defeating claims of organizational negligence in data breach lawsuits.",
    explanation: "In civil compensation lawsuits under Section 43A of the IT Act, victims must prove the company acted negligently. If the corporate entity produces timestamped, audited governance documents (Board-Approved Policy POL-01, Encryption Standard STD-04, and Incident SOP-02) showing rigorous adherence to ISO 27001, Indian courts hold that reasonable security practices were maintained, dismissing the liability claim.",
    hint: "Documented policies serve as primary legal defense exhibits in court.",
    level: "basic",
    codeExample: `// Judicial Defense Exhibit Suite:
Exhibit 1: Board-Signed Information Security Policy (POL-SEC-01)
Exhibit 2: Dynamic Data Masking Technical Standard (STD-DATA-04)
Exhibit 3: 6-Hour Incident Escalation SOP (SOP-INC-01)
Judicial Ruling: Corporate entity maintained certified reasonable security practices → Lawsuit dismissed!`
  },
  {
    question: "What documented policies and procedures are explicitly required under Section 8 of the Indian Digital Personal Data Protection (DPDP) Act 2023?",
    shortAnswer: "1. Data Protection & Privacy Policy; 2. Itemized Consent & Notice Procedure; 3. Data Principal Rights & Erasure SOP; 4. Data Protection Officer (DPO) Grievance Handling Procedure; 5. Incident Breach Notification SOP.",
    explanation: "Under Section 8 of the DPDP Act 2023, Data Fiduciaries must implement reasonable technical and organizational safeguards. Regulators require documented proof: 1. Itemized Consent Notice templates; 2. Data Principal Grievance Redressal SOP (72-hour response SLA); 3. Crypto-shredding and data erasure SOPs; 4. Breach notification playbooks to notify the Data Protection Board of India (DPBI) and affected Data Principals.",
    hint: "Remember the 5 mandatory DPDP documentation pillars: Privacy policy, consent logs, erasure SOP, DPO workflow, and breach notice.",
    level: "moderate",
    codeExample: `// DPDP Act Section 8 Document Register:
- POL-PRIV-01: Enterprise Personal Data Protection Policy
- SOP-DPO-02:  Data Principal Grievance & Erasure Workflow (< 72h SLA)
- STD-MASK-01: Dynamic Masking Standard on Aadhaar and Mobile Numbers
Statutory Shield: Complete immunity from ₹250 Crore Section 33 Penalties!`
  },
  {
    question: "What is an 'Acceptable Use Policy' (AUP - ISO 27001 Control A.5.10), and why must it be signed by every employee on their first day of work?",
    shortAnswer: "An AUP defines permitted and prohibited uses of corporate laptops, networks, emails, and cloud systems; mandatory signing creates a legally binding acknowledgment enabling disciplinary action or termination under Control A.6.4.",
    explanation: "If an employee downloads malicious software, uses corporate email for gambling, or transmits company data to personal Google Drive accounts, the company cannot discipline or terminate them without prior written notice. The AUP establishes explicit behavioral boundaries (e.g. no unauthorized USBs, no public ChatGPT data uploads, no credential sharing) that every worker acknowledges in writing.",
    hint: "Think of the corporate employee code of conduct for digital devices and networks.",
    level: "basic",
    codeExample: `// Acceptable Use Policy (AUP) Core Mandates:
1. Prohibited: Connecting unapproved USB storage devices to corporate laptops
2. Prohibited: Disabling endpoint EDR agents or local firewall filters
3. Prohibited: Pasting customer personal data or proprietary code into public AI tools
Acknowledgment: Digitally signed by employee on Day 1 via HRMS portal!`
  },
  {
    question: "What is 'Policy Drift', and what governance mechanism prevents corporate documentation from becoming obsolete?",
    shortAnswer: "Policy drift is the gradual divergence between documented rules and actual operational practices as technology evolves; prevented by mandatory annual reviews, trigger-based reviews upon major architectural changes, and internal audits.",
    explanation: "When cloud teams adopt microservices or Kubernetes while the documented policy still references physical on-premises servers, severe policy drift occurs. Under ISO 27001 Clause 9.2 (Internal Audit) and Clause 9.3 (Management Review), governance teams must conduct annual review audits, updating standards and SOPs whenever new platforms, tools, or laws (like DPDP Act 2023) are introduced.",
    hint: "Think of regularly updating traffic rules when self-driving cars enter the road.",
    level: "moderate",
    codeExample: `// Governance Drift Prevention Schedule:
1. Annual Review:      All Tier 1 Policies reviewed by CISO & Board every 12 months
2. Trigger-Based:      STD-CLOUD-01 updated within 14 days of migrating to AWS EKS
3. Audit Verification: Internal auditors sample 20 production configs against documented standards`
  },
  {
    question: "Why do external ISO 27001 Stage 1 auditors issue Major Non-Conformities for mixing Policies, Standards, and SOPs in a single document?",
    shortAnswer: "Mixing tiers creates governance paralysis: including low-level CLI commands in a board policy means any minor software upgrade requires board re-approval; conversely, missing technical standards leaves policies unenforceable.",
    explanation: "Auditors insist on modularity. If an organization writes `aws kms create-key --key-spec RSA_4096` inside a Board-Approved Information Security Policy (Tier 1), the document becomes obsolete the day the team switches to Elliptic Curve keys, requiring an emergency Board of Directors meeting. Modular documentation separates executive strategy (Tier 1) from technical specifications (Tier 2) and operational runbooks (Tier 3).",
    hint: "Keep the constitution separate from city building codes and plumber's manuals.",
    level: "expert",
    codeExample: `// Correct Modular Governance Architecture:
Tier 1 (Policy):    "All sensitive databases must use FIPS 140-3 validated cryptographic modules."
Tier 2 (Standard):  "Cryptographic keys must use AWS KMS Customer Managed Keys with AES-256-GCM."
Tier 3 (Procedure): "Run Terraform script ` + "`./deploy-kms.tf`" + ` to provision automated key rotation."`
  },
  {
    question: "What role does Employee Security Awareness Training (SETA - ISO 27001 Control A.6.3) play in operationalizing governance documentation?",
    shortAnswer: "SETA translates static written policies into daily employee behaviors through interactive training, simulated phishing campaigns, and clean desk enforcement, turning workers into an active 'Human Firewall'.",
    explanation: "A 200-page policy manual is useless if employees never read it. Control A.6.3 mandates ongoing education: 1. Onboarding Training: Mandatory review of the AUP; 2. Monthly Phishing Simulations: Testing employee vigilance; 3. Role-Based Training: Specialized DevSecOps training for software developers; 4. Awareness Metrics: Tracking phish-prone percentages during Management Reviews.",
    hint: "Think of fire drills that ensure everyone knows how to evacuate safely when the alarm rings.",
    level: "basic",
    codeExample: `// SETA Governance Integration (Control A.6.3):
Onboarding:  30-Minute interactive module explaining AUP and password policies
Simulation:  Monthly unannounced simulated spear-phishing emails sent to all 250 staff
Metric:      Phish-prone failure rate dropped from 32.4% to 1.1% following training!`
  },
  {
    question: "Synthesizing the Hierarchy of Security Governance: what is the master equation of Governance Integrity and Operational Resilience?",
    shortAnswer: "$$\\text{Governance Resilience} = \\frac{\\text{Policy Authority (Tier 1)} \\times \\text{Standard Rigor (Tier 2)} \\times \\text{SOP Conformance (Tier 3)}}{\\text{Policy Drift} + \\text{Un-approved Exceptions}}$$ with annual Clause 7.5 document control verification.",
    explanation: "This master governance relationship proves that enterprise cybersecurity resilience is the product of top-down board authority, rigorous quantifiable technical standards, and disciplined operational SOP execution. Eliminating policy drift and un-approved exceptions guarantees 100% audit certification, organizational consistency, and unshakeable statutory safe harbor under global and Indian cyber laws.",
    hint: "Conclude by reviewing how the product of Policies, Standards, and SOPs eliminates compliance gaps.",
    level: "expert",
    codeExample: `// Master Equation of Governance Integrity:
Resilience = (Policy_Authority * Standard_Rigor * SOP_Execution) / (Policy_Drift + Exceptions);
Outcome: 100% Audit Conformance, Flawless Operational Discipline & Total Statutory Safe Harbor!`
  }
];

export default questions;
