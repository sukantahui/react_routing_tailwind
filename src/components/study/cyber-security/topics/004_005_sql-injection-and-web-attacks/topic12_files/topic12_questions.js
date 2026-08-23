const questions = [
  {
    question: "What is a 'Web Application Firewall' (WAF), and how does it Differ from Traditional Network Firewalls?",
    shortAnswer: "A Layer 7 (Application Layer) security filter that inspects incoming HTTP/HTTPS requests and responses against signature rule sets, anomaly scoring models, and OpenAPI schemas to detect and block web attacks (SQLi, XSS, RCE, SSRF), whereas traditional network firewalls only filter Layer 3/4 IP packets and TCP/UDP ports.",
    explanation: "A standard network firewall permits traffic on Port 443 (HTTPS) without inspecting the payload inside. A WAF decodes TLS, inspects HTTP headers, URL parameters, cookies, and JSON/XML request bodies, blocking malicious injection payloads like `' UNION SELECT` or `<script>` before they reach the web application.",
    hint: "A smart security guard that reads the actual web form text and URL parameters rather than just checking port numbers.",
    level: "basic",
    codeExample: `// Layer 4 vs Layer 7 Firewall Inspection:
// Layer 4 Firewall: ALLOWS TCP 443 (Sees encrypted packets on port 443)
// Layer 7 WAF     : DECODES HTTPS ➔ Inspects GET /api/user?id=105' OR 1=1-- ➔ BLOCKS (HTTP 403 Forbidden!)`
  },
  {
    question: "What is 'Content Security Policy' (CSP), and how does a Strict Nonce-Based CSP Gating Model Neutralize Cross-Site Scripting?",
    shortAnswer: "An HTTP response header (`Content-Security-Policy`) that restricts the resources (scripts, images, stylesheets, frames) the browser is permitted to load and execute; a strict nonce-based CSP instructs the browser to ONLY execute `<script>` elements that contain a cryptographically secure random nonce generated per HTTP response.",
    explanation: "Under `script-src 'self' 'nonce-rAnd0m'`, when an attacker injects `<script>steal()</script>` or `<img src=x onerror=steal()>`, the browser evaluates the script against the response nonce. Because the injected payload lacks the per-request secret nonce, the browser drops the script and blocks inline event handlers, completely neutralizing XSS in the browser engine.",
    hint: "A security header that gives every legitimate script a secret random ticket; scripts without tickets are blocked.",
    level: "expert",
    codeExample: `// Strict Nonce-Based Content Security Policy Header:
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-4bf8e92a10c8'; object-src 'none'; base-uri 'none'; frame-ancestors 'none';`
  },
  {
    question: "What are the Core Directives in a Production Content Security Policy (CSP)?",
    shortAnswer: "`default-src` (fallback policy), `script-src` (JavaScript execution gating), `style-src` (CSS stylesheets), `img-src` (image sources), `connect-src` (XHR/Fetch/WebSocket targets), `object-src 'none'` (disables Flash/Java plugins), `base-uri 'none'` (prevents base tag hijacking), and `frame-ancestors 'none'` (stops Clickjacking).",
    explanation: "Each directive controls a specific browser resource loading pathway. Setting `object-src 'none'` completely eliminates legacy plugin exploits. Setting `frame-ancestors 'none'` replaces `X-Frame-Options: DENY`, guaranteeing that no external website can iframe the application for Clickjacking.",
    hint: "Directives that set specific rules for scripts, images, styles, connections, and iframes.",
    level: "moderate",
    codeExample: `// Comprehensive Production CSP Directive Blueprint:
Content-Security-Policy: 
    default-src 'self'; 
    script-src 'self' 'nonce-SECRET' 'strict-dynamic'; 
    style-src 'self' 'unsafe-inline'; 
    img-src 'self' data: https://images.kolkata-fintech.in; 
    connect-src 'self' https://api.kolkata-fintech.in; 
    object-src 'none'; 
    base-uri 'none'; 
    frame-ancestors 'none';`
  },
  {
    question: "What is 'WAF Anomaly Scoring' in the OWASP ModSecurity Core Rule Set (CRS) vs Paranoia Levels (PL1 to PL4)?",
    shortAnswer: "Instead of blocking on a single signature match, CRS assigns anomaly points (e.g. Critical = 5, Warning = 3) to suspicious patterns; if the cumulative score exceeds the inbound threshold (e.g. 5 points), the request is blocked. Paranoia Levels (PL1 to PL4) increase rule sensitivity and regex strictness at the cost of higher false positives.",
    explanation: "In ModSecurity CRS: PL1 provides baseline protection with near-zero false positives. PL2 adds strict regexes and decode checks. PL3 and PL4 inspect character set limits and special character counts for high-security banking/defense environments, requiring custom rule tuning.",
    hint: "Giving points to suspicious patterns and blocking the request when total points exceed a threshold.",
    level: "expert",
    codeExample: `// ModSecurity CRS Anomaly Scoring Rule Evaluation:
// Matched Rule 942100 (SQLi Detected) ➔ Anomaly Score +5 (CRITICAL)
// Inbound Threshold = 5 ➔ Total Score = 5 ➔ ACTION: DROP REQUEST (403 Forbidden)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for using WAF Evasion to take down Critical National Infrastructure?",
    shortAnswer: "Using WAF bypasses and injection exploits to compromise, seize control of, or destroy critical national information infrastructure (power grids, banking settlement switches, defense) is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary uses chunked encoding or double-URL evasion to bypass perimeter WAFs and compromise 220kV power grid SCADA servers in Barrackpore or banking settlement databases in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Bypassing perimeter WAF rules to execute SQL injection on state electrical grid SCADA databases
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "Why is a WAF 'NOT a Substitute for Secure Defensive Coding' (Prepared Statements & Input Validation)?",
    shortAnswer: "Because WAFs operate on pattern heuristics that can be bypassed through novel encoding tricks (Unicode homoglyphs, nested SQL comments `UN/**/ION`, HTTP request smuggling), whereas Parameterized Prepared Statements provide 100% mathematical immunity at the database engine level.",
    explanation: "A WAF is a defense-in-depth perimeter layer designed to buy time (Virtual Patching) and filter automated scanners. It is not an absolute barrier. If the underlying application code uses string concatenation, an attacker who crafts an un-signatured payload will breach the database despite the WAF.",
    hint: "A firewall is like a security guard at the gate, but prepared statements are like an unbreakable vault door inside.",
    level: "moderate",
    codeExample: `// Defense-in-Depth Responsibility Separation:
// 1. WAF Layer  : Filters automated scanner noise, rate limits, and provides instant virtual patches.
// 2. Code Layer : Parameterized Prepared Statements guarantee 100% AST invariance and mathematical safety.`
  },
  {
    question: "What is 'WAF Virtual Patching' and how does it Protect Live Applications during Zero-Day Disclosures?",
    shortAnswer: "Deploying targeted WAF inspection rules at the cloud edge to block specific exploit signatures immediately upon vulnerability discovery, protecting the live application while development teams write, test, and deploy permanent code-level fixes.",
    explanation: "When Log4Shell (CVE-2021-44228) or a zero-day SQLi is discovered: A WAF virtual patch rule blocking `(?i:\${jndi:(?:ldap|rmi))` or specific invoice URL parameters is deployed to all cloud edge nodes in 60 seconds. This neutralizes active attacks immediately while developers roll out code patches over the next 48 hours.",
    hint: "Using a firewall rule as a temporary emergency band-aid while developers fix the underlying code.",
    level: "moderate",
    codeExample: `// AWS WAF Virtual Patch Rule (JSON):
{
  "Name": "VirtualPatch-Invoice-SQLi-ZeroDay",
  "Priority": 1,
  "Statement": {
    "ByteMatchStatement": {
      "SearchString": "UNION SELECT",
      "FieldToMatch": { "QueryString": {} },
      "TextTransformations": [{ "Priority": 0, "Type": "URL_DECODE" }]
    }
  },
  "Action": { "Block": {} }
}`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the corporate liabilities if failure to maintain WAF and CSP perimeter controls causes citizen data leakage?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as WAF perimeter inspection and CSP headers) resulting in personal data breaches triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable technical security safeguards. If an enterprise in Kolkata operates public payment portals without perimeter WAF filtering or CSP headers, leading to citizen credential theft, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to deploy perimeter security controls leading to data breaches triggers fines up to ₹250 Crores under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent perimeter defense failures`
  },
  {
    question: "What is 'CSP Report-Only Mode' (`Content-Security-Policy-Report-Only`) and `report-to` Violation Telemetry?",
    shortAnswer: "A non-blocking staging mode where the browser evaluates CSP rules and reports violations to a designated telemetry endpoint (`report-to /api/csp-report`) without actually blocking resource execution, allowing security teams to audit legacy apps before enforcing blocking.",
    explanation: "Deploying a strict CSP on a large enterprise app can break legitimate inline scripts. Running `Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-violation-logger` allows engineers to monitor reports in real time for 2 weeks, identify all legitimate scripts, add nonces, and then switch to enforcing mode with zero downtime.",
    hint: "Testing your security rules in silent audit mode first so you don't accidentally break your website.",
    level: "expert",
    codeExample: `// CSP Report-Only Header:
Content-Security-Policy-Report-Only: 
    default-src 'self'; 
    script-src 'self' 'nonce-SECRET'; 
    report-uri /api/security/csp-violations;`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for WAF perimeter breaches and web attacks?",
    shortAnswer: "All organizations in India must report security breaches, unauthorized database access, and WAF perimeter bypasses to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including web portal compromises and perimeter breaches) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of perimeter security breaches within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is the 'Essential Security Headers Suite' (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)?",
    shortAnswer: "A standard set of HTTP response headers: 1. `Strict-Transport-Security` (HSTS enforces HTTPS); 2. `X-Content-Type-Options: nosniff` (stops MIME sniffing); 3. `Referrer-Policy: strict-origin-when-cross-origin` (protects token leakage in URLs); 4. `Permissions-Policy` (disables camera/mic/geolocation).",
    explanation: "Configuring these headers via Helmet.js hardens browser behavior: HSTS prevents SSL-stripping MitM attacks; `nosniff` prevents browsers from executing text files as JavaScript; `Permissions-Policy: camera=(), microphone=()` blocks compromised third-party scripts from accessing victim hardware.",
    hint: "A bundle of important security headers that lock down HTTPS, prevent MIME confusion, and block unauthorized microphone/camera access.",
    level: "moderate",
    codeExample: `// Production Security Headers Blueprint:
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized access resulting from missing perimeter controls?",
    shortAnswer: "Accessing or securing access to a computer system, downloading, copying, or extracting data without permission carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized computer access and data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized computer access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Exploiting perimeter WAF bypasses to extract 60,000 customer banking records in Kolkata
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'HTTP Request Smuggling' (HRS - CL.TE / TE.CL) and how does it Bypass Front-End Reverse Proxy WAFs?",
    shortAnswer: "When front-end WAF proxies and backend origin servers disagree on HTTP request boundaries due to conflicting `Content-Length` (CL) and `Transfer-Encoding` (TE) headers, allowing an attacker to smuggle hidden HTTP requests directly to the backend past WAF inspection.",
    explanation: "In a CL.TE attack: The front-end WAF processes the `Content-Length` header (allowing the full request), while the backend processes `Transfer-Encoding: chunked` (terminating early). The remaining bytes of the request remain in the backend TCP socket buffer, prepending an unauthorized administrative request to the NEXT user's request, bypassing WAF rules.",
    hint: "Tricking the front-end firewall and backend server into reading request lengths differently to smuggle hidden commands.",
    level: "expert",
    codeExample: `// CL.TE Request Smuggling Header Payload:
POST / HTTP/1.1
Host: kolkata-fintech.in
Content-Length: 13
Transfer-Encoding: chunked

0

SMUGGLED: GET /admin/deleteUser HTTP/1.1`
  },
  {
    question: "How does Cloudflare / AWS WAF 'Rate Limiting and Bot Management' Protect against Credential Stuffing & DDoS?",
    shortAnswer: "By tracking client request velocity per IP/session (e.g. max 100 requests per minute on `/login`) and using behavioral telemetry (TLS fingerprinting JA3/JA4, JavaScript challenges, CAPTCHAs) to block automated brute-force bots and volumetric Layer 7 DDoS floods.",
    explanation: "Adversaries use credential stuffing lists to test millions of passwords. A WAF rate limiting rule triggers after 5 failed logins within 60 seconds, issuing an HTTP 429 Too Many Requests or triggering a Cloudflare Turnstile challenge, neutralizing automated attacks before backend databases suffer resource exhaustion.",
    hint: "Slowing down or blocking users who send too many login requests in a few seconds.",
    level: "moderate",
    codeExample: `// AWS WAF Rate Limiting Rule (JSON):
{
  "Name": "RateLimit-Login-Endpoint",
  "Priority": 2,
  "Statement": {
    "RateBasedStatement": {
      "Limit": 100,
      "AggregateKeyType": "IP",
      "ScopeDownStatement": {
        "ByteMatchStatement": { "SearchString": "/api/auth/login", "FieldToMatch": { "UriPath": {} } }
      }
    }
  },
  "Action": { "Block": {} }
}`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing automated WAF evasion tools?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Writing automated scripts to bypass WAF filters on municipal portals in West Bengal
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'WAF SQLi Evasion via SQL Comments & Multipart Form Boundaries'?",
    shortAnswer: "Techniques where attackers insert SQL comments (`UN/**/ION/**/SEL/**/ECT`) or split payload characters across multiple MIME parts in `multipart/form-data` uploads to break simplistic regex patterns while remaining fully executable on the backend database.",
    explanation: "A naive WAF regex matches `UNION\\s+SELECT`. An attacker submits `UNION/**/SELECT` or `UNION%0ASELECT` (newline). The database engine ignores comments and whitespace, executing the query. This highlights why WAF inspection must be combined with AST-level parameterized prepared statements.",
    hint: "Hiding comments inside SQL keywords (like UN/**/ION) to confuse simple firewall regex rules.",
    level: "expert",
    codeExample: `// WAF Evasion Payload Variants:
// 1. Inline SQL Comments    : 105/**/UNION/**/SELECT/**/1,password,3/**/FROM/**/users--
// 2. Tab & Newline Injection: 105%09UNION%0ASELECT%09password%0AFROM%09users--`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Security Architecture combining WAF Perimeter Inspection and Strict CSP Gating.",
    shortAnswer: "A defense-in-depth framework combining Cloud WAF (AWS WAF / Cloudflare OWASP CRS with Anomaly Scoring), Reverse Proxy Rate Limiting, Strict Nonce-Based CSP (`script-src 'self' 'nonce-...'`), Security Response Headers (HSTS, nosniff, frame-ancestors 'none'), and 100% Parameterized Prepared Statements at the code tier.",
    explanation: "To achieve complete dual-perimeter immunity: 1. Cloud Perimeter: Cloud WAF inspecting L7 traffic, rate-limiting `/login`, and blocking OWASP Top 10 signatures. 2. Browser Perimeter: Strict Nonce CSP blocking unauthorized JavaScript execution and event handlers. 3. Transport Layer: HSTS enforcing HTTPS. 4. Application Layer: 100% Parameterized Prepared Statements and Zod schema validation.",
    hint: "Combine Cloud WAF inspection, Nonce-Based CSP headers, HSTS transport encryption, and Prepared Statements.",
    level: "expert",
    codeExample: `// Master Dual-Perimeter Defense Blueprint:
// 1. Cloud Edge   : AWS WAF Core Rule Set + Rate Limiting (100 req/min)
// 2. Response CSP : Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-SECRET'; object-src 'none';
// 3. Headers Suite: Strict-Transport-Security: max-age=63072000; X-Content-Type-Options: nosniff
// 4. Code Tier    : db.query('SELECT * FROM accounts WHERE id = $1', [userId])`
  },
  {
    question: "What is 'CSP `strict-dynamic`' in Modern Single Page Applications (React/Next.js)?",
    shortAnswer: "A CSP directive (`script-src 'nonce-...' 'strict-dynamic'`) that allows an authenticated root script (loaded with a valid nonce) to dynamically create and load child `<script>` elements without needing individual nonces for each dynamically generated script.",
    explanation: "Modern bundlers (Webpack, Vite, Next.js) dynamically load code-split chunks. Setting `strict-dynamic` instructs the browser that any script trusted via a nonce has permission to load secondary scripts via `document.createElement('script')`, greatly simplifying CSP maintenance in modern SPAs.",
    hint: "Letting a trusted main script load its own helper scripts automatically without needing separate passwords for each one.",
    level: "expert",
    codeExample: `// CSP strict-dynamic Configuration:
Content-Security-Policy: script-src 'nonce-rAnd0m123' 'strict-dynamic' https: 'unsafe-inline'; object-src 'none';`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via WAF Bypass Exploits?",
    shortAnswer: "Intentionally bypassing perimeter firewalls to delete, alter, or destroy digital databases, causing wrongful loss, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker bypasses a WAF to corrupt hospital patient treatment records or corporate payment databases in West Bengal, the act constitutes digital mischief under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Property Destruction with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Bypassing perimeter WAF rules to drop patient billing tables in a Kolkata hospital (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'ModSecurity Rule Structure (`SecRule`)' and How are Signatures Defined?",
    shortAnswer: "ModSecurity rules follow `SecRule VARIABLES \"OPERATOR\" \"TRANSFORMATIONS,ACTIONS\"` to inspect specific request parts (e.g. `ARGS`, `REQUEST_HEADERS`, `REQUEST_BODY`), apply decodings (`t:urlDecode,t:lowercase`), and execute actions (`deny,status:403,log`).",
    explanation: "Example: `SecRule ARGS:id \"@rx (?i:union\s+select)\" \"id:1001,phase:2,deny,status:403,t:urlDecode,t:lowercase,msg:'SQL Injection Attempt'\"`. When a request matches the regular expression on parameter `id`, ModSecurity blocks the transaction with HTTP 403.",
    hint: "The rule format that tells the firewall what to check, how to decode it, and what error code to return.",
    level: "expert",
    codeExample: `// ModSecurity SecRule Example:
SecRule ARGS "@rx (?i:(?:union\s+select|xp_cmdshell|load_file))" \
    "id:1005,phase:2,deny,status:403,t:urlDecode,t:lowercase,log,msg:'SQLi Injection Detected!'"`
  },
  {
    question: "What is 'CSP Hash-Based Gating (`'sha256-...'`)' vs Nonce-Based Gating?",
    shortAnswer: "Hash-based CSP computes the cryptographic SHA-256 hash of an exact inline script (`script-src 'sha256-abc...'`); the browser ONLY executes inline scripts matching that precise hash; nonces generate a dynamic random token per HTTP request.",
    explanation: "Hash-based CSP is ideal for static websites (SSG) where every response is identical and nonces cannot be dynamically generated per request. Nonce-based CSP is ideal for dynamic web servers (SSR) with server-side rendering.",
    hint: "Hashes verify the exact content of static scripts; Nonces give dynamic scripts a random one-time password.",
    level: "moderate",
    codeExample: `// Hash-Based CSP Header:
// Script Content : <script>console.log("Static App Init");</script>
// SHA-256 Hash   : 47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=
// CSP Header     : Content-Security-Policy: script-src 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for exploiting WAF bypasses against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching a WAF bypass attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Bypassing perimeter WAF rules to attack SCADA power grid management databases
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Positive Security Model (OpenAPI / Schema Validation) in Cloud WAFs'?",
    shortAnswer: "A security model where the WAF imports the application's OpenAPI (Swagger) JSON specification and ONLY permits HTTP endpoints, methods, parameters, and types explicitly defined in the schema, rejecting all undefined paths and inputs automatically.",
    explanation: "Instead of guessing what attacks look like (negative security), the WAF enforces: 'POST `/api/v1/transfer` only accepts JSON with `amount` (float) and `recipient` (UUID)'. If an attacker sends extra parameters (`role=admin`) or probes `/admin.php`, the WAF drops the request immediately.",
    hint: "Uploading your API blueprint to the firewall so it only allows exact matching API calls.",
    level: "expert",
    codeExample: `// Positive Security Schema Enforcement:
# WAF validates request against OpenAPI contract:
# Request: POST /api/v1/invoice { "id": 105, "unapprovedParam": "attack" }
# WAF Decision: BLOCKED (400 Bad Request - Parameter not in OpenAPI specification)`
  },
  {
    question: "Under the Indian IT Act Section 66C, what constitutes Identity Theft via Perimeter Bypass?",
    shortAnswer: "Fraudulently or dishonestly making use of the electronic signature, password, or unique identification feature of another person carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66C of the IT Act explicitly criminalizes identity theft. If an attacker bypasses WAF controls to extract citizen credentials or session tokens and impersonates users in Kolkata, they face up to 3 years imprisonment under Section 66C.",
    hint: "Section 66C covers Identity Theft and Session Misuse with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66C):
// Offense: Bypassing perimeter WAF to steal 25,000 citizen banking credentials in Kolkata
// Penalty: Imprisonment up to 3 Years + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'WAF Log Ingestion and SIEM Correlation (Splunk / Elastic)'?",
    shortAnswer: "Streaming WAF block and alert event logs in real time to centralized Security Information and Event Management (SIEM) systems to correlate attack patterns, identify distributed IP botnets, and trigger automated IP quarantine blocks.",
    explanation: "When an attacker probes multiple endpoints with SQLi payloads, AWS WAF logs stream to Amazon Kinesis and Splunk. The SIEM correlates 50 blocked requests from IP `103.25.10.1` across 3 domains and automatically pushes a temporary 24-hour IP ban to the CloudFront edge.",
    hint: "Sending firewall alert logs to a central security dashboard to automatically ban attacking computers.",
    level: "moderate",
    codeExample: `// SIEM Correlation Alert Rule:
RULE: "REPEATED_WAF_INJECTION_BLOCKS"
CONDITION: count(WAF_BLOCK) > 20 within 1 MINUTE from same SourceIP
ACTION: Automatically add SourceIP to Cloud Perimeter Blocklist for 24 Hours`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via WAF Bypass Financial Attacks?",
    shortAnswer: "Dishonestly accessing, altering, or siphoning funds using WAF bypass exploits to deceive banking systems, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker bypasses perimeter WAF rules on a Kolkata payment portal to siphon ₹90 Lakhs from escrow accounts, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Financial Siphoning with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Bypassing perimeter WAF rules to siphon ₹90 Lakhs from corporate escrow accounts
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Clickjacking Defense (`frame-ancestors 'none'`)' vs Legacy `X-Frame-Options`?",
    shortAnswer: "`frame-ancestors 'none'` is the modern CSP directive that instructs the browser to never render the application inside an `<iframe>`, `<frame>`, or `<object>` on any website; it completely supersedes legacy `X-Frame-Options: DENY` and supports granular whitelisting of approved parent origins (`frame-ancestors https://partner.in`).",
    explanation: "Clickjacking transparently overlays a victim's logged-in banking portal under an attractive game. When the victim clicks 'Play', they accidentally click 'Confirm Wire Transfer'. `frame-ancestors 'none'` guarantees the browser refuses to render the page inside any frame.",
    hint: "Stopping outside websites from putting your web page inside an invisible frame to trick users into clicking buttons.",
    level: "moderate",
    codeExample: `// Modern Clickjacking Defense Header:
Content-Security-Policy: frame-ancestors 'none';
// Legacy Fallback Header:
X-Frame-Options: DENY`
  },
  {
    question: "What is 'CORP / COEP / COOP Cross-Origin Isolation Headers' in Modern Browser Security?",
    shortAnswer: "Cross-Origin Resource Policy (CORP), Cross-Origin Embedder Policy (COEP), and Cross-Origin Opener Policy (COOP) headers that isolate the browser's execution process and memory space, preventing Spectre/Meltdown side-channel attacks and cross-origin resource leakage.",
    explanation: "Setting `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` places the web page in a dedicated OS process, enabling high-resolution timers (`performance.now()`) and SharedArrayBuffers safely while preventing other browser tabs from inspecting process memory.",
    hint: "Advanced browser headers that isolate your website into its own separate memory bubble.",
    level: "expert",
    codeExample: `// Cross-Origin Isolation Headers:
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Resource-Policy: same-origin`
  },
  {
    question: "Synthesize the mathematical formulation of Dual-Perimeter Gating Function (G(R)), WAF Inspection Efficiency (W_eff), Content Security Policy Nonce Verification (CSP_eff), and Joint Exploitability Probability (P_exploit).",
    shortAnswer: "Let incoming request be R. Dual-perimeter gating evaluates G(R) = [ WAF(R) == PASS ] AND [ CSP(R) == VALID ]. Joint exploitability is P_exploit = (1 - D_code) * (1 - W_eff) * (1 - CSP_eff); when Parameterized Code (D_code = 1.0), WAF Anomaly Scoring (W_eff = 0.99), and Strict Nonce CSP (CSP_eff = 1.0) are combined, P_exploit = (1 - 1.0) * (1 - 0.99) * (1 - 1.0) = 0.00%, mathematically proving complete dual-perimeter immunity.",
    explanation: "Let the set of all incoming HTTP transactions be $\\mathcal{R}$. The WAF gating function $W: \\mathcal{R} \\to \\{0, 1\\}$ evaluates signature matches and anomaly scores against threshold $\\tau$: $W(R) = \\mathbf{1}_{\\{\\text{Score}(R) < \\tau\\}}$. The browser CSP gating function $C: \\mathcal{R} \\to \\{0, 1\\}$ evaluates cryptographic nonce equality: $C(R) = \\mathbf{1}_{\\{\\text{Nonce}(R) = K_{\\text{session}}\\}}$. The application code defense parameter is $D_{\\text{code}} \\in [0, 1]$ (where $1.0 = \\text{Prepared Statements}$). The joint probability of successful exploitation across all layers is: $P_{\\text{exploit}} = (1 - D_{\\text{code}}) \\times (1 - W_{\\text{eff}}) \\times (1 - \\text{CSP}_{\\text{eff}})$. When parameterized code and strict nonce CSP are enforced ($D_{\\text{code}} = 1.0, \\text{CSP}_{\\text{eff}} = 1.0$), $P_{\\text{exploit}} = 0.00\\%$, providing mathematical proof of complete dual-perimeter immunity.",
    hint: "Mathematical proof formula showing that combining Cloud WAF, Strict Nonce CSP, and Prepared Statements reduces joint exploitability to absolute zero (0.00%).",
    level: "expert",
    codeExample: `// Dual-Perimeter Mathematical Safety Proof:
// Unhardened System : D_code = 0.0, WAF = 0.0, CSP = 0.0 ➔ P_exploit = 100.0% (VULNERABLE!)
// WAF Filter Only   : W_eff = 0.95 ➔ P_exploit = 5.0% (WAF Bypass Residual Risk!)
// Full Dual-Perimeter: D_code = 1.0, W_eff = 0.99, CSP = 1.0 ➔ P_exploit = 0.00% (100% IMMUNE!)`
  }
];

export default questions;
