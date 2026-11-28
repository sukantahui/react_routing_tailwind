export default [
  {
    "id": 1,
    "question": "What is the fundamental definition of a 'Network Protocol' in computer communications?",
    "options": [
      "A physical cable used to link computers together.",
      "A formalized set of rules, conventions, and data formats governing exchange of data between network devices.",
      "An operating system designed solely for network file servers.",
      "A high-level programming language used exclusively for building websites."
    ],
    "correctAnswer": 1,
    "explanation": "A protocol is a standardized set of rules and conventions that determines how data is formatted, addressed, transmitted, routed, and received across a network.",
    "hint": "Think of protocols as grammar and communication etiquette for computers."
  },
  {
    "id": 2,
    "question": "Why can heterogeneous computer systems (e.g., Linux, Windows, macOS, Android) seamlessly communicate over the Internet?",
    "options": [
      "They all share the same processor architecture.",
      "They all adhere to standardized, open network protocol suites such as TCP/IP.",
      "They all execute identical binary executable files.",
      "They are all manufactured by the same hardware vendor."
    ],
    "correctAnswer": 1,
    "explanation": "Standardized protocols provide vendor-neutral specifications, enabling hardware and software from different vendors to interoperate seamlessly.",
    "hint": "Universal open standards break vendor lock-in."
  },
  {
    "id": 3,
    "question": "Which of the following is NOT one of the three primary elements of any network protocol?",
    "options": [
      "Syntax",
      "Semantics",
      "Timing",
      "Color depth"
    ],
    "correctAnswer": 3,
    "explanation": "The three core elements of a protocol are Syntax (data format and structure), Semantics (meaning of bit fields and error actions), and Timing (speed matching and sequencing).",
    "hint": "Syntax, Semantics, Timing are the formal protocol triad."
  },
  {
    "id": 4,
    "question": "In protocol engineering, what does the term 'Syntax' refer to?",
    "options": [
      "The structure or format of the data, including field lengths and ordering.",
      "The interpretation and meaning of each section of bits.",
      "The rate at which data should be sent to prevent buffer overrun.",
      "The legal jurisdiction governing telecommunications."
    ],
    "correctAnswer": 0,
    "explanation": "Syntax specifies the layout, format, and encoding of bits within a packet header or frame.",
    "hint": "How data looks: headers, offsets, and field sizes."
  },
  {
    "id": 5,
    "question": "In protocol engineering, what does 'Semantics' define?",
    "options": [
      "The electrical voltage levels on copper wires.",
      "The meaning of each field and what specific actions the sender or receiver should take upon encountering it.",
      "The cost per gigabyte of data transfer.",
      "The physical dimension of the RJ45 jack."
    ],
    "correctAnswer": 1,
    "explanation": "Semantics defines the logic and meaning behind the control bits and headers, dictating receiver response and error handling.",
    "hint": "Semantics = meaning and action."
  },
  {
    "id": 6,
    "question": "In protocol engineering, what does 'Timing' govern?",
    "options": [
      "When data should be transmitted and how fast it can be transmitted without overflowing buffers.",
      "The time zone of the web server.",
      "The battery life of client workstations.",
      "The lease duration of an office building."
    ],
    "correctAnswer": 0,
    "explanation": "Timing includes sequencing, synchronization, and flow control to prevent faster senders from overwhelming slower receivers.",
    "hint": "Synchronization, flow control, and speed matching."
  },
  {
    "id": 7,
    "question": "What is 'Protocol Encapsulation' (also known as Data Packaging)?",
    "options": [
      "Encrypting files inside a password-protected ZIP archive.",
      "The process where each descending layer in a network stack wraps upper-layer data with its own header and/or trailer.",
      "Compressing video streams before uploading to YouTube.",
      "Converting source code into machine language."
    ],
    "correctAnswer": 1,
    "explanation": "Encapsulation occurs when each layer of the protocol stack appends its control information (header/trailer) to the payload received from the layer above.",
    "hint": "Layered wrapping: Data -> Segment -> Packet -> Frame -> Bits."
  },
  {
    "id": 8,
    "question": "What is the reverse process of Encapsulation called when a received packet moves up the receiver's protocol stack?",
    "options": [
      "Decapsulation (or De-multiplexing)",
      "Compilation",
      "Fragmentation",
      "Amplification"
    ],
    "correctAnswer": 0,
    "explanation": "As data travels upward from the physical medium to the application layer on the receiver, each layer inspects and strips off its corresponding header.",
    "hint": "Unpacking headers layer by layer."
  },
  {
    "id": 9,
    "question": "Which of the following bodies is primarily responsible for publishing and maintaining Internet official RFC (Request for Comments) protocol standards?",
    "options": [
      "IETF (Internet Engineering Task Force)",
      "NASA",
      "WTO",
      "UNICEF"
    ],
    "correctAnswer": 0,
    "explanation": "The IETF develops and promotes voluntary Internet standards, expressed as numbered RFC documents.",
    "hint": "IETF authors RFCs."
  },
  {
    "id": 10,
    "question": "Why is a layered protocol architecture (like OSI or TCP/IP) universally adopted in computer networking?",
    "options": [
      "To restrict network access to certified computer scientists only.",
      "To modularize complex communication tasks, allowing layers to be modified or upgraded independently without breaking the entire stack.",
      "To slow down transmissions to conserve electrical energy.",
      "To prevent software piracy."
    ],
    "correctAnswer": 1,
    "explanation": "Layering creates modularity, standard interfaces, and abstraction. Upgrading Wi-Fi to Ethernet at Layer 1/2 does not require rewriting HTTP at Layer 7.",
    "hint": "Modularity and separation of concerns."
  },
  {
    "id": 11,
    "question": "What is a 'Handshake' in connection-oriented protocols?",
    "options": [
      "A physical greeting between network engineers during installation.",
      "An automated negotiation exchange of control messages between two systems to establish operational parameters before transmitting payload data.",
      "A method of generating random passwords.",
      "A procedure to format USB flash drives."
    ],
    "correctAnswer": 1,
    "explanation": "A handshake (such as the TCP 3-way handshake) establishes synchrony, initial sequence numbers, and buffer capacities before data transfer begins.",
    "hint": "SYN, SYN-ACK, ACK parameter exchange."
  },
  {
    "id": 12,
    "question": "Which term describes a protocol where communicating parties must establish a verified logical session before any data can be transferred?",
    "options": [
      "Connectionless Protocol",
      "Connection-Oriented Protocol",
      "Broadcast-Only Protocol",
      "Asynchronous Protocol"
    ],
    "correctAnswer": 1,
    "explanation": "Connection-oriented protocols (like TCP) require session setup (handshake), ongoing state tracking, and explicit teardown.",
    "hint": "Telephone call model vs postal mail model."
  },
  {
    "id": 13,
    "question": "Which of the following is the best example of a connectionless communication model in everyday life?",
    "options": [
      "Making a voice phone call where the recipient must pick up first.",
      "Dropping a letter into a public mailbox without knowing if the recipient is currently home.",
      "A live zoom meeting requiring prior passcode authentication.",
      "An ATM withdrawal transaction requiring card insertion and PIN validation."
    ],
    "correctAnswer": 1,
    "explanation": "Postal mail is connectionless: packets (letters) are stamped and dispatched independently without an established pre-call channel.",
    "hint": "Fire and forget."
  },
  {
    "id": 14,
    "question": "What is 'Flow Control' in network protocols?",
    "options": [
      "Directing electricity through copper wires.",
      "A mechanism that prevents a fast sender from transmitting data faster than the receiving node can process and buffer it.",
      "A cooling fan controller inside a network switch.",
      "A legal policy dictating employee internet hours."
    ],
    "correctAnswer": 1,
    "explanation": "Flow control prevents buffer overflow at the receiver by dynamically signaling available buffer window space (e.g., TCP sliding window).",
    "hint": "Sender rate matching receiver capacity."
  },
  {
    "id": 15,
    "question": "What is 'Error Control' in network communication protocols?",
    "options": [
      "Detecting bit corruptions during transit and requesting or performing retransmission or error correction.",
      "Deleting files that contain spelling errors.",
      "Shutting down the router when an invalid website is accessed.",
      "Limiting users to lowercase passwords."
    ],
    "correctAnswer": 0,
    "explanation": "Error control uses checksums, parity checks, and ARQ (Automatic Repeat reQuest) retransmissions to ensure uncorrupted data delivery.",
    "hint": "Detecting bit errors and requesting retransmission."
  },
  {
    "id": 16,
    "question": "What is 'PDU' in protocol terminology?",
    "options": [
      "Protocol Data Unit",
      "Personal Desktop Unit",
      "Power Distribution Uplink",
      "Public Domain Utility"
    ],
    "correctAnswer": 0,
    "explanation": "PDU stands for Protocol Data Unit, representing a specific block of information transferred as a unit among peer entities (e.g., segment, packet, frame).",
    "hint": "Unit of data handled by a protocol layer."
  },
  {
    "id": 17,
    "question": "In the TCP/IP model, which PDU corresponds to the Transport layer?",
    "options": [
      "Frame",
      "Packet (or Datagram)",
      "Segment",
      "Bitstream"
    ],
    "correctAnswer": 2,
    "explanation": "At the Transport layer, the PDU is called a Segment (in TCP) or Datagram (in UDP). At the Network layer, it is a Packet; at Data Link, a Frame.",
    "hint": "Transport layer chunks data into segments."
  },
  {
    "id": 18,
    "question": "What is the PDU of the Data Link layer?",
    "options": [
      "Segment",
      "Packet",
      "Frame",
      "Message"
    ],
    "correctAnswer": 2,
    "explanation": "The Data Link layer packages network layer packets into Frames, which include source/destination MAC addresses and a Frame Check Sequence (FCS) trailer.",
    "hint": "Ethernet creates frames."
  },
  {
    "id": 19,
    "question": "Why do protocols employ a 'Checksum' or CRC (Cyclic Redundancy Check) in header trailers?",
    "options": [
      "To accelerate CPU overclocking.",
      "To verify mathematical integrity and detect if any bits were flipped during electrical or radio transmission.",
      "To keep track of the price of the router.",
      "To translate text between English and Hindi."
    ],
    "correctAnswer": 1,
    "explanation": "A checksum is a computed mathematical hash placed in the packet trailer; the receiver recalculates it to detect transmission bit errors.",
    "hint": "Error detection mathematical verification."
  },
  {
    "id": 20,
    "question": "What happens if a received frame fails the CRC/Checksum test at the Data Link layer in standard Ethernet?",
    "options": [
      "The frame is corrected automatically using AI.",
      "The frame is discarded immediately as corrupted.",
      "The frame is forwarded directly to the user's desktop.",
      "The switch sounds an audible alarm bell."
    ],
    "correctAnswer": 1,
    "explanation": "Standard Ethernet silently drops corrupted frames to avoid polluting upper layers with faulty data; higher layers (like TCP) handle retransmission.",
    "hint": "Discard on checksum failure."
  },
  {
    "id": 21,
    "question": "Which of the following is considered an Application Layer protocol in the TCP/IP model?",
    "options": [
      "IP",
      "TCP",
      "HTTP",
      "ARP"
    ],
    "correctAnswer": 2,
    "explanation": "HTTP (Hypertext Transfer Protocol) operates at the Application Layer (Layer 7 / Layer 4 of TCP/IP) to exchange web content.",
    "hint": "Used by web browsers to request web pages."
  },
  {
    "id": 22,
    "question": "What does the term 'Stateless Protocol' imply?",
    "options": [
      "A protocol that can only be used within a single Indian state.",
      "A protocol where the server does not retain any session memory or state about previous client transactions between requests.",
      "A protocol that operates without physical cables.",
      "A protocol that does not require an operating system."
    ],
    "correctAnswer": 1,
    "explanation": "In a stateless protocol (such as basic HTTP/1.0), every request is treated as completely independent with no stored client state on the server.",
    "hint": "Each request is isolated; cookies are used to add state."
  },
  {
    "id": 23,
    "question": "In layered architecture, what is an 'Interface' between adjacent layers?",
    "options": [
      "The physical monitor connected to the server.",
      "The set of operations, services, and parameters that an upper layer uses to access the services of the layer immediately below it.",
      "The color scheme of the operating system GUI.",
      "The optical fiber patch cable."
    ],
    "correctAnswer": 1,
    "explanation": "An interface defines the Service Access Points (SAPs) and function primitives passed between adjacent vertical layers on the same machine.",
    "hint": "Boundary between vertical adjacent layers."
  },
  {
    "id": 24,
    "question": "What is 'Peer-to-Peer Protocol Communication' across a network?",
    "options": [
      "Direct physical cabling between every computer.",
      "The virtual logical communication between identical layers on two different communicating hosts (e.g., Transport Layer to Transport Layer).",
      "Sharing music files illegally.",
      "Communicating without passwords."
    ],
    "correctAnswer": 1,
    "explanation": "Peer entities at the same layer on different machines communicate virtually through headers defined by that layer's protocol.",
    "hint": "Horizontal logical dialogue between matching layers."
  },
  {
    "id": 25,
    "question": "In CBSE board examination questions, what is the best concise answer to: 'What is the need for network protocols?'",
    "options": [
      "Protocols are needed solely to make computers boot up faster.",
      "Protocols are necessary to establish standardized rules for data formatting, synchronization, error handling, and routing so diverse hardware/software can communicate reliably.",
      "Protocols are required by telecom companies to charge customer subscription fees.",
      "Protocols prevent monitors from overheating."
    ],
    "correctAnswer": 1,
    "explanation": "Standard rules ensure that diverse computer systems can establish connections, interpret bit formats, detect errors, and coordinate reliable communication.",
    "hint": "Standardized rules for formatting, error detection, synchronization, and addressing."
  }
];
