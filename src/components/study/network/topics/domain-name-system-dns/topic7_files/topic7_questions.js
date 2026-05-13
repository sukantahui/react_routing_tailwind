// topic7_files/topic7_questions.js
// 30 moderate-to-expert level questions about CNAME Records (Alias)

const questions = [
  {
    question: "What is the primary purpose of a CNAME record?",
    shortAnswer: "A CNAME record creates an alias from one domain name to another (canonical) domain name.",
    explanation: "CNAME stands for Canonical Name. It allows multiple domain names to resolve to the same IP address without maintaining duplicate A records. The DNS resolver follows the CNAME to the target domain and then resolves that target's A/AAAA record.",
    hint: "Think of it as a symbolic link or shortcut in a filesystem.",
    level: "basic",
    codeExample: "dig CNAME www.example.com +short  # Shows target domain"
  },
  {
    question: "Why can't you have a CNAME record at the zone apex (e.g., example.com)?",
    shortAnswer: "Because the apex must have SOA and NS records, and CNAME cannot coexist with any other record type.",
    explanation: "RFC 1034 states that if a CNAME is present at a node, no other resource records (except DNSSEC) should be present. The zone apex requires SOA and NS records. Therefore, CNAME cannot be placed at the apex. Some providers offer ALIAS/ANAME as a workaround.",
    hint: "What essential records does every DNS zone need that would conflict with CNAME?",
    level: "intermediate",
    codeExample: "dig example.com SOA  # Shows SOA record that prevents CNAME at apex"
  },
  {
    question: "What happens when a DNS resolver encounters a CNAME record?",
    shortAnswer: "It replaces the original query name with the CNAME target and restarts the resolution process for that new name.",
    explanation: "The resolver does not return the CNAME itself to the client (except for some diagnostic tools). Instead, it follows the alias: it looks up the A/AAAA record of the canonical name. This may involve multiple CNAME hops. The final answer is the IP address of the ultimate target.",
    hint: "Does the browser ever see the CNAME directly? Usually not — only the final IP.",
    level: "intermediate",
    codeExample: "dig www.example.com  # Answer section shows (possibly) CNAME and A"
  },
  {
    question: "Can a CNAME point to another CNAME? How many hops are allowed?",
    shortAnswer: "Yes, CNAME chaining is allowed. Most resolvers limit to 10-20 hops to prevent infinite loops.",
    explanation: "You can have www -> alias1 -> alias2 -> actual domain. Each hop adds resolution time. Resolvers implement a maximum (e.g., BIND default 16) to avoid chasing loops. Exceeding the limit results in an error (e.g., 'CNAME loop' or SERVFAIL).",
    hint: "What could cause an infinite CNAME loop? Two CNAMEs pointing to each other.",
    level: "expert",
    codeExample: "dig +trace www.example.com  # Shows multiple CNAME steps"
  },
  {
    question: "What is the difference between a CNAME record and an A record?",
    shortAnswer: "A record maps directly to an IPv4 address; CNAME maps to another domain name.",
    explanation: "An A record is a leaf: it gives the final IP address. A CNAME is an alias: it points to another name that must eventually resolve to an A/AAAA record. You cannot have both a CNAME and an A record at the same name.",
    hint: "Which one would you use to point 'www' to the same IP as the apex domain?",
    level: "basic",
    codeExample: "dig google.com A vs dig www.google.com CNAME"
  },
  {
    question: "Why do many websites set 'www' as a CNAME to the apex domain?",
    shortAnswer: "So that both www.example.com and example.com point to the same content, and changes only require updating the apex A/AAAA record.",
    explanation: "The apex (example.com) has the real A record. The CNAME for www points to example.com. This is a common pattern: it consolidates IP management. Additionally, it respects the canonical domain preference (either www or non-www).",
    hint: "If you change the IP address of example.com, does www.example.com automatically update?",
    level: "basic",
    codeExample: "dig www.example.com CNAME +short  # Usually points to example.com"
  },
  {
    question: "Can a CNAME record point to an IP address directly?",
    shortAnswer: "No, CNAME must point to another domain name, not an IP address.",
    explanation: "The rdata of a CNAME is a domain name, not an address. To point a name to an IP, use A or AAAA records. If you need to alias to an IP, you must create an A record (or use ALIAS/ANAME for apex proxies).",
    hint: "What record type would you use to make 'server1.example.com' an alias for the IP 192.0.2.5?",
    level: "basic",
    codeExample: "# Wrong: alias.com. CNAME 192.0.2.1  # Not allowed"
  },
  {
    question: "How does DNS resolution behave when a CNAME target is in a different DNS zone?",
    shortAnswer: "The resolver must follow the CNAME across zone boundaries, potentially contacting different authoritative servers.",
    explanation: "If www.example.com is a CNAME to cdn.cloudflare.net, the resolver first asks example.com's authoritative server for www, gets the CNAME, then starts a fresh resolution for cdn.cloudflare.net, querying root, .net TLD, and Cloudflare's authoritative servers. This adds latency.",
    hint: "Why might cross-zone CNAMEs be slower than internal CNAMEs?",
    level: "expert",
    codeExample: "dig www.linkedin.com  # Often CNAME to a different domain"
  },
  {
    question: "What is an ALIAS/ANAME record and how does it solve the apex CNAME problem?",
    shortAnswer: "ALIAS/ANAME is a proprietary record that acts like a CNAME at the apex by returning A/AAAA records derived from the target.",
    explanation: "Cloudflare, DNSimple, and others offer ALIAS records for the apex. The DNS provider periodically resolves the target domain and serves the resulting IP addresses as if they were A/AAAA records. This allows example.com to effectively alias to another domain while still having SOA/NS records.",
    hint: "How can you point example.com to a Heroku app (which requires a CNAME)?",
    level: "expert",
    codeExample: "# Example: example.com ALIAS something.herokuapp.com (non-standard)"
  },
  {
    question: "What is the TTL behavior of a CNAME record?",
    shortAnswer: "Both the CNAME and the target A/AAAA records have their own TTLs; the lower effective TTL determines caching.",
    explanation: "The CNAME itself has a TTL (e.g., 3600). The target A record also has a TTL. The resolver caches the CNAME mapping for its TTL, and separately caches the target's A record for its TTL. The overall answer is cached for the minimum of the two.",
    hint: "If you change the target's IP, which TTL controls how soon clients see the change?",
    level: "intermediate",
    codeExample: "dig www.example.com  # Shows CNAME TTL and A TTL separately"
  },
  {
    question: "Can you have an MX record pointing to a CNAME?",
    shortAnswer: "No, RFC 2181 prohibits MX records from pointing to a CNAME. The target of an MX must be a host with an A/AAAA record.",
    explanation: "Email servers require that the mail exchange hostname resolves to an address. Using a CNAME can cause loops or inconsistencies. Some implementations may allow it, but it's against standard and may break email delivery.",
    hint: "Why would a CNAME break mail delivery?",
    level: "expert",
    codeExample: "# Bad: example.com MX 10 mail.example.com\n# mail.example.com CNAME realmail.smtp.com  # Not allowed"
  },
  {
    question: "Can a CNAME coexist with a TXT record at the same name?",
    shortAnswer: "No, CNAME cannot coexist with any other record type (except DNSSEC signatures) at the same name.",
    explanation: "According to DNS specification, if a CNAME exists, no other data (including TXT, MX, A, etc.) can be present. This is because the CNAME is authoritative for that name, redirecting everything.",
    hint: "If you need both, use separate names (e.g., 'verify.example.com' TXT and 'www.example.com' CNAME).",
    level: "intermediate",
    codeExample: "# Conflict: www CNAME a.com; www TXT 'v=spf1'  # Invalid"
  },
  {
    question: "What is a 'CNAME loop' and how does a resolver detect it?",
    shortAnswer: "A CNAME loop occurs when following CNAMEs leads back to a previously visited name. Resolvers track hop count and visited names.",
    explanation: "Example: a CNAME to b, b CNAME to a. The resolver will loop forever. Resolvers implement loop detection: they keep a list of names seen in the chain, or a hop limit (usually 16). When a loop is detected, they return SERVFAIL.",
    hint: "What might happen if you accidentally set both www and apex CNAMEs pointing to each other?",
    level: "expert",
    codeExample: "# Loop: a CNAME b; b CNAME a"
  },
  {
    question: "How do you check if a domain has a CNAME record using command line?",
    shortAnswer: "Use 'dig CNAME domain.com' or 'nslookup -type=CNAME domain.com'.",
    explanation: "On Linux/macOS: 'dig www.google.com CNAME +short' will print the target if it exists. On Windows: 'nslookup -type=CNAME www.google.com'. If the name has an A record directly, no CNAME is shown.",
    hint: "What command shows only the target domain of a CNAME?",
    level: "basic",
    codeExample: "dig www.github.com CNAME +short  # Returns github.com"
  },
  {
    question: "Can a CNAME record be used for root domain forwarding (e.g., example.com → www.example.com)?",
    shortAnswer: "Not directly (CNAME at apex forbidden). Use HTTP redirects (301) at the web server instead.",
    explanation: "You cannot put a CNAME at example.com. Instead, configure your web server (Apache/Nginx) to redirect example.com to www.example.com. Alternatively, use ALIAS/ANAME records if your DNS provider supports them.",
    hint: "How would you ensure that visitors to example.com end up at www.example.com?",
    level: "intermediate",
    codeExample: "# Nginx: server { server_name example.com; return 301 http://www.example.com$request_uri; }"
  },
  {
    question: "What is the maximum number of CNAME records allowed for a single name?",
    shortAnswer: "Only one CNAME record per name (no multiple CNAMEs), but you can have CNAME chains across different names.",
    explanation: "A node can have at most one CNAME record. You cannot have two different CNAMEs for the same name (e.g., 'www CNAME a' and 'www CNAME b' is invalid). However, multiple names can CNAME to the same target.",
    hint: "If you want multiple aliases, create multiple names, each with its own CNAME.",
    level: "basic",
    codeExample: "# Valid: a CNAME c; b CNAME c\n# Invalid: a CNAME c; a CNAME d"
  },
  {
    question: "How does DNSSEC affect CNAME records?",
    shortAnswer: "DNSSEC signs CNAME records with RRSIG, just like other record types. The chain of trust must cover both CNAME and target.",
    explanation: "When a CNAME is present, the RRSIG covers the CNAME record itself. The resolver must validate the signature for the CNAME, then validate the target's A/AAAA record signatures. Misconfiguration can cause validation failures.",
    hint: "Why might a DNSSEC-validating resolver return SERVFAIL for a CNAME chain?",
    level: "expert",
    codeExample: "dig +dnssec www.example.com CNAME  # Shows RRSIG for CNAME"
  },
  {
    question: "What is the difference between a CNAME and a DNAME record?",
    shortAnswer: "CNAME aliases a single name; DNAME aliases an entire subtree (all names under a prefix).",
    explanation: "DNAME (Delegation Name) redirects all subdomains. For example, 'example.com DNAME newdomain.com' makes 'www.example.com' resolve to 'www.newdomain.com'. DNAME is rarely used and not supported by all resolvers.",
    hint: "If you want to rename a whole subdomain hierarchy, which record type would you use?",
    level: "expert",
    codeExample: "dig DNAME example.com  # Not commonly found"
  },
  {
    question: "Can you have a CNAME record that points to itself?",
    shortAnswer: "Theoretically possible but causes an unresolvable loop and is never useful.",
    explanation: "Such a self-referential CNAME (e.g., 'a CNAME a') leads to infinite recursion. Resolvers will detect the loop and return SERVFAIL. It should never be configured intentionally.",
    hint: "What would happen if you set www CNAME www?",
    level: "basic",
    codeExample: "# Invalid: www.example.com. CNAME www.example.com."
  },
  {
    question: "How do CDNs use CNAME records for domain mapping?",
    shortAnswer: "You CNAME your custom domain to the CDN provider's domain (e.g., cdn.yourdomain.com → provider.edgecdn.net).",
    explanation: "CDNs ask you to create a CNAME record from your subdomain (e.g., static.example.com) to their endpoint (e.g., example.akamaiedge.net). The CDN then resolves that endpoint to its edge servers. This decouples your DNS from CDN IP changes.",
    hint: "Why does Cloudflare ask you to change nameservers, but other CDNs ask for CNAME?",
    level: "intermediate",
    codeExample: "dig static.example.com CNAME +short  # Returns CDN domain"
  },
  {
    question: "What is the difference between a CNAME and an HTTP redirect?",
    shortAnswer: "CNAME operates at the DNS level; HTTP redirect (301/302) operates at the web server level.",
    explanation: "CNAME changes which IP address is resolved, but the browser still requests the original hostname in the Host header. HTTP redirect sends a new URL to the browser, changing the address bar. CNAME is transparent; redirect changes the visible URL.",
    hint: "Which one would keep the original domain in the browser address bar?",
    level: "intermediate",
    codeExample: "# CNAME: browser shows example.com, but content from target.com"
  },
  {
    question: "Can a wildcard CNAME record exist?",
    shortAnswer: "Yes, you can have *.example.com CNAME target.example.com, but wildcard CNAMEs have the same restrictions as any CNAME.",
    explanation: "A wildcard CNAME matches any non-existent subdomain. However, if a specific subdomain (e.g., www.example.com) has its own record, that takes precedence. Wildcard CNAMEs are allowed but can be confusing and cause unexpected behavior.",
    hint: "What would '*.example.com CNAME example.com' cause for 'mail.example.com' if mail has its own A record?",
    level: "expert",
    codeExample: "dig random.example.com  # Returns target of wildcard CNAME"
  },
  {
    question: "How does a CNAME record affect email authentication records like SPF?",
    shortAnswer: "SPF records should not be looked up via CNAME; they must be on the original domain or its A record.",
    explanation: "SPF (TXT) records are not followed by CNAME. If your domain has a CNAME, email receivers may ignore the SPF policy. Always place SPF records on a domain that does not CNAME to another. This is another reason to avoid CNAMEs on mail domains.",
    hint: "Why might your email be marked as spam if you CNAME your domain to a shared platform?",
    level: "expert",
    codeExample: "# Bad: example.com CNAME sharedhost.com; SPF on sharedhost.com ignored"
  },
  {
    question: "What is the purpose of the 'CNAME' record in a reverse DNS zone?",
    shortAnswer: "Reverse zones (in-addr.arpa, ip6.arpa) use PTR records, not CNAME. CNAME is rarely used in reverse.",
    explanation: "While technically possible to put CNAME in reverse zones, it's non-standard and confusing. Reverse lookups should use PTR records to map IP to hostname. CNAME in reverse DNS would add unnecessary indirection.",
    hint: "What record type is used for reverse mapping instead of CNAME?",
    level: "intermediate",
    codeExample: "dig -x 8.8.8.8  # Uses PTR, not CNAME"
  },
  {
    question: "What happens to a CNAME record when the target domain expires or is deleted?",
    shortAnswer: "The CNAME becomes a 'dangling alias' — queries will fail (NXDOMAIN or SERVFAIL).",
    explanation: "The CNAME itself may still exist, but the target domain no longer resolves. Clients will get an error (NXDOMAIN if target doesn't exist, or SERVFAIL). It's important to monitor and clean up stale CNAMEs.",
    hint: "If you delete the target domain, does the alias automatically stop working?",
    level: "intermediate",
    codeExample: "# CNAME points to expired.domain.com — resolution fails"
  },
  {
    question: "Can a CNAME record be used for SRV records?",
    shortAnswer: "No, the target of an SRV record should not be a CNAME. Use the canonical name directly.",
    explanation: "RFC 2782 discourages CNAMEs in SRV record targets because the SRV protocol expects the target to resolve to an address. Some implementations may follow CNAMEs, but it's not standard and may break.",
    hint: "What record type does SRV require as its target? A hostname with A/AAAA.",
    level: "expert",
    codeExample: "# Bad: _sip._tcp.example.com SRV 0 5 5060 server-alias.example.com\n# server-alias.example.com CNAME real-server.example.com  # Problematic"
  },
  {
    question: "How do you troubleshoot a CNAME that is not resolving correctly?",
    shortAnswer: "Check the CNAME chain using 'dig +trace', ensure no loops, and verify that the target has valid A/AAAA records.",
    explanation: "Use 'dig +trace alias.com' to see each step. Check if the CNAME exists at the authoritative server. Verify that the target domain resolves (dig target.com A+short). Ensure no conflicting records (like an A record at the same name). Also check TTL propagation delays.",
    hint: "What command would show the full resolution path including CNAME hops?",
    level: "intermediate",
    codeExample: "dig +trace www.example.com  # Shows CNAME steps"
  },
  {
    question: "What is the difference between a CNAME and a URL forwarding record (often in domain registrars)?",
    shortAnswer: "CNAME is pure DNS; URL forwarding is an HTTP redirect that may involve a web server or frame.",
    explanation: "URL forwarding (often called 'domain forwarding') uses HTTP redirect (301/302) or cloaked frame. CNAME only changes IP resolution, not the URL. URL forwarding changes the address bar (unless cloaked). CNAME is faster but cannot send different ports or paths.",
    hint: "Which one can redirect 'example.com/shop' to 'store.com/products'?",
    level: "intermediate",
    codeExample: "# CNAME cannot specify paths; URL forwarding can"
  },
  {
    question: "Can a CNAME exist under a DNSSEC-signed zone without breaking validation?",
    shortAnswer: "Yes, as long as both the CNAME and its target are properly signed and the chain of trust is intact.",
    explanation: "The CNAME record is signed by the zone's private key. When the resolver follows the CNAME to a different zone, that zone must also be signed and have a chain of trust to the same trust anchor. Otherwise, validation may fail.",
    hint: "Why might a cross-zone CNAME cause DNSSEC validation to fail?",
    level: "expert",
    codeExample: "dig +dnssec www.example.com  # Works if both zones are signed"
  },
  {
    question: "What is the 'CNAME flattening' technique used by some DNS providers?",
    shortAnswer: "CNAME flattening (or ANAME) resolves the CNAME target at the DNS provider and returns A/AAAA records directly.",
    explanation: "When you create a CNAME-like record at the apex, the provider periodically resolves the target and caches its IPs. Then it returns those IPs as if they were A/AAAA records. This avoids the CNAME restriction while providing alias behavior.",
    hint: "How does Cloudflare allow 'example.com' to point to a Heroku app?",
    level: "expert",
    codeExample: "# Provider converts ALIAS to A records at query time"
  },
  {
    question: "Why does DNS performance degrade when using multiple CNAME hops?",
    shortAnswer: "Each CNAME hop may require additional queries to different authoritative servers, increasing latency.",
    explanation: "Every CNAME hop can trigger a new DNS lookup, possibly including root, TLD, and authoritative queries. This adds latency (RTT × number of hops). Web browsers may time out if resolution takes too long. Keep CNAME chains minimal.",
    hint: "Why is it better to have a direct A record than a chain of three CNAMEs?",
    level: "intermediate",
    codeExample: "time dig www.example.com  # Compare with direct A record"
  }
];

export default questions;