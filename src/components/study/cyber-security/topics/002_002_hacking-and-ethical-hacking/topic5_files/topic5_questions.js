const questions = [
  {
    question: "What is the primary defining characteristic of a 'Grey Hat Hacker' compared to White Hat and Black Hat hackers?",
    shortAnswer: "Grey Hat hackers probe systems without prior authorization (violating laws like Black Hats), but without malicious intent to steal or destroy data (aiming to disclose or fix flaws like White Hats).",
    explanation: "Grey Hat hackers occupy the ambiguous middle ground of cybersecurity. Unlike White Hats who possess signed Rules of Engagement (RoE), Grey Hats find vulnerabilities without permission. Unlike Black Hats who exploit flaws for theft or extortion, Grey Hats typically notify the vendor, seek bug bounties, or publicly expose the issue to force a patch. However, because unauthorized access occurred, their actions remain illegal under cyber law.",
    hint: "Think about unauthorized testing done with non-malicious intentions.",
    level: "basic",
    codeExample: `// The Hacker Spectrum Definition:
White Hat: Authorized  + Non-Malicious Intent = 100% LEGAL
Grey Hat:  UNAUTHORIZED + Non-Malicious Intent = ILLEGAL (Criminal Trespass)
Black Hat: UNAUTHORIZED + MALICIOUS INTENT     = ILLEGAL (Severe Criminality)`
  },
  {
    question: "Under Section 66 of the Indian Information Technology Act 2000, why does a Grey Hat hacker still face criminal liability despite having good intentions?",
    shortAnswer: "Because the law penalizes unauthorized access and digital tampering; subjective good intent does not grant legal immunity for bypassing security controls.",
    explanation: "Section 66 (read with Section 43) criminalizes anyone who without permission of the owner accesses, downloads, or introduces contaminants into a computer system dishonestly or fraudulently. In Indian cyber jurisprudence, probing a bank or university server without explicit written permission constitutes unauthorized access, regardless of whether the researcher intended to help patch the flaw.",
    hint: "Recall that cyber laws punish unauthorized entry regardless of whether you claim you were trying to help.",
    level: "moderate",
    codeExample: `// Legal Principle:
Intent == "Helpful / Altruistic" != Legal Immunity
Action == "Probed Server Without Signed RoE" → Violates IT Act 2000 Section 66`
  },
  {
    question: "What was the famous 2013 incident involving Palestinian security researcher Khalil Shreateh and Mark Zuckerberg's Facebook wall?",
    shortAnswer: "After Facebook's security team repeatedly dismissed his bug report, he demonstrated the vulnerability by posting directly onto Mark Zuckerberg's private Facebook wall.",
    explanation: "Khalil Shreateh discovered a critical vulnerability allowing any user to post links and status updates onto any other user's private Facebook wall without authorization. After submitting the flaw to Facebook's Whitehat program and receiving dismissal from triage engineers, Shreateh bypassed authorization and posted a message directly onto Mark Zuckerberg's personal wall. Facebook fixed the bug within hours but withheld the bug bounty payout because his demonstration violated the terms of service by testing against an unauthorized live account.",
    hint: "Think of the researcher who proved a bug by posting directly to Mark Zuckerberg's profile page.",
    level: "moderate",
    codeExample: `// Grey Hat Demonstration Vector:
Triage Response: "I am sorry, this is not a bug."
Grey Hat Escalation: Executes unauthorized exploit directly on CEO's live profile.
Corporate Reaction: Immediate hotfix deployed, but bounty forfeited due to unauthorized live testing.`
  },
  {
    question: "What was 'Linux.Wifatch' (2014-2015), and why is it considered an iconic example of 'Grey Hat Altruistic Malware'?",
    shortAnswer: "An open-source worm that autonomously infected vulnerable IoT routers to change default passwords and disable unencrypted Telnet, protecting them against malicious botnets.",
    explanation: "Linux.Wifatch was an unusual peer-to-peer worm that scanned the internet for IoT devices and home routers running default credentials or unpatched firmware. Upon infecting a device, rather than installing DDoS tools or cryptominers, Wifatch terminated known malicious malware processes, closed dangerous Telnet ports, and left a message urging the owner to change their passwords. Despite its benign goal, spreading an unauthorized self-propagating worm is illegal under international cyber law.",
    hint: "Think of the 'vigilante worm' that infected routers to fix their passwords and block bad malware.",
    level: "expert",
    codeExample: `// Linux.Wifatch Altruistic Payload Action:
1. Infect router via default Telnet credentials (admin:admin).
2. Kill active Mirai / DDoS botnet processes in memory.
3. Disable Telnet daemon and display console warning:
   "Please change your telnet password and update firmware to secure this device."`
  },
  {
    question: "What is the critical boundary between an ethical 'Responsible Bug Report' and illegal 'Vulnerability Extortion' by a Grey Hat?",
    shortAnswer: "Responsible reporting gives the vendor time to patch; Extortion demands financial payment under the threat of public disclosure or selling the flaw to third parties.",
    explanation: "If a researcher discovers a vulnerability without authorization and politely informs the vendor with remediation steps (even requesting consideration for an optional bounty), it is borderline grey-hat. However, if the researcher demands: 'Pay me ₹5 Lakhs by Friday, or I will publish this zero-day on Twitter and leak customer data', this immediately crosses the threshold into criminal extortion (Section 384 IPC and Section 66 of IT Act).",
    hint: "Think about whether the researcher is giving time to fix or demanding money under threats of leaking data.",
    level: "basic",
    codeExample: `// Grey Hat vs Criminal Extortion:
Ethical Inquiry: "I discovered a security flaw in your checkout API. Here are the reproduction details. Does your organization offer a bug bounty program?"
Criminal Extortion: "I have your customer database. If you do not wire ₹10 Lakhs in 48 hours, I will publish all 50,000 records on Twitter."`
  },
  {
    question: "What was the landmark legal controversy surrounding Andrew Auernheimer ('weev') and the 2010 AT&T iPad data breach?",
    shortAnswer: "He scraped 114,000 iPad owner email addresses from an unauthenticated public AT&T web script and shared them with Gawker Media, sparking fierce debates on CFAA overreach.",
    explanation: "AT&T published a web service where appending an iPad's ICC-ID number to an unauthenticated URL returned the associated email address. Weev and his team wrote a simple Python script (`Goatse Security`) to enumerate sequential ICC-IDs, harvesting 114,000 emails (including politicians and CEOs) and publishing them through Gawker. He was convicted under the CFAA and sentenced to 41 months in prison, though his conviction was later vacated on jurisdictional grounds.",
    hint: "Recall the 2010 case where guessing numbers in a public URL returned iPad owner email addresses.",
    level: "moderate",
    codeExample: `// Weev AT&T Enumeration Script Concept:
for iccid in range(89014103211118510720, 89014103211118600000):
    response = http_get(f"https://att.com/ipad_lookup?icc_id={iccid}")
    if response.contains("email_address"):
        log_email(response.email)`
  },
  {
    question: "What is 'Full Disclosure' versus 'Responsible Disclosure' (Coordinated Vulnerability Disclosure - CVD)?",
    shortAnswer: "Full Disclosure publishes vulnerability details and PoC code immediately to the public; CVD privately shares findings with the vendor, granting a grace period (e.g., 90 days) to patch before public release.",
    explanation: "Full Disclosure advocates argue that immediately publishing 0-day exploits forces software vendors to release patches urgently without downplaying risk. However, it exposes innocent users to immediate attacks before a fix exists. Coordinated Vulnerability Disclosure (CVD)—the industry standard practiced by Google Project Zero and CERT-In—gives the vendor 90 days to develop and test a security update before releasing technical details.",
    hint: "Compare immediately dropping an exploit on Twitter versus giving the developer 90 days to fix it first.",
    level: "basic",
    codeExample: `// Vulnerability Disclosure Models:
Full Disclosure:         Day 0: Publish Exploit on GitHub → Users vulnerable until vendor reacts.
Coordinated Disclosure:  Day 0: Private Report → Day 1-90: Vendor patches → Day 90: Public Advisory.`
  },
  {
    question: "How did the rise of structured 'Vulnerability Disclosure Programs' (VDP) help bridge the gap between Grey Hat hackers and enterprise defense?",
    shortAnswer: "VDPs provide a clear, legally sanctioned reporting channel with 'Safe Harbor' commitments, allowing researchers to report discovered flaws safely without fear of prosecution.",
    explanation: "Historically, Grey Hats who reported bugs risked getting sued or arrested. Modern organizations publish a `security.txt` file and a formal Vulnerability Disclosure Policy (VDP) stating: 'If you discover a vulnerability and report it following our rules (no DoS, no data theft, 90-day CVD), we promise not to initiate legal action.' This channels grey-hat activity into collaborative white-hat reporting.",
    hint: "Think about companies publishing a formal policy promising not to call the police if you report bugs responsibly.",
    level: "moderate",
    codeExample: `// Standard RFC 9116 security.txt Implementation:
Contact: mailto:security@company.com
Encryption: https://company.com/pgp-key.asc
Policy: https://company.com/responsible-disclosure-policy
Hiring: https://company.com/careers/security`
  },
  {
    question: "What was the 'BrickerBot' (2017) malware campaign, and why did its author claim to be a Grey Hat vigilante?",
    shortAnswer: "BrickerBot scanned for default-credential IoT devices and intentionally corrupted their flash memory (bricking them) to prevent them from being weaponized by Mirai DDoS botnets.",
    explanation: "Created by a pseudonymous hacker known as 'Janit0r', BrickerBot performed 'Permanent Denial of Service' (PDoS). It used Telnet dictionary attacks on IoT cameras and routers, but instead of enslaving them into a botnet, it overwrote flash storage partitions with zeros (`/dev/mtd`) and wiped network configurations, permanently destroying the hardware. The author claimed this 'vigilante action' forced manufacturers and consumers to stop using insecure IoT hardware.",
    hint: "Recall the malware that permanently destroyed (bricked) insecure IoT devices to prevent DDoS attacks.",
    level: "expert",
    codeExample: `// Conceptual Model of Permanent Denial of Service (PDoS):
// Threat Actor corrupts device flash partitions to render hardware inoperable.
// Defense: Hardware root-of-trust & cryptographically signed firmware verification.`
  },
  {
    question: "Who was Adrian Lamo ('The Homeless Hacker'), and how did his unauthorized intrusions exemplify Grey Hat methodology in the early 2000s?",
    shortAnswer: "He breached major corporate networks (The New York Times, Microsoft, Yahoo) from public libraries, added his name to internal databases, and then notified the companies to help them fix the flaws.",
    explanation: "Adrian Lamo traveled across the US with a laptop, connecting from cybercafes and public libraries. He bypassed perimeter firewalls into corporate intranets, such as adding his name to The New York Times' internal confidential expert database. After verifying access, he contacted the companies' security managers to walk them through the remediation, often doing so without charging fees. He was eventually prosecuted by the US Department of Justice under the CFAA.",
    hint: "Think of the famous early 2000s hacker who broke into The New York Times from public libraries to help them fix security flaws.",
    level: "moderate",
    codeExample: `// Adrian Lamo's Grey Hat Pattern:
1. Discover misconfigured corporate proxy / internal router.
2. Access internal intranet database → Add name to authorized directory as Proof of Concept.
3. Call corporate CISO / press → Explain vulnerability & offer free remediation guidance.
4. Result: Prosecuted under CFAA despite claiming altruistic motives.`
  },
  {
    question: "What is 'Security Research vs Trespass': where does the legal line fall when testing an unauthenticated public API?",
    shortAnswer: "Sending standard HTTP requests to public endpoints is generally lawful; modifying payloads to bypass authentication, brute-force IDs, or extract bulk private data crosses into illegal trespass.",
    explanation: "Viewing public website HTML or requesting publicly accessible URLs is lawful. However, the moment a researcher alters parameter variables (e.g., changing `user_id=100` to `user_id=101` to view someone else's private invoice - IDOR), executes brute-force scripts, or bypasses authorization gates, they have exceeded authorized access and committed computer trespass under cyber legislation.",
    hint: "Consider how looking at a public storefront is legal, but picking the lock or peeking into private customer files is illegal.",
    level: "expert",
    codeExample: `// Legal vs Illegal API Interaction:
GET /api/public-pricing                 → LAWFUL (Publicly advertised endpoint)
GET /api/invoices?id=10294 (Other User)  → UNLAWFUL (Unauthorized Data Access under IT Act Sec 43/66)`
  },
  {
    question: "Why do professional bug bounty platforms (HackerOne, Bugcrowd) immediately disqualify and ban researchers who publicly leak vulnerabilities on Twitter/X before resolution?",
    shortAnswer: "Because premature public disclosure violates program non-disclosure agreements, endangers end users, and breaks the trust required for safe harbor legal protections.",
    explanation: "Bug bounty platforms operate on the foundational trust that researchers will keep findings confidential until vendor engineers develop, test, and deploy a secure patch. Leaking zero-day reproduction steps on social media exposes millions of users to malicious black-hat exploitation, nullifies the researcher's legal safe harbor, and leads to permanent platform expulsion.",
    hint: "Think about why bug bounty platforms cannot tolerate researchers who publicly post vulnerabilities before they are patched.",
    level: "basic",
    codeExample: `// Bug Bounty Safe Harbor Agreement:
"Researchers agree NOT to disclose any details of the reported vulnerability publicly 
until the vendor has resolved the issue and authorized public disclosure."`
  },
  {
    question: "What is 'Reverse Engineering Abandonware' or proprietary IoT firmware without permission, and what copyright/cyber law exemptions exist for security research?",
    shortAnswer: "Disassembling software to discover vulnerabilities; often restricted by End User License Agreements (EULAs), but protected in certain jurisdictions under security research exemptions.",
    explanation: "Many corporate software licenses contain clauses forbidding reverse engineering. However, legal frameworks like the US Digital Millennium Copyright Act (DMCA Section 1201 exemptions) and European software directives permit good-faith reverse engineering exclusively for interoperability, security research, and vulnerability identification, provided the researcher does not facilitate software piracy.",
    hint: "Think about legal exemptions that allow researchers to take apart software specifically to find security bugs.",
    level: "expert",
    codeExample: `// DMCA Good-Faith Security Research Exemption:
"Accessing computer programs solely for the purpose of good-faith testing, investigation, 
or correction of a security flaw or vulnerability is non-infringing."`
  },
  {
    question: "What ethical dilemma occurs when a Grey Hat discovers a critical zero-day vulnerability in a medical pacemaker or automotive braking system?",
    shortAnswer: "Public disclosure could directly endanger human lives, while vendor inaction leaves millions at risk; requires coordinated disclosure with government regulators (CERT-In / FDA).",
    explanation: "In cyber-physical systems (pacemakers, cars, industrial power grids), releasing a public zero-day exploit could allow malicious attackers to cause fatal vehicle crashes or cardiac failures. If a medical manufacturer ignores a private bug report, the ethical researcher must not dump the exploit on social media, but escalate the finding to national nodal authorities (CERT-In, NCIIPC, FDA) who possess legal power to mandate emergency manufacturer recalls.",
    hint: "Consider the life-or-death stakes of software bugs in medical implants or vehicle brakes.",
    level: "moderate",
    codeExample: `// Escalation Hierarchy for Life-Critical Vulnerabilities:
Level 1: Private Vendor Security Team (30 Days)
Level 2 (If Vendor Unresponsive): National Cyber Emergency Agency (CERT-In / NCIIPC)
Level 3: Regulatory Health / Transport Oversight Body (Mandatory Safety Recall)`
  },
  {
    question: "How does the concept of 'Vulnerability Brokering' (e.g., Zerodium, Crowdfense) complicate the Grey Hat marketplace?",
    shortAnswer: "Private brokerages purchase zero-day exploits from independent researchers for millions of rupees, selling them exclusively to government intelligence agencies rather than patching vendors.",
    explanation: "A Grey Hat researcher who discovers an iOS or Windows zero-day faces a financial dilemma: submitting it to Apple's bug bounty yields ₹8,00,000, while selling it to a private exploit broker like Zerodium can fetch ₹15,00,00,000+ ($2 Million). Because brokers sell exploits to intelligence agencies for surveillance rather than reporting them to vendors for patching, the vulnerability remains active on millions of consumer devices.",
    hint: "Think about private companies that pay millions of dollars to buy zero-day bugs so intelligence agencies can use them.",
    level: "expert",
    codeExample: `// Exploit Compensation Comparison:
Vendor Bug Bounty (Apple / Microsoft): ₹8 Lakhs - ₹20 Lakhs (Flaw gets Patched)
Private Zero-Day Broker (Zerodium):     ₹15 Crores ($2,000,000) (Flaw kept Secret for Espionage)`
  },
  {
    question: "What is 'Unsolicited Penetration Testing', and why do corporate legal teams treat it as an active cyber attack?",
    shortAnswer: "Testing an organization's systems without prior request or contract; legal teams cannot distinguish between a helpful grey-hat and a malicious black-hat scouting for a breach.",
    explanation: "When an organization's Security Operations Center (SOC) detects SQL injection probes or automated directory fuzzing from an unknown IP address, they have zero way of knowing if the tester is an altruistic student or a ransomware syndicate preparing an intrusion. The incident response team must treat all unauthorized testing as a hostile breach attempt, triggering IP blacklisting, police reports, and expensive forensic escalations.",
    hint: "Remember that from a security guard's perspective, anyone picking the door lock in the middle of the night is treated as a burglar.",
    level: "basic",
    codeExample: `// SOC Alert Perspective:
Event: High-volume directory fuzzing against /admin/ endpoints
Origin: Unknown residential IP address in Kolkata
SOC Classification: SEVERITY 1 HOSTILE PROBE → Block IP + Alert Legal + Notify CERT-In`
  },
  {
    question: "How can a passionate cybersecurity student in India transition safely from Grey Hat curiosity to a certified White Hat career?",
    shortAnswer: "By testing exclusively within legal Bug Bounty programs (with Safe Harbor), practicing on legal CTF platforms (HackTheBox, TryHackMe), and pursuing recognized certifications (OSCP).",
    explanation: "Aspiring ethical hackers never need to scan live unauthorized targets. Platforms like Hack The Box, TryHackMe, PortSwigger Web Security Academy, and VulnHub offer thousands of legal, realistic virtual penetration testing targets. When ready for real-world assets, students should test only organizations with explicit Vulnerability Disclosure Policies (VDP) on HackerOne and Bugcrowd.",
    hint: "Think about safe, legal practice environments like Hack The Box and public bug bounty programs.",
    level: "basic",
    codeExample: `// Legal Practice Ecosystem:
1. Controlled Labs: TryHackMe, Hack The Box, PortSwigger Web Security Academy
2. Local Virtualization: Docker vulnerable containers (DVWA, Juice Shop, Metasploitable)
3. Legal Real-World Targets: HackerOne & Bugcrowd public programs with Safe Harbor`
  },
  {
    question: "What role does the 'security.txt' standard (RFC 9116) play in helping Grey Hats report vulnerabilities lawfully?",
    shortAnswer: "It establishes a standardized machine-readable file located at `/.well-known/security.txt` on websites defining official security contact emails, PGP keys, and disclosure policies.",
    explanation: "Historically, one of the biggest excuses for grey-hat public drops was: 'I couldn't find anyone to report this to.' RFC 9116 solves this by creating a standard internet protocol where organizations host a plain text file at `https://example.com/.well-known/security.txt`. It gives security researchers direct email contacts, public PGP keys for encryption, and links to the company's official safe harbor policy.",
    hint: "Remember the standard web file placed at `/.well-known/security.txt` to help researchers find security contacts.",
    level: "moderate",
    codeExample: `// Fetching security.txt via curl:
curl https://example.com/.well-known/security.txt
// Output:
# Contact: security@example.com
# Encryption: https://example.com/pgp.key
# Policy: https://example.com/disclosure`
  },
  {
    question: "What is 'Vulnerability Hoarding', and why is it considered an ethically grey practice among nation-states and independent researchers?",
    shortAnswer: "Discovering critical vulnerabilities and keeping them secret for future offensive exploitation rather than reporting them to vendors to protect the public.",
    explanation: "When government intelligence agencies or independent researchers discover zero-day bugs and stockpile them in secret vaults (e.g., the NSA stockpiling EternalBlue before it was leaked by Shadow Brokers), they leave global civilian infrastructure exposed. If a foreign adversary or criminal syndicate independently discovers the same flaw, they can exploit it against hospitals and power grids because no patch exists.",
    hint: "Think of keeping a secret master key to every house in the city instead of warning the lock manufacturer.",
    level: "expert",
    codeExample: `// Vulnerability Hoarding Risk:
1. Intelligence Agency discovers CVE-2017-0144 (EternalBlue) → Keeps secret for 5 years.
2. Shadow Brokers leaks the exploit online in 2017.
3. WannaCry ransomware weaponizes it within weeks → Paralyzes 200,000 systems worldwide.`
  },
  {
    question: "Synthesizing the role of Grey Hat hacking: why is structured legal channelization superior to criminalization alone?",
    shortAnswer: "Because curiosity and talent will always exist; providing legal bug bounties, safe harbor, and responsible disclosure channels converts potential adversaries into national cyber defenders.",
    explanation: "Threatening all unauthorized curiosity with immediate life imprisonment simply drives brilliant young minds underground into black-hat cybercrime cartels. Nations and enterprises that build mature Vulnerability Disclosure Programs, offer attractive bug bounties in ₹ INR, and enforce clear safe-harbor protections successfully harness the energy of grey hats—transforming raw curiosity into the vanguard of national cybersecurity resilience.",
    hint: "Conclude by recognizing that providing legal, rewarding channels converts rogue researchers into valued defensive protectors.",
    level: "expert",
    codeExample: `// The Channelization Equation:
Rogue Curiosity + Legal Safe Harbor + Fair Bounty Rewards (₹) = Elite National Cyber Defenders`
  }
];

export default questions;
