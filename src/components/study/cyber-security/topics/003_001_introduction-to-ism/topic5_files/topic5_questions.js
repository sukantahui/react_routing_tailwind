const questions = [
  {
    question: "What is the People, Process, and Technology (PPT) framework, and why is it referred to as the 'Golden Triangle' of Information Security Management?",
    shortAnswer: "The PPT framework asserts that enterprise security relies equally on three interdependent pillars: People (culture & skills), Process (policies & procedures), and Technology (tools & encryption); failure in any single pillar collapses the entire security defense.",
    explanation: "Originating in organizational management and popularized in cybersecurity by Bruce Schneier, the PPT Golden Triangle demonstrates that cybersecurity is not a technical problem that can be solved solely by purchasing software. Without trained People (who recognize phishing), clear documented Processes (incident response playbooks and change control), and robust Technology (firewalls, EDR, encryption), security fails. The three dimensions must operate in harmonic equilibrium.",
    hint: "Think of a three-legged stool: cutting any one leg causes the entire stool to tip over.",
    level: "basic",
    codeExample: `// The PPT Golden Triangle Framework:
[ People ]     -> Culture, Phishing Awareness, Role-Based Training, Executive Buy-in
[ Process ]    -> ISO 27001 Policies, Change Control, Access Reviews, Incident Playbooks
[ Technology ] -> Next-Gen Firewalls, EDR, AES-256 Encryption, SIEM, HSMs
Resilience Rule: Enterprise Security = MIN(People, Process, Technology)!`
  },
  {
    question: "What occurs in a 'Technology-Heavy / Process-Weak' security failure mode?",
    shortAnswer: "The organization spends heavily on expensive security tools (SIEM, EDR, Next-Gen Firewalls) but lacks documented alert triage processes or change control, causing critical security alerts to be ignored and misconfigurations to go undetected.",
    explanation: "In a Tech-Heavy / Process-Weak enterprise, millions of Rupees are spent buying top-tier security tools. However, because no standardized incident triage playbooks exist and change management is unmanaged, the SIEM generates 10,000 alerts daily that sit unreviewed in an inbox. Attackers exploit a routine configuration change (e.g. leaving an S3 storage bucket publicly writable) and breach the database while the multi-crore firewall records the traffic without anyone acting.",
    hint: "Think of buying an expensive alarm system but nobody written instructions on who to call when it rings.",
    level: "moderate",
    codeExample: `// Tech-Heavy / Process-Weak Failure:
Technology: ₹50 Lakh Next-Gen Firewall & SIEM deployed
Process:    Zero documented alert playbooks; no change management
Outcome:    Firewall logs attacker exfiltrating 500GB of customer records at 3:00 AM;
            No process exists to alert the on-call engineer -> ₹250 Cr DPDP Breach!`
  },
  {
    question: "What occurs in a 'Process-Heavy / Technology-Weak' security failure mode ('The Shelfware Trap')?",
    shortAnswer: "The organization writes extensive 300-page policy manuals and compliance checklists, but lacks automated tooling and telemetry to enforce them; employees bypass tedious manual processes, creating massive hidden vulnerabilities.",
    explanation: "In this failure mode, compliance consultants generate voluminous policy binders that look impressive to paper auditors. However, because IT staff lack automated security tools (e.g. automated patching, CASB, centralized IAM, EDR), employees find manual compliance too slow and cumbersome. Developers bypass change approval committees to meet deadlines, and system administrators manually manage passwords on spreadsheets. The security exists only on paper ('Shelfware').",
    hint: "Think of a thick traffic rulebook in a city with no traffic lights or police cars.",
    level: "moderate",
    codeExample: `// Process-Heavy / Technology-Weak Failure:
Process:    250-page ISO 27001 manual requiring 5 physical signatures to deploy code
Technology: Manual FTP deployment; no automated SAST/DAST or CI/CD scanning
Outcome:    Developers bypass manual review to fix urgent bug -> Push unpatched SQL injection -> Core DB breached!`
  },
  {
    question: "What occurs in a 'People-Heavy / Process & Tech Weak' security failure mode?",
    shortAnswer: "Employees are highly motivated and security-conscious, but lack modern automated detection tools (EDR/SIEM) and standardized response procedures; they are unable to stop automated zero-day malware or advanced persistent threats (APTs).",
    explanation: "Even if employees are vigilant and never click phishing links, humans cannot analyze network packets at gigabit speeds or detect memory-injection malware running in the background. Without automated endpoint detection and response (EDR), next-gen firewalls, and automated patch management processes, well-meaning staff are overwhelmed by automated ransomware campaigns and sophisticated zero-day exploits.",
    hint: "Think of brave soldiers defending a fortress with bare hands against modern artillery.",
    level: "moderate",
    codeExample: `// People-Heavy / Tech-Weak Failure:
People:     100% Phishing training pass rate; staff never click malicious links
Technology: Outdated signature antivirus; unsegmented flat network
Outcome:    Attacker exploits zero-day vulnerability in public VPN gateway ->
            Propagates ransomware laterally in seconds -> Staff powerless to stop it!`
  },
  {
    question: "What is the four-tier hierarchy of security governance documentation in the 'Process' dimension?",
    shortAnswer: "1. Policies (High-level mandatory executive directives); 2. Standards (Specific mandatory technical baselines); 3. Guidelines (Recommended best practices); 4. Procedures / SOPs (Step-by-step operational instructions).",
    explanation: "Governance documentation must follow a structured hierarchy: 1. Policies: Board-approved executive mandates that change rarely (e.g. 'All customer financial data must be encrypted'); 2. Standards: Mandatory, specific technical requirements (e.g. 'All databases must use AES-256-GCM and TLS 1.3'); 3. Guidelines: Recommended, non-mandatory advice for scenarios without strict standards; 4. Procedures / Standard Operating Procedures (SOPs): Step-by-step technical instructions on how to perform a task (e.g. 'How to configure AWS KMS key rotation in 6 steps').",
    hint: "Remember: Policies (Why/What), Standards (What exact spec), Guidelines (Tips), Procedures (How step-by-step).",
    level: "basic",
    codeExample: `// 4-Tier Security Governance Hierarchy:
1. POLICY:    "Enterprise Password & Authentication Policy" (Mandatory, Board Approved)
2. STANDARD:  "Passwords must be >= 16 chars, include MFA, and expire in 90 days" (Mandatory Spec)
3. GUIDELINE: "Use a hardware FIDO2 YubiKey for seamless MFA authentication" (Recommended)
4. PROCEDURE: "SOP-SEC-012: Step-by-step guide for provisioning FIDO2 keys in Okta" (How-To)`
  },
  {
    question: "How does the 'People' dimension address insider threats and cognitive social engineering biases?",
    shortAnswer: "By implementing Role-Based Access Control (RBAC), least privilege, segregation of duties, background checks, User & Entity Behavior Analytics (UEBA), and continuous psychological anti-phishing training.",
    explanation: "The human element is the most targeted attack vector. Attackers exploit psychological triggers: authority bias (impersonating the CEO), urgency (fake tax notices), and fear (fake account suspension). Defending the People dimension requires: 1. Continuous simulation drills that condition staff to spot emotional manipulation; 2. Technical guardrails like least privilege so a single employee's credentials cannot access all systems; 3. UEBA systems that detect anomalous employee behavior (e.g. downloading 5,000 files at 2:00 AM).",
    hint: "Combine psychological conditioning against manipulation with technical limits on human privileges.",
    level: "moderate",
    codeExample: `// Defending the People Dimension:
Psychological Defense: Monthly simulated spear-phishing drills addressing urgency & authority bias
Structural Defense:    Dual-Authorization (Maker-Checker) required for wire transfers > ₹1,00,000
Behavioral Defense:    UEBA detects employee logging in from Russia while physically in Kolkata!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5), what is the statutory requirement connecting People, Process, and Technology?",
    shortAnswer: "Section 8(5) legally mandates that Data Fiduciaries must implement both 'reasonable technical AND organizational measures' to ensure compliance with the Act, making PPT balance a statutory legal obligation.",
    explanation: "The law explicitly recognizes that technology alone is insufficient. Section 8(5) requires Data Fiduciaries to implement reasonable technical measures (encryption, access controls, firewalls) and organizational measures (documented policies, staff privacy training, DPO oversight, incident escalation playbooks). Failing to maintain either technical or organizational measures attracts statutory fines of up to ₹250 Crores under Section 33.",
    hint: "Remember the legal phrase requiring both technical and organizational measures.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Section 8(5) Mandate:
"A Data Fiduciary shall implement appropriate TECHNICAL and ORGANIZATIONAL measures
to ensure effective observance of the provisions of this Act."
Technical:      AES-256 Encryption + MFA + Zero Trust (Technology Dimension)
Organizational: ISO 27001 Policies + DPO Oversight + Staff Training (People & Process Dimensions)`
  },
  {
    question: "What is the 'Joiner-Mover-Leaver' (JML) process in identity and access governance, and which dimension does it represent?",
    shortAnswer: "JML is a core 'Process' dimension workflow that governs the employee identity lifecycle: provisioning least-privilege access upon joining, updating access when changing roles (Mover), and immediately revoking all access upon resignation or termination (Leaver).",
    explanation: "Unmanaged employee lifecycles create dangerous vulnerabilities: 1. Joiner: Provisioning baseline, role-based access; 2. Mover: When an employee shifts from Finance to Marketing, their old Finance database access must be revoked (preventing privilege creep); 3. Leaver: When an employee resigns, HR triggers automated de-provisioning within 15 minutes, revoking VPN access, cloud logins, and mobile certificates to eliminate orphan accounts and disgruntled insider retaliation.",
    hint: "Think of the complete journey of an employee entering, moving within, and exiting the company.",
    level: "basic",
    codeExample: `// JML Identity Lifecycle Process:
1. Joiner: HR creates employee profile -> Automated provisioning of baseline Slack & Email
2. Mover:  Promoted from QA to DevOps -> Old QA permissions REVOKED; DevOps IAM granted
3. Leaver: Resignation confirmed -> Automated de-provisioning in < 15 mins (0 Orphan Accounts!)`
  },
  {
    question: "What is the 'Maker-Checker' (Dual Authorization) principle in process governance, and how does it prevent financial fraud?",
    shortAnswer: "Maker-Checker requires two separate individuals to complete a critical transaction: one person initiates (Maker), and a second independent person reviews and approves (Checker); preventing unilateral fraud or accidental mistakes.",
    explanation: "In financial, banking, and critical infrastructure operations, no single individual should have absolute power to move funds or alter security configurations. Under the Maker-Checker process: 1. Maker: A junior accountant or engineer creates a payment transfer or initiates a firewall rule change; 2. Checker: A senior manager or security officer independently reviews the justification, audits the parameters, and signs off. This enforces segregation of duties and eliminates unilateral insider threat.",
    hint: "Think of the two-key system used to launch submarines or open high-security bank vaults.",
    level: "basic",
    codeExample: `// Maker-Checker Dual-Authorization Process:
Step 1 (Maker):   Finance Clerk creates ₹50,00,000 vendor payment transfer request in ERP
Step 2 (Checker): Finance Director reviews vendor invoice + signs off with hardware token
Result:           Neither individual can unilaterally steal company funds!`
  },
  {
    question: "Under the Information Technology Act 2000 Section 43A and SPDI Rules 2011, how are 'Reasonable Security Practices' defined across the PPT dimensions?",
    shortAnswer: "SPDI Rules define reasonable security practices as maintaining a comprehensive documented information security program containing managerial (Process), technical (Technology), operational, and physical (People) security control measures commensurate with the assets.",
    explanation: "Section 43A makes commercial organizations legally liable for compensation if they fail to implement reasonable security practices when handling Sensitive Personal Data or Information (SPDI). The SPDI Rules 2011 explicitly state that compliance requires an equilibrium across managerial/operational policies (Process), technical controls (Technology), and trained personnel (People), explicitly recognizing ISO/IEC 27001 as the benchmark standard.",
    hint: "Remember the Indian legal benchmark connecting managerial, operational, and technical controls.",
    level: "moderate",
    codeExample: `// IT Act Section 43A (SPDI Rules 2011) Definition:
Reasonable Security = Managerial (Policies) + Technical (Encryption/EDR) + Operational (Training)
Benchmark Standard:  ISO/IEC 27001:2022 Certification proves 100% statutory compliance in Indian courts!`
  },
  {
    question: "What role does User and Entity Behavior Analytics (UEBA) play in bridging the People and Technology dimensions?",
    shortAnswer: "UEBA uses Machine Learning algorithms (Technology) to establish normal baseline behaviors for employees and systems (People/Entities) and instantly alerts when deviations (e.g. abnormal after-hours file downloads) indicate compromised credentials or insider threats.",
    explanation: "Traditional firewalls check if a login credential is valid, but cannot determine if the user is acting maliciously. UEBA bridges People and Technology: by analyzing keystroke dynamics, normal working hours, standard data access volumes, and geographic login patterns, UEBA builds a behavioral baseline for each user. If an engineer who usually accesses 10 files a day suddenly downloads 5,000 customer records at 2:00 AM, the UEBA system flags anomalous risk and triggers automated session suspension.",
    hint: "Think of an AI fraud detector for employee behavior rather than credit card transactions.",
    level: "expert",
    codeExample: `// UEBA Anomaly Detection Engine:
Baseline Behavior:   Mamata (Engineer) accesses GitHub & JIRA from Kolkata between 9:00 AM - 6:00 PM
Anomalous Event:     Mamata's account downloads 500GB SQL database dump at 3:00 AM from an IP in Nigeria
UEBA Automated Action: Suspends session + Revokes OAuth token + Alerts SOC Tier 2 in < 30 seconds!`
  },
  {
    question: "Why does Change Management represent one of the most critical 'Process' controls in enterprise security?",
    shortAnswer: "Uncontrolled changes are the leading cause of security vulnerabilities and outages; Change Management ensures every configuration change is risk-assessed, tested in staging, approved, documented, and includes a rollback plan.",
    explanation: "Over 70% of enterprise security breaches and outages result from unauthorized or poorly tested system changes (e.g. opening a firewall port for testing and forgetting to close it, or deploying unreviewed code containing vulnerabilities). A formal Change Management process enforces: 1. Request for Change (RFC); 2. Security Impact Assessment; 3. Staging environment testing; 4. Change Advisory Board (CAB) review; 5. Scheduled maintenance window deployment; 6. Documented back-out (rollback) plan.",
    hint: "Think of a pre-flight checklist for airplanes ensuring every modification is verified before takeoff.",
    level: "moderate",
    codeExample: `// Enterprise Change Management (RFC) Lifecycle:
1. RFC Submission:   DevOps submits request to upgrade PostgreSQL database to v16
2. Security Review:  CISO team verifies SSL cipher compatibility & runs SAST scan
3. CAB Approval:     Change Advisory Board approves deployment for Sunday 02:00 AM IST
4. Deployment:       Automated Blue-Green deployment with 5-minute instant rollback script`
  },
  {
    question: "Synthesizing the Three Dimensions of ISM: what is the master equation of PPT equilibrium in cybersecurity resilience?",
    shortAnswer: "$$\\text{Enterprise Resilience} = \\text{Harmonic Mean}(\\text{People}, \\text{Process}, \\text{Technology}) = \\frac{3}{\\frac{1}{\\text{People}} + \\frac{1}{\\text{Process}} + \\frac{1}{\\text{Technology}}}$$ with continuous improvement.",
    explanation: "This mathematical relationship demonstrates that overall enterprise security is constrained by the weakest dimension. If Technology is rated 95/100 and Process is rated 90/100, but People is rated 10/100 (untrained staff falling for spear-phishing), the Harmonic Mean collapses towards the lowest score (~26/100). True security requires balanced, synchronous investment across People, Process, and Technology in full compliance with ISO 27001 and the Indian DPDP Act 2023.",
    hint: "Conclude by reviewing how the harmonic mean proves that the weakest dimension constrains overall resilience.",
    level: "expert",
    codeExample: `// The Master PPT Harmonic Equilibrium Formula:
Resilience = 3 / ((1/People_Score) + (1/Process_Score) + (1/Tech_Score));
Example: People=20, Process=90, Tech=95 -> Resilience = 43.8% (VULNERABLE!)
Equilibrium: People=85, Process=85, Tech=85 -> Resilience = 85.0% (RESILIENT!)`
  }
];

export default questions;
