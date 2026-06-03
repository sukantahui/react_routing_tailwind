const questions = [
  {
    question: "What is the fundamental working principle of Stop-and-Wait ARQ?",
    shortAnswer: "Sender transmits one frame and waits for an acknowledgment (ACK) before sending the next frame.",
    explanation: "Stop-and-Wait ARQ ensures reliable data transfer by requiring an explicit ACK for each frame. A timer is started after transmission; if no ACK arrives before timeout, the frame is retransmitted. Only one frame can be outstanding at any time.",
    hint: "Think of a teacher asking a question to a student and waiting for the student's reply before asking the next.",
    level: "basic",
    codeExample: "// sender pseudo-code\nsend(frame);\nstart_timer();\nwait_for_ACK_or_timeout();\nif (ACK_received) send(next_frame);\nelse retransmit(frame);"
  },
  {
    question: "Why does Stop-and-Wait ARQ use only two sequence numbers (0 and 1)?",
    shortAnswer: "To distinguish between the original transmission and a retransmission, avoiding duplicate frame acceptance.",
    explanation: "With modulo‑2 sequence numbers, the receiver can detect if an arriving frame is a new frame or a retransmission of the last one. When the sender retransmits, the same sequence number is used; the receiver discards it but resends the ACK.",
    hint: "Observe carefully: If we used only one sequence number, how would the receiver know that a second copy is not a new frame?",
    level: "intermediate",
    codeExample: "// sender\nseq = 0;\nwhile (more frames) {\n  send(frame, seq);\n  wait();\n  seq ^= 1; // toggle 0->1, 1->0\n}"
  },
  {
    question: "Explain the role of the timeout timer in Stop-and-Wait ARQ. What happens if the timeout is set too short?",
    shortAnswer: "The timer triggers retransmission when an ACK is not received in time. Too short a timeout causes unnecessary retransmissions (spurious timeouts).",
    explanation: "The timeout value (RTO) should be slightly larger than the round‑trip time (RTT). If RTO is too short, the sender may retransmit even though the ACK is still in transit, wasting bandwidth and causing duplicate frames. If too long, the sender idles needlessly, reducing throughput.",
    hint: "Think about a student answering a question – if the teacher demands an answer too quickly, the student might repeat before finishing.",
    level: "intermediate",
    codeExample: "// typical RTO estimation\nRTO = 2 * measured_RTT;  // simple approximation"
  },
  {
    question: "What are the main disadvantages of Stop-and-Wait ARQ in high‑bandwidth or long‑distance networks?",
    shortAnswer: "Poor channel utilization because the sender spends most of the time idle waiting for ACKs.",
    explanation: "In networks with large bandwidth‑delay product (e.g., satellite links or high‑speed fiber), Stop‑and‑Wait forces the sender to wait for an ACK before sending the next frame. During that waiting period, the channel remains idle, leading to very low throughput.",
    hint: "Imagine delivering letters one by one from Kolkata to New Delhi and waiting for a confirmation postcard each time – most of the time is spent waiting.",
    level: "advanced",
    codeExample: "Utilization = (Transmission_time) / (Transmission_time + 2*Propagation_delay)"
  },
  {
    question: "How does Stop-and-Wait ARQ handle a lost ACK?",
    shortAnswer: "The sender times out and retransmits the original frame; the receiver, seeing a duplicate, discards it but sends the ACK again.",
    explanation: "When an ACK is lost, the sender never receives confirmation and eventually the timer expires. The sender retransmits the same frame (same sequence number). The receiver already delivered that frame, so it discards the duplicate and re‑sends the ACK. This ensures the sender can proceed.",
    hint: "Try changing this: if the ACK loss persists, what prevents infinite retransmission?",
    level: "intermediate",
    codeExample: "// Receiver handling duplicate\nif (received_seq == expected_seq) {\n  deliver_to_upper_layer();\n  expected_seq ^= 1;\n}\nsend_ACK(received_seq);"
  },
  {
    question: "In Stop-and-Wait ARQ, what is the maximum throughput (in frames per second) given a frame transmission time Tf and round‑trip propagation delay RTT?",
    shortAnswer: "Throughput = 1 / (Tf + RTT) frames per second, assuming no errors.",
    explanation: "The sender completes a full cycle of send‑wait‑ACK in time Tf + RTT. Only one frame is delivered per cycle, so the maximum frame rate is the reciprocal of that cycle time. For error‑free channels, this is the absolute upper bound.",
    hint: "Think about the total time from start of transmission to when the next frame can be sent.",
    level: "advanced",
    codeExample: "Throughput (bps) = Frame_size / (Tf + RTT)"
  },
  {
    question: "What is the purpose of the receiver sending an ACK for a duplicate frame?",
    shortAnswer: "To re‑synchronize the sender so it doesn’t remain stuck waiting for an ACK.",
    explanation: "When a duplicate frame arrives, the receiver already has the data, but the sender doesn't know that the original ACK was lost. By sending the ACK again, the receiver informs the sender that the frame was already accepted, allowing the sender to move to the next frame.",
    hint: "Observe carefully: the duplicate ACK acts as a 'reminder' to the sender.",
    level: "intermediate",
    codeExample: "// always send ACK for any frame with seq equal to last delivered\nsend_ACK(dup_seq);"
  },
  {
    question: "How would you modify Stop-and-Wait ARQ to support half‑duplex communication channels?",
    shortAnswer: "The protocol naturally works because transmission and reception are time‑separated; no modification is needed.",
    explanation: "Stop‑and‑Wait inherently alternates between sending and receiving. The sender transmits, then turns around to listen for the ACK. This matches half‑duplex media (e.g., walkie‑talkie). Only one direction is active at a time, so no collision occurs.",
    hint: "Think about the sequence: send → wait → receive ACK → send again. It never sends and receives simultaneously.",
    level: "basic",
    codeExample: "// half-duplex: just use the same channel with time division"
  },
  {
    question: "Can Stop-and-Wait ARQ be used for multicast or broadcast? Why or why not?",
    shortAnswer: "No, because it relies on individual acknowledgments from a single receiver. Multicast would require ACK implosion or complex coordination.",
    explanation: "Stop‑and‑Wait expects exactly one ACK per frame. In multicast, many receivers would send ACKs, causing collisions and confusion. There is no single sequence number that satisfies all receivers. Other protocols (e.g., NACK‑based or reliable multicast) are used instead.",
    hint: "What would the sender do if one receiver ACKs and another does not?",
    level: "expert",
    codeExample: "// Not applicable – Stop-and-Wait is unicast only"
  },
  {
    question: "What is the effect of a corrupted frame (detected by checksum) on the receiver’s behavior in Stop-and-Wait ARQ?",
    shortAnswer: "The receiver discards the corrupted frame and does not send an ACK. The sender times out and retransmits.",
    explanation: "Silence (no ACK) is interpreted as a failure. The sender’s timer eventually expires, triggering retransmission. The receiver ignores the bad frame, so no state change occurs. This approach is simple but can cause unnecessary retransmissions if the ACK itself is corrupted.",
    hint: "Try changing this: would sending a NACK improve efficiency?",
    level: "intermediate",
    codeExample: "if (checksum_failed) discard(); // do not send ACK"
  },
  {
    question: "Compare Stop-and-Wait ARQ with a simple stop‑and‑wait without retransmission (i.e., no timeout).",
    shortAnswer: "Without retransmission, any lost frame causes deadlock. ARQ adds reliability through timeout and retransmission.",
    explanation: "Plain stop‑and‑wait assumes perfect delivery. If a frame or ACK is lost, both sender and receiver wait forever. Stop‑and‑Wait ARQ introduces timers and retransmission to recover from losses, making it suitable for unreliable channels.",
    hint: "Think about the word 'Automatic Repeat reQuest' – the key is automatic retransmission.",
    level: "basic",
    codeExample: "plain: send(); wait_ACK(); // infinite if ACK lost\nARQ: send(); start_timer(); if(timeout) resend();"
  },
  {
    question: "Describe a scenario where Stop-and-Wait ARQ actually achieves 100% channel utilization.",
    shortAnswer: "When the transmission time equals or exceeds the round‑trip time – i.e., when the frame is still being transmitted when the ACK arrives.",
    explanation: "If Tf >> RTT, the sender is busy transmitting during most of the cycle. The waiting period (RTT) becomes negligible compared to Tf, so utilization approaches 100%. This happens with very long frames or very short propagation delays (e.g., local cables).",
    hint: "Think about sending a huge file over a very short cable, e.g., Susmita's dorm‑to‑dorm Ethernet.",
    level: "advanced",
    codeExample: "Util = Tf / (Tf + RTT) → 1 when RTT << Tf"
  },
  {
    question: "What is the main difference between Stop-and-Wait ARQ and a sliding window protocol with window size 1?",
    shortAnswer: "They are functionally identical; window size 1 in Go‑Back‑N behaves exactly like Stop‑and‑Wait.",
    explanation: "A sliding window protocol allows multiple outstanding frames. When the window size is limited to 1, only one frame can be in flight, and the sender must wait for an ACK before advancing the window. This replicates Stop‑and‑Wait’s behavior.",
    hint: "Observe carefully: many textbooks use Stop‑and‑Wait as the simplest case of a sliding window.",
    level: "intermediate",
    codeExample: "// Go-Back-N with N=1\nwindow_size = 1;\n// exactly same as Stop-and-Wait"
  },
  {
    question: "How would you implement a reliable file transfer using Stop-and-Wait ARQ over UDP?",
    shortAnswer: "Implement timers, sequence numbers, ACKs, and retransmission logic above UDP, exactly matching the protocol.",
    explanation: "UDP provides no reliability. You would need to: (1) add a header with sequence number, (2) send one datagram, (3) start a timer, (4) wait for a corresponding ACK datagram, (5) retransmit on timeout, and (6) advance sequence number only after ACK. This is essentially building a custom Stop‑and‑Wait layer.",
    hint: "Think about how TFTP (Trivial File Transfer Protocol) works – it uses Stop‑and‑Wait over UDP.",
    level: "expert",
    codeExample: "while (remaining) {\n  send_with_seq();\n  wait_for_ACK_or_timeout();\n  if (timeout) continue;\n  seq++;\n}"
  },
  {
    question: "What is the 'deadlock' scenario in Stop-and-Wait ARQ and how is it prevented?",
    shortAnswer: "A deadlock can occur if both ACK and the retransmitted frame are lost, and no mechanism exists to break the cycle. Using a finite maximum retransmission count prevents infinite deadlock.",
    explanation: "If a frame is lost, the sender retransmits. If that retransmission is also lost and the corresponding ACK never arrives, the sender could retransmit forever. By limiting the number of retransmission attempts (e.g., 12 tries) and then giving up, the protocol avoids indefinite deadlock.",
    hint: "Try changing this: what if the channel is 100% lossy? The sender needs an escape hatch.",
    level: "advanced",
    codeExample: "int count = 0;\nwhile (count < MAX_RETRIES) { retransmit(); count++; }"
  },
  {
    question: "Explain why Stop-and-Wait ARQ cannot fully utilize a full‑duplex channel.",
    shortAnswer: "It only uses one direction at a time, ignoring the possibility of simultaneous two‑way transmission of data and ACKs.",
    explanation: "Stop‑and‑Wait alternates transmission and reception. Even though the physical medium supports full‑duplex, the protocol forces the sender to stop and wait for the ACK before sending again. Pipelining (multiple frames in flight) is needed to exploit full‑duplex capacity.",
    hint: "Think about two people talking over a phone line (full‑duplex) but only one speaks at a time – that's how Stop‑and‑Wait behaves.",
    level: "intermediate",
    codeExample: "// full-duplex capable but protocol serializes\nsend();   // occupies one direction\nwait();   // other direction used only for ACK"
  },
  {
    question: "How does Stop-and-Wait ARQ handle bit errors in the ACK frame itself?",
    shortAnswer: "If the ACK is corrupted, the sender cannot recognize it and will timeout, causing an unnecessary retransmission.",
    explanation: "The protocol treats a corrupted ACK as no ACK. The sender retransmits the frame. The receiver may receive a duplicate (if the original ACK was corrupted after the receiver sent it) or may not have received the frame. This inefficiency is acceptable for simplicity.",
    hint: "Observe carefully: adding checksum to ACK reduces the chance, but corruption can still happen.",
    level: "intermediate",
    codeExample: "// sender: only recognizes a valid ACK with correct seq"
  },
  {
    question: "What is the 'performance anomaly' of Stop-and-Wait ARQ on links with asymmetric bandwidth?",
    shortAnswer: "The reverse channel (for ACKs) may become a bottleneck if the frame size is large and bandwidth low, increasing RTT and reducing throughput.",
    explanation: "Even though ACKs are tiny, they compete for bandwidth. If the reverse link is very slow, the ACK takes a long time to reach the sender, effectively inflating the RTT. This further reduces utilization because the sender waits longer before sending the next frame.",
    hint: "Think about a satellite uplink being fast, downlink slow – ACK comes back slowly.",
    level: "expert",
    codeExample: "Effective_RTT = T_data_forward + T_ACK_reverse"
  },
  {
    question: "Can Stop-and-Wait ARQ be used for streaming applications? Why not?",
    shortAnswer: "No, because it introduces head‑of‑line blocking and high latency per packet, unsuitable for real‑time streaming.",
    explanation: "Streaming requires continuous packet delivery with tolerable delay. Stop‑and‑Wait forces each packet to be acknowledged before the next can be sent, causing idle periods and variable delay. If a packet is lost, retransmission adds even more delay, breaking real‑time constraints.",
    hint: "Would Mamata enjoy a video stream that pauses after every frame until the server gets an OK?",
    level: "advanced",
    codeExample: "// streaming uses UDP or sliding window TCP, not Stop-and-Wait"
  },
  {
    question: "What is the main advantage of Stop-and-Wait ARQ that makes it still used in some modern systems?",
    shortAnswer: "Simplicity and minimal buffer requirements – only one frame needs to be buffered at sender and receiver.",
    explanation: "In resource‑constrained devices (e.g., tiny IoT sensors, embedded systems with limited RAM), Stop‑and‑Wait is attractive because it requires only a single frame buffer. The protocol logic is trivial to implement in firmware, and no complex window management is needed.",
    hint: "Think about a temperature sensor that sends one reading per minute – enough buffers are not needed.",
    level: "intermediate",
    codeExample: "char tx_buffer[MTU];  // only one frame buffer"
  },
  {
    question: "How does the 'piggybacking' concept relate to Stop-and-Wait ARQ?",
    shortAnswer: "Piggybacking merges an ACK with outgoing data frames, but Stop‑and‑Wait does not require it because only one direction has data at a time.",
    explanation: "In bidirectional data exchange, piggybacking improves efficiency by attaching ACK to data frames. However, Stop‑and‑Wait is inherently half‑duplex from a logical perspective, so the channel is idle in the reverse direction. Piggybacking is more beneficial in sliding window protocols.",
    hint: "Observe carefully: if both sides have data to send, Stop‑and‑Wait would cause alternating transmissions, and piggybacking could reduce ACK overhead.",
    level: "expert",
    codeExample: "// not typical for basic Stop-and-Wait"
  },
  {
    question: "How would you compute the average throughput of Stop-and-Wait ARQ in a channel with frame loss probability p?",
    shortAnswer: "Throughput = (1-p) / (Tf + RTT) frames per second, assuming independent losses.",
    explanation: "Each frame transmission succeeds with probability (1-p) when both the frame and its ACK are not lost (simplified). The expected number of transmissions per successful frame is 1/(1-p). The cycle time remains Tf + RTT, so throughput = (1-p) / (Tf+RTT).",
    hint: "Try changing this: does ACK loss probability matter separately? For symmetric loss, effective p ≈ p_data + p_ack.",
    level: "expert",
    codeExample: "Efficiency = (1-p) / (1 + (RTT/Tf))  // relative to max"
  },
  {
    question: "What is the main limitation of Stop-and-Wait ARQ in supporting very high data rates?",
    shortAnswer: "The propagation delay (RTT) becomes the dominant factor, causing the protocol to be severely under‑utilized.",
    explanation: "At high data rates (e.g., 10 Gbps), the time to transmit a maximum‑sized frame (say 1500 bytes) is about 1.2 microseconds. An RTT of 1 ms would result in utilization below 0.1%. The idle time is three orders of magnitude larger than the transmission time – unbearable.",
    hint: "Think about the bandwidth‑delay product: it measures how many bits can be in flight. Stop‑and‑Wait allows only one frame.",
    level: "advanced",
    codeExample: "Bandwidth-delay product = 10 Gbps * 0.001 s = 10 Mbits; Stop-and-Wait sends only 12 kbits (1500 bytes)."
  },
  {
    question: "In a noisy channel, could repeated retransmissions cause congestion collapse?",
    shortAnswer: "Yes, if many senders using Stop‑and‑Wait retransmit aggressively, the channel load can increase dramatically, worsening collisions and losses.",
    explanation: "When losses occur, senders retransmit the same frames, effectively increasing the offered load. Without backoff, this positive feedback can lead to congestion collapse. Modern protocols incorporate exponential backoff (like Ethernet CSMA/CD or TCP) to avoid this, but basic Stop‑and‑Wait lacks such mechanisms.",
    hint: "Observe carefully: what if every student in a classroom raises their hand and repeats 'me' whenever not heard? Chaos.",
    level: "expert",
    codeExample: "// no backoff: fixed timer"
  },
  {
    question: "How does the concept of 'sequence number space' evolve from Stop-and-Wait to sliding window protocols?",
    shortAnswer: "Stop‑and‑Wait uses modulo‑2; sliding windows require larger modulo (e.g., modulo 2^w) to distinguish multiple in‑flight frames.",
    explanation: "Because only one frame is outstanding, two sequence numbers are sufficient to avoid ambiguity. When multiple frames can be in flight (window size >1), the sequence number space must be at least twice the window size to correctly differentiate new frames from retransmissions. This is the foundation of Go‑Back‑N and Selective Repeat.",
    hint: "Think about how many different labels you need if you can have several people talking at once.",
    level: "advanced",
    codeExample: "// window size W, need modulo ≥ 2W"
  },
  {
    question: "What is the effect of RTO (Retransmission TimeOut) being larger than the actual RTT?",
    shortAnswer: "It reduces throughput because the sender idles longer than necessary before retransmitting a lost frame.",
    explanation: "If the timeout is too large, a lost frame will cause a long idle period before retransmission. This increases the effective cycle time for lost frames, lowering average throughput. However, setting RTO too close to RTT risks spurious timeouts due to jitter.",
    hint: "Try changing this: find the perfect RTO that balances between spurious timeouts and long waits.",
    level: "intermediate",
    codeExample: "RTO = SRTT + 4*RTTVAR  (Jacobson’s algorithm) is often used."
  },
  {
    question: "Could Stop-and-Wait ARQ be used for reliable multicast by forcing each receiver to ACK individually? Why would this fail?",
    shortAnswer: "ACK implosion: the sender would be overwhelmed by simultaneous ACKs from all receivers, and the channel would collapse.",
    explanation: "If N receivers each send an ACK for every frame, the sender’s network interface would receive N ACKs per frame. The overhead linear with N makes the protocol unscalable. Also, a single lost ACK could cause unnecessary retransmission to all, further amplifying. Group ACK mechanisms or NACKs are required.",
    hint: "Think about 1000 students saying 'got it' at the same time to a teacher – the teacher hears only noise.",
    level: "expert",
    codeExample: "// not feasible"
  },
  {
    question: "What happens if the sender’s timer expires exactly when an ACK arrives? How should it be resolved?",
    shortAnswer: "The sender must handle races: if ACK arrives just after timeout, there’s a risk of duplicate transmission. The protocol should check for ACK before retransmitting.",
    explanation: "In a correct implementation, the timeout handler should first check if an ACK has already been received (e.g., using a flag). If an ACK arrived after the timeout but before the retransmission routine gets the CPU, the retransmission should be cancelled. This prevents unnecessary duplicate frames.",
    hint: "Observe carefully: Use a 'ack_received' flag and atomic operations or mutexes in multithreaded code.",
    level: "expert",
    codeExample: "if (timeout && !ack_received) retransmit();"
  },
  {
    question: "How does Stop-and-Wait ARQ relate to the concept of 'automatic repeat request' in HDLC?",
    shortAnswer: "HDLC (High‑Level Data Link Control) defines a Stop‑and‑Wait mode as one of its options, often called the 'Normal Response Mode' with polling.",
    explanation: "In HDLC, the primary station polls secondary stations, and each secondary responds with a frame. That polling pattern effectively implements a stop‑and‑wait style: the primary sends a poll, waits for the response, then polls another. The retransmission logic uses timers and sequence numbers similar to Stop‑and‑Wait ARQ.",
    hint: "Think about a teacher calling on students one by one – each must answer before the next is called.",
    level: "advanced",
    codeExample: "// HDLC polling: primary sends poll, secondary sends frame + ACK"
  },
  {
    question: "You are designing a deep‑space communication link with a 10‑minute RTT. Is Stop‑and‑Wait ARQ suitable? Propose a better alternative and explain why.",
    shortAnswer: "No, Stop‑and‑Wait would be catastrophic (utilization near zero). Use a large sliding window or delay‑tolerant networking with selective retransmission.",
    explanation: "With 10 minute RTT, the sender would wait 10 minutes for every frame. Even with large frames, throughput would be minuscule. Protocols like CFDP (CCSDS File Delivery Protocol) use windowing and selective NACKs to keep the channel busy and recover lost data efficiently over long delays.",
    hint: "Try changing this: imagine sending one postcard to Mars and waiting 20 minutes for a reply – millions of postcards could have been sent during that wait.",
    level: "expert",
    codeExample: "// Use window size = (Bandwidth * RTT) / FrameSize"
  }
];

export default questions;