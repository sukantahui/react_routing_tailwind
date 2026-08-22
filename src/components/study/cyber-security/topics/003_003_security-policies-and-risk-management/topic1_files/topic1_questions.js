const questions = [
  {
    question: "What is an Acceptable Use Policy (AUP - ISO/IEC 27001:2022 Control A.5.10), and why is it a cornerstone of enterprise security governance?",
    shortAnswer: "An AUP is a mandatory, legally binding agreement defining acceptable and prohibited uses of corporate IT systems, hardware, networks, and data; it establishes employee behavioral expectations and enables disciplinary and legal enforcement.",
    explanation: "Technology defenses alone cannot stop malicious or reckless insider actions. Control A.5.10 mandates that rules for acceptable use of information and other associated assets shall be identified, documented, and implemented. The AUP establishes explicit boundaries (e.g. no unauthorized USBs, no sharing passwords, no pasting company data into public AI tools), protecting enterprise assets and ensuring legal accountability.",
    hint: "Think of the corporate code of conduct governing every digital device and network interaction.",
    level: "basic",
    codeExample: `// Acceptable Use Policy (AUP - Control A.5.10) Core Scope:
1. Permitted: Business communications, authorized software development, approved cloud SaaS usage
2. Prohibited: Connecting personal USBs, cryptocurrency mining, sharing login credentials
3. Enforceability: Mandatory Day-1 signature required as a condition of employment`
  },
  {
    question: "Why must an enterprise AUP explicitly declare that employees have 'No Expectation of Personal Privacy' on corporate devices and networks?",
    shortAnswer: "To provide legal authorization for continuous SOC monitoring, packet inspection, DLP interception, and endpoint telemetry without violating employee privacy or wiretapping laws.",
    explanation: "If an enterprise monitors employee network traffic, scans encrypted web connections via SSL inspection, or captures endpoint keystroke logs without prior written consent, the employee could sue the company for privacy violations. An explicit 'No Expectation of Privacy' clause informs employees in writing that all corporate emails, chats, internet browsing, and stored files are subject to automated monitoring and forensic audit at any time.",
    hint: "Think of putting up a sign stating 'CCTV cameras are operating in this facility'.",
    level: "moderate",
    codeExample: `// Privacy Disclosure Clause (AUP Section 6):
"The enterprise reserves the right to monitor, intercept, record, and inspect all digital communications, file transfers, and system activities conducted on corporate hardware or networks. Employees shall have no expectation of personal privacy regarding any activity on company assets."`
  },
  {
    question: "What specific restrictions must a modern enterprise AUP enforce regarding Public Generative AI tools (e.g. ChatGPT, Claude)?",
    shortAnswer: "Strict prohibition on pasting proprietary source code, internal system architectures, customer Personal Identifiable Information (PII), or unreleased financial figures into public, non-enterprise AI models.",
    explanation: "Public generative AI models often retain prompt data for future training, creating massive data exfiltration risks. If a software engineer pastes proprietary cryptographic algorithms or customer Aadhaar/credit card details into a public AI prompt, that data becomes vulnerable to leakage. A modern AUP mandates that only enterprise-licensed AI instances with zero data-retention agreements may be used.",
    hint: "Prevent confidential company data from becoming training data for public AI models.",
    level: "basic",
    codeExample: `// Generative AI AUP Restriction:
Prohibited: "Pasting proprietary code, customer KYC data, or credentials into public AI portals."
Approved:   "Using company-sanctioned AWS Bedrock / Azure OpenAI endpoints with zero data retention."`
  },
  {
    question: "How does an employee's signed AUP enable disciplinary action and termination under ISO 27001 Control A.6.4 (Disciplinary Process)?",
    shortAnswer: "A signed AUP provides documented evidence that the employee was formally aware of security rules; proof of willful violation authorizes HR suspension, termination, and civil/criminal prosecution under labor and cyber laws.",
    explanation: "Under labor law and ISO 27001 Control A.6.4, an employer cannot arbitrarily penalize an employee for a cybersecurity mistake without prior written notice of the rules. When an employee signs the AUP during onboarding, they enter into a binding contract. If they subsequently install pirated software or disable endpoint security, HR and Legal can execute progressive discipline up to immediate termination without wrongful-termination liability.",
    hint: "Signing the document proves the employee knew the rules before breaking them.",
    level: "basic",
    codeExample: `// Disciplinary Action Escalation (Control A.6.4):
Level 1 (Minor / First-time): Mandatory security retraining + Written warning
Level 2 (Negligent / Repeat): Revocation of remote access + Suspension of elevated privileges
Level 3 (Willful / Severe):   Immediate employment termination + Criminal filing under IT Act Sec 43/66`
  },
  {
    question: "What USB and Removable Media restrictions are mandated in an enterprise AUP, and why are USB flash drives considered a severe threat vector?",
    shortAnswer: "AUPs strictly prohibit connecting unauthorized personal USB flash drives or external drives; USBs bypass network firewalls to introduce ransomware and enable rapid, undetectable data exfiltration.",
    explanation: "Removable media represent a dual threat: 1. Malware Ingress: Dropped USB drives loaded with malicious autorun scripts (e.g. Stuxnet) can bridge air-gapped networks; 2. Data Exfiltration: Disgruntled employees can copy gigabytes of confidential trade secrets in seconds. Control A.8.10 and AUPs mandate automated USB port-blocking software (GPO / EDR) across all endpoints.",
    hint: "Remember the threat of malware coming in and company secrets going out via USB sticks.",
    level: "basic",
    codeExample: `// Automated Removable Media Restriction:
GPO Policy: Computer Configuration ➔ Administrative Templates ➔ System ➔ Removable Storage Access
Rule:       "All Removable Storage classes: Deny all access" ➔ Enforced on 100% of corporate endpoints!`
  },
  {
    question: "How does the Indian Information Technology Act 2000 enforce penalties for AUP violations under Section 43 and Section 66?",
    shortAnswer: "Section 43 imposes civil damages up to ₹1 Crore for unauthorized data downloading, copying, or introducing viruses; Section 66 imposes up to 3 years imprisonment and ₹5 Lakh fines for fraudulent/dishonest computer tampering.",
    explanation: "An AUP is not merely an internal HR document; violating it can constitute a statutory crime under Indian law. If an employee uses company servers to download unauthorized databases (violating Section 43) or tampers with system logs to conceal misconduct (violating Section 66), the corporate entity can hand over SIEM audit logs to the cyber police for criminal prosecution.",
    hint: "Remember Section 43 (civil damages) and Section 66 (criminal hacking imprisonment).",
    level: "moderate",
    codeExample: `// IT Act Statutory Enforcement Matrix:
Violation: Unauthorized downloading of 50,000 customer PAN records onto personal USB
Statute:   IT Act Section 43(a) & 43(b) [Unauthorized copying & extraction of data]
Penalty:   Civil compensation payable to employer + 3 Years Imprisonment under Section 66`
  },
  {
    question: "What 'Clean Desk and Clean Screen' provisions (ISO 27001 Control A.7.7) must be incorporated into an enterprise AUP?",
    shortAnswer: "Workstation screens must lock automatically within 3 minutes of inactivity, confidential papers/passwords must be locked in drawers when unattended, and whiteboards must be erased after meetings.",
    explanation: "Visual eavesdropping and opportunistic physical theft are major vulnerability vectors. Under Control A.7.7 and the AUP: 1. Screen Lock: Windows `Win + L` mandatory upon leaving desks; automated timeout enforced at 3 minutes; 2. Clean Desk: Physical paper files containing customer PII must be locked in fireproof cabinets; 3. Whiteboards: Erased immediately after architectural strategy meetings.",
    hint: "Never leave passwords on sticky notes or customer records open on unattended desks.",
    level: "basic",
    codeExample: `// Clean Screen & Clean Desk GPO:
Screen Saver Timeout: 180 Seconds (3 Minutes)
Screen Saver Lock:    "On resume, display logon-screen" ➔ Enabled
Desk Inspection:      Quarterly unannounced physical audits conducted after business hours`
  },
  {
    question: "How does an enterprise AUP govern Software Installation and Administrative Privileges on corporate laptops?",
    shortAnswer: "Employees are strictly prohibited from installing unapproved third-party software, browser extensions, or disabling local security agents; all administrative root privileges are removed and managed via centralized Privilege Access Management (PAM).",
    explanation: "Allowing users local administrator rights guarantees compromise: users inadvertently execute trojanized software, install vulnerable torrent clients, or add browser extensions that log keystrokes. The AUP mandates that only authorized IT staff deploy software from a signed, vetted corporate catalog (Control A.8.19).",
    hint: "Standard users have zero local admin rights to install unvetted software.",
    level: "moderate",
    codeExample: `// Least Privilege Endpoint Policy:
Local Admin Access:  Disabled for 100% of standard employees and developers
Software Catalog:    Deployment managed exclusively via Microsoft Intune / Jamf Pro
Audit Rule:          Daily inventory scans flag any unauthorized binary execution`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why is an AUP essential to prevent employee liability under Section 8?",
    shortAnswer: "Section 8 mandates that Data Fiduciaries must prevent unauthorized data processing or leakage; an AUP establishes strict internal operational boundaries, proving the company took reasonable measures to prevent rogue employee data theft.",
    explanation: "If a rogue customer support employee copies customer phone numbers and sells them to telemarketers, the Data Protection Board of India (DPBI) will investigate. Having a signed AUP, dynamic data masking (A.8.11), and DLP log monitoring proves that the company instituted reasonable organizational safeguards, shielding the corporate entity from ₹250 Crore penalties under Section 33.",
    hint: "An AUP proves the company instructed employees on proper personal data handling.",
    level: "basic",
    codeExample: `// DPDP Section 8 Organizational Defense:
Evidence 1: Employee signed POL-AUP-01 explicitly prohibiting personal data copying
Evidence 2: Automated DLP alert blocked the unauthorized email transfer attempt
Result:     Corporate entity shielded from Section 33 penalties; rogue employee prosecuted!`
  },
  {
    question: "What is the 'Incidental Personal Use' clause in an AUP, and where is the boundary drawn?",
    shortAnswer: "Incidental personal use permits minor, brief personal activities (e.g. checking weather, reading news) during breaks, provided it does not consume significant bandwidth, violate laws, or interfere with work duties.",
    explanation: "Total zero-tolerance personal use policies are unrealistic and lead employees to seek evasive bypasses. Most enterprise AUPs permit reasonable incidental personal use: 1. Permitted: Checking personal email on lunch break, reading news; 2. Strictly Banned: Streaming 4K movies, online gambling, running personal businesses, torrenting, or viewing prohibited adult content.",
    hint: "Briefly checking the weather is acceptable; streaming movies or crypto-mining is strictly banned.",
    level: "moderate",
    codeExample: `// Incidental Personal Use Clause (AUP Section 4.3):
"Employees may engage in occasional, brief personal communications during non-working breaks, provided such use does not generate excessive network traffic, compromise system security, or violate any corporate policy."`
  },
  {
    question: "What mandatory Incident Reporting obligation must every AUP impose on employees?",
    shortAnswer: "Employees must report any lost/stolen device, suspected phishing email, unexpected password prompt, or potential data exposure to the 24/7 SOC immediately (within 1 hour) without fear of unjust reprisal.",
    explanation: "Early detection prevents catastrophe. If an employee clicks a phishing link and conceals it out of fear of punishment, ransomware spreads across the entire network. The AUP establishes a mandatory reporting duty combined with a 'Just Culture' policy: honest, prompt reporting of accidental mistakes is treated constructively, while concealing incidents results in severe disciplinary termination.",
    hint: "Report mistakes immediately so the blue team can contain the threat before it spreads.",
    level: "basic",
    codeExample: `// Mandatory Incident Reporting SLA (AUP Section 8):
1. Stolen Laptop: Report to SOC hotline within 60 minutes to trigger remote MDM crypto-wipe
2. Phishing Email: Click 'Report Phish' Outlook button within 15 minutes of receipt
3. Protection:    Employees reporting honest mistakes are protected from punitive retaliation`
  },
  {
    question: "How frequently must an enterprise Acceptable Use Policy be re-acknowledged by employees?",
    shortAnswer: "Annually; mandatory annual re-certification ensures employees stay updated on emerging threats (e.g. AI risks, remote work guidelines) and reinforces ongoing legal accountability.",
    explanation: "Signing an AUP once on Day 1 is insufficient for a 10-year career. Over time, policies evolve to address new technologies like cloud SaaS, generative AI, and mobile MDM. A mandatory annual re-acknowledgment campaign delivered via the HRMS portal refreshes employee awareness and maintains an active legal paper trail.",
    hint: "Every employee re-signs the AUP once every 12 months.",
    level: "basic",
    codeExample: `// Annual AUP Re-Certification Workflow:
Frequency:    Every 365 days triggered automatically by HRMS compliance engine
SLA:          14-Day completion window
Non-Compliance: Network access temporarily suspended on Day 15 until digital signature submitted`
  },
  {
    question: "Synthesizing Core Security Policies (AUP): what is the master equation of Human Firewall Effectiveness?",
    shortAnswer: "$$\\text{Human Firewall Strength} = \\frac{\\text{AUP Clarity} \\times \\text{SETA Training Frequency} \\times \\text{Automated DLP Enforcement}}{\\text{Shadow IT Workarounds} + \\text{Un-reported Incidents}}$$ with annual ISO 27001 Control A.5.10 verification.",
    explanation: "This master governance relationship proves that human security resilience is the product of clear, unambiguous policies, continuous interactive training, and automated technical guardrails. Eliminating shadow IT workarounds and encouraging immediate incident reporting transforms employees from the weakest security link into the enterprise's strongest first line of defense.",
    hint: "Conclude by reviewing how policy clarity, training, and automated guardrails empower employees.",
    level: "expert",
    codeExample: `// Master Equation of Human Firewall Resilience:
Human_Strength = (AUP_Clarity * Training_Frequency * Automated_DLP) / (Shadow_IT + Concealed_Incidents);
Outcome: 99% Phishing Defense, Zero Unauthorized USB Leaks & Total Regulatory Safe Harbor!`
  }
];

export default questions;
