// topic3_questions.js
// 30 Moderate to Expert Questions on Goals of Cyber Security, CIA Triad, Parkerian Hexad, and Operational Security Governance

const questions = [
  {
    question: "What are the primary foundational goals of Cyber Security?",
    shortAnswer: "The primary goals are to ensure Confidentiality (preventing unauthorized disclosure), Integrity (preventing unauthorized alteration), and Availability (ensuring uninterrupted authorized access)—collectively known as the CIA Triad.",
    explanation: "Every security policy, firewall rule, encryption algorithm, and access control system is deployed to uphold one or more of these core goals.",
    hint: "The CIA Triad: Confidentiality (privacy), Integrity (accuracy), and Availability (uptime).",
    level: "basic",
    codeExample: "PrimaryGoals = { Confidentiality: 'Data Privacy', Integrity: 'Data Accuracy', Availability: 'System Uptime' };"
  },
  {
    question: "What is the Parkerian Hexad and what are its six fundamental security attributes?",
    shortAnswer: "An expanded security model created by Donn B. Parker comprising: 1. Confidentiality, 2. Integrity, 3. Availability, 4. Authenticity, 5. Possession/Control, and 6. Utility.",
    explanation: "Provides a more complete framework than the CIA Triad by addressing scenarios where data is stolen without being read (Possession) or encrypted with lost keys (Utility).",
    hint: "Six security goals: Confidentiality, Integrity, Availability, Authenticity, Possession, and Utility.",
    level: "expert",
    codeExample: "ParkerianHexad = ['Confidentiality', 'Integrity', 'Availability', 'Authenticity', 'Possession', 'Utility'];"
  },
  {
    question: "What is the security goal of 'Authenticity' in the Parkerian Hexad?",
    shortAnswer: "The assurance that data, transactions, communications, or identities originate from the genuine, valid source they claim to represent, verified via cryptographic digital certificates (X.509 PKI) and multi-factor authentication.",
    explanation: "Prevents adversaries from sending forged emails pretending to be a bank manager in Kolkata.",
    hint: "Proving that a message or user is genuinely who they claim to be.",
    level: "basic",
    codeExample: "Authenticity_Check = verifyDigitalSignature(MessagePayload, SenderPublicKey);"
  },
  {
    question: "What is the security goal of 'Possession / Control' in the Parkerian Hexad?",
    shortAnswer: "The physical or logical custody of information assets; if an encrypted backup tape is physically stolen from a server room, confidentiality is preserved (due to encryption), but possession/control is lost.",
    explanation: "Helps organizations recognize physical theft or media loss as a distinct security breach even if cryptographic confidentiality holds.",
    hint: "Having physical or logical ownership of data media, even if the data inside is encrypted.",
    level: "moderate",
    codeExample: "PossessionBreach: EncryptedDriveStolenFromDataCenter -> Confidentiality(Safe) but Possession(Compromised)"
  },
  {
    question: "What is the security goal of 'Utility' in the Parkerian Hexad?",
    shortAnswer: "Ensuring that data remains useful, accessible, and in a decodable format for authorized business purposes; if data is encrypted with a lost private key or corrupted by unreadable formatting, its utility is destroyed.",
    explanation: "Ransomware destroys data utility without necessarily breaching confidentiality (since the attacker cannot read the files either).",
    hint: "Ensuring data is in a usable and readable format, not corrupted or locked with lost keys.",
    level: "moderate",
    codeExample: "UtilityLoss: FileEncryptedWithLostKey -> Confidentiality(100%), Integrity(Intact), Utility(0 - Useless)"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Hardware Security Module (HSM) for Master Key Governance?",
    shortAnswer: "Approximately ₹4,20,000 to ₹9,50,000 (e.g. Thales Luna HSM, Utimaco) providing FIPS 140-2 Level 3 physical tamper-resistant cryptographic key generation and storage.",
    explanation: "HSMs guarantee the possession and utility of master encryption keys for banking ledgers in Kolkata in ₹.",
    hint: "Enterprise HSM appliance costs ₹4,20,000 – ₹9,50,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "HSM_Appliance_Budget = ₹6,50,000; // FIPS 140-2 Level 3 Hardware Security Module"
  },
  {
    question: "What is Non-Repudiation as an operational cyber security goal?",
    shortAnswer: "The capability to prove the occurrence of a digital transaction, message transmission, or authorization so conclusively that neither sender nor recipient can deny their participation.",
    explanation: "Enforced using asymmetric digital signatures and timestamped audit logs for high-value financial wires in Barrackpore.",
    hint: "Proof that a user cannot deny authorizing a digital transfer, using digital signatures.",
    level: "basic",
    codeExample: "NonRepudiation = DigitalSignature(Payload, PrivateKey) + TrustedTimestampServerSignature;"
  },
  {
    question: "What is Accountability in cybersecurity and how is it achieved?",
    shortAnswer: "The requirement that every action taken on a computer system can be uniquely traced back to a specific individual human identity, achieved through unique user accounts, MFA, and immutable SIEM audit logs.",
    explanation: "Eliminates shared administrative logins so that auditors in Ichapur know exactly which engineer executed a configuration change.",
    hint: "Tracing every action on a server back to the specific person who did it.",
    level: "basic",
    codeExample: "Accountability: AuditLog.record(UserID = 'debangshu_admin', Action = 'Restart_Firewall', Timestamp = '2026-08-22T10:15:00Z');"
  },
  {
    question: "What is the Recovery Point Objective (RPO) and Recovery Time Objective (RTO) in Availability goals?",
    shortAnswer: "RPO defines the maximum acceptable data loss measured in time (e.g. RPO = 0 means zero transaction loss); RTO defines the maximum acceptable duration of system downtime before operations must be fully restored (e.g. RTO &lt; 15 minutes).",
    explanation: "Core metrics guiding disaster recovery clustering and backup scheduling budgets in Jadavpur.",
    hint: "RPO is how much data you can afford to lose; RTO is how quickly you must restore systems.",
    level: "moderate",
    codeExample: "DisasterRecoverySLA = { RPO: '0 seconds (Real-Time Replication)', RTO: '< 15 minutes (Automated Failover)' };"
  },
  {
    question: "How does Data Classification support the goal of Confidentiality?",
    shortAnswer: "By categorizing enterprise data into sensitivity tiers (e.g. Public, Internal, Confidential, Restricted/Secret), allowing organizations to apply strict cryptographic and access controls to high-value assets without over-restricting public data.",
    explanation: "Ensures employee salaries and hospital medical records in Kolkata receive top-tier encryption while marketing brochures remain accessible.",
    hint: "Labeling data as Public, Confidential, or Secret to apply the right level of encryption.",
    level: "basic",
    codeExample: "DataClassification = { Public: 'No Encryption', Confidential: 'AES-256 + RBAC', Secret: 'HSM Vaulted + MFA' };"
  },
  {
    question: "What is the difference between Data at Rest, Data in Transit, and Data in Use?",
    shortAnswer: "Data at Rest resides on persistent storage (encrypted via AES-256 / BitLocker); Data in Transit moves across networks (encrypted via TLS 1.3 / IPsec); Data in Use resides in active RAM / CPU registers (protected via Confidential Computing / Enclaves).",
    explanation: "Achieving true confidentiality requires cryptographic protection across all three data states in Barrackpore.",
    hint: "At Rest (on disk), In Transit (over the network), In Use (in computer RAM/CPU).",
    level: "moderate",
    codeExample: "DataStates = { AtRest: 'AES-256-XTS', InTransit: 'TLS 1.3 (ChaCha20/AES-GCM)', InUse: 'Intel SGX Enclaves' };"
  },
  {
    question: "How does Cryptographic Hashing guarantee the goal of Data Integrity?",
    shortAnswer: "Hashing generates a unique fixed-length digest (e.g. SHA-256); because of the Avalanche Effect, modifying even a single comma in a legal document changes over 50% of the hash bits, instantly exposing tampering.",
    explanation: "Used to verify downloaded software binaries and bank transaction ledgers in Ichapur.",
    hint: "Any tiny change in data completely changes the hash, proving tampering instantly.",
    level: "basic",
    codeExample: "IntegrityValidation: if (SHA256(DownloadedFile) == OfficialVendorHash) allowExecution(); else quarantine();"
  },
  {
    question: "What is High Availability (HA) and how is the 'Five Nines' (99.999%) availability goal achieved?",
    shortAnswer: "99.999% availability permits no more than 5.26 minutes of total unscheduled downtime per year; achieved using redundant active-active server clusters, multi-path network uplinks, redundant power supplies (UPS), and automated load balancers.",
    explanation: "Mandatory for life-support hospital medical networks and stock exchange trading engines in Kolkata.",
    hint: "Five Nines (99.999% uptime) allows only 5 minutes of downtime a year using redundant hardware.",
    level: "expert",
    codeExample: "FiveNines_SLA: AnnualDowntimeLimit = 5.26 minutes; Architecture = 'Active-Active Multi-AZ Dual Redundant';"
  },
  {
    question: "What is Fault Tolerance and how does it differ from High Availability?",
    shortAnswer: "High Availability minimizes downtime using rapid automated failover (a brief sub-second transition); Fault Tolerance guarantees zero service interruption or degradation even when a hardware component experiences total catastrophic physical failure.",
    explanation: "Fault-tolerant systems utilize lockstep mirrored CPUs and RAID-10 storage to sustain hardware crashes with zero downtime in Jadavpur.",
    hint: "HA fails over in a few seconds; Fault tolerance keeps running without even a millisecond of interruption.",
    level: "expert",
    codeExample: "FaultTolerance: DualCPUsRunInLockstep() -> CPU_1_Explodes -> CPU_2_ContinuesWithoutPacketDrop();"
  },
  {
    question: "What is Privacy-by-Design and Privacy-by-Default in cyber security goals?",
    shortAnswer: "A systems engineering approach where privacy protections and data minimization are embedded directly into software architectures from the initial design phase, with maximum privacy settings enabled automatically by default.",
    explanation: "Mandated by the European GDPR and India's DPDPA 2023 for all student and citizen data platforms.",
    hint: "Building privacy protections into software from day one, with privacy turned on by default.",
    level: "moderate",
    codeExample: "PrivacyByDefault = { CollectMinimalDataOnly: true, EncryptOnStorage: true, ShareWithThirdParties: false };"
  },
  {
    question: "What is the goal of Security Auditing and Compliance Monitoring?",
    shortAnswer: "To provide independent, verifiable proof that an organization’s security controls are operating effectively, meeting standards such as ISO/IEC 27001, PCI-DSS, SOC 2, and RBI Cyber Security Guidelines.",
    explanation: "Enables fintech startups in Kolkata to win institutional enterprise contracts and pass government regulatory audits.",
    hint: "Regularly checking and proving that security systems follow official international standards.",
    level: "basic",
    codeExample: "Audit_Frameworks = ['ISO 27001 ISMS', 'SOC 2 Type II', 'PCI-DSS v4.0', 'RBI Master Directions'];"
  },
  {
    question: "How does Identity and Access Management (IAM) enforce the goal of Authorization?",
    shortAnswer: "IAM evaluates user identities, group memberships, and role policies to grant or deny access to specific servers, folders, or API endpoints, enforcing the Principle of Least Privilege.",
    explanation: "Prevents a junior accounting intern in Barrackpore from accessing confidential executive payroll tables.",
    hint: "Checks who you are and gives you permission only to the specific files you need for work.",
    level: "basic",
    codeExample: "IAM_Evaluation: if (User.hasRole('Doctor') && Patient.isAssignedTo(User)) grantAccess(); else denyAccess();"
  },
  {
    question: "What is the security goal of 'Resilience' and how is Blast Radius Reduction achieved?",
    shortAnswer: "Resilience ensures systems survive partial breaches; Blast Radius Reduction uses microsegmentation and air-gapping to confine an attacker's intrusion to a single isolated subnet, preventing network-wide lateral movement.",
    explanation: "If a receptionist's PC in Ichapur is infected with ransomware, microsegmentation prevents the virus from reaching the database server.",
    hint: "Limiting damage so a virus on one computer cannot spread to the rest of the company network.",
    level: "moderate",
    codeExample: "BlastRadiusContainment: isolateCompromisedVLAN() -> blockLateralSMB() -> coreDatabaseProtected();"
  },
  {
    question: "What is Threat Deterrence and Threat Prevention in defensive cyber strategy?",
    shortAnswer: "Deterrence discourages adversaries through clear legal warning banners, high-profile monitoring, and strict prosecution penalties; Prevention implements technical controls (firewalls, EDR, IPS) that actively block attacks from succeeding.",
    explanation: "Banner warnings ('Unauthorized access is monitored and prosecuted under IT Act 2000') deter casual hackers in Kolkata.",
    hint: "Deterrence warns and discourages hackers; Prevention actively blocks their attacks with firewalls.",
    level: "basic",
    codeExample: "DeterrenceBanner = 'Authorized Access Only. All activities logged and prosecuted under Indian IT Act 2000.';"
  },
  {
    question: "What is Security Governance and what is the role of the Chief Information Security Officer (CISO)?",
    shortAnswer: "Security Governance is the executive framework aligning cybersecurity strategy with business objectives; the CISO directs enterprise security architecture, incident response, compliance, and multi-lakh security budgets in INR.",
    explanation: "The CISO reports directly to the Board of Directors on enterprise cyber risks, insurance, and defensive readiness in Barrackpore.",
    hint: "The executive team and CISO who manage company-wide security strategy, policies, and budgets.",
    level: "moderate",
    codeExample: "CISOResponsibilities = ['Board Risk Reporting', 'Security Architecture Governance', 'Annual Security Budget Allocation in ₹'];"
  },
  {
    question: "What is the goal of Anonymization and Pseudonymization in data privacy protection?",
    shortAnswer: "Anonymization irreversibly strips all personal identifiers from datasets so individuals can never be re-identified; Pseudonymization replaces direct identifiers (e.g. patient name) with artificial tokens/pseudonyms, reversible only with a separate secret key.",
    explanation: "Enables medical research universities in Jadavpur to train AI cancer models on clinical records without violating patient confidentiality.",
    hint: "Anonymization completely erases names; Pseudonymization replaces names with secret ID codes.",
    level: "expert",
    codeExample: "Pseudonymization: { OriginalName: 'Mamata Roy', PseudonymToken: 'PATIENT_ID_88392X' };"
  },
  {
    question: "How does In-Band Network Telemetry (INT) support the goal of Operational Observability?",
    shortAnswer: "INT embeds real-time metadata (switch latency, queue occupancy, path hops) directly into packet headers as they traverse programmable ASICs, providing nanosecond-precision visibility into network bottlenecks and covert exfiltration.",
    explanation: "Allows network security engineers in Kolkata to detect micro-burst exfiltration attempts in real time.",
    hint: "Packets carry their own hop-by-hop latency and queue data to give instant network visibility.",
    level: "expert",
    codeExample: "INT_Telemetry: PacketHeader.append([SwitchID, IngressTimestamp, QueueOccupancy, EgressPort]);"
  },
  {
    question: "What is the goal of Digital Rights Management (DRM) and Content Security?",
    shortAnswer: "To prevent unauthorized copying, redistribution, piracy, or unencrypted playback of proprietary video, audio, and e-learning curriculum using encrypted media streams and hardware-enforced decryptor enclaves (Widevine L1).",
    explanation: "Protects educational video lectures and proprietary courseware produced in Barrackpore from piracy.",
    hint: "Encrypts digital video and course materials so only paying students can view them.",
    level: "basic",
    codeExample: "DRM_Protection: VideoStream.encrypt(CENC_AES_CTR) -> DecryptedOnlyInsideSecureHardwareEnclave();"
  },
  {
    question: "What is Vulnerability Remediation and Patch Management Lifecycle?",
    shortAnswer: "The systematic identification, prioritization (via CVSS scoring), testing, and deployment of software security updates across all servers and workstations to close exploitable flaws before adversaries leverage them.",
    explanation: "Patching critical Windows and Linux vulnerabilities within 72 hours stops automated worm outbreaks in Ichapur.",
    hint: "Finding software bugs and installing updates/patches before hackers can exploit them.",
    level: "basic",
    codeExample: "PatchSLA = { CriticalCVSS_9to10: 'Deploy in < 48 Hours', HighCVSS_7to8: 'Deploy in < 7 Days' };"
  },
  {
    question: "What is Threat Containment Latency (Mean Time to Detect - MTTD & Mean Time to Respond - MTTR)?",
    shortAnswer: "MTTD is the average time taken to discover a security breach after initial penetration; MTTR is the average time taken to neutralize the threat and contain the infected endpoint; elite SOC teams aim for MTTD &lt; 5 min and MTTR &lt; 15 min.",
    explanation: "Reducing MTTR from weeks to minutes in Kolkata prevents attackers from finding and exfiltrating database crown jewels.",
    hint: "MTTD is how fast you spot an attacker; MTTR is how fast you kick them out of the network.",
    level: "moderate",
    codeExample: "SOC_Metrics = { TargetMTTD: '< 5 Minutes', TargetMTTR: '< 15 Minutes', DwellTimeLimit: '0 Days' };"
  },
  {
    question: "How do Automated Playbooks (SOAR - Security Orchestration, Automation, and Response) achieve rapid incident goals?",
    shortAnswer: "SOAR engines execute pre-scripted automated responses (e.g. isolating an infected PC, revoking compromised user credentials, blocking malicious IPs on firewalls) within milliseconds of a confirmed SIEM alert without waiting for human intervention.",
    explanation: "Stops fast-moving ransomware in Barrackpore at 2:00 AM when human SOC analysts are on break.",
    hint: "Automated scripts that instantly isolate infected PCs and block hacker IPs in milliseconds.",
    level: "expert",
    codeExample: "SOAR_Playbook: onRansomwareDetected(HostIP) => { isolateHost(HostIP); blockC2IPOnFirewall(); notifySOC(); };"
  },
  {
    question: "What is Security Culture and how is human error minimized as a core security goal?",
    shortAnswer: "Cultivating an organizational environment where security is a shared responsibility, reinforced through monthly simulated phishing tests, frictionless incident reporting, and rewarding vigilant employees rather than punishing honest mistakes.",
    explanation: "Transforms 500 enterprise employees in Kolkata into an active human sensor network that spots phishing attacks.",
    hint: "Training employees continuously so they spot and report phishing emails without fear.",
    level: "basic",
    codeExample: "SecurityCulture: RunSimulatedPhishing() -> RewardReporter() -> ContinuousHygieneWorkshops();"
  },
  {
    question: "Why is Supply Chain Integrity a mandatory goal for modern software development?",
    shortAnswer: "Because modern applications are built with hundreds of open-source dependencies; software bill of materials (SBOM) and cryptographic package verification ensure third-party libraries contain no hidden backdoors or malicious crypto-miners.",
    explanation: "Ensures software built in Jadavpur is safe from upstream package tampering (e.g. npm typosquatting).",
    hint: "Checking that all software libraries used in your apps are clean and free of hidden malware.",
    level: "moderate",
    codeExample: "SBOM_Validation: generateCycloneDX_SBOM() -> scanVulnerabilities() -> verifyPackageSignatures();"
  },
  {
    question: "What is Business Alignment in cybersecurity goals?",
    shortAnswer: "Ensuring that security controls, policies, and budgets directly enable and support business objectives (such as speeding up digital product launches and customer onboarding) without imposing crippling friction or slowing down operations.",
    explanation: "Security teams in Kolkata that work collaboratively with business units accelerate enterprise growth safely.",
    hint: "Making sure security rules help the business grow and move fast rather than getting in the way.",
    level: "moderate",
    codeExample: "BusinessAlignment: EnableFastCloudDeployment() + ZeroTrustAutomatedGuardrails = SecureAgileGrowth"
  },
  {
    question: "What is the ultimate golden rule for mastering, defining, and achieving the Goals of Cyber Security?",
    shortAnswer: "'Anchor all security architectures to the extended Parkerian Hexad (Confidentiality, Integrity, Availability, Authenticity, Possession, Utility); enforce accountability with non-repudiation; minimize dwell time with automated SOAR; and budget all security platforms in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes foundational models, comprehensive hexad goals, operational telemetry, rapid containment, and financial procurement budgeting.",
    hint: "Parkerian Hexad + Non-repudiation + Automated SOAR + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: MasterParkerianHexad() -> EnforceNonRepudiation() -> MinimizeMTTR_WithSOAR() -> BudgetInRupees(₹);"
  }
];

export default questions;
