const topic3_questions = [
  {
    "question": "Why do worker threads steal tasks from the TAIL of another thread's deque rather than the HEAD?",
    "shortAnswer": "1. It minimizes thread contention with the owner thread (which operates at the Head). 2. Tasks near the Tail represent larger, coarser-grained subtrees created earlier in the recursion, so stealing them provides more substantial work chunks.",
    "explanation": "Stealing large chunks reduces the total number of steals needed.",
    "hint": "Reduces lock contention with owner and steals larger chunks of work.",
    "level": "Advanced",
    "codeExample": "Owner operates at Head (LIFO); Stealers take from Tail (FIFO)."
  },
  {
    "question": "What is the primary benefit of the work-stealing algorithm over fixed task distribution?",
    "shortAnswer": "It provides dynamic load balancing, ensuring that no CPU cores sit idle when different tasks take unequal amounts of time to complete.",
    "explanation": "Fixed partitioning fails when tasks have variable execution times.",
    "hint": "Dynamic load balancing prevents idle CPU cores.",
    "level": "Intermediate",
    "codeExample": "ForkJoinPool worker automatically steals tasks when its local queue is empty."
  }
];

export default topic3_questions;
