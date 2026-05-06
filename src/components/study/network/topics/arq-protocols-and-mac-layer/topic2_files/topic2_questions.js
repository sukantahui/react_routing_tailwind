const questions = [
  {
    question: "What is the fundamental difference between Selective Repeat and Go-Back-N?",
    shortAnswer: "Selective Repeat retransmits only lost frames; Go-Back-N retransmits all frames from the lost one onward.",
    explanation: "Selective Repeat uses receiver buffering and individual acknowledgments to retransmit only the missing frames, while Go-Back-N discards out-of-order frames and retransmits the entire window after a loss. This makes Selective Repeat more bandwidth-efficient on error-prone channels.",
    hint: "Think about fixing only the broken page of a book vs. reprinting the whole chapter.",
    level: "basic",
    codeExample: "// SR: retransmit only frame 2\n// GBN: retransmit 2,3,4,..."
  },
  {
    question: "Why does Selective Repeat require a sequence number space of at least 2× window size?",
    shortAnswer: "To avoid ambiguity between new frames and retransmissions when the window wraps around.",
    explanation: "Because the sender may receive ACKs for later frames while the earliest frame is still unacknowledged, the sender's window can slide without the receiver having seen the missing frame. With modulo < 2N, a new frame could incorrectly be interpreted as a retransmission of an old one. Modulus 2N ensures that the advancing window never overlaps its previous range.",
    hint: "Observe carefully: draw a timeline with window size 3, modulo 4 (0-3). Ambiguity appears – try modulo 6.",
    level: "advanced",
    codeExample: "const SEQ_MOD = 2 * WINDOW_SIZE;"
  },
  {
    question: "What is the role of the receiver buffer in Selective Repeat?",
    shortAnswer: "It stores out-of-order frames until the missing frame arrives, allowing in-order delivery to the upper layer.",
    explanation: "Unlike Go-Back-N, the receiver does not discard out-of-order frames. It buffers them. Once the missing frame(s) arrive, the receiver can deliver a contiguous block of frames to the application. This avoids retransmitting correctly received frames.",
    hint: "Think of a jigsaw puzzle: you keep the edge pieces until you find the missing center.",
    level: "intermediate",
    codeExample: "if (seq != expected_seq) store_in_buffer(seq);\nelse { deliver_and_check_buffer(); }"
  },
  {
    question: "How does the sender know which frames to retransmit in Selective Repeat?",
    shortAnswer: "Via individual NAKs (Negative ACKs) or via selective acknowledgments (SACK) from the receiver.",
    explanation: "The receiver can explicitly request a missing frame using a NAK. Alternatively, in protocols like TCP SACK, the receiver advertises blocks of received data; the sender can then infer which segments are missing and retransmit only those. Timeouts also trigger retransmission of unacknowledged frames.",
    hint: "Try changing this: what if the NAK is lost? The sender must also have a timeout per frame.",
    level: "intermediate",
    codeExample: "on_NAK(frame_num) { retransmit(frame_num); }\non_timeout(frame_num) { retransmit(frame_num); }"
  },
  {
    question: "What happens if an ACK for frame k is lost in Selective Repeat?",
    shortAnswer: "The sender may still receive an ACK for a later frame, but unless it knows k is missing, it may wait for timeout and retransmit k unnecessarily.",
    explanation: "If ACK for frame k is lost but frame k+1 is acknowledged, the sender will mark frame k+1 as acked. However, frame k remains unacknowledged; the sender cannot be sure whether frame k was received or not. Therefore, it still must wait for a timeout for frame k, then retransmit it. This is inefficient. Some implementations use cumulative ACKs or SACK to avoid this.",
    hint: "Think about a package delivery: you know package 2 arrived but not package 1 – you still worry about package 1.",
    level: "advanced",
    codeExample: "// timer per frame ensures recovery even if ACK lost"
  },
  {
    question: "Compare the receiver’s complexity in Selective Repeat vs Go-Back-N.",
    shortAnswer: "Selective Repeat requires a reordering buffer and more complex logic; Go-Back-N is simple (no buffer).",
    explanation: "Selective Repeat must maintain a buffer of out-of-order frames, manage timers (optional at receiver), and deliver frames in order. Go-Back-N only needs to track the next expected sequence number. Hence Selective Repeat is more memory‑intensive and harder to implement in hardware.",
    hint: "Observe carefully: the extra complexity buys better bandwidth utilization.",
    level: "basic",
    codeExample: "// SR: buffer[N]; GBN: just expected_seq"
  },
  {
    question: "In Selective Repeat, can the sender advance its window before receiving ACKs for all frames in the window?",
    shortAnswer: "Yes, the window slides as soon as the oldest outstanding frame is acknowledged.",
    explanation: "The sender window is defined by base (oldest unacked) and base+N. When an ACK for frame base arrives, base increments to the next unacked frame, even if later frames in the window are still unacked. This allows the window to 'slide' and new frames to be sent.",
    hint: "Think of a sliding door: the leftmost barrier moves right when the leftmost package is confirmed.",
    level: "intermediate",
    codeExample: "if (ack_seq == base) { base = next_unacked(); }"
  },
  {
    question: "Why would a channel with high error rates benefit more from Selective Repeat than from Go-Back-N?",
    shortAnswer: "Selective Repeat avoids retransmitting correctly received frames, saving bandwidth when errors are frequent.",
    explanation: "If each frame has a loss probability p, the expected number of frames retransmitted per loss in Go-Back-N is about N (window size). In Selective Repeat, it is exactly 1. For large N or high p, this difference is dramatic. Therefore, Selective Repeat maintains higher throughput under adverse conditions.",
    hint: "Try changing p to 0.1 and N=10 – GBN wastes 10x bandwidth per loss, SR wastes 1x.",
    level: "advanced",
    codeExample: "SR_throughput ≈ (1-p) ; GBN_throughput ≈ (1-p)/(1+Np) (approx)"
  },
  {
    question: "What is a NAK (Negative Acknowledgment) and when is it used in Selective Repeat?",
    shortAnswer: "A NAK explicitly tells the sender which frame is missing, requesting immediate retransmission.",
    explanation: "Instead of waiting for a timeout, the receiver can send a NAK as soon as it detects a gap (e.g., receives frame 3 but expects frame 2). This speeds up recovery. However, NAKs themselves can be lost, so timers are still needed.",
    hint: "Think of a student raising a hand to say 'I didn't get page 5' instead of waiting for the teacher to notice.",
    level: "intermediate",
    codeExample: "if (received_seq > expected_seq) send_NAK(expected_seq);"
  },
  {
    question: "How does Selective Repeat handle duplicate frames (e.g., due to lost ACK causing retransmission)?",
    shortAnswer: "The receiver discards duplicates and sends an ACK (or ignores, but should ACK to advance sender window).",
    explanation: "If a frame is retransmitted but the original was already received, the receiver will see a duplicate sequence number. It discards the duplicate (does not deliver again) but still sends an ACK so the sender can update its window. This avoids unnecessary further retransmissions.",
    hint: "Observe carefully: sending an ACK for a duplicate helps synchronize the sender.",
    level: "intermediate",
    codeExample: "if (already_received[seq]) send_ACK(seq); else { accept; send_ACK(seq); }"
  },
  {
    question: "What is the maximum window size N for Selective Repeat when using modulo 8 sequence numbers?",
    shortAnswer: "N ≤ 4 (since 2N ≤ modulo, i.e., 2N ≤ 8 → N ≤ 4).",
    explanation: "To avoid ambiguity, we require sequence number space ≥ 2N. With modulo 8, maximum N is 4. If N=5, 2N=10 > 8, and window wrap can cause confusion between new and retransmitted frames.",
    hint: "Try changing N to 5, modulo 8: after sending 0-4, ACKs for 0-1 arrive, window slides to 2-6. A new frame 2 (mod 8) could be mistaken for retransmission of old frame 2.",
    level: "expert",
    codeExample: "MAX_N = SEQ_SPACE / 2;"
  },
  {
    question: "What is the effect of a very large window size in Selective Repeat on memory requirements?",
    shortAnswer: "It linearly increases both sender and receiver buffer sizes.",
    explanation: "The sender must store up to N outstanding frames for possible retransmission. The receiver must also allocate buffer space for up to N out-of-order frames. For large N (e.g., 1000), this can be megabytes of memory, which may be prohibitive for embedded devices.",
    hint: "Think about a student storing all homework pages until the missing one arrives – large window needs big desk.",
    level: "basic",
    codeExample: "sender_buffer = size_N; receiver_buffer = size_N;"
  },
  {
    question: "Compare the timer requirements of Selective Repeat and Go-Back-N.",
    shortAnswer: "Selective Repeat typically needs a timer per outstanding frame; Go-Back-N can use a single timer for the oldest frame.",
    explanation: "In Selective Repeat, different frames may have different retransmission deadlines because they are individually acknowledged. A single timer would not capture the timeout of a middle frame if the base moves. Hence per-frame timers (or a timer per missing frame) are common.",
    hint: "Observe carefully: if frame 2 is lost but frame 0 and 1 are acked, base moves to 2 – then a single timer works again. But more robust: per-frame.",
    level: "advanced",
    codeExample: "// per-frame timer array"
  },
  {
    question: "How would you implement selective repeat over a channel that may reorder packets?",
    shortAnswer: "The protocol already tolerates reordering because it buffers out-of-order frames; reordering just appears as gaps that will eventually fill.",
    explanation: "Selective Repeat's receiver buffer is designed to handle out-of-order arrivals. If packets are reordered by the network, the receiver will store them and wait for the missing ones. The only potential issue is that excessive reordering might cause unnecessary NAKs or timeouts, but the protocol remains correct.",
    hint: "Think about receiving mail: even if letter 3 arrives before letter 2, you put it aside until letter 2 comes.",
    level: "intermediate",
    codeExample: "// buffer works for any order"
  },
  {
    question: "Why is Selective Repeat rarely used in its pure form in modern networks, and what is used instead?",
    shortAnswer: "Pure Selective Repeat has high complexity; TCP uses a variant with SACK (Selective Acknowledgment) and cumulative ACKs.",
    explanation: "TCP SACK allows the receiver to inform the sender of non‑contiguous blocks of received data. The sender then retransmits only the missing segments, similar to Selective Repeat, but without per‑frame NAKs and with only cumulative ACKs for window advancement. This balances efficiency and complexity.",
    hint: "Observe carefully: TCP SACK is the practical, deployed version of the idea.",
    level: "expert",
    codeExample: "// TCP SACK option: block descriptors"
  },
  {
    question: "What happens if both the original frame and its NAK are lost in Selective Repeat?",
    shortAnswer: "The sender will eventually timeout for that frame and retransmit it.",
    explanation: "If the frame is lost and the NAK is also lost, the receiver never requests it and the sender never gets any acknowledgment. The sender's timer for that frame will expire, triggering a retransmission. This ensures reliability despite loss of control messages.",
    hint: "Try changing this: timers are the ultimate backup for lost NAKs.",
    level: "advanced",
    codeExample: "on_timeout(frame_num) { retransmit(frame_num); }"
  },
  {
    question: "In Selective Repeat, what is the 'window stall' risk and how is it mitigated?",
    shortAnswer: "Stall occurs when the window is full and no ACKs arrive; timers for individual frames eventually trigger retransmission.",
    explanation: "If all frames in the window are transmitted but all ACKs are lost, the sender's window remains full and cannot send new frames. Each outstanding frame has a timer; when the first timer expires, that frame is retransmitted. The retransmission may elicit an ACK, sliding the window and breaking the stall.",
    hint: "Think of a traffic jam where everyone is waiting for the first car to move – a push (timeout) gets it moving.",
    level: "expert",
    codeExample: "// per-frame timer prevents permanent stall"
  },
  {
    question: "How does Selective Repeat behave when the receiver window size is smaller than the sender window?",
    shortAnswer: "It will cause buffer overflows and lost frames, as the receiver cannot buffer all out-of-order frames.",
    explanation: "The protocol assumes both windows are equal (size N). If the receiver window is smaller, it may need to discard frames that it cannot buffer, leading to unnecessary retransmissions. Proper negotiation or design should ensure windows match.",
    hint: "Observe carefully: like a funnel – small receiver buffer causes spillage.",
    level: "advanced",
    codeExample: "// negotiate window size during handshake"
  },
  {
    question: "What is the throughput of Selective Repeat in terms of window size N, frame transmission time Tf, and RTT (no errors)?",
    shortAnswer: "Throughput = min(1, N * Tf / (Tf + RTT)) frames per Tf seconds (same as Go-Back-N perfect channel).",
    explanation: "With no errors, both protocols achieve the same maximum throughput: they can keep the channel full if N is large enough. If N ≥ (RTT/Tf)+1, throughput = 1/Tf frames/sec (100% utilization). Otherwise throughput = N/(RTT+Tf) frames/sec.",
    hint: "Try changing N: both behave identically without loss.",
    level: "intermediate",
    codeExample: "Utilization = min(1, N * Tf/(Tf+RTT))"
  },
  {
    question: "Why does Selective Repeat require the receiver to send ACKs even for duplicate frames?",
    shortAnswer: "To inform the sender that the frame was already received, preventing unnecessary retransmissions.",
    explanation: "If a duplicate arrives (due to a lost ACK), the receiver already has the frame. Sending an ACK again confirms reception, allowing the sender's timer to be cancelled and the window to advance. Without this, the sender would timeout and retransmit again, causing a cycle.",
    hint: "Think about a student saying 'I already got page 5' to avoid getting another copy.",
    level: "intermediate",
    codeExample: "if (duplicate) send_ACK(dup_seq);"
  },
  {
    question: "What is the 'selective repeat' behavior in the context of TCP SACK?",
    shortAnswer: "TCP SACK allows the receiver to list non‑contiguous blocks of received data; the sender then retransmits only the missing blocks.",
    explanation: "Without SACK, TCP Reno uses cumulative ACKs and fast retransmit (which retransmits only one segment per RTT). With SACK, the sender can recover multiple missing segments in one RTT, effectively implementing selective repeat. This greatly improves performance on lossy links like wireless.",
    hint: "Observe carefully: SACK is the real‑world implementation of the Selective Repeat idea.",
    level: "expert",
    codeExample: "// TCP SACK option: <block1_start, block1_end>, <block2_start, block2_end>..."
  },
  {
    question: "What is the main disadvantage of Selective Repeat compared to Go-Back-N?",
    shortAnswer: "Higher complexity, more memory (receiver buffer), and larger sequence number space.",
    explanation: "The need for out‑of‑order buffering, per‑frame timers, and modulo 2N sequence numbers makes Selective Repeat harder to implement in hardware or low-resource systems. For channels with very low error rates, the added complexity is not justified.",
    hint: "Try changing the error rate to 0.0001% – Go-Back-N's waste is negligible and it's simpler.",
    level: "basic",
    codeExample: "// no free lunch: complexity vs efficiency"
  },
  {
    question: "How would you determine the optimal window size N for Selective Repeat on a given link?",
    shortAnswer: "N should be at least (RTT / Tf) + 1 to keep the pipe full, but not so large as to waste memory or cause excessive retransmission overhead.",
    explanation: "If N is smaller than (RTT/Tf)+1, the channel is underutilized. If N is larger, memory usage increases and, in case of errors, retransmission overhead grows (though still less than Go-Back-N). Usually N is chosen as the bandwidth-delay product in frames plus a small margin.",
    hint: "Think of filling a pipe: N must be at least the number of frames that can be in flight.",
    level: "advanced",
    codeExample: "N_opt = ceil(BDP / frame_size) + 1;"
  },
  {
    question: "Can Selective Repeat be used over a link that does not support full-duplex communication?",
    shortAnswer: "Yes, but efficiency may drop because ACKs/NAKs contend for the same channel, requiring careful scheduling.",
    explanation: "In half‑duplex, the sender must stop sending data to listen for ACKs/NAKs. This can reduce throughput, but the protocol still works. Timings need adjustment, and NAKs may be delayed. Many wireless MAC protocols (e.g., Wi‑Fi with block ACK) handle this efficiently.",
    hint: "Observe carefully: walkie‑talkie operation – you can't send and receive at the same time.",
    level: "intermediate",
    codeExample: "// use TDD (time division) for ACK slots"
  },
  {
    question: "What is the effect of a very small window size (N=1) in Selective Repeat?",
    shortAnswer: "It degenerates to Stop-and-Wait ARQ, similar to Go-Back-N with N=1.",
    explanation: "With N=1, only one frame can be outstanding. The receiver cannot buffer any out-of-order frames (there are none). It works exactly like Stop-and-Wait: send, wait for ACK, send next. No advantage over simpler protocols.",
    hint: "Try changing N to 1: all the complexity of Selective Repeat yields no benefit.",
    level: "basic",
    codeExample: "// SR with N=1 = Stop-and-Wait"
  },
  {
    question: "How does Selective Repeat recover from a lost NAK?",
    shortAnswer: "The sender's timer for that frame will expire and trigger a retransmission.",
    explanation: "If a NAK is lost, the sender never receives a request to retransmit. However, the sender has a timer for each outstanding frame. When the timer for the missing frame expires, the sender retransmits it. This provides a reliable fallback.",
    hint: "Think of a student raising a hand (NAK) but the teacher doesn't see; after a while, the teacher checks the student's silence (timeout).",
    level: "intermediate",
    codeExample: "// timer for each frame: on timeout, retransmit"
  },
  {
    question: "What are the implications of using cumulative ACKs instead of individual ACKs in Selective Repeat?",
    shortAnswer: "Cumulative ACKs would not provide enough information to selectively retransmit; individual ACKs (or SACK blocks) are necessary.",
    explanation: "If the receiver only sends a cumulative ACK (e.g., ACK 5 meaning all frames <5 received), the sender cannot know which specific frames beyond 5 are missing. Therefore, pure selective repeat requires per-frame acknowledgments or at least selective acknowledgment blocks.",
    hint: "Observe carefully: cumulative ACK hides gaps – you can't fix what you can't see.",
    level: "expert",
    codeExample: "// must have non-cumulative feedback"
  },
  {
    question: "How does Selective Repeat handle a scenario where the receiver's buffer becomes full?",
    shortAnswer: "It may have to drop new incoming frames, sending NAKs for missing frames and possibly causing retransmissions.",
    explanation: "If the buffer is full and a new out-of-order frame arrives, there is no space to store it. The receiver might drop it and later send a NAK (or rely on the sender's timeout). This can cause a cycle of retransmissions. Proper window sizing prevents this.",
    hint: "Try changing this: reduce window size or increase buffer.",
    level: "advanced",
    codeExample: "if (buffer_full && seq != expected_seq) discard();"
  },
  {
    question: "What is the timeout value used for in Selective Repeat besides retransmission?",
    shortAnswer: "It also prevents deadlock if both a frame and its acknowledgment/NAK are lost.",
    explanation: "Timers ensure that the sender does not wait indefinitely for an ACK or NAK. They provide a guaranteed recovery mechanism even when all control messages are lost. Without timers, the protocol could hang.",
    hint: "Think of a safety net: even if everything goes wrong, the timer catches it.",
    level: "intermediate",
    codeExample: "// timer is essential for liveness"
  },
  {
    question: "In a real system, why might you choose Go-Back-N over Selective Repeat despite lower efficiency?",
    shortAnswer: "Simplicity and lower memory requirements, especially in hardware or real-time systems with low error rates.",
    explanation: "If the channel is very reliable (e.g., fiber optics), the occasional retransmission of a window is a small price to pay for a much simpler implementation. Many network interface cards implement Go-Back-N in hardware because it requires no reordering buffer.",
    hint: "Observe carefully: sometimes 'good enough' beats 'optimal but complex'. Ask Mamata from Barrackpore: simple router or complex one?",
    level: "advanced",
    codeExample: "// hardware GBN: only 1 expected_seq register"
  }
];

export default questions;