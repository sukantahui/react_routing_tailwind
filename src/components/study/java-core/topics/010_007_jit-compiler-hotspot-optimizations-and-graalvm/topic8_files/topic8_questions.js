const topic8_questions = [
  {
    "question": "How does Lock Elision improve the performance of synchronized classes like StringBuffer or Vector?",
    "shortAnswer": "When Escape Analysis proves that a StringBuffer or Vector instance is confined to a local method and not shared between threads, the JIT compiler eliminates all internal monitor acquisition and release instructions in the native assembly.",
    "explanation": "Allows legacy synchronized code to run at full unsynchronized speed.",
    "hint": "Erases synchronization locks when objects are proven thread-confined.",
    "level": "Intermediate",
    "codeExample": "Local StringBuffer sb = new StringBuffer(); // Locks are elided by JIT"
  },
  {
    "question": "What is Lock Coarsening?",
    "shortAnswer": "An optimization where the JIT compiler merges multiple consecutive lock acquisitions on the same monitor into a single larger synchronized block, reducing lock acquire and release CPU cycles.",
    "explanation": "Prevents lock ping-pong within tight loops.",
    "hint": "Merges adjacent synchronization blocks on the same monitor.",
    "level": "Intermediate",
    "codeExample": "3 separate locks → Merged into 1 coarsened lock block."
  }
];

export default topic8_questions;
