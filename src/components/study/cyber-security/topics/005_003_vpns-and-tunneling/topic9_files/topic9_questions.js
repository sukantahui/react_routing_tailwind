const questions = [
  {
    id: 1,
    question: "What is the foundational architectural flaw of traditional 'Castle-and-Moat' VPNs that Zero Trust Network Access (ZTNA) solves?",
    shortAnswer: "Traditional VPNs grant broad Network-Layer (Layer 3/4) subnet access upon successful authentication, allowing any compromised endpoint or stolen credential to scan and pivot laterally across the entire corporate network; ZTNA enforces strict Application-Layer (Layer 7) micro-segmentation, granting access only to specific authorized applications.",
    explanation: "Under the castle-and-moat model, the VPN assumes that everything inside the perimeter is trustworthy. Once an employee authenticates, they are assigned an internal IP address (e.g., 10.14.0.45) with routability to thousands of internal servers. ZTNA replaces implicit network trust with zero implicit trust: users are never placed on the corporate network and only establish micro-tunnels to individual authorized applications.",
    hint: "Think about the difference between giving a visitor a master key to the entire building versus escorting them to one specific locked meeting room.",
    level: "Basic",
    codeExample: `// Traditional VPN Access Model:
// User connects ➔ Receives IP 10.14.0.88 ➔ Can ping/probe entire 10.14.0.0/16 subnet!

// ZTNA Access Model:
// User authenticates ➔ Zero intranet IP assigned ➔ Micro-proxy binds ONLY to https://jira.internal:443`
  },
  {
    id: 2,
    question: "What is the 'Dark Cloud' (or 'Dark Application') principle in ZTNA architectures?",
    shortAnswer: "Internal corporate applications and connectors initiate outbound-only connections to the cloud ZTNA broker, keeping zero inbound listening ports open on the public internet and making internal assets completely invisible to Shodan and automated port scanners.",
    explanation: "Traditional VPN concentrators must listen on public IP addresses on ports 443 or 500/4500, exposing them to internet-wide port scans, DDoS attacks, and zero-day remote code execution exploits. In ZTNA, internal App Connectors establish outbound TLS/WebSocket tunnels to the ZTNA cloud broker. Because no inbound ports are open on enterprise firewalls, external scans show zero open ports.",
    hint: "If a server never opens an incoming door on the internet, attackers cannot find it or knock on it.",
    level: "Moderate",
    codeExample: `// External Nmap Scan against ZTNA Protected Enterprise:
$ nmap -sS -Pn -p 1-65535 203.0.113.50
// Output: All 65,535 scanned ports are closed/filtered. (100% Dark & Invisible on Shodan!)`
  },
  {
    id: 3,
    question: "How does the Software-Defined Perimeter (SDP) architecture separate the 'Control Plane' from the 'Data Plane' in ZTNA?",
    shortAnswer: "The Control Plane (ZTNA Trust Broker) handles identity authentication, device posture verification, and policy decisions; the Data Plane (Application Connectors / Gateways) transports encrypted application payloads directly without ever exposing network routing.",
    explanation: "By decoupling policy decision points (PDP) from policy enforcement points (PEP), the ZTNA architecture ensures that users cannot even discover or attempt a connection to an application until the centralized Identity Broker has verified user credentials, multi-factor authentication, and device health.",
    hint: "The security guard checks your ID and badge (Control Plane) before the door unlocks to let you enter (Data Plane).",
    level: "Moderate",
    codeExample: `// SDP Architecture Flow:
// [Client Device] ──(1. Auth & Posture Check)──> [ZTNA Trust Broker (Control Plane)]
//                                                         │ (2. Access Granted Token)
//                                                         ▼
// [Client Device] <──(3. Ephemeral mTLS Data Tunnel)──> [App Connector (Data Plane)] ──> [Target App]`
  },
  {
    id: 4,
    question: "What is the 'Blast Radius' of a compromised user account in Traditional VPN versus ZTNA?",
    shortAnswer: "In a Traditional VPN, the blast radius is the entire enterprise subnet (e.g., 65,534 IP addresses); in ZTNA, the blast radius is strictly restricted to the specific individual applications assigned to that exact user role.",
    explanation: "If an adversary compromises a contract developer's credentials on a traditional VPN, they can run `nmap` subnet sweeps, exploit unpatched SMB servers, and attempt credential dumping across financial and SCADA servers. In ZTNA, the attacker cannot see, ping, or route to any server other than the specific Git repo or Jira portal assigned to that contractor.",
    hint: "Blast radius measures how much damage an explosion causes: an entire building (VPN) versus a single fireproof lockbox (ZTNA).",
    level: "Basic",
    codeExample: `// Blast Radius Comparison:
// Traditional VPN: Compromise 1 account ➔ Exposure of 10.14.0.0/16 (65,534 hosts at risk)
// ZTNA           : Compromise 1 account ➔ Exposure of ONLY 'git.internal' (1 host at risk)`
  },
  {
    id: 5,
    question: "What is the difference between 'Endpoint-Initiated' (Client-Based) and 'Service-Initiated' (Clientless) ZTNA?",
    shortAnswer: "Endpoint-Initiated ZTNA requires a lightweight software agent on the device to intercept traffic and create micro-tunnels; Service-Initiated ZTNA is agentless, allowing users to access internal web/SSH/RDP apps directly through standard web browsers via reverse proxy sandboxes.",
    explanation: "Endpoint-Initiated ZTNA (e.g., Zscaler ZPA agent, Cloudflare WARP) is ideal for full-time employee laptops where deep device posture (BitLocker, EDR, registry keys) must be audited. Service-Initiated ZTNA is ideal for third-party vendors, contractors, and BYOD smartphones where IT cannot install agents.",
    hint: "Client-based uses a software app installed on the laptop; Clientless works directly inside Google Chrome or Microsoft Edge.",
    level: "Moderate",
    codeExample: `// Endpoint-Initiated: Local Agent intercepts OS socket requests (Supports any TCP/UDP app)
// Service-Initiated : Browser navigates to https://portal.company.com/app (Supports HTTP, SSH, RDP)`
  },
  {
    id: 6,
    question: "What is 'Continuous Adaptive Risk and Trust Assessment' (CARTA) and how does it differ from one-time VPN authentication?",
    shortAnswer: "CARTA continuously inspects identity, device health posture, behavioral anomalies, and geolocation throughout the active session, terminating access instantly if risk thresholds are breached; VPNs only authenticate once at initial login.",
    explanation: "In traditional VPNs, if an employee logs in at 9:00 AM and later disables their antivirus, connects to a malicious USB device, or has their session hijacked, the VPN remains fully connected all day. ZTNA continuously monitors telemetry (e.g., CrowdStrike Falcon score, impossible travel) and revokes access dynamically.",
    hint: "Continuous verification is like a security guard who watches your badge throughout the day, rather than just stamping your hand at the front gate.",
    level: "Expert",
    codeExample: `// CARTA Dynamic Revocation Example:
// 09:00 AM: User logs in from Kolkata (Device Healthy) ➔ Access GRANTED to ERP
// 10:15 AM: User disables EDR Antivirus ➔ ZTNA receives webhook ➔ ERP Micro-Tunnel TERMINATED INSTANTLY!`
  },
  {
    id: 7,
    question: "Why have public-facing VPN gateways (Ivanti, Pulse Secure, Fortinet, Citrix) become the #1 initial access vector for ransomware gangs?",
    shortAnswer: "Because they operate as public-facing monolithic network appliances with root-level operating system privileges, listening openly on the internet where unauthenticated remote code execution (RCE) vulnerabilities can be exploited globally.",
    explanation: "Flaws like CVE-2023-46805 (Ivanti) and CVE-2023-3519 (Citrix ADC) allow attackers to bypass authentication and execute shell commands directly on the VPN hardware appliance. Because the appliance sits on the network perimeter with interfaces into both the public internet and private LAN, exploiting it gives attackers immediate root access to the intranet.",
    hint: "Public hardware boxes sitting on the front line of the internet are constantly bombarded by automated exploit scripts.",
    level: "Expert",
    codeExample: `// Exploitation Flow of Public VPN Gateways:
// Attacker on Internet ➔ Scans Shodan for Port 443 ➔ Sends CVE-2023-46805 Exploit Payload
// ➔ Gains Root Shell on Gateway Hardware ➔ Dumps all Active AD User Credentials from RAM!`
  },
  {
    id: 8,
    question: "How does ZTNA integrate with modern Identity Providers (IdP) using SAML 2.0 and OpenID Connect (OIDC)?",
    shortAnswer: "ZTNA offloads all user authentication to centralized cloud IdPs (such as Microsoft Entra ID or Okta), enforcing FIDO2 passkeys, conditional access policies, and biometric MFA before issuing cryptographically signed JWT access tokens.",
    explanation: "Instead of managing local user accounts or insecure RADIUS/LDAP passwords on individual VPN appliances, ZTNA delegates authentication to the IdP. The IdP verifies user identity, evaluates conditional access signals (e.g., device compliance), and returns a signed JSON Web Token (JWT) authorizing specific application scopes.",
    hint: "Using Okta or Azure AD Single Sign-On with multi-factor authentication to unlock specific apps.",
    level: "Moderate",
    codeExample: `// ZTNA JWT Access Token Claims:
{
  "sub": "USR-DEB-703",
  "name": "Debangshu",
  "role": "DEVELOPER_CONTRACTOR",
  "aud": "https://git.internal.corp",
  "exp": 1756003200,
  "mfa_verified": true,
  "device_posture_score": 98
}`
  },
  {
    id: 9,
    question: "How does ZTNA prevent 'Lateral Movement' using Mutual TLS (mTLS) and ephemeral micro-tunnels?",
    shortAnswer: "By establishing dedicated, short-lived encrypted tunnels between the client and a single application socket, preventing the endpoint from establishing Layer 3/4 connections to any neighboring IP addresses.",
    explanation: "In ZTNA, micro-tunnels are point-to-application, not point-to-network. The client agent uses ephemeral mTLS certificates with short lifespans (e.g., 60 minutes) to proxy requests strictly to `app.internal.corp:443`. If malware on the client attempts to send an ARP request or TCP SYN to `10.14.20.15`, the OS kernel drops the packet because no network route exists.",
    hint: "A direct private tunnel created just for one application that vanishes as soon as you finish your work.",
    level: "Expert",
    codeExample: `// ZTNA Micro-Tunnel Architecture:
// [Client App] ──(Ephemeral mTLS)──> [ZTNA Edge PoP] ──(Outbound WireGuard)──> [Connector] ──> [App Socket]`
  },
  {
    id: 10,
    question: "What specific 'Device Health Posture' metrics are evaluated by ZTNA endpoint agents before granting application access?",
    shortAnswer: "Full disk encryption status (BitLocker/FileVault), EDR agent operational health, OS security patch age (< 30 days), firewall status, presence of client certificates, and absence of jailbreak/rooting.",
    explanation: "Before a micro-tunnel is spun up, the ZTNA agent executes local health checks. If an employee's laptop has disabled its local firewall or is running an outdated operating system with known zero-days, the ZTNA broker automatically denies access or redirects the user to a self-remediation portal.",
    hint: "Checking that the laptop has disk locks on, antivirus running, and latest updates installed before letting it connect.",
    level: "Basic",
    codeExample: `// Device Posture Assessment Script (PowerShell):
Get-BitLockerVolume -MountPoint "C:" | Select-Object ProtectionStatus
Get-Service -Name "WinDefend" | Select-Object Status
Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 1`
  },
  {
    id: 11,
    question: "How does 'Impossible Travel' detection operate within a Zero Trust continuous authentication engine?",
    shortAnswer: "By calculating the geographic distance and elapsed time between successive user logins; if the required transit speed exceeds commercial aircraft capabilities (e.g., > 900 km/h), the session is flagged as hijacked and blocked.",
    explanation: "If user Susmita logs in from Barrackpore, West Bengal at 10:00 AM, and a second request with her session token originates from Frankfurt, Germany at 10:20 AM, the ZTNA engine calculates a required travel speed of over 20,000 km/h, triggering an immediate session revocation and high-priority SOC alert.",
    hint: "If you log in from Kolkata and 15 minutes later log in from London, the system knows a hacker stole your account.",
    level: "Moderate",
    codeExample: `// Impossible Travel Logic:
// Location 1: Kolkata (22.5726° N, 88.3639° E) @ 10:00 AM
// Location 2: London (51.5074° N, 0.1278° W) @ 10:25 AM
// Distance = 7,950 km | Time = 0.41 Hours ➔ Speed = 19,390 km/h ➔ ANOMALY DETECTED: SESSION TERMINATED!`
  },
  {
    id: 12,
    question: "Can ZTNA protect legacy client-server protocols like SSH, RDP, and thick-client SQL databases?",
    shortAnswer: "Yes; modern ZTNA platforms use endpoint agents that intercept specific TCP/UDP socket traffic or provide web-based HTML5 bastions that proxy SSH and RDP securely without exposing raw ports to the internet.",
    explanation: "While early ZTNA solutions focused exclusively on HTTP/HTTPS web apps, modern enterprise ZTNA supports non-HTTP legacy protocols. The endpoint agent creates an authenticated Layer 4 micro-tunnel for `ssh admin@server.internal:22` or `rdp.internal:3389` while keeping the underlying network dark.",
    hint: "Modern Zero Trust tools can tunnel remote desktop (RDP) and terminal (SSH) sessions just as easily as websites.",
    level: "Moderate",
    codeExample: `// ZTNA Non-Web Configuration:
// Application: "Core Oracle Database"
// Protocol: TCP Port 1521
// Target FQDN: db-oracle.internal.corp
// Micro-Tunnel: Agent intercepts localhost:1521 ➔ Proxies securely over mTLS to ZTNA Connector.`
  },
  {
    id: 13,
    question: "What is the difference between 'North-South' ZTNA and 'East-West' Micro-Segmentation?",
    shortAnswer: "North-South ZTNA governs access from external remote users into enterprise applications; East-West Micro-Segmentation governs lateral communication between servers and containers inside the datacenter or cloud VPC.",
    explanation: "ZTNA secures the perimeter by ensuring remote workers only reach designated internal apps (North-South). Once inside the datacenter, East-West micro-segmentation (via host firewalls, service meshes, or SDN) ensures that a compromised web server cannot communicate with adjacent database servers unless explicitly authorized.",
    hint: "North-South is users coming in from the outside; East-West is servers talking to other servers inside the datacenter.",
    level: "Expert",
    codeExample: `// North-South (ZTNA): Remote Worker (Kolkata) ➔ [ZTNA Broker] ➔ Web Server (Barrackpore)
// East-West (Micro-Segmentation): Web Server ➔ [Host Firewall Rules] ➔ Database Server`
  },
  {
    id: 14,
    question: "How does Secure Access Service Edge (SASE) integrate ZTNA with Cloud Access Security Brokers (CASB) and Secure Web Gateways (SWG)?",
    shortAnswer: "SASE unites ZTNA (for private corporate applications), CASB (for public SaaS like Microsoft 365/Salesforce), and Cloud SWG (for safe internet web browsing) into a single unified cloud-delivered edge architecture.",
    explanation: "Rather than forcing IT teams to purchase and manage separate VPN appliances, web proxies, DLP systems, and cloud firewalls, SASE combines them into a single software agent and globally distributed cloud backbone, enforcing consistent Zero Trust policies across private apps, SaaS, and the open web.",
    hint: "SASE is the complete security package: ZTNA for company apps + CASB for cloud apps + SWG for general web browsing.",
    level: "Expert",
    codeExample: `// SASE Unified Traffic Engine:
// 1. Destination = internal.corp ➔ Route via ZTNA Micro-Tunnel (Least Privilege)
// 2. Destination = sharepoint.com ➔ Route via CASB (DLP & Tenant Restriction)
// 3. Destination = general-web.com ➔ Route via Cloud SWG (Threat & Malware Filtering)`
  },
  {
    id: 15,
    question: "What are the financial TCO (Total Cost of Ownership) advantages of migrating from Hardware VPNs to Cloud ZTNA in INR (₹)?",
    shortAnswer: "ZTNA eliminates expensive datacenter hardware appliance refresh cycles (₹15–30 Lakhs), costly symmetric WAN internet leased lines (₹20–40 Lakhs/yr), and public IP block maintenance, replacing them with predictable per-user SaaS subscriptions.",
    explanation: "Hardware VPNs require multi-gigabit datacenter internet pipes to support traffic hairpinning, redundant hardware concentrators for High Availability, and ongoing maintenance contracts. ZTNA offloads all infrastructure to distributed cloud PoPs, saving enterprises 40% to 65% in annual infrastructure costs.",
    hint: "Stop buying expensive metal server boxes and huge office internet connections; pay a simple monthly software subscription instead.",
    level: "Moderate",
    codeExample: `// Annual Cost Comparison (1,000 Remote Users):
// Hardware VPN TCO = Gateway Appliances (₹18L) + Leased Lines (₹24L/yr) + Mgmt (₹6L) = ₹48 Lakhs/yr
// Cloud ZTNA TCO   = 1,000 users × ₹350/mo × 12 = ₹42 Lakhs/yr (Zero hardware refresh costs!)`
  },
  {
    id: 16,
    question: "How does ZTNA eliminate the need for complicated 'Network Subnet Re-IPing' during Corporate Mergers and Acquisitions (M&A)?",
    shortAnswer: "Because ZTNA connects users to applications by FQDN over Layer 7 rather than routing Layer 3 subnets, overlapping IP ranges (such as two companies both using `192.168.1.0/24` or `10.0.0.0/8`) can coexist without routing conflicts.",
    explanation: "In traditional VPN mergers, if Company A and Company B both use `10.100.0.0/16`, network engineers must spend months re-IPing subnets and configuring complex NAT rules. ZTNA App Connectors simply resolve local domain names and proxy payloads over outbound TLS, bypassing IP address collisions entirely.",
    hint: "Two companies with the exact same internal IP numbers can connect instantly without changing a single IP address.",
    level: "Expert",
    codeExample: `// M&A Overlapping Subnets:
// Company A: ERP on 10.0.1.50 (erp.comp-a.internal)
// Company B: CRM on 10.0.1.50 (crm.comp-b.internal)
// ZTNA Connector resolves FQDN locally ➔ Zero IP collision! Both apps accessible simultaneously.`
  },
  {
    id: 17,
    question: "What is 'Agentless Remote Browser Isolation' (RBI) and how does it enhance Service-Initiated ZTNA for third-party contractors?",
    shortAnswer: "The internal web application is rendered inside an isolated cloud container that streams only sanitized visual pixels to the contractor's browser, preventing files, clipboard data, or malware from ever touching the unmanaged device.",
    explanation: "When external vendors or auditors access sensitive financial portals, standard browser access allows them to download files or execute malicious scripts. Remote Browser Isolation runs the real browser in a secure cloud sandbox and streams an interactive video feed (DOM/WebRTC pixels) to the user, ensuring zero data rests on the contractor's machine.",
    hint: "Like watching an interactive video of a computer screen rather than letting real files download to your laptop.",
    level: "Expert",
    codeExample: `// Remote Browser Isolation Flow:
// [Contractor Laptop] <──(Visual WebRTC Pixels Only)──> [Cloud RBI Container] <──(Raw HTML/Data)──> [Internal Database]`
  },
  {
    id: 18,
    question: "How does ZTNA handle real-time Voice over IP (VoIP) and UDP traffic compared to traditional VPNs?",
    shortAnswer: "Modern ZTNA agents support native UDP tunneling over lightweight protocols (like WireGuard/Noise or DTLS), routing real-time voice and video streams directly to the nearest cloud edge PoP without introducing datacenter latency.",
    explanation: "Early ZTNA solutions only proxied TCP traffic, forcing real-time UDP audio/video into TCP tunnels (which suffer from TCP Meltdown under packet loss). Modern ZTNA platforms use UDP-based encapsulation (e.g., QUIC or WireGuard) to provide ultra-low jitter and high call quality for remote workers.",
    hint: "Using fast UDP tunnels instead of slow TCP proxies so video and phone calls do not stutter or freeze.",
    level: "Moderate",
    codeExample: `// UDP Micro-Tunnel Protocol:
// Voice Traffic ➔ ZTNA Client ➔ DTLS / WireGuard UDP Port 51820 ➔ Outbound Cloud Edge ➔ VoIP Server`
  },
  {
    id: 19,
    question: "What is a 'Zero Trust App Connector' and how does it achieve High Availability (HA) without inbound load balancers?",
    shortAnswer: "A lightweight Linux/Windows virtual machine or Docker container deployed inside the internal network that establishes multiple outbound-only encrypted tunnels to redundant cloud ZTNA edge nodes in an active-active cluster.",
    explanation: "In traditional VPNs, HA requires deploying pairs of expensive hardware appliances with VRRP and public VIP addresses. In ZTNA, administrators simply deploy two or more App Connectors inside the datacenter. Both connect outbound to the cloud broker; if one connector crashes, the cloud automatically routes traffic through the surviving connector instantly.",
    hint: "Installing two lightweight software workers inside your server room that both reach out to the cloud for redundancy.",
    level: "Moderate",
    codeExample: `// Docker Run ZTNA Connector:
docker run -d --name ztna-connector --restart always \
  -e TOKEN="ey...ZTNA_CONNECTOR_PROVISIONING_TOKEN" \
  cloud-security/ztna-connector:latest`
  },
  {
    id: 20,
    question: "How does ZTNA improve the remote employee User Experience (UX) compared to legacy VPN software?",
    shortAnswer: "ZTNA operates transparently in the background without requiring manual connect/disconnect button clicks, eliminating login prompts, slow VPN tunnel initializations, and frustrating dropped connections during Wi-Fi roaming.",
    explanation: "Traditional VPN clients require users to open an app, select a gateway, enter credentials, complete MFA, and wait 30 seconds for tunnel negotiation. ZTNA runs as a lightweight OS service; when the user clicks an internal link (e.g., Jira), the micro-tunnel establishes silently in milliseconds.",
    hint: "Zero Trust works automatically behind the scenes so users never have to click 'Connect to VPN' again.",
    level: "Basic",
    codeExample: `// User Workflow:
// Legacy VPN: Open Client ➔ Select 'Barrackpore-GW' ➔ Click Connect ➔ Enter MFA ➔ Wait 20s ➔ Open Browser
// ZTNA      : Open Browser ➔ Navigate to https://payroll.internal ➔ Page loads instantly!`
  },
  {
    id: 21,
    question: "What are the Five Pillars of the CISA Zero Trust Maturity Model (ZTMM)?",
    shortAnswer: "1. Identity, 2. Devices, 3. Networks, 4. Applications & Workloads, and 5. Data; supported by Cross-Cutting capabilities in Visibility & Analytics, Automation & Orchestration, and Governance.",
    explanation: "The Cybersecurity and Infrastructure Security Agency (CISA) defines a roadmap for organizations transitioning from traditional perimeter defense to optimal Zero Trust. The model evaluates progress across all five pillars from 'Traditional' (static passwords/VPNs) to 'Optimal' (continuous real-time telemetry, automated micro-segmentation, and dynamic encryption).",
    hint: "Identity, Devices, Networks, Applications, and Data.",
    level: "Moderate",
    codeExample: `// CISA ZTMM Five Pillars:
// 1. Identity    : Phishing-resistant MFA (FIDO2) + Conditional Access
// 2. Devices     : Real-time EDR posture + Automated Quarantine
// 3. Networks    : Software-Defined Perimeter (SDP) + No Open Inbound Ports
// 4. Applications: Layer 7 Micro-tunnels + Continuous Authorization
// 5. Data        : Real-time DLP + Automated Classification & Encryption`
  },
  {
    id: 22,
    question: "How does ZTNA provide superior granular forensic audit logging compared to Traditional VPNs?",
    shortAnswer: "ZTNA logs every individual Layer 7 transaction (exact user, authenticated app, specific URL path, HTTP method, and payload size), whereas traditional VPNs only log Layer 3/4 network connection handshakes (source IP, destination IP, port).",
    explanation: "A VPN log only records: `User Mamata connected to 10.14.0.5:443`. It cannot tell what data Mamata viewed or downloaded. A ZTNA log records: `User Mamata accessed GET /api/v2/payroll/salaries/august.pdf at 10:14:02 AM with Device Score 99`. This granular visibility provides immediate evidence for SOC investigations.",
    hint: "VPN only sees what room you entered; ZTNA records every single file you touched inside that room.",
    level: "Moderate",
    codeExample: `// ZTNA Granular JSON Audit Log:
{
  "timestamp": "2026-08-23T10:14:02Z",
  "user": "mamata@barrackpore-hub.gov.in",
  "app": "Municipal Property Tax Core",
  "url": "https://tax-core.internal.corp/records/export?year=2026",
  "method": "GET",
  "response_code": 200,
  "bytes_transferred": 1450200,
  "device_posture": "COMPLIANT_BITLOCKER_ACTIVE",
  "action": "ALLOWED"
}`
  },
  {
    id: 23,
    question: "What is the 'Double Encryption / TLS Inspection' dilemma in ZTNA and how is it resolved?",
    shortAnswer: "When internal applications already use HTTPS (TLS), a ZTNA proxy wrapping the traffic in another TLS micro-tunnel cannot inspect payloads for DLP/malware without performing authorized TLS forward-proxy termination and re-encryption.",
    explanation: "To scan for data exfiltration or malware within HTTPS streams, enterprise ZTNA brokers perform TLS Termination: the broker decrypts the outer client connection, scans the payload using Cloud DLP and antivirus engines, and re-encrypts the connection to the internal App Connector using an enterprise certificate authority.",
    hint: "Opening the outer envelope to check for dangerous contents before sealing it in a fresh envelope to the final destination.",
    level: "Expert",
    codeExample: `// ZTNA TLS Inspection Flow:
// [Client] ──(TLS 1.3)──> [ZTNA Cloud Proxy (DLP & Antivirus Scan)] ──(Re-encrypted TLS 1.3)──> [App Connector] ──> [Server]`
  },
  {
    id: 24,
    question: "How does ZTNA prevent 'Credential Stuffing' and automated brute-force attacks against enterprise login portals?",
    shortAnswer: "By enforcing passwordless FIDO2/WebAuthn hardware passkeys, contextual device posture requirements, and automated risk-based CAPTCHA / IP rate-limiting at the cloud identity layer before any connection reaches internal systems.",
    explanation: "Because internal applications are 100% dark to the internet, attackers cannot launch dictionary attacks against internal Apache/Tomcat login forms. All authentication occurs at the cloud identity broker, which automatically blocks credential dumps using hardware-bound public-key cryptography (passkeys).",
    hint: "Attackers cannot brute-force internal servers because the internal servers are hidden, and the cloud login requires physical passkeys.",
    level: "Moderate",
    codeExample: `// FIDO2 WebAuthn Passwordless Auth:
// User authenticates with physical YubiKey or fingerprint biometric ➔ 100% immune to password stuffing & phishing!`
  },
  {
    id: 25,
    question: "What is the 'Phased Migration Strategy' for moving an enterprise from legacy VPN to ZTNA without disrupting operations?",
    shortAnswer: "Phase 1: Deploy ZTNA for third-party contractors and BYOD workers; Phase 2: Migrate high-volume web and collaboration apps to ZTNA; Phase 3: Transition thick-client legacy apps; Phase 4: Decommission the hardware VPN concentrator.",
    explanation: "Attempting a sudden cutover risks breaking critical legacy applications. Starting with external contractors eliminates the highest-risk attack vector immediately. Once internal web apps (Git, Jira, ERP) are verified on ZTNA, full-time employees are migrated, and the public-facing VPN gateway is permanently powered down.",
    hint: "Migrate contractors first, then internal web tools, then legacy tools, and finally turn off the old VPN hardware.",
    level: "Moderate",
    codeExample: `// Migration Roadmap:
// Q1: Deploy Clientless ZTNA for 100 Contractors (Isolate 10.14.0.0/16 subnet)
// Q2: Roll out ZTNA Agent to 500 Employee Laptops for Web ERP & Jira
// Q3: Configure ZTNA TCP/UDP Micro-tunnels for Legacy SSH & Oracle DB
// Q4: Power down Cisco/Fortinet VPN Concentrator (Close all inbound public ports!)`
  },
  {
    id: 26,
    question: "How does ZTNA handle 'Shadow IT' and unauthorized cloud SaaS usage?",
    shortAnswer: "When integrated with Cloud Access Security Broker (CASB) capabilities, the ZTNA agent intercepts outbound web requests, enforces tenant restrictions (e.g., blocking personal Gmail on company laptops), and alerts on unapproved file sharing sites.",
    explanation: "Because the ZTNA agent sits at the endpoint network layer, it inspects all outbound application traffic. If an employee attempts to upload corporate code to an unauthorized personal cloud repository (e.g., personal Dropbox), CASB policies block the transfer while permitting the authorized enterprise OneDrive tenant.",
    hint: "Preventing employees from saving company secrets to their personal Google Drive or Dropbox accounts.",
    level: "Moderate",
    codeExample: `// CASB Tenant Restriction Rule:
// App: Microsoft 365
// Allowed Tenant ID: "barrackpore-hub-corp-id-458"
// Action: Block all logins to personal @outlook.com or unapproved external enterprise tenants.`
  },
  {
    id: 27,
    question: "What is 'Reverse SOCKS Proxy' attack prevention in a Zero Trust environment?",
    shortAnswer: "Because ZTNA endpoints never receive an internal IP address or broad Layer 3 routing privileges, an attacker who installs a reverse SOCKS proxy on a compromised laptop cannot tunnel subnet sweeps or arbitrary network packets into the intranet.",
    explanation: "In traditional VPNs, attackers deploy tools like `Chisel` or `Ligolo-ng` to create a reverse SOCKS proxy through the VPN virtual adapter, routing any arbitrary TCP/UDP packet from their external Command and Control (C2) server into the intranet. In ZTNA, the OS lacks an intranet default route, causing reverse proxy packets to be dropped.",
    hint: "Hackers cannot turn a compromised laptop into a tunnel to hack the rest of the company.",
    level: "Expert",
    codeExample: `// Reverse SOCKS Proxy Attack:
// Traditional VPN: [Attacker C2] ➔ [Infected Laptop with tun0] ➔ SOCKS Proxy reaches 10.14.99.1 (SCADA BREACH!)
// ZTNA           : [Attacker C2] ➔ [Infected Laptop] ➔ SOCKS Proxy fails! (No Layer 3 route to 10.14.99.1)`
  },
  {
    id: 28,
    question: "How does ZTNA support 'Dynamic Contextual Policies' based on time-of-day, risk score, and user role?",
    shortAnswer: "Policy engines evaluate rich contextual variables in real time: for example, allowing financial database access strictly between 9 AM–6 PM IST on corporate-managed laptops with risk scores below 20.",
    explanation: "Unlike static firewall rulebases that simply say `Allow 10.14.0.0/16 on Port 443`, ZTNA access rules combine identity, time, device telemetry, and location into dynamic expressions that adapt to real-time threat intelligence.",
    hint: "Rules that change based on who you are, what device you are using, what time it is, and how safe your laptop is right now.",
    level: "Basic",
    codeExample: `// Dynamic ZTNA Access Policy Rule:
// ALLOW ACCESS TO "Tax Assessment Core" IF:
//   User.Group == "Finance_Officers" AND
//   Device.Posture.BitLocker == TRUE AND
//   Device.Risk_Score < 25 AND
//   Context.Time BETWEEN 09:00 AND 18:00 IST AND
//   Context.Country == "India"`
  },
  {
    id: 29,
    question: "What is 'Self-Healing Posture Remediation' in modern ZTNA agents?",
    shortAnswer: "When an endpoint fails a health check, the ZTNA agent guides or automatically executes remediation steps (e.g., triggering Windows Update, re-enabling Defender antivirus) before re-evaluating and restoring access.",
    explanation: "Instead of simply locking the user out and generating helpdesk tickets, modern ZTNA platforms provide automated self-service workflows. The agent displays: `Access blocked: BitLocker is suspended. Click here to re-enable encryption and restore connection.` Once fixed, access is restored in seconds without IT intervention.",
    hint: "The software tells you exactly what is wrong with your laptop and helps you fix it automatically.",
    level: "Basic",
    codeExample: `// Self-Healing Workflow:
// Posture Check: Windows Defender RealTimeProtection == False
// Agent Action: Executes 'Set-MpPreference -DisableRealtimeMonitoring $false'
// Re-evaluation: Health Score updated to 100 ➔ Micro-Tunnel RESTORED!`
  },
  {
    id: 30,
    question: "What is the ultimate strategic verdict for cybersecurity leaders when deciding between Traditional VPNs and ZTNA?",
    shortAnswer: "Traditional VPNs are obsolete legacy architectures that expose organizations to catastrophic lateral movement and public vulnerability exploitation; ZTNA is the mandatory, modern standard for secure, high-performance, least-privilege enterprise access.",
    explanation: "By eliminating implicit trust, reducing the public attack surface to zero, containing compromised credentials, and delivering superior user performance through distributed cloud edge PoPs, ZTNA fulfills the core mission of modern cybersecurity: enabling secure remote productivity while minimizing risk.",
    hint: "Traditional VPNs are an outdated liability; ZTNA is the indispensable foundation of modern enterprise security.",
    level: "Basic",
    codeExample: `// Strategic Architecture Summary:
// Legacy VPN : Insecure Perimeter • Broad Subnet Access • Open Listening Ports • High WAN Costs
// Modern ZTNA: Zero Implicit Trust • Per-App Micro-Tunnels • 100% Dark Surface • Cloud Scalability`
  }
];

export default questions;
