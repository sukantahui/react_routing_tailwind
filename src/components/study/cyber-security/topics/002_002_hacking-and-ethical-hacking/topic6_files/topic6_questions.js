const questions = [
  {
    question: "What is the primary operational distinction between a 'Red Team', a 'Blue Team', and a 'Purple Team' in enterprise cybersecurity?",
    shortAnswer: "Red Teams emulate offensive adversaries; Blue Teams defend, detect, and respond; Purple Teams integrate both to collaboratively test and optimize defensive detection rules in real-time.",
    explanation: "In modern cybersecurity operations: 1. The Red Team plays the role of an advanced adversary (emulating real-world nation-state or ransomware TTPs) to achieve specific operational objectives; 2. The Blue Team acts as the internal defenders (SOC analysts, incident responders, threat hunters) monitoring telemetry to detect and contain attacks; 3. The Purple Team is not a permanent separate team, but a collaborative working group where Red and Blue sit together, executing atomic attacks and tuning SIEM/EDR detection rules in a continuous closed feedback loop.",
    hint: "Think about the offensive team (Red), the defensive team (Blue), and the collaborative testing group (Purple).",
    level: "basic",
    codeExample: `// Team Dynamics Triad:
Red Team:    Offensive Adversary Emulation → Goal: Test security posture & evade detection
Blue Team:   Defensive SOC & Incident Response → Goal: Detect, isolate, and eradicate threats
Purple Team: Collaborative Feedback Loop → Goal: Rapidly optimize detection engineering`
  },
  {
    question: "What are the primary metrics used to evaluate the efficiency and maturity of an enterprise Blue Team SOC?",
    shortAnswer: "MTTD (Mean Time to Detect), MTTA (Mean Time to Acknowledge), MTTR (Mean Time to Respond/Remediate), and Adversary Dwell Time.",
    explanation: "Blue Team performance is quantified through time-to-containment metrics: 1. MTTD (Mean Time to Detect) measures the duration from when an adversary breaches the network to when an alert triggers; 2. MTTA (Mean Time to Acknowledge) measures how fast an analyst begins triage; 3. MTTR (Mean Time to Respond/Remediate) measures how quickly the threat is contained; 4. Dwell Time measures the total duration an attacker remains undetected inside the network (industry average is ~10-16 days).",
    hint: "Think of MTTD (Detect), MTTA (Acknowledge), MTTR (Respond), and attacker dwell time.",
    level: "moderate",
    codeExample: `// Blue Team Efficiency Metrics:
MTTD (Mean Time to Detect)     = Time_Alert_Fired - Time_Attacker_Breached;
MTTR (Mean Time to Respond)    = Time_Threat_Contained - Time_Alert_Fired;
Total Adversary Dwell Time     = MTTD + MTTR; // Target: < 1 Hour (1-10-60 Rule)`
  },
  {
    question: "What is the '1-10-60 Rule' benchmark pioneered by CrowdStrike for enterprise threat detection and containment?",
    shortAnswer: "1 minute to detect an intrusion, 10 minutes to investigate and triage the alert, and 60 minutes to isolate and remediate the compromised endpoint.",
    explanation: "Because advanced ransomware affiliates and nation-state threat actors can move laterally across internal networks within 90 minutes of initial compromise (known as 'breakout time'), the 1-10-60 benchmark requires: 1 Minute for automated EDR/SIEM detection; 10 Minutes for a SOC Tier 2 analyst to verify the true-positive; and 60 Minutes for the incident response team to isolate the host, revoke compromised credentials, and eradicate the persistence mechanism.",
    hint: "Remember the 1-10-60 rule: 1 min to detect, 10 mins to investigate, 60 mins to contain.",
    level: "moderate",
    codeExample: `// The 1-10-60 SOC Operational Benchmark:
[ 01 Minute ]  → Automated EDR / SIEM Alert Generation
[ 10 Minutes ] → Human SOC Tier 2 Analyst Triage & Threat Verification
[ 60 Minutes ] → Full Host Isolation, Credential Revocation & Malicious Process Kill`
  },
  {
    question: "How does a 'Purple Team Exercise' conduct 'Atomic Testing' using frameworks like Atomic Red Team or MITRE Caldera?",
    shortAnswer: "By executing small, isolated, scriptable attack techniques (e.g., dumping LSASS memory) and immediately checking whether the Blue Team's EDR/SIEM generated an alert.",
    explanation: "Rather than running a full unannounced 3-week stealth red team campaign, a Purple Team exercise is open and collaborative. The team picks a specific MITRE ATT&CK technique (e.g., `T1003.001 - OS Credential Dumping: LSASS Memory`). The Red Team runs a single atomic command. If the Blue Team's EDR detects it, they celebrate; if it bypasses detection, both teams immediately collaborate to write a new Sigma detection rule or adjust EDR behavioral heuristics in real time.",
    hint: "Think about testing one specific attack technique at a time while the defenders watch their screens in real time.",
    level: "moderate",
    codeExample: `// Atomic Red Team Test Execution (T1003.001):
Invoke-AtomicTest T1003.001 -TestNumbers 1
// Action: Dumps LSASS memory via comsvcs.dll
// Blue Team Observation: Checks if Sysmon Event ID 10 or EDR Alert fired.`
  },
  {
    question: "What is the 6-stage Incident Response lifecycle defined by SANS and NIST SP 800-61?",
    shortAnswer: "1. Preparation, 2. Identification (Detection), 3. Containment, 4. Eradication, 5. Recovery, and 6. Lessons Learned.",
    explanation: "The NIST/SANS Incident Response process guides the Blue Team during an active breach: 1. Preparation (playbooks, tools, training); 2. Identification (detecting and analyzing IOCs); 3. Containment (short-term host isolation and long-term network segmentation); 4. Eradication (removing malware, deleting persistence, resetting passwords); 5. Recovery (restoring systems from clean backups and validating monitoring); 6. Lessons Learned (post-incident forensic review and policy updates).",
    hint: "Recall the 6 steps: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.",
    level: "basic",
    codeExample: `// SANS / NIST IR 6-Stage Lifecycle:
1. Preparation   → Playbooks, EDR agents, backups, communication channels
2. Identification → Correlating SIEM logs & verifying true-positive incident
3. Containment   → Isolating infected subnet to stop lateral spread
4. Eradication   → Removing webshells, terminating C2 processes, resetting passwords
5. Recovery      → Restoring clean database backups and validating uptime
6. Lessons Learn → Post-mortem analysis and tuning detection rules`
  },
  {
    question: "What are 'Indicators of Compromise' (IOCs) versus 'Indicators of Attack' (IOAs) in Blue Team threat detection?",
    shortAnswer: "IOCs are static forensic evidence left behind by an attack (file hashes, known bad IPs); IOAs identify the dynamic behavioral intent and execution technique of the attacker in real-time.",
    explanation: "IOCs are reactive and forensic (e.g., 'the SHA-256 hash of this malware is `e3b0c44...`' or 'the C2 server is `198.51.100.23`'). Because attackers easily alter file hashes by adding junk bytes and change IP addresses daily, IOC-based detection frequently fails. IOAs (Indicators of Attack) are proactive and behavioral (e.g., 'detecting Microsoft Word spawning `powershell.exe` which executes an unquoted base64 string'), detecting the malicious intent regardless of the specific malware hash.",
    hint: "Think of IOCs as physical fingerprints left at a crime scene versus IOAs as watching someone actively pick a lock.",
    level: "expert",
    codeExample: `// IOC vs IOA Distinction:
IOC (Static Hash): MD5: d41d8cd98f00b204e9800998ecf8427e (Easily changed by recompiling)
IOA (Behavioral):  Parent_Process="WINWORD.EXE" → Child_Process="CMD.EXE" → Network_Egress=True`
  },
  {
    question: "What is the 'Pyramid of Pain' conceptualized by David Bianco, and why are 'TTPs' at the top of the pyramid?",
    shortAnswer: "It categorizes threat indicators by how difficult it is for an adversary to change them; TTPs (Tactics, Techniques, and Procedures) are hardest to change, making behavioral detection most painful for attackers.",
    explanation: "The Pyramid of Pain illustrates that detecting Hash Values (Trivial to change), IP Addresses (Easy to change), Domain Names (Simple to change), Network/Host Artifacts (Annoying), and Tools (Challenging) only causes temporary inconvenience to attackers. Detecting and blocking TTPs (Tactics, Techniques, and Procedures at the apex) forces the adversary to invent entirely new offensive behaviors and software architectures, which is extremely expensive and time-consuming.",
    hint: "Think of the triangle where hash values are at the easy bottom and TTPs are at the painful top.",
    level: "expert",
    codeExample: `// The Pyramid of Pain (From Bottom to Top):
1. Hash Values         → Trivial for attacker to modify (Re-pack binary)
2. IP Addresses        → Easy (Change proxy / VPS)
3. Domain Names        → Simple (DGA / Fast-flux DNS)
4. Network Artifacts   → Annoying (Alter User-Agent)
5. Tools               → Challenging (Write new custom exploit)
6. TTPs                → TOUGH / PAINFUL (Forces adversary to invent new attack methodology)`
  },
  {
    question: "What is a 'C2 Framework' (Command and Control), and how do Red Teams use 'Malleable C2 Profiles' with Cobalt Strike or Sliver?",
    shortAnswer: "Software providing remote beacon control over compromised hosts; Malleable C2 profiles disguise beacon network traffic to look like legitimate Amazon, Google, or Office 365 traffic.",
    explanation: "Command and Control (C2) frameworks manage post-exploitation activities (shell access, file upload/download, lateral movement). Malleable C2 profiles allow Red Team operators to rewrite the HTTP/HTTPS request headers, URI paths, cookie parameters, and encryption algorithms of their beaconing traffic, mimicking legitimate traffic (e.g., mimicking YouTube video streaming or Bing API queries) to completely blend in and evade Blue Team network anomaly detectors.",
    hint: "Think about disguising malicious hacker network traffic so it looks identical to normal Microsoft Office or Netflix traffic.",
    level: "expert",
    codeExample: `// Cobalt Strike Malleable C2 Profile Snippet:
http-get {
    set uri "/api/v1/telemetry/heartbeat";
    client {
        header "Host" "legitimate-cloud-service.com";
        header "User-Agent" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
        metadata {
            base64url;
            prepend "SESSION_ID=";
            header "Cookie";
        }
    }
}`
  },
  {
    question: "What is 'SOAR' (Security Orchestration, Automation, and Response), and how does it assist Blue Team SOC analysts during high-volume alert floods?",
    shortAnswer: "SOAR automates repetitive incident response workflows (e.g., isolating a host, querying VirusTotal, blocking an IP on firewalls) without requiring manual analyst clicks.",
    explanation: "Modern enterprise SOCs receive 10,000+ security alerts daily, leading to analyst burnout and alert fatigue. SOAR platforms (e.g., Splunk Phantom, Palo Alto Cortex XSOAR) execute automated 'Playbooks'. For example, upon detecting a phishing email alert, the SOAR automatically extracts the attachment, detonates it in an automated sandbox, queries VirusTotal API, deletes the email from all 5,000 employee mailboxes, and blocks the sender domain on the firewall in under 3 seconds.",
    hint: "Think of an automated robotic assistant that executes standard security steps instantly without waiting for a human.",
    level: "moderate",
    codeExample: `// SOAR Phishing Playbook Workflow:
Trigger: Phishing Alert in User Inbox
Step 1: Extract URL → Query VirusTotal API
Step 2: If Reputation == Malicious → Block URL on Palo Alto Firewall
Step 3: Search Exchange Server → Delete email from all employee inboxes
Step 4: Notify SOC Analyst on Slack → Close ticket automatically (Time: 2.8s)`
  },
  {
    question: "What is 'Sigma Rule' format, and how does it enable universal detection engineering across different SIEM platforms?",
    shortAnswer: "A generic, open-source YAML-based signature format for log events that can be converted into queries for Splunk, Elastic, Sentinel, QRadar, and Graylog.",
    explanation: "Historically, writing a detection rule for Splunk required proprietary SPL syntax, which could not be used in Elastic (KQL) or Microsoft Sentinel (KQL). Sigma provides a standardized, vendor-agnostic YAML format defining the log source, detection logic, and false-positive criteria. Using the `sigmac` or `pySigma` compiler, a single Sigma rule authored by a Purple Team can be compiled instantly into Splunk SPL, Elastic DSL, or Azure Sentinel KQL.",
    hint: "Think of the universal language for writing log detection rules that translates into any SIEM query language.",
    level: "moderate",
    codeExample: `// Sigma Detection Rule Example:
title: Mimikatz LSASS Dump via Comsvcs.dll
logsource:
    category: process_creation
    product: windows
detection:
    selection:
        Image|endswith: '\\rundll32.exe'
        CommandLine|contains|all:
            - 'comsvcs.dll'
            - 'MiniDump'
    condition: selection
level: critical`
  },
  {
    question: "What is 'Kerberoasting', and how do Red Teams exploit Active Directory Kerberos tickets to crack service account passwords offline?",
    shortAnswer: "Requesting Kerberos Service Principal Name (SPN) tickets for service accounts as a standard domain user, and cracking the RC4/AES encrypted ticket hash offline using Hashcat.",
    explanation: "In Active Directory, any authenticated domain user (even a low-privileged intern account) can request a Kerberos TGS (Ticket Granting Service) ticket for any service registered with an SPN (e.g., SQL Server or IIS). Because the ticket is encrypted using the password hash of the service account, the attacker extracts the ticket hash from memory and cracks it offline using dictionary attacks without triggering Active Directory account lockouts.",
    hint: "Think about legally requesting a service ticket from Active Directory and cracking its encryption password offline on your own GPU.",
    level: "expert",
    codeExample: `// Kerberoasting Execution:
// 1. Request TGS ticket for SQL Server SPN:
Add-Type -AssemblyName System.IdentityModel
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList "MSSQLSvc/db01.corp:1433"
// 2. Extract ticket hash with Mimikatz → Crack offline via Hashcat Mode 13100 (Kerberos 5 TGS)`
  },
  {
    question: "How does the 'MITRE ATT&CK Framework' provide a common taxonomy connecting Red, Blue, and Purple teams?",
    shortAnswer: "By cataloging real-world adversary behaviors into 14 sequential Tactics (goals) and hundreds of specific Techniques (methods), providing a standardized matrix.",
    explanation: "Developed by the MITRE Corporation, ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) organizes offensive tradecraft into 14 lifecycle tactics: Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, and Impact. Red teams use it to plan realistic campaigns; Blue teams use it to map detection coverage; Purple teams use it to track gap remediation.",
    hint: "Recall the comprehensive matrix mapping all hacker tactics and techniques created by MITRE.",
    level: "basic",
    codeExample: `// MITRE ATT&CK Matrix Hierarchy:
Tactic:      Credential Access (TA0006) - The attacker's objective
Technique:   OS Credential Dumping (T1003) - The general method
Sub-Techniq: LSASS Memory (T1003.001) - The exact execution blueprint`
  },
  {
    question: "What is 'Threat Hunting', and how does a Blue Team Threat Hunter formulate a 'Hypothesis'?",
    shortAnswer: "Proactively searching through log telemetry based on the assumption that adversaries have already bypassed automated alerts; hypotheses are based on new threat intel or MITRE TTPs.",
    explanation: "Unlike reactive SOC analysts who wait for SIEM alerts to trigger, a Threat Hunter starts with an informed hypothesis: e.g., 'Given that the BlackCat ransomware cartel is exploiting living-off-the-land techniques, our developers may have unmonitored PowerShell instances downloading remote scripts.' The hunter writes custom queries across 6 months of historical EDR logs to search for anomalous process ancestry, beaconing intervals, and unquoted service paths.",
    hint: "Think of an investigator starting with an educated hunch: 'An intruder might be hiding in the attic using a disguise.'",
    level: "moderate",
    codeExample: `// Threat Hunting Hypothesis Query:
// Hypothesis: Attackers are using Certutil.exe to download remote payloads:
index=endpoint_logs process_name="certutil.exe" command_line="*-urlcache*"
| table _time, host, user, command_line`
  },
  {
    question: "What is a 'Honeytoken' or 'Canary Account', and how does a Blue Team use it to detect unauthorized internal reconnaissance?",
    shortAnswer: "A fake high-privileged credential or document planted in systems that triggers an immediate high-priority alarm the instant anyone touches or uses it.",
    explanation: "Blue teams plant fake assets with no legitimate business use: e.g., an Active Directory account named `admin_sql_backup` with a fake SPN, or a Word document on a file share named `Executive_Salaries_2026.docx` containing a web-beacon URL. Because legitimate employees never interact with these decoy assets, any attempt by a Red Team or Black Hat to query the account or open the document triggers an immediate 100% true-positive breach alert.",
    hint: "Think of a fake wallet left in an office drawer that screams and calls security the moment someone picks it up.",
    level: "moderate",
    codeExample: `// Honeytoken Deployment:
Decoy User: svc_oracle_superadmin (Never used by real applications)
Alert Logic: If Event_ID=4624 (Logon) AND User="svc_oracle_superadmin" → 
             Trigger SEVERITY-1 CRITICAL BREACH ALERT (Host compromised)`
  },
  {
    question: "What is the difference between 'SOC Tier 1', 'SOC Tier 2', and 'SOC Tier 3' analysts in a modern Security Operations Center?",
    shortAnswer: "Tier 1: Triage and filter false-positive alerts; Tier 2: Deep incident investigation and containment; Tier 3: Advanced threat hunting, malware reverse engineering, and forensic root-cause analysis.",
    explanation: "A structured SOC operates in three escalation tiers: Tier 1 (Alert Analysts) monitors real-time SIEM consoles 24/7, reviewing incoming alarms and dismissing false positives within 10 minutes. If an alert is suspicious, it escalates to Tier 2 (Incident Responders), who analyze host telemetry, isolate endpoints, and perform containment. Tier 3 (Threat Hunters & Senior Specialists) handles complex persistent breaches, reverse-engineers novel malware, and designs detection architectures.",
    hint: "Remember the 3 tiers: Tier 1 (Triage), Tier 2 (Investigation & Containment), Tier 3 (Hunting & Forensics).",
    level: "basic",
    codeExample: `// SOC Escalation Pipeline:
[ Incoming 10,000 Daily Alerts ]
          ↓
[ SOC Tier 1: Alert Triage ] → Filters 9,800 False Positives
          ↓ (200 Escalations)
[ SOC Tier 2: Incident Response ] → Isolates hosts & remediates incidents
          ↓ (10 Complex Cases)
[ SOC Tier 3: Threat Hunting & Forensics ] → Reverses malware & authors detection rules`
  },
  {
    question: "What is 'Active Directory BloodHound', and how do Red Teams use graph theory to find shortest attack paths to Domain Admin?",
    shortAnswer: "A tool that models Active Directory objects, permissions, and session tokens as a directed graph, revealing hidden privilege escalation and ACL abuse paths.",
    explanation: "Active Directory environments contain millions of complex relationships (Group memberships, Local Admin rights, User sessions, ACL permissions). BloodHound uses graph databases (Neo4j) to visualize these relationships. A Red Team operator can query: 'Show shortest path from `Guest_User` to `Domain_Admin`'. BloodHound might reveal that the guest user can write to a service group, which has local admin on an engineer's laptop, where a Domain Admin's session token is currently cached in LSASS.",
    hint: "Think of a GPS navigation map that shows hackers the exact shortcut path to take over the entire corporate network.",
    level: "expert",
    codeExample: `// BloodHound Graph Query (Cypher):
// Find shortest path from current compromised user to Domain Admin:
MATCH (m:User {name:'MAMATA@CORP.LOCAL'}), (n:Group {name:'DOMAIN ADMINS@CORP.LOCAL'}), 
p=shortestPath((m)-[*1..15]->(n)) RETURN p`
  },
  {
    question: "What is 'Continuous Automated Red Teaming' (CART) / 'Breach and Attack Simulation' (BAS)?",
    shortAnswer: "Software platforms that automatically run non-destructive simulated attacks 24/7 across an enterprise to continuously test and validate defensive security controls.",
    explanation: "Traditional human Red Team exercises occur once or twice a year. Breach and Attack Simulation (BAS) tools (e.g., Picus Security, Cymulate, AttackIQ) deploy lightweight agents that simulate thousands of MITRE ATT&CK techniques daily (e.g., simulating ransomware execution, credential dumping, data exfiltration) across all corporate endpoints. BAS provides real-time dashboards showing exactly which percentage of attacks are successfully blocked by firewalls and EDR agents.",
    hint: "Think about an automated robot testing your door locks every single hour of every day to ensure they work.",
    level: "moderate",
    codeExample: `// BAS Continuous Testing Cycle:
01:00 AM: Simulate T1059 (PowerShell Encoded Command) → Result: BLOCKED by EDR (Pass)
01:15 AM: Simulate T1003 (LSASS Memory Read)          → Result: MISSED by SIEM (Fail → Alert Purple Team)`
  },
  {
    question: "Under the CERT-In Directives of 2022 in India, what is the mandatory reporting timeline for a Blue Team upon confirming a cyber security incident?",
    shortAnswer: "Mandatory reporting to CERT-In within 6 hours of noticing or confirming the cybersecurity incident.",
    explanation: "Under Section 70B(6) of the Information Technology Act 2000, CERT-In issued binding directions in April 2022. All organizations, intermediaries, service providers, and data centers in India must report designated cybersecurity incidents (including ransomware, data breaches, unauthorized server access, and identity compromises) to CERT-In (`incident@cert-in.org.in`) within 6 hours of confirmation.",
    hint: "Remember the strict 6-hour incident reporting window under Indian cybersecurity law.",
    level: "basic",
    codeExample: `// Indian Legal Incident Reporting Mandate:
Incident Type: Ransomware / Critical Infrastructure Compromise
Statutory Agency: Indian Computer Emergency Response Team (CERT-In)
Statutory Window: WITHIN 6 HOURS of Confirmation
Statute: Section 70B of Information Technology Act, 2000`
  },
  {
    question: "What is 'EDR Evasion' via 'Direct System Calls' (Syscalls), and how do advanced Red Teams bypass API hooks in Windows EDRs?",
    shortAnswer: "Bypassing user-mode EDR DLL hooks (in ntdll.dll) by issuing low-level CPU assembly `syscall` instructions directly to the Windows kernel.",
    explanation: "Most Windows EDR solutions monitor endpoint activity by injecting a DLL into running processes and placing software hooks (inline `jmp` instructions) on sensitive API functions like `NtAllocateVirtualMemory` or `NtCreateThreadEx` inside `ntdll.dll`. Advanced Red Teams use techniques like SysWhispers to execute raw assembly `syscall` instructions with the appropriate SSN (System Service Number), communicating directly with the Windows kernel (`ntoskrnl.exe`) while completely bypassing the EDR's user-mode hooks.",
    hint: "Think about talking directly to the king (kernel) rather than the security guard at the gate (EDR user-mode hook).",
    level: "expert",
    codeExample: `// Direct System Call (x64 Assembly):
mov r10, rcx
mov eax, 0x18      // System Service Number (SSN) for NtAllocateVirtualMemory
syscall            // Jumps directly to kernel mode, bypassing user-mode EDR hook!
ret`
  },
  {
    question: "Synthesizing the Red, Blue, and Purple Team collaboration: why is an antagonistic relationship between Red and Blue teams detrimental to enterprise defense?",
    shortAnswer: "Because the true goal is not for Red to 'win' or embarrass Blue, but to elevate enterprise resilience; mutual collaboration and Purple teaming maximize security posture.",
    explanation: "In immature organizations, Red Teams view exercises as an ego competition to humiliate the Blue Team, while Blue Teams view Red Teams as disruptive nuisances. In elite organizations, Red and Blue operate as cooperative partners. The Red Team's highest value is not executing stealthy exploits, but clearly explaining to the Blue Team exactly how the exploit worked, sharing IoCs, and helping defenders write impenetrable detection rules.",
    hint: "Conclude by recognizing that security is a collaborative team sport where Red and Blue unite to defeat real-world adversaries.",
    level: "expert",
    codeExample: `// The Purple Team Security Creed:
"Red without Blue is just vandalism; Blue without Red is blind complacency; Red and Blue united as Purple is unbreakable defense."`
  }
];

export default questions;
