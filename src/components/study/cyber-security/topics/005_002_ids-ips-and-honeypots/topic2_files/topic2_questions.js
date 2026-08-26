const questions = [
  {
    id: 1,
    question: "What is the primary difference in architectural placement and scope between a Network-based IDS (NIDS) and a Host-based IDS (HIDS)?",
    shortAnswer: "A NIDS monitors network traffic across an entire subnet via physical TAPs or SPAN mirror ports; a HIDS runs as a local software agent directly inside an individual host operating system.",
    explanation: "A NIDS is placed at network aggregation points (like switch core links) to protect dozens or hundreds of servers simultaneously. A HIDS is installed individually on each server, monitoring local system calls, authentication logs, active processes, and file integrity.",
    hint: "NIDS watches the whole network wire; HIDS watches inside a single computer's operating system.",
    level: "Basic",
    codeExample: `// NIDS vs HIDS Scope:
// NIDS : 1 Appliance ---> Monitors 500 Subnet Servers (Wire Traffic)
// HIDS : 500 Host Agents ---> Installed directly on every individual Linux/Windows server`
  },
  {
    id: 2,
    question: "Why is a Network-based IDS (NIDS) blind to modern encrypted traffic (TLS 1.3), and how does a Host-based IDS (HIDS) overcome this blind spot?",
    shortAnswer: "NIDS inspects encrypted ciphertext on the wire without access to private session keys; HIDS inspects data inside application memory and local server logs AFTER the web server has decrypted the TLS session.",
    explanation: "With TLS 1.3 Perfect Forward Secrecy, passive wire sniffers cannot decrypt payloads. A HIDS agent running on the target web server reads decrypted HTTP requests in memory and access logs (`/var/log/nginx/access.log`), allowing it to detect SQLi, XSS, and exploit strings effortlessly.",
    hint: "NIDS sees scrambled encrypted text on the wire; HIDS reads the clean text inside the server after decryption.",
    level: "Basic",
    codeExample: `// TLS Decryption Point:
// [Internet] ---> [NIDS: Sees TLS 1.3 Ciphertext] ---> [Server TLS Termination] ---> [HIDS: Sees Plaintext SQLi Payload!]`
  },
  {
    id: 3,
    question: "What is 'File Integrity Monitoring' (FIM) in HIDS and how does it detect unauthorized rootkits and backdoors?",
    shortAnswer: "The process of computing cryptographic SHA-256 baseline hashes of critical system files (e.g., `/etc/shadow`, `/bin/login`) and alerting when real-time kernel file hooks detect unauthorized hash modifications.",
    explanation: "During initial installation, the HIDS hashes all OS binaries and configurations. When an adversary replaces a system binary with a trojaned version, the HIDS detects the SHA-256 mismatch via OS kernel notifications (`inotify` on Linux, `ReadDirectoryChangesW` on Windows) and generates an immediate critical alert.",
    hint: "Checking if important system files have been altered by comparing cryptographic hashes.",
    level: "Basic",
    codeExample: `// Wazuh / OSSEC FIM Configuration:
// <syscheck>
//   <directories check_all="yes" realtime="yes">/etc,/bin,/sbin,/usr/bin</directories>
// </syscheck>`
  },
  {
    id: 4,
    question: "What is the CPU and RAM overhead trade-off of deploying HIDS agents across an enterprise server fleet?",
    shortAnswer: "HIDS agents consume 1%–5% of local CPU and 100–300 MB of RAM per monitored server for log parsing and real-time file hashing, whereas a passive NIDS consumes 0% host resources.",
    explanation: "Because a NIDS runs on separate dedicated appliance hardware, it has zero performance impact on production servers. Installing HIDS across 5,000 servers requires managing agent resource limits, CPU throttling, and agent software update cycles.",
    hint: "HIDS takes up memory and processing power on the monitored server; NIDS takes up zero server resources.",
    level: "Moderate",
    codeExample: `// HIDS Resource Throttling:
// <syscheck>
//   <process_priority>10</process_priority>
//   <max_eps>100</max_eps>
// </syscheck>`
  },
  {
    id: 5,
    question: "What is the critical vulnerability of a HIDS if an adversary achieves root / SYSTEM administrative compromise on the host?",
    shortAnswer: "A root-level attacker can stop the HIDS daemon (`systemctl stop wazuh-agent`), modify the FIM database, alter local kernel audit logs, or unload kernel monitoring modules to conceal their tracks.",
    explanation: "Because HIDS runs on the same operating system it monitors, complete root compromise gives the attacker the privilege to terminate or tamper with the HIDS agent. A NIDS is immune to this because it sits physically separate on the network wire.",
    hint: "If a hacker gets root access, they can simply turn off or delete the host monitoring program.",
    level: "Moderate",
    codeExample: `// Attacker Disabling HIDS (Blind Spot):
// sudo systemctl stop wazuh-agent
// sudo rm -rf /var/ossec/queue/syscheck/*`
  },
  {
    id: 6,
    question: "What are 'Windows Security Event IDs 4624 and 4625' and how does a HIDS use them to detect brute-force attacks?",
    shortAnswer: "Event ID 4624 indicates a successful logon; Event ID 4625 indicates a failed logon attempt. HIDS aggregates rapid bursts of Event ID 4625 followed by a 4624 to flag credential stuffing.",
    explanation: "HIDS agents subscribe directly to the Windows Event Log API. If 50 failed logons (4625) occur within 60 seconds followed by a successful login (4624), the HIDS flags a high-priority brute-force breach alert.",
    hint: "4624 = Successful Login; 4625 = Failed Login.",
    level: "Basic",
    codeExample: `// HIDS Correlation Rule:
// IF Count(EventID == 4625, Window == 60s) >= 20:
//     Trigger Alert: "BRUTE_FORCE: Rapid failed logons detected on host"`
  },
  {
    id: 7,
    question: "What is 'Linux Auditd' (Audit Daemon) and what role does it serve in host-level intrusion detection?",
    shortAnswer: "The native Linux kernel auditing framework that logs system calls (e.g., `execve`, `ptrace`, `setuid`, file modifications) into `/var/log/audit/audit.log` for HIDS analysis.",
    explanation: "Auditd hooks directly into the Linux kernel syscall table. When a process invokes `execve` to spawn a shell or changes user permissions, Auditd records the command line, parent process ID, and user ID, providing indisputable forensic proof.",
    hint: "The built-in Linux kernel logger that tracks every command and system call.",
    level: "Moderate",
    codeExample: `// Auditd Rule Tracking Execution of Suspicious Shells:
// -a always,exit -F arch=b64 -S execve -F uid=0 -k root_command_execution`
  },
  {
    id: 8,
    question: "What is 'Microsoft Sysmon' (System Monitor) and why is it considered the industry gold standard for Windows HIDS telemetry?",
    shortAnswer: "A Windows system service and device driver that monitors and logs deep host activity (Process Creation Event 1, Network Connection Event 3, Process Injection Event 8) to the Windows Event Log.",
    explanation: "Standard Windows event logs lack detailed process telemetry. Sysmon records exact command line arguments, parent-child process lineages, SHA-256 image hashes, and DLL injections, exposing stealthy living-off-the-land (LotL) malware.",
    hint: "An advanced Windows background tool that logs detailed process creation, network calls, and memory injections.",
    level: "Moderate",
    codeExample: `// Sysmon Event IDs:
// Event 1: Process Creation (CommandLine: powershell.exe -enc ...)
// Event 8: CreateRemoteThread (Process Injection into lsass.exe!)`
  },
  {
    id: 9,
    question: "Why is a NIDS superior to a HIDS for detecting network-wide reconnaissance like Nmap SYN scans and ARP poisoning?",
    shortAnswer: "A NIDS observes all raw Layer 2/3 frames across the entire broadcast domain simultaneously, whereas a HIDS only sees packets processed by its own specific host network stack.",
    explanation: "When an attacker port-sweeps a /24 subnet, they send single probes to 254 distinct IP addresses. Individual HIDS agents see only 1 probe each (ignoring it as noise), whereas a NIDS sees all 254 probes and immediately triggers a port sweep alert.",
    hint: "NIDS sees the big picture across all computers on the network; HIDS only sees its own machine.",
    level: "Basic",
    codeExample: `// Subnet Reconnaissance Visibility:
// NIDS Sensor: Sees 254 SYN packets across subnet -> Triggers Subnet Sweep Alert!
// HIDS Agent on Host 10: Sees only 1 SYN packet -> Ignores as normal background noise.`
  },
  {
    id: 10,
    question: "What is 'Kernel-Mode Rootkit Detection' in advanced HIDS / EDR platforms?",
    shortAnswer: "Inspecting operating system kernel memory structures (e.g., SSDT / IDT hooking, Direct Kernel Object Manipulation - DKOM) to discover hidden processes and drivers that unlinked themselves from OS process lists.",
    explanation: "Sophisticated rootkits manipulate kernel doubly linked lists (`ActiveProcessLinks`) so `ps` or Task Manager cannot see the malware. HIDS agents query low-level CPU control registers and thread dispatchers to expose ghost processes.",
    hint: "Finding stealth malware hiding inside the deepest layer of the operating system kernel.",
    level: "Expert",
    codeExample: `// DKOM Unlinking Attack:
// Normal: ProcessA <-> RootkitProcess <-> ProcessB
// Attacker manipulates pointers: ProcessA <-> ProcessB (Rootkit hidden from Task Manager!)`
  },
  {
    id: 11,
    question: "What is 'Wazuh' and how does its manager-agent architecture work in enterprise HIDS deployments?",
    shortAnswer: "An open-source HIDS/XDR platform where lightweight agents installed on endpoints stream local events, FIM diffs, and syscall logs over encrypted TLS port 1514 to a central Wazuh Manager and Elasticsearch cluster.",
    explanation: "Wazuh agents run with minimal overhead, forwarding JSON event messages to the manager. The manager normalizes logs against 3,000+ decoder rules, correlates events with MITRE ATT&CK techniques, and dispatches alerts to SOC dashboards.",
    hint: "A popular open-source host security system using agents on computers reporting to a central manager.",
    level: "Basic",
    codeExample: `// Wazuh Manager Connection:
// /var/ossec/etc/ossec.conf:
// <server>
//   <address>wazuh-manager.bank.gov.in</address>
//   <port>1514</port>
//   <protocol>tcp</protocol>
// </server>`
  },
  {
    id: 12,
    question: "How does a HIDS detect 'Privilege Escalation' on a Linux server?",
    shortAnswer: "By monitoring system calls and log events where an unprivileged user process suddenly invokes `setuid(0)`, executes `sudo`, or spawns a `/bin/sh` process with effective UID 0 (root).",
    explanation: "If a web daemon running under `www-data` exploits a kernel flaw (e.g. Dirty COW) and spawns an interactive root shell, the HIDS detects the parent-child process anomaly (`nginx -> /bin/sh -> uid 0`) and generates a critical alert.",
    hint: "Watching when a regular user or website account suddenly turns into the root administrator.",
    level: "Moderate",
    codeExample: `// Process Lineage Anomaly:
// Parent: /usr/sbin/apache2 (UID 33) ──spawns──> Child: /bin/bash (UID 0) ➔ CRITICAL ALERT!`
  },
  {
    id: 13,
    question: "What is 'Log Tampering Detection' in HIDS architecture?",
    shortAnswer: "Using real-time log streaming over TLS to a remote SIEM and employing cryptographic write-once append-only hashing so that local log deletion on the host cannot destroy forensic records.",
    explanation: "When an attacker hacks a server, their first step is clearing `/var/log/auth.log` or erasing the Windows Security log (Event ID 1102). Because HIDS streams events off-box in real-time, the SIEM preserves the evidence even if local logs are wiped.",
    hint: "Sending logs to an off-site server immediately so hackers cannot delete the evidence locally.",
    level: "Basic",
    codeExample: `// Real-Time Off-Host Log Streaming:
// Host Generates Log -> HIDS Agent -> TLS Port 6514 -> Immutable SIEM Storage (Evidence Preserved!)`
  },
  {
    id: 14,
    question: "What is 'USB & Removable Media Monitoring' in HIDS endpoints?",
    shortAnswer: "Tracking hardware bus insertion events (Windows Event ID 20001 / Linux `udev` events), logging the serial number of inserted USB flash drives, and detecting unauthorized external data exfiltration.",
    explanation: "A NIDS has zero visibility into air-gapped workstations or physical USB drops. A HIDS detects when a rogue USB drive is connected, logs the device vendor/product ID, and can trigger automated device locking.",
    hint: "Detecting when someone plugs an unauthorized USB flash drive into a computer.",
    level: "Basic",
    codeExample: `// Wazuh USB Storage Rule:
// Rule 81101: USB storage device attached: Vendor="SanDisk", Serial="4C5300012908"`
  },
  {
    id: 15,
    question: "What is 'OSSEC' and what was its historical contribution to the evolution of HIDS?",
    shortAnswer: "One of the earliest and most widely deployed open-source Host-based Intrusion Detection Systems (created by Daniel Cid in 2004), establishing log analysis decoders and FIM engines that paved the way for modern Wazuh.",
    explanation: "OSSEC introduced the concept of centralized cross-platform agent log decoding and active response, becoming the foundational open-source codebase from which modern commercial EDR and Wazuh evolved.",
    hint: "The classic open-source host intrusion tool that served as the predecessor to modern Wazuh.",
    level: "Basic",
    codeExample: `// OSSEC Rule Structure:
// <rule id="100001" level="7">
//   <if_sid>5716</if_sid>
//   <match>Failed password for root</match>
//   <description>SSH brute force attempt against root account</description>
// </rule>`
  },
  {
    id: 16,
    question: "Why is deploying HIDS agents on Network Appliances (Cisco switches, hardware firewalls) typically impossible?",
    shortAnswer: "Network appliances run proprietary, locked-down embedded firmware (e.g., Cisco IOS, PAN-OS) that does not permit third-party agent software installation, making NIDS and Syslog forwarding mandatory.",
    explanation: "Because engineers cannot install Wazuh or Sysmon on a hardware core switch or OT industrial controller, security teams must rely on passive NIDS sensors and NetFlow telemetry to monitor these devices.",
    hint: "Hardware network switches run closed firmware that won't let you install custom software agents.",
    level: "Moderate",
    codeExample: `// Appliance Monitoring Strategy:
// Proprietary Switch / Router ──── [Syslog Stream / SPAN Port] ────> External NIDS Sensor`
  },
  {
    id: 17,
    question: "What is 'Process Injection / DLL Sideloading Detection' in Windows HIDS?",
    shortAnswer: "Detecting when an unprivileged process allocates memory in a legitimate system process (e.g. `lsass.exe` or `explorer.exe`) using `VirtualAllocEx` / `WriteProcessMemory` to evade antivirus.",
    explanation: "Malware injects shellcode into legitimate processes to run under trusted identity. HIDS drivers monitor inter-process memory allocation APIs and flag cross-process thread creations (Sysmon Event 8).",
    hint: "Catching malware when it tries to inject its code into a normal, trusted Windows program.",
    level: "Expert",
    codeExample: `// Process Injection Sysmon Event:
// SourceProcess: malware.exe -> TargetProcess: lsass.exe | API: CreateRemoteThread ➔ CRITICAL ALERT!`
  },
  {
    id: 18,
    question: "What is 'Live Memory Scraping / YARA Process Scanning' in modern HIDS?",
    shortAnswer: "Periodically scanning active volatile RAM memory buffers of running processes against YARA signature rules to detect unpacked shellcode and Cobalt Strike beacons that never touch the hard drive.",
    explanation: "Fileless malware executes purely in RAM to evade disk-based file scanners. HIDS agents scan process virtual address space directly in memory, identifying malicious byte patterns in real time.",
    hint: "Scanning the computer's live RAM memory to find malware hiding without saving files to disk.",
    level: "Expert",
    codeExample: `// YARA Memory Rule on Process:
// rule CobaltStrike_Beacon_Memory { strings: $a = { 73 70 72 6E 67 6C 69 6E 6B } condition: $a }`
  },
  {
    id: 19,
    question: "Why does an enterprise security architecture require BOTH NIDS and HIDS in a Defense-in-Depth strategy?",
    shortAnswer: "NIDS provides broad perimeter and East-West subnet visibility with zero host overhead; HIDS provides deep endpoint visibility inside encrypted TLS sessions, OS logs, and file integrity.",
    explanation: "NIDS catches network-wide port scans, unencrypted broadcast worms, and attacks targeting unmonitored devices (printers, switches). HIDS catches encrypted web exploits, local rootkits, and insider privilege abuse, forming a comprehensive defense.",
    hint: "NIDS watches the roads between buildings; HIDS watches inside each room of every building.",
    level: "Basic",
    codeExample: `// The Complete Defense-in-Depth Model:
// Network Boundary : [NIDS (Broad Subnet Inspection & Wire Flow)]
// Host Endpoints   : [HIDS (FIM + Local Logs + Post-TLS Memory Inspection)]`
  },
  {
    id: 20,
    question: "What is 'FIM Baseline Drift / Update Fatigue' and how do automated deployment pipelines manage it?",
    shortAnswer: "When scheduled software updates or CI/CD deployments modify thousands of server binaries simultaneously, triggering thousands of false-positive FIM hash alerts unless synchronized with change control.",
    explanation: "If `apt upgrade` updates 200 packages, a naive HIDS triggers 200 critical file modification alerts. Modern HIDS platforms integrate with change control tools (Ansible/Puppet) to automatically update FIM baselines during approved maintenance windows.",
    hint: "When normal software updates change files and cause false alarms unless the security tool is updated.",
    level: "Moderate",
    codeExample: `// Automated Baseline Refresh during Maintenance:
// ansible-playbook update_os.yml && wazuh-control restart-syscheck`
  },
  {
    id: 21,
    question: "What is 'Agent Key Authentication & Registration' in HIDS architectures?",
    shortAnswer: "The cryptographic enrollment process where each new host agent registers with the central HIDS manager, exchanging a unique pre-shared key or TLS client certificate to prevent rogue agent spoofing.",
    explanation: "To prevent attackers from injecting fake security alerts into the SIEM, the HIDS manager verifies agent identity via mutual TLS authentication (mTLS) and rejects unregistered agent IP connections.",
    hint: "Using cryptographic keys to ensure only authorized company computers can send alerts to the security server.",
    level: "Basic",
    codeExample: `// Wazuh Agent Registration:
// sudo /var/ossec/bin/agent-auth -m wazuh-manager.bank.gov.in -p 1515 -A "web-server-01"`
  },
  {
    id: 22,
    question: "What is 'Active Response' in HIDS (e.g., Wazuh / OSSEC Active Response)?",
    shortAnswer: "Configuring the HIDS agent to automatically execute a local script (such as adding an `iptables` drop rule or disabling a user account) immediately upon detecting a specific attack pattern.",
    explanation: "When a HIDS agent detects 10 failed SSH logins from an IP, it executes `/var/ossec/active-response/bin/firewall-drop.sh` to block the offending IP locally for 600 seconds, neutralizing brute force without human intervention.",
    hint: "Automatically running a script to block an attacker's IP on the local computer when an attack is detected.",
    level: "Moderate",
    codeExample: `// Wazuh Active Response Definition:
// <active-response>
//   <command>firewall-drop</command>
//   <location>local</location>
//   <level>6</level>
//   <timeout>600</timeout>
// </active-response>`
  },
  {
    id: 23,
    question: "What is 'MITRE ATT&CK Mapping' in modern HIDS alert telemetry?",
    shortAnswer: "Tagging every triggered host alert with standardized adversary tactic and technique IDs (e.g., T1078 Valid Accounts, T1059 Command and Scripting Interpreter, T1055 Process Injection).",
    explanation: "Tagging alerts with MITRE IDs allows SOC analysts to understand where an incident sits within the attack lifecycle and correlate host alerts with network NIDS alerts under a unified threat taxonomy.",
    hint: "Labeling alerts with industry-standard hacker technique codes for easy tracking.",
    level: "Basic",
    codeExample: `// Structured MITRE Telemetry in HIDS Alert:
// "mitre": { "id": ["T1059.001", "T1055"], "tactic": ["Execution", "Defense Evasion"] }`
  },
  {
    id: 24,
    question: "How does a HIDS detect 'Pass-the-Hash' and lateral movement on Windows domain endpoints?",
    shortAnswer: "By monitoring Windows Event ID 4624 with Logon Type 3 (Network Logon) using NTLM authentication instead of Kerberos, originating from non-domain-controller workstations.",
    explanation: "When an attacker dumps NTLM hashes and uses tools like Mimikatz or PsExec to move laterally, Windows logs a Type 3 NTLM network authentication. HIDS flags unexpected workstation-to-workstation NTLM logons.",
    hint: "Watching for suspicious network logins between workstations using stolen password hashes.",
    level: "Expert",
    codeExample: `// Pass-the-Hash Detection Query:
// EventID: 4624 | LogonType: 3 | AuthenticationPackageName: NTLM | TargetUserName != ANONYMOUS LOGON`
  },
  {
    id: 25,
    question: "What is the CERT-In statutory mandate regarding HIDS Endpoint Telemetry and Audit Logs?",
    shortAnswer: "All host authentication logs, privilege changes, file integrity alerts, and process execution histories must be retained in synchronized SIEM archives for a minimum of 180 days.",
    explanation: "Under Indian cybersecurity directives, organizations must maintain 180-day forensic endpoint logs synchronized with NPL India NTP servers to support national incident investigations.",
    hint: "180-day retention of all host logs synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Structured CERT-In Compliant HIDS Log:
const certInHidsLog = {
  timestamp: "2026-08-23T12:10:00.150Z",
  hostName: "db-server-barrackpore",
  agentId: "001",
  event: "FIM_HASH_MISMATCH",
  filePath: "/bin/login",
  expectedHash: "a3f5b8...",
  actualHash: "987654..."
};`
  },
  {
    id: 26,
    question: "What is 'Agentless HIDS' (e.g. Remote WMI / WinRM / SSH polling) and what are its limitations?",
    shortAnswer: "Monitoring hosts by remotely polling logs over SSH or WMI without installing software on the endpoint; limited by high network polling overhead, inability to hook real-time kernel syscalls, and delayed detection.",
    explanation: "Agentless monitoring avoids installing software on legacy servers. However, it cannot perform real-time FIM kernel hooking or volatile memory process scanning, creating a latency delay between attack execution and log polling.",
    hint: "Checking server logs remotely over SSH instead of installing a program on the computer.",
    level: "Moderate",
    codeExample: `// Agentless vs Agent-Based:
// Agent-Based : Real-time kernel inotify hooks (0 millisecond alert delay)
// Agentless   : Polling script runs every 5 minutes (Attacker has 5-minute head start!)`
  },
  {
    id: 27,
    question: "How does a HIDS detect 'Living-off-the-Land Binaries' (LOLBins) like PowerShell, `certutil`, or `wmic`?",
    shortAnswer: "By analyzing process command-line arguments for suspicious flags (e.g., unauthorized external URLs or encoded script flags passed to native system binaries).",
    explanation: "Attackers use built-in Windows administrative utilities to download malware without triggering basic antivirus. HIDS inspects command-line parameters and flags suspicious download or execution arguments.",
    hint: "Catching hackers using built-in Windows admin tools to download and run malicious scripts.",
    level: "Moderate",
    codeExample: `// LOLBin Detection Rule:
// Process == "certutil.exe" AND CommandLine contains external network download ➔ CRITICAL ALERT!`
  },
  {
    id: 28,
    question: "What is 'Container and Kubernetes HIDS Monitoring' (e.g., Falco / Tracee)?",
    shortAnswer: "Using extended Berkeley Packet Filters (eBPF) to hook Linux kernel syscalls across all running Docker containers and Kubernetes pods with near-zero overhead, detecting container escape attempts.",
    explanation: "Falco monitors container kernel system calls. If a container process attempts to mount the host root filesystem or spawn a shell inside a read-only production pod, Falco generates an immediate container intrusion alert.",
    hint: "Using eBPF kernel hooks to monitor security inside Docker containers and Kubernetes pods.",
    level: "Expert",
    codeExample: `// Falco Rule for Container Shell Spawn:
// - rule: Terminal shell in container
//   desc: A shell was spawned inside a container
//   condition: container.id != host and proc.name in (bash, sh)`
  },
  {
    id: 29,
    question: "What is 'Decentralized Agent Buffering' in HIDS when network connectivity to the central manager is severed?",
    shortAnswer: "HIDS agents maintain a local encrypted disk queue buffer (e.g., 500 MB SQLite database), storing logs locally during network outages and flushing them to the manager once connectivity is restored.",
    explanation: "If an adversary cuts the network cable to hide their attack, the HIDS agent continues recording all local file modifications and authentication events to its local disk buffer, transmitting the complete forensic trail as soon as the network reconnects.",
    hint: "Saving security alerts on the local hard drive when the network is down so no evidence is lost.",
    level: "Basic",
    codeExample: `// HIDS Local Queue Buffer Configuration:
// <client_buffer>
//   <disabled>no</disabled>
//   <queue_size>50000</queue_size>
//   <events_per_second>500</events_per_second>
// </client_buffer>`
  },
  {
    id: 30,
    question: "Synthesize the overarching strategic synergy between Network-based IDS (NIDS) and Host-based IDS (HIDS).",
    shortAnswer: "NIDS and HIDS are complementary pillars of modern cybersecurity: NIDS provides perimeter and inter-subnet surveillance across all devices without host impact; HIDS provides deep endpoint defense inside encrypted sessions, local OS logs, and file integrity, ensuring 360-degree Defense-in-Depth.",
    explanation: "Relying solely on NIDS leaves enterprises blind to encrypted web attacks, local rootkits, and rogue USB drops. Relying solely on HIDS leaves enterprises blind to subnet port sweeps and unmonitored network hardware. Combining both guarantees complete threat visibility in compliance with CERT-In and the DPDP Act 2023.",
    hint: "NIDS watches the network wire; HIDS watches inside the computers; together they create complete defense.",
    level: "Moderate",
    codeExample: `// The Master Intrusion Detection Formula:
// Complete Visibility = [NIDS (Wire Flow & Perimeter Inspection)] + [HIDS (FIM + Local Logs + Memory Inspection)] + [180-Day SIEM Archive]`
  }
];

export default questions;
