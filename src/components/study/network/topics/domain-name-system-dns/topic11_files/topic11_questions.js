const questions = [
  {
    question: "What is DNS caching?",
    shortAnswer: "Temporary storage of DNS query results to speed up future requests.",
    explanation: "When a DNS resolver fetches an answer, it keeps it in memory for a period (TTL). Next time the same domain is requested, the answer is served from cache without network lookups.",
    hint: "Like saving a phone number in your contacts after you dial it once.",
    level: "basic",
    codeExample: "ipconfig /displaydns"
  },
  {
    question: "Explain TTL in DNS.",
    shortAnswer: "Time To Live – the number of seconds a DNS record can be cached.",
    explanation: "TTL is set by the domain owner in the authoritative DNS. It tells resolvers how long to keep the record before discarding and re‑querying.",
    hint: "Countdown timer on a cached answer.",
    level: "basic",
    codeExample: "dig +ttlid example.com"
  },
  {
    question: "What are the three main levels of DNS caching?",
    shortAnswer: "Browser cache, operating system cache, and resolver (ISP/public) cache.",
    explanation: "Each level provides faster access. Browser cache is fastest but smallest; resolver cache serves many users and is largest.",
    hint: "Local (your PC) → local network → ISP.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "How does DNS caching improve performance?",
    shortAnswer: "Eliminates repeated network queries, reducing latency and server load.",
    explanation: "Without caching, every DNS lookup would require multiple round trips (root → TLD → authoritative). Caching makes subsequent lookups nearly instant.",
    hint: "Remembering where you parked instead of searching the whole lot each time.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is negative caching?",
    shortAnswer: "Caching the fact that a domain does not exist (NXDOMAIN) to avoid repeated failed queries.",
    explanation: "When a resolver receives NXDOMAIN (non‑existent domain), it stores that negative response for a short TTL (often 5–10 minutes). This prevents hammering the authoritative servers for a typo.",
    hint: "Remembering that the library has no book titled 'abcdefg' – don't ask again for a while.",
    level: "moderate",
    codeExample: "dig nonexistent-domain-xyz123.com"
  },
  {
    question: "How do you flush the DNS cache on Windows?",
    shortAnswer: "Run `ipconfig /flushdns` in Command Prompt as administrator.",
    explanation: "Flushing removes all cached entries, forcing fresh lookups. Useful after DNS changes or to clear corrupted entries.",
    hint: "Empty the sticky notes from your desk.",
    level: "basic",
    codeExample: "ipconfig /flushdns"
  },
  {
    question: "What command clears the DNS cache on macOS?",
    shortAnswer: "`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`",
    explanation: "macOS uses mDNSResponder for multicast and unicast DNS caching. The command restarts the service after flushing.",
    hint: "Two commands: flush cache then restart the responder.",
    level: "moderate",
    codeExample: "sudo dscacheutil -flushcache"
  },
  {
    question: "Why might a website still show the old IP after you changed DNS records?",
    shortAnswer: "Because of cached entries in your browser, OS, or resolver.",
    explanation: "You updated the DNS, but previous cached records haven't expired yet. Waiting for TTL to expire or flushing cache solves it.",
    hint: "The 'sticky note' hasn't been removed yet.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What happens if you set TTL to 0?",
    shortAnswer: "Indicates no caching – every query goes to authoritative servers.",
    explanation: "Some DNS providers allow 0 TTL for critical failover, but it dramatically increases load and latency. Not recommended for production without careful planning.",
    hint: "No sticky note; ask the librarian every time.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Can a resolver ignore TTL?",
    shortAnswer: "Technically yes, but it violates DNS standards.",
    explanation: "Some misconfigured or malicious resolvers ignore TTL and cache longer. This can cause stale data beyond the domain owner's control.",
    hint: "The sticky note says 'remove after 1 hour', but the student keeps it all day.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the difference between browser DNS cache and OS DNS cache?",
    shortAnswer: "Browser cache is application-specific and often very short-lived; OS cache is system-wide and larger.",
    explanation: "Browsers (Chrome, Firefox) have their own caches for speed. OS cache (e.g., Windows DNS Client service) is used by all applications. Both respect TTL but browsers sometimes have minimum TTL overrides.",
    hint: "Two sticky notes: one on your desk (browser), one in the main office (OS).",
    level: "moderate",
    codeExample: null
  },
  {
    question: "How does a recursive resolver's cache benefit multiple users?",
    shortAnswer: "One cached response serves thousands of users requesting the same domain.",
    explanation: "When Susmita from Jadavpur asks for `example.com`, the resolver caches it. When Abhronila from Barrackpore asks a second later, she gets the cached answer – no extra work.",
    hint: "One sticky note helps the whole class.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the typical TTL for a CDN-hosted website?",
    shortAnswer: "Often low, between 30–300 seconds, to allow fast traffic rerouting.",
    explanation: "CDNs (Content Delivery Networks) change IPs dynamically based on load and proximity. Low TTL ensures users get optimal endpoints quickly.",
    hint: "Constantly updated sticky notes.",
    level: "expert",
    codeExample: "dig cdn.example.com"
  },
  {
    question: "What is prefetching in DNS caching?",
    shortAnswer: "Resolvers refresh a cached record before TTL expires, based on access patterns.",
    explanation: "Smart resolvers detect popular domains and re-query in the background just before TTL ends, so the cache never goes empty. Improves hit ratio.",
    hint: "Replacing the sticky note a minute before it expires.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does DNS over HTTPS (DoH) affect caching?",
    shortAnswer: "Caching still works, but queries are encrypted. The resolver cache is inside the DoH client or upstream server.",
    explanation: "DoH doesn't change caching logic – it only encrypts the transport. Your browser or OS may have a separate DoH cache.",
    hint: "Sticky note in a locked drawer – still a sticky note.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the maximum TTL allowed by DNS specification?",
    shortAnswer: "Technically 2^31-1 seconds (~68 years), but most resolvers cap at 604800 seconds (7 days).",
    explanation: "Very long TTLs are discouraged because they make updates practically impossible. BIND default maximum is 604800.",
    hint: "A sticky note that never falls off.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Why does `dig` sometimes show a different TTL than what I set?",
    shortAnswer: "Because the TTL may be overridden by the resolver or server min/max limits.",
    explanation: "Authoritative servers can enforce minimum/maximum TTLs. Resolvers may also cap TTL to avoid excessively long caching.",
    hint: "The librarian says 'you can keep this note for 1 hour, no more' even if the book says 7 days.",
    level: "expert",
    codeExample: "dig +nocookie example.com"
  },
  {
    question: "What is cache poisoning? How can caching amplify it?",
    shortAnswer: "Injecting false DNS records into a resolver's cache. Caching makes the false data spread to many users.",
    explanation: "If an attacker successfully poisons a resolver's cache, all users of that resolver receive the wrong IP until TTL expires or cache is flushed.",
    hint: "Someone replaces the sticky note with a fake address – everyone follows it.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does DNSSEC protect against cache poisoning?",
    shortAnswer: "By digitally signing DNS responses; resolvers verify signatures before caching.",
    explanation: "DNSSEC adds cryptographic signatures to records. If a poisoned record lacks a valid signature, the resolver rejects it, preventing cache pollution.",
    hint: "The sticky note has a hologram; you only trust notes with the hologram.",
    level: "expert",
    codeExample: "dig +dnssec sigok.verteiltesysteme.net"
  },
  {
    question: "What is the difference between cache hit and cache miss?",
    shortAnswer: "Hit = answer found in cache; Miss = answer not in cache, requires full lookup.",
    explanation: "High hit ratio means efficient caching, lower latency, and less load on authoritative servers.",
    hint: "Hit = you remember; Miss = you have to look up.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What command shows the current DNS cache on Linux (systemd-resolved)?",
    shortAnswer: "`sudo systemd-resolve --statistics` or `resolvectl statistics`",
    explanation: "systemd-resolved keeps cache statistics; actual entries can be seen with `pkill -USR1 systemd-resolve` and check syslog (advanced).",
    hint: "Ask the Linux resolver how many sticky notes it has.",
    level: "moderate",
    codeExample: "resolvectl statistics"
  },
  {
    question: "How does Google Chrome's internal DNS cache differ from the OS cache?",
    shortAnswer: "Chrome has its own cache with a fixed TTL (usually 1 minute) for performance, separate from OS.",
    explanation: "Chrome does this to avoid OS caching bugs and to implement its own prefetching. You can see it at `chrome://net-internals/#dns`.",
    hint: "Chrome keeps its own tiny sticky note.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the impact of TTL on load balancing?",
    shortAnswer: "Lower TTL allows faster response to server failures or traffic shifts; higher TTL means slower adaptation.",
    explanation: "For round-robin DNS with multiple IPs, TTL determines how often clients re‑query and rebalance. Very low TTL can cause query storms.",
    hint: "Faster sticky note changes = faster adaptation but more work.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Can you have a TTL of 0 seconds? How is it treated?",
    shortAnswer: "Allowed by spec but often treated as 'don't cache' or set to a minimum of 1 second by some resolvers.",
    explanation: "Cloudflare and AWS Route 53 allow 0 TTL; Google Public DNS treats 0 as 5 seconds minimum. Not recommended for production.",
    hint: "Write 'do not keep' on the sticky note – but someone may still keep it for a few seconds.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the purpose of the `+cd` flag in `dig`?",
    shortAnswer: "`+cd` (checking disabled) tells the resolver not to validate DNSSEC, potentially using cache even if signatures are missing.",
    explanation: "Useful for debugging but dangerous for security. It may return cached entries that would otherwise be rejected.",
    hint: "Ignore the hologram, just give me the note.",
    level: "expert",
    codeExample: "dig +cd example.com"
  },
  {
    question: "How does anycast affect DNS caching?",
    shortAnswer: "Anycast routes queries to the nearest server; each anycast node has its own cache, so caching is not globally shared.",
    explanation: "Different users may hit different anycast nodes, each with its own cache. That's why DNS changes appear at different times for different regions.",
    hint: "Many librarians with their own sticky notes, not one central board.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the difference between caching and prefetching?",
    shortAnswer: "Caching stores answers after they are requested; prefetching fetches popular entries before TTL expires.",
    explanation: "Prefetching proactively refreshes cache to avoid misses. It's an optimization, not a standard part of DNS.",
    hint: "Getting a new sticky note before the old one fades away.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do you disable DNS caching in Windows for testing?",
    shortAnswer: "Stop the 'DNS Client' service (Dnscache) – but this degrades performance.",
    explanation: "`net stop dnscache` disables caching. Useful for testing DNS changes without flushing, but not for normal use.",
    hint: "No sticky notes allowed – you must ask every time.",
    level: "expert",
    codeExample: "net stop dnscache"
  },
  {
    question: "Why does `ping` sometimes resolve a domain even after you flush cache?",
    shortAnswer: "Because `ping` may use the system's DNS cache, which you flushed, but it could also use a separate cache inside the network stack.",
    explanation: "ARP and routing caches may also hold IP associations briefly. Also, some applications (like ping) may bypass the cache by using their own resolution.",
    hint: "There might be more than one sticky note pile.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the `max-cache-ttl` option in BIND?",
    shortAnswer: "A configuration parameter that caps the maximum TTL the resolver will accept from authoritative servers.",
    explanation: "It prevents unreasonably high TTLs from causing stale data. Default is 604800 seconds (7 days).",
    hint: "The librarian's rule: 'I will keep sticky notes for at most 1 week, no matter what the book says.'",
    level: "expert",
    codeExample: "max-cache-ttl 86400;"
  }
];

export default questions;