const questions = [
  {
    id: 1,
    question: "What is the primary architectural difference between a 'Remote Access VPN' and a 'Site-to-Site VPN'?",
    shortAnswer: "Remote Access VPN connects individual roaming client devices (laptops, phones) to a central gateway via client software with dynamic IP leases; Site-to-Site VPN connects two or more entire physical LAN subnets permanently via edge hardware routers transparently to users.",
    explanation: "Remote Access terminates on individual user endpoints (requiring user logins and MFA). Site-to-Site terminates on network routers, creating an always-on bridge between office networks where individual computers require zero VPN software.",
    hint: "Remote Access is for single remote people; Site-to-Site connects two entire office buildings together.",
    level: "Basic",
    codeExample: `// Architecture Comparison:
// Remote Access: [User Laptop] ──(TUN Adapter)──> [HQ VPN Gateway]
// Site-to-Site : [Branch LAN (10.10.0.0/16)] ──[Branch Router] ══(VTI)══ [HQ Router] ──[HQ LAN (10.20.0.0/16)]`
  },
  {
    id: 2,
    question: "How does 'Virtual IP Address Allocation' work in Remote Access VPNs?",
    shortAnswer: "The VPN gateway maintains an internal virtual IP address pool (e.g. `10.200.1.0/24`) and dynamically leases an IP address to the client upon successful authentication, assigning it to a virtual TUN/TAP network adapter.",
    explanation: "When connected, the client OS sees a new virtual network interface with the leased corporate IP. The gateway routes return packets destined for that leased IP back through the encrypted tunnel to the client.",
    hint: "The central gateway gives the remote laptop a temporary private company IP address while connected.",
    level: "Basic",
    codeExample: `// Virtual IP Lease:
// Remote Worker authenticates ➔ Gateway assigns IP: 10.200.1.45 (Mask: 255.255.255.0)`
  },
  {
    id: 3,
    question: "Why is a Site-to-Site VPN considered '100% Transparent' to the end-users inside the branch office?",
    shortAnswer: "Because encryption and encapsulation are performed entirely by edge gateway routers; computers in the branch office send standard Ethernet frames without installing any VPN client software or typing VPN passwords.",
    explanation: "An accountant in the Barrackpore branch accesses `http://10.20.1.50` exactly as if the server were located in the local room; the branch router intercepts the packet, encrypts it with IPsec, and forwards it to the HQ router.",
    hint: "Users do not have to install or click anything; the office routers do all the encryption automatically.",
    level: "Basic",
    codeExample: `// Transparent Forwarding:
// PC in Branch sends: IP(Src: 10.10.1.5, Dst: 10.20.1.50) ➔ Router encrypts via IPsec ➔ PC never knew a VPN was used!`
  },
  {
    id: 4,
    question: "What is a 'Virtual Tunnel Interface' (VTI) in modern Route-Based Site-to-Site IPsec VPNs?",
    shortAnswer: "A routable virtual network interface (e.g. `interface Tunnel1`) on a router that represents an IPsec tunnel, allowing standard dynamic routing protocols (BGP, OSPF) and firewall access control lists (ACLs) to treat the tunnel as a normal physical link.",
    explanation: "Legacy policy-based IPsec used complex crypto-maps that could not run dynamic routing protocols. VTIs treat the IPsec tunnel as an interface with its own IP address, enabling automated BGP route convergence.",
    hint: "A clean virtual network card on the router that lets dynamic routing protocols like BGP send traffic through the tunnel.",
    level: "Moderate",
    codeExample: `// Cisco VTI Configuration:
// interface Tunnel1
//  ip address 172.16.1.1 255.255.255.252
//  tunnel source GigabitEthernet0/0
//  tunnel destination 198.51.100.1
//  tunnel mode ipsec ipv4`
  },
  {
    id: 5,
    question: "What is 'Dead Peer Detection' (DPD) in Site-to-Site IPsec tunnels?",
    shortAnswer: "A keepalive mechanism (RFC 3706) where VPN gateways periodically exchange heartbeat messages (`R-U-THERE` / `R-U-THERE-ACK`) to detect if the remote peer has crashed or the link has dropped.",
    explanation: "Without DPD, if a remote router crashes, the local router continues sending encrypted packets into a black hole. DPD detects the outage in seconds and triggers automated route failover.",
    hint: "Periodic heartbeat ping checks that verify if the router at the other end of the tunnel is still alive.",
    level: "Moderate",
    codeExample: `// DPD Configuration:
// crypto isakmp keepalive 10 2 (Send DPD probe every 10 seconds; declare dead after 2 failed retries)`
  },
  {
    id: 6,
    question: "What are the structural trade-offs between 'Hub-and-Spoke' vs 'Full Mesh' Site-to-Site VPN topologies?",
    shortAnswer: "Hub-and-Spoke connects all branch offices to a central headquarters hub (simple configuration, centralized inspection, but creates HQ bandwidth bottlenecks and latency); Full Mesh connects every branch directly to every other branch (optimal latency, but scales poorly at $O(N^2)$ tunnels).",
    explanation: "For 10 branch offices, Hub-and-Spoke requires 10 tunnels. Full Mesh requires 45 tunnels. Large distributed enterprises use Dynamic Multipoint VPN (DMVPN) to create dynamic mesh tunnels on demand.",
    hint: "Hub-and-Spoke routes everything through main headquarters; Full Mesh connects every office directly to every other office.",
    level: "Moderate",
    codeExample: `// Tunnel Scaling Formula:
// Hub-and-Spoke : Tunnels = N
// Full Mesh     : Tunnels = N * (N - 1) / 2 (For 20 branches = 190 Tunnels!)`
  },
  {
    id: 7,
    question: "What is 'Dynamic Multipoint VPN' (DMVPN) and what three protocols make it work?",
    shortAnswer: "A Cisco routing architecture that enables direct on-demand spoke-to-spoke IPsec tunnels without hair-pinning traffic through HQ, combining: 1. Multipoint GRE (mGRE); 2. Next Hop Resolution Protocol (NHRP); 3. Dynamic IPsec.",
    explanation: "When Branch Barrackpore wants to talk to Branch Ichapur, it queries the NHRP hub server to get Ichapur's public IP and establishes a direct IPsec tunnel dynamically for the duration of the data transfer.",
    hint: "A smart system that builds temporary direct tunnels between branch offices when needed.",
    level: "Expert",
    codeExample: `// DMVPN Spoke Tunnel:
// Spoke queries NHRP Server ➔ Obtains Peer Public IP ➔ Dynamically establishes direct IPsec spoke-to-spoke tunnel!`
  },
  {
    id: 8,
    question: "What is 'Always-On Remote Access VPN' with Dual Machine and User Tunnels?",
    shortAnswer: "A two-phase architecture where the corporate laptop establishes a 'Machine Tunnel' (using TPM certificates) at the Windows boot screen for IT management, and transitions to a 'User Tunnel' (using SAML/MFA) once the employee logs in.",
    explanation: "The machine tunnel allows Domain Controllers to push Group Policies and process login scripts before user authentication. Once the user enters credentials, the user tunnel enforces personal permission boundaries.",
    hint: "A boot-time machine tunnel for IT updates followed by an employee user tunnel after logging in.",
    level: "Expert",
    codeExample: `// Windows Always-On VPN:
// Phase 1 (Boot) : Machine Tunnel active via TPM Cert ➔ Group Policy & BitLocker synced.
// Phase 2 (Login): User Tunnel active via Azure AD MFA ➔ Internal Intranet access granted.`
  },
  {
    id: 9,
    question: "What is 'GRE over IPsec' (Generic Routing Encapsulation) in legacy Site-to-Site designs?",
    shortAnswer: "Encapsulating multicast routing traffic (such as OSPF and EIGRP hello packets) inside GRE headers first, then encrypting the entire GRE packet with IPsec ESP Tunnel Mode.",
    explanation: "Raw IPsec cannot natively encapsulate multicast packets (which dynamic routing protocols require). GRE wraps multicast packets in unicast headers, which IPsec can then encrypt safely.",
    hint: "Wrapping dynamic routing hello packets inside GRE so that IPsec can encrypt them.",
    level: "Moderate",
    codeExample: `// GRE over IPsec Packet Structure:
// [ Outer Public IP Header ] ➔ [ IPsec ESP Header ] ➔ [ GRE Header ] ➔ [ Inner OSPF Multicast Packet (224.0.0.5) ]`
  },
  {
    id: 10,
    question: "How does 'Host Routing Table Manipulation' operate on Remote Access VPN client endpoints?",
    shortAnswer: "Upon tunnel connection, the VPN client software modifies the operating system's routing table (injecting static routes or modifying the default gateway `0.0.0.0/0`) to point toward the virtual TUN adapter.",
    explanation: "On Windows, running `route print` shows that traffic for `10.0.0.0/8` is redirected to the virtual adapter IP (`10.200.1.45`), while local LAN traffic continues through the physical Wi-Fi card.",
    hint: "Telling the computer's internal traffic map to send work file requests through the VPN card.",
    level: "Moderate",
    codeExample: `// Windows Route Table Injection:
// route add 10.20.0.0 mask 255.255.0.0 10.200.1.1 metric 1 if 14 (Redirects 10.20.x to TUN Adapter)`
  },
  {
    id: 11,
    question: "What is 'Equal-Cost Multi-Path' (ECMP) over redundant Site-to-Site IPsec tunnels?",
    shortAnswer: "Configuring a router with two identical IPsec tunnels across different physical ISPs (e.g. Airtel and Tata Fiber), distributing network traffic across both tunnels simultaneously to double bandwidth and provide sub-second failover.",
    explanation: "If both tunnels have an equal routing metric in BGP, the router load balances flows across both ISP connections. If one ISP goes down, 100% of traffic immediately routes over the surviving tunnel without session drops.",
    hint: "Running two VPN tunnels at the same time to double speed and stay online if one internet provider fails.",
    level: "Moderate",
    codeExample: `// ECMP BGP Routing:
// ip route 10.20.0.0 255.255.0.0 Tunnel1
// ip route 10.20.0.0 255.255.0.0 Tunnel2 (Both routes active in FIB table for per-flow load balancing)`
  },
  {
    id: 12,
    question: "What is 'Pre-Shared Key' (PSK) vs 'Digital Certificate (PKI)' authentication in Site-to-Site VPNs?",
    shortAnswer: "PSK shares a single static passphrase between routers (simple to set up, but insecure at scale); Digital Certificates use X.509 asymmetric cryptography from a Certificate Authority (CA), supporting automatic key rollover and revocation.",
    explanation: "If a company has 50 branches, changing a compromised PSK requires updating all 50 routers manually. PKI certificates allow individual branch certificates to be revoked instantly without touching other routers.",
    hint: "PSK is a shared password between routers; Digital Certificates are unique cryptographic identity badges.",
    level: "Basic",
    codeExample: `// PSK vs PKI:
// PSK: crypto isakmp key SecretKey123! address 198.51.100.1
// PKI: crypto isakmp identity dn ➔ Authenticates via X.509 CA Certificate (Enterprise Standard)`
  },
  {
    id: 13,
    question: "What is 'Clientless SSL-VPN Portal Reverse Proxying' vs 'Client-based Remote Access'?",
    shortAnswer: "Clientless SSL-VPN presents an HTML5 web portal inside any browser to access web apps and RDP/SSH without installing software; Client-based installs a virtual TUN adapter, providing full IP routing for any TCP/UDP application.",
    explanation: "Clientless is restricted to web-compatible applications. Client-based enables legacy client-server software, database administration tools, and direct ICMP ping debugging.",
    hint: "Clientless runs inside a web browser; Client-based installs a virtual network card on the computer.",
    level: "Basic",
    codeExample: `// Comparison:
// Clientless SSL-VPN : User opens https://vpn.corp.in ➔ Accesses internal webmail & web portal.
// Client-based VPN   : OpenVPN / AnyConnect runs ➔ User can run SQL Developer, SSH, and internal VoIP tools.`
  },
  {
    id: 14,
    question: "What is 'SAML 2.0 / OpenID Connect (OIDC)' integration in modern Remote Access VPN gateways?",
    shortAnswer: "Delegating user authentication to a cloud Identity Provider (IdP) such as Microsoft Entra ID or Okta, enabling Single Sign-On (SSO) and biometric Multi-Factor Authentication.",
    explanation: "When an employee opens the VPN client, a browser window redirects to the company's Azure AD login portal, enforcing Conditional Access policies before returning an encrypted SAML assertion token to the gateway.",
    hint: "Using your single corporate Microsoft or Google login with phone approval to log into the VPN.",
    level: "Moderate",
    codeExample: `// SAML Authentication Flow:
// VPN Client ➔ Redirects to https://login.microsoftonline.com ➔ User completes FIDO2 MFA ➔ SAML Token returned`
  },
  {
    id: 15,
    question: "What is 'Policy-Based IPsec (Crypto-Map)' vs 'Route-Based IPsec (VTI)' in Site-to-Site design?",
    shortAnswer: "Policy-Based VPN uses Access Control Lists (ACLs) to define interesting traffic that triggers encryption (traffic matching the ACL is encrypted); Route-Based VPN routes traffic into a virtual interface (`Tunnel1`), decoupling routing from encryption.",
    explanation: "Policy-based VPNs are prone to phase-2 Security Association mismatches when adding new subnets. Route-based VPNs simplify administration because standard routing commands (`ip route`) control tunnel traffic.",
    hint: "Policy-based uses complex manual access lists; Route-based uses a clean virtual network interface.",
    level: "Moderate",
    codeExample: `// Policy-Based Crypto-Map:
// crypto map MY_MAP 10 ipsec-isakmp
//  match address 101 (access-list 101 permit ip 10.10.0.0 0.0.255.255 10.20.0.0 0.0.255.255)`
  },
  {
    id: 16,
    question: "What is 'TCP Ingress Acceleration / BBR' in High-Performance Remote Access Gateways?",
    shortAnswer: "Using modern congestion control algorithms (like Google BBR) on the VPN gateway to maximize throughput and minimize packet bufferbloat over lossy residential broadband connections.",
    explanation: "Older Cubic congestion control slashes throughput when packets are dropped on Wi-Fi. BBR measures bottleneck bandwidth and round-trip time, maintaining high speeds even across 5% packet loss.",
    hint: "A smart congestion control formula that keeps VPN speeds fast even on noisy home Wi-Fi.",
    level: "Expert",
    codeExample: `// Linux Kernel BBR Activation:
// sysctl -w net.ipv4.tcp_congestion_control=bbr`
  },
  {
    id: 17,
    question: "What is 'Overlapping Subnet Conflict' in Site-to-Site VPNs and how is Twice-NAT used to resolve it?",
    shortAnswer: "When both connecting companies use the exact same private subnet (e.g. both Branch and HQ use `192.168.1.0/24`); Twice-NAT translates the source IP to a synthetic subnet (e.g. `172.31.1.0/24`) and destination to another synthetic subnet before routing.",
    explanation: "Routers cannot route between identical subnets. Twice-NAT rewrites both source and destination IP addresses at the VPN gateway, allowing two identically addressed networks to communicate without renumbering.",
    hint: "Translating IP numbers on both ends so two offices that use the same network numbers can talk without crashing.",
    level: "Expert",
    codeExample: `// Twice-NAT on Cisco Router:
// nat (inside,outside) source static Branch_LAN Synthetic_Branch destination static Synthetic_HQ Real_HQ`
  },
  {
    id: 18,
    question: "What is 'Inactivity Timeout and Re-Authentication Timers' on Remote Access VPNs?",
    shortAnswer: "Security thresholds that automatically disconnect idle VPN sessions (e.g. 15 minutes of zero traffic) or force full re-authentication every 12 or 24 hours to prevent unauthorized access on unattended laptops.",
    explanation: "If an employee leaves their laptop open in a coffee shop, an inactivity timer severs the connection, ensuring that an opportunistic thief cannot access corporate files.",
    hint: "Automatically disconnecting the VPN if you walk away from your computer for 15 minutes.",
    level: "Basic",
    codeExample: `// Cisco ASA Inactivity Timer:
// vpn-session-timeout 720 (12 hours maximum)
// vpn-idle-timeout 15 (15 minutes idle disconnect)`
  },
  {
    id: 19,
    question: "What is 'Multi-Gateway Geolocation Anycast' for Global Remote Access Workforces?",
    shortAnswer: "Announcing the same public IP address from VPN gateways in multiple datacenters (e.g. Mumbai, Frankfurt, Virginia) using BGP Anycast; remote workers automatically connect to the nearest gateway based on internet routing.",
    explanation: "Anycast eliminates manual server selection by users. An employee traveling from Kolkata to London automatically connects to the local European gateway with sub-20ms latency.",
    hint: "Using one single VPN address that automatically connects users to the closest server in the world.",
    level: "Expert",
    codeExample: `// BGP Anycast Routing:
// All 5 Global VPN Gateways announce 198.51.100.1 via BGP ➔ User routes to nearest PoP automatically!`
  },
  {
    id: 20,
    question: "What is 'IPsec Anti-Replay Sliding Window Size' tuning in Site-to-Site routers?",
    shortAnswer: "Adjusting the memory window size (e.g. from 64 to 1024 packets) that tracks processed packet sequence numbers, preventing false packet drops when packets arrive slightly out of order over multi-path ISP links.",
    explanation: "When traffic is load-balanced over dual ISP lines, packets may arrive out of order. A larger anti-replay window prevents the router from mistaking out-of-order packets for malicious replay attacks.",
    hint: "A memory buffer that lets packets arrive slightly out of order without being wrongly rejected.",
    level: "Moderate",
    codeExample: `// Cisco Anti-Replay Window Tuning:
// crypto ipsec security-association replay window-size 1024`
  },
  {
    id: 21,
    question: "What is 'Certificate-Based Device Fingerprinting' in Remote Access Posture Control?",
    shortAnswer: "Extracting hardware-unique identifiers (TPM endorsement keys, CPU serial numbers, motherboard UUIDs) and embedding them into the client certificate to ensure the certificate cannot be copied to unauthorized personal laptops.",
    explanation: "Even if an employee exports the `.pfx` certificate file to a USB drive, the gateway verifies that the hardware TPM key matches the specific corporate-managed device before admitting the connection.",
    hint: "Binding digital certificates to the physical laptop hardware so stolen certificates cannot be used on other PCs.",
    level: "Expert",
    codeExample: `// TPM-Bound Key Storage:
// Windows CNG Provider: Microsoft Platform Crypto Provider (Keys locked in hardware TPM 2.0 silicon)`
  },
  {
    id: 22,
    question: "What is 'Dynamic BGP Route Dampening' over flapping Site-to-Site IPsec tunnels?",
    shortAnswer: "A router mechanism that penalizes unstable, flapping tunnels (tunnels dropping and reconnecting every 10 seconds), preventing routing table oscillation from crashing core datacenter routers.",
    explanation: "If a rural broadband line flaps repeatedly, route dampening temporarily suppresses the route for 15 minutes, allowing stable secondary links to carry traffic without routing instability.",
    hint: "Ignoring a broken, flickering internet line temporarily so it doesn't cause errors across the network.",
    level: "Expert",
    codeExample: `// BGP Route Flap Dampening:
// router bgp 65001
//  bgp dampening 15 750 2000 60`
  },
  {
    id: 23,
    question: "What is 'Application-Specific Split Tunneling' in Remote Access VPNs?",
    shortAnswer: "A granular policy where specific trusted desktop applications (e.g. Microsoft Teams, Zoom, YouTube) bypass the VPN tunnel while all corporate line-of-business applications (SAP, Oracle, Git) are routed through the tunnel.",
    explanation: "This relieves massive video streaming bandwidth from corporate VPN concentrators while maintaining 100% encryption and inspection for sensitive enterprise applications.",
    hint: "Letting Zoom and Teams meetings go through local internet while work databases go through the secure VPN.",
    level: "Moderate",
    codeExample: `// App-Based Split Tunneling:
// Include in VPN : saplogon.exe, git.exe, sqlplus.exe
// Exclude from VPN: teams.exe, zoom.exe, spotify.exe`
  },
  {
    id: 24,
    question: "What is 'Bidirectional Forwarding Detection' (BFD) over Site-to-Site IPsec VTIs?",
    shortAnswer: "An ultra-fast sub-millisecond protocol that detects link failures in under 50 milliseconds (exchanging 10ms micro-probes), triggering instant BGP route reconvergence before VoIP or database sessions drop.",
    explanation: "Standard BGP keepalives take 30 to 90 seconds to declare a dead link. BFD detects fiber cuts in 30 milliseconds, achieving true carrier-grade hitless failover.",
    hint: "A super-fast millisecond heartbeat that spots broken connections in less than one-tenth of a second.",
    level: "Expert",
    codeExample: `// BFD on IPsec Tunnel:
// interface Tunnel1
//  bfd interval 50 min_rx 50 multiplier 3 ➔ Declares dead link in 150 milliseconds!`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding 'Remote Access VPN Session Logging' in India?",
    shortAnswer: "Organizations must retain complete records of all remote access VPN sessions—including user identity, real origin IP address, assigned virtual IP address, authentication method, connection start/end timestamps, and data volume—for 180 days.",
    explanation: "Statutory directives require synchronizing all gateway timestamps with NPL India NTP servers to ensure forensically undisputed audit trails during cyber crime investigations.",
    hint: "180-day retention of all remote login timestamps, real IPs, and user records under Indian law.",
    level: "Basic",
    codeExample: `// Structured CERT-In Remote Access Audit Log:
const certInSessionLog = {
  timestamp: "2026-08-23T14:15:00.180Z",
  userEmail: "debangshu.mukherjee@wb.gov.in",
  assignedVirtualIp: "10.200.1.52",
  realOriginIp: "203.0.113.88",
  authProtocol: "SAML_MFA_FIDO2",
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'SD-WAN Intelligent Traffic Steering' across Hybrid Site-to-Site VPN Tunnels?",
    shortAnswer: "Measuring latency, jitter, and packet loss on multiple parallel IPsec tunnels in real time, automatically routing VoIP traffic to the lowest-jitter link and bulk file replication to the highest-bandwidth link.",
    explanation: "SD-WAN continuously scores available paths. If ISP-A experiences 50ms of jitter, real-time voice calls dynamically shift to ISP-B mid-sentence with zero interruption.",
    hint: "Smart software that sends phone calls on the smoothest internet line and big files on the widest line.",
    level: "Moderate",
    codeExample: `// SD-WAN Application SLA Policy:
// Rule: Voice_SLA (Max Jitter: 10ms, Max Loss: 1%) ➔ Prefer Link_A; if degraded, steer to Link_B`
  },
  {
    id: 27,
    question: "What is 'Client-Side VPN Tunnel Kill Switch' in Remote Access Security?",
    shortAnswer: "A software hook in the client operating system that blocks all non-VPN network traffic if the encrypted tunnel drops unexpectedly, ensuring sensitive data is never transmitted in cleartext over the local ISP.",
    explanation: "If an employee's Wi-Fi briefly disconnects and reconnects, standard OS networking would immediately send DNS and HTTP queries in cleartext. The kill switch maintains a local firewall block until the VPN tunnel is verified.",
    hint: "A safety emergency brake that shuts down all internet if the VPN disconnects to stop data leaks.",
    level: "Basic",
    codeExample: `// Kill Switch Enforcement:
// On VPN Drop ➔ Block outbound traffic to 0.0.0.0/0 except UDP port 51820 to 198.51.100.1`
  },
  {
    id: 28,
    question: "What is 'ZTNA App-Gateway Deployment' as an architectural evolution of Site-to-Site and Remote Access VPNs?",
    shortAnswer: "Placing lightweight ZTNA application connector software inside private branch subnets that establish outbound-only encrypted micro-tunnels to a cloud security broker, eliminating exposed inbound open ports on branch routers.",
    explanation: "Traditional Site-to-Site VPNs require open public firewall ports (UDP 500/4500) that can be scanned by adversaries. ZTNA connectors initiate outbound TLS tunnels, rendering branch networks completely dark to external port scanners.",
    hint: "Using outbound-only micro-tunnels so hackers on the internet cannot even see your firewall ports.",
    level: "Moderate",
    codeExample: `// ZTNA Connector Architecture:
// Private Server ──(Outbound-Only TLS 443)──> Cloud ZTNA Broker ➔ Zero Inbound Open Ports on Branch Firewalls!`
  },
  {
    id: 29,
    question: "What is 'Ephemeral Micro-VM Bastion VPNs' in High-Security DevOps Remote Access?",
    shortAnswer: "Provisioning a single-use, disposable Linux micro-virtual machine (using Firecracker) for every remote administrative session that terminates the VPN tunnel and is completely destroyed upon logout.",
    explanation: "If an attacker compromises an administrator's session, the entire virtual machine is destroyed the moment the session ends, eliminating any possibility of persistent malware lingering on the bastion host.",
    hint: "Creating a temporary virtual computer that is deleted and destroyed after every remote session.",
    level: "Expert",
    codeExample: `// Micro-VM Lifecycle:
// Admin Connects ➔ Boot Firecracker VM in 120ms ➔ Session Active ➔ On Logout: Destroy VM & Wipe Memory!`
  },
  {
    id: 30,
    question: "Synthesize the architectural decision framework: When should an enterprise deploy Remote Access vs Site-to-Site VPNs?",
    shortAnswer: "Deploy Remote Access VPNs for individual mobile workers, roaming staff, and contractors requiring dynamic, user-authenticated access with endpoint posture validation; deploy Site-to-Site VPNs with Route-Based VTIs for permanent, transparent inter-office LAN connectivity between fixed branch offices and datacenters—combining both in a hybrid architecture compliant with CERT-In directives and the DPDP Act 2023.",
    explanation: "A mature enterprise integrates both: Site-to-Site IPsec connects all branch offices (e.g. Barrackpore, Ichapur, Shyamnagar) into a unified corporate network, while Remote Access VPNs provide secure encrypted access for mobile staff connecting from public networks.",
    hint: "Remote Access for mobile employees; Site-to-Site for permanent office-to-office connections.",
    level: "Moderate",
    codeExample: `// The Master Hybrid Architecture:
// Fixed Subnets (Branch Offices) : [Site-to-Site Route-Based IPsec Mesh with BGP / VTI]
// Roaming Staff (Mobile Users)   : [Remote Access WireGuard / SSL-VPN with SAML MFA & Posture Checking]`
  }
];

export default questions;
