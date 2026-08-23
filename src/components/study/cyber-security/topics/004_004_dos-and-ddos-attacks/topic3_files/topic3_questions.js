const questions = [
  {
    question: "What is a Network Protocol DDoS Attack, and what primary metric is used to measure its intensity?",
    shortAnswer: "A DDoS attack designed to exhaust the state tables, connection tracking buffers, and processing capacity of network infrastructure and operating systems, measured in Packets Per Second (PPS or Millions of PPS - Mpps).",
    explanation: "While Volumetric attacks target bandwidth (Gbps), Network Protocol attacks target stateful processing limits (Mpps). Even if the bandwidth is only 2 Gbps, a flood of 35 Million PPS overwhelms the stateful connection tracking tables (`conntrack`) of firewalls, load balancers, and operating system TCP stacks, causing them to drop all legitimate connections.",
    hint: "Swamping a hotel check-in desk with 50,000 reservation cards per minute so the receptionist cannot help real guests.",
    level: "basic",
    codeExample: `// Protocol DDoS Metrics:
// Traffic Magnitude   : Measured in Packets Per Second (PPS) or Million PPS (Mpps)
// Primary Target      : Stateful Firewall Connection Tables (conntrack) & TCP Backlog Queues
// Key Exploit Vectors : TCP SYN Flood, Smurf ICMP Broadcast, ACK Floods`
  },
  {
    question: "How does a TCP SYN Flood exploit the TCP Three-Way Handshake to exhaust Server Memory?",
    shortAnswer: "The attacker sends thousands of TCP SYN packets with spoofed Source IPs and never returns the final ACK; the server allocates memory in its SYN Backlog queue for each half-open connection until the queue is completely full, rejecting all new legitimate connections.",
    explanation: "TCP establishes connections via SYN ➔ SYN-ACK ➔ ACK. When a SYN arrives, the server allocates a Transmission Control Block (TCB) in memory and sends a SYN-ACK to the spoofed IP. The server waits for the final ACK (with a default 75-second timeout). An attacker sending 50,000 SYN packets per second fills the server's SYN Backlog within milliseconds, locking out all legitimate users in Kolkata.",
    hint: "Calling a bakery to order 500 custom cakes with fake phone numbers, forcing the bakery to bake and hold all cakes so they cannot take orders from real customers.",
    level: "basic",
    codeExample: `// TCP SYN Flood Three-Way Handshake Exhaustion:
// 1. Attacker ➔ [SYN (Seq=100)] ➔ Server allocates Transmission Control Block (TCB)
// 2. Server   ➔ [SYN-ACK (Seq=500, Ack=101)] ➔ Sent to Fake Spoofed IP (No reply ever arrives!)
// 3. Server Backlog Queue fills: [TCB1][TCB2]...[TCB_MAX] ➔ Subsequent legitimate SYNs DROPPED!`
  },
  {
    question: "What is a 'Smurf Attack', and how does it use ICMP Directed Broadcast Amplification?",
    shortAnswer: "The attacker sends ICMP Echo Request (ping) packets with the Source IP spoofed to match the victim's address to the broadcast address of an unconfigured intermediary network, causing every active host on that subnet to flood the victim with ICMP Echo Replies.",
    explanation: "The attacker sends 1 ping packet to `192.168.1.255` (broadcast) with `Source IP: 103.25.10.50` (victim). If there are 250 active workstations on that subnet, all 250 workstations simultaneously reply to the victim. The attacker achieves a 250x amplification factor. Modern routers defeat this by disabling directed broadcast forwarding (`no ip directed-broadcast`).",
    hint: "Shouting someone else's name through a megaphone into a crowded stadium so everyone shouts back at that one person.",
    level: "moderate",
    codeExample: `// Smurf Broadcast Amplification:
// Attacker sends : 1 ICMP Request to Broadcast IP (10.0.0.255) with Source = Victim IP
// 250 Hosts reply: 250 ICMP Echo Replies flood Victim IP (250x Amplification!)
// Router Mitigation: Cisco IOS "no ip directed-broadcast"`
  },
  {
    question: "How does the 'Fraggle Attack' differ from the Smurf Attack?",
    shortAnswer: "Smurf uses ICMP Echo packets on network broadcasts; Fraggle uses UDP packets sent to UDP port 7 (Echo) or port 19 (Chargen) on broadcast networks to generate amplification loops.",
    explanation: "Fraggle is the UDP counterpart of the ICMP Smurf attack. Attackers send spoofed UDP packets to port 7 (Echo service) on a broadcast address. Every machine on the network replies with a UDP packet to the victim. If the victim also runs an echo service, an infinite packet loop is established between the victim and the amplifiers, saturating the network.",
    hint: "The UDP counterpart to the Smurf broadcast attack.",
    level: "moderate",
    codeExample: `// Fraggle Attack UDP Loop:
// Attacker sends : UDP Packet to 10.0.0.255:7 (Echo) with Source IP = Victim:7
// Intermediaries : All respond to Victim:7
// Victim         : Responds back to Intermediaries:7 ➔ INFINITE BANDWIDTH FLOOD LOOP!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the penalty for a Protocol DDoS Attack targeting Critical National Infrastructure?",
    shortAnswer: "Launching a protocol DDoS flood that paralyzes critical infrastructure (power grid SCADA, railway signaling, financial switches) to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary uses a 50 Million PPS SYN flood to paralyze the 220kV power transmission control network in Barrackpore or core banking settlement switches in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism protocol DDoS attacks.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Paralyzing state electrical grid telemetry routers with 50 Mpps SYN floods
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'State Table Exhaustion' in Stateful Firewalls during TCP SYN and ACK Floods?",
    shortAnswer: "Overwhelming the firewall's connection tracking table (`conntrack`) with millions of embryonic half-open TCP states until kernel memory is exhausted, causing the firewall to drop all subsequent legitimate connection attempts.",
    explanation: "Stateful firewalls track the state of every TCP connection in memory (`NEW`, `ESTABLISHED`). In a SYN flood, every spoofed SYN creates a `NEW` state entry in the firewall's `conntrack` table. Once the table reaches its maximum limit (`nf_conntrack_max = 2000000`), the firewall runs out of memory and logs 'nf_conntrack: table full, dropping packet', dropping all legitimate customer web traffic.",
    hint: "A hotel guest registry book completely filled with fake reservations so real guests are turned away at the door.",
    level: "expert",
    codeExample: `# Linux Firewall Conntrack Diagnostics:
# View current tracked connections:
cat /proc/sys/net/netfilter/nf_conntrack_count
# View maximum limit:
cat /proc/sys/net/netfilter/nf_conntrack_max
# When count >= max ➔ Firewall drops all new packets!`
  },
  {
    question: "What is a 'TCP ACK Flood', and how does it force Firewalls to perform Expensive State Table Lookups?",
    shortAnswer: "Sending high volumes of spoofed TCP ACK packets that do not belong to any existing connection; stateful firewalls must search their entire state table for every packet, consuming CPU cycles before dropping the packet.",
    explanation: "In an ACK flood, the attacker sends 30 Million ACK packets per second with random sequence numbers. The firewall must inspect its entire in-memory `conntrack` table to determine if the ACK matches an active TCP session. Finding no matching session, the firewall drops the packet or returns a TCP RST. The massive lookup overhead exhausts firewall CPU and memory bandwidth.",
    hint: "Handing a receptionist 30,000 receipt stubs per second, forcing them to check the entire guest database for each stub to see if it is real.",
    level: "expert",
    codeExample: `// TCP ACK Flood Firewall Behavior:
// Ingress: 30 Mpps TCP ACK packets (Seq=Random, Ack=Random)
// Firewall: Searches state table (O(1) hash lookup across 2,000,000 entries)
// Result: 30,000,000 hash lookups/sec ➔ 100% Firewall CPU Lockup!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise obligations for maintaining service availability during Protocol DDoS attacks?",
    shortAnswer: "Organizations must implement reasonable technical availability and resilience safeguards; persistent failure to maintain availability of citizen personal data services triggers statutory fines up to ₹250 Crores.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards against disruptions. If a major public utility or hospital network in West Bengal fails to deploy TCP SYN cookies or state table scaling, resulting in prolonged data access failure for citizens, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Maintaining continuous service availability is a mandatory technical safeguard under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent protocol resilience controls`
  },
  {
    question: "How do 'TCP SYN Proxies' Protect Backend Web Servers from Protocol SYN Floods?",
    shortAnswer: "An inline hardware proxy or load balancer intercepts all incoming SYN packets, completes the three-way handshake with the client independently (using SYN Cookies), and only initiates a backend TCP connection to the real server once the client sends a valid final ACK.",
    explanation: "The SYN Proxy sits between the internet and the web server. When a SYN arrives, the proxy responds with a SYN-ACK cookie without contacting the backend server. If the SYN was spoofed (from a botnet), no final ACK arrives, and the proxy drops the embryonic session with zero impact on the backend server. If a legitimate client returns the final ACK, the proxy opens a connection to the backend server and splices the two TCP streams.",
    hint: "A security guard at the entrance who conducts the full badge check outside before letting anyone walk into the building.",
    level: "expert",
    codeExample: `// TCP SYN Proxy Architecture:
// [Client / Bot] ➔ [SYN] ➔ [SYN Proxy (F5 / Nginx)] (Backend Server untouched!)
// [SYN Proxy] ➔ [SYN-ACK Cookie] ➔ [Client / Bot]
// If Valid ACK arrives: [SYN Proxy] ➔ Opens real TCP connection ➔ [Backend Server]
// If Spoofed SYN (No ACK): [SYN Proxy] drops session with ZERO backend memory allocation!`
  },
  {
    question: "What is a 'TCP RST Flood', and how can Attackers Tear Down Legitimate Active TCP Connections?",
    shortAnswer: "Flooding spoofed TCP RST (Reset) packets matching active client/server IP addresses and guessable sequence numbers within the TCP receive window, forcing endpoints to terminate valid sessions instantly.",
    explanation: "Under RFC 793, receiving a TCP packet with the RST flag set and a sequence number within the valid receive window causes the operating system to immediately abort the connection. Attackers sniff or guess TCP 4-tuples (`src_ip, src_port, dst_ip, dst_port`) and send RST packets, abruptly terminating active banking sessions or BGP routing neighbor peering sessions.",
    hint: "Shouting 'HANG UP THE PHONE' into a telephone line with a forged voice, causing both callers to disconnect.",
    level: "expert",
    codeExample: `// TCP RST Injection Attack:
// Target: Active BGP peering session between 103.25.10.1:179 and 103.25.10.2:179
// Attacker sends: Spoofed TCP packet with RST=1 and Seq within window
// Result: BGP session drops instantly ➔ Entire autonomous system loses internet routing!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Protocol DDoS attacks affecting Indian organizations?",
    shortAnswer: "All organizations in India must report protocol DDoS attacks affecting network infrastructure, routers, or firewalls to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including protocol DDoS attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of protocol network outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is a 'TCP SYN-ACK Reflection Flood', and why does it Bypass Ingress SYN Rate Limiters?",
    shortAnswer: "Attackers spoof the victim's IP address and send millions of SYN packets to legitimate third-party web servers worldwide; those servers reply with millions of unsolicited SYN-ACK packets directed at the victim, bypassing firewall rules that only inspect incoming SYN packets.",
    explanation: "Many perimeter firewalls rate-limit incoming SYN packets. In a SYN-ACK reflection attack, the victim receives zero SYN packets. Instead, millions of legitimate web servers (Google, Yahoo, Amazon) send unsolicited SYN-ACK packets to the victim. Because the packets have the SYN and ACK flags set, standard SYN filters allow them through, exhausting the victim's state table and bandwidth.",
    hint: "Sending millions of wedding invitations with someone else's return address so they receive millions of RSVP confirmation letters.",
    level: "expert",
    codeExample: `// SYN-ACK Reflection Attack Flow:
// 1. Attacker ➔ Sends SYN to 100,000 web servers worldwide with Source IP = Victim IP
// 2. 100,000 Servers ➔ Send SYN-ACK packets to Victim IP
// 3. Victim Firewall ➔ Standard SYN rate limiters do not trigger because packets are SYN-ACK!
// 4. Mitigation       ➔ Ingress firewall drops SYN-ACKs with no matching outbound SYN in state table!`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching protocol SYN or Smurf floods?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes protocol denial of service: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching a 40 Mpps SYN flood that takes down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Cisco IOS no ip directed-broadcast', and why is it Mandatory on All Modern Enterprise Border Routers?",
    shortAnswer: "A router configuration command that prevents the router from forwarding IP packets destined for subnet broadcast addresses (e.g. `192.168.1.255`), completely neutralizing Smurf ICMP broadcast amplification attacks.",
    explanation: "By default, early IP routers forwarded packets addressed to broadcast addresses. If an attacker sent a packet to `10.0.0.255`, the router exploded that 1 packet into 250 broadcast frames across the local Ethernet segment. Configuring `no ip directed-broadcast` instructs the router to drop any packet addressed to a subnet broadcast address arriving on an external interface.",
    hint: "Telling the mail carrier not to deliver letters addressed to 'EVERYONE IN THIS BUILDING'.",
    level: "moderate",
    codeExample: `// Cisco Router Smurf Defense Configuration:
interface GigabitEthernet0/0
 ip address 103.25.10.1 255.255.255.0
 no ip directed-broadcast
// Result: Dropping directed broadcast packets ➔ Smurf amplification neutralized!`
  },
  {
    question: "How does the 'Transmission Control Block' (TCB) Memory Footprint contribute to Operating System RAM Exhaustion during SYN Floods?",
    shortAnswer: "Every half-open TCP connection allocates a TCB structure in kernel memory (typically 280 to 500 bytes); a flood of 1,000,000 half-open connections consumes ~500MB of unpageable kernel RAM, starving other OS processes.",
    explanation: "A TCB holds socket timers, sequence numbers, window sizes, and IP/port tuples. Because TCBs reside in non-pageable kernel heap memory, an attacker opening 1,000,000 half-open connections forces the operating system to consume 500MB of pinned kernel memory. Once the kernel's slab allocator runs out of memory, the system panics or terminates network daemons.",
    hint: "Setting aside a physical desk and computer for every job applicant before they even show up for the interview.",
    level: "expert",
    codeExample: `// Linux Kernel TCB Structure Size:
// struct tcp_sock = ~480 Bytes
// 1,000,000 Half-Open Connections = 480 MB of non-pageable kernel RAM!
// Solution: TCP SYN Cookies encode state in ISN ➔ 0 Bytes RAM Allocated!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for launching protocol DDoS attacks against corporate servers?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Flooding an online banking portal with 35 Mpps SYN packets to disrupt services
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Embryonic Connection Dropping' in Next-Gen Firewalls (Palo Alto / Fortinet)?",
    shortAnswer: "A firewall feature that monitors the number of embryonic (half-open) TCP connections; when embryonic sessions exceed a configured threshold, the firewall aggressively drops the oldest embryonic connections or activates SYN cookies.",
    explanation: "An embryonic connection is a session in the `SYN_SENT` or `SYN_RECV` state that has not completed the three-way handshake. Firewalls allow administrators to set thresholds: `embryonic-limit = 1000`. If an attacker floods SYN packets, once active embryonic sessions hit 1,000, the firewall starts discarding the oldest embryonic connections within milliseconds, preserving state table memory for new connections.",
    hint: "A restaurant hostess who gives people standing in line 60 seconds to claim a table before giving the table to the next person.",
    level: "moderate",
    codeExample: `// Palo Alto / Cisco ASA Embryonic Connection Policy:
policy-map global_policy
 class tcp_attack_traffic
  set connection embryonic-conn-max 5000 per-client-embryonic-max 100
// Result: Drops embryonic connections exceeding 100 per IP within 5 seconds!`
  },
  {
    question: "Synthesize an enterprise-scale Network Protocol DDoS Defense Architecture.",
    shortAnswer: "A multi-layered system combining Hardware SYN Proxies, Linux Kernel TCP SYN Cookies (`tcp_syncookies = 1`), Scaled Conntrack State Tables (`nf_conntrack_max = 2097152`), Border Router `no ip directed-broadcast`, and BGP Flowspec (RFC 5575) rate limits.",
    explanation: "To achieve complete immunity against multi-million PPS protocol attacks: 1. Perimeter Tier: Cisco/Juniper border routers configured with `no ip directed-broadcast` (neutralizing Smurf/Fraggle attacks). 2. Scrubbing Tier: Hardware SYN Proxies completing handshakes with clients before touching backend servers. 3. Firewall Tier: Stateful conntrack scaling to 2,000,000 entries with strict embryonic drop limits. 4. Kernel Tier: Linux TCP stack tuning enabling SYN Cookies (`tcp_syncookies = 1`), reducing `tcp_synack_retries = 2`. 5. Application Tier: Reverse proxy connection pooling with short keepalive timers.",
    hint: "Combine hardware SYN proxies, kernel TCP SYN cookies, scaled conntrack tables, and border router broadcast drops.",
    level: "expert",
    codeExample: `// Master Protocol DDoS Defense Blueprint:
// 1. Router Layer   : Cisco IOS "no ip directed-broadcast" (Neutralizes Smurf & Fraggle)
// 2. Hardware Layer : F5 / A10 Hardware SYN Proxy validating initial 3-way handshakes
// 3. Firewall Layer : Scaled Conntrack (net.netfilter.nf_conntrack_max = 2097152)
// 4. Kernel Layer   : Linux TCP Tuning (net.ipv4.tcp_syncookies = 1, net.ipv4.tcp_synack_retries = 2)
// 5. App Layer      : Nginx epoll event-driven non-blocking socket handling`
  },
  {
    question: "What is 'TCP SYN-ACK Retry Tuning' (tcp_synack_retries) in Linux Kernel Hardening?",
    shortAnswer: "Reducing the number of times the Linux kernel will re-transmit a SYN-ACK packet to a non-responsive client before terminating the embryonic connection, freeing the half-open backlog slot faster.",
    explanation: "By default, Linux retries sending SYN-ACK packets 5 times (waiting up to 75 seconds per dead connection). During a SYN flood, holding dead connections for 75 seconds rapidly fills the SYN backlog. Hardening `net.ipv4.tcp_synack_retries = 2` reduces the embryonic connection timeout to ~7 seconds, clearing dead half-open slots 10x faster.",
    hint: "Calling a customer twice to confirm a reservation instead of calling 5 times across 2 hours, freeing the reservation slot much faster.",
    level: "moderate",
    codeExample: `# Linux SYN-ACK Retry Hardening:
sysctl -w net.ipv4.tcp_synack_retries=2
# Reduces half-open connection hold time from 75s to ~7s!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Protocol DDoS Floods?",
    shortAnswer: "Intentionally causing damage or disruption to computer systems that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker launches a 35 Mpps TCP SYN flood that crashes stateful firewalls and takes online government examination portals offline in West Bengal, the act diminishes the utility of electronic property, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally crashing corporate firewalls via TCP SYN flooding (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is a 'TCP Window Size Zero Flood' (Sockstress Attack)?",
    shortAnswer: "Completing the TCP three-way handshake and immediately sending a TCP packet with `Window Size = 0`, forcing the server to keep the connection open in memory while constantly sending zero-window probe packets.",
    explanation: "In a Sockstress attack, the attacker establishes a valid TCP connection, bypassing SYN cookie defenses. Once connected, the attacker sets the TCP Window Size to 0, advertising that the client has zero buffer space to receive data. The server holds the connection open, keeping the thread and socket buffer in memory for hours while periodically sending zero-window probes to check if the client is ready.",
    hint: "Walking into a store, ordering 100 items, and telling the cashier 'Wait, I have no room in my cart right now, keep everything on the counter for 2 hours.'",
    level: "expert",
    codeExample: `// Sockstress / Zero-Window Attack Header:
// TCP Three-Way Handshake Completed!
// Client sends: TCP Data Request (GET /large_file.iso)
// Client sets : TCP.window_size = 0
// Server OS   : Holds 64KB socket buffer in RAM and transmits periodic Window Probes for hours!`
  },
  {
    question: "What is 'ICMP Source Quench Deprecation' (RFC 6633), and why was it Deprecated due to DoS Vulnerabilities?",
    shortAnswer: "ICMP Source Quench (Type 4) requested senders to reduce transmission speeds; attackers spoofed Source Quench packets targeting servers to artificially throttle their transmission rates to zero, leading to complete protocol deprecation in RFC 6633.",
    explanation: "ICMP Type 4 was designed as an early congestion control mechanism. An attacker could spoof an ICMP Source Quench packet with `Source IP: Gateway, Dest IP: Server`. The server, believing the network was congested, would drastically reduce its TCP transmission window, throttling legitimate downloads to near zero without requiring high attacker bandwidth.",
    hint: "A prankster blowing a fake whistle on a racetrack to make all the runners stop running.",
    level: "moderate",
    codeExample: `// Deprecated ICMP Source Quench (RFC 6633):
// Attacker sends : ICMP Type 4 (Source Quench) to Server IP
// Server Stack   : Throttles TCP window size to minimum ➔ Legitimate throughput drops to 0 Kbps!
// Fix            : RFC 6633 officially deprecated ICMP Type 4; modern kernels ignore it completely.`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for Protocol DDoS Floods targeting 'Protected Systems' (Critical Information Infrastructure)?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching a protocol SYN flood that denies access to a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Flooding SCADA stateful gateway firewalls with 40 Mpps SYN packets
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'TCP Fast Open (TFO) Exploitation' in Protocol DDoS Attacks?",
    shortAnswer: "Abusing TCP Fast Open (RFC 7413) cookies to send data in the initial SYN packet, forcing the server to process application data and query databases before completing the three-way handshake.",
    explanation: "TCP Fast Open allows clients with a cryptographic TFO cookie to include HTTP request data inside the initial SYN packet, saving one round-trip time. Attackers who obtain valid TFO cookies flood SYN packets containing heavy SQL search requests. The server processes the expensive query immediately upon receiving the SYN, combining SYN flood state exhaustion with application-layer CPU starvation.",
    hint: "Handing in your completed exam paper along with your application form so the teacher has to grade it before you are even enrolled.",
    level: "expert",
    codeExample: `// TCP Fast Open (TFO) Packet Structure:
// SYN Packet [Seq=100, Flags=SYN, TCP_Option_TFO_Cookie=Valid]
// Payload: "GET /api/search?q=pan_database HTTP/1.1\\r\\n..."
// Target Server: Executes expensive database search BEFORE completing TCP Handshake!`
  },
  {
    question: "How does 'Reverse Path Forwarding' (uRPF / BCP 38) Prevent Spoofed Source IP Protocol Floods?",
    shortAnswer: "The router checks the Source IP of incoming packets against its FIB routing table; if the interface the packet arrived on is not the best reverse path to reach that Source IP, the packet is dropped immediately.",
    explanation: "In Strict uRPF, when a packet arrives with `Source IP: 103.25.10.50` on interface `GigabitEthernet0/1`, the router queries its routing table. If the route to `103.25.10.50` points out of `GigabitEthernet0/2` instead, the router knows the Source IP is forged and drops the packet. This stops attackers from sending spoofed SYN or Smurf packets across ISP boundaries.",
    hint: "A bouncer checking if the return address on your ID matches the direction you just walked in from.",
    level: "expert",
    codeExample: `// Cisco IOS Strict uRPF Configuration:
interface GigabitEthernet0/1
 ip verify unicast source reachable-via rx
// Result: Drops spoofed IP packets where incoming interface != routing table reverse path!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Protocol DoS Extortion?",
    shortAnswer: "Threatening to launch or maintain a protocol SYN or ACK flood unless company leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a corporate firewall with 30 Mpps of TCP SYN packets and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹30 Lakhs in cryptocurrency under threat of continuing a 40 Mpps SYN flood
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'TCP SYN-ACK Amplification' in Misconfigured Reflection Servers?",
    shortAnswer: "When an attacker sends 1 spoofed SYN packet, the receiving server transmits a SYN-ACK and retries sending SYN-ACKs 3 to 5 times over 75 seconds, generating a 3x to 5x packet reflection amplification towards the victim.",
    explanation: "Because TCP is designed to be reliable, when a server sends a SYN-ACK and receives no response, its TCP stack re-transmits the SYN-ACK at increasing intervals (e.g. 1s, 2s, 4s, 8s, 16s). For 1 single SYN packet sent by the attacker, the reflection server fires 5 SYN-ACK packets at the victim, achieving packet-count amplification with zero custom amplification protocol.",
    hint: "Knocking on a door once, causing the resident to open the door and shout 'HELLO?' 5 separate times into the street.",
    level: "moderate",
    codeExample: `// SYN-ACK Retransmission Amplification:
// Attacker sends : 1 SYN Packet to Web Server (Source IP = Victim IP)
// Web Server fires:
//   - 00:00: SYN-ACK #1
//   - 00:01: SYN-ACK #2 (Retry)
//   - 00:03: SYN-ACK #3 (Retry)
//   - 00:07: SYN-ACK #4 (Retry)
//   - 00:15: SYN-ACK #5 (Retry) ➔ 5x Packet Amplification Flood directed at Victim!`
  },
  {
    question: "What is 'Conntrack Hash Bucket Collision' in Stateful Firewalls under Protocol Floods?",
    shortAnswer: "When millions of active connections hash into the same firewall hash table buckets, hash lookup time degrades from O(1) to O(N), locking firewall CPU cores in linked-list traversal loops.",
    explanation: "Linux `conntrack` uses a hash table: Bucket = Hash(Tuple) % conntrack_buckets. If `conntrack_buckets` is sized too small (e.g. 65,536 buckets) while `nf_conntrack_max` is 2,000,000, each bucket contains chains of 30+ linked entries. During an ACK flood, traversing these long linked lists for every incoming packet consumes 100% of CPU cache bandwidth, freezing firewall packet throughput.",
    hint: "Trying to organize 2,000,000 folders into only 10 filing cabinet drawers, making it take 10 minutes to find any single document.",
    level: "expert",
    codeExample: `# Scale Conntrack Hash Buckets in Linux:
# Formula: conntrack_buckets = nf_conntrack_max / 4
echo 524288 > /sys/module/nf_conntrack/parameters/hashsize
sysctl -w net.netfilter.nf_conntrack_max=2097152
# Ensures average hash chain length <= 4 entries ➔ Fast O(1) Lookups maintained!`
  },
  {
    question: "Synthesize the mathematical relationship between Active Embryonic SYN Ingress Rate (N_syn), Timeout Duration (T_timeout), Maximum Conntrack / SYN Backlog Capacity (S_max), and Legitimate TCP Connection Drop Probability (P_drop).",
    shortAnswer: "State table utilization is U = (N_syn * T_timeout) / S_max; connection drop probability is modeled as P_drop = 1 - e^(- max(0, U - 1.0) * 8); enabling TCP SYN Cookies (RFC 4987) eliminates memory allocation, ensuring P_drop = 0.0%.",
    explanation: "Let N_syn represent the rate of incoming spoofed SYN packets (e.g. 50,000 PPS), T_timeout represent the embryonic connection timeout (e.g. 75 seconds), and S_max represent the state table / backlog capacity (e.g. 2,000,000 entries). Total active state entries is N_active = N_syn * T_timeout = 50,000 * 75 = 3,750,000. Since 3,750,000 > 2,000,000, utilization U = 1.875 > 1.0. Drop probability is: P_drop = 1 - e^(-(1.875 - 1.0) * 8) = 1 - e^(-7.0) = 99.91%. Deploying TCP SYN Cookies eliminates state allocation (T_timeout = 0), keeping U = 0 and P_drop = 0.0%.",
    hint: "Mathematical formula proving that when active embryonic states exceed conntrack capacity, connection drop rate approaches 100%, and enabling SYN cookies reduces drop rate to 0%.",
    level: "expert",
    codeExample: `// Protocol State Saturation Mathematical Proof:
// Ingress SYN Flood = 50,000 PPS | Default Timeout = 75s | State Capacity = 2,000,000
// Active Embryonic States = 50,000 * 75 = 3,750,000 States (Exceeds 2M Limit!)
// Overload Ratio U = 3.75M / 2.0M = 1.875
// Drop Probability: P_drop = 1 - e^(- (1.875 - 1.0) * 8) = 1 - e^(-7.0) = 99.91% (COLLAPSE!)
// With SYN Cookies: State Allocation = 0 ➔ P_drop = 0.00% (IMMUNE!)`
  }
];

export default questions;
