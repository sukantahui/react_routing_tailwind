const topic11_questions = [
  {
    "question": "Why do 'java.util.concurrent.atomic' classes perform significantly better than 'synchronized' blocks under low-to-moderate contention?",
    "shortAnswer": "Atomic classes use non-blocking hardware CAS (Compare-And-Swap) loops rather than mutual exclusion locks. When contention occurs, threads do NOT transition into the 'BLOCKED' state and the operating system does NOT need to perform expensive thread context switching (which costs ~2000 CPU cycles per switch). Threads simply retry their CAS calculation in user-space while remaining in the 'RUNNABLE' state, achieving much higher throughput and zero deadlock vulnerability.",
    "explanation": "Performance comparison between lock-free CAS and lock-based synchronization.",
    "hint": "Atomic classes use hardware CAS retry loops without putting threads to sleep, eliminating OS context switching overhead.",
    "level": "Intermediate",
    "codeExample": "AtomicInteger count = new AtomicInteger(); count.incrementAndGet(); // Lock-free!"
  }
];

export default topic11_questions;