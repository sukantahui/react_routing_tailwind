// topic10_questions.js
// 30 Moderate to Expert Questions on Applications of Cyber Security across Banking, Healthcare, E-Commerce, Smart Cities, Defense, and Cloud

const questions = [
  {
    question: "What are the primary applications of Cyber Security in modern industry sectors?",
    shortAnswer: "Cyber security is applied across all modern sectors: 1. Banking & FinTech (UPI fraud prevention, payment HSMs, PCI-DSS); 2. Healthcare (EHR privacy, IoMT safety); 3. E-Commerce (WAF, anti-Magecart, OAuth 2.0); 4. Critical Infrastructure & Smart Cities (SCADA, smart grids, traffic interlocks); 5. National Defense (tactical datalinks, Zero Trust SASE); 6. Cloud Computing (CASB, CSPM, DevSecOps).",
    explanation: "Every digital system processing financial, personal, or operational data requires tailored cybersecurity architectures.",
    hint: "Applied in banking, hospitals, e-commerce stores, smart power grids, defense, and cloud computing.",
    level: "basic",
    codeExample: "Applications = ['FinTech & UPI', 'Healthcare & EHR', 'E-Commerce & Retail', 'Smart Cities & SCADA', 'National Defense', 'Cloud DevSecOps'];"
  },
  {
    question: "How is Cyber Security applied in Banking and FinTech (UPI / Core Banking)?",
    shortAnswer: "Enforces FIPS 140-2 Level 3 Hardware Security Modules (HSMs) for PIN encryption, real-time AI transaction fraud scoring engines analyzing transaction velocity in &lt; 35ms, dynamic multi-factor authentication (MFA), and PCI-DSS 4.0 cardholder compliance.",
    explanation: "Protects billions of monthly UPI payments worth over ₹18 Lakh Crore across India from fraudulent interception.",
    hint: "Hardware HSMs for encryption, real-time AI anti-fraud engines, and instant OTP verification.",
    level: "basic",
    codeExample: "FinTechSecurity = { HSM: 'FIPS 140-2 Level 3 PIN Encryption', RealTimeFraudScoring: '< 35ms Latency', Compliance: 'PCI-DSS v4.0' };"
  },
  {
    question: "How is Cyber Security applied in Healthcare and the Internet of Medical Things (IoMT)?",
    shortAnswer: "Protects Electronic Health Records (EHR) with column-level AES-256 encryption, isolates smart connected medical devices (infusion pumps, MRI scanners) on microsegmented biomedical VLANs, and enforces cryptographic digital signatures on diagnostic lab reports.",
    explanation: "Prevents ransomware from paralyzing hospital ICU equipment and protects patient confidentiality under DPDPA 2023 in Ichapur.",
    hint: "Encrypts medical records, isolates infusion pumps on private networks, and digitally signs lab reports.",
    level: "moderate",
    codeExample: "HealthcareSecurity = { DataRest: 'AES-256-GCM EHR Tables', Network: 'Microsegmented IoMT VLAN', Integrity: 'X.509 PKI Lab Signatures' };"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Web Application Firewall (WAF) & Anti-Bot Protection Suite?",
    shortAnswer: "Approximately ₹3,20,000 to ₹7,50,000 per year (e.g. Cloudflare Enterprise WAF, AWS WAF, Akamai) providing real-time layer-7 DDoS mitigation, OWASP Top 10 blocking, and client-side Magecart inspection.",
    explanation: "Protects e-commerce portals and university admission websites in Kolkata in ₹.",
    hint: "Enterprise WAF and anti-bot suite costs ₹3,20,000 – ₹7,50,000 per year in Indian Rupees.",
    level: "moderate",
    codeExample: "Annual_WAF_Budget = ₹4,80,000; // Cloud WAF + Anti-Bot Scraping + Client-Side Magecart Script Integrity"
  },
  {
    question: "How is Cyber Security applied in E-Commerce and Digital Retail?",
    shortAnswer: "Enforces Subresource Integrity (SRI) and Content Security Policy (CSP) headers to block Magecart card skimmers, deploys rate-limiting anti-bot algorithms to stop scalping bots, and uses OAuth 2.0 / OpenID Connect tokenization for passwordless checkout.",
    explanation: "Secures customer payment card data and checkout sessions during peak festive shopping rushes in Barrackpore.",
    hint: "CSP headers to stop script skimmers, anti-bot scalping protection, and secure OAuth checkout.",
    level: "moderate",
    codeExample: "ECommerceSecurity = ['Content-Security-Policy (CSP)', 'Subresource Integrity (SRI)', 'OAuth 2.0 Token Vaulting', 'Anti-Scalping Bot Mitigation'];"
  },
  {
    question: "How is Cyber Security applied in Smart Grid and Advanced Metering Infrastructure (AMI)?",
    shortAnswer: "Smart meters and electrical substations use Elliptic Curve Cryptography (ECC) and mutual TLS (mTLS) to authenticate meter readings and remote disconnect commands, preventing cyber attackers from triggering widespread urban blackouts.",
    explanation: "Secures millions of smart electricity meters deployed across West Bengal.",
    hint: "Digital certificates and encryption on smart electric meters so hackers cannot shut off city power.",
    level: "expert",
    codeExample: "SmartGrid_AMI: SmartMeter --mTLS(ECC_256)--> UtilityHeadEnd → ValidatesReadingBeforeBilling"
  },
  {
    question: "How is Cyber Security applied in Connected & Autonomous Vehicles (CAN Bus & V2X)?",
    shortAnswer: "Enforces Secure On-Board Communication (SecOC) on Controller Area Network (CAN) buses to block malicious brake/steering injection, and uses Public Key Infrastructure (PKI) for Vehicle-to-Everything (V2X) radio collision avoidance messages.",
    explanation: "Prevents remote hackers from taking over vehicle steering wheels or overriding automated braking systems in Jadavpur.",
    hint: "Encrypts the vehicle's internal CAN bus wiring so hackers cannot remotely control brakes or steering.",
    level: "expert",
    codeExample: "AutomotiveSecurity = { CAN_Bus: 'SecOC MAC Verification', V2X_Radio: 'IEEE 1609.2 PKI Signed Messages' };"
  },
  {
    question: "How is Cyber Security applied in Cloud Computing & SaaS (CASB & CSPM)?",
    shortAnswer: "Cloud Security Posture Management (CSPM) continuously scans cloud accounts for misconfigured S3 buckets and exposed ports; Cloud Access Security Brokers (CASB) enforce DLP and encryption policies across employee SaaS tools (Office 365, Salesforce).",
    explanation: "Eliminates shadow cloud vulnerabilities and protects enterprise digital assets in Kolkata.",
    hint: "CSPM finds misconfigured cloud servers; CASB enforces security rules across cloud apps.",
    level: "moderate",
    codeExample: "CloudSecurity = { CSPM: 'Automated S3 Public Bucket Remediation', CASB: 'SaaS Data Loss Prevention Enforcer' };"
  },
  {
    question: "What is DevSecOps and how is security embedded into modern Software Engineering CI/CD pipelines?",
    shortAnswer: "Integrating security automated testing directly into the software development lifecycle: Static Application Security Testing (SAST), Software Composition Analysis (SCA for open-source libraries), and Dynamic Application Security Testing (DAST) before code is merged.",
    explanation: "Catches SQL injection and Log4j vulnerabilities in Barrackpore before software is deployed to production.",
    hint: "Automated security scanners built into developer code pipelines to find bugs before publishing.",
    level: "basic",
    codeExample: "DevSecOps_Pipeline = 'Git Commit → SAST Scan → Dependency SCA → Container Linting → Automated Deployment';"
  },
  {
    question: "How is Cyber Security applied in National Defense & Military Command Systems?",
    shortAnswer: "Implements air-gapped enclaves, red-black hardware separation (isolating classified cipher text from plaintext), post-quantum cryptographic (PQC) algorithms, and jam-resistant tactical frequency-hopping software-defined radios.",
    explanation: "Protects sovereign military radar data and missile launch telemetry across the Indian Armed Forces.",
    hint: "Air-gapped networks, military hardware encryption, and jam-resistant radio datalinks for defense.",
    level: "expert",
    codeExample: "DefenseSecurity = { Architecture: 'Air-Gapped Enclave', Crypto: 'Post-Quantum Kyber-1024', Separation: 'Red/Black Hardware Isolation' };"
  },
  {
    question: "How is Cyber Security applied in Telecommunications & 5G Network Slicing?",
    shortAnswer: "5G architectures use cryptographic mutual authentication between user equipment (UE) and the core network (SEAF/AUSF), encrypting user plane traffic (AES-256) and creating logically isolated virtual network slices for emergency services and smart utilities.",
    explanation: "Guarantees that an enterprise network slice in Kolkata remains completely isolated from public consumer traffic.",
    hint: "5G network slicing creates private, encrypted fast lanes for emergency ambulances and police.",
    level: "expert",
    codeExample: "5G_NetworkSlice: Slice_1('Consumer 5G') <--(Logically Isolated)--> Slice_2('Police & Ambulance Emergency Network')"
  },
  {
    question: "What is Secure Access Service Edge (SASE) and how does it revolutionize enterprise remote access?",
    shortAnswer: "A cloud-native architecture converging Software-Defined WAN (SD-WAN) and Security Service Edge (SSE) functions (Zero Trust Network Access - ZTNA, Cloud SWG, CASB, FWaaS) into a unified cloud service, inspecting traffic close to the user regardless of location.",
    explanation: "Allows remote engineers in Ichapur to securely access corporate applications without slow legacy VPN bottlenecks.",
    hint: "Cloud security service replacing old VPNs with fast, secure Zero Trust access everywhere.",
    level: "moderate",
    codeExample: "SASE_Architecture = SD_WAN(Routing) + SSE(ZeroTrust + Cloud_Firewall + CASB + SWG);"
  },
  {
    question: "How is Cyber Security applied in Maritime Shipping & Port Automation?",
    shortAnswer: "Secures Electronic Chart Display and Information Systems (ECDIS), satellite Automatic Identification System (AIS) tracking against GPS spoofing, and isolates automated port gantry crane controllers from administrative IT networks.",
    explanation: "Ensures container vessels entering coastal ports in West Bengal navigate safely with authentic satellite coordinates.",
    hint: "Protecting ship navigation screens and automated port cranes from GPS spoofing and hacking.",
    level: "moderate",
    codeExample: "MaritimeSecurity: ECDIS_Navigation.verifyGPS(DualConstellation_Galileo_NavIC) → RejectsSpoofedCoordinates"
  },
  {
    question: "How is Cyber Security applied in E-Governance and Citizen Identity Platforms (e.g. Aadhaar / DigiLocker)?",
    shortAnswer: "Enforces Hardware Security Modules (HSMs) for Aadhaar biometric tokenization, Virtual IDs (VID) to prevent cleartext Aadhaar disclosure, end-to-end TLS 1.3 encryption, and multi-factor biometric authentication with liveness detection.",
    explanation: "Guarantees that over 1.4 billion citizen identities across India remain secure against bulk exfiltration.",
    hint: "Hardware HSMs and biometric tokenization protecting millions of citizen Aadhaar records.",
    level: "basic",
    codeExample: "DigiLockerSecurity = { Auth: 'Aadhaar OTP / Fingerprint Liveness', Encryption: 'AES-256 Column Encryption', Secrets: 'HSM FIPS 140-2' };"
  },
  {
    question: "What is Zero Trust Architecture (NIST SP 800-207) and why is it applied across all modern applications?",
    shortAnswer: "A security model based on the core axiom 'Never Trust, Always Verify'; eliminates the obsolete concept of a trusted internal network perimeter by requiring strict identity verification, device health attestation, and least-privilege authorization for every single request.",
    explanation: "If a workstation in Jadavpur is compromised, Zero Trust prevents the attacker from accessing any other server.",
    hint: "Never trust anyone inside or outside the network; check every single request every single time.",
    level: "basic",
    codeExample: "ZeroTrustPrinciple = 'Verify Explicitly + Enforce Least Privilege + Assume Breach Always';"
  },
  {
    question: "How is Cyber Security applied in Educational Institutions & University Campuses?",
    shortAnswer: "Separates open student Wi-Fi networks from administrative payroll and research laboratory servers via 802.1X network access control (NAC), dynamic VLAN assignment, and anti-DDoS protection for online examination portals.",
    explanation: "Allows 10,000 university students in Kolkata to browse the web safely while locking down sensitive grade databases.",
    hint: "Using 802.1X NAC to keep student Wi-Fi separate from exam and teacher payroll servers.",
    level: "basic",
    codeExample: "CampusNetwork = { StudentWiFi: 'Isolated VLAN 100', Faculty: '802.1X VLAN 200', ExamServers: 'AirGapped Isolated VLAN 300' };"
  },
  {
    question: "How is Cyber Security applied in Oil & Gas Pipeline SCADA Systems?",
    shortAnswer: "Uses redundant acoustic pipeline leak sensors, encrypted satellite SCADA telemetry, and physical rupture relief valves to detect cyber attacks attempting to over-pressurize high-pressure fuel lines.",
    explanation: "Protects vital state petroleum pipelines in Barrackpore from remote extortion attacks like the Colonial Pipeline shutdown.",
    hint: "Encrypted satellite SCADA and physical relief valves protecting oil pipelines from over-pressurization.",
    level: "expert",
    codeExample: "PipelineSecurity: if (pressurePSI > MaxSafeThreshold) MechanicalReliefValve.open() [Physics overrides hacked software]"
  },
  {
    question: "How is Cyber Security applied in Smart Home IoT & Consumer Electronics?",
    shortAnswer: "Enforces unique per-device factory passwords (banning default 'admin/admin'), automatic secure firmware over-the-air (FOTA) cryptographic updates, and local device network isolation (protecting smart webcams from internet botnet scanning).",
    explanation: "Stops smart cameras in Ichapur from being hijacked into global Mirai DDoS botnets.",
    hint: "Unique passwords, encrypted auto-updates, and keeping smart webcams off public internet.",
    level: "basic",
    codeExample: "IoTSecurity = { DefaultPassword: 'Banned', FOTA_Updates: 'RSA-Signed Microcode', LocalNetwork: 'Client Isolation' };"
  },
  {
    question: "What is Confidential Computing and how does it protect data in use inside cloud applications?",
    shortAnswer: "Hardware-enforced Trusted Execution Environments (TEEs / Enclaves, such as Intel SGX or AMD SEV) that encrypt data in active computer RAM and CPU registers during computation, preventing even cloud administrators or hypervisors from inspecting cleartext data.",
    explanation: "Allows multiple competing hospitals in Kolkata to train shared AI cancer models without exposing patient data.",
    hint: "Special encrypted CPU enclaves that keep data secret even while it is being processed in computer RAM.",
    level: "expert",
    codeExample: "ConfidentialComputing: Enclave.executeInRAM(EncryptedData) → CPU registers decrypted only inside silicon."
  },
  {
    question: "How is Cyber Security applied in Automated Train Interlocking & Metro Rail Systems?",
    shortAnswer: "Communication-Based Train Control (CBTC) systems use encrypted wireless radio links (IEEE 802.11 / LTE) with cryptographic message authentication codes (MACs) and mechanical track circuit interlocks to prevent unauthorized train acceleration or signal tampering.",
    explanation: "Guarantees passenger safety on the Kolkata Metro network with sub-second fail-safe braking.",
    hint: "Cryptographic radio messages and mechanical track relays ensuring trains never collide.",
    level: "expert",
    codeExample: "MetroRail_CBTC: TrainController --HMAC_SHA256(SpeedLimit = 60km/h)--> CabSignaling [Failsafe drops to emergency brakes]"
  },
  {
    question: "How is Cyber Security applied in Financial Stock Exchanges & High-Frequency Trading (HFT)?",
    shortAnswer: "Utilizes FPGA hardware accelerators for microsecond-speed deep packet inspection, nanosecond precision clock synchronization (IEEE 1588 PTP), and optical cross-connect network tap monitoring to eliminate market manipulation and front-running.",
    explanation: "Secures billions of rupees in daily equity transactions on national exchanges in Kolkata.",
    hint: "Nanosecond-precise hardware packet filters stopping hackers from cheating high-speed stock trades.",
    level: "expert",
    codeExample: "HFT_Security: HardwareFPGA.inspect(Packet, Latency = 800_Nanoseconds) → DropsSpoofedOrder"
  },
  {
    question: "How is Cyber Security applied in Legal & Law Enforcement Digital Evidence Custody?",
    shortAnswer: "Digital evidence lockers utilize Write-Once-Read-Many (WORM) storage, continuous SHA-256 hash recalculation, and cryptographic blockchain ledgers to produce court-admissible forensic evidence certificates compliant with Section 65B of the Indian Evidence Act.",
    explanation: "Ensures evidence gathered by cyber police in Barrackpore is never challenged for tampering in court.",
    hint: "WORM storage and SHA-256 hashes proving police digital evidence was never altered.",
    level: "moderate",
    codeExample: "EvidenceVault: StoreDiskImage() → CalculateSHA256() → RecordOnPrivateBlockchainLedger() → CourtAdmissible"
  },
  {
    question: "What is the Role of Cyber Insurance in enterprise risk management applications?",
    shortAnswer: "A specialized commercial financial policy covering liability, forensic investigation costs, legal defense fees, regulatory fines (under DPDPA), business interruption losses, and customer notification expenses following a major cybersecurity incident.",
    explanation: "Transfers catastrophic residual risk to insurance underwriters for enterprises in Kolkata.",
    hint: "Insurance policies that pay for legal fees, fines, and business losses after a major cyber attack.",
    level: "basic",
    codeExample: "CyberInsurance_Coverage = ['Incident Forensics (₹)', 'Regulatory Fines (₹)', 'Business Interruption Recovery (₹)'];"
  },
  {
    question: "How is Cyber Security applied in Microservices & Kubernetes Container Security?",
    shortAnswer: "Enforces mutual TLS (mTLS) via service meshes (Istio), automated container image vulnerability scanning in CI/CD, read-only root filesystems, and Kubernetes NetworkPolicies that restrict inter-pod communications to minimum necessary ports.",
    explanation: "Prevents a compromised payment microservice from escalating access to backend database pods in Jadavpur.",
    hint: "mTLS between microservices, image vulnerability scans, and read-only container filesystems.",
    level: "expert",
    codeExample: "K8s_NetworkPolicy: spec.ingress[0].from.podSelector.matchLabels.app = 'payment-frontend-only';"
  },
  {
    question: "How is Cyber Security applied in Space Exploration & Satellite Ground Telemetry?",
    shortAnswer: "Command and telemetry uplinks utilize CCSDS cryptographic standards with AES-256 encryption, anti-jamming frequency hopping, and physical air-gapped ground mission control centers to prevent unauthorized orbital repositioning.",
    explanation: "Protects national earth observation and communication satellites operated by Indian space facilities.",
    hint: "AES-256 encryption on satellite radio commands to prevent rogue actors from altering satellite orbits.",
    level: "expert",
    codeExample: "SatelliteUplink: CCSDS_Telecommand.encrypt(AES-256-GCM, MasterSpaceKey) → Spacecraft validates before execution."
  },
  {
    question: "How is Cyber Security applied in Online Gaming & Esports anti-cheat architectures?",
    shortAnswer: "Uses kernel-level anti-cheat drivers (Ring 0 monitoring), server-side trajectory validation, and behavioral memory inspection to detect aimbots, wallhacks, and packet tampering, ensuring competitive integrity.",
    explanation: "Protects multimillion-rupee esports tournaments and in-game digital economies from fraud.",
    hint: "Kernel-level anti-cheat engines stopping players from using aimbots and memory hacks.",
    level: "moderate",
    codeExample: "AntiCheat_Engine: InspectMemorySpace() → DetectsInjectedDLL() → BanPlayerHardwareID();"
  },
  {
    question: "How is Cyber Security applied in AI / Machine Learning Model Protection (Adversarial ML)?",
    shortAnswer: "Defends AI training pipelines against training data poisoning, model inversion attacks (extracting training data from weights), and adversarial prompt injections using input sanitization, differential privacy, and model weight watermarking.",
    explanation: "Protects proprietary medical diagnosis and financial credit scoring AI algorithms in Kolkata.",
    hint: "Protecting AI models from prompt injections, poisoned data, and stolen training algorithms.",
    level: "expert",
    codeExample: "ML_Security = { DataPoisoningDefense: 'Outlier Filtering', Privacy: 'Differential Privacy (Epsilon = 0.5)', PromptInjection: 'Guardrail Filters' };"
  },
  {
    question: "How is Cyber Security applied in Remote Work & Zero Trust Endpoint Protection?",
    shortAnswer: "Combines Unified Endpoint Management (UEM) with hardware-enforced disk encryption (BitLocker), Next-Gen Endpoint Detection & Response (EDR), continuous micro-conditional access checks, and FIDO2 biometric authentication.",
    explanation: "Allows corporate employees in Barrackpore to work from home with identical security to working inside headquarters.",
    hint: "BitLocker disk encryption, EDR software, and biometric logins protecting remote work laptops.",
    level: "basic",
    codeExample: "RemoteWorkSecurity = BitLocker(FullDisk) + EDR(Behavioral) + ConditionalAccess(HealthCheck) + FIDO2(Biometrics);"
  },
  {
    question: "What is Security Culture and Continuous Hygiene across all application sectors?",
    shortAnswer: "The organizational habit where security is embedded into every employee's daily workflow, maintained through monthly simulated phishing tests, frictionless hazard reporting, and transparent post-incident blameless post-mortems.",
    explanation: "Transforms employees across Bengal into an active, vigilant human firewall defending the organization.",
    hint: "Training all employees to be careful, report suspicious emails, and follow security rules daily.",
    level: "basic",
    codeExample: "SecurityCulture = ContinuousTraining + MonthlyPhishingSimulations + RewardingVigilantEmployees;"
  },
  {
    question: "What is the ultimate golden rule for mastering, architecting, and deploying Applications of Cyber Security?",
    shortAnswer: "'Tailor security architectures to specific industry requirements—from FinTech HSMs and Healthcare EHR encryption to Smart Grid optical diodes and DevSecOps pipelines; enforce Zero Trust everywhere; and budget all enterprise security solutions in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes industry specialization, defense-in-depth, zero trust governance, and financial procurement budgeting.",
    hint: "Industry specialization + Zero Trust architecture + Defense-in-depth + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: TailorIndustrySecurity() → EnforceZeroTrust() → LayerDefenseInDepth() → BudgetInRupees(₹);"
  }
];

export default questions;
