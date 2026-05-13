const questions = [
  {
    question: "What is an NS record in DNS?",
    shortAnswer: "A Name Server record that identifies authoritative DNS servers for a domain.",
    explanation: "NS records delegate authority from a parent zone to a child zone. They tell recursive resolvers which servers hold the actual DNS records for the domain.",
    hint: "The 'address' of the library's card catalog.",
    level: "basic",
    codeExample: "dig NS example.com"
  },
  {
    question: "Why are at least two NS records recommended for a domain?",
    shortAnswer: "For redundancy and fault tolerance.",
    explanation: "If one nameserver fails, resolvers can still query the other. This ensures the domain remains reachable even during server outages.",
    hint: "Two librarians – if one is sick, the other still knows where the books are.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between an NS record and an A record?",
    shortAnswer: "NS points to a nameserver hostname; A points to an IP address.",
    explanation: "NS records delegate authority to a hostname. A records translate that hostname to an IP so resolvers can contact the nameserver.",
    hint: "NS tells you which building; A tells you the street address of that building.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is a glue record?",
    shortAnswer: "An A record for a nameserver that resides inside the domain it serves, stored in the parent zone.",
    explanation: "When your nameserver is `ns1.example.com` for domain `example.com`, the parent TLD includes a glue A record to break the circular dependency.",
    hint: "A 'cheat sheet' that the parent gives you to find the child's nameserver IP.",
    level: "expert",
    codeExample: "dig +trace example.com | grep -A2 'ADDITIONAL'"
  },
  {
    question: "How do you query NS records using `dig`?",
    shortAnswer: "`dig NS example.com`",
    explanation: "This returns the nameserver records for the domain as stored in the authoritative zone.",
    hint: "Just type `NS` after the domain.",
    level: "basic",
    codeExample: "dig NS google.com"
  },
  {
    question: "What happens if the parent zone's NS records don't match the child zone's NS records?",
    shortAnswer: "Inconsistent delegation may cause intermittent resolution failures.",
    explanation: "If the `.com` TLD lists different NS servers than the domain's own zone, some resolvers may follow one set, others the other. It's called 'lame delegation'.",
    hint: "The library's main desk and the department's internal directory disagree – confusion.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Can an NS record point to an IP address directly?",
    shortAnswer: "No, NS records must contain a domain name, not an IP.",
    explanation: "The standard requires a hostname. The resolver then looks up the A/AAAA record for that hostname.",
    hint: "Always a name, never a number.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the typical TTL for NS records?",
    shortAnswer: "Often 86400 seconds (1 day) or longer.",
    explanation: "NS records change rarely (when you switch DNS providers). High TTL reduces load on parent zones. Lower TTL temporarily before a migration.",
    hint: "Set it and forget it – until you change providers.",
    level: "moderate",
    codeExample: "dig +ttlid NS example.com"
  },
  {
    question: "Who is responsible for creating NS records for a domain?",
    shortAnswer: "The domain owner via their registrar, and optionally in their own DNS zone.",
    explanation: "The parent zone's NS records are set at the registrar (for TLD delegation). The child zone also contains NS records for itself, which should match the parent.",
    hint: "You tell the main switchboard where to forward calls.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is a lame delegation?",
    shortAnswer: "When a nameserver listed in NS records is not actually authoritative for the domain.",
    explanation: "Causes resolution delays or failures because the resolver queries a server that doesn't have the zone data.",
    hint: "The directory says 'ask Bob', but Bob doesn't know the answer.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Can a domain have NS records from different DNS providers?",
    shortAnswer: "Yes, but both providers must have identical zone data to avoid inconsistency.",
    explanation: "Multi-provider DNS (e.g., Cloudflare + AWS) increases redundancy but requires synchronizing records between them.",
    hint: "Two librarians, both must have the same card catalog.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does a recursive resolver use NS records?",
    shortAnswer: "It follows the chain: root → TLD NS → domain NS → authoritative server query.",
    explanation: "After getting NS records from the parent, the resolver then queries those nameservers for the actual record (A, MX, etc.).",
    hint: "Follow the signposts step by step.",
    level: "moderate",
    codeExample: "dig +trace example.com"
  },
  {
    question: "What is the maximum number of NS records allowed for a domain?",
    shortAnswer: "No hard limit, but typically ≤ 7 for performance.",
    explanation: "Too many NS records increase response size and query latency. Most domains use 2–4 well‑managed servers.",
    hint: "Stick to a small, reliable team.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Why do NS records sometimes include a hostname that is not in the same TLD?",
    shortAnswer: "Nameservers can be external (e.g., using a provider's NS servers like ns1.cloudflare.com).",
    explanation: "The NS record only needs a valid hostname. Glue records are required only if the nameserver is within the same domain.",
    hint: "You can hire an external directory service.",
    level: "moderate",
    codeExample: "dig NS example.com   # often shows ns?.cloudflare.com"
  },
  {
    question: "When you change your domain's nameservers, what do you update at the registrar?",
    shortAnswer: "The NS records in the parent zone (the TLD).",
    explanation: "You tell your registrar the new authoritative nameserver hostnames. They submit the change to the TLD registry.",
    hint: "Update the main switchboard's forwarding number.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What happens if you delete all NS records for a domain?",
    shortAnswer: "The domain becomes unresolvable – no one can find its DNS data.",
    explanation: "Without NS records, recursive resolvers cannot locate the authoritative servers. The domain will appear as non‑existent (NXDOMAIN) or SERVFAIL.",
    hint: "Remove all signposts – nobody can find the place.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the difference between an NS record and a Delegation Signer (DS) record?",
    shortAnswer: "NS delegates authority; DS enables DNSSEC chain of trust.",
    explanation: "NS tells where to go; DS provides a cryptographic hash that allows DNSSEC validation of the child zone.",
    hint: "NS = address; DS = key to verify the address is authentic.",
    level: "expert",
    codeExample: "dig DS example.com"
  },
  {
    question: "Can two different domains share the same NS records?",
    shortAnswer: "Yes, many domains use the same nameserver infrastructure (e.g., Cloudflare, AWS Route 53).",
    explanation: "The nameservers store zones for many domains simultaneously. It's efficient and common.",
    hint: "One library system serving many towns.",
    level: "basic",
    codeExample: "dig NS cloudflare.com"
  },
  {
    question: "What is a 'hidden primary' nameserver?",
    shortAnswer: "A primary master NS that is not listed in public NS records.",
    explanation: "Hidden primary allows you to manage the zone internally while publishing only slave (secondary) NS records for public queries. Improves security.",
    hint: "The real card catalog is in a locked room; you ask the front desk instead.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do you verify that your NS records are correctly configured?",
    shortAnswer: "Use `dig NS yourdomain.com` and also query the parent TLD directly: `dig @a.gtld-servers.net yourdomain.com NS`.",
    explanation: "Comparing parent and child NS records ensures consistency. Tools like `dnsviz` can validate the whole delegation.",
    hint: "Ask both the main desk and the department – answers should match.",
    level: "expert",
    codeExample: "dig @192.5.6.30 example.com NS   # a.gtld-servers.net for .com"
  },
  {
    question: "What is the purpose of the SOA record in relation to NS records?",
    shortAnswer: "SOA (Start of Authority) identifies the primary nameserver and zone parameters; NS records list all authoritative servers.",
    explanation: "The SOA record's MNAME field should match one of the NS records (the primary master). The NS set includes all masters, primary and secondaries.",
    hint: "SOA names the head librarian; NS lists all librarians.",
    level: "expert",
    codeExample: "dig SOA example.com"
  },
  {
    question: "Do NS records have to be in the same zone file as other records?",
    shortAnswer: "Yes, NS records are part of the zone file for the domain they serve.",
    explanation: "The zone file for example.com contains NS records for example.com. The parent zone (.com TLD) also contains NS records for example.com (delegation).",
    hint: "Both the parent and child have copies of the signpost.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the default TTL for NS records in many DNS software?",
    shortAnswer: "Often 86400 seconds (1 day) as a default or minimum.",
    explanation: "BIND and other authoritative servers often set a default TTL for the entire zone; NS records inherit that unless overridden.",
    hint: "They don't change often, so caching them for a day is safe.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Can a CNAME record point to an NS record?",
    shortAnswer: "No, CNAME cannot coexist with any other record type at the same owner name, and NS records are at zone apex.",
    explanation: "The zone apex (example.com) can have NS, SOA, and other records, but not a CNAME. CNAMEs are for hostnames, not delegation.",
    hint: "You cannot replace a signpost (NS) with an alias (CNAME).",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is RFC 1034's recommendation for NS record TTL?",
    shortAnswer: "At least two days (172800 seconds).",
    explanation: "Older RFCs suggest high TTL for NS records because they act as delegations. Modern practice often uses 86400.",
    hint: "Old advice: keep signposts up for a long time.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do you test NS record propagation after changing nameservers?",
    shortAnswer: "Query multiple TLD name servers (`dig @a.gtld-servers.net example.com NS`) and observe the results.",
    explanation: "Changes can take up to 48 hours due to caching at TLD level. Use `dig +trace` and watch the TLD responses.",
    hint: "Wait and re‑query from different geographical perspectives.",
    level: "expert",
    codeExample: "for ns in a.gtld-servers.net b.gtld-servers.net; do dig @$ns example.com NS +short; done"
  },
  {
    question: "What is the role of NS records in zone transfers (AXFR/IXFR)?",
    shortAnswer: "They identify which servers are allowed to request or receive zone transfers.",
    explanation: "Secondary servers are listed in NS records. ACLs often allow transfers only from those nameservers.",
    hint: "Only the official librarians (NS servers) get a full copy of the card catalog.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does anycast affect NS records?",
    shortAnswer: "Multiple physical servers share the same NS hostname (anycast IP).",
    explanation: "Large providers use anycast: a single NS record (e.g., `ns1.cloudflare.com`) routes to many servers globally. Glue records point to that anycast IP.",
    hint: "One phone number, many call centers.",
    level: "expert",
    codeExample: "dig ns1.cloudflare.com"
  },
  {
    question: "What is the difference between an NS record and an MX record?",
    shortAnswer: "NS delegates DNS authority; MX routes email.",
    explanation: "NS records are for finding the DNS servers. MX records are for finding mail servers. Both are essential but serve different purposes.",
    hint: "NS = where to ask about the domain; MX = where to send email.",
    level: "basic",
    codeExample: "dig MX example.com"
  },
  {
    question: "What does the 'lame-servers' log message in BIND indicate?",
    shortAnswer: "One of the NS records points to a server that is not authoritative for the zone.",
    explanation: "The resolver attempted to query a nameserver but received a referral or NXDOMAIN instead of an answer for the domain.",
    hint: "The signpost points to a dead end.",
    level: "expert",
    codeExample: null
  }
];

export default questions;