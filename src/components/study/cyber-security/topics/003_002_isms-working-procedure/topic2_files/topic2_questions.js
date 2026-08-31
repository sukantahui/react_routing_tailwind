const questions = [
  {
    question: "What is the Plan-Do-Check-Act (PDCA) Deming Cycle, and why is static cybersecurity management guaranteed to fail without it?",
    shortAnswer: "The PDCA cycle is a four-phase iterative management methodology (Plan ➔ Do ➔ Check ➔ Act) that drives continuous improvement; static security fails because threat actor techniques, cloud architectures, and legal regulations constantly evolve.",
    explanation: "Cybersecurity is not a one-time project with a fixed finish line. Attackers constantly develop new exploits, cloud environments experience configuration drift, and new laws (like India's DPDP Act 2023) are enacted. The PDCA cycle ensures the ISMS is a living organism: Plan establishes objectives and assesses risks; Do executes controls; Check evaluates metrics and internal audits; Act fixes non-conformities and upgrades defenses for the next cycle.",
    hint: "Think of keeping a ship on course across an ocean with shifting winds and currents.",
    level: "basic",
    codeExample: `// The 4 Continuous PDCA Phases:
[ PLAN ]  ➔ Risk Assessment, SoA Authoring, Policy Formulation (Clauses 4-7)
[ DO ]    ➔ Deploy AES-256, MFA, 24/7 SOC, Employee Training (Clause 8 & Annex A)
[ CHECK ] ➔ Internal Audits, KPI Metrics, Board Management Review (Clause 9)
[ ACT ]   ➔ 5-Whys Root Cause Analysis, CAPA Remediation, Upgrading Controls (Clause 10)`
  },
  {
    question: "Which ISO/IEC 27001:2022 clauses map directly to the 'PLAN' phase of the ISMS lifecycle?",
    shortAnswer: "Clauses 4 (Context), 5 (Leadership), 6 (Planning & Risk Assessment), and 7 (Support & Resources).",
    explanation: "The PLAN phase establishes the foundation of the ISMS: 1. Clause 4: Defining the scope and understanding external/internal issues and interested parties; 2. Clause 5: Securing top management commitment, signing the security policy, and appointing the CISO; 3. Clause 6: Performing risk assessments, evaluating risk criteria, and authoring the Statement of Applicability (SoA); 4. Clause 7: Allocating budget, verifying staff competence, and designing the awareness program.",
    hint: "Remember the 4 planning clauses: Context, Leadership, Risk Planning, and Support.",
    level: "basic",
    codeExample: `// PLAN Phase Deliverables:
- ISMS Scope Document (Clause 4.3)
- Signed Information Security Policy (Clause 5.2)
- Enterprise Risk Register & Treatment Plan (Clause 6.1.2)
- Statement of Applicability (SoA) covering all 93 Annex A controls (Clause 6.1.3)`
  },
  {
    question: "What activities and deliverables characterize the 'DO' phase of the ISMS lifecycle?",
    shortAnswer: "Implementing and operating the operational security controls defined in the Risk Treatment Plan (Clause 8 and Annex A), conducting employee training (SETA), and managing daily security operations.",
    explanation: "The DO phase is where planned policies are translated into technical and operational reality: 1. Deploying technical controls: AES-256-GCM encryption, FIDO2 MFA, firewalls, and DLP agents; 2. Conducting human training: Role-based training and unannounced phishing simulations; 3. Operational procedures: Change management, access provisioning, and 24/7 SOC telemetry monitoring; 4. Vendor risk management: Enforcing third-party security SLAs.",
    hint: "Think of the DO phase as daily engineering and security operations.",
    level: "moderate",
    codeExample: `// DO Phase Operational Execution:
1. Hardening:  Deploy CIS Benchmarks via Terraform (Control A.8.9)
2. Identity:   Enforce FIDO2 Hardware MFA on all cloud consoles (Control A.8.5)
3. Operations: 24/7 SIEM monitoring with automated 6-hour CERT-In escalation playbooks`
  },
  {
    question: "What are the core evaluation mechanisms executed during the 'CHECK' phase of an ISMS?",
    shortAnswer: "1. Monitoring and measuring security KPIs (MTTR, MTTD, Phish-Prone rate); 2. Conducting scheduled first-party Internal Audits (Clause 9.2); 3. Convening the annual Executive Management Review (Clause 9.3).",
    explanation: "The CHECK phase provides objective measurement of ISMS health: 1. KPI Measurement (9.1): Tracking telemetry such as average time to patch critical CVEs and phishing drill failure rates; 2. Internal Audits (9.2): Independent auditors review control effectiveness against ISO 27001 requirements; 3. Management Review (9.3): Top executives review audit non-conformities, incidents, and statutory compliance status.",
    hint: "Remember the 3 Check pillars: KPI metrics, internal audits, and executive board reviews.",
    level: "basic",
    codeExample: `// CHECK Phase Evaluation Matrix:
- Security Telemetry: MTTD = 14 Seconds | MTTR = 42 Seconds
- Internal Audit:     Audit completed across 500 payment nodes → 4 Minor NCs identified
- Management Review:  Board reviews audit findings, allocates ₹15 Lakhs for automated DLP tooling`
  },
  {
    question: "What is the 'ACT' phase, and how does it prevent the recurrence of security non-conformities?",
    shortAnswer: "The ACT phase executes Corrective and Preventive Actions (CAPA) under Clause 10: conducting 5-Whys root cause analysis for identified flaws, fixing the systemic weakness, and feeding lessons learned back into the PLAN phase.",
    explanation: "The ACT phase closes the feedback loop. When an internal audit finding, penetration testing vulnerability, or real security incident occurs: 1. Immediate Containment: Stopping the immediate threat; 2. Root Cause Analysis (RCA): Using the 5-Whys methodology to find why the control failed; 3. Corrective Action: Fixing the specific vulnerability; 4. Preventive Action: Modifying policies or CI/CD pipelines so the flaw can never happen again.",
    hint: "Think of finding a leak, finding out why the pipe rusted, and replacing the plumbing with rust-proof titanium.",
    level: "moderate",
    codeExample: `// ACT Phase CAPA Lifecycle:
Finding:           NC-08: Unencrypted S3 bucket found storing customer KYC documents
Root Cause:        Junior DevOps engineer lacked Terraform template validation check
Corrective Action: Encrypted bucket with AWS KMS AES-256 immediately
Preventive Action: Implemented Pre-Commit CI/CD linter blocking any unencrypted Terraform commit!`
  },
  {
    question: "What is the '5-Whys' Root Cause Analysis (RCA) methodology, and how is it applied in ISMS CAPA investigations?",
    shortAnswer: "The 5-Whys methodology repeatedly asks 'Why?' (typically 5 times) to peel away superficial symptoms and identify the fundamental systemic or procedural failure behind a security incident.",
    explanation: "Stopping at the first explanation only addresses symptoms. In a 5-Whys investigation: 1. Why did the database leak? (An S3 bucket was public); 2. Why was it public? (A developer changed bucket policy for testing); 3. Why did they test in production? (Development environment lacked sample data); 4. Why did it lack sample data? (No automated data generation pipeline existed); 5. Why? (No budget was allocated for synthetic test data). The root cause is a lack of synthetic test data pipelines, not developer incompetence.",
    hint: "Keep asking 'Why?' until you reach the root policy or architectural flaw.",
    level: "moderate",
    codeExample: `// 5-Whys RCA Example:
Finding: Production Database Snapshot Leaked Online
Why 1? Bucket permissions set to 'Public'.
Why 2? Engineer needed to share data with offshore QA contractor.
Why 3? Enterprise lacked a secure B2B API gateway for third-party testing.
Why 4? Third-party data access policy was not defined in the ISMS.
Why 5? (ROOT CAUSE): Vendor Risk Management policy (A.5.19) was missing operational procedures!`
  },
  {
    question: "How does the PDCA cycle dynamically respond to new statutory laws like the Indian Digital Personal Data Protection (DPDP) Act 2023?",
    shortAnswer: "New statutory regulations enter as external triggers into the PLAN phase: triggering gap analyses, updating the Statement of Applicability (SoA) with privacy controls, deploying data masking in DO, auditing compliance in CHECK, and closing gaps in ACT.",
    explanation: "When Parliament enacted the DPDP Act 2023 with ₹250 Crore penalties: 1. PLAN: The ISMS context (Clause 4.1) was updated, identifying new legal obligations under Section 8; 2. DO: Technical controls like A.8.10 (Information Deletion) and A.8.11 (Data Masking) were deployed; 3. CHECK: Internal audits evaluated consent records and storage limitation compliance; 4. ACT: Gaps in third-party vendor contracts were remediated.",
    hint: "Trace how a new law moves from Plan to Do to Check to Act.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Ingestion into PDCA:
[ PLAN: Review DPDP Sec 33 ₹250 Cr Risk ] ➔ [ DO: Deploy AES-256 Masking & DPO ] ➔
[ CHECK: Audit 80,000 Consent Records ]   ➔ [ ACT: Remediate 3 Vendor Privacy Contracts ]`
  },
  {
    question: "What is the difference between a 'Major Non-Conformity' and a 'Minor Non-Conformity' during an ISO 27001 Stage 2 certification audit?",
    shortAnswer: "A Major Non-Conformity is a total breakdown or absence of a mandatory ISO 27001 requirement that blocks certification; a Minor Non-Conformity is an isolated, non-systemic lapse that allows conditional certification upon submitting a CAPA plan.",
    explanation: "1. Major Non-Conformity (Major NC): A systemic failure (e.g. no internal audits were conducted, top management never signed the security policy, or customer passwords are stored in plaintext). A Major NC prevents ISO 27001 certification until a full re-audit is passed; 2. Minor Non-Conformity (Minor NC): An isolated incident (e.g. 2 out of 100 laptops lacked the latest antivirus definition or one training record was missing). Certification is granted provided a formal CAPA plan is approved within 90 days.",
    hint: "Contrast a total system collapse (Major) with an isolated clerical oversight (Minor).",
    level: "expert",
    codeExample: `// Audit Findings Classification:
Major NC: "Enterprise has no documented Risk Assessment methodology (Clause 6.1.2)." → CERTIFICATION BLOCKED!
Minor NC: "1 of 500 servers had clock drift of 4 seconds against IST NTP server."        → CERTIFIED WITH CAPA PLAN!`
  },
  {
    question: "How does an ISMS maintain unbroken 'Audit Trail Integrity' during the CHECK phase under Section 65B of the Indian Evidence Act?",
    shortAnswer: "By generating cryptographic SHA-256 hashes for all SIEM audit logs at the time of creation, storing logs in immutable WORM storage, and issuing signed Section 65B Certificates for court readiness.",
    explanation: "During internal and external audits, audit evidence must be verifiable. Under Section 65B of the Indian Evidence Act / Bharatiya Sakshya Adhiniyam, digital logs are legally admissible only if accompanied by a certificate signed by the lawful custodian certifying device operating health and cryptographic hash integrity, proving that telemetry has not been tampered with or retroactively altered.",
    hint: "Remember the combination of SHA-256 hashing, immutable WORM storage, and signed 65B certificates.",
    level: "basic",
    codeExample: `// Section 65B Audit Trail Certificate:
Evidence:     siem_access_telemetry_2026.log
Timestamp:    2026-08-23T02:00:00 IST (Synchronized with NPL NTP Server)
SHA-256 Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Custodian:    Sukanta Hui (Lead CISO Office - Certified Forensic Custodian)`
  },
  {
    question: "Why is the annual Executive Management Review (Clause 9.3) the vital linchpin connecting CHECK and ACT?",
    shortAnswer: "Management Review presents audit findings, security KPIs, and statutory risks directly to the Board of Directors, securing executive approval and financial budget for the CAPA improvements executed in ACT.",
    explanation: "Security teams cannot unilaterally purchase expensive tools or re-architect core systems without executive sponsorship. The Management Review meeting (Clause 9.3) is where the CISO presents the objective results of the CHECK phase (audit findings, incident trends, DPDP compliance status) to the CEO and Board. The Board reviews the data, signs off on policy changes, and allocates the capital expenditure required to fund the ACT phase.",
    hint: "Think of presenting the annual financial audit to shareholders to get budget for the new factory.",
    level: "moderate",
    codeExample: `// Executive Management Review Agenda (Clause 9.3):
1. Review of closed vs open CAPAs from 2026 internal audits
2. Incident Telemetry: 100% of P1 incidents reported to CERT-In within 6 hours
3. Regulatory Risk Review: DPDP Act Section 33 ₹250 Cr fine exposure evaluation
4. Board Approval: Allocation of ₹25 Lakhs for automated DLP tooling for 2027`
  },
  {
    question: "What is 'Architectural Drift', and how does the continuous PDCA cycle prevent it?",
    shortAnswer: "Architectural drift occurs when rapid software deployments, shadow IT, and unapproved configuration changes cause production systems to deviate from documented security baselines; prevented by continuous PDCA audits and Infrastructure as Code (IaC) drift detection.",
    explanation: "In fast-paced cloud environments, developers frequently spin up new cloud instances, modify firewall security groups, and add third-party APIs. Over 6 months, the production architecture drifts significantly from what was approved during the PLAN phase. Continuous PDCA cycles (automated daily configuration scans in DO, quarterly internal audits in CHECK, and automated IaC remediation in ACT) bring infrastructure back into alignment.",
    hint: "Think of an untended garden growing weeds and stray branches over time.",
    level: "moderate",
    codeExample: `// Mitigating Architectural Drift via PDCA:
DO:    Terraform provisions AWS infrastructure with AES-256 KMS encryption
CHECK: AWS Config / CSPM detects 3 unencrypted S3 buckets created manually via console (Drift Alert!)
ACT:   Automated Lambda function remediates buckets and blocks manual console creation!`
  },
  {
    question: "How does the PDCA cycle integrate with CERT-In 6-hour incident reporting under Section 70B of the IT Act?",
    shortAnswer: "PLAN establishes incident escalation playbooks; DO executes 24/7 SOC monitoring; CHECK audits incident response velocity (MTTR); ACT updates SOAR automated templates after real security drills.",
    explanation: "Under Section 70B of the IT Act, organizations must report cybersecurity incidents within 6 hours. The PDCA cycle operationalizes this legal duty: 1. PLAN: Authoring incident classification matrix and pre-formatted CERT-In reporting templates; 2. DO: Operating 24/7 SIEM/SOAR that automatically flags P1 breaches; 3. CHECK: Auditing reporting timelines during incident response drills; 4. ACT: Optimizing escalation playbooks to reduce reporting time from 4 hours to 45 minutes.",
    hint: "Remember how the 6-hour reporting SLA is planned, executed, audited, and optimized.",
    level: "basic",
    codeExample: `// CERT-In 6-Hour SLA Optimization Loop:
PLAN:  Establish 6-hour incident escalation SLA to incident@cert-in.org.in
DO:    SOC detects ransomware outbreak → Escalates to CISO in 12 mins
CHECK: Drill evaluation shows report sent in 2 hours 15 minutes (Compliant with 6h law!)
ACT:   Automate SOAR webhook to reduce notification time to < 30 minutes`
  },
  {
    question: "Synthesizing the Plan-Do-Check-Act (PDCA) Deming Cycle in ISMS: what is the master equation of continuous ISMS evolution?",
    shortAnswer: "$$\\text{ISMS Evolution Velocity} = \\frac{\\text{Plan (Risk Rigor)} \\times \\text{Do (Control Execution)} \\times \\text{Check (Audit Depth)} \\times \\text{Act (CAPA Closure)}}{\\text{Architectural Drift} + \\text{Unaddressed Audit Gaps}}$$ with continuous annual iterations.",
    explanation: "This master governance relationship proves that continuous security improvement is the mathematical product of all four PDCA phases. If an organization plans and implements controls but neglects internal audits (Check = 0) or fails to fix root causes (Act = 0), the evolution velocity collapses to zero and the enterprise rapidly decays into non-compliance and catastrophic security breach exposure.",
    hint: "Conclude by reviewing how the product of Plan, Do, Check, and Act eliminates architectural drift.",
    level: "expert",
    codeExample: `// Master Equation of Continuous PDCA Evolution:
Velocity = (Plan_RiskRigor * Do_Execution * Check_AuditDepth * Act_CAPAClosure) / (Drift + AuditGaps);
Outcome: 100% ISO 27001 Recertification, Zero Architectural Decay & Full Statutory Safe Harbor!`
  }
];

export default questions;
