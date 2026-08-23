const questions = [
  {
    question: "What is the Phish-Prone Percentage (PPP) in Security Awareness Training, and how is it calculated?",
    shortAnswer: "The percentage of employees who click a simulated phishing link or submit credentials out of the total recipients tested: PPP = (Total Clicks / Total Simulated Emails Sent) * 100.",
    explanation: "Before training, most organizations have a baseline PPP between 30% and 40%. A financial firm in Kolkata with 1,000 employees tests its workforce with a simulated invoice email: if 340 employees click the link, the baseline PPP is 34.0%. Continuous micro-learning and monthly simulations drive the PPP below 3.0% within 12 months.",
    hint: "The failure rate on a surprise fire drill calculated as the percentage of people who fail to evacuate.",
    level: "basic",
    codeExample: `// Phish-Prone Percentage (PPP) Calculation:
let total_simulations_sent = 1200;
let total_employee_clicks = 42;
let ppp = (total_employee_clicks / total_simulations_sent) * 100; // PPP = 3.5% (High Awareness Benchmark!)`
  },
  {
    question: "What are 'Just-in-Time (JIT) Teachable Moments' in Phishing Simulation Campaigns?",
    shortAnswer: "Immediate, interactive micro-coaching delivered to the user the exact second they click a simulated phishing link, highlighting the specific red flags they overlooked while the context is fresh.",
    explanation: "Rather than waiting for an annual compliance seminar months later, JIT education redirects a clicked user to an educational landing page within 500 milliseconds. The landing page displays the exact email they just clicked, pointing out red flags (e.g. mismatched domain, urgent wire transfer request, fake login form) while the user's emotional focus is at its peak.",
    hint: "A driving instructor gently pointing out a missed stop sign the exact second you drive past it.",
    level: "basic",
    codeExample: `// Just-in-Time (JIT) Teachable Landing Page Redirection:
if (User.Action == "Clicked_Simulated_Phish") {
    RedirectToCoachingPortal({
        EmailTemplate: "Urgent_IT_Password_Reset",
        MissedRedFlags: ["External Sender Mismatch", "Fake Domain: support-kolkata.in", "Artificial Urgency"],
        ModuleDurationSeconds: 120
    });
}`
  },
  {
    question: "Why are Punitive Measures (firing or shaming employees) Counter-Productive in Phishing Awareness Programs?",
    shortAnswer: "Punitive policies foster a culture of fear where employees hide real security mistakes, refuse to report actual phishing emails, and attempt to cover up malware infections.",
    explanation: "If employees in Kolkata fear public shaming or termination for failing a simulation, they will not report when they accidentally click a real phishing link. The malware operates undetected for months. Best practice treats training as supportive coaching, celebrating rapid reporting and turning employees into active human firewalls.",
    hint: "If a company punishes workers for reporting safety hazards, workers stop reporting hazards until a catastrophe occurs.",
    level: "moderate",
    codeExample: `// Culture Policy Comparison:
// Toxic Punitive Model : Click Phish ➔ HR Disciplinary Action ➔ Users HIDE real breaches!
// Supportive HRM Model : Click Phish ➔ 2-Min Micro-Coaching + Fast Report Button ➔ 450% Surge in Reporting!`
  },
  {
    question: "What is the 'Report Phishing' Inbox Add-in Button, and why is 'Mean Time to Report' (MTTR) a Vital Metric?",
    shortAnswer: "A one-click button in Outlook/Gmail allowing users to forward suspicious emails to the SOC; fast reporting (< 5 minutes) allows security teams to purge the phishing email globally before other users click it.",
    explanation: "When an attacker launches a spear phishing campaign against 500 employees in Salt Lake, the first employee who notices the spoofed header clicks the 'Report Phishing' button. Within 3 minutes, the SOC receives the raw headers and automated SOAR playbooks delete the malicious email from all 499 remaining inboxes globally.",
    hint: "Pulling the building fire alarm so the automated sprinklers turn on before the fire spreads.",
    level: "basic",
    codeExample: `// One-Click Phishing Reporting Add-In Logic:
function OnReportPhishingClick(email_message) {
    SOC_Ingestion_API.Post({
        RawHeaders: email_message.GetHeaders(),
        Body: email_message.GetBody(),
        SenderIP: email_message.SenderIP,
        ReportedBy: User.Email
    });
    SOAR_Engine.TriggerAutoPurgeRule(email_message.MessageID);
}`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 43A, what constitutes corporate liability for failing to implement reasonable security training practices?",
    shortAnswer: "A corporate body possessing sensitive personal data that is negligent in implementing reasonable security practices and procedures is liable to pay damages by way of compensation to affected persons.",
    explanation: "Section 43A mandates reasonable security practices (including workforce awareness and phishing countermeasures). If a company in West Bengal fails to train its finance staff and loses citizen banking data in a Business Email Compromise attack, the company faces unlimited civil compensation liabilities under Section 43A.",
    hint: "Section 43A mandates reasonable security practices and compensation for corporate negligence.",
    level: "basic",
    codeExample: `// Statutory Compliance Standard (IT Act Section 43A):
// Mandate: Corporate bodies must implement Reasonable Security Practices (Workforce Security Training)
// Liability: Compensation by way of damages for negligent security resulting in citizen data loss`
  },
  {
    question: "What are 'Safe Harbor Guidelines' in Ethical Phishing Simulation Campaign Design?",
    shortAnswer: "Rules that prohibit using excessively traumatic or cruel pretexts (e.g. fake layoff notices, fake salary cuts, tragic news) that damage employee trust and organizational morale.",
    explanation: "Simulations must reflect realistic threat lures (invoices, document shares, password resets) without abusing workplace vulnerabilities. Simulations claiming 'All staff laid off - click to view severance' inflict extreme psychological distress and destroy trust between security teams and employees. Safe harbor guidelines mandate ethical, realistic, and non-exploitative simulation pretexts.",
    hint: "A martial arts sparring match where strikes to the eyes and groin are strictly forbidden to protect the sparring partners.",
    level: "moderate",
    codeExample: `// Safe Harbor Simulation Policy Check:
let forbidden_pretexts = ["Layoff_Notice", "Salary_Reduction", "Tragic_Bereavement", "Health_Epidemic"];
if (forbidden_pretexts.Contains(ProposedSimulation.PretextType)) {
    RejectSimulation("POLICY VIOLATION: Unethical simulation pretext violates corporate Safe Harbor guidelines!");
}`
  },
  {
    question: "What is 'Adaptive Phishing Simulation Cadence' for Repeat Clickers vs High-Awareness Champions?",
    shortAnswer: "Tailoring simulation frequency and difficulty based on individual risk profiles: repeat clickers receive frequent simulations and micro-modules, while consistent reporters receive advanced spear phishing tests.",
    explanation: "A static one-size-fits-all test is ineffective. An employee in Kolkata who has failed 3 consecutive simulations is placed in an 'Intensive Coaching' tier receiving bi-weekly micro-simulations. A security champion who reports 100% of simulations receives sophisticated multi-vector spear phishing and quishing tests to continually sharpen their skills.",
    hint: "An adaptive math curriculum that gives easier practice problems to struggling students and advanced calculus to honors students.",
    level: "moderate",
    codeExample: `// Adaptive Simulation Frequency Logic:
if (User.ConsecutiveFailures >= 2) {
    User.SimulationCadence = "Bi-Weekly";
    User.AssignedTraining = "MicroModule_2Min_HeaderForensics";
} else if (User.ReportRate >= 0.90) {
    User.SimulationCadence = "Monthly_Advanced_SpearPhish";
}`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise obligations for workforce data security training?",
    shortAnswer: "Data Fiduciaries must implement organizational measures and continuous workforce training to prevent personal data breaches; failure triggers statutory penalties up to ₹250 Crores.",
    explanation: "Section 8(5) of the DPDP Act 2023 requires data fiduciaries to adopt reasonable technical and organizational safeguards. Regular workforce phishing awareness training is a core organizational safeguard. If an untrained employee clicks a phishing link leaking 200,000 health records, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Workforce training is a mandatory organizational safeguard under national data protection laws.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent workforce security training controls`
  },
  {
    question: "What is 'Micro-Learning' (2-Minute Modular Training) vs Traditional Annual 1-Hour Compliance Videos?",
    shortAnswer: "Delivering short, focused, interactive 90-120 second scenario challenges monthly, yielding 4x higher retention rates and significantly higher engagement than long annual slide lectures.",
    explanation: "Human memory decays rapidly (Ebbinghaus Forgetting Curve). An annual 60-minute video is forgotten within 3 weeks. Micro-learning delivers 2-minute scenario challenges (e.g. 'Spot the 3 red flags in this WhatsApp message') every 30 days. This keeps security top-of-mind year-round, permanently altering daily email evaluation habits.",
    hint: "Exercising for 10 minutes every day vs running a marathon once a year without training.",
    level: "basic",
    codeExample: `// Micro-Learning Retention Metrics:
// Annual 60-Minute Lecture ➔ 30-Day Knowledge Retention: 12%
// Monthly 2-Minute Modules   ➔ 365-Day Knowledge Retention: 84% (7x Higher Long-Term Retention!)`
  },
  {
    question: "What is 'Quishing (QR Code Phishing) Simulation Testing' in Modern Enterprise Training?",
    shortAnswer: "Testing employee awareness against PDF documents or physical posters embedded with QR codes that lead to credential-harvesting login pages.",
    explanation: "Traditional secure email gateways struggle to inspect QR codes inside PDF attachments. Quishing simulations send test emails with messages like 'Scan this QR code to update your MFA authentication app'. Employees learn to never scan untrusted QR codes with personal smartphones for corporate authentication tasks.",
    hint: "Teaching employees that a QR code is just a URL that you cannot read with your eyes.",
    level: "moderate",
    codeExample: `// Quishing Simulation Payload Structure:
[Simulated PDF Attachment] ➔ [Embedded QR Code: https://verify-mfa-kolkata.in/test-token]
// Result: Educates users to verify URLs before scanning QR codes with mobile devices!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the role of workforce awareness in meeting the 6-hour incident reporting requirement?",
    shortAnswer: "Trained employees who immediately report phishing lures allow the SOC to identify attacks and report specified cybersecurity incidents to CERT-In well within the mandatory 6-hour window.",
    explanation: "If employees do not report phishing emails, a breach can go unnoticed for an average of 200 days, resulting in severe non-compliance with CERT-In mandatory directions. When employees report attacks within minutes, security teams isolate the threat and notify CERT-In within the mandatory 6-hour SLA under Section 70B.",
    hint: "Trained employees act as early warning radar sensors for the mandatory 6-hour CERT-In SLA.",
    level: "basic",
    codeExample: `// Statutory SLA Compliance Workflow:
// Minute 02: Employee Mamata clicks "Report Phishing" Button
// Minute 15: SOC isolates malicious C2 infrastructure
// Hour   02: Formal Incident Report dispatched to CERT-In (Well within 6-Hour Mandate!)`
  },
  {
    question: "What is a 'Security Champions Program' in Enterprise Culture Transformation?",
    shortAnswer: "Recruiting and training enthusiastic non-security staff across departments (finance, engineering, HR) to act as local cybersecurity advocates and peer mentors within their teams.",
    explanation: "Security teams cannot be in every meeting. A security champion is an accountant in Salt Lake or a software developer in Barrackpore who receives advanced threat briefing and represents the security team locally. When a coworker receives a suspicious wire transfer request, the champion provides immediate guidance before money is moved.",
    hint: "Appointing a volunteer fire warden on every floor of an office building.",
    level: "basic",
    codeExample: `// Security Champions Network Structure:
// Finance Champion (Mamata)   ➔ Reviews high-value wire verification workflows
// Substation Champion (Debangshu) ➔ Inspects USB and physical badge compliance
// Clinical Champion (Mahima)  ➔ Mentors hospital staff on VIP patient record privacy`
  },
  {
    question: "What are 'Smishing and Vishing Simulated Exercises' in Multi-Channel Awareness Training?",
    shortAnswer: "Simulating fake SMS package delivery alerts and simulated phone calls from IT support to test workforce resistance to multi-channel social engineering vectors.",
    explanation: "Phishing is no longer limited to email. Multi-channel simulations test whether employees will give out one-time passwords (OTP) over the phone to a simulated 'Help Desk Support' caller or click malicious links in SMS messages sent to corporate mobile devices.",
    hint: "Conducting surprise fire drills that test both the stairwells (email) and the emergency exits (voice/SMS).",
    level: "moderate",
    codeExample: `// Smishing Simulation Template:
"SBI Alert: Your NetBanking account is locked due to pending KYC. Verify immediately at: https://kyc-sbi-update.in/sim"
// If employee clicks ➔ Redirects to Mobile Teachable Moment!`
  },
  {
    question: "Under the Indian IT Act Section 66D, what constitutes the criminal penalty for creating deceptive phishing lures that impersonate banks or executive leadership?",
    shortAnswer: "Cheating by personating legitimate corporate officers or financial institutions carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly penalizes cheating by personation: 'Whoever, by means of any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D covers Cheating by Personation via deceptive phishing communications.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66D):
// Offense: Impersonating bank managers or corporate executives to defraud victims via email/SMS
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'Gamification & Department Leaderboards' in Security Awareness Engagement?",
    shortAnswer: "Using competitive scoring, badges, and recognition for departments with the fastest phishing reporting times and lowest click rates, creating positive social motivation.",
    explanation: "Instead of fear, gamification leverages healthy peer competition. The Finance department in Kolkata competes against the Engineering department for the monthly 'Top Human Firewall Trophy'. Departments are ranked by mean reporting speed and zero-click streaks, transforming security into a celebrated team achievement.",
    hint: "A school sports day where classes compete for the best teamwork trophy.",
    level: "basic",
    codeExample: `// Gamification Leaderboard Logic:
// 1st Place : Engineering Team (0.0% Clicks | 4.2 Min Avg Report Time | Gold Badge)
// 2nd Place : Finance Core (1.1% Clicks | 6.8 Min Avg Report Time | Silver Badge)
// 3rd Place : Operations Team (2.4% Clicks | 11.0 Min Avg Report Time | Bronze Badge)`
  },
  {
    question: "How do 'High-Context Spear Phishing Simulations' prepare Executive Leadership against Whaling Attacks?",
    shortAnswer: "By crafting customized simulations referencing real board meetings, acquisition rumors, or corporate legal pretexts to test C-suite executives and executive assistants.",
    explanation: "Executives ignore generic 'Package Delivery' phishing emails. Whaling simulations use publicly available OSINT (e.g. recent press releases, board filings in Kolkata) to simulate an urgent confidential request from a board member or corporate attorney. This trains leadership to strictly follow out-of-band verification protocols.",
    hint: "A specialized military flight simulator designed specifically for fighter jet pilots rather than commercial airline trainees.",
    level: "expert",
    codeExample: `// Whaling Simulation Pretext:
"Subject: CONFIDENTIAL: Board Resolution on Proposed Kolkata Acquisition - Review Before 4 PM"
// Tests whether the CFO verifies the request via telephone before reviewing confidential attachments!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Corporate Funds via Phishing?",
    shortAnswer: "Deceiving an employee to transfer money or property under fraudulent pretenses, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and dishonest inducement. When cybercriminals deceive corporate staff into transferring funds via phishing lures, the perpetrators are prosecuted under Section 420 alongside IT Act Section 66D.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for phishing wire fraud.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving accounting staff via phishing lures to wire ₹2.4 Crores to attacker accounts
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'USB Drop Baiting Physical Simulation Testing' in Enterprise Facilities?",
    shortAnswer: "Leaving deliberately placed simulated USB flash drives in parking lots, cafeterias, and lobbies to test whether employees plug untrusted storage devices into corporate computers.",
    explanation: "Physical baiting tests the workforce's curiosity. Security teams place branded USB drives labeled 'Executive Salaries 2026' in corporate common areas in Salt Lake. The drive contains a harmless simulated tracking payload: when plugged into a PC, it alerts the security portal and launches an immediate physical security coaching module.",
    hint: "Testing if someone will pick up and drink from an unlabeled bottle left on the sidewalk.",
    level: "moderate",
    codeExample: `// USB Drop Simulation Payload:
[Physical USB labeled "Q3_Bonus_Payouts.xlsx"] ➔ Plugged into PC ➔ Triggers harmless tracking beacon
➔ Action: Displays "PHYSICAL SECURITY COACHING: Never plug untrusted USBs into corporate devices!"`
  },
  {
    question: "How does NIST SP 800-50 structure an Enterprise Security Awareness and Training Program?",
    shortAnswer: "Across 4 progressive tiers: Awareness (broad baseline messaging), Training (role-based skill development), Education (deep technical expertise), and Professional Development (certifications).",
    explanation: "NIST SP 800-50 establishes that awareness changes behavior, while training teaches specific skills. A general employee needs Awareness on spotting phishing lures. A software developer needs Training on secure coding (OWASP Top 10). A security architect needs deep Education on cryptography and threat modeling.",
    hint: "Elementary school (Awareness) ➔ Trade school (Training) ➔ University degree (Education).",
    level: "moderate",
    codeExample: `// NIST SP 800-50 Tiers:
// Tier 1 (Awareness) : All 1,200 Employees ➔ Monthly Phishing Simulations & Micro-Modules
// Tier 2 (Training)  : Software Developers ➔ Secure Coding & Input Sanitization Labs
// Tier 3 (Education) : Security Engineers ➔ Incident Response, Forensics & Cryptography`
  },
  {
    question: "What is 'Phishing Simulation Evasion Testing' against Internal Email Gateways?",
    shortAnswer: "Verifying that simulation headers (e.g. `X-PHISHTEST`) are whitelisted in mail filters so that test emails reach employee inboxes without being pre-blocked by spam filters.",
    explanation: "If enterprise mail gateways block simulated phishing tests before delivery, employees receive zero training and the organization assumes a fake 0.0% PPP. Security engineers configure transport rules to bypass spam inspection ONLY for verified simulation IP addresses, ensuring that employees are tested against realistic threat lures.",
    hint: "Making sure the fire alarm bell is working before holding a fire evacuation drill.",
    level: "expert",
    codeExample: `// Exchange Transport Rule for Phishing Simulations:
// Condition: Sender IP equals 198.51.100.50 AND Header "X-PHISHTEST" exists
// Action   : Set SCL (Spam Confidence Level) = -1 (Bypass Spam Filtering to deliver test email!)`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for sending malicious phishing communications to defraud computer systems?",
    shortAnswer: "Dishonestly or fraudulently using computer systems to send phishing communications carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer use: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer use.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Operating phishing infrastructure to harvest employee credentials
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Role-Based Targeted Security Training' for High-Risk Departments (Finance, HR, IT)?",
    shortAnswer: "Customizing training curriculums to match the specific attack vectors targeting each department (e.g. BEC and invoice fraud for Finance, malicious CV macros for HR, credential stuffing for IT).",
    explanation: "An HR specialist rarely handles wire transfers; they handle hundreds of external resumes daily (vulnerable to malicious PDF/DOCX macros). Finance staff receive spoofed supplier invoices. Role-based training delivers tailored threat scenarios matching the exact daily workflows of each department.",
    hint: "Teaching firefighters how to put out fires and teaching lifeguards how to save drowning swimmers.",
    level: "basic",
    codeExample: `// Role-Based Training Curriculum Assignment:
// HR Department     ➔ Module: "Malicious Resume Macros & LinkedIN Recruiter Phishing"
// Finance Department➔ Module: "Business Email Compromise (BEC) & Out-of-Band Wire Verification"
// IT Service Desk   ➔ Module: "Vishing Social Engineering & MFA Reset Verification Protocols"`
  },
  {
    question: "How do 'Click-to-Report Ratio (C2R)' Metrics quantify Organizational Resilience?",
    shortAnswer: "Measuring the ratio of employees who report a phishing simulation versus those who click it; resilient organizations achieve C2R > 10:1 (10 reports for every 1 click).",
    explanation: "Traditional metrics only track failure (clicks). The Click-to-Report Ratio (C2R) tracks positive active defense. If 5 employees click a simulation but 65 employees report it within 10 minutes, the C2R is $13:1$. This proves that the organization has an active human detection network capable of overwhelming the attacker's speed.",
    hint: "Comparing how many people trip over a hazard vs how many people pick it up and warn others.",
    level: "moderate",
    codeExample: `// Click-to-Report Ratio (C2R) Calculation:
let total_clicks = 4;
let total_reports = 52;
let c2r_ratio = total_reports / total_clicks; // C2R = 13.0 (World-Class Human Firewall Benchmark!)`
  },
  {
    question: "Under the Indian Penal Code Section 419, what constitutes Punishment for Cheating by Personation via Telephone or Voice Calls (Vishing)?",
    shortAnswer: "Personating bank officials or IT technicians over voice calls to steal sensitive OTPs or financial passwords carries imprisonment up to 3 years and fines.",
    explanation: "Section 419 IPC penalizes cheating by personation: 'Whoever cheats by personation shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.' Vishing scammers who call employees pretending to be IT technicians are prosecuted under Section 419.",
    hint: "IPC Section 419 covers Cheating by Personation for vishing telephone scams.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 419):
// Offense: Calling employees pretending to be IT Helpdesk to harvest Microsoft 365 passwords
// Penalty: Imprisonment for a term up to 3 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Post-Incident Learning & Blameless Post-Mortems' in Phishing Incident Response?",
    shortAnswer: "Reviewing real-world phishing security incidents collaboratively to identify systemic process weaknesses without blaming individual employees who fell for the lure.",
    explanation: "If an employee in Kolkata falls for a spear phishing lure that leads to a minor malware infection, a blameless post-mortem analyzes: Why did the email bypass perimeter filters? Why was the domain not flagged? Why was MFA not enforced on the endpoint? Addressing the systemic vulnerabilities makes the entire organization resilient without scapegoating the employee.",
    hint: "An airplane crash investigation that studies mechanical and procedural improvements to make all future flights safer.",
    level: "moderate",
    codeExample: `// Blameless Post-Mortem Structure:
// 1. Root Cause Analysis : Inbound Gateway missed newly registered lookalike domain
// 2. Control Improvement : Implemented DMARC p=reject + DNS Sinkholing for newly registered domains
// 3. User Coaching       : Provided supportive 2-minute micro-module on display name spoofing`
  },
  {
    question: "How do 'Simulated Credential Harvesting Landing Pages' safely test User Susceptibility?",
    shortAnswer: "Hosting realistic fake login portals that record whether a user submitted data without ever saving or logging the actual passwords typed into the form.",
    explanation: "Simulated landing pages (e.g. fake Microsoft 365 or Google login screens) test if employees will type their corporate credentials. For strict ethical and privacy compliance, the simulation backend discards password strings immediately, logging only a binary boolean flag (`CredentialsSubmitted = true`) to protect employee privacy.",
    hint: "A test mailbox that counts how many envelopes are dropped in without reading any personal letters.",
    level: "expert",
    codeExample: `// Privacy-Preserving Credential Submission Handler:
function OnFormSubmit(username, password) {
    // CRITICAL: NEVER log or store the plaintext password!
    AnalyticsEngine.RecordEvent({
        UserID: HashUser(username),
        Event: "Submitted_Credentials_To_Simulation",
        Timestamp: GetCurrentUTC()
    });
    DisplayTeachableMoment();
}`
  },
  {
    question: "What is 'Behavioral Conditioning & Cognitive Muscle Memory' in Phishing Resistance?",
    shortAnswer: "Building an instinctive habit where employees automatically inspect sender headers, hover over links, and verify out-of-band requests without needing to consciously deliberate.",
    explanation: "Through continuous monthly micro-simulations, checking email headers becomes an automatic cognitive reflex—similar to checking rearview mirrors before changing lanes while driving. Employees spot anomalies subconsciously, rendering social engineering manipulation tactics ineffective.",
    hint: "A martial artist who automatically blocks a punch without having to stop and think about it.",
    level: "basic",
    codeExample: `// Behavioral Conditioning Reflex Loop:
// 1. Trigger  : Inbound email requesting urgent wire transfer or password change
// 2. Routine  : Subconscious cognitive pause ➔ Inspect Return-Path + Hover over URL
// 3. Reward   : Click "Report Phishing" Button ➔ Earn Security Champion Badge!`
  },
  {
    question: "Synthesize an enterprise-scale Security Awareness Training & Human Risk Management (HRM) Architecture.",
    shortAnswer: "A unified system combining Multi-Tier Adaptive Simulations, Instant JIT Teachable Moments, One-Click Phishing Reporting with Auto-SOAR Purging, Micro-Learning Curriculums, and Security Champions Networks.",
    explanation: "To achieve complete human layer resilience: 1. Baseline Assessment Tier: Continuous multi-channel simulations (Email, SMS, Voice, QR, USB) measuring Phish-Prone Percentage. 2. Educational Tier: Monthly 2-minute micro-modules replacing boring annual lectures. 3. Coaching Tier: Instant 500ms JIT teachable landing pages on simulation clicks. 4. Operational Defense Tier: One-click 'Report Phishing' button triggering automated SOAR cross-mailbox purging. 5. Cultural Tier: Gamified department leaderboards and peer Security Champions networks.",
    hint: "Combine adaptive multi-channel simulations, instant JIT coaching, one-click SOAR report buttons, micro-learning, and gamified champion networks.",
    level: "expert",
    codeExample: `// Master Human Risk Management (HRM) Architecture:
// 1. Simulation Engine : Adaptive Multi-Channel Tests (Email Spear Phishing, Quishing, Smishing, USB Drops)
// 2. Coaching Engine   : 500ms Just-in-Time (JIT) Interactive Micro-Modules on Click
// 3. Response Engine   : One-Click "Report Phishing" Button triggering Auto-SOAR Mailbox Purge in < 3 Mins
// 4. Learning Engine   : Monthly 2-Minute Role-Based Micro-Challenges (84% Long-Term Retention)
// 5. Culture Engine    : Department Gamification Leaderboards & Peer Security Champions Network`
  },
  {
    question: "Synthesize the mathematical relationship between Baseline Phish-Prone Percentage (P_baseline), Training Intensity (T_training), Simulation Cadence (C_cadence), Lure Difficulty (D_difficulty), and Final Click Probability (P_click).",
    shortAnswer: "Phish-prone vulnerability is modeled as P_click = P_baseline * e^(- (T_training * C_cadence) / D_difficulty); continuous monthly simulations and micro-learning reduce click vulnerability from 35% to under 2.1%.",
    explanation: "Let $P_{\\text{baseline}} \\approx 0.35$ (35% baseline PPP), $T_{\\text{training}} \\ge 1.0$ represent the training quality (micro-learning = 4.0), $C_{\\text{cadence}} \\ge 1.0$ represent the simulation frequency (monthly = 4.0), and $D_{\\text{difficulty}}$ represent the lure sophistication factor. The final click probability is: $P_{\\text{click}} = P_{\\text{baseline}} \\times e^{-\\frac{T_{\\text{training}} \\times C_{\\text{cadence}}}{D_{\\text{difficulty}}}}$. When organizations enforce monthly micro-simulations and JIT coaching ($T \\times C \\gg D$), workforce phish-prone rates collapse below 2.0%.",
    hint: "Mathematical formula proving that continuous monthly simulations and micro-learning exponentially drive phish-prone rates from 35% down to under 2.1%.",
    level: "expert",
    codeExample: `// Human Risk Reduction Mathematical Proof:
// Baseline PPP = 35.0% | Training Quality = 4.0 (Micro-Learning) | Cadence = 4.0 (Monthly) | Difficulty = 4.0
// Final Phish-Prone Probability: P_click = 0.35 * e^(- (4.0 * 4.0) / 4.0) = 0.35 * e^(-4.0) = 0.64% (SECURED HUMAN FIREWALL!)`
  }
];

export default questions;
