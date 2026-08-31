const questions = [
  {
    question: "What is the ISMS Scope Definition under ISO/IEC 27001:2022 Clause 4.3, and why is an ambiguous scope fatal to enterprise cybersecurity?",
    shortAnswer: "The ISMS Scope explicitly defines the physical, logical, human, and legal boundaries of the management system; an ambiguous or artificially restricted scope creates unmonitored blind spots where critical assets leak without governance.",
    explanation: "Under Clause 4.3, the organization must formally document the boundaries and applicability of the ISMS. The scope must consider internal/external context, interested party requirements, and interfaces with third parties. If an organization scopes only its corporate website while excluding its core payment backend ('Scope Slicing'), the resulting ISO 27001 certificate is meaningless, leaving production customer databases vulnerable to ₹250 Crore DPDP penalties.",
    hint: "Think of locking the front door of a house while leaving the garage and back windows wide open.",
    level: "basic",
    codeExample: `// Valid vs Defective ISMS Scope:
Defective (Scope Slicing): "ISMS covers only the marketing website hosted on WordPress." (Core backend excluded!)
Valid Enterprise Scope:   "ISMS covers all UPI payment microservices, AWS cloud infrastructure, PostgreSQL databases, and employee endpoints at Kolkata FinTech."`
  },
  {
    question: "What is the Statement of Applicability (SoA) under ISO/IEC 27001:2022 Clause 6.1.3(d), and why is it the core artifact of a certification audit?",
    shortAnswer: "The SoA is a mandatory document detailing which of the 93 Annex A controls are applicable, the justification for their inclusion, their implementation status, and the formal justification for any excluded controls.",
    explanation: "An organization cannot claim compliance without an audited Statement of Applicability. The SoA acts as the master contract between the organization and external auditors. For all 93 controls across the 4 themes (Organizational, People, Physical, Technological), the SoA documents: 1. Applicable (Yes/No); 2. Justification for inclusion (e.g. Risk treatment, DPDP Act Section 8); 3. Implementation status; 4. Justification for exclusion (e.g. excluding physical turnstiles for a 100% remote firm).",
    hint: "Think of an itemized manifest accounting for every safety mechanism on an aircraft.",
    level: "basic",
    codeExample: `// Statement of Applicability (SoA) Entry:
Control ID:    A.8.11 (Data Masking)
Applicable:    YES
Justification: Risk Treatment (Mitigates ₹250 Cr Aadhaar leak risk) + DPDP Act Section 8(5)
Status:        IMPLEMENTED (PostgreSQL Dynamic Data Masking on all PAN/Aadhaar columns)
Document Ref:  POL-SEC-08 (Cryptographic & Masking Standard v2.4)`
  },
  {
    question: "What are the four dimensional boundaries that must be considered when defining the ISMS Scope under Clause 4.3?",
    shortAnswer: "1. Physical Boundaries (Offices, data centers); 2. Logical/Network Boundaries (VPCs, subnets, databases); 3. Organizational/Human Boundaries (Departments, contractors); 4. Legal/Regulatory Boundaries (DPDP Act, RBI directions).",
    explanation: "Comprehensive scoping requires evaluating: 1. Physical: Corporate headquarters, secondary disaster recovery data centers, and remote employee workstations; 2. Logical: Cloud tenancies (AWS/Azure/GCP), API gateways, Kubernetes clusters, and storage volumes; 3. Human: Full-time employees, third-party software developers, and custodial staff; 4. Regulatory: Statutory obligations under the Indian DPDP Act 2023 and CERT-In directions.",
    hint: "Remember the 4 dimensions: Physical, Logical, People, and Laws.",
    level: "moderate",
    codeExample: `// 4-Dimensional ISMS Scope Architecture:
Physical:    Kolkata Head Office + Barrackpore Secondary Data Center
Logical:     AWS ap-south-1 Production VPC (Payment Switch + S3 Clusters)
Human:       250 Engineering, DevOps, Support Staff & Third-Party Contractors
Regulatory:  DPDP Act 2023, IT Act Section 70B, and RBI Master Direction`
  },
  {
    question: "Under what conditions is an organization legally and procedurally permitted to exclude an Annex A control from its Statement of Applicability?",
    shortAnswer: "A control can be excluded ONLY if a formal risk assessment demonstrates zero applicable risk AND the exclusion does not violate statutory legal regulations, industry mandates, or contractual agreements.",
    explanation: "An enterprise cannot exclude controls simply because they are difficult, expensive, or inconvenient to implement. Under ISO 27001 Clause 6.1.3(d), every exclusion must have a rigorous, documented justification. For example: A 100% cloud-native SaaS firm with no physical offices or server rooms can legitimately exclude A.7.1 (Physical Security Perimeters) because physical hardware is managed by AWS under shared responsibility.",
    hint: "Think of proving that you don't need snow tires because you operate exclusively in the tropical desert.",
    level: "moderate",
    codeExample: `// Valid Control Exclusion in SoA:
Control ID:    A.7.1 (Physical Security Perimeters)
Applicable:    NO
Justification: The organization is 100% cloud-native with all staff operating remotely. Physical data center security is fully delegated to AWS (SOC 2 Type II / ISO 27001 Certified under Shared Responsibility Model).`
  },
  {
    question: "What is 'Scope Slicing', and why do external certification auditors issue Major Non-Conformities when they detect it?",
    shortAnswer: "Scope slicing is the deceptive practice of defining an artificially narrow ISMS scope to exclude complex, insecure, or legacy systems; auditors reject it because the excluded systems still pose severe operational and legal risks to the enterprise.",
    explanation: "If a bank defines its ISMS scope as only the 'Marketing and HR Department' while excluding its core online banking switch and payment gateway, the resulting ISO 27001 certificate is deceptive. External auditors examine system interfaces and data flows: if un-scoped legacy servers share network connections or credentials with scoped systems, the auditor will mandate expanding the scope or issue a Major Non-Conformity.",
    hint: "Think of certifying a car as safe while excluding the brakes and steering wheel from the inspection.",
    level: "expert",
    codeExample: `// Auditor Detection of Scope Slicing:
Claimed Scope:  "Internal Corporate Wiki and HR Portal"
Auditor Check:  Discovers HR Portal connects directly to Production Customer DB via shared VPN!
Auditor Action: MAJOR NON-CONFORMITY! (Clause 4.3 Scope Misrepresentation - Certification Denied)`
  },
  {
    question: "How does the Statement of Applicability (SoA) bridge the gap between Clause 6.1.2 (Risk Assessment) and Annex A controls?",
    shortAnswer: "The Risk Assessment identifies asset risks; the Risk Treatment Plan selects controls to mitigate those risks; the SoA compiles all selected controls, compares them against Annex A's 93 controls to ensure no gaps exist, and justifies the baseline.",
    explanation: "Clause 6.1.3 requires the organization to produce an SoA to ensure that no necessary security controls have been inadvertently overlooked. By comparing the controls chosen during risk treatment against the universal 93 Annex A catalog, the organization verifies complete coverage. The SoA provides a single consolidated matrix proving how every identified threat is mitigated by specific technical, physical, or organizational controls.",
    hint: "Think of matching your diagnosed illnesses (risks) against the hospital pharmacy inventory (Annex A controls).",
    level: "moderate",
    codeExample: `// Risk Assessment to SoA Traceability:
Risk Register Entry: RR-09 (Ransomware lateral movement across payment switch)
Treatment Decision:  MITIGATE via Network Segmentation & Immutable Archival
SoA Mapping:         Controls A.8.20 (Network Security) + A.8.22 (Segregation of Networks) + A.5.30 (ICT Readiness)
Status in SoA:       IMPLEMENTED & AUDITED`
  },
  {
    question: "How does an audited Statement of Applicability (SoA) serve as a legal shield under Section 43A of the Indian Information Technology Act 2000?",
    shortAnswer: "The SoA provides itemized, timestamped, and auditable proof that the enterprise implemented comprehensive technical and organizational safeguards, establishing conclusive proof of 'Reasonable Security Practices' in court.",
    explanation: "In civil litigation following a data breach, courts demand proof of corporate due diligence. Under Section 43A and the SPDI Rules 2011, producing an audited ISO 27001 Statement of Applicability proves that every aspect of sensitive personal data protection (encryption A.8.24, masking A.8.11, DLP A.8.12) was formally evaluated, budgeted, and actively monitored by the CISO office.",
    hint: "Remember how the SoA proves due diligence in Indian judicial proceedings.",
    level: "basic",
    codeExample: `// Judicial Defense via SoA:
Plaintiff Claim: "Enterprise was negligent in protecting customer PAN numbers."
Defense Evidence: Produces ISO 27001 SoA showing Control A.8.11 (Data Masking) and A.8.24 (Crypto) were actively enforced.
Judicial Finding: Corporate entity demonstrated statutory reasonable security practices → Claim dismissed!`
  },
  {
    question: "What role do 'Interfaces and Dependencies' play in defining the ISMS Scope under Clause 4.3?",
    shortAnswer: "Interfaces and dependencies define where the enterprise connects with external third parties, cloud providers, and partner APIs; security controls must govern data at these boundary crossings.",
    explanation: "An organization does not exist on an isolated island. Under Clause 4.3, the scope must document external dependencies: payment gateways connecting to NPCI (UPI switches), third-party SaaS customer support tools (Zendesk), and cloud infrastructure (AWS). The ISMS must enforce controls at these boundary interfaces (e.g. mTLS encryption, API authentication, and vendor risk management under A.5.19).",
    hint: "Think of securing the entry gates, bridges, and delivery docks connecting a castle to the outside kingdom.",
    level: "moderate",
    codeExample: `// Documenting Interfaces in ISMS Scope:
Interface 1: Core Payment Gateway ➔ National Payments Corporation of India (NPCI) via mTLS 1.3
Interface 2: Customer Support Portal ➔ Third-Party SaaS CRM via OAuth 2.0 & Field-Level Masking
Control:     Annex A.5.19 (Information Security in Supplier Relationships) mandatory in SoA!`
  },
  {
    question: "Why must the Statement of Applicability (SoA) be maintained as a 'Living Document' rather than a static audit snapshot?",
    shortAnswer: "Whenever the organization adopts new cloud services, encounters new threats, updates software architecture, or complies with new statutory laws, the SoA must be updated to reflect revised control applicability.",
    explanation: "An SoA authored in 2023 is invalid in 2026 if the enterprise migrated to microservices, adopted generative AI, or became subject to the Indian DPDP Act 2023. Whenever a significant architectural or regulatory change occurs, the CISO must re-run risk assessments and update the SoA, presenting the revised version to executive leadership during the annual Management Review (Clause 9.3).",
    hint: "Think of an updated passport that must reflect every new visa and border crossing.",
    level: "basic",
    codeExample: `// SoA Version History Lifecycle:
v1.0 (2024): Initial ISO 27001:2013 certification (114 controls)
v2.0 (2025): Upgraded to ISO 27001:2022 (93 controls + 11 new controls)
v2.1 (2026): Updated for DPDP Act Section 8 (Added A.8.10 Information Deletion & A.8.11 Data Masking)`
  },
  {
    question: "What are the core technical fields required in a professional Statement of Applicability (SoA) table?",
    shortAnswer: "1. Control Identifier (e.g. A.8.24); 2. Control Name; 3. Applicable (Yes/No); 4. Justification for Inclusion/Exclusion; 5. Implementation Status; 6. Documented Policy Reference; 7. Control Owner.",
    explanation: "A compliant SoA table must be comprehensive and unambiguous. For all 93 controls, it must list: 1. ISO Control Number and Title; 2. Applicability status; 3. Explicit rationale (Risk mitigation, legal/contractual duty); 4. Current deployment state (Implemented, In Progress); 5. Internal policy/standard link (e.g. POL-IAM-04); 6. Designated executive owner (e.g. Lead Cryptographic Architect).",
    hint: "Remember: Number, Name, Yes/No, Why, Status, Policy Link, and Owner.",
    level: "basic",
    codeExample: `// Compliant SoA Table Row:
| Control ID | Title               | Applicable | Justification               | Status      | Policy Reference | Owner    |
|------------|---------------------|------------|-----------------------------|-------------|------------------|----------|
| A.8.12     | Data Leak Prevention| YES        | DPDP Sec 8 + Risk RR-14     | IMPLEMENTED | POL-DLP-02       | CISO     |`
  },
  {
    question: "How does the 'Shared Responsibility Model' in public cloud (AWS, Azure, GCP) impact the ISMS Scope and SoA?",
    shortAnswer: "The cloud provider manages physical hardware, hypervisors, and data center perimeters (delegated in SoA); the customer remains 100% responsible for data classification, IAM, encryption, OS patching, and network configurations in the ISMS scope.",
    explanation: "When hosting systems in AWS or Azure, the organization cannot claim it has no control over security. In the SoA: 1. Physical controls (A.7) cite the cloud provider's ISO 27001 / SOC 2 certification as evidence; 2. Technological controls (A.8.24 Encryption, A.8.5 IAM, A.8.9 Configuration) must be actively implemented and audited by the customer enterprise.",
    hint: "Think of renting an apartment: the landlord maintains the building walls and roof, but you are responsible for locking your front door and securing your valuables.",
    level: "moderate",
    codeExample: `// Shared Responsibility in Cloud SoA:
Control A.7.1 (Physical Security): Delegated to AWS (AWS SOC 2 Type II Report on file)
Control A.8.24 (Encryption):       Customer Responsibility → AES-256-GCM enforced via AWS KMS by Mamata`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why must the ISMS Scope include all databases processing digital personal data?",
    shortAnswer: "Under Section 2(t) and Section 8, any digital personal data processed by a Data Fiduciary is subject to statutory fiduciary duties; omitting PII databases from the ISMS scope exposes the enterprise to direct penalties up to ₹250 Crores under Section 33.",
    explanation: "The DPDP Act 2023 applies to all digital personal data processed within Indian territory. If an enterprise defines its ISMS scope to exclude secondary customer marketing databases or legacy KYC archives, a breach in those un-scoped systems will trigger maximum statutory liability. Complete scope coverage ensures automated data masking (A.8.11), DLP (A.8.12), and information deletion (A.8.10) protect all citizen data.",
    hint: "Remember that Indian data privacy law applies across all corporate databases without exception.",
    level: "basic",
    codeExample: `// DPDP Scope Mandate:
Data Type: Customer Mobile Numbers, Aadhaar KYC, Transaction Records
Legal Status: Personal Data under DPDP Act 2023 Section 2(t)
ISMS Scope Mandate: MUST be included in ISMS Scope with Control A.8.11 (Masking) & A.8.10 (Deletion) active!`
  },
  {
    question: "Synthesizing ISMS Scope Definition and Statement of Applicability: what is the master equation of SoA governance completeness?",
    shortAnswer: "$$\\text{SoA Completeness} = \\frac{\\sum_{i=1}^{93} (\\text{Applicability}_i \\times \\text{Justification}_i \\times \\text{Policy Reference}_i)}{\\text{Unjustified Exclusions} + \\text{Un-scoped PII Databases}}$$ with continuous internal audit verification.",
    explanation: "This master governance relationship proves that an ISMS Statement of Applicability is an exhaustive, mathematically verifiable matrix. Every single one of the 93 Annex A controls must have explicit applicability determination, rigorous justification, and documented policy evidence. Zero unjustified exclusions and complete inclusion of all PII assets guarantees 100% audit accreditation and total statutory safe harbor.",
    hint: "Conclude by reviewing how 93-control justification and complete PII scoping eliminate audit non-conformities.",
    level: "expert",
    codeExample: `// Master Equation of SoA Governance:
Completeness = (93_Controls_Justified * Policy_Traceability * DPDP_Scope_Inclusion) / Unjustified_Gaps;
Outcome: 100% ISO 27001 Audit Success, Zero Unprotected Assets & Absolute Legal Safe Harbor!`
  }
];

export default questions;
