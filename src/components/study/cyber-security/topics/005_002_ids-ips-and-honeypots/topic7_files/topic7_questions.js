const questions = [
  {
    id: 1,
    question: "What are the two primary structural components of every Snort rule?",
    shortAnswer: "The Rule Header (specifying Action, Protocol, Source IP/Port, Direction, and Destination IP/Port) and the Rule Options (enclosed in parentheses, defining detection criteria, message strings, and metadata).",
    explanation: "The header defines network addressing and routing parameters. The options define the deep packet inspection logic, payload strings, regex expressions, and classification metadata.",
    hint: "Rule Header for network IP/ports, and Rule Options inside parentheses for deep payload checking.",
    level: "Basic",
    codeExample: `// Snort Rule Anatomy:
// [Header: alert tcp $EXTERNAL_NET any -> $HTTP_SERVERS 80] ([Options: msg:"SQL Injection"; content:"SELECT"; sid:1000001;])`
  },
  {
    id: 2,
    question: "What are the 6 standard Rule Header Actions in Snort / Suricata?",
    shortAnswer: "1. `alert` (generate alert and log packet); 2. `log` (log packet without alerting); 3. `pass` (ignore and allow packet); 4. `drop` (IPS: block packet and drop); 5. `reject` (IPS: drop packet and send TCP RST or ICMP unreachable); 6. `sdrop` (silent drop).",
    explanation: "`alert` and `log` are used in passive IDS deployments. `drop` and `reject` are active inline IPS actions designed to terminate malicious exploit connections on the wire.",
    hint: "alert, log, pass, drop, reject, and sdrop.",
    level: "Basic",
    codeExample: `// Snort Rule Actions:
// Passive IDS: alert tcp any any -> any 80 (...)
// Active IPS : drop tcp any any -> any 80 (...)
// Active RST : reject tcp any any -> any 80 (...)`
  },
  {
    id: 3,
    question: "What is the Snort Rule ID (`sid`) numbering convention and what ranges are reserved for local custom rules?",
    shortAnswer: "< 100: Reserved for internal core rules; 100 to 999,999: Reserved for local enterprise custom rules; >= 1,000,000: Official rules from Cisco Talos and Emerging Threats (ET).",
    explanation: "Using a `sid` below 1,000,000 prevents naming collisions with official threat feeds. Custom rules written by internal security teams should always start at 1000001 or within the 100–999,999 block.",
    hint: "100 to 999,999 is reserved for custom company rules; over 1,000,000 is for official Cisco/ET rules.",
    level: "Basic",
    codeExample: `// SID Numbering Conventions:
// sid:1 to 99         -> System Reserved
// sid:100 to 999999   -> Local Custom Enterprise Rules (Use this range!)
// sid:1000000+        -> Official Cisco Talos / ET Open Rulesets`
  },
  {
    id: 4,
    question: "What is the difference between `depth` / `offset` and `within` / `distance` in Snort payload matching?",
    shortAnswer: "`offset` and `depth` are absolute positions measured from the start of the payload; `distance` and `within` are relative positions measured from the end of the previous `content` match.",
    explanation: "Absolute modifiers (`offset:4; depth:10;`) examine fixed header locations. Relative modifiers (`distance:2; within:20;`) allow chained pattern searches to find follow-up exploit parameters relative to the first matched token.",
    hint: "Offset/Depth are absolute from packet start; Distance/Within are relative from the last match.",
    level: "Moderate",
    codeExample: `// Chained Relative Payload Matching:
// content:"USER"; offset:0; depth:4;
// content:"root"; distance:1; within:10; (Matches 'USER root' within 10 bytes of 'USER')`
  },
  {
    id: 5,
    question: "What does the `fast_pattern` modifier do and why is it critical for multi-pattern matcher (MPM) performance?",
    shortAnswer: "It explicitly tells the IDS to use that specific `content` string inside the Aho-Corasick Multi-Pattern Matcher (MPM) search table, ensuring the rarest, most unique string filters the packet before running slow regex.",
    explanation: "If a rule has a generic string (`GET`) and a unique exploit string (`jndi:ldap`), Snort might pick `GET` by default. Marking `content:\"jndi:ldap\"; fast_pattern;` ensures the fast MPM trie filters out 99.9% of benign packets instantly.",
    hint: "Picking the rarest word in the rule so the search engine can filter out innocent traffic instantly.",
    level: "Moderate",
    codeExample: `// Fast Pattern Optimization:
// content:"GET"; http_method;
// content:"cmd.exe"; fast_pattern; http_uri; (MPM matches 'cmd.exe' first before checking GET)`
  },
  {
    id: 6,
    question: "What is Suricata's 'EVE JSON' (`eve.json`) output format and why is it superior to legacy Snort Unified2 binary logs?",
    shortAnswer: "A unified, structured JSON streaming log format containing complete flow metadata, alert details, HTTP headers, TLS certificates, and DNS queries, easily ingested by modern SIEMs (Elasticsearch, Splunk).",
    explanation: "Unified2 required complex binary parsers (like Barnyard2). EVE JSON provides standard structured JSON records that stream directly into Kafka or Elasticsearch for real-time SOC dashboarding.",
    hint: "A clean JSON stream that SIEM tools like Elastic and Splunk can read immediately without special parsers.",
    level: "Basic",
    codeExample: `// Suricata EVE JSON Output Snippet:
// { "timestamp": "2026-08-23T13:00:00Z", "event_type": "alert", "src_ip": "1.2.3.4", "alert": { "signature": "SQLi Detected" } }`
  },
  {
    id: 7,
    question: "How does Suricata achieve high-throughput multi-gigabit line-rate processing compared to legacy single-threaded Snort 2?",
    shortAnswer: "Suricata uses native multi-threaded worker pipelines with hardware thread pinning, modern lockless ring buffers, and Intel Hyperscan regex offloading, scaling linearly across 64+ CPU cores.",
    explanation: "Snort 2 was single-threaded, requiring manual orchestration of 16 separate Snort processes on a 16-core server. Suricata automatically distributes incoming packets across worker threads utilizing AF_PACKET or DPDK.",
    hint: "Suricata runs multiple worker threads across all CPU cores simultaneously; Snort 2 used only one thread.",
    level: "Moderate",
    codeExample: `// Suricata Multi-Threaded Config (suricata.yaml):
// threading:
//   set-cpu-affinity: yes
//   cpu-affinity:
//     - management-cpu-set: [ 0 ]
//     - receive-cpu-set: [ 1 ]
//     - worker-cpu-set: [ 2, 3, 4, 5, 6, 7 ]`
  },
  {
    id: 8,
    question: "What is Intel 'Hyperscan' and how does it revolutionize regular expression matching in Snort 3 and Suricata?",
    shortAnswer: "A high-performance regular expression matching library developed by Intel that compiles thousands of complex regex rules into a unified SIMD-accelerated state machine executed at line-rate speed.",
    explanation: "Traditional PCRE evaluates regex rules one by one, stalling CPU cores. Hyperscan evaluates 20,000 regex rules simultaneously in a single pass using AVX-512 CPU vector instructions.",
    hint: "An Intel acceleration library that searches 20,000 regex patterns all at once using CPU vector chips.",
    level: "Moderate",
    codeExample: `// Intel Hyperscan Advantage:
// Standard PCRE : 1,000 Rules = 1,000 Sequential Checks (High Latency)
// Intel Hyperscan: 1,000 Rules = 1 Single AVX-512 Vectorized Pass (Line Rate)`
  },
  {
    id: 9,
    question: "What are HTTP Payload Modifiers in Snort (`http_uri`, `http_header`, `http_client_body`) and why are they superior to raw `content`?",
    shortAnswer: "They restrict pattern matching strictly to normalized HTTP protocol buffers, preventing false positives and defeating URL-encoding evasion attacks (e.g. `%20` decoded to spaces).",
    explanation: "Searching raw packet payloads can miss attacks hidden in encoded hex or trigger false alarms on unrelated headers. Protocol inspectors normalize the URI (decoding `%27` to `'`) and search only within that specific HTTP component.",
    hint: "Searching only inside specific web request sections (like the URL or headers) after decoding special characters.",
    level: "Basic",
    codeExample: `// Protocol-Specific Modifier:
// alert tcp any any -> $HTTP_SERVERS 80 (msg:"SQLi"; content:"UNION SELECT"; nocase; http_uri; sid:1000005;)`
  },
  {
    id: 10,
    question: "What does the `nocase` modifier specify in a Snort content option?",
    shortAnswer: "It makes the byte/string search case-insensitive, matching uppercase, lowercase, or mixed-case variations (e.g. `select`, `SELECT`, `SeLeCt`).",
    explanation: "Without `nocase`, an attacker could bypass a signature for `UNION SELECT` by typing `uNiOn sElEcT`. `nocase` normalizes casing during string evaluation.",
    hint: "Matching both upper and lower case letters so attackers cannot bypass rules by changing capitalization.",
    level: "Basic",
    codeExample: `// Case-Insensitive Matching:
// content:"passwd"; nocase; (Matches 'passwd', 'PASSWD', 'PassWd')`
  },
  {
    id: 11,
    question: "How do you match binary hexadecimal byte sequences in a Snort content rule?",
    shortAnswer: "Enclosing hex byte pairs between pipe characters `|...|` (e.g., `content:\"|90 90 90 90|\"` to match an x86 NOP sled).",
    explanation: "Non-printable binary bytes, shellcode, and network protocol opcodes cannot be typed as standard ASCII text. Enclosing them in pipes allows direct hexadecimal bytecode inspection.",
    hint: "Wrapping hex numbers between pipe symbols like `|90 90 90|`.",
    level: "Basic",
    codeExample: `// Binary Hex Matching:
// alert tcp any any -> any any (msg:"NOP Sled"; content:"|90 90 90 90 90 90|"; sid:1000006;)`
  },
  {
    id: 12,
    question: "What is the `pcre` option in Snort and what is the best practice for pairing it with `content`?",
    shortAnswer: "Perl Compatible Regular Expressions for complex pattern matching; best practice mandates pairing `pcre` with a fast static `content` string so the engine only runs slow regex if the fast content matches first.",
    explanation: "Running unconstrained regex across every packet is computationally prohibitive. A fast static `content` string acts as an initial filter: if `content` is missing, the expensive `pcre` engine is never invoked.",
    hint: "Use a simple fast word search first; only run heavy regex if the first word is found.",
    level: "Moderate",
    codeExample: `// Content + PCRE Pairing:
// content:"UNION"; nocase; http_uri;
// pcre:"/UNION\s+ALL\s+SELECT/Ui"; (PCRE only executes if 'UNION' exists in URI)`
  },
  {
    id: 13,
    question: "What is Snort 3's configuration architecture compared to Snort 2?",
    shortAnswer: "Snort 3 replaces legacy `snort.conf` syntax with modern Lua scripts (`snort.lua`), providing structured object-oriented configuration, native multi-threading, and pluggable C++ inspectors.",
    explanation: "Lua configuration allows programmatic logic, dynamic inspector loading, and cleaner syntax, eliminating the monolithic, rigid configuration files of Snort 2.",
    hint: "Snort 3 uses modern Lua programming scripts instead of old plain text config files.",
    level: "Moderate",
    codeExample: `// Snort 3 Lua Config (snort.lua):
// ips = { enable_builtin_rules = true }
// stream_tcp = { max_sessions = 262144 }`
  },
  {
    id: 14,
    question: "What is Suricata's 'TLS SNI & Certificate Extraction' capability without performing full SSL/TLS decryption?",
    shortAnswer: "Suricata parses the unencrypted TLS Client Hello packet to extract the Server Name Indication (SNI) domain and inspects the Server Certificate Subject/Issuer, logging fully qualified domain names and flagging suspicious certificates.",
    explanation: "Even though the subsequent payload is encrypted, the initial TLS handshake is in plaintext. Suricata extracts the SNI domain (e.g. `malicious-c2.ru`) and logs it in `eve.json`, allowing domain blocking without full decryption.",
    hint: "Reading the website name from the unencrypted initial handshake before the connection turns into ciphertext.",
    level: "Moderate",
    codeExample: `// Suricata TLS Rule:
// alert tls any any -> any any (msg:"Blacklisted C2 Domain in SNI"; tls.sni; content:"evil-c2.com"; sid:1000007;)`
  },
  {
    id: 15,
    question: "What does the `classtype` option do in a Snort rule?",
    shortAnswer: "It categorizes the attack type (e.g. `web-application-attack`, `trojan-activity`, `attempted-admin`) and automatically assigns a default priority level (1 to 4) defined in `classification.config`.",
    explanation: "`classtype` standardizes severity metadata across thousands of rules. Priority 1 is high severity (immediate compromise); Priority 3 is low severity (informational scan).",
    hint: "Assigning a standard attack category and priority level to the alert.",
    level: "Basic",
    codeExample: `// Classification Tag:
// classtype:attempted-admin; (Maps to Priority 1 High Severity in SIEM)`
  },
  {
    id: 16,
    question: "What is the `flow` / `flowbits` directive in Snort and how does it track multi-packet stateful attack sequences?",
    shortAnswer: "`flow` matches connection direction (e.g. `to_server, established`); `flowbits` sets and tests persistent boolean flags across multiple packets within the same TCP session to detect multi-stage exploits.",
    explanation: "If an attack requires two steps (Step 1: authenticate; Step 2: send exploit), Rule 1 sets `flowbits:set,logged_in;`. Rule 2 checks `flowbits:isset,logged_in;` before firing, preventing false alarms on unauthenticated traffic.",
    hint: "Setting a memory flag on a connection so a second rule only rings if the first step succeeded.",
    level: "Expert",
    codeExample: `// Multi-Stage Attack Tracking:
// Rule 1: content:"LOGIN_OK"; flowbits:set,auth_success;
// Rule 2: content:"EXEC_SHELL"; flowbits:isset,auth_success; alert!`
  },
  {
    id: 17,
    question: "What is 'Suricata File Extraction' over unencrypted protocols (HTTP, SMB, FTP, SMTP)?",
    shortAnswer: "Suricata automatically carves and reassembles transferred binary files (e.g., `.exe`, `.dll`, `.pdf`) directly from network streams and writes them to disk along with SHA-256 hashes for automated sandbox detonation.",
    explanation: "Rather than merely alerting on malware, Suricata extracts the complete malicious executable from the wire in real time and submits its SHA-256 hash to VirusTotal or an internal Cuckoo sandbox.",
    hint: "Automatically carving and saving uploaded or downloaded files from the network stream to test for viruses.",
    level: "Expert",
    codeExample: `// Suricata File Extraction Rule:
// alert http any any -> any any (msg:"EXE Download"; file.name; content:".exe"; filestore; sid:1000008;)`
  },
  {
    id: 18,
    question: "What is the `dsize` option in Snort and when is it used?",
    shortAnswer: "It tests the size of the packet payload in bytes (e.g. `dsize:>1000` or `dsize:0`), used to detect buffer overflow attempts or abnormal zero-byte probe packets.",
    explanation: "If a specific protocol command should never exceed 128 bytes, an incoming packet with `dsize:>4096` indicates a potential memory corruption / buffer overflow attack.",
    hint: "Checking the size of the data payload in bytes to spot oversized buffer overflow attacks.",
    level: "Basic",
    codeExample: `// Payload Size Check:
// alert ip any any -> any any (msg:"Abnormal Ping of Death"; ip_proto:icmp; dsize:>1000; sid:1000009;)`
  },
  {
    id: 19,
    question: "What is 'DPDK' (Data Plane Development Kit) integration in Suricata enterprise deployments?",
    shortAnswer: "A set of high-speed libraries that bypass the Linux kernel network stack entirely, transferring packets directly from the physical network card (NIC) ring buffers into user-space Suricata memory via zero-copy DMA.",
    explanation: "Kernel packet processing incurs expensive system call interrupts and memory copies. DPDK polls the NIC hardware directly, enabling Suricata to inspect 40 Gbps to 100 Gbps line-rate traffic without packet drops.",
    hint: "Bypassing the operating system to read packets straight from the physical network card at extreme speed.",
    level: "Expert",
    codeExample: `// Suricata DPDK Startup:
// suricata --dpdk -c /etc/suricata/suricata.yaml -i dpdk:0,dpdk:1`
  },
  {
    id: 20,
    question: "What does the `flags` option match in TCP Snort rules (e.g. `flags:S`, `flags:FPU`)?",
    shortAnswer: "It inspects TCP header control flags: `S` (SYN), `A` (ACK), `F` (FIN), `R` (RST), `P` (PSH), `U` (URG); `flags:FPU` detects NULL scans, XMAS scans, or SYN-FIN port sweeps.",
    explanation: "Attackers manipulate TCP flags to fingerprint operating systems or bypass stateless firewalls. Matching illegal flag combinations (like `FIN, PSH, URG` all set simultaneously) uncovers stealth scans.",
    hint: "Checking specific TCP flag letters like SYN, ACK, FIN, or RST.",
    level: "Basic",
    codeExample: `// XMAS Scan Detection:
// alert tcp any any -> any any (msg:"SCAN XMAS Scan"; flags:FPU; sid:1000010;)`
  },
  {
    id: 21,
    question: "What is 'Suricata Datasets' for high-performance dynamic IP/Domain blacklisting?",
    shortAnswer: "An in-memory hash set structure that allows Suricata rules to look up source IPs, domains, or hashes against external threat lists containing millions of indicators with $O(1)$ constant time lookup.",
    explanation: "Writing 500,000 individual Snort rules for 500,000 malicious IPs destroys performance. Suricata Datasets load the 500,000 IPs into a single memory table checked by one rule: `dataset:isset,bad_ips,type ip,load /etc/threat_ips.txt`.",
    hint: "Loading huge lists of 500,000 bad IPs into an instant memory lookup table for a single rule.",
    level: "Expert",
    codeExample: `// Suricata Dataset Rule:
// alert ip any any -> any any (msg:"Blacklisted Threat IP"; dataset:isset,malicious_ips,type ip,load threat_feed.lst; sid:1000011;)`
  },
  {
    id: 22,
    question: "How do you test and validate a new Snort rule syntax offline before deploying it to production?",
    shortAnswer: "Run `snort -T -c /etc/snort/snort.conf` to test configuration syntax and parse rules, and test detection against stored pcap files using `snort -r test_exploit.pcap -c /etc/snort/snort.conf`.",
    explanation: "Syntax errors in rule files prevent Snort from starting, taking the IDS offline. Running `-T` validates rule grammar, and replaying pcap files with `-r` confirms that the signature accurately fires on target exploits.",
    hint: "Use `snort -T` to check for typos and `snort -r sample.pcap` to test on recorded packet captures.",
    level: "Basic",
    codeExample: `// Snort Rule Validation Commands:
// sudo snort -T -c /etc/snort/snort.conf (Syntax Validation Mode)
// sudo snort -r /pcaps/exploit_sample.pcap -c /etc/snort/snort.conf -A console`
  },
  {
    id: 23,
    question: "What is 'Rule Profiling' (`--profile-rules`) in Snort and Suricata performance optimization?",
    shortAnswer: "A built-in diagnostic mode that measures the exact CPU execution time and memory ticks consumed by each individual signature, identifying slow, poorly written rules that degrade sensor throughput.",
    explanation: "If an analyst writes an inefficient regex with exponential backtracking, rule profiling highlights that specific SID as consuming 60% of total CPU time, allowing engineers to rewrite or prune it.",
    hint: "A stopwatch tool that measures how much CPU time each security rule uses to find slow rules.",
    level: "Moderate",
    codeExample: `// Snort Rule Profiling Config:
// config profile_rules: 10, sort avg_ticks (Displays the top 10 slowest rules by CPU cycles)`
  },
  {
    id: 24,
    question: "What is 'AF_PACKET' mode in Suricata Linux high-speed packet capture?",
    shortAnswer: "A high-performance Linux socket interface (`PACKET_MMAP`) that uses memory-mapped shared ring buffers between kernel space and user space, eliminating packet copy overhead across multiple fan-out worker threads.",
    explanation: "AF_PACKET fan-out clusters distribute incoming network flows symmetrically across CPU cores using packet hashing, achieving 10G+ capture line rate without requiring proprietary hardware NIC drivers.",
    hint: "A fast Linux network socket that shares memory buffers to capture 10G traffic without dropping packets.",
    level: "Moderate",
    codeExample: `// Suricata AF_PACKET Config:
// af-packet:
//   - interface: eth0
//     threads: auto
//     cluster-id: 99
//     cluster-type: cluster_flow (5-Tuple Symmetrical Fanout)`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance mandate regarding Snort/Suricata Rule Base Integrity and Alert Logs?",
    shortAnswer: "Organizations must maintain version-controlled records of all active signature rule sets, changes, and immutable alert telemetry with NPL India NTP timestamps in SIEM storage for a minimum of 180 days.",
    explanation: "Under Indian cybersecurity directives, security teams must be able to prove which specific signatures were active during an incident and retain complete 180-day forensic log histories.",
    hint: "180-day retention of all signature rule changes and IDS alert logs synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Structured CERT-In Compliant Suricata Log:
const certInSuricataLog = {
  timestamp: "2026-08-23T13:05:00.120Z",
  engine: "Suricata_7.0_Hyperscan",
  sid: 1000001,
  msg: "SQL Injection Attempt",
  srcIp: "198.51.100.45",
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is the `replace` option in Snort in-line Active IPS mode?",
    shortAnswer: "A directive that actively modifies the malicious payload in flight, overwriting the exploit byte string with harmless characters (e.g. replacing `malware.exe` with `xxxxxxx.xxx`) before forwarding the packet to the server.",
    explanation: "`replace` neutralizes the attack without having to tear down the entire TCP connection, allowing the application session to survive while rendering the exploit payload completely inoperative.",
    hint: "Overwriting malicious text inside a packet with harmless letters while it is traveling across the wire.",
    level: "Expert",
    codeExample: `// Snort IPS In-Line Replacement:
// alert tcp any any -> any 80 (msg:"Blocked"; content:"malware.exe"; replace:"blocked.txt"; sid:1000012;)`
  },
  {
    id: 27,
    question: "What is 'LuaJIT Scripting' in Suricata custom protocol detection?",
    shortAnswer: "Embedding Lua Just-In-Time compiled scripts directly into Suricata rules (`lua:script.lua`), enabling complex algorithmic payload manipulation, checksum verification, and protocol state tracking beyond static regex.",
    explanation: "When static regex rules are insufficient to decode proprietary binary industrial protocols, a Lua script inspects dynamic byte offsets and unpacks nested structures at near C-code execution speed.",
    hint: "Using Lua programming scripts inside security rules to inspect complex custom protocols.",
    level: "Expert",
    codeExample: `// Suricata Lua Rule:
// alert tcp any any -> any 1883 (msg:"Custom MQTT Attack"; lua:inspect_mqtt_packet.lua; sid:1000013;)`
  },
  {
    id: 28,
    question: "What is 'Suricata Bypass Keyword' (`bypass`) for hardware offloading of trusted elephant flows?",
    shortAnswer: "A rule option that permanently bypasses all future packets of an established high-bandwidth trusted flow (e.g. Netflix video or internal SAN backup) directly in the smartNIC hardware, freeing CPU cores for inspection.",
    explanation: "Inspecting gigabytes of trusted encrypted video streaming wastes CPU cycles. Marking `bypass` commands the smartNIC or eBPF filter to forward subsequent packets in hardware without sending them to Suricata.",
    hint: "Skipping inspection for huge trusted video or backup streams to free up sensor CPU power.",
    level: "Expert",
    codeExample: `// Suricata Stream Bypass:
// alert tcp $SAN_SERVERS any -> $BACKUP_SERVERS 445 (msg:"Bypass Backup Stream"; bypass; sid:1000014;)`
  },
  {
    id: 29,
    question: "What is the `detection_filter` option in Snort and how does it detect rate-based scanning attacks?",
    shortAnswer: "It triggers an alert only when a specific rule matches more than $N$ times within $M$ seconds from a single source IP (`track by_src, count 20, seconds 5`).",
    explanation: "Unlike `event_filter` (which suppresses logging of already-fired alerts), `detection_filter` delays firing until the malicious threshold is crossed, making it the ideal mechanism for detecting port scanners and brute-force tools.",
    hint: "Only ringing the alarm if an attacker sends more than 20 probe packets in 5 seconds.",
    level: "Moderate",
    codeExample: `// Snort Detection Filter:
// alert tcp any any -> $HTTP_SERVERS 80 (msg:"HTTP Scan"; detection_filter:track by_src, count 30, seconds 10; sid:1000015;)`
  },
  {
    id: 30,
    question: "Synthesize the overarching best practices for writing high-performance Snort and Suricata rules.",
    shortAnswer: "High-performance rule authoring mandates: specifying exact protocol and port headers, pairing regex with fast static `content` strings, leveraging `fast_pattern` and HTTP normalized modifiers (`http_uri`), using Hyperscan SIMD acceleration, streaming `eve.json` to SIEM, and maintaining 180-day CERT-In audit trails.",
    explanation: "Carefully engineered rules eliminate CPU bottlenecks and false alarms, providing robust, multi-gigabit line-rate perimeter defense across enterprise networks in full compliance with CERT-In and the DPDP Act 2023.",
    hint: "Use specific port headers, fast content words, fast_pattern modifiers, and clean JSON logging.",
    level: "Moderate",
    codeExample: `// The Gold-Standard Snort / Suricata Rule:
// alert tcp $EXTERNAL_NET any -> $HTTP_SERVERS 80 (msg:"EXPLOIT SQLi UNION SELECT"; flow:to_server,established; content:"UNION SELECT"; nocase; http_uri; fast_pattern; classtype:web-application-attack; sid:1000016; rev:1;)`
  }
];

export default questions;
