const questions = [
  {
    question: "What is a DNS TXT record used for?",
    shortAnswer: "To store arbitrary text, often for domain verification and email security (SPF, DKIM, DMARC).",
    explanation: "Originally for human-readable notes, TXT records now serve machine‑readable policies that enable domain ownership proof and email authentication.",
    hint: "The 'sticky note' of DNS – can hold anything.",
    level: "basic",
    codeExample: "dig TXT example.com"
  },
  {
    question: "What does SPF stand for and what does it do?",
    shortAnswer: "Sender Policy Framework – lists authorized mail servers for a domain.",
    explanation: "SPF TXT records tell receiving mail servers which IP addresses are allowed to send email on behalf of your domain, reducing spoofing.",
    hint: "A whitelist of email senders.",
    level: "basic",
    codeExample: "dig TXT example.com | grep spf"
  },
  {
    question: "What is the purpose of a DKIM record?",
    shortAnswer: "DomainKeys Identified Mail – stores a public key to verify email signatures.",
    explanation: "Outgoing email is signed with a private key; recipients fetch the public key from DNS (TXT) to verify the signature, proving the email wasn't tampered.",
    hint: "A verifiable signature on your email.",
    level: "moderate",
    codeExample: "dig TXT selector._domainkey.example.com"
  },
  {
    question: "What does DMARC do?",
    shortAnswer: "Domain‑based Message Authentication, Reporting & Conformance – tells receivers how to handle failed SPF/DKIM.",
    explanation: "DMARC policies (none, quarantine, reject) are published as TXT records under `_dmarc.example.com`. It also provides reporting addresses.",
    hint: "The 'what to do if authentication fails' instruction.",
    level: "moderate",
    codeExample: "dig TXT _dmarc.example.com"
  },
  {
    question: "What is the typical syntax of an SPF record?",
    shortAnswer: "v=spf1 mechanism1 mechanism2 ... ~all (or -all).",
    explanation: "Version tag `v=spf1`, then mechanisms like `include:_spf.google.com`, `ip4:192.0.2.0/24`, `mx`. `~all` soft fail, `-all` hard fail.",
    hint: "Starts with `v=spf1` and ends with `all`.",
    level: "moderate",
    codeExample: "v=spf1 include:spf.protection.outlook.com -all"
  },
  {
    question: "How do you prove domain ownership to Google Search Console using TXT?",
    shortAnswer: "Add a TXT record with the verification code provided by Google.",
    explanation: "Google gives a unique string (e.g., `google-site-verification=abc123`). After you add it, Google checks DNS and confirms ownership.",
    hint: "A secret handshake stored in DNS.",
    level: "basic",
    codeExample: "example.com. TXT \"google-site-verification=XYZABC123\""
  },
  {
    question: "Can a domain have multiple TXT records?",
    shortAnswer: "Yes, multiple TXT records are allowed; some even required (e.g., SPF, DKIM, DMARC each separate).",
    explanation: "Each TXT record is independent. For the same owner name, multiple TXT records are merged by resolvers, but SPF specifies that only one SPF record should exist.",
    hint: "Multiple sticky notes on the same door.",
    level: "basic",
    codeExample: "dig TXT example.com   # may show several records"
  },
  {
    question: "What is the maximum length of a single TXT record string?",
    shortAnswer: "255 characters per string; multiple strings can be concatenated.",
    explanation: "DNS specification limits each character-string to 255 bytes. To store longer data (e.g., DKIM keys), the record is split into multiple quoted strings.",
    hint: "Short sentences, but you can write several.",
    level: "expert",
    codeExample: "\"long string part one\" \"part two\"  # combined to one"
  },
  {
    question: "What is the difference between ~all and -all in SPF?",
    shortAnswer: "~all = soft fail (mark as suspicious); -all = hard fail (reject email).",
    explanation: "Soft fail allows delivery but flags message; hard fail instructs receiver to reject the email. Start with ~all to monitor, move to -all after validation.",
    hint: "Soft = warning; Hard = rejection.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Why are TXT records used for email authentication instead of a new record type?",
    shortAnswer: "Historical compatibility – TXT records existed before SPF/DKIM were standardized, and are universally supported.",
    explanation: "SPF originally proposed a new RR type (SPF) but TXT records are more widely deployed. DKIM and DMARC also adopted TXT for simplicity.",
    hint: "Use what's already there.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is a DMARC policy of 'p=reject'?",
    shortAnswer: "Instructs receiving mail servers to reject emails that fail SPF or DKIM.",
    explanation: "The strictest protection. Messages that don't authenticate will be refused, preventing delivery of spoofed emails.",
    hint: "Throw away letters that don't pass the security check.",
    level: "moderate",
    codeExample: "_dmarc.example.com. TXT \"v=DMARC1; p=reject\""
  },
  {
    question: "How can you test if your SPF record is valid?",
    shortAnswer: "Use online SPF validators (MXToolbox, Kitterman) or command line tools like `spfquery`.",
    explanation: "Validation checks syntax, lookup limits (max 10), and includes resolve correctly. Misconfigured SPF can cause legitimate email to fail.",
    hint: "Run a diagnostic before relying on it.",
    level: "expert",
    codeExample: "dig TXT example.com | spfquery"
  },
  {
    question: "What does the `include:` mechanism in SPF do?",
    shortAnswer: "Includes the SPF record of another domain.",
    explanation: "`include:_spf.google.com` tells the receiver to also check Google's SPF record. This allows outsourcing authorized senders.",
    hint: "Delegation of trust.",
    level: "moderate",
    codeExample: "v=spf1 include:_spf.google.com ~all"
  },
  {
    question: "Why does SPF have a 10 DNS lookup limit?",
    shortAnswer: "To prevent excessive DNS work and denial‑of‑service attacks.",
    explanation: "Each `include:`, `a:`, `mx:`, etc. triggers a DNS lookup. The limit (originally 10) ensures SPF doesn't overload resolvers. Exceeding it results in `permerror`.",
    hint: "Don't make the resolver work too hard.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do you specify that only your office IP can send email in SPF?",
    shortAnswer: "`v=spf1 ip4:203.0.113.10 -all`",
    explanation: "The `ip4` mechanism allows a specific IP or subnet. Then `-all` rejects everyone else.",
    hint: "Only trust this one address.",
    level: "moderate",
    codeExample: "v=spf1 ip4:203.0.113.10 -all"
  },
  {
    question: "What is a DKIM selector?",
    shortAnswer: "A name that distinguishes between multiple DKIM keys for the same domain.",
    explanation: "Selectors (e.g., `google20150630` or `s1`) allow key rotation. The TXT record is at `<selector>._domainkey.example.com`.",
    hint: "The version number or key ID.",
    level: "expert",
    codeExample: "dig TXT google20150630._domainkey.example.com"
  },
  {
    question: "What happens if you have multiple SPF TXT records?",
    shortAnswer: "Receiving servers often treat it as a PermError – invalid.",
    explanation: "RFC 7208 says a domain MUST NOT have multiple SPF records. If multiple are found, some receivers may ignore all, causing deliverability issues.",
    hint: "One SPF policy per domain.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is DMARC reporting (`rua` and `ruf`)?",
    shortAnswer: "rua = aggregate reports; ruf = forensic (failure) reports.",
    explanation: "rua provides daily summaries of authentication results; ruf sends detailed reports for individual failures. Both are email addresses in TXT record.",
    hint: "Feedback on how your email is being treated.",
    level: "expert",
    codeExample: "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"
  },
  {
    question: "Why might a domain verification TXT record fail even after adding it?",
    shortAnswer: "TTL caching, typo, or checking the wrong hostname.",
    explanation: "Verification services check the TXT record of the exact domain (or subdomain). Wait for TTL expiry, double‑check quotes and value case.",
    hint: "Patience and precision.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "How do you see TXT records using `dig`?",
    shortAnswer: "`dig TXT example.com`",
    explanation: "Add `+short` for only the values. For DMARC, query `_dmarc.example.com`.",
    hint: "Exactly as you'd guess.",
    level: "basic",
    codeExample: "dig TXT google.com +short"
  },
  {
    question: "What is a common mistake when copying SPF records from a provider?",
    shortAnswer: "Forgetting to wrap the value in double quotes or adding extra line breaks.",
    explanation: "SPF records are a single string. Many zone editors accept it without quotes, but standard DNS requires quotes. Also, ensure there are no spaces inside the quotes unless part of the mechanism.",
    hint: "Quotes are mandatory.",
    level: "moderate",
    codeExample: "TXT \"v=spf1 include:spf.google.com ~all\"   # correct"
  },
  {
    question: "What does `v=DMARC1; p=none` mean?",
    shortAnswer: "DMARC policy 'none' – monitor only, no action on failures.",
    explanation: "Used for initial deployment. Reports are sent (if rua specified) but emails are delivered normally. After monitoring, you change to quarantine or reject.",
    hint: "Just watching, not blocking yet.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "How does a TXT record help with Microsoft 365 domain verification?",
    shortAnswer: "Microsoft provides a unique TXT record value (e.g., `MS=ms12345678`) to verify ownership.",
    explanation: "Similar to Google. You add the TXT record via your DNS host, then Microsoft checks and activates your domain.",
    hint: "Microsoft's secret handshake.",
    level: "basic",
    codeExample: "example.com. TXT \"MS=ms987654321\""
  },
  {
    question: "What is the DNS record for DMARC policy for subdomains?",
    shortAnswer: "You can set a separate DMARC record for subdomains using `sp=` tag or place record at `_dmarc.sub.example.com`.",
    explanation: "DMARC allows granular control: `sp=reject` applies to all subdomains if not overridden.",
    hint: "Policy for sub‑domains.",
    level: "expert",
    codeExample: "v=DMARC1; p=reject; sp=quarantine;"
  },
  {
    question: "What is the 'all' mechanism in SPF used for?",
    shortAnswer: "It defines the default policy for senders not matched by previous mechanisms.",
    explanation: "The last mechanism typically `~all` or `-all`. It decides what to do with unauthorized senders.",
    hint: "The final catch‑all rule.",
    level: "moderate",
    codeExample: "v=spf1 include:spf.example.com ~all"
  },
  {
    question: "How do you handle SPF records when using multiple email providers?",
    shortAnswer: "Combine them with `include:` mechanisms, e.g., `include:_spf.google.com include:spf.protection.outlook.com`.",
    explanation: "Add an `include:` for each provider's SPF record. Watch the lookup limit; you may need to flatten or use SPF macros.",
    hint: "List all your mail servers.",
    level: "expert",
    codeExample: "v=spf1 include:spf.google.com include:spf.mandrillapp.com ~all"
  },
  {
    question: "Can you use TXT records for general configuration beyond email?",
    shortAnswer: "Yes, for example, Slack's `slack-domain-verification=`, Apple's `apple-domain-verification=`, or custom app configs.",
    explanation: "Many SaaS products use DNS TXT records for domain verification and service discovery.",
    hint: "Sticky notes for any service.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What does the `pct=100` tag in DMARC mean?",
    shortAnswer: "Percentage of messages to which the DMARC policy applies.",
    explanation: "Allows gradual rollout: `pct=25` applies policy to only 25% of email. Default is 100.",
    hint: "Rollout dial.",
    level: "expert",
    codeExample: "v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@example.com"
  },
  {
    question: "What is 'SPF flattening'?",
    shortAnswer: "A technique to replace multiple includes with explicit IP addresses to avoid lookup limit.",
    explanation: "Tools analyze your SPF includes and generate a 'flattened' list of IP ranges, reducing DNS lookups.",
    hint: "Eliminate indirection for performance.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do you check if a domain has a DMARC record?",
    shortAnswer: "`dig TXT _dmarc.example.com`",
    explanation: "DMARC always uses the subdomain `_dmarc`. If no record, no DMARC policy.",
    hint: "The special underscore name.",
    level: "basic",
    codeExample: "dig TXT _dmarc.google.com"
  }
];

export default questions;