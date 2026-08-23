const questions = [
  {
    question: "What is an Application Layer (Layer 7) DDoS Attack, and how does it differ fundamentally from Network and Volumetric DDoS Attacks?",
    shortAnswer: "An attack that targets web servers, APIs, and database resources by generating legitimate-looking HTTP/HTTPS requests (measured in Requests Per Second - RPS), exhausting server CPU, RAM, and worker threads with minimal attacker bandwidth.",
    explanation: "While Volumetric attacks target bandwidth (Gbps) and Protocol attacks target connection tables (Mpps), Application Layer attacks target application software logic (RPS). An attacker can crash a server using less than 1 Mbps of bandwidth by sending 500 requests per second to an expensive database query endpoint (`/search?q=pan_data`), locking all CPU cores in database full-table scans.",
    hint: "Hiring 500 people to each walk into a bank and ask the teller to audit 10 years of paper records simultaneously.",
    level: "basic",
    codeExample: `// Layer 7 Application DDoS Profile:
// Attack Metric   : Requests Per Second (RPS) or Transactions Per Second (TPS)
// Bandwidth Used  : Very Low (Under 5 Mbps!)
// Primary Target  : Server CPU, Web Worker Threads, Database Pools & SSL Decryption Engines`
  },
  {
    question: "What is 'Slowloris', and how does it exhaust Web Server Connection Pools using Incomplete HTTP Headers?",
    shortAnswer: "Slowloris opens multiple HTTP connections and periodically sends incomplete request headers (e.g. `X-a: b\\r\\n` every 15 seconds), never sending the final `\\r\\n\\r\\n`, holding server worker threads open with almost zero bandwidth.",
    explanation: "Traditional thread-based web servers (Apache prefork) allocate 1 dedicated worker process or thread per connection (default max 256). Slowloris sends `GET / HTTP/1.1\\r\\nHost: example.com\\r\\n` and then drips one custom header line every 15 seconds. The server keeps the thread open waiting for the request to complete. With just 300 slow connections (under 5 KB/s bandwidth), all 256 Apache worker threads are occupied, blocking all legitimate users.",
    hint: "Sitting at a restaurant table, ordering one breadstick every 15 minutes, and refusing to leave so no new diners can be seated.",
    level: "basic",
    codeExample: `// Slowloris Header Sequence:
GET / HTTP/1.1\\r\\n
Host: kolkata-fintech.in\\r\\n
User-Agent: Mozilla/5.0...\\r\\n
X-Custom-Header-1: a\\r\\n
... (waits 15 seconds) ...
X-Custom-Header-2: b\\r\\n  <-- Never sends final \\r\\n\\r\\n! Holds worker thread indefinitely!`
  },
  {
    question: "What is 'R-U-Dead-Yet' (RUDY - Slow POST Attack), and how does it exploit HTTP Form Submissions?",
    shortAnswer: "RUDY submits HTTP POST requests with a large `Content-Length` header (e.g. 1,000,000 bytes) and transmits the body data at an extremely slow rate (e.g. 1 byte every 10 seconds), tying up web server threads for hours.",
    explanation: "RUDY targets web form endpoints (`/login`, `/feedback`). It sends `POST /feedback HTTP/1.1` with `Content-Length: 1000000`. It then sends 1 single byte of form data every 10 seconds. The web server keeps the connection thread active waiting for the full 1MB payload. With 200 concurrent RUDY connections, all web server worker processes are occupied, denying service to real users.",
    hint: "Mailing a 1,000-page book by sending one single letter on a postcard every week.",
    level: "moderate",
    codeExample: `// RUDY (R-U-Dead-Yet) Attack Header:
POST /submit-feedback HTTP/1.1\\r\\n
Host: kolkata-fintech.in\\r\\n
Content-Length: 1000000\\r\\n
Content-Type: application/x-www-form-urlencoded\\r\\n
\\r\\n
a=1 (waits 10s) &b=2 (waits 10s) &c=3 ...`
  },
  {
    question: "What is 'Slow Read DoS' (Slowloris Read Counterpart), and how does it exploit TCP Window Size advertisements?",
    shortAnswer: "The attacker requests a large file (e.g. 50MB PDF/image) and advertises a tiny TCP receive window (e.g. 32 bytes), reading data at a rate of 1 byte per second, forcing the server to hold the response in memory buffers for hours.",
    explanation: "In a Slow Read attack, the client completes the handshake and issues a legitimate `GET /large-report.pdf HTTP/1.1`. However, it sets its TCP receive window to 32 bytes and reads the response at an agonizingly slow rate. The server must hold the unread response data in its kernel send buffer and web application memory, tying up server sockets and worker threads.",
    hint: "Ordering a 10-course meal and taking one single grain of rice every 10 minutes so the waiter must stand beside you all day.",
    level: "expert",
    codeExample: `// Slow Read Attack Mechanism:
// 1. Client requests large dynamic asset: GET /annual-report.pdf HTTP/1.1
// 2. Client TCP Window Size = 32 Bytes
// 3. Client reads 1 byte/second ➔ Server keeps connection and socket memory open for hours!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for using Application Layer DDoS attacks to paralyze Critical Public Infrastructure?",
    shortAnswer: "Launching Layer 7 DDoS attacks that deny access to critical infrastructure (power grid SCADA web consoles, emergency healthcare portals, railway reservation servers) is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary launches an HTTP flood or Slowloris attack that paralyzes emergency healthcare admission portals in Ichapur or state power grid SCADA management portals in Barrackpore, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Application Layer Cyber Terrorism.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Paralyzing state health department emergency portal with 250k RPS HTTP floods
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "Why do 'Asynchronous Event-Driven Architectures' (e.g. Nginx / Node.js) Resist Slowloris Attacks while Thread-Based Servers (Apache prefork) Fail?",
    shortAnswer: "Event-driven asynchronous servers use non-blocking I/O (`epoll`) to multiplex tens of thousands of concurrent connections using a single worker thread, consuming only a few kilobytes of RAM per connection without blocking request execution.",
    explanation: "Apache prefork creates 1 dedicated OS process per connection (256 connections = 256 processes, exhausting the thread pool). Nginx uses an asynchronous event loop (`epoll`). A single Nginx worker handles 65,000 idle connections. When Slowloris sends slow headers, Nginx holds the connection in memory without consuming dedicated worker threads, easily dropping connections that exceed `client_header_timeout`.",
    hint: "One fast juggling performer who can keep 1,000 balls in the air at once without needing 1,000 separate jugglers.",
    level: "expert",
    codeExample: `// Nginx Asynchronous Event-Driven Configuration:
events {
    worker_connections 65535; # Handles 65k connections per worker!
    use epoll;                # Linux high-performance non-blocking I/O
}
# Client header timeout drops slowloris connections after 10s:
client_header_timeout 10s;
client_body_timeout   10s;`
  },
  {
    question: "What is an 'HTTP GET Flood', and how do Attackers Target 'Expensive Endpoints' to maximize Server CPU/Database Starvation?",
    shortAnswer: "Flooding high volumes of HTTP GET requests specifically targeting un-cached database queries, complex search filters, or heavy cryptographic operations, causing 100% database CPU lockup with minimal attack traffic.",
    explanation: "A naive attacker floods static pages like `index.html` (which CDNs cache and absorb). A sophisticated attacker targets expensive dynamic endpoints: `GET /api/v1/search?filter=complex_join&sort=timestamp_desc`. Each request triggers an unindexed 5-table JOIN across 10,000,000 database rows. With just 100 requests per second, the database CPU hits 100%, causing connection pool starvation and HTTP 504 Gateway Timeouts.",
    hint: "Asking a librarian to find every single book containing the word 'the' instead of asking for the book on the front display.",
    level: "moderate",
    codeExample: `// HTTP GET Expensive Endpoint Flood:
GET /reports/generate-pdf?year=2026&dept=all HTTP/1.1
Host: kolkata-fintech.in
User-Agent: Mozilla/5.0...
# Forces backend server to generate a heavy 50MB PDF report in memory for every request!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if Application DDoS causes extended personal data access outages?",
    shortAnswer: "Failing to implement reasonable technical availability controls resulting in persistent personal data access collapse triggers statutory penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If an e-commerce platform or banking portal in West Bengal suffers prolonged service unavailability due to absent WAF rate limiting or Slowloris protections, preventing citizens from exercising their data rights, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Application Layer DDoS availability collapse triggers maximum national data privacy penalties.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent application availability safeguards`
  },
  {
    question: "What is 'SSL/TLS Handshake Exhaustion' (e.g. THC-SSL-DOS), and how does it exploit the Asymmetry of Asymmetric Cryptography?",
    shortAnswer: "The attacker initiates thousands of SSL/TLS handshakes or requests continuous renegotiations; decrypting the client key exchange requires 15x more server CPU processing than the client spends generating it.",
    explanation: "In RSA/ECDHE TLS handshakes, the client performs a cheap encryption operation, while the server must perform an expensive private-key decryption or modular exponentiation. An attacker running on a laptop can generate 500 TLS handshakes per second, forcing a multi-core enterprise server to dedicate 100% of its CPU to cryptographic handshakes, freezing web services.",
    hint: "Mailing someone 500 locked puzzle boxes per second that take them 10 seconds each to unlock with a key.",
    level: "expert",
    codeExample: `// SSL/TLS Cryptographic Asymmetry:
// Client Work   : Generates Pre-Master Secret (Very Cheap CPU Cost)
// Server Work   : Performs RSA 2048-bit Private Key Decryption (15x More Expensive!)
// Mitigation    : TLS Session Resumption (Session Tickets) & Disabling Client-Initiated TLS Renegotiation`
  },
  {
    question: "How does 'JavaScript Cryptographic Proof-of-Work' (Cloudflare Under Attack Mode) Neutralize Automated HTTP Floods?",
    shortAnswer: "By serving an intermediate interstitial challenge requiring the client browser to compute a mathematical cryptographic puzzle (e.g. SHA-256 hash collision) within 5 seconds before granting access, filtering out dumb automated bot scripts.",
    explanation: "Layer 7 botnets use lightweight HTTP libraries (Python `requests`, `curl`, Go HTTP) that cannot execute JavaScript engines. When Under Attack Mode is active, the cloud proxy returns an HTTP 503 with an embedded JavaScript math challenge. Real web browsers (Chrome, Firefox) execute the JavaScript, solve the puzzle in 200ms, and obtain a clearance cookie (`cf_clearance`). Simple bot scripts fail the challenge and are blocked with HTTP 403.",
    hint: "A computational bouncer asking visitors to solve a complex math puzzle on their calculator before letting them in.",
    level: "basic",
    codeExample: `// JavaScript Proof-of-Work Challenge Concept:
// Server Challenge: Find integer 'N' such that SHA256("kolkata-" + N) ends with "00000"
// Real Browser    : Computes 100,000 hashes in 300ms ➔ Submits answer ➔ Receives 'cf_clearance' cookie!
// Dumb HTTP Bot   : Cannot execute JavaScript ➔ BLOCKED WITH HTTP 403!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Application Layer DDoS attacks affecting Indian organizations?",
    shortAnswer: "All organizations in India must report Application Layer DDoS attacks affecting public services, banking portals, or healthcare applications to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including Layer 7 DDoS attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of application-layer DDoS service outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Residential Proxy Network Rotation' in Modern Layer 7 HTTP Floods?",
    shortAnswer: "Routing attack HTTP requests through hundreds of thousands of compromised residential broadband IP addresses (home Wi-Fi routers), where each IP sends only 1 request every 2 minutes with valid browser headers, bypassing simple per-IP rate limiters.",
    explanation: "Simple rate limiters block an IP if it makes $> 10$ req/s. Modern botnets route HTTP floods through 250,000 residential proxy IPs. Each IP sends just 1 request every 2 minutes with realistic headers (`User-Agent: Chrome/130`, `Accept-Language: en-US`). To the web server, it appears as 250,000 distinct legitimate human visitors, defeating basic IP rate limiting.",
    hint: "Hiring 100,000 different people to each walk into a store and buy 1 piece of candy instead of 1 person buying 100,000 pieces.",
    level: "expert",
    codeExample: `// Residential Proxy Header Rotation:
// IP 182.70.1.5  ➔ GET /api/search?q=aadhaar (1 req/min) [User-Agent: Chrome/128]
// IP 103.25.10.8 ➔ GET /api/search?q=pan (1 req/min)     [User-Agent: Firefox/130]
// Mitigation     : Behavioral Web Application Firewalls (WAF) & Rate Limiting by Session / API Key!`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching Slowloris or HTTP flood attacks?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes application-layer denial of service: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching a Slowloris attack that takes down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "How do 'Leaky Bucket' and 'Token Bucket' Algorithms enforce Rate Limiting in Web Application Firewalls (WAF)?",
    shortAnswer: "Token Bucket allows bursts up to bucket capacity while enforcing a steady long-term rate; Leaky Bucket processes requests at a strictly constant rate, dropping requests that exceed the buffer capacity.",
    explanation: "In Nginx `limit_req`, the Token Bucket algorithm is used: `limit_req zone=api rate=10r/s burst=20 nodelay`. Tokens are added to the bucket at 10 tokens/sec. A legitimate user loading a web page with 15 simultaneous assets consumes 15 burst tokens instantly without delay (`nodelay`). If an attacker sends 50 requests/sec, the bucket empties and all surplus requests are dropped with HTTP 429 Too Many Requests.",
    hint: "A water bucket with a small hole in the bottom (Leaky Bucket) vs an arcade ticket dispenser giving out 10 tickets per minute (Token Bucket).",
    level: "expert",
    codeExample: `// Nginx Token Bucket Rate Limiting:
# Define 10MB shared memory zone tracking 160,000 unique IP addresses:
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

location /api/ {
    # Allows 10 req/s with burst allowance of 20 requests:
    limit_req zone=api_limit burst=20 nodelay;
    proxy_pass http://backend_api_cluster;
}`
  },
  {
    question: "What is 'HTTP/2 Rapid Reset' (CVE-2023-44487), and how did it achieve Record-Breaking 398 Million RPS DDoS Floods?",
    shortAnswer: "Abusing HTTP/2 stream multiplexing by opening hundreds of concurrent request streams and immediately sending `RST_STREAM` frames to cancel them, forcing the server to process the request logic before freeing the stream, generating 398 Million RPS.",
    explanation: "In October 2023, threat actors exploited a flaw in the HTTP/2 protocol. In HTTP/2, multiple requests share a single TCP connection. Attackers sent a stream of `HEADERS` frames (initiating requests) followed instantly by `RST_STREAM` frames (canceling them). The server processed the request setup logic in software, but the stream canceled before completing, allowing a tiny botnet to generate a historic 398 Million RPS attack against Google and Cloudflare.",
    hint: "Pressing the order button at a fast-food kiosk and hitting 'Cancel' 1,000 times per second, forcing the kitchen computer to freeze.",
    level: "expert",
    codeExample: `// HTTP/2 Rapid Reset Exploit Loop (CVE-2023-44487):
for (int i = 0; i < 10000; i++) {
    send_frame(HEADERS_FRAME, stream_id=i);    // Opens stream & requests expensive asset
    send_frame(RST_STREAM_FRAME, stream_id=i); // Cancels stream instantly!
}
// Server spends CPU processing 10,000 stream allocations per millisecond!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for using HTTP flood scripts against corporate web applications?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Executing Slowloris and HTTP POST flood scripts against online examination servers in Kolkata
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Database Connection Pool Starvation' in Layer 7 DDoS Attacks?",
    shortAnswer: "Exhausting the fixed pool of active database connections (e.g. max 100 connections in HikariCP / pgpool) by flooding long-running dynamic search requests, causing all subsequent web requests to fail with HTTP 500/504 errors.",
    explanation: "Web applications maintain a connection pool (e.g. 50-100 connections) to the SQL database. An attacker sends 100 complex search requests that take 5 seconds each to execute. All 100 database connections are occupied. When legitimate users attempt to log in or view account balances, the application server cannot obtain a database connection, returning instant HTTP 500 Internal Server Error.",
    hint: "Renting all 100 shopping carts at a supermarket and refusing to let go of them so no other shoppers can buy groceries.",
    level: "expert",
    codeExample: `// HikariCP Database Connection Pool Exhaustion Error:
// java.sql.SQLTransientConnectionException: HikariPool-1 - Connection is not available, 
// request timed out after 30000ms. (Total=100, Active=100, Idle=0, Waiting=450)`
  },
  {
    question: "Synthesize an enterprise-scale Application Layer (Layer 7) DDoS Defense Architecture.",
    shortAnswer: "A multi-layered defense combining Cloud WAF with Behavioral Bot Management, JavaScript Proof-of-Work Challenges, Asynchronous Nginx Event Proxies with Strict Client Timeouts, Token Bucket Per-IP & Per-Route Rate Limiting, and Database Connection Pool Circuit Breakers.",
    explanation: "To achieve complete immunity against Layer 7 HTTP floods, Slowloris, and RUDY attacks: 1. Edge Cloud Tier: Cloudflare/Akamai WAF issuing JavaScript proof-of-work challenges (Under Attack Mode) to drop automated scripts. 2. Reverse Proxy Tier: Asynchronous Nginx proxies with `client_header_timeout 10s`, `client_body_timeout 10s`, and `keepalive_timeout 15s` (defeating Slowloris/RUDY). 3. Rate Limiting Tier: Token bucket rate limits capped at 15 req/s per IP and route-specific limits on expensive endpoints. 4. Application Tier: Resilience4j Circuit Breakers and query timeout caps on backend database pools.",
    hint: "Combine cloud WAF JS challenges, Nginx async client timeouts, token bucket rate limits, and database circuit breakers.",
    level: "expert",
    codeExample: `// Master Layer 7 DDoS Defense Blueprint:
// 1. Cloud Layer : Cloudflare Under Attack Mode (5-second JS Proof-of-Work Challenge)
// 2. Proxy Layer : Nginx Async Timeouts (client_header_timeout 10s, client_body_timeout 10s)
// 3. WAF Layer   : limit_req_zone $binary_remote_addr zone=api rate=15r/s burst=20 nodelay
// 4. App Layer   : Database Query Timeout Caps (SET statement_timeout = '3s')`
  },
  {
    question: "What is 'Cache Bypassing' (Cache Busting) in Layer 7 HTTP Floods?",
    shortAnswer: "Appending unique random query parameters (e.g. `GET /?rand=1829384`) or unique headers to every request to force the edge CDN to miss its cache and forward every single request to the backend origin server.",
    explanation: "CDNs cache static assets (e.g. `style.css`, `logo.png`). To overwhelm the origin backend, botnets append random query strings: `GET /logo.png?v=938472938`. Because the URL is unique, the CDN cache misses and fetches the asset from the origin server in Kolkata. Modern WAFs mitigate this by ignoring non-standard query strings on static assets (`Strip Query Strings for Cache`).",
    hint: "Asking a librarian for the same book but requesting that they fetch a completely new copy from the basement every time by changing the serial number.",
    level: "moderate",
    codeExample: `// Cache-Busting HTTP Flood Pattern:
GET /index.html?nocache=98234812398 HTTP/1.1
GET /index.html?nocache=12938471209 HTTP/1.1
# Forces CDN Cache-Miss ➔ Floods 100% of traffic directly to Backend Origin Server!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Application Layer DDoS Floods?",
    shortAnswer: "Intentionally causing damage or disruption to electronic services that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker launches an HTTP flood that crashes web application servers and takes e-commerce portals offline in West Bengal, the act diminishes the utility of electronic property, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally crashing corporate web servers via HTTP POST flooding (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Regular Expression Denial of Service' (ReDoS) in Web Application Security?",
    shortAnswer: "Submitting crafted text inputs to an endpoint using poorly designed regexes with nested quantifiers (e.g. `(a+)+$`), triggering exponential O(2^N) backtracking that locks server CPU cores at 100%.",
    explanation: "When evaluating a string like `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!` against `^(a+)+$`, standard NFA regex engines evaluate over 1 Billion backtracking combinations. Just 20 concurrent requests with this payload lock all 32 CPU cores of a web application server for minutes, denying service to all other users.",
    hint: "Giving a computer an unsolvable maze puzzle that forces it to check 1,000,000,000 dead ends before giving up.",
    level: "expert",
    codeExample: `// ReDoS Vulnerable Regex Pattern:
let regex = /^(a+)+$/;
let attack_payload = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"; // 30 'a's followed by '!'
// Backtracking steps: 1,073,741,824 operations ➔ 100% CPU Core Lock!`
  },
  {
    question: "What is 'HTTP Header Injection / Large Header DoS'?",
    shortAnswer: "Sending HTTP requests with thousands of custom headers or header lines exceeding the web server's maximum allowable header buffer size (`large_client_header_buffers`), forcing memory re-allocation and connection drops.",
    explanation: "Web servers allocate small in-memory buffers (e.g. 4KB-8KB) for HTTP headers. If an attacker sends 5,000 headers in a single request (`X-Header-1: A... X-Header-5000: B`), the server allocates large memory blocks. If the request exceeds the limit, the server drops the connection, but parsing millions of oversized headers exhausts CPU and RAM.",
    hint: "Attaching a 500-page cover letter to a 1-page job application, forcing the office to spend all day reading the cover letter.",
    level: "moderate",
    codeExample: `// Nginx Header Buffer Restriction:
client_header_buffer_size 1k;
large_client_header_buffers 4 8k; # Rejects oversized headers with HTTP 414 / 431!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for Application Layer DDoS Floods targeting 'Protected Systems' (Critical National Infrastructure)?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power transmission in Barrackpore, financial settlement switches in Salt Lake). Launching an application-layer flood that denies access to a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Flooding SCADA web management application portals with HTTP floods
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'HTTP/2 Multiplexing Amplification' in Web Application DoS?",
    shortAnswer: "Opening a single TCP connection and requesting 1,000 concurrent resource streams simultaneously over HTTP/2, bypassing per-connection firewalls and forcing the server to process 1,000 application requests in parallel over 1 socket.",
    explanation: "Under HTTP/1.1, each request required a separate TCP connection (capped by browser connection limits). HTTP/2 allows thousands of concurrent streams on 1 connection. An attacker opens 1 TCP connection and fires 5,000 stream requests simultaneously, forcing the backend application to process 5,000 queries in parallel, bypassing basic per-IP connection limiters.",
    hint: "Using a single telephone line to place 1,000 simultaneous conference calls to the same operator.",
    level: "expert",
    codeExample: `// Nginx HTTP/2 Stream Concurrency Hardening:
http2_max_concurrent_streams 128; # Caps concurrent streams per connection to 128!
http2_recv_buffer_size 256k;`
  },
  {
    question: "How does 'Behavioral Machine Learning Bot Detection' differentiate Legitimate Human Users from Advanced Residential Proxy HTTP Floods?",
    shortAnswer: "By analyzing mouse movement dynamics, typing cadence, scroll velocity, device canvas fingerprinting, and session request timing entropy to identify non-human behavioral anomalies.",
    explanation: "Residential proxy botnets rotate IPs, but automated scripts lack human behavioral noise: they issue requests at precise intervals, generate zero mouse coordinate telemetry, have static canvas hashes, and follow unnatural navigation paths (requesting deep subpages without fetching CSS/images). Machine learning WAF models score these features in real time, dropping bot requests with high confidence.",
    hint: "A store security guard who can tell someone is a shoplifter by how they walk and look around, even if they are wearing ordinary clothes.",
    level: "expert",
    codeExample: `// Behavioral Anomaly Detection Feature Vector:
// 1. Mouse Trajectory Entropy  : 0.0 (No mouse movement ➔ SCRIPTED BOT!)
// 2. Asset Request Correlation : Missing CSS/JS/Image downloads
// 3. Request Interval Jitter   : Strict 500ms intervals (Non-human timing!)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Layer 7 DDoS Extortion?",
    shortAnswer: "Threatening to launch or maintain an Application Layer HTTP flood unless company leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a company's web application with 200,000 RPS HTTP traffic and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹40 Lakhs in cryptocurrency under threat of continuing a 200k RPS HTTP flood
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'JSON / XML Entity Bomb' (Billion Laughs Attack) in Application Layer DoS?",
    shortAnswer: "Submitting a tiny XML/JSON payload containing recursive nested entity declarations; when parsed, the parser expands the entities exponentially into gigabytes of RAM, crashing the server with an Out-Of-Memory error.",
    explanation: "In an XML Entity Expansion attack, a 1KB XML payload defines 10 entities, each referencing the previous entity 10 times: `&lol9;` expands into $10^9$ (1 Billion) instances of 'lol' in memory (~3 Gigabytes of RAM). When the web server's XML parser attempts to resolve the entities, it consumes all available heap memory and crashes instantly.",
    hint: "A Russian nesting doll that, when opened, multiplies into 1,000,000,000 full-sized dolls that fill the entire room.",
    level: "expert",
    codeExample: `<!-- XML Billion Laughs Bomb Payload (1KB Payload ➔ 3GB RAM Expansion!): -->
<!DOCTYPE lolz [
 <!ENTITY lol "lol">
 <!ENTITY lol1 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
 <!ENTITY lol2 "&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;">
 ...
 <!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
]>
<lolz>&lol9;</lolz>`
  },
  {
    question: "What is 'Database Query Timeout Capping' in Application Layer Resilience?",
    shortAnswer: "Configuring the database engine to automatically cancel any query that runs longer than a strict threshold (e.g. `statement_timeout = 3000ms`), preventing expensive DoS search queries from locking CPU threads indefinitely.",
    explanation: "If an attacker sends expensive search requests that take 60 seconds each to run, all database threads are occupied. Setting `SET statement_timeout = '3s'` ensures that if any single query runs for longer than 3 seconds, PostgreSQL terminates the query immediately and returns an error, freeing the database connection pool for legitimate user queries.",
    hint: "Setting a 3-minute kitchen timer for every order so chefs do not spend 2 hours making one complicated dish while 100 other customers wait.",
    level: "moderate",
    codeExample: `-- PostgreSQL Query Timeout Hardening:
ALTER DATABASE kolkata_fintech SET statement_timeout = '3000ms';
-- Automatically terminates any query executing longer than 3 seconds!`
  },
  {
    question: "Synthesize the mathematical relationship between Worker Thread Pool Capacity (W_workers), Inbound Attack Request Rate (R_attack), Average Processing Duration (T_process), and Application Availability / Thread Starvation Probability (P_starvation).",
    shortAnswer: "Thread utilization is U_thread = (R_attack * T_process) / W_workers; thread starvation probability is modeled as P_starvation = 1 - e^(- max(0, U_thread - 1.0) * 10); deploying asynchronous event-driven proxies and query timeouts ensures P_starvation = 0.0%.",
    explanation: "Let $W_{\\text{workers}}$ represent the server's thread pool capacity (e.g. 256 threads in Apache prefork), $R_{\\text{attack}}$ represent the attack request rate (e.g. 200 req/s), and $T_{\\text{process}}$ represent average processing time (e.g. 3.0 seconds for Slowloris or heavy queries). Total active threads required is $W_{\\text{req}} = R_{\\text{attack}} \\times T_{\\text{process}} = 200 \\times 3.0 = 600$ threads. Since $600 > 256$, utilization is $U = 600 / 256 = 2.34 > 1.0$. Starvation probability is: $P_{\\text{starvation}} = 1 - e^{-(2.34 - 1.0) \\times 10} = 1 - e^{-13.4} = 99.99\\%$. Deploying asynchronous Nginx event loops ($W_{\\text{workers}} = 65,535$) reduces $U$ to $0.009$, keeping $P_{\\text{starvation}} = 0.0\\%$.",
    hint: "Mathematical formula proving that when required worker threads exceed pool capacity (W_req > W_workers), application thread starvation reaches 100%.",
    level: "expert",
    codeExample: `// Application Layer Thread Starvation Mathematical Proof:
// Worker Pool (W_workers) = 256 Threads | Ingress Slowloris Rate = 200 req/s | Hold Time = 15s
// Required Threads = 200 * 15 = 3,000 Threads (Overload Ratio U = 3000 / 256 = 11.7!)
// Starvation Probability: P_starvation = 1 - e^(- (11.7 - 1.0) * 10) = 100.0% (THREAD POOL COLLAPSED!)
// With Nginx Asynchronous epoll (W = 65,535): Utilization = 4.5% ➔ P_starvation = 0.00% (IMMUNE!)`
  }
];

export default questions;
