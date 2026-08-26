const questions = [
  {
    id: 1,
    question: "What is the strategic objective of integrating standalone IDS/IPS sensors and Honeypots into a centralized SIEM / SOAR platform?",
    shortAnswer: "To eliminate data silos, normalize diverse logs into a common schema, cross-correlate disparate security events, eliminate alert fatigue, and execute automated response playbooks in under 1 second.",
    explanation: "Isolated sensors force analysts to check 10 different dashboards. A SIEM aggregates NIDS, HIDS, and Honeypot telemetry into a unified pane of glass, linking external port scans with internal honeypot triggers into consolidated incidents.",
    hint: "Bringing all security tools together into one master dashboard to correlate attacks and respond automatically.",
    level: "Basic",
    codeExample: `// Unified Telemetry Architecture:
// [Suricata NIDS] + [Wazuh HIDS] + [Canarytokens] ──[Kafka]──> SIEM Normalization ──> SOAR Automated Response!`
  },
  {
    id: 2,
    question: "What is 'Multi-Source Alert Correlation' in modern SIEM analytics engines?",
    shortAnswer: "Linking disparate security signals from multiple independent sensors (e.g. NIDS alert + Honeypot Canarytoken trigger + Endpoint EDR memory injection) sharing the same source IP, destination IP, or user account across a time window.",
    explanation: "A single NIDS alert might be a false alarm. But when that exact same IP triggers an internal Canarytoken file read 2 seconds later, the correlation engine links them into a 100% confirmed critical incident ticket.",
    hint: "Connecting the dots between multiple alarms on different tools to prove an attack is real.",
    level: "Basic",
    codeExample: `// SIEM Multi-Source Correlation Logic:
// IF (NIDS.Event == "SQLi_Probe" AND Deception.Event == "Honeyfile_Opened" AND TimeDelta < 5m):
//     Severity = "CRITICAL_INCIDENT_P1" ➔ Trigger Immediate SOAR Host Quarantine!`
  },
  {
    id: 3,
    question: "What is 'SOAR' (Security Orchestration, Automation, and Response) and what is an automated 'Playbook'?",
    shortAnswer: "A software platform that executes automated, pre-scripted multi-system workflows (playbooks)—such as blocking an IP on firewalls, isolating an endpoint in EDR, and disabling Active Directory accounts—without waiting for human manual clicks.",
    explanation: "Human analysts take 15–30 minutes to investigate and manually click buttons across multiple tools. A SOAR playbook executes the entire investigative and containment workflow in less than 500 milliseconds.",
    hint: "Automated software robots that execute security containment actions across all tools in under a second.",
    level: "Basic",
    codeExample: `// SOAR Playbook Execution:
// On P1 Alert ➔ [Firewall API: Block IP] + [EDR API: Isolate Host] + [AD API: Revoke Session] (Time: 380ms)`
  },
  {
    id: 4,
    question: "Why do Honeypot and Deception alerts enable 'Zero-Touch Autonomous SOAR Containment' while traditional IDS alerts often require human approval?",
    shortAnswer: "Because Honeypot alerts have a 100% True-Positive confidence rate (zero false alarms due to the Golden Honeypot Axiom), eliminating the risk of accidental business disruption when automated playbooks isolate an asset.",
    explanation: "If an IDS has a 10% false alarm rate, automated host isolation could accidentally take down a core production database. Because honeypots have zero authorized users, any interaction is guaranteed to be an attack, making automated blocking 100% safe.",
    hint: "Because honeypots never have false alarms, you can safely let automated robots block the attacker immediately.",
    level: "Moderate",
    codeExample: `// Autonomous Zero-Touch Decision:
// IDS Alert (90% Confidence)       ➔ Requires Tier-1 Analyst Manual Review (Prevents Outages)
// Honeypot Alert (100% Confidence) ➔ Triggers Immediate Automated SOAR Quarantine (Zero-Touch)`
  },
  {
    id: 5,
    question: "What is 'Elastic Common Schema (ECS)' / 'OCSF (Open Cybersecurity Schema Framework)' in SIEM log normalization?",
    shortAnswer: "Standardized data schemas that map diverse vendor log fields (e.g. `src_ip`, `sourceAddress`, `s_ip`, `c-ip`) into a single unified JSON field name (`source.ip`), allowing correlation rules to work universally.",
    explanation: "Without schema normalization, analysts must write separate correlation rules for every vendor (Snort, Suricata, Palo Alto, Cisco). Normalizing to ECS allows one single rule to inspect traffic across all firewalls and sensors.",
    hint: "A universal dictionary that translates different vendor log names into one standard format.",
    level: "Moderate",
    codeExample: `// Field Normalization to ECS:
// Snort Log: {"srcip": "1.2.3.4"}    ➔ Normalized: {"source.ip": "1.2.3.4"}
// CheckPoint: {"src": "1.2.3.4"}     ➔ Normalized: {"source.ip": "1.2.3.4"}`
  },
  {
    id: 6,
    question: "What is the role of 'Apache Kafka / Vector / Logstash' in high-volume SOC ingestion pipelines?",
    shortAnswer: "Serving as high-throughput, distributed message queuing buffers that ingest millions of EPS (events per second) from thousands of sensors without dropping logs during sudden traffic bursts or SIEM database maintenance.",
    explanation: "If an enterprise receives 50,000 events/second during a DDoS attack, writing directly to a database can crash Elasticsearch. Kafka buffers the event stream reliably, feeding workers at a sustainable ingestion rate.",
    hint: "A high-speed shock absorber that holds millions of log messages so the database does not crash.",
    level: "Moderate",
    codeExample: `// Ingestion Pipeline Flow:
// 100x Suricata Sensors ──[EVE JSON]──> Apache Kafka Buffer ──[Logstash Filter]──> Elasticsearch SIEM Cluster`
  },
  {
    id: 7,
    question: "What is the CERT-In statutory mandate regarding 'Mandatory 6-Hour Incident Reporting'?",
    shortAnswer: "Any organization operating in India that discovers a confirmed cybersecurity incident (e.g., ransomware, unauthorized data exfiltration, system compromise) must formally report the incident to CERT-In within 6 hours of identification.",
    explanation: "Issued under Section 70B of the Information Technology Act, this directive enforces rapid national threat sharing, allowing CERT-In to warn other critical sectors and coordinate national defense.",
    hint: "You must report any confirmed cyber breach to CERT-In within 6 hours of discovering it.",
    level: "Basic",
    codeExample: `// Statutory Compliance Clock:
// Incident Confirmed: 12:00 PM ➔ Formal CERT-In Incident Form Submitted: Before 6:00 PM (Statutory Deadline)`
  },
  {
    id: 8,
    question: "What is the CERT-In mandate regarding '180-Day Immutable Log Retention' and 'NPL India NTP Clock Synchronization'?",
    shortAnswer: "All organizations must retain complete, immutable SIEM logs, firewall events, and DNS records within Indian jurisdiction for 180 days, and all system clocks must be synchronized with the National Physical Laboratory (NPL) India NTP servers.",
    explanation: "Accurate NTP synchronization ensures that timestamps across multiple servers match to the millisecond. This ensures that forensic timelines are legally indisputable in judicial proceedings under the Indian Evidence Act.",
    hint: "Keep all security logs for 180 days, and sync all computer clocks to India's official national time.",
    level: "Basic",
    codeExample: `// Linux NTP Configuration for CERT-In Compliance:
// server time.nplindia.org iburst
// server ntp.nict.go.jp iburst`
  },
  {
    id: 9,
    question: "What is 'Tiered SOC Architecture' (Tier 1 vs Tier 2 vs Tier 3 vs Threat Hunter) in incident handling?",
    shortAnswer: "Tier 1: Triage and automated playbook verification; Tier 2: Deep technical incident response and forensic analysis; Tier 3: Advanced malware reverse engineering; Threat Hunter: Proactively hunting stealthy adversaries without waiting for alerts.",
    explanation: "A tiered structure prevents analyst burnout. Junior analysts handle high-volume triage, while senior engineers conduct deep memory forensics on verified breaches, and threat hunters search for hidden APTs.",
    hint: "Tier 1 triages alarms, Tier 2 investigates breaches, Tier 3 analyzes viruses, and Hunters hunt hidden attackers.",
    level: "Basic",
    codeExample: `// SOC Escalation Workflow:
// 10,000 Alerts ➔ Tier 1 (Automated SOAR Triage) ➔ 15 Incidents ➔ Tier 2 (Forensics) ➔ 1 Zero-Day ➔ Tier 3 (Reverse Eng)`
  },
  {
    id: 10,
    question: "What is 'Alert De-duplication and Aggregation' in SIEM correlation?",
    shortAnswer: "Collapsing hundreds of individual identical alerts occurring within a short time window into a single consolidated security ticket, preventing ticket queue overflow.",
    explanation: "If a port scanner probes 1,000 ports on a server, Snort generates 1,000 raw alert rows. The SIEM de-duplication rule groups them into a single incident: 'Port Scan from 198.51.100.22 (1,000 occurrences)'.",
    hint: "Combining 1,000 identical alarm pings into one single incident report for the analyst.",
    level: "Basic",
    codeExample: `// De-duplication Rule:
// GROUP BY source.ip, destination.ip, alert.signature WITHIN 5 MINUTES ➔ Increment event_count`
  },
  {
    id: 11,
    question: "How does 'Threat Intelligence Platform (TIP) Integration' (MISP / OpenCTI) enrich SIEM alerts in real time?",
    shortAnswer: "By automatically cross-referencing incoming source IPs, domains, and file hashes against global threat feeds, instantly appending reputation scores, adversary actor names, and historical attack history to the alert.",
    explanation: "When an IDS flags an alert for an unknown IP, the TIP automatically enriches the ticket: 'Source IP 198.51.100.45 is a confirmed Cobalt Strike C2 node affiliated with APT29 (Confidence: 98%).'",
    hint: "Automatically looking up hacker IP addresses in a global criminal database to see who they are.",
    level: "Moderate",
    codeExample: `// Threat Intel Enrichment:
// On Alert Ingest ➔ Query MISP / OpenCTI ➔ Append: { "threat_actor": "APT29", "ioc_score": 98 }`
  },
  {
    id: 12,
    question: "What is 'Dynamic Firewall Blocklist Automation' triggered by high-confidence deception alerts?",
    shortAnswer: "When an external attacker probes a public honeypot or canarytoken, the SOAR engine automatically pushes the attacker's IP to an API-managed dynamic address group (DAG) on perimeter firewalls within seconds.",
    explanation: "Rather than waiting for a human to log into the firewall, the SOAR playbook executes `curl -X POST https://firewall/api/blocklist` to block the attacker across all enterprise gateways in under 1 second.",
    hint: "Automatically telling perimeter firewalls to block a hacker's IP address the instant they touch a trap.",
    level: "Moderate",
    codeExample: `// Palo Alto Dynamic Address Group (DAG) API:
// POST /api/?type=user-id&action=set&ip=198.51.100.88&tag=Blacklist_Deception_Tripwire`
  },
  {
    id: 13,
    question: "What is 'Mean Time to Detect' (MTTD) and 'Mean Time to Respond' (MTTR) in SOC metrics?",
    shortAnswer: "MTTD is the average time elapsed from when an adversary breaches the network to when defenders discover the intrusion; MTTR is the average time taken from detection to complete threat containment and eradication.",
    explanation: "Traditional enterprise MTTD is 200+ days. By deploying high-fidelity deception and integrated SIEM/SOAR pipelines, modern SOCs reduce MTTD to seconds and MTTR to under 5 minutes.",
    hint: "MTTD = How fast you spot the break-in; MTTR = How fast you kick the hacker out.",
    level: "Basic",
    codeExample: `// Elite SOC Performance Benchmark:
// Target MTTD : < 60 Seconds (Driven by Canarytokens & Correlated NIDS)
// Target MTTR : < 5 Minutes (Driven by Automated SOAR Playbooks)`
  },
  {
    id: 14,
    question: "What is 'Behavioral Anomaly Scoring' in User and Entity Behavior Analytics (UEBA)?",
    shortAnswer: "Calculating a rolling mathematical risk score (0 to 100) for every user account and server based on statistical deviations (e.g. midnight logins, unusual data volumes, novel geolocations).",
    explanation: "A single unusual event might not trigger an alarm. UEBA aggregates multiple minor anomalies over 24 hours: when an employee's cumulative risk score crosses 85, an escalated investigation is launched.",
    hint: "Assigning a credit-score-style risk rating to users based on weird computer activity.",
    level: "Moderate",
    codeExample: `// Cumulative Risk Score:
// Risk = (+25 Midnight Login) + (+30 10GB Data Exfil) + (+35 Canarytoken Hit) = 90 (CRITICAL RISK!)`
  },
  {
    id: 15,
    question: "What is 'Security Data Lake / Cold Storage Tiering' for 180-day compliance cost optimization?",
    shortAnswer: "Storing hot, active alerts in fast SSD NVMe Elasticsearch nodes for 30 days of real-time search, and moving older 31–180 day raw logs to low-cost object storage (AWS S3 Glacier / MinIO) to minimize hardware expenses.",
    explanation: "Storing petabytes of raw pcaps on high-speed SSDs is cost-prohibitive. Automated index lifecycle management (ILM) migrates older logs to compressed cold storage while maintaining full 180-day searchability.",
    hint: "Keeping recent logs on fast drives and moving older logs to cheap compressed cloud storage.",
    level: "Moderate",
    codeExample: `// Elasticsearch Index Lifecycle Management (ILM):
// Hot Phase  : Days 1-30  (Fast NVMe SSD for real-time triage)
// Cold Phase : Days 31-180 (Compressed S3 Storage for CERT-In Audit Compliance)`
  },
  {
    id: 16,
    question: "What is 'Endpoint Detection and Response (EDR)' integration with Network IDS and Honeypots?",
    shortAnswer: "Correlating network packet alerts with host-level process trees (e.g. matching an incoming Suricata CVE-2021-44228 alert with an EDR alert showing `java.exe` spawning `/bin/bash`).",
    explanation: "Network sensors see the packet on the wire; EDR agents see what happened on the server CPU. Correlating both confirms whether an exploit attempt actually succeeded in executing code on the host.",
    hint: "Matching network packet warnings with what programs actually opened inside the computer.",
    level: "Moderate",
    codeExample: `// NIDS + EDR Process Correlation:
// NIDS Alert : Inbound Log4Shell Exploit on Port 443
// EDR Event  : java.exe spawned powershell.exe -enc ... ➔ CONFIRMED SUCCESSFUL EXPLOITATION!`
  },
  {
    id: 17,
    question: "What is 'Dynamic Asset Discovery and CMDB Synchronization' in SIEM operations?",
    shortAnswer: "Automatically discovering newly connected devices on the network via DHCP/ARP logs and cross-referencing them against the Configuration Management Database (CMDB) to identify unmanaged shadow IT assets.",
    explanation: "If an employee plugs an unauthorized personal laptop into an office switch, the SIEM detects the new MAC address, verifies that it is absent from the CMDB, and alerts the SOC to isolate the rogue device.",
    hint: "Automatically scanning for unauthorized laptops and rogue devices plugged into company switches.",
    level: "Basic",
    codeExample: `// Rogue Device Detection:
// IF DHCP_Lease(New_MAC) AND NOT In_CMDB(New_MAC):
//     Action: Flag Rogue Asset ➔ Trigger 802.1X Port Quarantine`
  },
  {
    id: 18,
    question: "What is 'SOC Shift Handover and Case Management' in 24/7 security monitoring?",
    shortAnswer: "The structured operational process where outgoing Tier-1/Tier-2 analysts brief the incoming shift on active ongoing investigations, uncontained incidents, and high-priority threat advisories via a ticketing system (TheHive / Jira / ServiceNow).",
    explanation: "Cyber attacks do not stop at shift changes. Structured handover notes ensure that an active investigation into a suspected lateral movement campaign continues seamlessly without investigative gaps.",
    hint: "Passing ongoing incident notes smoothly between day-shift and night-shift security guards.",
    level: "Basic",
    codeExample: `// SOC Case Management Handover:
// TheHive Case #1042: Active APT Investigation | State: In-Progress | Next Action: Memory Forensics on Host 10.10.4.15`
  },
  {
    id: 19,
    question: "What is 'Sigma Rules' in vendor-agnostic SIEM threat detection?",
    shortAnswer: "A generic, open-standard YAML signature format for describing log detection logic; Sigma rules can be automatically converted into Elasticsearch queries, Splunk SPL, Microsoft KQL, or QRadar AQL.",
    explanation: "Instead of rewriting detection rules for every SIEM vendor, security researchers write one Sigma rule. The `sigmac` compiler converts it into native queries for whatever SIEM platform the enterprise operates.",
    hint: "A universal rule format that converts into search queries for Splunk, Elastic, or Microsoft Sentinel.",
    level: "Moderate",
    codeExample: `// Sigma Detection Rule (YAML):
// title: Unauthorized Memory Access Detection
// logsource: { product: windows, service: security }
// detection: { selection: { EventID: 4688, CommandLine|contains: 'lsass_memory_probe' } }`
  },
  {
    id: 20,
    question: "How does 'Automated Deception Feedback Loop' update SIEM correlation rules dynamically?",
    shortAnswer: "When an attacker touches a honeypot or canarytoken, the deception engine extracts the adversary's IP, user-agent, and tool hash, dynamically feeding those indicators into SIEM correlation rules across all enterprise logs.",
    explanation: "If an attacker scans an internal honeypot, the SIEM immediately retroactively searches all 180-day firewall logs to see if that same IP had probed other corporate subnets in previous weeks.",
    hint: "Using a trap hit to search through months of past logs to see what else that hacker touched.",
    level: "Expert",
    codeExample: `// Retroactive Threat Search:
// Honeypot Hit from IP 198.51.100.88 ➔ SIEM searches 180-day index: "WHERE source.ip = '198.51.100.88'"`
  },
  {
    id: 21,
    question: "What is 'Immutable WORM (Write Once, Read Many) Storage' for legal forensic compliance?",
    shortAnswer: "Configuring storage volumes with cryptographic locks and S3 Object Lock compliance retention, ensuring that even a compromised domain administrator or root user cannot delete or tamper with historical audit logs.",
    explanation: "If an attacker compromises domain credentials, their first action is running `wevtutil cl Security` to delete event logs. Immutable WORM storage guarantees that forwarded SIEM logs cannot be deleted or altered.",
    hint: "A digital vault where security logs can be written once but cannot be deleted or changed by anyone.",
    level: "Expert",
    codeExample: `// AWS S3 Object Lock Compliance Mode:
// s3:PutObjectRetention --retention-mode COMPLIANCE --retain-until-date "2027-02-23" (Immutable)`
  },
  {
    id: 22,
    question: "What is 'Attack Path Analysis' (e.g., BloodHound / Neo4j Graph) in modern SOC operations?",
    shortAnswer: "Visualizing the exact structural graph relationships and Active Directory permissions an attacker could exploit to escalate privileges from a compromised workstation to Domain Admin.",
    explanation: "Graph analytics reveal hidden attack paths: Workstation A has local admin rights on Server B, which has a logged-in user who is a member of Domain Admins. SOCs remediate these paths proactively.",
    hint: "Drawing a visual map showing all the hidden stepping stones a hacker could use to reach master admin.",
    level: "Moderate",
    codeExample: `// Graph Relationship Path:
// Node(Workstation_1) ──[AdminTo]──> Node(Server_2) ──[HasSession]──> Node(Domain_Admin)`
  },
  {
    id: 23,
    question: "What is 'Automated Purple Teaming / Continuous Security Validation' in verifying SIEM pipelines?",
    shortAnswer: "Running scheduled automated adversary emulation scripts (using Atomic Red Team) to simulate real attacks across internal subnets, verifying that every simulated attack successfully generates a SIEM alert and triggers SOAR.",
    explanation: "Enterprises cannot assume their SIEM rules work. Automated validation executes 50 simulated attacks every Sunday; if an attack fails to generate a ticket, an engineering alert notifies the team of a broken rule.",
    hint: "Running automated test attacks every week to make sure the alarm system is still working properly.",
    level: "Moderate",
    codeExample: `// Automated Validation CI/CD:
// Run Atomic Test T1003 ➔ Query SIEM API ➔ ASSERT: Alert_Generated == True`
  },
  {
    id: 24,
    question: "What is 'Security Orchestration for Cloud Zero-Trust' (e.g. AWS IAM / Azure Conditional Access)?",
    shortAnswer: "Configuring SOAR playbooks to automatically revoke an employee's cloud session tokens, force step-up multi-factor authentication (MFA), and terminate active VPN tunnels the instant a deception tripwire fires.",
    explanation: "If a compromised credential is used on an internal honey-portal, the SOAR engine immediately calls the Okta or Azure AD API to invalidate all active session tokens, severing the attacker's cloud access in real time.",
    hint: "Instantly logging out a user from all cloud apps the second a trap is triggered.",
    level: "Moderate",
    codeExample: `// Azure AD Session Revocation API:
// POST https://graph.microsoft.com/v1.0/users/{user_id}/revokeSignInSessions`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding 'Root Cause Analysis (RCA)' and 'Corrective Action Reports'?",
    shortAnswer: "Following a confirmed security incident, organizations must conduct a formal forensic root-cause analysis, document vulnerabilities exploited, detail remediation actions taken, and submit a formal closure report to CERT-In.",
    explanation: "Statutory compliance requires proving that the underlying vulnerability has been remediated and that defensive controls (IDS rules, firewall policies, patch management) have been updated to prevent recurrence.",
    hint: "Writing a formal report for CERT-In explaining how the hacker broke in and how you fixed the bug.",
    level: "Basic",
    codeExample: `// Structured CERT-In RCA Submission:
const certInRcaReport = {
  incidentId: "INC-2026-WB-8812",
  rootCause: "Unpatched Apache Log4j vulnerability on civic tax portal",
  remediation: "Updated Log4j to 2.17.1, deployed Suricata SID 1000002 drop rule, whitelisted scanners",
  retentionPeriodDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'False Positive Feedback Tuning' in SOC Case Management?",
    shortAnswer: "The formal feedback process where Tier-1 analysts classify closed tickets as 'False Positive (Benign Admin Tool)', triggering automated tuning scripts that update SIEM whitelist filters and Snort suppression rules.",
    explanation: "Without a closed-loop feedback mechanism, analysts triage the same false alarm every day. Case management flags the noisy rule and schedules it for engineering refinement in the next sprint.",
    hint: "Marking resolved tickets as false alarms so engineers can update the filter and stop the noise.",
    level: "Basic",
    codeExample: `// False Positive Closed-Loop Action:
// Analyst Action: Close Ticket as FP ➔ Auto-Generates Snort 'suppress' rule for approved admin subnet.`
  },
  {
    id: 27,
    question: "What is 'SOAR Dead-Man Switch / Safety Circuit Breaker' in autonomous automated blocking?",
    shortAnswer: "A safety threshold that automatically pauses automated blocking playbooks if more than $N$ devices (e.g. > 10 hosts in 60s) are flagged for quarantine, preventing an attacker from tricking the SOAR into shutting down the entire datacenter.",
    explanation: "If an adversary spoofed the IP addresses of critical enterprise database servers during a port scan, naive automated blocking would shut down the entire company. A circuit breaker halts automation and calls a human engineer.",
    hint: "An emergency brake that stops the robot from isolating too many computers at once by mistake.",
    level: "Expert",
    codeExample: `// SOAR Circuit Breaker:
// IF Automated_Isolations_Count > 10 IN 60_Seconds:
//     PAUSE_AUTOMATION() ➔ Page On-Duty Lead Incident Commander Immediately!`
  },
  {
    id: 28,
    question: "What is 'Threat Hunting with Jupyter Notebooks / Python Pandas' in Tier-3 SOC operations?",
    shortAnswer: "Using interactive Python data science notebooks connected directly to the SIEM Elasticsearch cluster to run complex statistical aggregations, clustering, and outlier detection across months of historical flow logs.",
    explanation: "Tier-3 threat hunters use Python Pandas to calculate entropy distributions, find rare domain lookups, and identify long-term beaconing patterns that fall below standard static alert thresholds.",
    hint: "Using Python data science tools to hunt for hidden hacker footprints across millions of old logs.",
    level: "Expert",
    codeExample: `// Jupyter Threat Hunting Snippet:
// df = es.search(index="suricata-*", query={"range": {"timestamp": {"gte": "now-90d"}}})
// rare_c2_beacons = df.groupby('destination.ip').filter(lambda x: len(x) < 5)`
  },
  {
    id: 29,
    question: "How does 'Network Microsegmentation Telemetry' simplify SIEM correlation logic?",
    shortAnswer: "By enforcing zero-trust isolation between subnets, any packet that crosses a microsegmentation boundary without explicit permission is mathematically 100% malicious, simplifying correlation rules to simple binary alerts.",
    explanation: "In traditional flat networks, complex correlation is required to separate benign chatty traffic from attacks. With microsegmentation, legitimate traffic is strictly constrained; any unauthorized cross-VLAN probe is a confirmed breach.",
    hint: "Locking down internal subnets so any cross-network connection is guaranteed to be an attack.",
    level: "Moderate",
    codeExample: `// Microsegmentation Telemetry Rule:
// App_VLAN(10.10.1.0/24) -> DB_VLAN(10.10.2.0/24) on Port 22 (SSH) ➔ 100% P1 CRITICAL BREACH ALERT!`
  },
  {
    id: 30,
    question: "Synthesize the ultimate vision of the unified, cognitive SOC: Combining IDS/IPS, Honeypots, SIEM, and SOAR.",
    shortAnswer: "The unified SOC achieves cyber supremacy by integrating high-speed line-rate IDS/IPS inspection at the perimeter, zero-false-positive deception tripwires across internal subnets, centralized SIEM multi-source correlation, and sub-second SOAR automated containment—operating continuously in full compliance with CERT-In directives and the DPDP Act 2023.",
    explanation: "Security is an interconnected lifecycle. Network IDS catches known exploit bytes, Honeypots catch stealthy lateral movement, SIEM correlates the evidence into a single truth, and SOAR eliminates the threat in milliseconds—ensuring resilient enterprise defense against even the most sophisticated global cyber adversaries.",
    hint: "Combining perimeter scanners, internal trap minefields, smart SIEM brains, and automated robot responders for total defense.",
    level: "Moderate",
    codeExample: `// The Master Unified SOC Architecture:
// Next-Gen Autonomous Defense = [Suricata Multi-Threaded NIDS/IPS] + [Canarytoken Deception Grid] + [Elasticsearch Multi-Source SIEM] + [Sub-Second SOAR Playbooks] + [180-Day CERT-In / NPL India Compliance]`
  }
];

export default questions;
