const questions = [
  {
    id: 1,
    question: "What is User and Entity Behavior Analytics (UEBA) and how does it advance beyond static SIEM correlation rules?",
    shortAnswer: "Static SIEM uses fixed threshold rules (e.g., 'Alert if 5 failed logins in 60s'). UEBA uses machine learning to create dynamic behavioral baselines for each user and entity, identifying subtle multi-dimensional anomalies (e.g., unusual geovelocity, off-hours access, abnormal data volume) that bypass static rules.",
    explanation: "UEBA detects insider threats and account compromises where valid credentials are used abnormally.",
    hint: "Uses machine learning to baseline normal user behavior rather than relying on rigid static threshold rules.",
    level: "Basic",
    codeExample: `// SIEM Rule vs UEBA:
// Static SIEM : Alert IF failed_logins > 5 (Misses slow 1-login-per-hour brute force)
// Dynamic UEBA: Flags user downloading 500MB from uncharacteristic Russian IP at 3:00 AM (Risk: 95/100 🚨)`
  },
  {
    id: 2,
    question: "What is the Exploit Prediction Scoring System (EPSS) and how does it differ from CVSS?",
    shortAnswer: "CVSS measures theoretical technical severity in isolation (Base score 0-10). EPSS (FIRST.org) uses machine learning trained on global threat feeds to predict the real-world probability (0.0 to 1.0) that a vulnerability will be weaponized and actively exploited in the wild within 30 days.",
    explanation: "EPSS enables predictive risk prioritization, helping security teams patch actively exploited flaws first.",
    hint: "EPSS calculates real-world exploitation probability; CVSS measures theoretical technical severity.",
    level: "Basic",
    codeExample: `// CVSS vs EPSS:
// CVE-2023-XXXX: CVSS 9.8 (Critical), EPSS 0.04% (Theoretical only, no public exploit)
// CVE-2023-YYYY: CVSS 7.2 (Medium), EPSS 92.4% (Active ransomware weaponization in the wild! 🚨)`
  },
  {
    id: 3,
    question: "What are the core components of a Security Orchestration, Automation, and Response (SOAR) platform?",
    shortAnswer: "1. Orchestration (connecting disparate security APIs: EDR, Firewall, IdP, SIEM); 2. Automation (executing pre-built Playbooks for alert enrichment and threat containment in milliseconds); 3. Incident Management & Response (case management, SLA tracking, and audit logging).",
    explanation: "SOAR platforms automate repetitive Tier-1 SOC workflows, reducing MTTR from hours to seconds.",
    hint: "Orchestration (API integration), Automation (Playbooks), and Response (Case Management).",
    level: "Basic",
    codeExample: `// SOAR Ecosystem:
// [SIEM Alert] ➔ [SOAR Engine] ➔ Triggers: EDR Isolate + Firewall Block + IdP Token Revoke (All in 400ms)`
  },
  {
    id: 4,
    question: "What is Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) and how does AI-SOAR optimize them?",
    shortAnswer: "MTTD is the average time taken to discover a security breach. MTTR is the average time taken to contain and remediate the threat. AI anomaly detection compresses MTTD from days to seconds; automated SOAR playbooks compress MTTR from 45 minutes to sub-500 milliseconds.",
    explanation: "Sub-second MTTR stops ransomware before it can traverse the network and encrypt disks.",
    hint: "MTTD = Time to find threat; MTTR = Time to contain threat. SOAR reduces MTTR to milliseconds.",
    level: "Basic",
    codeExample: `// Metric Optimization:
// Legacy Human SOC : MTTD = 4.2 Days, MTTR = 45 Minutes
// AI-SOAR Next-Gen : MTTD = 1.2 Seconds, MTTR = 380 Milliseconds ✔`
  },
  {
    id: 5,
    question: "What is Geovelocity Analysis (Impossible Travel) in UEBA identity protection?",
    shortAnswer: "A behavioral algorithm calculating the physical distance and implied velocity between consecutive user logins. If a user authenticates in Kolkata at 14:00 and in London at 14:20, the calculated speed (over 20,000 km/h) exceeds physical flight limits, indicating credential compromise or proxy use.",
    explanation: "Impossible travel triggers instant session revocation and mandatory hardware passkey step-up.",
    hint: "Detects consecutive logins from distant locations within an impossible travel timeframe.",
    level: "Moderate",
    codeExample: `// Impossible Travel Math:
// Distance(Kolkata, London) = 7,960 km | Time Elapsed = 20 mins (0.33 hours)
// Velocity = 23,880 km/h (> 900 km/h commercial flight speed) ➔ CRITICAL ACCOUNT HIJACK ALERT 🚨`
  },
  {
    id: 6,
    question: "What is a SOAR Playbook and what are three automated containment actions it executes?",
    shortAnswer: "A Playbook is a standardized automated workflow executing upon alert triggers. Three containment actions: 1. Host Isolation (EDR disconnects endpoint network interface); 2. Token Revocation (IdP invalidates active OAuth refresh tokens); 3. Egress IP Blocking (Firewall drops outbound traffic to malicious C2 IP).",
    explanation: "Automated playbooks eliminate human operational delays during critical cyber incidents.",
    hint: "Pre-programmed automated sequence: isolate host, revoke user tokens, and block malicious IPs at firewall.",
    level: "Moderate",
    codeExample: `// Playbook Actions:
// 1. edr.isolate_endpoint("HOST_104")
// 2. idp.revoke_all_sessions("user@bank.in")
// 3. firewall.add_block_rule("198.51.100.24")`
  },
  {
    id: 7,
    question: "What is Peer Group Profiling in enterprise UEBA?",
    shortAnswer: "Grouping employees by role/department (e.g., all 40 Barrackpore Treasury accountants) to establish collective baseline behaviors. If one accountant suddenly executes database dump commands that no other accountant has ever used, the UEBA model flags an anomaly even if the user has no personal history.",
    explanation: "Peer group modeling provides instant baselines for newly hired employees (Joiners).",
    hint: "Compares an employee's activity against all peers in the same job department.",
    level: "Moderate",
    codeExample: `// Peer Group Modeling:
// Peer Group (Finance Clerks): Normal = Excel, SAP, Web Portal
// Susmita (Finance Clerk) executes 'powershell.exe -enc ...' ➔ 100% Deviation from Peer Baseline 🚨`
  },
  {
    id: 8,
    question: "How does Predictive Threat Intelligence correlate Dark Web chatter with automated defense rules?",
    shortAnswer: "Natural language processing crawlers monitor underground hacking forums, Telegram channels, and ransomware leak sites for mentions of corporate domains, leaked credentials, or active exploit development, automatically generating proactive firewall blocklists and alerting SOC teams before attacks launch.",
    explanation: "Predictive CTI shifts defense from reactive incident cleanup to pre-emptive perimeter hardening.",
    hint: "Monitors dark web forums and Telegram to detect planned attacks and pre-emptively deploy defenses.",
    level: "Moderate",
    codeExample: `// Predictive CTI Alert:
// "Threat Actor 'DarkStorm' posted 0-day exploit for Apache Struts on forum ➔ Auto-deploying WAF virtual patch!"`
  },
  {
    id: 9,
    question: "What is Alert Fatigue in traditional SOC operations and how does AI-driven Alert Triage resolve it?",
    shortAnswer: "Alert fatigue occurs when human analysts are overwhelmed by 10,000+ daily low-fidelity alerts, leading to burnout, missed critical threats, and delayed response times. AI triage correlates and deduplicates alerts into unified incident graphs, filtering out 95%+ of false positives autonomously.",
    explanation: "AI triage allows human analysts to focus exclusively on high-priority, verified security incidents.",
    hint: "Overwhelming volume of false alerts causing analyst burnout; solved by AI deduplication and triage.",
    level: "Basic",
    codeExample: `// Alert Volume Reduction:
// 10,000 Raw Daily SIEM Alerts ➔ [AI Triage & Deduplication] ➔ 12 High-Priority Verified Incident Graphs`
  },
  {
    id: 10,
    question: "What is Interactive Human-in-the-Loop (HITL) in SOAR automation and when is it required?",
    shortAnswer: "A hybrid workflow where a SOAR playbook automates all investigation and data enrichment, but pauses to request explicit human confirmation (e.g., via Slack or Teams interactive button) before executing disruptive actions (such as shutting down a core banking database server).",
    explanation: "HITL prevents automated playbooks from causing accidental business outages on mission-critical assets.",
    hint: "Pausing automated playbooks to get human approval before taking high-impact destructive actions.",
    level: "Moderate",
    codeExample: `// HITL Prompt:
// "SOAR detected ransomware on Primary Core DB. Click [CONFIRM ISOLATE] to shut down server. (SLA: 2 mins)"`
  },
  {
    id: 11,
    question: "What is the role of STIX 2.1 and TAXII 2.1 in automated threat intelligence sharing?",
    shortAnswer: "STIX 2.1 (Structured Threat Information Expression) is a standardized JSON graph format for expressing threat data (indicators, malware families, attack patterns). TAXII 2.1 (Trusted Automated eXchange of Intelligence Information) is the REST API protocol for securely sharing STIX feeds between organizations and automated SOAR engines.",
    explanation: "STIX/TAXII enables automated real-time threat intelligence distribution across the global cyber ecosystem.",
    hint: "STIX is the JSON format; TAXII is the REST API protocol for sharing threat intelligence feeds.",
    level: "Moderate",
    codeExample: `// STIX 2.1 JSON Indicator:
// { "type": "indicator", "pattern": "[ipv4-addr:value = '198.51.100.88']", "valid_from": "2026-08-23T00:00:00Z" }`
  },
  {
    id: 12,
    question: "What is Risk-Based Vulnerability Management (RBVM) and how does it integrate CVSS, EPSS, and Asset Criticality?",
    shortAnswer: "RBVM calculates a Composite Risk Score for each vulnerability: $\\text{Risk} = \\text{CVSS (Severity)} \\times \\text{EPSS (Exploit Probability)} \\times \\text{Asset Criticality (Crown Jewel)}$ rather than blindly patching based on CVSS alone.",
    explanation: "RBVM ensures IT teams patch internet-facing core treasury databases first before patching internal test servers.",
    hint: "Combines CVSS severity, EPSS exploitation probability, and business asset importance to prioritize patches.",
    level: "Expert",
    codeExample: `// RBVM Formula:
// Composite Priority = CVSS (8.5) * EPSS (0.92) * Asset_Value (Core_Treasury_DB = 10) ➔ MAXIMUM PRIORITY 🚨`
  },
  {
    id: 13,
    question: "How do AI Anomaly Detection models detect DNS Tunneling exfiltration in enterprise network traffic?",
    shortAnswer: "Attackers encode stolen data into DNS query subdomains (e.g., `a8f92b4c.data.evil.com`). AI models analyze DNS telemetry in real-time, detecting high Shannon entropy in subdomain labels, abnormal domain length, elevated query frequency, and rare character distributions.",
    explanation: "DNS tunneling bypasses standard firewalls because Port 53 UDP traffic is rarely inspected at Layer 7.",
    hint: "Detects high entropy, abnormal lengths, and high query rates in DNS subdomain labels.",
    level: "Expert",
    codeExample: `// DNS Tunneling Anomaly:
// Normal: "api.google.com" (Entropy: 2.8, Length: 14)
// Exfil : "dGhpcyBpcyBhIHNlY3JldCBwYXNzd29yZAo.attacker-c2.net" (Entropy: 5.8, Length: 48) ➔ ALERT 🚨`
  },
  {
    id: 14,
    question: "What is Incident Enrichment in automated SOAR workflows?",
    shortAnswer: "The automated process of querying external threat databases (VirusTotal, Shodan, WHOIS, IPinfo, AlienVault OTX) and internal asset directories (CMDB, Active Directory) as soon as an alert fires, attaching full context before presenting it to an analyst.",
    explanation: "Enrichment eliminates 20 minutes of manual copy-pasting IPs and file hashes into browser tabs.",
    hint: "Automatically querying VirusTotal, Shodan, and AD to attach full context to alerts instantly.",
    level: "Basic",
    codeExample: `// Automated Enrichment:
// Raw Alert: "Connection to 198.51.100.44"
// Enriched : "IP: 198.51.100.44 | ASN: AS1234 (Rogue Hosting, Russia) | VirusTotal: 68/72 Engines Flagged MALICIOUS"`
  },
  {
    id: 15,
    question: "What is Continuous Risk Scoring in Zero Trust session governance?",
    shortAnswer: "An AI engine recalculates a user's risk score dynamically on every HTTP API request based on continuous telemetry (keystroke dynamics, device compliance, geovelocity, process behavior). If the risk score exceeds acceptable thresholds mid-session, access is revoked immediately.",
    explanation: "Continuous scoring eliminates the vulnerability where a user authenticates once and retains unverified access for hours.",
    hint: "Recalculates risk dynamically on every request, revoking sessions mid-flight if risk spikes.",
    level: "Moderate",
    codeExample: `// Continuous Scoring:
// 10:00 AM: Risk = 12 (Access Granted)
// 10:45 AM: EDR flags background Mimikatz execution → Risk spikes to 98 → Instant Session Revocation 🛡️`
  },
  {
    id: 16,
    question: "What is the difference between In-Band vs Out-of-Band SOAR response execution?",
    shortAnswer: "In-Band: The SOAR proxy sits directly in the active network data path, able to drop packets, block HTTP requests, or modify payloads in real-time. Out-of-Band: The SOAR engine receives log copies asynchronously via SIEM and calls third-party APIs (firewall, EDR) to apply countermeasures after the fact.",
    explanation: "Out-of-band response avoids adding latency to production traffic while maintaining fast API-driven containment.",
    hint: "In-Band sits in the live traffic path; Out-of-Band responds asynchronously via API calls.",
    level: "Moderate",
    codeExample: `// Out-of-Band Response Flow:
// NetFlow Log ➔ Kafka ➔ SIEM ➔ SOAR Engine ➔ Dispatches API Block to Cisco Firewall in 250ms`
  },
  {
    id: 17,
    question: "How do Graph Neural Networks (GNNs) construct Incident Context Graphs in modern XDR platforms?",
    shortAnswer: "GNNs link disparate raw telemetry events (process spawns, registry changes, network sockets, user logons) into a connected directed acyclic graph (DAG), tracing the root-cause parent process and full blast-radius lateral spread of an intrusion across the enterprise.",
    explanation: "Context graphs give analysts a complete visual picture of an attack chain in a single view.",
    hint: "Connects processes, network connections, and user logins into a visual attack graph.",
    level: "Expert",
    codeExample: `// Incident Graph:
// Outlook.exe ➔ Spawns Word.exe ➔ Spawns Powershell.exe ➔ Connects to C2 IP ➔ Downloads Ransomware`
  },
  {
    id: 18,
    question: "What is the MITRE D3FEND framework and how does it complement MITRE ATT&CK?",
    shortAnswer: "While ATT&CK catalogs adversary offensive techniques (e.g., T1059 Command Execution), D3FEND is a defensive knowledge graph specifying technical countermeasures and defensive engineering techniques (e.g., D3-PCA Process Lineage Verification, D3-EBR Endpoint Behavior Restoration).",
    explanation: "D3FEND provides the precise defensive blueprints required to counter specific ATT&CK tactics.",
    hint: "ATT&CK catalogs offensive attacks; D3FEND catalogs defensive countermeasures and engineering rules.",
    level: "Moderate",
    codeExample: `// ATT&CK vs D3FEND Mapping:
// Offensive: MITRE ATT&CK T1055 (Process Injection)
// Defensive: MITRE D3FEND D3-PSA (Process Segment Authorization & Memory Protection)`
  },
  {
    id: 19,
    question: "How does AI detect Slow-and-Low Password Spraying attacks that evade static brute-force thresholds?",
    shortAnswer: "Adversaries test 1 password against 1,000 accounts every 3 hours from 500 different rotating proxy IPs, staying far below static 5-failed-login thresholds. AI clustering correlates failed attempts across the entire enterprise population and detects distributed username spray patterns globally.",
    explanation: "Global population-level correlation exposes distributed botnet sprays that appear harmless on individual accounts.",
    hint: "Correlates single failed logins across thousands of accounts and rotating IPs globally.",
    level: "Moderate",
    codeExample: `// Distributed Spray Detection:
// Account A: 1 fail from IP 1.1.1.1
// Account B: 1 fail from IP 2.2.2.2 ➔ AI Global Correlator: "Password Spraying Campaign Detected (1,000 IPs) 🚨"`
  },
  {
    id: 20,
    question: "What is Automated Threat Emulation (Breach and Attack Simulation - BAS) in testing SOAR playbooks?",
    shortAnswer: "BAS platforms autonomously execute safe, synthetic adversary techniques across production endpoints (e.g., simulating Mimikatz LSASS dumps or C2 beaconing) to continuously validate that detection rules fire and SOAR containment playbooks execute as designed.",
    explanation: "Continuous BAS validation ensures security automations work before a real attack occurs.",
    hint: "Simulating safe synthetic attacks in production to test if SOAR playbooks execute properly.",
    level: "Moderate",
    codeExample: `// BAS Validation Test:
// BAS executes synthetic T1003 (Credential Dumping) ➔ Confirms SOAR isolated host within 400ms ✔`
  },
  {
    id: 21,
    question: "What is Low-Code / No-Code Visual Playbook Design in enterprise SOAR platforms?",
    shortAnswer: "A drag-and-drop graphical interface allowing security engineers to build complex multi-branch response workflows with visual blocks (triggers, filters, API action nodes, logic gates) without writing manual Python code from scratch.",
    explanation: "Visual design democratizes playbook creation and accelerates deployment of emergency response workflows.",
    hint: "Drag-and-drop visual interface for creating complex automated response workflows.",
    level: "Basic",
    codeExample: `// Visual Playbook Workflow:
// [Trigger: Phishing Alert] ➔ [Block: Scan URL (VirusTotal)] ➔ [Decision: Malicious?] ➔ [Yes ➔ Purge Inbox] / [No ➔ Close]`
  },
  {
    id: 22,
    question: "How do Anomaly Detection models detect C2 Jitter (Randomized Beaconing Intervals)?",
    shortAnswer: "Adversaries add random time delays (+/- 20% jitter) to C2 beacons to evade fixed-interval periodicity filters. AI models evaluate time-series autocorrelation, Fast Fourier Transform (FFT) power spectral density, and Markov transition matrices to detect underlying rhythmic beaconing hidden within stochastic noise.",
    explanation: "Statistical signal processing exposes coordinated beaconing despite randomized delays.",
    hint: "Uses FFT power spectrum and autocorrelation to detect beaconing rhythms hidden behind random jitter.",
    level: "Expert",
    codeExample: `// C2 Jitter Analysis:
// Beacon times: [31s, 28s, 34s, 29s, 33s] (30s +/- 15% jitter)
// FFT Spectral Analysis ➔ Clear frequency peak at 0.033 Hz ➔ C2 BEACON CONFIRMED 🚨`
  },
  {
    id: 23,
    question: "What is Model Drift Monitoring in production UEBA deployments?",
    shortAnswer: "Continuous monitoring of statistical telemetry distributions to detect when baseline models become stale due to organizational changes (e.g., company-wide remote work transition, holiday shopping seasons, major software upgrades), automatically triggering retraining pipelines.",
    explanation: "Drift monitoring prevents seasonal changes from generating thousands of false anomaly alerts.",
    hint: "Monitors baseline shifts to trigger model retraining and prevent seasonal false alarms.",
    level: "Moderate",
    codeExample: `// Drift Detection:
// Kolmogorov-Smirnov Test: p-value < 0.01 (Telemetry distribution has shifted) ➔ Auto-triggers model retraining.`
  },
  {
    id: 24,
    question: "What is Case Management & SLA Tracking in SOAR platforms under regulatory compliance (e.g., CERT-In 6-Hour Reporting)?",
    shortAnswer: "SOAR automatically tracks incident lifecycle milestones (Triage, Containment, Eradication, Notification) against legal SLAs (e.g., India CERT-In mandate requiring cyber incident reporting within 6 hours of discovery), automatically generating regulatory disclosure dossiers.",
    explanation: "Automated SLA tracking avoids severe financial penalties for delayed regulatory incident reporting.",
    hint: "Tracks incident containment milestones to comply with CERT-In 6-hour reporting mandates.",
    level: "Basic",
    codeExample: `// CERT-In SLA Timer:
// Incident Confirmed: 14:00 IST → SOAR countdown timer: "CERT-In Notification Due in: 05:59:42" → Auto-drafts report.`
  },
  {
    id: 25,
    question: "How does AI detect Fast Flux and Domain Fluxing in bulletproof hosting networks?",
    shortAnswer: "Fast Flux rapidly swaps DNS A-records (IPs) for a single domain name every few seconds to evade IP-based blocking. AI models evaluate the churn rate, geographical dispersion of resolved IPs, TTL values (< 60s), and autonomous system number (ASN) entropy in real-time DNS streams.",
    explanation: "High IP churn combined with diverse global ASNs reliably flags criminal botnet infrastructure.",
    hint: "Detects rapid IP address swapping, ultra-low TTLs, and diverse global ASNs for a single domain.",
    level: "Expert",
    codeExample: `// Fast Flux Profile:
// Domain: "update-bank.in" | TTL: 10s | Resolved 150 distinct IPs across 40 countries in 10 mins ➔ FAST FLUX C2 🚨`
  },
  {
    id: 26,
    question: "What is Predictive Threat Modeling using AI-generated Attack Trees?",
    shortAnswer: "AI systems analyze cloud infrastructure architecture diagrams, IAM policies, and open ports to automatically generate comprehensive attack trees, predicting the most probable multi-step paths an adversary will take to reach crown-jewel databases.",
    explanation: "Predictive attack trees allow engineers to eliminate high-risk paths before attackers discover them.",
    hint: "Automatically generates attack trees from cloud architecture diagrams to predict breach pathways.",
    level: "Moderate",
    codeExample: `// Attack Tree Path:
// Internet ➔ Vulnerable Web App (CVE-2026-X) ➔ Stolen IAM Role ➔ S3 Data Exfiltration (Probability: 84%)`
  },
  {
    id: 27,
    question: "What is Multi-Tenancy Data Isolation in Cloud SOAR platforms?",
    shortAnswer: "Architectural separation ensuring that security telemetry, playbooks, and incident cases for Tenant A (e.g., Barrackpore Treasury) are cryptographically isolated and logically segregated from Tenant B (e.g., Private FinTech Bank) on shared cloud infrastructure.",
    explanation: "Strict isolation prevents cross-tenant data leaks and satisfies PCI-DSS compliance.",
    hint: "Cryptographic and logical separation of security telemetry between different corporate clients.",
    level: "Moderate",
    codeExample: `// Multi-Tenant Isolation:
// Query: SELECT * FROM incidents WHERE tenant_id = 'tenant_barrackpore_gov' (Enforced at database row-level)`
  },
  {
    id: 28,
    question: "How does SOAR automate Credential Revocation and Forced Passkey Step-Up across federated cloud apps?",
    shortAnswer: "Upon detecting a compromised session, the SOAR playbook sends API calls to the Identity Provider (Okta / Entra ID) to: 1. Revoke all active refresh tokens; 2. Terminate active SSO session cookies; 3. Flag user risk status to HIGH, forcing mandatory FIDO2 hardware passkey re-authentication.",
    explanation: "This instantly neutralizes stolen session cookies across all connected corporate SaaS apps.",
    hint: "Calls IdP APIs to revoke refresh tokens, kill session cookies, and force hardware passkey login.",
    level: "Basic",
    codeExample: `// Identity Containment Call:
// POST https://graph.microsoft.com/v1.0/users/{id}/revokeSignInSessions → Invalidates all active cookies in 100ms.`
  },
  {
    id: 29,
    question: "In a forensic drill at a Salt Lake Sector V FinTech, an automated SOAR playbook isolated a production server hosting an active database, causing a ₹12,00,000 transaction processing outage. What architectural fix was deployed?",
    shortAnswer: "Engineers implemented Risk-Tiered Step-Up Containment with Human-in-the-Loop (HITL): for tier-1 non-critical assets, automated host isolation executes instantly. For mission-critical production database clusters (Crown Jewels), the playbook executes non-disruptive micro-segmentation (blocking only suspicious egress ports) while sending an urgent 60-second interactive approval prompt to the Lead SOC Architect before full isolation.",
    explanation: "Differentiating critical crown jewels from standard endpoints prevents automated response tools from causing self-inflicted business outages.",
    hint: "Risk-tiered containment: auto-isolate non-critical endpoints, but require HITL approval for crown jewels.",
    level: "Expert",
    codeExample: `// Tiered Playbook Logic:
// IF asset.criticality == "CROWN_JEWEL":
//   Apply egress micro-segmentation + Prompt Lead Architect [ISOLATE / KEEP LIVE]
// ELSE:
//   Execute full instant host isolation ✔`
  },
  {
    id: 30,
    question: "Write out the complete end-to-end technical blueprint for an Automated Ransomware Containment SOAR Playbook.",
    shortAnswer: "1. Trigger: EDR alert detects high-frequency file renaming/encryption. 2. Verification: AI confirms malicious process hash via Threat Intel API. 3. Sub-Second Containment: Isolate host via EDR API, revoke user OAuth sessions via IdP API, push C2 IP block to firewalls. 4. Evidence Preservation: Snapshot VM RAM and disk to forensic cloud bucket. 5. Governance: File P1 Jira ticket, notify CISO via Teams, and start CERT-In 6-hour SLA reporting timer.",
    explanation: "This complete automated playbook executes end-to-end containment in under 2 seconds, completely neutralizing ransomware before disk encryption spreads.",
    hint: "Trigger → Verify → Isolate host & revoke tokens & block IP → Snapshot RAM → Notify & start SLA timer.",
    level: "Expert",
    codeExample: `// Complete Ransomware SOAR Playbook:
// [EDR Alert] ➔ [Threat Intel Enrichment] ➔ [Host Isolation (150ms)] ➔ [IdP Session Revoke (80ms)] ➔ [Firewall IP Block (50ms)] ➔ [Forensic Memory Snapshot] ➔ [CERT-In SLA Timer Started]`
  }
];

export default questions;
