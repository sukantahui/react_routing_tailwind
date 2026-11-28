export default [
  {
    "id": 1,
    "question": "What are the two primary foundational protocols of the Internet protocol suite that give it the name TCP/IP?",
    "options": [
      "Telnet Control Protocol and Internet Protocol",
      "Transmission Control Protocol and Internet Protocol",
      "Total Communication Protocol and Information Protocol",
      "Terminal Client Protocol and Interface Protocol"
    ],
    "correctAnswer": 1,
    "explanation": "TCP/IP stands for Transmission Control Protocol (operating at the Transport Layer) and Internet Protocol (operating at the Network/Internet Layer).",
    "hint": "Transmission Control Protocol & Internet Protocol."
  },
  {
    "id": 2,
    "question": "Which of the following functions is primarily performed by the Internet Protocol (IP)?",
    "options": [
      "Establishing connection-oriented 3-way handshakes.",
      "Logical addressing and best-effort packet routing across intermediate networks.",
      "Retransmitting lost segments.",
      "Encrypting application data using SSL."
    ],
    "correctAnswer": 1,
    "explanation": "IP is responsible for host logical addressing (IP addresses) and routing packets across interconnected networks from source to destination.",
    "hint": "Addressing and packet routing."
  },
  {
    "id": 3,
    "question": "Why is the Internet Protocol (IP) described as a 'Connectionless' and 'Best-Effort' protocol?",
    "options": [
      "Because it costs no money to transmit packets.",
      "Because IP does not establish a prior session and does not guarantee delivery, order, or uncorrupted transit of packets.",
      "Because it only works on wireless connections.",
      "Because it never loses any data packets under any condition."
    ],
    "correctAnswer": 1,
    "explanation": "IP delivers packets independently on a best-effort basis without delivery confirmation or retransmission; reliability is delegated to TCP.",
    "hint": "Best-effort means no delivery guarantees at Layer 3."
  },
  {
    "id": 4,
    "question": "What critical service does TCP provide on top of the unreliable, best-effort IP layer?",
    "options": [
      "Analog frequency modulation.",
      "Reliable, connection-oriented, ordered byte-stream delivery with error checking and retransmission of lost packets.",
      "Graphic rendering for web browsers.",
      "DNS domain name registration."
    ],
    "correctAnswer": 1,
    "explanation": "TCP turns the unreliable packet service of IP into a reliable, sequenced, connection-oriented byte stream using sequence numbers and ACKs.",
    "hint": "Reliable, sequenced, connection-oriented delivery."
  },
  {
    "id": 5,
    "question": "How does TCP guarantee that out-of-order received packets are assembled in the exact original sequence?",
    "options": [
      "By using 32-bit Sequence Numbers attached to every segment.",
      "By transmitting only one byte per minute.",
      "By requiring all packets to travel along the exact same fiber optic cable.",
      "By storing the file in the router's hard disk."
    ],
    "correctAnswer": 0,
    "explanation": "Each TCP segment header contains a Sequence Number; the receiver's TCP buffer uses these numbers to sort and reconstruct the exact original byte stream.",
    "hint": "Sequence numbers ensure correct ordering."
  },
  {
    "id": 6,
    "question": "What is the three-step procedure called that TCP uses to establish a reliable connection before transmitting data?",
    "options": [
      "Three-Phase Commit",
      "Three-Way Handshake (SYN, SYN-ACK, ACK)",
      "Triple DES Encryption",
      "Ternary Routing"
    ],
    "correctAnswer": 1,
    "explanation": "The TCP 3-way handshake uses SYN (synchronize), SYN-ACK (synchronize-acknowledge), and ACK (acknowledge) control flags to synchronize initial sequence numbers.",
    "hint": "SYN, SYN-ACK, ACK."
  },
  {
    "id": 7,
    "question": "Which field in the IPv4 header prevents packets from endlessly looping around misconfigured routing loops?",
    "options": [
      "Header Checksum",
      "TTL (Time to Live)",
      "Fragment Offset",
      "Version"
    ],
    "correctAnswer": 1,
    "explanation": "The TTL field is decremented by 1 at each router hop; when TTL reaches 0, the packet is discarded and an ICMP Time Exceeded message is sent to the sender.",
    "hint": "Time to Live decrementing hop counter."
  },
  {
    "id": 8,
    "question": "What is the size of an IPv4 address compared to an IPv6 address?",
    "options": [
      "IPv4 is 16 bits; IPv6 is 32 bits.",
      "IPv4 is 32 bits (4 bytes); IPv6 is 128 bits (16 bytes).",
      "IPv4 is 48 bits; IPv6 is 64 bits.",
      "IPv4 is 64 bits; IPv6 is 256 bits."
    ],
    "correctAnswer": 1,
    "explanation": "IPv4 uses 32 bits (4.3 billion possible addresses); IPv6 was introduced to solve IPv4 address exhaustion using 128 bits.",
    "hint": "32 bits vs 128 bits."
  },
  {
    "id": 9,
    "question": "Which alternative Transport Layer protocol in the TCP/IP suite is connectionless, lightweight, and preferred for real-time video streaming and gaming?",
    "options": [
      "UDP (User Datagram Protocol)",
      "FTP",
      "SNMP",
      "BGP"
    ],
    "correctAnswer": 0,
    "explanation": "UDP does not establish a handshake or retransmit lost packets, providing minimal latency essential for real-time voice, video, and gaming.",
    "hint": "User Datagram Protocol."
  },
  {
    "id": 10,
    "question": "How many layers are formally defined in the standard TCP/IP architectural model?",
    "options": [
      "7 Layers",
      "4 Layers (Application, Transport, Internet, Network Access)",
      "10 Layers",
      "2 Layers"
    ],
    "correctAnswer": 1,
    "explanation": "The TCP/IP model has 4 layers: Application, Transport, Internet, and Network Access (Link/Physical).",
    "hint": "Application, Transport, Internet, Network Access."
  },
  {
    "id": 11,
    "question": "What role do Port Numbers play in the TCP/IP suite?",
    "options": [
      "They identify the brand of the computer's CPU.",
      "They identify the specific software process or application on a host that should receive incoming data.",
      "They specify the physical socket where the USB drive is plugged in.",
      "They measure the length of the Ethernet cable in meters."
    ],
    "correctAnswer": 1,
    "explanation": "Port numbers (0 to 65535) multiplex traffic, enabling multiple network applications (e.g., port 80 for web, port 25 for mail) to run concurrently on one host.",
    "hint": "Process-to-process addressing."
  },
  {
    "id": 12,
    "question": "What is the combination of an IP address and a Port Number formally termed?",
    "options": [
      "A MAC address",
      "A Socket (or Endpoint)",
      "A Subnet Mask",
      "A Gateway"
    ],
    "correctAnswer": 1,
    "explanation": "An IP address combined with a port number (e.g., `192.168.1.10:8080`) forms a Network Socket, uniquely identifying a specific process communication channel.",
    "hint": "IP + Port = Socket."
  },
  {
    "id": 13,
    "question": "In TCP, what mechanism ensures that a fast transmitting server does not overwhelm a slow client smartphone?",
    "options": [
      "Sliding Window Flow Control",
      "Data Inversion",
      "Clock Doubling",
      "Voltage Clamping"
    ],
    "correctAnswer": 0,
    "explanation": "The TCP Sliding Window allows the receiver to advertise its available buffer space (Window Size) in ACK headers, dynamically throttling the sender.",
    "hint": "Sliding Window."
  },
  {
    "id": 14,
    "question": "What is 'Packet Fragmentation' performed by the Internet Protocol (IP)?",
    "options": [
      "Splitting a large IP packet into smaller fragments to accommodate a network path with a smaller MTU (Maximum Transmission Unit).",
      "Defragmenting a computer's hard drive across the network.",
      "Compressing JPEG image files into thumbnails.",
      "Deleting spam emails automatically."
    ],
    "correctAnswer": 0,
    "explanation": "When a packet exceeds the MTU of a transit network link (e.g., 1500 bytes for Ethernet), IP fragments the packet and reassembles it at the destination.",
    "hint": "Splitting to fit link MTU size."
  },
  {
    "id": 15,
    "question": "What happens when TCP does not receive an Acknowledgement (ACK) for a transmitted segment within the Retransmission Timeout (RTO) period?",
    "options": [
      "TCP assumes the segment was lost or corrupted and retransmits the segment.",
      "TCP immediately crashes the operating system.",
      "TCP sends an error message to the police.",
      "TCP switches the user's connection to dial-up mode."
    ],
    "correctAnswer": 0,
    "explanation": "TCP uses positive acknowledgement with retransmission: if the ACK timer expires without receiving an ACK, TCP automatically retransmits the segment.",
    "hint": "Automatic retransmission upon timeout."
  },
  {
    "id": 16,
    "question": "Which of the following is a Well-Known Port number according to IANA standards?",
    "options": [
      "Port 80 (HTTP)",
      "Port 22 (SSH)",
      "Port 25 (SMTP)",
      "All of the above"
    ],
    "correctAnswer": 3,
    "explanation": "Well-known ports range from 0 to 1023: Port 80 is HTTP, Port 22 is SSH, Port 25 is SMTP, Port 443 is HTTPS.",
    "hint": "0-1023 are standard well-known service ports."
  },
  {
    "id": 17,
    "question": "Which TCP control flag is used to gracefully close and terminate an active TCP connection?",
    "options": [
      "SYN",
      "ACK",
      "FIN",
      "URG"
    ],
    "correctAnswer": 2,
    "explanation": "The FIN (Finish) flag is set in a segment to announce that the sender has finished transmitting data and requests connection termination.",
    "hint": "FIN = Finish."
  },
  {
    "id": 18,
    "question": "What is the primary role of the Header Checksum field in an IPv4 header?",
    "options": [
      "To verify that only the IPv4 header itself (excluding payload) has not suffered bit corruption during transit.",
      "To encrypt the entire user password.",
      "To calculate the total cost of internet bandwidth used.",
      "To store the user's Google account ID."
    ],
    "correctAnswer": 0,
    "explanation": "The IPv4 Header Checksum protects only the header fields. Because TTL changes at every router, each router must recompute the header checksum.",
    "hint": "Protects header integrity at each hop."
  },
  {
    "id": 19,
    "question": "Why was the Header Checksum eliminated in IPv6 headers?",
    "options": [
      "To simplify router processing speed, since Layer 2 and Layer 4 already perform robust checksum verifications.",
      "Because IPv6 cables never cause errors.",
      "Because IPv6 does not support headers.",
      "To make packets larger."
    ],
    "correctAnswer": 0,
    "explanation": "Eliminating the header checksum in IPv6 avoids recalculating checksums at every intermediate router hop, accelerating packet forwarding.",
    "hint": "Speed up router hop processing."
  },
  {
    "id": 20,
    "question": "What is an 'Ephemeral Port' in client-side TCP/IP communications?",
    "options": [
      "A permanent port used exclusively by web servers.",
      "A short-lived, dynamically allocated client port chosen from range 49152-65535 to receive server responses.",
      "A broken port on an unmanaged switch.",
      "A port used only during power outages."
    ],
    "correctAnswer": 1,
    "explanation": "Clients use temporary dynamic (ephemeral) ports allocated by the operating system for the duration of a session.",
    "hint": "Dynamic temporary client port."
  },
  {
    "id": 21,
    "question": "Which layer of the TCP/IP model corresponds to both the Data Link and Physical layers of the OSI reference model?",
    "options": [
      "Application Layer",
      "Transport Layer",
      "Internet Layer",
      "Network Access (Link) Layer"
    ],
    "correctAnswer": 3,
    "explanation": "The Network Access Layer (also called Network Interface or Link Layer) covers both physical media transmission and data link framing.",
    "hint": "Bottom layer of the 4-layer model."
  },
  {
    "id": 22,
    "question": "In CBSE board questions, what is the key distinction between TCP and UDP?",
    "options": [
      "TCP is connection-oriented, reliable, and guarantees in-order delivery; UDP is connectionless, unreliable, lightweight, and faster.",
      "TCP is wireless; UDP is wired.",
      "TCP only works on mobile phones; UDP only works on supercomputers.",
      "There is no functional difference."
    ],
    "correctAnswer": 0,
    "explanation": "TCP guarantees reliable in-order transmission with handshakes and retransmissions; UDP provides low-overhead, fast datagram delivery without guarantees.",
    "hint": "Reliable connection-oriented vs fast connectionless."
  },
  {
    "id": 23,
    "question": "What is the function of the ICMP (Internet Control Message Protocol) operating alongside IP?",
    "options": [
      "Streaming 4K video.",
      "Reporting network errors (e.g., Destination Unreachable) and diagnostic queries (e.g., ping).",
      "Assigning domain names to web servers.",
      "Sending junk email."
    ],
    "correctAnswer": 1,
    "explanation": "ICMP generates diagnostic and error messages for IP, powering utilities like `ping` and `traceroute`.",
    "hint": "Used by ping and traceroute."
  },
  {
    "id": 24,
    "question": "What does the MTU (Maximum Transmission Unit) specify on an Ethernet interface?",
    "options": [
      "The maximum number of computers on a LAN.",
      "The maximum size of an IP packet (typically 1500 bytes) that can be transmitted across the link without fragmentation.",
      "The speed of the network card in gigabits.",
      "The duration of a user's web session."
    ],
    "correctAnswer": 1,
    "explanation": "MTU defines the largest PDU that can be passed through a physical communications interface without requiring fragmentation (1500 bytes on standard Ethernet).",
    "hint": "Max packet payload size (1500 bytes)."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination, how should you summarize why TCP/IP is called a 'suite'?",
    "options": [
      "Because it costs as much as a luxury hotel suite.",
      "Because it is not a single protocol, but a coordinated collection (stack) of protocols working across different layers to enable complete end-to-end communication.",
      "Because it was designed inside an executive boardroom suite.",
      "Because it can only run on four computers simultaneously."
    ],
    "correctAnswer": 1,
    "explanation": "TCP/IP is a suite because it encompasses dozens of complementary protocols across all layers (IP, TCP, UDP, ICMP, ARP, HTTP, FTP, DNS) working in harmony.",
    "hint": "Comprehensive protocol stack spanning all layers."
  }
];
