const questions = [
  {
    question: "What is the first place a browser checks for a domain's IP address?",
    shortAnswer: "The browser's own internal DNS cache.",
    explanation: "Modern browsers (Chrome, Firefox, Edge) maintain a short-lived DNS cache to speed up repeated visits. This is the fastest cache level.",
    hint: "Your browser has a small memory of recent lookups.",
    level: "basic",
    codeExample: "chrome://net-internals/#dns"
  },
  {
    question: "After the browser cache, where does the browser look next?",
    shortAnswer: "The operating system's DNS cache.",
    explanation: "If the browser cache misses, the browser asks the operating system (via system calls). The OS maintains its own cache, which can be flushed with `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (macOS).",
    hint: "Your computer's shared memory.",
    level: "basic",
    codeExample: "ipconfig /displaydns"
  },
  {
    question: "What is the role of the recursive resolver in the real-world load process?",
    shortAnswer: "It performs the full DNS resolution on behalf of the client, starting from root servers.",
    explanation: "The recursive resolver (usually provided by ISP or public DNS like 1.1.1.1) handles all the steps: root, TLD, authoritative queries, then returns the final IP to the browser.",
    hint: "The travel agent who books your entire trip.",
    level: "moderate",
    codeExample: "dig +trace example.com"
  },
  {
    question: "Approximately how much time does a full DNS resolution (cache miss) add to a page load?",
    shortAnswer: "Typically 20–80 milliseconds.",
    explanation: "Root, TLD, and authoritative queries each take 10–20 ms. Total DNS resolution often adds 30–60 ms, but network conditions can increase this. TCP/TLS handshakes usually add more.",
    hint: "Less than the blink of an eye, but noticeable if slow.",
    level: "moderate",
    codeExample: "curl -w '%{time_namelookup}' -o /dev/null -s https://example.com"
  },
  {
    question: "Does a recursive resolver contact the root server for every query?",
    shortAnswer: "No, it caches root and TLD referrals, so subsequent queries are faster.",
    explanation: "Once the resolver learns the nameservers for `.com`, it caches them. The next `.com` domain will skip the root step. This reduces latency.",
    hint: "Remembering which aisle has the books.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "If Abhronila visits `barrackporehigh.edu` and then Susmita visits the same site 2 minutes later, does the DNS resolution happen again?",
    shortAnswer: "No, if the TTL hasn't expired, the resolver returns the cached IP.",
    explanation: "The ISP's recursive resolver caches the answer with a TTL (e.g., 3600 seconds). Susmita's query hits the cache and gets the IP instantly, skipping root/TLD/authoritative queries.",
    hint: "The sticky note is still on the wall.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the 'DNS Lookup' column in Chrome DevTools measuring?",
    shortAnswer: "The time taken from the start of the DNS request until the IP address is resolved.",
    explanation: "It includes browser cache, OS cache, and network DNS queries. If the value is 0 or very small, the answer was cached.",
    hint: "One of the timings in the Network tab.",
    level: "basic",
    codeExample: "F12 → Network → reload → look for 'DNS Lookup' column"
  },
  {
    question: "Why does a website sometimes load quickly even after you flush your DNS cache?",
    shortAnswer: "Because the ISP resolver or other intermediate caches still have the record.",
    explanation: "Flushing only clears your local caches (browser + OS). The ISP resolver may still have the entry, so the next query still hits a cache.",
    hint: "You cleaned your room, but the school library still has the note.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Does every resource on a webpage (images, CSS, JS) trigger a separate DNS lookup?",
    shortAnswer: "Not usually; browsers reuse resolved IPs for the same domain.",
    explanation: "Once the browser resolves `example.com`, it caches that IP for the duration of the page session. Other resources from the same domain use the cached IP.",
    hint: "One lookup per unique domain, not per file.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is DNS prefetching?",
    shortAnswer: "A browser optimization that resolves domain names before the user clicks a link.",
    explanation: "HTML can include `<link rel='dns-prefetch' href='//api.example.com'>`. The browser resolves the domain in the background, reducing wait time when the resource is actually needed.",
    hint: "Anticipating and looking up addresses ahead of time.",
    level: "expert",
    codeExample: "<link rel=\"dns-prefetch\" href=\"//fonts.googleapis.com\">"
  },
  {
    question: "How does a CDN's DNS affect the resolution process?",
    shortAnswer: "CDN DNS returns different IPs based on the user's geographic location or latency.",
    explanation: "Authoritative DNS servers for CDNs use geolocation or latency-based routing. The same domain name (e.g., `cdn.example.com`) may resolve to a different IP for Abhronila in Barrackpore than for a user in London.",
    hint: "The school's front desk directs you to the nearest classroom.",
    level: "expert",
    codeExample: "dig +short cdn.cloudflare.com"
  },
  {
    question: "What happens if the authoritative DNS server is slow or down?",
    shortAnswer: "The recursive resolver waits (timeout) and eventually returns a SERVFAIL or timeout error.",
    explanation: "Resolvers have timeouts (usually 5–30 seconds). If the authoritative server doesn't respond, the browser shows an error like 'DNS_PROBE_FINISHED_NXDOMAIN' or 'ERR_NAME_NOT_RESOLVED'.",
    hint: "The library's card catalog is broken – can't find any book.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "How does the browser handle DNS resolution for a URL with a non-default port (e.g., `https://example.com:8080`)?",
    shortAnswer: "The port number does not affect DNS; the same lookup is performed as without the port.",
    explanation: "DNS only resolves the hostname (example.com). The port is part of the URL scheme and is used by TCP after the IP is obtained.",
    hint: "DNS doesn't care about port numbers – only names.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between DNS resolution time and total page load time?",
    shortAnswer: "DNS is only one component; total includes TCP, TLS, request/response, rendering.",
    explanation: "Even if DNS takes 50ms, the TCP handshake (+30ms) and TLS negotiation (+50ms) often dominate. The user sees the page after all these steps plus content download.",
    hint: "Getting the address (DNS) is just the start; you still need to drive there.",
    level: "moderate",
    codeExample: "curl -w 'dns:%{time_namelookup} connect:%{time_connect} total:%{time_total}' -o /dev/null -s https://example.com"
  },
  {
    question: "Can a browser use IPv6 even if the OS cache only has IPv4?",
    shortAnswer: "Yes, it can perform its own AAAA query independently.",
    explanation: "Modern browsers implement 'Happy Eyeballs' – they query both A and AAAA records simultaneously and use whichever responds first. Even if the OS cache has only A, the browser can still get AAAA.",
    hint: "The browser can look up both versions at the same time.",
    level: "expert",
    codeExample: null
  },
  {
    question: "If you type `https://barrackporehigh.edu` and get a certificate error, is it a DNS problem?",
    shortAnswer: "Probably not; DNS resolved correctly, but the certificate doesn't match or is expired.",
    explanation: "DNS gave you the correct IP, and your browser connected. The certificate error means the web server presented a certificate for a different domain – possibly a man-in-the-middle or misconfiguration.",
    hint: "You arrived at the right address, but the person who answered isn't who you expected.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What tool can you use to see the DNS lookup time for each resource in real time?",
    shortAnswer: "Browser DevTools (Network tab) or `curl` with timing flags.",
    explanation: "In Chrome/Firefox, open DevTools, Network tab, reload, and look at the 'DNS Lookup' column. Alternatively, `curl -w` provides detailed timing breakdown.",
    hint: "Press F12, go to Network, and reload.",
    level: "basic",
    codeExample: "curl -w '@timing.txt' -o /dev/null -s https://example.com"
  },
  {
    question: "During the recursive resolution process, are all queries sent to the root and TLD servers in parallel?",
    shortAnswer: "No, they are sequential based on referrals.",
    explanation: "The resolver first asks the root, receives a referral to TLDs, then asks the TLD, receives a referral to authoritative, and finally asks authoritative. This is iterative resolution inside the recursive resolver.",
    hint: "You ask the librarian, she looks at a card, then goes to another shelf – step by step.",
    level: "moderate",
    codeExample: "dig +trace example.com"
  },
  {
    question: "If a website uses multiple domains (e.g., `images.example.com`, `fonts.example.com`), how many DNS lookups occur on first load?",
    shortAnswer: "One per unique domain, plus any prefetching.",
    explanation: "Each distinct hostname (subdomain) requires its own lookup, unless the browser has a cache entry. `example.com` and `images.example.com` are different lookups because they could point to different IPs.",
    hint: "Different subdomains can live on different servers.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the impact of DNS TTL on real-world browsing?",
    shortAnswer: "TTL determines how often the browser/resolver must re-query for an updated IP.",
    explanation: "Long TTL (e.g., 86400) makes sites load faster from cache, but IP changes take up to a day to propagate. Short TTL (300) allows quick failover but increases DNS traffic.",
    hint: "How often the sticky note gets replaced.",
    level: "moderate",
    codeExample: "dig +ttlid example.com"
  },
  {
    question: "What happens if the browser receives a CNAME record instead of an A record?",
    shortAnswer: "It follows the CNAME chain, performing a new lookup for the target name.",
    explanation: "The browser (or resolver) must resolve the CNAME target to an IP. This adds an extra step but is transparent to the user, though it increases resolution time slightly.",
    hint: "An alias redirects the lookup to another name.",
    level: "expert",
    codeExample: "dig www.github.com"
  },
  {
    question: "Why do some ISPs' DNS resolvers return a 'search page' instead of NXDOMAIN?",
    shortAnswer: "They are violating DNS standards to show ads or alternative suggestions.",
    explanation: "Instead of returning 'domain not found', some ISPs intercept NXDOMAIN and redirect to a landing page. This breaks DNSSEC and can be a security risk.",
    hint: "The librarian says 'I don't have that book, but here's a flyer'.",
    level: "expert",
    codeExample: null
  },
  {
    question: "When a browser uses DNS over HTTPS (DoH), how does the real-world flow change?",
    shortAnswer: "The DNS queries are encrypted and sent to a DoH server instead of the ISP's resolver.",
    explanation: "The browser bypasses the OS and ISP resolvers, sending encrypted HTTP requests to a DoH server (e.g., Cloudflare's `https://cloudflare-dns.com/dns-query`). The resolution steps (root, TLD, authoritative) happen on the DoH server.",
    hint: "Your DNS questions are hidden in an envelope.",
    level: "expert",
    codeExample: "curl --doh-url https://dns.google/dns-query https://example.com"
  },
  {
    question: "What is the 'time_namelookup' variable in `curl` measuring?",
    shortAnswer: "The total time from start to DNS resolution completion (including cache).",
    explanation: "Curl's `%{time_namelookup}` includes any DNS cache hits. It's the time until the IP address is known.",
    hint: "DNS resolution time, from beginning to end.",
    level: "moderate",
    codeExample: "curl -w '%{time_namelookup}' -o /dev/null -s https://example.com"
  },
  {
    question: "If a website's IP address changes, what must a user do to see the new site immediately?",
    shortAnswer: "Flush all local caches (browser, OS) and wait for resolver TTL to expire, or use a different resolver.",
    explanation: "Clearing browser cache and running `ipconfig /flushdns` helps, but the ISP resolver may still have the old IP in cache until TTL expires. Changing to a public DNS (e.g., 1.1.1.1) might bypass the stale cache.",
    hint: "Erase your sticky notes and ask a different librarian.",
    level: "moderate",
    codeExample: "ipconfig /flushdns"
  },
  {
    question: "Why does `ping` sometimes show an IP address even when the browser can't load the website?",
    shortAnswer: "Ping uses the same DNS resolution as the browser, but the web server might be down or blocking HTTP/HTTPS.",
    explanation: "DNS resolution works (the IP is found), but the web server might not be listening on port 80/443, or there could be a firewall. Ping tests ICMP, which may be allowed even if HTTP is down.",
    hint: "You have the address, but the door is locked.",
    level: "moderate",
    codeExample: "ping example.com"
  },
  {
    question: "What is the 'DNS Lookup' stage in browser DevTools when loading a page?",
    shortAnswer: "The time from when the browser decides to resolve a domain until the IP is obtained.",
    explanation: "It includes checking the browser cache, OS cache, and if not found, performing a network query. This is part of the 'Queueing' or 'Stalled' phase.",
    hint: "One of the colored bars in the Network waterfall.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do public DNS resolvers like 1.1.1.1 or 8.8.8.8 affect the load experience?",
    shortAnswer: "They often provide faster, more reliable resolution than ISP resolvers, with additional privacy/security features.",
    explanation: "Public resolvers are usually anycasted (fast), support DNSSEC, and avoid ISP hijacking. However, they may increase latency if far from your location.",
    hint: "Using a professional courier instead of the local post office.",
    level: "moderate",
    codeExample: "nslookup example.com 1.1.1.1"
  },
  {
    question: "During the recursive resolution process, does the browser wait for each step before proceeding?",
    shortAnswer: "Yes – the browser blocks on the DNS lookup; JavaScript execution and rendering are paused until the IP is resolved.",
    explanation: "DNS resolution is synchronous from the browser's perspective. The browser cannot make the HTTP request until it has the IP. However, the browser may have a timeout and show an error if DNS takes too long.",
    hint: "You can't drive until you have the address.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the total time from pressing Enter to seeing a fully loaded webpage if DNS takes 50ms, TCP/TLS takes 100ms, and server response takes 150ms?",
    shortAnswer: "At least 300ms, but often more due to parallel downloads and rendering.",
    explanation: "DNS (50) + TCP+TLS (100) + server response (150) = 300ms before first byte. Actual page load adds time for downloading and parsing HTML/CSS/JS, images, etc.",
    hint: "Add up the steps: name lookup, connect, first byte, content download.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "If a website uses a CDN, does the user's browser perform a DNS lookup for the CDN domain or the original domain?",
    shortAnswer: "It looks up the original domain; CDN is transparent via CNAME or NS delegation.",
    explanation: "Typically, `www.example.com` is a CNAME to `example.cdn.com`. The browser resolves `www.example.com`, gets the CNAME, then resolves `example.cdn.com`. The final IP belongs to the CDN.",
    hint: "One more step of indirection.",
    level: "expert",
    codeExample: "dig www.example.com"
  }
];

export default questions;