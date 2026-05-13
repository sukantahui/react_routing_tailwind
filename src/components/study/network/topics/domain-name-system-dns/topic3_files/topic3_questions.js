// topic3_files/topic3_questions.js
// 30 moderate-to-expert level questions about Types of DNS Servers

const questions = [
  {
    question: "What is the primary function of a recursive DNS resolver?",
    shortAnswer: "To accept recursive queries from clients and fully resolve domain names by contacting other DNS servers.",
    explanation: "A recursive resolver (or recursor) handles the entire resolution process on behalf of the client. It queries root servers, TLD servers, and authoritative servers, caches the answer, and returns the final IP address. Without recursion, every client would need to implement iterative resolution, which is impractical.",
    hint: "Think of a travel agent who books flights, hotels, and transfers for you.",
    level: "basic",
    codeExample: "dig google.com  # Your configured recursive resolver will respond"
  },
  {
    question: "How many root server families exist, and why is that number fixed?",
    shortAnswer: "13 logical root server families (A-M) due to limitations in UDP packet size (512 bytes) for root responses.",
    explanation: "The original DNS specification limited UDP messages to 512 bytes. A root response containing NS records for all TLDs with associated glue fits within 512 bytes when using 13 servers. More than 13 would exceed the limit. Today, EDNS allows larger packets, but the number remains 13 for historical and operational reasons.",
    hint: "Each root server family has many physical instances (anycast). Number 13 is a protocol constraint.",
    level: "expert",
    codeExample: "dig . NS +short | wc -l  # Shows 13"
  },
  {
    question: "Can a TLD server directly return an A record for a domain?",
    shortAnswer: "No, TLD servers only return NS records (delegations) for second-level domains, not A records.",
    explanation: "The TLD zone (.com, .org, etc.) contains NS records pointing to authoritative nameservers for each registered domain. It does not contain A records. An A record can only be obtained from the domain's authoritative servers. This design distributes authority and reduces TLD server load.",
    hint: "If you ask .com servers for 'google.com A', they'll respond with a referral, not an IP.",
    level: "intermediate",
    codeExample: "dig @a.gtld-servers.net google.com A  # Returns NS record, not A"
  },
  {
    question: "What is the difference between a primary (master) and secondary (slave) authoritative server?",
    shortAnswer: "Primary holds the original zone file and allows updates; secondary replicates from primary and provides redundancy.",
    explanation: "Primary nameservers are the source of truth where DNS records are edited. Secondary servers pull the zone data via zone transfer (AXFR/IXFR) and serve read-only answers. Having multiple secondaries provides high availability and load distribution. Secondaries are also authoritative because they serve the same zone data.",
    hint: "If you update a record on the primary, secondaries must be notified.",
    level: "intermediate",
    codeExample: "dig SOA example.com +short  # Shows primary nameserver"
  },
  {
    question: "Why are recursive resolvers often run by ISPs or third parties like Google/Cloudflare?",
    shortAnswer: "Running a recursive resolver requires infrastructure, caching, and maintenance; ISPs provide it as a service to customers.",
    explanation: "Individual users could run their own recursive resolver, but it would increase latency (no cache) and complexity. ISP resolvers benefit from massive caching across many users, reducing upstream queries. Public resolvers like 8.8.8.8 offer privacy, speed, and reliability.",
    hint: "What would happen if every home router did full recursion from root?",
    level: "basic",
    codeExample: "cat /etc/resolv.conf  # Shows your recursive resolver IP"
  },
  {
    question: "What is a 'stealth' or 'hidden' authoritative nameserver?",
    shortAnswer: "A hidden master nameserver that is not listed in NS records but pushes updates to public secondaries.",
    explanation: "The NS records point only to secondary servers. The primary (hidden master) is not publicly queried, reducing attack surface. The hidden master pushes zone updates to the secondaries via NOTIFY and AXFR. This is common in large organizations to secure the master.",
    hint: "Why would you hide your primary nameserver?",
    level: "expert",
    codeExample: "# BIND config: also-notify { 192.0.2.10; }; # hidden master"
  },
  {
    question: "How does anycast routing benefit root and TLD servers?",
    shortAnswer: "Anycast allows multiple physical servers to share the same IP address, routing clients to the nearest instance.",
    explanation: "All 13 root server families use anycast. A query to 198.41.0.4 (a.root-servers.net) goes to the closest physical server, reducing latency and providing automatic failover. Anycast also distributes load and mitigates DDoS attacks because traffic is spread across many instances.",
    hint: "Why does 'a.root-servers.net' have different IPs in different continents? Same IP, different routing.",
    level: "expert",
    codeExample: "traceroute a.root-servers.net  # May show few hops (local instance) or many"
  },
  {
    question: "What is the purpose of the SOA record on an authoritative server?",
    shortAnswer: "SOA (Start of Authority) identifies the primary nameserver, admin email, serial number, and timing parameters for the zone.",
    explanation: "Every DNS zone must have exactly one SOA record. It is used for zone transfers (serial number comparison) and negative caching (minimum TTL). The SOA is stored only on authoritative servers, not on recursive resolvers (though resolvers may cache it briefly).",
    hint: "What field in SOA do secondaries check to know if the zone has changed?",
    level: "intermediate",
    codeExample: "dig SOA example.com +short"
  },
  {
    question: "Can a recursive resolver be also authoritative for some domains?",
    shortAnswer: "Yes, it's called 'split-horizon' or 'split-view' DNS, but must be configured carefully to avoid conflicts.",
    explanation: "BIND and other DNS software can serve both recursive and authoritative functions. For example, an internal DNS server may be authoritative for 'company.local' and recursive for external domains. However, misconfiguration can cause security issues (recursive queries leaking internal data).",
    hint: "Why should public-facing recursive resolvers never be authoritative for any domain?",
    level: "expert",
    codeExample: "# In BIND: recursion yes; zone 'company.local' { type master; };"
  },
  {
    question: "What is an 'open resolver' and why is it dangerous?",
    shortAnswer: "An open resolver accepts recursive queries from any IP address, making it vulnerable to DDoS amplification attacks.",
    explanation: "Many home routers or misconfigured servers allow recursion from the entire internet. Attackers can send forged queries with a victim's IP as source, causing the resolver to send large responses to the victim (amplification factor 50-100x). Best practice: restrict recursion to trusted networks only.",
    hint: "Check if your resolver is open: dig @your-ip google.com from external network.",
    level: "intermediate",
    codeExample: "nmap -sU -p 53 --script dns-recursion <target>"
  },
  {
    question: "How do TLD servers handle internationalized domain names (IDNs) like 'xn--'?",
    shortAnswer: "TLD servers store punycode forms (starting with xn--). Resolution works exactly as for ASCII names.",
    explanation: "The TLD zone only knows the punycode representation. For 'müller.com', the .com TLD has an NS record for 'xn--mller-kva.com'. The resolver never sees the Unicode form. This allows IDNs without changing DNS protocol.",
    hint: "What does 'xn--' indicate in a domain name?",
    level: "expert",
    codeExample: "dig xn--mller-kva.com NS  # Queries .com TLD for German müller.com"
  },
  {
    question: "What is the function of the 'NS' record at the root zone?",
    shortAnswer: "The root zone NS records point to the TLD nameservers (e.g., for .com, .org, .in).",
    explanation: "The root zone file maintained by IANA contains NS records for every top-level domain. When a recursive resolver queries a root server, the response includes NS records for the requested TLD. There is no A/AAAA at the root zone except for glue of root servers themselves.",
    hint: "How does a root server know where to find .com servers? Via NS records in the root zone.",
    level: "intermediate",
    codeExample: "dig com NS  # Queries root for .com TLD servers"
  },
  {
    question: "Why do authoritative servers sometimes respond with a CNAME instead of an A record?",
    shortAnswer: "Canonical Name (CNAME) records redirect the query to another domain name, whose A record is then resolved.",
    explanation: "Authoritative servers may return a CNAME when the domain is an alias (e.g., www.example.com CNAME example.com). The resolver must then restart resolution for the target domain. This can involve different authoritative servers. CNAMEs cannot coexist with other records at the same name.",
    hint: "If a CNAME points to another domain, which authoritative server provides the final IP?",
    level: "intermediate",
    codeExample: "dig CNAME www.github.com  # Shows alias to github.map.fastly.net"
  },
  {
    question: "What is the difference between a recursive resolver's cache and an authoritative server's database?",
    shortAnswer: "Cache is temporary (TTL-based) and stores answers from many domains; authoritative database is permanent and contains only its own zone.",
    explanation: "Recursive resolvers maintain a cache of previously resolved records from various domains, which expires according to TTL. Authoritative servers have a zone file (or backend database) that is the source of truth for specific domains. The authoritative data does not expire until manually changed.",
    hint: "Why does flushing a recursive resolver's cache not affect authoritative data?",
    level: "basic",
    codeExample: "rndc flush  # Clears recursive cache; authoritative NS unchanged"
  },
  {
    question: "What is the role of the 'glue' record in a TLD server's response?",
    shortAnswer: "Glue records provide IP addresses for nameservers that are within the domain being delegated, to avoid circular dependencies.",
    explanation: "When delegating example.com to ns1.example.com, the TLD server includes the IP address of ns1.example.com in the additional section (glue). Without glue, the resolver would need example.com's IP to find ns1.example.com — impossible. Glue is stored in the parent zone.",
    hint: "Look at a TLD response for a domain with in-domain nameservers: you'll see extra A records.",
    level: "expert",
    codeExample: "dig NS example.com +additional"
  },
  {
    question: "How does a recursive resolver choose which TLD server to query when multiple are returned?",
    shortAnswer: "It typically selects based on RTT (round-trip time) and prior performance, preferring the fastest.",
    explanation: "Recursive resolvers implement sorting and selection algorithms. They measure response times over time and may keep a latency table. Some resolvers also prioritize servers that sent glue records. This is implementation-specific but generally aims to minimize resolution time.",
    hint: "Why might two different resolvers get different IPs for the same domain?",
    level: "expert",
    codeExample: "# BIND uses 'sortlist' and query-source options"
  },
  {
    question: "Can a TLD server be authoritative for a domain?",
    shortAnswer: "No, TLD servers are authoritative only for the TLD zone (e.g., .com), not for second-level domains.",
    explanation: "Authoritative means the server has the complete zone data. TLD servers have data for .com but not for example.com. They delegate example.com to other nameservers. So they are not authoritative for example.com. The term 'authoritative' is zone-specific.",
    hint: "If you query a TLD server for example.com A, it won't answer authoritatively.",
    level: "intermediate",
    codeExample: "dig @a.gtld-servers.net example.com SOA  # Does not have SOA for example.com"
  },
  {
    question: "What is a 'forwarder' in DNS and how does it differ from a recursive resolver?",
    shortAnswer: "A forwarder passes queries to another recursive resolver instead of resolving from root itself.",
    explanation: "In a corporate network, you might configure internal DNS servers to forward all external queries to an ISP's recursive resolver. This reduces outbound queries, allows centralized logging, and can bypass firewall restrictions. The forwarder still caches responses but offloads the iterative work.",
    hint: "Why would a large campus not want every internal DNS server to contact root servers directly?",
    level: "intermediate",
    codeExample: "# In named.conf: forwarders { 8.8.8.8; };"
  },
  {
    question: "How does DNSSEC affect authoritative servers differently from recursive resolvers?",
    shortAnswer: "Authoritative servers sign records with private keys; recursive resolvers validate signatures using public keys.",
    explanation: "DNSSEC requires authoritative servers to generate RRSIG records and store DNSKEY records. Recursive resolvers must implement validation, checking signatures and keys up to a trust anchor. Without validation on recursors, DNSSEC provides no benefit. Many public recursors now validate by default.",
    hint: "Can a domain use DNSSEC if its authoritative server doesn't support it? No.",
    level: "expert",
    codeExample: "dig +dnssec example.com  # Shows RRSIG if DNSSEC enabled"
  },
  {
    question: "Why do some organizations run their own recursive resolvers instead of using ISP DNS?",
    shortAnswer: "For privacy (logs not shared with ISP), performance (custom caching), and security (filtering, blocking malware domains).",
    explanation: "Running a private recursive resolver (e.g., on a Pi-hole or Unbound) allows control over logging, DNSSEC validation, and blocklists. It also avoids ISP tracking or DNS hijacking. However, it requires maintenance and can have slower initial queries.",
    hint: "If you're concerned about your ISP seeing every site you visit, what can you do?",
    level: "intermediate",
    codeExample: "# Install unbound on your own server"
  },
  {
    question: "What is the 'RD' (Recursion Desired) flag in a DNS query and how do servers handle it?",
    shortAnswer: "RD bit indicates whether the client wants recursive service. Recursive resolvers honor it; authoritative servers ignore or reject.",
    explanation: "Stub resolvers always set RD=1. A recursive resolver with RA=1 will attempt recursion. An authoritative-only server (RA=0) will ignore RD and return a referral (or REFUSED) when RD=1. RD=0 is used for debugging or when you want only a non-recursive response.",
    hint: "What happens if you set RD=0 to a recursive resolver? It will REFUSE or return local data only.",
    level: "expert",
    codeExample: "dig +norecurse example.com  # Sets RD=0"
  },
  {
    question: "How does an authoritative server handle a query for a domain it is not authoritative for?",
    shortAnswer: "If configured to allow recursion, it may forward or answer from cache; otherwise it returns a referral or REFUSED.",
    explanation: "Strict authoritative-only servers (RA=0) will not resolve queries for other domains. They might return a referral (pointing to other nameservers) if they know them, or simply return REFUSED. This behavior is typical of TLD and root servers. Sometimes they return 'no error' with no answer for names they don't know.",
    hint: "Query a root server for 'google.com A'. What do you get? Not an IP, but a referral.",
    level: "intermediate",
    codeExample: "dig @a.root-servers.net google.com A  # Returns referral to .com TLD"
  },
  {
    question: "What is the 'AA' (Authoritative Answer) flag in a DNS response?",
    shortAnswer: "AA=1 indicates that the responding server is authoritative for the queried domain name.",
    explanation: "When you query an authoritative server for a domain in its zone, the response has AA=1. Recursive resolvers that return cached data will have AA=0, because they are not authoritative. Checking the AA flag helps distinguish between cached and original answers.",
    hint: "Run 'dig @ns1.google.com google.com' and look for 'flags: aa' in the output.",
    level: "intermediate",
    codeExample: "dig google.com | grep 'flags:'  # aa flag only if from authoritative"
  },
  {
    question: "What is the difference between a 'stub resolver' and a 'recursive resolver'?",
    shortAnswer: "Stub resolver (on end device) sends recursive queries and expects a final answer; recursive resolver does the iterative work.",
    explanation: "The stub resolver is a small client (in OS/browser) that depends on an external recursive resolver. It cannot follow referrals. The recursive resolver is a full server that contacts root, TLD, etc. This separation allows endpoint devices to be simple while centralized resolvers handle complexity.",
    hint: "Your laptop's stub resolver talks to your router's recursive resolver.",
    level: "basic",
    codeExample: "cat /etc/resolv.conf  # Lists IP of recursive resolver for stub"
  },
  {
    question: "Can a recursive resolver skip querying root servers if it has cached NS records for a TLD?",
    shortAnswer: "Yes, it can use cached NS records for TLDs, skipping root queries for domains under that TLD.",
    explanation: "Once a recursive resolver learns .com TLD servers (via root query or priming), it caches them. For subsequent .com domains, it directly queries the cached TLD servers. This is a performance optimization. Root servers are only needed when the TLD cache expires or the TLD is new.",
    hint: "Why does the first query to a new TLD take longer than the second?",
    level: "intermediate",
    codeExample: "dig +trace google.com  # First request shows root; second (with cache) may skip root"
  },
  {
    question: "What is a 'DNS forwarder' vs 'DNS proxy'?",
    shortAnswer: "Forwarder passes queries to another recursive server; proxy may also modify or filter queries (e.g., for censorship).",
    explanation: "A forwarder is a standard DNS server configured to send queries upstream. A proxy (like dnsmasq) often includes additional features: local caching, DHCP integration, blacklisting, or rewriting. Some proxies (e.g., for censorship) can block domains or return false answers.",
    hint: "Pi-hole is a DNS proxy that blocks advertising domains.",
    level: "expert",
    codeExample: "# dnsmasq: server=8.8.8.8 (forwarding) and addn-hosts for blocking"
  },
  {
    question: "How do recursive resolvers handle DNSSEC validation failures?",
    shortAnswer: "They return SERVFAIL to the client, indicating that the response couldn't be authenticated.",
    explanation: "If a resolver validates DNSSEC (most public resolvers do), and the signature check fails (e.g., missing RRSIG, key mismatch), it returns SERVFAIL instead of the potentially spoofed answer. This prevents cache poisoning but may result in 'domain not resolving' errors for misconfigured DNSSEC domains.",
    hint: "Why would a perfectly valid domain suddenly stop resolving after enabling DNSSEC?",
    level: "expert",
    codeExample: "dig +dnssec broken-dnssec.example  # May return SERVFAIL"
  },
  {
    question: "What is the purpose of the 'additional section' in a TLD server's response?",
    shortAnswer: "To provide glue records (IP addresses of nameservers) or other useful data to reduce extra queries.",
    explanation: "When a TLD server returns NS records for example.com, it may also include A/AAAA records for those NS servers in the additional section (especially if they are in the same domain). This optimization prevents the resolver from needing to query again just to get NS IPs.",
    hint: "Why does a TLD server sometimes return IP addresses for nameservers?",
    level: "expert",
    codeExample: "dig @a.gtld-servers.net example.com NS +additional"
  },
  {
    question: "How does a recursive resolver handle a CNAME chain (e.g., www → alias1 → alias2 → IP)?",
    shortAnswer: "It follows each CNAME sequentially, making new queries each time, until it reaches an A/AAAA record or hits a loop limit.",
    explanation: "Resolvers have a limit (typically 10-20 CNAME hops). At each step, they may need to contact different authoritative servers if the target domain is in a different zone. This can increase resolution time. Best practice is to keep CNAME chains short.",
    hint: "What happens if you have a circular CNAME (www → www2, www2 → www)?",
    level: "expert",
    codeExample: "dig www.example.com +trace  # Shows CNAME follow"
  },
  {
    question: "Why do root server operators discourage sending recursive queries directly to them?",
    shortAnswer: "Root servers are designed only to respond with referrals, not to perform recursion for clients. Heavy recursive load would overwhelm them.",
    explanation: "Root servers should not be used as general recursive resolvers. They only answer iterative queries with referrals. If millions of clients sent recursive queries directly to root servers, the root servers would be overloaded and might fail. Stub resolvers must use recursive resolvers, not root.",
    hint: "What would happen if every home computer sent its DNS queries directly to a.root-servers.net?",
    level: "basic",
    codeExample: "dig @a.root-servers.net google.com +recurse  # Should be REFUSED or referral only"
  },
  {
    question: "What is the purpose of the 'NS' record at the authoritative server level?",
    shortAnswer: "It declares which servers are authoritative for the zone, primarily for zone transfer and delegation information.",
    explanation: "Within a zone (e.g., example.com), NS records list the authoritative nameservers for that zone. These must match the delegation NS records in the parent zone (.com). They are used for referrals and for secondary servers to know where to perform zone transfers.",
    hint: "Why do you need NS records in both the parent zone and your own zone?",
    level: "intermediate",
    codeExample: "dig NS example.com  # Shows NS records, should match parent delegation"
  }
];

export default questions;