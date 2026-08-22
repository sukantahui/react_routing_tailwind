const questions = [
  {
    question: "What is the foundational definition of Information Security Risk, and how does the equation 'Risk = Threat x Vulnerability x Impact' model cybersecurity exposure?",
    shortAnswer: "Risk is the potential that a given threat will exploit vulnerabilities of an asset or group of assets and thereby cause harm to the organization; modeled as the product of Threat probability/capability, Vulnerability severity, and Asset business impact.",
    explanation: "Security risk cannot exist in a vacuum. A severe vulnerability (e.g. unpatched software) carries zero risk if no threat exists or if the asset has zero value. Conversely, an active threat actor causes zero risk if systems have no exploitable vulnerabilities. Eliminating or reducing any of the three factors (mitigating vulnerability via patching, reducing threat exposure, or safeguarding asset impact) lowers overall risk.",
    hint: "Remember the 3 pillars: Threat (actor/event), Vulnerability (flaw/gap), and Asset Impact (value at stake).",
    level: "basic",
    codeExample: `// Fundamental Risk Calculation Model:
Risk_Score = Threat_Likelihood * Vulnerability_Severity * Asset_Impact;
Example:
Threat (Ransomware gang = 0.8) * Vulnerability (Unpatched SMB = 0.9) * Impact (₹10 Cr Core DB = 10)
➔ Risk Score = 0.8 * 0.9 * 10 = 7.2 (CRITICAL RISK ➔ Immediate Treatment Required!)`
  },
  {
    question: "What is the difference between an Asset, a Threat, and a Vulnerability under ISO/IEC 27005:2022?",
    shortAnswer: "An Asset is anything having value to the organization; a Threat is a potential cause of an incident resulting in harm; a Vulnerability is a weakness or flaw in an asset or control that can be exploited by a threat.",
    explanation: "ISO 27005 establishes clear taxonomy: 1. Asset: Primary assets (customer PII, business processes) and Supporting assets (servers, databases, network switches); 2. Threat: Threat actors (APT groups, rogue insiders, hacktivists) or environmental events; 3. Vulnerability: Missing patches, weak passwords, unencrypted storage, or missing background checks.",
    hint: "Asset = What you protect; Threat = Who/what can harm it; Vulnerability = The door left unlocked.",
    level: "basic",
    codeExample: `// ISO 27005 Taxonomy Example:
Asset:         Oracle Database storing 500,000 credit card records (₹50 Cr Value)
Vulnerability: CVE-2026-1234 SQL Injection flaw in unpatched web checkout service
Threat:        External cybercriminal syndicate attempting automated credential harvesting`
  },
  {
    question: "What is the difference between Inherent Risk and Residual Risk?",
    shortAnswer: "Inherent Risk is the raw, unmitigated level of risk present before any security controls are applied; Residual Risk is the remaining risk after implementing technical and organizational security countermeasures.",
    explanation: "Organizations must measure risk before and after applying defenses. The relationship is: Residual Risk = Inherent Risk - Control Effectiveness. For example, storing plaintext patient data on a public server has an Inherent Risk score of 9.5 (Critical). After implementing AES-256 encryption, MFA, and ZTNA firewalls, the Residual Risk drops to 1.8 (Low), which falls within acceptable limits.",
    hint: "Inherent = Risk before controls; Residual = Risk leftover after controls.",
    level: "basic",
    codeExample: `// Inherent vs Residual Risk Relationship:
Inherent_Risk  = Threat * Vulnerability * Impact;                  // Score = 9.2 (Critical)
Countermeasure = Deploy Cloudflare WAF + AWS KMS AES-256 + MFA;    // Reduces Vulnerability
Residual_Risk  = Inherent_Risk - Control_Mitigation_Offset;        // Score = 1.4 (Acceptable)`
  },
  {
    question: "What is 'Risk Appetite', and how does it differ from 'Risk Tolerance' in enterprise governance?",
    shortAnswer: "Risk Appetite is the broad aggregate amount and type of risk an organization's Board of Directors is willing to accept in pursuit of strategic goals; Risk Tolerance is the acceptable level of variation around specific tactical targets.",
    explanation: "Risk appetite is set at the executive apex (e.g. 'Zero appetite for customer data breaches, but moderate appetite for cloud innovation risks'). Risk tolerance defines the tactical boundaries (e.g. 'Downtime on payment switch must not exceed 0.01%, but sandbox testing servers can tolerate up to 4 hours of downtime per month').",
    hint: "Appetite is the board's strategic hunger/limit; Tolerance is the tactical margin of error.",
    level: "moderate",
    codeExample: `// Enterprise Risk Appetite Statement:
Board Mandate:   "Zero tolerance for any unencrypted customer PII or unpatched Critical CVEs > 14 days."
Risk Threshold:  Any asset with Residual Risk Score > 4.0 must be escalated to the CISO within 24 hours.`
  },
  {
    question: "What are the 6 core stages of the Information Security Risk Management lifecycle under ISO/IEC 27005:2022?",
    shortAnswer: "1. Context Establishment; 2. Risk Identification; 3. Risk Analysis; 4. Risk Evaluation; 5. Risk Treatment; 6. Risk Monitoring and Review (with ongoing Communication & Consultation).",
    explanation: "ISO 27005 provides a structured cyclical workflow: 1. Context: Defining scope, criteria, and legal obligations; 2. Identification: Cataloging assets, threats, vulnerabilities, and controls; 3. Analysis: Determining likelihood and consequence; 4. Evaluation: Comparing risk scores against board risk criteria; 5. Treatment: Selecting controls (Mitigate, Transfer, Avoid, Accept); 6. Monitoring: Continuous tracking of threat changes.",
    hint: "Remember the 6 steps: Context ➔ Identify ➔ Analyze ➔ Evaluate ➔ Treat ➔ Monitor.",
    level: "moderate",
    codeExample: `// ISO 27005 Risk Management Workflow:
Context Establishment ➔ Define ISMS Scope & Legal Baselines (DPDP / IT Act)
Risk Assessment       ➔ Identification ➔ Analysis (Likelihood x Consequence) ➔ Evaluation
Risk Treatment        ➔ Mitigate (Controls) / Transfer (Insurance) / Avoid / Accept
Continuous Monitoring ➔ Quarterly Review + Clause 9.3 Management Review`
  },
  {
    question: "How does NIST SP 800-30 Rev 1 structure the Risk Assessment Process for Federal and Commercial Information Systems?",
    shortAnswer: "NIST SP 800-30 Rev 1 structures risk assessments into 4 iterative steps: 1. Prepare for Assessment; 2. Conduct Assessment; 3. Communicate Results; 4. Maintain Assessment.",
    explanation: "NIST SP 800-30 is the gold-standard risk assessment methodology: Step 1 (Prepare): Identify purpose, scope, assumptions, and threat sources; Step 2 (Conduct): Identify threat events, vulnerabilities, determine likelihood and impact, and calculate risk; Step 3 (Communicate): Share risk findings with executive decision-makers; Step 4 (Maintain): Monitor risk factors continuously over time.",
    hint: "Prepare ➔ Conduct ➔ Communicate ➔ Maintain.",
    level: "moderate",
    codeExample: `// NIST SP 800-30 Rev 1 Execution Steps:
Step 1: Identify Threat Sources (Nation-state APTs, Cybercriminals, Insiders)
Step 2: Identify Threat Events (Ransomware detonation, BGP hijacking, SQL injection)
Step 3: Determine Likelihood (High = 10, Med = 5, Low = 1) x Impact (Catastrophic = 100)
Step 4: Generate Risk Assessment Report (RAR) for Authorizing Official (AO)`
  },
  {
    question: "What is a 'Data Protection Impact Assessment' (DPIA), and when is it mandatory under Section 8 of the Indian DPDP Act 2023?",
    shortAnswer: "A DPIA is a formal risk assessment evaluating the impact of data processing activities on individual privacy; mandatory for Significant Data Fiduciaries (SDFs) prior to deploying high-risk processing, AI algorithms, or large-scale personal data processing.",
    explanation: "Under the DPDP Act 2023, organizations processing sensitive citizen data at scale must conduct a DPIA. The DPIA identifies potential risks of data leakage, unauthorized profiling, or algorithmic bias, and defines mandatory safeguards (dynamic masking, encryption, access controls) to minimize residual risk before systems go live.",
    hint: "A specialized risk assessment focused specifically on citizen privacy and data protection.",
    level: "moderate",
    codeExample: `// DPDP Act Section 8 DPIA Register:
Project:         AI-Driven Credit Scoring Engine (Processing 2,000,000 KYC records in Kolkata)
Privacy Risk:    Algorithmic bias + unauthorized secondary use of Aadhaar numbers
Mitigation:      Dynamic PII pseudonymization + Differential Privacy noise injection
Residual Risk:   Low (Approved by Data Protection Officer Mahima)`
  },
  {
    question: "What is the role of the Board-Level Risk Management Committee under Reserve Bank of India (RBI) Cyber Security Guidelines?",
    shortAnswer: "The committee is responsible for approving enterprise cyber risk appetite, reviewing quarterly risk registers, allocating security budgets, and ensuring executive accountability for cyber resilience.",
    explanation: "The RBI mandates that cybersecurity risk cannot be treated as a low-level IT operational issue. Commercial banks, NBFCs, and payment system operators in India must establish a Board-Level Risk Management Committee that reviews top residual risks every 90 days, ensures compliance with RBI Cyber Resilience directions, and approves major risk treatment strategies.",
    hint: "Executive board members hold direct legal accountability for cyber risk oversight.",
    level: "basic",
    codeExample: `// RBI Cyber Risk Governance Hierarchy:
Board of Directors ➔ Board Risk Management Committee (BRMC)
       ||
CISO (Chief Information Security Officer) ➔ Information Security Steering Committee (ISSC)
       ||
SOC & Risk Analysts ➔ Daily Threat Monitoring & Risk Register Maintenance`
  },
  {
    question: "What is 'Risk Acceptance' (ISO 27005 Clause 9), and what conditions must be satisfied before a risk can be formally accepted?",
    shortAnswer: "Risk acceptance is a formal executive decision to retain a specific residual risk without further mitigation; requires written justification, alignment with risk appetite, formal sign-off by the CISO/Board, and scheduled re-evaluation.",
    explanation: "Eliminating 100% of risk is economically impossible. If mitigating a ₹50,000 risk costs ₹10,00,000 in software licenses, executive leadership may accept the risk. However, risk acceptance cannot be informal: the asset owner and CISO must sign a formal Risk Acceptance Form detailing the business justification, compensatory controls, and an expiry date (maximum 12 months).",
    hint: "Accepting a risk requires formal written sign-off from top executives, not verbal agreement.",
    level: "basic",
    codeExample: `// Formal Risk Acceptance Memo (ISO 27005):
Risk ID:         RSK-2026-44 (Legacy internal inventory server lacks TLS 1.3 support)
Residual Score:  2.1 (Low Risk - Isolated behind internal VLAN 40)
Mitigation Cost: ₹15,00,000 (Requires total ERP code rewrite)
Approved By:     CISO Sukanta Hui | Expiration Date: 2027-08-23 (Subject to annual review)`
  },
  {
    question: "What is a 'Threat Agent' vs a 'Threat Vector' in risk identification?",
    shortAnswer: "A Threat Agent (Threat Source) is the individual, group, or entity initiating the harmful action (e.g. nation-state hacker, disgruntled employee); a Threat Vector is the path or mechanism used to deliver the attack (e.g. spear-phishing email, unpatched VPN port).",
    explanation: "In risk assessment, distinguishing between the actor and the pathway is essential: 1. Threat Agent: Cybercriminal syndicate; 2. Threat Vector: Phishing email carrying a weaponized macro; 3. Vulnerability: User clicking without macro-blocking enabled; 4. Impact: Ransomware encryption of accounting databases.",
    hint: "Agent is the attacker; Vector is the vehicle/weapon they use.",
    level: "basic",
    codeExample: `// Threat Anatomy Breakdown:
Threat Agent:  APT29 (Nation-State Cyber Espionage Group)
Threat Vector: Supply-chain Trojan injected into third-party software update
Vulnerability: Lack of cryptographic code signature validation on client endpoints`
  },
  {
    question: "How does the 'Context Establishment' phase of ISO 27005 define the criteria for risk evaluation?",
    shortAnswer: "It establishes external parameters (laws, industry regulations, market conditions) and internal parameters (business objectives, organizational structure, risk appetite thresholds) to ensure consistent risk scoring.",
    explanation: "Before assessing risk, an organization must define what 'High Impact' means. For a small startup in Barrackpore, a ₹10 Lakh loss might be Catastrophic (Score 5), while for a major bank in Kolkata, a ₹10 Lakh loss is Minor (Score 1). Context establishment standardizes likelihood and consequence scales so all departments evaluate risk against the same corporate benchmarks.",
    hint: "Setting the rules and measuring tape before measuring the building.",
    level: "moderate",
    codeExample: `// Risk Evaluation Criteria Matrix:
Consequence Level 5 (Catastrophic): Financial loss > ₹10 Crores OR DPDP Act regulatory shutdown
Consequence Level 3 (Moderate):     Financial loss ₹10 Lakhs - ₹1 Crore OR temporary customer disruption
Consequence Level 1 (Insignificant):Financial loss < ₹50,000 OR zero public impact`
  },
  {
    question: "Why must Information Security Risk Assessments be updated continuously rather than once every three years?",
    shortAnswer: "Because threat landscapes, software vulnerabilities (over 25,000 new CVEs discovered annually), cloud architectures, and legal regulations (like DPDP Act 2023) evolve constantly; outdated risk assessments leave organizations blind to emerging zero-day threats.",
    explanation: "A static risk assessment conducted 3 years ago does not account for modern threats like AI-powered spear-phishing or newly discovered cloud misconfigurations. ISO 27001 Clause 9.3 and ISO 27005 mandate continuous risk reviews: assessments must be refreshed annually, after any major architectural change, or following a significant security incident.",
    hint: "New threats appear every single day; yesterday's risk assessment is obsolete tomorrow.",
    level: "basic",
    codeExample: `// Continuous Risk Assessment Triggers:
1. Periodic Review:     Mandatory 100% risk register review every 12 months
2. Trigger-Based:       Immediate assessment within 7 days of migrating to AWS EKS
3. Incident-Triggered:  Mandatory risk re-evaluation following any SEV-1 incident`
  },
  {
    question: "Synthesizing Fundamentals of Information Security Risk Management: what is the master equation of Enterprise Risk Optimization?",
    shortAnswer: "$$\\text{Enterprise Resilience} = \\frac{\\text{Threat Intelligence} \\times \\text{Vulnerability Mitigation} \\times \\text{ISO 27005 Governance}}{\\text{Inherent Risk} - \\text{Residual Risk Target}} \\ge \\text{Board Risk Appetite}$$ with continuous ISO/IEC 27001 Clause 6.1 risk assessment validation.",
    explanation: "This master governance relationship proves that enterprise cybersecurity resilience is optimized when threat visibility, proactive vulnerability remediation, and structured ISO 27005 governance drive residual risk below the board's approved risk appetite. This eliminates catastrophic operational disruption and guarantees unshakeable statutory compliance under global and Indian cyber laws.",
    hint: "Conclude by reviewing how threat insight, vulnerability patching, and risk governance keep residual risk below appetite.",
    level: "expert",
    codeExample: `// Master Equation of Enterprise Risk Optimization:
Resilience = (Threat_Intel * Vulnerability_Fix_Speed * ISO27005_Rigor) / (Inherent_Risk - Residual_Risk);
Condition:   Residual_Risk <= Board_Risk_Appetite;
Outcome:     100% Risk Defensibility, Zero Un-approved Exposures & Complete Regulatory Safe Harbor!`
  }
];

export default questions;
