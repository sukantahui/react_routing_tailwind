// topic5_files/topic5_questions.js
// 30 moderate-to-expert level questions about DNS A Records (IPv4 mapping)

const questions = [
  {
    question: "What is the primary function of a DNS A record?",
    shortAnswer: "An A record maps a domain name to an IPv4 address.",
    explanation: "The 'A' stands for 'Address'. It is the fundamental DNS record that allows humans to use domain names while computers use IP addresses. Without A records, browsers would have no way to find the server's IP. A records are stored in authoritative DNS zones.",
    hint: "What record type would you create to point 'example.com' to 192.0.2.1?",
    level: "basic",
    codeExample: "dig example.com A +short  # Returns IPv4 address"
  },
  {
    question: "What is the maximum number of A records you can have for a single domain name?",
    shortAnswer: "There is no hard limit, but practical constraints (UDP response size) limit to around 20-30 per name.",
    explanation: "DNS responses over UDP have size limits (typically 512-4096 bytes). Each A record is about 20-30 bytes. Dozens of A records may cause truncation (TC flag) and fallback to TCP. Large numbers are rare; typically 2-10 for load balancing.",
    hint: "What happens if you try to add 100 A records? Responses might get truncated.",
    level: "expert",
    codeExample: "dig +bufsize=400 example.com  # May see TC flag if many A records"
  },
  {
    question: "How does round-robin DNS work with multiple A records?",
    shortAnswer: "The nameserver rotates the order of returned IP addresses each query, distributing load across servers.",
    explanation: "When a domain has multiple A records (e.g., web1, web2, web3), the authoritative server cycles the order. Most clients use the first IP address. This spreads traffic but doesn't handle server health. Round-robin is simple but limited.",
    hint: "Run 'dig google.com A' multiple times. Do you see the same IP order?",
    level: "intermediate",
    codeExample: "dig example.com A  # Observe IP order change between queries"
  },
  {
    question: "Can an A record point to a private IP address (e.g., 192.168.1.1)?",
    shortAnswer: "Yes, but it will only be resolvable from networks that can reach that private IP.",
    explanation: "Private IP ranges (RFC 1918) are not routable on the public internet. An A record with 192.168.1.1 is fine for internal DNS (split-horizon) or VPN environments. On public DNS, it's useless because no external client can reach that IP.",
    hint: "Why does 'internal.company.com' often resolve to 10.x.x.x?",
    level: "intermediate",
    codeExample: "dig internal-server.local  # Returns private IP if internal DNS"
  },
  {
    question: "What is the difference between an A record and an AAAA record?",
    shortAnswer: "A record maps to IPv4 (32-bit); AAAA record maps to IPv6 (128-bit).",
    explanation: "A records use dotted-decimal (e.g., 192.0.2.1). AAAA records use hex colon format (e.g., 2001:db8::1). Both serve identical purpose for different IP versions. Dual-stack domains have both A and AAAA records.",
    hint: "Which record would you add for IPv6-only clients?",
    level: "basic",
    codeExample: "dig google.com AAAA +short  # Shows IPv6 address"
  },
  {
    question: "How long does it take for an A record change to propagate globally?",
    shortAnswer: "Up to the TTL of the record (plus resolver caching). Maximum typical propagation is 48-72 hours.",
    explanation: "When you change an A record, recursive resolvers will continue using the cached old value until TTL expires. To speed propagation, lower TTL to 300 seconds (5 minutes) 24-48 hours before the change. After change, wait TTL time, then raise TTL back.",
    hint: "If TTL is 3600 seconds, how long until all resolvers see the new IP?",
    level: "intermediate",
    codeExample: "dig example.com A | grep 'TTL'  # Check current TTL"
  },
  {
    question: "What is the '@' symbol in a zone file's A record?",
    shortAnswer: "@ represents the origin (the current domain name, often the zone's apex).",
    explanation: "In zone files, @ is a shorthand for the domain name defined in the $ORIGIN directive (or the zone name). For example, '@ A 192.0.2.1' creates an A record for the root of the zone (e.g., example.com).",
    hint: "What does '@' mean in 'example.com.zone'?",
    level: "intermediate",
    codeExample: "$ORIGIN example.com.\n@ 3600 IN A 192.0.2.1"
  },
  {
    question: "What happens if a domain has no A record?",
    shortAnswer: "The domain cannot be reached over IPv4; clients will get NODATA (no answer) for A queries.",
    explanation: "Without an A record, web browsers cannot connect over IPv4. If the domain also lacks AAAA record, it's completely unreachable. Some services may still work over IPv6 if AAAA exists. But legacy IPv4-only clients will fail.",
    hint: "Can you visit a website with only an AAAA record from an IPv4-only network?",
    level: "basic",
    codeExample: "dig example.com A  # Returns no answer if missing"
  },
  {
    question: "Can a CNAME record coexist with an A record at the same name?",
    shortAnswer: "No, a CNAME cannot coexist with any other record type (except DNSSEC) at the same name.",
    explanation: "RFC 1034: 'If a CNAME RR is present at a node, no other data should be present.' This includes A records. If you need both, use the A record at the apex and CNAME for a different name (e.g., www).",
    hint: "Why can't example.com have both a CNAME and an A record?",
    level: "expert",
    codeExample: "dig example.com  # CNAME and A conflict causes unpredictable behavior"
  },
  {
    question: "How do you check the A record of a domain using command line?",
    shortAnswer: "Use 'dig A domain.com' or 'nslookup domain.com'.",
    explanation: "dig (Linux/macOS) provides detailed output. 'dig +short' gives just the IP. nslookup is cross-platform. On Windows, 'nslookup domain.com' works. Also 'host -t A domain.com'.",
    hint: "Which command shows additional information like TTL?",
    level: "basic",
    codeExample: "dig example.com A +noall +answer  # Clean output"
  },
  {
    question: "What is the significance of the TTL in an A record?",
    shortAnswer: "TTL (Time to Live) tells resolvers how many seconds to cache the A record before re-querying.",
    explanation: "Lower TTL means changes propagate faster but increases query load on authoritative servers. Higher TTL reduces load but delays updates. Common TTLs: 300 (5 min) for dynamic IPs, 3600 (1 hour) for normal, 86400 (24 hours) for stable records.",
    hint: "If you plan to move your website to a new IP, should you raise or lower TTL beforehand?",
    level: "intermediate",
    codeExample: "dig example.com A | grep 'TTL'  # Shows TTL value"
  },
  {
    question: "Can an A record point to multiple IP addresses?",
    shortAnswer: "Yes, by having multiple A records with the same name, each with a different IP.",
    explanation: "This is called 'multiple A records' or 'round-robin DNS'. The nameserver returns all of them, typically rotating order. Clients usually choose the first. This provides basic load distribution but no health checking.",
    hint: "What is the difference between multiple A records and anycast?",
    level: "intermediate",
    codeExample: "dig google.com A +short  # Usually returns 2-4 IPs"
  },
  {
    question: "How does DNSSEC affect A records?",
    shortAnswer: "DNSSEC adds RRSIG signatures over A records, allowing resolvers to verify authenticity.",
    explanation: "With DNSSEC, the authoritative server also returns an RRSIG record that signs the A record set. The resolver validates using DNSKEY. This prevents spoofing and cache poisoning. Without DNSSEC, A records can be forged.",
    hint: "Can an attacker change A records in flight if DNSSEC is disabled?",
    level: "expert",
    codeExample: "dig +dnssec example.com A  # Shows RRSIG alongside A"
  },
  {
    question: "What is the maximum length of an IPv4 address in an A record?",
    shortAnswer: "15 characters (e.g., '255.255.255.255'), plus optional trailing dot (not needed).",
    explanation: "IPv4 addresses are 4 octets (0-255) separated by dots. The string representation max length is 15. In zone files, it's stored as a 32-bit binary field, not text, so length is not an issue.",
    hint: "What is the shortest valid IPv4 address? '0.0.0.0'",
    level: "basic",
    codeExample: "echo '255.255.255.255' | wc -c  # 15 characters"
  },
  {
    question: "What is an 'A record' in the context of a reverse DNS lookup?",
    shortAnswer: "Reverse DNS uses PTR records, not A records. A records are for forward lookup (name→IP).",
    explanation: "Reverse lookup (IP→name) uses PTR records in the in-addr.arpa zone. A records are only for forward resolution. However, the forward and reverse should be consistent for services like email (rDNS).",
    hint: "What record type would you query for '192.0.2.1' to get a domain name?",
    level: "intermediate",
    codeExample: "dig -x 8.8.8.8  # Uses PTR, not A"
  },
  {
    question: "Can different domain names share the same A record IP address?",
    shortAnswer: "Yes, many domains can point to the same IP (virtual hosting).",
    explanation: "Shared web hosting uses name-based virtual hosting: hundreds of domains point to the same IP, and the web server uses the Host header to serve the correct site. This is efficient for IPv4 conservation.",
    hint: "How does a web server know which site to show when all domains resolve to the same IP?",
    level: "basic",
    codeExample: "curl -H 'Host: site1.com' http://1.2.3.4  # Works if virtual hosting configured"
  },
  {
    question: "What is the difference between an A record and a glue record?",
    shortAnswer: "A record is a standard mapping; glue is an A record in a parent zone for an in-domain nameserver.",
    explanation: "Glue records are a specific type of A record stored in the parent zone (e.g., .com) to resolve nameservers like ns1.example.com. Without glue, circular dependencies occur. Glue records have the same format as A records but appear in additional section.",
    hint: "Why does the .com TLD sometimes include an A record for ns1.example.com?",
    level: "expert",
    codeExample: "dig NS example.com +additional  # Shows glue A records"
  },
  {
    question: "How do CDNs use A records to improve performance?",
    shortAnswer: "CDNs use GeoDNS (different A records based on client location) to return the nearest edge server IP.",
    explanation: "When you query for 'cdn.example.com', the authoritative DNS sees your resolver's IP and returns an A record pointing to a nearby CDN edge node. This reduces latency. The A record changes per query — it's dynamic, not static.",
    hint: "Why does 'dig cdn.cloudflare.net' sometimes give different IPs from different countries?",
    level: "expert",
    codeExample: "dig @8.8.8.8 fastly.com A  # May return different IPs over time"
  },
  {
    question: "What is a 'wildcard A record'? Give an example.",
    shortAnswer: "A wildcard A record, like '*.example.com A 192.0.2.1', matches any non-existent subdomain.",
    explanation: "Wildcard records cause any subdomain without its own record to resolve to the wildcard IP. For example, 'anything.example.com' would resolve to 192.0.2.1. Useful for catch-all but can hide typos and cause security issues.",
    hint: "If you have a wildcard A record, what does 'nonexistent.example.com' resolve to?",
    level: "intermediate",
    codeExample: "dig random-subdomain.example.com  # Returns wildcard IP if configured"
  },
  {
    question: "How does an A record work with load balancers like HAProxy or Nginx?",
    shortAnswer: "The A record points to the load balancer's IP, which then distributes traffic to backend servers.",
    explanation: "Instead of multiple A records for each server, a single A record points to a load balancer. The load balancer performs health checks and distributes requests. This is more robust than round-robin DNS. DNS is unaware of backend health.",
    hint: "What is the advantage of a load balancer over multiple A records?",
    level: "intermediate",
    codeExample: "dig lb.example.com A  # Returns load balancer IP, not backend IPs"
  },
  {
    question: "Can an A record have a TTL of 0?",
    shortAnswer: "Yes, TTL=0 means 'do not cache' — resolvers must always re-query.",
    explanation: "TTL=0 is allowed but causes high load on authoritative servers. Used for dynamic DNS or when changes are extremely frequent. Some resolvers may enforce a minimum TTL (e.g., 30 seconds). Not recommended for production.",
    hint: "What happens if a popular domain sets TTL=0?",
    level: "expert",
    codeExample: "dig example.com A  # Look for 'ttl 0'"
  },
  {
    question: "What is the difference between an A record and an ALIAS/ANAME record?",
    shortAnswer: "A record stores an IP; ALIAS/ANAME (non-standard) simulates CNAME at the apex by returning A records from a target.",
    explanation: "At the zone apex (example.com), CNAME is not allowed. ALIAS records (e.g., in Cloudflare) let you point the apex to another domain (like a CDN). The DNS provider resolves the target and returns A records dynamically.",
    hint: "How can 'example.com' point to 'something.herokuapp.com' without CNAME restriction?",
    level: "expert",
    codeExample: "# Cloudflare: example.com ALAS something.herokuapp.com"
  },
  {
    question: "How does an A record interact with the hosts file?",
    shortAnswer: "The hosts file overrides DNS: the stub resolver checks hosts file before querying A records.",
    explanation: "If '/etc/hosts' contains '192.0.2.100 example.com', that A record mapping is used without DNS. This is useful for testing, blocking sites, or local development. Hosts file entries are not A records in DNS, just local overrides.",
    hint: "How would you block 'facebook.com' using hosts file?",
    level: "basic",
    codeExample: "echo '0.0.0.0 facebook.com' >> /etc/hosts"
  },
  {
    question: "What is the maximum number of A records that fit in a 512-byte UDP response?",
    shortAnswer: "Approximately 15-20, depending on domain name lengths and additional records.",
    explanation: "Each A record uses about 20-30 bytes (name compression, type, class, TTL, 4-byte IP). With overhead of header and NS records, 20 is typical. EDNS (buffer up to 4096 bytes) allows many more. Too many cause TC flag and TCP fallback.",
    hint: "What happens if a response has too many A records? You'll see 'truncated'.",
    level: "expert",
    codeExample: "dig +bufsize=512 many-a-records.example.com  # May truncate"
  },
  {
    question: "What is the 'CLASS' field in an A record (usually IN)?",
    shortAnswer: "IN stands for Internet; other classes like CH (Chaosnet) exist but are obsolete.",
    explanation: "DNS CLASS field: IN (Internet) is virtually universal. CH (Chaosnet) is used for querying version.bind on BIND servers. HS (Hesiod) is rare. For A records, CLASS must be IN for normal use.",
    hint: "What does 'IN' mean in 'example.com. 3600 IN A 1.2.3.4'?",
    level: "advanced",
    codeExample: "dig version.bind CH TXT  # Chaosnet class example"
  },
  {
    question: "How do cloud providers like AWS Route 53 handle A record updates automatically?",
    shortAnswer: "Route 53 supports alias records that dynamically resolve AWS resources (ELB, CloudFront) to A records.",
    explanation: "Instead of static IPs, Route 53 alias records point to AWS services. The A record IPs are automatically updated when the underlying service changes. This is a proprietary extension but behaves like A records to resolvers.",
    hint: "Why might you never see an IP address for an ELB in Route 53?",
    level: "expert",
    codeExample: "# Route 53: alias record to load balancer DNS name"
  },
  {
    question: "Can an A record point to a domain name instead of an IP?",
    shortAnswer: "No, an A record must contain an IPv4 address. For aliasing to another domain, use CNAME.",
    explanation: "A record rdata is a 32-bit binary IP address. You cannot put a domain name there. To point a name to another name, use CNAME. However, CNAME has restrictions (cannot coexist with other records).",
    hint: "What record type would you use to make 'www.example.com' an alias for 'example.com'?",
    level: "basic",
    codeExample: "www.example.com. 3600 IN CNAME example.com."
  },
  {
    question: "What is a 'multi-value answer' in DNS A record responses?",
    shortAnswer: "Multiple A records with the same name; resolver returns all of them.",
    explanation: "This is not a special record type; it's simply multiple A records. Some resolvers may return them to clients for client-side load balancing. Clients often pick the first IP.",
    hint: "How does your browser choose which IP to connect to when multiple A records are returned?",
    level: "intermediate",
    codeExample: "dig microsoft.com A  # Multiple A records returned"
  },
  {
    question: "Why do some domains return different A records for different query sources?",
    shortAnswer: "GeoDNS or latency-based routing: the authoritative server returns different IPs based on the resolver's location.",
    explanation: "Advanced DNS services (like NS1, AWS Route 53 with latency routing) evaluate the client's resolver IP and return the best regional IP. This is not standard DNS but an add-on. The response still contains standard A records.",
    hint: "Why does 'google.com' resolve to different IPs in India vs USA?",
    level: "expert",
    codeExample: "dig @8.8.8.8 google.com  # Versus dig @1.1.1.1 google.com  # May differ"
  },
  {
    question: "How does an A record work with split-horizon (split-view) DNS?",
    shortAnswer: "Split-horizon returns different A records based on the source IP of the query (internal vs external).",
    explanation: "Internal clients (IPs from 10.0.0.0/8) receive internal private IPs (e.g., 10.1.1.1); external clients receive public IPs (203.0.113.5). This is configured on the authoritative server using views (in BIND) or firewall rules.",
    hint: "Why do employees inside a company see a different IP for the same domain than external users?",
    level: "expert",
    codeExample: "# In BIND: view 'internal' { match-clients { 10.0.0.0/8; }; };"
  },
  {
    question: "What is the significance of the 'A' record in dynamic DNS (DDNS)?",
    shortAnswer: "DDNS updates A records automatically when a device's IP changes (e.g., home router with dynamic IP).",
    explanation: "Dynamic DNS clients (like ddclient) send authenticated updates to a DNS server (e.g., using RFC 2136) to change the A record for a hostname. This allows accessing a device by domain even if its public IP changes periodically.",
    hint: "How can you access your home security camera by name even if your ISP changes your IP?",
    level: "intermediate",
    codeExample: "nsupdate -k keyfile  # Command to update A record dynamically"
  }
];

export default questions;