const topic6_questions = [
  {
    "question": "How does 'Executors.newSingleThreadExecutor()' differ from a standard manual single Thread instance?",
    "shortAnswer": "1. 'Sequential FIFO Guarantee': It guarantees tasks are executed sequentially in strict submission order, with no more than one task active at any time. 2. 'Self-Healing Crash Resilience': If a task fails and throws an uncaught RuntimeException that terminates the underlying worker thread, the 'SingleThreadExecutor' automatically detects the termination and creates a replacement worker thread to continue processing subsequent tasks in the queue. A manual Thread would simply die permanently.",
    "explanation": "Core resilience mechanism of SingleThreadExecutor.",
    "hint": "Guarantees FIFO sequential execution and automatically spawns a replacement worker if a task throws an uncaught exception.",
    "level": "Intermediate",
    "codeExample": "ExecutorService single = Executors.newSingleThreadExecutor();"
  }
];

export default topic6_questions;