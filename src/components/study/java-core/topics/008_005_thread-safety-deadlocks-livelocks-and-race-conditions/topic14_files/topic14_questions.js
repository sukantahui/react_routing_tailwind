const topic14_questions = [
  {
    "question": "What is 'Thread Starvation' and how does 'new ReentrantLock(true)' prevent starvation in high-contention environments?",
    "shortAnswer": "'Thread Starvation' is a condition where a ready-to-run thread is perpetually denied access to shared resources, locks, or CPU cores because other 'greedy' or higher-priority threads repeatedly jump the queue (barging). Default Java 'synchronized' blocks and non-fair locks permit lock barging to maximize raw multi-core throughput. 'new ReentrantLock(true)' instantiates a 'Fair Lock' that enforces strict FIFO (First-In, First-Out) queuing: the thread that has been waiting the longest in the queue is guaranteed to acquire the lock next, eliminating starvation.",
    "explanation": "Grand architectural capstone of Module 008_005.",
    "hint": "Starvation occurs when greedy threads jump the lock queue; new ReentrantLock(true) enforces strict FIFO lock ordering.",
    "level": "Advanced",
    "codeExample": "Lock fairLock = new ReentrantLock(true); // Guarantees FIFO fair lock acquisition"
  }
];

export default topic14_questions;