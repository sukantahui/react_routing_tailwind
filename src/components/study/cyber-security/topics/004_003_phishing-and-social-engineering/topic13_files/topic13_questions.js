const questions = [
  {
    question: "What happened in the 2020 Twitter / X Social Engineering Incident, and how did attackers breach the internal administrative tool?",
    shortAnswer: "Attackers conducted spear vishing phone calls against remote Twitter employees, posing as IT Helpdesk staff to harvest VPN credentials and bypass 2FA, gaining access to the internal customer support admin tool to hijack 130 VIP accounts.",
    explanation: "In July 2020, cybercriminals called Twitter customer service and IT employees working remotely during the COVID-19 pandemic. Posing as Twitter's internal IT department, they convinced staff to enter their credentials onto a convincing phishing portal. Once inside the internal network, attackers escalated privileges to Twitter's internal customer support tool ('God Mode'), resetting email addresses and tweeting a Bitcoin scam from 130 prominent accounts (Barack Obama, Elon Musk, Apple, Bill Gates).",
    hint: "Calling IT helpdesk employees over the phone to steal administrative credentials and tweet Bitcoin scams from verified celebrity accounts.",
    level: "basic",
    codeExample: `// 2020 Twitter Breach Attack Chain:
// 1. Vector      : Spear Vishing phone calls to remote employees posing as internal IT Helpdesk
// 2. Credential  : Fake internal VPN phishing portal harvesting MFA credentials
// 3. Escalation  : Access to internal admin tool resetting account recovery emails
// 4. Impact      : 130 VIP accounts hijacked; ₹1 Crore+ in Bitcoin stolen in 2 hours!`
  },
  {
    question: "How did Evaldas Rimasauskas execute the ₹1,000+ Crore ($120M) BEC Invoice Fraud against Google and Facebook (2013-2015)?",
    shortAnswer: "He registered a fake clone company in Latvia with the exact same name as Quanta Computer (a major Asian hardware supplier), forged invoices, contracts, and corporate stamps, and tricked finance departments into wiring funds to Latvian and Cypriot bank accounts.",
    explanation: "Between 2013 and 2015, Rimasauskas set up a Latvian shell company named 'Quanta Computer Inc.' matching Taiwan-based supplier Quanta Computer. He sent fake invoices for computer servers to Google and Facebook accounting teams, complete with forged contracts signed by real corporate executives and counterfeit corporate stamps. Google wired $23M and Facebook wired $98M before the deception was uncovered. Rimasauskas was extradited to the US and sentenced to 5 years in federal prison.",
    hint: "Registering a fake company with the exact same name as a genuine supplier and mailing fake invoices with forged executive stamps.",
    level: "basic",
    codeExample: `// Evaldas Rimasauskas BEC Mechanism:
// Real Supplier   : Quanta Computer (Taiwan) - Supplies servers to Google/Facebook
// Fake Company    : Quanta Computer Inc. (Latvia) - Registered by fraudster
// Tactic          : Forged contracts, fake invoices & corporate seals matching real purchase orders
// Stolen Amount   : ₹1,000+ Crores ($120 Million) across 2 years before discovery!`
  },
  {
    question: "Why did Cloudflare survive the 2022 '0ktapus' (Twilio) Phishing Attack while other Tech Giants were Breached?",
    shortAnswer: "Cloudflare enforced mandatory physical FIDO2 / WebAuthn hardware security keys (YubiKeys) for all employee logins; hardware-bound origin binding mathematically prevented the AiTM phishing proxy from capturing valid authentication tokens.",
    explanation: "In the August 2022 '0ktapus' campaign, over 130 tech companies (including Twilio, DoorDash, and Mailchimp) were compromised via SMS phishing messages containing links to fake Okta login portals. When Cloudflare employees clicked the link and entered credentials, the attacker's AiTM reverse proxy could not harvest a valid session because Cloudflare required physical FIDO2 YubiKeys. Because FIDO2 cryptographically binds the authentication assertion to the genuine browser URL (`cloudflare.okta.com`), the key refused to sign for the phishing domain (`cloudflare-okta.com`).",
    hint: "Physical hardware keys that mathematically refuse to sign credentials for fake lookalike websites.",
    level: "expert",
    codeExample: `// FIDO2 Hardware Token WebAuthn Origin Binding:
// User Browser URL       : https://cloudflare-okta.evil-phish.in (Attacker Proxy)
// FIDO2 YubiKey Challenge: Computes SHA-256 hash of origin "cloudflare-okta.evil-phish.in"
// Key Expected Domain    : "cloudflare.okta.com"
// Result                 : Cryptographic Signature REFUSED ➔ Attack 100% BLOCKED!`
  },
  {
    question: "What is 'MFA Fatigue / Push Notification Bombing', and how was it used in the 2022 Uber Breach?",
    shortAnswer: "Flooding an employee's smartphone with dozens of MFA push authorization prompts in the middle of the night, followed by contacting the employee on WhatsApp posing as IT support asking them to accept the prompt to stop the notifications.",
    explanation: "In September 2022, an 18-year-old attacker purchased a contractor's stolen password. To bypass Duo MFA push notifications, the attacker sent repeated push requests at 1:00 AM. When the contractor rejected them, the attacker messaged the contractor on WhatsApp claiming to be 'Uber IT Support' and saying the notifications would stop if they approved just one prompt. The exhausted contractor approved the notification, granting the attacker internal access to Uber's Slack, AWS, and G Suite consoles.",
    hint: "Ringing the doorbell 50 times at 2 AM until the exhausted homeowner opens the door just to make the noise stop.",
    level: "moderate",
    codeExample: `// MFA Push Bombing Attack Flow:
// Step 1: Attacker sends 45 Duo Push notifications to contractor at 01:15 AM
// Step 2: Contractor rejects prompts
// Step 3: Attacker WhatsApps contractor: "Hi, this is Uber IT. Please accept the prompt to stop the bug."
// Step 4: Contractor clicks [APPROVE] ➔ Full Internal Access Compromised!`
  },
  {
    question: "What happened in the 2016 Bangladesh Bank SWIFT Heist, and how did Spear Phishing enable ₹8,000+ Crore ($1B) in Attempted Transfers?",
    shortAnswer: "Adversaries sent custom spear phishing emails with malicious CVs to Bangladesh Bank staff in Dhaka, deploying malware that captured SWIFT terminal credentials and manipulated MT103 financial transfer messages.",
    explanation: "In January 2015, North Korean threat actors (Lazarus Group) sent targeted spear phishing emails containing a malicious resume to Bangladesh Bank employees in Dhaka. Once inside, malware moved laterally to the air-gapped SWIFT terminal network. In February 2016, attackers issued 35 fraudulent SWIFT transfer orders totaling $951 Million (₹8,000+ Crores) to the Federal Reserve Bank of New York. While $850M was intercepted due to a spelling error ('fandation'), $81 Million was laundered through Philippine casinos.",
    hint: "Spear phishing email with a fake job application resume that gave hackers access to the nation's central bank SWIFT financial transfer terminals.",
    level: "expert",
    codeExample: `// 2016 Bangladesh Bank SWIFT Heist Timeline:
// 1. Initial Access: Spear phishing email with malicious CV to bank staff in Dhaka
// 2. Lateral Pivot : Compromised air-gapped SWIFT alliance access software
// 3. Execution     : Issued 35 fraudulent MT103 wire orders for $951 Million (₹8,000+ Crores)
// 4. Discovery     : A typo ("Shalika Fandation" instead of Foundation) halted $850 Million!`
  },
  {
    question: "What is an 'Out-of-Band (OOB) Dual Verification Protocol' for Enterprise Wire Transfers?",
    shortAnswer: "A mandatory non-technical policy requiring accounting staff to verbally verify any bank account change or wire transfer exceeding a threshold (e.g. ₹1,00,000) using a pre-established, trusted phone number from an internal directory.",
    explanation: "Adversaries frequently compromise email threads to change supplier bank account details (Supplier Swindle BEC). An Out-of-Band (OOB) verification policy dictates that email confirmation alone is legally invalid. Accounting staff in Kolkata must call the vendor using the pre-registered phone number on the original contract—NEVER the phone number listed in the suspicious email—to verbally confirm the bank transfer.",
    hint: "Calling your vendor on the phone number from your safe to confirm new banking details before sending money.",
    level: "basic",
    codeExample: `// Out-of-Band (OOB) Dual Verification Policy Rule:
if (WireTransfer.Amount >= 100000 && WireTransfer.BankDetailsChanged == true) {
    EnforceOutOfBandVerification({
        Method: "Voice_Call_PreRegistered_Directory",
        ApprovedSignaturesRequired: 2,
        Prohibited: "Email confirmation alone is strictly VOID!"
    });
}`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the corporate liabilities if Social Engineering results in citizen data loss?",
    shortAnswer: "Failure to implement adequate organizational and technical social engineering defenses resulting in personal data leaks triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) of the DPDP Act 2023 mandates that data fiduciaries must implement reasonable technical and organizational safeguards against data breaches. If an organization in West Bengal allows an employee to be tricked by social engineering into handing over 500,000 citizen records, the Data Protection Board of India (DPBI) can impose maximum penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to implement social engineering defenses triggers maximum national data privacy penalties.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent social engineering safeguards`
  },
  {
    question: "What is the 'Two-Person Rule / Dual Custody' in Critical Administrative and Financial Operations?",
    shortAnswer: "A security control requiring two authorized individuals to independently approve a sensitive transaction or database modification before the system will execute it.",
    explanation: "The Two-Person Rule prevents a single compromised or coerced employee from causing catastrophic harm. In a Kolkata FinTech firm, dropping a production table or executing a wire transfer over ₹10,00,000 requires cryptographic approvals from both the Lead DBA (Mamata) and the Operations Director. If an attacker social engineers one person, the transaction cannot proceed without the second independent signoff.",
    hint: "Two missile launch keys located on opposite sides of the room that must be turned simultaneously by two different officers.",
    level: "basic",
    codeExample: `// Two-Person Rule Cryptographic Authorization Flow:
let tx = CreateFinancialTransferRequest(Amount=5000000);
tx.RequiresApproval("Lead_DBA_Mamata");
tx.RequiresApproval("Operations_Director");
// System execution BLOCKED until both hardware HSM cryptographic tokens are presented!`
  },
  {
    question: "How does 'Number Matching' in MFA Authenticator Apps Defeat MFA Fatigue / Push Bombing Attacks?",
    shortAnswer: "By requiring the user to look at a 2-digit number displayed on their computer login screen and manually type that exact number into their mobile authenticator app, preventing accidental approvals.",
    explanation: "Legacy push notifications presented simple [APPROVE] and [DENY] buttons. An exhausted employee at 2 AM could mindlessly tap [APPROVE]. In Number Matching (now standard in Microsoft Authenticator and Duo), the computer screen displays a number like '47'. The user cannot approve the prompt unless they actively type '47' into their mobile device, rendering blind push approvals impossible.",
    hint: "Forcing the user to read a specific two-digit code on their computer and type it into their phone to prove they are actively sitting at their desk.",
    level: "moderate",
    codeExample: `// Microsoft Authenticator Number Matching Flow:
// Computer Screen Display : "Enter the number shown: [ 74 ]"
// Mobile Phone Prompt     : User must type [ 74 ] to authorize.
// Result                  : Blindly tapping "Approve" is IMPOSSIBLE during MFA bombing!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66D, what constitutes the criminal penalty for Social Engineering Cheating by Personation?",
    shortAnswer: "Cheating by personating legitimate corporate executives, vendors, or government officials via computer resources carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D explicitly covers social engineering impersonation: 'Whoever, by means of any communication device or computer resource, cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D covers Cheating by Personation with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Impersonating company leadership or vendors in Business Email Compromise wire scams
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'Conditional Access and Risk-Based Authentication' in Zero-Trust Identity Protection?",
    shortAnswer: "Evaluating contextual signals (device health, IP reputation, impossible travel, user risk score) in real time before granting access, automatically enforcing step-up MFA or blocking untrusted connections.",
    explanation: "Rather than granting binary access based solely on passwords, Conditional Access (e.g. Entra ID / Okta) evaluates real-time telemetry: Is the device compliant? Is the connection coming from an unapproved anonymous proxy? Is the user logging in from Barrackpore at an unusual hour? If any risk condition is triggered, the system requires hardware FIDO2 re-verification or blocks access entirely.",
    hint: "A smart security guard who checks your ID badge, checks if you are wearing the proper uniform, and checks if you are trying to enter after hours.",
    level: "expert",
    codeExample: `// Conditional Access Zero-Trust Rule:
if (Session.DeviceStatus != "Managed_Hybrid_Joined" || Session.IPReputation == "Tor_Exit_Node") {
    BlockAccess("ACCESS DENIED: Untrusted device or anonymous egress IP detected!");
}`
  },
  {
    question: "What is the Ministry of Home Affairs (MHA) Indian Cyber Crime Coordination Centre (I4C) Helpline 1930 and the CFCFRMS Platform?",
    shortAnswer: "The national emergency financial fraud reporting system (Citizen Financial Cyber Fraud Reporting and Management System - Helpline 1930) that coordinates with banks to freeze stolen funds in transit within the 'Golden Hour'.",
    explanation: "If a company or citizen in West Bengal falls victim to social engineering wire fraud, reporting the transaction to Helpline 1930 or `cybercrime.gov.in` within the first 2-3 hours ('Golden Hour') allows the I4C CFCFRMS platform to automatically trigger electronic hold requests across beneficiary banks, freezing stolen funds before scammers can withdraw cash from ATMs.",
    hint: "The emergency 1930 national helpline for freezing stolen cyber funds in transit.",
    level: "basic",
    codeExample: `// Emergency Financial Fraud Incident Workflow:
// Minute 00: ₹25,00,000 fraudulently wired due to spoofed vendor invoice
// Minute 30: Incident reported to National Helpline 1930 (CFCFRMS Platform)
// Minute 45: Beneficiary bank account frozen electronically ➔ 100% Funds Recovered!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for social engineering breaches and financial cyber fraud?",
    shortAnswer: "All organizations in India must report social engineering intrusions, Business Email Compromise incidents, and data breaches to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, corporate bodies, service providers, and intermediaries must mandatorily report specified cyber security incidents (including social engineering compromises and BEC attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of social engineering intrusions within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Voice Deepfake Audio Watermarking & Biometric Challenge-Response' in Vishing Defense?",
    shortAnswer: "Detecting AI-synthesized synthetic speech by analyzing micro-spectral frequency artifacts and issuing real-time unpredictable verbal cognitive challenges that AI voice clones cannot synthesize in real time.",
    explanation: "Adversaries use generative AI to clone executive voices in under 3 seconds. To defend against real-time voice vishing in Kolkata: 1. Audio analysis tools detect synthetic vocoder artifacts and phase jitter; 2. The recipient asks a shared personal question: 'What restaurant did our team eat at in Salt Lake last Thursday?' AI voice clones reading attacker scripts cannot respond dynamically without high latency ($> 2000$ ms).",
    hint: "Asking a secret question that only the real person would know to expose an AI voice imposter.",
    level: "expert",
    codeExample: `// Voice Deepfake Interactive Challenge Protocol:
// Attacker (AI Clone) : "Mamata, this is the Managing Director. Wire ₹50 Lakhs immediately."
// Mamata Challenge    : "Understood, Sir. What was the name of the project we discussed over tea yesterday?"
// AI Latency / Error  : 3-second delay / hallucinates incorrect answer ➔ VISHING EXPOSED!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Corporate Funds via Social Engineering?",
    shortAnswer: "Deceiving company employees under false executive or vendor pretexts to dishonestly induce the transfer of funds, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating. Cybercriminals who deceive corporate accounting personnel into wiring company money under fraudulent executive or supplier pretexts are prosecuted under Section 420 alongside IT Act Section 66D.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for social engineering wire fraud.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Tricking accounting staff via social engineering into transferring ₹4.2 Crores
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "How does 'Network Micro-Segmentation & Blast Radius Containment' mitigate the impact when Social Engineering succeeds?",
    shortAnswer: "By restricting network traffic between internal workloads so that a single compromised employee workstation cannot communicate laterally with core database servers or domain controllers.",
    explanation: "Assume breach is a core Zero-Trust principle. If an employee in Kolkata falls for a spear phishing lure and downloads malware, micro-segmentation (e.g. VMware NSX / Illumio) ensures the compromised workstation can ONLY communicate with its default gateway. Lateral pivoting via SMB, RDP, or SSH to internal financial clusters is blocked and logged immediately.",
    hint: "Watertight bulkheads inside a ship that prevent one flooded room from sinking the entire vessel.",
    level: "expert",
    codeExample: `// Micro-Segmentation Zero-Trust Rule:
// Workstation Subnet (10.0.50.0/24) ➔ Core Financial Subnet (10.0.10.0/24)
// Action: DROP ALL LATERAL TRAFFIC (Blocks ransomware and lateral pivoting!)`
  },
  {
    question: "What is 'Privileged Identity Management (PIM) and Just-in-Time (JIT) Elevation' in Social Engineering Defense?",
    shortAnswer: "Eliminating standing administrative privileges; administrators operate as standard users 99% of the time, requesting temporary, time-bound (e.g. 4-hour) elevated rights only when needed, requiring multi-party approval.",
    explanation: "If an IT administrator in Salt Lake is tricked by a phishing email while possessing 24/7 standing Domain Admin privileges, the attacker instantly gains full control. With JIT PIM, the admin account has zero admin rights by default. To perform maintenance, they must submit a ticket, pass biometric MFA, and receive approval for temporary 2-hour access, closing the attacker's window of opportunity.",
    hint: "A master key that only works for 2 hours after getting written permission from the building manager.",
    level: "moderate",
    codeExample: `// Microsoft Entra PIM Just-in-Time Role Activation:
// User: Mamata | Role: Global Administrator | Duration: 2 Hours
// Requirement: Ticket #CR-9482 + FIDO2 Hardware Key + Manager Dual Approval
// Result: Zero standing privilege for attackers to exploit!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for Social Engineering attacks targeting 'Protected Systems' (Critical National Infrastructure)?",
    shortAnswer: "Gaining unauthorized access or attempting to access designated Critical Information Infrastructure via social engineering deception carries imprisonment up to 10 YEARS and fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial switches in Kolkata). If an attacker uses social engineering to trick a substation operator into providing access credentials, the crime carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for social engineering attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 70):
// Offense: Using social engineering to compromise SCADA substation access credentials
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "Synthesize an enterprise-scale Holistic Social Engineering Defense Architecture (The 3-Tier Defense Matrix).",
    shortAnswer: "A multi-layered system integrating Policy Controls (Out-of-Band Dual Auth, Safe Harbor), Technical Controls (FIDO2 Hardware Keys, DMARC `p=reject`, UEBA, Number Matching MFA), and Human Controls (JIT Coaching, Security Champions, Fast Report Buttons).",
    explanation: "To achieve complete social engineering immunity: 1. Policy Tier: Out-of-Band callback verification for transactions > ₹1,00,000, two-person rules, and blameless reporting cultures. 2. Technical Tier: Passwordless FIDO2 WebAuthn keys (immune to AiTM proxies), DMARC `p=reject; pct=100`, Number Matching MFA, and UEBA Isolation Forest anomaly detection. 3. Human Tier: Monthly 2-minute micro-learning, instant 500ms JIT teachable moments on simulation clicks, one-click reporting add-ins with auto-SOAR purging, and peer Security Champions across all departments.",
    hint: "Combine policy controls (OOB dual auth), technical controls (FIDO2 keys, DMARC reject, UEBA), and human controls (JIT coaching, champions).",
    level: "expert",
    codeExample: `// Master Social Engineering Defense Architecture:
// 1. POLICY TIER    : Mandatory OOB Dual Verification (> ₹1,00,000) + Two-Person Rule on DB Drops
// 2. TECHNICAL TIER : FIDO2 Hardware Keys (YubiKey) + DMARC p=reject + UEBA Isolation Forest ML + Number Matching MFA
// 3. HUMAN TIER     : 500ms Just-in-Time Coaching + One-Click Report Button (Auto-SOAR Purge) + Security Champions Network`
  },
  {
    question: "Synthesize the mathematical relationship between Human Resilience (H_human), Technical Controls Strength (T_tech), Policy Rigor (P_policy), Attacker Sophistication (A_attacker), and Overall Social Engineering Resilience Score (R_resilience).",
    shortAnswer: "Overall resilience is modeled as R_resilience = 1 - e^(- (H_human * T_tech * P_policy) / A_attacker); deploying multi-layered defense-in-depth (FIDO2 + DMARC + OOB Auth + JIT Coaching) achieves over 99.2% social engineering attack mitigation.",
    explanation: "Let $H_{\\text{human}} \\ge 1.0$ represent the human layer strength (micro-learning + security champions = 4.0), $T_{\\text{tech}} \\ge 1.0$ represent technical controls (FIDO2 keys + DMARC `p=reject` + UEBA = 4.0), $P_{\\text{policy}} \\ge 1.0$ represent policy rigor (OOB dual auth + two-person rule = 4.0), and $A_{\\text{attacker}}$ represent attacker sophistication ($1.0$ to $4.0$). The overall resilience is: $R_{\\text{resilience}} = 1 - e^{-\\frac{H_{\\text{human}} \\times T_{\\text{tech}} \\times P_{\\text{policy}}}{A_{\\text{attacker}}}}$. When organizations enforce multi-layered defense-in-depth across all three pillars, social engineering resilience approaches 99.8%.",
    hint: "Mathematical formula proving that combining human, technical, and policy controls drives social engineering resilience above 99.2%.",
    level: "expert",
    codeExample: `// Social Engineering Defense-in-Depth Mathematical Proof:
// H_human = 4.0 | T_tech = 4.0 | P_policy = 4.0 | Attacker Sophistication = 4.0 (Nation-State Level)
// Resilience Score: R = 1 - e^(- (4.0 * 4.0 * 4.0) / 4.0) = 1 - e^(-16.0) = 99.99% (DEFENSE-IN-DEPTH IMMUNITY!)`
  }
];

export default questions;
