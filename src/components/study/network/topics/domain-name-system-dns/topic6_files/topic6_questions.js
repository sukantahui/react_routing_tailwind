// topic6_files/topic6_questions.js
// 30 moderate-to-expert level questions about AAAA Records (IPv6 mapping)

const questions = [
  {
    question: "What does AAAA stand for in DNS records, and why is it called that?",
    shortAnswer: "AAAA stands for 'Address' quadruple — it's four times the size of an A record (128 bits vs 32 bits).",
    explanation: "The A record is 32 bits. AAAA (quad-A) indicates 4 × 32 = 128 bits, the length of an IPv6 address. The name is a play on IPv6's larger address space. Some also call it 'quad-A'.",
    hint: "If A is 32 bits, how many A's would make 128 bits?",
    level: "basic",
    codeExample: "# A record: 32 bits\n# AAAA record: 128 bits"
  },
  {
    question: "What is the difference between an AAAA record and an A record?",
    shortAnswer: "A record maps to IPv4 (32-bit); AAAA record maps to IPv6 (128-bit).",
    explanation: "Both serve the same purpose — mapping domain names to IP addresses — but for different IP protocol versions. A records are for legacy IPv4 networks; AAAA records are for modern IPv6 networks. Dual-stack domains publish both.",
    hint: "Which record would you add to support IPv6-only clients?",
    level: "basic",
    codeExample: "dig google.com AAAA  # Returns IPv6 address"
  },
  {
    question: "How many IPv6 addresses are theoretically possible?",
    shortAnswer: "2^128 = approximately 340 undecillion (3.4×10³⁸) addresses.",
    explanation: "That's enough for every atom on Earth's surface many times over. IPv6's vast space eliminates address exhaustion, allowing every device to have a public, routable IP without NAT.",
    hint: "How does this compare to IPv4's 4.3 billion?",
    level: "basic",
    codeExample: "echo '2^128' | bc  # Massive number"
  },
  {
    question: "What is the correct way to compress an IPv6 address in an AAAA record?",
    shortAnswer: "Leading zeros in each block can be omitted; one contiguous sequence of zero blocks can be replaced with '::'.",
    explanation: "For example, 2001:0db8:0000:0000:0000:0000:1428:57ab becomes 2001:db8::1428:57ab. The double colon (::) can appear only once. All addresses have a single canonical compressed form.",
    hint: "What is the compressed form of 'fe80:0000:0000:0000:0000:0000:0000:0001'?",
    level: "intermediate",
    codeExample: "echo '2001:0db8:0000:0000:0000:0000:0000:0001' | sed 's/\b0\+//g' | sed 's/:0\{1,\}/:/g'"
  },
  {
    question: "What is a 'dual-stack' DNS configuration?",
    shortAnswer: "Publishing both A (IPv4) and AAAA (IPv6) records for the same domain name.",
    explanation: "Dual-stack allows clients to choose which protocol to use. Most modern clients prefer IPv6 if available. This ensures compatibility with both legacy IPv4-only networks and modern IPv6 networks.",
    hint: "Why would a domain publish both A and AAAA records?",
    level: "basic",
    codeExample: "example.com. 3600 IN A 192.0.2.1\nexample.com. 3600 IN AAAA 2001:db8::1"
  },
  {
    question: "How can you test if your DNS resolver returns AAAA records correctly?",
    shortAnswer: "Use 'dig AAAA example.com' and check the answer section. Also test with 'dig +short'.",
    explanation: "On macOS/Linux: 'dig google.com AAAA +short'. On Windows: 'nslookup -type=AAAA google.com'. A successful response shows one or more IPv6 addresses. If no answer, the domain may not have AAAA records or your network may not support IPv6.",
    hint: "What command shows only the IPv6 address without extra output?",
    level: "basic",
    codeExample: "dig google.com AAAA +short  # Returns IPv6 addresses only"
  },
  {
    question: "What is the IPv6 loopback address and its AAAA record?",
    shortAnswer: "Loopback is ::1 (compressed) or 0:0:0:0:0:0:0:1 (full).",
    explanation: "Similar to IPv4's 127.0.0.1. In DNS, localhost resolves to ::1 when AAAA records are configured. Many systems have both 'localhost A 127.0.0.1' and 'localhost AAAA ::1'.",
    hint: "What IPv6 address does 'ping6 localhost' use?",
    level: "basic",
    codeExample: "dig localhost AAAA +short  # Returns ::1"
  },
  {
    question: "Why might a domain have an A record but no AAAA record?",
    shortAnswer: "The server or hosting provider may not support IPv6, or the administrator hasn't configured it.",
    explanation: "Many legacy systems are IPv4-only. Adding AAAA records requires the server to have an IPv6 address and proper firewall rules. As IPv6 adoption grows, lack of AAAA records may cause suboptimal performance for IPv6 users.",
    hint: "What happens when an IPv6-only client tries to reach a domain with only A records?",
    level: "intermediate",
    codeExample: "dig ipv4only.example.com AAAA  # Returns empty answer"
  },
  {
    question: "What is the IPv6 equivalent of the private IP ranges (RFC 1918)?",
    shortAnswer: "Unique Local Addresses (ULA) with prefix fd00::/8 (specifically fc00::/7 with fd00::/8 for locally assigned).",
    explanation: "ULA addresses are for private networks, similar to 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. They are not routable on the public internet. Example: fd12:3456:789a::1.",
    hint: "What prefix do most automatically generated private IPv6 addresses start with?",
    level: "intermediate",
    codeExample: "dig internal-host.local AAAA  # May return fd00:: address"
  },
  {
    question: "Can an AAAA record point to an IPv4-mapped IPv6 address (e.g., ::ffff:192.0.2.1)?",
    shortAnswer: "Technically yes, but it's not recommended. Use separate A and AAAA records instead.",
    explanation: "IPv4-mapped addresses (::ffff:0:0/96) allow IPv6-only applications to talk to IPv4 addresses. However, using them in AAAA records defeats the purpose of IPv6. It's better to run dual-stack natively.",
    hint: "What is the format of an IPv6 address that embeds an IPv4 address?",
    level: "expert",
    codeExample: "dig example.com AAAA  # Rarely returns ::ffff:192.0.2.1"
  },
  {
    question: "How does the TTL of an AAAA record affect IPv6 failover?",
    shortAnswer: "Lower TTL reduces failover time when changing IPv6 addresses but increases query load.",
    explanation: "If your server's IPv6 address changes (e.g., dynamic prefix), lower TTL (300-600 seconds) ensures clients update quickly. During maintenance, lower TTL in advance, then change the AAAA record. High TTL (86400) delays recovery.",
    hint: "What TTL would you set for a dynamically assigned IPv6 address?",
    level: "intermediate",
    codeExample: "dig example.com AAAA | grep 'TTL'  # Check current TTL"
  },
  {
    question: "What is an 'AAAA' record in the context of DNSSEC?",
    shortAnswer: "Like A records, AAAA records are signed with RRSIG under DNSSEC to prevent spoofing.",
    explanation: "DNSSEC adds RRSIG records over the AAAA record set. A validating resolver checks the signature against DNSKEY. Without DNSSEC, an attacker could forge AAAA responses, redirecting IPv6 traffic.",
    hint: "What extra record type appears alongside AAAA when DNSSEC is enabled?",
    level: "expert",
    codeExample: "dig +dnssec example.com AAAA  # Shows RRSIG"
  },
  {
    question: "What is the maximum length of a compressed IPv6 address string in an AAAA record?",
    shortAnswer: "Up to 39 characters for full uncompressed, much less for compressed (e.g., '::1' is 3).",
    explanation: "Full representation: 8 blocks of 4 hex digits + 7 colons = 39 characters. Compression can reduce it significantly. Most AAAA record text representations are 15-30 characters.",
    hint: "What is the shortest valid IPv6 address? '::' (unspecified) or '::1'",
    level: "basic",
    codeExample: "echo '2001:0db8:85a3:0000:0000:8a2e:0370:7334' | wc -c  # 39 + newline"
  },
  {
    question: "How do CDNs use AAAA records for IPv6 acceleration?",
    shortAnswer: "CDNs publish AAAA records pointing to their IPv6-enabled edge nodes, using GeoDNS to route to nearest instance.",
    explanation: "When an IPv6 client queries for a CDN domain, the authoritative DNS returns an AAAA record with the optimal edge node's IPv6 address. This avoids IPv4-to-IPv6 translation and reduces latency.",
    hint: "Why might a CDN have both A and AAAA records for the same hostname?",
    level: "expert",
    codeExample: "dig fastly.com AAAA  # Returns IPv6 addresses of edge nodes"
  },
  {
    question: "What is the difference between a AAAA record and a PTR record in IPv6?",
    shortAnswer: "AAAA is forward mapping (name→IPv6); PTR is reverse mapping (IPv6→name) stored in ip6.arpa.",
    explanation: "PTR records for IPv6 are under ip6.arpa, with each nibble (4 bits) as a separate label. For example, reverse of 2001:db8::1 becomes 1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa.",
    hint: "What record type would you query to find the domain name of an IPv6 address?",
    level: "intermediate",
    codeExample: "dig -x 2001:db8::1  # Uses ip6.arpa"
  },
  {
    question: "Can a domain have multiple AAAA records?",
    shortAnswer: "Yes, multiple AAAA records are allowed for load balancing or redundancy.",
    explanation: "Like A records, multiple AAAA records cause round-robin behavior. Clients may receive all addresses and choose one. This is useful for distributing IPv6 traffic across multiple servers.",
    hint: "Run 'dig google.com AAAA' — you may see multiple IPv6 addresses.",
    level: "basic",
    codeExample: "dig google.com AAAA +short  # Often returns 2-3 IPv6 addresses"
  },
  {
    question: "What is an 'AAAA' record in split-horizon DNS?",
    shortAnswer: "Different AAAA records can be returned based on the client's source IPv6 prefix (internal vs external).",
    explanation: "Split-horizon allows internal clients to receive ULAs (fd00::/8) while external clients receive global unicast addresses (2000::/3). This is configured using views in BIND or similar.",
    hint: "Why might an employee see a different IPv6 address for the same domain than an external user?",
    level: "expert",
    codeExample: "# In BIND: view 'internal' { match-clients { fd00::/8; }; };"
  },
  {
    question: "How does an AAAA record work with NAT64/DNS64?",
    shortAnswer: "DNS64 synthesizes AAAA records from A records to allow IPv6-only clients to reach IPv4-only servers.",
    explanation: "When an IPv6-only client queries for a domain with only A records, DNS64 (usually on the network) fakes an AAAA record by prefixing the IPv4 address with a well-known prefix (e.g., 64:ff9b::/96). The NAT64 gateway then translates.",
    hint: "How can an IPv6-only device access ipv4-only.google.com?",
    level: "expert",
    codeExample: "dig AAAA ipv4only.example.com  # May return synthesized address starting with 64:ff9b::"
  },
  {
    question: "What is the 'AAAA' record's role in Happy Eyeballs (RFC 8305)?",
    shortAnswer: "Happy Eyeballs uses both A and AAAA records; connects over IPv6 first but falls back to IPv4 if slow.",
    explanation: "Clients perform A and AAAA queries in parallel. They attempt connection over IPv6, but if that fails or is too slow, they immediately try IPv4. This balances IPv6 preference with performance. AAAA records are essential for this algorithm.",
    hint: "Why does your browser sometimes take two seconds to load a site that has both A and AAAA?",
    level: "expert",
    codeExample: "# See connection attempts in browser dev tools -> Network"
  },
  {
    question: "Can an AAAA record point to a link-local address (fe80::/10)?",
    shortAnswer: "Technically yes, but it's useless because link-local addresses are only valid on a single link.",
    explanation: "Link-local addresses (fe80::/64) are not routable. An AAAA record with fe80::1 would only work for clients on the same subnet. They should never be published in public DNS; use only for internal testing.",
    hint: "Why can't you ping a link-local address from a different network?",
    level: "intermediate",
    codeExample: "dig example.com AAAA  # Should never return fe80:: address"
  },
  {
    question: "How do you check if a website is reachable over IPv6 using command line?",
    shortAnswer: "Use 'curl -6 https://example.com' or 'ping6 example.com'.",
    explanation: "curl -6 forces IPv6; if the site has AAAA records and your network has IPv6, you'll get a response. ping6 tests ICMPv6 connectivity. Alternatively, 'telnet -6 example.com 80'.",
    hint: "What command would you use to test IPv6-only HTTP connectivity?",
    level: "intermediate",
    codeExample: "curl -6 -I https://google.com  # Returns headers over IPv6"
  },
  {
    question: "What is the size difference in DNS messages between A and AAAA records?",
    shortAnswer: "A record rdata is 4 bytes; AAAA record rdata is 16 bytes (4× larger).",
    explanation: "When many AAAA records are returned, DNS responses become larger. This increases the chance of UDP truncation (TC flag) and fallback to TCP, especially without EDNS. For domains with many IPv6 addresses, DNSSEC overhead can be significant.",
    hint: "Why might a domain with 10 AAAA records require TCP transport?",
    level: "expert",
    codeExample: "dig +bufsize=512 many-aaaa.example.com  # May show TC flag"
  },
  {
    question: "What is the role of the 'AAAA' record in Kubernetes Ingress or Service of type LoadBalancer?",
    shortAnswer: "External DNS controllers can create AAAA records for LoadBalancer IPv6 addresses.",
    explanation: "When a Kubernetes service gets an external IPv6 address (e.g., from a cloud provider), the external-dns tool can automatically create AAAA records. This allows IPv6 clients to access the service via a domain name.",
    hint: "How does a Kubernetes service become discoverable via IPv6 DNS?",
    level: "expert",
    codeExample: "# external-dns annotation: external-dns.alpha.kubernetes.io/hostname: myservice.example.com"
  },
  {
    question: "How does RDNS (Reverse DNS) work for IPv6 AAAA records?",
    shortAnswer: "PTR records are stored in ip6.arpa with each nibble (4 bits) as a separate label.",
    explanation: "For IPv6 address 2001:0db8::1, reverse zone is 1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa. Each hexadecimal digit becomes a label. Administrators create PTR records to map IPv6 back to domain names.",
    hint: "What is the reverse DNS zone for 2001:db8::/32?",
    level: "expert",
    codeExample: "dig -x 2001:db8::1  # Shows ip6.arpa PTR lookup"
  },
  {
    question: "What is the maximum number of AAAA records that fit in a 4096-byte EDNS response?",
    shortAnswer: "Approximately 200-250, depending on name compression and other RRs.",
    explanation: "Each AAAA record rdata is 16 bytes plus overhead (label, type, class, TTL). In practice, 100 AAAA records are safe; beyond that may cause issues with some resolvers.",
    hint: "Why would you rarely see more than 20 AAAA records per name?",
    level: "expert",
    codeExample: "dig +bufsize=4096 many-aaaa.example.com  # Test limits"
  },
  {
    question: "Can a CNAME record point to an AAAA record?",
    shortAnswer: "CNAME points to another domain name, which can then have an AAAA record. But CNAME cannot coexist with AAAA at same node.",
    explanation: "If 'www.example.com' is a CNAME to 'example.com', you can have AAAA records for 'example.com'. However, you cannot have both a CNAME and an AAAA record at 'www.example.com'. This is the same restriction as with A records.",
    hint: "How would you alias 'www' to an apex domain that has AAAA records?",
    level: "intermediate",
    codeExample: "www.example.com. CNAME example.com.\nexample.com. AAAA 2001:db8::1"
  },
  {
    question: "What is an 'AAAA' record's TTL best practice for frequently changing IPv6 addresses?",
    shortAnswer: "Use low TTL (60-300 seconds) when using dynamic IPv6 prefixes (e.g., home DHCPv6-PD).",
    explanation: "If your ISP changes your IPv6 prefix periodically, set TTL low (e.g., 300) to ensure clients don't cache old addresses for long. Some DDNS clients update AAAA automatically. For stable IPv6 addresses, use TTL 3600-86400.",
    hint: "What TTL would you set for a home server with a dynamic IPv6 prefix?",
    level: "intermediate",
    codeExample: "dynamic-host.ddns.net. 300 IN AAAA 2001:db8:abcd:1234::1"
  },
  {
    question: "How does an AAAA record interact with IPv6 routing headers and extensions?",
    shortAnswer: "The AAAA record only stores the destination address; routing headers are separate and not part of DNS.",
    explanation: "AAAA records simply map names to IPv6 addresses. Any routing headers, Hop-by-Hop options, or extension headers are added by the network stack, not controlled by DNS. DNS only cares about the final destination address.",
    hint: "Does an AAAA record include source routing information? No.",
    level: "expert",
    codeExample: "# No DNS record for routing headers"
  },
  {
    question: "What is the difference between an AAAA record and an A6 record (obsolete)?",
    shortAnswer: "A6 was an experimental IPv6 record that supported address aggregation and was deprecated; AAAA is the standard.",
    explanation: "A6 records (RFC 2874) allowed partial/aggregate delegation of IPv6 addresses but added complexity and was never widely adopted. AAAA records are simple, direct, and fully supported. A6 is no longer used.",
    hint: "Why did A6 records fail?",
    level: "expert",
    codeExample: "# A6 records are almost extinct; use AAAA"
  },
  {
    question: "How does an AAAA record work with IPv6 anycast addressing?",
    shortAnswer: "The AAAA record points to an anycast address; the network routes the packet to the nearest instance.",
    explanation: "Many public DNS resolvers (e.g., 2001:4860:4860::8888) use anycast. The AAAA record is just the anycast IP. Routers decide which physical server receives the packet. This provides load distribution and high availability.",
    hint: "Why does a single AAAA record for 2001:4860:4860::8888 work worldwide?",
    level: "expert",
    codeExample: "traceroute6 2001:4860:4860::8888  # Shows route to nearest anycast node"
  }
];

export default questions;