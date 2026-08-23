const questions = [
  {
    id: 1,
    question: "What is the primary philosophical difference between traditional 'Castle-and-Moat' security and modern 'Defense-in-Depth' (DiD)?",
    shortAnswer: "Castle-and-Moat relies on a single hard outer perimeter with implicit internal trust, whereas Defense-in-Depth deploys multiple overlapping, independent security controls across all computing layers assuming that single controls will fail.",
    explanation: "The traditional Castle-and-Moat model assumed everything inside the internal corporate network was benign. Once an adversary bypassed the edge firewall (e.g. via phishing or VPN credential theft), they encountered zero resistance. Defense-in-Depth implements concentric protective rings (Physical, Perimeter, Network, Host, Application, Data) so that the failure of any single control is neutralized by subsequent layers.",
    hint: "Think about single perimeter walls versus onion layers where each layer stops an attack independently.",
    level: "Basic",
    codeExample: `// Defense-in-Depth Architecture Layers:
const defenseLayers = [
  "1. Physical (Biometrics, Mantrap, CCTV)",
  "2. Perimeter (NGFW, BGP FlowSpec, DDoS Scrubbing)",
  "3. Network (VLAN Micro-segmentation, 802.1X NAC)",
  "4. Host (EDR Agents, Host Firewalls, Patching)",
  "5. Application (WAF, Parameterized SQL, OAuth2/OIDC)",
  "6. Data (AES-256-GCM Encryption, Tokenization, HSM Vault)"
];`
  },
  {
    id: 2,
    question: "What is the mathematical rationale behind multi-layered Defense-in-Depth reducing the overall probability of a catastrophic breach?",
    shortAnswer: "When defensive controls operate independently, the overall probability of a successful breach is the product of individual layer failure probabilities (P_overall = P_1 × P_2 × ... × P_n), exponentially reducing risk.",
    explanation: "If an edge firewall has a 10% bypass rate (P_1 = 0.10), host EDR has a 5% evasion rate (P_2 = 0.05), and data tokenization has a 1% compromise rate (P_3 = 0.01), the combined probability of exfiltration is 0.10 × 0.05 × 0.01 = 0.00005 (0.005% or 1 in 20,000). Layering independent controls creates an exponential defense barrier.",
    hint: "Multiplying fractions less than 1 results in an exponentially smaller number.",
    level: "Moderate",
    codeExample: `// Mathematical Breach Probability Calculator:
function calculateBreachRisk(layerProbabilities) {
  return layerProbabilities.reduce((accum, p) => accum * p, 1.0);
}
// Example: [0.10, 0.05, 0.01] -> 0.00005 (0.005% overall risk)`
  },
  {
    id: 3,
    question: "What is Unicast Reverse Path Forwarding (uRPF - RFC 3704) and why is it deployed on perimeter edge routers?",
    shortAnswer: "uRPF verifies whether the source IP address of an incoming packet is reachable via the interface on which it arrived, automatically dropping spoofed IP packets before they reach firewalls.",
    explanation: "Attackers frequently spoof source IP addresses to hide their identity or launch amplified reflection DDoS attacks. In strict uRPF mode, the router looks up the packet's source IP in its Routing Information Base (FIB). If the routing table would not route a packet back out the same interface, the packet is discarded as fraudulent spoofed traffic.",
    hint: "Checks the return path in the routing table to verify if the sender could legitimately exist on that interface.",
    level: "Expert",
    codeExample: `// Cisco IOS uRPF Configuration (Strict Mode):
// interface GigabitEthernet0/0/0 (WAN Interface)
//  ip verify unicast source reachable-via rx`
  },
  {
    id: 4,
    question: "What are 'Bogon IPs' and how does edge Bogon filtering protect the internal network perimeter?",
    shortAnswer: "Bogon IPs are IP address blocks that have not been assigned by IANA or are reserved for private/testing use (e.g. RFC 1918, 127.0.0.0/8, 0.0.0.0/8) and should never appear on the public Internet.",
    explanation: "Legitimate Internet traffic never originates from unallocated or private address spaces over public WAN links. Edge screening routers deploy Bogon ACLs to immediately discard any incoming packet with a source address in reserved ranges, eliminating illegal routing spoofing before firewall state tables are allocated.",
    hint: "Unallocated or private IP ranges that should never legitimately traverse the public Internet.",
    level: "Moderate",
    codeExample: `// Typical Edge Router Bogon Filter ACL:
// deny ip 10.0.0.0 0.255.255.255 any
// deny ip 172.16.0.0 0.15.255.255 any
// deny ip 192.168.0.0 0.0.255.255 any
// deny ip 127.0.0.0 0.255.255.255 any
// permit ip any any`
  },
  {
    id: 5,
    question: "How does the Zero Trust Architecture (NIST SP 800-207) fundamentally dismantle implicit perimeter trust?",
    shortAnswer: "Zero Trust enforces 'Never Trust, Always Verify' and 'Assume Breach', eliminating implicit trust based on network location and requiring continuous authentication, authorization, and posture assessment for every request.",
    explanation: "In a Zero Trust Architecture, being connected to the internal corporate LAN or Wi-Fi grants zero automatic privileges. Every API invocation, database query, or file access is dynamically evaluated using user identity, device health posture, contextual risk, and cryptographic mutual TLS (mTLS) enforcement.",
    hint: "Never trust, always verify, assume breach — regardless of whether the user is in the office or on the road.",
    level: "Moderate",
    codeExample: `// Zero Trust Request Policy Evaluation:
const canAccessInternalVault = (user, device, context) => {
  return (
    user.hasValidMFA &&
    device.isCompliantEDR &&
    device.hasValidClientCert &&
    context.anomalyScore < 0.15 &&
    user.roleHasPermission("ACCESS_PAYMENT_DB")
  );
};`
  },
  {
    id: 6,
    question: "What is the difference between a Network Firewall and a Web Application Firewall (WAF) in a defense-in-depth perimeter?",
    shortAnswer: "A Network Firewall inspects Layer 3/4 packet headers (IP, port, TCP flags, state), whereas a WAF operates at Layer 7 to inspect full HTTP/HTTPS payloads for web-specific exploits like SQLi and XSS.",
    explanation: "Network Firewalls permit or deny traffic based on IP addresses and ports (e.g. allow port 443). However, malicious SQL injection or cross-site scripting payloads easily traverse port 443 inside encrypted HTTPS packets. A WAF terminates TLS, inspects URI parameters, headers, and POST bodies, blocking Layer 7 application attacks.",
    hint: "Network firewalls check the envelope (Layer 3/4); WAF reads and sanitizes the letter inside (Layer 7).",
    level: "Basic",
    codeExample: `// Network Firewall vs WAF Rules:
// Network Firewall: ALLOW TCP 0.0.0.0/0 -> 192.168.1.10:443 (Permits all HTTPS)
// WAF Rule        : BLOCK IF Request.Body CONTAINS regex('(?i)(union\\s+select|select\\s+.*\\s+from)')`
  },
  {
    id: 7,
    question: "What role does Micro-segmentation play in mitigating the blast radius of a compromised perimeter?",
    shortAnswer: "Micro-segmentation divides the network into granular, isolated zones with strict East-West packet filtering, preventing attackers from pivoting laterally across servers in the same subnet.",
    explanation: "In traditional flat networks, once an attacker compromises one web server, they can easily reach adjacent databases, domain controllers, and backup nodes. Micro-segmentation enforces host-based firewalls or SDN policies ensuring that servers can only communicate with explicitly whitelisted services on designated ports.",
    hint: "Watertight compartments inside a ship preventing a single hull breach from sinking the entire vessel.",
    level: "Moderate",
    codeExample: `// Kubernetes NetworkPolicy (Micro-segmentation):
// Allows Frontend Pods to talk ONLY to Backend API on port 8080 (No direct DB or SSH access)
// ingress:
//   - from:
//     - podSelector:
//         matchLabels:
//           role: frontend
//     ports:
//       - protocol: TCP
//         port: 8080`
  },
  {
    id: 8,
    question: "Under the Indian DPDP Act 2023, what are the legal and financial ramifications for organizations failing to implement reasonable perimeter security?",
    shortAnswer: "Under Section 8(5) and Section 33, failure to implement reasonable security safeguards resulting in personal data breaches carries statutory financial penalties up to ₹250 Crores per incident.",
    explanation: "The Digital Personal Data Protection (DPDP) Act 2023 mandates that Data Fiduciaries maintain technical and organizational safeguards (including firewalls, encryption, access controls, and logging). The Data Protection Board of India (DPBI) is empowered to levy fines up to ₹250 Crores for significant non-compliance.",
    hint: "Section 8(5) of the DPDP Act 2023 imposes penalties up to ₹250 Crores for failing to prevent data breaches.",
    level: "Basic",
    codeExample: `// Statutory Exposure (DPDP Act 2023):
const dpdpSanctions = {
  section: "Section 8(5) & Schedule Section 33",
  obligation: "Reasonable technical safeguards (Firewalls, Zero Trust, Encryption)",
  maximumStatutoryFineINR: 2500000000 // ₹250 Crores
};`
  },
  {
    id: 9,
    question: "What is the CERT-In 6-Hour Security Incident Reporting mandate and how does it impact perimeter monitoring?",
    shortAnswer: "CERT-In directions require all Indian organizations to report cybersecurity incidents (such as perimeter breaches, unauthorized access, or DDoS outages) within 6 hours of noticing them.",
    explanation: "Issued in April 2022 under Section 70B of the Information Technology Act 2000, CERT-In mandates that enterprise perimeter devices maintain synchronized NTP logs with NPL India and retain security telemetry logs for 180 days within Indian jurisdiction for forensic audits.",
    hint: "Mandatory reporting of cyber security breaches within 6 hours to national agency CERT-In.",
    level: "Basic",
    codeExample: `// CERT-In Compliance Checklist:
// 1. Clock Source: NPL India NTP (time.nplindia.org)
// 2. Telemetry Retention: 180 Days of edge firewall & proxy logs
// 3. Incident Escalation Window: <= 6 Hours to incident@cert-in.org.in`
  },
  {
    id: 10,
    question: "What is 'Default-Deny' (Implicit Deny) and why is it considered the golden rule of firewall rule-base design?",
    shortAnswer: "Default-Deny states that all network traffic is dropped by default unless explicitly permitted by an authorized, verified rule at the top of the firewall rule table.",
    explanation: "If a firewall is configured with Default-Allow (blacklist model), newly discovered ports, services, or protocols are automatically permitted unless specifically forbidden. Default-Deny (whitelist model) ensures that unknown, anomalous, or unapproved traffic is silently dropped, guaranteeing complete attack surface reduction.",
    hint: "Unless your name is on the guest list, you are not allowed in.",
    level: "Basic",
    codeExample: `// iptables Default-Deny Rule Base:
// iptables -P INPUT DROP
// iptables -P FORWARD DROP
// iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
// iptables -A INPUT -p tcp --dport 443 -j ACCEPT`
  },
  {
    id: 11,
    question: "What is the role of an Intrusion Prevention System (IPS) compared to an Intrusion Detection System (IDS) at the perimeter?",
    shortAnswer: "An IDS operates out-of-band to monitor traffic and generate alerts, whereas an IPS sits inline in the packet path and actively drops malicious packets in real-time.",
    explanation: "An IDS taps network traffic via a SPAN port; if an exploit is detected, it triggers an alert or sends a TCP RST packet, but the first malicious packets may have already reached the target. An IPS inspects packets inline before forwarding them, dropping malicious byte sequences instantly.",
    hint: "IDS is a burglar alarm that rings; IPS is an armed security guard who blocks the intruder at the doorway.",
    level: "Moderate",
    codeExample: `// Snort IPS Inline Rule (Drop Malicious Shellcode):
// drop tcp any any -> 192.168.1.0/24 80 (msg:"EXPLOIT Buffer Overflow Attempt"; content:"|90 90 90 90|"; sid:1000001;)`
  },
  {
    id: 12,
    question: "How does Deep Packet Inspection (DPI) enable Next-Generation Firewalls (NGFW) to identify applications regardless of port?",
    shortAnswer: "DPI reassembles packet payloads to inspect application Layer 7 protocol handshakes, signatures, and TLS client hello fingerprints (JA3), identifying applications even if they run on non-standard ports.",
    explanation: "Legacy firewalls assume TCP port 80 is HTTP and port 443 is HTTPS. Attackers bypass legacy firewalls by running SSH, Tor, or BitTorrent tunnels over port 443. NGFW DPI algorithms parse application signatures, recognizing BitTorrent traffic over port 443 and dropping it based on App-ID policies.",
    hint: "Looking inside the packet payload rather than trusting the port number on the outside label.",
    level: "Expert",
    codeExample: `// NGFW App-ID Policy:
// Rule: Deny BitTorrent / Tor over port 443 (HTTPS)
// Action: Match Layer 7 Protocol Signature -> DROP Flow!`
  },
  {
    id: 13,
    question: "What is a 'Demilitarized Zone' (DMZ) and what type of servers should be placed inside it?",
    shortAnswer: "A DMZ is a semi-trusted perimeter subnetwork that hosts publicly accessible servers (Web, Mail, DNS) isolated from both the untrusted Internet and the secure internal corporate LAN.",
    explanation: "By placing public-facing web servers in a DMZ between two firewalls (or distinct firewall interfaces), an attacker who compromises the public web server is prevented from directly querying sensitive internal databases, domain controllers, or financial vaults.",
    hint: "A buffer zone between the dangerous outside world and the private corporate network.",
    level: "Basic",
    codeExample: `// DMZ Routing Topology:
// Internet ---> [External Firewall] ---> DMZ (Web/DNS Server: 172.16.1.10)
// DMZ ---> [Internal Firewall with strict ACLs] ---> Internal Corporate LAN (10.0.0.0/24)`
  },
  {
    id: 14,
    question: "Why should database servers NEVER be placed directly inside a DMZ network?",
    shortAnswer: "Database servers contain sensitive data assets; placing them in the DMZ exposes them to direct compromise if public edge services are breached. They must reside in an isolated, internal database tier.",
    explanation: "If a database server sits in the DMZ and a public web application suffers Remote Code Execution (RCE), the attacker gains direct local access to the database. Instead, the database should reside in a protected internal tier accessible only via authenticated API calls from specific DMZ IP addresses.",
    hint: "Keep the gold in the underground vault, not in the storefront display window.",
    level: "Basic",
    codeExample: `// 3-Tier Security Architecture:
// Tier 1: Presentation Tier (DMZ Web Server)
// Tier 2: Application Logic Tier (Internal App Server)
// Tier 3: Database Storage Tier (Hardened Internal DB Cluster - Zero Direct Internet Access!)`
  },
  {
    id: 15,
    question: "What is a 'Bastion Host' (Jump Server) and what hardening measures must be applied to it?",
    shortAnswer: "A Bastion Host is a heavily fortified server configured as the single controlled entry point for administrative access (SSH/RDP) to internal infrastructure from external networks.",
    explanation: "Bastion hosts are stripped of all unnecessary software, compilers, and services. Hardening measures include: disabling password authentication in favor of FIDO2 hardware keys / ed25519 SSH keys, enforcing MFA, restricting source IP ranges, session recording, and real-time SIEM auditing.",
    hint: "A single, armored checkpoint gateway through which all system administrators must pass.",
    level: "Moderate",
    codeExample: `// Hardened sshd_config on Bastion Host:
// PasswordAuthentication no
// PubkeyAuthentication yes
// AuthenticationMethods publickey,keyboard-interactive (Enforces MFA)
// PermitRootLogin no
// X11Forwarding no
// ClientAliveInterval 300`
  },
  {
    id: 16,
    question: "What is 'Egress Filtering' and why is it equally as important as Ingress Filtering at the network perimeter?",
    shortAnswer: "Egress Filtering inspects outbound network traffic from internal hosts to the Internet, blocking unauthorized connections, command-and-control (C2) beaconing, and sensitive data exfiltration.",
    explanation: "While Ingress Filtering stops threats from entering, Egress Filtering stops malware that entered via email or USB from phoning home to its attacker C2 server or dumping database backups over port 4444 or unapproved cloud storage endpoints.",
    hint: "Checking what leaves the building to prevent thieves from carrying stolen property out the back door.",
    level: "Moderate",
    codeExample: `// Perimeter Egress Firewall Policy:
// DROP ALL Outbound TCP/UDP except:
// - Outbound HTTPS (443) via Authenticated Corporate Proxy
// - Outbound DNS (53) to Internal DNS Resolvers ONLY (Prevents DNS Exfiltration!)`
  },
  {
    id: 17,
    question: "How does DNS-based Egress Filtering and 'DNS Sinkholing' neutralize malware at the perimeter?",
    shortAnswer: "Internal recursive DNS servers intercept queries for known malicious C2 domains or Domain Generation Algorithms (DGA) and return a benign loopback address (127.0.0.1) or SOC analysis IP.",
    explanation: "Malware relies on DNS resolution to find attacker command servers. When an infected host queries `c2-evil-botnet.ru`, the corporate DNS sinkhole intercepts the lookup, returning a local sinkhole IP. The connection attempt is foiled and the SOC is immediately alerted to the infected internal host IP.",
    hint: "Redirecting calls to known criminal numbers to a police recording instead.",
    level: "Moderate",
    codeExample: `// BIND9 / Unbound DNS Sinkhole Zone Configuration:
// zone "malicious-c2-domain.com" {
//     type master;
//     file "/etc/bind/zones/sinkhole.db"; // Resolves to 127.0.0.1 (Loopback)
// };`
  },
  {
    id: 18,
    question: "What is 'Stateful Packet Inspection' (SPI) and how does it prevent TCP out-of-state injection attacks?",
    shortAnswer: "SPI tracks the state of active network connections in a kernel table (`conntrack`), ensuring that incoming packets are dropped unless they belong to an established, valid 3-way handshake session.",
    explanation: "Unlike stateless packet filtering which only checks static headers, SPI maintains state: SYN_SENT, ESTABLISHED, FIN_WAIT. If an attacker injects a random TCP ACK packet with a spoofed source IP, the firewall looks up the session in its conntrack table; finding no matching handshake, it drops the packet immediately.",
    hint: "Remembering who initiated the phone call so random strangers cannot inject fake responses.",
    level: "Moderate",
    codeExample: `// Linux Kernel Connection Tracking State (conntrack):
// tcp 6 431999 ESTABLISHED src=192.168.1.50 dst=140.82.121.4 sport=54210 dport=443 src=140.82.121.4 dst=192.168.1.50 sport=443 dport=54210 [ASSURED] mark=0 use=1`
  },
  {
    id: 19,
    question: "What is 'Dual-Homed Host' firewall architecture and what security risk arises if IP forwarding is accidentally enabled?",
    shortAnswer: "A Dual-Homed Host has two network interface cards (NICs) connected to two separate networks. If IP routing/forwarding is enabled in the OS kernel, packets bypass all application-level controls and route directly between networks.",
    explanation: "In a proper Dual-Homed Host, all traffic must be mediated by application proxies running on the host. If `net.ipv4.ip_forward = 1` is enabled on Linux, the kernel acts as a router, directly routing packets between the untrusted WAN and trusted LAN without application inspection, destroying perimeter isolation.",
    hint: "A guard post with two doors; if the doors are wedged open, intruders walk straight through.",
    level: "Expert",
    codeExample: `// Hardening Dual-Homed Host (Disable Kernel Forwarding):
// sudo sysctl -w net.ipv4.ip_forward=0
// echo "net.ipv4.ip_forward = 0" >> /etc/sysctl.conf`
  },
  {
    id: 20,
    question: "What is a 'Screened Subnet' architecture and how does it utilize two firewalls to provide layered isolation?",
    shortAnswer: "A Screened Subnet uses an External Firewall (facing the Internet) and an Internal Firewall (facing the LAN), creating an isolated DMZ buffer between them with no direct traffic path from WAN to LAN.",
    explanation: "The External Firewall filters untrusted Internet traffic and forwards only permitted web/mail flows into the DMZ. The Internal Firewall permits only strictly authenticated administrative or database connections between the DMZ and the internal LAN. Even if the external firewall is compromised, the internal firewall preserves LAN security.",
    hint: "Two separate security gates with a monitored courtyard between them.",
    level: "Moderate",
    codeExample: `// Screened Subnet Isolation:
// [Internet] ---> [External Firewall] ---> [DMZ Subnet] ---> [Internal Firewall] ---> [Corporate LAN]
// Crucial Rule: NO rule on the External Firewall can route traffic directly into the Corporate LAN!`
  },
  {
    id: 21,
    question: "What is BGP FlowSpec (RFC 5575) and how does it protect the perimeter from massive volumetric DDoS floods?",
    shortAnswer: "BGP FlowSpec allows network engineers to propagate granular packet filtering rules (e.g. drop UDP port 389 floods from specific CIDRs) across upstream ISP routers dynamically within seconds.",
    explanation: "When a 1 Tbps volumetric DDoS attack targets an enterprise edge, local firewalls are overwhelmed at their physical WAN link capacity. With BGP FlowSpec, the enterprise border router transmits filtering instructions to upstream Internet Service Providers (ISPs), discarding attack traffic inside the ISP backbone before it ever reaches the enterprise perimeter.",
    hint: "Instructing the water utility to shut off the broken main pipe miles before it floods your basement.",
    level: "Expert",
    codeExample: `// BGP FlowSpec Filter Rule (Propagated to Upstream ISP):
// flowspec {
//     match {
//         destination 203.0.113.10/32;
//         protocol udp;
//         source-port 389; // CLDAP reflection flood
//     }
//     then {
//         discard; // Dropped in ISP backbone!
//     }
// }`
  },
  {
    id: 22,
    question: "Why are physical security controls considered Layer 1 of the Defense-in-Depth framework?",
    shortAnswer: "If an adversary gains physical access to server hardware, they can bypass all software firewalls and OS access controls via cold-boot memory dumps, booting external media, or tapping network cables.",
    explanation: "Software firewalls and EDR agents operate on the assumption of hardware integrity. An attacker with physical access to a server rack can connect a hardware keystroke logger, extract disk encryption keys via PCIe DMA attacks, or reboot into single-user mode, rendering all perimeter firewall configurations useless.",
    hint: "Physical access equals root access.",
    level: "Basic",
    codeExample: `// Physical Security Control Matrix:
// - Server Room: Dual-factor biometric + RFID mantrap
// - Rack Level: Keycard locking rack doors + vibration sensors
// - Motherboard: Chassis intrusion detection + TPM 2.0 Secure Boot`
  },
  {
    id: 23,
    question: "How does IEEE 802.1X Network Access Control (NAC) enforce perimeter security on internal physical Ethernet and Wi-Fi ports?",
    shortAnswer: "802.1X requires any device plugging into an office Ethernet port or connecting to Wi-Fi to authenticate via EAP-TLS with a valid digital certificate before the switch port is enabled.",
    explanation: "Without NAC, an intruder who walks into a corporate office in Kolkata or Barrackpore can plug an unauthorized laptop into a wall Ethernet port and obtain full internal LAN access. 802.1X switches keep the port in an unauthenticated state, dropping all traffic until a RADIUS server verifies the device's cryptographic certificate.",
    hint: "A lock on the wall socket that only unlocks when a recognized, verified company laptop plugs in.",
    level: "Moderate",
    codeExample: `// 802.1X Switch Port Configuration (Cisco IOS):
// interface GigabitEthernet0/12
//  authentication port-control auto
//  dot1x pae authenticator`
  },
  {
    id: 24,
    question: "What is 'Port Knocking' and how does it hide administrative services from perimeter port scanners?",
    shortAnswer: "Port Knocking keeps administrative ports (like SSH port 22) closed by default until a client generates a specific sequence of connection attempts to closed ports, which triggers a dynamic firewall rule opening port 22 for that IP.",
    explanation: "An external port scan (Nmap) sees port 22 as filtered/closed. If an authorized admin sends TCP SYN packets to ports 7000, 8500, and 9200 in the correct sequence within 5 seconds, the firewall daemon detects the pattern and dynamically executes an `iptables` rule allowing the admin's source IP on port 22 for 60 seconds.",
    hint: "A secret knock on the back door that prompts the guard to open it.",
    level: "Moderate",
    codeExample: `// knockd.conf Configuration:
// [openSSH]
//   sequence    = 7000,8500,9200
//   seq_timeout = 5
//   command     = /sbin/iptables -I INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
//   tcpflags    = syn`
  },
  {
    id: 25,
    question: "What is 'Split Horizon DNS' and how does it prevent internal network topology disclosure at the perimeter?",
    shortAnswer: "Split Horizon DNS serves two different sets of DNS records: public Internet queries receive only external DMZ IPs, while internal clients query a separate resolver that returns private RFC 1918 IPs.",
    explanation: "If an enterprise uses a single public DNS server, zone transfers or brute-force queries could reveal internal hostnames and IP schemes (`payroll-db.corp.local -> 10.10.4.50`). Split Horizon DNS ensures external attackers can only see public endpoints (`www.company.com -> 203.0.113.10`).",
    hint: "Two different telephone directories: one public for external customers, one confidential for internal employees.",
    level: "Moderate",
    codeExample: `// BIND9 Split Horizon Configuration:
// view "external" {
//     match-clients { any; };
//     zone "company.com" { file "external-company.db"; };
// };
// view "internal" {
//     match-clients { 10.0.0.0/8; 192.168.0.0/16; };
//     zone "company.com" { file "internal-company.db"; };
// };`
  },
  {
    id: 26,
    question: "What is 'Shadow IT' and how does it introduce unauthorized bypasses into the enterprise network perimeter?",
    shortAnswer: "Shadow IT refers to unauthorized software, hardware, or cloud services deployed by employees or departments without IT and security team approval, bypassing perimeter inspection and logging.",
    explanation: "When employees set up unauthorized AWS S3 buckets, spin up unapproved personal Wi-Fi access points, or use unauthorized SaaS file-sharing tools, data bypasses the enterprise NGFW and DLP inspection stack, creating unmonitored blind spots for data leakage.",
    hint: "Unapproved devices or software brought in through the side door without security's knowledge.",
    level: "Basic",
    codeExample: `// Cloud Access Security Broker (CASB) Discovery:
// Detects and blocks unauthorized Shadow IT cloud storage:
// IF App.Category == "Cloud Storage" AND App.Name NOT IN ApprovedSaaSList -> BLOCK & ALERT SOC!`
  },
  {
    id: 27,
    question: "How does Host-based Intrusion Detection (HIDS / EDR) complement Network Perimeter Defenses?",
    shortAnswer: "EDR agents monitor endpoint processes, memory, and file integrity locally, detecting threats that bypass network firewalls via encrypted HTTPS traffic, stolen credentials, or local USB insertion.",
    explanation: "Perimeter firewalls only inspect traffic traversing the wire; they cannot see malicious DLL injection, process hollowing, or credential dumping occurring inside local operating system memory. EDR agents provide granular visibility at the kernel level, terminating suspicious processes in real-time.",
    hint: "Network firewalls guard the border gates; host EDR monitors the interior rooms of each house.",
    level: "Moderate",
    codeExample: `// Wazuh / OSSEC HIDS Local File Integrity Monitoring:
// <syscheck>
//   <directories check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
//   <directories check_all="yes">C:\\Windows\\System32\\drivers</directories>
// </syscheck>`
  },
  {
    id: 28,
    question: "What is a 'Virtual Patch' in the context of perimeter Web Application Firewalls (WAF)?",
    shortAnswer: "A virtual patch is a WAF rule deployed immediately at the perimeter to inspect and block exploit payloads for a newly disclosed vulnerability before software engineers can patch the underlying application code.",
    explanation: "When a critical zero-day (such as Log4Shell or Apache Struts CVE-2017-5638) is disclosed, developers may need weeks to update, test, and deploy patched application builds. A virtual patch (custom WAF regex rule) is deployed at the edge in minutes, neutralizing exploit attempts at the perimeter while production software is updated.",
    hint: "Applying an emergency bandage at the perimeter gate while the internal medical team prepares surgery.",
    level: "Moderate",
    codeExample: `// ModSecurity Virtual Patch Rule for Log4Shell (CVE-2021-44228):
// SecRule REQUEST_HEADERS|REQUEST_BODY "(?i)\${jndi:(?:ldap|rmi|dns|nis):" \
//     "id:1000021,phase:2,deny,status:403,msg:'Virtual Patch: Log4Shell Attempt Blocked'"`
  },
  {
    id: 29,
    question: "Synthesize the role of Centralized Security Information and Event Management (SIEM) in binding Defense-in-Depth layers together.",
    shortAnswer: "A SIEM aggregates, correlates, and analyzes real-time log telemetry across all defense layers (Perimeter NGFW, Host EDR, WAF, Cloud IAM), identifying coordinated multi-stage attack patterns that individual controls miss.",
    explanation: "Defense-in-Depth layers generate isolated logs: the firewall logs a port scan, the web server logs a 404 error, and the EDR logs a PowerShell invocation. A SIEM correlates these disparate events: 'Source IP X scanned port 443 -> sent SQLi -> spawned PowerShell on server Y -> alert SOC of active intrusion!'",
    hint: "The central control room that connects all security cameras, alarms, and guards into a unified picture.",
    level: "Moderate",
    codeExample: `// SIEM Correlation Rule Logic:
// EVENT 1: NGFW dropped 100 packets from IP X (Port Scan)
// EVENT 2: WAF permitted 1 request with status 200 from IP X (Exploit)
// EVENT 3: Host Y spawned powershell.exe connecting back to IP X
// CONDITION: Events 1, 2, 3 occur within 120 seconds -> TRIGGER CRITICAL SEVERITY 1 INCIDENT!`
  },
  {
    id: 30,
    question: "Summarize the overarching lessons for computer science and cybersecurity scholars in West Bengal regarding perimeter defense and defense-in-depth.",
    shortAnswer: "Never rely on a single defensive control; enforce Default-Deny at the perimeter; implement Zero Trust micro-segmentation internally; encrypt data at rest; and adhere strictly to CERT-In 6-hour reporting and DPDP Act 2023 compliance.",
    explanation: "Building resilient enterprise systems requires an engineering mindset: assume the perimeter will be breached, design networks with isolated micro-segments, deploy automated EDR and WAF inspection, and protect core data with hardware-backed encryption. Defense-in-Depth transforms cybersecurity from reactive panic into structured mathematical resilience.",
    hint: "Layered security + Default-Deny + Zero Trust + Encryption + Legal compliance = Resilient Enterprise.",
    level: "Moderate",
    codeExample: `// The Grand Defense-in-Depth Axiom:
// Resilient Security = [Edge Screening] + [Stateful NGFW/WAF] + [Zero Trust Micro-segmentation] + [Host EDR] + [Data Tokenization] + [DPDP & CERT-In Governance]`
  }
];

export default questions;
