const questions = [
  {
    question: "What is an Insider Threat, and what are the 3 Primary Categories according to the CERT / CISA Insider Risk Framework?",
    shortAnswer: "A security threat originating from individuals with authorized access; categorized into 1. Malicious Insiders, 2. Negligent Employees, and 3. Compromised Insiders.",
    explanation: "An insider threat stems from employees, contractors, or business partners who have legitimate credentials and authorized access. CISA classifies them into: 1. Malicious Insiders (intentionally stealing intellectual property, conducting sabotage, or selling access for money); 2. Negligent Insiders (accidentally leaking data, misconfiguring cloud buckets, or using unauthorized shadow IT for convenience); 3. Compromised Insiders (legitimate accounts hijacked by external adversaries via infostealers).",
    hint: "Malicious (intentional) vs Negligent (careless) vs Compromised (hijacked).",
    level: "basic",
    codeExample: `// The 3 Insider Threat Archetypes:
// 1. Malicious Insider   : Departing DBA copies SQL database to personal S3 bucket.
// 2. Negligent Employee  : Clerk uploads unencrypted patient Excel sheet to public Google Drive.
// 3. Compromised Insider : Employee credentials stolen via infostealer malware.`
  },
  {
    question: "What is the 'Critical Path to Insider Risk' behavioral model developed by the Carnegie Mellon CERT National Insider Threat Center?",
    shortAnswer: "A progressive behavioral pathway where personal predispositions lead to professional stressors, which trigger concerning behaviors, technical violations, and culminate in a malicious insider attack.",
    explanation: "Insider attacks rarely happen impulsively. The CERT Critical Path identifies a 5-stage progression: 1. Personal Predispositions (narcissism, financial distress); 2. Stressors (poor performance review, passed over for promotion in Kolkata, pending termination); 3. Concerning Behaviors (verbal conflicts, disengagement); 4. Technical Precursors (probing unauthorized file shares, copying data to USB); 5. The Malicious Act (data exfiltration or sabotage).",
    hint: "Predisposition ➔ Workplace Stressor ➔ Concerning Behavior ➔ Technical Precursor ➔ Malicious Act.",
    level: "moderate",
    codeExample: `// Critical Path Progression Timeline:
// [Stage 1: Passed over for Promotion] ➔ [Stage 2: Workplace Grievance / Disgruntlement]
// ➔ [Stage 3: Mass Access to Confidential Jira Boards] ➔ [Stage 4: Exfiltration of Core Source Code]`
  },
  {
    question: "What are the 'MICE' Motivations behind Malicious Insider Espionage and Data Theft?",
    shortAnswer: "Money, Ideology, Coercion, and Ego (or Entitlement).",
    explanation: "The intelligence community uses MICE to categorize insider motives: 1. Money (selling proprietary source code or customer data to pay off debts or accept competitor bribes); 2. Ideology (leaking data due to political or philosophical beliefs); 3. Coercion (being blackmailed over personal secrets); 4. Ego/Entitlement (feeling unappreciated, seeking revenge, or believing 'I built this code, so it belongs to me').",
    hint: "Money, Ideology, Coercion, Ego.",
    level: "basic",
    codeExample: `// MICE Motivations Breakdown:
// M - Money      : Competitor offers ₹50 Lakhs for FinTech trading algorithms.
// I - Ideology   : Whistleblowing / leaking confidential corporate communications.
// C - Coercion   : Blackmailed by cybercriminals over compromised personal files.
// E - Ego/Rights : "I wrote this kernel driver, so I am entitled to take it to my next job."`
  },
  {
    question: "How does the 'Two-Person Rule' (Dual Custody / Four-Eyes Principle) prevent Malicious Insider Sabotage?",
    shortAnswer: "By mandating that sensitive actions (e.g. deleting production backups, deploying database schema drops, or modifying access controls) require simultaneous cryptographic authorization by two independent administrators.",
    explanation: "A rogue systems administrator in Kolkata holding root credentials could destroy enterprise infrastructure. The Two-Person Rule requires that critical commands cannot be executed alone. An admin initiating a destructive action triggers an automated approval request to a secondary senior architect (like Mamata); only when both provide cryptographic signatures does the system execute the command.",
    hint: "Requiring two different officers to turn two separate keys at the same time to open a missile hatch.",
    level: "moderate",
    codeExample: `// Two-Person Rule Database Policy:
// Admin 1 initiates: DROP DATABASE customer_records;
// System Action: HELD IN PENDING STATE
// Approval Trigger: Sent to Senior Architect Mamata ➔ Requires FIDO2 Passkey Signature before execution!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 72A, what constitutes the criminal penalty for an Insider disclosing confidential customer records?",
    shortAnswer: "Disclosing personal information without consent while providing services under contract carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 72A explicitly penalizes insider breaches of confidentiality: 'Save as otherwise provided in this Act or any other law for the time being in force, any person including an intermediary who, while providing services under the terms of lawful contract, has secured access to any material containing personal information... discloses such material without the consent of the person concerned... shall be punished with imprisonment for a term which may extend to three years, or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 72A penalizes Breach of Confidentiality with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 72A):
// Violation: Insider exfiltrating and selling customer Aadhaar/PAN database records
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "How do User and Entity Behavior Analytics (UEBA) baseline Normal Employee Activity to detect Insider Anomalies?",
    shortAnswer: "By using machine learning to establish statistical baselines of peer-group working hours, access frequency, and data download volumes, flagging deviations that exceed statistical thresholds.",
    explanation: "UEBA builds behavioral profiles for every employee. If a software engineer in Salt Lake typically downloads 50MB of code between 9 AM and 6 PM on weekdays, but suddenly downloads 12GB of encrypted zip files from the customer database at 2:30 AM on Sunday, the UEBA engine flags an anomaly score of 95/100, notifying the SOC immediately.",
    hint: "A bank fraud detector that knows you spend ₹500 at the grocery store on Saturdays, so it alarms when ₹5,00,000 is spent in Paris at 3 AM.",
    level: "expert",
    codeExample: `// UEBA Statistical Anomaly Calculation:
let z_score = (current_download_volume - user_historical_mean) / user_standard_deviation;
if (z_score > 3.5 && is_off_hours == true) { // 3.5 Sigma Deviation!
    TriggerInsiderRiskAlert("MASS DATA EXFILTRATION ANOMALY DETECTED: Risk Score = 98/100");
    RevokeActiveKerberosTickets();
}`
  },
  {
    question: "What is 'Flight Risk Data Exfiltration' (Notice Period Data Theft) by Departing Employees?",
    shortAnswer: "Employees who have submitted their resignation or are anticipating layoffs mass-downloading proprietary customer lists, source code, and design documents in their final 30 days to take to a new employer.",
    explanation: "Studies indicate that over 60% of intellectual property theft occurs in the 30 days before an employee's resignation. Departing staff download repositories to USB drives, print client lists, or forward confidential emails to personal Gmail accounts. Organizations mitigate this by placing resigning staff in restricted 'Notice Period DLP' groups.",
    hint: "Stuffing office supplies and the secret recipe book into your backpack during your last week on the job.",
    level: "basic",
    codeExample: `# PowerShell Script to Add Resigning Employee to High-Monitoring DLP Group:
Add-ADGroupMember -Identity "High_Risk_Notice_Period_DLP" -Members "departing_dev@kolkata-fintech.in"
# Result: Restricts USB write access, blocks personal cloud uploads, and logs all file copies!`
  },
  {
    question: "Under the Indian Penal Code Section 405 and Section 408, what constitutes Criminal Breach of Trust by a Servant/Employee via Data Theft?",
    shortAnswer: "Being entrusted with corporate property or electronic records and dishonestly misappropriating or converting them to one's own use, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 408 IPC covers Criminal Breach of Trust by clerk or servant: 'Whoever, being a clerk or servant... and being in any manner entrusted in such capacity with property... commits criminal breach of trust in respect of that property, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' Malicious insiders stealing proprietary trade secrets are prosecuted under Section 408.",
    hint: "IPC Section 408 covers Criminal Breach of Trust by employees with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 408):
// Offense: Exfiltrating proprietary corporate source code while employed as senior software architect
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the corporate liabilities if an Insider leaks citizen personal records?",
    shortAnswer: "Failure to implement organizational data access controls and insider threat monitoring resulting in personal data leaks triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable security safeguards to prevent personal data breaches. If an unmonitored insider in West Bengal exfiltrates and sells 1,000,000 citizen medical records, the Data Protection Board of India (DPBI) can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to implement insider threat controls triggers maximum national data privacy penalties.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent insider data access governance`
  },
  {
    question: "How does 'Shadow IT' create Negligent Insider Vulnerabilities without Malicious Intent?",
    shortAnswer: "Employees adopting unapproved third-party cloud services (public Dropbox, unvetted AI tools like ChatGPT) to bypass cumbersome corporate workflows, inadvertently exposing proprietary code and data.",
    explanation: "Negligent insiders rarely intend harm; they seek efficiency. An engineer in Barrackpore pastes proprietary SCADA firmware source code into a public web-based AI assistant to debug an error, unknowingly transmitting intellectual property to third-party servers. Similarly, teams syncing project files to personal Google Drive accounts bypass corporate DLP and backup controls.",
    hint: "Using your personal car to transport fragile company merchandise because the official delivery van was too slow.",
    level: "basic",
    codeExample: `// Shadow IT Vulnerability Flow:
// [Engineer pastes proprietary C++ SCADA code into public ChatGPT web interface]
// ➔ Intellectual property ingested by third-party public AI training servers
// ➔ Corporate boundary breached without malicious intent (Negligent Insider Threat!)`
  },
  {
    question: "What is 'Privilege Creep' (Authorization Accumulation), and how does it elevate Insider Risk?",
    shortAnswer: "The gradual accumulation of access permissions over time as an employee changes roles or projects within a company, resulting in far more privileges than needed for their current job.",
    explanation: "When an employee works at a Kolkata company for 5 years, moving from IT Support to QA to Senior Development, they retain permissions granted in each past role. Eventually, they possess admin access to databases, firewalls, and source code repositories. If this account is compromised or the employee becomes disgruntled, the attack surface is catastrophic.",
    hint: "Keeping the keys to every house on the block after working as a neighborhood handyman for 10 years.",
    level: "moderate",
    codeExample: `// Privilege Creep Audit:
// User: Mamata | Current Role: FinTech Software Engineer
// Retained Permissions:
// - Domain Admin (from IT Support 2022) ➔ SHOULD BE REVOKED!
// - QA Database Read/Write (from QA 2024) ➔ SHOULD BE REVOKED!
// - Core Dev Git Access (Current 2026)     ➔ AUTHORIZED`
  },
  {
    question: "How do Automated Offboarding Identity Governance Workflows eliminate 'Orphaned Account' Insider Threats?",
    shortAnswer: "By integrating HR management systems (Workday/SAP) with Identity Providers (Entra ID/Okta), triggering immediate automated revocation of SSO tokens, Active Directory accounts, and VPN access upon termination.",
    explanation: "When an employee is terminated in Kolkata, manual offboarding often leaves accounts active for days. An automated identity workflow uses SCIM (System for Cross-domain Identity Management). When HR marks an employee as 'Terminated', webhooks instantly revoke all Entra ID refresh tokens, disable Active Directory accounts, revoke GitHub memberships, and wipe corporate MDM profiles in under 30 seconds.",
    hint: "Changing all the house locks and deactivating the garage remote the instant an old tenant moves out.",
    level: "expert",
    codeExample: `# PowerShell Automated Offboarding SCIM Webhook Handler:
param([string]$UserPrincipalName)

# 1. Disable Active Directory Account
Disable-ADAccount -Identity $UserPrincipalName

# 2. Revoke all active Microsoft 365 OAuth Refresh Tokens & Sessions
Revoke-MgUserSignInSession -UserId $UserPrincipalName

# 3. Remove all Cloud Role Assignments
Get-MgUserMemberOf -UserId $UserPrincipalName | ForEach-Object {
    Remove-MgGroupMemberByRef -GroupId $_.Id -DirectoryObjectId (Get-MgUser -UserId $UserPrincipalName).Id
}

Write-Host "[+] Offboarding Complete for $UserPrincipalName: Zero Orphaned Access Remaining!" -ForegroundColor Green`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for insider data exfiltration and unauthorized privileged access?",
    shortAnswer: "All organizations in India must report malicious insider exfiltrations, privilege abuse, and unauthorized system access to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including insider data exfiltration) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of all insider data breaches within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Canary Trapping' (Watermarking & Honeytokens) for Attributing Insider Data Leaks?",
    shortAnswer: "Distributing slightly different variations of a confidential document to each suspected employee (or planting unique fake credentials); when a leak occurs, the unique marker identifies the exact leaker.",
    explanation: "When an organization in Kolkata suspects a confidential leak, leadership gives each director a document with unique typographical watermarks or subtle wording differences (Canary Trap). If Version C appears on a competitor website or news outlet, the leaker is pinpointed with mathematical certainty. Similarly, planting fake AWS honeytoken keys in internal repositories alerts the SOC the instant a rogue insider accesses them.",
    hint: "Giving 5 suspects 5 colored bills so you know who spent money when a blue bill shows up at the store.",
    level: "expert",
    codeExample: `// Honeytoken AWS Key Deployment:
// File: /internal/dev/secrets_config.json
// Fake Key: AKIAIOSFODNN7HONEYTOKEN (Monitored in AWS CloudTrail!)
// Action: When rogue insider uses key ➔ CloudTrail triggers instant alert identifying user IP!`
  },
  {
    question: "How does Endpoint Data Loss Prevention (DLP) prevent Negligent Insiders from Copying Sensitive Files to Personal USB Drives?",
    shortAnswer: "By inspecting file contents at the kernel driver level for sensitive patterns (PAN cards, Aadhaar numbers, credit card regexes), blocking unauthorized writes to removable media.",
    explanation: "Endpoint DLP software hooks into the operating system I/O manager. When an employee attempts to drag `customer_data.csv` to an external USB drive or upload it to personal Mega.nz, the DLP engine scans the content. If it detects 16-digit card numbers or Indian PAN patterns (`[A-Z]{5}[0-9]{4}[A-Z]`), the write operation is blocked, a popup explains the policy, and a security audit event is logged.",
    hint: "An airport luggage scanner that rings an alarm if someone tries to put jewelry into their carry-on bag.",
    level: "moderate",
    codeExample: `// DLP Regex Pattern for Indian Permanent Account Number (PAN):
let pan_regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
if (pan_regex.test(file_content) && target_device == "USB_REMOVABLE_STORAGE") {
    BlockTransfer();
    NotifyUser("TRANSFER BLOCKED: Sensitive PAN Data cannot be copied to USB removable storage!");
}`
  },
  {
    question: "Under the Indian IT Act Section 43(a) and (b), what constitutes civil liability for an Insider stealing or downloading corporate data?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for extracting or downloading corporate data without authorization.",
    explanation: "Section 43 explicitly covers insider data theft: '(a) accesses or secures access... (b) downloads, copies or extracts any data, computer database... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(b) provides civil compensation up to ₹1 Crore for copying or downloading corporate data.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(b)):
// Violation: Insider downloading proprietary customer database onto external storage
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Logic Bomb Sabotage' by Disgruntled IT Administrators?",
    shortAnswer: "Malicious code covertly inserted into production servers by a rogue insider designed to trigger destructively (e.g. deleting databases or wiping storage) upon a specific condition, such as the administrator's account being disabled.",
    explanation: "A disgruntled system administrator in Kolkata fearing termination writes a hidden cron job: `if (!getent passwd rogue_admin) { rm -rf /var/lib/database/*; }`. If the admin is fired and their account is deleted from the server, the logic bomb condition is met, and the script executes, wiping critical production databases.",
    hint: "Setting a booby trap in your office that explodes if someone takes your name off the door.",
    level: "expert",
    codeExample: `// Logic Bomb Trigger Script (Bash):
#!/bin/bash
# Checks if rogue admin account is active; if deleted, executes destructive payload
if ! id "rogue_admin" &>/dev/null; then
    logger -p crit "LOGIC BOMB TRIGGERED: Wiping critical production databases!"
    rm -rf /opt/oracle/oradata/*
fi`
  },
  {
    question: "Synthesize an enterprise-scale Insider Threat Prevention & Mitigation Architecture.",
    shortAnswer: "A multi-layered system combining Principle of Least Privilege (PoLP), Machine Learning User & Entity Behavior Analytics (UEBA), Endpoint DLP, Two-Person Authorization Rules, and Automated SCIM Offboarding.",
    explanation: "To achieve complete immunity against insider threats: 1. Identity Tier: Principle of Least Privilege (PoLP) and Just-in-Time (JIT) access preventing privilege creep. 2. Behavioral Tier: UEBA machine learning engines establishing baseline activity and alerting on off-hours mass exfiltrations. 3. Endpoint Tier: Kernel-level Endpoint DLP blocking unapproved USB storage and personal cloud uploads. 4. Operational Tier: Two-Person Rule / Dual-Custody for critical database schema drops and backup deletions. 5. Governance Tier: Automated SCIM offboarding revoking 100% of accounts within 30 seconds of HR termination.",
    hint: "Combine PoLP least privilege, UEBA behavioral baselines, endpoint DLP, two-person rules, and automated SCIM offboarding.",
    level: "expert",
    codeExample: `// Master Insider Threat Defense Blueprint:
// 1. Identity Governance : Just-in-Time (JIT) & Role-Based Access Control (Zero Privilege Creep)
// 2. Behavioral AI Tier  : Real-Time UEBA Anomaly Engine flagging mass off-hours data access
// 3. Endpoint Data Guard : Kernel-Level DLP blocking USB writes & unapproved personal cloud sync
// 4. Critical Operations : Two-Person Rule requiring secondary FIDO2 signoff for destructive commands
// 5. Lifecycle Management: SCIM Automated Webhook offboarding purging credentials in <30 seconds`
  },
  {
    question: "How does 'Just-in-Time' (JIT) Privileged Access Management (PAM) eliminate Standing Admin Privileges?",
    shortAnswer: "By granting administrative privileges only upon request for a limited time window (e.g. 2 hours) with multi-factor approval, returning the user to standard unprivileged status automatically.",
    explanation: "Standing admin privileges allow insiders or compromised accounts to abuse root access at any time. With JIT PAM (e.g. Microsoft Entra Privileged Identity Management - PIM), an engineer in Salt Lake has zero admin rights by default. When maintenance is required, they request temporary 'Global Admin' access, specify a ticket number, and receive 2 hours of access after secondary approval. Once the timer expires, privileges are stripped.",
    hint: "Borrowing the master vault key for exactly 30 minutes, which automatically vanishes from your keyring when the time is up.",
    level: "moderate",
    codeExample: `# PowerShell PIM JIT Role Activation:
$roleSchedule = @{
    action = "selfActivate"
    justification = "Emergency P1 Substation Telemetry Fix - Ticket #9842"
    roleDefinitionId = "62e90394-69f5-4237-9190-012177145e10" # Global Admin Role
    scheduleInfo = @{ startDateTime = (Get-Date); duration = "PT2H" } # 2 Hours Duration!
}
New-MgRoleManagementDirectoryRoleAssignmentScheduleRequest -BodyParameter $roleSchedule`
  },
  {
    question: "What is 'Data Hoarding' as a Behavioral Precursor to Insider Exfiltration?",
    shortAnswer: "An employee systematically accessing and downloading large volumes of files, code repositories, or customer databases outside their regular job responsibilities in anticipation of quitting.",
    explanation: "Before leaving an enterprise in Kolkata, a rogue engineer begins downloading project folders from adjacent teams (e.g. finance, marketing, core algorithms) that they have never accessed before. Data hoarding represents the most reliable technical precursor to malicious exfiltration, detectable by file access velocity monitors.",
    hint: "A librarian checking out 200 rare history books on their last day of work.",
    level: "moderate",
    codeExample: `// Data Hoarding Detection Logic:
let accessed_departments = CountDistinctDepartments(User.FileAccessHistory.Last7Days);
let historical_departments = User.BaselineDepartments;
if (accessed_departments > (historical_departments + 3)) {
    TriggerAlert("DATA HOARDING DETECTED: User accessing cross-departmental shares outside assigned role!");
}`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for an Insider intentionally damaging corporate computer resources?",
    shortAnswer: "Dishonestly or fraudulently deleting data, altering configurations, or deploying logic bombs carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer sabotage: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.' Insider sabotage operations are prosecuted under Section 66.",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for insider sabotage.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Malicious administrator deleting production databases upon termination
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'The Collusive Insider' (Cybercrime Recruitment & Extortion)?",
    shortAnswer: "An employee who is recruited, bribed, or extorted by external cybercrime syndicates or ransomware gangs to provide credentials, deploy ransomware, or install hardware implants.",
    explanation: "Ransomware syndicates (e.g. LockBit) actively recruit corporate insiders on Telegram and dark web forums, offering ₹1 Crore or 20% of the ransom payout to employees who plug in a USB drive or provide Citrix VPN credentials. The employee acts as an internal agent for the external criminal syndicate.",
    hint: "A bank security guard who agrees to leave the back door unlocked for the bank robbers in exchange for a share of the loot.",
    level: "expert",
    codeExample: `// Collusive Insider Dark Web Recruitment Message:
// "Are you an IT Admin in a major Indian FinTech or Power Utility?
// We offer up to ₹1,00,00,000 in Bitcoin for valid Active Directory Domain Admin credentials!
// Contact us on Session ID: 05a49..."`
  },
  {
    question: "How do Digital Forensics and Artifact Timelines reconstruct Insider Exfiltration Actions?",
    shortAnswer: "By analyzing Windows forensic artifacts including Shellbags, LNK files, USBSTOR registry keys, and browser download history to prove intentional data theft in a court of law.",
    explanation: "When an insider in Kolkata denies stealing data, digital forensic examiners examine specific artifacts: 1. `USBSTOR` registry keys prove the serial number of the exact USB drive plugged in; 2. `LNK` files and `JumpLists` prove the user opened stolen files on that drive; 3. `Shellbags` prove the user browsed the exfiltrated directory; 4. `MFT` (Master File Table) timestamp analysis proves exact copying times.",
    hint: "Forensic footprints in the snow that prove not only that someone entered the room, but which drawer they opened and what they held in their hand.",
    level: "expert",
    codeExample: `# PowerShell Script to Extract USBSTOR Forensic Artifacts:
Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\*\\*" | \`
    Select-Object FriendlyName, HardwareID, ContainerID, LastWriteTime | \`
    Format-Table -AutoSize`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Intellectual Property by an Insider?",
    shortAnswer: "Deceiving management or coworkers through false pretenses to obtain trade secrets or proprietary software source code, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' Insiders deceiving colleagues to access restricted project files are prosecuted under Section 420 alongside cyber law statutes.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for insider trade secret theft.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving lead architect Mamata to obtain cryptographic source code for competitor transfer
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Accidental Cloud Misconfiguration' (S3 Bucket Public Exposure) by Negligent Cloud Engineers?",
    shortAnswer: "A cloud administrator unintentionally setting cloud storage permissions to public (`AllUsers: Read`), exposing millions of customer records or database backups to the open internet without authentication.",
    explanation: "Negligent insider errors often cause catastrophic breaches. An engineer in Salt Lake configuring an AWS S3 bucket or Azure Blob container forgets to enable 'Block Public Access', leaving database backups accessible to automated internet scanners. Millions of citizen PAN cards and medical files are exposed without any hacking or malware involved.",
    hint: "Leaving the front door of the company warehouse wide open with a sign saying 'Free to take'.",
    level: "basic",
    codeExample: `# AWS CLI Command to Audit and Enforce Public Access Block on S3 Buckets:
aws s3api put-public-access-block \
    --bucket "kolkata-fintech-customer-backups" \
    --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"`
  },
  {
    question: "How do 'Air-Gapped Network Bastion Gateways' prevent SCADA Operators from Negligent Cross-Contamination?",
    shortAnswer: "By physically separating the operational industrial network from the corporate office LAN, requiring all data transfers to pass through a unidirectional data diode or hardened transient cyber asset (TCA) station.",
    explanation: "In high-voltage power substations in Barrackpore, connecting a laptop to both corporate Wi-Fi and the SCADA network bridges the air-gap. Bastion gateways and optical data diodes enforce unidirectional data flow: telemetry data can leave the SCADA network, but zero network packets or malware can travel back into the operational grid.",
    hint: "A one-way revolving door at the airport security exit that lets people out but physically stops anyone from walking back in.",
    level: "expert",
    codeExample: `// Optical Data Diode Architecture:
// [SCADA Grid Subnet in Barrackpore] ➔ (Fiber Transmitter LED) ➔ [Optical Air-Gap] ➔ (Photodiode Receiver) ➔ [Corporate LAN]
// Physics: Light only travels one way ➔ 0% possibility of malware traveling back into SCADA grid!`
  },
  {
    question: "What is 'Clean Room Software Development' to Prevent Malicious Backdoors in Production Codebases?",
    shortAnswer: "A software engineering protocol requiring strict peer code reviews, automated static analysis (SAST), and reproducible builds, ensuring that no single programmer can commit code directly to production without multi-party review.",
    explanation: "To prevent a rogue programmer in Kolkata from inserting a backdoor or hardcoded credentials into a FinTech settlement engine, company policy mandates: 1. Main branch write protection; 2. Mandatory approval from at least 2 senior reviewers on all Pull Requests; 3. Automated SAST scans checking for suspicious functions (`eval()`, hardcoded IP connections).",
    hint: "Requiring two chefs to taste and sign off on every dish before it leaves the kitchen to ensure nobody added poison.",
    level: "moderate",
    codeExample: `// GitHub Branch Protection Rule:
// Target Branch: main
// Require pull request before merging = True
// Required approving reviews = 2 (Mamata + Debangshu)
// Dismiss stale pull request approvals when new commits are pushed = True
// Require status checks to pass before merging = SAST_Scanner_Pass`
  },
  {
    question: "How does the 'Whistleblower Protection & Non-Retaliation Policy' encourage Safe Reporting of Insider Threats?",
    shortAnswer: "By providing an anonymous, legally protected reporting channel where employees can report observed security violations or concerning coworker behaviors without fear of professional reprisal.",
    explanation: "Coworkers often observe concerning behaviors (talking about selling code, financial desperation) weeks before an insider attack occurs. An anonymous whistleblowing hotline allows employees to report observations safely. Transparent non-retaliation policies ensure that employees report risks rather than staying silent out of fear.",
    hint: "An anonymous suggestion box where workers can report safety hazards without putting their name on the paper.",
    level: "basic",
    codeExample: `// Anonymous Whistleblower Hotline Protocol:
// 1. Employee observes coworker copying codebase to personal flash drive.
// 2. Submits anonymous report via encrypted portal: https://ethics.kolkata-fintech.in
// 3. Insider Risk Team initiates quiet UEBA forensic audit without alerting the suspect.`
  },
  {
    question: "Synthesize the mathematical relationship between Insider Motive Score (M_motive), Access Authorization Level (A_access), Insider Threat Controls Strength (R_ueba_controls), and Insider Breach Probability (P_insider).",
    shortAnswer: "Insider breach probability is modeled as P_insider = 1 - e^(- (M_motive * A_access) / R_ueba_controls); deploying UEBA baselines, JIT access, and two-person rules (R_ueba_controls = 1000) reduces insider breach probability below 1.5%.",
    explanation: "Let $M_{\\text{motive}} \\ge 1.0$ represent the insider motivation/disgruntlement factor (resignation/layoff stressor = 4.0), $A_{\\text{access}} \\ge 1.0$ represent the standing access authorization level (Domain Admin = 4.0), and $R_{\\text{ueba\\_controls}}$ represent the insider threat mitigation strength (UEBA anomaly engines, JIT PAM, two-person rules, automated SCIM offboarding). The insider breach probability is: $P_{\\text{insider}} = 1 - e^{-\\frac{M_{\\text{motive}} \\times A_{\\text{access}}}{R_{\\text{ueba\\_controls}}}}$. When organizations enforce strict UEBA monitoring, JIT access, and two-person rules ($R_{\\text{ueba\\_controls}} \\to \\infty$), insider breach probability collapses to zero.",
    hint: "Mathematical formula proving that UEBA baselines, JIT access, and two-person rules (R_ueba_controls -> infinity) drive insider breach probability to zero.",
    level: "expert",
    codeExample: `// Insider Threat Mathematical Proof:
// M_motive = 4.0 (High Grievance Resignation) | A_access = 4.0 (Standing Domain Admin Rights)
// Without Insider Controls (R_ueba_controls = 1.0) ➔ P_insider = 1 - e^(-16.0) = 100.0% (BREACHED!)
// With UEBA + JIT PAM (R_ueba_controls = 1000) ➔ P_insider = 1 - e^(-0.016) = 1.58% (SECURED!)`
  }
];

export default questions;
