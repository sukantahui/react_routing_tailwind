const questions = [
  {
    question: "What is the critical technical distinction between 'Port Scanning' and 'Network Enumeration' in Phase 2?",
    shortAnswer: "Port scanning identifies which IP addresses are online and which TCP/UDP ports are open; Enumeration establishes active connections to open services to extract exact usernames, shares, and configs.",
    explanation: "Scanning tells you that host `192.168.1.50` is active and has port 445 (SMB) and port 161 (SNMP) listening. Enumeration takes the next, deeper step: connecting directly to those open services using protocols like NetBIOS, RPC, and SNMP to query Active Directory domain user accounts, shared directories, network routing tables, and password complexity policies.",
    hint: "Think about checking if a door is unlocked (Scanning) versus walking inside and cataloging everything on the desk (Enumeration).",
    level: "basic",
    codeExample: `// Scanning vs Enumeration Workflow:
Step 1 (Scanning):    nmap -sS -p 445,161 192.168.1.50   → Discovers Port 445 (Open) & Port 161 (Open)
Step 2 (Enumeration): enum4linux -U 192.168.1.50         → Extracts 45 Active Directory usernames & shared folders!`
  },
  {
    question: "How does a 'TCP SYN Stealth Scan' (Nmap `-sS` / Half-Open Scan) work at the transport layer, and why is it preferred over a 'TCP Connect Scan' (`-sT`)?",
    shortAnswer: "The client sends a SYN packet; if the server replies with SYN-ACK (Open), the client immediately sends a RST packet to tear down the connection before the 3-way handshake completes, evading application-level logging.",
    explanation: "In a standard TCP Connect scan (`-sT`), the OS completes the full 3-way handshake (SYN → SYN-ACK → ACK), which creates a full socket connection and triggers application connection logging (e.g. Apache/FTP access logs). In a SYN Stealth scan (`-sS`), the scanner sends a SYN; upon receiving SYN-ACK, it sends an immediate RST (Reset) packet. Because the handshake never completes, legacy applications rarely log the connection, making it faster and stealthier.",
    hint: "Think of knocking on a door, hearing someone say 'Hello?', and running away before they open the door.",
    level: "moderate",
    codeExample: `// TCP SYN Stealth Scan (Half-Open) Handshake:
Client  --- [ SYN ] ----------->  Server (Port 443 Open)
Client  <-- [ SYN-ACK ] --------  Server
Client  --- [ RST ] ----------->  Server (Connection torn down instantly - No app log created!)`
  },
  {
    question: "What happens during a TCP port scan when a target port is 'Filtered' by a firewall versus 'Closed' by the host operating system?",
    shortAnswer: "A 'Closed' port replies immediately with a TCP RST packet; a 'Filtered' port drops the packet silently (or returns ICMP Type 3 unreachable), causing the scanner to receive no response.",
    explanation: "When an Nmap probe reaches a target: 1. OPEN: Server responds with SYN-ACK; 2. CLOSED: Server kernel receives the packet on an inactive port and returns an immediate RST (Reset) packet; 3. FILTERED: A network firewall or router drops the probe packet silently without reply, forcing the scanner to wait for a timeout, or returns an ICMP Type 3 (Destination Unreachable) error.",
    hint: "Recall that a closed door has someone inside shouting 'Go away!' (RST), while a firewall acts like a black hole that swallows packets silently (Filtered).",
    level: "basic",
    codeExample: `// Port Response States:
Target Port Open:     Returns [ SYN-ACK ]
Target Port Closed:   Returns [ RST-ACK ] (Kernel confirms port is inactive)
Target Port Filtered: Returns [ NO RESPONSE / TIMEOUT ] (Firewall dropped packet)`
  },
  {
    question: "What is 'SNMP Enumeration', and why is querying Default Community Strings (`public` / `private`) a critical security hazard?",
    shortAnswer: "Simple Network Management Protocol (SNMP) manages network routers and switches; default community strings act as cleartext passwords, allowing attackers to download routing tables and device configs.",
    explanation: "SNMP operates on UDP port 161. In SNMPv1 and SNMPv2c, authentication is handled via plaintext 'Community Strings' (often left at factory defaults like `public` for read-only or `private` for read-write). Ethical hackers use tools like `snmpwalk` or `snmp-check` with the `public` string to query Management Information Base (MIB) trees, extracting all network interface IPs, running processes, and user accounts.",
    hint: "Think of an administrative router protocol that hands out internal network diagrams if you guess the password 'public'.",
    level: "moderate",
    codeExample: `// SNMP MIB Walk Command:
snmpwalk -v2c -c public 203.0.113.1 1.3.6.1.2.1.25.4.2.1.2
// Output: Dumps full list of running server processes, software versions, and network interfaces!`
  },
  {
    question: "What are 'Nmap Timing Templates' (`-T0` to `-T5`), and when should an ethical penetration tester select `-T2` (Polite) versus `-T4` (Aggressive)?",
    shortAnswer: "Timing templates control scan speed, packet delay, and concurrency; `-T2` (Polite) slows scans to prevent crashing fragile devices; `-T4` (Aggressive) speeds scans on fast enterprise networks.",
    explanation: "Nmap provides 6 timing templates: `-T0` (Paranoid - 5 min delay between probes to evade IDS); `-T1` (Sneaky - 15s delay); `-T2` (Polite - 0.4s delay, uses minimal bandwidth); `-T3` (Normal - default); `-T4` (Aggressive - assumes fast reliable network); `-T5` (Insane - max speed, risks dropping packets). Testers use `-T2` in clinical healthcare or industrial SCADA environments to avoid device disruption.",
    hint: "Remember that T0 is ultra-slow to hide from alarms, while T4 is fast for modern business networks.",
    level: "basic",
    codeExample: `// Nmap Timing Syntax:
Hospital ICU Audit:  nmap -sS -T2 -p 1-1024 192.168.10.0/24 (Slow, gentle, prevents device crash)
Fast FinTech Audit:  nmap -sS -T4 -p- 203.0.113.50          (Scans all 65,535 ports in minutes)`
  },
  {
    question: "What is 'SMB Enumeration' (using `enum4linux` or `rpcclient`), and what specific Active Directory objects can be extracted over Port 445?",
    shortAnswer: "Querying Server Message Block (SMB) and Remote Procedure Call (RPC) interfaces to enumerate Active Directory domain users, shared folders, group memberships, and password policies.",
    explanation: "Windows networks rely on SMB (TCP port 445) for file sharing and IPC. If null sessions or guest access are permitted, an ethical hacker connects via `enum4linux` or `rpcclient -U '' 192.168.1.50`. The tool executes `enumdomusers` and `netshareenum`, dumping all domain usernames, group SIDs, password lockout thresholds, and shared folder paths without knowing a single password.",
    hint: "Think about querying Windows file sharing to get a complete list of all employee login accounts.",
    level: "moderate",
    codeExample: `// SMB RPC Enumeration via rpcclient:
rpcclient -U "" -N 192.168.1.50
rpcclient $> enumdomusers
// Output:
user:[mamata] rid:[0x3e8]
user:[debangshu] rid:[0x3e9]
user:[administrator] rid:[0x1f4]`
  },
  {
    question: "How does a 'TCP ACK Scan' (Nmap `-sA`) map firewall rules and distinguish between Stateful vs Stateless packet filters?",
    shortAnswer: "Sending ACK packets without an established connection: stateless firewalls let them pass (returning RST from the host), while stateful firewalls drop unexpected ACK packets as invalid.",
    explanation: "An ACK packet is only valid if a TCP connection already exists. When Nmap sends an ACK packet (`-sA`): 1. If a Stateful Firewall is present, it checks its state table, sees no matching connection, and drops the packet (Port flagged as `Filtered`); 2. If a Stateless Firewall or no firewall is present, the packet reaches the target OS kernel, which responds with a RST packet (Port flagged as `Unfiltered`).",
    hint: "Think of sending a letter saying 'Thanks for your reply' when you never wrote to them: a smart guard throws it away (Filtered).",
    level: "expert",
    codeExample: `// TCP ACK Scan Syntax:
nmap -sA -p 80,443,8080 203.0.113.50
// Result:
Port 80/tcp:   Unfiltered (RST received → Firewall is stateless on port 80)
Port 8080/tcp: Filtered   (No response → Stateful firewall is dropping packets)`
  },
  {
    question: "What is 'UDP Port Scanning' (`-sU`), and why is it significantly slower and more difficult than TCP scanning?",
    shortAnswer: "UDP is connectionless; open ports rarely send an acknowledgment packet, while closed ports return ICMP Port Unreachable error packets that operating systems rate-limit.",
    explanation: "Unlike TCP which uses SYN-ACK, UDP has no handshake. When Nmap sends an empty UDP packet to a port: 1. If the port is OPEN, the application may drop the packet or reply with application data (Port marked `Open|Filtered`); 2. If the port is CLOSED, the kernel returns an ICMP Type 3 Code 3 (Port Unreachable). However, Linux and Windows rate-limit ICMP error packets to 1 per second, making full 65,535 UDP port scans take hours.",
    hint: "Remember that UDP has no 3-way handshake, so open ports stay silent while closed ports return rate-limited ICMP errors.",
    level: "moderate",
    codeExample: `// Targeted UDP Scan Command:
nmap -sU -sV -p 53,67,68,69,123,161 203.0.113.50
// Scans common UDP services (DNS, DHCP, TFTP, NTP, SNMP) in seconds rather than scanning all 65K ports.`
  },
  {
    question: "What is 'Decoy Scanning' (Nmap `-D`), and how does it obfuscate the attacker's true IP address from target SIEM logs?",
    shortAnswer: "Generating multiple spoofed probe packets with fake IP addresses alongside the attacker's real IP, making it impossible for SOC analysts to determine which IP initiated the scan.",
    explanation: "When an attacker runs `nmap -D RND:10,203.0.113.1,ME 192.168.1.50`, Nmap generates probe packets from 10 random fake IP addresses and the specified decoys, interspersed with the attacker's real IP (`ME`). The target firewall logs 12 distinct IP addresses scanning simultaneously, creating overwhelming alert noise and blinding SOC analysts to the true origin of the scan.",
    hint: "Think of walking into a room surrounded by ten lookalike body doubles so the security cameras cannot tell who entered.",
    level: "moderate",
    codeExample: `// Decoy Scan Execution:
nmap -sS -D 198.51.100.1,198.51.100.2,ME,198.51.100.3 203.0.113.50
// Target Firewall Log: Records 4 distinct IPs scanning port 443 simultaneously!`
  },
  {
    question: "What is 'LDAP Enumeration' (Port 389/636), and how do ethical hackers extract organizational hierarchies from Active Directory?",
    shortAnswer: "Querying Lightweight Directory Access Protocol (LDAP) to dump domain user accounts, email addresses, manager-employee reporting structures, and security groups.",
    explanation: "Active Directory uses LDAP to store corporate directory information. Using tools like `ldapsearch` or `adalanche`, an ethical hacker queries TCP port 389. If anonymous bind or low-privilege user credentials exist, the tool dumps user objects, extracting telephone numbers, physical office locations, job titles, department names, and manager hierarchy trees.",
    hint: "Think about querying the master corporate phonebook database over port 389.",
    level: "moderate",
    codeExample: `// LDAP Search Query Command:
ldapsearch -x -H ldap://192.168.1.50 -b "dc=kolkata,dc=fintech,dc=co,dc=in" "(objectClass=user)" sAMAccountName mail
// Output: Dumps all Active Directory user accounts and corporate email addresses.`
  },
  {
    question: "What are 'TCP FIN, NULL, and Xmas Scans' (Nmap `-sF`, `-sN`, `-sX`), and how do they exploit RFC 793 to bypass stateless firewalls?",
    shortAnswer: "They send packets without SYN/ACK flags (NULL has no flags, Xmas sets FIN+PSH+URG); RFC 793 specifies closed ports reply with RST while open ports stay silent.",
    explanation: "According to RFC 793 (TCP specification), if an incoming packet without SYN or RST arrives at a closed port, the host must return a RST packet; if the port is open, the packet must be silently discarded. Because simple stateless packet filters only inspect SYN packets to block inbound connections, FIN/NULL/Xmas packets pass straight through uninspected firewalls.",
    hint: "Think of setting unusual flag combinations (like an illuminated Christmas tree) that confuse basic packet filters.",
    level: "expert",
    codeExample: `// TCP Xmas Scan Syntax:
nmap -sX -p 22,80,443 203.0.113.50
// Flags Set: FIN + PSH + URG (Lights up like a Christmas tree!)
// Response: Closed ports return RST; Open ports drop packet silently.`
  },
  {
    question: "What is 'SMTP User Enumeration' (Port 25), and how do the `VRFY` and `EXPN` commands verify valid employee email addresses?",
    shortAnswer: "Querying the Simple Mail Transfer Protocol daemon using `VRFY` (Verify User) or `RCPT TO` commands to check if a specific username exists on the mail server.",
    explanation: "The SMTP protocol includes commands to verify recipient accounts. Ethical hackers connect to port 25 via Netcat and send `VRFY mamata`. If the user exists, the server replies with `250 2.1.5 Mamata Sen <mamata@bank.com>`; if invalid, it returns `550 User unknown`. This allows attackers to brute-force and validate thousands of corporate email accounts.",
    hint: "Think about asking the mail carrier directly if a specific person lives at an address.",
    level: "basic",
    codeExample: `// SMTP VRFY Command Execution:
nc -nv 203.0.113.50 25
220 mail.kolkata-fintech.co.in ESMTP Postfix
VRFY mamata
250 2.1.5 Mamata Sen <mamata@kolkata-fintech.co.in> (User Exists!)
VRFY fakeuser123
550 5.1.1 User unknown`
  },
  {
    question: "What is 'NFS Export Enumeration' (Port 2049), and how does the `showmount -e` command reveal unprotected network storage shares?",
    shortAnswer: "Querying Network File System (NFS) servers to list all exported directory paths and check if they permit unrestricted mount access (`*` wildcard).",
    explanation: "NFS is widely used in Linux environments for network file sharing on TCP port 2049. Running `showmount -e 203.0.113.50` lists all exported shares. If administrators configured `/exports/backups *(rw,no_root_squash)`, any remote client can mount the directory without a password, gaining full root read and write access to confidential server backups.",
    hint: "Think of asking a network file server to show all the shared folders that anyone is allowed to plug into.",
    level: "basic",
    codeExample: `// NFS Export Enumeration & Remote Mounting:
showmount -e 203.0.113.50
// Output: /var/backups * (Unrestricted public mount!)
sudo mount -t nfs 203.0.113.50:/var/backups /mnt/target_share
// Result: Attacker now browses server backup files locally on their machine!`
  },
  {
    question: "What is 'Packet Fragmentation' (Nmap `-f` / `--mtu`), and how does it evade signature-based Intrusion Detection Systems (IDS)?",
    shortAnswer: "Splitting TCP probe headers across multiple 8-byte or 16-byte IP fragment packets so signature-based IDS engines cannot inspect the complete TCP header without reassembly.",
    explanation: "When Nmap sends a probe with `-f` or `--mtu 16`, it splits the 20-byte TCP header across two separate IP fragment packets (e.g. 8 bytes in packet 1, 12 bytes in packet 2). Older signature-based IDS/IPS sensors inspect packets individually; because neither packet contains a complete TCP header, the IDS signature fails to trigger, and the target host reassembles the fragments normally.",
    hint: "Think of cutting a secret letter into two halves and mailing them in separate envelopes so the censor cannot read either one alone.",
    level: "expert",
    codeExample: `// Packet Fragmentation Scan:
nmap -sS -f --mtu 16 -p 80,443 203.0.113.50
// Splits TCP SYN packet across two 16-byte IP fragments to bypass perimeter IDS rules.`
  },
  {
    question: "What is 'NetBIOS Name Service Enumeration' (Port 137 UDP), and what does the `nbtscan` command extract from Windows subnets?",
    shortAnswer: "Scanning UDP port 137 to extract Windows NetBIOS computer names, workgroup/domain names, logged-in usernames, and MAC addresses across an entire subnet.",
    explanation: "NetBIOS Name Service allows Windows computers on a local area network to broadcast their identity. Running `nbtscan -r 192.168.1.0/24` sends UDP 137 queries to every host. In seconds, it returns a table displaying the exact NetBIOS name (e.g. `KOLKATA-DC01`), the active domain name (`FINTECH-DOMAIN`), and identifies whether the machine is a Domain Controller or file server.",
    hint: "Think of calling out over a loudspeaker on the local network asking every computer to state its name and workgroup.",
    level: "basic",
    codeExample: `// nbtscan Subnet Sweep:
nbtscan -r 192.168.1.0/24
// Output:
IP address       NetBIOS Name     Server    User             MAC address
192.168.1.10     KOLKATA-DC01     <server>  FINTECH\\Admin    00:0c:29:4f:8a:12
192.168.1.50     MAMATA-LAPTOP    <server>  FINTECH\\mamata   00:0c:29:8b:3c:45`
  },
  {
    question: "Under the Indian Information Technology Act 2000, why is unauthorized port scanning and network enumeration legally dangerous without a signed contract?",
    shortAnswer: "Because active port probing and enumeration transmit unauthorized packets to computer resources, which constitutes a civil violation under Section 43 and criminal hacking under Section 66.",
    explanation: "Unlike passive OSINT (which searches public databases), Phase 2 Scanning directly transmits TCP/UDP probe packets to the victim's infrastructure. In Indian cyber jurisprudence, probing private networks without prior explicit written permission falls squarely under Section 43(a) (Unauthorized Access) and Section 66 (Hacking), carrying up to 3 years imprisonment and civil compensation claims.",
    hint: "Remember that sending active probe packets to someone's server without written permission is a crime under Indian law.",
    level: "basic",
    codeExample: `// Legal Classification of Active Scanning:
Authorized Pentest:  Signed Rules of Engagement (RoE) → 100% Lawful & Protected
Unauthorized Scan:   Probing IP ranges without permission → Criminal Offense under IT Act Section 66!`
  },
  {
    question: "How do modern Next-Generation Firewalls (NGFW) and EDR agents detect and block automated Nmap port scans in real time?",
    shortAnswer: "By analyzing connection attempt rates (SYN packet frequency across multiple ports from a single IP), flagging non-standard TCP flag combinations, and enforcing automated fail2ban IP drop rules.",
    explanation: "Modern NGFWs (Palo Alto, Fortinet) track connection heuristics. If an IP address sends 50 TCP SYN packets to different destination ports within 2 seconds, the firewall triggers a Port Scan Alert, drops all subsequent traffic from that IP at the edge, and updates the SIEM with a High-Severity Reconnaissance incident, isolating the scanning host automatically.",
    hint: "Think about security alarms that notice when someone tries 20 different keys on 20 doors in three seconds and lock down the building.",
    level: "moderate",
    codeExample: `// Firewall Port Scan Heuristic Rule (iptables / fail2ban):
iptables -A INPUT -p tcp --tcp-flags SYN,ACK,FIN,RST SYN -m limit --limit 1/s --limit-burst 3 -j ACCEPT
iptables -A INPUT -p tcp --tcp-flags SYN,ACK,FIN,RST SYN -j DROP
// Result: Drops aggressive port scans automatically after 3 rapid SYN packets!`
  },
  {
    question: "What is 'Source Port Manipulation' (Nmap `--source-port 53`), and how did it historically bypass poorly configured firewall rules?",
    shortAnswer: "Setting the scanner's source port to 53 (DNS) or 88 (Kerberos) so legacy firewalls with 'allow established traffic from port 53' rules permit the probe packets through.",
    explanation: "Historically, network administrators configured simple packet filters allowing inbound UDP/TCP traffic if the source port was 53 (assuming it was legitimate DNS server responses). Ethical hackers run `nmap --source-port 53 -sS 203.0.113.50`; the firewall sees source port 53, treats the probe as an incoming DNS response, and passes it straight through to internal servers.",
    hint: "Think of wearing a delivery driver uniform (Source Port 53) so the security guard lets you through the back gate without checking your ID.",
    level: "expert",
    codeExample: `// Source Port Manipulation Scan:
nmap -sS --source-port 53 -p 80,443,8080 203.0.113.50
// Bypasses legacy stateless firewalls configured with "Allow Inbound from Source Port 53".`
  },
  {
    question: "Why must ethical hackers exercise extreme caution when scanning Industrial SCADA (Modbus Port 502) or Healthcare IoMT networks in Phase 2?",
    shortAnswer: "Because industrial PLCs and medical devices have fragile, low-memory embedded network stacks; high-speed port scans flood their buffers, causing physical machinery failure or patient device reboots.",
    explanation: "Programmable Logic Controllers (PLCs) in power substations and medical infusion pumps use lightweight microcontrollers designed in the 1990s. If an auditor runs an aggressive `nmap -T4 -A` scan, the massive flood of SYN/UDP packets exhausts the device's tiny TCP stack memory, locking up physical switchgears or freezing medical monitors during active patient treatment.",
    hint: "Think about why you should never shout with a megaphone near delicate antique glassware.",
    level: "basic",
    codeExample: `// SCADA Safe Scanning Policy:
FORBIDDEN: nmap -T4 -A -p- 192.168.1.100 (CRASHES SCADA PLC!)
PERMITTED: nmap -sS -T1 -p 502 --max-retries 1 192.168.1.100 (Safe, single-packet verification)`
  },
  {
    question: "Synthesizing Phase 2 (Scanning and Enumeration): how does comprehensive enumeration set the stage for successful Phase 3 Exploitation?",
    shortAnswer: "Enumeration transforms raw open ports into actionable software versions, Active Directory usernames, and vulnerable service parameters, allowing the tester to pick the exact working exploit.",
    explanation: "Without enumeration, Phase 3 is blind guessing that crashes servers and alerts defenders. By thoroughly enumerating services in Phase 2—extracting exact software patch versions (e.g. `ProFTPD 1.3.5`), Active Directory usernames (`mamata`, `debangshu`), and shared folder permissions—the ethical hacker selects the exact, reliable exploit module in Metasploit, guaranteeing immediate, stealthy initial access in Phase 3.",
    hint: "Conclude by recognizing that accurate enumeration is what turns an open port into a guaranteed path to compromise.",
    level: "expert",
    codeExample: `// The Enumeration to Exploitation Pipeline:
Phase 2 Enumeration: Discovers "ProFTPD 1.3.5 with mod_copy enabled"
Phase 3 Exploitation:  msf> use exploit/unix/ftp/proftpd_modcopy_exec → Instant Root Shell (#)!`
  }
];

export default questions;
