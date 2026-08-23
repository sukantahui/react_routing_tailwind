// topic5_questions.js
// 30 Comprehensive Questions on Case Study 5: WannaCry & NotPetya Ransomware Outbreaks (2017) - EternalBlue Exploit

const questions = [
  {
    id: 1,
    question: "What weaponized cyber exploit served as the shared underlying propagation engine for both WannaCry and NotPetya in 2017?",
    shortAnswer: "EternalBlue (CVE-2017-0144 / MS17-010), a leaked NSA exploit targeting a critical Remote Code Execution vulnerability in Microsoft Server Message Block version 1 (SMBv1).",
    explanation: "Leaked in April 2017 by the mysterious hacking group 'The Shadow Brokers', EternalBlue exploited a mathematical buffer overflow flaw in how Windows SMBv1 handled Srv!SmbTransaction state allocations on TCP Port 445. It allowed unauthenticated attackers to execute arbitrary shellcode in the Windows kernel without user interaction.",
    hint: "The leaked NSA exploit targeting SMBv1 on Port 445 (MS17-010).",
    level: "Moderate",
    codeExample: `// EternalBlue SMBv1 Vulnerability Fingerprint:
const exploitProfile = {
  cve: "CVE-2017-0144",
  microsoftBulletin: "MS17-010",
  vulnerableProtocol: "SMBv1 (Server Message Block)",
  targetPort: 445,
  leakedBy: "The Shadow Brokers (Lost in Translation Dump)",
  kernelImplantUsed: "DoublePulsar Ring-0 Backdoor"
};`
  },
  {
    id: 2,
    question: "How did WannaCry (May 2017) differ fundamentally from NotPetya (June 2017) in terms of attacker objectives?",
    shortAnswer: "WannaCry was authentic extortion ransomware seeking financial profit in Bitcoin, whereas NotPetya was a state-sponsored destructive wiper masquerading as ransomware, designed to permanently destroy data.",
    explanation: "WannaCry generated unique RSA/AES keys and provided a working decryption mechanism if victims paid the $300 Bitcoin ransom. NotPetya generated a completely random, unrecoverable installation key and permanently overwrote the Master File Table (MFT) and MBR, making decryption mathematically impossible even if victims paid.",
    hint: "WannaCry was real ransomware; NotPetya was a destructive wiper masquerading as ransomware.",
    level: "Moderate",
    codeExample: `// Ransomware vs Fake-Ransomware Wiper:
const malwareComparison = {
  wannaCry: {
    type: "True Crypto-Ransomware",
    keys: "Saved AES-128 key encrypted with public RSA-2048 key",
    canDecrypt: true,
    objective: "Financial profit ($300 BTC per host)"
  },
  notPetya: {
    type: "Destructive Wiper Masquerading as Ransomware",
    keys: "Random string generated and discarded from memory",
    canDecrypt: false, // Mathematical impossibility
    objective: "Geopolitical economic destruction of Ukraine"
  }
};`
  },
  {
    id: 3,
    question: "What famous emergency mechanism stopped the global spread of WannaCry within 24 hours of its release?",
    shortAnswer: "British researcher Marcus Hutchins (MalwareTech) discovered and registered a hardcoded, unregistered 'kill-switch' domain name found inside the malware's binary.",
    explanation: "WannaCry contained a hardcoded check: before encrypting a system, it attempted to resolve a nonsense domain: `www.ifferfsodp9ifjaposdfjhgosurijfaewrwergwea.com`. If the domain did NOT resolve (as expected on normal Internet connections), it continued spreading. Once Hutchins registered the domain for $10.69, all subsequent WannaCry executions saw the domain live and went to sleep.",
    hint: "Registering an unregistered sinkhole domain that served as a hardcoded kill-switch.",
    level: "Moderate",
    codeExample: `// WannaCry Kill-Switch Check (Decompiled C Logic):
BOOL CheckKillSwitch() {
    HINTERNET hInternet = InternetOpenA("Microsoft Internet Explorer", INTERNET_OPEN_TYPE_DIRECT, NULL, NULL, 0);
    HINTERNET hUrl = InternetOpenUrlA(hInternet,
        "http://www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com",
        NULL, 0, INTERNET_FLAG_RELOAD, 0);
    if (hUrl != NULL) {
        InternetCloseHandle(hUrl);
        InternetCloseHandle(hInternet);
        return TRUE; // Domain resolves -> EXIT PROCESS AND STOP PROPAGATING!
    }
    return FALSE; // Domain fails -> PROCEED WITH ETERNALBLUE & ENCRYPTION
}`
  },
  {
    id: 4,
    question: "What initial supply chain vector did NotPetya use to infiltrate thousands of corporate networks worldwide?",
    shortAnswer: "A malicious software update injected into 'M.E.Doc', Ukraine's mandatory, ubiquitous accounting and tax filing software.",
    explanation: "NotPetya did not rely on phishing. Russian military intelligence (Sandworm) compromised the update server of Intellect Service (makers of M.E.Doc, used by ~80% of Ukrainian businesses). When M.E.Doc downloaded a routine signed software update (`ezvit.exe`), it dropped NotPetya directly into corporate accounting networks, instantly weaponizing EternalBlue across connected subnets.",
    hint: "Compromised update server of M.E.Doc, Ukraine's mandatory accounting software.",
    level: "Expert",
    codeExample: `// M.E.Doc Supply Chain Infiltration Vector:
const notPetyaSupplyChain = {
  compromisedVendor: "Intellect Service (Kyiv, Ukraine)",
  softwareProduct: "M.E.Doc (Ukrainian Tax & Accounting Suite)",
  updateComponent: "ezvit.exe (Backdoored with Trojan-Downloader)",
  payloadDelivery: "Automated scheduled software update (June 27, 2017)"
};`
  },
  {
    id: 5,
    question: "Why was NotPetya able to rapidly infect and wipe fully patched Windows computers that had already applied the MS17-010 security patch?",
    shortAnswer: "Because it bundled internal credential harvesting tools (Mimikatz) and propagated laterally via legitimate administrative tools (PsExec and WMI) using stolen domain admin credentials.",
    explanation: "Even if a workstation was patched against EternalBlue, NotPetya dumped administrative credentials from the LSASS memory of the initial infected M.E.Doc accounting server. It then used Windows Management Instrumentation (WMI) and PsExec (`psexec.exe -u domain\\admin -p password`) to execute the wiper on fully patched servers across the internal network.",
    hint: "Dumping domain credentials with Mimikatz and moving laterally via PsExec and WMI.",
    level: "Expert",
    codeExample: `// NotPetya Dual-Engine Lateral Propagation:
// Vector 1 (Unpatched): EternalBlue SMBv1 Exploit on Port 445
// Vector 2 (Patched): Harvested credentials via PsExec / WMI
// Command: rundll32.exe "C:\\Windows\\perfc.dat",#1 60
// WMI Command: wmic /node:"10.0.1.25" /user:"admin" /password:"Pass123" process call create "rundll32.exe C:\\Windows\\perfc.dat,#1"`
  },
  {
    id: 6,
    question: "What global multinational corporations suffered catastrophic multi-thousand-crore losses during the NotPetya outbreak?",
    shortAnswer: "A.P. Møller-Maersk (shipping), FedEx / TNT Express (logistics), Merck & Co. (pharmaceuticals), and Saint-Gobain (construction).",
    explanation: "NotPetya is recognized by the White House as the single most financially destructive cyber attack in history, causing over ₹83,000 Crores ($10+ Billion) in global damage. Maersk had to reinstall 4,000 servers, 45,000 PCs, and 2,500 applications across 600 global sites; FedEx lost $300M+; Merck lost over $1 Billion.",
    hint: "Maersk, FedEx/TNT, and Merck suffering billions of dollars in global operational disruption.",
    level: "Moderate",
    codeExample: `// Global Financial Losses from NotPetya (2017):
const notPetyaDamageEstimatesUSD = {
  merckPharmaceuticals: 1000000000, // $1.0 Billion
  fedExTNTExpress: 850000000,       // $850 Million
  maerskShipping: 300000000,         // $300 Million
  saintGobain: 384000000,            // $384 Million
  totalGlobalImpactUSD: 10000000000  // $10+ Billion (~₹83,000 Crores)
};`
  },
  {
    id: 7,
    question: "How was Maersk's global Active Directory domain miraculously recovered after every single domain controller worldwide was wiped?",
    shortAnswer: "A single offline Domain Controller located at a branch office in Port Harcourt, Nigeria happened to be disconnected due to a local power outage during the attack.",
    explanation: "NotPetya wiped all 150+ Maersk Active Directory domain controllers across the globe in minutes. IT leadership discovered that their branch office in Port Harcourt, Nigeria had lost electrical power, keeping its DC offline and uninfected. A Nigerian engineer brought the physical hard drive on a commercial flight to London to rebuild the entire global corporation.",
    hint: "A lone surviving Domain Controller in Nigeria saved by a local electrical power outage.",
    level: "Moderate",
    codeExample: `// The Port Harcourt Miracle:
const maerskRecovery = {
  totalDomainControllers: 150,
  destroyedDomainControllers: 149,
  survivingDomainController: 1,
  location: "Port Harcourt, Nigeria (Saved by local electrical grid blackout)",
  recoveryMethod: "Physical hard drive flown to UK headquarters to seed global AD restore"
};`
  },
  {
    id: 8,
    question: "What impact did WannaCry have on the United Kingdom's National Health Service (NHS)?",
    shortAnswer: "Infected 80 hospital trusts, locking doctors out of patient records, cancelling 19,000 medical appointments, and forcing emergency ambulances to be diverted.",
    explanation: "Because NHS trusts ran unpatched Windows 7 and legacy Windows XP computers connected on flat regional healthcare networks, WannaCry spread uncontrollably. MRI scanners, pathology lab computers, and emergency room terminals were encrypted, resulting in massive clinical chaos and an estimated ₹760 Crore (£92M) in recovery costs.",
    hint: "Infected 80 NHS hospital trusts, diverting ambulances and cancelling 19,000 appointments.",
    level: "Moderate",
    codeExample: `// NHS WannaCry Impact Summary:
const nhsWannaCryImpact = {
  impactedHospitalTrusts: 80,
  impactedGPClinics: 600,
  cancelledAppointments: 19000,
  emergencyAmbulancesDiverted: true,
  rootCause: "Unpatched MS17-010 across legacy Windows XP / 7 endpoints"
};`
  },
  {
    id: 9,
    question: "What technical flaw in NotPetya's key generation proved it was mathematically impossible to recover encrypted files?",
    shortAnswer: "The installation key displayed on the victim's screen was generated as a pseudo-random alphanumeric string that was immediately discarded without ever being encrypted or saved.",
    explanation: "In legitimate ransomware (e.g. WannaCry), the AES file encryption key is encrypted using the attacker's public RSA master key so the attacker can decrypt it with their private key upon payment. NotPetya simply generated a random string using `CryptGenRandom` and discarded the AES key, turning the malware into a one-way destructive wiper.",
    hint: "The AES decryption key was discarded from memory without being saved or encrypted.",
    level: "Expert",
    codeExample: `// NotPetya Bogus Installation Key Generation:
void GenerateBogusVictimID(char* victimIdBuffer) {
    // Generates 32 random characters:
    CryptGenRandom(hProv, 32, victimIdBuffer);
    // CRITICAL: It NEVER encrypts the actual AES disk key with a public RSA key!
    // The raw AES key is wiped from memory. Decryption is physically impossible!
}`
  },
  {
    id: 10,
    question: "What is 'DoublePulsar' and how did it work alongside EternalBlue?",
    shortAnswer: "A ring-0 kernel-mode backdoor implant that executed in memory, loaded payload DLLs without touching the disk, and listened on TCP Port 445.",
    explanation: "EternalBlue was the exploit that breached the SMBv1 vulnerability to achieve kernel memory execution; DoublePulsar was the kernel implant injected by EternalBlue. Once resident in memory, DoublePulsar intercepted SMB packets and provided a stealthy gateway to inject the user-mode ransomware/wiper payload.",
    hint: "Ring-0 kernel memory backdoor loaded by EternalBlue to execute payloads.",
    level: "Expert",
    codeExample: `// EternalBlue + DoublePulsar Chain:
// 1. Attacker sends crafted SMBv1 packet (CVE-2017-0144) to Target IP:445
// 2. Buffer overflow triggers kernel code execution
// 3. DoublePulsar Ring-0 implant installed in kernel memory
// 4. DoublePulsar receives and executes payload DLL (WannaCry / NotPetya)`
  },
  {
    id: 11,
    question: "Why was the 'MS17-010' patch released by Microsoft in March 2017 not applied by hundreds of thousands of organizations prior to May 2017?",
    shortAnswer: "Due to slow enterprise patch cycles, fear of breaking legacy legacy business applications, unmanaged asset inventories, and reliance on unsupported operating systems (Windows XP/Server 2003).",
    explanation: "Microsoft published the MS17-010 security bulletin on March 14, 2017—two full months before WannaCry hit. However, many enterprises lacked automated patch management pipelines, had blind spots in their IT asset registers, or ran legacy industrial and healthcare devices that vendor contracts forbade them from updating without recertification.",
    hint: "Patch management delays, legacy software dependencies, and unsupported Windows XP systems.",
    level: "Moderate",
    codeExample: `// Patch Management Failure Timeline:
// March 14, 2017: Microsoft releases MS17-010 security bulletin for SMBv1
// April 14, 2017: Shadow Brokers leaks working EternalBlue exploit code
// May 12, 2017: WannaCry detonates, infecting 200,000+ unpatched systems worldwide!`
  },
  {
    id: 12,
    question: "What is 'SMBv1' (Server Message Block v1) and why is its unconditional deactivation universally mandated today?",
    shortAnswer: "A 30-year-old legacy network file-sharing protocol with no modern cryptographic security, vulnerable to buffer overflows, plaintext eavesdropping, and remote execution.",
    explanation: "Developed in the 1980s, SMBv1 lacked modern security features like message signing, AES encryption, and protocol state verification. Following 2017, Microsoft permanently removed SMBv1 from Windows 10/11, and cybersecurity standards (CISA, CERT-In) mandate blocking TCP Port 445 at all perimeters and disabling SMBv1 across all subnets.",
    hint: "A legacy 1980s protocol lacking modern security, now permanently deprecated.",
    level: "Moderate",
    codeExample: `// PowerShell command to permanently disable SMBv1:
Disable-WindowsOptionalFeature -Online -FeatureName "SMB1Protocol" -NoRestart
Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force`
  },
  {
    id: 13,
    question: "How did NotPetya weaponize the 'Master File Table' (MFT) and 'Master Boot Record' (MBR) on NTFS file systems?",
    shortAnswer: "It rebooted the computer into a fake 'CHKDSK' screen while actively encrypting the NTFS Master File Table with a random XOR key and overwriting the MBR with a custom bootloader.",
    explanation: "NotPetya did not encrypt files one-by-one. Instead, it forced a hard reboot. Upon booting, it displayed a fake screen claiming: `Repairing file system on C:`. In reality, its custom bootloader was encrypting the entire NTFS Master File Table (MFT), destroying the file system pointers so Windows could no longer locate any files on the hard drive.",
    hint: "Displaying a fake CHKDSK screen while encrypting the NTFS Master File Table (MFT).",
    level: "Expert",
    codeExample: `// Fake CHKDSK Screen Displayed by NotPetya Bootloader:
/*
Repairing file system on C:
The type of the file system is NTFS.
One of your disks contains errors and needs to be repaired. This attempt may take several hours...
[0% to 100% progress counter while MFT is destroyed in background]
*/`
  },
  {
    id: 14,
    question: "What file extension was appended to encrypted files during a WannaCry infection?",
    shortAnswer: "`.WNCRY` (or `.WNCRYT` during temporary encryption staging).",
    explanation: "WannaCry traversed all local drives and mounted network shares, encrypting documents, databases, archives, and images with AES-128-CBC and renaming them with the `.WNCRY` extension. It then dropped its GUI decryption tool: `@WanaDecryptor@.exe`.",
    hint: "The distinctive `.WNCRY` file extension.",
    level: "Moderate",
    codeExample: `// WannaCry File Renaming Loop:
// Original: C:\\Users\\Mamata\\Documents\\Accounts_2026.xlsx
// Encrypted: C:\\Users\\Mamata\\Documents\\Accounts_2026.xlsx.WNCRY
// Dropped GUI Decryptor: C:\\Users\\Mamata\\Desktop\\@WanaDecryptor@.exe`
  },
  {
    id: 15,
    question: "How did WannaCry generate random public IP addresses to spread globally over the Internet?",
    shortAnswer: "It initialized multiple scanning threads that generated pseudo-random IPv4 addresses and attempted raw TCP connections to Port 445.",
    explanation: "WannaCry featured an automated worm propagation thread. It generated random 32-bit IP addresses (excluding private ranges `127.0.0.0/8`, `10.0.0.0/8`, etc.), created raw sockets to Port 445, and if a target system responded with an SMBv1 negotiate packet, it immediately transmitted the EternalBlue exploit buffer.",
    hint: "Multi-threaded random IPv4 scanner firing EternalBlue at TCP Port 445.",
    level: "Moderate",
    codeExample: `// WannaCry Global IP Scanner Loop (Decompiled):
DWORD WINAPI ScanGlobalSubnetsThread(LPVOID lpParam) {
    while (TRUE) {
        DWORD targetIp = GenerateRandomIpv4();
        if (IsValidPublicIp(targetIp)) {
            AttemptEternalBlueExploit(targetIp, 445);
        }
    }
}`
  },
  {
    id: 16,
    question: "What unique emergency action did Microsoft take during the WannaCry outbreak regarding unsupported legacy operating systems?",
    shortAnswer: "Microsoft took the extraordinary step of releasing public security patches for officially unsupported and end-of-life operating systems, including Windows XP and Windows Server 2003.",
    explanation: "Windows XP had reached end-of-life in April 2014, and Microsoft no longer issued public security updates. However, given the catastrophic threat to global hospitals and public infrastructure, Microsoft broke policy on May 12, 2017 and released standalone MS17-010 patches for Windows XP, Windows 8, and Windows Server 2003.",
    hint: "Releasing emergency out-of-band security patches for end-of-life Windows XP.",
    level: "Moderate",
    codeExample: `// Emergency Out-of-Band Patch Release (KB4012598):
// Microsoft Security Update for Windows XP SP3 (x86)
// Security Bulletin: MS17-010
// Released: May 12, 2017 to halt global WannaCry hospital collapses`
  },
  {
    id: 17,
    question: "How did the 'Shadow Brokers' obtain the NSA's cyber weapons, including EternalBlue?",
    shortAnswer: "They compromised an external staging server or developer environment associated with the NSA's elite Tailored Access Operations (TAO / Equation Group).",
    explanation: "Starting in August 2016, a shadowy persona known as 'The Shadow Brokers' began auctioning classified NSA cyber tools online. On April 14, 2017, they released the 'Lost in Translation' dump containing fully functional kernel exploits (EternalBlue, EternalRomance, EternalSynergy) targeting Microsoft Windows.",
    hint: "Leaked from an NSA Tailored Access Operations (TAO / Equation Group) staging server.",
    level: "Moderate",
    codeExample: `// The Shadow Brokers Lost in Translation Dump (April 14, 2017):
const leakedExploitSuite = [
  "ETERNALBLUE  -> SMBv1 Remote Code Execution (MS17-010)",
  "ETERNALROMANCE-> SMBv1/v2 Arbitrary Read/Write (MS17-010)",
  "ETERNALSYNERGY-> SMBv3 Memory Corruption (MS17-010)",
  "DOUBLEPULSAR   -> Kernel-mode Ring-0 Backdoor Payload Injector"
];`
  },
  {
    id: 18,
    question: "What role does 'Port 445 Perimeter Filtering' play in preventing automated SMB worm outbreaks?",
    shortAnswer: "Blocking inbound and outbound TCP Port 445 at the perimeter edge firewall prevents external worms from scanning or injecting exploit packets into internal subnets.",
    explanation: "SMB is an internal local-area network protocol that should NEVER be exposed to the public Internet. Filtering Port 445 at border routers and upstream ISP firewalls completely blocks external worm propagation engines from reaching enterprise workstations.",
    hint: "Blocking TCP Port 445 at the internet perimeter prevents all external SMB exploitation.",
    level: "Moderate",
    codeExample: `// Border Router / Edge Firewall Rule:
// Drop all inbound and outbound SMB traffic on public interfaces:
iptables -A INPUT -p tcp --dport 445 -j DROP
iptables -A FORWARD -p tcp --dport 445 -j DROP
iptables -A OUTPUT -p tcp --dport 445 -j DROP`
  },
  {
    id: 19,
    question: "What is 'WanaKiwi' and how did it recover WannaCry encrypted files on Windows XP computers without paying ransom?",
    shortAnswer: "A memory-scraping tool developed by French researcher Benjamin Delpy that extracted the prime factors (p and q) of the RSA private key left uncleared in RAM.",
    explanation: "On Windows XP, Microsoft's `CryptReleaseContext` failed to zero out the memory containing the prime numbers (p and q) used to generate the RSA-2048 private key. WanaKiwi scanned process memory, located the prime factors, reconstructed the private key, and decrypted files for free—provided the victim had not rebooted their PC.",
    hint: "Extracting prime numbers p and q left uncleared in Windows XP RAM to reconstruct the RSA key.",
    level: "Expert",
    codeExample: `// WanaKiwi Mathematical RSA Key Reconstruction:
// If (p and q) prime factors are recovered from RAM:
// Modulus: n = p * q
// Euler's Totient: phi(n) = (p - 1) * (q - 1)
// Private Exponent: d = e^(-1) mod phi(n)
// Output: Rebuilt private RSA key decrypts all .WNCRY files!`
  },
  {
    id: 20,
    question: "How did the 2017 outbreaks redefine the concept of 'Cyber Insurance' and the 'Act of War' exclusion clause?",
    shortAnswer: "Insurance companies denied NotPetya coverage claims citing the 'Hostile / Warlike Action' exclusion clause, leading to multi-billion-dollar lawsuits (e.g. Merck v. Ace American Insurance).",
    explanation: "Because Western governments formally attributed NotPetya to Russian military intelligence (GRU) in the context of the Ukraine conflict, insurers refused to pay $1B+ claims under standard 'Act of War' exclusions. Courts ultimately ruled in favor of Merck and Mondelēz, compelling insurers to rewrite policies with specific cyber-warfare definitions.",
    hint: "Insurers invoked the 'Act of War' exclusion clause to deny NotPetya claims.",
    level: "Moderate",
    codeExample: `// Cyber Insurance Dispute Matrix:
const insuranceDispute = {
  plaintiff: "Merck & Co. ($1.4 Billion Claim)",
  defendant: "Ace American Insurance Company",
  defenseArgument: "NotPetya was an uninsurable 'Hostile or Warlike Action' by the Russian GRU",
  courtVerdict: "New Jersey Superior Court ruled exclusion did not apply to commercial cyber attacks"
};`
  },
  {
    id: 21,
    question: "What is 'Network Micro-segmentation' and how would it contain an EternalBlue outbreak within an infected office?",
    shortAnswer: "By blocking lateral East-West Port 445 traffic between workstations in the same subnet, limiting infection strictly to the patient-zero host.",
    explanation: "In a flat VLAN, once Patient Zero is infected, it transmits EternalBlue to all 500 workstations in the same `/24` subnet in seconds. Host-based firewalls (or micro-segmentation tools like Illumio) block direct PC-to-PC Port 445 connections, containing the worm to a single machine.",
    hint: "Blocking East-West PC-to-PC Port 445 traffic prevents lateral propagation across a subnet.",
    level: "Moderate",
    codeExample: `// Host-Based Firewall Rule (Windows Defender Firewall):
// Block Inbound SMB (Port 445) from other client workstations:
New-NetFirewallRule -DisplayName "Block-EastWest-SMB" -Direction Inbound -LocalPort 445 -Protocol TCP -RemoteAddress "192.168.1.0/24" -Action Block`
  },
  {
    id: 22,
    question: "Why was the Bitcoin ransom payment mechanism in NotPetya considered completely non-functional from Day 1?",
    shortAnswer: "The attackers provided a single public Posteo.de email address that was suspended by the German email provider within hours, preventing victims from emailing payment proof.",
    explanation: "Unlike commercial ransomware rings that use dynamic Tor negotiation portals, NotPetya instructed victims to send $300 in Bitcoin to a hardcoded wallet and email the transaction ID to `wowsmith123456@posteo.net`. Posteo immediately shut down the email account, rendering communication impossible and confirming the malware was purely a destructive wiper.",
    hint: "The email provider shut down the attackers' single contact inbox within hours.",
    level: "Moderate",
    codeExample: `// NotPetya Ransom Note Text:
/*
"If you see this text, then your files are no longer accessible...
Send $300 worth of Bitcoin to: 1Mz7153HMuxXTuR2R1t78mGSdzaAtNbBWX
Send your Bitcoin address to email: wowsmith123456@posteo.net"
(Account blocked by Posteo within 2 hours of outbreak!)
*/`
  },
  {
    id: 23,
    question: "What is 'Immutable Backup Storage' (WORM) and why was it the only reliable recovery path during NotPetya?",
    shortAnswer: "Because NotPetya wiped all online backup volumes and Windows restore points using stolen domain admin credentials; only air-gapped or immutable snapshots survived.",
    explanation: "NotPetya weaponized domain admin credentials via WMI/PsExec to format online NAS backup drives. Organizations that had configured Write-Once-Read-Many (WORM) cloud vaults with Object Lock or maintained offline tapes were able to restore systems without paying ransoms.",
    hint: "WORM cloud snapshots and offline tapes cannot be overwritten or deleted by wipers.",
    level: "Moderate",
    codeExample: `// AWS S3 Object Lock (Compliance Mode) Configuration:
const immutableBackupConfig = {
  ObjectLockEnabled: "Enabled",
  Mode: "COMPLIANCE", // Cannot be deleted by ANY user or admin account
  RetentionDays: 180
};`
  },
  {
    id: 24,
    question: "How did the 2017 outbreaks transform enterprise 'Vulnerability Management SLAs' (Service Level Agreements)?",
    shortAnswer: "Mandated emergency patching SLAs for Critical/Exploitable RCE vulnerabilities (e.g. Critical RCEs patched within 48 hours instead of 30-90 days).",
    explanation: "Prior to 2017, enterprise patch cycles were typically 30, 60, or 90 days. WannaCry demonstrated that an unpatched weaponized exploit can compromise 200,000 systems globally in hours. Modern frameworks (CISA KEV catalog, ISO 27001) mandate emergency 24-48 hour patching SLAs for weaponized vulnerabilities.",
    hint: "Accelerating patching timelines from 30-90 days down to emergency 24-48 hour windows.",
    level: "Moderate",
    codeExample: `// Modern Vulnerability Remediation SLA Matrix:
const modernPatchSla = {
  criticalWeaponizedZeroDay: "Within 24 to 48 Hours",
  highSeverityCve: "Within 7 Days",
  mediumSeverityCve: "Within 30 Days",
  lowSeverityCve: "Within 90 Days"
};`
  },
  {
    id: 25,
    question: "What role did North Korea's 'Lazarus Group' play in the creation of WannaCry?",
    shortAnswer: "US, UK, and Australian intelligence agencies formally attributed WannaCry to the Lazarus Group based on shared code signatures, encryption routines, and Bitcoin wallet infrastructure.",
    explanation: "Security researchers (starting with Neel Mehta at Google) identified overlapping source code between early 2015 Lazarus malware samples and WannaCry. In December 2017, the US Department of Justice unsealed indictments against North Korean military hacker Park Jin Hyok for the WannaCry attack.",
    hint: "Formally attributed to North Korea's Lazarus Group by international intelligence agencies.",
    level: "Moderate",
    codeExample: `// US DOJ Indictment (2018):
const dojIndictment = {
  indictedActor: "Park Jin Hyok (Reconnaissance General Bureau / Chosun Expo)",
  attributedOperations: ["WannaCry 2.0 (2017)", "Sony Pictures Hack (2014)", "Bangladesh Bank $81M Heist (2016)"]
};`
  },
  {
    id: 26,
    question: "What is 'CISA Known Exploited Vulnerabilities' (KEV) catalog and how did EternalBlue inspire its creation?",
    shortAnswer: "A binding catalog maintained by the US Cybersecurity and Infrastructure Security Agency listing vulnerabilities actively weaponized in the wild with mandatory remediation deadlines.",
    explanation: "EternalBlue demonstrated the extreme danger of known vulnerabilities remaining unpatched across enterprise infrastructure. CISA established the KEV catalog, requiring all federal agencies and enterprise defenders to treat listed CVEs (including CVE-2017-0144) with urgent, mandatory remediation priorities.",
    hint: "Mandatory catalog of actively exploited vulnerabilities requiring urgent patching.",
    level: "Moderate",
    codeExample: `// CISA KEV Catalog Entry:
{
  "cveID": "CVE-2017-0144",
  "vendorProject": "Microsoft",
  "product": "Windows Server Message Block (SMBv1)",
  "vulnerabilityName": "Microsoft Windows SMBv1 Remote Code Execution",
  "action": "Apply MS17-010 or permanently disable SMBv1"
}`
  },
  {
    id: 27,
    question: "How does 'Network Detection and Response' (NDR) detect EternalBlue exploitation attempts in real-time?",
    shortAnswer: "By analyzing raw SMB traffic on Port 445 for malformed `SMB_COM_TRANSACTION2` secondary requests and abnormal buffer allocation headers.",
    explanation: "Network sensors (Zeek, Suricata, Snort) inspect the raw bytes of SMB packets. EternalBlue generates a distinctive sequence of overlapping SMB transactions to trigger the Srv!SmbTransaction buffer overflow. Snort Rule 42329 detects this exact byte pattern and drops the packet inline.",
    hint: "Inspecting SMB traffic for malformed transaction buffer allocations.",
    level: "Expert",
    codeExample: `// Suricata Rule for EternalBlue SMBv1 Detection:
alert smb any any -> any 445 (
  msg:"ET EXPLOIT Possible MS17-010 EternalBlue Exploit Attempt";
  flow:to_server,established;
  content:"|FF|SMB|32|"; offset:4; depth:5; // SMB_COM_TRANSACTION2
  byte_test:2,>,1024,40; // Abnormal parameter length trigger
  classtype:attempted-admin;
  sid:2024218; rev:3;
)`
  },
  {
    id: 28,
    question: "What is 'Air-Gapping' in healthcare and why did medical devices (e.g. MRI and CT scanners) fall victim during WannaCry?",
    shortAnswer: "Medical devices were connected to the general hospital LAN without micro-segmentation, and ran unpatched legacy Windows embedded operating systems that hospital IT was afraid to patch.",
    explanation: "Hospitals connected MRI and X-ray machines to corporate networks to allow doctors to view scans remotely. However, these devices ran embedded Windows XP/7 that could only be updated by the medical device manufacturer (e.g. Siemens, GE). When WannaCry struck, it jumped laterally across flat hospital subnets into life-critical medical devices.",
    hint: "Medical devices running unpatched legacy Windows connected directly to flat hospital LANs.",
    level: "Moderate",
    codeExample: `// Insecure Hospital LAN Topology:
// Doctor's PC (Infected with WannaCry) === Flat VLAN 10 ===> Siemens MRI Scanner (Windows XP Embedded - Encrypted!)`
  },
  {
    id: 29,
    question: "How does the Indian DPDP Act 2023 penalize healthcare institutions and enterprises that fail to patch known critical RCE vulnerabilities resulting in data destruction?",
    shortAnswer: "The Data Protection Board of India can impose statutory financial penalties up to ₹250 Crores for gross failure to maintain reasonable technical security safeguards (patch management).",
    explanation: "Ignoring a known, publicly patched critical vulnerability (like MS17-010) that leads to ransomware encryption or destruction of citizen medical and financial records constitutes gross negligence under the DPDP Act 2023, exposing entities in Kolkata, Barrackpore, and across India to maximum statutory penalties.",
    hint: "Fines up to ₹250 Crores under DPDP 2023 for gross patch management negligence.",
    level: "Moderate",
    codeExample: `// DPDP 2023 Statutory Liability for Unpatched Systems:
const regulatoryExposure = {
  statute: "Digital Personal Data Protection Act, 2023",
  finding: "Failure to apply critical security patches within reasonable timeframe resulting in data loss",
  maximumStatutoryPenaltyINR: 2500000000 // ₹250 Crores
};`
  },
  {
    id: 30,
    question: "What core architectural formula must students in Barrackpore and Kolkata remember when engineering networks resilient against worm outbreaks?",
    shortAnswer: "Eliminate legacy protocols (disable SMBv1), enforce 24-hour critical patch SLAs, micro-segment East-West workstation traffic, and maintain immutable WORM backups.",
    explanation: "WannaCry and NotPetya proved that unpatched legacy protocols paired with flat networks can destroy global enterprises in minutes. True resilience requires proactive protocol deprecation, automated patching, zero-trust micro-segmentation, and immutable air-gapped backups.",
    hint: "Disable SMBv1, patch rapidly, micro-segment East-West traffic, and use immutable backups.",
    level: "Moderate",
    codeExample: `// The 4-Pillar Anti-Worm Fortress:
const antiWormArchitecture = [
  "1. Deprecate & Disable legacy protocols (SMBv1, SSLv3, TLS 1.0) across all endpoints",
  "2. Strict 24-48 hour Patch SLA for weaponized Remote Code Execution vulnerabilities",
  "3. Host-based Micro-segmentation blocking East-West Port 445 traffic between workstations",
  "4. Immutable, air-gapped Write-Once-Read-Many (WORM) backup snapshots"
];`
  }
];

export default questions;
