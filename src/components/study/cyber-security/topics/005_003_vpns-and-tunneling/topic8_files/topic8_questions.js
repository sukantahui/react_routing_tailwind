const questions = [
  {
    id: 1,
    question: "What is the fundamental architectural difference between Full Tunneling and Split Tunneling in a VPN deployment?",
    shortAnswer: "In Full Tunneling, the default route (0.0.0.0/0) is forced through the encrypted VPN adapter so 100% of traffic undergoes central corporate security inspection; in Split Tunneling, only private corporate subnets are routed via the VPN, while general internet traffic exits directly through the local ISP.",
    explanation: "Full Tunneling treats the remote endpoint as if it were physically inside the corporate building, routing all internet requests through enterprise firewalls, proxies, and DLP systems. Split Tunneling divides traffic: private intranet IPs go into the tunnel, and all public web traffic bypasses corporate controls to reduce gateway bandwidth consumption.",
    hint: "Think about where the default route 0.0.0.0/0 points: to the corporate gateway or the home ISP router.",
    level: "Basic",
    codeExample: `// Full Tunnel Routing:
// 0.0.0.0/0 ➔ dev tun0 (All traffic goes to Corporate Gateway)

// Split Tunnel Routing:
// 10.0.0.0/8 ➔ dev tun0 (Corporate Intranet only)
// 0.0.0.0/0  ➔ dev wlan0 (Public Internet directly via local ISP)`
  },
  {
    id: 2,
    question: "What is 'Bandwidth Hairpinning' (or 'Traffic Tromboning') in the context of Full Tunneling?",
    shortAnswer: "The inefficient routing path where public internet traffic travels from the remote worker's home through the VPN tunnel to the corporate datacenter, exits out to the internet, and returns back through the same datacenter link to the client.",
    explanation: "When an employee watches a training video or attends a cloud meeting, the entire multi-gigabyte video stream enters the corporate datacenter via WAN ingress, is inspected, and is retransmitted out the WAN egress. This doubles datacenter bandwidth consumption and introduces latency.",
    hint: "Traffic travels from home to office and back to the internet like a hairpin turn.",
    level: "Moderate",
    codeExample: `// Hairpinning Flow:
// [Remote Worker] ➔ (Encrypted Tunnel) ➔ [Corporate Gateway] ➔ (Public Internet) ➔ [YouTube/Zoom]
// [Remote Worker] 🠔 (Encrypted Tunnel) 🠔 [Corporate Gateway] 🠔 (Public Internet) 🠔 [YouTube/Zoom]`
  },
  {
    id: 3,
    question: "What is the 'Dual-Homed Endpoint Pivot Attack' and why is it the primary security danger of Split Tunneling?",
    shortAnswer: "A compromised remote laptop connected simultaneously to an untrusted local Wi-Fi network and the corporate intranet acts as an uninspected bridge, allowing local attackers or malware to route attacks directly into the corporate network.",
    explanation: "Because the laptop maintains active routing interfaces to both the unsecured home/cafe Wi-Fi and the internal enterprise subnet (10.0.0.0/8), an attacker who gains control of the endpoint can enable packet forwarding or deploy a reverse SOCKS proxy to access sensitive intranet servers, bypassing all perimeter firewalls.",
    hint: "The laptop has two open doors at once: one to the dangerous public cafe Wi-Fi and one to the secure corporate bank vault.",
    level: "Expert",
    codeExample: `// Dual-Homed Bridge Threat:
// [Attacker on Cafe Wi-Fi] ➔ (Local Subnet 192.168.1.0/24) ➔ [Infected Remote Laptop]
//                                                                 │ (net.ipv4.ip_forward = 1)
//                                                                 ▼
// [Corporate Core Database (10.14.0.5)] 🠔 (Encrypted Tunnel) 🠔 [tun0 Adapter]`
  },
  {
    id: 4,
    question: "How does Split Tunneling introduce 'DNS Leakage' risks, and how can enterprises prevent it?",
    shortAnswer: "The client OS may send domain resolution queries for internal corporate hostnames or public sites to the local ISP's unencrypted DNS resolver, exposing confidential infrastructure names and browsing habits to eavesdroppers.",
    explanation: "If the VPN client does not bind DNS queries exclusively to the virtual tunnel adapter, Windows or macOS may use Multi-Homed Name Resolution (SMHNR), sending parallel DNS requests to both the local ISP and corporate DNS servers. Prevention requires configuring the VPN client to enforce tunnel-only DNS and block outbound UDP port 53 on physical adapters.",
    hint: "When internal company website names are queried on the public home Wi-Fi DNS server.",
    level: "Moderate",
    codeExample: `// PowerShell Command to Prevent Multi-Homed DNS Leakage on Windows:
// Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\DNSClient" -Name "DisableSmartNameResolution" -Value 1`
  },
  {
    id: 5,
    question: "What is 'Inverse Split Tunneling' (Route Exclusion) and what problem does it solve?",
    shortAnswer: "An architecture where the default route remains inside the VPN tunnel (Full Tunneling by default), but specific high-bandwidth, trusted cloud services (like Microsoft 365 or Zoom) are explicitly excluded and routed directly.",
    explanation: "Inverse Split Tunneling provides a middle ground: it retains 100% centralized security inspection for general web browsing and arbitrary internet traffic, while offloading high-volume, latency-sensitive SaaS collaboration streams through vetted public IP ranges or FQDN domain lists.",
    hint: "Keep everything inside the tunnel except for a few trusted apps like Teams or Zoom.",
    level: "Moderate",
    codeExample: `// Inverse Split Tunnel Routing Logic:
// 0.0.0.0/0          ➔ dev tun0 (Default: Full Tunnel Security)
// 52.96.0.0/12       ➔ dev wlan0 (Excluded: Microsoft 365 Cloud Direct)
// 13.107.64.0/18     ➔ dev wlan0 (Excluded: Teams Media Relay Direct)`
  },
  {
    id: 6,
    question: "Why do regulatory standards like PCI-DSS and RBI Cybersecurity Directives strictly mandate Full Tunneling for financial operations?",
    shortAnswer: "To guarantee an unbroken audit trail, enforce real-time Data Loss Prevention (DLP), prevent cardholder data exfiltration to unvetted cloud storage, and eliminate dual-homed bridging vulnerabilities.",
    explanation: "Under financial compliance frameworks, any device accessing Cardholder Data Environments (CDE) or core banking servers must pass all traffic through monitored Next-Generation Firewalls and Intrusion Prevention Systems to prevent unauthorized outbound exfiltration and verify that no unmonitored lateral channels exist.",
    hint: "Banking regulations require 100% visibility and control over all packets entering or leaving a banking computer.",
    level: "Moderate",
    codeExample: `// PCI-DSS Requirement 1.3 & 2.1:
// Split tunneling must be disabled for remote access unless verified independent endpoint controls
// ensure traffic cannot bridge between private cardholder environments and untrusted public networks.`
  },
  {
    id: 7,
    question: "How does the 'IPv6 Leak' vulnerability manifest in legacy split-tunnel VPN configurations?",
    shortAnswer: "When the VPN client only tunnels IPv4 corporate traffic while the local ISP provides native IPv6 connectivity, all IPv6 traffic bypasses the VPN tunnel in cleartext over the physical NIC.",
    explanation: "Many home and mobile broadband providers assign native IPv6 addresses. If a corporate VPN is configured only for IPv4 subnets, the OS will prioritize IPv6 for modern web services (Google, Facebook, GitHub), sending those connections completely unencrypted over the physical interface without any corporate inspection.",
    hint: "The VPN encrypts IPv4, but forgets IPv6, letting IPv6 traffic escape through the side door.",
    level: "Expert",
    codeExample: `// IPv6 Leak Scenario:
// IPv4 10.0.0.0/8 ➔ tun0 (Encrypted VPN)
// IPv6 2405:201:...::/64 ➔ wlan0 (Bypasses VPN in cleartext to local ISP!)
// Mitigation: Tunnel both IPv4 & IPv6 or disable IPv6 on the physical interface while connected.`
  },
  {
    id: 8,
    question: "What is an 'App-Based Split Tunnel' (or Per-App VPN) and how does it function on modern endpoints?",
    shortAnswer: "A granular tunneling policy enforced by the OS kernel where only designated application binaries (e.g., internal ERP app, SSH client) route through the VPN adapter, while all other applications route through the local ISP.",
    explanation: "Unlike IP-based split tunneling (which relies on static destination IP subnets), App-Based Split Tunneling operates at the process/socket layer. The VPN driver inspects the originating executable path or application container ID (e.g., in iOS, Android, or Windows Intune MAM) and binds only authorized enterprise apps to the virtual tunnel interface.",
    hint: "Routing by software program name instead of IP address numbers.",
    level: "Moderate",
    codeExample: `// Windows PowerShell / MDM Per-App VPN Configuration:
// Add-VpnConnectionTriggerApplication -ConnectionName "CorpVPN" -ApplicationID "C:\\Program Files\\FinanceERP\\erp.exe"`
  },
  {
    id: 9,
    question: "What is a 'VPN Kill Switch' and why is it vital in preventing accidental split-tunnel fallback?",
    shortAnswer: "A software mechanism that automatically blocks all network traffic if the VPN connection drops, preventing sensitive data or DNS queries from leaking out over the unencrypted physical interface.",
    explanation: "When a remote worker's Wi-Fi fluctuates, the VPN tunnel may tear down momentarily. Without a Kill Switch, the OS immediately reverts to using the physical default gateway, sending previously protected corporate traffic and credentials across the cleartext public network until the tunnel reconnects.",
    hint: "An emergency brake that shuts down all internet access if the VPN tunnel gets disconnected.",
    level: "Basic",
    codeExample: `// Linux iptables Kill Switch Rule:
// Drop all outbound traffic on wlan0 except traffic to the VPN server's public IP on UDP 51820
iptables -A OUTPUT -o wlan0 -d 203.0.113.10 -p udp --dport 51820 -j ACCEPT
iptables -A OUTPUT -o tun0 -j ACCEPT
iptables -A OUTPUT -o wlan0 -j DROP`
  },
  {
    id: 10,
    question: "How do you inspect the active default route on a Linux system to verify whether Full Tunneling or Split Tunneling is active?",
    shortAnswer: "Run `ip route show` or `route -n`; if `default via <ip> dev tun0` is present, Full Tunneling is active; if `default via <ip> dev eth0/wlan0` is present with specific corporate subnets on `tun0`, Split Tunneling is active.",
    explanation: "The routing table dictates where the operating system sends packets. In Full Tunneling, the virtual adapter (`tun0` or `wg0`) claims the metric-lowest default route (0.0.0.0/0). In Split Tunneling, the physical network adapter retains the default route, and only specific corporate subnets (e.g., `10.0.0.0/8 dev tun0`) are directed to the tunnel.",
    hint: "Look at which network interface (dev) owns the 'default' route line.",
    level: "Basic",
    codeExample: `// Linux Route Output (Full Tunnel):
// default via 10.8.0.1 dev tun0 proto static metric 50
// 192.168.1.0/24 dev wlan0 proto kernel scope link src 192.168.1.45 metric 600

// Linux Route Output (Split Tunnel):
// default via 192.168.1.1 dev wlan0 proto dhcp metric 100
// 10.0.0.0/8 via 10.8.0.1 dev tun0 proto static metric 50`
  },
  {
    id: 11,
    question: "How does Secure Access Service Edge (SASE) resolve the conflict between Full Tunnel security and Split Tunnel performance?",
    shortAnswer: "SASE replaces the central datacenter bottleneck with globally distributed, cloud-native security points of presence (PoPs), allowing remote workers to full-tunnel to a nearby cloud edge with single-digit latency.",
    explanation: "Instead of backhauling all remote traffic through an on-premises enterprise datacenter in Barrackpore (hairpinning), SASE clients connect to the nearest cloud edge node in Kolkata. The cloud PoP performs Cloud SWG, CASB, DLP, and ZTNA inspection in real-time, forwarding SaaS traffic directly to the cloud and private traffic to the intranet without WAN congestion.",
    hint: "Move the security inspection engine to the cloud close to the user instead of pulling all traffic to the headquarters.",
    level: "Expert",
    codeExample: `// Traditional Full Tunnel:
// [User in Kolkata] ➔ [Datacenter in Barrackpore (Hairpin)] ➔ [Microsoft 365 Cloud in Mumbai]

// SASE Cloud-Delivered Full Tunnel:
// [User in Kolkata] ➔ [SASE Cloud PoP in Kolkata (Instant Inspection)] ➔ [Microsoft 365 Cloud in Mumbai]`
  },
  {
    id: 12,
    question: "What is 'Dynamic Split Tunneling' based on FQDN (Fully Qualified Domain Names)?",
    shortAnswer: "A mechanism where the VPN client or gateway dynamically resolves domain names (like `*.zoom.us` or `*.office.com`) to their active IP addresses and updates client routing tables in real time to exclude them from the tunnel.",
    explanation: "Because modern cloud providers (AWS, Microsoft Azure, Akamai CDN) utilize hundreds of dynamic IP addresses that change constantly, hardcoding static CIDR subnets for split tunneling fails. Dynamic Split Tunneling intercepts DNS lookups on the client and injects temporary host routes on demand.",
    hint: "Excluding websites by their web domain name rather than maintaining thousands of changing IP addresses.",
    level: "Moderate",
    codeExample: `// Dynamic Split Tunnel Configuration Example (Cisco AnyConnect / FortiClient):
// dynamic-split-exclude-domains: "teams.microsoft.com, zoom.us, webex.com"
// Client resolves zoom.us ➔ 170.114.52.2 ➔ Adds route: 170.114.52.2/32 via local ISP gateway.`
  },
  {
    id: 13,
    question: "How does OS-level 'IP Forwarding' create an immediate disaster on a split-tunnel endpoint?",
    shortAnswer: "If `ip_forward` is enabled on the client operating system, the machine acts as an active router, forwarding packets received from the local Wi-Fi subnet directly into the corporate VPN tunnel.",
    explanation: "By default, client OSes (Windows, macOS, Linux) should act solely as endpoints, discarding packets not addressed to their own IP. If a misconfigured developer or attacker enables packet forwarding, any machine on the local home or coffee shop network can set the laptop as its gateway and transmit packets into the corporate intranet.",
    hint: "Turning a remote laptop into a bridge router that connects the outside cafe to the internal office.",
    level: "Expert",
    codeExample: `// Check and Disable IP Forwarding on Linux:
$ sysctl net.ipv4.ip_forward
net.ipv4.ip_forward = 0  # Must be 0! If 1, endpoint bridges local LAN to corporate intranet!

// Disable on Windows via Registry:
// Set HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\IPEnableRouter = 0`
  },
  {
    id: 14,
    question: "What is the impact of Full Tunneling on Real-Time Media (Voice over IP and Video Conferencing)?",
    shortAnswer: "It introduces packet jitter, increased round-trip latency, packet loss, and potential audio/video distortion due to encryption overhead and hairpinning through datacenter firewalls.",
    explanation: "VoIP and video collaboration tools (Zoom, Microsoft Teams, Webex) rely on real-time UDP streams. Backhauling UDP media through deep packet inspection firewalls and proxy caches in a distant corporate datacenter increases jitter buffers and latency, degrading call quality for remote workers.",
    hint: "Video and voice calls lag, freeze, or sound robotic when forced through a congested corporate gateway.",
    level: "Moderate",
    codeExample: `// Video Latency Impact:
// Direct ISP to Zoom Cloud: ~18ms latency | 0.1% jitter (Smooth HD Video)
// Hairpinned Full Tunnel: ~92ms latency | 4.8% jitter + Packet Fragmentation (Lag & Freezing)`
  },
  {
    id: 15,
    question: "What is the difference between 'Split-Include' and 'Split-Exclude' tunneling terminology?",
    shortAnswer: "'Split-Include' specifies only the exact internal subnets that should enter the VPN (everything else goes to the internet); 'Split-Exclude' specifies only the exact public subnets to exclude from the VPN (everything else enters the tunnel).",
    explanation: "Split-Include is the classic split-tunneling model where corporate networks (e.g., 10.0.0.0/8) are included in the tunnel. Split-Exclude (Inverse Split Tunneling) sets the default route to the tunnel and excludes specific trusted public IP blocks (e.g., Microsoft 365).",
    hint: "Include means only listed subnets enter the tunnel; Exclude means only listed subnets stay out.",
    level: "Basic",
    codeExample: `// Split-Include Policy:
// included_routes = ["10.0.0.0/8", "172.16.0.0/12"]

// Split-Exclude Policy:
// default_route = "0.0.0.0/0 (VPN)"
// excluded_routes = ["52.96.0.0/12", "13.107.64.0/18"]`
  },
  {
    id: 16,
    question: "How can enterprise administrators enforce 'Host Isolation' on split-tunnel endpoints to neutralize the dual-homed bridge threat?",
    shortAnswer: "By deploying endpoint firewall rules that block all inbound and outbound local LAN traffic (except the local default gateway ARP/DHCP) while the VPN tunnel is connected.",
    explanation: "Host Isolation (or Local LAN Access Prevention) configures the endpoint's local firewall (Windows Defender Firewall or iptables) to drop all communication with other devices on the residential or public subnet (e.g., smart TVs, compromised IoT devices, other laptops), allowing packets strictly between the laptop and the VPN server.",
    hint: "Isolate the laptop in a bubble so it cannot talk to other devices on the home Wi-Fi while connected to the VPN.",
    level: "Expert",
    codeExample: `// Windows Group Policy / Firewall Rule for Host Isolation:
// Block all outbound traffic to 192.168.0.0/16 on the physical adapter while VPN profile is connected,
// allowing only Next-Hop Gateway MAC address communication for internet transport.`
  },
  {
    id: 17,
    question: "Why does Full Tunneling complicate TLS/SSL Certificate Inspection for remote users accessing external banking or healthcare websites?",
    shortAnswer: "Decrypting external HTTPS traffic requires installing the corporate root CA certificate on the client, which can trigger privacy violations, certificate pinning errors, and legal liability on personal/BYOD devices.",
    explanation: "When Full Tunneling intercepts all outbound HTTPS traffic via a corporate Next-Gen Firewall performing SSL forward proxy inspection, mobile apps and websites that use HTTP Public Key Pinning (HPKP) will reject the corporate certificate, breaking secure mobile banking and medical portals.",
    hint: "Corporate firewalls trying to decrypt private banking websites can break encryption trust certificates.",
    level: "Expert",
    codeExample: `// SSL Inspection Failure:
// [Remote Laptop] ➔ (HTTPS to Private Bank) ➔ [Corporate NGFW (Replaces SSL Cert with Enterprise CA)]
// ➔ Banking App detects certificate mismatch (Pinning Mismatch) ➔ CONNECTION BLOCKED!`
  },
  {
    id: 18,
    question: "What role does 'MTU (Maximum Transmission Unit)' and 'MSS Clamping' play in tunneling performance trade-offs?",
    shortAnswer: "VPN encapsulation adds header overhead (40 to 80 bytes), shrinking the usable payload size; without MSS clamping, full-tunnel packets exceeding 1500 bytes suffer IP fragmentation and severe throughput drops.",
    explanation: "Standard Ethernet MTU is 1500 bytes. When IPsec, GRE, or TLS headers wrap around an inner packet, the total size exceeds 1500 bytes. If routers drop fragmented packets (DF bit set), the connection hangs. MSS Clamping dynamically rewrites the TCP handshake to negotiate smaller segments (e.g., 1360–1420 bytes).",
    hint: "Wrapping a package inside another package makes it too big for standard mailboxes unless you shrink the inner contents.",
    level: "Moderate",
    codeExample: `// iptables MSS Clamping Rule for VPN Tunnel Interface:
iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu`
  },
  {
    id: 19,
    question: "How does Zero Trust Network Access (ZTNA) fundamentally differ from traditional Full Tunnel and Split Tunnel VPNs?",
    shortAnswer: "ZTNA grants granular access only to specific authorized applications based on identity and device posture rather than giving broad network-layer subnet access.",
    explanation: "Traditional VPNs (Full or Split) assign an internal IP address to the endpoint, placing it directly on the corporate network layer (Layer 3/4). ZTNA creates micro-segmented, reverse-proxy connections (Layer 7) strictly to designated individual applications (e.g., Jira only), preventing lateral network scanning entirely.",
    hint: "VPN gives a key to the entire building; ZTNA gives a single-use key to only one specific desk.",
    level: "Moderate",
    codeExample: `// VPN vs ZTNA Access Model:
// Full/Split VPN: User gets IP 10.8.0.45 ➔ Can ping/scan entire 10.0.0.0/8 subnet!
// ZTNA: User authenticates to Identity Broker ➔ Granted access ONLY to https://payroll.internal:443`
  },
  {
    id: 20,
    question: "What financial metrics should a Chief Information Security Officer (CISO) evaluate when comparing Full Tunneling vs Split Tunneling?",
    shortAnswer: "Datacenter WAN leased-line bandwidth upgrade costs (in INR ₹ Lakhs) versus the cost of cloud-delivered endpoint protection (EDR, Cloud SWG, CASB, ZTNA licenses).",
    explanation: "Full Tunneling requires purchasing massive 10 Gbps+ datacenter internet pipes and high-end hardware firewall appliances to handle all remote employee video and SaaS traffic. Split Tunneling saves WAN hardware costs, but requires investing in robust endpoint protection (EDR agents, cloud proxies) to secure decentralized traffic.",
    hint: "Compare the cost of paying for huge office internet connections vs paying for advanced endpoint security software.",
    level: "Moderate",
    codeExample: `// TCO Calculation:
// Full Tunnel Cost  = Datacenter WAN Leased Line (₹4.5L/mo) + Gateway Hardware Upgrades (₹12L)
// Split Tunnel Cost = Direct ISP Savings (-₹3L/mo) + Endpoint EDR/SASE Licenses (₹1.8L/mo) + Lower Gateway Load`
  },
  {
    id: 21,
    question: "How does a public Wi-Fi 'Captive Portal' interact with a strict Always-On Full Tunnel VPN client?",
    shortAnswer: "The Always-On VPN blocks unencrypted HTTP traffic, preventing the captive portal login page from loading until the VPN client implements a temporary 'Captive Portal Remediation' exception.",
    explanation: "Hotels, airports, and coffee shops require users to agree to Terms of Service on an unencrypted HTTP web page before granting internet access. If a corporate laptop enforces strict Always-On Full Tunneling with a Kill Switch, it drops all cleartext traffic, preventing the user from ever loading the login page to gain internet access.",
    hint: "The security software blocks all internet until the VPN connects, but the hotel Wi-Fi blocks the VPN until you log in on their web page.",
    level: "Moderate",
    codeExample: `// Captive Portal Detection Flow:
// VPN client detects HTTP 302 redirect on physical NIC ➔ Grants temporary 5-minute walled-garden browser access
// ➔ User completes hotel login ➔ VPN immediately establishes encrypted tunnel ➔ Drops walled garden.`
  },
  {
    id: 22,
    question: "What is 'Route Metric Prioritization' and how does it prevent routing loops during split-tunnel activation?",
    shortAnswer: "Assigning lower metric values (higher priority) to the VPN virtual adapter for corporate subnets while keeping a higher metric on the physical adapter for the local network.",
    explanation: "When multiple network adapters have overlapping routes, the operating system kernel consults route metrics (cost). If the VPN adapter assigns metric 10 to `10.0.0.0/8` and the local router assigns metric 50, the OS routes all corporate traffic through the tunnel without ambiguity.",
    hint: "Metrics tell the computer which path is the preferred priority when two roads lead in the same direction.",
    level: "Basic",
    codeExample: `// Route Table Metrics:
// Destination     Gateway       Interface    Metric
// 10.0.0.0/8      10.8.0.1      tun0         10     <-- (Preferred: Lower metric wins!)
// 10.0.0.0/8      192.168.1.1   wlan0        50`
  },
  {
    id: 23,
    question: "Why is 'Data Loss Prevention (DLP)' severely compromised when Split Tunneling is active without endpoint agents?",
    shortAnswer: "Because internet-bound file uploads, cloud storage transfers (Google Drive, Dropbox), and personal webmails bypass the central corporate proxy and DLP inspection engines entirely.",
    explanation: "In Full Tunneling, corporate DLP appliances scan every outbound HTTP POST request for sensitive patterns (Aadhaar numbers, PAN cards, credit cards, proprietary code). In Split Tunneling, employees can upload sensitive files directly to personal cloud storage over their local ISP without generating any corporate logs.",
    hint: "Without corporate eyes on the direct internet line, employees could leak confidential data to public cloud drives.",
    level: "Basic",
    codeExample: `// DLP Blind Spot:
// User copies 'Financial_Q3_Report.xlsx' ➔ Uploads to personal Mega.nz over direct wlan0 link
// ➔ Corporate Central DLP sees ZERO bytes! (Exfiltration successful without alerts)`
  },
  {
    id: 24,
    question: "What is an 'Endpoint Posture Check' (Host Integrity Assessment) and how does it safeguard Split Tunneling?",
    shortAnswer: "A pre-connection verification executed by the VPN client to ensure the remote endpoint has an active antivirus, running firewall, latest OS patches, and zero malware before granting tunnel access.",
    explanation: "Before establishing the tunnel, the VPN gateway interrogates the endpoint agent. If the client machine has disabled its firewall, missing critical security patches, or infected with malware, the gateway quarantines the device or restricts its routing privileges to prevent corporate network contamination.",
    hint: "A health check that inspects the laptop's security status before allowing it to connect to the office.",
    level: "Moderate",
    codeExample: `// Host Posture Verification Criteria:
// 1. BitLocker Disk Encryption: ENABLED
// 2. Windows Defender EDR Real-Time Protection: ACTIVE
// 3. Local OS Firewall: ACTIVE
// 4. CERT-In Compliance Patches: INSTALLED (< 30 days old)`
  },
  {
    id: 25,
    question: "How do 'DNS-over-HTTPS (DoH)' and 'DNS-over-TLS (DoT)' browser features undermine corporate split-tunnel DNS controls?",
    shortAnswer: "Browsers encrypt DNS queries over standard HTTPS (port 443) directly to public providers (Cloudflare 1.1.1.1 or Google 8.8.8.8), completely bypassing OS-level DNS routing and corporate domain filtering.",
    explanation: "Even if an administrator configures the VPN to resolve DNS through internal corporate servers, modern browsers with DoH enabled will bypass the OS resolver, encrypting lookups over port 443. This prevents internal hostname resolution and blinds corporate security teams to visited domains.",
    hint: "When web browsers secretly encrypt their own DNS queries directly to the internet, ignoring company DNS settings.",
    level: "Expert",
    codeExample: `// Group Policy to Disable DoH in Enterprise Browsers:
// Edge / Chrome Policy: BuiltInDnsClientEnabled = 0 (Enforce OS Resolver)
// Firefox Policy: network.trr.mode = 5 (Disabled)`
  },
  {
    id: 26,
    question: "What is the function of a 'Device Tunnel' vs a 'User Tunnel' in Windows Always-On VPN configurations?",
    shortAnswer: "A Device Tunnel connects automatically before user login using machine certificates to allow domain management and GPO updates; a User Tunnel connects after employee login to provide access to corporate applications.",
    explanation: "Microsoft Always-On VPN uses a two-stage architecture: Device Tunnels establish a restricted split tunnel directly to Domain Controllers and SCCM servers for patching, while User Tunnels enforce full or split tunneling policies tailored to the authenticated employee's role.",
    hint: "Device tunnel starts when the computer boots up; User tunnel starts when the person logs in.",
    level: "Moderate",
    codeExample: `// Windows Always-On VPN Architecture:
// Boot ➔ Device Tunnel (IKEv2 Machine Cert) ➔ Connects to Domain Controller (DC) & GPO
// User Login ➔ User Tunnel (SAML/EAP-TLS) ➔ Connects to Intranet ERP & File Shares`
  },
  {
    id: 27,
    question: "How do Mobile Device Management (MDM) profiles implement Per-App Split Tunneling on Apple iOS and Android Enterprise?",
    shortAnswer: "By assigning a managed VPN configuration profile directly to enterprise-managed application bundle IDs, isolating personal apps from using the corporate tunnel.",
    explanation: "On mobile devices, MDM servers (Microsoft Intune, VMware Workspace ONE) create a strict boundary between managed work containers and personal profiles. Personal WhatsApp and YouTube use the direct mobile carrier connection, while Microsoft Outlook and internal CRM route through the encrypted Per-App VPN tunnel.",
    hint: "Separating personal apps like YouTube from work apps like Outlook on mobile phones.",
    level: "Moderate",
    codeExample: `// Apple iOS Managed App Configuration Profile:
// <key>VPNUUID</key><string>CORP-VPN-PROFILE-UUID</string>
// <key>AppIdentifierMatches</key><array><string>com.microsoft.msedge</string><string>com.company.internalapp</string></array>`
  },
  {
    id: 28,
    question: "What forensic artifacts should an incident responder analyze on a split-tunnel endpoint following a suspected breach?",
    shortAnswer: "Local OS routing tables, active network sockets (`netstat`), local DNS resolver cache, local Windows Defender / EDR firewall logs, and web browser history.",
    explanation: "Because split-tunnel internet traffic does not pass through corporate network logs, forensic analysts cannot rely on datacenter firewall records. They must collect local endpoint evidence: `ipconfig /displaydns`, PowerShell event logs (Event ID 4688, 5156 for network connections), and local web browser artifacts to reconstruct the attack timeline.",
    hint: "Because the office didn't see the traffic, all the forensic clues exist only on the remote laptop itself.",
    level: "Expert",
    codeExample: `// Windows Forensic Collection Commands:
Get-NetTCPConnection -State Established | Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, OwningProcess
ipconfig /displaydns > C:\\forensics\\dns_cache.txt
Get-WinEvent -FilterHashtable @{LogName='Security';ID=5156} -MaxEvents 500`
  },
  {
    id: 29,
    question: "What is 'Traffic Shaping / QoS' and how is it used alongside Split Tunneling?",
    shortAnswer: "Prioritizing business-critical VPN traffic (ERP database queries, SSH, VoIP) over bulk background downloads to ensure responsiveness even under constrained bandwidth.",
    explanation: "When split tunneling is not permitted or when inverse tunneling is used, administrators configure Quality of Service (QoS) on VPN gateways. DSCP tags classify packets so that database transactions and VoIP get guaranteed low-latency queueing, while large file synchronization is throttled.",
    hint: "Giving emergency vehicles and priority buses their own fast lane in heavy network traffic.",
    level: "Basic",
    codeExample: `// Cisco Router QoS DSCP Classification for VPN:
// class-map match-any CRITICAL_ERP
//  match access-group name ERP_TRAFFIC
// policy-map VPN_QOS
//  class CRITICAL_ERP
//   priority percent 40`
  },
  {
    id: 30,
    question: "What is the recommended modern enterprise decision framework for choosing between Full Tunnel, Split Tunnel, and SASE/ZTNA?",
    shortAnswer: "Use Full Tunneling for high-security / regulated banking endpoints; use Inverse Split Tunneling for corporate laptops requiring SaaS collaboration; and migrate to SASE / ZTNA for cloud-first, scalable zero-trust architectures.",
    explanation: "Modern enterprises evaluate data sensitivity, compliance requirements, and cloud adoption. Financial and defense systems demand Full Tunneling or ZTNA with strict host isolation; general corporate workforces benefit from Inverse Split Tunneling to avoid gateway overload; and modern digital enterprises deploy SASE to achieve full inspection at the cloud edge.",
    hint: "High security finance = Full Tunnel; High SaaS usage = Inverse Split; Modern Cloud = SASE/ZTNA.",
    level: "Expert",
    codeExample: `// Enterprise Selection Matrix:
// Financial Core / PCI-DSS  ➔ FULL TUNNEL + Endpoint Host Isolation
// Hybrid Enterprise (M365)  ➔ INVERSE SPLIT TUNNEL (SaaS Exclusion)
// Next-Gen Cloud Enterprise ➔ SASE / ZTNA (Zero Trust Application Proxying)`
  }
];

export default questions;
