// topic0_files/questions.js
const questions = [
  {
    question: "What is the primary purpose of layering in networking?",
    shortAnswer: "To reduce complexity by breaking the communication process into smaller, manageable modules.",
    explanation: "Layering divides the complex task of network communication into separate layers, each responsible for a specific function. This modular approach simplifies design, implementation, and troubleshooting.",
    hint: "Think about dividing a big problem into smaller, independent pieces.",
    level: "basic",
    codeExample: "// No code, but analogy: sending a letter uses postal layers (writing, addressing, sorting, transporting)."
  },
  {
    question: "How does layering improve interoperability between different vendors?",
    shortAnswer: "Standardized protocols at each layer allow devices from different manufacturers to communicate seamlessly.",
    explanation: "Layering defines clear interfaces and protocols (e.g., IP at network layer). As long as both sides follow the standard, they can interoperate regardless of internal implementation.",
    hint: "Think of USB or HDMI – any compliant device works together.",
    level: "basic"
  },
  {
    question: "What is encapsulation in the context of layered network models?",
    shortAnswer: "The process where each layer adds its own header (and sometimes trailer) to the data received from the layer above.",
    explanation: "Encapsulation wraps the upper layer data with control information (headers). For example, a transport header is added, then a network header, then a data link header.",
    hint: "Like putting a letter into an envelope, then into a bigger package.",
    level: "intermediate",
    codeExample: "// Pseudo: Application data -> TCP segment (TCP header) -> IP packet (IP header) -> Ethernet frame (Ethernet header + trailer)."
  },
  {
    question: "Name one key benefit of modular design in layered architectures.",
    shortAnswer: "You can change or upgrade one layer without affecting the others (e.g., replacing Ethernet with Wi-Fi).",
    explanation: "Modularity allows independent development and evolution. Higher layers (like HTTP) remain unchanged even if the physical medium changes from copper to fiber.",
    hint: "Think of swapping a graphics card without reinstalling your OS.",
    level: "basic"
  },
  {
    question: "In the postal analogy, what corresponds to a 'layer' in networking?",
    shortAnswer: "Each step: writing the letter, addressing the envelope, sorting, transportation, and final delivery.",
    explanation: "The postal system hides complexity by having separate functions. The sender only writes and addresses; the postal service handles routing, transport, and delivery. Networking layers work similarly.",
    hint: "Each part has a different job and doesn't worry about the others.",
    level: "basic"
  },
  {
    question: "What does it mean that layers provide 'abstraction'?",
    shortAnswer: "Each layer hides the details of its implementation from the layer above, exposing only a service interface.",
    explanation: "For example, the application layer doesn't need to know whether the physical link is copper or wireless. It just requests data transmission via the transport layer's interface.",
    hint: "You use a car's steering wheel without knowing how the power steering pump works.",
    level: "intermediate"
  },
  {
    question: "How does layering simplify troubleshooting?",
    shortAnswer: "Problems can be isolated to a specific layer (e.g., cable issue = physical layer, wrong IP = network layer).",
    explanation: "A systematic top-down or bottom-up approach checks each layer's functionality, narrowing down the root cause quickly.",
    hint: "If ping works but browser doesn't, the problem is likely at the application layer.",
    level: "basic",
    codeExample: "# Example troubleshooting: ping 8.8.8.8  # tests network layer and below; if fails, check physical/data link."
  },
  {
    question: "What is the difference between a 'protocol' and a 'layer'?",
    shortAnswer: "A layer is a logical grouping of functions; a protocol is a specific set of rules that operates at a layer.",
    explanation: "For instance, the network layer (logical) uses the IP protocol (rules). A layer can have multiple protocols (e.g., network layer also supports ICMP).",
    hint: "Layer = job description; protocol = how to do the job.",
    level: "basic"
  },
  {
    question: "Why is it a mistake to think layers are physical components?",
    shortAnswer: "Layers are logical concepts, not hardware. A single device (like a router) may operate at multiple layers.",
    explanation: "Layering is a design principle, not a physical separation. A router works at network layer (IP) and below, but that doesn't mean it has separate physical boxes for each layer.",
    hint: "Software and hardware can implement several layers together.",
    level: "intermediate"
  },
  {
    question: "What is the service access point (SAP) in layered models?",
    shortAnswer: "The point where a layer provides services to the layer above (like a well-defined API).",
    explanation: "SAPs define how data is passed between layers. For example, the transport layer SAP might be a socket or port number.",
    hint: "Think of a mail slot – you drop a letter (data) at a specific location.",
    level: "expert"
  },
  {
    question: "How does the TCP/IP model differ from the OSI model in terms of number of layers?",
    shortAnswer: "TCP/IP has 4 or 5 layers (depending on version), while OSI has 7 layers.",
    explanation: "TCP/IP combines OSI's session, presentation, and application into one application layer, and physical/data link into the network interface layer.",
    hint: "TCP/IP is more practical; OSI is more theoretical.",
    level: "basic"
  },
  {
    question: "Which layer is responsible for end-to-end error recovery and flow control?",
    shortAnswer: "The transport layer (e.g., TCP).",
    explanation: "Transport layer ensures reliable data delivery between applications, handling retransmissions, ordering, and flow control.",
    hint: "Think of TCP's acknowledgment and sliding window.",
    level: "basic",
    codeExample: "# netstat -s  # shows TCP statistics like retransmissions."
  },
  {
    question: "What is a common pitfall when explaining layering to beginners?",
    shortAnswer: "Believing that more layers always increase latency or overhead significantly.",
    explanation: "While layers add headers, the benefits of modularity, maintainability, and interoperability far outweigh the small overhead in most cases.",
    hint: "Don't prematurely optimize – layers enable complex systems like the internet.",
    level: "intermediate"
  },
  {
    question: "How does the 'encapsulation' concept help in debugging with Wireshark?",
    shortAnswer: "You can see the layered headers added by each protocol, revealing where issues occur.",
    explanation: "Wireshark shows Ethernet, IP, TCP, and application headers. By examining them, you can determine if a packet was malformed at a specific layer.",
    hint: "Each header contains control information like addresses, checksums, sequence numbers.",
    level: "intermediate",
    codeExample: "# tcpdump -i eth0 -v -e  # shows link-layer (Ethernet) headers as well as IP and TCP."
  },
  {
    question: "What does 'peer-to-peer communication' mean in layered models?",
    shortAnswer: "A layer on one machine communicates logically with the same layer on another machine using protocols.",
    explanation: "For example, the transport layer on host A talks to the transport layer on host B using TCP. The lower layers carry the messages but don't interpret them.",
    hint: "Virtual communication – the actual data passes through all lower layers, but logically only same layers interact.",
    level: "intermediate"
  },
  {
    question: "Why is the physical layer often considered the 'hardest' to change?",
    shortAnswer: "It involves hardware and cabling, which are costly and time-consuming to replace.",
    explanation: "Higher layers can be updated via software. Changing the physical medium (e.g., from copper to fiber) may require new cables, connectors, and hardware.",
    hint: "Software is easy to upgrade; cables require physical work.",
    level: "basic"
  },
  {
    question: "Which layer is responsible for logical addressing (e.g., IP addresses)?",
    shortAnswer: "The network layer.",
    explanation: "Network layer (e.g., IP) provides logical addressing that allows packets to be routed across different networks, independent of physical hardware addresses.",
    hint: "IPv4 and IPv6 operate at this layer.",
    level: "basic",
    codeExample: "# ip addr show  # displays IP addresses assigned to interfaces."
  },
  {
    question: "What is the role of the data link layer?",
    shortAnswer: "To provide node-to-node delivery, error detection, and media access control within a local network.",
    explanation: "Data link layer (e.g., Ethernet) uses MAC addresses and handles framing, error checking (CRC), and flow control between directly connected devices.",
    hint: "Think of switches and MAC addresses.",
    level: "basic",
    codeExample: "# arp -a  # shows mapping between IP and MAC addresses (data link layer)."
  },
  {
    question: "How does layering support independent innovation?",
    shortAnswer: "New protocols can be introduced at one layer without redesigning the entire stack.",
    explanation: "For example, HTTP/3 uses QUIC (a transport protocol) but still works over IP and Ethernet. The upper and lower layers remain unchanged.",
    hint: "Innovation can happen at any layer – new physical media, new routing algorithms, new applications.",
    level: "intermediate"
  },
  {
    question: "What is a typical misconception about the OSI model and the internet?",
    shortAnswer: "That the internet strictly follows the 7-layer OSI model. In reality, it uses the TCP/IP model.",
    explanation: "The OSI model is a reference model. The TCP/IP model is more practical and has fewer layers, but the OSI model is still useful for teaching and discussion.",
    hint: "TCP/IP came first; OSI was a later theoretical framework.",
    level: "basic"
  },
  {
    question: "Why is 'troubleshooting layer by layer' considered a best practice?",
    shortAnswer: "It systematically isolates the problem, avoiding guesswork and saving time.",
    explanation: "Start from the bottom (physical) or top (application) and verify each layer's functionality. This ensures you don't waste time on higher layers when the cable is unplugged.",
    hint: "Divide and conquer – check physical connectivity, then IP, then ports, then application.",
    level: "intermediate",
    codeExample: "# Checklist: 1. Cable/interface up? 2. IP address assigned? 3. Default route? 4. DNS resolution? 5. Firewall?"
  },
  {
    question: "What is a 'protocol data unit' (PDU) at the transport layer called?",
    shortAnswer: "Segment (TCP) or datagram (UDP).",
    explanation: "PDUs have different names per layer: frame (data link), packet (network), segment/datagram (transport), message (application).",
    hint: "Layer 4 PDU = segment (TCP) or datagram (UDP).",
    level: "intermediate"
  },
  {
    question: "How does the use of layers enable reuse of lower-layer services?",
    shortAnswer: "Multiple higher-layer protocols can run over the same lower-layer infrastructure.",
    explanation: "For example, HTTP, FTP, and DNS all use TCP/IP, which can run over Ethernet, Wi-Fi, or fiber. Lower layers provide a generic service.",
    hint: "Think of roads: cars, bikes, and buses all use the same road (physical layer).",
    level: "basic"
  },
  {
    question: "What is the main drawback of layering, if any?",
    shortAnswer: "Potential overhead due to multiple headers and possible duplication of functions.",
    explanation: "Each layer adds its own header, increasing packet size. Sometimes functions (e.g., error recovery) may be implemented in multiple layers, but the benefits usually outweigh the costs.",
    hint: "Overhead is small compared to the complexity reduction.",
    level: "intermediate"
  },
  {
    question: "Which layer would you examine if you suspect a problem with network congestion or routing?",
    shortAnswer: "The network layer (e.g., IP routing and ICMP).",
    explanation: "Network layer handles packet forwarding, routing decisions, and congestion notifications (e.g., ICMP source quench).",
    hint: "Use traceroute to see routing path and delays.",
    level: "basic",
    codeExample: "# traceroute 8.8.8.8  # shows each hop (network layer routers)."
  },
  {
    question: "What does the term 'interface' mean in layered architecture?",
    shortAnswer: "The boundary between two adjacent layers, defining how they exchange information.",
    explanation: "An interface specifies the services provided by a layer to the layer above and how to access them (e.g., function calls, message formats).",
    hint: "Like an API between software layers.",
    level: "expert"
  },
  {
    question: "How does the concept of 'separation of concerns' apply to network layering?",
    shortAnswer: "Each layer focuses on a single, well-defined task, avoiding overlap and complexity.",
    explanation: "Physical layer deals with bits, data link with frames, network with packets, etc. This separation makes each layer easier to design and maintain.",
    hint: "One job per layer – don't mix addressing and error recovery in the same layer.",
    level: "intermediate"
  },
  {
    question: "In the postal analogy, what represents the 'header' added at each layer?",
    shortAnswer: "The envelope with address (for the delivery layer) and the sorting label (for the sorting layer).",
    explanation: "Each postal step adds its own control information: the recipient's address on the envelope, routing barcodes, etc. Similarly, network headers contain addresses, sequence numbers, checksums.",
    hint: "Headers are like sticky notes added by each handler.",
    level: "basic"
  },
  {
    question: "What is a 'layer violation' and why is it generally discouraged?",
    shortAnswer: "When a layer uses information or services from a non-adjacent layer, breaking the abstraction.",
    explanation: "Layer violations can lead to tight coupling and make changes difficult. For example, an application assuming a specific MTU size from the data link layer.",
    hint: "Don't skip layers – it defeats modularity.",
    level: "expert"
  },
  {
    question: "How would you explain layering to a non-technical person?",
    shortAnswer: "Like assembling a car on a production line: each station does one task (install engine, mount wheels) without knowing the whole process.",
    explanation: "Layering divides complex work into specialized stages, making it easier to manage, fix, and improve each stage independently.",
    hint: "Each worker (layer) only needs to know their job and where to pass the result.",
    level: "basic"
  }
];

export default questions;