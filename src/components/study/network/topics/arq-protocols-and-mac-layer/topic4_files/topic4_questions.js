const questions = [
  {
    question: "What are the three major classic IEEE 802 LAN standards and their access methods?",
    shortAnswer: "802.3 (CSMA/CD), 802.4 (Token Bus), 802.5 (Token Ring).",
    explanation: "802.3 Ethernet uses Carrier Sense Multiple Access with Collision Detection. 802.4 Token Bus uses a logical ring over a physical bus, passing a token. 802.5 Token Ring uses a physical ring and a circulating token.",
    hint: "Think of three different ways to share a conversation: listen before talk (CSMA), pass a talking stick (token), or a ring of people passing a stick.",
    level: "basic",
    codeExample: "// 802.3: carrier sense; 802.4/5: token passing"
  },
  {
    question: "What is the purpose of the minimum frame size (64 bytes) in Ethernet 802.3?",
    shortAnswer: "To ensure that collision detection works before the sender finishes transmitting.",
    explanation: "In CSMA/CD, a collision must be detected while the sender is still transmitting to allow jamming and backoff. The minimum frame size ensures that the transmission time is at least twice the maximum propagation delay (slot time), so a collision at the far end can be detected before the frame ends.",
    hint: "Try changing the frame size: if too short, a collision might occur after the sender has already stopped, and the sender would wrongly assume success.",
    level: "intermediate",
    codeExample: "min_frame_size = (2 * max_prop_delay) * data_rate;"
  },
  {
    question: "What is the 'slot time' in Ethernet and why is it 512 bit times?",
    shortAnswer: "Slot time is the maximum time to detect a collision; it equals 2× the maximum propagation delay plus the jam signal time. For 10 Mbps, 512 bit times ≈ 51.2 µs.",
    explanation: "The slot time is used to determine the minimum frame length and the backoff algorithm. It represents the round‑trip propagation time of a 10 Mbps Ethernet segment with up to 4 repeaters (2500 m). 512 bits was chosen as a convenient power of 2.",
    hint: "Observe carefully: slot time ensures that the worst‑case collision is detected within the slot.",
    level: "advanced",
    codeExample: "slot_time = 512 bits (for 10 Mbps Ethernet)"
  },
  {
    question: "How does Token Ring (802.5) handle a lost token?",
    shortAnswer: "A designated station (active monitor) detects the absence of the token and generates a new token.",
    explanation: "Each Token Ring has an active monitor that uses a timer. If the token is missing (e.g., due to noise or station failure), the monitor purges the ring, issues a new token, and restarts operation. This is essential for self‑healing.",
    hint: "Think about a conductor who notices the baton is missing and pulls out a new one.",
    level: "intermediate",
    codeExample: "// active monitor: if no token for time T, claim token"
  },
  {
    question: "What is the main advantage of token‑based protocols (802.4/802.5) over CSMA/CD (802.3) under heavy load?",
    shortAnswer: "Token protocols are deterministic and have bounded delay; CSMA/CD experiences increasing collisions and variable delay.",
    explanation: "Under heavy load, CSMA/CD collisions increase, throughput decreases, and delay becomes unpredictable. Token passing ensures that only one station transmits at a time, providing fair access and predictable maximum latency, which is critical for real‑time applications.",
    hint: "Try changing the load: heavy load → Ethernet collisions; token passes smoothly.",
    level: "basic",
    codeExample: "// token: bandwidth divided equally; Ethernet: collisions dominate"
  },
  {
    question: "Why did Ethernet (802.3) ultimately dominate over Token Ring and Token Bus?",
    shortAnswer: "Lower cost, simpler hardware, and the advent of switches that eliminated collisions (making deterministic access less important).",
    explanation: "Ethernet used inexpensive coaxial cable and later twisted pair. Switched Ethernet provides dedicated bandwidth per port, eliminating collisions entirely, so the deterministic advantage of token protocols became irrelevant. Token Ring and Token Bus required more complex hardware (token management, active monitors) and were more expensive.",
    hint: "Think about the cost of a token ring adapter vs an Ethernet card in the 1990s – a factor of 2-3x.",
    level: "intermediate",
    codeExample: "// switched Ethernet: full duplex, no collisions"
  },
  {
    question: "What is the logical ring in 802.4 Token Bus, and how is it maintained?",
    shortAnswer: "Stations are connected by a physical bus, but they pass a token in an address‑ordered logical ring; the ring is maintained by successor and predecessor pointers.",
    explanation: "Each station knows its logical successor. After transmitting, it sends a token frame to that successor. If a station fails, its neighbors adjust pointers – similar to a doubly linked list. This allows a bus topology to act like a ring without the physical ring wiring.",
    hint: "Observe carefully: it's like a club where members sit in a row but pass a talking stick in order of membership number.",
    level: "advanced",
    codeExample: "send_token(successor); if (successor not responding) update ring"
  },
  {
    question: "What is the 'beaconing' process in 802.5 Token Ring?",
    shortAnswer: "A fault recovery mechanism where a station sends a beacon frame to signal a ring break and initiate auto‑reconfiguration.",
    explanation: "If a station detects a line break or a failed neighbor, it sends a beacon frame onto the ring. Other stations relay it. The active monitor performs a ring purge and then tries to restore the ring by bypassing the faulty section.",
    hint: "Think of a lighthouse beacon that signals danger to ships; the ring reconstitutes around the fault.",
    level: "expert",
    codeExample: "// beaconing: isolate fault, then perform neighbor notification"
  },
  {
    question: "What is the difference between a token and a frame in 802.5?",
    shortAnswer: "A token is a 3‑byte control frame that grants the right to transmit. A frame carries data and is transmitted only after capturing the token.",
    explanation: "The token (a specific bit pattern: J K 0 J K 0 0 0) circulates invisibly. A station wanting to send first captures the token (converts it to a start‑of‑frame delimiter), then appends its data. After the data returns, the station releases a new token.",
    hint: "Try changing this: without a token, no one can transmit; the token is the 'permission slip'.",
    level: "intermediate",
    codeExample: "// token: 3 bytes; frame: header+data+trailer"
  },
  {
    question: "How does CSMA/CD handle a collision after the collision detection?",
    shortAnswer: "It sends a jamming signal to ensure all stations detect the collision, then performs binary exponential backoff.",
    explanation: "When a collision is detected, the transmitting station sends a 32‑bit jam sequence to make the collision unmistakable. Then each station involved waits a random multiple of slot times (backoff). After each collision, the backoff interval range doubles (exponential backoff) to reduce future collision probability.",
    hint: "Observe carefully: it's like two people shouting 'sorry' and then waiting random times to speak again.",
    level: "intermediate",
    codeExample: "backoff = rand(0, 2^k - 1) * slot_time; k++ on each collision"
  },
  {
    question: "What is the maximum length of a 10BASE5 Ethernet segment?",
    shortAnswer: "500 meters (hence '5' in 10BASE5).",
    explanation: "10BASE5 (thicknet) had a maximum segment length of 500 m. With up to 4 repeaters, the total network span could be 2500 m. The segment length ensured that the slot time (51.2 µs) allowed collision detection across the maximum network diameter.",
    hint: "Think of '5' = 500 m; '2' in 10BASE2 = 185 m (~200).",
    level: "basic",
    codeExample: "max_segment = 500m; min_frame_size = 64 bytes"
  },
  {
    question: "What is the purpose of the preamble in an Ethernet frame?",
    shortAnswer: "To synchronize the receiver's clock before the actual frame starts.",
    explanation: "The preamble is 7 bytes of alternating 1 and 0 bits (101010...). It allows the physical layer to detect the start of transmission and lock onto the bit clock. The Start Frame Delimiter (SFD) follows (10101011) to mark the beginning of the frame.",
    hint: "Think of a countdown before a race: 'ready, set, go!' — the preamble is the 'ready, set'.",
    level: "basic",
    codeExample: "preamble = 0xAA repeated 7 times; SFD = 0xAB"
  },
  {
    question: "In Token Ring, what is the difference between early and late token release?",
    shortAnswer: "Early token release (ETR) releases the token immediately after transmitting the frame; late release waits for the frame to return.",
    explanation: "With late release, a station captures the token, sends its frame, and waits for the frame to return before releasing the token. With early token release (16 Mbps ring), the station releases a new token as soon as it finishes transmitting, improving throughput. Most modern implementations use ETR.",
    hint: "Try changing release timing: early release allows multiple frames on ring simultaneously.",
    level: "advanced",
    codeExample: "// ETR: after tx, send token; late release: after frame returns"
  },
  {
    question: "What is the 'jabber lockup' protection in Ethernet?",
    shortAnswer: "A mechanism that disables a station transmitting longer than a certain time (e.g., 150ms) to prevent a faulty station from hogging the network.",
    explanation: "If a station's transceiver malfunctions and transmits continuously, it prevents others from accessing the channel. Jabber control, typically in the transceiver or PHY, cuts off transmission after a timeout (usually 40-150 ms) and releases the line.",
    hint: "Think of a speaker who won't stop talking – the moderator cuts them off.",
    level: "intermediate",
    codeExample: "// jabber timer: if tx > max_time, abort"
  },
  {
    question: "What is the IEEE 802.4 priority mechanism?",
    shortAnswer: "Token Bus supports four priority classes (0‑3) where tokens can be issued for different priority levels, allowing higher‑priority frames to be sent sooner.",
    explanation: "The token circulation can be split into multiple logical rings, each for a priority level. A station may hold the token for a certain time per class, ensuring that high‑priority traffic is transmitted before lower priority. This was designed for industrial real‑time control.",
    hint: "Observe carefully: like an emergency vehicle having a higher priority to pass.",
    level: "expert",
    codeExample: "// token for class 3 (highest) circulates more frequently"
  },
  {
    question: "Why does the minimum Ethernet frame size depend on the maximum cable length?",
    shortAnswer: "To ensure that a collision at the farthest point is detected before the sender finishes transmitting.",
    explanation: "The worst‑case time to detect a collision is twice the maximum propagation delay (round trip). The sender must still be transmitting at that moment to hear the collision. Therefore, the frame transmission time must be ≥ 2× max propagation delay. This translates to a minimum frame size in bits.",
    hint: "Try changing the cable length: longer cable → larger minimum frame size (or lower speed).",
    level: "intermediate",
    codeExample: "min_frame_bits = 2 * (max_distance / signal_speed) * data_rate"
  },
  {
    question: "What was the main disadvantage of Token Bus (802.4) that led to its demise?",
    shortAnswer: "Complexity of maintaining the logical ring and high cost compared to Ethernet.",
    explanation: "Token Bus required each station to know its predecessor and successor, manage ring initialization, failure recovery (e.g., claim token, resolve duplicate addresses), and implement priority queuing. The hardware and software overhead made it expensive, while Ethernet offered simpler, cheaper CSMA/CD.",
    hint: "Think of a complicated electric system vs a simple light switch – simplicity wins.",
    level: "advanced",
    codeExample: "// Token Bus: complex state machine; Ethernet: simple"
  },
  {
    question: "What is the 'binary exponential backoff' algorithm in Ethernet?",
    shortAnswer: "After each collision, the backoff interval range doubles (up to 10 times), increasing randomness and reducing further collisions.",
    explanation: "After n collisions, the station picks a random number r from [0, 2^k - 1] where k = min(n, 10). It waits r × slot_time. This exponential increase spreads out retransmissions as load increases, stabilizing the network. After 16 collisions, the frame is discarded.",
    hint: "Try changing k to fixed: would cause repeated collisions. Exponential saves the day.",
    level: "intermediate",
    codeExample: "k = min(collision_count, 10); delay = rand(0, (1 << k) - 1) * slot_time;"
  },
  {
    question: "How does a switched Ethernet eliminate collisions?",
    shortAnswer: "Each port is a separate collision domain; frames are buffered and forwarded only to the destination port, so no collisions occur.",
    explanation: "Unlike a shared hub, a switch maintains a MAC address table and forwards frames only to the intended port. The switch port and the connected station operate in full‑duplex mode (separate send/receive pairs), so there is no chance of collision. CSMA/CD is disabled.",
    hint: "Think of a post office that sorts letters to individual mailboxes instead of everyone sharing a single bin.",
    level: "basic",
    codeExample: "// switch: store‑and‑forward, no collisions"
  },
  {
    question: "What is the 'beaconing' fault recovery in Token Ring and how does it differ from Ethernet's approach?",
    shortAnswer: "Beaconing actively isolates ring faults; Ethernet relies on higher‑layer protocols (e.g., STP) and has no physical layer fault recovery.",
    explanation: "In Token Ring, a station detecting a break sends a beacon; the ring reconfigures. Ethernet originally had no built‑in recovery; spanning tree protocol (802.1D) recovers from link failures at layer 2, but not at the ring level.",
    hint: "Observe carefully: Token Ring's self‑healing was advanced for its time.",
    level: "expert",
    codeExample: "// Token Ring: beacon; Ethernet: rely on STP"
  },
  {
    question: "What is the purpose of the FCS (Frame Check Sequence) in IEEE 802 frames?",
    shortAnswer: "To detect transmission errors (bit errors) using a CRC (usually 32‑bit).",
    explanation: "The FCS is a cyclic redundancy check calculated over the frame's destination address, source address, length/type, data, and padding. The receiver recomputes it; if it doesn't match, the frame is discarded. This provides error detection, not correction.",
    hint: "Think of a checksum at the end of a form to ensure no numbers were mis‑typed.",
    level: "basic",
    codeExample: "fcs = crc32(dest + src + len + data + pad);"
  },
  {
    question: "Why do Token Ring networks often have an 'active monitor' and a 'standby monitor'?",
    shortAnswer: "To provide fault tolerance – if the active monitor fails, a standby takes over token management.",
    explanation: "The active monitor performs timing, token generation, and ring purge. All other stations are standby monitors. If the active monitor fails (no signal), the standbys hold an election to choose a new active monitor. This is similar to a leader election in distributed systems.",
    hint: "Think of a teacher with a vice‑teacher; if the teacher is absent, the vice takes charge.",
    level: "advanced",
    codeExample: "// monitor claim process: highest address becomes active"
  },
  {
    question: "What are the typical speeds and media for 802.5 Token Ring?",
    shortAnswer: "4 Mbps and 16 Mbps on shielded twisted pair (STP) or unshielded twisted pair (UTP).",
    explanation: "IBM Token Ring initially ran at 4 Mbps, then 16 Mbps using STP (Type 1) or later UTP (Type 3). The physical connectors were unique (IBM data connector). Fast Token Ring (100 Mbps) existed but was rare.",
    hint: "Observe carefully: 16 Mbps rings used early token release (ETR) for higher throughput.",
    level: "intermediate",
    codeExample: "// 4/16 Mbps; STP/UTP"
  },
  {
    question: "What is the difference between a collision and a 'late collision' in Ethernet?",
    shortAnswer: "A late collision occurs after the slot time (beyond 512 bits), generally due to excessive network length or faulty hardware.",
    explanation: "Normal collisions happen within the slot time. A late collision happens after 512 bit times; it is considered an error because the sender will have already completed transmission, so it doesn't retransmit automatically – the frame is dropped, and higher layers must recover. Late collisions often indicate a broken transceiver or mismatched duplex.",
    hint: "Try changing the cable length beyond specs: late collisions appear.",
    level: "expert",
    codeExample: "if (collision_detected_after_512_bits) late_collision_error();"
  },
  {
    question: "Why did 802.4 Token Bus find use in factory automation (MAP)?",
    shortAnswer: "Its deterministic, bounded latency was essential for real‑time control; CSMA/CD was not predictable enough.",
    explanation: "Manufacturing Automation Protocol (MAP) required guaranteed maximum access delay for time‑critical commands (e.g., robot stop). Token Bus provided deterministic access, while Ethernet's collisions could cause unbounded delays under load.",
    hint: "Think of a car assembly line: if a robot command is delayed, the car might be damaged. Determinism is safety.",
    level: "advanced",
    codeExample: "// MAP used 802.4 for real‑time, 802.3 for non‑critical"
  },
  {
    question: "What is the 'truncated binary exponential backoff' limit in Ethernet?",
    shortAnswer: "The backoff exponent is capped at 10 (so maximum wait of 1023 slot times) to prevent excessively long delays.",
    explanation: "After 10 collisions, k stops increasing. This avoids waiting times that are astronomically large. After 16 collisions, the frame is dropped. This makes the algorithm practical while still providing fair access.",
    hint: "Observe carefully: infinite exponential backoff would cause unbounded delays; truncation keeps it manageable.",
    level: "intermediate",
    codeExample: "k = min(collision_count, 10);"
  },
  {
    question: "How does the Token Ring 802.5 handle priority and reservation?",
    shortAnswer: "The token and frame headers contain priority (P) and reservation (R) fields. Stations can reserve higher priority for future transmission.",
    explanation: "A station wishing to send high‑priority frames can set the reservation bits in any passing frame or token to a higher priority. When the token is released, the priority is set to the highest reserved value, giving precedence to those stations.",
    hint: "Think of an emergency vehicle setting a digital 'I need right of way' flag.",
    level: "expert",
    codeExample: "// if my_priority > token.priority: reserve"
  },
  {
    question: "Why was 10BASE2 Ethernet called 'cheapernet'?",
    shortAnswer: "It used thin coaxial cable (RG‑58) costing less than the thick coaxial cable of 10BASE5.",
    explanation: "10BASE2 used a simple BNC connector and thin coax, which was easier to install and much cheaper than the vampire taps and thick coax of 10BASE5. Maximum segment length was reduced to 185 m, but it became popular in offices.",
    hint: "Observe carefully: '2' stands for 200 m (approx).",
    level: "basic",
    codeExample: "// 10BASE2: thin coax, 185m segments"
  },
  {
    question: "What is the role of the length field in Ethernet 802.3 (original) vs the type field in Ethernet II (DIX)?",
    shortAnswer: "802.3 uses a length field (frame payload length); Ethernet II uses a type field (protocol identifier). Modern Ethernet uses 802.3 with the field meaning length if ≤1500, otherwise type (EtherType).",
    explanation: "The original 802.3 had no type, only length; the upper layer protocol was indicated by an 802.2 LLC header. Ethernet II (used by DIX) put a type field in that location. Later, 802.3 adopted EtherType by using values > 1536 to distinguish type from length.",
    hint: "Try changing this: if value ≤ 1500 → length; if > 1536 → EtherType.",
    level: "advanced",
    codeExample: "if (field <= 1500) length; else type;"
  },
  {
    question: "What is the main reason token‑based LANs are rarely used today, despite their deterministic advantages?",
    shortAnswer: "Switched Ethernet offers full‑duplex, no collisions, and near‑deterministic performance at much lower cost and higher speeds.",
    explanation: "Modern Ethernet switches provide dedicated bandwidth per port, eliminating contention. With quality of service (QoS) like 802.1Q and 802.1p, priority can be enforced. Token Ring and Token Bus could not scale to gigabit speeds economically, and their complex token management became unnecessary.",
    hint: "Think of private highways (switched Ethernet) vs a single shared road with a traffic light (token ring).",
    level: "intermediate",
    codeExample: "// switched Ethernet: each port its own private lane"
  }
];

export default questions;