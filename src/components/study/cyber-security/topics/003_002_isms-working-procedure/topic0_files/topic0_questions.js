const questions = [
  {
    question: "What is an Information Security Management System (ISMS), and how does it fundamentally differ from traditional ad-hoc IT security?",
    shortAnswer: "An ISMS is a systematic, risk-driven management framework of policies, processes, people, and technical controls designed to protect information assets continuously; ad-hoc IT security is fragmented, reactive, and focused solely on technical tools without board governance or risk alignment.",
    explanation: "Traditional IT security focuses purely on technical tools (buying firewalls, antivirus, and patching servers) in an uncoordinated, reactive manner. An Information Security Management System (ISMS), formalized under ISO/IEC 27001, is an enterprise-wide management system that integrates business strategy, executive leadership, risk management, legal compliance, and continuous audit into a structured Plan-Do-Check-Act lifecycle.",
    hint: "Think of the difference between buying random fire extinguishers versus designing a comprehensive, certified city fire safety management code.",
    level: "basic",
    codeExample: `// Ad-hoc Security vs Formalized ISMS:
Ad-hoc IT Security:  "IT installed a firewall and hopes nobody clicks malicious links." (Reactive & Uncoordinated)
ISO 27001 ISMS:      "Board-approved policy + Risk Register + 93 Annex A Controls + 24/7 SOC + DPDP Compliance" (Proactive & Governed)`
  },
  {
    question: "What are the core business and operational objectives of implementing an ISMS in a modern enterprise?",
    shortAnswer: "1. Protecting the confidentiality, integrity, and availability of digital assets; 2. Establishing statutory legal safe harbor under the DPDP Act 2023 and IT Act 2000; 3. Minimizing financial breach loss; 4. Building customer and stakeholder trust.",
    explanation: "The primary objectives of an ISMS extend beyond IT hygiene: 1. Strategic Protection: Safeguarding intellectual property, financial data, and customer PII against cyber threats; 2. Regulatory Compliance: Fulfilling statutory duties under the Indian DPDP Act 2023 (Section 8) and IT Act 2000 (Section 43A); 3. Financial Resilience: Reducing Annual Loss Expectancy (ALE); 4. Market Competitiveness: ISO 27001 certification is a prerequisite for enterprise B2B contracts and banking partnerships.",
    hint: "Remember the 4 pillars: CIA asset protection, statutory compliance, risk mitigation, and commercial trust.",
    level: "basic",
    codeExample: `// Strategic ISMS Business Objectives:
1. Asset Security:       Protect ₹500 Crore core transaction switch with 99.999% availability
2. Statutory Defense:    100% Safe Harbor against ₹250 Crore DPDP Act Section 33 penalties
3. Commercial Enabler:   Secure multi-million dollar global B2B FinTech contracts requiring ISO 27001 certification`
  },
  {
    question: "Under the ISO/IEC 27001:2022 standard, what are the two main sections that define an ISMS?",
    shortAnswer: "1. Clauses 4 to 10 (Management System Requirements - Context, Leadership, Planning, Support, Operation, Evaluation, Improvement); 2. Annex A (93 Information Security Controls categorized into 4 themes).",
    explanation: "ISO/IEC 27001:2022 is structured into two mandatory sections: 1. Clauses 4-10: The normative management system clauses that establish governance (Clause 4: Context of Organization, Clause 5: Leadership, Clause 6: Planning & Risk, Clause 7: Support, Clause 8: Operation, Clause 9: Performance Evaluation, Clause 10: Improvement); 2. Annex A: A normative catalog of 93 security controls organized into 4 themes (Organizational, People, Physical, Technological).",
    hint: "Remember the management system clauses (4-10) and the control catalog (Annex A).",
    level: "moderate",
    codeExample: `// ISO/IEC 27001:2022 ISMS Structure:
Part 1: Clauses 4-10 -> Governance & Management Framework (Mandatory for ALL certified firms)
Part 2: Annex A      -> 93 Reference Controls across 4 Themes:
                        - Organizational (37 controls)
                        - People (8 controls)
                        - Physical (14 controls)
                        - Technological (34 controls)`
  },
  {
    question: "What is the 'Risk-Based Approach' in an ISMS, and why is it the core philosophy of ISO 27001?",
    shortAnswer: "A risk-based approach dictates that security controls are selected and budgeted strictly in proportion to identified and evaluated business risks, rather than implementing generic, one-size-fits-all security measures.",
    explanation: "An enterprise cannot afford infinite security controls. Under ISO 27001 Clause 6.1.2, the organization must perform formal Risk Assessment (identifying assets, threats, vulnerabilities, likelihood, and financial impact). Security controls from Annex A are chosen strictly to treat identified risks above the organization's Risk Appetite threshold, ensuring maximum return on security investment (ROSI) without wasting budget on trivial assets.",
    hint: "Think of buying an expensive vault for gold bars while using a simple locked cabinet for office paper.",
    level: "moderate",
    codeExample: `// Risk-Based ISMS Decision Logic:
Asset: Customer Aadhaar Database -> Risk: ₹250 Cr DPDP Breach -> Control: AES-256-GCM + HSM + FIDO2 MFA (High Investment)
Asset: Internal Canteen Menu   -> Risk: ₹0 Financial Loss     -> Control: Standard File Permission (Zero Cost)`
  },
  {
    question: "How does an ISMS establish a legal 'Safe Harbor' defense under Section 43A and Section 85 of the Indian Information Technology Act 2000?",
    shortAnswer: "The SPDI Rules 2011 explicitly recognize an audited ISO/IEC 27001 ISMS as conclusive statutory proof of maintaining 'Reasonable Security Practices', immunizing corporate directors from negligence and personal criminal liability.",
    explanation: "Under Section 43A of the IT Act, a company is liable for damages if negligent in handling sensitive data. However, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011 state that implementing ISO/IEC 27001 is deemed compliant. Under Section 85, holding an active ISMS certification provides conclusive legal proof that corporate directors exercised executive due diligence.",
    hint: "Remember how ISO 27001 serves as a statutory shield in Indian courtrooms.",
    level: "basic",
    codeExample: `// Legal Safe Harbor via ISMS:
Legal Challenge: Cyber breach occurs; prosecutor alleges corporate negligence under IT Act Sec 43A & Sec 85.
Evidence Presented: Certified ISO/IEC 27001:2022 ISMS + Audited Statement of Applicability + CAPA Logs
Judicial Verdict: Enterprise maintained statutory "Reasonable Security Practices" -> Directors Protected!`
  },
  {
    question: "What are the three operational dimensions integrated by an ISMS (The Golden Triangle)?",
    shortAnswer: "People (Culture, training, governance roles), Process (Policies, procedures, risk assessments, audits), and Technology (Encryption, SIEM, firewalls, IAM).",
    explanation: "An ISMS cannot function on technology alone. The three dimensions must operate in harmonic balance: 1. People: Trained security officers, executive sponsors, and an alert Human Firewall; 2. Process: Documented policies, change management, incident escalation workflows, and risk registers; 3. Technology: Cryptographic algorithms, endpoint agents, network segmentation, and automated scanning tools.",
    hint: "Remember the People, Process, and Technology triad.",
    level: "basic",
    codeExample: `// The ISMS Golden Triangle Interlock:
ISMS_Effectiveness = Harmonic_Mean(People_Score, Process_Score, Technology_Score)
// If Process is 0 (no documented incident workflow), overall ISMS effectiveness collapses to 0!`
  },
  {
    question: "What is the role of Top Management and Executive Leadership in an ISMS under ISO 27001 Clause 5?",
    shortAnswer: "Top management must demonstrate active leadership by establishing the Information Security Policy, allocating necessary financial/human resources, appointing an independent CISO, and conducting annual Management Reviews.",
    explanation: "ISO 27001 Clause 5 prohibits delegating security solely to low-level IT staff. Executive leadership and the Board of Directors must: 1. Formally sign and approve the enterprise Information Security Policy; 2. Ensure security objectives align with strategic business goals; 3. Allocate adequate budget for tools and personnel; 4. Assign clear roles and authorities; 5. Review ISMS audit performance annually.",
    hint: "Remember that leadership commitment is mandatory for ISO 27001 certification.",
    level: "moderate",
    codeExample: `// Executive Leadership Mandates (Clause 5):
1. Sign Information Security Policy (Board Approval)
2. Appoint Independent CISO reporting to Board Risk Committee
3. Approve Annual ISMS Budget (CapEx & OpEx)
4. Convene Annual Executive Management Review Meeting`
  },
  {
    question: "How does an ISMS interface with business continuity and disaster recovery frameworks (ISO 22301)?",
    shortAnswer: "An ISMS integrates Business Continuity Planning (BCP) and Disaster Recovery (DR) into Annex A.5.29 and A.5.30, ensuring critical IT services and cryptographic protections continue operating during cyber attacks, natural disasters, or power grid failures.",
    explanation: "Information security is not only about confidentiality; it is equally about Availability. An ISMS defines Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) for all critical information assets. It establishes redundant multi-region architectures, automated database backups, off-site replication, and annual disaster recovery failover simulations.",
    hint: "Think of ensuring the hospital or bank can still operate even if the primary data center loses power.",
    level: "moderate",
    codeExample: `// BCP / DR Metrics in ISMS:
Recovery Time Objective (RTO): 15 Minutes (Maximum tolerable downtime)
Recovery Point Objective (RPO): 0 Seconds (Zero data loss via synchronous database replication)
Failover Drill: Semi-annual unannounced live traffic switchover to secondary cloud region`
  },
  {
    question: "What is an ISMS 'Management Review' (Clause 9.3), and what specific inputs must be evaluated by the Board?",
    shortAnswer: "A formal executive meeting where top management reviews internal/external audit results, risk assessment status, incident trends, non-conformities, CAPA progress, and changes in the regulatory threat landscape.",
    explanation: "Under ISO 27001 Clause 9.3, top management must review the ISMS at planned intervals (at least annually). Mandatory review inputs include: 1. Status of actions from previous reviews; 2. Changes in external/internal context and regulations (e.g. Indian DPDP Act 2023); 3. Feedback on security performance (incident metrics, audit non-conformities, risk assessment results); 4. Opportunities for continual improvement.",
    hint: "Think of an annual board meeting dedicated to auditing security health and signing off on improvements.",
    level: "expert",
    codeExample: `// ISO 27001 Clause 9.3 Management Review Agenda:
1. Review of 2026 Audit Findings & Closed CAPAs
2. Incident Telemetry Review (Average MTTR: 42 seconds)
3. DPDP Act 2023 Compliance & Statutory Penalty Gap Analysis
4. Approval of 2027 ISMS Budget and Strategic Security Roadmap`
  },
  {
    question: "How does an ISMS coordinate with the Indian Computer Emergency Response Team (CERT-In) under Section 70B?",
    shortAnswer: "The ISMS Incident Management Procedure embeds CERT-In's mandatory 6-hour reporting SLA, NTP clock synchronization with Indian Standard Time, and 180-day audit log retention directly into standard operating workflows.",
    explanation: "Under Section 70B of the IT Act, Indian organizations must report 20 categories of cyber incidents within 6 hours. A certified ISMS operationalizes this requirement: when the SIEM or SOC detects a critical ransomware or breach event, automated SOAR playbooks generate pre-formatted CERT-In notification emails to incident@cert-in.org.in within the statutory 6-hour window.",
    hint: "Remember the integration of national 6-hour reporting SLAs into enterprise incident management procedures.",
    level: "basic",
    codeExample: `// CERT-In Integration in ISMS Incident Workflow:
[ SOC Alerts P1 Breach ] ➔ [ Severity Triage (< 15 mins) ] ➔ [ Automated Incident Template Generated ]
                                                                        |
[ CERT-In Escalation ] ⮜--- [ CISO Approval ] ⮜--- [ Sent to incident@cert-in.org.in in < 6 HOURS ]`
  },
  {
    question: "What is the difference between an 'Information Security Management System' (ISMS) and a 'Security Operations Center' (SOC)?",
    shortAnswer: "An ISMS is the overarching governance and policy framework governing the entire organization; a SOC is an operational technical facility that monitors network telemetry and responds to cyber incidents in real time.",
    explanation: "An ISMS is the complete strategic umbrella: it defines policies, risk registers, roles, training, vendor contracts, physical security, and legal compliance. A Security Operations Center (SOC) is a specialized technical component operating within the ISMS Technology and Process dimensions, responsible for 24/7 SIEM monitoring, threat hunting, and initial triage.",
    hint: "Think of the Ministry of Defense (ISMS) versus an active radar watchtower (SOC).",
    level: "basic",
    codeExample: `// ISMS vs SOC Architecture:
ISMS (The Strategic Umbrella):  Board Governance + Risk Policy + ISO 27001 Certification + DPDP Compliance
   └── SOC (Technical Component): 24/7/365 Real-Time SIEM Monitoring + EDR Telemetry + Threat Hunting`
  },
  {
    question: "What are the common causes of ISMS implementation failures in modern enterprises?",
    shortAnswer: "1. Lack of executive leadership commitment; 2. Treating the ISMS as a one-time paper exercise; 3. Failing to integrate security into daily business workflows; 4. Neglecting employee awareness training.",
    explanation: "An ISMS fails when: 1. Management views security as an IT-only nuisance and refuses adequate budget; 2. The organization creates shelfware policies solely to pass an annual audit, ignoring daily enforcement; 3. Controls are overly restrictive, causing employees to bypass them; 4. People are ignored, resulting in high phishing failure rates.",
    hint: "Think of writing a thick rulebook that everyone signs but nobody actually follows.",
    level: "moderate",
    codeExample: `// ISMS Anti-Patterns (Failure Modes):
Anti-Pattern 1: "Shelfware Policies" -> 500-page policy document written in 2020 and never opened again.
Anti-Pattern 2: "IT Silo"            -> CISO has no board access and reports to Junior IT Manager.
Anti-Pattern 3: "Tick-Box Audit"     -> Faking audit logs 2 days before the external ISO auditor arrives!`
  },
  {
    question: "Synthesizing What is an ISMS: what is the master equation of ISMS enterprise resilience?",
    shortAnswer: "$$\\text{ISMS Resilience} = \\frac{\\text{Executive Leadership (Cl 5)} \\times \\text{Risk Rigor (Cl 6)} \\times \\text{Annex A Controls (Cl 8)} \\times \\text{Continual PDCA}}{\\text{Unaddressed Audit Gaps} + \\text{Employee Non-Compliance}}$$ with continuous independent audit verification.",
    explanation: "This master governance relationship proves that an ISMS is a living, multiplying ecosystem. When top management demonstrates active commitment, risk is rigorously evaluated, Annex A controls are systematically deployed, and the PDCA cycle continually remediates audit gaps, the enterprise achieves impenetrable operational resilience and total statutory compliance under global and Indian cyber laws.",
    hint: "Conclude by reviewing how leadership, risk management, and the PDCA cycle multiply to guarantee resilience.",
    level: "expert",
    codeExample: `// Master Equation of ISMS Resilience:
Resilience = (Leadership_Cl5 * Risk_Rigor_Cl6 * AnnexA_Controls * PDCA_Improvement) / Audit_Gaps;
Outcome: 100% ISO 27001 Certification, Zero Statutory Fines & Unshakable Customer Trust!`
  }
];

export default questions;
