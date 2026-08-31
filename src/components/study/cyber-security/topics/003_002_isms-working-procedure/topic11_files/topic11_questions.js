const questions = [
  {
    question: "What are the six recognized phases of an enterprise ISO/IEC 27001:2022 ISMS implementation roadmap, and what are their primary deliverables?",
    shortAnswer: "Phase 1 (Initiation & Scope, Month 1); Phase 2 (Risk Assessment & SoA, Months 2-3); Phase 3 (Documentation & Control Implementation, Months 4-7); Phase 4 (SETA Training & Internal Audits, Months 8-9); Phase 5 (Management Review, Month 10); Phase 6 (Stage 1 & Stage 2 External Certification Audit, Months 11-12).",
    explanation: "A successful enterprise ISMS implementation takes 9 to 12 months: 1. Phase 1: Board project charter, CISO appointment, and ISMS Scope definition (Clause 4.3); 2. Phase 2: Threat modeling, asset inventory, ISO 27005 risk matrix, and Statement of Applicability (6.1.3); 3. Phase 3: Drafting 4-tier documentation and deploying 93 Annex A controls; 4. Phase 4: Employee training and independent internal audit (9.2); 5. Phase 5: Board Management Review (9.3); 6. Phase 6: External Stage 1 (Doc review) and Stage 2 (Technical audit).",
    hint: "Remember the chronological 6-phase journey from project kickoff to external certificate issuance.",
    level: "basic",
    codeExample: `// 12-Month ISMS Implementation Timeline:
[ Month 1   ] ➔ Phase 1: Initiation, Scope (4.3) & Board Charter
[ Month 2-3 ] ➔ Phase 2: Risk Assessment & SoA Formulation (6.1.3)
[ Month 4-7 ] ➔ Phase 3: 4-Tier Documentation & 93 Control Rollout
[ Month 8-9 ] ➔ Phase 4: SETA Training (A.6.3) & Internal Audit (9.2)
[ Month 10  ] ➔ Phase 5: Board Management Review Meeting (9.3)
[ Month 11-12]➔ Phase 6: External Certification (Stage 1 + Stage 2 Audit)`
  },
  {
    question: "What is the difference between Stage 1 and Stage 2 in an external ISO 27001 Certification Audit?",
    shortAnswer: "Stage 1 is a documentation and readiness review evaluating policies, scope, and SoA; Stage 2 is a rigorous on-site/remote technical and operational audit verifying that all 93 controls are effectively functioning in production.",
    explanation: "Accredited certification bodies (e.g. BSI, TÜV, DNV) split the audit: 1. Stage 1 (Documentation Audit): The lead auditor reviews mandatory clauses (4-10), documented policies, Statement of Applicability, and verifies internal audit & management review completion. Any missing mandatory documentation blocks progression to Stage 2; 2. Stage 2 (Operational Audit): Auditors interview developers, inspect firewall rules, review SIEM logs, test physical access badges, and verify CAPA closures.",
    hint: "Stage 1 checks the blueprints; Stage 2 tests the actual building.",
    level: "basic",
    codeExample: `// Stage 1 vs Stage 2 External Audit Matrix:
Stage 1 Audit: Focus = Documentation, Scope, SoA, Policy Approvals (Pass → Approved for Stage 2)
Stage 2 Audit: Focus = Live Production Control Testing, Staff Interviews, SIEM Log Sampling
Outcome:       Zero Major Non-Conformities → ISO/IEC 27001:2022 Certificate Issued!`
  },
  {
    question: "In the Kolkata FinTech Case Study (Mamata), how was the ISMS designed to handle 500 payment microservices processing ₹120 Crores daily under RBI regulations?",
    shortAnswer: "By implementing multi-region active-active cloud DR (RTO < 15s, RPO = 0), PostgreSQL dynamic data masking (A.8.11), hardware FIDO2 authentication (A.8.5), and automated 6-hour CERT-In escalation playbooks.",
    explanation: "Processing high-volume UPI transactions requires reconciling ISO 27001 with RBI Master Directions and PCI-DSS v4.0. Mamata's architecture deployed AWS Aurora multi-region replication between Kolkata and Mumbai, enforced TLS 1.3 with AES-256 KMS encryption, and automated CI/CD security linting (A.8.28), reducing MTTD to 12 seconds and passing both ISO 27001 Stage 2 and RBI audits with zero non-conformities.",
    hint: "Focus on multi-region active-active cloud failover, dynamic masking, and RBI compliance.",
    level: "moderate",
    codeExample: `// Kolkata FinTech Architecture Metrics:
Daily Volume:        ₹120 Crores UPI Transactions across 500 microservices
RTO / RPO SLA:       RTO = 12 Seconds | RPO = 0 Bytes (Synchronous Sync)
Security Controls:   A.5.7 (Threat Intel), A.8.11 (Masking), A.8.24 (AES-256 KMS)
Statutory Outcome:   100% RBI Cyber Resilience Pass + Stage 2 ISO 27001 Certification`
  },
  {
    question: "In the Ichapur Healthcare Case Study (Mahima), how did integrating ISO 27001 with ISO 27701 protect 80,000 oncology patient records under the Indian DPDP Act 2023?",
    shortAnswer: "By establishing an integrated ISMS + PIMS architecture that implemented DICOM PACS encryption (A.8.24), quarterly user access reviews (A.8.2), and automated citizen consent and crypto-shredding deletion manifests (A.8.10).",
    explanation: "Hospital networks process sensitive personal health data. Mahima deployed AWS S3 Object Lock for PACS diagnostic imaging backups, dynamic masking on patient phone numbers and Aadhaar IDs, and established an automated Data Subject Request (DSR) portal. This integrated architecture satisfied Section 8 of the DPDP Act 2023, completely immunizing the hospital from ₹250 Crore Section 33 fines.",
    hint: "Focus on healthcare PACS imaging, ISO 27701 privacy integration, and DPDP Section 8 safe harbor.",
    level: "moderate",
    codeExample: `// Ichapur Healthcare ISMS+PIMS Integration:
Governed Assets:     80,000 Oncology Patient Scans and Diagnostic Reports
Privacy Controls:    ISO 27701 Consent Registry + Control A.8.10 Crypto-Shredding
Backup Vault:        AWS S3 Object Lock Compliance Mode (Immutable Ransomware Protection)
Legal Shield:        100% Statutory Safe Harbor against ₹250 Crore DPDP Act Penalties!`
  },
  {
    question: "In the Barrackpore Power Grid Case Study (Debangshu), how did the ISMS protect 18 high-voltage 220kV substations under Section 70 of the Indian IT Act?",
    shortAnswer: "By implementing strict OT air-gapped jump hosts, bidirectional unidirectional security gateways (data diodes), automated SCADA configuration baseline scans (A.8.9), and mandatory unannounced live DR switching drills under CEA regulations.",
    explanation: "Industrial power grids are Critical Information Infrastructure (CII). Debangshu mapped ISO 27001 Annex A controls to NCIIPC guidelines and NIST SP 800-82: legacy Modbus/DNP3 RTU telemetry was isolated behind hardware data diodes, dual-factor cryptographic authentication was enforced for all switching operations, and 24/7 SOC monitoring maintained 100% uptime, immunizing directors from 10-year prison penalties under IT Act Section 70.",
    hint: "Focus on 220kV SCADA telemetry, hardware data diodes, and NCIIPC CII compliance.",
    level: "expert",
    codeExample: `// Barrackpore SCADA Critical Infrastructure Architecture:
Substations Governed:18 High-Voltage 220kV Transmission Substations
Perimeter Defense:   Hardware Data Diodes + Air-Gapped Jump Hosts (A.8.20)
Drill Performance:   48-Second Live Backup Control Center Switchover (SLA: 60s)
Legal Protection:    10-Year Imprisonment Liability Immunized under IT Act Section 70!`
  },
  {
    question: "What is a 'Stage 1 Audit Readiness Review', and what common documentation flaws cause organizations to fail it?",
    shortAnswer: "Stage 1 evaluates mandatory documentation; organizations fail when they present un-approved draft policies, undefined ISMS scope boundaries, incomplete Statements of Applicability (missing justification for excluded controls), or have not conducted a full internal audit and management review.",
    explanation: "Before external certification bodies send technical audit teams on-site for Stage 2, the Stage 1 auditor examines the governance foundation. If the organization cannot produce: 1. Board-signed Information Security Policy (5.2); 2. Documented Risk Assessment Methodology (6.1.2); 3. Fully populated SoA with 93 controls (6.1.3); 4. Completed Internal Audit report (9.2); 5. Signed Management Review minutes (9.3), Stage 1 is immediately failed.",
    hint: "Think of a building permit inspection: missing architectural blueprints stops construction.",
    level: "basic",
    codeExample: `// Stage 1 Audit Failure Kill-Chain:
Flaw 1: Statement of Applicability left 14 controls blank without documented justification
Flaw 2: Internal Audit (9.2) was never conducted prior to external audit date
Flaw 3: Management Review meeting minutes (9.3) lacked Board of Directors signatures
Auditor Action: STAGE 1 AUDIT FAILED → Stage 2 Technical Audit Cancelled!`
  },
  {
    question: "How does the 'Evidence Triangulation' audit technique work during an ISO 27001 Stage 2 operational audit?",
    shortAnswer: "Auditors verify control effectiveness by triangulating three independent sources: 1. Documented Procedure (SOP); 2. Staff Interview (Verbal confirmation); 3. Technical System Telemetry (Actual log files or live screen configuration).",
    explanation: "Auditors never trust a written policy alone. During Evidence Triangulation: 1. Document: Auditor reads SOP-HR-04 stating terminated accounts are revoked within 15 minutes; 2. Interview: Auditor interviews the DevOps engineer on how they receive offboarding tickets; 3. System Log: Auditor inspects the AWS CloudTrail and Okta logs for the last 5 terminated employees. If the logs show an account active for 3 days after resignation, a Major Non-Conformity is issued.",
    hint: "Remember the audit triangle: Document + Interview + System Evidence.",
    level: "moderate",
    codeExample: `// Evidence Triangulation Workflow:
1. Document Review:   SOP-IAM-02 requires MFA on all production SSH bastion hosts.
2. Staff Interview:   Auditor asks developer: "How do you SSH into the Kubernetes nodes?"
3. Technical Proof:   Auditor watches developer authenticate with FIDO2 YubiKey → TRIANGULATION PASS!`
  },
  {
    question: "What is the strategic role of the CISO during the initial ISMS Initiation & Governance Charter Phase (Phase 1)?",
    shortAnswer: "The CISO secures formal executive board commitment, defines the organizational ISMS scope boundaries, appoints cross-functional security champions, allocates budget resources, and establishes the project timeline.",
    explanation: "An ISMS cannot succeed as a grassroots IT effort; it requires top-down executive authority. Under Clause 5.1, top management must demonstrate leadership. In Phase 1, the CISO presents the business case (customer trust, regulatory risk, DPDP fines) to the Board of Directors, securing a signed project charter and allocating necessary capital expenditure (e.g. ₹18.5 Lakhs for tooling and audit fees).",
    hint: "Think of securing the royal charter and treasury funding before embarking on an expedition.",
    level: "basic",
    codeExample: `// Phase 1 Governance Charter Deliverables:
1. Board Resolution: Approved CISO Appointment & ISMS Mandate
2. Scope Statement:   Documented Physical, Logical, and Human Boundaries (Clause 4.3)
3. Steering Committee:Cross-functional team (Engineering, Legal, HR, Finance) meeting bi-weekly`
  },
  {
    question: "How does an enterprise resolve a Major Non-Conformity (Major NC) identified during a Stage 2 Certification Audit without losing its certificate?",
    shortAnswer: "The organization has a mandatory 90-day grace period to submit a 5-Whys Root Cause Analysis, implement systemic Corrective Actions (CAPA), and submit verified evidence to the certification body for desktop review or on-site re-audit.",
    explanation: "A Major Non-Conformity (e.g. total absence of encryption in production databases) prevents immediate certification. However, the process is not permanently terminated. The organization submits a formal CAPA plan within 30 days and completes full technical remediation within 90 days. Once the external lead auditor verifies the corrective evidence, the Major NC is closed and the ISO 27001 certificate is officially granted.",
    hint: "Remember the 90-day CAPA remediation window.",
    level: "moderate",
    codeExample: `// Major NC Resolution Timeline:
Day 0:   Stage 2 Audit identifies Major NC on unencrypted database backups (Control A.8.13)
Day 15:  Submit 5-Whys Root Cause Analysis and CAPA plan to BSI / TÜV Lead Auditor
Day 45:  Deploy AWS KMS AES-256 automated backup encryption across all 500 databases
Day 60:  Submit CloudTrail evidence logs → Auditor closes Major NC → Certificate Granted!`
  },
  {
    question: "What role does Employee Security Awareness Training (SETA - Control A.6.3) play in passing Stage 2 audits?",
    shortAnswer: "External auditors randomly interview non-technical employees (HR, sales, accounting); staff must demonstrate awareness of the security policy, how to identify phishing emails, clean desk rules, and how to report security incidents.",
    explanation: "Auditors intentionally avoid only interviewing the CISO. In Stage 2, an auditor might approach a receptionist or junior accountant and ask: 'What do you do if you receive an email asking for emergency employee payroll details?' If the employee explains the verification procedure and knows how to report the incident to the SOC, the organization passes Control A.6.3.",
    hint: "Think of testing whether the security culture has permeated every employee in the company.",
    level: "basic",
    codeExample: `// Stage 2 SETA Staff Interview Test:
Auditor Question: "If you lose your corporate smartphone in a Kolkata taxi, what is your immediate step?"
Employee Answer:  "I immediately call the 24/7 SOC hotline (+91-98300-XXXXX) to trigger remote wipe under SOP-MOB-02."
Auditor Rating:   100% OPERATIONAL CONFORMANCE RECORDED!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why does an accredited ISO 27001:2022 certificate provide the ultimate judicial Safe Harbor defense?",
    shortAnswer: "An accredited ISO 27001 certificate provides independent third-party proof that the enterprise implemented state-of-the-art organizational and technical safeguards under Section 8(5), proving absence of negligence and shielding directors from ₹250 Crore penalties.",
    explanation: "In regulatory penalty adjudications before the Data Protection Board of India (DPBI), the central question is whether the Data Fiduciary took reasonable precautions to prevent data compromise. An accredited ISO 27001 certificate, supported by audited SoA matrices and closed internal audit CAPA reports, establishes unassailable legal proof of due diligence under Section 8 of the DPDP Act 2023.",
    hint: "Remember how third-party accredited ISO certification serves as conclusive proof of reasonable care.",
    level: "basic",
    codeExample: `// DPDP Statutory Safe Harbor Defense:
Accredited Certificate: ISO/IEC 27001:2022 (Certificate No: IS-749201 by BSI / UKAS)
Judicial Evidence:      Documented SoA Matrix covering all 93 Annex A controls
DPBI Finding:           Corporate entity exercised highest standard of care → ₹250 Cr fine dismissed!`
  },
  {
    question: "Synthesizing Real-World ISMS Implementation Case Studies: what is the master equation of Implementation Success and Certification Excellence?",
    shortAnswer: "$$\\text{Certification Excellence} = \\frac{\\text{Executive Leadership (5.1)} \\times \\text{Risk Precision (6.1)} \\times \\text{Control Conformance (Annex A)}}{\\text{Scope Ambiguity} + \\text{Un-tested Procedures}}$$ with accredited Stage 2 audit verification.",
    explanation: "This master governance relationship proves that achieving world-class ISO 27001 certification and enduring operational resilience is the product of unwavering executive commitment, rigorous risk assessment, and flawless technical control execution. Eliminating scope ambiguity and un-tested procedures guarantees 100% first-pass certification, total stakeholder trust, and unshakeable statutory safe harbor under global and Indian cyber laws.",
    hint: "Conclude by reviewing how the product of leadership, risk assessment, and control conformance guarantees certification.",
    level: "expert",
    codeExample: `// Master Equation of ISMS Implementation Success:
Excellence = (Executive_Leadership * Risk_Precision * Control_Conformance) / (Scope_Ambiguity + Gaps);
Outcome: 100% First-Pass Stage 2 Certification, Zero Major NCs & Total Enterprise Resilience!`
  }
];

export default questions;
