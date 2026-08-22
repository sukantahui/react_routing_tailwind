// topic2_questions.js
// 30 Moderate to Expert Questions on Importance of Cyber Security, Economic Value, National Security, and Privacy Governance

const questions = [
  {
    question: "Why is Cyber Security considered of paramount strategic importance to modern enterprises?",
    shortAnswer: "Because it safeguards corporate intellectual property, ensures operational continuity, protects customer financial trust, guarantees regulatory compliance, and prevents catastrophic multi-crore financial losses and bankruptcy.",
    explanation: "Enterprises that fail to secure their digital systems suffer irreparable brand damage, loss of competitive edge, and severe legal liabilities.",
    hint: "Protects company profits, customer trust, operational continuity, and intellectual property.",
    level: "basic",
    codeExample: "Strategic_Value = { BrandTrust: 'High', FinancialResilience: 'Protected', ComplianceStatus: '100% Audit Ready' };"
  },
  {
    question: "How does Cyber Security underpin Public Trust in FinTech and Digital Payment Systems (e.g. UPI)?",
    shortAnswer: "By guaranteeing end-to-end encryption, fraud detection within 50ms, and tamper-proof hardware security (HSMs), ensuring citizens can transfer billions of rupees daily without fear of fund theft or interception.",
    explanation: "Without robust cybersecurity, public confidence in digital banking would collapse, forcing the economy back into cash dependency.",
    hint: "Ensures citizens trust digital money transfers by stopping theft and fraud in real time.",
    level: "basic",
    codeExample: "PaymentTrust: Transaction(₹5,000) -> Encrypted_mTLS -> RealTime_FMS_Score(Safe) -> InstantSettlementIn1.2s"
  },
  {
    question: "What is the Geopolitical & National Security importance of Cyber Security?",
    shortAnswer: "Modern warfare has expanded into the fifth domain (Cyberspace); nation-states launch destructive cyber attacks to disable military radar, disrupt power grids, steal defense secrets, and interfere with democratic elections.",
    explanation: "Sovereign cyber defense forces protect a nation's territorial integrity and critical assets from remote digital attacks without firing a physical bullet.",
    hint: "Protects military defense networks, power grids, and government data from foreign nation-state attacks.",
    level: "expert",
    codeExample: "NationalDefense_Domain = ['Land', 'Sea', 'Air', 'Space', 'Cyberspace (Fifth Warfare Domain)'];"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Privileged Access Management (PAM) Solution?",
    shortAnswer: "Approximately ₹3,20,000 to ₹7,50,000 (including vaulting appliance, credential rotation engine, and session keystroke recording for 25 administrative users).",
    explanation: "PAM is an essential enterprise investment that eliminates shared static root/admin passwords in ₹ budgets.",
    hint: "Enterprise PAM solution costs ₹3,20,000 – ₹7,50,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "PAM_Investment_Cost = ₹4,80,000; // Vaults root passwords & records all administrative SSH sessions in Kolkata"
  },
  {
    question: "How does Cyber Security protect Human Privacy as a Fundamental Right?",
    shortAnswer: "By enforcing strong encryption (AES-256), data anonymization, and access governance, preventing unauthorized corporate surveillance, mass data harvesting, identity theft, and personal extortion.",
    explanation: "Upholds Article 21 of the Indian Constitution (Right to Privacy - Puttaswamy judgment) by ensuring personal digital data remains confidential.",
    hint: "Protects personal photos, messages, and medical data from being stolen or used for extortion.",
    level: "basic",
    codeExample: "PrivacyShield: PersonalData.encryptWithAES256() -> RestrictAccessWithRBAC() -> ZeroUnauthorizedSurveillance"
  },
  {
    question: "Why is Cyber Security critical for maintaining Shareholder Value and Brand Equity?",
    shortAnswer: "A severe public data breach causes immediate stock price drops (averaging 7% to 15%), credit rating downgrades, customer churn, and long-term erosion of enterprise market valuation.",
    explanation: "Investors and institutional funds factor cybersecurity posture into ESG (Environmental, Social, Governance) corporate investment ratings.",
    hint: "Stops stock prices from crashing and prevents customers from abandoning the company after a hack.",
    level: "moderate",
    codeExample: "BrandEquity_Impact: if (breachHandledTransparently && dataEncrypted) stockImpact(< 1%); else stockDrop(-14%);"
  },
  {
    question: "How does Cyber Security foster Innovation and Research & Development (R&D)?",
    shortAnswer: "By providing secure digital enclaves where scientists, engineers, and software developers can collaborate, store trade secrets, and train AI models without fear of intellectual property theft.",
    explanation: "Encourages pharmaceutical and aerospace enterprises in Barrackpore to invest billions in multi-year research projects.",
    hint: "Gives scientists and companies the confidence to invent new technologies without fear of IP theft.",
    level: "moderate",
    codeExample: "R&D_Vault: Proprietary_AI_Model --Encrypted_S3_Vault--> Accessible_Only_By_Authorized_Scientists"
  },
  {
    question: "What is Secure Access Service Edge (SASE) and why is it important for distributed enterprises?",
    shortAnswer: "A cloud-native architecture combining Software-Defined WAN (SD-WAN) with comprehensive cloud security services (Zero Trust ZTNA, Cloud Access Security Broker CASB, Firewall-as-a-Service FWaaS) delivered directly to the user edge.",
    explanation: "Provides unified, low-latency cybersecurity protection for remote employees in Ichapur connecting to multi-cloud applications.",
    hint: "Cloud framework combining SD-WAN networking with zero-trust firewalls delivered to remote workers.",
    level: "expert",
    codeExample: "SASE_Model = { Network: 'Cloud SD-WAN', Security: ['ZTNA', 'CASB', 'FWaaS', 'SWG'], Edge: 'Global PoPs' };"
  },
  {
    question: "Why is Cyber Security critical in preventing Operational Paralysis in Healthcare?",
    shortAnswer: "Hospitals rely on networked patient management systems, laboratory analyzers, and surgical consoles; cybersecurity prevents ransomware from locking medical charts, cancelling emergency surgeries, or forcing hospital diversions.",
    explanation: "In 2020, a ransomware attack on a German hospital forced emergency patient diversions, leading directly to a patient fatality.",
    hint: "Prevents hospital computer shutdowns so doctors can access allergy data and perform life-saving surgeries.",
    level: "basic",
    codeExample: "HealthcareUptime = { PatientCharting: 'Operational', SurgicalRobots: 'Active', EmergencyTriage: 'Continuous' };"
  },
  {
    question: "What is the role of Penetration Testing Retainers in continuous security posture assurance?",
    shortAnswer: "An ongoing contractual engagement with certified ethical hackers who perform quarterly red-team simulations and vulnerability assessments against an organization's perimeter, discovering and reporting exploitable flaws before criminal hackers find them.",
    explanation: "Provides proactive risk assurance to boards of directors and regulatory audit bodies in Kolkata.",
    hint: "Hiring ethical hackers to regularly test and break into company networks to fix security flaws first.",
    level: "moderate",
    codeExample: "Annual_Pentest_Retainer = ₹3,20,000; // 4 Quarterly Web & Network Penetration Tests per year"
  },
  {
    question: "How does Cyber Security prevent Extortion and Blackmail of Corporate Executives?",
    shortAnswer: "By securing executive mobile devices, personal email accounts, and home Wi-Fi networks with MFA, VPNs, and anti-spyware, preventing adversaries from deploying spyware (e.g. Pegasus) to record private conversations.",
    explanation: "Protects confidential board meeting deliberations and merger-and-acquisition plans from hostile leaks.",
    hint: "Protects CEOs and executives from having their phones tapped and private discussions blackmailed.",
    level: "moderate",
    codeExample: "ExecutiveProtection: MobileDevice(Encrypted + AntiSpyware) -> Communications(Signal/EncryptedVOIP)"
  },
  {
    question: "What is the importance of Cyber Security for National Smart Grid & Clean Energy Transitions?",
    shortAnswer: "Renewable solar and wind micro-grids rely on IoT smart inverters and distributed telemetry; cybersecurity prevents adversaries from manipulating power generation parameters and destabilizing national energy grids.",
    explanation: "Enables India's transition to 500 GW of renewable energy by guaranteeing the cyber resilience of distributed energy controllers.",
    hint: "Protects solar and wind smart power inverters from being hacked and knocking out the electric grid.",
    level: "expert",
    codeExample: "SmartGrid_Security: Microgrid_Inverter -> Authenticated_DNP3_Protocol -> Central_Grid_Load_Balancer"
  },
  {
    question: "How does Cyber Security protect Autonomous Vehicles and Intelligent Transportation Systems (ITS)?",
    shortAnswer: "By encrypting Controller Area Network (CAN) vehicle bus messaging and Vehicle-to-Everything (V2X) wireless communications, preventing remote hackers from overriding vehicle steering, braking, or throttle controls.",
    explanation: "Prevents life-threatening automotive cyber attacks on expressways across West Bengal.",
    hint: "Stops remote hackers from tampering with brakes or steering on connected smart cars.",
    level: "expert",
    codeExample: "AutomotiveSecurity: CAN_Bus_Message.verifyHMAC(ECU_Key) => if (valid) executeBrakeCommand();"
  },
  {
    question: "Why is Cyber Security indispensable for E-Commerce and Global Supply Chains?",
    shortAnswer: "It protects customer payment cards from digital skimming (Magecart), verifies shipping logistics manifests against tampering, and ensures warehouses operate automated fulfillment robotics without cyber sabotage.",
    explanation: "Guarantees that millions of festive shopping packages in Kolkata are delivered accurately and on schedule.",
    hint: "Stops credit card skimming on web shops and protects automated shipping warehouses from hackers.",
    level: "basic",
    codeExample: "ECommerceSecurity = ['CSP Script Integrity (Anti-Magecart)', 'PCI-DSS Payment Tokenization', 'WAF Anti-Bot'];"
  },
  {
    question: "What is the importance of Cyber Security in Artificial Intelligence (AI) and Machine Learning?",
    shortAnswer: "Protects training datasets from Data Poisoning attacks, safeguards proprietary model weights from model theft, and defends inference pipelines against Adversarial Evasion attacks that trick computer vision systems.",
    explanation: "Ensures AI diagnostic models in Jadavpur remain accurate and untampered by malicious training inputs.",
    hint: "Protects AI models from data poisoning and prevents competitors from stealing AI model weights.",
    level: "expert",
    codeExample: "AI_Security: ValidateTrainingDataIntegrity() -> EncryptModelWeights(AES256) -> SanitizeInferenceInputs();"
  },
  {
    question: "How does Cyber Security maintain Judicial & Legal System Integrity?",
    shortAnswer: "By protecting digital court filing systems (e-Courts), electronic case evidence vaults, and forensic digital chain-of-custody hashes from unauthorized alteration or tampering.",
    explanation: "Guarantees that digital evidence presented in Calcutta High Court is legally authentic, untampered, and admissible.",
    hint: "Ensures court evidence and digital legal case files cannot be tampered with or deleted.",
    level: "moderate",
    codeExample: "DigitalEvidence: CaseFile -> SHA256_Hash -> BlockchainTimestamped() -> AdmissibleInCourt"
  },
  {
    question: "Why is Cyber Security critical for Aerospace and Satellite Ground Stations?",
    shortAnswer: "Protects satellite uplink command channels from unauthorized signal hijacking, prevents telemetry spoofing, and secures ground control station telemetry tracking earth-observation and communication satellites.",
    explanation: "Guarantees that ISRO communication and weather satellites in India remain under authorized national control.",
    hint: "Protects satellite command signals from being hijacked or jammed by hostile foreign actors.",
    level: "expert",
    codeExample: "SatelliteLink: UplinkCommand.signWithMilitaryKey() -> DirectSequenceSpreadSpectrum(DSSS) -> Spacecraft"
  },
  {
    question: "What is Cyber Hygiene and why is individual user hygiene of massive organizational importance?",
    shortAnswer: "The routine practices and habits (using unique passwords, enabling MFA, installing software updates, avoiding unknown links) that maintain personal and organizational device health, eliminating over 85% of common cyber breaches.",
    explanation: "A single employee in Barrackpore practicing good cyber hygiene stops automated ransomware worms from entering the enterprise.",
    hint: "Daily basic security habits (strong passwords, MFA, updates) that stop 85% of cyber attacks.",
    level: "basic",
    codeExample: "CyberHygieneChecklist = ['Enable MFA everywhere', 'Use Password Manager', 'Update OS immediately', 'Verify URLs'];"
  },
  {
    question: "How does Cyber Security prevent Identity Theft and Financial Impersonation?",
    shortAnswer: "By securing national identity databases (Aadhaar, PAN) with sensor-level encryption and masking, preventing criminals from opening fraudulent bank loans or SIM cards in innocent citizens' names.",
    explanation: "Protects citizens across West Bengal from fraudulent debt collection and ruined credit scores.",
    hint: "Stops criminals from using your stolen Aadhaar or PAN details to take out bank loans in your name.",
    level: "basic",
    codeExample: "IdentityShield: MaskedAadhaar('XXXX-XXXX-1234') -> Biometric_Lock_Enabled -> Prevents_Fraudulent_Loans"
  },
  {
    question: "What is the importance of Cyber Security in Cloud Multi-Tenancy Architecture?",
    shortAnswer: "Ensures strict hypervisor and memory isolation (preventing side-channel VM-escape attacks like Spectre and Meltdown), guaranteeing that neighboring cloud tenants cannot peek into your encrypted database memory.",
    explanation: "Allows competing commercial banks to safely share physical cloud hardware in Kolkata with zero data cross-contamination.",
    hint: "Ensures other companies sharing the same cloud server cannot look into your private databases.",
    level: "expert",
    codeExample: "HypervisorIsolation: DedicatedMemoryPageTable + KPTI (Kernel Page Table Isolation) -> Zero VM Cross-Bleed"
  },
  {
    question: "Why is Cyber Security critical for Maritime Shipping and Port Automation?",
    shortAnswer: "Modern cargo ports rely on automated container cranes, Vessel Traffic Services (VTS), and electronic customs clearance; cyber attacks can paralyze global maritime trade and cause multi-week supply shortages.",
    explanation: "The NotPetya cyber attack shut down Maersk's global port operations, causing over $300 million in disruption costs.",
    hint: "Protects automated shipping cranes and port computers from shutting down global trade.",
    level: "moderate",
    codeExample: "PortSecurity: Segment(Cranes_Industrial_LAN) <--> Customs_Office_LAN (Strict Firewall Isolated)"
  },
  {
    question: "How does Cyber Security safeguard Open Source Software (OSS) Repositories?",
    shortAnswer: "By enforcing two-factor authentication for code maintainers, scanning dependencies for malicious package injections (typosquatting), and cryptographically signing commits (Sigstore/GPG), preventing supply chain tampering.",
    explanation: "Protects millions of developers worldwide from downloading backdoored libraries (e.g. the XZ Utils backdoor incident).",
    hint: "Stops hackers from injecting malware into open-source software libraries used by millions.",
    level: "expert",
    codeExample: "OSS_Security: git commit -S -m 'Secure release' -> Verifies GPG signature -> Sigstore Verified"
  },
  {
    question: "What is the economic multiplier effect of a strong National Cyber Security Posture?",
    shortAnswer: "A secure digital ecosystem attracts foreign direct investment (FDI), accelerates tech startup innovation, reduces fraud losses, and positions a nation as a trusted global hub for digital services and data centers.",
    explanation: "Positions West Bengal as a preferred destination for global FinTech and semiconductor R&D investments.",
    hint: "Countries with strong cyber security attract billions in foreign tech investments and startup jobs.",
    level: "basic",
    codeExample: "EconomicMultiplier: StrongCyberPosture -> AttractsForeignTechFDI -> AcceleratesGDPGrowth"
  },
  {
    question: "Why is Cyber Security essential for Telecommunications & 5G/6G Mobile Networks?",
    shortAnswer: "Telecom networks form the fundamental communication backbone carrying all voice, data, and emergency services; cybersecurity protects software-defined core networks from eavesdropping, DDoS outages, and rogue base stations.",
    explanation: "Guarantees that emergency calls (112) and banking SMS OTPs in Kolkata are delivered reliably and securely.",
    hint: "Protects mobile cell towers and core networks so phone calls and mobile internet never go down.",
    level: "moderate",
    codeExample: "5G_Security: ZeroTrustCoreNetwork + SUPI_Encryption (Subscription Concealed Identifier) -> Anti-IMSI-Catcher"
  },
  {
    question: "What is the importance of Cyber Security for Educational Institutions & Student Records?",
    shortAnswer: "Protects student personal demographic records, exam question papers, academic transcripts, and research datasets from unauthorized alteration, leak, or ransomware lockouts.",
    explanation: "Preserves the academic integrity of university degrees issued across institutions in Jadavpur.",
    hint: "Protects exam papers from leaking and prevents student marksheets from being altered.",
    level: "basic",
    codeExample: "TranscriptsVault: StudentMarksheet -> CryptographicallySignedPDF -> StoredInDigiLocker"
  },
  {
    question: "How does Cyber Security prevent Corporate Industrial Sabotage?",
    shortAnswer: "By monitoring chemical formulation telemetry, machine temperature thresholds, and PLC firmware signatures, preventing attackers from covertly altering industrial recipes or over-pressurizing equipment.",
    explanation: "Protects pharmaceutical manufacturing laboratories in Barrackpore from tainted drug batches caused by cyber manipulation.",
    hint: "Stops competitors or hackers from secretly changing chemical recipes or ruining factory machines.",
    level: "expert",
    codeExample: "IndustrialDefense: PLC_Firmware.verifyHash() -> ContinuousTelemetryMonitoring() -> AlarmsOnAnomaly"
  },
  {
    question: "What is the role of Cyber Security in Crisis Management and Natural Disaster Response?",
    shortAnswer: "Ensures emergency response communication networks (satellite radios, disaster command centers, meteorological flood telemetry) remain operational and unjammed during cyclones, floods, and earthquakes.",
    explanation: "Enables state disaster response teams in coastal Bengal to coordinate rescue operations without communication blackouts.",
    hint: "Keeps emergency radios and flood sensors working during cyclones and natural disasters.",
    level: "moderate",
    codeExample: "DisasterResponse: EmergencyRadioNetwork --Encrypted_VSAT--> State_Emergency_Command_Center"
  },
  {
    question: "Why is Cyber Security critical for Banking Core Ledger Immutability?",
    shortAnswer: "Ensures financial account balances and transaction histories cannot be silently altered in database tables by rogue database administrators or external SQL injection attackers.",
    explanation: "Guarantees that a customer's ₹5,00,000 savings balance in Ichapur cannot be maliciously modified to ₹0.",
    hint: "Ensures bank account balances can never be secretly edited or erased in the database.",
    level: "basic",
    codeExample: "LedgerImmutability: WriteAheadLog + CryptographicMerkleTreeVerification -> TamperingDetectedInstantly"
  },
  {
    question: "What is the difference between Compliance-Driven Security and Risk-Driven Security?",
    shortAnswer: "Compliance-Driven Security merely checks boxes to satisfy minimum legal regulations (often leaving gaps); Risk-Driven Security assesses an organization's unique threat model and deploys tailored, resilient defenses to mitigate real-world business risks.",
    explanation: "Organizations in Kolkata that rely only on checkbox compliance are frequently breached because compliance lags behind emerging attacker techniques.",
    hint: "Compliance checks legal minimum boxes; Risk-driven security builds real defenses against real hackers.",
    level: "expert",
    codeExample: "SecurityMindset: RiskDrivenModel(AssessThreats, HardenedArchitecture) > ComplianceCheckboxModel"
  },
  {
    question: "What is the ultimate golden rule for understanding and articulating the Importance of Cyber Security?",
    shortAnswer: "'Cyber Security is the foundational bedrock of all digital civilization—protecting human life, economic prosperity, sovereign democracy, and technological innovation; invest in layered defenses and budget security in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes societal value, economic stability, national sovereignty, human safety, and financial procurement budgeting.",
    hint: "Cyber security is the bedrock of modern civilization protecting life, wealth, and innovation in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ProtectDigitalCivilization() -> DefendSovereignty() -> SecureEconomicProsperity() -> BudgetInRupees(₹);"
  }
];

export default questions;
