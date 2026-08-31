const topic1_questions = [
  {
    "question": "Why does Java use GC Roots Reachability Analysis instead of Reference Counting?",
    "shortAnswer": "Reference counting fails to reclaim circular references (where two unreferenced objects point to each other, creating an Island of Isolation). Reachability analysis traverses object graphs from live GC Roots, ensuring circular dead structures are collected.",
    "explanation": "Guarantees 100% reclamation of isolated cyclic graphs.",
    "hint": "Reference counting cannot collect circular references (Islands of Isolation).",
    "level": "Beginner",
    "codeExample": "nodeA.next = nodeB; nodeB.next = nodeA; nodeA = null; nodeB = null;"
  },
  {
    "question": "What is an 'Island of Isolation' in Java memory management?",
    "shortAnswer": "A group of two or more objects that reference each other in a cycle, but where no object in the entire group is reachable from any active GC Root. The JVM Garbage Collector reclaims the entire group together.",
    "explanation": "Reachable among themselves, but unreachable from any live thread.",
    "hint": "A cycle of objects referencing each other with no connection to any GC Root.",
    "level": "Intermediate",
    "codeExample": "A <-> B with no external live pointers → Both collected by GC."
  }
];

export default topic1_questions;
