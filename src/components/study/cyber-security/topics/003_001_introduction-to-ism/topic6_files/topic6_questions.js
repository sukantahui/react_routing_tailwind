const questions = [
  {
    question: "How have legal, regulatory, and compliance drivers transformed Information Security Management from an optional technical hygiene into a mandatory corporate survival imperative?",
    shortAnswer: "Governments and regulators worldwide have enacted strict statutory frameworks (e.g. Indian DPDP Act 2023, IT Act 2000, GDPR) that impose catastrophic financial fines (up to ₹250 Crores in India), mandatory 6-hour incident disclosures, and personal criminal liabilities for corporate directors.",
    explanation: "Historically, cybersecurity investments were voluntary and driven by internal IT discretion. Today, regulatory compliance is a non-negotiable legal mandate. Non-compliance exposes an enterprise to business-ending financial penalties (up to ₹250 Crores under the Indian DPDP Act Section 33), suspension of operating licenses (RBI banking directions), and criminal prosecution of corporate officers under Section 85 of the IT Act 2000.",
    hint: "Think of how mandatory building fire codes and automobile safety laws transformed physical engineering.",
    level: "basic",
    codeExample: `// The Evolution of Compliance Drivers:
Past (Voluntary):  "We will configure a firewall if the IT budget permits."
Present (Mandatory): "Under DPDP Act Section 33, failure to implement reasonable security safeguards risks ₹250 CRORES in fines!"`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 33 and Schedule 1, what are the maximum financial penalties for personal data breaches?",
    shortAnswer: "Up to ₹250 Crores for failure to take reasonable security safeguards to prevent personal data breaches, up to ₹200 Crores for failure to notify the Data Protection Board and affected citizens, and up to ₹200 Crores for breaching obligations related to children's data.",
    explanation: "Section 33 of the DPDP Act 2023, read with Schedule 1, establishes significant statutory financial penalties in Indian law: 1. Failure to take reasonable security safeguards to prevent personal data breaches: Up to ₹250 CRORES; 2. Failure to notify the Data Protection Board and affected users of a personal data breach under Section 8(6): Up to ₹200 CRORES; 3. Non-fulfillment of additional obligations for Significant Data Fiduciaries under Section 10: Up to ₹150 CRORES.",
    hint: "Remember the ₹250 Crore apex penalty under Schedule 1 of the Indian DPDP Act 2023.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Statutory Penalties (Schedule 1):
Section 8(5) Breach: Failure to implement reasonable security safeguards -> UP TO ₹250 CRORES
Section 8(6) Breach: Failure to notify Data Protection Board & Users     -> UP TO ₹200 CRORES
Section 9 Breach:   Violation of duties regarding Children's Data        -> UP TO ₹200 CRORES`
  },
  {
    question: "Under Section 70B of the Information Technology Act 2000 and CERT-In Cyber Security Directions 2022, what are the mandatory reporting and operational requirements for Indian organizations?",
    shortAnswer: "1. Mandatory reporting of 20 categories of cybersecurity incidents to CERT-In within 6 hours; 2. Mandatory synchronization of system clocks with Indian Standard Time (IST) NTP servers; 3. Mandatory maintenance of system and firewall logs for 180 days within Indian jurisdiction.",
    explanation: "Issued by the Indian Computer Emergency Response Team (CERT-In) under Section 70B(6) of the IT Act: 1. 6-Hour Reporting Window: Any specified cybersecurity incident (ransomware, unauthorized database access, DDoS, defacement) must be reported to incident@cert-in.org.in within 6 hours; 2. NTP Time Sync: All ICT systems must synchronize clocks with National Physical Laboratory (NPL) or NIC NTP servers; 3. Log Retention: System logs must be stored securely for a rolling 180 days within India.",
    hint: "Remember the 6-hour reporting SLA, NTP clock synchronization, and 180-day log storage mandates.",
    level: "basic",
    codeExample: `// CERT-In Directions 2022 Mandates:
1. Incident Notification: Report cyber breaches to incident@cert-in.org.in within 6 HOURS
2. NTP Clock Sync:        pool.ntp.org / time.nplindia.org (Indian Standard Time +/- 1 second)
3. Audit Log Retention:   180 days rolling archive stored securely within Indian territory`
  },
  {
    question: "Under Section 70 and Section 70A of the Information Technology Act 2000, what are the legal penalties for unauthorized access to 'Protected Systems' (Critical Information Infrastructure)?",
    shortAnswer: "Imprisonment for a term which may extend to 10 years and a mandatory fine.",
    explanation: "Section 70 of the IT Act empowers the appropriate Government to declare any computer resource which directly or indirectly affects the facility of Critical Information Infrastructure (CII) to be a 'Protected System' (e.g. 220kV power transmission grids, core banking switches, telecom backbones, defense networks). Under Section 70(3), any person who secures access or attempts to secure access to a protected system in contravention of this section shall be punished with imprisonment up to 10 years.",
    hint: "Remember the severe 10-year prison sentence for tampering with Critical Information Infrastructure.",
    level: "moderate",
    codeExample: `// IT Act Section 70 Protected Systems:
Scope:       220kV Power Grids (SCADA), Core Banking RTGS, Telecom, Defense Systems
Nodal Body:  National Critical Information Infrastructure Protection Centre (NCIIPC)
Penal Code:  Section 70(3) - Imprisonment up to 10 YEARS for unauthorized access or tampering!`
  },
  {
    question: "What is Section 43A of the Information Technology Act 2000, and how do the SPDI Rules 2011 legally define compliance?",
    shortAnswer: "Section 43A mandates that corporate bodies possessing sensitive personal data must pay civil damages/compensation for negligence; complying with ISO/IEC 27001 constitutes conclusive legal proof of maintaining 'Reasonable Security Practices'.",
    explanation: "Under Section 43A, if a corporate body possessing Sensitive Personal Data or Information (SPDI) is negligent in implementing and maintaining reasonable security practices, causing wrongful loss or wrongful gain, it is liable to pay damages by way of compensation to affected victims. The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011 explicitly state that implementing ISO/IEC 27001 is deemed compliant.",
    hint: "Remember the section providing civil compensation and recognizing ISO 27001 as a legal defense.",
    level: "moderate",
    codeExample: `// IT Act Section 43A Legal Protection Matrix:
Civil Liability: Corporate body pays compensation to victims if negligent in data protection.
Safe Harbor:     Maintaining ISO/IEC 27001:2022 Certification + Documented ISMS + Regular 3rd Party Audits
Outcome:         Conclusive statutory defense proving no corporate negligence occurred!`
  },
  {
    question: "Under Section 85 of the Information Technology Act 2000, when are corporate Directors and Officers held personally criminally liable for cyber offenses?",
    shortAnswer: "Whenever a company commits a cyber contravention, every Director, Manager, or Officer who was in charge of business conduct is deemed personally guilty and liable to prosecution, unless they prove the offense occurred without their knowledge or that they exercised due diligence.",
    explanation: "Section 85 removes the corporate veil for cyber offenses. If an enterprise suffers a major data leak due to negligence, the CISO, CEO, and Board of Directors can be held personally liable in court. To claim statutory immunity under the proviso to Section 85(1), the executive must prove: 1. The contravention took place without their knowledge, AND 2. They exercised all due diligence (e.g. established an independent CISO office, conducted annual audits, and maintained an ISMS).",
    hint: "Remember how Indian law pierces the corporate veil to hold directors personally accountable.",
    level: "expert",
    codeExample: `// IT Act Section 85 (Offenses by Companies):
Statutory Text: "Every person who... was in charge of, and was responsible to, the company for the conduct of the business... shall be deemed to be guilty."
Defense:         Must produce proof of executive DUE DILIGENCE (Independent CISO, ISO 27001, SOC Logs)`
  },
  {
    question: "What are the core mandatory requirements of the Reserve Bank of India (RBI) Cyber Security Framework for Banks and NBFCs?",
    shortAnswer: "1. Board-approved Cyber Security Policy; 2. Dedicated, independent CISO; 3. 24/7 Security Operations Center (SOC); 4. Mandatory 2-to-6 hour incident escalation to RBI Cyber Security Cell; 5. Mandatory multi-factor authentication (MFA) and end-to-end HSM encryption for transactions.",
    explanation: "The RBI Master Direction on Information Security and Cyber Security Governance establishes strict financial sector rules: 1. Governance: The CISO must operate independently of the CIO and report directly to the Board Risk Committee; 2. Operational Defense: Banks must operate a continuous 24/7 SOC; 3. Rapid Escalation: Unusual cyber incidents must be reported to the RBI within 2 to 6 hours; 4. Cryptography: Payment credentials must be encrypted in FIPS 140-3 Hardware Security Modules.",
    hint: "Remember the stringent RBI guidelines governing Indian banking cyber resilience.",
    level: "basic",
    codeExample: `// RBI Cyber Security Governance Mandates:
1. Independent CISO reporting directly to Board Risk Committee
2. Continuous 24/7/365 Security Operations Center with automated SIEM
3. Incident reporting to ciso_rbi@rbi.org.in within 2 to 6 hours
4. Mandatory vendor risk assessments for all third-party FinTech APIs`
  },
  {
    question: "What are the core technical requirements under the Payment Card Industry Data Security Standard (PCI-DSS v4.0)?",
    shortAnswer: "PCI-DSS v4.0 specifies 12 mandatory technical requirements organized into 6 objectives: build secure networks, protect cardholder data (AES-256 encryption at rest & in transit), maintain vulnerability management, enforce strong IAM (mandatory MFA), monitor networks (24/7 logging), and maintain security policies.",
    explanation: "Applicable to any enterprise that stores, processes, or transmits credit/debit card details: 1. Requirement 3: Protect stored cardholder data (Primary Account Numbers must be encrypted with AES-256 or tokenized; CVVs must NEVER be stored post-authorization); 2. Requirement 8: Enforce MFA for all administrative access into Cardholder Data Environments (CDE); 3. Requirement 10: Log and monitor all access to network resources and cardholder data.",
    hint: "Remember the 12 core requirements protecting credit/debit card numbers globally.",
    level: "moderate",
    codeExample: `// PCI-DSS v4.0 Core Compliance Rules:
Requirement 3: PAN numbers must be encrypted with AES-256-GCM; CVV storage post-authorization is ILLEGAL!
Requirement 8: Mandatory Multi-Factor Authentication (MFA) for ALL access to Cardholder Data Environment
Requirement 11: Quarterly internal/external vulnerability scans by PCI Approved Scanning Vendors (ASV)`
  },
  {
    question: "Under the European Union's General Data Protection Regulation (GDPR), what are Articles 32, 33, and 83, and how do they compare to India's DPDP Act?",
    shortAnswer: "Article 32 mandates technical/organizational security measures; Article 33 mandates 72-hour breach reporting to supervisory authorities; Article 83 imposes fines up to €20 Million or 4% of global annual turnover; comparable to India's DPDP Act Section 8 and Section 33 (₹250 Crores).",
    explanation: "GDPR established the global gold standard for data privacy: Article 32 requires pseudonymization, encryption, and regular security testing; Article 33 requires notifying data protection authorities within 72 hours of becoming aware of a personal data breach; Article 83 imposes catastrophic administrative fines up to €20M or 4% of worldwide turnover (whichever is higher). India's DPDP Act 2023 mirrors these principles with direct statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Contrast GDPR's €20M / 4% fine and 72-hour reporting with India's ₹250 Crore penalty and CERT-In 6-hour reporting.",
    level: "moderate",
    codeExample: `// GDPR vs DPDP Act Compliance Matrix:
Safeguard Mandate:  GDPR Article 32 <---> DPDP Act 2023 Section 8(5) (Technical & Org Measures)
Breach Reporting:   GDPR Article 33 (72 Hours) <---> CERT-In Section 70B (6 HOURS!)
Maximum Penalty:    GDPR Article 83 (€20M / 4% Turnover) <---> DPDP Act Section 33 (₹250 CRORES!)`
  },
  {
    question: "What is a 'Statement of Applicability' (SoA), and why is it the core artifact of an ISO/IEC 27001:2022 audit?",
    shortAnswer: "The SoA is a mandatory ISO 27001 document detailing which of the 93 Annex A security controls are applicable to the enterprise, the justification for their inclusion, their implementation status, and the formal justification for any excluded controls.",
    explanation: "An organization cannot simply claim it follows ISO 27001. Under Clause 6.1.3(d), it must produce a Statement of Applicability (SoA). The SoA lists all 93 controls from Annex A (across Organizational, People, Physical, and Technological themes). For every control, the SoA documents: 1. Applicable (Yes/No); 2. Justification for inclusion (Risk treatment, legal requirement); 3. Implementation status; 4. Justification for exclusion (e.g. excluding physical smartcard controls if the company is 100% cloud-native).",
    hint: "Think of an itemized checklist proving which safety controls you have installed and justifying any you left out.",
    level: "expert",
    codeExample: `// ISO/IEC 27001:2022 Statement of Applicability (SoA) Schema:
Control ID:    A.8.24 (Use of Cryptography)
Applicable:    YES
Justification: Risk Treatment (Mitigates ₹50 Cr data breach risk) + DPDP Act Section 8(5)
Status:        IMPLEMENTED (AES-256-GCM on PostgreSQL + TLS 1.3 on all endpoints)
Review Date:   2026-08-23 | Owner: CISO Office`
  },
  {
    question: "What is a 'Corrective and Preventive Action' (CAPA) plan, and how does it remediate audit non-conformities?",
    shortAnswer: "CAPA is a structured quality and security remediation methodology: identifying root causes of non-conformities, executing immediate corrective action to fix the flaw, and implementing preventive safeguards to ensure the vulnerability never recurs.",
    explanation: "When an internal or external security audit identifies a Non-Conformity (NC) against ISO 27001 or DPDP rules: 1. Containment: Immediate temporary fix; 2. Root Cause Analysis (RCA): Using 5-Whys or Fishbone diagrams to find why the control failed; 3. Corrective Action: Permanently fixing the specific non-conformity (e.g. enabling automated MFA for 12 forgotten admin accounts); 4. Preventive Action: Modifying policies or CI/CD pipelines so orphan accounts cannot be created in the future.",
    hint: "Think of putting out a fire (containment), investigating the electrical short (RCA), rewiring the room (corrective), and installing circuit breakers (preventive).",
    level: "moderate",
    codeExample: `// CAPA Plan Lifecycle for Audit Non-Conformity:
Audit Finding:     NC-04: 15 AWS S3 storage buckets lacked server-side encryption
Root Cause:        DevOps Terraform template had 'encryption = false' as default
Corrective Action: Enabled KMS AES-256 encryption across all 15 buckets immediately
Preventive Action: Implemented AWS Service Control Policy (SCP) blocking any unencrypted S3 creation!`
  },
  {
    question: "What are the legal evidentiary prerequisites under Section 65B of the Indian Evidence Act for producing digital audit logs in court?",
    shortAnswer: "A written certificate signed by an authorized person in lawful control of the computer device, certifying the device operated properly, logs were generated in ordinary business course, and cryptographic hashes (SHA-256) prove zero data tampering.",
    explanation: "Under Section 65B of the Indian Evidence Act 1872 / Section 63 of Bharatiya Sakshya Adhiniyam 2023, digital records (firewall logs, SIEM alerts, database transactions) cannot be admitted as evidence without a Section 65B Certificate. The certificate must state that the computer was in lawful control of the certifier, was functioning properly at all material times, and that the electronic record is an unaltered reproduction of original telemetry verified by cryptographic hashes.",
    hint: "Remember the legally required electronic record authentication certificate in Indian courts.",
    level: "basic",
    codeExample: `// Section 65B Digital Evidence Certificate Essentials:
1. Certifier:      Authorized System Administrator / Forensic Lead
2. Device Status:  Server was operating normally without system errors during log creation
3. Tamper-Proof:   Cryptographic Hash: SHA256(siem_incident_20260823.log) = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
4. Legal Verdict:  Admitted as valid electronic evidence in Indian court of law!`
  },
  {
    question: "Synthesizing Legal, Regulatory, and Compliance Drivers in ISM: what is the master equation of regulatory compliance and corporate immunity?",
    shortAnswer: "$$\\text{Corporate Immunity} = \\frac{\\text{DPDP Section 8 Controls} \\times \\text{CERT-In 6h Readiness} \\times \\text{ISO 27001 SoA} \\times \\text{Section 85 Due Diligence}}{\\text{Unaddressed Audit Gaps} + \\text{Unencrypted Personal Data}}$$ with continuous audit verification.",
    explanation: "This master governance relationship proves that statutory compliance and corporate legal immunity are not achieved through superficial paperwork, but through continuous, verifiable technical and organizational controls. Maintaining compliance with the Indian DPDP Act 2023, meeting CERT-In's mandatory 6-hour reporting window, maintaining an active ISO 27001 ISMS, and establishing documented executive due diligence completely immunizes corporate directors and the enterprise against ₹250 Crore statutory fines and legal liabilities.",
    hint: "Conclude by reviewing how statutory controls and due diligence eliminate catastrophic legal liabilities.",
    level: "expert",
    codeExample: `// Master Equation of Regulatory Corporate Immunity:
Immunity = (DPDP_Controls * CERTIn_6h_SLA * ISO27001_SoA * Due_Diligence) / Audit_Gaps;
Outcome: 100% Legal Protection, Zero Statutory Fines & Unshakeable Market Trust!`
  }
];

export default questions;
