const questions = [
  {
    id: 1,
    question: "What is 'Out-of-Band (OOB) Management' and why is it mandatory for enterprise perimeter firewalls?",
    shortAnswer: "Connecting dedicated physical firewall management interfaces (HTTPS/SSH/Console) exclusively to a physically isolated management network (VLAN 99), with zero management exposure to public WAN or general LAN networks.",
    explanation: "If administrative management interfaces are exposed to the public Internet or user subnets, attackers can attempt brute-force login attacks, exploit web management vulnerabilities, or disrupt access during network saturation. OOB isolation ensures management is accessible only from dedicated air-gapped terminals.",
    hint: "A separate, isolated private network used exclusively for administrator logins and maintenance.",
    level: "Basic",
    codeExample: `// Dedicated OOB Management Port Configuration:
// interface mgmt0
//  ip address 10.10.99.1 255.255.255.0
//  no ip route 0.0.0.0 0.0.0.0 WAN_GW (Zero route to the public Internet!)`
  },
  {
    id: 2,
    question: "What is the statutory requirement under the CERT-In 2022 Cybersecurity Directives regarding firewall log retention?",
    shortAnswer: "All firewall connection logs, security events, rule match telemetry, administrative logins, and system changes must be retained securely in immutable SIEM / WORM storage for a minimum of 180 days within Indian jurisdiction.",
    explanation: "Under Section 70B of the Information Technology Act 2000, organizations in India must maintain complete, tamper-proof logs for 180 days to support national cybersecurity forensic investigations and incident tracing.",
    hint: "180 days of immutable log retention.",
    level: "Basic",
    codeExample: `// CERT-In 180-Day Log Retention Policy:
const certinLogPolicy = {
  retentionPeriodDays: 180,
  storageType: "Immutable WORM / Write-Only SIEM",
  timeSynchronization: "NPL India NTP Reference Servers",
  jurisdiction: "Within India"
};`
  },
  {
    id: 3,
    question: "Why must all enterprise firewalls synchronize their system clocks with National Physical Laboratory (NPL) India NTP servers?",
    shortAnswer: "To ensure that timestamps across firewalls, routers, SIEM collectors, and endpoint logs correlate down to the millisecond, which is legally mandatory for CERT-In forensic timeline reconstruction.",
    explanation: "If firewall timestamps drift by even a few seconds, correlating an external port scan on the perimeter with an internal database query becomes impossible, invalidating digital evidence in court.",
    hint: "To ensure all log timestamps match perfectly across all servers for legal and forensic accuracy.",
    level: "Basic",
    codeExample: `// NTP Synchronization Directives:
// ntp server time.nplindia.org prefer
// ntp server samay.nic.in`
  },
  {
    id: 4,
    question: "How does an 'Nmap TCP SYN Scan' (`nmap -sS`) verify firewall port filtering policy?",
    shortAnswer: "It transmits half-open TCP SYN packets; whitelisted open ports respond with SYN-ACK, while blocked ports return TCP RST or result in silent drops (filtered), confirming that non-whitelisted ports are strictly closed.",
    explanation: "A full port scan (`nmap -sS -p 1-65535 <Target>`) should show only explicitly intended business ports (e.g. 80, 443) as open. Any unexpected open ports indicate rule-base misconfiguration or rogue services.",
    hint: "Scanning all 65,535 ports with half-open SYN packets to ensure only approved ports respond.",
    level: "Moderate",
    codeExample: `// Nmap Full Perimeter SYN Scan:
// nmap -sS -Pn -p 1-65535 -T4 203.0.113.10
// Expected Output: 443/tcp open https, 65534 ports filtered`
  },
  {
    id: 5,
    question: "What is the purpose of an 'Nmap ACK Scan' (`nmap -sA`) during firewall testing?",
    shortAnswer: "To map stateful firewall inspection boundaries; because unsolicited ACK packets do not match any existing state table entry, a stateful firewall drops them without creating new sessions.",
    explanation: "Stateless packet filters pass ACK packets through if they match loose inbound rules. A stateful firewall rejects unsolicited ACK packets because no initial SYN handshake was tracked in the connection state table.",
    hint: "Sending unsolicited ACK packets to verify that stateful inspection drops non-established traffic.",
    level: "Moderate",
    codeExample: `// Nmap ACK Scan for Stateful Boundary Verification:
// nmap -sA -p 80,443,8080 203.0.113.10
// Expected Output: All ports returned as 'filtered' (Stateful drop)`
  },
  {
    id: 6,
    question: "What is 'Packet Crafting with Scapy / Hping3' and what firewall evasion techniques does it test?",
    shortAnswer: "Generating custom raw IP/TCP packets to test whether the firewall properly reassembles overlapping IP fragments, drops malformed TCP flags (NULL/XMAS scans), and detects invalid sequence numbers.",
    explanation: "Attackers use tools like Scapy to split malicious payloads across overlapping 8-byte IP fragments. Security engineers use Scapy in testing drills to confirm that the firewall's fragment reassembly engine reconstructs the entire packet before inspection.",
    hint: "Creating custom raw test packets to verify that the firewall handles fragmented and malformed traffic properly.",
    level: "Expert",
    codeExample: `// Scapy Fragmented Packet Crafting Script:
// pkt = IP(dst="172.16.1.10", flags="MF")/TCP(sport=1024, dport=443, flags="S")/Raw(b"TEST_PAYLOAD")
// send(pkt)`
  },
  {
    id: 7,
    question: "What is the 'Four-Eyes Principle' in enterprise firewall change management?",
    shortAnswer: "A mandatory governance policy requiring that every proposed firewall rule addition or modification be drafted by one engineer and independently reviewed and approved by a second certified engineer before deployment.",
    explanation: "The Four-Eyes Principle prevents accidental misconfigurations (e.g. accidentally opening port 22 to `0.0.0.0/0` during emergency troubleshooting) and eliminates insider rogue changes.",
    hint: "Requiring two different people to review and approve every firewall rule change.",
    level: "Basic",
    codeExample: `// Four-Eyes Workflow:
// Step 1: Mamata submits rule change #CHG-9921 → Step 2: Sukanta Hui reviews diff & approves → Step 3: Automated CI/CD deployment`
  },
  {
    id: 8,
    question: "What is 'Active-Passive High Availability (HA)' clustering and how does state synchronization operate?",
    shortAnswer: "Primary firewall actively forwards and inspects all traffic, while the Standby unit continuously mirrors conntrack state tables over a dedicated HA2 data link, enabling sub-500ms failover without dropping active sessions.",
    explanation: "If the primary appliance loses power or network link connectivity, the standby firewall detects missing heartbeats on the HA1 control link and immediately assumes the active IP/MAC addresses. Because its state table was synchronized in real-time, active VPN tunnels and HTTPS sessions remain connected.",
    hint: "One firewall runs while a backup mirrors all connection tables over dedicated sync links for instant failover.",
    level: "Moderate",
    codeExample: `// HA Dual Dedicated Links:
// HA1 Link (Control): Heartbeat keepalives & configuration sync (TCP 28769)
// HA2 Link (Data)   : Real-time Conntrack state table & TCP sequence sync`
  },
  {
    id: 9,
    question: "What is 'Active-Active High Availability' and what are its primary engineering trade-offs?",
    shortAnswer: "Both firewall appliances forward and inspect traffic simultaneously to balance volumetric load; trade-offs include asymmetric routing session complexity and the requirement that each unit must run below 50% capacity to survive single-node failure.",
    explanation: "In Active-Active mode, return packets may arrive on a different firewall than outbound packets (asymmetric routing), requiring inter-firewall session forwarding over HA data links. If one unit fails, the remaining unit must absorb 100% of load without CPU saturation.",
    hint: "Both firewalls run at the same time, requiring complex asymmetric state sync.",
    level: "Expert",
    codeExample: `// Active-Active Sizing Rule:
// Max Steady-State Utilization Per Node <= 45% (To guarantee 100% capacity during single-node failure)`
  },
  {
    id: 10,
    question: "What structured syslog standards (RFC 5424 / Common Event Format - CEF) should firewalls stream to SIEM platforms?",
    shortAnswer: "Structured key-value pair logs formatted with ISO 8601 UTC timestamps, unique device hostnames, Source IP/Port, Destination IP/Port, Protocol, Rule Name/ID, Action (ALLOW/DROP), and Byte counts.",
    explanation: "Unstructured plain text logs (`traffic dropped on eth0`) require complex regex parsing in SIEM engines. Structured CEF/RFC 5424 formats allow SIEM collectors (Splunk, Elastic, Sentinel) to index and query security events at 50,000+ events per second without ingestion lag.",
    hint: "Standardized key-value log formats that allow SIEM software to search and analyze millions of events instantly.",
    level: "Moderate",
    codeExample: `// RFC 5424 / CEF Structured Syslog Message:
// CEF:0|PaloAlto|PAN-OS|11.0|TRAFFIC|drop|5|src=198.51.100.25 spt=54120 dst=172.16.1.10 dpt=22 proto=TCP act=DROP rule=DENY_SSH`
  },
  {
    id: 11,
    question: "Why must Syslog traffic be transmitted over Encrypted TLS (TCP Port 6514) rather than cleartext UDP Port 514?",
    shortAnswer: "To prevent eavesdropping on sensitive network telemetry (which discloses internal IP addressing, usernames, and vulnerability hits) and to guarantee reliable, in-order packet delivery without UDP packet drop during high-volume attacks.",
    explanation: "UDP 514 sends logs in plaintext without delivery confirmation; during a massive DDoS flood, syslog packets are dropped silently. Syslog over TLS (RFC 5425) provides cryptographic confidentiality and TCP retransmission reliability.",
    hint: "Encrypts logs to prevent eavesdropping and uses TCP so logs are never lost during heavy traffic.",
    level: "Moderate",
    codeExample: `// Syslog-TLS Configuration:
// destination d_tls { tcp("siem.barrackpore.gov.in" port(6514) tls(ca-dir("/etc/ssl/certs"))); };`
  },
  {
    id: 12,
    question: "What is 'Automated Configuration Backup and Version Control' (NetDevOps / GitOps) for firewall infrastructure?",
    shortAnswer: "Storing all firewall configurations and rule bases as declarative code in a Git repository (e.g. Terraform / Ansible), pushing automated encrypted daily backups to an off-site repository.",
    explanation: "If a hardware appliance suffers total flash memory failure or ransomware corruption, administrators can restore the exact configuration within 2 minutes using version-controlled Terraform scripts, eliminating days of manual reconstruction.",
    hint: "Saving firewall configs in Git repositories and taking encrypted daily backups.",
    level: "Moderate",
    codeExample: `// Terraform Palo Alto Rule as Code:
// resource "panos_security_rule_group" "perimeter" {
//   rule { name = "Allow-HTTPS" action = "allow" ... }
// }`
  },
  {
    id: 13,
    question: "What is 'Role-Based Access Control' (RBAC) and Least Privilege on firewall management consoles?",
    shortAnswer: "Assigning administrative permissions strictly based on job role: Tier 1 SOC analysts have read-only monitoring access; Network Engineers can modify routing; only Lead Architects have commit permissions.",
    explanation: "Granting full superuser/root access to all team members increases the probability of accidental rule deletions. RBAC restricts permissions so that each engineer has only the exact capabilities needed for their role.",
    hint: "Giving users only the specific permissions needed for their job, like read-only access for junior analysts.",
    level: "Basic",
    codeExample: `// Granular RBAC Roles:
const rbacMatrix = {
  socAnalyst: "Read-Only (Logs & Dashboards)",
  netOps: "Routing & Interface Config Only",
  secArchitect: "Full Commit & Security Policy Approval"
};`
  },
  {
    id: 14,
    question: "What is 'Log Correlation & Port Sweep Detection' in SIEM monitoring of firewall logs?",
    shortAnswer: "Automated correlation rules that detect when a single external IP address generates 20+ connection attempts across sequential ports within 10 seconds, identifying reconnaissance scans.",
    explanation: "A single dropped packet is normal noise. A SIEM correlation rule aggregates hundreds of dropped syslog events matching a single source IP over a 10-second window, automatically flagging an active port scanning campaign and blocking the source IP dynamically.",
    hint: "Detecting when one computer tries to connect to many different ports in a few seconds.",
    level: "Moderate",
    codeExample: `// SIEM Correlation Query (KQL / Splunk SPL):
// index=firewall action=DROP | stats count, dc(dst_port) as port_count by src_ip | where port_count > 20`
  },
  {
    id: 15,
    question: "What is 'SYN Flood Rate-Limiting & SYN Cookies' configuration at the ingress interface?",
    shortAnswer: "Interface thresholds that trigger cryptographic SYN cookies when embryonic connection queues exceed safe limits (e.g. 10,000 CPS), dropping illegitimate half-open connection floods before memory exhaustion.",
    explanation: "During a SYN flood attack, attackers send millions of SYN packets without completing the 3-way handshake. Enabling SYN Cookies encodes connection state into the initial sequence number, allowing the firewall to verify legitimacy without allocating memory buffers.",
    hint: "Using cryptographic sequence numbers to defeat SYN flood attacks without exhausting memory.",
    level: "Moderate",
    codeExample: `// Zone Protection SYN Flood Profile:
// Alert Threshold: 10,000 CPS | Activate SYN Cookies: 25,000 CPS | Max Drop: 50,000 CPS`
  },
  {
    id: 16,
    question: "Why should an enterprise firewall NEVER have generic default SNMP community strings (e.g. `public` or `private`) enabled?",
    shortAnswer: "Default community strings allow unauthenticated external or internal attackers to query SNMP MIBs, dumping entire network routing tables, interface IP maps, and firewall firmware versions.",
    explanation: "SNMPv1 and SNMPv2c transmit community strings in cleartext. Best practice mandates disabling SNMPv1/v2c and enforcing SNMPv3 with SHA-256 authentication and AES-256 encryption restricted to the OOB management VLAN.",
    hint: "Default SNMP passwords like 'public' leak complete network maps to hackers.",
    level: "Basic",
    codeExample: `// Hardened SNMPv3 Configuration:
// snmp-server group SECURE_GROUP v3 priv
// snmp-server user admin_soc SECURE_GROUP v3 auth sha MyPass123 priv aes MyPriv456`
  },
  {
    id: 17,
    question: "What is 'Link State Pass-Through' (Link Monitoring) in firewall High Availability failover?",
    shortAnswer: "A monitoring daemon that continuously checks physical link health on WAN and LAN interfaces; if the primary firewall's upstream ISP cable is severed, it automatically triggers an HA failover even if the firewall appliance has power.",
    explanation: "If only the WAN fiber cable is unplugged, the primary firewall remains powered on but cannot route traffic. Link State Pass-Through detects the severed uplink within 100ms and triggers an immediate failover to the standby firewall.",
    hint: "Triggering a failover automatically if an Internet cable is unplugged, even if the firewall is still powered on.",
    level: "Expert",
    codeExample: `// HA Link Group Monitoring:
// set deviceconfig high-availability group 1 monitoring link-group "WAN_Uplink" failure-condition "any"`
  },
  {
    id: 18,
    question: "What is 'Bogon IP Filtering' and why must it be placed at the absolute top of the ingress firewall rule base?",
    shortAnswer: "Discarding packets arriving on public WAN interfaces with unallocated, private (RFC 1918), or reserved IP addresses (0.0.0.0/8, 127.0.0.0/8, 100.64.0.0/10, 169.254.0.0/16, 224.0.0.0/4).",
    explanation: "Legitimate Internet traffic never originates from private or reserved IP ranges. Dropping Bogon packets at the very top of the rule table discards spoofed packets before they consume CPU or state table resources.",
    hint: "Dropping fake, private, and reserved IP addresses at the top of the rule list.",
    level: "Basic",
    codeExample: `// WAN Ingress Bogon Drop ACL:
// deny ip 10.0.0.0 0.255.255.255 any
// deny ip 172.16.0.0 0.15.255.255 any
// deny ip 192.168.0.0 0.0.255.255 any`
  },
  {
    id: 19,
    question: "How does a Security Operations Center (SOC) monitor 'Firewall Connection State Table Exhaustion'?",
    shortAnswer: "By configuring SNMP/Prometheus alerts that trigger high-severity notifications when the active conntrack table reaches 80% and 90% of maximum hardware capacity, preventing denial of service.",
    explanation: "Every active connection consumes ~300 bytes of kernel RAM. If a state exhaustion attack or sudden traffic surge fills the state table, new legitimate connections are dropped. Monitoring table capacity allows SOC teams to activate SYN cookies or expand memory buffers.",
    hint: "Alerting when firewall connection memory reaches 80% to prevent dropping valid connections.",
    level: "Moderate",
    codeExample: `// Prometheus Conntrack Alert Rule:
// expr: (node_nf_conntrack_entries / node_nf_conntrack_entries_limit) > 0.80
// for: 1m | labels: { severity: "critical" }`
  },
  {
    id: 20,
    question: "What is 'Automated Firmware Patching & CVE Vulnerability Management' for firewall appliances?",
    shortAnswer: "Tracking vendor CVE advisories (e.g. Fortinet, Palo Alto, Cisco) and deploying certified firmware maintenance releases within approved change windows (14–30 days for critical RCE vulnerabilities).",
    explanation: "Nation-state threat actors actively target unpatched edge firewall appliances with pre-auth RCE exploits. Timely firmware patching ensures that zero-day vulnerabilities in VPN daemons and web management portals are remediated.",
    hint: "Applying firmware updates within 2–4 weeks to patch known security vulnerabilities in the firewall.",
    level: "Basic",
    codeExample: `// Firmware Patch Lifecycle Policy:
// Critical CVE (CVSS >= 9.0) : Patch within 72 Hours
// High CVE     (CVSS >= 7.0) : Patch within 14 Days
// Maintenance Updates         : Apply Quarterly`
  },
  {
    id: 21,
    question: "What is 'TCP MSS Clamping' on perimeter firewall WAN interfaces?",
    shortAnswer: "Automatically rewriting the TCP Maximum Segment Size (MSS) in SYN packets traversing VPN tunnels or PPPoE links to prevent IP fragmentation and MTU packet drop issues.",
    explanation: "IPSec VPN encapsulation adds 50–70 bytes of header overhead, exceeding the standard 1500-byte Ethernet MTU. MSS clamping rewrites the MSS to 1360 bytes during the TCP handshake, preventing packet fragmentation and performance degradation.",
    hint: "Adjusting packet sizes during handshakes so VPN traffic doesn't get fragmented or dropped.",
    level: "Expert",
    codeExample: `// MSS Clamping iptables Rule:
// iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu`
  },
  {
    id: 22,
    question: "Why should an enterprise firewall NEVER have 'Split-Tunneling' enabled on remote client VPNs without endpoint inspection?",
    shortAnswer: "Split-tunneling allows a remote employee's laptop to access the internal corporate network and the uninspected public Internet simultaneously, allowing malware on the laptop to bridge the networks.",
    explanation: "With split-tunneling, if an employee visits an infected website, malware can compromise the laptop and route directly into the corporate network over the open VPN tunnel. Full-tunneling forces all employee traffic through the corporate firewall for inspection.",
    hint: "Split-tunneling lets a laptop connect to company databases and unsafe websites at the same time, risking infection.",
    level: "Moderate",
    codeExample: `// Secure Full-Tunnel VPN Policy:
// Force-All-Traffic-Over-Tunnel = ENABLED (Routes 0.0.0.0/0 through corporate NGFW)`
  },
  {
    id: 23,
    question: "What is 'WORM Storage' (Write-Once-Read-Many) and why is it used for CERT-In firewall log compliance?",
    shortAnswer: "Cryptographically locked storage where log data can be written once but cannot be deleted, modified, or overwritten by any user (including root administrators) until the retention timer (180 days) expires.",
    explanation: "Under the DPDP Act and CERT-In directions, audit trails must be protected against insider threats and attacker tampering. WORM storage (e.g. AWS S3 Object Lock in Compliance Mode) mathematically guarantees log immutability.",
    hint: "Storage that locks logs so no one can modify or delete them for 180 days.",
    level: "Moderate",
    codeExample: `// AWS S3 Object Lock Compliance Mode:
// aws s3api put-object-lock-configuration --bucket certin-audit-logs --object-lock-configuration 'ObjectLockEnabled="Enabled",Rule={DefaultRetention={Mode="COMPLIANCE",Days=180}}'`
  },
  {
    id: 24,
    question: "What is 'Penetration Testing Scope & Rules of Engagement' for perimeter firewall assessments?",
    shortAnswer: "A formal legal document defining authorized test windows, target IP ranges, permitted attack methodologies, and emergency contact numbers before conducting active penetration tests against perimeter firewalls.",
    explanation: "Conducting unauthorized port scans or stress tests against a perimeter firewall without written authorization violates Section 43/66 of the Indian IT Act 2000. Formal Rules of Engagement establish legal authorization and prevent accidental disruption.",
    hint: "A signed legal document defining when and how security testing can take place without breaking laws.",
    level: "Basic",
    codeExample: `// Penetration Testing Rules of Engagement (RoE):
const roeDoc = {
  authorizedTarget: "203.0.113.0/28",
  testWindow: "2026-08-24 01:00 to 05:00 IST",
  prohibitedActions: ["Destructive DoS", "Hardware Overvoltage"],
  leadAuditor: "Sukanta Hui (Coder & AccoTax)"
};`
  },
  {
    id: 25,
    question: "How do security engineers verify that 'Fragmented Packet Reassembly' is working properly on a firewall?",
    shortAnswer: "By using Scapy or Hping3 to transmit fragmented packets with offset overlaps; the firewall must buffer, reassemble, and inspect the unified payload before forwarding, dropping invalid fragment sequences.",
    explanation: "If a firewall inspects fragments individually, an attacker can place part of an exploit string in Fragment 1 and the rest in Fragment 2, evading signature inspection. Reassembly verification ensures the firewall reconstructs the full buffer first.",
    hint: "Testing with split packets to confirm the firewall glues them together before scanning.",
    level: "Expert",
    codeExample: `// Hping3 Fragmented Packet Test:
// hping3 -f -p 443 -d 100 --setseq 1000 203.0.113.10`
  },
  {
    id: 26,
    question: "What is 'Quarterly Rule Recertification & Orphaned Rule Pruning' in enterprise firewall hygiene?",
    shortAnswer: "A scheduled quarterly review where every firewall rule is checked against hit-count telemetry; rules with zero hits over 90–180 days are formally verified with application owners and decommissioned.",
    explanation: "Firewall rules tend to accumulate indefinitely over years of operations. Quarterly recertification prevents rule bloat, eliminates stale doors left open for decommissioned servers, and maintains high performance.",
    hint: "Reviewing all firewall rules every 3 months and deleting old rules that have zero hits.",
    level: "Basic",
    codeExample: `// Quarterly Pruning Workflow:
// Step 1: Export rules with hit_count == 0 (Last 90 Days) → Step 2: Notify app owners → Step 3: Decommission after 14 days`
  },
  {
    id: 27,
    question: "Why should an enterprise firewall log BOTH Permitted (Accept) and Blocked (Drop) traffic events?",
    shortAnswer: "Logging Drops detects active attack scans and reconnaissance; logging Accepts is essential for investigating post-compromise lateral movement and verifying data exfiltration pathways.",
    explanation: "If only dropped packets are logged, investigators cannot tell which files or databases an attacker successfully accessed after compromising a legitimate account. Full telemetry provides end-to-end forensic visibility.",
    hint: "Logging drops shows who tried to attack; logging accepts shows what traffic was actually allowed through.",
    level: "Basic",
    codeExample: `// Comprehensive Telemetry:
// Log-On-Session-End = TRUE (Logs bytes transferred and duration for PERMITS)
// Log-On-Session-Drop = TRUE (Logs immediate connection DROPS)`
  },
  {
    id: 28,
    question: "What is 'Session Table Rate-Limiting / Connection Velocity Capping' per Source IP?",
    shortAnswer: "Restricting the maximum number of new concurrent connections or embryonic sessions a single source IP can initiate per second (e.g. max 50 CPS per IP), preventing individual bot hosts from monopolizing firewall memory.",
    explanation: "An attacker with a single high-bandwidth server can open 100,000 TCP connections in seconds, consuming all state table RAM. Connection velocity capping throttles abusive IPs automatically.",
    hint: "Limiting how many new connections a single computer can open per second.",
    level: "Moderate",
    codeExample: `// iptables Connection Rate-Limiting:
// iptables -A INPUT -p tcp --dport 443 -m connlimit --connlimit-above 50 -j REJECT`
  },
  {
    id: 29,
    question: "What is 'Immutable SIEM Architecture' and how does it protect against insider evidence tampering?",
    shortAnswer: "A write-only SIEM collector where logs are ingested and signed cryptographically, preventing even firewall administrators from altering or deleting historical security event records.",
    explanation: "If a rogue administrator modifies a firewall rule to steal data, they cannot log into the SIEM to delete the audit trail because the SIEM resides on a separate, air-gapped security domain with independent access controls.",
    hint: "A separate logging system that administrators cannot edit or delete.",
    level: "Moderate",
    codeExample: `// Cryptographic Log Chain:
// SHA-256(Log_N) = Hash(Log_N_Payload + SHA-256(Log_N-1)) → Any modification breaks the cryptographic hash chain!`
  },
  {
    id: 30,
    question: "Synthesize the overarching best practices for Firewall Configuration, Testing, and Logging.",
    shortAnswer: "1. Isolate management onto dedicated OOB VLANs with MFA; 2. Validate stateful defenses regularly using Nmap and Scapy penetration testing; 3. Stream structured RFC 5424 syslog over TLS to a SIEM; 4. Maintain 180-day WORM log retention with NPL India NTP synchronization; 5. Deploy Active-Passive HA clusters with dedicated sync links.",
    explanation: "A truly secure perimeter requires rigorous configuration hardening, continuous active validation, resilient high-availability failover, and comprehensive, immutable logging. Following these best practices ensures impenetrable defense and full statutory compliance with CERT-In and the DPDP Act 2023.",
    hint: "OOB Management + Active Testing (Nmap/Scapy) + 180-Day WORM Logs (NTP Synced) + HA Clustering = Master Perimeter Security.",
    level: "Moderate",
    codeExample: `// The Master Perimeter Defense Formula:
// Master Perimeter = [OOB Management + MFA] + [Nmap/Scapy Testing] + [180-Day WORM Logs] + [NPL India NTP Sync] + [HA Active-Passive Cluster]`
  }
];

export default questions;
