const questions = [
  {
    id: 1,
    question: "What is the architectural difference between HTTP (Port 80) and HTTPS (Port 443)?",
    shortAnswer: "HTTP transmits application data in unencrypted plaintext over TCP Port 80; HTTPS layers standard HTTP over an encrypted Transport Layer Security (TLS) tunnel on TCP Port 443.",
    explanation: "HTTPS (RFC 2818 / RFC 9110) is not a separate application protocol; it is standard HTTP executed inside a secure TLS socket. All HTTP request headers, query parameters, cookies, and response payloads are 100% encrypted before transmission.",
    hint: "HTTP is cleartext on Port 80; HTTPS is HTTP inside an encrypted TLS tunnel on Port 443.",
    level: "Basic",
    codeExample: `// Protocol Stack Comparison:
// HTTP  : [Ethernet] ➔ [IP] ➔ [TCP Port 80 ] ➔ [Plaintext HTTP Data (EXPOSED!)]
// HTTPS : [Ethernet] ➔ [IP] ➔ [TCP Port 443] ➔ [TLS 1.3 Record (AEAD Encrypted)] ➔ [HTTP Data]`
  },
  {
    id: 2,
    question: "What specific HTTP data is encrypted by HTTPS versus what metadata remains visible to ISPs and network observers?",
    shortAnswer: "Encrypted: Full Request URL path, Query Parameters (`?account=123`), HTTP Headers (Cookies, Authorization tokens), Request Body (Passwords, JSON), and Response Body (HTML, PDFs); Visible: Destination IP Address, Port 443, SNI Domain Name (unless ECH is active), and Packet Lengths/Timestamps.",
    explanation: "An ISP or public Wi-Fi sniffer sees that you connected to IP `203.0.113.10` on Port 443 for domain `bank.gov.in`. However, they cannot see what specific webpage you visited (`/api/v1/transfer`), what your session cookies are, or what data was transferred.",
    hint: "The post office sees the destination city and building address on the envelope, but cannot read the letter inside.",
    level: "Basic",
    codeExample: `// HTTPS Visibility Breakdown:
// Visible to ISP   : IP: 203.0.113.10, Port: 443, SNI: "treasury.barrackpore.gov.in"
// Encrypted / Hidden: Path: "/disburse/5000000", Cookie: "session_id=88af", JSON Payload`
  },
  {
    id: 3,
    question: "What are the four sequential steps in the browser X.509 Certificate Validation Pipeline?",
    shortAnswer: "1. Signature Chain Verification (Validating digital signatures up to a trusted Root CA in the OS trust store); 2. Hostname Matching (Matching the URL domain against Subject Alternative Name [SAN]); 3. Validity Period Check (Confirming current time is between `NotBefore` and `NotAfter`); 4. Revocation Check (Querying OCSP / CRL).",
    explanation: "If any of these four checks fail, the browser halts connection establishment immediately and displays a prominent security warning, preventing Man-in-the-Middle certificate spoofing.",
    hint: "Signature chain ➔ Hostname SAN ➔ Date validity ➔ Revocation check.",
    level: "Basic",
    codeExample: `// 4-Step Certificate Validation:
// [1] Verify Signature: Leaf Cert signed by Intermediate CA ➔ signed by Trusted Root CA ✔
// [2] Verify Hostname : URL "bank.barrackpore.gov.in" found in SAN list ✔
// [3] Verify Dates    : NotBefore <= CurrentDate <= NotAfter ✔
// [4] Verify Status   : OCSP response confirms certificate is ACTIVE (Not Revoked) ✔`
  },
  {
    id: 4,
    question: "Why has the 'Subject Alternative Name' (SAN) extension completely replaced the legacy 'Common Name' (CN) in modern HTTPS certificates?",
    shortAnswer: "The legacy Common Name (CN) allowed only a single domain name and had ambiguous syntax parsing rules; the SAN extension allows specifying multiple fully qualified domain names (FQDNs), wildcards (`*.barrackpore.gov.in`), and IP addresses securely.",
    explanation: "RFC 6125 and modern browsers (Chrome, Firefox, Safari) mandate checking the `subjectAltName` extension exclusively. If a certificate only contains a Common Name without SAN entries, modern browsers reject the certificate with `ERR_CERT_COMMON_NAME_INVALID`.",
    hint: "SAN allows multiple domains on a single certificate and is required by all modern web browsers.",
    level: "Moderate",
    codeExample: `// X.509 SAN Extension Example:
// X509v3 Subject Alternative Name:
//   DNS:treasury.barrackpore.gov.in
//   DNS:bank.barrackpore.gov.in
//   DNS:*.internal.barrackpore.gov.in`
  },
  {
    id: 5,
    question: "What is an 'SSL Stripping' attack (`sslstrip`) and how does an attacker execute it on public Wi-Fi?",
    shortAnswer: "An active Man-in-the-Middle attack where the adversary intercepts the victim's initial unencrypted HTTP request, establishes an HTTPS connection to the real server on the victim's behalf, and serves cleartext HTTP back to the victim's browser, stripping all encryption.",
    explanation: "Because users frequently type `bank.com` instead of `https://bank.com`, the browser first sends an unencrypted HTTP request expecting a 301 redirect to HTTPS. An attacker on the local Wi-Fi intercepts this 301 redirect and proxies the traffic, keeping the victim on cleartext HTTP while stealing passwords.",
    hint: "Stealing the lock off the door before the user notices, keeping the connection in cleartext.",
    level: "Moderate",
    codeExample: `// SSL Stripping Flow (Moxie Marlinspike sslstrip):
// Victim ──(HTTP Port 80)──> Attacker (MitmProxy) ──(HTTPS Port 443)──> Real Bank Server
// Attacker steals passwords in cleartext from Victim while speaking HTTPS to Bank!`
  },
  {
    id: 6,
    question: "What is 'HTTP Strict Transport Security' (HSTS - RFC 6797) and how does its header enforce HTTPS?",
    shortAnswer: "HSTS is a response header sent by the web server instructing browsers to NEVER connect over cleartext HTTP and to automatically upgrade all future requests to HTTPS locally for a specified duration (`max-age=31536000`).",
    explanation: "When a browser receives the `Strict-Transport-Security` header, it records that domain in its internal HSTS cache. For the next year (`31536000` seconds), if the user types `http://bank.com`, the browser automatically rewrites the URL to `https://bank.com` locally before sending a single network packet.",
    hint: "A permanent browser rule telling your computer: 'Never open this site without HTTPS encryption.'",
    level: "Basic",
    codeExample: `// Full HSTS Hardening Header:
// Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  },
  {
    id: 7,
    question: "Why does standard HSTS leave a 'First-Visit Vulnerability Window' and how does 'HSTS Preloading' solve it?",
    shortAnswer: "Standard HSTS is only learned AFTER the browser successfully connects over HTTPS for the first time; if an attacker intercepts the very first visit on public Wi-Fi, they can strip HSTS; HSTS Preloading hardcodes the domain directly into the browser source code, protecting the very first visit.",
    explanation: "The Google Chrome HSTS Preload List (shared by Firefox, Safari, and Edge) contains thousands of domains hardcoded into the browser binary. When a user installs the browser, it ALREADY knows that `treasury.barrackpore.gov.in` requires HTTPS, completely eliminating the first-visit vulnerability window.",
    hint: "Hardcoding the HTTPS-only rule inside the browser software before the user ever types the domain.",
    level: "Moderate",
    codeExample: `// HSTS Preload Submission Requirements:
// 1. Valid X.509 Certificate on root and all subdomains.
// 2. Redirect HTTP to HTTPS on Port 80.
// 3. Serve header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
// 4. Submit domain at https://hstspreload.org`
  },
  {
    id: 8,
    question: "What is the difference between 'Active Mixed Content' and 'Passive Mixed Content' in HTTPS websites?",
    shortAnswer: "Active Mixed Content involves unencrypted HTTP executable resources (JavaScript `<script>`, `<link>` CSS, `<iframe>`) and is blocked completely by modern browsers; Passive Mixed Content involves unencrypted media (`<img>`, `<audio>`) and causes degraded broken-padlock warnings.",
    explanation: "Loading an unencrypted JavaScript file over HTTP on an HTTPS page allows an active attacker to inject malicious code (e.g., keyloggers or session stealers) into the secure DOM. Consequently, browsers enforce a strict block on all active mixed content.",
    hint: "Active mixed content (scripts) can hijack your page and is blocked; Passive mixed content (images) only shows a warning.",
    level: "Moderate",
    codeExample: `// Mixed Content Examples:
// ❌ Active Mixed Content  : <script src="http://cdn.example.com/app.js"></script> ➔ BLOCKED BY BROWSER!
// ⚠️ Passive Mixed Content : <img src="http://cdn.example.com/logo.png"> ➔ Padlock Warning Displayed`
  },
  {
    id: 9,
    question: "What is 'DNS Certification Authority Authorization' (CAA - RFC 8659) and how does it prevent rogue certificate issuance?",
    shortAnswer: "A DNS record published by the domain owner specifying which exact Certificate Authorities (CAs) are legally permitted to issue certificates for that domain; all public CAs are mandated to query CAA records before signing certificates.",
    explanation: "If an enterprise in Barrackpore purchases certificates exclusively from DigiCert, an attacker who compromises a small foreign CA cannot generate a fake certificate for `barrackpore.gov.in`. When the rogue CA checks DNS, it sees the CAA record restricting issuance to DigiCert and must refuse the request.",
    hint: "A DNS policy that tells all global Certificate Authorities: 'Only DigiCert is allowed to issue certificates for my website.'",
    level: "Moderate",
    codeExample: `// DNS CAA Record Configuration (RFC 8659):
// barrackpore.gov.in. IN CAA 0 issue "digicert.com"
// barrackpore.gov.in. IN CAA 0 issuewild "digicert.com"
// barrackpore.gov.in. IN CAA 0 iodef "mailto:soc@barrackpore.gov.in"`
  },
  {
    id: 10,
    question: "What is 'Certificate Transparency' (CT - RFC 6962) and how does it detect compromised or rogue CAs?",
    shortAnswer: "A publicly auditable, append-only Merkle tree logging system where Certificate Authorities MUST publish every issued certificate; domain owners monitor CT logs to detect unauthorized or rogue certificates within minutes.",
    explanation: "Historically, when CAs were breached (such as DigiNotar in 2011), attackers generated fake certificates for Google and Microsoft undetected for months. With Certificate Transparency, browsers reject any certificate that lacks cryptographic Signed Certificate Timestamps (SCTs) proving it was logged in public CT ledgers.",
    hint: "A public, unalterable registry where all newly minted security certificates must be recorded publicly.",
    level: "Moderate",
    codeExample: `// Certificate Transparency Verification:
// Browser checks X.509 Extension: 'Signed Certificate Timestamp List' (SCT)
// If Certificate is NOT logged in at least 2 public CT logs ➔ BROWSER REJECTS CONNECTION!`
  },
  {
    id: 11,
    question: "What is the 'ACME Protocol' (RFC 8555) and how does it automate certificate issuance in Let's Encrypt?",
    shortAnswer: "Automated Certificate Management Environment (ACME) is an automated protocol where an agent (like Certbot) proves domain control via challenge-response (HTTP-01 or DNS-01) and receives signed X.509 certificates automatically without human intervention.",
    explanation: "ACME replaced slow, manual certificate requests. The ACME client generates a private key, requests a challenge from the CA (e.g., hosting a secret token at `/.well-known/acme-challenge/`), the CA verifies the token over the internet, and issues a signed certificate in under 10 seconds.",
    hint: "An automated software bot (Certbot) that renews and installs free SSL certificates automatically every 60 days.",
    level: "Basic",
    codeExample: `// Certbot ACME Command:
$ certbot certonly --nginx -d treasury.barrackpore.gov.in
// Automatically validates HTTP-01 challenge, fetches cert, and configures NGINX in seconds!`
  },
  {
    id: 12,
    question: "What is the difference between an 'HTTP-01 Challenge' and a 'DNS-01 Challenge' in the ACME Protocol?",
    shortAnswer: "HTTP-01 proves domain control by serving a secret cryptographic token over HTTP on Port 80 (`http://domain.com/.well-known/acme-challenge/<token>`); DNS-01 proves control by provisioning a DNS TXT record (`_acme-challenge.domain.com`), which is required for wildcard certificates (`*.domain.com`).",
    explanation: "HTTP-01 is simple for single web servers with open Port 80 access. DNS-01 requires API access to the DNS provider but works for internal servers behind firewalls and is mandatory for issuing wildcard certificates.",
    hint: "HTTP-01 places a secret file on the web server; DNS-01 places a secret code in your DNS records (required for wildcards).",
    level: "Moderate",
    codeExample: `// DNS-01 Challenge TXT Record:
// _acme-challenge.barrackpore.gov.in. IN TXT "9B3D44AE77FA90125566AABBCCDD"`
  },
  {
    id: 13,
    question: "What is 'OCSP Stapling' and how does it resolve the privacy and performance issues of standard OCSP lookups?",
    shortAnswer: "The web server periodically queries the CA's OCSP responder, caches the cryptographically signed revocation proof, and 'staples' it directly inside the TLS `Certificate` handshake message, saving the client an extra DNS/HTTP lookup and preventing the CA from tracking user browsing history.",
    explanation: "In standard OCSP, the client browser contacts the CA directly on every website visit, leaking user browsing habits to the CA and adding 100ms+ of latency. OCSP Stapling delivers the CA's signed validity statement directly in the TLS handshake with zero latency and complete privacy.",
    hint: "The server pre-fetches its own signed proof of certificate validity and delivers it directly to your browser.",
    level: "Moderate",
    codeExample: `// NGINX OCSP Stapling Configuration:
// ssl_stapling on;
// ssl_stapling_verify on;
// ssl_trusted_certificate /etc/ssl/ca_bundle.crt;
// resolver 8.8.8.8 1.1.1.1 valid=300s;`
  },
  {
    id: 14,
    question: "What are the three validation levels of X.509 Certificates: DV, OV, and EV?",
    shortAnswer: "Domain Validated (DV - verifies domain control only via automated email/DNS); Organization Validated (OV - verifies business legal identity through registry documents); Extended Validation (EV - rigorous legal and physical identity verification).",
    explanation: "All three certificate types provide the exact same mathematical 256-bit encryption strength. The difference is the level of real-world vetting performed by the CA before issuance. Modern browsers display standard padlocks for all three types without green address bars.",
    hint: "DV checks domain ownership; OV checks company registration; EV performs deep legal verification.",
    level: "Basic",
    codeExample: `// Certificate Validation Types:
// DV (Domain Validated)       ➔ Automated (Let's Encrypt / 5 minutes)
// OV (Organization Validated) ➔ Company registration verified (1-2 days)
// EV (Extended Validation)    ➔ Deep legal & physical verification (3-5 days)`
  },
  {
    id: 15,
    question: "How does the 'Content-Security-Policy' (CSP) header protect HTTPS applications against Cross-Site Scripting (XSS)?",
    shortAnswer: "By restricting the specific sources (domains, hashes, or nonces) from which browsers are allowed to load and execute scripts, stylesheets, images, and fonts, blocking unauthorized injected attacker scripts.",
    explanation: "Even over HTTPS, if a web page has an XSS flaw, attackers can inject `<script src='http://evil.com/hook.js'>`. A strict CSP header (`default-src 'self'; script-src 'self' https://trusted-cdn.com`) instructs the browser to refuse execution of any script originating from untrusted domains.",
    hint: "A whitelist of approved sources that tells the browser where it is allowed to download scripts and images from.",
    level: "Moderate",
    codeExample: `// Strict Content-Security-Policy Header:
// Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m123'; object-src 'none'; base-uri 'self';`
  },
  {
    id: 16,
    question: "What is the purpose of the 'X-Content-Type-Options: nosniff' header?",
    shortAnswer: "It prevents browsers from performing MIME-type sniffing, forcing the browser to adhere strictly to the MIME type declared in the `Content-Type` header and blocking attacks where executable scripts are disguised as images.",
    explanation: "Without `nosniff`, if a user uploads a malicious JavaScript file named `avatar.jpg`, older browsers might inspect the file contents, detect JavaScript code, and execute it in the context of the user's session. `nosniff` eliminates this vulnerability.",
    hint: "Telling the browser: 'Never guess file types; if the server says it is an image, never execute it as a script.'",
    level: "Basic",
    codeExample: `// MIME Sniffing Defense Header:
// X-Content-Type-Options: nosniff`
  },
  {
    id: 17,
    question: "How does the 'Referrer-Policy' header prevent sensitive URL query parameter leakage to external third parties?",
    shortAnswer: "By controlling how much referrer information (the URL of the previous page) is sent in the `Referer` request header when navigating from an HTTPS page to external sites.",
    explanation: "If a user is on `https://bank.gov.in/reset_password?token=secret123` and clicks an external link to `https://analytics.com`, without a strict referrer policy, the full URL (including the reset token) is sent in the `Referer` header. Setting `Referrer-Policy: strict-origin-when-cross-origin` sends only the root domain (`https://bank.gov.in`).",
    hint: "Hiding sensitive password reset tokens in URL links when leaving your website.",
    level: "Moderate",
    codeExample: `// Recommended Referrer Policy Header:
// Referrer-Policy: strict-origin-when-cross-origin`
  },
  {
    id: 18,
    question: "Why was 'HTTP Public Key Pinning' (HPKP - RFC 7469) deprecated and removed from modern browsers?",
    shortAnswer: "HPKP allowed web servers to hardcode cryptographic public key fingerprints in browsers; however, configuration mistakes or lost backup keys permanently locked legitimate operators out of their own websites ('HPKP Suicide') or allowed ransomware hijacking.",
    explanation: "HPKP was too unforgiving: if an administrator lost their backup private key, returning users could not access the site for months. The web ecosystem replaced HPKP with Certificate Transparency (CT) and DNS CAA records, which provide rogue CA defense without catastrophic lockout risks.",
    hint: "HPKP was so dangerous that losing your backup key permanently broke your website for all users.",
    level: "Expert",
    codeExample: `// Deprecated HPKP vs Modern Defense:
// ❌ HPKP (Public Key Pinning) ➔ High risk of permanent self-inflicted website bricking!
// ✔ DNS CAA + Certificate Transparency ➔ Safe, automated rogue CA prevention.`
  },
  {
    id: 19,
    question: "How do you inspect the full X.509 certificate chain of a remote HTTPS server using the OpenSSL CLI?",
    shortAnswer: "Run `openssl s_client -connect <host>:443 -showcerts -servername <host>` to display all certificates in the chain (Leaf, Intermediate, Root) in PEM format.",
    explanation: "This command establishes a TLS connection and outputs the raw base64-encoded certificates. You can pipe the output to `openssl x509 -text -noout` to inspect validity dates, issuer information, SAN domain lists, and public key parameters.",
    hint: "Using openssl s_client with -showcerts to view the entire certificate chain in the terminal.",
    level: "Basic",
    codeExample: `// Dumping and Inspecting Server Certificate:
$ openssl s_client -connect treasury.barrackpore.gov.in:443 -showcerts | openssl x509 -text -noout`
  },
  {
    id: 20,
    question: "What is 'Encrypted Client Hello' (ECH) and how does it close the last cleartext metadata gap in HTTPS?",
    shortAnswer: "ECH encrypts the `ClientHello` message (including the Server Name Indication [SNI] domain) using a public key published in the domain's DNS HTTPS resource record, preventing ISPs from seeing which specific domain a user is visiting.",
    explanation: "With standard HTTPS, even though the webpage content is encrypted, the ISP can still see `treasury.barrackpore.gov.in` in the plaintext SNI extension. ECH encrypts the SNI domain, so the ISP sees only a generic front domain (e.g., `cloudflare.com`).",
    hint: "Hiding the destination name on the outside of the envelope so your internet provider cannot see what website you are opening.",
    level: "Expert",
    codeExample: `// DNS HTTPS Record for ECH:
// treasury.barrackpore.gov.in. IN HTTPS 1 . ech="AEn+DQBF...="`
  },
  {
    id: 21,
    question: "How do you verify DNS CAA records for an enterprise domain using the `dig` CLI?",
    shortAnswer: "Run `dig CAA <domain> +short` or `nslookup -type=CAA <domain>` to display the authorized Certificate Authorities and reporting email addresses.",
    explanation: "The command queries the authoritative DNS nameserver for CAA resource records. If configured, it outputs lines such as `0 issue 'digicert.com'` and `0 iodef 'mailto:soc@domain.com'`.",
    hint: "Using dig CAA to check which Certificate Authorities are authorized to issue certificates.",
    level: "Basic",
    codeExample: `// Querying CAA Records:
$ dig CAA barrackpore.gov.in +short
// Output:
// 0 issue "digicert.com"
// 0 issuewild "digicert.com"
// 0 iodef "mailto:soc@barrackpore.gov.in"`
  },
  {
    id: 22,
    question: "What is the security rationale behind Let's Encrypt's 90-day certificate lifespan?",
    shortAnswer: "Short 90-day lifespans limit the damage window if a private key is leaked or compromised, eliminate massive Certificate Revocation Lists (CRLs), and force organizations to fully automate certificate renewals using ACME.",
    explanation: "Historically, 2-year or 5-year certificates were common. If a key was stolen, the attacker had years of access. A 90-day certificate expires quickly, rendering stolen keys useless within weeks while ensuring IT teams automate renewals with zero human error.",
    hint: "Short-lived certificates ensure that stolen keys expire quickly and force IT to automate renewals.",
    level: "Moderate",
    codeExample: `// Automated 90-Day Renewal Schedule:
// Day 0  : 90-Day Certificate Issued via ACME
// Day 60 : Automated Cron Job triggers Certbot ➔ Renews certificate smoothly in background!
// Day 90 : Old certificate expires (Zero downtime)`
  },
  {
    id: 23,
    question: "What is 'HSTS Downgrade Attack' and how does an attacker try to exploit user subdomains without `includeSubDomains`?",
    shortAnswer: "If HSTS is set on `bank.com` without `includeSubDomains`, an attacker on public Wi-Fi can spin up an unencrypted rogue subdomain (`http://insecure.bank.com`), steal cookies, or inject malicious scripts to compromise the main domain.",
    explanation: "The `includeSubDomains` directive ensures that the strict HTTPS mandate applies to all existing and future subdomains (`*.bank.com`), preventing attackers from exploiting forgotten or unencrypted legacy subdomains.",
    hint: "Making sure the HTTPS lock applies to all subdomains, not just the main homepage.",
    level: "Moderate",
    codeExample: `// Securing Subdomains:
// Strict-Transport-Security: max-age=31536000; includeSubDomains`
  },
  {
    id: 24,
    question: "What is the function of the `iodef` tag in a DNS CAA record?",
    shortAnswer: "The `iodef` (Incident Object Description Exchange Format) tag specifies an email address or HTTP endpoint where CAs MUST send automated security violation reports if an unauthorized party requests a certificate for that domain.",
    explanation: "If an adversary attempts to generate an unauthorized certificate for `barrackpore.gov.in` via Let's Encrypt, Let's Encrypt blocks the request and automatically sends an incident alert to the email listed in the `iodef` tag (`soc@barrackpore.gov.in`).",
    hint: "An emergency notification address where Certificate Authorities send alerts if someone tries to forge a certificate.",
    level: "Expert",
    codeExample: `// CAA iodef Notification Record:
// barrackpore.gov.in. IN CAA 0 iodef "mailto:soc-alerts@barrackpore.gov.in"`
  },
  {
    id: 25,
    question: "How do modern browsers handle certificate revocation checking if the CA's OCSP server is offline ('Soft-Fail' vs 'Hard-Fail')?",
    shortAnswer: "Most consumer browsers use 'Soft-Fail' (if the OCSP server times out, the browser assumes the certificate is valid and connects); enterprise browsers use 'Hard-Fail' or CRLite/CRLSets to reject connections if revocation status cannot be verified.",
    explanation: "Soft-fail prioritizes availability over security: if a CA's server crashes, millions of users are not locked out. However, an attacker can block OCSP traffic to prevent a revoked certificate from being detected. OCSP Stapling solves this by delivering signed proofs directly.",
    hint: "Soft-fail lets users connect if the check times out; Hard-fail blocks access unless proof of validity is confirmed.",
    level: "Expert",
    codeExample: `// Soft-Fail vs Hard-Fail:
// Soft-Fail (Standard Browser) ➔ OCSP Timeout ➔ Assume VALID (Potential Security Gap!)
// Hard-Fail (Enterprise Banking) ➔ OCSP Timeout ➔ BLOCK CONNECTION (High Security)`
  },
  {
    id: 26,
    question: "How does the 'Upgrade-Insecure-Requests' CSP directive prevent mixed content warnings?",
    shortAnswer: "It instructs the browser to automatically rewrite all legacy `http://` links and resource URLs inside the HTML page to `https://` before sending network requests, eliminating mixed content errors.",
    explanation: "In legacy CMS databases, thousands of images might be stored with hardcoded `http://domain.com/image.png` URLs. The `Content-Security-Policy: upgrade-insecure-requests` header tells the browser to seamlessly fetch them over `https://` without modifying the backend database.",
    hint: "Telling the browser to automatically upgrade all old http:// image and script links to https://.",
    level: "Basic",
    codeExample: `// Automatic Upgrade Header:
// Content-Security-Policy: upgrade-insecure-requests;`
  },
  {
    id: 27,
    question: "What is an 'Intermediate Certificate Authority' and why are Root CAs never used to sign web certificates directly?",
    shortAnswer: "Root CAs are kept offline in secure vaults to protect their private keys from compromise; Intermediate CAs are issued by the Root CA to perform daily online signing, so if an Intermediate is compromised, only that branch is revoked without destroying the Root trust anchor.",
    explanation: "If a Root CA private key was exposed, every operating system and device in the world would have to push an emergency OS update to remove the trusted root. Using Intermediate CAs isolates risk: an exposed Intermediate can be revoked in seconds via standard CRL/OCSP.",
    hint: "Keeping the master key locked in a vault and using temporary sub-keys for daily work.",
    level: "Basic",
    codeExample: `// Two-Tier CA Architecture:
// [Offline Root CA (in Vault)] ──(Signs Once)──> [Online Intermediate CA] ──(Signs Daily)──> [Web Server Certs]`
  },
  {
    id: 28,
    question: "How do you audit an HTTPS web server's security headers using `cURL`?",
    shortAnswer: "Run `curl -s -D- https://bank.barrackpore.gov.in -o /dev/null` to display all HTTP response headers including HSTS, CSP, and X-Content-Type-Options.",
    explanation: "The `-s` flag runs in silent mode, `-D-` dumps response headers to stdout, and `-o /dev/null` discards the HTML body, providing instant visibility into web security headers.",
    hint: "Using curl with -D- to view all HTTP security headers in the terminal.",
    level: "Basic",
    codeExample: `// cURL Security Header Audit Command:
$ curl -s -D- https://bank.barrackpore.gov.in -o /dev/null
// Look for: Strict-Transport-Security, Content-Security-Policy, X-Content-Type-Options`
  },
  {
    id: 29,
    question: "What is 'Wildcard Certificate' syntax and what are its security trade-offs?",
    shortAnswer: "A certificate covering all subdomains under a single level (e.g., `*.barrackpore.gov.in`); trade-off: highly convenient and cost-effective, but compromising the private key compromises ALL subdomains simultaneously.",
    explanation: "A wildcard certificate for `*.barrackpore.gov.in` validly secures `tax.barrackpore.gov.in`, `treasury.barrackpore.gov.in`, and `portal.barrackpore.gov.in`. However, it does NOT cover multi-level subdomains like `dev.api.barrackpore.gov.in`.",
    hint: "A single master key that opens all sub-offices, making management easy but increasing risk if stolen.",
    level: "Moderate",
    codeExample: `// Wildcard Matching Rules:
// Certificate: *.barrackpore.gov.in
// ✔ MATCHES: mail.barrackpore.gov.in, portal.barrackpore.gov.in
// ❌ DOES NOT MATCH: deep.sub.barrackpore.gov.in (Requires separate cert)`
  },
  {
    id: 30,
    question: "What is the definitive production deployment checklist for enterprise HTTPS web encryption?",
    shortAnswer: "1. Enforce TLS 1.3/1.2 on Port 443 with Port 80 redirecting to HTTPS; 2. Enforce HSTS with `max-age=31536000; includeSubDomains; preload`; 3. Publish DNS CAA records; 4. Deploy OCSP Stapling; 5. Automate 60-day certificate renewals via ACME; 6. Configure CSP and `X-Content-Type-Options: nosniff`.",
    explanation: "This six-point checklist represents the gold standard for enterprise web encryption, guaranteeing an A+ rating on SSL Labs, complete immunity to SSL stripping, and continuous automated compliance.",
    hint: "TLS 1.3 + HSTS Preload + DNS CAA + OCSP Stapling + ACME Automation + CSP.",
    level: "Basic",
    codeExample: `// Master Enterprise HTTPS Hardening Checklist:
// [✔] Transport     : TLS 1.3 & 1.2 on Port 443 ONLY (Port 80 301 Redirect)
// [✔] HSTS          : Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
// [✔] DNS CAA       : Published CAA records restricting issuance to authorized CAs
// [✔] Performance   : OCSP Stapling enabled on all reverse proxies
// [✔] Lifecycle     : Automated 60-day ACME renewals with SAN validation
// [✔] Security HTTP : Content-Security-Policy & X-Content-Type-Options: nosniff`
  }
];

export default questions;
