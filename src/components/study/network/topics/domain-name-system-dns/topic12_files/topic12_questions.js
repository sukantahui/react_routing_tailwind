const questions = [
  {
    question: "What is a forward DNS lookup?",
    shortAnswer: "Resolving a domain name to an IP address.",
    explanation: "Forward lookup is the standard DNS operation: given a human-readable name (e.g., example.com), return the corresponding IP address (e.g., 192.0.2.1) using A or AAAA records.",
    hint: "Looking up a contact name to get a phone number.",
    level: "basic",
    codeExample: "dig example.com"
  },
  {
    question: "What is a reverse DNS lookup?",
    shortAnswer: "Resolving an IP address back to a domain name.",
    explanation: "Reverse lookup does the opposite: given an IP, find the domain name using PTR (Pointer) records stored in the special .in-addr.arpa domain (IPv4) or .ip6.arpa (IPv6).",
    hint: "Type a phone number into caller ID to see who's calling.",
    level: "basic",
    codeExample: "dig -x 8.8.8.8"
  },
  {
    question: "What DNS record type is used for reverse lookup?",
    shortAnswer: "PTR (Pointer) record.",
    explanation: "PTR records map an IP address (in reversed octet format inside in-addr.arpa) to a domain name. They are the only record type used in reverse zones.",
    hint: "It 'points' from the IP to the name.",
    level: "basic",
    codeExample: "dig ptr 45.2.0.192.in-addr.arpa"
  },
  {
    question: "Explain the format of the reverse DNS zone for IPv4 address 203.0.113.45.",
    shortAnswer: "45.113.0.203.in-addr.arpa",
    explanation: "The IP octets are reversed, then appended with .in-addr.arpa. The PTR record is stored under that name.",
    hint: "Write the IP backwards, add '.in-addr.arpa'.",
    level: "moderate",
    codeExample: "dig -x 203.0.113.45"
  },
  {
    question: "What is the significance of forward-confirmed reverse DNS (FCrDNS)?",
    shortAnswer: "Ensures that the forward lookup (name→IP) matches the reverse lookup (IP→name).",
    explanation: "FCrDNS is used for email authentication, anti-spam checks, and logging. If IP resolves to name, and that name resolves back to the same IP, it's considered trustworthy.",
    hint: "The phone number you dial shows the same name on caller ID.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Why is reverse DNS important for mail servers?",
    shortAnswer: "Receiving mail servers verify that the sending IP has a matching PTR record to reduce spam.",
    explanation: "Many email systems (e.g., Gmail, Outlook) reject or flag emails from IPs without reverse DNS or with mismatched forward/reverse. It establishes legitimacy.",
    hint: "They want to confirm the caller ID matches the claimed identity.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What command performs a reverse lookup for IP 1.1.1.1?",
    shortAnswer: "`dig -x 1.1.1.1` or `nslookup 1.1.1.1`",
    explanation: "The `-x` flag in dig tells it to do a reverse lookup. It automatically constructs the .in-addr.arpa name.",
    hint: "The x stands for 'reverse'.",
    level: "basic",
    codeExample: "dig -x 1.1.1.1"
  },
  {
    question: "What is the difference between `dig example.com` and `dig -x 8.8.8.8`?",
    shortAnswer: "First is forward lookup (name→IP), second is reverse lookup (IP→name).",
    explanation: "dig example.com queries A records. dig -x 8.8.8.8 automatically queries PTR records under 8.8.8.8.in-addr.arpa.",
    hint: "One asks 'what is the IP?', the other asks 'what is the name?'",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can one IP address have multiple PTR records?",
    shortAnswer: "Technically yes, but not recommended and may cause issues.",
    explanation: "DNS allows multiple PTR records for a single IP (multiple domains). However, many applications only check the first one, and it breaks FCrDNS.",
    hint: "One phone number assigned to two people – caller ID gets confused.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the reverse DNS zone for IPv6 address 2001:db8::1?",
    shortAnswer: "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa",
    explanation: "IPv6 reverse uses .ip6.arpa. The address is written in nibble format (each hex digit separated by dots), reversed, then .ip6.arpa.",
    hint: "Each hex character becomes its own label, reversed.",
    level: "expert",
    codeExample: "dig -x 2001:db8::1"
  },
  {
    question: "What happens if a mail server has no PTR record?",
    shortAnswer: "Many receiving servers reject or spam-filter the email.",
    explanation: "Spam often comes from IPs without reverse DNS. Legitimate email servers should always have a PTR record that matches their HELO/EHLO domain.",
    hint: "No caller ID → suspicious call.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the purpose of the `in-addr.arpa` domain?",
    shortAnswer: "A special top-level domain used for IPv4 reverse DNS delegation.",
    explanation: "It allows IP address owners to delegate reverse lookup authority. For example, ISP that owns 192.0.2.0/24 can manage the 2.0.192.in-addr.arpa zone.",
    hint: "ARPA stands for Address and Routing Parameter Area.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Why are IPv4 octets reversed in reverse DNS?",
    shortAnswer: "To allow hierarchical delegation from least to most significant octet.",
    explanation: "Reversing makes it possible for RIRs and ISPs to delegate control. The most specific part (last octet) becomes the subdomain, so the owner of the /24 can control all PTRs.",
    hint: "Think of domain hierarchy: country → region → city. Reverse IP hierarchy goes from specific to general.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What tools can test reverse DNS besides dig?",
    shortAnswer: "`nslookup`, `host`, `ping -a` (Windows), `getent hosts`.",
    explanation: "host <IP> is simpler; nslookup <IP> works on most systems. ping -a on Windows does reverse lookup before pinging.",
    hint: "host and nslookup are available on Linux/macOS/Windows.",
    level: "moderate",
    codeExample: "host 8.8.8.8"
  },
  {
    question: "Can I perform a reverse lookup for a private IP like 192.168.1.1?",
    shortAnswer: "Yes, but only if your internal DNS server has PTR records for that IP.",
    explanation: "Public DNS servers won't have PTR records for private IPs. You need an internal DNS resolver (e.g., company DNS) configured with reverse zones for RFC1918 addresses.",
    hint: "Private IPs are like unlisted phone numbers – only your internal directory knows them.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "How does reverse DNS help in security investigations?",
    shortAnswer: "It reveals the domain names associated with attacking IPs, aiding attribution.",
    explanation: "In logs, you see IP 203.0.113.88; reverse lookup might show `spamserver.example.net`, giving context. Attackers often use IPs without reverse DNS to hide.",
    hint: "Turns a number into a name you can research.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the difference between `dig -x` and `dig ptr`?",
    shortAnswer: "`-x` automatically constructs the reverse name; `dig ptr` requires you to write the full .in-addr.arpa name.",
    explanation: "`dig -x 192.0.2.45` = `dig ptr 45.2.0.192.in-addr.arpa`. The -x flag is a convenience.",
    hint: "`-x` does the formatting for you.",
    level: "moderate",
    codeExample: "dig ptr 45.2.0.192.in-addr.arpa"
  },
  {
    question: "What do you need to set up reverse DNS for an IP address you own?",
    shortAnswer: "Cooperation from your ISP or hosting provider (who owns the IP range).",
    explanation: "You cannot set up PTR records yourself unless you have authority over the reverse zone. For most IPs, you must ask your ISP or cloud provider to configure the PTR record.",
    hint: "Your phone number's caller ID name is controlled by your phone company.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is a typical TTL for a PTR record?",
    shortAnswer: "Often 86400 seconds (1 day) or longer, as IP assignments rarely change.",
    explanation: "Since reverse mappings are stable, high TTL reduces load. However, for dynamic IPs, a lower TTL (e.g., 300) may be used.",
    hint: "PTR records are like sticky notes that stay for a long time.",
    level: "moderate",
    codeExample: "dig +ttlid -x 8.8.8.8"
  },
  {
    question: "Suppose `dig -x 203.0.113.45` returns `mail.example.com`, but `dig mail.example.com` returns 198.51.100.10. Is this bad?",
    shortAnswer: "Yes, FCrDNS fails; email may be rejected as mismatched.",
    explanation: "Forward and reverse do not match. Mail servers see this as suspicious because the reverse name does not point back to the original IP.",
    hint: "Caller ID shows 'John', but you dialed a number for 'Mary'.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the `ip6.arpa` zone used for?",
    shortAnswer: "Reverse DNS for IPv6 addresses.",
    explanation: "Similar to in-addr.arpa for IPv4, ip6.arpa stores PTR records for IPv6 addresses, using nibble format (each hex digit as a label).",
    hint: "The IPv6 counterpart to in-addr.arpa.",
    level: "moderate",
    codeExample: "dig -x 2001:4860:4860::8888"
  },
  {
    question: "How does a recursive resolver handle a reverse lookup query?",
    shortAnswer: "It starts at the root servers for .arpa, then delegates to in-addr.arpa (or ip6.arpa), then to the IP owner's nameservers.",
    explanation: "The hierarchy works like forward lookup: root → .arpa → in-addr.arpa → reverse octet delegations → final PTR.",
    hint: "Same process as forward, but starting from .arpa.",
    level: "expert",
    codeExample: "dig +trace -x 8.8.8.8"
  },
  {
    question: "What is a 'reverse map' in networking?",
    shortAnswer: "Another name for a reverse DNS lookup or PTR record.",
    explanation: "System administrators often say 'set up reverse map for this IP' meaning configure the PTR record.",
    hint: "Mapping from IP back to name.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Why do some `traceroute` outputs show domain names while others show only IPs?",
    shortAnswer: "Because the intermediate routers may or may not have PTR records configured.",
    explanation: "When traceroute hits an IP, it attempts a reverse lookup. If a PTR exists, it displays the name; otherwise only the IP.",
    hint: "Well-managed networks set reverse DNS for all routers.",
    level: "moderate",
    codeExample: "traceroute google.com"
  },
  {
    question: "What is the maximum length of a PTR record's domain name?",
    shortAnswer: "255 characters total, each label max 63 bytes.",
    explanation: "Same as any DNS domain name. The fully qualified name including .in-addr.arpa must fit within 255 bytes.",
    hint: "Keep your domain names short enough.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Can a CNAME record exist in a reverse zone?",
    shortAnswer: "Technically yes, but rarely used and not recommended.",
    explanation: "Standard practice is to use only PTR records in reverse zones. CNAMEs would complicate delegations. Some rare setups use CNAME for reverse (RFC 2317).",
    hint: "Stick to PTR unless you have a specific need.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does SPF (Sender Policy Framework) relate to reverse DNS?",
    shortAnswer: "SPF does not directly use PTR, but many email checks combine SPF + FCrDNS for reputation.",
    explanation: "Some anti-spam systems add weight if forward and reverse match, even if SPF passes. It's an extra layer of trust.",
    hint: "Matchy-matchy = more trustworthy.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the command to flush reverse DNS cache on Linux?",
    shortAnswer: "Same as forward cache: `sudo systemd-resolve --flush-caches` or restart nscd.",
    explanation: "Reverse lookups are cached the same way as forward. Flush the general DNS cache to clear both.",
    hint: "No separate reverse cache flush command.",
    level: "moderate",
    codeExample: "sudo systemd-resolve --flush-caches"
  },
  {
    question: "If I change the PTR record, how long until it is effective?",
    shortAnswer: "Up to the TTL of the previous PTR record on caching resolvers.",
    explanation: "Reduce TTL before changing the PTR. After change, wait for old cached PTRs to expire (max previous TTL) for global propagation.",
    hint: "Same TTL rules as forward records.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is `nibble format` in IPv6 reverse DNS?",
    shortAnswer: "Each hex digit of the IPv6 address becomes a separate label, reversed, under .ip6.arpa.",
    explanation: "For address 2001:db8::1, you expand to 2001:0db8:0000:0000:0000:0000:0000:0001, then reverse digits: 1.0.0.0...8.b.d.0.1.0.0.2.ip6.arpa.",
    hint: "Each hex character is one 'nibble' (4 bits).",
    level: "expert",
    codeExample: "dig -x 2001:db8::1"
  }
];

export default questions;