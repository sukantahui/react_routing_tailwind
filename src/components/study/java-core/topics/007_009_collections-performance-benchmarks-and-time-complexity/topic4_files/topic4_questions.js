const topic4_questions = [
  {
    "question": "Why is iterating and summing a primitive 'int[]' array 5x to 10x faster than an 'ArrayList<Integer>'?",
    "shortAnswer": "1. 'Hardware Cache Locality': A primitive 'int[]' stores 32-bit values consecutively, allowing the CPU to load 16 integers simultaneously into a single 64-byte L1 CPU cache line with hardware prefetching. 2. 'Pointer Dereferencing & Unboxing': 'ArrayList<Integer>' stores an array of object references pointing to scattered 'Integer' objects on the heap. Accessing each element requires pointer dereferencing (causing CPU cache misses) and executing 'Integer.intValue()' unboxing instructions.",
    "explanation": "Core hardware architecture and CPU cache line mechanics in Java.",
    "hint": "CPU cache locality loads 16 ints per cache line; ArrayList suffers from pointer indirection and unboxing.",
    "level": "Intermediate",
    "codeExample": "for (int n : rawIntArray) sum += n; // 10x faster than ArrayList<Integer>"
  }
];

export default topic4_questions;