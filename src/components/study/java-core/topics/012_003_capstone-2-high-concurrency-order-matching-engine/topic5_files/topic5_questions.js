const topic5_questions = [
  {
    "question": "Why is ConcurrentSkipListMap used instead of synchronized TreeMap in concurrent order books?",
    "shortAnswer": "ConcurrentSkipListMap provides lock-free, scalable concurrent reads and writes with O(log N) complexity without suffering from the global contention bottleneck of synchronized TreeMap.",
    "explanation": "Thread-safe sorted map implementation in java.util.concurrent.",
    "hint": "Lock-free skip list architecture avoids global synchronization bottlenecks.",
    "level": "Intermediate",
    "codeExample": "ConcurrentSkipListMap<Long, Queue<Order>> book = new ConcurrentSkipListMap<>();"
  },
  {
    "question": "How does AtomicLong guarantee thread safety when generating trade IDs?",
    "shortAnswer": "It relies on hardware-level Compare-And-Swap (CAS) CPU instructions to atomically increment the internal 64-bit value without acquiring locks.",
    "explanation": "Hardware-level lock-free atomic updates.",
    "hint": "Uses atomic CPU CAS instructions to guarantee uniqueness without locks.",
    "level": "Beginner",
    "codeExample": "long nextId = tradeSequence.getAndIncrement();"
  }
];

export default topic5_questions;
