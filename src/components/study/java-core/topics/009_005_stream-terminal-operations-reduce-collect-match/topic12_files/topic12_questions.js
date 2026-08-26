const topic12_questions = [
  {
    "question": "When should you prefer findAny() over findFirst()?",
    "shortAnswer": "Prefer findAny() when operating on parallel streams where you only care about finding ANY element satisfying a condition and do not require strict encounter order, as findAny avoids synchronization bottlenecks.",
    "explanation": "In sequential streams, findAny and findFirst produce identical results.",
    "hint": "Use findAny in parallel streams when encounter order does not matter.",
    "level": "Intermediate",
    "codeExample": "list.parallelStream().filter(Item::isAvailable).findAny(); // Fast parallel search"
  },
  {
    "question": "Does findAny() produce deterministic results across multiple runs on a parallel stream?",
    "shortAnswer": "No. Because worker threads execute concurrently across CPU cores, different threads may complete filtering first on different runs, returning different matching elements.",
    "explanation": "Non-determinism is allowed by design to maximize CPU throughput.",
    "hint": "Non-deterministic in parallel streams.",
    "level": "Intermediate",
    "codeExample": "stream.parallel().findAny() // May return different elements across runs"
  }
];

export default topic12_questions;
