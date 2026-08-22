const questions = [
  {
    question: "Why do modern enterprise security architectures integrate ISO/IEC 27001 with complementary frameworks like NIST CSF, COBIT, and ISO 27701?",
    shortAnswer: "ISO 27001 provides the auditable, certifiable management system; NIST CSF provides operational risk engineering taxonomy; COBIT aligns IT governance with business goals; and ISO 27701 adds privacy governance for DPDP/GDPR compliance.",
    explanation: "No single framework covers every organizational dimension. ISO 27001 is the global gold standard for management certification and risk governance. However, technical engineering teams prefer NIST CSF's functional categories (Identify, Protect, Detect, Respond, Recover), board executives use COBIT 2019 to align IT investments with corporate profitability, and privacy officers require ISO 27701 to protect digital personal data under the Indian DPDP Act 2023.",
    hint: "Think of an orchestra where ISO 27001 is the conductor, NIST CSF is the sheet music, and COBIT is the concert hall management.",
    level: "basic",
    codeExample: `// Multi-Framework Synergy:
ISO/IEC 27001 ➔ Overarching Management System & External Certification (Clauses 4-10 + 93 Controls)
NIST CSF 2.0  ➔ Operational Engineering Taxonomy (Govern, Identify, Protect, Detect, Respond, Recover)
COBIT 2019    ➔ Strategic IT Governance & Executive Business Alignment (EDM, APO, BAI, DSS, MEA)
ISO 27701     ➔ Privacy Information Management System (PIMS) for DPDP Act 2023 Compliance`
  },
  {
    question: "How do the 93 ISO/IEC 27001:2022 Annex A controls map to the 6 Core Functions of NIST CSF 2.0?",
    shortAnswer: "1. GOVERN (Clauses 4, 5, 6 & A.5.1); 2. IDENTIFY (A.5.7, A.5.9, A.8.8); 3. PROTECT (A.8.5, A.8.11, A.8.12, A.8.24); 4. DETECT (A.8.15, A.8.16, A.7.4); 5. RESPOND (A.5.24, A.5.26, A.5.28); 6. RECOVER (A.5.30, A.8.13, A.8.14).",
    explanation: "NIST CSF 2.0 added the GOVERN function to structure leadership and context. Mapping: 1. GOVERN: Policies (A.5.1) and roles (A.5.2); 2. IDENTIFY: Threat intel (A.5.7), asset inventory (A.5.9), vulnerability scanning (A.8.8); 3. PROTECT: Identity (A.8.5), data masking (A.8.11), DLP (A.8.12), encryption (A.8.24); 4. DETECT: Logging (A.8.15) and monitoring (A.8.16); 5. RESPOND: Incident handling (A.5.24) and containment; 6. RECOVER: ICT business continuity (A.5.30) and backups (A.8.13).",
    hint: "Remember the 6 NIST functions: Govern, Identify, Protect, Detect, Respond, Recover.",
    level: "moderate",
    codeExample: `// NIST CSF 2.0 to ISO 27001 Mapping:
[ GOVERN ]   <---> ISO 27001 Clause 5 Leadership + Control A.5.1 Policies
[ IDENTIFY ] <---> Control A.5.7 Threat Intel + Control A.5.9 Asset Inventory
[ PROTECT ]  <---> Control A.8.11 Data Masking + Control A.8.24 Cryptography
[ DETECT ]   <---> Control A.8.16 Monitoring Activities + Control A.8.15 Logging
[ RESPOND ]  <---> Control A.5.24 Incident Management + 6-Hour CERT-In Escalation
[ RECOVER ]  <---> Control A.5.30 ICT Readiness for BCP + Control A.8.13 Backups`
  },
  {
    question: "What is COBIT 2019, and how does its 5-domain governance model align with ISO/IEC 27001?",
    shortAnswer: "COBIT 2019 is a comprehensive IT governance and management framework divided into 5 domains: EDM (Evaluate, Direct, Monitor), APO (Align, Plan, Organize), BAI (Build, Acquire, Implement), DSS (Deliver, Service, Support), and MEA (Monitor, Evaluate, Assess).",
    explanation: "While ISO 27001 focuses on information security, COBIT 2019 focuses on the governance of all enterprise IT: 1. Governance Domain: EDM aligns with ISO 27001 Clause 5 (Board oversight); 2. Management Domains: APO maps to Clause 6 (Planning & Risk); BAI maps to Clause 8 & DevSecOps (A.8.28); DSS maps to daily SOC operations and Annex A.8 technical controls; MEA maps to Clause 9 (Internal Audits & KPI Evaluation).",
    hint: "Remember COBIT's 5 domains: 1 Governance (EDM) and 4 Management (APO, BAI, DSS, MEA).",
    level: "expert",
    codeExample: `// COBIT 2019 to ISO 27001 Domain Alignment:
EDM (Governance) ➔ ISO 27001 Clause 5: Leadership & Board Oversight
APO (Management) ➔ ISO 27001 Clause 6: Planning, Risk & Security Architecture
BAI (Management) ➔ ISO 27001 Clause 8 & Control A.8.28: Secure Software Acquisition & DevSecOps
DSS (Management) ➔ ISO 27001 Annex A.8: Service Delivery, SOC Operations & Technical Safeguards
MEA (Management) ➔ ISO 27001 Clause 9: Monitoring, Internal Audit & Performance Evaluation`
  },
  {
    question: "What is ISO/IEC 27701 (PIMS), and why is it essential for integrating ISO 27001 with the Indian Digital Personal Data Protection (DPDP) Act 2023?",
    shortAnswer: "ISO/IEC 27701 is the Privacy Information Management System (PIMS) extension to ISO 27001; it adds privacy-specific controls (consent management, data subject rights, privacy by design) that directly operationalize Section 8 of the Indian DPDP Act 2023.",
    explanation: "ISO 27001 protects information confidentiality, integrity, and availability, but does not specify personal data privacy workflows. ISO 27701 extends ISO 27001 by defining controls for Data Controllers (Fiduciaries) and Data Processors: managing citizen consent records, facilitating data principal rights (erasure, correction), appointing a Data Protection Officer (DPO), and enforcing privacy impact assessments, shielding the firm from ₹250 Crore fines under DPDP Section 33.",
    hint: "Think of ISO 27001 as the security foundation, and ISO 27701 as the privacy penthouse built on top of it.",
    level: "basic",
    codeExample: `// ISO 27001 + ISO 27701 Integrated Stack:
[ ISO/IEC 27001 ISMS ] ➔ Secures IT Infrastructure, Encryption, IAM & Network Perimeters
           +
[ ISO/IEC 27701 PIMS ] ➔ Manages Consent Records, Data Principal Erasure & DPO Governance
           ||
[ DPDP ACT 2023 COMPLIANCE ] ➔ Complete Statutory Safe Harbor against ₹250 Crore Fines!`
  },
  {
    question: "How does PCI-DSS v4.0 (Payment Card Industry Data Security Standard) integrate into an ISO 27001 Statement of Applicability?",
    shortAnswer: "PCI-DSS v4.0 specifies 12 prescriptive technical requirements for cardholder data environments (CDE); mapped directly into the SoA under Technological controls (A.8.24 Cryptography, A.8.5 MFA, A.8.20 Network Security, A.8.28 Secure Coding).",
    explanation: "FinTech and banking payment switches must comply with both ISO 27001 and PCI-DSS v4.0. In the Statement of Applicability (SoA): 1. Requirement 3 (Protect Stored Cardholder Data) maps to A.8.11 (Masking) and A.8.24 (Crypto); 2. Requirement 8 (Identify Users and Authenticate Access) maps to A.8.5 (MFA); 3. Requirement 6 (Develop Secure Systems) maps to A.8.28 (Secure Coding); 4. Requirement 10 (Log and Monitor) maps to A.8.15 and A.8.16.",
    hint: "Think of PCI-DSS as the highly specific technical checklist for payment card databases inside the broader ISMS.",
    level: "moderate",
    codeExample: `// PCI-DSS v4.0 to ISO 27001 SoA Mapping:
PCI-DSS Req 3.4 (Card PAN Masking)    <---> ISO 27001 Control A.8.11 (Data Masking)
PCI-DSS Req 8.3 (Multi-Factor Auth)   <---> ISO 27001 Control A.8.5 (Secure Authentication)
PCI-DSS Req 10.2 (Audit Log Creation) <---> ISO 27001 Control A.8.15 (Logging)
PCI-DSS Req 6.2 (Custom Software Dev) <---> ISO 27001 Control A.8.28 (Secure Coding)`
  },
  {
    question: "What is the 'Harmonized Structure' (formerly Annex SL), and how does it enable unified multi-standard management systems?",
    shortAnswer: "The Harmonized Structure is the standardized high-level clause architecture (Clauses 1 to 10) shared across all modern ISO management standards (ISO 27001, ISO 27701, ISO 22301, ISO 9001), allowing organizations to merge audits, policies, and management reviews into a single integrated system.",
    explanation: "In the past, organizations maintained separate siloed binders for security (ISO 27001), business continuity (ISO 22301), and quality (ISO 9001). The Harmonized Structure aligns all standards with identical core clauses: Clause 4 (Context), Clause 5 (Leadership), Clause 6 (Planning), Clause 7 (Support), Clause 8 (Operation), Clause 9 (Performance), and Clause 10 (Improvement), reducing corporate audit overhead by over 50%.",
    hint: "Think of USB-C as the universal plug that connects phones, laptops, and chargers.",
    level: "moderate",
    codeExample: `// Harmonized Structure (Annex SL) Integration:
Unified Clause 5: Single Board Security & Continuity Policy (Covers ISO 27001 + ISO 22301 + ISO 27701)
Unified Clause 9: Single Annual Internal Audit & Board Management Review
Unified Clause 10: Single Centralized 5-Whys CAPA Tracking Register`
  },
  {
    question: "What are the CIS Controls (Center for Internet Security v8), and how do they operationalize ISO 27001 technical baselines?",
    shortAnswer: "CIS Controls v8 is a prioritized, prescriptive set of 18 critical security controls containing 153 technical safeguards divided into 3 Implementation Groups (IG1, IG2, IG3); provides the exact configuration checklists needed to implement Annex A.8 controls.",
    explanation: "ISO 27001 tells an organization *what* governance requirements to meet, but does not provide specific technical commands. CIS Controls provides the *how*: 1. IG1 (Basic Cyber Hygiene): Automated software inventory, secure password policies, basic data backups; 2. IG2/IG3 (Enterprise/High Assurance): Micro-segmentation, centralized SIEM logging, automated vulnerability remediation, and penetration testing.",
    hint: "Think of ISO 27001 as the building code and CIS Controls as the bricklayer's step-by-step technical manual.",
    level: "basic",
    codeExample: `// CIS Controls v8 to ISO 27001 Alignment:
CIS Control 01 (Inventory of Hardware Assets) <---> ISO 27001 Control A.5.9
CIS Control 04 (Secure Configuration of Assets) <---> ISO 27001 Control A.8.9
CIS Control 06 (Access Control Management)      <---> ISO 27001 Control A.8.5
CIS Control 10 (Malware Defenses)              <---> ISO 27001 Control A.8.7`
  },
  {
    question: "How does the Reserve Bank of India (RBI) Cyber Security Framework mandate multi-framework harmonization for FinTechs?",
    shortAnswer: "RBI Master Directions mandate that all licensed banking entities, payment aggregators, and prepaid wallet issuers must maintain ISO 27001 certification, implement NIST CSF threat hunting and SOC telemetry, and adhere to PCI-DSS v4.0 for card processing.",
    explanation: "Financial technology regulators do not permit single-standard compliance. Under RBI Cyber Security Guidelines: 1. ISO 27001 is mandatory for ISMS management governance; 2. NIST CSF is enforced for SOC threat hunting, UEBA analytics, and 6-hour incident containment; 3. PCI-DSS v4.0 is mandatory for all cardholder data processing; 4. IT Act Section 70B mandates 180-day log archiving and NTP time synchronization.",
    hint: "Remember the combination of ISO 27001, NIST CSF, PCI-DSS, and RBI Master Directions.",
    level: "basic",
    codeExample: `// RBI Multi-Framework Mandate:
[ ISO/IEC 27001 ] ➔ Formal ISMS Certification & Board Policy (Clause 5 & 6)
[ NIST CSF 2.0 ]  ➔ 24/7 SOC Operations, Threat Intelligence (A.5.7) & MTTD < 15s
[ PCI-DSS v4.0 ]  ➔ End-to-End Encryption & Dynamic Data Masking on Card Numbers (A.8.11)
[ CERT-In SLA ]   ➔ Mandatory 6-Hour Incident Notification to incident@cert-in.org.in`
  },
  {
    question: "What is NIST SP 800-53 Rev 5, and when is it integrated with ISO 27001 for Critical Information Infrastructure (CII)?",
    shortAnswer: "NIST SP 800-53 Rev 5 is an exhaustive catalog of security and privacy controls across 20 families; integrated with ISO 27001 by National Critical Information Infrastructure Protection Centre (NCIIPC) for nuclear, power grid, and defense installations under IT Act Section 70.",
    explanation: "For high-assurance military and critical infrastructure networks (like 220kV power grid SCADA telemetry), standard ISO 27001 controls are supplemented with NIST SP 800-53's granular technical requirements: physical air-gapping, supply chain provenance verification (SR family), hardware cryptographic roots of trust, and continuous automated configuration verification.",
    hint: "Think of the most comprehensive, military-grade security control catalog in the world.",
    level: "expert",
    codeExample: `// NIST SP 800-53 Control Families in ISO 27001 OT Scope:
AC (Access Control)    | SC (System & Comms Protection) | SI (System & Info Integrity)
SR (Supply Chain Risk) | CP (Contingency Planning)      | IA (Identification & Auth)
Enforced across 18 high-voltage SCADA substations under IT Act Section 70 Protected Systems Charter!`
  },
  {
    question: "How does a 'Control Crosswalk Matrix' eliminate audit fatigue and redundant documentation across multiple frameworks?",
    shortAnswer: "A crosswalk matrix maps a single internal technical policy or control implementation (e.g. FIDO2 MFA) to multiple external standards simultaneously (ISO 27001 A.8.5, NIST CSF PR.AC-7, PCI-DSS 8.3, CIS Control 6.3), allowing one audit test to satisfy all frameworks.",
    explanation: "If an enterprise maintains separate audit teams and test procedures for ISO 27001, SOC 2, and PCI-DSS, engineers spend 80% of their working hours answering duplicate auditor requests ('Audit Fatigue'). A unified Control Crosswalk Matrix tests the control once (e.g. verifying AWS KMS AES-256 encryption) and automatically maps the passing evidence across all standards.",
    hint: "Test once, comply with many: one piece of evidence satisfies four auditors.",
    level: "moderate",
    codeExample: `// Unified Control Crosswalk Entry:
Internal Control:  CTRL-AUTH-01 (Hardware FIDO2 WebAuthn MFA Enforced on all Cloud Consoles)
Mapped Standards:
  - ISO/IEC 27001:2022 ➔ Control A.8.5 (Secure Authentication)
  - NIST CSF 2.0       ➔ PR.AA-01 / PR.AA-02 (Identity Management & Authentication)
  - PCI-DSS v4.0       ➔ Requirement 8.3.1 (Multi-Factor Authentication)
  - CIS Controls v8    ➔ Safeguard 6.3 (Require MFA for Externally-Exposed Applications)`
  },
  {
    question: "What is SOC 2 Type II (AICPA Trust Services Criteria), and how does it interface with an ISO 27001 certification?",
    shortAnswer: "ISO 27001 certifies that an organization has built an effective management system; SOC 2 Type II evaluates and tests the operational effectiveness of security controls over a rolling 6 to 12-month period for North American B2B enterprise customers.",
    explanation: "Global SaaS and cloud companies typically need both: 1. ISO 27001: Internationally recognized certification proving systematic risk governance; 2. SOC 2 Type II: An independent CPA attestation report examining detailed technical control logs (Security, Availability, Confidentiality, Processing Integrity, Privacy) over a minimum 6-month historical observation window.",
    hint: "Think of ISO 27001 as your international ISO driving license, and SOC 2 Type II as your detailed driving history record.",
    level: "moderate",
    codeExample: `// ISO 27001 vs SOC 2 Type II:
ISO/IEC 27001: Global Standard | Certifies ISMS Management System | Pass/Fail Certification
SOC 2 Type II: US AICPA Standard | Tests 6-Month Control Effectiveness | Detailed CPA Audit Report`
  },
  {
    question: "Under the Indian DPDP Act 2023, why is integrating ISO 27001 with ISO 27701 the definitive legal defense against Section 33 penalties?",
    shortAnswer: "ISO 27001 establishes reasonable technical and organizational security safeguards under Section 8(5); ISO 27701 establishes privacy governance (consent records, data principal rights, DPO) under Section 8, providing complete judicial Safe Harbor against ₹250 Crore fines.",
    explanation: "The DPDP Act 2023 requires both robust cybersecurity (preventing data leaks) and lawful privacy processing (handling citizen consent and storage limitation). An integrated ISMS + PIMS architecture (ISO 27001 + ISO 27701) provides comprehensive documented evidence covering both technical encryption (A.8.24) and privacy governance, completely immunizing the corporate entity from regulatory sanctions.",
    hint: "Remember how security (ISO 27001) plus privacy (ISO 27701) equals full DPDP compliance.",
    level: "basic",
    codeExample: `// Integrated Safe Harbor Matrix:
DPDP Section 8(5) Technical Safeguards <---> ISO 27001 Annex A.8 (Masking, DLP, Cryptography)
DPDP Section 8(7) Storage Limitation   <---> ISO 27001 Control A.8.10 + ISO 27701 Privacy Retention
DPDP Section 8(6) Breach Notification  <---> ISO 27001 Controls A.5.24-A.5.28 + ISO 27701 Incident Logs
Result: Absolute Legal Safe Harbor against ₹250 Crore Section 33 Penalties!`
  },
  {
    question: "Synthesizing Integration with Other Frameworks (NIST CSF, COBIT): what is the master equation of Multi-Framework Governance?",
    shortAnswer: "$$\\text{Multi-Framework Efficiency} = \\frac{\\text{ISO 27001 (ISMS)} \\times \\text{NIST CSF 2.0 (Ops)} \\times \\text{COBIT 2019 (Gov)} \\times \\text{ISO 27701 (Privacy)}}{\\text{Redundant Audit Overhead} + \\text{Compliance Gaps}}$$ with continuous crosswalk matrix verification.",
    explanation: "This master governance relationship proves that multi-framework integration maximizes enterprise resilience while drastically reducing audit fatigue. By harmonizing management governance (ISO 27001), engineering execution (NIST CSF), executive business alignment (COBIT 2019), and privacy protection (ISO 27701) into a single unified crosswalk matrix, the enterprise achieves 100% global and Indian regulatory compliance with zero redundant testing.",
    hint: "Conclude by reviewing how the product of ISO 27001, NIST CSF, COBIT, and ISO 27701 eliminates compliance gaps.",
    level: "expert",
    codeExample: `// Master Equation of Multi-Framework Governance:
Efficiency = (ISO27001_ISMS * NIST_CSF_Ops * COBIT_Gov * ISO27701_Privacy) / (Audit_Fatigue + Gaps);
Outcome: Test Once, Comply with Many, Zero Regulatory Gaps & Total Statutory Safe Harbor!`
  }
];

export default questions;
