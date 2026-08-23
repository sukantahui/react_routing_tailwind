const questions = [
  {
    question: "What is User and Entity Behavior Analytics (UEBA), and how does it differ from Traditional Rule-Based SIEMs?",
    shortAnswer: "Traditional SIEMs rely on static threshold rules (e.g. 'alert if 5 failed logins'); UEBA uses machine learning to establish dynamic behavioral baselines for users and devices, detecting statistical anomalies and subtle risk progressions.",
    explanation: "Static SIEM rules generate high false positives and fail when an attacker operates slowly using legitimate credentials. UEBA ingests logs from authentication, endpoints, VPNs, and file shares, using machine learning to baseline what 'normal' looks like for each specific user and their peer group. If a developer in Kolkata suddenly downloads 10GB of customer data at 3 AM on Sunday, UEBA calculates an elevated multi-dimensional risk score without needing a static rule.",
    hint: "A security guard who checks a static list of 5 rules vs an experienced detective who notices that someone's subtle behavior is unusual.",
    level: "basic",
    codeExample: `// Traditional SIEM Rule vs UEBA ML Behavioral Anomaly:
// SIEM Rule : Alert if (Failed_Logins > 5) -> Misses slow, authenticated attacks!
// UEBA ML   : Calculates Z-Score on File Download Volume & Login Timestamps across 90-day peer baseline!`
  },
  {
    question: "What is 'Peer Group Baselining' in UEBA, and why is it Essential for Reducing False Positives?",
    shortAnswer: "Clustering employees into peer cohorts based on department, role, or title (e.g. Data Analysts vs HR staff) so that an employee's activity is compared against colleagues performing the same job functions.",
    explanation: "A database administrator legitimately downloads 5GB of backups daily, whereas an HR recruiter downloading 5GB is a severe anomaly. By automatically clustering users into peer groups, UEBA ensures that normal DBA activity does not trigger false alerts, while identical high-volume activity by a non-technical user triggers an immediate high-severity insider threat alert.",
    hint: "Comparing a marathon runner's heart rate against other athletes rather than comparing them to a sedentary office worker.",
    level: "moderate",
    codeExample: `// Peer Group Anomaly Calculation:
let peer_group = "Kolkata_FinTech_QA_Engineers";
let peer_mean_download = 45.0; // MB/day
let user_download = 12500.0;   // MB/day (12.5 GB)
let z_score = (user_download - peer_mean_download) / peer_std_dev; // Z = 8.4 (Severe Anomaly!)`
  },
  {
    question: "How do Isolation Forests and Unsupervised Machine Learning Algorithms detect Zero-Day Insider Anomalies?",
    shortAnswer: "By recursively partitioning multi-dimensional data points; anomalous data points require fewer random splits to isolate than normal clustered points, allowing detection of unknown insider attack patterns without pre-labeled training data.",
    explanation: "Supervised ML requires pre-labeled examples of past insider attacks. Isolation Forest works unsupervised: it randomly selects a feature (e.g. login time, bytes transferred, process count) and randomly selects a split value. Normal employee behaviors cluster closely and require deep decision tree paths, while anomalous insider behavior isolates very quickly near the root of the tree, producing an anomaly score close to 1.0.",
    hint: "Isolating a lone house in the middle of a desert takes 1 fence, while isolating one specific house in a crowded city takes 50 fences.",
    level: "expert",
    codeExample: `// Python Isolation Forest Snippet (scikit-learn):
from sklearn.ensemble import IsolationForest

clf = IsolationForest(contamination=0.01, random_state=42)
clf.fit(user_behavior_matrix) # Features: [LoginHour, BytesTransferred, FilesAccessed]
anomaly_scores = clf.decision_function(new_user_activity)
# Negative score indicates an isolated anomaly point!`
  },
  {
    question: "What is 'Impossible Travel' (Velocity Anomaly) in UEBA Identity Analytics?",
    shortAnswer: "Detecting user authentication events from two geographically distant locations within a time window that is physically impossible to travel (e.g. logging in from Kolkata and London within 10 minutes).",
    explanation: "If an employee authenticates to Microsoft 365 from their office in Salt Lake Sector V at 10:00 AM, and the same account successfully authenticates from an IP in Frankfurt at 10:15 AM, the speed required to travel between the two cities exceeds the speed of commercial aircraft. UEBA flags an impossible velocity anomaly score of 100/100, indicating session token theft or compromised credentials.",
    hint: "Swiping your metro card in Kolkata and then swiping the same card in London 10 minutes later.",
    level: "basic",
    codeExample: `// Impossible Travel Calculation:
let distance_km = CalculateHaversineDistance(Kolkata_Coords, Frankfurt_Coords); // 7,200 km
let time_hours = (Timestamp2 - Timestamp1) / 3600; // 0.25 hours
let velocity_kmh = distance_km / time_hours; // 28,800 km/h (Physically Impossible!) ➔ TRIGGER SOC LOCKDOWN!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 72A, what constitutes the criminal penalty for an Insider Disclosing Personal Data detected by UEBA systems?",
    shortAnswer: "Disclosing personal information without consent while providing services under contract carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 72A penalizes breach of confidentiality. When UEBA detects an employee or contractor in Kolkata exfiltrating customer PAN cards or health records without authorization, the evidence generated by the UEBA forensic engine is used to prosecute the offender under Section 72A.",
    hint: "Section 72A covers Breach of Confidentiality under lawful contract with up to 3 years prison.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 72A):
// Offense: Exfiltrating citizen database records detected via UEBA anomaly monitoring
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What are 'Markov Chains and Sequence Anomaly Detection' in UEBA Behavioral Analysis?",
    shortAnswer: "Modeling the probability of transitioning from one user action to the next (e.g. Login ➔ Read Email ➔ Git Commit); unexpected sequence transitions (e.g. Login ➔ Disable Logging ➔ Mass DB Dump) trigger sequence anomaly alerts.",
    explanation: "Human workflows follow predictable state transitions. A Markov model calculates transition probabilities: $P(\\text{Git Commit} | \\text{Open IDE}) = 0.85$, whereas $P(\\text{vssadmin delete shadows} | \\text{Open Outlook}) = 0.0001$. When a user executes a sequence of commands with near-zero historical transition probability, the Markov engine flags an anomalous kill-chain sequence.",
    hint: "A driver who turns left, turns right, and then suddenly drives off the bridge into the river.",
    level: "expert",
    codeExample: `// Markov Chain Action Transition Matrix:
// State A (Login) ➔ State B (Check Outlook)     : Probability = 0.78 (Normal)
// State A (Login) ➔ State C (Disable Event Log) : Probability = 0.00002 (ANOMALOUS SEQUENCE!)`
  },
  {
    question: "How do UEBA 'Entity Risk Scores' aggregate Multi-Vector Indicators into a Single Actionable Threat Metric?",
    shortAnswer: "By dynamically combining risk points from multiple correlated anomalies (e.g. impossible travel + off-hours file access + USB insertion) into a composite score (0-100), triggering automated response when thresholds are crossed.",
    explanation: "A single minor anomaly (working at 8 PM) generates a low score (+10). However, if that same user also has an impossible travel event (+40), accesses an unauthorized financial share (+30), and attempts a mass zip compression (+20), the composite entity risk score reaches 100/100. This triggers automated SOAR playbooks to isolate the endpoint and revoke active tokens.",
    hint: "A credit score for security: one late payment drops a few points, but five major defaults trigger a red alert.",
    level: "moderate",
    codeExample: `// Composite Entity Risk Score Aggregation:
let risk_score = 0;
if (has_impossible_travel) risk_score += 40;
if (is_off_hours_access)   risk_score += 15;
if (accessed_vip_files)    risk_score += 30;
if (usb_write_attempted)   risk_score += 25;
// Total Risk Score = 110 (Capped at 100) ➔ AUTO-REVOKE KERBEROS SESSIONS!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise obligations for deploying UEBA while respecting Employee Data Privacy?",
    shortAnswer: "Organizations must implement reasonable security safeguards (UEBA monitoring) while ensuring employee personal data is processed transparently, with pseudonymization and role-based access to forensic logs.",
    explanation: "Section 8(5) mandates that data fiduciaries implement reasonable technical safeguards against data breaches. UEBA provides this protection. However, organizations must balance monitoring with privacy by masking employee names in standard dashboards (pseudonymization) and restricting unmasked forensic logs to authorized DPOs to prevent workplace surveillance abuse.",
    hint: "Balancing strong security monitoring with legal employee privacy protections.",
    level: "moderate",
    codeExample: `// Privacy-Preserving UEBA Pseudonymization:
// SOC Analyst View   : User "USER-HASH-9482" exhibits Risk Score 95/100 (Pseudonymized!)
// DPO Authorized View: User "USER-HASH-9482" maps to "Mamata (Lead Architect)" under Section 8(5) Audit`
  },
  {
    question: "What is 'First-Time-Seen (FTS) Analytics' in UEBA Behavioral Engines?",
    shortAnswer: "Flagging the very first time a user or service account interacts with a specific high-value server, executes a novel command, or logs in from a new country.",
    explanation: "Adversaries performing lateral movement often interact with resources the compromised user has never touched before. If an engineer in Kolkata who has only accessed development servers for 3 years suddenly attempts an SSH connection to the core production payment gateway, FTS analytics flags a high-priority 'First Time Access to Critical Asset' alert.",
    hint: "A bank card that asks for extra verification the very first time you use it in a foreign country.",
    level: "basic",
    codeExample: `// First-Time-Seen (FTS) Detection Rule:
if (!User.HistoricalAssetsAccessed.Contains("Core_Payment_Gateway_Switch")) {
    TriggerAlert("FIRST-TIME-SEEN ACCESS: User connecting to Core Payment Gateway for the first time!");
}`
  },
  {
    question: "How does UEBA detect 'Privilege Snooping' on VIP / Executive Healthcare and Financial Records?",
    shortAnswer: "By tagging high-profile records (VIP patients, C-suite salaries) as 'Crown Jewels' and baselining query access frequencies, alerting immediately when an unauthorized employee views a VIP record without a valid ticket.",
    explanation: "In a hospital in Ichapur, nurses typically view records of patients assigned to their ward. If an administrative clerk opens the oncology diagnostic file of a prominent political leader or celebrity, UEBA flags an immediate 'Unauthorized VIP Record Access' alert because the patient was not assigned to that clerk's current roster.",
    hint: "An alarm that sounds whenever someone opens the VIP gold vault without an active work order.",
    level: "moderate",
    codeExample: `// VIP Record Snooping Detection:
if (Record.IsVIP == true && !User.ActivePatientRoster.Contains(Record.PatientID)) {
    TriggerAlert("PRIVILEGE SNOOPING DETECTED: Unauthorized access to VIP patient oncology records!");
    LogForensicAuditTrail();
}`
  },
  {
    question: "Under the Indian IT Act Section 43(a) and (b), what constitutes civil liability for unauthorized access detected via UEBA analytics?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for accessing or downloading computer resources without permission.",
    explanation: "Section 43 explicitly penalizes unauthorized data access and extraction: '(a) accesses or secures access... (b) downloads, copies or extracts any data... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.' UEBA audit records serve as primary electronic evidence under Section 65B of the Indian Evidence Act.",
    hint: "Section 43(b) provides civil compensation up to ₹1 Crore for copying or downloading corporate data.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(b)):
// Violation: Unauthorized mass downloading of customer database records detected via UEBA
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Beaconing & Off-Hours Cadence Anomaly Detection' in Entity Behavior Analytics?",
    shortAnswer: "Detecting endpoints communicating with external IP addresses at perfectly rigid periodic intervals (e.g. every 60.0 seconds) or during non-business hours, indicating automated C2 beaconing malware.",
    explanation: "Human web browsing is chaotic and irregular. Malware C2 beacons (e.g. Cobalt Strike, Mythic) wake up and communicate on fixed timers with low jitter. Entity analytics analyzes time intervals between outbound HTTP/DNS requests: an interval variance near zero ($S^2 < 0.05$) indicates synthetic machine beaconing, flagging the compromised host.",
    hint: "A lighthouse flashing exactly every 10 seconds vs a human flicking a flashlight randomly.",
    level: "expert",
    codeExample: `// C2 Beaconing Interval Variance Calculation:
double variance = CalculateIntervalVariance(OutboundConnectionTimestamps);
if (variance < 0.1 && TotalConnections > 100) { // Highly regular cadence!
    TriggerAlert("MALWARE C2 BEACONING DETECTED: Rigid periodicity indicating automated implant!");
}`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for insider threats and compromised accounts identified by UEBA?",
    shortAnswer: "All organizations in India must report malicious insider exfiltrations, account takeovers, and compromised credentials to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including account compromises and insider breaches) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of UEBA-detected account compromises within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How do 'Time-of-Day Access Baselines' differentiate Normal Overtime from Malicious Off-Hours Data Theft?",
    shortAnswer: "By combining working hour deviations with data access volume and resource sensitivity; working late on routine tasks generates zero alert, but accessing sensitive financial databases at 3 AM triggers high-severity alerts.",
    explanation: "An engineer working until 9 PM on a production release generates standard Git commits and Slack messages. However, an insider logging in at 3:30 AM on Sunday to execute `mysqldump` on the customer database combines extreme temporal deviation with high-risk resource access. UEBA correlates both dimensions to eliminate false positives from normal overtime.",
    hint: "Eating a late-night snack from your kitchen fridge vs unlocking the neighbor's bank vault at 3 AM.",
    level: "moderate",
    codeExample: `// Multi-Dimensional Temporal Evaluation:
let is_extreme_off_hours = (CurrentHour >= 2 && CurrentHour <= 5);
let is_high_risk_resource = TargetResource.Classification == "Confidential_Financial";
if (is_extreme_off_hours && is_high_risk_resource && User.HistoricalOffHoursRatio < 0.01) {
    TriggerAlert("CRITICAL OFF-HOURS PRIVILEGED ACCESS DETECTED: Risk Score = 92/100!");
}`
  },
  {
    question: "What is 'Flight Risk Modeling' in Pre-Resignation Insider Risk Analytics?",
    shortAnswer: "Correlating HR data (resignation submission, performance ratings, PTO requests) with technical file access patterns to detect employees mass-downloading data in their final weeks of employment.",
    explanation: "UEBA systems ingest HR metadata. When an employee in Kolkata is marked 'Resigned - 30 Day Notice', the UEBA engine places them into a high-sensitivity monitoring tier. The system lowers anomaly detection thresholds: any file copy to USB, access to unassigned project repositories, or mass printing immediately triggers an alert to the Insider Threat team.",
    hint: "Putting extra security around the store manager during their final two weeks before retirement.",
    level: "moderate",
    codeExample: `// Flight Risk Tier Adjustment:
if (User.HRStatus == "Notice_Period") {
    User.AnomalyThresholdMultiplier = 0.5; // Halves threshold for instant alerting!
    EnforceNoticePeriodDLPPolicy(User);
}`
  },
  {
    question: "Under the Indian Penal Code Section 408, what constitutes Criminal Breach of Trust by an Employee detected via UEBA?",
    shortAnswer: "Being entrusted with corporate data or server access and dishonestly misappropriating or converting that property to personal use, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 408 IPC covers Criminal Breach of Trust by clerk or servant. When UEBA detects an employee exfiltrating proprietary trading algorithms or selling customer records, the digital evidence proves the dishonest misappropriation of entrusted electronic property under Section 408.",
    hint: "IPC Section 408 covers Criminal Breach of Trust by employees with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 408):
// Offense: Exfiltrating proprietary corporate data while employed as a trusted system administrator
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Lateral Movement Detection' via UEBA Authentication Graph Analysis?",
    shortAnswer: "Constructing a real-time graph of user-to-host and host-to-host connections; anomalous hops (e.g. a workstation initiating RDP/SSH connections to 20 adjacent laptops in 5 minutes) indicate active lateral movement.",
    explanation: "Normal employees connect to a fixed set of 2-3 servers daily. When an adversary compromises a workstation in Kolkata and scans the internal subnet using BloodHound or PsExec, they generate unusual connection edges across the authentication graph. UEBA graph analytics detects the abnormal degree centrality surge, identifying lateral movement.",
    hint: "A passenger train that suddenly jumps off its normal track and starts driving down 20 different side roads.",
    level: "expert",
    codeExample: `// Graph Centrality Lateral Movement Logic:
let novel_connections_count = CountNovelHostConnections(User, Window="5m");
if (novel_connections_count > 5) {
    TriggerAlert("LATERAL MOVEMENT DETECTED: User attempting multiple novel host connections across subnet!");
    IsolateHostFromVLAN();
}`
  },
  {
    question: "Synthesize an enterprise-scale User and Entity Behavior Analytics (UEBA) Architecture.",
    shortAnswer: "A multi-layered intelligence system combining Multi-Source Log Ingestion, Peer Group Clustering, Unsupervised ML Anomaly Scoring (Z-Scores & Isolation Forests), Risk Aggregation Engines, and Automated SOAR Response.",
    explanation: "To build an unbreachable UEBA architecture: 1. Data Ingestion Layer: Streaming auth, VPN, endpoint, cloud, and badge logs into Kafka/Flink pipelines. 2. Behavioral Baseline Layer: Establishing dynamic statistical baselines and peer clusters across 90-day rolling windows. 3. Machine Learning Analytics Layer: Executing Isolation Forests, Z-score models, and Markov sequence analyzers. 4. Correlated Risk Aggregation Layer: Summing multi-vector indicators into a 0-100 Entity Risk Score. 5. Automated SOAR Response Layer: Automatically locking accounts, revoking session tokens, and isolating endpoints when scores exceed 85/100.",
    hint: "Combine multi-source log ingestion, peer clustering, unsupervised ML anomaly scoring, composite risk aggregation, and automated SOAR playbooks.",
    level: "expert",
    codeExample: `// Master UEBA Architecture Blueprint:
// 1. Ingestion Tier    : Real-Time Kafka Stream (Active Directory + VPN + Endpoint DLP + CloudTrail)
// 2. Baseline Engine   : 90-Day Rolling Mean/StdDev & K-Means Peer Group Clustering
// 3. Analytics Tier    : Isolation Forest + Z-Score Anomaly + Markov Chain Transition Models
// 4. Aggregation Tier  : Dynamic Entity Risk Scoring Engine (0 to 100 Composite Score)
// 5. Response Tier     : SOAR Playbook triggering Token Revocation & VLAN Quarantine at Score >= 85`
  },
  {
    question: "How do UEBA 'Service Account Anomaly Baselines' detect Compromised Service Principles & Non-Human Identities?",
    shortAnswer: "By establishing strict baselines for automated service accounts (which should execute predictable scripts on fixed schedules); any interactive GUI login or off-schedule execution triggers a high-severity alert.",
    explanation: "Service accounts (e.g. `svc_backup_kolkata`) should only run automated background batch jobs from specific static IP addresses. If an attacker uses the service account credentials to initiate an interactive desktop RDP login or run interactive PowerShell commands, UEBA flags an immediate 'Interactive Login by Service Account' anomaly.",
    hint: "A robot factory arm that suddenly starts trying to drive a forklift around the warehouse.",
    level: "moderate",
    codeExample: `// Service Account Interactive Login Rule:
if (User.AccountType == "Service_Account" && LogonType == "Interactive_GUI_RDP") {
    TriggerAlert("CRITICAL SERVICE ACCOUNT COMPROMISE: Non-human service account initiating interactive desktop session!");
    RevokeServicePrincipal();
}`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for using compromised employee credentials to defraud an enterprise?",
    shortAnswer: "Dishonestly or fraudulently accessing computer systems using stolen credentials carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer access: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.' Account takeover fraud is prosecuted under Section 66.",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer access.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Using hijacked employee credentials to access confidential financial databases
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Dormant Account Re-Activation Anomaly' in UEBA Identity Analytics?",
    shortAnswer: "Detecting sudden activity on user accounts that have been inactive for over 90 days (e.g. former contractors, employees on leave), indicating credential stuffing or rogue account exploitation.",
    explanation: "Dormant accounts are prime targets for adversaries because legitimate owners are not actively monitoring them. If an account with zero logins for 6 months suddenly authenticates from a foreign VPN and queries Active Directory domain controllers, UEBA flags an immediate 'Dormant Account Re-Activation' anomaly, locking the account instantly.",
    hint: "A dusty abandoned car in the back of the lot that suddenly starts driving down the highway at midnight.",
    level: "basic",
    codeExample: `// Dormant Account Re-Activation Rule:
let days_inactive = (CurrentDate - User.LastLogonDate).TotalDays;
if (days_inactive > 90) {
    TriggerAlert("DORMANT ACCOUNT RE-ACTIVATION: Account inactive for " + days_inactive + " days suddenly active!");
    LockAccountImmediately();
}`
  },
  {
    question: "How do 'Contextual False Positive Suppression Rules' improve SOC Analyst Efficiency in UEBA Deployments?",
    shortAnswer: "By automatically suppressing alerts during scheduled maintenance windows, approved penetration tests, or known IT migration periods, preventing alert fatigue in the SOC.",
    explanation: "If the IT infrastructure team in Kolkata schedules a monthly database backup migration on Sunday night, standard volume anomaly rules would trigger hundreds of false alerts. UEBA systems integrate with IT Service Management (ITSM - ServiceNow/Jira) to ingest approved Change Request (CR) tickets, automatically suppressing alerts for authorized maintenance windows.",
    hint: "Turning off the building burglar alarm while the authorized cleaning crew is scheduled to wax the floors.",
    level: "moderate",
    codeExample: `// ITSM Change Request Suppression Logic:
if (ActiveChangeRequests.Contains(ResourceID) && CurrentTime.IsWithin(ChangeWindow)) {
    SuppressAlert("Suppressed: Authorized Maintenance Window per Change Request #CR-9482");
}`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Access Credentials?",
    shortAnswer: "Deceiving an enterprise or coworker to obtain access credentials and fraudulently exfiltrate data, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' Phishing or social engineering to obtain credentials detected via UEBA is prosecuted under Section 420.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for stealing access credentials.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Deceiving coworker Mamata to obtain database access keys for unauthorized exfiltration
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Data Egress Rate-of-Change (Delta Velocity) Monitoring' in UEBA File Analytics?",
    shortAnswer: "Measuring the acceleration (first and second derivatives) of data transfer rates over short rolling windows, detecting automated data exfiltration scripts before large transfers complete.",
    explanation: "Human data transfers have gradual ramp-up curves. An automated exfiltration script (`rclone`, `curl`, `rsync`) creates an instantaneous vertical spike in network upload bandwidth (e.g. from 10 KB/s to 80 MB/s in under 2 seconds). UEBA delta velocity monitors detect this sudden derivative surge $\\frac{d(\\text{Bytes})}{dt}$, severing the connection before the full file is exfiltrated.",
    hint: "A speedometer that alerts not just when you are driving fast, but the instant you floor the gas pedal to maximum acceleration.",
    level: "expert",
    codeExample: `// Delta Velocity Exfiltration Calculation:
double bandwidth_acceleration = (CurrentUploadRate - PreviousUploadRate) / DeltaTime;
if (bandwidth_acceleration > 25000000) { // Acceleration > 25 MB/s²!
    TerminateSocketConnection();
    TriggerAlert("RAPID DATA EGRESS SPIKE: Automated exfiltration script severed!");
}`
  },
  {
    question: "How do 'Continuous Conditional Access and Session Risk Policies' enforce Real-Time Zero-Trust Remediation based on UEBA Scores?",
    shortAnswer: "By feeding UEBA real-time risk scores into Identity Providers (Entra ID/Okta), automatically enforcing step-up MFA or terminating active sessions when a user's risk level transitions to 'High'.",
    explanation: "Traditional authentication checks credentials only at login. Continuous Access Evaluation (CAE) checks risk scores continuously. If an employee in Salt Lake logs in legitimately in the morning, but at 2 PM their UEBA risk score surges past 80 due to mass file downloads, Entra ID immediately invalidates their OAuth tokens, revokes VPN access, and prompts for biometric FIDO2 passkey re-verification.",
    hint: "A building security system that can lock the office door from the inside the instant it detects an unauthorized action, even if the person had a valid keycard to enter the lobby.",
    level: "expert",
    codeExample: `// Entra ID Continuous Access Evaluation (CAE) Policy:
if (User.RealTimeRiskLevel == "High" || UEBA_RiskScore > 80) {
    RevokeAllOAuthTokens(User);
    RequireStepUpAuthentication(Method="FIDO2_Hardware_Passkey");
    QuarantineSession();
}`
  },
  {
    question: "What is 'Privileged Role Hopping Anomaly' in UEBA Active Directory Monitoring?",
    shortAnswer: "An account rapidly assigning itself multiple administrative roles (Domain Admin, Schema Admin, Enterprise Admin) in rapid succession, indicating active privilege escalation or DCSync preparation.",
    explanation: "In Active Directory environments, role changes are rare and planned. If a standard user account suddenly adds itself to `Domain Admins`, then `Backup Operators`, and then requests `DCSync` directory replication rights within 3 minutes, UEBA flags an immediate 'Rapid Privileged Role Hopping' alert, indicating an active domain takeover attack.",
    hint: "A warehouse clerk who suddenly stamps their own badge as General Manager, Building Inspector, and Chief of Police in 2 minutes.",
    level: "expert",
    codeExample: `// Role Hopping Detection Rule:
let admin_roles_added = CountAdminRoleModifications(User, Window="5m");
if (admin_roles_added >= 2) {
    TriggerAlert("CRITICAL ACTIVE DIRECTORY ROLE HOPPING DETECTED: Account escalating privileges!");
    DisableAccountImmediately();
}`
  },
  {
    question: "How do UEBA 'Honeypot User Accounts' (Decoy Identities) provide Zero-False-Positive Threat Detection?",
    shortAnswer: "By deploying fake Active Directory user accounts (e.g. `admin_backup_svc`) that have zero legitimate business purpose; any authentication attempt against a honeypot account is 100% malicious.",
    explanation: "Honeypot accounts (honeytokens) exist solely as traps. They are placed in internal password vaults or Active Directory lists. Because legitimate employees and services never interact with them, any login attempt, password spray, or Kerberoasting request targeting `admin_backup_svc` produces a 100% high-fidelity alert with zero false positives.",
    hint: "A painted dummy doorway in the hallway that only a burglar looking for secret rooms would ever try to open.",
    level: "basic",
    codeExample: `// Honeytoken User Account Alert:
if (TargetAccount == "svc_honeypot_admin" && EventType == "Kerberos_PreAuth") {
    TriggerSOCIncident("CRITICAL THREAT: Honeypot user account attacked! Attacker IP: " + SourceIP);
    IsolateAttackerIP();
}`
  },
  {
    question: "What is 'Anomalous Cloud API Volume' in Cloud Entity Behavior Analytics (CEBA)?",
    shortAnswer: "Detecting sudden spikes in AWS CloudTrail / Azure Management API calls (e.g. 5,000 `DescribeInstances` or `GetSecretValue` calls in 60 seconds), indicating automated cloud enumeration tools.",
    explanation: "Human cloud administrators make occasional API calls via the AWS console or CLI. Attackers using automated tools (Pacu, ScoutSuite) execute thousands of reconnaissance API queries per minute to discover S3 buckets, IAM roles, and secrets. Cloud UEBA engines baseline normal API velocity and flag abnormal automated surges.",
    hint: "Someone flipping through every page of the phone book in 3 seconds using a mechanical leaf blower.",
    level: "moderate",
    codeExample: `// Cloud API Velocity Anomaly Logic:
let api_call_rate = CountCloudTrailEvents(User, Window="1m");
if (api_call_rate > 500 && User.HistoricalAPIMean < 10) {
    TriggerAlert("ANOMALOUS CLOUD RECONNAISSANCE: Automated API enumeration detected in AWS CloudTrail!");
    RevokeAWSCredentials();
}`
  },
  {
    question: "Synthesize the mathematical relationship between Anomaly Z-Score (Z_anomaly), Log Data Quality (D_data_quality), Noise & Anomaly Tolerance (R_noise_tolerance), and Insider Threat Detection Probability (P_detect).",
    shortAnswer: "Threat detection probability is modeled as P_detect = 1 - e^(- (Z_anomaly * D_data_quality) / R_noise_tolerance); high-quality multi-source logs and statistical Z-scores (R_noise_tolerance = 1000) drive threat detection probability above 98.4%.",
    explanation: "Let $Z_{\\text{anomaly}} \\ge 1.0$ represent the statistical Z-score deviation of the behavioral anomaly ($Z = 4.2$ sigma), $D_{\\text{data\\_quality}} \\ge 1.0$ represent the multi-source log ingestion quality (AD + VPN + Endpoint + Proxy = 4.0), and $R_{\\text{noise\\_tolerance}}$ represent the noise filtering and baseline calibration strength. The detection probability is: $P_{\\text{detect}} = 1 - e^{-\\frac{Z_{\\text{anomaly}} \\times D_{\\text{data\\_quality}}}{R_{\\text{noise\\_tolerance}}}}$. When organizations deploy calibrated UEBA baselines ($R_{\\text{noise\\_tolerance}} \\to \\infty$), insider threat detection probability reaches 99.5% with near-zero false alarms.",
    hint: "Mathematical formula proving that calibrated statistical Z-scores and multi-source data quality drive insider threat detection above 98%.",
    level: "expert",
    codeExample: `// UEBA Detection Probability Mathematical Proof:
// Z_anomaly = 4.0 (4.0 Sigma Deviation) | D_data_quality = 4.0 (Multi-Source Ingestion)
// Without Calibration (R_noise = 1.0) ➔ P_detect = 1 - e^(-16.0) = 100.0% (DETECTED!)
// With Calibrated UEBA (R_noise = 1000) ➔ High Fidelity Detection = 98.42% with Zero False Alarms!`
  }
];

export default questions;
