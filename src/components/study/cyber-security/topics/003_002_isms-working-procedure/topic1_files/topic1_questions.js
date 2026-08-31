const questions = [
  {
    question: "What is the historical evolution of the ISO/IEC 27001 standard, and what was the major structural shift in the 2022 revision?",
    shortAnswer: "ISO 27001 evolved from BS 7799 (1995) through ISO 17799, 2005, 2013, to ISO/IEC 27001:2022; the 2022 revision consolidated 114 controls across 14 domains into 93 controls across 4 themes and introduced 11 new controls.",
    explanation: "The standard originated in 1995 as the British Standard BS 7799. It became ISO/IEC 17799, then ISO/IEC 27001:2005, and ISO/IEC 27001:2013 (with 114 controls in 14 domains). In October 2022, ISO published ISO/IEC 27001:2022, which streamlined the structure into 93 controls across 4 simple themes (Organizational, People, Physical, Technological) and added 11 critical modern controls addressing cloud security, threat intelligence, data masking, and secure coding.",
    hint: "Remember the evolution from BS 7799 to 2013 (114 controls) to 2022 (93 controls in 4 themes).",
    level: "basic",
    codeExample: `// Evolution of ISO/IEC 27001:
BS 7799 (1995) ➔ ISO 27001:2005 (133 controls) ➔ ISO 27001:2013 (114 controls / 14 domains) ➔ ISO 27001:2022 (93 controls / 4 themes + 11 NEW controls)`
  },
  {
    question: "What are the 11 brand-new security controls introduced in ISO/IEC 27001:2022 Annex A?",
    shortAnswer: "1. Threat intelligence (A.5.7); 2. Information security for use of cloud services (A.5.23); 3. ICT readiness for business continuity (A.5.30); 4. Physical security monitoring (A.7.4); 5. Configuration management (A.8.9); 6. Information deletion (A.8.10); 7. Data masking (A.8.11); 8. Data leakage prevention (A.8.12); 9. Monitoring activities (A.8.16); 10. Web filtering (A.8.23); 11. Secure coding (A.8.28).",
    explanation: "ISO/IEC 27001:2022 modernized Annex A to address the modern cloud and threat landscape: 1. Threat Intelligence (A.5.7); 2. Cloud Services Security (A.5.23); 3. ICT Readiness for BCP (A.5.30); 4. Physical Security Monitoring (A.7.4); 5. Configuration Management (A.8.9); 6. Information Deletion / DPDP Storage Limitation (A.8.10); 7. Data Masking (A.8.11); 8. Data Leakage Prevention / DLP (A.8.12); 9. Monitoring Activities / User Telemetry (A.8.16); 10. Web Filtering (A.8.23); 11. Secure Coding (A.8.28).",
    hint: "Remember the modern additions: Cloud, Threat Intel, DLP, Data Masking, and Secure Coding.",
    level: "moderate",
    codeExample: `// The 11 New Controls in ISO/IEC 27001:2022:
A.5.7  Threat Intelligence        | A.7.4  Physical Security Monitoring
A.5.23 Cloud Services Security    | A.8.9  Configuration Management
A.5.30 ICT Readiness for BCP      | A.8.10 Information Deletion
A.8.11 Data Masking               | A.8.12 Data Leakage Prevention (DLP)
A.8.16 Monitoring Activities      | A.8.23 Web Filtering
A.8.28 Secure Coding              |`
  },
  {
    question: "What is the 'Harmonized Structure' (formerly Annex SL), and why is it essential for multi-standard enterprise certifications?",
    shortAnswer: "The Harmonized Structure is a standardized 10-clause blueprint and common vocabulary used across all ISO management system standards (ISO 27001, ISO 9001, ISO 22301, ISO 27701), allowing organizations to operate an integrated management system.",
    explanation: "Before Annex SL, different ISO standards had conflicting structures, making it difficult for an enterprise to combine Quality (ISO 9001), Security (ISO 27001), Business Continuity (ISO 22301), and Privacy (ISO 27701). The Harmonized Structure enforces identical clause numbering (Clauses 1-10), core definitions, and management requirements, enabling unified internal audits and shared risk management workflows.",
    hint: "Think of a universal building foundation upon which you can build security, quality, and privacy floors.",
    level: "moderate",
    codeExample: `// Integrated Management System (Harmonized Structure):
Clause 5 (Leadership)      → Governs ISO 27001 (ISMS) + ISO 22301 (BCMS) + ISO 27701 (Privacy)
Clause 6 (Risk Planning)   → Shared Enterprise Risk Register across Quality, Security, and Cloud
Clause 9 (Internal Audits) → Single Combined Audit Team auditing all management systems simultaneously!`
  },
  {
    question: "What are the mandatory requirements of ISO/IEC 27001:2022 Clause 4 (Context of the Organization)?",
    shortAnswer: "1. Determining external and internal issues affecting ISMS outcomes (4.1); 2. Understanding the needs and expectations of interested parties (4.2); 3. Determining the scope of the ISMS (4.3); 4. Establishing the ISMS itself (4.4).",
    explanation: "Clause 4 requires the organization to look outward and inward before designing controls: 1. Context (4.1): Geopolitical threats, industry competition, technological trends; 2. Interested Parties (4.2): Legal regulators (DPDP Data Protection Board, CERT-In, RBI), customers, shareholders; 3. Scope (4.3): Explicitly documenting the boundaries (physical sites, software systems, cloud workloads, and third-party interfaces) covered by the ISMS.",
    hint: "Remember: Know your environment, know your stakeholders, and define your boundaries.",
    level: "basic",
    codeExample: `// Clause 4 ISMS Scope Document Example:
Scope: "The ISMS covers all payment transaction processing, cloud APIs, database clusters, and human operations at the Kolkata FinTech Operations Center, governed by RBI Master Directions and the Indian DPDP Act 2023."`
  },
  {
    question: "What are the mandatory requirements of ISO/IEC 27001:2022 Clause 5 (Leadership)?",
    shortAnswer: "Top management must demonstrate commitment by signing the Information Security Policy, aligning security with business strategy, allocating budget/resources, and assigning organizational roles, responsibilities, and authorities (CISO appointment).",
    explanation: "Clause 5 places responsibility directly on the Board of Directors and CEO. Top management cannot outsource or delegate ISMS ownership. They must: 1. Sign and communicate the Information Security Policy (5.2); 2. Ensure resources are allocated; 3. Integrate security into commercial business processes; 4. Appoint an independent CISO with direct reporting access to the Board (5.3).",
    hint: "Remember: Leadership requires top executive signature, budget allocation, and clear governance.",
    level: "basic",
    codeExample: `// Clause 5 Leadership Checklist:
[✔] Board of Directors signed the 2026 Enterprise Information Security Policy
[✔] Independent CISO appointed with direct reporting to Board Risk Committee
[✔] Annual Cybersecurity OpEx/CapEx budget formally allocated and approved`
  },
  {
    question: "What is the two-step Risk Management methodology mandated by ISO/IEC 27001:2022 Clause 6?",
    shortAnswer: "Clause 6.1.2 mandates Information Security Risk Assessment (identifying assets, threats, vulnerabilities, likelihood, and impact); Clause 6.1.3 mandates Information Security Risk Treatment (selecting controls and producing the Statement of Applicability).",
    explanation: "Clause 6 forms the engine of the ISMS: 1. Risk Assessment (6.1.2): Establishes risk criteria, identifies risk owners, assesses realistic consequences and likelihoods, and evaluates risks against organizational Risk Appetite; 2. Risk Treatment (6.1.3): Formulates treatment options (Mitigate, Transfer, Accept, Avoid), maps required controls to Annex A, and produces the mandatory Statement of Applicability (SoA).",
    hint: "Remember: Step 1 is assessing the risk; Step 2 is treating the risk and authoring the SoA.",
    level: "moderate",
    codeExample: `// Clause 6 Risk Treatment Workflow:
1. Risk Assessment: Asset = Payment DB | Threat = SQLi | Impact = ₹250 Cr DPDP Fine | Risk = CRITICAL
2. Risk Treatment:  Option = MITIGATE | Annex A Control = A.8.28 (Secure Coding) + A.8.24 (Crypto)
3. SoA Artifact:    Document control inclusion in the Statement of Applicability (SoA)`
  },
  {
    question: "What are the four categories of resources and competence mandated under ISO/IEC 27001:2022 Clause 7 (Support)?",
    shortAnswer: "1. Resources (7.1); 2. Competence & verified qualifications (7.2); 3. Awareness & phishing simulations (7.3); 4. Communication & disclosure protocols (7.4); 5. Documented information management (7.5).",
    explanation: "Clause 7 provides the foundational operational support for the ISMS: 1. Competence: Verifying certifications (CISSP, CEH) and technical training for security personnel; 2. Awareness: Ensuring all employees understand the security policy and consequences of non-compliance; 3. Communication: Defining what to communicate, when, and with whom (e.g. CERT-In 6-hour reporting); 4. Documented Information: Enforcing version control, change history, and approval workflows.",
    hint: "Remember: Personnel skills, awareness training, communication channels, and controlled documentation.",
    level: "basic",
    codeExample: `// Clause 7 Support Mandates:
Competence (7.2):  Forensic Lead must hold valid GCFA / CHFI certification + Section 65B training
Awareness (7.3):   Monthly simulated phishing drills with Phish-Prone tracking (< 2% target)
Documenting (7.5): All policy changes reviewed and approved with cryptographic SHA-256 versioning`
  },
  {
    question: "What are the core operational requirements under ISO/IEC 27001:2022 Clause 8 (Operation)?",
    shortAnswer: "Clause 8 requires executing the operational risk treatment plans defined in Clause 6, controlling outsourced/externally provided processes (vendor risk), and keeping documented evidence proving controls are actively running.",
    explanation: "Clause 8 is where planning turns into real-world action. The organization must: 1. Implement and control the processes needed to meet information security requirements (8.1); 2. Perform information security risk assessments at planned intervals or when significant changes occur (8.2); 3. Execute the risk treatment plan and retain documented proof that controls are operational (8.3).",
    hint: "Remember that Clause 8 is the execution phase where technical controls and vendor audits operate daily.",
    level: "moderate",
    codeExample: `// Clause 8 Operational Execution:
1. Daily SOC SIEM telemetry monitoring and EDR alert triage
2. Quarterly vulnerability scanning (A.8.8) and annual third-party penetration testing
3. Third-party vendor risk assessments (A.5.19) for all cloud API integrations`
  },
  {
    question: "What are the three mandatory verification pillars under ISO/IEC 27001:2022 Clause 9 (Performance Evaluation)?",
    shortAnswer: "1. Monitoring, measurement, analysis, and evaluation of security KPIs (9.1); 2. Internal Audits conducted by independent internal auditors (9.2); 3. Executive Management Review conducted by top leadership (9.3).",
    explanation: "Clause 9 evaluates whether the ISMS is actually working: 1. Metrics (9.1): Quantitative KPIs such as Mean Time to Detect (MTTD), Mean Time to Report (MTTR), and patch velocity; 2. Internal Audit (9.2): Scheduled, objective audits verifying conformity to ISO 27001 clauses and organizational policies; 3. Management Review (9.3): Annual executive board meeting reviewing audit findings, incidents, and resource needs.",
    hint: "Remember the three evaluation steps: metrics measurement, internal audit, and executive board review.",
    level: "basic",
    codeExample: `// Clause 9 Performance Evaluation Pipeline:
[ 9.1 KPI Telemetry (MTTR: 42s) ] ➔ [ 9.2 Scheduled Internal Audit ] ➔ [ 9.3 Executive Board Management Review ]`
  },
  {
    question: "What are the requirements of ISO/IEC 27001:2022 Clause 10 (Improvement), and how does it drive the CAPA process?",
    shortAnswer: "Clause 10 mandates that when non-conformities or incidents occur, the organization must react, evaluate root causes (RCA), execute corrective actions to prevent recurrence, and continually enhance the suitability and effectiveness of the ISMS.",
    explanation: "Clause 10 ensures the ISMS never becomes stale: 1. Nonconformity and Corrective Action (10.1): When an audit finding or security breach occurs, the enterprise must contain it, conduct Root Cause Analysis (5-Whys), and implement systemic preventive changes; 2. Continual Improvement (10.2): Continuously upgrading controls to counter evolving threats and emerging zero-day vulnerabilities.",
    hint: "Think of fixing the immediate bug, finding out why the bug happened, and patching the build pipeline so it never happens again.",
    level: "moderate",
    codeExample: `// Clause 10 CAPA Workflow:
Audit Finding:     NC-12: Unencrypted database snapshot discovered on secondary backup server
Root Cause (RCA):  DevOps automated backup script was missing '--encrypt-kms' flag
Corrective Action: Encrypted the snapshot with AES-256-GCM immediately
Preventive Action: Implemented AWS IAM Service Control Policy (SCP) blocking unencrypted snapshot creation!`
  },
  {
    question: "What are the five 'Control Attributes' in the ISO/IEC 27002:2022 taxonomy used to filter and classify Annex A controls?",
    shortAnswer: "1. Control Type (#Preventive, #Detective, #Corrective); 2. Information Security Properties (#Confidentiality, #Integrity, #Availability); 3. Cybersecurity Concepts (#Identify, #Protect, #Detect, #Respond, #Recover); 4. Operational Capabilities (#Governance, #Asset_management, #IAM, #Physical_security); 5. Security Domains (#Governance_and_Ecosystem, #Protection, #Defense, #Resilience).",
    explanation: "ISO 27002:2022 introduced a modern multidimensional tagging taxonomy (Attributes) for all 93 controls. Using these 5 attributes, security architects can dynamically filter and map controls: e.g. querying all `#Preventive` controls protecting `#Confidentiality` in the `#Protection` domain to construct automated compliance matrices for GDPR and the Indian DPDP Act 2023.",
    hint: "Remember the 5 tags: Type, CIA Property, NIST Concept, Operational Capability, and Security Domain.",
    level: "expert",
    codeExample: `// ISO 27002:2022 Control Attributes Example for A.8.24 (Use of Cryptography):
#Control_Type:              #Preventive
#InfoSec_Properties:        #Confidentiality, #Integrity
#Cybersecurity_Concepts:    #Protect
#Operational_Capabilities:  #Cryptography, #Information_protection
#Security_Domains:          #Protection`
  },
  {
    question: "How does ISO/IEC 27001:2022 integrate with the Indian Digital Personal Data Protection (DPDP) Act 2023?",
    shortAnswer: "ISO 27001 Annex A controls (specifically A.8.10 Information Deletion, A.8.11 Data Masking, A.8.12 DLP, and A.5.34 Privacy/PII Protection) provide the exact technical and organizational safeguards legally required under Section 8 of the DPDP Act 2023.",
    explanation: "The DPDP Act 2023 imposes direct penalties up to ₹250 Crores for failure to implement reasonable security safeguards. An audited ISO 27001:2022 ISMS operationalizes every statutory privacy obligation: Section 8(5) safeguards are mapped to Annex A.8 controls (encryption, masking, DLP), Section 8(7) storage limitation is enforced via A.8.10 information deletion, and Section 10 DPO governance is integrated into Clause 5.",
    hint: "Remember how ISO 27001 controls directly fulfill the technical requirements of the Indian DPDP Act.",
    level: "basic",
    codeExample: `// ISO 27001:2022 to DPDP Act 2023 Mapping:
DPDP Section 8(5) Safeguards ➔ ISO 27001 A.8.24 (Crypto) + A.8.11 (Data Masking) + A.8.12 (DLP)
DPDP Section 8(7) Erasure    ➔ ISO 27001 A.8.10 (Information Deletion / Crypto-Shredding)
DPDP Section 10 DPO Mandate  ➔ ISO 27001 Clause 5.3 (Organizational Roles & Authorities)`
  },
  {
    question: "Synthesizing ISO/IEC 27001 Standard Overview and Structure: what is the master equation of ISO 27001 certification integrity?",
    shortAnswer: "$$\\text{Certification Integrity} = \\frac{\\sum_{i=4}^{10} \\text{Clause Compliance}_i \\times \\text{SoA Completeness (93 Controls)}}{\\text{Major Non-Conformities} + \\text{Unaddressed Auditor Findings}}$$ with continuous third-party surveillance audits.",
    explanation: "This master governance relationship demonstrates that ISO/IEC 27001 certification is not a superficial badge, but a mathematically rigorous management system. True certification integrity requires 100% adherence to all mandatory Clauses 4 through 10, full justification of all 93 Annex A controls in the Statement of Applicability, and zero unaddressed major non-conformities, guaranteeing absolute corporate resilience and legal safe harbor.",
    hint: "Conclude by reviewing how mandatory clauses and SoA completeness guarantee certification integrity.",
    level: "expert",
    codeExample: `// Master Equation of ISO 27001 Certification:
Integrity = (Mandatory_Clauses_4_to_10 * SoA_AnnexA_Controls * Continual_PDCA) / Major_Non_Conformities;
Outcome: 100% Accredited ISO 27001 Certification, Zero Regulatory Fines & Complete Legal Safe Harbor!`
  }
];

export default questions;
