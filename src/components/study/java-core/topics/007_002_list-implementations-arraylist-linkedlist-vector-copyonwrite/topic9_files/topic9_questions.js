const topic9_questions = [
  {
    "question": "Why does 'ArrayList' iterate significantly faster than 'LinkedList' on modern CPU hardware even though both are O(n) mathematically?",
    "shortAnswer": "Due to 'CPU Spatial Locality and Hardware Prefetching'. ArrayList stores references in a contiguous memory array. When the CPU fetches an element, its hardware prefetcher loads an entire 64-byte cache line into high-speed L1/L2 CPU cache, executing subsequent reads instantly. In contrast, LinkedList nodes are scattered randomly across the JVM heap, causing frequent CPU cache misses and forcing expensive main RAM stalls (Pointer Chasing).",
    "explanation": "Foundational computer architecture insight applied to Java data structures.",
    "hint": "Contiguous array elements benefit from CPU L1/L2 cache prefetching; LinkedList nodes cause cache misses.",
    "level": "Advanced",
    "codeExample": "for (int x : arrayList) { ... } // 10x faster due to CPU cache line prefetching"
  }
];

export default topic9_questions;