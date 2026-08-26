const topic6_questions = [
  {
    "question": "Why should market data broadcasting be decoupled from the core matching loop via a BlockingQueue?",
    "shortAnswer": "Because network I/O and serialization are slow; if the matching thread directly sent socket messages to thousands of clients, slow network clients would block the entire exchange.",
    "explanation": "Separation of concerns and backpressure management.",
    "hint": "Prevents slow network I/O from stalling the core order matching loop.",
    "level": "Intermediate",
    "codeExample": "eventQueue.offer(tradeEvent);"
  },
  {
    "question": "What is the advantage of using a bounded ArrayBlockingQueue over an unbounded queue?",
    "shortAnswer": "A bounded queue limits maximum memory usage, preventing OutOfMemoryError and applying backpressure if downstream consumers fall behind under sudden traffic spikes.",
    "explanation": "Prevents unchecked memory growth under overload.",
    "hint": "Prevents OOM errors and establishes backpressure limits.",
    "level": "Beginner",
    "codeExample": "new ArrayBlockingQueue<>(10_000)"
  }
];

export default topic6_questions;
