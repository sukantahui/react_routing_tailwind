const questions = [
  {
    question: "What is the primary purpose of DNS?",
    shortAnswer: "DNS translates domain names to IP addresses.",
    explanation: "DNS acts like a phonebook, mapping human-readable names (e.g., example.com) to machine-readable IP addresses (e.g., 192.0.2.1). Without it, users would have to memorize numeric IPs.",
    hint: "Think of calling a friend – you dial a number, not their name, but DNS does the lookup for you.",
    level: "basic",
    codeExample: "nslookup example.com"
  },
  {
    question: "Explain the difference between a domain name and an IP address.",
    shortAnswer: "Domain names are human-readable labels; IP addresses are numeric identifiers for devices on a network.",
    explanation: "Domain names (like 'google.com') are easy to remember, while IP addresses (like '142.250.190.46') are what computers use to locate each other. DNS bridges the two.",
    hint: "Schools have names (easier) and also a physical address (numeric).",
    level: "basic",
    codeExample: null
  },
  {
    question: "Why do we need DNS if we already have IP addresses?",
    shortAnswer: "Because humans remember names better than numbers, and IP addresses can change.",
    explanation: "Websites may move servers, change hosting providers, or load-balance. DNS updates the mapping without requiring you to memorize a new IP every time.",
    hint: "Would you rather remember 'www.barrackporecollege.edu' or '203.0.113.88'?",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is a recursive DNS resolver?",
    shortAnswer: "A server that performs the full DNS lookup on behalf of the client.",
    explanation: "The recursive resolver contacts multiple DNS servers (root, TLD, authoritative) to find the IP address and returns it to your computer. It caches the result for future speed.",
    hint: "Like a travel agent who books your entire trip instead of you calling airlines separately.",
    level: "moderate",
    codeExample: "dig +trace example.com"
  },
  {
    question: "How does DNS improve internet performance?",
    shortAnswer: "Through caching and distributed architecture.",
    explanation: "DNS resolvers cache query results, reducing lookup time for popular domains. The hierarchical structure avoids a single point of failure and spreads load globally.",
    hint: "When Susmita from Jadavpur visits Wikipedia, the DNS result is temporarily stored so Abhronila loads it faster.",
    level: "moderate",
    codeExample: "ipconfig /displaydns (Windows)"
  },
  {
    question: "What is a DNS root server? Why is it critical?",
    shortAnswer: "Root servers are the first step in resolving a domain name; they point to the correct TLD server.",
    explanation: "There are 13 logical root server groups worldwide. They don't know the full IP for a domain, but they direct queries to the appropriate TLD server (e.g., .com, .org).",
    hint: "The librarian doesn't know every book's shelf, but tells you which aisle (TLD) to go to.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Describe a real-world scenario where DNS fails and how you detect it.",
    shortAnswer: "Website doesn't load, 'Server DNS address could not be found' error.",
    explanation: "If DNS is down or misconfigured, typing a domain leads to an error. Using `nslookup` or `dig` will show timeout or NXDOMAIN. You could also try the IP directly in the browser to confirm.",
    hint: "Try changing your DNS server to 8.8.8.8 and see if the site loads.",
    level: "moderate",
    codeExample: "nslookup example.com"
  },
  {
    question: "What is TTL in DNS? How does it affect caching?",
    shortAnswer: "Time To Live – specifies how long a DNS record should be cached.",
    explanation: "Lower TTL (e.g., 300s) means changes propagate quickly but increase resolver load. Higher TTL (e.g., 86400) reduces load but slows down updates.",
    hint: "Short TTL is good before moving servers, long TTL for stable websites.",
    level: "moderate",
    codeExample: "dig +ttlid example.com"
  },
  {
    question: "Compare iterative and recursive DNS queries.",
    shortAnswer: "Recursive asks others to get the final answer; iterative asks for the next best reference.",
    explanation: "In a recursive query, the resolver fully answers the client. In an iterative query, the DNS server replies with a referral to another server (e.g., root → TLD → authoritative).",
    hint: "Recursive = 'bring me the answer'; Iterative = 'who should I ask next?'",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is DNSSEC? Why is it important?",
    shortAnswer: "DNS Security Extensions – adds cryptographic signatures to prevent spoofing.",
    explanation: "DNSSEC ensures that the DNS response you receive is authentic and not tampered with. Without it, attackers could redirect you to malicious sites (DNS spoofing).",
    hint: "Like a tamper-evident seal on a medicine bottle.",
    level: "expert",
    codeExample: "dig +dnssec example.com"
  },
  {
    question: "Explain the purpose of a reverse DNS lookup.",
    shortAnswer: "Maps an IP address back to a domain name.",
    explanation: "Reverse DNS is used for email anti-spam checks, logging, and troubleshooting. It uses the .in-addr.arpa domain for IPv4.",
    hint: "Forward lookup = name → IP ; Reverse = IP → name.",
    level: "moderate",
    codeExample: "dig -x 8.8.8.8"
  },
  {
    question: "What are the most common DNS record types besides A?",
    shortAnswer: "AAAA (IPv6), CNAME (alias), MX (mail), TXT (text), NS (name server).",
    explanation: "AAAA maps to IPv6 addresses; CNAME creates aliases; MX routes email; TXT holds verification/SPF/DKIM; NS indicates authoritative servers.",
    hint: "Mail doesn't use A records – it uses MX. A common beginner mistake.",
    level: "expert",
    codeExample: "dig MX gmail.com"
  },
  {
    question: "How does DNS round-robin work for load balancing?",
    shortAnswer: "Returns multiple IP addresses in a rotating order to distribute traffic.",
    explanation: "If a domain has multiple A records, the DNS resolver cycles through them. It's a simple form of load distribution, but not aware of server health.",
    hint: "Each time you query, you get a different server IP.",
    level: "expert",
    codeExample: "dig google.com (watch multiple A records)"
  },
  {
    question: "What is a stub resolver? How does it differ from a recursive resolver?",
    shortAnswer: "A stub resolver (on your OS) sends queries to a recursive resolver; it doesn't resolve itself.",
    explanation: "Your laptop/phone contains a stub resolver that forwards DNS requests to an ISP or public recursive resolver (e.g., 1.1.1.1). The recursive resolver does the full lookup.",
    hint: "The student asks the teacher; the teacher looks in the library.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Why might you flush your local DNS cache?",
    shortAnswer: "To remove outdated or corrupted entries that cause resolution errors.",
    explanation: "Cached entries with old IPs (after a server migration) can lead to 'website not found'. Flushing forces new lookups.",
    hint: "Try `ipconfig /flushdns` on Windows, `sudo dscacheutil -flushcache` on macOS.",
    level: "moderate",
    codeExample: "sudo systemd-resolve --flush-caches"
  },
  {
    question: "What does NXDOMAIN mean?",
    shortAnswer: "Non-Existent Domain – the domain name does not exist.",
    explanation: "DNS server response code indicating the queried domain name has no records. Could be a typo or unregistered domain.",
    hint: "Not the same as a timeout. Your internet works; the name just isn't known.",
    level: "basic",
    codeExample: "nslookup asdfhjkqwr12345.com"
  },
  {
    question: "How do DNS over HTTPS (DoH) and DNS over TLS (DoT) improve privacy?",
    shortAnswer: "They encrypt DNS queries to prevent eavesdropping and manipulation.",
    explanation: "Traditional DNS queries are cleartext – ISPs can see. DoH/DoT wrap queries in encryption, hiding them from third parties.",
    hint: "Sending a letter in an envelope instead of writing it on a postcard.",
    level: "expert",
    codeExample: "curl --doh-url https://dns.google/dns-query https://example.com"
  },
  {
    question: "Describe a DNS amplification attack.",
    shortAnswer: "Attackers send small queries to open DNS resolvers, which reply with large responses to the victim's IP.",
    explanation: "Spoofed source IP = victim. The resolver sends massive data to the victim, overwhelming their bandwidth.",
    hint: "Using a bullhorn to whisper into another person's ear – the response is loud.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is a wildcard DNS record? Give an example.",
    shortAnswer: "A record that matches any subdomain not explicitly defined, using *.",
    explanation: "*.example.com → all subdomains (e.g., blog.example.com, shop.example.com) resolve to the same IP unless overridden.",
    hint: "Useful for SAAS platforms but can cause accidental matches.",
    level: "expert",
    codeExample: "* 3600 IN A 192.0.2.100"
  },
  {
    question: "Why might a school network run its own local DNS server?",
    shortAnswer: "For caching, content filtering, and internal hostname resolution.",
    explanation: "Schools like Barrackpore High can block certain domains, speed up repeated requests, and use friendly names for internal servers (e.g., 'library.local').",
    hint: "No need to go to the internet every time a student visits the school portal.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is EDNS0 (Extension Mechanisms for DNS)?",
    shortAnswer: "Allows DNS messages larger than 512 bytes and adds additional features.",
    explanation: "Older DNS limited UDP size. EDNS0 supports larger responses (DNSSEC, IPv6) and client subnet info.",
    hint: "Like upgrading from a postcard to a large envelope.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does a CNAME record differ from an ALIAS record?",
    shortAnswer: "CNAME must point to a domain name and cannot coexist with other record types; ALIAS (nonstandard) allows root apex records.",
    explanation: "At the zone apex (example.com), a CNAME would break MX records. ALIAS (provider-specific) acts like CNAME but resolves at the nameserver.",
    hint: "CNAME: strictly alias. ALIAS: 'virtual' CNAME for apex.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the role of a TLD server?",
    shortAnswer: "Handles top-level domains like .com, .org, .in, and directs queries to authoritative name servers.",
    explanation: "After the root server, the TLD server knows which authoritative server knows about the second-level domain (e.g., example.com).",
    hint: "Post office that routes mail to the correct city (TLD).",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Explain DNS propagation time. Why does it take hours sometimes?",
    shortAnswer: "Time it takes for DNS changes to spread across all caching resolvers worldwide.",
    explanation: "Because each resolver respects TTL. Even if you update your authoritative server, old cached entries linger until TTL expires.",
    hint: "If you set TTL to 86400 seconds, changes will take up to a day to fully propagate.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is a split-horizon DNS? When is it used?",
    shortAnswer: "Different DNS answers depending on the client's source IP (internal vs external).",
    explanation: "Corporate networks give internal IPs to internal users, but external users see public IPs for the same domain.",
    hint: "Library gives a different answer when you're inside the library vs outside.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What does the SOA record store?",
    shortAnswer: "Start of Authority – contains administrative info about the zone: primary NS, email, serial number, refresh timers.",
    explanation: "The SOA record is mandatory for every zone. Serial number must increment when the zone changes.",
    hint: "Metadata about the zone, like a library's information card.",
    level: "expert",
    codeExample: "dig SOA example.com"
  },
  {
    question: "How do you verify that DNSSEC is working?",
    shortAnswer: "Use `dig +dnssec` and check the 'ad' (authentic data) flag.",
    explanation: "The AD flag in DNS response indicates that the resolver validated DNSSEC signatures. Absence suggests no DNSSEC or validation failure.",
    hint: "`dig +dnssec google.com | grep flags`",
    level: "expert",
    codeExample: "dig +dnssec sigok.verteiltesysteme.net"
  },
  {
    question: "What is a DNS sinkhole? Give a security use case.",
    shortAnswer: "A DNS server that returns a false IP (often 0.0.0.0 or a warning page) for malicious domains.",
    explanation: "Used by security appliances to block malware, ads, or phishing domains by resolving them to harmless addresses.",
    hint: "If a student tries to visit a dangerous site, the school DNS sends them to a 'blocked' page.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Why might an administrator set a very low TTL (e.g., 30 seconds) temporarily?",
    shortAnswer: "To make DNS changes propagate rapidly during a migration or failover.",
    explanation: "Low TTL ensures caches expire quickly, so clients get the new IP almost immediately after the change.",
    hint: "Before moving a server, lower TTL; after migration, increase it again.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the maximum number of labels in a fully qualified domain name?",
    shortAnswer: "127 levels, total length 255 characters.",
    explanation: "Each label (part between dots) max 63 characters. The entire FQDN including dots is ≤ 255 bytes.",
    hint: "Subdomain.subdomain.subdomain... too long will be invalid.",
    level: "expert",
    codeExample: null
  }
];

export default questions;