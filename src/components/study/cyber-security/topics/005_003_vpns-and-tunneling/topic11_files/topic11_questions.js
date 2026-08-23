const questions = [
  {
    id: 1,
    question: "What are the four primary architectural tiers in an end-to-end enterprise remote access deployment?",
    shortAnswer: "1. Edge Perimeter & DDoS Scrubbing Tier; 2. DMZ & VPN Concentrator / ZTNA Connector Tier; 3. Core Switching & Segmented VLAN Tier; 4. Identity, AAA & Compliance Control Plane Tier.",
    explanation: "Enterprise defense-in-depth requires isolating untrusted external traffic across distinct security zones. External connections pass through DDoS scrubbing and perimeter firewalls, terminate at clustered VPN concentrators in the DMZ, are authenticated against centralized Identity Providers (IdP), and are routed onto dedicated 802.1Q micro-segmented internal VLANs.",
    hint: "Think about the layers from the outside internet all the way to the internal database server.",
    level: "Basic",
    codeExample: `// Enterprise Tier Layout:
// [Internet] ➔ [Perimeter DDoS / NGFW] ➔ [DMZ: VPN Cluster (VRRP)] ➔ [Core 802.1Q Switch] ➔ [App Tier (VLAN 100/200)]`
  },
  {
    id: 2,
    question: "What is the function of the 'AAA (Authentication, Authorization, Accounting)' pipeline in enterprise VPN management?",
    shortAnswer: "Authentication verifies user identity (who you are); Authorization determines permissions and assigned VLANs (what you can access); Accounting records session duration, bytes transferred, and disconnect reasons for auditing (what you did).",
    explanation: "AAA standardizes remote access control. When a user connects, the VPN gateway authenticates credentials via SAML/IdP (Authentication), queries group membership to assign firewall filter rules or VLANs (Authorization), and transmits RADIUS/TACACS+ accounting packets to the SIEM for compliance auditing (Accounting).",
    hint: "Who you are (AuthN), What you are allowed to do (AuthZ), and Recording what you did (Accounting).",
    level: "Basic",
    codeExample: `// RADIUS AAA Accounting Flow:
// 1. User Authenticates ➔ RADIUS Server sends 'Access-Accept' + 'VLAN-ID=100'
// 2. Tunnel Connects    ➔ Gateway sends 'Accounting-Start' (Session ID: 0x88AF)
// 3. User Disconnects  ➔ Gateway sends 'Accounting-Stop' (Bytes In: 450MB, Bytes Out: 1.2GB)`
  },
  {
    id: 3,
    question: "Why does modern enterprise security strictly prohibit 'SMS-based OTP' in favor of 'FIDO2 / WebAuthn Passkeys' for VPN MFA?",
    shortAnswer: "SMS OTPs are vulnerable to SIM-swapping, SS7 cellular interception, and automated Adversary-in-the-Middle (AiTM) phishing proxies; FIDO2 passkeys use hardware-bound public-key cryptography that cannot be phished or intercepted.",
    explanation: "Adversaries using reverse-proxy phishing kits (like Evilginx) can intercept SMS verification codes in real time. FIDO2/WebAuthn hardware tokens (YubiKeys / Windows Hello) cryptographically bind the authentication response to the specific browser domain origin (origin binding), rendering credential harvesting completely impossible.",
    hint: "SMS text messages can be intercepted over cellular networks, but hardware security keys use uncopyable mathematical cryptography.",
    level: "Moderate",
    codeExample: `// MFA Security Hierarchy:
// ❌ SMS / Voice Call OTP ➔ Vulnerable to SIM Swapping & SS7 Interception (PROHIBITED)
// ⚠️ Mobile Push / TOTP   ➔ Vulnerable to Push Fatigue & AiTM Phishing Proxies
// ✔ FIDO2 / WebAuthn      ➔ 100% Phishing-Resistant Origin Binding (MANDATORY)`
  },
  {
    id: 4,
    question: "What is an 'Endpoint Posture Health Assessment' (Host Integrity) and how is a 'Quarantine VLAN' utilized when checks fail?",
    shortAnswer: "A pre-connection verification that audits disk encryption, active EDR antivirus, and OS patch levels; if an endpoint fails the health threshold (e.g., score < 80/100), it is isolated on a restricted Quarantine VLAN with access strictly to remediation servers.",
    explanation: "Before granting access to production databases, the VPN gateway inspects the endpoint's health. If an employee's antivirus is disabled or BitLocker is suspended, the gateway assigns the device to Quarantine VLAN 900. In this walled garden, the user can only access Windows Update or the antivirus console to fix the issue before re-testing.",
    hint: "An isolation room where sick computers are sent to get vaccinated and patched before entering the office.",
    level: "Moderate",
    codeExample: `// Posture Evaluation Criteria:
// BitLocker Encryption : Active (+35)
// CrowdStrike EDR Agent : Running (+35)
// OS Security Patches  : Current < 30 Days (+20)
// Total Score: 90/100 ➔ PASS ➔ Assigned to Production VLAN 100`
  },
  {
    id: 5,
    question: "How do 'Active-Active' and 'Active-Passive' VPN Gateway Clusters achieve zero-downtime High Availability using VRRP?",
    shortAnswer: "Virtual Router Redundancy Protocol (VRRP) shares a single Virtual IP (VIP) across multiple physical gateway nodes; if the primary active node experiences hardware failure, the backup node claims the VIP in under 500ms without disrupting traffic.",
    explanation: "In enterprise datacenters, clustering prevents the VPN gateway from becoming a single point of failure. Active-Active clustering shares session state across nodes, allowing both gateways to process traffic concurrently while providing instant seamless failover if one node crashes.",
    hint: "Two co-pilots sitting in the cockpit: if one passes out, the other instantly takes the controls without the plane losing altitude.",
    level: "Moderate",
    codeExample: `// VRRP Configuration (keepalived.conf):
// vrrp_instance VI_VPN {
//   state MASTER
//   interface eth0
//   virtual_router_id 51
//   priority 150
//   virtual_ipaddress { 203.0.113.10/24 }
// }`
  },
  {
    id: 6,
    question: "How does 'Global Server Load Balancing' (GSLB / Geo-DNS) optimize remote worker routing across multiple regional datacenters?",
    shortAnswer: "By resolving the VPN gateway domain name to the public IP address of the geographically closest and least-congested datacenter based on the user's DNS resolver location.",
    explanation: "An employee connecting from Kolkata resolves `vpn.enterprise.in` to the Kolkata Datacenter gateway (`203.0.113.10`, 12ms latency), while an employee in Mumbai resolves the same domain to the Mumbai Datacenter gateway (`198.51.100.20`, 14ms latency). If one datacenter suffers an outage, GSLB automatically reroutes traffic to the surviving site.",
    hint: "A smart GPS that automatically directs you to the nearest open branch office.",
    level: "Moderate",
    codeExample: `// Geo-DNS Resolution Example:
// Remote Worker in Kolkata ➔ Resolves vpn.enterprise.in ➔ Returns 203.0.113.10 (Kolkata Gateway: 12ms RTT)
// Remote Worker in Mumbai  ➔ Resolves vpn.enterprise.in ➔ Returns 198.51.100.20 (Mumbai Gateway: 14ms RTT)`
  },
  {
    id: 7,
    question: "What is the recommended remote access persona policy for 'Third-Party Contractors and Vendors'?",
    shortAnswer: "Clientless ZTNA (Browser Isolation) with zero network-layer IP routability, granting access strictly to authorized web applications (e.g., Jira, Web CMS on port 443) inside sandboxed browser sessions.",
    explanation: "Contractors operate unmanaged personal or third-party laptops that IT cannot fully audit. Placing them on a standard VPN exposes the entire corporate network to lateral malware infections. Clientless ZTNA provides zero-trust application proxying without software installation or subnet access.",
    hint: "Never give contractors a full VPN; give them a secure browser window to only the one website they need.",
    level: "Basic",
    codeExample: `// Contractor Persona Policy:
// Identity    : FIDO2 Passkey + Third-Party Vendor Group
// Access Model: Clientless ZTNA (HTML5 Browser Sandbox)
// Network     : ZERO Subnet Access (No IP assigned; Intranet is 100% Dark)`
  },
  {
    id: 8,
    question: "How do you calculate the peak WAN bandwidth requirement for an enterprise VPN concentrator cluster?",
    shortAnswer: "Formula: $\\text{Peak Bandwidth} = \\text{Total Users} \\times \\text{Concurrency Ratio} \\times \\text{Average Throughput per User}$.",
    explanation: "For an organization with 2,000 employees, an expected peak concurrency of 40% (800 concurrent tunnels), and an average bandwidth requirement of 3.5 Mbps per user (video calls + SaaS), the required cluster WAN capacity is $800 \\times 3.5\\text{ Mbps} = 2,800\\text{ Mbps} = 2.8\\text{ Gbps}$. Adding 30% headroom requires provisioning a 4.0 Gbps redundant WAN pipe.",
    hint: "Multiply total employees by the percentage working at the same time, then multiply by average internet speed needed.",
    level: "Moderate",
    codeExample: `// Capacity Sizing Formula:
// Total Headcount = 2,000 Users | Concurrency = 40% (800 Active Tunnels)
// Bandwidth/User  = 3.5 Mbps (HD Video + SaaS)
// Peak WAN Demand = 800 × 3.5 Mbps = 2.8 Gbps (Provision 4.0 Gbps Cluster for Headroom)`
  },
  {
    id: 9,
    question: "How do SIEM systems detect 'Compromised VPN Session Hijacking' and 'Impossible Travel' in real time?",
    shortAnswer: "By correlating authentication timestamps, source IP geolocations, and ISP autonomous system numbers (ASNs); if successive requests occur from geographically distant regions within an impossible flight timeframe, an automated alert and session termination trigger.",
    explanation: "If user Mamata authenticates from Barrackpore, India at 10:00 AM, and 20 minutes later a VPN request with her session token originates from a hosting datacenter IP in Amsterdam, the SIEM detects a velocity anomaly exceeding 25,000 km/h, revoking the active session and isolating the user account.",
    hint: "If you log in from Kolkata and 20 minutes later your account logs in from Europe, the system knows your account was hijacked.",
    level: "Moderate",
    codeExample: `// Splunk SIEM Detection Query for Impossible Travel:
// index=vpn_logs action=login
// | eval travel_speed = distance_km / time_diff_hours
// | where travel_speed > 900
// | table _time, user, src_ip, geo_city, travel_speed, action`
  },
  {
    id: 10,
    question: "What is an 'Automated Emergency Revocation Workflow' when a corporate laptop is reported lost or stolen?",
    shortAnswer: "An automated script executed by the SOC that publishes the stolen device's X.509 certificate serial number to the OCSP responder/CRL, terminates active VPN sessions on the gateway cluster, and revokes IdP/Active Directory tokens within seconds.",
    explanation: "Physical device loss presents an immediate credential dumping hazard. The automated workflow revokes the client certificate across all gateways, triggers remote BitLocker wipe commands via MDM, and invalidates all active Single Sign-On refresh tokens.",
    hint: "A single emergency kill-switch button that cancels all access certificates, cuts active connections, and wipes the lost laptop.",
    level: "Basic",
    codeExample: `// Emergency Revocation Script Execution:
$ ./soc_emergency_revoke.sh --user "susmita" --device-id "LAPTOP-FIN-088"
// [1] X.509 Certificate Serial 0x4A1F Revoked on OCSP Responder (0.2s)
// [2] VPN Session Terminated on Gateways A & B (0.4s)
// [3] Microsoft Entra ID Refresh Tokens Revoked (0.6s)`
  },
  {
    id: 11,
    question: "How does 'Active Queue Management' (FQ-CoDel) on VPN gateways prevent video stutter and VoIP jitter during large file transfers?",
    shortAnswer: "By separating network traffic into individual flow queues and dynamically dropping or marking packets in bloated bulk queues, ensuring that latency-sensitive voice and video packets bypass large background file downloads.",
    explanation: "Without AQM, a single large 500 MB file download fills the gateway's output buffers (Bufferbloat), introducing 400ms+ of queue delay for all other users on the gateway. FQ-CoDel isolates flows so that interactive VoIP and SSH packets receive instant priority scheduling.",
    hint: "Giving fast express lanes to voice calls so they do not get stuck behind heavy bulk cargo trucks.",
    level: "Expert",
    codeExample: `// Enabling FQ-CoDel on VPN Interface in Linux:
$ sudo tc qdisc add dev tun0 root fq_codel`
  },
  {
    id: 12,
    question: "What is the difference between 'Device Tunnels' and 'User Tunnels' in enterprise Windows Always-On VPN architectures?",
    shortAnswer: "Device Tunnels connect automatically before user login using machine certificates to allow IT management (Domain Controller connectivity, GPO updates, and remote password resets); User Tunnels connect after employee login to provide access to authorized business applications.",
    explanation: "Device Tunnels solve the 'First-Day-at-Home' problem: when a remote worker receives a new laptop, they cannot log into Windows if the machine has never connected to the corporate Domain Controller. The Device Tunnel establishes connectivity at the Windows lock screen, enabling initial domain credential caching.",
    hint: "Device tunnel starts when the computer boots up; User tunnel starts when the person logs in with their password.",
    level: "Moderate",
    codeExample: `// Windows Always-On VPN Lifecycle:
// 1. Laptop Boots ➔ Device Tunnel connects via Machine Cert ➔ Reaches Domain Controller & GPO
// 2. User Logs In ➔ User Tunnel connects via FIDO2 / User Cert ➔ Reaches ERP & Intranet Files`
  },
  {
    id: 13,
    question: "Why must enterprise VPN concentrators be deployed in a dedicated 'DMZ' rather than directly inside the internal core network?",
    shortAnswer: "To prevent public-facing gateway compromises from immediately granting root access to internal database subnets; any traffic from the DMZ to the internal LAN must pass through secondary internal firewall inspection.",
    explanation: "If a VPN concentrator sits directly on the internal LAN and suffers a zero-day exploit (such as Ivanti CVE-2023-46805), the attacker acquires an uninspected foothold directly next to Domain Controllers. Placing concentrators in a DMZ ensures that internal firewalls inspect and filter all traffic entering the core.",
    hint: "An airlock chamber between the outside world and the cleanroom laboratory.",
    level: "Moderate",
    codeExample: `// DMZ Isolation Architecture:
// [Internet] ──(Perimeter Firewall)──> [DMZ: VPN Concentrators] ──(Internal Firewall)──> [Core Production LAN]`
  },
  {
    id: 14,
    question: "What is 'TCP MSS Clamping' and why is it mandatory on enterprise VPN gateways connecting to residential ISPs?",
    shortAnswer: "Rewriting the TCP Maximum Segment Size advertisement in SYN packets to 1360–1400 bytes, preventing oversized encapsulated packets from exceeding the 1500-byte Ethernet MTU and causing Path MTU Black Hole freezes.",
    explanation: "Because residential broadband providers in India frequently use PPPoE (1492B MTU), adding 60+ bytes of VPN encapsulation pushes packet size to 1552 bytes. MSS Clamping forces endpoints to send smaller segments, permanently eliminating upload timeouts.",
    hint: "Setting a maximum letter size so mail never gets stuck in narrow mailboxes.",
    level: "Basic",
    codeExample: `// Enterprise Gateway MSS Clamping Rule:
$ sudo iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1360`
  },
  {
    id: 15,
    question: "How does 'Role-Based Access Control' (RBAC) dynamically segment user traffic on core enterprise switches using 802.1Q VLANs?",
    shortAnswer: "The RADIUS/SAML server returns a dynamic VLAN attribute upon authentication, instructing the VPN gateway to bridge the user's tunnel directly into their authorized department subnet (e.g., VLAN 100 for Finance, VLAN 200 for Contractors).",
    explanation: "Rather than placing all remote users on a single flat subnet, RBAC dynamically assigns network tags. A finance employee's packets are tagged with VLAN 100 (which has firewall rules permitting ERP access), while a contractor's packets are tagged with VLAN 200 (which drops all traffic except Jira web traffic).",
    hint: "Giving colored badges that only unlock doors corresponding to your department.",
    level: "Moderate",
    codeExample: `// RADIUS Dynamic VLAN Assignment:
// Tunnel-Type = VLAN
// Tunnel-Medium-Type = IEEE-802
// Tunnel-Private-Group-Id = "100" (Finance VLAN)`
  },
  {
    id: 16,
    question: "What is 'Continuous Adaptive Risk and Trust Assessment' (CARTA) and how does it protect active sessions against mid-day malware infections?",
    shortAnswer: "Continuously monitoring endpoint telemetry (EDR alerts, USB connections, network socket anomalies) throughout the day, automatically revoking VPN access the instant an endpoint health violation is detected.",
    explanation: "Traditional VPNs only evaluate security at morning login. If an employee connects an infected USB drive at 2:00 PM that disables their antivirus, CARTA telemetry detects the change via EDR webhook, terminating the VPN tunnel in under 5 seconds.",
    hint: "A security guard who continuously checks that your badge is valid all day, not just at the front gate.",
    level: "Expert",
    codeExample: `// CARTA Mid-Session Revocation Event:
// 14:02:15 - EDR Agent reports: "Ransomware signature detected in C:\\temp"
// 14:02:16 - ZTNA/VPN Broker receives API Webhook
// 14:02:17 - Tunnel Terminated & Endpoint Isolated from Network!`
  },
  {
    id: 17,
    question: "What are the regulatory compliance mandates for remote access security under CERT-In and RBI Cybersecurity Frameworks?",
    shortAnswer: "Mandatory multi-factor authentication (MFA), complete logging of user connection timestamps and IP addresses retained for at least 180 days, elimination of legacy insecure protocols (PPTP/L2TP plain), and periodic third-party penetration testing.",
    explanation: "Indian regulatory bodies (CERT-In and Reserve Bank of India) mandate strict cybersecurity hygiene for financial and critical infrastructure. Remote access gateways must enforce phishing-resistant MFA, maintain forensic audit logs for 180+ days, and undergo regular vulnerability assessments.",
    hint: "MFA + 180-day log storage + No broken protocols + Regular security audits.",
    level: "Moderate",
    codeExample: `// CERT-In Compliance Directives:
// 1. Maintain ICT system logs securely for rolling period of 180 days.
// 2. Enforce strong multi-factor authentication for all remote access gateways.
// 3. Decommission legacy unencrypted and broken cryptographic protocols.`
  },
  {
    id: 18,
    question: "How does 'Automated Certificate Management' (SCEP / EST) prevent devastating enterprise certificate expiration outages?",
    shortAnswer: "By using Mobile Device Management (MDM) software to automatically request, generate, and renew X.509 client certificates in the background 30 days before expiration without requiring manual user intervention.",
    explanation: "Manual certificate issuance across thousands of remote laptops inevitably leads to outages when administrators forget renewal deadlines. SCEP automates the cryptographic key exchange, installing renewed certificates into the Windows TPM or macOS Keychain silently.",
    hint: "An automated subscription renewal that refreshes security passes before they expire so doors never lock you out.",
    level: "Moderate",
    codeExample: `// SCEP Automated Renewal Workflow:
// 30 Days before expiration ➔ MDM triggers SCEP Client ➔ Generates new key in TPM ➔ CA signs cert ➔ Seamlessly renewed!`
  },
  {
    id: 19,
    question: "What is 'Split-Include' vs 'Inverse Split Tunneling' for balancing bandwidth and corporate security in hybrid workforces?",
    shortAnswer: "'Split-Include' only routes private corporate subnets into the tunnel (bypassing corporate inspection for all web traffic); 'Inverse Split' routes all general traffic through the tunnel for inspection while explicitly excluding trusted SaaS (Microsoft 365 / Zoom) for local breakout.",
    explanation: "Inverse Split Tunneling provides the ideal enterprise compromise: it maintains 100% security inspection and DLP on arbitrary web browsing while preventing multi-gigabit video conference streams from saturating the corporate datacenter gateway.",
    hint: "Inspect everything on the web except trusted video meeting apps like Zoom and Teams.",
    level: "Moderate",
    codeExample: `// Inverse Split Tunnel Routing:
// 0.0.0.0/0          ➔ tun0 (All web browsing inspected by central NGFW)
// 52.96.0.0/12       ➔ wlan0 (Microsoft 365 Cloud Direct Breakout)
// 13.107.64.0/18     ➔ wlan0 (Teams HD Video Direct Breakout)`
  },
  {
    id: 20,
    question: "How does 'WireGuard Cryptographic Routing' compare to 'IPsec IKEv2' in enterprise deployment complexity?",
    shortAnswer: "WireGuard eliminates hundreds of lines of complex IKE cipher proposals and dynamic state machines, mapping static 32-byte public keys directly to IP addresses inside a ~4,000-line kernel module; IPsec requires multi-phase ISAKMP negotiations.",
    explanation: "IPsec IKEv2 is powerful but notoriously complex to configure, with high risk of cipher proposal mismatches. WireGuard simplifies administration: each peer has a public key and an AllowedIPs list, providing higher throughput and instant silent roaming across Wi-Fi and cellular networks.",
    hint: "WireGuard is lightweight and simple like SSH; IPsec is feature-heavy but complex like an airplane cockpit.",
    level: "Basic",
    codeExample: `// WireGuard Simplicity (/etc/wireguard/wg0.conf):
// [Peer]
// PublicKey = xT5nJ6uK...= (Susmita)
// AllowedIPs = 10.14.0.45/32`
  },
  {
    id: 21,
    question: "What forensic artifacts should be collected from a VPN concentrator during a suspected nation-state breach investigation?",
    shortAnswer: "IKE/IPsec audit logs, RADIUS authentication records, active session state tables, NetFlow / IPFIX packet flow records, firewall drop logs, and memory dumps of the gateway appliance.",
    explanation: "Forensic analysts must reconstruct the exact attack timeline: identifying the initial compromised account (`auth.log`), source IP geolocation, session duration, internal IP assigned, and internal servers contacted (`netflow/ipfix`).",
    hint: "Login records, connection timestamps, data transfer volumes, and memory snapshots of the gateway.",
    level: "Expert",
    codeExample: `// Forensic Artifact Collection Command:
$ sudo journalctl -u strongswan --since "2026-08-23 00:00:00" > /forensics/vpn_ike_audit.log
$ sudo ipsec statusall > /forensics/active_tunnels.txt`
  },
  {
    id: 22,
    question: "How does 'Network Access Control' (NAC) enforce automated device remediation for unpatched endpoints?",
    shortAnswer: "When an endpoint connects, NAC scans its registry and patch state; if patches are missing, NAC modifies the switch port or VPN ACL to block intranet access and opens access strictly to a WSUS / patch remediation server.",
    explanation: "Rather than completely locking users out and generating IT helpdesk calls, NAC provides automated self-healing. The user's browser is redirected to a self-service portal: 'Your Windows 11 installation is missing KB5034441. Click Update Now to install and restore full VPN access.'",
    hint: "An automated repair bay that guides your computer to download missing updates before letting it into the main network.",
    level: "Moderate",
    codeExample: `// NAC Remediation Policy:
// IF (OS_Patch_Age > 30 Days) THEN
//   Assign ACL "REMEDIATION_ONLY"
//   Permit: DNS (53), DHCP (67), WSUS_Server (8530)
//   Deny: All other intranet destinations (10.0.0.0/8)`
  },
  {
    id: 23,
    question: "What is 'Certificate Pinning' (HPKP) and how does it interact with Full Tunnel SSL Inspection proxies?",
    shortAnswer: "Applications with certificate pinning hardcode the expected cryptographic public key of their server; when a corporate VPN proxy intercepts and re-encrypts the HTTPS connection with an enterprise CA certificate, the application detects a mismatch and terminates the connection.",
    explanation: "Mobile banking applications and secure developer tools (like Docker and GitHub CLI) enforce certificate pinning to prevent interception. In Full Tunneling deployments, administrators must configure SSL inspection bypass lists for pinned applications to prevent broken connections.",
    hint: "Security apps that know their real server's face and refuse to talk if a corporate proxy wears a mask.",
    level: "Expert",
    codeExample: `// SSL Proxy Bypass Rule for Pinned Applications:
// ssl-inspection-bypass:
//   - "*.github.com"
//   - "*.docker.com"
//   - "*.onlinesbi.sbi"`
  },
  {
    id: 24,
    question: "How does 'Anycast BGP Routing' provide automatic DDoS resilience and geo-proximity for global VPN endpoints?",
    shortAnswer: "Multiple VPN concentrators across different cities announce the identical public IP address via BGP; internet routing automatically directs each remote worker to the topologically closest healthy gateway node.",
    explanation: "If an adversary launches a volumetric DDoS attack against the VPN public IP, the attack traffic is naturally dispersed and absorbed across all distributed Anycast nodes globally. If the Kolkata gateway goes offline, upstream BGP routers automatically route West Bengal users to Mumbai seamlessly.",
    hint: "Multiple branch offices sharing the exact same phone number, so the telephone company connects you to the nearest open office.",
    level: "Expert",
    codeExample: `// Anycast BGP Announcement:
// Kolkata Gateway : Announces 203.0.113.1/32 via BGP AS65001
// Mumbai Gateway  : Announces 203.0.113.1/32 via BGP AS65001
// Remote Client   : Automatically routed to lowest AS-Path latency node!`
  },
  {
    id: 25,
    question: "What are the operational differences between 'Software-Defined Perimeter' (SDP) and traditional 'Hardware VPN Concentrators'?",
    shortAnswer: "SDP separates the control plane from the data plane, granting application-level access through outbound-only cloud connectors with zero open inbound ports; hardware VPNs are monolithic appliances with open listening ports that grant broad subnet access.",
    explanation: "SDP (ZTNA) eliminates the need to maintain, patch, and scale expensive physical datacenter appliances. Connectors can be deployed as lightweight containers across on-prem, AWS, and Azure environments in minutes.",
    hint: "Software-Defined Perimeter is flexible and cloud-managed; Hardware VPN is a physical server box with cables.",
    level: "Moderate",
    codeExample: `// SDP vs Hardware VPN:
// Hardware VPN : Physical Appliance • Inbound Port 443 Open • Layer 3 Network Access • Single Point of Failure
// SDP (ZTNA)   : Cloud Control Plane • 0 Inbound Ports (Dark) • Layer 7 Micro-Tunnels • Scalable Outbound Connectors`
  },
  {
    id: 26,
    question: "What is 'Ephemeral Session Rekeying' and why does it protect high-throughput VPN links against cryptographic keystream wear-out?",
    shortAnswer: "Periodically generating new encryption keys during an active connection based on time intervals (e.g., every 1 hour) or byte limits (e.g., every 4 GB) to prevent sequence number exhaustion and birthday collision attacks.",
    explanation: "On multi-gigabit links, encrypting terabytes of data under a single cryptographic key increases the statistical probability of keystream leakage and IV reuse. Rekeying refreshes the cryptographic state seamlessly without interrupting user data transfer.",
    hint: "Swapping out encryption keys regularly so the key never gets worn out or predictable.",
    level: "Moderate",
    codeExample: `// IPsec Rekeying Settings in strongSwan:
// rekeymargin = 3m
// rekeyfuzz = 100%
// lifetime = 1h
// lifebytes = 4000000000 (4 GB)`
  },
  {
    id: 27,
    question: "How do Mobile Device Management (MDM) profiles enforce 'Always-On VPN' with a strict 'Kill Switch' on remote laptops?",
    shortAnswer: "By pushing operating system policies that lock down the network stack so that no application can transmit packets across physical interfaces unless an encrypted VPN tunnel is active.",
    explanation: "Using Microsoft Intune or JAMF, administrators configure Always-On profiles with `TrafficFilter` rules. If the user disconnects the VPN or if the Wi-Fi drops, the OS kernel drops all outbound network packets until the VPN reconnects, preventing cleartext credential leakage.",
    hint: "An emergency electronic lock that shuts off all internet access if the VPN connection drops.",
    level: "Moderate",
    codeExample: `// Microsoft Intune Always-On VPN Profile (XML):
// <AlwaysOn>true</AlwaysOn>
// <Lockdown>true</Lockdown>
// <KillSwitchEnabled>true</KillSwitchEnabled>`
  },
  {
    id: 28,
    question: "What is the key takeaway from the Barrackpore Smart City & FinTech Remote Workforce Capstone Case Study?",
    shortAnswer: "A successful enterprise remote access deployment requires a multi-layered approach combining identity verification (FIDO2), endpoint posture health scoring (EDR/BitLocker), least-privilege micro-segmentation (ZTNA for contractors), and precise performance tuning (TCP MSS clamping to 1360 bytes).",
    explanation: "Security and usability must be engineered together. Relying on perimeter encryption alone fails if endpoints are unpatched or if MTU black holes freeze user workflows. The Barrackpore blueprint demonstrates how defense-in-depth creates a resilient, high-performance remote workforce.",
    hint: "Identity + Device Health + Least Privilege + Performance Tuning = Complete Enterprise Security.",
    level: "Basic",
    codeExample: `// Barrackpore Enterprise Blueprint:
// 1. Identity & MFA  : FIDO2 Passkeys + SAML 2.0 IdP
// 2. Host Posture   : BitLocker + CrowdStrike EDR (Score >= 80)
// 3. Network Access : Full Tunnel (Finance) / ZTNA (Contractors)
// 4. Performance    : MSS Clamping to 1360B + WireGuard UDP`
  },
  {
    id: 29,
    question: "How does 'Post-Quantum Cryptography' (PQC) protect enterprise VPN archives against 'Harvest Now, Decrypt Later' (HNDL) attacks?",
    shortAnswer: "By incorporating quantum-resistant lattice-based key exchange algorithms (such as ML-KEM / CRYSTALS-Kyber) alongside classical ECDH in hybrid IKEv2/WireGuard handshakes, ensuring recorded traffic cannot be decrypted by future quantum computers.",
    explanation: "Nation-state adversaries are currently intercepting and archiving encrypted enterprise VPN handshakes. When cryptanalytically relevant quantum computers emerge, traditional RSA and ECC will be broken. PQC hybrid algorithms provide immediate mathematical protection against future quantum decryption.",
    hint: "Adding quantum-proof locks today so future supercomputers can never unlock recorded secret files.",
    level: "Expert",
    codeExample: `// Hybrid Post-Quantum Key Exchange Proposal:
// IKEv2: Curve25519 (Classical) + Kyber-768 (Post-Quantum Lattice)
// ➔ 100% Protected against Shor's Quantum Algorithm!`
  },
  {
    id: 30,
    question: "What is the definitive production checklist for senior security architects deploying enterprise remote access systems?",
    shortAnswer: "1. Enforce Phishing-Resistant MFA (FIDO2); 2. Automate PKI certificate lifecycles via SCEP/EST; 3. Clamp TCP MSS to 1360 bytes on all gateways; 4. Segment contractors into Clientless ZTNA; 5. Deploy Active-Active VRRP gateway clusters with Anycast BGP; 6. Maintain 180-day forensic audit logs.",
    explanation: "This six-point checklist synthesizes the entire curriculum of Module 005_003, providing a battle-tested blueprint for production-grade enterprise remote connectivity.",
    hint: "FIDO2 + Automated PKI + MSS Clamping + ZTNA for Contractors + HA Clustering + 180-day Logging.",
    level: "Basic",
    codeExample: `// Master Enterprise Checklist:
// [✔] MFA       : FIDO2 WebAuthn Passkeys Enforced
// [✔] PKI       : Automated SCEP Rotation (60-Day Expiry)
// [✔] MTU/MSS   : Gateway Clamping to 1360 Bytes
// [✔] ZTNA      : Dark Cloud Connectors for Contractors
// [✔] HA        : Active-Active VRRP + GSLB Geo-DNS
// [✔] Audit     : 180-Day SIEM Syslog Retention`
  }
];

export default questions;
