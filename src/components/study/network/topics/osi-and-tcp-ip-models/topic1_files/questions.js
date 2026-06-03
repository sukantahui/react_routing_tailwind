// topic1_files/questions.js
const questions = [
  {
    question: "What is a network protocol?",
    shortAnswer: "A set of rules and conventions that govern how peer layers communicate.",
    explanation: "Protocols define syntax (format), semantics (meaning), and timing (order and speed) of messages exchanged between peer entities.",
    hint: "Think of it as a language that two devices agree to speak.",
    level: "basic",
    codeExample: "// HTTP protocol example: GET /index.html HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n"
  },
  {
    question: "What is the difference between a service and a protocol?",
    shortAnswer: "A service is what a layer provides to the layer above; a protocol is the set of rules used between peer layers.",
    explanation: "Service is vertical (adjacent layers), protocol is horizontal (same layer on different machines). A layer implements a service using one or more protocols.",
    hint: "Service = capability, Protocol = how peers achieve that capability.",
    level: "basic"
  },
  {
    question: "What is a Service Access Point (SAP)?",
    shortAnswer: "A specific point (address) where a layer can request services from the layer below.",
    explanation: "SAPs are like doorways or identifiers that allow multiplexing – multiple higher-layer entities share the same lower-layer service.",
    hint: "Think of a port number or a MAC address as a SAP.",
    level: "intermediate"
  },
  {
    question: "Give an example of a SAP at the transport layer.",
    shortAnswer: "A port number (e.g., TCP port 80 for HTTP).",
    explanation: "The transport layer uses port numbers to deliver incoming data to the correct application process. These ports are SAPs between application and transport layers.",
    hint: "Run 'netstat -tulpn' to see active ports.",
    level: "basic",
    codeExample: "# netstat -tulpn | grep LISTEN"
  },
  {
    question: "What does 'peer communication' mean in layered models?",
    shortAnswer: "Logical communication between the same layer on two different machines using a protocol.",
    explanation: "For example, the transport layer on Host A talks to the transport layer on Host B using TCP. Physically, data passes through lower layers, but logically they communicate as peers.",
    hint: "Virtual horizontal connection.",
    level: "intermediate"
  },
  {
    question: "What is the difference between vertical and horizontal communication?",
    shortAnswer: "Vertical communication occurs between adjacent layers on the same machine via interfaces/SAPs; horizontal communication occurs between peer layers on different machines via protocols.",
    explanation: "Data flows vertically up and down the stack, but protocols define the rules for horizontal peer conversations.",
    hint: "Vertical = up/down on one device; Horizontal = across the network.",
    level: "basic"
  },
  {
    question: "What is the role of an interface between layers?",
    shortAnswer: "It defines how a layer accesses the services of the layer below, including operations, parameters, and SAPs.",
    explanation: "The interface is the contract that hides implementation details. For example, the socket API (socket(), bind(), listen(), accept(), send(), recv()) is the interface between application and transport layers.",
    hint: "Like an API in software.",
    level: "intermediate",
    codeExample: "// C socket interface: int sockfd = socket(AF_INET, SOCK_STREAM, 0);"
  },
  {
    question: "In the restaurant analogy, who represents the service provider and who represents the service user?",
    shortAnswer: "The chef provides the cooking service; the waiter uses that service.",
    explanation: "The chef (lower layer) offers a service to the waiter (higher layer). The customer is the ultimate user, but in layered terms, adjacent layers interact.",
    hint: "Service is always upward: lower layer serves the layer above.",
    level: "basic"
  },
  {
    question: "What is multiplexing in the context of SAPs?",
    shortAnswer: "Multiple higher-layer entities sharing the same lower-layer service via different SAPs.",
    explanation: "For example, many applications (web browser, email client, SSH) all use the same TCP/IP stack but are distinguished by different port numbers (SAPs).",
    hint: "SAPs act like apartment numbers in a building with one street address.",
    level: "intermediate"
  },
  {
    question: "What is the opposite of multiplexing?",
    shortAnswer: "Demultiplexing – delivering incoming data to the correct higher-layer entity based on the SAP.",
    explanation: "When data arrives at a layer, the SAP identifier (e.g., destination port) is used to determine which upper-layer process should receive the data.",
    hint: "The reverse of multiplexing.",
    level: "intermediate"
  },
  {
    question: "Which layer uses port numbers as SAPs?",
    shortAnswer: "The transport layer (TCP and UDP).",
    explanation: "Port numbers are 16-bit identifiers (0–65535) that SAP between application and transport layers. Well-known ports (0–1023) are reserved for standard services.",
    hint: "HTTP uses port 80, HTTPS uses 443.",
    level: "basic",
    codeExample: "cat /etc/services  # lists well-known port mappings"
  },
  {
    question: "What SAP does the network layer use to identify the transport protocol?",
    shortAnswer: "The Protocol field in the IP header (e.g., 6 for TCP, 17 for UDP).",
    explanation: "This field acts as a SAP, telling the network layer on the receiving host which transport protocol (TCP, UDP, etc.) should receive the payload.",
    hint: "Check /etc/protocols for protocol numbers.",
    level: "expert",
    codeExample: "cat /etc/protocols | grep -E 'tcp|udp'"
  },
  {
    question: "What is a common mistake when describing protocols?",
    shortAnswer: "Confusing a protocol with its implementation or with the service it provides.",
    explanation: "A protocol is the specification (e.g., RFC 793 for TCP). An implementation (e.g., Linux TCP stack) follows the protocol. The service (reliable byte stream) is what the protocol offers.",
    hint: "Specification ≠ code ≠ capability.",
    level: "intermediate"
  },
  {
    question: "What does the syntax of a protocol define?",
    shortAnswer: "The format and structure of messages (e.g., header fields, ordering, data types).",
    explanation: "Syntax specifies how a message is constructed. For example, an Ethernet frame has destination MAC (6 bytes), source MAC (6 bytes), EtherType (2 bytes), payload, and FCS.",
    hint: "Think of grammar rules for a language.",
    level: "basic"
  },
  {
    question: "What does the semantics of a protocol define?",
    shortAnswer: "The meaning of each field and the actions to be taken (e.g., what a SYN flag means in TCP).",
    explanation: "Semantics interpret the bits. For example, an ICMP 'Destination Unreachable' message means the packet could not be delivered, and the sender should take action.",
    hint: "Meaning of the words, not just the grammar.",
    level: "basic"
  },
  {
    question: "What is timing in a protocol?",
    shortAnswer: "Rules about when messages are sent and how long to wait for responses (e.g., timeouts, retransmissions).",
    explanation: "Timing ensures reliable communication. TCP uses retransmission timers; ARP waits for replies; HTTP uses keep-alive timeouts.",
    hint: "When to speak and when to stay silent.",
    level: "intermediate"
  },
  {
    question: "How does the concept of SAP relate to the 'well-known ports'?",
    shortAnswer: "Well-known ports (0–1023) are standardized SAPs that allow clients to locate common services without prior configuration.",
    explanation: "For example, a web browser knows to connect to port 80 for HTTP. This standardization is essential for interoperability.",
    hint: "Like dialing 911 for emergency – everyone knows the number.",
    level: "basic"
  },
  {
    question: "What is the difference between a SAP and a physical connector?",
    shortAnswer: "A SAP is a logical identifier (e.g., port number), while a connector is a physical interface (e.g., RJ45 jack).",
    explanation: "SAPs exist at multiple layers (port numbers, protocol numbers, EtherTypes) and are not tied to hardware. Physical connectors are SAPs only at the physical layer.",
    hint: "Logical vs. physical.",
    level: "intermediate"
  },
  {
    question: "What is a protocol data unit (PDU) and how does it relate to services?",
    shortAnswer: "A PDU is the unit of data exchanged between peer layers (e.g., segment, packet, frame). The service passes PDUs vertically via SAPs.",
    explanation: "Each layer has its own PDU name. The service interface passes these PDUs up or down, while the protocol defines how PDUs are formatted and exchanged.",
    hint: "PDU = the 'letter' that peers exchange.",
    level: "intermediate"
  },
  {
    question: "What is the role of the socket API as an interface?",
    shortAnswer: "It provides a standard way for applications to access transport layer services (TCP/UDP) without knowing network details.",
    explanation: "Socket functions (socket, bind, connect, listen, accept, send, recv, close) abstract the complexity of TCP/IP, serving as the interface between application and transport layers.",
    hint: "POSIX sockets are the de facto interface.",
    level: "intermediate",
    codeExample: "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.connect(('example.com', 80))"
  },
  {
    question: "What is a 'layer violation' and why is it bad?",
    shortAnswer: "When a layer uses information or services from a non-adjacent layer, breaking the abstraction.",
    explanation: "Layer violations lead to tight coupling, making changes difficult. Example: An application assuming a specific MTU from the data link layer.",
    hint: "Don't skip layers – it destroys modularity.",
    level: "expert"
  },
  {
    question: "How do SAPs enable multiple network applications on the same host?",
    shortAnswer: "Each application binds to a unique port (SAP), so incoming packets are demultiplexed to the correct process.",
    explanation: "The TCP/IP stack uses the destination port number in the TCP/UDP header to decide which socket/application receives the data.",
    hint: "Many apartments share one building address.",
    level: "basic"
  },
  {
    question: "What is the difference between a connection-oriented and connectionless service?",
    shortAnswer: "Connection-oriented service (e.g., TCP) requires setup, maintains state, and provides reliability; connectionless (e.g., UDP) is stateless and best-effort.",
    explanation: "Services are offered by a layer (typically transport). The protocol (TCP or UDP) implements the service characteristics.",
    hint: "Phone call vs. postal letter.",
    level: "basic"
  },
  {
    question: "What is the 'EtherType' field in an Ethernet frame used for?",
    shortAnswer: "It acts as a SAP, identifying which network layer protocol (IPv4, IPv6, ARP) is carried in the frame.",
    explanation: "When a frame arrives, the data link layer reads the EtherType to know whether to pass the payload to IPv4 (0x0800), IPv6 (0x86DD), ARP (0x0806), etc.",
    hint: "It's the SAP between data link and network layers.",
    level: "expert",
    codeExample: "tcpdump -e -v -c 1  # shows EtherType values"
  },
  {
    question: "What is a common misconception about the interface between layers?",
    shortAnswer: "That the interface is the same as the protocol.",
    explanation: "The interface is how a layer uses the layer below (vertical). The protocol is how peer layers communicate (horizontal). They serve different purposes.",
    hint: "One is up/down, the other is across.",
    level: "intermediate"
  },
  {
    question: "Why are protocols often described in RFCs?",
    shortAnswer: "RFCs (Request for Comments) are the official documents that standardize internet protocols, ensuring interoperability.",
    explanation: "Anyone implementing a protocol follows the RFC to guarantee compatibility with other implementations. Examples: RFC 793 (TCP), RFC 791 (IP), RFC 2616 (HTTP/1.1).",
    hint: "The 'rulebook' for internet protocols.",
    level: "basic"
  },
  {
    question: "What is the purpose of a 'null SAP'?",
    shortAnswer: "A placeholder indicating that no higher-layer entity is using the service at that point.",
    explanation: "Not all SAPs are active. For example, a port that no application is listening on is a null SAP – incoming packets are rejected.",
    hint: "Unused doorway.",
    level: "expert"
  },
  {
    question: "How does a protocol specify error handling?",
    shortAnswer: "By defining error detection (checksums), error recovery (retransmissions, acknowledgments), and error notification (ICMP messages).",
    explanation: "For example, TCP uses checksums to detect corruption and retransmits lost segments. The protocol semantics define what actions to take on errors.",
    hint: "What to do when something goes wrong.",
    level: "intermediate"
  },
  {
    question: "What is 'protocol layering' and how does it relate to services?",
    shortAnswer: "Protocol layering is the organization of protocols into a stack where each layer provides services to the layer above and uses services from the layer below.",
    explanation: "Services define what each layer does; protocols define how peer layers interact. Layering allows substitution of protocols (e.g., replacing Ethernet with Wi-Fi) without changing services.",
    hint: "Layering + services + protocols = network architecture.",
    level: "basic"
  },
  {
    question: "What is a 'service primitive'?",
    shortAnswer: "A specific operation provided by a layer's interface (e.g., REQUEST, INDICATION, RESPONSE, CONFIRM).",
    explanation: "Service primitives are the actual function calls or messages that implement the interface. For example, a CONNECT.request primitive asks the transport layer to establish a connection.",
    hint: "Like method calls in an API.",
    level: "expert"
  }
];

export default questions;