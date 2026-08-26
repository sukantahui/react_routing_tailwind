const topic3_questions = [
  {
    "question": "Why does storing 1,000,000 integers in a 'LinkedList<Integer>' consume approximately 48 MB of RAM, compared to only 4 MB for a primitive 'int[]' array?",
    "shortAnswer": "1. 'Primitive int[]': stores raw 4-byte integers contiguously in a single array header, consuming exactly ~4 MB. 2. 'LinkedList<Integer>': each element requires a separate heap-allocated 'Node' object (12B header + 4B item ref + 4B next ref + 4B prev ref = 24B) PLUS a separate heap-allocated 'Integer' wrapper object (12B header + 4B int = 16B), plus array references and 8-byte alignment padding. This totals 40 to 48 bytes per element (12x more memory).",
    "explanation": "Deep-dive JVM memory layout analysis.",
    "hint": "Primitive array is 4 bytes/int; LinkedList creates a Node object (24B) + Integer object (16B) = ~48 bytes/element.",
    "level": "Advanced",
    "codeExample": "// int[] arr = 4 MB | ArrayList<Integer> = 24 MB | LinkedList<Integer> = 48 MB"
  }
];

export default topic3_questions;