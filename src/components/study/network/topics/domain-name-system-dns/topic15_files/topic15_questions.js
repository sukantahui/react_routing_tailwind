const questions = [
  {
    question: "What does the `ping` command do?",
    shortAnswer: "Sends ICMP echo requests to test host reachability and latency.",
    explanation: "ping is a network utility that measures round-trip time and packet loss. It also performs a forward DNS lookup (domain → IP) before sending packets.",
    hint: "Like calling a friend and waiting for them to say 'hello'.",
    level: "basic",
    codeExample: "ping google.com"
  },
  {
    question: "What is the difference between `ping` and `nslookup`?",
    shortAnswer: "ping tests connectivity and does minimal DNS; nslookup is specifically for querying DNS records.",
    explanation: "ping only shows the IP (forward lookup) and measures latency. nslookup can query any record type (MX, TXT, etc.), specify a DNS server, and perform reverse lookups.",
    hint: "One checks if the door is open; the other reads the address book.",
    level: "basic",
    codeExample: "nslookup example.com"
  },
  {
    question: "How do you perform a reverse DNS lookup using `dig`?",
    shortAnswer: "`dig -x <IP address>`",
    explanation: "The `-x` flag automatically constructs the reverse zone name (e.g., 8.8.8.8 → 8.8.8.8.in-addr.arpa) and queries PTR records.",
    hint: "x stands for reverse.",
    level: "basic",
    codeExample: "dig -x 8.8.8.8"
  },
  {
    question: "What is the purpose of `dig +short`?",
    shortAnswer: "Displays only the essential answer (e.g., just the IP), no header or statistics.",
    explanation: "Useful for scripting or when you want a clean, machine-readable output. For an A record, it returns only the IP address.",
    hint: "The minimal version, no extra fluff.",
    level: "moderate",
    codeExample: "dig +short google.com"
  },
  {
    question: "How do you query a specific DNS server (e.g., 8.8.8.8) using `nslookup`?",
    shortAnswer: "`nslookup example.com 8.8.8.8`",
    explanation: "Append the DNS server IP after the domain name. This bypasses your default resolver.",
    hint: "Ask a specific librarian instead of the usual one.",
    level: "basic",
    codeExample: "nslookup google.com 8.8.8.8"
  },
  {
    question: "What does `dig +trace` do?",
    shortAnswer: "Shows the full iterative resolution process from root servers down to the authoritative answer.",
    explanation: "It prints each delegation step (root → TLD → authoritative), including the servers contacted and the time taken. Excellent for understanding DNS hierarchy.",
    hint: "Watch the DNS travel from the top of the tree to the leaf.",
    level: "expert",
    codeExample: "dig +trace google.com"
  },
  {
    question: "Why might `ping` fail even if DNS resolution works?",
    shortAnswer: "The target host may block ICMP, or a firewall may be dropping packets.",
    explanation: "Ping uses ICMP, which is often disabled on public servers for security. DNS works because it uses UDP/TCP port 53, which is allowed.",
    hint: "The doorbell is broken, but the address is correct.",
    level: "moderate",
    codeExample: "nslookup google.com && ping google.com"
  },
  {
    question: "How do you query MX records using `dig`?",
    shortAnswer: "`dig example.com MX`",
    explanation: "Just add the record type after the domain name. MX records show mail servers for the domain.",
    hint: "Mail eXchanger records.",
    level: "basic",
    codeExample: "dig gmail.com MX"
  },
  {
    question: "What is the default record type queried by `nslookup` and `dig`?",
    shortAnswer: "A record (IPv4 address).",
    explanation: "If you don't specify, both tools default to looking up IPv4 addresses.",
    hint: "The most common type.",
    level: "basic",
    codeExample: "dig example.com   # same as 'dig example.com A'"
  },
  {
    question: "How can you see the TTL of a DNS record using `dig`?",
    shortAnswer: "Run a normal query; the TTL is the number in the second column of the answer section.",
    explanation: "The output shows `example.com. 86400 IN A 93.184.216.34` where 86400 is TTL in seconds. Use `+ttlid` to highlight it.",
    hint: "The number right before 'IN'.",
    level: "moderate",
    codeExample: "dig +ttlid example.com"
  },
  {
    question: "What is the `nslookup` interactive mode?",
    shortAnswer: "Type `nslookup` alone, then enter queries; stay in the shell for multiple lookups.",
    explanation: "Interactive mode remembers the last server used and is convenient for repeated queries. Use `exit` to leave.",
    hint: "A conversation with the DNS server.",
    level: "moderate",
    codeExample: "nslookup\n> set type=MX\n> gmail.com\n> exit"
  },
  {
    question: "Does `ping` show the IP address of the destination?",
    shortAnswer: "Yes, the very first line shows the resolved IP in parentheses.",
    explanation: "Example: `PING google.com (142.250.185.46)`. That IP came from a forward DNS lookup.",
    hint: "Right after the domain name.",
    level: "basic",
    codeExample: "ping -c 1 google.com | head -1"
  },
  {
    question: "How do you perform a reverse lookup using `nslookup`?",
    shortAnswer: "`nslookup <IP address>`",
    explanation: "nslookup automatically detects that the argument is an IP and queries the PTR record.",
    hint: "Just type the number, no special flags.",
    level: "basic",
    codeExample: "nslookup 8.8.8.8"
  },
  {
    question: "What is the output format of `dig +noall +answer`?",
    shortAnswer: "Shows only the answer section (no question, no statistics, no header).",
    explanation: "Useful for clean output. You can combine with `+short` to get just the record data.",
    hint: "Trim the fat.",
    level: "moderate",
    codeExample: "dig +noall +answer example.com"
  },
  {
    question: "How do you trace the path that a DNS query takes using standard tools?",
    shortAnswer: "`dig +trace` is the simplest. Alternatively, use `drill` or `dnsviz`.",
    explanation: "`+trace` sends iterative queries to root, TLD, and authoritative servers, showing each delegation.",
    hint: "Like a GPS track of the DNS lookup.",
    level: "expert",
    codeExample: "dig +trace example.com"
  },
  {
    question: "Why does `dig` sometimes return a different IP than `ping`?",
    shortAnswer: "They may use different resolvers or one may hit a cached entry.",
    explanation: "`dig` (without @server) uses your OS resolver; `ping` uses the same. But if `dig` specifies `@1.1.1.1`, it may see a different, more up-to-date answer.",
    hint: "Different librarians may have different sticky notes.",
    level: "moderate",
    codeExample: "dig @8.8.8.8 example.com"
  },
  {
    question: "What does the `+trace` output's asterisk (*) mean?",
    shortAnswer: "Indicates a timeout – no response from that nameserver.",
    explanation: "If a server doesn't reply within the timeout, `dig` shows `*` and tries the next nameserver in the list.",
    hint: "Silence from that librarian.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How can you see the query time in `dig`?",
    shortAnswer: "Look for `;; Query time: XX msec` in the output footer.",
    explanation: "This is the total time from request to final answer (excluding local processing).",
    hint: "Bottom of the dig output.",
    level: "moderate",
    codeExample: "dig example.com | grep 'Query time'"
  },
  {
    question: "What command shows only the IP address of `example.com` (no extra text)?",
    shortAnswer: "`dig +short example.com`",
    explanation: "For a domain with multiple IPs, it shows one per line. For a single IP, just the address.",
    hint: "Shortest answer possible.",
    level: "basic",
    codeExample: "dig +short google.com"
  },
  {
    question: "How do you specify a different DNS server in `ping`?",
    shortAnswer: "You cannot. ping always uses the system's default resolver.",
    explanation: "ping does not have a flag to specify a nameserver. Use `nslookup` or `dig` for that.",
    hint: "Ping is simple – it only knows the default.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the Windows equivalent of `dig`?",
    shortAnswer: "`Resolve-DnsName` (PowerShell) or `nslookup` is built‑in. You can also install BIND tools.",
    explanation: "Windows doesn't include dig by default. `Resolve-DnsName -Name example.com -Type MX` is a modern alternative.",
    hint: "PowerShell command, not CMD.",
    level: "moderate",
    codeExample: "Resolve-DnsName -Name google.com -Type A"
  },
  {
    question: "What is the difference between `dig` and `host` command?",
    shortAnswer: "`host` is simpler, less feature-rich, but installed on more minimal Linux systems.",
    explanation: "`host` is part of bind-host package; it's fine for basic lookups but lacks advanced dig options like `+trace` or `+dnssec`.",
    hint: "Dig is the Swiss Army knife, host is a simple knife.",
    level: "moderate",
    codeExample: "host google.com"
  },
  {
    question: "How do you see the DNSSEC 'ad' flag using `dig`?",
    shortAnswer: "`dig +dnssec example.com` and check the flags in the header: `flags: qr rd ra ad`.",
    explanation: "The 'ad' (authentic data) flag appears if the resolver validated DNSSEC and the response is secure.",
    hint: "Look for 'ad' in the flags line.",
    level: "expert",
    codeExample: "dig +dnssec sigok.verteiltesysteme.net | grep flags"
  },
  {
    question: "Why does `ping -a 8.8.8.8` behave differently on Windows vs Linux?",
    shortAnswer: "Windows `-a` performs a reverse lookup; Linux uses `-a` for audible ping. Reverse lookup on Linux is `ping -n` doesn't do it; use `nslookup`.",
    explanation: "Flag meanings vary across OS. Always check `man ping`.",
    hint: "Different operating systems, different flags.",
    level: "expert",
    codeExample: "ping -a 8.8.8.8   # Windows only"
  },
  {
    question: "How do you limit `ping` to a specific number of packets on Windows?",
    shortAnswer: "`ping -n 4 google.com`",
    explanation: "Windows uses `-n` (number); Linux/macOS uses `-c` (count).",
    hint: "Windows: `-n` for count.",
    level: "basic",
    codeExample: "ping -n 4 google.com"
  },
  {
    question: "What is the purpose of `dig +qr`?",
    shortAnswer: "Prints the query that `dig` sends to the DNS server.",
    explanation: "Useful for debugging: you see exactly what question was asked, including the transaction ID and flags.",
    hint: "Show your homework before the answer.",
    level: "expert",
    codeExample: "dig +qr example.com"
  },
  {
    question: "How can you get help for `dig` command options?",
    shortAnswer: "`dig -h` or `man dig`.",
    explanation: "`dig -h` shows a brief summary; `man dig` (on Linux/macOS) gives the full manual.",
    hint: "The manual is your friend.",
    level: "basic",
    codeExample: "dig -h"
  },
  {
    question: "What does `nslookup -type=any` do?",
    shortAnswer: "Requests all available records for a domain (deprecated and often blocked).",
    explanation: "Modern DNS servers may not return 'any' to reduce load, and many resolvers now reject ANY queries. Use specific record types instead.",
    hint: "Asking for everything, but you may not get it.",
    level: "expert",
    codeExample: "nslookup -type=any google.com"
  },
  {
    question: "How do you query a TXT record using `dig`?",
    shortAnswer: "`dig example.com TXT`",
    explanation: "TXT records store arbitrary text, often used for SPF, DKIM, and domain verification.",
    hint: "Text records are for human or machine readable notes.",
    level: "basic",
    codeExample: "dig google.com TXT"
  },
  {
    question: "What is the difference between `dig` and `drill`?",
    shortAnswer: "`drill` is an alternative to `dig` from the ldns suite; it has slightly different syntax but similar features.",
    explanation: "`drill` is common on some Linux distributions (e.g., openSUSE) and is used in DNSSEC toolchains. `dig` remains more universal.",
    hint: "Similar tools, different ecosystems.",
    level: "expert",
    codeExample: "drill example.com"
  },
  {
    question: "What does `ping -W 2 google.com` do?",
    shortAnswer: "Sets a timeout of 2 seconds for each reply (Linux/macOS).",
    explanation: "`-W` (uppercase) sets the time to wait for a response. If no reply within 2 seconds, ping marks the packet as lost.",
    hint: "Don't wait forever for a slow host.",
    level: "moderate",
    codeExample: "ping -W 2 -c 3 google.com"
  }
];

export default questions;