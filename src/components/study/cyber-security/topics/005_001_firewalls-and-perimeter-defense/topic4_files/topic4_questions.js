const questions = [
  {
    id: 1,
    question: "What is a Stateful Packet Inspection (SPI) Firewall and how does it fundamentally differ from a Stateless Packet Filter?",
    shortAnswer: "An SPI firewall maintains an in-memory State Table (connection tracking table) to track the context, state, and bidirectional lifecycle of all active sessions, permitting return packets only if they belong to an established, valid session.",
    explanation: "Stateless filters inspect packets in isolation based on static header rules. An SPI firewall tracks the TCP 3-way handshake and session state machine; once an outbound connection is initiated, the firewall dynamically creates a temporary state table entry permitting incoming reply packets from the destination server.",
    hint: "Tracks active connections in memory and automatically allows valid replies without opening permanent inbound holes.",
    level: "Basic",
    codeExample: `// Stateful Connection Table Concept:
// Outbound: Client (10.10.1.50:51200) → Server (203.0.113.88:443) [State: NEW]
// Table Records: Expect Reply: Server (203.0.113.88:443) → Client (10.10.1.50:51200) [State: ESTABLISHED]`
  },
  {
    id: 2,
    question: "Who invented and patented Stateful Packet Inspection (SPI) and in what year?",
    shortAnswer: "Gil Shwed, founder of Check Point Software Technologies, in 1993 (US Patent 5,606,668).",
    explanation: "Gil Shwed developed FireWall-1 in 1993, introducing Stateful Packet Inspection. It revolutionized enterprise cybersecurity by inspecting packet headers in the context of previous connection history, eliminating the need to leave wide port ranges open for return traffic.",
    hint: "Gil Shwed / Check Point Software in 1993.",
    level: "Basic",
    codeExample: `// Historical Timeline:
// 1988: 1st Gen - Stateless Packet Filtering (DEC / AT&T Bell Labs)
// 1990: 2nd Gen - Application / Circuit Proxies (Gene Spafford / Marcus Ranum)
// 1993: 3rd Gen - Stateful Packet Inspection (Gil Shwed / Check Point FireWall-1)`
  },
  {
    id: 3,
    question: "What are the four primary connection states tracked in the Linux Netfilter `conntrack` subsystem?",
    shortAnswer: "1. `NEW` (initial handshake packet); 2. `ESTABLISHED` (active bidirectional session); 3. `RELATED` (secondary dynamic connection, e.g. FTP data channel); 4. `INVALID` (out-of-state or malformed packet).",
    explanation: "In `iptables` and `nftables`, the `conntrack` state engine assigns one of these states to every packet. For example, `iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT` permits return traffic while dropping unsolicited out-of-state packets.",
    hint: "NEW, ESTABLISHED, RELATED, and INVALID.",
    level: "Basic",
    codeExample: `// Canonical iptables Stateful Baseline Rule:
// iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
// iptables -A INPUT -m conntrack --ctstate INVALID -j DROP`
  },
  {
    id: 4,
    question: "How does Stateful Packet Inspection (SPI) completely eliminate the 'TCP ACK Spoofing' vulnerability present in stateless filters?",
    shortAnswer: "When an unsolicited packet with `ACK=1` arrives, the SPI firewall checks its State Table; because no prior outbound SYN handshake exists for that tuple, the packet is flagged as `INVALID` and discarded.",
    explanation: "Stateless filters permit any packet with `ACK=1` if the rule base contains an 'established' keyword. An SPI firewall verifies that the ACK packet corresponds to an active, registered session in kernel RAM. An external attacker's crafted ACK probe is dropped immediately with zero internal penetration.",
    hint: "The SPI firewall checks memory to verify if an outbound handshake was actually sent first.",
    level: "Moderate",
    codeExample: `// SPI ACK Validation Logic:
// IF Packet.Flags contains ACK:
//     IF Tuple(Packet.SrcIP, Packet.DstIP, Packet.Ports) in ConntrackTable:
//         ACCEPT Packet (Valid Established Flow)
//     ELSE:
//         DROP Packet (Unsolicited Injected ACK Probe!)`
  },
  {
    id: 5,
    question: "What is 'TCP Sequence Number Window Tracking' and how does it protect against TCP session hijacking?",
    shortAnswer: "The SPI firewall tracks the sequence and acknowledgment numbers negotiated during the handshake, dropping any injected packet whose sequence number falls outside the current sliding window.",
    explanation: "If an adversary attempts to inject a malicious command or RST packet into an active TCP session, the attacker must guess the exact 32-bit sequence number within the active window (`RCV.NXT <= Seq <= RCV.NXT + Window`). The firewall verifies window boundaries, preventing blind TCP reset and injection attacks.",
    hint: "Enforces valid sequence numbers within the active TCP sliding window.",
    level: "Expert",
    codeExample: `// TCP Window Validation:
// Valid Sequence Range: [Last_Acked_Seq] to [Last_Acked_Seq + Window_Size]
// Injected packet with Seq = 99999999 (Out of Window) → Dropped as INVALID!`
  },
  {
    id: 6,
    question: "How does an Application Layer Gateway (ALG) helper module (e.g. `nf_conntrack_ftp`) secure Active FTP dynamic data ports?",
    shortAnswer: "The ALG helper parses the FTP control session payload (`PORT` command), extracts the dynamically negotiated port number, and inserts a temporary, time-limited `RELATED` state entry allowing the server to connect back.",
    explanation: "In Active FTP, the server initiates a secondary data connection to a high port (e.g. 52140) chosen by the client. The ALG module snoops the control payload, identifies port 52140, and permits ONLY that single connection for 30 seconds, maintaining a strict default-deny posture on all other high ports.",
    hint: "Inspects the control payload to dynamically open a temporary pinhole for the data channel.",
    level: "Moderate",
    codeExample: `// Linux Kernel FTP ALG Loading:
// sudo modprobe nf_conntrack_ftp
// sudo modprobe nf_nat_ftp`
  },
  {
    id: 7,
    question: "What is a 'Conntrack Table Exhaustion Attack' (State Table Flooding) and why does it cause a Denial of Service?",
    shortAnswer: "An attacker floods millions of spoofed TCP SYN packets; the firewall allocates memory in the `conntrack` table for each SYN until reaching `nf_conntrack_max`, causing the kernel to drop all new legitimate connections.",
    explanation: "Each state table entry consumes ~320 bytes of kernel memory. A flood of 500,000 SYN packets with randomized source IPs fills a 500,000-entry conntrack table. When the table is full, the kernel outputs `nf_conntrack: table full, dropping packet`, causing a total Denial of Service.",
    hint: "Flooding so many connection requests that the firewall's state table memory runs out.",
    level: "Moderate",
    codeExample: `// Kernel Conntrack Error:
// [ 4521.890124] nf_conntrack: table full, dropping packet
// Legitimate user requests are dropped because no free table slots exist!`
  },
  {
    id: 8,
    question: "How do 'SYN Cookies' (RFC 4987) prevent state table exhaustion during high-volume SYN flood attacks?",
    shortAnswer: "The firewall stops allocating state table memory upon receiving a SYN; instead, it encodes connection parameters cryptographically into the 32-bit Initial Sequence Number (ISN). State is allocated ONLY when the client returns a valid ACK.",
    explanation: "When a SYN flood begins, `tcp_syncookies = 1` activates. The firewall sends a SYN+ACK containing a sequence number $Y = \text{Hash}(Src, Dst, Ports, Secret) + MSS$. Spoofed attacker IPs never send an ACK (so zero RAM is wasted). A legitimate client returns an ACK with $Y+1$; the firewall validates the cookie hash and allocates the state table entry.",
    hint: "Encoding session parameters into the sequence number so no memory is allocated until the final ACK arrives.",
    level: "Expert",
    codeExample: `// Linux SYN Cookie Activation:
// sudo sysctl -w net.ipv4.tcp_syncookies=1
// sudo sysctl -w net.netfilter.nf_conntrack_tcp_timeout_syn_recv=5`
  },
  {
    id: 9,
    question: "What is the bidirectional structure of a single Netfilter `conntrack` tuple?",
    shortAnswer: "It stores two 5-tuples: the 'Original' direction (Client to Server: Src IP, Dst IP, Protocol, Src Port, Dst Port) and the 'Reply' direction (Server to Client: Expected Src IP, Expected Dst IP, Protocol, Expected Src Port, Expected Dst Port).",
    explanation: "To handle state matching in both directions, Netfilter hashes both the original tuple and the expected reply tuple into its hash table. When a packet arrives in either direction, the kernel performs an O(1) hash lookup to find the corresponding session descriptor.",
    hint: "Stores two matching halves: Original Direction and Expected Reply Direction.",
    level: "Moderate",
    codeExample: `// Linux /proc/net/nf_conntrack Output:
// ipv4  2 tcp  6 431999 ESTABLISHED src=10.10.1.50 dst=203.0.113.88 sport=51200 dport=443 [ORIGINAL]
// src=203.0.113.88 dst=10.10.1.50 sport=443 dport=51200 [REPLY] [ASSURED] mark=0 use=2`
  },
  {
    id: 10,
    question: "What is the TCP State Transition sequence tracked by an SPI firewall during a standard 3-way handshake and connection teardown?",
    shortAnswer: "`SYN_SENT` → `SYN_RECV` → `ESTABLISHED` → `FIN_WAIT` → `CLOSE_WAIT` → `TIME_WAIT` → `CLOSED`.",
    explanation: "The firewall tracks each transition: Outbound SYN sets `SYN_SENT`. Inbound SYN+ACK transitions to `SYN_RECV`. Final ACK transitions to `ESTABLISHED` (with a 5-day idle timeout). When a FIN packet arrives, it transitions to `FIN_WAIT`, cleaning up the session memory after the 4-way teardown completes.",
    hint: "SYN_SENT → SYN_RECV → ESTABLISHED → FIN_WAIT → CLOSED.",
    level: "Basic",
    codeExample: `// State Transition Lifecycle:
// 1. Client sends SYN      → State: SYN_SENT (Timeout: 60s)
// 2. Server sends SYN+ACK  → State: SYN_RECV (Timeout: 30s)
// 3. Client sends ACK      → State: ESTABLISHED (Timeout: 432,000s / 5 days)
// 4. Either sends FIN      → State: FIN_WAIT (Timeout: 120s)`
  },
  {
    id: 11,
    question: "How does an SPI firewall track connectionless UDP traffic (e.g. DNS queries or NTP requests)?",
    shortAnswer: "By creating 'Pseudo-State' table entries with short inactivity timers (e.g. 30 seconds for DNS); an outbound UDP packet creates a state entry expecting a matching reply on the same IP and port.",
    explanation: "Although UDP has no handshakes or control flags, an SPI firewall treats UDP statefully: when an internal client queries `8.8.8.8:53` from port `52100`, the firewall opens a temporary state entry. When `8.8.8.8:53` replies to port `52100`, it matches the pseudo-state and is permitted. The entry expires in 30 seconds.",
    hint: "Creates a temporary pseudo-state entry with a short timeout timer.",
    level: "Basic",
    codeExample: `// UDP Conntrack Pseudo-State:
// Outbound: 10.10.1.50:52100 → 8.8.8.8:53 (UDP) [Timeout: 30s]
// Inbound : 8.8.8.8:53 → 10.10.1.50:52100 (UDP) → MATCHES STATE → Permitted!`
  },
  {
    id: 12,
    question: "How does an SPI firewall handle ICMP error messages (such as Destination Unreachable or Time Exceeded)?",
    shortAnswer: "The firewall parses the ICMP error payload, which contains the original IP header and 8 bytes of the Layer 4 header that caused the error, matching it as `RELATED` to an existing active session.",
    explanation: "RFC 792 dictates that ICMP error packets include the original packet's header in their data field. The SPI firewall extracts this inner header, looks up the original connection in the conntrack table, and permits the ICMP error as `RELATED` without opening general ICMP inbound holes.",
    hint: "Inspects the original packet header embedded inside the ICMP error message.",
    level: "Expert",
    codeExample: `// ICMP RELATED Matching:
// Router sends ICMP Type 3 Code 4 (Fragmentation Needed) containing inner header [10.10.1.50:51200 → 203.0.113.88:443]
// Firewall matches inner header against active conntrack entry → Action: ACCEPT (RELATED)`
  },
  {
    id: 13,
    question: "What is the memory consumption formula for sizing the Linux Netfilter `conntrack` table in enterprise data centers?",
    shortAnswer: "$\text{RAM Required} = \text{Conntrack Max Entries} \times (\text{sizeof}(\text{nf\_conntrack}) + \text{Hash Bucket Overhead}) \approx \text{Entries} \times 320\text{ bytes}$.",
    explanation: "For an enterprise supporting 2,000,000 concurrent connection entries: $2,000,000 \times 320\text{ bytes} \approx 640\text{ MB}$ of non-swappable kernel slab memory (`nf_conntrack_cachep`).",
    hint: "Multiply maximum entries by ~320 bytes per session.",
    level: "Moderate",
    codeExample: `// Sizing 2 Million Concurrent Connections:
const entries = 2000000;
const bytesPerEntry = 320;
const ramMB = (entries * bytesPerEntry) / (1024 * 1024); // ~610 MB Kernel RAM`
  },
  {
    id: 14,
    question: "What is the difference between `nf_conntrack_max` and `nf_conntrack_buckets` (hash table size)?",
    shortAnswer: "`nf_conntrack_max` is the total maximum number of sessions allowed; `nf_conntrack_buckets` is the number of hash table buckets. The recommended ratio is $\text{max} = \text{buckets} \times 4$ (average hash chain length of 4).",
    explanation: "If `nf_conntrack_max` is 1,000,000 but `buckets` is only 16,384, hash collisions cause linked list chains to grow to 60+ entries, degrading O(1) hash lookup into slow O(N) linear scans, increasing packet processing latency.",
    hint: "Buckets is the number of hash slots; Max is the total allowed entries (usually 4x buckets).",
    level: "Expert",
    codeExample: `// Optimizing Conntrack Hash Table:
// sudo sysctl -w net.netfilter.nf_conntrack_max=2097152
// echo 524288 > /sys/module/nf_conntrack/parameters/hashsize`
  },
  {
    id: 15,
    question: "What is 'State Table Desynchronization' (Out-of-Sync State) and what causes it in asymmetric routing environments?",
    shortAnswer: "When outbound packets leave via Firewall A but return packets enter via Firewall B; because Firewall B has no record of the outbound SYN handshake, it drops the return packet as `INVALID`.",
    explanation: "In networks with redundant ISPs or asymmetric routing paths, request and response packets traverse different firewalls. Unless the two firewalls run active state synchronization (e.g. `conntrackd` or Check Point ClusterXL), the return firewall will drop legitimate sessions.",
    hint: "Outgoing packet goes through Firewall 1; reply packet comes back through Firewall 2, which drops it.",
    level: "Moderate",
    codeExample: `// Asymmetric Routing Problem:
// Client ---> [Firewall A (Has State)] ---> Web Server
// Web Server ---> [Firewall B (NO State!)] ---> Client → DROPPED as INVALID!`
  },
  {
    id: 16,
    question: "What is `conntrackd` (Connection Tracking Daemon) and how does it enable High-Availability (HA) Active-Passive firewall clustering?",
    shortAnswer: "A user-space daemon that synchronizes state table events in real-time between redundant firewall nodes over a dedicated heartbeat link, ensuring seamless failover without dropping established sessions.",
    explanation: "When Firewall 1 processes a new TCP handshake, `conntrackd` replicates the connection state to Firewall 2. If Firewall 1 loses power, Firewall 2 promotes to Active and already possesses the full state table, allowing active SSH, VoIP, and banking sessions to continue uninterrupted.",
    hint: "Replicates active state table records between primary and backup firewalls.",
    level: "Moderate",
    codeExample: `// conntrackd Synchronization Architecture:
// Primary Firewall (Active) <=== Dedicated Sync Link (Multicast/UDP 3780) ===> Secondary Firewall (Standby)`
  },
  {
    id: 17,
    question: "How does an SPI firewall prevent 'RST Injection Attacks' against established enterprise TCP streams?",
    shortAnswer: "By requiring incoming TCP RST packets to have a sequence number that matches the exact expected receive sequence number (`RCV.NXT`), rejecting out-of-sequence RST packets.",
    explanation: "Attackers inject forged RST packets to disrupt BGP routing sessions or TLS streams. Standard TCP stacks accept RST packets if the sequence number is anywhere inside the receive window. Hardened SPI firewalls drop RST packets unless the sequence number matches `RCV.NXT` exactly.",
    hint: "Strictly verifies that the RST sequence number matches the expected sequence number exactly.",
    level: "Expert",
    codeExample: `// RST Validation:
// Injected RST with Seq = RCV.NXT + 5000 → Dropped by SPI firewall!`
  },
  {
    id: 18,
    question: "What is the 'State Table Timeout Tuning' strategy for mitigating Slowloris and low-and-slow DoS attacks?",
    shortAnswer: "Reducing aggressive idle timeouts on unestablished or half-open connections (`tcp_timeout_syn_recv` to 5s, `tcp_timeout_close_wait` to 10s) to free up state table memory rapidly.",
    explanation: "Slowloris and SYN flood attacks aim to hold state table slots open indefinitely. Tuning timeouts ensures that half-open or stalled connections are purged from memory within seconds, preserving slots for active legitimate sessions.",
    hint: "Shortening timeout counters so dead or stalled connections are deleted quickly.",
    level: "Basic",
    codeExample: `// Recommended Netfilter Timeout Tuning:
// net.netfilter.nf_conntrack_tcp_timeout_syn_recv = 5
// net.netfilter.nf_conntrack_tcp_timeout_close_wait = 10
// net.netfilter.nf_conntrack_tcp_timeout_fin_wait = 30`
  },
  {
    id: 19,
    question: "Why is Stateful Packet Inspection (SPI) still considered blind to Layer 7 Web Application Exploits (e.g. SQL Injection / Log4Shell)?",
    shortAnswer: "SPI operates at Layers 3 and 4; once a TCP connection reaches the `ESTABLISHED` state, SPI permits all subsequent Layer 7 payload packets regardless of whether they contain malicious SQL strings or exploit payloads.",
    explanation: "An attacker who initiates a legitimate 3-way handshake to port 443 establishes a valid state in the conntrack table. When the attacker sends `GET /login?user=' OR '1'='1`, the SPI firewall sees valid sequence numbers on an established session and forwards the exploit to the server. Layer 7 inspection requires a WAF or NGFW.",
    hint: "SPI checks that the conversation is grammatically correct at Layer 4, not what words are spoken at Layer 7.",
    level: "Basic",
    codeExample: `// The SPI Blind Spot:
// 1. Attacker completes 3-way handshake → State Table: ESTABLISHED (Valid!)
// 2. Attacker sends SQLi / Log4Shell payload → SPI passes packet because state is ESTABLISHED!`
  },
  {
    id: 20,
    question: "What is 'Session Splicing' (Packet Fragmentation Evasion) against stateful firewalls and how is it defeated?",
    shortAnswer: "An attacker splits an attack signature across multiple tiny TCP packets (1 byte per packet); SPI firewalls defeat this via TCP Stream Reassembly, buffering bytes before evaluating inspection rules.",
    explanation: "If an intrusion signature is `malicious`, the attacker sends 9 separate 1-byte TCP segments: 'm', 'a', 'l', 'i', 'c', 'i', 'o', 'u', 's'. A stateless or naive stateful firewall inspecting packet by packet fails to match the signature. Stream reassembly buffers the TCP stream in RAM to reconstruct the complete string.",
    hint: "Buffering and reassembling individual TCP byte segments into a continuous stream.",
    level: "Expert",
    codeExample: `// TCP Stream Reassembly:
// Packet 1: "UNI" → Buffer
// Packet 2: "ON " → Buffer
// Packet 3: "SELECT" → Reassembled: "UNION SELECT" → Signature Matched → Blocked!`
  },
  {
    id: 21,
    question: "What is the purpose of the `UNTRACKED` state in Linux Netfilter / iptables?",
    shortAnswer: "It designates packets explicitly exempted from connection tracking via the `NOTRACK` target in the `raw` table, saving CPU and RAM for high-throughput trusted streams (e.g. 100 Gbps video or DNS root servers).",
    explanation: "During extreme packet loads, connection tracking overhead can bottleneck router CPUs. Administrators use `iptables -t raw -A PREROUTING -p udp --dport 53 -j NOTRACK` to process trusted high-volume traffic statelessly, assigned to the `UNTRACKED` state.",
    hint: "Packets explicitly marked to bypass the connection tracking table.",
    level: "Moderate",
    codeExample: `// iptables NOTRACK Rule:
// iptables -t raw -A PREROUTING -p tcp --dport 80 -j NOTRACK
// iptables -A FORWARD -m conntrack --ctstate UNTRACKED -j ACCEPT`
  },
  {
    id: 22,
    question: "How does an SPI firewall maintain state for protocols utilizing multiple independent TCP sessions (e.g. H.323 or SIP VoIP)?",
    shortAnswer: "Through dedicated Protocol ALGs (Application-Level Gateways) that inspect signaling messages (SIP INVITE / H.225) to extract RTP audio port assignments and insert `RELATED` state entries.",
    explanation: "VoIP calls initiate signaling on UDP port 5060, which contains Session Description Protocol (SDP) payloads negotiating dynamic audio/video UDP ports. The SIP ALG helper tracks the call state and opens dynamic pinholes exclusively for the duration of the phone call.",
    hint: "Using protocol-specific helper modules that parse signaling payloads to open temporary voice channels.",
    level: "Moderate",
    codeExample: `// SIP Protocol Conntrack Helper:
// sudo modprobe nf_conntrack_sip
// sudo modprobe nf_nat_sip`
  },
  {
    id: 23,
    question: "What is 'TCP Fast Open' (TFO - RFC 7413) and how must an SPI firewall handle data inside the initial SYN packet?",
    shortAnswer: "TFO allows clients to include application data directly inside the initial TCP SYN packet; the SPI firewall must inspect and permit the data payload during the `NEW` connection state.",
    explanation: "Traditional TCP requires completing the 3-way handshake before transmitting data. TFO includes data in the SYN packet to reduce latency by 1 RTT. Modern SPI firewalls must buffer and validate TFO data payloads while establishing the connection state.",
    hint: "Application data transmitted inside the initial SYN packet to save one round-trip time.",
    level: "Expert",
    codeExample: `// TCP Fast Open (TFO):
// Packet 1: [SYN + TFO Cookie + HTTP GET /catalog] (Data inside SYN!)`
  },
  {
    id: 24,
    question: "What is 'Connection Sinking / Tarpitting' in advanced stateful firewall defense?",
    shortAnswer: "A defense mechanism where the firewall accepts connections on forbidden ports but sets the TCP Window Size to 0 or transmits 1 byte per second, trapping attacker port scanners and exhausting attacker resources.",
    explanation: "Instead of dropping or rejecting port scans, a Tarpit firewall (e.g. `iptables -j TARPIT`) completes the TCP handshake and stops acknowledging data, forcing automated adversary scanners to hang for minutes on every single port, rendering automated recon useless.",
    hint: "Trapping the attacker's port scanner in a sticky, ultra-slow connection.",
    level: "Moderate",
    codeExample: `// iptables TARPIT Rule:
// iptables -A INPUT -p tcp --dport 23 -j TARPIT (Traps Telnet brute-force scanners!)`
  },
  {
    id: 25,
    question: "How does the Linux `ctstat` / `conntrack -L` command assist SOC analysts during an active cyber incident?",
    shortAnswer: "It dumps real-time active state records, showing source/destination IP pairs, ports, active connection states (`ESTABLISHED`, `SYN_SENT`), byte counts, and remaining timeout seconds.",
    explanation: "During a DDoS attack or data breach, analysts run `conntrack -L` to identify which internal IP is generating thousands of abnormal outbound connections or which external IP is holding open thousands of half-open SYN sessions.",
    hint: "Displays the live contents of the kernel state table in real-time.",
    level: "Basic",
    codeExample: `// Inspecting Conntrack State Table:
// sudo conntrack -L -p tcp --state ESTABLISHED
// sudo conntrack -C (Outputs current count of active sessions)`
  },
  {
    id: 26,
    question: "What is 'State Table Pruning / Early Drop' and how does the kernel behave under emergency memory pressure?",
    shortAnswer: "When the state table reaches 95%+ capacity, the kernel automatically scans and deletes oldest idle connections (`TCP_ESTABLISHED` with longest inactivity or `UDP` sessions) to create room for new sessions.",
    explanation: "To prevent sudden catastrophic packet dropping, modern state engines use early drop algorithms: purging inactive or low-priority sessions from the hash table before the table reaches absolute capacity.",
    hint: "Deleting the oldest inactive sessions early to make room when memory runs low.",
    level: "Moderate",
    codeExample: `// Netfilter Early Drop Policy:
// When conntrack table > 95% full: Purges oldest idle sessions automatically.`
  },
  {
    id: 27,
    question: "Why must SPI firewalls be synchronized with NPL India NTP servers under CERT-In guidelines?",
    shortAnswer: "To ensure that state table creation timestamps, session teardown logs, and firewall audit records align precisely with microsecond accuracy for multi-source forensic timeline reconstruction.",
    explanation: "During national forensic investigations, CERT-In correlates firewall state creation records with upstream ISP BGP logs and downstream server application logs. Inaccurate firewall system clocks invalidate forensic timelines in Indian courts under Section 65B of the Indian Evidence Act.",
    hint: "Ensures accurate timestamps for legal evidence and forensic correlation.",
    level: "Basic",
    codeExample: `// CERT-In NTP Synchronization Mandate:
// ntp server time.nplindia.org prefer`
  },
  {
    id: 28,
    question: "What is 'TCP Split Handshake Attack' and how does a modern SPI firewall prevent it?",
    shortAnswer: "An attack where an attacker sends a SYN+ACK in response to a client SYN (simulating simultaneous open), attempting to bypass inbound security checks; modern firewalls strictly validate simultaneous open state transitions.",
    explanation: "Simultaneous open (RFC 793) allows two hosts to send SYN packets to each other at the same time. Attackers exploit this by sending a crafted SYN+ACK to trick firewalls into opening bidirectional state. Modern SPI engines require seeing both independent SYN packets before transitioning to simultaneous open state.",
    hint: "Crafted simultaneous open handshake designed to confuse the firewall state machine.",
    level: "Expert",
    codeExample: `// Split Handshake Defense:
// Modern Netfilter requires full dual-SYN observation before validating simultaneous open!`
  },
  {
    id: 29,
    question: "How do modern cloud-native stateful firewalls (AWS Network Firewall / Azure Firewall) scale state tables elastically?",
    shortAnswer: "By distributing state across distributed in-memory clusters using consistent hashing and elastic multi-AZ scaling, supporting tens of millions of concurrent sessions without single-appliance hardware limits.",
    explanation: "On-premise hardware appliances have fixed RAM limits. Cloud-native stateful firewalls use distributed microservices architecture: connection tuples are hashed across multiple elastic compute instances, automatically provisioning new inspection capacity as traffic spikes.",
    hint: "Distributing state table hashes across scalable cloud clusters across multiple availability zones.",
    level: "Moderate",
    codeExample: `// Cloud-Native Stateful Scaling:
// Auto-scales across 3 Availability Zones, handling 100,000+ new connections per second per zone.`
  },
  {
    id: 30,
    question: "Synthesize the overarching role of Stateful Packet Inspection (SPI) in modern enterprise perimeter defense.",
    shortAnswer: "Stateful Packet Inspection is the cornerstone of Layer 3/4 network access control, eliminating stateless ACK bypasses, tracking dynamic sessions via ALGs, and enforcing bidirectional session hygiene, serving as the essential foundation beneath Layer 7 WAFs and Zero Trust architectures.",
    explanation: "By maintaining real-time session context in memory, SPI firewalls provide robust transport-layer security while maintaining multi-gigabit throughput. When paired with SYN Cookies for flood resistance and Layer 7 WAFs for payload inspection, SPI forms an impenetrable barrier against unauthorized network intrusion.",
    hint: "The essential Layer 3/4 foundation tracking active sessions beneath Layer 7 application firewalls.",
    level: "Moderate",
    codeExample: `// The Master SPI Defense Formula:
// Resilient Security = [Conntrack State Table] + [TCP Window Tracking] + [SYN Cookies (RFC 4987)] + [ALG Pinhole Control] + [Layer 7 WAF Payload Inspection]`
  }
];

export default questions;
