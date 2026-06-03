// topic4_files/topic4_questions.js
// 30 moderate-to-expert level questions about Recursive and Iterative DNS Queries

const questions = [
  {
    question: "What is the primary difference between a recursive and an iterative DNS query?",
    shortAnswer: "Recursive queries demand a complete answer from the server; iterative queries allow the server to return a referral.",
    explanation: "In a recursive query, the client expects the DNS server to fully resolve the domain name, following all referrals if necessary. In an iterative query, the DNS server returns the best answer it has (which may be a referral to another server), and the client is responsible for continuing the lookup.",
    hint: "Think of a recursive query as 'do it all for me' and an iterative query as 'tell me what you know, and I'll do the rest'.",
    level: "basic",
    codeExample: "dig +recurse google.com  # Recursive; dig +norecurse google.com  # Iterative"
  },
  {
    question: "What does the RD (Recursion Desired) flag in a DNS query indicate?",
    shortAnswer: "RD=1 tells the server that the client wants recursive service; RD=0 means the client will handle referrals itself.",
    explanation: "The RD bit is set by the client (stub resolver) in the query header. A recursive resolver that sees RD=1 will attempt to fully resolve the query. An authoritative-only server may ignore RD and return a referral or REFUSED. Setting RD=0 is used for debugging or when you want to test iterative behavior.",
    hint: "What flag would you set to tell a server 'give me the final answer or fail'?",
    level: "intermediate",
    codeExample: "dig +norecurse example.com  # Sets RD=0"
  },
  {
    question: "What is the RA (Recursion Available) flag in a DNS response?",
    shortAnswer: "RA=1 indicates that the server supports recursive queries; RA=0 means it does not (or recursion is disabled).",
    explanation: "When a server receives a query with RD=1, it may set RA=1 in the response if recursion is available. Public recursive resolvers (like 8.8.8.8) have RA=1. Authoritative-only servers (like root servers) have RA=0. Checking RA helps client know if recursion is possible.",
    hint: "Run 'dig google.com' and look for 'flags: qr rd ra' — RA indicates recursion available.",
    level: "intermediate",
    codeExample: "dig @8.8.8.8 google.com | grep 'flags:'  # Shows ra flag"
  },
  {
    question: "Why do stub resolvers typically use recursive queries instead of iterative?",
    shortAnswer: "Stub resolvers are minimal clients that don't implement the logic to follow referrals; they rely on a recursive resolver.",
    explanation: "A stub resolver (part of your OS) is designed to be lightweight. It cannot iterate through root, TLD, and authoritative servers. By sending a recursive query, it offloads all complexity to the recursive resolver (provided by ISP or public DNS). This simplifies network stacks on end devices.",
    hint: "Could your laptop handle following DNS referrals on its own? It would need a full resolver stack.",
    level: "basic",
    codeExample: "cat /etc/resolv.conf  # Stub resolver's configured recursive servers"
  },
  {
    question: "Can a recursive resolver send iterative queries?",
    shortAnswer: "Yes, that's exactly what it does when resolving a domain on behalf of a client.",
    explanation: "After receiving a recursive query from a stub resolver, the recursive resolver performs iterative queries to root, TLD, and authoritative servers. It follows referrals, caching each step. The iterative queries are sent with RD=0 (or sometimes RD=1, but typically iterative logic is used).",
    hint: "What kind of query does your ISP DNS send to root servers? Iterative.",
    level: "intermediate",
    codeExample: "dig +trace google.com  # Shows iterative steps from a recursive resolver perspective"
  },
  {
    question: "What is the RA flag on a root server response typically set to, and why?",
    shortAnswer: "RA=0 because root servers do not perform recursion for clients; they only return referrals.",
    explanation: "Root servers are authoritative-only for the root zone. They are not designed to handle recursive queries. If they allowed recursion, they would be overloaded by billions of clients. Their responses always have RA=0. Clients should not send recursive queries to root servers directly.",
    hint: "What would happen if everyone sent recursive queries to a.root-servers.net?",
    level: "basic",
    codeExample: "dig @a.root-servers.net google.com | grep 'flags:'  # RA=0"
  },
  {
    question: "What happens if you send a recursive query (RD=1) to an authoritative-only server?",
    shortAnswer: "The server typically returns a response with RA=0 and may return a referral or REFUSED.",
    explanation: "Authoritative servers (like ns1.google.com) have recursion disabled for security and performance. When they receive RD=1, they either ignore the recursion request (treat as iterative) or return REFUSED. According to RFC 1034, they should not perform recursion.",
    hint: "Try 'dig @ns1.google.com google.com +recurse' — what do you see?",
    level: "intermediate",
    codeExample: "dig @a.root-servers.net google.com +recurse  # Likely REFUSED or no answer"
  },
  {
    question: "What is a 'referral' in the context of iterative queries?",
    shortAnswer: "A referral is a response that contains NS records (and possibly glue) pointing to servers that are closer to the answer.",
    explanation: "When an iterative query is made to a server that does not have the answer (e.g., root server for a TLD), it responds with a referral — a list of nameservers that are authoritative for the next level. The client then sends iterative queries to those servers. Referrals are the mechanism of walking the DNS tree.",
    hint: "Why does a root server not just say 'I don't know'? It tells you where to ask next.",
    level: "intermediate",
    codeExample: "dig @a.root-servers.net google.com  # Shows referral to .com TLD"
  },
  {
    question: "How many iterative queries are typically needed to resolve a domain from scratch?",
    shortAnswer: "Typically 3-5: one to root, one to TLD, one to authoritative (plus any CNAME or glue lookups).",
    explanation: "A fresh resolution with no caching requires: query root → get referral to .com TLD; query .com TLD → get referral to example.com authoritative; query authoritative → get A record. That's 3 iterative queries. Additional queries may occur for glue resolution or CNAME chains.",
    hint: "Use 'dig +trace' to count the steps.",
    level: "intermediate",
    codeExample: "dig +trace example.com | grep -c '^;; Received'"
  },
  {
    question: "What is a 'recursion loop' and how is it prevented?",
    shortAnswer: "A recursion loop occurs when two resolvers forward queries to each other; resolvers detect it using query IDs or hop limits.",
    explanation: "If resolver A forwards to B, and B forwards back to A, a loop forms. Resolvers implement loop detection: they track query IDs, set maximum forwarding depth (usually 10-20), or check if the query returns to the same server. Loops cause endless queries and timeouts.",
    hint: "What would happen if you set your router's DNS to point to your PC and your PC to point to the router?",
    level: "expert",
    codeExample: "# Misconfiguration: forwarders { 192.168.1.1; }; on both devices"
  },
  {
    question: "Can a single DNS message contain both recursive and iterative elements?",
    shortAnswer: "No, a query is either recursive (RD=1) or not (RD=0). The response's RA flag indicates capability.",
    explanation: "The RD flag is a binary flag. However, the resolution process overall combines one recursive query (client to recursive resolver) with many iterative queries (resolver to authoritative servers). So the process has both, but each individual query is one or the other.",
    hint: "Is the query from browser to ISP DNS recursive? Is the query from ISP DNS to root iterative?",
    level: "basic",
    codeExample: "tcpdump -i any port 53  # Watch queries: some have RD=1, others RD=0"
  },
  {
    question: "What is an 'open resolver' and how does it relate to recursion?",
    shortAnswer: "An open resolver accepts recursive queries from any IP address on the internet, which is a security risk.",
    explanation: "Recursive resolvers should be configured to accept queries only from trusted networks (e.g., internal IP ranges). An open resolver allows anyone to use it. Attackers exploit open resolvers for DDoS amplification: they send small recursive queries with a spoofed victim IP, and the resolver sends large responses to the victim.",
    hint: "Why would an attacker want to use your DNS server?",
    level: "intermediate",
    codeExample: "nmap -sU -p 53 --script dns-recursion <target>  # Tests if open"
  },
  {
    question: "How do public DNS resolvers like 8.8.8.8 handle millions of recursive queries per second?",
    shortAnswer: "They use massive caching, anycast routing, and distributed server clusters with load balancers.",
    explanation: "Public resolvers have global anycast networks: 8.8.8.8 is the same IP worldwide but routes to the nearest data center. They aggressively cache (80-90% hit rates). They also implement rate limiting, query throttling, and dedicated hardware to handle high loads without degradation.",
    hint: "Why does 8.8.8.8 respond so quickly from anywhere in the world?",
    level: "expert",
    codeExample: "traceroute 8.8.8.8  # Likely few hops — nearby anycast node"
  },
  {
    question: "What does the 'tc' (truncated) flag mean in a DNS response during iterative resolution?",
    shortAnswer: "TC=1 indicates the response was truncated due to size limits, typically over UDP, and the query should be retried over TCP.",
    explanation: "During iterative queries, a response (e.g., from TLD server with many NS records and glue) may exceed 512 bytes (or the EDNS buffer size). The server sets TC=1 and sends a partial response. The client then re-sends the query over TCP (which has no size limit) to get the full answer.",
    hint: "Why might a response from .com TLD be too big for UDP?",
    level: "expert",
    codeExample: "dig +bufsize=400 large.domain.com  # May see TC flag"
  },
  {
    question: "How does a recursive resolver decide which server to query next when given multiple NS records?",
    shortAnswer: "It typically chooses based on RTT (round-trip time), preference order, and possibly prior performance.",
    explanation: "When a referral returns multiple nameservers, the resolver measures response times and sorts them. It may also use a round-robin or random selection to distribute load. Some resolvers implement latency-based selection, preferring faster servers for subsequent queries.",
    hint: "Why might different queries to the same domain use different authoritative servers?",
    level: "expert",
    codeExample: "# BIND uses 'sortlist' and 'prefer' options"
  },
  {
    question: "What is the difference between 'recursion desired' and 'recursion available'?",
    shortAnswer: "RD is set by the client to request recursion; RA is set by the server to indicate capability.",
    explanation: "RD (Recursion Desired) is a flag in the query header. RA (Recursion Available) is in the response header. A client sets RD=1 hoping the server will perform recursion. The server responds with RA=1 if it supports recursion, otherwise RA=0. A mismatch (RD=1, RA=0) may result in REFUSED or referral.",
    hint: "Which flag tells your browser that your ISP DNS can do recursion?",
    level: "basic",
    codeExample: "dig +recurse @127.0.0.1 example.com  # If no recursion, RA=0"
  },
  {
    question: "Can a recursive resolver cache negative responses (NXDOMAIN)?",
    shortAnswer: "Yes, negative caching is allowed and governed by the SOA minimum TTL field.",
    explanation: "When an authoritative server returns NXDOMAIN (domain does not exist), it includes a SOA record with a minimum TTL. The recursive resolver caches that negative answer for that duration. This prevents repeated queries for non-existent domains.",
    hint: "Why does your computer not repeatedly query a domain that doesn't exist?",
    level: "intermediate",
    codeExample: "dig nonexistent.example.com  # Look for SOA with negative TTL"
  },
  {
    question: "What is a 'prefetch' optimization in recursive resolvers?",
    shortAnswer: "Prefetch refreshes expiring cache entries before they expire, reducing latency for popular domains.",
    explanation: "When a cached record's TTL is about to expire (e.g., within 10% of TTL), the resolver proactively re-queries the authoritative server. This ensures that the cache never goes empty for popular records. Prefetch improves user experience by avoiding cache misses.",
    hint: "How can a resolver hide the latency of cache expiration?",
    level: "expert",
    codeExample: "# BIND option: prefetch 10  # Prefetch when TTL remaining < 10%"
  },
  {
    question: "What is the 'query minimization' technique in recursive resolvers?",
    shortAnswer: "Query minimization reduces privacy leaks by sending only the necessary labels to each DNS server, not the full domain.",
    explanation: "Instead of sending 'www.example.com' to the root server, it sends just '.com' to the root, then 'example.com' to .com TLD, etc. This prevents root servers from seeing the full domain you're trying to resolve. RFC 7816 standardizes this privacy feature.",
    hint: "Why might you not want the root server to know you're resolving 'www.sensitive-bank.com'?",
    level: "expert",
    codeExample: "# Unbound config: qname-minimisation: yes"
  },
  {
    question: "How does a recursive resolver handle a CNAME record during iteration?",
    shortAnswer: "It follows the CNAME by restarting the iterative process for the target domain, which may involve new referrals.",
    explanation: "When an authoritative server returns a CNAME (e.g., www.example.com CNAME example.com), the resolver must now resolve the target domain. This may require additional iterative queries, possibly to different authoritative servers. The resolver continues until it finds an A/AAAA record or hits a loop.",
    hint: "Does the resolver go back to root for the target domain? Possibly if target is in a different TLD.",
    level: "advanced",
    codeExample: "dig www.google.com  # Multiple CNAMEs: google.com → www.google.com →"
  },
  {
    question: "What is a 'recursive query storm' and how can it be mitigated?",
    shortAnswer: "A sudden surge of recursive queries (e.g., after cache flush) can overwhelm resolvers; mitigated by rate limiting and prefetch.",
    explanation: "If a popular domain's TTL expires simultaneously for many resolvers, all may query authoritative servers at once. This is a 'thundering herd' problem. Mitigations: jitter (randomized refresh), prefetch, and rate limiting on authoritative servers.",
    hint: "Why do DNS TTLs often have small random offsets?",
    level: "expert",
    codeExample: "# In authoritative server: rate-limit 100; # queries per second"
  },
  {
    question: "What is the role of the 'search' list in /etc/resolv.conf during recursive queries?",
    shortAnswer: "The stub resolver appends search domains to relative names before sending the recursive query.",
    explanation: "When you query 'mail' and have 'search example.com', the stub resolver first tries 'mail.example.com' recursively. Only after that fails does it try the name as given. This can cause extra recursive queries but saves typing for internal domains.",
    hint: "Why does 'ping myserver' sometimes take a long time?",
    level: "intermediate",
    codeExample: "cat /etc/resolv.conf | grep search"
  },
  {
    question: "How does DNS over HTTPS (DoH) affect recursive queries?",
    shortAnswer: "DoH encapsulates recursive DNS queries inside HTTPS sessions, hiding them from network inspection.",
    explanation: "With DoH, the stub resolver sends recursive queries over an encrypted HTTPS connection to a DoH server (e.g., Cloudflare 1.1.1.1). The queries are identical in logic (RD=1), but the transport is encrypted. This prevents ISPs from seeing or modifying your DNS queries.",
    hint: "Why might a school or office block DoH?",
    level: "intermediate",
    codeExample: "curl -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=example.com&type=A'"
  },
  {
    question: "What is a 'forwarding resolver' and how does it differ from a recursive resolver?",
    shortAnswer: "A forwarding resolver passes recursive queries to another resolver instead of performing iterative queries itself.",
    explanation: "A forwarder still accepts recursive queries from clients, but instead of doing iterative resolution, it sends the query (recursively) to an upstream resolver. This reduces load on the forwarder and centralizes logs. The forwarder also caches answers. Many corporate DNS servers act as forwarders to ISP DNS.",
    hint: "Why would a large company not want each internal DNS server to query root directly?",
    level: "intermediate",
    codeExample: "# In BIND: forwarders { 8.8.8.8; }; forward only;"
  },
  {
    question: "What happens if a recursive resolver's cache becomes poisoned with a fake record?",
    shortAnswer: "It will return the fake record to clients until the TTL expires or the cache is flushed, causing misdirection.",
    explanation: "Cache poisoning attacks inject bogus records (e.g., google.com → malicious IP). The recursive resolver then serves that bad data. DNSSEC prevents this by validating signatures. Without DNSSEC, flushing the cache or restarting the resolver is the only recovery.",
    hint: "Why is it important to restrict recursion to trusted sources?",
    level: "expert",
    codeExample: "rndc flush  # Clears resolver cache on BIND"
  },
  {
    question: "How does a recursive resolver handle a query for a domain that uses a CNAME pointing to another domain in a different TLD?",
    shortAnswer: "It repeats the iterative process from the root (or from cached TLD) for the new target domain.",
    explanation: "Example: 'short.link' CNAME to 'example.com'. After receiving the CNAME, the resolver goes back to the root to find .com TLD, then .com TLD to find example.com authoritative, then gets A record. This can double resolution time.",
    hint: "Why would you avoid CNAME across TLDs for performance-critical domains?",
    level: "advanced",
    codeExample: "dig CNAME bit.ly  # Many CNAME chains across TLDs"
  },
  {
    question: "What is the difference between 'recursive', 'iterative', and 'non-recursive' queries?",
    shortAnswer: "Recursive: server must answer fully. Iterative: server gives referral. Non-recursive: server answers only from its cache (no recursion).",
    explanation: "Non-recursive is a subset of iterative: the server returns a direct answer only if it has it in cache or if it is authoritative. Otherwise, it returns a referral (iterative) or nothing. Some definitions consider iterative and non-recursive as synonymous.",
    hint: "Run 'dig +norecurse' and compare with 'dig +recurse'.",
    level: "intermediate",
    codeExample: "dig +norecurse @8.8.8.8 google.com  # Returns cached answer or nothing"
  },
  {
    question: "How does a recursive resolver implement 'stale cache' serving?",
    shortAnswer: "It can serve expired cache entries while fetching fresh data in the background (stale-while-revalidate).",
    explanation: "Instead of blocking the query while waiting for a refresh, the resolver returns stale (expired) data immediately and asynchronously updates the cache. This hides refresh latency. The 'stale-while-revalidate' extension is common in CDNs and forwarders.",
    hint: "Why might you accept slightly stale DNS data?",
    level: "expert",
    codeExample: "# BIND option: stale-cache-enable yes; stale-answer-ttl 3600;"
  },
  {
    question: "What is a 'recursion quota' and why is it used?",
    shortAnswer: "A recursion quota limits how many recursive queries a resolver will perform in a given timeframe, preventing abuse.",
    explanation: "To prevent a single client from overloading the resolver, administrators set recursion quotas (e.g., max 100 queries per second per IP). Exceeding the quota results in REFUSED responses. This mitigates DDoS attacks and misconfigured applications.",
    hint: "What does a resolver do when it's being flooded with queries from one IP?",
    level: "expert",
    codeExample: "# In BIND: rate-limit { responses-per-second 50; };"
  },
  {
    question: "How does edns-client-subnet (ECS) work with recursive resolvers?",
    shortAnswer: "ECS passes a portion of the client's IP address to authoritative servers for geo-location optimization.",
    explanation: "Normally, authoritative servers see only the recursive resolver's IP (e.g., 8.8.8.8). ECS adds a subnet prefix (e.g., /24) of the original client, allowing CDNs to return region-specific IPs. Controversial for privacy, but improves routing.",
    hint: "Why might a website return a server in Mumbai for a client in Kolkata?",
    level: "expert",
    codeExample: "# Unbound: send-client-subnet 192.0.2.0/24"
  },
  {
    question: "What is the 'RDATA' field in a DNS response during iterative resolution?",
    shortAnswer: "RDATA is the variable-length data portion of a resource record (e.g., IP address for A record, domain for CNAME).",
    explanation: "In iterative responses, RDATA contains the referral domain for NS records, the IP for glue, or the answer for A/AAAA. Different record types have different RDATA structures. Parsing RDATA correctly is essential for following referrals.",
    hint: "Why does an NS record's RDATA contain a domain name, not an IP?",
    level: "expert",
    codeExample: "dig google.com NS +multiline  # Shows RDATA field"
  }
];

export default questions;