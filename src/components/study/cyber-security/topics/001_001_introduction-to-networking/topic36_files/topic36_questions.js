// topic36_questions.js
// 30 Moderate to Expert Questions on Internet vs Intranet Architecture and Cyber Security

const questions = [
  {
    question: "What is the fundamental difference between the Internet and an Intranet?",
    shortAnswer: "The Internet is a globally accessible, public, decentralized network of interconnected Autonomous Systems (ASNs); an Intranet is a private, restricted corporate network accessible strictly to authenticated organizational personnel.",
    explanation: "The Internet uses public routable IP addresses and open peering; an Intranet uses RFC 1918 private addressing behind perimeter firewalls and identity providers.",
    hint: "Internet is public and global; Intranet is private and restricted to internal organization members.",
    level: "basic",
    codeExample: "Comparison = { Internet: 'Public, Untrusted, Global BGP', Intranet: 'Private, Trusted, RFC 1918' };"
  },
  {
    question: "What IP addressing standard is strictly reserved for private Intranets?",
    shortAnswer: "RFC 1918 Private IP Address ranges: 10.0.0.0/8 (10.0.0.0 – 10.255.255.255), 172.16.0.0/12 (172.16.0.0 – 172.31.255.255), and 192.168.0.0/16 (192.168.0.0 – 192.168.255.255).",
    explanation: "These ranges are non-routable on the public Internet; public ISP core routers drop any packet with an RFC 1918 destination.",
    hint: "RFC 1918 defines 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.",
    level: "basic",
    codeExample: "PrivateRanges = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16']; // Dropped by Internet routers"
  },
  {
    question: "What is a Demilitarized Zone (DMZ) and why is it placed between the Internet and the Intranet?",
    shortAnswer: "A DMZ (Screened Subnet) is a semi-trusted physical or logical subnetwork that hosts public-facing services (web, mail, DNS) while isolating the sensitive internal Intranet (databases, HR, ERP) behind an internal firewall.",
    explanation: "If a public web server in the DMZ is compromised, the internal firewall blocks the attacker from pivoting directly into the trusted Intranet.",
    hint: "Semi-trusted buffer zone hosting public servers to prevent hackers from reaching the private Intranet.",
    level: "moderate",
    codeExample: "Perimeter: [Internet (Untrusted)] → [External Firewall] → [DMZ (Semi-Trusted)] → [Internal Firewall] → [Intranet (Trusted)]"
  },
  {
    question: "What is Split-Horizon DNS and how does it protect internal Intranet resources?",
    shortAnswer: "A configuration where the DNS server returns public IP addresses for Internet queries and private RFC 1918 IP addresses for queries originating from within the internal Intranet.",
    explanation: "Split-horizon DNS prevents external Internet users from discovering internal server topologies and private IP addresses (e.g. `payroll.corp.internal`).",
    hint: "Returns public IPs to external users and private IPs to internal employees.",
    level: "expert",
    codeExample: "dns.query('portal.wb.gov.in'): if (client.isInternal) return '10.20.1.5'; else return '103.25.10.4';"
  },
  {
    question: "What is Network Address Translation (NAT/PAT) and how does it bridge an Intranet to the Internet?",
    shortAnswer: "NAT/PAT translates thousands of private RFC 1918 Intranet IP addresses into one or a few public routable IP addresses using unique Layer 4 source port numbers on the perimeter firewall.",
    explanation: "This conserves public IPv4 address space and conceals internal Intranet host addresses from external Internet scanners.",
    hint: "Translates internal private IPs into a public IP using unique source port numbers.",
    level: "basic",
    codeExample: "PAT: Internal 10.0.1.50:49201 → Firewall NAT → External Public 103.25.10.4:52001"
  },
  {
    question: "What is an Air-Gapped Intranet and how can it be breached?",
    shortAnswer: "An Intranet with zero physical or wireless connectivity to the public Internet; it can be breached through infected USB drives (e.g. Stuxnet), rogue employee Wi-Fi dongles, supply chain firmware tampering, or acoustic/electromagnetic side channels.",
    explanation: "Critical infrastructure in Barrackpore uses air-gapped networks to isolate turbine controllers from Internet cyber threats.",
    hint: "Completely isolated from the Internet; breached via infected USBs or insider devices.",
    level: "expert",
    codeExample: "AirGap_Security: PhysicalIsolation = true; BreachVectors = ['Infected USB', 'Rogue 4G Dongle', 'Firmware Backdoor'];"
  },
  {
    question: "What is the difference between a Forward Proxy and a Reverse Proxy in perimeter security?",
    shortAnswer: "A Forward Proxy sits in front of Intranet employees to filter, cache, and monitor their outbound Internet requests; a Reverse Proxy sits in front of internal web servers to inspect, load-balance, and protect inbound Internet traffic.",
    explanation: "Forward proxies protect clients in Kolkata going out to the web; Reverse proxies protect application servers from incoming Internet attacks.",
    hint: "Forward proxy protects internal clients going out; Reverse proxy protects internal servers from incoming traffic.",
    level: "moderate",
    codeExample: "Proxies = { Forward: 'Protects outbound Intranet clients', Reverse: 'Protects inbound DMZ web servers' };"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a Dual-Firewall Enterprise DMZ Perimeter Solution?",
    shortAnswer: "Approximately ₹95,000 to ₹3,50,000 (e.g. Fortinet FortiGate 70F/100F, Palo Alto PA-440, or Sophos XGS 2100) including 3-year Unified Threat Management (UTM) subscriptions.",
    explanation: "Enterprise perimeter firewalls inspect stateful traffic crossing Internet, DMZ, and Intranet security zones at line rate in ₹ budgets.",
    hint: "Dual-firewall DMZ perimeter costs ₹95,000 – ₹3,50,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "Perimeter_Firewall_Pair_Cost = ₹1,85,000; // Dual Next-Gen Firewalls with UTM & DMZ routing"
  },
  {
    question: "What is Lateral Movement and how does network microsegmentation prevent it within an Intranet?",
    shortAnswer: "Lateral movement occurs when an attacker compromises one workstation and spreads across the Intranet using stolen credentials; Microsegmentation uses internal firewalls/VLANs to restrict East-West traffic between workstations.",
    explanation: "Without microsegmentation, compromising an HR laptop in Ichapur gives the attacker direct SMB/RDP access to accounting and server databases.",
    hint: "Spreading across internal computers; stopped by isolating internal departments with microsegmentation.",
    level: "expert",
    codeExample: "Firewall_EastWest: Deny Workstation_VLAN → Database_VLAN except on Port 1433 with MFA;"
  },
  {
    question: "What is Zero Trust Network Access (ZTNA) and why is it replacing traditional Intranet VPNs?",
    shortAnswer: "Traditional VPNs grant broad network-level access to the entire Intranet once authenticated ('castle-and-moat'); ZTNA grants least-privilege access strictly to specific authorized applications based on continuous identity and device posture checks.",
    explanation: "ZTNA assumes every device (even inside the office) is potentially compromised, verifying identity on every single transaction.",
    hint: "Grants access to specific apps only, rather than giving full access to the entire Intranet network.",
    level: "expert",
    codeExample: "ZTNA_Policy: Allow User Mamata → App 'Payroll' ONLY IF DeviceCompliance == 'Passed' && MFA == 'Verified';"
  },
  {
    question: "What is an Insider Threat in Intranet security?",
    shortAnswer: "A security risk originating from authorized internal employees, contractors, or administrators who misuse their legitimate Intranet access privileges to steal confidential data, sabotage systems, or install backdoors.",
    explanation: "Firewalls block external Internet attacks, but internal Intranets require Data Loss Prevention (DLP) and User Behavior Analytics (UBA) to detect insider theft.",
    hint: "Threat from employees who already have legitimate access to the internal Intranet.",
    level: "moderate",
    codeExample: "DLP_Rule: Alert if internal user downloads > 500MB of customer database records to USB;"
  },
  {
    question: "How does Bandwidth and Latency differ between the Internet and an Intranet?",
    shortAnswer: "Intranets operate over high-speed local Ethernet/Fiber (1 Gbps to 100 Gbps) with ultra-low deterministic latency (< 1 ms); the Internet operates over shared ISP links (10 Mbps to 1 Gbps) with variable latency (10 ms to 300 ms) and jitter.",
    explanation: "Intranets enable massive uncompressed backups and real-time database clustering that would be impossible over public Internet connections.",
    hint: "Intranets have gigabit speeds with <1ms latency; Internet has variable speeds with higher latency.",
    level: "basic",
    codeExample: "Metrics = { Intranet: '10 Gbps, < 1ms RTT', Internet: '100 Mbps, 35-120ms RTT' };"
  },
  {
    question: "What is a 'Castle-and-Moat' security architecture and why is it considered obsolete?",
    shortAnswer: "A perimeter defense model that assumes everything inside the Intranet is completely trusted while everything on the Internet is untrusted; it fails because once an attacker breaches the perimeter firewall, they have unrestricted access to all internal assets.",
    explanation: "Modern cyber security replaces castle-and-moat with Zero Trust Architecture ('never trust, always verify').",
    hint: "Old model that trusts everything inside; fails once an attacker breaches the perimeter.",
    level: "moderate",
    codeExample: "CastleAndMoat_Flaw: PerimeterBreach == true → AttackerGetsUnrestrictedInternalAccess = true;"
  },
  {
    question: "What is a Bastion Host / Jump Server in DMZ architecture?",
    shortAnswer: "A heavily hardened, multi-factor-authenticated server located in the DMZ that serves as the single authorized gateway for administrators to access internal Intranet servers via SSH/RDP.",
    explanation: "Administrators in Jadavpur must log into the Bastion Host first; direct SSH access from the Internet into internal Intranet servers is strictly blocked.",
    hint: "Hardened jump server in the DMZ used by admins to securely reach internal Intranet servers.",
    level: "moderate",
    codeExample: "Admin → (SSH + MFA) → Bastion_Host_DMZ → (SSH Internal) → Core_Intranet_Server"
  },
  {
    question: "What is Data Loss Prevention (DLP) on an Intranet egress gateway?",
    shortAnswer: "A security solution that inspects outbound Internet traffic (HTTP, SMTP, Cloud Uploads) for sensitive data patterns (PAN numbers, Aadhaar IDs, source code) and blocks unauthorized exfiltration from the Intranet.",
    explanation: "DLP sensors in Kolkata block employees from uploading confidential engineering blueprints to personal Google Drive accounts.",
    hint: "Inspects outbound Internet traffic to stop sensitive files and customer data from being leaked.",
    level: "moderate",
    codeExample: "dlp.scanOutbound(packet) => if (matchesRegex(AadhaarRegex)) blockAndAlertSOC();"
  },
  {
    question: "What is the function of an Intranet Portal (e.g. Microsoft SharePoint / Confluence)?",
    shortAnswer: "A centralized, authenticated internal web portal providing employees with secure access to internal company policies, HR payroll, knowledge bases, ticketing systems, and departmental collaboration tools.",
    explanation: "Intranet portals are accessible only via internal LAN or authorized VPN/ZTNA gateways.",
    hint: "Internal corporate website for company news, HR documents, and employee collaboration.",
    level: "basic",
    codeExample: "IntranetPortal = 'https://intranet.company.local (Accessible only from 10.0.0.0/8 network)';"
  },
  {
    question: "What is a Honeypot in an Intranet cyber security deployment?",
    shortAnswer: "A deliberately vulnerable decoy server deployed within the internal Intranet; since legitimate users have no reason to access it, any connection attempt immediately triggers a high-fidelity critical alert for an active internal intrusion.",
    explanation: "Deploying an intranet honeypot in Barrackpore alerts the SOC team the instant an attacker initiates network port scanning.",
    hint: "Decoy server in the Intranet that traps hackers scanning the internal network.",
    level: "expert",
    codeExample: "honeypot.onConnection(intruderIP) => alertSOC('CRITICAL: Unauthorized Intranet Scanning from ' + intruderIP);"
  },
  {
    question: "What is 802.1X Network Access Control (NAC) and how does it secure physical Intranet switch ports?",
    shortAnswer: "An authentication standard that requires every device plugged into an office RJ-45 wall port or Wi-Fi SSID to authenticate against a RADIUS/AD server before being assigned an IP and granted access to the Intranet.",
    explanation: "If a visitor plugs a laptop into a conference room port in Ichapur, NAC isolates them into a guest VLAN with zero Intranet access.",
    hint: "Blocks Ethernet wall ports until the computer authenticates with username/password or certificate.",
    level: "expert",
    codeExample: "NAC_Decision: if (deviceCertificate.isValid()) assignVLAN(Corporate_Intranet); else assignVLAN(Guest_InternetOnly);"
  },
  {
    question: "What is an Egress Firewall Filter and why should Intranet workstations be restricted from direct outbound connections?",
    shortAnswer: "A firewall rule set that blocks internal workstations from making arbitrary outbound connections to the Internet (e.g. blocking all ports except DNS and HTTP via Proxy), preventing malware from establishing Command-and-Control (C2) channels.",
    explanation: "Egress filtering stops ransomware on Intranet PCs from connecting out to dark web decryption key servers.",
    hint: "Limits which outbound ports internal computers can use to connect to the Internet.",
    level: "expert",
    codeExample: "firewall.egress: Deny Workstation_VLAN → Any Internet on Port != 443 via Proxy;"
  },
  {
    question: "How does Active Directory / LDAP provide centralized identity management for Intranets?",
    shortAnswer: "It acts as a centralized database of user accounts, computer objects, and security groups, authenticating credentials (via Kerberos) and applying Group Policy Objects (GPOs) across all Intranet resources.",
    explanation: "When Debangshu logs in once in Barrackpore, Kerberos tickets grant single sign-on (SSO) access to file shares, printers, and internal web portals.",
    hint: "Central directory service authenticating users and enforcing security policies across the Intranet.",
    level: "basic",
    codeExample: "KerberosAuth: User → KDC (Ticket Granting Service) → Service Ticket → Intranet File Server"
  },
  {
    question: "What is a 'Dual-Homed Server' in DMZ network engineering?",
    shortAnswer: "A server equipped with two separate physical Network Interface Cards (NICs), each connected to a different security zone (e.g. NIC 1 on the DMZ subnet and NIC 2 on the private Intranet subnet), configured with IP forwarding disabled.",
    explanation: "Dual-homing allows secure database queries while preventing raw packet routing between public and private networks.",
    hint: "Server with two network cards connecting two different security zones with IP routing disabled.",
    level: "expert",
    codeExample: "DualHomedServer = { NIC1: 'DMZ (172.16.1.10)', NIC2: 'Intranet (10.0.1.10)', IP_Forwarding: 0 };"
  },
  {
    question: "What is an Extranet and how does it relate to the Internet and Intranet?",
    shortAnswer: "An Extranet is a controlled extension of an Intranet that grants secure, restricted access to external trusted third parties (vendors, business partners, suppliers) over the public Internet via VPN or authenticated portal.",
    explanation: "In our next topic (Topic 37), we will explore Extranet B2B architectures in depth.",
    hint: "Private intranet extended to trusted external partners and suppliers.",
    level: "moderate",
    codeExample: "Spectrum = { Internet: 'Public Global', Extranet: 'Partners & Vendors', Intranet: 'Internal Staff Only' };"
  },
  {
    question: "What is the difference between North-South Traffic and East-West Traffic in modern network architecture?",
    shortAnswer: "North-South traffic flows between the external Internet and the internal network (entering/exiting perimeter firewalls); East-West traffic flows laterally between servers, containers, or workstations within the internal Intranet/data center.",
    explanation: "In modern cloud and microservice architectures, East-West traffic accounts for over 80% of total network volume.",
    hint: "North-South is traffic entering/leaving the Internet; East-West is traffic between internal servers.",
    level: "expert",
    codeExample: "TrafficFlows = { NorthSouth: 'Client <-> Internet Gateway', EastWest: 'App Server <-> Database Cluster' };"
  },
  {
    question: "What is a Web Application Firewall (WAF) and where is it positioned in a DMZ architecture?",
    shortAnswer: "A specialized Layer 7 firewall positioned in the DMZ directly in front of web servers to inspect HTTP/HTTPS traffic for application-layer attacks like SQL Injection, Cross-Site Scripting (XSS), and CSRF.",
    explanation: "While network firewalls check IP/ports, WAFs decode URL strings and JSON payloads to stop web vulnerabilities.",
    hint: "Layer 7 firewall in the DMZ protecting web applications from SQL injection and XSS.",
    level: "moderate",
    codeExample: "waf.inspectRequest(httpPayload) => if (detectSQLInjection()) dropAndBlockIP();"
  },
  {
    question: "What is the function of an Intranet Syslog / SIEM Server (e.g. Splunk / Wazuh / ELK)?",
    shortAnswer: "A centralized security analytics platform that collects, aggregates, correlates, and analyzes system logs from all Intranet firewalls, switches, servers, and endpoints in real time to detect active cyber attacks.",
    explanation: "SIEM servers in Jadavpur correlate failed login attempts across multiple intranet servers to detect credential stuffing.",
    hint: "Central server collecting and analyzing security logs from all intranet devices.",
    level: "moderate",
    codeExample: "siem.correlateEvents() => if (failedLogins > 10 in 1 minute from same IP) triggerAlert();"
  },
  {
    question: "How does Network Segmentation improve Intranet regulatory compliance (e.g. PCI-DSS, HIPAA)?",
    shortAnswer: "By isolating systems that handle payment cards or healthcare records into dedicated, firewall-restricted VLAN subnets, reducing the audit scope and preventing non-compliant office PCs from touching sensitive data.",
    explanation: "Segmenting clinical records in Ichapur ensures compliance with health privacy regulations without requiring full audits of standard office PCs.",
    hint: "Isolates sensitive data into dedicated secure zones to meet legal audit requirements.",
    level: "expert",
    codeExample: "PCI_Scope = 'VLAN 30 (Payment Servers) Only'; Office_PCs_VLAN = 'Out of PCI Audit Scope';"
  },
  {
    question: "What is Rogue DHCP Detection and why is it essential on an Intranet?",
    shortAnswer: "A switch security feature (DHCP Snooping) that blocks unauthorized DHCP servers (e.g. a rogue router plugged in by an employee) from handing out fake IP addresses and redirecting Intranet traffic through an attacker's gateway.",
    explanation: "DHCP snooping marks user switch ports as untrusted, dropping any DHCP Offer packets originating from client ports.",
    hint: "Prevents rogue routers from handing out false gateway IPs on the internal network.",
    level: "moderate",
    codeExample: "ip dhcp snooping\nip dhcp snooping vlan 10,20\ninterface GigabitEthernet0/24\n  ip dhcp snooping trust"
  },
  {
    question: "What is a Vulnerability Scanner (e.g. Nessus / OpenVAS) used for on an internal Intranet?",
    shortAnswer: "An automated security tool that scans all Intranet IP addresses to identify unpatched operating systems, open default ports, weak passwords, and vulnerable network services before adversaries discover them.",
    explanation: "Security teams in Barrackpore run weekly Nessus scans across all internal servers to verify patch management compliance.",
    hint: "Scans internal servers to find missing security patches and weak passwords.",
    level: "moderate",
    codeExample: "nessus.scanSubnet('10.0.0.0/24') => generateVulnerabilityReport();"
  },
  {
    question: "What is the difference between Public Cloud Services and an On-Premises Intranet?",
    shortAnswer: "On-Premises Intranets are hosted on physical servers owned, operated, and secured inside corporate buildings; Public Cloud services (AWS, Azure) are multi-tenant virtualized infrastructures hosted in third-party data centers connected via Internet or private Direct Connect.",
    explanation: "Hybrid architectures connect on-premises Intranets to private cloud Virtual Private Clouds (VPCs) via dedicated IPsec tunnels.",
    hint: "On-premises is owned hardware in your office; Cloud is hosted in provider data centers.",
    level: "basic",
    codeExample: "DeploymentModels = { OnPremIntranet: 'Local Hardware Asset', PublicCloud: 'AWS/Azure Multi-Tenant' };"
  },
  {
    question: "What is the ultimate golden rule for architecting, isolating, and securing an Intranet against Internet threats?",
    shortAnswer: "'Enforce strict 3-tier DMZ perimeter isolation; assign RFC 1918 private addressing behind NAT; eliminate flat networks with microsegmentation and ZTNA least privilege; deploy split-horizon DNS; inspect all egress traffic; and budget dual perimeter firewalls in Indian Rupees (₹)!'",
    explanation: "This complete rule captures architectural boundaries, private addressing, zero trust security, DNS isolation, outbound control, and financial procurement.",
    hint: "3-tier DMZ + RFC 1918 NAT + Microsegmentation ZTNA + Split-horizon DNS + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: EnforceDMZIsolation() → ApplyRFC1918NAT() → DeployMicrosegmentationZTNA() → ConfigureSplitDNS() → BudgetInRupees(₹);"
  }
];

export default questions;
