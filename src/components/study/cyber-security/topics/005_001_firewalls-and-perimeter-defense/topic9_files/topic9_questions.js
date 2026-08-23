const questions = [
  {
    id: 1,
    question: "What is the philosophical and operational difference between a 'Default-Deny' policy and a 'Default-Allow' policy in firewall design?",
    shortAnswer: "Default-Deny (whitelisting) blocks all traffic by default and permits only explicitly authorized flows; Default-Allow (blacklisting) permits all traffic by default and blocks only specific known malicious ports.",
    explanation: "Default-Allow is a catastrophic security anti-pattern because attackers easily bypass blacklist rules by switching ports or using dynamic tunnels. Default-Deny enforces a closed perimeter where unknown ports, protocols, and zero-day attack paths are automatically discarded.",
    hint: "Default-Deny locks every door and opens only approved keys; Default-Allow leaves all doors open and tries to lock out specific bad guys.",
    level: "Basic",
    codeExample: `// Default-Deny (Positive Security Model):
// 1. Block EVERYTHING by default
// 2. Add explicit rule: ALLOW Finance-Users -> SAP-Server (Port 443)
// 3. Final Rule: DROP ANY ANY (Implicit Catch-All)`
  },
  {
    id: 2,
    question: "Explain the 'First-Match-Wins' principle in firewall rule evaluation and why rule order is critical.",
    shortAnswer: "Firewalls evaluate rules sequentially from top to bottom; the first rule that matches a packet executes immediately, and evaluation stops without checking any remaining rules below it.",
    explanation: "Because the first matching rule dictates the packet's fate, rule order determines security posture. If a broad permissive rule is placed on Line 1, specific blocking rules on Line 10 will never execute, creating severe security vulnerabilities.",
    hint: "Rules execute in order; the first matching rule takes action and stops the scan.",
    level: "Basic",
    codeExample: `// Rule Ordering Critical Example:
// Line 1: PERMIT Source: 10.10.1.0/24 -> Dest: ANY (Broad Allow)
// Line 2: DENY   Source: 10.10.1.50   -> Dest: ANY (SHADOWED! Host 10.10.1.50 is NEVER blocked!)`
  },
  {
    id: 3,
    question: "What is the 'Shadowing Anomaly' (Rule Shadowing) in firewall configuration management?",
    shortAnswer: "Shadowing occurs when a previous broader rule matches all packets intended for a subsequent narrower rule, preventing the subsequent rule from ever being evaluated or executed.",
    explanation: "Shadowing is a major security flaw. For example, if Rule 5 permits all traffic from `10.0.0.0/16`, Rule 12 which attempts to block a compromised host at `10.0.4.25` is completely shadowed. The firewall matches Rule 5 first and permits the attacker's traffic.",
    hint: "A broad rule higher up prevents a specific rule lower down from ever being reached.",
    level: "Moderate",
    codeExample: `// Shadowing Anomaly Detection:
// Rule 5 : ACCEPT Source: 192.168.1.0/24 -> Dest: ANY
// Rule 12: DROP   Source: 192.168.1.99   -> Dest: ANY [SHADOWED: 100% Dead Code!]`
  },
  {
    id: 4,
    question: "What is the 'Redundancy Anomaly' in firewall rule bases and why should redundant rules be removed?",
    shortAnswer: "A redundancy anomaly occurs when two rules perform the exact same action on overlapping or identical traffic; removing them streamlines rule base complexity and reduces CPU lookup overhead.",
    explanation: "Duplicate rules do not cause security breaches, but they bloat the rule table. In linear rule evaluations, scanning through hundreds of redundant rules increases CPU clock cycle consumption per packet and increases maintenance confusion.",
    hint: "Two rules doing the exact same thing on the same traffic.",
    level: "Basic",
    codeExample: `// Redundancy Anomaly Example:
// Rule 20: ACCEPT Source: 10.10.1.50 -> Dest: 172.16.1.10:443
// Rule 45: ACCEPT Source: 10.10.1.50 -> Dest: 172.16.1.10:443 [REDUNDANT: Exact Duplicate]`
  },
  {
    id: 5,
    question: "What is an 'Orphaned Rule' (Stale Rule) and how does it create an unnecessary attack surface?",
    shortAnswer: "An orphaned rule is a legacy firewall rule that permits traffic to an IP address, server, or service that has been decommissioned or migrated, leaving an unmonitored open hole in the perimeter.",
    explanation: "Over years of IT changes, servers are retired but administrators forget to delete their corresponding firewall permit rules. Attackers who scan the network find the open port and can deploy rogue hosts or exploit adjacent devices.",
    hint: "An old rule left behind for a server that was turned off years ago.",
    level: "Moderate",
    codeExample: `// Orphaned Rule Risk:
// Rule 72: ALLOW ANY -> 10.10.4.80:8080 (Old staging database turned off in 2022!)
// Fix: Automated quarterly audit flagging rules with 0 packet hits over 90 days.`
  },
  {
    id: 6,
    question: "What is the 'Correlation / Generalization Anomaly' in firewall rule base analysis?",
    shortAnswer: "When two rules intersect on some packet criteria but differ on other criteria and have conflicting actions, making the effective security policy depend entirely on the relative ordering of the two rules.",
    explanation: "For example, Rule 1 allows Subnet A to Port 80, while Rule 2 blocks Host A (which is inside Subnet A) from all ports. If Rule 1 is placed first, Host A can access Port 80; if Rule 2 is placed first, Host A is completely blocked. This ambiguity must be resolved explicitly.",
    hint: "Conflicting rules where the outcome changes depending on which one is placed above the other.",
    level: "Expert",
    codeExample: `// Correlation Conflict:
// Rule 1: PERMIT 10.10.1.0/24 -> 172.16.1.10:80
// Rule 2: DENY   10.10.1.50   -> ANY:ANY
// Conflict: Does 10.10.1.50 have access to 172.16.1.10:80? (Depends on ordering!)`
  },
  {
    id: 7,
    question: "Where must the 'Implicit Deny All' catch-all rule be placed in an enterprise firewall rule base?",
    shortAnswer: "At the absolute bottom (the final rule) of every firewall access control list and policy table.",
    explanation: "The Implicit Deny rule ensures that any packet that does not match any of the preceding explicit business permit rules is discarded by default, maintaining an airtight whitelisting posture.",
    hint: "At the very end of the rule list.",
    level: "Basic",
    codeExample: `// Final Implicit Deny Rule:
// Line 999: DROP Source: ANY -> Destination: ANY Protocol: ANY Port: ANY`
  },
  {
    id: 8,
    question: "How does 'Traffic-Frequency Ordering' optimize firewall CPU performance without altering security policy?",
    shortAnswer: "By placing the highest-volume legitimate permit rules (e.g. public HTTPS matching 90% of traffic) near the top of the permit section, 90% of packets exit after 1 comparison rather than scanning 100 rules.",
    explanation: "In software firewall engines evaluating rules in O(N) sequential time, evaluating a packet against 50 rules consumes 50x more CPU than matching on Line 1. Ordering high-hit-count rules first minimizes average comparisons per packet, drastically reducing packet latency.",
    hint: "Placing the most frequently used rules at the top to save CPU comparisons.",
    level: "Moderate",
    codeExample: `// CPU Optimization:
// Line 1: Permit HTTPS (Matches 900,000 packets/sec -> Evaluated in 1 comparison!)
// Line 2: Permit DNS   (Matches 80,000 packets/sec)
// Line 3: Permit SSH   (Matches 2,000 packets/sec)`
  },
  {
    id: 9,
    question: "What is 'Rule Hit Count Telemetry' and how do SOC engineers use it during quarterly firewall audits?",
    shortAnswer: "Hit counters record the total number of packets that matched each rule; rules with zero hits over 90–180 days are flagged as candidates for decommissioning and pruning.",
    explanation: "Hit count telemetry provides empirical proof of rule utility. If Rule 54 was created for a temporary project 3 years ago and has recorded 0 hits in 180 days, security engineers can safely decommission the rule to shrink the perimeter attack surface.",
    hint: "Counting how many times each rule was used; zero hits over 6 months means the rule should be deleted.",
    level: "Basic",
    codeExample: `// Cisco / Palo Alto Rule Hit Count Display:
// Rule: Allow-Vendor-VPN | Hit Count: 0 | Last Hit: Never (Decommissioning Candidate!)
// Rule: Allow-Public-Web | Hit Count: 48,210,912 | Last Hit: 2 seconds ago (Active)`
  },
  {
    id: 10,
    question: "What is the danger of using 'ANY' in the Service/Port field of a firewall permit rule?",
    shortAnswer: "Specifying 'Service: ANY' permits all 65,535 TCP and UDP ports, allowing attackers to tunnel unauthorized protocols (SSH, RDP, BitTorrent, malware C2) through the open rule.",
    explanation: "A rule like `ALLOW 10.10.1.0/24 -> 172.16.1.10 ANY` was intended only for web browsing, but it inadvertently allows all ports. Attackers can connect to hidden management ports (SSH port 22, RDP port 3389) or database ports on that server.",
    hint: "Opening all 65,535 ports instead of specifying only the required business port.",
    level: "Basic",
    codeExample: `// Dangerous Overly Broad Rule vs Hardened Rule:
// BAD : ALLOW 10.10.1.0/24 -> 172.16.1.10 Port: ANY (65,535 ports open!)
// GOOD: ALLOW 10.10.1.0/24 -> 172.16.1.10 Port: 443 Proto: TCP (Strictly HTTPS only)`
  },
  {
    id: 11,
    question: "What is a 'Temporary / Emergency Firewall Rule' and what automated governance control must be attached to it?",
    shortAnswer: "A rule created to facilitate urgent troubleshooting or migration; it MUST be configured with an automated expiration date/timer (e.g. 72 hours) so the firewall automatically disables it.",
    explanation: "Administrators frequently create temporary permit rules during an emergency outage and forget to remove them, leaving permanent security holes. Modern NGFWs allow setting automated expiration timestamps: the rule deactivates automatically when the timer expires.",
    hint: "A temporary rule with an automated expiration timer so it deletes itself after 3 days.",
    level: "Moderate",
    codeExample: `// Palo Alto Rule Expiration Schedule:
// set security rules Allow-Temp-Troubleshoot schedule "Expires-2026-08-26-23:59"`
  },
  {
    id: 12,
    question: "What is 'Rule Recertification' under ISO/IEC 27001 and PCI-DSS compliance standards?",
    shortAnswer: "A mandatory periodic review (every 6 months) where business owners and security teams must formally re-justify and re-approve every active firewall rule, retiring uncertified rules.",
    explanation: "PCI-DSS Requirement 1.1.7 and ISO 27001 mandate semi-annual rule reviews. The firewall administrator sends rule lists to application owners; if the application owner cannot provide a valid business justification, the rule is decommissioned.",
    hint: "Formally reviewing and re-approving every firewall rule every 6 months.",
    level: "Moderate",
    codeExample: `// Rule Recertification Metadata:
const ruleMetadata = {
  ruleId: 104,
  businessOwner: "rahul.finance@bank.gov.in",
  lastCertifiedDate: "2026-06-15",
  nextRecertificationDue: "2026-12-15",
  justification: "Core banking clearinghouse payment API"
};`
  },
  {
    id: 13,
    question: "Why should firewall rules ALWAYS include descriptive names, ticket references, and creation timestamps in their metadata comments?",
    shortAnswer: "To maintain an immutable audit trail explaining who requested the rule, which change-management ticket authorized it, and what business service depends on it.",
    explanation: "Without comments, future administrators cannot tell whether Rule 89 is a critical banking dependency or an obsolete test rule, leading to fear of deleting old rules. Including ticket IDs (e.g. `TICK-2026-9921`) ensures total operational accountability.",
    hint: "Documenting ticket numbers, creator names, and business purposes for every rule.",
    level: "Basic",
    codeExample: `// Well-Documented Firewall Rule:
// Rule: Allow-UPI-Switch
// Description: "Approved by Change Ticket #CHG-2026-8812; Admin: Sukanta Hui; Owner: Mamata"
// Action: ALLOW Source: 10.10.1.50 -> Dest: 203.0.113.10 Port: 443`
  },
  {
    id: 14,
    question: "What is 'Automated Firewall Static Code Analysis' (e.g. Nipper / FireMon / AlgoSec)?",
    shortAnswer: "Software tools that parse firewall configuration files mathematically, identifying shadowed rules, redundant ACLs, insecure Any/Any rules, and compliance violations without sending network traffic.",
    explanation: "Static analyzers represent firewall rules as multi-dimensional geometric spaces of IP ranges and port sets. The tool computes intersections and enclosures, automatically generating an audit report highlighting shadowed and insecure rules in seconds.",
    hint: "Software that automatically scans firewall configs to find errors and shadowed rules.",
    level: "Expert",
    codeExample: `// Algorithmic Geometric Rule Intersection:
// IF RuleA.IPRange SUBSET_OF RuleB.IPRange AND RuleA.Ports SUBSET_OF RuleB.Ports:
//     Flag Anomaly: RuleA is enclosed by RuleB!`
  },
  {
    id: 15,
    question: "How does the 'Default-Deny' philosophy apply to Egress (Outbound) traffic leaving an enterprise network?",
    shortAnswer: "By blocking all outbound traffic by default and permitting only specific business applications (e.g. HTTPS to approved SaaS via proxy, DNS to internal resolvers), blocking unauthorized outbound ports.",
    explanation: "Many organizations enforce Default-Deny on ingress but leave egress wide open (`ALLOW Internal -> ANY:ANY`). If malware infects an internal PC, open egress allows the malware to connect to external C2 servers on port 4444 or exfiltrate data. Egress Default-Deny halts the malware.",
    hint: "Blocking all outbound connections by default stops malware from calling home.",
    level: "Basic",
    codeExample: `// Egress Default-Deny Policy:
// ALLOW: Internal_Workstations -> DMZ_Proxy (Port 8080)
// ALLOW: Internal_Workstations -> Internal_DNS (Port 53)
// DROP : Internal_Workstations -> ANY Internet IP (Default-Deny Egress!)`
  },
  {
    id: 16,
    question: "What is 'Rule Base Segmentation' by Security Zones (Zone-to-Zone Policy Tables)?",
    shortAnswer: "Organizing firewall rules into distinct directional matrices (e.g. WAN-to-DMZ, DMZ-to-LAN, LAN-to-WAN) rather than maintaining a single monolithic rule table for the entire appliance.",
    explanation: "Zone-based policy tables (used in Palo Alto and Cisco ZFW) break a 2,000-rule monolithic list into manageable 50-rule tables per zone pair, eliminating accidental cross-zone rule shadowing and making audits simpler.",
    hint: "Organizing rules into separate tables based on source and destination zones.",
    level: "Moderate",
    codeExample: `// Zone-Based Policy Separation:
// [WAN -> DMZ Policy Table]  : 12 Rules (Public Web/DNS)
// [DMZ -> LAN Policy Table]  : 4 Rules (Database Pinholes only)
// [LAN -> WAN Policy Table]  : 8 Rules (Egress Proxy Whitelists)`
  },
  {
    id: 17,
    question: "Why should an enterprise firewall rule base NEVER permit inbound SSH (Port 22) or RDP (Port 3389) directly from `0.0.0.0/0` (ANY)?",
    shortAnswer: "Exposing administrative ports to the public Internet invites continuous automated brute-force attacks and exposes the network to remote management zero-day vulnerabilities.",
    explanation: "Administrative ports must be restricted exclusively to dedicated VPN tunnels with Multi-Factor Authentication (MFA), private source IP whitelists, or secure Bastion Jump Hosts.",
    hint: "Never open SSH or RDP to the entire world; require VPN and MFA.",
    level: "Basic",
    codeExample: `// Dangerous Rule vs Secure Policy:
// DANGEROUS: ALLOW 0.0.0.0/0 -> 10.10.1.5:22 (SSH Open to entire world!)
// SECURE   : ALLOW Admin_VPN_Subnet (10.10.99.0/24) -> 172.16.1.99:22 (Bastion Only + MFA)`
  },
  {
    id: 18,
    question: "What is 'Rule Generalization Risk' in firewall maintenance?",
    shortAnswer: "When an administrator broadens an existing rule to solve a connectivity problem (e.g. changing Destination IP from a single `/32` server to an entire `/16` subnet), inadvertently granting excessive network permissions.",
    explanation: "During troubleshooting, an administrator might change `172.16.1.10/32` to `172.16.0.0/16` to make an app work quickly. This grants access to hundreds of unintended servers, creating a major security hole.",
    hint: "Making a rule too broad just to quickly fix a connection problem.",
    level: "Moderate",
    codeExample: `// Rule Generalization Flaw:
// Original: ALLOW 10.10.1.50 -> 172.16.1.10/32:443 (Single Host)
// General : ALLOW 10.10.1.50 -> 172.16.0.0/16:443 (65,536 Hosts Exposed!)`
  },
  {
    id: 19,
    question: "How does the 'Principle of Least Privilege' (PoLP) dictate firewall rule creation?",
    shortAnswer: "Every rule must grant ONLY the exact minimum necessary source IP, destination IP, protocol, port, and application required for business function, and nothing more.",
    explanation: "Under PoLP, if a web server only needs to query a database on TCP port 5432, the rule must allow ONLY port 5432 from that single web server IP. It must not allow other ports (e.g. SSH, ICMP, SMB) or other IP addresses.",
    hint: "Granting only the absolute minimum permissions needed to do the job.",
    level: "Basic",
    codeExample: `// Principle of Least Privilege Rule:
// ALLOW Source: 172.16.1.10/32 -> Dest: 10.10.4.50/32 Proto: TCP Port: 5432 ONLY`
  },
  {
    id: 20,
    question: "What is 'Automated Policy Change Verification' in continuous integration / continuous deployment (CI/CD) network pipelines?",
    shortAnswer: "Automated pre-deployment testing where proposed firewall rule changes are validated by static analyzers in a pipeline to ensure they do not introduce shadowing, redundancy, or compliance violations before being pushed to production.",
    explanation: "In modern NetDevOps, firewall configurations are stored as code (Terraform/Ansible). When an engineer submits a pull request with new rules, the CI/CD pipeline runs automated linters to verify rule hygiene and security compliance before applying changes.",
    hint: "Testing firewall rule changes automatically in code pipelines before applying them.",
    level: "Expert",
    codeExample: `// CI/CD Pipeline Rule Validation:
// git push -> [Run Rule Linter] -> Check Shadowing (0 Found) -> Check Any/Any (0 Found) -> [Apply to Firewall]`
  },
  {
    id: 21,
    question: "What is 'Overlapping Port Range Vulnerability' in firewall rule definitions?",
    shortAnswer: "Specifying broad port ranges (e.g. `1024-65535`) instead of exact service ports, accidentally exposing unmonitored high-port services (RPC, RMI, dynamic databases).",
    explanation: "Legacy applications sometimes request wide port ranges. Permitting ports `1024-65535` allows attackers to bind malicious shells or backdoor listeners to high ports that pass right through the firewall.",
    hint: "Opening thousands of high ports instead of specific individual service ports.",
    level: "Moderate",
    codeExample: `// Port Range Flaw:
// BAD: ALLOW ANY -> 10.10.4.50 Ports: 1024-65535 (Exposes 64,512 high ports!)`
  },
  {
    id: 22,
    question: "How does an enterprise prevent 'Shadow IT / Unauthorized Rule Changes' on production firewalls?",
    shortAnswer: "Enforcing Role-Based Access Control (RBAC), multi-party approval workflows (Four-Eyes Principle), and real-time SIEM alerts whenever a configuration modification occurs outside approved maintenance windows.",
    explanation: "No single engineer should be able to modify firewall rules unilaterally. Changes must be submitted via change management tickets (ServiceNow), approved by a security manager, and logged with cryptographic audit trails.",
    hint: "Requiring two-person approval and change tickets before any firewall rule can be edited.",
    level: "Basic",
    codeExample: `// Four-Eyes Principle:
// Engineer Mamata drafts rule change -> Security Lead Sukanta Hui approves -> Automated push to firewall`
  },
  {
    id: 23,
    question: "What is 'Egress Port Whitelisting' for enterprise IoT and SCADA operational technology (OT) subnets?",
    shortAnswer: "Strictly locking down IoT subnets so that smart devices (CCTV cameras, medical monitors, industrial sensors) can communicate ONLY with their local on-premise controller, with zero outbound Internet access.",
    explanation: "IoT devices are notoriously vulnerable to botnet recruitment (e.g. Mirai). By enforcing Default-Deny on egress, an infected camera cannot connect to external C2 servers or participate in DDoS attacks.",
    hint: "Blocking smart cameras and sensors from talking to the Internet entirely.",
    level: "Basic",
    codeExample: `// IoT Subnet Egress Lockdown:
// ALLOW: IoT_CCTV_VLAN (10.10.80.0/24) -> NVR_Server (10.10.80.10:554)
// DROP : IoT_CCTV_VLAN -> ANY (Zero Internet access permitted!)`
  },
  {
    id: 24,
    question: "What is 'Rule Complexity Score / Rule-Base Technical Debt' in enterprise security metrics?",
    shortAnswer: "A quantitative metric assessing total rules, average criteria per rule, number of shadowed/redundant anomalies, and percentage of zero-hit rules to measure firewall manageability and risk.",
    explanation: "A firewall with 5,000 rules, 20% zero-hit rules, and 50 shadowed rules has high technical debt and a high probability of human misconfiguration error during incident response. Pruning rules reduces the complexity score.",
    hint: "Measuring how bloated and error-prone a firewall rule set has become.",
    level: "Expert",
    codeExample: `// Technical Debt Score Formula:
// Score = (Total_Rules * 0.1) + (Shadowed_Rules * 5) + (Zero_Hit_Rules * 2) + (Any_Any_Rules * 10)`
  },
  {
    id: 25,
    question: "What is the CERT-In mandate regarding Firewall Configuration and Rule-Base Modification Auditing?",
    shortAnswer: "All firewall rule additions, modifications, deletions, and administrative logins must be logged with NPL India NTP timestamps and retained in tamper-proof SIEM archives for 180 days.",
    explanation: "Under the CERT-In 2022 cybersecurity directives, maintaining comprehensive audit logs of all perimeter configuration changes is mandatory. If an unauthorized rule was added during a breach, the audit log establishes forensic liability.",
    hint: "180-day secure retention of all firewall rule edits synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Firewall Change Audit Log:
const fwChangeLog = {
  timestamp: "2026-08-23T10:45:12.890Z",
  adminUser: "sukanta.hui",
  action: "RULE_ADDED",
  ruleName: "Allow-UPI-Pinhole",
  ticketRef: "CHG-2026-9921",
  deviceIp: "172.16.1.1"
};`
  },
  {
    id: 26,
    question: "What is 'Source IP Spoofing Prevention' at the top of an enterprise firewall rule base?",
    shortAnswer: "Placing explicit drop rules at Lines 1–10 to discard packets arriving on the public WAN interface with private RFC 1918 source IPs (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8).",
    explanation: "External packets on the public Internet should never have private or loopback source IPs. Placing Bogon drop rules at the very top of the rule base discards spoofed packets before they consume firewall state table resources.",
    hint: "Dropping spoofed private and loopback IPs at the top of the rule list.",
    level: "Basic",
    codeExample: `// Bogon Drop Rules at Top of Rule Base:
// Line 1: DROP Source: 10.0.0.0/8      -> Ingress Interface: WAN
// Line 2: DROP Source: 172.16.0.0/12   -> Ingress Interface: WAN
// Line 3: DROP Source: 192.168.0.0/16  -> Ingress Interface: WAN
// Line 4: DROP Source: 127.0.0.0/8     -> Ingress Interface: WAN`
  },
  {
    id: 27,
    question: "What is 'Geo-IP / ASN-Based Rule Filtering' at the perimeter firewall?",
    shortAnswer: "Creating high-level drop rules based on geographic country codes or Autonomous System Numbers (ASNs) to block traffic from regions where the organization has no business operations.",
    explanation: "A regional municipal bank in Barrackpore or Ichapur has customers exclusively in India. Dropping inbound traffic originating from unapproved foreign CIDR blocks at the top of the rule base eliminates over 90% of automated global botnet probes.",
    hint: "Dropping traffic from foreign countries where your organization has no users.",
    level: "Basic",
    codeExample: `// Geo-IP Firewall Rule:
// Line 5: DROP Source: Country_NOT_IN(['IN']) -> Dest: ANY Port: ANY`
  },
  {
    id: 28,
    question: "How does the 'Four-Eyes Principle' protect enterprise firewall rule hygiene during emergency changes?",
    shortAnswer: "No single administrator can modify or activate a firewall rule alone; every change must be reviewed and approved by a second qualified security engineer before committing to production.",
    explanation: "During stressful outage situations, a lone administrator might create an overly broad `ALLOW ANY ANY` rule. The Four-Eyes Principle requires a second engineer to review the syntax, ensuring emergency changes remain strictly scoped.",
    hint: "Requiring two engineers to review and approve every rule change.",
    level: "Moderate",
    codeExample: `// Four-Eyes Workflow:
// Step 1: Admin Mahima submits rule change -> Step 2: Security Lead Sukanta Hui reviews & approves -> Step 3: Rule deployed`
  },
  {
    id: 29,
    question: "What is 'Micro-Rule Sprawl' and how do Network Object Groups solve it?",
    shortAnswer: "Micro-rule sprawl occurs when administrators create hundreds of individual rules for single IP addresses; Network Object Groups consolidate hundreds of IPs into a single logical group object referenced by a single rule.",
    explanation: "Instead of writing 50 separate rules allowing 50 web servers to access a database, administrators create a single object group `Web_Server_Group = [172.16.1.10, 172.16.1.11, ...]`, reducing 50 rules to 1 clean rule.",
    hint: "Grouping multiple IP addresses into a single object to reduce rule table bloat.",
    level: "Moderate",
    codeExample: `// Object Group Consolidation:
// object-group network DMZ_Web_Servers
//   host 172.16.1.10
//   host 172.16.1.11
// Rule: ALLOW DMZ_Web_Servers -> DB_Server:5432 (1 Rule instead of 50!)`
  },
  {
    id: 30,
    question: "Synthesize the core golden rules of enterprise Firewall Rule-Base Design.",
    shortAnswer: "1. Enforce Default-Deny with an Implicit Deny All at the bottom; 2. Place specific drop rules at the top and order permits by traffic hit frequency; 3. Eliminate Shadowing, Redundancy, and Orphaned rules; 4. Document all rules with change tickets; 5. Conduct quarterly recertifications.",
    explanation: "A well-architected rule base is the foundation of network perimeter integrity. By following strict whitelisting, avoiding broad permissions, eliminating anomalies, and conducting regular audits, organizations maintain high-performance, impenetrable firewall defenses.",
    hint: "Default-Deny + Frequency Ordering + No Shadowing + Documented Tickets + Quarterly Audits = Golden Rule Base.",
    level: "Moderate",
    codeExample: `// The Master Rule-Base Formula:
// Golden Rule Base = [Bogon Drops at Top] + [Traffic Frequency Order] + [Zero Shadowing] + [Quarterly Pruning] + [Implicit Deny at Bottom]`
  }
];

export default questions;
