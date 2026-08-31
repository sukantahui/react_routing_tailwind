const questions = [
  {
    question: "What is 'Reconnaissance' (Footprinting) in the ethical hacking methodology, and why is it considered the most crucial phase?",
    shortAnswer: "The systematic gathering of information about a target's organizational, network, and technological infrastructure prior to launching an attack; thorough reconnaissance reveals attack paths that make subsequent phases easy.",
    explanation: "Reconnaissance is the foundational phase where an attacker or penetration tester maps the target's digital footprint. It uncovers IP subnets, domain names, employee email addresses, exposed web applications, and cloud services. Spending 70% to 80% of assessment time on reconnaissance eliminates guesswork and allows testers to launch surgical, highly successful exploits in Phase 3.",
    hint: "Think about gathering the complete architectural blueprint and employee list before touching a single server.",
    level: "basic",
    codeExample: `// Reconnaissance Objective:
Target Input:   "Kolkata FinTech Ltd"
Recon Output:   CIDR Subnets (203.0.113.0/24), 85 Subdomains, 450 Employee Emails, Cloud Buckets, Tech Stack (React + Node.js + AWS)`
  },
  {
    question: "What is the fundamental difference between 'Passive Footprinting' and 'Active Footprinting' regarding network traffic generation?",
    shortAnswer: "Passive footprinting gathers data from third-party public repositories without sending a single packet to the target; Active footprinting directly sends probe packets to the target's network, risking detection.",
    explanation: "In Passive Footprinting, the ethical hacker queries external sources like WHOIS databases, Certificate Transparency logs (crt.sh), Shodan, Google caches, and LinkedIn. Because no packets touch the target's firewall, the target has zero forensic record of the recon. In Active Footprinting, the tester interacts directly with the target infrastructure (DNS zone transfers, ping sweeps, banner grabbing), which is logged by firewalls and Intrusion Detection Systems (IDS).",
    hint: "Contrast reading public records in a library versus knocking directly on someone's front door.",
    level: "basic",
    codeExample: `// Passive vs Active Traffic Comparison:
Passive:  https://crt.sh/?q=kolkata-bank.in  (Packets sent to crt.sh servers, ZERO packets to target!)
Active:   nc -nv 203.0.113.50 80              (Direct TCP SYN packet sent to target server, logged in firewall)`
  },
  {
    question: "What are 'Certificate Transparency Logs' (e.g. crt.sh), and how do ethical hackers use them for passive subdomain enumeration?",
    shortAnswer: "Public, append-only cryptographic ledgers recording every SSL/TLS certificate issued by Certificate Authorities; querying them reveals newly created and hidden staging subdomains.",
    explanation: "Whenever an organization requests an SSL/TLS certificate for a domain (like `dev-staging-payment.bank.com`), the Certificate Authority (Let's Encrypt, DigiCert) must publicly publish the certificate in Certificate Transparency (CT) logs to prevent rogue certificates. Ethical hackers query tools like `crt.sh` to extract a complete historical list of all subdomains ever registered by the organization without touching the company's servers.",
    hint: "Recall the public database recording every SSL certificate issued to websites worldwide.",
    level: "moderate",
    codeExample: `// Passive Subdomain Enumeration via crt.sh:
curl -s "https://crt.sh/?q=%.kolkata-fintech.co.in&output=json" | jq -r '.[].name_value' | sort -u
// Output:
api.kolkata-fintech.co.in
dev-staging-vpn.kolkata-fintech.co.in
internal-admin.kolkata-fintech.co.in`
  },
  {
    question: "What is 'Google Dorking' (Advanced Google Search Operators), and how do ethical hackers use it to find accidentally exposed sensitive files?",
    shortAnswer: "Using specialized search operators (e.g., `site:`, `filetype:`, `inurl:`, `intitle:`) to query Google's index for exposed database backups, credentials, and unprotected admin portals.",
    explanation: "Search engine web crawlers index everything reachable unless blocked by `robots.txt`. Ethical hackers construct advanced Google Dorks: `site:target.com filetype:env` to find exposed environment files containing API keys, `site:target.com intitle:\"index of\" \"backup.sql\"` to find database dumps, or `site:target.com inurl:admin login` to locate administrative gateways.",
    hint: "Think about using Google's search tricks to find secret passwords and backup files indexed on the web.",
    level: "basic",
    codeExample: `// Iconic Google Dork Syntax Examples:
site:kolkata-fintech.co.in filetype:pdf "CONFIDENTIAL"
site:kolkata-fintech.co.in inurl:wp-config.php.bak
site:kolkata-fintech.co.in intitle:"Index of" ".git"`
  },
  {
    question: "What is a 'DNS Zone Transfer' (AXFR), and why is an unrestricted zone transfer considered a critical active reconnaissance finding?",
    shortAnswer: "A mechanism designed for replicating DNS records between primary and secondary DNS servers; if misconfigured, an attacker queries AXFR to download the entire internal and external DNS database in seconds.",
    explanation: "DNS servers use the AXFR transaction protocol over TCP port 53 to synchronize master and slave records. If administrators fail to restrict AXFR requests to trusted IP addresses, anyone can run `dig @ns1.target.com target.com AXFR`. The server responds by dumping every DNS record (internal IPs, mail servers, development hostnames, VPN endpoints), instantly giving the attacker a complete map of the target's internal network.",
    hint: "Think of a master phonebook copying mechanism that accidentally hands the entire internal employee directory to anyone who asks.",
    level: "moderate",
    codeExample: `// DNS Zone Transfer Query (AXFR):
dig @ns1.kolkata-fintech.co.in kolkata-fintech.co.in AXFR
// Vulnerable Response Dumps Everything:
kolkata-fintech.co.in.      IN  SOA   ns1.kolkata-fintech.co.in.
vpn.kolkata-fintech.co.in.  IN  A     192.168.10.5
dc01.kolkata-fintech.co.in. IN  A     10.0.0.1 (Internal Domain Controller Exposed!)`
  },
  {
    question: "What is 'Shodan', and how does it differ from traditional search engines like Google during passive reconnaissance?",
    shortAnswer: "Google indexes web page text and HTML content; Shodan indexes internet-connected hardware devices, IP addresses, open ports, and service banners (routers, SCADA PLCs, webcams, servers).",
    explanation: "While Google crawls web pages, Shodan continuously scans the entire IPv4 address space, connecting to open ports (21 FTP, 22 SSH, 80 HTTP, 502 Modbus, 3389 RDP) and recording the raw service banners. Ethical hackers use Shodan to search for exposed database servers, unpatched Apache servers, and unprotected industrial SCADA PLCs without sending a single packet to the target.",
    hint: "Remember Shodan as the search engine for internet-connected computers, webcams, and industrial devices.",
    level: "basic",
    codeExample: `// Shodan Query Syntax:
net:203.0.113.0/24 "Apache/2.4.49"
port:502 "Schneider Electric" (Discovers exposed industrial SCADA PLCs)
hostname:kolkata-fintech.co.in "Microsoft-IIS/7.5"`
  },
  {
    question: "What is 'WHOIS Reconnaissance', and what operational intelligence can be extracted from Regional Internet Registries (RIRs)?",
    shortAnswer: "Querying public RIR databases (ARIN, RIPE, APNIC) to obtain the target's allocated Autonomous System Number (ASN), IP CIDR blocks, technical contact emails, and physical office addresses.",
    explanation: "All organizations assigned public IP addresses or domain names must register with Regional Internet Registries (like APNIC in the Asia-Pacific region). Running a WHOIS query on an organization reveals their Autonomous System Number (e.g. `AS13335`), their exact allocated IP subnets (e.g. `203.0.113.0/24`), netblock names, DNS nameserver hostnames, and technical administrative contact details.",
    hint: "Think of looking up the official property deed and ownership registration for an internet domain or IP block.",
    level: "basic",
    codeExample: `// WHOIS Query Command:
whois 203.0.113.50
// Output:
netname:        KOLKATA-FINTECH-NET
inetnum:        203.0.113.0 - 203.0.113.255
descr:          Kolkata FinTech Primary Data Center
tech-c:         Mamata (Email: admin@kolkata-fintech.co.in)`
  },
  {
    question: "How do Ethical Hackers use 'Job Postings' (LinkedIn / Naukri.com) as a valuable passive reconnaissance technique?",
    shortAnswer: "Job advertisements for engineers frequently detail exact internal software versions, cloud architectures, database platforms, and defensive tooling in their required skills section.",
    explanation: "Organizations often inadvertently leak their entire internal technological blueprint in job postings. A job listing for 'Senior Security Engineer' might state: 'Must have 5 years experience with Splunk 8.2, CrowdStrike Falcon, Palo Alto PAN-OS 10.1, and AWS EKS Kubernetes clusters.' An ethical hacker reads this and immediately knows the exact defensive stack, operating systems, and SIEM tooling deployed inside the enterprise.",
    hint: "Think about reading a company's hiring ads to see what software and database tools their engineers use daily.",
    level: "moderate",
    codeExample: `// Information Leakage in Job Advertisements:
Job Title: "Lead Database Administrator @ FinTech Org"
Skills Required:
- "Experience managing Oracle 19c RAC on Red Hat Enterprise Linux 8.4"
- "Familiarity with Fortinet FortiGate 600E Firewalls and Cisco AnyConnect VPN"
// Threat Intel Gained: Attacker now knows exact OS, DB version, and VPN gateway vendor!`
  },
  {
    question: "What is 'Email Harvesting' (e.g. theHarvester / Hunter.io), and how does it facilitate subsequent Social Engineering attacks?",
    shortAnswer: "Automated extraction of employee email addresses and corporate naming formats from search engines and LinkedIn to construct targeted spear-phishing campaigns.",
    explanation: "Tools like `theHarvester` scrape search engines (Google, Bing, DuckDuckGo) and PGP key servers to find corporate email addresses. This reveals the organization's email naming convention (e.g. `first.last@company.com` vs `flast@company.com`). In Phase 3, this allows attackers to construct targeted spear-phishing emails addressed directly to specific executives, finance officers, or IT system administrators.",
    hint: "Think of extracting the entire corporate employee directory and email addresses from the web.",
    level: "basic",
    codeExample: `// theHarvester CLI Execution:
theHarvester -d kolkata-fintech.co.in -b google,linkedin,duckduckgo
// Output:
[*] Target: kolkata-fintech.co.in
[*] Found 42 emails:
mamata.sen@kolkata-fintech.co.in
debangshu.das@kolkata-fintech.co.in
mahima.roy@kolkata-fintech.co.in`
  },
  {
    question: "What is 'Metadata Extraction' from public documents (using tools like FOCA or ExifTool), and what hidden data does it reveal?",
    shortAnswer: "Analyzing public PDFs, DOCX, and image files for embedded metadata revealing internal usernames, operating system paths, software versions, and printer names.",
    explanation: "When organizations publish PDFs, whitepapers, or annual reports on their public websites, the authoring software automatically embeds metadata. Tools like FOCA and ExifTool download these documents and extract: 1. Internal employee Windows usernames (e.g. `C:\\Users\\mamata\\Documents\\`); 2. Internal server names and file paths; 3. Exact software versions (e.g. Microsoft Word 2016, Adobe Acrobat Pro 2020); 4. GPS coordinates in image EXIF data.",
    hint: "Think of the hidden metadata properties saved inside PDF documents that reveal who wrote them and on which computer.",
    level: "moderate",
    codeExample: `// ExifTool Metadata Inspection:
exiftool Annual_Report_2026.pdf
// Output:
Author:          Mamata Sen (Internal Username: msen)
Creator Tool:    Microsoft Word 2016
Producer:        macOS 14.2 Quartz PDFContext
File Path:       /Users/mamata/Projects/FinTech/Reports/2026/`
  },
  {
    question: "What is 'Banner Grabbing', and how does an ethical hacker execute it using Netcat or cURL during active reconnaissance?",
    shortAnswer: "Connecting to open network ports to read the raw text banner returned by the listening service, identifying the exact software name and version.",
    explanation: "When a client initiates a connection to a network daemon (HTTP, FTP, SSH, SMTP), the service often sends a welcome banner string identifying itself. An ethical hacker connects via `nc -nv 203.0.113.50 21` or `curl -I https://203.0.113.50`. The server responds with `220 ProFTPD 1.3.5 Server` or `Server: Apache/2.4.49 (Unix)`. The tester can immediately look up known zero-days and CVEs for that exact version.",
    hint: "Think of knocking on a door and listening to the security guard introduce themselves by their exact rank and badge number.",
    level: "basic",
    codeExample: `// HTTP Banner Grabbing via cURL:
curl -I https://kolkata-fintech.co.in
// Response Headers:
HTTP/2 200
server: nginx/1.18.0 (Ubuntu)
x-powered-by: PHP/7.4.3 (End-of-Life Version Vulnerable to CVEs!)`
  },
  {
    question: "What is 'Traceroute' (and TCP Traceroute), and how does it map firewall perimeters and network hops during active reconnaissance?",
    shortAnswer: "Sending packets with incrementing Time-to-Live (TTL) values to map intermediate routers, gateway hops, and identify where firewalls begin filtering traffic.",
    explanation: "Traceroute works by sending packets starting with TTL=1. Each router along the path decrements TTL by 1; when TTL hits 0, the router returns an ICMP Time Exceeded packet, revealing its IP address. `tcptraceroute` bypasses traditional ICMP blocking by sending TCP SYN packets to port 80/443, allowing ethical hackers to map internal routing topology and determine exactly which hop hosts the corporate perimeter firewall.",
    hint: "Think about sending scouts with short-lived candles to find every relay station along the road to the castle.",
    level: "moderate",
    codeExample: `// TCP Traceroute Command to Bypass ICMP Filtering:
tcptraceroute -n kolkata-fintech.co.in 443
// Output:
1  192.168.1.1       0.82 ms (Local Gateway)
2  10.240.0.1        4.15 ms (ISP Edge Router in Kolkata)
3  203.0.113.1       12.30 ms (Corporate Perimeter Firewall - Filtered!)
4  203.0.113.50      12.45 ms (Target Web Server)`
  },
  {
    question: "What is 'DNS Enumeration' using Forward and Reverse Lookups, and how do automated tools like `dnsenum` automate this process?",
    shortAnswer: "Querying common subdomain wordlists against the target domain (Forward lookup) and scanning PTR records across IP blocks (Reverse lookup) to map all active hostnames.",
    explanation: "In Forward DNS Bruteforcing, `dnsenum` or `gobuster` queries hundreds of thousands of common subdomain names (e.g. `mail.target.com`, `admin.target.com`, `vpn.target.com`) against public DNS resolvers to identify valid A records. In Reverse DNS lookups, the tool sends PTR queries for every IP in `203.0.113.0/24` to discover the corresponding domain names assigned to internal servers.",
    hint: "Think of systematically testing thousands of possible website sub-names from a wordlist to see which ones exist.",
    level: "moderate",
    codeExample: `// Subdomain Bruteforcing via Gobuster:
gobuster dns -d kolkata-fintech.co.in -w /usr/share/wordlists/subdomains.txt -t 50
// Found:
Found: mail.kolkata-fintech.co.in
Found: vpn-gateway.kolkata-fintech.co.in
Found: jenkins-ci.kolkata-fintech.co.in`
  },
  {
    question: "What is 'Wayback Machine & Web Archive Reconnaissance', and how do ethical hackers use historical caches to find deleted secrets?",
    shortAnswer: "Querying historical web snapshots (web.archive.org) to view older versions of a target's website, uncovering deprecated API endpoints, deleted employee bios, and forgotten test files.",
    explanation: "Developers often deploy test files, administrative pages, or API documentation on public websites and later delete them. The Internet Archive (Wayback Machine) and tools like `waybackurls` crawl and archive historical HTML pages. Ethical hackers query these archives to find forgotten endpoints (e.g. `https://bank.com/api/v1/debug.php`) that may still be running live on the backend server despite being removed from the current website menu.",
    hint: "Think of looking through old historical photographs and newspapers of a building to find where the old secret tunnels used to be.",
    level: "basic",
    codeExample: `// Fetching Historical URLs via waybackurls:
echo "kolkata-fintech.co.in" | waybackurls | grep -E "\\.php|\\.json|\\.bak|api"
// Discovered Hidden Historical Endpoints:
https://kolkata-fintech.co.in/old-api/test_credentials.json
https://kolkata-fintech.co.in/admin_legacy/login.php`
  },
  {
    question: "What is 'Social Engineering Pretexting' during the Reconnaissance phase, and what are its strict ethical boundaries?",
    shortAnswer: "Inventing a fabricated scenario (pretext) to elicit information from employees; ethical testers must strictly obtain prior written authorization in the RoE before calling or emailing staff.",
    explanation: "Social engineering footprinting involves calling helpdesks, posing as a new intern, or sending surveys to extract internal organizational details (software versions, executive travel schedules). Because social engineering manipulates human psychology, ethical hackers must have explicit, signed Rules of Engagement (RoE) authorization covering social engineering, and must never cause emotional distress or compromise personal citizen privacy.",
    hint: "Think of pretending to be someone else over the phone to trick an employee into revealing office information.",
    level: "basic",
    codeExample: `// Ethical Pretexting Rules:
PERMITTED:  Signed RoE with explicit Social Engineering Scope + Escalation Contact.
PROHIBITED: Threatening employees, impersonating police/government officials, or extracting personal banking credentials.`
  },
  {
    question: "How do 'Cloud Storage Reconnaissance Tools' (e.g. S3Scanner / Cloudlist) discover exposed enterprise AWS S3 buckets and Azure blobs?",
    shortAnswer: "By generating permutations of target company names (e.g., `company-backup`, `company-data`) and sending unauthenticated HTTP requests to public cloud storage endpoints.",
    explanation: "Cloud storage buckets use predictable URL naming schemes: `https://[bucket-name].s3.amazonaws.com` or `https://[account].blob.core.windows.net`. Tools like S3Scanner take the target company name and brute-force thousands of permutations (`kolkata-fintech-prod`, `kolkata-fintech-backups`, `kolkata-fintech-logs`), querying the AWS API to check if the bucket exists and whether public read/write permissions are misconfigured.",
    hint: "Think of testing thousands of predictable cloud storage web links to find unlocked file folders.",
    level: "moderate",
    codeExample: `// S3 Bucket Permutation Enumeration:
s3scanner scan --bucket kolkata-fintech-backups
// Result:
[FOUND] [kolkata-fintech-backups] → Status: Open / Publicly Readable!
Files: customer_aadhaar_dump.tar.gz (CRITICAL DATA LEAK)`
  },
  {
    question: "Under the Indian IT Act 2000, what is the legal status of performing passive reconnaissance versus active reconnaissance on a third-party target?",
    shortAnswer: "Passive recon using public records is generally lawful; Active probing without written authorization can constitute unauthorized access under Section 43/66 of the IT Act.",
    explanation: "Querying public search engines (Google, Shodan, crt.sh) is lawful because the information is publicly published. However, the moment an individual initiates Active Reconnaissance (sending port probes, attempting DNS zone transfers, running automated vulnerability scanners) against an asset without explicit written permission, it constitutes unauthorized access under Section 43(a) and Section 66 of the Indian Information Technology Act 2000.",
    hint: "Remember that looking at public internet data is legal, but sending active scanning probes without permission is a crime.",
    level: "basic",
    codeExample: `// Legal Spectrum under Indian Law:
Passive OSINT (Searching crt.sh / Google):  LAWFUL PUBLIC RESEARCH
Active Probing (Sending Nmap packets):      UNAUTHORIZED ACCESS (IT Act Section 66 Violation without RoE!)`
  },
  {
    question: "How can enterprise Blue Teams detect and mitigate Active Reconnaissance against their external network perimeters?",
    shortAnswer: "By configuring firewall port-scan drop rules, rate-limiting DNS queries, disabling DNS zone transfers (AXFR), and removing identifying software version banners.",
    explanation: "To counter active reconnaissance: 1. Restrict DNS zone transfers (AXFR) strictly to authorized secondary nameserver IPs; 2. Configure Next-Gen Firewalls to automatically drop and ban IP addresses conducting sequential port sweeps; 3. Suppress server header banners (`ServerTokens Prod` in Apache, `server_tokens off` in Nginx); 4. Enforce Web Application Firewall (WAF) rate limiting against rapid URL bruteforcing.",
    hint: "Think about hiding the building signs, locking the master directory, and ignoring people knocking on all the doors at once.",
    level: "moderate",
    codeExample: `// Nginx Header Hardening & BIND DNS AXFR Restriction:
// 1. Nginx (nginx.conf):
server_tokens off; # Hides exact nginx version string

// 2. BIND DNS (named.conf):
allow-transfer { 10.0.0.2; }; # Forbids public AXFR zone transfers to unauthorized IPs!`
  },
  {
    question: "What is 'Reverse IP Lookup', and how does it reveal shared hosting co-tenants during passive footprinting?",
    shortAnswer: "Querying reverse DNS and SSL certificate records for a specific IP address to discover all other domain names and websites hosted on the same physical server.",
    explanation: "In shared cloud hosting, multiple companies share the same physical server and IP address. A Reverse IP Lookup (via HackerTarget or ViewDNS) queries which other domain names resolve to that same IP (e.g. `203.0.113.50`). If a shared co-tenant website runs an unpatched, vulnerable WordPress plugin, an attacker might compromise the co-tenant to execute a local privilege escalation and access the primary target's files.",
    hint: "Think of finding out all the other tenants living in the same apartment building as the target.",
    level: "moderate",
    codeExample: `// Reverse IP Lookup Query:
curl -s "https://api.hackertarget.com/reverseiplookup/?q=203.0.113.50"
// Discovered Shared Co-tenants:
kolkata-fintech.co.in
kolkata-marketing-events.com (Vulnerable WordPress 4.9!)
internal-testing-portal.net`
  },
  {
    question: "Synthesizing Phase 1 (Reconnaissance): what is the ultimate deliverable produced at the conclusion of footprinting?",
    shortAnswer: "A comprehensive, validated Target Attack Surface Profile—cataloging all live IP subnets, domain hierarchies, active technologies, employee directories, and potential attack vectors ready for Phase 2 Scanning.",
    explanation: "Reconnaissance is complete when the ethical hacker transforms raw, scattered public data into an actionable Target Attack Surface Profile. This document maps: 1. All validated in-scope domain names and subdomains; 2. Associated IP CIDR blocks and cloud infrastructure; 3. Employee hierarchy and email naming conventions; 4. Technological software stack; and 5. Priority high-value targets for Phase 2 scanning and Phase 3 exploitation.",
    hint: "Conclude by recognizing that the output of reconnaissance is the complete tactical map of the target's attack surface.",
    level: "expert",
    codeExample: `// Target Attack Surface Profile (Deliverable):
Target: Kolkata FinTech Ltd
Assets: 4 CIDR Blocks, 112 Active Subdomains, AWS us-east-1 Cluster, Cloudflare Edge
Identified Priorities:
1. dev-staging-payment.kolkata-fintech.co.in (Unpatched PHP 7.4 runtime)
2. s3://kolkata-fintech-backup (Misconfigured permissions)
-> Proceeding to Phase 2 Scanning!`
  }
];

export default questions;
