// topic2_files/topic2_questions.js
const questions = [
  {
    question: "What is switching in computer networks?",
    shortAnswer: "Switching is the process of forwarding data from an input port to the appropriate output port in a network node.",
    explanation: "Switching allows multiple devices to share network infrastructure by directing traffic only where it needs to go. Without switching, we would need direct point-to-point links between every pair of devices, which is impractical.",
    hint: "Think of a telephone exchange operator who manually connects calls by plugging wires.",
    level: "basic",
    codeExample: "// In a router, switching looks up destination IP in routing table and forwards packet out correct interface."
  },
  {
    question: "What are the three main switching techniques?",
    shortAnswer: "Circuit switching, message switching, and packet switching (datagram and virtual circuit).",
    explanation: "Circuit switching establishes a dedicated path before data transfer. Message switching uses store-and-forward for entire messages. Packet switching splits messages into smaller packets that are forwarded individually.",
    hint: "Circuit = reserved road, message = postal mail, packet = carpool lane with many cars.",
    level: "basic",
    codeExample: "Telephone network = circuit switching; Internet = packet switching; old telegraph = message switching."
  },
  {
    question: "Explain the three phases of circuit switching.",
    shortAnswer: "Setup, data transfer, and teardown.",
    explanation: "During setup, the network reserves resources and establishes an end-to-end connection. Data transfer sends the information. Teardown releases resources when the call ends. This is similar to making a phone call.",
    hint: "Like renting a car: reserve (setup), drive (data transfer), return (teardown).",
    level: "intermediate",
    codeExample: "In a phone call: dial (setup), talk (data), hang up (teardown)."
  },
  {
    question: "What is the main advantage of circuit switching over packet switching?",
    shortAnswer: "Guaranteed bandwidth and low, predictable delay once the circuit is established.",
    explanation: "Because resources are reserved end-to-end, there is no queuing delay or contention. This makes circuit switching ideal for real-time applications like voice calls, where jitter is unacceptable.",
    hint: "Think of a private lane on a highway versus a shared lane with traffic jams.",
    level: "intermediate",
    codeExample: "A T1 leased line gives you a fixed 1.544 Mbps regardless of other traffic."
  },
  {
    question: "What is the main disadvantage of circuit switching?",
    shortAnswer: "Inefficient use of resources, especially for bursty traffic, and blocking when all circuits are busy.",
    explanation: "Even if no data is being sent (silence during a call), the reserved bandwidth is wasted. Also, if all circuits are occupied, new calls are blocked (busy signal).",
    hint: "Like paying for a taxi to wait while you shop — expensive if you're not using it.",
    level: "basic",
    codeExample: "A phone call uses 64 kbps even when neither person is speaking."
  },
  {
    question: "What is message switching and where was it used?",
    shortAnswer: "Message switching stores entire messages at intermediate nodes before forwarding them. It was used in telegraph networks and early email systems.",
    explanation: "Each node receives the complete message, stores it (perhaps on disk), then forwards to the next hop. This allows for error checking and retransmission, but introduces high latency.",
    hint: "Like sending a letter: the post office stores it until the next truck arrives.",
    level: "intermediate",
    codeExample: "UUCP (Unix-to-Unix Copy) used store-and-forward to exchange email over dial-up lines overnight."
  },
  {
    question: "What are the two types of packet switching?",
    shortAnswer: "Datagram packet switching and virtual circuit packet switching.",
    explanation: "In datagram, each packet is routed independently (like IP). In virtual circuit, a path is established before data transfer, and packets follow that path (like MPLS or Frame Relay).",
    hint: "Datagram = each letter has full address; virtual circuit = a pre-arranged route with a label.",
    level: "intermediate",
    codeExample: "Internet IP is datagram; MPLS is virtual circuit."
  },
  {
    question: "What is the difference between datagram and virtual circuit packet switching?",
    shortAnswer: "Datagram routes each packet independently; virtual circuit establishes a path once, then packets follow that path with a label.",
    explanation: "Datagram has no setup phase; each packet carries full destination address. Virtual circuit has setup, uses shorter labels for fast switching, and may have per-connection state in routers.",
    hint: "Datagram = asking for directions at every turn; virtual circuit = getting a GPS route and following it.",
    level: "intermediate",
    codeExample: "IP = datagram; TCP connection over IP is not a virtual circuit — it's a logical connection on top of datagram. MPLS is true virtual circuit."
  },
  {
    question: "What is a 'blocking' vs 'non-blocking' switch?",
    shortAnswer: "A blocking switch may fail to connect an input to an output if internal resources are busy; a non-blocking switch guarantees connection if output is free.",
    explanation: "In circuit switching, a switch fabric may have fewer internal paths than inputs+outputs, causing blocking. Non-blocking designs (like crossbar) have enough internal capacity to connect any idle input to any idle output.",
    hint: "Blocking = a telephone operator with only 10 cords but 20 callers; non-blocking = enough cords for everyone.",
    level: "advanced",
    codeExample: "Clos networks are used to build non-blocking switches with fewer crosspoints than a full crossbar."
  },
  {
    question: "What is the difference between switching and routing?",
    shortAnswer: "Switching typically refers to forwarding within a local network based on MAC addresses; routing forwards between networks based on IP addresses.",
    explanation: "Switching happens at layer 2 (data link) using hardware; routing at layer 3 (network) using software or hardware. Switches use MAC tables; routers use routing tables and routing protocols.",
    hint: "Switch = local post office within a city; router = sorting facility between cities.",
    level: "intermediate",
    codeExample: "Ethernet switch forwards frames by MAC; IP router forwards packets by IP."
  },
  {
    question: "What is the concept of 'store-and-forward' in switching?",
    shortAnswer: "The switch receives the entire frame/packet before forwarding it to the output port.",
    explanation: "Store-and-forward allows error checking (CRC) and can buffer packets when output is busy. It introduces latency but increases reliability. Cut-through switching forwards as soon as destination address is read.",
    hint: "Store-and-forward = reading the whole letter before passing it on; cut-through = glancing at the address and passing while still reading.",
    level: "intermediate",
    codeExample: "Most Ethernet switches can operate in store-and-forward mode; some support cut-through for lower latency."
  },
  {
    question: "What is the difference between circuit switching and virtual circuit packet switching?",
    shortAnswer: "Circuit switching reserves resources for the entire connection; virtual circuit reserves only the path, not bandwidth — resources are shared statistically.",
    explanation: "In circuit switching, time slots or frequencies are dedicated. In virtual circuit packet switching, packets still share the link via statistical multiplexing; only the route is fixed. Thus, virtual circuits can be more efficient.",
    hint: "Circuit = private lane; virtual circuit = same lane but cars share it with others, just follow same route.",
    level: "advanced",
    codeExample: "Frame Relay and ATM use virtual circuits; traditional phone uses circuit switching."
  },
  {
    question: "What is the 'teardown' phase in circuit switching?",
    shortAnswer: "The phase where the connection is terminated and resources are released.",
    explanation: "After data transfer, the calling party hangs up, signaling the network to free the allocated circuits and update routing tables. Without teardown, resources would remain reserved indefinitely.",
    hint: "Like returning a rental car so the next person can use it.",
    level: "basic",
    codeExample: "In SS7 telephony, a Release message is sent to tear down the circuit."
  },
  {
    question: "What is a 'crossbar switch'?",
    shortAnswer: "A crossbar switch uses a grid of horizontal and vertical lines with a crosspoint at each intersection that can be closed to connect an input to an output.",
    explanation: "It is a non-blocking switch architecture. Each input has a line to every output; a control mechanism closes the appropriate crosspoint. Used in telephone exchanges and router line cards.",
    hint: "Like a grid of roads where any north-south road can connect to any east-west road at an intersection.",
    level: "advanced",
    codeExample: "A 100x100 crossbar has 10,000 crosspoints. Large crossbars are expensive, so Clos networks are used instead."
  },
  {
    question: "What is a 'time-division switch' (TDM switch)?",
    shortAnswer: "A TDM switch moves data from an incoming time slot to an outgoing time slot using memory and a time-slot interchanger.",
    explanation: "In digital telephone exchanges, each call occupies a specific time slot in a TDM frame. The switch reads the slot, stores it in memory at a certain address, and reads it out at a different time to switch the call.",
    hint: "Like rearranging the order of cards in a deck to change who talks to whom.",
    level: "expert",
    codeExample: "A TSI (Time-Slot Interchanger) with 1024 slots can switch 1024 simultaneous calls."
  },
  {
    question: "What is the difference between datagram and connection-oriented services?",
    shortAnswer: "Datagram is connectionless: each packet independent. Connection-oriented (like virtual circuit) requires a setup phase and maintains state.",
    explanation: "Connectionless services have no call setup, but may lose or reorder packets. Connection-oriented services provide sequencing and reliability, often at the transport layer (TCP) or network layer (X.25, MPLS).",
    hint: "Connectionless = sending postcards individually; connection-oriented = having a phone conversation after dialing.",
    level: "intermediate",
    codeExample: "UDP is connectionless datagram; TCP is connection-oriented but on top of IP datagram."
  },
  {
    question: "What is the role of a 'switch fabric'?",
    shortAnswer: "The switch fabric is the internal mechanism that moves packets from input ports to output ports within a switch or router.",
    explanation: "Common fabrics include shared memory, shared bus, crossbar, and Clos networks. The fabric's capacity determines the switch's throughput. High-end routers use multiple parallel fabrics.",
    hint: "The fabric is the 'highway system' inside the switch connecting all ports.",
    level: "advanced",
    codeExample: "Cisco 12000 series uses a crossbar fabric; Juniper MX uses a Clos fabric (3-stage)."
  },
  {
    question: "What is 'head-of-line blocking' (HOL blocking) in packet switches?",
    shortAnswer: "HOL blocking occurs when a packet at the front of an input queue blocks others behind it even if their output is free.",
    explanation: "In a FIFO input queue, if the first packet's output is busy, all subsequent packets (destined for other outputs) wait. This reduces throughput. Solutions include virtual output queues (VOQ).",
    hint: "Like a single lane bridge: one car waiting for a truck blocks everyone else, even if they want different destinations.",
    level: "expert",
    codeExample: "VOQ (Virtual Output Queues) used in high-speed switches to eliminate HOL blocking."
  },
  {
    question: "What is the difference between circuit switching and message switching in terms of delay?",
    shortAnswer: "Circuit switching has setup delay but low data transfer delay; message switching has no setup but high store-and-forward delay per hop.",
    explanation: "For a message going through N hops, circuit switching delay = setup + propagation + transmission. Message switching delay = N × (transmission + propagation + store delay). For long messages, message switching can be very slow.",
    hint: "Circuit = pay to open a dedicated lane (slow start, fast drive); message = stop at every post office (slow overall).",
    level: "intermediate",
    codeExample: "For a 1 MB message over 10 hops: circuit setup = 1 sec, transfer = 0.1 sec; message switching = 10 × (0.1 + store) ≈ 1 sec + store overhead."
  },
  {
    question: "What is 'cut-through switching' and when is it used?",
    shortAnswer: "Cut-through switching begins forwarding a packet as soon as the destination address is read, without waiting for the entire packet.",
    explanation: "It reduces latency but may forward corrupted packets because no CRC check is performed. Used in low-latency environments like InfiniBand or some Ethernet switches for trading applications.",
    hint: "Like a postal worker who sees the city on the envelope and throws it into the right bin without reading the full address.",
    level: "advanced",
    codeExample: "Mellanox switches use cut-through for low latency in HPC clusters."
  },
  {
    question: "What is the difference between 'space division' and 'time division' switching?",
    shortAnswer: "Space division uses physical paths (crosspoints); time division uses time slots and memory.",
    explanation: "Space division switches (crossbar) create a physical connection. Time division switches (TSI) move data between time slots. Modern switches often combine both (space-time-space).",
    hint: "Space = different physical wires; time = same wire but different time slots.",
    level: "expert",
    codeExample: "Telephone exchanges use TDM switching; large routers use crossbar (space) fabrics."
  },
  {
    question: "What is a 'Clos network'?",
    shortAnswer: "A Clos network is a multi-stage switch fabric that is non-blocking with fewer crosspoints than a full crossbar.",
    explanation: "Invented by Charles Clos for telephone exchanges, it uses three stages: input, middle, output. With enough middle switches, it can be strictly non-blocking. Used in modern router fabrics.",
    hint: "Like a multi-level highway interchange: not every input directly connects to every output, but any input can reach any output via intermediate switches.",
    level: "expert",
    codeExample: "Many high-end routers (e.g., Juniper PTX) use Clos or folded Clos fabrics."
  },
  {
    question: "Why does packet switching use smaller packet sizes?",
    shortAnswer: "Smaller packets reduce delay for interactive traffic, limit error retransmission, and improve fairness.",
    explanation: "If a packet is very large, a single error forces retransmission of the whole packet. Also, large packets cause long queuing delays for others (increased jitter). Maximum Transmission Unit (MTU) is typically 1500 bytes for Ethernet.",
    hint: "Smaller packets = smaller pieces to resend if lost, and others don't wait too long.",
    level: "intermediate",
    codeExample: "TCP segments are usually ≤1460 bytes to fit in Ethernet MTU of 1500 bytes."
  },
  {
    question: "What is the concept of 'virtual output queue' (VOQ)?",
    shortAnswer: "VOQ maintains a separate FIFO queue for each output port at each input port, eliminating HOL blocking.",
    explanation: "Instead of a single input queue, each input has N queues (one per output). Packets are placed in the queue for their destination. A scheduler then selects which queue to serve. Used in high-performance switches.",
    hint: "Like having separate lines for different destinations at a bus station, so a delayed bus doesn't block others.",
    level: "expert",
    codeExample: "Cisco CRS-1 uses VOQ with a scheduling algorithm like iSLIP."
  },
  {
    question: "What is the difference between 'connection-oriented' and 'connectionless' network layers?",
    shortAnswer: "Connection-oriented (e.g., X.25, ATM) requires a setup phase and maintains per-connection state; connectionless (e.g., IP) treats each packet independently.",
    explanation: "Connection-oriented networks can guarantee sequencing and provide QoS but have scaling issues. Connectionless networks are simpler, robust, and scalable but offer only best-effort delivery.",
    hint: "Connection-oriented = call before visiting; connectionless = just show up and hope they're home.",
    level: "advanced",
    codeExample: "IP is connectionless; MPLS can be connection-oriented (LSPs)."
  },
  {
    question: "What is 'circuit emulation' over packet networks?",
    shortAnswer: "Circuit emulation simulates a dedicated circuit over a packet-switched network by providing constant bit rate and low jitter.",
    explanation: "Used to transport TDM traffic (e.g., E1/T1) over IP/MPLS networks. Packets are sent at fixed intervals with jitter buffers to recreate the original timing. Requires accurate clock synchronization.",
    hint: "Like sending a steady stream of water through a network that normally works in bursts — you need a buffer to smooth it out.",
    level: "expert",
    codeExample: "Cisco SAToP (Structure-Agnostic TDM over Packet) for pseudowires."
  },
  {
    question: "What is the difference between 'packet switching' and 'frame switching'?",
    shortAnswer: "Packet switching typically refers to network layer (IP); frame switching refers to data link layer (Ethernet, Frame Relay).",
    explanation: "Frame switching uses MAC addresses or DLCI labels and does not look at IP headers. It is generally faster but less flexible. Packet switching involves routing decisions based on network-layer addresses.",
    hint: "Frame switching = switching based on the envelope (MAC); packet switching = opening the envelope to read the address inside (IP).",
    level: "intermediate",
    codeExample: "Ethernet switch = frame switching; IP router = packet switching."
  },
  {
    question: "What is 'source routing' in packet switching?",
    shortAnswer: "Source routing is where the source node specifies the entire path for a packet, rather than routers making independent decisions.",
    explanation: "The packet carries a list of hops. Each router strips its own address and forwards to the next. Used in some networks (e.g., Token Ring) and in IPv4 (loose/strict source route), but often disabled for security.",
    hint: "Like giving a taxi driver a turn-by-turn list instead of just the destination.",
    level: "advanced",
    codeExample: "IPv4 option: LSRR (Loose Source and Record Route)."
  },
  {
    question: "What is 'Label Switching' (MPLS)?",
    shortAnswer: "MPLS (Multiprotocol Label Switching) uses short labels to forward packets along pre-established Label Switched Paths (LSPs).",
    explanation: "It combines the best of packet switching (flexibility) and virtual circuits (fast forwarding). A label is inserted between layer 2 and 3. Routers (LSRs) forward based on label, not IP lookup.",
    hint: "Like using a short code instead of a full address — faster for repeated trips.",
    level: "advanced",
    codeExample: "In MPLS, an LSR pushes a label; the next LSR swaps it; the last pops it."
  },
  {
    question: "What is the difference between 'datagram' and 'virtual circuit' in terms of failure recovery?",
    shortAnswer: "Datagram networks automatically reroute around failures; virtual circuit networks may lose the connection unless a new path is established.",
    explanation: "In datagram, each packet can take a different route, so if a link fails, subsequent packets find an alternate path. In virtual circuit, if a node fails, the circuit is broken and must be re-established (if the network supports fast reroute).",
    hint: "Datagram = each car can take a detour; virtual circuit = the road collapses and you need to call for a new route.",
    level: "advanced",
    codeExample: "IP routing converges around failures; ATM virtual circuits would need to be re-routed via signaling."
  }
];

export default questions;