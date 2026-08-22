const questions = [
  {
    question: "What are the 4 fundamental Risk Treatment Strategies under ISO/IEC 27005:2022 and ISO 31000?",
    shortAnswer: "1. Risk Mitigation (Reduction: Applying technical/administrative controls); 2. Risk Transfer (Sharing: Cyber insurance & vendor contracts); 3. Risk Avoidance (Termination: Discontinuing the risky activity); 4. Risk Acceptance (Retention: Formally acknowledging residual risk within appetite).",
    explanation: "Once risks are analyzed and evaluated, organizations must select an appropriate treatment: 1. Mitigate: Deploy WAF, MFA, or encryption to reduce likelihood/impact; 2. Transfer: Purchase cyber insurance or enforce vendor indemnification; 3. Avoid: Refuse to store sensitive credit card data locally by using tokenization; 4. Accept: Formally approve residual risk with signed executive justification when mitigation cost exceeds asset value.",
    hint: "Remember the 4 options: Mitigate (Reduce), Transfer (Share), Avoid (Stop), Accept (Retain).",
    level: "basic",
    codeExample: `// 4-Pillar Risk Treatment Strategy Matrix:
Risk 1 (Ransomware Threat):        TREATMENT: MITIGATE ➔ Deploy Immutable S3 Backups & EDR
Risk 2 (Catastrophic Cloud Loss):  TREATMENT: TRANSFER ➔ Purchase ₹50 Crore Cyber Insurance Policy
Risk 3 (Unencrypted Legacy Telnet):TREATMENT: AVOID    ➔ Decommission Telnet completely; switch to SSH
Risk 4 (Low-Impact Test Server):   TREATMENT: ACCEPT   ➔ CISO signed formal 12-month Risk Acceptance Memo`
  },
  {
    question: "What is Risk Mitigation (Risk Reduction), and what are the 3 tiers of security controls deployed?",
    shortAnswer: "Risk Mitigation is the application of safeguards to lower the likelihood or impact of a threat; deployed across Technical controls (ciphers, firewalls), Administrative controls (policies, training), and Physical controls (biometrics, guards).",
    explanation: "Mitigation is the most common risk treatment. Under ISO 27001 Clause 6.1.3, organizations map risks to Annex A controls: 1. Technical: AES-256 encryption, Zero Trust micro-segmentation, and EDR agents; 2. Administrative: Acceptable Use Policies (AUP) and background verification checks; 3. Physical: Mantrap airlocks and biometric fingerprint scanners at data center perimeters.",
    hint: "Reducing risk using technical locks, written policies, and physical doors.",
    level: "basic",
    codeExample: `// Risk Mitigation Control Suite (ISO 27001 Annex A):
Technical:      Deploy AWS WAF rate-limiting rules on payment checkout API (A.8.20)
Administrative: Mandate annual SETA employee anti-phishing training (A.6.3)
Physical:       Enforce dual-custody biometric locks at Kolkata FinTech Data Center (A.7.2)`
  },
  {
    question: "What is Risk Transfer (Risk Sharing), and why can an organization transfer financial risk but NOT legal or reputational accountability?",
    shortAnswer: "Risk Transfer shifts financial loss to a third party (via Cyber Insurance or vendor indemnification); however, under Indian law (DPDP Act and IT Act), the Data Fiduciary remains strictly legally accountable to regulators and the public for data breaches.",
    explanation: "Buying a ₹50 Crore cyber insurance policy ensures the insurance underwriter reimburses the company for forensic fees, ransomware extortion, and regulatory fines. However, when 1,000,000 citizen records leak, the company cannot tell the Data Protection Board of India (DPBI) or affected customers to sue the insurance company—the corporate entity retains 100% legal responsibility.",
    hint: "Insurance pays the financial bills, but the company's name stays on the police report and headlines.",
    level: "moderate",
    codeExample: `// Risk Transfer & Accountability Boundary:
Financial Risk (Transferred): HDFC ERGO Cyber Insurance covers ₹20 Crores in forensic fees & business interruption.
Legal Liability (Retained):   Company Directors remain strictly liable under Section 85 of IT Act and DPDP Act Section 8!`
  },
  {
    question: "What is Risk Avoidance (Risk Elimination), and how does Payment Tokenization illustrate this strategy?",
    shortAnswer: "Risk Avoidance eliminates risk completely by stopping the high-risk business activity or removing the vulnerable asset; Tokenization avoids credit card storage risk by delegating card data handling to third-party PCI-DSS gateways.",
    explanation: "Storing raw 16-digit credit card numbers and CVVs locally carries massive regulatory and breach risks. By implementing payment tokenization, the merchant's servers never touch or store raw cardholder data—the customer enters data directly into a PCI-DSS Level 1 gateway (e.g. Razorpay / Stripe), and the merchant receives an opaque token. The risk of card theft on local servers is 100% avoided.",
    hint: "If you do not store the gold, thieves cannot rob your store for gold.",
    level: "basic",
    codeExample: `// Risk Avoidance via Payment Tokenization:
Risky Practice: Storing raw PAN ` + "`4111-2222-3333-4444`" + ` in local MySQL database ➔ Massive Breach Risk!
Avoidance Rule: Use Razorpay Checkout ➔ Local DB stores only opaque token ` + "`tok_9a8b7c`" + ` ➔ Zero Card Storage Risk!`
  },
  {
    question: "What is Risk Acceptance (Risk Retention), and what mandatory governance steps are required under ISO 27005 Clause 9?",
    shortAnswer: "Risk acceptance is a formal executive decision to retain residual risk without further mitigation; requires written business justification (cost exceeds benefit), CISO/Board sign-off, compensatory monitoring, and scheduled annual re-evaluation.",
    explanation: "Eliminating all risk is impossible. When mitigating a ₹20,000 risk costs ₹5 Lakhs, leadership may accept it. However, risk acceptance can never be informal or verbal: the asset owner and CISO must sign a formal Risk Acceptance Form detailing why controls were not implemented, establishing compensatory monitoring, and setting a mandatory expiration date (maximum 12 months).",
    hint: "Accepting risk requires signed executive accountability and a 12-month expiration timer.",
    level: "moderate",
    codeExample: `// Formal Risk Acceptance Memo (ISO 27005):
Risk ID:         RSK-2026-89 (Legacy internal training server lacks TLS 1.3 support)
Residual Score:  2.4 (Low Risk - Isolated behind internal VLAN 50)
Mitigation Cost: ₹12,00,000 (Requires total rewrite of legacy PHP app)
Approved By:     CISO Sukanta Hui | Expiration Date: 2027-08-23 (Mandatory annual review)`
  },
  {
    question: "What is a Risk Treatment Plan (RTP) under ISO/IEC 27001:2022 Clause 6.1.3?",
    shortAnswer: "A documented operational roadmap detailing how every evaluated risk will be treated, including chosen treatment strategies, assigned control owners, target implementation deadlines (SLAs), and post-treatment residual risk scores.",
    explanation: "The RTP bridges risk assessment and security engineering. Under Clause 6.1.3, for every risk that exceeds the board's risk appetite, the RTP defines: 1. Risk Description & ID; 2. Treatment Strategy (Mitigate/Transfer/Avoid/Accept); 3. Selected Annex A Controls; 4. Assigned Implementation Owner; 5. Target Completion Date; 6. Expected Residual Risk Score.",
    hint: "The master project plan specifying who fixes which risk, how, and by what deadline.",
    level: "basic",
    codeExample: `// Risk Treatment Plan (RTP) Entry:
Risk ID:        RSK-CLOUD-04 (Unencrypted S3 buckets exposed to internet)
Strategy:       MITIGATE
Annex A Control:A.8.10 (Information Deletion) & A.8.24 (Use of Cryptography)
Assigned Owner: Lead DevOps Engineer Mamata
Deadline:       2026-09-15 (30-Day SLA)
Target Residual:Low (Score: 1.2)`
  },
  {
    question: "How does the Statement of Applicability (SoA - Clause 6.1.3d) relate directly to the Risk Treatment Plan (RTP)?",
    shortAnswer: "The SoA documents all 93 ISO 27001 Annex A controls, stating whether each is included or excluded; controls selected in the RTP to treat risks form the primary justification for their inclusion in the SoA.",
    explanation: "The RTP and SoA work in tandem: when the RTP decides to treat a data exfiltration risk by deploying Data Leakage Prevention (DLP), Control A.8.12 is marked as 'INCLUDED' in the SoA with the justification 'Required by RTP Risk RSK-09'. Conversely, if no risk in the RTP requires physical incinerators, Control A.7.14 is marked 'EXCLUDED' with written rationale.",
    hint: "RTP selects the controls to fix risks; SoA lists and justifies all 93 controls for auditors.",
    level: "moderate",
    codeExample: `// SoA Justification Linked to RTP:
Control:       A.8.12 (Data Leakage Prevention)
Status:        INCLUDED
Justification: Mandatory mitigation selected in RTP (Risk RSK-DATA-02: Employee exfiltration of customer PII)`
  },
  {
    question: "Under the Indian DPDP Act 2023, what risk treatment strategy is legally mandated when personal data processing poses disproportionate risks to citizen privacy?",
    shortAnswer: "Risk Avoidance (discontinuing or refusing to launch non-essential high-risk data processing activities) or Risk Mitigation (implementing mandatory privacy-by-design, dynamic data masking, and crypto-shredding).",
    explanation: "Under Section 8 of the DPDP Act 2023, Data Fiduciaries cannot simply 'accept' high privacy risks or attempt to transfer them via disclaimers. If a processing activity poses severe unmitigated privacy risks to children or biometric databases, the organization must avoid the activity or implement rigorous mitigation safeguards to prevent ₹250 Crore penalties under Section 33.",
    hint: "Fiduciaries must avoid non-essential risky processing or strongly mitigate personal data risks.",
    level: "basic",
    codeExample: `// DPDP Privacy Risk Treatment Decision:
Proposed Project: Scraping public social media photos for AI facial recognition training
DPIA Finding:     Disproportionate constitutional privacy harm violating DPDP Section 8
Treatment:        RISK AVOIDANCE ➔ Project cancelled completely; zero data scraped!`
  },
  {
    question: "What are the primary coverage areas of an Enterprise Cyber Insurance Policy in India under IRDAI guidelines?",
    shortAnswer: "1. First-Party Losses (Incident response, forensic investigation, data restoration, business interruption, extortion negotiation); 2. Third-Party Liabilities (Legal defense, customer settlement funds, regulatory investigation defense).",
    explanation: "Under Insurance Regulatory and Development Authority of India (IRDAI) frameworks, cyber insurance policies provide comprehensive transfer of financial risk: First-party coverage compensates the company for lost operating profits during a DDoS attack and pays external forensic teams; Third-party coverage indemnifies the firm against customer class-action lawsuits following a credential breach.",
    hint: "First-party covers your own business recovery costs; Third-party covers customer lawsuits and legal defense.",
    level: "moderate",
    codeExample: `// Cyber Insurance Policy Structure (HDFC ERGO / ICICI Lombard):
Section A (First-Party):  ₹10 Crores coverage for forensic response, data recovery & business downtime
Section B (Third-Party):  ₹15 Crores coverage for customer privacy lawsuits & legal defense counsel
Annual Premium:          ₹14.5 Lakhs / year`
  },
  {
    question: "What is 'Compensatory Control', and when is it required during Risk Acceptance?",
    shortAnswer: "An alternative, temporary security safeguard deployed to reduce exposure when a primary standard control cannot be implemented due to legacy system constraints or technical limitations.",
    explanation: "If a legacy industrial SCADA controller cannot support modern TLS 1.3 encryption, the organization cannot leave it exposed on the network. A compensatory control is implemented: placing the legacy RTU behind an isolated physical VLAN with IPsec tunneling and strict firewall geofencing. This allows executive risk acceptance while keeping residual risk within acceptable boundaries.",
    hint: "A backup temporary safeguard deployed when the standard primary fix cannot be installed.",
    level: "moderate",
    codeExample: `// Compensatory Control Architecture:
Primary Requirement: Enforce TLS 1.3 encryption on SCADA RTU controller (Impossible: Legacy firmware)
Compensatory Control: Isolate RTU behind hardware IPsec VPN Gateway + Restrict access to single jump host
Outcome:              Residual risk reduced to Low; CISO approves 12-month Risk Acceptance.`
  },
  {
    question: "Why is 'Risk Ignoring' or 'Risk Blindness' NOT a legitimate risk treatment strategy?",
    shortAnswer: "Because ignoring known risks represents organizational negligence; it provides zero control, leaves the enterprise vulnerable to catastrophic compromise, and eliminates statutory Safe Harbor protections under IT Act Section 43A and DPDP Act Section 8.",
    explanation: "Unethical or untrained managers sometimes confuse 'Risk Acceptance' with simply doing nothing and ignoring a vulnerability. True Risk Acceptance requires formal analysis, documented executive sign-off, and justification against board risk appetite. Ignoring a known CVE is gross negligence, stripping the company of legal safe harbor and exposing directors to personal liability under Section 85.",
    hint: "Doing nothing is negligence, not risk management.",
    level: "basic",
    codeExample: `// Negligence vs Formal Risk Acceptance:
Gross Negligence: Sysadmin sees Critical CVE, ignores it, documents nothing ➔ ₹250 Cr DPDP Fine!
Risk Acceptance:  CISO analyzes flaw, documents compensatory controls, signs formal 12-month waiver ➔ Defensible!`
  },
  {
    question: "What is the recommended frequency for reviewing and updating the enterprise Risk Treatment Plan (RTP)?",
    shortAnswer: "Semi-annually or quarterly for active remediation projects; annually for all risks during the ISO 27001 Clause 9.3 Management Review; and immediately following any major security incident or IT architectural transformation.",
    explanation: "An RTP is a dynamic living document. As developers deploy patches and DevOps engineers configure firewalls, risk scores change. Regular reviews verify that assigned control owners meet their remediation SLAs, re-evaluate expired risk acceptances, and ensure residual risk remains permanently below the board's risk appetite.",
    hint: "Review quarterly during project rollouts, and annually with top management.",
    level: "basic",
    codeExample: `// RTP Governance Review Cycle:
Active Projects: Quarterly SLA verification by CISO Office
Management Review: Annual formal sign-off by Board of Directors (Clause 9.3)
Incident Trigger: Immediate re-evaluation following any SEV-1 cyber breach`
  },
  {
    question: "Synthesizing Risk Treatment Strategies: what is the master equation of Risk Treatment Optimization?",
    shortAnswer: "$$\\text{Treatment Defensibility} = \\frac{\\text{Mitigation Rigor} + \\text{Insurance Transfer} + \\text{Process Avoidance}}{\\text{Un-approved Risk Acceptance} + \\text{Un-treated Exposures}} \\ge 1.0$$ with continuous ISO 27001 Clause 6.1.3 validation.",
    explanation: "This master governance relationship proves that an organization's security posture is optimized when every identified risk is systematically treated through robust technical mitigation, strategic cyber insurance transfer, or business process avoidance. Eliminating un-approved informal risk acceptance guarantees 100% audit defensibility, resilient operations, and total statutory safe harbor.",
    hint: "Conclude by reviewing how combining mitigation, insurance transfer, and avoidance neutralizes un-treated exposures.",
    level: "expert",
    codeExample: `// Master Equation of Risk Treatment Governance:
Treatment_Score = (Mitigation_Controls + Insurance_Transfer + Process_Avoidance) / (Informal_Acceptance + Gaps);
Condition:       Treatment_Score >= 1.0 (100% of Risks Systematically Treated);
Outcome:         100% Audit Conformance, Defensible Operations & Total Statutory Safe Harbor!`
  }
];

export default questions;
