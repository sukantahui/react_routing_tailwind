const questions = [
  {
    id: 1,
    question: "What are the three classic firewall architectural topologies defined in NIST SP 800-41?",
    shortAnswer: "1. Dual-Homed Host Architecture; 2. Screened Host Architecture; 3. Screened Subnet (DMZ) Architecture.",
    explanation: "These three architectures represent the evolution of perimeter network segmentation: from a single multi-NIC computer running software proxies (Dual-Homed), to a screening router shielding an internal bastion host (Screened Host), to an isolated intermediate buffer network (Screened Subnet / DMZ).",
    hint: "Dual-Homed Host, Screened Host, and Screened Subnet.",
    level: "Basic",
    codeExample: `// The 3 Classic Firewall Architectures:
const firewallArchitectures = [
  "1. Dual-Homed Host (1 PC with 2 NICs, IP forwarding disabled)",
  "2. Screened Host (1 Screening Router + 1 Bastion Host on LAN)",
  "3. Screened Subnet (DMZ buffer isolating public servers from internal LAN)"
];`
  },
  {
    id: 2,
    question: "What is a 'Dual-Homed Host' architecture and what critical operating system kernel setting MUST be enforced?",
    shortAnswer: "A single computer equipped with at least two Network Interface Cards (one connected to WAN, one to LAN) where IP Forwarding is strictly disabled in the kernel (`net.ipv4.ip_forward = 0`).",
    explanation: "By disabling IP forwarding, the host acts as a hard break between the two networks: Layer 3 packets cannot route directly between interfaces. All communication between the outside world and the internal network must be mediated by application proxy daemons running on the dual-homed computer.",
    hint: "A computer with two NICs where IP forwarding is turned off.",
    level: "Basic",
    codeExample: `// Kernel IP Forwarding Disablement:
// sudo sysctl -w net.ipv4.ip_forward=0
// echo "net.ipv4.ip_forward = 0" >> /etc/sysctl.conf`
  },
  {
    id: 3,
    question: "What is the primary vulnerability and failure mode of a Dual-Homed Host architecture?",
    shortAnswer: "It represents a Single Point of Failure; if an attacker attains root/administrator access or exploits a local software vulnerability, they can enable IP forwarding (`ip_forward=1`), exposing the entire internal network.",
    explanation: "Because both the public interface and the internal network interface reside on the same physical operating system, a single kernel compromise or root privilege escalation allows the attacker to rewrite routing tables and gain unrestricted access to the internal LAN.",
    hint: "Root compromise of that single computer gives the attacker access to both networks.",
    level: "Moderate",
    codeExample: `// Single Point of Failure Failure Mode:
// Attacker gains root on Dual-Homed Host → Executes: sysctl -w net.ipv4.ip_forward=1
// Result: Direct packet routing opened between Internet and Private LAN!`
  },
  {
    id: 4,
    question: "How does a 'Screened Host' architecture operate and why is it structurally superior to a basic Dual-Homed Host?",
    shortAnswer: "It combines an external Screening Router (packet filter) with a single internal Bastion Host located on the private LAN; the router drops direct traffic to user desktops, forcing all external traffic to the Bastion Host.",
    explanation: "In a Screened Host topology, the screening router provides hardware-level packet filtering at the perimeter, discarding unauthorized ports and IP floods before they reach the bastion host. The bastion host handles application proxying and public services.",
    hint: "Combines a screening router at the border with a bastion host on the LAN.",
    level: "Moderate",
    codeExample: `// Screened Host Architecture Layout:
// [Internet] ---> [Screening Router (Permits Port 443 to Bastion only)] ---> [Internal LAN Subnet (Contains Bastion + User PCs)]`
  },
  {
    id: 5,
    question: "What is the critical structural vulnerability of the Screened Host architecture?",
    shortAnswer: "The Bastion Host is physically attached to the internal private LAN; if the Bastion Host is compromised, the attacker is already inside the corporate subnet and can scan adjacent workstations freely.",
    explanation: "Because the Bastion Host shares the same broadcast domain and Ethernet switch as employee workstations, a compromised bastion gives the attacker immediate access to execute ARP spoofing, broadcast sniffing, and lateral SMB worm attacks against all local desktops.",
    hint: "The bastion sits on the same internal switch as company computers; compromising it compromises the LAN.",
    level: "Moderate",
    codeExample: `// Screened Host Lateral Exposure:
// Attacker exploits Bastion (10.10.1.10) → Executes: nmap -sS 10.10.1.0/24 (Scans all internal PCs on same switch!)`
  },
  {
    id: 6,
    question: "What is a 'Screened Subnet' (Demilitarized Zone - DMZ) architecture and why is it the enterprise gold standard?",
    shortAnswer: "An architecture that creates an isolated intermediate buffer network (the DMZ) separating the untrusted public Internet from the trusted internal LAN, ensuring public servers do not reside on the internal corporate network.",
    explanation: "In a Screened Subnet, public-facing servers (Web, DNS, Mail) reside in the DMZ. If a web server is compromised, the internal firewall blocks the server from initiating connections into the corporate LAN, containing the blast radius within the DMZ.",
    hint: "An isolated buffer network between the Internet and internal LAN.",
    level: "Basic",
    codeExample: `// Screened Subnet (DMZ) Layout:
// [Internet] ---> (External FW) ---> [DMZ Subnet (Web/DNS)] ---> (Internal FW) ---> [Internal Corporate LAN]`
  },
  {
    id: 7,
    question: "What is the difference between a 'Single Tri-Homed Firewall' and a 'Dual Back-to-Back Firewall' DMZ architecture?",
    shortAnswer: "A Tri-Homed firewall uses a single physical box with 3 interfaces (WAN, DMZ, LAN); a Dual Back-to-Back architecture uses two separate firewalls (External Firewall between WAN and DMZ, Internal Firewall between DMZ and LAN).",
    explanation: "A Tri-Homed firewall is cost-effective and centralized but has a single firmware/OS codebase. Dual Back-to-Back firewalls provide physical separation and allow using two different firewall vendors (heterogeneous design) to eliminate vendor-specific zero-day risks.",
    hint: "One box with three ports vs two separate physical firewalls in series.",
    level: "Moderate",
    codeExample: `// Tri-Homed vs Back-to-Back:
// Tri-Homed: [WAN Interface] <-> [SINGLE FIREWALL] <-> [DMZ Interface] / [LAN Interface]
// Back-to-Back: [Internet] → [FW 1 (Palo Alto)] → [DMZ Subnet] → [FW 2 (Fortinet)] → [Internal LAN]`
  },
  {
    id: 8,
    question: "Why do high-security banking and military networks enforce 'Heterogeneous (Multi-Vendor) Back-to-Back Firewalls'?",
    shortAnswer: "To prevent a single vendor firmware vulnerability or zero-day exploit from compromising both the perimeter and the internal network simultaneously.",
    explanation: "If an adversary discovers a pre-auth zero-day exploit in Vendor A's firewall (e.g. Palo Alto PAN-OS), they can breach the external firewall and compromise the DMZ. However, because the internal firewall runs Vendor B's code (e.g. Fortinet FortiOS), the exploit fails at the internal boundary, preventing access to the core database.",
    hint: "Using two different firewall brands so an exploit against one cannot breach the other.",
    level: "Expert",
    codeExample: `// Heterogeneous Defense Principle:
// External Firewall: Vendor A (Palo Alto) → Exploit Succeeds → DMZ Breached
// Internal Firewall: Vendor B (Fortinet)   → Exploit FAILS!    → Core Database Protected!`
  },
  {
    id: 9,
    question: "What is the foundational 'One-Way Connection Policy' enforced between the DMZ and the Internal LAN?",
    shortAnswer: "Internal LAN hosts are permitted to initiate connections into the DMZ (e.g., for administration or data sync), but DMZ servers are STRICTLY PROHIBITED from initiating unsolicited connections into the internal LAN.",
    explanation: "If a DMZ web server is compromised, the attacker cannot open reverse shells, RDP sessions, or SMB scans to internal office workstations. The only exception is strictly controlled pinholes (e.g., DMZ Web connecting to internal DB on TCP port 5432 only).",
    hint: "LAN can talk to DMZ, but DMZ cannot start new conversations with LAN.",
    level: "Basic",
    codeExample: `// One-Way DMZ Rule Base:
// ALLOW: Internal_LAN (10.10.0.0/16) → DMZ (172.16.1.0/24) (Admin access)
// ALLOW: DMZ_Web (172.16.1.10)       → Internal_DB (10.10.4.50:5432) (Pinhole query)
// DROP : DMZ (172.16.1.0/24)         → Internal_LAN (10.0.0.0/8) (Blocks lateral pivot!)`
  },
  {
    id: 10,
    question: "What is a 'Bastion Host' and what operating system hardening measures must be applied to it?",
    shortAnswer: "A heavily fortified, minimalist server designed to withstand continuous external attacks, stripped of all unnecessary services, compilers, default accounts, and unneeded network protocols.",
    explanation: "Bastion hosts act as the single entry point for administrative or proxy access. Hardening includes: removing compilers (`gcc`), disabling unused daemons, enforcing SSH key-only access with MFA, applying kernel hardening (ASLR, AppArmor/SELinux), and shipping audit logs off-box in real-time.",
    hint: "A stripped-down, fortified server locked down to resist attacks.",
    level: "Moderate",
    codeExample: `// Bastion Host Hardening Commands:
// sudo systemctl disable cups avahi-daemon rpcbind
// sudo apt-get remove gcc g++ make
// sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config`
  },
  {
    id: 11,
    question: "What is an 'External Screening Router' (Choke Router) in a Screened Subnet topology?",
    shortAnswer: "The outer router connected directly to the Internet service provider that performs initial high-speed stateless filtering, dropping Bogon IP addresses, spoofed packets, and unapproved protocols before traffic reaches the firewall.",
    explanation: "The External Screening Router acts as the perimeter coarse filter. It enforces uRPF (RFC 3704) to prevent IP spoofing, rate-limits volumetric ICMP/UDP floods, and directs all approved public web and DNS traffic into the DMZ.",
    hint: "The outermost router that discards junk traffic and spoofed IPs at line rate.",
    level: "Basic",
    codeExample: `// External Screening Router ACL:
// access-list 101 deny ip 10.0.0.0 0.255.255.255 any (Drop Bogon private IPs on WAN)
// access-list 101 permit tcp any host 203.0.113.10 eq 443`
  },
  {
    id: 12,
    question: "What is an 'Internal Screening Router' in a classic three-tier Screened Subnet architecture?",
    shortAnswer: "The inner screening device sitting between the DMZ and the internal corporate LAN, enforcing strict access controls to isolate internal user desktops and databases from the DMZ.",
    explanation: "While the external router protects the DMZ from the public Internet, the internal screening router protects the private corporate LAN from potential compromises occurring within the DMZ itself.",
    hint: "The inner boundary guard protecting the internal network from the DMZ.",
    level: "Moderate",
    codeExample: `// Internal Screening Router Policy:
// ALLOW: DMZ_Web → DB_Server port 5432
// DENY : DMZ_Subnet → ANY Internal Subnet`
  },
  {
    id: 13,
    question: "What is a 'Database Pinhole Rule' in DMZ architecture and how is it secured?",
    shortAnswer: "A tightly restricted firewall rule that allows a DMZ web application server to connect exclusively to the database server IP on its specific listening port (e.g. TCP 5432) using encrypted mutual TLS (mTLS).",
    explanation: "Rather than opening the entire database subnet, a pinhole rule specifies exact source and destination `/32` host IPs and a single port: `172.16.1.10:ANY → 10.10.4.50:5432`. Connections must use mTLS with client certificates so compromised DMZ processes without the certificate cannot query the database.",
    hint: "A tiny, specific opening allowing only the web server to talk to the database on one port.",
    level: "Moderate",
    codeExample: `// PostgreSQL Database Pinhole Rule:
// ALLOW: host 172.16.1.10 (DMZ Web) → host 10.10.4.50 (Internal DB) eq 5432 Proto: TCP
// Enforce: Certificate-based mTLS authentication`
  },
  {
    id: 14,
    question: "Why should an enterprise NEVER place internal user workstations in the DMZ?",
    shortAnswer: "The DMZ is a semi-trusted zone exposed to continuous Internet probing; placing employee workstations in the DMZ exposes client operating systems directly to external exploitation without internal firewall protection.",
    explanation: "User workstations run hundreds of third-party applications, web browsers, and client services with large attack surfaces. Workstations belong exclusively in private internal subnets protected behind multiple firewall tiers and NAT boundaries.",
    hint: "Employee computers have large attack surfaces and must never be exposed to public DMZ probing.",
    level: "Basic",
    codeExample: `// DMZ Placement Rule:
// ALLOWED in DMZ: Web Reverse Proxy, Public DNS, External Mail Relay, SFTP Gateway
// FORBIDDEN in DMZ: Employee Desktops, Active Directory Domain Controllers, Core DBs`
  },
  {
    id: 15,
    question: "What is a 'Jump Server' (Jump Box) in secure DMZ management architectures?",
    shortAnswer: "A hardened, dedicated bastion server through which systems administrators must establish an authenticated, MFA-enforced SSH or RDP session before accessing internal production servers.",
    explanation: "Administrators cannot connect directly from their personal laptops to production database servers. They connect to the Jump Server with MFA and FIDO2 hardware keys. The Jump Server records video sessions, logs keystrokes, and initiates secondary connections to internal servers.",
    hint: "A secure intermediate server that all administrators must log into before reaching production systems.",
    level: "Moderate",
    codeExample: `// Jump Box Access Flow:
// Admin Laptop ---> [MFA SSH (Port 22)] ---> [Jump Server (172.16.1.99)] ---> [Internal DB Server (10.10.4.50)]`
  },
  {
    id: 16,
    question: "What is a 'Dual-DMZ (Split DMZ / Multi-Tier DMZ)' architecture and when is it deployed?",
    shortAnswer: "An architecture with two distinct DMZs: an 'External DMZ' hosting presentation web servers and a separate 'Internal Application DMZ' hosting business logic/middleware, fully isolating web servers from core databases.",
    explanation: "In 3-tier enterprise architectures (Presentation → Logic → Data), a web compromise in the External DMZ only gives the attacker access to the Application DMZ via strict API calls (REST/gRPC), with zero direct reachability to the internal database tier.",
    hint: "Two separate DMZs: External for Web, Internal for Application Middleware.",
    level: "Expert",
    codeExample: `// 3-Tier Multi-Tier DMZ Layout:
// [Internet] → (FW 1) → [External DMZ (Web)] → (FW 2) → [Internal DMZ (App Logic)] → (FW 3) → [Internal Data Vault]`
  },
  {
    id: 17,
    question: "What is 'Split-Horizon DNS' (Split-Brain DNS) in Screened Subnet environments?",
    shortAnswer: "Maintaining two separate DNS servers: an external public DNS in the DMZ that resolves only public server IPs (WAN IPs), and an internal private DNS that resolves internal corporate hostnames (RFC 1918 IPs).",
    explanation: "Split-Horizon DNS prevents external reconnaissance from discovering internal server names, IP subnets, or Active Directory infrastructure. External Internet users only see the DMZ public records, keeping internal corporate network topology completely confidential.",
    hint: "One DNS server for the outside world, and a separate private DNS server for internal staff.",
    level: "Moderate",
    codeExample: `// Split-Horizon DNS Resolution:
// External User queries "portal.bank.gov.in" → Resolves Public IP: 203.0.113.10
// Internal User queries "portal.bank.gov.in" → Resolves Private IP: 172.16.1.10`
  },
  {
    id: 18,
    question: "How does a Screened Subnet architecture mitigate 'Data Exfiltration' by malware that infects internal workstations?",
    shortAnswer: "Internal firewalls block direct outbound Internet connectivity from user workstations, forcing all outbound traffic through forward proxies located in the DMZ that inspect, authenticate, and log all egress data.",
    explanation: "If malware infects an internal workstation, it cannot open a direct TCP reverse shell to an external IP. All egress traffic must pass through the DMZ forward proxy, which blocks unauthorized ports, scans files for data loss patterns, and terminates unauthorized connections.",
    hint: "Internal firewalls block direct outbound connections, forcing all traffic through inspected DMZ proxies.",
    level: "Moderate",
    codeExample: `// Egress Proxy Enforcement:
// DROP : Internal_Workstations (10.10.1.0/24) → WAN (ANY:ANY) (Direct Internet blocked!)
// ALLOW: Internal_Workstations → DMZ_Forward_Proxy (172.16.1.25:8080) Only`
  },
  {
    id: 19,
    question: "What is 'Out-of-Band (OOB) Management' in enterprise firewall architectures?",
    shortAnswer: "A physically separate, dedicated network infrastructure (separate switches, cabling, and management ports) used exclusively for administering firewalls and servers, completely isolated from production data traffic.",
    explanation: "If production data networks experience a massive DDoS flood or ransomware broadcast storm, administrators can still access firewall consoles via the dedicated OOB management network (e.g. `10.10.99.0/24`) without packet loss or interference.",
    hint: "A completely separate private network dedicated solely to administrator access and maintenance.",
    level: "Expert",
    codeExample: `// Out-of-Band (OOB) Architecture:
// Firewall MGMT Port → Dedicated OOB Switch (VLAN 99) → Air-gapped Admin Terminal`
  },
  {
    id: 20,
    question: "What is 'Air-Gapping' in ultra-high security defense and critical infrastructure architectures?",
    shortAnswer: "A physical isolation architecture where a secure network has zero physical, wireless, or logical connections to any external network or the public Internet.",
    explanation: "Air-gapped networks (used in nuclear power plants, military command systems, and critical SCADA grids) prevent all remote network penetration. Data transfer into the air-gapped network is possible only via physically audited, scanned optical media or unidirectional data diodes.",
    hint: "Total physical disconnection from the Internet and all other networks.",
    level: "Basic",
    codeExample: `// Air-Gapped Network Concept:
// [Public Internet] ========= [AIR GAP (No Cables / No Wireless)] ========= [Critical SCADA Network]`
  },
  {
    id: 21,
    question: "What is an 'Optical Data Diode' (Unidirectional Security Gateway) in industrial DMZ architectures?",
    shortAnswer: "A hardware device utilizing physical fiber optic transmitter-only (LED) and receiver-only (photodiode) components to permit network data to flow in ONLY ONE physical direction, making return traffic physically impossible.",
    explanation: "Used in Purdue Model Level 3.5 Industrial DMZs: sensor telemetry flows outbound from critical power grid PLCs to the monitoring dashboard, but the physical absence of a return fiber strand makes it physically impossible for an external attacker to send exploit packets back into the PLC.",
    hint: "A one-way hardware fiber connection that physically prevents data from flowing backward.",
    level: "Expert",
    codeExample: `// Hardware Optical Data Diode:
// SCADA PLC (LED Transmitter) ────── [Single Optical Fiber Strand] ──────> SOC Dashboard (Photodiode Receiver)`
  },
  {
    id: 22,
    question: "What is 'VLAN Hopping' and why must physical interface separation or strict 802.1Q tagging be enforced on DMZ firewalls?",
    shortAnswer: "An attack where an adversary uses Double Tagging or Switch Spoofing to send packets from a DMZ VLAN into an internal LAN VLAN; firewalls defeat this by using dedicated physical interfaces or disabling DTP and native VLAN 1.",
    explanation: "If DMZ and Internal LAN share the same physical switch trunk without proper hardening, an attacker in the DMZ can craft double-tagged 802.1Q frames to bypass VLAN isolation. Best practice enforces separate physical switches or dedicated physical firewall interfaces for the DMZ.",
    hint: "Attacking switch trunking to jump between VLANs; defeated by dedicated physical cables and disabling native VLAN 1.",
    level: "Expert",
    codeExample: `// Switch Hardening against VLAN Hopping:
// switchport mode access
// switchport nonegotiate
// switchport access vlan 20 (DMZ VLAN)`
  },
  {
    id: 23,
    question: "How does a Screened Subnet architecture comply with the Indian DPDP Act 2023 technical safeguard requirements?",
    shortAnswer: "By isolating citizen personal data in internal encrypted vaults behind multi-tier screening boundaries, preventing public web server compromises from disclosing personal data, avoiding penalties up to ₹250 Crores.",
    explanation: "Section 8(5) of the DPDP Act mandates that data fiduciaries implement reasonable technical safeguards. Placing databases in internal segmented subnets behind DMZs ensures that even if public web portals suffer an RCE exploit, citizen Aadhaar and banking records remain inaccessible.",
    hint: "Isolating personal data in internal vaults so web hacks cannot steal citizen records.",
    level: "Basic",
    codeExample: `// DPDP Compliance Architecture:
// DMZ Web Portal (No PII Stored) <=== Pinhole TLS ===> Internal Data Vault (AES-256 HSM Tokenized)`
  },
  {
    id: 24,
    question: "What is a 'Cloud Virtual Private Cloud (VPC) Subnet Isolation' architecture in AWS / Azure?",
    shortAnswer: "Creating distinct Public Subnets (DMZ with Internet Gateway attached) and Private Subnets (Internal DB with NAT Gateway only), controlled by Network Access Control Lists (NACLs) and Security Groups.",
    explanation: "In AWS/Azure, the Screened Subnet is implemented via VPC subnets: Public Subnet hosts load balancers and web servers; Private Subnet has no route to the Internet Gateway, allowing outbound updates only via an egress NAT Gateway, perfectly mirroring on-premise DMZ architecture.",
    hint: "Using cloud Public and Private VPC subnets to isolate web servers from internal databases.",
    level: "Moderate",
    codeExample: `// AWS VPC Architecture:
// Public Subnet (DMZ)  : Route Table → 0.0.0.0/0 → Internet Gateway (igw-xxxx)
// Private Subnet (LAN) : Route Table → 0.0.0.0/0 → NAT Gateway (nat-xxxx)`
  },
  {
    id: 25,
    question: "What is 'Bypass / Fail-Open vs Fail-Close' hardware design in firewall architecture?",
    shortAnswer: "Fail-Open (Bypass) connects the two network ports with an optical/relay switch if the firewall loses power, maintaining network connectivity; Fail-Close cuts all traffic, prioritizing security over availability.",
    explanation: "In high-security enterprise perimeters, firewalls MUST be configured to Fail-Close: if power fails or the kernel panics, all traffic is severed to prevent uninspected packets from entering. In life-critical industrial networks, bypass switches may fail-open to prevent physical disasters.",
    hint: "Fail-Close shuts the gate during power loss; Fail-Open leaves the gate open for traffic flow.",
    level: "Moderate",
    codeExample: `// Hardware Failure Policy:
// Security Perimeter   : Fail-Close (Default-Deny enforced on power loss)
// Critical Hospital IoT: Fail-Open (Maintains heart monitor network flow)`
  },
  {
    id: 26,
    question: "Why should an enterprise firewall NEVER perform user-facing services (e.g. hosting public websites or file shares) directly on the firewall appliance?",
    shortAnswer: "Hosting application services on the firewall creates local software vulnerabilities that attackers can exploit to gain root access on the firewall itself, compromising the entire network perimeter.",
    explanation: "A firewall appliance should run ONLY packet filtering, state tracking, and routing engines. If a web server daemon running on the firewall suffers an RCE vulnerability, the attacker attains root access on the primary boundary gatekeeper.",
    hint: "Never run public websites directly on the firewall box; keep the gatekeeper dedicated to security only.",
    level: "Basic",
    codeExample: `// Golden Rule of Firewall Hardening:
// Firewall Appliance = Routing + Packet Inspection + State Tracking ONLY (Zero Hosted Apps!)`
  },
  {
    id: 27,
    question: "What is 'Micro-Segmentation' inside the internal corporate network tier of a Screened Subnet architecture?",
    shortAnswer: "Dividing the internal LAN into small, isolated security zones (e.g. HR, Engineering, Finance, VoIP) enforced by internal firewalls, preventing lateral movement between internal departments.",
    explanation: "While the DMZ protects against external attacks, micro-segmentation protects against internal lateral attacks. If an HR employee falls for a phishing email, internal firewall rules block the infected PC from connecting to Engineering source code repositories or Finance databases.",
    hint: "Dividing internal office networks into small isolated compartments to stop lateral malware spread.",
    level: "Moderate",
    codeExample: `// Inter-VLAN Micro-segmentation Rule:
// DROP Source: HR_VLAN (10.10.1.0/24) → Destination: Engineering_VLAN (10.10.2.0/24)`
  },
  {
    id: 28,
    question: "How does a Security Operations Center (SOC) monitor and detect 'DMZ Breakout Attempts'?",
    shortAnswer: "By configuring SIEM alerts on any traffic where the Source IP is in the DMZ subnet and the Destination IP is in the internal LAN subnet that triggers an internal firewall drop rule.",
    explanation: "Because legitimate DMZ web servers should only ever connect to the specific database pinhole, any connection attempt from the DMZ to other internal IPs (e.g. attempting SSH on port 22 or SMB on port 445) is a definitive indicator of compromise (IoC), triggering high-priority SOC alerts.",
    hint: "Any connection attempt from a DMZ server to unapproved internal LAN ports triggers an immediate security alarm.",
    level: "Basic",
    codeExample: `// SIEM Correlation Rule for DMZ Breakout:
// IF Event.SrcIP IN DMZ_Subnet AND Event.DstIP IN LAN_Subnet AND Event.Action == 'DROP':
//     Trigger Alarm: "CRITICAL: DMZ Server Compromised - Lateral Breakout Detected!"`
  },
  {
    id: 29,
    question: "What is 'Zero Trust Network Architecture (ZTNA)' and how does it evolve traditional Screened Subnet topologies?",
    shortAnswer: "ZTNA removes the concept of implicit trust based on network location; every request (whether from WAN, DMZ, or LAN) must be explicitly authenticated, authorized, and encrypted per-session before access is granted.",
    explanation: "Traditional DMZ architectures treat internal LAN networks as implicitly trusted once inside. ZTNA assumes the network is already breached: employees in the office must authenticate via mTLS, identity gateways, and device health checks to access applications, eliminating flat trust zones.",
    hint: "Never trust network location; verify identity and device health on every single request.",
    level: "Moderate",
    codeExample: `// ZTNA Philosophy:
// Traditional: "You are on the internal LAN, so you are trusted."
// Zero Trust : "Network location is irrelevant. Authenticate with MFA + Device Health on every session."`
  },
  {
    id: 30,
    question: "Synthesize the overarching principles of Firewall Architectures for enterprise cybersecurity scholars in West Bengal.",
    shortAnswer: "Optimal perimeter defense requires multi-tiered Screened Subnet (DMZ) architectures, physical or logical zone decoupling, one-way access policies, bastion jump hosts, and heterogeneous firewall clustering to contain breaches and protect core data vaults.",
    explanation: "Architecture dictates security posture: moving from vulnerable Dual-Homed and Screened Host designs to resilient Screened Subnet (DMZ) topologies ensures that even if public-facing servers are compromised, the blast radius is strictly contained, maintaining the confidentiality and integrity of the internal enterprise network.",
    hint: "Screened Subnet (DMZ) + One-way policy + Bastion hosts + Heterogeneous firewalls = Impenetrable Architecture.",
    level: "Moderate",
    codeExample: `// The Master Architectural Security Formula:
// Resilient Architecture = [External Screening FW] + [Isolated DMZ Buffer] + [One-Way Policy] + [Internal Screening FW] + [Zero Trust Core]`
  }
];

export default questions;
