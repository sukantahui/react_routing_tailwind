const questions = [
  {
    question: "What is the main difference between UDP and TCP regarding connection establishment?",
    shortAnswer: "UDP is connectionless – no handshake; TCP requires a 3‑way handshake.",
    explanation: "UDP simply sends datagrams to a destination IP/port without any prior setup or teardown.",
    hint: "One requires a 'hello' exchange; the other just shouts.",
    level: "basic",
    codeExample: "udp_socket.sendto(data, (ip, port)) // no connect() needed"
  },
  {
    question: "Why does UDP have a checksum if it doesn't guarantee reliability?",
    shortAnswer: "The checksum detects corruption in transit, but corrupted packets are discarded, not retransmitted.",
    explanation: "UDP checksum protects against bit errors. If invalid, packet is dropped silently – no error message to application. Optional in IPv4 but mandatory in IPv6.",
    hint: "Check if a letter is ripped, but if it is, you just throw it away.",
    level: "intermediate",
    codeExample: "udp checksum = ~(sum(source IP pseudo header + UDP header + data))"
  },
  {
    question: "Can UDP guarantee that packets are delivered in order?",
    shortAnswer: "No. UDP provides no ordering guarantees. Packets may arrive out of order, duplicated, or lost.",
    explanation: "Since there are no sequence numbers, the receiver cannot reorder or detect loss. Applications must handle reordering if needed.",
    hint: "Postcards dropped into a windy street – they might reach in a different order.",
    level: "basic",
    codeExample: "If packet 2 arrives before packet 1, the application sees packet 2 first."
  },
  {
    question: "What happens when a UDP packet is larger than the MTU (Maximum Transmission Unit)?",
    shortAnswer: "It will be fragmented at the IP layer. If any fragment is lost, the entire datagram is discarded.",
    explanation: "UDP itself is unaware of MTU. IP fragmentation splits the datagram. Loss of one fragment = whole packet lost. Best to keep UDP datagrams under 1472 bytes (for Ethernet).",
    hint: "A big package cut into smaller boxes – if one box is lost, you can't assemble the big item.",
    level: "advanced",
    codeExample: "socket.setsockopt(IPPROTO_IP, IP_MTU_DISCOVER, IP_PMTUDISC_DO)"
  },
  {
    question: "Why is UDP used for DNS even though reliability is important?",
    shortAnswer: "DNS queries and responses typically fit in 512 bytes, fit in one packet. Loss is handled by retransmission at application layer.",
    explanation: "UDP is fast and stateless. DNS retries after timeout (e.g., 5 seconds). For large responses (>512 bytes), DNS falls back to TCP.",
    hint: "When a question is short and you can ask again if no answer, you don't need a full conversation.",
    level: "intermediate",
    codeExample: "dig +recurse example.com +udp"
  },
  {
    question: "What is the maximum size of a UDP datagram including header?",
    shortAnswer: "65535 bytes (64KB) – because the Length field is 16 bits.",
    explanation: "But due to IP layer limits, the actual maximum is often less (MTU). Practically, UDP applications stay under 64KB.",
    hint: "The UDP length field can count up to 65535.",
    level: "basic",
    codeExample: "65507 bytes of payload max (65535 - 8 UDP header)"
  },
  {
    question: "Why does UDP not have congestion control, and what problem does that cause?",
    shortAnswer: "UDP can flood the network, causing packet loss for all flows (including TCP) because it doesn't slow down.",
    explanation: "Real‑time apps use UDP to avoid delays, but without congestion control they can cause network collapse. That's why Google developed QUIC (UDP with congestion control).",
    hint: "A few people shouting can silence the whole room.",
    level: "expert",
    codeExample: "TCP reduces send rate on loss; UDP continues at full speed."
  },
  {
    question: "What is a UDP socket's behavior when sending to a closed port?",
    shortAnswer: "The sender typically gets no error. The receiver's OS may send back an ICMP Port Unreachable, but UDP is silent.",
    explanation: "UDP has no built‑in error feedback. Applications relying on ICMP may use connect() + getsockopt() to detect, but it's unreliable.",
    hint: "You throw a ball at a closed door – no one tells you it's closed unless you ask.",
    level: "intermediate",
    codeExample: "connect() on UDP socket allows error detection via getsockopt(SO_ERROR)"
  },
  {
    question: "What is the role of port numbers in UDP?",
    shortAnswer: "Port numbers multiplex/demultiplex datagrams to the correct application process on a host.",
    explanation: "Just like TCP, UDP uses source and destination ports. A UDP socket is identified by (local IP, local port).",
    hint: "Apartment numbers in a building – the address (IP) gets you to the building, the port gets you to the right occupant.",
    level: "basic",
    codeExample: "bind(sock, (ip, 12345))"
  },
  {
    question: "What is the difference between `sendto()` and `send()` on a UDP socket?",
    shortAnswer: "`sendto()` specifies destination address per call; `send()` requires the socket to be connected (using `connect()`).",
    explanation: "`connect()` on UDP does not handshake, it just sets the default destination address. Then `send()`/`recv()` can be used.",
    hint: "Send to anyone each time vs. telling the post office a fixed address.",
    level: "intermediate",
    codeExample: "sock.connect((host, port)); sock.send(data) // same as sendto with saved addr"
  },
  {
    question: "Can UDP be used for broadcast or multicast?",
    shortAnswer: "Yes, UDP supports both broadcast (send to all on subnet) and multicast (send to subscribed group).",
    explanation: "Broadcast (255.255.255.255) is UDP only; TCP is connection‑oriented and cannot broadcast.",
    hint: "Shouting 'hello' to everyone vs. sending a message to a club group.",
    level: "intermediate",
    codeExample: "sock.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)"
  },
  {
    question: "What is a UDP 'connected' socket and how does it differ from unconnected?",
    shortAnswer: "A connected UDP socket has a fixed remote address via `connect()`, allowing error returns and filtering of other sources.",
    explanation: "Connected UDP: only packets from that remote address are received; other sources are dropped. Also, asynchronous errors (ICMP) are reported to the socket.",
    hint: "Filtering: only listen to one person, ignore others.",
    level: "advanced",
    codeExample: "connect(sock, (ip, port)); recv(sock, buf) // only from that address"
  },
  {
    question: "Why does the UDP header not include sequence numbers or acknowledgments?",
    shortAnswer: "To keep the header minimal (8 bytes) and reduce processing overhead, achieving low latency.",
    explanation: "UDP was designed for simple, fast datagram delivery. Adding reliability would require state and overhead, defeating its purpose.",
    hint: "Less baggage = faster travel.",
    level: "basic",
    codeExample: "UDP header: src port, dst port, length, checksum"
  },
  {
    question: "What is the typical UDP packet loss behavior during network congestion?",
    shortAnswer: "UDP packets are dropped by routers before TCP because UDP does not react to congestion. Tail drop or AQM discards UDP packets more aggressively.",
    explanation: "Some network policies give lower priority to UDP (e.g., gaming vs. TCP web). UDP flows can be starved if TCP flows back off.",
    hint: "The polite ones (TCP) step back; the pushy ones (UDP) get dropped.",
    level: "expert",
    codeExample: "Use FQ-CoDel to balance UDP vs TCP."
  },
  {
    question: "How does NAT handle UDP?",
    shortAnswer: "NAT creates mapping (IP:port) based on outbound UDP datagrams and uses a timeout (typically 30–120 seconds) to keep the mapping alive.",
    explanation: "Since UDP has no connection state, NAT assumes flow is active as long as packets are seen. Regular keep‑alives are needed to prevent mapping expiry.",
    hint: "NAT remembers you sent a letter and forwards replies, but forgets after a few minutes of silence.",
    level: "advanced",
    codeExample: "UDP hole punching for P2P"
  },
  {
    question: "What is the `SO_RCVBUF` effect on UDP?",
    shortAnswer: "It sets the size of the kernel receive buffer. If full, incoming UDP packets are dropped silently.",
    explanation: "UDP drops packets when the buffer overflows. No backpressure to sender. Increase buffer for bursty traffic to reduce loss.",
    hint: "A mailbox too small – letters fall on the ground and are never seen.",
    level: "intermediate",
    codeExample: "sysctl net.core.rmem_default"
  },
  {
    question: "Why do online games use UDP instead of TCP?",
    shortAnswer: "UDP's low latency and lack of head‑of‑line blocking are critical for real‑time action. A lost packet is better than waiting for retransmission.",
    explanation: "TCP's retransmission and in‑order delivery can cause lag (wait for missing packet). UDP lets the game extrapolate or skip.",
    hint: "In a race, it's better to miss one frame than to freeze the whole screen.",
    level: "intermediate",
    codeExample: "Game sends position updates 60x/sec over UDP"
  },
  {
    question: "What is the purpose of the UDP Length field?",
    shortAnswer: "Length indicates the total size of UDP datagram (header + payload) in bytes.",
    explanation: "Minimum 8 (header only). Allows receiver to know how much data to read from IP datagram. Redundant with IP length but included for easier parsing.",
    hint: "Tells you how big the envelope is, including the stamp.",
    level: "basic",
    codeExample: "UDP length = 8 + payload length"
  },
  {
    question: "How does UDP checksum calculation differ from TCP?",
    shortAnswer: "Both use a pseudo‑header (source IP, dest IP, protocol, length) plus the segment. UDP checksum is optional in IPv4.",
    explanation: "If UDP checksum is zero, no checksum verification is performed (IPv4 only). IPv6 requires it.",
    hint: "Optional safety net in IPv4, mandatory in IPv6.",
    level: "advanced",
    codeExample: "checksum includes source and destination IP from IP header"
  },
  {
    question: "What is the 'UDP encapsulation' or 'UDP tunnel' used for?",
    shortAnswer: "Encapsulating other protocols inside UDP to traverse firewalls or add features (e.g., VPNs like WireGuard).",
    explanation: "Many networks allow UDP (DNS, NTP) but block other IP protocols. UDP tunnels carry IP packets inside UDP to bypass restrictions.",
    hint: "Hiding a letter inside a postcard envelope.",
    level: "expert",
    codeExample: "OpenVPN UDP mode, WireGuard uses UDP"
  },
  {
    question: "Can you use `recvfrom()` to get the source address of a UDP packet?",
    shortAnswer: "Yes, `recvfrom()` returns the source IP and port of the received datagram.",
    explanation: "This allows a single UDP socket to receive from multiple clients and reply appropriately.",
    hint: "The return address on a postcard.",
    level: "basic",
    codeExample: "data, addr = sock.recvfrom(1024)"
  },
  {
    question: "What is the difference between `sendto()` and `sendmsg()` for UDP?",
    shortAnswer: "`sendmsg()` allows sending ancillary data (control messages) such as timestamps, IP options, or specifying interface.",
    explanation: "`sendto()` is simpler. `sendmsg()` with `struct msghdr` provides advanced features like send with specific TTL or destination address in control data.",
    hint: "Basic vs. certified mail with extra instructions.",
    level: "advanced",
    codeExample: "sendmsg(fd, &msg, 0) where msg.msg_control contains IP_TTL"
  },
  {
    question: "Why does UDP sometimes show 'connection refused' when using `connect()`?",
    shortAnswer: "If `connect()` was used on a UDP socket and an ICMP port unreachable is received, subsequent operations can return ECONNREFUSED.",
    explanation: "`connect()` tells the kernel to remember the peer. When ICMP error arrives, the socket error queue stores it, causing `send()`/`recv()` to return error.",
    hint: "You told the post office where you're sending; if that address doesn't exist, they may inform you later.",
    level: "expert",
    codeExample: "errno = ECONNREFUSED on send() after ICMP unreachable"
  },
  {
    question: "What is the advantage of UDP over TCP in high‑bandwidth streaming?",
    shortAnswer: "No congestion control allows near line‑rate sending, but can harm others. Many use custom rate control (e.g., WebRTC's GCC).",
    explanation: "Video streaming may use UDP with application‑level congestion control (like BBR or GCC) to adapt while avoiding TCP's sawtooth pattern.",
    hint: "You can drive as fast as you want, but you may cause accidents.",
    level: "expert",
    codeExample: "WebRTC uses UDP with a congestion controller."
  },
  {
    question: "What is the 'UDP hole punching' technique?",
    shortAnswer: "A method to establish direct UDP communication between two hosts behind NATs using a third‑party server.",
    explanation: "Each client sends a packet to the server, opening NAT mapping. Server exchanges endpoints, then clients send directly to each other's NAT‑mapped IP:port.",
    hint: "Two people shout to a referee, the referee tells them where the other is shouting from.",
    level: "expert",
    codeExample: "Used by BitTorrent, Zoom, Skype."
  },
  {
    question: "Does UDP guarantee data integrity beyond checksum?",
    shortAnswer: "No. If checksum is correct, the packet is assumed intact, but there is no end‑to‑end verification.",
    explanation: "UDP does not provide cryptographic integrity. Applications needing security should use DTLS (UDP version of TLS).",
    hint: "Checksum catches random errors, not intentional tampering.",
    level: "intermediate",
    codeExample: "DTLS over UDP for secure VoIP"
  },
  {
    question: "What is the purpose of `IPPROTO_UDPLITE`?",
    shortAnswer: "A variant of UDP where the checksum covers only part of the payload, allowing corrupted data to be partially usable (e.g., video codecs).",
    explanation: "UDPLite is defined in RFC 3828. It enables checksum coverage of only the header and a portion of data. Useful for robust real‑time media.",
    hint: "If a picture has a few corrupted pixels, you still want to see the rest.",
    level: "expert",
    codeExample: "socket(AF_INET, SOCK_DGRAM, IPPROTO_UDPLITE)"
  },
  {
    question: "What is the default UDP receive buffer size in Linux?",
    shortAnswer: "Typically 212992 bytes (around 208 KiB) as of recent kernels, but adjustable.",
    explanation: "`net.core.rmem_default` and `net.core.rmem_max`. For high‑rate UDP, increase buffer to reduce drops.",
    hint: "Default mailbox size; if too many letters, some are lost.",
    level: "intermediate",
    codeExample: "sysctl net.core.rmem_default"
  },
  {
    question: "How does `send()` behave on a UDP socket when the interface queue is full?",
    shortAnswer: "It returns -1 with errno = ENOBUFS (or EAGAIN if non‑blocking).",
    explanation: "The kernel's outgoing queue for the network interface is full. UDP does not block indefinitely unless socket is blocking.",
    hint: "Postman's bag is full – you must try again later.",
    level: "advanced",
    codeExample: "ENOBUFS – increase netdev_max_backlog or txqueuelen"
  }
];

export default questions;