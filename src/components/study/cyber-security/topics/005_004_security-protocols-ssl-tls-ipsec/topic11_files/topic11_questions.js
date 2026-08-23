const questions = [
  {
    id: 1,
    question: "What is a 'Protocol Downgrade Attack' (Version Rollback Attack) in TLS?",
    shortAnswer: "An active Man-in-the-Middle (MitM) attack where an adversary tampers with the initial handshake messages (e.g., ClientHello) to falsely trick the client and server into negotiating an obsolete protocol version (e.g., SSL 3.0 / TLS 1.0) or weak export-grade ciphers (512-bit RSA/DH) that the attacker can easily break to decrypt session traffic.",
    explanation: "Because early versions of SSL/TLS did not authenticate the entire handshake exchange prior to the `Finished` message, attackers could intercept and modify cleartext handshake records.",
    hint: "An attacker alters the handshake to force the use of an older, broken protocol version.",
    level: "Basic",
    codeExample: `// Downgrade Attack Anatomy:
// Client (Supports TLS 1.3) ──[ClientHello: TLS 1.3]──> [ MitM Attacker ]
//                                                           | (Modifies header to SSL 3.0!)
//                                                           v
// Server ──[Accepts SSL 3.0 & weak CBC ciphers]────────────>`
  },
  {
    id: 2,
    question: "How does Moxie Marlinspike's 'SSLstrip' attack work against standard HTTP-to-HTTPS redirects?",
    shortAnswer: "When a user types `bank.com` into their browser, the browser sends an initial plaintext HTTP request. A MitM attacker on the local network (e.g., Wi-Fi ARP spoofing) intercepts the server's `301/302 Redirect to HTTPS`. The attacker opens a secure HTTPS session with the real server, but serves unencrypted HTTP back to the victim browser, intercepting passwords and session cookies in cleartext.",
    explanation: "To the victim, the website functions normally except the URL remains `http://` instead of `https://` (often with a fake favicon lock icon).",
    hint: "Intercepts HTTP-to-HTTPS redirects, proxying HTTPS to the server while keeping the user on plain HTTP.",
    level: "Basic",
    codeExample: `// SSLstrip Architecture:
// [ Victim Browser ] ──(Plain HTTP)──> [ Attacker (SSLstrip Proxy) ] ──(Encrypted HTTPS)──> [ Bank Server ]
// Result: Attacker sees plaintext passwords, credit card numbers, and session cookies!`
  },
  {
    id: 3,
    question: "What is HSTS (HTTP Strict Transport Security - RFC 6797), and what is the exact header syntax required for preloading?",
    shortAnswer: "HSTS is an HTTP response header that mandates that the browser must communicate with the domain exclusively over HTTPS for the specified `max-age` duration, automatically upgrading all `http://` links to `https://` internally without sending network packets. Preload syntax: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.",
    explanation: "Setting `max-age=31536000` (1 year), `includeSubDomains`, and `preload` enables submission to the global browser HSTS Preload List.",
    hint: "Forces browsers to use HTTPS only; syntax requires max-age, includeSubDomains, and preload.",
    level: "Basic",
    codeExample: `// Hardened HSTS Header in Nginx:
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;`
  },
  {
    id: 4,
    question: "What is the 'Trust On First Use' (TOFU) limitation of standard HSTS headers, and how does the HSTS Preload List eliminate it?",
    shortAnswer: "Under standard HSTS, a browser only learns of the policy AFTER receiving the header on its very first successful HTTPS response. If an attacker intercepts that very first connection on a new laptop (e.g., at a coffee shop Wi-Fi in Kolkata), they can perform SSLstrip before HSTS is ever cached. The HSTS Preload List hardcodes the domain directly into the browser binary (Chrome, Firefox, Safari), guaranteeing that even the very first connection is HTTPS.",
    explanation: "When visiting a preloaded domain, the browser performs an internal `307 Temporary Redirect` locally before transmitting any data over the network.",
    hint: "TOFU is vulnerable on the very first connection; the Preload list hardcodes HTTPS directly into browser binaries.",
    level: "Moderate",
    codeExample: `// Browser Network Tab for HSTS Preloaded Domain:
// Request: http://barrackpore.gov.in
// Status: 307 Internal Redirect (from disk cache)
// Location: https://barrackpore.gov.in (Zero bytes sent over cleartext Wi-Fi!)`
  },
  {
    id: 5,
    question: "What is the `TLS_FALLBACK_SCSV` (Signaling Cipher Suite Value - RFC 7507) and how does it prevent downgrade attacks?",
    shortAnswer: "`TLS_FALLBACK_SCSV` is a special pseudo-cipher suite (`0x5600`) included by a client in its `ClientHello` when retrying a connection after an unexpected handshake failure. If the server receives this value and supports a higher TLS version than the client is offering in the retry, the server detects an active downgrade attack and immediately aborts the connection with an `inappropriate_fallback` fatal alert (86).",
    explanation: "This eliminates the vulnerability where attackers deliberately severed TLS 1.3 handshakes to force clients into insecure legacy fallbacks.",
    hint: "A cipher suite indicator sent on retries; if the server supports a higher version, it rejects the downgrade.",
    level: "Expert",
    codeExample: `// TLS_FALLBACK_SCSV (RFC 7507) Logic:
// If ClientHello.version < Server.maximum_supported_version AND ClientHello contains TLS_FALLBACK_SCSV:
//   ➔ Send Alert: inappropriate_fallback (86) & Sever Connection!`
  },
  {
    id: 6,
    question: "What was the POODLE attack (CVE-2014-3566) and what protocol design flaw did it exploit?",
    shortAnswer: "POODLE exploited SSL 3.0's CBC mode cipher padding, which did not mandate deterministic padding bytes or MAC integrity verification over padding. Attackers forced browser connections to downgrade from TLS 1.2 to SSL 3.0, and by modifying ciphertext byte alignments, decrypted session cookies byte-by-byte in ~256 requests per byte.",
    explanation: "POODLE was the fatal blow that caused the complete industry-wide deprecation and removal of SSL 3.0 from all major web servers and browsers.",
    hint: "Exploited unverified CBC padding in SSL 3.0 to decrypt cookies after forcing a protocol downgrade.",
    level: "Moderate",
    codeExample: `// POODLE Attack Remediation (/etc/nginx/nginx.conf):
ssl_protocols TLSv1.2 TLSv1.3; # Prohibit SSLv3, TLS 1.0, and TLS 1.1 completely!`
  },
  {
    id: 7,
    question: "What was the FREAK attack (CVE-2015-0204) and what role did 1990s US cryptography export regulations play in it?",
    shortAnswer: "In the 1990s, US law mandated that software exported internationally could only use weak 512-bit RSA export keys (`RSA_EXPORT`). Decades later, servers still supported these export suites. FREAK allowed MitM attackers to downgrade modern handshakes to 512-bit RSA export keys, factor the weak modulus in hours on cloud servers, and forge server signatures to decrypt user traffic.",
    explanation: "FREAK demonstrated that legacy cryptographic backdoors and intentionally weakened ciphers remain dormant vulnerabilities that resurface decades later.",
    hint: "Forced servers to negotiate legacy 1990s 512-bit export RSA keys.",
    level: "Expert",
    codeExample: `// FREAK Remediation:
// Completely eliminate all EXPORT, DES, and RC4 cipher suites:
ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:!EXPORT:!aNULL:!eNULL:!RC4:!3DES';`
  },
  {
    id: 8,
    question: "What was the Logjam attack (CVE-2015-4000) and how did it exploit weak Diffie-Hellman parameters (`DHE_EXPORT`)?",
    shortAnswer: "Logjam downgraded TLS connections to 512-bit export-grade Diffie-Hellman (`DHE_EXPORT`). Because millions of servers shared the exact same standardized 512-bit prime modulus, attackers precomputed discrete logarithm discrete tables (Number Field Sieve), allowing near real-time decryption of TLS sessions.",
    explanation: "Logjam led to the deprecation of custom and export DH groups and mandated minimum 2048-bit Diffie-Hellman parameters or Elliptic Curve Diffie-Hellman (ECDHE Curve25519).",
    hint: "Precomputed discrete log tables for standardized 512-bit export Diffie-Hellman primes.",
    level: "Expert",
    codeExample: `// Generating Strong 4096-bit DH Parameters:
# openssl dhparam -out /etc/nginx/dhparam.pem 4096
// In Nginx:
ssl_dhparam /etc/nginx/dhparam.pem;`
  },
  {
    id: 9,
    question: "What is Certificate Authority Authorization (CAA - RFC 8659) and how does it prevent rogue CA certificate issuance?",
    shortAnswer: "CAA is a DNS Resource Record that specifies exactly which Certificate Authorities (e.g., Let's Encrypt, DigiCert) are authorized to issue SSL/TLS certificates for a domain name. All public Certificate Authorities are legally mandated to check CAA DNS records before issuing certificates.",
    explanation: "If an attacker compromises an obscure commercial CA in another country and attempts to issue a forged certificate for `barrackpore.gov.in`, the CA is required by CA/B Forum baseline requirements to check the CAA record, see that only `letsencrypt.org` is authorized, and refuse issuance.",
    hint: "A DNS record specifying which Certificate Authorities are allowed to issue certificates for your domain.",
    level: "Basic",
    codeExample: `// DNS CAA Record Configuration:
// barrackpore.gov.in. IN CAA 0 issue "letsencrypt.org"
// barrackpore.gov.in. IN CAA 0 issuewild ";" (Prohibits wildcard certificates!)
// barrackpore.gov.in. IN CAA 0 iodef "mailto:security-alerts@barrackpore.gov.in"`
  },
  {
    id: 10,
    question: "What is Certificate Transparency (CT - RFC 9162 / RFC 6962) and what is a Signed Certificate Timestamp (SCT)?",
    shortAnswer: "Certificate Transparency is an open, append-only, publicly auditable framework of Merkle Tree logs that records every single SSL/TLS certificate issued by public CAs. An SCT is cryptographic proof embedded inside a TLS certificate or handshake proving that the certificate was submitted to multiple independent CT logs before issuance.",
    explanation: "Browsers (Chrome, Safari) reject any TLS certificate that lacks valid SCTs, preventing rogue or government CAs from issuing secret surveillance certificates.",
    hint: "Public append-only logs recording all issued certificates; SCT proves a certificate was logged.",
    level: "Moderate",
    codeExample: `// Inspecting SCTs in OpenSSL:
# openssl s_client -connect treasury.barrackpore.gov.in:443 -tlsextdebug
// Output:
// TLS Extension: signed_certificate_timestamp (id=18)
// SCT: LogID=Cloudflare Nimbus2026, Timestamp=1724410800`
  },
  {
    id: 11,
    question: "What is Encrypted Client Hello (ECH) and what metadata privacy issue does it solve in modern TLS 1.3?",
    shortAnswer: "In standard TLS 1.3, the Server Name Indication (SNI) header in the `ClientHello` is transmitted in cleartext, leaking the exact domain name visited (e.g., `whistleblower.kolkata.gov.in`) to network eavesdroppers and ISPs. ECH encrypts the inner ClientHello (including SNI) using the server's public key published in DNS (HTTPS/SVCB records).",
    explanation: "ECH closes the last remaining plaintext metadata leak in modern web browsing, concealing user browsing destinations from ISP surveillance and network censors.",
    hint: "Encrypts the SNI header and ClientHello metadata using DNS-published public keys.",
    level: "Expert",
    codeExample: `// DNS HTTPS / SVCB Record for ECH:
// treasury.barrackpore.gov.in. IN HTTPS 1 . (
//   alpn="h2,h3" ech="AEX+DQBEBwAgAC... (Public Key for ECH Encryption)" )`
  },
  {
    id: 12,
    question: "What is the DROWN attack (CVE-2016-0800) and why did it affect modern TLS servers that reused RSA keys with legacy SSLv2 services?",
    shortAnswer: "DROWN exploited cross-protocol Bleichenbacher padding oracle attacks on servers supporting legacy SSLv2. Even if a web server used modern TLS 1.3, if its RSA private key was also used by an old SMTP/IMAP server supporting SSLv2, an attacker could probe the SSLv2 service to decrypt captured TLS 1.3 sessions.",
    explanation: "DROWN proved that private key reuse across different protocols or servers is extremely dangerous.",
    hint: "Cross-protocol attack: an SSLv2 service sharing the same private key compromised modern TLS traffic.",
    level: "Expert",
    codeExample: `// DROWN Attack Remediation:
// 1. Disable SSLv2 globally across ALL servers (Web, Mail, VPN)
// 2. Never share RSA private keys between different network services!`
  },
  {
    id: 13,
    question: "What is the purpose of the `includeSubDomains` directive in the HSTS header, and what operational risk must administrators evaluate before adding it?",
    shortAnswer: "`includeSubDomains` applies the strict HTTPS enforcement to all current and future subdomains (e.g., `*.barrackpore.gov.in`). The risk is that if any internal legacy subdomain (e.g., `legacy-payroll.barrackpore.gov.in` or `router.corp.barrackpore.gov.in`) lacks a valid SSL certificate or runs on plain HTTP, all users will be permanently blocked from accessing it.",
    explanation: "Before adding `includeSubDomains`, administrators must audit all DNS subdomains across the organization to guarantee complete HTTPS coverage.",
    hint: "Applies HSTS to all subdomains; will break any legacy internal subdomains lacking HTTPS certificates.",
    level: "Moderate",
    codeExample: `// Strict HSTS with Subdomains:
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  },
  {
    id: 14,
    question: "How does the `Content-Security-Policy` (CSP) header prevent Cross-Site Scripting (XSS) and data exfiltration?",
    shortAnswer: "CSP restricts the origins from which scripts, stylesheets, images, and network requests (`fetch`/`XHR`) can be loaded, and disables execution of inline `<script>` tags and `eval()`. Even if an attacker injects a malicious script tag into a comment, the browser refuses to execute it unless it matches the authorized CSP policy.",
    explanation: "A robust CSP is the single most effective defense-in-depth mitigation against stored and reflected XSS attacks.",
    hint: "A whitelist header dictating what scripts, styles, and external connections a browser is allowed to execute.",
    level: "Basic",
    codeExample: `// Hardened CSP Header:
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.gov.in; object-src 'none'; base-uri 'self';`
  },
  {
    id: 15,
    question: "What is the `X-Content-Type-Options: nosniff` header and what vulnerability does it mitigate?",
    shortAnswer: "It prevents browsers from performing 'MIME-type sniffing' (guessing the content type of a response). If a server returns an uploaded user image as `image/jpeg`, but it contains malicious JavaScript, a sniffing browser might execute it as `text/javascript`. `nosniff` forces the browser to adhere strictly to the declared `Content-Type` header.",
    explanation: "This stops attackers from executing uploaded user avatar files as malicious scripts.",
    hint: "Prevents browsers from MIME-sniffing files and executing image uploads as scripts.",
    level: "Basic",
    codeExample: `// Nginx Configuration:
add_header X-Content-Type-Options "nosniff" always;`
  },
  {
    id: 16,
    question: "What is the `X-Frame-Options` header and what is its modern replacement in Content Security Policy?",
    shortAnswer: "`X-Frame-Options: DENY` (or `SAMEORIGIN`) prevents the website from being embedded inside an `<iframe>` on another third-party site, mitigating Clickjacking attacks. In modern CSP, it is superseded by the `frame-ancestors 'none'` (or `frame-ancestors 'self'`) directive.",
    explanation: "Clickjacking lures users into clicking invisible buttons overlaid on legitimate pages (such as triggering an unauthorized bank transfer).",
    hint: "Prevents clickjacking by blocking iframe embedding; replaced by CSP frame-ancestors.",
    level: "Basic",
    codeExample: `// Modern Clickjacking Defense in CSP:
Content-Security-Policy: frame-ancestors 'none';
// Legacy Fallback:
X-Frame-Options: DENY`
  },
  {
    id: 17,
    question: "What is the `Referrer-Policy` header and why should it be set to `strict-origin-when-cross-origin`?",
    shortAnswer: "It controls how much referrer information (the URL of the page where the user clicked a link) is sent in the `Referer` request header. `strict-origin-when-cross-origin` sends the full URL for same-origin requests, but sends only the domain origin (e.g., `https://barrackpore.gov.in/`) for cross-origin HTTPS requests, and sends zero referrer data when downgrading to plain HTTP.",
    explanation: "This prevents sensitive URL query parameters (like password reset tokens or session IDs) from leaking to third-party analytics trackers.",
    hint: "Protects sensitive URL query parameters from leaking to external websites in Referer headers.",
    level: "Moderate",
    codeExample: `// Hardened Referrer Policy:
add_header Referrer-Policy "strict-origin-when-cross-origin" always;`
  },
  {
    id: 18,
    question: "What is the `Permissions-Policy` (formerly `Feature-Policy`) HTTP header?",
    shortAnswer: "An HTTP header that explicitly allows or disables browser hardware features and APIs (such as Camera, Microphone, Geolocation, USB, and Payment Request) for the document and embedded iframes.",
    explanation: "Setting `Permissions-Policy: camera=(), microphone=(), geolocation=()` guarantees that even if a malicious script executes, it cannot access the user's webcam or microphone.",
    hint: "Disables browser hardware APIs like camera, microphone, and geolocation.",
    level: "Moderate",
    codeExample: `// Permissions-Policy Header:
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
  },
  {
    id: 19,
    question: "Why did TLS 1.3 completely remove cipher negotiation for asymmetric key exchange and symmetric cipher mode?",
    shortAnswer: "In TLS 1.2, cipher suites were complex combinations (e.g., `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384`), allowing attackers to mix and match weak components (like static RSA key exchange or CBC mode). TLS 1.3 separates key exchange (fixed to ephemeral ECDHE/DHE) from symmetric AEAD ciphers (only AES-GCM, ChaCha20-Poly1305, AES-CCM), eliminating all insecure combinations.",
    explanation: "This architectural overhaul permanently eliminates entire classes of downgrade and padding oracle vulnerabilities.",
    hint: "TLS 1.3 eliminated weak combinations by separating key exchange from AEAD encryption.",
    level: "Expert",
    codeExample: `// Modern TLS 1.3 Cipher Suites (Only 5 Safe AEAD Suites Exist!):
// TLS_AES_256_GCM_SHA384
// TLS_CHACHA20_POLY1305_SHA256
// TLS_AES_128_GCM_SHA256
// TLS_AES_128_CCM_SHA256
// TLS_AES_128_CCM_8_SHA256`
  },
  {
    id: 20,
    question: "What is an 'HSTS Supercookie' tracking attack and how do modern privacy browsers mitigate it?",
    shortAnswer: "Ad networks abuse HSTS state across multiple subdomains (`a.tracker.com`, `b.tracker.com`) as binary bits (1 = HSTS set, 0 = HSTS not set) to assign a persistent tracking fingerprint to users across incognito sessions. Browsers mitigate this by partitioning HSTS state per top-level site (State Partitioning / Network Partitioning).",
    explanation: "Partitioning ensures that HSTS cache on `siteA.com` cannot be read or probed when the user visits `siteB.com`.",
    hint: "Abusing HSTS cache bits to fingerprint and track users across websites; mitigated by site partitioning.",
    level: "Expert",
    codeExample: `// HSTS Partitioning Architecture:
// Chrome & Firefox isolate HSTS cache per (Top-Level Site, Subdomain) tuple, preventing cross-site tracking.`
  },
  {
    id: 21,
    question: "What is the BEAST attack (CVE-2011-3389) and how did it exploit predictable Initialization Vectors (IVs) in TLS 1.0 CBC mode?",
    shortAnswer: "In TLS 1.0 CBC mode, the IV for record $N$ was the last ciphertext block of record $N-1$ (predictable chaining). Attackers used adaptive chosen-plaintext injection in browsers to decrypt session cookies. The mitigation was moving to TLS 1.1/1.2 (explicit random IV per record) or 1/n-1 record splitting.",
    explanation: "BEAST highlighted the danger of stateful IV chaining across independent transport records.",
    hint: "Exploited predictable CBC IV chaining in TLS 1.0; fixed in TLS 1.1+ with explicit per-record IVs.",
    level: "Expert",
    codeExample: `// BEAST Attack Mitigation:
// Mandate TLS 1.2 and TLS 1.3 exclusively:
ssl_protocols TLSv1.2 TLSv1.3;`
  },
  {
    id: 22,
    question: "What is the `Cross-Origin-Opener-Policy` (COOP) and `Cross-Origin-Embedder-Policy` (COEP) headers?",
    shortAnswer: "COOP and COEP isolate a web document into its own separate OS process and restrict cross-origin resource loading, protecting sensitive memory against CPU speculative execution side-channel attacks like Spectre and enabling high-precision timers (`SharedArrayBuffer`).",
    explanation: "These modern hardening headers prevent malicious pages from opening a popup of your banking portal and snooping on memory through CPU cache timing.",
    hint: "Isolates processes to defend against Spectre CPU side-channel cache attacks.",
    level: "Expert",
    codeExample: `// Process Isolation Headers:
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp`
  },
  {
    id: 23,
    question: "What is the Qualys SSL Labs rating system and what criteria are required to achieve an 'A+' grade?",
    shortAnswer: "To achieve an A+ grade: 1. Support TLS 1.2 and TLS 1.3 exclusively; 2. No support for SSLv2, SSLv3, TLS 1.0, TLS 1.1; 3. Only secure AEAD cipher suites (disable CBC, 3DES, RC4); 4. Enforce HSTS with `max-age` >= 6 months (`15768000`); 5. Full certificate chain with trusted root CA and no weak SHA-1 signatures.",
    explanation: "Security teams in Barrackpore and Kolkata use SSL Labs (`ssllabs.com/ssltest/`) to verify compliance before deploying production portals.",
    hint: "Qualys SSL Labs test; requires TLS 1.2/1.3 only, AEAD ciphers, and strict HSTS for A+.",
    level: "Basic",
    codeExample: `// Target Score for Enterprise Gateways:
// Grade: A+ (100% Certificate, 90% Protocol Support, 90% Key Exchange, 90% Cipher Strength)`
  },
  {
    id: 24,
    question: "How can an administrator test whether a server supports legacy insecure protocols using the `openssl` command-line tool?",
    shortAnswer: "By running `openssl s_client -connect domain.com:443 -tls1_1` or `-ssl3`. If the handshake succeeds, the server is vulnerable; if it outputs `handshake failure` or `no protocols available`, the legacy protocol is correctly disabled.",
    explanation: "This command-line check is standard in automated CI/CD security audit pipelines.",
    hint: "Use openssl s_client -connect domain:443 -tls1_1 to test if legacy protocols are accepted.",
    level: "Basic",
    codeExample: `// Testing Insecure Protocols:
# openssl s_client -connect treasury.barrackpore.gov.in:443 -tls1
// Correct Hardened Output:
// 140211:error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version (REJECTED! ✔)`
  },
  {
    id: 25,
    question: "What is the `CRIME` (Compression Ratio Info-leak Made Easy - CVE-2012-4929) attack and why is TLS-level compression permanently disabled?",
    shortAnswer: "CRIME exploited DEFLATE data compression at the TLS record layer. By injecting guessed cookie characters into HTTP requests and measuring the size of the resulting compressed ciphertext, attackers decrypted secret session cookies byte-by-byte. The mitigation was permanently disabling TLS compression (`ssl_session_tickets` / `SSL_OP_NO_COMPRESSION`).",
    explanation: "Any compression of secrets alongside attacker-controlled input creates a side-channel size oracle.",
    hint: "Measured compressed ciphertext size to decrypt cookies; fixed by disabling TLS compression.",
    level: "Expert",
    codeExample: `// Prohibiting TLS Compression in Nginx:
// (Disabled by default in all modern OpenSSL / Nginx versions)`
  },
  {
    id: 26,
    question: "What is the `BREACH` attack (CVE-2013-3587) and how does it differ from CRIME?",
    shortAnswer: "While CRIME exploited compression at the TLS transport layer, BREACH exploits HTTP-level response body compression (gzip/brotli). Attackers observe compressed HTTP response sizes to extract CSRF tokens and secret data embedded in HTML. Mitigations include masking CSRF tokens with random per-request XOR pads and separating secrets from user-reflected inputs.",
    explanation: "Because disabling HTTP gzip damages performance, application-level secret masking is used to defeat BREACH.",
    hint: "Exploits HTTP gzip body compression rather than TLS compression.",
    level: "Expert",
    codeExample: `// Django / Framework Mitigation for BREACH:
// Django automatically XOR-masks CSRF tokens in HTML forms so lengths vary randomly on every request.`
  },
  {
    id: 27,
    question: "What is the `iodef` parameter in a DNS CAA record?",
    shortAnswer: "`iodef` (Incident Object Description Exchange Format) specifies an email address or reporting URL where Certificate Authorities must send real-time forensic alerts if someone attempts to request an unauthorized SSL certificate for the domain.",
    explanation: "This provides instant threat intelligence if a malicious actor or compromised insider attempts to generate shadow certificates for your organization.",
    hint: "Specifies an incident reporting email/URL for unauthorized certificate request alerts in CAA records.",
    level: "Moderate",
    codeExample: `// CAA Incident Reporting Parameter:
// barrackpore.gov.in. IN CAA 0 iodef "mailto:soc-alerts@barrackpore.gov.in"`
  },
  {
    id: 28,
    question: "Why should administrators set `X-XSS-Protection: 0` in modern web application headers?",
    shortAnswer: "Legacy browser XSS auditors (e.g., in older Chrome/IE) were flawed and introduced new client-side security vulnerabilities and cross-site data leaks. Modern standards recommend disabling the legacy auditor (`X-XSS-Protection: 0`) in favor of a strong Content Security Policy (`Content-Security-Policy`).",
    explanation: "OWASP and the W3C now recommend `X-XSS-Protection: 0` because legacy heuristic filters caused more harm than good.",
    hint: "Legacy XSS filters introduced new vulnerabilities; modern standard is CSP with X-XSS-Protection: 0.",
    level: "Moderate",
    codeExample: `// Modern OWASP Recommended Setting:
add_header X-XSS-Protection "0" always;`
  },
  {
    id: 29,
    question: "What is the `testssl.sh` command-line utility and what vulnerabilities does it audit?",
    shortAnswer: "`testssl.sh` is a comprehensive open-source command-line tool that tests any TLS/SSL service on any port for supported cipher suites, protocol versions, certificate validity, and vulnerabilities including POODLE, Heartbleed, FREAK, Logjam, DROWN, ROBOT, CRIME, BREACH, and Lucky13.",
    explanation: "It allows offline, private scanning of internal datacenters and air-gapped defense networks in Ichapur without sending queries to third-party public testing websites.",
    hint: "A command-line script to audit SSL/TLS cipher suites and test for known vulnerabilities like POODLE and Heartbleed.",
    level: "Basic",
    codeExample: `// Running testssl.sh Audit:
# ./testssl.sh --full https://treasury.barrackpore.gov.in`
  },
  {
    id: 30,
    question: "What are the primary troubleshooting steps if an administrator accidentally deploys HSTS with `includeSubDomains` and breaks an internal legacy subdomain?",
    shortAnswer: "1. Immediately issue a valid HTTPS certificate (e.g., Let's Encrypt / Internal Enterprise CA) for the broken subdomain; 2. Temporarily reduce `max-age=0` in the main domain's HSTS header to clear the cache for future visitors; 3. Note that users who already cached the 1-year HSTS header cannot be reset remotely and must manually clear their browser HSTS cache (`chrome://net-internals/#hsts`).",
    explanation: "This scenario highlights why administrators must gradually ramp up HSTS `max-age` (e.g., 5 minutes ➔ 1 day ➔ 1 month ➔ 1 year) during initial deployment testing.",
    hint: "Deploy HTTPS on the broken subdomain; reduce max-age to 0; users must clear chrome://net-internals/#hsts.",
    level: "Expert",
    codeExample: `// Clearing HSTS Cache in Chrome:
// 1. Browse to: chrome://net-internals/#hsts
// 2. Under 'Delete domain security policies', enter: barrackpore.gov.in ➔ Click Delete`
  }
];

export default questions;
