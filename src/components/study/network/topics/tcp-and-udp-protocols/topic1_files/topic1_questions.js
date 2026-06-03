const questions = [
  {
    question: "Why does TCP need 4 steps to close a connection while only 3 steps open it?",
    shortAnswer: "Because TCP is full‑duplex; each direction must be closed independently, so two FIN/ACK pairs are needed.",
    explanation: "The active closer sends FIN (step 1). The passive closer ACKs it (step 2) – but may still send data. When ready, passive sends its own FIN (step 3) and active ACKs it (step 4).",
    hint: "Imagine two walkie‑talkies: each side must say 'over' and get 'roger'.",
    level: "basic",
    codeExample: "FIN → ACK (half‑close), then FIN ← ACK"
  },
  {
    question: "What is a half‑closed TCP connection?",
    shortAnswer: "One side has sent FIN and received ACK, but the other side continues to send data.",
    explanation: "After step 2, the active closer can no longer send, but can still receive. This is useful for protocols where server says 'no more requests' but client still expects final data.",
    hint: "A door that only closes from one side – you can't enter, but you can hear what's inside.",
    level: "intermediate",
    codeExample: "shutdown(sock, SHUT_WR); // half‑close write direction"
  },
  {
    question: "What causes the TIME_WAIT state and how long does it last?",
    shortAnswer: "TIME_WAIT occurs on the side that sends the final ACK (active closer) and lasts 2×MSL (typically 60 seconds).",
    explanation: "TIME_WAIT ensures that any delayed segments from the connection are discarded before a new connection with same 4‑tuple is created. Prevents old FIN from confusing new connection.",
    hint: "Waiting a minute after closing a door so no one tries to sneak in with an old key.",
    level: "intermediate",
    codeExample: "netstat -an | grep TIME_WAIT"
  },
  {
    question: "What happens if the final ACK (step 4) is lost?",
    shortAnswer: "The passive closer (in LAST_ACK) will retransmit its FIN until timeout, then abort. Active closer in TIME_WAIT will resend the ACK if it sees a retransmitted FIN.",
    explanation: "TIME_WAIT state remembers the connection's sequence numbers and can answer a retransmitted FIN with a duplicate ACK, closing cleanly.",
    hint: "The last 'goodbye' is repeated if not heard.",
    level: "advanced",
    codeExample: "tcpdump 'tcp[tcpflags] & (tcp-fin) != 0'"
  },
  {
    question: "What is the difference between close() and shutdown() regarding TCP termination?",
    shortAnswer: "close() destroys the socket reference and initiates FIN when refcount reaches zero; shutdown() initiates FIN immediately regardless of refcount and can half‑close.",
    explanation: "close() may linger if child processes share the socket. shutdown(sock, SHUT_WR) sends FIN immediately, allowing half‑closed receive.",
    hint: "close() = locking room when last person leaves; shutdown() = turning off the microphone but keep speaker on.",
    level: "expert",
    codeExample: "shutdown(sock, SHUT_RDWR); // both directions"
  },
  {
    question: "What is the SO_LINGER socket option and how does it affect termination?",
    shortAnswer: "SO_LINGER controls whether close() blocks until data is sent and ACKed (linger) or discards pending data and sends RST (linger 0).",
    explanation: "With linger enabled and timeout>0, close() blocks until all data acknowledged or timeout. Linger 0 → urgent RST instead of FIN, losing pending data.",
    hint: "Do you wait for the last words (linger) or hang up immediately (RST)?",
    level: "expert",
    codeExample: "struct linger l = {1, 10}; setsockopt(sock, SOL_SOCKET, SO_LINGER, &l, sizeof(l));"
  },
  {
    question: "What does the CLOSE_WAIT state indicate?",
    shortAnswer: "The passive closer has received FIN (step 1) and sent ACK (step 2) but the local application hasn't called close() yet.",
    explanation: "Application still holds the socket open; CLOSE_WAIT means the remote side has closed, but local side hasn't. Leaked CLOSE_WAIT sockets waste resources.",
    hint: "Remote says 'I'm done' but you haven't hung up the phone.",
    level: "intermediate",
    codeExample: "ss -tan | grep CLOSE-WAIT"
  },
  {
    question: "How can a TCP reset (RST) terminate a connection instead of FIN?",
    shortAnswer: "RST aborts the connection immediately without any handshake. It indicates an error (port unreachable, crash, timeout).",
    explanation: "RST is generated when a segment arrives for a non‑existing connection, or when the application calls close() with SO_LINGER zero. It bypasses TIME_WAIT.",
    hint: "Slamming the door instead of closing gently.",
    level: "advanced",
    codeExample: "Errno 104: Connection reset by peer"
  },
  {
    question: "Why does my server show many connections in TIME_WAIT after high load?",
    shortAnswer: "Each short‑lived connection (e.g., HTTP/1.0 without keep‑alive) leaves TIME_WAIT on the active closer (client). If server initiates close, server accumulates TIME_WAIT.",
    explanation: "TIME_WAIT is normal, but excessive accumulation can exhaust port range (ephemeral ports) or socket descriptors. Solutions: reuse addresses, increase port range, or enable SO_REUSEADDR.",
    hint: "Many leftover nametags after a party – they'll disappear after 60 seconds.",
    level: "expert",
    codeExample: "sysctl net.ipv4.ip_local_port_range"
  },
  {
    question: "What is the purpose of 'linger2' in TCP (tcp_fin_timeout)?",
    shortAnswer: "linux kernel parameter that controls the time orphaned sockets remain in FIN_WAIT_2 before being closed.",
    explanation: "If the peer never sends its FIN, the socket could stay in FIN_WAIT_2 forever. tcp_fin_timeout (default 60s) forces closure.",
    hint: "How long to wait for the other side to say goodbye before hanging up.",
    level: "expert",
    codeExample: "sysctl net.ipv4.tcp_fin_timeout"
  },
  {
    question: "Can a connection be half‑open (handshake never completed) and half‑closed (termination half way) at the same time?",
    shortAnswer: "No, half‑open refers to handshake not finished; half‑closed refers to a fully established connection where one side has sent FIN.",
    explanation: "Half‑open – SYN sent but no SYN-ACK. Half‑closed – ESTABLISHED then FIN/ACK exchanged in one direction only.",
    hint: "Half‑open = phone ringing but no answer; half‑closed = conversation but one person stops speaking.",
    level: "advanced",
    codeExample: "Different TCP state diagrams"
  },
  {
    question: "How does an HTTP keep‑alive connection affect termination?",
    shortAnswer: "Connection remains ESTABLISHED after response, and either side can send FIN after idle timeout or explicit close.",
    explanation: "Keep‑alive avoids repeated handshakes. Termination still uses 4‑way handshake, but may be initiated by server after keep‑alive timeout.",
    hint: "Staying on the line for multiple questions; finally one says 'I'm done'.",
    level: "intermediate",
    codeExample: "Connection: keep-alive header"
  },
  {
    question: "What is the TCP state after the active closer receives the second FIN and sends the final ACK?",
    shortAnswer: "TIME_WAIT (unless the active closer sends RST instead, which jumps straight to CLOSED).",
    explanation: "TIME_WAIT lasts 2×MSL. During this period, the 4‑tuple cannot be reused (unless SO_REUSEADDR is set).",
    hint: "Finished conversation but staying in the room for a minute to avoid confusion.",
    level: "basic",
    codeExample: "ss -tan state time-wait"
  },
  {
    question: "What is the maximum segment lifetime (MSL) and why is 2×MSL used?",
    shortAnswer: "MSL is the maximum time a TCP segment can survive in the network. 2×MSL ensures both directions of any lingering segment expire.",
    explanation: "Common MSL = 30s, 60s, or 120s. 2×MSL allows for a delayed FIN from the peer to be retransmitted and responded to while the connection's state is still remembered.",
    hint: "How long a letter can wander undelivered before being destroyed.",
    level: "advanced",
    codeExample: "RFC 793 recommends 2 minutes (120s)."
  },
  {
    question: "What happens if a FIN is sent but no ACK is ever received (due to network partition)?",
    shortAnswer: "The sender retransmits FIN a few times, then gives up and aborts the connection, sending RST if any further data arrives.",
    explanation: "Retransmission timer is similar to SYN retries. After tcp_orphan_retries, connection is aborted. The other side may be stuck in a half‑open state.",
    hint: "Shouting 'goodbye' into a dead phone – eventually you hang up.",
    level: "expert",
    codeExample: "sysctl net.ipv4.tcp_orphan_retries"
  },
  {
    question: "What does the 'tcp_tw_reuse' sysctl do? (Linux)",
    shortAnswer: "Allows reusing a TIME_WAIT socket for new connections if certain conditions are met (safe for clients).",
    explanation: "Reuse reduces port exhaustion for client connections. Does not work for servers unless paired with timestamps. Dangerous to use for servers.",
    hint: "Re‑using a table as soon as the previous guest leaves, but only if you know they won't come back.",
    level: "expert",
    codeExample: "echo 1 > /proc/sys/net/ipv4/tcp_tw_reuse"
  },
  {
    question: "What is the 'tcp_tw_recycle' option and why was it removed?",
    shortAnswer: "tcp_tw_recycle allowed faster reuse of TIME_WAIT but caused issues with NAT (mixing different clients). Removed in Linux 4.12.",
    explanation: "Cycling TIME_WAIT too aggressively broke connections behind NAT because timestamps from different clients collided.",
    hint: "Opening the door too quickly after closing – someone might walk in from the wrong room.",
    level: "expert",
    codeExample: "Removed; use tcp_tw_reuse instead."
  },
  {
    question: "How does a TCP keep‑alive probe relate to termination?",
    shortAnswer: "Keep‑alive probes detect dead peers; after failures, the connection is aborted with RST rather than a FIN handshake.",
    explanation: "If keep‑alive fails, the connection is forcefully closed without 4‑way handshake. It's an error termination.",
    hint: "Checking if the other person is still alive; otherwise dropping the line.",
    level: "intermediate",
    codeExample: "sysctl net.ipv4.tcp_keepalive_time"
  },
  {
    question: "Why does a FIN consume a sequence number just like a SYN?",
    shortAnswer: "FIN also occupies one sequence number to ensure reliable acknowledgment.",
    explanation: "This allows retransmission if ACK for FIN is lost. The sequence number for FIN is the next byte after the last data sent.",
    hint: "Saying 'goodbye' counts as one word in the conversation log.",
    level: "advanced",
    codeExample: "TCP segment: seq=1000, FIN, ack=500 → consumes sequence 1000."
  },
  {
    question: "What is a 'zombie' connection?",
    shortAnswer: "A connection stuck in CLOSE_WAIT or FIN_WAIT_2 indefinitely due to a buggy application not calling close().",
    explanation: "Such connections waste kernel memory and file descriptors. They never complete termination until the process exits or system reboot.",
    hint: "A ghost that never leaves the room.",
    level: "intermediate",
    codeExample: "lsof -i TCP -a -p <pid>"
  },
  {
    question: "How does the TCP_FIN_WAIT2 state behave when receiving more data?",
    shortAnswer: "If the active closer is in FIN_WAIT_2 and receives data, it sends ACK but continues waiting; peer should not send data after its FIN.",
    explanation: "Receiving data after sending FIN is unusual but not invalid until the remote FIN arrives. The data is accepted and ACKed.",
    hint: "You've said goodbye, but the other side keeps talking – you listen but don't respond.",
    level: "expert",
    codeExample: "tcpdump 'tcp[13] & 1 != 0'"
  },
  {
    question: "Can the two FINs be combined into one packet?",
    shortAnswer: "No, because each FIN closes a different direction. They may be sent simultaneously only in simultaneous close scenario.",
    explanation: "Simultaneous close occurs when both sides send FIN at the same time. Then each FIN‑ACK acknowledges the other FIN. Still 4 packets but cross‑paired.",
    hint: "Both saying 'goodbye' at the same moment.",
    level: "advanced",
    codeExample: "State: FIN_WAIT_1 from both sides."
  },
  {
    question: "What happens to the socket buffer when close() is called with unread data?",
    shortAnswer: "By default, TCP will still send FIN after buffered data is transmitted (if not set SO_LINGER 0). Unread receive data is lost.",
    explanation: "The socket will linger (unless SO_LINGER zero) and send pending transmit data, but any pending receive data is discarded.",
    hint: "If you walk away while someone is still talking to you, you miss what they say.",
    level: "expert",
    codeExample: "SO_LINGER with zero→RST, losing both directions."
  },
  {
    question: "What is the 'TTL' effect on FIN packets?",
    shortAnswer: "FIN packets have the same TTL as data packets; if TTL expires, FIN is dropped and may be retransmitted.",
    explanation: "FIN is just a TCP segment with a flag; it's subject to IP TTL decrement. No special handling.",
    hint: "Goodbye also needs to survive the journey.",
    level: "intermediate",
    codeExample: "ping -c 1 -t 32 example.com"
  },
  {
    question: "How does a load balancer handle TCP termination from backend?",
    shortAnswer: "Load balancer proxies termination: client ↔ LB connection and LB ↔ backend connection. Each connection terminates independently.",
    explanation: "The LB may send FIN to the backend while keeping client connection open, or vice versa, depending on application needs.",
    hint: "A receptionist hanging up on one person while still on the phone with another.",
    level: "expert",
    codeExample: "HAProxy 'option httpclose'"
  },
  {
    question: "What is the difference between RST and FIN regarding resource cleanup?",
    shortAnswer: "RST immediately removes the connection state (no TIME_WAIT); FIN goes through TIME_WAIT to protect against delayed segments.",
    explanation: "RST is abrupt; any data in flight is lost, but system resources freed faster. FIN is graceful and safe.",
    hint: "RST = pulling the plug; FIN = proper shutdown sequence.",
    level: "intermediate",
    codeExample: "setsockopt SO_LINGER with zero → RST"
  },
  {
    question: "What does the TIME_WAIT assassination (RFC 1337) refer to?",
    shortAnswer: "Premature termination of TIME_WAIT when a new SYN with same 4‑tuple arrives, causing old segments to be accepted.",
    explanation: "A delayed FIN from old connection can be mistaken for a new connection's segment. Fix: reject SYN if TIME_WAIT connection exists without timestamps.",
    hint: "Reopening a room before the ghost of the previous occupant has left.",
    level: "expert",
    codeExample: "tcp_timestamps=1 protects against this."
  },
  {
    question: "What is the correct order of calls to close a connection gracefully without data loss?",
    shortAnswer: "shutdown(sock, SHUT_WR) to send FIN, read until EOF (0 bytes), then close().",
    explanation: "This ensures you receive all data the peer sends before closing. The read loop returns 0 when peer sends its FIN.",
    hint: "Shut your mouth, listen until the other side finishes, then hang up.",
    level: "intermediate",
    codeExample: "while (recv(sock, buf, sizeof(buf)) > 0); close(sock);"
  },
  {
    question: "How does TCP handle a simultaneous close scenario?",
    shortAnswer: "Both sides send FIN simultaneously, each acknowledges the other's FIN, both enter TIME_WAIT, then closed.",
    explanation: "This still requires 4 segments but cross‑paired. Both sides become active closers.",
    hint: "Two people saying 'goodbye' at the same time, then both wait briefly.",
    level: "expert",
    codeExample: "State: FIN_WAIT_1 → CLOSING → TIME_WAIT."
  }
];

export default questions;