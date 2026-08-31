const questions = [
  {
    id: 1,
    question: "What is a Next-Generation Firewall (NGFW) and what are its three foundational core pillars?",
    shortAnswer: "A fourth-generation firewall that integrates Deep Packet Inspection (DPI) to enforce security policies based on: 1. App-ID (Application Identification); 2. User-ID (Identity-Based Access); 3. Content-ID (Integrated Threat Prevention).",
    explanation: "Defined by Gartner in 2007, an NGFW moves beyond static IP and port rules. It inspects payloads to identify the true application (regardless of port or encryption), maps network traffic to Active Directory user identities, and performs unified threat scanning for malware, exploits, and zero-day threats in a single pass.",
    hint: "App-ID, User-ID, and Content-ID.",
    level: "Basic",
    codeExample: `// The 3 NGFW Pillars:
const ngfwPillars = {
  appId: "Application Identification (Identifies actual app, ignores port numbers)",
  userId: "Identity-Based Access (Maps IPs dynamically to Active Directory users)",
  contentId: "Integrated Threat Prevention (Single-pass AV, IPS, DLP, Sandboxing)"
};`
  },
  {
    id: 2,
    question: "How does App-ID (Application Identification) differ from legacy port-based firewall rule evaluation?",
    shortAnswer: "Legacy firewalls assume TCP port 80 is HTTP and port 443 is SSL; App-ID analyzes protocol decoders, payload signatures, and behavioral heuristics to identify the real application, detecting evasive apps running on non-standard ports.",
    explanation: "If an employee runs BitTorrent, Tor, or an SSH tunnel over port 443, a legacy stateful firewall permits it because port 443 is open. App-ID decodes the stream, discovers that the payload is an SSH tunnel or P2P protocol rather than legitimate TLS/HTTPS, and applies granular blocking policies.",
    hint: "App-ID looks at the actual application data rather than trusting the port number on the packet envelope.",
    level: "Basic",
    codeExample: `// Legacy Port Rule vs NGFW App-ID Policy:
// Legacy Rule : ALLOW 10.10.1.0/24 → ANY:443 (Allows SSH tunnel / BitTorrent on 443!)
// NGFW Policy : ALLOW 'Finance-Team' → APP 'salesforce' ONLY on Service-Default`
  },
  {
    id: 3,
    question: "What is 'Single-Pass Parallel Processing' (SP3) architecture and how does it prevent the performance bottlenecks of legacy UTM multi-pass engines?",
    shortAnswer: "SP3 parses the packet payload once in hardware memory and evaluates App-ID, User-ID, Content-ID (AV, IPS, DLP), and policy rules simultaneously in parallel using dedicated ASICs, achieving line-rate throughput without multiple buffering stages.",
    explanation: "Legacy Unified Threat Management (UTM) firewalls daisy-chain independent software engines: unpacking, scanning, and repacking the packet 4–5 times (Firewall → IPS → AV → URL Filter). SP3 eliminates redundant processing by performing a single classification and a single hardware signature scan.",
    hint: "Unpacks and inspects the payload once for all threat signatures simultaneously.",
    level: "Moderate",
    codeExample: `// Multi-Pass (UTM) vs Single-Pass (NGFW):
// Multi-Pass : Ingress → [FW Scan] → [IPS Scan] → [AV Scan] → [URL Scan] → Egress (5x Latency!)
// Single-Pass: Ingress → [Unified Hardware ASIC: App-ID + IPS + AV + Policy] → Egress (1x Latency)`
  },
  {
    id: 4,
    question: "How does 'User-ID' integrate with enterprise directory services (Active Directory / LDAP / Kerberos / 802.1X)?",
    shortAnswer: "User-ID snoops domain controller security event logs (Event ID 4624 logon events), GlobalProtect VPN logins, and 802.1X authentications to maintain an internal IP-to-Username-to-Group mapping table in real-time.",
    explanation: "Instead of writing rules for static IP subnets (which change constantly with DHCP and Wi-Fi roaming), administrators write policies: 'Allow Active Directory group Finance-Managers to access Core-ERP'. When user Mamata logs in, the firewall maps her laptop's IP dynamically to her group.",
    hint: "Dynamically maps IP addresses to Active Directory usernames and groups.",
    level: "Basic",
    codeExample: `// User-ID Mapping Table:
// IP 10.10.1.50 → User: "mamata.b@bank.gov.in" → Group: "Finance-Managers"
// Policy: "Finance-Managers" → Allowed App: "SAP-HANA"`
  },
  {
    id: 5,
    question: "What is 'SSL/TLS Forward Proxy Decryption' (Outbound TLS Inspection) and how does it operate?",
    shortAnswer: "The NGFW intercepts outbound HTTPS connections from internal users, dynamically generates a subordinate certificate for the requested website signed by the enterprise Root CA, decrypts the payload for threat inspection, and re-encrypts it to the origin server.",
    explanation: "Because the enterprise Root CA is pre-installed in the trusted certificate store of all company workstations, employee browsers accept the NGFW's generated certificates without security warnings. This allows the NGFW to scan outbound HTTPS traffic for malware downloads, data exfiltration, and C2 beacons.",
    hint: "The NGFW acts as an authorized man-in-the-middle for company laptops using the enterprise Root CA.",
    level: "Moderate",
    codeExample: `// SSL Forward Proxy Flow:
// Client (Laptop with Enterprise Root CA) <=== [TLS Intercept (Sub-Cert)] ===> [NGFW DPI Engine] <=== [Origin TLS] ===> Google`
  },
  {
    id: 6,
    question: "What is 'SSL Inbound Inspection' (Reverse TLS Decryption) and how does it protect DMZ servers?",
    shortAnswer: "The NGFW holds the official SSL/TLS private key and certificate of the protected internal server, terminating incoming client TLS handshakes to inspect requests for web exploits before forwarding clean streams to origin servers.",
    explanation: "For public-facing applications (e.g. `https://tax.barrackpore.gov.in`), the NGFW is loaded with the server's private key. Inbound HTTPS traffic from external Internet users is decrypted in real-time by the NGFW, scanned for SQLi/XSS/RCE exploits, and passed to the backend server.",
    hint: "The NGFW holds the server's real private key to decrypt and inspect incoming customer traffic.",
    level: "Moderate",
    codeExample: `// SSL Inbound Inspection:
// External User ---> [NGFW (Holds Server Private Key: Decrypts & Scans Exploits)] ---> Protected DMZ Web Server`
  },
  {
    id: 7,
    question: "How does Content-ID in an NGFW unify Antivirus, Anti-Spyware, and Intrusion Prevention System (IPS) engines?",
    shortAnswer: "By compiling thousands of threat signatures into a unified Aho-Corasick or deterministic finite automaton (DFA) pattern-matching stream, evaluating all vulnerability exploits and malware hashes in a single memory sweep.",
    explanation: "Rather than running separate signature databases sequentially, Content-ID compiles IPS exploit signatures, malware hashes, and spyware patterns into a single unified search tree executed directly by hardware scanning engines (ASICs/FPGAs), matching threats at multi-gigabit speeds.",
    hint: "Combines IPS, Antivirus, and Anti-Spyware into a single unified pattern-matching engine.",
    level: "Expert",
    codeExample: `// Unified Content-ID Inspection:
// Single Byte Sweep → [Matches CVE-2021-44228 Log4Shell + EICAR Malware Hash + CobaltStrike C2 Profile simultaneously]`
  },
  {
    id: 8,
    question: "What is 'Cloud Sandbox Detonation' (e.g. Palo Alto WildFire / Fortinet FortiSandbox) in Next-Generation Firewalls?",
    shortAnswer: "When an NGFW encounters an unknown zero-day executable or document, it forwards a copy to a cloud sandbox virtual machine that detonates the file, analyzes behavioral changes, and distributes global blocking signatures within seconds.",
    explanation: "Signature-based antivirus cannot detect brand new, uncataloged malware. Cloud sandboxes execute suspicious files in isolated instrumented virtual machines (monitoring registry modifications, memory injection, network beaconing). If malicious, the sandbox generates a signature and pushes it to millions of firewalls globally.",
    hint: "Detonating unknown files in a secure cloud virtual machine to detect brand new zero-day attacks.",
    level: "Moderate",
    codeExample: `// WildFire Cloud Sandbox Pipeline:
// 1. Unknown File (.exe/.docx) arrives at NGFW → 2. Uploaded to Cloud Sandbox → 3. Detonated in VM → 4. Signature pushed in < 5 seconds!`
  },
  {
    id: 9,
    question: "Why does an NGFW eliminate the concept of 'Trusted Ports' (e.g. Why Port 53, 80, and 443 are no longer implicitly safe)?",
    shortAnswer: "Modern malware authors and threat actors deliberately tunnel command-and-control (C2) communication, data exfiltration, and remote shells over ports 53, 80, and 443 because legacy firewalls leave them open.",
    explanation: "Attackers know enterprises allow outbound port 443. Threat actors encapsulate Meterpreter reverse shells or Cobalt Strike beacons inside fake HTTPS packets on port 443. An NGFW inspects the payload structure, recognizes that the traffic is not valid TLS, and drops the connection regardless of the destination port.",
    hint: "Attackers disguise malicious traffic over common open ports like 80, 443, and 53.",
    level: "Basic",
    codeExample: `// The Death of Trusted Ports:
// Port 443 Traffic → NGFW App-ID: Detected as "cobalt-strike-beacon" (NOT SSL!) → Action: RESET-DROP!`
  },
  {
    id: 10,
    question: "What is 'Micro-Application Control' in NGFW App-ID (e.g. Facebook-Base vs Facebook-Posting vs Facebook-Chat)?",
    shortAnswer: "The capability to distinguish and enforce distinct security policies for specific sub-functions and APIs within a single overarching web application.",
    explanation: "An organization can configure an NGFW policy that permits employees to view corporate social media (`facebook-base`), but blocks games (`facebook-games`), file uploads (`facebook-file-upload`), and chat (`facebook-chat`), preventing data leakage while allowing business visibility.",
    hint: "Permitting the general website while blocking specific sub-features like chat or file sharing.",
    level: "Moderate",
    codeExample: `// Micro-App Policy Granularity:
// ALLOW: Marketing-Team → App: "linkedin-base", "linkedin-posting"
// DROP : Marketing-Team → App: "linkedin-mail", "linkedin-job-search"`
  },
  {
    id: 11,
    question: "What is 'App-ID Dependency / Implicit Application Chaining' in NGFW security policies?",
    shortAnswer: "Certain modern applications rely on underlying base protocols; permitting a high-level application (e.g. Salesforce) requires the firewall to automatically permit its prerequisite base protocols (e.g. `ssl` and `web-browsing`).",
    explanation: "Salesforce cannot connect without first negotiating an SSL/TLS handshake. If an administrator writes a policy allowing only `salesforce` without allowing `ssl`, the initial handshake packets are dropped. Modern NGFWs resolve this via Application Dependency chaining or Service-Default enforcement.",
    hint: "High-level applications depend on underlying base protocols like SSL and Web-Browsing.",
    level: "Moderate",
    codeExample: `// App-ID Dependency Chain:
// App "salesforce" Depends on: "ssl" (Handshake) + "web-browsing" (HTTP Transport)`
  },
  {
    id: 12,
    question: "What is 'Device-ID / IoT Security' profiling in Next-Generation Firewalls?",
    shortAnswer: "Using machine learning and network behavioral fingerprinting (DHCP options, User-Agents, mDNS, MAC OUI) to classify devices (e.g. MRI Scanner, Smart Camera, Linux Server) and enforce device-specific Zero Trust policies.",
    explanation: "In healthcare and industrial networks, IoT devices cannot run EDR agents. The NGFW analyzes device network telemetry, identifies an IP as a 'GE Healthcare Ultrasound Machine', and enforces a policy restricting it to communicating ONLY with the central PACS radiology server on DICOM port 104.",
    hint: "Classifying smart devices and medical equipment to restrict them to authorized communications.",
    level: "Expert",
    codeExample: `// Device-ID Policy:
// ALLOW: Device-Type "Medical-Ultrasound" → Destination: "PACS-Server" Proto: DICOM (Port 104)
// DROP : Device-Type "Medical-Ultrasound" → Destination: ANY (Blocks Internet scanning!)`
  },
  {
    id: 13,
    question: "How does an NGFW handle 'Unknown-TCP' and 'Unknown-UDP' traffic in enterprise environments?",
    shortAnswer: "Traffic that fails all protocol decoders and signatures is categorized as `unknown-tcp` or `unknown-udp`, allowing administrators to enforce strict default-deny policies or route unknown streams to sandboxes for behavioral analysis.",
    explanation: "In a hardened enterprise perimeter, allowing unknown traffic is a severe security risk. SOC policies typically block `unknown-tcp` and `unknown-udp` on egress, forcing all outbound enterprise traffic to match verified, authorized App-ID signatures.",
    hint: "Traffic that cannot be identified is flagged as unknown and blocked by default-deny policies.",
    level: "Basic",
    codeExample: `// Unknown Traffic Hardening Rule:
// Rule: DROP Source: Internal_LAN → Destination: ANY → App: "unknown-tcp", "unknown-udp"`
  },
  {
    id: 14,
    question: "What is 'Decryption Broker / SSL Orchestration' in high-throughput Next-Generation Firewalls?",
    shortAnswer: "The NGFW decrypts high-speed SSL/TLS traffic once in hardware ASICs and forwards the plaintext stream to third-party security appliances (DLP, Sandbox, IDS) in a security chain before re-encrypting it.",
    explanation: "If every security box (NGFW, DLP, IPS, Forensic Recorder) decrypts and re-encrypts traffic independently, network latency and CPU utilization explode. A Decryption Broker decrypts traffic once, chains it through inspection devices, and re-encrypts it for transmission.",
    hint: "Decrypting traffic once and sharing the plaintext stream with multiple security tools.",
    level: "Expert",
    codeExample: `// Decryption Broker Architecture:
// Ingress (Encrypted) → [NGFW Decryption ASIC] ---> [Plaintext DLP] ---> [Plaintext IDS] → [NGFW Re-encrypt] → Egress`
  },
  {
    id: 15,
    question: "What legal and privacy exceptions must an enterprise configure in SSL Forward Proxy Decryption policies (e.g. Banking / Healthcare)?",
    shortAnswer: "Exempting sensitive URL categories (such as Financial Services, Online Banking, Healthcare, and Personal Communication) from SSL decryption to comply with privacy laws and prevent storing employee banking passwords in firewall logs.",
    explanation: "Decrypting employee personal banking traffic (e.g. `sbi.co.in`) or medical consultations violates privacy standards and regulations like the DPDP Act 2023. NGFW administrators configure 'Decryption Exclusion Rules' based on URL categories to bypass decryption for financial and health domains.",
    hint: "Exempting banking and healthcare websites from decryption to protect employee privacy.",
    level: "Moderate",
    codeExample: `// Decryption Exclusion Policy:
// IF URL.Category IN ['Financial-Services', 'Health-and-Medicine'] → Action: NO-DECRYPT (Pass encrypted)`
  },
  {
    id: 16,
    question: "What is 'File Blocking / Data Filtering' in NGFW Content-ID engines?",
    shortAnswer: "Policies that inspect and block specific file extensions, MIME types, or sensitive data patterns (e.g., blocking upload of `.zip` or `.tar` archives, or scanning for Aadhaar numbers) regardless of application.",
    explanation: "To prevent insider data theft and malware execution, Content-ID rules block high-risk file types (e.g. `.exe`, `.bat`, `.dll`, `.vbs`) from being downloaded over web browsing or cloud storage apps (Google Drive, Dropbox).",
    hint: "Blocking specific file types and sensitive documents across all applications.",
    level: "Basic",
    codeExample: `// File Blocking Profile:
// Block Upload & Download: Extensions = [.exe, .dll, .scr, .bat, .ps1]`
  },
  {
    id: 17,
    question: "How does an NGFW defeat 'DNS over HTTPS' (DoH) and 'DNS over TLS' (DoT) evasion attempts by malware?",
    shortAnswer: "By using App-ID to identify and block unauthorized public DoH/DoT providers (e.g. `dns-over-https`), forcing all internal endpoints to use the enterprise-controlled internal DNS proxy.",
    explanation: "Malware uses DoH (port 443) to hide its DNS queries inside encrypted HTTPS connections to Cloudflare or Google DNS, bypassing corporate DNS filters. The NGFW's App-ID detects the `dns-over-https` application signature and drops it, enforcing internal DNS compliance.",
    hint: "Identifying and blocking encrypted DNS protocols so all lookups go through company DNS servers.",
    level: "Expert",
    codeExample: `// Block DoH Evasion:
// Rule: DROP Source: Internal_LAN → Destination: ANY → App: "dns-over-https", "dns-over-tls"`
  },
  {
    id: 18,
    question: "What is 'Dynamic User-Group Synchronization' in hybrid enterprise environments (Azure AD / Active Directory)?",
    shortAnswer: "The NGFW synchronizes user group memberships via Microsoft Graph API or SCIM, instantly applying policy changes (e.g. an employee transitioning from Finance to Engineering) without firewall reboots.",
    explanation: "When an employee changes roles in HR systems, Active Directory updates their group membership. The NGFW syncs with AD via User-ID XML APIs; within seconds, the employee's network access permissions update across all firewall clusters automatically.",
    hint: "Automatically updating firewall access permissions when employee roles change in Active Directory.",
    level: "Moderate",
    codeExample: `// User-ID XML API Sync:
// <uid-message><payload><login><entry name="mamata.b" ip="10.10.1.50"/></login></payload></uid-message>`
  },
  {
    id: 19,
    question: "What is 'Security Policy Optimizer / Rule Hit Count Analysis' in enterprise NGFW management?",
    shortAnswer: "An automated analytics engine that identifies legacy port-based rules, analyzes actual App-ID traffic traversing them over 90 days, and recommends converting them into strict App-ID-only policies.",
    explanation: "Enterprise migrations often import legacy port-based rules (`Allow Port 80/443`). The Policy Optimizer monitors real traffic, shows that only `web-browsing` and `salesforce` use the rule, and generates a one-click migration to an App-ID policy, eliminating attack surface.",
    hint: "Analyzes actual traffic to convert loose port-based rules into strict application policies.",
    level: "Moderate",
    codeExample: `// Policy Optimizer Conversion:
// Old Legacy Rule: Allow ANY Port 80/443
// Optimized NGFW : Allow App: [salesforce, work-day, office365] on Service-Default`
  },
  {
    id: 20,
    question: "How does an NGFW protect against 'Server-Side Request Forgery' (SSRF) in cloud VPC environments?",
    shortAnswer: "By restricting outbound HTTP/HTTPS App-ID traffic from cloud web tiers, blocking requests targeting link-local metadata endpoints (`169.254.169.254`) and internal management subnets.",
    explanation: "In cloud environments (AWS/Azure), SSRF exploits allow attackers to query instance metadata to steal IAM role credentials. An NGFW placed between VPC subnets blocks traffic to `169.254.169.254` and prevents web servers from initiating unauthorized East-West connections.",
    hint: "Blocking web servers from making unauthorized requests to cloud metadata or internal databases.",
    level: "Expert",
    codeExample: `// Cloud Metadata SSRF Protection:
// DROP Source: Web_Server_Tier → Destination: 169.254.169.254 App: ANY`
  },
  {
    id: 21,
    question: "What is 'Custom App-ID Signature Creation' and when is it required in regional Indian enterprises?",
    shortAnswer: "Writing custom regular expressions and protocol decoders to identify proprietary internal banking, manufacturing SCADA, or government software that standard commercial firewall signature databases do not support.",
    explanation: "A bank in Kolkata or a municipal corporation in Barrackpore may use custom proprietary software. Security engineers write custom App-ID XML definitions specifying payload patterns (e.g. matching a proprietary header `X-WB-Civic-Auth: v1.0`), enabling precise granular access control.",
    hint: "Creating custom application signatures for proprietary or local software.",
    level: "Expert",
    codeExample: `// Custom App-ID Signature XML:
// <application name="wb-civic-portal"><signature><entry name="auth-header"><pattern>X-WB-Civic-Auth: v1.0</pattern></entry></signature></application>`
  },
  {
    id: 22,
    question: "What is 'Application Shift / Protocol Hopping Detection' in NGFW session tracking?",
    shortAnswer: "Monitoring active connections continuously so that if a session begins as standard HTTP and dynamically upgrades or shifts to an unauthorized protocol (e.g. WebSockets, BitTorrent, SSH), the NGFW re-classifies the App-ID and applies blocking policies mid-session.",
    explanation: "Attackers initiate connections using valid HTTP handshakes to pass initial firewall checks, then immediately tunnel prohibited protocols through the open TCP pipe. An NGFW inspects packets continuously; when the application shifts, the firewall re-evaluates policy and terminates the connection.",
    hint: "Detecting when an allowed web connection shifts into a disguised unauthorized protocol mid-stream.",
    level: "Expert",
    codeExample: `// Application Shift Event:
// Packet 1-3: Handshake matched "web-browsing" → Permitted
// Packet 4  : Payload shifted to "ssh-tunnel" → Policy Re-evaluated → Action: RESET-BOTH!`
  },
  {
    id: 23,
    question: "How does Hardware Acceleration (Network Processing Unit - NPU / Content Processing Unit - CP) in NGFWs achieve 100+ Gbps throughput?",
    shortAnswer: "Dedicated hardware ASICs offload Layer 3/4 forwarding (NPUs) and cryptographic decryption / regex pattern matching (CPUs/FPGAs), freeing general-purpose x86 CPUs for management and state operations.",
    explanation: "Software-only DPI on general-purpose CPUs bottlenecks under heavy TLS load. Enterprise NGFWs (e.g. Fortinet FortiASIC, Palo Alto FE100) use dedicated silicon: NPUs process network routing at line rate, while Content Processors execute millions of regex comparisons in parallel in hardware.",
    hint: "Dedicated specialized silicon chips (ASICs) handle encryption and signature matching in hardware.",
    level: "Moderate",
    codeExample: `// Dual Hardware Processing Architecture:
// Data Plane: [NPU ASIC (Line-Rate Routing)] + [Content Processor ASIC (Hardware TLS & DPI)]
// Control Plane: [Multi-Core x86 Management CPU]`
  },
  {
    id: 24,
    question: "What is 'SaaS Application Visibility and Shadow IT Discovery' via Next-Generation Firewalls?",
    shortAnswer: "The NGFW catalogs all cloud applications accessed by corporate users (Google Drive, WeTransfer, Personal Dropbox), reporting risk scores, data transfer volumes, and unsanctioned SaaS usage.",
    explanation: "Employees often use unapproved personal cloud storage to share work files (Shadow IT), creating massive data leakage risks under the DPDP Act 2023. The NGFW generates SaaS risk reports, identifying unapproved cloud platforms and allowing one-click blocking.",
    hint: "Discovering and controlling unauthorized cloud services used by employees.",
    level: "Basic",
    codeExample: `// Shadow IT Analytics:
// Discovered Apps: WeTransfer (Risk: High, Data Exfiltrated: 14.5 GB, Users: 12) → Action: BLOCK`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding NGFW Threat Prevention and Telemetry logging?",
    shortAnswer: "All threat detection events (IPS blocks, malware detections, SSL decryption alerts, User-ID logon mappings) must be timestamped via NPL India NTP and retained securely in immutable SIEM logs for 180 days.",
    explanation: "During national forensic investigations, CERT-In correlates NGFW App-ID and User-ID logs to identify infected endpoints and patient-zero infection vectors across Indian cyberspace. Incomplete or un-synchronized logs violate statutory cybersecurity directives.",
    hint: "180-day secure log retention synchronized with NPL India NTP servers.",
    level: "Basic",
    codeExample: `// NGFW Structured Threat Log:
const ngfwThreatLog = {
  timestamp: "2026-08-23T10:30:45.891Z",
  srcIp: "10.10.1.50",
  user: "mamata.b",
  appId: "ssh-tunnel",
  threatName: "CobaltStrike.Beacon.Command",
  action: "RESET_DROP",
  severity: "CRITICAL"
};`
  },
  {
    id: 26,
    question: "What is 'Credential Phishing Prevention' in Next-Generation Firewalls?",
    shortAnswer: "The NGFW inspects outbound HTTP POST bodies to external websites, checking if submitted password hashes match the user's corporate Active Directory domain credentials, blocking the submission if the destination is an untrusted external site.",
    explanation: "If an employee falls for a phishing email and enters their corporate banking password into a fake login portal, the NGFW detects the domain password hash in transit, drops the HTTP POST request, and displays a warning page, preventing credential theft.",
    hint: "Blocking users from submitting their company passwords onto unauthorized external websites.",
    level: "Expert",
    codeExample: `// Credential Phishing Protection:
// Outbound POST to "fake-bank-login.com" → Detected corporate password hash → Action: BLOCK & ALERT SOC!`
  },
  {
    id: 27,
    question: "What is 'Automated Dynamic Block Lists (EBL / EDL)' in enterprise NGFW threat response?",
    shortAnswer: "The NGFW automatically polls external threat intelligence feeds via HTTP/HTTPS every 5–15 minutes, dynamically updating IP, domain, and URL blocklists without requiring manual administrator rule changes.",
    explanation: "When global CERTs or commercial threat intelligence networks identify newly active ransomware C2 servers, they publish them to an External Dynamic List (EDL). The NGFW ingests the list automatically, blocking connections to newly identified malicious IPs within minutes.",
    hint: "Automated threat intelligence feeds that update firewall blocklists in real-time.",
    level: "Moderate",
    codeExample: `// External Dynamic List (EDL) Configuration:
// Object: EDL_Malware_C2 → Source: "https://threatintel.cert-in.org.in/active_c2.txt" (Refreshes every 5 mins)`
  },
  {
    id: 28,
    question: "What is 'Zone Protection / SYN Flood Protection' in Next-Generation Firewalls?",
    shortAnswer: "Hardware-enforced packet thresholds applied at the ingress interface zone that activate SYN Cookies, drop malformed packets, and block IP sweep reconnaissance before allocating session memory.",
    explanation: "Before a packet reaches App-ID classification, Zone Protection profiles enforce volumetric rate limits: dropping non-SYN TCP packets, discarding IP fragments, and mitigating volumetric ICMP and UDP floods at the physical interface layer.",
    hint: "Interface-level volumetric flood and malformed packet defense before deep processing.",
    level: "Moderate",
    codeExample: `// Zone Protection Thresholds:
// SYN Flood: Alarm at 10,000 CPS → Activate SYN Cookies at 25,000 CPS → Drop at 50,000 CPS`
  },
  {
    id: 29,
    question: "Why does an enterprise NGFW require High-Availability (HA) Active-Passive clustering with dedicated Control and Data links?",
    shortAnswer: "To synchronize App-ID session states, User-ID mapping tables, and IPS session contexts in real-time over dedicated HA1 (Control) and HA2 (Data) physical links, ensuring sub-second seamless failover.",
    explanation: "If the active NGFW fails, the passive standby unit must immediately take over without terminating active VPN tunnels, VoIP calls, or encrypted TLS streams. Dedicated fiber links handle state synchronization, maintaining 99.999% high availability.",
    hint: "Dual dedicated synchronization links ensure seamless failover without dropping active sessions.",
    level: "Basic",
    codeExample: `// NGFW HA Cluster Links:
// HA1 (Control Link): Heartbeats, configuration synchronization, User-ID database sync
// HA2 (Data Link)   : Active conntrack state tables, IPS session states, TCP sequence tracking`
  },
  {
    id: 30,
    question: "Synthesize the overarching role of Next-Generation Firewalls (NGFW) in modern Zero Trust enterprise defense architectures.",
    shortAnswer: "NGFWs are the central enforcement point of Zero Trust perimeters, replacing insecure port assumptions with granular App-ID classification, Active Directory User-ID verification, and unified Content-ID threat prevention in a high-speed Single-Pass architecture.",
    explanation: "In an era of ubiquitous encryption and evasive malware, traditional port-based firewalls are obsolete. NGFWs enforce 'Never Trust, Always Verify' across every network transaction, ensuring that only authenticated users running approved business applications can transmit clean, threat-free data across the enterprise perimeter.",
    hint: "The central Zero Trust enforcement engine combining Application, Identity, and Threat inspection.",
    level: "Moderate",
    codeExample: `// The Master NGFW Security Formula:
// Zero Trust Enforcement = [App-ID (No Port Trust)] + [User-ID (Identity-Driven)] + [Content-ID (Single-Pass Threat Defense)] + [Hardware SSL Decryption]`
  }
];

export default questions;
