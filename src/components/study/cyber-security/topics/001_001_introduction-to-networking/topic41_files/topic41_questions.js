// topic41_questions.js
// 30 Moderate to Expert Questions on Networking in Healthcare, Medical IoT (IoMT), DICOM/PACS, and Clinical Cyber Security

const questions = [
  {
    question: "What is the DICOM protocol in medical networking and what port does it use?",
    shortAnswer: "DICOM (Digital Imaging and Communications in Medicine) is the global standard protocol for transmitting, storing, and sharing medical images (X-rays, MRI, CT scans) between imaging modalities and PACS servers over TCP Port 104.",
    explanation: "DICOM packages high-resolution uncompressed diagnostic pixel data with patient metadata headers (name, age, study ID).",
    hint: "Global standard for transmitting MRI and X-ray medical images over TCP Port 104.",
    level: "basic",
    codeExample: "DICOM_Service = { Protocol: 'DICOM C-STORE', Port: 104, Transport: 'TCP', Data: '500MB 3D CT Scan' };"
  },
  {
    question: "What is a Picture Archiving and Communication System (PACS) in hospital networks?",
    shortAnswer: "A centralized medical imaging storage and retrieval system that stores multi-terabyte radiological examinations and serves them over 10G/40G hospital networks to doctor diagnostic workstations at high speeds.",
    explanation: "PACS integrates with Hospital Information Systems (HIS) and Radiology Information Systems (RIS) for seamless diagnostic workflows.",
    hint: "Central storage system for hospital X-rays and MRI scans accessible to doctors.",
    level: "basic",
    codeExample: "PACS_Storage = { Architecture: '10G SAN Storage Array', Capacity: '120 TB', MTU: 9000 /* Jumbo Frames */ };"
  },
  {
    question: "What is HL7 (Health Level Seven) and FHIR (Fast Healthcare Interoperability Resources)?",
    shortAnswer: "HL7 defines legacy pipe-delimited clinical messaging standards (HL7 v2/v3); FHIR is the modern RESTful JSON/XML API standard over HTTPS (Port 443) used to exchange patient vitals, lab reports, and electronic health records (EHR).",
    explanation: "FHIR enables mobile health apps in Kolkata to securely pull lab test results from hospital databases via authenticated REST APIs.",
    hint: "Modern JSON-based RESTful API standard for exchanging patient health records and lab results.",
    level: "moderate",
    codeExample: "FHIR_Resource = { resourceType: 'Observation', status: 'final', code: 'HeartRate', valueQuantity: { value: 72, unit: 'bpm' } };"
  },
  {
    question: "Why is Medical IoT (IoMT) Device Network Segmentation mandatory in modern hospitals?",
    shortAnswer: "Many life-critical medical devices (infusion pumps, ventilators, anesthesia machines) run legacy embedded operating systems that cannot be patched; placing them in isolated VLANs prevents malware from infecting them or using them as attack pivots.",
    explanation: "Segmentation ensures that a phishing malware infection on a hospital billing computer cannot reach ICU patient ventilators in Ichapur.",
    hint: "Isolates unpatchable medical equipment (ventilators, pumps) into secure private VLANs.",
    level: "expert",
    codeExample: "Firewall_Rule: Block All Ingress -> ICU_Ventilator_VLAN (VLAN 50) except Authorized Monitoring Station Port 8443;"
  },
  {
    question: "What is Medjack (Medical Device Hijacking) in healthcare cybersecurity?",
    shortAnswer: "A cyber attack technique where hackers target unpatched vulnerabilities in connected hospital medical hardware (MRI consoles, blood gas analyzers) to install backdoors and silently pivot into core patient databases.",
    explanation: "Attackers exploit medical hardware because hospitals rarely restart or patch active life-support equipment.",
    hint: "Hacking unpatched hospital devices like MRI scanners to steal patient databases.",
    level: "expert",
    codeExample: "MedjackVector: Unpatched_Blood_Analyzer -> Exploited_Over_Port_445 -> Lateral_Movement -> Patient_EHR_Database"
  },
  {
    question: "How do 5G Connected Smart Ambulances transmit real-time patient telemetry to Hospital Emergency Rooms (ER)?",
    shortAnswer: "Equipped with ruggedized 5G multi-SIM routers, smart ambulances stream continuous 12-lead ECG waveforms, ultrasound video, and patient vitals directly to the hospital trauma center over encrypted IPsec tunnels with sub-15ms latency.",
    explanation: "Enables ER trauma surgeons in Kolkata to prepare operating rooms and review patient cardiology data before the ambulance arrives.",
    hint: "Uses 5G cellular IPsec tunnels to stream live ECG and patient vitals to the ER before arrival.",
    level: "moderate",
    codeExample: "Ambulance_5G = { Uplink: '5G Cellular Bonded Router', Stream: '12-Lead ECG + HD Video', Latency: '12 ms' };"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a Hospital PACS Imaging Storage Network & 10G SAN Switch Stack?",
    shortAnswer: "Approximately ₹4,50,000 to ₹18,00,000 (including dual 10G SFP+ managed switches, NVMe storage arrays, and DICOM routing licenses) depending on hospital imaging volume.",
    explanation: "High-throughput PACS networks require redundant 10G optical links and jumbo frame support in ₹ budgets.",
    hint: "Hospital PACS imaging network costs ₹4,50,000 – ₹18,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "PACS_Network_Cost = ₹8,50,000; // Dual 10G Managed Switches + 80TB RAID-6 SAN Storage Array"
  },
  {
    question: "What is the role of Jumbo Frames (MTU 9000) in hospital radiological PACS networks?",
    shortAnswer: "Jumbo Frames expand the Maximum Transmission Unit from 1500 to 9000 bytes, reducing packet fragmentation and CPU interrupt overhead by over 80% when transferring massive 2GB 3D CT scan datasets across diagnostic workstations.",
    explanation: "Accelerates doctor image loading times from 35 seconds down to 4 seconds during emergency stroke evaluations.",
    hint: "Enables 9000-byte packets to transfer huge MRI and CT scans across hospital networks fast.",
    level: "expert",
    codeExample: "interface GigabitEthernet0/1\n  mtu 9000 // Enables Jumbo Frames on PACS Storage Ports"
  },
  {
    question: "What is a Clinical Mobile Cart Wi-Fi Fast-Roaming (802.11r / 802.11k) architecture?",
    shortAnswer: "A wireless protocol configuration that allows mobile nurse workstations and telemetry carts to transition seamlessly between hospital corridor Wi-Fi APs in under 50 milliseconds without dropping active EHR patient charting sessions.",
    explanation: "Without 802.11r fast-roaming, nurses walking between hospital wards in Barrackpore experience session timeouts and data re-entry delays.",
    hint: "Allows mobile hospital computer carts to roam between Wi-Fi APs in under 50ms without disconnecting.",
    level: "moderate",
    codeExample: "wlan Campus-Clinical\n  ft-over-the-air // Enables 802.11r Fast BSS Transition for zero-drop roaming"
  },
  {
    question: "How does the AIIMS Delhi Cyber Attack (2022) serve as a landmark case study in healthcare ransomware defense?",
    shortAnswer: "Attackers exploited unsegmented network bridges to deploy ransomware that encrypted over 1 terabyte of patient records across 200 servers; recovery required complete network rebuild, air-gapped immutable backup restoration, and endpoint EDR isolation.",
    explanation: "Emphasized the critical necessity of strict VLAN microsegmentation, zero-trust network access, and isolated offline backups.",
    hint: "Landmark hospital ransomware incident highlighting the need for network segmentation and offline backups.",
    level: "basic",
    codeExample: "AIIMS_Defense_Lesson = ['Enforce Strict VLAN Segmentation', 'Immutable Offline Backups', 'Zero Trust ZTNA'];"
  },
  {
    question: "What is HIPAA (Health Insurance Portability and Accountability Act) & Indian DISHA Security Rule for network data?",
    shortAnswer: "Regulations requiring that all Electronic Protected Health Information (ePHI) be encrypted with AES-256 at rest and in transit across all internal networks, backed by strict role-based access control (RBAC) and immutable audit logging.",
    explanation: "Penalizes healthcare providers heavily if unencrypted patient medical diagnoses are leaked over open networks.",
    hint: "Healthcare privacy law requiring AES-256 encryption for all patient health records in transit.",
    level: "basic",
    codeExample: "Compliance: ePHI_Data.encrypt(Algorithm.AES_256_GCM); LogAuditAccess(doctorID, patientRecordID);"
  },
  {
    question: "What is Da Vinci Robotic Surgery Network Architecture and what latency threshold is required?",
    shortAnswer: "A specialized surgical network connecting surgeon control consoles to robotic patient-side arms, requiring deterministic, ultra-low latency (< 10 ms RTT) and zero packet loss over dual redundant fiber links to guarantee precise surgical movements.",
    explanation: "Even a 50ms network jitter spike during microscopic vascular surgery could cause critical instrument overshoot.",
    hint: "Requires sub-10ms latency and dual redundant optical fiber links for surgical robot precision.",
    level: "expert",
    codeExample: "Surgical_Network = { Redundancy: 'Active-Active Dual Fiber', MaxLatency: '< 8 ms', Jitter: '< 1 ms' };"
  },
  {
    question: "What is Deep Packet Inspection (DPI) for Medical Protocol Anomaly Detection?",
    shortAnswer: "A Next-Gen Firewall capability that parses the application payload of DICOM and HL7 messages, blocking unauthorized modifications (e.g. altering patient drug dosage fields) and detecting malformed exploit commands.",
    explanation: "DPI engines in Ichapur inspect HL7 messages to verify that sender IDs match authenticated hospital laboratory terminals.",
    hint: "Inspects inside DICOM and HL7 medical message payloads to block tampered drug dosages.",
    level: "expert",
    codeExample: "dpi.inspectHL7(message) => if (message.orderDosage > MaximumSafeLimit) blockAndAlertDoctor();"
  },
  {
    question: "What is Tele-ICU (Tele-Intensive Care Unit) Networking and how does it connect rural hospitals?",
    shortAnswer: "A high-bandwidth centralized command center connecting audio, 4K pan-tilt-zoom cameras, and real-time patient vital feeds from rural district hospital ICUs to senior intensivist doctors located in metropolitan centers.",
    explanation: "Allows top critical-care doctors in Kolkata to monitor and advise on ventilator adjustments for patients in rural Bengal hospitals.",
    hint: "Connects rural hospital ICUs to specialist doctors in big cities via high-definition video and vitals feeds.",
    level: "basic",
    codeExample: "TeleICU_Stream: Rural_Hospital_ICU (Vitals + 4K Video) --Dedicated_VPN--> Medical_Command_Center_Kolkata"
  },
  {
    question: "What is Out-of-Band (OOB) Medical Alert Paging (e.g. Nurse Call Systems)?",
    shortAnswer: "A secondary, independent wired or wireless communication network (e.g. AS 3811 / IP nurse call) that dispatches emergency code-blue alarms to nurse pagers within 500 milliseconds, bypassing standard campus internet traffic.",
    explanation: "Ensures emergency cardiac arrest alarms are never delayed by campus bandwidth congestion or firewall reboot cycles.",
    hint: "Dedicated emergency alarm network that pages nurses within 500ms during cardiac emergencies.",
    level: "moderate",
    codeExample: "NurseCall: PatientBed_Alarm -> Dedicated_IP_Bus -> Nurse_Pager_Display (Latency: 180 ms)"
  },
  {
    question: "What is Mutual TLS (mTLS) in Hospital EHR API integrations?",
    shortAnswer: "A cryptographic authentication method where both the mobile doctor tablet and the hospital EHR server exchange X.509 certificates to verify each other's identity before opening an encrypted session, preventing unauthorized API queries.",
    explanation: "Guarantees that only authorized hospital-managed tablets can query sensitive patient lab results in Jadavpur.",
    hint: "Bidirectional certificate verification ensuring only registered doctor devices can access patient data.",
    level: "moderate",
    codeExample: "ehr_api: ssl_verify_client on; ssl_client_certificate /etc/ssl/hospital_ca.crt;"
  },
  {
    question: "What is a Biomedical Engineering Virtual Private Network (VPN) for Vendor Remote Maintenance?",
    shortAnswer: "A strictly controlled, on-demand ZTNA or SSL VPN session that allows medical equipment manufacturers (e.g. GE, Siemens, Philips) to perform remote diagnostics on MRI/CT scanners only with doctor approval and continuous session recording.",
    explanation: "Prevents medical equipment vendors from having continuous, unmonitored backdoor access to hospital networks.",
    hint: "Time-limited and recorded VPN access allowing equipment vendors to service MRI machines remotely.",
    level: "expert",
    codeExample: "VendorAccess: ApprovedByAdmin = true; SessionRecorded = true; MaxDuration = '60 minutes';"
  },
  {
    question: "What is an Air-Gapped Medical Backup Architecture and why does it defeat Ransomware?",
    shortAnswer: "Storing full daily backups of patient electronic health records on offline, physically disconnected storage media (immutable WORM tape or air-gapped immutable S3 object lock) that cannot be reached or encrypted over the network.",
    explanation: "If active hospital servers in Barrackpore are hit by ransomware, doctors can restore complete records from the immutable offline copy.",
    hint: "Storing patient record backups offline so network ransomware cannot reach or encrypt them.",
    level: "basic",
    codeExample: "Backup_Policy: Daily_Snapshot -> AirGapped_Immutable_Vault (Write Once Read Many - WORM)"
  },
  {
    question: "What is Medical Wi-Fi QoS Prioritization (WMM / 802.11e) in hospital wireless networks?",
    shortAnswer: "Wireless Multimedia (WMM) prioritizes Wi-Fi radio airtime into four access categories: Voice (AC_VO), Video (AC_VI), Best Effort (AC_BE), and Background (AC_BK), ensuring patient ECG telemetry beats visitor smartphone downloads.",
    explanation: "Guarantees zero radio jitter for real-time patient cardiac monitors moving through hospital wards.",
    hint: "Prioritizes patient heart monitors over visitor video downloads on hospital Wi-Fi.",
    level: "expert",
    codeExample: "wmm: prioritize TrafficClass 'Medical_Telemetry_ECG' with Highest_Voice_Priority (AC_VO);"
  },
  {
    question: "What is an Electronic Health Record (EHR) Disaster Recovery Site in healthcare?",
    shortAnswer: "A geographically distant secondary data center that continuously replicates patient medical records and imaging databases, capable of taking over hospital operations within minutes if the primary hospital suffers an outage.",
    explanation: "Ensures patient allergy data, ongoing prescriptions, and surgery schedules remain accessible during localized disasters.",
    hint: "Backup data center located in another city that keeps hospital systems running during emergencies.",
    level: "moderate",
    codeExample: "DR_Replication: Primary_HIS_DB --Encrypted_WAN--> DR_Site_Kolkata (RPO = 5s, RTO = 10 mins)"
  },
  {
    question: "What is a Rogue Access Point Threat in a hospital environment?",
    shortAnswer: "An unauthorized Wi-Fi router or mobile hotspot activated inside a patient ward, which can create radio interference with wireless patient telemetry monitors and open an unmonitored backdoor into the hospital network.",
    explanation: "Wireless Intrusion Prevention Systems (WIPS) in Ichapur detect and contain rogue hotspots within seconds.",
    hint: "Unauthorized Wi-Fi hotspots that interfere with medical monitors and create security backdoors.",
    level: "moderate",
    codeExample: "wips.onUnauthorizedBeacon(SSID) => transmitContainmentDeauth(SSID) && alertHospitalSecurity();"
  },
  {
    question: "What is DICOM Anonymization and why is it used for Medical Research Networks?",
    shortAnswer: "The process of stripping patient identifying information (Name, Aadhaar ID, Address, Phone) from DICOM image headers before transmitting medical datasets to university research consortiums for AI algorithm training.",
    explanation: "Protects patient confidentiality while allowing cancer researchers in Jadavpur to analyze thousands of lung CT scans.",
    hint: "Removes patient names and personal details from X-ray files before sharing for research.",
    level: "basic",
    codeExample: "dicom.anonymize() => { delete header.PatientName; delete header.PatientID; header.StudyID = 'ANON_9012'; }"
  },
  {
    question: "What is a Clinical Voice over IP (VoIP) & Ascom Wireless Handset Network in hospitals?",
    shortAnswer: "A specialized Wi-Fi voice network providing doctors and nurses with ruggedized wireless handsets for instant push-to-talk, code-blue alerts, and physician consultation with sub-50ms audio latency and zero dropped calls.",
    explanation: "Enables instant emergency communication across multi-floor hospital buildings in Kolkata.",
    hint: "Hospital wireless phone network allowing nurses and doctors to communicate instantly.",
    level: "moderate",
    codeExample: "VoIP_QoS: DSCP = 46 (Expedited Forwarding); JitterBuffer = 20ms; PacketLoss = 0.00%;"
  },
  {
    question: "What is Hardware Tamper Detection on Hospital Pharmacy Automated Dispensing Cabinets (ADCs)?",
    shortAnswer: "Networked smart medicine cabinets (e.g. Pyxis / Omnicell) that require biometric fingerprint authentication and log every single vial removal over encrypted TLS sessions, alerting hospital security if physical tampering occurs.",
    explanation: "Prevents theft and unauthorized diversion of controlled narcotics and emergency medications.",
    hint: "Biometric smart cabinets that track and log every single medicine vial removed by nurses.",
    level: "basic",
    codeExample: "ADC_Log: BiometricAuth(NurseMahima) -> DrawerOpen(Fentanyl_Vial) -> TLS_Event_Logged -> CBS_Inventory"
  },
  {
    question: "What is an Emergency Operating Room (OR) Network Isolation Architecture?",
    shortAnswer: "Operating Rooms are configured as dedicated, isolated network security zones with local UPS battery backups, independent edge compute servers, and zero dependencies on external Internet routing for vital surgical equipment.",
    explanation: "Ensures surgical lights, robotic consoles, and patient monitors function continuously even if the entire hospital WAN goes down.",
    hint: "Isolates operating rooms so surgical equipment keeps working even if the hospital network fails.",
    level: "expert",
    codeExample: "OR_Zone = { LocalEdgeServer: true, ZeroExternalInternetDependency: true, BatteryBackup: '8 Hours' };"
  },
  {
    question: "What is Role-Based Access Control (RBAC) in Hospital EHR Database Systems?",
    shortAnswer: "A security model restricting medical record access based on professional job duties (e.g. Radiologists view DICOM scans; Pharmacists view prescription orders; Billing clerks view invoices but cannot see clinical notes).",
    explanation: "Enforces the principle of least privilege and complies with patient privacy laws in Barrackpore.",
    hint: "Allows staff to see only the medical data necessary for their specific job role.",
    level: "basic",
    codeExample: "RBAC_Rule: if (user.role == 'BillingClerk') allow(InvoiceData); deny(ClinicalDiagnosisNotes);"
  },
  {
    question: "What is Cloud-Based Electronic Health Record (EHR) Telemetry vs On-Premises EHR?",
    shortAnswer: "Cloud EHR systems host patient data in certified compliant multi-tenant cloud data centers connected via IPsec/DirectConnect; On-Premises EHR hosts data on local physical servers inside the hospital data center.",
    explanation: "Many healthcare networks in West Bengal adopt hybrid models: on-premise local PACS for instant viewing and cloud backups for disaster recovery.",
    hint: "Cloud EHR hosts medical records in secure cloud data centers; On-premises stores them in the hospital.",
    level: "moderate",
    codeExample: "Hybrid_EHR = { LocalCache: 'On-Prem PACS (Fast 10G)', LongTermArchive: 'Cloud S3 HIPAA Vault' };"
  },
  {
    question: "What is Power over Ethernet (PoE+) for Hospital IP Telemetry Sensors & Access Badges?",
    shortAnswer: "Supplying DC power over Ethernet cables to digital bedside patient room displays, RFID staff tracking badges, and door access controllers throughout hospital corridors.",
    explanation: "Eliminates dangerous AC extension cords and simplifies installation of hundreds of wall-mounted clinical touchscreens.",
    hint: "Powers hospital room touchscreens and door access card readers over network cables.",
    level: "basic",
    codeExample: "PoE_Port: PowerAllocation = 25.5W (PoE+ 802.3at); Status = 'Powering Room Bedside Terminal';"
  },
  {
    question: "What is a Hospital Threat Intelligence & Anomaly Detection System?",
    shortAnswer: "An AI-powered Network Detection and Response (NDR) platform that monitors all clinical VLAN traffic, establishing baseline medical device communication patterns and alerting if an infusion pump begins scanning the network.",
    explanation: "Detects zero-day malware and stealth lateral movement attempts within seconds in hospital networks.",
    hint: "AI monitoring tool that detects abnormal network behavior, like a medical device scanning other servers.",
    level: "expert",
    codeExample: "ndr.onAnomalousBehavior('InfusionPump_10.0.50.4', 'PortScanDetected') => isolateDevice();"
  },
  {
    question: "What is the ultimate golden rule for architecting, operating, and securing Healthcare & Hospital Networks?",
    shortAnswer: "'Enforce strict biomedical IoMT network microsegmentation; isolate DICOM/PACS imaging onto 10G Jumbo-Frame fabrics; protect ePHI patient records with end-to-end AES-256 encryption and FHIR mTLS APIs; maintain immutable air-gapped offline backups against ransomware; and budget clinical hardware in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes patient life safety, radiological throughput, cryptographic privacy compliance, ransomware resiliency, and financial procurement budgeting.",
    hint: "IoMT microsegmentation + 10G PACS Jumbo Frames + FHIR mTLS + Air-gapped backups + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: Segment_IoMT_VLANs() -> Deploy_10G_PACS() -> Encrypt_ePHI_mTLS() -> AirGapOfflineBackups() -> BudgetInRupees(₹);"
  }
];

export default questions;
