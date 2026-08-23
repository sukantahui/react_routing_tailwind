// topic3_questions.js
// 30 Comprehensive Questions on Case Study 3: Sony Pictures Hack (2014) - Nation-State Cyber Warfare & Extortion

const questions = [
  {
    id: 1,
    question: "What made the November 2014 Sony Pictures Entertainment hack a historic turning point in enterprise cyber security?",
    shortAnswer: "It was the first major instance where a foreign nation-state launched a hybrid attack combining destructive wiper malware, massive public data extortion, and physical threats against a commercial entertainment corporation.",
    explanation: "Before Sony Pictures, nation-state cyber operations targeted government agencies or critical military defense contractors for covert intelligence. Sony proved that a commercial film studio could become the target of destructive wiper malware, executive email leaks, and physical threats due to geopolitical dissatisfaction with a movie satire ('The Interview').",
    hint: "Destructive wiping malware combined with public extortion targeting a commercial media company.",
    level: "Moderate",
    codeExample: `// Sony Hack Characteristics:
const sonyIncidentProfile = {
  victim: "Sony Pictures Entertainment (Culver City, California)",
  threatActor: "Lazarus Group / Guardians of Peace (GOP) - North Korea (RGB)",
  geopoliticalTrigger: "The satirical comedy film 'The Interview'",
  payloadTypes: ["Destructive Disk Wiper (WIPALL / Destover)", "Data Exfiltration & Extortion"]
};`
  },
  {
    id: 2,
    question: "What group claimed public responsibility for the Sony hack, and which nation-state was formally attributed by the FBI?",
    shortAnswer: "The group called themselves '#GOP' (Guardians of Peace); the United States FBI formally attributed the attack to the North Korean government (Lazarus Group / Reconnaissance General Bureau).",
    explanation: "On November 24, 2014, Sony employees' computer screens were hijacked by a glowing red skeleton graphic demanding compliance with GOP's demands. Following forensic malware analysis, infrastructure tracking, and code overlap with previous South Korean banking wipes (DarkSeoul), the FBI formally attributed the assault to North Korea.",
    hint: "Guardians of Peace (GOP) attributed by the FBI to North Korea (Lazarus Group).",
    level: "Moderate",
    codeExample: `// FBI Official Attribution Indicators (December 19, 2014):
const attributionEvidence = [
  "Code overlap with 'DarkSeoul' malware (2013 South Korean bank wipes)",
  "Hardcoded C2 IP addresses in North Korean infrastructure ranges",
  "Shared compilation timestamps and XOR encryption algorithms with Lazarus toolkits"
];`
  },
  {
    id: 3,
    question: "What specific destructive malware family was deployed across Sony's corporate network, and what was its technical payload?",
    shortAnswer: "WIPALL (also known as 'Destover' or 'Bravad'), a multi-component wiper that overwrote Master Boot Records (MBRs) and wiped raw disk sectors before forcing a system crash.",
    explanation: "WIPALL consisted of droppers, network propagation tools, and a raw disk-wiping driver (`elrawdsk.sys` by EldoS). It bypassed standard Windows file system APIs by writing raw garbage strings (e.g. repeating byte patterns like `0x55 0xAA` or random data) directly across physical drive sectors `\\\\.\\PhysicalDrive0`, rendering thousands of servers and workstations unbootable.",
    hint: "WIPALL/Destover using raw disk drivers to overwrite MBRs and wipe storage geometry.",
    level: "Expert",
    codeExample: `// Conceptual MBR Wiping Mechanism (WIPALL / Destover):
HANDLE hDisk = CreateFileA("\\\\.\\PhysicalDrive0", GENERIC_READ | GENERIC_WRITE,
                           FILE_SHARE_READ | FILE_SHARE_WRITE, NULL, OPEN_EXISTING, 0, NULL);
if (hDisk != INVALID_HANDLE_VALUE) {
    char garbageBuffer[512] = {0}; // Zeros out Master Boot Record and Partition Table
    DWORD bytesWritten;
    WriteFile(hDisk, garbageBuffer, 512, &bytesWritten, NULL);
    CloseHandle(hDisk);
    // Triggers immediate BSOD kernel crash / system reboot into unbootable state
}`
  },
  {
    id: 4,
    question: "How did the attackers achieve initial access and deep domain-wide penetration inside Sony Pictures?",
    shortAnswer: "Through spear-phishing emails targeting Sony systems engineers and executives, followed by harvesting plaintext Active Directory credentials stored in unencrypted password files.",
    explanation: "Attackers sent targeted phishing emails containing malicious PDF and document exploits to Sony staff. Once inside, they discovered internal directories containing unencrypted files named `passwords.xlsx` and `passwords.txt`, which held domain administrator credentials, AWS API keys, and corporate root passwords.",
    hint: "Spear-phishing followed by finding plaintext password spreadsheets on internal file shares.",
    level: "Moderate",
    codeExample: `// Insecure Plaintext Credential File Discovered during Recon:
// File: \\\\fileserver01\\IT_Admin\\passwords.xlsx
// Contained:
// - Domain Admin Passwords
// - Social Security Numbers of 47,000 employees
// - Production MySQL / Oracle DB Root Passwords
// - Executive Private Email Archive Keys`
  },
  {
    id: 5,
    question: "What total volume of corporate data was stolen, and what categories of sensitive intellectual property were leaked?",
    shortAnswer: "Over 100 Terabytes of data, including unreleased movies ('Fury', 'Annie'), 30,000 executive emails, employee salaries, medical records, and Social Security numbers.",
    explanation: "The attackers spent an estimated two months exfiltrating data prior to triggering the wiper. They dumped full unreleased high-definition movie copies onto BitTorrent networks, leaked thousands of private emails from Co-Chairperson Amy Pascal and CEO Michael Lynton, and exposed the salaries and SSNs of Hollywood celebrities and 47,000 employees.",
    hint: "Over 100 Terabytes of unreleased movies, executive emails, employee PII, and financial records.",
    level: "Moderate",
    codeExample: `// Exfiltrated Data Categories:
const exfiltratedSonyData = {
  unreleasedFilms: ["Fury (2014)", "Annie (2014)", "Still Alice (2014)", "Mr. Turner (2014)"],
  executiveEmailArchives: "30,000+ emails exposing confidential studio dealmaking and candid executive remarks",
  employeePII: "47,000 Social Security numbers, medical health claims, salary contracts",
  totalVolume: "100+ Terabytes"
};`
  },
  {
    id: 6,
    question: "Why was Sony's internal Active Directory architecture vulnerable to rapid domain-wide collapse?",
    shortAnswer: "Lack of Active Directory Administrative Tiering (flat domain architecture) where compromising a single domain administrator gave attackers control over every workstation and server.",
    explanation: "Sony lacked Microsoft's recommended 3-tier Active Directory administrative model (Tier 0: Domain Controllers, Tier 1: Servers/Applications, Tier 2: Workstations). IT administrators logged into everyday workstations using Tier 0 domain admin accounts, allowing malware to dump cached credentials from LSASS memory.",
    hint: "Lack of Active Directory administrative tiering, allowing domain-wide credential harvesting.",
    level: "Expert",
    codeExample: `// Microsoft Active Directory Administrative Tiering Model:
// TIER 0: Domain Controllers & PKI (Domain Admins ONLY log in here)
// TIER 1: Enterprise Servers, Databases, Cloud Infrastructure
// TIER 2: End-User Workstations & Laptops (Local Admins ONLY)
// Rule: A Tier 0 credential must NEVER touch a Tier 2 workstation memory space!`
  },
  {
    id: 7,
    question: "What commercial raw disk driver was abused by the WIPALL malware to bypass Windows kernel security?",
    shortAnswer: "EldoS `elrawdsk.sys`, a legitimate commercially available driver that allows user-mode applications to write directly to raw disk sectors without administrative restrictions.",
    explanation: "Windows NT security blocks standard user-mode processes from direct raw disk write operations. To circumvent this, the attackers bundled `elrawdsk.sys`, a signed commercial driver created by EldoS Corporation for low-level disk utilities. The malware loaded this driver to write zeroes directly over physical disk sectors.",
    hint: "EldoS `elrawdsk.sys` driver allowing user-mode software to write raw disk sectors.",
    level: "Expert",
    codeExample: `// Abuse of EldoS RawDisk Driver (elrawdsk.sys):
// Attackers passed a hardcoded license key string to activate the driver:
// Key: "#EldoS#RawDisk#"
// Allowed userland wiper binary to write directly to \\\\.\\ElRawDisk\\PhysicalDrive0`
  },
  {
    id: 8,
    question: "How did the attackers execute public extortion and physical intimidation against Sony and movie theaters?",
    shortAnswer: "They issued threats of physical terrorist violence against movie theaters planning to screen 'The Interview', causing major theater chains to cancel showings.",
    explanation: "On December 16, 2014, the GOP issued an ominous statement invoking the September 11 attacks, warning: 'We recommend you to keep yourself distant from the places (theaters) where The Interview will be shown.' Major cinema chains (AMC, Regal, Cinemark) pulled the film, prompting Sony to initially cancel its theatrical release before shifting to digital VOD.",
    hint: "Threats of physical violence against theaters screening the film, invoking 9/11 imagery.",
    level: "Moderate",
    codeExample: `// GOP Extortion Statement Excerpt:
/*
"Remember the 11th of September 2001.
We recommend you to keep yourself distant from the places where 'The Interview' is shown.
Whatever comes in the coming days is called by the greed of Sony Pictures Entertainment."
*/`
  },
  {
    id: 9,
    question: "What role does 'Immutable / WORM Backup Storage' play in surviving destructive wiper malware attacks like WIPALL?",
    shortAnswer: "Immutable backups use Write-Once-Read-Many policies and air-gapped snapshots that cannot be deleted, modified, or encrypted even by compromised domain administrator credentials.",
    explanation: "Wiper malware systematically attempts to delete Volume Shadow Copies (`vssadmin delete shadows /all /quiet`) and wipe accessible network backup shares. Immutable cloud storage (e.g. AWS S3 Object Lock in Compliance Mode) and offline air-gapped tape backups ensure that clean, intact snapshots exist for bare-metal disaster recovery.",
    hint: "Write-Once-Read-Many (WORM) storage preventing domain admins or wipers from modifying backups.",
    level: "Moderate",
    codeExample: `// AWS S3 Object Lock Policy (WORM Compliance Mode):
const backupBucketPolicy = {
  ObjectLockMode: "COMPLIANCE", // Cannot be deleted or overwritten by ANY IAM user or root
  RetentionDays: 365,
  LegalHold: "ON"
};`
  },
  {
    id: 10,
    question: "What is 'LSASS Memory Dumping' and how did attackers harvest credentials across Sony's endpoints?",
    shortAnswer: "Extracting plaintext credentials, NTLM password hashes, and Kerberos tickets stored in the memory space of the `lsass.exe` (Local Security Authority Subsystem Service) process using tools like Mimikatz.",
    explanation: "When an administrator logs into a Windows computer, Windows caches the credentials in the LSASS process memory. Attackers with administrative or SYSTEM privileges invoke `MiniDumpWriteDump` against `lsass.exe` to parse and dump passwords in cleartext.",
    hint: "Dumping cached passwords and NTLM hashes from the `lsass.exe` system process.",
    level: "Expert",
    codeExample: `// Mimikatz LSASS Dump Command Sequence:
// privilege::debug
// sekurlsa::logonpasswords
// Extracts cleartext passwords, NTLM hashes, and Kerberos tickets from memory!`
  },
  {
    id: 11,
    question: "How did Sony employees maintain essential business operations during the weeks when all internal computer networks were shut down?",
    shortAnswer: "Reverted to completely analog, manual paper processes: paper payroll checks, physical notepads, manual call trees, and personal BlackBerry devices.",
    explanation: "Because over 70% of Sony's corporate network was bricked or disconnected to stop wiper propagation, employees could not use email, internal financial databases, or digital editing suites. Executives famously retrieved old BlackBerry devices from storage closets because the legacy BlackBerry Enterprise Server operated on an isolated network.",
    hint: "Reverting to paper notepads, manual checks, and legacy isolated BlackBerry devices.",
    level: "Moderate",
    codeExample: `// Operational Business Continuity Fallback (Manual Mode):
const offlineOperations = [
  "Paper check issuance for contractor payroll",
  "Physical whiteboards and paper runners for studio scheduling",
  "Legacy BlackBerry Enterprise Server for encrypted executive messaging"
];`
  },
  {
    id: 12,
    question: "What is 'Credential Guard' in modern Windows enterprise operating systems, and how does it prevent LSASS memory theft?",
    shortAnswer: "It uses hardware Virtualization-Based Security (VBS) to run LSASS inside an isolated virtual container (LSAIso), preventing even local root/SYSTEM processes from reading credential memory.",
    explanation: "Introduced in Windows 10 Enterprise / Server 2016, Windows Defender Credential Guard isolates credential secrets using hypervisor-enforced memory paging. Even if malware gains kernel/SYSTEM privileges on a host, it cannot dump secrets from the isolated `LSAIso.exe` virtual environment.",
    hint: "Virtualization-Based Security (VBS) isolating credential secrets inside a secure container.",
    level: "Expert",
    codeExample: `// Enabling Windows Defender Credential Guard via PowerShell:
Set-ItemProperty -Path "HKLM:\\System\\CurrentControlSet\\Control\\LSA" -Name "LsaCfgFlags" -Value 1 -Type DWord
// Enforces Hypervisor-Protected Code Integrity (HVCI) and isolated LSA secrets`
  },
  {
    id: 13,
    question: "What is 'Data Exfiltration Throttling' and how could network egress monitoring have detected the 100+ TB data theft before the wipe?",
    shortAnswer: "Monitoring abnormal outbound traffic volume thresholds and triggering automated egress bandwidth throttling or alerting when gigabytes/terabytes leave internal servers.",
    explanation: "Stealing 100 Terabytes of high-definition video files and mailbox archives requires immense outbound network bandwidth over weeks. A Network Detection and Response (NDR) solution configured with baseline anomaly thresholds would have detected sustained multi-terabyte outbound flows to foreign IP addresses and automatically severed connections.",
    hint: "Automated monitoring and throttling of massive, unusual outbound data flows.",
    level: "Moderate",
    codeExample: `// NDR Egress Data Volume Anomaly Rule (Zeek / Suricata):
/*
event: outbound_traffic_threshold_exceeded
conditions:
  source_subnet: 10.0.0.0/8
  destination: EXTERNAL_IP
  bytes_outbound_1hr: "> 50 GB"
action:
  alert_severity: CRITICAL
  trigger_firewall_quarantine: true
*/`
  },
  {
    id: 14,
    question: "What geopolitical significance did President Barack Obama's public response to the Sony hack represent?",
    shortAnswer: "It was the first time a US President publicly named a foreign head of state/government for a cyber attack against an American corporation and promised a proportional response.",
    explanation: "During an official White House press conference on December 19, 2014, President Obama stated: 'We can confirm that North Korea engaged in this attack. We will respond. We will respond proportionally, and in a place and time and manner that we choose.' This was followed by targeted executive sanctions and mysterious nationwide Internet outages in North Korea.",
    hint: "A US President directly naming a foreign government for a commercial corporate cyber attack.",
    level: "Moderate",
    codeExample: `// Diplomatic & Sanctions Escalation:
const executiveOrder13687 = {
  signedBy: "President Barack Obama",
  date: "January 2, 2015",
  action: "Imposed comprehensive financial sanctions on North Korea's Reconnaissance General Bureau (RGB)",
  legalBasis: "Direct state-sponsored cyber attack on US critical commercial infrastructure"
};`
  },
  {
    id: 15,
    question: "What is 'Privilege Access Management' (PAM) and how does it eliminate plaintext password spreadsheets?",
    shortAnswer: "A centralized security vault that manages, rotates, and brokers administrative credentials on-demand with multi-factor authorization, session recording, and zero stored plaintext passwords.",
    explanation: "In Sony's environment, administrators stored static passwords in `passwords.xlsx`. A PAM platform (e.g. CyberArk, HashiCorp Vault) vaults all privileged passwords, automatically rotates them after each checkout (Just-In-Time access), and never reveals the raw password string to human engineers.",
    hint: "Centralized credential vaulting with Just-In-Time rotating credentials and session recording.",
    level: "Moderate",
    codeExample: `// PAM Just-In-Time Credential Broker Request:
async function requestAdminAccess(targetServer, reason) {
  const session = await pamVault.requestAccess({
    target: targetServer,
    role: "DomainAdmin",
    durationMinutes: 30,
    mfaToken: await getFido2Assertion(),
    justification: reason
  });
  // Returns one-time ephemeral Kerberos ticket; password rotated automatically after 30 mins!
  return session;
}`
  },
  {
    id: 16,
    question: "How did the WIPALL malware delete Windows Volume Shadow Copies to prevent system recovery?",
    shortAnswer: "By executing commands like `vssadmin.exe Delete Shadows /All /Quiet` and `wbadmin DELETE SYSTEMSTATEBACKUP` via automated batch scripts.",
    explanation: "Windows Volume Shadow Copies allow administrators to restore modified or deleted files to previous snapshot states. WIPALL executed silent command-line utilities to purge all local restore points and shadow volumes before overwriting the Master Boot Record.",
    hint: "Executing vssadmin commands to silently delete all local shadow copies and restore points.",
    level: "Moderate",
    codeExample: `// WIPALL Anti-Recovery Command Sequence:
// cmd.exe /c vssadmin.exe Delete Shadows /All /Quiet
// cmd.exe /c wbadmin.exe delete catalog -quiet
// cmd.exe /c bcdedit /set {default} recoveryenabled No
// cmd.exe /c bcdedit /set {default} bootstatuspolicy ignoreallfailures`
  },
  {
    id: 17,
    question: "What is 'Egress Filtering' and how does restricting outbound network traffic stop C2 communication and data dumping?",
    shortAnswer: "Egress filtering blocks all outbound connections from enterprise servers except to explicitly approved IP addresses, domain names, and standard ports.",
    explanation: "Servers housing confidential movie files, financial databases, or active directory controllers have no legitimate reason to initiate raw FTP, SMB, or HTTP connections to arbitrary foreign IP addresses. Restricting egress traffic to strict whitelists prevents attackers from beaconing to C2 servers or uploading exfiltrated files.",
    hint: "Restricting outbound server connections strictly to approved destination IP whitelists.",
    level: "Moderate",
    codeExample: `// Inbound & Outbound Egress Firewall Policy (Palo Alto / Fortinet):
/*
Rule Name: RESTRICT_SERVER_EGRESS
Source Zone: INTERNAL_DATACENTER_SERVERS (10.20.0.0/16)
Destination Zone: INTERNET_UNTRUSTED
Action: DROP
Allowed Exceptions:
  - Destination: Approved Cloud Backup Vault (Port 443 / TLS 1.3)
  - Destination: Internal WSUS Patch Server (Port 8530)
*/`
  },
  {
    id: 18,
    question: "What is 'Living-off-the-Land' (LotL) and how did the Sony attackers move across the network without generating suspicious alerts?",
    shortAnswer: "Using native Windows administrative tools (e.g. `net.exe`, `psexec.exe`, `wmic.exe`, `schtasks.exe`) to execute commands and traverse subnets without dropping custom malware binaries.",
    explanation: "By abusing built-in administration tools that IT staff used daily, the attackers blended into normal enterprise operational background noise. They executed commands like `net view`, `net group 'Domain Admins' /domain`, and `wmic process call create` to map the network and deploy payloads.",
    hint: "Using built-in system administration utilities like Net, WMIC, and PsExec to blend in.",
    level: "Expert",
    codeExample: `// Native Windows LotL Discovery Commands:
// net user /domain
// net group "Domain Admins" /domain
// wmic /node:"10.20.1.50" process call create "C:\\Windows\\Temp\\wipall.exe"`
  },
  {
    id: 19,
    question: "Why is 'Executive Email Security & Retention Policy' a critical governance lesson derived from the Sony hack?",
    shortAnswer: "Storing decades of unencrypted executive emails creates an existential liability; modern governance enforces automated message expiration policies (e.g. 30-90 days) and encryption at rest.",
    explanation: "Sony executives had email archives dating back years containing unvarnished private opinions on actors, directors, and business deals. When exfiltrated, these caused immense reputational damage. Modern policies enforce strict automated data retention and purge schedules so that historical conversations are not permanently stored.",
    hint: "Enforcing short automated email retention schedules to minimize exfiltration exposure.",
    level: "Moderate",
    codeExample: `// Microsoft 365 Automated Retention & Purge Policy:
const corporateEmailRetentionPolicy = {
  mailboxType: "Executive C-Suite",
  autoArchiveDays: 30,
  hardDeletePurgeDays: 90, // Irrevocably purges emails older than 90 days
  encryptionStandard: "Customer-Managed Key (CMK) AES-256 with Hardware HSM"
};`
  },
  {
    id: 20,
    question: "What role does 'Network Segmentation between Corporate IT and Production Studio Environments' play in media organizations?",
    shortAnswer: "It prevents an administrative IT network breach (e.g. phishing an HR or legal employee) from jumping into the high-performance media storage grids where unreleased master video files reside.",
    explanation: "In a properly segmented media company, the corporate enterprise LAN (email, web browsing, HR) is logically and physically separated from the Production Content Network (SAN/NAS storage containing raw 4K/8K film masters and editing suites). Sony's flat network allowed attackers to move freely from corporate email into movie file repositories.",
    hint: "Isolating high-value media production SAN/NAS storage from corporate office IT subnets.",
    level: "Moderate",
    codeExample: `// Media Enterprise Network Segmentation:
// ZONE 1: Corporate Enterprise LAN (Employees, Email, HR, Web)
// --- STRICT ZTNA / FIREWALL GATEWAY (No direct routing) ---
// ZONE 2: Post-Production Content SAN/NAS (Unreleased Film Masters, Final Cut Pro Grid)`
  },
  {
    id: 21,
    question: "How did the attackers schedule the wiper execution to maximize damage across all Sony offices globally?",
    shortAnswer: "They coordinated a synchronized detonation timestamp using scheduled tasks (`schtasks.exe`) across multiple time zones, triggering the wipe simultaneously on Monday morning at 6:00 AM.",
    explanation: "To prevent IT teams in one office from alerting others and pulling network plugs, the malware was pre-staged across thousands of machines days in advance. A scheduled task was configured to detonate simultaneously across Culver City, London, Tokyo, and regional offices, crippling the entire global empire at once.",
    hint: "Synchronized scheduled task detonation across global offices to prevent manual intervention.",
    level: "Expert",
    codeExample: `// Synchronized Wiper Detonation Command:
// schtasks /create /tn "GoogleUpdateTask" /tr "C:\\Windows\\Temp\\igfxtray.exe" /sc once /st 06:00:00 /ru "SYSTEM"`
  },
  {
    id: 22,
    question: "What forensic artifact proved the link between the Sony hack and the 2013 'DarkSeoul' attacks in South Korea?",
    shortAnswer: "Identical raw disk wiping algorithms, hardcoded XOR encryption keys, shared command-line strings, and specific DLL compilation timestamps.",
    explanation: "Kaspersky, Symantec, and FBI investigators compared the binary structure of WIPALL with the malware used in the March 2013 South Korean bank and broadcaster wipes ('DarkSeoul'). Both malware families shared distinctive 64-bit XOR keys, identical code structures for invoking `elrawdsk.sys`, and similar C2 beacon structures.",
    hint: "Identical XOR encryption routines, disk wiping code, and shared C2 infrastructure.",
    level: "Expert",
    codeExample: `// Shared XOR Decryption Routine (DarkSeoul / WIPALL):
void decryptPayload(unsigned char* buffer, size_t len) {
    const unsigned char xorKey[] = { 0x56, 0x78, 0x12, 0x34 }; // Hardcoded key signature
    for (size_t i = 0; i < len; i++) {
        buffer[i] ^= xorKey[i % 4];
    }
}`
  },
  {
    id: 23,
    question: "What is 'Bare-Metal Recovery' (BMR) and why is it essential when recovering from destructive Master Boot Record (MBR) wipers?",
    shortAnswer: "The process of restoring a computer system from scratch onto raw hardware, including reinstalling the operating system, partition table, drivers, and applications from clean offline images.",
    explanation: "Because WIPALL completely destroyed partition tables, Master Boot Records, and boot sectors, computers could not boot into Windows Recovery Mode or safe mode. IT teams had to manually re-image thousands of machines from clean USB boot keys or network PXE servers and rebuild disk partition geometry.",
    hint: "Rebuilding entire operating systems and partition tables from scratch onto raw hardware.",
    level: "Moderate",
    codeExample: `// Bare-Metal Recovery Workflow Post-Wiper:
const bareMetalRecoverySteps = [
  "1. Boot from clean, verified offline WinPE / PXE network environment",
  "2. Format raw drive geometry: diskpart -> clean -> convert gpt",
  "3. Create new EFI system partition & NTFS OS volume",
  "4. Apply gold standard hardened OS image via DISM",
  "5. Restore user data from immutable, scanned WORM backup vault"
];`
  },
  {
    id: 24,
    question: "How does 'Host-Based Intrusion Detection' (HIDS / EDR) detect and terminate unauthorized raw disk write operations?",
    shortAnswer: "By hooking kernel APIs (`NtWriteFile`, `ZwCreateFile`) to block any non-system process attempting to open physical disk handles (`\\\\.\\PhysicalDrive*`).",
    explanation: "Modern Endpoint Detection and Response (EDR) agents install kernel filter drivers that intercept device open requests. If an arbitrary binary (like `igfxtray.exe`) attempts to acquire a write handle to `PhysicalDrive0` or load raw disk drivers, the EDR immediately blocks the operation and kills the process.",
    hint: "EDR kernel filter drivers blocking user processes from opening handles to PhysicalDrive0.",
    level: "Expert",
    codeExample: `// Conceptual EDR Kernel Filter Hook:
NTSTATUS HookedNtCreateFile(PHANDLE FileHandle, ACCESS_MASK DesiredAccess, POBJECT_ATTRIBUTES ObjectAttributes) {
    if (IsPhysicalDriveHandle(ObjectAttributes) && (DesiredAccess & FILE_WRITE_DATA)) {
        if (!IsAuthorizedSystemProcess(PsGetCurrentProcess())) {
            LogSecurityAlert("BLOCKED_RAW_DISK_WIPE_ATTEMPT");
            return STATUS_ACCESS_DENIED; // Terminate wiper attempt!
        }
    }
    return OriginalNtCreateFile(FileHandle, DesiredAccess, ObjectAttributes);
}`
  },
  {
    id: 25,
    question: "What is the 'Lazarus Group' and what other major cyber incidents are attributed to this threat actor?",
    shortAnswer: "A North Korean state-sponsored Advanced Persistent Threat (APT) group; also responsible for the 2016 Bangladesh Bank SWIFT robbery ($81M) and the 2017 WannaCry global ransomware outbreak.",
    explanation: "Lazarus Group (also known as APT38, Hidden Cobra, or BeagleBoyz) operates under North Korea's military intelligence apparatus (RGB). They conduct a unique mix of geopolitical espionage, destructive wiping attacks, and large-scale financial cryptocurrency theft to generate foreign currency.",
    hint: "North Korean APT group responsible for Sony hack, Bangladesh Bank heist, and WannaCry.",
    level: "Moderate",
    codeExample: `// Lazarus Group Major Operations Timeline:
const lazarusOperations = [
  { year: 2013, operation: "DarkSeoul", target: "South Korean Banks & TV Stations (Wiper)" },
  { year: 2014, operation: "Sony Pictures Hack", target: "Sony Pictures Entertainment (Wiper & Extortion)" },
  { year: 2016, operation: "Bangladesh Bank Heist", target: "Federal Reserve / SWIFT ($81M Stolen)" },
  { year: 2017, operation: "WannaCry Outbreak", target: "Global SMBv1 Worm Ransomware" },
  { year: 2022, operation: "Ronin Bridge Hack", target: "Axie Infinity Cryptocurrency Bridge ($620M Stolen)" }
];`
  },
  {
    id: 26,
    question: "How does the principle of 'Defense-in-Depth' protect unreleased intellectual property from being leaked during an exfiltration campaign?",
    shortAnswer: "By implementing layered controls: data classification, DRM (Digital Rights Management), envelope encryption at rest, micro-segmentation, and Data Loss Prevention (DLP) egress inspection.",
    explanation: "If an adversary compromises a workstation, DRM ensures the movie files remain encrypted with hardware-bound keys. If the file is transferred, DLP network sensors inspect egress traffic and block confidential file transfers. Layering multiple independent controls ensures no single compromised account results in a leak.",
    hint: "Layered DRM encryption, data classification, and DLP egress inspection preventing leaks.",
    level: "Moderate",
    codeExample: `// Multi-Layer Content Protection Pipeline:
const layeredContentSecurity = [
  "Layer 1: Enterprise DRM (Files encrypted with ephemeral token; only render inside secure editing app)",
  "Layer 2: Storage Encryption (AES-256 GCM on SAN storage with HSM key vault)",
  "Layer 3: Network Isolation (Post-production SAN isolated in VLAN 60 with zero internet routing)",
  "Layer 4: Data Loss Prevention (DLP) (Blocks upload of files matching media video signatures)"
];`
  },
  {
    id: 27,
    question: "What crisis management lesson did corporate executives learn regarding ransom payments and extortion demands from nation-state actors?",
    shortAnswer: "Paying or capitulating to nation-state extortionists does not guarantee data will not be leaked or systems restored, and emboldens adversaries to escalate demands.",
    explanation: "Sony initially considered pulling 'The Interview' to appease the hackers. However, capitulating to extortion demands damaged their commercial reputation and set a dangerous precedent. Cybersecurity and counter-terrorism experts advise that nation-state actors rarely honor non-disclosure promises.",
    hint: "Capitulating to extortion demands fails to protect data and encourages escalated attacks.",
    level: "Moderate",
    codeExample: `// Strategic Incident Crisis Management Rule:
const crisisManagementProtocol = {
  policyOnExtortion: "DO NOT CAPITULATE / DO NOT PAY",
  rationale: [
    "State actors have no commercial incentive to delete exfiltrated copies",
    "Capitulation invites follow-up extortion demands",
    "May violate international sanctions (OFAC / Treasury regulations)"
  ]
};`
  },
  {
    id: 28,
    question: "What is 'Honeytokening' and how could canary credentials have detected the Sony attackers during internal reconnaissance?",
    shortAnswer: "Placing fake, highly enticing credentials (e.g. an unencrypted file named `domain_admin_passwords.xlsx`) that alert the SOC the moment any user attempts to read or authenticate with them.",
    explanation: "If Sony security teams had seeded their file shares with canary files (honeytokens), the moment the attackers opened `passwords.xlsx` or attempted to use the fake domain admin credentials on a server, a high-priority silent tripwire alert would have triggered, exposing the attacker's IP and active session.",
    hint: "Fake attractive credentials placed as silent tripwires that alert SOC upon touch.",
    level: "Expert",
    codeExample: `// Honeytoken Canary Configuration:
const canaryAccount = {
  username: "svc_super_admin_backup",
  passwordHash: "$2a$12$FakePasswordHashPlacedInDecoyShare",
  associatedHoneyFile: "\\\\fileserver01\\Admin\\master_passwords.xlsx",
  alertTrigger: "IMMEDIATE_SOC_PAGERDUTY_DISPATCH: Honeytoken touched by user session!"
};`
  },
  {
    id: 29,
    question: "How does the Indian DPDP Act 2023 penalize gross negligence involving the storage of plaintext employee credentials and sensitive PII?",
    shortAnswer: "The Data Protection Board of India can impose statutory penalties up to ₹250 Crores for failure to adopt reasonable technical security safeguards like encryption at rest.",
    explanation: "Storing employee Social Security numbers, health claims, salary contracts, and domain passwords in unencrypted spreadsheets is a textbook violation of statutory safeguard requirements. Under the DPDP Act 2023, data fiduciaries in Kolkata, Barrackpore, and across India face maximum penalties up to ₹250 Crores for such negligence.",
    hint: "Penalties up to ₹250 Crores under DPDP 2023 for storing unencrypted PII and passwords.",
    level: "Moderate",
    codeExample: `// DPDP 2023 Statutory Safeguard Checklist:
const dpdpSafeguardCompliance = {
  requirement: "Section 8(5) - Reasonable Security Safeguards",
  mandatoryPractices: [
    "Mandatory AES-256 encryption at rest for all employee PII and contracts",
    "Zero plaintext storage of administrative or database credentials",
    "Role-based access control (RBAC) with regular access reviews"
  ],
  nonComplianceExposureINR: 2500000000 // ₹250 Crores
};`
  },
  {
    id: 30,
    question: "What ultimate defensive takeaway must students in Barrackpore and Kolkata remember from the Sony Pictures case study?",
    shortAnswer: "Commercial organizations can become targets of nation-state warfare; defense requires assuming total breach, eliminating plaintext credentials via PAM, isolating Active Directory tiers, and maintaining immutable air-gapped backups.",
    explanation: "Sony proved that any high-profile commercial business can face advanced state-sponsored attackers armed with destructive wiper malware. Robust defense requires Tiered Active Directory architecture, strict Privileged Access Management (PAM), immutable WORM backups, and egress network monitoring to stop catastrophic destruction.",
    hint: "Assume breach, eliminate plaintext passwords with PAM, enforce AD tiering, and use immutable backups.",
    level: "Moderate",
    codeExample: `// The Sony Post-Mortem Defense Checklist:
const enterpriseResilienceChecklist = [
  "1. Eliminate all plaintext password files -> Deploy enterprise PAM vault (CyberArk/HashiCorp)",
  "2. Implement 3-Tier Active Directory administrative model (Tier 0/1/2 isolation)",
  "3. Enable Windows Defender Credential Guard (Virtualization-Based Security)",
  "4. Deploy Immutable WORM and offline air-gapped backup vaults for bare-metal recovery",
  "5. Restrict outbound egress network traffic and deploy continuous NDR data exfiltration monitoring"
];`
  }
];

export default questions;
