const topic17_questions = [
  {
    "question": "In the GC log line 'GC(12) 124M->48M(512M) 2.845ms', what does each metric represent?",
    "shortAnswer": "124M was the heap occupancy before GC, 48M was the heap occupancy after GC, 512M was the total committed heap size, and 2.845ms was the total Stop-The-World pause duration.",
    "explanation": "Standard format of JVM GC completion summaries.",
    "hint": "Pre-GC size → Post-GC size (Committed size) Pause duration.",
    "level": "Intermediate",
    "codeExample": "124M (before) → 48M (after) (512M committed) 2.845ms pause"
  },
  {
    "question": "How do you detect a slow memory leak from a series of GC log entries?",
    "shortAnswer": "By observing the heap occupancy immediately after each Full or Major GC. If the baseline minimum heap memory after collection steadily climbs upward over time in a stair-step pattern rather than returning to a steady floor, a memory leak exists.",
    "explanation": "Indicates objects are accumulating and cannot be collected.",
    "hint": "The baseline memory floor after GC steadily increases over time.",
    "level": "Advanced",
    "codeExample": "Post-GC floor: 100M → 200M → 400M → 800M → OOM"
  }
];

export default topic17_questions;
