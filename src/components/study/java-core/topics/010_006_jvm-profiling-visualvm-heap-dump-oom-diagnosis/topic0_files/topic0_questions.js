const topic0_questions = [
  {
    "question": "How can a memory leak occur in a language with an automatic garbage collector like Java?",
    "shortAnswer": "A memory leak in Java occurs when an object that is no longer needed by application logic remains referenced by a live GC Root (e.g. a static collection, thread-local, or listener). Because the object is technically reachable, the Garbage Collector cannot legally reclaim it.",
    "explanation": "GC only reclaims unreachable objects, not unneeded objects.",
    "hint": "Logically dead objects remain referenced by live GC Roots.",
    "level": "Beginner",
    "codeExample": "static List<Data> list = new ArrayList<>(); // Never cleared -> Leak"
  },
  {
    "question": "What is the typical visual signature of a memory leak in a JVM memory monitoring graph (VisualVM)?",
    "shortAnswer": "A classic 'sawtooth pattern' where the bottom floor of heap memory usage after each Full GC steadily climbs upward over time instead of returning to a stable baseline.",
    "explanation": "Indicates that unreclaimable objects are accumulating over time.",
    "hint": "The minimum heap baseline after GC steadily climbs over time.",
    "level": "Intermediate",
    "codeExample": "Heap after GC: 100MB -> 250MB -> 500MB -> 900MB -> Crash"
  }
];

export default topic0_questions;
