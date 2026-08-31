const questions = [
  {
    question: "What was the significance of the 1988 Morris Worm in the history of computer networking and cybersecurity?",
    shortAnswer: "It was the first widely recognized internet worm, infecting ~10% of ARPANET computers and leading to the creation of the first Computer Emergency Response Team (CERT).",
    explanation: "Written by Cornell graduate student Robert Tappan Morris, the worm exploited multiple vulnerabilities in UNIX systems: the `DEBUG` command in sendmail, a buffer overflow in `fingerd` (via `gets()`), and weak passwords in `rsh`/`rexec`. Although Morris intended to gauge the size of the ARPANET, a programming flaw in the replication counter caused machines to be infected multiple times, spawning hundreds of processes that choked CPU queues and crashed over 6,000 servers. It prompted DARPA to establish the first CERT at Carnegie Mellon University.",
    hint: "Recall the first major internet worm of 1988 that exploited fingerd and led directly to the founding of CERT.",
    level: "moderate",
    codeExample: `// Morris Worm fingerd Exploit Vector:
// The UNIX finger daemon used the unsafe gets() function into a 512-byte buffer:
char buf[512];
gets(buf); // No length check → Morris sent 536 bytes to overwrite return address to shellcode.`
  },
  {
    question: "Who was John Draper ('Captain Crunch'), and how did his 1970s discovery shape the 'Phone Phreaking' subculture?",
    shortAnswer: "He discovered that a toy whistle from a cereal box emitted an exact 2600 Hz tone, which reset AT&T telephone trunk switches to allow free unauthorized calls.",
    explanation: "In the 1970s, telecommunications networks used in-band signaling where supervisory control tones travelled over the same copper lines as human voice. John Draper discovered that a plastic whistle included in Cap'n Crunch cereal boxes produced a precise 2600 Hz audio tone. Transmitting this tone down a telephone line signaled to the trunk switch that the line was idle, allowing phreakers to dial operator multi-frequency tones (via electronic 'Blue Boxes') to route global long-distance calls without billing.",
    hint: "Think about the cereal toy whistle that produced the 2600 Hz tone.",
    level: "basic",
    codeExample: `// Phone Phreaking In-Band Signaling Principle:
2600 Hz Tone Broadcasted → Trunk interprets as "Customer Hung Up / Line Idle"
Operator Trunk Enters Listening State → Multi-Frequency (MF) tones routed call free.`
  },
  {
    question: "What was the central ideological argument of 'The Conscience of a Hacker' (The Hacker Manifesto) written by Loyd Blankenship ('The Mentor') in 1986?",
    shortAnswer: "That hacking is driven by intellectual curiosity, the pursuit of knowledge, and egalitarian meritocracy rather than malice, prejudice, or greed.",
    explanation: "Published in the underground hacker e-zine 'Phrack' (Issue 7) following Blankenship's arrest, the Manifesto became the defining philosophical document of early hacker culture. It asserted: 'Yes, I am a criminal. My crime is that of curiosity. My crime is that of judging people by what they say and think, not what they look like.' It argued that computer networks should be free domains for learning and exploration unconstrained by corporate greed or institutional bureaucracy.",
    hint: "Recall the 1986 document asserting: 'My crime is that of curiosity.'",
    level: "moderate",
    codeExample: `// Excerpt from The Hacker Manifesto (1986):
"We explore... and you call us criminals. We seek after knowledge... and you call us criminals. 
We exist without skin color, without nationality, without religious bias... and you call us criminals."`
  },
  {
    question: "How did the 1999 Melissa Virus and 2000 ILOVEYOU Worm revolutionize the delivery vector and propagation speed of malicious software?",
    shortAnswer: "They pioneered automated email address-book mass-mailing using Visual Basic scripts (VBS) and malicious Microsoft Word macros, spreading globally within hours.",
    explanation: "Prior to 1999, viruses spread slowly via physical floppy disks. The Melissa virus (1999) infected Microsoft Word documents with malicious auto-executing macros that hijacked Microsoft Outlook to email infected copies to the first 50 contacts in the victim's address book. In 2000, the ILOVEYOU VBScript worm used romantic social engineering to trick users into opening `LOVE-LETTER-FOR-YOU.TXT.vbs`, infecting over 10% of internet-connected PCs worldwide in under 24 hours and causing over ₹65,000 Crores ($8B) in global damages.",
    hint: "Think about how malicious macros and VBScripts weaponized Microsoft Outlook address books to spread globally in hours.",
    level: "moderate",
    codeExample: `// ILOVEYOU Worm VBScript Outlook Propagation:
Set OutlookApp = CreateObject("Outlook.Application")
Set MapiNamespace = OutlookApp.GetNameSpace("MAPI")
For Each AddressList In MapiNamespace.AddressLists
  For Each Recipient In AddressList.AddressEntries
    Set Mail = OutlookApp.CreateItem(0)
    Mail.To = Recipient.Address
    Mail.Subject = "ILOVEYOU"
    Mail.Body = "kindly check the attached LOVELETTER coming from me."
    Mail.Attachments.Add("LOVE-LETTER-FOR-YOU.TXT.vbs")
    Mail.Send
  Next
Next`
  },
  {
    question: "What was the 'Cult of the Dead Cow' (cDc), and how did their 1998 release of 'Back Orifice' transform Windows remote administration and Trojan horse awareness?",
    shortAnswer: "cDc was an influential hacker group that released Back Orifice, a powerful open-source remote administration tool exposing severe security flaws in Windows 95/98.",
    explanation: "Announced at DEF CON 6 in 1998, Back Orifice was developed by Sir Dystic of cDc. It allowed a remote user to completely control a Windows 95/98 computer across the internet (stealing passwords, logging keystrokes, viewing files, executing commands) using a tiny, hidden background server. While Microsoft initially dismissed it as a malicious tool, Back Orifice forced enterprise vendors and operating system developers to recognize that default desktop configurations lacked basic remote access authorization protections.",
    hint: "Think of the famous 1998 Remote Access Trojan (RAT) named after Microsoft BackOffice.",
    level: "moderate",
    codeExample: `// Back Orifice Architecture (1998):
BOSERVE.EXE (Victim Machine - Hidden 120KB payload listening on UDP port 31337)
BOCLIENT.EXE (Remote Controller - GUI sending encrypted commands to inspect files & logs)`
  },
  {
    question: "How did the monetization of hacking evolve during the 2000s with the rise of 'Carding Forums' and 'Banking Trojans' like Zeus?",
    shortAnswer: "Hacking shifted from individual ego and vandalism to structured, organized international cybercrime syndicates seeking direct financial extortion and stolen card trafficking.",
    explanation: "In the 2000s, underground marketplaces (e.g., ShadowCrew, CarderPlanet) emerged to trade stolen credit cards, bank accounts, and identity records. Concurrently, modular banking trojans like Zeus (2007) and SpyEye pioneered Man-in-the-Browser (MitB) attacks, injecting fake HTML fields into real banking web pages to intercept login credentials and OTPs in real time. Hacking became an organized, underground billion-dollar shadow economy.",
    hint: "Analyze how hacking transformed from teenage pranksters into organized criminal cartels harvesting bank credentials.",
    level: "moderate",
    codeExample: `// Zeus Banking Trojan Man-in-the-Browser (MitB) WebInject:
// Injected into browser DOM when visiting banking domain:
if (window.location.hostname.includes("bank-login.com")) {
    displayFakeFormField("Please enter your 16-digit ATM PIN and Mother's Maiden Name to verify account.");
    interceptAndExfiltrateCredentials();
}`
  },
  {
    question: "What marked the 2010s as the era of 'Nation-State Cyber Warfare', and what was the milestone impact of Stuxnet (2010)?",
    shortAnswer: "Stuxnet demonstrated that cyber weapons can cross digital-physical boundaries to physically destroy critical industrial infrastructure without dropping conventional bombs.",
    explanation: "Discovered in 2010, Stuxnet was the world's first publicly identified military-grade cyber weapon, jointly developed by US and Israeli intelligence (Operation Olympic Games) to sabotage Iran's Natanz uranium enrichment facility. It proved that malware could alter physical PLC control logic to destroy centrifuges, officially inaugurating the era of nation-state Advanced Persistent Threats (APTs) targeting energy grids, water treatment plants, and defense contractors.",
    hint: "Recall the malware that crossed the digital-to-physical divide to destroy centrifuges at Natanz.",
    level: "basic",
    codeExample: `// Historical Paradigm Shift:
Pre-2010:  Cyber attacks steal data or crash servers (Digital Impact only).
Post-2010: Cyber attacks manipulate SCADA controllers to destroy physical turbines and blackout grids (Kinetic Cyber Warfare).`
  },
  {
    question: "What was 'Operation Aurora' (2009), and how did it change enterprise security strategies regarding Advanced Persistent Threats (APTs)?",
    shortAnswer: "A highly sophisticated state-sponsored cyber attack targeting Google and 30+ major Silicon Valley corporations, prompting Google to invent Zero Trust Architecture (BeyondCorp).",
    explanation: "In late 2009, a Chinese nation-state threat actor (Elderwood Group) compromised Google, Adobe, Juniper Networks, and other major tech firms via spear-phishing and an Internet Explorer zero-day (CVE-2010-0249). The attackers sought source code repositories and surveillance on Chinese human rights activists. In response, Google completely abandoned perimeter-based VPN security and pioneered 'BeyondCorp', the world's first comprehensive Zero Trust Architecture.",
    hint: "Think about the landmark 2009 attack on Google that prompted the invention of Zero Trust (BeyondCorp).",
    level: "expert",
    codeExample: `// BeyondCorp Zero Trust Mandate (Post-Aurora):
// Old Castle-and-Moat: "User is inside corporate office LAN → Implicitly Trusted"
// BeyondCorp Zero Trust: "Location does not matter → Every device, user, and packet must be authenticated via mTLS & FIDO2"`
  },
  {
    question: "How did the 'Ransomware-as-a-Service' (RaaS) business model in the late 2010s accelerate the frequency of global extortion attacks?",
    shortAnswer: "By separating core malware developers from non-technical 'affiliates' who execute intrusions, operating on an 80/20 profit-sharing syndicate model.",
    explanation: "Under the RaaS business model (e.g., LockBit, REvil, DarkSide), elite malware developers write the cryptographic encrypters, maintain Tor payment portals, and automate decryption key distribution. They license this platform to 'affiliates' who specialize in initial network access (via phishing, purchased credentials, or unpatched VPNs). When a victim pays a ₹10 Crore ransom, the affiliate receives 70-80% of the funds, and the core developers take a 20-30% cut, democratizing advanced cyber extortion.",
    hint: "Think of an affiliate franchise model where malware creators license tools to independent hackers for a revenue cut.",
    level: "moderate",
    codeExample: `// RaaS Revenue Split Model:
Total_Ransom_Paid_INR = ₹10,00,00,000 (₹10 Crores in Bitcoin);
Affiliate_Share       = ₹8,00,00,000 (80% for breaching the network);
Core_RaaS_Developers  = ₹2,00,00,000 (20% for providing malware and Tor infrastructure);`
  },
  {
    question: "What is 'Double Extortion' in modern ransomware campaigns, and why did standard data backup strategies become insufficient to counter it?",
    shortAnswer: "Attackers exfiltrate sensitive confidential data before encrypting local systems, threatening to publicly leak proprietary records if the ransom is not paid.",
    explanation: "Historically, organizations could refuse to pay ransomware ransoms if they had reliable offline backups. In 2019, the Maze ransomware group pioneered 'Double Extortion': prior to deploying encryption, they secretly stole hundreds of gigabytes of customer PII, executive emails, and trade secrets. Even if the victim restores their systems from backups in 2 hours, attackers threaten to publish the stolen data on public dark web leak sites, exposing the victim to statutory DPDP Act / GDPR fines and reputational destruction.",
    hint: "Recall that double extortion combines data encryption with the threat of public data leakage.",
    level: "moderate",
    codeExample: `// Double Extortion Workflow:
Stage 1: Exfiltrate 500 GB Customer Database → Transferred to Mega.nz / Tor server
Stage 2: Deploy LockBit Ransomware → Encrypt local virtual machines
Stage 3: Extortion Demand → "Pay ₹5 Crores for decryptor OR we leak all customer Aadhaar cards online"`
  },
  {
    question: "How did the 1983 Hollywood movie 'WarGames' influence both public perception and United States federal cyber legislation?",
    shortAnswer: "It depicted a teenager accidentally hacking a military nuclear supercomputer (WOPR), inspiring President Ronald Reagan to direct the creation of the Computer Fraud and Abuse Act (CFAA) of 1986.",
    explanation: "In 'WarGames', high school student David Lightman (Matthew Broderick) uses an acoustic modem to wardial phone numbers and accidentally connects to a NORAD nuclear war simulation computer. President Ronald Reagan watched the film and questioned military advisors on whether such a civilian intrusion was realistically possible. The resulting national security directive led directly to the drafting of the Computer Fraud and Abuse Act (CFAA) in 1986, establishing the first federal criminal penalties for unauthorized computer access.",
    hint: "Remember the 1983 movie where a student plays 'Global Thermonuclear War' with a military supercomputer.",
    level: "basic",
    codeExample: `// Cultural-to-Legal Timeline:
1983: WarGames released in theaters → Depicts wardialing & backdoor password exploitation
1984: National Security Decision Directive 145 signed by President Reagan
1986: US Congress enacts Computer Fraud and Abuse Act (18 U.S.C. § 1030)`
  },
  {
    question: "What was 'Wardialing' in the 1980s and 1990s, and what is its modern wireless and internet equivalent?",
    shortAnswer: "Wardialing dialed every phone number in a telephone exchange to find answering modems; modern equivalents are Wardriving (hunting Wi-Fi) and Masscan/Shodan (scanning the IPv4 internet).",
    explanation: "In the pre-internet dial-up era, hackers wrote automated wardialer scripts (like ToneLoc) that instructed a telephone modem to sequentially dial every 4-digit extension in a local exchange (e.g., 555-0000 to 555-9999). When a remote modem carrier tone answered, the software logged the number for later exploration. Modern equivalents include 'Wardriving' (driving with GPS to map vulnerable Wi-Fi SSIDs) and tools like Masscan or Shodan that scan all 4.29 billion public IPv4 addresses in minutes.",
    hint: "Think about sequentially calling every telephone number in a town to find which ones belong to computer modems.",
    level: "moderate",
    codeExample: `// Automated Wardialer Logic (1980s):
for (int num = 0; num <= 9999; num++) {
    dial("555-" + padZero(num, 4));
    if (detectCarrierTone()) {
        logModemFound("555-" + padZero(num, 4));
    }
}`
  },
  {
    question: "Why is the 2003 'SQL Slammer' worm famous in cybersecurity history regarding its unprecedented network propagation speed?",
    shortAnswer: "It was a single 376-byte UDP packet worm that infected over 75,000 servers worldwide in under 10 minutes, generating massive global network bandwidth congestion.",
    explanation: "Unlike TCP-based worms that must wait for a 3-way handshake before delivering code, SQL Slammer exploited a buffer overflow in Microsoft SQL Server 2000 (Resolution Service on UDP port 1434). Because UDP is connectionless ('fire and forget'), infected servers broadcasted attack packets as fast as their network cards could transmit (up to 50,000 packets/second). It doubled infected hosts every 8.5 seconds, paralyzing internet routing and taking down Bank of America ATMs.",
    hint: "Think of the ultra-fast connectionless UDP packet worm that infected the globe in under 10 minutes.",
    level: "expert",
    codeExample: `// SQL Slammer 376-Byte Payload Structure:
[0x04]                          // SQL Server Resolution Service request opcode
[96 bytes of 0x58 (Nops/Junk)]  // Buffer overflow pad
[0x42B0C9DC]                    // Overwritten return address pointing to "jmp esp" in sqlsort.dll
[268 bytes of Shellcode]        // Self-contained generator that randomly creates IPs and blasts UDP packets`
  },
  {
    question: "What was the landmark legal significance of the 1995 arrest of famous hacker Kevin Mitnick by the FBI and Tsutomu Shimomura?",
    shortAnswer: "It highlighted the legal vulnerabilities of IP Spoofing and social engineering, leading to harsher federal sentencing and public awareness of computer security.",
    explanation: "Kevin Mitnick ('Condor') was one of the most pursued hackers in history. Rather than relying purely on complex code, Mitnick was a master of social engineering and telephone manipulation. In 1994, he executed an IP Spoofing and TCP sequence prediction attack against computational physicist Tsutomu Shimomura's workstation. Shimomura tracked Mitnick across cellular networks in North Carolina. Mitnick's 5-year imprisonment and high-profile trial established modern legal precedents for cyber crime prosecution.",
    hint: "Recall the famous hacker captured by Tsutomu Shimomura after using IP spoofing and social engineering.",
    level: "moderate",
    codeExample: `// Mitnick IP Spoofing Attack Pattern (1994):
1. Send SYN Flood to trusted server (X-Terminal) to render it unresponsive (mute it).
2. Predict TCP Sequence numbers on target server.
3. Send spoofed TCP SYN packets pretending to originate from the muted trusted server.
4. Establish authenticated rsh shell session without password.`
  },
  {
    question: "How did the emergence of 'Bug Bounty' platforms in the 2010s redefine the career trajectory of white-hat ethical hackers?",
    shortAnswer: "It legalized and gamified global security research, allowing independent hackers to earn substantial legal bounties and build professional reputations without corporate employment.",
    explanation: "Historically, independent researchers discovering vulnerabilities risked criminal prosecution or cease-and-desist letters from software vendors. Platforms like HackerOne, Bugcrowd, and enterprise programs (Google, Meta, Microsoft, Apple) established safe-harbor legal protections and tiered financial reward structures. Talented students and engineers across India now legitimately earn lakhs and crores of rupees discovering zero-days and reporting them ethically.",
    hint: "Consider how bug bounty platforms provide legal safe harbor and monetary rewards to security researchers.",
    level: "basic",
    codeExample: `// Modern Bug Bounty Paradigm:
Independent Researcher → Discovers Zero-Day → Submits to HackerOne → Receives Safe Harbor & ₹5,00,000 Bounty → Vendor Patches Software (Win-Win)`
  },
  {
    question: "What role did early underground hacker e-zines like 'Phrack' and '2600: The Hacker Quarterly' play in technical knowledge dissemination?",
    shortAnswer: "They served as peer-reviewed technical journals for underground research, publishing groundbreaking tutorials on buffer overflows, telecom routing, and cryptography.",
    explanation: "Founded in 1984 (2600 Magazine) and 1985 (Phrack), these publications distributed technical blueprints before cybersecurity was taught in universities. In 1996, Phrack Issue 49 published Aleph One's seminal paper 'Smashing the Stack for Fun and Profit', which provided the first comprehensive, step-by-step tutorial on stack buffer overflow exploitation and shellcode development, shaping modern offensive security education.",
    hint: "Think about the famous 1996 Phrack paper 'Smashing the Stack for Fun and Profit'.",
    level: "moderate",
    codeExample: `// Seminal Phrack 49 Reference (1996):
Paper: "Smashing The Stack For Fun And Profit" by Aleph One (Elias Levy)
Concept: Step-by-step architecture of the x86 stack frame, saved frame pointer, return address overwrite, and NOP sled shellcode execution.`
  },
  {
    question: "How has the emergence of Generative AI and Large Language Models (LLMs) altered the modern threat landscape for offensive and defensive hacking?",
    shortAnswer: "Attackers use LLMs to automate polymorphic malware generation, deepfake voice phishing, and rapid vulnerability discovery; defenders use AI for automated log analysis and threat triage.",
    explanation: "Generative AI democratizes advanced offensive tactics. Attackers utilize customized LLMs (like WormGPT, FraudGPT) to generate flawless, culturally nuanced spear-phishing emails in multiple languages, clone executive voices for real-time Vishing scams, and automate code deobfuscation. Conversely, defensive Security Operations Centers (SOCs) deploy AI agents to ingest millions of telemetry logs per second, detect abnormal user behavioral anomalies, and synthesize automated incident response playbooks.",
    hint: "Think about how AI accelerates both automated polymorphic malware authoring and automated SOC threat detection.",
    level: "expert",
    codeExample: `// Modern AI Cyber Threat Matrix:
Offensive AI: Automated Deepfake Vishing (Voice Cloning) + Dynamic Polymorphic Shellcode;
Defensive AI: Real-time User & Entity Behavior Analytics (UEBA) + Automated SIEM Alert Triage;`
  },
  {
    question: "What is the historical significance of the 'SolarWinds SUNBURST' (2020) cyber espionage campaign in the evolution of software supply chain attacks?",
    shortAnswer: "It proved that threat actors can bypass hardened corporate defenses by poisoning upstream software build pipelines, compromising thousands of downstream organizations simultaneously.",
    explanation: "Instead of attacking high-security US government agencies directly, Russian state-sponsored actors (APT29 / Cozy Bear) compromised SolarWinds' internal build environment (MSBuild). They injected a stealthy backdoor (SUNBURST) into official updates of the Orion network management platform. Because the updates were digitally signed by SolarWinds, over 18,000 customers (including Microsoft, Cisco, and the US Treasury) automatically installed the trojan, proving that supply chain integrity is the weakest link in modern computing.",
    hint: "Recall how injecting a backdoor into a trusted software update gave attackers access to 18,000 global enterprises.",
    level: "expert",
    codeExample: `// Software Supply Chain Threat Vector:
Vendor Source Code Clean → Attacker Injects Backdoor into Build Server (MSBuild) → 
Compiler Output Signed with Valid Vendor Certificate → Distributed via Official Auto-Update to 18,000 Customers`
  },
  {
    question: "Under Indian cybersecurity history, when was the Information Technology Act passed, and how did the 2008 Amendment expand hacking definitions?",
    shortAnswer: "Enacted in 2000; the 2008 Amendment introduced Sections 66A through 66F, explicitly defining identity theft (66C), cheating by personation (66D), and cyber terrorism (66F).",
    explanation: "India enacted the Information Technology Act in 2000 to facilitate e-commerce and recognize digital signatures. Following global rises in online fraud, the IT (Amendment) Act 2008 substantially overhauled digital penal laws: Section 66C penalized identity theft (stolen passwords), Section 66D penalized cheating by personation using computer resources (phishing/social engineering), and Section 66F introduced life imprisonment for cyber terrorism threatening national sovereignty.",
    hint: "Remember the 2008 Amendment to India's IT Act that introduced Section 66F for cyber terrorism.",
    level: "moderate",
    codeExample: `// IT (Amendment) Act 2008 Penal Codes:
Section 66C: Identity Theft / Password Stealing (Up to 3 yrs imprisonment + ₹1 Lakh fine)
Section 66D: Cheating by Impersonation / Phishing (Up to 3 yrs imprisonment + ₹1 Lakh fine)
Section 66F: Cyber Terrorism / Critical Infrastructure Sabotage (Punishable by LIFE IMPRISONMENT)`
  },
  {
    question: "Synthesizing the multi-decade evolution of hacking: what is the single most enduring lesson for 21st-century cyber defense architects?",
    shortAnswer: "Systems must be designed on the assumption of breach (Zero Trust), because vulnerabilities will inevitably emerge as software complexity increases.",
    explanation: "From the Morris Worm in 1988 to Stuxnet in 2010 and SolarWinds in 2020, history conclusively demonstrates that no firewall, air-gap, or perimeter defense is permanently impenetrable. Software complexity inherently breeds vulnerabilities. Modern cybersecurity architects succeed not by attempting to build unbreakable walls, but by building resilient, zero-trust architectures that minimize attack surfaces, enforce least privilege, isolate blast radiuses, and detect intrusions in minutes rather than months.",
    hint: "Conclude by recognizing that assuming breach and practicing defense-in-depth is the only enduring strategy against evolving threats.",
    level: "expert",
    codeExample: `// The Evolution of Defense Strategy:
1980s: "Nobody will attack us; the network is for academic researchers." (Naive Trust)
1990s: "Build a firewall around our office network." (Perimeter Security)
2000s: "Install antivirus on every PC and patch monthly." (Endpoint Defense)
2020s: "Assume breach; verify every identity, packet, and microservice continuously." (Zero Trust Architecture)`
  }
];

export default questions;
