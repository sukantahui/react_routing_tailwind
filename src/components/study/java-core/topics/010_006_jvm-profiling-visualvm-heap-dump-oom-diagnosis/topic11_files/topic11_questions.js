const topic11_questions = [
  {
    "question": "What does an Old Generation occupancy (O) hovering near 99% with rapidly climbing Full GC counts (FGC) in jstat indicate?",
    "shortAnswer": "It is the definitive symptom of a severe Memory Leak or critically undersized Heap. The JVM is thrashing in continuous Full GC cycles attempting to free memory, consuming 100% CPU and heading toward an OutOfMemoryError.",
    "explanation": "Classic GC thrashing pattern.",
    "hint": "Indicates a severe memory leak and imminent OutOfMemoryError.",
    "level": "Intermediate",
    "codeExample": "jstat: O=99.8%, FGC=45, FGCT=120.5s -> Memory Leak Alert!"
  },
  {
    "question": "What does the command 'jstat -gcutil 4820 1000 10' do?",
    "shortAnswer": "It samples and displays garbage collection memory pool percentages for PID 4820 every 1000 milliseconds (1 second) for a total of 10 samples before exiting.",
    "explanation": "Standard jstat interval and count syntax.",
    "hint": "Polls PID 4820 every 1000ms for 10 iterations.",
    "level": "Beginner",
    "codeExample": "jstat -gcutil <pid> <interval_ms> <count>"
  }
];

export default topic11_questions;
