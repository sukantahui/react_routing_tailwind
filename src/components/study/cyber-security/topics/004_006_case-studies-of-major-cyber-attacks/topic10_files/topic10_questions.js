// topic10_questions.js
// 30 Comprehensive Questions on Topic 10: Incident Response Timeline and Post-Mortem Analysis

const questions = [
  {
    id: 1,
    question: "What are the six standard phases of the Incident Response lifecycle as defined by NIST SP 800-61 Rev 2 and SANS?",
    shortAnswer: "1. Preparation; 2. Identification (Detection & Analysis); 3. Containment; 4. Eradication; 5. Recovery; 6. Lessons Learned (Post-Mortem).",
    explanation: "This structured circular framework ensures that organizations are pre-configured to detect threats, isolate infected systems rapidly, permanently eliminate adversary footholds, safely restore operations, and feed operational insights back into preparation.",
    hint: "Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned.",
    level: "Moderate",
    codeExample: `// NIST SP 800-61 Incident Response Lifecycle:
const nistIrLifecycle = [
  "Phase 1: Preparation (Tooling, Playbooks, Communication Channels, Training)",
  "Phase 2: Identification (Detection, Triage, Severity Classification, IOC Scope)",
  "Phase 3: Containment (Short-Term Isolation, Long-Term Sandboxing, Evidence Preservation)",
  "Phase 4: Eradication (Malware Removal, Rootkit Purge, Credential Invalidation)",
  "Phase 5: Recovery (Restoration from Clean Backups, Gradual Production Re-entry)",
  "Phase 6: Lessons Learned (Root Cause Analysis, 5 Whys, Blameless Post-Mortem)"
];`
  },
  {
    id: 2,
    question: "What is a 'Forensic Super-Timeline' and what open-source framework is standard for generating it?",
    shortAnswer: "A unified, chronological aggregation of all system events (file creation, registry modifications, web logs, authentication events, memory artifacts); generated using Plaso / log2timeline.",
    explanation: "During an incident, analysts must correlate disparate artifacts across multiple machines. A super-timeline merges Windows Event Logs, $MFT file system MACB timestamps, browser history, and network netflows into a single millisecond-accurate timeline to reconstruct the adversary's exact actions.",
    hint: "A chronological aggregation of all system and network artifacts created by log2timeline / Plaso.",
    level: "Expert",
    codeExample: `// Plaso / log2timeline Command Execution:
// 1. Extract artifacts from raw forensic disk image:
// log2timeline.py --parsers "win7,mft,evt,esedb" /cases/case01/timeline.plaso /evidence/disk_image.raw
// 2. Export human-readable CSV / Elastic timeline:
// psort.py -o l2tcsv -w /cases/case01/super_timeline.csv /cases/case01/timeline.plaso`
  },
  {
    id: 3,
    question: "What are 'MACB Timestamps' in digital forensics and why are they critical during timeline reconstruction?",
    shortAnswer: "Modified (M), Accessed (A), Changed ($MFT metadata change - C), and Born (File Creation - B) timestamps recorded in file system metadata.",
    explanation: "File systems (NTFS, EXT4, APFS) track multiple timestamps. By analyzing the delta between 'Modified' and 'Born' timestamps, forensic investigators detect 'Timestomping'—an anti-forensic evasion technique where adversaries backdate malware creation dates to match legitimate Windows system binaries.",
    hint: "Modified, Accessed, Changed, and Born file system metadata timestamps.",
    level: "Moderate",
    codeExample: `// NTFS $STANDARD_INFORMATION vs $FILE_NAME Timestamps:
// Normal File: M, A, C, B match expected application installation dates
// Timestomped Malware (e.g. dropped by Lazarus / Cozy Bear):
// $STANDARD_INFORMATION: 2016-04-12 (Fake forged date)
// $FILE_NAME (Kernel-protected): 2026-08-23 03:14:22 UTC (Real drop date! Caught!)`
  },
  {
    id: 4,
    question: "What is the distinction between 'Short-Term Containment' and 'Long-Term Containment' during an active breach?",
    shortAnswer: "Short-Term Containment isolates infected endpoints immediately to stop lateral spread; Long-Term Containment establishes sandboxed monitoring to observe attacker infrastructure before clean rebuilds.",
    explanation: "Short-term actions include pulling the network cable, dropping switch ports, or executing EDR network isolation. Long-term containment involves rerouting attacker C2 traffic to honey-proxies to capture second-stage tools and identify all compromised accounts before tipping off the adversary.",
    hint: "Short-term isolates machines immediately; long-term monitors adversary behavior in sandboxes.",
    level: "Moderate",
    codeExample: `// EDR API Short-Term Host Isolation:
/*
POST /api/v1/endpoints/WKSTN-BARRACKPORE-01/isolate
Payload: { "comment": "Active Cobalt Strike Beacon detected by SOC" }
Result: All inbound/outbound IP traffic blocked except encrypted EDR management tunnel!
*/`
  },
  {
    id: 5,
    question: "What is the mandatory statutory reporting timeline for cyber security incidents under CERT-In (India) regulations?",
    shortAnswer: "Mandatory reporting within 6 hours of noticing or being brought to notice of the incident.",
    explanation: "Under the April 2022 CERT-In Cybersecurity Directions (Section 70B of IT Act 2000), all Indian enterprises, intermediaries, and data centers in Kolkata, Barrackpore, and across India must report specified cyber security incidents (ransomware, data breaches, unauthorized access) to CERT-In within 6 hours.",
    hint: "Mandatory reporting to CERT-In within 6 hours of incident detection.",
    level: "Moderate",
    codeExample: `// CERT-In 6-Hour Incident Notification Rule:
const certInDirectives = {
  jurisdiction: "Republic of India (CERT-In / Ministry of Electronics & IT)",
  mandatoryReportingWindowHours: 6,
  reportableEvents: [
    "Targeted scanning / probing of critical networks",
    "Ransomware attacks and system encryption",
    "Data breaches and unauthorized data access",
    "Compromise of critical systems or identity infrastructure"
  ]
};`
  },
  {
    id: 6,
    question: "What is a 'Blameless Post-Mortem' and why is it essential for building mature cybersecurity culture?",
    shortAnswer: "A post-incident review focused on identifying systemic, technical, and process failures without pointing fingers or punishing individual human employees.",
    explanation: "If employees fear termination for clicking phishing links or reporting configuration errors, they hide security incidents until catastrophic damage occurs. A blameless post-mortem assumes people acted in good faith with the information they had, focusing instead on why organizational guardrails failed to catch or mitigate the error.",
    hint: "Focusing on fixing systemic process gaps without punishing individual human mistakes.",
    level: "Moderate",
    codeExample: `// Blameless Post-Mortem Culture:
// Toxic/Blaming: "Fire Employee X for falling for the phishing email!"
// Blameless/Mature: "Why did our email gateway deliver the malicious payload? Why was single-factor login accepted? Why did host EDR allow PowerShell execution without alert?"`
  },
  {
    id: 7,
    question: "What is the '5 Whys' Root Cause Analysis (RCA) methodology and how is it applied in a post-mortem?",
    shortAnswer: "Iteratively asking 'Why?' five consecutive times to drill down past superficial symptoms to uncover the root organizational and architectural failure.",
    explanation: "A superficial answer to 'Why did ransomware encrypt the server?' is 'Because the port was open.' The 5 Whys technique continues probing until it identifies the underlying governance gap (e.g. lack of automated patch orchestration and failure to budget for vulnerability scanners).",
    hint: "Iteratively asking 'Why?' five times to drill down to fundamental systemic failures.",
    level: "Moderate",
    codeExample: `// 5 Whys Analysis Example (Equifax Scenario):
// 1. Why was database compromised? → Dispute server had an RCE vulnerability (Struts).
// 2. Why was Struts unpatched? → IT never received notice to patch the dispute server.
// 3. Why was notice not received? → No centralized Software Bill of Materials (SBOM) existed.
// 4. Why was there no SBOM? → Software inventory policies did not track nested dependencies.
// 5. Why were policies outdated? → ROOT CAUSE: Lack of executive DevSecOps governance and funding!`
  },
  {
    id: 8,
    question: "What is 'Volatile Memory Forensics' and why must RAM be dumped before powering down a compromised computer?",
    shortAnswer: "RAM contains ephemeral evidence (unencrypted encryption keys, running processes, injected DLLs, network sockets) that is permanently lost the instant power is removed.",
    explanation: "Modern advanced malware (NotPetya, TEARDROP, Stuxnet) executes entirely in memory without creating files on disk. Pulling the power plug destroys this volatile evidence. Investigators use tools like WinPmem or LiME to dump RAM first, then analyze it using Volatility or Rekall.",
    hint: "Capturing running processes, injected code, and encryption keys from RAM before powering down.",
    level: "Expert",
    codeExample: `// Volatile Memory Extraction & Volatility 3 Analysis:
// 1. Capture memory dump using WinPmem:
// winpmem.exe -o C:\\evidence\\memdump.raw
// 2. Analyze network connections & injected code in Volatility 3:
// python3 vol.py -f memdump.raw windows.netscan
// python3 vol.py -f memdump.raw windows.malfind`
  },
  {
    id: 9,
    question: "What is an 'Ishikawa Diagram' (Fishbone Diagram) in post-mortem Root Cause Analysis?",
    shortAnswer: "A visual causal diagram that categorizes potential causes of a failure into People, Process, Technology, Environment, Management, and Measurement.",
    explanation: "Fishbone diagrams structure complex cyber investigations. For a major breach, analysts map findings across categories (e.g. Technology: expired SSL certificate; Process: monthly manual patching; People: lack of MFA training; Management: understaffed SOC) to present a holistic remediation plan to the Board.",
    hint: "A visual diagram mapping root causes into People, Process, Technology, and Management.",
    level: "Moderate",
    codeExample: `// Fishbone / Ishikawa Category Mapping:
const fishboneCategories = {
  people: "Lack of phishing training, administrator credential sharing",
  process: "Unenforced 30-day patch SLA, lack of out-of-band communication plans",
  technology: "Expired SSL inspection certificate, missing host-based firewalls",
  management: "Lack of dedicated CISO reporting to Board, unallocated cybersecurity budget"
};`
  },
  {
    id: 10,
    question: "What is 'Chain of Custody' and why is it mandatory during forensic evidence acquisition?",
    shortAnswer: "A rigorous, legally binding chronological paper and cryptographic trail documenting who collected, handled, transferred, analyzed, and secured forensic evidence.",
    explanation: "If digital evidence is presented in a criminal trial or regulatory enforcement proceeding (DOJ indictment, CERT-In hearing), the opposing counsel will challenge its integrity. Proving chain of custody (with cryptographic SHA-256 hashes matching before and after analysis) ensures evidence admissibility.",
    hint: "Documented legal and cryptographic trail proving evidence was untampered.",
    level: "Moderate",
    codeExample: `// Digital Evidence Chain of Custody Form:
const evidenceRecord = {
  evidenceId: "EVD-2026-0823-01",
  description: "Bit-stream disk image of Dispute Server 'acis_srv01'",
  acquisitionHash_SHA256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  collectedBy: "Analyst Mamata (Coder & Accotax)",
  verificationHashPostAnalysis: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 (MATCH!)",
  storageLocation: "Evidence Vault Locker #3 (Tamper-Sealed)"
};`
  },
  {
    id: 11,
    question: "What is 'Order of Volatility' (RFC 3227) in digital forensic evidence collection?",
    shortAnswer: "The principle of collecting digital evidence starting from the most ephemeral (fastest decaying) data to the most permanent data.",
    explanation: "RFC 3227 establishes the sequence: 1. CPU registers & cache; 2. Routing tables, ARP cache, process table, kernel memory (RAM); 3. Temporary file systems; 4. Hard disks / persistent storage; 5. Remote logging data; 6. Physical topology and network cables.",
    hint: "Collecting evidence from most volatile (RAM, CPU cache) to least volatile (hard disks, tapes).",
    level: "Expert",
    codeExample: `// RFC 3227 Order of Volatility:
const orderOfVolatility = [
  "1. CPU Registers and Cache",
  "2. Main Physical Memory (RAM) & Routing / ARP tables",
  "3. Network State & Active TCP/UDP Sockets",
  "4. Local File System & Disk Storage ($MFT, Registry)",
  "5. Centralized Remote Syslog & SIEM Archives",
  "6. Offline Physical Backups and Tape Archives"
];`
  },
  {
    id: 12,
    question: "What is 'Out-of-Band Incident Communication' and why must it be established during Phase 1 (Preparation)?",
    shortAnswer: "Pre-configured communication channels (e.g. Signal groups, non-domain cellular phones) used when corporate email and Teams are compromised by adversaries.",
    explanation: "In breaches like Sony, SolarWinds, and Colonial Pipeline, adversaries read corporate email in real time. If the incident commander sends emails saying 'We are isolating the compromised server at 14:00', the attacker immediately detonates wipers or purges logs. Out-of-band channels prevent adversary eavesdropping.",
    hint: "Secure communication channels like Signal used when corporate email is compromised.",
    level: "Moderate",
    codeExample: `// Out-of-Band War Room Protocol:
const warRoomProtocol = {
  primaryChannel: "End-to-End Encrypted Signal Group on Non-Domain Mobile Devices",
  voiceBridge: "Dedicated Out-of-Band Bridge (External to corporate Zoom/Teams)",
  documentSharing: "Air-gapped offline encrypted USB drives or zero-knowledge cloud vaults"
};`
  },
  {
    id: 13,
    question: "What is the difference between an 'Indicator of Compromise' (IOC) and an 'Indicator of Attack' (IOA)?",
    shortAnswer: "IOCs are reactive forensic artifacts proving an infection already occurred (file hashes, known C2 IPs); IOAs are proactive behavioral patterns indicating an active intrusion in progress.",
    explanation: "An IOC is like finding a spent bullet casing (e.g. MD5 hash of WannaCry `tasksche.exe`). An IOA is observing someone picking a lock in real time (e.g. `cmd.exe` spawning `powershell.exe` to run encoded Base64 commands and execute `vssadmin delete shadows`).",
    hint: "IOCs are historical forensic signatures; IOAs are real-time adversary behaviors.",
    level: "Moderate",
    codeExample: `// IOC vs IOA Example:
// IOC (Reactive): SHA-256 = 84c82835a5d21bbcf75a61706d8ab549... (Static signature)
// IOA (Proactive Behavior): Process = 'lsass.exe' injected by non-system parent process + anomalous memory dump`
  },
  {
    id: 14,
    question: "What is 'Eradication' and why is simply deleting a malware `.exe` file insufficient?",
    shortAnswer: "Eradication requires finding and eliminating all persistence mechanisms (scheduled tasks, registry run keys, web shells, compromised service accounts, and backdoored binaries).",
    explanation: "Adversaries (Sony, SolarWinds, Equifax) leave multiple redundant backdoors. Deleting the primary executable leaves behind hidden JSP web shells, Golden SAML keys, or malicious Scheduled Tasks that reinstall the malware within minutes of rebooting.",
    hint: "Permanently removing all scheduled tasks, registry run keys, web shells, and backdoors.",
    level: "Moderate",
    codeExample: `// Comprehensive Eradication Checklist:
const eradicationSteps = [
  "1. Terminate malicious processes and kernel drivers",
  "2. Delete all dropped web shells (/var/www/html/logo.jsp)",
  "3. Purge persistence (Scheduled Tasks, WMI Event Subscriptions, Registry Run keys)",
  "4. Reset passwords across ALL Active Directory user and service accounts",
  "5. Rotate Kerberos KRBTGT master password hash TWICE (Purges Golden Tickets)",
  "6. Revoke and reissue compromised SSL/TLS and ADFS token-signing certificates"
];`
  },
  {
    id: 15,
    question: "What is 'Safe Recovery' and how does an organization prevent immediate reinfection during system restoration?",
    shortAnswer: "Restoring systems into an isolated quarantine network, applying all missing patches, rotating all credentials, and verifying EDR telemetry before reconnecting to production.",
    explanation: "Rushing to restore backups without patching the initial vulnerability (e.g. restoring unpatched Apache Struts) guarantees immediate re-exploitation. Safe recovery follows a phased, segmented reconnect plan under 24/7 SOC heightened surveillance.",
    hint: "Restoring in isolated networks, applying patches, rotating credentials before reconnection.",
    level: "Moderate",
    codeExample: `// Phased Safe Recovery Staging:
// Phase 1: Restore golden OS image in Isolated Staging VLAN (No Internet)
// Phase 2: Apply latest security patches & install latest EDR agent
// Phase 3: Rotate local and domain administrative credentials
// Phase 4: Verify zero anomalous network sockets
// Phase 5: Reconnect to production network with heightened SOC monitoring`
  },
  {
    id: 16,
    question: "What is the 'European Union GDPR Article 33' mandatory data breach notification clock?",
    shortAnswer: "Mandatory notification to the relevant Data Protection Supervisory Authority within 72 hours of becoming aware of the personal data breach.",
    explanation: "Article 33 of GDPR imposes strict timelines. Organizations must provide details on the nature of the breach, categories of data compromised, approximate number of affected individuals, likely consequences, and remediation measures taken.",
    hint: "Mandatory notification within 72 hours under GDPR Article 33.",
    level: "Moderate",
    codeExample: `// GDPR Article 33 Notification Mandate:
const gdprArticle33 = {
  notificationWindowHours: 72,
  requiredContent: [
    "Nature of the personal data breach and categories of individuals",
    "Contact details of the Data Protection Officer (DPO)",
    "Likely consequences of the personal data breach",
    "Measures taken or proposed to address and mitigate the breach"
  ]
};`
  },
  {
    id: 17,
    question: "What is 'Timestomping' and how do forensic analysts detect it in the NTFS Master File Table ($MFT)?",
    shortAnswer: "Adversaries modify standard file timestamps ($STANDARD_INFORMATION) to match system files; detected by comparing against kernel-protected `$FILE_NAME` timestamps in the $MFT.",
    explanation: "NTFS stores timestamps in two separate attributes: `$STANDARD_INFORMATION` (user-space accessible and modifiable by malware) and `$FILE_NAME` (updated only by the Windows kernel during file operations). A discrepancy between the two attributes proves the file was timestomped.",
    hint: "Comparing user-modifiable $STANDARD_INFORMATION against kernel-protected $FILE_NAME attributes.",
    level: "Expert",
    codeExample: `// Timestomping Detection via AnalyzeMFT / MFTECmd:
// File: C:\\Windows\\System32\\svchost_malicious.exe
// $STANDARD_INFORMATION CreationTime: 2018-05-10 12:00:00 (Forged by malware)
// $FILE_NAME CreationTime:            2026-08-23 04:12:01 (True disk write timestamp!)
// ANOMALY DETECTED → File was timestomped!`
  },
  {
    id: 18,
    question: "What is the 'Golden Ticket' attack in Active Directory and how must Incident Response eradicate it?",
    shortAnswer: "A forged Kerberos Ticket-Granting Ticket (TGT) created using the `KRBTGT` account password hash; eradicated by resetting the `KRBTGT` password TWICE with a 10-hour delay.",
    explanation: "Once an attacker steals the KRBTGT hash (Sony, Target), they can create valid domain admin tickets that never expire. Resetting the KRBTGT account once invalidates current tickets, but Kerberos history allows recent tickets to work. A second reset purges all forged Golden Tickets from memory across all Domain Controllers.",
    hint: "Forging Kerberos TGTs using KRBTGT hash; eradicated by resetting KRBTGT password twice.",
    level: "Expert",
    codeExample: `// KRBTGT Double-Reset PowerShell Script (Microsoft Standard Procedure):
// 1. First Reset: Invalidates current master hash:
// Reset-KrbTgtPassword.ps1 -Mode Request
// 2. Wait 10-24 hours for Kerberos replication across all global DCs
// 3. Second Reset: Purges historical master hash (Completely invalidates Golden Tickets!):
// Reset-KrbTgtPassword.ps1 -Mode Request`
  },
  {
    id: 19,
    question: "What role does 'Threat Intelligence' (TI) play during Phase 2 (Identification)?",
    shortAnswer: "Enriching discovered IOCs with context about threat actor attribution, known TTPs, secondary backdoors, and command-and-control infrastructure.",
    explanation: "If an analyst finds an in-memory implant, querying threat intelligence (e.g. VirusTotal, Mandiant Advantage, MISP) identifies that it belongs to APT29 (SolarWinds) or Sandworm (NotPetya). This immediately alerts the IR team to look for specific secondary vectors like Golden SAML or KillDisk.",
    hint: "Enriching IOCs with threat actor profiles, known TTPs, and anticipated secondary tools.",
    level: "Moderate",
    codeExample: `// Threat Intelligence Enrichment Query:
const tiLookup = {
  ioc: "avsvmcloud.com",
  threatActor: "APT29 / Cozy Bear (Russian SVR)",
  associatedCampaign: "SolarWinds SUNBURST Supply Chain",
  anticipatedNextMoves: [
    "Check Active Directory Federation Services (ADFS) for Golden SAML artifact",
    "Audit Azure Service Principal credential modifications",
    "Inspect Microsoft 365 Exchange mail forwarders"
  ]
};`
  },
  {
    id: 20,
    question: "What is 'Evidence Preservation & Bit-Stream Disk Imaging'?",
    shortAnswer: "Creating an exact, sector-by-sector cryptographic duplicate of a storage drive (using `dd` or FTK Imager) without altering a single bit on the original physical disk.",
    explanation: "Forensic investigators never analyze live evidence drives directly. A bit-stream image copies every sector (including unallocated space and deleted files). The analyst calculates SHA-256 hashes, locks the original drive in an evidence safe, and conducts all analysis on working copies.",
    hint: "Creating a sector-by-sector exact cryptographic copy using tools like FTK Imager or dd.",
    level: "Moderate",
    codeExample: `// Forensic Bit-Stream Image Creation (dc3dd / FTK Imager):
// dc3dd if=/dev/sdb of=/evidence/drive_image.dd hash=sha256 log=/evidence/imaging_log.txt
// Generates exact sector copy + SHA-256 cryptographic verification checksum!`
  },
  {
    id: 21,
    question: "What is 'Containment Isolation' in Cloud Native / Kubernetes environments?",
    shortAnswer: "Applying Kubernetes NetworkPolicies to block all ingress and egress traffic to compromised pods while creating live memory snapshots for forensics.",
    explanation: "In cloud environments, analysts do not pull physical Ethernet cables. They apply a zero-trust NetworkPolicy that isolates the pod from the rest of the cluster and the Internet, dump container memory to an S3 forensic bucket, and snapshot the underlying EBS/Persistent Volume for analysis.",
    hint: "Applying NetworkPolicies to block pod traffic and snapshotting container disks.",
    level: "Expert",
    codeExample: `// Kubernetes Pod Forensic Isolation NetworkPolicy:
/*
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: isolate-compromised-pod
  namespace: payment-workloads
spec:
  podSelector:
    matchLabels:
      app: compromised-payment-api
  policyTypes:
  - Ingress
  - Egress
  # Empty ingress/egress rules completely quarantine pod from network!
*/`
  },
  {
    id: 22,
    question: "What is 'Crisis Communications Strategy' and how does it prevent brand destruction during a public breach?",
    shortAnswer: "Delivering honest, transparent, and accurate public disclosures coordinated by legal, executive, and technical leads, avoiding false reassurances or buggy standalone websites.",
    explanation: "Equifax's response was a communications disaster because they launched a buggy standalone domain and tweeted phishing links. A mature crisis strategy establishes a dedicated, transparent status page on the core corporate domain, provides clear consumer protection resources (e.g. credit freezes), and meets statutory deadlines.",
    hint: "Honest, transparent disclosures on verified corporate channels coordinated with legal counsel.",
    level: "Moderate",
    codeExample: `// Crisis Communication Golden Rules:
const crisisCommRules = [
  "1. Never guess or provide false reassurances before forensics confirms facts",
  "2. Host breach notifications on official verified corporate domains (Not generic unverified sites)",
  "3. Coordinate all public statements with General Counsel and Data Protection Officer (DPO)",
  "4. Provide clear, actionable remediation guidance for impacted consumers"
];`
  },
  {
    id: 23,
    question: "What is 'Memory Injection Hunting' using Volatility's `malfind` plugin?",
    shortAnswer: "Scanning memory for virtual memory allocations marked as Executable and Writable (`PAGE_EXECUTE_READWRITE`) containing unmapped shellcode or PE headers.",
    explanation: "Legitimate code is loaded into memory mapped to files on disk. Malware injection techniques (Process Hollowing, DLL Injection, TEARDROP) allocate private memory buffers with read/write/execute permissions. `malfind` scans RAM to identify these rogue executable regions.",
    hint: "Finding memory pages marked PAGE_EXECUTE_READWRITE containing injected shellcode.",
    level: "Expert",
    codeExample: `// Volatility malfind Output Indicator:
// Process: explorer.exe Pid: 1840 Address: 0x00000000003f0000
// Protection: PAGE_EXECUTE_READWRITE (Severe Anomaly!)
// Hex Dump: 4d 5a 90 00 03 ... (Unmapped PE Header injected into explorer.exe!)`
  },
  {
    id: 24,
    question: "What is 'Living-off-the-Land' (LotL) forensic artifact hunting in Windows Event Logs?",
    shortAnswer: "Inspecting Event ID 4688 (Process Creation) and PowerShell Event ID 4104 (Script Block Logging) for abuse of native binaries (`certutil.exe`, `wmic.exe`, `bitsadmin.exe`).",
    explanation: "Adversaries avoid dropping known malware files; they use built-in Windows tools to download payloads or dump passwords. Script Block Logging (Event ID 4104) de-obfuscates and captures full PowerShell command blocks, allowing analysts to reconstruct malicious scripts executed in memory.",
    hint: "Auditing Event ID 4688 and PowerShell Script Block Logging (Event ID 4104).",
    level: "Moderate",
    codeExample: `// PowerShell Script Block Logging (Event ID 4104):
// Captures de-obfuscated script block even if Base64 encoded:
// ScriptBlockText: Invoke-Mimikatz -DumpCreds`
  },
  {
    id: 25,
    question: "What is 'Dwell Time' and what is the global industry metric for measuring incident response efficacy?",
    shortAnswer: "The duration of time an adversary remains undetected inside a victim network; measured by Mean Time to Detect (MTTD) and Mean Time to Remediate (MTTR).",
    explanation: "In historical breaches, dwell times spanned months (Equifax: 76 days; Target: 40+ days; Sony: 60+ days). The objective of mature Incident Response is to compress MTTD to under 1 hour and MTTR to under 2 hours, intercepting attackers before data exfiltration occurs.",
    hint: "The duration an adversary remains undetected inside a network; measured by MTTD and MTTR.",
    level: "Moderate",
    codeExample: `// Incident Response Efficacy Metrics:
// MTTD = Total Time from Ingress to Detection / Total Incidents
// MTTR = Total Time from Detection to Containment & Eradication / Total Incidents
// Target Goal: MTTD < 1 Hour | MTTR < 2 Hours`
  },
  {
    id: 26,
    question: "What is 'Log Tampering Detection' and how do analysts spot deleted Windows Security Event Logs?",
    shortAnswer: "Event ID 1102 (The audit log was cleared) and Event ID 104 (System log was cleared), which log the exact user account and timestamp of the log deletion.",
    explanation: "When an adversary runs `wevtutil cl security` or `Clear-EventLog`, Windows generates an indelible Event ID 1102 before the log is cleared. In centralized SIEM architectures, the log deletion event triggers an immediate Severity-1 alert to the SOC.",
    hint: "Event ID 1102 records when an attacker attempts to clear the Windows Security log.",
    level: "Moderate",
    codeExample: `// Windows Security Log Event ID 1102:
// Event ID: 1102
// Task Category: Log Clear
// Description: "The audit log was cleared."
// Subject: Security ID: S-1-5-21... Account Name: Administrator
// Result: SIEM generates immediate critical alarm on log wiping attempt!`
  },
  {
    id: 27,
    question: "What is 'Cybersecurity War Gaming' (Red Team vs Blue Team Incident Simulation)?",
    shortAnswer: "Live interactive exercises where an offensive Red Team simulates realistic nation-state attacks while the defensive Blue Team detects, contains, and remediates in real time.",
    explanation: "Tabletop discussions are theoretical; war games test actual muscle memory. Security teams in Kolkata, Barrackpore, and across global enterprises practice detecting simulated ransomware outbreaks, preserving evidence, and executing manual failovers under live operational stress.",
    hint: "Live exercises where Red Team attacks and Blue Team practices real-time detection and containment.",
    level: "Moderate",
    codeExample: `// Purple Team War Game Exercise Agenda:
const warGameSchedule = {
  scenario: "Double-Extortion Ransomware Lateral Movement via SMBv1",
  redTeamObjective: "Execute Mimikatz dump, stage 10GB dummy exfil, trigger mock encryption",
  blueTeamObjective: "Isolate host within 15 minutes, extract memory dump, verify 6-hr CERT-In reporting"
};`
  },
  {
    id: 28,
    question: "What is 'Post-Incident Action Item Tracking' and how do organizations verify post-mortem recommendations are implemented?",
    shortAnswer: "Assigning formal engineering tickets (Jira/ServiceNow) with strict SLAs, dedicated budget, and quarterly executive audit reviews for every post-mortem finding.",
    explanation: "Writing a post-mortem document is useless if recommendations sit on a shelf. Mature engineering teams convert every post-mortem action item into an engineering ticket with an assigned owner (e.g. 'Deploy FIDO2 MFA across all VPNs within 30 days') tracked directly by the CISO and Board of Directors.",
    hint: "Converting post-mortem findings into tracked engineering tickets with strict SLAs.",
    level: "Moderate",
    codeExample: `// Post-Mortem Jira Engineering Action Item:
const postMortemTicket = {
  ticketKey: "SEC-9042",
  title: "Implement Hardware FIDO2 MFA on all external contractor portals",
  originatingIncident: "INC-2026-0823 (VPN Breach)",
  assignee: "Mahima (Network Security Architect)",
  dueDate: "2026-09-23",
  executiveSignOff: "Sukanta Hui (Lead Auditor)"
};`
  },
  {
    id: 29,
    question: "How does the Indian DPDP Act 2023 penalize data fiduciaries who fail to report a personal data breach to the Data Protection Board of India?",
    shortAnswer: "Imposes statutory financial penalties up to ₹200 Crores specifically for failure to notify the Board and affected data principals of a personal data breach.",
    explanation: "Under Section 8(6) of the Digital Personal Data Protection Act 2023, data fiduciaries must notify the Data Protection Board of India and each affected consumer following any breach. Concealing breaches or failing to report leads to massive statutory penalties.",
    hint: "Statutory fines up to ₹200 Crores under DPDP 2023 for failure to notify the Board and consumers.",
    level: "Moderate",
    codeExample: `// DPDP 2023 Breach Notification Penalty:
const dpdpNotificationPenalty = {
  statutoryClause: "Section 8(6) - Mandatory Notification of Personal Data Breach",
  governingBody: "Data Protection Board of India",
  maximumPenaltyINR: 2000000000 // ₹200 Crores
};`
  },
  {
    id: 30,
    question: "What is the ultimate objective of modern Incident Response and Post-Mortem Analysis?",
    shortAnswer: "To transform every security incident into an enduring architectural catalyst that eliminates systemic vulnerabilities and continuously hardens organizational resilience.",
    explanation: "Incidents are inevitable in complex modern computing environments. The true mark of an elite cybersecurity organization is not having zero incidents, but rather the speed, precision, and blameless rigor with which it detects threats, minimizes damage, and evolves its architecture so that the same vulnerability can never succeed again.",
    hint: "Transforming incidents into architectural catalysts that continuously strengthen resilience.",
    level: "Moderate",
    codeExample: `// The Incident Response Evolution Cycle:
// Incident Detected ---> Swift Containment ---> Rigorous Forensic Root Cause ---> Blameless Post-Mortem ---> Permanent Architectural Hardening`
  }
];

export default questions;
