const questions = [
  {
    id: 1,
    question: "What is the foundational definition of a Honeypot in cyber defense?",
    shortAnswer: "A security resource, decoy system, application, or data asset whose value lies in being probed, attacked, or compromised, possessing no authorized production activity or legitimate business users.",
    explanation: "Because a honeypot has no legitimate business purpose, it acts as a pure tripwire. Anyone attempting to connect, login, or read files from it is, by definition, an unauthorized intruder or rogue insider.",
    hint: "A fake trap server that has no real users; anyone who touches it is an attacker.",
    level: "Basic",
    codeExample: `// The Honeypot Concept:
// Production Server : Has 10,000 real users → 99.9% clean traffic, 0.1% attacks (High False Alarms)
// Decoy Honeypot    : Has 0 real users     → 100% of connections are ATTACKS! (0% False Alarms)`
  },
  {
    id: 2,
    question: "What is the 'Golden Honeypot Axiom' formulated by Lance Spitzner and the Honeynet Project?",
    shortAnswer: "'A honeypot has no authorized legitimate business traffic. Therefore, ANY packet, connection attempt, or login interaction touching a honeypot is 100% MALICIOUS or ANOMALOUS by definition.'",
    explanation: "This axiom explains why honeypots solve the alert fatigue problem. Unlike traditional firewalls or IDS sensors that evaluate mixed traffic, honeypot alerts have a 100% True Positive confidence score.",
    hint: "Any connection touching a honeypot is 100% malicious because nobody has permission to use it.",
    level: "Basic",
    codeExample: `// The Golden Axiom in Code:
// if honeypot.has_connection():
//     dispatch_critical_soc_alert(confidence="100%_TRUE_POSITIVE")`
  },
  {
    id: 3,
    question: "What are the 4 primary strategic objectives of deploying Deception Technology in an enterprise?",
    shortAnswer: "1. High-Fidelity Early Warning (catching lateral movement); 2. Adversary Time Dilation (wasting hacker resources); 3. Zero-Day Threat Intelligence (capturing novel malware); 4. Forensic Attribution & Evidence Collection.",
    explanation: "Deception changes the economics of cyber warfare. Instead of defenders having to secure 10,000 servers while attackers need only 1 flaw, deception forces attackers to guess which servers are real and which are traps.",
    hint: "Early warning, wasting hacker time, collecting new malware, and gathering legal evidence.",
    level: "Basic",
    codeExample: `// Deception Strategic Multiplier:
// 10 Real Servers + 50 Decoy Honeypots ➔ Attacker has 83.3% chance of tripping a trap on their first probe!`
  },
  {
    id: 4,
    question: "What is a 'Canarytoken / Honeytoken' and how does it detect data exfiltration?",
    shortAnswer: "A unique embedded digital marker (e.g. fake AWS API key, fake SQL password, or PDF with a hidden webhook image) planted in files or memory; if an attacker steals and uses the token, an instant alert is triggered.",
    explanation: "Canarytokens act as silent tracking beacons. When an attacker opens a stolen PDF or queries an AWS API using the fake key, the token transmits a DNS or HTTP beacon to the defender's alerting server.",
    hint: "A fake password or document with an invisible tracker that phones home when opened.",
    level: "Basic",
    codeExample: `// Canarytoken API Key Trigger:
// Planted: AWS_SECRET_ACCESS_KEY="AKIA_CANARY_TOKEN_7721"
// Attacker runs: aws s3 ls (using fake key) ➔ Instant Webhook Alert: "AWS Canarytoken accessed from IP 198.51.100.25!"`
  },
  {
    id: 5,
    question: "What is a 'Honeyfile' (Bait Document) and how is it structured?",
    shortAnswer: "A decoy document with an alluring filename (e.g., `executive_salaries_2026.docx` or `passwords_backup.xlsx`) containing embedded web bugs, macros, or unique canary strings planted in public network shares.",
    explanation: "Legitimate employees have no reason to access the bait file. When a ransomware operator, malicious insider, or external hacker opens the file, the embedded URL beacon alerts the SOC immediately.",
    hint: "A fake document with a juicy name that alerts security as soon as someone clicks to open it.",
    level: "Basic",
    codeExample: `// Honeyfile Webhook Tracker:
// Stored on Network Share: \\\\share\\finance\\salaries_2026.docx
// Contains hidden image: <img src="https://canary.defense.local/track?id=FIN_DOC_01" />`
  },
  {
    id: 6,
    question: "What is an 'Active Directory Honeycredential / Honey Account' and how does it detect Kerberoasting?",
    shortAnswer: "A fake Domain Administrator account (e.g., `svc_backup_admin`) with a registered Service Principal Name (SPN); legitimate systems never request tickets for it, so any Kerberos `TGS-REQ` ticket request instantly flags an attack.",
    explanation: "In Kerberoasting attacks, adversaries query Active Directory for accounts with SPNs and request Kerberos ticket hashes to crack offline. Requesting a ticket for the honey account triggers an immediate high-confidence alarm.",
    hint: "A fake admin account in Windows domain; anyone asking for its login ticket is an active hacker.",
    level: "Moderate",
    codeExample: `// Active Directory Honeytoken Configuration:
// User: svc_oracle_admin | SPN: oracle/db.prod.local:1521 | Real Purpose: NONE (Trap Account)
// Alert Trigger: Windows Event ID 4769 (Kerberos Service Ticket Requested for Honey SPN)`
  },
  {
    id: 7,
    question: "Explain the critical legal distinction between 'Entrapment' and 'Enticement' in cyber deception operations.",
    shortAnswer: "Enticement (Legal) is placing a decoy or honeypot on an existing network to observe attackers; Entrapment (Illegal) is actively persuading, coercing, or inducing an otherwise innocent person to commit a crime.",
    explanation: "Operating a honeypot that passively waits for attackers to break in is 100% legal enticement. However, sending unsolicited emails to a citizen daring them to hack a server could cross into illegal entrapment.",
    hint: "Enticement is setting a passive trap (legal); Entrapment is forcing or tricking someone into committing a crime (illegal).",
    level: "Moderate",
    codeExample: `// Legal Assessment:
// Passive Honeyport Listener on Port 22 → 100% LEGAL ENTICEMENT (Admissible in Indian Courts)
// Coercing an individual via chat to hack a target → ILLEGAL ENTRAPMENT`
  },
  {
    id: 8,
    question: "What is 'Egress Data Containment' and why is it the single most critical safety requirement for High-Interaction Honeypots?",
    shortAnswer: "Strict outbound firewall filtering and rate-limiting to ensure that if an attacker fully gains root shell access on a honeypot, they cannot use it as a launchpad or proxy to attack real production systems or external third parties.",
    explanation: "If a compromised honeypot is allowed unconstrained outbound access, an attacker could use it to launch DDoS attacks against a hospital or pivot into production databases, exposing the organization to massive legal liability.",
    hint: "Blocking all outbound traffic from the honeypot so hackers cannot use it to attack other computers.",
    level: "Moderate",
    codeExample: `// Honeynet Egress Containment Rule:
// ALLOW: Ingress any → Honeypot (All ports)
// BLOCK: Honeypot → Internal Production VLANs (10.0.0.0/8) [DROP & LOG]
// RATE-LIMIT: Honeypot → External Internet (Max 5 pkts/sec, TCP RST injection)`
  },
  {
    id: 9,
    question: "What is a 'Honeyport' (e.g., portsentry / honeyd) and how does it detect automated port scanners?",
    shortAnswer: "A software listener running on an unused TCP port (e.g. TCP 2222 or 7777); any single SYN packet received on that port immediately identifies the source IP as an active port scanner and auto-blocks it at the firewall.",
    explanation: "Legitimate users only connect to approved production ports (80, 443). An automated scanner sweeps all 65,535 ports. When it hits the decoy honeyport, the defense script dynamically adds the scanner's IP to the firewall drop table.",
    hint: "A fake open port; as soon as a scanner pokes it, the firewall instantly blocks the scanner's IP.",
    level: "Basic",
    codeExample: `// Honeyport Auto-Block Script:
// On TCP SYN to Port 2222 ➔ Run: iptables -A INPUT -s $SRC_IP -j DROP ➔ Attacker Banned in 5ms!`
  },
  {
    id: 10,
    question: "What is 'Breadcrumbing / Decoy Credentials' planted on legitimate developer workstations?",
    shortAnswer: "Placing decoy AWS keys in `~/.aws/credentials`, fake database connection strings in `web.config`, or fake SSH keys in `~/.ssh/` that lead directly to internal honeypots.",
    explanation: "When an attacker compromises a laptop, they immediately search for stored credentials. The planted breadcrumbs lure the attacker directly into the defender's monitored honeypot environment.",
    hint: "Leaving fake password notes on computers that guide hackers straight into trap servers.",
    level: "Moderate",
    codeExample: `// Planted Breadcrumb in ~/.bash_history:
// ssh admin@10.10.99.100 (Where 10.10.99.100 is a Cowrie SSH Honeypot!)`
  },
  {
    id: 11,
    question: "What is 'Cliff Stoll's The Cuckoo's Egg' (1986) and its historical significance to deception technology?",
    shortAnswer: "The first documented real-world honeypot operation: astronomer Cliff Stoll created a fake 75-cent accounting error and simulated classified US military documents to track KGB hacker Markus Hess across 10 months.",
    explanation: "Stoll used simulated delay and fake military contract files (Project SDINET) to keep the hacker on the phone line long enough for telecommunications authorities to trace the international call to West Germany.",
    hint: "The famous 1986 case where fake military files were used to catch a Soviet KGB hacker.",
    level: "Basic",
    codeExample: `// Historical Axiom:
// "If you want to catch a spy, create a fake secret document that takes 30 minutes to download!" - Cliff Stoll`
  },
  {
    id: 12,
    question: "What is 'Lance Spitzner's The Honeynet Project' (1999) and what is the difference between Production vs Research honeypots?",
    shortAnswer: "Spitzner founded The Honeynet Project to formalize deception; Production Honeypots protect enterprise networks by detecting live intrusions; Research Honeypots gather intelligence on global hacker motives, botnets, and zero-days.",
    explanation: "Production honeypots sit inside corporate subnets to provide early warning alerts. Research honeypots sit on the open internet to collect malware binaries and analyze evolving attacker tactics (TTPs).",
    hint: "Production honeypots catch intruders in your company; Research honeypots study hackers globally.",
    level: "Basic",
    codeExample: `// Honeypot Categories:
// Production Honeypot: Deployed on 10.10.5.0/24 → Generates internal breach alerts for SOC.
// Research Honeypot  : Deployed on Public IP → Collects new malware variants for antivirus research.`
  },
  {
    id: 13,
    question: "How does Deception Technology defeat the 'Attacker's Asymmetric Advantage'?",
    shortAnswer: "Traditionally, defenders must defend all 1,000 systems perfectly while attackers need only find 1 flaw; with deception, defenders deploy 500 traps, meaning the attacker must avoid every single trap perfectly or be exposed.",
    explanation: "By populating the network with hundreds of low-cost decoys and honeytokens, the asymmetry reverses: any single mistake by the attacker in touching a decoy triggers an immediate, un-ignorable security alarm.",
    hint: "It flips the game so that hackers must be 100% lucky to avoid hitting a trap.",
    level: "Moderate",
    codeExample: `// Asymmetric Game Theory Reversal:
// Real Assets: 100 | Decoy Traps: 400
// Probability of Attacker choosing a Trap on first scan = 400 / 500 = 80%! Target Exposed!`
  },
  {
    id: 14,
    question: "What is a 'Honey-Database' (e.g. fake SQL Server with synthetic customer records)?",
    shortAnswer: "A decoy relational database containing millions of synthetically generated credit cards, names, and passwords monitored by file integrity and query audit triggers.",
    explanation: "If an adversary succeeds in finding an SQL injection or compromised DBA credential, they discover the honey-database. Querying `SELECT * FROM customers` immediately rings alarms while feeding the attacker fake data.",
    hint: "A fake database full of fake credit cards that alerts the SOC the moment someone queries it.",
    level: "Moderate",
    codeExample: `// Honey-Database Trigger:
// CREATE TRIGGER trg_HoneyAlert ON tbl_CreditCards AFTER SELECT AS
// EXEC xp_cmdshell 'curl -X POST https://soc.defense.local/alert?msg=HONEY_DB_READ';`
  },
  {
    id: 15,
    question: "What is 'Honeypot Fingerprinting' and how do sophisticated attackers detect that a server is a fake trap?",
    shortAnswer: "Attackers analyze protocol timing irregularities, incomplete operating system responses, missing standard processes, or default emulator error messages (e.g. Kippo/Cowrie default banners) to identify decoys.",
    explanation: "If an SSH honeypot returns a fake bash shell that does not support `cat /proc/cpuinfo` or returns identical hardcoded MAC addresses, the attacker realizes it is a trap and disconnects immediately.",
    hint: "Hackers testing unusual commands or looking for fake error messages to spot trap servers.",
    level: "Expert",
    codeExample: `// Anti-Fingerprinting Hardening:
// In Cowrie SSH: Configure real system CPU models, custom hostnames, realistic file trees, and dynamic process tables.`
  },
  {
    id: 16,
    question: "What is 'Honey-DNS / Sinkhole Detection' in enterprise DNS infrastructure?",
    shortAnswer: "Creating fake internal DNS records (e.g. `secret-vault.corp.local` → 10.10.99.250) that have no legitimate use; any DNS query for that hostname immediately identifies a compromised internal host performing reconnaissance.",
    explanation: "Attackers run automated Active Directory DNS enumeration scripts. The moment their script queries the non-existent honey-record, the DNS server logs the exact source IP of the compromised workstation.",
    hint: "Creating fake internal website addresses; any computer that searches for them is compromised.",
    level: "Basic",
    codeExample: `// Honey DNS Record:
// Zone: corp.local | Record: db-crownjewels.corp.local → 10.10.99.50 (Honey-IP)
// Alert Trigger: DNS Query for db-crownjewels → Source IP flagged for immediate isolation!`
  },
  {
    id: 17,
    question: "What is a 'Wireless Honeypot (Evil Twin Decoy)' in campus and enterprise Wi-Fi defense?",
    shortAnswer: "A monitored Wi-Fi access point broadcasting a fake SSID (e.g. `Corp_Executive_WiFi_Secure`) to detect rogue wireless attackers and Wi-Fi de-authentication jamming attempts.",
    explanation: "If an adversary deploys a Wi-Fi Pineapple to perform Evil Twin attacks or scans campus wireless frequencies in Barrackpore, the wireless decoy logs their MAC address and RF signal strength.",
    hint: "A fake Wi-Fi network that watches for wireless hackers and fake access points.",
    level: "Basic",
    codeExample: `// Wireless Deception Monitor:
// Decoy SSID: 'Barrackpore_Municipal_Admin_Secure' (Monitored on 2.4/5 GHz bands for probe requests)`
  },
  {
    id: 18,
    question: "How do 'Git Repository Honeytokens' detect compromised source code and leaked repository secrets?",
    shortAnswer: "Committing fake API keys or database tokens into public or internal GitHub repositories; if an attacker steals the source code and attempts to use the credential, the defender receives an immediate alert.",
    explanation: "When threat actors breach a GitHub repo, they run automated scanners (like TruffleHog) to extract AWS keys. The planted canary key immediately alerts the organization that their source code has been leaked.",
    hint: "Hiding fake API keys inside code repositories to know instantly if your code gets stolen.",
    level: "Moderate",
    codeExample: `// Git Honeytoken in config.py:
// STRIPE_API_SECRET_KEY = "sk_live_canary_token_991823a" ➔ Instant Webhook upon first API check!`
  },
  {
    id: 19,
    question: "What is 'Shadow Net / Decoy VLAN' architecture in enterprise network switches?",
    shortAnswer: "Assigning unused subnets and IP ranges (e.g. 10.10.200.0/24) to a virtual deception network populated with dynamic lightweight decoys, ensuring any lateral IP sweep instantly hits a trap.",
    explanation: "In large enterprises, 30% of IP space is unallocated. Instead of leaving it dark, routing unallocated IP blocks to a deception engine turns dark network space into an expansive minefield for intruders.",
    hint: "Turning empty, unused IP addresses into an invisible minefield of decoy trap servers.",
    level: "Moderate",
    codeExample: `// Switch Route-To-Deception:
// ip route 10.10.200.0 255.255.255.0 10.10.99.1 (Route all unallocated IPs to Honeynet Engine)`
  },
  {
    id: 20,
    question: "What is 'Honey-User Web Session Injection' in Web Application Firewalls (WAF)?",
    shortAnswer: "Injecting fake hidden form fields or decoy session cookies into HTML web pages (e.g. `<input type='hidden' name='admin_override' value='0'>`); normal users never touch it, but automated web scrapers modify it.",
    explanation: "Web vulnerability scanners automatically parse and fuzz every hidden form parameter. The moment the server receives `admin_override=1`, it immediately identifies the client as an automated exploitation tool.",
    hint: "Hiding invisible buttons on web pages that only automated hacker bots click on.",
    level: "Basic",
    codeExample: `// Hidden Honeypot HTML Field:
// <input type="text" name="honey_trap" style="display:none;" value="" />
// IF POST['honey_trap'] != "" ➔ INTRUDER BOT DETECTED ➔ BAN IP!`
  },
  {
    id: 21,
    question: "How do Honeypots facilitate 'Zero-Day Vulnerability Discovery' for security researchers?",
    shortAnswer: "By exposing unpatched real operating systems to the open internet; when a novel zero-day worm or exploit executes, the honeypot's kernel-level logging captures the raw payload before any antivirus signature exists.",
    explanation: "Because the honeypot records full disk snapshots and network memory streams, researchers extract the novel exploit code, write mitigation rules, and submit CVEs to the vendor for patching.",
    hint: "Trapping brand-new, unseen exploit viruses so scientists can study them and write cures.",
    level: "Moderate",
    codeExample: `// Zero-Day Capture Workflow:
// Attack Hits Honeypot ➔ Kernel Hooks Capture In-Memory Shellcode ➔ Reverse Engineers Extract Exploit Payload ➔ CVE Assigned!`
  },
  {
    id: 22,
    question: "What is 'Deception Orchestration' in modern Security Orchestration, Automation, and Response (SOAR)?",
    shortAnswer: "Automating the immediate isolation of any endpoint that triggers a deception tripwire (e.g., dynamically quarantining a laptop via EDR the second it touches an internal honeyport).",
    explanation: "Because honeypot alerts have 100% confidence, automated SOAR playbooks execute destructive containment actions (isolating the host, revoking Active Directory credentials) without requiring human approval.",
    hint: "Automatically locking down a hacked computer within milliseconds of it touching a trap server.",
    level: "Moderate",
    codeExample: `// SOAR Zero-Touch Playbook:
// On Deception Alert ➔ CrowdStrike EDR Isolates Host(10.10.4.15) + Disables User in Active Directory (Execution Time: 450ms)`
  },
  {
    id: 23,
    question: "What is 'Honey-Email (Spam Trap / Spamtrap)' in email security and threat intelligence?",
    shortAnswer: "A pristine email address (e.g. `admin_billing@domain.com`) never used for real correspondence, published on hidden web pages to harvest automated spam scraper emails and phishing campaigns.",
    explanation: "Because the address is never used, 100% of received emails are unsolicited spam or targeted spear-phishing. Security teams extract malicious attachment hashes and phishing URLs to update email gateway filters.",
    hint: "A fake email address published on hidden web pages to catch spam and phishing campaigns.",
    level: "Basic",
    codeExample: `// Spamtrap Ingestion:
// Inbound Email to spamtrap@barrackpore.gov ➔ Extract Malicious URLs ➔ Push to Perimeter Firewall Blocklist`
  },
  {
    id: 24,
    question: "What is 'Dynamic Deception Generation' using Generative AI / Large Language Models (LLMs)?",
    shortAnswer: "Using AI to generate realistic synthetic customer databases, convincing fake code repositories, and responsive fake terminal shells that interact convincingly with attackers in real time.",
    explanation: "Static honeypots are easily fingerprinted by hackers. GenAI creates dynamic, realistic file systems and responsive fake personas on the fly, keeping attackers engaged in the trap for days.",
    hint: "Using AI to create realistic fake documents and fake computer shells that fool human hackers.",
    level: "Expert",
    codeExample: `// AI-Driven Decoy Shell:
// Attacker runs custom proprietary command ➔ LLM generates convincing synthetic Linux terminal output in real time!`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding Honeypot Threat Telemetry and Decoy Audit Logs?",
    shortAnswer: "Organizations deploying honeypots must retain all interaction logs, captured packet pcaps, adversary IP addresses, and NPL India NTP timestamps in immutable SIEM storage for a minimum of 180 days.",
    explanation: "Under Indian cybersecurity directives, honeypot telemetry serves as critical statutory forensic evidence for cybercrime investigations and must be preserved without alteration.",
    hint: "180-day retention of all honeypot interaction logs synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Structured CERT-In Deception Incident Log:
const certInDeceptionLog = {
  timestamp: "2026-08-23T13:15:00.350Z",
  decoyType: "HONEYPORT_DATABASE",
  attackerIp: "198.51.100.88",
  targetedPort: 1433,
  confidence: "100_PERCENT_TRUE_POSITIVE",
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'Honey-Cloud / Cloud Deception' (e.g. Decoy AWS S3 Buckets / Azure Service Principals)?",
    shortAnswer: "Deploying publicly accessible or internally visible S3 buckets with names like `company-database-backups-private` that contain canary files to detect cloud enumeration and reconnaissance.",
    explanation: "Cloud attackers use tools like `s3scanner` to find open buckets. When they access the decoy bucket, AWS CloudTrail triggers a Lambda function that logs the attacker's IP and revokes their AWS IAM role.",
    hint: "Setting up fake cloud storage buckets to catch hackers scanning for leaked company files in the cloud.",
    level: "Moderate",
    codeExample: `// AWS S3 Canary Bucket:
// S3: s3://barrackpore-fintech-backup-master/ (Contains Canary Word Doc)
// CloudWatch Event: S3 GetObject ➔ Lambda triggers PagerDuty Alert!`
  },
  {
    id: 27,
    question: "What is 'Data Poisoning via Honeypots' to degrade an attacker's automated intelligence?",
    shortAnswer: "Deliberately feeding attackers massive quantities of synthetically generated, plausible-looking garbage data (fake credentials, incorrect source code) to dilute the value of any data they attempt to steal.",
    explanation: "If an adversary exfiltrates 50 gigabytes of data from a decoy database, they waste weeks attempting to use non-existent bank account numbers, neutralizing their criminal monetization model.",
    hint: "Feeding hackers fake, useless data so they waste time trying to use fake bank accounts.",
    level: "Moderate",
    codeExample: `// Deceptive Data Poisoning:
// Generate 100,000 synthetic Credit Card Numbers with valid Luhn checksums but non-existent bank routing.`
  },
  {
    id: 28,
    question: "What is 'Honeypot Sandbox Escaping Risk' and how is it mitigated in virtualization hypervisors?",
    shortAnswer: "The danger of an advanced malware payload exploiting a hypervisor vulnerability (VM Escape) on a honeypot to infect the underlying host bare-metal server; mitigated using nested virtualization, micro-VMs (Firecracker), and air-gapped physical hardware.",
    explanation: "If an adversary executes a zero-day VM escape exploit, they break out of the virtual honeypot. Running honeypots on dedicated, isolated physical hardware ensures hypervisor exploits cannot compromise production clusters.",
    hint: "The risk of a virus breaking out of a virtual machine; prevented by using isolated physical computers.",
    level: "Expert",
    codeExample: `// Hardened Isolation Architecture:
// Physical Bare-Metal Server ──[Air-Gapped Switch]──> Dedicated Honeynet Quarantined Network`
  },
  {
    id: 29,
    question: "What is 'Internal Lateral Deception vs External Perimeter Deception'?",
    shortAnswer: "External Perimeter Deception faces the public internet to trap external opportunistic scanners; Internal Lateral Deception sits inside trusted private subnets to catch insider threats and adversaries who have already breached the perimeter.",
    explanation: "Perimeter honeypots are noisy. Internal deception is extremely quiet and high-value: any ping or connection attempt on an internal decoy proves that an adversary is actively moving laterally inside the organization.",
    hint: "External traps catch random internet hackers; Internal traps catch stealthy insiders and lateral hackers.",
    level: "Basic",
    codeExample: `// Internal vs External Deployment:
// External (DMZ): Traps 100,000 daily internet bots (Shodan, masscan)
// Internal (LAN): 0 connections for 6 months ➔ 1 single connection = CONFIRMED ACTIVE BREACH!`
  },
  {
    id: 30,
    question: "Synthesize the ultimate role of Honeypots and Cyber Deception in modern enterprise security architecture.",
    shortAnswer: "Deception technology transforms passive defense into an active, proactive defense grid: it provides 100% True-Positive alerts with zero false alarms, exposes insider threats, neutralizes lateral movement, dilutes attacker resources, and gathers forensic intelligence in compliance with CERT-In and the DPDP Act 2023.",
    explanation: "While firewalls and IDS sensors attempt to keep attackers out, deception operates on the reality of assumed breach. By laying an invisible minefield of decoys, honeytokens, and canary traps, security teams guarantee that any intruder inside the network is caught immediately.",
    hint: "Deception turns your network into an intelligent minefield that catches hackers with 100% certainty.",
    level: "Moderate",
    codeExample: `// The Ultimate Deception Grid Formula:
// Proactive Cyber Supremacy = [Internal Subnet Decoy Servers] + [Canarytoken Bait Files] + [AD Honeycredentials] + [100% Confidence Zero-False-Alarm SOAR Isolation] + [180-Day SIEM Forensics]`
  }
];

export default questions;
