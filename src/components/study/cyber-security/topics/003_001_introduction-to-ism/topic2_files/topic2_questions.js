const questions = [
  {
    question: "What is the primary difference between operational security goals and strategic information security goals?",
    shortAnswer: "Operational security goals focus on immediate technical metrics (e.g. patching servers within 7 days, blocking malware); strategic security goals align security with long-term enterprise mission, revenue growth, risk appetite, and regulatory compliance (e.g. enabling digital banking, achieving ISO 27001).",
    explanation: "Operational security is tactical and short-term: configuring firewalls, analyzing SIEM alerts, and closing vulnerability tickets. Strategic information security is executive and long-term (3-5 year horizon): establishing governance frameworks, defining organizational risk appetite, integrating security into business product roadmaps, protecting brand equity, ensuring compliance with the DPDP Act 2023, and measuring performance via Balanced Scorecards.",
    hint: "Contrast tactical day-to-day firefighting with 3-to-5 year executive business roadmaps.",
    level: "basic",
    codeExample: `// Operational vs Strategic Security Goals:
Operational (Tactical): Close 50 Jira CVE tickets this sprint; patch firewall firmware.
Strategic (Executive):  Align ISMS with ISO 27001 to unlock ₹50 Cr European banking market while maintaining DPDP compliance.`
  },
  {
    question: "What is the 'Information Security Balanced Scorecard' (BSC), and what are its four traditional perspectives?",
    shortAnswer: "The Balanced Scorecard is a strategic management tool measuring security performance across four balanced dimensions: 1. Financial; 2. Customer & Stakeholder; 3. Internal Business Processes; 4. Learning and Growth.",
    explanation: "Pioneered by Kaplan and Norton and adapted for security by ISACA, the Security Balanced Scorecard prevents over-focusing on purely technical or financial metrics: 1. Financial Perspective: Return on Security Investment (ROSI), budget utilization, loss prevention; 2. Customer Perspective: Privacy protection, customer trust index, SLA delivery; 3. Internal Processes: Vulnerability remediation time (MTTR), incident detection (MTTD), patch velocity; 4. Learning & Growth: Security awareness pass rates, employee cyber hygiene, security team certifications.",
    hint: "Remember the 4 balanced perspectives: money, customers, operational processes, and staff growth.",
    level: "moderate",
    codeExample: `// The 4 Perspectives of Security Balanced Scorecard (BSC):
1. Financial:        ROSI = +420% | Cyber Insurance Premium Reduction = 18%
2. Customer/Privacy: Zero DPDP Violations | 99.99% Privacy Consent Compliance
3. Internal Process: MTTD < 12 minutes | MTTR < 45 minutes | 100% Zero-Trust mTLS
4. Learning & Growth: 96% Phishing Simulation Pass Rate | 100% Staff Trained`
  },
  {
    question: "What is the difference between 'Risk Capacity', 'Risk Appetite', 'Risk Tolerance', and 'Residual Risk' in enterprise security governance?",
    shortAnswer: "Risk Capacity is the maximum loss an enterprise can bear without collapsing; Risk Appetite is the amount of risk the Board is willing to accept to pursue goals; Risk Tolerance is acceptable operational variation around appetite; Residual Risk is the risk remaining after controls are applied ($Residual \\le Tolerance \\le Appetite$).",
    explanation: "1. Risk Capacity: The absolute maximum threshold of loss an organization can endure before facing insolvency or license revocation; 2. Risk Appetite: The broad level of risk the Board of Directors formally approves in pursuit of its business mission (e.g. 'Zero tolerance for unencrypted customer financial data'); 3. Risk Tolerance: The tactical, measurable deviation allowed around risk appetite (e.g. 'Critical vulnerabilities must be patched within 48 hours, with up to 72 hours allowed for complex clusters'); 4. Residual Risk: The remaining risk after controls are deployed ($Inherent - Controls$). Governance rule: $\\text{Residual Risk} \\le \\text{Risk Appetite} < \\text{Risk Capacity}$.",
    hint: "Think of maximum structural load (capacity), the chosen speed limit (appetite), acceptable momentary speeding (tolerance), and actual driving risk (residual).",
    level: "expert",
    codeExample: `// The Hierarchy of Enterprise Risk Thresholds:
[ Risk Capacity ]  → ₹100 Crore Max Loss (Exceeding this causes bankruptcy)
      |
[ Risk Appetite ]  → ₹5 Crore Target Risk (Approved by Board of Directors)
      |
[ Risk Tolerance ] → ₹6 Crore Operational Threshold (Allowable tactical variance)
      |
[ Residual Risk ]  → ₹3.2 Crore Actual Measured Risk (STABLE: Residual < Tolerance < Appetite)`
  },
  {
    question: "What is a 'Risk Appetite Statement', and why must it be formally approved by the Board of Directors?",
    shortAnswer: "A Risk Appetite Statement is a formal board-approved document defining the types and amounts of cyber risk the enterprise is willing to accept; board approval ensures legal accountability and aligns security investments with executive business strategy.",
    explanation: "Security teams cannot guess how much risk the company should take. A formal Risk Appetite Statement articulates executive boundaries across various risk domains: e.g., zero tolerance for customer PII breaches (DPDP Act compliance), low tolerance for core transaction system outages, and moderate tolerance for experimental internal sandbox environments. Approved by the Board's Risk Committee, it provides clear mandates for the CISO to make defensible security decisions.",
    hint: "Think of an official board resolution defining how much financial and reputational risk the company will take.",
    level: "moderate",
    codeExample: `// Sample Enterprise Risk Appetite Statement:
"Kolkata FinTech has ZERO APPETITE for unencrypted personal data in transit or at rest.
All critical payment microservices must maintain residual risk below Level 2 (Low).
The CISO is authorized to halt any deployment that violates this threshold."
Approved by: Board of Directors & Risk Committee`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, how do the core data principles (Purpose Limitation, Data Minimization, Storage Limitation) shape enterprise security goals?",
    shortAnswer: "Section 8 requires processing personal data only for specified user-consented purposes (Purpose Limitation), collecting only the minimum necessary data (Data Minimization), and permanently erasing data once the purpose is served (Storage Limitation), preventing unmanaged data buildup.",
    explanation: "Under the DPDP Act 2023, an enterprise cannot hoard infinite customer data. Strategic ISM must align with statutory principles: 1. Purpose Limitation: Data collected for KYC cannot be silently used for marketing analytics; 2. Data Minimization: Asking only for mandatory fields, reducing breach blast radius; 3. Storage Limitation: Implementing automated data retention and secure erasure policies under Section 8(7). Enforcing these principles directly mitigates ₹250 Crore statutory penalty exposures under Section 33.",
    hint: "Remember the three core data lifecycle principles: collect only what you need, use it only for stated purposes, and delete it when done.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Core Data Principles:
1. Purpose Limitation: Use Aadhaar/PAN ONLY for transaction validation (No unauthorized profiling)
2. Data Minimization:  Do NOT collect user GPS or contacts if not required for service
3. Storage Limitation: Automatically purge transaction logs after statutory 5-year retention`
  },
  {
    question: "What is a '3-Year Strategic Information Security Roadmap', and how does it bridge the gap between current maturity and target state?",
    shortAnswer: "A 3-Year Security Roadmap is a multi-phase strategic plan that conducts gap analysis against an established framework (e.g. ISO 27001), prioritizes security initiatives, schedules budget allocations, and systematically elevates organizational maturity over 36 months.",
    explanation: "A strategic roadmap moves an enterprise from current baseline to target resilience across defined horizons: Year 1 (Foundational): Asset discovery, IAM, mandatory MFA, basic EDR, and policy baselines (CMMI Level 2); Year 2 (Systemic): Full ISO 27001 ISMS certification, Zero Trust microsegmentation, automated SIEM/SOAR, and vendor risk audits (CMMI Level 3-4); Year 3 (Optimized): AI threat hunting, automated red teaming, continuous adaptive trust, and industry threat intelligence sharing (CMMI Level 5).",
    hint: "Think of a phased construction blueprint for a skyscraper: foundation first, structure second, advanced smart systems third.",
    level: "moderate",
    codeExample: `// 3-Year Strategic Security Roadmap:
Year 1 (Foundation): Asset Inventory (IAR) + MFA + EDR + DPDP Baseline (CMMI Level 2)
Year 2 (Governance): ISO 27001 Certification + Zero Trust mTLS + 24/7 SOC (CMMI Level 3)
Year 3 (Optimization): AI Threat Hunting + Automated SOAR + Red Teaming (CMMI Level 4/5)`
  },
  {
    question: "What is 'Inherent Risk' versus 'Residual Risk', and what is the formula connecting them?",
    shortAnswer: "$$\\text{Residual Risk} = \\text{Inherent Risk} - \\text{Effectiveness of Security Controls}$$ Inherent risk is the raw risk before any safeguards; Residual risk is the leftover risk that the business must manage.",
    explanation: "Inherent Risk is the raw, untamed level of risk present in an asset or activity assuming zero security controls exist (e.g. exposing an unpatched payment API to the public internet carries an inherent risk of ₹50 Crores). When security controls are applied (WAF, mTLS, encryption, MFA, 24/7 monitoring) reducing risk by 90%, the remaining ₹5 Crore exposure is the Residual Risk. Strategic ISM ensures that Residual Risk stays strictly below the Board's approved Risk Appetite.",
    hint: "Contrast the danger of driving without brakes or seatbelts (inherent) versus driving with all safety features active (residual).",
    level: "moderate",
    codeExample: `// Inherent vs Residual Risk Calculation:
Inherent Risk:       ₹50,00,00,000 (Raw exposure of public payment API)
Control Mitigation:  92% (WAF + Rate Limiting + Mutual TLS + EDR)
Residual Risk:       ₹50,00,00,000 * (1 - 0.92) = ₹4,00,00,000
Board Risk Appetite: ₹5,00,00,000
Verdict:             COMPLIANT (Residual Risk < Risk Appetite)`
  },
  {
    question: "What are the four recognized Risk Treatment strategies in enterprise Information Security Management?",
    shortAnswer: "1. Risk Mitigation (Reduction); 2. Risk Transfer (Sharing); 3. Risk Avoidance; 4. Risk Acceptance.",
    explanation: "Once risks are quantified, management chooses one of 4 strategies: 1. Risk Mitigation (Reduction): Deploying technical and organizational controls (e.g. firewalls, encryption, training) to lower risk probability or impact; 2. Risk Transfer (Sharing): Transferring financial risk to third parties via cyber insurance or outsourcing with contractual indemnity; 3. Risk Avoidance: Terminating or eliminating the risky activity entirely (e.g. deciding not to store credit card data directly to eliminate PCI-DSS scope); 4. Risk Acceptance: Formally acknowledging and absorbing the residual risk when control costs exceed asset value, signed off by executive leadership.",
    hint: "Remember the 4 T's: Treat (Mitigate), Transfer, Terminate (Avoid), and Tolerate (Accept).",
    level: "basic",
    codeExample: `// The 4 Risk Treatment Strategies:
1. Mitigate: Deploy AES-256 encryption to lower data breach probability
2. Transfer: Purchase ₹20 Crore Cyber Insurance policy to cover extortion losses
3. Avoid:    Decommission legacy Windows 2003 server to eliminate unpatchable exploits
4. Accept:   Accept ₹50,000 residual risk on low-priority test sandbox (Signed by CISO)`
  },
  {
    question: "Under the Information Technology Act 2000 Section 70 and Section 70A, what are the strategic security obligations for Critical Information Infrastructure (CII) in India?",
    shortAnswer: "Entities operating CII (power grids, telecom, banking, defense) must designate systems as Protected Systems, comply with NCIIPC 40-control guidelines, enforce air-gapped SCADA isolation, and report to the National Critical Information Infrastructure Protection Centre (NCIIPC).",
    explanation: "Section 70 of the IT Act defines Critical Information Infrastructure as any computer resource whose incapacitation would have a debilitating impact on national security, economy, public health, or safety. Section 70A establishes the NCIIPC as the national nodal agency. Protected Systems (such as 220kV power grid SCADA networks or national payment switches) must adhere to mandatory NCIIPC guidelines: hardware security tokens, air-gapped jump hosts, continuous audit trails, and strict prohibition of unauthorized foreign components.",
    hint: "Remember the apex national body and protected system classification under Indian law.",
    level: "expert",
    codeExample: `// Indian Critical Information Infrastructure (CII) Governance:
Apex Regulator:      National Critical Information Infrastructure Protection Centre (NCIIPC)
Protected Sectors:   Power & Energy, Banking & FinTech, Telecom, Transport, Defense, e-Governance
Mandatory Controls:  Air-gapped SCADA, FIPS 140-3 HSMs, Zero Unauthorized Foreign Firmware
Penalty for Breach:  Imprisonment up to 10 years under IT Act Section 70(3)!`
  },
  {
    question: "How does the 'Security Strategy Alignment Model' ensure that cybersecurity initiatives enable business agility rather than hindering it?",
    shortAnswer: "By embedding security into early stages of product development (DevSecOps / Security by Design), establishing automated guardrails, and treating security as a feature that unlocks enterprise customer trust.",
    explanation: "Historically, security was a late-stage gatekeeper that blocked software releases, creating friction with developers and sales teams. Strategic alignment replaces gatekeeping with enablement: 1. DevSecOps: Automated SAST/DAST security scanning built into CI/CD pipelines so developers get instant feedback without delays; 2. Pre-approved Architecture Patterns: Providing pre-vetted cloud templates with built-in encryption and IAM; 3. Business Enabler: Positioning compliance (ISO 27001, SOC 2) as a sales asset that shortens enterprise procurement cycles.",
    hint: "Think of racecar brakes: brakes do not just slow the car down; they allow the driver to drive much faster with confidence.",
    level: "moderate",
    codeExample: `// Security as a Business Accelerator (DevSecOps):
Legacy Security (Friction):   Manual 4-week security review before every release → Blocks innovation!
Strategic Security (Enabler): Automated CI/CD security guardrails (SAST + Container scan in 60s) → Daily safe releases!`
  },
  {
    question: "What is a 'Security Risk Register', and why is it an essential tool for tracking strategic information security goals?",
    shortAnswer: "A Risk Register is a centralized repository documenting all identified cyber risks, their inherent severity, assigned risk owners, selected treatment plans, and resulting residual risk scores.",
    explanation: "A Risk Register provides executive visibility into enterprise threat posture: 1. Risk ID and Description; 2. Asset Affected; 3. Threat and Vulnerability source; 4. Inherent Risk Score ($Likelihood \\times Impact$); 5. Risk Owner (Business Executive accountable for the risk); 6. Treatment Plan (Mitigate, Transfer, Accept, Avoid); 7. Target Remediation Date; 8. Residual Risk Score post-treatment. The Risk Register is reviewed quarterly by the Board Risk Committee.",
    hint: "Think of an official medical chart tracking all diagnoses, treatments, and recovery milestones.",
    level: "basic",
    codeExample: `// Enterprise Security Risk Register Schema:
Risk ID:        RSK-2026-089
Description:    Unpatched Apache Log4j vulnerability in payment analytics microservice
Asset:          Payment Transaction Processing Cluster
Inherent Score: CRITICAL (Likelihood: 4, Impact: 5 = 20/25)
Risk Owner:     VP of Engineering
Treatment:      Mitigate (Upgrade Log4j to v2.22 + Deploy WAF virtual patch)
Target Date:    2026-08-25 (Within 48 hours)
Residual Score: LOW (Likelihood: 1, Impact: 2 = 2/25)`
  },
  {
    question: "What is 'Continuous Security Monitoring' (CSM), and how does it support the strategic goal of operational resilience?",
    shortAnswer: "CSM maintains ongoing real-time awareness of vulnerabilities, system configurations, and network telemetry to rapidly detect, contain, and adapt to emerging threats across 24/7/365 operations.",
    explanation: "Annual audits and quarterly penetration tests provide only snapshot visibility. Attackers exploit newly discovered zero-day vulnerabilities in hours. Continuous Security Monitoring (CSM / NIST SP 800-137) utilizes automated EDR, SIEM telemetry, cloud configuration posture management (CSPM), and threat intelligence feeds to monitor security controls in real time, ensuring that deviations from baseline configurations are detected and remediated within minutes.",
    hint: "Contrast taking an annual health physical exam versus wearing a continuous heart rate and vital signs monitor.",
    level: "moderate",
    codeExample: `// Snapshot Audits vs Continuous Security Monitoring (CSM):
Annual Audit:     Audited in January → Vulnerability introduced in March → Discovered in December (9 MONTHS OF EXPOSURE!)
Continuous CSM:   Vulnerability introduced at 10:00 AM → EDR detects at 10:02 AM → Automated isolation at 10:05 AM!`
  },
  {
    question: "Synthesizing Strategic Goals of Information Security: what is the master alignment formula of sustainable cybersecurity governance?",
    shortAnswer: "$$\\text{Strategic Resilience} = \\frac{\\text{Business Strategy} \\cap \\text{Regulatory Compliance} \\cap \\text{Risk Appetite}}{\\text{Residual Risk}} \\times \\text{Balanced Scorecard Performance}$$ with continuous improvement.",
    explanation: "This master relationship demonstrates that successful Information Security Management is not an isolated technical endeavor, but the harmonic alignment of business strategy, regulatory mandates (DPDP Act 2023 / IT Act), and board-approved risk appetite. By continually measuring performance across the Balanced Scorecard, organizations achieve sustained operational resilience, competitive market trust, and total protection of enterprise assets.",
    hint: "Conclude by reviewing how business strategy, regulations, and risk appetite converge to create resilience.",
    level: "expert",
    codeExample: `// Master Equation of Strategic Security Alignment:
Strategic_Resilience = (Business_Goals + DPDP_Compliance + Risk_Appetite) / Residual_Risk;
Outcome: 100% Alignment with Corporate Growth, Fiduciary Protection & Zero Legal Fines!`
  }
];

export default questions;
