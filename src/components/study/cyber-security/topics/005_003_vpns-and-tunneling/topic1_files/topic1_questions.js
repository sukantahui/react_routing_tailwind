const questions = [
  {
    id: 1,
    question: "Why has the traditional 'Castle-and-Moat' perimeter security model become obsolete in modern enterprise networking?",
    shortAnswer: "Because enterprise data and applications have moved to multi-cloud environments, and employees access corporate resources remotely from home, cafes, and mobile devices outside physical office firewalls.",
    explanation: "Traditional firewalls protected physical office buildings. When employees work remotely, traffic no longer originates inside the physical office, necessitating cryptographic secure remote access tunnels.",
    hint: "Because employees now work from anywhere and apps live in the cloud, physical office firewalls are no longer enough.",
    level: "Basic",
    codeExample: `// Perimeter Paradigm Shift:
// Old Model: All Workstations inside physical office building protected by single boundary firewall.
// Modern   : Roaming users + Branch offices + Cloud VPCs ➔ Requires VPN & Zero Trust Connectivity everywhere!`
  },
  {
    id: 2,
    question: "What is an 'Evil Twin' rogue Wi-Fi access point attack and how does a VPN neutralize it?",
    shortAnswer: "An adversary sets up a rogue Wi-Fi hotspot with the exact same SSID as a legitimate cafe/airport network; when a victim connects, the attacker sniffs all unencrypted traffic. A VPN encrypts 100% of payload data, preventing the rogue AP from reading anything.",
    explanation: "The victim's laptop sends packets to the rogue AP, but because every packet is encapsulated inside an AES-256-GCM encrypted tunnel, the attacker captures only indecipherable ciphertext.",
    hint: "A fake Wi-Fi network that looks real; a VPN encrypts your traffic so the fake hotspot cannot spy on you.",
    level: "Basic",
    codeExample: `// Evil Twin Neutralization:
// Victim ──> [Fake Wi-Fi AP: "Airport_Free_WiFi"] ──> Encrypted VPN Tunnel ➔ Attacker sees only Ciphertext!`
  },
  {
    id: 3,
    question: "What are the primary financial and operational advantages of Site-to-Site IPsec VPNs over traditional dedicated leased lines (MPLS / T1 / Dark Fiber)?",
    shortAnswer: "Site-to-Site IPsec VPNs run over commodity public gigabit fiber, delivering 90–95% cost reductions (e.g. ₹5,000/mo vs ₹1,50,000/mo for MPLS) with instant provisioning and flexible multi-vendor routing.",
    explanation: "Leasing dedicated physical fiber across cities is cost-prohibitive for growing businesses. IPsec provides equivalent cryptographic privacy over cheap commercial broadband connections.",
    hint: "Saving 90%+ on monthly networking bills by using normal internet with encryption instead of expensive private cables.",
    level: "Basic",
    codeExample: `// Cost Comparison (Annual per Branch):
// Dedicated MPLS Leased Line : ₹18,00,000 / year (Slow to provision, rigid)
// Dual Gigabit Fiber + IPsec:  ₹1,20,000 / year (Instant setup, 93% Savings!)`
  },
  {
    id: 4,
    question: "What is 'Host Posture Assessment' (Endpoint Health Checking) before VPN tunnel admission?",
    shortAnswer: "A security check where the VPN gateway verifies that the connecting remote laptop satisfies minimum compliance policies (active corporate EDR/antivirus, BitLocker disk encryption enabled, OS security patches up-to-date).",
    explanation: "If an employee connects from an infected personal laptop, malware could spread laterally into the corporate datacenter. Non-compliant devices are redirected to a remediation VLAN.",
    hint: "Checking that a remote computer has updated antivirus and security patches before letting it into the network.",
    level: "Moderate",
    codeExample: `// Posture Evaluation Rule:
// IF (Antivirus == "Enabled" AND BitLocker == "Active" AND OS_Build >= 22631):
//     Grant_Tunnel_Access()
// ELSE:
//     Deny_And_Remediate()`
  },
  {
    id: 5,
    question: "How does 'Man-in-the-Middle (MitM) ARP Cache Poisoning' operate on public networks and how do VPNs prevent it?",
    shortAnswer: "An attacker sends forged ARP replies to associate the gateway's IP with their own MAC address, intercepting local network traffic; a VPN uses cryptographic HMAC authentication tags that immediately detect and drop any modified packets.",
    explanation: "Even if the attacker poisons the ARP cache to physically receive the packets, the attacker cannot decrypt the AES payload or forge a valid HMAC tag, rendering the MitM attack useless.",
    hint: "Trickery that redirects local network packets to a hacker; stopped because the hacker cannot unlock the encryption.",
    level: "Moderate",
    codeExample: `// MitM Defense:
// Attacker intercepts packet ➔ Modifies payload ➔ HMAC Tag mismatch ➔ VPN Gateway DROPS packet!`
  },
  {
    id: 6,
    question: "What is 'Full Tunneling' vs 'Split Tunneling' and what security risks does Split Tunneling introduce?",
    shortAnswer: "Split tunneling routes only corporate subnet traffic through the VPN, allowing general internet browsing to go directly through the local ISP. The risk is 'Dual-Homing': malware downloaded from the internet can pivot across the open VPN tunnel into the enterprise.",
    explanation: "If a remote worker browses a compromised website on their unmonitored home connection, an infostealer can compromise the device and use the active VPN tunnel as a backdoor into the corporate datacenter.",
    hint: "Split tunneling lets personal browsing skip the company filter, creating a risk that viruses sneak into the company.",
    level: "Moderate",
    codeExample: `// Dual-Homed Pivot Hazard:
// Internet Malware ──> [Compromised Laptop (Home)] ──(Open VPN Tunnel)──> Corporate Datacenter Server!`
  },
  {
    id: 7,
    question: "What is 'Credential Stuffing' against enterprise VPN login gateways and how is it mitigated?",
    shortAnswer: "Automated bots replaying millions of username/password pairs stolen from third-party data breaches against corporate VPN portals; mitigated by enforcing Multi-Factor Authentication (MFA), IP rate-limiting, and CAPTCHAs.",
    explanation: "Because users frequently reuse passwords, attackers use credential stuffing to breach single-factor VPNs. Enforcing FIDO2/WebAuthn hardware security keys or push MFA blocks 99.9% of automated attacks.",
    hint: "Hackers using stolen password lists to break into VPNs; stopped by requiring a phone approval code (MFA).",
    level: "Basic",
    codeExample: `// MFA Defense:
// Bot submits valid stolen password ➔ VPN Gateway prompts for FIDO2 Hardware Key ➔ Attack BLOCKED!`
  },
  {
    id: 8,
    question: "What is 'Bandwidth Aggregation and Redundant Failover' in modern Site-to-Site SD-WAN VPNs?",
    shortAnswer: "Bonding multiple commodity ISP links (e.g. Fiber + 5G Cellular) into a single virtual IPsec tunnel, automatically steering critical traffic to the lowest-latency path and failing over in milliseconds if one ISP suffers an outage.",
    explanation: "Instead of relying on a single expensive leased line that can be cut by road construction, SD-WAN VPNs combine two cheap broadband lines with cellular backup for 99.999% uptime.",
    hint: "Combining two internet lines together so if one gets cut, the VPN switches to the second line instantly.",
    level: "Moderate",
    codeExample: `// SD-WAN Link Steering:
// Primary Link: Airtel Gigabit Fiber (Active, 12ms latency)
// Backup Link : Jio 5G Cellular (Hot Standby ➔ Auto-Failover in 50ms)`
  },
  {
    id: 9,
    question: "What is 'Session Hijacking / Cookie Sniffing' on unprotected HTTP connections over public Wi-Fi?",
    shortAnswer: "Capturing unencrypted session cookies (like `JSESSIONID` or `PHPSESSID`) transmitted in cleartext over HTTP and injecting them into the attacker's browser to access the victim's account without a password.",
    explanation: "Historical tools like Firesheep automated cookie theft on open Wi-Fi. VPN tunnels wrap all network traffic in cryptographic headers, preventing eavesdroppers from intercepting cookies.",
    hint: "Stealing an active login cookie over open Wi-Fi; prevented by encrypting the whole connection with a VPN.",
    level: "Basic",
    codeExample: `// Cookie Hijacking Exposure:
// Unprotected: GET /profile HTTP/1.1 | Cookie: session_token=SECRET_991 (Sniffed by Wireshark!)
// VPN Tunnel : Encrypted inside ESP ➔ Completely hidden from Wi-Fi sniffers!`
  },
  {
    id: 10,
    question: "What is 'BGP over IPsec' in multi-branch enterprise site-to-site architectures?",
    shortAnswer: "Running the Border Gateway Protocol (BGP) routing protocol inside encrypted Virtual Tunnel Interfaces (VTIs) to automatically distribute internal subnet routes and dynamically adapt to network topology changes.",
    explanation: "When a new subnet is added in the Barrackpore office, BGP automatically announces the route through the IPsec tunnel to Kolkata HQ without requiring network engineers to manually edit static routing tables on 50 routers.",
    hint: "Letting branch office routers automatically learn new network paths through encrypted tunnels.",
    level: "Expert",
    codeExample: `// BGP over IPsec:
// router bgp 65001
//  neighbor 172.16.1.2 remote-as 65002 (BGP peering established across IPsec VTI Tunnel1)`
  },
  {
    id: 11,
    question: "Why is 'Cleartext Protocol Deprecation' (Telnet, FTP, HTTP) necessary even when a VPN is deployed?",
    shortAnswer: "To implement Defense-in-Depth; if an internal lateral movement attack or misconfigured split tunnel occurs, application-layer encryption (SSH, SFTP, HTTPS) provides a secondary protective layer.",
    explanation: "A VPN encrypts the transport pipe, but relying solely on network encryption violates zero-trust principles. All internal applications should enforce TLS 1.3 encryption even inside the VPN.",
    hint: "Using both VPN encryption and application HTTPS encryption so you have double layers of security.",
    level: "Moderate",
    codeExample: `// Defense-in-Depth Principle:
// Outer Layer: IPsec ESP Tunnel (Network Encryption)
// Inner Layer: HTTPS / SSH (Application Encryption) ➔ Double-Layer Zero-Trust Protection!`
  },
  {
    id: 12,
    question: "What is 'Dynamic DNS (DDNS) Integration' for remote branch offices without static public IP addresses?",
    shortAnswer: "Using a DDNS client on the branch router to automatically update a public domain name (e.g. `barrackpore-branch.corp.org`) whenever the local ISP changes the router's dynamic public IP address.",
    explanation: "Residential broadband lines frequently rotate IP addresses. DDNS ensures the central headquarters VPN gateway can always locate and maintain the Site-to-Site IPsec tunnel.",
    hint: "Automatically updating a domain name so your office VPN stays connected even when the internet IP changes.",
    level: "Basic",
    codeExample: `// DDNS IPsec Configuration:
// crypto ipsec profile BranchProfile
//  set peer barrackpore-branch.ddns.net (Resolves dynamic public IP automatically)`
  },
  {
    id: 13,
    question: "What is 'Hardware Crypto-Acceleration' (Intel AES-NI / ARM Cryptography Extensions) on VPN gateways?",
    shortAnswer: "Dedicated silicon instruction sets embedded in modern CPUs that perform AES encryption and decryption operations directly in hardware, enabling multi-gigabit throughput with near-zero CPU utilization.",
    explanation: "Software-based AES encryption consumes significant CPU power, limiting throughput to ~200 Mbps. Hardware AES-NI instructions accelerate throughput to 10+ Gbps per server node.",
    hint: "Special computer chips that do encryption super fast without slowing down the main processor.",
    level: "Moderate",
    codeExample: `// Checking AES-NI Support in Linux:
// grep -m1 -o 'aes' /proc/cpuinfo ➔ "aes" (Confirmed Hardware Crypto-Acceleration Available!)`
  },
  {
    id: 14,
    question: "What is 'Clientless Web SSL-VPN Reverse Proxying' and when is it appropriate?",
    shortAnswer: "Providing secure remote access to internal corporate web portals (intranet, webmail) via standard HTTPS in any web browser without installing client software on the user's computer.",
    explanation: "Clientless SSL-VPN is ideal for third-party vendors or temporary contractors who are not allowed to install corporate VPN software on their personal machines.",
    hint: "Accessing company web apps through a browser without installing any VPN software.",
    level: "Basic",
    codeExample: `// Clientless SSL-VPN URL Rewriting:
// Contractor visits: https://vpn.corp.com/portal/ ➔ Gateway securely renders internal http://intranet.local`
  },
  {
    id: 15,
    question: "What is 'Privileged Access Management (PAM) Integration' with Remote Access VPNs?",
    shortAnswer: "Requiring database administrators and DevOps engineers to authenticate through a PAM vault (e.g. CyberArk / HashiCorp Boundary) that injects one-time ephemeral credentials and records complete session videos.",
    explanation: "Rather than giving engineers permanent root passwords over the VPN, PAM grants just-in-time access and records every command typed during the remote session for compliance audits.",
    hint: "A secure vault that gives engineers temporary passwords and records their screen while working remotely.",
    level: "Moderate",
    codeExample: `// PAM Ephemeral Credential:
// Engineer requests SSH access ➔ PAM issues 30-minute temporary certificate ➔ Session video recorded!`
  },
  {
    id: 16,
    question: "What is 'VPN Concentrator Load Balancing' using DNS round-robin or Global Server Load Balancing (GSLB)?",
    shortAnswer: "Distributing incoming remote worker connections across multiple geographically dispersed VPN gateways based on geographic proximity, gateway server load, and link availability.",
    explanation: "A remote worker in Kolkata is automatically routed to the Mumbai gateway, while an employee in London connects to Frankfurt, minimizing latency and balancing datacenter workloads.",
    hint: "Connecting remote workers to the closest and fastest available VPN server automatically.",
    level: "Moderate",
    codeExample: `// GSLB Geolocation Routing:
// Query: vpn.corp.com from Kolkata IP ➔ Returns: 198.51.100.10 (Mumbai Datacenter - 15ms latency)`
  },
  {
    id: 17,
    question: "What is 'Network Access Control (NAC) 802.1X' vs Remote Access VPN?",
    shortAnswer: "802.1X NAC controls physical network port admission inside the office building; Remote Access VPN controls logical admission for remote devices connecting across the public internet.",
    explanation: "Both enforce identity authentication and device posture checks, but 802.1X operates at Layer 2 on physical switch ports, whereas VPN operates at Layer 3/4 across public IP networks.",
    hint: "802.1X is for plugging into office wall jacks; VPN is for connecting from home over the internet.",
    level: "Moderate",
    codeExample: `// Network Admission Comparison:
// Inside Office : [Physical Ethernet Port] ──(802.1X EAP-TLS)──> Corporate Switch
// Remote at Home: [Home Broadband] ──────(IPsec / WireGuard)────> Corporate VPN Gateway`
  },
  {
    id: 18,
    question: "What is 'Egress NAT Overload (PAT)' on Site-to-Site VPN gateways?",
    shortAnswer: "Translating private IP addresses from a branch office into a pool of public or routable IP addresses when communicating across the VPN or out to the internet, conserving internal IP address space.",
    explanation: "If both the branch office and headquarters accidentally used the same subnet (`192.168.1.0/24`), NAT translation on the VPN tunnel prevents overlapping subnet routing conflicts.",
    hint: "Translating IP addresses across the tunnel so overlapping network numbers don't conflict.",
    level: "Moderate",
    codeExample: `// Twice-NAT on Overlapping Subnets:
// Branch (192.168.1.5) ──[NAT: 172.31.1.5]──(IPsec Tunnel)──> HQ Server (192.168.1.50)`
  },
  {
    id: 19,
    question: "What is 'Certificate Revocation List (CRL) and OCSP Stapling' in VPN PKI authentication?",
    shortAnswer: "Real-time mechanisms used by the VPN gateway to check whether a client's digital certificate has been cancelled or revoked (e.g. if an employee leaves the company or loses their laptop).",
    explanation: "If a laptop is stolen, IT immediately revokes its certificate. The gateway queries OCSP (Online Certificate Status Protocol) and instantly denies tunnel admission even if the certificate date is still valid.",
    hint: "Instantly blocking a lost or stolen laptop from connecting to the VPN by revoking its digital certificate.",
    level: "Moderate",
    codeExample: `// OCSP Real-Time Revocation Check:
// Gateway checks client cert Serial #99182 ➔ OCSP Server replies: "REVOKED" ➔ Connection REJECTED!`
  },
  {
    id: 20,
    question: "What is 'Micro-Segmentation within VPN IP Pools'?",
    shortAnswer: "Assigning connecting remote workers to specific, isolated virtual IP subnets based on their Active Directory group (e.g. Developers get `10.10.50.0/24`, Finance gets `10.10.60.0/24`) and enforcing strict inter-pool firewall rules.",
    explanation: "Rather than placing all remote workers into one flat subnet where anyone can scan anyone else, micro-segmentation ensures that an accountant cannot connect to software source code repositories.",
    hint: "Putting different departments into separate virtual subnets over the VPN so users only see their own files.",
    level: "Moderate",
    codeExample: `// Role-Based VPN IP Assignment:
// User in "Finance_Group" ➔ Assigned IP: 10.10.60.15 ➔ Firewall permits access ONLY to Accounting Server!`
  },
  {
    id: 21,
    question: "What is 'VoIP & Video Lag over VPN' and how does Quality of Service (QoS) solve it?",
    shortAnswer: "Real-time voice and video calls suffer from jitter and packet loss when encrypted over high-traffic VPNs; QoS tags real-time packets (DSCP EF / CS5) and places them in priority hardware queues on the VPN router.",
    explanation: "When large file downloads compete with a Zoom or Teams meeting, QoS ensures that voice packets are encrypted and transmitted first, preventing audio stutters and lag.",
    hint: "Giving voice and video calls priority over big file downloads inside the VPN tunnel.",
    level: "Moderate",
    codeExample: `// QoS Priority Queuing on VPN Tunnel:
// class-map match-any REALTIME_VOICE
//  match dscp ef
// policy-map VPN_QOS
//  class REALTIME_VOICE ➔ priority percent 30`
  },
  {
    id: 22,
    question: "What is 'VPN Session Roaming / Mobile IPsec (MOBIKE)' in IKEv2?",
    shortAnswer: "An extension to IKEv2 (RFC 4555) that allows a mobile worker to switch seamlessly between Wi-Fi and 5G networks without tearing down the existing VPN session or re-authenticating.",
    explanation: "When an employee leaves their home Wi-Fi and transitions to mobile 5G, MOBIKE updates the Security Association's destination IP address on the fly, keeping file downloads and SSH sessions alive.",
    hint: "Keeping your VPN connected smoothly when moving between home Wi-Fi and mobile 5G data.",
    level: "Expert",
    codeExample: `// MOBIKE SA Update:
// Wi-Fi (192.168.1.5) drops ➔ 5G (100.64.22.4) connects ➔ MOBIKE updates outer IP; Tunnel remains active!`
  },
  {
    id: 23,
    question: "What is 'Shadow IT VPNs' (e.g. unauthorized commercial VPNs installed by employees)?",
    shortAnswer: "Employees installing personal VPN apps (ExpressVPN, NordVPN) on corporate laptops to bypass workplace web filtering, which bypasses corporate DLP inspection and creates unmonitored data exfiltration tunnels.",
    explanation: "Personal VPNs encrypt traffic away from the corporate firewall, preventing security teams from detecting data breaches. SOCs block personal VPN protocols and lock down endpoint software installations.",
    hint: "Employees using personal VPNs to bypass company filters; dangerous because it blinds security tools.",
    level: "Basic",
    codeExample: `// Perimeter Block Rule for Unauthorized Commercial VPNs:
// Block outbound UDP/TCP ports associated with commercial VPN services (e.g., OpenVPN Port 1194 to unknown IPs).`
  },
  {
    id: 24,
    question: "What is 'Centralized VPN Log Aggregation and SIEM Ingestion'?",
    shortAnswer: "Streaming all VPN authentication attempts, connection durations, assigned virtual IPs, and bytes transferred into a centralized SIEM (like Elasticsearch) via Syslog TLS or API connectors.",
    explanation: "Centralized logging enables SOC analysts to detect 'Impossible Travel' anomalies (e.g. an account logging in from Kolkata and London within 10 minutes) and audit user activity.",
    hint: "Sending all VPN login logs to a central security brain to spot weird hacker logins.",
    level: "Basic",
    codeExample: `// Impossible Travel Alert:
// Login 1: 14:00:00 (IP: Kolkata, India)
// Login 2: 14:15:00 (IP: Frankfurt, Germany) ➔ IMPOSSIBLE TRAVEL ANOMALY: Account Locked Automatically!`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding '5-Year Log Retention for VPN Service Providers'?",
    shortAnswer: "VPN service providers operating in India must maintain verified user identification, registered email addresses, IP addresses assigned to the client, real origin IPs, and connection timestamps for a minimum of 5 years.",
    explanation: "Under Indian cybersecurity directives, this ensures that law enforcement agencies can trace the origin of cyber attacks, financial fraud, and unlawful activity conducted through masked VPN endpoints.",
    hint: "Indian law mandates 5-year retention of verified user identity and assigned IP connection records for VPN providers.",
    level: "Basic",
    codeExample: `// Structured CERT-In VPN Audit Record:
const certInVpnAudit = {
  timestamp: "2026-08-23T14:10:00.150Z",
  userVerifiedName: "Mamata Das",
  userEmail: "mamata.das@wb-municipal.gov.in",
  assignedVirtualIp: "10.10.2.14",
  clientRealOriginIp: "203.0.113.88",
  statutoryRetentionYears: 5
};`
  },
  {
    id: 26,
    question: "What is 'Zero-Touch Provisioning (ZTP)' for branch office Site-to-Site VPN routers?",
    shortAnswer: "Shipping an unconfigured hardware router to a remote branch; when plugged into power and internet, it automatically contacts a secure cloud orchestrator, downloads its IPsec configuration, and establishes the mesh tunnel.",
    explanation: "ZTP eliminates the need to send expensive senior network engineers to remote clinics or branch offices in Barrackpore or Ichapur, allowing non-technical local staff to simply connect the power cord.",
    hint: "Plugging in a new branch router out of the box and having it set up its own encrypted VPN automatically.",
    level: "Moderate",
    codeExample: `// Cloud ZTP Flow:
// Unbox Router ➔ Plug Ethernet ➔ Router calls https://sdwan-cloud.corp.com ➔ Auto-Configures IPsec in 60s!`
  },
  {
    id: 27,
    question: "What is 'Data Leakage over WebRTC' in Remote Access VPNs?",
    shortAnswer: "A browser vulnerability where WebRTC JavaScript APIs query the operating system directly for the client's real local and public IP addresses, leaking the true IP even when connected to a VPN.",
    explanation: "Mitigated by deploying corporate browser policies that disable WebRTC IP handling or enforcing browser extensions that block WebRTC private IP enumeration.",
    hint: "A web browser leak where websites can discover your real IP address; stopped by disabling WebRTC leaks.",
    level: "Moderate",
    codeExample: `// Browser Hardening Policy:
// "WebRtcIPHandlingPolicy": "disable_non_proxied_udp" (Prevents real IP leakage via WebRTC)`
  },
  {
    id: 28,
    question: "What is 'Always-On VPN with Kill Switch' on remote worker endpoints?",
    shortAnswer: "A client-side security control that automatically cuts off all network connectivity if the VPN tunnel drops unexpectedly, ensuring not a single packet leaks in cleartext over the local ISP.",
    explanation: "If a VPN tunnel drops while an employee is uploading a sensitive payroll file, a kill switch blocks all network adapters until the encrypted tunnel is successfully re-established.",
    hint: "Instantly cutting off the internet if the VPN disconnects, so nothing ever leaks in cleartext.",
    level: "Basic",
    codeExample: `// Kill Switch Firewall Rule:
// block out all
// pass out proto udp to 198.51.100.1 port 51820 (Permits traffic ONLY to VPN Gateway)`
  },
  {
    id: 29,
    question: "How does 'Micro-Tunneling / ZTNA' differ from traditional Site-to-Site and Remote Access VPNs in preventing lateral attack movement?",
    shortAnswer: "Traditional VPNs grant broad Layer-3 network access to entire subnets upon authentication; ZTNA establishes short-lived Layer-7 application tunnels strictly to the individual service requested, rendering other servers invisible.",
    explanation: "In a traditional VPN, compromising one workstation lets an attacker port scan all 1,000 servers on the corporate LAN. In ZTNA, all other servers are completely hidden and un-routable.",
    hint: "Traditional VPN opens the whole building; ZTNA unlocks only one specific room door at a time.",
    level: "Moderate",
    codeExample: `// Lateral Movement Prevention:
// Traditional VPN: Hacker scans 10.0.0.0/8 ➔ Discovers 500 vulnerable servers!
// ZTNA Model     : Hacker scans 10.0.0.0/8 ➔ Packets dropped; Zero servers discovered!`
  },
  {
    id: 30,
    question: "Synthesize the overarching strategic imperative for Secure Remote Access and Site-to-Site Connectivity.",
    shortAnswer: "Secure Remote Access and Site-to-Site VPNs form the indispensable cryptographic foundation of modern hybrid enterprises: they neutralize public network eavesdropping, slash branch connectivity costs by 90%+, enforce unified zero-trust security policies, and ensure full statutory compliance with CERT-In directives and the DPDP Act 2023.",
    explanation: "Without robust cryptographic tunneling, distributed enterprises cannot operate safely across public telecommunications infrastructure. VPNs transform the wild, untrusted Internet into a private, resilient corporate backbone.",
    hint: "VPNs are the essential cryptographic bridge that turns the public internet into a secure, private enterprise network.",
    level: "Moderate",
    codeExample: `// The Master Connectivity Equation:
// Resilient Enterprise Connectivity = [Authenticated AES-256-GCM / WireGuard Tunnels] + [MFA & Endpoint Posture] + [SD-WAN Multi-ISP Redundancy] + [Kill-Switch & ZTNA Micro-Tunnels] + [CERT-In 5-Year Compliance]`
  }
];

export default questions;
