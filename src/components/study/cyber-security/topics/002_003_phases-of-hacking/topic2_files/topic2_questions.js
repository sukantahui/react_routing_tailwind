const questions = [
  {
    question: "What is 'Open-Source Intelligence' (OSINT), and what distinguishes it from covert espionage or unauthorized hacking?",
    shortAnswer: "The collection, processing, and analysis of publicly available information (social media, public databases, code repos, DNS ledgers) conducted legally without bypassing security barriers.",
    explanation: "OSINT gathers intelligence strictly from open, public records (search engine indexes, Certificate Transparency logs, public GitHub repositories, corporate filings, WHOIS databases, social media). Unlike illicit hacking or covert intelligence operations that use stolen credentials or exploit code, OSINT uses only data that the organization or individuals have voluntarily or inadvertently published to the public domain.",
    hint: "Think about gathering intelligence legally from publicly accessible websites and open records.",
    level: "basic",
    codeExample: `// The OSINT Spectrum:
Public Source:     https://github.com/kolkata-org/public-repo (Anyone can view)
OSINT Technique:   Trufflehog scans public commits for exposed API keys → 100% Legal Public Data!`
  },
  {
    question: "What is 'Maltego', and how does it use 'Transforms' to map complex relationships between domains, IP addresses, and people?",
    shortAnswer: "A visual link-analysis and data-mining platform that queries external APIs (Transforms) to visually graph relationships between entities (domains, emails, DNS servers, social profiles).",
    explanation: "Maltego represents cybersecurity assets and humans as discrete 'Entities' on a visual graph. An analyst inputs a domain name (`target.com`) and executes 'Transforms' (Python or API scripts that query Shodan, VirusTotal, WHOIS, or LinkedIn). Maltego automatically expands the graph, drawing interconnected nodes linking DNS servers, mail exchangers, employee email addresses, and subdomains.",
    hint: "Think of the visual link-analysis tool that draws spiderweb graphs linking websites, IP addresses, and email accounts.",
    level: "moderate",
    codeExample: `// Maltego Entity Transform Flow:
[ Domain: kolkata-fintech.co.in ]
    ├── Transform: "To DNS Name - SOA"  ──> [ ns1.kolkata-fintech.co.in ]
    ├── Transform: "To Email Addresses"  ──> [ admin@kolkata-fintech.co.in ]
    └── Transform: "To IP Address"       ──> [ 203.0.113.50 ]`
  },
  {
    question: "What are 'Trufflehog' and 'Gitleaks', and how do ethical hackers use them to detect code repository leaks during OSINT investigations?",
    shortAnswer: "Automated scanner tools that search Git commit histories and public repositories for high-entropy strings and regex patterns indicating hardcoded API keys, private keys, and database passwords.",
    explanation: "Developers frequently commit code to public GitHub repositories containing hardcoded credentials (AWS access keys, Stripe tokens, database passwords, JWT secrets) and later attempt to delete them with a new commit. Tools like Trufflehog and Gitleaks scan the entire historical commit chain (`git log`), using entropy analysis and regular expressions to extract secrets that were committed years in the past.",
    hint: "Recall the automated tools that hunt through GitHub commit history to find leaked passwords and AWS keys.",
    level: "basic",
    codeExample: `// Trufflehog CLI Scan on Public Git Repository:
trufflehog git https://github.com/vulnerable-org/web-app.git
// Output Found Leaked Secret:
[!] Found unencrypted AWS Access Key in commit 4a8b9f:
AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"`
  },
  {
    question: "What is 'OWASP Amass', and why is it considered the premier tool for in-depth attack surface mapping and DNS enumeration?",
    shortAnswer: "An open-source intelligence framework that aggregates over 55 external data sources (APIs, web archives, certificate logs) to map an organization's complete domain and IP graph.",
    explanation: "OWASP Amass combines passive intelligence gathering (querying Censys, Shodan, crt.sh, SecurityTrails, AlienVault) with active DNS resolution, IP routing analysis, and ASN mapping. It constructs a complete graph database of the target's attack surface, identifying unadvertised subdomains, shared hosting co-tenants, and third-party cloud assets with unmatched accuracy.",
    hint: "Remember the flagship OWASP tool used for comprehensive subdomain discovery and attack surface mapping.",
    level: "moderate",
    codeExample: `// OWASP Amass Attack Surface Enumeration:
amass enum -passive -d kolkata-fintech.co.in -src
// Output:
[CertSpotter] api.kolkata-fintech.co.in
[Shodan]      vpn.kolkata-fintech.co.in
[AlienVault]  dev-staging.kolkata-fintech.co.in`
  },
  {
    question: "What is 'Sherlock', and how do OSINT investigators use it to track individuals across multiple social networks?",
    shortAnswer: "A Python CLI tool that rapidly queries a target username against 300+ social media platforms and websites (GitHub, Reddit, Twitter, Instagram, TikTok) to discover all matching accounts.",
    explanation: "Individuals often reuse the same username (e.g. `sukanta_cyber_sec`) across multiple digital services. Sherlock takes a single username input and concurrently probes hundreds of websites by checking HTTP response status codes (e.g., HTTP 200 OK indicates the profile exists). In seconds, it produces a complete dossier of all social media profiles registered by that alias.",
    hint: "Think about searching 300 social media websites at once to find everywhere a username is registered.",
    level: "basic",
    codeExample: `// Sherlock Username Search:
sherlock debangshu_dev
// Found Profiles:
[*] GitHub:    https://github.com/debangshu_dev
[*] Reddit:    https://www.reddit.com/user/debangshu_dev
[*] DockerHub: https://hub.docker.com/u/debangshu_dev`
  },
  {
    question: "What is the '5-Stage OSINT Intelligence Cycle'?",
    shortAnswer: "1. Planning & Direction, 2. Collection, 3. Processing & Collation, 4. Analysis & Production, 5. Dissemination & Reporting.",
    explanation: "Raw data is not intelligence. The OSINT cycle transforms information into actionable insight: 1. Planning: Defining target objectives and legal scope; 2. Collection: Gathering raw data from social media, DNS, and search engines; 3. Processing: Standardizing data formats and removing duplicates; 4. Analysis: Correlating relationships and evaluating threats; 5. Dissemination: Presenting an actionable executive intelligence report.",
    hint: "Remember the 5 intelligence steps: Plan, Collect, Process, Analyze, and Disseminate.",
    level: "moderate",
    codeExample: `// OSINT Intelligence Cycle:
Planning (Scope Definition) → Collection (Tooling Scrapes) → Processing (Filtering JSON) → Analysis (Correlation) → Dissemination (Report)`
  },
  {
    question: "What is 'Spiderfoot', and how does it automate multi-source OSINT reconnaissance for enterprise red teams?",
    shortAnswer: "An automated open-source reconnaissance engine that executes over 200 OSINT modules simultaneously against target domains, IP addresses, or phone numbers to generate an integrated threat profile.",
    explanation: "Spiderfoot automates the tedious manual OSINT process. An analyst enters a single seed target (e.g. `kolkata-fintech.co.in`). Spiderfoot runs hundreds of modules concurrently: querying Shodan for open ports, checking HaveIBeenPwned for breached corporate emails, scraping crt.sh for subdomains, scanning for open S3 buckets, and checking dark web pastebins, compiling all findings into an interactive dashboard.",
    hint: "Think of an automated robotic investigator that runs 200 OSINT tools at the same time.",
    level: "basic",
    codeExample: `// Spiderfoot CLI Launch:
sf.py -s kolkata-fintech.co.in -m s_shodan,s_crt,s_haveibeenpwned -o tab
// Compiles integrated visual dossier of all discovered infrastructure, CVEs, and breached credentials.`
  },
  {
    question: "What is 'GHunt', and what specific OSINT metadata can be extracted from a target's Google email address?",
    shortAnswer: "A specialized tool that extracts the target's Google Account ID (GaiaID), public Google Maps reviews, Google Photos albums, active Google services, and YouTube channels from an email address.",
    explanation: "By querying Google's internal public APIs using an authorized session token, GHunt analyzes a Gmail address (`user@gmail.com`) to extract hidden OSINT data: the user's permanent Gaia ID, profile photo metadata, physical locations visited based on public Google Maps business reviews, Google Calendar availability, and linked YouTube channels.",
    hint: "Recall the tool that investigates Gmail addresses to find Google Maps reviews and public photos.",
    level: "moderate",
    codeExample: `// GHunt Google Account Investigation:
ghunt email target.executive@gmail.com
// Extracted:
Google ID (GaiaID):  10492837482910...
Profile Name:        Mamata Sen
Google Maps Reviews: 14 Reviews in Kolkata & Salt Lake City (Reveals physical commute pattern!)`
  },
  {
    question: "What is 'HaveIBeenPwned' (HIBP) and 'DeHashed', and how do ethical hackers use breached credential databases during threat modeling?",
    shortAnswer: "Services that index billions of credentials leaked in historical third-party data breaches; used to audit whether corporate employee passwords have been compromised on dark web forums.",
    explanation: "When large platforms (e.g. LinkedIn, Adobe, Canva) suffer breaches, criminal hackers trade credential dumps containing usernames, emails, and hashed passwords. Troy Hunt's HaveIBeenPwned (HIBP) and DeHashed allow security teams to query their corporate domain (`@bank.com`) to identify employees who reused corporate emails on compromised external sites, allowing proactive forced password resets.",
    hint: "Think of databases that tell you if your password was leaked in a historical website hack.",
    level: "basic",
    codeExample: `// HIBP API Query (Breached Account Verification):
GET https://haveibeenpwned.com/api/v3/breachedaccount/mamata@kolkata-fintech.co.in
// Response:
[
  {"Name": "LinkedIn", "BreachDate": "2016-05-18", "DataClasses": ["Email addresses", "Passwords"]},
  {"Name": "Canva", "BreachDate": "2019-05-24", "DataClasses": ["Names", "Passwords"]}
]`
  },
  {
    question: "What is 'Reverse Image Search' (Google Lens / Yandex), and how do OSINT analysts use it for Geolocation Verification (GEOINT)?",
    shortAnswer: "Uploading photos to search engine visual recognition engines to identify landmark architecture, background signs, geographical terrain, and original source social profiles.",
    explanation: "Geographical Open-Source Intelligence (GEOINT) frequently uses reverse image searching. When presented with a photo of an unlocated facility or executive meeting, analysts crop background landmarks, distinct buildings, or street signage and query Yandex or Google Lens. The search engine identifies visually matching images online, uncovering the exact street address, city, and GPS coordinates.",
    hint: "Think about uploading a photo of a building to find out exactly where in the world it was taken.",
    level: "moderate",
    codeExample: `// GEOINT Workflow:
1. Extract image from target social media post.
2. Crop unique architectural tower in background.
3. Yandex Visual Search matches tower to "Biswa Bangla Gate, New Town, Kolkata".
4. Street coordinates pinpointed to: 22.5851° N, 88.4682° E.`
  },
  {
    question: "What is 'SecurityTrails', and why is 'Historical DNS' data invaluable for discovering origin IP addresses behind Cloudflare / Akamai CDNs?",
    shortAnswer: "SecurityTrails maintains years of historical DNS records; looking up old `A` records reveals the true origin server IP used before the company deployed a Cloudflare reverse proxy.",
    explanation: "When an organization puts Cloudflare in front of their web server, public DNS lookups return Cloudflare's Anycast proxy IPs, hiding the real server. However, organizations often ran their web server on a direct public IP for months before setting up Cloudflare. Querying historical DNS records on SecurityTrails reveals the server's original direct IP address, allowing ethical hackers to bypass Cloudflare's WAF.",
    hint: "Think about looking at old phonebooks to find someone's direct home number before they hired a secretary.",
    level: "expert",
    codeExample: `// Historical DNS Lookup on SecurityTrails:
Domain: kolkata-fintech.co.in
Current A Record (Cloudflare Proxy): 104.21.45.10
Historical A Record (Recorded 2023):  203.0.113.50 (Direct Origin Web Server Exposed!)`
  },
  {
    question: "What is 'Censys', and how does its certificate-based search engine track newly deployed cloud infrastructure?",
    shortAnswer: "Censys continuously scans IPv4 and daily SSL/TLS certificate updates, allowing analysts to search for servers based on raw SHA-256 certificate fingerprints and HTTP responses.",
    explanation: "Developed by researchers at the University of Michigan, Censys indexes the internet by analyzing daily certificate scans and protocol handshakes. Ethical hackers query Censys by SSL certificate fingerprint (e.g. `services.tls.certificates.leaf_data.subject_dn: \"kolkata-fintech\"`). This immediately returns every server worldwide running that SSL certificate, uncovering unlisted cloud virtual machines across AWS, Azure, and DigitalOcean.",
    hint: "Think of finding every server in the world that uses your company's digital SSL certificate.",
    level: "moderate",
    codeExample: `// Censys Search Query:
services.tls.certificates.leaf_data.names: "kolkata-fintech.co.in" AND NOT location.country: "India"
// Discovers unauthorized test servers hosted in foreign cloud regions!`
  },
  {
    question: "Under India's Digital Personal Data Protection (DPDP) Act 2023, what are the ethical and legal boundaries for OSINT investigators researching individuals?",
    shortAnswer: "Collecting publicly available information for legitimate cybersecurity threat assessment is permitted; collecting personal citizen data for harassment, commercial profiling, or unauthorized storage violates DPDP Act Section 6 and Section 33.",
    explanation: "While OSINT utilizes public data, India's DPDP Act 2023 protects the privacy rights of 'Data Principals' (citizens). Security analysts must gather only the minimum data necessary for defensive threat modeling. Compiling extensive personal profiling dossiers (home addresses, medical history, family contacts) without lawful consent or regulatory exemption exposes the investigator's firm to statutory penalties up to ₹250 Crores.",
    hint: "Remember that collecting public data for defense is fine, but building intrusive personal dossiers violates Indian privacy law.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Compliance Rule for OSINT:
PERMITTED:  Auditing corporate email domain exposure in dark web breaches.
FORBIDDEN:  Scraping personal family photos and home addresses of employees for non-consensual profiling.`
  },
  {
    question: "What is 'S3Scanner', and how do ethical researchers use it to find unsecured AWS S3 storage buckets during corporate reconnaissance?",
    shortAnswer: "A Python tool that tests common bucket name permutations and sends HTTP GET/PUT requests to verify if cloud buckets permit public, unauthenticated reading or writing.",
    explanation: "Organizations frequently misconfigure AWS S3 bucket ACLs to 'Everyone' or 'All Authenticated Users'. S3Scanner takes a company name (e.g. `kolkata-bank`), generates wordlist permutations (`kolkata-bank-prod`, `kolkata-bank-backups`, `kolkata-bank-data`), and tests each bucket endpoint, flagging buckets that leak database backups or allow unauthorized file uploads.",
    hint: "Think of testing hundreds of possible cloud storage names to see if any are unlocked to the public.",
    level: "moderate",
    codeExample: `// S3Scanner Execution:
s3scanner scan --bucket-file company_permutations.txt
// Result:
[OPEN_READ]  http://kolkata-fintech-assets.s3.amazonaws.com (Public Images)
[OPEN_WRITE] http://kolkata-fintech-dev.s3.amazonaws.com    (CRITICAL: Allows malicious file uploads!)`
  },
  {
    question: "What is 'BGP Looking Glass', and how do network OSINT analysts use it to inspect global internet routing paths?",
    shortAnswer: "Public web interfaces hosted by major Internet Service Providers (ISPs) that allow remote users to view live BGP routing tables and autonomous system paths across the global internet.",
    explanation: "BGP Looking Glass servers (operated by Hurricane Electric, NTT, Level3) allow network engineers and ethical hackers to run `bgp route` queries from different geographical locations. This allows analysts to view how global traffic routes to an organization's Autonomous System Number (ASN), verifying whether BGP route hijacking or traffic diversion is occurring.",
    hint: "Think of public observation telescopes operated by global telecom providers to view internet routing maps.",
    level: "expert",
    codeExample: `// Looking Glass BGP Query (Route View):
route-views> show ip bgp 203.0.113.0/24
// Output:
BGP routing table entry for 203.0.113.0/24
Paths: (3 available, best #1)
  AS-Path: 1299 6453 13335 (Routes through Telia Carrier → Tata Communications → Target ASN)`
  },
  {
    question: "What is 'EXIF Data' in photography OSINT, and how can a simple smartphone photo leak the exact geographical location of a corporate facility?",
    shortAnswer: "Exchangeable Image File Format (EXIF) metadata embedded inside JPEG/PNG images that records the exact GPS latitude/longitude, camera model, and timestamp of the photo.",
    explanation: "When employees take smartphone photos of server rooms, badges, or whiteboards and upload them to Twitter, Reddit, or corporate websites, the raw image file often contains embedded EXIF tags. An ethical hacker downloads the photo and runs `exiftool`, extracting `GPS Latitude: 22 deg 34' 12.4\" N, GPS Longitude: 88 deg 21' 45.8\" E`, pinpointing the exact physical room where the photo was captured down to a two-meter radius.",
    hint: "Think of hidden GPS coordinates stored inside phone pictures that reveal where they were taken.",
    level: "basic",
    codeExample: `// ExifTool GPS Extraction:
exiftool server_rack.jpg | grep -i GPS
// Output:
GPS Latitude:        22 deg 34' 12.40" N
GPS Longitude:       88 deg 21' 45.80" E
GPS Position:        22.570111, 88.362722 (Pins location to an exact office building in Kolkata!)`
  },
  {
    question: "What is 'DNSDumpster', and how does it assist OSINT analysts in visualizing domain network topologies?",
    shortAnswer: "A free web-based domain research tool that maps subdomains, mail servers, DNS nameservers, and generates a downloadable visual network topology diagram of an organization.",
    explanation: "DNSDumpster queries search engine caches, certificate logs, and public DNS records to extract all A, MX, NS, and TXT records for a target domain. It automatically organizes the data into an exportable Excel spreadsheet and generates a visual graphical map showing relationships between subdomains, cloud hosting providers, and internal IP address spaces.",
    hint: "Think of the website that turns a company's web address into a visual map of all its subdomains and mail servers.",
    level: "basic",
    codeExample: `// DNSDumpster Topology Output:
Target: kolkata-fintech.co.in
DNS Servers:  ns1.cloudflare.com, ns2.cloudflare.com
Mail Servers: mx1.google.com (Google Workspace)
Discovered:   32 Subdomains mapped to AWS EC2 & Azure IP ranges.`
  },
  {
    question: "What is 'Pastebin & Dark Web Monitoring', and why is automated OSINT scraping essential for early breach warning?",
    shortAnswer: "Continuously scraping public paste sites (Pastebin, Ghostbin) and dark web forums for corporate domain mentions, leaked source code, and employee credential lists.",
    explanation: "When threat actors breach a database or developers accidentally paste proprietary code containing API keys, they frequently post it on text sharing platforms like Pastebin or dark web Telegram channels. Automated OSINT monitors (like AIL framework or custom Python scrapers) scan public pastes 24/7 for keywords (e.g. `@kolkata-bank.in`, `BEGIN RSA PRIVATE KEY`), alerting security teams within minutes of a leak.",
    hint: "Think about setting up automated radar scanning public text-sharing sites for leaked company passwords.",
    level: "moderate",
    codeExample: `// Python Pastebin Keyword Scraper (Pseudocode):
for paste in get_recent_pastes():
    if "kolkata-fintech.co.in" in paste.text or "BEGIN PRIVATE KEY" in paste.text:
        send_urgent_soc_alert(paste.url)`
  },
  {
    question: "How do Ethical Hackers maintain 'Operational Security' (OPSEC) while conducting OSINT investigations?",
    shortAnswer: "By using dedicated research virtual machines, commercial VPNs / Tor, sanitized browser profiles, and avoiding logging into personal social media accounts that leave tracking cookies.",
    explanation: "If an OSINT investigator visits a target's LinkedIn profile or website while logged into their personal Google account, the target receives a notification ('Someone viewed your profile') or records the investigator's home IP address in web server logs. Proper OPSEC requires using isolated virtual machines, ProtonVPN/Mullvad, burner accounts, and anti-detect browsers with disabled JavaScript to remain completely anonymous.",
    hint: "Think about wearing gloves, a mask, and an unmarked car so nobody knows you are the detective investigating the case.",
    level: "moderate",
    codeExample: `// OSINT Investigator OPSEC Golden Rules:
1. Never use personal email or logged-in browser accounts for investigations.
2. Route all queries through Multi-Hop VPNs or Tor circuits.
3. Conduct research inside disposable, isolated Whonix or Tails virtual machines.`
  },
  {
    question: "Synthesizing the power of Open-Source Intelligence: how does OSINT bridge the gap between technical reconnaissance and strategic threat modeling?",
    shortAnswer: "By synthesizing disparate fragments of public information into a complete multidimensional picture of an organization's technological vulnerabilities, human assets, and external supply chain risks.",
    explanation: "A single technical tool only sees an open port; OSINT sees the entire organizational ecosystem. By correlating a leaked GitHub commit with an employee's LinkedIn job history, historical DNS records, and an exposed S3 bucket, the ethical hacker constructs an accurate, holistic threat model. This comprehensive insight enables defensive security architects to patch vulnerabilities, train vulnerable staff, and protect critical assets before adversaries strike.",
    hint: "Conclude by recognizing how OSINT combines public data puzzle pieces into an actionable map of organizational defense.",
    level: "expert",
    codeExample: `// The OSINT Intelligence Equation:
(Public_Data_Fragments + Visual_Link_Analysis + Dark_Web_Monitoring) * OPSEC_Discipline = STRATEGIC_SECURITY_IMMUNITY;`
  }
];

export default questions;
