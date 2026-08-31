const questions = [
  {
    question: "What is a Denial of Service (DoS) Attack, and which pillar of the CIA Triad does it violate?",
    shortAnswer: "An attack that intentionally disrupts, exhausts, or shuts down a computer system, service, or network to make it unavailable to legitimate users, violating the Availability pillar.",
    explanation: "Unlike confidentiality attacks (which steal data) or integrity attacks (which tamper with data), a Denial of Service attack targets the Availability pillar. By overwhelming target resources (bandwidth, CPU, memory, database connection pools, or socket queues), legitimate users cannot access critical services like banking, hospitals, or emergency networks.",
    hint: "Think of blocking all the roads leading to a hospital so ambulances cannot enter.",
    level: "basic",
    codeExample: `// CIA Triad Impact:
// Confidentiality: Intact (No data stolen)
// Integrity      : Intact (No data altered)
// Availability   : COMPROMISED (0% legitimate users can access portal)`
  },
  {
    question: "What is a Distributed Denial of Service (DDoS) attack, and how do Botnets orchestrate volumetric floods?",
    shortAnswer: "A coordinated DoS attack launched simultaneously from thousands of geographically distributed compromised devices (a Botnet) controlled by a central Command & Control (C2) server.",
    explanation: "A single computer launching a flood is easily blocked by an IP firewall rule. In a DDoS attack, the adversary commands a botnet (e.g. Mirai botnet compromising millions of IoT cameras) to flood the target from millions of IP addresses simultaneously. The aggregated bandwidth (e.g. 2.5 Terabits/sec) saturates ISP upstream pipes before firewalls can even inspect the packets.",
    hint: "One person shouting is easy to ignore; ten thousand people shouting at once deafens the whole room.",
    level: "basic",
    codeExample: `// Botnet Orchestration Command:
// C2 Server → 500,000 Bots: "ATTACK target=103.25.10.50 port=443 duration=3600 method=UDP_FLOOD"`
  },
  {
    question: "What are the three primary categories of DDoS Attacks?",
    shortAnswer: "1. Volumetric Attacks (Bandwidth saturation); 2. Protocol / State-Exhaustion Attacks (Firewall/OS table saturation); 3. Application Layer (Layer 7) Attacks (CPU/RAM/Database exhaustion).",
    explanation: "1. Volumetric: Sinking internet links with raw gigabits/terabits (UDP/ICMP floods, DNS amplification). 2. Protocol: Exhausting stateful resources like TCP connection tables and firewall state buffers (SYN flood, Ping of Death). 3. Application Layer: Generating complex HTTP GET/POST queries that force heavy database joins or cryptographic computations (Slowloris, HTTP flood).",
    hint: "Filling the road with dirt (volumetric), locking the front door mechanism (protocol), or hiring 1,000 fake shoppers to ask 100 questions each (application layer).",
    level: "moderate",
    codeExample: `// Categories & Metrics:
// Volumetric : Measured in Gbps / Tbps (Bits per second)
// Protocol   : Measured in Mpps (Packets per second)
// App Layer  : Measured in RPS (Requests per second)`
  },
  {
    question: "How does a TCP SYN Flood operate, and how do TCP SYN Cookies defeat it without allocating socket memory?",
    shortAnswer: "SYN floods send forged SYN packets to fill the server's half-open backlog queue; SYN Cookies encode connection state into the Initial Sequence Number (ISN) without allocating memory buffers.",
    explanation: "Under normal TCP, receiving a SYN causes the kernel to allocate a Transmission Control Block (TCB) in the `SYN_RECV` queue. An attacker floods millions of spoofed SYNs, filling the queue ($Q_{max}$) and dropping legitimate connections. SYN Cookies calculate $ISN = \\text{PRF}(IPs, Ports, t, MSS)$ and return the SYN-ACK immediately without saving any state in memory, completely defeating backlog exhaustion.",
    hint: "Handing out cloakroom claim tickets instead of reserving a giant banquet table before the guest actually arrives.",
    level: "expert",
    codeExample: `// Linux SYN Cookies Activation:
sudo sysctl -w net.ipv4.tcp_syncookies=1
sudo sysctl -w net.ipv4.tcp_max_syn_backlog=4096`
  },
  {
    question: "What is an Amplification / Reflection DDoS Attack, and why does UDP make it possible?",
    shortAnswer: "Attackers send small requests with a spoofed victim source IP to open internet servers (DNS, NTP, Memcached); the servers reply with huge responses directed at the victim.",
    explanation: "UDP is stateless and connectionless, allowing the attacker to spoof the victim's source IP address without needing a handshake. The Amplification Factor ($AF = \\text{Response Size} / \\text{Request Size}$) turns a small 10 Mbps attack stream into a 500 Gbps tsunami crushing the victim's network.",
    hint: "Sending postcards with someone else's return address asking for giant encyclopedias to be delivered to their house.",
    level: "expert",
    codeExample: `// Amplification Factors (AF):
// DNS (EDNS0)  : ~50x to 70x Amplification
// NTP (monlist): ~556x Amplification
// Memcached    : ~10,000x to 51,000x Amplification (15-byte request yields 750 KB response!)`
  },
  {
    question: "What is the Slowloris Attack, and how does it exhaust web server worker threads with minimal bandwidth?",
    shortAnswer: "Slowloris opens hundreds of HTTP connections and sends incomplete headers very slowly (every 10-15 seconds), keeping server threads tied up indefinitely until connection pools are exhausted.",
    explanation: "Unlike volumetric floods that consume gigabits, Slowloris requires only a few kilobytes/sec. It sends: `GET / HTTP/1.1\\r\\nHost: bank.in\\r\\nX-a: b\\r\\n`. Instead of finishing with `\\r\\n\\r\\n`, it waits 15 seconds and sends `X-c: d\\r\\n`. Thread-based web servers (like Apache worker pools) allocate an entire thread to wait for headers, quickly hitting `MaxClients` and refusing new connections.",
    hint: "Standing at a fast-food counter ordering one fry every 10 minutes to hold up the entire line with almost no money.",
    level: "moderate",
    codeExample: `# Slowloris Header Drip:
GET / HTTP/1.1\r\n
Host: portal.kolkatabank.in\r\n
User-Agent: Mozilla/5.0\r\n
X-a: 1\r\n  ... [Wait 15s] ...
X-b: 2\r\n  ... [Wait 15s] ...`
  },
  {
    question: "How does an Asymmetric Application-Layer (Layer 7) DDoS Attack exploit resource cost differences between client and server?",
    shortAnswer: "A client sends a trivial request (e.g. complex SQL search or RSA cryptographic handshake) that requires 1 unit of client CPU but consumes 10,000 units of server CPU and database I/O.",
    explanation: "Generating a search query `GET /search?q=a*b*c*d*` costs the attacker negligible CPU. On the backend, this forces the database to execute a full table scan, multiple unindexed joins, and heavy regex evaluations across millions of rows. Generating 500 such queries per second maxes out all database CPU cores and crashes the backend, even though network bandwidth utilization is under 1 Mbps.",
    hint: "Throwing a tiny match that forces the fire department to deploy 10 fire trucks.",
    level: "expert",
    codeExample: `// Asymmetric Resource Cost:
// Client Cost : 0.001 ms CPU to emit 'POST /api/generate-pdf-report'
// Server Cost : 850 ms CPU + 120 MB RAM to compile PDF & query database`
  },
  {
    question: "What is BGP FlowSpec (RFC 5575), and how does it mitigate DDoS attacks at upstream ISP routers?",
    shortAnswer: "BGP FlowSpec allows border routers to propagate fine-grained packet matching rules (source IP, port, packet length) to drop or rate-limit DDoS traffic at line rate across upstream transit providers.",
    explanation: "When an enterprise in Kolkata is hit with a 300 Gbps UDP flood, its local firewalls cannot process the volume. The enterprise security team injects a BGP FlowSpec announcement to upstream telecom carriers (Airtel, Jio, Tata). Upstream edge routers drop the malicious UDP traffic directly on international ingress interfaces, ensuring clean traffic reaches the enterprise.",
    hint: "Alerting the national highway authority to block a specific caravan of dump trucks before they reach city roads.",
    level: "expert",
    codeExample: `// BGP FlowSpec Rule Announcement:
flowspec {
    match {
        destination 103.25.10.0/24;
        protocol udp;
        port 123; // NTP
        packet-length 400-1420;
    }
    then {
        rate-limit 0; // Drop at upstream line rate!
    }
}`
  },
  {
    question: "Under the Indian IT Act 2000 Section 66F, what is the penalty for Cyber Terrorism via Critical Infrastructure DoS?",
    shortAnswer: "Imprisonment for life for intentionally denying access or disrupting critical computer systems (such as power grids, nuclear facilities, or banking switches) to threaten the unity, integrity, or security of India.",
    explanation: "Section 66F is one of the most severe provisions in Indian law: 'Whoever, with intent to threaten the unity, integrity, security or sovereignty of India... denies or cause the denial of access to any person authorized to access computer resource... shall be punishable with imprisonment which may extend to imprisonment for life.'",
    hint: "Section 66F carries a mandatory sentence of LIFE IMPRISONMENT for cyber attacks on national critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act 2000 Section 66F - Cyber Terrorism):
// Offense: Disrupting power grid SCADA or national payment switches via DDoS
// Penalty: Rigorous Imprisonment for LIFE`
  },
  {
    question: "How does Anycast BGP Routing distribute volumetric DDoS attacks across global scrubbing centers?",
    shortAnswer: "Anycast announces the same IP address from dozens of data centers worldwide; global internet routing automatically routes attack traffic to the closest local scrubbing node, diluting the flood.",
    explanation: "If an attacker unleashes a 1.5 Tbps botnet from across the world against a single unicast IP, the data center pipe melts. With BGP Anycast (used by Cloudflare / Akamai), the IP is announced from 300 cities globally. Bots in Europe hit Frankfurt, bots in Asia hit Mumbai/Kolkata, and bots in the Americas hit New York. Each local center scrubs a manageable 5 Gbps, completely neutralizing the 1.5 Tbps flood.",
    hint: "Having 300 identical branch offices across the world: attack crowds get divided and absorbed locally.",
    level: "expert",
    codeExample: `// Anycast BGP Dispersion:
// 1.5 Tbps Global Botnet Attack ➔ Dispersed across 300 Anycast PoPs
// Result: Each local PoP filters only ~5 Gbps of localized traffic`
  },
  {
    question: "What is the HTTP/2 'Rapid Reset' Attack (CVE-2023-44487), and how did it set the record for the largest DDoS in internet history?",
    shortAnswer: "It abuses HTTP/2 multiplexing by sending a `HEADERS` stream frame and immediately canceling it with `RST_STREAM`, generating hundreds of millions of requests per second without closing the TCP connection.",
    explanation: "In standard HTTP/1.1, opening a new request requires a TCP connection or pipeline. HTTP/2 allows thousands of concurrent streams on a single TCP socket. Attackers sent a stream request and immediately sent a `RST_STREAM` cancellation frame. The server spent CPU parsing and managing stream state tables, generating over 398 Million Requests Per Second (RPS) and exhausting server memory.",
    hint: "Pressing the elevator call button and cancel button 10,000 times a second to jam the elevator computer.",
    level: "expert",
    codeExample: `// HTTP/2 Rapid Reset Exploit Flow:
// Client → Server: HEADERS (Stream 1) → Requests /expensive-query
// Client → Server: RST_STREAM (Stream 1) → Cancels request
// Client → Server: HEADERS (Stream 3) → Requests /expensive-query ... [Repeats 500k times/sec]`
  },
  {
    question: "What is Regular Expression Denial of Service (ReDoS), and how does catastrophic backtracking crash application servers?",
    shortAnswer: "Vulnerable regex patterns with nested quantifiers (e.g. `(a+)+$`) enter exponential backtracking $O(2^n)$ when evaluating non-matching input strings, locking the CPU at 100%.",
    explanation: "When a regex engine evaluates `^(a+)+$` against `aaaaaaaaaaaaaaaaaaaaX`, it tries every possible permutation of splitting the 'a's across groups before failing. An input string of only 30 characters triggers $2^{30} \\approx 1,000,000,000$ state comparisons, pegging a Node.js single-threaded event loop at 100% CPU and blocking all other user requests for minutes.",
    hint: "Giving a puzzle with nested loops to a computer that takes 2^n steps to realize the last letter doesn't fit.",
    level: "expert",
    codeExample: `// Vulnerable ReDoS Pattern:
const regex = /^([a-zA-Z0-9_.-]+)+@([a-zA-Z0-9_.-]+)+$/;
regex.test("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"); // Locks Node.js event loop for 45 seconds!
// Secure Defense: Use linear-time DFA regex engines (RE2) or avoid nested quantifiers.`
  },
  {
    question: "What is a Smurf Attack, and why is it categorized as an ICMP Broadcast Amplification attack?",
    shortAnswer: "The attacker broadcasts ICMP Echo requests with a spoofed victim source IP to a subnet's broadcast address; every host on the subnet replies to the victim.",
    explanation: "In legacy networking, sending a ping to `192.168.1.255` (directed broadcast) caused all 254 hosts on the subnet to emit an ICMP Echo Reply back to the source. By spoofing the victim's IP, 1 ping packet generated 254 replies flooding the victim. Modern routers disable directed broadcast (`no ip directed-broadcast`) by default.",
    hint: "Yelling an order in a crowded stadium using someone else's name, causing 10,000 people to shout answers at them.",
    level: "moderate",
    codeExample: `// Cisco Router Smurf Mitigation:
interface GigabitEthernet0/1
 no ip directed-broadcast # Drops broadcast ping frames`
  },
  {
    question: "How does the Token Bucket / Leaky Bucket algorithm enforce Rate Limiting on Web Application Firewalls (WAF)?",
    shortAnswer: "Tokens are added to a bucket at a constant rate $r$; each incoming request consumes 1 token. If the bucket is empty, requests exceeding the burst capacity $B$ are rejected with HTTP 429.",
    explanation: "To protect login portals or search APIs from HTTP floods, WAFs implement Token Bucket rate limiters. A client is granted a bucket with capacity $B = 50$ tokens, refilling at $r = 5$ tokens/sec. A burst of 50 requests is allowed, but sustained traffic exceeding 5 req/sec receives `HTTP 429 Too Many Requests`, smoothing traffic surges.",
    hint: "A water bucket with a small hole: you can dump a cup of water, but if you pour a bucket-full too fast, it overflows.",
    level: "moderate",
    codeExample: `// Nginx Rate Limiting Configuration (Token Bucket):
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

server {
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay; # Allows burst of 20, then limits to 10 req/s
    }
}`
  },
  {
    question: "What is Blackholing (Null Routing), and why is it considered the 'nuclear option' in DDoS defense?",
    shortAnswer: "The ISP routes all traffic destined for the victim's IP address into a black hole (`/dev/null`), dropping the attack traffic along with 100% of legitimate traffic to protect upstream infrastructure.",
    explanation: "When a volumetric DDoS attack (e.g. 800 Gbps) threatens to crash an entire ISP or data center core router, the network operations center injects a BGP blackhole route (`community 65535:666`). Upstream routers discard all packets destined for the victim IP. While this saves the ISP and neighboring customers, it achieves the attacker's goal: taking the victim completely offline.",
    hint: "Cutting the entire power line to a house to stop a fuse from blowing in the neighborhood substation.",
    level: "expert",
    codeExample: `// BGP Remotely Triggered Black Hole (RTBH) Announcement:
router bgp 65000
 neighbor 198.51.100.1 route-map BGP-BLACKHOLE out
!
route-map BGP-BLACKHOLE permit 10
 set community 65535:666 # Upstream ISP routes victim IP to Null0`
  },
  {
    question: "How does CAPTCHA / Proof-of-Work (PoW) client puzzles defeat automated Layer 7 bot floods?",
    shortAnswer: "It forces client browsers to solve an interactive visual puzzle or compute a cryptographic hash before the server allocates expensive backend resources.",
    explanation: "When a DDoS anomaly is detected, Cloudflare / Cloud Armor challenges inbound requests with a Proof-of-Work puzzle: 'Find nonce $N$ such that $\\text{SHA256}(\\text{Challenge} \\parallel N)$ has 4 leading zeros'. For a normal user, solving this takes 100ms in JavaScript. For a botnet emitting 100,000 requests/sec, computing 100,000 hashes/sec overloads the bots' CPUs, collapsing the attack.",
    hint: "Making everyone do 10 pushups before entering the store: customers don't mind once, but a robot mob gets exhausted.",
    level: "moderate",
    codeExample: `// Proof-of-Work Verification Logic:
function verifyPoW(challenge, nonce) {
  const hash = crypto.createHash('sha256').update(challenge + nonce).digest('hex');
  return hash.startsWith("0000"); // Validates leading zeros difficulty
}`
  },
  {
    question: "Under the Indian IT Act 2000 Section 43(f), what is the civil liability for disrupting a computer system?",
    shortAnswer: "Liable to pay compensation by way of damages up to ₹1 Crore to the person affected for denying or disrupting access to any computer system.",
    explanation: "Section 43(f) explicitly covers Denial of Service disruptions: 'If any person without permission of the owner... denies or causes the denial of access to any person authorized to access any computer system or computer network... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for causing computer system disruption.",
    level: "basic",
    codeExample: `// Civil Liability (IT Act Section 43(f)):
// Violation: Launching DoS/DDoS attacks disrupting corporate servers
// Compensation: Up to ₹1,00,00,000 (Rupees One Crore)`
  },
  {
    question: "What is an NTP Amplification `monlist` attack, and how is it disabled?",
    shortAnswer: "The NTP `monlist` query returns the IP addresses of the last 600 clients that queried the server, producing a 556x traffic amplification; it is disabled with `disable monitor`.",
    explanation: "The legacy NTP `monlist` command is an administrative diagnostic. An attacker sends a 234-byte UDP request with a spoofed source IP. The NTP server returns up to 100 UDP packets containing the list of 600 hosts, totaling ~130,000 bytes (556x amplification). Modern NTP servers disable the command with `disable monitor` in `ntp.conf`.",
    hint: "Asking a librarian for a 1-sentence question and receiving 100 encyclopedia volumes in return.",
    level: "moderate",
    codeExample: `# Test for vulnerable NTP server:
ntpdc -c monlist 192.168.1.1
# Output: Returns 600 IP addresses (Vulnerable!)
# Fix in /etc/ntp.conf:
disable monitor`
  },
  {
    question: "How does the Teardrop Attack crash legacy operating systems using overlapping IP fragments?",
    shortAnswer: "It injects fragmented IP packets with overlapping `Fragment Offset` and `Total Length` fields; when the OS kernel attempts to reassemble the payload, it crashes with a kernel panic.",
    explanation: "IPv4 allows large packets to be fragmented. The IP header specifies the starting byte offset of each fragment. Teardrop crafted Fragment 1 with offset 0 and length 36 (bytes 0-35), and Fragment 2 with offset 24 and length 20 (bytes 24-43). Legacy Linux and Windows NT kernels subtracted offsets incorrectly, producing negative memory copy lengths that overwrote kernel memory and crashed the machine.",
    hint: "Tearing a letter in half so the two halves overlap awkwardly, crashing the person trying to tape them together.",
    level: "expert",
    codeExample: `// Teardrop Overlapping Offset Header:
// Fragment 1: Offset = 0, Length = 36 Bytes (Range: 0-35)
// Fragment 2: Offset = 24, Length = 20 Bytes (Range: 24-43) [OVERLAPPING!]
// Defense   : Modern OS kernels validate fragment boundaries strictly: (offset + len <= prev_offset)`
  },
  {
    question: "Synthesize a multi-tiered Enterprise DDoS Defense Architecture capable of mitigating 1+ Terabit/sec volumetric and application layer attacks.",
    shortAnswer: "An integrated framework combining BGP Anycast scrubbing centers (Volumetric), BGP FlowSpec (Upstream), hardware SYN Proxies (Protocol), and WAF Token Bucket rate limiting with CAPTCHA (Layer 7).",
    explanation: "To survive multi-terabit attacks: 1. Volumetric Layer: Global BGP Anycast network (e.g. Cloudflare Magic Transit / AWS Shield Advanced) dispersing traffic across hundreds of global scrubbing centers. 2. Border Routing Layer: BGP FlowSpec rules dropping amplified UDP ports (NTP 123, Memcached 11211, DNS 53). 3. Protocol Layer: Hardware F5 / Palo Alto SYN Proxies with SYN Cookies. 4. Application Layer: WAF rate limiting, HTTP/2 Rapid Reset mitigation, and Cloudflare Turnstile CAPTCHAs.",
    hint: "Absorb the ocean across 300 global sponge data centers, drop bad UDP at border routers, and rate-limit application queries with WAFs.",
    level: "expert",
    codeExample: `// Master Enterprise DDoS Blueprint:
// Tier 1 (Global WAN) : BGP Anycast Scrubbing Network (Capacity > 100 Tbps)
// Tier 2 (ISP Edge)   : BGP FlowSpec (RFC 5575) Rate Limiting on Amplified Ports
// Tier 3 (Border FW)  : Hardware TCP SYN Proxy + net.ipv4.tcp_syncookies = 1
// Tier 4 (App WAF)    : Token Bucket Rate Limiting + HTTP/2 Stream Caps + Proof-of-Work`
  },
  {
    question: "What is an SSL/TLS Renegotiation Denial of Service Attack (e.g. THC-SSL-DOS)?",
    shortAnswer: "An attacker repeatedly sends TLS client renegotiation requests over a single TCP connection, forcing the server to perform expensive asymmetric RSA/ECDH decryptions.",
    explanation: "Asymmetric TLS decryption is computationally expensive for servers (requiring modular exponentiation) but cheap for clients. An attacker opening 100 TCP sockets repeatedly demands TLS session renegotiation. The server consumes 100% of CPU cycles doing math, starving legitimate users. Mitigations: Disable client-initiated renegotiation (`ssl_session_tickets on;`).",
    hint: "Asking a bank manager to solve 1,000 complex calculus problems over and over to prevent them from helping real customers.",
    level: "expert",
    codeExample: `// OpenSSL / Nginx TLS Renegotiation Defense:
// Disable client-initiated renegotiation (Default in TLS 1.3):
// TLS 1.3 completely removed the vulnerable renegotiation mechanism!`
  },
  {
    question: "How does the R-U-Dead-Yet (RUDY) attack differ from Slowloris in application layer exhaustion?",
    shortAnswer: "Slowloris sends slow HTTP request headers, whereas RUDY sends a valid `Content-Length` header in a POST request and transmits the body bytes one single byte at a time.",
    explanation: "In a RUDY attack, the attacker targets web forms (like login or feedback pages). It submits: `POST /login HTTP/1.1\\r\\nContent-Length: 100000\\r\\n`. The server prepares its memory buffers to receive 100,000 bytes. The attacker transmits 1 byte every 10 seconds. Web server worker processes remain blocked waiting for the POST body, exhausting thread pools.",
    hint: "Sending a giant shipping box and putting one grain of rice into it every 5 minutes.",
    level: "moderate",
    codeExample: `// Nginx Mitigation against RUDY:
client_body_timeout 10s;
client_header_timeout 10s;
client_max_body_size 10m;`
  },
  {
    question: "What is a Ping of Death (PoD) attack, and how did it crash early network stacks?",
    shortAnswer: "Sending an ICMP packet that, when reassembled from IP fragments, exceeded the maximum allowable IPv4 packet size of 65,535 bytes, causing an integer overflow.",
    explanation: "The IPv4 specification defines the maximum packet length as 65,535 bytes (16 bits). By sending fragmented ICMP echo packets where `Offset + Length > 65535`, early operating system kernels allocated a 65,535-byte memory buffer. When copying the final fragment, memory beyond the buffer was corrupted, causing instant operating system crashes or BSODs.",
    hint: "Pouring 70 liters of water into a 65-liter tank so it overflows and fries the engine.",
    level: "moderate",
    codeExample: `// Ping of Death Calculation:
// Fragment 1: Offset = 0, Length = 60,000
// Fragment 2: Offset = 60,000, Length = 6,000 → Total = 66,000 Bytes (> 65,535 Maximum!)`
  },
  {
    question: "How does the Memcached UDP Reflection attack achieve a 50,000x amplification factor?",
    shortAnswer: "Memcached servers exposed to the internet on UDP port 11211 return megabytes of cached keys in response to a 15-byte `stats` query.",
    explanation: "Memcached is an in-memory caching system designed for internal networks. In 2018, attackers discovered thousands of Memcached instances listening on public UDP port 11211. An attacker sending a 15-byte request with a spoofed victim source IP triggered the server to return 750 Kilobytes of cached records in hundreds of packets, generating a staggering 1.7 Terabit/sec flood against GitHub.",
    hint: "Whispering a tiny 2-word question and having a giant megaphone scream a 500-page book at your target.",
    level: "expert",
    codeExample: `# Exploit packet:
echo -en "\x00\x00\x00\x00\x00\x01\x00\x00stats\r\n" | nc -u -w1 target_memcached 11211
# Defense: Bind Memcached to localhost only (127.0.0.1) and disable UDP (-U 0)`
  },
  {
    question: "What is a ReDoS Catastrophic Backtracking Tree, and how do Deterministic Finite Automata (DFA) engines prevent it?",
    shortAnswer: "DFA engines (like Google's RE2) guarantee linear time execution O(n) by tracking all possible matching states in parallel without recursive backtracking.",
    explanation: "Standard regex engines (PCRE, JavaScript, Python) use Non-Deterministic Finite Automata (NFA) with recursive backtracking. When encountering nested ambiguity, the state search tree branches exponentially $O(2^n)$. DFA engines (like RE2) compute matching states in a single linear pass over the input text, mathematically guaranteeing $O(n)$ time complexity regardless of input pattern complexity.",
    hint: "Searching through a maze by exploring all paths simultaneously in one step rather than walking down every dead end.",
    level: "expert",
    codeExample: `// Using Google RE2 (Linear Time) in Node.js:
const RE2 = require('re2');
const safeRegex = new RE2('^([a-zA-Z0-9_.-]+)+@([a-zA-Z0-9_.-]+)+$');
safeRegex.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaa!'); // Evaluates in 0.01 ms (No ReDoS!)`
  },
  {
    question: "How does BGP Remotely Triggered Blackholing (RTBH) work with customer communities?",
    shortAnswer: "The victim network advertises a /32 host route tagged with a pre-arranged ISP blackhole BGP community (e.g. `65000:666`), signaling the ISP to drop all traffic to that IP at its border.",
    explanation: "When an individual IP address (e.g. `103.25.10.45`) is overwhelmed by a 500 Gbps flood that threatens to saturate the entire `/24` datacenter subnet, the enterprise router advertises `103.25.10.45/32 community 65000:666`. The upstream ISP matches the community and routes all traffic for that specific single IP into Null0, sacrificing the single host to save the rest of the company's network.",
    hint: "Amputating a single finger to save the whole patient's arm from gangrene.",
    level: "expert",
    codeExample: `// Cisco RTBH Route-Map Trigger:
ip route 103.25.10.45 255.255.255.255 Null0
router bgp 65000
 redistribute static route-map SET-BLACKHOLE
!
route-map SET-BLACKHOLE permit 10
 set community 65535:666`
  },
  {
    question: "What is an HTTP Connection Pool Starvation Attack against microservice architectures?",
    shortAnswer: "An attacker floods a non-critical microservice endpoint, consuming all available HTTP client connections in shared pools and causing critical services to fail with timeouts.",
    explanation: "In modern Kubernetes microservice architectures, backend services share connection pools (e.g. 500 HTTP/gRPC pool connections). An attacker targeting `/ratings` sends 5,000 slow queries. The connection pool fills up, preventing the critical `/payments` microservice from acquiring a connection, causing cascading 504 Gateway Timeouts across the entire application.",
    hint: "Filling all the phone lines in an office building with trivia questions so emergency calls cannot go through.",
    level: "moderate",
    codeExample: `// Istio Service Mesh Circuit Breaker (Defense):
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: ratings-circuit-breaker
spec:
  host: ratings.prod.svc.cluster.local
  trafficPolicy:
    connectionPool:
      http:
        maxConnectionsPerHost: 50 # Caps connections so payment service pool is not starved`
  },
  {
    question: "How does the 'Land Attack' crash early operating systems using identical source and destination sockets?",
    shortAnswer: "The attacker sends a TCP SYN packet where the Source IP and Port are forged to be identical to the Destination IP and Port, causing the server to connect to itself in an infinite loop.",
    explanation: "In 1997, the Land attack exploited an OS state machine bug: sending a packet from `192.168.1.1:80` to `192.168.1.1:80`. The receiving server created a socket, replied to itself with a SYN-ACK, processed its own SYN-ACK, and became trapped in an infinite handshake loop that locked the CPU at 100%. Modern firewalls drop packets where `Source IP == Destination IP`.",
    hint: "Handing someone a phone where both ends of the line are plugged into their own ear.",
    level: "moderate",
    codeExample: `// Land Attack Packet Header:
// Source IP: 192.168.1.50, Source Port: 80
// Dest IP  : 192.168.1.50, Dest Port  : 80 [IDENTICAL!]
// Defense  : Firewall rule dropping packets where src_ip == dst_ip`
  },
  {
    question: "Under Section 66 of the IT Act 2000, what constitutes the legal threshold for criminal Denial of Service prosecution?",
    shortAnswer: "Dishonestly or fraudulently diminishing the value or utility of computer resources or destroying/altering information, punishable with imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes actions listed under Section 43: 'If any person, dishonestly or fraudulently, does any act which diminishes the value or utility of information or affects it injuriously by any means... shall be punished with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees.'",
    hint: "Section 66 covers criminal penalties for launching DoS attacks that diminish computer utility.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66):
// Offense: Launching DoS/DDoS attacks taking corporate or academic servers offline
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "Synthesize the mathematical relationship between Botnet Size, Reflection Amplification, Line Capacity, and Packet Drop Probability in Anti-DDoS engineering.",
    shortAnswer: "Effective flood volume V = N_bots * R_out * AF; when V > C_link, the probability of legitimate packet loss is P_loss = (V - C_link) / V.",
    explanation: "If a botnet of $N = 50,000$ IoT devices transmits at $R = 2\\text{ Mbps}$ into Memcached reflectors with amplification $AF = 10,000$, the incoming volumetric tsunami is $V = 50,000 \\times 2\\text{ Mbps} \\times 10,000 = 1,000,000\\text{ Gbps} = 1\\text{ Petabit/sec}$. If the enterprise WAN link capacity is $C = 10\\text{ Gbps}$, the packet drop probability is $P = (1,000,000 - 10) / 1,000,000 = 99.999\\%$. Defeating this requires Anycast dispersion and BGP FlowSpec scrubbing at upstream transit tiers.",
    hint: "Understanding that when a flood is 100,000 times bigger than the pipe, 99.999% of all packets get lost unless upstream scrubbing is deployed.",
    level: "expert",
    codeExample: `// Volumetric Flood Mathematics:
// Inbound Volume = Bots x Egress_Rate x Amplification_Factor
// Loss Rate      = (Inbound_Volume - Link_Capacity) / Inbound_Volume
// Solution       = Disperse across Anycast PoPs + Drop via Upstream BGP FlowSpec`
  }
];

export default questions;
