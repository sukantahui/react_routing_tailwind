// topic1_files/topic1_questions.js
// 30 moderate-to-expert level questions about Domain Names vs IP Addresses

const questions = [
  {
    question: "What is the fundamental difference between a domain name and an IP address?",
    shortAnswer: "A domain name is human-readable and memorable, while an IP address is a numeric identifier used by computers for routing.",
    explanation: "Domain names (like 'google.com') are designed for human convenience, using words and hierarchies. IP addresses (like '172.217.168.46') are structured for network devices to locate and communicate with each other. DNS translates between the two. Without domain names, we would have to memorize long numbers for every site.",
    hint: "Think about how you find a contact in your phone by name, but the phone dials a number.",
    level: "basic",
    codeExample: "nslookup google.com  # Shows both name and IP"
  },
  {
    question: "Can a single IP address host multiple domain names? If so, how?",
    shortAnswer: "Yes, through virtual hosting (HTTP/1.1 Host header or TLS SNI), many domains can share one IP.",
    explanation: "When a web server receives a request for 'siteA.com' and 'siteB.com' both pointing to the same IP, the server examines the HTTP 'Host' header or TLS SNI to determine which website content to serve. This allows efficient use of IPv4 addresses. Without virtual hosting, each domain would need a unique IP.",
    hint: "Think of an apartment building: one street address (IP) with multiple apartments (domain names).",
    level: "intermediate",
    codeExample: "curl -H 'Host: siteA.com' http://192.0.2.1  # Works even if both domains resolve to 192.0.2.1"
  },
  {
    question: "What is the maximum length of a domain name (including labels and dots)?",
    shortAnswer: "255 characters total, with each label (part between dots) limited to 63 characters.",
    explanation: "The full domain name (FQDN) cannot exceed 255 octets (bytes) in wire format. Each label (e.g., 'www', 'example') is limited to 63 characters. Combined with dot separators, practical limits are around 253 characters for common representation. DNS software enforces these limits.",
    hint: "Would a domain name with a 70-character label be valid?",
    level: "intermediate",
    codeExample: "dig +short TXT 'a'*63 + '.example.com'  # Fails if label >63"
  },
  {
    question: "Why do some websites work when you directly enter their IP address in a browser, while others show an error?",
    shortAnswer: "If the web server uses name-based virtual hosting, it can't know which site to serve without the domain name in the Host header.",
    explanation: "When you type an IP address, the browser sends no 'Host' header (or sends the IP). The server has only one default website to display. For shared hosting with hundreds of domains on one IP, the server needs the domain name to pick the right site. Dedicated IPs (one site per IP) always work.",
    hint: "Try visiting https://172.217.168.46 - what do you see? Compare to https://google.com.",
    level: "expert",
    codeExample: "curl -I http://93.184.216.34  # Example.com's IP works because it's the default"
  },
  {
    question: "What is the difference between IPv4 and IPv6 address formats? Give examples.",
    shortAnswer: "IPv4 uses 32-bit dotted-decimal (e.g., 192.0.2.1); IPv6 uses 128-bit hexadecimal with colons (e.g., 2001:0db8::1).",
    explanation: "IPv4 addresses are 4 numbers 0-255 separated by dots. IPv6 addresses are 8 groups of 4 hex digits, but leading zeros and consecutive zeros can be compressed (::). IPv6 was created due to IPv4 exhaustion (~4.3 billion addresses vs 340 undecillion in IPv6).",
    hint: "Count the dots in an IPv4 address vs colons in IPv6. Which is longer?",
    level: "basic",
    codeExample: "ping -6 google.com  # Shows IPv6 address if available"
  },
  {
    question: "What does the 'ping' command tell you about the relationship between domain and IP?",
    shortAnswer: "It resolves the domain name to an IP address via DNS and then sends ICMP echo requests to that IP.",
    explanation: "Ping first performs a DNS lookup (A or AAAA record) to translate the domain to an IP. Then it sends packets to that IP. The output shows both the IP used and response times. This demonstrates that behind every domain name, there is at least one IP address (or a round-robin set).",
    hint: "Run 'ping google.com' and note the IP. Then run 'ping -4 google.com' and 'ping -6 google.com'.",
    level: "basic",
    codeExample: "ping -c 4 example.com  # Shows IP in first line"
  },
  {
    question: "What is a fully qualified domain name (FQDN) and how does it differ from a relative domain name?",
    shortAnswer: "FQDN specifies the exact location in the DNS hierarchy ending with a dot; relative names are interpreted within a search domain.",
    explanation: "An FQDN ends with a dot (e.g., 'mail.example.com.') indicating it is absolute from the root. A relative name (e.g., 'mail') is combined with configured search domains (e.g., 'example.com') to become 'mail.example.com'. In DNS configuration files, omitting the trailing dot is a common source of mistakes.",
    hint: "In /etc/resolv.conf, the 'search' directive appends domains to relative names.",
    level: "intermediate",
    codeExample: "dig mail.example.com  # Without trailing dot, may be relative. dig mail.example.com. # FQDN"
  },
  {
    question: "Can a domain name contain spaces or special characters?",
    shortAnswer: "Domain names can only contain letters, digits, hyphens (not at start/end), and internationalized characters via Punycode.",
    explanation: "Legacy DNS (RFC 1035) allows alphanumeric and hyphen. Modern IDNA (Internationalized Domain Names) allows Unicode characters (e.g., 'müller.de') by encoding them as 'xn--mller-kva.de'. Spaces, underscores, and most punctuation are forbidden in domain names (underscores are allowed in SRV records but not in hostnames).",
    hint: "Why can't you register 'my site.com'? What about 'münchen.de'?",
    level: "intermediate",
    codeExample: "dig xn--mller-kva.de  # Shows punycode for müller.de"
  },
  {
    question: "What is a private IP address and how is it different from a public IP?",
    shortAnswer: "Private IPs (e.g., 192.168.x.x, 10.x.x.x) are reserved for internal networks and not routable on the public internet.",
    explanation: "Private IP ranges (RFC 1918) can be reused within many local networks. Routers perform NAT (Network Address Translation) to map private IPs to a public IP for internet access. Public IP addresses are globally unique and assigned by IANA/RIRs. Domain names normally point to public IPs, but internal DNS can map names to private IPs.",
    hint: "What is the IP address of your home router? Does it start with 192.168?",
    level: "basic",
    codeExample: "ip addr show  # Shows your device's IPs, likely including a 192.168.x.x"
  },
  {
    question: "What does the 'hostname' command on a Linux machine display relative to DNS?",
    shortAnswer: "It displays the local machine's configured hostname, which may or may not be a registered DNS domain name.",
    explanation: "The hostname can be a simple name (e.g., 'desktop1') or an FQDN (e.g., 'desktop1.internal.company.com'). This name is not automatically published in DNS unless configured. Reverse DNS (PTR record) maps an IP back to a name, but the local hostname is just an internal label.",
    hint: "Change your hostname and see if it affects external DNS resolution for your machine.",
    level: "basic",
    codeExample: "hostname  # Prints local hostname\nhostname -f  # Shows FQDN if configured"
  },
  {
    question: "Why might a domain name resolve to different IP addresses for different users around the world?",
    shortAnswer: "DNS geo-location routing returns IPs based on the resolver's location to reduce latency and balance load.",
    explanation: "Global services like Google or Netflix use GeoDNS (also called Location-Based DNS). The DNS server examines the source IP of the query and returns the nearest server's IP. This reduces latency and improves user experience. CDNs (Content Delivery Networks) rely heavily on this technique.",
    hint: "If you use a VPN to appear in another country, some websites show different content or servers.",
    level: "intermediate",
    codeExample: "dig +short google.com  # Run from different locations; may get different IPs"
  },
  {
    question: "What is the purpose of the 'hosts' file on a computer?",
    shortAnswer: "The hosts file allows local override of DNS, mapping domain names to IP addresses before querying DNS.",
    explanation: "Located at /etc/hosts (Unix) or C:\Windows\System32\drivers\etc\hosts (Windows), this file is read first by the system's stub resolver. It can be used to block domains (redirect to 0.0.0.0), develop websites locally, or override broken DNS. However, changes only affect the local machine.",
    hint: "If you add '127.0.0.1 facebook.com' to hosts, what happens?",
    level: "basic",
    codeExample: "cat /etc/hosts  # See local overrides"
  },
  {
    question: "Explain the difference between a domain name and a URL.",
    shortAnswer: "A domain name is just the host part (e.g., example.com); a URL includes protocol, path, and other components (e.g., https://example.com/page).",
    explanation: "A domain name is a subset of a URL. The URL (Uniform Resource Locator) specifies the protocol (http, https, ftp), the domain (or IP), optional port, path, query parameters, and fragment. DNS only handles the domain-to-IP translation; it doesn't understand paths or protocols.",
    hint: "Which part of 'https://www.kolkata.gov.in/services' is the domain name?",
    level: "basic",
    codeExample: "nslookup example.com  # Works; nslookup https://example.com does not"
  },
  {
    question: "What is a subdomain? Give an example where subdomains are useful.",
    shortAnswer: "A subdomain is a domain that is part of a larger domain (e.g., 'mail.google.com' under 'google.com').",
    explanation: "Subdomains allow logical organization without buying new domains. For example, 'blog.susmita.com' for blog, 'store.abhronila.in' for e-commerce, 'api.mamata.edu' for APIs. Subdomains can have separate DNS records and even be delegated to different name servers.",
    hint: "How does 'news.ycombinator.com' differ from 'ycombinator.com'?",
    level: "basic",
    codeExample: "dig mail.google.com  # Shows subdomain resolution"
  },
  {
    question: "Why do some domain names start with 'www'? Is it required?",
    shortAnswer: "'www' is a conventional subdomain; it is not required but historically used to designate the web server.",
    explanation: "Originally, 'www' distinguished web service from other services like 'ftp', 'mail', 'news'. Today, many domains serve the main website directly on the apex domain (example.com) and also on 'www' as a CNAME or A record. Some prefer 'www' because cookie behavior and some DNS constraints are easier.",
    hint: "Try visiting 'example.com' and 'www.example.com' — do they show the same site?",
    level: "basic",
    codeExample: "dig example.com +short && dig www.example.com +short  # Compare IPs"
  },
  {
    question: "What is the role of the root zone in DNS regarding domain names?",
    shortAnswer: "The root zone is the topmost level of the DNS hierarchy, containing pointers to TLD nameservers for .com, .org, etc.",
    explanation: "When a resolver doesn't know any TLD servers, it queries a root server (one of 13 logical root server families). The root zone file lists all TLDs and their authoritative name servers. Without the root zone, no domain name could be resolved because the chain would be broken.",
    hint: "Think of the root as the main index of a library that tells you which floor each book category is on.",
    level: "intermediate",
    codeExample: "dig . NS  # Queries a root server for NS records of the root"
  },
  {
    question: "Can a domain name be an IP address in reverse? Explain.",
    shortAnswer: "Yes, using reverse DNS (PTR records), an IP address can map to a domain name, but there is no requirement for consistency.",
    explanation: "Reverse DNS is used primarily for logging, email anti-spam (verifying HELO name matches reverse), and network troubleshooting. The mapping is done via the in-addr.arpa domain for IPv4 and ip6.arpa for IPv6. However, many IP addresses may have generic reverse entries (e.g., 'customer-ip-1-2-3-4.isp.com') or none at all.",
    hint: "What does 'dig -x 8.8.8.8' show?",
    level: "intermediate",
    codeExample: "dig -x 192.0.2.1  # Reverse lookup"
  },
  {
    question: "What is domain name registration and how does it relate to DNS resolution?",
    shortAnswer: "Registration reserves a domain name in a TLD registry; DNS resolution happens after registration when nameservers publish records.",
    explanation: "You register a domain with a registrar, paying a fee to the registry for the right to use that name. You then set the authoritative nameservers (NS records) in the registry. After that, you can create DNS records (A, MX, etc.) on those nameservers. Registration alone doesn't make a website work; you must also host DNS records.",
    hint: "Is buying a domain enough to have a website? What else is needed?",
    level: "basic",
    codeExample: "whois example.com  # Shows registrar and nameservers"
  },
  {
    question: "How does DNS handle internationalized domain names (IDNs) like 'müller.com'?",
    shortAnswer: "IDNs are converted to Punycode (starting with 'xn--') and stored as ASCII in DNS.",
    explanation: "DNS protocol original only allows ASCII characters. To support accented or non-Latin characters (Devanagari, Arabic, Chinese), IDNA (Internationalized Domain Names in Applications) encodes them into ASCII-compatible encoding (Punycode). For example, 'müller.com' becomes 'xn--mller-kva.com'. The browser shows the Unicode form but DNS queries use the Punycode form.",
    hint: "What would be the punycode for 'কোলকাতা.ভারত'? It starts with 'xn--'",
    level: "expert",
    codeExample: "dig xn--mller-kva.com  # Works the same as müller.com"
  },
  {
    question: "Explain the concept of 'DNS camping' or 'domain tasting'. How does it misuse domain names?",
    shortAnswer: "Domain tasting is registering a domain, using it for 5 days (add grace period), then refunding, to test profitability without cost.",
    explanation: "Before ICANN restrictions, registrars had a 5-day add grace period for full refunds. Abusers would register thousands of domains, place ads, and measure click-through rates. If profitable, they kept the domain; otherwise, they returned it for a refund. This wasted resources and blocked legitimate names. ICANN now imposes fees for excessive deletions.",
    hint: "Why would someone register a domain temporarily without paying? What harm does it cause?",
    level: "expert",
    codeExample: "Not applicable; historical abuse."
  },
  {
    question: "What is a wildcard DNS record and how does it affect subdomain matching?",
    shortAnswer: "A wildcard record (*.example.com) matches any subdomain that does not have an explicit record.",
    explanation: "If you have '*.example.com A 192.0.2.1', then any undefined subdomain like 'random.example.com' will resolve to that IP. This is convenient for catch-all but can hide typos and cause security issues (e.g., SPF records should not use wildcards). Wildcards do not override explicit records.",
    hint: "If you have both '*.example.com' and 'mail.example.com', which one is used for 'mail.example.com'?",
    level: "intermediate",
    codeExample: "dig random.example.com  # May show wildcard IP"
  },
  {
    question: "What is the difference between a second-level domain (SLD) and a top-level domain (TLD)?",
    shortAnswer: "TLD is the last part (.com, .org); SLD is the part immediately before the TLD (example in example.com).",
    explanation: "In 'google.com', 'com' is the TLD, 'google' is the SLD. Some domains have more levels: 'co.uk' where 'uk' is ccTLD, 'co' is second-level, and 'bbc' is third-level. Registrars sell SLDs under TLDs. TLDs are managed by IANA; SLDs are chosen by registrants.",
    hint: "In 'bbc.co.uk', which part is TLD, which is SLD?",
    level: "basic",
    codeExample: "dig example.com  # SLD=example, TLD=com"
  },
  {
    question: "Why does DNS use both UDP and TCP? Which is default for normal queries?",
    shortAnswer: "UDP is default for small queries due to low overhead; TCP is used for large responses (e.g., DNSSEC) or zone transfers.",
    explanation: "UDP is stateless and fast, suitable for most DNS responses under 512 bytes (or up to 4096 with EDNS). If a response is larger, the server sets the TC flag, and the resolver retries over TCP. TCP is also used for AXFR (zone transfers). Modern DNS mostly uses UDP, falling back to TCP when needed.",
    hint: "Why might a response never fit in UDP? When DNSSEC is used, responses get larger.",
    level: "intermediate",
    codeExample: "dig +tcp example.com  # Force TCP query"
  },
  {
    question: "What is a DNS 'glue record' and when is it required?",
    shortAnswer: "Glue records provide IP addresses for nameservers that are within the domain they serve, to break circular dependencies.",
    explanation: "If your domain's nameserver is ns1.yourdomain.com, then to resolve yourdomain.com you need the IP of ns1.yourdomain.com, but that IP is stored in yourdomain.com's zone — creating a loop. Glue records in the parent zone (e.g., .com) supply that IP directly, allowing the resolver to bootstrap.",
    hint: "Test with 'dig +trace yourdomain.com' and look for 'glue'.",
    level: "expert",
    codeExample: "dig +trace example.com 2>&1 | grep -i glue"
  },
  {
    question: "What is an 'apex domain' (or bare domain) and why is it challenging for certain DNS records?",
    shortAnswer: "The apex domain (e.g., example.com) cannot have a CNAME record per RFC; it requires A/AAAA or other records.",
    explanation: "CNAME records are not allowed at the zone apex because the apex must have certain other records (SOA, NS). To point an apex to another host, cloud providers use ALIAS or ANAME records (non-standard). This is why many websites redirect www.example.com to example.com or vice versa.",
    hint: "Why can't you set 'example.com CNAME something.com'? What happens?",
    level: "expert",
    codeExample: "dig example.com CNAME  # Usually returns no data because CNAME cannot coexist with SOA/NS"
  },
  {
    question: "What is the maximum number of label levels (subdomain depth) in a domain name?",
    shortAnswer: "The maximum total length is 255 bytes, which roughly limits depth to about 127 labels if each is 1 character plus dot, but practically around 10-20 levels.",
    explanation: "No hard limit on label count other than total length. However, extremely deep domains (e.g., a.b.c.d.e.f.g.example.com) are unusual and may not be fully supported by all software. DNS resolvers and servers may impose internal limits (e.g., 127 labels). Good practice: keep it under 5 labels.",
    hint: "Could you have a domain like '1.2.3.4.5.6.7.8.9.10.11.12.13.example.com'? Probably, but would it be usable?",
    level: "expert",
    codeExample: "dig 1.2.3.4.5.6.example.com  # Might resolve if configured"
  },
  {
    question: "What does the 'search' directive in /etc/resolv.conf do?",
    shortAnswer: "It specifies a list of domains to append to relative hostnames when resolving.",
    explanation: "For example, 'search company.com internal.company.com' will cause 'mail' to resolve as 'mail.company.com' and then 'mail.internal.company.com' if the first fails. This saves typing but can cause unexpected delays and privacy leaks.",
    hint: "If you set search to 'foo.com', what will 'ping bar' try to resolve?",
    level: "intermediate",
    codeExample: "cat /etc/resolv.conf  # Look for 'search' line"
  },
  {
    question: "Explain how DNS 'round robin' works with multiple A records for a single domain.",
    shortAnswer: "The nameserver rotates the order of returned IP addresses each time, distributing load without health checking.",
    explanation: "If you have two A records for 'service.example.com', the nameserver may return [IP1, IP2] for the first query, [IP2, IP1] for the next. Clients typically use the first IP, so traffic spreads. However, if IP1 goes down, DNS continues returning it until TTL expires, causing failures.",
    hint: "Run 'dig example.com' multiple times and observe the order of IPs.",
    level: "intermediate",
    codeExample: "dig +short example.com  # Run repeatedly to see rotation"
  },
  {
    question: "What are the legal/brand considerations when choosing a domain name?",
    shortAnswer: "Domains must not infringe trademarks, should avoid confusingly similar names, and may need defensive registrations.",
    explanation: "Registering a domain similar to a trademark can lead to UDRP disputes or lawsuits. Best practice: search trademark databases before registering. Also consider defensive registrations of common typos (e.g., googel.com) and multiple TLDs to protect brand identity.",
    hint: "Why did Apple register apple.com, apple.net, apple.org, and many misspellings?",
    level: "intermediate",
    codeExample: "whois microsoft.com  # Shows legal contact for disputes"
  },
  {
    question: "What is the difference between a domain name registrar and a DNS hosting provider?",
    shortAnswer: "Registrar reserves the name with the registry; DNS hosting stores and answers queries for DNS records.",
    explanation: "The registrar (e.g., GoDaddy, Namecheap) allows you to buy a domain. They often include basic DNS hosting, but you can also use separate DNS providers (Cloudflare, AWS Route53). To use an external DNS hosting, you change the NS records at the registrar to point to the DNS hosting provider's nameservers.",
    hint: "You can buy a domain from GoDaddy but host DNS on Cloudflare. How? Change NS records.",
    level: "intermediate",
    codeExample: "dig NS example.com  # Shows which DNS servers are authoritative"
  }
];

export default questions;