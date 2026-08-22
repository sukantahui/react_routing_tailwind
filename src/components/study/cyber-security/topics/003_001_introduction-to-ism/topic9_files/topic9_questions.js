const questions = [
  {
    question: "Why is an enterprise security awareness program considered the most critical component of Information Security Management, despite billions spent on technical tools?",
    shortAnswer: "Over 90% of successful cyber breaches originate from social engineering, phishing, and human manipulation; if employees are tricked into revealing credentials or approving malicious wire transfers, multi-crore firewalls and encryption are completely bypassed.",
    explanation: "Attackers know it is far easier to trick a human employee through emotional manipulation than it is to break AES-256 encryption. Threat actors target the human element through spear-phishing, business email compromise (BEC), and pretexting. A robust Security Education, Training, and Awareness (SETA) program transforms employees from the 'weakest link' into an active, resilient 'Human Firewall' that detects and reports attacks in real time.",
    hint: "Think of a high-tech fortress where an attacker simply asks the guard at the front gate to open the door.",
    level: "basic",
    codeExample: `// The Human Vulnerability vs Technical Tooling:
Multi-Crore Security Stack: ₹1 Crore Next-Gen Firewall + EDR + SIEM
Attack Vector:               Attacker sends spoofed email: "Urgent: CEO requests vendor payment"
Outcome without Training:    Clerk transfers ₹50 Lakhs -> Technical stack never alerted!
Outcome with Human Firewall: Trained clerk clicks "Report Phishing" in 30 seconds -> Attack Neutralized!`
  },
  {
    question: "What is the 'SETA' framework in enterprise security management, and what are its three distinct pillars?",
    shortAnswer: "SETA stands for Security Education, Training, and Awareness: 1. Education (Formal deep theory & certifications); 2. Training (Role-based technical skills for specific jobs); 3. Awareness (Continuous campaigns & phishing drills for all staff).",
    explanation: "The SETA framework (NIST SP 800-50) structures human security development: 1. Security Education: In-depth academic and professional certification programs (CISSP, CISM, CEH) for security officers and architects; 2. Security Training: Practical, role-specific skills (e.g. secure coding for software developers, secure cloud configuration for DevOps, privacy compliance for HR); 3. Security Awareness: Broad, continuous exposure for all employees (monthly phishing drills, posters, micro-learning, gamification) to reinforce daily cyber hygiene.",
    hint: "Remember the three distinct tiers: deep Education, job-specific Training, and enterprise-wide Awareness.",
    level: "basic",
    codeExample: `// The SETA Framework Triad:
1. EDUCATION:  CISSP / CISM Certification for CISO & Lead Architects (Deep Theory)
2. TRAINING:   OWASP Top 10 Secure Coding for Software Developers (Job-Specific Skills)
3. AWARENESS:  Monthly Unannounced Phishing Simulations for ALL 500 Employees (Daily Hygiene)`
  },
  {
    question: "What are the four primary psychological triggers exploited by social engineering attackers in spear-phishing campaigns?",
    shortAnswer: "1. Authority Bias (Impersonating CEOs/tax officials); 2. Urgency & Scarcity (Threatening immediate account suspension); 3. Fear & Intimidation (Legal action/ransomware threats); 4. Social Proof & Curiosity (Salary spreadsheets/viral news).",
    explanation: "Social engineering manipulates cognitive human biases: 1. Authority: Exploits our instinct to obey superiors (e.g. 'I am the CEO, wire ₹20 Lakhs immediately'); 2. Urgency: Forces rushed decisions before rational thinking kicks in (e.g. 'Pay within 15 minutes or your account will be deleted'); 3. Fear: Leverages dread of punishment (e.g. 'Income Tax Department notice of tax evasion'); 4. Curiosity/Greed: Tempts users with hidden information (e.g. 'Confidential 2026 Employee Salary Appraisal Spreadsheet.xlsx').",
    hint: "Think of authority, hurry, fear, and curiosity.",
    level: "moderate",
    codeExample: `// Psychological Triggers in Phishing Payloads:
Authority + Urgency: "From: CEO (Mobile) -> I'm in a board meeting, transfer ₹10L to this vendor in 10 mins!"
Fear + Authority:     "From: Income Tax Dept -> Unpaid penalty warrant issued; click link to resolve immediately!"
Curiosity + Greed:    "From: HR Department -> Q4 Bonus & Salary Hike Distribution Table attached!"`
  },
  {
    question: "What is 'Business Email Compromise' (BEC / CEO Fraud), and what operational process control stops it?",
    shortAnswer: "BEC is a sophisticated social engineering attack where an attacker impersonates a high-level executive or trusted vendor to trick finance staff into transferring funds; stopped by mandatory 'Maker-Checker' dual out-of-band authorization.",
    explanation: "In a BEC attack, no malware or malicious link is used. The attacker compromises an executive's email account or spoofs their domain name, sending a believable request to the finance department to wire money to an attacker-controlled bank account. Technical email filters often fail to catch BEC because it contains only text. The definitive defense is a strict operational process: mandatory out-of-band verification (calling the executive via an official pre-registered phone number) and Maker-Checker dual authorization for any transaction above ₹50,000.",
    hint: "Think of a forged signature that can only be verified by picking up the phone and calling the signer directly.",
    level: "moderate",
    codeExample: `// Business Email Compromise (BEC) Defense:
Attack:   Spoofed email from CEO asking Finance Manager to wire ₹25,00,000 to new vendor.
Defective Response: Finance Manager wires funds based on email alone -> ₹25 Lakhs Stolen!
Process Defense:    Policy mandates Out-of-Band Call + Maker-Checker approval -> Fraud BLOCKED!`
  },
  {
    question: "What is 'Phish-Prone Percentage' (PPP), and how is it used to quantitatively track security awareness maturity?",
    shortAnswer: "PPP is the percentage of employees who click a simulated phishing link or submit credentials during an unannounced drill ($PPP = \\frac{\\text{Clicks}}{\\text{Total Employees}} \\times 100\\%$); tracked over time to measure behavioral improvement.",
    explanation: "Security awareness cannot be managed without quantitative metrics. The Phish-Prone Percentage (PPP) establishes a measurable baseline: an untrained organization typically has an initial PPP of 30% to 40% (meaning 1 in 3 employees will fall for phishing). After implementing continuous monthly simulations and just-in-time micro-training, a mature organization drops its PPP below 2% to 3%, while increasing reporting velocity (reporting threats to the SOC in under 60 seconds).",
    hint: "Divide the number of clicked links by the total number of simulated phishing emails sent.",
    level: "basic",
    codeExample: `// Quantitative Phish-Prone Percentage (PPP) Calculation:
Initial Baseline: 500 Employees sent simulated phishing -> 170 clicked link (PPP = 34.0%)
After 12 Months:  500 Employees sent advanced spear-phishing -> 8 clicked link (PPP = 1.6% - WORLD CLASS!)`
  },
  {
    question: "What is 'Just-in-Time' (JIT) Micro-Training in automated phishing simulation programs?",
    shortAnswer: "JIT micro-training is an instant, bite-sized educational lesson (30-60 seconds) displayed immediately on an employee's screen the moment they fail a simulated phishing drill, explaining the exact red flags they missed.",
    explanation: "Traditional annual 2-hour classroom lectures are forgotten within weeks. Just-in-Time (JIT) micro-training provides contextual learning at the exact moment of error. When an employee clicks a simulated malicious link, a gentle landing page appears displaying the email they just clicked, highlighting the specific red flags (spoofed sender address, fake domain, urgency language), and providing a 45-second interactive quiz reinforcing how to report the threat in the future.",
    hint: "Think of immediate coaching on the practice field the moment a player makes a mistake.",
    level: "moderate",
    codeExample: `// Just-in-Time (JIT) Micro-Training Landing Page:
"Oops! You clicked a simulated phishing email.
Don't worry—this was a safe test conducted by Kolkata FinTech Security.
Look at the red flags you missed:
1. Sender was 'ceo@paytm-verify.co' (Lookalike domain, not company email!)
2. Extreme urgency: 'Transfer funds in 15 mins!'
Next time, click the 'Report Phishing' button in Outlook!"`
  },
  {
    question: "Why is a 'Punitive / Blame Culture' counterproductive in enterprise cybersecurity awareness?",
    shortAnswer: "A punitive culture causes terrified employees to hide mistakes and conceal real breaches, allowing malware to dwell undetected for months; a positive 'No-Blame / Reward' culture encourages instant threat reporting within minutes.",
    explanation: "If an enterprise punishes, fires, or publicly shames employees who click phishing links, an employee who accidentally enters their password on a real phishing site will hide the mistake out of fear. Attackers then maintain undetected access for months. In contrast, a psychological safety culture treats reported errors as learning opportunities and rewards employees who report suspicious emails, shortening the Mean Time to Detect (MTTD) from weeks to seconds.",
    hint: "Contrast employees covering up a fire out of fear versus pulling the fire alarm immediately.",
    level: "basic",
    codeExample: `// Punitive vs Psychological Safety Culture:
Punitive Culture:   Employee clicks real phishing link -> Panics & hides mistake -> Ransomware destroys company!
No-Blame Culture:   Employee clicks link -> Immediately calls SOC -> SOC resets token in 2 mins -> Zero damage!`
  },
  {
    question: "What is a 'Security Champions Network', and how does it scale security culture across large software development organizations?",
    shortAnswer: "Security Champions are non-security employees (developers, QA engineers, product managers) trained as security advocates within their own teams, acting as the bridge between the CISO office and daily sprint operations.",
    explanation: "Central security teams are vastly outnumbered by developers (typically 1 security engineer for every 50-100 developers). A Security Champions Network selects volunteer engineers in every product team, provides them with advanced secure coding training, and empowers them to review architectural designs, run SAST scans during sprint planning, and promote cyber hygiene directly among their peers.",
    hint: "Think of appointing safety wardens on every floor of a skyscraper rather than relying on a single building inspector.",
    level: "moderate",
    codeExample: `// Security Champions Network Architecture:
[ CISO Office / Security Team (5 Engineers) ]
                     |
       [ Security Champions Network ]
   /                 |                 \\
[ Dev Team A ]    [ Dev Team B ]    [ QA Team C ]
(Champion: Dev)   (Champion: Lead)  (Champion: QA)
Outcome: 100% Sprint PRs reviewed for OWASP Top 10 vulnerabilities before deployment!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5), why is employee privacy training a statutory legal mandate?",
    shortAnswer: "Section 8(5) legally mandates implementing 'reasonable organizational measures'; untrained employees who mishandle or leak customer personal data expose the corporate entity to statutory fines up to ₹250 Crores under Section 33.",
    explanation: "The DPDP Act 2023 explicitly holds Data Fiduciaries accountable for both technical and organizational safeguards. If a customer service representative shares customer PAN or Aadhaar details on an unencrypted spreadsheet due to a lack of privacy training, the Data Protection Board will deem the enterprise negligent in its organizational obligations, attracting maximum statutory penalties of up to ₹250 Crores under Schedule 1.",
    hint: "Remember the organizational measures requirement under Indian data privacy law.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Statutory Training Mandate:
Legal Obligation: Section 8(5) - Mandatory implementation of appropriate ORGANIZATIONAL measures.
Audit Proof:      100% of staff completed verified annual DPDP data privacy & consent handling training.
Penalty Defense:  Demonstrates statutory due diligence in preventing personal data leaks!`
  },
  {
    question: "What are the core metrics tracked in an Enterprise Security Culture Balanced Scorecard?",
    shortAnswer: "1. Phish-Prone Percentage (PPP < 2%); 2. Mean Time to Report (MTTR < 60s); 3. Training Completion SLA (100%); 4. Security Champion Density (1 per 20 devs); 5. User-Reported Incident Ratio (> 60% of real threats flagged by staff).",
    explanation: "Tracking security culture requires quantitative Key Performance Indicators (KPIs): 1. PPP: Percentage of staff falling for phishing drills; 2. Reporting Velocity: Time between simulated email delivery and first employee report to the SOC; 3. Incident Ratio: The proportion of real security incidents detected by human employees rather than automated tools (a high ratio indicates a vigilant workforce); 4. Champion Density: Coverage of security champions across development squads.",
    hint: "Think of measuring infection rate, reaction speed, training coverage, and real threat detection.",
    level: "moderate",
    codeExample: `// Security Culture Maturity Scorecard:
- Phish-Prone Percentage:  1.4% (Target: < 2.0% - EXCELLENT)
- Mean Time to Report:     42 Seconds (Target: < 60s - RAPID ESCALATION)
- Training Completion:     100% (350/350 Employees Certified)
- User-Reported Threats:   68% of external phishing attempts caught by employees first!`
  },
  {
    question: "What is 'Vishing' (Voice Phishing) and 'Smishing' (SMS Phishing), and how are employees trained to counter them?",
    shortAnswer: "Vishing uses phone calls and AI voice cloning to impersonate executives or bank officials; Smishing uses SMS/WhatsApp messages with malicious links; countered by verifying caller identity through official internal channels and never sharing OTPs.",
    explanation: "Social engineering extends beyond email: 1. Vishing: Attackers use deepfake AI voice cloning to mimic the CEO's voice over WhatsApp audio, demanding urgent funds; 2. Smishing: SMS messages claiming a bank account is blocked, prompting users to click a fake KYC link. Training teaches employees: 1. Never share OTPs or passwords over the phone; 2. Always hang up and call the colleague back on their official registered internal number; 3. Never click links in unexpected SMS messages.",
    hint: "Contrast email phishing with voice phone scams (vishing) and SMS mobile scams (smishing).",
    level: "basic",
    codeExample: `// Countering AI Voice Deepfake Vishing:
Scenario: Finance clerk receives phone call with CEO's voice demanding urgent ₹10L wire transfer.
Action 1: Clerk recognizes psychological pressure and urgency.
Action 2: Clerk hangs up immediately.
Action 3: Clerk calls CEO back via official company Teams/Slack channel -> Confirms fraud attempt!`
  },
  {
    question: "What is 'Clean Desk and Clean Screen Policy' (ISO 27001 Annex A.7.7), and why is it essential for physical and visual security?",
    shortAnswer: "A policy requiring employees to lock computer screens whenever leaving workstations (Win+L) and keep desks free of sensitive physical papers, passwords, or USB keys, preventing visual snooping and unauthorized physical access.",
    explanation: "Physical security is an essential element of security culture. If an employee walks away for lunch leaving their workstation unlocked, anyone (cleaning staff, visitors, malicious insiders) can access databases, send emails from their account, or copy sensitive files. The Clean Desk/Clean Screen policy mandates: 1. Locking screens immediately upon leaving desks (Win+L); 2. Locking sensitive paper files in drawers; 3. Shredding confidential documents in cross-cut shredders.",
    hint: "Think of locking your car doors and taking valuables off the passenger seat when parking.",
    level: "basic",
    codeExample: `// Clean Desk / Clean Screen Rules:
1. Screen Lock:      Press [Windows + L] or set automated screen lock timeout to 3 minutes
2. Password Hygiene: Zero sticky notes with passwords under keyboards or on monitors
3. Physical Storage: Lock all Restricted customer paperwork in filing cabinets before leaving office`
  },
  {
    question: "Synthesizing Enterprise Security Culture and Awareness Programs: what is the master equation of the Human Firewall?",
    shortAnswer: "$$\\text{Human Firewall Resilience} = \\frac{\\text{Security Awareness} \\times \\text{Phishing Simulation Frequency} \\times \\text{Psychological Safety}}{\\text{Phish-Prone Percentage} \\times \\text{Punitive Fear}}$$ with continuous gamification and positive reinforcement.",
    explanation: "This master governance relationship proves that human cybersecurity resilience is built through continuous practice, psychological safety, and rapid feedback rather than fear or annual lectures. Fostering a blameless culture, running regular unannounced simulations with JIT micro-training, and rewarding vigilant behavior transforms employees into the most formidable, adaptive first line of defense in the enterprise.",
    hint: "Conclude by reviewing how continuous training and psychological safety maximize human resilience.",
    level: "expert",
    codeExample: `// Master Equation of the Human Firewall:
Resilience = (Awareness_Drills * Reporting_Velocity * Psychological_Safety) / (Phish_Prone_Rate + Blame);
Outcome: 100% Vigilant Workforce, Sub-60s Incident Reporting & Zero Social Engineering Breaches!`
  }
];

export default questions;
