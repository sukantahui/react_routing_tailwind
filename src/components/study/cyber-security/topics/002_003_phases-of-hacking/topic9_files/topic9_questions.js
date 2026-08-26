const questions = [
  {
    question: "What is the cardinal operational divide between how a Black Hat Criminal and an Ethical Hacker handles Phase 5 (Covering Tracks)?",
    shortAnswer: "A Black Hat maliciously tampers with or deletes client audit logs and event trails to evade detection; an Ethical Hacker NEVER modifies client logs, but cleanly removes dropped test tools and documents all actions in the final report.",
    explanation: "Phase 5 defines the ethical divide in cybersecurity. Black hat attackers execute anti-forensics—wiping Windows Event Logs, shredding files, and timestomping metadata to destroy legal evidence. An ethical hacker must NEVER delete or alter client audit logs, as doing so destroys compliance and forensic records. Instead, the ethical hacker removes dropped webshells/test accounts, restores modified configs, and logs all cleanup actions in the final deliverable.",
    hint: "Think about why an auditor removes their own test tools but never burns down the building's security camera room.",
    level: "basic",
    codeExample: `// Phase 5 Operational Mandate:
BLACK HAT:    wevtutil cl Security (Maliciously wipes all intrusion evidence)
ETHICAL AUDIT: rm /tmp/pentest_tool && kill -9 $BEACON_PID (Cleans testing artifacts only, preserves client logs!)`
  },
  {
    question: "What is 'Timestomping', and how do forensic investigators detect it by comparing NTFS `$STANDARD_INFORMATION` vs `$FILE_NAME` attributes?",
    shortAnswer: "Timestomping alters a file's `$STANDARD_INFORMATION` timestamps to match legitimate OS files; investigators detect it because the NTFS `$FILE_NAME` attribute is updated only by the OS kernel and retains the true creation date.",
    explanation: "In Windows NTFS filesystems, every file has two timestamp sets: 1. `$STANDARD_INFORMATION` (stores MACE timestamps visible in Windows Explorer, modifiable by user-mode APIs like `SetFileTime`); 2. `$FILE_NAME` (stores kernel-level MACE timestamps updated only by the NTFS filesystem driver). When an attacker timestomps `malware.exe` to display a 2018 date, `$FILE_NAME` still records the true 2026 creation date, exposing the timestomping anomaly in forensic MFT analysis.",
    hint: "Remember that Windows Explorer shows the user-editable timestamp, but the deep NTFS Master File Table retains the true kernel date.",
    level: "expert",
    codeExample: `// Forensic MFT Timestamp Discrepancy (EnCase / Autopsy Analysis):
File: C:\\Windows\\System32\\malware.exe
$STANDARD_INFORMATION: 2018-04-12 10:20:00 (Forged by Timestomp!)
$FILE_NAME:            2026-08-23 02:15:30 (True Creation Date Recorded by NTFS Kernel!)
-> Forensic Alert: Timestomping Tampering Confirmed!`
  },
  {
    question: "What is Windows Event ID `1102` (and Event ID `104`), and why does it trigger an immediate Critical Severity SOC alert in enterprise SIEMs?",
    shortAnswer: "Event ID 1102 records that 'The audit log was cleared' in the Security log (Event ID 104 for System log); it is an explicit indicator of adversary anti-forensics or malicious insider activity.",
    explanation: "When an attacker runs `wevtutil cl Security` to delete evidence of their intrusion, the Windows Event Log service writes one final, immutable entry before clearing the log: Event ID 1102 (\"The audit log was cleared by User Administrator\"). Because legitimate system administrators almost never clear the security log, enterprise SIEM correlation rules flag Event ID 1102 as a Critical Priority incident, dispatching incident responders immediately.",
    hint: "Think of an alarm that triggers the exact moment someone turns off the security cameras.",
    level: "basic",
    codeExample: `// Windows Event Log Clear Trigger:
Command Executed: wevtutil cl Security
Splunk SIEM Log:   EventCode=1102 "The audit log was cleared by User: FINTECH\\Administrator"
SOC Alert:         [CRITICAL SEVERITY] Adversary Log Tampering Detected on Host 192.168.1.50!`
  },
  {
    question: "What is 'Centralized Immutable WORM Logging', and how does it defeat adversary Phase 5 anti-forensics attempts on compromised endpoints?",
    shortAnswer: "Streaming system logs in real time over encrypted TLS to an external Write-Once Read-Many (WORM) SIEM server that local endpoint administrators cannot modify or delete.",
    explanation: "When a black hat achieves root or SYSTEM access on a host, they have total control over local files (`rm -rf /var/log/*`). Centralized Immutable Logging solves this: within milliseconds of an event occurring, Sysmon, auditd, or Winlogbeat streams the log over TLS to a separate, hardened Splunk/Elastic cluster configured with Write-Once Read-Many (WORM) storage. Even if the attacker completely formats the local machine, the full chronological intrusion log is safe and immutable on the central SIEM.",
    hint: "Think of security camera footage streaming live to an off-site bank vault that the burglar cannot enter.",
    level: "moderate",
    codeExample: `// Immutable Centralized Syslog Pipeline:
Local Server (192.168.1.50) ──[ Encrypted TLS Syslog Stream ]──> Splunk WORM Server (10.0.0.99)
// Attacker runs 'rm -rf /var/log' on local machine
// Splunk Server retains 100% of event records, proving the intrusion!`
  },
  {
    question: "What is 'Secure File Shredding' (e.g. `sdelete` / `shred`), and why does standard operating system deletion fail to erase forensic file data?",
    shortAnswer: "Standard deletion merely unlinks the file pointer in the filesystem table, leaving raw data blocks on disk; Secure shredding overwrites the physical sectors with zeroes or random bytes multiple times.",
    explanation: "When a user executes `del file.exe` or `rm file.exe`, the operating system only marks the file's entry in the Master File Table (MFT) or inode table as 'free'. The actual binary data remains intact on the storage drive until overwritten, allowing forensic recovery tools (Autopsy, FTK) to recover the deleted malware. Tools like `sdelete -p 3` or `shred -u -z -n 10` overwrite the raw disk sectors with random patterns and zeroes, rendering physical recovery impossible.",
    hint: "Think about throwing away the index card pointing to a book in a library versus burning the pages of the book itself.",
    level: "basic",
    codeExample: `// Secure File Shredding Commands:
Windows: sdelete.exe -p 3 -z C:\\Temp\\exploit.exe (3-pass cryptographic overwrite)
Linux:   shred -u -z -n 10 /tmp/backdoor.sh      (10-pass overwrite + zero-fill + unlink)`
  },
  {
    question: "How do threat actors manipulate Linux Shell History (`.bash_history`), and what defensive configuration prevents history tampering?",
    shortAnswer: "Attackers run `history -c`, `unset HISTFILE`, or prepend commands with a leading space; defenders enforce append-only attributes (`chattr +a .bash_history`) and stream commands to syslog via `auditd`.",
    explanation: "By default, bash records executed commands in memory and writes them to `~/.bash_history` upon exit. Attackers disable logging via `export HISTFILE=/dev/null` or `set +o history`. Defenders neutralize this by: 1. Setting `chattr +a ~/.bash_history` (enforces immutable append-only mode so existing entries cannot be edited or deleted); 2. Deploying Linux `auditd` rules (`-a always,exit -F arch=b64 -S execve`) which stream every executed system command to centralized logs regardless of bash settings.",
    hint: "Think of making a physical logbook with permanently glued pages so nobody can rip out or erase previous entries.",
    level: "moderate",
    codeExample: `// Linux Immutable History & Auditd Protection:
# 1. Enforce Append-Only History File:
chattr +a /root/.bash_history

# 2. Auditd Real-Time Command Execution Logger (/etc/audit/rules.d/audit.rules):
-a always,exit -F arch=b64 -S execve -k command_execution`
  },
  {
    question: "Under the Indian Information Technology Act 2000, what are the specific legal penalties for Section 65 (Tampering with Computer Source Documents and Logs)?",
    shortAnswer: "Imprisonment for a term which may extend to 3 years, or with fine which may extend to ₹2,00,000 (2 Lakhs INR), or with both.",
    explanation: "Section 65 of the IT Act 2000 explicitly criminalizes tampering with computer source documents: \"Whoever knowingly or intentionally conceals, destroys or alters or intentionally or knowingly causes another to conceal, destroy or alter any computer source code... or computer records... shall be punishable with imprisonment up to three years, or with fine up to two lakh rupees, or with both.\" Erasing server audit logs to cover crimes is a direct Section 65 offense.",
    hint: "Remember the Indian cyber law section (Section 65) that punishes destroying or altering computer source records and logs.",
    level: "basic",
    codeExample: `// IT Act 2000 Section 65 Legal Enforcement:
Offense: Tampering with, deleting, or concealing server audit logs and source code.
Penalty: Up to 3 Years Imprisonment + ₹2,00,000 Fine (Cognizable Criminal Offense).`
  },
  {
    question: "What is Section 65B of the Indian Evidence Act 1872 (and BSA 2023), and why is preserving uncorrupted electronic logs essential for legal prosecution?",
    shortAnswer: "It establishes the legal admissibility of electronic records in Indian courts; a formal Section 65B certificate must accompany digital evidence certifying that logs were generated and stored in a tamper-free manner.",
    explanation: "In Indian courts, digital evidence (server logs, CCTV footage, database records) is inadmissible unless accompanied by a Section 65B Certificate signed by the system custodian. The certificate must state that the computer was operating properly, that the logs were captured during ordinary business activities, and that the cryptographic hash/chain of custody proves the logs were never altered or tampered with.",
    hint: "Remember the famous Indian Evidence Act certification required to present computer logs as valid evidence in court.",
    level: "moderate",
    codeExample: `// Section 65B Indian Evidence Act Compliance:
1. Capture SHA-256 Hash of Server Log File at 02:00 AM IST.
2. Maintain Chain of Custody Log.
3. Issue Signed Section 65B Certificate certifying system integrity -> 100% Admissible in Court!`
  },
  {
    question: "What is 'Log Injection' (Log Forging / Log Poisoning), and how do attackers inject fake log entries into web server access logs to mislead forensic investigators?",
    shortAnswer: "Injecting Carriage Return Line Feed (`\r\n` / `%0d%0a`) characters into HTTP requests, creating fake log entries that make it appear as though an innocent IP address performed the attack.",
    explanation: "If an application logs user input directly without sanitization (e.g. `logger.info(\"User logged in: \" + username)`), an attacker inputs `admin\r\n2026-08-23 02:00:00 [INFO] User logged in: legitimate_user from 192.168.1.10`. The injected CRLF characters cause the logging framework to write a new line, forging a completely authentic-looking log entry that points forensic investigators toward a decoy employee.",
    hint: "Think about typing an Enter key and fake timestamp into a guestbook to create a fake entry in someone else's name.",
    level: "moderate",
    codeExample: `// Log Injection via CRLF in HTTP Request:
GET /login?user=admin%0d%0a2026-08-23+12:00:00+INFO+User+mamata+logged+in+successfully! HTTP/1.1
// Output in access.log creates a forged second log line!`
  },
  {
    question: "What is the 'NTFS USN Change Journal', and how do forensic analysts use it to uncover deleted malware and timestomping activity?",
    shortAnswer: "A low-level Windows NTFS feature that records every filesystem change (file creation, deletion, renaming, data truncation) in a hidden, append-only journal (`$UsnJrnl`).",
    explanation: "Even if an attacker deletes `backdoor.exe` and clears the Windows Event Log, the NTFS driver automatically writes a record to `$Extend\\$UsnJrnl:$J`. The USN Journal records the exact timestamp when the file was created, when data was appended, and when it was deleted. Forensic investigators parse the USN Journal with tools like `MFTECmd` to reconstruct the attacker's exact file manipulation timeline.",
    hint: "Think of an automatic flight data recorder (black box) built into the hard drive that records every single file creation and deletion.",
    level: "expert",
    codeExample: `// Parsing NTFS USN Journal via MFTECmd:
MFTECmd.exe -f "C:\\$Extend\\$UsnJrnl:$J" --csv C:\\ForensicOutput
// Output:
2026-08-23 02:14:10 | FileCreate | C:\\Windows\\Temp\\beacon.exe (MFT Record: 104822)
2026-08-23 02:18:45 | FileDelete | C:\\Windows\\Temp\\beacon.exe (Attacker deleted tool!)`
  },
  {
    question: "What is 'File Integrity Monitoring' (FIM / e.g. Wazuh / OSSEC), and how does it detect Phase 5 anti-forensics modifications to critical system files in real time?",
    shortAnswer: "Continuously calculating cryptographic checksums (SHA-256) of critical system binaries and configuration files, generating instant alerts if any file is modified, deleted, or replaced.",
    explanation: "FIM tools (Wazuh, Tripwire, OSSEC) maintain a baseline database of cryptographic hashes for sensitive files (`/etc/passwd`, `C:\\Windows\\System32\\kernel32.dll`, `/var/log/auth.log`). If an attacker alters or timestomps a file, the file's SHA-256 hash changes instantly. The FIM agent flags the modification within seconds, streaming an alert to the centralized SIEM before the attacker can disable defenses.",
    hint: "Think of taking a digital fingerprint of every important document and sounding an alarm if a single letter changes.",
    level: "basic",
    codeExample: `// Wazuh File Integrity Monitoring (FIM) Rule (ossec.conf):
<syscheck>
  <directories check_all="yes" realtime="yes">/etc,/usr/bin,/var/log</directories>
  <directories check_all="yes" realtime="yes">C:\\Windows\\System32</directories>
</syscheck>`
  },
  {
    question: "Under the Indian CERT-In Directions 2022, what is the mandatory requirement for 'Log Retention and Archival' for all organizations operating in India?",
    shortAnswer: "Mandates that all system, server, and network logs must be maintained and securely stored domestically within India for a rolling period of at least 180 days.",
    explanation: "Issued under Section 70B of the IT Act 2000, CERT-In directions legally require all service providers, intermediaries, data centers, and corporate bodies to maintain secure, synchronized logs of all their ICT systems for a minimum of 180 consecutive days within Indian jurisdiction. This ensures that forensic investigators can reconstruct historical intrusion paths even if adversaries attempted to wipe local logs.",
    hint: "Remember the 180-day domestic log archival rule mandated by India's national cyber agency CERT-In.",
    level: "basic",
    codeExample: `// CERT-In 2022 Log Retention Mandate:
Requirement: Rolling 180-Day secure log archival stored within Indian jurisdiction.
NTP Sync:    All ICT system clocks MUST synchronize with National Physical Laboratory (NPL) or NIC NTP servers.`
  },
  {
    question: "What is 'Process Hollowing' and 'Module Unlinking', and how do rootkits manipulate memory to hide active malware processes from forensic memory dumps?",
    shortAnswer: "Process Hollowing replaces legitimate executable code inside a suspended process with shellcode; Module Unlinking removes a DLL's pointer from the InLoadOrderModuleList in the Process Environment Block (PEB).",
    explanation: "To hide from live forensic memory analysis tools (like Volatility): 1. Process Hollowing: The attacker starts a legitimate process (`svchost.exe`) in a suspended state, unmaps its memory with `NtUnmapViewOfSection`, writes shellcode, and resumes the thread; 2. PEB Unlinking: The rootkit modifies the doubly-linked list in the Process Environment Block (`PEB->Ldr`), unlinking the malicious DLL so standard memory enumeration APIs skip over the hidden module entirely.",
    hint: "Think of hollowing out the inside of a hollow book to hide a key, and removing the index card from the library catalog.",
    level: "expert",
    codeExample: `// PEB InLoadOrderModuleList Unlinking (C++):
PLIST_ENTRY pCurrent = &pLdr->InLoadOrderModuleList;
pCurrent->Blink->Flink = pCurrent->Flink;
pCurrent->Flink->Blink = pCurrent->Blink;
// Result: DLL is completely hidden from EnumProcessModules() and Task Manager!`
  },
  {
    question: "What is 'Prefetch Analysis' in Windows digital forensics, and how does it prove that an attacker executed a tool even if the executable was deleted?",
    shortAnswer: "Windows Prefetch (`C:\\Windows\\Prefetch\\*.pf`) caches executable launch metadata to optimize boot performance; parsing `.pf` files reveals the executable name, run count, and exact last execution timestamp.",
    explanation: "To optimize application launch times, the Windows Cache Manager creates a Prefetch file (`[EXECUTABLE]-[HASH].pf`) in `C:\\Windows\\Prefetch` whenever a program runs. Even if an attacker uses `sdelete` to shred `mimikatz.exe`, the prefetch file `MIMIKATZ.EXE-B92F1A04.pf` remains on disk. Forensic tools parse the prefetch file, proving conclusively that `mimikatz.exe` was executed 3 times, with the exact timestamp of its last execution.",
    hint: "Think of an automatic receipt that Windows prints every time an application runs, stored in a separate hidden folder.",
    level: "moderate",
    codeExample: `// Parsing Windows Prefetch via PECmd:
PECmd.exe -f "C:\\Windows\\Prefetch\\MIMIKATZ.EXE-B92F1A04.pf"
// Forensic Findings:
Executable Name: MIMIKATZ.EXE
Run Count:       3
Last Run Time:   2026-08-23 02:12:45 UTC
Loaded DLLs:     ntdll.dll, kernel32.dll, advapi32.dll, crypt32.dll`
  },
  {
    question: "What is 'Shimcache' (AppCompatCache) and 'Amcache.hve', and why are they critical forensic artifacts for tracking adversary tool execution?",
    shortAnswer: "Windows Application Compatibility caches stored in the registry that record executable file paths, file sizes, SHA-1 hashes, and compilation timestamps for every application executed on the system.",
    explanation: "Shimcache (in `SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache`) and Amcache (in `C:\\Windows\\appcompat\\Programs\\Amcache.hve`) help Windows track application compatibility. When an attacker runs a custom exploit binary, Shimcache records the complete file path, file size, and last modified time. Amcache records the SHA-1 hash of the binary. Even if the attacker deletes the tool and wipes the event logs, the Shimcache preserves the forensic record of the binary's execution.",
    hint: "Remember the Windows compatibility registry caches that record the SHA-1 hash and file path of every program ever run.",
    level: "expert",
    codeExample: `// Shimcache & Amcache Forensic Analysis:
Artifact: HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache
Extracted: C:\\Users\\Public\\exploit.exe | Executed: TRUE | SHA-1: 4a8b9f21c340...`
  },
  {
    question: "What is the 'Ethical Artifact Cleanup Procedure' at the conclusion of an authorized penetration test?",
    shortAnswer: "A rigorous 4-step protocol: 1. Terminate all active test sessions; 2. Delete dropped test files, audit scripts, and diagnostic tools; 3. Revert modified configurations/registry keys; 4. Document all cleanup actions in the final debrief report.",
    explanation: "At the end of an authorized penetration test, ethical security engineers execute a structured cleanup: 1. Terminate background processes and test sessions; 2. Systematically delete all dropped testing artifacts across all client hosts; 3. Remove created local/domain test user accounts and revert modified firewall/registry settings to baseline; 4. Deliver a formal 'Cleanup Verification Sign-off' in the security debrief report.",
    hint: "Remember the 4-step ethical cleanup protocol: Terminate sessions, Delete test tools, Revert configs, and Document in report.",
    level: "basic",
    codeExample: `// Ethical Security Audit Cleanup Checklist:
[X] Step 1: Terminate all test sessions and background diagnostic processes.
[X] Step 2: Delete test artifacts (rm /var/www/html/test_artifact.tmp).
[X] Step 3: Remove test accounts (net user test_account /delete).
[X] Step 4: Validate client audit logs are intact and deliver debrief report.`
  },
  {
    question: "What is 'Network Time Protocol' (NTP) Synchronization, and why is synchronized time essential for digital forensics and Chain of Custody?",
    shortAnswer: "Synchronizing all enterprise server clocks to a single authoritative atomic time source (e.g. NPL India); ensures forensic investigators can accurately correlate event timelines across multiple disparate servers.",
    explanation: "In enterprise investigations, an attack hops across firewalls, web servers, and domain controllers in seconds. If Server A's clock is 4 minutes fast and Server B's clock is 2 minutes slow, correlating events across SIEM logs is chaotic and legally challengeable in court. Synchronizing all endpoints to an authoritative NTP stratum-1 clock guarantees accurate, millisecond-level chronological correlation.",
    hint: "Think about making sure all detectives' watches are set to the exact same second before investigating a crime.",
    level: "basic",
    codeExample: `// NTP Clock Synchronization Configuration (/etc/ntp.conf):
server time.nplindia.org iburst # National Physical Laboratory India Stratum-1 NTP
// Guarantees millisecond-level forensic timestamp accuracy across all enterprise logs.`
  },
  {
    question: "What is 'Volatile Memory Forensics' (using Volatility Framework), and how does RAM analysis capture anti-forensics artifacts that never touched the hard disk?",
    shortAnswer: "Extracting and analyzing a physical RAM dump (`.raw` / `.vmem`) to uncover in-memory injected shellcode, unbacked DLLs, decrypted C2 encryption keys, and active network connections.",
    explanation: "Advanced adversaries use fileless malware that runs entirely in memory without writing files to disk, and wipe event logs upon exit. Volatile Memory Forensics dumps physical RAM. Using the Volatility Framework (`vol -f mem.raw windows.malfind`), investigators inspect memory pages for `PAGE_EXECUTE_READWRITE` permissions, dumping injected shellcode, extracting decrypted passwords from memory, and recovering terminated network socket connections.",
    hint: "Think of taking a photographic snapshot of everything a person is thinking at the exact moment the crime occurred.",
    level: "expert",
    codeExample: `// Volatility 3 Memory Forensic Inspection:
vol.py -f memory.raw windows.malfind
// Output:
PID: 1048 (explorer.exe) | Address: 0x2a0000 | Injected Shellcode: \x48\x31\xc0\x50... (Meterpreter Found!)`
  },
  {
    question: "What is 'Chain of Custody' in digital forensic investigations, and what four details must be documented for every piece of digital evidence?",
    shortAnswer: "The chronological documentation showing the seizure, custody, control, transfer, and disposition of digital evidence; must record: 1. Collector Name, 2. Exact Timestamp, 3. Cryptographic Hash (SHA-256), 4. Physical Storage Location.",
    explanation: "If digital evidence is collected without a strict Chain of Custody, opposing counsel in court will argue that the evidence was contaminated, edited, or planted. For every seized hard drive or log file, investigators maintain a Chain of Custody form recording: 1. Who collected the evidence; 2. Exact date, time, and location; 3. Initial cryptographic hash (SHA-256) calculated at the time of seizure; 4. Secure, tamper-evident bag barcode and storage locker location.",
    hint: "Think of an official police evidence logbook tracking who touched the evidence box from the crime scene to the courtroom.",
    level: "moderate",
    codeExample: `// Digital Evidence Chain of Custody Record:
Item:          Server A Image (sda_forensic.raw)
Seized By:     Mamata Sen (Lead Forensic Investigator)
Timestamp:     2026-08-23 03:00:00 IST | Location: Kolkata Data Center
SHA-256 Hash:  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Storage:       Evidence Locker #4 (Tamper-Evident Seal #98241)`
  },
  {
    question: "Synthesizing Phase 5 (Covering Tracks & Anti-Forensics): what is the ultimate truth regarding digital footprints left by attackers?",
    shortAnswer: "No intrusion is completely invisible; every system interaction leaves subtle forensic artifacts across Master File Tables, USN Journals, Prefetch caches, memory dumps, and immutable SIEM streams.",
    explanation: "Adversaries may delete event logs, timestomp files, and shred binaries, but digital physics ensures that every action leaves a residual trace. By correlating low-level artifacts—comparing `$STANDARD_INFORMATION` with `$FILE_NAME`, parsing the NTFS USN Journal, analyzing Prefetch `.pf` files, inspecting memory dumps with Volatility, and querying immutable off-site SIEM archives—forensic investigators reconstruct the complete chronological reality of the breach.",
    hint: "Conclude by recognizing Edmond Locard's Exchange Principle: 'Every contact leaves a trace.'",
    level: "expert",
    codeExample: `// Locard's Exchange Principle in Digital Forensics:
Adversary_Intrusion() + Anti_Forensics_Attempts() = RESIDUAL_ARTIFACTS(MFT + USN + Prefetch + SIEM);`
  }
];

export default questions;
