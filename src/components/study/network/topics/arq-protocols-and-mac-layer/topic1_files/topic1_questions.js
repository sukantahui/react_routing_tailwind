const questions = [
  {
    question: "What is the main advantage of Go-Back-N ARQ over Stop-and-Wait?",
    shortAnswer: "Higher channel utilization by allowing multiple outstanding frames.",
    explanation: "Go-Back-N keeps the sender busy by transmitting up to N frames without waiting for individual ACKs. This reduces idle time and improves throughput, especially on high-bandwidth or long-delay links.",
    hint: "Think about a teacher who can ask three questions before waiting for answers, instead of one.",
    level: "basic",
    codeExample: "// window size N > 1\nsend(window_size frames);\nreceive_cumulative_ACK();"
  },
  {
    question: "Explain the concept of a 'cumulative ACK' in Go-Back-N.",
    shortAnswer: "An ACK with sequence number n implicitly acknowledges all frames with sequence number < n.",
    explanation: "Instead of sending an ACK for every frame, the receiver sends a single ACK indicating the next expected frame. If the receiver expects frame 5, an ACK for 5 means frames 0-4 were received correctly. This reduces ACK traffic.",
    hint: "Observe carefully: it's like saying 'I've received everything up to 4' instead of listing 0,1,2,3,4 individually.",
    level: "basic",
    codeExample: "// receiver: after receiving frame seq\nexpected_seq++;\nsend_ACK(expected_seq);"
  },
  {
    question: "What does the sender do when a timeout occurs in Go-Back-N?",
    shortAnswer: "It retransmits the oldest unacknowledged frame (base) and all subsequent frames in the window.",
    explanation: "The timer is usually set for the oldest outstanding frame (base). Upon timeout, the sender resets nextSeqNum to base and retransmits all frames from base to nextSeqNum-1 (the entire window). This 'goes back' to the lost frame.",
    hint: "Think about re-sending a lost page in a book along with all pages after it.",
    level: "intermediate",
    codeExample: "on_timeout() { nextSeqNum = base; retransmit_all_in_window(); }"
  },
  {
    question: "How does the receiver handle out-of-order frames in Go-Back-N?",
    shortAnswer: "It discards them (does not buffer) and sends no ACK.",
    explanation: "Go-Back-N requires in-order delivery. If a frame with a sequence number not equal to the expected next sequence number arrives, it is simply dropped. The receiver does not send an ACK for it, which forces the sender to eventually timeout and retransmit from the missing frame.",
    hint: "Try changing this: what if the receiver buffered out-of-order frames? That would be Selective Repeat.",
    level: "intermediate",
    codeExample: "if (received_seq == expected_seq) { accept(); expected_seq++; send_ACK(expected_seq); } else { discard(); }"
  },
  {
    question: "What is the role of the sender's window size N in Go-Back-N?",
    shortAnswer: "It limits the number of unacknowledged frames and determines the maximum throughput.",
    explanation: "The window size N controls the pipeline depth. The sender can have at most N frames outstanding. If N is too small, the channel is underutilized. If N is too large, memory waste and excessive retransmissions on loss occur. N must be ≤ (Bandwidth-Delay Product)/FrameSize + 1.",
    hint: "Think of a pipeline that can hold N items; bigger pipeline moves more items but requires more time to flush on blockage.",
    level: "advanced",
    codeExample: "window_size = min(N, available_buffer_space);"
  },
  {
    question: "Why does Go-Back-N require a sequence number space of at least N+1 modulo?",
    shortAnswer: "To distinguish between new frames and retransmissions when the window wraps around.",
    explanation: "With a window size N, the sender may retransmit the oldest N frames. If the sequence number space were exactly N, then after a full cycle, new frames could have the same numbers as old unacknowledged frames, causing ambiguity. Using modulo ≥ N+1 (often 2N) prevents this.",
    hint: "Observe carefully: stop-and-wait had 0/1 (2) = N+1 with N=1.",
    level: "expert",
    codeExample: "sequence_number_space = 2 * N; // safe"
  },
  {
    question: "Compare the efficiency of Go-Back-N vs Stop-and-Wait on a link with 10 ms RTT, 1 Mbps bandwidth, and 1000-byte frames (no errors).",
    shortAnswer: "Go-Back-N can achieve near 100% utilization; Stop-and-Wait ~ 13.3%.",
    explanation: "Stop-and-Wait: Tf = (1000*8)/1e6 = 8 ms. Cycle = 8+10 = 18 ms, efficiency = 8/18 ≈ 44% (but with no delay? Actually 8/(8+10)=0.444). For Go-Back-N, if N = window size such that N*Tf ≈ RTT+Tf, N = (10+8)/8 = 2.25 => N=3 gives ~ 3*8/(8+10)=24/18=1.33 >1, but ideal max = 1. So 100% possible. Exact: efficiency = 1 if N ≥ (RTT/Tf)+1.",
    hint: "Try changing the window size to 3. The channel stays busy because the sender transmits continuously.",
    level: "advanced",
    codeExample: "N_opt = ceil(RTT / Tf) + 1;"
  },
  {
    question: "What happens if a cumulative ACK is lost in Go-Back-N?",
    shortAnswer: "The sender still advances its window if a later cumulative ACK arrives; otherwise it times out and retransmits.",
    explanation: "Because ACKs are cumulative, a lost ACK for frame i is harmless if an ACK for frame i+1 arrives – the sender knows that all up to i+1 are acked. Only if all ACKs for an entire window are lost will a timeout occur, triggering retransmission.",
    hint: "Think about the postal service: if the 'received 1' letter is lost but 'received 2' arrives, you know both were delivered.",
    level: "intermediate",
    codeExample: "// sender processes ACK for y: advance base to y if y > base"
  },
  {
    question: "What is the main disadvantage of Go-Back-N compared to Selective Repeat?",
    shortAnswer: "Waste of bandwidth: it retransmits correctly received frames after a loss.",
    explanation: "When a single frame is lost, Go-Back-N forces the sender to retransmit that frame and all subsequent frames in the window, even if those subsequent frames were received correctly. Selective Repeat retransmits only the lost frame, saving bandwidth.",
    hint: "Observe carefully: Imagine losing one word in a sentence – Go‑Back‑N restarts the whole sentence, Selective Repeat only fixes the missing word.",
    level: "basic",
    codeExample: "// GBN: retransmits window after loss\n// SR: retransmits only the specific lost frame"
  },
  {
    question: "Can Go-Back-N be used with selective acknowledgments (SACKs)? Why or why not?",
    shortAnswer: "Typically no; SACK is associated with Selective Repeat. GBN discards out-of-order frames, so SACKs are not needed or used.",
    explanation: "Go-Back-N's receiver does not buffer out-of-order frames, so tracking which specific frames beyond the cumulative ACK have arrived is useless. The sender only knows the lowest missing frame and retransmits everything from there. SACKs would not improve GBN efficiency.",
    hint: "Think about a teacher asking students to raise hands if they missed a question – but GBN discards all later questions anyway.",
    level: "expert",
    codeExample: "// SACK not implemented in GBN"
  },
  {
    question: "Describe a scenario where Go-Back-N performs worse than Stop-and-Wait.",
    shortAnswer: "On a high error rate channel, retransmitting entire windows wastes so much bandwidth that throughput drops below Stop-and-Wait.",
    explanation: "If frame loss probability p is high, each loss causes retransmission of N frames on average. For large N, the effective throughput becomes (1-p)/(N) ... eventually lower than 1-p for Stop-and-Wait. There is a crossover point where GBN becomes inferior.",
    hint: "Try changing the error rate: with 50% loss, sending 10 frames per window wastes many retransmissions.",
    level: "expert",
    codeExample: "GBN_throughput = (1-p) / (1 + N*p)  // simplified model"
  },
  {
    question: "How does the timer management differ between Go-Back-N and Stop-and-Wait?",
    shortAnswer: "GBN often uses a single timer for the oldest outstanding frame; Stop-and-Wait uses a timer per frame (only one anyway).",
    explanation: "In GBN, a single timer is sufficient because any loss will eventually cause the oldest frame to timeout. Upon timeout, the entire window is retransmitted. Using one timer simplifies implementation. Stop-and-Wait also uses one timer but for the only outstanding frame.",
    hint: "Think about a queue: you only need to know when the first person in line has waited too long.",
    level: "intermediate",
    codeExample: "// single timer for base"
  },
  {
    question: "Why does the receiver in Go-Back-N not need a buffer for out-of-order frames?",
    shortAnswer: "Because it discards them, simplifying receiver implementation and memory requirements.",
    explanation: "The protocol design chooses simplicity at the receiver: no sorting, no reordering buffer, just a single expected sequence number. This is ideal for low-cost hardware where memory is scarce.",
    hint: "Observe carefully: Susmita's IoT sensor only tracks the next expected number, easy to implement on a microcontroller.",
    level: "basic",
    codeExample: "// receiver: no extra buffer, just expected_seq"
  },
  {
    question: "What is the 'window stall' problem in Go-Back-N and how is it avoided?",
    shortAnswer: "Window stall occurs when the window size is full and no ACK arrives; resolved by timeout and retransmission.",
    explanation: "If all frames in the window are transmitted but no ACKs return (e.g., all ACKs lost), the sender's window is full and it cannot send new frames. The only way out is the timeout mechanism, which triggers retransmission of the oldest frame, eventually eliciting an ACK and moving the window.",
    hint: "Think about a conveyor belt that stops when it's full and the exit is blocked.",
    level: "advanced",
    codeExample: "// timeout resets the stall"
  },
  {
    question: "How does the choice of N affect the required sequence number space?",
    shortAnswer: "Sequence numbers must be modulo at least N+1 to avoid ambiguity.",
    explanation: "With a window of size N, the transmitter can have N outstanding frames. When the sender retransmits the window, the sequence numbers will repeat. To distinguish a retransmission from a new transmission of the same number, the modulo must be > N. Common practice: modulo 2N.",
    hint: "Try changing N from 1 to 7: for N=7, you'd need modulo at least 8 (e.g., 0..7).",
    level: "expert",
    codeExample: "SEQ_MOD = 2 * WINDOW_SIZE;"
  },
  {
    question: "In Go-Back-N, can the sender send a new frame after receiving an ACK that doesn't advance the window?",
    shortAnswer: "No, the window only advances when base increases; an ACK for a frame already within the window does not change base if it's not the expected cumulative.",
    explanation: "The sender processes each ACK: if ACK sequence number > base, then base = ACK_seq, and the window slides. If ACK_seq = base (duplicate or old ACK), it is ignored. New frames can only be sent if nextSeqNum - base < N. No ACK that fails to move base will open the window.",
    hint: "Think about a sliding door: only when the leading edge moves forward can new items enter.",
    level: "advanced",
    codeExample: "if (ack_seq > base) { base = ack_seq; } // window slides"
  },
  {
    question: "What is the effect of a very small window size (N=1) in Go-Back-N?",
    shortAnswer: "It degenerates to Stop-and-Wait ARQ.",
    explanation: "When N=1, only one frame can be outstanding. The sender must wait for its ACK before sending the next – exactly the behavior of Stop-and-Wait. Cumulative ACKs don't add benefit.",
    hint: "Observe carefully: Go-Back-N includes Stop-and-Wait as a special case.",
    level: "basic",
    codeExample: "// with N=1, same as Stop-and-Wait"
  },
  {
    question: "Why does Go-Back-N require the receiver to send an ACK for every correctly received in-order frame?",
    shortAnswer: "To advance the sender's window and enable cumulative acknowledgments.",
    explanation: "Each ACK provides a cumulative acknowledgment. The receiver sends an ACK with the next expected sequence number after each valid frame. This gives the sender feedback on the highest consecutive sequence number received, allowing the window to slide.",
    hint: "Without ACKs, the sender would never know which frames have arrived.",
    level: "intermediate",
    codeExample: "send_ACK(expected_seq);"
  },
  {
    question: "How would you modify Go-Back-N to handle a channel that reorders packets?",
    shortAnswer: "It's not designed for reordering; you would need to switch to Selective Repeat or use timestamps and buffers.",
    explanation: "Go-Back-N assumes packets arrive in order. Reordering would cause the receiver to discard many packets as out-of-order, leading to unnecessary retransmissions. To work with reordering, you'd need to buffer out-of-order packets and use a more complex ACK scheme.",
    hint: "Think about postal mail that can arrive out of order – our simple 'next expected' fails.",
    level: "expert",
    codeExample: "// not suitable for reordering"
  },
  {
    question: "What is the maximum achievable throughput of Go-Back-N in frames per second with zero errors?",
    shortAnswer: "min(1, N * Tf / (Tf + RTT)) frames per second (normalized to 1 for perfect utilization).",
    explanation: "If N is large enough ( N ≥ (RTT / Tf) + 1 ), the sender can keep the channel continuously busy, achieving 1 frame per Tf seconds (100% utilization). Otherwise throughput = N * Tf / (Tf + RTT) frames per Tf seconds? Actually max = 1/Tf frames/sec when N large enough.",
    hint: "Try changing N to exactly fill the pipe: N = (RTT/Tf) + 1 → continuous transmission.",
    level: "advanced",
    codeExample: "Throughput (fps) = 1/Tf if N ≥ (RTT/Tf)+1 else N/(RTT+Tf)"
  },
  {
    question: "In Go-Back-N, what happens if the sender receives a duplicate ACK?",
    shortAnswer: "It ignores it, unless it's part of a mechanism like fast retransmit (though TCP uses that with SACK). Standard GBN ignores duplicates.",
    explanation: "Cumulative ACKs make duplicate ACKs irrelevant because a later ACK will supercede previous ones. However, in TCP Reno (which uses Go‑Back‑N style recovery with fast retransmit), three duplicate ACKs trigger retransmission without waiting for timeout. But pure GBN does not have fast retransmit.",
    hint: "Think of duplicate ACK as a reminder of missing frame – not used.",
    level: "expert",
    codeExample: "// in GBN: if (ack_seq <= base) ignore;"
  },
  {
    question: "What is the relationship between Go-Back-N and sliding window flow control?",
    shortAnswer: "Go-Back-N uses sliding window for both flow control and error recovery.",
    explanation: "The sender window limits the number of unacknowledged frames (flow control). Error recovery uses the same window to determine which frames to retransmit on timeout. The sliding window is central to both functionalities.",
    hint: "Observe carefully: the window limits data in flight and marks the retransmission boundary.",
    level: "intermediate",
    codeExample: "// window = flow control + error recovery"
  },
  {
    question: "Under what condition would Go-Back-N have the same throughput as Selective Repeat?",
    shortAnswer: "When the error rate is zero, both achieve 100% utilization.",
    explanation: "Without any losses, there are no retransmissions. Both protocols simply send frames continuously with a large enough window. The difference only appears when errors occur, where Selective Repeat avoids retransmitting correct frames.",
    hint: "Errors are the only reason for different behavior. Perfect channel → identical.",
    level: "basic",
    codeExample: "// both send at line rate"
  },
  {
    question: "How does Go-Back-N handle a scenario where the ACK for frame k is lost but ACK for frame k+1 arrives?",
    shortAnswer: "The sender advances its window to k+1 (cumulative ACK). No retransmission needed.",
    explanation: "Because ACKs are cumulative, receiving an ACK for frame k+1 implies that frame k and all earlier frames were received. Thus the missing ACK for frame k is irrelevant; the window slides normally. This is a key advantage of cumulative ACKs.",
    hint: "Try changing this: you get a message 'received all up to 5', you know 4 was also received even without explicit ACK.",
    level: "intermediate",
    codeExample: "// on ACK=5, base becomes 5 (if base was 4)"
  },
  {
    question: "What is the main reason for using a timer for the oldest frame rather than per-frame timers?",
    shortAnswer: "To reduce complexity and number of timers, as any loss will eventually cause the oldest frame to timeout.",
    explanation: "Since the window is a contiguous block, if a frame inside the window is lost, the oldest frame may still be acknowledged if later ACKs arrive? Actually, if frame i (not the oldest) is lost, the receiver stops sending ACKs beyond i-1, so the ACK for the oldest frame (base) will also stop. Thus the loss of any frame prevents the base from advancing, so a single timer for base suffices.",
    hint: "Think about a chain: if any link breaks, the first link's progress also halts.",
    level: "expert",
    codeExample: "// only one timer used"
  },
  {
    question: "In Go-Back-N, what is the consequence of using a window size larger than the bandwidth-delay product?",
    shortAnswer: "It does not increase throughput but may increase memory usage and retransmission waste on loss.",
    explanation: "Once N is large enough to keep the pipe full, increasing N further has no benefit for throughput because the channel is already saturated. It only consumes more buffer space and causes larger retransmissions when errors occur.",
    hint: "Observe carefully: bigger window doesn't make the pipe wider, just longer queue.",
    level: "advanced",
    codeExample: "N_optimal = ceil(BDP / frame_size); larger N yields no gain."
  },
  {
    question: "How does Go-Back-N's receiver handle a duplicate frame that arrives after a timeout and retransmission?",
    shortAnswer: "If the duplicate's sequence number equals expected_seq, it accepts it (normal). If not, discards.",
    explanation: "After a timeout, the sender retransmits the entire window. The receiver may see duplicate frames for those already accepted but whose ACK was lost. Because the receiver's expected_seq has advanced (if it received the later frames in order), the duplicate may be less than expected_seq and will be discarded. The receiver still sends an ACK to advance the sender's window.",
    hint: "Think about a student receiving the same homework twice – she only keeps one copy.",
    level: "intermediate",
    codeExample: "if (seq == expected_seq) accept; else discard; always send ACK(expected_seq);"
  },
  {
    question: "What is the 'fast retransmit' optimization in TCP and how does it relate to Go-Back-N?",
    shortAnswer: "Fast retransmit uses duplicate ACKs to infer loss without waiting for timeout, reducing recovery time.",
    explanation: "In TCP Reno (which uses a Go-Back-N like recovery), when the receiver gets an out-of-order segment, it sends a duplicate ACK of the last in-order segment. After three duplicate ACKs, the sender retransmits the missing segment without waiting for timeout. This improves performance. However, pure Go-Back-N lacks this optimization.",
    hint: "Observe carefully: it's like hearing multiple 'I'm still missing item X' messages and reacting immediately.",
    level: "expert",
    codeExample: "if (dup_acks == 3) retransmit(base);"
  },
  {
    question: "Could Go-Back-N be used for real-time video streaming where low latency is critical?",
    shortAnswer: "No, because retransmissions cause variable delay and head-of-line blocking.",
    explanation: "When a frame is lost, Go-Back-N retransmits an entire window, which adds significant latency. Real-time streaming prefers dropping the lost frame and continuing (UDP) or using forward error correction (FEC) rather than retransmission.",
    hint: "Try changing the scenario: would you want a video to pause and replay a whole GOP because one packet dropped?",
    level: "advanced",
    codeExample: "// not recommended for real-time"
  },
  {
    question: "What is the maximum window size allowed in Go-Back-N if sequence numbers are modulo 8 (0-7)?",
    shortAnswer: "Maximum N = 7 (modulo space minus 1).",
    explanation: "To avoid ambiguity, the window size must be at most modulo space - 1. With modulo 8, N ≤ 7. If N=8, then after sending frames 0..7, the sender would be out of numbers and could not distinguish a retransmission of 0 from a new frame 0.",
    hint: "Observe carefully: this is the same rule as for Selective Repeat but with modulo N+1? Actually GBN uses modulo >= N+1, so N = modulo-1.",
    level: "expert",
    codeExample: "MAX_WINDOW = SEQ_MOD - 1;"
  }
];

export default questions;