const questions = [
  {
    question: "What are the 3 Primary Types of Information Security Audits defined under ISO 19011?",
    shortAnswer: "1. First-Party Audits (Internal Audits); 2. Second-Party Audits (Supplier / Vendor Audits); 3. Third-Party Audits (Certification & Regulatory Audits).",
    explanation: "Audits are classified by the relationship between the auditor and auditee: 1. First-Party: An organization audits its own internal operations (ISO 27001 Clause 9.2); 2. Second-Party: An organization audits its external suppliers or cloud vendors (Control A.5.19); 3. Third-Party: An independent accredited registrar (BSI, TÜV) or government regulator (CERT-In, RBI) audits the organization for formal certification or statutory compliance.",
    hint: "1. Self-audit (Internal); 2. Vendor audit (Supplier); 3. Official registrar audit (Certification).",
    level: "basic",
    codeExample: `// 3-Tier Audit Spectrum:
First-Party (Internal):  Mamata & internal team audit Kolkata FinTech microservices (Clause 9.2)
Second-Party (Vendor):   Kolkata FinTech audits external Cloud PACS Vendor (Control A.5.19)
Third-Party (Official):  BSI Registrar conducts ISO 27001 Certification Audit (Accredited Certification)`
  },
  {
    question: "What is a First-Party (Internal) Audit, and why is it mandatory under ISO/IEC 27001:2022 Clause 9.2?",
    shortAnswer: "An internal self-evaluation conducted by trained staff or outsourced internal auditors to assess ISMS conformance, identify non-conformities early, and drive continuous improvement prior to external audits.",
    explanation: "Under Clause 9.2, an organization cannot obtain or maintain ISO 27001 certification without conducting internal audits at planned intervals. Internal audits provide management with an honest, objective baseline of control effectiveness, allowing teams to remediate gaps before formal external certification audits occur.",
    hint: "Internal self-examination required by Clause 9.2 to prepare for external certification.",
    level: "basic",
    codeExample: `// ISO 27001 Clause 9.2 Internal Audit Cycle:
Internal Audit Scope: 500 Payment Microservices & Access Control Logs
Auditors:             Independent Internal CISO Audit Team
Outcome:              3 Minor Non-Conformities logged in GRC Register & remediated in 30 days`
  },
  {
    question: "What is a Second-Party (Supplier/Vendor) Audit, and what contractual clause empowers it?",
    shortAnswer: "An audit conducted by an organization on its external suppliers, cloud vendors, or SaaS providers to verify contractual compliance and security controls; empowered by contractual 'Right-to-Audit' clauses.",
    explanation: "Under ISO 27001 Control A.5.19 and A.5.20, organizations remain responsible for risks introduced by their vendors. A Second-Party audit allows the host organization to inspect a third-party vendor's data centers, review SOC 2 Type II reports, verify encryption keys, and ensure adherence to Data Processing Agreements (DPAs).",
    hint: "Auditing your suppliers to verify they protect your data, backed by a Right-to-Audit contract clause.",
    level: "moderate",
    codeExample: `// Second-Party Vendor Audit Trigger:
Auditee:     Third-Party Payroll SaaS Vendor
Auditor:     PayShield India Vendor Risk Assessment Team
Legal Power: Contract Clause 7.2 ("Customer retains the right to audit vendor facilities annually")
Outcome:     Verified vendor S3 encryption & compliance with DPDP Act Section 8(2)`
  },
  {
    question: "What is a Third-Party Audit, and what are its two primary categories (Certification vs Regulatory)?",
    shortAnswer: "1. Certification Audits: Conducted by accredited independent Certification Bodies (BSI, TÜV, DNV) to grant ISO 27001 / SOC 2 certificates; 2. Regulatory Audits: Conducted by government authorities (CERT-In, RBI, DPBI) to enforce statutory law compliance.",
    explanation: "Third-party audits provide the highest level of external independence: Certification audits prove to customers and global markets that the enterprise meets international standards; Regulatory audits enforce strict statutory mandates (such as RBI banking directions or DPDP Act personal data rules), carrying legal penalty powers.",
    hint: "Certification audits give you ISO badges; Regulatory audits enforce government laws.",
    level: "basic",
    codeExample: `// Third-Party Audit Categories:
Certification Audit: BSI Registrar issues official ISO/IEC 27001:2022 Certificate (Valid for 3 Years)
Regulatory Audit:    CERT-In Empaneled Auditors inspect UPI Switch under RBI Cyber Security Master Directions`
  },
  {
    question: "What is the difference between Stage 1 and Stage 2 in an ISO 27001 Third-Party Certification Audit?",
    shortAnswer: "Stage 1 (Documentation Audit): The auditor reviews ISMS policies, scope, SoA, and risk assessment documentation for completeness; Stage 2 (Technical & Operational Audit): The auditor visits on-site/cloud environments to test actual technical evidence and control implementation.",
    explanation: "A certification audit is always split into two stages: 1. Stage 1 verifies that your written rules exist and meet ISO requirements (if policies are missing, Stage 2 is postponed); 2. Stage 2 verifies that your staff actually follow those rules in practice by sampling logs, testing firewalls, and interviewing engineers.",
    hint: "Stage 1 checks written policies; Stage 2 checks practical technical execution.",
    level: "moderate",
    codeExample: `// Certification Audit Stages:
Stage 1 (Document Review): Auditor checks ISMS Policy, Risk Register, and Statement of Applicability (SoA)
Stage 2 (Implementation):  Auditor samples 25 server configs, tests MFA login, and inspects physical mantrap doors`
  },
  {
    question: "What is a 'Surveillance Audit', and how often is it conducted during the 3-Year ISO 27001 Certification Cycle?",
    shortAnswer: "A periodic partial audit conducted annually in Year 1 and Year 2 by the external certification registrar to verify that the certified ISMS continues to function effectively and previous non-conformities remain closed.",
    explanation: "An ISO 27001 certificate is valid for 3 years, but it is not a 'one-and-done' credential. In Year 1 (Surveillance 1) and Year 2 (Surveillance 2), the registrar returns to sample key operational controls, review internal audit results, and inspect management reviews. In Year 3, a full Recertification Audit is conducted.",
    hint: "Annual external checkups in Year 1 and Year 2 to keep your 3-year ISO certificate active.",
    level: "basic",
    codeExample: `// 3-Year ISO 27001 Certification Cycle:
Year 0: Initial Certification Audit (Stage 1 + Stage 2) ➔ ISO 27001 Certificate Issued!
Year 1: Surveillance Audit 1 (Samples core controls & verifies CAPA closures)
Year 2: Surveillance Audit 2 (Samples remaining Annex A controls & incident logs)
Year 3: Full Recertification Audit (Complete full-scope re-evaluation & certificate renewal)`
  },
  {
    question: "Under the Indian DPDP Act 2023 Section 10, what type of audit is legally mandated for Significant Data Fiduciaries?",
    shortAnswer: "A Third-Party Independent Data Audit conducted by an accredited external Data Auditor to verify data protection measures, consent management, and DPIA execution.",
    explanation: "Under Section 10(2)(b) of the DPDP Act 2023, Significant Data Fiduciaries (enterprises processing high volumes of personal citizen data) cannot rely solely on internal self-audits. They must hire independent external Data Auditors to evaluate personal data processing and submit audit reports to the Data Protection Board of India.",
    hint: "Significant Data Fiduciaries must undergo independent third-party data audits.",
    level: "moderate",
    codeExample: `// DPDP Statutory Third-Party Audit Mandate:
Target:    PayShield India (Significant Data Fiduciary - 800,000 citizen accounts)
Auditor:   Independent Third-Party Data Auditor
Scope:     DPDP Act Section 8 Safeguards + Section 6 Consent Logs + Section 9 Children's Data Protection
Outcome:   Official Statutory Audit Report submitted to DPBI`
  },
  {
    question: "How does Reserve Bank of India (RBI) Cyber Security Guidelines enforce Second-Party Audits on Outsourced FinTech Vendors?",
    shortAnswer: "RBI mandates that banks and financial institutions must include unconditional Right-to-Audit clauses in vendor contracts and perform regular Second-Party on-site or technical audits on all third-party service providers managing payment infrastructure.",
    explanation: "Banks cannot outsource risk. Under RBI IT Outsourcing directions, if a bank uses an external vendor for payment switch hosting, cloud analytics, or customer KYC processing, the bank must conduct Second-Party audits on the vendor's data centers, or obtain valid annual SOC 2 Type II audit reports.",
    hint: "Banks must actively audit their external IT vendors under RBI outsourcing rules.",
    level: "moderate",
    codeExample: `// RBI Second-Party Vendor Audit Requirement:
Bank Action: PayShield India sends audit team to inspect Mumbai data center of third-party SMS OTP Gateway
Verification: Physical biometric locks, HSM key storage, and 100% Indian Data Residency verified`
  },
  {
    question: "What is the critical governance rule regarding 'Auditor Independence' in First-Party (Internal) Audits?",
    shortAnswer: "Auditors must be independent of the specific operational activity being audited; an engineer or manager cannot audit their own department, code, or configured controls.",
    explanation: "Under ISO 19011 Section 5.3, objectivity is essential. While internal auditors work for the same company, an organization must cross-audit: the Cloud Infrastructure team audits the HR Application team, while the Application Security team audits the Cloud Infrastructure firewalls. This eliminates bias and self-review threats.",
    hint: "Internal auditors must not audit their own work; use cross-departmental auditing.",
    level: "basic",
    codeExample: `// Internal Audit Cross-Department Assignment:
Auditor:  Lead AppSec Engineer Mahima
Auditee:  DevOps Cloud Infrastructure Team (Configured by Mamata)
Result:   Independent & Objective evaluation under ISO 27001 Clause 9.2!`
  },
  {
    question: "What is a 'Customer-Led Second-Party Audit', and when is it requested in B2B enterprise software?",
    shortAnswer: "An audit where an enterprise customer inspects the security controls, code repositories, and SOC 2 reports of a software vendor before signing a multi-million rupee enterprise contract.",
    explanation: "When large enterprises or government bodies procure cloud software, they do not rely solely on sales brochures. Enterprise procurement teams conduct Second-Party vendor audits, submitting SIG questionnaires, reviewing third-party penetration test reports, and inspecting cloud architecture to ensure supply chain compliance.",
    hint: "When a big corporate customer audits your startup before buying your software.",
    level: "basic",
    codeExample: `// Enterprise Customer Second-Party Audit:
Customer: State Bank of India (SBI)
Vendor:   Kolkata FinTech Startup
Audit:    SBI Security Team audits vendor's AWS IAM policies & PCI-DSS v4.0 Attestation of Compliance (AoC)`
  },
  {
    question: "What is an 'Unannounced Regulatory Audit', and when can CERT-In or RBI execute one?",
    shortAnswer: "A surprise third-party regulatory inspection executed without prior notice following a suspected major cyber incident, critical infrastructure breach, or whistleblower report of statutory non-compliance.",
    explanation: "While certification audits are scheduled months in advance, statutory regulators (CERT-In under IT Act Section 70B, or RBI) hold legal authority to conduct immediate unannounced inspections following severe breaches or non-reporting of ransomware attacks, seizing logs and forensic evidence.",
    hint: "Surprise regulatory inspection triggered by a data breach or non-compliance report.",
    level: "moderate",
    codeExample: `// Unannounced Regulatory Audit Trigger:
Incident: Undisclosed data breach of 500,000 banking records leaked on dark web
Action:   CERT-In and RBI inspectors arrive for immediate unannounced forensic audit under IT Act Sec 70B`
  },
  {
    question: "Why must internal First-Party audits be completed BEFORE scheduling a Third-Party Stage 2 Certification Audit?",
    shortAnswer: "Because ISO/IEC 27001 Clause 9.2 explicitly requires an organization to provide documented evidence of at least one complete internal audit cycle and a Clause 9.3 Management Review before Stage 2 certification can proceed.",
    explanation: "External certification registrars will immediately halt a Stage 2 audit if the auditee cannot produce internal audit working papers and a signed Management Review meeting minute. Internal audits prove that the organization has operationalized its own governance and self-correction mechanisms.",
    hint: "You must conduct your own internal audit and management review before the external certifier arrives.",
    level: "basic",
    codeExample: `// Prerequisite for Stage 2 Certification:
1. Complete First-Party Internal Audit across all ISMS scope (Clause 9.2) ➔ Verified
2. Conduct Top Management Review meeting (Clause 9.3) ➔ Signed by Board
3. Registrar clears organization to proceed with Stage 2 Technical Audit!`
  },
  {
    question: "Synthesizing Types of Audits: what is the master equation of Multi-Tier Audit Assurance?",
    shortAnswer: "$$\\text{Assurance Defensibility} = \\frac{\\text{First-Party Rigor} \\times \\text{Second-Party TPRM Coverage} \\times \\text{Third-Party Accredited Certification}}{\\text{Self-Review Bias} + \\text{Un-audited Vendor Supply Chains}} \\ge 1.0$$ with continuous ISO 19011 and DPDP Act validation.",
    explanation: "This master governance relationship proves that an organization achieves total audit defensibility when thorough internal self-audits drive continuous improvement, second-party audits eliminate supply chain risks, and third-party accredited audits provide indisputable external validation. Eliminating self-review bias and supplier blindspots guarantees total statutory safe harbor.",
    hint: "Conclude by reviewing how 1st-party self-audits, 2nd-party vendor audits, and 3rd-party cert audits unite for complete assurance.",
    level: "expert",
    codeExample: `// Master Equation of Multi-Tier Audit Governance:
Assurance = (Internal_Audit_Rigor * Vendor_TPRM_Audit * Accredited_Certification) / (Self_Review_Bias + Vendor_Gaps);
Condition: Assurance >= 1.0 (Zero Gaps Across All 3 Tiers);
Outcome:   100% ISO 27001 Conformance, Uncompromised Supply Chains & Total Regulatory Safe Harbor!`
  }
];

export default questions;
