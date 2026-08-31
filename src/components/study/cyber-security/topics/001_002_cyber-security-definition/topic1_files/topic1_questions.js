// topic1_questions.js
// 30 Moderate to Expert Questions on Need of Cyber Security, Attack Drivers, Financial Impacts, and Legal Compliance

const questions = [
  {
    question: "Why is Cyber Security critically needed in modern digital societies?",
    shortAnswer: "Because modern society relies completely on digital networks for banking, healthcare, energy grids, government administration, and communication; without cybersecurity, digital assets face catastrophic theft, ransomware disruption, and nation-state cyber warfare.",
    explanation: "A single unmitigated cyber attack can paralyze entire municipal power grids, compromise millions of citizen identities, or bankrupt commercial enterprises.",
    hint: "Critical systems like banking, power grids, and healthcare depend entirely on digital networks.",
    level: "basic",
    codeExample: "Society_Dependency = ['Digital Banking & UPI', 'Hospital Patient Monitors', 'Power Grid SCADA', 'National Defense'];"
  },
  {
    question: "What is the economic cost of cybercrime and why is cyber risk viewed as a boardroom issue?",
    shortAnswer: "Global cybercrime damages exceed $8 trillion annually (hundreds of thousands of crores in INR) through direct financial theft, ransomware extortion, business downtime, legal fines, and forensic recovery costs, making cybersecurity a core business continuity imperative.",
    explanation: "Boards of directors are legally and financially accountable for failing to implement reasonable security safeguards.",
    hint: "Cyber attacks cost trillions globally through business downtime, ransom, and regulatory fines.",
    level: "moderate",
    codeExample: "Breach_Cost = Ransom_Extortion + Forensic_Investigation + Regulatory_Fines + Reputational_Loss;"
  },
  {
    question: "How does the Digital Personal Data Protection Act (DPDPA 2023) in India mandate the need for cybersecurity?",
    shortAnswer: "The DPDPA 2023 imposes statutory obligations on Data Fiduciaries to implement reasonable security safeguards to prevent personal data breaches, prescribing severe financial penalties of up to ₹250 crore per breach for non-compliance.",
    explanation: "Companies operating in West Bengal face massive legal liabilities if customer biometric, financial, or demographic data is leaked.",
    hint: "Indian privacy law mandating data security with fines up to ₹250 crore for data breaches.",
    level: "basic",
    codeExample: "DPDPA_Compliance: if (personalDataBreached) imposePenalty(MaxAmount = ₹250_Crores);"
  },
  {
    question: "What is Business Email Compromise (BEC) and why is it among the most financially damaging cyber threats?",
    shortAnswer: "A social engineering attack where adversaries impersonate corporate executives or trusted vendors to trick finance personnel into wiring millions of rupees to fraudulent offshore bank accounts without deploying any malware.",
    explanation: "BEC attacks bypass antivirus scanners because they rely on spoofed domains and urgent psychological pressure.",
    hint: "Tricking accounting staff into wiring money by impersonating company executives via fake emails.",
    level: "moderate",
    codeExample: "BEC_Attack: Spoofed_CEO_Email → 'Urgent: Wire ₹45,00,000 to Vendor Account X' → Finance_Transfers → Funds_Stolen"
  },
  {
    question: "Why is Cyber Security essential for Critical National Infrastructure (CNI)?",
    shortAnswer: "Critical infrastructure (electrical power grids, water purification, air traffic control, nuclear reactors) relies on industrial control systems (ICS/SCADA); cyber disruption can cause physical destruction, widespread blackouts, and loss of human life.",
    explanation: "The 2015 Ukraine power grid cyber attack proved that remote hackers can plunge hundreds of thousands of homes into darkness.",
    hint: "Protects power plants, water systems, and air traffic control from physical disaster and blackouts.",
    level: "expert",
    codeExample: "CNI_Sectors = ['Electric Power Transmission', 'Water Treatment', 'Air Traffic Radar', 'Nuclear Generation'];"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Next-Gen SIEM & Threat Intelligence Platform?",
    shortAnswer: "Approximately ₹4,50,000 to ₹12,00,000 per year (including log ingestion licensing, automated correlation playbooks, and threat intelligence feeds) depending on daily log volume.",
    explanation: "Enterprises in Kolkata budget centralized security analytics in annual software licenses in ₹.",
    hint: "Enterprise SIEM software costs ₹4,50,000 – ₹12,00,000 per year in Indian Rupees.",
    level: "moderate",
    codeExample: "SIEM_License_Cost = ₹6,50,000 / year; // 50 GB/day Log Ingestion + Real-Time Threat Feeds"
  },
  {
    question: "How does Remote Work and Bring Your Own Device (BYOD) increase the need for cyber security?",
    shortAnswer: "Remote work dissolves the traditional corporate office network perimeter, exposing internal systems to untrusted home Wi-Fi networks, unmanaged personal laptops, and malware-infected home IoT devices.",
    explanation: "Compels organizations in Barrackpore to enforce Zero Trust Network Access (ZTNA) and device health posture checks.",
    hint: "Working from home exposes companies to unsecured home Wi-Fi and unmanaged personal devices.",
    level: "basic",
    codeExample: "BYOD_Security: DevicePostureCheck(AntivirusActive, DiskEncrypted) → If_Pass_Grant_ZTNA_Tunnel();"
  },
  {
    question: "What is Supply Chain Cyber Risk and how did the SolarWinds cyber attack highlight this need?",
    shortAnswer: "Adversaries breach a trusted third-party software vendor or supplier to inject backdoor malware into legitimate software updates, simultaneously compromising thousands of downstream customer organizations.",
    explanation: "SolarWinds Orion software updates were trojanized by nation-state actors, giving hackers access to US government agencies and Fortune 500 networks.",
    hint: "Hackers compromise a trusted software vendor to secretly infect thousands of its corporate customers.",
    level: "expert",
    codeExample: "SupplyChainRisk: Compromise(VendorBuildPipeline) → BackdoorInjectedInSignedUpdate → 18,000_CustomersInfected"
  },
  {
    question: "Why is Cyber Security critical for Intellectual Property (IP) and Research & Development (R&D)?",
    shortAnswer: "Nation-state adversaries and corporate competitors actively conduct cyber espionage to steal proprietary chemical formulas, pharmaceutical patents, source code, and engineering blueprints, bypassing years of costly research investments.",
    explanation: "Protects proprietary precision foundry manufacturing processes in Barrackpore from foreign theft.",
    hint: "Prevents competitors and foreign nations from stealing proprietary engineering patents and software code.",
    level: "moderate",
    codeExample: "IP_Protection = ['DLP USB Port Blocking', 'Watermarking Source Code', 'Strict Need-to-Know RBAC'];"
  },
  {
    question: "What is the role of Cyber Insurance and why does it require strict baseline cybersecurity controls?",
    shortAnswer: "Cyber Insurance mitigates financial losses from data breaches, ransomware extortion, and business interruption; insurers mandate strict baseline controls (MFA, EDR, air-gapped backups) before issuing policies.",
    explanation: "Failing to maintain mandatory MFA can void a ₹5 crore cyber insurance payout following a ransomware attack in Kolkata.",
    hint: "Financial insurance policy covering breach losses; requires companies to prove they use MFA and backups.",
    level: "basic",
    codeExample: "CyberInsurance_Requirements = ['Enforce 100% MFA', 'Deploy EDR on all PCs', 'Maintain Immutable Backups'];"
  },
  {
    question: "How do connected Medical IoT (IoMT) devices create life-safety cyber risks in hospitals?",
    shortAnswer: "Vulnerabilities in connected pacemaker programmers, insulin pumps, and ICU ventilators can allow malicious actors to alter drug dosages or disable life-support alarms, directly threatening patient lives.",
    explanation: "Healthcare cybersecurity is not just about patient privacy—it is directly about preventing physical patient harm in Ichapur.",
    hint: "Vulnerabilities in hospital ventilators or infusion pumps can physically harm patients if tampered with.",
    level: "expert",
    codeExample: "MedicalSafety: if (infusionRateExceedsSafetyThreshold) blockCommand() && triggerEmergencyAudioAlarm();"
  },
  {
    question: "What is Reputational Damage resulting from a public cybersecurity breach?",
    shortAnswer: "The loss of customer trust, brand equity, investor confidence, and market share that occurs when customer financial records or confidential communications are leaked online.",
    explanation: "Studies show over 60% of small and mid-sized enterprises go out of business within 6 months of a major public data breach.",
    hint: "Customers leaving and brand trust crashing after sensitive customer data is stolen and leaked.",
    level: "basic",
    codeExample: "ReputationalImpact: PublicBreachDisclosed → CustomerChurn(+35%) → StockPriceDrop(-18%)"
  },
  {
    question: "What is Regulatory Compliance Mandate (e.g. RBI Master Directions on IT & Cyber Security)?",
    shortAnswer: "Mandatory technical guidelines issued by the Reserve Bank of India requiring all commercial, cooperative, and payment banks to maintain 24/7 SOC monitoring, automated vulnerability management, and regular red-team cyber drills.",
    explanation: "Ensures Indian financial institutions maintain robust cyber resilience against global banking heists.",
    hint: "Mandatory RBI rules forcing banks to maintain 24/7 security monitoring and ethical hacking tests.",
    level: "moderate",
    codeExample: "RBI_Mandate = ['24/7 Managed SOC', 'Quarterly Vulnerability Audits', 'Mandatory Annual Red-Teaming'];"
  },
  {
    question: "Why do Cloud Migrations increase the need for Cloud Security Posture Management (CSPM)?",
    shortAnswer: "Cloud environments feature dynamic, API-driven infrastructure where a single misconfigured storage bucket (e.g. public AWS S3 bucket) can instantly expose millions of confidential customer records to the Internet.",
    explanation: "CSPM tools in Jadavpur continuously scan cloud configurations to detect and remediate accidental public exposures.",
    hint: "Cloud servers can accidentally expose databases to the public with one wrong click; CSPM prevents this.",
    level: "moderate",
    codeExample: "CSPM_Rule: if (s3Bucket.policy == 'PublicRead') setBucketToPrivate() && alertSecurityTeam();"
  },
  {
    question: "What is an Advanced Persistent Threat (APT) and why do classical antivirus tools fail against it?",
    shortAnswer: "APTs are well-funded, highly skilled nation-state hacking groups that use custom zero-day exploits, fileless memory techniques, and living-off-the-land binaries (LOLBins) to dwell undetected for months; static signature antivirus tools cannot detect novel, uncompiled malware.",
    explanation: "Requires behavioral Endpoint Detection and Response (EDR) and threat hunting to detect in Kolkata.",
    hint: "Nation-state hacking teams that sneak past standard antivirus using custom uncompiled malware.",
    level: "expert",
    codeExample: "APT_DwellTime = 'Adversary remains undetected for 180+ days using legitimate admin tools (PowerShell)'; "
  },
  {
    question: "How does the proliferation of Internet of Things (IoT) expand the corporate attack surface?",
    shortAnswer: "Smart thermostats, IP security cameras, smart lighting, and biometric access readers often ship with hardcoded credentials and unpatchable firmware, serving as convenient entry points for attackers to pivot into core enterprise networks.",
    explanation: "Attackers breached an entire casino database by hacking into an internet-connected smart fish tank thermometer.",
    hint: "Smart devices (cameras, thermostats) have weak passwords and act as open backdoors for hackers.",
    level: "basic",
    codeExample: "IoT_Isolation: Place SmartCameras & Thermostats into 'VLAN 99 (IoT_Quarantine)' with zero intranet access."
  },
  {
    question: "What is Insider Threat and why is it one of the most dangerous cybersecurity risks?",
    shortAnswer: "A security risk originating from authorized employees, contractors, or business partners who abuse their legitimate credentials to steal confidential data, sabotage systems, or accidentally leak records.",
    explanation: "Insiders already possess valid credentials and knowledge of database locations, bypassing perimeter firewalls in Barrackpore.",
    hint: "Risks from employees or contractors who already have valid passwords and insider access.",
    level: "moderate",
    codeExample: "UserBehaviorAnalytics (UBA): Alert if employee downloads 5,000 customer files after midnight."
  },
  {
    question: "What is the difference between Business Continuity Planning (BCP) and Disaster Recovery (DR)?",
    shortAnswer: "BCP focuses on maintaining essential business operations during and after a cyber crisis; DR focuses specifically on the technical restoration of IT infrastructure, databases, and network connectivity.",
    explanation: "Ensures hospital admissions in Ichapur continue using paper emergency protocols (BCP) while engineers restore encrypted servers (DR).",
    hint: "BCP keeps business operations running; DR restores technical servers and databases.",
    level: "moderate",
    codeExample: "BCP_DR = { BCP: 'Emergency paper workflows', DR: 'Restore server databases from air-gapped backups' };"
  },
  {
    question: "What is Deepfake Fraud and AI-Driven Social Engineering?",
    shortAnswer: "Using generative AI to clone the voice and video likeness of corporate executives or family members in real time, convincing finance managers or individuals to execute fraudulent emergency wire transfers.",
    explanation: "A finance employee in a multinational firm transferred $25 million after attending a video conference where all other participants were deepfakes.",
    hint: "Using AI to clone voices and faces of executives to trick staff into wiring money.",
    level: "expert",
    codeExample: "Deepfake_Defense = ['Multi-Person In-Person Verification', 'Shared Secret Challenge Phrases', 'Out-of-Band Calls'];"
  },
  {
    question: "Why is Cyber Security critical for Electoral Integrity and Democratic Processes?",
    shortAnswer: "Adversaries target electronic voting rolls, election commission tabulation servers, and candidate communications to manipulate voter data, leak confidential emails, or spread disinformation to undermine public trust in democratic elections.",
    explanation: "National election commissions deploy air-gapped electronic voting machines and cryptographic tally audits in India.",
    hint: "Protects voter registries and election tallies from foreign manipulation and hacking.",
    level: "basic",
    codeExample: "ElectoralSecurity: VoterRolls.encrypt() → AirGappedVotingMachines() → CryptographicVVPAT_Audit();"
  },
  {
    question: "What is Ransomware-as-a-Service (RaaS) and why has it democratized cyber attacks?",
    shortAnswer: "A criminal business model where core malware developers lease advanced ransomware code and infrastructure to less-skilled criminal affiliates in exchange for a 20% to 30% cut of all extorted ransom payments.",
    explanation: "Allows amateur criminals in West Bengal to launch sophisticated, military-grade cyber extortion campaigns.",
    hint: "Criminal subscription model where malware creators rent out ransomware to amateur hackers for a cut of profits.",
    level: "moderate",
    codeExample: "RaaS_Model: Developer(Builds Ransomware) <--> Affiliate(Infects Victims) → Splits Ransom (75% / 25%)"
  },
  {
    question: "What is Shadow IT and how does it create unseen security risks for organizations?",
    shortAnswer: "The use of information technology hardware, software, or cloud services (e.g. unapproved file-sharing apps, personal WhatsApp for customer data) without explicit approval or oversight from the corporate IT and security department.",
    explanation: "Leaves sensitive customer financial records in unsecured personal cloud storage buckets in Kolkata.",
    hint: "Employees using unapproved apps (like personal Google Drive) without IT department knowledge.",
    level: "basic",
    codeExample: "ShadowIT_Detection: CloudAccessSecurityBroker (CASB) flags unapproved file uploads to personal DropBox."
  },
  {
    question: "What is the role of Threat Intelligence Feeds (STIX / TAXII) in proactive cyber defense?",
    shortAnswer: "Standardized machine-readable feeds that stream real-time Indicators of Compromise (IoCs - malicious IPs, phishing URLs, malware hashes) to perimeter firewalls and SIEMs, automatically blocking emerging global threats before they reach the organization.",
    explanation: "Firewalls in Barrackpore automatically block connections to command-and-control servers identified 5 minutes earlier in Tokyo.",
    hint: "Live automated streams of known hacker IPs and virus hashes to block new attacks instantly.",
    level: "expert",
    codeExample: "STIX_TAXII_Feed: NewMaliciousIP('198.51.100.45') → Ingested by Firewall → Inbound Traffic Dropped"
  },
  {
    question: "Why is Cryptographic Key Management often more critical than the encryption algorithm itself?",
    shortAnswer: "Even unbreakable algorithms like AES-256 are completely useless if encryption keys are hardcoded in source code, stored in cleartext configuration files, or poorly generated, allowing attackers to steal the keys and decrypt all data effortlessly.",
    explanation: "Hardware Security Modules (HSMs) and cloud Key Management Services (KMS) are mandatory to protect keys throughout their lifecycle.",
    hint: "Even the strongest lock is useless if you leave the key under the doormat in cleartext.",
    level: "expert",
    codeExample: "KeyManagement_AntiPattern: const apiKey = '12345_SECRET'; // WRONG! Hardcoding keys in code"
  },
  {
    question: "What is Mobile Device Management (MDM) and why is it needed for corporate smartphone security?",
    shortAnswer: "A centralized software platform that enforces security policies on employee smartphones and tablets (mandatory PINs, biometric locks, containerized corporate data, remote wipe capability for lost/stolen phones).",
    explanation: "Allows IT administrators in Kolkata to remotely erase corporate emails from an employee's stolen smartphone within seconds.",
    hint: "Software that lets companies remotely secure and wipe lost employee smartphones.",
    level: "basic",
    codeExample: "MDM_Action: onDeviceReportedStolen(DeviceID) => triggerRemoteEnterpriseDataWipe(DeviceID);"
  },
  {
    question: "How do Smart City IoT sensor networks create municipal cyber vulnerabilities?",
    shortAnswer: "Municipal networks interconnect smart traffic lights, surveillance cameras, water telemetry, and emergency sirens; a breach in one subsystem can allow attackers to manipulate traffic signals or broadcast fake emergency evacuation alerts.",
    explanation: "Requires strict network segmentation between municipal utility subnets in Kolkata.",
    hint: "Hacking smart city traffic lights or emergency sirens can cause urban chaos and accidents.",
    level: "moderate",
    codeExample: "SmartCity_Risk: CompromisedTrafficLightController → AllLightsSetToGreen → TrafficCollisions"
  },
  {
    question: "What is Security through Obscurity and why is it a dangerous misconception?",
    shortAnswer: "The flawed reliance on secrecy of design or implementation (e.g. hiding an admin portal on an unusual port like 8888) as the primary security control; automated port scanners and decompilers uncover obscurity in seconds, leaving unprotected systems exposed.",
    explanation: "Kerckhoffs's Principle states that a system must remain secure even if everything about the design is publicly known, except the key.",
    hint: "Thinking that hiding something on a weird port makes it safe; scanners find it in seconds.",
    level: "basic",
    codeExample: "ObscurityFallacy: AdminPortalOnPort8888 → NmapScanDetectsPortIn10Seconds → Breached"
  },
  {
    question: "What is Vendor Third-Party Risk Management (TPRM) in enterprise security?",
    shortAnswer: "The process of assessing, monitoring, and mitigating the cybersecurity risks introduced by external service providers, contractors, and software vendors who have network access or handle confidential company data.",
    explanation: "Ensures accounting firms and cloud vendors in Barrackpore adhere to the same strict security standards as the parent enterprise.",
    hint: "Checking and verifying that outside contractors and vendors follow strict cybersecurity rules.",
    level: "moderate",
    codeExample: "TPRM_Process = ['Vendor Security Questionnaire', 'SOC 2 Type II Audit Review', 'Continuous Dark Web Monitoring'];"
  },
  {
    question: "What is Cyber Resilience and how does it differ from traditional Cyber Security?",
    shortAnswer: "Traditional Cyber Security focuses on preventing attacks and keeping hackers out; Cyber Resilience acknowledges that breaches will inevitably occur and focuses on an organization's ability to withstand, absorb, operate through, and rapidly recover from a cyber attack.",
    explanation: "Ensures that a power utility in West Bengal continues supplying electricity even while under an active cyber attack.",
    hint: "Cyber security tries to block attacks; Cyber resilience ensures the business keeps running even if breached.",
    level: "expert",
    codeExample: "Resilience_Equation: AnticipateThreats() + WithstandAttacks() + RecoverRapidly() + AdaptContinuously()"
  },
  {
    question: "What is the ultimate golden rule for understanding and justifying the Need of Cyber Security?",
    shortAnswer: "'Cyber Security is not an IT expense—it is a fundamental prerequisite for business survival, regulatory compliance, national sovereignty, and human life safety in an interconnected digital world; budget cybersecurity in Indian Rupees (₹) to protect all digital assets!'",
    explanation: "This complete rule captures operational continuity, legal mandates, human safety, national defense, and financial procurement budgeting.",
    hint: "Cyber security is a business survival prerequisite protecting wealth, human life, and sovereignty in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ProtectHumanSafety() → EnsureBusinessContinuity() → ComplyWithDPDPA() → BudgetInRupees(₹);"
  }
];

export default questions;
