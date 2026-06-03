const questions = [
  {
    question: "What is the primary purpose of the TCP 3‑way handshake?",
    shortAnswer: "To establish a reliable connection, synchronize sequence numbers, and allocate resources.",
    explanation: "The handshake ensures both hosts are ready, agrees on initial sequence numbers (ISNs), and establishes parameters before data transfer begins.",
    hint: "Think about two people starting a conversation – they need a greeting, an acknowledgment, and a final confirmation.",
    level: "basic",
    codeExample: "Client → SYN (seq=x), Server → SYN-ACK (seq=y, ack=x+1), Client → ACK (ack=y+1)."
  },
  {
    question: "Why are random initial sequence numbers (ISNs) used instead of fixed values like 1?",
    shortAnswer: "To prevent old duplicate segments from being misinterpreted and to improve security against spoofing attacks.",
    explanation: "Random ISNs reduce the chance that a stale packet from a previous connection is accepted as valid. It also makes TCP sequence prediction attacks harder.",
    hint: "Imagine using the same locker code every day – unsafe. Random codes protect against replay.",
    level: "intermediate",
    codeExample: "Linux uses a time‑based random generator for ISN: get_random_u32()"
  },
  {
    question: "What happens if the final ACK in the 3‑way handshake is lost?",
    shortAnswer: "The server will retransmit its SYN-ACK until a timeout, and the client may still treat the connection as established and send data.",
    explanation: "Server remains in SYN-RCVD state and will resend SYN-ACK (controlled by tcp_synack_retries). If client sends data, the ACK inside the data segment will complete the handshake.",
    hint: "Think of a phone call – you say 'hello' (SYN), friend says 'hi' (SYN-ACK), you reply 'hey' but the network drops it. Your friend might say 'hi' again because he didn't hear you.",
    level: "advanced",
    codeExample: "sysctl net.ipv4.tcp_synack_retries (default 5)"
  },
  {
    question: "Can the 3‑way handshake be completed with simultaneous open?",
    shortAnswer: "Yes, when both sides send SYN at the same time, they exchange SYN and SYN-ACK independently, collapsing into one handshake.",
    explanation: "Simultaneous open occurs rarely but is valid TCP behavior: both sides transition from SYN-SENT to SYN-RCVD after receiving each other's SYN, then each sends SYN-ACK, and finally both receive ACK.",
    hint: "Two colleagues sending 'Let's meet' emails at exactly the same moment – both say yes and arrange a meeting.",
    level: "expert",
    codeExample: "Not typical in client-server, but possible with peer‑to‑peer applications."
  },
  {
    question: "What is a SYN flood attack and how does it exploit the handshake?",
    shortAnswer: "An attacker sends many SYN packets but never completes the handshake, exhausting server resources (half‑open connections).",
    explanation: "SYN flood fills the backlog queue; each SYN consumes memory. Mitigations include SYN cookies, increasing backlog, or reducing timeout.",
    hint: "Imagine someone knocking on a door repeatedly but never entering – the person inside keeps waiting and cannot attend other guests.",
    level: "expert",
    codeExample: "echo 1 > /proc/sys/net/ipv4/tcp_syncookies"
  },
  {
    question: "How does the TCP handshake differ when using TLS/SSL (HTTPS)?",
    shortAnswer: "TCP handshake completes first, then inside the established connection, TLS handshake begins.",
    explanation: "TCP provides a reliable byte stream; TLS then negotiates encryption over that same channel. They are layered: TCP handshake → TLS handshake → application data.",
    hint: "Like making a phone call (TCP), and then authenticating with a secret password (TLS).",
    level: "intermediate",
    codeExample: "TCP handshake (3 packets) → ClientHello → ServerHello → ..."
  },
  {
    question: "What does the 'RST' packet do during handshake?",
    shortAnswer: "Aborts the handshake if something is wrong (e.g., port not listening, invalid sequence number).",
    explanation: "If server receives SYN for a closed port, it responds with RST. Also, any unexpected segment may trigger RST, terminating the handshake immediately.",
    hint: "Hanging up the phone before the conversation starts.",
    level: "intermediate",
    codeExample: "telnet localhost 81 → RST (port not open)"
  },
  {
    question: "Why does the client send an ACK for (server ISN + 1) and not for server ISN directly?",
    shortAnswer: "The ACK number acknowledges the next expected byte – SYN consumes one sequence number.",
    explanation: "SYN flag itself occupies one byte of the sequence space, so the correct acknowledgment is the server's ISN + 1.",
    hint: "SYN counts as a byte (even though no data). TCP's rule: control flags (SYN/FIN) increment sequence number.",
    level: "advanced",
    codeExample: "Client ISN=1000, Server ISN=5000 → Client ACK=5001"
  },
  {
    question: "What state does the server enter after sending SYN-ACK?",
    shortAnswer: "SYN-RCVD (synchronized received).",
    explanation: "Server sends its SYN and acknowledges client SYN; it waits for final ACK or retransmission timer before moving to ESTABLISHED.",
    hint: "Server is halfway ready, waiting for confirmation.",
    level: "basic",
    codeExample: "netstat -tan | grep SYN_RECV"
  },
  {
    question: "What is TCP Fast Open (TFO) and how does it modify the handshake?",
    shortAnswer: "TFO allows data to be sent in the SYN packet itself, reducing one RTT for subsequent connections.",
    explanation: "TFO uses a cryptographic cookie to validate the client. On the first handshake, server sends cookie; later the client can send data with SYN.",
    hint: "Handshake + data at the same time – like showing a reused ticket and entering immediately.",
    level: "expert",
    codeExample: "sysctl net.ipv4.tcp_fastopen = 3"
  },
  {
    question: "What happens to half-open connections (SYN received but no ACK)?",
    shortAnswer: "They sit in SYN-RCVD queue until timeout (tcp_synack_retries) or are dropped if the queue overflows.",
    explanation: "Each half-open consumes memory; attack (SYN flood) can fill queue. Mitigations include SYN cookies and increasing backlog.",
    hint: "People waiting at reception without confirming – they are eventually turned away.",
    level: "intermediate",
    codeExample: "ss -tan state syn-recv"
  },
  {
    question: "What is the difference between the listen() backlog parameter and the handshake?",
    shortAnswer: "Backlog defines the maximum length of the queue of incomplete (SYN-RCVD) and complete (ESTABLISHED) connections waiting for accept().",
    explanation: "If backlog is exceeded, new SYN packets may be dropped or responded with RST depending on OS.",
    hint: "Restaurant waiting area: backlog = number of chairs. Extra guests are turned away.",
    level: "advanced",
    codeExample: "listen(sockfd, 128);"
  },
  {
    question: "Can TCP handshake be intercepted or spoofed?",
    shortAnswer: "Yes, sequence numbers can be guessed (if weak ISN), allowing spoofing. Modern random ISN + cryptographic mechanisms mitigate it.",
    explanation: "Off‑path attackers cannot see the handshake, but on‑path attackers could hijack. TCP-Auth option (TCP MD5/Signature) adds integrity.",
    hint: "Someone eavesdropping and pretending to be you.",
    level: "expert",
    codeExample: "nmap --script tcp-sequence"
  },
  {
    question: "What role does the TIME_WAIT state play after handshake?",
    shortAnswer: "TIME_WAIT occurs after connection termination, not handshake. But it protects against delayed segments from interfering with new connections using same 4‑tuple.",
    explanation: "Handshake ensures fresh connection; TIME_WAIT ensures old packets expire before a new handshake.",
    hint: "Closing a door and waiting a few seconds before re‑opening to ensure nobody is still in the doorway.",
    level: "intermediate",
    codeExample: "netstat -tan | grep TIME_WAIT"
  },
  {
    question: "How does the TCP handshake work with load balancers?",
    shortAnswer: "Load balancers can terminate the handshake (L4 proxy) or pass through (DPVS). Handshake may be split: client ↔ LB, then LB ↔ backend.",
    explanation: "In full‑proxy mode, LB finishes handshake with client and creates a separate handshake to the backend, allowing caching and inspection.",
    hint: "Like a secretary receiving calls and then dialing the manager.",
    level: "expert",
    codeExample: "HAProxy mode tcp"
  },
  {
    question: "What error does ‘ECONNREFUSED’ indicate during handshake?",
    shortAnswer: "The server responded with a RST because no process listening on that port.",
    explanation: "When SYN arrives at a closed port, the kernel sends RST. connect() system call fails with ECONNREFUSED.",
    hint: "Calling a phone number that is not assigned – dead line.",
    level: "basic",
    codeExample: "socket.connect() → ConnectionRefusedError"
  },
  {
    question: "What is the purpose of ‘tcp_syn_retries’?",
    shortAnswer: "Number of times the client retransmits SYN before giving up.",
    explanation: "If client does not receive SYN-ACK, it resends SYN (exponential backoff). After tcp_syn_retries, ETIMEDOUT error.",
    hint: "Knocking multiple times before leaving.",
    level: "intermediate",
    codeExample: "sysctl net.ipv4.tcp_syn_retries (default 6)"
  },
  {
    question: "What is the difference between a 'passive' and 'active' open?",
    shortAnswer: "Active open = client initiating SYN; Passive open = server listening for incoming SYN.",
    explanation: "Three-way handshake always includes one active opener (client) and one passive opener (server), though simultaneous open is possible.",
    hint: "Active = you dialing; Passive = waiting for calls.",
    level: "basic",
    codeExample: "socket(), bind(), listen() → passive; connect() → active"
  },
  {
    question: "How does NAT (Network Address Translation) affect TCP handshake?",
    shortAnswer: "NAT rewrites source IP/port, keeps mapping so return packets reach the correct client. It maintains a session based on handshake.",
    explanation: "NAT table entries are created after seeing the first SYN. Timeout values remove stale entries.",
    hint: "Post office rewriting return address on every envelope.",
    level: "advanced",
    codeExample: "conntrack -L"
  },
  {
    question: "What is a 'SYN cookie' and when is it used?",
    shortAnswer: "A cryptographic mechanism to avoid storing state for half‑open connections during SYN flood.",
    explanation: "Server encodes ISN, MSS, and timestamp into the initial sequence number itself, reconstructs it when ACK arrives, skipping the SYN-RCVD queue.",
    hint: "Remembering someone's name without writing it down – figure it out from how they greet you.",
    level: "expert",
    codeExample: "echo 1 > /proc/sys/net/ipv4/tcp_syncookies"
  },
  {
    question: "What does the 'tcp_abort_on_overflow' do?",
    shortAnswer: "When the accept queue overflows, instead of dropping the new SYN, it sends RST to the client.",
    explanation: "Defaults to 0 (drop SYN). Setting to 1 aggressively resets when overflow, giving immediate failure.",
    hint: "Instead of ignoring, tell the person 'sorry, full'.",
    level: "expert",
    codeExample: "sysctl net.ipv4.tcp_abort_on_overflow"
  },
  {
    question: "What information is exchanged during handshake besides sequence numbers?",
    shortAnswer: "MSS (Maximum Segment Size), window scale, SACK permitted, timestamps, and other TCP options.",
    explanation: "These options optimize performance (scaling window for high latency, selective ACK).",
    hint: "Not just 'hello' – exchanging business cards with capabilities.",
    level: "advanced",
    codeExample: "tcpdump -v | grep 'options'"
  },
  {
    question: "Why does a port scan (SYN scan) often complete handshake half way?",
    shortAnswer: "SYN scan sends SYN, analyzes SYN-ACK (port open) or RST (closed) and then sends RST instead of ACK to avoid logging.",
    explanation: "This is stealth scanning: handshake never completes, so the application may not log the connection.",
    hint: "Knock, hear a voice, then run away before they see your face.",
    level: "intermediate",
    codeExample: "nmap -sS target"
  },
  {
    question: "What causes a 'TCP Dup ACK' in the handshake?",
    shortAnswer: "Generally happens after handshake, but if ACK packet is lost, retransmitted SYN-ACK leads to duplicate ACK from client.",
    explanation: "If client's ACK is lost, server resends SYN-ACK; client responds with another ACK (duplicate) but same ack number.",
    hint: "You say 'got it', but the other side doesn't hear, so you say 'got it' again.",
    level: "advanced",
    codeExample: "Wireshark filter 'tcp.analysis.ack_rtt'"
  },
  {
    question: "What is 'SYN‑ACK retransmission' after connection established?",
    shortAnswer: "Should not happen if handshake completed; if happens, indicates corruption or asymmetric routing.",
    explanation: "After ESTABLISHED, a late SYN-ACK might arrive – kernel ignores or sends ACK again depending on state.",
    hint: "A delayed letter arriving after you already met – confusing.",
    level: "expert",
    codeExample: "netstat -s | grep -i 'retransmitted'"
  },
  {
    question: "How does ECN (Explicit Congestion Notification) interact with handshake?",
    shortAnswer: "ECN support is negotiated during handshake using TCP flags (ECE/CWR) in SYN and SYN-ACK.",
    explanation: "Both endpoints must echo ECE in SYN; if supported, they can use congestion‑marked packets instead of drops.",
    hint: "Agreeing to use traffic lights instead of crashing.",
    level: "expert",
    codeExample: "sysctl net.ipv4.tcp_ecn = 1"
  },
  {
    question: "What does `SO_KEEPALIVE` do after the handshake?",
    shortAnswer: "Sends keep‑alive probes after idle time to ensure connection is still alive; handshake unrelated but depends on established state.",
    explanation: "Not part of handshake, but ensures that both ends are still reachable.",
    hint: "Handshake opens the door; keep‑alive checks if the other person fell asleep.",
    level: "intermediate",
    codeExample: "setsockopt(sock, SOL_SOCKET, SO_KEEPALIVE, &opt, sizeof(opt));"
  },
  {
    question: "What is the 'PAWS' (Protection Against Wrapped Sequence numbers) and how does it relate to handshake?",
    shortAnswer: "PAWS uses timestamps to reject old segments after sequence number wrap; timestamps are exchanged during handshake.",
    explanation: "Handshake negotiates TCP timestamp option (TSval/TSecr). Without it, wrap would corrupt connection.",
    hint: "Not just numbering – putting dates on each letter.",
    level: "expert",
    codeExample: "tcp_timestamps=1"
  },
  {
    question: "Why does a SYN packet have a sequence number increment but no data?",
    shortAnswer: "TCP treats SYN as consuming one sequence number to ensure reliable ordering of the connection establishment itself.",
    explanation: "Because SYN is a control flag, it must be acknowledged uniquely; subsequent data starts at ISN+1.",
    hint: "The 'hello' takes up one slot in the conversation order.",
    level: "intermediate",
    codeExample: "Wireshark shows relative sequence numbers: 0 (SYN), 1 (ACK of SYN), 1 (first data byte)."
  },
  {
    question: "What happens if both sides send a FIN while handshake is still ongoing?",
    shortAnswer: "Impossible because handshake occurs before FIN (termination). FIN is sent after ESTABLISHED.",
    explanation: "FIN can be sent only in ESTABLISHED/FIN-WAIT states. Handshake must finish before termination starts.",
    hint: "Can't say goodbye before saying hello.",
    level: "basic",
    codeExample: "TCP state diagram: SYN_SENT → ESTABLISHED → FIN_WAIT1"
  },
  {
    question: "How does TCP handle handshake when one side reboots?",
    shortAnswer: "The rebooted side has no knowledge; it may send RST if a stale packet arrives. A fresh SYN restarts handshake.",
    explanation: "The rebooted host's TCP resets all connections. The active side will receive RST (connection reset by peer), then can retry with new SYN.",
    hint: "You had a conversation, then your friend's phone restarts – you need to say 'hello' again from scratch.",
    level: "advanced",
    codeExample: "Errno 104: Connection reset by peer"
  }
];

export default questions;