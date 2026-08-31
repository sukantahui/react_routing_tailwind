const topic8_questions = [
  {
    "question": "What is the Weak Generational Hypothesis upon which JVM heap architecture is designed?",
    "shortAnswer": "The empirical rule that most allocated objects die shortly after creation (high infant mortality), and references from older generation objects to younger generation objects are rare.",
    "explanation": "Enables fast, efficient Minor GCs on small memory regions.",
    "hint": "Most objects die young shortly after creation.",
    "level": "Beginner",
    "codeExample": "Minor GC scans only Young Gen → Fast sub-millisecond pauses."
  },
  {
    "question": "What are the two primary divisions of the standard HotSpot JVM Heap?",
    "shortAnswer": "1. Young Generation (comprising Eden Space, Survivor 0, and Survivor 1), and 2. Old / Tenured Generation.",
    "explanation": "Standard generational layout in HotSpot JVM.",
    "hint": "Young Generation and Old (Tenured) Generation.",
    "level": "Beginner",
    "codeExample": "Heap = Young Gen (Eden + S0 + S1) + Old Gen"
  }
];

export default topic8_questions;
