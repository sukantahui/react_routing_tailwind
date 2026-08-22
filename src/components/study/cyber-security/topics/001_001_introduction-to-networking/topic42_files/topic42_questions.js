// topic42_questions.js
// 30 Moderate to Expert Questions on Networking in Government, NICNET, SWAN, National Data Centers, and Public Cyber Security

const questions = [
  {
    question: "What is NICNET and what role does it play in Indian Government administration?",
    shortAnswer: "NICNET is the nationwide satellite and terrestrial fiber communication network established by the National Informatics Centre (NIC) that connects central ministries, state secretariats, and over 700 district collectorates across India.",
    explanation: "NICNET provides the foundational intranet backbone for national e-governance applications like e-Office, Public Financial Management System (PFMS), and electoral roll processing.",
    hint: "Nationwide government communication network connecting central ministries and district collectorates.",
    level: "basic",
    codeExample: "NICNET_Topology = { Scope: 'All Indian Districts & Ministries', Transport: 'Terrestrial Fiber + VSAT', Purpose: 'E-Governance' };"
  },
  {
    question: "What is a State Wide Area Network (SWAN) in Indian e-governance architecture?",
    shortAnswer: "A dedicated Closed User Group (CUG) IP-based network that provides vertical high-speed voice, video, and data connectivity from State Headquarters (SHQ) down to District Headquarters (DHQ) and Block Headquarters (BHQ).",
    explanation: "West Bengal SWAN (WBSWAN) links district magistrates in Barrackpore and block development offices (BDOs) directly to the Nabanna State Secretariat in Kolkata.",
    hint: "Government network connecting State HQ to District HQ and Block Development Offices.",
    level: "basic",
    codeExample: "WBSWAN_Hierarchy = ['State HQ (Nabanna)', 'District HQ (Barasat)', 'Block HQ (Barrackpore-I)', 'Gram Panchayat'];"
  },
  {
    question: "What is BharatNet and how does it extend optical broadband to rural Gram Panchayats?",
    shortAnswer: "BharatNet is the world's largest rural optical fiber network project, connecting over 250,000 Gram Panchayats across India with gigabit-capable optical line terminals (GPON) to deliver digital citizen services.",
    explanation: "Enables rural citizens in Bengal villages to apply for land records (Banglarbhumi), birth certificates, and welfare pensions locally.",
    hint: "National rural fiber project connecting 250,000 Gram Panchayats across India.",
    level: "moderate",
    codeExample: "BharatNet_Node: Block_OLT --Underground_Fiber_Splitter--> Gram_Panchayat_ONT (100 Mbps Broadband)"
  },
  {
    question: "How does the UIDAI Aadhaar Biometric Authentication Gateway secure citizen identity verifications?",
    shortAnswer: "Biometric fingerprints/iris scans are captured by STQC-certified biometric sensors, encrypted with UIDAI's 2048-bit public key directly inside the hardware sensor, and transmitted over Mutual TLS (mTLS) to UIDAI Central Identity Data Repositories (CIDR).",
    explanation: "This ensures citizen biometric data is never exposed in cleartext on intermediate telecommunication links or application server memory.",
    hint: "Encrypts biometrics with UIDAI public key inside the physical sensor and sends over mTLS.",
    level: "expert",
    codeExample: "AadhaarAuth: CaptureBiometric() -> EncryptWithUIDAIKey() -> TransmitOver_mTLS() -> CIDR_Verified(Yes/No)"
  },
  {
    question: "What is a State Data Center (SDC) and MeghRaj (GI Cloud)?",
    shortAnswer: "An SDC is a centralized Tier-III government facility hosting state portal databases and applications; MeghRaj is the Government of India Cloud initiative providing scalable infrastructure-as-a-service (IaaS) for public digital services.",
    explanation: "Houses land registry databases, e-District services, and municipal tax portals in a high-security, sovereign data facility in Kolkata.",
    hint: "Central government data center hosting state citizen portals and public databases under MeghRaj cloud.",
    level: "moderate",
    codeExample: "MeghRaj_Cloud = { Architecture: 'Sovereign Government Cloud', Compliance: 'Tier-III / CERT-In Audited' };"
  },
  {
    question: "What is an Air-Gapped Defense Network (e.g. Army ASCON / AFNET)?",
    shortAnswer: "A military communication network physically isolated with zero routing or wireless links to the public Internet, utilizing dedicated underground optical fiber and troposcatter links with sovereign hardware encryption for classified defense operations.",
    explanation: "Guarantees that cyber adversaries on the global Internet cannot remotely breach or disrupt military command-and-control systems.",
    hint: "Physically isolated military network with zero Internet connections for secure defense operations.",
    level: "expert",
    codeExample: "Defense_Network: PhysicalAirGap = true; InternetConnectivity = 0; HardwareCrypto = Sovereign_Type1;"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a District Collectorate Dual-Homed SWAN Router & Next-Gen Firewall Stack?",
    shortAnswer: "Approximately ₹1,85,000 to ₹4,20,000 (including dual gigabit router with MPLS/4G failover, Layer 7 UTM firewall, and 3-year government support contracts).",
    explanation: "District collectorates require high-availability routing and robust intrusion prevention in ₹ budgets.",
    hint: "District SWAN router and firewall stack costs ₹1,85,000 – ₹4,20,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "District_SWAN_Stack_Cost = ₹2,75,000; // Dual-WAN Gigabit Router + Next-Gen Firewall with UTM"
  },
  {
    question: "What role does NCIIPC (National Critical Information Infrastructure Protection Centre) play in Indian cybersecurity?",
    shortAnswer: "NCIIPC is the national agency designated under the Information Technology Act (Section 70A) to protect India's Critical Information Infrastructure (Power, Banking, Telecom, Transport, Government, Strategic Enterprises) from cyber warfare.",
    explanation: "Issues mandatory cybersecurity threat advisories and conducts vulnerability audits across critical power grid and government installations.",
    hint: "National agency protecting India's critical power grids, banking, and government networks.",
    level: "basic",
    codeExample: "NCIIPC_Sectors = ['Power & Energy', 'Banking & Finance', 'Telecom', 'Transport', 'Strategic Government'];"
  },
  {
    question: "What is CERT-In (Indian Computer Emergency Response Team) and what is the 6-hour cyber incident reporting rule?",
    shortAnswer: "CERT-In is the national nodal agency for responding to computer security incidents; under its 2022 cybersecurity directives, all government and enterprise entities must report mandatory cyber security incidents to CERT-In within 6 hours of discovery.",
    explanation: "Enables rapid national threat correlation and containment across government ministries and public service providers.",
    hint: "National cybersecurity agency requiring organizations to report cyber attacks within 6 hours.",
    level: "moderate",
    codeExample: "CERTIn_Directive: if (incidentDetected) notifyCERTIn(IncidentDetails, withinHours = 6);"
  },
  {
    question: "How do Government E-Procurement Portals (e.g. GeM) protect public tender bids from tampering?",
    shortAnswer: "Bidders sign all tender documents using Class-3 Digital Signature Certificates (DSC - X.509 PKI); tender pricing is encrypted with the Departmental Public Key and can only be decrypted when the tender officially opens with multi-officer keys.",
    explanation: "Prevents corrupt officials or rival contractors from viewing or modifying submitted bids before the legal opening deadline.",
    hint: "Uses Class-3 Digital Signatures and encrypted tender vaults that open only at the official deadline.",
    level: "expert",
    codeExample: "TenderSubmission: BidData.signWithDSC(VendorPrivateKey) -> EncryptWithDeptKey() -> StoredInTenderVault"
  },
  {
    question: "What is an Advanced Persistent Threat (APT) targeting government ministries and how is it mitigated?",
    shortAnswer: "A highly sophisticated, state-sponsored cyber espionage group (e.g. APT41, Lazarus) that uses zero-day exploits and spear-phishing to establish long-term persistence inside government networks; mitigated by Cyber Swachhta Kendra tools, strict egress proxies, and EDR.",
    explanation: "Security teams in Kolkata deploy behavioral anomaly detection to intercept covert data exfiltration attempts to foreign command-and-control servers.",
    hint: "State-sponsored hacking groups targeting government data; mitigated with EDR and threat intelligence.",
    level: "expert",
    codeExample: "APT_Defense = ['Zero Trust Egress Filtering', 'Endpoint EDR Isolation', 'Cyber Swachhta Kendra Feeds'];"
  },
  {
    question: "What is DigiLocker OAuth 2.0 API Integration for Citizen Document Verification?",
    shortAnswer: "A secure digital document ecosystem where government departments issue and verify digitally signed certificates (driver's licenses, marksheets, vehicle registration) via RESTful OAuth 2.0 APIs, eliminating physical paper fraud.",
    explanation: "When Susmita applies for a government scheme in Ichapur, the portal verifies her Aadhaar and college marksheets directly from DigiLocker.",
    hint: "OAuth 2.0 digital repository allowing citizens to share digitally signed government documents online.",
    level: "basic",
    codeExample: "DigiLocker_API: /oauth/token -> BearerToken -> /api/documents/fetchURI -> Returns Digitally Signed PDF"
  },
  {
    question: "What is SCADA Network Isolation in Government Power Grids and Water Treatment Plants?",
    shortAnswer: "Isolating industrial Supervisory Control and Data Acquisition (SCADA) networks (communicating over IEC 60870-5-104 or Modbus TCP) behind unidirectional data diodes, allowing operational data to export out while blocking any inbound cyber commands.",
    explanation: "Data diodes use physical light-emitting diodes (LEDs) and optical receivers to physically guarantee that data flows in only one direction.",
    hint: "Uses physical data diodes to let power grid data flow out while physically blocking any inbound cyber attacks.",
    level: "expert",
    codeExample: "DataDiode: PowerGrid_SCADA --Fiber_Tx_Only (One-Way)--> Government_Monitoring_Center"
  },
  {
    question: "What is an E-Office Network in Government Secretariats and why is PKI Digital Signing mandatory?",
    shortAnswer: "A workflow automation system developed by NIC that replaces physical paper files with electronic movement of government files; every file note and approval is cryptographically signed using a USB Token DSC, creating an immutable legal audit trail.",
    explanation: "Used across all ministries in Nabanna (Kolkata) to eliminate lost physical files and accelerate citizen welfare file clearances.",
    hint: "Replaces paper files in government offices with digitally signed electronic notes using USB crypto tokens.",
    level: "basic",
    codeExample: "eOffice_Approval: FileNote -> SignedWithUSBToken(OfficerDSC) -> CryptographicSignatureAttached -> Approved"
  },
  {
    question: "What is Geo-Fencing (IP Whitelisting) for National Government Web Portals?",
    shortAnswer: "A perimeter firewall policy that restricts administrative portal logins strictly to IP addresses located within India (IN Geo-IP pool), blocking foreign IP ranges from reaching backend government administrative interfaces.",
    explanation: "Prevents automated brute-force attacks from foreign botnets targeting municipal tax portals in Barrackpore.",
    hint: "Blocks foreign countries from accessing government login portals, allowing only Indian IP addresses.",
    level: "moderate",
    codeExample: "firewall.rule: if (request.country != 'IN') dropPacket(); // Geo-fencing government portals"
  },
  {
    question: "What is a Redundant BGP Multi-Homing Setup for National Portal High Availability?",
    shortAnswer: "Connecting government data centers to two national telecom carriers (e.g. BSNL and RailTel) with autonomous system BGP peering, ensuring uninterrupted citizen access to passport and tax filing portals during major fiber cuts.",
    explanation: "Guarantees 99.999% uptime for national citizen portals handling millions of daily applications.",
    hint: "Dual-carrier BGP peering with BSNL and RailTel to ensure government websites never go down.",
    level: "moderate",
    codeExample: "router bgp 55824\n  neighbor BSNL_Peer remote-as 9829\n  neighbor RailTel_Peer remote-as 24186 // Dual Gov Uplink"
  },
  {
    question: "What is Cyber Swachhta Kendra (Botnet Cleaning and Malware Analysis Centre)?",
    shortAnswer: "A national cybersecurity initiative operated by CERT-In that detects botnet infections across Indian IP addresses and provides citizens and government departments with automated tools and advisories to clean infected machines.",
    explanation: "Helps district offices across West Bengal identify and clean infected computers before malware can steal confidential government records.",
    hint: "National CERT-In center that detects botnet infections and helps clean government and citizen computers.",
    level: "basic",
    codeExample: "CSK_Service: Scans national IP subnets -> Alerts District IT Admin of Botnet Infection -> Provides Cleaning Tool"
  },
  {
    question: "What is Data Loss Prevention (DLP) and USB Device Blocking on Civil Secretariat Terminals?",
    shortAnswer: "Endpoint security software deployed on all government office PCs that physically disables USB mass storage ports and blocks copying confidential cabinet files to personal email or unauthorized external drives.",
    explanation: "Prevents insider leaks of budget speeches or sensitive policy documents in Kolkata secretariats.",
    hint: "Disables USB ports on government computers to prevent confidential files from being stolen.",
    level: "basic",
    codeExample: "GPO_Policy: Set 'RemovableStorageDevices: Deny_All_Access' = Enabled; Block Outbound File Uploads;"
  },
  {
    question: "What is a Government Citizen Service Centre (CSC) Network?",
    shortAnswer: "A network of physical digital access kiosks across rural villages operated by Village Level Entrepreneurs (VLEs), connected to BharatNet to deliver government services (pension, PAN card, Aadhaar update, utility bill payment).",
    explanation: "Eliminates the need for rural villagers in Bengal to travel long distances to district government offices.",
    hint: "Village digital centers connected to BharatNet delivering government services to rural citizens.",
    level: "basic",
    codeExample: "CSC_Kiosk: Village_Citizen -> CSC_Portal -> BharatNet_Uplink -> SDC_Government_Server -> Service_Delivered"
  },
  {
    question: "What is an Air-Quality & Environmental IoT Monitoring Network in Smart Cities?",
    shortAnswer: "A municipal sensor network deploying LoRaWAN or cellular NB-IoT sensors across urban streetlights in Kolkata, transmitting real-time PM2.5, PM10, noise, and humidity telemetry back to the State Pollution Control Board server.",
    explanation: "Provides real-time environmental data to trigger public health advisories and pollution control measures.",
    hint: "Municipal IoT sensor network monitoring air quality and pollution levels in real time.",
    level: "moderate",
    codeExample: "LoRaWAN_Payload: { DevEUI: '0x70B3D57ED001ABCD', PM2_5: 42.5, PM10: 88.2, AQI: 'Moderate' };"
  },
  {
    question: "What is Out-of-Band (OOB) Emergency Satellite Communication (VSAT) for Disaster Management?",
    shortAnswer: "Portable satellite communication terminals (Ku/Ka-band VSAT) deployed by the National Disaster Response Force (NDRF) during cyclones or floods when terrestrial optical fiber and cellular towers are completely wiped out.",
    explanation: "Restores vital voice, video, and medical coordination channels in coastal Bengal during severe storm emergencies.",
    hint: "Emergency satellite dishes deployed during cyclones when mobile towers and fiber cables are destroyed.",
    level: "moderate",
    codeExample: "NDRF_VSAT: Portable_Satellite_Dish -> ISRO_GSAT_Transponder -> Emergency_National_Command_Center"
  },
  {
    question: "What is a Lawful Interception Monitoring (LIM) System in Government Telecom Regulation?",
    shortAnswer: "A strictly regulated, court-authorized hardware interface installed at ISP/telecom core networks (under Indian Telegraph Act) that allows authorized national security agencies to intercept targeted communications with strict cryptographic auditing.",
    explanation: "Used exclusively under legal warrant to investigate terrorist threats and severe national security offenses.",
    hint: "Court-authorized hardware monitoring interface at telecom cores for national security investigations.",
    level: "expert",
    codeExample: "LIM_Gateway: WarrantVerified(CourtID) -> MirrorTargetSession(TargetIP) -> Encrypted_Security_Agency_Feed"
  },
  {
    question: "What is Role-Based Access Control (RBAC) in Land Record Portals (e.g. Banglarbhumi)?",
    shortAnswer: "A security framework where Block Land Reform Officers (BL&LRO) have approval rights, Revenue Inspectors have verification rights, and citizens have read-only view rights, ensuring no unauthorized alteration of land ownership records.",
    explanation: "Protects land records from fraudulent property transfers and unauthorized ownership modifications in West Bengal.",
    hint: "Restricts who can edit or view land records based on their official government job title.",
    level: "basic",
    codeExample: "RBAC_Rule: if (user.role == 'BLLO_Officer') allow(ApproveMutation); else allow(ViewRecordOnly);"
  },
  {
    question: "What is Virtual Desktop Infrastructure (VDI) in Government Data Centers?",
    shortAnswer: "Centralizing government employee desktop operating systems on server clusters in the State Data Center, streaming encrypted screen pixels to low-cost thin-clients at district desks with zero local data storage.",
    explanation: "Prevents confidential files from ever being stored on physical local hard drives in district offices in Ichapur.",
    hint: "Runs government computer desktops on central data center servers, streaming screens to cheap thin-clients.",
    level: "moderate",
    codeExample: "VDI_Client: ThinClient_Desk -> Encrypted_PCoIP_Stream -> Virtual_Desktop_State_Data_Center"
  },
  {
    question: "What is a Sovereign Encryption Key Management Facility in Government Networks?",
    shortAnswer: "A dedicated national cryptographic facility that generates, escrow-manages, and audits sovereign cryptographic root certificates (Root Certifying Authority of India - CCA) used for all citizen identity tokens and national defense systems.",
    explanation: "Ensures national encryption algorithms and root trust anchors remain completely sovereign and free from foreign backdoors.",
    hint: "National facility managing sovereign root encryption keys for government and citizen security.",
    level: "expert",
    codeExample: "CCA_Root: Signs National Intermediate CAs -> Manages Digital Signature Infrastructure (PKI)"
  },
  {
    question: "What is Unified Emergency Response Support System (ERSS - Dial 112) Network Architecture?",
    shortAnswer: "A centralized voice, SMS, and panic-button routing network that receives citizen emergency calls, automatically identifies caller GPS geolocation from telecom cell towers, and dispatches the nearest police or ambulance vehicle in under 3 minutes.",
    explanation: "Consolidates police (100), fire (101), and ambulance (102) into a single unified emergency network in West Bengal.",
    hint: "Unified emergency 112 network that pinpoints caller GPS location and dispatches nearest police/ambulance.",
    level: "basic",
    codeExample: "ERSS_112: CitizenCall -> Telecom_Gateway (GPS_Location) -> Emergency_CAD_Server -> Dispatches_Nearest_PCR_Van"
  },
  {
    question: "What is DNSSEC Deployment on Government Apex Domains (.gov.in)?",
    shortAnswer: "Cryptographically signing the `.gov.in` top-level domain zone with public-key digital signatures (RRSIG, DNSKEY) to prevent DNS spoofing and ensure citizens connecting to government websites are never redirected to fake clone portals.",
    explanation: "Guarantees that when citizens navigate to `wb.gov.in`, the returned IP address is authentic and untampered.",
    hint: "Adds cryptographic signatures to .gov.in domains to stop hackers from creating fake government clone sites.",
    level: "moderate",
    codeExample: "DNSSEC_Validation: Query('wb.gov.in') -> Verifies RRSIG with Root .gov.in DNSKEY -> Validated Authentic"
  },
  {
    question: "What is Municipal E-Challan Smart Traffic Violation Processing?",
    shortAnswer: "Automated Number Plate Recognition (ANPR) cameras capture speeding/red-light traffic violations, query the central Vahan vehicle registration database over encrypted fiber, and dispatch an SMS fine challan to the owner's phone within 60 seconds.",
    explanation: "Automates traffic enforcement and eliminates manual traffic fine corruption in Kolkata and Barrackpore.",
    hint: "ANPR cameras read license plates, query vehicle databases, and send digital traffic fine SMS automatically.",
    level: "basic",
    codeExample: "ANPR_Camera -> VehiclePlate('WB02AB1234') -> Vahan_DB -> Generates_EChallan(₹500) -> Sends_SMS"
  },
  {
    question: "What is an Immutable WORM Backup for National Identity Vaults?",
    shortAnswer: "Storing citizen demographic records on Write Once Read Many (WORM) storage media where records cannot be overwritten, modified, or deleted by any user or administrator for a legal retention period of 10+ years.",
    explanation: "Guarantees that even a rogue insider administrator with root privileges cannot destroy or alter citizen registry records.",
    hint: "Write Once Read Many storage where identity records can never be altered or deleted by anyone.",
    level: "expert",
    codeExample: "WORM_Storage: S3_ObjectLock(ComplianceMode = true, RetentionPeriod = '10 Years') // Immutable"
  },
  {
    question: "What is the ultimate golden rule for architecting, governing, and securing Government E-Governance Networks?",
    shortAnswer: "'Enforce vertical SWAN/BharatNet connectivity with redundant NKN/BSNL uplinks; protect citizen identity with Aadhaar mTLS and PKI digital signatures; isolate Critical Information Infrastructure (CII) behind physical data diodes and NCIIPC guidelines; mandate USB blocking with EDR; and budget e-governance infrastructure in Indian Rupees (₹)!'",
    explanation: "This complete rule captures national infrastructure hierarchy, cryptographic citizen privacy, critical infrastructure protection, sovereign security compliance, and financial budgeting.",
    hint: "SWAN/BharatNet + Aadhaar mTLS + NCIIPC data diodes + USB blocking EDR + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DeploySWAN_BharatNet() -> Enforce_mTLS_PKI() -> ProtectCII_DataDiodes() -> BlockUSB_EDR() -> BudgetInRupees(₹);"
  }
];

export default questions;
