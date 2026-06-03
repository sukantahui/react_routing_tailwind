// topic0_files/topic0_questions.js
const questions = [
  {
    question: "What is DNS and why is it often called the 'phonebook of the internet'?",
    shortAnswer: "DNS translates domain names to IP addresses, like a phonebook translates names to numbers.",
    explanation: "DNS (Domain Name System) is a hierarchical and distributed naming system. When you type a domain, DNS resolvers find the corresponding IP address so your browser can connect. Without DNS, we would need to memorize numerical IP addresses for every website.",
    hint: "Think about calling a friend – you use their name, not their phone number. The phonebook does the mapping.",
    level: "basic",
    codeExample: "nslookup google.com"
  },
  {
    question: "Explain the difference between a recursive and iterative DNS query.",
    shortAnswer: "Recursive query asks the resolver to fully resolve the name; iterative query returns referrals step by step.",
    explanation: "In a recursive query, the DNS client expects the resolver to return the final answer. In iterative query, the resolver returns the best answer it has (may be a referral to another nameserver). Most clients use recursive queries to resolvers, and resolvers use iterative queries to root/TLD servers.",
    hint: "Observe how a waiter brings your food (recursive) vs. giving you kitchen addresses (iterative).",
    level: "intermediate",
    codeExample: "dig +recurse example.com"
  },
  {
    question: "What are common DNS record types and their purposes?",
    shortAnswer: "A (IPv4 address), AAAA (IPv6), CNAME (alias), MX (mail exchange), TXT (text metadata).",
    explanation: "A records map domain → IPv4; AAAA for IPv6; CNAME aliases one domain to another; MX specifies mail servers for a domain; TXT holds verification or security records (SPF, DKIM).",
    hint: "Check your domain's DNS settings – each record type has a specific role.",
    level: "intermediate",
    codeExample: "dig facebook.com A"
  },
  {
    question: "How does DNS caching improve performance?",
    shortAnswer: "Caching stores resolved DNS answers temporarily, reducing lookup time and server load.",
    explanation: "When a DNS resolver caches a result, subsequent requests for the same domain return instantly from cache instead of traversing the hierarchy. TTL (Time To Live) values control cache duration.",
    hint: "Why does a website load faster the second time you visit?",
    level: "intermediate",
    codeExample: "ipconfig /displaydns   (Windows)"
  },
  {
    question: "What is DNS TTL and why is it important when migrating a website?",
    shortAnswer: "TTL (Time To Live) tells resolvers how long to cache a DNS record. Lower TTL before migration speeds up propagation.",
    explanation: "Before migrating, reduce TTL to 300 seconds (or lower) 24-48 hours ahead. After migration, increase TTL again. This ensures clients get new IP quickly.",
    hint: "Think of TTL as 'expiration date' for cached DNS entries.",
    level: "advanced",
    codeExample: "dig +ttlid example.com"
  },
  {
    question: "What is the role of the Root nameserver in DNS resolution?",
    shortAnswer: "Root nameservers direct queries to the appropriate TLD nameserver (.com, .org, etc.).",
    explanation: "There are 13 logical root servers (many instances). They don't know the final IP but tell the resolver which TLD server to query next. Critical for bootstrapping DNS.",
    hint: "Without a root, how would the resolver know where to find '.edu' domains?",
    level: "intermediate",
    codeExample: "dig NS ."
  },
  {
    question: "What is the difference between HTTP/1.1 and HTTP/2?",
    shortAnswer: "HTTP/2 supports multiplexing, server push, and header compression, improving performance.",
    explanation: "HTTP/1.1 can have head-of-line blocking; each request needs its own connection or pipelining. HTTP/2 allows multiple requests/responses interleaved on one connection, plus binary framing and HPACK header compression.",
    hint: "Think of a single-lane bridge (HTTP/1.1) vs. a multi-lane highway (HTTP/2).",
    level: "advanced",
    codeExample: "curl --http2 https://example.com"
  },
  {
    question: "What are HTTP status codes? Provide examples for 2xx, 3xx, 4xx, and 5xx.",
    shortAnswer: "2xx success (200 OK), 3xx redirect (301 Moved), 4xx client error (404 Not Found), 5xx server error (500 Internal Server Error).",
    explanation: "Status codes indicate result of HTTP request. 200 OK – everything fine. 301 – resource moved permanently. 404 – page not found. 500 – server crashed. Developers must handle these properly.",
    hint: "Open browser dev tools Network tab – every resource has a status code.",
    level: "basic",
    codeExample: "fetch('/api/user').then(res => console.log(res.status))"
  },
  {
    question: "Explain the difference between GET and POST methods.",
    shortAnswer: "GET requests data (should be idempotent, parameters in URL). POST submits data (changes server state, body contains data).",
    explanation: "GET should not change server state; data appears in URL (limited length). POST can send large data and is used for forms, uploads, login. GET requests can be cached, POST not by default.",
    hint: "Try changing a GET request's URL – would that be safe for a password?",
    level: "basic",
    codeExample: "GET /search?q=dns   POST /login with body {user, pwd}"
  },
  {
    question: "What is the difference between HTTP and HTTPS?",
    shortAnswer: "HTTPS adds TLS encryption to HTTP, securing data from eavesdropping and tampering.",
    explanation: "HTTP sends data in plaintext; HTTPS encrypts all traffic using certificates. HTTPS also authenticates the server, preventing man-in-the-middle attacks.",
    hint: "Look at the padlock icon in your address bar – that's HTTPS.",
    level: "basic",
    codeExample: "https://google.com (secure) vs http://google.com (insecure)"
  },
  {
    question: "How does TLS handshake work? Describe key steps.",
    shortAnswer: "ClientHello → ServerHello + Certificate → Key exchange → ChangeCipherSpec → Finished.",
    explanation: "Client sends supported cipher suites. Server responds with chosen cipher and its digital certificate. Client verifies certificate with CA. Both exchange keys (RSA or Diffie-Hellman) to generate symmetric session key. Then encrypted communication begins.",
    hint: "Observe the handshake using Wireshark or browser security panel.",
    level: "advanced",
    codeExample: "openssl s_client -connect google.com:443"
  },
  {
    question: "What is a certificate authority (CA) and why is it needed?",
    shortAnswer: "CA is a trusted entity that issues digital certificates, binding a public key to a domain.",
    explanation: "CAs verify domain ownership and sign certificates. Browsers trust pre-installed CA certificates. Without CA, anyone could pretend to be your bank.",
    hint: "Who vouches for the identity of a website? That's the CA.",
    level: "intermediate",
    codeExample: "Check certificate chain in browser: click padlock → certificate"
  },
  {
    question: "What is HSTS (HTTP Strict Transport Security)?",
    shortAnswer: "HSTS forces browsers to always use HTTPS for a domain, preventing SSL stripping attacks.",
    explanation: "Server sends HSTS header (e.g., `Strict-Transport-Security: max-age=31536000`). Browser remembers and automatically converts HTTP requests to HTTPS for that domain, even if user types http://.",
    hint: "Why does your browser jump from http to https on some sites automatically?",
    level: "advanced",
    codeExample: "Response header: Strict-Transport-Security: max-age=63072000; includeSubDomains"
  },
  {
    question: "What is DNS over HTTPS (DoH) and DNS over TLS (DoT)?",
    shortAnswer: "DoH and DoT encrypt DNS queries to prevent eavesdropping and manipulation.",
    explanation: "DoH sends DNS queries inside HTTPS requests (port 443). DoT uses TLS directly on port 853. Both improve privacy, preventing ISPs from seeing your DNS lookups.",
    hint: "Your DNS queries can be as private as your web traffic.",
    level: "advanced",
    codeExample: "Use Firefox with DoH enabled → Settings → Network Settings → Enable DNS over HTTPS"
  },
  {
    question: "What is the 'mixed content' error in HTTPS?",
    shortAnswer: "Loading HTTP resources (images, scripts) on an HTTPS page causes mixed content warning.",
    explanation: "Browsers block or warn because HTTP resources break security guarantees. Attackers could modify those resources. Always use HTTPS URLs for all resources.",
    hint: "Check browser console for mixed content warnings.",
    level: "intermediate",
    codeExample: "Fix: change <img src='http://example.com/photo.jpg'> to https://"
  },
  {
    question: "What is a DNS zone and what is zone transfer?",
    shortAnswer: "Zone is a portion of DNS namespace. Zone transfer (AXFR) replicates DNS records between primary and secondary servers.",
    explanation: "Zone files contain records for a domain. Secondary servers use AXFR to copy the zone. Improperly configured AXFR can leak internal network information.",
    hint: "Organizations often restrict AXFR to trusted IPs only.",
    level: "expert",
    codeExample: "dig axfr @ns1.example.com example.com"
  },
  {
    question: "How do you troubleshoot DNS resolution issues in Linux/Windows?",
    shortAnswer: "Use `nslookup`, `dig`, `ping`, or `resolvectl` to test resolution. Check `/etc/resolv.conf`.",
    explanation: "`nslookup example.com` – quick test. `dig +trace example.com` – see full path. `ipconfig /flushdns` clear cache. Also check firewall blocking port 53.",
    hint: "When website doesn't load but IP works – it's likely a DNS problem.",
    level: "intermediate",
    codeExample: "dig google.com +trace"
  },
  {
    question: "What is SNI (Server Name Indication) in TLS?",
    shortAnswer: "SNI allows multiple HTTPS websites on same IP and port by sending domain name during TLS handshake.",
    explanation: "Before SNI, each HTTPS site needed its own IP address. SNI extends TLS so client tells server which certificate to present.",
    hint: "How can a shared hosting server host 100 HTTPS sites with one IP? SNI.",
    level: "expert",
    codeExample: "openssl s_client -connect example.com:443 -servername example.com"
  },
  {
    question: "What is the difference between symmetric and asymmetric encryption in TLS?",
    shortAnswer: "Asymmetric (RSA/ECDSA) used for key exchange, symmetric (AES) for bulk data encryption.",
    explanation: "Asymmetric is slow but good for initial key exchange. Once both sides share a symmetric session key, they switch to faster symmetric encryption for all traffic.",
    hint: "Asymmetric = secure handshake, symmetric = conversation.",
    level: "intermediate",
    codeExample: "Cipher suite: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
  },
  {
    question: "What is OCSP stapling?",
    shortAnswer: "OCSP stapling allows server to send certificate revocation status with the handshake, improving privacy and performance.",
    explanation: "Instead of browser contacting CA for revocation check, server periodically fetches OCSP response and staples it during handshake. Saves round trips and hides client browsing from CA.",
    hint: "OCSP stapling makes HTTPS handshake faster and more private.",
    level: "expert"
  },
  {
    question: "Can DNS use TCP instead of UDP? When?",
    shortAnswer: "DNS primarily uses UDP (port 53) but falls back to TCP for responses > 512 bytes or zone transfers.",
    explanation: "UDP is faster and lightweight. For large responses (e.g., DNSSEC or many records), server sets 'truncated' flag, client retries over TCP. Also zone transfers (AXFR) require TCP.",
    hint: "Why would a large DNS response need TCP? reliability without fragmentation issues.",
    level: "advanced"
  },
  {
    question: "What is a CNAME flattening or alias record?",
    shortAnswer: "CNAME flattening is a feature where DNS provider resolves CNAME at edge and returns A record to client, avoiding extra query.",
    explanation: "Some providers like Cloudflare DNS implement CNAME flattening: they resolve the target and return a final A record, improving performance and allowing CNAME on zone apex.",
    hint: "Normally you can't have a CNAME at root domain (example.com). Flattening solves that.",
    level: "expert"
  },
  {
    question: "What is DNSSEC? Why is it not widely deployed?",
    shortAnswer: "DNSSEC adds cryptographic signatures to DNS records to prevent spoofing. Complexity and key management limit adoption.",
    explanation: "DNSSEC signs record sets with private keys; resolvers verify signatures using public keys anchored in root zone. Overhead, configuration difficulty, and lack of end-to-end validation hinder deployment.",
    hint: "DNSSEC protects against cache poisoning but requires coordinated effort.",
    level: "expert"
  },
  {
    question: "How does HTTP chunked encoding work?",
    shortAnswer: "Chunked transfer encoding sends data in pieces with size headers, allowing streaming without Content-Length.",
    explanation: "Server sends each chunk size in hex, followed by chunk data. Final chunk size 0 indicates end. Useful for dynamic content when total size unknown.",
    hint: "Live video streams use chunked encoding to start playing before full file downloads.",
    level: "advanced"
  },
  {
    question: "What is the purpose of the 'Host' header in HTTP/1.1?",
    shortAnswer: "Host header allows multiple domains to be hosted on the same IP address (virtual hosting).",
    explanation: "Before Host header, each domain needed a unique IP. HTTP/1.1 made Host mandatory, enabling shared hosting with many websites on one server.",
    hint: "How does a web server know which site you want when you connect to IP 93.184.216.34?",
    level: "intermediate"
  },
  {
    question: "What is an HTTP cookie and how does it relate to session management?",
    shortAnswer: "Cookie is a small piece of data stored by browser, sent with each request to maintain state (login, preferences).",
    explanation: "Server sets `Set-Cookie` header. Browser stores cookie and sends it back via `Cookie` header. Used to track sessions across stateless HTTP.",
    hint: "Why don't you need to log in on every page after entering password once?",
    level: "basic"
  },
  {
    question: "What is a preflight request in CORS?",
    shortAnswer: "Preflight is an OPTIONS request sent by browser before cross-origin requests that may affect server data.",
    explanation: "For requests with custom headers or non-simple methods (PUT, DELETE), browser sends OPTIONS to check server permissions (Access-Control-Allow-Origin etc.). Actual request sent only if preflight succeeds.",
    hint: "Open dev tools Network tab – sometimes you see OPTIONS requests before a POST.",
    level: "advanced"
  },
  {
    question: "What is the difference between 301 and 302 redirect status codes?",
    shortAnswer: "301 Moved Permanently (cached by browser), 302 Found (temporary, not cached).",
    explanation: "301 – search engines transfer SEO value to new URL. Browsers cache 301 aggressively. 302 – used for temporary maintenance or A/B testing.",
    hint: "Changing HTTP to HTTPS should use 301 permanent redirect.",
    level: "intermediate"
  },
  {
    question: "How does DNS load balancing work?",
    shortAnswer: "DNS round robin returns multiple A records in rotation, distributing traffic across servers.",
    explanation: "DNS server returns list of IPs (e.g., 3 IPs) and rotates order or cycles them. Simple but ignores server load/health. More advanced: health checks and weighted records (Route53, GSLB).",
    hint: "Large websites like google.com return many IPs – that's DNS load balancing.",
    level: "advanced"
  },
  {
    question: "What is EDNS (Extension Mechanisms for DNS)?",
    shortAnswer: "EDNS extends DNS protocol to support larger UDP packets, DNSSEC, and client subnet options.",
    explanation: "Old DNS limited to 512 byte UDP packets. EDNS0 allows larger sizes (up to 4096), adds pseudo-RR for options like DNS Cookies, Client Subnet, and supports DNSSEC.",
    hint: "EDNS Client Subnet helps CDNs give location‑specific responses.",
    level: "expert"
  }
];

export default questions;