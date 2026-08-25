const questions = [
  {
    id: 1,
    question: "What is a 'Honeynet' and how does it fundamentally differ from a standalone individual honeypot?",
    shortAnswer: "A Honeynet is an entire network architecture of multiple interconnected honeypots simulating a complete, realistic production enterprise (routers, Active Directory, databases, clients) monitored and contained behind a Honeywall gateway.",
    explanation: "A standalone honeypot is a single trap on an IP address. A Honeynet simulates an entire network environment, allowing security researchers and SOCs to study how adversaries move laterally across subnets.",
    hint: "A whole network of trap computers connected together to look like a complete company network.",
    level: "Basic",
    codeExample: `// Honeynet Topology:
// Internet ──> [Honeywall Security Gateway] ──┬──> Decoy AD Domain Controller (Windows Server)
//                                            ├──> Decoy Core Database (PostgreSQL)
//                                            └──> Decoy Client Workstations (Win 11)`
  },
  {
    id: 2,
    question: "What are the two core mandatory responsibilities of a 'Honeywall' security gateway?",
    shortAnswer: "1. Data Control (strictly enforcing outbound egress containment to prevent attackers from using the honeynet to attack other systems); 2. Data Capture (logging 100% of network traffic, keystrokes, and system calls invisibly).",
    explanation: "Data Control ensures the honeynet does not become a liability. Data Capture ensures that every action, command, and exploit payload deployed by the intruder is preserved for forensic analysis.",
    hint: "Data Control to trap the hacker and stop outbound attacks; Data Capture to record everything.",
    level: "Basic",
    codeExample: `// Honeywall Core Functions:
// Data Control : Drop outbound internal pivots (10.0.0.0/8) + Rate-limit internet access
// Data Capture : Full pcap capture + eBPF syscall recording + EVE JSON streaming`
  },
  {
    id: 3,
    question: "What are the primary operational differences between 'Production Honeypots' and 'Research Honeypots'?",
    shortAnswer: "Production Honeypots protect corporate networks by detecting internal intrusions and triggering immediate host quarantine; Research Honeypots study global hacker motives, capture zero-day malware, and map MITRE ATT&CK TTPs over extended multi-day engagements.",
    explanation: "Production honeypots prioritize risk reduction and fast incident response with zero false alarms. Research honeypots prioritize intelligence gathering, allowing threat actors to interact for days to discover novel hacking techniques.",
    hint: "Production honeypots stop company attacks immediately; Research honeypots study hackers for science.",
    level: "Basic",
    codeExample: `// Production vs Research Action:
// Production Breach: Intruder touches honeypot ➔ SOAR isolates compromised workstation in 500ms!
// Research Breach  : Intruder touches honeynet  ➔ Researchers observe attacker TTPs for 72 hours!`
  },
  {
    id: 4,
    question: "Why does the Honeywall operate as an invisible 'Layer 2 Bridge' instead of a traditional Layer 3 routed gateway?",
    shortAnswer: "To ensure the Honeywall has no IP or MAC address visible to network traceroutes or ARP probes, making it completely undetectable and invisible to the adversary inside the honeynet.",
    explanation: "If an attacker runs `traceroute` and sees an intermediate firewall IP, they realize they are in a monitored sandbox. A Layer 2 bridge forwards packets silently without decrementing the IP Time-to-Live (TTL) field.",
    hint: "A silent bridge that does not show up on traceroutes, so hackers cannot tell they are being watched.",
    level: "Moderate",
    codeExample: `// Layer 2 Transparent Bridge:
// Ingress Packet (TTL: 64) ──[Invisible Honeywall Bridge]──> Honeypot (TTL: 64 - No TTL Decrement!)`
  },
  {
    id: 5,
    question: "What is 'Outbound Connection Throttling / Rate-Limiting' in Honeynet Data Control?",
    shortAnswer: "Limiting the number of new outbound network connections initiated by honeynet nodes (e.g. maximum 5 or 10 connections per hour), preventing an attacker from using the honeynet to launch volumetric DDoS attacks or massive spam campaigns.",
    explanation: "If an adversary compromises a honeypot and downloads a botnet miner or DDoS tool, the Honeywall enforces strict connection limits. Excess packets are silently dropped or answered with TCP RST packets.",
    hint: "Limiting outbound connections to a few per hour so hackers cannot use the trap to attack others.",
    level: "Basic",
    codeExample: `// Honeywall Outbound Connection Throttling:
// iptables -A FORWARD -i eth_honeynet -m state --state NEW -m limit --limit 5/hour -j ACCEPT
// iptables -A FORWARD -i eth_honeynet -m state --state NEW -j DROP`
  },
  {
    id: 6,
    question: "How does a Honeynet Honeywall enforce 'Internal RFC 1918 Isolation'?",
    shortAnswer: "By configuring firewall drop rules that unconditionally discard any outbound packet originating from a honeynet node destined for private IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`).",
    explanation: "This absolute isolation guarantees that even if a nation-state APT group gains root on a honeynet server, they cannot send a single packet into the enterprise's real payroll, database, or SCADA subnets.",
    hint: "Blocking any packet going from the trap network to real private company computers.",
    level: "Basic",
    codeExample: `// RFC 1918 Containment Filter:
// iptables -A FORWARD -i eth_honeynet -d 10.0.0.0/8 -j DROP
// iptables -A FORWARD -i eth_honeynet -d 172.16.0.0/12 -j DROP
// iptables -A FORWARD -i eth_honeynet -d 192.168.0.0/16 -j DROP`
  },
  {
    id: 7,
    question: "What is 'MITRE ATT&CK TTP Mapping' in Research Honeynet analysis?",
    shortAnswer: "Mapping every captured attacker command, script, and exploit into standardized Tactics, Techniques, and Procedures (TTPs) defined by the MITRE ATT&CK framework (e.g. T1059 Command and Scripting Interpreter, T1003 OS Credential Dumping).",
    explanation: "Raw keystroke logs are difficult to share across organizations. Mapping observed behavior to MITRE ATT&CK IDs creates standardized threat intelligence that feeds directly into automated defense systems.",
    hint: "Translating hacker actions into standardized industry threat codes like MITRE ATT&CK.",
    level: "Moderate",
    codeExample: `// MITRE ATT&CK Mapping:
// Action: Unauthorized LSASS memory inspection probe ➔ Mapped to MITRE ATT&CK T1003.001 (LSASS Memory)`
  },
  {
    id: 8,
    question: "What is 'Dynamic Deception Orchestration' in Software-Defined Networking (SDN / Cisco ACI / VMware NSX)?",
    shortAnswer: "Using SDN controllers to automatically spin up virtual honeypots on unallocated IP addresses across dozens of enterprise VLANs and dynamically adjust network routes to steer intruders into decoy clusters.",
    explanation: "Instead of manually configuring static honeypots, SDN orchestration automatically deploys dozens of synthetic decoys into dark IP space, creating an evolving, unpredictable defense topology.",
    hint: "Using software-defined networking to automatically create hundreds of fake trap computers on demand.",
    level: "Expert",
    codeExample: `// SDN Deception Rule:
// When unallocated IP 10.10.5.88 receives SYN ➔ SDN Controller dynamically provisions Micro-VM Honeypot!`
  },
  {
    id: 9,
    question: "What is 'Darknet / Network Telescope' monitoring in global cyber threat research?",
    shortAnswer: "Announcing routed but unallocated public IPv4 address blocks (/16 or /24) to the internet; because these IPs host no legitimate services, all received packets represent global scanning noise, worm propagation, and backscatter DDoS traffic.",
    explanation: "Universities and national cybersecurity agencies (like CERT-In) monitor darknet telescopes to measure the global velocity of automated internet worms (like Mirai or Conficker) across millions of unassigned IP addresses.",
    hint: "Watching large blocks of unused internet IP addresses to see what hacker scanners are hitting them.",
    level: "Moderate",
    codeExample: `// Network Telescope Architecture:
// BGP announces 198.51.0.0/16 (65,536 Unused IPs) ➔ 100% of received packets = Global Cyber Attack Noise!`
  },
  {
    id: 10,
    question: "What is 'Backscatter Traffic' captured by Research Honeynets during Distributed Denial-of-Service (DDoS) attacks?",
    shortAnswer: "Unsolicited response packets (e.g. SYN-ACK or RST) received from real victim servers across the globe when an attacker uses spoofed honeynet IP addresses as the fake source in a SYN flood.",
    explanation: "When an attacker floods a target with spoofed source IPs belonging to a research darknet, the victim replies with SYN-ACK packets to the darknet. Research honeynets analyze this 'backscatter' to identify who is being attacked worldwide.",
    hint: "Bounced reply packets received when hackers use fake sender addresses in massive flood attacks.",
    level: "Expert",
    codeExample: `// DDoS Backscatter Analysis:
// Attacker sends SYN to Victim with Spoofed SrcIP(Honeynet) ➔ Victim replies SYN-ACK to Honeynet ➔ Attack Discovered!`
  },
  {
    id: 11,
    question: "What is 'Walleye' in historical Honeynet management and how is it modernized today?",
    shortAnswer: "The original web-based interface for managing Honeywall gateways, viewing pcap packet flows, and analyzing Snort alerts; modernized today using ELK Stack (Elasticsearch, Logstash, Kibana) and Grafana dashboards.",
    explanation: "Walleye was the early-2000s standard for honeynet visualization. Today, Suricata EVE JSON streams from multiple Honeywalls into Elasticsearch for real-time threat intelligence visualization in Kibana.",
    hint: "The original honeynet monitoring dashboard, now replaced by modern tools like Elastic and Grafana.",
    level: "Basic",
    codeExample: `// Modern Honeynet Telemetry Pipeline:
// Honeynet VM ──[eBPF / Sysmon]──> Honeywall ──[EVE JSON]──> Apache Kafka ➔ Elasticsearch ➔ Kibana Dashboard`
  },
  {
    id: 12,
    question: "What is a 'Honey-Mesh / Distributed Honeynet' across multi-region cloud infrastructures?",
    shortAnswer: "A globally distributed network of honeynets deployed across multiple cloud regions (e.g. AWS Mumbai, Azure Frankfurt, GCP US-East) interconnected via encrypted VPN tunnels to aggregate global adversary intelligence.",
    explanation: "Threat actors deploy attacks from different regional hosting providers. A global Honey-Mesh compares regional attack patterns: an attack targeting banking protocols in India might look completely different from attacks in North America.",
    hint: "A global web of trap networks deployed across multiple continents to track international hackers.",
    level: "Moderate",
    codeExample: `// Distributed Honey-Mesh:
// Mumbai Sensor + Frankfurt Sensor + Virginia Sensor ──[WireGuard VPN]──> Centralized Correlation Engine`
  },
  {
    id: 13,
    question: "How does a Honeynet simulate realistic 'Enterprise Background Traffic' to prevent adversary suspicion?",
    shortAnswer: "Using automated bots to generate realistic synthetic traffic—such as simulated DNS queries, internal web browsing, fake email exchanges between synthetic employees, and periodic database queries.",
    explanation: "An eerily quiet network with 10 servers and zero background traffic signals to an expert attacker that they are inside a honeypot. Synthetic traffic generators create the normal ambient noise of a real office.",
    hint: "Using automated computer scripts to create fake background web browsing and emails so the trap looks real.",
    level: "Expert",
    codeExample: `// Synthetic Background Traffic Generator:
// Automated Cron: Simulated Employee Bot browses http://internal-wiki.corp.local every 4 minutes.`
  },
  {
    id: 14,
    question: "What is 'Honey-Active Directory Forest' in Enterprise Honeynet Deployments?",
    shortAnswer: "A complete, multi-domain Active Directory forest with simulated organizational units (OUs), thousands of synthetic employee accounts, fake group memberships, and bait file shares.",
    explanation: "When sophisticated attackers breach an enterprise, they spend days mapping Active Directory via BloodHound. Populating a honey-forest with synthetic trust relationships keeps adversaries contained in the deception realm.",
    hint: "A complete fake Windows Domain forest with thousands of fake employee names and folders.",
    level: "Expert",
    codeExample: `// BloodHound Decoy Topology:
// User(deception_user) ──[MemberOf]──> Group(IT_Admins) ──[AdminTo]──> Computer(DECOY-DB-01)`
  },
  {
    id: 15,
    question: "What is 'Attacker Dwell Time' and how does Deception Technology manipulate it?",
    shortAnswer: "The duration an adversary remains undetected inside a network; Deception Technology simultaneously shrinks dwell time to seconds for defenders (instant alerts) while artificially extending dwell time inside fake decoy networks.",
    explanation: "Defenders detect the intrusion in under 500 milliseconds, but let the attacker wander inside the fake honeynet for days to drain the adversary's financial and operational resources.",
    hint: "How long a hacker stays inside your network before getting caught.",
    level: "Moderate",
    codeExample: `// Dwell Time Economics:
// Defender Dwell Time : < 1.0 Second (Canarytoken Webhook Alert Fired)
// Attacker Dwell Time : 72 Hours spent hacking fake databases in the Honeynet!`
  },
  {
    id: 16,
    question: "What is 'Data Poisoning / Synthetic Deception Injection' in Honeynet database servers?",
    shortAnswer: "Injecting mathematically valid but entirely fictional database records (e.g. synthetic bank accounts with valid Luhn credit card numbers) into honeynet SQL tables to waste adversary exfiltration resources.",
    explanation: "When attackers steal 100,000 records from the honeynet database, they attempt to monetize or sell the data on dark web forums, only to discover all credit cards and credentials are non-functional decoys.",
    hint: "Filling trap databases with realistic fake credit cards so stolen data is completely useless to hackers.",
    level: "Basic",
    codeExample: `// Synthetic Database Injection:
// INSERT INTO tbl_Users (pan_card, salary, bank_acc) VALUES ('ABCDE1234F', 150000, '99182390123'); (Valid Syntax, Zero Value)`
  },
  {
    id: 17,
    question: "What is 'Automated YARA Rule Generation' from binaries captured in Research Honeynets?",
    shortAnswer: "Extracting unique byte sequences, string constants, and opcodes from newly captured zero-day malware binaries in the honeynet and automatically compiling YARA rules to update enterprise endpoint scanners.",
    explanation: "Within 60 seconds of a honeynet capturing an unknown malware sample, an automated pipeline disassembles the binary, generates a YARA detection rule, and pushes it to all EDR agents across the enterprise.",
    hint: "Automatically writing new antivirus rules from fresh malware caught in the trap network.",
    level: "Moderate",
    codeExample: `// Automated YARA Rule:
// rule Auto_Generated_Honeynet_Sample_991 {
//     strings: $s1 = "malicious_payload_marker_77"
//     condition: $s1 and uint16(0) == 0x5A4D
// }`
  },
  {
    id: 18,
    question: "What is 'Honeynet Ingress Packet Laundering / Proxied Interception'?",
    shortAnswer: "Using external cloud reverse proxies (e.g. in AWS or DigitalOcean) to receive incoming attacks and tunnel the traffic back to internal honeynet nodes via WireGuard, concealing the true hosting datacenter.",
    explanation: "If attackers discover that the honeynet is hosted on a known defense contractor's IP range, they abandon the attack. Cloud front-end proxies make the honeypots appear as random, vulnerable residential or small-business servers.",
    hint: "Using cheap cloud servers to redirect attacks into the real trap lab so hackers cannot tell who runs it.",
    level: "Expert",
    codeExample: `// Cloud Ingress Laundering:
// Attacker ──> [AWS Front-End Proxy: 54.21.10.12] ──(WireGuard Tunnel)──> [Internal Honeynet Lab: 172.20.1.10]`
  },
  {
    id: 19,
    question: "Why must Production Honeynets NEVER contain real, un-redacted proprietary intellectual property or customer PII?",
    shortAnswer: "Because honeynets are designed to be probed and potentially compromised; placing real sensitive customer data on a honeynet violates the Digital Personal Data Protection (DPDP) Act 2023 and exposes the enterprise to severe statutory liability.",
    explanation: "Deception assets must use 100% synthetic, mathematically generated fake data. Placing real customer credit cards or medical records on a decoy server creates an unacceptable compliance violation.",
    hint: "Because trap servers are meant to be attacked, putting real customer data on them is illegal and dangerous.",
    level: "Basic",
    codeExample: `// Compliance Mandate (DPDP Act 2023):
// Real Customer PII on Decoy Server = ILLEGAL DATA EXPOSURE!
// Synthetic AI-Generated Data on Decoy Server = 100% COMPLIANT DECEPTION DEFENSE!`
  },
  {
    id: 20,
    question: "What is 'Shadow Subnet IP Multiplexing' in enterprise honeynet design?",
    shortAnswer: "Configuring the Honeywall to respond to ARP requests for every unused IP address in an entire /24 subnet, creating the illusion of 250 distinct servers hosted on a single physical hypervisor node.",
    explanation: "Far from deploying 250 physical servers, the Honeywall proxies ARP for `10.10.5.2` through `10.10.5.254` into a lightweight pool of virtual machines, maximizing deception density with minimal hardware cost.",
    hint: "Making one server answer for 250 unused IP addresses to make the trap network look huge.",
    level: "Moderate",
    codeExample: `// FarPD / Arp-Proxy Daemon:
// farpd -i eth1 10.10.5.0/24 (Answers ARP for all 254 unused IP addresses on the VLAN)`
  },
  {
    id: 21,
    question: "What is 'C&C Infrastructure Tracking / Sinkholing' via Research Honeynets?",
    shortAnswer: "Allowing a compromised honeypot to connect to the adversary's Command & Control (C2) server just long enough to identify the C2 IP address, DNS domain, and protocol beacon structure before severing the link.",
    explanation: "Security researchers extract the adversary's C2 domain and work with domain registrars to sinkhole the domain, seizing control of the botnet and liberating thousands of infected computers worldwide.",
    hint: "Tracking down the hacker's master control server and taking it down to save infected computers.",
    level: "Moderate",
    codeExample: `// C2 Identification Pipeline:
// Honeynet VM ──[Outbound Beacon]──> C2 Domain (bad-botnet-c2.ru) ➔ Domain Sinkholed by CERT-In!`
  },
  {
    id: 22,
    question: "What is 'Dynamic Honeynet Reconfiguration' triggered by active IDS alerts?",
    shortAnswer: "When an external IDS detects a port scan targeting a specific application (e.g. Apache Log4Shell), the deception orchestrator dynamically instantiates an identical vulnerable honeypot in the attacker's scan path.",
    explanation: "Just-in-time deception provisions the exact service the attacker is looking for, ensuring the adversary connects to the monitored honeynet rather than real production servers.",
    hint: "Instantly creating the exact type of server the hacker is searching for right in front of them.",
    level: "Expert",
    codeExample: `// Just-in-Time Deception Trigger:
// IDS flags Log4Shell probe ➔ SOAR spins up Docker container with vulnerable Log4j app on Port 8080!`
  },
  {
    id: 23,
    question: "What is 'Honeynet Physical Air-Gapping vs Virtual LAN Isolation'?",
    shortAnswer: "Air-gapping uses physically separate switches, network cards, and cables for the honeynet; VLAN isolation uses virtual 802.1Q tags on shared enterprise switches.",
    explanation: "While VLAN isolation is cost-effective, high-security research honeynets often mandate physical air-gapping to eliminate any theoretical risk of Layer-2 VLAN hopping attacks against production switches.",
    hint: "Air-gapping uses completely separate physical network cables; VLAN isolation shares the same switch.",
    level: "Moderate",
    codeExample: `// High-Security Isolation:
// Production Network ──[Physical Switch A]──> Core DC
// Honeynet Lab       ──[Physical Switch B]──> Quarantined Honeywall (Zero Physical Connection)`
  },
  {
    id: 24,
    question: "What is 'Attacker Persona Profiling' in Research Honeynet analysis?",
    shortAnswer: "Categorizing the human adversary behind an attack based on working hours, keyboard layout, language strings, preferred toolkits, and operational habits (e.g. identifying APT28 vs FIN7).",
    explanation: "By analyzing when the attacker is active (e.g. 09:00 to 18:00 in UTC+3 time zone) and what customized scripts they execute, threat analysts attribute attacks to specific nation-state intelligence agencies or criminal syndicates.",
    hint: "Studying hacker working hours and typing habits to figure out what country or hacking group they belong to.",
    level: "Expert",
    codeExample: `// Persona Attribution:
// Active Hours: 08:00-17:00 (Moscow Standard Time) | Keyboard: Cyrillic layout | Target: Energy SCADA ➔ APT28 Profile`
  },
  {
    id: 25,
    question: "What is the CERT-In statutory requirement regarding Honeynet Threat Telemetry and Malware Hash Sharing?",
    shortAnswer: "Organizations operating research or production honeynets must retain complete forensic logs for 180 days and are encouraged to report novel zero-day exploits, C2 domains, and SHA-256 malware hashes to CERT-In for national cyber defense.",
    explanation: "Under Indian cybersecurity directives, sharing honeynet threat intelligence strengthens national resilience by enabling CERT-In to issue urgent advisories and push blocklists to critical infrastructure sectors.",
    hint: "180-day retention of all honeynet logs and reporting novel malware discoveries to CERT-In.",
    level: "Basic",
    codeExample: `// Structured CERT-In Threat Intelligence Submission:
const certInThreatAdvisory = {
  timestamp: "2026-08-23T13:30:00.250Z",
  reportingOrg: "Barrackpore Telecom Cyber Defense Hub",
  threatCategory: "NOVEL_ZERO_DAY_ROOTKIT",
  sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  c2Domain: "c2-stealth-relay.ru",
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'Honeynet Disk Image Forensics' after an attacker session terminates?",
    shortAnswer: "Taking an automated bit-stream forensic disk snapshot (using `dd` or `qemu-img convert`) to analyze unallocated disk space, deleted files, and temporary shell scripts left in `/tmp`.",
    explanation: "Even if an attacker deletes their exploit toolkit before logging out, file carving tools (like Foremost or Autopsy) reconstruct the deleted files from unallocated disk clusters on the honeynet image.",
    hint: "Taking an exact copy of the hard drive to recover deleted hacker scripts and tools.",
    level: "Moderate",
    codeExample: `// Forensic Snapshot Command:
// qemu-img snapshot -c compromise_session_01 honeynet-vm.qcow2
// foremost -i honeynet-vm.qcow2 -o /forensics/recovered_malware/`
  },
  {
    id: 27,
    question: "What is 'Honey-Router / Decoy BGP Peer' in Telecom and ISP Honeynets?",
    shortAnswer: "A software-defined router emulating BGP, OSPF, and Cisco IOS CLI to detect unauthorized routing table poisoning, BGP route hijacking attempts, and router firmware exploits.",
    explanation: "In telecommunications backbones (such as Barrackpore telecom switching hubs), decoy BGP routers detect adversaries attempting to inject malicious routing prefixes to intercept citizen web traffic.",
    hint: "A fake core router that watches for hackers trying to hijack internet routes.",
    level: "Expert",
    codeExample: `// Decoy BGP Peer:
// Emulates Cisco IOS 15.2 BGP Daemon ➔ Alerts if an unauthorized neighbor attempts prefix hijacking!`
  },
  {
    id: 28,
    question: "What is 'Honey-Kubernetes / Decoy Container Cluster' in cloud-native deception?",
    shortAnswer: "A real or emulated Kubernetes cluster with intentionally exposed kubelet API endpoints (Port 10250) and misconfigured RBAC roles to trap cloud cryptojacking worms and container escape exploits.",
    explanation: "Cloud worms (like TeamTNT or Kinsing) scan for exposed Docker daemons and Kubernetes clusters. When they deploy a cryptomining pod into the decoy cluster, the honeynet captures their cloud attack tools.",
    hint: "A fake Kubernetes cluster that catches cloud viruses trying to install cryptocurrency miners.",
    level: "Moderate",
    codeExample: `// Decoy Kubelet Listener:
// Port 10250 (Anonymous Auth Enabled) ➔ Traps cryptomining pod deployments and logs container breakout attempts!`
  },
  {
    id: 29,
    question: "How does 'Automated Threat Intelligence Feed Generation' export Honeynet data to SIEMs (MISP / OpenCTI)?",
    shortAnswer: "Using automated STIX/TAXII pipelines to export observed malicious IP addresses, domain IOCs, and malware file hashes directly into Threat Intelligence Platforms (MISP / OpenCTI) for automatic firewall blocking.",
    explanation: "Manually copying threat data is too slow. Real-time honeynet feeds push fresh attacker IP addresses to perimeter firewalls within seconds of an attack landing on the honeynet.",
    hint: "Automatically pushing captured hacker IP addresses directly to firewalls to block them in seconds.",
    level: "Moderate",
    codeExample: `// STIX/TAXII Automated Export:
// Honeynet IOC ──(STIX 2.1 Format)──> MISP Threat Platform ──> Perimeter Firewalls Auto-Block Table`
  },
  {
    id: 30,
    question: "Synthesize the overarching strategic value of Honeynets in enterprise and national cyber resilience.",
    shortAnswer: "Honeynets provide the ultimate controlled laboratory for cyber warfare: they trap adversaries inside synthetic enterprise ecosystems, eliminate SOC alert fatigue with 100% True-Positive early warning, reverse the attacker's asymmetric advantage, and harvest zero-day threat intelligence in compliance with CERT-In and the DPDP Act 2023.",
    explanation: "By combining multi-node realism, strict Honeywall data control, eBPF out-of-band kernel tracing, and automated threat feed ingestion, Honeynets empower security teams to study real-world adversary TTPs without risking production downtime.",
    hint: "Honeynets turn defense into an active science, trapping hackers and studying their secrets safely.",
    level: "Moderate",
    codeExample: `// The Master Honeynet Cyber Defense Formula:
// Next-Gen Strategic Resilience = [Multi-Node Enterprise Topologies] + [Invisible Layer-2 Honeywall Containment] + [eBPF Kernel Syscall Recording] + [Real-Time STIX/TAXII Threat Sharing] + [180-Day CERT-In Logs]`
  }
];

export default questions;
