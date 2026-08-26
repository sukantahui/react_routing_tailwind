const topic0_questions = [
  {
    "question": "How does Brian Goetz (author of Java Concurrency in Practice) formally define 'Thread Safety'?",
    "shortAnswer": "A class is thread-safe if it behaves correctly when accessed from multiple threads simultaneously, regardless of how the runtime environment schedules or interleaves those threads, and requiring NO additional synchronization or coordination by the calling client code. Furthermore, a thread-safe class preserves its internal state invariants under all concurrent execution paths.",
    "explanation": "Standard industry-wide definition of Thread Safety.",
    "hint": "Behaves correctly across multi-threaded interleaving without requiring external synchronization by callers.",
    "level": "Beginner",
    "codeExample": "final class ImmutableBadge { private final String name; ... } // 100% thread-safe by design"
  }
];

export default topic0_questions;