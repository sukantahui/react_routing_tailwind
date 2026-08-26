const topic3_questions = [
  {
    "question": "How does 'System.arraycopy()' make ArrayList memory reallocation fast enough for production performance?",
    "shortAnswer": "'System.arraycopy()' is a JVM native intrinsic method implemented directly in C/assembly. Rather than iterating through elements one-by-one in Java bytecode, it delegates directly to hardware memory transfer primitives (such as 'memmove' and SIMD vector registers), copying entire blocks of memory in parallel at raw bus speed.",
    "explanation": "JVM intrinsic optimization fundamental to all array-based Java collections.",
    "hint": "It is a native JVM intrinsic calling low-level C memmove for direct block memory transfers.",
    "level": "Intermediate",
    "codeExample": "System.arraycopy(src, 0, dest, 0, length); // Native SIMD block copy"
  }
];

export default topic3_questions;