const questions = [
  {
    question: "What is DNS spoofing (cache poisoning)?",
    shortAnswer: "Injecting false DNS responses into a resolver's cache.",
    explanation: "An attacker sends forged DNS replies before the legitimate ones, tricking the resolver into caching fake IP addresses. Users then get redirected to malicious sites.",
    hint: "Someone secretly replaces the sticky note in the library catalog.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is DNSSEC?",
    shortAnswer: "Domain Name System Security Extensions – adds cryptographic authentication to DNS.",
    explanation: "DNSSEC allows DNS responses to be digitally signed. Resolvers verify signatures to ensure the data came from the authoritative source and wasn't tampered with.",
    hint: "Adding a tamper-proof seal to every DNS answer.",
    level: "basic",
    codeExample: "dig +dnssec example.com"
  },
  {
    question: "Does DNSSEC encrypt DNS queries?",
    shortAnswer: "No, DNSSEC only authenticates, it does not encrypt.",
    explanation: "DNSSEC provides data integrity and origin authentication, not confidentiality. For encryption, use DNS over TLS (DoT) or DNS over HTTPS (DoH).",
    hint: "A signature verifies the author, but the postcard content is still visible.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the 'chain of trust' in DNSSEC?",
    shortAnswer: "A hierarchical validation from the root zone down to the target domain.",
    explanation: "The root zone is a trust anchor. It signs the TLD zones, which sign the domain zones, which sign individual records. Resolvers follow this chain to verify authenticity.",
    hint: "Like a family tree of trust, starting from the root.",
    level: "moderate",
    codeExample: "dig +trace +dnssec example.com"
  },
  {
    question: "What are the key record types introduced by DNSSEC?",
    shortAnswer: "RRSIG, DNSKEY, DS, NSEC/NSEC3.",
    explanation: "RRSIG contains the signature; DNSKEY holds the public key; DS (Delegation Signer) links child to parent; NSEC/NSEC3 prove non-existence of names.",
    hint: "RRset Sigs, Keys, Delegation Signers, and Next Secure.",
    level: "expert",
    codeExample: "dig DNSKEY example.com"
  },
  {
    question: "What does the 'ad' flag in `dig` output indicate?",
    shortAnswer: "Authentic Data – the resolver validated DNSSEC signatures.",
    explanation: "When a validating resolver returns a response with the 'ad' flag, it means DNSSEC verification succeeded. Lack of 'ad' means either not validated or unsigned domain.",
    hint: "AD = 'All good, this is authentic'.",
    level: "moderate",
    codeExample: "dig +dnssec google.com | grep flags"
  },
  {
    question: "What is a DNSKEY record?",
    shortAnswer: "Stores the public key used to verify RRSIG signatures in DNSSEC.",
    explanation: "The authoritative DNS server publishes its public key via DNSKEY records. Resolvers fetch these to verify that RRSIG signatures are valid.",
    hint: "The public half of the domain's key pair.",
    level: "expert",
    codeExample: "dig DNSKEY example.com"
  },
  {
    question: "What is an RRSIG record?",
    shortAnswer: "Resource Record Signature – contains the digital signature of a DNS record set.",
    explanation: "For each RRset (e.g., all A records of a domain), a corresponding RRSIG is generated using the private key. Resolvers use the DNSKEY to verify the signature.",
    hint: "The signature attached to each answer.",
    level: "expert",
    codeExample: "dig RRSIG example.com"
  },
  {
    question: "What is a DS (Delegation Signer) record?",
    shortAnswer: "Stored in the parent zone, it points to the child's DNSKEY and establishes trust.",
    explanation: "When you enable DNSSEC, you provide a DS record to your registrar. The parent zone (e.g., .com) stores it, linking child to parent's chain of trust.",
    hint: "The parent's note saying 'my child's key is valid'.",
    level: "expert",
    codeExample: "dig DS example.com"
  },
  {
    question: "What happens if DNSSEC validation fails?",
    shortAnswer: "The resolver returns SERVFAIL (server failure).",
    explanation: "The response is considered bogus. Instead of showing a potentially spoofed result, the resolver refuses to answer, protecting the user.",
    hint: "Broken seal = don't read the letter.",
    level: "moderate",
    codeExample: "dig sigfail.verteiltesysteme.net"
  },
  {
    question: "What was the Kaminsky attack (2008)?",
    shortAnswer: "A cache poisoning vulnerability that allowed attackers to poison any resolver quickly.",
    explanation: "Dan Kaminsky found that predictable transaction IDs made poisoning efficient. The fix: randomize transaction IDs and source ports. This accelerated DNSSEC adoption.",
    hint: "Attackers could guess the 'secret code' and sneak in fake answers.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the difference between ZSK and KSK in DNSSEC?",
    shortAnswer: "ZSK (Zone Signing Key) signs records; KSK (Key Signing Key) signs the ZSK.",
    explanation: "KSK is often longer and rolled less frequently. It signs the DNSKEY set. ZSK is shorter, rolled often, and signs actual records. Separation allows faster ZSK rolls.",
    hint: "KSK = master key; ZSK = daily key.",
    level: "expert",
    codeExample: "dig DNSKEY example.com +multi"
  },
  {
    question: "What is NSEC/NSEC3 in DNSSEC?",
    shortAnswer: "Proves that a requested domain does NOT exist (authenticated denial of existence).",
    explanation: "NSEC returns the next existing name, proving a gap. NSEC3 hashes names to prevent zone walking (privacy improvement).",
    hint: "Proving 'no such book' without revealing the entire catalog.",
    level: "expert",
    codeExample: "dig +dnssec asdfjkl.example.com"
  },
  {
    question: "Can DNS spoofing happen even if the website uses HTTPS?",
    shortAnswer: "Yes, but the browser would show a certificate error, though users may ignore it.",
    explanation: "If the fake site uses a different domain, HTTPS will mismatch. But if the attacker obtains a fraudulent certificate (e.g., through misissuance), they can still spoof. DNSSEC helps prevent the initial redirection.",
    hint: "HTTPS protects the connection, but DNS tells you where to connect first.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is a validating resolver?",
    shortAnswer: "A DNS resolver that actively verifies DNSSEC signatures.",
    explanation: "Instead of blindly accepting answers, it checks signatures, follows the chain of trust, and rejects bogus responses. Public examples: Cloudflare 1.1.1.1, Quad9 9.9.9.9.",
    hint: "A librarian who checks the hologram on every note.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "How can I test if my DNS resolver validates DNSSEC?",
    shortAnswer: "Query `sigok.verteiltesysteme.net` (should validate) and `sigfail.verteiltesysteme.net` (should fail).",
    explanation: "sigok has valid DNSSEC; sigfail has a broken signature. A validating resolver returns NOERROR for sigok and SERVFAIL for sigfail.",
    hint: "Use `dig @1.1.1.1 sigfail.verteiltesysteme.net`",
    level: "moderate",
    codeExample: "dig sigfail.verteiltesysteme.net"
  },
  {
    question: "Does DNSSEC protect against phishing?",
    shortAnswer: "Indirectly – it prevents redirection to fake IPs, but users can still be phished via lookalike domains.",
    explanation: "DNSSEC ensures you reach the correct IP for the domain you typed. But if you type 'g00gle.com' instead of 'google.com', DNSSEC won't save you. Education and browser filters are still needed.",
    hint: "It protects the pipe, not the destination name.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the difference between DNSSEC and TLS (HTTPS)?",
    shortAnswer: "DNSSEC authenticates DNS records; TLS secures the web connection.",
    explanation: "DNSSEC works at the DNS layer (before you reach the website). TLS works between your browser and the web server. Both provide security but at different layers.",
    hint: "DNSSEC = GPS confirmation; TLS = safe road.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the root trust anchor in DNSSEC?",
    shortAnswer: "The pre-configured public key of the DNS root zone, built into validating resolvers.",
    explanation: "Resolvers trust the root's key as a starting point. The root signs the TLDs, which sign domains, creating the chain. The trust anchor is updated periodically.",
    hint: "The original, unquestioned source of truth.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is DNSSEC's impact on DNS performance?",
    shortAnswer: "Responses are larger (due to signatures), but caching reduces overhead.",
    explanation: "DNSSEC adds RRSIG, DNSKEY, NSEC records, increasing UDP packet size. Some fallback to TCP. Modern resolvers handle it well, but TLDs with many DS records may see slight latency.",
    hint: "Heavier envelopes but still deliverable.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Why do some domains not use DNSSEC?",
    shortAnswer: "Complexity, lack of registrar support, or fear of misconfiguration causing SERVFAIL.",
    explanation: "Small sites may not see the need. Some registrars don't support DNSSEC. Rolling keys requires planning, and a broken DS record makes the domain unreachable (SERVFAIL).",
    hint: "Not everyone wants to add a lock if it might jam.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the role of a registrar in DNSSEC?",
    shortAnswer: "To accept and publish the DS record for a domain in the parent TLD zone.",
    explanation: "When you enable DNSSEC, you generate a DS record from your DNSKEY and provide it to your registrar. The registrar submits it to the TLD registry (e.g., Verisign for .com).",
    hint: "Registrar = messenger between you and the parent zone.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the meaning of the 'CD' flag in DNS queries?",
    shortAnswer: "Checking Disabled – tells the resolver not to validate DNSSEC.",
    explanation: "If a client sets CD=1, the resolver will return cached answers even if DNSSEC validation would fail. Used for debugging.",
    hint: "Don't check the signature, just give me the answer.",
    level: "expert",
    codeExample: "dig +cd example.com"
  },
  {
    question: "Can DNSSEC be used with CNAME records?",
    shortAnswer: "Yes, but CNAME chains must each be signed and validated.",
    explanation: "If example.com is a CNAME to target.example.net, the resolver validates the signature for example.com's CNAME and the A record at target.example.net separately.",
    hint: "Each link in the chain needs its own seal.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is DANE (DNS-based Authentication of Named Entities)?",
    shortAnswer: "Uses DNSSEC to store TLS certificate information in DNS, allowing pinning without CAs.",
    explanation: "DANE (RFC 6698) uses TLSA records signed by DNSSEC to specify which certificate or public key a domain should use. Reduces reliance on certificate authorities.",
    hint: "DNSSEC + TLS = trust without external CAs.",
    level: "expert",
    codeExample: "dig TLSA _443._tcp.example.com"
  },
  {
    question: "What happened in the 2010 DNSSEC root signing ceremony?",
    shortAnswer: "The DNS root zone was officially signed, establishing the root trust anchor.",
    explanation: "ICANN held a ceremony to generate and safeguard the root's private key. The root's public key (trust anchor) was distributed to resolver vendors.",
    hint: "The moment the world's DNS 'seal' was created.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How often should DNSSEC keys be rolled over?",
    shortAnswer: "ZSK every 3–6 months; KSK every 1–5 years depending on policy.",
    explanation: "Routine rollovers limit exposure if a key is compromised. The root KSK is rolled less frequently; the most recent roll was in October 2018.",
    hint: "Change the daily lock more often than the master vault key.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is a 'trust anchor repository'?",
    shortAnswer: "A collection of trusted public keys for DNSSEC root and TLDs.",
    explanation: "Validating resolvers need a starting point. IANA publishes the root trust anchor. Some resolvers also trust specific TLD keys directly.",
    hint: "The list of 'universally trusted seals'.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the size of a typical DNSSEC-signed response for an A record?",
    shortAnswer: "Often 400–800 bytes, compared to 80–120 bytes for unsigned.",
    explanation: "The additional RRSIG and DNSKEY records increase size. This can cause fragmentation or fallback to TCP, but modern networks handle it.",
    hint: "More packaging, more bytes.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Can an attacker bypass DNSSEC by spoofing the 'SERVFAIL' response?",
    shortAnswer: "Yes, but the resolver will not provide a forged answer; the user gets no answer, which is safer than a wrong answer.",
    explanation: "SERVFAIL means 'I can't verify this response'. Attackers could cause denial of service, but they cannot redirect users to fake IPs without breaking the signature.",
    hint: "Better to say 'no answer' than 'wrong answer'.",
    level: "expert",
    codeExample: null
  }
];

export default questions;