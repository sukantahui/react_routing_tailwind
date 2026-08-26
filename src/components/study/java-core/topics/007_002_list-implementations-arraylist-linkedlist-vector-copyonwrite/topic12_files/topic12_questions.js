const topic12_questions = [
  {
    "question": "How does 'CopyOnWriteArrayList' achieve lock-free thread-safe reads, and why is it unsuitable for write-heavy workloads?",
    "shortAnswer": "1. 'Lock-Free Reads': Reads and iterators access an underlying volatile array snapshot directly without locks or synchronization, executing at raw hardware speed with zero 'ConcurrentModificationException' risk. 2. 'Write Penalty': Every write operation ('add', 'remove', 'set') creates a complete copy of the entire backing array before modifying it. For write-heavy workloads, this creates massive CPU copying overhead and heap memory churn.",
    "explanation": "Standard concurrency construct for event listeners and read-heavy caches.",
    "hint": "Reads are completely lock-free; writes clone the entire array making it expensive for write-heavy systems.",
    "level": "Advanced",
    "codeExample": "List<Listener> list = new CopyOnWriteArrayList<>(); // Ideal for event observer lists"
  }
];

export default topic12_questions;