const topic5_questions = [
  {
    "question": "How do node-based collections (like 'LinkedList' and 'TreeMap') create severe Garbage Collection (GC) pressure compared to array-based collections (like 'ArrayList')?",
    "shortAnswer": "For 1,000,000 elements, an array-based collection creates only 1 contiguous backing array object on the heap. In contrast, 'LinkedList' creates 1,000,000 individual 'Node' objects (and TreeMap creates 1,000,000 'Entry' objects). Creating millions of individual objects fills the JVM Eden space rapidly, triggering frequent Minor GC cycles and forcing the garbage collector to trace and relocate millions of distinct memory pointers during Stop-The-World pauses, causing severe latency spikes.",
    "explanation": "Enterprise JVM performance tuning and GC latency optimization.",
    "hint": "Array creates 1 object; LinkedList creates 1,000,000 Node objects, causing high GC marking and compaction pauses.",
    "level": "Advanced",
    "codeExample": "// ArrayList = 1 heap buffer | LinkedList = 1,000,000 Node objects on heap"
  }
];

export default topic5_questions;