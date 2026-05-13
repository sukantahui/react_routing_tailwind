// topic2_files/topic2_questions.js
// 30 moderate-to-expert level questions about DNS resolution process

const questions = [
  {
    question: "What is the first step a browser takes when you type a domain name like 'example.com'?",
    shortAnswer: "It checks its local DNS cache to see if it already knows the IP address.",
    explanation: "Before any network query, the browser (and the operating system's stub resolver) consults a short-term cache. If the domain was recently visited, the cached IP address is used immediately, making page load nearly instant. This caching respects the TTL returned by previous queries.",
    hint: "Why does re-visiting a website feel faster?",
    level: "basic",
    codeExample: "chrome://net-internals/#dns  # View Chrome's DNS cache"
  },
  {
    question: "Explain the difference between a recursive DNS query and an iterative DNS query.",
    shortAnswer: "Recursive: the server must return a complete answer (or error). Iterative: the server returns the best answer it knows, possibly a referral.",
    explanation: "Your stub resolver sends a recursive query to the configured recursive resolver, demanding a final answer. That recursive resolver then performs iterative queries to root, TLD, and authoritative servers, following referrals. In iterative mode, each server responds with a referral to the next server, and the client continues the search.",
    hint: "Which one is like 'go find me the answer' vs 'here's the next person to ask'?",
    level: "intermediate",
    codeExample: "dig +recurse example.com   # Forces recursive mode"
  },
  {
    question: "How many root server clusters exist? Why are they critical?",
    shortAnswer: "There are 13 logical root server families (named A through M), operated by different organizations worldwide.",
    explanation: "The root servers are the entry point for global DNS resolution. They don't store domain records but point to TLD nameservers (e.g., .com, .org). Despite only 13 IP addresses, anycast routing makes hundreds of physical servers. Without root servers, no domain could be resolved from scratch.",
    hint: "Try 'dig . NS' to see the root servers.",
    level: "intermediate",
    codeExample: "dig +trace example.com | head -5   # Shows root servers contacted"
  },
  {
    question: "What is a 'referral' in DNS?",
    shortAnswer: "A referral is a response that doesn't contain the answer but points the resolver to another set of nameservers that are closer to the answer.",
    explanation: "When a resolver asks a root server for 'example.com', the root responds with NS records for .com TLD servers (a referral). The resolver then queries those TLD servers, which may return another referral to example.com's authoritative servers. Referrals ultimately lead to the authoritative answer.",
    hint: "Referrals are like signs on a highway: 'Next exit for .com nameservers'.",
    level: "intermediate",
    codeExample: "dig +trace google.com   # Watch referrals"
  },
  {
    question: "What happens if a recursive resolver's cache has an expired TTL for a domain?",
    shortAnswer: "It discards the expired entry and re-performs the full resolution process (starting from root or from cached NS records).",
    explanation: "TTL (Time to Live) tells caches how long to keep a record. After TTL expires, the resolver treats the record as stale and must fetch a fresh answer. However, many resolvers may continue to use stale data while refreshing in background (stale-while-revalidate). Proper TTL management balances freshness and performance.",
    hint: "If a website changes IP, why don't all users see it immediately?",
    level: "intermediate",
    codeExample: "dig example.com +ttlid   # Shows TTL values"
  },
  {
    question: "What is the purpose of the 'NS' record in a TLD server's response?",
    shortAnswer: "The NS record indicates which name servers are authoritative for the domain, delegating responsibility for answering further queries.",
    explanation: "For the domain 'example.com', the .com TLD server doesn't have the A record; it has NS records pointing to nameservers that do (like ns1.example.com). This delegation is the core of DNS hierarchy. The resolver then queries those NS servers to get the actual A record.",
    hint: "Who actually knows the IP address for 'google.com'? Not the .com TLD.",
    level: "basic",
    codeExample: "dig NS google.com +short   # Shows authoritative nameservers"
  },
  {
    question: "What is a 'glue record' and why is it needed in the resolution process?",
    shortAnswer: "A glue record provides an IP address for a nameserver that is inside the domain being resolved, breaking the circular dependency.",
    explanation: "If example.com's authoritative nameserver is ns1.example.com, then to resolve example.com you need ns1.example.com's IP. That IP is stored in the parent zone (.com) as glue. Without glue, a resolver would be stuck in an infinite loop. Glue records are returned in referrals.",
    hint: "How do you find the IP of ns1.example.com if example.com's own records need that IP?",
    level: "expert",
    codeExample: "dig +trace example.com 2>&1 | grep -i glue"
  },
  {
    question: "Explain the role of the stub resolver in the resolution process.",
    shortAnswer: "The stub resolver (part of the OS) sends recursive queries to a configured recursive resolver and caches results briefly.",
    explanation: "The stub resolver is a minimal DNS client. It doesn't know how to contact root servers; it depends on an external recursive resolver (like your router or 8.8.8.8). When you type a domain, the stub resolver sends a recursive query and waits for a complete answer. It also maintains a small cache.",
    hint: "Your laptop's /etc/resolv.conf lists the recursive resolvers for the stub resolver.",
    level: "basic",
    codeExample: "cat /etc/resolv.conf   # Shows recursive resolver IPs"
  },
  {
    question: "What is the maximum number of root servers physically?",
    shortAnswer: "There are over 1,300 physical root server instances due to anycast routing, but only 13 logical IP addresses.",
    explanation: "Each of the 13 root server families (A to M) uses anycast: many physical servers share the same IP address. A query goes to the nearest instance. This provides global distribution, redundancy, and load balancing while keeping the root zone small.",
    hint: "The number 13 is a protocol limitation (UDP packet size).",
    level: "expert",
    codeExample: "dig +nssearch .   # Shows root server addresses"
  },
  {
    question: "What is the difference between 'forwarding' and 'recursive' resolvers?",
    shortAnswer: "A recursive resolver performs full resolution itself; a forwarding resolver passes queries to another recursive resolver.",
    explanation: "In corporate networks, internal DNS servers often forward queries to ISP or public DNS (forwarding) instead of resolving from root. This centralizes logging and filtering. A pure recursive resolver contacts root, TLD, and authoritative servers directly. Forwarders can also chain requests.",
    hint: "Which one reduces outbound DNS traffic from a large network?",
    level: "intermediate",
    codeExample: "# In BIND config: forwarders { 8.8.8.8; };"
  },
  {
    question: "What happens if a recursive resolver gets no response from a root server?",
    shortAnswer: "It tries another root server from its list; if all fail, it returns SERVFAIL to the client.",
    explanation: "Recursive resolvers maintain a list of root server IPs (root hints). If a root is unreachable, they move to the next. Persistent root failures are rare due to anycast. If no root responds, the resolver cannot resolve any domain and returns a SERVFAIL error.",
    hint: "Why is having 13 root server families important for fault tolerance?",
    level: "intermediate",
    codeExample: "dig +trace +timeout=1 example.com   # Simulates timeouts"
  },
  {
    question: "What is the purpose of the 'A' record in the final step of resolution?",
    shortAnswer: "The A record maps a domain name to an IPv4 address, which the resolver returns to the client.",
    explanation: "After following referrals, the resolver queries the authoritative server for an A record (or AAAA for IPv6). That record contains the IP address. The resolver caches it and returns it to the stub resolver, which passes it to the browser to establish a connection.",
    hint: "Without an A record, a domain name would have no IP address, so the site would be unreachable.",
    level: "basic",
    codeExample: "dig A example.com +short   # Returns IP address"
  },
  {
    question: "Explain the concept of 'negative caching' in DNS resolution.",
    shortAnswer: "Negative caching stores the fact that a domain or record type does not exist (NXDOMAIN or NXRRSET), as per the SOA minimum TTL.",
    explanation: "If a resolver queries for a non-existent domain, the authoritative server returns NXDOMAIN and includes a SOA record with a negative TTL. The resolver caches this negative result, preventing repeated failed queries. This reduces load and speeds up error handling.",
    hint: "Why doesn't your browser repeatedly try to resolve a typoed domain?",
    level: "expert",
    codeExample: "dig nonexistent.example.com   # Notice SOA with negative TTL"
  },
  {
    question: "How does DNS resolution handle CNAME records?",
    shortAnswer: "When an authoritative server returns a CNAME, the resolver follows it by making a new query for the target domain.",
    explanation: "If 'www.example.com' is a CNAME to 'example.com', the resolver first gets the CNAME, then restarts the resolution process for 'example.com' (which may involve new referrals if different zones). The final answer is the A record of the target. This chaining can be up to 10 hops.",
    hint: "Why might a CNAME cause an extra round trip in resolution?",
    level: "intermediate",
    codeExample: "dig CNAME www.github.com   # Shows chain"
  },
  {
    question: "What is the significance of the 'RA' (Recursion Available) flag in a DNS response?",
    shortAnswer: "The RA flag indicates whether the DNS server supports recursive queries for the client.",
    explanation: "When you send a query with the RD (Recursion Desired) flag, the server sets RA in the response if it can perform recursion. Most public resolvers (like 8.8.8.8) set RA=1. Authoritative-only servers set RA=0 and will return referrals instead of recursive answers.",
    hint: "What happens if you send a recursive query to an authoritative-only server?",
    level: "expert",
    codeExample: "dig +recurse @8.8.8.8 example.com   # Works; @ns1.example.com may not"
  },
  {
    question: "Explain how a recursive resolver uses 'root hints'.",
    shortAnswer: "Root hints are a built-in list of root server IP addresses that the resolver uses to bootstrap the resolution process.",
    explanation: "When a recursive resolver starts or has an empty cache, it needs to know how to contact root servers. The root hints file (named.root) contains IPs of all 13 root families. The resolver then queries one of these to begin iterative resolution. Hints are periodically updated but change rarely.",
    hint: "Where does the resolver get the first IP to ask?",
    level: "intermediate",
    codeExample: "dig . NS +short   # Current root server list"
  },
  {
    question: "What is the purpose of EDNS (Extension Mechanisms for DNS) in resolution?",
    shortAnswer: "EDNS allows DNS messages larger than 512 bytes, supports DNSSEC, and adds options like client subnet.",
    explanation: "Without EDNS, UDP DNS responses are limited to 512 bytes. EDNS enables negotiation of larger buffer sizes (up to 4096 bytes) and adds flags. DNSSEC signatures often exceed 512 bytes, so EDNS is mandatory for DNSSEC. Also, EDNS Client Subnet (ECS) helps geo-location.",
    hint: "Why does DNSSEC usually require EDNS?",
    level: "expert",
    codeExample: "dig +bufsize=4096 example.com   # Uses EDNS"
  },
  {
    question: "What is a 'SERVFAIL' response and what common issues cause it?",
    shortAnswer: "SERVFAIL indicates that the DNS server encountered an internal error or could not reach authoritative servers.",
    explanation: "Common causes: broken delegation, unreachable authoritative servers, DNSSEC validation failure, or misconfigured root hints. Unlike NXDOMAIN (domain doesn't exist), SERVFAIL means the resolver tried but failed to get a definitive answer.",
    hint: "If you see SERVFAIL, check if your resolver can reach the internet.",
    level: "intermediate",
    codeExample: "dig @localhost nonexistent  # Might return SERVFAIL if local resolver misconfigured"
  },
  {
    question: "How does DNS resolution handle internationalized domain names (IDNs) like 'münchen.de'?",
    shortAnswer: "The domain is converted to punycode (xn--mnchen-3ya.de) before DNS resolution; the process is identical to ASCII names.",
    explanation: "DNS protocol only supports ASCII. The browser converts the Unicode domain to punycode (RFC 3492) before passing it to the stub resolver. From then on, resolution works exactly as for ASCII names. The punycode form is stored in DNS records.",
    hint: "What does 'xn--' at the beginning of a domain name indicate?",
    level: "expert",
    codeExample: "dig xn--mnchen-3ya.de   # Resolves münchen.de"
  },
  {
    question: "What is the purpose of the 'additional section' in a DNS response during resolution?",
    shortAnswer: "It contains glue records (IP addresses for nameservers) to avoid additional queries.",
    explanation: "When a response includes NS records (referral), the additional section may include A/AAAA records for those nameservers if they are needed to continue resolution. This optimization reduces the number of round trips. For in-domain nameservers, glue is mandatory.",
    hint: "Why does a referral to 'ns1.example.com' often include an IP address?",
    level: "expert",
    codeExample: "dig +recurse +additional example.com   # Show additional records"
  },
  {
    question: "Explain the 'trace' command in dig. How does it simulate resolution?",
    shortAnswer: "dig +trace starts from root servers and iteratively follows referrals, showing each step without using cache.",
    explanation: "It bypasses the local resolver and directly queries root servers using the root hints file. Then it follows referrals, printing each query and response. This is invaluable for debugging delegation and seeing the actual resolution path. It does not use caching, so it's slow but accurate.",
    hint: "Why might you use +trace instead of a normal dig?",
    level: "intermediate",
    codeExample: "dig +trace google.com   # Shows each step"
  },
  {
    question: "What is the difference between the root zone and the root servers?",
    shortAnswer: "The root zone is the data (the file), while root servers are the physical/anycast instances that serve that zone.",
    explanation: "The root zone is the top-level DNS database maintained by IANA, containing NS records for all TLDs. Root servers are the infrastructure that answers queries by providing that zone data. There are 13 root server families, but the zone file is identical across all.",
    hint: "Which changes more often: root servers IP addresses or the root zone content?",
    level: "expert",
    codeExample: "dig . NS   # Returns root servers that serve the root zone"
  },
  {
    question: "How long does a typical DNS resolution take (first time vs cached)?",
    shortAnswer: "First uncached resolution: 20–200ms (typically 50ms). Cached resolution: <1ms (often 0.5ms).",
    explanation: "First resolution involves multiple round trips: to root (~20ms), to TLD (~20ms), to authoritative (~20ms) = 60ms plus processing. With caching, the resolver returns the answer from local RAM, taking microseconds. This is why DNS changes propagate slowly but browsing is fast.",
    hint: "Why does flushing DNS cache cause a temporary slowdown?",
    level: "basic",
    codeExample: "time dig google.com   # Compare first and second run"
  },
  {
    question: "What is the role of the 'TTL' in the resolution process?",
    shortAnswer: "TTL tells caches how many seconds to keep a record before re-querying authoritative servers.",
    explanation: "After a resolver caches a record, it honors the TTL. When TTL expires, the record is considered stale. The resolver may then refresh it (proactively or on next query). Low TTL (e.g., 300s) is used for dynamic records; high TTL (86400s) for stable records.",
    hint: "If you plan to change your website's IP, should you lower TTL beforehand?",
    level: "intermediate",
    codeExample: "dig example.com | grep 'TTL'"
  },
  {
    question: "What happens when a recursive resolver receives a query for a domain that is its own zone?",
    shortAnswer: "If the resolver is also authoritative for that zone, it answers directly from its authoritative data, not via recursion.",
    explanation: "Many resolvers (like BIND) can be both recursive and authoritative for different zones (split-view). For zones it is authoritative for, it returns the answer without performing recursion. This is common in internal corporate DNS.",
    hint: "Can your home router be authoritative for 'home.lan'?",
    level: "expert",
    codeExample: "dig @127.0.0.1 mypc.home.lan   # If local server authoritative for home.lan"
  },
  {
    question: "Explain how DNS resolution works over a VPN connection.",
    shortAnswer: "The VPN typically pushes a DNS server (often the internal corporate resolver) and may force all DNS queries through the VPN tunnel.",
    explanation: "When you connect to a VPN, your network settings are updated: the VPN interface gets a new DNS server. The stub resolver sends queries to that server, which can resolve internal domains (e.g., 'hr.corp'). For external domains, the corporate resolver may forward to public DNS or resolve normally.",
    hint: "Why can you access internal company websites only when VPN is on?",
    level: "intermediate",
    codeExample: "nslookup internal.corp  # Only works when VPN is connected"
  },
  {
    question: "What is the significance of the 'QR' bit in a DNS message during resolution?",
    shortAnswer: "QR (Query Response) bit distinguishes between a query (0) and a response (1).",
    explanation: "Every DNS message has a header. QR=0 for queries (from client to server); QR=1 for responses. This allows the recipient to know the nature of the packet. During resolution, the stub resolver sends QR=0, recursive resolver sends QR=0 to root servers, and each response has QR=1.",
    hint: "How does a server know if an incoming packet is a new query or a response?",
    level: "expert",
    codeExample: "tcpdump -v -i any port 53   # Observe DNS headers, includes QR flag"
  },
  {
    question: "What is 'DNS prefetching' and how does it affect resolution timing?",
    shortAnswer: "DNS prefetching is performed by browsers to resolve domain names on linked resources before the user clicks, reducing perceived latency.",
    explanation: "When you load a webpage, the browser parses all links and initiates speculative DNS resolutions for those domains. By the time you click, the IP is often already cached. This can be controlled via 'X-DNS-Prefetch-Control' header. However, it may cause privacy leaks.",
    hint: "Why does a site feel faster after the first visit, even if browser cache is cleared?",
    level: "intermediate",
    codeExample: "<link rel='dns-prefetch' href='//example.com'>   # Hint to browser"
  },
  {
    question: "How does a recursive resolver handle a query for a domain that uses 'CNAME flattening'?",
    shortAnswer: "CNAME flattening (or ANAME) replaces CNAME at the zone level; the resolver sees only an A record, avoiding extra queries.",
    explanation: "Some DNS providers (Cloudflare, ALIAS records) automatically resolve the CNAME target and return the final IP address directly, acting like an A record. This allows apex domains (example.com) to effectively CNAME to another domain, bypassing the CNAME restriction. The resolver never sees the CNAME.",
    hint: "How can 'example.com' point to 'something.herokuapp.com' without breaking other records?",
    level: "expert",
    codeExample: "dig example.com   # Returns IP, not CNAME, despite configuration"
  },
  {
    question: "Explain what a 'DNS resolver deadlock' is and how it is avoided.",
    shortAnswer: "Deadlock can occur if two resolvers depend on each other to resolve a domain (cyclic dependency). It's avoided by using glue records and separate resolver paths.",
    explanation: "If ns1.example.com uses a nameserver that itself is under example.com, and no glue, a resolver would be stuck. Glue breaks the cycle. Also, circular forwarding (resolver A points to B, B points to A) can cause loops; resolvers have loop detection.",
    hint: "What happens if you set your DNS server to 127.0.0.1 and also configure it to forward to itself?",
    level: "expert",
    codeExample: "# Not easily demonstrable; configuration error scenario"
  }
];

export default questions;