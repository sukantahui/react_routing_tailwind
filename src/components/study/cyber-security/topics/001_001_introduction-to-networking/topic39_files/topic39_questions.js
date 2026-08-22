// topic39_questions.js
// 30 Moderate to Expert Questions on Networking in Banking, Financial Payment Switches, and Cyber Security

const questions = [
  {
    question: "What is Core Banking Solution (CBS) networking and how does it connect bank branches?",
    shortAnswer: "A centralized banking network architecture where all retail bank branches connect to a central Data Center (DC) and Disaster Recovery (DR) site over dual-homed MPLS and encrypted 4G/5G IPsec VPNs, enabling real-time ledger updates across all accounts.",
    explanation: "CBS systems (e.g. TCS BaNCS, Infosys Finacle) ensure that a deposit made at a branch in Barrackpore is instantly reflected on an ATM in Kolkata.",
    hint: "Centralized banking network connecting all branches to a central data center via MPLS and IPsec.",
    level: "basic",
    codeExample: "CBS_Architecture = { CoreDC: 'Finacle/BaNCS Cluster', BranchAccess: 'Dual MPLS + IPsec 4G Failover' };"
  },
  {
    question: "What is a Payment Hardware Security Module (HSM) and why is it mandatory in banking networks?",
    shortAnswer: "A tamper-resistant hardware cryptographic appliance (e.g. Thales payShield) that securely generates, stores, and processes cryptographic keys, encrypting ATM PIN blocks (ISO 9564) and verifying card CVVs with zero host OS memory exposure.",
    explanation: "Payment HSMs zeroize (erase) all cryptographic keys in milliseconds if physical penetration or voltage tampering is detected.",
    hint: "Tamper-proof hardware appliance that manages ATM PINs, CVVs, and encryption keys.",
    level: "expert",
    codeExample: "hsm.verifyPINBlock({ EncryptedPIN: '0x9F1A', AccountNumber: '100234567890' }) => 'VALID';"
  },
  {
    question: "What is the ISO 8583 protocol standard in ATM and Point-of-Sale (POS) networking?",
    shortAnswer: "The international standard for financial transaction messaging that defines the data elements (Card Number, Processing Code, Amount, Terminal ID, PIN Block) exchanged between ATMs, POS terminals, and acquiring bank switches.",
    explanation: "ISO 8583 uses bitmapped fields to maximize parsing speed and bandwidth efficiency across low-bandwidth banking links.",
    hint: "Standard messaging format used for ATM and POS card transactions worldwide.",
    level: "moderate",
    codeExample: "ISO8583_Message = { MTI: '0200' /* Financial Request */, Bitmap: '0x7000', Field4_Amount: '000000050000' };"
  },
  {
    question: "How does the Unified Payments Interface (UPI) network architecture process instant mobile payments in India?",
    shortAnswer: "NPCI operates a high-speed financial switch connecting Remitter Banks, Beneficiary Banks, and Payment Service Providers (PSPs) over dedicated MPLS lines and Mutual TLS (mTLS), settling funds instantly via IMPS in under 1.5 seconds.",
    explanation: "Virtual Payment Addresses (VPAs, e.g. `user@upi`) decouple mobile numbers from underlying bank account and IFSC details.",
    hint: "NPCI switch links remitter and beneficiary banks over mTLS to settle funds in under 1.5 seconds.",
    level: "moderate",
    codeExample: "UPI_Transaction: RemitterApp -> RemitterBank -> NPCI_Switch -> BeneficiaryBank (Settled in 1.2s)"
  },
  {
    question: "What is PCI-DSS (Payment Card Industry Data Security Standard) Cardholder Data Environment (CDE) segmentation?",
    shortAnswer: "A mandatory regulatory requirement that uses internal firewalls and isolated VLANs to strictly separate all servers and databases that store, process, or transmit credit/debit card numbers from the rest of the corporate bank network.",
    explanation: "Segmenting the CDE reduces security compliance audit scope and prevents standard office PCs from accessing sensitive cardholder data.",
    hint: "Isolates cardholder data systems into a secure firewall zone to meet global payment standards.",
    level: "expert",
    codeExample: "Firewall: Block Office_LAN -> Cardholder_Data_Environment (CDE) except on Port 443 with mTLS + MFA;"
  },
  {
    question: "What is SWIFT (Society for Worldwide Interbank Financial Telecommunication) and how is SWIFTNet secured?",
    shortAnswer: "A global cooperative financial messaging network used by over 11,000 institutions to execute cross-border wire transfers using ISO 20022 and MT/MX messages, secured by dedicated SWIFT Alliance Gateways (SAG), Hardware Security Modules, and PKI certificates.",
    explanation: "SWIFT messages authenticate fund transfer instructions between banks in Kolkata and correspondent banks worldwide.",
    hint: "Global secure financial messaging network connecting banks worldwide for wire transfers.",
    level: "basic",
    codeExample: "SWIFT_Message: { Type: 'MT103' /* Single Customer Credit Transfer */, Sender: 'SBININBB', Receiver: 'CHASUS33' };"
  },
  {
    question: "What is an ATM Black-Box / Jackpotting attack and how do modern banking networks prevent it?",
    shortAnswer: "An attack where criminals physically open the ATM top-hat, disconnect the cash dispenser cable, and connect a rogue micro-computer that sends direct dispense commands; prevented by end-to-end cryptographic dispenser bus encryption and chassis intrusion sensors.",
    explanation: "Dispenser bus encryption binds the cash dispenser cryptographically to the ATM motherboard, rejecting unsigned dispense commands.",
    hint: "Connecting rogue electronics to cash dispensers; stopped by encrypting dispenser cables.",
    level: "expert",
    codeExample: "DispenserSecurity: if (!message.verifySignature(MotherboardKey)) rejectDispenseCommand();"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a Dual Enterprise Payment Hardware Security Module (HSM) Pair?",
    shortAnswer: "Approximately ₹8,50,000 to ₹25,00,000 (e.g. Thales payShield 10K, Entrust nShield) depending on transaction-per-second (TPS) cryptographic throughput licensing and FIPS 140-2 Level 3 compliance.",
    explanation: "Enterprise banking payment switches require redundant active-active HSM pairs to ensure 100% transaction availability in ₹ budgets.",
    hint: "Payment HSM pair costs ₹8,50,000 – ₹25,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "Payment_HSM_Pair_Cost = ₹16,50,000; // Dual Redundant Payment HSMs (1,500 TPS Capacity)"
  },
  {
    question: "What is RBI INFINET (Indian Financial Network) and how does RTGS/NEFT operate over it?",
    shortAnswer: "INFINET is a closed user group (CUG) satellite and terrestrial communication network owned and operated by IDRBT for the Reserve Bank of India, connecting all scheduled commercial banks for high-value RTGS and NEFT settlement.",
    explanation: "INFINET uses dedicated leased lines and MPLS VPNs with PKI digital signatures to guarantee zero external Internet exposure.",
    hint: "Closed private communication network operated for RBI for secure RTGS and NEFT transfers.",
    level: "expert",
    codeExample: "INFINET_Network = { Owner: 'IDRBT / RBI', Scope: 'Closed User Group (CUG)', Security: 'Dedicated PKI' };"
  },
  {
    question: "What is Active-Active Data Center Replication in Core Banking and how does DWDM enable it?",
    shortAnswer: "Dense Wavelength Division Multiplexing (DWDM) multiplexes multiple optical wavelengths over dark fiber, delivering sub-millisecond round-trip latency (< 2 ms) between primary and secondary bank data centers, enabling synchronous database writes.",
    explanation: "If the primary data center in Kolkata loses power, the disaster recovery site in Barrackpore continues processing transactions with Zero Recovery Point Objective (RPO=0).",
    hint: "High-speed dark fiber link allowing dual data centers to mirror database writes in real time.",
    level: "expert",
    codeExample: "Synchronous_Replication: Primary_DC --DWDM_Fiber (1.1ms)--> DR_Site (RPO = 0, Zero Data Loss)"
  },
  {
    question: "What is Tokenization in Card-Not-Present (CNP) e-commerce banking transactions?",
    shortAnswer: "A security process where a customer's actual 16-digit Primary Account Number (PAN) is replaced with a randomly generated, unique surrogate token for that specific merchant and device, preventing card theft during merchant database breaches.",
    explanation: "RBI guidelines in India mandate tokenization for all online merchant checkout cards (e.g. Amazon, Flipkart).",
    hint: "Replaces real credit card numbers with unique dummy tokens for online shopping.",
    level: "basic",
    codeExample: "Tokenization: Real_PAN (4111222233334444) -> Token_Vault -> Merchant_Token (9842103948172039)"
  },
  {
    question: "What is an Automated Clearing House (ACH) / NACH in banking networking?",
    shortAnswer: "A centralized electronic batch clearing system operated by NPCI that processes high-volume, recurring bulk financial transactions like salary credits, dividends, loan EMIs, and utility bill direct debits.",
    explanation: "NACH processes millions of interbank mandate transactions in scheduled nightly batches across bank servers in India.",
    hint: "NPCI batch processing network for high-volume recurring payments like salaries and loan EMIs.",
    level: "moderate",
    codeExample: "NACH_Batch: 50,000 Salary Credit Records -> Sent to NPCI Clearing House -> Settled overnight"
  },
  {
    question: "How do Bank Branch SD-WAN routers maintain 99.99% uptime with 4G/5G failover?",
    shortAnswer: "Branch SD-WAN appliances monitor the primary MPLS circuit continuously; if fiber packet loss exceeds 2% or line latency exceeds 150 ms, the router seamlessly steers banking teller sessions over an encrypted 4G/5G cellular IPsec tunnel without dropping teller sessions.",
    explanation: "Ensures rural and suburban bank branches in Ichapur remain fully operational even during fiber roadwork cuts.",
    hint: "Automatically switches branch teller sessions to encrypted 4G/5G if the main fiber line is cut.",
    level: "moderate",
    codeExample: "sdwan.onLinkFailure(MPLS_Primary) => steerToCellularIPsec(Backup_5G_Tunnel);"
  },
  {
    question: "What is SWIFT Customer Security Programme (CSP) and why was it mandated after the Bangladesh Bank cyber heist?",
    shortAnswer: "A mandatory cybersecurity control framework requiring all SWIFT-connected banks to enforce multi-factor authentication, network microsegmentation, local privileged account isolation, and continuous anomaly detection around SWIFT terminals.",
    explanation: "Prevented attackers from using compromised bank operator credentials to send fraudulent international transfer requests.",
    hint: "Mandatory security rules for SWIFT banks to stop credential theft and unauthorized wire transfers.",
    level: "expert",
    codeExample: "SWIFT_CSP_Controls = ['Mandatory MFA on SAG', 'Isolated SWIFT Subnet', 'Endpoint EDR Monitoring'];"
  },
  {
    question: "What is a Financial DDoS Scrubbing Center and how does it protect Internet Banking web portals?",
    shortAnswer: "A high-capacity cloud mitigation network (e.g. Akamai Prolexic, Cloudflare Magic Transit) that diverts incoming traffic during multi-hundred-gigabit DDoS attacks via BGP Anycast, filters out malicious flood packets, and forwards only clean customer banking requests.",
    explanation: "Protects online netbanking portals in Kolkata from being knocked offline by extortionist botnets.",
    hint: "Cloud network that absorbs and filters massive DDoS attacks to keep Internet banking online.",
    level: "expert",
    codeExample: "BGP_DDoS_Scrubbing: Malicious_Flood_500Gbps -> Cloud_Scrubber (Cleaned) -> Bank_Portal (2 Gbps Clean)"
  },
  {
    question: "What is PIN Translation in ATM Interbank Switching?",
    shortAnswer: "The cryptographic process where an acquiring bank's Payment HSM decrypts an incoming ATM PIN block encrypted under the terminal's key (TPK) and re-encrypts it under the interbank Zone Master Key (ZPK) before forwarding it to NPCI/Visa/MasterCard.",
    explanation: "PIN translation occurs strictly inside the HSM hardware silicon, ensuring the cleartext PIN is never exposed in server RAM.",
    hint: "Re-encrypts the ATM PIN block from the local terminal key to the interbank network key inside the HSM.",
    level: "expert",
    codeExample: "hsm.translatePIN({ InKey: 'Terminal_Key', OutKey: 'NPCI_Zone_Key', PINBlock: '0x3A2B' });"
  },
  {
    question: "What is ISO 20022 and how does it modernize financial messaging over legacy ISO 8583 and SWIFT MT formats?",
    shortAnswer: "An XML/JSON-based international financial messaging standard that supports rich structured remittance data, expanded character sets, fraud detection metadata, and universal interoperability across domestic and cross-border payment networks.",
    explanation: "Enables automated anti-money laundering (AML) screening by embedding sender tax IDs, invoice numbers, and ultimate beneficiary identities.",
    hint: "Modern XML-based financial messaging standard carrying rich data for fraud screening and payments.",
    level: "moderate",
    codeExample: "ISO20022_XML: <pacs.008.001.08><GrpHdr><MsgId>WB-2026-08</MsgId></GrpHdr></pacs.008.001.08>"
  },
  {
    question: "What is a Bank Security Operations Center (SOC) and what log telemetry does it monitor?",
    shortAnswer: "A 24/7 monitoring facility that collects real-time event logs from CBS servers, firewalls, payment switches, ATM terminals, and HSMs into a SIEM, using behavioral AI to detect unauthorized database queries, brute force attacks, and anomalous fund movements.",
    explanation: "SOC analysts in Kolkata correlate authentication logs to intercept suspicious after-hours bulk transfers.",
    hint: "24/7 cybersecurity center monitoring bank logs, firewalls, and servers to stop cyber attacks.",
    level: "basic",
    codeExample: "siem.alert() => if (transactionAmount > ₹10,00,000 && userLoginLocation == 'Unknown_Foreign_IP') flagFraud();"
  },
  {
    question: "How does 3D Secure (3DS 2.0) authenticate online card transactions over banking networks?",
    shortAnswer: "A cardholder authentication protocol that transmits over 100 device and merchant contextual data elements (device ID, IP, geolocation, browsing history) to the Issuing Bank's Access Control Server (ACS) for frictionless risk analysis, requesting an SMS/App OTP only for high-risk transactions.",
    explanation: "3DS 2.0 drastically reduces checkout abandonment while defeating fraudulent online credit card usage.",
    hint: "Authenticates online card purchases using device fingerprinting and OTP verification.",
    level: "moderate",
    codeExample: "3DS_Engine: if (riskScore < 10) approveFrictionless(); else promptForBankOTP();"
  },
  {
    question: "What is Banking WAN Traffic Prioritization (QoS) and why does Core Banking (CBS) take precedence over general internet browsing?",
    shortAnswer: "Quality of Service (QoS) assigns DSCP Expedited Forwarding (EF / DSCP 46) to interactive Finacle/BaNCS teller packets and VoIP audio, ensuring bank teller transactions never experience queue delay even if employees are downloading large training videos.",
    explanation: "Guarantees that customer deposits at teller counters in Barrackpore execute within sub-second response times.",
    hint: "QoS prioritizes core banking teller traffic over general office downloads on the network.",
    level: "moderate",
    codeExample: "qos-policy: priority-queue CBS_Finacle_Class bandwidth percent 60"
  },
  {
    question: "What is a Micro-ATM / AePS (Aadhaar Enabled Payment System) Terminal and how does it connect to banks?",
    shortAnswer: "A handheld biometric POS device used by Business Correspondents in rural areas, capturing fingerprint/iris biometrics, encrypting data with AES-256 inside a Secure Element, and routing requests over cellular 4G to UIDAI and NPCI for cash withdrawal and deposit.",
    explanation: "Brings doorstep banking to remote villages across West Bengal without requiring physical brick-and-mortar bank branches.",
    hint: "Handheld biometric terminal allowing rural villagers to withdraw cash using Aadhaar fingerprints.",
    level: "basic",
    codeExample: "AePS_Transaction: MicroATM -> Encrypted_Biometric_Payload -> UIDAI_Auth -> NPCI_Switch -> CBS_Ledger"
  },
  {
    question: "What is a Bank DMZ Reverse Proxy and why are Direct Database Connections blocked from Mobile Banking Apps?",
    shortAnswer: "Mobile banking apps connect strictly to an API Gateway / Reverse Proxy in the DMZ; the API Gateway authenticates the user, validates JSON input for SQL injection, and calls internal microservices, preventing direct Internet exposure to the master SQL ledger.",
    explanation: "Direct Internet connections to core bank databases are an intolerable risk that violates banking regulatory mandates.",
    hint: "Stops mobile apps from touching the database directly by terminating connections in a screened DMZ proxy.",
    level: "expert",
    codeExample: "MobileApp -> (TLS 1.3 + App_Cert) -> DMZ_API_Gateway -> (Private RPC) -> Core_Banking_DB"
  },
  {
    question: "What is Fraud Management System (FMS) Real-Time Scoring in banking payment switches?",
    shortAnswer: "An AI/ML-driven analytics engine running inline with payment switches that inspects each transaction's velocity, geolocation, device fingerprint, and historical spending patterns within 50 milliseconds, blocking suspicious card swipes before authorization.",
    explanation: "If a card is swiped in Kolkata and then used in London 10 minutes later, the FMS flags a geographical impossibility and declines the transaction.",
    hint: "AI engine that scores transaction fraud risk within 50ms to block stolen cards instantly.",
    level: "expert",
    codeExample: "fms.scoreTransaction(tx) => if (tx.velocityViolated || tx.geoImpossible) declineTransaction();"
  },
  {
    question: "What is Out-of-Band SMS / Push OTP Gateway architecture in Banking?",
    shortAnswer: "A secondary, independent communication channel where the banking core generates a time-based One-Time Password (TOTP) and dispatches it over telecom SS7/SMPP SMS or encrypted mobile push notifications to verify high-value transactions.",
    explanation: "Even if an attacker compromises a user's web browser session, they cannot authorize a money transfer without the out-of-band mobile OTP.",
    hint: "Sends transaction verification codes through a separate mobile SMS channel for two-factor security.",
    level: "basic",
    codeExample: "OTP_Gateway: generateTOTP(6Digits) -> SMPP_Telecom_Link -> User_Mobile (Valid 3 mins)"
  },
  {
    question: "What is Data Leakage Prevention (DLP) on Core Banking Workstations?",
    shortAnswer: "Endpoint and network agents that block bank teller workstations from copying customer account numbers, balances, or KYC documents to USB drives, personal emails, or unauthorized network printers.",
    explanation: "Protects bank customer privacy and prevents rogue bank employees from stealing account databases in Barrackpore.",
    hint: "Blocks bank teller computers from copying sensitive customer data to USBs or personal emails.",
    level: "moderate",
    codeExample: "dlp.monitorEndpoint() => if (fileContains16DigitPAN && destination == 'USB') blockAndAlertCompliance();"
  },
  {
    question: "What is Over-the-Air (OTA) Key Management in POS Terminals?",
    shortAnswer: "A cryptographic protocol (e.g. DUKPT - Derived Unique Key Per Transaction) where POS terminals automatically derive a brand-new, non-reusable encryption key for every single card transaction, ensuring that compromise of one key reveals no other transaction data.",
    explanation: "DUKPT eliminates the danger of an attacker sniffing keys from retail POS machines in shopping malls across Kolkata.",
    hint: "Derives a brand-new encryption key for every single card transaction (DUKPT).",
    level: "expert",
    codeExample: "DUKPT: BaseDerivationKey + CurrentTransactionCounter -> Unique_Session_Key_Per_Swipe"
  },
  {
    question: "What is the role of National Financial Switch (NFS) operated by NPCI?",
    shortAnswer: "NFS is India's largest interconnected network of automated teller machines (ATMs), routing interbank ATM cash withdrawal, balance inquiry, and mini-statement transactions seamlessly across all commercial and cooperative banks nationwide.",
    explanation: "Allows an SBI account holder to withdraw cash from an HDFC Bank ATM anywhere in West Bengal.",
    hint: "NPCI network that connects all ATMs in India so you can use any bank's ATM card anywhere.",
    level: "basic",
    codeExample: "NFS_Routing: SBI_Card_at_HDFC_ATM -> HDFC_Switch -> NPCI_NFS -> SBI_Core_Bank -> Approved"
  },
  {
    question: "What is Endpoint Detection and Response (EDR) on Banking Teller Terminals?",
    shortAnswer: "Advanced endpoint security software that continuously monitors kernel behavior, memory injections, and process execution on bank teller PCs, instantly isolating any terminal that displays ransomware or keylogger activity.",
    explanation: "Prevents malware on a teller computer in Ichapur from executing credential harvesting tools.",
    hint: "Monitors bank teller computers in real time to isolate ransomware and malware instantly.",
    level: "moderate",
    codeExample: "edr.onAnomalousProcess('mimikatz.exe') => killProcess() && isolateHostFromNetwork();"
  },
  {
    question: "What is Redundant Optical Fiber Path Diversity in Banking WAN Architecture?",
    shortAnswer: "Connecting a bank data center to the core network via two physical fiber cables that take completely separate physical underground geographic paths (e.g. North Route and South Route), ensuring that a single backhoe dig cannot sever both links simultaneously.",
    explanation: "Guarantees that fiber cuts along Grand Trunk Road in Barrackpore do not take the bank data center offline.",
    hint: "Routing two backup fiber cables along completely different physical roads to survive cable cuts.",
    level: "expert",
    codeExample: "PathDiversity = { PrimaryLink: 'Route A via GT Road', BackupLink: 'Route B via Expressway' };"
  },
  {
    question: "What is the ultimate golden rule for designing, operating, and securing Banking & Financial Networks?",
    shortAnswer: "'Enforce strict PCI-DSS CDE network segmentation; protect all PINs and encryption keys inside tamper-proof Hardware Security Modules (HSM); mandate Mutual TLS (mTLS) for payment switch APIs and NPCI/UPI gateways; deploy zero-trust SD-WAN with 4G/5G failover; and budget financial infrastructure in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes regulatory compliance, hardware cryptography, payment switch interoperability, WAN high availability, and financial procurement budgeting.",
    hint: "PCI-DSS segmentation + Payment HSMs + mTLS payment APIs + Zero-trust SD-WAN + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: SegmentCardholderCDE() -> DeployPaymentHSMs() -> Enforce_mTLS_PaymentAPIs() -> BuildZeroTrustSDWAN() -> BudgetInRupees(₹);"
  }
];

export default questions;
