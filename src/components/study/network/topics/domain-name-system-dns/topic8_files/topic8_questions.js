const questions = [
  {
    question: "What does MX stand for in DNS?",
    shortAnswer: "Mail Exchange.",
    explanation: "MX records specify the mail servers responsible for receiving email on behalf of a domain.",
    hint: "It's all about email delivery.",
    level: "basic",
    codeExample: "dig MX example.com"
  },
  {
    question: "What is the difference between an MX record and an A record?",
    shortAnswer: "A record maps a domain to an IP; MX record tells where to send email.",
    explanation: "A record is for web traffic (or any service). MX records are specifically for email routing and include a priority value.",
    hint: "Web goes to A; email goes to MX.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Explain the priority field in an MX record.",
    shortAnswer: "A number indicating preference – lower numbers are tried first.",
    explanation: "If multiple mail servers exist, the sender attempts the lowest number first. If that fails, it moves to the next lowest.",
    hint: "Lower = more important.",
    level: "moderate",
    codeExample: "10 mail1, 20 mail2 (mail1 is primary)"
  },
  {
    question: "How do you query a domain's MX records using `dig`?",
    shortAnswer: "`dig MX example.com`",
    explanation: "The `MX` parameter tells dig to query Mail Exchange records. Add `+short` for concise output.",
    hint: "Simple: `dig MX gmail.com`.",
    level: "basic",
    codeExample: "dig MX google.com +short"
  },
  {
    question: "What happens if the highest priority MX server is unreachable?",
    shortAnswer: "The sending server tries the next highest priority (higher number).",
    explanation: "SMTP protocol requires attempting lower priority (higher number) servers if the primary does not respond.",
    hint: "Failover to the backup.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Why should you have at least two MX records?",
    shortAnswer: "For redundancy and fault tolerance.",
    explanation: "If your primary mail server goes down, email can still be delivered to a secondary server, preventing bounces.",
    hint: "Don't put all eggs in one basket.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can an MX record point directly to an IP address?",
    shortAnswer: "No, MX records must point to a hostname (domain name).",
    explanation: "The specification requires a hostname. The sending server then performs an A/AAAA lookup for that hostname.",
    hint: "Always a name, never a number.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What additional DNS record is required for the MX target hostname?",
    shortAnswer: "An A (or AAAA) record for that hostname.",
    explanation: "The MX record gives a name like `mail.example.com`. Without an A record, the sender cannot find the IP address of the mail server.",
    hint: "Name must be resolvable.",
    level: "basic",
    codeExample: "dig A mail.example.com"
  },
  {
    question: "Is it allowed to use a CNAME record as the target of an MX record?",
    shortAnswer: "Technically not per RFC 2181; may work but is discouraged.",
    explanation: "CNAME can cause lookup loops and unexpected behavior. Best practice is to use an A record for MX targets.",
    hint: "Avoid indirection for mail servers.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the default port used by mail servers when delivering email?",
    shortAnswer: "Port 25 (SMTP).",
    explanation: "After the sending server resolves the MX target to an IP, it establishes an SMTP connection over port 25 to deliver the message.",
    hint: "Standard mail delivery port.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What MX priority is used for Google Workspace (Gmail)?",
    shortAnswer: "Usually 10, 20, and 30 for backup servers.",
    explanation: "Google provides multiple MX records: aspmx.l.google.com (10), alt1.aspmx.l.google.com (20), alt2.aspmx.l.google.com (30).",
    hint: "Lower is primary.",
    level: "moderate",
    codeExample: "dig MX gmail.com"
  },
  {
    question: "What is a 'mail exchanger'?",
    shortAnswer: "The mail server that accepts incoming email for a domain.",
    explanation: "Another name for the host specified in an MX record. It receives and processes email on behalf of the domain.",
    hint: "The domain's mailbox.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How does an email server know where to send a message for user@example.com?",
    shortAnswer: "It queries the MX record of example.com, then delivers to the highest priority server.",
    explanation: "DNS resolution for the domain's MX record provides the destination mail server hostnames and their priorities.",
    hint: "Follow the MX signpost.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is a typical TTL for MX records?",
    shortAnswer: "Usually 3600 seconds (1 hour) or more.",
    explanation: "MX records change rarely (when switching email providers). A longer TTL reduces DNS load, but shorter TTL helps during migration.",
    hint: "Set it long unless you're switching.",
    level: "moderate",
    codeExample: "dig +ttlid MX example.com"
  },
  {
    question: "What is the difference between MX record priority and TTL?",
    shortAnswer: "Priority is for ordering mail server preference; TTL is for DNS caching duration.",
    explanation: "Priority affects delivery order; TTL says how long a resolver can cache the MX records.",
    hint: "Two completely different numbers.",
    level: "basic",
    codeExample: null
  },
  {
    question: "If you change MX records, how long until all senders use the new servers?",
    shortAnswer: "Up to the previous TTL value of the MX records (plus DNS propagation).",
    explanation: "Because MX records are cached. Lower the TTL before making changes to speed up propagation.",
    hint: "Patience or lower TTL early.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Can a domain have MX records for subdomains?",
    shortAnswer: "Yes, e.g., mail.example.com can have its own MX records.",
    explanation: "Subdomains are fully independent zones and can have their own mail servers. Typically, however, email is handled at the apex domain.",
    hint: "Subdomains can run their own post office.",
    level: "expert",
    codeExample: "dig MX subdomain.example.com"
  },
  {
    question: "What is a 'mail backup' or 'secondary MX'?",
    shortAnswer: "A mail server with a higher priority number (less preferred) that accepts email when primary is down.",
    explanation: "Secondary MX servers queue email until the primary becomes available. They are essential for reliability.",
    hint: "The backup post office.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Why should you avoid using the same priority for all MX records?",
    shortAnswer: "It removes ordering; senders choose arbitrarily, not deterministic.",
    explanation: "Equal priority records result in random selection among them, which may not be desired for primary/backup relationships.",
    hint: "Give unique priorities.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the MX lookup process in detail?",
    shortAnswer: "Sender queries DNS for MX of domain, sorts by priority, attempts SMTP to the highest priority's IP.",
    explanation: "If no MX exists, some mailers fall back to an A record (but not standard). Always define MX records for domains that receive email.",
    hint: "Find, sort, connect, deliver.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How do test MX records for a domain you don't own?",
    shortAnswer: "Use `dig` or online tools like MXToolbox.",
    explanation: "You can query any domain's MX records because DNS is public. No permission needed.",
    hint: "Public DNS is open.",
    level: "basic",
    codeExample: "dig MX microsoft.com"
  },
  {
    question: "Can a domain have no MX records?",
    shortAnswer: "Yes, but then it cannot receive email. The domain might be only for web hosting.",
    explanation: "If no MX exists, sending servers may try the A record, but this is deprecated and unreliable. Best to specify MX records for any domain that should receive email.",
    hint: "No MX = no email delivery.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What happens if the MX target's A record is missing?",
    shortAnswer: "Email delivery fails permanently (bounce).",
    explanation: "The sending server cannot find the IP address of the mail server. It will generate a DNS error and reject the email.",
    hint: "If the address is missing, mail can't be delivered.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the maximum number of MX records a domain can have?",
    shortAnswer: "No hard limit, but practical limit is around 10–15 due to DNS packet size.",
    explanation: "Too many MX records increase DNS response size and may cause truncation over UDP, falling back to TCP.",
    hint: "Keep it small.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is a null MX (RFC 7505)?",
    shortAnswer: "An MX record with priority 0 pointing to '.' indicating the domain does not accept email.",
    explanation: "Used to explicitly state that a domain should not receive email, avoiding fallback to A record and reducing backscatter.",
    hint: "No mail accepted here.",
    level: "expert",
    codeExample: "example.com. MX 0 ."
  },
  {
    question: "How does an MX record differ from an SPF record?",
    shortAnswer: "MX is for incoming mail; SPF is for outgoing (authorized sending servers).",
    explanation: "MX tells others where to send email to you; SPF tells others which servers you send email from.",
    hint: "Incoming vs outgoing.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What command shows the IP of the mail server after querying MX?",
    shortAnswer: "First `dig MX example.com`, then `dig A (the MX hostname)`.",
    explanation: "You need two lookups: one for MX, one for the A record of the mail server hostname.",
    hint: "Two steps to find the mail server's IP.",
    level: "moderate",
    codeExample: "dig MX example.com +short | while read pri host; do dig A $host +short; done"
  },
  {
    question: "What is the purpose of MX record priority 0?",
    shortAnswer: "Highest possible priority (most preferred).",
    explanation: "Lower number is higher priority, so 0 is the highest. Used for primary mail server.",
    hint: "Zero is best.",
    level: "basic",
    codeExample: "example.com. MX 0 primary.example.com"
  },
  {
    question: "What is the difference between an MX record and an NS record?",
    shortAnswer: "MX for mail routing; NS for DNS delegation.",
    explanation: "NS tells who is authoritative for DNS; MX tells who handles email.",
    hint: "One for DNS, one for mail.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you test mail flow for a domain without sending real email?",
    shortAnswer: "Use `swaks` or `telnet` to the MX server's port 25 and issue SMTP commands.",
    explanation: "Manual SMTP session can test whether the mail server accepts connections and validates recipients.",
    hint: "Handcraft an SMTP conversation.",
    level: "expert",
    codeExample: "telnet mail.example.com 25"
  }
];

export default questions;