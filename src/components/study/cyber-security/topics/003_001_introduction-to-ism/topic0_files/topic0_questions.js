const questions = [
  {
    question: "What is Information Security Management (ISM), and how does it fundamentally differ from traditional ad-hoc IT security?",
    shortAnswer: "ISM is a structured, continuous organizational governance framework aligning people, processes, and technology with business strategy to manage risks and protect information assets; ad-hoc IT security is purely reactive, technical, and tool-centric without executive oversight.",
    explanation: "Traditional IT security focuses narrowly on technical controls (firewalls, antivirus, server patches) implemented reactively by IT staff. Information Security Management (ISM) is a board-level, business-aligned governance discipline. ISM establishes formal policies, conducts structured risk assessments, enforces compliance (ISO 27001, DPDP Act), trains employees, defines incident response procedures, and continually measures security effectiveness against enterprise business goals.",
    hint: "Think of an entire building safety and evacuation protocol versus simply installing a door lock.",
    level: "basic",
    codeExample: `// Ad-hoc IT Security vs Information Security Management (ISM):
Ad-hoc IT Security:  Tool-centric, reactive, uncoordinated, no executive visibility, high breach risk.
Enterprise ISM:      Policy-driven, risk-based, continuous, board-aligned, audits & regulatory compliance (ISO 27001).`
  },
  {
    question: "What are the five core strategic objectives of Information Security Management (ISM)?",
    shortAnswer: "1. Business Alignment; 2. Risk Management; 3. Resource Optimization; 4. Value Delivery; 5. Performance Measurement (KPIs/KRIs).",
    explanation: "Effective ISM is driven by 5 strategic pillars: 1. Business Alignment: Ensuring security initiatives support organizational revenue, operations, and mission; 2. Risk Management: Systematically identifying, evaluating, and mitigating cyber risks to an acceptable level; 3. Resource Optimization: Allocating security investments and specialized personnel efficiently; 4. Value Delivery: Enhancing enterprise reputation, customer trust, and market resilience; 5. Performance Measurement: Tracking quantifiable metrics (MTTD, MTTR, patch compliance, audit findings).",
    hint: "Think of strategic alignment, risk control, smart spending, business value, and measurable scorecards.",
    level: "moderate",
    codeExample: `// 5 Pillars of Strategic ISM:
1. Business Alignment    -> Security enables enterprise growth & digital transformation
2. Risk Management       -> Asset valuation, threat analysis, and risk treatment (ALE/SLE)
3. Resource Optimization -> Maximum ROI on cybersecurity personnel & tools
4. Value Delivery        -> Competitive advantage & unshakeable customer trust
5. Performance Metrics   -> KPIs: MTTD < 15 mins, MTTR < 1 hr, 100% Patch Compliance`
  },
  {
    question: "What are the three fundamental dimensions of Information Security Management, and why is technology alone insufficient?",
    shortAnswer: "The three dimensions are People, Process, and Technology (the Golden Triangle); technology fails if employees click phishing links (People flaw) or if no escalation procedure exists (Process flaw).",
    explanation: "Information security relies on a three-legged stool: 1. People: Security awareness, cyber hygiene, ethical culture, and executive leadership; 2. Process: Documented policies, change management, access reviews, risk assessments, and incident response playbooks; 3. Technology: Firewalls, encryption, SIEM, EDR, and IAM systems. Deploying multi-crore firewall technology is useless if an untrained clerk gives away passwords over the phone or if incident escalation processes are missing.",
    hint: "Recall the classic Golden Triangle of enterprise security management.",
    level: "basic",
    codeExample: `// The ISM Golden Triangle (PPT Framework):
[ People ]    -> Culture, Phishing Awareness, Role-Based Training, Executive Buy-in
[ Process ]   -> ISO 27001 Policies, Change Management, Access Reviews, Incident Playbooks
[ Technology] -> Next-Gen Firewalls, EDR, AES-256 Encryption, SIEM, HSMs
Failure Rule: Compromising ANY single dimension collapses enterprise defense!`
  },
  {
    question: "What is an Information Security Management System (ISMS), and what international standard governs it?",
    shortAnswer: "An ISMS is a systematic approach to managing sensitive company information encompassing people, processes, and IT systems; it is globally standardized under ISO/IEC 27001.",
    explanation: "ISO/IEC 27001:2022 specifies the requirements for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS). An ISMS provides a formal management framework that includes executive leadership commitment, risk assessment methodologies, Statement of Applicability (SoA), mandatory security controls (Annex A), internal audits, and management reviews.",
    hint: "Remember the globally recognized ISO standard for information security management.",
    level: "basic",
    codeExample: `// ISO/IEC 27001:2022 ISMS Framework Architecture:
Clauses 4-10: Context, Leadership, Planning, Support, Operation, Evaluation, Improvement
Annex A:      93 Controls categorized into 4 themes:
              - Organizational Controls (37)
              - People Controls (8)
              - Physical Controls (14)
              - Technological Controls (34)`
  },
  {
    question: "What are the six core functions of the NIST Cybersecurity Framework (CSF 2.0)?",
    shortAnswer: "1. Govern (GV); 2. Identify (ID); 3. Protect (PR); 4. Detect (DE); 5. Respond (RS); 6. Recover (RC).",
    explanation: "Published by the US National Institute of Standards and Technology (NIST) and updated in 2024 to CSF 2.0, the framework organizes cybersecurity activities into six concurrent and continuous functions: 1. Govern: Establishing cybersecurity risk management strategy and policy; 2. Identify: Asset inventory, risk assessment, and supply chain visibility; 3. Protect: Safeguards including access control, data encryption, and awareness; 4. Detect: Monitoring and identifying anomalies and malicious events in real time; 5. Respond: Containment, mitigation, and stakeholder communication during incidents; 6. Recover: Restoring systems, business operations, and implementing lessons learned.",
    hint: "Remember the 6 capitalized verbs that structure the updated NIST CSF 2.0 framework.",
    level: "moderate",
    codeExample: `// NIST CSF 2.0 Core Lifecycle:
[ GOVERN ]   -> Strategy, Policy, Roles & Board Oversight
     |
[ IDENTIFY ] -> Asset Inventory & Risk Assessment
     |
[ PROTECT ]  -> IAM, Zero Trust, Data Encryption & Training
     |
[ DETECT ]   -> 24/7 SOC Monitoring, SIEM & EDR Telemetry
     |
[ RESPOND ]  -> Incident Containment, Eradication & CERT-In Reporting
     |
[ RECOVER ]  -> Business Continuity, Disaster Recovery & Post-Mortem`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, what are the mandatory obligations of a Data Fiduciary regarding Information Security Management?",
    shortAnswer: "Section 8 and Section 33 mandate implementing reasonable technical and organizational security safeguards to prevent data breaches, notifying the Data Protection Board and affected users upon breach, and risking statutory penalties up to ₹250 Crores for failure.",
    explanation: "The DPDP Act 2023 legally elevates ISM from an optional IT practice into a mandatory board-level obligation. Under Section 8(5), Data Fiduciaries must protect personal data in their possession by taking reasonable security safeguards. Under Section 8(6), in the event of a personal data breach, the entity must notify the Data Protection Board of India and each affected individual. Failure to implement reasonable security safeguards attracts statutory fines of up to ₹250 Crores under Section 33 Schedule 1.",
    hint: "Remember the ₹250 Crore penalty and mandatory breach notification requirements under Indian law.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Statutory Compliance Mandate:
Section 8(5): Mandatory Implementation of Reasonable Security Safeguards (Encryption, mTLS, IAM)
Section 8(6): Mandatory Breach Notification to Data Protection Board & Affected Citizens
Section 33:   Financial Penalties up to ₹250 CRORES for Failure to Prevent Security Breaches!`
  },
  {
    question: "Under Section 70B of the Indian Information Technology Act 2000 and CERT-In Cyber Security Directions, what is the mandatory timeline for reporting cybersecurity incidents?",
    shortAnswer: "All service providers, intermediaries, data centers, and corporate entities must mandatorily report specified cybersecurity incidents to CERT-In within 6 hours of noticing or being brought to notice.",
    explanation: "Issued under Section 70B(6) of the Information Technology Act 2000, CERT-In directions mandate that organizations in India must report 20 categories of cybersecurity incidents (including ransomware attacks, data breaches, unauthorized access to critical systems, and DDoS attacks) to CERT-In within 6 hours. This requires organizations to maintain 24/7 SOC incident detection capabilities within their ISM framework.",
    hint: "Remember the 6-hour rapid incident notification window mandated by CERT-In.",
    level: "basic",
    codeExample: `// CERT-In Cyber Security Reporting Rule (IT Act Section 70B):
Incident Detected: 02:00 AM (e.g. Ransomware attack or customer data leak)
Mandatory Action:  File incident report with incident@cert-in.org.in by 08:00 AM (WITHIN 6 HOURS!)
Failure Penalty:   Imprisonment up to 1 year or statutory financial penalties under Section 70B(7).`
  },
  {
    question: "What is the 'Capability Maturity Model Integration' (CMMI) for Information Security Management, and what are its 5 maturity levels?",
    shortAnswer: "CMMI assesses the sophistication of an organization's security processes across 5 levels: Level 1 (Initial/Ad-hoc), Level 2 (Repeatable), Level 3 (Defined), Level 4 (Managed), and Level 5 (Optimizing).",
    explanation: "Security maturity frameworks evaluate how structured and resilient an enterprise is: Level 1 (Initial): Reactive, ad-hoc, chaotic with no formal policies; Level 2 (Repeatable): Basic policies exist for specific projects but lack central coordination; Level 3 (Defined): Organization-wide ISMS with standardized, documented policies and procedures (ISO 27001 ready); Level 4 (Managed): Security is quantitatively measured using KPIs, metrics, and automated risk scoring; Level 5 (Optimizing): Continuous improvement driven by AI threat intelligence, automated red teaming, and predictive defense.",
    hint: "Think of climbing from chaotic firefighting to predictable, quantitatively managed, and self-optimizing security.",
    level: "moderate",
    codeExample: `// 5 Levels of Security Maturity (CMMI):
Level 1 (Initial)    -> Ad-hoc firefighting, zero documentation, extreme breach risk
Level 2 (Repeatable) -> Project-level controls, inconsistent enterprise enforcement
Level 3 (Defined)    -> Enterprise-wide documented ISMS (ISO 27001 Certified)
Level 4 (Managed)    -> Quantitative metrics (KPIs/KRIs), automated SOC telemetry
Level 5 (Optimizing) -> AI threat hunting, automated SOAR, continuous adaptive hardening`
  },
  {
    question: "What is the difference between a Key Performance Indicator (KPI) and a Key Risk Indicator (KRI) in Information Security Management?",
    shortAnswer: "A KPI measures how effectively security operations are functioning (e.g. 98% of systems patched within 7 days); a KRI provides an early warning indicator of increasing threat exposure or probability of future breach (e.g. 40% increase in failed VPN login attempts).",
    explanation: "In ISM governance: KPIs are backward-looking or operational efficiency metrics that track security performance against targets (e.g. Mean Time to Detect - MTTD, Mean Time to Remediate - MTTR, employee phishing simulation pass rates). KRIs are forward-looking risk metrics that alert management to escalating danger before a catastrophe occurs (e.g. number of unpatched critical CVEs older than 30 days, spike in privileged access grant requests, vendor security rating downgrades).",
    hint: "Contrast measuring current speed (KPI) versus measuring engine temperature warning lights (KRI).",
    level: "moderate",
    codeExample: `// KPI vs KRI Comparison:
Security KPI (Operational):  Mean Time to Remediate (MTTR) critical vulnerabilities = 4.2 hours (Target < 6h)
Security KRI (Early Warning): Number of privileged accounts without MFA = 12 (High risk of imminent breach!)`
  },
  {
    question: "What is the role of the Chief Information Security Officer (CISO) in modern enterprise governance, and to whom should the CISO ideally report?",
    shortAnswer: "The CISO is the executive responsible for enterprise-wide security strategy, risk governance, and regulatory compliance; ideally reporting directly to the CEO or Board of Directors to eliminate conflicts of interest with IT operations.",
    explanation: "Historically, security managers reported to the Chief Information Officer (CIO). However, this creates a fundamental conflict of interest: the CIO is measured on IT uptime, speed, and cost efficiency, while security controls often introduce friction and rigor. Modern corporate governance standards (and RBI regulations in India) mandate that the CISO operate independently, reporting directly to the Chief Executive Officer (CEO), the Chief Risk Officer (CRO), or the Board's Risk Committee.",
    hint: "Think of an independent corporate auditor who must not report to the person being audited.",
    level: "moderate",
    codeExample: `// Modern CISO Corporate Governance Hierarchy:
[ Board of Directors / Risk Committee ]
                   |
       [ Chief Executive Officer (CEO) ]
             /                   \\
   [ Chief Information Officer ]   [ Chief Information Security Officer (CISO) ]
   (Focus: IT Speed & Uptime)       (Focus: Risk, Compliance & Asset Protection)
   Outcome: Zero conflict of interest; independent security oversight!`
  },
  {
    question: "What is the 'Three Lines of Defense' (3LoD) governance model in enterprise Information Security Management?",
    shortAnswer: "1st Line: Operational IT and business units (owns and manages risk); 2nd Line: CISO and Risk/Compliance functions (oversees and sets policies); 3rd Line: Internal Audit (provides independent assurance to the Board).",
    explanation: "The Institute of Internal Auditors (IIA) 3LoD model establishes clear boundaries: 1st Line of Defense: System administrators, software developers, and business unit managers who operate systems and directly enforce security controls; 2nd Line of Defense: The CISO, security architects, and compliance officers who establish frameworks, monitor policies, and facilitate risk assessments; 3rd Line of Defense: Internal Audit team, reporting independently to the Board Audit Committee, reviewing both 1st and 2nd lines for objective compliance.",
    hint: "Think of the players on the field, the team coaches setting the strategy, and the independent referee.",
    level: "expert",
    codeExample: `// The Three Lines of Defense (3LoD) Model:
1st Line (Operations):   DevOps, SysAdmins, DBAs -> Directly implement controls & patch systems
2nd Line (Governance):   CISO Office, Risk & Compliance -> Author policies, monitor SIEM, run audits
3rd Line (Assurance):    Internal Audit Team -> Independent objective evaluation reporting to the Board`
  },
  {
    question: "Why is an Information Asset Register (IAR) the non-negotiable prerequisite for implementing any Information Security Management framework?",
    shortAnswer: "You cannot protect what you do not know you own; an IAR catalogues all enterprise data, hardware, software, and personnel assets along with their business owners, locations, and classification levels.",
    explanation: "Before an organization can conduct risk assessments, apply encryption, or enforce access controls, it must know exactly what assets exist. An Information Asset Register (IAR) catalogues: 1. Asset identification and description; 2. Asset Owner (business executive responsible for the asset); 3. Asset Custodian (technical team maintaining it); 4. Information Classification (Public, Internal, Confidential, Restricted); 5. Physical/Cloud location; 6. Legal and regulatory dependencies (e.g. stores Aadhaar/PAN data under DPDP Act).",
    hint: "Think of taking a complete inventory of your house before buying insurance or locks.",
    level: "basic",
    codeExample: `// Information Asset Register (IAR) Schema:
Asset ID:     AST-FIN-042
Asset Name:   Core Banking PostgreSQL Database Cluster
Asset Owner:  Chief Financial Officer (CFO)
Custodian:    Lead Database Administrator (DBA)
Classification: RESTRICTED / HIGHLY CONFIDENTIAL (Contains Customer PAN & Account Balances)
Compliance:   RBI Master Direction, DPDP Act 2023 Section 33, PCI-DSS v4.0`
  },
  {
    question: "Synthesizing Information Security Management: what is the master equation of enterprise cyber risk governance?",
    shortAnswer: "$$\\text{Enterprise Security Posture} = \\frac{\\text{Governance} \\times \\text{Risk Management} \\times (\\text{People} + \\text{Process} + \\text{Technology})}{\\text{Threat Exposure} \\times \\text{Systemic Vulnerabilities}}$$ with continuous improvement via the PDCA cycle.",
    explanation: "This master governance relationship demonstrates that enterprise security resilience is not an IT product you buy, but an ongoing management discipline. Maximizing executive governance, rigorous risk treatment, and balanced investment across People, Process, and Technology minimizes risk exposure. Maintaining continuous monitoring and incident readiness protects shareholder value, customer privacy, and ensures compliance with statutory mandates like the Indian DPDP Act 2023.",
    hint: "Conclude by reviewing how executive governance and balanced investment overpower cyber threats.",
    level: "expert",
    codeExample: `// Master Equation of Information Security Management:
Resilience = (Executive_Governance * Risk_Control * (People + Process + Technology)) / Total_Threat_Surface;
Outcome: 100% Sustainable Enterprise Protection & Statutory Compliance!`
  }
];

export default questions;
