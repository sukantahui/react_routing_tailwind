const questions = [
  {
    question: "What is the primary difference between an Information Security Audit, a Security Assessment, and a Vulnerability Assessment (VA)?",
    shortAnswer: "A Vulnerability Assessment is an automated tool-driven technical scan for software flaws; a Security Assessment is a consultative evaluation of overall risk posture and maturity; an Information Security Audit is a formal, independent compliance verification against rigid pass/fail criteria.",
    explanation: "While all three evaluate security, they serve different goals: 1. VA (Nessus/Qualys): Finds missing patches and open ports; 2. Security Assessment (Consultative): Measures operational risk, control maturity (CMMI), and creates a roadmap; 3. Audit (ISO 27001/DPDP): Independent pass/fail verification against formal standards resulting in certifications or regulatory findings.",
    hint: "VA scans tools; Assessment advises on risk maturity; Audit verifies pass/fail compliance against rules.",
    level: "basic",
    codeExample: `// Tripartite Comparison:
VA:         Nessus scans server ➔ Outputs CVE-2026-8812 (Technical Discovery)
Assessment: Consultant reviews architecture ➔ Outputs Risk Maturity Level 3.2 (Advisory Roadmap)
Audit:      ISO Auditor checks logs against Control A.8.8 ➔ Issues Major Non-Conformity (Formal Pass/Fail)`
  },
  {
    question: "Why does a 100% clean Vulnerability Assessment (VA) scan NOT guarantee passing an Information Security Audit?",
    shortAnswer: "Because a VA scan only checks automated technical software patches; an audit evaluates the complete socio-technical governance framework, including employee background checks, access reviews, physical security, and legal contracts.",
    explanation: "An enterprise can patch every software vulnerability so that Nessus shows 0 CVEs. However, the organization will still fail an ISO 27001 audit if employee onboarding lacks NDA signatures (A.6.1), disaster recovery tests were never executed (A.8.14), or third-party vendor DPAs are missing under DPDP Act Section 8(2).",
    hint: "VA only checks software code; an audit checks people, policies, physical doors, and legal contracts.",
    level: "basic",
    codeExample: `// Why VA != Audit:
VA Result:    0 Known CVEs on AWS EC2 (Clean Technical Scan)
Audit Finding: MAJOR NON-CONFORMITY! (Sysadmin terminated 3 months ago still has active SSH keys - Control A.5.18 broken)`
  },
  {
    question: "What are the core characteristics and deliverables of a Security Risk Assessment?",
    shortAnswer: "A consultative, risk-centric evaluation that identifies threat vectors, assesses asset criticality, models financial loss (ALE/ROSI), and produces a prioritized risk treatment roadmap and CMMI maturity score.",
    explanation: "Unlike a rigid pass/fail audit, a Security Assessment is collaborative and forward-looking. Security architects work with business owners to understand operational workflows, model threat actors (STRIDE), and determine how much risk the organization can tolerate before recommending specific architectural safeguards.",
    hint: "Consultative and strategic; produces risk heatmaps, maturity scores, and improvement roadmaps.",
    level: "moderate",
    codeExample: `// Security Assessment Deliverables:
1. Threat & Asset Risk Matrix (Inherent vs Residual Risk Scores)
2. Quantitative Annual Loss Expectancy (ALE) Financial Forecasts
3. NIST Cybersecurity Framework (CSF) Maturity Score (Tier 3 - Repeatable)
4. Strategic 18-Month Security Engineering Roadmap`
  },
  {
    question: "What is the role of Penetration Testing (PT) within the broader security evaluation spectrum?",
    shortAnswer: "Penetration testing is the authorized, simulated cyber attack where ethical hackers actively attempt to exploit technical and human vulnerabilities to demonstrate real-world breach impact and bypass controls.",
    explanation: "While a VA scan lists theoretical vulnerabilities (e.g. 'Port 445 is open'), a Penetration Test proves whether an adversary can chain that open port with a weak password to compromise the Domain Controller, extract patient database records, and pivot across trust boundaries.",
    hint: "VA finds the unlocked door; PT walks through the door and takes the crown jewels.",
    level: "basic",
    codeExample: `// VA vs Penetration Testing:
VA Scan: "Vulnerability CVE-2026-1192 exists on Web Server (Low Severity)."
PT Test: Ethical hacker chains CVE-2026-1192 with SSRF to extract AWS IAM Admin Credentials (CRITICAL IMPACT!)`
  },
  {
    question: "Under the Indian DPDP Act 2023, why must Data Fiduciaries distinguish between technical VA scans and statutory Section 10 Independent Data Audits?",
    shortAnswer: "VA scans only detect technical software flaws; statutory Data Audits evaluate legal consent ledgers, purpose limitation, biometric data retention, and Data Processor contracts to provide legal Safe Harbor against ₹250 Cr fines.",
    explanation: "A hospital cannot defend a patient biometric data leak by showing the Data Protection Board of India (DPBI) a clean Nessus scan. Section 10 requires an independent Data Audit to prove that citizen consent was explicitly obtained, processing complied with Section 8, and automated crypto-shredding destroyed records past their retention limit.",
    hint: "DPDP compliance requires legal data governance audits, not just automated port scans.",
    level: "moderate",
    codeExample: `// DPDP Statutory Defense Boundary:
Invalid Defense: "Our Nessus vulnerability scan had zero CVEs!" (DPBI rejects; ₹250 Cr Fine imposed!)
Valid Defense:   "Independent Data Audit verified 100% consent logging, AES-256 S3 encryption, and valid vendor DPAs." (Safe Harbor granted!)`
  },
  {
    question: "What is the recommended operational frequency for VA, Penetration Testing, Risk Assessments, and Security Audits?",
    shortAnswer: "Vulnerability Assessment (VA): Continuous / Weekly; Penetration Testing (PT): Quarterly / After major releases; Security Assessment: Bi-annually; Formal Security Audit: Annually (Mandatory under ISO 27001 Clause 9.2).",
    explanation: "Security assurance requires a layered temporal cadence: 1. Automated VA scans run continuously in CI/CD pipelines to catch new CVEs; 2. Red team pen tests run quarterly to validate perimeter defenses; 3. Security posture assessments run bi-annually to calibrate risk appetite; 4. Formal ISO 27001 and RBI compliance audits occur annually.",
    hint: "VA = Weekly; PT = Quarterly; Assessment = Bi-annually; Audit = Annually.",
    level: "basic",
    codeExample: `// Enterprise Assurance Cadence:
Automated Snyk / Nessus VA:  Every CI/CD Commit & Weekly Network Sweep
External Red Team Pen Test:  Quarterly (Every 90 Days)
Enterprise Risk Assessment:  Bi-Annually (Every 6 Months)
ISO 27001 & CERT-In Audit:   Annually (Mandatory for Certification)`
  },
  {
    question: "How does Reserve Bank of India (RBI) Cyber Security Guidelines mandate the integration of VA/PT and Independent IS Audits?",
    shortAnswer: "RBI mandates that banks must perform continuous automated VA scans, quarterly external penetration tests, and submit an annual CERT-In empaneled IS audit report directly to the Board Risk Management Committee (BRMC).",
    explanation: "Under the RBI Cyber Security Framework for Banks, all payment switches (UPI, NEFT, RTGS) must maintain an unbroken assurance pipeline: automated tools find technical bugs daily; ethical hackers test exploitation quarterly; and independent CERT-In auditors inspect total operational governance annually.",
    hint: "Banks in India must run continuous scans, quarterly hacks, and annual independent audits.",
    level: "moderate",
    codeExample: `// RBI Tripartite Assurance Architecture:
Layer 1 (Daily):    Automated Qualys Vulnerability Scanning on Payment Switch
Layer 2 (Quarterly):Third-Party Red Team Penetration Testing on Mobile Banking Apps
Layer 3 (Annual):   Independent CERT-In Empaneled IS Audit presented to the Board BRMC`
  },
  {
    question: "What is the fundamental difference in the relationship between the Evaluator and the Auditee during an Audit vs an Assessment?",
    shortAnswer: "In an Audit, the relationship is formal, arms-length, and non-consultative (the auditor objectively evaluates pass/fail without designing fixes); in an Assessment, the relationship is collaborative and advisory (the assessor actively partners to design remediation).",
    explanation: "Under ISO 19011 auditor ethics, an auditor must remain strictly independent: if an auditor tells an enterprise exactly how to configure their firewall and then audits that configuration, independence is destroyed. In contrast, a security assessor acts as a trusted advisor, collaboratively co-designing security architectures.",
    hint: "Auditor = Strict judge (pass/fail); Assessor = Advisory coach (guides improvements).",
    level: "moderate",
    codeExample: `// Evaluator Role Distinction:
Auditor:  "Your S3 bucket lacks encryption. This is a Major Non-Conformity against Control A.8.24. You must submit a CAPA in 30 days." (Judge)
Assessor: "Let's review AWS KMS key policies together and design an automated Terraform script to enable S3 Object Lock encryption." (Coach)`
  },
  {
    question: "What are the key limitations of relying exclusively on Vulnerability Assessment (VA) scanners in modern cloud environments?",
    shortAnswer: "VA scanners suffer from false positives/negatives, cannot evaluate business logic flaws (e.g. IDOR, price tampering), ignore architectural trust boundaries, and fail to assess human operational compliance.",
    explanation: "Automated scanners (like Nessus) parse software banner versions and known CVE signatures. They cannot detect an Insecure Direct Object Reference (IDOR) where changing `user_id=101` to `user_id=102` accesses another customer's bank account, nor can they verify whether developers follow password policies.",
    hint: "Scanners miss business logic flaws, authorization bugs, and human policy violations.",
    level: "basic",
    codeExample: `// Business Logic Flaw Missed by VA Scanners:
GET /api/v1/bank-account/statement?accountId=99281  // Vulnerable to IDOR!
Nessus VA Scan Result: "HTTP 200 OK - No Known CVEs detected (Clean Scan)"
Penetration Test:      "CRITICAL: Attacker can view any customer bank balance by changing accountId!"`
  },
  {
    question: "How do 'Audit Working Papers' differ from a 'Vulnerability Assessment Tool Report'?",
    shortAnswer: "A VA report is an automated PDF export listing raw CVEs and CVSS scores; Audit Working Papers are legally defensible, auditor-curated files containing tested sample logs, interview notes, criteria mappings, and signed evidence.",
    explanation: "Dumping a 200-page Nessus automated scan report does not constitute an audit file. Working papers contain the structured intellectual analysis of an auditor: proving which systems were sampled, how logs were extracted, how evidence was validated against ISO 27001 clauses, and why specific findings were classified as Major or Minor NCs.",
    hint: "VA report is a machine tool printout; Working papers are human auditor legal evidence files.",
    level: "moderate",
    codeExample: `// VA Export vs Audit Working Papers:
Nessus Export: Automated list of 42 open ports on IP 10.0.0.5 (Raw Data)
Working Paper: WP-2026-SEC-09: Sampled 25 servers; tested SSH key rotation; CloudTrail logs verified; Conclusion: CONFORMANT`
  },
  {
    question: "What is 'Audit Risk', and how does it compare to 'Technical Vulnerability Risk'?",
    shortAnswer: "Technical Vulnerability Risk is the risk of an attacker exploiting a security flaw; Audit Risk is the risk that an auditor will issue an inappropriate audit opinion (e.g. issuing a clean certification when material control defects actually exist).",
    explanation: "Under ISO 19011, Audit Risk arises from sampling limitations, auditor incompetence, or concealed evidence: if an auditor samples 10 clean servers while the 11th un-sampled server is compromised by ransomware, the auditor might issue a clean audit report in error. To manage audit risk, auditors use risk-based sampling.",
    hint: "Vulnerability risk = Hackers attacking; Audit risk = Auditor giving a wrong pass/fail grade.",
    level: "expert",
    codeExample: `// Audit Risk Formulation:
Audit Risk = Inherent Risk * Control Risk * Detection Risk (Risk that auditor sampling misses a major breach)`
  },
  {
    question: "How do organizations synthesize VA, Penetration Testing, Security Assessments, and Security Audits into a unified Defense-in-Depth assurance pipeline?",
    shortAnswer: "Automated VA tools provide continuous technical hygiene; Penetration Testing validates real-world exploit resistance; Assessments calibrate business risk maturity; Audits provide formal executive and regulatory certification.",
    explanation: "Mature enterprises treat these four disciplines as complementary gears in a single assurance engine: developers run daily VA scans in CI/CD; red teams attack APIs quarterly; CISO teams assess organizational risk bi-annually; and external registrars conduct annual ISO 27001 certification audits.",
    hint: "Continuous VA hygiene ➔ Quarterly PT attack validation ➔ Bi-annual Risk Assessment ➔ Annual Compliance Audit.",
    level: "basic",
    codeExample: `// Complete Enterprise Assurance Pipeline:
CI/CD Pipeline: Snyk / SonarQube SCA/SAST Scan (Automated VA) ➔
Staging Deploy: External Red Team Ethical Hack (Penetration Test) ➔
Quarterly CISO: NIST CSF Maturity Score Calculation (Security Assessment) ➔
Annual Review:  BSI ISO/IEC 27001 Certification Audit (Formal IS Audit)`
  },
  {
    question: "Synthesizing Differences between Audit, Assessment, and Vulnerability Assessment: what is the master equation of Enterprise Assurance?",
    shortAnswer: "$$\\text{Assurance Defensibility} = \\frac{\\text{Continuous VA Velocity} \\times \\text{Assessment Maturity} \\times \\text{Independent Audit Rigor}}{\\text{Un-scanned Assets} + \\text{Un-audited Governance Blindspots}} \\ge 1.0$$ with continuous ISO 19011 and DPDP Act validation.",
    explanation: "This master governance relationship proves that complete cyber assurance is achieved when high-speed automated vulnerability scans maintain technical hygiene, consultative assessments guide risk maturity, and independent formal audits verify compliance against regulatory criteria. This eliminates un-scanned assets and un-audited blindspots, guaranteeing total statutory safe harbor.",
    hint: "Conclude by reviewing how continuous VA, consultative assessment, and independent audit combine for complete assurance.",
    level: "expert",
    codeExample: `// Master Equation of Information Security Assurance:
Assurance = (VA_Scanning_Velocity * Assessment_Maturity * Audit_Independence) / (Unscanned_IPs + Governance_Gaps);
Condition: Assurance >= 1.0 (Zero Blindspots);
Outcome:   100% Technical Hygiene, Optimal Risk Maturity & Unshakeable Regulatory Safe Harbor!`
  }
];

export default questions;
