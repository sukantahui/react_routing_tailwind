const questions = [
  {
    question: "What is 'Banner Grabbing', and how does it bridge the gap between simple port scanning and vulnerability assessment?",
    shortAnswer: "The process of extracting the text identification string returned by a listening network service to determine its exact software name, version, and operating system patch level.",
    explanation: "Port scanning merely reveals that TCP port 80 or 21 is open. Banner grabbing connects to that port and reads the service's initial greeting header (e.g. `220 ProFTPD 1.3.5 Server` or `Server: Apache/2.4.49 (Unix)`). This exact version string allows security testers and automated vulnerability scanners to query CVE databases (NVD) and identify known unpatched security vulnerabilities without guessing.",
    hint: "Think of asking a stranger their name and date of birth so you can look up their medical history.",
    level: "basic",
    codeExample: `// Banner Grabbing via Netcat:
nc -nv 203.0.113.50 21
// Output:
(UNKNOWN) [203.0.113.50] 21 (ftp) open
220 ProFTPD 1.3.5 Server (Vulnerable to mod_copy Remote Code Execution CVE-2015-3306!)`
  },
  {
    question: "How does the Nmap Service Version Probe Engine (`-sV`) determine software versions when a service does NOT return a standard text banner?",
    shortAnswer: "By sending customized protocol-specific probe packets (defined in `nmap-service-probes`) and comparing the returned binary/text response against thousands of regex signatures.",
    explanation: "Many services stay silent upon connection or hide their default banners. When Nmap runs with `-sV`, it consults the `nmap-service-probes` database, transmitting customized protocol payloads (HTTP GET, SSL handshakes, SMB negotiation, RPC calls). It matches the raw response bytes against thousands of compiled regular expressions, determining the exact software version and OS even on non-standard ports.",
    hint: "Recall that Nmap sends smart protocol payloads and uses regular expression matching when a service doesn't talk first.",
    level: "moderate",
    codeExample: `// Nmap Version Detection Command:
nmap -sV --version-intensity 9 -p 8080 203.0.113.50
// Output:
8080/tcp open  http  Apache Tomcat 9.0.43 (JVM 11.0.10)`
  },
  {
    question: "What is the 'Nmap Scripting Engine' (NSE), and how do ethical hackers use the `--script vuln` category during vulnerability scanning?",
    shortAnswer: "An extensible Lua-based automation engine within Nmap; `--script vuln` runs hundreds of safe and semi-intrusive scripts to detect known CVEs like EternalBlue, Log4j, and Heartbleed.",
    explanation: "The Nmap Scripting Engine (NSE) allows users to write and execute Lua scripts categorized into `safe`, `discovery`, `vuln`, `exploit`, and `auth`. Running `nmap --script vuln 192.168.1.50` executes automated checks for major historical vulnerabilities (e.g. `smb-vuln-ms17-010`, `ssl-heartbleed`), reporting whether the target host is vulnerable and providing CVE identifiers.",
    hint: "Think of built-in automated Lua plugins in Nmap that check if servers have specific known bugs.",
    level: "basic",
    codeExample: `// Nmap NSE Vulnerability Scan:
nmap --script vuln -p 445 192.168.1.50
// Output:
| smb-vuln-ms17-010:
|   VULNERABLE: Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|   Risk factor: HIGH
|   IDs: CVE-2017-0143`
  },
  {
    question: "What is 'Tenable Nessus', and how does its plugin-based architecture execute enterprise-wide vulnerability assessments?",
    shortAnswer: "An industry-standard vulnerability scanner that uses over 180,000 modular plugins to detect unpatched software, misconfigurations, default passwords, and compliance violations.",
    explanation: "Nessus operates as a central scanner that connects to endpoints across IP ranges. Each check is an individual 'Plugin' written in Nessus Attack Scripting Language (NASL). During a scan, Nessus conducts host discovery, port scanning, service identification, and runs relevant plugins, generating detailed risk reports prioritized by CVSS v3.1 scores with remediation advice.",
    hint: "Remember the world's most widely used enterprise vulnerability scanner powered by thousands of NASL plugins.",
    level: "basic",
    codeExample: `// Nessus Architecture Workflow:
Scan Policy -> Host Discovery -> Port Scan -> Service Identification -> Plugin Execution (CVE Matching) -> CVSS Prioritized Report`
  },
  {
    question: "What is 'OpenVAS' (Greenbone Vulnerability Management - GVM), and how does it compare to commercial scanners like Nessus and Qualys?",
    shortAnswer: "An open-source, full-featured network vulnerability scanner maintained by Greenbone, utilizing daily-updated Network Vulnerability Feeds (NVTs) without commercial licensing costs.",
    explanation: "OpenVAS (now part of Greenbone Vulnerability Management) provides a completely open-source alternative to proprietary scanners. It performs comprehensive authenticated and unauthenticated network assessments, querying thousands of Network Vulnerability Tests (NVTs) to discover software flaws, missing patches, and insecure system configurations across enterprise networks.",
    hint: "Think of the popular open-source competitor to Nessus managed by Greenbone.",
    level: "moderate",
    codeExample: `// Greenbone Vulnerability Management (GVM) CLI / Web GUI:
gvm-cli socket --xml "<get_tasks/>"
// Manages automated vulnerability scans, schedules, and PDF compliance reports.`
  },
  {
    question: "What is the difference between an 'Authenticated (Credentialed) Vulnerability Scan' and an 'Unauthenticated (Non-Credentialed) Scan'?",
    shortAnswer: "Unauthenticated scans probe systems externally over the network (seeing what an external hacker sees); Authenticated scans log into the operating system using admin credentials to inspect internal registry keys, patch levels, and installed software.",
    explanation: "In an Unauthenticated Scan, the scanner sees only open network ports and public banners, which can result in false positives or missed internal flaws. In an Authenticated Scan, the scanner logs into Windows via SMB or Linux via SSH. It queries the local package manager (`dpkg -l` or Windows Registry) to verify exact installed software versions, missing OS patches, and local configuration flaws with near-zero false positives.",
    hint: "Contrast inspecting the outside of a house through the windows versus unlocking the front door with a key to check the electrical wiring inside.",
    level: "moderate",
    codeExample: `// Authenticated vs Unauthenticated Capabilities:
Unauthenticated: Sees Port 443 -> Guesses Apache 2.4.49 from HTTP Header (Prone to false positives)
Authenticated:   Logs in via SSH -> Runs 'dpkg -s openssl' -> Confirms exact unpatched library version!`
  },
  {
    question: "What is 'Nikto', and what specific web application misconfigurations does it uncover during Phase 2 vulnerability scanning?",
    shortAnswer: "An open-source web server scanner that tests for over 6,700 dangerous files, outdated server software, default CGI scripts, and missing HTTP security headers.",
    explanation: "Nikto is a dedicated HTTP/HTTPS vulnerability scanner. It rapidly tests web servers for: 1. Outdated web server software (Apache, Nginx, IIS); 2. Over 6,700 known dangerous/vulnerable files (e.g. `test.php`, `phpinfo.php`, `wp-config.php.bak`); 3. Missing security headers (Content-Security-Policy, X-Frame-Options); 4. Insecure HTTP methods enabled (PUT, TRACE).",
    hint: "Think of the fast command-line web scanner that checks for thousands of dangerous files and outdated web server scripts.",
    level: "basic",
    codeExample: `// Nikto CLI Execution:
nikto -h https://kolkata-fintech.co.in -ssl
// Output:
+ Server: Apache/2.4.49 (Unix)
+ /phpmyadmin/: Default database management portal found!
+ The anti-clickjacking X-Frame-Options header is not present.`
  },
  {
    question: "What is 'OWASP ZAP' (Zed Attack Proxy), and how does it combine Passive Scanning with Active DAST Vulnerability Scanning?",
    shortAnswer: "A web application security scanner that inspects live HTTP traffic passively without modifying requests, and conducts active Dynamic Application Security Testing (DAST) by fuzzing parameters with malicious payloads.",
    explanation: "OWASP ZAP acts as an intercepting proxy. In Passive Mode, it monitors HTTP traffic flowing through it, flagging insecure cookies, missing headers, and leaked information without sending extra packets. In Active Mode, ZAP acts as an automated attacker, spidering web pages and injecting SQLi, XSS, and command injection payloads into every input field to detect runtime vulnerabilities.",
    hint: "Remember the flagship free OWASP tool that scans web applications both passively and actively.",
    level: "moderate",
    codeExample: `// OWASP ZAP Automation:
zap-cli quick-scan --self-contained --start-options "-config api.disablekey=true" https://kolkata-fintech.co.in`
  },
  {
    question: "What is the 'Common Vulnerability Scoring System' (CVSS v3.1), and what are the quantitative score ranges for Low, Medium, High, and Critical severities?",
    shortAnswer: "An open industry standard for assessing the severity of computer system vulnerabilities; None (0.0), Low (0.1 - 3.9), Medium (4.0 - 6.9), High (7.0 - 8.9), Critical (9.0 - 10.0).",
    explanation: "CVSS v3.1 calculates a score from 0.0 to 10.0 based on Base Metrics (Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, Confidentiality, Integrity, Availability). Scores are grouped: Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), and Critical (9.0-10.0). Vulnerabilities with CVSS 9.0+ typically allow unauthenticated remote code execution without user interaction.",
    hint: "Remember the 0.0 to 10.0 scale where 9.0 to 10.0 is Critical and 7.0 to 8.9 is High.",
    level: "basic",
    codeExample: `// CVSS v3.1 Severity Rating Matrix:
0.0          -> NONE
0.1 - 3.9    -> LOW
4.0 - 6.9    -> MEDIUM
7.0 - 8.9    -> HIGH
9.0 - 10.0   -> CRITICAL (Example: Log4j CVE-2021-44228 has CVSS 10.0!)`
  },
  {
    question: "How do server administrators execute 'Banner Suppression' on Apache and Nginx web servers to defeat automated banner grabbing?",
    shortAnswer: "By setting `ServerTokens Prod` and `ServerSignature Off` in Apache, and `server_tokens off;` in Nginx configuration files.",
    explanation: "By default, Apache and Nginx return detailed version numbers and operating system names in HTTP response headers (`Server: Apache/2.4.49 (Ubuntu)`). Setting `ServerTokens Prod` forces Apache to return only `Server: Apache`, hiding the exact minor version. In Nginx, setting `server_tokens off;` forces the server to return `Server: nginx`, preventing automated scanners from matching CVEs.",
    hint: "Think about modifying web server configuration files to hide the exact software version number from public view.",
    level: "basic",
    codeExample: `// 1. Apache Configuration (/etc/apache2/conf-enabled/security.conf):
ServerTokens Prod
ServerSignature Off

// 2. Nginx Configuration (/etc/nginx/nginx.conf):
http {
    server_tokens off;
}`
  },
  {
    question: "What is a 'False Positive' versus a 'False Negative' in vulnerability scanning, and which one poses a greater danger to enterprise defense?",
    shortAnswer: "A False Positive falsely reports a vulnerability that does not exist; a False Negative fails to detect a real, dangerous vulnerability that exists. False Negatives are far more dangerous.",
    explanation: "A False Positive wastes engineering time investigating non-existent flaws (e.g. scanner flags Apache 2.4.49 based on an old banner even though the vendor backported the security patch). A False Negative occurs when the scanner overlooks a real, unpatched remote code execution flaw. False Negatives create a false sense of security, leaving the network vulnerable to real-world compromise.",
    hint: "Think of an alarm going off for no reason (False Positive) versus a smoke alarm failing to sound during an actual fire (False Negative).",
    level: "moderate",
    codeExample: `// Vulnerability Scanner Outcome Matrix:
True Positive:   Bug Exists -> Scanner Flags Bug (Ideal)
False Positive:  No Bug     -> Scanner Flags Bug (Annoying, wastes time)
False Negative:  Bug Exists -> Scanner MISSED Bug (CRITICAL DANGER: System remains exploitable!)`
  },
  {
    question: "What is 'HTTP Header Security Scanning', and what are three essential HTTP response headers checked by automated scanners?",
    shortAnswer: "1. `Content-Security-Policy` (CSP - blocks XSS), 2. `Strict-Transport-Security` (HSTS - enforces HTTPS), 3. `X-Frame-Options` (DENY/SAMEORIGIN - blocks Clickjacking).",
    explanation: "Modern vulnerability scanners check HTTP response headers to ensure browser security protections are active: 1. `Content-Security-Policy` restricts the domains from which scripts and images can load, neutralizing Cross-Site Scripting (XSS); 2. `Strict-Transport-Security` (HSTS) forces browsers to use encrypted HTTPS; 3. `X-Frame-Options` prevents the page from being embedded in malicious iframes (Clickjacking).",
    hint: "Recall the HTTP headers that stop cross-site scripting, enforce HTTPS encryption, and prevent clickjacking.",
    level: "moderate",
    codeExample: `// Hardened HTTP Response Headers:
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Content-Security-Policy: default-src 'self'; script-src 'self'`
  },
  {
    question: "What is the 'Vulnerability Management Lifecycle', and what are its 5 sequential stages in enterprise governance?",
    shortAnswer: "1. Discover (Scan assets), 2. Prioritize (Rank by CVSS & business impact), 3. Assess (Verify true positives), 4. Remediate (Apply patches or workarounds), 5. Verify (Rescan to confirm fix).",
    explanation: "Vulnerability scanning is not a one-time event; it is a continuous cycle: 1. Discover: Continuously scanning all network, cloud, and container assets; 2. Prioritize: Scoring vulnerabilities based on CVSS severity and asset criticality; 3. Assess: Triage and eliminate false positives; 4. Remediate: Deploying vendor software patches or firewall workarounds; 5. Verify: Rescanning the endpoint to confirm the vulnerability is 100% resolved.",
    hint: "Remember the 5-stage lifecycle: Discover, Prioritize, Assess, Remediate, and Verify.",
    level: "moderate",
    codeExample: `// The 5-Stage Vulnerability Management Loop:
[ Discover Assets ] -> [ Prioritize by CVSS ] -> [ Triage & Assess ] -> [ Patch & Remediate ] -> [ Rescan to Verify ]`
  },
  {
    question: "Under the Indian CERT-In Directions 2022, what is the mandatory timeline for reporting critical cyber incidents and unpatched zero-day vulnerabilities?",
    shortAnswer: "Within 6 hours of noticing or being brought to the notice of the incident / critical vulnerability.",
    explanation: "The Indian Computer Emergency Response Team (CERT-In) issued binding regulatory directions under Section 70B(6) of the Information Technology Act 2000 requiring all corporate entities, service providers, and data centers in India to report specified cyber security incidents and critical zero-day vulnerabilities within 6 hours of discovery.",
    hint: "Remember the strict 6-hour reporting requirement mandated by India's national CERT-In agency.",
    level: "basic",
    codeExample: `// CERT-In 6-Hour Reporting Mandate:
Incident / Zero-Day Discovered at 02:00 AM IST
-> Formal Notification to incident@cert-in.org.in MUST be completed by 08:00 AM IST!`
  },
  {
    question: "What is 'Wappalyzer' and 'WhatWeb', and how do ethical hackers use them for rapid web application technology stack identification?",
    shortAnswer: "CLI and browser tools that analyze HTML source code, JavaScript variables, cookies, and HTTP headers to identify the exact CMS, web framework, analytics scripts, and server backend.",
    explanation: "WhatWeb and Wappalyzer contain thousands of signature plugins for web technologies. Running `whatweb https://kolkata-fintech.co.in` analyzes DOM elements, meta tags, and script URLs in seconds, returning: `[200 OK] Apache[2.4.49], PHP[7.4.3], WordPress[5.8], Bootstrap[5.1], Cloudflare, React[19.0.0]`, giving the tester an instant overview of the application architecture.",
    hint: "Think of the tools that inspect a web page to tell you which CMS, JavaScript libraries, and web frameworks it was built with.",
    level: "basic",
    codeExample: `// WhatWeb CLI Execution:
whatweb https://kolkata-fintech.co.in
// Output:
https://kolkata-fintech.co.in [200 OK] Apache[2.4.49], Country[INDIA][IN], HTTPServer[Ubuntu Linux][Apache/2.4.49], IP[203.0.113.50], JQuery[3.6.0], PHP[7.4.3]`
  },
  {
    question: "What is 'SSL/TLS Vulnerability Scanning' (using `testssl.sh` or `sslyze`), and what cryptographic flaws does it detect?",
    shortAnswer: "Auditing web server TLS configurations to detect insecure protocols (SSLv2, SSLv3, TLS 1.0, TLS 1.1), weak ciphers (RC4, DES), and vulnerabilities like Heartbleed, POODLE, and DROWN.",
    explanation: "Modern web standards require TLS 1.2 or TLS 1.3 with secure cipher suites (AES-GCM, ChaCha20). Tools like `testssl.sh` connect to port 443 with various TLS handshake parameters, verifying whether the server supports obsolete SSLv3 (vulnerable to POODLE), allows weak 64-bit DES ciphers (SWEET32), or leaks private memory via OpenSSL Heartbleed (CVE-2014-0160).",
    hint: "Think of testing a website's HTTPS encryption to ensure it doesn't use broken 1990s ciphers.",
    level: "moderate",
    codeExample: `// testssl.sh CLI Execution:
testssl.sh --severity HIGH https://kolkata-fintech.co.in:443
// Checks for: Heartbleed, ROBOT, POODLE, SWEET32, DROWN, Insecure Renegotiation.`
  },
  {
    question: "What is 'Qualys VMDR', and how do cloud-native vulnerability management platforms track assets across hybrid environments?",
    shortAnswer: "A cloud-based vulnerability management, detection, and response platform that uses lightweight endpoint agents, virtual scanner appliances, and passive network sensors to provide continuous 24/7 visibility.",
    explanation: "Unlike legacy scanners that run scheduled scans over the network once a month, Qualys VMDR deploys lightweight cloud agents on Linux, Windows, and macOS endpoints. The agent continuously monitors local software versions and configurations, transmitting metadata to the Qualys Cloud Platform for real-time CVE matching and automated patch deployment.",
    hint: "Think of cloud-native security agents installed on all laptops and servers that report vulnerabilities 24/7.",
    level: "expert",
    codeExample: `// Qualys Cloud Agent Workflow:
Endpoint Local Daemon -> Analyzes Installed Packages -> Streams Metadata to Qualys Cloud -> Real-Time Zero-Day Triage Dashboard`
  },
  {
    question: "What is 'Port Scanning & Vulnerability Assessment Rate-Limiting' in ethical penetration testing, and why is it legally and operationally mandatory?",
    shortAnswer: "Throttling scan packet rates (packets per second) to prevent consuming target server bandwidth, exhausting connection state tables, or causing clinical/industrial system failure.",
    explanation: "Automated vulnerability scanners can send thousands of concurrent HTTP requests and TCP packets. If fired without rate limiting against fragile production infrastructure (e.g. banking core switches, hospital infusion pumps), the scan can exhaust memory, trigger denial of service, and violate client Service Level Agreements (SLAs). Ethical testers configure strict packet-per-second limits (e.g. `--max-rate 50`).",
    hint: "Think of setting a speed limit on your scanner so it doesn't crash the server you are testing.",
    level: "basic",
    codeExample: `// Nmap Rate-Limiting Flag:
nmap -sS --max-rate 50 -p- 203.0.113.50
// Restricts probe packets to 50 packets per second, ensuring zero production network disruption.`
  },
  {
    question: "What is the role of 'CVE' (Common Vulnerabilities and Exposures) and 'NVD' (National Vulnerability Database) in vulnerability assessment?",
    shortAnswer: "CVE provides standardized, unique dictionary identifiers (e.g. CVE-2021-44228) for publicly known cybersecurity vulnerabilities; NVD enriches CVEs with CVSS scores, fix guidance, and exploit links.",
    explanation: "Maintained by MITRE Corporation, the CVE program assigns a unique ID (`CVE-[YEAR]-[NUMBER]`) to every discovered software security flaw so industry vendors use the same terminology. The U.S. National Vulnerability Database (NVD, operated by NIST) analyzes CVEs, calculating quantitative CVSS scores, mapping Common Weakness Enumeration (CWE) root causes, and linking official vendor patch advisories.",
    hint: "Remember CVE as the universal naming system for software bugs, and NVD as the official encyclopedia that rates their severity.",
    level: "basic",
    codeExample: `// CVE & NVD Anatomy:
CVE Identifier: CVE-2021-44228 (Log4j Remote Code Execution)
NVD Analysis:   CVSS v3.1 Base Score: 10.0 CRITICAL
Vector String:  CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`
  },
  {
    question: "Synthesizing the Triad of Scanning: how do Port Scanning, Banner Grabbing, and Vulnerability Scanning combine to produce a complete Phase 2 assessment?",
    shortAnswer: "Port scanning finds open doors; Banner grabbing identifies who is standing inside; Vulnerability scanning verifies if their weapon or armor has a known weakness ready for exploitation in Phase 3.",
    explanation: "The three components form an integrated pipeline: 1. Port Scanning maps listening TCP/UDP endpoints across IP ranges; 2. Banner Grabbing interacts with each port to extract exact daemon names and version strings; 3. Vulnerability Scanning correlates those versions against CVE databases, executing targeted plugins to confirm exploitable bugs. This rigorous progression delivers a surgical target list for Phase 3 Gaining Access.",
    hint: "Conclude by recognizing how the three scanning disciplines fit together sequentially into a complete assessment.",
    level: "expert",
    codeExample: `// The Scanning Triad Synthesis:
Port_Scanning(Live_Ports) -> Banner_Grabbing(Exact_Versions) -> Vulnerability_Scanning(CVE_Matching) = EXPLOITATION_BLUEPRINT;`
  }
];

export default questions;
