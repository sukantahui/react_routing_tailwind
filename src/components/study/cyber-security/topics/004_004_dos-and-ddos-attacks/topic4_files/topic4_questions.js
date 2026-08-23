const questions = [
  {
    question: "What is the TCP Three-Way Handshake (RFC 793), and what fundamental asymmetry does it introduce that attackers exploit?",
    shortAnswer: "The handshake sequence (SYN ➔ SYN-ACK ➔ ACK) requires the server to allocate memory (a Transmission Control Block) in its half-open backlog queue upon receiving Step 1 (SYN), while the client commits zero memory, creating an asymmetrical resource exhaustion vulnerability.",
    explanation: "Under RFC 793, when a client sends a SYN packet, the server transitions to `SYN_RECV` and allocates a ~480-byte Transmission Control Block (TCB) in non-pageable kernel RAM. The server then sends a SYN-ACK and waits for the client's ACK. Attackers exploit this asymmetry by sending thousands of SYN packets with fake IPs; the server commits gigabytes of RAM holding half-open sessions, while the attacker commits zero resources.",
    hint: "A store clerk reserving a physical table and filling out 5 pages of paperwork whenever someone rings the bell, even if the person never walks inside.",
    level: "basic",
    codeExample: `// TCP Three-Way Handshake Sequence:
// Step 1: Client ➔ [SYN (Seq=x)] ➔ Server (Allocates TCB memory in SYN Backlog!)
// Step 2: Server ➔ [SYN-ACK (Seq=y, Ack=x+1)] ➔ Client (Server waits up to 75s!)
// Step 3: Client ➔ [ACK (Seq=x+1, Ack=y+1)] ➔ Server (Socket transitions to ESTABLISHED)`
  },
  {
    question: "What are 'TCP SYN Cookies' (RFC 4987), and how do they eliminate memory allocation during the SYN phase?",
    shortAnswer: "A cryptographic technique invented by Daniel J. Bernstein that encodes the connection state directly into the 32-bit Initial Sequence Number (ISN) of the SYN-ACK packet, allowing the server to allocate ZERO memory until the client returns a valid final ACK.",
    explanation: "When SYN Cookies are active (`tcp_syncookies = 1`), the server does not allocate a TCB or create an entry in the half-open backlog queue when a SYN arrives. Instead, it computes an Initial Sequence Number (ISN) using a cryptographic hash of the client's IP, port, time, and MSS index. If the client is legitimate, it returns an ACK containing $ISN + 1$. The server validates the hash and only then allocates memory.",
    hint: "A coat check attendant giving you a stamped ticket with a secret math code instead of holding an empty coat locker before you arrive.",
    level: "basic",
    codeExample: `// RFC 4987 TCP SYN Cookie ISN Encoding:
// Top 5 bits   : Timestamp 't' (mod 32, advances every 64 seconds)
// Next 3 bits  : Encoded Maximum Segment Size (MSS) table index 'm' (0 to 7)
// Lower 24 bits: Cryptographic Hash = HMAC-SHA1(SrcIP, SrcPort, DstIP, DstPort, t, SecretKey)`
  },
  {
    question: "How does the Server Verify and Reconstruct a TCP Connection when the Final ACK arrives in a SYN Cookie Session?",
    shortAnswer: "The server subtracts 1 from the ACK sequence number to recover the ISN, extracts the timestamp and MSS index, verifies the cryptographic hash against its secret key, and constructs the TCP socket only upon successful signature match.",
    explanation: "When the client returns the final ACK with `Ack Number = ISN + 1`, the server calculates $ISN = \\text{Ack Number} - 1$. It checks the top 5 bits to ensure the timestamp $t$ has not expired (within 64-128 seconds). It then recalculates the HMAC hash using the packet's 4-tuple and its secret key. If the lower 24 bits match, the connection is authentic, and the server constructs the socket.",
    hint: "Checking if the mathematical claim ticket presented by the customer matches the store's daily secret formula.",
    level: "expert",
    codeExample: `// Server-Side SYN Cookie Verification Algorithm:
function verify_syn_cookie(ack_pkt, secret_key) {
    let isn = ack_pkt.tcp.ack_seq - 1;
    let t = (isn >> 27) & 0x1F; // Extract 5-bit timestamp
    let mss_idx = (isn >> 24) & 0x07; // Extract 3-bit MSS index
    let expected_hash = compute_hmac24(ack_pkt.ip.src, ack_pkt.ip.dst, t, secret_key);
    
    if ((isn & 0x00FFFFFF) === expected_hash && is_timestamp_valid(t)) {
        return allocate_tcp_socket(ack_pkt, mss_table[mss_idx]); // AUTHENTICATED!
    }
    return DROP_PACKET; // Forged or expired ACK!
}`
  },
  {
    question: "What is the Maximum Segment Size (MSS) Limitation of Classic SYN Cookies, and how does the 3-bit MSS Index address it?",
    shortAnswer: "Because the SYN packet's TCP options cannot be stored in memory, classic SYN cookies restrict the client's Maximum Segment Size to one of 8 standard hardcoded values (0-7) encoded into 3 bits of the ISN.",
    explanation: "Under standard TCP, the client proposes an arbitrary MSS (e.g. 1460 bytes). Because the server stores zero state, it cannot remember arbitrary MSS numbers. RFC 4987 uses a fixed lookup table of 8 common MSS values: `[64, 256, 512, 536, 1024, 1440, 1460, 8960]`. The server picks the closest lower match and stores its 3-bit index ($000_2$ to $111_2$) in bits 24-26 of the ISN.",
    hint: "Picking from 8 standard shoe sizes (Small, Medium, Large...) instead of measuring every customer's foot with a custom ruler.",
    level: "expert",
    codeExample: `// 8-Value Standard MSS Table in Linux Kernel:
static const __u16 msstab[8] = {
    64,    // Index 0: 000
    256,   // Index 1: 001
    512,   // Index 2: 010
    536,   // Index 3: 011 (Standard IPv4 Default)
    1024,  // Index 4: 100
    1440,  // Index 5: 101
    1460,  // Index 6: 110 (Standard Ethernet MTU 1500)
    8960   // Index 7: 111 (Jumbo Frames MTU 9000)
};`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for using SYN Flood attacks to paralyze Essential Public Infrastructure?",
    shortAnswer: "Launching SYN flood attacks that deny access to critical infrastructure (power grid SCADA, railway systems, banking switches) to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary launches a 40 Million PPS TCP SYN flood that paralyzes the state power grid in Barrackpore, air traffic management in Kolkata, or national banking networks, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism SYN flood disruptions.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Paralyzing state electrical grid telemetry routers with 40 Mpps SYN floods
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "How do 'TCP Timestamps' (RFC 7323) solve the TCP Window Scale and SACK Limitation in Modern SYN Cookie Implementations?",
    shortAnswer: "By encoding the client's TCP Window Scale factor and Selective Acknowledgment (SACK) permissions into the lower bits of the 32-bit TCP Timestamp (TSval) option, preserving advanced TCP performance features during floods.",
    explanation: "Classic SYN cookies disabled TCP Window Scaling and SACK because there were not enough bits in the 32-bit ISN to store them. Modern Linux kernels (since kernel 2.6.26) encode Window Scale (4 bits), SACK (1 bit), and ECN (1 bit) into the lower bits of the Timestamp Echo Reply (`TSval`) option in the SYN-ACK, restoring full TCP performance during attacks.",
    hint: "Using the timestamp stamp on an envelope to write extra notes that did not fit on the main claim ticket.",
    level: "expert",
    codeExample: `# Enable TCP Timestamps alongside SYN Cookies in Linux:
sysctl -w net.ipv4.tcp_syncookies=1
sysctl -w net.ipv4.tcp_timestamps=1
sysctl -w net.ipv4.tcp_window_scaling=1
# Verification: Full Window Scaling & SACK preserved under SYN Flood attacks!`
  },
  {
    question: "What is the Purpose of the 5-Bit Timestamp in the RFC 4987 SYN Cookie ISN?",
    shortAnswer: "It prevents replay attacks by dividing time into 64-second epochs; a cookie expires after 2 epochs (128 seconds), ensuring attackers cannot reuse captured valid ISNs to open unauthorized connections later.",
    explanation: "The top 5 bits store $t = (\\text{time}() >> 6) \\pmod{32}$. The counter increments every 64 seconds and wraps around every 32 minutes ($32 \\times 64 = 2048$ seconds). When the final ACK arrives, the server checks if the extracted timestamp is within $[t, t-1]$. If an ACK arrives with a timestamp older than 128 seconds, the server rejects it as an expired replay attack.",
    hint: "An expiration date stamped on milk that is only good for today and tomorrow.",
    level: "expert",
    codeExample: `// 5-Bit Timestamp Window Calculation:
// Epoch Duration = 64 Seconds
// Valid Window   = Current Epoch 't' OR Previous Epoch 't - 1'
// If (Current_Epoch - Extracted_t) > 1 ➔ COOKIE EXPIRED ➔ DROP PACKET!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise obligations for maintaining service availability via TCP SYN Cookies?",
    shortAnswer: "Organizations must implement reasonable technical availability safeguards; persistent failure to enable kernel SYN protection leading to extended personal data service outages triggers statutory fines up to ₹250 Crores.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If a healthcare provider or financial institution in West Bengal leaves SYN cookies disabled, resulting in complete service collapse for citizens, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Enabling availability controls is a statutory requirement under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent SYN flood availability controls`
  },
  {
    question: "What is 'SYN Cookie Secret Key Rotation', and why is it Critical for Cryptographic Resilience?",
    shortAnswer: "Periodically regenerating the random secret key used in the HMAC calculation (e.g. every 10 minutes) so that even if an attacker brute-forces a secret key, it becomes obsolete before it can be exploited.",
    explanation: "If the server used a static secret key forever, an adversary with sufficient compute power could collect millions of ISNs and attempt to reverse-engineer the secret key. Linux rotates its internal cryptographic secret seeds periodically. Once rotated, previously computed cookies remain valid only until their 128-second timestamp window expires.",
    hint: "Changing the door lock combination every morning so old combinations become useless.",
    level: "expert",
    codeExample: `// Linux Kernel Secret Key Generation:
// Secret keys are generated using CSPRNG (/dev/urandom) at boot
// Keys are stored in kernel memory and rotated periodically across hash tables.`
  },
  {
    question: "What is the Difference between 'tcp_syncookies = 1' and 'tcp_syncookies = 2' in Linux Kernel sysctl?",
    shortAnswer: "Value 1 activates SYN cookies dynamically ONLY when the SYN backlog queue overflows; Value 2 forces SYN cookies to be permanently active for ALL incoming connections unconditionally.",
    explanation: "Setting `net.ipv4.tcp_syncookies = 1` is the standard production mode: under normal traffic, the server uses standard fast TCB queueing. Only when the SYN backlog queue fills up does the kernel log 'TCP: Possible SYN flooding on port 80. Sending cookies.' and engage SYN cookies. Setting `tcp_syncookies = 2` forces SYN cookies on every connection regardless of load.",
    hint: "Deploying the emergency bouncer only when the lobby gets too crowded (Value 1) vs keeping the emergency bouncer stationed 24/7 (Value 2).",
    level: "moderate",
    codeExample: `# Linux sysctl.conf Configuration:
net.ipv4.tcp_syncookies = 1
# Kernel engages SYN cookies dynamically when backlog overflows!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for TCP Three-Way Handshake Exploitation attacks?",
    shortAnswer: "All organizations in India must report TCP SYN floods causing service degradation or perimeter outages to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including TCP protocol DDoS attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of TCP handshake DDoS outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How does an Inline 'Hardware TCP SYN Proxy' Implement SYN Cookies at Wire Speed (100+ Gbps)?",
    shortAnswer: "By implementing the RFC 4987 cryptographic HMAC hashing algorithm directly inside FPGA or ASIC silicon hardware pipelines, completing the handshake in hardware in under 5 microseconds before forwarding clean traffic.",
    explanation: "Software-based CPU SYN cookie validation is limited by CPU memory bus bandwidth (~5-10 Mpps per server). Hardware ADC appliances (F5 BIG-IP, A10 Networks) embed the SHA-1/HMAC hashing engine inside FPGA circuits. The hardware proxy intercepts 50 Million SYN packets per second, computes ISNs in hardware at wire speed, and only sends clean, established TCP streams to backend servers.",
    hint: "A dedicated microchip designed solely to solve math puzzles in nanoseconds without bothering the main computer CPU.",
    level: "expert",
    codeExample: `// Hardware FPGA Pipeline Logic:
// Ingress SYN Packet ➔ FPGA ASIC Pipeline (Computes HMAC in 4.2 nanoseconds)
// Transmits SYN-ACK Cookie ➔ If legitimate ACK arrives ➔ Splices TCP connection to Backend Server!`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching TCP SYN floods?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes denial of access: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching a 50 Mpps SYN flood that takes down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Embryonic Connection Queue' (SYN Backlog vs Accept Queue) in the Linux TCP Stack?",
    shortAnswer: "The SYN Backlog (`tcp_max_syn_backlog`) holds half-open connections in `SYN_RECV` state; the Accept Queue (`somaxconn`) holds fully established connections waiting for the application to call `accept()`.",
    explanation: "In Linux, there are two distinct queues: 1. SYN Backlog: Holds embryonic connections where the server is waiting for the client's final ACK. Controlled by `net.ipv4.tcp_max_syn_backlog`. 2. Accept Queue: Holds connections where the three-way handshake is COMPLETE, waiting for the application (e.g. Nginx, Node.js) to call `accept()`. Controlled by `net.core.somaxconn`.",
    hint: "The waiting room for people whose IDs are still being checked (SYN Backlog) vs the waiting room for approved visitors waiting to see the manager (Accept Queue).",
    level: "expert",
    codeExample: `# Scale Both Linux Connection Queues:
# 1. Scale SYN Backlog (Half-Open Queue):
sysctl -w net.ipv4.tcp_max_syn_backlog=8192
# 2. Scale Accept Queue (Completed Handshake Queue):
sysctl -w net.core.somaxconn=65535`
  },
  {
    question: "What happens when an Attacker Attempts to 'Guess' or 'Brute-Force' a TCP SYN Cookie ISN?",
    shortAnswer: "Because the lower 24 bits are generated by a cryptographic HMAC hash, the attacker has only a 1 in 16,777,216 (2^24) probability of guessing a valid sequence number, making blind connection establishment mathematically infeasible.",
    explanation: "To complete a connection without receiving the SYN-ACK, an attacker must guess the 24-bit hash. At 1 in $16.7$ Million odds, sending 1,000,000 blind ACK packets will succeed less than $5.9\\%$ of the time for a single connection. The remaining $99.9999\\%$ of guessed packets fail the HMAC check and are discarded immediately.",
    hint: "Trying to guess a 7-digit secret passcode on a safe that only gives you one try every 60 seconds.",
    level: "expert",
    codeExample: `// Brute-Force Odds Calculation:
// 24-Bit HMAC Hash Space = 2^24 = 16,777,216 possible values
// Probability of 1 Blind Guess Succeeding = 1 / 16,777,216 = 0.00000596%
// Result: Cryptographically secure against blind ACK spoofing!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing tools to exploit the TCP handshake?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Developing and executing high-rate TCP SYN flood exploit scripts in Kolkata
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'TCP Fast Open (TFO) Security Implications' when used alongside TCP SYN Cookies?",
    shortAnswer: "TCP Fast Open requires the server to accept data in the initial SYN packet; when SYN cookies are active, the server disables TFO for unverified connections to prevent unauthenticated data processing.",
    explanation: "TFO (RFC 7413) allows data transmission before handshake completion. However, if SYN cookies are active during an attack, processing early data would re-introduce the resource exhaustion vulnerability. Therefore, the Linux kernel falls back to standard three-way handshakes with SYN cookies, ignoring early TFO data until the handshake is verified.",
    hint: "Requiring all visitors to show their badges at the front gate before accepting any delivery packages during a security alert.",
    level: "expert",
    codeExample: `// TFO Behavior under SYN Cookie Engagement:
if (is_syn_cookie_active()) {
    // Ignore TFO early data in SYN packet!
    // Require standard 3-way handshake completion before processing HTTP payload!
}`
  },
  {
    question: "Synthesize an enterprise-scale TCP Three-Way Handshake & SYN Cookie Hardening Architecture.",
    shortAnswer: "A multi-layered defense combining Linux Kernel RFC 4987 SYN Cookies (`tcp_syncookies = 1`), Scaled Connection Queues (`tcp_max_syn_backlog = 8192`, `somaxconn = 65535`), TCP Timestamps (`tcp_timestamps = 1`), Short SYN-ACK Retries (`tcp_synack_retries = 2`), and Hardware SYN Proxies.",
    explanation: "To achieve complete immunity against multi-million PPS handshake floods: 1. Perimeter Tier: Hardware SYN Proxies completing handshakes before passing traffic to backend servers. 2. Kernel Tier: Linux TCP stack tuning enabling SYN Cookies (`net.ipv4.tcp_syncookies = 1`) and TCP Timestamps (`net.ipv4.tcp_timestamps = 1`). 3. Queue Tier: SYN backlog scaled to 8,192 and accept queue to 65,535. 4. Timer Tier: `tcp_synack_retries = 2` (reducing embryonic hold time from 75s to 7s). 5. Application Tier: Asynchronous non-blocking web servers (Nginx `epoll`).",
    hint: "Combine kernel SYN cookies, scaled backlog queues, TCP timestamps, and hardware SYN proxies.",
    level: "expert",
    codeExample: `// Master TCP Handshake Hardening Blueprint:
// 1. Kernel sysctl: net.ipv4.tcp_syncookies = 1
// 2. Kernel sysctl: net.ipv4.tcp_timestamps = 1 (Preserves Window Scale & SACK)
// 3. Kernel sysctl: net.ipv4.tcp_max_syn_backlog = 8192
// 4. Kernel sysctl: net.core.somaxconn = 65535
// 5. Kernel sysctl: net.ipv4.tcp_synack_retries = 2`
  },
  {
    question: "What is 'TCP Reset (RST) Generation Overhead' in Non-Listening Port Scans?",
    shortAnswer: "When a server receives SYN packets on closed ports, it must generate a TCP RST packet for every packet; attackers exploit this to force the server into consuming CPU cycles and outbound bandwidth generating RST floods.",
    explanation: "RFC 793 dictates that when a packet arrives on a closed TCP port, the host must reply with a TCP RST (`Seq=0, Ack=Seq+Len, Flags=RST+ACK`). In a port scan or random-port flood, the server generates millions of RST packets. Defenders configure firewalls to silently drop packets on closed ports (`iptables -A INPUT -j DROP`) rather than rejecting them (`-j REJECT`), eliminating RST generation overhead.",
    hint: "Silently ignoring unwanted spam phone calls instead of answering every single one to say 'Wrong Number'.",
    level: "moderate",
    codeExample: `# Firewall Silent Drop Rule (Prevents RST Generation Overhead):
iptables -A INPUT -p tcp --dport 10000:65535 -j DROP # Silently drops without generating TCP RST!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via TCP Handshake Exploitation?",
    shortAnswer: "Intentionally causing damage or disruption to electronic property that diminishes its value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker launches a TCP SYN flood that crashes web servers and takes banking portals offline in West Bengal, the act diminishes the utility of electronic property, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally crashing corporate web servers via TCP SYN flooding (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "How does the 'RFC 4987 Cryptographic Hash Function' prevent Hash Collisions across Concurrent Connections?",
    shortAnswer: "By hashing the full connection 4-tuple (Source IP, Source Port, Destination IP, Destination Port) along with the timestamp epoch and secret key, ensuring that two concurrent connections generate completely unique 24-bit hash values.",
    explanation: "The HMAC hash incorporates all five parameters: $\\text{HMAC}(\\text{SrcIP} \\parallel \\text{SrcPort} \\parallel \\text{DstIP} \\parallel \\text{DstPort} \\parallel t, K)$. Because each client connection has a distinct ephemeral source port or source IP, the resulting 24-bit hashes are statistically uniform, preventing cross-connection collisions.",
    hint: "Generating a custom ticket number based on your name, seat number, and flight number so no two passengers ever get the same ticket.",
    level: "expert",
    codeExample: `// HMAC Input Block:
// [Source IP (32b)] + [Dest IP (32b)] + [Source Port (16b)] + [Dest Port (16b)] + [Timestamp (5b)]
// Keyspace = 2^24 distinct cryptographic signatures!`
  },
  {
    question: "What is 'TCP SYN Flood Amplification' via Web Server Retransmissions?",
    shortAnswer: "When an attacker sends 1 spoofed SYN, the victim server transmits an initial SYN-ACK and retries sending SYN-ACKs 3 to 5 times over 75 seconds, generating a 3x to 5x packet amplification towards the spoofed victim IP.",
    explanation: "Because TCP is designed to be reliable, when a server sends a SYN-ACK and receives no response, its TCP stack re-transmits the SYN-ACK at increasing intervals (e.g. 1s, 2s, 4s, 8s, 16s). For 1 single SYN packet sent by the attacker, the reflection server fires 5 SYN-ACK packets at the victim, achieving packet-count amplification.",
    hint: "Knocking on a door once, causing the resident to open the door and shout 'HELLO?' 5 separate times into the street.",
    level: "moderate",
    codeExample: `// SYN-ACK Retransmission Amplification:
// Attacker sends : 1 SYN Packet to Web Server (Source IP = Victim IP)
// Web Server fires: 5 SYN-ACK Packets over 75 seconds (5x Packet Amplification Flood!)`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for TCP Handshake Exploitation targeting 'Protected Systems' (Critical National Infrastructure)?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching a TCP SYN flood that denies access to a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Flooding SCADA stateful gateway firewalls with 40 Mpps SYN packets
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'TCP Initial Sequence Number (ISN) Entropy' in Operating System Security?",
    shortAnswer: "Generating Initial Sequence Numbers using a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) to prevent attackers from predicting sequence numbers and injecting unauthorized data into active sessions.",
    explanation: "Early operating systems (BSD 4.2) used a simple incrementing counter for ISNs ($\text{ISN} = \text{ISN} + 128,000/\text{sec}$). Attackers could easily predict future sequence numbers and hijack TCP sessions (Kevin Mitnick attack). Modern operating systems use RFC 6528 CSPRNG algorithms to generate unpredictable 32-bit ISNs with high Shannon entropy.",
    hint: "Rolling a 32-sided cryptographic die for every new conversation instead of counting 1, 2, 3...",
    level: "expert",
    codeExample: `// RFC 6528 Secure ISN Generation Formula:
// ISN = M + F(Local_IP, Local_Port, Remote_IP, Remote_Port, Secret_Key)
// M = 4-microsecond timer | F = Cryptographic Half-SipHash PRF`
  },
  {
    question: "How does 'TCP SYN Cookie Drop Rate' scale when Ingress SYN Floods exceed 100 Million PPS?",
    shortAnswer: "Under SYN Cookies, connection drop rate remains 0.0% regardless of packet volume, bounded only by the physical CPU/hardware capacity to compute HMAC hashes and interface packet forwarding limits.",
    explanation: "Because SYN cookies eliminate memory allocation, the server never runs out of RAM. The only physical limit is CPU compute capacity: a modern server core can compute ~5-8 Million HMAC hashes per second. When coupled with hardware FPGA acceleration, the system absorbs 100+ Million PPS with 0.0% packet drop for legitimate users.",
    hint: "A math machine that never runs out of paper because it solves everything mentally in nanoseconds.",
    level: "expert",
    codeExample: `// SYN Cookie Resilience Performance Curve:
// Ingress SYN Flood: 100,000 PPS ➔ Drop Rate = 0.00%
// Ingress SYN Flood: 1,000,000 PPS ➔ Drop Rate = 0.00%
// Ingress SYN Flood: 10,000,000 PPS ➔ Drop Rate = 0.00% (ZERO MEMORY EXHAUSTION!)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via TCP SYN Flood Extortion?",
    shortAnswer: "Threatening to launch or maintain a TCP SYN flood unless company leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a corporate web portal with 40 Mpps of TCP SYN packets and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹25 Lakhs in cryptocurrency under threat of continuing a 50 Mpps SYN flood
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'TCP Fast Retransmit and SACK Interaction' during TCP SYN Cookie Sessions?",
    shortAnswer: "When TCP Timestamps are enabled alongside SYN cookies, Selective Acknowledgment (SACK) permissions are preserved, allowing endpoints to retransmit only missing packets during network congestion.",
    explanation: "If SACK was disabled (as in classic SYN cookies), packet loss during high traffic forced the sender to re-transmit the entire TCP window (Go-Back-N). With modern timestamp-extended SYN cookies (RFC 7323), SACK is preserved, allowing the sender to re-transmit only the specific dropped segments, maintaining high TCP throughput.",
    hint: "Only re-reading the one paragraph you missed in a book instead of starting the entire chapter from page 1.",
    level: "expert",
    codeExample: `// SACK Preservation in Modern Linux SYN Cookies:
// SYN Packet: Includes SACK-Permitted Option
// Server SYN-ACK: Encodes SACK-Permitted flag into TCP Timestamp TSval lower bit
// Client ACK: Returns TSval ➔ Server reconstructs connection with SACK ENABLED!`
  },
  {
    question: "What is 'TCP Embryonic Connection Timeout Optimization' in Linux Kernel Tuning?",
    shortAnswer: "Configuring `tcp_synack_retries = 2` to drop non-responsive half-open embryonic connections within ~7 seconds instead of the default 75 seconds, preventing queue exhaustion.",
    explanation: "By default, Linux retries sending SYN-ACK packets 5 times ($1s + 2s + 4s + 8s + 16s + 32s + 64s = 127s$ max timeout). Hardening `tcp_synack_retries = 2` terminates dead sessions in 7 seconds ($1s + 2s + 4s = 7s$), freeing half-open slots 18x faster.",
    hint: "Waiting 7 seconds for a response before hanging up the phone instead of waiting on hold for 2 minutes.",
    level: "moderate",
    codeExample: `# Linux SYN-ACK Retry sysctl command:
sysctl -w net.ipv4.tcp_synack_retries=2
# Verification:
cat /proc/sys/net/ipv4/tcp_synack_retries
# Result: 2 (Terminates dead embryonic sessions in 7 seconds!)`
  },
  {
    question: "Synthesize the mathematical formulation of the RFC 4987 TCP SYN Cookie Initial Sequence Number (ISN) Synthesis & Verification Algorithm.",
    shortAnswer: "The 32-bit ISN is synthesized as ISN = (t << 27) | (m << 24) | (HMAC24(SrcIP, SrcPort, DstIP, DstPort, t, Key) & 0x00FFFFFF); verification verifies hash equality and timestamp validity (|t_current - t_extracted| <= 1), ensuring 0.0% memory allocation under attacks.",
    explanation: "The 32-bit Initial Sequence Number (ISN) is divided into three distinct bitfields: 1. Bits 31-27 (5 bits): Timestamp epoch $t = (\\text{time}() >> 6) \\pmod{32}$. 2. Bits 26-24 (3 bits): Index $m \\in [0, 7]$ mapping to standard MSS table values. 3. Bits 23-0 (24 bits): Cryptographic signature $S = \\text{HMAC-SHA1}(\\text{SrcIP} \\parallel \\text{SrcPort} \\parallel \\text{DstIP} \\parallel \\text{DstPort} \\parallel t, K) \\pmod{2^{24}}$. When the final ACK arrives with $\\text{Ack} = \\text{ISN} + 1$, the server computes $\\text{ISN} = \\text{Ack} - 1$, extracts $t$ and $m$, verifies $|t_{\\text{now}} - t| \\le 1$, and recomputes the HMAC. If the lower 24 bits match, connection is authenticated with zero state memory allocation during the SYN phase.",
    hint: "Mathematical proof formula showing how the 32-bit ISN encodes a 5-bit timestamp, 3-bit MSS index, and 24-bit HMAC signature.",
    level: "expert",
    codeExample: `// RFC 4987 Cryptographic ISN Formula:
// ISN = (t << 27) | (m << 24) | (HMAC24(SrcIP, SrcPort, DstIP, DstPort, t, Key) & 0x00FFFFFF)
// Memory Allocated = 0 Bytes | Verification Complexity = O(1) HMAC Calculation!`
  }
];

export default questions;
