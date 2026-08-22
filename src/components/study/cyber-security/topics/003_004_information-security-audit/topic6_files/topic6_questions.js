const questions = [
  {
    question: "What are the 5 major global and domestic cybersecurity compliance frameworks studied in information security auditing?",
    shortAnswer: "1. India DPDP Act 2023 (Personal Data Privacy); 2. EU GDPR (Global Data Protection); 3. US HIPAA Security Rule (Healthcare ePHI); 4. PCI-DSS v4.0 (Payment Cardholder Data); 5. AICPA SOC 2 (Cloud SaaS Trust Services Criteria).",
    explanation: "Enterprises operating globally must comply with multiple overlapping frameworks: India DPDP Act protects Indian citizen data; GDPR governs European citizen data; HIPAA protects medical records; PCI-DSS secures credit card environments; and SOC 2 provides customer trust assurance for cloud service providers.",
    hint: "DPDP (India), GDPR (EU), HIPAA (Health), PCI-DSS (Payments), SOC 2 (Cloud SaaS).",
    level: "basic",
    codeExample: `// 5 Core Compliance Frameworks:
India DPDP Act 2023: Maximum ₹250 Crore penalty for failure to implement reasonable safeguards
EU GDPR:             Up to €20 Million or 4% of annual global turnover for privacy lapses
US HIPAA:            Mandatory Administrative, Physical, and Technical Safeguards for ePHI
PCI-DSS v4.0:        12 Principal Requirements protecting the Cardholder Data Environment (CDE)
AICPA SOC 2 Type 2:  Independent CPA audit testing Trust Services Criteria over 6-12 months`
  },
  {
    question: "What is the maximum financial penalty under Section 33 of the Indian Digital Personal Data Protection (DPDP) Act 2023 for failure to implement reasonable security safeguards?",
    shortAnswer: "A maximum statutory penalty of ₹250 CRORE (Rupees Two Hundred and Fifty Crores) per violation, adjudicated by the Data Protection Board of India (DPBI).",
    explanation: "Under Section 33 and the Schedule to the DPDP Act 2023, failing to implement reasonable security safeguards to prevent personal data breaches under Section 8(5) carries the highest financial fine under Indian cyber law—up to ₹250 Crores for each breach occurrence.",
    hint: "Up to ₹250 Crores for failing to protect citizen personal data.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Penalty Schedule:
Section 8(5) Failure to take reasonable security safeguards ➔ Up to ₹250 Crore fine
Section 8(6) Failure to notify breach to DPBI and users      ➔ Up to ₹200 Crore fine
Section 9    Non-compliance with obligations for children    ➔ Up to ₹200 Crore fine`
  },
  {
    question: "What are the core differences between a SOC 2 Type 1 and a SOC 2 Type 2 audit report?",
    shortAnswer: "SOC 2 Type 1 evaluates the design of controls at a single point in time; SOC 2 Type 2 evaluates both the design AND the operating effectiveness of controls over a testing period of 6 to 12 months.",
    explanation: "A Type 1 report is a snapshot confirming that security policies and configurations were designed correctly on a specific date (e.g. June 30th). A Type 2 report is significantly more rigorous: the auditor samples operational evidence across 6 to 12 months to prove that controls operated continuously without failure.",
    hint: "Type 1 = Single date snapshot; Type 2 = 6-12 months of continuous operational proof.",
    level: "basic",
    codeExample: `// SOC 2 Audit Types:
SOC 2 Type 1:  "Controls were properly designed on 2026-06-30." (Point-in-time snapshot)
SOC 2 Type 2:  "Controls operated effectively from 2026-01-01 to 2026-12-31." (12-Month continuous proof)`
  },
  {
    question: "What are the 5 Trust Services Criteria (TSC) in AICPA SOC 2, and which one is mandatory for all SOC 2 reports?",
    shortAnswer: "1. Security (Common Criteria - MANDATORY); 2. Availability; 3. Confidentiality; 4. Processing Integrity; 5. Privacy.",
    explanation: "The Security criterion (often called Common Criteria or CC) is mandatory in every SOC 2 audit. It tests firewalls, MFA, encryption, and vulnerability management. The other four criteria (Availability, Confidentiality, Processing Integrity, Privacy) are optional and selected based on the vendor's service commitments.",
    hint: "Security (Mandatory), Availability, Confidentiality, Processing Integrity, Privacy.",
    level: "basic",
    codeExample: `// SOC 2 Trust Services Criteria:
[MANDATORY] CC6.1 - CC6.8: Security (Logical & Physical Access Controls, Encryption, Firewalls)
[OPTIONAL]  A1.1 - A1.3:   Availability (Disaster Recovery, 99.99% Uptime SLAs)
[OPTIONAL]  C1.1 - C1.2:   Confidentiality (Data Classification & Crypto-Shredding)
[OPTIONAL]  PI1.1 - PI1.5: Processing Integrity (Error-free financial batch transactions)
[OPTIONAL]  P1.1 - P8.1:   Privacy (Personal Data Notice, Consent, and Retention)`
  },
  {
    question: "What is the 'Cardholder Data Environment' (CDE) in PCI-DSS v4.0, and how does Network Segmentation reduce audit scope?",
    shortAnswer: "The CDE includes all people, processes, and technologies that store, process, or transmit cardholder data (PAN, CVV); network segmentation isolates the CDE with firewalls, removing out-of-scope systems from PCI audit requirements.",
    explanation: "If an enterprise operates a flat network, every single server, laptop, and printer is considered in-scope for PCI-DSS audit. By isolating the payment servers into a dedicated VPC or DMZ with strict firewall rules and tokenization, only the isolated segment is audited, saving millions in compliance costs.",
    hint: "CDE is where credit card numbers live; network firewalls isolate it to shrink audit scope.",
    level: "moderate",
    codeExample: `// PCI-DSS Network Scope Reduction:
Flat Network:  5,000 servers in scope ➔ ₹1.2 Crore annual QSA audit cost
Segmented CDE: 20 payment tokenization pods in scope ➔ ₹15 Lakh annual audit cost (90% reduction!)`
  },
  {
    question: "What are the 3 rule categories of Safeguards mandated under the US HIPAA Security Rule for protecting ePHI?",
    shortAnswer: "1. Administrative Safeguards (§164.308); 2. Physical Safeguards (§164.310); 3. Technical Safeguards (§164.312).",
    explanation: "HIPAA Security Rule mandates: 1. Administrative: Security management process, workforce training, and Business Associate Agreements (BAAs); 2. Physical: Facility access controls, workstation security, and device media disposal; 3. Technical: AES-256 encryption at rest/transit, unique user IDs, emergency access procedures, and audit logs.",
    hint: "Administrative (Policies/Training), Physical (Locks/Doors), Technical (Encryption/Logs).",
    level: "basic",
    codeExample: `// HIPAA Security Rule Safeguards:
Administrative: §164.308(a)(1) Risk Analysis & Assigned Security Official (CISO)
Physical:       §164.310(a)(1) Facility Access Controls (Biometric Hospital Server Room)
Technical:      §164.312(a)(2)(iv) AES-256 Encryption at Rest for Oncology PACS Biopsies`
  },
  {
    question: "What is the 'Unified Compliance Framework' (UCF) or 'Map Once, Comply Many' methodology in IS auditing?",
    shortAnswer: "An integrated compliance management approach that maps common baseline security controls (e.g. ISO 27001) across multiple regulatory standards (DPDP, GDPR, HIPAA, PCI-DSS, SOC 2) to eliminate redundant audit testing.",
    explanation: "Instead of conducting 5 separate audits for password rotation, access review, and encryption, an organization implements a single unified control (e.g. AES-256 encryption with 90-day access reviews). Testing this single control satisfies ISO 27001 A.8.24, DPDP Sec 8, GDPR Art 32, HIPAA §164.312, PCI-DSS Req 3, and SOC 2 CC6.1 simultaneously.",
    hint: "Implementing one strong security control that satisfies 5 different regulations at once.",
    level: "moderate",
    codeExample: `// "Map Once, Comply Many" Mapping:
Unified Control: Enforce AWS KMS AES-256 Encryption at Rest on Database
Satisfies:
- ISO 27001:2022 Control A.8.24
- India DPDP Act 2023 Section 8(5)
- EU GDPR Article 32(1)(a)
- US HIPAA Security Rule §164.312(a)(2)(iv)
- PCI-DSS v4.0 Requirement 3.4
- AICPA SOC 2 Type 2 CC6.6`
  },
  {
    question: "How do GDPR Article 33 and CERT-In Directions 2022 differ in their mandatory security breach notification timelines?",
    shortAnswer: "GDPR mandates breach notification to the Data Protection Authority within 72 HOURS of becoming aware; CERT-In mandates reporting specified cybersecurity incidents within 6 HOURS of noticing.",
    explanation: "India enforces one of the world's most aggressive breach notification windows under CERT-In Directions: 6 hours for critical cyber security incidents. Under the European GDPR, Data Controllers have up to 72 hours to notify the national supervisory authority.",
    hint: "CERT-In = 6 Hours (India); GDPR = 72 Hours (Europe).",
    level: "moderate",
    codeExample: `// Breach Notification SLA Comparison:
CERT-In (India): 6 HOURS from noticing (Mandatory under IT Act Section 70B)
DPDP Act 2023:   Prompt notification to DPBI and affected Data Principals
EU GDPR:         72 HOURS to Supervisory Authority (Article 33)`
  },
  {
    question: "Under the Indian DPDP Act 2023 Section 10, what extra audit requirements apply to 'Significant Data Fiduciaries' (SDFs)?",
    shortAnswer: "Significant Data Fiduciaries must: 1. Appoint an India-based Data Protection Officer (DPO); 2. Appoint an independent Data Auditor to conduct periodic Data Audits; 3. Conduct Data Protection Impact Assessments (DPIAs).",
    explanation: "The Central Government designates entities as Significant Data Fiduciaries based on volume, sensitivity of personal data processed, risk to democratic elections, or national security. SDFs face strict statutory governance, requiring external annual Data Audits and periodic DPIAs.",
    hint: "SDFs must appoint a DPO, hire an independent Data Auditor, and perform periodic DPIAs.",
    level: "basic",
    codeExample: `// Significant Data Fiduciary (SDF) Governance Checklist:
[✔] India-based Resident Data Protection Officer (DPO) appointed
[✔] Independent Data Auditor empaneled for annual Section 10 Data Audit
[✔] Formal Data Protection Impact Assessment (DPIA) documented for AI algorithms
[✔] Algorithmic transparency and periodic security audits verified`
  },
  {
    question: "What is a 'Business Associate Agreement' (BAA) under HIPAA, and what is its DPDP Act equivalent?",
    shortAnswer: "Under HIPAA, a BAA is a legally binding contract ensuring third-party vendors safeguard ePHI; under the Indian DPDP Act 2023, it corresponds to a formal Data Processing Agreement (DPA) between a Data Fiduciary and a Data Processor under Section 8(2).",
    explanation: "A hospital cannot outsource cloud hosting or medical transcription without a signed agreement binding the vendor to the same security standards. HIPAA requires a BAA, while DPDP Act Section 8(2) mandates that Data Fiduciaries only engage Data Processors under valid contractual data processing agreements.",
    hint: "Legal contracts holding third-party cloud vendors accountable for protecting patient data.",
    level: "moderate",
    codeExample: `// Third-Party Vendor Data Protection Contract:
HIPAA: Business Associate Agreement (BAA) with AWS / Microsoft Azure
DPDP:  Data Processor Agreement (DPA) under Section 8(2) with Cloud FinTech Partner`
  },
  {
    question: "What is 'Point-to-Point Encryption' (P2PE) in PCI-DSS v4.0, and how does it protect payment terminals?",
    shortAnswer: "P2PE encrypts cardholder data instantly at the physical point-of-interaction (POS terminal) using hardware HSM keys; data remains ciphertext until it reaches the secure payment processor switch, preventing merchant memory scraping.",
    explanation: "In retail environments, malware (e.g. memory scrapers) infects cash registers. With a validated PCI-P2PE solution, the credit card data is encrypted inside the physical pin pad hardware. The merchant's point-of-sale computer never sees unencrypted PANs, immunizing the retailer from memory scraping attacks and drastically reducing PCI audit scope.",
    hint: "Encrypting credit card data inside the payment terminal so the computer never sees plaintext.",
    level: "moderate",
    codeExample: `// PCI-P2PE Flow:
POS Terminal (Hardware Encrypts via AES-128 DUKPT) ➔
Merchant LAN / Windows PC (Transfers Ciphertext Only - Out of PCI Scope!) ➔
Acquiring Bank Payment Gateway (Hardware HSM Decrypts & Routes Transaction)`
  },
  {
    question: "What are the key differences between the 'Right to be Forgotten' in GDPR Article 17 and 'Data Erasure' in DPDP Act Section 12?",
    shortAnswer: "Both grant citizens the right to request deletion of their personal data once the purpose is fulfilled; however, both allow data retention when mandated by statutory tax, banking (PMLA), or healthcare laws.",
    explanation: "Under DPDP Act Section 12(3) and GDPR Article 17, when a user closes their account or withdraws consent, the Data Fiduciary must erase their personal data unless retention is necessary under legal obligations (such as the Prevention of Money Laundering Act - PMLA requiring 5 years of banking records).",
    hint: "Users can demand deletion of their data unless specific laws (banking/tax) require retention.",
    level: "basic",
    codeExample: `// Automated Data Erasure & Retention Workflow:
User requests account deletion ➔
Step 1: Check PMLA / Tax Mandate (Are transactions younger than 5 years?)
Step 2: If YES ➔ Retain minimal transaction logs in encrypted WORM archive.
Step 3: If NO ➔ Trigger cryptographic shredding across all DB tables!`
  },
  {
    question: "Synthesizing Compliance Frameworks: what is the master equation of Multi-Framework Assurance Velocity?",
    shortAnswer: "$$\\text{Multi-Framework Assurance Velocity} = \\frac{\\text{Unified Control Harmonization} \\times \\text{Automated Continuous Evidence Proof}}{\\text{Redundant Audit Silos} + \\text{Framework-Specific Gaps}} \\ge 1.0$$ with continuous DPDP Act, GDPR, HIPAA, PCI-DSS, and SOC 2 validation.",
    explanation: "This master governance relationship proves that an Information Security Management System achieves optimal compliance efficiency when controls are harmonized across standards and evidenced continuously via automated cloud telemetry. Eliminating redundant audit silos and compliance gaps ensures 100% certification and total statutory safe harbor across all global and domestic jurisdictions.",
    hint: "Conclude by reviewing how Unified Control Harmonization satisfies multiple compliance frameworks simultaneously.",
    level: "expert",
    codeExample: `// Master Equation of Multi-Framework Compliance:
Velocity = (Unified_Harmonization * Continuous_Evidence_Proof) / (Audit_Silos + Compliance_Gaps);
Condition: Compliance_Gaps == 0 (100% Framework Coverage);
Outcome:   100% Conformance across DPDP Act, GDPR, HIPAA, PCI-DSS v4.0, and SOC 2 Type 2!`
  }
];

export default questions;
