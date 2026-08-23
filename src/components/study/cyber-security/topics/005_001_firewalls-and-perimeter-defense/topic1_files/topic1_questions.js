const questions = [
  {
    id: 1,
    question: "What is the technical definition of a Firewall in computer network security?",
    shortAnswer: "A dedicated hardware appliance, software daemon, or virtualized service that enforces access control policies by inspecting and mediating inbound and outbound packet flows between distinct security zones.",
    explanation: "A firewall establishes a controlled barrier between trusted internal networks (e.g. corporate LAN) and untrusted external networks (e.g. the public Internet). It inspects packets against an ordered rule base, executing actions such as ACCEPT, DROP, or REJECT to maintain network perimeter integrity.",
    hint: "An access control gatekeeper sitting between trusted and untrusted network zones.",
    level: "Basic",
    codeExample: `// Basic Firewall Concept:
// Untrusted Internet ---> [FIREWALL (Evaluates Rules)] ---> Trusted Internal LAN / DMZ`
  },
  {
    id: 2,
    question: "What are the five core functions performed by modern enterprise firewalls?",
    shortAnswer: "1. Traffic Filtering & Access Control; 2. Network Address Translation (NAT/PAT); 3. State Tracking & Session Verification; 4. Security Auditing & SIEM Logging; 5. Cryptographic VPN Termination.",
    explanation: "Beyond simple packet filtering, modern firewalls translate private RFC 1918 IPs (NAT), maintain state tables to ensure responses match established sessions (SPI), record comprehensive audit logs for SIEM threat analysis, and terminate encrypted IPsec/SSL VPN tunnels for remote workers.",
    hint: "Filtering, NAT, State tracking, Logging, and VPN tunneling.",
    level: "Basic",
    codeExample: `// The 5 Core Firewall Pillars:
const firewallFunctions = [
  "1. Access Control (Ingress/Egress Rule Evaluation)",
  "2. NAT / PAT (IP Obfuscation & RFC 1918 Routing)",
  "3. Stateful Inspection (conntrack table management)",
  "4. Telemetry & SIEM Logging (180-day audit trails)",
  "5. VPN Gateway (IPsec / TLS cryptographic tunnels)"
];`
  },
  {
    id: 3,
    question: "What is the operational difference between the firewall actions 'DROP' and 'REJECT'?",
    shortAnswer: "DROP silently discards the packet without notifying the sender; REJECT discards the packet and sends an explicit error response (TCP RST for TCP, or ICMP Port Unreachable for UDP) back to the sender.",
    explanation: "Using DROP prevents external attackers from determining whether an IP address is live, causing their port scanners to hang until timeout (stealth mode). REJECT informs legitimate internal users immediately that their connection was refused, preventing long client application timeouts.",
    hint: "DROP is silence (stealth); REJECT sends a 'Door Closed' note back.",
    level: "Basic",
    codeExample: `// iptables DROP vs REJECT:
// iptables -A INPUT -p tcp --dport 23 -j DROP   # Silent discard (Scanners timeout)
// iptables -A INPUT -p tcp --dport 23 -j REJECT # Sends TCP RST packet back immediately`
  },
  {
    id: 4,
    question: "Why should external WAN-facing firewall rules almost always use 'DROP' instead of 'REJECT'?",
    shortAnswer: "DROP forces external reconnaissance scanners (Nmap) to wait for connection timeouts, significantly slowing down automated adversary scanning and denying attackers confirmation of active hosts.",
    explanation: "When an attacker sends SYN packets to 65,535 ports on an enterprise gateway, REJECT responses immediately confirm the host is online and closed. DROP forces the scanner to wait 1-3 seconds per port, stretching a full port scan from seconds into hours while generating noticeable IDS port scan alerts.",
    hint: "Ignoring the caller makes them waste time, whereas answering 'Nobody home' confirms the house exists.",
    level: "Moderate",
    codeExample: `// External WAN Scanning Impact:
// REJECT: Scanner tests 1,000 ports in 0.5 seconds (Fast recon)
// DROP  : Scanner tests 1,000 ports in 1,000 seconds (Timeout delay + alerts SOC!)`
  },
  {
    id: 5,
    question: "What is Network Address Translation (NAT) / Port Address Translation (PAT) and how does it bolster perimeter defense?",
    shortAnswer: "NAT/PAT translates multiple internal private RFC 1918 IP addresses into a single public WAN IP address using dynamic source port mapping, hiding the internal network topology from external observers.",
    explanation: "External Internet devices only see packets originating from the firewall's public WAN IP (e.g. 203.0.113.10:50123). Attackers cannot initiate unsolicited inbound connections to internal client workstations (e.g. 10.10.1.50) because no route or NAT mapping exists for inbound traffic.",
    hint: "Translating private internal extensions to a single company main phone number.",
    level: "Basic",
    codeExample: `// NAT / PAT Translation Flow:
// Client (10.10.1.50:52411) ---> [NAT Firewall] ---> Public Internet (203.0.113.10:60001)
// Firewall remembers: 203.0.113.10:60001 <-> 10.10.1.50:52411`
  },
  {
    id: 6,
    question: "What are the four primary placement points for firewalls across modern enterprise network architectures?",
    shortAnswer: "1. Edge/Perimeter Gateway (WAN boundary); 2. DMZ Boundary (isolating public servers); 3. Internal Inter-VLAN Core (East-West micro-segmentation); 4. Host-based Endpoint (OS kernel level).",
    explanation: "Firewalls are placed at each critical trust boundary: Edge firewalls block Internet floods; DMZ firewalls isolate web servers from databases; Inter-VLAN firewalls prevent lateral worm propagation between corporate departments; and Host firewalls protect endpoints on the same switch.",
    hint: "Border edge, DMZ buffer, internal department VLAN core, and local host OS.",
    level: "Moderate",
    codeExample: `// Enterprise Firewall Placement Architecture:
// [Internet] -> (1. Edge FW) -> [DMZ] -> (2. DMZ FW) -> [Internal Core] -> (3. Inter-VLAN FW) -> [Host (4. Host FW)]`
  },
  {
    id: 7,
    question: "Why is an Inter-VLAN Core Firewall critical for preventing lateral ransomware propagation inside an enterprise?",
    shortAnswer: "Without an Inter-VLAN firewall, internal layer 3 switches route traffic freely between subnets, allowing ransomware on an infected HR workstation to spread via SMB (port 445) to finance, healthcare, and engineering databases.",
    explanation: "Perimeter firewalls only inspect North-South traffic (entering or exiting the Internet). Once an employee opens a phishing attachment inside the corporate LAN, the infection moves East-West across internal subnets. An Inter-VLAN firewall enforces strict inter-departmental ACLs, blocking port 445 SMB traffic between subnets.",
    hint: "Perimeter guards stop outside intruders; interior firewalls prevent a fire in the kitchen from burning down the entire building.",
    level: "Moderate",
    codeExample: `// Inter-VLAN Micro-segmentation Rule:
// Rule: BLOCK ALL TCP port 445 (SMB) between VLAN 10 (HR) and VLAN 40 (Production DB)
// Result: WannaCry / LockBit ransomware cannot propagate across subnets!`
  },
  {
    id: 8,
    question: "What is the difference between a Hardware Firewall Appliance and a Software / Host-based Firewall?",
    shortAnswer: "Hardware firewalls use dedicated ASICs/FPGAs to inspect multi-gigabit traffic at the network edge with high throughput and low latency, whereas software firewalls run on general-purpose OS kernels to protect individual hosts.",
    explanation: "Hardware appliances (Palo Alto, Fortinet) handle high packet throughput (10-100+ Gbps) for thousands of concurrent enterprise users without burdening endpoint CPUs. Software firewalls (iptables, Windows Defender Firewall) provide granular host-level control, protecting laptops when traveling outside the corporate network.",
    hint: "Dedicated multi-gigabit hardware appliance at the border vs software daemon installed on your laptop.",
    level: "Basic",
    codeExample: `// Hardware vs Software Firewall Matrix:
// Hardware Appliance : 100 Gbps ASIC throughput, protects entire enterprise perimeter
// Host-based Software: Protects individual kernel, enforces host-specific process rules`
  },
  {
    id: 9,
    question: "Explain the Netfilter packet traversal lifecycle inside the Linux kernel (PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING).",
    shortAnswer: "Packets arrive at PREROUTING (DNAT) -> Routing decision determines if packet is for local host (INPUT chain) or routed to another subnet (FORWARD chain) -> Local responses go to OUTPUT -> All outgoing packets pass POSTROUTING (SNAT).",
    explanation: "Netfilter is the packet filtering framework inside the Linux kernel. When a packet enters a physical NIC, PREROUTING handles Destination NAT. The kernel routing engine inspects the destination IP. If local, it passes the INPUT chain to reach the application. If routed to another network, it passes the FORWARD chain, followed by POSTROUTING for Source NAT.",
    hint: "PREROUTING -> Routing Decision -> (INPUT / FORWARD) -> OUTPUT -> POSTROUTING.",
    level: "Expert",
    codeExample: `// Netfilter Packet Flow Diagram:
// Ingress -> [PREROUTING (DNAT)] -> [Routing Decision]
//   ├── Local Host: -> [INPUT Chain] -> [Local App] -> [OUTPUT Chain] -> [POSTROUTING (SNAT)] -> Egress
//   └── Forwarded : -> [FORWARD Chain] --------------------------------> [POSTROUTING (SNAT)] -> Egress`
  },
  {
    id: 10,
    question: "What is 'Top-Down Rule Evaluation' in firewall rule bases and why is rule ordering critical for security?",
    shortAnswer: "Firewalls process rules sequentially from top to bottom; the first rule that matches a packet is executed immediately (First-Match-Wins), ignoring all subsequent rules.",
    explanation: "If a permissive rule (e.g. `ACCEPT ANY ANY`) is placed on Line 1, it will match all packets, rendering specific blocking rules on Lines 2 through 50 completely ineffective. Security policies must place specific exceptions and drop rules at the top, followed by broader policies, ending with a default-deny catch-all rule.",
    hint: "First rule that matches wins; place specific rules first, general rules last.",
    level: "Basic",
    codeExample: `// Flawed Rule Base vs Correct Rule Base:
// BAD:  Line 1: ACCEPT ANY -> ANY port 80 (Overly broad, shadows specific blocks!)
//       Line 2: DROP 198.51.100.10 -> ANY port 80 (NEVER REACHED!)

// GOOD: Line 1: DROP 198.51.100.10 -> ANY port 80 (Specific drop executed first!)
//       Line 2: ACCEPT ANY -> 172.16.1.10 port 80`
  },
  {
    id: 11,
    question: "What is the 'Shadowing' (Rule Shadowing) anomaly in firewall configuration management?",
    shortAnswer: "Shadowing occurs when a previous broader rule matches all packets intended for a subsequent rule, preventing the subsequent rule from ever being evaluated or executed.",
    explanation: "Rule Shadowing is a major security misconfiguration. For example, if Rule 5 permits all traffic from `10.0.0.0/16`, Rule 12 which attempts to block a compromised host at `10.0.4.25` will never execute because Rule 5 intercepts the packet first, leaving the vulnerability unaddressed.",
    hint: "A broad rule higher up hides a specific rule lower down.",
    level: "Moderate",
    codeExample: `// Rule Shadowing Example:
// Rule 1: ACCEPT source: 192.168.1.0/24 -> dest: ANY (Broad subnet allow)
// Rule 2: DROP   source: 192.168.1.50   -> dest: ANY (SHADOWED! Will NEVER execute)`
  },
  {
    id: 12,
    question: "How does a Demilitarized Zone (DMZ) firewall boundary prevent compromised web servers from accessing internal databases directly?",
    shortAnswer: "The DMZ firewall enforces a one-way connection policy: DMZ web servers can only connect to internal database servers on specific ports (e.g. TCP 5432) via mutual TLS, while all other connections into the LAN are blocked.",
    explanation: "If a public-facing web server in the DMZ suffers Remote Code Execution (RCE), the attacker gains a shell on that server. However, the DMZ firewall prevents the attacker from initiating outbound SSH, RDP, or SMB scans to the internal corporate LAN, containing the blast radius within the DMZ.",
    hint: "DMZ servers can only talk to specific database ports, never initiate arbitrary connections into internal office desks.",
    level: "Moderate",
    codeExample: `// DMZ Firewall Policy:
// ALLOW: DMZ_Web (172.16.1.10) -> Internal_DB (10.10.4.50) port 5432 (PostgreSQL)
// DROP : DMZ_Web (172.16.1.10) -> Internal_LAN (10.0.0.0/8) ANY (Blocks lateral movement!)`
  },
  {
    id: 13,
    question: "Under the Indian IT Act 2000 and SPDI Rules 2011, how are firewalls utilized to establish 'Reasonable Security Practices'?",
    shortAnswer: "Under Section 43A, maintaining properly configured, audited firewalls constitutes essential legal proof that an organization took reasonable technical safeguards to protect sensitive personal data from unauthorized access.",
    explanation: "If a data breach occurs, Section 43A holds corporate bodies liable for compensation if they fail to implement reasonable security practices (ISO/IEC 27001 standard). Demonstrating an audited firewall rule base, active log retention, and segmented zones protects organizations from statutory negligence claims.",
    hint: "Proof that the company took appropriate technological precautions to prevent unauthorized intrusion.",
    level: "Basic",
    codeExample: `// Legal Obligation (IT Act Section 43A):
// Mandates 'Reasonable Security Practices and Procedures' (SPDI Rules 2011)
// Technical Controls Required: Perimeter Firewalls, Encrypted Channels, Access Logs`
  },
  {
    id: 14,
    question: "What is the CERT-In mandate regarding firewall system clock synchronization and log retention?",
    shortAnswer: "CERT-In directions mandate that all enterprise firewall system clocks must be synchronized with NPL India NTP servers, and firewall logs must be retained securely for a rolling window of 180 days within Indian territory.",
    explanation: "Accurate forensic timeline reconstruction during a national cyber incident requires nanosecond-level time alignment across all enterprise boundary devices. CERT-In requires firewall telemetry (connection logs, drop events, NAT translations) to be archived for 180 days for legal investigation.",
    hint: "Synchronize with NPL India NTP and retain security logs for 180 days.",
    level: "Basic",
    codeExample: `// Firewall NTP Configuration (NPL India):
// ntp server time.nplindia.org prefer
// ntp server samay.nplindia.in`
  },
  {
    id: 15,
    question: "What is a 'Cloud-Native Firewall' (e.g. AWS Network Firewall, Azure Firewall) and how does it differ from a traditional on-premise hardware appliance?",
    shortAnswer: "Cloud-Native Firewalls are software-defined, managed elastic services that automatically scale throughput and availability with cloud traffic volumes without requiring physical hardware provisioning.",
    explanation: "Traditional hardware firewalls require physical rack space, power, cooling, and capacity planning. Cloud firewalls are provisioned via Infrastructure-as-Code (Terraform), scale elastically across multiple availability zones, and integrate natively with cloud VPC routing and identity-based IAM policies.",
    hint: "Software-defined, auto-scaling firewall managed entirely in cloud infrastructure.",
    level: "Moderate",
    codeExample: `// Terraform AWS Network Firewall Resource:
// resource "aws_networkfirewall_firewall" "enterprise_fw" {
//   name                = "kolkata-fintech-edge-fw"
//   firewall_policy_arn = aws_networkfirewall_firewall_policy.policy.arn
//   vpc_id              = aws_vpc.main.id
//   subnet_mapping { subnet_id = aws_subnet.firewall_subnet.id }
// }`
  },
  {
    id: 16,
    question: "What is the difference between Ingress Filtering and Egress Filtering at the firewall boundary?",
    shortAnswer: "Ingress Filtering inspects traffic entering the network from outside to block external attacks, while Egress Filtering inspects outbound traffic leaving internal hosts to block malware C2 communication and data theft.",
    explanation: "Organizations often focus exclusively on Ingress Filtering (stopping hackers from getting in). However, Egress Filtering is vital to stop ransomware that arrived via phishing from beaconing to its external command server or exfiltrating gigabytes of confidential customer databases over port 4444.",
    hint: "Ingress guards the entrance door; Egress guards the exit door.",
    level: "Basic",
    codeExample: `// Ingress vs Egress Rules:
// Ingress: DROP ANY -> 192.168.1.0/24 port 22 (Blocks external SSH probes)
// Egress : DROP 192.168.1.0/24 -> ANY port 4444 (Blocks reverse shell beacons)`
  },
  {
    id: 17,
    question: "What is 'Connection Tracking' (`conntrack`) and what memory exhaustion vulnerability can occur during high-volume DDoS attacks?",
    shortAnswer: "`conntrack` is the kernel table tracking active session tuples; if an attacker floods millions of spoofed SYN packets, the conntrack table fills up, causing the firewall to drop legitimate new connections.",
    explanation: "Stateful firewalls allocate a memory structure in the `nf_conntrack` table for every new TCP SYN packet. In a SYN flood, the table reaches its limit (`nf_conntrack_max`), triggering the kernel error 'table full, dropping packet', which causes a Denial of Service for all legitimate users.",
    hint: "Kernel memory tracking active connections; filling the table blocks all new users.",
    level: "Expert",
    codeExample: `// Linux conntrack Tuning to Defeat Table Exhaustion:
// sudo sysctl -w net.netfilter.nf_conntrack_max=2000000
// sudo sysctl -w net.netfilter.nf_conntrack_tcp_timeout_syn_recv=10`
  },
  {
    id: 18,
    question: "Why should an enterprise firewall NEVER have administrative web UI or SSH access exposed to the public WAN interface?",
    shortAnswer: "Exposing firewall management interfaces to the public Internet allows attackers to exploit remote management zero-days or brute-force administrator credentials to gain total control of the network perimeter.",
    explanation: "Numerous critical CVEs (such as Palo Alto PAN-OS or FortiOS authentication bypasses) target exposed web management interfaces on port 443/8443. Administrative access should be restricted exclusively to dedicated internal management VLANs or accessible only via private VPN with MFA.",
    hint: "Never put the master control panel on the outside wall of the fortress.",
    level: "Basic",
    codeExample: `// Hardening Firewall Management Interface:
// ALLOW: Admin_VLAN (10.10.99.0/24) -> Firewall_MGMT_IP port 443/22
// DROP : WAN_Interface (0.0.0.0/0)   -> Firewall_MGMT_IP port 443/22/8443`
  },
  {
    id: 19,
    question: "What is a 'High-Availability (HA) Active-Passive' firewall cluster and how does it prevent network downtime?",
    shortAnswer: "Two identical firewalls are paired together; the Active unit processes all traffic while synchronizing state tables in real-time to the Passive unit, which takes over seamlessly in milliseconds if the primary unit fails.",
    explanation: "If the active firewall experiences hardware failure, power loss, or kernel panic, the passive standby unit detects the missing heartbeat via VRRP/CARP and assumes the active gateway IP address and MAC address. Because connection tables are synchronized, active user sessions (SSH, VoIP, banking) do not drop.",
    hint: "A backup pilot sitting in the cockpit ready to take the controls instantly if the captain faints.",
    level: "Moderate",
    codeExample: `// High Availability (HA) State Synchronization:
// Primary Firewall (Active)  <=== Heartbeat & conntrack sync ===> Secondary Firewall (Passive)
// If Primary fails -> Secondary promotes to Active in < 500ms!`
  },
  {
    id: 20,
    question: "What is the difference between a 'Routed Mode' firewall and a 'Transparent / Bridge Mode' (Bump-in-the-Wire) firewall?",
    shortAnswer: "A Routed Mode firewall acts as a Layer 3 gateway with distinct IP subnets on each interface, whereas a Transparent Mode firewall operates at Layer 2 without IP addresses on its interfaces, filtering traffic invisibly.",
    explanation: "In Routed Mode, the firewall is the default gateway for internal clients and performs routing and NAT. In Transparent/Bridge Mode, the firewall is inserted into an existing network cable without modifying IP subnets, routing tables, or client configurations, making it invisible to network traceroutes.",
    hint: "Layer 3 router that participates in IP hops vs Layer 2 invisible filter inserted into the wire.",
    level: "Expert",
    codeExample: `// Routed vs Transparent Mode:
// Routed Mode     : LAN (10.10.1.0/24) -> [FW Gateway: 10.10.1.1] -> WAN (203.0.113.1)
// Transparent Mode: LAN (10.10.1.0/24) -> [Layer 2 Bridge FW (No IP)] -> LAN Gateway (10.10.1.1)`
  },
  {
    id: 21,
    question: "What is 'Port Address Translation' (PAT) Overload and how many concurrent TCP/UDP connections can a single public IP support theoretically?",
    shortAnswer: "PAT Overload maps thousands of internal private connections to a single public IP by assigning unique 16-bit source port numbers, supporting approximately 64,512 concurrent outbound sessions per public IP.",
    explanation: "TCP/UDP port numbers are 16-bit integers (0 to 65,535). Reserving well-known ports (0-1023), the ephemeral port range (1024-65535) provides ~64,512 distinct ports. When internal users initiate connections, the NAT firewall dynamically allocates an ephemeral port on its public IP.",
    hint: "65,535 total ports minus reserved system ports equals ~64,500 available NAT ports.",
    level: "Moderate",
    codeExample: `// PAT Ephemeral Port Calculation:
const totalPorts = 65536;
const reservedPorts = 1024;
const maxConcurrentSessionsPerIP = totalPorts - reservedPorts; // 64,512 sessions`
  },
  {
    id: 22,
    question: "What is an 'Access Control List' (ACL) in the context of network firewalls and screening routers?",
    shortAnswer: "An ordered set of permit and deny rules applied to an interface that matches packet header fields (source IP, destination IP, protocol, port) to filter network traffic.",
    explanation: "ACLs are the building blocks of stateless packet filters and router interfaces. Standard ACLs match solely on source IP address, while Extended ACLs match on source IP, destination IP, transport protocol (TCP/UDP/ICMP), and port numbers for granular access control.",
    hint: "A numbered list of permitted and forbidden conditions checked against every packet.",
    level: "Basic",
    codeExample: `// Extended Cisco ACL:
// access-list 101 permit tcp 10.10.1.0 0.0.0.255 host 172.16.1.10 eq 443
// access-list 101 deny   ip  any any`
  },
  {
    id: 23,
    question: "How does a firewall rule base handle packet fragmentation attacks (e.g. Tiny Fragment or Overlapping Fragment exploits)?",
    shortAnswer: "Modern firewalls perform 'Virtual De-fragmentation' by caching all packet fragments in memory and reassembling the full Layer 4/7 packet before applying security rule inspection.",
    explanation: "Attackers split malicious TCP headers across two fragments so that the destination port is in Fragment 2, evading naive packet filters that only inspect Fragment 1. Virtual De-fragmentation reassembles the fragmented IP payload in firewall RAM, ensuring full inspection before forwarding.",
    hint: "Putting the puzzle pieces back together in memory before deciding if the picture is safe.",
    level: "Expert",
    codeExample: `// iptables Virtual De-fragmentation:
// Linux Netfilter automatically reassembles fragmented packets via 'nf_defrag_ipv4'
// before evaluating iptables filter and NAT tables!`
  },
  {
    id: 24,
    question: "What is 'Split-Tunneling' in enterprise VPN firewalls and why is it often considered a security risk?",
    shortAnswer: "Split-tunneling routes only corporate traffic through the encrypted VPN tunnel while routing general Internet traffic directly through the user's local unencrypted ISP connection, potentially allowing malware on the Internet to pivot into the corporate LAN.",
    explanation: "When split-tunneling is enabled, a remote employee's infected home computer can act as an unmonitored bridge: an external attacker compromises the workstation via open home Wi-Fi and pivots across the established VPN tunnel directly into the corporate network.",
    hint: "Traffic splits between company tunnel and public internet; an open backdoor into the company network.",
    level: "Moderate",
    codeExample: `// Full Tunnel vs Split Tunnel:
// Full Tunnel : ALL traffic (Corporate + Internet) routes through Enterprise NGFW for inspection
// Split Tunnel: Only 10.0.0.0/8 routes via VPN; www.google.com routes via home ISP (Bypasses NGFW!)`
  },
  {
    id: 25,
    question: "What is the purpose of Firewall 'Hairpin NAT' (NAT Loopback)?",
    shortAnswer: "Hairpin NAT allows internal LAN clients to access internal servers using their public external WAN IP address or public domain name from within the local network.",
    explanation: "When an internal employee at `10.10.1.50` browses to `https://tax.barrackpore.gov.in` (which resolves to public IP `203.0.113.10`), without Hairpin NAT the edge router drops the packet because it enters and exits the same internal interface. Hairpin NAT rewrites source and destination IPs so internal servers can respond properly.",
    hint: "A U-turn for network packets so internal users can use the public web address.",
    level: "Expert",
    codeExample: `// Hairpin NAT Concept:
// Client (10.10.1.50) -> Requests Public IP (203.0.113.10)
// Router performs U-turn -> Translates to DMZ IP (172.16.1.10) -> Returns response smoothly!`
  },
  {
    id: 26,
    question: "What is 'Zone-Based Firewall' (ZFW) architecture and how does it improve upon traditional interface-based rule designs?",
    shortAnswer: "ZFW groups interfaces into logical security zones (e.g. INSIDE, OUTSIDE, DMZ) and defines security policies between pairs of zones, rather than attaching complex individual ACLs to every physical interface.",
    explanation: "In legacy firewalls, adding a new router interface required rewriting ACLs on every port. In Zone-Based Firewalls (Cisco ZFW / Palo Alto), administrators define zone-pair policies: 'Policy: INSIDE to DMZ = Allow HTTPS'. Any interface assigned to the INSIDE zone automatically inherits this policy.",
    hint: "Grouping rooms into 'Public Area' and 'Vault Area' and defining rules between zones.",
    level: "Moderate",
    codeExample: `// Cisco Zone-Based Policy Firewall (ZFW):
// zone security INSIDE
// zone security DMZ
// zone-pair security IN_TO_DMZ source INSIDE destination DMZ
//  service-policy type inspect ALLOW_WEB_POLICY`
  },
  {
    id: 27,
    question: "Why is 'Geo-IP Blocking' at the edge firewall an effective attack surface reduction technique for regional Indian organizations?",
    shortAnswer: "Geo-IP blocking drops all network traffic originating from countries where the organization has no legitimate users, customers, or business operations, eliminating millions of automated botnet scans daily.",
    explanation: "A municipal bank or hospital in Barrackpore or Ichapur has users exclusively in India. By dropping inbound traffic originating from unapproved foreign CIDR blocks at the perimeter firewall, the SOC eliminates 90%+ of automated brute-force attempts and exploit scans before application servers process them.",
    hint: "Locking the border gate against foreign automated botnet traffic when you only serve local citizens.",
    level: "Basic",
    codeExample: `// Geo-IP Firewall Rule:
// IF Packet.SourceCountry NOT IN ['IN'] AND Packet.DestinationPort == 443 -> DROP Flow!`
  },
  {
    id: 28,
    question: "What are 'Orphaned Rules' in enterprise firewall rule base hygiene?",
    shortAnswer: "Orphaned rules are legacy firewall rules that permit access to IP addresses, servers, or applications that have been decommissioned or migrated, unnecessarily leaving open holes in the perimeter.",
    explanation: "Over years of operations, servers are retired, but administrators forget to delete their corresponding firewall permit rules. Attackers who discover these open ports can spin up rogue services or compromise adjacent devices, exploiting the forgotten rule.",
    hint: "A door left unlocked for a tenant who moved out three years ago.",
    level: "Moderate",
    codeExample: `// Orphaned Rule Risk:
// Rule 45: ALLOW ANY -> 10.10.4.80 port 8080 (Old staging server decommissioned in 2021!)
// Fix: Automated firewall rule audits flagging zero-hit-count rules over 90 days.`
  },
  {
    id: 29,
    question: "How does a Security Operations Center (SOC) use Firewall 'Hit Count' telemetry for rule optimization and pruning?",
    shortAnswer: "Hit counts track how many packets match each rule; rules with zero hits over 90–180 days are identified as obsolete candidates for decommissioning, reducing complexity and attack surface.",
    explanation: "Large enterprise firewalls often accumulate thousands of rules, degrading firewall throughput and creating security blind spots. SOC engineers analyze hit count counters during quarterly audits, removing unused rules to streamline kernel lookup speeds and enhance security posture.",
    hint: "Checking how many times a key was used; if never used in a year, discard the key.",
    level: "Moderate",
    codeExample: `// iptables -L -v -n (Shows Hit Counts):
// pkts   bytes target     prot opt in     out     source               destination
// 452K    48M ACCEPT     tcp  --  eth0   *       0.0.0.0/0            172.16.1.10   tcp dpt:443
//    0      0 ACCEPT     tcp  --  eth0   *       0.0.0.0/0            172.16.1.99   tcp dpt:8080 (0 Hits = Candidate for removal!)`
  },
  {
    id: 30,
    question: "Synthesize the core takeaways regarding firewall functions and strategic placement for computer science and cybersecurity scholars.",
    shortAnswer: "Firewalls are foundational multi-zone access control engines; optimal defense requires multi-tiered placement (Edge, DMZ, Inter-VLAN Core, Host); default-deny rule bases; real-time conntrack state management; and compliance with CERT-In 180-day logging mandates.",
    explanation: "A firewall is only as effective as its architecture and policy: placing firewalls at perimeter boundaries, isolating public services in DMZs, micro-segmenting internal VLANs, and hardening host kernels transforms a vulnerable network into an impenetrable, multi-tiered enterprise fortress.",
    hint: "Multi-tiered placement + Default-Deny + DMZ Isolation + Conntrack State + 180-Day Logging = Impenetrable Perimeter.",
    level: "Moderate",
    codeExample: `// The Master Firewall Architecture Formula:
// Resilient Defense = [Edge NGFW (Default-Deny)] + [DMZ Isolation] + [Inter-VLAN Micro-segmentation] + [Host-based iptables] + [180-day CERT-In Logging]`
  }
];

export default questions;
