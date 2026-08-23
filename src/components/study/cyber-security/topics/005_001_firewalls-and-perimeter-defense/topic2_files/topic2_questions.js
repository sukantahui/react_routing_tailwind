const questions = [
  {
    id: 1,
    question: "What is a Stateless Packet Filtering Firewall and at what layers of the OSI model does it operate?",
    shortAnswer: "A first-generation firewall that inspects individual network packets in isolation at Layer 3 (Network) and Layer 4 (Transport) against a static rule base without maintaining connection state.",
    explanation: "Stateless packet filters evaluate each packet based purely on header fields (Source IP, Destination IP, Protocol, Source Port, Destination Port, TCP Flags). Because it does not track active connection sessions, every packet is treated as an independent event.",
    hint: "Inspects Layer 3 and Layer 4 headers without remembering previous packets.",
    level: "Basic",
    codeExample: `// 5-Tuple Inspection Fields:
// 1. Source IP
// 2. Destination IP
// 3. Protocol (TCP/UDP/ICMP)
// 4. Source Port
// 5. Destination Port`
  },
  {
    id: 2,
    question: "What comprises the classic '5-Tuple' evaluated by packet filtering firewalls?",
    shortAnswer: "1. Source IP Address; 2. Destination IP Address; 3. Transport Layer Protocol; 4. Source Port Number; 5. Destination Port Number.",
    explanation: "The 5-tuple uniquely identifies a unidirectional IP flow. Stateless packet filters match these five fields against an ordered list of Access Control List (ACL) rules to make instant permit or deny decisions.",
    hint: "Source IP, Destination IP, Protocol, Source Port, Destination Port.",
    level: "Basic",
    codeExample: `// 5-Tuple Structure:
const packetTuple = {
  srcIp: "198.51.100.25",
  dstIp: "172.16.1.10",
  protocol: "TCP",
  srcPort: 51200,
  dstPort: 443
};`
  },
  {
    id: 3,
    question: "What is the 'TCP ACK Spoofing' / 'Established Flag Bypass' vulnerability in stateless packet filters?",
    shortAnswer: "An attacker crafts an unsolicited packet with the TCP ACK flag bit set; because stateless filters use rules allowing incoming packets with ACK=1 (assuming they are reply traffic), the unsolicited packet passes through.",
    explanation: "To allow internal clients to receive replies from web servers, stateless rules permit inbound packets where `ACK=1`. Attackers exploit this by sending probing packets with `ACK=1` from the outside; the stateless filter cannot verify whether an outbound SYN was ever sent and allows the packet into the internal network.",
    hint: "Setting the ACK bit tricks the stateless filter into thinking the packet is an approved reply.",
    level: "Moderate",
    codeExample: `// Scapy TCP ACK Spoofing Attack:
// from scapy.all import IP, TCP, send
// pkt = IP(dst="10.10.1.50")/TCP(dport=22, flags="A") # Injects ACK=1 without 3-way handshake!
// send(pkt) # Bypasses stateless 'established' filter rule!`
  },
  {
    id: 4,
    question: "How does the Cisco IOS ACL keyword 'established' operate in stateless packet filtering?",
    shortAnswer: "The 'established' keyword matches TCP packets that have either the ACK (`0x10`) or RST (`0x04`) control flag bit set in the TCP header.",
    explanation: "In Cisco ACLs, `permit tcp any 10.10.1.0 0.0.0.255 established` checks if the packet has `ACK=1` or `RST=1`. While it prevents unsolicited inbound `SYN` packets, it is vulnerable to attackers forging ACK packets to scan internal ports behind the router.",
    hint: "Matches if ACK or RST bits are set in the TCP header.",
    level: "Moderate",
    codeExample: `// Cisco Extended ACL:
// access-list 101 permit tcp any host 172.16.1.10 eq 443
// access-list 101 permit tcp any 10.10.1.0 0.0.0.255 established
// access-list 101 deny ip any any`
  },
  {
    id: 5,
    question: "Why do stateless packet filters achieve extremely high packet processing speeds (line rate) compared to stateful firewalls?",
    shortAnswer: "They perform simple static bitmask lookups on header bytes without allocating memory structures, maintaining hash tables, or tracking session timers.",
    explanation: "Because stateless filtering does not write to connection state tables (`conntrack`), it avoids lock contention and memory lookup overhead. In hardware screening routers, stateless ACLs execute in parallel in a single clock cycle using Ternary Content-Addressable Memory (TCAM).",
    hint: "No state tables, no memory allocations, simple static bitmask checks in hardware.",
    level: "Basic",
    codeExample: `// Processing Latency Comparison:
// Stateless Packet Filter : ~1 nanosecond (Hardware TCAM)
// Stateful Firewall (SPI) : ~50-200 nanoseconds (conntrack hash lookup)
// Next-Gen Firewall (DPI) : ~500-2000 nanoseconds (Layer 7 regex parsing)`
  },
  {
    id: 6,
    question: "What is Ternary Content-Addressable Memory (TCAM) and how is it used in high-speed hardware packet filtering?",
    shortAnswer: "A specialized high-speed memory architecture that evaluates an entire Access Control List (ACL) in parallel across all entries in a single clock cycle using three states: 0, 1, and 'Don't Care' (Wildcard).",
    explanation: "Traditional RAM takes a memory address and returns data (one entry per cycle). TCAM takes packet header fields (IP, port) and searches all 10,000 ACL rules simultaneously in one clock cycle, enabling border routers to filter packets at line rate (100 Gbps to 400 Gbps).",
    hint: "Parallel search memory that evaluates thousands of ACL rules in a single clock tick.",
    level: "Expert",
    codeExample: `// TCAM 3-State Matching:
// Rule: IP 192.168.1.0/24 -> TCAM Mask: 11000000.10101000.00000001.XXXXXXXX (X = Don't Care)`
  },
  {
    id: 7,
    question: "Why can stateless packet filters NOT secure protocols with dynamic secondary ports, such as Active FTP (File Transfer Protocol)?",
    shortAnswer: "Active FTP negotiates random high ephemeral ports (1024–65535) for data transfer inside Layer 7 payload commands (`PORT`), which stateless filters cannot inspect or track dynamically.",
    explanation: "In Active FTP, the control session uses TCP port 21. When a client requests a file download, it sends a `PORT` command telling the server to connect back to a random port (e.g. 54231). Because a stateless filter cannot read the payload or open temporary dynamic pinholes, it must leave all high ports (1024-65535) open, creating a massive security vulnerability.",
    hint: "Stateless filters cannot read the control payload to dynamically open temporary data ports.",
    level: "Moderate",
    codeExample: `// Active FTP Port Dilemma:
// 1. Client connects to Server:21 (Control channel - Allowed)
// 2. Client sends: "PORT 10,10,1,50,211,215" (Requests server connect back to port 54231)
// 3. Server connects to Client:54231 -> Stateless filter drops it unless ports 1024-65535 are open!`
  },
  {
    id: 8,
    question: "What is a 'Tiny Fragment Attack' and how does it exploit stateless packet filters?",
    shortAnswer: "An attacker fragments an IP packet so that the TCP header is split across two fragments; Fragment 1 contains only the IP header and partial TCP fields (without the destination port), causing naive filters to permit it.",
    explanation: "If the first fragment is only 28 bytes (20 bytes IP + 8 bytes TCP), the destination port resides in Fragment 2. A stateless filter that checks port numbers on Fragment 1 cannot see the destination port (e.g. port 22) and forwards the fragment. Modern firewalls defeat this by requiring minimum fragment sizes (e.g. at least 16 bytes Layer 4 header) or reassembling fragments.",
    hint: "Splitting the header so the destination port is pushed into the second fragment.",
    level: "Expert",
    codeExample: `// Tiny Fragment Structure:
// Fragment 1: [IP Header: 20 bytes] + [TCP Src Port + Seq Num: 8 bytes] (NO Dst Port!)
// Fragment 2: [TCP Dst Port: 2 bytes] + [TCP Flags: 2 bytes] + [Payload]`
  },
  {
    id: 9,
    question: "What is an 'Overlapping Fragment Attack' (Teardrop / Rose Attack) and how do firewalls mitigate it?",
    shortAnswer: "Attackers send IP fragments with overlapping byte offset fields, attempting to overwrite verified header bytes with malicious payload data when the victim OS reassembles the packet.",
    explanation: "Fragment 1 passes the filter because it specifies a benign port (80). Fragment 2 has an offset that overlaps Fragment 1, overwriting the destination port in OS memory to port 22 (SSH). Firewalls mitigate this via Virtual Reassembly, normalizing fragments in firewall memory before evaluating rules.",
    hint: "Fragments that overlap in memory to overwrite previously approved header data.",
    level: "Expert",
    codeExample: `// Overlapping Fragment Offsets:
// Fragment 1: Offset = 0, Length = 100 bytes (Permitted port 80)
// Fragment 2: Offset = 80, Length = 100 bytes (Overwrites bytes 80-100 with exploit payload!)`
  },
  {
    id: 10,
    question: "In Linux iptables, how do you construct a purely stateless rule in the `raw` table that bypasses `conntrack`?",
    shortAnswer: "By targeting the `NOTRACK` (or `CT --notrack`) target inside the `PREROUTING` or `OUTPUT` chains of the `raw` table.",
    explanation: "To achieve ultra-high throughput and prevent conntrack table exhaustion during high-volume traffic (e.g. DNS root servers or 10 Gbps video streaming), administrators use `iptables -t raw -A PREROUTING -p udp --dport 53 -j NOTRACK`, bypassing stateful connection tracking entirely.",
    hint: "Use `-j NOTRACK` in the `raw` table.",
    level: "Moderate",
    codeExample: `// Linux iptables Stateless Rule (Bypassing Conntrack):
// iptables -t raw -A PREROUTING -p tcp --dport 80 -j NOTRACK
// iptables -t raw -A OUTPUT -p tcp --sport 80 -j NOTRACK
// iptables -A FORWARD -p tcp --dport 80 -j ACCEPT`
  },
  {
    id: 11,
    question: "What is an 'ICMP Type and Code' filter and why should certain ICMP types be permitted through stateless packet filters?",
    shortAnswer: "ICMP rules filter control messages; while Echo Request (Type 8) is often blocked, Destination Unreachable (Type 3) and Fragmentation Needed (Type 3, Code 4) MUST be permitted for Path MTU Discovery (PMTUD) to function.",
    explanation: "If a firewall blindly drops all ICMP traffic, TCP connections with Path MTU Discovery will experience 'PMTUD Black Holes'—packets exceeding the MTU of an intermediate router are dropped, and the router's ICMP Type 3 Code 4 notification is blocked by the firewall, hanging the user's connection indefinitely.",
    hint: "Dropping ICMP Type 3 Code 4 breaks Path MTU Discovery, causing web pages to hang.",
    level: "Moderate",
    codeExample: `// Essential ICMP Filtering Rules:
// permit icmp any any echo-reply          # Type 0
// permit icmp any any unreachable         # Type 3 (Essential for PMTUD!)
// permit icmp any any time-exceeded       # Type 11 (Traceroute)
// deny   icmp any any echo                # Type 8 (Blocks ping sweep recon)`
  },
  {
    id: 12,
    question: "What is the difference between a Standard Access Control List (ACL) and an Extended Access Control List (ACL)?",
    shortAnswer: "Standard ACLs filter traffic based solely on Source IP address, whereas Extended ACLs filter traffic based on Source IP, Destination IP, Protocol, and Port numbers.",
    explanation: "Standard ACLs (Cisco 1-99) only check where a packet came from; they must be placed as close to the destination as possible. Extended ACLs (Cisco 100-199) check source, destination, protocol, and port, allowing precise filtering close to the source.",
    hint: "Standard checks Source IP only; Extended checks Source IP, Destination IP, Protocol, and Port.",
    level: "Basic",
    codeExample: `// Standard vs Extended ACL:
// Standard ACL: access-list 10 permit 192.168.1.0 0.0.0.255
// Extended ACL: access-list 101 permit tcp 192.168.1.0 0.0.0.255 host 172.16.1.10 eq 443`
  },
  {
    id: 13,
    question: "Why can stateless packet filters NOT prevent Cross-Site Scripting (XSS) or SQL Injection (SQLi) attacks?",
    shortAnswer: "Stateless packet filters only inspect Layer 3/4 headers (IP and port numbers); they do not decode or inspect Layer 7 application payloads where SQLi and XSS attack strings reside.",
    explanation: "An SQL injection attack (e.g. `' OR 1=1 --`) travels inside a standard HTTP GET/POST request on TCP port 443. The stateless filter sees valid IP headers and destination port 443, matches the permit rule, and forwards the packet to the web server without reading the malicious payload.",
    hint: "Stateless filters check the envelope, not the letter inside.",
    level: "Basic",
    codeExample: `// Header vs Payload Reality:
// Layer 3/4 Header: Src=198.51.100.10, Dst=172.16.1.10, Port=443 (PERMITTED by Stateless Filter!)
// Layer 7 Payload : GET /login?user=admin' UNION SELECT password FROM users-- (EXPLOITS DB!)`
  },
  {
    id: 14,
    question: "What is 'IP Address Spoofing' and why does stateless filtering alone struggle to prevent it without uRPF?",
    shortAnswer: "An attacker inserts a fake, unauthorized source IP into the IP header; a stateless filter evaluating incoming packets cannot verify whether the sender legitimately owns that IP address.",
    explanation: "Because stateless filters evaluate packets in isolation, they assume the Source IP in the header is authentic. Without Unicast Reverse Path Forwarding (uRPF) or ingress bogon ACLs, an external attacker can send packets claiming to be from the internal corporate subnet (`10.10.1.50`), bypassing internal trust rules.",
    hint: "Writing a fake return address on an envelope.",
    level: "Moderate",
    codeExample: `// IP Spoofing Prevention via Edge Ingress ACL:
// Rule: Deny any incoming packet on WAN interface claiming to have internal source IP:
// access-list 110 deny ip 10.0.0.0 0.255.255.255 any (Drop spoofed internal IPs on WAN!)`
  },
  {
    id: 15,
    question: "What is an 'Implicit Deny' rule and where must it reside in a stateless packet filtering rule base?",
    shortAnswer: "An invisible or explicit final rule at the bottom of the rule base that automatically drops any packet that did not match any of the preceding permit rules.",
    explanation: "Firewall rule bases evaluate rules from top to bottom. If a packet does not match any permit rule, the Implicit Deny rule ensures that unapproved traffic is discarded by default, enforcing a default-deny security baseline.",
    hint: "The catch-all drop rule at the very bottom of the rule table.",
    level: "Basic",
    codeExample: `// Implicit Deny at Bottom of Rule Base:
// Rule 1: PERMIT TCP ANY -> 172.16.1.10:443
// Rule 2: PERMIT UDP ANY -> 172.16.1.20:53
// Rule 999: DENY IP ANY -> ANY (Implicit Deny Catch-All!)`
  },
  {
    id: 16,
    question: "What is the 'Rule Shadowing' error and how can an automated ACL audit tool detect it?",
    shortAnswer: "A configuration error where a broad rule located higher in the list matches all traffic intended for a narrower rule below it, making the narrower rule unreachable.",
    explanation: "Automated firewall audit tools (e.g. Nipper, FireMon) parse rule bases by building multi-dimensional geometric spaces of IP/port ranges. If Rule A's criteria completely enclose Rule B's criteria, the tool flags Rule B as 'Shadowed / Redundant'.",
    hint: "A broad rule above completely hides a specific rule below.",
    level: "Moderate",
    codeExample: `// Shadowed Rule Example:
// Rule 10: PERMIT TCP ANY -> 172.16.1.0/24 eq 80 (Allows entire subnet)
// Rule 20: DENY   TCP ANY -> host 172.16.1.50 eq 80 (SHADOWED! Never evaluated)`
  },
  {
    id: 17,
    question: "How does a stateless packet filter evaluate UDP traffic compared to TCP traffic?",
    shortAnswer: "Because UDP is connectionless and has no sequence numbers or control flags (SYN/ACK), stateless filters can only match on Source IP, Destination IP, Source Port, and Destination Port.",
    explanation: "TCP has control flags (SYN, ACK, FIN) that provide rudimentary directional hints. UDP has no handshake or flags; a stateless filter cannot distinguish an outbound DNS query from an inbound unsolicited DNS reflection flood packet targeting port 53.",
    hint: "UDP has no flags or handshakes, only 4 header fields (Src IP, Dst IP, Src Port, Dst Port).",
    level: "Basic",
    codeExample: `// UDP Stateless Filter Matching:
// Matches only: [Src IP: 198.51.100.10] [Dst IP: 172.16.1.20] [Proto: UDP] [Src Port: 53000] [Dst Port: 53]`
  },
  {
    id: 18,
    question: "What is a 'Land Attack' and how does a stateless packet filter detect and drop it?",
    shortAnswer: "A Denial of Service attack where a packet is crafted with identical Source IP/Port and Destination IP/Port, causing vulnerable operating systems to loop endlessly trying to reply to themselves.",
    explanation: "In a Land Attack, the packet has `Src IP = 192.168.1.10, Dst IP = 192.168.1.10, Src Port = 80, Dst Port = 80`. Stateless filters drop this by checking: `IF Packet.SrcIP == Packet.DstIP -> DROP`.",
    hint: "A packet where sender and receiver IP and port are identical.",
    level: "Moderate",
    codeExample: `// Land Attack Detection Rule:
// iptables -A INPUT -s 192.168.1.10 -d 192.168.1.10 -j DROP`
  },
  {
    id: 19,
    question: "What is 'Egress Port 25 Filtering' (Anti-Spam Filter) and why do ISPs enforce it statelessly at edge routers?",
    shortAnswer: "Blocking outbound TCP port 25 (SMTP) from residential and non-mail-server customer subnets to prevent infected botnet computers from sending millions of unsolicited spam emails directly to the Internet.",
    explanation: "ISPs configure stateless edge router ACLs: `deny tcp any any eq 25`. Only verified corporate mail servers with static IPs and Reverse DNS (PTR) records are granted exceptions, effectively shutting down distributed botnet spam engines.",
    hint: "Blocking outbound port 25 prevents compromised home computers from sending spam.",
    level: "Basic",
    codeExample: `// ISP Edge Egress Anti-Spam ACL:
// access-list 150 permit tcp host 203.0.113.25 any eq 25 (Authorized Corporate Mail Gateway)
// access-list 150 deny   tcp any any eq 25 (Drop all residential SMTP spam!)`
  },
  {
    id: 20,
    question: "What is 'Stateless BGP FlowSpec' and how does it mitigate distributed volumetric flood attacks in backbone networks?",
    shortAnswer: "An extension to Border Gateway Protocol (RFC 5575) that distributes stateless filtering rules (5-tuple matches) across hundreds of upstream provider routers within seconds to drop attack traffic at the ISP core.",
    explanation: "When a multi-gigabit NTP reflection flood (UDP port 123) targets an enterprise, border firewalls are overwhelmed. Using BGP FlowSpec, the enterprise router announces a stateless filter rule (`match udp src-port 123 dst-ip 203.0.113.10 -> action discard`) to upstream Tier-1 ISPs, dropping the attack inside the Internet backbone.",
    hint: "Distributing stateless drop rules to upstream ISP routers via BGP.",
    level: "Expert",
    codeExample: `// BGP FlowSpec Stateless Ingress Match:
// match { protocol udp; source-port 123; destination 203.0.113.10/32; } then { discard; }`
  },
  {
    id: 21,
    question: "What is 'Wildcard Masking' (Inverse Masking) in Cisco ACLs and how does it differ from a standard subnet mask?",
    shortAnswer: "A wildcard mask uses binary 0s to represent 'must match exactly' and binary 1s to represent 'ignore / wildcard bit' (the exact inverse of a subnet mask).",
    explanation: "In a subnet mask `255.255.255.0`, the 1s define the network. In a Cisco wildcard mask `0.0.0.255`, `0` means the corresponding bit in the IP must match, and `255` means any value (0-255) in the last octet is permitted.",
    hint: "0 means match exactly; 255 (or 1s) means ignore (wildcard).",
    level: "Basic",
    codeExample: `// Subnet Mask vs Wildcard Mask:
// Subnet Mask  : 255.255.255.0  (11111111.11111111.11111111.00000000)
// Wildcard Mask: 0.0.0.255      (00000000.00000000.00000000.11111111)`
  },
  {
    id: 22,
    question: "Why are stateless packet filters particularly vulnerable to 'SYN Flood' DoS attacks?",
    shortAnswer: "Stateless filters pass all valid TCP SYN packets matching permitted ports (e.g. 443) directly to the target server, overwhelming the server's TCP backlog queue and kernel memory.",
    explanation: "Because stateless filters do not track handshakes or implement SYN Cookies (RFC 4987), they cannot challenge or validate whether the external sender has a legitimate IP address. Millions of spoofed SYN packets pass through unimpeded, crashing the protected web server.",
    hint: "Stateless filters blindly forward all SYN packets matching open ports to the server.",
    level: "Moderate",
    codeExample: `// SYN Flood Behavior:
// Attacker sends 1,000,000 SYN packets with spoofed IPs to port 443
// Stateless Filter: Matches Rule 'PERMIT ANY -> 172.16.1.10:443' -> Forwards all 1,000,000 SYNs!
// Web Server: Kernel backlog queue overflows -> Server crashes!`
  },
  {
    id: 23,
    question: "How does a stateless filter process TCP FIN, RST, and NULL packet scans (e.g. Nmap `-sF`, `-sN`, `-sX`)?",
    shortAnswer: "If the filter only checks for SYN flags or permits established ACK traffic, unusual flag combinations (NULL, FIN, XMAS) may bypass naive filter rules and elicit responses from internal hosts, revealing open ports.",
    explanation: "RFC 793 states that closed ports reply with RST to non-SYN packets, while open ports silently drop them. Attackers send packets with no flags (NULL scan) or FIN+PSH+URG (XMAS scan). Naive stateless filters looking only for SYN packets allow these through, allowing attackers to map internal ports.",
    hint: "Unusual flag combinations bypass naive SYN-only filters.",
    level: "Moderate",
    codeExample: `// Nmap Stealth Scan Flags:
// NULL Scan : Flags = 0x00 (No flags set)
// XMAS Scan : Flags = 0x29 (FIN + PSH + URG set)
// FIN Scan  : Flags = 0x01 (FIN set)`
  },
  {
    id: 24,
    question: "What is 'Port 0' filtering and why should packets with Source Port 0 or Destination Port 0 always be dropped?",
    shortAnswer: "Port 0 is a reserved, invalid port number in TCP and UDP standards; legitimate traffic never uses port 0, and packets with port 0 are crafted by reconnaissance scanners or OS fingerprinting tools.",
    explanation: "In BSD and POSIX sockets, port 0 is reserved to request dynamic port assignment by the OS. A packet on the wire with `Port = 0` is an intentional anomaly designed to test how an operating system or firewall responds for OS fingerprinting. Stateless filters should always drop port 0.",
    hint: "Port 0 is an invalid port number used only in malicious reconnaissance.",
    level: "Basic",
    codeExample: `// Drop Port 0 Anomalies:
// iptables -A INPUT -p tcp --sport 0 -j DROP
// iptables -A INPUT -p tcp --dport 0 -j DROP
// iptables -A INPUT -p udp --sport 0 -j DROP`
  },
  {
    id: 25,
    question: "What is the role of stateless packet filtering in modern 'Hybrid Defense-in-Depth' architectures?",
    shortAnswer: "Stateless hardware ACLs act as the high-speed first line of defense at border routers to discard volumetric DDoS floods, bogons, and unapproved protocols before traffic reaches expensive stateful NGFWs.",
    explanation: "Stateful firewalls and WAFs have deep inspection capabilities but limited connection tracking capacity. By placing stateless hardware ACLs (TCAM) at the edge, organizations drop 80%+ of junk Internet noise at line rate (100 Gbps), preserving stateful firewall CPU for deep application inspection.",
    hint: "Coarse, high-speed filtering at the edge router to offload the stateful firewall.",
    level: "Moderate",
    codeExample: `// Hybrid Architecture:
// [Internet] ---> [Stateless Edge ACL (TCAM: 100 Gbps)] ---> [Stateful NGFW/WAF (Deep Inspection)] ---> [Protected LAN]`
  },
  {
    id: 26,
    question: "How does the `iptables` string matching extension differ from basic stateless packet filtering?",
    shortAnswer: "The string matching extension (`-m string`) inspects packet payload bytes using Boyer-Moore or Knuth-Morris-Pratt algorithms, crossing from Layer 4 into basic Layer 7 inspection.",
    explanation: "Standard stateless filters only inspect fixed-length Layer 3/4 headers. The string extension allows iptables to search the variable payload for byte patterns (e.g. `iptables -A INPUT -m string --algo bm --string 'cmd.exe' -j DROP`), providing lightweight payload inspection without a full application proxy.",
    hint: "Searching packet payload bytes for specific string patterns.",
    level: "Expert",
    codeExample: `// iptables String Matching Rule:
// iptables -A FORWARD -p tcp --dport 80 -m string --algo bm --string "UNION SELECT" -j DROP`
  },
  {
    id: 27,
    question: "What is 'Smurf Attack' amplification and how does a stateless packet filter at the perimeter defeat it?",
    shortAnswer: "An attacker sends ICMP Echo Requests with a spoofed victim source IP to a subnet's broadcast address; stateless edge filters defeat it by blocking directed broadcast packets (`no ip directed-broadcast`).",
    explanation: "In a Smurf attack, sending 1 ICMP packet to a `/24` broadcast address causes 254 hosts to send ICMP Echo Replies to the victim. Disabling directed broadcasts at the router prevents external packets from triggering amplified broadcast reflections.",
    hint: "Disabling directed broadcast prevents sending packets to an entire subnet at once.",
    level: "Moderate",
    codeExample: `// Cisco Router Smurf Attack Prevention:
// interface GigabitEthernet0/0
//  no ip directed-broadcast`
  },
  {
    id: 28,
    question: "Why is stateless packet filtering insufficient for securing Remote Desktop Protocol (RDP - Port 3389) and SSH (Port 22)?",
    shortAnswer: "A stateless filter only verifies the port number (22/3389); it cannot enforce multi-factor authentication (MFA), detect brute-force password guessing, or inspect encrypted payload sessions.",
    explanation: "If a stateless rule permits port 22, an attacker can launch thousands of dictionary attacks against SSH or exploit unpatched OpenSSH vulnerabilities. Modern perimeter defense requires application-level bastion gateways with MFA, rate limiting, and behavioral intrusion prevention.",
    hint: "Stateless filters open the door based on port number but cannot verify passwords or MFA.",
    level: "Basic",
    codeExample: `// Stateless Limitation on Port 22:
// Rule: PERMIT ANY -> 192.168.1.5:22 (Allows attacker to attempt 100,000 password guesses!)`
  },
  {
    id: 29,
    question: "How does an enterprise calculate the rule processing efficiency and hit count of stateless ACLs?",
    shortAnswer: "By monitoring packet counters on each rule; placing the highest-frequency matching rules (e.g. high-volume HTTPS) at the top of the ACL minimizes the average number of rule evaluations per packet.",
    explanation: "In software-based packet filters evaluating rules in O(N) linear time, placing a rule that matches 90% of traffic on Line 1 ensures 90% of packets exit after 1 comparison. If the popular rule is on Line 50, every packet requires 50 comparisons, increasing CPU utilization by 50x.",
    hint: "Place the most frequently matched rules at the top to minimize CPU comparisons.",
    level: "Moderate",
    codeExample: `// Rule Optimization by Traffic Frequency:
// Top: Rule 1: PERMIT HTTPS (90% of traffic) -> Evaluated in 1 comparison!
// Mid: Rule 2: PERMIT DNS (8% of traffic)
// Bot: Rule 3: PERMIT SSH (2% of traffic)`
  },
  {
    id: 30,
    question: "Summarize the overarching lessons regarding Stateless Packet Filtering for cybersecurity engineers in West Bengal.",
    shortAnswer: "Stateless packet filtering provides lightning-fast 5-tuple header mediation at border routers, but its vulnerability to ACK spoofing, fragmentation, and application exploits necessitates pairing it with stateful inspection (SPI) and WAFs in a Defense-in-Depth architecture.",
    explanation: "Stateless filters are the high-speed workhorses of perimeter routing, excellent for line-rate volumetric dropping and Bogon filtering. However, securing enterprise applications requires moving beyond stateless headers to stateful session tracking and Layer 7 deep packet inspection.",
    hint: "Lightning fast line-rate filtering, but must be paired with stateful inspection for complete security.",
    level: "Moderate",
    codeExample: `// The Stateless Golden Rule:
// Use Stateless ACLs for High-Speed Boundary Dropping + Use Stateful SPI & WAF for Deep Inspection`
  }
];

export default questions;
